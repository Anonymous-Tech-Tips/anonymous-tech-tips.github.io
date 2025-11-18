import React, { useState } from "react";
import { Menu, X, Command, Coins, Gift } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "./LoginModal";
import { ShareButton } from "./ShareButton";
import { StreakBadge } from "./StreakBadge";
import { Button } from "./ui/button";

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [points, setPoints] = useState(() => parseInt(localStorage.getItem('rewardPoints') || '0'));

  // Update points when localStorage changes
  React.useEffect(() => {
    const handleStorage = () => {
      setPoints(parseInt(localStorage.getItem('rewardPoints') || '0'));
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 1000); // Check every second
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "/", isRoute: true },
    ...(isAuthenticated
      ? [
          { label: "Games", href: "/games", requiresAuth: true, isRoute: true },
          { label: "Entertainment", href: "/entertainment", requiresAuth: true, isRoute: true },
          { label: "Utilities", href: "/utilities", requiresAuth: true, isRoute: true },
          { label: "Leaderboard", href: "/leaderboard", requiresAuth: true, isRoute: true },
        ]
      : [
          { label: "Utilities", href: "#utilities", isRoute: false },
          { label: "PC Optimizations", href: "#pc-optimizations", isRoute: false },
          { label: "Education", href: "#education", isRoute: false },
        ]
    ),
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-colors duration-normal ${
        isAuthenticated 
          ? "bg-gamer-card/95 backdrop-blur-sm border-b border-gamer-border" 
          : "bg-card/95 backdrop-blur-sm border-b border-border"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className={`text-xl font-rowdies font-bold ${
                isAuthenticated ? "text-gamer-text" : "text-foreground"
              }`}>
                Tech Tips
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.requiresAuth && !isAuthenticated) return null;
                if (link.isRoute) {
                  // Special handling for Games link when on homepage in gamer mode
                  if (link.href === "/games" && isAuthenticated && location.pathname === "/") {
                    return (
                      <a
                        key={link.href}
                        href="#games"
                        onClick={(e) => {
                          e.preventDefault();
                          const targetElement = document.getElementById("games");
                          if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast ${
                          isAuthenticated
                            ? "text-gamer-muted hover:text-gamer-text hover:bg-gamer-border/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast ${
                        isAuthenticated
                          ? "text-gamer-muted hover:text-gamer-text hover:bg-gamer-border/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                } else {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          const targetId = link.href.substring(1);
                          const targetElement = document.getElementById(targetId);
                          if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast ${
                        isAuthenticated
                          ? "text-gamer-muted hover:text-gamer-text hover:bg-gamer-border/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                }
              })}
            </div>

            {/* Auth Button & Actions */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated && (
              <div className="flex items-center gap-2">
                <Link
                  to="/rewards"
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-gamer-accent/20 border border-gamer-accent/30 hover:bg-gamer-accent/30 transition-colors"
                >
                  <Gift className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-bold text-amber-400">Shop</span>
                </Link>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gamer-accent/20 border border-gamer-accent/30">
                  <Coins className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-bold text-amber-400">{points}</span>
                </div>
              </div>
            )}
              <StreakBadge />
              <Button
                variant="ghost"
                size="sm"
                className={`text-xs ${isAuthenticated ? "text-gamer-muted hover:text-gamer-text" : "text-muted-foreground"}`}
                onClick={() => {
                  const event = new KeyboardEvent("keydown", {
                    key: "k",
                    metaKey: true,
                    ctrlKey: true,
                  });
                  document.dispatchEvent(event);
                }}
              >
                <Command className="h-3 w-3 mr-1" />
                ⌘K
              </Button>
              <ShareButton />
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    logout();
                    window.location.href = "https://mail.google.com";
                  }}
                  size="sm"
                  variant="ghost"
                  className="rounded-full px-4 py-1 
                             bg-transparent border border-gamer-border 
                             text-gamer-text 
                             hover:bg-gamer-border/30 hover:text-gamer-accent
                             transition-colors"
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  onClick={() => setIsLoginOpen(true)} 
                  size="sm"
                  className={isAuthenticated ? "bg-gamer-accent hover:bg-gamer-accent/90 text-gamer-card" : ""}
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-md ${
                isAuthenticated ? "text-gamer-text" : "text-foreground"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {navLinks.map((link) => {
                if (link.requiresAuth && !isAuthenticated) return null;
                if (link.isRoute) {
                  // Special handling for Games link when on homepage in gamer mode
                  if (link.href === "/games" && isAuthenticated && location.pathname === "/") {
                    return (
                      <a
                        key={link.href}
                        href="#games"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMenuOpen(false);
                          const targetElement = document.getElementById("games");
                          if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast ${
                          isAuthenticated
                            ? "text-gamer-muted hover:text-gamer-text hover:bg-gamer-border/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast ${
                        isAuthenticated
                          ? "text-gamer-muted hover:text-gamer-text hover:bg-gamer-border/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                } else {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          setIsMenuOpen(false);
                          const targetId = link.href.substring(1);
                          const targetElement = document.getElementById(targetId);
                          if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                          }
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                      className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-fast ${
                        isAuthenticated
                          ? "text-gamer-muted hover:text-gamer-text hover:bg-gamer-border/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                }
              })}
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 text-xs ${isAuthenticated ? "text-gamer-muted" : "text-muted-foreground"}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      const event = new KeyboardEvent("keydown", {
                        key: "k",
                        metaKey: true,
                        ctrlKey: true,
                      });
                      document.dispatchEvent(event);
                    }}
                  >
                    <Command className="h-3 w-3 mr-1" />
                    ⌘K
                  </Button>
                  <ShareButton size="sm" className="flex-1" />
                </div>
                {isAuthenticated ? (
                  <Button
                    onClick={() => {
                      logout();
                      window.location.href = "https://mail.google.com";
                    }}
                    size="sm"
                    variant="ghost"
                    className="w-full rounded-full px-4 py-1 
                               bg-transparent border border-gamer-border 
                               text-gamer-text 
                               hover:bg-gamer-border/30 hover:text-gamer-accent
                               transition-colors"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setIsLoginOpen(true)} 
                    size="sm" 
                    className={`w-full ${isAuthenticated ? "bg-gamer-accent hover:bg-gamer-accent/90 text-gamer-card" : ""}`}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};
