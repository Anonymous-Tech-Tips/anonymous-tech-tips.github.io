import React from 'react';
import { useRewardEffects } from '@/hooks/useRewardEffects';
import { useProgression } from '@/contexts/ProgressionContext';
import { useUserPrefs } from '@/contexts/UserPrefsContext'; // Added for user data
import { SEO } from '@/components/SEO';
import { TopBannerAd, BottomAd } from '@/components/GoogleAd';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trophy, Zap, Clock, Crown, Settings, Share2, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { RecentlyPlayed } from '@/components/RecentlyPlayed';
import { ProfileSection } from '@/components/rewards/ProfileSection';
import { GameStats } from '@/components/rewards/GameStats';
import { ThemeEditor } from '@/components/rewards/ThemeEditor';
import { MusicPlayer } from '@/components/rewards/MusicPlayer';
import { GameCollections } from '@/components/rewards/GameCollections';
import { ActivityTimeline, AchievementShowcase } from '@/components/rewards/RewardComponents';
import { GameRequestForm } from '@/components/rewards/GameRequestForm';

const ProfilePage = () => {
  const {
    hasGameRequest,
    hasThemeEditor,
    hasGameStats,
    hasBackgroundMusic,
    hasCollections,
    hasTimeline,
    hasShowcase
  } = useRewardEffects();

  const { progress, getCurrentRank } = useProgression();
  const { prefs } = useUserPrefs();
  const navigate = useNavigate();
  const currentRank = getCurrentRank();

  return (
    <>
      <SEO title="My Sanctuary | Tech Tips" description="Your personal profile and progression." />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden font-sans pb-24">

        {/* COZY ATMOSPHERE */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 space-y-12">

          {/* 1. IDENTITY HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-end justify-between gap-8 pb-8 border-b border-border/40"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono uppercase tracking-widest text-primary">
                <Crown className="w-3 h-3" /> Level {progress.level} Member
              </div>
              <h1 className="text-5xl md:text-7xl font-serif italic font-medium text-foreground">
                {prefs.username || "Traveler"}<span className="text-primary">.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-light max-w-xl">
                Here are your stats, achievements, and rewards. You've been quite busy.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/shop')}
                className="h-12 px-8 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white shadow-lg shadow-primary/20 border-none font-bold"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Reward Shop
              </Button>
              <Button
                variant="outline"
                className="h-12 w-12 rounded-full border-border bg-card/50 hover:bg-card p-0 flex items-center justify-center"
              >
                <Share2 className="h-4 w-4 text-foreground" />
              </Button>
            </div>
          </motion.div>

          {/* 2. STATS BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rank Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-card/50 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group hover:bg-card/80 transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-2">
                <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Current Rank</div>
                <div className="text-4xl font-serif italic text-primary">{currentRank.title}</div>
                <p className="text-sm text-muted-foreground/80">Keep earning XP to reach the next tier.</p>
              </div>
            </motion.div>

            {/* Streak Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card/50 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group hover:bg-card/80 transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-2">
                <div className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Daily Streak</div>
                <div className="text-4xl font-serif italic text-accent">{prefs.settings.streakCount} Days</div>
                <p className="text-sm text-muted-foreground/80">Come back tomorrow to keep it going!</p>
              </div>
            </motion.div>

            {/* XP Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-card/50 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group hover:bg-card/80 transition-colors flex flex-col justify-center"
            >
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">XP Progress</span>
                  <span className="text-foreground">{progress.xp} / {progress.nextLevelXp}</span>
                </div>
                <ProgressBar />
              </div>
            </motion.div>
          </div>

          <TopBannerAd />

          {/* 3. MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (Content) */}
            <div className="lg:col-span-8 space-y-8">
              <section className="space-y-6">
                <h2 className="text-3xl font-serif italic text-foreground">Recently Played</h2>
                <div className="bg-card/30 rounded-[2rem] p-8 border border-white/5">
                  <RecentlyPlayed />
                </div>
              </section>

              {hasCollections && (
                <section className="space-y-6">
                  <h2 className="text-3xl font-serif italic text-foreground">Collections</h2>
                  <GameCollections />
                </section>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {hasGameStats && <GameStats />}
                {hasThemeEditor && <ThemeEditor />}
                {hasBackgroundMusic && <MusicPlayer />}
                {hasGameRequest && <GameRequestForm />}
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-card/50 rounded-[2rem] p-8 border border-white/5 space-y-6">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <h3 className="text-xl font-medium">Preferences</h3>
                </div>
                <ProfileSection />
              </div>

              {hasTimeline && (
                <div className="bg-card/50 rounded-[2rem] p-8 border border-white/5 space-y-6">
                  <h3 className="text-xl font-medium">Activity Log</h3>
                  <ActivityTimeline />
                </div>
              )}
            </div>

          </div>

          {hasShowcase && (
            <section className="py-8">
              <h2 className="text-3xl font-serif italic text-foreground mb-8">Trophy Cabinet</h2>
              <AchievementShowcase />
            </section>
          )}

          <BottomAd />

        </div>
      </div>
    </>
  );
};

export default ProfilePage;
