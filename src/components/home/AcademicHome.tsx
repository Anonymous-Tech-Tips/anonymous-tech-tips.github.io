import React from "react";
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

export const AcademicHome: React.FC = () => {
    const scrollToResources = () => {
        document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100">

            {/* --- HERO SECTION --- */}
            <section className="bg-white border-b border-slate-200 pt-32 pb-24 px-6 relative z-10">
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
            <TestPrepSection />

            {/* --- WRITING & RESEARCH --- */}
            <WritingResearchSection />

            {/* --- COLLEGE & CAREER --- */}
            <CollegeCareerSection />

            {/* --- STUDENT WELLNESS --- */}
            <StudentWellnessSection />

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
