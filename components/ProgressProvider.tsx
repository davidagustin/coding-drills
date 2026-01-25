'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { LanguageId } from '@/lib/types';

// ============================================================================
// Types
// ============================================================================

export interface DrillStats {
  totalAttempted: number;
  totalCorrect: number;
  bestStreak: number;
  currentStreak: number;
  categoryStats: Record<string, CategoryStat>;
  lastPlayed?: string;
}

export interface CategoryStat {
  attempted: number;
  correct: number;
  lastAttempted?: string;
}

export interface QuizStats {
  highScore: number;
  totalPlayed: number;
  avgAccuracy: number;
  bestStreak: number;
  totalQuestions: number;
  totalCorrect: number;
}

export interface LanguageProgress {
  solvedProblems: Set<string>;
  drillStats: DrillStats;
  quizStats: QuizStats;
  lastPlayed?: string;
}

export interface TotalStats {
  totalSolved: number;
  totalAttempted: number;
  totalCorrect: number;
  overallAccuracy: number;
  totalQuizzes: number;
  bestQuizScore: number;
  bestStreak: number;
  languagesUsed: number;
}

// Serializable versions for localStorage
interface SerializedLanguageProgress {
  solvedProblems: string[];
  drillStats: DrillStats;
  quizStats: QuizStats;
  lastPlayed?: string;
}

interface SerializedProgress {
  [language: string]: SerializedLanguageProgress;
}

interface ProgressContextValue {
  // Check if a problem is solved
  isSolved: (problemId: string, language?: LanguageId) => boolean;

  // Mark a problem as solved
  markSolved: (problemId: string, language: LanguageId) => void;

  // Get solved count for a language
  getSolvedCount: (language: LanguageId) => number;

  // Get all solved problem IDs for a language
  getSolvedProblems: (language: LanguageId) => string[];

  // Get total stats across all languages
  getTotalStats: () => TotalStats;

  // Get progress for a specific language
  getLanguageProgress: (language: LanguageId) => LanguageProgress;

  // Update drill stats
  updateDrillStats: (
    language: LanguageId,
    correct: boolean,
    category?: string
  ) => void;

  // Update quiz stats
  updateQuizStats: (
    language: LanguageId,
    score: number,
    totalQuestions: number,
    streak: number
  ) => void;

  // Get quiz high score for a language
  getQuizHighScore: (language: LanguageId) => number;

  // Get drill stats for a language
  getDrillStats: (language: LanguageId) => DrillStats;

  // Reset progress for a language or all
  resetProgress: (language?: LanguageId) => void;

  // Export progress as JSON
  exportProgress: () => string;

  // Import progress from JSON
  importProgress: (data: string) => boolean;

  // Check if progress is loaded
  isLoaded: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'coding-drills-progress';

const DEFAULT_DRILL_STATS: DrillStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  bestStreak: 0,
  currentStreak: 0,
  categoryStats: {},
};

const DEFAULT_QUIZ_STATS: QuizStats = {
  highScore: 0,
  totalPlayed: 0,
  avgAccuracy: 0,
  bestStreak: 0,
  totalQuestions: 0,
  totalCorrect: 0,
};

const createDefaultProgress = (): LanguageProgress => ({
  solvedProblems: new Set(),
  drillStats: { ...DEFAULT_DRILL_STATS, categoryStats: {} },
  quizStats: { ...DEFAULT_QUIZ_STATS },
});

// ============================================================================
// Serialization Helpers
// ============================================================================

function serializeProgress(
  progress: Map<string, LanguageProgress>
): SerializedProgress {
  const result: SerializedProgress = {};

  progress.forEach((value, key) => {
    result[key] = {
      solvedProblems: Array.from(value.solvedProblems),
      drillStats: value.drillStats,
      quizStats: value.quizStats,
      lastPlayed: value.lastPlayed,
    };
  });

  return result;
}

function deserializeProgress(
  data: SerializedProgress
): Map<string, LanguageProgress> {
  const result = new Map<string, LanguageProgress>();

  Object.entries(data).forEach(([key, value]) => {
    result.set(key, {
      solvedProblems: new Set(value.solvedProblems || []),
      drillStats: {
        ...DEFAULT_DRILL_STATS,
        ...value.drillStats,
        categoryStats: value.drillStats?.categoryStats || {},
      },
      quizStats: {
        ...DEFAULT_QUIZ_STATS,
        ...value.quizStats,
      },
      lastPlayed: value.lastPlayed,
    });
  });

  return result;
}

// ============================================================================
// Storage Helpers (external system)
// ============================================================================

function getStoredProgress(storageKey: string): Map<string, LanguageProgress> {
  if (typeof window === 'undefined') return new Map();

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored) as SerializedProgress;
      return deserializeProgress(parsed);
    }
  } catch {
    // localStorage might not be available or data might be corrupted
  }

  return new Map();
}

function setStoredProgress(
  storageKey: string,
  progress: Map<string, LanguageProgress>
): void {
  if (typeof window === 'undefined') return;

  try {
    const serialized = serializeProgress(progress);
    localStorage.setItem(storageKey, JSON.stringify(serialized));
  } catch {
    // localStorage might not be available
  }
}

// ============================================================================
// Progress Store (for useSyncExternalStore)
// ============================================================================

type ProgressListener = () => void;

interface ProgressStoreState {
  progress: Map<string, LanguageProgress>;
  isLoaded: boolean;
}

function createProgressStore(storageKey: string) {
  let state: ProgressStoreState = {
    progress: new Map(),
    isLoaded: false,
  };
  const listeners = new Set<ProgressListener>();

  const notifyListeners = () => {
    listeners.forEach((listener) => listener());
  };

  return {
    getSnapshot: () => state,
    getServerSnapshot: (): ProgressStoreState => ({
      progress: new Map<string, LanguageProgress>(),
      isLoaded: false,
    }),
    subscribe: (listener: ProgressListener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setProgress: (progress: Map<string, LanguageProgress>) => {
      state = { progress, isLoaded: true };
      setStoredProgress(storageKey, progress);
      notifyListeners();
    },
    updateProgress: (
      updater: (prev: Map<string, LanguageProgress>) => Map<string, LanguageProgress>
    ) => {
      state = { progress: updater(state.progress), isLoaded: true };
      setStoredProgress(storageKey, state.progress);
      notifyListeners();
    },
    initialize: () => {
      state = {
        progress: getStoredProgress(storageKey),
        isLoaded: true,
      };
      notifyListeners();
    },
  };
}

// ============================================================================
// Context
// ============================================================================

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

interface ProgressProviderProps {
  children: ReactNode;
  storageKey?: string;
}

export function ProgressProvider({
  children,
  storageKey = STORAGE_KEY,
}: ProgressProviderProps) {
  // Create store once per provider instance
  const [store] = useState(() => createProgressStore(storageKey));

  // Use sync external store for SSR-safe progress reading
  const storeState = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const { progress, isLoaded } = storeState;

  // Initialize from localStorage on mount
  useEffect(() => {
    store.initialize();
  }, [store]);

  // Get or create progress for a language
  const getLanguageProgress = useCallback(
    (language: LanguageId): LanguageProgress => {
      return progress.get(language) || createDefaultProgress();
    },
    [progress]
  );

  // Check if a problem is solved
  const isSolved = useCallback(
    (problemId: string, language?: LanguageId): boolean => {
      if (language) {
        const langProgress = progress.get(language);
        return langProgress?.solvedProblems.has(problemId) ?? false;
      }

      // Check across all languages
      for (const langProgress of progress.values()) {
        if (langProgress.solvedProblems.has(problemId)) {
          return true;
        }
      }
      return false;
    },
    [progress]
  );

  // Mark a problem as solved
  const markSolved = useCallback(
    (problemId: string, language: LanguageId) => {
      store.updateProgress((prev) => {
        const newProgress = new Map(prev);
        const langProgress = newProgress.get(language) || createDefaultProgress();

        const updatedSolved = new Set(langProgress.solvedProblems);
        updatedSolved.add(problemId);

        newProgress.set(language, {
          ...langProgress,
          solvedProblems: updatedSolved,
          lastPlayed: new Date().toISOString(),
        });

        return newProgress;
      });
    },
    [store]
  );

  // Get solved count for a language
  const getSolvedCount = useCallback(
    (language: LanguageId): number => {
      const langProgress = progress.get(language);
      return langProgress?.solvedProblems.size ?? 0;
    },
    [progress]
  );

  // Get all solved problems for a language
  const getSolvedProblems = useCallback(
    (language: LanguageId): string[] => {
      const langProgress = progress.get(language);
      return langProgress ? Array.from(langProgress.solvedProblems) : [];
    },
    [progress]
  );

  // Update drill stats
  const updateDrillStats = useCallback(
    (language: LanguageId, correct: boolean, category?: string) => {
      store.updateProgress((prev) => {
        const newProgress = new Map(prev);
        const langProgress = newProgress.get(language) || createDefaultProgress();
        const drillStats = { ...langProgress.drillStats };

        drillStats.totalAttempted += 1;

        if (correct) {
          drillStats.totalCorrect += 1;
          drillStats.currentStreak += 1;
          drillStats.bestStreak = Math.max(
            drillStats.bestStreak,
            drillStats.currentStreak
          );
        } else {
          drillStats.currentStreak = 0;
        }

        // Update category stats
        if (category) {
          const categoryStats = { ...drillStats.categoryStats };
          const catStat = categoryStats[category] || { attempted: 0, correct: 0 };

          categoryStats[category] = {
            attempted: catStat.attempted + 1,
            correct: catStat.correct + (correct ? 1 : 0),
            lastAttempted: new Date().toISOString(),
          };

          drillStats.categoryStats = categoryStats;
        }

        drillStats.lastPlayed = new Date().toISOString();

        newProgress.set(language, {
          ...langProgress,
          drillStats,
          lastPlayed: new Date().toISOString(),
        });

        return newProgress;
      });
    },
    [store]
  );

  // Update quiz stats
  const updateQuizStats = useCallback(
    (
      language: LanguageId,
      score: number,
      totalQuestions: number,
      streak: number
    ) => {
      store.updateProgress((prev) => {
        const newProgress = new Map(prev);
        const langProgress = newProgress.get(language) || createDefaultProgress();
        const quizStats = { ...langProgress.quizStats };

        quizStats.highScore = Math.max(quizStats.highScore, score);
        quizStats.bestStreak = Math.max(quizStats.bestStreak, streak);
        quizStats.totalPlayed += 1;
        quizStats.totalQuestions += totalQuestions;

        // Calculate correct answers from score percentage
        const correctAnswers = Math.round((score / 100) * totalQuestions);
        quizStats.totalCorrect += correctAnswers;

        // Recalculate average accuracy
        quizStats.avgAccuracy =
          quizStats.totalQuestions > 0
            ? (quizStats.totalCorrect / quizStats.totalQuestions) * 100
            : 0;

        newProgress.set(language, {
          ...langProgress,
          quizStats,
          lastPlayed: new Date().toISOString(),
        });

        return newProgress;
      });
    },
    [store]
  );

  // Get quiz high score for a language
  const getQuizHighScore = useCallback(
    (language: LanguageId): number => {
      const langProgress = progress.get(language);
      return langProgress?.quizStats.highScore ?? 0;
    },
    [progress]
  );

  // Get drill stats for a language
  const getDrillStats = useCallback(
    (language: LanguageId): DrillStats => {
      const langProgress = progress.get(language);
      return langProgress?.drillStats ?? { ...DEFAULT_DRILL_STATS, categoryStats: {} };
    },
    [progress]
  );

  // Get total stats across all languages
  const getTotalStats = useCallback((): TotalStats => {
    let totalSolved = 0;
    let totalAttempted = 0;
    let totalCorrect = 0;
    let totalQuizzes = 0;
    let bestQuizScore = 0;
    let bestStreak = 0;

    progress.forEach((langProgress) => {
      totalSolved += langProgress.solvedProblems.size;
      totalAttempted += langProgress.drillStats.totalAttempted;
      totalCorrect += langProgress.drillStats.totalCorrect;
      totalQuizzes += langProgress.quizStats.totalPlayed;
      bestQuizScore = Math.max(bestQuizScore, langProgress.quizStats.highScore);
      bestStreak = Math.max(
        bestStreak,
        langProgress.drillStats.bestStreak,
        langProgress.quizStats.bestStreak
      );
    });

    return {
      totalSolved,
      totalAttempted,
      totalCorrect,
      overallAccuracy: totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0,
      totalQuizzes,
      bestQuizScore,
      bestStreak,
      languagesUsed: progress.size,
    };
  }, [progress]);

  // Reset progress
  const resetProgress = useCallback((language?: LanguageId) => {
    store.updateProgress((prev) => {
      if (language) {
        const newProgress = new Map(prev);
        newProgress.delete(language);
        return newProgress;
      }
      return new Map();
    });
  }, [store]);

  // Export progress as JSON
  const exportProgress = useCallback((): string => {
    const serialized = serializeProgress(progress);
    return JSON.stringify({
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      data: serialized,
    }, null, 2);
  }, [progress]);

  // Import progress from JSON
  const importProgress = useCallback((jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      const data = parsed.data || parsed;
      store.setProgress(deserializeProgress(data));
      return true;
    } catch (error) {
      console.error('Failed to import progress:', error);
      return false;
    }
  }, [store]);

  // Memoized context value
  const value = useMemo<ProgressContextValue>(
    () => ({
      isSolved,
      markSolved,
      getSolvedCount,
      getSolvedProblems,
      getTotalStats,
      getLanguageProgress,
      updateDrillStats,
      updateQuizStats,
      getQuizHighScore,
      getDrillStats,
      resetProgress,
      exportProgress,
      importProgress,
      isLoaded,
    }),
    [
      isSolved,
      markSolved,
      getSolvedCount,
      getSolvedProblems,
      getTotalStats,
      getLanguageProgress,
      updateDrillStats,
      updateQuizStats,
      getQuizHighScore,
      getDrillStats,
      resetProgress,
      exportProgress,
      importProgress,
      isLoaded,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);

  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  return context;
}

// ============================================================================
// Convenience Hooks
// ============================================================================

/**
 * Hook for checking if a specific problem is solved
 */
export function useProblemSolved(problemId: string, language?: LanguageId): boolean {
  const { isSolved, isLoaded } = useProgress();

  if (!isLoaded) return false;
  return isSolved(problemId, language);
}

/**
 * Hook for getting language-specific stats
 */
export function useLanguageStats(language: LanguageId) {
  const { getSolvedCount, getDrillStats, getQuizHighScore, isLoaded } = useProgress();

  return useMemo(() => {
    if (!isLoaded) {
      return {
        solvedCount: 0,
        drillStats: { ...DEFAULT_DRILL_STATS, categoryStats: {} },
        quizHighScore: 0,
        isLoaded: false,
      };
    }

    return {
      solvedCount: getSolvedCount(language),
      drillStats: getDrillStats(language),
      quizHighScore: getQuizHighScore(language),
      isLoaded: true,
    };
  }, [language, getSolvedCount, getDrillStats, getQuizHighScore, isLoaded]);
}

// ============================================================================
// Exports
// ============================================================================

export default ProgressProvider;
