
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Snowflake, Wind, Thermometer, Search, MapPin, Loader2, Info, ArrowRight, History, Activity, AlertTriangle, ShieldAlert } from "lucide-react";
import { WeatherService, GeoResult, WeatherData } from "@/services/WeatherService";
import { motion, AnimatePresence } from "framer-motion";

// --- CUSTOM COMPONENTS FOR HIGH-END LOOK ---

const StatItem = ({ label, value, sub, delay, critical }: { label: string, value: string | number, sub?: string, delay: number, critical?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col border-l pl-4 ${critical ? 'border-red-500/50' : 'border-white/10'}`}
    >
        <span className={`text-[10px] uppercase tracking-[0.2em] mb-1 font-medium ${critical ? 'text-red-400' : 'text-white/40'}`}>{label}</span>
        <span className={`text-2xl font-light tracking-tight ${critical ? 'text-red-100' : 'text-white'}`}>{value}</span>
        {sub && <span className="text-[10px] text-white/30 mt-1">{sub}</span>}
    </motion.div>
);

const LuxuryTab = ({ value, label }: { value: string, label: string }) => (
    <TabsTrigger
        value={value}
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:text-white text-white/40 hover:text-white/70 transition-all uppercase tracking-widest text-[10px] py-3 px-0 mx-4"
    >
        {label}
    </TabsTrigger>
);

const DataGridRow = ({ label, value, trend, warn }: { label: string, value: string, trend?: 'up' | 'down' | 'flat', warn?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs font-mono">
        <span className="text-white/50 uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-2">
            <span className={warn ? "text-red-400 font-bold" : "text-white"}>{value}</span>
            {trend === 'up' && <span className="text-red-400">↑</span>}
            {trend === 'down' && <span className="text-blue-400">↓</span>}
        </div>
    </div>
);

export const SnowDayPredictor = () => {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [dayIndex, setDayIndex] = useState(1); // Default to Tomorrow (1)
    const [alerts, setAlerts] = useState<string[]>([]);
    const [showTechnical, setShowTechnical] = useState(false);

    // --- CONSTRAINT ENGINE (V3.0 PALANTIR LOGIC) ---
    const calculateConstraints = (data: WeatherData, dayIdx: number, activeAlerts: string[]) => {
        const apiDayIdx = dayIdx + 7;
        const startHour = apiDayIdx * 24;
        const endHour = startHour + 24;

        // RAW DATA VECTORS
        const hourlySnow = data.hourly.snowfall.slice(startHour, endHour);
        const hourlyTemp = data.hourly.temperature_2m.slice(startHour, endHour);
        const hourlyGusts = data.hourly.wind_gusts_10m ? data.hourly.wind_gusts_10m.slice(startHour, endHour) : new Array(24).fill(0);

        // --- v3.4 DERIVED DEPTH (HISTORICAL TRUTH) ---
        // API snow_depth can be unreliable. We calculate our own "Physics Depth"
        // by looking at the past 3 days of snowfall and accounting for melt.
        // v3.4 PRECISE DECAY REGRESSION
        // Iterate through past 3 days to build the "snow stack".
        // Snow settles/compacts by gravity (Decay) AND melts by heat (Thermal Loss).

        let estimatedDepth = 0;
        const COMPACTION_RATE = 0.80; // Retain 80% depth per day (20% compaction)

        for (let i = 3; i >= 1; i--) { // Start from oldest day (3 days ago)
            const pastDayIdx = apiDayIdx - i;
            if (pastDayIdx >= 0) {
                // 1. Add new snow from that day
                const daySnow = (data.daily.snowfall_sum[pastDayIdx] || 0) / 2.54;
                estimatedDepth += daySnow;

                // 2. Apply Daily Compaction (Gravity)
                estimatedDepth *= COMPACTION_RATE;

                // 3. Apply Thermal Melt (Heat)
                const dayMaxTemp = data.daily.temperature_2m_max[pastDayIdx];
                if (dayMaxTemp > 0) { // > 0C
                    const maxF = (dayMaxTemp * 9 / 5) + 32;
                    // Melt Formula: 0.1" per degree above freezing per day
                    const meltAmount = (maxF - 32) * 0.1;
                    estimatedDepth -= meltAmount;
                }

                if (estimatedDepth < 0) estimatedDepth = 0;
            }
        }

        const apiDepthMeters = data.hourly.snow_depth ? data.hourly.snow_depth[startHour] : 0;
        const apiDepthInches = apiDepthMeters * 39.37;

        // TRUTH SELECTION: Trust the higher number (Safety Factor)
        const effectiveDepth = Math.max(estimatedDepth, apiDepthInches);

        // 1. OPTION EXHAUSTION SCORE (0-100)
        // Start with 100 "Option Points". Subtract based on constraints.
        let optionScore = 100;
        let primaryConstraint = "None";

        // A. TIMELINE ACCELERATION (Slope check)
        // Compare 3AM-5AM (Pre) vs 6AM-8AM (Commute)
        let preCommuteSnow = 0;
        let commuteSnow = 0;
        for (let i = 3; i <= 5; i++) preCommuteSnow += (hourlySnow[i] || 0);
        for (let i = 6; i <= 8; i++) commuteSnow += (hourlySnow[i] || 0);

        const isAccelerating = commuteSnow > (preCommuteSnow * 1.5) && commuteSnow > 0.5;
        if (isAccelerating) {
            optionScore -= 25; // Surprise attack penalty
            primaryConstraint = "Accelerating Precip";
        }

        // B. PLOW SATURATION (The Physics - Updated v3.2)
        // Stricter Baselines for Risk-Averse Districts
        const BASE_PLOW = 0.5; // Reduced from 0.75 (Realism: Hills/Corners slow them down)
        let maxNetAccumulation = 0;
        let plowCapacity = BASE_PLOW;

        // Check Existing Conditions (The "Recovery" Factor)
        // If roads are already narrowed by old snow, capacity drops
        if (effectiveDepth > 8) {
            plowCapacity *= 0.5; // Single Lane Roads
            optionScore -= 40; // Major Stress Penalty (v3.4 Boost)
            if (primaryConstraint === "None") primaryConstraint = "Deep Snowpack (>8\")";
        } else if (effectiveDepth > 4) {
            plowCapacity *= 0.7;
        }

        const yesterdayMaxTemp = Math.max(...data.hourly.temperature_2m.slice(startHour - 24, startHour));
        const todayMinTemp = Math.min(...hourlyTemp);
        const yesterdayMaxF = (yesterdayMaxTemp * 9 / 5) + 32;
        const todayMinF = (todayMinTemp * 9 / 5) + 32;

        for (let i = 0; i < 24; i++) {
            const snowIn = (hourlySnow[i] || 0) / 2.54;
            const tempF = (hourlyTemp[i] * 9 / 5) + 32;
            const wind = hourlyGusts[i];

            // Dynamic Plow Cap
            let currentCap = plowCapacity;
            if (tempF > 32) currentCap *= 0.5; // Slush penalty
            if (wind > 25 && snowIn > 0.5) currentCap = 0; // Visibility lockout

            // If absolute temp is super cold, salt stops working (-10F penalty)
            if (tempF < 15) currentCap *= 0.6;

            if (snowIn > currentCap) {
                maxNetAccumulation += (snowIn - currentCap);
            } else {
                maxNetAccumulation -= (currentCap - snowIn); // Recovery
                if (maxNetAccumulation < 0) maxNetAccumulation = 0;
            }
        }

        const isDry = effectiveDepth < 1.0 && maxNetAccumulation < 0.5;

        // C. FEAR ASYMMETRY (Uncertainty Risk) - Moved for scope
        const spreadCm = data.daily.snowfall_spread ? data.daily.snowfall_spread[apiDayIdx] : 0;
        const spreadIn = spreadCm / 2.54;

        if (spreadIn > 4) {
            optionScore -= 25; // Massive uncertainty -> District freezes
            if (primaryConstraint === "None") primaryConstraint = "Model Divergence";
        }

        // 1. OPTION EXHAUSTION SCORE (Already initialized above, do not redeclare)
        // Resetting score logic for v3.6 Flow
        // Note: We initialized optionScore=100 at line 107. 
        // Logic updates from line 119/133 modified it. 
        // We will continue modifying it.

        // A. PLOW FAILURE (Volume)
        const plowHours = hourlySnow.filter(x => x / 2.54 > BASE_PLOW).length;
        if (plowHours > 1) {
            optionScore -= (plowHours * 15);
            if (primaryConstraint === "None") primaryConstraint = "Plow Capacity Exceeded";
        }

        // B. WIND / VISIBILITY
        // v3.5: Only penalize wind if there is snow to blow, OR if it's hurricane force.
        const maxWind = Math.max(...hourlyGusts);
        if (maxWind > 45) { // Structural danger
            optionScore -= 40;
            primaryConstraint = "Dangerous Winds";
        } else if (maxWind > 25) {
            if (!isDry) {
                optionScore -= 30; // Blowing Snow
                if (primaryConstraint === "None") primaryConstraint = "Blizzard Visibility";
            } else {
                // Dry Wind - Annoying but not critical
                optionScore -= 5;
            }
        }

        // C. FLASH FREEZE / ICE
        // Physics: Roads wet (>32F) then drop below freezing (<28F) rapidly.
        // Check Yesterday Max vs Today Min using DAILY data (more accurate than hourly spot check)
        const prevDayIdx = apiDayIdx - 1;
        // Safety check if prevDay is out of bounds (e.g. today is first day fetched?)
        // Note: We fetch past_days=7, so apiDayIdx is usually ~7. Safe.
        const maxTempYestC = data.daily.temperature_2m_max[prevDayIdx];
        const maxTempYestF = (maxTempYestC * 9 / 5) + 32;
        const minTempF = (data.daily.temperature_2m_min[apiDayIdx] * 9 / 5) + 32;

        if (maxTempYestF > 32 && minTempF < 28 && !isDry) {
            // Check if there's moisture (snow or depth)
            const hasMoisture = (maxNetAccumulation > 0.1 || effectiveDepth > 0.5);
            if (hasMoisture) {
                optionScore -= 50; // Massive penalty for ice
                primaryConstraint = "Flash Freeze";
            }
        }// D. ALERT LOCK-IN
        const relevantAlerts = activeAlerts.join(' ').toLowerCase();
        if (relevantAlerts.includes('winter storm warning')) {
            optionScore = Math.min(optionScore, 5);
            primaryConstraint = "Federal Warning";
        } else if (relevantAlerts.includes('ice storm warning')) {
            optionScore = 0;
            primaryConstraint = "Ice Storm Warning";
        } else if (relevantAlerts.includes('chill')) {
            // Wind Chill Warning
            const dailyMinF = (Math.min(...hourlyTemp) * 9 / 5) + 32; // Recalculate for this section
            if (dailyMinF < -10) {
                optionScore = 0; // Dangerous cold
                primaryConstraint = "Extreme Wind Chill";
            } else if (!isDry) {
                optionScore -= 20; // Cold + Snow
            }
        }

        // E. DEEP FREEZE & SALT FAILURE
        const dailyMaxTemp = Math.max(...hourlyTemp);
        const dailyMaxF = (dailyMaxTemp * 9 / 5) + 32;
        const dailyMinTemp = Math.min(...hourlyTemp);
        const dailyMinF = (dailyMinTemp * 9 / 5) + 32;

        let saltEfficiency = 1.0;
        if (dailyMaxF < 20) saltEfficiency = 0.0;
        else if (dailyMaxF < 28) saltEfficiency = 0.5;

        if (effectiveDepth > 4 && saltEfficiency < 0.2) {
            optionScore -= 70;
            primaryConstraint = "Salt Failure (Too Cold)";
        } else if (effectiveDepth > 4 && saltEfficiency < 0.6) {
            optionScore -= 30;
        }

        // Extreme Cold (Bus Safety)
        if (dailyMinF < 5) {
            // v3.5: If dry, buses handle cold better than cold+snow
            const coldPenalty = isDry ? 15 : 30;
            optionScore -= coldPenalty;

            if (dailyMinF < -5) {
                optionScore -= 40; // Hydraulic failure risk high
                primaryConstraint = "Deep Freeze Lockout";
            }
        }

        // --- STATUS DETERMINATION ---
        let status = "NOMINAL";
        let subtext = "Standard winter operations active.";
        let statusColor = "text-emerald-400";
        let score = Math.max(0, optionScore);

        if (score < 20) {
            status = "SYSTEM COLLAPSE";
            subtext = "Operational limits exceeded. School closure nearly certain.";
            statusColor = "text-rose-600";
        } else if (score < 50) { // Tightened v3.5 (Was 40)
            status = "CRITICAL";
            subtext = "Major adjustments required. Closure highly likely.";
            statusColor = "text-rose-500";
        } else if (score < 70) {
            status = "DEGRADED";
            subtext = "Plows struggling. Delays or closure possible.";
            statusColor = "text-amber-500";
        }

        // --- RETURN ---
        const dateStr = new Date(data.daily.time[apiDayIdx]).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

        return {
            status,
            score,
            subtext,
            statusColor,
            dateLabel: dateStr,
            metrics: {
                netSnow: maxNetAccumulation.toFixed(1), // Restored 'netSnow' key
                depth: effectiveDepth.toFixed(1),
                commuteRate: ((commuteSnow / 2.54) / 3).toFixed(2), // Restored
                spread: spreadIn.toFixed(1), // Restored
                tempMin: dailyMinF.toFixed(0),
                windMax: Math.max(...hourlyGusts).toFixed(0),
                constraint: primaryConstraint
            }
        };
    };

    // --- STUDENT VIEW TRANSLATION ---
    const getStudentView = (result: any) => {
        let headline = "School is expected to be OPEN";
        let confidence = "High";
        let reasons = [];

        // Fix: Use result.score (root), not result.metrics.score
        if (result.score < 20) { // Aligned with SYSTEM COLLAPSE
            headline = "School is expected to be CLOSED";
            confidence = "High";
        } else if (result.score < 50) { // Aligned with CRITICAL (v3.5)
            headline = "School Closing is LIKELY";
            confidence = "Medium";
        } else if (result.score < 70) { // Aligned with DEGRADED
            headline = "Delays are POSSIBLE";
            confidence = "Low";
        }

        // Generate Human Reasons
        const netSnow = parseFloat(result.metrics.netSnow);
        const depth = parseFloat(result.metrics.depth);
        const commuteRate = parseFloat(result.metrics.commuteRate);
        const wind = parseInt(result.metrics.windMax);
        const temp = parseInt(result.metrics.tempMin);

        // WEEKEND CHECK
        const date = new Date(result.dateLabel); // e.g. "Friday, Jan 29"
        const isWeekend = result.dateLabel.includes("Saturday") || result.dateLabel.includes("Sunday");
        if (isWeekend) {
            headline = "NO SCHOOL (Weekend)";
            confidence = "High";
        }

        // Generate Data-Driven Reasons
        if (netSnow > 1.0) reasons.push(`Snow accumulating on roads (${netSnow}") faster than typical plow capacity.`);
        else reasons.push("Roads expected to remain clear of new snow.");

        if (result.metrics.constraint.includes("Flash Freeze")) {
            // We can infer the temp swing from the raw weather if we wanted, but for now generic is safer unless we pass extra args.
            // Actually, the metrics doesn't have "Yesterday's Max". 
            // Logic update: Let's assume the user wants to know IT IS REFREEZING.
            reasons.push("Severe Ice Risk: Yesterday's slush is flash-freezing into solid ice.");
        }
        if (depth > 6.0) reasons.push(`Heavy existing snowpack (${depth}") narrows roads and limits plow storage.`);

        if (commuteRate > 0.1) reasons.push(`Snow falling at ${commuteRate}"/hr during critical bus hours.`);
        else reasons.push("No precipitation expected during morning commute.");

        if (parseFloat(result.metrics.spread) > 3) {
            reasons.push(`Forecast models disagree by ${result.metrics.spread}" (High Uncertainty).`);
            if (confidence === "High") confidence = "Medium";
        } else {
            reasons.push("Forecast models strongly agree on outcome.");
        }

        if (wind > 20) reasons.push(`High winds (${wind} MPH) causing blowing and drifting snow.`);

        // v3.3 Deep Freeze Explanations
        if (result.metrics.constraint.includes("Salt Failure")) reasons.push(` temps (${temp}°F) are too cold for road salt to melt ice.`);
        if (result.metrics.constraint.includes("Deep Freeze")) reasons.push(`Extreme cold (${temp}°F) turns deep snowpack into solid ice.`);
        if (temp < 5) reasons.push(`Dangerous cold (${temp}°F) risks bus hydraulic failure and student safety.`);

        if (result.status === "NOMINAL" && reasons.length === 2 && reasons[0].includes("Roads expected to remain clear")) {
            reasons = ["No winter weather threats detected.", "Forecasts agree on calm conditions."];
        }

        return { headline, confidence, reasons };
    };


    const handlePredict = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);
        setResult(null);
        setAlerts([]);

        try {
            const coords = await WeatherService.getCoordinates(city);
            if (coords) {
                const [weather, fetchedAlerts] = await Promise.all([
                    WeatherService.getWinterWeather(coords.latitude, coords.longitude),
                    WeatherService.getActiveAlerts(coords.latitude, coords.longitude)
                ]);

                setAlerts(fetchedAlerts);

                if (weather) {
                    const prediction = calculateConstraints(weather, dayIndex, fetchedAlerts);
                    setResult({ location: coords, ...prediction, rawWeather: weather });
                } else {
                    setError("Data stream failed. Retrying...");
                }
            } else {
                setError(`Target "${city}" not found.`);
            }
        } catch (err) {
            setError("Connection interrupted.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (result && result.rawWeather) {
            const prediction = calculateConstraints(result.rawWeather, dayIndex, alerts);
            setResult({ ...result, ...prediction });
        }
    }, [dayIndex, alerts]);

    const studentView = result ? getStudentView(result) : null;

    return (
        <div className="w-full bg-[#09090b] text-white rounded-xl overflow-hidden shadow-2xl relative border border-white/10 font-sans selection:bg-red-500/20">

            {/* Ambient Red Glow for Critical Status */}
            {result?.status === 'SYSTEM COLLAPSE' && (
                <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
            )}

            <div className="relative z-10 p-8 md:p-12 min-h-[600px] flex flex-col">

                {/* HEADER */}
                <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                            Winter Operational Forecast
                        </h2>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
                            <Activity className="w-3 h-3 text-blue-500" />
                            v3.1 • Human & System Analysis
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 flex flex-col">

                    {/* SEARCH BAR */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 bg-white/5 rounded-md p-1 pl-4 flex items-center border border-white/10">
                            <span className="text-white/20 mr-2 text-xs">TARGET:</span>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
                                placeholder="ENTER JURISDICTION (e.g. Ashburn)"
                                className="bg-transparent border-none text-white focus:ring-0 w-full text-sm font-mono uppercase placeholder-white/10"
                            />
                        </div>
                        <Select value={dayIndex.toString()} onValueChange={(v) => setDayIndex(parseInt(v))}>
                            <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white font-mono text-xs uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#09090b] border-white/10 text-white">
                                <SelectItem value="0">T-0 (Today)</SelectItem>
                                <SelectItem value="1">T+24 (Tmrw)</SelectItem>
                                <SelectItem value="2">T+48 (2 Day)</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={handlePredict}
                            disabled={loading || !city}
                            className="bg-white text-black hover:bg-white/90 font-mono text-xs uppercase px-8"
                        >
                            {loading ? "COMPUTING..." : "RUN MODEL"}
                        </Button>
                    </div>

                    {error && <div className="text-red-500 text-xs font-mono mb-4">ERROR: {error}</div>}

                    {/* RESULT TERMINAL */}
                    <AnimatePresence mode="wait">
                        {result && studentView ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col gap-12"
                            >
                                {/* LAYER 1: STUDENT VIEW (Simple, Emotional, Clear) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Likely Outcome</div>
                                            <h1 className={`text-4xl md:text-5xl font-black tracking-tight leading-tight ${studentView.headline.includes("OPEN") ? 'text-emerald-400' :
                                                studentView.headline.includes("CLOSED") ? 'text-red-400' : 'text-yellow-400'
                                                }`}>
                                                {studentView.headline}
                                            </h1>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${studentView.confidence === 'High' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/50'
                                                }`}>
                                                Confidence: {studentView.confidence}
                                            </div>
                                            <div className="text-xs text-white/40">
                                                {studentView.confidence === 'High' ? "Conditions are stable." : "Forecasts disagree significantly."}
                                            </div>
                                        </div>
                                    </div>

                                    {/* "WHY WE THINK THIS" CARD */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Info className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-1 h-4 bg-blue-500 rounded-full" />
                                            Why We Think This
                                        </h3>
                                        <ul className="space-y-3">
                                            {studentView.reasons.map((reason, i) => (
                                                <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                                                    <span className="text-blue-500/50 mt-1">●</span>
                                                    {reason}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* LAYER 2: TECHNICAL VIEW (Toggle) */}
                                <div className="border-t border-white/5 pt-8">
                                    <button
                                        onClick={() => setShowTechnical(!showTechnical)}
                                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors mx-auto"
                                    >
                                        <Activity className="w-3 h-3" />
                                        {showTechnical ? "Hide Technical Analysis" : "Show Technical Analysis"}
                                    </button>

                                    <AnimatePresence>
                                        {showTechnical && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {/* LEFT: STATUS */}
                                                    <div className="flex flex-col justify-center border-r border-white/5 pr-8">
                                                        <div className="space-y-4">
                                                            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                                                                Constraint Engine Status
                                                            </div>
                                                            <div className={`text-2xl font-mono uppercase ${result.statusColor}`}>
                                                                {result.status}
                                                            </div>
                                                            <p className="text-white/50 font-mono text-xs">
                                                                {result.subtext}
                                                            </p>
                                                        </div>

                                                        <div className="mt-8 grid grid-cols-2 gap-8">
                                                            <StatItem
                                                                label="Options Score"
                                                                value={result.metrics.score}
                                                                sub="/ 100"
                                                                delay={0}
                                                                critical={result.metrics.score < 20}
                                                            />
                                                            <StatItem
                                                                label="Primary Limit"
                                                                value={result.metrics.constraint}
                                                                delay={0.1}
                                                                critical={true}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* RIGHT: DATA GRID */}
                                                    <div className="bg-black/40 border border-white/10 rounded-lg p-6 font-mono text-xs relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

                                                        <div className="flex justify-between items-center mb-6">
                                                            <span className="text-white/40 uppercase tracking-widest">Live Telemetry</span>
                                                            <span className="text-[10px] text-white/20">{result.dateLabel}</span>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <DataGridRow
                                                                label="Net Road Accumulation"
                                                                value={`${result.metrics.netSnow}"`}
                                                                warn={parseFloat(result.metrics.netSnow) > 1.5}
                                                            />
                                                            <DataGridRow
                                                                label="Commute Snow Rate"
                                                                value={`${result.metrics.commuteRate}" / hr`}
                                                                trend="up"
                                                                warn={parseFloat(result.metrics.commuteRate) > 0.5}
                                                            />
                                                            <DataGridRow
                                                                label="Ensemble Spread"
                                                                value={`+/- ${result.metrics.spread}"`}
                                                                warn={parseFloat(result.metrics.spread) > 3}
                                                            />
                                                            <DataGridRow
                                                                label="Wind Vector (Max)"
                                                                value={`${result.metrics.windMax} MPH`}
                                                                warn={parseInt(result.metrics.windMax) > 25}
                                                            />
                                                            <DataGridRow
                                                                label="Minimum Temp"
                                                                value={`${result.metrics.tempMin}°F`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col justify-center items-center text-white/10 select-none">
                                <Activity className="w-16 h-16 opacity-20 mb-4" />
                                <div className="text-xs uppercase tracking-[0.5em]">System Ready</div>
                            </div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};
