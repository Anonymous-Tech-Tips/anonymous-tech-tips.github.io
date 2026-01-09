import React, { useState, useEffect } from "react";
import { 
  BookOpen, Calculator, Clock, Search, GraduationCap, 
  Atom, Globe, Code, PenTool, Database, 
  Microscope, ChevronRight, PlayCircle, Quote 
} from "lucide-react";
Button } from "@/components/ui/butn";
import { Input } from "@/components/ui/input";
import { Card, CrdContent, CardHeader, CardTitle } from "@/component/ui/card";
impor{ Tabs, TabsContent, TabsList, TabsTrigger @/component/ui/tabs";
import { motion } from "framer-moti";
import { Lik } from "ract-outer-domimport{Fooer } frm "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { GmerHome } from "@/component/GamerHome";
impor { toast } from "sonner";

// --- 🏫 PUBLIC ACADEMIC PAGE ---

const AcademicHome = () => {
  // --- INTERACTIVE TOOL STATES ---
  
  // 1 Pomodoro Timer
  const [timeLeft, etTimeLeft] = seState(25 * 60);
  const [isAtive, setIsAtive] = useStat(fale);
  
  ueEffect(() => {
    let interval: NodeJS.Timeout;
    if isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      toast.success();
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
  const [gpa, setGpa] = useState<number | null>(null;

  const calculateGPA = () => {
    let totalPoints = 0    let totalWeights =0;
grades.forEach(g => {
      const w = parseFloat(g.weight) || 1; 
     constscore=parseFloat(g.grade);
      if (!isNaN(score)) {
            totloints = score ts * w;
        otalWeight+= w;
      }
    });
    settotalWeights > 0 ? totalPoints / totalWeights : 0);
};

    reurn t(
    <div  className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-white border-b border-slate-200 pt-20pb-16px-6 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">        <motion.div
initial={{pacity: 0, y: 20 }}
            aimate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-sm font-semibold border border-teal-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Academic Portal v2.4 Live
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
              Accelerate Your <br/>
              <span className="text-teal-700">Learning Potential</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Access essential tools, curated research databases, and study optimization resources. 
              Designed for the modern scholar.
            </p>
            <div className="flex gap-4 pt-2">
              <Button 
                onsize="lg"       className="bg-teal-700hover:bg-teal-800text-whiterounded-mdpx-8h-12text-base"
              >
                Explore Resources
              </Button>
              <Link to="/login">     <Buttonvariant="outline"size="lg"className="border-slate-300text-slate-700 -12 h-50">
                  Student Portal Login
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* --- INTERACTIVE TOOLS WIDGET -- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .2 }}   className="bg-whiterounded-xlshadow-xlborderer-slate-200 ovflowhidden"
          >
            <div className="g-slate-100px-6 py-3 b border- flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 roundedfull bg-slate-300"></div>
                <div clasNae="w-3 h-3rounded-full bg-sla-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              </div>
              <span className="tefont-eium text-slate-500 ml-2">Quick Tools</span>
            </div>
            
            <Tabs defaultValue="timer" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-slate-50 p-1 border-b border-slate-200">
                <TabsTrigger value="timer" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs mdt-sm">Focus Timer</TabsTrigger>
                <TabsTrigger value="calc" className="data-[state=active]:bg-white daa[state=active]:hadow-s">Grade Calc</TabsTrigger>
               <TabsTrigger value="cite" className="data-[state=aciv]:bg-white data-[state=active]:shadow-sm tet-sm">Citaion</TabsTrigger>
              </TabsList>
              
              {/* POMODORO */}
              <TabsContent value="timer" className="p-8 text-center space-y-6">
                <div className="text-6xl font-mono font-bold text-slate-800 tracking-wider">
                  {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={() => setIsActive(!isActive)}
                    className={isActive ? "bg-amber-600 hover:bg-amber-700": "bg-al-600 hover:bg-teal-700 te"}
                  >
                    {isActive ? "Pase Session" : "Start Focus"}
                  </Button>
                  <Button variant="out" onClick={() => { setIsActive(false); setTimeLeft(25 * 6); }}>
                    Reset
                  </Button>
                </div>
                <p className="text-xs text-slate400">Standard Pomodoro: 25m Focus / 5m Break</p>
              </TabsContent>

              {/* GRADE CALC */}
              <TabsContent value="calc" className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-2 text-sm text-slate-500 font-medium">
                    <span className="flex-1">Grade (0-0)</span>
                    <span className="w-2">Weight</span>
                  </div>
                  {grades.map((g, i) => (
                    <div key={i} className="flex gap-2">
                      <Input 
                        placeholder="95" 
                        value={g.grade}
                        er"
                        onChange={(e) => {
                          const newGrades = [...grades];
                          newGrades[i].grade = e.target.value;
                          setGrades(newGrades);
                        }}
                      />
                      <Input 
                        placehold="1.0  className="w-20"value={g.weigh}
                        te="number"
                        onChange={(e) => {
                          const newGrades = [...grades];
                          newGrades[i].weight = e.target.value;
                          setGrades(newGrades);
                        }}
                      />
                    </div>
                  ))}
                  <Button variant="link" onClick={() => stGrades([...grades, { grade: '', weight: '' }])} classNametext-teal-600 h-auto p-0 text-xs">
                    + Add Course
                  </Butto>
                </div>
                <div className="flex jstify-between ites-center bg-slate-100 p-3 rounded-lg ord border-slate-200">
                  <Button onClick={calculateGPA} size="sm" className=bg-slate-800ite">Calculate</Button>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block uppercase trackng-wide">Weighd A</span>
                    <span className="text-xl font-bold text-teal-700">{gpa !== null ? gpa.toFixed(2) : '--'}</span>
                  </div>
                </div>
              </TabsContent>

              {/* CITATION */}
              <TabsContent value="cite" className="p-6 space-y-4">
                <div className="space-y-3">
                 <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Source URL</label>  <Input
                    placeholder="https://...
                    /></div>
                 <div className="space-y-1<labelclassName="text-xs font-semibold text-slate-500">Style</label>
                   <div className="flex gap-2">
                      ">
                     <Button  variant="outline"size="sm"  className=flex-1  "bg-teal-50 border-teal-200text-teal-700                   >
       sle  </Button>
                      
                    </div>
                  </div>
                  <Button  className="w-fullbg-slate-800 mt-2">Generate Co               </Button>
</dv>
              </TabsContent>
            </Tabs>
          </motion.iv>
        </div>
      </section>

      {/* --- CURATED RESOURCES GRID --- */}
      <main idclasName="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Curated Learning Directory</h2>
            <p className="text-slate-500">Verified resoures fo research and develpment.</p>
          </div>
          <div cassName="reative hidden md:block w64">
            <Search classNae="absolute left-3 op.5 h-4 w-4 text-slate-40" />
            <Input placeholder="Search resources..." className="pl-9e" />
          </div>
        </div>

        <div classNam="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* STEM CARD */}
          <ResourceCard 
            icon={Atom} 
            title="Science & Mat" 
            color="text-blue600"
            bg="bg-blue-50"
            links={[
              { label: "WolframAlpha", url: "https://www.wolframalpha.com" },
              { label: "Desmos Graphing", url: "https://www.desmos.com/calculator" },
              { label: "PhET Simulations", url: "https://phet.colorado.edu/" },
              { label: "The Feynman Lectures", url: "https://www.eynmanlectres.catech.edu/" },
              { abel: "Khan Academy", ul: "https://www.khanacadmy.org/"},
            ]}
          />

          {/* CODING CARD */}
          <ResourceCard 
            ico={Cde} 
            title="Cmutr Sciece" 
            colo="text-emerald-600"
            bg="bg-emerald-50"
            link={[
             { label: "CS50 Harvard", url: "https://s50.harvard.ed/x/" },
              { label: "The Odin Prject", ul: "https://www.theodinproject.com/" },
              { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
              { label: "Replit IDE", url: "https://replit.com/" },
              { label: "LeetCode", url: "https://leetcode.com/" },
            ]}
          />

          {/* HUMANITIES CARD */}
          <ResourceCard 
            icon={Globe} 
            title="Humanities & Lang" 
            color="textamber-600"
            bg="bg-amber-50"
            links={[
              { label: "Duolingo Schools", url: "https://schools.duolingo.com/" },
              { label: "Project Gutenberg", url: "https://www.gutenberg.org/" },
              { label: "Stanford Philosophy", url: "https://plato.stanford.edu/" },
              { label: "National Archives", url: "https://www.archives.gov/" },
              { label: "Google Arts & Culture", url: "htts://artsandculture.google.com/" },
            ]}
          />

          {/* RESEARCH CARD */}
          <ResourceCard 
            icon={Database} 
            title="Academic Research" 
            colr="text-purple-600"
            bg="bg-purple-50"
            lks={[
              { label: "Google Scholar", url: "https://scholar.google.com/" },
              { label: "JSTOR", url: "https://www.jstor.org/" },
              { label: "Purdue OWL", url: "https://owl.purdue.edu/" },
              { label: "Zotero Bib", url: "https://zbib.org/" },
              { label: "ResearchRabbit", url: "htps://www.resarchabbit.ai/" },
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
  <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
    <CardHeader className="pb-3">
      <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-2`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <CardTitle className="text-lg font-bold text-slate-800">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {links.map((link: any, i: number) => (
          <li key={i}>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noreferrer noopener"
              className="group flex items-center justify-between text-sm text-slate-500 hover:text-teal-700 hover:bg-teal-50 p-2 rounded-md transition-colors cursor-pointer"
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
