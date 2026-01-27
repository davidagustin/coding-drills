'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import { getVisualization } from '@/components/visualizations';
import {
  DIFFICULTY_CONFIG,
  EXERCISE_CATEGORIES,
  type Exercise,
  getExerciseById,
  getExercisesForLanguage,
} from '@/lib/exercises';
import type { LanguageId } from '@/lib/types';
import { isValidLanguage, LANGUAGE_CONFIG } from '../../config';

const ExerciseTutor = dynamic(() => import('@/components/ExerciseTutor'), { ssr: false });

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

function BookIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
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

function XIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function EyeIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ClockIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function AnimationIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.5 3.75c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125"
      />
    </svg>
  );
}

function ResetIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
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
  const [viewMode, setViewMode] = useState<ViewMode>('practice');
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
        // Auto-start practice mode by default
        setViewMode('practice');
        setTimer(0);
        setTimerRunning(true);
        setResult(null);
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

  const saveProgress = useCallback(
    (completed: boolean, time?: number) => {
      const storageKey = `coding-drills-exercises-${language}`;
      try {
        const stored = localStorage.getItem(storageKey);
        const allProgress = stored ? JSON.parse(stored) : {};

        const currentProgress = allProgress[exerciseId] || { completed: false, attempts: 0 };
        const newProgress: ExerciseProgress = {
          completed: completed || currentProgress.completed,
          attempts: currentProgress.attempts + 1,
          bestTime:
            time && (!currentProgress.bestTime || time < currentProgress.bestTime)
              ? time
              : currentProgress.bestTime,
        };

        allProgress[exerciseId] = newProgress;
        localStorage.setItem(storageKey, JSON.stringify(allProgress));
        setProgress(newProgress);
      } catch {
        // Ignore localStorage errors
      }
    },
    [language, exerciseId],
  );

  const runCode = async () => {
    if (!exercise || (language !== 'javascript' && language !== 'typescript')) {
      setResult({
        success: false,
        message:
          'Code execution is only available for JavaScript/TypeScript. For other languages, compare your solution with the provided solution.',
      });
      return;
    }

    setIsRunning(true);
    setResult(null);

    try {
      // Transpile TypeScript to JavaScript if needed
      let testCode = userCode;
      if (language === 'typescript') {
        try {
          const response = await fetch('/api/transpile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: userCode }),
          });
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'TypeScript transpilation failed');
          }
          const { code: transpiledCode } = await response.json();
          testCode = transpiledCode;
        } catch (transpileErr) {
          setResult({
            success: false,
            message: `TypeScript Error: ${transpileErr instanceof Error ? transpileErr.message : 'Transpilation failed'}`,
          });
          setIsRunning(false);
          return;
        }
      }

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
            messages.push(
              `Test ${i + 1} failed: ${testCase.description}\n  Expected: ${JSON.stringify(expected)}\n  Got: ${JSON.stringify(output)}`,
            );
          } else {
            messages.push(`Test ${i + 1} passed: ${testCase.description}`);
          }
        } catch (err) {
          allPassed = false;
          messages.push(
            `Test ${i + 1} error: ${err instanceof Error ? err.message : 'Unknown error'}`,
          );
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
          <Link href={`/${language}/exercises`} className="text-blue-400 hover:text-blue-300">
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
        {/* Navigation */}
        {(() => {
          const exercises = getExercisesForLanguage(language);
          const currentIndex = exercises.findIndex((ex) => ex.id === exerciseId);
          const prevExercise = currentIndex > 0 ? exercises[currentIndex - 1] : null;
          const nextExercise =
            currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null;

          return (
            <div className="flex items-center justify-between mb-6">
              <Link
                href={`/${language}/exercises`}
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Exercises
              </Link>

              <div className="flex items-center gap-3">
                {prevExercise && (
                  <Link
                    href={`/${language}/exercises/${prevExercise.id}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${config.bgColor} ${config.color} hover:opacity-80`}
                  >
                    <ArrowLeftIcon className="w-3.5 h-3.5" />
                    Prev
                  </Link>
                )}
                {currentIndex >= 0 && (
                  <span className="text-xs text-zinc-500">
                    {currentIndex + 1} / {exercises.length}
                  </span>
                )}
                {nextExercise && (
                  <Link
                    href={`/${language}/exercises/${nextExercise.id}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${config.bgColor} ${config.color} hover:opacity-80`}
                  >
                    Next
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          );
        })()}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`text-xs px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}>
              {categoryConfig.name}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${diffConfig.bgColor} ${diffConfig.color}`}
            >
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
            type="button"
            onClick={() => {
              setViewMode('learn');
              setTimerRunning(false);
            }}
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
            type="button"
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
            {/* Explanation (Learn mode only) */}
            {viewMode === 'learn' && exercise.explanation && (
              <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6`}>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <LightbulbIcon className={`w-5 h-5 ${config.color}`} />
                  Explanation
                </h2>
                <div className="text-zinc-300 leading-relaxed whitespace-pre-line text-sm">
                  {exercise.explanation}
                </div>
              </div>
            )}

            {/* Algorithm Visualization (Learn mode only) */}
            {viewMode === 'learn' &&
              (() => {
                const VizComponent = getVisualization(exerciseId);
                if (!VizComponent) {
                  // Debug: log when visualization is not found
                  if (process.env.NODE_ENV === 'development') {
                    console.log('No visualization found for:', exerciseId);
                  }
                  return null;
                }
                return (
                  <div
                    className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6 overflow-hidden`}
                  >
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <AnimationIcon className={`w-5 h-5 ${config.color}`} />
                      Interactive Visualization
                    </h2>
                    <Suspense
                      fallback={
                        <div className="p-8 text-center text-zinc-400">
                          Loading visualization...
                        </div>
                      }
                    >
                      <VizComponent />
                    </Suspense>
                  </div>
                );
              })()}

            {/* AI Tutor (Learn mode only) */}
            {viewMode === 'learn' && (
              <ExerciseTutor
                exercise={exercise}
                hasVisualization={getVisualization(exerciseId) !== null}
                userCode={userCode}
                languageConfig={{
                  color: config.color,
                  bgColor: config.bgColor,
                  borderColor: config.borderColor,
                }}
              />
            )}

            {/* Instructions */}
            <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6`}>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookIcon className={`w-5 h-5 ${config.color}`} />
                Instructions
              </h2>
              <ul className="space-y-2">
                {exercise.instructions.map((instruction, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full ${config.bgColor} ${config.color} flex items-center justify-center text-xs font-medium`}
                    >
                      {i + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Editor / Display */}
            <div
              className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 overflow-hidden`}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                <span className="text-sm font-medium text-zinc-400">Your Solution</span>
                {viewMode === 'practice' && (
                  <div className="flex items-center gap-2 text-zinc-400">
                    <ClockIcon className="w-4 h-4" />
                    <span className="font-mono text-sm">{formatTime(timer)}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <CodeEditor
                  code={userCode}
                  onChange={setUserCode}
                  language={language as LanguageId}
                  height={320}
                  minHeight={280}
                  lineNumbers
                  autoFocus={viewMode === 'practice'}
                  onSubmitShortcut={runCode}
                />
                <div className="flex items-center justify-between p-4 border-t border-zinc-800">
                  <p className="text-xs text-zinc-500">Press Cmd/Ctrl + Enter to run tests</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={resetPractice}
                      className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <ResetIcon className="w-4 h-4" />
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={runCode}
                      disabled={isRunning}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${config.bgColor} ${config.color} hover:opacity-80 disabled:opacity-50`}
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
              </div>
            </div>

            {/* Test Results */}
            {result && (
              <div
                className={`rounded-xl border p-6 ${
                  result.success
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-red-500/50 bg-red-500/10'
                }`}
              >
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
              <div
                className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 overflow-hidden`}
              >
                <button
                  type="button"
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                    <EyeIcon className="w-4 h-4" />
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </span>
                  <span
                    className={`transform transition-transform ${showSolution ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </button>
                {showSolution && (
                  <div className="border-t border-zinc-800">
                    <CodeEditor
                      code={exercise.solutionCode}
                      onChange={() => {}}
                      language={language as LanguageId}
                      readOnly
                      height={280}
                      minHeight={200}
                      lineNumbers
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hints */}
            <div className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6`}>
              <button
                type="button"
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
                          type="button"
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
            <div
              className={`rounded-xl border ${config.borderColor} bg-zinc-900/50 p-6 overflow-hidden`}
            >
              <h2 className="text-lg font-semibold text-white mb-4">Test Cases</h2>
              <div className="space-y-3">
                {exercise.testCases.map((testCase, i) => (
                  <div key={i} className="p-3 rounded-lg bg-zinc-800/50 text-sm overflow-hidden">
                    <div className="text-zinc-400 mb-2">{testCase.description}</div>
                    <div className="font-mono text-xs space-y-1">
                      <div className="text-zinc-500">
                        <span className="block">Input:</span>
                        <pre className="text-zinc-300 whitespace-pre-wrap break-all bg-zinc-900/50 p-2 rounded mt-1 overflow-x-auto">
                          {JSON.stringify(testCase.input, null, 2)}
                        </pre>
                      </div>
                      <div className="text-zinc-500">
                        <span className="block">Expected:</span>
                        <pre className="text-green-400 whitespace-pre-wrap break-all bg-zinc-900/50 p-2 rounded mt-1 overflow-x-auto">
                          {JSON.stringify(testCase.expected, null, 2)}
                        </pre>
                      </div>
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
