import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Zap, BookOpen } from "lucide-react";

export const PcOptimization: React.FC = () => {
    return (
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
    );
};
