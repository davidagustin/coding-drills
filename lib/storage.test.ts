// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import storage, {
  clearProgress,
  getOverallStats,
  getSettings,
  saveDrillProgress,
  saveSettings,
} from './storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('basics', () => {
    it('should operate on localStorage', () => {
      localStorage.setItem('test', 'value');
      expect(localStorage.getItem('test')).toBe('value');
    });
  });

  describe('Progress Storage', () => {
    it('should save drill progress for a new language', () => {
      const result = {
        correct: true,
        category: 'arrays',
        difficulty: 'easy' as const,
        timeSpent: 10,
      };

      saveDrillProgress('javascript', result);

      const stored = localStorage.getItem('coding-drills-progress');
      expect(stored).toBeTruthy();
      const data = JSON.parse(stored!);
      expect(data['javascript']).toBeDefined();
      expect(data['javascript'].drillStats.totalAttempted).toBe(1);
      expect(data['javascript'].drillStats.totalCorrect).toBe(1);
      expect(data['javascript'].drillStats.categoryStats['arrays'].correct).toBe(1);
    });

    it('should update existing progress', () => {
      saveDrillProgress('javascript', { correct: true });
      saveDrillProgress('javascript', { correct: false });

      const data = storage.getProgress('javascript');
      expect(data.drillStats.totalAttempted).toBe(2);
      expect(data.drillStats.totalCorrect).toBe(1);
      expect(data.drillStats.currentStreak).toBe(0); // reset on failure
    });
  });

  describe('Settings Storage', () => {
    it('should return default settings if empty', () => {
      const settings = getSettings();
      expect(settings.theme).toBe('system');
      expect(settings.timerDuration).toBe(300);
    });

    it('should save and retrieve settings', () => {
      saveSettings({ theme: 'dark', timerDuration: 600 });
      const settings = getSettings();
      expect(settings.theme).toBe('dark');
      expect(settings.timerDuration).toBe(600);
      // merged with defaults
      expect(settings.showHints).toBe(true);
    });
  });

  describe('Utilities', () => {
    it('should clear progress', () => {
      saveDrillProgress('javascript', { correct: true });
      expect(storage.getAllProgress()['javascript']).toBeDefined();

      clearProgress();
      expect(storage.getAllProgress()).toEqual({});
    });

    it('should calculate overall stats', () => {
      saveDrillProgress('javascript', { correct: true });
      saveDrillProgress('python', { correct: true });

      const stats = getOverallStats();
      expect(stats.totalAttempted).toBe(2);
      expect(stats.languagesLearned).toBe(2);
      expect(stats.overallAccuracy).toBe(1);
    });
  });
});
