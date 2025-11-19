import React, { createContext, useContext, useEffect, useState } from 'react';

interface RewardsContextType {
  points: number;
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean;
  purchases: string[];
  purchaseItem: (itemId: string, cost: number) => boolean;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('rewardPoints') || '0');
    }
    return 0;
  });

  const [purchases, setPurchases] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('purchases') || '[]');
    }
    return [];
  });

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rewardPoints', newPoints.toString());
      
      // Update leaderboard
      const username = localStorage.getItem('username') || 'Anonymous';
      const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '{}');
      leaderboard[username] = (leaderboard[username] || 0) + amount;
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
    return newPoints;
  };

  const spendPoints = (amount: number): boolean => {
    if (points >= amount) {
      const newPoints = points - amount;
      setPoints(newPoints);
      if (typeof window !== 'undefined') {
        localStorage.setItem('rewardPoints', newPoints.toString());
      }
      return true;
    }
    return false;
  };

  const purchaseItem = (itemId: string, cost: number): boolean => {
    if (spendPoints(cost)) {
      const newPurchases = [...purchases, itemId];
      setPurchases(newPurchases);
      if (typeof window !== 'undefined') {
        localStorage.setItem('purchases', JSON.stringify(newPurchases));
        
        // Special handling for double points
        if (itemId === 'double-points') {
          const activationDate = new Date();
          activationDate.setDate(activationDate.getDate() + 7); // 7 days from now
          localStorage.setItem('doublePointsActiveUntil', activationDate.toISOString());
        }

        // Special handling for mystery box
        if (itemId === 'mystery-box') {
          handleMysteryBox();
        }
      }
      return true;
    }
    return false;
  };

  const handleMysteryBox = () => {
    // Random rewards pool (lower cost items)
    const possibleRewards = [
      'rainbow-theme',
      'neon-theme',
      'emoji-reactions',
      'custom-cursor',
      'name-glow',
      'badge-collection',
    ];
    
    // 70% chance of getting a reward, 30% chance of bonus points
    const roll = Math.random();
    
    if (roll < 0.7) {
      // Grant a random reward
      const availableRewards = possibleRewards.filter(r => !purchases.includes(r));
      if (availableRewards.length > 0) {
        const reward = availableRewards[Math.floor(Math.random() * availableRewards.length)];
        setPurchases([...purchases, reward]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('purchases', JSON.stringify([...purchases, reward]));
        }
        return { type: 'reward', value: reward };
      }
    }
    
    // Grant bonus points
    const bonusPoints = Math.floor(Math.random() * 500) + 200; // 200-700 points
    addPoints(bonusPoints);
    return { type: 'points', value: bonusPoints };
  };

  // Sync points and purchases between tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'rewardPoints' || e.key === 'purchases') {
        setPoints(parseInt(localStorage.getItem('rewardPoints') || '0'));
        setPurchases(JSON.parse(localStorage.getItem('purchases') || '[]'));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Update leaderboard on login and when points change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const username = localStorage.getItem('username') || 'Anonymous';
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '{}');
    
    // Update current user's score in leaderboard
    if (username && points !== leaderboard[username]) {
      leaderboard[username] = points;
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
  }, [points]);

  return (
    <RewardsContext.Provider value={{ points, addPoints, spendPoints, purchases, purchaseItem }}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};
