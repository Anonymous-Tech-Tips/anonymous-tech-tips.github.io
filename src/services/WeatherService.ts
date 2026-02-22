
export interface GeoResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string; // State/Region
}

export interface WeatherData {
    daily: {
        time: string[];
        snowfall_sum: number[];
        snowfall_spread: number[]; // ABSOLUTE difference between models (Uncertainty)
        temperature_2m_min: number[];
        temperature_2m_max: number[];
        wind_speed_10m_max: number[];
        weather_code: number[];
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        snowfall: number[];
        wind_gusts_10m: number[]; // Added for Blizzard Logic
        weather_code: number[];
        snow_depth: number[];
        /** Ground surface temperature (°C) — from Open-Meteo soil_temperature_0cm.
         *  Used to determine if snow will bond to the ground (stick) vs immediately melt.
         *  Key threshold: values ≥ 0°C mean the ground is warm enough to melt snow on contact.
         */
        soil_temperature_0cm: number[];
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// NWS GRIDPOINT RESULT TYPE
// ─────────────────────────────────────────────────────────────────────────────
export interface NWSGridpointData {
    /**
     * Maximum winter hazard severity parsed from NWS gridpoint hazards endpoint:
     *   0 = no active winter hazards
     *   1 = Winter Weather Advisory / Wind Chill Advisory (Y)
     *   2 = Winter Storm Watch (A)
     *   3 = Winter Storm Warning / Blizzard Warning (W)
     *   4 = Extreme Emergency (E) — rare
     *
     * Source: /gridpoints/{wfo}/{x},{y} → properties.hazards.values[].value[]
     * Winter phenomena: WS, BZ, WW, ZR, IP, SN, WC, FZ, LE, LB
     */
    hazard_level: number;
    /** Raw phenomenon+significance pairs, e.g. ["WS.W", "BZ.W", "ZR.Y"] */
    hazard_codes: string[];
    /** Official NWS probability of precipitation (0–100) or null if unavailable */
    nws_pop: number | null;
    /** Official NWS short forecast text, e.g. "Heavy snow. Blizzard conditions possible." */
    short_forecast: string | null;
    /** NWS Weather Forecast Office code, e.g. "LWX" */
    forecast_office: string | null;
}

export const WeatherService = {
    async getCoordinates(city: string): Promise<GeoResult | null> {
        try {
            let query = city.trim();
            if (/^\d{5}$/.test(query)) {
                query += " United States";
            }
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) return data.results[0];
            return null;
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    },

    async getWinterWeather(lat: number, lon: number): Promise<WeatherData | null> {
        return this.getEnsembleWeather(lat, lon);
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ZONAL WEATHER MERGING (Phase 6)
    // ─────────────────────────────────────────────────────────────────────────
    async getZonalWeather(zones: { lat: number, lon: number }[]): Promise<WeatherData | null> {
        try {
            const results = await Promise.all(zones.map(z => this.getEnsembleWeather(z.lat, z.lon)));
            const valid = results.filter((r): r is WeatherData => r !== null);
            if (valid.length === 0) return null;
            if (valid.length === 1) return valid[0];

            // Merge worst-case scenario
            const base = valid[0];
            const mergeArrays = (key1: 'daily' | 'hourly', key2: keyof WeatherData['daily'] | keyof WeatherData['hourly'], op: 'max' | 'min') => {
                const len = (base[key1] as any)[key2].length;
                const arr = new Array(len);
                for (let i = 0; i < len; i++) {
                    let val = (valid[0][key1] as any)[key2][i];
                    for (let j = 1; j < valid.length; j++) {
                        const otherVal = (valid[j][key1] as any)[key2][i];
                        if (op === 'max') val = Math.max(val, otherVal);
                        else val = Math.min(val, otherVal);
                    }
                    arr[i] = val;
                }
                return arr;
            };

            return {
                daily: {
                    time: base.daily.time,
                    snowfall_sum: mergeArrays('daily', 'snowfall_sum', 'max'),
                    snowfall_spread: mergeArrays('daily', 'snowfall_spread', 'max'),
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
                    snow_depth: mergeArrays('hourly', 'snow_depth', 'max'),
                    soil_temperature_0cm: mergeArrays('hourly', 'soil_temperature_0cm', 'min'),
                }
            };
        } catch (e) {
            console.error("Zonal merge failed:", e);
            return null;
        }
    },

    async getZonalAlerts(zones: { lat: number, lon: number }[]): Promise<string[]> {
        const results = await Promise.all(zones.map(z => this.getActiveAlerts(z.lat, z.lon)));
        const set = new Set<string>();
        results.forEach(arr => arr.forEach(a => set.add(a)));
        return Array.from(set);
    },

    async getZonalGridpointData(zones: { lat: number, lon: number }[]): Promise<NWSGridpointData> {
        const results = await Promise.all(zones.map(z => this.getNWSGridpointData(z.lat, z.lon)));
        let maxLvl = 0;
        const codes = new Set<string>();
        let pop = 0;
        let short: string | null = null;
        let office: string | null = null;

        for (const r of results) {
            if (r.hazard_level > maxLvl) maxLvl = r.hazard_level;
            r.hazard_codes.forEach(c => codes.add(c));
            if (r.nws_pop && r.nws_pop > pop) pop = r.nws_pop;
            if (r.short_forecast && !short) short = r.short_forecast;
            if (r.forecast_office && !office) office = r.forecast_office;
        }
        return {
            hazard_level: maxLvl,
            hazard_codes: Array.from(codes),
            nws_pop: pop > 0 ? pop : null,
            short_forecast: short,
            forecast_office: office
        };
    },

    async getEnsembleWeather(lat: number, lon: number): Promise<WeatherData | null> {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&daily=snowfall_sum,temperature_2m_min,temperature_2m_max,wind_speed_10m_max,weather_code` +
                `&hourly=temperature_2m,snowfall,weather_code,snow_depth,wind_gusts_10m,precipitation_probability,soil_temperature_0cm` +
                `&timezone=auto&forecast_days=3&past_days=7&models=gfs_seamless,gem_global,icon_seamless`
            );
            const raw = await response.json();

            const avgArrays = (arrays: number[][]): number[] => {
                const length = arrays[0].length;
                const result = new Array(length).fill(0);
                for (let i = 0; i < length; i++) {
                    let sum = 0, count = 0;
                    for (const arr of arrays) {
                        if (arr && typeof arr[i] === 'number') { sum += arr[i]; count++; }
                    }
                    result[i] = count > 0 ? sum / count : 0;
                }
                return result;
            };

            const getSpread = (arrays: number[][]): number[] => {
                const length = arrays[0].length;
                const result = new Array(length).fill(0);
                for (let i = 0; i < length; i++) {
                    let min = 1000, max = -1000, count = 0;
                    for (const arr of arrays) {
                        if (arr && typeof arr[i] === 'number') {
                            if (arr[i] < min) min = arr[i];
                            if (arr[i] > max) max = arr[i];
                            count++;
                        }
                    }
                    result[i] = count > 0 ? (max - min) : 0;
                }
                return result;
            };

            const voteWeatherCode = (arrays: number[][]): number[] => {
                const length = arrays[0].length;
                const result = new Array(length).fill(0);
                for (let i = 0; i < length; i++) {
                    const counts: Record<number, number> = {};
                    for (const arr of arrays) {
                        const code = arr[i]; counts[code] = (counts[code] || 0) + 1;
                    }
                    let maxCode = arrays[0][i], maxVotes = 0;
                    for (const [code, votes] of Object.entries(counts)) {
                        if (votes > maxVotes) { maxCode = parseInt(code); maxVotes = votes; }
                    }
                    result[i] = maxCode;
                }
                return result;
            };

            const hourlyTime = raw.hourly.time;
            const dailyTime = raw.daily.time;
            const models = ['gfs_seamless', 'gem_global', 'icon_seamless'];

            const hourlyTemp = avgArrays(models.map(m => raw.hourly[`temperature_2m_${m}`]));
            const hourlySnow = avgArrays(models.map(m => raw.hourly[`snowfall_${m}`]));
            const hourlyDepth = avgArrays(models.map(m => raw.hourly[`snow_depth_${m}`]));
            const hourlyGusts = avgArrays(models.map(m => raw.hourly[`wind_gusts_10m_${m}`]));
            const hourlyCode = voteWeatherCode(models.map(m => raw.hourly[`weather_code_${m}`]));
            // soil_temperature_0cm — single model only (GFS provides best coverage)
            // Fall back to temp_2m if unavailable (rare)
            const hourlySoilTemp: number[] = raw.hourly[`soil_temperature_0cm_gfs_seamless`]
                ?? raw.hourly[`temperature_2m_gfs_seamless`]
                ?? hourlyTemp;

            const dailySnowSum = avgArrays(models.map(m => raw.daily[`snowfall_sum_${m}`]));
            const dailySnowSpread = getSpread(models.map(m => raw.daily[`snowfall_sum_${m}`]));
            const dailyTempMin = avgArrays(models.map(m => raw.daily[`temperature_2m_min_${m}`]));
            const dailyTempMax = avgArrays(models.map(m => raw.daily[`temperature_2m_max_${m}`]));
            const dailyWindMax = avgArrays(models.map(m => raw.daily[`wind_speed_10m_max_${m}`]));
            const dailyCode = voteWeatherCode(models.map(m => raw.daily[`weather_code_${m}`]));

            return {
                daily: {
                    time: dailyTime,
                    snowfall_sum: dailySnowSum,
                    snowfall_spread: dailySnowSpread,
                    temperature_2m_min: dailyTempMin,
                    temperature_2m_max: dailyTempMax,
                    wind_speed_10m_max: dailyWindMax,
                    weather_code: dailyCode,
                },
                hourly: {
                    time: hourlyTime,
                    temperature_2m: hourlyTemp,
                    snowfall: hourlySnow,
                    wind_gusts_10m: hourlyGusts,
                    weather_code: hourlyCode,
                    snow_depth: hourlyDepth,
                    soil_temperature_0cm: hourlySoilTemp,
                },
            };
        } catch (error) {
            console.error("Error fetching ensemble weather:", error);
            return this.getWinterWeatherSingle(lat, lon);
        }
    },

    async getWinterWeatherSingle(lat: number, lon: number): Promise<WeatherData | null> {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&daily=snowfall_sum,temperature_2m_min,wind_speed_10m_max,weather_code` +
                `&hourly=temperature_2m,snowfall,weather_code,snow_depth&timezone=auto&forecast_days=3&past_days=7`
            );
            return await response.json();
        } catch (e) { return null; }
    },

    async getActiveAlerts(lat: number, lon: number): Promise<string[]> {
        try {
            const response = await fetch(`https://api.weather.gov/alerts/active?point=${lat},${lon}`, {
                headers: { "User-Agent": "(armaan-snow-predictor, contact@armaanstechtips.com)" }
            });
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                return data.features.map((f: any) => f.properties.headline);
            }
            return [];
        } catch (error) {
            console.error("Error fetching NWS alerts:", error);
            return [];
        }
    },

    // ─────────────────────────────────────────────────────────────────────────
    // NWS GRIDPOINT DATA  (added v5.1)
    //
    // Two-call chain per the NWS API spec:
    //   1. GET /points/{lat},{lon}        → resolves gridId, gridX, gridY, cwa
    //   2a. GET /gridpoints/{wfo}/{x},{y} → structured hazards (phenomenon+significance codes)
    //   2b. GET /gridpoints/{wfo}/{x},{y}/forecast → official PoP + shortForecast text
    //
    // Hazard level mapping (replaces fuzzy headline text-matching):
    //   E=4 Emergency, W=3 Warning, A=2 Watch, Y=1 Advisory, none=0
    //
    // Winter phenomena filter: WS, BZ, WW, ZR, IP, SN, WC, FZ, LE, LB
    // ─────────────────────────────────────────────────────────────────────────
    async getNWSGridpointData(lat: number, lon: number): Promise<NWSGridpointData> {
        const FALLBACK: NWSGridpointData = {
            hazard_level: 0,
            hazard_codes: [],
            nws_pop: null,
            short_forecast: null,
            forecast_office: null,
        };

        const NWS_HEADERS: HeadersInit = {
            "User-Agent": "(armaan-snow-predictor, contact@armaanstechtips.com)",
            "Accept": "application/geo+json",
        };

        try {
            // Step 1 — resolve grid from lat/lon
            const pointResp = await fetch(
                `https://api.weather.gov/points/${lat.toFixed(4)},${lon.toFixed(4)}`,
                { headers: NWS_HEADERS }
            );
            if (!pointResp.ok) {
                console.warn(`NWS /points returned ${pointResp.status} for ${lat},${lon}`);
                return FALLBACK;
            }
            const pointJson = await pointResp.json();
            const pp = pointJson.properties;
            const wfo: string = pp.gridId;    // e.g. "LWX"
            const gx: number = pp.gridX;
            const gy: number = pp.gridY;
            const office: string = pp.cwa ?? wfo;

            // Step 2 — gridpoint data + textual forecast in parallel
            const [gridResp, forecastResp] = await Promise.all([
                fetch(`https://api.weather.gov/gridpoints/${wfo}/${gx},${gy}`, { headers: NWS_HEADERS }),
                fetch(`https://api.weather.gov/gridpoints/${wfo}/${gx},${gy}/forecast`, { headers: NWS_HEADERS }),
            ]);

            // ── 2a: Structured hazard codes ────────────────────────────────
            let hazard_level = 0;
            const hazard_codes: string[] = [];

            if (gridResp.ok) {
                const gridJson = await gridResp.json();
                type HazardEntry = { phenomenon: string; significance: string; event_number?: number };
                type HazardPeriod = { value: HazardEntry[] };
                const periods: HazardPeriod[] = gridJson.properties?.hazards?.values ?? [];

                // Significance letter → severity integer
                const sigMap: Record<string, number> = { E: 4, W: 3, A: 2, Y: 1, S: 1 };

                // Only winter-relevant phenomena
                const winterPhen = new Set(["WS", "BZ", "WW", "ZR", "IP", "SN", "WC", "FZ", "LE", "LB"]);

                for (const period of periods) {
                    for (const h of period.value ?? []) {
                        if (!h.phenomenon || !h.significance) continue;
                        if (!winterPhen.has(h.phenomenon)) continue;
                        const lvl = sigMap[h.significance] ?? 0;
                        if (lvl > hazard_level) hazard_level = lvl;
                        const code = `${h.phenomenon}.${h.significance}`;
                        if (!hazard_codes.includes(code)) hazard_codes.push(code);
                    }
                }
            }

            // ── 2b: Official PoP + shortForecast text ──────────────────────
            let nws_pop: number | null = null;
            let short_forecast: string | null = null;

            if (forecastResp.ok) {
                const fJson = await forecastResp.json();
                type FPeriod = {
                    isDaytime: boolean;
                    probabilityOfPrecipitation?: { value: number | null };
                    shortForecast?: string;
                };
                const fPeriods: FPeriod[] = fJson.properties?.periods ?? [];
                // First daytime period (most pertinent for parents deciding tomorrow morning)
                const target = fPeriods.find(p => p.isDaytime) ?? fPeriods[0];
                if (target) {
                    nws_pop = target.probabilityOfPrecipitation?.value ?? null;
                    short_forecast = target.shortForecast ?? null;
                }
            }

            return { hazard_level, hazard_codes, nws_pop, short_forecast, forecast_office: office };

        } catch (err) {
            console.error("NWS gridpoint fetch failed:", err);
            return FALLBACK;
        }
    },
};
