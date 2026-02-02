// @vitest-environment jsdom
/* eslint-disable @typescript-eslint/no-explicit-any */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import storage, {
  clearProgress,
  downloadProgress,
  exportProgress,
  getAllProgress,
  getLanguageAccuracy,
  getLanguagesByRecent,
  getOverallStats,
  getProgress,
  getSetting,
  getSettings,
  getTotalTimeSpent,
  importFromFile,
  importProgress,
  resetSettings,
  resetStreak,
  saveDrillProgress,
  saveDrillSession,
  saveProgress,
  saveQuizProgress,
  saveRegexProgress,
  saveSettings,
  setSetting,
} from './storage';

const PROGRESS_KEY = 'coding-drills-progress';
const SETTINGS_KEY = 'coding-drills-settings';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  // ==========================================================================
  // getAllProgress
  // ==========================================================================
  describe('getAllProgress', () => {
    it('returns empty object when no data stored', () => {
      expect(getAllProgress()).toEqual({});
    });

    it('returns parsed progress when valid data exists', () => {
      const data = {
        javascript: {
          drillStats: {
            totalAttempted: 5,
            totalCorrect: 3,
            bestStreak: 2,
            currentStreak: 1,
            categoryStats: {},
            recentSessions: [],
          },
          quizStats: {
            highScore: 0,
            totalPlayed: 0,
            avgAccuracy: 0,
            bestStreak: 0,
            totalQuestions: 0,
            totalCorrect: 0,
          },
          regexStats: {
            totalAttempted: 0,
            totalCorrect: 0,
            bestStreak: 0,
            highScore: 0,
            totalPlayed: 0,
          },
          lastPlayed: '2025-01-01T00:00:00.000Z',
        },
      };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
      expect(getAllProgress()).toEqual(data);
    });

    it('returns empty object when stored JSON is corrupted', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem(PROGRESS_KEY, '{invalid json!!!');
      expect(getAllProgress()).toEqual({});
      expect(spy).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // getProgress
  // ==========================================================================
  describe('getProgress', () => {
    it('returns default progress for non-existing language', () => {
      const progress = getProgress('rust');
      expect(progress.drillStats.totalAttempted).toBe(0);
      expect(progress.drillStats.totalCorrect).toBe(0);
      expect(progress.drillStats.bestStreak).toBe(0);
      expect(progress.drillStats.currentStreak).toBe(0);
      expect(progress.drillStats.categoryStats).toEqual({});
      expect(progress.drillStats.recentSessions).toEqual([]);
      expect(progress.quizStats.highScore).toBe(0);
      expect(progress.regexStats.totalAttempted).toBe(0);
      expect(progress.lastPlayed).toBeDefined();
    });

    it('returns stored progress for existing language', () => {
      saveDrillProgress('python', { correct: true, category: 'loops' });
      const progress = getProgress('python');
      expect(progress.drillStats.totalAttempted).toBe(1);
      expect(progress.drillStats.totalCorrect).toBe(1);
    });
  });

  // ==========================================================================
  // saveDrillProgress
  // ==========================================================================
  describe('saveDrillProgress', () => {
    it('saves correct answer and updates streak', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true });
      const p = getProgress('js');
      expect(p.drillStats.totalAttempted).toBe(3);
      expect(p.drillStats.totalCorrect).toBe(3);
      expect(p.drillStats.currentStreak).toBe(3);
      expect(p.drillStats.bestStreak).toBe(3);
    });

    it('resets current streak on incorrect answer', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: false });
      const p = getProgress('js');
      expect(p.drillStats.currentStreak).toBe(0);
      expect(p.drillStats.bestStreak).toBe(2);
    });

    it('tracks category stats for correct answer', () => {
      saveDrillProgress('js', { correct: true, category: 'arrays' });
      const p = getProgress('js');
      expect(p.drillStats.categoryStats['arrays']).toBeDefined();
      expect(p.drillStats.categoryStats['arrays'].attempted).toBe(1);
      expect(p.drillStats.categoryStats['arrays'].correct).toBe(1);
      expect(p.drillStats.categoryStats['arrays'].lastAttempted).toBeDefined();
    });

    it('tracks category stats for incorrect answer', () => {
      saveDrillProgress('js', { correct: false, category: 'strings' });
      const p = getProgress('js');
      expect(p.drillStats.categoryStats['strings'].attempted).toBe(1);
      expect(p.drillStats.categoryStats['strings'].correct).toBe(0);
    });

    it('handles missing category gracefully', () => {
      saveDrillProgress('js', { correct: true });
      const p = getProgress('js');
      expect(Object.keys(p.drillStats.categoryStats)).toHaveLength(0);
    });

    it('increments existing category stats', () => {
      saveDrillProgress('js', { correct: true, category: 'loops' });
      saveDrillProgress('js', { correct: false, category: 'loops' });
      saveDrillProgress('js', { correct: true, category: 'loops' });
      const p = getProgress('js');
      expect(p.drillStats.categoryStats['loops'].attempted).toBe(3);
      expect(p.drillStats.categoryStats['loops'].correct).toBe(2);
    });

    it('updates lastPlayed timestamp', () => {
      saveDrillProgress('js', { correct: true });
      const p = getProgress('js');
      expect(p.lastPlayed).toBeDefined();
      const date = new Date(p.lastPlayed);
      expect(date.getTime()).toBeGreaterThan(0);
    });

    it('preserves best streak when current streak resets', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true }); // bestStreak=3
      saveDrillProgress('js', { correct: false }); // reset
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true }); // currentStreak=2
      const p = getProgress('js');
      expect(p.drillStats.bestStreak).toBe(3);
      expect(p.drillStats.currentStreak).toBe(2);
    });
  });

  // ==========================================================================
  // saveDrillSession
  // ==========================================================================
  describe('saveDrillSession', () => {
    it('saves a session with generated id and date', () => {
      const result = saveDrillSession('js', {
        duration: 120,
        totalProblems: 10,
        correctAnswers: 8,
        accuracy: 0.8,
        streak: 5,
      });
      expect(result).toBe(true);
      const p = getProgress('js');
      expect(p.drillStats.recentSessions).toHaveLength(1);
      expect(p.drillStats.recentSessions[0].id).toBeDefined();
      expect(p.drillStats.recentSessions[0].date).toBeDefined();
      expect(p.drillStats.recentSessions[0].duration).toBe(120);
      expect(p.drillStats.recentSessions[0].totalProblems).toBe(10);
    });

    it('prepends new sessions (most recent first)', () => {
      saveDrillSession('js', {
        duration: 60,
        totalProblems: 5,
        correctAnswers: 3,
        accuracy: 0.6,
        streak: 2,
      });
      saveDrillSession('js', {
        duration: 120,
        totalProblems: 10,
        correctAnswers: 8,
        accuracy: 0.8,
        streak: 5,
      });
      const p = getProgress('js');
      expect(p.drillStats.recentSessions).toHaveLength(2);
      expect(p.drillStats.recentSessions[0].duration).toBe(120); // most recent
    });

    it('caps sessions at MAX_RECENT_SESSIONS (20)', () => {
      for (let i = 0; i < 25; i++) {
        saveDrillSession('js', {
          duration: i * 10,
          totalProblems: 10,
          correctAnswers: 5,
          accuracy: 0.5,
          streak: 1,
        });
      }
      const p = getProgress('js');
      expect(p.drillStats.recentSessions).toHaveLength(20);
      // Most recent session should be first (duration = 24*10=240)
      expect(p.drillStats.recentSessions[0].duration).toBe(240);
    });

    it('saves session with optional category and difficulty', () => {
      saveDrillSession('js', {
        duration: 60,
        totalProblems: 5,
        correctAnswers: 4,
        accuracy: 0.8,
        streak: 3,
        category: 'arrays',
        difficulty: 'hard',
      });
      const p = getProgress('js');
      expect(p.drillStats.recentSessions[0].category).toBe('arrays');
      expect(p.drillStats.recentSessions[0].difficulty).toBe('hard');
    });
  });

  // ==========================================================================
  // saveQuizProgress
  // ==========================================================================
  describe('saveQuizProgress', () => {
    it('saves quiz result and updates stats', () => {
      const result = saveQuizProgress('js', {
        score: 80,
        totalQuestions: 10,
        accuracy: 0.8,
        streak: 5,
        timeSpent: 120,
      });
      expect(result).toBe(true);
      const p = getProgress('js');
      expect(p.quizStats.highScore).toBe(80);
      expect(p.quizStats.totalPlayed).toBe(1);
      expect(p.quizStats.bestStreak).toBe(5);
      expect(p.quizStats.totalQuestions).toBe(10);
      expect(p.quizStats.totalCorrect).toBe(8);
      expect(p.quizStats.avgAccuracy).toBeCloseTo(0.8);
    });

    it('updates high score only when new score is higher', () => {
      saveQuizProgress('js', {
        score: 80,
        totalQuestions: 10,
        accuracy: 0.8,
        streak: 3,
        timeSpent: 100,
      });
      saveQuizProgress('js', {
        score: 60,
        totalQuestions: 10,
        accuracy: 0.6,
        streak: 2,
        timeSpent: 100,
      });
      const p = getProgress('js');
      expect(p.quizStats.highScore).toBe(80);
    });

    it('calculates average accuracy across multiple quizzes', () => {
      saveQuizProgress('js', {
        score: 100,
        totalQuestions: 10,
        accuracy: 1.0,
        streak: 10,
        timeSpent: 50,
      });
      saveQuizProgress('js', {
        score: 50,
        totalQuestions: 10,
        accuracy: 0.5,
        streak: 3,
        timeSpent: 50,
      });
      const p = getProgress('js');
      expect(p.quizStats.totalPlayed).toBe(2);
      expect(p.quizStats.totalQuestions).toBe(20);
      // totalCorrect = 10 + 5 = 15, avgAccuracy = 15/20 = 0.75
      expect(p.quizStats.totalCorrect).toBe(15);
      expect(p.quizStats.avgAccuracy).toBeCloseTo(0.75);
    });

    it('updates bestStreak when new streak is higher', () => {
      saveQuizProgress('js', {
        score: 50,
        totalQuestions: 10,
        accuracy: 0.5,
        streak: 7,
        timeSpent: 100,
      });
      saveQuizProgress('js', {
        score: 50,
        totalQuestions: 10,
        accuracy: 0.5,
        streak: 3,
        timeSpent: 100,
      });
      const p = getProgress('js');
      expect(p.quizStats.bestStreak).toBe(7);
    });
  });

  // ==========================================================================
  // saveRegexProgress
  // ==========================================================================
  describe('saveRegexProgress', () => {
    it('saves regex result and updates stats', () => {
      const result = saveRegexProgress('js', {
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        bestStreak: 7,
      });
      expect(result).toBe(true);
      const p = getProgress('js');
      expect(p.regexStats.highScore).toBe(90);
      expect(p.regexStats.totalPlayed).toBe(1);
      expect(p.regexStats.totalAttempted).toBe(10);
      expect(p.regexStats.totalCorrect).toBe(9);
      expect(p.regexStats.bestStreak).toBe(7);
    });

    it('updates high score and best streak when higher', () => {
      saveRegexProgress('js', { score: 50, totalQuestions: 5, correctAnswers: 3, bestStreak: 3 });
      saveRegexProgress('js', { score: 90, totalQuestions: 10, correctAnswers: 9, bestStreak: 8 });
      const p = getProgress('js');
      expect(p.regexStats.highScore).toBe(90);
      expect(p.regexStats.bestStreak).toBe(8);
      expect(p.regexStats.totalPlayed).toBe(2);
      expect(p.regexStats.totalAttempted).toBe(15);
      expect(p.regexStats.totalCorrect).toBe(12);
    });

    it('initializes regexStats if missing from stored progress', () => {
      // Store progress without regexStats
      const progressData = {
        js: {
          drillStats: {
            totalAttempted: 0,
            totalCorrect: 0,
            bestStreak: 0,
            currentStreak: 0,
            categoryStats: {},
            recentSessions: [],
          },
          quizStats: {
            highScore: 0,
            totalPlayed: 0,
            avgAccuracy: 0,
            bestStreak: 0,
            totalQuestions: 0,
            totalCorrect: 0,
          },
          lastPlayed: '2025-01-01T00:00:00.000Z',
        },
      };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressData));

      saveRegexProgress('js', { score: 50, totalQuestions: 5, correctAnswers: 4, bestStreak: 4 });
      const p = getProgress('js');
      expect(p.regexStats).toBeDefined();
      expect(p.regexStats.highScore).toBe(50);
      expect(p.regexStats.totalPlayed).toBe(1);
    });
  });

  // ==========================================================================
  // saveProgress (generic)
  // ==========================================================================
  describe('saveProgress', () => {
    it('saves drill type with valid drill result', () => {
      const result = saveProgress('js', 'drill', { correct: true, category: 'arrays' });
      expect(result).toBe(true);
      expect(getProgress('js').drillStats.totalAttempted).toBe(1);
    });

    it('saves quiz type with valid quiz result', () => {
      const result = saveProgress('js', 'quiz', {
        score: 80,
        totalQuestions: 10,
        accuracy: 0.8,
        streak: 5,
        timeSpent: 100,
      });
      expect(result).toBe(true);
      expect(getProgress('js').quizStats.totalPlayed).toBe(1);
    });

    it('saves session type with valid session result', () => {
      const result = saveProgress('js', 'session', {
        duration: 120,
        totalProblems: 10,
        correctAnswers: 8,
        accuracy: 0.8,
        streak: 5,
      });
      expect(result).toBe(true);
      expect(getProgress('js').drillStats.recentSessions).toHaveLength(1);
    });

    it('returns false for drill type with invalid result (missing correct)', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = saveProgress('js', 'drill', { score: 10 } as any);
      expect(result).toBe(false);
      expect(spy).toHaveBeenCalledWith('Invalid drill result format');
    });

    it('returns false for quiz type with invalid result (missing fields)', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = saveProgress('js', 'quiz', { correct: true } as any);
      expect(result).toBe(false);
      expect(spy).toHaveBeenCalledWith('Invalid quiz result format');
    });

    it('returns false for session type with invalid result (missing fields)', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = saveProgress('js', 'session', { correct: true } as any);
      expect(result).toBe(false);
      expect(spy).toHaveBeenCalledWith('Invalid session result format');
    });

    it('returns false for unknown type (exhaustive check)', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = saveProgress('js', 'unknown' as any, { correct: true });
      expect(result).toBe(false);
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Unknown progress type'));
    });
  });

  // ==========================================================================
  // clearProgress
  // ==========================================================================
  describe('clearProgress', () => {
    it('clears progress for a specific language', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('python', { correct: true });
      clearProgress('js');
      const all = getAllProgress();
      expect(all['js']).toBeUndefined();
      expect(all['python']).toBeDefined();
    });

    it('clears all progress when no language specified', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('python', { correct: true });
      clearProgress();
      expect(getAllProgress()).toEqual({});
    });
  });

  // ==========================================================================
  // resetStreak
  // ==========================================================================
  describe('resetStreak', () => {
    it('resets current streak to 0 for a language', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true });
      expect(getProgress('js').drillStats.currentStreak).toBe(2);
      resetStreak('js');
      const p = getProgress('js');
      expect(p.drillStats.currentStreak).toBe(0);
      expect(p.drillStats.bestStreak).toBe(2); // bestStreak preserved
    });

    it('works on language with no prior progress', () => {
      const result = resetStreak('newlang');
      expect(result).toBe(true);
      expect(getProgress('newlang').drillStats.currentStreak).toBe(0);
    });
  });

  // ==========================================================================
  // Settings
  // ==========================================================================
  describe('getSettings', () => {
    it('returns default settings when nothing stored', () => {
      const s = getSettings();
      expect(s.preferredDifficulty).toBe('mixed');
      expect(s.soundEffects).toBe(false);
      expect(s.timerMode).toBe('up');
      expect(s.timerDuration).toBe(300);
      expect(s.theme).toBe('system');
      expect(s.showHints).toBe(true);
      expect(s.autoAdvance).toBe(false);
      expect(s.sessionLength).toBe(10);
    });

    it('merges stored settings with defaults', () => {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ theme: 'dark' }));
      const s = getSettings();
      expect(s.theme).toBe('dark');
      expect(s.timerDuration).toBe(300); // default
    });

    it('returns defaults on corrupted JSON', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem(SETTINGS_KEY, 'not-json!!!');
      const s = getSettings();
      expect(s.theme).toBe('system');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('saveSettings', () => {
    it('saves partial settings merged with current', () => {
      saveSettings({ theme: 'dark' });
      const s = getSettings();
      expect(s.theme).toBe('dark');
      expect(s.soundEffects).toBe(false); // default preserved
    });

    it('overwrites existing settings', () => {
      saveSettings({ theme: 'dark' });
      saveSettings({ theme: 'light' });
      expect(getSettings().theme).toBe('light');
    });
  });

  describe('resetSettings', () => {
    it('resets all settings to defaults', () => {
      saveSettings({ theme: 'dark', timerDuration: 600, showHints: false });
      resetSettings();
      const s = getSettings();
      expect(s.theme).toBe('system');
      expect(s.timerDuration).toBe(300);
      expect(s.showHints).toBe(true);
    });
  });

  describe('getSetting', () => {
    it('returns default value for a specific key', () => {
      expect(getSetting('theme')).toBe('system');
      expect(getSetting('timerDuration')).toBe(300);
      expect(getSetting('showHints')).toBe(true);
      expect(getSetting('soundEffects')).toBe(false);
    });

    it('returns custom value after save', () => {
      saveSettings({ theme: 'dark' });
      expect(getSetting('theme')).toBe('dark');
    });
  });

  describe('setSetting', () => {
    it('sets a single setting value', () => {
      setSetting('theme', 'dark');
      expect(getSetting('theme')).toBe('dark');
      expect(getSetting('showHints')).toBe(true); // others untouched
    });

    it('sets various setting types', () => {
      setSetting('timerDuration', 600);
      setSetting('soundEffects', true);
      setSetting('autoAdvance', true);
      expect(getSetting('timerDuration')).toBe(600);
      expect(getSetting('soundEffects')).toBe(true);
      expect(getSetting('autoAdvance')).toBe(true);
    });
  });

  // ==========================================================================
  // Export/Import
  // ==========================================================================
  describe('exportProgress', () => {
    it('exports current progress and settings', () => {
      saveDrillProgress('js', { correct: true });
      saveSettings({ theme: 'dark' });
      const data = exportProgress();
      expect(data.version).toBe('1.0.0');
      expect(data.exportDate).toBeDefined();
      expect(data.progress['js']).toBeDefined();
      expect(data.settings.theme).toBe('dark');
    });

    it('exports empty progress when nothing stored', () => {
      const data = exportProgress();
      expect(data.progress).toEqual({});
      expect(data.settings.theme).toBe('system'); // defaults
    });
  });

  describe('downloadProgress', () => {
    it('creates and triggers download of a JSON file', () => {
      const mockUrl = 'blob:http://localhost/fake-uuid';
      const createObjectURL = vi.fn(() => mockUrl);
      const revokeObjectURL = vi.fn();
      vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });

      const mockClick = vi.fn();
      const mockAnchor = {
        href: '',
        download: '',
        click: mockClick,
      } as unknown as HTMLAnchorElement;

      const createElementSpy = vi
        .spyOn(document, 'createElement')
        .mockReturnValue(mockAnchor as any);
      const appendChildSpy = vi
        .spyOn(document.body, 'appendChild')
        .mockReturnValue(mockAnchor as any);
      const removeChildSpy = vi
        .spyOn(document.body, 'removeChild')
        .mockReturnValue(mockAnchor as any);

      downloadProgress();

      expect(createObjectURL).toHaveBeenCalledTimes(1);
      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(mockAnchor.href).toBe(mockUrl);
      expect(mockAnchor.download).toMatch(/^coding-drills-backup-\d{4}-\d{2}-\d{2}\.json$/);
      expect(appendChildSpy).toHaveBeenCalledWith(mockAnchor);
      expect(mockClick).toHaveBeenCalledTimes(1);
      expect(removeChildSpy).toHaveBeenCalledWith(mockAnchor);
      expect(revokeObjectURL).toHaveBeenCalledWith(mockUrl);
    });
  });

  describe('importProgress', () => {
    it('imports valid data successfully', () => {
      const data = {
        version: '1.0.0',
        exportDate: '2025-01-01T00:00:00.000Z',
        progress: {
          js: {
            drillStats: {
              totalAttempted: 5,
              totalCorrect: 3,
              bestStreak: 2,
              currentStreak: 1,
              categoryStats: {},
              recentSessions: [],
            },
            quizStats: {
              highScore: 0,
              totalPlayed: 0,
              avgAccuracy: 0,
              bestStreak: 0,
              totalQuestions: 0,
              totalCorrect: 0,
            },
            regexStats: {
              totalAttempted: 0,
              totalCorrect: 0,
              bestStreak: 0,
              highScore: 0,
              totalPlayed: 0,
            },
            lastPlayed: '2025-01-01T00:00:00.000Z',
          },
        },
        settings: { theme: 'dark' },
      };
      const result = importProgress(data);
      expect(result).toEqual({ success: true });
      expect(getAllProgress()['js']).toBeDefined();
      expect(getSettings().theme).toBe('dark');
    });

    it('rejects null data', () => {
      expect(importProgress(null)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects non-object data', () => {
      expect(importProgress('string')).toEqual({ success: false, error: 'Invalid data format' });
      expect(importProgress(42)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects missing version', () => {
      const data = { exportDate: 'date', progress: {}, settings: {} };
      expect(importProgress(data)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects non-string version', () => {
      const data = { version: 123, exportDate: 'date', progress: {}, settings: {} };
      expect(importProgress(data)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects missing exportDate', () => {
      const data = { version: '1.0.0', progress: {}, settings: {} };
      expect(importProgress(data)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects non-string exportDate', () => {
      const data = { version: '1.0.0', exportDate: 123, progress: {}, settings: {} };
      expect(importProgress(data)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects missing progress', () => {
      const data = { version: '1.0.0', exportDate: 'date', settings: {} };
      expect(importProgress(data)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects null progress', () => {
      const data = { version: '1.0.0', exportDate: 'date', progress: null, settings: {} };
      expect(importProgress(data)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects missing settings', () => {
      const data = { version: '1.0.0', exportDate: 'date', progress: {} };
      expect(importProgress(data)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('rejects null settings', () => {
      const data = { version: '1.0.0', exportDate: 'date', progress: {}, settings: null };
      expect(importProgress(data)).toEqual({ success: false, error: 'Invalid data format' });
    });

    it('returns error when saving progress fails', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const data = {
        version: '1.0.0',
        exportDate: '2025-01-01T00:00:00.000Z',
        progress: {},
        settings: { theme: 'dark' },
      };
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceeded');
      });
      const result = importProgress(data);
      expect(result).toEqual({ success: false, error: 'Failed to save progress data' });
    });

    it('returns error when saving settings fails', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const data = {
        version: '1.0.0',
        exportDate: '2025-01-01T00:00:00.000Z',
        progress: {},
        settings: { theme: 'dark' },
      };
      // Let the first setItem (progress) succeed, then fail on second (settings)
      let callCount = 0;
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        callCount++;
        if (callCount > 1) {
          throw new Error('QuotaExceeded');
        }
      });
      const result = importProgress(data);
      expect(result).toEqual({ success: false, error: 'Failed to save settings data' });
    });

    it('handles Error thrown during import', () => {
      const data = {
        version: '1.0.0',
        exportDate: '2025-01-01T00:00:00.000Z',
        progress: {
          toJSON() {
            throw new Error('Serialize error');
          },
        },
        settings: {},
      };
      const result = importProgress(data);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Serialize error');
    });

    it('handles non-Error thrown during import', () => {
      const data = {
        version: '1.0.0',
        exportDate: '2025-01-01T00:00:00.000Z',
        progress: {
          toJSON() {
            throw 'string error';
          },
        },
        settings: {},
      };
      const result = importProgress(data);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unknown error occurred');
    });
  });

  describe('importFromFile', () => {
    it('imports valid JSON file', async () => {
      const validData = {
        version: '1.0.0',
        exportDate: '2025-01-01T00:00:00.000Z',
        progress: {},
        settings: { theme: 'dark' },
      };
      const file = new File([JSON.stringify(validData)], 'backup.json', {
        type: 'application/json',
      });
      const result = await importFromFile(file);
      expect(result).toEqual({ success: true });
    });

    it('returns error for invalid JSON file', async () => {
      const file = new File(['not valid json{{{'], 'bad.json', { type: 'application/json' });
      const result = await importFromFile(file);
      expect(result).toEqual({ success: false, error: 'Invalid JSON file' });
    });

    it('returns error for file read failure', async () => {
      const file = new File(['data'], 'test.json', { type: 'application/json' });

      // Mock FileReader as a proper constructor class
      let _capturedOnerror: (() => void) | null = null;
      class MockFileReader {
        onload: ((e: any) => void) | null = null;
        onerror: (() => void) | null = null;
        readAsText() {
          // Capture onerror so we can call it after readAsText is invoked
          _capturedOnerror = this.onerror;
          // Simulate async error
          setTimeout(() => {
            if (this.onerror) this.onerror();
          }, 0);
        }
      }
      vi.stubGlobal('FileReader', MockFileReader);

      const result = await importFromFile(file);
      expect(result).toEqual({ success: false, error: 'Failed to read file' });
    });

    it('handles file with valid JSON but invalid import data structure', async () => {
      const file = new File([JSON.stringify({ foo: 'bar' })], 'bad-structure.json', {
        type: 'application/json',
      });
      const result = await importFromFile(file);
      expect(result).toEqual({ success: false, error: 'Invalid data format' });
    });
  });

  // ==========================================================================
  // Statistics Helpers
  // ==========================================================================
  describe('getLanguageAccuracy', () => {
    it('returns 0 for language with no attempts', () => {
      expect(getLanguageAccuracy('js')).toBe(0);
    });

    it('calculates accuracy correctly', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: false });
      expect(getLanguageAccuracy('js')).toBeCloseTo(2 / 3);
    });

    it('returns 1 for perfect accuracy', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true });
      expect(getLanguageAccuracy('js')).toBe(1);
    });
  });

  describe('getTotalTimeSpent', () => {
    it('returns 0 when no sessions exist', () => {
      expect(getTotalTimeSpent('js')).toBe(0);
    });

    it('sums duration across all sessions', () => {
      saveDrillSession('js', {
        duration: 60,
        totalProblems: 5,
        correctAnswers: 3,
        accuracy: 0.6,
        streak: 2,
      });
      saveDrillSession('js', {
        duration: 120,
        totalProblems: 10,
        correctAnswers: 8,
        accuracy: 0.8,
        streak: 5,
      });
      saveDrillSession('js', {
        duration: 90,
        totalProblems: 8,
        correctAnswers: 6,
        accuracy: 0.75,
        streak: 4,
      });
      expect(getTotalTimeSpent('js')).toBe(270);
    });
  });

  describe('getLanguagesByRecent', () => {
    it('returns empty array when no progress', () => {
      expect(getLanguagesByRecent()).toEqual([]);
    });

    it('returns languages sorted by most recently played', async () => {
      // Save in order: python first, then js. js should be most recent.
      saveDrillProgress('python', { correct: true });
      // Small delay to ensure different timestamps
      await new Promise((r) => setTimeout(r, 10));
      saveDrillProgress('javascript', { correct: true });

      const langs = getLanguagesByRecent();
      expect(langs).toHaveLength(2);
      expect(langs[0]).toBe('javascript');
      expect(langs[1]).toBe('python');
    });

    it('handles single language', () => {
      saveDrillProgress('rust', { correct: true });
      expect(getLanguagesByRecent()).toEqual(['rust']);
    });
  });

  describe('getOverallStats', () => {
    it('returns zeros when no progress exists', () => {
      const stats = getOverallStats();
      expect(stats.totalAttempted).toBe(0);
      expect(stats.totalCorrect).toBe(0);
      expect(stats.overallAccuracy).toBe(0);
      expect(stats.totalTimeSpent).toBe(0);
      expect(stats.languagesLearned).toBe(0);
    });

    it('aggregates stats across multiple languages', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: false });
      saveDrillProgress('python', { correct: true });
      saveDrillProgress('python', { correct: true });

      saveDrillSession('js', {
        duration: 60,
        totalProblems: 5,
        correctAnswers: 3,
        accuracy: 0.6,
        streak: 2,
      });
      saveDrillSession('python', {
        duration: 90,
        totalProblems: 8,
        correctAnswers: 6,
        accuracy: 0.75,
        streak: 4,
      });

      const stats = getOverallStats();
      expect(stats.totalAttempted).toBe(4);
      expect(stats.totalCorrect).toBe(3);
      expect(stats.overallAccuracy).toBeCloseTo(0.75);
      expect(stats.totalTimeSpent).toBe(150);
      expect(stats.languagesLearned).toBe(2);
    });

    it('calculates correct accuracy with all correct', () => {
      saveDrillProgress('js', { correct: true });
      saveDrillProgress('js', { correct: true });
      const stats = getOverallStats();
      expect(stats.overallAccuracy).toBe(1);
    });
  });

  // ==========================================================================
  // Default namespace export (storage object)
  // ==========================================================================
  describe('storage default export', () => {
    it('exposes all progress functions', () => {
      expect(typeof storage.getAllProgress).toBe('function');
      expect(typeof storage.getProgress).toBe('function');
      expect(typeof storage.saveProgress).toBe('function');
      expect(typeof storage.saveDrillProgress).toBe('function');
      expect(typeof storage.saveQuizProgress).toBe('function');
      expect(typeof storage.saveRegexProgress).toBe('function');
      expect(typeof storage.saveDrillSession).toBe('function');
      expect(typeof storage.clearProgress).toBe('function');
      expect(typeof storage.resetStreak).toBe('function');
    });

    it('exposes all settings functions', () => {
      expect(typeof storage.getSettings).toBe('function');
      expect(typeof storage.saveSettings).toBe('function');
      expect(typeof storage.resetSettings).toBe('function');
      expect(typeof storage.getSetting).toBe('function');
      expect(typeof storage.setSetting).toBe('function');
    });

    it('exposes all export/import functions', () => {
      expect(typeof storage.exportProgress).toBe('function');
      expect(typeof storage.downloadProgress).toBe('function');
      expect(typeof storage.importProgress).toBe('function');
      expect(typeof storage.importFromFile).toBe('function');
    });

    it('exposes all statistics functions', () => {
      expect(typeof storage.getLanguageAccuracy).toBe('function');
      expect(typeof storage.getTotalTimeSpent).toBe('function');
      expect(typeof storage.getLanguagesByRecent).toBe('function');
      expect(typeof storage.getOverallStats).toBe('function');
    });

    it('exposes isBrowser helper', () => {
      expect(typeof storage.isBrowser).toBe('function');
      expect(storage.isBrowser()).toBe(true); // jsdom environment
    });

    it('works via namespace calls identically', () => {
      storage.saveDrillProgress('js', { correct: true });
      const p = storage.getProgress('js');
      expect(p.drillStats.totalAttempted).toBe(1);
      storage.clearProgress();
      expect(storage.getAllProgress()).toEqual({});
    });
  });

  // ==========================================================================
  // localStorage error handling (safeGetItem / safeSetItem / safeRemoveItem)
  // ==========================================================================
  describe('localStorage error handling', () => {
    it('handles localStorage.getItem throwing', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage disabled');
      });
      expect(getAllProgress()).toEqual({});
      expect(spy).toHaveBeenCalled();
    });

    it('handles localStorage.setItem throwing (quota exceeded)', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });
      const result = saveDrillProgress('js', { correct: true });
      expect(result).toBe(false);
      expect(spy).toHaveBeenCalled();
    });

    it('handles localStorage.removeItem throwing', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      // First save some data successfully
      saveDrillProgress('js', { correct: true });
      // Then mock removeItem to throw
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Storage error');
      });
      const result = clearProgress();
      expect(result).toBe(false);
      expect(spy).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // generateSessionId (tested indirectly)
  // ==========================================================================
  describe('generateSessionId (indirect)', () => {
    it('generates unique session IDs', () => {
      saveDrillSession('js', {
        duration: 10,
        totalProblems: 1,
        correctAnswers: 1,
        accuracy: 1,
        streak: 1,
      });
      saveDrillSession('js', {
        duration: 20,
        totalProblems: 2,
        correctAnswers: 2,
        accuracy: 1,
        streak: 2,
      });
      const p = getProgress('js');
      const ids = p.drillStats.recentSessions.map((s) => s.id);
      expect(ids[0]).not.toBe(ids[1]);
    });

    it('generates IDs with timestamp prefix', () => {
      saveDrillSession('js', {
        duration: 10,
        totalProblems: 1,
        correctAnswers: 1,
        accuracy: 1,
        streak: 1,
      });
      const p = getProgress('js');
      const id = p.drillStats.recentSessions[0].id;
      // ID should start with a timestamp (digits) followed by a dash
      expect(id).toMatch(/^\d+-/);
    });

    it('falls back to Math.random when crypto.randomUUID is unavailable', () => {
      const originalCrypto = globalThis.crypto;
      // Remove randomUUID to test fallback
      vi.stubGlobal('crypto', { getRandomValues: originalCrypto.getRandomValues });

      saveDrillSession('js', {
        duration: 10,
        totalProblems: 1,
        correctAnswers: 1,
        accuracy: 1,
        streak: 1,
      });
      const p = getProgress('js');
      const id = p.drillStats.recentSessions[0].id;
      expect(id).toMatch(/^\d+-/);

      vi.stubGlobal('crypto', originalCrypto);
    });
  });
});
