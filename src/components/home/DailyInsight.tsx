import React from 'react';
import { Quote } from "lucide-react";

export const DailyInsight: React.FC = () => {
    return (
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
    );
};
