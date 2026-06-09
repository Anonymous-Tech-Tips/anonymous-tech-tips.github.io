import React from 'react';
import { Calculator, Microscope, Globe, BookOpen, Clock, Code } from "lucide-react";

const subjects = [
    {
        icon: Calculator,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        title: 'Mathematics',
        tips: [
            'Practice problems daily, not just before exams — math is a skill, not a subject',
            'Write every step, even obvious ones; most errors happen in mental shortcuts',
            'Understand why formulas work, not just how to use them',
            'When stuck, work a simpler version of the problem first',
            'Khan Academy + Paul\'s Online Math Notes for free explanations at any level',
        ],
    },
    {
        icon: Microscope,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        title: 'Sciences',
        tips: [
            'Draw diagrams and flowcharts — biology and chemistry are visual subjects',
            'Connect concepts to real-world examples before memorizing definitions',
            'Use mnemonics for complex processes (PEMDAS, ROYGBIV, HOMES)',
            'PhET Interactive Simulations (phet.colorado.edu) for physics and chemistry labs',
            'For AP Science: do free-response questions from prior years — they repeat themes',
        ],
    },
    {
        icon: BookOpen,
        color: 'text-violet-600',
        bg: 'bg-violet-50',
        border: 'border-violet-200',
        title: 'English / Literature',
        tips: [
            'Annotate as you read: circle unfamiliar words, underline thesis statements, note tone shifts',
            'For any essay: thesis first, then find evidence that supports it — not the other way around',
            'Read your essays aloud; you will catch awkward sentences your eyes skip over',
            'Literary devices to know: imagery, irony, juxtaposition, motif, allusion, foil',
            'SparkNotes is for confirming understanding, not replacing reading — teachers can tell',
        ],
    },
    {
        icon: Clock,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        title: 'History / Social Studies',
        tips: [
            'History is causes, events, and consequences — always ask "why did this happen?" and "so what?"',
            'Create timelines and connect events across regions; context makes dates memorable',
            'For essays: ACED structure — Argument, Context, Evidence, Discussion',
            'Primary sources reveal bias; ask who wrote it, when, and why',
            'Crash Course History on YouTube condenses entire units into 12-minute videos',
        ],
    },
    {
        icon: Globe,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        title: 'World Languages',
        tips: [
            'Immerse daily: change your phone language, watch shows with target-language subtitles',
            'Speak aloud even when alone — pronunciation is a muscle that needs practice',
            'Use Anki for vocabulary: spaced repetition beats vocab lists by a large margin',
            'Learn 500 most common words first — they cover 80% of everyday conversation',
            'Language Exchange apps (Tandem, HelloTalk) connect you to native speakers for free',
        ],
    },
    {
        icon: Code,
        color: 'text-slate-600',
        bg: 'bg-slate-100',
        border: 'border-slate-200',
        title: 'Computer Science',
        tips: [
            'Type out code — never copy-paste when learning; muscle memory matters',
            'Debug by reading error messages top-to-bottom; the first error usually causes the rest',
            'CS50 (Harvard, free on edX) is the best intro course ever made for any skill level',
            'Build something real: projects teach you more than any tutorial',
            'Understand time complexity (Big O) before interviews — O(n) vs O(n²) changes everything',
        ],
    },
];

export const SubjectTips: React.FC = () => {
    return (
        <div className="bg-white border-t border-slate-200 px-6 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Subject-Specific Strategies</h3>
                    <p className="text-slate-500 mt-2 text-base max-w-2xl mx-auto">
                        Generic study advice rarely works. Here's what actually helps in each subject.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {subjects.map(({ icon: Icon, color, bg, border, title, tips }) => (
                        <div key={title} className={`rounded-xl p-5 border ${border} ${bg}`}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center">
                                    <Icon className={`h-4 w-4 ${color}`} />
                                </div>
                                <h4 className="font-bold text-slate-900">{title}</h4>
                            </div>
                            <ul className="space-y-2.5">
                                {tips.map((tip, i) => (
                                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                                        <span className={`${color} font-bold flex-shrink-0 text-xs mt-0.5`}>{i + 1}.</span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
