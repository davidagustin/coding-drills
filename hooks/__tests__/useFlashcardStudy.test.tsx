// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Flashcard } from '@/lib/flashcards/types';
import { useFlashcardStudy } from '../useFlashcardStudy';

const STORAGE_KEY = 'coding-drills-flashcards';

function makeCard(id: string): Flashcard {
  return {
    id,
    source: 'method',
    front: { prompt: 'test', badge: 'test' },
    back: { answer: 'test' },
    difficulty: 'easy',
    category: 'test',
    interviewRecommended: false,
  };
}

describe('useFlashcardStudy', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // =========================================================================
  // 1. Initial state
  // =========================================================================

  it('should initialize with empty state when localStorage is empty', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    expect(result.current.studyState.ratings).toEqual({});
    expect(result.current.studyState.totalSessions).toBe(0);
    expect(result.current.studyState.totalCardsStudied).toBe(0);
    expect(result.current.studyState.lastSessionAt).toBe(0);
  });

  // =========================================================================
  // 2. rateCard - Rate a card as 'knew-it'
  // =========================================================================

  it('should rate a card as knew-it and update state', () => {
    const { result } = renderHook(() => useFlashcardStudy());
    const timestampBefore = Date.now();

    act(() => {
      result.current.rateCard('card-1', 'knew-it');
    });

    const rating = result.current.studyState.ratings['card-1'];
    expect(rating).toBeDefined();
    expect(rating.rating).toBe('knew-it');
    expect(rating.timesStudied).toBe(1);
    expect(rating.lastStudied).toBeGreaterThanOrEqual(timestampBefore);
    expect(rating.lastStudied).toBeLessThanOrEqual(Date.now());

    // Verify localStorage was updated
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    expect(stored.ratings['card-1'].rating).toBe('knew-it');
  });

  // =========================================================================
  // 3. rateCard increments timesStudied
  // =========================================================================

  it('should increment timesStudied when rating the same card twice', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.rateCard('card-1', 'missed');
    });

    expect(result.current.studyState.ratings['card-1'].timesStudied).toBe(1);
    expect(result.current.studyState.ratings['card-1'].rating).toBe('missed');

    act(() => {
      result.current.rateCard('card-1', 'knew-it');
    });

    expect(result.current.studyState.ratings['card-1'].timesStudied).toBe(2);
    expect(result.current.studyState.ratings['card-1'].rating).toBe('knew-it');
  });

  // =========================================================================
  // 4. getCardRating
  // =========================================================================

  it('should return card rating when it exists', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.rateCard('card-1', 'shaky');
    });

    const rating = result.current.getCardRating('card-1');
    expect(rating).toBeDefined();
    expect(rating?.rating).toBe('shaky');
    expect(rating?.cardId).toBe('card-1');
  });

  it('should return undefined for nonexistent card', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    const rating = result.current.getCardRating('nonexistent');
    expect(rating).toBeUndefined();
  });

  // =========================================================================
  // 5. getWeakCardIds
  // =========================================================================

  it('should return IDs of cards rated missed or shaky', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.rateCard('card-1', 'missed');
      result.current.rateCard('card-2', 'shaky');
      result.current.rateCard('card-3', 'knew-it');
    });

    const weakIds = result.current.getWeakCardIds();
    expect(weakIds).toHaveLength(2);
    expect(weakIds).toContain('card-1');
    expect(weakIds).toContain('card-2');
    expect(weakIds).not.toContain('card-3');
  });

  it('should return empty array when no weak cards', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.rateCard('card-1', 'knew-it');
      result.current.rateCard('card-2', 'knew-it');
    });

    const weakIds = result.current.getWeakCardIds();
    expect(weakIds).toEqual([]);
  });

  // =========================================================================
  // 6. completeSession
  // =========================================================================

  it('should increment session stats when completing a session', () => {
    const { result } = renderHook(() => useFlashcardStudy());
    const timestampBefore = Date.now();

    act(() => {
      result.current.completeSession(10);
    });

    expect(result.current.studyState.totalSessions).toBe(1);
    expect(result.current.studyState.totalCardsStudied).toBe(10);
    expect(result.current.studyState.lastSessionAt).toBeGreaterThanOrEqual(timestampBefore);
    expect(result.current.studyState.lastSessionAt).toBeLessThanOrEqual(Date.now());

    // Verify localStorage was updated
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    expect(stored.totalSessions).toBe(1);
    expect(stored.totalCardsStudied).toBe(10);
  });

  // =========================================================================
  // 7. completeSession accumulates
  // =========================================================================

  it('should accumulate session stats across multiple completions', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.completeSession(10);
    });

    expect(result.current.studyState.totalSessions).toBe(1);
    expect(result.current.studyState.totalCardsStudied).toBe(10);

    act(() => {
      result.current.completeSession(5);
    });

    expect(result.current.studyState.totalSessions).toBe(2);
    expect(result.current.studyState.totalCardsStudied).toBe(15);
  });

  // =========================================================================
  // 8. resetProgress
  // =========================================================================

  it('should reset all progress to empty state', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    // Create some state
    act(() => {
      result.current.rateCard('card-1', 'missed');
      result.current.rateCard('card-2', 'shaky');
      result.current.completeSession(10);
    });

    expect(Object.keys(result.current.studyState.ratings)).toHaveLength(2);
    expect(result.current.studyState.totalSessions).toBe(1);

    // Reset
    act(() => {
      result.current.resetProgress();
    });

    expect(result.current.studyState.ratings).toEqual({});
    expect(result.current.studyState.totalSessions).toBe(0);
    expect(result.current.studyState.totalCardsStudied).toBe(0);
    expect(result.current.studyState.lastSessionAt).toBe(0);

    // Verify localStorage was updated
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    expect(stored.ratings).toEqual({});
    expect(stored.totalSessions).toBe(0);
  });

  // =========================================================================
  // 9. Persistence
  // =========================================================================

  it('should persist ratings across hook unmount and remount', () => {
    const { result, unmount } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.rateCard('card-1', 'missed');
    });

    expect(result.current.studyState.ratings['card-1'].rating).toBe('missed');

    // Unmount the hook
    unmount();

    // Remount
    const { result: result2 } = renderHook(() => useFlashcardStudy());

    // Should still have the rating
    expect(result2.current.studyState.ratings['card-1'].rating).toBe('missed');
    expect(result2.current.studyState.ratings['card-1'].timesStudied).toBe(1);
  });

  // =========================================================================
  // 10. prioritiseWeak
  // =========================================================================

  it('should sort cards by weakness tier', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    const cardKnew = makeCard('card-knew');
    const cardMissed = makeCard('card-missed');
    const cardUnseen = makeCard('card-unseen');

    act(() => {
      result.current.rateCard('card-knew', 'knew-it');
      result.current.rateCard('card-missed', 'missed');
    });

    const sorted = result.current.prioritiseWeak([cardKnew, cardMissed, cardUnseen]);

    // Expected order: missed (tier 0), unseen (tier 1), knew-it (tier 2)
    expect(sorted[0].id).toBe('card-missed');
    expect(sorted[1].id).toBe('card-unseen');
    expect(sorted[2].id).toBe('card-knew');
  });

  it('should handle all shaky cards in prioritiseWeak', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    const cardShaky1 = makeCard('card-shaky-1');
    const cardShaky2 = makeCard('card-shaky-2');
    const cardKnew = makeCard('card-knew');

    act(() => {
      result.current.rateCard('card-shaky-1', 'shaky');
      result.current.rateCard('card-shaky-2', 'shaky');
      result.current.rateCard('card-knew', 'knew-it');
    });

    const sorted = result.current.prioritiseWeak([cardKnew, cardShaky1, cardShaky2]);

    // Both shaky should come before knew-it (tier 0 < tier 2)
    expect(sorted[0].id).toBe('card-shaky-1');
    expect(sorted[1].id).toBe('card-shaky-2');
    expect(sorted[2].id).toBe('card-knew');
  });

  it('should handle all unseen cards in prioritiseWeak', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    const card1 = makeCard('card-1');
    const card2 = makeCard('card-2');
    const card3 = makeCard('card-3');

    const sorted = result.current.prioritiseWeak([card1, card2, card3]);

    // All unseen, order should be preserved (all tier 1)
    expect(sorted).toHaveLength(3);
  });

  // =========================================================================
  // 11. Corrupted localStorage
  // =========================================================================

  it('should fallback to empty state when localStorage has invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not json');

    const { result } = renderHook(() => useFlashcardStudy());

    expect(result.current.studyState.ratings).toEqual({});
    expect(result.current.studyState.totalSessions).toBe(0);
    expect(result.current.studyState.totalCardsStudied).toBe(0);
    expect(result.current.studyState.lastSessionAt).toBe(0);
  });

  it('should not throw when corrupted data exists', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid}');

    expect(() => {
      renderHook(() => useFlashcardStudy());
    }).not.toThrow();
  });

  // =========================================================================
  // Additional edge cases
  // =========================================================================

  it('should handle rating multiple different cards', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.rateCard('card-1', 'missed');
      result.current.rateCard('card-2', 'shaky');
      result.current.rateCard('card-3', 'knew-it');
      result.current.rateCard('card-4', 'missed');
    });

    expect(Object.keys(result.current.studyState.ratings)).toHaveLength(4);
    expect(result.current.getWeakCardIds()).toHaveLength(3); // card-1, card-2, card-4
  });

  it('should handle completing session with 0 cards', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.completeSession(0);
    });

    expect(result.current.studyState.totalSessions).toBe(1);
    expect(result.current.studyState.totalCardsStudied).toBe(0);
  });

  it('should preserve unrelated state when rating cards', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.completeSession(10);
    });

    const sessionsBefore = result.current.studyState.totalSessions;
    const cardsStudiedBefore = result.current.studyState.totalCardsStudied;

    act(() => {
      result.current.rateCard('card-1', 'knew-it');
    });

    // Session stats should be unchanged
    expect(result.current.studyState.totalSessions).toBe(sessionsBefore);
    expect(result.current.studyState.totalCardsStudied).toBe(cardsStudiedBefore);
  });

  it('should preserve ratings when completing sessions', () => {
    const { result } = renderHook(() => useFlashcardStudy());

    act(() => {
      result.current.rateCard('card-1', 'missed');
      result.current.rateCard('card-2', 'shaky');
    });

    const ratingsBefore = { ...result.current.studyState.ratings };

    act(() => {
      result.current.completeSession(10);
    });

    // Ratings should be unchanged
    expect(result.current.studyState.ratings).toEqual(ratingsBefore);
  });
});
