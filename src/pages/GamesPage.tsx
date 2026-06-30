import React, { useState, useMemo, useEffect } from "react";

const PAGE_SIZE = 30;
import { Search, Gamepad2, Filter, Zap, Ghost, Car, Trophy, Brain, Coffee } from "lucide-react";

import { useProgression } from "@/contexts/ProgressionContext";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { games } from "@/data/games";
import { GameIcon } from "@/components/GameIcon";
import { trackSearch, trackCategoryFilter, trackLoadMore } from "@/utils/analytics";
import { prefetchGame } from "@/utils/prefetchGame";

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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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

  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [searchQuery, activeCategory, sortBy]);

  // Track search with debounce
  useEffect(() => {
    if (!searchQuery) return;
    const t = setTimeout(() => trackSearch(searchQuery, filteredGames.length), 600);
    return () => clearTimeout(t);
  }, [searchQuery, filteredGames.length]);

  const visibleGames = filteredGames.slice(0, visibleCount);

  const categoryCounts = useMemo(() => {
    const nonBlocked = games.filter(g => !g.tags.includes("blocked"));
    const count = (fn: (tags: string[]) => boolean) => nonBlocked.filter(g => fn(g.tags.map(t => t.toLowerCase()))).length;
    return {
      all: nonBlocked.length,
      action: count(t => t.includes("action") || t.includes("shooting") || t.includes("fighting")),
      racing: count(t => t.includes("racing") || t.includes("driving")),
      sports: count(t => t.includes("sports") || t.includes("basketball") || t.includes("soccer")),
      strategy: count(t => t.includes("puzzle") || t.includes("strategy") || t.includes("logic")),
      casual: count(t => t.includes("casual") || t.includes("arcade") || t.includes("idle") || t.includes("clicker")),
      multiplayer: count(t => t.includes("multiplayer") || t.includes("io") || t.includes("2 player")),
    };
  }, []);

  const categories = [
    { id: "all", label: "All", icon: Gamepad2 },
    { id: "action", label: "Action", icon: Zap },
    { id: "racing", label: "Racing", icon: Car },
    { id: "sports", label: "Sports", icon: Trophy },
    { id: "strategy", label: "Strategy", icon: Brain },
    { id: "casual", label: "Casual", icon: Coffee },
    { id: "multiplayer", label: "Multi", icon: Ghost },
  ];

  return (
    <div
      className="min-h-screen text-slate-100 font-sans"
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* HEADER & SEARCH */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl">🔬</span>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  Lab
                </h1>
                <span className="px-2.5 py-0.5 bg-blue-500/15 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold">
                  {games.length}+
                </span>
              </div>
              <p className="text-slate-500 text-sm">Interactive modules — no downloads, instant play.</p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
                <Input
                  placeholder="Search modules..."
                  className="pl-10 bg-[#13131f] border-white/8 text-white h-11 rounded-xl focus:ring-blue-500 focus:border-blue-500/50 hover:border-white/15 transition-colors placeholder:text-slate-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {hasAdvancedSearch && (
                <div className="flex items-center gap-2 justify-end">
                  <Filter size={14} className="text-slate-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#13131f] border border-white/8 text-slate-300 text-xs rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer hover:border-white/15"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="az">A → Z</option>
                    <option value="za">Z → A</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Result count when searching */}
          {searchQuery && (
            <p className="text-sm text-slate-500 mb-4">
              {filteredGames.length} result{filteredGames.length !== 1 ? 's' : ''} for <span className="text-white font-semibold">"{searchQuery}"</span>
            </p>
          )}
        </div>

        {/* CATEGORY TABS */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar mask-fade-edges">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); trackCategoryFilter(cat.id); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 font-semibold border text-sm ${activeCategory === cat.id
                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40"
                  : "bg-[#13131f] border-white/8 text-slate-400 hover:bg-white/8 hover:border-white/15 hover:text-white"
                }`}
            >
              <cat.icon size={14} />
              {cat.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeCategory === cat.id
                  ? "bg-white/20 text-white"
                  : "bg-white/6 text-slate-500"
              }`}>
                {categoryCounts[cat.id as keyof typeof categoryCounts]}
              </span>
            </button>
          ))}
        </div>

        {/* GAMES GRID */}
        {filteredGames.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {visibleGames.map((game) => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`}
                  style={{ contentVisibility: 'auto', containIntrinsicSize: '0 160px' } as React.CSSProperties}
                  className="group block bg-[#13131f] border border-white/6 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.12)] transition-all duration-200"
                  onMouseEnter={() => prefetchGame(game.url)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                    {game.thumbnail
                      ? <img src={game.thumbnail} alt={game.title} loading="lazy" decoding="async" width={160} height={120} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                      : <GameIcon id={game.id} title={game.title} className="w-full h-full text-3xl" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-3">
                      <span className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow-xl">
                        ▶ Play
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h3 className="font-bold text-slate-100 truncate text-xs leading-tight group-hover:text-blue-400 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-1 truncate font-semibold">
                      {game.tags[0]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {visibleCount < filteredGames.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => { const next = visibleCount + PAGE_SIZE; setVisibleCount(next); trackLoadMore(Math.floor(next / PAGE_SIZE), next); }}
                  className="px-8 py-3 bg-[#1E1E24] border border-slate-700 text-slate-300 rounded-xl hover:border-blue-500 hover:text-blue-400 transition-colors font-medium"
                >
                  Load More ({filteredGames.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-[#1E1E24]/30 rounded-3xl border border-slate-800/50">
            <Ghost className="mx-auto h-16 w-16 text-slate-600 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-2">No modules found</h3>
            <p className="text-slate-400">Try changing your search or category filter.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GamesPage;
