import React, { useEffect } from "react";
// App v2.1 - gh-pages deployment - deployment test
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { UserPrefsProvider } from "@/contexts/UserPrefsContext";
import { RewardsProvider } from "@/contexts/RewardsContext";
import { ProgressionProvider } from "@/contexts/ProgressionContext";
import { CommandPalette } from "@/components/CommandPalette";
import { CoachMarks } from "@/components/CoachMarks";
import { OfflineModeIndicator } from "@/components/rewards/OfflineModeIndicator";
import SeasonalTheme from "@/components/SeasonalTheme";
import { SeasonalEffects } from "@/components/SeasonalEffects";
import { useRewardEffects } from "@/hooks/useRewardEffects";
import "./styles/thanksgiving.css";
import { Layout } from "@/components/Layout";
import { GamerBackground } from "@/components/GamerBackground";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import { GlobalChat } from "@/components/chat/GlobalChat";

// 🔐 TEMPORARY: Generate encrypted links in console
import { encryptLink } from "@/utils/crypto";
console.log("=== ENCRYPTED LINKS GENERATOR ===");
console.log("HiAnime:", encryptLink("https://hianime.to/"));
console.log("AnimeKai:", encryptLink("https://animekai.to/"));
console.log("Miruro:", encryptLink("https://miruro.tv/"));
console.log("Cineby:", encryptLink("https://cineby.app/"));
console.log("StreamEast:", encryptLink("https://streameast.app/"));
console.log("================================");
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import UtilitiesPage from "./pages/UtilitiesPage";
import UtilityDetailPage from "./pages/UtilityDetailPage";
import OptimizationsPage from "./pages/OptimizationsPage";
import EducationPage from "./pages/EducationPage";
import LinksPage from "./pages/LinksPage";
import UpdatesPage from "./pages/UpdatesPage";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";
import RewardsShop from "./pages/RewardsShop";
import ShopPage from "./pages/ShopPage";

import ProfilePage from "./pages/ProfilePage";
import SharePage from "./pages/SharePage";
import SafeModePage from "./pages/SafeModePage";
import SEOSetupPage from "./pages/SEOSetupPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ParticleBackground } from "@/components/ParticleBackground";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Initialize reward effects (themes) at app level
  useRewardEffects();

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      // TODO: replace with your toast
      console.log('App updated. Refreshing…');
      window.location.reload();
    });
  }, []);

  // Check for pending private room invite (if not logged in)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomParam = params.get('room');
    if (!isAuthenticated && roomParam) {
      console.log("Saving pending room invite:", roomParam);
      sessionStorage.setItem('pendingRoom', roomParam);
    }
  }, [location, isAuthenticated]);

  // Global error listeners for development debugging
  useEffect(() => {
    if (import.meta.env.DEV) {
      // Global error handler
      window.addEventListener("error", (e) => {
        console.error("[Global Error]", e.error);
        console.error("Error details:", {
          message: e.message,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          stack: e.error?.stack
        });
      });

      // Unhandled promise rejection handler
      window.addEventListener("unhandledrejection", (e) => {
        console.error("[Unhandled Promise]", e.reason);
        console.error("Promise rejection details:", {
          reason: e.reason,
          promise: e.promise
        });
      });
    }
  }, []);

  return (
    <>
      <CommandPalette />
      <PWAInstallPrompt />
      <CoachMarks />
      <div className={`relative min-h-screen ${isAuthenticated ? 'gamer-mode' : ''}`}>
        {isAuthenticated && <GamerBackground />}
        <OfflineModeIndicator />
        <Routes>
          {/* Routes WITHOUT Layout (no navbar) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/safe" element={<SafeModePage />} />
          <Route path="/games/:id" element={<ProtectedRoute><GameDetailPage /></ProtectedRoute>} />
          <Route path="/utilities/:id" element={<ProtectedRoute><UtilityDetailPage /></ProtectedRoute>} />

          {/* Routes WITH Layout (navbar included) */}
          <Route element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
            <Route path="/entertainment" element={<ProtectedRoute><EntertainmentPage /></ProtectedRoute>} />
            <Route path="/utilities" element={<ProtectedRoute><UtilitiesPage /></ProtectedRoute>} />
            <Route path="/optimizations" element={<ProtectedRoute><OptimizationsPage /></ProtectedRoute>} />
            <Route path="/education" element={<ProtectedRoute><EducationPage /></ProtectedRoute>} />
            <Route path="/links" element={<ProtectedRoute><LinksPage /></ProtectedRoute>} />
            <Route path="/updates" element={<ProtectedRoute><UpdatesPage /></ProtectedRoute>} />
            <Route path="/legal" element={<ProtectedRoute><LegalPage /></ProtectedRoute>} />
            <Route path="/rewards" element={<ProtectedRoute><RewardsShop /></ProtectedRoute>} />
            <Route path="/shop" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
            <Route path="/share" element={<ProtectedRoute><SharePage /></ProtectedRoute>} />
            <Route path="/seo-setup" element={<ProtectedRoute><SEOSetupPage /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
          </Route>
        </Routes>
        <GlobalChat />
      </div>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <RewardsProvider>
            <ProgressionProvider>
              <UserPrefsProvider>
                <Toaster />
                <Sonner />
                <CommandPalette />
                <CoachMarks />
                <SeasonalTheme />
                <SeasonalEffects />
                <ParticleBackground />
                <AppContent />
              </UserPrefsProvider>
            </ProgressionProvider>
          </RewardsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
