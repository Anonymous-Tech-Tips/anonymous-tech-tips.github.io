import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2, Flame, Trophy, Zap, Play,
  ChevronRight, Star, Clock, Search, Tv, Users
} from "lucide-react";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { TopBannerAd, InContentAd, BottomAd } from "@/components/GoogleAd";
import { DailyReward } from "@/components/DailyReward";
import FriendsGallery from "@/components/FriendsGallery";
import { games } from "@/data/games";
import fallbackThumbnail from "@/assets/thumbnails/_fallback.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const GamerHome = () => {
  const { prefs } = useUserPrefs();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [randomFeatured, setRandomFeatured] = useState(games[0]);
  const [trendingGames, setTrendingGames] = useState<typeof games>([]);

  // Logic: Get History & Favorites
  const continueIds = prefs.history.filter(h => h.itemType === 'game').map(h => h.itemId);
  const uniqueContinue = [...new Set(continueIds)];
  const continueItems = uniqueContinue.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;
  const favItems = prefs.favorites.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;

  // Logic: Cycle "Featured" game & Randomize Trending
  useEffect(() => {
    // 1. Featured Cycling
    const popular = games.filter(g => g.tags.includes('popular') || g.tags.includes('featured'));

    // Initial set
    if (popular.length > 0) {
      setRandomFeatured(popular[Math.floor(Math.random() * popular.length)]);
    }

    // Cycle every 8 seconds
    const interval = setInterval(() => {
      if (popular.length > 0) {
        setRandomFeatured(popular[Math.floor(Math.random() * popular.length)]);
      }
    }, 8000);

    // 2. Trending Randomization
    const shuffled = [...games].sort(() => 0.5 - Math.random());
    setTrendingGames(shuffled.slice(0, 5));

    return () => clearInterval(interval);
  }, []);

  // Filter for search
  const filteredGames = searchQuery
    ? games.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div className="min-h-screen pb-24 bg-[#121217] text-white overflow-x-hidden gamer-mode">

      {/* 1. TOP BAR: Search & Stats */}
      <div className="sticky top-0 z-40 bg-[#121217]/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">

          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={18} />
            <Input
              placeholder="Find a game..."
              className="bg-[#1E1E24] border-white/10 pl-10 text-white placeholder:text-slate-500 focus:border-orange-500/50 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Search Dropdown */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1E1E24] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                {filteredGames.length > 0 ? (
                  filteredGames.map(game => (
                    <Link
                      key={game.id}
                      to={`/games/${game.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                    >
                      <img src={game.thumbnail || fallbackThumbnail} className="w-10 h-10 rounded object-cover" />
                      <span className="font-medium text-sm">{game.title}</span>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-500 text-sm">No games found</div>
                )}
              </div>
            )}
          </div>

          {/* Hype Stats */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-2 rounded-full border border-orange-500/20">
              <Flame className="text-orange-500 fill-orange-500 animate-pulse" size={18} />
              <span className="font-bold text-orange-400">{prefs.settings.streakCount || 0} Day Streak</span>
            </div>
            <DailyReward streakCount={prefs.settings.streakCount || 0} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* 2. HERO SECTION: "The Main Event" */}
        <AnimatePresence mode="wait">
          <motion.div
            key={randomFeatured ? randomFeatured.id : "loading"}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[24/9] mb-12 group"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={randomFeatured?.thumbnail || fallbackThumbnail}
                alt="Featured"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121217] via-[#121217]/40 to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  FEATURED GAME
                </div>
                <h1 className="text-4xl md:text-6xl font-rowdies text-white mb-4 leading-tight">
                  {randomFeatured?.title}
                </h1>
                <p className="text-slate-300 max-w-xl text-lg mb-8 line-clamp-2">
                  Join thousands of other students playing {randomFeatured?.title} right now.
                  Experience best version unblocked and optimized.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => navigate(`/games/${randomFeatured?.id}`)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all"
                  >
                    <Play className="fill-white mr-2" size={20} /> Play Now
                  </Button>
                  <Button
                    onClick={() => navigate('/games')}
                    variant="outline"
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg backdrop-blur-md"
                  >
                    Browse All
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3. ADS (Monetization) */}
        <div className="mb-12">
          <TopBannerAd />
        </div>

        {/* 4. CONTINUE PLAYING (Netflix Rail) */}
        {continueItems.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="text-purple-400" /> Jump Back In
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {continueItems.slice(0, 6).map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* 5. QUICK CATEGORY PILLS */}
        <div className="flex flex-wrap gap-3 mb-12">
          {['Action', 'Racing', 'Sports', 'Multiplayer', 'Strategy'].map((tag) => (
            <Link
              key={tag}
              to={`/games?category=${tag.toLowerCase()}`}
              className="px-6 py-3 rounded-xl bg-[#1E1E24] border border-white/5 text-slate-300 font-medium hover:bg-white/10 hover:text-white hover:border-orange-500/30 transition-all"
            >
              {tag}
            </Link>
          ))}
          <Link to="/entertainment" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 text-purple-200 font-bold hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all flex items-center gap-2">
            <Tv size={18} /> Movies & TV
          </Link>
        </div>

        {/* 6. TRENDING GRID (Bento Style) */}
        {trendingGames.length >= 5 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="text-yellow-400" /> Trending Now
              </h2>
              <button
                onClick={() => {
                  console.log('View All button clicked, navigating to /games');
                  navigate('/games');
                }}
                className="text-sm text-slate-400 hover:text-white flex items-center gap-1 transition-colors bg-transparent border-none cursor-pointer relative z-10"
              >
                View all <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[400px]">
              {/* Big Trending Item - Using first item from shuffled list */}
              <div className="md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer border border-white/5" onClick={() => navigate(`/games/${trendingGames[0].id}`)}>
                <img src={trendingGames[0].thumbnail} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">HOT</div>
                  <h3 className="text-3xl font-rowdies">{trendingGames[0].title}</h3>
                  <p className="text-slate-300 text-sm line-clamp-1">{trendingGames[0].tags.join(" • ")}</p>
                </div>
              </div>

              {/* Smaller Items - Using next 4 items */}
              {trendingGames.slice(1, 5).map((game) => (
                <div key={game.id} className="relative group rounded-2xl overflow-hidden cursor-pointer border border-white/5" onClick={() => navigate(`/games/${game.id}`)}>
                  <img src={game.thumbnail} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-bold truncate">{game.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <InContentAd />

        {/* 7. THE SQUAD (Social Proof) */}
        <section className="mb-16 bg-[#1A1C2C] rounded-3xl p-8 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Users className="text-blue-400" /> The Squad
            </h2>
            <FriendsGallery />
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-orange-400">Invite Friends</h4>
                <p className="text-xs text-slate-400">Earn 500 points for every referral.</p>
              </div>
              <Button size="sm" className="bg-white text-black hover:bg-slate-200">Copy Link</Button>
            </div>
          </div>
        </section>

        {/* 8. FAVORITES */}
        {favItems.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 px-2">
              <Star className="text-yellow-400 fill-yellow-400" /> Your Favorites
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {favItems.map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))}
            </div>
          </section>
        )}

      </div>
      <BottomAd />
    </div>
  );
};

// --- PRETTY CARD COMPONENT ---
const GameCard = ({ game, index }: { game: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Link
      to={`/games/${game.id}`}
      className="group relative block bg-[#1E1E24] rounded-xl overflow-hidden border border-white/5 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:-translate-y-1"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={game.thumbnail || fallbackThumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="fill-white text-white ml-1" size={16} />
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-200 group-hover:text-white truncate">{game.title}</h3>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-1">{game.tags[0]}</p>
      </div>
    </Link>
  </motion.div>
);
