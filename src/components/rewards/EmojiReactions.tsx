import React, { useState } from 'react';
import { useRewards } from '@/contexts/RewardsContext';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { toast } from 'sonner';

interface EmojiReactionsProps {
  gameId: string;
}

const emojis = ['👍', '😄', '🔥', '❤️', '⭐', '🎮'];

export const EmojiReactions: React.FC<EmojiReactionsProps> = ({ gameId }) => {
  const { purchases } = useRewards();
  const { prefs, setSetting } = useUserPrefs();
  const hasEmojiPack = purchases.includes('emoji-reactions');

  const reactions = prefs.settings.gameReactions?.[gameId] || {};

  const handleReaction = (emoji: string) => {
    if (!hasEmojiPack) {
      toast.error('Unlock Emoji Reactions in the Rewards Shop!');
      return;
    }

    const allReactions = prefs.settings.gameReactions || {};
    const gameReactions = allReactions[gameId] || {};
    const currentCount = gameReactions[emoji] || 0;

    setSetting('gameReactions', {
      ...allReactions,
      [gameId]: {
        ...gameReactions,
        [emoji]: currentCount + 1,
      },
    });

    toast.success(`${emoji} reaction added!`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {emojis.map((emoji) => {
        const count = reactions[emoji] || 0;
        return (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            disabled={!hasEmojiPack}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
              hasEmojiPack
                ? 'hover:scale-110 hover:bg-accent cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
            title={hasEmojiPack ? 'React' : 'Unlock in Rewards Shop'}
          >
            <span className="text-lg">{emoji}</span>
            {count > 0 && (
              <span className="text-xs font-medium">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
