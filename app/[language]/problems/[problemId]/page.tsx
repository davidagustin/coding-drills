'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import { formatOutput, validateProblemAnswer } from '@/lib/codeValidator';
import { problemsByLanguage } from '@/lib/problems/index';
import type { Difficulty, LanguageId } from '@/lib/types';
import { isValidLanguage, LANGUAGE_CONFIG, type SupportedLanguage } from '../../config';

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

// ============================================================================
// Icon Components
// ============================================================================

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

function ChevronLeftIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRightIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

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

function XCircleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LightbulbIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>
  );
}

function CodeBracketIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
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

function saveProgress(language: string, progress: ProblemProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(language), JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}

// ============================================================================
// Components
// ============================================================================

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string;
}

function CollapsibleSection({
  title,
  icon,
  defaultOpen = false,
  children,
  badge,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-zinc-300">{title}</span>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400">
              {badge}
            </span>
          )}
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="p-4 bg-zinc-900/50">{children}</div>}
    </div>
  );
}

interface FeedbackBannerProps {
  success: boolean;
  error?: string;
  onDismiss: () => void;
}

function FeedbackBanner({ success, error, onDismiss }: FeedbackBannerProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border ${
        success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
      }`}
    >
      <div className="flex items-center gap-3">
        {success ? (
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
        ) : (
          <XCircleIcon className="w-6 h-6 text-red-500" />
        )}
        <div>
          <p className={`font-medium ${success ? 'text-green-400' : 'text-red-400'}`}>
            {success ? 'Correct!' : 'Incorrect'}
          </p>
          {error && <p className="text-sm text-red-400/80 mt-0.5">{error}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
      >
        ×
      </button>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function ProblemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const language = params.language as string;
  const problemId = params.problemId as string;

  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<ProblemProgress>({});
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; error?: string } | null>(null);
  const [userOutput, setUserOutput] = useState<unknown>(undefined);
  const [showSolution, setShowSolution] = useState(false);

  // Track mount state for hydration safety
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  // Load progress and validate
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

  // Find current problem and navigation info
  const { problem, currentIndex, prevProblem, nextProblem } = useMemo(() => {
    const idx = allProblems.findIndex((p) => p.id === problemId);
    return {
      problem: idx >= 0 ? allProblems[idx] : null,
      currentIndex: idx,
      prevProblem: idx > 0 ? allProblems[idx - 1] : null,
      nextProblem: idx < allProblems.length - 1 ? allProblems[idx + 1] : null,
    };
  }, [allProblems, problemId]);

  // Reset state when problem changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: problemId is the correct dependency to reset state on route change
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- Reset form state on route change */
    setUserCode('');
    setFeedback(null);
    setUserOutput(undefined);
    setShowSolution(false);
  }, [problemId]);

  const handleSubmit = useCallback(() => {
    if (!problem || !userCode.trim()) return;

    const result = validateProblemAnswer(problem, userCode.trim(), language as LanguageId);

    setFeedback({
      success: result.success,
      error: result.success ? undefined : result.error,
    });

    if ('output' in result) {
      setUserOutput(result.output);
    }

    // Update progress
    const newProgress = { ...progress };
    const existing = newProgress[problem.id] || { solved: false, attempts: 0 };

    newProgress[problem.id] = {
      solved: existing.solved || result.success,
      attempts: existing.attempts + 1,
      lastAttempt: new Date().toISOString(),
    };

    setProgress(newProgress);
    saveProgress(language, newProgress);

    // Show solution if incorrect
    if (!result.success) {
      setShowSolution(true);
    }
  }, [problem, userCode, language, progress]);

  const handleReset = useCallback(() => {
    setUserCode('');
    setFeedback(null);
    setUserOutput(undefined);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!isValidLanguage(language)) {
    return null;
  }

  if (!problem) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-white mb-4">Problem Not Found</h1>
          <p className="text-zinc-400 mb-6">
            The problem you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href={`/${language}/problems`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  const config = LANGUAGE_CONFIG[language as SupportedLanguage];
  const problemNumber = currentIndex + 1;
  const totalProblems = allProblems.length;
  const isSolved = progress[problem.id]?.solved;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Back link */}
            <Link
              href={`/${language}/problems`}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm">Problems</span>
            </Link>

            {/* Problem counter */}
            <div className="flex items-center gap-2">
              {isSolved && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
              <span className="text-sm text-zinc-400">
                Problem <span className="text-white font-medium">#{problemNumber}</span> of{' '}
                {totalProblems}
              </span>
            </div>

            {/* Prev/Next navigation */}
            <div className="flex items-center gap-2">
              {prevProblem ? (
                <Link
                  href={`/${language}/problems/${prevProblem.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  Prev
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-600 cursor-not-allowed">
                  <ChevronLeftIcon className="w-4 h-4" />
                  Prev
                </span>
              )}
              {nextProblem ? (
                <Link
                  href={`/${language}/problems/${nextProblem.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  Next
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-600 cursor-not-allowed">
                  Next
                  <ChevronRightIcon className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Problem Description */}
          <div className="space-y-4">
            {/* Problem Header */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-xl font-bold text-white">{problem.title}</h1>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${config.bgColor} ${config.color} ${config.borderColor}`}
                  >
                    {problem.category}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${DIFFICULTY_BG_COLORS[problem.difficulty]} ${DIFFICULTY_COLORS[problem.difficulty]}`}
                  >
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </span>
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed">{problem.text}</p>
            </div>

            {/* Setup Code */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-800/50">
                <span className="text-sm font-medium text-zinc-300">Setup Code</span>
              </div>
              <div className="p-4">
                <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed border border-zinc-800">
                  <code>{problem.setupCode}</code>
                </pre>
              </div>
            </div>

            {/* Expected Output */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-800/50">
                <span className="text-sm font-medium text-zinc-300">Expected Output</span>
              </div>
              <div className="p-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg font-mono text-sm text-green-400">
                  {formatOutput(problem.expected)}
                </div>
              </div>
            </div>

            {/* Hints Section */}
            {problem.hints && problem.hints.length > 0 && (
              <CollapsibleSection
                title="Hints"
                icon={<LightbulbIcon className="w-4 h-4 text-yellow-500" />}
                badge={`${problem.hints.length} available`}
              >
                <ul className="space-y-2">
                  {problem.hints.map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="text-yellow-500 font-medium">{idx + 1}.</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {/* Sample Solution */}
            <CollapsibleSection
              title="Sample Solution"
              icon={<CodeBracketIcon className="w-4 h-4 text-blue-500" />}
              defaultOpen={showSolution}
            >
              <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed border border-zinc-800">
                <code>{problem.sample}</code>
              </pre>
            </CollapsibleSection>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="space-y-4">
            {/* Feedback Banner */}
            {feedback && (
              <FeedbackBanner
                success={feedback.success}
                error={feedback.error}
                onDismiss={() => setFeedback(null)}
              />
            )}

            {/* Code Editor */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-800/50 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">Your Solution</span>
                <span className="text-xs text-zinc-500">Cmd/Ctrl + Enter to submit</span>
              </div>
              <div className="p-4">
                <CodeEditor
                  code={userCode}
                  onChange={setUserCode}
                  language={language as LanguageId}
                  height={300}
                  minHeight={200}
                  lineNumbers={true}
                  autoFocus
                  onSubmitShortcut={handleSubmit}
                  className="border-zinc-700"
                />
              </div>
            </div>

            {/* Your Output (when submitted) */}
            {userOutput !== undefined && (
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-800/50">
                  <span className="text-sm font-medium text-zinc-300">Your Output</span>
                </div>
                <div className="p-4">
                  <div
                    className={`p-4 rounded-lg font-mono text-sm border ${
                      feedback?.success
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    {formatOutput(userOutput)}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!userCode.trim()}
                className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors cursor-pointer"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors border border-zinc-700 cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Navigation shortcuts */}
            {feedback?.success && nextProblem && (
              <Link
                href={`/${language}/problems/${nextProblem.id}`}
                className="block w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-center"
              >
                Next Problem →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
