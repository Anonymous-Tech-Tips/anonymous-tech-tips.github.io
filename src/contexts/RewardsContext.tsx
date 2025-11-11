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
      }
      return true;
    }
    return false;
  };

  // Sync between tabs
  useEffect(() => {
    const handleStorage = () => {
      setPoints(parseInt(localStorage.getItem('rewardPoints') || '0'));
      setPurchases(JSON.parse(localStorage.getItem('purchases') || '[]'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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
