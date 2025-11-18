import React from "react";
import { Wrench, Shield, Lock, Zap, Brain, Calculator, FileText, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const UtilitiesPage = () => {
  const { isAuthenticated } = useAuth();

  const loggedInItems: Array<{ text: string; url: string }> = [
    { text: "🛡️ uBlock Origin - The Best Adblocker", url: "https://ublockorigin.com/" },
  ];

  const publicItems: Array<{ text: string; url?: string; utility?: "password" | "color" | "text" | "qr" }> = [
    { text: "🔐 Password Generator", utility: "password" },
    { text: "🎨 Color Picker", utility: "color" },
    { text: "📝 Text Converter", utility: "text" },
    { text: "📱 QR Code Generator", utility: "qr" },
    { text: "❄️ LCPS Snow Day Predictor", url: "https://docs.google.com/spreadsheets/d/1dInwA7F-w0TB4Qy-D_463frdBPr9c21LPI4kdhktsO4/edit?gid=0#gid=0" },
    { text: "🛡️ uBlock Origin - Best Adblocker", url: "https://ublockorigin.com/" },
    { text: "📅 LCPS School Calendars", url: "https://www.lcps.org/documents/discover-lcps/about-loudoun/calendars---loudoun-county-public-schools/629038" },
    { text: "🔍 Google Scholar - Research Papers", url: "https://scholar.google.com/" },
    { text: "📚 Khan Academy - Free Learning", url: "https://www.khanacademy.org/" },
    { text: "⚡ Speedtest.net - Internet Speed", url: "https://www.speedtest.net/" },
    { text: "🧮 Desmos Graphing Calculator", url: "https://www.desmos.com/calculator" },
    { text: "🎓 Quizlet - Study Tools", url: "https://quizlet.com/" },
    { text: "📊 Wolfram Alpha - Computational Engine", url: "https://www.wolframalpha.com/" },
    { text: "🌐 Google Translate", url: "https://translate.google.com/" },
    { text: "🎵 Spotify Web Player", url: "https://open.spotify.com/" },
  ];

  return (
    <>
      <SEO 
        title={isAuthenticated ? "Premium Utilities | Tech Tips" : "Free Utilities & Tools | Tech Tips"}
        description="Free online utilities including password generator, color picker, text converter, QR code generator, and more essential tools for students and developers."
        keywords="password generator, color picker, text converter, qr code generator, free utilities, online tools, web tools, student utilities, developer tools"
      />
      <div className={`min-h-screen ${isAuthenticated ? "bg-gamer-bg" : "bg-background"}`}>
        <ShareBanner />
        <Navbar />

        <ContentSection
          id="utilities"
          icon={Wrench}
          title={isAuthenticated ? "Premium Utilities" : "Utilities & Tools"}
          description={isAuthenticated ? "Essential tool for premium users" : "Essential tools and utilities to enhance your experience"}
          items={isAuthenticated ? loggedInItems : publicItems}
        />

        <Footer />
      </div>
    </>
  );
};

export default UtilitiesPage;
