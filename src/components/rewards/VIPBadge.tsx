import React from 'react';
import { Crown } from 'lucide-react';

export const VIPBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse-subtle">
      <Crown className="w-4 h-4" />
      <span className="text-xs font-bold">VIP</span>
    </div>
  );
};
