/**
 * Study Mode — Flashcard type definitions
 *
 * Unified data model that normalizes the 5 different question types
 * (method, time-complexity, space-complexity, pattern, frontend)
 * into a single Flashcard interface for the study experience.
 */

// ── Source & Rating ──────────────────────────────────────────

export type FlashcardSource =
  | 'method'
  | 'time-complexity'
  | 'space-complexity'
  | 'pattern'
  | 'frontend';

export type ConfidenceRating = 'missed' | 'shaky' | 'knew-it';

// ── Flashcard ────────────────────────────────────────────────

export interface Flashcard {
  /** Unique ID in the form "{source}:{originalId}" */
  id: string;
  source: FlashcardSource;
  front: {
    prompt: string;
    code?: string;
    detail?: string;
    badge: string;
  };
  back: {
    answer: string;
    explanation?: string;
    meta?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

// ── Persisted State (localStorage) ───────────────────────────

export interface CardRating {
  cardId: string;
  rating: ConfidenceRating;
  timesStudied: number;
  lastStudied: number;
}

export interface FlashcardStudyState {
  ratings: Record<string, CardRating>;
  totalSessions: number;
  totalCardsStudied: number;
  lastSessionAt: number;
}

// ── Session (in-memory) ──────────────────────────────────────

export type StudyPhase = 'setup' | 'studying' | 'summary';

export interface StudySessionConfig {
  sources: FlashcardSource[];
  difficulties: ('easy' | 'medium' | 'hard')[];
  categories: string[];
  deckSize: number;
  prioritizeWeak: boolean;
  shuffle: boolean;
}

export interface SessionRatingTally {
  missed: number;
  shaky: number;
  'knew-it': number;
}

export interface SessionResult {
  totalCards: number;
  tally: SessionRatingTally;
  /** Cards the user rated missed or shaky */
  weakCards: Flashcard[];
  /** Elapsed seconds */
  elapsedSeconds: number;
}

// ── Adapter options ──────────────────────────────────────────

export interface GetFlashcardsOptions {
  sources: FlashcardSource[];
  language?: string;
  framework?: string;
  categories?: string[];
  difficulties?: ('easy' | 'medium' | 'hard')[];
}
