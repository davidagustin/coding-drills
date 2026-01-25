"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getExerciseById,
  EXERCISE_CATEGORIES,
  DIFFICULTY_CONFIG,
  type Exercise,
} from "@/lib/exercises";
import { LANGUAGE_CONFIG, isValidLanguage } from "../../config";

// Icon components
function ArrowLeftIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function LightbulbIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function BookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function PlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function EyeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ClockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ResetIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

interface ExerciseProgress {
  completed: boolean;
  attempts: number;
  bestTime?: number;
}

type ViewMode = 'learn' | 'practice';

export default function ExerciseDetailPage() {
  const params = useParams();
  const language = params.language as string;
  const exerciseId = params.exerciseId as string;

  const [mounted, setMounted] = useState(false);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('learn');
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [progress, setProgress] = useState<ExerciseProgress | null>(null);

  // Load exercise and progress
  useEffect(() => {
    setMounted(true);

    if (isValidLanguage(language)) {
      const ex = getExerciseById(language, exerciseId);
      if (ex) {
        setExercise(ex);
        setUserCode(ex.starterCode);
      }

      // Load progress from localStorage
      const storageKey = `coding-drills-exercises-${language}`;
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const allProgress = JSON.parse(stored);
          if (allProgress[exerciseId]) {
            setProgress(allProgress[exerciseId]);
          }
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [language, exerciseId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const revealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const saveProgress = useCallback((completed: boolean, time?: number) => {
    const storageKey = `coding-drills-exercises-${language}`;
    try {
      const stored = localStorage.getItem(storageKey);
      const allProgress = stored ? JSON.parse(stored) : {};

      const currentProgress = allProgress[exerciseId] || { completed: false, attempts: 0 };
      const newProgress: ExerciseProgress = {
        completed: completed || currentProgress.completed,
        attempts: currentProgress.attempts + 1,
        bestTime: time && (!currentProgress.bestTime || time < currentProgress.bestTime)
          ? time
          : currentProgress.bestTime,
      };

      allProgress[exerciseId] = newProgress;
      localStorage.setItem(storageKey, JSON.stringify(allProgress));
      setProgress(newProgress);
    } catch {
      // Ignore localStorage errors
    }
  }, [language, exerciseId]);

  const runCode = async () => {
    if (!exercise || language !== 'javascript' && language !== 'typescript') {
      setResult({
        success: false,
        message: 'Code execution is only available for JavaScript/TypeScript. For other languages, compare your solution with the provided solution.',
      });
      return;
    }

    setIsRunning(true);
    setResult(null);

    try {
      // Simple JavaScript execution using Function constructor
      const testCode = userCode;
      let allPassed = true;
      const messages: string[] = [];

      for (let i = 0; i < exercise.testCases.length; i++) {
        const testCase = exercise.testCases[i];
        try {
          // Extract the function name from the starter code
          const funcMatch = testCode.match(/function\s+(\w+)/);
          if (!funcMatch) {
            throw new Error('Could not find function definition');
          }
          const funcName = funcMatch[1];

          // Create and execute the function
          const fn = new Function(`
            ${testCode}
            const input = ${JSON.stringify(testCase.input)};
            return Array.isArray(input) ? ${funcName}(...input) : ${funcName}(input);
          `);

          const output = fn();
          const expected = testCase.expected;

          const passed = JSON.stringify(output) === JSON.stringify(expected);
          if (!passed) {
            allPassed = false;
            messages.push(`Test ${i + 1} failed: ${testCase.description}\n  Expected: ${JSON.stringify(expected)}\n  Got: ${JSON.stringify(output)}`);
          } else {
            messages.push(`Test ${i + 1} passed: ${testCase.description}`);
          }
        } catch (err) {
          allPassed = false;
          messages.push(`Test ${i + 1} error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }

      if (allPassed) {
        setTimerRunning(false);
        saveProgress(true, timer);
      } else {
        saveProgress(false);
      }

      setResult({
        success: allPassed,
        message: messages.join('\n'),
      });
    } catch (err) {
      setResult({
        success: false,
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
      saveProgress(false);
    } finally {
      setIsRunning(false);
    }
  };

  const startPractice = () => {
    setViewMode('practice');
    setTimer(0);
    setTimerRunning(true);
    setResult(null);
    setUserCode(exercise?.starterCode || '');
  };

  const resetPractice = () => {
    setUserCode(exercise?.starterCode || '');
    setTimer(0);
    setResult(null);
    setTimerRunning(true);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading exercise...</div>
      </div>
    );
  }

  if (!isValidLanguage(language) || !exercise) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Exercise Not Found</h1>
          <Link
            href={`/${language}/exercises`}
            className="text-blue-400 hover:text-blue-300"
          >
            Back to exercises
          </Link>
        </div>
      </div>
    );
  }

  const config = LANGUAGE_CONFIG[language];
  const diffConfig = DIFFICULTY_CONFIG[exercise.difficulty];
  const categoryConfig = EXERCISE_CATEGORIES[exercise.category];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href={`/${language}/exercises`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Exercises
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`text-xs px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}>
              {categoryConfig.name}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${diffConfig.bgColor} ${diffConfig.color}`}>
              {diffConfig.name}
            </span>
            {progress?.completed && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
                <CheckIcon className="w-3 h-3" />
                Completed
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">{exercise.title}</h1>
          <p className="text-lg text-zinc-400">{exercise.description}</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode('learn')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'learn'
                ? `${config.bgColor} ${config.color}`
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <BookIcon className="w-4 h-4" />
            Learn
          </button>
          <button
            onClick={startPractice}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'practice'
                ? `${config.bgColor} ${config.color}`
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <PlayIcon className="w-4 h-4" />
            Practice
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instructions */}
            <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6`}>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookIcon className={`w-5 h-5 ${config.color}`} />
                Instructions
              </h2>
              <ul className="space-y-2">
                {exercise.instructions.map((instruction, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full ${config.bgColor} ${config.color} flex items-center justify-center text-xs font-medium`}>
                      {i + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Editor / Display */}
            <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 overflow-hidden`}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                <span className="text-sm font-medium text-zinc-400">
                  {viewMode === 'learn' ? 'Starter Code' : 'Your Solution'}
                </span>
                {viewMode === 'practice' && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <ClockIcon className="w-4 h-4" />
                      <span className="font-mono text-sm">{formatTime(timer)}</span>
                    </div>
                    <button
                      onClick={resetPractice}
                      className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
                    >
                      <ResetIcon className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                )}
              </div>

              {viewMode === 'learn' ? (
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-zinc-300 font-mono whitespace-pre">
                    {exercise.starterCode}
                  </code>
                </pre>
              ) : (
                <div className="p-4">
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-80 bg-zinc-950 text-zinc-300 font-mono text-sm p-4 rounded-lg border border-zinc-800 focus:border-zinc-600 focus:outline-none resize-none"
                    spellCheck={false}
                  />
                  <div className="flex justify-end mt-4 gap-3">
                    <button
                      onClick={runCode}
                      disabled={isRunning}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${config.bgColor} ${config.color} hover:opacity-80 disabled:opacity-50`}
                    >
                      {isRunning ? (
                        <>
                          <span className="animate-spin">⟳</span>
                          Running...
                        </>
                      ) : (
                        <>
                          <PlayIcon className="w-4 h-4" />
                          Run Tests
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Test Results */}
            {result && (
              <div className={`rounded-xl border p-6 ${
                result.success
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-red-500/50 bg-red-500/10'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {result.success ? (
                    <>
                      <CheckIcon className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-green-400">All Tests Passed!</span>
                    </>
                  ) : (
                    <>
                      <XIcon className="w-5 h-5 text-red-400" />
                      <span className="font-semibold text-red-400">Some Tests Failed</span>
                    </>
                  )}
                </div>
                <pre className="text-sm font-mono whitespace-pre-wrap text-zinc-300">
                  {result.message}
                </pre>
              </div>
            )}

            {/* Solution (Learn mode only) */}
            {viewMode === 'learn' && (
              <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 overflow-hidden`}>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                    <EyeIcon className="w-4 h-4" />
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </span>
                  <span className={`transform transition-transform ${showSolution ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {showSolution && (
                  <pre className="p-4 border-t border-zinc-800 overflow-x-auto">
                    <code className="text-sm text-green-400 font-mono whitespace-pre">
                      {exercise.solutionCode}
                    </code>
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hints */}
            <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6`}>
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <LightbulbIcon className={`w-5 h-5 ${config.color}`} />
                  Hints ({exercise.hints.length})
                </h2>
                <span className={`transform transition-transform ${showHints ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {showHints && (
                <div className="space-y-3">
                  {exercise.hints.map((hint, i) => (
                    <div key={i}>
                      {revealedHints.includes(i) ? (
                        <div className={`p-3 rounded-lg ${config.bgColor} text-sm ${config.color}`}>
                          {hint}
                        </div>
                      ) : (
                        <button
                          onClick={() => revealHint(i)}
                          className="w-full p-3 rounded-lg border border-dashed border-zinc-700 text-sm text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          Click to reveal Hint {i + 1}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Concepts */}
            <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6`}>
              <h2 className="text-lg font-semibold text-white mb-4">Concepts Covered</h2>
              <div className="flex flex-wrap gap-2">
                {exercise.concepts.map((concept, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm ${config.bgColor} ${config.color}`}
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Test Cases */}
            <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6`}>
              <h2 className="text-lg font-semibold text-white mb-4">Test Cases</h2>
              <div className="space-y-3">
                {exercise.testCases.map((testCase, i) => (
                  <div key={i} className="p-3 rounded-lg bg-zinc-800/50 text-sm">
                    <div className="text-zinc-400 mb-1">{testCase.description}</div>
                    <div className="font-mono text-xs">
                      <div className="text-zinc-500">Input: <span className="text-zinc-300">{JSON.stringify(testCase.input)}</span></div>
                      <div className="text-zinc-500">Expected: <span className="text-green-400">{JSON.stringify(testCase.expected)}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Stats */}
            {progress && (
              <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6`}>
                <h2 className="text-lg font-semibold text-white mb-4">Your Stats</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Status</span>
                    <span className={progress.completed ? 'text-green-400' : 'text-yellow-400'}>
                      {progress.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Attempts</span>
                    <span className="text-white">{progress.attempts}</span>
                  </div>
                  {progress.bestTime && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Best Time</span>
                      <span className={config.color}>{formatTime(progress.bestTime)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
