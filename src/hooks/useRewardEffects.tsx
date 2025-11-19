import { useEffect } from 'react';
import { useRewards } from '@/contexts/RewardsContext';
import { useUserPrefs } from '@/contexts/UserPrefsContext';

export const useRewardEffects = () => {
  const { purchases } = useRewards();
  const { prefs, setSetting } = useUserPrefs();

  useEffect(() => {
    // Apply theme customizations
    if (purchases.includes('dark-mode-pro')) {
      document.documentElement.classList.add('dark-mode-enabled');
    }
    
    // Apply rainbow theme
    if (purchases.includes('rainbow-theme')) {
      document.documentElement.classList.add('rainbow-theme');
    }
    
    // Apply neon theme
    if (purchases.includes('neon-theme')) {
      document.documentElement.classList.add('neon-theme');
    }

    // Apply particle effects
    if (purchases.includes('particle-effects')) {
      document.documentElement.classList.add('particles-enabled');
    }

    // Apply glowing username
    if (purchases.includes('name-glow')) {
      document.documentElement.classList.add('username-glow');
    }
  }, [purchases]);

  return {
    hasAdFree: purchases.includes('ad-free-experience'),
    hasPremiumGames: purchases.includes('premium-games-pack'),
    hasVIP: purchases.includes('vip-status'),
    hasThemeEditor: purchases.includes('custom-theme-editor'),
    hasDoublePoints: purchases.includes('double-points'),
    hasNameGlow: purchases.includes('name-glow'),
    hasEarlyAccess: purchases.includes('early-access'),
    hasProfilePack: purchases.includes('profile-customization'),
    hasGameStats: purchases.includes('game-stats'),
    hasParticles: purchases.includes('particle-effects'),
    hasRainbowTheme: purchases.includes('rainbow-theme'),
    hasNeonTheme: purchases.includes('neon-theme'),
    hasDarkModePro: purchases.includes('dark-mode-pro'),
    hasSoundEffects: purchases.includes('sound-effects-pack'),
    hasUnlimitedFavorites: purchases.includes('unlimited-favorites'),
    hasCustomCursor: purchases.includes('custom-cursor'),
    hasAnimatedBg: purchases.includes('animated-backgrounds'),
    hasEmojiPack: purchases.includes('emoji-reactions'),
    hasBadgeCollection: purchases.includes('badge-collection'),
    hasSpeedBoost: purchases.includes('speed-boost'),
  };
};
