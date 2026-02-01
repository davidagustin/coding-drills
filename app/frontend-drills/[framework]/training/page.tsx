'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FrontendDrillProblem } from '@/lib/frontend-drills';
import {
  FRAMEWORK_CONFIG,
  type FrameworkId,
  getCategories,
  getCategoryCounts,
  getProblemCount,
  getProblems,
  isValidFramework,
} from '@/lib/frontend-drills';
import type { Difficulty } from '@/lib/types';

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

function getStorageKey(framework: string): string {
  return `coding-drills-frontend-training-${framework}`;
}

function loadProgress(framework: string): ProblemProgress {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(getStorageKey(framework));
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
  problem: FrontendDrillProblem;
  number: number;
  framework: string;
  progress?: { solved: boolean; attempts: number };
  config: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}

function ProblemRow({ problem, number, framework, progress, config }: ProblemRowProps) {
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
      href={`/frontend-drills/${framework}/training/${problem.id}`}
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
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color} border ${config.borderColor}`}
        >
          {problem.category}
        </span>
      </div>

      {/* Difficulty */}
      <div className="w-20">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${DIFFICULTY_BG_COLORS[problem.difficulty]} ${DIFFICULTY_COLORS[problem.difficulty]}`}
        >
          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
        </span>
      </div>
    </Link>
  );
}

// Mobile card variant for responsive display
function ProblemCard({ problem, number, framework, progress, config }: ProblemRowProps) {
  const statusLabel = useMemo(() => {
    if (progress?.solved) return { text: 'Solved', color: 'text-green-500' };
    if (progress?.attempts && progress.attempts > 0)
      return { text: 'Attempted', color: 'text-yellow-500' };
    return { text: 'New', color: 'text-zinc-500' };
  }, [progress]);

  return (
    <Link
      href={`/frontend-drills/${framework}/training/${problem.id}`}
      className={`block p-4 rounded-xl border ${config.borderColor} bg-zinc-900/50 hover:bg-zinc-800/50 transition-all`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono">#{number}</span>
          <span className={`text-xs font-medium ${statusLabel.color}`}>{statusLabel.text}</span>
        </div>
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${DIFFICULTY_BG_COLORS[problem.difficulty]} ${DIFFICULTY_COLORS[problem.difficulty]}`}
        >
          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
        </span>
      </div>
      <h3 className="text-zinc-100 font-medium mb-2">{problem.title}</h3>
      <span
        className={`inline-flex px-2 py-0.5 rounded-full text-xs ${config.bgColor} ${config.color} border ${config.borderColor}`}
      >
        {problem.category}
      </span>
    </Link>
  );
}

interface ProgressStatsProps {
  total: number;
  solved: number;
  attempted: number;
  config: (typeof FRAMEWORK_CONFIG)[FrameworkId];
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
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex gap-4 text-xs text-zinc-500">
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

export default function FrontendTrainingPage() {
  const params = useParams();
  const router = useRouter();
  const framework = params.framework as string;
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<ProblemProgress>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('number');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Track mount state for hydration safety
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  // Load progress and validate framework
  useEffect(() => {
    if (!mounted) return;

    if (!isValidFramework(framework)) {
      router.replace('/not-found');
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage
    setProgress(loadProgress(framework));
  }, [framework, router, mounted]);

  // Get all problems for this framework
  const allProblems = useMemo(() => {
    if (!isValidFramework(framework)) return [];
    return getProblems(framework);
  }, [framework]);

  // Get unique categories from the framework
  const categories = useMemo(() => {
    if (!isValidFramework(framework)) return [];
    return getCategories(framework);
  }, [framework]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    if (!isValidFramework(framework)) return {};
    return getCategoryCounts(framework);
  }, [framework]);

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
    (problem: FrontendDrillProblem) => {
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

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading training problems...</div>
      </div>
    );
  }

  // Not found state
  if (!isValidFramework(framework)) {
    return null;
  }

  const config = FRAMEWORK_CONFIG[framework];
  const totalCount = getProblemCount(framework);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href={`/frontend-drills/${framework}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group"
      >
        <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to {config.name}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-white">Frontend Training</h1>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color} border ${config.borderColor}`}
          >
            {totalCount} problems
          </span>
        </div>
        <p className="text-zinc-400">
          Select individual {config.name} problems to practice. Build muscle memory for{' '}
          {config.name} patterns.
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
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label
              htmlFor="training-search"
              className="text-xs text-zinc-500 font-medium block mb-1"
            >
              Search
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                id="training-search"
                type="text"
                placeholder="Search problems..."
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
              ...categories.map((c) => ({
                value: c,
                label: `${c} (${categoryCounts[c] || 0})`,
              })),
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

      {/* Desktop: Problem Table */}
      <div className="hidden sm:block bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
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
            className="w-40 flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
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
          <div className="p-12 text-center">
            <SearchIcon className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
            <h3 className="text-zinc-400 font-medium mb-1">No problems match your filters</h3>
            <p className="text-sm text-zinc-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto">
            {filteredProblems.map((problem) => (
              <ProblemRow
                key={problem.id}
                problem={problem}
                number={getProblemNumber(problem)}
                framework={framework}
                progress={progress[problem.id]}
                config={config}
              />
            ))}
          </div>
        )}

        {/* Table Footer */}
        <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700 text-sm text-zinc-500">
          Showing {filteredProblems.length} of {allProblems.length} problems
        </div>
      </div>

      {/* Mobile: Problem Cards */}
      <div className="sm:hidden">
        {filteredProblems.length === 0 ? (
          <div className="p-12 text-center">
            <SearchIcon className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
            <h3 className="text-zinc-400 font-medium mb-1">No problems match your filters</h3>
            <p className="text-sm text-zinc-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                number={getProblemNumber(problem)}
                framework={framework}
                progress={progress[problem.id]}
                config={config}
              />
            ))}
          </div>
        )}

        {/* Mobile footer */}
        <div className="mt-4 text-center text-sm text-zinc-500">
          Showing {filteredProblems.length} of {allProblems.length} problems
        </div>
      </div>
    </div>
  );
}
