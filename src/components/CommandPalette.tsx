import React, { useEffect, useState } from "react";
import { FastSearch } from "./FastSearch";

export const CommandPalette: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowSearch(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <FastSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
  );
};
