/**
 * Quiz scoring and generation utilities for Frontend Drills.
 */

import { getQuizQuestions } from './quiz/index';
import type { FrameworkId, FrontendCategory, FrontendQuizQuestion } from './types';

// ============================================================================
// Shuffle utility
// ============================================================================

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================================================
// Quiz generation
// ============================================================================

export interface FrontendQuizConfig {
  framework: FrameworkId;
  categories: FrontendCategory[];
  questionCount: number;
  timePerQuestion: number; // seconds, 0 = unlimited
}

/**
 * Generate a quiz from the question pool, filtered by config.
 */
export function generateFrontendQuiz(config: FrontendQuizConfig): FrontendQuizQuestion[] {
  let pool = getQuizQuestions(config.framework);

  // Filter by categories if any are selected
  if (config.categories.length > 0) {
    pool = pool.filter((q) => config.categories.includes(q.category));
  }

  // Shuffle question order and take the requested count
  const shuffled = shuffleArray(pool);
  const selected = shuffled.slice(0, config.questionCount);

  // Shuffle options within each question so the correct answer isn't always first
  return selected.map((q) => ({ ...q, options: shuffleArray(q.options) }));
}

// ============================================================================
// Scoring
// ============================================================================

export interface FrontendQuizAnswer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
  timeSpent: number; // seconds
  points: number;
}

export interface FrontendQuizScoreResult {
  basePoints: number;
  speedBonus: number;
  streakBonus: number;
  totalPoints: number;
}

/**
 * Calculate score for a single answer.
 */
export function calculateFrontendQuizScore(
  isCorrect: boolean,
  timeSpent: number,
  timeLimit: number,
  streak: number,
): FrontendQuizScoreResult {
  if (!isCorrect) {
    return { basePoints: 0, speedBonus: 0, streakBonus: 0, totalPoints: 0 };
  }

  const basePoints = 100;

  // Speed bonus: up to 50 extra points for fast answers
  let speedBonus = 0;
  if (timeLimit > 0) {
    const ratio = Math.max(0, 1 - timeSpent / timeLimit);
    speedBonus = Math.round(50 * ratio);
  }

  // Streak multiplier: +10% per streak, up to 2x
  const multiplier = Math.min(1 + streak * 0.1, 2.0);
  const streakBonus = Math.round((basePoints + speedBonus) * (multiplier - 1));
  const totalPoints = basePoints + speedBonus + streakBonus;

  return { basePoints, speedBonus, streakBonus, totalPoints };
}

// ============================================================================
// Results aggregation
// ============================================================================

export interface FrontendQuizResult {
  totalScore: number;
  basePoints: number;
  bonusPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  maxStreak: number;
  averageTime: number;
  totalTime: number;
  fastestAnswer: number;
  slowestAnswer: number;
}

export function calculateFrontendQuizResults(
  answers: FrontendQuizAnswer[],
  maxStreak: number,
  startTime: number,
  endTime: number,
): FrontendQuizResult {
  const totalScore = answers.reduce((sum, a) => sum + a.points, 0);
  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const times = answers.map((a) => a.timeSpent);
  const totalTime = Math.round((endTime - startTime) / 1000);

  return {
    totalScore,
    basePoints: correctAnswers * 100,
    bonusPoints: totalScore - correctAnswers * 100,
    correctAnswers,
    totalQuestions: answers.length,
    accuracy: answers.length > 0 ? Math.round((correctAnswers / answers.length) * 100) : 0,
    maxStreak,
    averageTime:
      times.length > 0
        ? Math.round((times.reduce((a, b) => a + b, 0) / times.length) * 10) / 10
        : 0,
    totalTime,
    fastestAnswer: times.length > 0 ? Math.round(Math.min(...times) * 10) / 10 : 0,
    slowestAnswer: times.length > 0 ? Math.round(Math.max(...times) * 10) / 10 : 0,
  };
}

// ============================================================================
// Leaderboard (localStorage-based, scoped to frontend-drills)
// ============================================================================

export interface FrontendLeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  accuracy: number;
  framework: FrameworkId;
  questionCount: number;
  date: string;
}

const LEADERBOARD_KEY = 'frontend-drills-leaderboard';
const MAX_ENTRIES = 50;

export function getFrontendLeaderboard(): FrontendLeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as FrontendLeaderboardEntry[];
  } catch {
    return [];
  }
}

export function addToFrontendLeaderboard(
  entry: Omit<FrontendLeaderboardEntry, 'id' | 'date'>,
): FrontendLeaderboardEntry {
  const newEntry: FrontendLeaderboardEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
  };

  const entries = getFrontendLeaderboard();
  entries.push(newEntry);
  entries.sort((a, b) => b.score - a.score);

  const trimmed = entries.slice(0, MAX_ENTRIES);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  }

  return newEntry;
}

export function getFrontendLeaderboardPosition(score: number): number {
  const entries = getFrontendLeaderboard();
  return entries.filter((e) => e.score > score).length + 1;
}
