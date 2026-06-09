import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { HeroSection } from "./HeroSection";
import { InteractiveTools } from "./InteractiveTools";
import { StudyTechniques } from "./StudyTechniques";
import { SubjectTips } from "./SubjectTips";
import { PcOptimization } from "./PcOptimization";
import { ResourceDirectory } from "./ResourceDirectory";
import { DailyInsight } from "./DailyInsight";
import { SnowDayPredictor } from "@/components/utilities/SnowDayPredictor";
import { TestPrepSection } from "./TestPrepSection";
import { WritingResearchSection } from "./WritingResearchSection";
import { CollegeCareerSection } from "./CollegeCareerSection";
import { StudentWellnessSection } from "./StudentWellnessSection";

const navLinks = [
    { label: "Study Tips", href: "#education" },
    { label: "Test Prep", href: "#test-prep" },
    { label: "Writing", href: "#writing" },
    { label: "College", href: "#college" },
    { label: "Wellness", href: "#wellness" },
    { label: "Resources", href: "#resources" },
];

export const AcademicHome: React.FC = () => {
    const scrollToResources = () => {
        document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollTo = (id: string) => {
        document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100">

            {/* Sticky top nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <a href="#" className="font-black text-teal-700 text-lg tracking-tight">StudyHub</a>
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
                    </div>
                    <Link to="/login" className="text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 px-4 py-1.5 rounded-lg transition-colors">
                        Student Login
                    </Link>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="bg-white border-b border-slate-200 pt-28 pb-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <HeroSection scrollToResources={scrollToResources} />
                    <InteractiveTools />
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
                    <SnowDayPredictor />
                </div>
            </section>

            {/* --- STUDY TECHNIQUES --- */}
            <StudyTechniques />

            {/* --- SUBJECT TIPS --- */}
            <SubjectTips />

            {/* --- TEST PREP HUB --- */}
            <div id="test-prep" style={{ scrollMarginTop: '72px' }}><TestPrepSection /></div>

            {/* --- WRITING & RESEARCH --- */}
            <div id="writing" style={{ scrollMarginTop: '72px' }}><WritingResearchSection /></div>

            {/* --- COLLEGE & CAREER --- */}
            <div id="college" style={{ scrollMarginTop: '72px' }}><CollegeCareerSection /></div>

            {/* --- STUDENT WELLNESS --- */}
            <div id="wellness" style={{ scrollMarginTop: '72px' }}><StudentWellnessSection /></div>

            {/* --- PC OPTIMIZATION --- */}
            <PcOptimization />

            {/* --- RESOURCE DIRECTORY --- */}
            <ResourceDirectory />

            {/* --- DAILY INSIGHT --- */}
            <DailyInsight />

            <Footer />
        </div>
    );
};
