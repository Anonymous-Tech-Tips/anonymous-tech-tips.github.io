import { useEffect, useRef } from 'react';
import { useRewardEffects } from './useRewardEffects';
import { useUserPrefs } from '@/contexts/UserPrefsContext';

export const useAutoSave = (key: string, value: any, delay: number = 2000) => {
  const { hasAutoSave } = useRewardEffects();
  const { setSetting } = useUserPrefs();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!hasAutoSave) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to save
    timeoutRef.current = setTimeout(() => {
      const autoSaveData = JSON.parse(
        localStorage.getItem('autoSaveData') || '{}'
      );
      
      autoSaveData[key] = {
        value,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem('autoSaveData', JSON.stringify(autoSaveData));
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, key, delay, hasAutoSave]);

  const loadAutoSaved = (): any => {
    if (!hasAutoSave) return null;

    try {
      const autoSaveData = JSON.parse(
        localStorage.getItem('autoSaveData') || '{}'
      );
      return autoSaveData[key]?.value || null;
    } catch {
      return null;
    }
  };

  return { loadAutoSaved };
};
