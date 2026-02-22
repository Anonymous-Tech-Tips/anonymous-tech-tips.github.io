import React, { useEffect, lazy, Suspense } from "react";
// App v2.2 - perf: route-level code splitting + removed prod console.log
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
import { GlobalChat } from "@/components/chat/GlobalChat";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ParticleBackground } from "@/components/ParticleBackground";

// ── Lazy-loaded routes (route-level code splitting) ────────────────────────
// Each page is a separate chunk fetched only when the user navigates to it.
const Index = lazy(() => import("./pages/Index"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const GamesPage = lazy(() => import("./pages/GamesPage"));
const GameDetailPage = lazy(() => import("./pages/GameDetailPage"));
const EntertainmentPage = lazy(() => import("./pages/EntertainmentPage"));
const UtilitiesPage = lazy(() => import("./pages/UtilitiesPage"));
const UtilityDetailPage = lazy(() => import("./pages/UtilityDetailPage"));
const OptimizationsPage = lazy(() => import("./pages/OptimizationsPage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));
const LinksPage = lazy(() => import("./pages/LinksPage"));
const UpdatesPage = lazy(() => import("./pages/UpdatesPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RewardsShop = lazy(() => import("./pages/RewardsShop"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SharePage = lazy(() => import("./pages/SharePage"));
const SafeModePage = lazy(() => import("./pages/SafeModePage"));
const SEOSetupPage = lazy(() => import("./pages/SEOSetupPage"));

// Minimal spinner shown while a lazy chunk loads
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Initialize reward effects (themes) at app level
  useRewardEffects();

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }, []);

  // Check for pending private room invite (if not logged in)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomParam = params.get('room');
    if (!isAuthenticated && roomParam) {
      sessionStorage.setItem('pendingRoom', roomParam);
    }
  }, [location, isAuthenticated]);

  // Global error listeners (dev only)
  useEffect(() => {
    if (import.meta.env.DEV) {
      window.addEventListener("error", (e) => console.error("[Global Error]", e.error));
      window.addEventListener("unhandledrejection", (e) => console.error("[Unhandled Promise]", e.reason));
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
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
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
