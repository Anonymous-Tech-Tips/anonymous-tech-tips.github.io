import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

// ===========================
// TYPE DEFINITIONS
// ===========================

export interface UserProgress {
  // Core Stats
  totalPoints: number;
  level: number;
  xp: number;
  rank: string;

  // Streaks & Activity
  streakCount: number;
  lastVisit: string;
  firstGameToday: boolean;

  // Session Tracking
  gamesPlayedToday: string[];
  utilitiesUsedToday: string[];
  pagesVisitedToday: string[];

  // Lifetime Stats
  uniqueGamesPlayed: string[];
  recentlyPlayed: Array<{ gameId: string; timestamp: string; gameName: string }>;
  totalGamesPlayed: number;
  featuresDiscovered: string[];

  // Milestones
  milestonesAchieved: string[];
  lastMilestoneCheck: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  icon: string;
  reward: number;
  requirement: (progress: UserProgress) => boolean;
  category: 'games' | 'streak' | 'discovery' | 'social';
}

export interface Rank {
  name: string;
  icon: string;
  minPoints: number;
  maxPoints: number;
  color: string;
}

interface ProgressionContextType {
  progress: UserProgress;

  // Point Actions
  awardPoints: (amount: number, source: string, silent?: boolean) => void;
  spendPoints: (amount: number) => boolean;

  // Purchases (unified from RewardsContext)
  purchases: string[];
  purchaseItem: (itemId: string, cost: number) => boolean;

  // Activity Tracking
  trackGamePlay: (gameId: string, gameName: string) => void;
  trackUtilityUse: (utilityId: string) => void;
  trackPageVisit: (pageId: string) => void;

  // Progression
  getCurrentRank: () => Rank;
  getNextRank: () => Rank | null;
  getXPForNextLevel: () => number;
  getLevelProgress: () => number;

  // Discovery
  getRecentlyPlayed: () => Array<{ gameId: string; timestamp: string; gameName: string }>;
  getRecommendations: (currentGameId?: string) => string[];

  // Milestones
  checkMilestones: () => void;
  getMilestones: () => Milestone[];

  // Reset (for testing)
  resetProgress: () => void;
}

// ===========================
// CONSTANTS
// ===========================

// Adjusted for better pacing: Accessible early ranks, challenging late ranks
const RANKS: Rank[] = [
  { name: 'Newbie', icon: '🎮', minPoints: 0, maxPoints: 300, color: '#94a3b8' },      // ~3-4 days
  { name: 'Gamer', icon: '🕹️', minPoints: 301, maxPoints: 1000, color: '#60a5fa' },   // ~1-2 weeks
  { name: 'Pro', icon: '🎯', minPoints: 1001, maxPoints: 3000, color: '#a78bfa' },    // ~3-4 weeks
  { name: 'Elite', icon: '💎', minPoints: 3001, maxPoints: 7000, color: '#f59e0b' },  // ~2 months
  { name: 'Legend', icon: '👑', minPoints: 7001, maxPoints: 15000, color: '#f97316' }, // ~4 months
  { name: 'Master', icon: '🚀', minPoints: 15001, maxPoints: Infinity, color: '#ef4444' }, // Ultimate goal
];

// Adjusted for better pacing: Fast early, slower mid-game, aspirational late-game
const LEVEL_XP_REQUIREMENTS = (level: number): number => {
  if (level <= 3) return 100;   // Fast start (levels 1-3)
  if (level <= 7) return 150;   // Still quick (levels 4-7)
  if (level <= 12) return 250;  // Moderate pace (levels 8-12)
  if (level <= 20) return 400;  // Mid-game grind (levels 13-20)
  if (level <= 30) return 600;  // Dedicated players (levels 21-30)
  return 1000;                  // Elite territory (31+)
};

const MILESTONES: Milestone[] = [
  {
    id: 'first_game',
    name: 'First Steps',
    description: 'Play your first game',
    icon: '🎮',
    reward: 50,
    requirement: (p) => p.uniqueGamesPlayed.length >= 1,
    category: 'games',
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Try 10 different games',
    icon: '🗺️',
    reward: 80,  // Reduced from 100
    requirement: (p) => p.uniqueGamesPlayed.length >= 10,
    category: 'games',
  },
  {
    id: 'variety_lover',
    name: 'Variety Lover',
    description: 'Play 25 unique games',
    icon: '🎨',
    reward: 200, // Reduced from 250
    requirement: (p) => p.uniqueGamesPlayed.length >= 25,
    category: 'games',
  },
  {
    id: 'game_master',
    name: 'Game Master',
    description: 'Play 50 different games',
    icon: '🏆',
    reward: 400, // Reduced from 500
    requirement: (p) => p.uniqueGamesPlayed.length >= 50,
    category: 'games',
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    reward: 150, // Reduced from 200
    requirement: (p) => p.streakCount >= 7,
    category: 'streak',
  },
  {
    id: 'month_master',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '⭐',
    reward: 400, // Reduced from 500
    requirement: (p) => p.streakCount >= 30,
    category: 'streak',
  },
  {
    id: 'century_club',
    name: 'Century Club',
    description: 'Achieve a 100-day streak',
    icon: '💯',
    reward: 800, // Reduced from 1000
    requirement: (p) => p.streakCount >= 100,
    category: 'streak',
  },
  {
    id: 'utility_user',
    name: 'Utility User',
    description: 'Try 5 different utilities',
    icon: '🔧',
    reward: 75,
    requirement: (p) => p.featuresDiscovered.filter(f => f.startsWith('utility_')).length >= 5,
    category: 'discovery',
  },
  {
    id: 'site_explorer',
    name: 'Site Explorer',
    description: 'Visit all main pages',
    icon: '🧭',
    reward: 100,
    requirement: (p) => p.pagesVisitedToday.length >= 5,
    category: 'discovery',
  },
];

// Soft caps to prevent farming
const DAILY_CAPS = {
  uniqueGamesPoints: 5,
  utilitiesPoints: 3,
  pagesPoints: 5,
};

// ===========================
// CONTEXT IMPLEMENTATION
// ===========================

const ProgressionContext = createContext<ProgressionContextType | undefined>(undefined);

const DEFAULT_PROGRESS: UserProgress = {
  totalPoints: 0,
  level: 1,
  xp: 0,
  rank: 'Newbie',
  streakCount: 0,
  lastVisit: '',
  firstGameToday: false,
  gamesPlayedToday: [],
  utilitiesUsedToday: [],
  pagesVisitedToday: [],
  uniqueGamesPlayed: [],
  recentlyPlayed: [],
  totalGamesPlayed: 0,
  featuresDiscovered: [],
  milestonesAchieved: [],
  lastMilestoneCheck: '',
};

export const ProgressionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userProgress');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Reset daily counters if new day
        const today = new Date().toDateString();
        if (parsed.lastVisit !== today) {
          return {
            ...parsed,
            gamesPlayedToday: [],
            utilitiesUsedToday: [],
            pagesVisitedToday: [],
            firstGameToday: false,
          };
        }
        return parsed;
      }
    }
    return DEFAULT_PROGRESS;
  });

  // Purchases state (unified from RewardsContext)
  const [purchases, setPurchases] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('purchases') || '[]');
    }
    return [];
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userProgress', JSON.stringify(progress));
      // Also sync legacy rewardPoints for backward compatibility (will be deprecated)
      localStorage.setItem('rewardPoints', progress.totalPoints.toString());
    }
  }, [progress]);

  // Save purchases to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('purchases', JSON.stringify(purchases));
      // Trigger storage event for other tabs/components
      window.dispatchEvent(new Event('storage'));
    }
  }, [purchases]);

  // Check for new day and update streak
  useEffect(() => {
    const today = new Date().toDateString();
    if (progress.lastVisit && progress.lastVisit !== today) {
      const lastVisitDate = new Date(progress.lastVisit);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
        // Consecutive day - increase streak
        setProgress(prev => ({
          ...prev,
          streakCount: prev.streakCount + 1,
          lastVisit: today,
        }));

        // Award daily login bonus
        const streakBonus = Math.min(Math.floor(progress.streakCount / 7) * 10, 100);
        const dailyReward = 50 + streakBonus;
        awardPoints(dailyReward, `Daily Login (Day ${progress.streakCount + 1})`, false);
      } else if (daysDiff > 1) {
        // Streak broken
        toast.error('Streak broken! Starting fresh.', {
          description: 'Visit daily to maintain your streak',
        });
        setProgress(prev => ({
          ...prev,
          streakCount: 1,
          lastVisit: today,
        }));
        awardPoints(50, 'Daily Login (New Streak)', false);
      }
    } else if (!progress.lastVisit) {
      // First ever visit
      setProgress(prev => ({
        ...prev,
        streakCount: 1,
        lastVisit: today,
      }));
      awardPoints(50, 'Welcome Bonus!', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===========================
  // CORE FUNCTIONS
  // ===========================

  const celebrateWithConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const awardPoints = (amount: number, source: string, silent: boolean = false) => {
    setProgress(prev => {
      const newTotal = prev.totalPoints + amount;
      const newXP = prev.xp + amount;
      const xpNeeded = LEVEL_XP_REQUIREMENTS(prev.level);

      let newLevel = prev.level;
      let remainingXP = newXP;

      // Check for level up
      if (remainingXP >= xpNeeded) {
        remainingXP -= xpNeeded;
        newLevel += 1;

        if (!silent) {
          setTimeout(() => {
            celebrateWithConfetti();
            toast.success(`🎉 Level Up!`, {
              description: `You reached Level ${newLevel}!`,
              duration: 4000,
            });
          }, 500);
        }
      }

      // Determine new rank
      const newRank = RANKS.find(r => newTotal >= r.minPoints && newTotal <= r.maxPoints)?.name || 'Master';

      // Check for rank up
      if (newRank !== prev.rank && !silent) {
        setTimeout(() => {
          celebrateWithConfetti();
          const rank = RANKS.find(r => r.name === newRank);
          toast.success(`${rank?.icon} Rank Up!`, {
            description: `You're now a ${newRank}!`,
            duration: 4000,
          });
        }, 1000);
      }

      if (!silent) {
        toast.success(`+${amount} points`, {
          description: source,
          duration: 2000,
        });
      }

      return {
        ...prev,
        totalPoints: newTotal,
        level: newLevel,
        xp: remainingXP,
        rank: newRank,
      };
    });
  };

  const spendPoints = (amount: number): boolean => {
    if (progress.totalPoints >= amount) {
      setProgress(prev => ({
        ...prev,
        totalPoints: prev.totalPoints - amount,
      }));
      return true;
    }
    return false;
  };

  const purchaseItem = (itemId: string, cost: number): boolean => {
    if (spendPoints(cost)) {
      const newPurchases = [...purchases, itemId];
      setPurchases(newPurchases);

      // Special handling for time-limited ad-skip tokens
      if (itemId === 'ad-skip-tokens-1hr') {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        localStorage.setItem('adSkipActiveUntil', expiryDate.toISOString());
      } else if (itemId === 'ad-skip-tokens-1day') {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24);
        localStorage.setItem('adSkipActiveUntil', expiryDate.toISOString());
      }

      return true;
    }
    return false;
  };

  const trackGamePlay = (gameId: string, gameName: string) => {
    const today = new Date().toDateString();

    setProgress(prev => {
      const isNewGame = !prev.uniqueGamesPlayed.includes(gameId);
      const isFirstToday = !prev.firstGameToday;
      const todayCount = prev.gamesPlayedToday.length;

      // Award points for first game of the day
      if (isFirstToday && todayCount < DAILY_CAPS.uniqueGamesPoints) {
        setTimeout(() => awardPoints(25, 'First game today!'), 100);
      }

      // Award points for trying new game (first time ever)
      if (isNewGame && todayCount < DAILY_CAPS.uniqueGamesPoints) {
        setTimeout(() => awardPoints(30, `Discovered: ${gameName}`), 200);
      }

      // Award variety bonus (3 different games in one session)
      if (todayCount === 2 && !prev.gamesPlayedToday.includes(gameId)) {
        setTimeout(() => awardPoints(20, 'Variety bonus!'), 300);
      }

      return {
        ...prev,
        firstGameToday: true,
        gamesPlayedToday: prev.gamesPlayedToday.includes(gameId)
          ? prev.gamesPlayedToday
          : [...prev.gamesPlayedToday, gameId],
        uniqueGamesPlayed: isNewGame
          ? [...prev.uniqueGamesPlayed, gameId]
          : prev.uniqueGamesPlayed,
        recentlyPlayed: [
          { gameId, gameName, timestamp: new Date().toISOString() },
          ...prev.recentlyPlayed.filter(g => g.gameId !== gameId).slice(0, 9),
        ],
        totalGamesPlayed: prev.totalGamesPlayed + 1,
      };
    });

    // Check milestones after state update
    setTimeout(() => checkMilestones(), 500);
  };

  const trackUtilityUse = (utilityId: string) => {
    setProgress(prev => {
      const featureKey = `utility_${utilityId}`;
      const isNew = !prev.featuresDiscovered.includes(featureKey);
      const todayCount = prev.utilitiesUsedToday.filter(u => !prev.utilitiesUsedToday.includes(u)).length;

      if (isNew && todayCount < DAILY_CAPS.utilitiesPoints) {
        setTimeout(() => awardPoints(15, 'Tried new utility!'), 100);
      }

      return {
        ...prev,
        utilitiesUsedToday: prev.utilitiesUsedToday.includes(utilityId)
          ? prev.utilitiesUsedToday
          : [...prev.utilitiesUsedToday, utilityId],
        featuresDiscovered: isNew
          ? [...prev.featuresDiscovered, featureKey]
          : prev.featuresDiscovered,
      };
    });

    setTimeout(() => checkMilestones(), 500);
  };

  const trackPageVisit = (pageId: string) => {
    setProgress(prev => {
      const featureKey = `page_${pageId}`;
      const isNew = !prev.featuresDiscovered.includes(featureKey);
      const todayCount = prev.pagesVisitedToday.filter(p => !prev.pagesVisitedToday.includes(p)).length;

      if (isNew && todayCount < DAILY_CAPS.pagesPoints) {
        setTimeout(() => awardPoints(10, 'Explored new page!'), 100);
      }

      return {
        ...prev,
        pagesVisitedToday: prev.pagesVisitedToday.includes(pageId)
          ? prev.pagesVisitedToday
          : [...prev.pagesVisitedToday, pageId],
        featuresDiscovered: isNew
          ? [...prev.featuresDiscovered, featureKey]
          : prev.featuresDiscovered,
      };
    });
  };

  const getCurrentRank = (): Rank => {
    return RANKS.find(r => progress.totalPoints >= r.minPoints && progress.totalPoints <= r.maxPoints) || RANKS[0];
  };

  const getNextRank = (): Rank | null => {
    const currentRank = getCurrentRank();
    const currentIndex = RANKS.findIndex(r => r.name === currentRank.name);
    return currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
  };

  const getXPForNextLevel = (): number => {
    return LEVEL_XP_REQUIREMENTS(progress.level);
  };

  const getLevelProgress = (): number => {
    const needed = getXPForNextLevel();
    return (progress.xp / needed) * 100;
  };

  const getRecentlyPlayed = () => {
    return progress.recentlyPlayed.slice(0, 10);
  };

  const getRecommendations = (currentGameId?: string): string[] => {
    // Simple recommendation: return games not yet played
    // In real implementation, this would use categories/tags
    return [];
  };

  const checkMilestones = () => {
    const newMilestones = MILESTONES.filter(
      m => !progress.milestonesAchieved.includes(m.id) && m.requirement(progress)
    );

    newMilestones.forEach((milestone, index) => {
      setTimeout(() => {
        celebrateWithConfetti();
        toast.success(`🏆 Milestone: ${milestone.name}`, {
          description: `+${milestone.reward} points! ${milestone.description}`,
          duration: 5000,
        });
        awardPoints(milestone.reward, `Milestone: ${milestone.name}`, true);

        setProgress(prev => ({
          ...prev,
          milestonesAchieved: [...prev.milestonesAchieved, milestone.id],
        }));
      }, index * 1000);
    });
  };

  const getMilestones = (): Milestone[] => {
    return MILESTONES;
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem('userProgress');
    toast.info('Progress reset');
  };

  return (
    <ProgressionContext.Provider
      value={{
        progress,
        awardPoints,
        spendPoints,
        purchases,
        purchaseItem,
        trackGamePlay,
        trackUtilityUse,
        trackPageVisit,
        getCurrentRank,
        getNextRank,
        getXPForNextLevel,
        getLevelProgress,
        getRecentlyPlayed,
        getRecommendations,
        checkMilestones,
        getMilestones,
        resetProgress,
      }}
    >
      {children}
    </ProgressionContext.Provider>
  );
};

export const useProgression = () => {
  const context = useContext(ProgressionContext);
  if (!context) {
    throw new Error('useProgression must be used within a ProgressionProvider');
  }
  return context;
};
