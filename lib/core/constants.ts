/**
 * Core Constants
 *
 * Centralized configuration constants used across the data layer.
 * This prevents magic numbers and strings scattered throughout the codebase.
 */

import type { DrillStats, ProblemDifficulty, QuizStats, SkillLevel, UserSettings } from './types';

// ============================================================================
// Storage Keys
// ============================================================================

export const STORAGE_KEYS = {
  PROGRESS: 'coding-drills-progress',
  SETTINGS: 'coding-drills-settings',
  LEADERBOARD: 'coding-drills-leaderboard',
  VERSION: '1.0.0',
} as const;

// ============================================================================
// Execution Limits
// ============================================================================

export const EXECUTION_LIMITS = {
  DEFAULT_TIMEOUT: 5000,
  MAX_TIMEOUT: 30000,
  MIN_TIMEOUT: 100,
} as const;

// ============================================================================
// Session Limits
// ============================================================================

export const SESSION_LIMITS = {
  MAX_RECENT_SESSIONS: 20,
  MAX_LEADERBOARD_ENTRIES: 100,
} as const;

// ============================================================================
// Default Values
// ============================================================================

export const DEFAULT_SETTINGS: UserSettings = {
  preferredDifficulty: 'mixed',
  soundEffects: false,
  timerMode: 'up',
  timerDuration: 300,
  theme: 'system',
  showHints: true,
  autoAdvance: false,
  sessionLength: 10,
};

export const DEFAULT_DRILL_STATS: DrillStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  bestStreak: 0,
  currentStreak: 0,
  categoryStats: {},
  recentSessions: [],
};

export const DEFAULT_QUIZ_STATS: QuizStats = {
  highScore: 0,
  totalPlayed: 0,
  avgAccuracy: 0,
  bestStreak: 0,
  totalQuestions: 0,
  totalCorrect: 0,
};

// ============================================================================
// Difficulty Configurations
// ============================================================================

export const PROBLEM_DIFFICULTY_CONFIG: Record<
  ProblemDifficulty,
  {
    label: string;
    color: string;
    bgColor: string;
    points: number;
  }
> = {
  easy: {
    label: 'Easy',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    points: 10,
  },
  medium: {
    label: 'Medium',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    points: 20,
  },
  hard: {
    label: 'Hard',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    points: 30,
  },
};

export const SKILL_LEVEL_CONFIG: Record<
  SkillLevel,
  {
    label: string;
    color: string;
    bgColor: string;
    points: number;
  }
> = {
  beginner: {
    label: 'Beginner',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    points: 10,
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    points: 25,
  },
  advanced: {
    label: 'Advanced',
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-100 dark:bg-rose-900/30',
    points: 50,
  },
};

// ============================================================================
// Category Configurations
// ============================================================================

export const METHOD_CATEGORIES = [
  'arrays',
  'strings',
  'objects',
  'numbers',
  'math',
  'dates',
  'regex',
  'async',
  'utility',
] as const;

export type MethodCategory = (typeof METHOD_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<string, string> = {
  arrays: 'Arrays',
  strings: 'Strings',
  objects: 'Objects',
  numbers: 'Numbers',
  math: 'Math',
  dates: 'Date & Time',
  regex: 'Regular Expressions',
  async: 'Async/Promises',
  utility: 'Utility',
  lists: 'Lists',
  dicts: 'Dictionaries',
  // Language-specific
  'Array Methods': 'Array Methods',
  'String Methods': 'String Methods',
  'Object Methods': 'Object Methods',
  'List Methods': 'List Methods',
  'Dict Methods': 'Dictionary Methods',
};

export const CATEGORY_COLORS: Record<string, string> = {
  arrays: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  strings: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  objects: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  numbers: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  math: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  dates: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  regex: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  async: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  utility: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

// ============================================================================
// Exercise Category Configurations
// ============================================================================

export const EXERCISE_CATEGORY_CONFIG = {
  combinatorics: {
    name: 'Combinatorics',
    icon: 'generate',
    description: 'Generate permutations, combinations, subsets, and cartesian products',
  },
  memoization: {
    name: 'Memoization & Caching',
    icon: 'cache',
    description: 'Cache results, debounce, throttle, and optimize with memoization',
  },
  utilities: {
    name: 'Array Utilities',
    icon: 'utility',
    description: 'Chunk, zip, partition, group, and transform arrays',
  },
  traversal: {
    name: 'Tree & Graph Traversal',
    icon: 'tree',
    description: 'BFS, DFS, and graph navigation patterns you can reuse',
  },
  'iteration-patterns': {
    name: 'Iteration Patterns',
    icon: 'loop',
    description: 'Sliding windows, two pointers, and iteration control',
  },
  recursion: {
    name: 'Recursion',
    icon: 'recursion',
    description: 'Recursive patterns for trees, backtracking, and divide-conquer',
  },
  searching: {
    name: 'Search & Sort',
    icon: 'search',
    description: 'Binary search, merge sorted, and comparison utilities',
  },
  'data-structures': {
    name: 'Data Structures',
    icon: 'structure',
    description: 'Stacks, queues, heaps, tries, and union-find implementations',
  },
} as const;
