// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { QuizAnswer, QuizConfig } from './quizGenerator';
import {
  addToLeaderboard,
  calculateQuizResults,
  calculateScore,
  clearLeaderboard,
  generateQuiz,
  getHintForQuestion,
  getLeaderboard,
  getLeaderboardPosition,
  getMethodInfo,
} from './quizGenerator';

describe('quizGenerator', () => {
  // ============================================================
  // calculateScore
  // ============================================================
  describe('calculateScore', () => {
    it('should return 0 for incorrect answers', () => {
      const score = calculateScore(false, 10, 30, 0);
      expect(score.totalPoints).toBe(0);
      expect(score.basePoints).toBe(0);
      expect(score.bonusPoints).toBe(0);
      expect(score.wasCorrect).toBe(false);
      expect(score.wasFast).toBe(false);
    });

    it('should award base points for correct answer (slow)', () => {
      const score = calculateScore(true, 20, 30, 0);
      expect(score.basePoints).toBe(10);
      expect(score.bonusPoints).toBe(0);
      expect(score.totalPoints).toBe(10);
      expect(score.wasCorrect).toBe(true);
      expect(score.wasFast).toBe(false);
    });

    it('should award fast bonus when time is under half', () => {
      const score = calculateScore(true, 5, 30, 0);
      expect(score.totalPoints).toBe(15); // 10 base + 5 fast bonus
      expect(score.wasFast).toBe(true);
      expect(score.bonusPoints).toBe(5);
    });

    it('should treat wasFast as true when timeSpent equals exactly halfTime', () => {
      // halfTime = 30 / 2 = 15; timeSpent <= halfTime => 15 <= 15 => true
      const score = calculateScore(true, 15, 30, 0);
      expect(score.wasFast).toBe(true);
      expect(score.totalPoints).toBe(15); // 10 + 5
    });

    it('should apply 2x streak multiplier when streak >= 3', () => {
      const score = calculateScore(true, 20, 30, 3);
      expect(score.totalPoints).toBe(20); // 10 * 2
      expect(score.basePoints).toBe(20); // 10 * 2
    });

    it('should apply 2x streak multiplier when streak is 4', () => {
      const score = calculateScore(true, 20, 30, 4);
      expect(score.totalPoints).toBe(20); // 10 * 2
    });

    it('should apply 3x streak multiplier when streak >= 5', () => {
      const score = calculateScore(true, 20, 30, 5);
      expect(score.totalPoints).toBe(30); // 10 * 3
    });

    it('should apply 3x streak multiplier when streak is 10', () => {
      const score = calculateScore(true, 20, 30, 10);
      expect(score.totalPoints).toBe(30); // 10 * 3
    });

    it('should apply both fast bonus and streak multiplier', () => {
      const score = calculateScore(true, 5, 30, 5);
      // (10 + 5) * 3 = 45
      expect(score.totalPoints).toBe(45);
      expect(score.basePoints).toBe(30); // 10 * 3
      expect(score.bonusPoints).toBe(15); // 5 * 3
      expect(score.wasFast).toBe(true);
    });
  });

  // ============================================================
  // calculateQuizResults
  // ============================================================
  describe('calculateQuizResults', () => {
    it('should calculate stats correctly for mixed answers', () => {
      const answers: QuizAnswer[] = [
        { questionId: '1', selectedOption: 'a', isCorrect: true, timeSpent: 1000, points: 10 },
        { questionId: '2', selectedOption: 'b', isCorrect: false, timeSpent: 2000, points: 0 },
      ];
      const results = calculateQuizResults(answers, 2, 0, 5000);

      expect(results.correctAnswers).toBe(1);
      expect(results.totalQuestions).toBe(2);
      expect(results.accuracy).toBe(50);
      expect(results.totalScore).toBe(10);
      expect(results.averageTime).toBe(1500);
      expect(results.fastestAnswer).toBe(1000);
      expect(results.slowestAnswer).toBe(2000);
      expect(results.maxStreak).toBe(2);
      expect(results.totalTime).toBe(5);
    });

    it('should handle an empty answers array', () => {
      const results = calculateQuizResults([], 0, 0, 10000);

      expect(results.correctAnswers).toBe(0);
      expect(results.totalQuestions).toBe(0);
      expect(results.accuracy).toBe(0);
      expect(results.totalScore).toBe(0);
      expect(results.averageTime).toBe(0);
      expect(results.fastestAnswer).toBe(0);
      expect(results.slowestAnswer).toBe(0);
      expect(results.maxStreak).toBe(0);
      expect(results.totalTime).toBe(10);
    });

    it('should handle all correct answers', () => {
      const answers: QuizAnswer[] = [
        { questionId: '1', selectedOption: 'a', isCorrect: true, timeSpent: 500, points: 15 },
        { questionId: '2', selectedOption: 'b', isCorrect: true, timeSpent: 800, points: 15 },
        { questionId: '3', selectedOption: 'c', isCorrect: true, timeSpent: 600, points: 15 },
      ];
      const results = calculateQuizResults(answers, 3, 0, 3000);

      expect(results.correctAnswers).toBe(3);
      expect(results.totalQuestions).toBe(3);
      expect(results.accuracy).toBe(100);
      expect(results.totalScore).toBe(45);
      expect(results.fastestAnswer).toBe(500);
      expect(results.slowestAnswer).toBe(800);
      // bonusPoints = totalScore - basePoints = 45 - 30 = 15
      expect(results.basePoints).toBe(30);
      expect(results.bonusPoints).toBe(15);
    });

    it('should clamp bonusPoints to zero when totalScore < basePoints estimate', () => {
      // If a user got 2 correct but only 10 total points (less than 20 estimated base)
      const answers: QuizAnswer[] = [
        { questionId: '1', selectedOption: 'a', isCorrect: true, timeSpent: 500, points: 5 },
        { questionId: '2', selectedOption: 'b', isCorrect: true, timeSpent: 800, points: 5 },
      ];
      const results = calculateQuizResults(answers, 2, 0, 5000);

      expect(results.basePoints).toBe(20); // 2 * 10
      expect(results.bonusPoints).toBe(0); // Math.max(0, 10 - 20)
    });
  });

  // ============================================================
  // generateQuiz
  // ============================================================
  describe('generateQuiz', () => {
    it('should generate method quiz questions with correct structure', () => {
      const config: QuizConfig = {
        language: 'javascript',
        categories: [],
        questionCount: 5,
        timePerQuestion: 30,
        quizType: 'methods',
      };

      const questions = generateQuiz(config);
      expect(questions).toHaveLength(5);
      for (const q of questions) {
        expect(q).toHaveProperty('id');
        expect(q).toHaveProperty('input');
        expect(q).toHaveProperty('output');
        expect(q).toHaveProperty('correctMethod');
        expect(q).toHaveProperty('options');
        expect(q.options).toHaveLength(4);
        expect(q).toHaveProperty('difficulty');
        expect(q.options).toContain(q.correctMethod);
      }
    });

    it('should generate time-complexity quiz questions', () => {
      const config: QuizConfig = {
        language: 'javascript',
        categories: [],
        questionCount: 5,
        timePerQuestion: 30,
        quizType: 'time-complexity',
      };
      const questions = generateQuiz(config);
      expect(questions.length).toBeGreaterThan(0);
      for (const q of questions) {
        expect(q.methodHint).toBe('Time Complexity');
        expect(q.options).toHaveLength(4);
        expect(q.options).toContain(q.correctMethod);
      }
    });

    it('should generate space-complexity quiz questions', () => {
      const config: QuizConfig = {
        language: 'javascript',
        categories: [],
        questionCount: 3,
        timePerQuestion: 30,
        quizType: 'space-complexity',
      };
      const questions = generateQuiz(config);
      expect(questions).toHaveLength(3);
      for (const q of questions) {
        expect(q.methodHint).toBe('Space Complexity');
        expect(q.options).toHaveLength(4);
        expect(q.options).toContain(q.correctMethod);
      }
    });

    it('should filter by specific categories for method quiz', () => {
      const config: QuizConfig = {
        language: 'javascript',
        categories: ['arrays'],
        questionCount: 3,
        timePerQuestion: 30,
        quizType: 'methods',
      };

      const questions = generateQuiz(config);
      expect(questions).toHaveLength(3);
      // All questions should come from the arrays category
      for (const q of questions) {
        expect(q.category).toBe('arrays');
      }
    });

    it('should filter by specific categories for complexity quiz', () => {
      const config: QuizConfig = {
        language: 'javascript',
        categories: ['sorting'],
        questionCount: 3,
        timePerQuestion: 30,
        quizType: 'time-complexity',
      };

      const questions = generateQuiz(config);
      expect(questions).toHaveLength(3);
      for (const q of questions) {
        expect(q.category).toBe('sorting');
      }
    });

    it('should repeat methods when fewer eligible methods than questionCount', () => {
      // Use a very specific category with few methods and ask for many questions
      const config: QuizConfig = {
        language: 'javascript',
        categories: ['arrays'],
        questionCount: 50,
        timePerQuestion: 30,
        quizType: 'methods',
      };

      const questions = generateQuiz(config);
      expect(questions).toHaveLength(50);
    });

    it('should repeat complexity questions when fewer eligible than needed', () => {
      // 'linked-lists' category has limited questions
      const config: QuizConfig = {
        language: 'javascript',
        categories: ['linked-lists'],
        questionCount: 20,
        timePerQuestion: 30,
        quizType: 'time-complexity',
      };

      const questions = generateQuiz(config);
      expect(questions).toHaveLength(20);
    });
  });

  // ============================================================
  // getHintForQuestion
  // ============================================================
  describe('getHintForQuestion', () => {
    it('should return method description when method is found', () => {
      const config: QuizConfig = {
        language: 'javascript',
        categories: [],
        questionCount: 1,
        timePerQuestion: 30,
        quizType: 'methods',
      };
      const questions = generateQuiz(config);
      const hint = getHintForQuestion(questions[0], 'javascript');
      // Should be a non-empty string that is either the description or fallback
      expect(typeof hint).toBe('string');
      expect(hint.length).toBeGreaterThan(0);
    });

    it('should return "No hint available" for unknown method', () => {
      const fakeQuestion = {
        id: 'q-fake',
        input: 'test',
        output: 'test',
        correctMethod: 'nonexistent_method_xyz',
        options: ['a', 'b', 'c', 'd'],
        difficulty: 'easy' as const,
      };
      const hint = getHintForQuestion(fakeQuestion, 'javascript');
      expect(hint).toBe('No hint available');
    });
  });

  // ============================================================
  // getMethodInfo
  // ============================================================
  describe('getMethodInfo', () => {
    it('should return method info when found', () => {
      const info = getMethodInfo('map', 'javascript');
      expect(info).toBeDefined();
      expect(info?.name).toBe('map');
      expect(info?.category).toBe('arrays');
      expect(info?.description).toBeTruthy();
    });

    it('should return undefined for non-existent method', () => {
      const info = getMethodInfo('nonexistent_method_xyz', 'javascript');
      expect(info).toBeUndefined();
    });

    it('should find python methods', () => {
      const info = getMethodInfo('append', 'python');
      expect(info).toBeDefined();
      expect(info?.name).toBe('append');
    });
  });

  // ============================================================
  // Leaderboard functions
  // ============================================================
  describe('leaderboard', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    afterEach(() => {
      localStorage.clear();
    });

    describe('getLeaderboard', () => {
      it('should return empty array when no data exists', () => {
        const board = getLeaderboard();
        expect(board).toEqual([]);
      });

      it('should return stored leaderboard entries', () => {
        const entries = [
          {
            id: 'lb-1',
            playerName: 'Alice',
            score: 100,
            accuracy: 90,
            language: 'javascript',
            questionCount: 10,
            date: '2025-01-01T00:00:00.000Z',
          },
        ];
        localStorage.setItem('coding-drills-leaderboard', JSON.stringify(entries));

        const board = getLeaderboard();
        expect(board).toHaveLength(1);
        expect(board[0].playerName).toBe('Alice');
        expect(board[0].score).toBe(100);
      });

      it('should return empty array for corrupted JSON', () => {
        localStorage.setItem('coding-drills-leaderboard', '{invalid json!!!');
        const board = getLeaderboard();
        expect(board).toEqual([]);
      });
    });

    describe('addToLeaderboard', () => {
      it('should add an entry and return it with generated id and date', () => {
        const entry = addToLeaderboard({
          playerName: 'Bob',
          score: 50,
          accuracy: 80,
          language: 'javascript' as const,
          questionCount: 5,
        });

        expect(entry.playerName).toBe('Bob');
        expect(entry.score).toBe(50);
        expect(entry.id).toMatch(/^lb-/);
        expect(entry.date).toBeTruthy();

        const board = getLeaderboard();
        expect(board).toHaveLength(1);
        expect(board[0].playerName).toBe('Bob');
      });

      it('should sort entries by score descending', () => {
        addToLeaderboard({
          playerName: 'Low',
          score: 10,
          accuracy: 50,
          language: 'javascript' as const,
          questionCount: 5,
        });
        addToLeaderboard({
          playerName: 'High',
          score: 100,
          accuracy: 95,
          language: 'javascript' as const,
          questionCount: 5,
        });
        addToLeaderboard({
          playerName: 'Mid',
          score: 50,
          accuracy: 75,
          language: 'javascript' as const,
          questionCount: 5,
        });

        const board = getLeaderboard();
        expect(board[0].playerName).toBe('High');
        expect(board[1].playerName).toBe('Mid');
        expect(board[2].playerName).toBe('Low');
      });

      it('should trim leaderboard to MAX_LEADERBOARD_ENTRIES (100)', () => {
        // Add 105 entries
        for (let i = 0; i < 105; i++) {
          addToLeaderboard({
            playerName: `Player${i}`,
            score: i,
            accuracy: 50,
            language: 'javascript' as const,
            questionCount: 5,
          });
        }

        const board = getLeaderboard();
        expect(board).toHaveLength(100);
        // Highest scores should be kept
        expect(board[0].score).toBe(104);
      });
    });

    describe('getLeaderboardPosition', () => {
      it('should return 1 for highest score on empty leaderboard', () => {
        const pos = getLeaderboardPosition(100);
        expect(pos).toBe(1);
      });

      it('should return correct position among existing entries', () => {
        addToLeaderboard({
          playerName: 'A',
          score: 100,
          accuracy: 90,
          language: 'javascript' as const,
          questionCount: 5,
        });
        addToLeaderboard({
          playerName: 'B',
          score: 50,
          accuracy: 80,
          language: 'javascript' as const,
          questionCount: 5,
        });
        addToLeaderboard({
          playerName: 'C',
          score: 25,
          accuracy: 70,
          language: 'javascript' as const,
          questionCount: 5,
        });

        // Score of 75 would be after the 100-scorer
        expect(getLeaderboardPosition(75)).toBe(2);
        // Score of 200 would be first
        expect(getLeaderboardPosition(200)).toBe(1);
        // Score of 10 would be last (position 4)
        expect(getLeaderboardPosition(10)).toBe(4);
        // Score of 100 ties with A, so position is 1 (only scores strictly greater count)
        expect(getLeaderboardPosition(100)).toBe(1);
      });
    });

    describe('clearLeaderboard', () => {
      it('should remove all leaderboard data', () => {
        addToLeaderboard({
          playerName: 'Test',
          score: 100,
          accuracy: 90,
          language: 'javascript' as const,
          questionCount: 5,
        });

        expect(getLeaderboard()).toHaveLength(1);

        clearLeaderboard();

        expect(getLeaderboard()).toEqual([]);
      });

      it('should not throw when leaderboard is already empty', () => {
        expect(() => clearLeaderboard()).not.toThrow();
        expect(getLeaderboard()).toEqual([]);
      });
    });
  });
});
