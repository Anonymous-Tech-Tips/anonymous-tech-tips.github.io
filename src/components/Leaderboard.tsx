import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  username: string;
  points: number;
  isCurrentUser: boolean;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadLeaderboard = () => {
      try {
        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard') || '{}');
        const currentUser = localStorage.getItem('username') || 'Anonymous';
        
        const entries = Object.entries(leaderboardData)
          .map(([username, points]) => ({
            username,
            points: points as number,
            isCurrentUser: username === currentUser,
          }))
          .sort((a, b) => b.points - a.points)
          .slice(0, 10);

        setLeaderboard(entries);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
    
    // Update leaderboard when storage changes
    const handleStorage = () => loadLeaderboard();
    window.addEventListener('storage', handleStorage);
    
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Loading Leaderboard...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gamer-card border-gamer-border">
      <CardHeader className="border-b border-gamer-border">
        <CardTitle className="text-center text-gamer-text flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Top Gamers
          <Trophy className="w-6 h-6 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {leaderboard.length > 0 ? (
          <div className="divide-y divide-gamer-border">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.username}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 ${
                  entry.isCurrentUser ? 'bg-gamer-accent/10' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gamer-border flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span
                    className={`font-medium ${
                      entry.isCurrentUser ? 'text-gamer-accent' : 'text-gamer-text'
                    }`}
                  >
                    {entry.username}
                    {entry.isCurrentUser && ' (You)'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gamer-accent font-bold">
                    {entry.points.toLocaleString()}
                  </span>
                  <span className="text-gamer-muted text-sm">points</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gamer-muted">
            No leaderboard data available yet. Start earning points!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
