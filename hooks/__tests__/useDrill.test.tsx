// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as drillStorage from '../../lib/storage';
import useDrill, { type DrillProblem, type DrillSessionResult } from '../useDrill';

// Mock useProgress
vi.mock('../useProgress', () => ({
  useProgress: () => ({
    saveDrill: vi.fn(),
    saveSession: vi.fn(),
    saveQuiz: vi.fn(),
  }),
}));

// Mock useTimer with stable references
vi.mock('../useTimer', () => {
  const pause = vi.fn();
  const start = vi.fn();
  const reset = vi.fn();
  const setTime = vi.fn();
  return {
    useTimer: () => ({
      time: 10,
      formatted: '00:10',
      isRunning: true,
      pause,
      start,
      reset,
      setTime,
    }),
  };
});

describe('useDrill', () => {
  const mockProblems: DrillProblem[] = [
    {
      id: '1',
      question: '1+1',
      answer: '2',
      difficulty: 'easy',
      category: 'math',
      hint: 'Think simple addition',
      explanation: 'One plus one equals two',
    },
    {
      id: '2',
      question: '2+2',
      answer: '4',
      difficulty: 'easy',
      category: 'math',
    },
    {
      id: '3',
      question: 'Capital of France',
      answer: 'Paris',
      difficulty: 'medium',
      category: 'geography',
      hint: 'City of Light',
      explanation: 'Paris is the capital of France',
    },
    {
      id: '4',
      question: 'What is 10*10',
      answer: '100',
      difficulty: 'hard',
      category: 'math',
      alternatives: ['one hundred', 'a hundred'],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(drillStorage, 'getSetting').mockReturnValue(undefined as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // =========================================================================
  // Existing tests
  // =========================================================================

  it('should initialize with first problem', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    expect(result.current.currentProblem?.id).toBe('1');
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isActive).toBe(true);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.totalProblems).toBe(4);
  });

  it('should handle correct answer', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    act(() => {
      const success = result.current.submitAnswer('2');
      expect(success).toBe(true);
    });

    expect(result.current.correctCount).toBe(1);
    expect(result.current.streak).toBe(1);
    expect(result.current.lastAnswerCorrect).toBe(true);
    expect(result.current.showingAnswer).toBe(true);
  });

  it('should handle incorrect answer', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    act(() => {
      const success = result.current.submitAnswer('wrong');
      expect(success).toBe(false);
    });

    expect(result.current.correctCount).toBe(0);
    expect(result.current.incorrectCount).toBe(1);
    expect(result.current.streak).toBe(0);
    expect(result.current.lastAnswerCorrect).toBe(false);
  });

  it('should advance to next problem', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false, autoAdvance: false }),
    );

    act(() => {
      result.current.submitAnswer('2');
    });

    act(() => {
      result.current.next();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentProblem?.id).toBe('2');
    expect(result.current.showingAnswer).toBe(false);
  });

  it('should complete session after last problem', () => {
    const singleProblem = [mockProblems[0]];
    const { result } = renderHook(() => useDrill('javascript', { problems: singleProblem }));

    act(() => {
      result.current.submitAnswer('2');
    });

    act(() => {
      result.current.next();
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.isActive).toBe(false);
  });

  it('should skip problem', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    act(() => {
      result.current.skip();
    });

    expect(result.current.skippedCount).toBe(1);
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.streak).toBe(0);
  });

  // =========================================================================
  // restart() - resets all state, restarts timer
  // =========================================================================

  it('should restart session and reset all state', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // Submit a correct answer and advance
    act(() => {
      result.current.submitAnswer('2');
    });
    act(() => {
      result.current.next();
    });
    // Skip the second problem
    act(() => {
      result.current.skip();
    });

    expect(result.current.currentIndex).toBe(2);
    expect(result.current.correctCount).toBe(1);
    expect(result.current.skippedCount).toBe(1);

    // Restart
    act(() => {
      result.current.restart();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.correctCount).toBe(0);
    expect(result.current.incorrectCount).toBe(0);
    expect(result.current.skippedCount).toBe(0);
    expect(result.current.streak).toBe(0);
    expect(result.current.bestStreak).toBe(0);
    expect(result.current.isActive).toBe(true);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.showingAnswer).toBe(false);
    expect(result.current.lastAnswer).toBeNull();
    expect(result.current.lastAnswerCorrect).toBeNull();
  });

  it('should allow resuming after restart', () => {
    const singleProblem = [mockProblems[0]];
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: singleProblem, shuffle: false }),
    );

    // Complete the session
    act(() => {
      result.current.submitAnswer('2');
    });
    act(() => {
      result.current.next();
    });
    expect(result.current.isComplete).toBe(true);
    expect(result.current.isActive).toBe(false);

    // Restart and verify we can submit again
    act(() => {
      result.current.restart();
    });
    expect(result.current.isActive).toBe(true);
    expect(result.current.isComplete).toBe(false);

    act(() => {
      const success = result.current.submitAnswer('2');
      expect(success).toBe(true);
    });
    expect(result.current.correctCount).toBe(1);
  });

  // =========================================================================
  // endSession() - returns DrillSessionResult, completes session
  // =========================================================================

  it('should end session early and return DrillSessionResult', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // Answer one correctly and advance
    act(() => {
      result.current.submitAnswer('2');
    });
    act(() => {
      result.current.next();
    });

    let sessionResult!: DrillSessionResult;
    act(() => {
      sessionResult = result.current.endSession();
    });

    expect(result.current.isActive).toBe(false);
    expect(result.current.isComplete).toBe(true);
    expect(sessionResult).toBeDefined();
    expect(sessionResult.totalProblems).toBe(1);
    expect(sessionResult.correctAnswers).toBe(1);
    expect(sessionResult.incorrectAnswers).toBe(0);
    expect(sessionResult.skipped).toBe(0);
    expect(sessionResult.accuracy).toBe(1);
    expect(sessionResult.streak).toBe(1);
    expect(sessionResult.bestStreak).toBe(1);
    expect(sessionResult.duration).toBe(10); // mocked timer.time
    expect(sessionResult.problems).toHaveLength(1);
    expect(sessionResult.problems[0].correct).toBe(true);
    expect(sessionResult.problems[0].userAnswer).toBe('2');
    expect(sessionResult.problems[0].skipped).toBe(false);
  });

  it('should end session with mixed results', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // Answer one correctly
    act(() => {
      result.current.submitAnswer('2');
    });
    act(() => {
      result.current.next();
    });
    // Answer one incorrectly
    act(() => {
      result.current.submitAnswer('wrong');
    });
    act(() => {
      result.current.next();
    });
    // Skip one
    act(() => {
      result.current.skip();
    });

    let sessionResult!: DrillSessionResult;
    act(() => {
      sessionResult = result.current.endSession();
    });

    expect(sessionResult.totalProblems).toBe(3);
    expect(sessionResult.correctAnswers).toBe(1);
    expect(sessionResult.incorrectAnswers).toBe(1);
    expect(sessionResult.skipped).toBe(1);
    expect(sessionResult.accuracy).toBeCloseTo(1 / 3);
  });

  // =========================================================================
  // showHint() - returns hint when available, null when not
  // =========================================================================

  it('should return hint when available', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // First problem has a hint
    const hint = result.current.showHint();
    expect(hint).toBe('Think simple addition');
  });

  it('should return null when hint is not available', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // Advance to second problem (no hint)
    act(() => {
      result.current.submitAnswer('2');
    });
    act(() => {
      result.current.next();
    });

    const hint = result.current.showHint();
    expect(hint).toBeNull();
  });

  // =========================================================================
  // getSessionResult() - returns current session result
  // =========================================================================

  it('should return current session result via getSessionResult', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // Submit a correct answer
    act(() => {
      result.current.submitAnswer('2');
    });

    const sessionResult = result.current.getSessionResult();

    expect(sessionResult).toBeDefined();
    expect(sessionResult.totalProblems).toBe(1);
    expect(sessionResult.correctAnswers).toBe(1);
    expect(sessionResult.incorrectAnswers).toBe(0);
    expect(sessionResult.skipped).toBe(0);
    expect(sessionResult.accuracy).toBe(1);
    expect(sessionResult.streak).toBe(1);
    expect(sessionResult.bestStreak).toBe(1);
    expect(sessionResult.duration).toBe(10);
    expect(sessionResult.problems).toHaveLength(1);
    expect(sessionResult.problems[0].correct).toBe(true);
    expect(sessionResult.problems[0].userAnswer).toBe('2');
  });

  it('should return empty session result when no answers submitted', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    const sessionResult = result.current.getSessionResult();

    expect(sessionResult.totalProblems).toBe(0);
    expect(sessionResult.correctAnswers).toBe(0);
    expect(sessionResult.incorrectAnswers).toBe(0);
    expect(sessionResult.accuracy).toBe(0);
    expect(sessionResult.problems).toHaveLength(0);
  });

  // =========================================================================
  // Alternative answers
  // =========================================================================

  it('should accept alternative answers', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: [mockProblems[3]], // has alternatives: ['one hundred', 'a hundred']
        shuffle: false,
      }),
    );

    act(() => {
      const success = result.current.submitAnswer('one hundred');
      expect(success).toBe(true);
    });

    expect(result.current.correctCount).toBe(1);
    expect(result.current.lastAnswerCorrect).toBe(true);
  });

  it('should accept another alternative answer', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: [mockProblems[3]],
        shuffle: false,
      }),
    );

    act(() => {
      const success = result.current.submitAnswer('a hundred');
      expect(success).toBe(true);
    });

    expect(result.current.correctCount).toBe(1);
  });

  it('should accept the primary answer even when alternatives exist', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: [mockProblems[3]],
        shuffle: false,
      }),
    );

    act(() => {
      const success = result.current.submitAnswer('100');
      expect(success).toBe(true);
    });

    expect(result.current.correctCount).toBe(1);
  });

  it('should reject incorrect answer when alternatives exist', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: [mockProblems[3]],
        shuffle: false,
      }),
    );

    act(() => {
      const success = result.current.submitAnswer('two hundred');
      expect(success).toBe(false);
    });

    expect(result.current.incorrectCount).toBe(1);
  });

  // =========================================================================
  // Category and difficulty filtering
  // =========================================================================

  it('should filter problems by category', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: mockProblems,
        shuffle: false,
        category: 'geography',
        sessionLength: 0,
      }),
    );

    expect(result.current.totalProblems).toBe(1);
    expect(result.current.currentProblem?.id).toBe('3');
    expect(result.current.currentProblem?.category).toBe('geography');
  });

  it('should filter problems by difficulty', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: mockProblems,
        shuffle: false,
        difficulty: 'hard',
        sessionLength: 0,
      }),
    );

    expect(result.current.totalProblems).toBe(1);
    expect(result.current.currentProblem?.id).toBe('4');
  });

  it('should filter problems by easy difficulty', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: mockProblems,
        shuffle: false,
        difficulty: 'easy',
        sessionLength: 0,
      }),
    );

    expect(result.current.totalProblems).toBe(2);
    expect(result.current.currentProblem?.difficulty).toBe('easy');
  });

  it('should include all difficulties with mixed setting', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: mockProblems,
        shuffle: false,
        difficulty: 'mixed',
        sessionLength: 0,
      }),
    );

    expect(result.current.totalProblems).toBe(4);
  });

  it('should filter by both category and difficulty', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: mockProblems,
        shuffle: false,
        category: 'math',
        difficulty: 'easy',
        sessionLength: 0,
      }),
    );

    expect(result.current.totalProblems).toBe(2);
    expect(result.current.currentProblem?.category).toBe('math');
    expect(result.current.currentProblem?.difficulty).toBe('easy');
  });

  // =========================================================================
  // Case sensitivity
  // =========================================================================

  it('should reject wrong case when caseSensitive is true', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: [{ id: '1', question: 'Capital of France', answer: 'Paris' }],
        shuffle: false,
        caseSensitive: true,
      }),
    );

    act(() => {
      const success = result.current.submitAnswer('paris');
      expect(success).toBe(false);
    });

    expect(result.current.incorrectCount).toBe(1);
    expect(result.current.lastAnswerCorrect).toBe(false);
  });

  it('should accept exact case when caseSensitive is true', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: [{ id: '1', question: 'Capital of France', answer: 'Paris' }],
        shuffle: false,
        caseSensitive: true,
      }),
    );

    act(() => {
      const success = result.current.submitAnswer('Paris');
      expect(success).toBe(true);
    });

    expect(result.current.correctCount).toBe(1);
  });

  it('should be case insensitive by default', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: [{ id: '1', question: 'Capital of France', answer: 'Paris' }],
        shuffle: false,
      }),
    );

    act(() => {
      const success = result.current.submitAnswer('paris');
      expect(success).toBe(true);
    });

    expect(result.current.correctCount).toBe(1);
  });

  // =========================================================================
  // Empty problems array
  // =========================================================================

  it('should handle empty problems array gracefully', () => {
    const { result } = renderHook(() => useDrill('javascript', { problems: [], shuffle: false }));

    expect(result.current.currentProblem).toBeNull();
    expect(result.current.totalProblems).toBe(0);
    expect(result.current.isActive).toBe(true);
    expect(result.current.currentIndex).toBe(0);
  });

  it('should return false when submitting answer with empty problems', () => {
    const { result } = renderHook(() => useDrill('javascript', { problems: [], shuffle: false }));

    act(() => {
      const success = result.current.submitAnswer('anything');
      expect(success).toBe(false);
    });
  });

  it('should do nothing when skipping with empty problems', () => {
    const { result } = renderHook(() => useDrill('javascript', { problems: [], shuffle: false }));

    act(() => {
      result.current.skip();
    });

    expect(result.current.skippedCount).toBe(0);
  });

  it('should return null hint with empty problems', () => {
    const { result } = renderHook(() => useDrill('javascript', { problems: [], shuffle: false }));

    const hint = result.current.showHint();
    expect(hint).toBeNull();
  });

  // =========================================================================
  // Submit when not active
  // =========================================================================

  it('should return false when submitting answer while not active', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // End session to make it inactive
    act(() => {
      result.current.endSession();
    });

    expect(result.current.isActive).toBe(false);

    act(() => {
      const success = result.current.submitAnswer('2');
      expect(success).toBe(false);
    });

    // Counts should not have changed
    expect(result.current.correctCount).toBe(0);
    expect(result.current.incorrectCount).toBe(0);
  });

  it('should return false when submitting while already showing answer', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false, autoAdvance: false }),
    );

    // Submit first answer
    act(() => {
      result.current.submitAnswer('2');
    });

    expect(result.current.showingAnswer).toBe(true);

    // Try submitting again while showingAnswer is true
    act(() => {
      const success = result.current.submitAnswer('another');
      expect(success).toBe(false);
    });

    // Only the first correct answer should be counted
    expect(result.current.correctCount).toBe(1);
    expect(result.current.incorrectCount).toBe(0);
  });

  // =========================================================================
  // Skip when not active
  // =========================================================================

  it('should do nothing when skip is called while not active', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // End session
    act(() => {
      result.current.endSession();
    });

    expect(result.current.isActive).toBe(false);
    const skippedBefore = result.current.skippedCount;

    act(() => {
      result.current.skip();
    });

    expect(result.current.skippedCount).toBe(skippedBefore);
  });

  // =========================================================================
  // Next when not showing answer
  // =========================================================================

  it('should do nothing when next is called and not showing answer', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    const indexBefore = result.current.currentIndex;

    // Call next without submitting an answer first (showingAnswer is false)
    act(() => {
      result.current.next();
    });

    expect(result.current.currentIndex).toBe(indexBefore);
  });

  it('should do nothing when next is called while not active', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    act(() => {
      result.current.endSession();
    });

    const indexBefore = result.current.currentIndex;

    act(() => {
      result.current.next();
    });

    expect(result.current.currentIndex).toBe(indexBefore);
  });

  // =========================================================================
  // Streak tracking
  // =========================================================================

  it('should track bestStreak across the session', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    // Two correct in a row
    act(() => {
      result.current.submitAnswer('2');
    });
    act(() => {
      result.current.next();
    });
    act(() => {
      result.current.submitAnswer('4');
    });
    act(() => {
      result.current.next();
    });

    expect(result.current.streak).toBe(2);
    expect(result.current.bestStreak).toBe(2);

    // One incorrect - resets streak but not bestStreak
    act(() => {
      result.current.submitAnswer('wrong');
    });
    act(() => {
      result.current.next();
    });

    expect(result.current.streak).toBe(0);
    expect(result.current.bestStreak).toBe(2);
  });

  // =========================================================================
  // Timer state
  // =========================================================================

  it('should expose timer state from mocked timer', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    expect(result.current.timer.time).toBe(10);
    expect(result.current.timer.formatted).toBe('00:10');
    expect(result.current.timer.isRunning).toBe(true);
  });

  // =========================================================================
  // onComplete callback
  // =========================================================================

  it('should call onComplete when session completes', () => {
    const onComplete = vi.fn();
    const singleProblem = [mockProblems[0]];
    const { result } = renderHook(() =>
      useDrill('javascript', {
        problems: singleProblem,
        shuffle: false,
        onComplete,
      }),
    );

    act(() => {
      result.current.submitAnswer('2');
    });
    act(() => {
      result.current.next();
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
    const callArg = onComplete.mock.calls[0][0];
    expect(callArg.correctAnswers).toBe(1);
    expect(callArg.totalProblems).toBe(1);
  });
});
