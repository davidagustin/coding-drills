'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { isValidLanguage, LANGUAGE_CONFIG } from '@/app/[language]/config';
import {
  evaluateRegex,
  getAdjacentProblems,
  getRegexProblemById,
  type MatchRange,
  REGEX_CHEATSHEET,
  type RegexCheatsheetEntry,
} from '@/lib/regexTrainer';
import type { Difficulty } from '@/lib/types';

// ============================================================================
// Hooks
// ============================================================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// ============================================================================
// Sub-Components
// ============================================================================

type CharHighlight = 'correct' | 'false-positive' | 'missed' | 'normal';

function HighlightedText({
  text,
  userMatches,
  expectedMatches,
  showMissed,
}: {
  text: string;
  userMatches: MatchRange[];
  expectedMatches: MatchRange[];
  showMissed: boolean;
}) {
  const charMap = useMemo(() => {
    const map: CharHighlight[] = new Array(text.length).fill('normal');

    const userSet = new Set<number>();
    for (const m of userMatches) {
      for (let i = m.start; i < m.end; i++) userSet.add(i);
    }

    const expectedSet = new Set<number>();
    for (const m of expectedMatches) {
      for (let i = m.start; i < m.end; i++) expectedSet.add(i);
    }

    for (let i = 0; i < text.length; i++) {
      const inUser = userSet.has(i);
      const inExpected = expectedSet.has(i);
      if (inUser && inExpected) map[i] = 'correct';
      else if (inUser && !inExpected) map[i] = 'false-positive';
      else if (!inUser && inExpected) map[i] = 'missed';
    }

    return map;
  }, [text, userMatches, expectedMatches]);

  const spans = useMemo(() => {
    if (text.length === 0) return [];
    const result: { type: CharHighlight; content: string }[] = [];
    let currentType = charMap[0];
    let currentContent = text[0];
    for (let i = 1; i < text.length; i++) {
      if (charMap[i] === currentType) {
        currentContent += text[i];
      } else {
        result.push({ type: currentType, content: currentContent });
        currentType = charMap[i];
        currentContent = text[i];
      }
    }
    result.push({ type: currentType, content: currentContent });
    return result;
  }, [text, charMap]);

  const getStyle = (type: CharHighlight): string => {
    switch (type) {
      case 'correct':
        return 'bg-green-500/30 text-green-200';
      case 'false-positive':
        return 'bg-red-500/20 text-red-300';
      case 'missed':
        return showMissed
          ? 'border-b-2 border-dashed border-yellow-500/60 text-yellow-200'
          : 'text-zinc-300';
      default:
        return 'text-zinc-300';
    }
  };

  return (
    <div className="font-mono text-sm whitespace-pre-wrap break-all p-4 bg-zinc-900 rounded-lg border border-zinc-700 max-h-64 overflow-y-auto leading-relaxed">
      {spans.map((span, i) => (
        <span key={i} className={getStyle(span.type)}>
          {span.content}
        </span>
      ))}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const colors: Record<Difficulty, string> = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded border ${colors[difficulty]}`}>{difficulty}</span>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function RegexProblemPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const problemId = params.problemId as string;
  const fromLanguage = searchParams.get('from');
  const validFrom = fromLanguage && isValidLanguage(fromLanguage) ? fromLanguage : null;
  const fromLabel = validFrom ? LANGUAGE_CONFIG[validFrom].name : null;
  const fromSuffix = validFrom ? `?from=${validFrom}` : '';

  const problem = useMemo(() => getRegexProblemById(problemId), [problemId]);
  const adjacent = useMemo(() => getAdjacentProblems(problemId), [problemId]);

  const [pattern, setPattern] = useState('');
  const [revealedHintCount, setRevealedHintCount] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  const debouncedPattern = useDebounce(pattern, 150);

  // Reset state when problem changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on problem change
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => {
      setPattern('');
      setRevealedHintCount(0);
      setShowSolution(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);
  }, [problemId]);

  const evalResult = useMemo(() => {
    if (!debouncedPattern || !problem) return null;
    try {
      return evaluateRegex(debouncedPattern, problem.sampleText, problem.expectedMatches);
    } catch {
      return null;
    }
  }, [debouncedPattern, problem]);

  const userMatches: MatchRange[] = useMemo(() => evalResult?.userMatches ?? [], [evalResult]);
  const isCorrect = evalResult?.evaluation?.isCorrect ?? false;
  const regexError = evalResult?.parsed?.error ?? null;

  // Group cheatsheet entries
  const groupedCheatsheet = useMemo(() => {
    const map = new Map<string, RegexCheatsheetEntry[]>();
    for (const entry of REGEX_CHEATSHEET) {
      const cat = entry.category || 'General';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)?.push(entry);
    }
    return map;
  }, []);

  if (!problem) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-100 mb-4">Problem Not Found</h1>
          <p className="text-zinc-400 mb-6">The specified regex problem does not exist.</p>
          <Link
            href={`/regex${fromSuffix}`}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            Back to Regex Trainer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
              Home
            </Link>
            {validFrom && (
              <>
                <span className="text-zinc-600">/</span>
                <Link
                  href={`/${validFrom}`}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {fromLabel}
                </Link>
              </>
            )}
            <span className="text-zinc-600">/</span>
            <Link
              href={`/regex${fromSuffix}`}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Regex Trainer
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-300 truncate max-w-[200px]">{problem.title}</span>
          </nav>

          {/* Prev/Next */}
          <div className="flex items-center gap-2">
            {adjacent.prev ? (
              <Link
                href={`/regex/${adjacent.prev.id}${fromSuffix}`}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                title={adjacent.prev.title}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            ) : (
              <span className="p-2 rounded-lg bg-zinc-800/50 text-zinc-600 cursor-not-allowed">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            )}
            {adjacent.next ? (
              <Link
                href={`/regex/${adjacent.next.id}${fromSuffix}`}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                title={adjacent.next.title}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <span className="p-2 rounded-lg bg-zinc-800/50 text-zinc-600 cursor-not-allowed">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Problem Card */}
        <div
          className={`bg-zinc-900 rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ${
            isCorrect ? 'border-green-500 ring-2 ring-green-500/30' : 'border-zinc-800'
          }`}
        >
          {/* Problem Header */}
          <div className="border-b border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <DifficultyBadge difficulty={problem.difficulty} />
              <span className="text-xs px-2 py-1 rounded border border-zinc-700 bg-zinc-800 text-zinc-400">
                {problem.category}
              </span>
            </div>
            <h1 className="text-xl font-semibold text-zinc-100 mb-2">{problem.title}</h1>
            <p className="text-sm text-zinc-400">{problem.prompt}</p>
          </div>

          {/* Sample Text + Highlighting */}
          <div className="p-6 border-b border-zinc-800">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Sample Text</span>
            <HighlightedText
              text={problem.sampleText}
              userMatches={userMatches}
              expectedMatches={problem.expectedMatches}
              showMissed={true}
            />
          </div>

          {/* Match Count */}
          <div className="px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-sm text-zinc-400">
              <span className="font-mono text-zinc-200">{userMatches.length}</span>
              {' / '}
              <span className="font-mono text-zinc-200">{problem.expectedMatches.length}</span>
              {' matches found'}
            </span>
            {isCorrect && (
              <span className="text-sm text-green-400 font-medium">All matches correct!</span>
            )}
          </div>

          {/* Regex Input */}
          <div className="p-6">
            <div
              className={`flex items-center bg-zinc-800 rounded-lg border transition-all duration-200 ${
                isCorrect
                  ? 'border-green-500 ring-2 ring-green-500/50'
                  : regexError
                    ? 'border-red-500 ring-2 ring-red-500/50'
                    : 'border-zinc-700 focus-within:border-zinc-500'
              }`}
            >
              <span className="text-zinc-500 font-mono text-lg pl-4 select-none">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="type your regex..."
                className="flex-1 bg-transparent text-zinc-100 font-mono text-sm px-2 py-3 focus:outline-none placeholder-zinc-600"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-zinc-500 font-mono text-lg select-none">/</span>
              <span className="text-green-400 font-mono text-sm pr-4 pl-1 select-none">g</span>
            </div>
            {regexError && <p className="mt-1.5 text-xs text-zinc-500">{regexError}</p>}
          </div>
        </div>

        {/* Hints Section */}
        {problem.hints.length > 0 && (
          <div className="mt-6 bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
                Hints
              </h2>
            </div>
            <div className="p-4 space-y-2">
              {problem.hints.slice(0, revealedHintCount).map((hint, i) => (
                <div
                  key={i}
                  className="bg-zinc-800 rounded-lg p-3 text-sm text-zinc-300 border border-zinc-700"
                >
                  <span className="text-yellow-400 font-medium mr-2">Hint {i + 1}:</span>
                  {hint}
                </div>
              ))}
              {revealedHintCount < problem.hints.length && (
                <button
                  type="button"
                  onClick={() => setRevealedHintCount((c) => c + 1)}
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  Show hint ({revealedHintCount}/{problem.hints.length})
                </button>
              )}
              {revealedHintCount >= problem.hints.length && (
                <p className="text-xs text-zinc-600">All hints revealed</p>
              )}
            </div>
          </div>
        )}

        {/* Show Solution */}
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => {
              setShowSolution(!showSolution);
              if (!showSolution && problem.sampleSolutions.length > 0) {
                // Don't auto-fill; just show it
              }
            }}
            className="py-2.5 px-6 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-600/30 font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (problem.sampleSolutions.length > 0) {
                setPattern(problem.sampleSolutions[0]);
              }
            }}
            className="py-2.5 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            Try Solution
          </button>
        </div>

        {showSolution && problem.sampleSolutions.length > 0 && (
          <div className="mt-3 bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <h3 className="text-sm font-medium text-zinc-300 mb-2">
              Sample Solution{problem.sampleSolutions.length > 1 ? 's' : ''}
            </h3>
            <div className="space-y-2">
              {problem.sampleSolutions.map((sol, i) => (
                <div key={i} className="flex items-center gap-2">
                  <code className="bg-zinc-800 px-3 py-1.5 rounded text-green-400 font-mono text-sm border border-zinc-700">
                    /{sol}/g
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regex Cheatsheet */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className="w-full p-4 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between hover:bg-zinc-800/50 transition-colors cursor-pointer"
          >
            <span className="text-sm font-semibold text-zinc-200">Regex Cheatsheet</span>
            <svg
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${showCheatsheet ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showCheatsheet && (
            <div className="mt-2 bg-zinc-900 rounded-xl border border-zinc-800 p-4 space-y-4 max-h-[50vh] overflow-y-auto">
              {Array.from(groupedCheatsheet.entries()).map(([category, entries]) => (
                <div key={category}>
                  <h4 className="text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {entries.map((entry, i) => (
                      <div
                        key={i}
                        className="flex items-baseline gap-3 py-1.5 px-2 rounded hover:bg-zinc-800/50"
                      >
                        <code className="text-green-400 font-mono text-sm whitespace-nowrap flex-shrink-0">
                          {entry.pattern}
                        </code>
                        <span className="text-zinc-400 text-sm">{entry.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href={`/regex${fromSuffix}`}
            className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors text-sm border border-zinc-700"
          >
            Back to All Problems
          </Link>
          <div className="flex items-center gap-2">
            {adjacent.prev && (
              <Link
                href={`/regex/${adjacent.prev.id}${fromSuffix}`}
                className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors text-sm border border-zinc-700 flex items-center gap-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </Link>
            )}
            {adjacent.next && (
              <Link
                href={`/regex/${adjacent.next.id}${fromSuffix}`}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
              >
                Next
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
