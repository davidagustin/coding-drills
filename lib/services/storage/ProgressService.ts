/**
 * Progress Service
 *
 * Handles all user progress persistence and retrieval.
 * Follows Single Responsibility Principle - only deals with progress data.
 *
 * Architecture Pattern: Repository Pattern
 */

import type {
  UserProgress,
  LanguageProgress,
  SessionResult,
  CategoryProgress,
  ProblemDifficulty,
} from '../../core/types';

import {
  STORAGE_KEYS,
  SESSION_LIMITS,
  DEFAULT_DRILL_STATS,
  DEFAULT_QUIZ_STATS,
} from '../../core/constants';

import { getStorageAdapter, type IStorageAdapter } from './StorageAdapter';

// ============================================================================
// Types
// ============================================================================

export interface DrillResult {
  correct: boolean;
  category?: string;
  difficulty?: ProblemDifficulty;
  timeSpent?: number;
}

export interface QuizResultInput {
  score: number;
  totalQuestions: number;
  accuracy: number;
  streak: number;
  timeSpent: number;
}

// ============================================================================
// Progress Service
// ============================================================================

export class ProgressService {
  private adapter: IStorageAdapter;

  constructor(adapter?: IStorageAdapter) {
    this.adapter = adapter ?? getStorageAdapter();
  }

  // --------------------------------------------------------------------------
  // Core CRUD Operations
  // --------------------------------------------------------------------------

  /**
   * Get all user progress across all languages
   */
  getAllProgress(): UserProgress {
    const data = this.adapter.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) return {};

    try {
      return JSON.parse(data) as UserProgress;
    } catch (error) {
      console.error('ProgressService: Error parsing progress data', error);
      return {};
    }
  }

  /**
   * Get progress for a specific language
   */
  getLanguageProgress(language: string): LanguageProgress {
    const allProgress = this.getAllProgress();
    return allProgress[language] ?? this.createDefaultProgress();
  }

  /**
   * Save progress for a specific language
   */
  saveLanguageProgress(language: string, progress: LanguageProgress): boolean {
    const allProgress = this.getAllProgress();
    allProgress[language] = progress;
    return this.adapter.setItem(
      STORAGE_KEYS.PROGRESS,
      JSON.stringify(allProgress)
    );
  }

  /**
   * Clear progress for a specific language or all languages
   */
  clearProgress(language?: string): boolean {
    if (language) {
      const allProgress = this.getAllProgress();
      delete allProgress[language];
      return this.adapter.setItem(
        STORAGE_KEYS.PROGRESS,
        JSON.stringify(allProgress)
      );
    }
    return this.adapter.removeItem(STORAGE_KEYS.PROGRESS);
  }

  // --------------------------------------------------------------------------
  // Drill Progress Operations
  // --------------------------------------------------------------------------

  /**
   * Record a drill attempt result
   */
  saveDrillResult(language: string, result: DrillResult): boolean {
    const progress = this.getLanguageProgress(language);
    const { drillStats } = progress;

    // Update totals
    drillStats.totalAttempted += 1;

    if (result.correct) {
      drillStats.totalCorrect += 1;
      drillStats.currentStreak += 1;
      drillStats.bestStreak = Math.max(
        drillStats.bestStreak,
        drillStats.currentStreak
      );
    } else {
      drillStats.currentStreak = 0;
    }

    // Update category stats
    if (result.category) {
      if (!drillStats.categoryStats[result.category]) {
        drillStats.categoryStats[result.category] = {
          category: result.category,
          attempted: 0,
          correct: 0,
        };
      }
      const categoryStats = drillStats.categoryStats[result.category];
      categoryStats.attempted += 1;
      if (result.correct) {
        categoryStats.correct += 1;
      }
      categoryStats.lastAttempted = this.getCurrentDate();
    }

    progress.lastPlayed = this.getCurrentDate();
    return this.saveLanguageProgress(language, progress);
  }

  /**
   * Save a complete drill session
   */
  saveDrillSession(
    language: string,
    session: Omit<SessionResult, 'id' | 'date'>
  ): boolean {
    const progress = this.getLanguageProgress(language);

    const sessionResult: SessionResult = {
      ...session,
      id: this.generateSessionId(),
      date: this.getCurrentDate(),
    };

    // Add to recent sessions (keep limited history)
    progress.drillStats.recentSessions.unshift(sessionResult);
    if (
      progress.drillStats.recentSessions.length > SESSION_LIMITS.MAX_RECENT_SESSIONS
    ) {
      progress.drillStats.recentSessions = progress.drillStats.recentSessions.slice(
        0,
        SESSION_LIMITS.MAX_RECENT_SESSIONS
      );
    }

    progress.lastPlayed = this.getCurrentDate();
    return this.saveLanguageProgress(language, progress);
  }

  /**
   * Reset streak for a language
   */
  resetStreak(language: string): boolean {
    const progress = this.getLanguageProgress(language);
    progress.drillStats.currentStreak = 0;
    return this.saveLanguageProgress(language, progress);
  }

  // --------------------------------------------------------------------------
  // Quiz Progress Operations
  // --------------------------------------------------------------------------

  /**
   * Record a quiz result
   */
  saveQuizResult(language: string, result: QuizResultInput): boolean {
    const progress = this.getLanguageProgress(language);
    const { quizStats } = progress;

    // Update high score and best streak
    quizStats.highScore = Math.max(quizStats.highScore, result.score);
    quizStats.bestStreak = Math.max(quizStats.bestStreak, result.streak);

    // Update totals
    quizStats.totalPlayed += 1;
    quizStats.totalQuestions += result.totalQuestions;
    quizStats.totalCorrect += Math.round(
      result.totalQuestions * result.accuracy
    );

    // Recalculate average accuracy
    quizStats.avgAccuracy =
      quizStats.totalQuestions > 0
        ? quizStats.totalCorrect / quizStats.totalQuestions
        : 0;

    progress.lastPlayed = this.getCurrentDate();
    return this.saveLanguageProgress(language, progress);
  }

  // --------------------------------------------------------------------------
  // Statistics Queries
  // --------------------------------------------------------------------------

  /**
   * Get accuracy for a language
   */
  getLanguageAccuracy(language: string): number {
    const progress = this.getLanguageProgress(language);
    const { totalAttempted, totalCorrect } = progress.drillStats;
    return totalAttempted > 0 ? totalCorrect / totalAttempted : 0;
  }

  /**
   * Get total time spent on a language (from sessions)
   */
  getTotalTimeSpent(language: string): number {
    const progress = this.getLanguageProgress(language);
    return progress.drillStats.recentSessions.reduce(
      (total, session) => total + session.duration,
      0
    );
  }

  /**
   * Get languages sorted by most recently played
   */
  getLanguagesByRecent(): string[] {
    const allProgress = this.getAllProgress();
    return Object.entries(allProgress)
      .sort(
        ([, a], [, b]) =>
          new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
      )
      .map(([lang]) => lang);
  }

  /**
   * Get overall statistics across all languages
   */
  getOverallStats(): {
    totalAttempted: number;
    totalCorrect: number;
    overallAccuracy: number;
    totalTimeSpent: number;
    languagesLearned: number;
  } {
    const allProgress = this.getAllProgress();
    const languages = Object.keys(allProgress);

    let totalAttempted = 0;
    let totalCorrect = 0;
    let totalTimeSpent = 0;

    for (const lang of languages) {
      const progress = allProgress[lang];
      totalAttempted += progress.drillStats.totalAttempted;
      totalCorrect += progress.drillStats.totalCorrect;
      totalTimeSpent += this.getTotalTimeSpent(lang);
    }

    return {
      totalAttempted,
      totalCorrect,
      overallAccuracy: totalAttempted > 0 ? totalCorrect / totalAttempted : 0,
      totalTimeSpent,
      languagesLearned: languages.length,
    };
  }

  /**
   * Get category stats for a language
   */
  getCategoryStats(language: string): CategoryProgress[] {
    const progress = this.getLanguageProgress(language);
    return Object.values(progress.drillStats.categoryStats);
  }

  // --------------------------------------------------------------------------
  // Private Helpers
  // --------------------------------------------------------------------------

  private createDefaultProgress(): LanguageProgress {
    return {
      drillStats: { ...DEFAULT_DRILL_STATS, categoryStats: {}, recentSessions: [] },
      quizStats: { ...DEFAULT_QUIZ_STATS },
      lastPlayed: this.getCurrentDate(),
    };
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  private getCurrentDate(): string {
    return new Date().toISOString();
  }
}

// Default singleton instance
let progressService: ProgressService | null = null;

export function getProgressService(): ProgressService {
  if (!progressService) {
    progressService = new ProgressService();
  }
  return progressService;
}
