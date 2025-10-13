import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import GamesPage from "./pages/GamesPage";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { UserPrefsProvider } from "@/contexts/UserPrefsContext";
import { CommandPalette } from "@/components/CommandPalette";
import { CoachMarks } from "@/components/CoachMarks";
import GameDetailPage from "./pages/GameDetailPage";
import UtilitiesPage from "./pages/UtilitiesPage";
import UtilityDetailPage from "./pages/UtilityDetailPage";
import OptimizationsPage from "./pages/OptimizationsPage";
import EducationPage from "./pages/EducationPage";
import LinksPage from "./pages/LinksPage";
import UpdatesPage from "./pages/UpdatesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // If authenticated and on homepage, go to Gmail
        if (isAuthenticated && location.pathname === "/") {
          window.location.href = "https://mail.google.com";
        } else {
          // Otherwise go to Schoology
          window.location.href = "https://learn.lcps.org/home#/?_k=ozown1";
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAuthenticated, location.pathname]);

  return (
    <>
      <CommandPalette />
      <PWAInstallPrompt />
      <CoachMarks />
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:slug" element={<GameDetailPage />} />
          <Route path="/utilities" element={<UtilitiesPage />} />
          <Route path="/utilities/:slug" element={<UtilityDetailPage />} />
          <Route path="/optimizations" element={<OptimizationsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <UserPrefsProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </UserPrefsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
