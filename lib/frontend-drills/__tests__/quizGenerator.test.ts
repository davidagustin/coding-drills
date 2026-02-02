import { describe, expect, it } from 'vitest';
import { getQuizQuestions } from '../quiz/index';
import {
  calculateFrontendQuizResults,
  calculateFrontendQuizScore,
  type FrontendQuizConfig,
  generateFrontendQuiz,
} from '../quizGenerator';

describe('Frontend Drills - quizGenerator', () => {
  describe('generateFrontendQuiz', () => {
    it('should return array of questions', () => {
      const config: FrontendQuizConfig = {
        framework: 'react',
        categories: [],
        questionCount: 5,
        timePerQuestion: 20,
      };
      const quiz = generateFrontendQuiz(config);
      expect(Array.isArray(quiz)).toBe(true);
      expect(quiz.length).toBeLessThanOrEqual(5);
    });

    it('should respect questionCount', () => {
      const config: FrontendQuizConfig = {
        framework: 'react',
        categories: [],
        questionCount: 3,
        timePerQuestion: 0,
      };
      const quiz = generateFrontendQuiz(config);
      expect(quiz.length).toBeLessThanOrEqual(3);
    });

    it('should only include questions from selected framework', () => {
      const config: FrontendQuizConfig = {
        framework: 'vue',
        categories: [],
        questionCount: 10,
        timePerQuestion: 0,
      };
      const quiz = generateFrontendQuiz(config);
      for (const q of quiz) {
        expect(q.framework).toBe('vue');
      }
    });

    it('should filter by categories when provided', () => {
      const config: FrontendQuizConfig = {
        framework: 'react',
        categories: ['State & Lifecycle'],
        questionCount: 20,
        timePerQuestion: 0,
      };
      const quiz = generateFrontendQuiz(config);
      for (const q of quiz) {
        expect(q.category).toBe('State & Lifecycle');
      }
    });

    it('should not return duplicate question ids in a single quiz', () => {
      const config: FrontendQuizConfig = {
        framework: 'react',
        categories: [],
        questionCount: 50,
        timePerQuestion: 0,
      };
      const quiz = generateFrontendQuiz(config);
      const ids = quiz.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should return at most available questions for framework', () => {
      const config: FrontendQuizConfig = {
        framework: 'react',
        categories: [],
        questionCount: 999,
        timePerQuestion: 0,
      };
      const available = getQuizQuestions('react');
      const quiz = generateFrontendQuiz(config);
      expect(quiz.length).toBeLessThanOrEqual(available.length);
    });
  });

  describe('calculateFrontendQuizScore', () => {
    it('should return zero points for incorrect answer', () => {
      const result = calculateFrontendQuizScore(false, 5, 20, 0);
      expect(result.totalPoints).toBe(0);
      expect(result.basePoints).toBe(0);
      expect(result.speedBonus).toBe(0);
      expect(result.streakBonus).toBe(0);
    });

    it('should return base 100 for correct answer', () => {
      const result = calculateFrontendQuizScore(true, 10, 20, 0);
      expect(result.basePoints).toBe(100);
      expect(result.totalPoints).toBeGreaterThanOrEqual(100);
    });

    it('should give speed bonus when time is under limit', () => {
      const result = calculateFrontendQuizScore(true, 2, 20, 0);
      expect(result.speedBonus).toBeGreaterThanOrEqual(0);
      expect(result.totalPoints).toBeGreaterThanOrEqual(100);
    });

    it('should apply streak multiplier', () => {
      const noStreak = calculateFrontendQuizScore(true, 10, 0, 0);
      const withStreak = calculateFrontendQuizScore(true, 10, 0, 3);
      expect(withStreak.totalPoints).toBeGreaterThanOrEqual(noStreak.totalPoints);
      expect(withStreak.streakBonus).toBeGreaterThanOrEqual(0);
    });

    it('should cap streak multiplier at 2x', () => {
      const highStreak = calculateFrontendQuizScore(true, 10, 0, 20);
      expect(highStreak.totalPoints).toBeLessThanOrEqual(300);
    });
  });

  describe('calculateFrontendQuizResults', () => {
    it('should aggregate answers into result', () => {
      const answers = [
        { questionId: '1', selectedOption: 'A', isCorrect: true, timeSpent: 5, points: 120 },
        { questionId: '2', selectedOption: 'B', isCorrect: false, timeSpent: 10, points: 0 },
        { questionId: '3', selectedOption: 'C', isCorrect: true, timeSpent: 8, points: 110 },
      ];
      const result = calculateFrontendQuizResults(answers, 2, 0, 25000);
      expect(result.totalScore).toBe(230);
      expect(result.correctAnswers).toBe(2);
      expect(result.totalQuestions).toBe(3);
      expect(result.accuracy).toBe(67);
      expect(result.maxStreak).toBe(2);
    });

    it('should compute average time and total time', () => {
      const answers = [
        { questionId: '1', selectedOption: 'A', isCorrect: true, timeSpent: 5, points: 100 },
        { questionId: '2', selectedOption: 'B', isCorrect: true, timeSpent: 15, points: 100 },
      ];
      const startTime = 0;
      const endTime = 30000;
      const result = calculateFrontendQuizResults(answers, 1, startTime, endTime);
      expect(result.averageTime).toBe(10);
      expect(result.totalTime).toBe(30);
      expect(result.fastestAnswer).toBe(5);
      expect(result.slowestAnswer).toBe(15);
    });

    it('should handle empty answers', () => {
      const result = calculateFrontendQuizResults([], 0, 0, 0);
      expect(result.totalScore).toBe(0);
      expect(result.correctAnswers).toBe(0);
      expect(result.totalQuestions).toBe(0);
      expect(result.accuracy).toBe(0);
    });
  });
});
