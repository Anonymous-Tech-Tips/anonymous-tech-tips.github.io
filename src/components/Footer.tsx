import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { VisitorCounter } from "./VisitorCounter";

export const Footer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className={`py-8 text-center border-t ${isAuthenticated
        ? "bg-gamer-card border-gamer-border text-gamer-muted"
        : "bg-card border-border text-muted-foreground"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isAuthenticated && (
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm mb-6">
            {[
              ['Study Techniques', 'education'],
              ['Formula Sheet', 'formulas'],
              ['Test Prep', 'test-prep'],
              ['Writing & Research', 'writing'],
              ['College & Career', 'college'],
              ['Resource Directory', 'resources'],
            ].map(([label, id]) => (
              <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:underline text-primary font-medium">
                {label}
              </button>
            ))}
          </div>
        )}
        <p className="text-sm mb-4">
          © 2026 StudyHub. Free academic tools for students — study smarter, not harder.
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
          <Link
            to="/privacy"
            className={`hover:underline ${isAuthenticated ? "text-gamer-accent" : "text-primary"}`}
          >
            🔒 Privacy Policy
          </Link>
          <a
            href="/sitemap.xml"
            target="_blank"
            className={`hover:underline ${isAuthenticated ? "text-gamer-accent" : "text-primary"}`}
          >
            🗺️ Sitemap
          </a>
        </div>
        <div className="flex justify-center">
          <VisitorCounter variant="inline" />
        </div>
      </div>
    </footer>
  );
};
