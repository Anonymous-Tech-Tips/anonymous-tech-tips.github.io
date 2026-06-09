import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Atom, Code, Globe, Database, PenTool, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
    {
        icon: Atom,
        title: "Science & Math",
        color: "text-blue-600",
        bg: "bg-blue-50",
        links: [
            { label: "WolframAlpha", url: "https://www.wolframalpha.com" },
            { label: "Desmos Graphing Calculator", url: "https://www.desmos.com/calculator" },
            { label: "PhET Interactive Simulations", url: "https://phet.colorado.edu/" },
            { label: "The Feynman Lectures (Free)", url: "https://www.feynmanlectures.caltech.edu/" },
            { label: "Khan Academy", url: "https://www.khanacademy.org/" },
            { label: "Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu/" },
        ],
    },
    {
        icon: Code,
        title: "Computer Science",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        links: [
            { label: "CS50 Harvard (Free)", url: "https://cs50.harvard.edu/x/" },
            { label: "The Odin Project", url: "https://www.theodinproject.com/" },
            { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
            { label: "Replit IDE (Browser-based)", url: "https://replit.com/" },
            { label: "LeetCode (Interview Prep)", url: "https://leetcode.com/" },
            { label: "Roadmap.sh (Learning Paths)", url: "https://roadmap.sh/" },
        ],
    },
    {
        icon: Globe,
        title: "Humanities & Languages",
        color: "text-amber-600",
        bg: "bg-amber-50",
        links: [
            { label: "Duolingo for Schools", url: "https://schools.duolingo.com/" },
            { label: "Project Gutenberg (Free Books)", url: "https://www.gutenberg.org/" },
            { label: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/" },
            { label: "National Archives (Primary Sources)", url: "https://www.archives.gov/" },
            { label: "Google Arts & Culture", url: "https://artsandculture.google.com/" },
            { label: "Crash Course (History, English)", url: "https://www.youtube.com/@crashcourse" },
        ],
    },
    {
        icon: Database,
        title: "Academic Research",
        color: "text-purple-600",
        bg: "bg-purple-50",
        links: [
            { label: "Google Scholar", url: "https://scholar.google.com/" },
            { label: "JSTOR (Free Articles)", url: "https://www.jstor.org/" },
            { label: "Purdue OWL (Citations & Writing)", url: "https://owl.purdue.edu/" },
            { label: "ZBib Citation Generator", url: "https://zbib.org/" },
            { label: "ResearchRabbit (Paper Explorer)", url: "https://www.researchrabbit.ai/" },
            { label: "Connected Papers (Visual Graph)", url: "https://www.connectedpapers.com/" },
        ],
    },
    {
        icon: PenTool,
        title: "Productivity & Notes",
        color: "text-slate-600",
        bg: "bg-slate-100",
        links: [
            { label: "Notion for Students (Free)", url: "https://www.notion.so/product/notion-for-education" },
            { label: "Anki Flashcard App", url: "https://apps.ankiweb.net/" },
            { label: "Obsidian (Local Notes)", url: "https://obsidian.md/" },
            { label: "Excalidraw (Whiteboard)", url: "https://excalidraw.com/" },
            { label: "Hemingway Editor (Clarity)", url: "https://hemingwayapp.com/" },
            { label: "Zotero (Citation Manager)", url: "https://www.zotero.org/" },
        ],
    },
    {
        icon: PlayCircle,
        title: "Video Learning",
        color: "text-rose-600",
        bg: "bg-rose-50",
        links: [
            { label: "Crash Course (All Subjects)", url: "https://www.youtube.com/@crashcourse" },
            { label: "TED-Ed", url: "https://ed.ted.com/" },
            { label: "PBS Nova", url: "https://www.pbs.org/wgbh/nova/" },
            { label: "Kurzgesagt", url: "https://kurzgesagt.org/" },
            { label: "3Blue1Brown (Math)", url: "https://www.youtube.com/@3blue1brown" },
            { label: "MIT OpenCourseWare", url: "https://ocw.mit.edu/" },
        ],
    },
];

export const ResourceDirectory: React.FC = () => {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        if (!query.trim()) return categories;
        const q = query.toLowerCase();
        return categories
            .map(cat => ({
                ...cat,
                links: cat.links.filter(l => l.label.toLowerCase().includes(q)),
            }))
            .filter(cat => cat.title.toLowerCase().includes(q) || cat.links.length > 0);
    }, [query]);

    return (
        <main id="resources" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Curated Learning Directory</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Hand-picked, verified resources — no spam, no paywalls where avoidable.</p>
                </div>
                <div className="relative w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search tools and resources..."
                        className="pl-9 bg-white border-slate-300"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="text-center text-slate-400 py-12">No results for "{query}"</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(cat => (
                        <ResourceCard key={cat.title} icon={cat.icon} title={cat.title} links={cat.links} color={cat.color} bg={cat.bg} />
                    ))}
                </div>
            )}
        </main>
    );
};

const ResourceCard = ({ icon: Icon, title, links, color, bg }: { icon: React.ElementType; title: string; links: { label: string; url: string }[]; color: string; bg: string }) => (
    <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
        <CardHeader className="pb-3">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-2`}>
                <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <CardTitle className="text-lg font-bold text-slate-900">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-1.5">
                {links.map((link, i) => (
                    <li key={i}>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group flex items-center justify-between text-sm text-slate-700 hover:text-teal-700 hover:bg-teal-50 p-2 rounded-md transition-colors"
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
