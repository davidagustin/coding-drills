/**
 * React Hooks for Coding Drills App
 *
 * Provides state management and localStorage persistence hooks
 * for drill sessions, quizzes, progress tracking, and settings.
 */

export type {
  DrillOptions,
  DrillProblem,
  DrillSessionResult,
  UseDrillReturn,
} from './useDrill';
// Drill hooks
export { useDrill } from './useDrill';
export type { UseAllProgressReturn, UseProgressReturn } from './useProgress';
// Progress hooks
export { useAllProgress, useProgress } from './useProgress';
export type {
  QuizOptions,
  QuizQuestion,
  QuizSessionResult,
  UseQuizReturn,
} from './useQuiz';
// Quiz hooks
export { useQuiz } from './useQuiz';
export type {
  Theme,
  UseSettingsReturn,
  UseSoundReturn,
  UseThemeReturn,
} from './useSettings';
// Settings hooks
export { useSettings, useSound, useTheme } from './useSettings';
export type { TimerMode, UseTimerOptions, UseTimerReturn } from './useTimer';
// Timer hooks
export {
  useCountdown,
  useDebounce,
  useInterval,
  useStopwatch,
  useTimer,
} from './useTimer';
