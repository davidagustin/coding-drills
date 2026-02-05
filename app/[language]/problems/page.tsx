'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getBeginnerProblemIds, hasBeginnerProblems } from '@/lib/problems/beginner';
import { problemsByLanguage } from '@/lib/problems/index';
import {
  getInterviewRecommendedIds,
  hasInterviewRecommended,
} from '@/lib/problems/interview-recommended';
import type { Difficulty, LanguageId, Problem } from '@/lib/types';
import {
  getTrainingLabel,
  isDatabaseLanguage,
  isValidLanguage,
  LANGUAGE_CONFIG,
  type SupportedLanguage,
} from '../config';

// ============================================================================
// Types
// ============================================================================

interface ProblemProgress {
  [problemId: string]: {
    solved: boolean;
    attempts: number;
    lastAttempt?: string;
  };
}

type SortField = 'number' | 'difficulty' | 'category' | 'title';
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'all' | 'solved' | 'attempted' | 'new';

// ============================================================================
// Constants
// ============================================================================

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'text-green-500',
  medium: 'text-yellow-500',
  hard: 'text-red-500',
};

const DIFFICULTY_BG_COLORS: Record<Difficulty, string> = {
  easy: 'bg-green-500/10 border-green-500/30',
  medium: 'bg-yellow-500/10 border-yellow-500/30',
  hard: 'bg-red-500/10 border-red-500/30',
};

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

// ============================================================================
// Icon Components
// ============================================================================

function CheckCircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CircleHalfIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" strokeDasharray="2 2" />
    </svg>
  );
}

function CircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function SearchIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function ChevronUpDownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
  );
}

function ArrowLeftIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

function getStorageKey(language: string): string {
  return `coding-drills-problems-${language}`;
}

function loadProgress(language: string): ProblemProgress {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(getStorageKey(language));
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// ============================================================================
// Components
// ============================================================================

interface FilterDropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs text-zinc-500 font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ProblemRowProps {
  problem: Problem;
  number: number;
  language: string;
  progress?: { solved: boolean; attempts: number };
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
}

function ProblemRow({ problem, number, language, progress, config }: ProblemRowProps) {
  const statusIcon = useMemo(() => {
    if (progress?.solved) {
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    }
    if (progress?.attempts && progress.attempts > 0) {
      return <CircleHalfIcon className="w-5 h-5 text-yellow-500" />;
    }
    return <CircleIcon className="w-5 h-5 text-zinc-600" />;
  }, [progress]);

  return (
    <Link
      href={`/${language}/problems/${problem.id}`}
      className="group flex items-center gap-4 px-4 py-3 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800 last:border-b-0"
    >
      {/* Number */}
      <div className="w-12 text-sm text-zinc-500 font-mono">{number}</div>

      {/* Status */}
      <div className="w-8">{statusIcon}</div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h3 className="text-zinc-100 font-medium truncate group-hover:text-white transition-colors">
          {problem.title}
        </h3>
      </div>

      {/* Category */}
      <div className="hidden sm:block w-40">
        <span
          className={`inline-flex px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color} border ${config.borderColor}`}
        >
          {problem.category}
        </span>
      </div>

      {/* Difficulty */}
      <div className="w-20">
        <span
          className={`inline-flex px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${DIFFICULTY_BG_COLORS[problem.difficulty]} ${DIFFICULTY_COLORS[problem.difficulty]}`}
        >
          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
        </span>
      </div>
    </Link>
  );
}

interface ProgressStatsProps {
  total: number;
  solved: number;
  attempted: number;
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
}

function ProgressStats({ total, solved, attempted, config }: ProgressStatsProps) {
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-4`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-zinc-300">Your Progress</span>
        <span className={`text-lg font-bold ${config.color}`}>
          {solved} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden mb-3">
        <div
          className={`h-full transition-all duration-500 ${config.bgColor.replace('/10', '')}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex gap-2 sm:gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Solved: {solved}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          Attempted: {attempted}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-zinc-600" />
          New: {total - solved - attempted}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function ProblemsPage() {
  const params = useParams();
  const router = useRouter();
  const language = params.language as string;
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<ProblemProgress>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [interviewOnly, setInterviewOnly] = useState(false);
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [sortField, setSortField] = useState<SortField>('number');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Track mount state for hydration safety
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  // Load progress and validate language
  useEffect(() => {
    if (!mounted) return;

    if (!isValidLanguage(language)) {
      router.replace('/not-found');
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage
    setProgress(loadProgress(language));
  }, [language, router, mounted]);

  // Get all problems for this language
  const allProblems = useMemo(() => {
    if (!isValidLanguage(language)) return [];
    return problemsByLanguage[language as LanguageId] || [];
  }, [language]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allProblems.map((p) => p.category));
    return Array.from(cats).sort();
  }, [allProblems]);

  // Filter and sort problems
  const filteredProblems = useMemo(() => {
    let result = [...allProblems];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.text.toLowerCase().includes(query),
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter((p) => p.difficulty === difficultyFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((p) => {
        const prog = progress[p.id];
        switch (statusFilter) {
          case 'solved':
            return prog?.solved;
          case 'attempted':
            return prog?.attempts && prog.attempts > 0 && !prog.solved;
          case 'new':
            return !prog?.attempts || prog.attempts === 0;
          default:
            return true;
        }
      });
    }

    // Interview recommended filter
    if (interviewOnly) {
      const ids = getInterviewRecommendedIds(language);
      result = result.filter((p) => ids.has(p.id));
    }

    // Beginner mode filter
    if (beginnerOnly) {
      const ids = getBeginnerProblemIds(language);
      result = result.filter((p) => ids.has(p.id));
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      const aIndex = allProblems.indexOf(a);
      const bIndex = allProblems.indexOf(b);

      switch (sortField) {
        case 'number':
          comparison = aIndex - bIndex;
          break;
        case 'difficulty':
          comparison = DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [
    allProblems,
    searchQuery,
    categoryFilter,
    difficultyFilter,
    statusFilter,
    interviewOnly,
    beginnerOnly,
    language,
    sortField,
    sortDirection,
    progress,
  ]);

  // Calculate stats
  const stats = useMemo(() => {
    const solved = Object.values(progress).filter((p) => p.solved).length;
    const attempted = Object.values(progress).filter((p) => p.attempts > 0 && !p.solved).length;
    return { solved, attempted };
  }, [progress]);

  // Get problem number mapping (original index + 1)
  const getProblemNumber = useCallback(
    (problem: Problem) => {
      return allProblems.indexOf(problem) + 1;
    },
    [allProblems],
  );

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    },
    [sortField],
  );

  if (!mounted) {
    return null;
  }

  if (!isValidLanguage(language)) {
    return null;
  }

  const config = LANGUAGE_CONFIG[language];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Back link */}
      <Link
        href={`/${language}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group"
      >
        <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to {config.name}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {config.name} {getTrainingLabel(language)}
        </h1>
        <p className="text-zinc-400">
          {isDatabaseLanguage(language)
            ? `Train your ability to write queries, use operators, and master database patterns with ${allProblems.length} challenges`
            : `Train your ability to transform data, use methods, and write clean code with ${allProblems.length} challenges`}
        </p>
      </div>

      {/* Progress Stats */}
      <div className="mb-6">
        <ProgressStats
          total={allProblems.length}
          solved={stats.solved}
          attempted={stats.attempted}
          config={config}
        />
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4">
          {/* Search */}
          <div className="flex-1">
            <label
              htmlFor="problems-search"
              className="text-xs text-zinc-500 font-medium block mb-1"
            >
              Search
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                id="problems-search"
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            options={[
              { value: 'all', label: 'All Categories' },
              ...categories.map((c) => ({ value: c, label: c })),
            ]}
            onChange={setCategoryFilter}
          />

          {/* Difficulty */}
          <FilterDropdown
            label="Difficulty"
            value={difficultyFilter}
            options={[
              { value: 'all', label: 'All Difficulties' },
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
            ]}
            onChange={(v) => setDifficultyFilter(v as Difficulty | 'all')}
          />

          {/* Status */}
          <FilterDropdown
            label="Status"
            value={statusFilter}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'solved', label: 'Solved' },
              { value: 'attempted', label: 'Attempted' },
              { value: 'new', label: 'New' },
            ]}
            onChange={(v) => setStatusFilter(v as StatusFilter)}
          />
        </div>
      </div>

      {/* Interview Recommended Toggle */}
      {hasInterviewRecommended(language) && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-sm font-medium text-zinc-300">Interview Recommended</span>
              <span className="text-xs text-zinc-500">
                Show only problems commonly tested in technical interviews (
                {getInterviewRecommendedIds(language).size})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setInterviewOnly(!interviewOnly)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 cursor-pointer ${
                interviewOnly ? 'bg-amber-500' : 'bg-zinc-600'
              }`}
              role="switch"
              aria-checked={interviewOnly}
              aria-label="Filter to interview recommended problems"
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                  interviewOnly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Beginner Mode Toggle */}
      {hasBeginnerProblems(language) && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-sm font-medium text-zinc-300">Beginner Mode</span>
              <span className="text-xs text-zinc-500">
                Show only fundamental problems: loops, conditionals, basic data structures (
                {getBeginnerProblemIds(language).size})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setBeginnerOnly(!beginnerOnly)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 cursor-pointer ${
                beginnerOnly ? 'bg-emerald-500' : 'bg-zinc-600'
              }`}
              role="switch"
              aria-checked={beginnerOnly}
              aria-label="Filter to beginner problems"
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                  beginnerOnly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Drills Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center gap-4 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
          <button
            type="button"
            onClick={() => handleSort('number')}
            className="w-12 flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
          >
            #
            {sortField === 'number' && (
              <ChevronUpDownIcon
                className={`w-3 h-3 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
              />
            )}
          </button>
          <div className="w-8 text-xs font-medium text-zinc-400">Status</div>
          <button
            type="button"
            onClick={() => handleSort('title')}
            className="flex-1 flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
          >
            Title
            {sortField === 'title' && (
              <ChevronUpDownIcon
                className={`w-3 h-3 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleSort('category')}
            className="hidden sm:flex w-40 items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
          >
            Category
            {sortField === 'category' && (
              <ChevronUpDownIcon
                className={`w-3 h-3 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleSort('difficulty')}
            className="w-20 flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
          >
            Difficulty
            {sortField === 'difficulty' && (
              <ChevronUpDownIcon
                className={`w-3 h-3 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
              />
            )}
          </button>
        </div>

        {/* Table Body */}
        {filteredProblems.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No exercises match your filters.</div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto">
            {filteredProblems.map((problem) => (
              <ProblemRow
                key={problem.id}
                problem={problem}
                number={getProblemNumber(problem)}
                language={language}
                progress={progress[problem.id]}
                config={config}
              />
            ))}
          </div>
        )}

        {/* Table Footer */}
        <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700 text-sm text-zinc-500">
          Showing {filteredProblems.length} of {allProblems.length} exercises
        </div>
      </div>
    </div>
  );
}
