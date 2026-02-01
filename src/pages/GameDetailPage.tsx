import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { games } from '@/data/games';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Share2, ArrowLeft } from 'lucide-react';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProgression } from '@/contexts/ProgressionContext';
import { hash, asset, canonical } from '@/lib/paths';
import { thumb } from '@/lib/thumb';
import { SEO } from '@/components/SEO';
import { similarItems } from '@/utils/similarity';
import { openGameSandbox } from '@/utils/openGameSandbox';
import { SidebarAd, BottomAd } from '@/components/GoogleAd';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Save, Wifi, BookOpen, CheckCircle2, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function GameDetailPage() {
  const { id } = useParams(); // id === slug/id in games.ts
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { prefs, toggleFavorite, pushHistory } = useUserPrefs();
  const { trackGamePlay, purchases } = useProgression();

  // Shop Features
  const hasGameNotes = purchases.includes('game-notes');
  const hasAutoSave = purchases.includes('auto-save-progress');
  const hasOfflineMode = purchases.includes('offline-mode-plus');
  const hasPremium = purchases.includes('premium-games-pack') || purchases.includes('vip-status');
  const hasEarlyAccess = purchases.includes('early-access') || purchases.includes('vip-status');
  const hasExclusive = purchases.includes('exclusive-games-pack') || purchases.includes('vip-status');

  const [notes, setNotes] = useState('');

  const game = games.find(g => g.id === id);

  // Access Control Logic
  const isPremiumLocked = game?.premium && !hasPremium;
  const isEarlyAccessLocked = game?.earlyAccess && !hasEarlyAccess;
  const isExclusiveLocked = (game?.tags.includes('exclusive') && !hasExclusive);

  const isLocked = isPremiumLocked || isEarlyAccessLocked || isExclusiveLocked;

  useEffect(() => {
    if (game && hasGameNotes) {
      const savedNotes = localStorage.getItem(`notes_${game.id}`);
      if (savedNotes) setNotes(savedNotes);
    }
  }, [game, hasGameNotes]);

  const saveNotes = () => {
    if (game) {
      localStorage.setItem(`notes_${game.id}`, notes);
      toast.success('Notes saved successfully!');
    }
  };
  if (!game) return <div className="p-8 text-center">Game not found</div>;

  const fav = prefs.favorites.includes(game.id);

  const play = () => {
    if (isLocked) {
      toast.error("This game requires an unlock from the Shop!", {
        description: isPremiumLocked ? "Requires Premium Games Pack" : "Requires Early Access or Exclusive Pack"
      });
      navigate('/shop');
      return;
    }

    pushHistory(game.id, 'game');
    // Track game play for progression system
    if (isAuthenticated) {
      trackGamePlay(game.id, game.title);
    }
    openGameSandbox(game.url);
  };
  const share = async () => {
    const url = canonical(`/games/${game.id}`);
    if (navigator.share) { await navigator.share({ title: game.title, url }); }
    else { await navigator.clipboard.writeText(url); alert('Link copied'); }
  };

  const similar = similarItems(games, game, 6);

  // Dark theme for authenticated users
  const isDarkTheme = isAuthenticated;
  const themeClasses = isDarkTheme
    ? "bg-[#121217] text-white min-h-screen"
    : "bg-slate-50 text-slate-900 min-h-screen";

  return (
    <div className={themeClasses}>
      <SEO
        title={`${game.title} — Tech Tips`}
        description={`${game.title} - Play this ${game.tags.join(", ")} game for free!`}
        canonical={canonical(`/games/${game.id}`)}
        ogImage={game.thumbnail}
        gameData={{
          name: game.title,
          genre: game.tags || [],
          url: canonical(`/games/${game.id}`),
          image: game.thumbnail
        }}
      />

      {/* Back Button */}
      <div className="sticky top-0 z-40 bg-[#121217]/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-white hover:bg-white/10">
            <ArrowLeft className="h-4 w-4 mr-2" />Back
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main Game Card */}
          <Card className={`lg:col-span-2 ${isDarkTheme ? "bg-[#1E1E24] border-[#2a2a3a]" : "bg-white border-slate-200"}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className={isDarkTheme ? "text-white" : "text-slate-900"}>{game.title}</span>
                <button
                  onClick={() => toggleFavorite(game.id)}
                  aria-label="favorite"
                  className={isDarkTheme ? "text-white hover:text-red-400" : "text-slate-600 hover:text-red-500"}
                >
                  <Heart className={`h-5 w-5 ${fav ? "fill-current text-red-500" : ""}`} />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="rounded-lg mb-4 max-h-64 object-cover w-full"
                />
                <p className={isDarkTheme ? "text-slate-300 mb-4" : "text-slate-600 mb-4"}>
                  Play {game.title} - A {game.tags.join(", ")} game. Test your skills and have fun!
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={play}
                    disabled={isLocked && false}
                    className={`font-semibold ${isDarkTheme ? "bg-orange-600 hover:bg-orange-700 text-white shadow-lg" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"} ${isLocked ? 'opacity-90 grayscale' : ''}`}
                  >
                    {isLocked ? <><Lock className="w-4 h-4 mr-2" /> Unlock to Play</> : 'Play Now'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={share}
                    className={`font-semibold border-2 ${isDarkTheme ? "border-slate-500 bg-slate-800 text-white hover:bg-slate-700 hover:text-white" : "border-slate-400 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    <span className={`font-medium ${isDarkTheme ? "text-white" : "text-slate-900"}`}>Share</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GAME NOTES (Shop Feature) */}
          {hasGameNotes && (
            <Card className={isDarkTheme ? "bg-[#1E1E24] border-[#2a2a3a]" : "bg-white border-slate-200"}>
              <CardHeader className="pb-3">
                <CardTitle className={`text-lg flex items-center gap-2 ${isDarkTheme ? "text-white" : "text-slate-900"}`}>
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  Game Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write down strategies, cheats, or reminders..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`min-h-[100px] mb-2 ${isDarkTheme ? "bg-black/20 border-white/10 text-white placeholder:text-white/30" : "bg-slate-50 border-slate-200"}`}
                />
                <Button size="sm" onClick={saveNotes} className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                  <Save className="h-4 w-4 mr-2" /> Save Notes
                </Button>
              </CardContent>
            </Card>
          )}

          {/* FEATURES BADGES (Shop Features) */}
          {(hasAutoSave || hasOfflineMode) && (
            <div className="flex gap-4">
              {hasAutoSave && (
                <Badge variant="outline" className="px-3 py-1.5 flex items-center gap-2 border-green-500/50 text-green-500 bg-green-500/10">
                  <CheckCircle2 size={14} /> Auto-Save Active
                </Badge>
              )}
              {hasOfflineMode && (
                <Badge variant="outline" className="px-3 py-1.5 flex items-center gap-2 border-blue-500/50 text-blue-500 bg-blue-500/10">
                  <Wifi size={14} /> Offline Ready
                </Badge>
              )}
            </div>
          )}

          {/* Similar Games Sidebar */}
          <div className="space-y-6">
            <Card className={isDarkTheme ? "bg-[#1E1E24] border-[#2a2a3a]" : "bg-white border-slate-200"}>
              <CardHeader>
                <CardTitle className={isDarkTheme ? "text-white" : "text-slate-900"}>
                  Similar Games
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {similar.map(s => (
                  <button
                    key={s.id}
                    onClick={() => navigate(`/games/${s.id}`)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${isDarkTheme
                      ? "hover:bg-white/10 text-slate-300"
                      : "hover:bg-slate-50 text-slate-600"
                      }`}
                  >
                    <div className="font-medium">{s.title}</div>
                    <div className="text-sm opacity-70">{s.tags?.slice(0, 3).join(" • ")}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <SidebarAd />
          </div>
        </div>
      </div>

      <BottomAd />
    </div>
  );
}
