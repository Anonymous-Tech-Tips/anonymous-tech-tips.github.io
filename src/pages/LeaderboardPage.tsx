import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Crown } from 'lucide-react';
import { useRewards } from '@/contexts/RewardsContext';
import { TopBannerAd, BottomAd } from '@/components/GoogleAd';

const LeaderboardPage: React.FC = () => {
  const { points } = useRewards();
  
  // Get leaderboard data from localStorage
  const getLeaderboardData = () => {
    if (typeof window === 'undefined') return [];
    
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard') || '{}');
    const currentUser = localStorage.getItem('username') || 'Anonymous';
    
    // Add current user if not in leaderboard
    if (!(currentUser in leaderboardData)) {
      leaderboardData[currentUser] = points;
      localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    }
    
    // Convert to array and sort
    return Object.entries(leaderboardData)
      .map(([username, points]) => ({
        username,
        points: points as number,
        isCurrentUser: username === currentUser,
      }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 50); // Top 50
  };

  const leaderboard = getLeaderboardData();
  const currentUserRank = leaderboard.findIndex(user => user.isCurrentUser) + 1;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gamer-bg">
      <TopBannerAd />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-rowdies font-bold mb-2 text-gamer-text">🏆 Leaderboard</h1>
          <p className="text-gamer-muted">Top players by points earned</p>
        </div>

        {/* Current User's Rank */}
        {currentUserRank > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gamer-text">Your Ranking</h2>
            <Card className="bg-gamer-card border-gamer-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gamer-accent/20 flex items-center justify-center text-gamer-accent font-bold">
                      {currentUserRank}
                    </div>
                    <div>
                      <div className="font-medium text-gamer-text flex items-center gap-2">
                        You
                        <span className="text-xs px-2 py-0.5 bg-gamer-accent/20 text-gamer-accent rounded-full">
                          That's you! 🎉
                        </span>
                      </div>
                      <div className="text-sm text-gamer-muted">
                        {leaderboard[currentUserRank - 1]?.points.toLocaleString()} points
                      </div>
                    </div>
                  </div>
                  <div className="text-gamer-accent font-bold">
                    {currentUserRank === 1 ? (
                      <Trophy className="w-6 h-6 text-yellow-400" />
                    ) : (
                      `#${currentUserRank}`
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Top Players */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gamer-text">Top Players</h2>
            <div className="text-sm text-gamer-muted">
              {leaderboard.length} {leaderboard.length === 1 ? 'player' : 'players'} total
            </div>
          </div>

          <div className="space-y-2">
            {leaderboard.map((user, index) => (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`bg-gamer-card border-gamer-border ${
                  user.isCurrentUser ? 'ring-2 ring-gamer-accent' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-400/20 text-yellow-400' : 
                          index === 1 ? 'bg-gray-300/20 text-gray-300' : 
                          index === 2 ? 'bg-amber-700/20 text-amber-600' : 
                          'bg-gamer-border/30 text-gamer-muted'
                        }`}>
                          {index === 0 ? <Crown className="w-5 h-5" /> : index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gamer-text">
                            {user.username}
                            {user.isCurrentUser && (
                              <span className="ml-2 text-xs px-2 py-0.5 bg-gamer-accent/20 text-gamer-accent rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gamer-muted">
                            {user.points.toLocaleString()} points
                          </div>
                        </div>
                      </div>
                      <div className="text-gamer-accent font-bold">
                        {index < 3 ? (
                          <span className={`text-lg ${
                            index === 0 ? 'text-yellow-400' : 
                            index === 1 ? 'text-gray-300' : 'text-amber-600'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </span>
                        ) : (
                          `#${index + 1}`
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BottomAd />
    </div>
  );
};

export default LeaderboardPage;
