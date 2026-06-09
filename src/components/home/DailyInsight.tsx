import React from 'react';
import { Quote } from "lucide-react";

const quotes = [
    { text: "Education is not the learning of facts, but the training of the mind to think.", author: "Albert Einstein" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
];

const studyTips = [
    "Try the Pomodoro Technique today: 25 minutes of focused work, then a 5-minute break. After 4 rounds, take a 20-minute break.",
    "Before reviewing your notes tonight, close them and write down everything you remember first. This active recall is 2x more effective than re-reading.",
    "Stuck on a concept? Try explaining it out loud as if you're teaching a 10-year-old. The Feynman Technique reveals exactly where your gaps are.",
    "Space out your studying: reviewing material at increasing intervals (1 day, 3 days, 1 week) beats cramming by a factor of 4 for long-term retention.",
    "For any assignment due this week, start it today — even for just 10 minutes. Starting is the hardest part; momentum builds from there.",
    "If you have a big exam coming up, take a full practice test under timed conditions. It's the single highest-return study activity available.",
    "Take care of tomorrow's performance today: sleep 7–9 hours. Memory consolidation happens during sleep — an all-nighter costs more than it buys.",
];

export const DailyInsight: React.FC = () => {
    const dayIndex = new Date().getDay();
    const quote = quotes[dayIndex];
    const tip = studyTips[dayIndex];

    return (
        <section className="bg-teal-900 text-teal-50 py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center space-y-4 mb-12">
                    <Quote className="h-10 w-10 mx-auto text-teal-400 opacity-60" />
                    <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed max-w-3xl mx-auto">
                        "{quote.text}"
                    </blockquote>
                    <cite className="block text-teal-300 font-semibold not-italic">— {quote.author}</cite>
                </div>

                {/* Daily study tip */}
                <div className="bg-teal-800/60 border border-teal-700 rounded-2xl p-6 mb-10 text-center max-w-3xl mx-auto">
                    <div className="text-xs font-black uppercase tracking-widest text-teal-400 mb-2">Today's Study Tip</div>
                    <p className="text-teal-100 text-base leading-relaxed font-medium">{tip}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-teal-800 pt-10">
                    <div>
                        <div className="text-3xl font-bold text-white">6</div>
                        <div className="text-sm text-teal-300">Subject Guides</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">4</div>
                        <div className="text-sm text-teal-300">Exam Prep Sections</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">50+</div>
                        <div className="text-sm text-teal-300">Curated Resources</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">100%</div>
                        <div className="text-sm text-teal-300">Free, No Sign-In</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
