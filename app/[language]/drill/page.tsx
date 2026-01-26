'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import { QuestionCountSlider } from '@/components/QuestionCountSlider';
import { formatOutput, validateProblemAnswer } from '@/lib/codeValidator';
import { getProblemCountsByCategory, problemsByLanguage } from '@/lib/problems/index';
import type { Difficulty, LanguageId, Problem } from '@/lib/types';
import { LANGUAGE_CONFIG } from '../config';

// Static problems reference for synchronous access (fallback for lazy loading)
const PROBLEMS_BY_LANGUAGE: Partial<Record<LanguageId, Problem[]>> = problemsByLanguage;

// ============================================================================
// Types
// ============================================================================

type DrillPhase = 'setup' | 'loading' | 'drilling' | 'feedback' | 'results';

interface DrillConfig {
  categories: string[];
  questionCount: number;
  difficulty: Difficulty | 'all';
  selectedQuestionIds?: string[];
  includeSiblingLanguage?: boolean;
}

// Define sibling language pairs
const SIBLING_LANGUAGES: Partial<Record<LanguageId, LanguageId>> = {
  javascript: 'typescript',
  typescript: 'javascript',
};

// Extended problem type that tracks source language
interface ProblemWithLanguage extends Problem {
  sourceLanguage: LanguageId;
}

interface DrillState {
  currentIndex: number;
  answers: AnswerRecord[];
  streak: number;
  maxStreak: number;
  startTime: number;
  endTime?: number;
  totalScore: number;
}

interface AnswerRecord {
  problem: ProblemWithLanguage;
  userAnswer: string;
  isCorrect: boolean;
  error?: string;
  userOutput?: unknown;
  skipped: boolean;
  timeTaken: number;
  pointsEarned: number;
}

// ============================================================================
// Scoring System
// ============================================================================

/**
 * Calculate points for an answer based on correctness and speed
 * - Base points: 100 for correct, 0 for incorrect/skipped
 * - Speed bonus: Up to 50 extra points for fast answers
 * - Streak bonus: Multiplier for consecutive correct answers
 */
function calculatePoints(
  isCorrect: boolean,
  timeTaken: number,
  streak: number,
  difficulty: Difficulty,
): number {
  if (!isCorrect) return 0;

  // Base points by difficulty
  const basePoints: Record<Difficulty, number> = {
    easy: 100,
    medium: 150,
    hard: 200,
  };

  // Speed bonus thresholds (in ms)
  const FAST_THRESHOLD = 5000; // Under 5 seconds = max bonus
  const MEDIUM_THRESHOLD = 15000; // Under 15 seconds = partial bonus
  const MAX_SPEED_BONUS = 50;

  let speedBonus = 0;
  if (timeTaken <= FAST_THRESHOLD) {
    speedBonus = MAX_SPEED_BONUS;
  } else if (timeTaken <= MEDIUM_THRESHOLD) {
    // Linear interpolation between fast and medium thresholds
    const ratio = 1 - (timeTaken - FAST_THRESHOLD) / (MEDIUM_THRESHOLD - FAST_THRESHOLD);
    speedBonus = Math.round(MAX_SPEED_BONUS * ratio);
  }

  // Streak multiplier: 1.0 base, +0.1 per streak up to 2.0 max
  const streakMultiplier = Math.min(1 + streak * 0.1, 2.0);

  const totalPoints = Math.round((basePoints[difficulty] + speedBonus) * streakMultiplier);
  return totalPoints;
}

// ============================================================================
// Lazy-loaded Problem Data by Language (Code Splitting)
// ============================================================================

// Problem loaders - dynamically imported only when needed
const problemLoaders: Record<
  LanguageId,
  () => Promise<{ default: Problem[] } | { [key: string]: Problem[] }>
> = {
  javascript: () => import('@/lib/problems/javascript'),
  typescript: () => import('@/lib/problems/typescript'),
  python: () => import('@/lib/problems/python'),
  java: () => import('@/lib/problems/java'),
  cpp: () => import('@/lib/problems/cpp'),
  csharp: () => import('@/lib/problems/csharp'),
  ruby: () => import('@/lib/problems/ruby'),
  go: () => import('@/lib/problems/go'),
  c: () => import('@/lib/problems/c'),
  php: () => import('@/lib/problems/php'),
  kotlin: () => import('@/lib/problems/kotlin'),
  // New languages
  rust: () => import('@/lib/problems/rust'),
  swift: () => import('@/lib/problems/swift'),
  scala: () => import('@/lib/problems/scala'),
  r: () => import('@/lib/problems/r'),
  perl: () => import('@/lib/problems/perl'),
  lua: () => import('@/lib/problems/lua'),
  haskell: () => import('@/lib/problems/haskell'),
  elixir: () => import('@/lib/problems/elixir'),
  dart: () => import('@/lib/problems/dart'),
  clojure: () => import('@/lib/problems/clojure'),
  // Database languages
  postgresql: () => import('@/lib/problems/postgresql'),
  mysql: () => import('@/lib/problems/mysql'),
  mongodb: () => Promise.resolve({ default: [] }), // MongoDB problems can be added later
};

// Extract problems from module based on naming convention
function extractProblems(
  mod: { default?: Problem[]; [key: string]: Problem[] | undefined },
  language: LanguageId,
): Problem[] {
  // Try default export first
  if (mod.default && Array.isArray(mod.default)) {
    return mod.default;
  }
  // Try named export matching pattern
  const namedKey = `${language}Problems`;
  if (mod[namedKey] && Array.isArray(mod[namedKey])) {
    return mod[namedKey] as Problem[];
  }
  // Fallback: find first array export
  for (const value of Object.values(mod)) {
    if (Array.isArray(value)) {
      return value;
    }
  }
  return [];
}

// Cache for loaded problems to avoid re-fetching
const problemsCache = new Map<LanguageId, Problem[]>();

async function _loadProblems(language: LanguageId): Promise<Problem[]> {
  // Check cache first
  const cached = problemsCache.get(language);
  if (cached) {
    return cached;
  }

  const loader = problemLoaders[language];
  if (!loader) return [];

  try {
    const mod = await loader();
    const problems = extractProblems(
      mod as { default?: Problem[]; [key: string]: Problem[] | undefined },
      language,
    );
    problemsCache.set(language, problems);
    return problems;
  } catch (error) {
    console.error(`Failed to load problems for ${language}:`, error);
    return [];
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getCategories(language: LanguageId, includeSibling = false): string[] {
  const problems = PROBLEMS_BY_LANGUAGE[language] || [];
  const categories = new Set(problems.map((p) => p.category));

  // Include sibling language categories if requested
  if (includeSibling) {
    const siblingLang = SIBLING_LANGUAGES[language];
    if (siblingLang) {
      const siblingProblems = PROBLEMS_BY_LANGUAGE[siblingLang] || [];
      for (const p of siblingProblems) {
        categories.add(p.category);
      }
    }
  }

  return Array.from(categories).sort();
}

function selectProblems(language: LanguageId, config: DrillConfig): ProblemWithLanguage[] {
  // Tag problems with their source language
  const baseProblems: ProblemWithLanguage[] = (PROBLEMS_BY_LANGUAGE[language] || []).map((p) => ({
    ...p,
    sourceLanguage: language,
  }));

  let problems: ProblemWithLanguage[] = baseProblems;

  // Include sibling language problems if requested
  if (config.includeSiblingLanguage) {
    const siblingLang = SIBLING_LANGUAGES[language];
    if (siblingLang) {
      const siblingProblems: ProblemWithLanguage[] = (PROBLEMS_BY_LANGUAGE[siblingLang] || []).map(
        (p) => ({
          ...p,
          sourceLanguage: siblingLang,
        }),
      );
      problems = [...problems, ...siblingProblems];
    }
  }

  // If specific questions are selected, use only those
  if (config.selectedQuestionIds && config.selectedQuestionIds.length > 0) {
    const selectedSet = new Set(config.selectedQuestionIds);
    problems = problems.filter((p) => selectedSet.has(p.id));
    // Shuffle the selected problems
    return shuffleArray(problems);
  }

  // Filter by categories
  if (config.categories.length > 0) {
    problems = problems.filter((p) => config.categories.includes(p.category));
  }

  // Filter by difficulty
  if (config.difficulty !== 'all') {
    problems = problems.filter((p) => p.difficulty === config.difficulty);
  }

  // Shuffle and select
  const shuffled = shuffleArray(problems);
  return shuffled.slice(0, config.questionCount);
}

function isValidLanguage(lang: string): lang is LanguageId {
  // Use SUPPORTED_LANGUAGES from config to ensure all languages are included
  const SUPPORTED_LANGUAGES: LanguageId[] = [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'csharp',
    'go',
    'ruby',
    'c',
    'php',
    'kotlin',
    'rust',
    'swift',
    'scala',
    'r',
    'perl',
    'lua',
    'haskell',
    'elixir',
    'dart',
    'clojure',
    'postgresql',
    'mysql',
    'mongodb',
  ];
  return SUPPORTED_LANGUAGES.includes(lang as LanguageId);
}

// ============================================================================
// Components
// ============================================================================

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  count?: number;
}

function Chip({ label, selected, onClick, count }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
        selected ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            selected ? 'bg-blue-400/30 text-blue-100' : 'bg-zinc-700 text-zinc-400'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

interface DifficultyFilterProps {
  value: Difficulty | 'all';
  onChange: (value: Difficulty | 'all') => void;
}

function DifficultyFilter({ value, onChange }: DifficultyFilterProps) {
  const options: { value: Difficulty | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'All', color: 'bg-zinc-500' },
    { value: 'easy', label: 'Easy', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'bg-red-500' },
  ];

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
            value === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${option.color}`} />
          {option.label}
        </button>
      ))}
    </div>
  );
}

function CodeDisplay({ code }: { code: string }) {
  return (
    <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg font-mono text-sm leading-relaxed border border-zinc-800 whitespace-pre-wrap break-words overflow-wrap-anywhere">
      <code className="block">{code}</code>
    </pre>
  );
}

interface SetupPhaseProps {
  language: LanguageId;
  onStart: (config: DrillConfig) => void;
}

function SetupPhase({ language, onStart }: SetupPhaseProps) {
  const siblingLanguage = SIBLING_LANGUAGES[language];
  const [includeSibling, setIncludeSibling] = useState(false);

  // Get categories based on whether sibling is included
  const categories = getCategories(language, includeSibling);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [showQuestionBrowser, setShowQuestionBrowser] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Get problem counts per category
  const categoryCounts = (() => {
    const baseCounts = getProblemCountsByCategory(language);

    // Include sibling language counts if toggled
    if (includeSibling && siblingLanguage) {
      const siblingCounts = getProblemCountsByCategory(siblingLanguage);
      const combined: Record<string, number> = { ...baseCounts };
      for (const [category, count] of Object.entries(siblingCounts)) {
        combined[category] = (combined[category] || 0) + count;
      }
      return combined;
    }

    return baseCounts;
  })();

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const handleStart = () => {
    onStart({
      categories: selectedCategories,
      questionCount: selectedQuestionIds.size > 0 ? selectedQuestionIds.size : questionCount,
      difficulty,
      selectedQuestionIds:
        selectedQuestionIds.size > 0 ? Array.from(selectedQuestionIds) : undefined,
      includeSiblingLanguage: includeSibling,
    });
  };

  // Get all problems for browsing (without the random selection limit)
  const allFilteredProblems = (() => {
    let problems = PROBLEMS_BY_LANGUAGE[language] || [];

    // Include sibling language problems if toggled
    if (includeSibling && siblingLanguage) {
      const siblingProblems = PROBLEMS_BY_LANGUAGE[siblingLanguage] || [];
      problems = [...problems, ...siblingProblems];
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      problems = problems.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by difficulty
    if (difficulty !== 'all') {
      problems = problems.filter((p) => p.difficulty === difficulty);
    }

    return problems;
  })();

  // Further filter by search query for display
  const displayedProblems = searchQuery.trim()
    ? allFilteredProblems.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.text.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allFilteredProblems;

  const availableCount = allFilteredProblems.length;

  // Clamp questionCount when availableCount decreases
  useEffect(() => {
    const maxQuestions = Math.min(50, availableCount || 50);
    if (questionCount > maxQuestions) {
      // Use setTimeout to avoid setState in effect
      setTimeout(() => {
        setQuestionCount(maxQuestions);
      }, 0);
    }
  }, [availableCount, questionCount]);

  const toggleQuestion = (id: string) => {
    setSelectedQuestionIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAllVisible = () => {
    setSelectedQuestionIds((prev) => {
      const newSet = new Set(prev);
      for (const p of displayedProblems) {
        newSet.add(p.id);
      }
      return newSet;
    });
  };

  const clearSelectedQuestions = () => {
    setSelectedQuestionIds(new Set());
  };

  // Get proper language name from config
  const languageName =
    LANGUAGE_CONFIG[language]?.name || language.charAt(0).toUpperCase() + language.slice(1);

  const difficultyColors: Record<Difficulty, string> = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">{languageName} Drill Mode</h1>
        <p className="text-zinc-400">Configure your practice session</p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 space-y-6">
        {/* Sibling Language Toggle (only for JS/TS) */}
        {siblingLanguage && (
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <div>
              <span className="block text-sm font-medium text-zinc-300">
                Include {siblingLanguage.charAt(0).toUpperCase() + siblingLanguage.slice(1)}{' '}
                Questions
              </span>
              <span className="text-xs text-zinc-500">
                Practice both languages together since they share similar syntax
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIncludeSibling(!includeSibling)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 cursor-pointer ${
                includeSibling ? 'bg-blue-500' : 'bg-zinc-600'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                  includeSibling ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        )}

        {/* Categories */}
        <div>
          <span className="block text-sm font-medium text-zinc-300 mb-3">
            Categories {selectedCategories.length > 0 && `(${selectedCategories.length} selected)`}
          </span>
          {categories.length === 0 ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm">
                No problems available for {languageName} yet. Problems are being added regularly!
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    selected={selectedCategories.includes(category)}
                    onClick={() => toggleCategory(category)}
                    count={categoryCounts[category] || 0}
                  />
                ))}
              </div>
              {selectedCategories.length === 0 && (
                <p className="text-xs text-zinc-500 mt-2">
                  No categories selected - all categories will be included
                </p>
              )}
            </>
          )}
        </div>

        {/* Question Count */}
        <div>
          <QuestionCountSlider
            value={questionCount}
            onChange={setQuestionCount}
            min={1}
            max={Math.min(50, availableCount || 50)}
            label="Number of Questions"
          />
        </div>

        {/* Difficulty */}
        <div>
          <span className="block text-sm font-medium text-zinc-300 mb-3">Difficulty</span>
          <DifficultyFilter value={difficulty} onChange={setDifficulty} />
        </div>

        {/* Question Browser Toggle */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-300">
              Questions ({availableCount} available)
              {selectedQuestionIds.size > 0 && (
                <span className="ml-2 text-blue-400">({selectedQuestionIds.size} selected)</span>
              )}
            </span>
            <button
              type="button"
              onClick={() => setShowQuestionBrowser(!showQuestionBrowser)}
              className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              {showQuestionBrowser ? 'Hide List' : 'Browse Questions'}
            </button>
          </div>

          {/* Question Browser Panel */}
          {showQuestionBrowser && (
            <div className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
              {/* Search and Actions */}
              <div className="p-3 border-b border-zinc-700 space-y-3">
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title, category, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={selectAllVisible}
                    className="px-3 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Select All Visible ({displayedProblems.length})
                  </button>
                  {selectedQuestionIds.size > 0 && (
                    <button
                      type="button"
                      onClick={clearSelectedQuestions}
                      className="px-3 py-1.5 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>
              </div>

              {/* Question List */}
              <div className="max-h-64 overflow-y-auto">
                {displayedProblems.length === 0 ? (
                  <div className="p-4 text-center text-zinc-500 text-sm">
                    {searchQuery ? 'No questions match your search' : 'No questions available'}
                  </div>
                ) : (
                  displayedProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className={`flex items-center border-b border-zinc-700 last:border-b-0 transition-colors ${
                        selectedQuestionIds.has(problem.id)
                          ? 'bg-blue-500/20'
                          : 'hover:bg-zinc-700/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleQuestion(problem.id)}
                        className="flex-1 p-3 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Checkbox */}
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              selectedQuestionIds.has(problem.id)
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-zinc-600'
                            }`}
                          >
                            {selectedQuestionIds.has(problem.id) && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          {/* Title and Category */}
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-zinc-100 truncate">
                              {problem.title}
                            </div>
                            <div className="text-xs text-zinc-500">{problem.category}</div>
                          </div>
                        </div>
                        {/* Difficulty Badge */}
                        <span
                          className={`text-xs px-2 py-0.5 rounded border flex-shrink-0 ${difficultyColors[problem.difficulty]}`}
                        >
                          {problem.difficulty}
                        </span>
                      </button>
                      {/* Practice individually link */}
                      <Link
                        href={`/${language}/problems/${problem.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 text-zinc-500 hover:text-blue-400 transition-colors flex-shrink-0"
                        title="Practice this problem individually"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </div>
                  ))
                )}
              </div>

              {/* Footer with count */}
              {displayedProblems.length > 0 && (
                <div className="p-2 border-t border-zinc-700 bg-zinc-900/50 text-xs text-zinc-500 text-center">
                  Showing {displayedProblems.length} of {availableCount} questions
                  {searchQuery && ` matching "${searchQuery}"`}
                </div>
              )}
            </div>
          )}

          {/* Selected Questions Summary (when browser is hidden but questions are selected) */}
          {!showQuestionBrowser && selectedQuestionIds.size > 0 && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-blue-400">
                {selectedQuestionIds.size} specific question
                {selectedQuestionIds.size !== 1 ? 's' : ''} selected
              </span>
              <button
                type="button"
                onClick={clearSelectedQuestions}
                className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Start Button */}
      <button
        type="button"
        onClick={handleStart}
        disabled={availableCount === 0 && selectedQuestionIds.size === 0}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-lg cursor-pointer"
      >
        {selectedQuestionIds.size > 0
          ? `Start Drilling (${selectedQuestionIds.size} questions)`
          : 'Start Drilling'}
      </button>
    </div>
  );
}

interface DrillPhaseProps {
  problems: ProblemWithLanguage[];
  state: DrillState;
  language: LanguageId;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  questionStartTime: number;
}

function DrillPhaseComponent({
  problems,
  state,
  language,
  onAnswer,
  onSkip,
  questionStartTime,
}: DrillPhaseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);
  const currentProblem = problems[state.currentIndex];

  // Total time timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - state.startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [state.startTime]);

  // Per-question stopwatch effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentIndex needed to reset timer on question change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Timer reset is intentional on question change
    setQuestionTime(0); // Reset when question changes
    const interval = setInterval(() => {
      setQuestionTime(Date.now() - questionStartTime);
    }, 100); // Update more frequently for smoother display
    return () => clearInterval(interval);
  }, [questionStartTime, state.currentIndex]);

  const handleSubmit = useCallback(() => {
    if (userAnswer.trim()) {
      onAnswer(userAnswer.trim());
      setUserAnswer('');
    }
  }, [userAnswer, onAnswer]);

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-800">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100">
              {state.currentIndex + 1} / {problems.length}
            </div>
            <div className="text-xs text-zinc-500">Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 font-mono">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-xs text-zinc-500">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {state.totalScore.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-500">Score</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Per-question stopwatch */}
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 font-mono">
              {(questionTime / 1000).toFixed(1)}s
            </div>
            <div className="text-xs text-zinc-500">Question</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{state.streak}</div>
            <div className="text-xs text-zinc-500">Streak</div>
          </div>
        </div>
      </div>

      {/* Problem Card */}
      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        {/* Problem Header */}
        <div className="border-b border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-zinc-100">{currentProblem.title}</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                {currentProblem.category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded border ${difficultyColors[currentProblem.difficulty]}`}
              >
                {currentProblem.difficulty}
              </span>
            </div>
          </div>
          <p className="text-zinc-400">{currentProblem.text}</p>
        </div>

        {/* Setup Code */}
        <div className="p-4 border-b border-zinc-800">
          <span className="block text-sm font-medium text-zinc-300 mb-2">Setup Code</span>
          <CodeDisplay code={currentProblem.setupCode} />
        </div>

        {/* Expected Output */}
        <div className="p-4 border-b border-zinc-800">
          <span className="block text-sm font-medium text-zinc-300 mb-2">Expected Output</span>
          <div className="bg-zinc-800 p-3 rounded-lg font-mono text-sm text-green-400 border border-zinc-700">
            {formatOutput(currentProblem.expected)}
          </div>
        </div>

        {/* Answer Input */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-zinc-300">Your Answer</span>
            {currentProblem.sourceLanguage !== language && (
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  currentProblem.sourceLanguage === 'typescript'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {currentProblem.sourceLanguage === 'typescript' ? 'TypeScript' : 'JavaScript'}
              </span>
            )}
          </div>
          <CodeEditor
            code={userAnswer}
            onChange={setUserAnswer}
            language={currentProblem.sourceLanguage}
            height={120}
            minHeight={120}
            lineNumbers={true}
            autoFocus
            onSubmitShortcut={handleSubmit}
            className="border-zinc-700"
          />
          <p className="text-xs text-zinc-500 mt-2">Press Cmd/Ctrl + Enter to submit</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 bg-zinc-800/50 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="py-3 px-6 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

interface FeedbackPhaseProps {
  answerRecord: AnswerRecord;
  onNext: () => void;
}

function FeedbackPhase({ answerRecord, onNext }: FeedbackPhaseProps) {
  const { problem, userAnswer, isCorrect, error, userOutput, skipped } = answerRecord;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Result Banner */}
      <div
        className={`rounded-xl p-6 text-center border ${
          skipped
            ? 'bg-zinc-800 border-zinc-700'
            : isCorrect
              ? 'bg-green-500/20 border-green-500/30'
              : 'bg-red-500/20 border-red-500/30'
        }`}
      >
        <div
          className={`text-4xl mb-2 font-bold ${
            skipped ? 'text-zinc-400' : isCorrect ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {skipped ? 'Skipped' : isCorrect ? 'Correct!' : 'Incorrect'}
        </div>
        {isCorrect && answerRecord.pointsEarned > 0 && (
          <div className="text-xl text-blue-400 font-semibold animate-pulse">
            +{answerRecord.pointsEarned} points
          </div>
        )}
        {!skipped && !isCorrect && error && <p className="text-sm text-red-400">{error}</p>}
        {/* Time taken */}
        <p className="text-sm text-zinc-500 mt-2">
          Answered in {(answerRecord.timeTaken / 1000).toFixed(1)}s
        </p>
      </div>

      {/* Comparison */}
      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        {/* Your Answer */}
        <div className="p-4 border-b border-zinc-800">
          <span className="block text-sm font-medium text-zinc-300 mb-2">Your Answer</span>
          <div className="bg-zinc-800 text-zinc-100 p-4 rounded-lg font-mono text-sm border border-zinc-700">
            {skipped ? <span className="text-zinc-500">(skipped)</span> : userAnswer}
          </div>
        </div>

        {/* Your Output */}
        {!skipped && userOutput !== undefined && (
          <div className="p-4 border-b border-zinc-800">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Your Output</span>
            <div
              className={`p-3 rounded-lg font-mono text-sm border ${
                isCorrect
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {formatOutput(userOutput)}
            </div>
          </div>
        )}

        {/* Expected Output */}
        <div className="p-4 border-b border-zinc-800">
          <span className="block text-sm font-medium text-zinc-300 mb-2">Expected Output</span>
          <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg font-mono text-sm text-green-400">
            {formatOutput(problem.expected)}
          </div>
        </div>

        {/* Sample Solution (shown when incorrect or skipped) */}
        {(!isCorrect || skipped) && (
          <div className="p-4">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Sample Solution</span>
            <CodeDisplay code={problem.sample} />
          </div>
        )}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-lg cursor-pointer"
      >
        Next Question
      </button>
    </div>
  );
}

interface ResultsPhaseProps {
  state: DrillState;
  onTryAgain: () => void;
  onBackToMenu: () => void;
}

function ResultsPhase({ state, onTryAgain, onBackToMenu }: ResultsPhaseProps) {
  const [showMissed, setShowMissed] = useState(false);
  // Use lazy initializer to capture time only once (on first render)
  const [capturedTime] = useState(() => Date.now());

  const totalQuestions = state.answers.length;
  const correctAnswers = state.answers.filter((a) => a.isCorrect && !a.skipped).length;
  const skippedAnswers = state.answers.filter((a) => a.skipped).length;
  const incorrectAnswers = totalQuestions - correctAnswers - skippedAnswers;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const totalTime = (state.endTime || capturedTime) - state.startTime;
  const missedQuestions = state.answers.filter((a) => !a.isCorrect || a.skipped);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Results Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Drill Complete!</h1>
        <p className="text-zinc-400">Here is how you did</p>
      </div>

      {/* Total Score Highlight */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 text-center border border-blue-500/30">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {state.totalScore.toLocaleString()}
        </div>
        <div className="text-sm text-zinc-400 mt-1 uppercase tracking-wider">Total Points</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-green-500">
            {correctAnswers} / {totalQuestions}
          </div>
          <div className="text-sm text-zinc-500 mt-1">Correct</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-blue-500">{accuracy}%</div>
          <div className="text-sm text-zinc-500 mt-1">Accuracy</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-zinc-100 font-mono">{formatTime(totalTime)}</div>
          <div className="text-sm text-zinc-500 mt-1">Time</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-orange-500">{state.maxStreak}</div>
          <div className="text-sm text-zinc-500 mt-1">Max Streak</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Breakdown</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-zinc-300">Correct</span>
            </span>
            <span className="font-medium text-zinc-100">{correctAnswers}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-zinc-300">Incorrect</span>
            </span>
            <span className="font-medium text-zinc-100">{incorrectAnswers}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-500" />
              <span className="text-zinc-300">Skipped</span>
            </span>
            <span className="font-medium text-zinc-100">{skippedAnswers}</span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4 h-3 rounded-full overflow-hidden bg-zinc-800 flex">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
          />
          <div
            className="bg-red-500 h-full"
            style={{ width: `${(incorrectAnswers / totalQuestions) * 100}%` }}
          />
          <div
            className="bg-zinc-500 h-full"
            style={{ width: `${(skippedAnswers / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Missed Questions Review */}
      {missedQuestions.length > 0 && (
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowMissed(!showMissed)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <span className="font-semibold text-zinc-100">
              Review Missed Questions ({missedQuestions.length})
            </span>
            <span className="text-zinc-500">{showMissed ? '-' : '+'}</span>
          </button>
          {showMissed && (
            <div className="border-t border-zinc-800">
              {missedQuestions.map((record, index) => (
                <div key={index} className="p-4 border-b last:border-b-0 border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-zinc-100">{record.problem.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded border ${
                        record.skipped
                          ? 'bg-zinc-800 border-zinc-700 text-zinc-400'
                          : 'bg-red-500/20 border-red-500/30 text-red-400'
                      }`}
                    >
                      {record.skipped ? 'Skipped' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{record.problem.text}</p>
                  <div className="text-sm">
                    <span className="text-zinc-500">Solution: </span>
                    <code className="bg-zinc-800 px-2 py-1 rounded text-blue-400 border border-zinc-700">
                      {record.problem.sample}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onTryAgain}
          className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={onBackToMenu}
          className="flex-1 py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl transition-colors border border-zinc-700 cursor-pointer"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function DrillPage() {
  const params = useParams();
  const router = useRouter();
  const languageParam = params.language as string;

  // Validate language parameter
  const language: LanguageId = isValidLanguage(languageParam) ? languageParam : 'javascript';

  const [phase, setPhase] = useState<DrillPhase>('setup');
  const [config, setConfig] = useState<DrillConfig | null>(null);
  const [problems, setProblems] = useState<ProblemWithLanguage[]>([]);
  const [drillState, setDrillState] = useState<DrillState>({
    currentIndex: 0,
    answers: [],
    streak: 0,
    maxStreak: 0,
    startTime: 0,
    totalScore: 0,
  });
  const [currentAnswer, setCurrentAnswer] = useState<AnswerRecord | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(0);

  const handleStart = useCallback(
    (newConfig: DrillConfig) => {
      const selectedProblems = selectProblems(language, newConfig);

      if (selectedProblems.length === 0) {
        alert('No problems available with the selected filters. Please adjust your selection.');
        return;
      }

      setConfig(newConfig);
      setProblems(selectedProblems);
      const now = Date.now();
      setDrillState({
        currentIndex: 0,
        answers: [],
        streak: 0,
        maxStreak: 0,
        startTime: now,
        totalScore: 0,
      });
      setQuestionStartTime(now);
      setPhase('drilling');
    },
    [language],
  );

  const handleAnswer = useCallback(
    (userAnswer: string) => {
      const currentProblem = problems[drillState.currentIndex];
      const result = validateProblemAnswer(currentProblem, userAnswer, language);
      const timeTaken = Date.now() - questionStartTime;

      // Calculate points (use current streak before updating)
      const pointsEarned = calculatePoints(
        result.success,
        timeTaken,
        drillState.streak,
        currentProblem.difficulty,
      );

      const answerRecord: AnswerRecord = {
        problem: currentProblem,
        userAnswer,
        isCorrect: result.success,
        error: result.success ? undefined : result.error,
        userOutput: 'output' in result ? result.output : undefined,
        skipped: false,
        timeTaken,
        pointsEarned,
      };

      setCurrentAnswer(answerRecord);

      // Update state with answer and score
      setDrillState((prev) => {
        const newStreak = result.success ? prev.streak + 1 : 0;
        return {
          ...prev,
          answers: [...prev.answers, answerRecord],
          streak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak),
          totalScore: prev.totalScore + pointsEarned,
        };
      });

      setPhase('feedback');
    },
    [problems, drillState.currentIndex, drillState.streak, questionStartTime, language],
  );

  const handleSkip = useCallback(() => {
    const currentProblem = problems[drillState.currentIndex];
    const timeTaken = Date.now() - questionStartTime;

    const answerRecord: AnswerRecord = {
      problem: currentProblem,
      userAnswer: '',
      isCorrect: false,
      error: 'Skipped',
      skipped: true,
      timeTaken,
      pointsEarned: 0,
    };

    setCurrentAnswer(answerRecord);

    setDrillState((prev) => ({
      ...prev,
      answers: [...prev.answers, answerRecord],
      streak: 0,
    }));

    setPhase('feedback');
  }, [problems, drillState.currentIndex, questionStartTime]);

  const handleNext = useCallback(() => {
    const nextIndex = drillState.currentIndex + 1;

    if (nextIndex >= problems.length) {
      // Drill complete
      setDrillState((prev) => ({
        ...prev,
        endTime: Date.now(),
      }));
      setPhase('results');
    } else {
      // Move to next question
      setDrillState((prev) => ({
        ...prev,
        currentIndex: nextIndex,
      }));
      setQuestionStartTime(Date.now());
      setPhase('drilling');
    }

    setCurrentAnswer(null);
  }, [drillState.currentIndex, problems.length]);

  const handleTryAgain = useCallback(() => {
    if (config) {
      handleStart(config);
    }
  }, [config, handleStart]);

  const handleBackToMenu = useCallback(() => {
    router.push(`/${language}`);
  }, [router, language]);

  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      {phase === 'setup' && <SetupPhase language={language} onStart={handleStart} />}

      {phase === 'drilling' && problems.length > 0 && (
        <DrillPhaseComponent
          problems={problems}
          state={drillState}
          language={language}
          onAnswer={handleAnswer}
          onSkip={handleSkip}
          questionStartTime={questionStartTime}
        />
      )}

      {phase === 'feedback' && currentAnswer && (
        <FeedbackPhase answerRecord={currentAnswer} onNext={handleNext} />
      )}

      {phase === 'results' && (
        <ResultsPhase
          state={drillState}
          onTryAgain={handleTryAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}
