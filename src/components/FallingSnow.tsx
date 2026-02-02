import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

export const FallingSnow = ({ count = 20 }: { count?: number }) => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Subtle snow - just simple white dots
    const newSnowflakes: Snowflake[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 12 + Math.random() * 8,
      animationDelay: Math.random() * 8,
      size: 4 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.3,
    }));
    setSnowflakes(newSnowflakes);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            top: '-10px',
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: flake.animationDuration,
            delay: flake.animationDelay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default FallingSnow;