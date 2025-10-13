import { useState, useEffect } from "react";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Share2,
  Heart,
  Clock,
  Users,
  Star,
  ChevronLeft,
  ExternalLink,
  Tag,
  Gamepad2,
  Calendar,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import gamesData from "@/data/games.json";
import { ShareButton } from "@/components/ShareButton";
import { SEO } from "@/components/SEO";

interface GameDetailPageProps {}

const GameDetailPage: React.FC<GameDetailPageProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isFavorite: checkFavorite, addFavorite, removeFavorite, addToHistory } = useUserPrefs();
  const [game, setGame] = useState<typeof gamesData[0] | null>(null);
  const [similarGames, setSimilarGames] = useState<typeof gamesData>([]);

  useEffect(() => {
    if (!slug) return;

    // Find the game by slug
    const foundGame = gamesData.find(g => g.id === slug);
    if (foundGame) {
      setGame(foundGame);

      // Calculate similar games based on tags and category
      const similar = gamesData
        .filter(g => g.id !== slug && (
          g.category === foundGame.category ||
          g.tags.some(tag => foundGame.tags.includes(tag))
        ))
        .slice(0, 6);
      setSimilarGames(similar);

      // Record game view in history
      addToHistory({
        id: slug,
        title: foundGame.title,
        type: 'game',
        playCount: 1
      });
    }
  }, [slug, addToHistory]);

  const isFavorite = game ? checkFavorite(game.id) : false;

  const toggleFavorite = () => {
    if (!game) return;

    if (isFavorite) {
      removeFavorite(game.id);
    } else {
      addFavorite(game.id);
    }
  };

  const handlePlay = () => {
    if (!game) return;
    window.open(game.url, '_blank');
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Game Not Found</CardTitle>
            <CardDescription className="text-gray-300">
              The game you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/games')} className="w-full">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Games
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const gameUrl = `https://subset28.github.io/Armaan-Tech-Tips/#/games/${game.id}`;

  return (
    <>
      <SEO
        title={game.title}
        description={game.description}
        ogImage={game.thumbnail}
        canonical={gameUrl}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${game.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/games')}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Badge className="mb-2 bg-blue-500/20 text-blue-300 border-blue-400">
                    {game.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-rowdies">
                    {game.title}
                  </h1>
                  <p className="text-gray-300 text-sm md:text-base line-clamp-2">
                    {game.description}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFavorite}
                    className={`bg-white/10 border-white/20 ${isFavorite ? 'text-red-400' : 'text-white'} hover:bg-white/20`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <ShareButton variant="outline" size="sm" />
                  <Button
                    onClick={handlePlay}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Play Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Game Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg flex items-center">
                        <Tag className="h-5 w-5 mr-2 text-blue-400" />
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {game.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-white/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg flex items-center">
                        <Gamepad2 className="h-5 w-5 mr-2 text-green-400" />
                        Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {game.developer && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Developer:</span>
                          <span className="text-white">{game.developer}</span>
                        </div>
                      )}
                      {game.mobileFriendly && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Mobile:</span>
                          <Badge className="bg-green-500/20 text-green-300">✓ Supported</Badge>
                        </div>
                      )}
                      {game.offline && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Offline:</span>
                          <Badge className="bg-purple-500/20 text-purple-300">✓ Available</Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Instructions */}
                {game.instructions && (
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">How to Play</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 whitespace-pre-line">{game.instructions}</p>
                      {game.controls && (
                        <>
                          <Separator className="my-4 bg-white/20" />
                          <div>
                            <h4 className="text-white font-medium mb-2">Controls</h4>
                            <p className="text-gray-300">{game.controls}</p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Tips */}
                {game.tips && game.tips.length > 0 && (
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Pro Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {game.tips.map((tip, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="text-yellow-400 mr-2 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={handlePlay} className="w-full bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Play Game
                    </Button>
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Button>
                    <Button variant="outline" onClick={toggleFavorite} className="w-full">
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-400' : ''}`} />
                      {isFavorite ? 'Remove from' : 'Add to'} Favorites
                    </Button>
                  </CardContent>
                </Card>

                {/* Similar Games */}
                {similarGames.length > 0 && (
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Similar Games</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {similarGames.map(similarGame => (
                        <div
                          key={similarGame.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                          onClick={() => navigate(`/games/${similarGame.id}`)}
                        >
                          <img
                            src={similarGame.thumbnail}
                            alt={similarGame.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium truncate">
                              {similarGame.title}
                            </h4>
                            <div className="flex gap-1 mt-1">
                              {similarGame.tags.slice(0, 2).map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Game Stats */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Game Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Category:</span>
                      <Badge className="bg-blue-500/20 text-blue-300 capitalize">{game.category}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Mobile:</span>
                      <Badge className={game.mobileFriendly ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}>
                        {game.mobileFriendly ? "✓ Supported" : "✗ Not Supported"}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Offline:</span>
                      <Badge className={game.offline ? "bg-purple-500/20 text-purple-300" : "bg-gray-500/20 text-gray-300"}>
                        {game.offline ? "✓ Available" : "✗ Online Only"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetailPage;
