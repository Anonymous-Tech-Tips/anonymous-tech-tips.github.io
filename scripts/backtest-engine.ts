import { HistoryService } from "../src/services/HistoryService";
import { runSnowDayEngine, DISTRICTS, EngineOutput } from "../src/services/snowDayEngine";
import { WeatherData } from "../src/services/WeatherService";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchArchiveWeather(lat: number, lon: number, targetDateStr: string): Promise<WeatherData | null> {
    // targetDateStr is M/D/YY from sheet. Convert to YYYY-MM-DD
    const [m, d, y] = targetDateStr.split('/').map(Number);
    const fullYear = y < 100 ? 2000 + y : y;

    const targetDate = new Date(fullYear, m - 1, d);

    // Engine expects 7 past days, 1 current day, 2 future days (10 days total)
    // with dayIdx usually equating to the target date.
    // Let's fetch a 10 day window where targetDate is at index 7.
    const startObj = new Date(targetDate);
    startObj.setDate(startObj.getDate() - 7);
    const endObj = new Date(targetDate);
    endObj.setDate(endObj.getDate() + 2);

    const formatYMD = (dateObj: Date) => {
        const yy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getDate()).padStart(2, '0');
        return `${yy}-${mm}-${dd}`;
    };

    const startStr = formatYMD(startObj);
    const endStr = formatYMD(endObj);

    // Note: Archive API parameters are slightly different but return compatible arrays.
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}` +
        `&start_date=${startStr}&end_date=${endStr}` +
        `&daily=snowfall_sum,temperature_2m_min,temperature_2m_max,wind_speed_10m_max,weather_code` +
        `&hourly=temperature_2m,snowfall,weather_code,snow_depth,wind_gusts_10m,soil_temperature_0cm` +
        `&timezone=America%2FNew_York`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Archive fetch failed: " + res.statusText);
        const data = await res.json();

        // Morph the archive data into the WeatherData shape our engine expects
        // (The engine uses an ensemble average usually, but here we just pass the single deterministic archive run)
        const weather: WeatherData = {
            latitude: data.latitude,
            longitude: data.longitude,
            generationtime_ms: data.generationtime_ms,
            utc_offset_seconds: data.utc_offset_seconds,
            timezone: data.timezone,
            timezone_abbreviation: data.timezone_abbreviation,
            elevation: data.elevation,
            hourly_units: data.hourly_units,
            hourly: {
                time: data.hourly.time,
                temperature_2m: data.hourly.temperature_2m,
                snowfall: data.hourly.snowfall,
                weather_code: data.hourly.weather_code,
                snow_depth: data.hourly.snow_depth.map((v: number | null) => v === null ? 0 : v * 39.3701), // Archive returns meters, frontend engine expects inches. Wait, frontend API returns inches if we set imperial.
                // Wait, I didn't pass imperial to the URL! Let me adjust before we rely on this data.
                wind_gusts_10m: data.hourly.wind_gusts_10m,
                precipitation_probability: new Array(data.hourly.time.length).fill(100), // Archive doesn't have pop, default to max
                soil_temperature_0cm: data.hourly.soil_temperature_0cm,
            },
            daily_units: data.daily_units,
            daily: {
                time: data.daily.time,
                snowfall_sum: data.daily.snowfall_sum,
                temperature_2m_min: data.daily.temperature_2m_min,
                temperature_2m_max: data.daily.temperature_2m_max,
                wind_speed_10m_max: data.daily.wind_speed_10m_max,
                weather_code: data.daily.weather_code,
            },
            // Hack: inject spread array so the engine doesn't break
            spread: {
                daily: {
                    snowfall_sum: new Array(data.daily.time.length).fill(0.1) // 0 model spread in history
                }
            }
        };

        return weather;
    } catch (e) {
        console.error("Failed to fetch archive for", startStr, e);
        return null;
    }
}

async function runBacktest() {
    console.log("Fetching History from Google Sheets...");
    const history = await HistoryService.getHistory();
    console.log(`Loaded ${history.length} historical storm events.`);

    const lcps = DISTRICTS.find(d => d.id === "LCPS")!;

    let correct = 0;
    let falsePositives = 0;
    let falseNegatives = 0;

    // Test on the 5 most recent storms to avoid rate limits
    const testSet = history.slice(0, 5);

    for (const record of testSet) {
        console.log(`\n--- Evaluating Date: ${record.date} [LCPS Actual: ${record.lcpsStatus}] ---`);

        // Wait 1s between requests to respect free tier limits
        await sleep(1000);

        // We need imperial units for the engine!
        const urlImperial = `https://archive-api.open-meteo.com/v1/archive?latitude=${lcps.lat}&longitude=${lcps.lon}` +
            `&start_date=2020-01-01&end_date=2020-01-10` +
            `&daily=snowfall_sum,temperature_2m_min,temperature_2m_max,wind_speed_10m_max,weather_code` +
            `&hourly=temperature_2m,snowfall,weather_code,snow_depth,wind_gusts_10m,soil_temperature_0cm` +
            `&timezone=America%2FNew_York&precipitation_unit=inch&temperature_unit=fahrenheit&wind_speed_unit=mph`;

        // Let's fix the fetch function inside this loop to use the right url with imperial units:
        const [m, d, y] = record.date.split('/').map(Number);
        const fullYear = y < 100 ? 2000 + y : y;
        const testDate = new Date(fullYear, m - 1, d);
        const testDateStr = `${fullYear}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

        const startObj = new Date(testDate);
        startObj.setDate(startObj.getDate() - 7);
        const endObj = new Date(testDate);
        endObj.setDate(endObj.getDate() + 2);

        const startStr = startObj.toISOString().split('T')[0];
        const endStr = endObj.toISOString().split('T')[0];

        const realUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lcps.lat}&longitude=${lcps.lon}` +
            `&start_date=${startStr}&end_date=${endStr}` +
            `&daily=snowfall_sum,temperature_2m_min,temperature_2m_max,wind_speed_10m_max,weather_code` +
            `&hourly=temperature_2m,snowfall,weather_code,snow_depth,wind_gusts_10m,soil_temperature_0cm` +
            `&timezone=America%2FNew_York&precipitation_unit=inch&temperature_unit=fahrenheit&wind_speed_unit=mph`;

        const res = await fetch(realUrl);
        if (!res.ok) {
            console.error("Skipping", record.date, "due to API error.");
            continue;
        }

        const data = await res.json();

        const weather: WeatherData = {
            latitude: data.latitude,
            longitude: data.longitude,
            generationtime_ms: data.generationtime_ms,
            utc_offset_seconds: data.utc_offset_seconds,
            timezone: data.timezone,
            timezone_abbreviation: data.timezone_abbreviation,
            elevation: data.elevation,
            hourly_units: data.hourly_units,
            hourly: {
                time: data.hourly.time,
                temperature_2m: data.hourly.temperature_2m,
                snowfall: data.hourly.snowfall,
                weather_code: data.hourly.weather_code,
                snow_depth: data.hourly.snow_depth.map((v: number | null) => v ?? 0),
                wind_gusts_10m: data.hourly.wind_gusts_10m,
                precipitation_probability: new Array(data.hourly.time.length).fill(100),
                soil_temperature_0cm: data.hourly.soil_temperature_0cm,
            },
            daily_units: data.daily_units,
            daily: {
                time: data.daily.time,
                snowfall_sum: data.daily.snowfall_sum,
                temperature_2m_min: data.daily.temperature_2m_min,
                temperature_2m_max: data.daily.temperature_2m_max,
                wind_speed_10m_max: data.daily.wind_speed_10m_max,
                weather_code: data.daily.weather_code,
            },
            spread: {
                daily: {
                    snowfall_sum: new Array(data.daily.time.length).fill(0.1) // Fake no spread
                }
            }
        };

        // Day index is 0 if targetDate is at index 7. (0 means "today" which is index 7 in the engine)
        // because the engine uses dayIdx + 7 to find the target day!
        const engineResult = runSnowDayEngine(weather, 0, [], lcps, 0, 100);

        console.log(`Engine Verdict: ${engineResult.verdict} (${engineResult.metrics.adjusted_prob})`);
        console.log(`Forecast Snow: ${engineResult.metrics.snowfall_in}", Ground Temp: ${engineResult.metrics.ground_temp_f}°F`);

        // Super basic evaluation logic
        const predictedClose = ["CLOSED", "CLOSURE_LIKELY", "CLOSURE_POSSIBLE"].includes(engineResult.verdict);
        const actualClose = record.lcpsStatus.toLowerCase() === "closed";

        if (predictedClose === actualClose) {
            console.log("✅ ACCURATE MATCH");
            correct++;
        } else if (predictedClose && !actualClose) {
            console.log("❌ FALSE POSITIVE (Over-predicted)");
            falsePositives++;
        } else {
            console.log("❌ FALSE NEGATIVE (Missed closure)");
            falseNegatives++;
        }
    }

    console.log("\n=================================");
    console.log(`BACKTEST COMPLETE (${testSet.length} Storms Evaluated)`);
    console.log(`Accuracy: ${((correct / testSet.length) * 100).toFixed(1)}%`);
    console.log(`False Positives: ${falsePositives}`);
    console.log(`False Negatives: ${falseNegatives}`);
    console.log("=================================\n");
}

runBacktest();
