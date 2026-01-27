// Exercise data index - exports all language exercises

import { javascriptExercises } from './javascript';
import { javascriptExtraExercises } from './javascript-extra';
import { pythonExercises } from './python';
import {
  DIFFICULTY_CONFIG,
  EXERCISE_CATEGORIES,
  type Exercise,
  type ExerciseCategory,
} from './types';
import { typescriptExercises } from './typescript';
import { typescriptExtraExercises } from './typescript-extra';

// Re-export types
export * from './types';

// Combined exercises by language
export const exercisesByLanguage: Record<string, Exercise[]> = {
  javascript: [...javascriptExercises, ...javascriptExtraExercises],
  typescript: [...typescriptExercises, ...typescriptExtraExercises],
  python: pythonExercises,
  // Other languages will use pattern-matching based exercises
  java: [], // TODO: Add Java-specific exercises
  cpp: [],
  csharp: [],
  go: [],
  ruby: [],
  c: [],
};

// Get exercises for a specific language
export function getExercisesForLanguage(language: string): Exercise[] {
  return exercisesByLanguage[language] || [];
}

// Get exercises by category for a language
export function getExercisesByCategory(language: string): Record<ExerciseCategory, Exercise[]> {
  const exercises = getExercisesForLanguage(language);
  const byCategory: Record<ExerciseCategory, Exercise[]> = {
    combinatorics: [],
    memoization: [],
    utilities: [],
    traversal: [],
    'iteration-patterns': [],
    recursion: [],
    searching: [],
    'data-structures': [],
  };

  for (const exercise of exercises) {
    byCategory[exercise.category].push(exercise);
  }

  return byCategory;
}

// Get a single exercise by ID
export function getExerciseById(language: string, exerciseId: string): Exercise | undefined {
  const exercises = getExercisesForLanguage(language);
  return exercises.find((ex) => ex.id === exerciseId);
}

// Get categories that have exercises for a language
export function getAvailableCategories(language: string): ExerciseCategory[] {
  const byCategory = getExercisesByCategory(language);
  return (Object.keys(byCategory) as ExerciseCategory[]).filter(
    (cat) => byCategory[cat].length > 0,
  );
}

// Get total exercise count for a language
export function getExerciseCount(language: string): number {
  return getExercisesForLanguage(language).length;
}

// Get exercise statistics for a language
export function getExerciseStats(language: string): {
  total: number;
  byDifficulty: Record<string, number>;
  byCategory: Record<string, number>;
} {
  const exercises = getExercisesForLanguage(language);

  const byDifficulty: Record<string, number> = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
  };

  const byCategory: Record<string, number> = {};

  for (const exercise of exercises) {
    byDifficulty[exercise.difficulty]++;
    byCategory[exercise.category] = (byCategory[exercise.category] || 0) + 1;
  }

  return {
    total: exercises.length,
    byDifficulty,
    byCategory,
  };
}

// Exercise IDs recommended for coding interview preparation (base IDs without language prefix).
// Covers essential patterns from Blind 75 / NeetCode 150 / FAANG interview prep.
const INTERVIEW_RECOMMENDED_BASE_IDS = new Set([
  // --- Two Pointers ---
  'two-pointer-palindrome',
  'two-pointer-remove-dupes',
  'three-sum-zero',
  'container-most-water',
  'trapping-rain-water',
  'move-zeroes',
  'dutch-national-flag',

  // --- Sliding Window ---
  'sliding-window-max-sum',
  'sliding-window-min-subarray',
  'longest-no-repeat',
  'min-window-substr',
  'sliding-window-max',

  // --- Binary Search ---
  'binary-search',
  'binary-search-iterative',
  'search-rotated',
  'min-in-rotated',
  'find-peak',
  'binary-search-insert',
  'search-2d-matrix',
  'count-occurrences',

  // --- Stack & Queue ---
  'stack-operations',
  'queue-operations',
  'min-stack',
  'monotonic-stack',
  'two-stack-queue',

  // --- Linked List ---
  'linked-list-traverse',
  'linked-list-reverse',

  // --- Tree Traversal ---
  'dfs-tree',
  'bfs-tree',
  'dfs-inorder',
  'validate-bst',
  'kth-smallest-bst',
  'lowest-common-ancestor',
  'serialize-tree',
  'right-side-view',
  'tree-diameter',
  'zigzag-level-order',

  // --- Graph ---
  'graph-adjacency',
  'bfs-traversal',
  'dfs-traversal',
  'number-of-islands',
  'course-schedule',
  'clone-graph',
  'topological-sort',
  'word-ladder',
  'rotting-oranges',

  // --- Dynamic Programming ---
  'climbing-stairs',
  'house-robber',
  'coin-change-min',
  'lcs-length',
  'lis-length',
  'edit-distance',
  'word-break',
  'decode-ways',
  'knapsack-01',
  'unique-paths-grid',
  'min-path-sum-grid',
  'max-product-subarray',
  'longest-palindrome-substr',
  'target-sum-ways',
  'partition-equal-subset',
  'jump-game',

  // --- Backtracking ---
  'generate-permutations',
  'generate-combinations',
  'generate-subsets',
  'word-search-grid',
  'generate-parens',
  'n-queens-count',
  'subset-sum-exists',

  // --- Heap / Priority Queue ---
  'min-heap-insert',
  'heap-extract-min',
  'max-heap-insert',
  'priority-queue-custom',
  'quick-select',

  // --- Trie ---
  'trie-insert',
  'trie-search',

  // --- Union-Find ---
  'union-find',
  'graph-valid-tree',

  // --- Array / String Essentials ---
  'product-except-self',
  'merge-intervals',
  'group-anagrams',
  'encode-decode-strings',
  'longest-consecutive-seq',
  'insert-interval',
  'spiral-matrix',
  'rotate-matrix',
  'string-compress',

  // --- Memoization ---
  'basic-memoize',
  'memoize-fibonacci',
  'debounce',
  'throttle',

  // --- Sorting & Merging ---
  'merge-sorted',
  'merge-in-place',
  'count-inversions',

  // --- Bit Manipulation ---
  'count-bits',
  'is-power-of-two',

  // --- LRU Cache ---
  'lru-cache',

  // --- Prefix Sum ---
  'prefix-sum',
]);

// Check if an exercise is recommended for coding interviews
export function isInterviewRecommended(exerciseId: string): boolean {
  // Strip the language prefix (e.g., "ts-" or "js-") to match the base ID
  const baseId = exerciseId.replace(/^(ts|js|py|java|cpp|cs|go|rb|c)-/, '');
  return INTERVIEW_RECOMMENDED_BASE_IDS.has(baseId);
}

// Get count of interview-recommended exercises for a language
export function getInterviewRecommendedCount(language: string): number {
  const exercises = getExercisesForLanguage(language);
  return exercises.filter((ex) => isInterviewRecommended(ex.id)).length;
}

export { EXERCISE_CATEGORIES, DIFFICULTY_CONFIG };
