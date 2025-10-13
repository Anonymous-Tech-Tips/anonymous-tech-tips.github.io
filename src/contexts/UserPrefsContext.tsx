import React, { createContext, useContext, useState, useEffect } from 'react';

interface HistoryItem {
  id: string;
  title: string;
  type: 'game' | 'utility' | 'guide';
  timestamp: string;
  playCount?: number;
  useCount?: number;
}

interface UserPrefs {
  favorites: string[];
  gameHistory: HistoryItem[];
  utilityHistory: HistoryItem[];
  settings: {
    theme: 'light' | 'dark' | 'gamer';
    reducedMotion: boolean;
    studyMode: boolean;
    soundEnabled: boolean;
    onboardingCompleted: boolean;
    streakCount: number;
    lastVisitDate?: string;
  };
}

interface UserPrefsContextType {
  prefs: UserPrefs;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToHistory: (item: Omit<HistoryItem, 'timestamp'>) => void;
  getRecentHistory: (type?: 'game' | 'utility' | 'guide', limit?: number) => HistoryItem[];
  updateSetting: <K extends keyof UserPrefs['settings']>(key: K, value: UserPrefs['settings'][K]) => void;
  resetPrefs: () => void;
}

const defaultPrefs: UserPrefs = {
  favorites: [],
  gameHistory: [],
  utilityHistory: [],
  settings: {
    theme: 'gamer',
    reducedMotion: false,
    studyMode: false,
    soundEnabled: true,
    onboardingCompleted: false,
    streakCount: 0,
    lastVisitDate: undefined
  }
};

const UserPrefsContext = createContext<UserPrefsContextType | undefined>(undefined);

export const useUserPrefs = () => {
  const context = useContext(UserPrefsContext);
  if (!context) {
    throw new Error('useUserPrefs must be used within a UserPrefsProvider');
  }
  return context;
};

interface UserPrefsProviderProps {
  children: React.ReactNode;
}

export const UserPrefsProvider: React.FC<UserPrefsProviderProps> = ({ children }) => {
  const [prefs, setPrefs] = useState<UserPrefs>(defaultPrefs);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userPrefs');
    if (saved) {
      try {
        const parsedPrefs = JSON.parse(saved);
        setPrefs(prev => ({
          ...prev,
          ...parsedPrefs,
          settings: {
            ...prev.settings,
            ...parsedPrefs.settings
          }
        }));
      } catch (error) {
        console.error('Failed to load user preferences:', error);
      }
    }

    // Update last visit date
    const today = new Date().toISOString().split('T')[0];
    setPrefs(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        lastVisitDate: today
      }
    }));

    // Calculate streak
    const lastVisit = localStorage.getItem('lastVisitDate');
    if (lastVisit && lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastVisit === yesterdayStr) {
        // Consecutive day, increment streak
        setPrefs(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            streakCount: prev.settings.streakCount + 1
          }
        }));
      } else {
        // Streak broken, reset to 1
        setPrefs(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            streakCount: 1
          }
        }));
      }
    } else if (!lastVisit) {
      // First visit, set streak to 1
      setPrefs(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          streakCount: 1
        }
      }));
    }

    localStorage.setItem('lastVisitDate', today);
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPrefs', JSON.stringify(prefs));
  }, [prefs]);

  const addFavorite = (id: string) => {
    setPrefs(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id) ? prev.favorites : [...prev.favorites, id]
    }));
  };

  const removeFavorite = (id: string) => {
    setPrefs(prev => ({
      ...prev,
      favorites: prev.favorites.filter(fav => fav !== id)
    }));
  };

  const isFavorite = (id: string) => {
    return prefs.favorites.includes(id);
  };

  const addToHistory = (item: Omit<HistoryItem, 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      timestamp: new Date().toISOString()
    };

    setPrefs(prev => {
      const historyKey = `${item.type}History` as keyof UserPrefs;
      const currentHistory = prev[historyKey] as HistoryItem[];

      // Remove existing item if it exists
      const filteredHistory = currentHistory.filter(h => h.id !== item.id);

      // Add new item to beginning
      const updatedHistory = [newItem, ...filteredHistory].slice(0, 20);

      return {
        ...prev,
        [historyKey]: updatedHistory
      };
    });
  };

  const getRecentHistory = (type?: 'game' | 'utility' | 'guide', limit = 8) => {
    if (type) {
      const historyKey = `${type}History` as keyof UserPrefs;
      return (prefs[historyKey] as HistoryItem[]).slice(0, limit);
    }

    // Combine all history types
    const allHistory = [
      ...prefs.gameHistory.map(h => ({ ...h, type: 'game' as const })),
      ...prefs.utilityHistory.map(h => ({ ...h, type: 'utility' as const }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return allHistory.slice(0, limit);
  };

  const updateSetting = <K extends keyof UserPrefs['settings']>(
    key: K,
    value: UserPrefs['settings'][K]
  ) => {
    setPrefs(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value
      }
    }));
  };

  const resetPrefs = () => {
    setPrefs(defaultPrefs);
    localStorage.removeItem('userPrefs');
    localStorage.removeItem('lastVisitDate');
  };

  const value: UserPrefsContextType = {
    prefs,
    addFavorite,
    removeFavorite,
    isFavorite,
    addToHistory,
    getRecentHistory,
    updateSetting,
    resetPrefs
  };

  return (
    <UserPrefsContext.Provider value={value}>
      {children}
    </UserPrefsContext.Provider>
  );
};
