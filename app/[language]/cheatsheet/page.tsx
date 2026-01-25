'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  filterByCategory,
  filterByPriority,
  getCategoriesForCheatsheet,
  getCheatsheetForLanguage,
  searchCheatsheet,
  sortByPriority,
} from '@/lib/cheatsheets';
import type {
  CheatsheetCategory,
  CheatsheetEntry,
  CheatsheetPriority,
} from '@/lib/cheatsheets/types';
import type { LanguageId } from '@/lib/types';
import { isValidLanguage, LANGUAGE_CONFIG, type SupportedLanguage } from '../config';

// Category display names
const CATEGORY_LABELS: Record<CheatsheetCategory, string> = {
  arrays: 'Arrays',
  strings: 'Strings',
  objects: 'Objects',
  sets: 'Sets',
  maps: 'Maps',
  math: 'Math',
  sorting: 'Sorting',
  searching: 'Searching',
  iteration: 'Iteration',
  functional: 'Functional',
  'type-conversion': 'Type Conversion',
  'date-time': 'Date & Time',
  regex: 'Regex',
  io: 'I/O',
  collections: 'Collections',
  concurrency: 'Concurrency',
  memory: 'Memory',
  'error-handling': 'Error Handling',
};

// Priority badge colors
const PRIORITY_COLORS: Record<CheatsheetPriority, string> = {
  essential: 'bg-red-500/20 text-red-400 border-red-500/30',
  common: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  useful: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

// Category colors for visual distinction
const CATEGORY_COLORS: Record<string, string> = {
  arrays: 'border-l-blue-500',
  strings: 'border-l-green-500',
  objects: 'border-l-purple-500',
  sets: 'border-l-teal-500',
  maps: 'border-l-cyan-500',
  math: 'border-l-red-500',
  sorting: 'border-l-orange-500',
  searching: 'border-l-amber-500',
  iteration: 'border-l-indigo-500',
  functional: 'border-l-pink-500',
  'type-conversion': 'border-l-lime-500',
  'date-time': 'border-l-sky-500',
  regex: 'border-l-violet-500',
  io: 'border-l-emerald-500',
  collections: 'border-l-rose-500',
  concurrency: 'border-l-fuchsia-500',
  memory: 'border-l-slate-500',
  'error-handling': 'border-l-zinc-500',
};

// Icons
function SearchIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function PrintIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
      />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// Cheatsheet Entry Card (Mobile)
function EntryCard({
  entry,
  config,
}: {
  entry: CheatsheetEntry;
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden border-l-4 ${
        CATEGORY_COLORS[entry.category] || 'border-l-zinc-500'
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <code className={`font-mono font-semibold ${config.color}`}>{entry.name}</code>
            <span
              className={`text-xs px-1.5 py-0.5 rounded border ${PRIORITY_COLORS[entry.priority]}`}
            >
              {entry.priority}
            </span>
          </div>
          <p className="text-sm text-zinc-400 line-clamp-1">{entry.description}</p>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-zinc-500 transition-transform flex-shrink-0 mt-1 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-zinc-800">
          {/* Syntax */}
          <div className="mt-3">
            <span className="text-xs font-medium text-zinc-500 uppercase">Syntax</span>
            <pre className="mt-1 bg-zinc-950 rounded p-2 overflow-x-auto">
              <code className="text-sm font-mono text-emerald-400">{entry.syntax}</code>
            </pre>
          </div>

          {/* Example */}
          <div>
            <span className="text-xs font-medium text-zinc-500 uppercase">Example</span>
            <pre className="mt-1 bg-zinc-950 rounded p-2 overflow-x-auto">
              <code className="text-sm font-mono text-zinc-300">{entry.example.code}</code>
            </pre>
            <div className="mt-1 text-sm font-mono text-green-400">→ {entry.example.output}</div>
          </div>

          {/* Complexity */}
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-zinc-500">Time:</span>{' '}
              <span className="text-cyan-400 font-mono">{entry.timeComplexity}</span>
            </div>
            <div>
              <span className="text-zinc-500">Space:</span>{' '}
              <span className="text-purple-400 font-mono">{entry.spaceComplexity}</span>
            </div>
          </div>

          {/* Gotchas */}
          {entry.gotchas && entry.gotchas.length > 0 && (
            <div>
              <span className="text-xs font-medium text-zinc-500 uppercase">Gotchas</span>
              <ul className="mt-1 space-y-1">
                {entry.gotchas.map((gotcha, i) => (
                  <li key={i} className="text-sm text-amber-400 flex items-start gap-2">
                    <span className="text-amber-500">⚠</span>
                    {gotcha}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interview Tip */}
          {entry.interviewTip && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
              <span className="text-xs font-medium text-blue-400 uppercase">Interview Tip</span>
              <p className="mt-1 text-sm text-blue-300">{entry.interviewTip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Table Row (Desktop)
function EntryRow({
  entry,
  config,
}: {
  entry: CheatsheetEntry;
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <tr
        className="border-b border-zinc-800 hover:bg-zinc-800/30 cursor-pointer transition-colors"
        onClick={() => setShowDetails(!showDetails)}
      >
        <td className="py-3 px-4">
          <code className={`font-mono font-semibold ${config.color}`}>{entry.name}</code>
        </td>
        <td className="py-3 px-4">
          <code className="text-sm font-mono text-zinc-400">{entry.syntax}</code>
        </td>
        <td className="py-3 px-4 text-sm text-zinc-300 max-w-xs truncate">{entry.description}</td>
        <td className="py-3 px-4 text-center">
          <span className="text-sm font-mono text-cyan-400">{entry.timeComplexity}</span>
        </td>
        <td className="py-3 px-4 text-center">
          <span className={`text-xs px-2 py-0.5 rounded border ${PRIORITY_COLORS[entry.priority]}`}>
            {entry.priority}
          </span>
        </td>
      </tr>
      {showDetails && (
        <tr className="bg-zinc-900/50">
          <td colSpan={5} className="px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Example */}
              <div>
                <span className="text-xs font-medium text-zinc-500 uppercase">Example</span>
                <pre className="mt-1 bg-zinc-950 rounded p-3 overflow-x-auto">
                  <code className="text-sm font-mono text-zinc-300">{entry.example.code}</code>
                </pre>
                <div className="mt-1 text-sm font-mono text-green-400">
                  → {entry.example.output}
                </div>
              </div>

              {/* Tips & Gotchas */}
              <div className="space-y-3">
                {entry.gotchas && entry.gotchas.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-zinc-500 uppercase">Gotchas</span>
                    <ul className="mt-1 space-y-1">
                      {entry.gotchas.map((gotcha, i) => (
                        <li key={i} className="text-sm text-amber-400 flex items-start gap-2">
                          <span>⚠</span>
                          {gotcha}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {entry.interviewTip && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                    <span className="text-xs font-medium text-blue-400 uppercase">
                      Interview Tip
                    </span>
                    <p className="mt-1 text-sm text-blue-300">{entry.interviewTip}</p>
                  </div>
                )}
                <div className="text-sm">
                  <span className="text-zinc-500">Space Complexity:</span>{' '}
                  <span className="text-purple-400 font-mono">{entry.spaceComplexity}</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// Quick Navigation Sidebar
function QuickNav({
  categories,
  activeCategory,
  onCategoryClick,
}: {
  categories: CheatsheetCategory[];
  activeCategory: CheatsheetCategory | 'all';
  onCategoryClick: (category: CheatsheetCategory) => void;
}) {
  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 bg-zinc-900 rounded-lg border border-zinc-800 p-3 max-h-[60vh] overflow-y-auto">
      <span className="text-xs font-medium text-zinc-500 uppercase mb-2 block">Quick Nav</span>
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => onCategoryClick(category)}
              className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                activeCategory === category
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {CATEGORY_LABELS[category] || category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function CheatsheetPage() {
  const params = useParams();
  const language = params.language as string;
  const isValid = isValidLanguage(language);

  // All hooks must be called before any conditional returns
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CheatsheetCategory | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<CheatsheetPriority | 'all'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Get data (will be empty arrays for invalid languages)
  const config = isValid ? LANGUAGE_CONFIG[language] : LANGUAGE_CONFIG.javascript;
  const allEntries = useMemo(
    () => (isValid ? getCheatsheetForLanguage(language as LanguageId) : []),
    [isValid, language],
  );
  const categories = useMemo(
    () => (isValid ? getCategoriesForCheatsheet(language as LanguageId) : []),
    [isValid, language],
  );

  // Filtered and sorted entries
  const filteredEntries = useMemo(() => {
    let entries = allEntries;

    // Apply search
    if (searchQuery.trim()) {
      entries = searchCheatsheet(entries, searchQuery);
    }

    // Apply category filter
    entries = filterByCategory(entries, categoryFilter);

    // Apply priority filter
    entries = filterByPriority(entries, priorityFilter);

    // Sort by priority
    entries = sortByPriority(entries);

    return entries;
  }, [allEntries, searchQuery, categoryFilter, priorityFilter]);

  // Now we can have conditional returns after all hooks
  if (!isValid) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Language Not Found</h1>
          <Link href="/" className="text-blue-400 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle category quick nav
  const handleCategoryClick = (category: CheatsheetCategory) => {
    setCategoryFilter(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          table { font-size: 10px; }
          pre { white-space: pre-wrap; word-wrap: break-word; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-100">
                {config.name} <span className={config.color}>Cheatsheet</span>
              </h1>
              <p className="text-zinc-400 mt-1">
                {allEntries.length} essential methods for coding interviews
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="no-print flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors cursor-pointer"
            >
              <PrintIcon className="w-4 h-4" />
              Print
            </button>
          </div>

          {/* Filters */}
          <div className="no-print flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search methods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CheatsheetCategory | 'all')}
              className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat] || cat}
                </option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as CheatsheetPriority | 'all')}
              className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="essential">Essential</option>
              <option value="common">Common</option>
              <option value="useful">Useful</option>
            </select>

            {/* View Mode Toggle (mobile) */}
            <div className="lg:hidden flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-700">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded text-sm cursor-pointer ${
                  viewMode === 'cards' ? 'bg-zinc-700 text-white' : 'text-zinc-400'
                }`}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded text-sm cursor-pointer ${
                  viewMode === 'table' ? 'bg-zinc-700 text-white' : 'text-zinc-400'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-zinc-500">
          Showing {filteredEntries.length} of {allEntries.length} methods
        </div>

        {/* Empty state */}
        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">No methods found matching your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setPriorityFilter('all');
              }}
              className="mt-4 text-blue-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Table View (Desktop) */}
        {filteredEntries.length > 0 && (viewMode === 'table' || window.innerWidth >= 1024) && (
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700 text-left">
                  <th className="py-3 px-4 text-sm font-medium text-zinc-400">Method</th>
                  <th className="py-3 px-4 text-sm font-medium text-zinc-400">Syntax</th>
                  <th className="py-3 px-4 text-sm font-medium text-zinc-400">Description</th>
                  <th className="py-3 px-4 text-sm font-medium text-zinc-400 text-center">Time</th>
                  <th className="py-3 px-4 text-sm font-medium text-zinc-400 text-center">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, index) => (
                  <EntryRow key={`${entry.name}-${index}`} entry={entry} config={config} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Card View (Mobile / Optional) */}
        {filteredEntries.length > 0 && (
          <div className={`lg:hidden space-y-3 ${viewMode === 'table' ? 'hidden' : ''}`}>
            {filteredEntries.map((entry, index) => (
              <EntryCard key={`${entry.name}-${index}`} entry={entry} config={config} />
            ))}
          </div>
        )}

        {/* Mobile card view fallback */}
        <div className="lg:hidden space-y-3">
          {filteredEntries.map((entry, index) => (
            <EntryCard key={`${entry.name}-mobile-${index}`} entry={entry} config={config} />
          ))}
        </div>

        {/* Quick Navigation */}
        {categories.length > 0 && (
          <QuickNav
            categories={categories}
            activeCategory={categoryFilter}
            onCategoryClick={handleCategoryClick}
          />
        )}
      </div>
    </div>
  );
}
