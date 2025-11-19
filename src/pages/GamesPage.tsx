import React from "react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { GamesHub } from "@/components/GamesHub";
import { HeroBanner } from "@/components/HeroBanner";
import { GamerHome } from "@/components/GamerHome";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";

const GamesPage = () => {
  return (
    <>
      <SEO 
        title="Browser Games Collection | Tech Tips"
        description="Curated collection of browser-based games including puzzles, arcade, and strategy games. External links to popular web games."
        keywords="browser games, web games, online games, puzzle games, arcade games, strategy games, free games"
      />
      <div className="min-h-screen bg-gamer-bg">
        <ShareBanner />
        <Navbar />

        <div className="mb-6 p-4 bg-gamer-card border border-gamer-border rounded-lg">
          <p className="text-sm text-gamer-muted">
            <strong>External Links:</strong> This is a curated collection of browser games from around the web.
            All games open in external sites - we don't host any content ourselves.
            Please ensure you have permission to access the content you choose to view.
          </p>
        </div>

        <HeroBanner />

        <GamerHome />

        <AdBanner />

        <GamesHub />

        <Footer />
      </div>
    </>
  );
};

export default GamesPage;
