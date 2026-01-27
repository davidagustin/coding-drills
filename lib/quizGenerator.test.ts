import { describe, expect, it } from 'vitest';
import type { QuizConfig } from './quizGenerator';
import { calculateQuizResults, calculateScore, generateQuiz } from './quizGenerator';

describe('quizGenerator', () => {
  describe('calculateScore', () => {
    it('should return 0 for incorrect answers', () => {
      const score = calculateScore(false, 10, 30, 0);
      expect(score.totalPoints).toBe(0);
      expect(score.wasCorrect).toBe(false);
    });

    it('should award base points for correct answer', () => {
      const score = calculateScore(true, 20, 30, 0);
      expect(score.totalPoints).toBe(10); // Base 10, no bonus (time > half)
      expect(score.wasCorrect).toBe(true);
    });

    it('should award fast bonus', () => {
      const score = calculateScore(true, 5, 30, 0);
      expect(score.totalPoints).toBe(15); // Base 10 + Bonus 5
      expect(score.wasFast).toBe(true);
    });

    it('should apply streak multiplier (3x)', () => {
      const score = calculateScore(true, 20, 30, 3);
      expect(score.totalPoints).toBe(20); // 10 * 2
    });

    it('should apply streak multiplier (5x)', () => {
      // Code says streak >= 5 is 3x
      const score = calculateScore(true, 20, 30, 5);
      expect(score.totalPoints).toBe(30); // 10 * 3
    });
  });

  describe('calculateQuizResults', () => {
    it('should calculate stats correctly', () => {
      const answers = [
        { questionId: '1', selectedOption: 'a', isCorrect: true, timeSpent: 1000, points: 10 },
        { questionId: '2', selectedOption: 'b', isCorrect: false, timeSpent: 2000, points: 0 },
      ];
      const results = calculateQuizResults(answers, 2, 0, 5000);

      expect(results.correctAnswers).toBe(1);
      expect(results.totalQuestions).toBe(2);
      expect(results.accuracy).toBe(50);
      expect(results.totalScore).toBe(10);
      expect(results.averageTime).toBe(1500);
      expect(results.maxStreak).toBe(2);
      expect(results.totalTime).toBe(5); // 5000ms / 1000
    });
  });

  describe('generateQuiz', () => {
    it('should generate questions for method quiz', () => {
      const config: QuizConfig = {
        language: 'javascript',
        categories: [],
        questionCount: 5,
        timePerQuestion: 30,
        quizType: 'methods',
      };

      const questions = generateQuiz(config);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions[0]).toHaveProperty('id');
      expect(questions[0]).toHaveProperty('options');
      expect(questions[0].options.length).toBe(4);
    });

    it('should generate complexity quiz', () => {
      const config: QuizConfig = {
        language: 'javascript',
        categories: [],
        questionCount: 5,
        timePerQuestion: 30,
        quizType: 'time-complexity',
      };
      const questions = generateQuiz(config);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions[0].methodHint).toBe('Time Complexity');
    });
  });
});
