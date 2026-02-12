
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
  const [arrivalTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const continueIds = prefs.history.filter(h => h.itemType === 'game').map(h => h.itemId);
  const uniqueContinue = [...new Set(continueIds)];
  const continueItems = uniqueContinue.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;
  const favItems = prefs.favorites.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;

  useEffect(() => {
    // Filter out blocked games from ALL recommendations
    const validGames = games.filter(g => !g.tags.includes("blocked"));

    const popular = validGames.filter(g => g.tags.includes('popular') || g.tags.includes('featured'));
    if (popular.length > 0) setRandomFeatured(popular[Math.floor(Math.random() * popular.length)]);

    const interval = setInterval(() => {
      if (popular.length > 0) setRandomFeatured(popular[Math.floor(Math.random() * popular.length)]);
    }, 8000);

    const shuffled = [...validGames].sort(() => 0.5 - Math.random());
    setTrendingGames(shuffled.slice(0, 5));

    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const filteredGames = searchQuery
    ? games.filter(g =>
      !g.tags.includes("blocked") &&
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6)
    : [];

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-purple-500/30 overflow-x-hidden gamer-mode font-sans">
      {/* HERO SECTION - CINEMATIC, COZY */}
      {/* HERO SECTION - CINEMATIC, COZY */}
      {/* Background: Global GamerBackground handles this now */}

      {/* HERO SECTION - CINEMATIC */}
      {/* HERO SECTION - SANCTUARY STYLE */}
      <div className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* PERSONAL GREETING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-5xl md:text-7xl font-serif italic text-white/90">
              {getGreeting()}, <span className="text-primary">Guest</span>.
            </h1>
            <p className="text-xl text-white/60 font-light max-w-2xl flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-mono uppercase tracking-widest text-white/40">
                <Clock className="w-3 h-3" /> Arrived: {arrivalTime}
              </span>
              <span>Your sanctuary is ready.</span>
            </p>
          </motion.div>

          {/* BENTO GRID FEATURE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[500px]">
            {/* LARGE FEATURE CARD (8 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => navigate(`/games/${randomFeatured?.id}`)}
              className="md:col-span-8 relative group rounded-[2.5rem] overflow-hidden bg-card cursor-pointer shadow-xl shadow-black/20"
            >
              <img src={randomFeatured?.thumbnail || fallbackThumbnail} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  <Star className="w-3 h-3 fill-primary" /> Warning: Addictive
                </div>
                <h2 className="text-4xl md:text-6xl font-serif italic font-medium text-white mb-2">{randomFeatured?.title}</h2>
                <p className="text-white/70 line-clamp-2 max-w-xl text-lg font-light">Experience the seamless gameplay and stunning visuals of this community favorite.</p>
              </div>
            </motion.div>

            {/* SIDE STACK (4 cols) */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {/* STATUS CARD */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 bg-secondary/20 rounded-[2rem] p-6 border border-white/5 flex flex-col justify-center items-start gap-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{prefs.settings.streakCount} Day</div>
                  <div className="text-white/60 text-sm">Reward Streak Active</div>
                </div>
              </motion.div>

              {/* UNBLOCKER EMPHASIS */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate('/utilities')}
                className="flex-1 bg-teal-500/20 rounded-[2rem] p-6 border border-teal-500/20 flex flex-col justify-center items-start gap-4 hover:bg-teal-500/30 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/40">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">Unbl*cker</div>
                  <div className="text-white/60 text-sm">Access Restricted Content</div>
                </div>
              </motion.div>
            </div>
          </div>

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
            {['Action', 'Strategy', 'Racing', 'RPG', 'Blocked'].map(tag => (
              <Link key={tag} to={`/games?category=${tag.toLowerCase()}`} className={`px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all ${tag === 'Blocked' ? 'text-red-400 border-red-500/30' : ''}`}>
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
