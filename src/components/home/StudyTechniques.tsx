import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, GraduationCap, Check } from "lucide-react";

export const StudyTechniques: React.FC = () => {
    return (
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

                {/* Pomodoro Technique (Card version) */}
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
        </section>
    );
};
