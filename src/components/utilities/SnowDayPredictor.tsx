
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Snowflake, Wind, Thermometer, Search, MapPin, Loader2, Info, ArrowRight, History, Activity, AlertTriangle, ShieldAlert, Sparkles, Smile } from "lucide-react";
import { WeatherService, GeoResult, WeatherData } from "@/services/WeatherService";
import { motion, AnimatePresence } from "framer-motion";
import { FallingSnow } from "@/components/FallingSnow";

// --- CUSTOM COMPONENTS FOR HIGH-END LOOK ---

const StatItem = ({ label, value, sub, delay, critical }: { label: string, value: string | number, sub?: string, delay: number, critical?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col border-l pl-4 ${critical ? 'border-red-500/50' : 'border-white/20'}`}
    >
        <span className={`text-[10px] uppercase tracking-[0.2em] mb-1 font-medium ${critical ? 'text-red-400' : 'text-blue-100/60'}`}>{label}</span>
        <span className={`text-2xl font-light tracking-tight ${critical ? 'text-red-100' : 'text-white'}`}>{value}</span>
        {sub && <span className="text-[10px] text-white/40 mt-1">{sub}</span>}
    </motion.div>
);

const DataGridRow = ({ label, value, trend, warn }: { label: string, value: string, trend?: 'up' | 'down' | 'flat', warn?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/10 text-xs font-mono">
        <span className="text-white/60 uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-2">
            <span className={warn ? "text-red-300 font-bold" : "text-white"}>{value}</span>
            {trend === 'up' && <span className="text-red-300">↑</span>}
            {trend === 'down' && <span className="text-blue-300">↓</span>}
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

    // --- REFACTORED ALGORITHM V4.2 ---
    const calculateConstraints = (data: WeatherData, dayIdx: number, activeAlerts: string[], userFactors: any) => {
        const apiDayIdx = dayIdx + 7;
        const startHour = apiDayIdx * 24;
        const endHour = startHour + 24;

        const hourlySnow = data.hourly.snowfall.slice(startHour, endHour);
        const hourlyTemps = data.hourly.temperature_2m.slice(startHour, endHour);
        const hourlyCodes = data.hourly.weather_code.slice(startHour, endHour);
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
        const minTempC = Math.min(...hourlyTemps);
        const minTempF = (minTempC * 9 / 5) + 32;
        let tempScore = Math.max(0, 32 - minTempF);

        // D. PRECIP TYPE FACTOR (0-3)
        let precipScore = 0;
        const hasIce = hourlyCodes.some(c => [66, 67, 56, 57].includes(c));
        const hasHeavy = hourlyCodes.some(c => [73, 75, 85, 86].includes(c));
        const hasAnySnow = hourlyCodes.some(c => c >= 71);

        if (hasIce) precipScore = 3;
        else if (hasHeavy || newSnowIn > 4) precipScore = 3;
        else if (newSnowIn > 1) precipScore = 2;
        else if (hasAnySnow) precipScore = 1;

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
        let budgetMultiplier = 1.0;
        if (userFactors.daysUsed <= 3) budgetMultiplier = 1.1;
        else if (userFactors.daysUsed >= 9) budgetMultiplier = 0.8;
        if (userFactors.delaysUsed > 5) budgetMultiplier -= 0.05;

        let sentimentBonus = 0;
        if (userFactors.sentiment === 'viral') sentimentBonus = 10;
        else if (userFactors.sentiment === 'angry') sentimentBonus = 5;

        let safetyBonus = 0;
        if (userFactors.roadStatus === 'icy') safetyBonus = 30;
        else if (userFactors.roadStatus === 'unplowed') safetyBonus = 20;
        else if (userFactors.roadStatus === 'spotty') safetyBonus = 10;
        else if (userFactors.roadStatus === 'clear') safetyBonus = -15;

        // --- FINAL CALCULATION ---
        let rawScore = ((snowScore + timingScore + tempScore + precipScore) * confidence);
        rawScore = (rawScore * budgetMultiplier) + sentimentBonus + safetyBonus;

        // --- CALC PROBABILITY (PERCENTAGE) ---
        let chance = Math.min(99, Math.round((rawScore / 40) * 100));
        if (chance < 1) chance = 1;

        if (existingDepth > 10 || userFactors.roadStatus === 'icy' || userFactors.roadStatus === 'unplowed') chance = 99;

        // --- STATUS MAPPING ---
        let status = "Business as Usual";
        let subtext = "School is likely to open on time.";
        let statusColor = "text-emerald-300";
        let bgGradient = "from-emerald-900/40 to-emerald-800/20";
        let primaryConstraint = "Clear";

        if (rawScore > 35 || existingDepth > 10 || userFactors.roadStatus === 'icy') {
            status = "❄️ SNOW DAY CONFIRMED";
            subtext = userFactors.roadStatus === 'icy' ? "Severe icing reported." : existingDepth > 10 ? "Massive snowpack." : "Conditions exceed limits!";
            statusColor = "text-indigo-200";
            bgGradient = "from-indigo-600/40 to-purple-600/40";
            primaryConstraint = userFactors.roadStatus === 'icy' ? "Ice" : "Heavy Snow";
        } else if (rawScore > 15 || existingDepth > 5 || userFactors.roadStatus === 'unplowed') {
            status = "DELAY / CLOSING LIKELY";
            subtext = "Disruption highly likely.";
            statusColor = "text-blue-200";
            bgGradient = "from-blue-600/40 to-blue-400/20";
            primaryConstraint = "Road Conditions";
        } else if (rawScore > 5) {
            status = "WATCHING CLOSELY";
            subtext = "Minor disruption possible.";
            statusColor = "text-amber-200";
            bgGradient = "from-amber-600/40 to-amber-500/20";
            primaryConstraint = "Light Precip";
        }

        const pClose = chance;
        const pDelay = chance > 60 ? 30 : chance > 30 ? 60 : 20; // Heuristic placeholders
        const pOpen = Math.max(0, 100 - pClose - pDelay);

        const dateStr = new Date(data.daily.time[apiDayIdx]).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

        return {
            status, subtext, statusColor, bgGradient, score: rawScore, dateLabel: dateStr,
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
        let headline = "School is OPEN";
        let confidence = "High";
        let reasons = [];
        const pClose = parseInt(result.metrics.probClose || "0");

        if (pClose > 60) {
            headline = "SNOW DAY LIKELY!";
            confidence = "High";
        } else if (pClose > 30) {
            headline = "Delay Expected";
            confidence = "Medium";
        } else if (parseFloat(result.metrics.rawScore) > 5) {
            headline = "Keep an Eye Out";
            confidence = "Low";
        }

        // Generate Data-Driven Reasons
        const snowScore = parseFloat(result.metrics.snowScore);
        const timingScore = parseInt(result.metrics.timingScore);

        if (snowScore > 10) reasons.push("Big Snow Coming! ❄️");
        else if (snowScore > 0) reasons.push("Some powder on the way.");

        if (timingScore >= 3) reasons.push("Snow hits during bus runs! 🚌");

        if (parseInt(result.metrics.tempScore) > 5) reasons.push("It's freezing! Ice alert. 🧊");

        if (pClose < 20 && parseFloat(result.metrics.rawScore) < 5) reasons.push("Sadly, looking pretty clear. ☀️");

        return { headline, confidence, reasons };
    };

    const DISTRICTS = [
        { id: "LCPS", name: "Loudoun County (LCPS)", lat: 39.0438, lon: -77.4874 },
        { id: "FCPS", name: "Fairfax County (FCPS)", lat: 38.8462, lon: -77.3064 },
        { id: "PWCS", name: "Prince William (PWCS)", lat: 38.7428, lon: -77.3298 }
    ];

    const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]);

    const handlePredict = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        setAlerts([]);

        try {
            const { lat, lon } = selectedDistrict;

            // Fetch data
            const [weather, fetchedAlerts] = await Promise.all([
                WeatherService.getWinterWeather(lat, lon),
                WeatherService.getActiveAlerts(lat, lon)
            ]).catch(e => {
                console.error("Fetch Error:", e);
                throw new Error("Could not connect to weather satellites.");
            });

            setAlerts(fetchedAlerts);

            if (weather) {
                const prediction = calculateConstraints(weather, dayIndex, fetchedAlerts, factors);
                setResult({
                    location: { name: selectedDistrict.name, country: "US" },
                    ...prediction,
                    rawWeather: weather
                });
            } else {
                throw new Error("Weather data returned empty.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Try again!");
        } finally {
            setLoading(false);
        }
    };


    // Effect to update result if factors change
    useEffect(() => {
        if (result && result.rawWeather) {
            const prediction = calculateConstraints(result.rawWeather, dayIndex, alerts, factors);
            setResult({ ...result, ...prediction });
        }
    }, [dayIndex, alerts, factors]);

    const studentView = result ? getStudentView(result) : null;

    return (
        <div className="w-full bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 font-sans shadow-indigo-900/20">
            {/* Background Effects */}
            <FallingSnow count={40} />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 p-6 md:p-10 min-h-[600px] flex flex-col">
                {/* HEADER */}
                <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-xl relative z-10">
                            Snow Day Predictor
                        </h2>
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-indigo-200/80">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span>Oracle Engine v4.2</span>
                        </div>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="space-y-6 mb-8">
                    {/* Primary Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 bg-white/5 backdrop-blur-md rounded-xl p-1 pl-4 flex items-center border border-white/10 hover:border-white/20 transition-colors">
                            <span className="text-white/50 mr-2 text-[10px] font-bold uppercase tracking-widest">District</span>
                            <Select
                                value={selectedDistrict.id}
                                onValueChange={(id) => setSelectedDistrict(DISTRICTS.find(d => d.id === id) || DISTRICTS[0])}
                            >
                                <SelectTrigger className="bg-transparent border-none text-white font-bold text-lg w-full focus:ring-0 shadow-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-indigo-500/20 text-white font-bold">
                                    {DISTRICTS.map(d => (
                                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Select value={dayIndex.toString()} onValueChange={(v) => setDayIndex(parseInt(v))}>
                            <SelectTrigger className="w-full md:w-48 bg-white/5 backdrop-blur-md border-white/10 text-white font-bold rounded-xl h-auto py-3">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-indigo-500/20 text-white font-bold">
                                <SelectItem value="0">Today</SelectItem>
                                <SelectItem value="1">Tomorrow</SelectItem>
                                <SelectItem value="2">2 Days Out</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            onClick={handlePredict}
                            disabled={loading}
                            className="bg-indigo-500 hover:bg-indigo-400 text-white text-lg font-black px-8 py-3 h-auto rounded-xl shadow-lg shadow-indigo-500/20 active:translate-y-1 transition-all flex-none"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "PROPHESIZE"}
                        </Button>
                    </div>

                    {/* Advanced Factors (Restored) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Road Conditions</label>
                            <Select value={factors.roadStatus} onValueChange={(v) => setFactors({ ...factors, roadStatus: v })}>
                                <SelectTrigger className="bg-white/5 border-white/10 h-8 text-xs font-bold"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-slate-900 text-white border-white/10">
                                    <SelectItem value="clear">Clear</SelectItem>
                                    <SelectItem value="spotty">Spotty Ice</SelectItem>
                                    <SelectItem value="icy">Severe Icing</SelectItem>
                                    <SelectItem value="unplowed">Unplowed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Social Media</label>
                            <Select value={factors.sentiment} onValueChange={(v) => setFactors({ ...factors, sentiment: v })}>
                                <SelectTrigger className="bg-white/5 border-white/10 h-8 text-xs font-bold"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-slate-900 text-white border-white/10">
                                    <SelectItem value="neutral">Neutral</SelectItem>
                                    <SelectItem value="viral">Viral Panic</SelectItem>
                                    <SelectItem value="angry">Angry Parents</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex justify-between">
                                Snow Days Used <span className="text-white">{factors.daysUsed}</span>
                            </label>
                            <input
                                type="range" min="0" max="10" value={factors.daysUsed}
                                onChange={(e) => setFactors({ ...factors, daysUsed: parseInt(e.target.value) })}
                                className="w-full accent-indigo-400 bg-white/10 h-1 rounded-full appearance-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex justify-between">
                                Delays Used <span className="text-white">{factors.delaysUsed}</span>
                            </label>
                            <input
                                type="range" min="0" max="10" value={factors.delaysUsed}
                                onChange={(e) => setFactors({ ...factors, delaysUsed: parseInt(e.target.value) })}
                                className="w-full accent-indigo-400 bg-white/10 h-1 rounded-full appearance-none"
                            />
                        </div>
                    </div>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center text-white font-bold mb-8 backdrop-blur-md"
                    >
                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-200" />
                        {error}
                        <Button variant="link" onClick={handlePredict} className="text-white underline block mx-auto mt-2">Try Again</Button>
                    </motion.div>
                )}

                {/* RESULTS AREA */}
                <AnimatePresence mode="wait">
                    {result && studentView ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className={`p-8 md:p-12 rounded-3xl bg-gradient-to-br ${result.bgGradient} border border-white/20 shadow-2xl relative overflow-hidden group`}>
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
                                <div className="relative z-10 text-center space-y-4">
                                    <div className="inline-block px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-white/90 border border-white/10 shadow-lg">
                                        The Oracle Speaks
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl tracking-tight leading-none">
                                        {studentView.headline}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
                                        {studentView.reasons[0]}
                                    </p>
                                </div>
                            </div>

                            {/* DETAILS */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Confidence Level</div>
                                    <div className="text-3xl font-black tracking-tight">{studentView.confidence}</div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Snow Score</div>
                                    <div className="text-3xl font-black tracking-tight">{result.metrics.snowScore}<span className="text-sm font-medium opacity-40 ml-1">/ 100</span></div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Chance to Close</div>
                                    <div className="text-3xl font-black tracking-tight text-white">{result.metrics.probClose}%</div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowTechnical(!showTechnical)}
                                className="w-full py-4 text-center text-white/30 hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all hover:scale-105 active:scale-95"
                            >
                                {showTechnical ? "Hide Nerd Stats" : "Show Nerd Stats"}
                            </button>

                            {showTechnical && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="bg-black/40 rounded-xl p-6 font-mono text-xs overflow-hidden border border-white/5"
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {Object.entries(result.metrics).map(([k, v]) => (
                                            <div key={k} className="flex flex-col gap-1">
                                                <span className="text-white/30 uppercase text-[9px] tracking-wider">{k}</span>
                                                <span className="font-bold text-white">{String(v)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                        </motion.div>
                    ) : (
                        !loading && (
                            <div className="flex flex-col items-center justify-center py-24 text-center text-white/30 space-y-4">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-pulse-subtle">
                                    <Sparkles className="w-8 h-8 opacity-50" />
                                </div>
                                <p className="text-lg font-medium max-w-xs mx-auto">
                                    Configure the engine above and consult the Oracle for the latest prophecy.
                                </p>
                            </div>
                        )
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
