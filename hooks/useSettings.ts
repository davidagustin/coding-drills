'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getSettings,
  resetSettings,
  saveSettings,
  setSetting,
  type UserSettings,
} from '@/lib/storage';

// ============================================================================
// Types
// ============================================================================

export interface UseSettingsReturn {
  /** Current settings */
  settings: UserSettings;
  /** Whether settings are loading (SSR hydration) */
  isLoading: boolean;
  /** Update multiple settings at once */
  updateSettings: (updates: Partial<UserSettings>) => void;
  /** Update a single setting */
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  /** Reset all settings to defaults */
  reset: () => void;
  /** Refresh settings from localStorage */
  refresh: () => void;
}

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_SETTINGS: UserSettings = {
  preferredDifficulty: 'mixed',
  soundEffects: true,
  timerMode: 'up',
  timerDuration: 300,
  theme: 'system',
  showHints: true,
  autoAdvance: false,
  sessionLength: 10,
};

// ============================================================================
// useSettings Hook
// ============================================================================

/**
 * Hook for managing user settings
 * Handles SSR compatibility and localStorage synchronization
 */
export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount (client-side only)
  useEffect(() => {
    try {
      const savedSettings = getSettings();
      setSettings(savedSettings);
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'coding-drills-settings') {
        try {
          const savedSettings = getSettings();
          setSettings(savedSettings);
        } catch (err) {
          console.error('Error syncing settings:', err);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || isLoading) return;

    const root = document.documentElement;
    const theme = settings.theme;

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }

    // Listen for system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.toggle('dark', e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.theme, isLoading]);

  const refresh = useCallback(() => {
    try {
      const savedSettings = getSettings();
      setSettings(savedSettings);
    } catch (err) {
      console.error('Error refreshing settings:', err);
    }
  }, []);

  const updateSettings = useCallback(
    (updates: Partial<UserSettings>) => {
      const newSettings = { ...settings, ...updates };
      saveSettings(updates);
      setSettings(newSettings);
    },
    [settings],
  );

  const updateSetting = useCallback(
    <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
      setSetting(key, value);
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const reset = useCallback(() => {
    resetSettings();
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    isLoading,
    updateSettings,
    updateSetting,
    reset,
    refresh,
  };
}

// ============================================================================
// Theme Hook
// ============================================================================

export type Theme = 'light' | 'dark' | 'system';

export interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Hook specifically for theme management
 */
export function useTheme(): UseThemeReturn {
  const { settings, updateSetting, isLoading } = useSettings();
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window === 'undefined' || isLoading) return;

    const updateResolved = () => {
      if (settings.theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(prefersDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(settings.theme);
      }
    };

    updateResolved();

    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolved();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.theme, isLoading]);

  const setTheme = useCallback(
    (theme: Theme) => {
      updateSetting('theme', theme);
    },
    [updateSetting],
  );

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  return {
    theme: settings.theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}

// ============================================================================
// Sound Hook
// ============================================================================

export interface UseSoundReturn {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (enabled: boolean) => void;
  playCorrect: () => void;
  playIncorrect: () => void;
  playComplete: () => void;
  playClick: () => void;
}

/**
 * Hook for managing sound effects
 */
export function useSound(): UseSoundReturn {
  const { settings, updateSetting } = useSettings();

  const toggle = useCallback(() => {
    updateSetting('soundEffects', !settings.soundEffects);
  }, [settings.soundEffects, updateSetting]);

  const setEnabled = useCallback(
    (enabled: boolean) => {
      updateSetting('soundEffects', enabled);
    },
    [updateSetting],
  );

  // Play sound helper (uses Web Audio API)
  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      if (!settings.soundEffects || typeof window === 'undefined') return;

      try {
        const audioContext = new (
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        )();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        // Silently fail if audio is not available
        console.debug('Audio not available:', error);
      }
    },
    [settings.soundEffects],
  );

  const playCorrect = useCallback(() => {
    playTone(800, 0.15);
    setTimeout(() => playTone(1000, 0.15), 100);
  }, [playTone]);

  const playIncorrect = useCallback(() => {
    playTone(300, 0.2, 'square');
  }, [playTone]);

  const playComplete = useCallback(() => {
    playTone(523, 0.1); // C5
    setTimeout(() => playTone(659, 0.1), 100); // E5
    setTimeout(() => playTone(784, 0.2), 200); // G5
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(600, 0.05);
  }, [playTone]);

  return {
    enabled: settings.soundEffects,
    toggle,
    setEnabled,
    playCorrect,
    playIncorrect,
    playComplete,
    playClick,
  };
}

export default useSettings;
