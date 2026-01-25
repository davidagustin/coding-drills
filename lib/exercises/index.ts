// Exercise data index - exports all language exercises

import { Exercise, ExerciseCategory, EXERCISE_CATEGORIES, DIFFICULTY_CONFIG } from './types';
import { javascriptExercises } from './javascript';
import { pythonExercises } from './python';

// Re-export types
export * from './types';

// Combined exercises by language
export const exercisesByLanguage: Record<string, Exercise[]> = {
  javascript: javascriptExercises,
  typescript: javascriptExercises, // TypeScript uses same exercises as JS for now
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
    'traversal': [],
    'iteration-patterns': [],
    'recursion': [],
    'generation': [],
    'searching': [],
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
  return exercises.find(ex => ex.id === exerciseId);
}

// Get categories that have exercises for a language
export function getAvailableCategories(language: string): ExerciseCategory[] {
  const byCategory = getExercisesByCategory(language);
  return (Object.keys(byCategory) as ExerciseCategory[]).filter(
    cat => byCategory[cat].length > 0
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

export { EXERCISE_CATEGORIES, DIFFICULTY_CONFIG };
