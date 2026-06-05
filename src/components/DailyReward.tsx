import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Coins, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface DailyRewardProps {
  streakCount: number;
}

export function DailyReward({ streakCount }: DailyRewardProps) {
  const [showReward, setShowReward] = useState(false);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const lastClaim = localStorage.getItem('lastDailyReward');
    const today = new Date().toDateString();
    
    if (lastClaim !== today) {
      // Show reward after a short delay
      setTimeout(() => setShowReward(true), 2000);
    }
  }, []);

  const getRewardAmount = () => {
    if (streakCount >= 100) return 1000;
    if (streakCount >= 30) return 500;
    if (streakCount >= 7) return 200;
    return 50;
  };

  const handleClaim = () => {
    const today = new Date().toDateString();
    localStorage.setItem('lastDailyReward', today);
    
    // Store accumulated points
    const currentPoints = parseInt(localStorage.getItem('rewardPoints') || '0');
    const reward = getRewardAmount();
    const newTotal = currentPoints + reward;
    localStorage.setItem('rewardPoints', newTotal.toString());
    
    setClaimed(true);
    
    // Show success toast
    toast.success(`🎁 +${reward} points earned!`, {
      description: `Total: ${newTotal} points`,
      duration: 3000,
    });
    
    setTimeout(() => setShowReward(false), 1500);
  };

  const getRewardEmoji = () => {
    if (streakCount >= 100) return '🚀';
    if (streakCount >= 30) return '👑';
    if (streakCount >= 7) return '💎';
    return '🎁';
  };

  const getRewardText = () => {
    if (streakCount >= 100) return 'Ultimate Legend Reward!';
    if (streakCount >= 30) return 'Royal Reward!';
    if (streakCount >= 7) return 'Weekly Champion Reward!';
    return 'Daily Login Bonus!';
  };

  return (
    <AnimatePresence>
      {showReward && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card className="bg-gradient-to-br from-gamer-card to-gamer-bg border-2 border-gamer-accent p-8 max-w-md relative">
              <button
                onClick={() => setShowReward(false)}
                className="absolute top-4 right-4 text-gamer-muted hover:text-gamer-text"
              >
                <X size={20} />
              </button>

              {!claimed ? (
                <div className="text-center space-y-6">
                  <div className="text-8xl select-none">
                    {getRewardEmoji()}
                  </div>

                  <div>
                    <h2 className="text-2xl font-rowdies font-bold text-gamer-text mb-2">
                      {getRewardText()}
                    </h2>
                    <p className="text-gamer-muted">
                      Day {streakCount} Streak Reward
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-amber-400 text-2xl font-bold">
                      <Coins className="h-6 w-6" />
                      <span>+{getRewardAmount()} Points</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleClaim}
                    className="bg-gradient-to-r from-gamer-accent to-amber-500 hover:from-gamer-accent/90 hover:to-amber-500/90 text-gamer-card font-bold text-lg px-8 py-6"
                  >
                    <Gift className="mr-2" />
                    Claim Reward
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="text-6xl">✨</div>
                  <h2 className="text-2xl font-rowdies font-bold text-gamer-accent">
                    Reward Claimed!
                  </h2>
                  <p className="text-gamer-muted">
                    Come back tomorrow for another reward!
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
