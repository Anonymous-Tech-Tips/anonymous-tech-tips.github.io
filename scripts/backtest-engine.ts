import { HistoryService } from "../src/services/HistoryService";
import { runSnowDayEngine, DISTRICTS, EngineOutput } from "../src/services/snowDayEngine";
import { WeatherData } from "../src/services/WeatherService";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchArchiveWeather(lat: number, lon: number, targetDateStr: string): Promise<WeatherData | null> {
    const [m, d, y] = targetDateStr.split('/').map(Number);
    const fullYear = y < 100 ? 2000 + y : y;
    const targetDate = new Date(fullYear, m - 1, d);

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

    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}` +
        `&start_date=${startStr}&end_date=${endStr}` +
        `&daily=snowfall_sum,temperature_2m_min,temperature_2m_max,wind_speed_10m_max,weather_code` +
        `&hourly=temperature_2m,snowfall,weather_code,snow_depth,wind_gusts_10m,soil_temperature_0cm` +
        `&timezone=America%2FNew_York`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Archive fetch failed: " + res.statusText);
        const data = await res.json();

        const weather: WeatherData = {
            daily: {
                time: data.daily.time,
                snowfall_sum: data.daily.snowfall_sum,
                snowfall_spread: new Array(data.daily.time.length).fill(0.1),
                temperature_2m_min: data.daily.temperature_2m_min,
                temperature_2m_max: data.daily.temperature_2m_max,
                wind_speed_10m_max: data.daily.wind_speed_10m_max,
                weather_code: data.daily.weather_code,
            },
            hourly: {
                time: data.hourly.time,
                temperature_2m: data.hourly.temperature_2m,
                snowfall: data.hourly.snowfall,
                wind_gusts_10m: data.hourly.wind_gusts_10m,
                weather_code: data.hourly.weather_code,
                snow_depth: data.hourly.snow_depth.map((v: number | null) => v === null ? 0 : v * 39.3701),
                soil_temperature_0cm: data.hourly.soil_temperature_0cm,
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
    const fcps = DISTRICTS.find(d => d.id === "FCPS")!;

    let correctClosure = 0;
    let correctDelay = 0;
    let correctOpen = 0;
    let falsePositives = 0;
    let falseNegatives = 0;

    // Test on all historical winter storms (filter out Hurricane Ida/Sept flooding)
    const testSet = history.filter(r => !r.date.startsWith('9/'));
    let validTests = 0;

    for (const record of testSet) {
        console.log(`\n--- Evaluating Date: ${record.date} [LCPS Actual: ${record.lcpsStatus}] ---`);

        await sleep(1000);

        const [m, d, y] = record.date.split('/').map(Number);
        const fullYear = y < 100 ? 2000 + y : y;
        const testDate = new Date(fullYear, m - 1, d);

        // ── 5-DAY SAFETY FILTER (Phase 8) ────────────────────────────────────
        // Open-Meteo Archive API takes ~5 days to populate data.
        // If the testdate is too recent, skip it to avoid API 400 errors.
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
        if (testDate > fiveDaysAgo) {
            console.log(`⚠️ Skipping ${record.date} — too recent for Archive API (needs 5 days).`);
            continue;
        }

        console.log(`\n--- Evaluating Date: ${record.date} [LCPS Actual: ${record.lcpsStatus}] ---`);
        validTests++;

        const startObj = new Date(testDate);
        startObj.setDate(startObj.getDate() - 7);
        const endObj = new Date(testDate);
        endObj.setDate(endObj.getDate() + 2);

        const startStr = startObj.toISOString().split('T')[0];
        const endStr = endObj.toISOString().split('T')[0];

        // ── ZONAL MERGE FETCH (Phase 6) ───────────────────────────────────────
        const fetchZone = async (lat: number, lon: number) => {
            const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}` +
                `&start_date=${startStr}&end_date=${endStr}` +
                `&daily=snowfall_sum,temperature_2m_min,temperature_2m_max,wind_speed_10m_max,weather_code` +
                `&hourly=temperature_2m,snowfall,weather_code,snow_depth,wind_gusts_10m,soil_temperature_0cm` +
                `&timezone=America%2FNew_York`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("API error");
            return res.json();
        };

        const getZonalArchiveWeather = async (dist: typeof lcps) => {
            const results = await Promise.all(dist.zones.map(z => fetchZone(z.lat, z.lon)));

            // Merge worst-case scenario
            const base = results[0];
            const mergeArrays = (key1: 'daily' | 'hourly', key2: string, op: 'max' | 'min') => {
                const len = base[key1][key2]?.length ?? 0;
                const arr = new Array(len);
                for (let i = 0; i < len; i++) {
                    const vals: number[] = [];
                    for (let j = 0; j < results.length; j++) {
                        const v = results[j][key1][key2] ? results[j][key1][key2][i] : null;
                        if (v !== null && v !== undefined) vals.push(parseFloat(v));
                    }
                    if (vals.length === 0) {
                        arr[i] = 0;
                    } else if (op === 'max') {
                        arr[i] = Math.max(...vals);
                    } else {
                        arr[i] = Math.min(...vals);
                    }
                }
                return arr;
            };

            const hourlySoil = base.hourly.soil_temperature_0cm ? mergeArrays('hourly', 'soil_temperature_0cm', 'min') : mergeArrays('hourly', 'temperature_2m', 'min');

            return {
                daily: {
                    time: base.daily.time,
                    snowfall_sum: mergeArrays('daily', 'snowfall_sum', 'max'),
                    snowfall_spread: new Array(base.daily.time.length).fill(0.1),
                    temperature_2m_min: mergeArrays('daily', 'temperature_2m_min', 'min'),
                    temperature_2m_max: mergeArrays('daily', 'temperature_2m_max', 'min'),
                    wind_speed_10m_max: mergeArrays('daily', 'wind_speed_10m_max', 'max'),
                    weather_code: mergeArrays('daily', 'weather_code', 'max'),
                },
                hourly: {
                    time: base.hourly.time,
                    temperature_2m: mergeArrays('hourly', 'temperature_2m', 'min'),
                    snowfall: mergeArrays('hourly', 'snowfall', 'max'),
                    wind_gusts_10m: mergeArrays('hourly', 'wind_gusts_10m', 'max'),
                    weather_code: mergeArrays('hourly', 'weather_code', 'max'),
                    snow_depth: mergeArrays('hourly', 'snow_depth', 'max').map(v => v ?? 0),
                    soil_temperature_0cm: hourlySoil,
                }
            } as WeatherData;
        };

        let lcpsWeather: WeatherData, fcpsWeather: WeatherData;
        try {
            lcpsWeather = await getZonalArchiveWeather(lcps);
            fcpsWeather = await getZonalArchiveWeather(fcps);
        } catch (e) {
            console.error("Skipping", record.date, "due to API error.");
            continue;
        }

        // 1. Simulate Fairfax (FCPS) decision first
        const fcpsResult = runSnowDayEngine(fcpsWeather, 0, [], fcps, 0, 100, null);

        // 2. Pass FCPS verdict into Loudoun (LCPS) evaluation
        const engineResult = runSnowDayEngine(lcpsWeather, 0, [], lcps, 0, 100, fcpsResult.verdict);

        console.log(`FCPS Simulated: ${fcpsResult.verdict}`);
        console.log(`LCPS Engine Verdict: ${engineResult.verdict} (${engineResult.metrics.adjusted_prob})`);
        console.log(`Forecast Snow: ${engineResult.metrics.snowfall_in}", Ground Temp: ${engineResult.metrics.ground_temp_f}°F, Min Temp: ${engineResult.metrics.min_temp_f}°F`);

        const isClosurePrediction = ["CLOSED", "CLOSURE_LIKELY", "CLOSURE_POSSIBLE"].includes(engineResult.verdict);
        const isDelayPrediction = ["DELAY_DEFINITE", "DELAY_LIKELY", "DELAY_POSSIBLE"].includes(engineResult.verdict);

        const actualLower = record.lcpsStatus.toLowerCase();

        // "Act. Cancelled" (after school activities) and "Early Release" mean school started on time.
        // The morning commute was unobstructed. These count as OPEN for morning prediction purposes.
        const actualClose = actualLower === "closed";
        const actualDelay = actualLower.includes("delay") && !actualLower.includes("early release");

        const isOpenPrediction = !isClosurePrediction && !isDelayPrediction;
        const actualOpen = !actualClose && !actualDelay; // Includes Act. Cancelled, Early Release, On Time

        // Scoring logic
        if (actualClose && isClosurePrediction) {
            console.log("✅ ACCURATE MATCH (Closure)");
            correctClosure++;
        } else if (actualDelay && isDelayPrediction) {
            console.log("✅ ACCURATE MATCH (Delay)");
            correctDelay++;
        } else if (actualOpen && isOpenPrediction) {
            console.log("✅ ACCURATE MATCH (Open)");
            correctOpen++;
        } else if (actualDelay && isClosurePrediction) {
            console.log("⚠️ MINOR OVER-PREDICT (Predicted Closure, was Delay)");
            correctDelay += 0.75; // partial credit
        } else if (actualClose && isDelayPrediction) {
            console.log("⚠️ MINOR UNDER-PREDICT (Predicted Delay, was Closure)");
            correctDelay += 0.75; // partial credit
        } else if ((isClosurePrediction || isDelayPrediction) && actualOpen) {
            console.log("❌ FALSE POSITIVE (Predicted disruption on a normal day)");
            falsePositives++;
        } else {
            console.log("❌ FALSE NEGATIVE (Missed disruption entirely)");
            falseNegatives++;
        }
    }

    if (validTests === 0) {
        console.log("\n=================================");
        console.log("BACKTEST COMPLETE: 0 storms evaluated (all dates were skipped).");
        console.log("=================================");
        return;
    }

    const totalScore = correctClosure + correctDelay + correctOpen;
    const accuracy = (totalScore / validTests) * 100;

    console.log("\n=================================");
    console.log(`BACKTEST COMPLETE (${validTests} Storms Evaluated)`);
    console.log(`Total Accuracy Score: ${accuracy.toFixed(1)}%`);
    console.log(`Correct Closures: ${correctClosure}`);
    console.log(`Correct Delays (Full/Partial): ${correctDelay}`);
    console.log(`Correct Opens: ${correctOpen}`);
    console.log(`False Positives (Overpredicted): ${falsePositives}`);
    console.log(`False Negatives (Missed completely): ${falseNegatives}`);
    console.log("=================================\n");
}

runBacktest();
