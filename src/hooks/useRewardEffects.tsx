import { useEffect } from 'react';
import { useRewards } from '@/contexts/RewardsContext';
import { useUserPrefs } from '@/contexts/UserPrefsContext';

export const useRewardEffects = () => {
  const { purchases } = useRewards();
  const { prefs, setSetting } = useUserPrefs();
  
  const activeTheme = prefs.settings.activeTheme;

  useEffect(() => {
    // Remove all purchased theme classes first
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

    // Only apply theme if user has purchased it AND has it enabled
    if (activeTheme && purchases.includes(activeTheme)) {
      // Remove seasonal themes from body when a purchased theme is active
      document.body.classList.remove(
        'thanksgiving-theme',
        'christmas-theme',
        'halloween-theme',
        'valentines-theme'
      );
      
      switch (activeTheme) {
        case 'dark-mode-pro':
          document.documentElement.classList.add('dark-mode-pro-enabled');
          break;
        case 'rainbow-theme':
          document.documentElement.classList.add('theme-rainbow');
          break;
        case 'neon-theme':
          document.documentElement.classList.add('theme-neon');
          break;
        case 'retro-theme':
          document.documentElement.classList.add('theme-retro');
          break;
        case 'ocean-theme':
          document.documentElement.classList.add('theme-ocean');
          break;
        case 'custom-theme-editor':
          if (prefs.settings.customTheme) {
            document.documentElement.classList.add('theme-custom');
            const { primary, secondary, background } = prefs.settings.customTheme;
            document.documentElement.style.setProperty('--custom-primary', primary);
            document.documentElement.style.setProperty('--custom-secondary', secondary);
            document.documentElement.style.setProperty('--custom-background', background);
          }
          break;
      }
    }
  }, [purchases, activeTheme, prefs.settings.customTheme]);

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

    // Themes - check if purchased AND enabled
    hasThemeEditor: activeTheme === 'custom-theme-editor' && purchases.includes('custom-theme-editor'),
    hasRainbowTheme: activeTheme === 'rainbow-theme' && purchases.includes('rainbow-theme'),
    hasNeonTheme: activeTheme === 'neon-theme' && purchases.includes('neon-theme'),
    hasDarkModePro: activeTheme === 'dark-mode-pro' && purchases.includes('dark-mode-pro'),
    hasRetroTheme: activeTheme === 'retro-theme' && purchases.includes('retro-theme'),
    hasOceanTheme: activeTheme === 'ocean-theme' && purchases.includes('ocean-theme'),

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