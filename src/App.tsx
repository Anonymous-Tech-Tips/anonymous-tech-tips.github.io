import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { UserPrefsProvider } from "@/contexts/UserPrefsContext";
import { CommandPalette } from "@/components/CommandPalette";
import { CoachMarks } from "@/components/CoachMarks";
import { HiddenPumpkin } from "@/components/HiddenPumpkin";
import ThanksgivingTheme from "@/components/ThanksgivingTheme";
import "./styles/thanksgiving.css";
import Index from "./pages/Index";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import UtilitiesPage from "./pages/UtilitiesPage";
import UtilityDetailPage from "./pages/UtilityDetailPage";
import OptimizationsPage from "./pages/OptimizationsPage";
import EducationPage from "./pages/EducationPage";
import LinksPage from "./pages/LinksPage";
import UpdatesPage from "./pages/UpdatesPage";
import SettingsPage from "./pages/SettingsPage";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";

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
        <Routes>
          {/* Make home unambiguous */}
          <Route index element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GameDetailPage />} />
          <Route path="/entertainment" element={<EntertainmentPage />} />
          <Route path="/utilities" element={<UtilitiesPage />} />
          <Route path="/utilities/:id" element={<UtilityDetailPage />} />
          <Route path="/optimizations" element={<OptimizationsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/legal" element={<LegalPage />} />
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
            <CommandPalette />
            <CoachMarks />
            <HiddenPumpkin />
            <ThanksgivingTheme />
            <AppContent />
          </UserPrefsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
