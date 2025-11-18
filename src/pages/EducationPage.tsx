import React from "react";
import { GraduationCap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";

const EducationPage = () => {
  return (
    <>
      <SEO 
        title="Education Resources & Study Tools | Tech Tips"
        description="Free educational resources including grade calculator, programming tutorials, math resources, study techniques, and learning guides for students."
        keywords="education resources, grade calculator, study tools, programming tutorials, math resources, study techniques, learning guides, student resources, online learning"
      />
      <div className="min-h-screen bg-gamer-bg">
        <ShareBanner />
        <Navbar />

        <ContentSection
          id="education"
          icon={GraduationCap}
          title="Education"
          description="Learning resources and educational content"
          items={[
            { text: "🧮 Course Grade Calculator", url: "https://www.desmos.com/calculator/wrmalnmnpj" },
            { text: "📺 Subject Review Channels", guide: "review-channels" },
            { text: "💻 Programming Fundamentals", guide: "programming-basics" },
            { text: "🧮 Math Resources", guide: "math-resources" },
            { text: "📚 Study Techniques", guide: "study-methods" },
            { text: "🔬 Science Experiments", guide: "science-experiments" },
            { text: "🌍 Language Learning", guide: "language-learning" },
            { text: "🖥️ Tech Concepts Explained", guide: "tech-concepts" },
          ]}
        />

        <Footer />
      </div>
    </>
  );
};

export default EducationPage;
