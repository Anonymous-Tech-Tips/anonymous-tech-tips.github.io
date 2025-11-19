import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRewards } from '@/contexts/RewardsContext';
import { useUserPrefs } from '@/contexts/UserPrefsContext';
import { User, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const badges = [
  { id: 'early-adopter', name: 'Early Adopter', icon: '🏆' },
  { id: 'game-master', name: 'Game Master', icon: '🎮' },
  { id: 'streak-champion', name: 'Streak Champion', icon: '🔥' },
  { id: 'point-collector', name: 'Point Collector', icon: '💎' },
  { id: 'premium-user', name: 'Premium User', icon: '⭐' },
  { id: 'explorer', name: 'Explorer', icon: '🗺️' },
  { id: 'achiever', name: 'Achiever', icon: '🏅' },
  { id: 'legend', name: 'Legend', icon: '👑' },
  { id: 'collector', name: 'Collector', icon: '📚' },
  { id: 'veteran', name: 'Veteran', icon: '🎖️' },
];

const borderStyles = [
  { id: 'none', name: 'None', class: '' },
  { id: 'gradient', name: 'Gradient', class: 'border-4 border-gradient-to-r from-primary to-accent' },
  { id: 'glow', name: 'Glow', class: 'shadow-[0_0_20px_rgba(255,107,53,0.5)]' },
  { id: 'animated', name: 'Animated', class: 'animate-pulse-subtle border-4 border-accent' },
];

const fontStyles = [
  { id: 'default', name: 'Default', class: 'font-sans' },
  { id: 'pixel', name: 'Pixel', class: 'font-mono' },
  { id: 'handwritten', name: 'Handwritten', class: 'font-serif italic' },
];

export const ProfileSection: React.FC = () => {
  const { purchases } = useRewards();
  const { prefs, setSetting } = useUserPrefs();
  
  const hasProfilePack = purchases.includes('profile-customization');
  const hasBadges = purchases.includes('badge-collection');
  const hasProfileBorder = purchases.includes('profile-border');
  const hasUsernameFont = purchases.includes('username-font');
  
  const [selectedBorder, setSelectedBorder] = useState(prefs.settings.profileBorder || 'none');
  const [selectedFont, setSelectedFont] = useState(prefs.settings.usernameFont || 'default');

  const handleBorderChange = (value: string) => {
    if (!hasProfilePack && !hasProfileBorder) return;
    setSelectedBorder(value);
    setSetting('profileBorder', value);
  };

  const handleFontChange = (value: string) => {
    if (!hasProfilePack && !hasUsernameFont) return;
    setSelectedFont(value);
    setSetting('usernameFont', value);
  };

  const currentBorderClass = borderStyles.find(b => b.id === selectedBorder)?.class || '';
  const currentFontClass = fontStyles.find(f => f.id === selectedFont)?.class || '';

  return (
    <Card className={`${currentBorderClass} transition-all duration-300`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${currentFontClass}`}>
            Player
          </div>
        </div>

        {hasBadges && (
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4" />
              Badge Collection
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  title={badge.name}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-xs text-center">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Label>Profile Border</Label>
            <Select
              value={selectedBorder}
              onValueChange={handleBorderChange}
              disabled={!hasProfilePack && !hasProfileBorder}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {borderStyles.map((style) => (
                  <SelectItem key={style.id} value={style.id}>
                    {style.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!hasProfilePack && !hasProfileBorder && (
              <p className="text-xs text-muted-foreground mt-1">
                Unlock in Rewards Shop
              </p>
            )}
          </div>

          <div>
            <Label>Username Font</Label>
            <Select
              value={selectedFont}
              onValueChange={handleFontChange}
              disabled={!hasProfilePack && !hasUsernameFont}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontStyles.map((font) => (
                  <SelectItem key={font.id} value={font.id}>
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!hasProfilePack && !hasUsernameFont && (
              <p className="text-xs text-muted-foreground mt-1">
                Unlock in Rewards Shop
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
