import React from "react";
import { Footer } from "@/components/Footer";
import { HeroSection } from "./HeroSection";
import { InteractiveTools } from "./InteractiveTools";
import { StudyTechniques } from "./StudyTechniques";
import { SubjectTips } from "./SubjectTips";
import { PcOptimization } from "./PcOptimization";
import { ResourceDirectory } from "./ResourceDirectory";
import { DailyInsight } from "./DailyInsight";

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

            {/* --- CONTENT SECTIONS --- */}
            <StudyTechniques />
            <SubjectTips />
            <PcOptimization />
            <ResourceDirectory />
            <DailyInsight />

            <Footer />
        </div>
    );
};
