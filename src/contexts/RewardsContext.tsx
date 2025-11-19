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
    // Check for double points multiplier
    const doublePointsUntil = localStorage.getItem('doublePointsActiveUntil');
    const isDoubleActive = doublePointsUntil && new Date(doublePointsUntil) > new Date();
    
    const finalAmount = isDoubleActive ? amount * 2 : amount;
    const newPoints = points + finalAmount;
    
    setPoints(newPoints);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rewardPoints', newPoints.toString());
      
      // Update leaderboard
      const username = localStorage.getItem('username') || 'Anonymous';
      const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '{}');
      leaderboard[username] = (leaderboard[username] || 0) + finalAmount;
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

        // Trigger storage event for other tabs/components
        window.dispatchEvent(new Event('storage'));
      }
      return true;
    }
    return false;
  };

  // Sync points and purchases between tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'rewardPoints' || e.key === 'purchases') {
        setPoints(parseInt(localStorage.getItem('rewardPoints') || '0'));
        setPurchases(JSON.parse(localStorage.getItem('purchases') || '[]'));
      }
    };
    
    // Also listen to custom storage events for same-tab updates
    const handleCustomStorage = () => {
      setPoints(parseInt(localStorage.getItem('rewardPoints') || '0'));
      setPurchases(JSON.parse(localStorage.getItem('purchases') || '[]'));
    };
    
    window.addEventListener('storage', handleStorage);
    window.addEventListener('storage', handleCustomStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('storage', handleCustomStorage);
    };
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
