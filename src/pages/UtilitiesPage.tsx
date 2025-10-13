import React from "react";
import { Wrench } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";

const UtilitiesPage = () => {
  return (
    <>
      <SEO 
        title="Free Utilities & Tools | Armaan's Tech Tips"
        description="Free online utilities including password generator, color picker, text converter, QR code generator, and more essential tools for students and developers."
        keywords="password generator, color picker, text converter, qr code generator, free utilities, online tools, web tools, student utilities, developer tools"
      />
      <div className="min-h-screen bg-gamer-bg">
        <ShareBanner />
        <Navbar />

        <ContentSection
          id="utilities"
          icon={Wrench}
          title="Utilities"
          description="Essential tools and utilities to enhance your experience"
          items={[
            { text: "🔐 Password Generator", utility: "password" },
            { text: "🎨 Color Picker", utility: "color" },
            { text: "📝 Text Converter", utility: "text" },
            { text: "📱 QR Code Generator", utility: "qr" },
            { text: "❄️ Snow Day Predictor", url: "https://docs.google.com/spreadsheets/d/1dInwA7F-w0TB4Qy-D_463frdBPr9c21LPI4kdhktsO4/edit?gid=0#gid=0" },
            { text: "🛡️ The Best Adblocker", url: "https://ublockorigin.com/" },
            { text: "📅 LCPS Calendars", url: "https://www.lcps.org/documents/discover-lcps/about-loudoun/calendars---loudoun-county-public-schools/629038" },
          ]}
        />

        <Footer />
      </div>
    </>
  );
};

export default UtilitiesPage;
