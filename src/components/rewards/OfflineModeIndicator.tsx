import React, { useState, useEffect } from 'react';
import { useRewardEffects } from '@/hooks/useRewardEffects';
import { Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

export const OfflineModeIndicator: React.FC = () => {
  const { hasOfflineMode } = useRewardEffects();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (hasOfflineMode) {
        toast.success('Back online! 🌐');
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (hasOfflineMode) {
        toast.info('Offline mode active - cached content available 📵');
      } else {
        toast.error('Connection lost - some features may not work');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [hasOfflineMode]);

  if (!hasOfflineMode) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg ${
        isOnline 
          ? 'bg-green-500/90 text-white' 
          : 'bg-orange-500/90 text-white'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-medium">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">Offline Mode</span>
          </>
        )}
      </div>
    </div>
  );
};
