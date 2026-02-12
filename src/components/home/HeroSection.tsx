import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    scrollToResources: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToResources }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-sm font-bold border border-teal-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
                </span>
                Academic Portal v2.4 Live
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Accelerate Your <br />
                <span className="text-teal-700 decoration-teal-300/30 underline decoration-4 underline-offset-4">Learning Potential</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 max-w-xl leading-relaxed font-medium">
                Access essential tools, curated research databases, and our built-in <span className="text-teal-700 font-bold decoration-teal-300/30 underline decoration-2 underline-offset-4">Unbl*cker</span> resources.
                Designed for the modern scholar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                    onClick={scrollToResources}
                    size="lg"
                    className="bg-teal-700 hover:bg-teal-800 text-white rounded-lg px-8 h-14 text-lg font-bold shadow-teal-900/10 shadow-lg transition-all hover:-translate-y-1"
                >
                    Explore Resources
                </Button>
                <Link to="/login">
                    <Button variant="outline" size="lg" className="bg-white border-slate-300 text-slate-800 font-semibold h-14 px-8 text-lg hover:bg-slate-50 transition-all border-2">
                        Student Portal Login
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
};
