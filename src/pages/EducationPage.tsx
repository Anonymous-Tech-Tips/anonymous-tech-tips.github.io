import React from "react";
import { GraduationCap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { TopBannerAd, BottomAd } from "@/components/GoogleAd";

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

        <TopBannerAd />

        <ContentSection
          id="education"
          icon={GraduationCap}
          title="Education"
          description="Learning resources and educational content"
          items={[
            { text: "🧮 Course Grade Calculator", url: "https://www.desmos.com/calculator/wrmalnmnpj" },
            { text: "📚 Khan Academy", url: "https://www.khanacademy.org/" },
            { text: "🎓 Coursera - Free Courses", url: "https://www.coursera.org/" },
            { text: "💻 Codecademy - Learn to Code", url: "https://www.codecademy.com/" },
            { text: "🔢 Brilliant - Math & Science", url: "https://brilliant.org/" },
            { text: "📖 SparkNotes - Study Guides", url: "https://www.sparknotes.com/" },
            { text: "🧪 PhET Simulations", url: "https://phet.colorado.edu/" },
            { text: "📝 Grammarly - Writing Help", url: "https://www.grammarly.com/" },
            { text: "🌍 Duolingo - Languages", url: "https://www.duolingo.com/" },
            { text: "📺 Subject Review Channels", guide: "review-channels" },
            { text: "💻 Programming Fundamentals", guide: "programming-basics" },
            { text: "🧮 Math Resources", guide: "math-resources" },
            { text: "📚 Study Techniques", guide: "study-methods" },
          ]}
        />

        <BottomAd />

        <Footer />
      </div>
    </>
  );
};

export default EducationPage;
