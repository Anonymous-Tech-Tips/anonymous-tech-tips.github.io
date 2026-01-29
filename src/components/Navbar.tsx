
import React, { useState, useEffect } from "react";
import { Menu, X, Command, LogOut, ChevronDown, User, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProgression } from "@/contexts/ProgressionContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { progress, getCurrentRank } = useProgression();
  const currentRank = getCurrentRank();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glass navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", isRoute: true },
    ...(isAuthenticated
      ? [
        { label: "Games", href: "/games", requiresAuth: true, isRoute: true },
        { label: "Entertainment", href: "/entertainment", requiresAuth: true, isRoute: true },
        { label: "Utilities", href: "/utilities", requiresAuth: true, isRoute: true },
      ]
      : [
        { label: "Utilities", href: "#utilities", isRoute: false },
        { label: "PC Optimizations", href: "#pc-optimizations", isRoute: false },
        { label: "Education", href: "#education", isRoute: false },
      ]
    ),
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isMenuOpen
          ? isAuthenticated
            ? "bg-black/40 backdrop-blur-xl border-b border-white/5"
            : "bg-white/80 backdrop-blur-md border-b border-slate-200"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="group relative z-50">
          <h1 className={`text-2xl md:text-3xl font-bold tracking-tighter ${isAuthenticated ? "text-white" : "text-slate-900"
            } transition-colors font-serif italic`}>
            TechTips<span className="text-blue-500">.</span>
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.requiresAuth && !isAuthenticated) return null;
            const isActive = location.pathname === link.href;

            return link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm tracking-widest uppercase font-medium relative py-1 hover:opacity-100 transition-opacity ${isAuthenticated ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"
                  } ${isActive ? (isAuthenticated ? "text-white opacity-100" : "text-slate-900") : ""}`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className={`absolute -bottom-1 left-0 right-0 h-px ${isAuthenticated ? "bg-white" : "bg-slate-900"}`}
                  />
                )}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase font-medium hover:opacity-100 transition-opacity ${isAuthenticated ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* ACTIONS & PROFILE */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true });
                  document.dispatchEvent(event);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <Command className="w-5 h-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 group outline-none">
                    <div className="text-right hidden lg:block">
                      <div className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-blue-400 transition-colors">
                        Lv.{progress.level}
                      </div>
                      <div className="text-sm font-medium text-white group-hover:underline decoration-blue-500 underline-offset-4 decoration-1">
                        {currentRank.name}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl overflow-hidden group-hover:border-blue-500/50 transition-colors">
                      {currentRank.icon}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#0A0A0A] border-white/10 text-white/80 p-2 shadow-2xl backdrop-blur-xl">
                  <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-white/40 mb-2">My Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="text-sm cursor-pointer hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white rounded-md">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/shop')} className="text-sm cursor-pointer hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white rounded-md">
                    <Sparkles className="w-4 h-4 mr-2" /> Shop
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={logout} className="text-sm cursor-pointer hover:bg-red-900/20 hover:text-red-400 focus:bg-red-900/20 focus:text-red-400 rounded-md text-red-500">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button className="rounded-full px-8 bg-slate-900 text-white hover:bg-slate-800 transition-all font-medium text-sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 ${isAuthenticated ? "text-white" : "text-slate-900"}`}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden absolute top-24 left-0 right-0 ${isAuthenticated ? "bg-black/95 text-white" : "bg-white/95 text-slate-900"
              } border-t ${isAuthenticated ? "border-white/10" : "border-slate-200"} p-6 flex flex-col gap-6 backdrop-blur-xl`}
          >
            {navLinks.map((link) => {
              if (link.requiresAuth && !isAuthenticated) return null;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold tracking-tight hover:opacity-50 transition-opacity"
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-auto pb-24 space-y-4">
              {isAuthenticated ? (
                <Button onClick={logout} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-slate-900 text-white">Login</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
