import React, { useState, useEffect, useMemo } from "react";
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
import { GameIcon } from "./GameIcon";
import { DiscoveryFeed } from '@/components/rewards/DiscoveryFeed';
import { openSmart } from '@/utils/openGameSandbox';

// Pick one representative game per category for the hero grid
const HERO_CATEGORIES = ["Platformer", "Action", "Racing", "Sports", "Shooter", "Multiplayer"];

const CATEGORY_NAV = [
  { label: "All Modules", href: "/games",                      icon: Gamepad2, color: "text-white" },
  { label: "Platformer",  href: "/games?category=platformer",  icon: Zap,      color: "text-cyan-400" },
  { label: "Action",      href: "/games?category=action",      icon: Zap,      color: "text-red-400" },
  { label: "Puzzle",      href: "/games?category=puzzle",      icon: Sparkles, color: "text-purple-400" },
  { label: "Racing",      href: "/games?category=racing",      icon: Trophy,   color: "text-blue-400" },
  { label: "Sports",      href: "/games?category=sports",      icon: Trophy,   color: "text-green-400" },
  { label: "Horror",      href: "/games?category=horror",      icon: Sparkles, color: "text-red-600" },
  { label: "Simulation",  href: "/games?category=simulation",  icon: Sparkles, color: "text-amber-400" },
  { label: "Idle",        href: "/games?category=idle",        icon: Sparkles, color: "text-lime-400" },
  { label: "Multiplayer", href: "/games?category=multiplayer", icon: Users,    color: "text-pink-400" },
  { label: "RPG",         href: "/games?category=rpg",         icon: Sparkles, color: "text-orange-400" },
  { label: "Casual",      href: "/games?category=arcade",      icon: Gamepad2, color: "text-yellow-400" },
] as const;
// Curated hot games — one per major category for variety
const HOT_GAME_IDS = [
  "slope", "retro-bowl", "tunnel-rush", "drift-boss", "cookie-clicker", "temple-run-2",
  "basketball-stars", "bloxorz", "idle-breakout", "drive-mad", "soccer-random", "among-us",
  "geometry-dash", "moto-x3m", "getaway-shootout", "rooftop-snipers",
];

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
  const [featuredVisible, setFeaturedVisible] = useState(true);

  const validGames = useMemo(() => games.filter(g => !g.tags.includes("blocked")), []);

  const heroGames = useMemo(() => HERO_CATEGORIES
    .map(cat => validGames.find(g => g.tags.includes(cat)))
    .filter(Boolean) as typeof games, [validGames]);

  const hotGames = useMemo(() => HOT_GAME_IDS
    .map(id => validGames.find(g => g.id === id))
    .filter(Boolean) as typeof games, [validGames]);

  const continueItems = useMemo(() => {
    const ids = [...new Set(prefs.history.filter(h => h.itemType === 'game').map(h => h.itemId))];
    return ids.map(id => games.find(g => g.id === id)).filter(Boolean) as typeof games;
  }, [prefs.history]);

  const favItems = useMemo(() => prefs.favorites
    .map(id => games.find(g => g.id === id))
    .filter(Boolean) as typeof games, [prefs.favorites]);

  useEffect(() => {
    const pool = hotGames.length > 0 ? hotGames : validGames.slice(0, 20);
    const pick = () => pool[Math.floor(Math.random() * pool.length)];
    setFeaturedGame(pick());
    const crossfade = () => {
      setFeaturedVisible(false);
      setTimeout(() => { setFeaturedGame(pick()); setFeaturedVisible(true); }, 400);
    };
    let iv = setInterval(crossfade, 8000);
    const pause = () => { clearInterval(iv); };
    const resume = () => { iv = setInterval(crossfade, 8000); };
    window.addEventListener('open-game-overlay', pause);
    window.addEventListener('close-game-overlay', resume);
    return () => {
      clearInterval(iv);
      window.removeEventListener('open-game-overlay', pause);
      window.removeEventListener('close-game-overlay', resume);
    };
  }, []);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Morning";
    if (h < 18) return "Afternoon";
    return "Evening";
  }, []);

  const searchResults = useMemo(() => searchQuery.length > 1
    ? validGames.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [], [searchQuery, validGames]);

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
                {greeting}, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Gamer</span> 👋
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
                placeholder="Search modules..."
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
                      {game.thumbnail
                        ? <img src={game.thumbnail} alt={game.title} className="w-9 h-9 rounded-lg flex-shrink-0 object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                        : <GameIcon id={game.id} title={game.title} className="w-9 h-9 rounded-lg flex-shrink-0 text-lg" />}
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
              className="lg:col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden group cursor-pointer bg-slate-900"
              style={{ opacity: featuredVisible ? 1 : 0, transition: 'opacity 0.35s ease' }}
            >
              {featuredGame && (
                featuredGame.thumbnail
                  ? <img src={featuredGame.thumbnail} alt={featuredGame.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  : <GameIcon id={featuredGame.id} title={featuredGame.title} className="absolute inset-0 w-full h-full text-7xl" />
              )}
              {/* layered gradients for cinematic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

              {/* top badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">
                  <Star size={9} className="fill-black" /> Featured
                </span>
                {featuredGame?.tags?.[0] && (
                  <span className="px-2.5 py-1 bg-white/10 backdrop-blur border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {featuredGame.tags[0]}
                  </span>
                )}
              </div>

              {/* bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2
                  onClick={() => navigate(`/games/${featuredGame?.id}`)}
                  className="text-2xl sm:text-3xl font-black text-white mb-3 drop-shadow-lg leading-tight hover:text-blue-300 transition-colors inline-block cursor-pointer"
                >
                  {featuredGame?.title}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); if (featuredGame) openSmart(featuredGame.url, false, featuredGame.title); }}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-xl shadow-blue-900/40 hover:shadow-blue-600/30 hover:scale-105 active:scale-95"
                  >
                    <Play size={14} className="fill-white" /> Launch
                  </button>
                  <Link
                    to={`/games/${featuredGame?.id}`}
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/15 text-white text-sm font-semibold rounded-xl transition-all"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>

            {/* side: hero game thumbnails */}
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
              {heroGames.slice(0, 6).map(game => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-white/6 hover:border-blue-500/60 hover:shadow-[0_0_16px_rgba(59,130,246,0.15)] transition-all duration-200"
                >
                  {game.thumbnail
                    ? <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    : <GameIcon id={game.id} title={game.title} className="w-full h-full text-3xl" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-xl">
                      <Play size={12} className="fill-white text-white ml-0.5" />
                    </span>
                  </div>
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
          {CATEGORY_NAV.map(cat => (
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
                  {game.thumbnail
                    ? <img src={game.thumbnail} alt={game.title} className="w-10 h-10 rounded-lg flex-shrink-0 object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    : <GameIcon id={game.id} title={game.title} className="w-10 h-10 rounded-lg flex-shrink-0 text-lg" />}
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
          <SectionHeader icon={<Gamepad2 size={16} className="text-purple-400" />} title={`Catalog (${validGames.length})`} href="/games" color="text-purple-400" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
            {validGames.slice(0, 30).map(game => (
              <GameCard key={game.id} game={game} small />
            ))}
          </div>
          <Link
            to="/games"
            className="flex items-center justify-center gap-2 w-full py-3 mt-2 bg-[#13131f] hover:bg-white/8 border border-white/8 hover:border-blue-500/40 rounded-2xl text-sm font-bold text-slate-400 hover:text-white transition-all"
          >
            Browse all {validGames.length} modules <ArrowRight size={14} />
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
    className="block group bg-[#13131f] border border-white/6 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-200"
    style={{ contentVisibility: 'auto', containIntrinsicSize: `0 ${small ? '100px' : '120px'}` } as React.CSSProperties}
  >
    <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
      {game.thumbnail
        ? <img src={game.thumbnail} alt={game.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        : <GameIcon id={game.id} title={game.title} className={`w-full h-full ${small ? 'text-2xl' : 'text-3xl'}`} />}
      {!small && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-2.5">
          <span className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full shadow-lg">▶ Play</span>
        </div>
      )}
    </div>
    <div className={`${small ? 'p-1.5' : 'p-2'}`}>
      <div className={`font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors ${small ? 'text-[9px]' : 'text-[11px]'}`}>{game.title}</div>
      {!small && <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5 truncate font-semibold">{game.tags[0]}</div>}
    </div>
  </Link>
);
