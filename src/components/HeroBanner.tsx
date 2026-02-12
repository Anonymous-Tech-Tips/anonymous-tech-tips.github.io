import React from "react";
import { useCurrentSeason } from "./SeasonalTheme";
import thanksgivingBanner from "@/assets/thanksgiving-banner.jpg";
import christmasBanner from "@/assets/christmas-banner.jpg";
import { motion } from "framer-motion";

export const HeroBanner: React.FC = () => {
  const season = useCurrentSeason();

  const getSeasonalContent = () => {
    switch (season) {
      case 'christmas':
        return {
          title: "Anonymous Tech Tips",
          subtitle: "Happy Holidays!",
          showImage: true,
          imageSrc: christmasBanner,
          imageAlt: "Cozy Christmas scene with decorated tree and fireplace",
        };
      case 'thanksgiving':
        return {
          title: "Anonymous Tech Tips",
          subtitle: null,
          showImage: true,
          imageSrc: thanksgivingBanner,
          imageAlt: "Cozy Thanksgiving scene with warm autumn colors",
        };
      case 'halloween':
        return {
          title: "Anonymous Tech Tips",
          subtitle: "Spooky Season!",
          showImage: false,
          imageSrc: null,
          imageAlt: "",
        };
      case 'valentines':
        return {
          title: "Anonymous Tech Tips",
          subtitle: "Happy Valentine's!",
          showImage: false,
          imageSrc: null,
          imageAlt: "",
        };
      default:
        return {
          title: "Anonymous Tech Tips",
          subtitle: "Happy Holidays!",
          showImage: true,
          imageSrc: christmasBanner,
          imageAlt: "Armaan's Tech Tips banner",
        };
    }
  };

  const content = getSeasonalContent();

  return (
    <section id="home" className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {content.showImage && content.imageSrc ? (
        <img
          src={content.imageSrc}
          alt={content.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${season === 'halloween'
            ? 'from-orange-800 via-purple-900 to-black'
            : season === 'valentines'
              ? 'from-pink-700 via-red-800 to-pink-900'
              : 'from-gamer-bg via-gamer-card to-gamer-bg'
          }`} />
      )}

      {/* Simple dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full flex flex-col items-center justify-center gap-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-rowdies font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center px-4 drop-shadow-lg"
        >
          {content.title}
        </motion.h1>
        {content.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-xl md:text-2xl font-medium drop-shadow-md"
          >
            {content.subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};