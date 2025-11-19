import React, { useState } from 'react';
import { useRewards } from '@/contexts/RewardsContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRewardEffects } from '@/hooks/useRewardEffects';

const rewards = [
  // === PREMIUM TIER (2000+ Points) ===
  {
    id: 'ad-free-experience',
    name: 'Ad-Free Experience',
    description: 'Remove all ads from the site permanently',
    cost: 2500,
    icon: '🚫',
    category: 'premium',
  },
  {
    id: 'premium-games-pack',
    name: 'Premium Games Collection',
    description: 'Unlock 50+ exclusive premium games',
    cost: 3000,
    icon: '🎮',
    category: 'premium',
  },
  {
    id: 'vip-status',
    name: 'VIP Status',
    description: 'Get VIP badge, priority support, and exclusive features',
    cost: 5000,
    icon: '👑',
    category: 'premium',
  },
  {
    id: 'double-points',
    name: 'Double Points Week',
    description: 'Earn 2x points on all activities for 7 days',
    cost: 2400,
    icon: '⚡',
    category: 'premium',
  },
  {
    id: 'early-access',
    name: 'Early Access Pass',
    description: 'Try new games and features before anyone else',
    cost: 2800,
    icon: '🔓',
    category: 'premium',
  },

  // === THEMES & CUSTOMIZATION (1000-2000 Points) ===
  {
    id: 'custom-theme-editor',
    name: 'Theme Editor Pro',
    description: 'Create and save unlimited custom color themes',
    cost: 1500,
    icon: '🎨',
    category: 'themes',
  },
  {
    id: 'rainbow-theme',
    name: 'Rainbow Theme',
    description: 'Unlock the vibrant rainbow color scheme',
    cost: 1200,
    icon: '🌈',
    category: 'themes',
  },
  {
    id: 'neon-theme',
    name: 'Neon Nights Theme',
    description: 'Unlock the electric neon theme with glowing effects',
    cost: 1400,
    icon: '💜',
    category: 'themes',
  },
  {
    id: 'dark-mode-pro',
    name: 'Dark Mode Pro',
    description: 'Enhanced dark mode with OLED-optimized colors',
    cost: 1000,
    icon: '🌙',
    category: 'themes',
  },
  {
    id: 'retro-theme',
    name: 'Retro Arcade Theme',
    description: 'Classic 80s arcade aesthetic',
    cost: 1100,
    icon: '👾',
    category: 'themes',
  },
  {
    id: 'ocean-theme',
    name: 'Ocean Breeze Theme',
    description: 'Calming blue ocean-inspired colors',
    cost: 900,
    icon: '🌊',
    category: 'themes',
  },

  // === VISUAL EFFECTS (800-1500 Points) ===
  {
    id: 'particle-effects',
    name: 'Particle Effects',
    description: 'Add floating particles to your screen',
    cost: 1300,
    icon: '✨',
    category: 'effects',
  },
  {
    id: 'name-glow',
    name: 'Glowing Username',
    description: 'Make your name glow with animated effects',
    cost: 800,
    icon: '✨',
    category: 'effects',
  },
  {
    id: 'animated-backgrounds',
    name: 'Animated Backgrounds',
    description: 'Unlock moving gradient backgrounds',
    cost: 1100,
    icon: '🎭',
    category: 'effects',
  },
  {
    id: 'custom-cursor',
    name: 'Custom Cursors',
    description: 'Choose from 20+ custom cursor styles',
    cost: 600,
    icon: '🖱️',
    category: 'effects',
  },
  {
    id: 'screen-shake',
    name: 'Screen Shake Effects',
    description: 'Add impact to button clicks',
    cost: 700,
    icon: '📳',
    category: 'effects',
  },

  // === PROFILE & SOCIAL (500-1500 Points) ===
  {
    id: 'profile-customization',
    name: 'Ultimate Profile Pack',
    description: 'Unlock all avatar frames, badges, and profile effects',
    cost: 2200,
    icon: '🎭',
    category: 'profile',
  },
  {
    id: 'badge-collection',
    name: 'Badge Collection Starter',
    description: 'Unlock 10 exclusive badges',
    cost: 800,
    icon: '🏅',
    category: 'profile',
  },
  {
    id: 'emoji-reactions',
    name: 'Emoji Reaction Pack',
    description: 'React to games with 50+ custom emojis',
    cost: 500,
    icon: '😄',
    category: 'profile',
  },
  {
    id: 'profile-border',
    name: 'Animated Profile Border',
    description: 'Add a glowing animated border to your profile',
    cost: 900,
    icon: '🔲',
    category: 'profile',
  },
  {
    id: 'username-font',
    name: 'Custom Username Font',
    description: 'Change your username font style',
    cost: 600,
    icon: '🔤',
    category: 'profile',
  },

  // === GAMEPLAY BOOSTERS (400-1200 Points) ===
  {
    id: 'speed-boost',
    name: 'Game Speed Boost',
    description: 'Games load 2x faster',
    cost: 1200,
    icon: '🚀',
    category: 'gameplay',
  },
  {
    id: 'unlimited-favorites',
    name: 'Unlimited Favorites',
    description: 'Remove the 50-game favorites limit',
    cost: 800,
    icon: '⭐',
    category: 'gameplay',
  },
  {
    id: 'game-stats',
    name: 'Advanced Stats Tracker',
    description: 'Detailed analytics and statistics for all your games',
    cost: 1000,
    icon: '📊',
    category: 'gameplay',
  },
  {
    id: 'offline-mode',
    name: 'Offline Gaming Mode',
    description: 'Play select games without internet',
    cost: 1500,
    icon: '📵',
    category: 'gameplay',
  },
  {
    id: 'auto-save',
    name: 'Auto-Save Progress',
    description: 'Automatically save game progress',
    cost: 700,
    icon: '💾',
    category: 'gameplay',
  },

  // === SOUND & MUSIC (300-800 Points) ===
  {
    id: 'sound-effects-pack',
    name: 'Sound Effects Pack',
    description: 'Custom sounds for buttons and actions',
    cost: 600,
    icon: '🔊',
    category: 'audio',
  },
  {
    id: 'background-music',
    name: 'Background Music Player',
    description: 'Play lofi music while gaming',
    cost: 800,
    icon: '🎵',
    category: 'audio',
  },
  {
    id: 'victory-sounds',
    name: 'Victory Sound Collection',
    description: 'Celebrate wins with epic sounds',
    cost: 400,
    icon: '🎺',
    category: 'audio',
  },

  // === SPECIAL & FUN (200-1000 Points) ===
  {
    id: 'game-request',
    name: 'Personal Game Request',
    description: 'Request any game to be added to the site',
    cost: 2000,
    icon: '🎯',
    category: 'special',
  },
  {
    id: 'secret-game',
    name: 'Secret Game Unlock',
    description: 'Unlock a hidden exclusive game',
    cost: 1500,
    icon: '🎁',
    category: 'special',
  },
  {
    id: 'mystery-box',
    name: 'Mystery Box',
    description: 'Random reward worth 500-2000 points',
    cost: 800,
    icon: '📦',
    category: 'special',
  },
  {
    id: 'daily-bonus',
    name: 'Daily Bonus Multiplier',
    description: 'Increase daily rewards by 50%',
    cost: 1000,
    icon: '🎰',
    category: 'special',
  },
];

const RewardsShop: React.FC = () => {
  const { points, purchaseItem, purchases } = useRewards();
  const rewardEffects = useRewardEffects();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handlePurchase = (itemId: string, cost: number, name: string) => {
    if (purchases.includes(itemId)) {
      toast.info('You already own this item!');
      return;
    }

    if (purchaseItem(itemId, cost)) {
      toast.success(`🎉 Purchased ${name}!`, {
        description: `Your ${name.toLowerCase()} is now active!`,
      });
      
      // Show specific activation messages
      if (itemId === 'emoji-reactions') {
        toast.info('😄 Emoji reactions are now available on all game pages!');
      } else if (itemId === 'rainbow-theme') {
        toast.info('🌈 Rainbow theme activated! Check your settings to enable it.');
      } else if (itemId === 'double-points') {
        toast.info('⚡ You now earn 2x points for the next 7 days!');
      }
    } else {
      toast.error('Not enough points!', {
        description: `You need ${cost - points} more points to buy this.`,
      });
    }
  };

  const categories = [
    { id: 'all', label: 'All Items', icon: '🎪' },
    { id: 'premium', label: 'Premium', icon: '👑' },
    { id: 'themes', label: 'Themes', icon: '🎨' },
    { id: 'effects', label: 'Effects', icon: '✨' },
    { id: 'profile', label: 'Profile', icon: '🎭' },
    { id: 'gameplay', label: 'Gameplay', icon: '🎮' },
    { id: 'audio', label: 'Audio', icon: '🔊' },
    { id: 'special', label: 'Special', icon: '🎁' },
  ];

  const filteredRewards = activeCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gamer-bg">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-rowdies font-bold mb-2 text-gamer-text">Rewards Shop 🎁</h1>
        <div className="text-2xl font-semibold text-gamer-accent flex items-center justify-center gap-2">
          <span className="text-3xl">🪙</span>
          {points} Points
        </div>
        <p className="mt-2 text-gamer-muted">
          {purchases.length} items owned • {filteredRewards.length} items available
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? 'default' : 'outline'}
            onClick={() => setActiveCategory(cat.id)}
            className="gap-2"
          >
            <span>{cat.icon}</span>
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <motion.div
            key={reward.id}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="h-full flex flex-col bg-gamer-card border-gamer-border">
              <CardHeader>
                <div className="text-4xl mb-2">{reward.icon}</div>
                <CardTitle className="text-gamer-text">{reward.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gamer-muted">{reward.description}</p>
                <p className="mt-2 text-gamer-accent font-semibold">
                  {reward.cost} Points
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handlePurchase(reward.id, reward.cost, reward.name)}
                  disabled={purchases.includes(reward.id)}
                  className={`w-full transition-all ${
                    purchases.includes(reward.id)
                      ? 'bg-accent/80 hover:bg-accent text-gamer-card cursor-default'
                      : 'bg-gamer-accent hover:bg-gamer-accent/90 text-gamer-card'
                  }`}
                >
                  {purchases.includes(reward.id) ? '✓ Owned' : 'Purchase'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RewardsShop;
