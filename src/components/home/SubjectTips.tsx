import React from 'react';
import { Calculator, Microscope, Globe } from "lucide-react";

export const SubjectTips: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-7xl mx-auto mb-20">
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
    );
};
