import { useEffect, useRef } from 'react';
import { useRewardEffects } from './useRewardEffects';

// Simple sound effect system using Web Audio API
export const useSoundEffects = () => {
  const { hasSoundEffects, hasBackgroundMusic, hasVictorySounds } = useRewardEffects();
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize Audio Context for sound effects
    if (hasSoundEffects && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // Setup background music
    if (hasBackgroundMusic && !backgroundMusicRef.current) {
      // Using a free lofi music URL (you can replace with your own)
      backgroundMusicRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3');
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = 0.3;
    }

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };
  }, [hasSoundEffects, hasBackgroundMusic]);

  const playClick = () => {
    if (!hasSoundEffects || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playSuccess = () => {
    if (!hasSoundEffects || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 1200;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  };

  const playVictory = () => {
    if (!hasVictorySounds || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    
    // Play a triumphant chord
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      const startTime = ctx.currentTime + (i * 0.1);
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.5);
    });
  };

  const toggleBackgroundMusic = () => {
    if (!hasBackgroundMusic || !backgroundMusicRef.current) return;

    if (backgroundMusicRef.current.paused) {
      backgroundMusicRef.current.play().catch(e => console.log('Audio play failed:', e));
    } else {
      backgroundMusicRef.current.pause();
    }
  };

  const setMusicVolume = (volume: number) => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return {
    playClick,
    playSuccess,
    playVictory,
    toggleBackgroundMusic,
    setMusicVolume,
    hasBackgroundMusic,
  };
};
