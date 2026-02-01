
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

    // --- POST-API ADJUSTMENT FACTORS ---
    const [factors, setFactors] = useState({
        daysUsed: 2, // Default: Early season (generous)
        delaysUsed: 0,
        sentiment: 'neutral', // neutral, viral, angry
        roadStatus: 'normal' // normal, spotty, icy, unplowed
    });

    // --- REFACTORED ALGORITHM V4.2 (ARCHIVE STAT SHEET + HISTORICAL DEPTH + USER FACTORS) ---
    const calculateConstraints = (data: WeatherData, dayIdx: number, activeAlerts: string[], userFactors: any) => {
        const apiDayIdx = dayIdx + 7;
        const startHour = apiDayIdx * 24;
        const endHour = startHour + 24;

        const hourlySnow = data.hourly.snowfall.slice(startHour, endHour);
        const hourlyTemps = data.hourly.temperature_2m.slice(startHour, endHour);
        const hourlyCodes = data.hourly.weather_code.slice(startHour, endHour);
        // ... (existing variable declarations remain same)
        const hourlyGusts = data.hourly.wind_gusts_10m ? data.hourly.wind_gusts_10m.slice(startHour, endHour) : new Array(24).fill(0);

        // --- 1. HISTORICAL CONTEXT ---
        let existingDepth = 0;
        for (let i = 1; i <= 3; i++) {
            const pastDayIdx = apiDayIdx - i;
            if (pastDayIdx >= 0) {
                const daySnow = (data.daily.snowfall_sum[pastDayIdx] || 0) / 2.54;
                existingDepth += daySnow * (0.8 / i);
            }
        }

        // --- 2. STAT SHEET VARIABLES ---
        const newSnowCm = hourlySnow.reduce((a, b) => a + b, 0);
        const newSnowIn = newSnowCm / 2.54;
        const effectiveSnowIn = newSnowIn + (existingDepth > 5 ? existingDepth * 0.5 : 0);
        const snowScore = effectiveSnowIn * 10;

        // B. TIMING SCORE (0-3)
        let timingScore = 0;
        const morningSnow = hourlySnow.slice(4, 10).reduce((a, b) => a + b, 0);
        const lateNightSnow = hourlySnow.slice(0, 4).reduce((a, b) => a + b, 0);

        if (morningSnow > 0.5) timingScore = 3;
        else if (lateNightSnow > 0.5) timingScore = 2;

        // C. TEMP SCORE (32 - MinTemp)
        // FIX: Only count temp score if there is precip or existing snow/wet/ice.
        const minTempC = Math.min(...hourlyTemps);
        const minTempF = (minTempC * 9 / 5) + 32;
        let tempScore = Math.max(0, 32 - minTempF);

        // Gate: If dry and no snow on ground, cold doesn't matter for roads.
        if (effectiveSnowIn < 0.1 && !hasIce && !hasAnySnow) {
            tempScore = 0;
        }

        // D. PRECIP TYPE FACTOR (0-3)
        let precipScore = 0;
        const hasIce = hourlyCodes.some(c => [66, 67, 56, 57].includes(c));
        const hasHeavy = hourlyCodes.some(c => [73, 75, 85, 86].includes(c));
        const hasAnySnow = hourlyCodes.some(c => c >= 71);

        if (hasIce) precipScore = 3;
        else if (hasHeavy || newSnowIn > 4) precipScore = 3;
        else if (newSnowIn > 1) precipScore = 2;
        else if (hasAnySnow) precipScore = 1;

        // FIX: Only count temp score if there is precip or existing snow/wet/ice.
        // Gate: If dry and no snow on ground, cold doesn't matter for roads.
        if (effectiveSnowIn < 0.1 && !hasIce && !hasAnySnow) {
            tempScore = 0;
        }

        // E. CONFIDENCE (Spread + Alert Bonus)
        const spreadCm = data.daily.snowfall_spread ? data.daily.snowfall_spread[apiDayIdx] : 0;
        const spreadIn = spreadCm / 2.54;

        let confidence = 0.8;
        if (spreadIn > 4) confidence = 0.4;
        else if (spreadIn > 2) confidence = 0.6;
        else if (spreadIn < 0.5) confidence = 0.95;

        // ALERT BOOST
        if (activeAlerts.some(a => a.toLowerCase().includes("warning"))) confidence = 1.0;

        // --- F. USER ADJUSTMENT FACTORS (V6.0 Weighted) ---
        // --- F. USER ADJUSTMENT FACTORS (V6.0 Weighted) ---
        // 1. Budget Score (Days Used + Delays)
        // 0-3 Used: Generous (+10%). 4-8: Neutral. 9+: Stingy (-20%).
        let budgetMultiplier = 1.0;
        if (userFactors.daysUsed <= 3) budgetMultiplier = 1.1;
        else if (userFactors.daysUsed >= 9) budgetMultiplier = 0.8;

        // Delays wear down patience too, but less than full days.
        // If > 5 delays used, slight penalty.
        if (userFactors.delaysUsed > 5) budgetMultiplier -= 0.05;

        // 2. Sentiment Bonus (Peer Pressure - Re-weighted)
        let sentimentBonus = 0;
        if (userFactors.sentiment === 'viral') sentimentBonus = 10; // Capped at 10.
        else if (userFactors.sentiment === 'angry') sentimentBonus = 5;

        // 3. Road Safety Override (Re-weighted)
        let safetyBonus = 0;
        if (userFactors.roadStatus === 'icy') safetyBonus = 30; // Ice is critical.
        else if (userFactors.roadStatus === 'unplowed') safetyBonus = 20; // Widespread.
        else if (userFactors.roadStatus === 'spotty') safetyBonus = 10; // Localized/Uncertain.
        else if (userFactors.roadStatus === 'clear') safetyBonus = -15; // Push to open.

        // --- FINAL CALCULATION ---
        let rawScore = ((snowScore + timingScore + tempScore + precipScore) * confidence);

        // Apply User Factors
        rawScore = (rawScore * budgetMultiplier) + sentimentBonus + safetyBonus;

        // --- CALC PROBABILITY (PERCENTAGE) ---
        // Score of 40 is basically a lock (4" snow). Map 0-40 to 0-99%.
        // Sigmoid-ish map so small scores don't look scary.
        let chance = Math.min(99, Math.round((rawScore / 40) * 100));
        if (chance < 1) chance = 1;

        // Overrides
        if (existingDepth > 10 || userFactors.roadStatus === 'icy' || userFactors.roadStatus === 'unplowed') chance = 99;

        // --- STATUS MAPPING ---
        let status = "Business as Usual";
        let subtext = "School is likely to open on time.";
        let statusColor = "text-emerald-400";
        let primaryConstraint = "Clear";

        if (rawScore > 35 || existingDepth > 10 || userFactors.roadStatus === 'icy') {
            status = "❄️ SNOW DAY CONFIRMED";
            subtext = userFactors.roadStatus === 'icy' ? "Severe icing reported." : existingDepth > 10 ? "Massive snowpack limits bus access." : "Conditions exceed operational limits.";
            statusColor = "text-indigo-400";
            primaryConstraint = userFactors.roadStatus === 'icy' ? "Severe Icing" : (existingDepth > 10 ? "Deep Snowpack" : "Heavy Accumulation");
        } else if (rawScore > 15 || existingDepth > 5 || userFactors.roadStatus === 'unplowed') {
            status = "DELAY / CLOSING LIKELY";
            subtext = userFactors.roadStatus === 'unplowed' ? "Roads reported as unplowed." : "Disruption highly likely.";
            statusColor = "text-blue-400";
            primaryConstraint = userFactors.roadStatus === 'unplowed' ? "Road Conditions" : "Mod. Accumulation";
        } else if (rawScore > 5) {
            status = "WATCHING CLOSELY";
            subtext = "Minor disruption possible.";
            statusColor = "text-amber-400";
            primaryConstraint = "Light Precip";
        }

        const dateStr = new Date(data.daily.time[apiDayIdx]).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

        return {
            status, subtext, statusColor, score: rawScore, dateLabel: dateStr,
            metrics: {
                snowScore: snowScore.toFixed(1),
                timingScore: timingScore.toString(),
                tempScore: tempScore.toFixed(1),
                precipScore: precipScore.toString(),
                confidence: confidence.toFixed(2),
                rawScore: rawScore.toFixed(2),
                netSnow: newSnowIn.toFixed(1),
                depth: existingDepth.toFixed(1),
                constraint: primaryConstraint,
                commuteRate: spreadIn.toFixed(1),
                spread: spreadIn.toFixed(1),
                tempMin: minTempF.toFixed(0),
                windMax: Math.max(...hourlyGusts).toFixed(0),
                probOpen: pOpen.toString(),
                probDelay: pDelay.toString(),
                probClose: pClose.toString()
            }
        };
    };

    // --- STUDENT VIEW TRANSLATION ---
    const getStudentView = (result: any) => {
        let headline = "School is expected to be OPEN";
        let confidence = "High";
        let reasons = [];
        const score = parseFloat(result.metrics.rawScore || "0");
        const pClose = parseInt(result.metrics.probClose || "0");

        if (pClose > 60) {
            headline = "SNOW DAY!";
            confidence = "High";
        } else if (pClose > 30 || parseInt(result.metrics.probDelay) > 50) {
            headline = "Delay / Closing Likely";
            confidence = "Medium";
        } else if (score > 5) {
            headline = "Delays Possible";
            confidence = "Low";
        }

        // Generate Data-Driven Reasons
        const snowScore = parseFloat(result.metrics.snowScore);
        const timingScore = parseInt(result.metrics.timingScore);
        const tempScore = parseFloat(result.metrics.tempScore);
        const precipScore = parseInt(result.metrics.precipScore);
        const conf = parseFloat(result.metrics.confidence);

        if (snowScore > 10) reasons.push(`Significant Accumulation: Snow Impact Score is ${snowScore.toFixed(0)}.`);
        else if (snowScore > 0) reasons.push(`Light Accumulation detected.`);

        if (timingScore >= 3) reasons.push("Timing Critical: Snow falling during morning bus loops (4AM+).");
        else if (timingScore === 2) reasons.push("Timing Warning: Snow continuing past midnight.");

        if (tempScore > 5) reasons.push("Temperature Risk: Roads are well below freezing.");

        if (precipScore === 3) reasons.push("Precipitation Type: Ice/Freezing Rain detected (High Disruption).");

        if (conf < 0.6) reasons.push("Low Confidence: Models disagree on storm track.");
        else reasons.push("High Confidence: Models are aligned.");

        if (score < 5) reasons.push("No significant winter weather threats detected.");

        return { headline, confidence, reasons };
    };


    // --- DISTRICT DATA (V5.0 PIVOT) ---
    const DISTRICTS = [
        { id: "LCPS", name: "Loudoun County (LCPS)", lat: 39.0438, lon: -77.4874 },
        { id: "FCPS", name: "Fairfax County (FCPS)", lat: 38.8462, lon: -77.3064 },
        { id: "PWCS", name: "Prince William (PWCS)", lat: 38.7428, lon: -77.3298 } // County Center / Woodbridge
    ];

    const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]);

    const handlePredict = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        setAlerts([]);

        try {
            // v5.0: Using hardcoded coordinates for precision
            const { lat, lon } = selectedDistrict;

            const [weather, fetchedAlerts] = await Promise.all([
                WeatherService.getWinterWeather(lat, lon),
                WeatherService.getActiveAlerts(lat, lon)
            ]);

            setAlerts(fetchedAlerts);

            if (weather) {
                // Pass district name as location context if needed
                // Pass district name as location context if needed
                const prediction = calculateConstraints(weather, dayIndex, fetchedAlerts, factors);
                setResult({
                    location: { name: selectedDistrict.name, country: "US" },
                    ...prediction,
                    rawWeather: weather
                });
            } else {
                setError("Data stream failed. Retrying...");
            }
        } catch (err) {
            setError("Connection interrupted.");
        } finally {
            setLoading(false);
        }
    };

    // Updated Effect to watch factors
    useEffect(() => {
        if (result && result.rawWeather) {
            const prediction = calculateConstraints(result.rawWeather, dayIndex, alerts, factors);
            setResult({ ...result, ...prediction });
        }
    }, [dayIndex, alerts, factors]);


    const studentView = result ? getStudentView(result) : null;

    return (
        <div className="w-full bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 font-sans selection:bg-blue-500/30">

            {/* Ambient Red Glow for Critical Status */}
            {result?.status === 'SYSTEM COLLAPSE' && (
                <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
            )}

            <div className="relative z-10 p-8 md:p-12 min-h-[600px] flex flex-col">

                {/* HEADER */}
                <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
                            Armaan's Snow Day Predictor
                        </h2>
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-200/60">
                            <Snowflake className="w-4 h-4 text-blue-400" />
                            <span>AI-Powered School Closing Forecast</span>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 flex flex-col">

                    {/* SELECTOR BAR (DISTRICT + TIME) */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 bg-white/5 rounded-md p-1 pl-4 flex items-center border border-white/10 focus-within:border-blue-400/50 transition-colors">
                            <span className="text-white/40 mr-2 text-xs font-medium">JURISDICTION:</span>
                            <Select
                                value={selectedDistrict.id}
                                onValueChange={(id) => setSelectedDistrict(DISTRICTS.find(d => d.id === id) || DISTRICTS[0])}
                            >
                                <SelectTrigger className="bg-transparent border-none text-white text-sm w-full focus:ring-0 px-0">
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    {DISTRICTS.map(d => (
                                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Select value={dayIndex.toString()} onValueChange={(v) => setDayIndex(parseInt(v))}>
                            <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                                <SelectItem value="0">Today</SelectItem>
                                <SelectItem value="1">Tomorrow</SelectItem>
                                <SelectItem value="2">2 Days Out</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={handlePredict}
                            disabled={loading}
                            className="bg-white text-black hover:bg-gray-200 text-xs font-bold px-8"
                        >
                            {loading ? "THINKING..." : "PREDICT"}
                        </Button>
                    </div>

                    {/* TUNING CONTROLS (USER FACTORS) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
                        {/* 1. BUDGET */}
                        {/* 1. BUDGET (DAYS + DELAYS) */}
                        <div className="space-y-4">
                            {/* Days Used */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-white/50">
                                    <label>Snow Days</label>
                                    <span className={factors.daysUsed > 10 ? "text-red-400" : "text-emerald-400"}>
                                        {factors.daysUsed} / 15
                                    </span>
                                </div>
                                <input
                                    type="range" min="0" max="15" value={factors.daysUsed}
                                    onChange={(e) => setFactors({ ...factors, daysUsed: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>

                            {/* Delays Used */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-white/50">
                                    <label>Delays</label>
                                    <span className="text-white/70">{factors.delaysUsed}</span>
                                </div>
                                <input
                                    type="range" min="0" max="15" value={factors.delaysUsed}
                                    onChange={(e) => setFactors({ ...factors, delaysUsed: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                            </div>
                        </div>

                        {/* 2. SENTIMENT */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">Social Media Vibe</label>
                            <Select value={factors.sentiment} onValueChange={(v) => setFactors({ ...factors, sentiment: v })}>
                                <SelectTrigger className="bg-black/20 border-white/10 text-xs h-8 text-white"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="neutral">Silent / Neutral</SelectItem>
                                    <SelectItem value="viral">Trending / Viral</SelectItem>
                                    <SelectItem value="angry">Angry Parents</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* 3. ROADS */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/50">My Neighborhood</label>
                            <Select value={factors.roadStatus} onValueChange={(v) => setFactors({ ...factors, roadStatus: v })}>
                                <SelectTrigger className="bg-black/20 border-white/10 text-xs h-8 text-white"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="slush">Slushy</SelectItem>
                                    <SelectItem value="icy">Ice Sheet</SelectItem>
                                    <SelectItem value="unplowed">Unplowed</SelectItem>
                                    <SelectItem value="spotty">Spotty / Variable</SelectItem>
                                    <SelectItem value="clear">Bone Dry</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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

                                            {/* 3-WAY PROBABILITY DISPLAY */}
                                            <div className="flex gap-2 mt-4">
                                                <div className="flex flex-col items-center bg-white/5 px-3 py-2 rounded border border-white/10 min-w-[70px]">
                                                    <span className="text-[10px] text-white/40 uppercase">Open</span>
                                                    <span className="text-xl font-bold text-emerald-400">{result.metrics.probOpen}%</span>
                                                </div>
                                                <div className="flex flex-col items-center bg-white/5 px-3 py-2 rounded border border-white/10 min-w-[70px]">
                                                    <span className="text-[10px] text-white/40 uppercase">Delay</span>
                                                    <span className="text-xl font-bold text-yellow-400">{result.metrics.probDelay}%</span>
                                                </div>
                                                <div className="flex flex-col items-center bg-white/5 px-3 py-2 rounded border border-white/10 min-w-[70px]">
                                                    <span className="text-[10px] text-white/40 uppercase">Close</span>
                                                    <span className="text-xl font-bold text-red-400">{result.metrics.probClose}%</span>
                                                </div>
                                            </div>
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
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Info className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
                                            The Verdict
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
                                                                Prediction Logic
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
                                                            <span className="text-white/40 uppercase tracking-widest">Raw Weather Data</span>
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
