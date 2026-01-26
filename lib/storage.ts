/**
 * Storage utilities for multi-language coding drills app
 * Handles localStorage persistence with SSR compatibility
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface SessionResult {
  id: string;
  date: string;
  duration: number; // seconds
  totalProblems: number;
  correctAnswers: number;
  accuracy: number;
  streak: number;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface CategoryStats {
  attempted: number;
  correct: number;
  lastAttempted?: string;
}

export interface DrillStats {
  totalAttempted: number;
  totalCorrect: number;
  bestStreak: number;
  currentStreak: number;
  categoryStats: { [category: string]: CategoryStats };
  recentSessions: SessionResult[];
}

export interface QuizStats {
  highScore: number;
  totalPlayed: number;
  avgAccuracy: number;
  bestStreak: number;
  totalQuestions: number;
  totalCorrect: number;
}

export interface LanguageProgress {
  drillStats: DrillStats;
  quizStats: QuizStats;
  lastPlayed: string;
}

export interface UserProgress {
  [language: string]: LanguageProgress;
}

export interface UserSettings {
  preferredDifficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  soundEffects: boolean;
  timerMode: 'up' | 'down' | 'none';
  timerDuration: number; // seconds for countdown mode
  theme: 'light' | 'dark' | 'system';
  showHints: boolean;
  autoAdvance: boolean;
  sessionLength: number; // number of problems per session
}

export interface DrillResult {
  correct: boolean;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  timeSpent?: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  accuracy: number;
  streak: number;
  timeSpent: number;
}

export interface ExportData {
  version: string;
  exportDate: string;
  progress: UserProgress;
  settings: UserSettings;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEYS = {
  PROGRESS: 'coding-drills-progress',
  SETTINGS: 'coding-drills-settings',
  VERSION: '1.0.0',
} as const;

const MAX_RECENT_SESSIONS = 20;

const DEFAULT_SETTINGS: UserSettings = {
  preferredDifficulty: 'mixed',
  soundEffects: false,
  timerMode: 'up',
  timerDuration: 300,
  theme: 'system',
  showHints: true,
  autoAdvance: false,
  sessionLength: 10,
};

const DEFAULT_DRILL_STATS: DrillStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  bestStreak: 0,
  currentStreak: 0,
  categoryStats: {},
  recentSessions: [],
};

const DEFAULT_QUIZ_STATS: QuizStats = {
  highScore: 0,
  totalPlayed: 0,
  avgAccuracy: 0,
  bestStreak: 0,
  totalQuestions: 0,
  totalCorrect: 0,
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if code is running in browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Safely get item from localStorage
 */
function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return null;
  }
}

/**
 * Safely set item in localStorage
 */
function safeSetItem(key: string, value: string): boolean {
  if (!isBrowser()) return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Safely remove item from localStorage
 */
function safeRemoveItem(key: string): boolean {
  if (!isBrowser()) return false;
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Generate unique session ID using crypto API when available (ES2023+ best practice)
 * Falls back to Math.random for broader compatibility
 */
function generateSessionId(): string {
  // Use crypto.randomUUID() when available (modern browsers, Node 19+)
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Get current ISO date string
 */
function getCurrentDate(): string {
  return new Date().toISOString();
}

/**
 * Create default language progress
 */
function createDefaultLanguageProgress(): LanguageProgress {
  return {
    drillStats: { ...DEFAULT_DRILL_STATS, categoryStats: {}, recentSessions: [] },
    quizStats: { ...DEFAULT_QUIZ_STATS },
    lastPlayed: getCurrentDate(),
  };
}

// ============================================================================
// Progress Storage Functions
// ============================================================================

/**
 * Get all user progress from localStorage
 */
export function getAllProgress(): UserProgress {
  const data = safeGetItem(STORAGE_KEYS.PROGRESS);
  if (!data) return {};

  try {
    return JSON.parse(data) as UserProgress;
  } catch (error) {
    console.error('Error parsing progress data:', error);
    return {};
  }
}

/**
 * Get progress for a specific language
 */
export function getProgress(language: string): LanguageProgress {
  const allProgress = getAllProgress();
  return allProgress[language] || createDefaultLanguageProgress();
}

/**
 * Save progress for a specific language
 */
function saveLanguageProgress(language: string, progress: LanguageProgress): boolean {
  const allProgress = getAllProgress();
  allProgress[language] = progress;
  return safeSetItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
}

/**
 * Save drill result for a language
 */
export function saveDrillProgress(language: string, result: DrillResult): boolean {
  const progress = getProgress(language);
  const { drillStats } = progress;

  // Update totals
  drillStats.totalAttempted += 1;
  if (result.correct) {
    drillStats.totalCorrect += 1;
    drillStats.currentStreak += 1;
    drillStats.bestStreak = Math.max(drillStats.bestStreak, drillStats.currentStreak);
  } else {
    drillStats.currentStreak = 0;
  }

  // Update category stats if category provided
  if (result.category) {
    if (!drillStats.categoryStats[result.category]) {
      drillStats.categoryStats[result.category] = {
        attempted: 0,
        correct: 0,
      };
    }
    drillStats.categoryStats[result.category].attempted += 1;
    if (result.correct) {
      drillStats.categoryStats[result.category].correct += 1;
    }
    drillStats.categoryStats[result.category].lastAttempted = getCurrentDate();
  }

  progress.lastPlayed = getCurrentDate();
  return saveLanguageProgress(language, progress);
}

/**
 * Save a complete drill session
 */
export function saveDrillSession(
  language: string,
  session: Omit<SessionResult, 'id' | 'date'>,
): boolean {
  const progress = getProgress(language);

  const sessionResult: SessionResult = {
    ...session,
    id: generateSessionId(),
    date: getCurrentDate(),
  };

  // Add to recent sessions (keep last N)
  progress.drillStats.recentSessions.unshift(sessionResult);
  if (progress.drillStats.recentSessions.length > MAX_RECENT_SESSIONS) {
    progress.drillStats.recentSessions = progress.drillStats.recentSessions.slice(
      0,
      MAX_RECENT_SESSIONS,
    );
  }

  progress.lastPlayed = getCurrentDate();
  return saveLanguageProgress(language, progress);
}

/**
 * Save quiz result for a language
 */
export function saveQuizProgress(language: string, result: QuizResult): boolean {
  const progress = getProgress(language);
  const { quizStats } = progress;

  // Update high score
  quizStats.highScore = Math.max(quizStats.highScore, result.score);
  quizStats.bestStreak = Math.max(quizStats.bestStreak, result.streak);

  // Update totals
  quizStats.totalPlayed += 1;
  quizStats.totalQuestions += result.totalQuestions;
  quizStats.totalCorrect += Math.round(result.totalQuestions * result.accuracy);

  // Recalculate average accuracy
  quizStats.avgAccuracy =
    quizStats.totalQuestions > 0 ? quizStats.totalCorrect / quizStats.totalQuestions : 0;

  progress.lastPlayed = getCurrentDate();
  return saveLanguageProgress(language, progress);
}

/**
 * Type guard for DrillResult
 */
function isDrillResult(result: unknown): result is DrillResult {
  return (
    typeof result === 'object' &&
    result !== null &&
    'correct' in result &&
    typeof (result as DrillResult).correct === 'boolean'
  );
}

/**
 * Type guard for QuizResult
 */
function isQuizResult(result: unknown): result is QuizResult {
  return (
    typeof result === 'object' &&
    result !== null &&
    'score' in result &&
    'totalQuestions' in result &&
    'accuracy' in result &&
    'streak' in result &&
    'timeSpent' in result
  );
}

/**
 * Type guard for SessionResult (without id and date)
 */
function isSessionResult(result: unknown): result is Omit<SessionResult, 'id' | 'date'> {
  return (
    typeof result === 'object' &&
    result !== null &&
    'duration' in result &&
    'totalProblems' in result &&
    'correctAnswers' in result &&
    'accuracy' in result &&
    'streak' in result
  );
}

/**
 * Generic save progress function
 */
export function saveProgress(
  language: string,
  type: 'drill' | 'quiz' | 'session',
  result: DrillResult | QuizResult | Omit<SessionResult, 'id' | 'date'>,
): boolean {
  switch (type) {
    case 'drill':
      if (isDrillResult(result)) {
        return saveDrillProgress(language, result);
      }
      console.error('Invalid drill result format');
      return false;
    case 'quiz':
      if (isQuizResult(result)) {
        return saveQuizProgress(language, result);
      }
      console.error('Invalid quiz result format');
      return false;
    case 'session':
      if (isSessionResult(result)) {
        return saveDrillSession(language, result);
      }
      console.error('Invalid session result format');
      return false;
    default: {
      // Exhaustive check - this should never happen
      const _exhaustiveCheck: never = type;
      console.error(`Unknown progress type: ${_exhaustiveCheck}`);
      return false;
    }
  }
}

/**
 * Clear progress for a specific language or all languages
 */
export function clearProgress(language?: string): boolean {
  if (language) {
    const allProgress = getAllProgress();
    delete allProgress[language];
    return safeSetItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
  } else {
    return safeRemoveItem(STORAGE_KEYS.PROGRESS);
  }
}

/**
 * Reset streak for a language (e.g., when user takes a break)
 */
export function resetStreak(language: string): boolean {
  const progress = getProgress(language);
  progress.drillStats.currentStreak = 0;
  return saveLanguageProgress(language, progress);
}

// ============================================================================
// Settings Storage Functions
// ============================================================================

/**
 * Get user settings
 */
export function getSettings(): UserSettings {
  const data = safeGetItem(STORAGE_KEYS.SETTINGS);
  if (!data) return { ...DEFAULT_SETTINGS };

  try {
    const parsed = JSON.parse(data) as Partial<UserSettings>;
    // Merge with defaults to ensure all fields exist
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (error) {
    console.error('Error parsing settings data:', error);
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Save user settings
 */
export function saveSettings(settings: Partial<UserSettings>): boolean {
  const currentSettings = getSettings();
  const newSettings = { ...currentSettings, ...settings };
  return safeSetItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
}

/**
 * Reset settings to defaults
 */
export function resetSettings(): boolean {
  return safeSetItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
}

/**
 * Get a single setting value
 */
export function getSetting<K extends keyof UserSettings>(key: K): UserSettings[K] {
  const settings = getSettings();
  return settings[key];
}

/**
 * Set a single setting value
 */
export function setSetting<K extends keyof UserSettings>(key: K, value: UserSettings[K]): boolean {
  return saveSettings({ [key]: value });
}

// ============================================================================
// Export/Import Functions
// ============================================================================

/**
 * Export all progress and settings as JSON
 */
export function exportProgress(): ExportData {
  return {
    version: STORAGE_KEYS.VERSION,
    exportDate: getCurrentDate(),
    progress: getAllProgress(),
    settings: getSettings(),
  };
}

/**
 * Export progress and trigger download
 */
export function downloadProgress(): void {
  if (!isBrowser()) return;

  const data = exportProgress();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `coding-drills-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validate import data structure
 */
function validateImportData(data: unknown): data is ExportData {
  if (typeof data !== 'object' || data === null) return false;

  const d = data as Record<string, unknown>;

  if (typeof d.version !== 'string') return false;
  if (typeof d.exportDate !== 'string') return false;
  if (typeof d.progress !== 'object' || d.progress === null) return false;
  if (typeof d.settings !== 'object' || d.settings === null) return false;

  return true;
}

/**
 * Import progress and settings from JSON data
 */
export function importProgress(data: unknown): { success: boolean; error?: string } {
  if (!validateImportData(data)) {
    return { success: false, error: 'Invalid data format' };
  }

  try {
    // Save progress
    const progressSaved = safeSetItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data.progress));
    if (!progressSaved) {
      return { success: false, error: 'Failed to save progress data' };
    }

    // Save settings (merge with defaults)
    const settingsSaved = saveSettings(data.settings);
    if (!settingsSaved) {
      return { success: false, error: 'Failed to save settings data' };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Import from file input
 */
export function importFromFile(file: File): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        resolve(importProgress(data));
      } catch {
        resolve({ success: false, error: 'Invalid JSON file' });
      }
    };

    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read file' });
    };

    reader.readAsText(file);
  });
}

// ============================================================================
// Statistics Helpers
// ============================================================================

/**
 * Calculate overall accuracy for a language
 */
export function getLanguageAccuracy(language: string): number {
  const progress = getProgress(language);
  const { totalAttempted, totalCorrect } = progress.drillStats;
  return totalAttempted > 0 ? totalCorrect / totalAttempted : 0;
}

/**
 * Get total time spent on a language (from sessions)
 */
export function getTotalTimeSpent(language: string): number {
  const progress = getProgress(language);
  return progress.drillStats.recentSessions.reduce((total, session) => total + session.duration, 0);
}

/**
 * Get languages sorted by last played
 * Uses toSorted() for immutable sorting (ES2023)
 */
export function getLanguagesByRecent(): string[] {
  const allProgress = getAllProgress();
  return Object.entries(allProgress)
    .toSorted(([, a], [, b]) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime())
    .map(([lang]) => lang);
}

/**
 * Get overall statistics across all languages
 */
export function getOverallStats(): {
  totalAttempted: number;
  totalCorrect: number;
  overallAccuracy: number;
  totalTimeSpent: number;
  languagesLearned: number;
} {
  const allProgress = getAllProgress();
  const languages = Object.keys(allProgress);

  let totalAttempted = 0;
  let totalCorrect = 0;
  let totalTimeSpent = 0;

  for (const lang of languages) {
    const progress = allProgress[lang];
    totalAttempted += progress.drillStats.totalAttempted;
    totalCorrect += progress.drillStats.totalCorrect;
    totalTimeSpent += getTotalTimeSpent(lang);
  }

  return {
    totalAttempted,
    totalCorrect,
    overallAccuracy: totalAttempted > 0 ? totalCorrect / totalAttempted : 0,
    totalTimeSpent,
    languagesLearned: languages.length,
  };
}

// ============================================================================
// Default Exports
// ============================================================================

export const storage = {
  // Progress
  getAllProgress,
  getProgress,
  saveProgress,
  saveDrillProgress,
  saveQuizProgress,
  saveDrillSession,
  clearProgress,
  resetStreak,

  // Settings
  getSettings,
  saveSettings,
  resetSettings,
  getSetting,
  setSetting,

  // Export/Import
  exportProgress,
  downloadProgress,
  importProgress,
  importFromFile,

  // Statistics
  getLanguageAccuracy,
  getTotalTimeSpent,
  getLanguagesByRecent,
  getOverallStats,

  // Helpers
  isBrowser,
};

export default storage;
