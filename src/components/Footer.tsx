import React from "react";
import { Link } from "react-router-dom";
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
          © 2024 Tech Tips. Your source for games, utilities, and tech resources.
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
          <Link
            to="/legal"
            className={`hover:underline ${isAuthenticated ? "text-gamer-accent" : "text-primary"}`}
          >
            📋 Legal & Terms
          </Link>
          {isAuthenticated && (
            <Link
              to="/seo-setup"
              className="hover:underline text-gamer-accent"
            >
              🔍 SEO Setup
            </Link>
          )}
        </div>
        <div className="flex justify-center">
          <VisitorCounter variant="inline" />
        </div>
      </div>
    </footer>
  );
};
