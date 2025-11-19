import React from 'react';
import { useRewardEffects } from '@/hooks/useRewardEffects';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdBanner: React.FC = () => {
  const { hasAdFree } = useRewardEffects();

  if (hasAdFree) return null;

  return (
    <div className="my-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-gamer-text mb-1">
            Support the Site
          </h3>
          <p className="text-sm text-gamer-muted mb-2">
            This site is free to use! Consider unlocking Ad-Free Experience in the Rewards Shop to remove banners like this.
          </p>
          <Link
            to="/rewards-shop"
            className="text-sm text-accent hover:underline font-medium"
          >
            Visit Rewards Shop →
          </Link>
        </div>
      </div>
    </div>
  );
};
