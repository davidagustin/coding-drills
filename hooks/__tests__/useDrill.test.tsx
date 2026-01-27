// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as drillStorage from '../../lib/storage'; // for mocking getSetting
import useDrill from '../useDrill';

// Mock useProgress - since it's a relative import in useDrill, we mock it via module
vi.mock('../useProgress', () => ({
  useProgress: () => ({
    saveDrill: vi.fn(),
    saveSession: vi.fn(),
  }),
}));

// Mock useTimer
vi.mock('../useTimer', () => ({
  useTimer: () => ({
    time: 10,
    formatted: '00:10',
    isRunning: true,
    pause: vi.fn(),
    start: vi.fn(),
    reset: vi.fn(),
  }),
}));

describe('useDrill', () => {
  const mockProblems = [
    {
      id: '1',
      question: '1+1',
      answer: '2',
      difficulty: 'easy' as const,
      category: 'math',
    },
    {
      id: '2',
      question: '2+2',
      answer: '4',
      difficulty: 'easy' as const,
      category: 'math',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Default settings mock
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(drillStorage, 'getSetting').mockReturnValue(undefined as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with first problem', () => {
    const { result } = renderHook(() =>
      useDrill('javascript', { problems: mockProblems, shuffle: false }),
    );

    expect(result.current.currentProblem?.id).toBe('1');
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isActive).toBe(true);
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

    // Submit answer first (sets showingAnswer = true)
    act(() => {
      result.current.submitAnswer('2');
    });

    // Valid next call
    act(() => {
      result.current.next();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentProblem?.id).toBe('2');
    expect(result.current.showingAnswer).toBe(false);
  });

  it('should complete session after last problem', () => {
    // Use only 1 problem for quick completion
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
});
