'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useProgress } from './useProgress';
import { useTimer } from './useTimer';
import { getSetting } from '@/lib/storage';

// ============================================================================
// Types
// ============================================================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  explanation?: string;
  timeLimit?: number; // Per-question time limit in seconds
}

export interface QuizOptions {
  /** Questions to use in the quiz */
  questions: QuizQuestion[];
  /** Number of questions per quiz (0 = all) */
  quizLength?: number;
  /** Whether to shuffle questions */
  shuffle?: boolean;
  /** Whether to shuffle answer options */
  shuffleOptions?: boolean;
  /** Filter by difficulty */
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  /** Filter by category */
  category?: string;
  /** Time limit for entire quiz (seconds, 0 = no limit) */
  timeLimit?: number;
  /** Per-question time limit (seconds, 0 = no limit) */
  questionTimeLimit?: number;
  /** Callback when quiz completes */
  onComplete?: (result: QuizSessionResult) => void;
  /** Points for correct answer */
  pointsPerCorrect?: number;
  /** Points for streak bonus */
  streakBonus?: number;
  /** Time bonus points per second remaining */
  timeBonusPerSecond?: number;
  /** Whether to show correct answer after each question */
  showCorrectAnswer?: boolean;
  /** Delay before auto-advance after answer (ms) */
  answerDelay?: number;
}

export interface QuizSessionResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  score: number;
  streak: number;
  bestStreak: number;
  duration: number;
  questions: Array<{
    question: QuizQuestion;
    selectedIndex: number | null;
    correct: boolean;
    timeSpent: number;
    pointsEarned: number;
  }>;
}

export interface UseQuizReturn {
  /** Current question */
  currentQuestion: QuizQuestion | null;
  /** Current shuffled options (if shuffleOptions enabled) */
  currentOptions: string[];
  /** Mapping from shuffled index to original index */
  optionMapping: number[];
  /** Current question index (0-based) */
  currentIndex: number;
  /** Total number of questions */
  totalQuestions: number;
  /** Number of correct answers */
  correctCount: number;
  /** Number of incorrect answers */
  incorrectCount: number;
  /** Current score */
  score: number;
  /** Current streak */
  streak: number;
  /** Best streak */
  bestStreak: number;
  /** Whether the quiz is active */
  isActive: boolean;
  /** Whether the quiz is complete */
  isComplete: boolean;
  /** Whether showing the answer */
  showingAnswer: boolean;
  /** Selected option index (in current shuffled options) */
  selectedIndex: number | null;
  /** Whether selected answer was correct */
  isCorrect: boolean | null;
  /** Quiz timer state */
  quizTimer: {
    time: number;
    formatted: string;
    isRunning: boolean;
  };
  /** Question timer state (if per-question limit) */
  questionTimer: {
    time: number;
    formatted: string;
    isRunning: boolean;
  } | null;
  /** Select an answer */
  selectAnswer: (optionIndex: number) => void;
  /** Skip to next question */
  nextQuestion: () => void;
  /** Restart the quiz */
  restart: () => void;
  /** End quiz early */
  endQuiz: () => QuizSessionResult;
  /** Get current session result (call when needed, not during render) */
  getSessionResult: () => QuizSessionResult;
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

function createShuffledOptions(
  options: string[],
  correctIndex: number
): { shuffledOptions: string[]; mapping: number[]; newCorrectIndex: number } {
  const indices = options.map((_, i) => i);
  const shuffledIndices = shuffleArray(indices);

  const shuffledOptions = shuffledIndices.map((i) => options[i]);
  const newCorrectIndex = shuffledIndices.indexOf(correctIndex);

  return {
    shuffledOptions,
    mapping: shuffledIndices,
    newCorrectIndex,
  };
}

function filterQuestions(
  questions: QuizQuestion[],
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed',
  category?: string
): QuizQuestion[] {
  let filtered = [...questions];

  if (difficulty && difficulty !== 'mixed') {
    filtered = filtered.filter((q) => q.difficulty === difficulty);
  }

  if (category) {
    filtered = filtered.filter((q) => q.category === category);
  }

  return filtered;
}

// ============================================================================
// useQuiz Hook
// ============================================================================

/**
 * Hook for managing a quiz session
 * Handles question navigation, answer selection, scoring, timing, and persistence
 */
export function useQuiz(language: string, options: QuizOptions): UseQuizReturn {
  // Use nullish coalescing (??) for settings - respects falsy but valid values like 0
  const {
    questions,
    quizLength = 10,
    shuffle = true,
    shuffleOptions = true,
    difficulty = getSetting('preferredDifficulty') ?? 'mixed',
    category,
    timeLimit = 0,
    questionTimeLimit = 0,
    onComplete,
    pointsPerCorrect = 100,
    streakBonus = 10,
    timeBonusPerSecond = 5,
    showCorrectAnswer: _showCorrectAnswer = true,
    answerDelay = 1500,
  } = options;

  // Progress hook
  const { saveQuiz } = useProgress(language);

  // Session questions (filtered and shuffled)
  const sessionQuestions = useMemo(() => {
    let filtered = filterQuestions(questions, difficulty, category);
    if (shuffle) filtered = shuffleArray(filtered);
    if (quizLength > 0) filtered = filtered.slice(0, quizLength);
    return filtered;
  }, [questions, difficulty, category, shuffle, quizLength]);

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Shuffled options state
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [optionMapping, setOptionMapping] = useState<number[]>([]);
  const [correctShuffledIndex, setCorrectShuffledIndex] = useState<number>(0);

  // Question tracking
  const questionResults = useRef<
    Array<{
      question: QuizQuestion;
      selectedIndex: number | null;
      correct: boolean;
      timeSpent: number;
      pointsEarned: number;
    }>
  >([]);
  const questionStartTime = useRef<number>(0);

  // Auto-advance timeout ref
  const autoAdvanceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Current question
  const currentQuestion = sessionQuestions[currentIndex] || null;
  const totalQuestions = sessionQuestions.length;

  // Quiz timer (overall time limit)
  const quizTimer = useTimer({
    mode: timeLimit > 0 ? 'down' : 'up',
    initialSeconds: timeLimit,
    autoStart: true,
    onComplete: timeLimit > 0 ? () => endQuiz() : undefined,
  });

  // Question timer (per-question time limit)
  const effectiveQuestionTimeLimit =
    questionTimeLimit || currentQuestion?.timeLimit || 0;

  const questionTimer = useTimer({
    mode: 'down',
    initialSeconds: effectiveQuestionTimeLimit,
    autoStart: effectiveQuestionTimeLimit > 0,
    onComplete: () => {
      if (effectiveQuestionTimeLimit > 0 && !showingAnswer) {
        // Time's up for this question - count as incorrect
        handleQuestionTimeout();
      }
    },
  });

  // Initialize options for current question
  useEffect(() => {
    if (currentQuestion) {
      if (shuffleOptions) {
        const { shuffledOptions, mapping, newCorrectIndex } = createShuffledOptions(
          currentQuestion.options,
          currentQuestion.correctIndex
        );
        setCurrentOptions(shuffledOptions);
        setOptionMapping(mapping);
        setCorrectShuffledIndex(newCorrectIndex);
      } else {
        setCurrentOptions(currentQuestion.options);
        setOptionMapping(currentQuestion.options.map((_, i) => i));
        setCorrectShuffledIndex(currentQuestion.correctIndex);
      }

      // Reset question timer
      if (effectiveQuestionTimeLimit > 0) {
        questionTimer.reset();
        questionTimer.setTime(effectiveQuestionTimeLimit);
        questionTimer.start();
      }

      questionStartTime.current = Date.now();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- questionTimer methods are stable, adding object causes infinite loop
  }, [currentQuestion, shuffleOptions, effectiveQuestionTimeLimit]);

  // Clear auto-advance timeout on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimeout.current) {
        clearTimeout(autoAdvanceTimeout.current);
      }
    };
  }, []);

  // Calculate session result
  const calculateSessionResult = useCallback((): QuizSessionResult => {
    return {
      totalQuestions: questionResults.current.length,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      accuracy:
        questionResults.current.length > 0
          ? correctCount / questionResults.current.length
          : 0,
      score,
      streak,
      bestStreak,
      duration: quizTimer.time,
      questions: [...questionResults.current],
    };
  }, [correctCount, incorrectCount, score, streak, bestStreak, quizTimer.time]);


  // Complete the quiz
  const completeQuiz = useCallback(() => {
    setIsActive(false);
    setIsComplete(true);
    quizTimer.pause();
    questionTimer.pause();

    const result = calculateSessionResult();

    // Save quiz result to progress
    saveQuiz({
      score: result.score,
      totalQuestions: result.totalQuestions,
      accuracy: result.accuracy,
      streak: result.bestStreak,
      timeSpent: result.duration,
    });

    onComplete?.(result);
  }, [calculateSessionResult, saveQuiz, onComplete, quizTimer, questionTimer]);

  // Record question result
  const recordQuestionResult = useCallback(
    (
      question: QuizQuestion,
      selectedIdx: number | null,
      correct: boolean,
      pointsEarned: number
    ) => {
      const timeSpent = Math.floor((Date.now() - questionStartTime.current) / 1000);
      questionResults.current.push({
        question,
        selectedIndex: selectedIdx !== null ? optionMapping[selectedIdx] : null,
        correct,
        timeSpent,
        pointsEarned,
      });
    },
    [optionMapping]
  );

  // Move to next question
  const moveToNext = useCallback(() => {
    if (currentIndex >= totalQuestions - 1) {
      completeQuiz();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setShowingAnswer(false);
      setSelectedIndex(null);
      setIsCorrect(null);
    }
  }, [currentIndex, totalQuestions, completeQuiz]);

  // Handle question timeout
  const handleQuestionTimeout = useCallback(() => {
    if (!currentQuestion || !isActive || showingAnswer) return;

    setShowingAnswer(true);
    setIsCorrect(false);
    setIncorrectCount((prev) => prev + 1);
    setStreak(0);

    recordQuestionResult(currentQuestion, null, false, 0);

    // Auto-advance after delay
    autoAdvanceTimeout.current = setTimeout(() => {
      moveToNext();
    }, answerDelay);
  }, [currentQuestion, isActive, showingAnswer, recordQuestionResult, moveToNext, answerDelay]);

  // Select an answer
  const selectAnswer = useCallback(
    (optionIndex: number) => {
      if (!currentQuestion || !isActive || showingAnswer) return;
      if (optionIndex < 0 || optionIndex >= currentOptions.length) return;

      questionTimer.pause();

      const correct = optionIndex === correctShuffledIndex;
      setSelectedIndex(optionIndex);
      setIsCorrect(correct);
      setShowingAnswer(true);

      // Calculate points
      let pointsEarned = 0;
      if (correct) {
        pointsEarned += pointsPerCorrect;
        const newStreak = streak + 1;
        pointsEarned += newStreak * streakBonus;

        // Time bonus (remaining question time)
        if (effectiveQuestionTimeLimit > 0) {
          pointsEarned += questionTimer.time * timeBonusPerSecond;
        }

        setCorrectCount((prev) => prev + 1);
        setStreak(newStreak);
        setBestStreak((best) => Math.max(best, newStreak));
        setScore((prev) => prev + pointsEarned);
      } else {
        setIncorrectCount((prev) => prev + 1);
        setStreak(0);
      }

      recordQuestionResult(currentQuestion, optionIndex, correct, pointsEarned);

      // Auto-advance after delay
      autoAdvanceTimeout.current = setTimeout(() => {
        moveToNext();
      }, answerDelay);
    },
    [
      currentQuestion,
      isActive,
      showingAnswer,
      currentOptions.length,
      correctShuffledIndex,
      questionTimer,
      streak,
      pointsPerCorrect,
      streakBonus,
      effectiveQuestionTimeLimit,
      timeBonusPerSecond,
      recordQuestionResult,
      moveToNext,
      answerDelay,
    ]
  );

  // Next question (manual advance)
  const nextQuestion = useCallback(() => {
    if (!isActive) return;

    // Clear any pending auto-advance
    if (autoAdvanceTimeout.current) {
      clearTimeout(autoAdvanceTimeout.current);
    }

    if (!showingAnswer && currentQuestion) {
      // Skip question
      setIncorrectCount((prev) => prev + 1);
      setStreak(0);
      recordQuestionResult(currentQuestion, null, false, 0);
    }

    moveToNext();
  }, [isActive, showingAnswer, currentQuestion, recordQuestionResult, moveToNext]);

  // Restart quiz
  const restart = useCallback(() => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setIsActive(true);
    setIsComplete(false);
    setShowingAnswer(false);
    setSelectedIndex(null);
    setIsCorrect(null);
    questionResults.current = [];
    questionStartTime.current = Date.now();
    quizTimer.reset();
    quizTimer.start();
    if (effectiveQuestionTimeLimit > 0) {
      questionTimer.reset();
      questionTimer.start();
    }
  }, [quizTimer, questionTimer, effectiveQuestionTimeLimit]);

  // End quiz early
  const endQuiz = useCallback((): QuizSessionResult => {
    const result = calculateSessionResult();
    completeQuiz();
    return result;
  }, [calculateSessionResult, completeQuiz]);

  return {
    currentQuestion,
    currentOptions,
    optionMapping,
    currentIndex,
    totalQuestions,
    correctCount,
    incorrectCount,
    score,
    streak,
    bestStreak,
    isActive,
    isComplete,
    showingAnswer,
    selectedIndex,
    isCorrect,
    quizTimer: {
      time: quizTimer.time,
      formatted: quizTimer.formatted,
      isRunning: quizTimer.isRunning,
    },
    questionTimer:
      effectiveQuestionTimeLimit > 0
        ? {
            time: questionTimer.time,
            formatted: questionTimer.formatted,
            isRunning: questionTimer.isRunning,
          }
        : null,
    selectAnswer,
    nextQuestion,
    restart,
    endQuiz,
    getSessionResult: calculateSessionResult,
  };
}

export default useQuiz;
