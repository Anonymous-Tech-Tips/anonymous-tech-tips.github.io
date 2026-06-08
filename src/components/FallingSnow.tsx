import { useState } from 'react';
import { useUserPrefs } from '@/contexts/UserPrefsContext';

const STYLE = `@keyframes snowfall{from{transform:translateY(0)}to{transform:translateY(105vh)}}`;

export const FallingSnow = ({ count = 20 }: { count?: number }) => {
  const { prefs } = useUserPrefs();
  const [flakes] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 8,
      size: 4 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.3,
    }))
  );

  if (prefs.settings.reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      <style>{STYLE}</style>
      {flakes.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            top: '-10px',
            animation: `snowfall ${f.duration}s ${f.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default FallingSnow;
