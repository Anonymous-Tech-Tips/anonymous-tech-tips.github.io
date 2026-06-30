import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { games } from '@/data/games';
import { Heart, Share2, ArrowLeft, Play, Lock, BookOpen, Save, Wifi, CheckCircle2 } from 'lucide-react';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProgression } from '@/contexts/ProgressionContext';
import { canonical } from '@/lib/paths';
import { SEO } from '@/components/SEO';
import { similarItems } from '@/utils/similarity';
import { openGameSandbox } from '@/utils/openGameSandbox';
import { trackGamePlay as gaTrackGamePlay } from '@/utils/analytics';
import { BottomAd } from '@/components/GoogleAd';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { GameIcon } from '@/components/GameIcon';

export default function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { prefs, toggleFavorite, pushHistory } = useUserPrefs();
  const { trackGamePlay, purchases } = useProgression();
  const [thumbFailed, setThumbFailed] = useState(false);
  const [notes, setNotes] = useState('');

  const hasGameNotes = purchases.includes('game-notes');
  const hasAutoSave = purchases.includes('auto-save-progress');
  const hasOfflineMode = purchases.includes('offline-mode-plus');
  const hasPremium = purchases.includes('premium-games-pack') || purchases.includes('vip-status');
  const hasEarlyAccess = purchases.includes('early-access') || purchases.includes('vip-status');
  const hasExclusive = purchases.includes('exclusive-games-pack') || purchases.includes('vip-status');

  const game = useMemo(() => games.find(g => g.id === id), [id]);
  const similar = useMemo(() => game ? similarItems(games, game, 6) : [], [game]);

  const isPremiumLocked = (game as any)?.premium && !hasPremium;
  const isEarlyAccessLocked = (game as any)?.earlyAccess && !hasEarlyAccess;
  const isExclusiveLocked = game?.tags.includes('exclusive') && !hasExclusive;
  const isLocked = isPremiumLocked || isEarlyAccessLocked || isExclusiveLocked;

  const fav = game ? prefs.favorites.includes(game.id) : false;
  const playCount = game ? (prefs.settings.gameStats?.[game.id]?.playCount ?? 0) : 0;

  useEffect(() => {
    if (game && hasGameNotes) {
      const saved = localStorage.getItem(`notes_${game.id}`);
      if (saved) setNotes(saved);
    }
  }, [game, hasGameNotes]);

  if (!game) return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-6xl mb-4">🎮</div>
        <h1 className="text-2xl font-bold mb-2">Game not found</h1>
        <Link to="/games" className="text-blue-400 hover:text-blue-300 underline">Browse all games</Link>
      </div>
    </div>
  );

  const play = () => {
    if (isLocked) {
      toast.error('This game requires an unlock from the Shop!', {
        description: isPremiumLocked ? 'Requires Premium Games Pack' : 'Requires Early Access or Exclusive Pack',
      });
      navigate('/shop');
      return;
    }
    pushHistory(game.id, 'game');
    if (isAuthenticated) trackGamePlay(game.id, game.title);
    gaTrackGamePlay(game.id, game.title);
    openGameSandbox(game.url, game.title);
  };

  const share = async () => {
    const url = canonical(`/games/${game.id}`);
    if (navigator.share) await navigator.share({ title: game.title, url });
    else { await navigator.clipboard.writeText(url); toast.success('Link copied!'); }
  };

  const saveNotes = () => {
    localStorage.setItem(`notes_${game.id}`, notes);
    toast.success('Notes saved!');
  };

  const showHero = game.thumbnail && !thumbFailed;

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      <SEO
        title={`${game.title} — Tech Tips`}
        description={`${game.title} - Play this ${game.tags.join(', ')} game for free!`}
        canonical={canonical(`/games/${game.id}`)}
        gameData={{ name: game.title, genre: game.tags || [], url: canonical(`/games/${game.id}`) }}
      />

      {/* Sticky top bar — full mini-nav */}
      <div className="sticky top-0 z-40 bg-[#0a0a12]/90 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center gap-0">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-lg tracking-tighter mr-4 font-serif italic flex-shrink-0">
            TechTips<span className="text-blue-500">.</span>
          </Link>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm min-w-0">
            <Link to="/games" className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0 font-medium">
              Modules
            </Link>
            <span className="text-white/15 flex-shrink-0">/</span>
            <span className="text-slate-300 truncate font-medium">{game.title}</span>
          </div>

          {/* Right: back button */}
          <button
            onClick={() => navigate(-1)}
            className="ml-auto flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors text-xs font-medium flex-shrink-0"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative w-full" style={{ maxHeight: 480 }}>
        {showHero ? (
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full object-cover"
            style={{ maxHeight: 480, minHeight: 260 }}
            onError={() => setThumbFailed(true)}
          />
        ) : (
          <GameIcon id={game.id} title={game.title} className="w-full text-[120px]" style={{ minHeight: 300 } as React.CSSProperties} />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12]/60 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {game.tags.map(tag => (
                <span key={tag} className="px-2.5 py-0.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white/80 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl leading-tight">
              {game.title}
            </h1>
            {playCount > 0 && (
              <p className="text-slate-400 text-sm mt-2">{playCount} play{playCount !== 1 ? 's' : ''}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="border-b border-white/5 bg-[#0d0d1a]">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={play}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-base transition-all shadow-lg ${
              isLocked
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-900/50 hover:scale-105 active:scale-95'
            }`}
          >
            {isLocked ? <Lock size={18} /> : <Play size={18} className="fill-white" />}
            {isLocked ? 'Unlock to Play' : 'Launch Game'}
          </button>

          <button
            onClick={() => toggleFavorite(game.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border transition-all ${
              fav
                ? 'bg-red-500/15 border-red-500/40 text-red-400 hover:bg-red-500/25'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Heart size={16} className={fav ? 'fill-current' : ''} />
            {fav ? 'Saved' : 'Save'}
          </button>

          <button
            onClick={share}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
          >
            <Share2 size={16} />
            Share
          </button>

          {(hasAutoSave || hasOfflineMode) && (
            <div className="flex gap-2 ml-auto">
              {hasAutoSave && (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/30 gap-1.5">
                  <CheckCircle2 size={12} /> Auto-Save
                </Badge>
              )}
              {hasOfflineMode && (
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 gap-1.5">
                  <Wifi size={12} /> Offline
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8 grid lg:grid-cols-3 gap-8">

        {/* Left col */}
        <div className="lg:col-span-2 space-y-6">

          {/* Game notes */}
          {hasGameNotes && (
            <div className="bg-[#13131f] border border-white/8 rounded-2xl p-5">
              <h3 className="flex items-center gap-2 font-bold text-white mb-3">
                <BookOpen size={16} className="text-orange-400" /> Strategy Notes
              </h3>
              <Textarea
                placeholder="Write down strategies, tips, or reminders..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="bg-black/30 border-white/10 text-white placeholder:text-white/25 min-h-[120px] resize-none"
              />
              <button
                onClick={saveNotes}
                className="mt-2 flex items-center gap-1.5 px-4 py-2 bg-white/8 hover:bg-white/12 border border-white/10 rounded-lg text-sm font-semibold text-slate-300 transition-colors"
              >
                <Save size={14} /> Save Notes
              </button>
            </div>
          )}

          {/* Ad slot */}
          <BottomAd />
        </div>

        {/* Right col — related games */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-base">Related Games</h3>
          <div className="grid grid-cols-2 gap-3">
            {similar.map(s => (
              <Link
                key={s.id}
                to={`/games/${s.id}`}
                className="group block bg-[#13131f] border border-white/8 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all hover:scale-[1.02]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-900">
                  {s.thumbnail
                    ? <img src={s.thumbnail} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    : <GameIcon id={s.id} title={s.title} className="w-full h-full text-3xl" />
                  }
                </div>
                <div className="p-2.5">
                  <div className="text-xs font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors">{s.title}</div>
                  <div className="text-[9px] text-slate-500 uppercase tracking-wide mt-0.5">{s.tags[0]}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
