import React, { useState } from "react";
import { Menu, X, Command, Coins, Gift, LogOut, Sparkles, TrendingUp, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProgression } from "@/contexts/ProgressionContext";
import { ShareButton } from "./ShareButton";
import { StreakBadge } from "./StreakBadge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { progress, getCurrentRank, getLevelProgress, getNextRank } = useProgression();

  const currentRank = getCurrentRank();
  const nextRank = getNextRank();

  const navLinks = [
    { label: "Home", href: "/", isRoute: true },
    ...(isAuthenticated
      ? [
          { label: "Games", href: "/games", requiresAuth: true, isRoute: true },
          { label: "Entertainment", href: "/entertainment", requiresAuth: true, isRoute: true },
          { label: "Utilities", href: "/utilities", requiresAuth: true, isRoute: true },
          // Education removed from authenticated navbar
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
                TechTips
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && (
                <>
                  {/* Single Primary Indicator with Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gamer-card/80 border border-gamer-border hover:bg-gamer-card transition-colors"
                        title="View progression details"
                      >
                        <span className="text-xl">{currentRank.icon}</span>
                        <div className="flex flex-col items-start">
                          <span className="text-xs text-gamer-muted leading-none">Lv.{progress.level}</span>
                          <span className="text-sm font-semibold text-gamer-text leading-tight">{currentRank.name}</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gamer-muted ml-1" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72 bg-gamer-card border-gamer-border">
                      <DropdownMenuLabel className="text-gamer-text">Your Progress</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gamer-border" />
                      
                      {/* Points */}
                      <div className="px-2 py-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gamer-muted flex items-center gap-1">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            Points
                          </span>
                          <span className="text-sm font-bold text-gamer-text">{progress.totalPoints.toLocaleString()}</span>
                        </div>
                        
                        {/* Level Progress */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gamer-muted">Level Progress</span>
                            <span className="text-xs text-gamer-muted">{Math.round(getLevelProgress())}%</span>
                          </div>
                          <div className="w-full h-2 bg-gamer-bg rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-gamer-accent to-amber-500 transition-all duration-300"
                              style={{ width: `${getLevelProgress()}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Streak */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gamer-muted flex items-center gap-1">
                            <span>🔥</span>
                            Streak
                          </span>
                          <span className="text-sm font-bold text-gamer-text">{progress.streakCount} days</span>
                        </div>
                        
                        {/* Next Rank */}
                        {nextRank && (
                          <div className="flex items-center justify-between pt-2 border-t border-gamer-border">
                            <span className="text-xs text-gamer-muted">Next Rank</span>
                            <span className="text-sm font-semibold text-gamer-text">{nextRank.icon} {nextRank.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <DropdownMenuSeparator className="bg-gamer-border" />
                      
                      <DropdownMenuItem 
                        onClick={() => navigate('/profile')}
                        className="text-gamer-text hover:bg-gamer-bg cursor-pointer"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View Full Stats
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => navigate('/shop')}
                        className="text-gamer-text hover:bg-gamer-bg cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Visit Shop
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
              {navLinks.map((link) => {
                if (link.requiresAuth && !isAuthenticated) return null;
                if (link.isRoute) {
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
                  onClick={async () => {
                    await logout();
                    navigate("/");
                  }}
                  size="sm"
                  variant="ghost"
                  className="rounded-full px-4 py-1 
                             bg-transparent border border-gamer-border 
                             text-gamer-text 
                             hover:bg-gamer-border/30 hover:text-gamer-accent
                             transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate("/login")} 
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
                    onClick={async () => {
                      await logout();
                      navigate("/");
                    }}
                    size="sm"
                    variant="ghost"
                    className="w-full rounded-full px-4 py-1 
                               bg-transparent border border-gamer-border 
                               text-gamer-text 
                               hover:bg-gamer-border/30 hover:text-gamer-accent
                               transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate("/login")} 
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
    </>
  );
};
