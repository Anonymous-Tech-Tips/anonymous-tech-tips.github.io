import React from 'react';
import { Navbar } from '@/components/Navbar';
import { ProfileSection } from '@/components/rewards/ProfileSection';
import { GameStats } from '@/components/rewards/GameStats';
import { GameRequestForm } from '@/components/rewards/GameRequestForm';
import { ThemeEditor } from '@/components/rewards/ThemeEditor';
import { MusicPlayer } from '@/components/rewards/MusicPlayer';
import { OfflineModeIndicator } from '@/components/rewards/OfflineModeIndicator';
import { useRewardEffects } from '@/hooks/useRewardEffects';
import { SEO } from '@/components/SEO';

const ProfilePage = () => {
  const { hasGameRequest, hasThemeEditor, hasGameStats, hasBackgroundMusic } = useRewardEffects();

  return (
    <>
      <SEO title="Profile | Tech Tips" description="Customize your profile and preferences" />
      <div className="min-h-screen bg-gamer-bg">
        <Navbar />
        <OfflineModeIndicator />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gamer-text mb-8">Profile & Customization</h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            <ProfileSection />
            {hasGameStats && <GameStats />}
            {hasThemeEditor && <ThemeEditor />}
            {hasBackgroundMusic && <MusicPlayer />}
            {hasGameRequest && <GameRequestForm />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
