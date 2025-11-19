import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Music, Play, Pause, Volume2 } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export const MusicPlayer: React.FC = () => {
  const { toggleBackgroundMusic, setMusicVolume, hasBackgroundMusic } = useSoundEffects();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);

  if (!hasBackgroundMusic) return null;

  const handleToggle = () => {
    toggleBackgroundMusic();
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setMusicVolume(newVolume / 100);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Background Music
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleToggle}
          variant="outline"
          className="w-full"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Play
            </>
          )}
        </Button>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">Volume: {volume}%</span>
          </div>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};
