import { useParams, useNavigate } from 'react-router-dom';
import games from '@/data/games.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Share2, ArrowLeft } from 'lucide-react';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { hash, asset, canonical } from '@/lib/paths';
import { thumb } from '@/lib/thumb';
import { SEO } from '@/components/SEO';
import { similarItems } from '@/utils/similarity';

export default function GameDetailPage() {
  const { id } = useParams(); // id === slug/id in games.json
  const navigate = useNavigate();
  const { prefs, toggleFavorite, pushHistory } = useUserPrefs();
  const game = games.find(g => g.id === id);
  if (!game) return <div className="p-8 text-center">Game not found</div>;

  const fav = prefs.favorites.includes(game.id);
  const play = () => {
    pushHistory(game.id, 'game');
    window.open(game.url, '_blank', 'noopener,noreferrer');
  };
  const share = async () => {
    const url = canonical(`/games/${game.id}`);
    if (navigator.share) { await navigator.share({ title: game.title, url }); }
    else { await navigator.clipboard.writeText(url); alert('Link copied'); }
  };

  const similar = similarItems(games, game, 6);

  return (
    <div className="container mx-auto px-4 py-6">
      <SEO title={`${game.title} — Tech Tips`} description={game.description} canonical={canonical(`/games/${game.id}`)} ogImage={asset(`/thumbnails/${game.id}.webp`)} />
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {game.title}
              <button onClick={() => toggleFavorite(game.id)} aria-label="favorite">
                <Heart className={`h-5 w-5 ${fav ? 'fill-current text-red-500' : ''}`} />
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img src={thumb(game.thumbnail)} alt={game.title} className="rounded-lg mb-4 max-h-64 object-cover w-full" />
            <p className="mb-4">{game.description}</p>
            <div className="flex gap-2">
              <Button onClick={play}>Play</Button>
              <Button variant="outline" onClick={share}><Share2 className="h-4 w-4 mr-2" />Share</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Similar games</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {similar.map(s => (
              <button key={s.id} className="text-left hover:bg-white/5 rounded p-2"
                onClick={() => navigate(`/games/${s.id}`)}>
                <div className="font-medium">{s.title}</div>
                <div className="text-sm opacity-70">{s.tags?.slice(0,3).join(' • ')}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
