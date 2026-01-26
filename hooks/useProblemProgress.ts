/**
 * Shared hook for problem progress tracking
 * Consolidates duplicate localStorage logic from problem pages
 */

import { useCallback, useEffect, useState } from 'react';

export interface ProblemAttemptStatus {
  solved: boolean;
  attempts: number;
  lastAttempt?: string;
}

export interface ProblemProgress {
  [problemId: string]: ProblemAttemptStatus;
}

function getStorageKey(language: string): string {
  return `coding-drills-problems-${language}`;
}

function loadProgress(language: string): ProblemProgress {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(getStorageKey(language));
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgressToStorage(language: string, progress: ProblemProgress): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(getStorageKey(language), JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Failed to save problem progress:', error);
    return false;
  }
}

export function useProblemProgress(language: string) {
  const [progress, setProgress] = useState<ProblemProgress>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = loadProgress(language);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage on mount
    setProgress(stored);
    setIsLoading(false);
  }, [language]);

  // Update a single problem's progress
  const updateProblem = useCallback(
    (problemId: string, update: Partial<ProblemAttemptStatus>) => {
      setProgress((prev) => {
        const existing = prev[problemId] || { solved: false, attempts: 0 };
        const newProgress = {
          ...prev,
          [problemId]: {
            ...existing,
            ...update,
            lastAttempt: new Date().toISOString(),
          },
        };
        saveProgressToStorage(language, newProgress);
        return newProgress;
      });
    },
    [language],
  );

  // Mark a problem as solved
  const markSolved = useCallback(
    (problemId: string) => {
      updateProblem(problemId, { solved: true });
    },
    [updateProblem],
  );

  // Increment attempts for a problem
  const incrementAttempts = useCallback(
    (problemId: string) => {
      setProgress((prev) => {
        const existing = prev[problemId] || { solved: false, attempts: 0 };
        const newProgress = {
          ...prev,
          [problemId]: {
            ...existing,
            attempts: existing.attempts + 1,
            lastAttempt: new Date().toISOString(),
          },
        };
        saveProgressToStorage(language, newProgress);
        return newProgress;
      });
    },
    [language],
  );

  // Record a submission (increments attempts and optionally marks solved)
  const recordSubmission = useCallback(
    (problemId: string, isCorrect: boolean) => {
      setProgress((prev) => {
        const existing = prev[problemId] || { solved: false, attempts: 0 };
        const newProgress = {
          ...prev,
          [problemId]: {
            solved: existing.solved || isCorrect,
            attempts: existing.attempts + 1,
            lastAttempt: new Date().toISOString(),
          },
        };
        saveProgressToStorage(language, newProgress);
        return newProgress;
      });
    },
    [language],
  );

  // Get stats for display
  const getStats = useCallback(() => {
    const entries = Object.values(progress);
    return {
      solved: entries.filter((p) => p.solved).length,
      attempted: entries.filter((p) => p.attempts > 0 && !p.solved).length,
      total: entries.length,
    };
  }, [progress]);

  // Check if a specific problem is solved
  const isSolved = useCallback(
    (problemId: string): boolean => {
      return progress[problemId]?.solved ?? false;
    },
    [progress],
  );

  // Get attempts count for a problem
  const getAttempts = useCallback(
    (problemId: string): number => {
      return progress[problemId]?.attempts ?? 0;
    },
    [progress],
  );

  return {
    progress,
    isLoading,
    updateProblem,
    markSolved,
    incrementAttempts,
    recordSubmission,
    getStats,
    isSolved,
    getAttempts,
  };
}
