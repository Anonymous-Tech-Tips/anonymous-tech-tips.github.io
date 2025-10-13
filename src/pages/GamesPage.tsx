import React from "react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { GamesHub } from "@/components/GamesHub";
import { HeroBanner } from "@/components/HeroBanner";
import { GamerHome } from "@/components/GamerHome";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";

const GamesPage = () => {
  return (
    <>
      <SEO 
        title="Unblocked Games Hub | Armaan's Tech Tips"
        description="Play the best unblocked games including Slope, Retro Bowl, 2048, Cookie Clicker, Drive Mad, and more. Free games for students."
        keywords="unblocked games, free games, slope game, retro bowl, 2048, cookie clicker, drive mad, bitlife, poly track, games for students, browser games"
      />
      <div className="min-h-screen bg-gamer-bg">
        <ShareBanner />
        <Navbar />

        <HeroBanner />

        <GamerHome />

        <GamesHub />

        <Footer />
      </div>
    </>
  );
};

export default GamesPage;
