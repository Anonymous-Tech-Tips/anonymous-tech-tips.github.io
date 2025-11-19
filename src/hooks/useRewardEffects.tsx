import { useEffect } from 'react';
import { useRewards } from '@/contexts/RewardsContext';
import { useUserPrefs } from '@/contexts/UserPrefsContext';

export const useRewardEffects = () => {
  const { purchases } = useRewards();
  const { prefs, setSetting } = useUserPrefs();

  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove(
      'theme-rainbow',
      'theme-neon',
      'theme-retro',
      'theme-ocean',
      'theme-custom',
      'dark-mode-pro-enabled',
      'particles-enabled',
      'username-glow',
      'animated-bg',
      'custom-cursor',
      'screen-shake-enabled'
    );

    // Apply only one theme at a time (priority order)
    if (purchases.includes('custom-theme-editor') && prefs.settings.customTheme) {
      document.documentElement.classList.add('theme-custom');
      // Apply custom CSS variables
      const { primary, secondary, background } = prefs.settings.customTheme;
      document.documentElement.style.setProperty('--custom-primary', primary);
      document.documentElement.style.setProperty('--custom-secondary', secondary);
      document.documentElement.style.setProperty('--custom-background', background);
    } else if (purchases.includes('rainbow-theme')) {
      document.documentElement.classList.add('theme-rainbow');
    } else if (purchases.includes('neon-theme')) {
      document.documentElement.classList.add('theme-neon');
    } else if (purchases.includes('retro-theme')) {
      document.documentElement.classList.add('theme-retro');
    } else if (purchases.includes('ocean-theme')) {
      document.documentElement.classList.add('theme-ocean');
    }
    
    // Apply dark mode pro
    if (purchases.includes('dark-mode-pro')) {
      document.documentElement.classList.add('dark-mode-pro-enabled');
    }

    // Apply particle effects
    if (purchases.includes('particle-effects')) {
      document.documentElement.classList.add('particles-enabled');
    }

    // Apply glowing username
    if (purchases.includes('name-glow')) {
      document.documentElement.classList.add('username-glow');
    }

    // Apply animated backgrounds
    if (purchases.includes('animated-backgrounds')) {
      document.documentElement.classList.add('animated-bg');
    }

    // Apply custom cursor
    if (purchases.includes('custom-cursor')) {
      document.documentElement.classList.add('custom-cursor');
    }

    // Apply screen shake
    if (purchases.includes('screen-shake')) {
      document.documentElement.classList.add('screen-shake-enabled');
    }
  }, [purchases, prefs.settings.customTheme]);

  // Helper for awarding points with double points check
  const awardPoints = (amount: number, source?: string) => {
    const doublePointsUntil = prefs.settings.doublePointsActiveUntil;
    const isDoubleActive = doublePointsUntil && new Date(doublePointsUntil) > new Date();
    
    const finalAmount = isDoubleActive ? amount * 2 : amount;
    
    // Return the amount so caller can use it
    return finalAmount;
  };

  // Check if double points is active
  const isDoublePointsActive = () => {
    const doublePointsUntil = prefs.settings.doublePointsActiveUntil;
    return doublePointsUntil && new Date(doublePointsUntil) > new Date();
  };

  // Track game play for stats
  const trackGamePlay = (gameId: string) => {
    if (!purchases.includes('game-stats')) return;

    const stats = prefs.settings.gameStats || {};
    const gameStats = stats[gameId] || { playCount: 0, totalTime: 0 };

    setSetting('gameStats', {
      ...stats,
      [gameId]: {
        playCount: gameStats.playCount + 1,
        lastPlayed: new Date().toISOString(),
        totalTime: gameStats.totalTime || 0,
      },
    });
  };

  return {
    // Premium features
    hasAdFree: purchases.includes('ad-free-experience'),
    hasPremiumGames: purchases.includes('premium-games-pack'),
    hasVIP: purchases.includes('vip-status'),
    hasDoublePoints: purchases.includes('double-points'),
    hasEarlyAccess: purchases.includes('early-access'),

    // Themes
    hasThemeEditor: purchases.includes('custom-theme-editor'),
    hasRainbowTheme: purchases.includes('rainbow-theme'),
    hasNeonTheme: purchases.includes('neon-theme'),
    hasDarkModePro: purchases.includes('dark-mode-pro'),
    hasRetroTheme: purchases.includes('retro-theme'),
    hasOceanTheme: purchases.includes('ocean-theme'),

    // Effects
    hasParticles: purchases.includes('particle-effects'),
    hasNameGlow: purchases.includes('name-glow'),
    hasAnimatedBg: purchases.includes('animated-backgrounds'),
    hasCustomCursor: purchases.includes('custom-cursor'),
    hasScreenShake: purchases.includes('screen-shake'),

    // Profile
    hasProfilePack: purchases.includes('profile-customization'),
    hasBadgeCollection: purchases.includes('badge-collection'),
    hasEmojiReactions: purchases.includes('emoji-reactions'),
    hasProfileBorder: purchases.includes('profile-border'),
    hasUsernameFont: purchases.includes('username-font'),

    // Gameplay
    hasSpeedBoost: purchases.includes('speed-boost'),
    hasUnlimitedFavorites: purchases.includes('unlimited-favorites'),
    hasGameStats: purchases.includes('game-stats'),
    hasOfflineMode: purchases.includes('offline-mode'),
    hasAutoSave: purchases.includes('auto-save'),

    // Audio
    hasSoundEffects: purchases.includes('sound-effects-pack'),
    hasBackgroundMusic: purchases.includes('background-music'),
    hasVictorySounds: purchases.includes('victory-sounds'),

    // Special
    hasGameRequest: purchases.includes('game-request'),
    hasSecretGame: purchases.includes('secret-game'),
    hasMysteryBox: purchases.includes('mystery-box'),
    hasDailyBonus: purchases.includes('daily-bonus'),

    // Helper functions
    awardPoints,
    isDoublePointsActive,
    trackGamePlay,
  };
};
