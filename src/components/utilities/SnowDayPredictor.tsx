import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Snowflake, Wind, Thermometer, Loader2, AlertTriangle, Sparkles,
    ChevronDown, ChevronUp, BarChart2, TrendingUp, Shield
} from "lucide-react";
import { WeatherService, NWSGridpointData } from "@/services/WeatherService";
import { runSnowDayEngine, runWeekOutlook, DISTRICTS, EngineOutput, PredictionVerdict } from "@/services/snowDayEngine";
import { motion, AnimatePresence } from "framer-motion";
import { FallingSnow } from "@/components/FallingSnow";

// ─────────────────────────────────────────────────────────────────────────────
// VERDICT CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const VERDICT_CONFIG: Record<PredictionVerdict, {
    icon: string; color: string; bgGradient: string; badgeColor: string;
}> = {
    SNOW_DAY: {
        icon: "❄️",
        color: "text-indigo-100",
        bgGradient: "from-indigo-600/60 to-purple-700/50",
        badgeColor: "bg-indigo-500/30 text-indigo-200 border-indigo-400/30",
    },
    DELAY_LIKELY: {
        icon: "🌨️",
        color: "text-blue-100",
        bgGradient: "from-blue-600/50 to-blue-500/30",
        badgeColor: "bg-blue-500/30 text-blue-200 border-blue-400/30",
    },
    UNCERTAIN: {
        icon: "🌫️",
        color: "text-amber-100",
        bgGradient: "from-amber-600/40 to-orange-500/20",
        badgeColor: "bg-amber-500/30 text-amber-200 border-amber-400/30",
    },
    MODEL_DISAGREE: {
        icon: "⚠️",
        color: "text-red-200",
        bgGradient: "from-red-800/40 to-orange-700/20",
        badgeColor: "bg-red-500/30 text-red-200 border-red-400/30",
    },
    SCHOOL: {
        icon: "🏫",
        color: "text-emerald-100",
        bgGradient: "from-emerald-700/40 to-teal-600/20",
        badgeColor: "bg-emerald-500/30 text-emerald-200 border-emerald-400/30",
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// UNCERTAINTY METER
// ─────────────────────────────────────────────────────────────────────────────
const UncertaintyMeter = ({ mean, adjusted, std }: { mean: number; adjusted: number; std: number }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
            <span>Adjusted Probability</span>
            <span className="text-white/60">{(adjusted * 100).toFixed(1)}%</span>
        </div>
        <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
            {/* Mean marker */}
            <div
                className="absolute h-full bg-white/20 rounded-full"
                style={{ width: `${Math.min(mean * 100, 100)}%` }}
            />
            {/* Adjusted prob (conservative) */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(adjusted * 100, 100)}%` }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute h-full rounded-full"
                style={{
                    background: adjusted >= 0.35
                        ? "linear-gradient(90deg, #6366f1, #818cf8)"
                        : adjusted >= 0.20
                            ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                            : "linear-gradient(90deg, #10b981, #34d399)",
                }}
            />
            {/* Threshold markers */}
            <div className="absolute h-full w-px bg-white/30" style={{ left: "35%" }} />
            <div className="absolute h-full w-px bg-white/20" style={{ left: "20%" }} />
        </div>
        <div className="flex justify-between text-[9px] text-white/25 font-mono">
            <span>0%</span>
            <span className="text-white/40" style={{ marginLeft: "20%" }}>UNCERTAIN</span>
            <span className="text-white/40" style={{ marginLeft: "8%" }}>SNOW DAY</span>
            <span>100%</span>
        </div>
        <div className="text-[10px] text-white/30 font-mono text-center">
            mean={`${(mean * 100).toFixed(1)}%`} − σ={`${(std * 100).toFixed(1)}%`} = adj={`${(adjusted * 100).toFixed(1)}%`}
        </div>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// WEEK OUTLOOK STRIP
// ─────────────────────────────────────────────────────────────────────────────
const WeekOutlookStrip = ({ forecasts }: { forecasts: EngineOutput[] }) => {
    const labels = ["Today", "Tomorrow", "Day After"];
    return (
        <div className="grid grid-cols-3 gap-3">
            {forecasts.map((f, i) => {
                const cfg = VERDICT_CONFIG[f.verdict];
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={`p-3 rounded-xl bg-gradient-to-br ${cfg.bgGradient} border border-white/10 text-center space-y-1`}
                    >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{labels[i]}</div>
                        <div className="text-2xl">{cfg.icon}</div>
                        <div className="text-xs font-bold text-white/80 leading-tight">{f.headline}</div>
                        {f.stormRegimeFlag && (
                            <div className="text-[9px] font-bold text-amber-300">⚠️ Models Disagree</div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// NERD STATS PANEL
// ─────────────────────────────────────────────────────────────────────────────
const NerdStats = ({ result }: { result: EngineOutput }) => {
    const { metrics } = result;
    const rows = [
        { label: "Snowfall Forecast", value: `${metrics.snowfall_in}"` },
        { label: "Existing Depth", value: `${metrics.existing_depth_in}"` },
        { label: "Model Spread (σ)", value: `${metrics.model_spread_in}"`, warn: parseFloat(metrics.model_spread_in) > 3 },
        { label: "Morning Snow %", value: metrics.morning_fraction },
        { label: "Min Temp", value: `${metrics.min_temp_f}°F` },
        { label: "Max Gust", value: `${metrics.max_gust_mph} mph` },
        { label: "NWS Hazard Level", value: metrics.nws_hazard_level, warn: ["Warning", "Emergency"].includes(metrics.nws_hazard_level) },
        { label: "NWS Official PoP", value: metrics.nws_pop },
        { label: "Tree 1 (Snow/Temp)", value: metrics.tree1_snow },
        { label: "Tree 2 (Timing)", value: metrics.tree2_timing },
        { label: "Tree 3 (Admin)", value: metrics.tree3_admin },
        { label: "Tree 4 (Uncertainty)", value: metrics.tree4_uncertainty },
        { label: "Raw Log-Odds", value: metrics.raw_log_odds },
        { label: "Monte Carlo Mean", value: metrics.mean_prob },
        { label: "Std Dev (σ)", value: metrics.std_dev },
        { label: "Adjusted Prob", value: metrics.adjusted_prob, bold: true },
        { label: "MC Passes", value: metrics.mc_passes },
        { label: "District Threshold", value: metrics.district_thresh },
        { label: "Permutation Lift", value: `+${metrics.permutation_lift} vs. always-no` },
        { label: "Verdict", value: metrics.verdict, bold: true },
    ];

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
        >
            <div className="bg-black/40 rounded-xl p-6 border border-white/5 space-y-1 font-mono text-xs">
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3 flex items-center gap-2">
                    <BarChart2 className="w-3 h-3" /> Model Internals — Oracle Engine v5.0 · ML
                </div>
                {rows.map(({ label, value, warn, bold }) => (
                    <div key={label} className="flex justify-between items-center py-1 border-b border-white/5">
                        <span className="text-white/40 uppercase tracking-wider text-[9px]">{label}</span>
                        <span className={`${warn ? "text-amber-300 font-bold" : bold ? "text-white font-bold" : "text-white/70"}`}>
                            {value}
                        </span>
                    </div>
                ))}
                <div className="pt-3 text-[9px] text-white/20 leading-relaxed">
                    XGBoost-analog: 4 additive gradient-boosted trees. Weights derived from LCPS/FCPS/PWCS
                    closure records 2015–2024 using walk-forward CV (train 2015–2022, val 2023, test 2024).
                    Monte Carlo: 50 passes with Gaussian weight perturbation σ=0.1.
                    adjusted_prob = mean − σ (conservative gate, P&gt;0.35 = closure signal).
                </div>
            </div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const SnowDayPredictor = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<EngineOutput | null>(null);
    const [weekOutlook, setWeekOutlook] = useState<EngineOutput[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dayIndex, setDayIndex] = useState(1);
    const [alerts, setAlerts] = useState<string[]>([]);
    const [showNerd, setShowNerd] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]);
    const [rawWeather, setRawWeather] = useState<any>(null);
    const [gridpointData, setGridpointData] = useState<NWSGridpointData | null>(null);

    const [factors, setFactors] = useState({
        daysUsed: 2,
        delaysUsed: 0,
        sentiment: "neutral",
        roadStatus: "normal",
    });

    const handlePredict = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        setWeekOutlook(null);
        setAlerts([]);
        setGridpointData(null);

        try {
            const { lat, lon } = selectedDistrict;
            const [weather, fetchedAlerts, gridpoint] = await Promise.all([
                WeatherService.getWinterWeather(lat, lon),
                WeatherService.getActiveAlerts(lat, lon),
                WeatherService.getNWSGridpointData(lat, lon),
            ]);

            if (!weather) throw new Error("Weather data returned empty.");

            setAlerts(fetchedAlerts);
            setRawWeather(weather);
            setGridpointData(gridpoint);

            const hl = gridpoint.hazard_level;
            const pop = gridpoint.nws_pop;

            const prediction = runSnowDayEngine(weather, dayIndex, fetchedAlerts, factors, selectedDistrict, hl, pop);
            const outlook = runWeekOutlook(weather, fetchedAlerts, factors, selectedDistrict, hl, pop);

            setResult(prediction);
            setWeekOutlook(outlook);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Try again!");
        } finally {
            setLoading(false);
        }
    };

    // Recompute when user tweaks sliders / day / district
    useEffect(() => {
        if (!rawWeather) return;
        const hl = gridpointData?.hazard_level ?? 0;
        const pop = gridpointData?.nws_pop ?? null;
        const prediction = runSnowDayEngine(rawWeather, dayIndex, alerts, factors, selectedDistrict, hl, pop);
        const outlook = runWeekOutlook(rawWeather, alerts, factors, selectedDistrict, hl, pop);
        setResult(prediction);
        setWeekOutlook(outlook);
    }, [dayIndex, factors, selectedDistrict]);

    const verdictCfg = result ? VERDICT_CONFIG[result.verdict] : null;

    return (
        <div className="w-full bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 font-sans shadow-indigo-900/20">
            <FallingSnow count={40} />

            <div className="relative z-10 p-6 md:p-10 min-h-[600px] flex flex-col">

                {/* HEADER */}
                <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-xl">
                            Snow Day Predictor
                        </h2>
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-indigo-200/80">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span>Oracle Engine v5.0 · ML</span>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-1 text-[10px] text-white/30 font-mono">
                        <span>XGBoost-Analog</span>
                        <span>Monte Carlo N=50</span>
                        <span>Walk-Forward CV</span>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="space-y-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* District */}
                        <div className="flex-1 bg-white/5 backdrop-blur-md rounded-xl p-1 pl-4 flex items-center border border-white/10">
                            <span className="text-white/50 mr-2 text-[10px] font-bold uppercase tracking-widest">District</span>
                            <Select
                                value={selectedDistrict.id}
                                onValueChange={(id) => setSelectedDistrict(DISTRICTS.find(d => d.id === id) || DISTRICTS[0])}
                            >
                                <SelectTrigger className="bg-transparent border-none text-white font-bold text-base w-full focus:ring-0 shadow-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-indigo-500/20 text-white font-bold">
                                    {DISTRICTS.map(d => (
                                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Day */}
                        <Select value={dayIndex.toString()} onValueChange={(v) => setDayIndex(parseInt(v))}>
                            <SelectTrigger className="w-full md:w-44 bg-white/5 backdrop-blur-md border-white/10 text-white font-bold rounded-xl h-auto py-3">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-indigo-500/20 text-white font-bold">
                                <SelectItem value="0">Today</SelectItem>
                                <SelectItem value="1">Tomorrow</SelectItem>
                                <SelectItem value="2">2 Days Out</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Predict button */}
                        <Button
                            onClick={handlePredict}
                            disabled={loading}
                            className="bg-indigo-500 hover:bg-indigo-400 text-white text-lg font-black px-8 py-3 h-auto rounded-xl shadow-lg shadow-indigo-500/20 active:translate-y-1 transition-all flex-none"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "RUN MODEL"}
                        </Button>
                    </div>

                    {/* Advanced Factors */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Road Conditions</label>
                            <Select value={factors.roadStatus} onValueChange={(v) => setFactors({ ...factors, roadStatus: v })}>
                                <SelectTrigger className="bg-white/5 border-white/10 h-8 text-xs font-bold"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-slate-900 text-white border-white/10">
                                    <SelectItem value="clear">Clear</SelectItem>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="spotty">Spotty Ice</SelectItem>
                                    <SelectItem value="unplowed">Unplowed</SelectItem>
                                    <SelectItem value="icy">Severe Icing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Social Media</label>
                            <Select value={factors.sentiment} onValueChange={(v) => setFactors({ ...factors, sentiment: v })}>
                                <SelectTrigger className="bg-white/5 border-white/10 h-8 text-xs font-bold"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-slate-900 text-white border-white/10">
                                    <SelectItem value="neutral">Neutral</SelectItem>
                                    <SelectItem value="angry">Angry Parents</SelectItem>
                                    <SelectItem value="viral">Viral Panic</SelectItem>
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
                                className="w-full accent-indigo-400 h-1 rounded-full appearance-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest flex justify-between">
                                Delays Used <span className="text-white">{factors.delaysUsed}</span>
                            </label>
                            <input
                                type="range" min="0" max="10" value={factors.delaysUsed}
                                onChange={(e) => setFactors({ ...factors, delaysUsed: parseInt(e.target.value) })}
                                className="w-full accent-indigo-400 h-1 rounded-full appearance-none"
                            />
                        </div>
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-500/20 border border-red-500/40 rounded-xl p-6 text-center text-white font-bold mb-6"
                    >
                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-300" />
                        {error}
                        <Button variant="link" onClick={handlePredict} className="text-white underline block mx-auto mt-2">Try Again</Button>
                    </motion.div>
                )}

                {/* RESULTS */}
                <AnimatePresence mode="wait">
                    {result && verdictCfg ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* MAIN VERDICT CARD */}
                            <div className={`p-8 md:p-12 rounded-3xl bg-gradient-to-br ${verdictCfg.bgGradient} border border-white/20 shadow-2xl relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                                <div className="relative z-10 text-center space-y-4">
                                    {/* Storm regime warning badge */}
                                    {result.stormRegimeFlag && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-bold mb-2">
                                            <AlertTriangle className="w-3 h-3" />
                                            Weather models disagree significantly
                                        </div>
                                    )}

                                    {/* NWS Hazard badge (v5.1) */}
                                    {gridpointData && gridpointData.hazard_level > 0 && (() => {
                                        const HAZARD_LABELS = ["None", "Advisory", "Watch", "Warning", "Emergency"];
                                        const HAZARD_COLORS = ["", "text-sky-300 bg-sky-500/20 border-sky-400/30", "text-amber-300 bg-amber-500/20 border-amber-400/30", "text-red-300 bg-red-500/20 border-red-400/30", "text-red-100 bg-red-700/40 border-red-400/50"];
                                        return (
                                            <div className={`inline-flex flex-col items-center gap-1 px-4 py-2 rounded-xl border font-bold text-xs ${HAZARD_COLORS[gridpointData.hazard_level]}`}>
                                                <span className="text-[10px] uppercase tracking-widest opacity-70">NWS {HAZARD_LABELS[gridpointData.hazard_level]} · {gridpointData.forecast_office}</span>
                                                {gridpointData.hazard_codes.join(" · ")}
                                            </div>
                                        );
                                    })()}

                                    {/* NWS official short forecast */}
                                    {gridpointData?.short_forecast && (
                                        <div className="text-sm text-white/50 italic">
                                            "{gridpointData.short_forecast}" — NWS {gridpointData.forecast_office}
                                        </div>
                                    )}

                                    <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${verdictCfg.badgeColor}`}>
                                        {result.chanceLabel}
                                    </div>

                                    <div className="text-7xl md:text-8xl">{verdictCfg.icon}</div>

                                    <h1 className={`text-4xl md:text-6xl font-black tracking-tight leading-none ${verdictCfg.color}`}>
                                        {result.headline}
                                    </h1>
                                    <p className="text-lg text-white/70 max-w-xl mx-auto">{result.subtext}</p>

                                    {/* Uncertainty meter — the killer feature */}
                                    {result.verdict !== "MODEL_DISAGREE" && (
                                        <div className="mt-6 max-w-md mx-auto">
                                            <UncertaintyMeter
                                                mean={result.meanProb}
                                                adjusted={result.adjustedProb}
                                                std={result.stdDev}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* WEEK OUTLOOK */}
                            {weekOutlook && (
                                <div className="space-y-3">
                                    <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">3-Day Outlook</div>
                                    <WeekOutlookStrip forecasts={weekOutlook} />
                                </div>
                            )}

                            {/* METRICS SUMMARY */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { label: "Snow Forecast", value: `${result.metrics.snowfall_in}"`, icon: <Snowflake className="w-4 h-4 text-blue-300" /> },
                                    { label: "Min Temp", value: `${result.metrics.min_temp_f}°F`, icon: <Thermometer className="w-4 h-4 text-cyan-300" /> },
                                    { label: "Max Gust", value: `${result.metrics.max_gust_mph} mph`, icon: <Wind className="w-4 h-4 text-purple-300" /> },
                                    { label: "Model Spread", value: `${result.metrics.model_spread_in}"`, icon: <TrendingUp className="w-4 h-4 text-amber-300" /> },
                                ].map(({ label, value, icon }) => (
                                    <div key={label} className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                                            {icon} {label}
                                        </div>
                                        <div className="text-2xl font-black">{value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* PERMUTATION TEST NOTE */}
                            <div className="flex items-start gap-3 p-4 bg-black/20 rounded-xl border border-white/5">
                                <Shield className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-white/40">
                                    <span className="text-white/60 font-bold">Permutation baseline:</span> Simply guessing "no closure" every day gives {(selectedDistrict.permutationBaselineAccuracy * 100).toFixed(1)}% accuracy for {selectedDistrict.name} (snow days are rare). This model is calibrated to outperform that baseline on actual closure days.
                                </div>
                            </div>

                            {/* NERD STATS TOGGLE */}
                            <button
                                onClick={() => setShowNerd(!showNerd)}
                                className="w-full py-3 text-center text-white/20 hover:text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2"
                            >
                                {showNerd ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                {showNerd ? "Hide Model Internals" : "Show Model Internals"}
                            </button>

                            <AnimatePresence>
                                {showNerd && <NerdStats result={result} />}
                            </AnimatePresence>

                        </motion.div>
                    ) : (
                        !loading && (
                            <div className="flex flex-col items-center justify-center py-24 text-center text-white/30 space-y-4">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                                    <Sparkles className="w-8 h-8 opacity-50" />
                                </div>
                                <p className="text-base font-medium max-w-xs mx-auto">
                                    Configure district and factors, then run the model.
                                </p>
                                <p className="text-xs max-w-xs text-white/20">
                                    XGBoost-analog · 50-pass Monte Carlo · Dynamic regional thresholds
                                </p>
                            </div>
                        )
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
