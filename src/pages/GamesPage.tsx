import React, { useState } from "react";
import { Search, Gamepad2, Filter, Zap, Ghost, Car, Trophy, Brain } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { games } from "@/data/games";
import fallback from "@/assets/thumbnails/_fallback.png";

const GamesPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

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
  });

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
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-rowdies text-white mb-2 flex items-center gap-3">
              <span className="text-orange-500">🕹️</span> Arcade
            </h1>
            <p className="text-slate-400">Browse {games.length} unblocked games</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <Input 
              placeholder="Search games..." 
              className="pl-12 bg-[#1E1E24] border-slate-800 text-white h-12 rounded-xl focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all font-medium border ${
                activeCategory === cat.id
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
                  to={`/games/${game.id}`} // Uses the dynamic ID route
                  className="group block bg-[#1E1E24] border border-slate-800 rounded-xl overflow-hidden hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={game.thumbnail || fallback} 
                      alt={game.title}
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
