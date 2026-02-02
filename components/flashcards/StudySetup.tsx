'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { QuestionCountSlider } from '@/components/QuestionCountSlider';
import {
  getAllFlashcards,
  getAvailableCategories,
  getInterviewRecommendedCount,
  getSourceCardCount,
} from '@/lib/flashcards/adapters';
import type { Flashcard, FlashcardSource, StudySessionConfig } from '@/lib/flashcards/types';

// ── Source config ────────────────────────────────────────────

interface SourceOption {
  id: FlashcardSource;
  label: string;
}

interface StudySetupProps {
  availableSources: SourceOption[];
  context: { language?: string; framework?: string };
  weakCardCount: number;
  onStart: (config: StudySessionConfig) => void;
  quizHref?: string;
}

export function StudySetup({
  availableSources,
  context,
  weakCardCount,
  onStart,
  quizHref,
}: StudySetupProps) {
  const [selectedSources, setSelectedSources] = useState<FlashcardSource[]>(() =>
    availableSources.map((s) => s.id),
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [deckSize, setDeckSize] = useState(15);
  const [shuffle, setShuffle] = useState(true);
  const [prioritizeWeak, setPrioritizeWeak] = useState(false);
  const [interviewOnly, setInterviewOnly] = useState(false);

  // Compute available categories + per-category card counts
  const { categories, categoryCounts } = useMemo(() => {
    // Count cards per category, respecting the interview-only filter
    const allCards = getAllFlashcards({
      sources: selectedSources,
      ...context,
      interviewOnly: interviewOnly || undefined,
    });
    const counts: Record<string, number> = {};
    const cats = new Set<string>();
    for (const card of allCards) {
      counts[card.category] = (counts[card.category] ?? 0) + 1;
      cats.add(card.category);
    }

    // When not filtering by interview, also include categories from source metadata
    if (!interviewOnly) {
      for (const src of selectedSources) {
        for (const cat of getAvailableCategories(src, context)) {
          cats.add(cat);
        }
      }
    }

    const sorted = [...cats].sort();
    return { categories: sorted, categoryCounts: counts };
  }, [selectedSources, context, interviewOnly]);

  // Preview cards matching current filters
  const previewCards = useMemo((): Flashcard[] => {
    if (selectedSources.length === 0) return [];
    return getAllFlashcards({
      sources: selectedSources,
      ...context,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      interviewOnly: interviewOnly || undefined,
    });
  }, [selectedSources, selectedCategories, context, interviewOnly]);

  // Compute interview recommended count
  const interviewCount = useMemo(() => {
    return getInterviewRecommendedCount(selectedSources, context);
  }, [selectedSources, context]);

  // Compute total available cards
  const totalAvailable = useMemo(() => {
    if (interviewOnly) {
      return previewCards.length;
    }
    let count = 0;
    for (const src of selectedSources) {
      count += getSourceCardCount(src, context);
    }
    return count;
  }, [selectedSources, context, interviewOnly, previewCards.length]);

  const maxDeck = Math.max(1, totalAvailable);

  const toggleSource = useCallback((id: FlashcardSource) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
    // Reset categories when sources change
    setSelectedCategories([]);
  }, []);

  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }, []);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // ── Q&A preview local filter/sort state ────────────────────
  const [qaSearch, setQaSearch] = useState('');
  const [qaDifficulty, setQaDifficulty] = useState<string>('all');
  const [qaCategory, setQaCategory] = useState<string>('all');
  const [qaSource, setQaSource] = useState<string>('all');
  const [qaSort, setQaSort] = useState<string>('default');

  // Derive unique values for filter dropdowns from previewCards
  const qaFilterOptions = useMemo(() => {
    const cats = new Set<string>();
    const sources = new Set<string>();
    for (const card of previewCards) {
      cats.add(card.category);
      sources.add(card.source);
    }
    return {
      categories: [...cats].sort(),
      sources: [...sources].sort(),
    };
  }, [previewCards]);

  // Apply local filters + sort to preview cards
  const filteredPreviewCards = useMemo(() => {
    let cards = previewCards;

    if (qaSearch.trim()) {
      const q = qaSearch.toLowerCase();
      cards = cards.filter(
        (c) =>
          c.front.prompt.toLowerCase().includes(q) ||
          c.back.answer.toLowerCase().includes(q) ||
          (c.front.detail && c.front.detail.toLowerCase().includes(q)) ||
          (c.back.explanation && c.back.explanation.toLowerCase().includes(q)) ||
          c.category.toLowerCase().includes(q),
      );
    }
    if (qaDifficulty !== 'all') {
      cards = cards.filter((c) => c.difficulty === qaDifficulty);
    }
    if (qaCategory !== 'all') {
      cards = cards.filter((c) => c.category === qaCategory);
    }
    if (qaSource !== 'all') {
      cards = cards.filter((c) => c.source === qaSource);
    }

    // Sort
    const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 };
    switch (qaSort) {
      case 'category':
        cards = [...cards].sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'difficulty':
        cards = [...cards].sort(
          (a, b) => (diffOrder[a.difficulty] ?? 1) - (diffOrder[b.difficulty] ?? 1),
        );
        break;
      case 'difficulty-desc':
        cards = [...cards].sort(
          (a, b) => (diffOrder[b.difficulty] ?? 1) - (diffOrder[a.difficulty] ?? 1),
        );
        break;
      case 'source':
        cards = [...cards].sort((a, b) => a.source.localeCompare(b.source));
        break;
      default:
        break;
    }

    return cards;
  }, [previewCards, qaSearch, qaDifficulty, qaCategory, qaSource, qaSort]);

  // Reset local Q&A filters when closing preview
  const closePreview = useCallback(() => {
    setIsPreviewOpen(false);
    setQaSearch('');
    setQaDifficulty('all');
    setQaCategory('all');
    setQaSource('all');
    setQaSort('default');
  }, []);

  const handleStart = useCallback(() => {
    if (selectedSources.length === 0) return;
    onStart({
      sources: selectedSources,
      difficulties: ['easy', 'medium', 'hard'],
      categories: selectedCategories,
      deckSize: Math.min(deckSize, maxDeck),
      prioritizeWeak,
      shuffle,
      interviewOnly,
    });
  }, [
    selectedSources,
    selectedCategories,
    deckSize,
    maxDeck,
    prioritizeWeak,
    shuffle,
    interviewOnly,
    onStart,
  ]);

  // ── Full-page Q&A preview ──────────────────────────────────
  if (isPreviewOpen && previewCards.length > 0) {
    const hasActiveFilters =
      qaSearch.trim() !== '' ||
      qaDifficulty !== 'all' ||
      qaCategory !== 'all' ||
      qaSource !== 'all';

    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Questions & Answers</h1>
              <p className="text-zinc-400 text-sm mt-1">
                {filteredPreviewCards.length === previewCards.length
                  ? `${previewCards.length} card${previewCards.length !== 1 ? 's' : ''} matching your filters`
                  : `${filteredPreviewCards.length} of ${previewCards.length} card${previewCards.length !== 1 ? 's' : ''} shown`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleStart}
                disabled={selectedSources.length === 0}
                className="px-6 py-2.5 rounded-lg font-semibold text-sm bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                Begin Studying
              </button>
              <button
                type="button"
                onClick={closePreview}
                className="flex items-center gap-2 px-4 py-2.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-sm font-medium">Back to Setup</span>
              </button>
            </div>
          </div>

          {/* Filter & Sort toolbar */}
          <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 p-4 mb-6">
            {/* Search row */}
            <div className="relative mb-3">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={qaSearch}
                onChange={(e) => setQaSearch(e.target.value)}
                placeholder="Search questions, answers, categories..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/80 border border-zinc-700/50 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-colors"
              />
              {qaSearch && (
                <button
                  type="button"
                  onClick={() => setQaSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
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
                </button>
              )}
            </div>

            {/* Filter dropdowns + sort row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Difficulty filter */}
              <select
                value={qaDifficulty}
                onChange={(e) => setQaDifficulty(e.target.value)}
                className="px-3 py-2 bg-zinc-900/80 border border-zinc-700/50 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  paddingRight: '28px',
                }}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {/* Category filter */}
              <select
                value={qaCategory}
                onChange={(e) => setQaCategory(e.target.value)}
                className="px-3 py-2 bg-zinc-900/80 border border-zinc-700/50 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none max-w-[200px]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  paddingRight: '28px',
                }}
              >
                <option value="all">All Categories</option>
                {qaFilterOptions.categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Source filter */}
              {qaFilterOptions.sources.length > 1 && (
                <select
                  value={qaSource}
                  onChange={(e) => setQaSource(e.target.value)}
                  className="px-3 py-2 bg-zinc-900/80 border border-zinc-700/50 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    paddingRight: '28px',
                  }}
                >
                  <option value="all">All Sources</option>
                  {qaFilterOptions.sources.map((src) => (
                    <option key={src} value={src} className="capitalize">
                      {src}
                    </option>
                  ))}
                </select>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Sort */}
              <select
                value={qaSort}
                onChange={(e) => setQaSort(e.target.value)}
                className="px-3 py-2 bg-zinc-900/80 border border-zinc-700/50 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  paddingRight: '28px',
                }}
              >
                <option value="default">Default Order</option>
                <option value="category">Sort by Category</option>
                <option value="difficulty">Difficulty: Easy First</option>
                <option value="difficulty-desc">Difficulty: Hard First</option>
                <option value="source">Sort by Source</option>
              </select>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setQaSearch('');
                    setQaDifficulty('all');
                    setQaCategory('all');
                    setQaSource('all');
                  }}
                  className="px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Card list */}
          {filteredPreviewCards.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-12 h-12 mx-auto text-zinc-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <p className="text-zinc-400 text-lg font-medium">No cards match your filters</p>
              <p className="text-zinc-500 text-sm mt-1">Try adjusting your search or filters</p>
              <button
                type="button"
                onClick={() => {
                  setQaSearch('');
                  setQaDifficulty('all');
                  setQaCategory('all');
                  setQaSource('all');
                }}
                className="mt-4 px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredPreviewCards.map((card, i) => (
                <div
                  key={card.id}
                  className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 p-6 hover:border-zinc-600/50 transition-colors"
                >
                  {/* Top row: number + badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-zinc-500 tabular-nums">#{i + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setQaCategory(qaCategory === card.category ? 'all' : card.category);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-full capitalize cursor-pointer transition-colors ${
                          qaCategory === card.category
                            ? 'bg-blue-500/30 text-blue-300 ring-1 ring-blue-500/50'
                            : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {card.category}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQaDifficulty(
                            qaDifficulty === card.difficulty ? 'all' : card.difficulty,
                          );
                        }}
                        className={`text-xs px-2.5 py-1 rounded-full capitalize cursor-pointer transition-colors ${
                          qaDifficulty === card.difficulty ? 'ring-1 ring-current' : ''
                        } ${
                          card.difficulty === 'easy'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : card.difficulty === 'medium'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {card.difficulty}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQaSource(qaSource === card.source ? 'all' : card.source);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-full capitalize cursor-pointer transition-colors ${
                          qaSource === card.source
                            ? 'bg-zinc-600/50 text-zinc-200 ring-1 ring-zinc-500/50'
                            : 'bg-zinc-700/30 text-zinc-500 hover:bg-zinc-700/50'
                        }`}
                      >
                        {card.source}
                      </button>
                    </div>
                  </div>

                  {/* Question + Answer side by side on large screens, stacked on small */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Question */}
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Question
                      </div>
                      <div className="text-base text-zinc-200 font-medium">{card.front.prompt}</div>
                      {card.front.detail && (
                        <div className="text-sm text-zinc-400 mt-2 leading-relaxed">
                          {card.front.detail}
                        </div>
                      )}
                      {card.front.code && (
                        <pre className="mt-3 text-sm bg-zinc-900/80 rounded-lg px-4 py-3 text-blue-300 whitespace-pre-wrap break-words font-mono border border-zinc-700/30 leading-relaxed">
                          {card.front.code}
                        </pre>
                      )}
                    </div>

                    {/* Answer */}
                    <div className="lg:border-l lg:border-zinc-700/30 lg:pl-5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Answer
                      </div>
                      <div className="text-lg text-emerald-400 font-semibold">
                        {card.back.answer}
                      </div>
                      {card.back.explanation && (
                        <div className="text-sm text-zinc-400 mt-2 leading-relaxed">
                          {card.back.explanation.length > 200
                            ? `${card.back.explanation.slice(0, 200)}...`
                            : card.back.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Setup form ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Study Mode
          </h1>
          <p className="text-zinc-400 text-lg">
            Study questions from Quiz and Drill Mode as flashcards. No timers, no scoring — just
            focused recall.
          </p>
        </div>

        {/* Inline mode tabs */}
        {quizHref && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <Link
              href={quizHref}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              Quiz
            </Link>
            <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>
              Study
            </span>
          </div>
        )}

        {/* View All Q&A — prominent placement */}
        {previewCards.length > 0 && (
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="w-full mb-8 group relative overflow-hidden rounded-2xl border border-zinc-700/50 hover:border-zinc-600 bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-200 cursor-pointer p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 group-hover:bg-blue-500/25 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    View All Questions & Answers
                  </div>
                  <div className="text-sm text-zinc-500">
                    Browse, search, and filter all {previewCards.length} cards
                  </div>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </button>
        )}

        {/* What to Study */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <h2 className="text-xl font-semibold mb-4">What to Study</h2>
          <div className="flex flex-wrap gap-2">
            {availableSources.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => toggleSource(id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                  selectedSources.includes(id)
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {label}
                <span
                  className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    selectedSources.includes(id)
                      ? 'bg-blue-400/30 text-blue-100'
                      : 'bg-zinc-600 text-zinc-400'
                  }`}
                >
                  {getSourceCardCount(id, context)}
                </span>
              </button>
            ))}
          </div>
          {selectedSources.length === 0 && (
            <p className="text-red-400 text-sm mt-3">Select at least one study source</p>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Categories
                {selectedCategories.length > 0 && (
                  <span className="text-sm font-normal text-zinc-400 ml-2">
                    ({selectedCategories.length} selected)
                  </span>
                )}
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategories([...categories])}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-zinc-600">|</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize cursor-pointer ${
                    selectedCategories.includes(cat)
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                  {categoryCounts[cat] != null && (
                    <span
                      className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                        selectedCategories.includes(cat)
                          ? 'bg-blue-400/30 text-blue-100'
                          : 'bg-zinc-600 text-zinc-400'
                      }`}
                    >
                      {categoryCounts[cat]}
                    </span>
                  )}
                </button>
              ))}
            </div>
            {selectedCategories.length === 0 && (
              <p className="text-zinc-500 text-sm mt-3">
                No categories selected — all categories will be included
              </p>
            )}
          </div>
        )}

        {/* Interview Recommended */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Interview Recommended
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                Focus on questions commonly asked in technical interviews
                <span className="text-amber-400 ml-1">({interviewCount} cards)</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setInterviewOnly(!interviewOnly)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 cursor-pointer ${
                interviewOnly ? 'bg-amber-500' : 'bg-zinc-600'
              }`}
              aria-label="Toggle interview recommended filter"
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                  interviewOnly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Number of Cards */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Number of Cards</h2>
            <span className="text-sm text-zinc-400">{totalAvailable} available</span>
          </div>
          <QuestionCountSlider
            value={Math.min(deckSize, maxDeck)}
            onChange={setDeckSize}
            min={1}
            max={maxDeck}
            label="Cards"
            showLabel={false}
          />
        </div>

        {/* Card Order */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <h2 className="text-xl font-semibold mb-4">Card Order</h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShuffle(true)}
              className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                shuffle
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              Shuffle
            </button>
            <button
              type="button"
              onClick={() => setShuffle(false)}
              className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                !shuffle
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              Sequential
            </button>
          </div>
        </div>

        {/* Priority Toggle */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-8 border border-zinc-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Focus on cards I&apos;m still learning</h2>
              <p className="text-zinc-400 text-sm">
                {weakCardCount > 0
                  ? `Surfaces ${weakCardCount} previously missed or shaky card${weakCardCount !== 1 ? 's' : ''} first`
                  : 'No weak cards yet — study to build your history'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPrioritizeWeak(!prioritizeWeak)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 cursor-pointer ${
                prioritizeWeak ? 'bg-blue-500' : 'bg-zinc-600'
              }`}
              aria-label="Toggle weak card priority"
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                  prioritizeWeak ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Start button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleStart}
            disabled={selectedSources.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-200
                       shadow-lg transform hover:scale-[1.02] active:scale-[0.98] ${
                         selectedSources.length === 0
                           ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed shadow-none'
                           : 'bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer hover:from-blue-600 hover:to-purple-700 shadow-purple-500/25 hover:shadow-purple-500/40'
                       }`}
          >
            Begin Studying
          </button>
        </div>
      </div>
    </div>
  );
}
