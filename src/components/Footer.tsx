import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { VisitorCounter } from "./VisitorCounter";

export const Footer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className={`py-8 text-center border-t ${
      isAuthenticated
        ? "bg-gamer-card border-gamer-border text-gamer-muted"
        : "bg-card border-border text-muted-foreground"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm mb-4">
          © 2024 Armaan's Tech Tips. Made with ❤️ by a fellow student who loves tech!
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSceaVXrWwjj0zqMqdmPJTCxPQoq166Pe72I7pKjcChU-h1mRQ/viewform?embedded=true"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${isAuthenticated ? "text-gamer-accent" : "text-primary"}`}
          >
            📝 Suggestions
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe6wFMCXkW_U_U_GwbnyxscD2t91wP4KakVLOiKBzYnZRFfTg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${isAuthenticated ? "text-gamer-accent" : "text-primary"}`}
          >
            ⚖️ DMCA Takedown
          </a>
        </div>
        <div className="flex justify-center">
          <VisitorCounter variant="inline" />
        </div>
      </div>
    </footer>
  );
};
