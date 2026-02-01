import React, { useState } from "react";
import { Search, Gamepad2, Filter, Zap, Ghost, Car, Trophy, Brain, Flame, Sparkles, SortAsc, SortDesc } from "lucide-react";
import { useProgression } from "@/contexts/ProgressionContext";
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
  const hasAdvancedSearch = purchases.includes('advanced-search');
  const hasSmartRecs = purchases.includes('smart-recommendations');
  const hasTrending = purchases.includes('trending-insights');

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'az' | 'za'>('az');

  // Filter Logic - map categories to tags
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" ||
      (activeCategory === "action" && game.tags.includes("action")) ||
      (activeCategory === "racing" && game.tags.includes("racing")) ||
      (activeCategory === "sports" && game.tags.includes("sports")) ||
      (activeCategory === "strategy" && (game.tags.includes("puzzle") || game.tags.includes("strategy"))) ||
      (activeCategory === "multiplayer" && game.tags.includes("multiplayer"));
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'az') return a.title.localeCompare(b.title);
    if (sortBy === 'za') return b.title.localeCompare(a.title);
    return 0;
  });

  // Mock Data for Features
  const trendingGames = games.slice(0, 5); // Just first 5 for now
  const recommendedGames = games.slice(5, 10); // Next 5

  const categories = [
    { id: "all", label: "All Games", icon: Gamepad2 },
    { id: "action", label: "Action", icon: Zap },
    { id: "racing", label: "Racing", icon: Car },
    { id: "sports", label: "Sports", icon: Trophy },
    { id: "strategy", label: "Strategy & Puzzle", icon: Brain },
    { id: "multiplayer", label: "Multiplayer", icon: Ghost },
  ];

  return (
    <div className="min-h-screen bg-[#121217] text-slate-100 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-rowdies text-white mb-2 flex items-center gap-3">
              <span className="text-orange-500">🕹️</span> Arcade
            </h1>
            <p className="text-slate-400">Browse {games.length} unblocked games</p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <Input
                placeholder="Search games..."
                className="pl-12 bg-[#1E1E24] border-slate-800 text-white h-12 rounded-xl focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {hasAdvancedSearch && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <Filter size={16} className="text-orange-400" />
                <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">Advanced Search Unlocked</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'az' | 'za')}
                  className="bg-[#1E1E24] border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-1 ml-auto outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* UNLOCKED FEATURES Sections */}
        {(hasTrending || hasSmartRecs) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

            {hasTrending && (
              <div className="bg-[#1E1E24]/50 p-6 rounded-2xl border border-orange-500/20">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                  <Flame className="text-orange-500" /> Trending Now
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {trendingGames.slice(0, 3).map(game => (
                    <Link key={game.id} to={`/games/${game.id}`} className="block group">
                      <img src={game.thumbnail || fallback} className="rounded-lg aspect-square object-cover mb-2 group-hover:scale-105 transition-transform" />
                      <p className="text-xs text-slate-300 truncate font-medium group-hover:text-orange-400">{game.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {hasSmartRecs && (
              <div className="bg-[#1E1E24]/50 p-6 rounded-2xl border border-purple-500/20">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                  <Sparkles className="text-purple-500" /> Recommended For You
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {recommendedGames.slice(0, 3).map(game => (
                    <Link key={game.id} to={`/games/${game.id}`} className="block group">
                      <img src={game.thumbnail || fallback} className="rounded-lg aspect-square object-cover mb-2 group-hover:scale-105 transition-transform" />
                      <p className="text-xs text-slate-300 truncate font-medium group-hover:text-purple-400">{game.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* CATEGORY TABS */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all font-medium border ${activeCategory === cat.id
                ? "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-900/50"
                : "bg-[#1E1E24] border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* GAMES GRID */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredGames.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={`/games/${game.id}`}
                  className="group block bg-[#1E1E24] border border-slate-800 rounded-xl overflow-hidden hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.35),0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={game.thumbnail || fallback}
                      alt={`${game.title} - ${game.tags.join(', ')} game`}
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="300"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Zap className="text-white fill-white" size={32} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white truncate group-hover:text-orange-400 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-500 capitalize mt-1">
                      {game.tags[0]}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Ghost className="mx-auto h-16 w-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
            <p className="text-slate-400">Try searching for something else!</p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default GamesPage;
