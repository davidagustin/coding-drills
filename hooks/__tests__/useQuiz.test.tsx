// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as quizStorage from '../../lib/storage'; // for mocking getSetting
import useQuiz from '../useQuiz';

// Mock useProgress
vi.mock('../useProgress', () => ({
  useProgress: () => ({
    saveQuiz: vi.fn(),
  }),
}));

// Mock useTimer
// Mock useTimer with stable references to avoid infinite loops
vi.mock('../useTimer', () => {
  const pause = vi.fn();
  const start = vi.fn();
  const reset = vi.fn();
  const setTime = vi.fn();
  // Return a hook that returns the SAME functions
  return {
    useTimer: () => ({
      time: 60,
      formatted: '01:00',
      isRunning: true,
      pause,
      start,
      reset,
      setTime,
    }),
  };
});

describe('useQuiz', () => {
  const mockQuestions = [
    {
      id: '1',
      question: 'Q1',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1, // 'B'
      category: 'general',
    },
    {
      id: '2',
      question: 'Q2',
      options: ['X', 'Y', 'Z'],
      correctIndex: 0, // 'X'
      category: 'general',
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

  it('should initialize with first question', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', { questions: mockQuestions, shuffle: false, shuffleOptions: false }),
    );

    expect(result.current.currentQuestion?.id).toBe('1');
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.totalQuestions).toBe(2);
  });

  it('should handle correct answer', () => {
    const { result } = renderHook(() =>
      useQuiz('javascript', { questions: mockQuestions, shuffle: false, shuffleOptions: false }),
    );

    act(() => {
      // Correct index for Q1 is 1
      result.current.selectAnswer(1);
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
      // Incorrect index for Q1 is 0
      result.current.selectAnswer(0);
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

    // Select answer
    act(() => {
      result.current.selectAnswer(1);
    });

    // Manual next or wait for effect? useQuiz has auto-advance timeout.
    // We can just call nextQuestion manual override
    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentQuestion?.id).toBe('2');
    expect(result.current.showingAnswer).toBe(false);
  });

  it('should complete quiz', () => {
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
  });
});
