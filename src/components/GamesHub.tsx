import React, { useState, useMemo } from "react";
import { Search, Gamepad2, Download, TrendingUp } from "lucide-react";
import { games, type Game } from "@/data/games";
import fallbackThumbnail from "@/assets/thumbnails/_fallback.png";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GameButton } from "./GameButton";
import { toast } from "sonner";
import { InContentAd } from "./GoogleAd";
import { useUserPrefs } from "@/contexts/UserPrefsContext";

export const GamesHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { prefs } = useUserPrefs();

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    games.forEach((game) => game.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || game.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // Get top 10 most played games based on actual play counts
  const gameStats = useMemo(() => prefs.settings.gameStats || {}, [prefs.settings.gameStats]);

  const popularGames = useMemo(() => {
    // Sort filtered games by play count
    const gamesWithStats = filteredGames.map(game => ({
      ...game,
      playCount: gameStats[game.id]?.playCount || 0
    }));

    // Sort by play count descending, then by featured flag as tiebreaker
    return gamesWithStats
      .sort((a, b) => {
        if (b.playCount !== a.playCount) return b.playCount - a.playCount;
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      })
      .slice(0, 10);
  }, [filteredGames, gameStats]);

  const exportGamesList = () => {
    const gamesList = filteredGames.map((game, index) =>
      `${index + 1}. ${game.title}\n   🎮 Tags: ${game.tags.join(", ")}\n   🔗 ${window.location.origin}/#/games/${game.id}\n`
    ).join("\n");

    const fullExport = `🎮 ANONYMOUS TECH TIPS GAMES LIST (${filteredGames.length} Games)
Generated: ${new Date().toLocaleDateString()}

${gamesList}

---
Visit Anonymous Tech Tips: ${window.location.origin}/
145+ Unblocked Games | Daily Rewards | Zero Downloads`;

    navigator.clipboard.writeText(fullExport).then(() => {
      toast.success(`Copied ${filteredGames.length} games to clipboard!`);
    });
  };

  return (
    <section id="games" className="py-16 bg-gamer-bg scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Gamepad2 className="text-gamer-accent" size={32} />
            <h2 className="text-3xl md:text-4xl font-rowdies font-bold text-gamer-text">
              Games Hub
            </h2>
          </div>
          <Button
            onClick={exportGamesList}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download size={18} />
            Export List
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gamer-muted" size={20} />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gamer-card border-gamer-border text-gamer-text placeholder:text-gamer-muted"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === null ? "default" : "outline"}
              className="cursor-pointer transition-colors duration-fast"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer transition-colors duration-fast capitalize"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="bg-gamer-card border border-gamer-border mb-6 p-1.5 gap-2">
            <TabsTrigger
              value="popular"
              className="flex items-center gap-2 px-6 py-2.5"
            >
              <TrendingUp size={16} />
              Popular
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="px-6 py-2.5"
            >
              All Games ({filteredGames.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular">
            <GameGrid games={popularGames} gameStats={gameStats} />
            {/* Ad after popular games */}
            <InContentAd className="mt-8" />
          </TabsContent>

          <TabsContent value="all">
            <GameGrid games={filteredGames} gameStats={gameStats} />
            {/* Ad after all games */}
            <InContentAd className="mt-8" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface GameGridProps {
  games: Game[];
  gameStats?: Record<string, { playCount?: number; totalTime?: number; lastPlayed?: string }>;
}

const GameGrid: React.FC<GameGridProps> = ({ games, gameStats = {} }) => {
  if (games.length === 0) {
    return (
      <div className="text-center py-20 bg-gamer-card/30 rounded-2xl border border-gamer-border backdrop-blur-sm">
        <Gamepad2 className="mx-auto h-12 w-12 text-gamer-muted mb-4 opacity-50" />
        <p className="text-gamer-muted font-medium">No games found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 animate-in fade-in duration-500">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          playCount={gameStats[game.id]?.playCount || 0}
        />
      ))}
    </div>
  );
};

interface GameCardProps {
  game: Game;
  playCount: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, playCount }) => {
  return (
    <a
      href={`/#/games/${game.id}`}
      className="group block bg-[#1E1E24]/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 will-change-transform"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
        <img
          src={game.thumbnail || fallbackThumbnail}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-bold text-sm bg-blue-600/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Play Now
          </span>
        </div>
      </div>
      <div className="p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors text-sm">
            {game.title}
          </h3>
          {playCount > 0 && (
            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium bg-slate-800/50 px-1.5 py-0.5 rounded-md">
              <TrendingUp size={10} className="text-blue-400" />
              {playCount > 999 ? '999+' : playCount}
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider truncate">
          {game.tags.slice(0, 2).join(' • ')}
        </p>
      </div>
    </a>
  );
};
