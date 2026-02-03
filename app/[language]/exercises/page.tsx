'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DIFFICULTY_CONFIG,
  EXERCISE_CATEGORIES,
  type Exercise,
  type ExerciseCategory,
  type ExerciseDifficulty,
  getExerciseStats,
  getExercisesByCategory,
  getExercisesForLanguage,
  isInterviewRecommended,
} from '@/lib/exercises';
import { isValidLanguage, LANGUAGE_CONFIG, type SupportedLanguage } from '../config';

// Icon components
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

function TreeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6-6l6-6 6 6" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="6" cy="15" r="2" />
      <circle cx="18" cy="15" r="2" />
    </svg>
  );
}

function LoopIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function RecursionIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
        d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
      />
    </svg>
  );
}

function GenerateIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
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

function StructureIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    </svg>
  );
}

function CacheIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
        d="M3 8l4-4m0 0l4 4M7 4v12m14-4l-4 4m0 0l-4-4m4 4V8M11 12h2"
      />
    </svg>
  );
}

function UtilityIcon({ className = 'w-6 h-6' }: { className?: string }) {
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
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437"
      />
    </svg>
  );
}

function FilterIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>
  );
}

function PlayIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<ExerciseCategory, React.ReactNode> = {
  combinatorics: <GenerateIcon />,
  memoization: <CacheIcon />,
  utilities: <UtilityIcon />,
  traversal: <TreeIcon />,
  'iteration-patterns': <LoopIcon />,
  recursion: <RecursionIcon />,
  searching: <SearchIcon />,
  'data-structures': <StructureIcon />,
};

interface ExerciseProgress {
  completed: boolean;
  attempts: number;
  bestTime?: number;
}

function ExerciseCard({
  exercise,
  languageConfig,
  progress,
  onClick,
}: {
  exercise: Exercise;
  languageConfig: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  progress?: ExerciseProgress;
  onClick: () => void;
}) {
  const diffConfig = DIFFICULTY_CONFIG[exercise.difficulty];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer
        ${languageConfig.borderColor} bg-zinc-900/50
        hover:scale-[1.02] hover:shadow-lg ${languageConfig.hoverBg}
      `}
    >
      {/* Completed indicator */}
      {progress?.completed && (
        <div className="absolute top-3 right-3">
          <div
            className={`w-6 h-6 rounded-full ${languageConfig.bgColor} flex items-center justify-center`}
          >
            <CheckIcon className={`w-4 h-4 ${languageConfig.color}`} />
          </div>
        </div>
      )}

      {/* Title and difficulty */}
      <div className="flex items-start gap-3 mb-2">
        <h3 className="text-white font-medium group-hover:text-white/90 flex-1 pr-8">
          {exercise.title}
        </h3>
      </div>

      {/* Difficulty badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${diffConfig.bgColor} ${diffConfig.color}`}
        >
          {diffConfig.name}
        </span>
        {isInterviewRecommended(exercise.id) && (
          <span
            className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400"
            title="Recommended for coding interviews"
          >
            ★ Interview
          </span>
        )}
        {exercise.timeLimit && (
          <span className="text-xs text-zinc-500">
            {Math.floor(exercise.timeLimit / 60)}:{String(exercise.timeLimit % 60).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 line-clamp-2 mb-3">{exercise.description}</p>

      {/* Concepts */}
      <div className="flex flex-wrap gap-1">
        {exercise.concepts.slice(0, 3).map((concept, i) => (
          <span
            key={i}
            className={`text-xs px-2 py-0.5 rounded ${languageConfig.bgColor} ${languageConfig.color} opacity-70`}
          >
            {concept}
          </span>
        ))}
      </div>

      {/* Attempts info */}
      {progress && progress.attempts > 0 && (
        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>
            {progress.attempts} attempt{progress.attempts !== 1 ? 's' : ''}
          </span>
          {progress.bestTime && (
            <span>
              Best: {Math.floor(progress.bestTime / 60)}:
              {String(progress.bestTime % 60).padStart(2, '0')}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

function CategorySection({
  category,
  exercises,
  languageConfig,
  progress,
  onExerciseClick,
}: {
  category: ExerciseCategory;
  exercises: Exercise[];
  languageConfig: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  progress: Record<string, ExerciseProgress>;
  onExerciseClick: (exercise: Exercise) => void;
}) {
  const categoryConfig = EXERCISE_CATEGORIES[category];
  const completedCount = exercises.filter((ex) => progress[ex.id]?.completed).length;

  if (exercises.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-lg ${languageConfig.bgColor} flex items-center justify-center ${languageConfig.color}`}
        >
          {CATEGORY_ICONS[category]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            {categoryConfig.name}
            <span className="text-sm font-normal text-zinc-500">
              {completedCount}/{exercises.length}
            </span>
          </h2>
          <p className="text-sm text-zinc-400">{categoryConfig.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            languageConfig={languageConfig}
            progress={progress[exercise.id]}
            onClick={() => onExerciseClick(exercise)}
          />
        ))}
      </div>
    </section>
  );
}

function StatsOverview({
  language,
  languageConfig,
  progress,
}: {
  language: string;
  languageConfig: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  progress: Record<string, ExerciseProgress>;
}) {
  const stats = getExerciseStats(language);
  const completedCount = Object.values(progress).filter((p) => p.completed).length;
  const totalAttempts = Object.values(progress).reduce((sum, p) => sum + (p.attempts || 0), 0);

  return (
    <div className={`rounded-2xl border ${languageConfig.borderColor} bg-zinc-900/30 p-6 mb-8`}>
      <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        <div className="text-center">
          <div className={`text-2xl sm:text-3xl font-bold ${languageConfig.color}`}>
            {completedCount}
          </div>
          <div className="text-sm text-zinc-500">Completed</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl sm:text-3xl font-bold ${languageConfig.color}`}>
            {stats.total}
          </div>
          <div className="text-sm text-zinc-500">Total Exercises</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl sm:text-3xl font-bold ${languageConfig.color}`}>
            {totalAttempts}
          </div>
          <div className="text-sm text-zinc-500">Total Attempts</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl sm:text-3xl font-bold ${languageConfig.color}`}>
            {stats.total > 0 ? Math.round((completedCount / stats.total) * 100) : 0}%
          </div>
          <div className="text-sm text-zinc-500">Completion</div>
        </div>
      </div>
    </div>
  );
}

export default function ExercisesPage() {
  const params = useParams();
  const router = useRouter();
  const language = params.language as string;
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<Record<string, ExerciseProgress>>({});
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<ExerciseDifficulty | 'all'>('all');
  const [completionFilter, setCompletionFilter] = useState<'all' | 'completed' | 'incomplete'>(
    'all',
  );
  const [showFilters, setShowFilters] = useState(false);
  const [recommendedOnly, setRecommendedOnly] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Track mount state for hydration safety
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  // Load progress from localStorage
  useEffect(() => {
    if (!mounted) return;
    const storageKey = `coding-drills-exercises-${language}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage
        setProgress(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [language, mounted]);

  // Keyboard shortcut: / or Cmd+K to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
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

  // Collect all unique concepts for quick-filter tags
  const popularConcepts = useMemo(() => {
    const allExs = getExercisesForLanguage(language);
    const conceptCount: Record<string, number> = {};
    for (const ex of allExs) {
      for (const c of ex.concepts) {
        conceptCount[c] = (conceptCount[c] || 0) + 1;
      }
    }
    return Object.entries(conceptCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name]) => name);
  }, [language]);

  // Filter exercises based on search query, difficulty, and completion
  // Must be called before early returns to satisfy React hooks rules
  const filteredExercisesByCategory = useMemo(() => {
    const byCategory = getExercisesByCategory(language);
    const result = {} as Record<ExerciseCategory, Exercise[]>;

    for (const cat of Object.keys(byCategory) as ExerciseCategory[]) {
      let exercises = byCategory[cat];

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        exercises = exercises.filter(
          (ex) =>
            ex.title.toLowerCase().includes(query) ||
            ex.description.toLowerCase().includes(query) ||
            ex.concepts.some((c) => c.toLowerCase().includes(query)),
        );
      }

      if (difficultyFilter !== 'all') {
        exercises = exercises.filter((ex) => ex.difficulty === difficultyFilter);
      }

      if (completionFilter !== 'all') {
        exercises = exercises.filter((ex) => {
          const isCompleted = progress[ex.id]?.completed === true;
          return completionFilter === 'completed' ? isCompleted : !isCompleted;
        });
      }

      if (recommendedOnly) {
        exercises = exercises.filter((ex) => isInterviewRecommended(ex.id));
      }

      result[cat] = exercises;
    }

    return result;
  }, [language, searchQuery, difficultyFilter, completionFilter, recommendedOnly, progress]);

  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setDifficultyFilter('all');
    setCompletionFilter('all');
    setSelectedCategory('all');
    setRecommendedOnly(false);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading exercises...</div>
      </div>
    );
  }

  if (!isValidLanguage(language)) {
    return null;
  }

  const config = LANGUAGE_CONFIG[language];
  const exercisesByCategory = getExercisesByCategory(language);
  const allExercises = getExercisesForLanguage(language);
  const categories = Object.keys(exercisesByCategory) as ExerciseCategory[];

  const totalFilteredCount = Object.values(filteredExercisesByCategory).reduce(
    (sum, exs) => sum + exs.length,
    0,
  );

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    difficultyFilter !== 'all' ||
    completionFilter !== 'all' ||
    recommendedOnly;

  const handleExerciseClick = (exercise: Exercise) => {
    router.push(`/${language}/exercises/${exercise.id}`);
  };

  // Check if this language has exercises
  if (allExercises.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Link
          href={`/${language}`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to {config.name}
        </Link>

        <div className="text-center py-20">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${config.bgColor} ${config.color} mb-6`}
          >
            <LoopIcon className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Coming Soon</h1>
          <p className="text-xl text-zinc-400 max-w-md mx-auto mb-8">
            Building block exercises for {config.name} are currently being developed.
          </p>
          <Link
            href={`/${language}/drill`}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${config.bgColor} ${config.color} font-medium transition-all hover:opacity-80`}
          >
            <PlayIcon className="w-5 h-5" />
            Try Drill Mode Instead
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Back link */}
      <Link
        href={`/${language}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to {config.name}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Building Blocks</h1>
        <p className="text-xl text-zinc-400">
          Master the reusable sub-patterns behind every coding problem: sliding windows, two
          pointers, binary search variants, dynamic programming, backtracking, and more in{' '}
          {config.name}.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview language={language} languageConfig={config} progress={progress} />

      {/* Search & Filters - Sticky */}
      <div className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-3 pb-4 border-b border-transparent [&.is-stuck]:border-zinc-800/50">
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <div className="flex-1 relative group">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search exercises..."
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

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
              showFilters || difficultyFilter !== 'all' || completionFilter !== 'all'
                ? `${config.bgColor} ${config.color} border-transparent`
                : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <FilterIcon className="w-4 h-4" />
            Filters
            {(difficultyFilter !== 'all' || completionFilter !== 'all') && (
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            )}
          </button>

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

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 mb-3 pb-3 border-b border-zinc-800/50">
            <div className="flex items-center gap-2">
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
                    {level === 'all' ? 'All' : DIFFICULTY_CONFIG[level].name}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-px h-6 bg-zinc-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Status</span>
              <div className="flex gap-1">
                {(['all', 'incomplete', 'completed'] as const).map((status) => (
                  <button
                    type="button"
                    key={status}
                    onClick={() => setCompletionFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      completionFilter === status
                        ? `${config.bgColor} ${config.color}`
                        : 'bg-zinc-800/50 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {status === 'all' ? 'All' : status === 'completed' ? 'Done' : 'To Do'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recommended + Quick concept tags */}
        <div className="flex flex-wrap gap-1.5 mb-3 items-center">
          <button
            type="button"
            onClick={() => setRecommendedOnly(!recommendedOnly)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              recommendedOnly
                ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <span>★</span>
            Interview Prep
          </button>
          {!searchQuery &&
            popularConcepts.map((concept) => (
              <button
                type="button"
                key={concept}
                onClick={() => setSearchQuery(concept)}
                className="px-2.5 py-1 rounded-full text-xs bg-zinc-800/60 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700/60 transition-all cursor-pointer"
              >
                {concept}
              </button>
            ))}
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
            const count = filteredExercisesByCategory[category].length;
            if (exercisesByCategory[category].length === 0) return null;
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
                {EXERCISE_CATEGORIES[category].name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer for sticky header */}
      <div className="h-4" />

      {/* Exercise Categories */}
      {totalFilteredCount === 0 ? (
        <div className="text-center py-16">
          <SearchIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-400 mb-2">No exercises found</h3>
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
            exercises={filteredExercisesByCategory[category]}
            languageConfig={config}
            progress={progress}
            onExerciseClick={handleExerciseClick}
          />
        ))
      ) : (
        <CategorySection
          category={selectedCategory}
          exercises={filteredExercisesByCategory[selectedCategory]}
          languageConfig={config}
          progress={progress}
          onExerciseClick={handleExerciseClick}
        />
      )}

      {/* Results summary when filtering */}
      {hasActiveFilters && totalFilteredCount > 0 && (
        <div className="text-center text-sm text-zinc-500 mt-4">
          Showing {totalFilteredCount} of {allExercises.length} exercises
        </div>
      )}
    </div>
  );
}
