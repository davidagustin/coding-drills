'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatOutput } from '@/lib/codeValidator';
import type { FrameworkId, FrontendDrillProblem } from '@/lib/frontend-drills';
import {
  FRAMEWORK_CONFIG,
  getProblems,
  isValidFramework,
  validateFrontendDrillAnswer,
} from '@/lib/frontend-drills';
import type { LanguageId } from '@/lib/types';

const CodeEditor = dynamic(
  () => import('@/components/CodeEditor').then((mod) => mod.default || mod),
  { ssr: false },
);

// ============================================================================
// Types
// ============================================================================

interface ProgressEntry {
  attempts: number;
  solved: boolean;
}

type ProgressMap = Record<string, ProgressEntry>;

// ============================================================================
// Helpers
// ============================================================================

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: 'text-green-400 bg-green-500/20',
  medium: 'text-yellow-400 bg-yellow-500/20',
  hard: 'text-red-400 bg-red-500/20',
};

function getEditorLanguage(framework: FrameworkId, problem: FrontendDrillProblem): LanguageId {
  if (problem.editorLanguage === 'html') return 'javascript'; // CodeEditor maps via monacoLanguageOverride
  if (problem.editorLanguage === 'typescript') return 'typescript';
  if (problem.editorLanguage === 'javascript') return 'javascript';
  if (problem.editorLanguage) return 'javascript'; // fallback for unknown editor languages

  switch (framework) {
    case 'angular':
      return 'typescript';
    default:
      return 'javascript';
  }
}

function storageKey(framework: string): string {
  return `coding-drills-frontend-training-${framework}`;
}

function loadProgress(framework: string): ProgressMap {
  try {
    const raw = localStorage.getItem(storageKey(framework));
    if (raw) return JSON.parse(raw) as ProgressMap;
  } catch {
    // ignore
  }
  return {};
}

function saveProgress(framework: string, map: ProgressMap): void {
  try {
    localStorage.setItem(storageKey(framework), JSON.stringify(map));
  } catch {
    // ignore
  }
}

/**
 * Generate starter/scaffold code from a problem's sample solution and hints.
 * Parses the sample to detect structural patterns and produces a skeleton
 * that gives students a head-start without revealing the answer.
 */
function generateTrainingStarter(problem: FrontendDrillProblem): string {
  const lines: string[] = [];

  // 1. Add hints as numbered comments
  if (problem.hints && problem.hints.length > 0) {
    for (let i = 0; i < problem.hints.length; i++) {
      lines.push(`// ${i + 1}. ${problem.hints[i]}`);
    }
    lines.push('');
  }

  // 2. Parse sample to detect pattern
  const sampleLines = problem.sample.split('\n');
  const firstLine = sampleLines[0];

  // Pattern: arrow function declaration  — const name = (params) => { ... }
  const arrowMatch = firstLine.match(/^(const|let)\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*\{?\s*$/);
  // Pattern: arrow function single-line  — const name = (params) => expr  (no brace, body on same line)
  const arrowInlineMatch = !arrowMatch
    ? firstLine.match(/^(const|let)\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>/)
    : null;
  // Pattern: traditional function        — function name(params) {
  const funcMatch = firstLine.match(/^function\s+(\w+)\s*\(([^)]*)\)/);

  if (arrowMatch) {
    // Multi-line arrow function with body block
    const [, keyword, name, params] = arrowMatch;
    lines.push(`${keyword} ${name} = (${params}) => {`);
    lines.push('  // Your code here');
    lines.push('};');
  } else if (arrowInlineMatch) {
    // Single-line arrow function — expanded to block form
    const [, keyword, name, params] = arrowInlineMatch;
    lines.push(`${keyword} ${name} = (${params}) => {`);
    lines.push('  // Your code here');
    lines.push('};');
  } else if (funcMatch) {
    // Traditional function declaration
    const [, name, params] = funcMatch;
    lines.push(`function ${name}(${params}) {`);
    lines.push('  // Your code here');
    lines.push('}');
  } else {
    // Expression, decorator, HTML template, object literal, or other — hints are sufficient
  }

  return lines.join('\n');
}

// ============================================================================
// Main Component
// ============================================================================

export default function TrainingProblemDetailPage() {
  const params = useParams();
  const framework = params.framework as string;
  const problemId = params.problemId as string;

  const [mounted, setMounted] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState<{
    success: boolean;
    error?: string;
    output?: unknown;
  } | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [progress, setProgress] = useState<ProgressMap>({});

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load progress from localStorage after mount
  useEffect(() => {
    if (mounted && isValidFramework(framework)) {
      setProgress(loadProgress(framework));
    }
  }, [mounted, framework]);

  // Resolve problems and current problem
  const problems = useMemo(() => {
    if (!isValidFramework(framework)) return [];
    return getProblems(framework as FrameworkId);
  }, [framework]);

  const problemIndex = useMemo(
    () => problems.findIndex((p) => p.id === problemId),
    [problems, problemId],
  );

  const problem = problemIndex >= 0 ? problems[problemIndex] : null;

  const prevProblem = problemIndex > 0 ? problems[problemIndex - 1] : null;
  const nextProblem = problemIndex < problems.length - 1 ? problems[problemIndex + 1] : null;

  // Reset state when problem changes & pre-populate with starter code
  // biome-ignore lint/correctness/useExhaustiveDependencies: problemId needed to reset state on navigation
  useEffect(() => {
    setUserCode(problem ? generateTrainingStarter(problem) : '');
    setFeedback(null);
    setShowHints(false);
    setShowSolution(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- problem is derived from problemId; including it would fire on every render
  }, [problemId]);

  // Submit handler
  const handleSubmit = useCallback(() => {
    if (!problem || !userCode.trim()) return;

    const result = validateFrontendDrillAnswer(problem, userCode.trim());
    setFeedback({
      success: result.success,
      error: result.success ? undefined : result.error,
      output: 'output' in result ? result.output : undefined,
    });

    // Auto-expand solution on incorrect answer
    if (!result.success) {
      setShowSolution(true);
    }

    // Update progress
    if (isValidFramework(framework)) {
      const updated = { ...progress };
      const entry = updated[problem.id] || { attempts: 0, solved: false };
      entry.attempts += 1;
      if (result.success) entry.solved = true;
      updated[problem.id] = entry;
      setProgress(updated);
      saveProgress(framework, updated);
    }
  }, [problem, userCode, framework, progress]);

  // Reset handler
  const handleReset = useCallback(() => {
    setUserCode(problem ? generateTrainingStarter(problem) : '');
    setFeedback(null);
  }, [problem]);

  // ── Loading / Not-found states ──────────────────────────────────────────

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading problem...</div>
      </div>
    );
  }

  if (!isValidFramework(framework)) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Framework Not Found</h1>
          <Link
            href="/frontend-drills"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Back to Frontend Drills
          </Link>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <p className="text-zinc-400 mb-6">
            The problem you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href={`/frontend-drills/${framework}/training`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Training
          </Link>
        </div>
      </div>
    );
  }

  const fwConfig = FRAMEWORK_CONFIG[framework as FrameworkId];
  const editorLang = getEditorLanguage(framework as FrameworkId, problem);
  const currentProgress = progress[problem.id];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* ── Header Navigation ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Link
            href={`/frontend-drills/${framework}/training`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span className="text-sm font-medium">Back to Training</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500">
              Problem #{problemIndex + 1} of {problems.length}
            </span>

            <div className="flex items-center gap-2">
              {prevProblem ? (
                <Link
                  href={`/frontend-drills/${framework}/training/${prevProblem.id}`}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${fwConfig.borderColor} ${fwConfig.color} hover:${fwConfig.bgColor.replace('/10', '/20')}`}
                >
                  Previous
                </Link>
              ) : (
                <span className="px-3 py-1.5 text-sm rounded-lg border border-zinc-700/50 text-zinc-600 cursor-not-allowed">
                  Previous
                </span>
              )}
              {nextProblem ? (
                <Link
                  href={`/frontend-drills/${framework}/training/${nextProblem.id}`}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${fwConfig.borderColor} ${fwConfig.color} hover:${fwConfig.bgColor.replace('/10', '/20')}`}
                >
                  Next
                </Link>
              ) : (
                <span className="px-3 py-1.5 text-sm rounded-lg border border-zinc-700/50 text-zinc-600 cursor-not-allowed">
                  Next
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Two-Column Layout ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Left Panel: Problem Description ──────────────────────── */}
          <div className="space-y-4">
            {/* Title + Badges */}
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h1 className="text-xl font-bold text-zinc-100">{problem.title}</h1>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DIFFICULTY_STYLES[problem.difficulty] || ''}`}
                >
                  {problem.difficulty}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-700/50 text-zinc-300">
                  {problem.category}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${fwConfig.bgColor} ${fwConfig.color}`}
                >
                  {fwConfig.shortName}
                </span>
              </div>
              <p className="text-zinc-400 leading-relaxed">{problem.text}</p>
              {problem.realWorldExample && (
                <div className="mt-3 flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-blue-500/5 border border-blue-500/15">
                  <svg
                    className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                  <p className="text-xs text-blue-300/80 leading-relaxed">
                    <span className="font-semibold text-blue-300">Real-world: </span>
                    {problem.realWorldExample}
                  </p>
                </div>
              )}
            </div>

            {/* Setup Code */}
            {problem.setupCode && (
              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-zinc-300 mb-3">Setup Code</h2>
                <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg font-mono text-sm leading-relaxed border border-zinc-700/50 whitespace-pre-wrap break-words overflow-x-auto">
                  <code>{problem.setupCode}</code>
                </pre>
              </div>
            )}

            {/* Hints (collapsible) */}
            {problem.hints && problem.hints.length > 0 && (
              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowHints(!showHints)}
                  className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-zinc-300">
                      Hints ({problem.hints.length})
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-zinc-500 transition-transform ${showHints ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {showHints && (
                  <div className="px-4 pb-4 border-t border-zinc-700/50">
                    <ul className="space-y-2 mt-3">
                      {problem.hints.map((hint, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                          <span className="text-yellow-400 font-bold mt-0.5">{i + 1}.</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Sample Solution (collapsible) */}
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-zinc-300">Sample Solution</span>
                </div>
                <svg
                  className={`w-4 h-4 text-zinc-500 transition-transform ${showSolution ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {showSolution && (
                <div className="px-4 pb-4 border-t border-zinc-700/50">
                  <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg font-mono text-sm leading-relaxed border border-zinc-700/50 whitespace-pre-wrap break-words overflow-x-auto mt-3">
                    <code>{problem.sample}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* ── Right Panel: Editor + Submit ─────────────────────────── */}
          <div className="space-y-4">
            {/* Feedback Banner */}
            {feedback && (
              <div
                className={`rounded-xl p-4 border ${
                  feedback.success
                    ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'
                    : 'bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-2xl font-bold ${feedback.success ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {feedback.success ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-lg font-semibold ${feedback.success ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {feedback.success ? 'Correct!' : 'Incorrect'}
                    </div>
                    {!feedback.success && feedback.error && (
                      <p className="text-sm text-red-400/80 mt-1">{feedback.error}</p>
                    )}
                  </div>
                  {feedback.success && nextProblem && (
                    <Link
                      href={`/frontend-drills/${framework}/training/${nextProblem.id}`}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${fwConfig.bgColor} ${fwConfig.color} border ${fwConfig.borderColor} hover:brightness-125`}
                    >
                      Next Problem
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Code Editor */}
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-zinc-300">Your Answer</h2>
                {currentProgress && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    {currentProgress.solved && (
                      <span className="text-green-400 font-medium">Solved</span>
                    )}
                    <span>
                      {currentProgress.attempts} attempt{currentProgress.attempts !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
              <CodeEditor
                key={`${framework}-${problemId}`}
                code={userCode}
                onChange={setUserCode}
                language={editorLang}
                height={300}
                lineNumbers={true}
                autoFocus={true}
                onSubmitShortcut={handleSubmit}
                setupCode={problem.setupCode}
                monacoLanguageOverride={problem.editorLanguage}
                hideValidation={!!problem.validPatterns?.length}
              />
              <p className="text-xs text-zinc-500 mt-2">
                Press{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono">
                  Cmd/Ctrl + Enter
                </kbd>{' '}
                to submit
              </p>
            </div>

            {/* User Output Display */}
            {feedback && feedback.output !== undefined && (
              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-4">
                <h2 className="text-sm font-semibold text-zinc-300 mb-2">Your Output</h2>
                <div
                  className={`p-3 rounded-lg font-mono text-sm border ${
                    feedback.success
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {formatOutput(feedback.output)}
                </div>
              </div>
            )}

            {/* Expected Output */}
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-zinc-300 mb-2">Expected Output</h2>
              <div className="bg-zinc-950 p-3 rounded-lg font-mono text-sm text-green-400 border border-zinc-700/50">
                {formatOutput(problem.expected)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!userCode.trim()}
                className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all cursor-pointer
                  disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed
                  ${
                    userCode.trim()
                      ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40`
                      : ''
                  }`}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-6 font-semibold rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-700/50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
