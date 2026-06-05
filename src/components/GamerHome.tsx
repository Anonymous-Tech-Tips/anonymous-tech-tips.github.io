import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Play, ChevronRight, Star, Clock, Search, Zap, Users, ArrowRight,
  Flame, Gamepad2, Trophy, Sparkles
} from "lucide-react";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { useProgression } from "@/contexts/ProgressionContext";
import { TopBannerAd, InContentAd, BottomAd } from "@/components/GoogleAd";
import { DailyReward } from "@/components/DailyReward";
import FriendsGallery from "@/components/FriendsGallery";
import { games } from "@/data/games";
import fallbackThumbnail from "@/assets/thumbnails/_fallback.png";
import { DiscoveryFeed } from '@/components/rewards/DiscoveryFeed';

const HERO_GAME_IDS = ["slope", "retro-bowl", "smash-karts", "1v1-lol", "geometry-dash", "moto-x3m"];
const HOT_GAME_IDS  = ["bitlife", "fnaf", "tunnel-rush", "drift-boss", "cookie-clicker", "temple-run-2", "basketball-stars", "bloxorz", "idle-breakout", "drive-mad", "soccer-random", "among-us"];

export const GamerHome = () => {
  const { prefs } = useUserPrefs();
  const { purchases, progress, getCurrentRank } = useProgression();
  const navigate = useNavigate();
  const hasQuickLaunch    = purchases.includes('quick-launch-slots') || purchases.includes('vip-status');
  const hasDiscoveryFeed  = purchases.includes('discovery-feed') || purchases.includes('vip-status');
  const hasHistoryTracker = purchases.includes('recently-played-tracker') || purchases.includes('vip-status');
  const hasExtendedHistory = purchases.includes('extended-history') || purchases.includes('vip-status');
  const historyLimit = hasExtendedHistory ? 50 : hasHistoryTracker ? 16 : 6;
  const currentRank = getCurrentRank();

  const [searchQuery, setSearchQuery] = useState("");
  const [featuredGame, setFeaturedGame] = useState(games[0]);

  const validGames = games.filter(g => !g.tags.includes("blocked"));

  const heroGames = HERO_GAME_IDS
    .map(id => validGames.find(g => g.id === id))
    .filter(Boolean) as typeof games;

  const hotGames = HOT_GAME_IDS
    .map(id => validGames.find(g => g.id === id))
    .filter(Boolean) as typeof games;

  const continueIds = prefs.history.filter(h => h.itemType === 'game').map(h => h.itemId);
  const continueItems = [...new Set(continueIds)]
    .map(id => games.find(g => g.id === id))
    .filter(Boolean) as typeof games;

  const favItems = prefs.favorites
    .map(id => games.find(g => g.id === id))
    .filter(Boolean) as typeof games;

  useEffect(() => {
    const popular = validGames.filter(g => g.tags.includes('popular') || g.tags.includes('featured'));
    if (popular.length > 0) setFeaturedGame(popular[Math.floor(Math.random() * popular.length)]);
    const iv = setInterval(() => {
      if (popular.length > 0) setFeaturedGame(popular[Math.floor(Math.random() * popular.length)]);
    }, 8000);
    return () => clearInterval(iv);
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Morning";
    if (h < 18) return "Afternoon";
    return "Evening";
  };

  const searchResults = searchQuery.length > 1
    ? validGames.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  return (
    <div className="min-h-screen bg-[#08080f] text-white overflow-x-hidden">

      {/* ── TOP HERO ──────────────────────────────── */}
      <div className="relative pt-20 pb-0 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[300px] bg-purple-600/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8">

          {/* greeting row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                {getGreeting()}, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Gamer</span> 👋
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {currentRank.icon} {currentRank.name} · Lv.{progress.level} · {prefs.settings.streakCount}🔥 day streak
              </p>
            </div>

            {/* search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl h-10 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#10101c] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
                  {searchResults.map(game => (
                    <button
                      key={game.id}
                      onClick={() => { navigate(`/games/${game.id}`); setSearchQuery(""); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
                    >
                      <img src={game.thumbnail || fallbackThumbnail} alt={game.title} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white text-sm">{game.title}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{game.tags[0]}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── FEATURED + SIDE STACK ─────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
            {/* big feature card */}
            <div
              onClick={() => navigate(`/games/${featuredGame?.id}`)}
              className="lg:col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={featuredGame?.thumbnail || fallbackThumbnail}
                alt={featuredGame?.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-wider rounded-full">
                  <Star size={9} className="fill-black" /> Featured
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 drop-shadow-lg">{featuredGame?.title}</h2>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors">
                  <Play size={14} className="fill-white" /> Play Now
                </span>
              </div>
            </div>

            {/* side: hero game thumbnails */}
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
              {heroGames.slice(0, 6).map(game => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-white/5 hover:border-blue-500/50 transition-colors"
                >
                  <img src={game.thumbnail || fallbackThumbnail} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <div className="text-[10px] font-bold text-white truncate">{game.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DASHBOARD CONTENT ─────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-14">

        {/* quick category nav */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { label: "All Games",   href: "/games",                       icon: Gamepad2, color: "text-white" },
            { label: "Action",      href: "/games?category=action",       icon: Zap,      color: "text-red-400" },
            { label: "Racing",      href: "/games?category=racing",       icon: Trophy,   color: "text-blue-400" },
            { label: "Sports",      href: "/games?category=sports",       icon: Trophy,   color: "text-green-400" },
            { label: "Casual",      href: "/games?category=casual",       icon: Sparkles, color: "text-yellow-400" },
            { label: "Multiplayer", href: "/games?category=multiplayer",  icon: Users,    color: "text-pink-400" },
            { label: "Puzzle",      href: "/games?category=puzzle",       icon: Sparkles, color: "text-purple-400" },
          ].map(cat => (
            <Link
              key={cat.label}
              to={cat.href}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/8 rounded-full whitespace-nowrap text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex-shrink-0"
            >
              <cat.icon size={13} className={cat.color} />
              {cat.label}
            </Link>
          ))}
        </div>

        {/* QUICK LAUNCH */}
        {hasQuickLaunch && favItems.length > 0 && (
          <section className="space-y-4">
            <SectionHeader icon={<Zap size={16} className="text-yellow-400" />} title="Quick Launch" color="text-yellow-400" />
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {favItems.slice(0, 5).map(game => (
                <button
                  key={game.id}
                  onClick={() => navigate(`/games/${game.id}`)}
                  className="flex-shrink-0 flex items-center gap-3 px-3 py-2 bg-[#12121e] border-l-2 border-yellow-500 rounded-r-xl hover:bg-[#1a1a2e] transition-colors w-44"
                >
                  <img src={game.thumbnail || fallbackThumbnail} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt={game.title} />
                  <div className="overflow-hidden text-left">
                    <div className="text-xs font-bold truncate text-white">{game.title}</div>
                    <div className="text-[9px] text-white/40 uppercase tracking-wide">Instant</div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* CONTINUE PLAYING */}
        {continueItems.length > 0 && (
          <section className="space-y-4">
            <SectionHeader icon={<Clock size={16} className="text-blue-400" />} title="Jump Back In" href="/games" color="text-blue-400" />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
              {continueItems.slice(0, historyLimit).map(game => (
                <GameCard key={game.id} game={game} />
              ))}
              {!hasHistoryTracker && continueItems.length > 6 && (
                <Link to="/shop" className="aspect-[4/3] flex flex-col items-center justify-center bg-white/3 border border-dashed border-white/10 rounded-xl text-center p-2">
                  <div className="text-xs text-white/40">+{continueItems.length - 6}</div>
                  <div className="text-[9px] text-blue-400 mt-0.5">Unlock</div>
                </Link>
              )}
            </div>
          </section>
        )}

        <InContentAd />

        {/* HOT RIGHT NOW */}
        <section className="space-y-4">
          <SectionHeader icon={<Flame size={16} className="text-orange-400" />} title="Hot Right Now" href="/games" color="text-orange-400" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5">
            {hotGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* ALL GAMES CTA */}
        <section className="space-y-4">
          <SectionHeader icon={<Gamepad2 size={16} className="text-purple-400" />} title={`All Games (${validGames.length})`} href="/games" color="text-purple-400" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
            {validGames.slice(0, 30).map(game => (
              <GameCard key={game.id} game={game} small />
            ))}
          </div>
          <Link
            to="/games"
            className="flex items-center justify-center gap-2 w-full py-3 mt-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Browse All {validGames.length} Games <ArrowRight size={14} />
          </Link>
        </section>

        {/* DISCOVERY FEED */}
        {hasDiscoveryFeed && (
          <section>
            <DiscoveryFeed />
          </section>
        )}

        {/* THE SQUAD */}
        <section className="border-t border-white/8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-5">
              <SectionHeader icon={<Users size={16} className="text-pink-400" />} title="The Squad" color="text-pink-400" />
              <p className="text-slate-500 text-sm leading-relaxed">
                See what friends are playing, compete for high scores, and earn rewards for your daily streak.
              </p>
              <div className="flex items-center gap-3">
                <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-2xl font-black text-white">{prefs.settings.streakCount}</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500">Day Streak</div>
                </div>
                <DailyReward streakCount={prefs.settings.streakCount || 0} />
              </div>
            </div>
            <div className="lg:col-span-2 bg-[#10101c] border border-white/8 rounded-2xl p-6">
              <FriendsGallery />
            </div>
          </div>
        </section>

      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10">
        <BottomAd />
      </div>
    </div>
  );
};

// ── SUB-COMPONENTS ──────────────────────────────────────────

const SectionHeader = ({
  icon, title, href, color
}: { icon: React.ReactNode; title: string; href?: string; color?: string }) => (
  <div className="flex items-center justify-between">
    <h2 className="flex items-center gap-2 text-base font-black text-white">
      {icon}
      <span className={color}>{title}</span>
    </h2>
    {href && (
      <Link to={href} className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-0.5 transition-colors">
        See all <ChevronRight size={12} />
      </Link>
    )}
  </div>
);

const GameCard = ({ game, small }: { game: any; small?: boolean }) => (
  <Link
    to={`/games/${game.id}`}
    className="block group bg-[#10101c] border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/40 transition-colors"
    style={{ contentVisibility: 'auto', containIntrinsicSize: `0 ${small ? '100px' : '120px'}` } as React.CSSProperties}
  >
    <div className="aspect-[4/3] overflow-hidden bg-slate-900">
      <img
        src={game.thumbnail || fallbackThumbnail}
        alt={game.title}
        loading="lazy"
        width={small ? 140 : 180}
        height={small ? 105 : 135}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className={`${small ? 'p-1.5' : 'p-2'}`}>
      <div className={`font-bold text-slate-100 truncate ${small ? 'text-[9px]' : 'text-[11px]'}`}>{game.title}</div>
      {!small && <div className="text-[9px] text-slate-500 uppercase tracking-wide mt-0.5 truncate">{game.tags[0]}</div>}
    </div>
  </Link>
);
