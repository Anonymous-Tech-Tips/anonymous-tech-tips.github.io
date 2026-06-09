import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Plus, Trash2, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const InteractiveTools: React.FC = () => {
    // --- POMODORO ---
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setPomodoroCount(c => c + 1);
            toast.success("Focus session complete! Take a break.");
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // --- GPA CALCULATOR ---
    const [grades, setGrades] = useState([{ grade: '', weight: '' }]);
    const [gpa, setGpa] = useState<number | null>(null);

    const calculateGPA = () => {
        let totalPoints = 0;
        let totalWeights = 0;
        grades.forEach(g => {
            const w = parseFloat(g.weight) || 1;
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
        toast.success(`GPA: ${result.toFixed(2)}`);
    };

    // --- CITATION GENERATOR ---
    const [citeUrl, setCiteUrl] = useState("");
    const [citeTitle, setCiteTitle] = useState("");
    const [citeAuthor, setCiteAuthor] = useState("");
    const [citeYear, setCiteYear] = useState("");
    const [citeStyle, setCiteStyle] = useState("MLA 9");
    const [citationResult, setCitationResult] = useState("");

    const handleCitation = () => {
        if (!citeUrl) return toast.error("Please enter a URL first");
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const author = citeAuthor || "Unknown Author";
        const title = citeTitle || "Web Page Title";
        const site = (() => { try { return new URL(citeUrl).hostname.replace('www.', ''); } catch { return "Website"; } })();
        const year = citeYear || new Date().getFullYear().toString();
        let citation = "";
        if (citeStyle === "MLA 9") {
            citation = `${author}. "${title}." ${site}, ${year}, ${citeUrl}. Accessed ${date}.`;
        } else if (citeStyle === "APA 7") {
            const nameParts = author.split(' ');
            const lastName = nameParts[nameParts.length - 1];
            const initials = nameParts.slice(0, -1).map((n: string) => n[0] + '.').join(' ');
            citation = `${lastName}, ${initials} (${year}). ${title}. ${site}. ${citeUrl}`;
        } else {
            citation = `"${title}." ${site}. ${year}. Web. ${date}. <${citeUrl}>.`;
        }
        setCitationResult(citation);
        navigator.clipboard.writeText(citation).catch(() => {});
        toast.success("Citation copied to clipboard!", { icon: <Check className="h-4 w-4 text-green-500" /> });
    };

    // --- FLASHCARD BUILDER ---
    interface Flashcard { term: string; def: string; }
    const [cards, setCards] = useState<Flashcard[]>([
        { term: "Mitosis", def: "Cell division producing two identical daughter cells with the same chromosome count as the parent." },
        { term: "Thesis Statement", def: "A specific, arguable claim that states the main argument of an essay, usually at the end of the introduction." },
    ]);
    const [newTerm, setNewTerm] = useState('');
    const [newDef, setNewDef] = useState('');
    const [flashMode, setFlashMode] = useState<'build' | 'study'>('build');
    const [cardIdx, setCardIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [known, setKnown] = useState<Set<number>>(new Set());

    const addCard = () => {
        if (!newTerm.trim() || !newDef.trim()) return toast.error("Enter both term and definition");
        setCards(prev => [...prev, { term: newTerm.trim(), def: newDef.trim() }]);
        setNewTerm('');
        setNewDef('');
        toast.success("Card added!");
    };

    const removeCard = (i: number) => setCards(prev => prev.filter((_, idx) => idx !== i));

    const startStudy = () => {
        if (cards.length === 0) return toast.error("Add at least one card first");
        setCardIdx(0);
        setFlipped(false);
        setKnown(new Set());
        setFlashMode('study');
    };

    const nextCard = () => { setCardIdx(i => (i + 1) % cards.length); setFlipped(false); };
    const prevCard = () => { setCardIdx(i => (i - 1 + cards.length) % cards.length); setFlipped(false); };
    const markKnown = () => {
        setKnown(prev => { const s = new Set(prev); s.add(cardIdx); return s; });
        nextCard();
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
                <span className="text-sm font-semibold text-slate-600 ml-2">Study Tools</span>
            </div>

            <Tabs defaultValue="flashcards" className="w-full">
                <TabsList className="w-full grid grid-cols-4 bg-slate-100 p-1 border-b border-slate-200 h-auto">
                    <TabsTrigger value="flashcards" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 text-slate-600 font-semibold text-xs md:text-sm">Flashcards</TabsTrigger>
                    <TabsTrigger value="timer" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 text-slate-600 font-semibold text-xs md:text-sm">Focus Timer</TabsTrigger>
                    <TabsTrigger value="calc" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 text-slate-600 font-semibold text-xs md:text-sm">GPA Calc</TabsTrigger>
                    <TabsTrigger value="cite" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 text-slate-600 font-semibold text-xs md:text-sm">Citation</TabsTrigger>
                </TabsList>

                {/* FLASHCARD BUILDER */}
                <TabsContent value="flashcards" className="p-0">
                    {flashMode === 'build' ? (
                        <div className="p-5 space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Term / Vocabulary word"
                                    value={newTerm}
                                    onChange={e => setNewTerm(e.target.value)}
                                    className="border-slate-300 text-slate-900 font-medium focus:border-teal-500"
                                    onKeyDown={e => e.key === 'Enter' && document.getElementById('flash-def-input')?.focus()}
                                />
                                <Input
                                    id="flash-def-input"
                                    placeholder="Definition / Answer"
                                    value={newDef}
                                    onChange={e => setNewDef(e.target.value)}
                                    className="border-slate-300 text-slate-900 focus:border-teal-500"
                                    onKeyDown={e => e.key === 'Enter' && addCard()}
                                />
                                <Button onClick={addCard} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-10">
                                    <Plus className="w-4 h-4 mr-1" /> Add Card
                                </Button>
                            </div>
                            <div className="max-h-36 overflow-y-auto space-y-1.5">
                                {cards.map((c, i) => (
                                    <div key={i} className="flex items-start gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-teal-700 truncate">{c.term}</div>
                                            <div className="text-xs text-slate-500 truncate">{c.def}</div>
                                        </div>
                                        <button onClick={() => removeCard(i)} className="text-slate-400 hover:text-red-500 flex-shrink-0 mt-0.5">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                                {cards.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No cards yet — add one above</p>}
                            </div>
                            <Button onClick={startStudy} disabled={cards.length === 0} className="w-full bg-slate-900 hover:bg-black text-white font-bold h-11">
                                Study {cards.length} Card{cards.length !== 1 ? 's' : ''} →
                            </Button>
                        </div>
                    ) : (
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between text-xs text-slate-500 font-medium">
                                <span>{cardIdx + 1} / {cards.length}</span>
                                <span className="text-green-600 font-bold">{known.size} known ✓</span>
                            </div>
                            <div
                                onClick={() => setFlipped(f => !f)}
                                className="min-h-[140px] bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-5 text-center select-none hover:border-teal-400 transition-colors"
                            >
                                <div className="text-xs font-bold uppercase tracking-wide text-teal-600 mb-2">{flipped ? 'Definition' : 'Term'}</div>
                                <div className="font-bold text-slate-900 text-lg leading-snug">
                                    {flipped ? cards[cardIdx]?.def : cards[cardIdx]?.term}
                                </div>
                                {!flipped && <div className="text-xs text-slate-400 mt-3">Click to reveal definition</div>}
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <Button variant="outline" size="sm" onClick={prevCard} className="border-slate-300 text-slate-600 font-semibold">
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button size="sm" onClick={markKnown} className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs">
                                    Got it ✓
                                </Button>
                                <Button variant="outline" size="sm" onClick={nextCard} className="border-slate-300 text-slate-600 font-semibold">
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => { setFlashMode('build'); setFlipped(false); }} className="w-full text-slate-500 hover:text-slate-700 text-xs">
                                <RotateCcw className="w-3 h-3 mr-1" /> Back to editor
                            </Button>
                        </div>
                    )}
                </TabsContent>

                {/* POMODORO */}
                <TabsContent value="timer" className="p-8 text-center space-y-5">
                    <div className="text-7xl font-mono font-bold text-slate-800 tracking-wider tabular-nums">
                        {formatTime(timeLeft)}
                    </div>
                    {pomodoroCount > 0 && (
                        <p className="text-sm font-bold text-teal-700">🍅 {pomodoroCount} session{pomodoroCount !== 1 ? 's' : ''} completed</p>
                    )}
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={() => setIsActive(!isActive)}
                            className={`font-bold text-lg px-8 h-12 ${isActive ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-teal-600 hover:bg-teal-700 text-white"}`}
                        >
                            {isActive ? "Pause" : "Start Focus"}
                        </Button>
                        <Button variant="outline" className="font-semibold text-slate-700 border-slate-300 h-12 px-6" onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }}>
                            Reset
                        </Button>
                    </div>
                    <div className="flex justify-center gap-2">
                        {([['25 min', 25 * 60], ['50 min', 50 * 60], ['5 min break', 5 * 60]] as [string, number][]).map(([label, secs]) => (
                            <button key={label} onClick={() => { setIsActive(false); setTimeLeft(secs); }}
                                className="text-xs text-slate-500 hover:text-teal-700 font-semibold border border-slate-200 hover:border-teal-300 rounded px-2 py-1 transition-colors">
                                {label}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm font-medium text-slate-500">25m focus / 5m break / 20m break after 4</p>
                </TabsContent>

                {/* GRADE CALC */}
                <TabsContent value="calc" className="p-6 space-y-5">
                    <div className="space-y-3">
                        <div className="flex gap-2 text-sm text-slate-700 font-bold">
                            <span className="flex-1">Grade (0–100)</span>
                            <span className="w-24">Weight</span>
                            <span className="w-6"></span>
                        </div>
                        {grades.map((g, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <Input
                                    placeholder="e.g. 95"
                                    value={g.grade}
                                    type="number"
                                    className="font-medium text-slate-900 placeholder:text-slate-400 border-slate-300 focus:border-teal-500"
                                    onChange={(e) => { const n = [...grades]; n[i].grade = e.target.value; setGrades(n); }}
                                />
                                <Input
                                    placeholder="1.0"
                                    className="w-24 font-medium text-slate-900 placeholder:text-slate-400 border-slate-300 focus:border-teal-500"
                                    value={g.weight}
                                    type="number"
                                    onChange={(e) => { const n = [...grades]; n[i].weight = e.target.value; setGrades(n); }}
                                />
                                {grades.length > 1 && (
                                    <button onClick={() => setGrades(grades.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-red-500 w-6 flex-shrink-0">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <Button variant="link" onClick={() => setGrades([...grades, { grade: '', weight: '' }])} className="text-teal-700 font-bold h-auto p-0 text-sm hover:text-teal-800">
                            + Add Course
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
                <TabsContent value="cite" className="p-5 space-y-3">
                    <Input placeholder="URL *" value={citeUrl} className="border-slate-300 text-slate-900 focus:border-teal-500 text-sm" onChange={e => setCiteUrl(e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Author (optional)" value={citeAuthor} className="border-slate-300 text-slate-900 focus:border-teal-500 text-sm" onChange={e => setCiteAuthor(e.target.value)} />
                        <Input placeholder="Year (optional)" value={citeYear} className="border-slate-300 text-slate-900 focus:border-teal-500 text-sm" onChange={e => setCiteYear(e.target.value)} />
                    </div>
                    <Input placeholder="Page title (optional)" value={citeTitle} className="border-slate-300 text-slate-900 focus:border-teal-500 text-sm" onChange={e => setCiteTitle(e.target.value)} />
                    <div className="flex gap-1.5">
                        {["MLA 9", "APA 7", "Chicago"].map(style => (
                            <button key={style} onClick={() => setCiteStyle(style)}
                                className={`flex-1 text-xs font-bold py-1.5 rounded border transition-colors ${citeStyle === style ? "bg-teal-50 border-teal-500 text-teal-800" : "border-slate-300 text-slate-600 hover:border-teal-300"}`}>
                                {style}
                            </button>
                        ))}
                    </div>
                    <Button onClick={handleCitation} className="w-full bg-slate-900 hover:bg-black text-white h-10 font-bold text-sm">
                        <Copy className="w-4 h-4 mr-2" /> Generate & Copy
                    </Button>
                    {citationResult && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{citeStyle}</div>
                            <p className="text-xs text-slate-700 leading-relaxed font-mono break-all">{citationResult}</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </motion.div>
    );
};
