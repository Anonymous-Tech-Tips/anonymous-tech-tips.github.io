import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { UserPrefsProvider } from "@/contexts/UserPrefsContext";
import { RewardsProvider } from "@/contexts/RewardsContext";
import { CommandPalette } from "@/components/CommandPalette";
import { CoachMarks } from "@/components/CoachMarks";
import { OfflineModeIndicator } from "@/components/rewards/OfflineModeIndicator";
import ThanksgivingTheme from "@/components/ThanksgivingTheme";
import "./styles/thanksgiving.css";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
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
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

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
      <div className="relative min-h-screen">
        <OfflineModeIndicator />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
          <Route path="/games/:id" element={<ProtectedRoute><GameDetailPage /></ProtectedRoute>} />
          <Route path="/entertainment" element={<ProtectedRoute><EntertainmentPage /></ProtectedRoute>} />
          <Route path="/utilities" element={<ProtectedRoute><UtilitiesPage /></ProtectedRoute>} />
          <Route path="/utilities/:id" element={<ProtectedRoute><UtilityDetailPage /></ProtectedRoute>} />
          <Route path="/optimizations" element={<ProtectedRoute><OptimizationsPage /></ProtectedRoute>} />
          <Route path="/education" element={<ProtectedRoute><EducationPage /></ProtectedRoute>} />
          <Route path="/links" element={<ProtectedRoute><LinksPage /></ProtectedRoute>} />
          <Route path="/updates" element={<ProtectedRoute><UpdatesPage /></ProtectedRoute>} />
          <Route path="/legal" element={<ProtectedRoute><LegalPage /></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute><RewardsShop /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
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
          <RewardsProvider>
            <UserPrefsProvider>
              <Toaster />
              <Sonner />
              <CommandPalette />
              <CoachMarks />
              <ThanksgivingTheme />
              <AppContent />
            </UserPrefsProvider>
          </RewardsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
