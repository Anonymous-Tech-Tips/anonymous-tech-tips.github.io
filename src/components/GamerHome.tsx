
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, ChevronRight, Star, Clock, Search, Zap, Users, ArrowRight
} from "lucide-react";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { useProgression } from "@/contexts/ProgressionContext";
import { TopBannerAd, InContentAd, BottomAd } from "@/components/GoogleAd";
import { DailyReward } from "@/components/DailyReward";
import FriendsGallery from "@/components/FriendsGallery";
import { games } from "@/data/games";
import fallbackThumbnail from "@/assets/thumbnails/_fallback.png";
import { DiscoveryFeed } from '@/components/rewards/DiscoveryFeed';
import { Button } from "@/components/ui/button";

export const GamerHome = () => {
  const { prefs } = useUserPrefs();
  const { purchases } = useProgression();
  const navigate = useNavigate();
  const hasQuickLaunch = purchases.includes('quick-launch-slots');
  const hasDiscoveryFeed = purchases.includes('discovery-feed');
  const hasHistoryTracker = purchases.includes('recently-played-tracker');

  const [searchQuery, setSearchQuery] = useState("");
  const [randomFeatured, setRandomFeatured] = useState(games[0]);
  const [trendingGames, setTrendingGames] = useState<typeof games>([]);

  const continueIds = prefs.history.filter(h => h.itemType === 'game').map(h => h.itemId);
  const uniqueContinue = [...new Set(continueIds)];
  const continueItems = uniqueContinue.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;
  const favItems = prefs.favorites.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;

  useEffect(() => {
    const popular = games.filter(g => g.tags.includes('popular') || g.tags.includes('featured'));
    if (popular.length > 0) setRandomFeatured(popular[Math.floor(Math.random() * popular.length)]);

    const interval = setInterval(() => {
      if (popular.length > 0) setRandomFeatured(popular[Math.floor(Math.random() * popular.length)]);
    }, 8000);

    const shuffled = [...games].sort(() => 0.5 - Math.random());
    setTrendingGames(shuffled.slice(0, 5));

    return () => clearInterval(interval);
  }, []);

  const filteredGames = searchQuery
    ? games.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div className="min-h-screen bg-background text-white selection:bg-purple-500/30 overflow-x-hidden gamer-mode font-sans">
      {/* HERO SECTION - CINEMATIC, COZY */}
      {/* Background: Dreamy Mesh Gradient instead of Void Black */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* HERO SECTION - CINEMATIC */}
      <div className="relative h-[85vh] w-full flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden group">
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={randomFeatured?.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent z-10" />
            <img
              src={randomFeatured?.thumbnail || fallbackThumbnail}
              className="w-full h-full object-cover opacity-60"
              alt="Hero BG"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-medium backdrop-blur-md border border-white/5 text-purple-200">
              Featured Pick
            </span>
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.9/5 Rating</span>
            </div>
          </motion.div>

          <motion.h1
            key={randomFeatured?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif italic font-bold tracking-tighter leading-[0.85] text-white mix-blend-overlay"
          >
            {randomFeatured?.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl font-light text-white/80 max-w-xl leading-relaxed"
          >
            Experience the next evolution of browser gaming. High performance, zero latency, and fully unblocked access.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button
              onClick={() => navigate(`/games/${randomFeatured?.id}`)}
              className="h-14 px-8 rounded-full bg-white text-black hover:bg-slate-200 transition-colors text-base font-bold flex items-center gap-2"
            >
              <Play className="fill-black w-4 h-4" /> Play Now
            </Button>
            <Button
              onClick={() => navigate('/games')}
              variant="outline"
              className="h-14 px-8 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all text-base font-medium"
            >
              Explore Collection
            </Button>
          </motion.div>
        </div>
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="relative z-20 max-w-[1600px] mx-auto px-6 py-24 space-y-32">

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-8 items-end justify-between border-b border-white/10 pb-8">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-3xl font-light text-white placeholder-white/20 focus:ring-0 px-12 py-2"
            />
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden z-50">
                {filteredGames.length > 0 ? filteredGames.map(game => (
                  <Link to={`/games/${game.id}`} key={game.id} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                    <img src={game.thumbnail} className="w-12 h-12 object-cover rounded" />
                    <span className="text-lg font-medium">{game.title}</span>
                  </Link>
                )) : <div className="p-4 text-white/40">No results found.</div>}
              </div>
            )}
          </div>
          <div className="flex gap-2 text-sm font-medium text-white/60">
            {['Action', 'Strategy', 'Racing', 'RPG'].map(tag => (
              <Link key={tag} to={`/games?category=${tag.toLowerCase()}`} className="px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* QUICK LAUNCH (Shop Feature) */}
        {hasQuickLaunch && favItems.length > 0 && (
          <section className="space-y-4 animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-2 text-sm text-yellow-500 font-bold uppercase tracking-widest">
              <Zap className="w-4 h-4" /> Quick Launch
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {favItems.slice(0, 5).map(game => (
                <motion.button
                  key={game.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/games/${game.id}`)}
                  className="flex-shrink-0 w-48 h-16 bg-[#1A1A1A] border-l-2 border-yellow-500 rounded-r-lg flex items-center gap-3 px-3 hover:bg-[#252525] transition-colors"
                >
                  <img src={game.thumbnail || fallbackThumbnail} className="w-10 h-10 rounded object-cover" />
                  <div className="text-left overflow-hidden">
                    <div className="text-sm font-bold truncate text-white">{game.title}</div>
                    <div className="text-[10px] text-white/50 uppercase">Instant Play</div>
                  </div>
                </motion.button>
              ))}
              {favItems.length < 5 && (
                <div className="flex-shrink-0 w-48 h-16 border border-dashed border-white/10 rounded-lg flex items-center justify-center text-xs text-white/30">
                  Add Favorites to Fill
                </div>
              )}
            </div>
          </section>
        )}

        {/* CONTINUE PLAYING */}
        {continueItems.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-end justify-between">
              <h2 className="text-4xl md:text-5xl font-serif italic font-bold">Jump Back In</h2>
              <div className="flex items-center gap-2 text-sm text-white/40 uppercase tracking-widest">
                <Clock className="w-4 h-4" /> Recent Activity
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {continueItems.slice(0, hasHistoryTracker ? 12 : 3).map((game, i) => (
                <MinimalCard key={game.id} game={game} index={i} />
              ))}
              {!hasHistoryTracker && continueItems.length > 3 && (
                <div className="col-span-1 flex items-center justify-center border border-white/10 rounded-lg bg-white/5 p-4 text-center">
                  <div className="text-xs text-white/50 space-y-2">
                    <p>+ {continueItems.length - 3} more</p>
                    <Link to="/shop" className="text-blue-400 hover:underline">Unlock History Tracker</Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TRENDING BENTO GRID */}
        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold">Trending Now</h2>
            <Link to="/games" className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              VIEW ALL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
            {/* MAIN FEATURE */}
            {trendingGames.length > 0 && trendingGames[0] ? (
              <div
                onClick={() => navigate(`/games/${trendingGames[0].id}`)}
                className="md:col-span-2 md:row-span-2 relative group rounded-md overflow-hidden bg-white/5 cursor-pointer"
              >
                <img src={trendingGames[0].thumbnail || fallbackThumbnail} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 space-y-2">
                  <div className="px-2 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest inline-block">Popular</div>
                  <h3 className="text-4xl font-serif italic">{trendingGames[0].title}</h3>
                </div>
              </div>
            ) : (
              <div className="md:col-span-2 md:row-span-2 bg-white/5 animate-pulse rounded-md" />
            )}

            {/* SECONDARY ITEMS */}
            {trendingGames.slice(1, 5).map((game) => (
              <div
                key={game.id}
                onClick={() => navigate(`/games/${game.id}`)}
                className="relative group rounded-md overflow-hidden bg-white/5 cursor-pointer"
              >
                <img src={game.thumbnail || fallbackThumbnail} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-medium">{game.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DISCOVERY FEED (Shop Feature) */}
        {hasDiscoveryFeed && (
          <section className="animate-in fade-in slide-in-from-bottom-8">
            <DiscoveryFeed />
          </section>
        )}

        {/* SOCIAL PROOF / SQUAD */}
        <section className="border-t border-white/10 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif italic font-bold">The Squad</h2>
              <p className="text-white/60 leading-relaxed font-light text-lg">
                See what your friends are playing, compete for high scores, and earn daily rewards for maintaining your streak.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="text-center px-6 py-4 border border-white/10 rounded-xl bg-white/5">
                  <div className="text-3xl font-light">{prefs.settings.streakCount}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Day Streak</div>
                </div>
                <DailyReward streakCount={prefs.settings.streakCount || 0} />
              </div>
            </div>
            <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
              <FriendsGallery />
            </div>
          </div>
        </section>

      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <BottomAd />
      </div>

    </div>
  );
};

// MINI CARD COMPONENT
const MinimalCard = ({ game, index }: { game: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="group cursor-pointer"
  >
    <Link to={`/games/${game.id}`} className="block space-y-4">
      <div className="aspect-[3/4] overflow-hidden rounded-sm bg-white/5 relative">
        <img
          src={game.thumbnail || fallbackThumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>
      <div>
        <h3 className="text-lg font-medium leading-none group-hover:text-blue-400 transition-colors">{game.title}</h3>
        <p className="text-xs text-white/40 mt-2 uppercase tracking-wider">{game.tags[0]}</p>
      </div>
    </Link>
  </motion.div>
);
