'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
  ConfidenceRater,
  FlashcardCard,
  StudyProgress,
  StudySetup,
  StudySummary,
} from '@/components/flashcards';
import { useFlashcardStudy } from '@/hooks/useFlashcardStudy';
import { getAllFlashcards } from '@/lib/flashcards/adapters';
import type {
  ConfidenceRating,
  Flashcard,
  FlashcardSource,
  SessionRatingTally,
  SessionResult,
  StudyPhase,
  StudySessionConfig,
} from '@/lib/flashcards/types';

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LANGUAGE_SOURCES: { id: FlashcardSource; label: string }[] = [
  { id: 'method', label: 'Drill Mode Methods' },
  { id: 'time-complexity', label: 'Time Complexity' },
  { id: 'space-complexity', label: 'Space Complexity' },
  { id: 'pattern', label: 'Algorithm Patterns' },
];

export default function LanguageStudyPage() {
  const params = useParams();
  const language = (params?.language as string) || 'javascript';

  const { studyState, getWeakCardIds, rateCard, completeSession, prioritiseWeak } =
    useFlashcardStudy();

  const [phase, setPhase] = useState<StudyPhase>('setup');
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [tally, setTally] = useState<SessionRatingTally>({ missed: 0, shaky: 0, 'knew-it': 0 });
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const sessionStartRef = useRef<number>(0);
  const [lastConfig, setLastConfig] = useState<StudySessionConfig | null>(null);

  const weakCardCount = useMemo(() => getWeakCardIds().length, [getWeakCardIds]);

  // ── Setup → Studying ────────────────────────────────────
  const handleStart = useCallback(
    (config: StudySessionConfig) => {
      setLastConfig(config);
      let cards = getAllFlashcards({
        sources: config.sources,
        language,
        categories: config.categories.length > 0 ? config.categories : undefined,
        difficulties: config.difficulties,
        interviewOnly: config.interviewOnly || undefined,
      });

      if (config.prioritizeWeak) {
        cards = prioritiseWeak(cards);
      }
      if (config.shuffle) {
        // If prioritising weak, shuffle within tiers (weak first, then the rest)
        if (config.prioritizeWeak) {
          const weakIds = new Set(getWeakCardIds());
          const ratedIds = new Set(Object.keys(studyState.ratings));
          const weak = cards.filter((c) => weakIds.has(c.id));
          const unseen = cards.filter((c) => !weakIds.has(c.id) && !ratedIds.has(c.id));
          const known = cards.filter((c) => !weakIds.has(c.id) && ratedIds.has(c.id));
          cards = [...shuffle(weak), ...shuffle(unseen), ...shuffle(known)];
        } else {
          cards = shuffle(cards);
        }
      }

      const finalDeck = cards.slice(0, config.deckSize);
      setDeck(finalDeck);
      setCurrentIndex(0);
      setIsRevealed(false);
      setTally({ missed: 0, shaky: 0, 'knew-it': 0 });
      setSessionResult(null);
      sessionStartRef.current = Date.now();
      setPhase('studying');
    },
    [language, prioritiseWeak, getWeakCardIds, studyState.ratings],
  );

  // ── Card interaction ────────────────────────────────────
  const handleReveal = useCallback(() => setIsRevealed(true), []);

  const handleRate = useCallback(
    (rating: ConfidenceRating) => {
      const card = deck[currentIndex];
      if (!card) return;

      rateCard(card.id, rating);
      const newTally = { ...tally, [rating]: tally[rating] + 1 };
      setTally(newTally);

      const nextIndex = currentIndex + 1;
      if (nextIndex >= deck.length) {
        const elapsed = Math.round((Date.now() - sessionStartRef.current) / 1000);
        const result: SessionResult = {
          totalCards: deck.length,
          tally: newTally,
          weakCards: deck.filter((c) => {
            if (c.id === card.id) return rating !== 'knew-it';
            const r = studyState.ratings[c.id];
            return r && (r.rating === 'missed' || r.rating === 'shaky');
          }),
          elapsedSeconds: elapsed,
        };
        completeSession(deck.length);
        setSessionResult(result);
        setPhase('summary');
      } else {
        setCurrentIndex(nextIndex);
        setIsRevealed(false);
      }
    },
    [deck, currentIndex, tally, rateCard, completeSession, studyState.ratings],
  );

  // ── Navigation shortcuts (← →) ─────────────────────────
  useEffect(() => {
    if (phase !== 'studying') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
        setIsRevealed(false);
      }
      if (e.key === 'Escape') {
        setPhase('setup');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentIndex]);

  // ── Render ──────────────────────────────────────────────

  if (phase === 'setup') {
    return (
      <StudySetup
        availableSources={LANGUAGE_SOURCES}
        context={{ language }}
        weakCardCount={weakCardCount}
        onStart={handleStart}
      />
    );
  }

  if (phase === 'summary' && sessionResult) {
    return (
      <StudySummary
        result={sessionResult}
        onStudyAgain={() => {
          if (lastConfig) handleStart(lastConfig);
          else setPhase('setup');
        }}
        onChangeSettings={() => setPhase('setup')}
      />
    );
  }

  // ── Studying phase ──────────────────────────────────────
  const currentCard = deck[currentIndex];

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">
            No cards available — Try selecting different categories or a different quiz type.
          </p>
          <button
            type="button"
            onClick={() => setPhase('setup')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              {
                label: language.charAt(0).toUpperCase() + language.slice(1),
                href: `/${language}`,
              },
              { label: 'Study Mode' },
            ]}
            className="text-sm"
          />
          <button
            type="button"
            onClick={() => setPhase('setup')}
            className="flex items-center gap-2 px-4 py-2 min-h-[44px] text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-medium">Exit</span>
          </button>
        </div>

        {/* Progress */}
        <StudyProgress current={currentIndex + 1} total={deck.length} tally={tally} />

        {/* Card */}
        <FlashcardCard
          key={currentCard.id}
          card={currentCard}
          isRevealed={isRevealed}
          onReveal={handleReveal}
        />

        {/* Confidence rater */}
        {isRevealed && <ConfidenceRater onRate={handleRate} />}
      </div>
    </div>
  );
}
