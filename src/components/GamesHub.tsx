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
  const gameStats = prefs.settings.gameStats || {};
  
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
      `${index + 1}. ${game.title}\n   🎮 Tags: ${game.tags.join(", ")}\n   🔗 ${window.location.origin}/Anonymous-Tech-Tips/#/games/${game.id}\n`
    ).join("\n");

    const fullExport = `🎮 ARMAAN'S TECH TIPS GAMES LIST (${filteredGames.length} Games)
Generated: ${new Date().toLocaleDateString()}

${gamesList}

---
Visit Armaan's Tech Tips: ${window.location.origin}/Anonymous-Tech-Tips/
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
          <TabsList className="bg-gamer-card border-gamer-border mb-6">
            <TabsTrigger value="popular" className="data-[state=active]:bg-gamer-border data-[state=active]:text-gamer-text flex items-center gap-2">
              <TrendingUp size={16} />
              Top 10 Popular
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-gamer-border data-[state=active]:text-gamer-text">
              All Games ({filteredGames.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular">
            <GameGrid games={popularGames} showPlayCount gameStats={gameStats} />
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
  showPlayCount?: boolean;
  gameStats?: Record<string, { playCount?: number; totalTime?: number; lastPlayed?: string }>;
}

const GameGrid: React.FC<GameGridProps> = ({ games, showPlayCount, gameStats = {} }) => {
  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gamer-muted">No games found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game, index) => (
        <GameCard 
          key={game.id} 
          game={game} 
          rank={showPlayCount ? index + 1 : undefined}
          playCount={gameStats[game.id]?.playCount || 0}
          showPlayCount={showPlayCount}
        />
      ))}
    </div>
  );
};

interface GameCardProps {
  game: Game;
  rank?: number;
  playCount: number;
  showPlayCount?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, rank, playCount, showPlayCount }) => {
  return (
    <div className="group bg-gamer-card border border-gamer-border rounded-lg overflow-hidden transition-all duration-normal hover:border-gamer-accent hover:shadow-lg hover:shadow-gamer-accent/20 hover:-translate-y-1 relative">
      {/* Rank badge for top 10 */}
      {rank && (
        <div className="absolute top-2 left-2 z-10 bg-gamer-accent text-gamer-bg font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
          {rank}
        </div>
      )}
      
      <div className="aspect-video overflow-hidden bg-gamer-bg">
        <img
          src={game.thumbnail || fallbackThumbnail}
          alt={`${game.title} game thumbnail`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gamer-text group-hover:text-gamer-accent transition-colors duration-fast">
            {game.title}
          </h3>
          {showPlayCount && playCount > 0 && (
            <span className="text-xs text-gamer-muted flex items-center gap-1">
              <TrendingUp size={12} />
              {playCount} plays
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {game.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-gamer-border text-gamer-muted border-none"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <GameButton url={game.url} label="Play" gameId={game.id} />
      </div>
    </div>
  );
};
