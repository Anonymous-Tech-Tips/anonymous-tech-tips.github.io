import React from 'react';
import { Search, ChevronRight, Atom, Code, Globe, Database, PenTool, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ResourceDirectory: React.FC = () => {
    return (
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
    );
};

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
