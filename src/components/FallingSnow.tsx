import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  emoji: string;
  opacity: number;
}

export const FallingSnow = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const snowEmojis = ['❄️', '❅', '❆', '✻', '✼', '❋', '🎄', '⭐'];
    const newSnowflakes: Snowflake[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 10,
      animationDelay: Math.random() * 8,
      size: 14 + Math.random() * 20,
      emoji: snowEmojis[Math.floor(Math.random() * snowEmojis.length)],
      opacity: 0.6 + Math.random() * 0.4,
    }));
    setSnowflakes(newSnowflakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            top: '-50px',
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, Math.random() * 50 - 25],
            rotate: [0, 360],
          }}
          transition={{
            duration: flake.animationDuration,
            delay: flake.animationDelay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {flake.emoji}
        </motion.div>
      ))}
      
      {/* Twinkling stars effect */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-300"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${5 + Math.random() * 30}%`,
            fontSize: '12px',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

export default FallingSnow;
