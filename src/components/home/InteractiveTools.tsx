import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SnowDayPredictor } from "@/components/utilities/SnowDayPredictor";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export const InteractiveTools: React.FC = () => {
    // --- POMODORO STATES ---
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            toast.success("Focus session complete!");
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // --- GPA CALCULATOR STATES ---
    const [grades, setGrades] = useState([{ grade: '', weight: '' }]);
    const [gpa, setGpa] = useState<number | null>(null);

    const calculateGPA = () => {
        let totalPoints = 0;
        let totalWeights = 0;
        grades.forEach(g => {
            const w = parseFloat(g.weight) || 1; // Default
            const score = parseFloat(g.grade);
            if (!isNaN(score)) {
                let points = 0;
                if (score >= 90) points = 4;
                else if (score >= 80) points = 3;
                else if (score >= 70) points = 2;
                else if (score >= 60) points = 1;

                totalPoints += points * w;
                totalWeights += w;
            }
        });
        const result = totalWeights > 0 ? totalPoints / totalWeights : 0;
        setGpa(result);
        toast.success(`GPA Calculated: ${result.toFixed(2)}`);
    };

    // --- CITATION GENERATOR STATES ---
    const [citeUrl, setCiteUrl] = useState("");
    const [citeStyle, setCiteStyle] = useState("MLA 9");

    const handleCitation = () => {
        if (!citeUrl) return toast.error("Please enter a URL first");

        const date = new Date().toLocaleDateString();
        let citation = "";

        if (citeStyle === "MLA 9") {
            citation = `Unknown Author. "Web Page Title." Website Name, Publisher, ${date}, ${citeUrl}.`;
        } else if (citeStyle === "APA 7") {
            citation = `Author, A. A. (Year, Month Date). Title of page. Site Name. ${citeUrl}`;
        } else {
            citation = `"${citeUrl}". Accessed ${date}.`;
        }

        navigator.clipboard.writeText(citation);
        toast.success("Citation copied to clipboard!", {
            icon: <Check className="h-4 w-4 text-green-500" />
        });
    };

    return (
        <motion.div
            id="utilities"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-slate-900/5"
        >
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>
                <span className="text-sm font-semibold text-slate-600 ml-2">Quick Tools</span>
            </div>

            <Tabs defaultValue="timer" className="w-full">
                <TabsList className="w-full grid grid-cols-4 bg-slate-100 p-1 border-b border-slate-200 h-auto">
                    <TabsTrigger value="timer" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 text-slate-600 font-semibold text-xs md:text-sm">Focus Timer</TabsTrigger>
                    <TabsTrigger value="calc" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 text-slate-600 font-semibold text-xs md:text-sm">Grade Calc</TabsTrigger>
                    <TabsTrigger value="cite" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 text-slate-600 font-semibold text-xs md:text-sm">Citation</TabsTrigger>
                    <TabsTrigger value="snow" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 text-slate-600 font-semibold text-xs md:text-sm">Snow Day</TabsTrigger>
                </TabsList>

                {/* SNOW DAY PREDICTOR */}
                <TabsContent value="snow" className="p-0">
                    <div className="h-[400px]">
                        <SnowDayPredictor />
                    </div>
                </TabsContent>

                {/* POMODORO */}
                <TabsContent value="timer" className="p-8 text-center space-y-6">
                    <div className="text-7xl font-mono font-bold text-slate-800 tracking-wider tabular-nums">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={() => setIsActive(!isActive)}
                            className={`font-bold text-lg px-8 h-12 ${isActive ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-teal-600 hover:bg-teal-700 text-white"}`}
                        >
                            {isActive ? "Pause Session" : "Start Focus"}
                        </Button>
                        <Button variant="outline" className="font-semibold text-slate-700 border-slate-300 h-12 px-6" onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }}>
                            Reset
                        </Button>
                    </div>
                    <p className="text-sm font-medium text-slate-500">Standard Pomodoro: 25m Focus / 5m Break</p>
                </TabsContent>

                {/* GRADE CALC */}
                <TabsContent value="calc" className="p-6 space-y-5">
                    <div className="space-y-3">
                        <div className="flex gap-2 text-sm text-slate-700 font-bold">
                            <span className="flex-1">Grade (0-100)</span>
                            <span className="w-24">Weight (0-1.0)</span>
                        </div>
                        {grades.map((g, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    placeholder="e.g. 95"
                                    value={g.grade}
                                    type="number"
                                    className="font-medium text-slate-900 placeholder:text-slate-400 border-slate-300 focus:border-teal-500"
                                    onChange={(e) => {
                                        const newGrades = [...grades];
                                        newGrades[i].grade = e.target.value;
                                        setGrades(newGrades);
                                    }}
                                />
                                <Input
                                    placeholder="1.0"
                                    className="w-24 font-medium text-slate-900 placeholder:text-slate-400 border-slate-300 focus:border-teal-500"
                                    value={g.weight}
                                    type="number"
                                    onChange={(e) => {
                                        const newGrades = [...grades];
                                        newGrades[i].weight = e.target.value;
                                        setGrades(newGrades);
                                    }}
                                />
                            </div>
                        ))}
                        <Button variant="link" onClick={() => setGrades([...grades, { grade: '', weight: '' }])} className="text-teal-700 font-bold h-auto p-0 text-sm hover:text-teal-800">
                            + Add Another Course
                        </Button>
                    </div>
                    <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl border border-slate-200">
                        <Button onClick={calculateGPA} size="sm" className="bg-slate-900 hover:bg-black text-white px-6 font-bold">Calculate GPA</Button>
                        <div className="text-right">
                            <span className="text-xs text-slate-500 block uppercase tracking-wide font-bold">Weighted GPA</span>
                            <span className="text-2xl font-black text-teal-700">{gpa !== null ? gpa.toFixed(2) : '--'}</span>
                        </div>
                    </div>
                </TabsContent>

                {/* CITATION */}
                <TabsContent value="cite" className="p-6 space-y-5">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Source URL</label>
                            <Input
                                placeholder="https://www.example.com/article"
                                value={citeUrl}
                                className="border-slate-300 text-slate-900 focus:border-teal-500"
                                onChange={(e) => setCiteUrl(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Citation Style</label>
                            <div className="flex gap-2">
                                {["MLA 9", "APA 7", "Chicago"].map((style) => (
                                    <Button
                                        key={style}
                                        onClick={() => setCiteStyle(style)}
                                        variant="outline"
                                        size="sm"
                                        className={`flex-1 font-semibold ${citeStyle === style ? "bg-teal-50 border-teal-500 text-teal-800 ring-1 ring-teal-500" : "text-slate-600 border-slate-300"}`}
                                    >
                                        {style}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <Button
                            onClick={handleCitation}
                            className="w-full bg-slate-900 hover:bg-black text-white mt-2 h-12 font-bold text-base"
                        >
                            <Copy className="w-5 h-5 mr-2" /> Generate & Copy Citation
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </motion.div>
    );
};
