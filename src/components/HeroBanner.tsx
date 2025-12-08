import React from "react";
import { useCurrentSeason } from "./SeasonalTheme";
import thanksgivingBanner from "@/assets/thanksgiving-banner.jpg";
import christmasBanner from "@/assets/christmas-banner.jpg";

export const HeroBanner: React.FC = () => {
  const season = useCurrentSeason();

  const getSeasonalContent = () => {
    switch (season) {
      case 'christmas':
        return {
          title: "🎄 Tech Tips 🎄",
          subtitle: "Happy Holidays!",
          bgGradient: "from-red-900/70 via-green-900/40 to-blue-900/70",
          showImage: true,
          imageSrc: christmasBanner,
          imageAlt: "Cozy Christmas scene with decorated tree and fireplace",
        };
      case 'thanksgiving':
        return {
          title: "Tech Tips",
          subtitle: null,
          bgGradient: "from-gamer-bg/60 via-gamer-bg/30 to-gamer-bg/80",
          showImage: true,
          imageSrc: thanksgivingBanner,
          imageAlt: "Cozy Thanksgiving scene with warm autumn colors",
        };
      case 'halloween':
        return {
          title: "🎃 Tech Tips 🦇",
          subtitle: "Spooky Season!",
          bgGradient: "from-orange-900/70 via-purple-900/40 to-black/80",
          showImage: false,
          imageSrc: null,
          imageAlt: "",
        };
      case 'valentines':
        return {
          title: "💕 Tech Tips 💕",
          subtitle: "Happy Valentine's!",
          bgGradient: "from-pink-900/60 via-red-900/40 to-pink-900/70",
          showImage: false,
          imageSrc: null,
          imageAlt: "",
        };
      default:
        return {
          title: "Tech Tips",
          subtitle: null,
          bgGradient: "from-gamer-bg/60 via-gamer-bg/30 to-gamer-bg/80",
          showImage: true,
          imageSrc: christmasBanner,
          imageAlt: "Tech Tips banner",
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
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${
          season === 'christmas' 
            ? 'from-red-800 via-green-800 to-blue-900' 
            : season === 'halloween'
            ? 'from-orange-800 via-purple-900 to-black'
            : season === 'valentines'
            ? 'from-pink-700 via-red-800 to-pink-900'
            : 'from-gamer-bg to-gamer-card'
        }`}>
          {/* Christmas decorations */}
          {season === 'christmas' && (
            <>
              <div className="absolute top-4 left-4 text-6xl animate-pulse">🎅</div>
              <div className="absolute top-4 right-4 text-6xl animate-pulse delay-500">🎁</div>
              <div className="absolute bottom-4 left-1/4 text-5xl">🦌</div>
              <div className="absolute bottom-4 right-1/4 text-5xl">⛄</div>
              <div className="absolute top-1/3 left-1/3 text-4xl animate-bounce">🔔</div>
              <div className="absolute top-1/3 right-1/3 text-4xl animate-bounce delay-300">🌟</div>
              
              {/* Christmas lights */}
              <div className="absolute top-0 left-0 right-0 flex justify-around p-2">
                {['🔴', '🟢', '🔵', '🟡', '🔴', '🟢', '🔵', '🟡', '🔴', '🟢'].map((light, i) => (
                  <span 
                    key={i} 
                    className="text-2xl animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {light}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className={`absolute inset-0 bg-gradient-to-b ${content.bgGradient}`} />

      <div className="relative h-full flex flex-col items-center justify-center gap-2">
        <div className="relative">
          <h1 className="font-rowdies font-bold text-gamer-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%),_-1px_-1px_4px_rgb(0_0_0_/_60%)]">
            {content.title}
          </h1>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gamer-accent/10 blur-xl -z-10" />
        </div>
        {content.subtitle && (
          <p className="text-gamer-text/90 text-xl md:text-2xl font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)]">
            {content.subtitle}
          </p>
        )}
      </div>
    </section>
  );
};
