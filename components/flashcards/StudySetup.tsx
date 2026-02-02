'use client';

import { useCallback, useMemo, useState } from 'react';
import { QuestionCountSlider } from '@/components/QuestionCountSlider';
import {
  getAllFlashcards,
  getAvailableCategories,
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
}

export function StudySetup({ availableSources, context, weakCardCount, onStart }: StudySetupProps) {
  const [selectedSources, setSelectedSources] = useState<FlashcardSource[]>(() =>
    availableSources.map((s) => s.id),
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [deckSize, setDeckSize] = useState(15);
  const [shuffle, setShuffle] = useState(true);
  const [prioritizeWeak, setPrioritizeWeak] = useState(false);

  // Compute available categories from selected sources
  const categories = useMemo(() => {
    const cats = new Set<string>();
    for (const src of selectedSources) {
      for (const cat of getAvailableCategories(src, context)) {
        cats.add(cat);
      }
    }
    return [...cats].sort();
  }, [selectedSources, context]);

  // Compute total available cards
  const totalAvailable = useMemo(() => {
    let count = 0;
    for (const src of selectedSources) {
      count += getSourceCardCount(src, context);
    }
    return count;
  }, [selectedSources, context]);

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

  // Preview cards matching current filters
  const previewCards = useMemo((): Flashcard[] => {
    if (selectedSources.length === 0) return [];
    return getAllFlashcards({
      sources: selectedSources,
      ...context,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    });
  }, [selectedSources, selectedCategories, context]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleStart = useCallback(() => {
    if (selectedSources.length === 0) return;
    onStart({
      sources: selectedSources,
      difficulties: ['easy', 'medium', 'hard'],
      categories: selectedCategories,
      deckSize: Math.min(deckSize, maxDeck),
      prioritizeWeak,
      shuffle,
    });
  }, [selectedSources, selectedCategories, deckSize, maxDeck, prioritizeWeak, shuffle, onStart]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Study Mode
          </h1>
          <p className="text-zinc-400 text-lg">
            Review questions at your own pace. No timers, no scoring — just focused recall.
          </p>
        </div>

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

        {/* Preview Q&A Table */}
        {previewCards.length > 0 && (
          <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 mb-8 overflow-hidden">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-zinc-700/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">Preview Questions & Answers</h2>
                <span className="text-sm text-zinc-400">
                  {previewCards.length} card{previewCards.length !== 1 ? 's' : ''}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${isPreviewOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isPreviewOpen && (
              <div className="border-t border-zinc-700/50 max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-zinc-800">
                    <tr className="border-b border-zinc-700/50">
                      <th className="text-left px-4 py-3 text-zinc-400 font-medium w-12">#</th>
                      <th className="text-left px-4 py-3 text-zinc-400 font-medium">Question</th>
                      <th className="text-left px-4 py-3 text-zinc-400 font-medium">Answer</th>
                      <th className="text-left px-4 py-3 text-zinc-400 font-medium w-24">
                        Category
                      </th>
                      <th className="text-left px-4 py-3 text-zinc-400 font-medium w-20">
                        Difficulty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewCards.map((card, i) => (
                      <tr
                        key={card.id}
                        className="border-b border-zinc-700/30 hover:bg-zinc-700/20 transition-colors"
                      >
                        <td className="px-4 py-3 text-zinc-500 tabular-nums">{i + 1}</td>
                        <td className="px-4 py-3 text-zinc-200">
                          <div className="line-clamp-2">{card.front.prompt}</div>
                          {card.front.detail && (
                            <div className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                              {card.front.detail}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-emerald-400 font-medium">
                          <div className="line-clamp-2">{card.back.answer}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700/50 text-zinc-300 capitalize">
                            {card.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                              card.difficulty === 'easy'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : card.difficulty === 'medium'
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {card.difficulty}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Start Button */}
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
  );
}
