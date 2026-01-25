'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { logError } from '@/lib/errorLogger';
import {
  clearProgress,
  type DrillResult,
  getAllProgress,
  getOverallStats,
  getProgress,
  type LanguageProgress,
  type QuizResult,
  resetStreak,
  type SessionResult,
  saveDrillSession,
  saveProgress,
  type UserProgress,
} from '@/lib/storage';

// ============================================================================
// Types
// ============================================================================

export interface UseProgressReturn {
  /** Progress data for the specified language */
  progress: LanguageProgress;
  /** Whether progress is currently loading (SSR hydration) */
  isLoading: boolean;
  /** Whether there was an error loading progress */
  error: Error | null;
  /** Save a drill result */
  saveDrill: (result: DrillResult) => void;
  /** Save a quiz result */
  saveQuiz: (result: QuizResult) => void;
  /** Save a complete session */
  saveSession: (session: Omit<SessionResult, 'id' | 'date'>) => void;
  /** Clear progress for this language */
  clear: () => void;
  /** Reset current streak to 0 */
  resetCurrentStreak: () => void;
  /** Refresh progress from localStorage */
  refresh: () => void;
  /** Computed statistics */
  stats: {
    accuracy: number;
    totalAttempted: number;
    totalCorrect: number;
    currentStreak: number;
    bestStreak: number;
    recentSessions: SessionResult[];
    quizHighScore: number;
    quizAvgAccuracy: number;
  };
}

export interface UseAllProgressReturn {
  /** All progress data */
  allProgress: UserProgress;
  /** Whether progress is currently loading */
  isLoading: boolean;
  /** List of languages with progress */
  languages: string[];
  /** Overall statistics */
  overallStats: {
    totalAttempted: number;
    totalCorrect: number;
    overallAccuracy: number;
    totalTimeSpent: number;
    languagesLearned: number;
  };
  /** Clear all progress */
  clearAll: () => void;
  /** Clear progress for a specific language */
  clearLanguage: (language: string) => void;
  /** Refresh all progress */
  refresh: () => void;
}

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_PROGRESS: LanguageProgress = {
  drillStats: {
    totalAttempted: 0,
    totalCorrect: 0,
    bestStreak: 0,
    currentStreak: 0,
    categoryStats: {},
    recentSessions: [],
  },
  quizStats: {
    highScore: 0,
    totalPlayed: 0,
    avgAccuracy: 0,
    bestStreak: 0,
    totalQuestions: 0,
    totalCorrect: 0,
  },
  lastPlayed: new Date().toISOString(),
};

const DEFAULT_OVERALL_STATS = {
  totalAttempted: 0,
  totalCorrect: 0,
  overallAccuracy: 0,
  totalTimeSpent: 0,
  languagesLearned: 0,
};

// ============================================================================
// useProgress Hook
// ============================================================================

/**
 * Hook for managing progress for a specific programming language
 * Handles SSR compatibility and localStorage synchronization
 */
export function useProgress(language: string): UseProgressReturn {
  const [progress, setProgress] = useState<LanguageProgress>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load progress on mount (client-side only)
  useEffect(() => {
    try {
      const savedProgress = getProgress(language);
      setProgress(savedProgress);
      setError(null);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Failed to load progress');
      logError(errorObj, { operation: 'loadProgress', language });
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'coding-drills-progress') {
        try {
          const savedProgress = getProgress(language);
          setProgress(savedProgress);
        } catch (err) {
          logError(err instanceof Error ? err : new Error('Error syncing progress'), {
            operation: 'syncProgress',
            language,
          });
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [language]);

  const refresh = useCallback(() => {
    try {
      const savedProgress = getProgress(language);
      setProgress(savedProgress);
      setError(null);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Failed to refresh progress');
      logError(errorObj, { operation: 'refreshProgress', language });
      setError(errorObj);
    }
  }, [language]);

  const saveDrill = useCallback(
    (result: DrillResult) => {
      saveProgress(language, 'drill', result);
      refresh();
    },
    [language, refresh],
  );

  const saveQuiz = useCallback(
    (result: QuizResult) => {
      saveProgress(language, 'quiz', result);
      refresh();
    },
    [language, refresh],
  );

  const saveSession = useCallback(
    (session: Omit<SessionResult, 'id' | 'date'>) => {
      saveDrillSession(language, session);
      refresh();
    },
    [language, refresh],
  );

  const clear = useCallback(() => {
    clearProgress(language);
    setProgress(DEFAULT_PROGRESS);
  }, [language]);

  const resetCurrentStreak = useCallback(() => {
    resetStreak(language);
    refresh();
  }, [language, refresh]);

  const stats = useMemo(() => {
    const { drillStats, quizStats } = progress;
    return {
      accuracy:
        drillStats.totalAttempted > 0 ? drillStats.totalCorrect / drillStats.totalAttempted : 0,
      totalAttempted: drillStats.totalAttempted,
      totalCorrect: drillStats.totalCorrect,
      currentStreak: drillStats.currentStreak,
      bestStreak: drillStats.bestStreak,
      recentSessions: drillStats.recentSessions,
      quizHighScore: quizStats.highScore,
      quizAvgAccuracy: quizStats.avgAccuracy,
    };
  }, [progress]);

  return {
    progress,
    isLoading,
    error,
    saveDrill,
    saveQuiz,
    saveSession,
    clear,
    resetCurrentStreak,
    refresh,
    stats,
  };
}

// ============================================================================
// useAllProgress Hook
// ============================================================================

/**
 * Hook for managing progress across all languages
 */
export function useAllProgress(): UseAllProgressReturn {
  const [allProgress, setAllProgress] = useState<UserProgress>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const progress = getAllProgress();
      setAllProgress(progress);
    } catch (err) {
      logError(err instanceof Error ? err : new Error('Error loading all progress'), {
        operation: 'loadAllProgress',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'coding-drills-progress') {
        try {
          const progress = getAllProgress();
          setAllProgress(progress);
        } catch (err) {
          logError(err instanceof Error ? err : new Error('Error syncing all progress'), {
            operation: 'syncAllProgress',
          });
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const languages = useMemo(() => Object.keys(allProgress), [allProgress]);

  const overallStats = useMemo(() => {
    if (typeof window === 'undefined') return DEFAULT_OVERALL_STATS;
    return getOverallStats();
  }, []);

  const refresh = useCallback(() => {
    try {
      const progress = getAllProgress();
      setAllProgress(progress);
    } catch (err) {
      console.error('Error refreshing all progress:', err);
    }
  }, []);

  const clearAll = useCallback(() => {
    clearProgress();
    setAllProgress({});
  }, []);

  const clearLanguage = useCallback(
    (language: string) => {
      clearProgress(language);
      refresh();
    },
    [refresh],
  );

  return {
    allProgress,
    isLoading,
    languages,
    overallStats,
    clearAll,
    clearLanguage,
    refresh,
  };
}

export default useProgress;
