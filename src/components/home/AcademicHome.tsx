import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "./HeroSection";
import { InteractiveTools } from "./InteractiveTools";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const StudyTechniques = lazy(() => import("./StudyTechniques").then(m => ({ default: m.StudyTechniques })));
const SubjectTips = lazy(() => import("./SubjectTips").then(m => ({ default: m.SubjectTips })));
const FormulaReference = lazy(() => import("./FormulaReference").then(m => ({ default: m.FormulaReference })));
const TestPrepSection = lazy(() => import("./TestPrepSection").then(m => ({ default: m.TestPrepSection })));
const WritingResearchSection = lazy(() => import("./WritingResearchSection").then(m => ({ default: m.WritingResearchSection })));
const CollegeCareerSection = lazy(() => import("./CollegeCareerSection").then(m => ({ default: m.CollegeCareerSection })));
const StudentWellnessSection = lazy(() => import("./StudentWellnessSection").then(m => ({ default: m.StudentWellnessSection })));
const PcOptimization = lazy(() => import("./PcOptimization").then(m => ({ default: m.PcOptimization })));
const ResourceDirectory = lazy(() => import("./ResourceDirectory").then(m => ({ default: m.ResourceDirectory })));
const DailyInsight = lazy(() => import("./DailyInsight").then(m => ({ default: m.DailyInsight })));
const SnowDayPredictor = lazy(() => import("@/components/utilities/SnowDayPredictor").then(m => ({ default: m.SnowDayPredictor })));

const navLinks = [
    { label: "Study Tips", href: "#education" },
    { label: "Formulas", href: "#formulas" },
    { label: "Test Prep", href: "#test-prep" },
    { label: "Writing", href: "#writing" },
    { label: "College", href: "#college" },
    { label: "Resources", href: "#resources" },
];
const navRouteLinks = [
    { label: "📖 Guides", to: "/learn" },
];

export const AcademicHome: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToResources = () => {
        document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollTo = (id: string) => {
        document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100">

            {/* Sticky top nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-black text-teal-700 text-lg tracking-tight">StudyHub</a>
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ label, href }) => (
                            <button
                                key={label}
                                onClick={() => scrollTo(href)}
                                className="text-sm font-semibold text-slate-600 hover:text-teal-700 px-3 py-1.5 rounded-md hover:bg-teal-50 transition-colors"
                            >
                                {label}
                            </button>
                        ))}
                        {navRouteLinks.map(({ label, to }) => (
                            <Link
                                key={label}
                                to={to}
                                className="text-sm font-semibold text-teal-700 hover:text-teal-800 px-3 py-1.5 rounded-md hover:bg-teal-50 transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 px-4 py-1.5 rounded-lg transition-colors">
                            Student Login
                        </Link>
                        <button
                            className="md:hidden p-1.5 rounded-md text-slate-600 hover:bg-slate-100"
                            onClick={() => setMobileMenuOpen(o => !o)}
                            aria-label="Menu"
                        >
                            <div className="w-5 h-0.5 bg-current mb-1"></div>
                            <div className="w-5 h-0.5 bg-current mb-1"></div>
                            <div className="w-5 h-0.5 bg-current"></div>
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-200 px-6 py-3 flex flex-col gap-1">
                        {navLinks.map(({ label, href }) => (
                            <button
                                key={label}
                                onClick={() => scrollTo(href)}
                                className="text-sm font-semibold text-slate-700 hover:text-teal-700 py-2 text-left border-b border-slate-100 last:border-0"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="bg-white border-b border-slate-200 pt-28 pb-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <HeroSection scrollToResources={scrollToResources} />
                    <InteractiveTools />
                </div>
            </section>

            {/* --- QUICK ACCESS CHIPS --- */}
            <section className="bg-slate-100 border-b border-slate-200 px-6 py-4">
                <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
                    <Link
                        to="/learn"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 border border-teal-700 rounded-full text-sm font-semibold text-white hover:bg-teal-800 transition-colors shadow-sm"
                    >
                        <span>📖</span> Free Guides
                    </Link>
                    {[
                        { emoji: '🃏', label: 'Flashcard Builder', id: 'utilities' },
                        { emoji: '⏱', label: 'Focus Timer', id: 'utilities' },
                        { emoji: '📐', label: 'Formula Sheet', id: 'formulas' },
                        { emoji: '📝', label: 'SAT · ACT · AP Prep', id: 'test-prep' },
                        { emoji: '✍️', label: 'Essay Writing', id: 'writing' },
                        { emoji: '🎓', label: 'College Prep', id: 'college' },
                        { emoji: '💚', label: 'Wellness', id: 'wellness' },
                        { emoji: '📚', label: 'Resources', id: 'resources' },
                    ].map(({ emoji, label, id }) => (
                        <button
                            key={label}
                            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 transition-colors shadow-sm"
                        >
                            <span>{emoji}</span> {label}
                        </button>
                    ))}
                </div>
            </section>

            {/* --- SNOW DAY PREDICTOR --- */}
            <section className="bg-white border-b border-slate-200 px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold border border-indigo-200 mb-4">
                            ❄️ AI-Powered · Updated Every 2 Hours
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Snow Day Predictor
                        </h2>
                        <p className="text-slate-500 mt-2 text-lg max-w-xl mx-auto">
                            Machine learning forecast for LCPS, FCPS, and PWCS. Know before the alarm goes off.
                        </p>
                    </div>
                    <Suspense fallback={<div className="h-48" />}><SnowDayPredictor /></Suspense>
                </div>
            </section>

            <Suspense fallback={null}>
              <StudyTechniques />
              <SubjectTips />
              <FormulaReference />
              <div id="test-prep" style={{ scrollMarginTop: '72px' }}><TestPrepSection /></div>
              <div id="writing" style={{ scrollMarginTop: '72px' }}><WritingResearchSection /></div>
              <div id="college" style={{ scrollMarginTop: '72px' }}><CollegeCareerSection /></div>
              <div id="wellness" style={{ scrollMarginTop: '72px' }}><StudentWellnessSection /></div>
              <PcOptimization />
              <ResourceDirectory />
              <DailyInsight />
              <Footer />
            </Suspense>
        </div>
    );
};
