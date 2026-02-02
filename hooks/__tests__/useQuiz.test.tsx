// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as quizStorage from '../../lib/storage';
import useQuiz, { type QuizQuestion, type QuizSessionResult } from '../useQuiz';
import { useTimer } from '../useTimer';

// Mock useProgress
vi.mock('../useProgress', () => ({
  useProgress: () => ({
    saveDrill: vi.fn(),
    saveSession: vi.fn(),
    saveQuiz: vi.fn(),
  }),
}));

// Mock useTimer with stable references to avoid infinite loops
vi.mock('../useTimer', () => {
  const pause = vi.fn();
  const start = vi.fn();
  const reset = vi.fn();
  const setTime = vi.fn();
  return {
    useTimer: vi.fn(() => ({
      time: 10,
      formatted: '00:10',
      isRunning: true,
      pause,
      start,
      reset,
      setTime,
    })),
  };
});

describe('useQuiz', () => {
  const mockQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: 'Q1',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1, // 'B'
      category: 'general',
      difficulty: 'easy',
      explanation: 'B is correct',
    },
    {
      id: '2',
      question: 'Q2',
      options: ['X', 'Y', 'Z'],
      correctIndex: 0, // 'X'
      category: 'general',
      difficulty: 'easy',
    },
    {
      id: '3',
      question: 'Q3',
      options: ['True', 'False'],
      correctIndex: 0, // 'True'
      category: 'science',
      difficulty: 'medium',
    },
    {
      id: '4',
      question: 'Q4',
      options: ['Alpha', 'Beta', 'Gamma', 'Delta'],
      correctIndex: 2, // 'Gamma'
      category: 'science',
      difficulty: 'hard',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(quizStorage, 'getSetting').mockReturnValue(undefined as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // =========================================================================
  // Existing tests
  // =========================================================================

  it('should initialize with first question', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', { questions: mockQuestions, shuffle: false, shuffleOptions: false }),
    );

    expect(result.current.currentQuestion?.id).toBe('1');
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalQuestions).toBe(4);
    expect(result.current.isActive).toBe(true);
    expect(result.current.isComplete).toBe(false);
  });

  it('should handle correct answer', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', { questions: mockQuestions, shuffle: false, shuffleOptions: false }),
    );

    act(() => {
      result.current.selectAnswer(1); // correctIndex for Q1 is 1
    });

    expect(result.current.isCorrect).toBe(true);
    expect(result.current.correctCount).toBe(1);
    expect(result.current.score).toBeGreaterThan(0);
    expect(result.current.showingAnswer).toBe(true);
  });

  it('should handle incorrect answer', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', { questions: mockQuestions, shuffle: false, shuffleOptions: false }),
    );

    act(() => {
      result.current.selectAnswer(0); // wrong for Q1
    });

    expect(result.current.isCorrect).toBe(false);
    expect(result.current.incorrectCount).toBe(1);
    expect(result.current.correctCount).toBe(0);
  });

  it('should advance to next question', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        answerDelay: 0,
      }),
    );

    act(() => {
      result.current.selectAnswer(1);
    });

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentQuestion?.id).toBe('2');
    expect(result.current.showingAnswer).toBe(false);
  });

  it('should complete quiz after last question', () => {
    const singleQ = [mockQuestions[0]];
    const { result } = renderHook(() =>
      useQuiz('javascript', { questions: singleQ, shuffle: false, shuffleOptions: false }),
    );

    act(() => {
      result.current.selectAnswer(1);
    });

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.isActive).toBe(false);
  });

  // =========================================================================
  // restart() - resets all state
  // =========================================================================

  it('should restart quiz and reset all state', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // Answer one correctly and advance
    act(() => {
      result.current.selectAnswer(1);
    });
    act(() => {
      result.current.nextQuestion();
    });
    // Answer one incorrectly and advance
    act(() => {
      result.current.selectAnswer(2); // wrong for Q2 (correctIndex is 0)
    });
    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentIndex).toBe(2);
    expect(result.current.correctCount).toBe(1);
    expect(result.current.incorrectCount).toBe(1);
    expect(result.current.score).toBeGreaterThan(0);

    // Restart
    act(() => {
      result.current.restart();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.correctCount).toBe(0);
    expect(result.current.incorrectCount).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.streak).toBe(0);
    expect(result.current.bestStreak).toBe(0);
    expect(result.current.isActive).toBe(true);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.showingAnswer).toBe(false);
    expect(result.current.selectedIndex).toBeNull();
    expect(result.current.isCorrect).toBeNull();
  });

  it('should allow answering after restart from completed state', () => {
    const singleQ = [mockQuestions[0]];
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: singleQ,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // Complete the quiz
    act(() => {
      result.current.selectAnswer(1);
    });
    act(() => {
      result.current.nextQuestion();
    });
    expect(result.current.isComplete).toBe(true);

    // Restart
    act(() => {
      result.current.restart();
    });

    expect(result.current.isActive).toBe(true);
    expect(result.current.isComplete).toBe(false);

    // Should be able to select an answer again
    act(() => {
      result.current.selectAnswer(1);
    });
    expect(result.current.isCorrect).toBe(true);
    expect(result.current.correctCount).toBe(1);
  });

  // =========================================================================
  // endQuiz() - returns QuizSessionResult, completes quiz
  // =========================================================================

  it('should end quiz early and return QuizSessionResult', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // Answer one correctly and advance
    act(() => {
      result.current.selectAnswer(1);
    });
    act(() => {
      result.current.nextQuestion();
    });

    let quizResult!: QuizSessionResult;
    act(() => {
      quizResult = result.current.endQuiz();
    });

    expect(result.current.isActive).toBe(false);
    expect(result.current.isComplete).toBe(true);
    expect(quizResult).toBeDefined();
    expect(quizResult.totalQuestions).toBe(1);
    expect(quizResult.correctAnswers).toBe(1);
    expect(quizResult.incorrectAnswers).toBe(0);
    expect(quizResult.accuracy).toBe(1);
    expect(quizResult.score).toBeGreaterThan(0);
    expect(quizResult.streak).toBe(1);
    expect(quizResult.bestStreak).toBe(1);
    expect(quizResult.duration).toBe(10); // mocked timer.time
    expect(quizResult.questions).toHaveLength(1);
    expect(quizResult.questions[0].correct).toBe(true);
  });

  it('should end quiz with mixed results', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // One correct
    act(() => {
      result.current.selectAnswer(1);
    });
    act(() => {
      result.current.nextQuestion();
    });
    // One incorrect
    act(() => {
      result.current.selectAnswer(2); // wrong for Q2
    });
    act(() => {
      result.current.nextQuestion();
    });

    let quizResult!: QuizSessionResult;
    act(() => {
      quizResult = result.current.endQuiz();
    });

    expect(quizResult.totalQuestions).toBe(2);
    expect(quizResult.correctAnswers).toBe(1);
    expect(quizResult.incorrectAnswers).toBe(1);
    expect(quizResult.accuracy).toBe(0.5);
  });

  // =========================================================================
  // getSessionResult() - returns current session result
  // =========================================================================

  it('should return current session result via getSessionResult', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // Answer one correctly
    act(() => {
      result.current.selectAnswer(1);
    });

    const sessionResult = result.current.getSessionResult();

    expect(sessionResult).toBeDefined();
    expect(sessionResult.totalQuestions).toBe(1);
    expect(sessionResult.correctAnswers).toBe(1);
    expect(sessionResult.incorrectAnswers).toBe(0);
    expect(sessionResult.accuracy).toBe(1);
    expect(sessionResult.score).toBeGreaterThan(0);
    expect(sessionResult.streak).toBe(1);
    expect(sessionResult.bestStreak).toBe(1);
    expect(sessionResult.questions).toHaveLength(1);
    expect(sessionResult.questions[0].correct).toBe(true);
  });

  it('should return empty session result when no answers given', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    const sessionResult = result.current.getSessionResult();

    expect(sessionResult.totalQuestions).toBe(0);
    expect(sessionResult.correctAnswers).toBe(0);
    expect(sessionResult.incorrectAnswers).toBe(0);
    expect(sessionResult.accuracy).toBe(0);
    expect(sessionResult.score).toBe(0);
    expect(sessionResult.questions).toHaveLength(0);
  });

  // =========================================================================
  // Score calculation with streak bonus
  // =========================================================================

  it('should calculate score with streak bonus for consecutive correct answers', () => {
    const twoQuestions = [mockQuestions[0], mockQuestions[1]];
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: twoQuestions,
        shuffle: false,
        shuffleOptions: false,
        pointsPerCorrect: 100,
        streakBonus: 10,
      }),
    );

    // First correct: 100 (base) + 1*10 (streak=1) = 110
    act(() => {
      result.current.selectAnswer(1); // correct for Q1
    });

    expect(result.current.score).toBe(110);
    expect(result.current.streak).toBe(1);

    act(() => {
      result.current.nextQuestion();
    });

    // Second correct: 100 (base) + 2*10 (streak=2) = 120, total = 230
    act(() => {
      result.current.selectAnswer(0); // correct for Q2
    });

    expect(result.current.score).toBe(230);
    expect(result.current.streak).toBe(2);
    expect(result.current.bestStreak).toBe(2);
  });

  it('should reset streak on incorrect answer', () => {
    const threeQuestions = [mockQuestions[0], mockQuestions[1], mockQuestions[2]];
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: threeQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // First correct
    act(() => {
      result.current.selectAnswer(1);
    });
    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.streak).toBe(1);
    expect(result.current.bestStreak).toBe(1);

    // Second incorrect - resets streak
    act(() => {
      result.current.selectAnswer(2); // wrong for Q2
    });
    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.streak).toBe(0);
    expect(result.current.bestStreak).toBe(1); // bestStreak preserved

    // Third correct - streak starts fresh
    act(() => {
      result.current.selectAnswer(0); // correct for Q3
    });

    expect(result.current.streak).toBe(1);
    expect(result.current.bestStreak).toBe(1);
  });

  it('should not add score for incorrect answers', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    act(() => {
      result.current.selectAnswer(0); // wrong for Q1
    });

    expect(result.current.score).toBe(0);
    expect(result.current.incorrectCount).toBe(1);
  });

  // =========================================================================
  // nextQuestion() when not showing answer (skips question)
  // =========================================================================

  it('should skip question when nextQuestion called without answering', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // Call nextQuestion without selecting an answer
    act(() => {
      result.current.nextQuestion();
    });

    // Should count as incorrect (skipped)
    expect(result.current.incorrectCount).toBe(1);
    expect(result.current.correctCount).toBe(0);
    expect(result.current.streak).toBe(0);
    // Should advance to next question
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentQuestion?.id).toBe('2');
  });

  it('should record skipped question in results', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // Skip first question
    act(() => {
      result.current.nextQuestion();
    });

    const sessionResult = result.current.getSessionResult();
    expect(sessionResult.questions).toHaveLength(1);
    expect(sessionResult.questions[0].correct).toBe(false);
    expect(sessionResult.questions[0].selectedIndex).toBeNull();
    expect(sessionResult.questions[0].pointsEarned).toBe(0);
  });

  // =========================================================================
  // Empty questions array
  // =========================================================================

  it('should handle empty questions array gracefully', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: [],
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.totalQuestions).toBe(0);
    expect(result.current.isActive).toBe(true);
    expect(result.current.currentIndex).toBe(0);
  });

  it('should do nothing when selecting answer with empty questions', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: [],
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    act(() => {
      result.current.selectAnswer(0);
    });

    expect(result.current.correctCount).toBe(0);
    expect(result.current.incorrectCount).toBe(0);
    expect(result.current.selectedIndex).toBeNull();
  });

  // =========================================================================
  // selectAnswer with out-of-bounds index
  // =========================================================================

  it('should do nothing when selectAnswer receives out-of-bounds positive index', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // Q1 has 4 options (indices 0-3), so index 5 is out of bounds
    act(() => {
      result.current.selectAnswer(5);
    });

    expect(result.current.selectedIndex).toBeNull();
    expect(result.current.isCorrect).toBeNull();
    expect(result.current.showingAnswer).toBe(false);
    expect(result.current.correctCount).toBe(0);
    expect(result.current.incorrectCount).toBe(0);
  });

  it('should do nothing when selectAnswer receives negative index', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    act(() => {
      result.current.selectAnswer(-1);
    });

    expect(result.current.selectedIndex).toBeNull();
    expect(result.current.isCorrect).toBeNull();
    expect(result.current.showingAnswer).toBe(false);
  });

  // =========================================================================
  // selectAnswer when not active
  // =========================================================================

  it('should do nothing when selectAnswer is called while not active', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // End the quiz to deactivate
    act(() => {
      result.current.endQuiz();
    });

    expect(result.current.isActive).toBe(false);

    act(() => {
      result.current.selectAnswer(1);
    });

    // Should not have changed any counts
    expect(result.current.correctCount).toBe(0);
    expect(result.current.incorrectCount).toBe(0);
  });

  it('should do nothing when selectAnswer is called while already showing answer', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // Select an answer (sets showingAnswer to true)
    act(() => {
      result.current.selectAnswer(1);
    });
    expect(result.current.showingAnswer).toBe(true);

    // Try selecting another answer while showing answer
    act(() => {
      result.current.selectAnswer(0);
    });

    // Should still show original answer
    expect(result.current.selectedIndex).toBe(1);
    expect(result.current.correctCount).toBe(1);
    expect(result.current.incorrectCount).toBe(0);
  });

  // =========================================================================
  // Difficulty filtering
  // =========================================================================

  it('should filter questions by specific difficulty', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        difficulty: 'hard',
        quizLength: 0,
      }),
    );

    expect(result.current.totalQuestions).toBe(1);
    expect(result.current.currentQuestion?.id).toBe('4');
    expect(result.current.currentQuestion?.difficulty).toBe('hard');
  });

  it('should filter questions by easy difficulty', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        difficulty: 'easy',
        quizLength: 0,
      }),
    );

    expect(result.current.totalQuestions).toBe(2);
    expect(result.current.currentQuestion?.difficulty).toBe('easy');
  });

  it('should filter questions by medium difficulty', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        difficulty: 'medium',
        quizLength: 0,
      }),
    );

    expect(result.current.totalQuestions).toBe(1);
    expect(result.current.currentQuestion?.id).toBe('3');
  });

  it('should include all difficulties with mixed setting', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        difficulty: 'mixed',
        quizLength: 0,
      }),
    );

    expect(result.current.totalQuestions).toBe(4);
  });

  // =========================================================================
  // Category filtering
  // =========================================================================

  it('should filter questions by category', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        category: 'science',
        quizLength: 0,
      }),
    );

    expect(result.current.totalQuestions).toBe(2);
    expect(result.current.currentQuestion?.id).toBe('3');
    expect(result.current.currentQuestion?.category).toBe('science');
  });

  it('should filter questions by general category', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        category: 'general',
        quizLength: 0,
      }),
    );

    expect(result.current.totalQuestions).toBe(2);
    expect(result.current.currentQuestion?.id).toBe('1');
    expect(result.current.currentQuestion?.category).toBe('general');
  });

  it('should filter by both category and difficulty', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        category: 'science',
        difficulty: 'hard',
        quizLength: 0,
      }),
    );

    expect(result.current.totalQuestions).toBe(1);
    expect(result.current.currentQuestion?.id).toBe('4');
    expect(result.current.currentQuestion?.category).toBe('science');
    expect(result.current.currentQuestion?.difficulty).toBe('hard');
  });

  it('should return empty when no questions match filters', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        category: 'nonexistent',
        quizLength: 0,
      }),
    );

    expect(result.current.totalQuestions).toBe(0);
    expect(result.current.currentQuestion).toBeNull();
  });

  // =========================================================================
  // Quiz timer
  // =========================================================================

  it('should expose quiz timer state', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    expect(result.current.quizTimer.time).toBe(10);
    expect(result.current.quizTimer.formatted).toBe('00:10');
    expect(result.current.quizTimer.isRunning).toBe(true);
  });

  // =========================================================================
  // onComplete callback
  // =========================================================================

  it('should call onComplete when quiz completes', () => {
    const onComplete = vi.fn();
    const singleQ = [mockQuestions[0]];
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: singleQ,
        shuffle: false,
        shuffleOptions: false,
        onComplete,
      }),
    );

    act(() => {
      result.current.selectAnswer(1);
    });
    act(() => {
      result.current.nextQuestion();
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
    const callArg = onComplete.mock.calls[0][0];
    expect(callArg.correctAnswers).toBe(1);
    expect(callArg.totalQuestions).toBe(1);
  });

  // =========================================================================
  // nextQuestion when not active
  // =========================================================================

  it('should do nothing when nextQuestion is called while not active', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // End the quiz
    act(() => {
      result.current.endQuiz();
    });

    expect(result.current.isActive).toBe(false);
    const indexBefore = result.current.currentIndex;

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentIndex).toBe(indexBefore);
  });

  // =========================================================================
  // Option mapping
  // =========================================================================

  it('should provide correct option mapping when shuffleOptions is false', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    expect(result.current.currentOptions).toEqual(['A', 'B', 'C', 'D']);
    expect(result.current.optionMapping).toEqual([0, 1, 2, 3]);
  });

  // =========================================================================
  // Question timer paths (questionTimeLimit > 0)
  // =========================================================================

  it('should expose questionTimer when questionTimeLimit > 0', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
      }),
    );

    expect(result.current.questionTimer).not.toBeNull();
    expect(result.current.questionTimer?.time).toBe(10); // mocked timer.time
    expect(result.current.questionTimer?.formatted).toBe('00:10');
    expect(result.current.questionTimer?.isRunning).toBe(true);
  });

  it('should return null questionTimer when no question time limit', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 0,
      }),
    );

    expect(result.current.questionTimer).toBeNull();
  });

  it('should use per-question timeLimit when questionTimeLimit option is not set', () => {
    const questionsWithTimeLimit: QuizQuestion[] = [
      {
        id: 'tl1',
        question: 'Timed Q1',
        options: ['A', 'B', 'C'],
        correctIndex: 0,
        timeLimit: 20,
      },
    ];

    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: questionsWithTimeLimit,
        shuffle: false,
        shuffleOptions: false,
      }),
    );

    // effectiveQuestionTimeLimit = 0 || 20 = 20 > 0, so questionTimer should be exposed
    expect(result.current.questionTimer).not.toBeNull();
    expect(result.current.questionTimer?.time).toBe(10); // mocked timer.time
  });

  // =========================================================================
  // Time bonus scoring with question timer
  // =========================================================================

  it('should include time bonus in score when questionTimeLimit > 0 and answer is correct', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
        pointsPerCorrect: 100,
        streakBonus: 10,
        timeBonusPerSecond: 5,
      }),
    );

    // Correct answer score: 100 (base) + 1*10 (streak=1 bonus) + 10*5 (time bonus) = 160
    act(() => {
      result.current.selectAnswer(1); // correct for Q1
    });

    expect(result.current.score).toBe(160);
    expect(result.current.isCorrect).toBe(true);
    expect(result.current.correctCount).toBe(1);
  });

  it('should not include time bonus for incorrect answer with questionTimeLimit', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
        pointsPerCorrect: 100,
        streakBonus: 10,
        timeBonusPerSecond: 5,
      }),
    );

    act(() => {
      result.current.selectAnswer(0); // wrong for Q1
    });

    expect(result.current.score).toBe(0);
    expect(result.current.isCorrect).toBe(false);
    expect(result.current.incorrectCount).toBe(1);
  });

  it('should accumulate time bonus across consecutive correct answers', () => {
    const twoQuestions = [mockQuestions[0], mockQuestions[1]];
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: twoQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
        pointsPerCorrect: 100,
        streakBonus: 10,
        timeBonusPerSecond: 5,
      }),
    );

    // First correct: 100 + 1*10 + 10*5 = 160
    act(() => {
      result.current.selectAnswer(1);
    });
    expect(result.current.score).toBe(160);

    act(() => {
      result.current.nextQuestion();
    });

    // Second correct: 100 + 2*10 + 10*5 = 170, total = 330
    act(() => {
      result.current.selectAnswer(0); // correct for Q2
    });
    expect(result.current.score).toBe(330);
    expect(result.current.streak).toBe(2);
  });

  // =========================================================================
  // Restart with question timer active
  // =========================================================================

  it('should reset question timer on restart when questionTimeLimit > 0', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
      }),
    );

    // Answer and advance
    act(() => {
      result.current.selectAnswer(1);
    });
    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.score).toBeGreaterThan(0);

    // Restart - exercises lines 499-501
    act(() => {
      result.current.restart();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isActive).toBe(true);
    expect(result.current.score).toBe(0);
    expect(result.current.questionTimer).not.toBeNull();
  });

  it('should allow full quiz playthrough after restart with questionTimeLimit', () => {
    const singleQ = [mockQuestions[0]];
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: singleQ,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
        pointsPerCorrect: 100,
        streakBonus: 10,
        timeBonusPerSecond: 5,
      }),
    );

    // Complete the quiz
    act(() => {
      result.current.selectAnswer(1);
    });
    act(() => {
      result.current.nextQuestion();
    });
    expect(result.current.isComplete).toBe(true);

    // Restart
    act(() => {
      result.current.restart();
    });

    expect(result.current.isActive).toBe(true);
    expect(result.current.questionTimer).not.toBeNull();

    // Answer again with time bonus
    act(() => {
      result.current.selectAnswer(1);
    });
    expect(result.current.isCorrect).toBe(true);
    expect(result.current.score).toBe(160); // 100 + 10 + 50
  });

  // =========================================================================
  // handleQuestionTimeout - triggered by question timer onComplete
  // =========================================================================

  it('should handle question timeout by marking incorrect and auto-advancing', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
        answerDelay: 1000,
      }),
    );

    // Get the question timer's onComplete callback from the mock
    const mockedUseTimer = vi.mocked(useTimer);
    const calls = mockedUseTimer.mock.calls;
    // Find the last call that has an onComplete (question timer, since quiz timer has none when timeLimit=0)
    const questionTimerCall = [...calls].reverse().find((call) => call[0]?.onComplete);
    const onComplete = questionTimerCall?.[0]?.onComplete;
    expect(onComplete).toBeDefined();

    // Trigger the timeout
    act(() => {
      onComplete?.();
    });

    // Should mark as incorrect
    expect(result.current.isCorrect).toBe(false);
    expect(result.current.incorrectCount).toBe(1);
    expect(result.current.streak).toBe(0);
    expect(result.current.showingAnswer).toBe(true);
    expect(result.current.selectedIndex).toBeNull(); // no answer was selected

    // Should auto-advance after answerDelay
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.showingAnswer).toBe(false);

    vi.useRealTimers();
  });

  it('should record timeout as incorrect in session results', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
        answerDelay: 500,
      }),
    );

    // Trigger timeout
    const mockedUseTimer = vi.mocked(useTimer);
    const calls = mockedUseTimer.mock.calls;
    const questionTimerCall = [...calls].reverse().find((call) => call[0]?.onComplete);
    act(() => {
      questionTimerCall?.[0]?.onComplete?.();
    });

    // Advance past auto-advance delay
    act(() => {
      vi.advanceTimersByTime(500);
    });

    const sessionResult = result.current.getSessionResult();
    expect(sessionResult.questions).toHaveLength(1);
    expect(sessionResult.questions[0].correct).toBe(false);
    expect(sessionResult.questions[0].selectedIndex).toBeNull();
    expect(sessionResult.questions[0].pointsEarned).toBe(0);

    vi.useRealTimers();
  });

  it('should not trigger timeout when already showing answer', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        questionTimeLimit: 30,
      }),
    );

    // Select an answer first (sets showingAnswer to true)
    act(() => {
      result.current.selectAnswer(1);
    });
    expect(result.current.showingAnswer).toBe(true);
    expect(result.current.isCorrect).toBe(true);
    expect(result.current.correctCount).toBe(1);

    // Get the latest onComplete callback (after re-render with showingAnswer=true)
    const mockedUseTimer = vi.mocked(useTimer);
    const calls = mockedUseTimer.mock.calls;
    const questionTimerCall = [...calls].reverse().find((call) => call[0]?.onComplete);
    const onComplete = questionTimerCall?.[0]?.onComplete;

    // Try to trigger timeout - should be blocked by showingAnswer check
    act(() => {
      onComplete?.();
    });

    // Should still show original correct answer state (not overwritten by timeout)
    expect(result.current.isCorrect).toBe(true);
    expect(result.current.incorrectCount).toBe(0);
    expect(result.current.correctCount).toBe(1);
  });

  // =========================================================================
  // Auto-advance timeout in selectAnswer
  // =========================================================================

  it('should auto-advance to next question after answerDelay via setTimeout', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        answerDelay: 2000,
      }),
    );

    act(() => {
      result.current.selectAnswer(1); // correct for Q1
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.showingAnswer).toBe(true);

    // Advance time past the answerDelay
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.showingAnswer).toBe(false);
    expect(result.current.currentQuestion?.id).toBe('2');

    vi.useRealTimers();
  });

  it('should auto-advance and complete quiz on last question via setTimeout', () => {
    vi.useFakeTimers();

    const singleQ = [mockQuestions[0]];
    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: singleQ,
        shuffle: false,
        shuffleOptions: false,
        answerDelay: 1500,
      }),
    );

    act(() => {
      result.current.selectAnswer(1);
    });

    expect(result.current.isComplete).toBe(false);

    // Let auto-advance fire
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.isActive).toBe(false);

    vi.useRealTimers();
  });

  it('should clear auto-advance timeout when nextQuestion is called manually', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useQuiz('javascript', {
        questions: mockQuestions,
        shuffle: false,
        shuffleOptions: false,
        answerDelay: 5000,
      }),
    );

    act(() => {
      result.current.selectAnswer(1); // correct for Q1
    });

    // Manually advance before timeout fires
    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentIndex).toBe(1);

    // Even after the original answerDelay, should not advance again
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Still on question 2 (index 1), not advanced further
    expect(result.current.currentIndex).toBe(1);

    vi.useRealTimers();
  });
});
