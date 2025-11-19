import React from "react";
import { openGameSandbox } from "@/utils/openGameSandbox";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const GameButton: React.FC<{ url: string; label?: string }> = ({ url, label = "Play" }) => {
  const { playClick } = useSoundEffects();
  
  const handleClick = () => {
    playClick();
    openGameSandbox(url);
  };
  
  return (
    <button
      onClick={handleClick}
      className="relative px-6 py-3 w-full uppercase font-black tracking-wider rounded-full border-4 transition-transform duration-200"
      style={{
        background: "linear-gradient(135deg,#800080,#BA55D3,#8A2BE2)",
        color: "#FFD700",
        borderColor: "#FFD700",
        boxShadow: "0 10px 30px rgba(186,85,211,.7),0 0 50px rgba(138,43,226,.8)"
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {label}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
        style={{
          backgroundImage:
            "radial-gradient(circle, transparent 20%, rgba(255,215,0,.2) 20%, rgba(255,215,0,.2) 80%, transparent 80%)",
          backgroundSize: 40,
          transform: "rotate(45deg)"
        }}
      />
    </button>
  );
};
