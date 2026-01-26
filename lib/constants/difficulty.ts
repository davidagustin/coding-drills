/**
 * Centralized difficulty configuration
 * Single source of truth for difficulty colors and styling
 */

import type { Difficulty } from '../types';

export const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Easy',
    textColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    order: 1,
  },
  medium: {
    label: 'Medium',
    textColor: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    order: 2,
  },
  hard: {
    label: 'Hard',
    textColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    order: 3,
  },
} as const satisfies Record<
  Difficulty,
  {
    label: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    order: number;
  }
>;

// Helper to get combined classes for badges
export function getDifficultyClasses(difficulty: Difficulty): string {
  const config = DIFFICULTY_CONFIG[difficulty];
  return `${config.textColor} ${config.bgColor} ${config.borderColor}`;
}

// For sorting problems by difficulty
export function getDifficultyOrder(difficulty: Difficulty): number {
  return DIFFICULTY_CONFIG[difficulty].order;
}
