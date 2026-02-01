'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FRAMEWORK_CONFIG,
  type FrameworkId,
  getUIPatterns,
  getUIPatternsByCategory,
  isValidFramework,
  UI_PATTERN_CATEGORIES,
  UI_PATTERN_DIFFICULTY_CONFIG,
  type UIPattern,
  type UIPatternCategory,
  type UIPatternDifficulty,
} from '@/lib/frontend-drills';

// Icon components
function FormIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>
  );
}

function InteractiveIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
      />
    </svg>
  );
}

function ChartIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  );
}

function CompassIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}

function CogIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PuzzleIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
      />
    </svg>
  );
}

function SearchIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

const CATEGORY_ICONS: Record<UIPatternCategory, React.ReactNode> = {
  'forms-input': <FormIcon />,
  interactive: <InteractiveIcon />,
  'data-display': <ChartIcon />,
  navigation: <CompassIcon />,
  advanced: <CogIcon />,
  'ui-components': <PuzzleIcon />,
};

function PatternCard({
  pattern,
  frameworkConfig,
}: {
  pattern: UIPattern;
  frameworkConfig: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}) {
  const diffConfig = UI_PATTERN_DIFFICULTY_CONFIG[pattern.difficulty];

  return (
    <Link
      href={`/frontend-drills/${pattern.framework}/ui-patterns/${pattern.id}`}
      className={`
        group relative w-full text-left p-4 rounded-xl border transition-all duration-300 block
        ${frameworkConfig.borderColor} bg-zinc-900/50
        hover:scale-[1.02] hover:shadow-lg ${frameworkConfig.hoverBg}
      `}
    >
      {/* Title */}
      <div className="flex items-start gap-3 mb-2">
        <h3 className="text-white font-medium group-hover:text-white/90 flex-1">{pattern.title}</h3>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-4 h-4 ${frameworkConfig.color} opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0`}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>

      {/* Difficulty badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${diffConfig.bgColor} ${diffConfig.color}`}
        >
          {diffConfig.name}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 line-clamp-2 mb-3">{pattern.description}</p>

      {/* Concepts */}
      <div className="flex flex-wrap gap-1">
        {pattern.concepts.slice(0, 4).map((concept, i) => (
          <span
            key={i}
            className={`text-xs px-2 py-0.5 rounded ${frameworkConfig.bgColor} ${frameworkConfig.color} opacity-70`}
          >
            {concept}
          </span>
        ))}
      </div>
    </Link>
  );
}

function CategorySection({
  category,
  patterns,
  frameworkConfig,
}: {
  category: UIPatternCategory;
  patterns: UIPattern[];
  frameworkConfig: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}) {
  const categoryConfig = UI_PATTERN_CATEGORIES[category];

  if (patterns.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-lg ${frameworkConfig.bgColor} flex items-center justify-center ${frameworkConfig.color}`}
        >
          {CATEGORY_ICONS[category]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            {categoryConfig.name}
            <span className="text-sm font-normal text-zinc-500">{patterns.length}</span>
          </h2>
          <p className="text-sm text-zinc-400">{categoryConfig.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} frameworkConfig={frameworkConfig} />
        ))}
      </div>
    </section>
  );
}

function StatsOverview({
  framework,
  frameworkConfig,
}: {
  framework: FrameworkId;
  frameworkConfig: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}) {
  const allPatterns = getUIPatterns(framework);
  const beginnerCount = allPatterns.filter((p) => p.difficulty === 'beginner').length;
  const intermediateCount = allPatterns.filter((p) => p.difficulty === 'intermediate').length;
  const advancedCount = allPatterns.filter((p) => p.difficulty === 'advanced').length;

  return (
    <div className={`rounded-2xl border ${frameworkConfig.borderColor} bg-zinc-900/30 p-6 mb-8`}>
      <h3 className="text-lg font-semibold text-white mb-4">Pattern Collection</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${frameworkConfig.color}`}>{allPatterns.length}</div>
          <div className="text-sm text-zinc-500">Total Patterns</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">{beginnerCount}</div>
          <div className="text-sm text-zinc-500">Beginner</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-400">{intermediateCount}</div>
          <div className="text-sm text-zinc-500">Intermediate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400">{advancedCount}</div>
          <div className="text-sm text-zinc-500">Advanced</div>
        </div>
      </div>
    </div>
  );
}

export default function UIPatterns() {
  const params = useParams();
  const router = useRouter();
  const framework = params.framework as string;
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<UIPatternCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<UIPatternDifficulty | 'all'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Track mount state for hydration safety
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
        if (searchQuery) setSearchQuery('');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  // Filter patterns based on search query and difficulty
  const filteredPatternsByCategory = useMemo(() => {
    if (!mounted || !isValidFramework(framework)) {
      return {} as Record<UIPatternCategory, UIPattern[]>;
    }

    const byCategory = getUIPatternsByCategory(framework);
    const result = {} as Record<UIPatternCategory, UIPattern[]>;

    for (const cat of Object.keys(byCategory) as UIPatternCategory[]) {
      let patterns = byCategory[cat];

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        patterns = patterns.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.concepts.some((c) => c.toLowerCase().includes(query)),
        );
      }

      if (difficultyFilter !== 'all') {
        patterns = patterns.filter((p) => p.difficulty === difficultyFilter);
      }

      result[cat] = patterns;
    }

    return result;
  }, [framework, searchQuery, difficultyFilter, mounted]);

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setDifficultyFilter('all');
    setSelectedCategory('all');
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading patterns...</div>
      </div>
    );
  }

  if (!isValidFramework(framework)) {
    router.push('/not-found');
    return null;
  }

  const config = FRAMEWORK_CONFIG[framework];
  const patternsByCategory = getUIPatternsByCategory(framework);
  const allPatterns = getUIPatterns(framework);
  const categories = Object.keys(patternsByCategory) as UIPatternCategory[];

  const totalFilteredCount = Object.values(filteredPatternsByCategory).reduce(
    (sum, ps) => sum + ps.length,
    0,
  );

  const hasActiveFilters = searchQuery.trim() !== '' || difficultyFilter !== 'all';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">UI Patterns</h1>
        <p className="text-xl text-zinc-400">
          Master common UI patterns and component implementations for {config.name}: forms,
          interactivity, data display, navigation, and advanced features.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview framework={framework} frameworkConfig={config} />

      {/* Search & Filters - Sticky */}
      <div className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-3 pb-4 border-b border-transparent">
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <div className="flex-1 relative group">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search patterns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/70 border border-zinc-800 rounded-xl pl-10 pr-20 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 focus:bg-zinc-900 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-zinc-500 hover:text-zinc-300 cursor-pointer text-lg leading-none"
                >
                  ×
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 bg-zinc-800/80 border border-zinc-700/50 rounded">
                  /
                </kbd>
              )}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-sm text-zinc-500 hover:text-white px-3 py-3 transition-colors whitespace-nowrap cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">Difficulty</span>
          <div className="flex gap-1">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => setDifficultyFilter(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  difficultyFilter === level
                    ? `${config.bgColor} ${config.color}`
                    : 'bg-zinc-800/50 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {level === 'all' ? 'All' : UI_PATTERN_DIFFICULTY_CONFIG[level].name}
              </button>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? `${config.bgColor} ${config.color}`
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            All ({totalFilteredCount})
          </button>
          {categories.map((category) => {
            const count = filteredPatternsByCategory[category].length;
            if (patternsByCategory[category].length === 0) return null;
            return (
              <button
                type="button"
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === category
                    ? `${config.bgColor} ${config.color}`
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {UI_PATTERN_CATEGORIES[category].name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer for sticky header */}
      <div className="h-4" />

      {/* Pattern Categories */}
      {totalFilteredCount === 0 ? (
        <div className="text-center py-16">
          <SearchIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-400 mb-2">No patterns found</h3>
          <p className="text-sm text-zinc-500 mb-4">Try adjusting your search or filters</p>
          <button
            type="button"
            onClick={clearAllFilters}
            className={`text-sm ${config.color} hover:underline cursor-pointer`}
          >
            Clear all filters
          </button>
        </div>
      ) : selectedCategory === 'all' ? (
        categories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            patterns={filteredPatternsByCategory[category]}
            frameworkConfig={config}
          />
        ))
      ) : (
        <CategorySection
          category={selectedCategory}
          patterns={filteredPatternsByCategory[selectedCategory]}
          frameworkConfig={config}
        />
      )}

      {/* Results summary when filtering */}
      {hasActiveFilters && totalFilteredCount > 0 && (
        <div className="text-center text-sm text-zinc-500 mt-4">
          Showing {totalFilteredCount} of {allPatterns.length} patterns
        </div>
      )}
    </div>
  );
}
