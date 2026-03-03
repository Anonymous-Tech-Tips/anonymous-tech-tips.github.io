import React, { useState, useMemo } from "react";
import { Search, Gamepad2, Filter, Zap, Ghost, Car, Trophy, Brain, Ban, Coffee, ArrowUp } from "lucide-react";

import { useProgression } from "@/contexts/ProgressionContext";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { games } from "@/data/games";
import fallback from "@/assets/thumbnails/_fallback.png";

const GamesPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const { purchases } = useProgression();
  const { prefs } = useUserPrefs();
  const gameStats = prefs.settings.gameStats || {};
  const hasAdvancedSearch = purchases.includes('advanced-search');

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  // Default to popular sort if they have the perk, otherwise popular anyway for better UX
  const [sortBy, setSortBy] = useState<'popular' | 'az' | 'za'>('popular');

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const isBlocked = game.tags.includes("blocked");

      // CRITICAL: Hide blocked games UNLESS specific blocked category is active
      if (activeCategory !== "blocked" && isBlocked) return false;
      if (activeCategory === "blocked" && !isBlocked) return false;

      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (activeCategory === "blocked" || activeCategory === "all") return true;

      // Robust case-insensitive tag matching
      const tags = game.tags.map(t => t.toLowerCase());
      const isAction = tags.includes("action") || tags.includes("shooting") || tags.includes("fighting");
      const isRacing = tags.includes("racing") || tags.includes("driving");
      const isSports = tags.includes("sports") || tags.includes("basketball") || tags.includes("soccer");
      const isStrategy = tags.includes("puzzle") || tags.includes("strategy") || tags.includes("logic");
      const isCasual = tags.includes("casual") || tags.includes("arcade") || tags.includes("idle") || tags.includes("clicker");
      const isMultiplayer = tags.includes("multiplayer") || tags.includes("io") || tags.includes("2 player");

      switch (activeCategory) {
        case "action": return isAction;
        case "racing": return isRacing;
        case "sports": return isSports;
        case "strategy": return isStrategy;
        case "casual": return isCasual;
        case "multiplayer": return isMultiplayer;
        default: return true;
      }
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        const playA = gameStats[a.id]?.playCount || 0;
        const playB = gameStats[b.id]?.playCount || 0;
        if (playB !== playA) return playB - playA;
        // Tiebreaker: featured games first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Final tiebreaker: alphabetical
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'az') return a.title.localeCompare(b.title);
      if (sortBy === 'za') return b.title.localeCompare(a.title);
      return 0;
    });
  }, [searchQuery, activeCategory, sortBy, gameStats]);

  const categories = [
    { id: "all", label: "All Games", icon: Gamepad2 },
    { id: "action", label: "Action", icon: Zap },
    { id: "racing", label: "Racing", icon: Car },
    { id: "sports", label: "Sports", icon: Trophy },
    { id: "strategy", label: "Strategy", icon: Brain },
    { id: "casual", label: "Casual", icon: Coffee },
    { id: "multiplayer", label: "Multiplayer", icon: Ghost },
    { id: "blocked", label: "Blocked", icon: Ban },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen text-slate-100 font-sans"
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-rowdies text-white mb-2 flex items-center gap-3">
              <span className="text-blue-500">🕹️</span> Arcade
            </h1>
            <p className="text-slate-400">Play {games.length}+ unblocked games instantly.</p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <Input
                placeholder="Search games..."
                className="pl-12 bg-[#1E1E24]/80 backdrop-blur-md border-slate-800/80 text-white h-12 rounded-2xl focus:ring-blue-500 hover:border-slate-700 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {hasAdvancedSearch && (
              <div className="flex items-center gap-2 justify-end fade-in">
                <Filter size={16} className="text-blue-400" />
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#1E1E24] border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer hover:bg-slate-800"
                >
                  <option value="popular">Popularity</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar mask-fade-edges">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-medium border ${activeCategory === cat.id
                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40"
                  : "bg-[#1E1E24]/80 backdrop-blur-md border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* GAMES GRID */}
        {filteredGames.length > 0 ? (
          <>
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
            >
              {filteredGames.map((game) => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`}
                  className="group block bg-[#1E1E24]/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 lg:hover:scale-[1.03] will-change-transform"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                    <img
                      src={game.thumbnail || fallback}
                      alt={game.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-bold text-sm bg-blue-600/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                        Play <ArrowUp size={14} className="rotate-45" />
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors text-sm">
                      {game.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1.5 truncate">
                      {game.tags[0]}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
            <p className="text-center text-slate-500 mt-12 mb-8 text-sm font-medium">
              Showing all {filteredGames.length} games
            </p>
          </>
        ) : (
          <div className="text-center py-24 bg-[#1E1E24]/30 rounded-3xl border border-slate-800/50 backdrop-blur-sm">
            <Ghost className="mx-auto h-16 w-16 text-slate-600 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
            <p className="text-slate-400">Try changing your search or category filter.</p>
          </div>
        )}
      </main>
      <Footer />
    </motion.div>
  );
};

export default GamesPage;
