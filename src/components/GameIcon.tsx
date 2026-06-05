import React from "react";

function gameHue(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff;
  return h % 360;
}

interface GameIconProps {
  id: string;
  title: string;
  className?: string;
}

export const GameIcon: React.FC<GameIconProps> = ({ id, title, className = "" }) => {
  const hue = gameHue(id);
  const label = id.slice(0, 2).toUpperCase();
  return (
    <div
      className={`flex items-center justify-center font-black text-white select-none ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 55% 45%), hsl(${(hue + 40) % 360} 60% 35%))`,
      }}
      aria-label={title}
    >
      {label}
    </div>
  );
};
