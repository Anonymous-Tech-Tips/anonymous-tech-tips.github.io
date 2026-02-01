import { useEffect } from 'react';
import { useProgression } from '@/contexts/ProgressionContext';
import { useUserPrefs } from '@/contexts/UserPrefsContext';

export const useRewardEffects = () => {
  const { purchases } = useProgression();
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
    hasDoublePoints: purchases.includes('double-points') || purchases.includes('vip-status'),
    hasEarlyAccess: purchases.includes('early-access') || purchases.includes('vip-status'),

    // Themes - check if purchased AND enabled (VIP gets all access but needs to enable)
    hasThemeEditor: (activeTheme === 'custom-theme-editor' && purchases.includes('custom-theme-editor')) || purchases.includes('vip-status'),
    hasRainbowTheme: (activeTheme === 'rainbow-theme' && purchases.includes('rainbow-theme')) || (purchases.includes('vip-status') && activeTheme === 'rainbow-theme'),

    // Effects (VIP gets all)
    hasParticles: purchases.includes('particle-effects') || purchases.includes('vip-status'),
    hasNameGlow: purchases.includes('name-glow') || purchases.includes('vip-status'),
    hasAnimatedBg: purchases.includes('animated-backgrounds') || purchases.includes('vip-status'),
    hasCustomCursor: purchases.includes('custom-cursor') || purchases.includes('vip-status'),
    hasScreenShake: purchases.includes('screen-shake') || purchases.includes('vip-status'),

    // Profile (VIP gets all)
    hasProfilePack: purchases.includes('profile-customization') || purchases.includes('vip-status'),
    hasBadgeCollection: purchases.includes('badge-collection') || purchases.includes('vip-status'),
    hasEmojiReactions: purchases.includes('emoji-reactions') || purchases.includes('vip-status'),
    hasProfileBorder: purchases.includes('profile-border') || purchases.includes('vip-status'),
    hasUsernameFont: purchases.includes('username-font') || purchases.includes('vip-status'),
    hasCustomTitle: purchases.includes('custom-title') || purchases.includes('vip-status'),
    hasShowcase: purchases.includes('achievement-showcase') || purchases.includes('vip-status'),
    hasTimeline: purchases.includes('activity-timeline') || purchases.includes('vip-status'),
    hasCollections: purchases.includes('game-collections') || purchases.includes('vip-status'),
    hasDeveloperSupporter: purchases.includes('developer-supporter'), // VIP doesn't auto-unlock this specific badge usually, but let's leave independent unless specified

    // Gameplay (VIP gets all)
    hasSpeedBoost: purchases.includes('speed-boost') || purchases.includes('vip-status'),
    hasUnlimitedFavorites: purchases.includes('unlimited-favorites') || purchases.includes('vip-status'),
    hasGameStats: purchases.includes('game-stats') || purchases.includes('vip-status'),
    hasOfflineMode: purchases.includes('offline-mode') || purchases.includes('vip-status'),
    hasAutoSave: purchases.includes('auto-save') || purchases.includes('vip-status'),
    hasGameNotes: purchases.includes('game-notes') || purchases.includes('vip-status'),

    // Discovery
    hasAdvancedSearch: purchases.includes('advanced-search') || purchases.includes('vip-status'),
    hasTrends: purchases.includes('trending-insights') || purchases.includes('vip-status'),
    hasSmartRecs: purchases.includes('smart-recommendations') || purchases.includes('vip-status'),
    hasDiscoveryFeed: purchases.includes('discovery-feed') || purchases.includes('vip-status'),
    hasQuickLaunch: purchases.includes('quick-launch-slots') || purchases.includes('vip-status'),
    hasExclusiveGames: purchases.includes('exclusive-games-pack') || purchases.includes('vip-status'),

    // Audio (VIP gets all)
    hasSoundEffects: purchases.includes('sound-effects-pack') || purchases.includes('vip-status'),
    hasBackgroundMusic: purchases.includes('background-music') || purchases.includes('vip-status'),
    hasVictorySounds: purchases.includes('victory-sounds') || purchases.includes('vip-status'),

    // Special
    hasGameRequest: purchases.includes('game-request') || purchases.includes('vip-status'),
    hasSecretGame: purchases.includes('secret-game') || purchases.includes('vip-status'),
    hasMysteryBox: purchases.includes('mystery-box'),
    hasDailyBonus: purchases.includes('daily-bonus'),

    // Helper functions
    awardPoints,
    isDoublePointsActive,
    trackGamePlay,
  };
};