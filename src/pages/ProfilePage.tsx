import React from 'react';
import { ProfileSection } from '@/components/rewards/ProfileSection';
import { GameStats } from '@/components/rewards/GameStats';
import { GameRequestForm } from '@/components/rewards/GameRequestForm';
import { ThemeEditor } from '@/components/rewards/ThemeEditor';
import { MusicPlayer } from '@/components/rewards/MusicPlayer';
import { OfflineModeIndicator } from '@/components/rewards/OfflineModeIndicator';
import { GameCollections } from '@/components/rewards/GameCollections';
import { ActivityTimeline, AchievementShowcase } from '@/components/rewards/RewardComponents';
import { ProgressBar } from '@/components/ProgressBar';
import { RecentlyPlayed } from '@/components/RecentlyPlayed';
import { useRewardEffects } from '@/hooks/useRewardEffects';
import { useProgression } from '@/contexts/ProgressionContext';
import { SEO } from '@/components/SEO';
import { TopBannerAd, BottomAd } from '@/components/GoogleAd';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

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
  const { progress } = useProgression();
  const navigate = useNavigate();

  return (
    <>
      <SEO title="Profile | Tech Tips" description="Customize your profile and preferences" />
      <div className="min-h-screen bg-gamer-bg">
        <TopBannerAd />
        <OfflineModeIndicator />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gamer-text">Profile & Progress</h1>
            <Button
              onClick={() => navigate('/shop')}
              className="bg-gamer-accent hover:bg-gamer-accent/90 text-gamer-card"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Visit Shop
            </Button>
          </div>

          <div className="space-y-6">
            {/* Progression Overview */}
            <ProgressBar />

            <div className="grid gap-6 md:grid-cols-2">
              {/* Recently Played Games */}
              <RecentlyPlayed />

              {/* Profile Customization */}
              <ProfileSection />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {hasGameStats && <GameStats />}
              {hasThemeEditor && <ThemeEditor />}
              {hasBackgroundMusic && <MusicPlayer />}
              {hasGameRequest && <GameRequestForm />}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {hasCollections && <GameCollections />}
              {hasTimeline && <ActivityTimeline />}
            </div>

            {hasShowcase && <AchievementShowcase />}
          </div>
          <BottomAd />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
