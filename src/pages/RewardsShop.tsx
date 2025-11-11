import React from 'react';
import { useRewards } from '@/contexts/RewardsContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const rewards = [
  {
    id: 'themed-background',
    name: 'Custom Background',
    description: 'Unlock a special background theme',
    cost: 500,
    icon: '🎨',
  },
  {
    id: 'profile-badge',
    name: 'Exclusive Badge',
    description: 'Show off with a special profile badge',
    cost: 1000,
    icon: '🏆',
  },
  {
    id: 'emoji-pack',
    name: 'Emoji Pack',
    description: 'Get access to exclusive emojis',
    cost: 300,
    icon: '😎',
  },
  {
    id: 'custom-avatar',
    name: 'Custom Avatar',
    description: 'Upload a custom profile picture',
    cost: 800,
    icon: '🖼️',
  },
  {
    id: 'dark-theme',
    name: 'Dark Theme',
    description: 'Unlock a special dark theme',
    cost: 400,
    icon: '🌙',
  },
  {
    id: 'rainbow-username',
    name: 'Rainbow Username',
    description: 'Make your username colorful',
    cost: 700,
    icon: '🌈',
  },
];

const RewardsShop: React.FC = () => {
  const { points, purchaseItem, purchases } = useRewards();

  const handlePurchase = (itemId: string, cost: number, name: string) => {
    if (purchases.includes(itemId)) {
      toast.info('You already own this item!');
      return;
    }

    if (purchaseItem(itemId, cost)) {
      toast.success(`Purchased ${name}!`, {
        description: `Enjoy your new ${name.toLowerCase()}!`,
      });
    } else {
      toast.error('Not enough points!', {
        description: `You need ${cost - points} more points to buy this.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Armaan's Tech Tips Shop</h1>
        <div className="text-2xl font-semibold text-gamer-accent">
          {points} Points
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
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
                  className={`w-full ${
                    purchases.includes(reward.id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gamer-accent hover:bg-gamer-accent/90'
                  }`}
                >
                  {purchases.includes(reward.id) ? 'Owned' : 'Purchase'}
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
