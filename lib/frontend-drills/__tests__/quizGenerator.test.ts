import { describe, expect, it } from 'vitest';
import {
  calculateFrontendQuizResults,
  calculateFrontendQuizScore,
  type FrontendQuizAnswer,
  type FrontendQuizConfig,
  generateFrontendQuiz,
} from '../quizGenerator';

describe('frontend-drills quizGenerator', () => {
  describe('generateFrontendQuiz', () => {
    it('should return array of questions for valid config', () => {
      const config: FrontendQuizConfig = {
        framework: 'react',
        categories: [],
        questionCount: 5,
        timePerQuestion: 30,
      };
      const questions = generateFrontendQuiz(config);
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeLessThanOrEqual(5);
      if (questions.length > 0) {
        expect(questions[0]).toHaveProperty('id');
        expect(questions[0]).toHaveProperty('question');
        expect(questions[0]).toHaveProperty('options');
        expect(questions[0].options).toHaveLength(4);
        expect(questions[0]).toHaveProperty('correctAnswer');
        expect(questions[0]).toHaveProperty('explanation');
      }
    });

    it('should respect questionCount', () => {
      const config: FrontendQuizConfig = {
        framework: 'react',
        categories: [],
        questionCount: 3,
        timePerQuestion: 0,
      };
      const questions = generateFrontendQuiz(config);
      expect(questions.length).toBeLessThanOrEqual(3);
    });

    it('should filter by categories when provided', () => {
      const config: FrontendQuizConfig = {
        framework: 'react',
        categories: ['State & Lifecycle'],
        questionCount: 20,
        timePerQuestion: 0,
      };
      const questions = generateFrontendQuiz(config);
      for (const q of questions) {
        expect(q.category).toBe('State & Lifecycle');
      }
    });

    it('should work for all frameworks', () => {
      const frameworks = ['native-js', 'react', 'angular', 'vue'] as const;
      for (const fw of frameworks) {
        const questions = generateFrontendQuiz({
          framework: fw,
          categories: [],
          questionCount: 2,
          timePerQuestion: 0,
        });
        expect(Array.isArray(questions)).toBe(true);
        for (const q of questions) {
          expect(q.framework).toBe(fw);
        }
      }
    });
  });

  describe('calculateFrontendQuizScore', () => {
    it('should return 0 for incorrect answer', () => {
      const result = calculateFrontendQuizScore(false, 10, 30, 0);
      expect(result.totalPoints).toBe(0);
      expect(result.basePoints).toBe(0);
      expect(result.speedBonus).toBe(0);
      expect(result.streakBonus).toBe(0);
    });

    it('should award base points for correct answer', () => {
      const result = calculateFrontendQuizScore(true, 20, 30, 0);
      expect(result.basePoints).toBe(100);
      expect(result.totalPoints).toBeGreaterThanOrEqual(100);
    });

    it('should award speed bonus when time is under limit', () => {
      const result = calculateFrontendQuizScore(true, 5, 30, 0);
      expect(result.speedBonus).toBeGreaterThanOrEqual(0);
      expect(result.totalPoints).toBeGreaterThan(100);
    });

    it('should apply streak bonus', () => {
      const noStreak = calculateFrontendQuizScore(true, 15, 30, 0);
      const withStreak = calculateFrontendQuizScore(true, 15, 30, 5);
      expect(withStreak.totalPoints).toBeGreaterThan(noStreak.totalPoints);
      expect(withStreak.streakBonus).toBeGreaterThanOrEqual(0);
    });

    it('should return 0 speed bonus when timeLimit is 0', () => {
      const result = calculateFrontendQuizScore(true, 1, 0, 0);
      expect(result.speedBonus).toBe(0);
      expect(result.basePoints).toBe(100);
    });
  });

  describe('calculateFrontendQuizResults', () => {
    it('should aggregate answers correctly', () => {
      const answers: FrontendQuizAnswer[] = [
        {
          questionId: '1',
          selectedOption: 'A',
          isCorrect: true,
          timeSpent: 10,
          points: 120,
        },
        {
          questionId: '2',
          selectedOption: 'B',
          isCorrect: false,
          timeSpent: 15,
          points: 0,
        },
      ];
      const startTime = 0;
      const endTime = 30000; // 30 seconds
      const results = calculateFrontendQuizResults(answers, 1, startTime, endTime);

      expect(results.totalScore).toBe(120);
      expect(results.correctAnswers).toBe(1);
      expect(results.totalQuestions).toBe(2);
      expect(results.accuracy).toBe(50);
      expect(results.maxStreak).toBe(1);
      expect(results.totalTime).toBe(30);
      expect(results.basePoints).toBe(100);
      expect(results.bonusPoints).toBe(20);
    });

    it('should handle empty answers', () => {
      const results = calculateFrontendQuizResults([], 0, 0, 0);
      expect(results.totalScore).toBe(0);
      expect(results.correctAnswers).toBe(0);
      expect(results.totalQuestions).toBe(0);
      expect(results.accuracy).toBe(0);
      expect(results.averageTime).toBe(0);
      expect(results.fastestAnswer).toBe(0);
      expect(results.slowestAnswer).toBe(0);
    });

    it('should compute average time and fastest/slowest', () => {
      const answers: FrontendQuizAnswer[] = [
        { questionId: '1', selectedOption: 'A', isCorrect: true, timeSpent: 5, points: 100 },
        { questionId: '2', selectedOption: 'B', isCorrect: true, timeSpent: 15, points: 100 },
      ];
      const results = calculateFrontendQuizResults(answers, 2, 0, 20000);
      expect(results.averageTime).toBe(10);
      expect(results.fastestAnswer).toBe(5);
      expect(results.slowestAnswer).toBe(15);
    });
  });
});
