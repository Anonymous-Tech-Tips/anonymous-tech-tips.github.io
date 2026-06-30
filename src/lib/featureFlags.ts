/**
 * Feature Flags Configuration
 * Centralized control for enabling/disabling features
 */

export const FEATURE_FLAGS = {
  // Ad System
  ADS_ENABLED: true, // Master switch for all ads
  ADS_ADSENSE_APPROVED: true,
  
  // Ad-Skip Rewards
  AD_SKIP_REWARDS_ENABLED: false, // Only enable when ads are approved and live
  
  // Shop Categories
  PREMIUM_SHOP_ENABLED: true, // Premium category visibility
  
  // Debug
  DEBUG_MODE: false, // Enable debug logging
} as const;

/**
 * Check if ad-skip rewards should be available
 * Only available when:
 * 1. Ads are enabled
 * 2. AdSense is approved
 * 3. Ad-skip rewards feature is enabled
 */
export const canPurchaseAdSkip = (): boolean => {
  return (
    FEATURE_FLAGS.ADS_ENABLED &&
    FEATURE_FLAGS.ADS_ADSENSE_APPROVED &&
    FEATURE_FLAGS.AD_SKIP_REWARDS_ENABLED
  );
};

/**
 * Check if ads should be shown to user
 * Returns false if user has active ad-skip token
 */
export const shouldShowAds = (): boolean => {
  if (!FEATURE_FLAGS.ADS_ENABLED) return false;
  
  // Check for active ad-skip token
  const adSkipUntil = localStorage.getItem('adSkipActiveUntil');
  if (adSkipUntil) {
    const expiryDate = new Date(adSkipUntil);
    if (expiryDate > new Date()) {
      return false; // Ad-skip is active
    } else {
      // Token expired, clean up
      localStorage.removeItem('adSkipActiveUntil');
    }
  }
  
  return true;
};

/**
 * Get remaining time for ad-skip token
 * Returns null if no active token
 */
export const getAdSkipTimeRemaining = (): number | null => {
  const adSkipUntil = localStorage.getItem('adSkipActiveUntil');
  if (!adSkipUntil) return null;
  
  const expiryDate = new Date(adSkipUntil);
  const now = new Date();
  
  if (expiryDate > now) {
    return Math.floor((expiryDate.getTime() - now.getTime()) / 1000); // seconds
  }
  
  return null;
};

/**
 * Format time remaining for display
 */
export const formatTimeRemaining = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
};
