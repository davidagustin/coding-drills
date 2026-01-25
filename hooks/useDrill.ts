'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useProgress } from './useProgress';
import { useTimer } from './useTimer';
import { getSetting } from '@/lib/storage';

// ============================================================================
// Types
// ============================================================================

export interface DrillProblem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  hint?: string;
  explanation?: string;
  alternatives?: string[]; // Alternative correct answers
}

export interface DrillOptions {
  /** Problems to use in the drill */
  problems: DrillProblem[];
  /** Number of problems per session (0 = unlimited) */
  sessionLength?: number;
  /** Whether to shuffle problems */
  shuffle?: boolean;
  /** Filter by difficulty */
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  /** Filter by category */
  category?: string;
  /** Timer mode */
  timerMode?: 'up' | 'down' | 'none';
  /** Initial time for countdown mode (seconds) */
  timerDuration?: number;
  /** Callback when session completes */
  onComplete?: (result: DrillSessionResult) => void;
  /** Whether to auto-advance to next problem after correct answer */
  autoAdvance?: boolean;
  /** Delay before auto-advance (ms) */
  autoAdvanceDelay?: number;
  /** Case-sensitive answer matching */
  caseSensitive?: boolean;
  /** Trim whitespace from answers */
  trimAnswers?: boolean;
}

export interface DrillSessionResult {
  totalProblems: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skipped: number;
  accuracy: number;
  streak: number;
  bestStreak: number;
  duration: number;
  problems: Array<{
    problem: DrillProblem;
    userAnswer: string | null;
    correct: boolean;
    skipped: boolean;
    timeSpent: number;
  }>;
}

export interface UseDrillReturn {
  /** Current problem */
  currentProblem: DrillProblem | null;
  /** Current problem index (0-based) */
  currentIndex: number;
  /** Total number of problems in session */
  totalProblems: number;
  /** Number of correct answers */
  correctCount: number;
  /** Number of incorrect answers */
  incorrectCount: number;
  /** Number of skipped problems */
  skippedCount: number;
  /** Current streak */
  streak: number;
  /** Best streak in this session */
  bestStreak: number;
  /** Whether the session is active */
  isActive: boolean;
  /** Whether the session is complete */
  isComplete: boolean;
  /** Whether showing the answer/explanation */
  showingAnswer: boolean;
  /** Last submitted answer */
  lastAnswer: string | null;
  /** Whether last answer was correct */
  lastAnswerCorrect: boolean | null;
  /** Timer state */
  timer: {
    time: number;
    formatted: string;
    isRunning: boolean;
  };
  /** Submit an answer */
  submitAnswer: (answer: string) => boolean;
  /** Skip current problem */
  skip: () => void;
  /** Go to next problem */
  next: () => void;
  /** Reset and restart the session */
  restart: () => void;
  /** End the session early */
  endSession: () => DrillSessionResult;
  /** Show hint for current problem */
  showHint: () => string | null;
  /** Get current session result (call when needed, not during render) */
  getSessionResult: () => DrillSessionResult;
}

// ============================================================================
// Helper Functions
// ============================================================================

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function filterProblems(
  problems: DrillProblem[],
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed',
  category?: string
): DrillProblem[] {
  let filtered = [...problems];

  if (difficulty && difficulty !== 'mixed') {
    filtered = filtered.filter((p) => p.difficulty === difficulty);
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  return filtered;
}

function normalizeAnswer(
  answer: string,
  caseSensitive: boolean,
  trim: boolean
): string {
  let normalized = answer;
  if (trim) normalized = normalized.trim();
  if (!caseSensitive) normalized = normalized.toLowerCase();
  return normalized;
}

function checkAnswer(
  userAnswer: string,
  correctAnswer: string,
  alternatives: string[] | undefined,
  caseSensitive: boolean,
  trim: boolean
): boolean {
  const normalizedUser = normalizeAnswer(userAnswer, caseSensitive, trim);
  const normalizedCorrect = normalizeAnswer(correctAnswer, caseSensitive, trim);

  if (normalizedUser === normalizedCorrect) return true;

  if (alternatives) {
    return alternatives.some(
      (alt) => normalizeAnswer(alt, caseSensitive, trim) === normalizedUser
    );
  }

  return false;
}

// ============================================================================
// useDrill Hook
// ============================================================================

/**
 * Hook for managing a drill session
 * Handles problem navigation, answer checking, scoring, and persistence
 */
export function useDrill(language: string, options: DrillOptions): UseDrillReturn {
  // Use nullish coalescing (??) instead of || for settings that could be 0 or false
  // This ensures that falsy but valid values (0, false, '') are respected
  const {
    problems,
    sessionLength = getSetting('sessionLength') ?? 10,
    shuffle = true,
    difficulty = getSetting('preferredDifficulty') ?? 'mixed',
    category,
    timerMode = getSetting('timerMode') ?? 'up',
    timerDuration = getSetting('timerDuration') ?? 300,
    onComplete,
    autoAdvance = getSetting('autoAdvance') ?? false,
    autoAdvanceDelay = 1500,
    caseSensitive = false,
    trimAnswers = true,
  } = options;

  // Progress hook
  const { saveDrill, saveSession } = useProgress(language);

  // Session problems (filtered and shuffled)
  const sessionProblems = useMemo(() => {
    let filtered = filterProblems(problems, difficulty, category);
    if (shuffle) filtered = shuffleArray(filtered);
    if (sessionLength > 0) filtered = filtered.slice(0, sessionLength);
    return filtered;
  }, [problems, difficulty, category, shuffle, sessionLength]);

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);

  // Problem tracking
  const problemResults = useRef<
    Array<{
      problem: DrillProblem;
      userAnswer: string | null;
      correct: boolean;
      skipped: boolean;
      timeSpent: number;
    }>
  >([]);
  const problemStartTime = useRef<number>(0);

  // Timer
  const timer = useTimer({
    mode: timerMode === 'none' ? 'up' : timerMode,
    initialSeconds: timerMode === 'down' ? timerDuration : 0,
    autoStart: timerMode !== 'none',
    onComplete: timerMode === 'down' ? () => endSession() : undefined,
  });

  // Auto-advance timeout ref
  const autoAdvanceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Current problem
  const currentProblem = sessionProblems[currentIndex] || null;
  const totalProblems = sessionProblems.length;

  // Clear auto-advance timeout on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimeout.current) {
        clearTimeout(autoAdvanceTimeout.current);
      }
    };
  }, []);

  // Calculate session result
  const calculateSessionResult = useCallback((): DrillSessionResult => {
    return {
      totalProblems: problemResults.current.length,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      skipped: skippedCount,
      accuracy: problemResults.current.length > 0
        ? correctCount / problemResults.current.length
        : 0,
      streak,
      bestStreak,
      duration: timer.time,
      problems: [...problemResults.current],
    };
  }, [correctCount, incorrectCount, skippedCount, streak, bestStreak, timer.time]);


  // Complete the session
  const completeSession = useCallback(() => {
    setIsActive(false);
    setIsComplete(true);
    timer.pause();

    const result = calculateSessionResult();

    // Save session to progress
    saveSession({
      duration: result.duration,
      totalProblems: result.totalProblems,
      correctAnswers: result.correctAnswers,
      accuracy: result.accuracy,
      streak: result.bestStreak,
      category,
      difficulty: difficulty === 'mixed' ? undefined : difficulty,
    });

    onComplete?.(result);
  }, [calculateSessionResult, saveSession, onComplete, timer, category, difficulty]);

  // Record problem result
  const recordProblemResult = useCallback(
    (
      problem: DrillProblem,
      userAnswer: string | null,
      correct: boolean,
      skipped: boolean
    ) => {
      const timeSpent = Math.floor((Date.now() - problemStartTime.current) / 1000);
      problemResults.current.push({
        problem,
        userAnswer,
        correct,
        skipped,
        timeSpent,
      });
    },
    []
  );

  // Move to next problem
  const moveToNext = useCallback(() => {
    if (currentIndex >= totalProblems - 1) {
      completeSession();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setShowingAnswer(false);
      setLastAnswer(null);
      setLastAnswerCorrect(null);
      problemStartTime.current = Date.now();
    }
  }, [currentIndex, totalProblems, completeSession]);

  // Submit answer
  const submitAnswer = useCallback(
    (answer: string): boolean => {
      if (!currentProblem || !isActive || showingAnswer) return false;

      const isCorrect = checkAnswer(
        answer,
        currentProblem.answer,
        currentProblem.alternatives,
        caseSensitive,
        trimAnswers
      );

      setLastAnswer(answer);
      setLastAnswerCorrect(isCorrect);
      setShowingAnswer(true);

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
        setStreak((prev) => {
          const newStreak = prev + 1;
          setBestStreak((best) => Math.max(best, newStreak));
          return newStreak;
        });
      } else {
        setIncorrectCount((prev) => prev + 1);
        setStreak(0);
      }

      // Save individual drill result
      saveDrill({
        correct: isCorrect,
        category: currentProblem.category,
        difficulty: currentProblem.difficulty,
        timeSpent: Math.floor((Date.now() - problemStartTime.current) / 1000),
      });

      recordProblemResult(currentProblem, answer, isCorrect, false);

      // Auto-advance if enabled
      if (autoAdvance) {
        autoAdvanceTimeout.current = setTimeout(() => {
          moveToNext();
        }, autoAdvanceDelay);
      }

      return isCorrect;
    },
    [
      currentProblem,
      isActive,
      showingAnswer,
      caseSensitive,
      trimAnswers,
      saveDrill,
      recordProblemResult,
      autoAdvance,
      autoAdvanceDelay,
      moveToNext,
    ]
  );

  // Skip current problem
  const skip = useCallback(() => {
    if (!currentProblem || !isActive) return;

    // Clear any pending auto-advance
    if (autoAdvanceTimeout.current) {
      clearTimeout(autoAdvanceTimeout.current);
    }

    setSkippedCount((prev) => prev + 1);
    setStreak(0);
    recordProblemResult(currentProblem, null, false, true);
    moveToNext();
  }, [currentProblem, isActive, recordProblemResult, moveToNext]);

  // Next problem (manual advance)
  const next = useCallback(() => {
    if (!isActive || !showingAnswer) return;

    // Clear any pending auto-advance
    if (autoAdvanceTimeout.current) {
      clearTimeout(autoAdvanceTimeout.current);
    }

    moveToNext();
  }, [isActive, showingAnswer, moveToNext]);

  // Restart session
  const restart = useCallback(() => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSkippedCount(0);
    setStreak(0);
    setBestStreak(0);
    setIsActive(true);
    setIsComplete(false);
    setShowingAnswer(false);
    setLastAnswer(null);
    setLastAnswerCorrect(null);
    problemResults.current = [];
    problemStartTime.current = Date.now();
    timer.reset();
    if (timerMode !== 'none') {
      timer.start();
    }
  }, [timer, timerMode]);

  // End session early
  const endSession = useCallback((): DrillSessionResult => {
    const result = calculateSessionResult();
    completeSession();
    return result;
  }, [calculateSessionResult, completeSession]);

  // Show hint
  const showHint = useCallback((): string | null => {
    return currentProblem?.hint || null;
  }, [currentProblem]);

  return {
    currentProblem,
    currentIndex,
    totalProblems,
    correctCount,
    incorrectCount,
    skippedCount,
    streak,
    bestStreak,
    isActive,
    isComplete,
    showingAnswer,
    lastAnswer,
    lastAnswerCorrect,
    timer: {
      time: timer.time,
      formatted: timer.formatted,
      isRunning: timer.isRunning,
    },
    submitAnswer,
    skip,
    next,
    restart,
    endSession,
    showHint,
    getSessionResult: calculateSessionResult,
  };
}

export default useDrill;
