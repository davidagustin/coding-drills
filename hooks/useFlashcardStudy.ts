'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  CardRating,
  ConfidenceRating,
  Flashcard,
  FlashcardStudyState,
} from '@/lib/flashcards/types';

const STORAGE_KEY = 'coding-drills-flashcards';

// ── Helpers ──────────────────────────────────────────────────

function loadState(): FlashcardStudyState {
  if (typeof window === 'undefined') return emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as FlashcardStudyState;
  } catch {
    // corrupted — start fresh
  }
  return emptyState();
}

function persistState(state: FlashcardStudyState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full — silently fail
  }
}

function emptyState(): FlashcardStudyState {
  return {
    ratings: {},
    totalSessions: 0,
    totalCardsStudied: 0,
    lastSessionAt: 0,
  };
}

// ── Hook ─────────────────────────────────────────────────────

export interface UseFlashcardStudyReturn {
  studyState: FlashcardStudyState;
  /** Get the persisted rating for a card (if any). */
  getCardRating: (cardId: string) => CardRating | undefined;
  /** Get all card IDs previously rated missed or shaky. */
  getWeakCardIds: () => string[];
  /** Record a confidence rating for a card. */
  rateCard: (cardId: string, rating: ConfidenceRating) => void;
  /** Mark a session as complete (increments counters). */
  completeSession: (cardsStudied: number) => void;
  /** Reset all persisted study progress. */
  resetProgress: () => void;
  /**
   * Sort cards so that weak ones (missed, shaky, or never-seen)
   * appear earlier in the deck.
   */
  prioritiseWeak: (cards: Flashcard[]) => Flashcard[];
}

export function useFlashcardStudy(): UseFlashcardStudyReturn {
  const [studyState, setStudyState] = useState<FlashcardStudyState>(loadState);
  // Keep a ref in sync so callbacks always read fresh state
  const stateRef = useRef(studyState);
  useEffect(() => {
    stateRef.current = studyState;
  }, [studyState]);

  const getCardRating = useCallback(
    (cardId: string): CardRating | undefined => stateRef.current.ratings[cardId],
    [],
  );

  const getWeakCardIds = useCallback((): string[] => {
    return Object.values(stateRef.current.ratings)
      .filter((r) => r.rating === 'missed' || r.rating === 'shaky')
      .map((r) => r.cardId);
  }, []);

  const rateCard = useCallback((cardId: string, rating: ConfidenceRating): void => {
    setStudyState((prev) => {
      const existing = prev.ratings[cardId];
      const next: FlashcardStudyState = {
        ...prev,
        ratings: {
          ...prev.ratings,
          [cardId]: {
            cardId,
            rating,
            timesStudied: (existing?.timesStudied ?? 0) + 1,
            lastStudied: Date.now(),
          },
        },
      };
      persistState(next);
      return next;
    });
  }, []);

  const completeSession = useCallback((cardsStudied: number): void => {
    setStudyState((prev) => {
      const next: FlashcardStudyState = {
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalCardsStudied: prev.totalCardsStudied + cardsStudied,
        lastSessionAt: Date.now(),
      };
      persistState(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback((): void => {
    const fresh = emptyState();
    persistState(fresh);
    setStudyState(fresh);
  }, []);

  const prioritiseWeak = useCallback(
    (cards: Flashcard[]): Flashcard[] => {
      const weakIds = new Set(getWeakCardIds());
      const ratedIds = new Set(Object.keys(stateRef.current.ratings));

      // Tier 0: missed/shaky, Tier 1: never seen, Tier 2: knew-it
      const tier = (c: Flashcard): number => {
        if (weakIds.has(c.id)) return 0;
        if (!ratedIds.has(c.id)) return 1;
        return 2;
      };

      return [...cards].sort((a, b) => tier(a) - tier(b));
    },
    [getWeakCardIds],
  );

  return {
    studyState,
    getCardRating,
    getWeakCardIds,
    rateCard,
    completeSession,
    resetProgress,
    prioritiseWeak,
  };
}
