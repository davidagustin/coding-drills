'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PatternRecognitionGuide } from '@/components/PatternRecognitionGuide';
import { QuestionCountSlider } from '@/components/QuestionCountSlider';
import {
  type AlgorithmPattern,
  type AlgorithmPatternProblem,
  getPatternCategories,
  getPatternProblems,
} from '@/lib/algorithmPatterns';

// ============================================================================
// Types
// ============================================================================

type Phase = 'setup' | 'playing' | 'results' | 'review';

interface PatternQuizState {
  phase: Phase;
  problems: AlgorithmPatternProblem[];
  currentIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  answers: PatternAnswer[];
  startTime: number | null;
  endTime: number | null;
  selectedPattern: AlgorithmPattern | null;
  showingAnswer: boolean;
  questionStartTime: number | null;
  showGuide: boolean;
}

interface PatternAnswer {
  problemId: string;
  selectedPattern: AlgorithmPattern;
  correctPattern: AlgorithmPattern;
  isCorrect: boolean;
  timeSpent: number;
  points: number;
}

interface PatternQuizConfig {
  difficulty: 'easy' | 'medium' | 'hard' | 'all';
  category: string | 'all';
  questionCount: number;
  timePerQuestion: number;
}

export interface PatternQuizContentProps {
  /** Where "Back to Menu" navigates (e.g. "/" for standalone, "/typescript" for language page) */
  backHref: string;
  /** Optional link to study mode for inline mode tabs */
  studyHref?: string;
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

function calculateScore(
  isCorrect: boolean,
  timeSpent: number,
  timeLimit: number,
  streak: number,
): number {
  if (!isCorrect) return 0;

  const basePoints = 100;
  const timeBonus = Math.max(0, Math.floor((timeLimit - timeSpent) / 10));
  const streakBonus = streak * 10;

  return basePoints + timeBonus + streakBonus;
}

// ============================================================================
// Setup Phase Component
// ============================================================================

interface SetupPhaseProps {
  config: PatternQuizConfig;
  onConfigChange: (config: PatternQuizConfig) => void;
  onStart: () => void;
  onShowGuide?: () => void;
  categories: string[];
  studyHref?: string;
}

const TIME_OPTIONS = [10, 15, 20, 30, 0] as const;

function SetupPhase({
  config,
  onConfigChange,
  onStart,
  onShowGuide,
  categories,
  studyHref,
}: SetupPhaseProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const availableCount = getPatternProblems(
    config.difficulty === 'all' ? undefined : config.difficulty,
    config.category === 'all' ? undefined : config.category,
  ).length;
  const maxQuestions = Math.max(1, availableCount);
  const questionCount = Math.min(config.questionCount, maxQuestions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Algorithm Pattern Quiz
          </h1>
          <p className="text-slate-400 text-lg">
            Test your ability to recognize algorithm patterns from LeetCode-style problems
          </p>
        </div>

        {/* Inline mode tabs */}
        {studyHref && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              Quiz
            </span>
            <Link
              href={studyHref}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>
              Study
            </Link>
          </div>
        )}

        {/* Pattern Recognition Guide */}
        {onShowGuide && (
          <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Pattern Recognition Guide</h2>
                <p className="text-slate-400 text-sm">
                  Review the framework before the timed quiz starts
                </p>
              </div>
              <button
                type="button"
                onClick={onShowGuide}
                className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                View Guide
              </button>
            </div>
          </div>
        )}

        {/* Difficulty */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold mb-4">Difficulty</h2>
          <div className="flex gap-2">
            {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => onConfigChange({ ...config, difficulty: diff })}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                  config.difficulty === diff
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {diff === 'all' ? 'All' : diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
          <label htmlFor="category-select" className="block text-xl font-semibold mb-4">
            Category
          </label>
          <select
            id="category-select"
            value={config.category}
            onChange={(e) => onConfigChange({ ...config, category: e.target.value })}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Questions */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Number of Questions</h2>
            <span className="text-sm text-slate-400">{availableCount} problems available</span>
          </div>
          <QuestionCountSlider
            value={questionCount}
            onChange={(value) => onConfigChange({ ...config, questionCount: value })}
            min={1}
            max={maxQuestions}
            showLabel={false}
          />
        </div>

        {/* Time Per Question */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold mb-4">Time Per Question</h2>
          <div className="flex gap-3 mb-4">
            {TIME_OPTIONS.map((time) => (
              <button
                type="button"
                key={time}
                onClick={() => onConfigChange({ ...config, timePerQuestion: time })}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                  config.timePerQuestion === time
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {time === 0 ? '∞' : `${time}s`}
              </button>
            ))}
          </div>
          {config.timePerQuestion !== 0 && (
            <div className="pt-2 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                <span>Custom time</span>
                <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">
                  {config.timePerQuestion}s
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={config.timePerQuestion}
                onChange={(e) =>
                  onConfigChange({ ...config, timePerQuestion: Number(e.target.value) })
                }
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>5s</span>
                <span>60s</span>
              </div>
            </div>
          )}
          {config.timePerQuestion === 0 && (
            <div className="pt-2 border-t border-slate-700/50">
              <p className="text-sm text-slate-400 text-center py-2">
                No time limit - take as long as you need
              </p>
            </div>
          )}
        </div>

        {/* Sound Effects */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Sound Effects</h2>
              <p className="text-slate-400 text-sm">Audio feedback for answers and timer</p>
            </div>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 cursor-pointer ${
                soundEnabled ? 'bg-blue-500' : 'bg-slate-600'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                  soundEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-xl cursor-pointer
                     hover:from-blue-600 hover:to-purple-700 transition-all duration-200
                     shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                     transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Playing Phase Component
// ============================================================================

interface PlayingPhaseProps {
  problem: AlgorithmPatternProblem;
  state: PatternQuizState;
  onSelectPattern: (pattern: AlgorithmPattern) => void;
  onShowGuide: () => void;
  timeLeft: number;
  /** When 0, no time limit (show ∞) */
  timeLimitSeconds: number;
}

function PlayingPhase({
  problem,
  state,
  onSelectPattern,
  onShowGuide,
  timeLeft,
  timeLimitSeconds,
}: PlayingPhaseProps) {
  const [hintsExpanded, setHintsExpanded] = useState(false);
  // Memoize shuffled patterns so they don't change on every render
  const shuffledPatterns = useMemo(() => shuffleArray(problem.patterns), [problem.patterns]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-zinc-400">
          Question {state.currentIndex + 1} / {state.problems.length}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-zinc-400">
            Score: <span className="text-white font-semibold">{state.score}</span>
          </div>
          <div className="text-zinc-400">
            Streak: <span className="text-orange-400 font-semibold">{state.streak}</span>
          </div>
          <div className="text-zinc-400">
            Time:{' '}
            <span className="text-purple-400 font-semibold">
              {timeLimitSeconds === 0 ? '∞' : `${timeLeft}s`}
            </span>
          </div>
        </div>
      </div>

      {/* Problem Card */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 space-y-6">
        {/* Title and Guide Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{problem.title}</h2>
          <button
            type="button"
            onClick={onShowGuide}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            📖 View Guide
          </button>
        </div>

        {/* Description */}
        <p className="text-zinc-300">{problem.description}</p>

        {/* Examples */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Examples:</h3>
          {problem.examples.map((example, idx) => (
            <div key={idx} className="bg-zinc-800 rounded-lg p-4 space-y-2">
              <div>
                <span className="text-zinc-400 text-sm">Input: </span>
                <code className="text-blue-400 font-mono">{example.input}</code>
              </div>
              <div>
                <span className="text-zinc-400 text-sm">Output: </span>
                <code className="text-green-400 font-mono">{example.output}</code>
              </div>
              {example.explanation && (
                <div className="text-zinc-400 text-sm mt-2">{example.explanation}</div>
              )}
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Constraints:</h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="text-sm">
                {constraint}
              </li>
            ))}
          </ul>
        </div>

        {/* Hints (if available) - expandable, closed by default so they don't give away the answer */}
        {problem.hints && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setHintsExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-blue-500/10 transition-colors"
              aria-expanded={hintsExpanded}
            >
              <span className="text-sm font-semibold text-blue-400">💡 Hints</span>
              <svg
                className={`w-4 h-4 text-blue-400 shrink-0 transition-transform ${hintsExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {hintsExpanded && (
              <div className="px-4 pb-4 pt-0 space-y-3 border-t border-blue-500/20">
                {problem.hints.bigO && (
                  <div className="text-sm text-zinc-300 pt-3">
                    <strong className="text-blue-400">Big O Analysis:</strong> {problem.hints.bigO}
                  </div>
                )}
                {problem.hints.constraints && (
                  <div className="text-sm text-zinc-300">
                    <strong>Constraints:</strong> {problem.hints.constraints}
                  </div>
                )}
                {problem.hints.pattern && (
                  <div className="text-sm text-zinc-300">
                    <strong className="text-yellow-400">Pattern Recognition:</strong>{' '}
                    {problem.hints.pattern}
                  </div>
                )}
                {problem.hints.inputFormat && (
                  <div className="text-sm text-zinc-300">
                    <strong>Input Format:</strong> {problem.hints.inputFormat}
                  </div>
                )}
                {problem.hints.outputFormat && (
                  <div className="text-sm text-zinc-300">
                    <strong>Output Format:</strong> {problem.hints.outputFormat}
                  </div>
                )}
                {problem.hints.keywords && problem.hints.keywords.length > 0 && (
                  <div className="text-sm text-zinc-300">
                    <strong>Keywords:</strong> {problem.hints.keywords.join(', ')}
                  </div>
                )}
                {problem.hints.advancedLogic && (
                  <div className="text-sm text-purple-300 mt-2 p-2 bg-purple-500/10 rounded border border-purple-500/30">
                    <strong className="text-purple-400">⚡ Advanced Logic:</strong>{' '}
                    {problem.hints.advancedLogic}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Pattern Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Which algorithm pattern should be used?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {shuffledPatterns.map((pattern) => {
              const isSelected = state.selectedPattern === pattern;
              const isCorrect = pattern === problem.correctPattern;
              const showResult = state.showingAnswer;

              return (
                <button
                  key={pattern}
                  type="button"
                  onClick={() => !showResult && onSelectPattern(pattern)}
                  disabled={showResult}
                  className={`p-4 rounded-lg border-2 font-medium transition-all ${
                    showResult && isCorrect
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : showResult && isSelected && !isCorrect
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : isSelected
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-600'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {pattern}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {state.showingAnswer && (
          <div className="mt-4 p-4 rounded-lg bg-zinc-800 border border-zinc-700">
            {state.selectedPattern === problem.correctPattern ? (
              <div className="text-green-400 font-semibold text-lg">
                ✓ Correct! +{state.answers[state.answers.length - 1]?.points || 0} points
              </div>
            ) : (
              <div className="text-red-400 font-semibold text-lg">
                ✗ Incorrect! The correct answer is{' '}
                <span className="text-green-400">{problem.correctPattern}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Results Phase Component
// ============================================================================

interface ResultsPhaseProps {
  state: PatternQuizState;
  onTryAgain: () => void;
  onBackToMenu: () => void;
  onReviewAnswers: () => void;
}

function ResultsPhase({ state, onTryAgain, onBackToMenu, onReviewAnswers }: ResultsPhaseProps) {
  const totalQuestions = state.answers.length;
  const correctAnswers = state.answers.filter((a) => a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Quiz Complete!</h1>
        <p className="text-zinc-400">Here is how you did</p>
      </div>

      {/* Score */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 text-center border border-blue-500/30">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {state.score}
        </div>
        <div className="text-sm text-zinc-400 mt-1 uppercase tracking-wider">Total Points</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-900 rounded-xl p-6 text-center border border-zinc-800">
          <div className="text-3xl font-bold text-green-500">
            {correctAnswers} / {totalQuestions}
          </div>
          <div className="text-sm text-zinc-500 mt-1">Correct</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center border border-zinc-800">
          <div className="text-3xl font-bold text-blue-500">{accuracy}%</div>
          <div className="text-sm text-zinc-500 mt-1">Accuracy</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center border border-zinc-800">
          <div className="text-3xl font-bold text-orange-500">{state.maxStreak}</div>
          <div className="text-sm text-zinc-500 mt-1">Max Streak</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onTryAgain}
            className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={onBackToMenu}
            className="flex-1 py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl transition-colors border border-zinc-700"
          >
            Back to Menu
          </button>
        </div>
        <button
          type="button"
          onClick={onReviewAnswers}
          className="w-full py-3 px-6 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 font-medium rounded-xl transition-colors border border-zinc-700"
        >
          Review Answers
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Review Phase Component
// ============================================================================

interface ReviewPhaseProps {
  state: PatternQuizState;
  onBackToResults: () => void;
  onBackToMenu: () => void;
}

function ReviewPhase({ state, onBackToResults, onBackToMenu }: ReviewPhaseProps) {
  const problemById = useMemo(() => {
    const map = new Map<string, AlgorithmPatternProblem>();
    for (const p of state.problems) {
      map.set(p.id, p);
    }
    return map;
  }, [state.problems]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Review Answers</h1>
        <p className="text-zinc-400">See what you got right and wrong</p>
      </div>

      <div className="space-y-4">
        {state.answers.map((answer, index) => {
          const problem = problemById.get(answer.problemId);
          const title = problem?.title ?? answer.problemId;
          return (
            <div
              key={`${answer.problemId}-${index}`}
              className={`rounded-xl p-4 border ${
                answer.isCorrect
                  ? 'bg-green-500/5 border-green-500/30'
                  : 'bg-red-500/5 border-red-500/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-zinc-400 text-sm">Question {index + 1}</span>
                {answer.isCorrect ? (
                  <span className="text-green-400 text-sm font-medium">Correct</span>
                ) : (
                  <span className="text-red-400 text-sm font-medium">Incorrect</span>
                )}
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="text-zinc-500">Your answer:</span>
                <span
                  className={
                    answer.isCorrect ? 'text-green-400 font-medium' : 'text-red-400 font-medium'
                  }
                >
                  {answer.selectedPattern}
                </span>
                {!answer.isCorrect && (
                  <>
                    <span className="text-zinc-500">→</span>
                    <span className="text-zinc-500">Correct:</span>
                    <span className="text-green-400 font-medium">{answer.correctPattern}</span>
                  </>
                )}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {answer.timeSpent}s · {answer.points} pts
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBackToResults}
          className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Back to Results
        </button>
        <button
          type="button"
          onClick={onBackToMenu}
          className="flex-1 py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl transition-colors border border-zinc-700"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Main Content Component
// ============================================================================

export function PatternQuizContent({ backHref, studyHref }: PatternQuizContentProps) {
  const categories = getPatternCategories();

  // Read URL params for configuration
  const searchParams =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const urlQuestionCount = searchParams?.get('questionCount');
  const urlTimePerQuestion = searchParams?.get('timePerQuestion');
  const autoStart = searchParams?.get('autoStart') === 'true';

  const [config, setConfig] = useState<PatternQuizConfig>({
    difficulty: 'all',
    category: 'all',
    questionCount: urlQuestionCount ? parseInt(urlQuestionCount, 10) : 10,
    timePerQuestion: urlTimePerQuestion ? parseInt(urlTimePerQuestion, 10) : 30,
  });

  const [state, setState] = useState<PatternQuizState>({
    phase: 'setup',
    problems: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    answers: [],
    startTime: null,
    endTime: null,
    selectedPattern: null,
    showingAnswer: false,
    questionStartTime: null,
    showGuide: false,
  });

  const [timeLeft, setTimeLeft] = useState(config.timePerQuestion);
  const hasAutoStartedRef = useRef(false);

  const advanceToNextQuestion = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;

      if (nextIndex >= prev.problems.length) {
        // Quiz complete
        return {
          ...prev,
          phase: 'results',
          endTime: Date.now(),
        };
      }

      return {
        ...prev,
        currentIndex: nextIndex,
        selectedPattern: null,
        showingAnswer: false,
        questionStartTime: Date.now(),
      };
    });
    setTimeLeft(config.timePerQuestion);
  }, [config.timePerQuestion]);

  const handleTimeout = useCallback(() => {
    const currentProblem = state.problems[state.currentIndex];
    const answer: PatternAnswer = {
      problemId: currentProblem.id,
      selectedPattern: state.selectedPattern || ('Unknown' as AlgorithmPattern),
      correctPattern: currentProblem.correctPattern,
      isCorrect: false,
      timeSpent: config.timePerQuestion,
      points: 0,
    };

    setState((prev) => ({
      ...prev,
      showingAnswer: true,
      streak: 0,
      answers: [...prev.answers, answer],
    }));

    setTimeout(() => {
      advanceToNextQuestion();
    }, 2000);
  }, [state, config.timePerQuestion, advanceToNextQuestion]);

  // Timer effect (skip when unlimited time)
  useEffect(() => {
    if (state.phase !== 'playing' || state.showingAnswer || config.timePerQuestion === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - mark as incorrect
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.phase, state.showingAnswer, config.timePerQuestion, handleTimeout]);

  const handleStart = useCallback(() => {
    let problems = getPatternProblems(
      config.difficulty === 'all' ? undefined : config.difficulty,
      config.category === 'all' ? undefined : config.category,
    );

    if (problems.length === 0) {
      alert('No problems available with the selected filters. Please adjust your selection.');
      return;
    }

    problems = shuffleArray(problems).slice(0, config.questionCount);

    setState({
      phase: 'playing',
      problems,
      currentIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      answers: [],
      startTime: Date.now(),
      endTime: null,
      selectedPattern: null,
      showingAnswer: false,
      questionStartTime: Date.now(),
      showGuide: false,
    });
    setTimeLeft(config.timePerQuestion);
  }, [config]);

  // Auto-start quiz if coming from quiz page with autoStart param
  useEffect(() => {
    if (autoStart && state.phase === 'setup' && !hasAutoStartedRef.current) {
      hasAutoStartedRef.current = true;
      // Use setTimeout to avoid calling setState synchronously in effect
      setTimeout(() => {
        handleStart();
      }, 0);
    }
  }, [autoStart, handleStart, state.phase]);

  const handleSelectPattern = useCallback(
    (pattern: AlgorithmPattern) => {
      if (state.showingAnswer) return;

      const currentProblem = state.problems[state.currentIndex];
      const isCorrect = pattern === currentProblem.correctPattern;
      const timeSpent = state.questionStartTime ? (Date.now() - state.questionStartTime) / 1000 : 0;

      const points = calculateScore(isCorrect, timeSpent, config.timePerQuestion, state.streak);

      const answer: PatternAnswer = {
        problemId: currentProblem.id,
        selectedPattern: pattern,
        correctPattern: currentProblem.correctPattern,
        isCorrect,
        timeSpent,
        points,
      };

      const newStreak = isCorrect ? state.streak + 1 : 0;

      setState((prev) => ({
        ...prev,
        selectedPattern: pattern,
        showingAnswer: true,
        score: prev.score + points,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        answers: [...prev.answers, answer],
      }));

      // Auto-advance after 2 seconds
      setTimeout(() => {
        advanceToNextQuestion();
      }, 2000);
    },
    [state, config.timePerQuestion, advanceToNextQuestion],
  );

  const handleTryAgain = useCallback(() => {
    handleStart();
  }, [handleStart]);

  const handleBackToMenu = useCallback(() => {
    window.location.href = backHref;
  }, [backHref]);

  const currentProblem = state.phase === 'playing' ? state.problems[state.currentIndex] : null;

  // When arriving with autoStart=true, show a loading state instead of flashing the setup form
  const isAutoStarting = autoStart && state.phase === 'setup';

  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      {isAutoStarting && (
        <div className="min-h-screen flex flex-col items-center justify-center text-zinc-400">
          <div className="animate-pulse text-lg">Starting quiz…</div>
        </div>
      )}
      {state.phase === 'setup' && !autoStart && (
        <SetupPhase
          config={config}
          onConfigChange={setConfig}
          onStart={handleStart}
          onShowGuide={() => setState((prev) => ({ ...prev, showGuide: true }))}
          categories={categories}
          studyHref={studyHref}
        />
      )}

      {state.phase === 'playing' && currentProblem && (
        <PlayingPhase
          problem={currentProblem}
          state={state}
          onSelectPattern={handleSelectPattern}
          onShowGuide={() => setState((prev) => ({ ...prev, showGuide: true }))}
          timeLeft={timeLeft}
          timeLimitSeconds={config.timePerQuestion}
        />
      )}

      {state.phase === 'results' && (
        <ResultsPhase
          state={state}
          onTryAgain={handleTryAgain}
          onBackToMenu={handleBackToMenu}
          onReviewAnswers={() => setState((prev) => ({ ...prev, phase: 'review' }))}
        />
      )}

      {state.phase === 'review' && (
        <ReviewPhase
          state={state}
          onBackToResults={() => setState((prev) => ({ ...prev, phase: 'results' }))}
          onBackToMenu={handleBackToMenu}
        />
      )}

      <PatternRecognitionGuide
        isOpen={state.showGuide}
        onClose={() => setState((prev) => ({ ...prev, showGuide: false }))}
      />
    </div>
  );
}
