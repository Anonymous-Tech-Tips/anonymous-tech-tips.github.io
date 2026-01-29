
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
    };
}

export const WeatherService = {
    async getCoordinates(city: string): Promise<GeoResult | null> {
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                    city
                )}&count=1&language=en&format=json`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                return data.results[0];
            }
            return null;
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            return null;
        }
    },

    async getWinterWeather(lat: number, lon: number): Promise<WeatherData | null> {
        // Fallback to calling the ensemble method for consistent behavior, 
        // or keep this as a "fast" single-model version. 
        // For v2.4, we'll redirect this to use the Ensemble for accuracy.
        return this.getEnsembleWeather(lat, lon);
    },

    async getEnsembleWeather(lat: number, lon: number): Promise<WeatherData | null> {
        try {
            // Fetching GFS (US), GEM (Canada), ICON (Germany)
            // Added wind_gusts_10m to hourly
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=snowfall_sum,temperature_2m_min,temperature_2m_max,wind_speed_10m_max,weather_code&hourly=temperature_2m,snowfall,weather_code,snow_depth,wind_gusts_10m&timezone=auto&forecast_days=3&past_days=7&models=gfs_seamless,gem_global,icon_seamless`
            );
            const raw = await response.json();

            // Helper to average arrays
            const avgArrays = (arrays: number[][]) => {
                const length = arrays[0].length;
                const result = new Array(length).fill(0);
                for (let i = 0; i < length; i++) {
                    let sum = 0;
                    let count = 0;
                    for (const arr of arrays) {
                        if (arr && typeof arr[i] === 'number') {
                            sum += arr[i];
                            count++;
                        }
                    }
                    result[i] = count > 0 ? sum / count : 0;
                }
                return result;
            };

            // Helper for Spread (Uncertainty)
            const getSpread = (arrays: number[][]) => {
                const length = arrays[0].length;
                const result = new Array(length).fill(0);
                for (let i = 0; i < length; i++) {
                    let min = 1000;
                    let max = -1000;
                    let count = 0;
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

            // Helper to get majority vote for weather code
            const voteWeatherCode = (arrays: number[][]) => {
                const length = arrays[0].length;
                const result = new Array(length).fill(0);
                for (let i = 0; i < length; i++) {
                    const counts: Record<number, number> = {};
                    for (const arr of arrays) {
                        const code = arr[i];
                        counts[code] = (counts[code] || 0) + 1;
                    }
                    // Return code with max votes, or the first one
                    let maxCode = arrays[0][i];
                    let maxVotes = 0;
                    for (const [code, votes] of Object.entries(counts)) {
                        if (votes > maxVotes) {
                            maxCode = parseInt(code);
                            maxVotes = votes;
                        }
                    }
                    result[i] = maxCode;
                }
                return result;
            };

            // Construct the Averaged Data Object
            // The API returns fields like "snowfall_sum_gfs_seamless", "snowfall_sum_gem_global" etc.

            const hourlyTime = raw.hourly.time; // Time is standard across models
            const dailyTime = raw.daily.time;

            const models = ['gfs_seamless', 'gem_global', 'icon_seamless'];

            // HOURLY AVERAGING
            const hourlyTemp = avgArrays(models.map(m => raw.hourly[`temperature_2m_${m}`]));
            const hourlySnow = avgArrays(models.map(m => raw.hourly[`snowfall_${m}`]));
            const hourlyDepth = avgArrays(models.map(m => raw.hourly[`snow_depth_${m}`]));
            const hourlyGusts = avgArrays(models.map(m => raw.hourly[`wind_gusts_10m_${m}`]));
            // Weighted vote for codes? average doesn't make sense for codes. Using majority vote.
            // Actually, for simplicity/safety, let's prioritize GFS for codes if uncertain.
            // But let's try the vote.
            const hourlyCode = voteWeatherCode(models.map(m => raw.hourly[`weather_code_${m}`]));

            // DAILY AVERAGING
            const dailySnowSum = avgArrays(models.map(m => raw.daily[`snowfall_sum_${m}`]));
            const dailySnowSpread = getSpread(models.map(m => raw.daily[`snowfall_sum_${m}`]));
            const dailyTempMin = avgArrays(models.map(m => raw.daily[`temperature_2m_min_${m}`]));
            const dailyTempMax = avgArrays(models.map(m => raw.daily[`temperature_2m_max_${m}`])); // Added v3.4
            const dailyWindMax = avgArrays(models.map(m => raw.daily[`wind_speed_10m_max_${m}`]));
            const dailyCode = voteWeatherCode(models.map(m => raw.daily[`weather_code_${m}`]));

            // Reconstruct WeatherData interface
            const result: WeatherData = {
                daily: {
                    time: dailyTime,
                    snowfall_sum: dailySnowSum,
                    snowfall_spread: dailySnowSpread,
                    temperature_2m_min: dailyTempMin,
                    temperature_2m_max: dailyTempMax, // Added v3.4
                    wind_speed_10m_max: dailyWindMax,
                    weather_code: dailyCode
                },
                hourly: {
                    time: hourlyTime,
                    temperature_2m: hourlyTemp,
                    snowfall: hourlySnow,
                    wind_gusts_10m: hourlyGusts,
                    weather_code: hourlyCode,
                    snow_depth: hourlyDepth
                }
            };

            return result;

        } catch (error) {
            console.error("Error fetching ensemble weather:", error);
            // Fallback to single model if ensemble fails
            console.log("Falling back to single model GFS...");
            return this.getWinterWeatherSingle(lat, lon);
        }
    },

    async getWinterWeatherSingle(lat: number, lon: number): Promise<WeatherData | null> {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=snowfall_sum,temperature_2m_min,wind_speed_10m_max,weather_code&hourly=temperature_2m,snowfall,weather_code,snow_depth&timezone=auto&forecast_days=3&past_days=7`
            );
            return await response.json();
        } catch (e) { return null; }
    },

    async getActiveAlerts(lat: number, lon: number): Promise<string[]> {
        try {
            // NWS API requires a User-Agent
            const response = await fetch(`https://api.weather.gov/alerts/active?point=${lat},${lon}`, {
                headers: {
                    "User-Agent": "(armaan-snow-predictor, contact@armaanstechtips.com)"
                }
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
};
