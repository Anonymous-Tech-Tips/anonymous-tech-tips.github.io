import React from "react";
import { Share2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const ShareBanner: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`py-3 text-center text-sm font-medium flex items-center justify-center gap-2 relative z-10 ${
        isAuthenticated
          ? "bg-gamer-card text-gamer-text border-b border-gamer-border"
          : "bg-secondary text-secondary-foreground"
      }`}
    >
      <Share2 size={16} />
      PLEASE SHARE THIS WEBSITE WITH YOUR FRIENDS
    </div>
  );
};
