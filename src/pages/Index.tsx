import React, { useState, useEffect } from "react";
import {
  BookOpen, Calculator, Clock, Search, GraduationCap,
  Atom, Globe, Code, PenTool, Database,
  Microscope, ChevronRight, PlayCircle, Quote, Check, Copy, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { GamerHome } from "@/components/GamerHome";
import { toast } from "sonner";
import { SnowDayPredictor } from "@/components/utilities/SnowDayPredictor";

// --- 🏫 PUBLIC ACADEMIC PAGE ---

const AcademicHome = () => {
  // --- INTERACTIVE TOOL STATES ---

  // 1. Pomodoro Timer
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

  // 2. GPA Calculator
  const [grades, setGrades] = useState([{ grade: '', weight: '' }]);
  const [gpa, setGpa] = useState<number | null>(null);

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalWeights = 0;
    grades.forEach(g => {
      const w = parseFloat(g.weight) || 1; // Default weight 1.0
      const score = parseFloat(g.grade);
      if (!isNaN(score)) {
        // Simple conversion: 90-100=4, 80-89=3, etc. (Simplified)
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

  // 3. Citation Generator
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

  const scrollToResources = () => {
    document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100">

      {/* --- HERO SECTION --- */}
      <section className="bg-white border-b border-slate-200 pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-sm font-bold border border-teal-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              Academic Portal v2.4 Live
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Accelerate Your <br />
              <span className="text-teal-700 decoration-teal-300/30 underline decoration-4 underline-offset-4">Learning Potential</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 max-w-xl leading-relaxed font-medium">
              Access essential tools, curated research databases, and study optimization resources.
              Designed for the modern scholar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={scrollToResources}
                size="lg"
                className="bg-teal-700 hover:bg-teal-800 text-white rounded-lg px-8 h-14 text-lg font-bold shadow-teal-900/10 shadow-lg transition-all hover:-translate-y-1"
              >
                Explore Resources
              </Button>
              <Link to="/login">
                <Button variant="outline" size="lg" className="bg-white border-slate-300 text-slate-800 font-semibold h-14 px-8 text-lg hover:bg-slate-50 transition-all border-2">
                  Student Portal Login
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* --- INTERACTIVE TOOLS WIDGET --- */}
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
                {/* TABS UPDATED FOR BETTER READABILITY */}
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
        </div>
      </section>

      {/* --- CONTENT SECTIONS (Updated for Contrast) --- */}
      <section id="education" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Master Your Learning Journey</h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto font-medium">
            Evidence-based study techniques and comprehensive guides to help you learn more effectively.
          </p>
        </div>

        {/* Study Techniques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">

          {/* The Feynman Technique */}
          <Card className="bg-white border-slate-200 shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-teal-700" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">The Feynman Technique</CardTitle>
                  <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wide">Learn by Teaching</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-slate-700 leading-relaxed text-base font-medium">
                Named after Nobel Prize-winning physicist Richard Feynman, this technique helps you truly understand concepts by explaining them in simple terms.
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">How to Use It:</h4>
                <ol className="space-y-2 text-sm text-slate-900">
                  <li className="flex gap-2">
                    <span className="font-bold text-teal-600 flex-shrink-0">1.</span>
                    <span><strong>Choose a concept</strong> you want to learn and write it at the top of a blank page.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-teal-600 flex-shrink-0">2.</span>
                    <span><strong>Explain it in simple terms</strong> as if teaching a child. Use plain language and avoid jargon.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-teal-600 flex-shrink-0">3.</span>
                    <span><strong>Identify gaps</strong> in your explanation. Where did you struggle? These are areas you don't fully understand.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-teal-600 flex-shrink-0">4.</span>
                    <span><strong>Review and simplify</strong> your explanation until it's crystal clear and uses only simple words.</span>
                  </li>
                </ol>
              </div>
              <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <p className="text-sm text-teal-900">
                  <strong>Pro Tip:</strong> If you can't explain something simply, you don't understand it well enough. This technique forces you to confront gaps in your knowledge.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Spaced Repetition */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Spaced Repetition</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">Remember More, Study Less</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-900 leading-relaxed">
                Spaced repetition is a learning technique that incorporates increasing intervals of time between subsequent reviews of previously learned material. It's scientifically proven to improve long-term retention by up to 200%.
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">The Optimal Schedule:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                    <span className="font-bold text-blue-600 w-24">Day 1:</span>
                    <span className="text-slate-900">Learn new material</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                    <span className="font-bold text-blue-600 w-24">Day 2:</span>
                    <span className="text-slate-900">First review (24 hours later)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                    <span className="font-bold text-blue-600 w-24">Day 5:</span>
                    <span className="text-slate-900">Second review (3 days later)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                    <span className="font-bold text-blue-600 w-24">Day 12:</span>
                    <span className="text-slate-900">Third review (1 week later)</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                    <span className="font-bold text-blue-600 w-24">Day 30:</span>
                    <span className="text-slate-900">Final review (1 month later)</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Why It Works:</strong> Your brain strengthens neural pathways each time you recall information. Spacing out reviews forces active recall, making memories more durable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Active Recall */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Active Recall</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">Test Yourself to Learn Better</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-900 leading-relaxed">
                Active recall is the practice of actively stimulating memory during the learning process. Instead of passively re-reading notes, you force your brain to retrieve information, which dramatically strengthens memory formation.
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">Effective Methods:</h4>
                <ul className="space-y-2 text-sm text-slate-900">
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Flashcards:</strong> Write questions on one side, answers on the other. Quiz yourself regularly.</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Practice Tests:</strong> Take practice exams under timed conditions to simulate the real thing.</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Blank Page Method:</strong> Close your notes and write everything you remember from scratch.</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Teach Someone:</strong> Explain concepts to a friend or study partner without looking at notes.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-sm text-purple-900">
                  <strong>Research Shows:</strong> Students who use active recall score 50% higher on tests compared to those who just re-read material.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pomodoro Technique */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Pomodoro Technique</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">Beat Procrastination with Time Blocks</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-900 leading-relaxed">
                The Pomodoro Technique is a time management method that uses a timer to break work into focused intervals (traditionally 25 minutes) separated by short breaks. It helps maintain concentration and prevents burnout.
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">The Classic Pomodoro Cycle:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <span className="font-bold text-amber-600 text-2xl">🍅</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">25-Minute Focus Session</p>
                      <p className="text-sm text-slate-600">Work on ONE task with complete focus. No distractions allowed.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                    <span className="font-bold text-green-600 text-2xl">☕</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">5-Minute Break</p>
                      <p className="text-sm text-slate-600">Step away from your desk. Stretch, hydrate, or take a quick walk.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="font-bold text-blue-600 text-2xl">🎯</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">After 4 Pomodoros</p>
                      <p className="text-sm text-slate-600">Take a longer 15-30 minute break to fully recharge.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>Pro Tip:</strong> Use our Focus Timer tool above to try it right now! The technique works because it makes large tasks feel manageable and provides regular rewards (breaks).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject-Specific Study Tips */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Subject-Specific Study Strategies</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Math */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-5 w-5 text-blue-600" />
                <h4 className="font-bold text-slate-900">Mathematics</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-900">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Practice problems daily, not just before exams</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Write out every step, even if it seems obvious</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Understand WHY formulas work, don't just memorize</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Teach concepts to others to solidify understanding</span>
                </li>
              </ul>
            </div>

            {/* Science */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Microscope className="h-5 w-5 text-emerald-600" />
                <h4 className="font-bold text-slate-900">Sciences</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-900">
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>Create visual diagrams and flowcharts</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>Connect concepts to real-world examples</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>Use mnemonics for complex processes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>Watch demonstrations and simulations</span>
                </li>
              </ul>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-purple-600" />
                <h4 className="font-bold text-slate-900">Languages</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-900">
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Immerse yourself: watch shows, listen to music</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Practice speaking out loud, even alone</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Use spaced repetition for vocabulary</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Focus on common phrases before grammar rules</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- PC OPTIMIZATION SECTION --- */}
      <section id="pc-optimizations" className="max-w-7xl mx-auto px-6 py-16 bg-slate-50 border-y border-slate-200 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Optimize Your Workstation</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              A slow computer shouldn't hold back your academic potential. We've compiled essential tools and techniques to keep your school device running at peak performance.
            </p>
            <ul className="space-y-4">
              {[
                "Browser Cache & Cookie Management",
                "Startup App Optimization",
                "Educational Software Alternatives",
                "System Resource Monitoring"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-teal-600" />
                  </div>
                  <span className="text-slate-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link to="/login">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-6 h-auto text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Access Optimization Tools
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Performance Boost</h3>
                  <p className="text-slate-600 text-sm">Learn how to safely disable background processes that drain battery and slow down your research.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Focus Mode Setup</h3>
                  <p className="text-slate-600 text-sm">Configure your browser and OS to minimize distractions during deep study sessions.</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
                <p className="text-sm text-slate-500 italic">
                  "Optimizing my laptop's startup apps saved me 5 minutes every morning. Essential for morning lectures!"
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-[10px] text-white font-bold">JD</div>
                  <span className="text-xs font-bold text-slate-900">John D.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CURATED RESOURCES GRID --- */}
      <main id="resources" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Curated Learning Directory</h2>
            <p className="text-slate-500">Verified resources for research and development.</p>
          </div>
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="Search resources..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* STEM CARD */}
          <ResourceCard
            icon={Atom}
            title="Science & Math"
            color="text-blue-600"
            bg="bg-blue-50"
            links={[
              { label: "WolframAlpha", url: "https://www.wolframalpha.com" },
              { label: "Desmos Graphing", url: "https://www.desmos.com/calculator" },
              { label: "PhET Simulations", url: "https://phet.colorado.edu/" },
              { label: "The Feynman Lectures", url: "https://www.feynmanlectures.caltech.edu/" },
              { label: "Khan Academy", url: "https://www.khanacademy.org/" },
            ]}
          />

          {/* CODING CARD */}
          <ResourceCard
            icon={Code}
            title="Computer Science"
            color="text-emerald-600"
            bg="bg-emerald-50"
            links={[
              { label: "CS50 Harvard", url: "https://cs50.harvard.edu/x/" },
              { label: "The Odin Project", url: "https://www.theodinproject.com/" },
              { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
              { label: "Replit IDE", url: "https://replit.com/" },
              { label: "LeetCode", url: "https://leetcode.com/" },
            ]}
          />

          {/* HUMANITIES CARD */}
          <ResourceCard
            icon={Globe}
            title="Humanities & Lang"
            color="text-amber-600"
            bg="bg-amber-50"
            links={[
              { label: "Duolingo Schools", url: "https://schools.duolingo.com/" },
              { label: "Project Gutenberg", url: "https://www.gutenberg.org/" },
              { label: "Stanford Philosophy", url: "https://plato.stanford.edu/" },
              { label: "National Archives", url: "https://www.archives.gov/" },
              { label: "Google Arts & Culture", url: "https://artsandculture.google.com/" },
            ]}
          />

          {/* RESEARCH CARD */}
          <ResourceCard
            icon={Database}
            title="Academic Research"
            color="text-purple-600"
            bg="bg-purple-50"
            links={[
              { label: "Google Scholar", url: "https://scholar.google.com/" },
              { label: "JSTOR", url: "https://www.jstor.org/" },
              { label: "Purdue OWL", url: "https://owl.purdue.edu/" },
              { label: "Zotero Bib", url: "https://zbib.org/" },
              { label: "ResearchRabbit", url: "https://www.researchrabbit.ai/" },
            ]}
          />

          {/* PRODUCTIVITY CARD */}
          <ResourceCard
            icon={PenTool}
            title="Student Utilities"
            color="text-slate-600"
            bg="bg-slate-100"
            links={[
              { label: "Notion for Students", url: "https://www.notion.so/product/notion-for-education" },
              { label: "Anki Flashcards", url: "https://apps.ankiweb.net/" },
              { label: "Obsidian Notes", url: "https://obsidian.md/" },
              { label: "Excalidraw", url: "https://excalidraw.com/" },
              { label: "Pomofocus", url: "https://pomofocus.io/" },
            ]}
          />

          {/* DOCUMENTARIES CARD */}
          <ResourceCard
            icon={PlayCircle}
            title="Visual Learning"
            color="text-rose-600"
            bg="bg-rose-50"
            links={[
              { label: "PBS Nova", url: "https://www.pbs.org/wgbh/nova/" },
              { label: "Nat Geo Education", url: "https://www.nationalgeographic.org/society/education-resources/" },
              { label: "TED-Ed", url: "https://ed.ted.com/" },
              { label: "Kurzgesagt", url: "https://kurzgesagt.org/" },
              { label: "Smithsonian Channel", url: "https://www.smithsonianchannel.com/" },
            ]}
          />
        </div>
      </main>

      {/* --- DAILY INSIGHT SECTION --- */}
      <section className="bg-teal-900 text-teal-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Quote className="h-12 w-12 mx-auto text-teal-400 opacity-50" />
          <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed">
            "Education is not the learning of facts, but the training of the mind to think."
          </blockquote>
          <cite className="block text-teal-300 font-semibold not-italic">— Albert Einstein</cite>

          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-teal-800 mt-8">
            <div>
              <div className="text-3xl font-bold text-white">45+</div>
              <div className="text-sm text-teal-300">Verified Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-teal-300">Uptime Access</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-teal-300">Free Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">Safe</div>
              <div className="text-sm text-teal-300">Distraction Free</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- HELPER COMPONENT ---
const ResourceCard = ({ icon: Icon, title, links, color, bg }: any) => (
  <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
    <CardHeader className="pb-3">
      <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-2`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <CardTitle className="text-lg font-bold text-slate-900">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {links.map((link: any, i: number) => (
          <li key={i}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between text-sm text-slate-700 hover:text-teal-700 hover:bg-teal-50 p-2 rounded-md transition-colors cursor-pointer"
            >
              <span>{link.label}</span>
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// --- MAIN WRAPPER ---
const Index = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <GamerHome />;
  }

  return <AcademicHome />;
};

export default Index;
