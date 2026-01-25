/**
 * React Hooks for Coding Drills App
 *
 * Provides state management and localStorage persistence hooks
 * for drill sessions, quizzes, progress tracking, and settings.
 */

// Progress hooks
export { useProgress, useAllProgress } from './useProgress';
export type { UseProgressReturn, UseAllProgressReturn } from './useProgress';

// Timer hooks
export {
  useTimer,
  useStopwatch,
  useCountdown,
  useDebounce,
  useInterval,
} from './useTimer';
export type { TimerMode, UseTimerOptions, UseTimerReturn } from './useTimer';

// Drill hooks
export { useDrill } from './useDrill';
export type {
  DrillProblem,
  DrillOptions,
  DrillSessionResult,
  UseDrillReturn,
} from './useDrill';

// Quiz hooks
export { useQuiz } from './useQuiz';
export type {
  QuizQuestion,
  QuizOptions,
  QuizSessionResult,
  UseQuizReturn,
} from './useQuiz';

// Settings hooks
export { useSettings, useTheme, useSound } from './useSettings';
export type {
  UseSettingsReturn,
  Theme,
  UseThemeReturn,
  UseSoundReturn,
} from './useSettings';
