import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { BarChart3, Clock, Star } from 'lucide-react';

export const GameStats: React.FC = () => {
  const { prefs } = useUserPrefs();
  const gameStats = prefs.settings.gameStats || {};

  const sortedStats = Object.entries(gameStats)
    .sort(([, a]: any, [, b]: any) => b.playCount - a.playCount)
    .slice(0, 10);

  if (sortedStats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Game Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Start playing games to see your stats!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Top Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedStats.map(([gameId, stats]: [string, any], index) => (
            <div
              key={gameId}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-primary">
                  #{index + 1}
                </div>
                <div>
                  <div className="font-medium">{gameId}</div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {stats.playCount} plays
                    </span>
                    {stats.totalTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.round(stats.totalTime / 60)}m
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
