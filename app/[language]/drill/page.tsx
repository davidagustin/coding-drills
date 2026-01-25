'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Problem, LanguageId, Difficulty } from '@/lib/types';
import { validateProblemAnswer, formatOutput } from '@/lib/codeValidator';
import { javascriptProblems } from '@/lib/problems/javascript';
import { typescriptProblems } from '@/lib/problems/typescript';
import { pythonProblems } from '@/lib/problems/python';
import { javaProblems } from '@/lib/problems/java';
import { cppProblems } from '@/lib/problems/cpp';
import { csharpProblems } from '@/lib/problems/csharp';
import { rubyProblems } from '@/lib/problems/ruby';
import { goProblems } from '@/lib/problems/go';
import { cProblems } from '@/lib/problems/c';

// ============================================================================
// Types
// ============================================================================

type DrillPhase = 'setup' | 'drilling' | 'feedback' | 'results';

interface DrillConfig {
  categories: string[];
  questionCount: number;
  difficulty: Difficulty | 'all';
}

interface DrillState {
  currentIndex: number;
  answers: AnswerRecord[];
  streak: number;
  maxStreak: number;
  startTime: number;
  endTime?: number;
}

interface AnswerRecord {
  problem: Problem;
  userAnswer: string;
  isCorrect: boolean;
  error?: string;
  userOutput?: unknown;
  skipped: boolean;
  timeTaken: number;
}

// ============================================================================
// Problem Data by Language
// ============================================================================

const PROBLEMS_BY_LANGUAGE: Record<LanguageId, Problem[]> = {
  javascript: javascriptProblems,
  typescript: typescriptProblems,
  python: pythonProblems,
  java: javaProblems,
  cpp: cppProblems,
  csharp: csharpProblems,
  ruby: rubyProblems,
  go: goProblems,
  c: cProblems,
};

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

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getCategories(language: LanguageId): string[] {
  const problems = PROBLEMS_BY_LANGUAGE[language] || [];
  const categories = new Set(problems.map((p) => p.category));
  return Array.from(categories);
}

function selectProblems(
  language: LanguageId,
  config: DrillConfig
): Problem[] {
  let problems = PROBLEMS_BY_LANGUAGE[language] || [];

  // Filter by categories
  if (config.categories.length > 0) {
    problems = problems.filter((p) => config.categories.includes(p.category));
  }

  // Filter by difficulty
  if (config.difficulty !== 'all') {
    problems = problems.filter((p) => p.difficulty === config.difficulty);
  }

  // Shuffle and select
  const shuffled = shuffleArray(problems);
  return shuffled.slice(0, config.questionCount);
}

function isValidLanguage(lang: string): lang is LanguageId {
  return ['javascript', 'typescript', 'python', 'java', 'cpp', 'csharp', 'go', 'ruby', 'c'].includes(lang);
}

// ============================================================================
// Components
// ============================================================================

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        selected
          ? 'bg-blue-600 text-white'
          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
      }`}
    >
      {label}
    </button>
  );
}

interface CountSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

function CountSelector({ value, onChange }: CountSelectorProps) {
  const presets = [5, 10, 15, 20];
  const [customValue, setCustomValue] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((preset) => (
        <button
          key={preset}
          onClick={() => {
            onChange(preset);
            setShowCustom(false);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            value === preset && !showCustom
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          {preset}
        </button>
      ))}
      <button
        onClick={() => setShowCustom(true)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          showCustom
            ? 'bg-blue-600 text-white'
            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
        }`}
      >
        Custom
      </button>
      {showCustom && (
        <input
          type="number"
          min="1"
          max="50"
          value={customValue}
          onChange={(e) => {
            setCustomValue(e.target.value);
            const num = parseInt(e.target.value, 10);
            if (num >= 1 && num <= 50) {
              onChange(num);
            }
          }}
          placeholder="1-50"
          className="w-20 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-sm text-white"
        />
      )}
    </div>
  );
}

interface DifficultyFilterProps {
  value: Difficulty | 'all';
  onChange: (value: Difficulty | 'all') => void;
}

function DifficultyFilter({ value, onChange }: DifficultyFilterProps) {
  const options: { value: Difficulty | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'All', color: 'bg-zinc-500' },
    { value: 'easy', label: 'Easy', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'bg-red-500' },
  ];

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            value === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${option.color}`} />
          {option.label}
        </button>
      ))}
    </div>
  );
}

function CodeDisplay({ code }: { code: string }) {
  return (
    <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed border border-zinc-800">
      <code>{code}</code>
    </pre>
  );
}

interface SetupPhaseProps {
  language: LanguageId;
  onStart: (config: DrillConfig) => void;
}

function SetupPhase({ language, onStart }: SetupPhaseProps) {
  const categories = getCategories(language);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleStart = () => {
    onStart({
      categories: selectedCategories,
      questionCount,
      difficulty,
    });
  };

  const availableCount = selectProblems(language, {
    categories: selectedCategories,
    questionCount: 1000,
    difficulty,
  }).length;

  const languageName = language.charAt(0).toUpperCase() + language.slice(1);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">
          {languageName} Drill Mode
        </h1>
        <p className="text-zinc-400">
          Configure your practice session
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 space-y-6">
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Categories {selectedCategories.length > 0 && `(${selectedCategories.length} selected)`}
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                selected={selectedCategories.includes(category)}
                onClick={() => toggleCategory(category)}
              />
            ))}
          </div>
          {selectedCategories.length === 0 && (
            <p className="text-xs text-zinc-500 mt-2">
              No categories selected - all categories will be included
            </p>
          )}
        </div>

        {/* Question Count */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Number of Questions
          </label>
          <CountSelector value={questionCount} onChange={setQuestionCount} />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Difficulty
          </label>
          <DifficultyFilter value={difficulty} onChange={setDifficulty} />
        </div>

        {/* Available Questions Info */}
        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400">
            <span className="font-medium text-zinc-100">
              {availableCount}
            </span>{' '}
            questions available with current filters
          </p>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        disabled={availableCount === 0}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold rounded-xl transition-colors text-lg"
      >
        Start Drilling
      </button>
    </div>
  );
}

interface DrillPhaseProps {
  problems: Problem[];
  state: DrillState;
  language: LanguageId;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
}

function DrillPhaseComponent({ problems, state, onAnswer, onSkip }: DrillPhaseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentProblem = problems[state.currentIndex];

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - state.startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [state.startTime]);

  // Auto-focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, [state.currentIndex]);

  const handleSubmit = () => {
    if (userAnswer.trim()) {
      onAnswer(userAnswer.trim());
      setUserAnswer('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-800">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100">
              {state.currentIndex + 1} / {problems.length}
            </div>
            <div className="text-xs text-zinc-500">Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 font-mono">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-xs text-zinc-500">Time</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500">
            {state.streak}
          </div>
          <div className="text-xs text-zinc-500">Streak</div>
        </div>
      </div>

      {/* Problem Card */}
      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        {/* Problem Header */}
        <div className="border-b border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-zinc-100">
              {currentProblem.title}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                {currentProblem.category}
              </span>
              <span className={`text-xs px-2 py-1 rounded border ${difficultyColors[currentProblem.difficulty]}`}>
                {currentProblem.difficulty}
              </span>
            </div>
          </div>
          <p className="text-zinc-400">
            {currentProblem.text}
          </p>
        </div>

        {/* Setup Code */}
        <div className="p-4 border-b border-zinc-800">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Setup Code
          </label>
          <CodeDisplay code={currentProblem.setupCode} />
        </div>

        {/* Expected Output */}
        <div className="p-4 border-b border-zinc-800">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Expected Output
          </label>
          <div className="bg-zinc-800 p-3 rounded-lg font-mono text-sm text-green-400 border border-zinc-700">
            {formatOutput(currentProblem.expected)}
          </div>
        </div>

        {/* Answer Input */}
        <div className="p-4">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Your Answer
          </label>
          <textarea
            ref={inputRef}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your expression here..."
            className="w-full h-24 px-4 py-3 font-mono text-sm bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-zinc-100 placeholder-zinc-500"
          />
          <p className="text-xs text-zinc-500 mt-2">
            Press Cmd/Ctrl + Enter to submit
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 bg-zinc-800/50 border-t border-zinc-800">
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-lg transition-colors"
          >
            Submit
          </button>
          <button
            onClick={onSkip}
            className="py-3 px-6 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-medium rounded-lg transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

interface FeedbackPhaseProps {
  answerRecord: AnswerRecord;
  onNext: () => void;
}

function FeedbackPhase({ answerRecord, onNext }: FeedbackPhaseProps) {
  const { problem, userAnswer, isCorrect, error, userOutput, skipped } = answerRecord;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Result Banner */}
      <div
        className={`rounded-xl p-6 text-center border ${
          skipped
            ? 'bg-zinc-800 border-zinc-700'
            : isCorrect
            ? 'bg-green-500/20 border-green-500/30'
            : 'bg-red-500/20 border-red-500/30'
        }`}
      >
        <div
          className={`text-4xl mb-2 font-bold ${
            skipped
              ? 'text-zinc-400'
              : isCorrect
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >
          {skipped ? 'Skipped' : isCorrect ? 'Correct!' : 'Incorrect'}
        </div>
        {!skipped && !isCorrect && error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
      </div>

      {/* Comparison */}
      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        {/* Your Answer */}
        <div className="p-4 border-b border-zinc-800">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Your Answer
          </label>
          <div className="bg-zinc-800 text-zinc-100 p-4 rounded-lg font-mono text-sm border border-zinc-700">
            {skipped ? <span className="text-zinc-500">(skipped)</span> : userAnswer}
          </div>
        </div>

        {/* Your Output */}
        {!skipped && userOutput !== undefined && (
          <div className="p-4 border-b border-zinc-800">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Your Output
            </label>
            <div
              className={`p-3 rounded-lg font-mono text-sm border ${
                isCorrect
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {formatOutput(userOutput)}
            </div>
          </div>
        )}

        {/* Expected Output */}
        <div className="p-4 border-b border-zinc-800">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Expected Output
          </label>
          <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg font-mono text-sm text-green-400">
            {formatOutput(problem.expected)}
          </div>
        </div>

        {/* Sample Solution (shown when incorrect or skipped) */}
        {(!isCorrect || skipped) && (
          <div className="p-4">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Sample Solution
            </label>
            <CodeDisplay code={problem.sample} />
          </div>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-lg"
      >
        Next Question
      </button>
    </div>
  );
}

interface ResultsPhaseProps {
  state: DrillState;
  onTryAgain: () => void;
  onBackToMenu: () => void;
}

function ResultsPhase({ state, onTryAgain, onBackToMenu }: ResultsPhaseProps) {
  const [showMissed, setShowMissed] = useState(false);
  // Use lazy initializer to capture time only once (on first render)
  const [capturedTime] = useState(() => Date.now());

  const totalQuestions = state.answers.length;
  const correctAnswers = state.answers.filter((a) => a.isCorrect && !a.skipped).length;
  const skippedAnswers = state.answers.filter((a) => a.skipped).length;
  const incorrectAnswers = totalQuestions - correctAnswers - skippedAnswers;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const totalTime = (state.endTime || capturedTime) - state.startTime;
  const missedQuestions = state.answers.filter((a) => !a.isCorrect || a.skipped);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Results Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">
          Drill Complete!
        </h1>
        <p className="text-zinc-400">
          Here is how you did
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-blue-500">
            {correctAnswers} / {totalQuestions}
          </div>
          <div className="text-sm text-zinc-500 mt-1">Score</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
          <div className="text-sm text-zinc-500 mt-1">Accuracy</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-zinc-100 font-mono">
            {formatTime(totalTime)}
          </div>
          <div className="text-sm text-zinc-500 mt-1">Time</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-orange-500">{state.maxStreak}</div>
          <div className="text-sm text-zinc-500 mt-1">Max Streak</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">
          Breakdown
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-zinc-300">Correct</span>
            </span>
            <span className="font-medium text-zinc-100">
              {correctAnswers}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-zinc-300">Incorrect</span>
            </span>
            <span className="font-medium text-zinc-100">
              {incorrectAnswers}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-500" />
              <span className="text-zinc-300">Skipped</span>
            </span>
            <span className="font-medium text-zinc-100">
              {skippedAnswers}
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4 h-3 rounded-full overflow-hidden bg-zinc-800 flex">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
          />
          <div
            className="bg-red-500 h-full"
            style={{ width: `${(incorrectAnswers / totalQuestions) * 100}%` }}
          />
          <div
            className="bg-zinc-500 h-full"
            style={{ width: `${(skippedAnswers / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Missed Questions Review */}
      {missedQuestions.length > 0 && (
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
          <button
            onClick={() => setShowMissed(!showMissed)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors"
          >
            <span className="font-semibold text-zinc-100">
              Review Missed Questions ({missedQuestions.length})
            </span>
            <span className="text-zinc-500">{showMissed ? '-' : '+'}</span>
          </button>
          {showMissed && (
            <div className="border-t border-zinc-800">
              {missedQuestions.map((record, index) => (
                <div
                  key={index}
                  className="p-4 border-b last:border-b-0 border-zinc-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-zinc-100">
                      {record.problem.title}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded border ${
                        record.skipped
                          ? 'bg-zinc-800 border-zinc-700 text-zinc-400'
                          : 'bg-red-500/20 border-red-500/30 text-red-400'
                      }`}
                    >
                      {record.skipped ? 'Skipped' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">
                    {record.problem.text}
                  </p>
                  <div className="text-sm">
                    <span className="text-zinc-500">Solution: </span>
                    <code className="bg-zinc-800 px-2 py-1 rounded text-blue-400 border border-zinc-700">
                      {record.problem.sample}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onTryAgain}
          className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Try Again
        </button>
        <button
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
// Main Page Component
// ============================================================================

export default function DrillPage() {
  const params = useParams();
  const router = useRouter();
  const languageParam = params.language as string;

  // Validate language parameter
  const language: LanguageId = isValidLanguage(languageParam) ? languageParam : 'javascript';

  const [phase, setPhase] = useState<DrillPhase>('setup');
  const [config, setConfig] = useState<DrillConfig | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [drillState, setDrillState] = useState<DrillState>({
    currentIndex: 0,
    answers: [],
    streak: 0,
    maxStreak: 0,
    startTime: 0,
  });
  const [currentAnswer, setCurrentAnswer] = useState<AnswerRecord | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(0);

  const handleStart = useCallback((newConfig: DrillConfig) => {
    const selectedProblems = selectProblems(language, newConfig);

    if (selectedProblems.length === 0) {
      alert('No problems available with the selected filters. Please adjust your selection.');
      return;
    }

    setConfig(newConfig);
    setProblems(selectedProblems);
    setDrillState({
      currentIndex: 0,
      answers: [],
      streak: 0,
      maxStreak: 0,
      startTime: Date.now(),
    });
    setQuestionStartTime(Date.now());
    setPhase('drilling');
  }, [language]);

  const handleAnswer = useCallback((userAnswer: string) => {
    const currentProblem = problems[drillState.currentIndex];
    const result = validateProblemAnswer(currentProblem, userAnswer, language);
    const timeTaken = Date.now() - questionStartTime;

    const answerRecord: AnswerRecord = {
      problem: currentProblem,
      userAnswer,
      isCorrect: result.success,
      error: result.success ? undefined : result.error,
      userOutput: 'output' in result ? result.output : undefined,
      skipped: false,
      timeTaken,
    };

    setCurrentAnswer(answerRecord);

    // Update state with answer
    setDrillState((prev) => {
      const newStreak = result.success ? prev.streak + 1 : 0;
      return {
        ...prev,
        answers: [...prev.answers, answerRecord],
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
      };
    });

    setPhase('feedback');
  }, [problems, drillState.currentIndex, questionStartTime, language]);

  const handleSkip = useCallback(() => {
    const currentProblem = problems[drillState.currentIndex];
    const timeTaken = Date.now() - questionStartTime;

    const answerRecord: AnswerRecord = {
      problem: currentProblem,
      userAnswer: '',
      isCorrect: false,
      error: 'Skipped',
      skipped: true,
      timeTaken,
    };

    setCurrentAnswer(answerRecord);

    setDrillState((prev) => ({
      ...prev,
      answers: [...prev.answers, answerRecord],
      streak: 0,
    }));

    setPhase('feedback');
  }, [problems, drillState.currentIndex, questionStartTime]);

  const handleNext = useCallback(() => {
    const nextIndex = drillState.currentIndex + 1;

    if (nextIndex >= problems.length) {
      // Drill complete
      setDrillState((prev) => ({
        ...prev,
        endTime: Date.now(),
      }));
      setPhase('results');
    } else {
      // Move to next question
      setDrillState((prev) => ({
        ...prev,
        currentIndex: nextIndex,
      }));
      setQuestionStartTime(Date.now());
      setPhase('drilling');
    }

    setCurrentAnswer(null);
  }, [drillState.currentIndex, problems.length]);

  const handleTryAgain = useCallback(() => {
    if (config) {
      handleStart(config);
    }
  }, [config, handleStart]);

  const handleBackToMenu = useCallback(() => {
    router.push(`/${language}`);
  }, [router, language]);

  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      {phase === 'setup' && (
        <SetupPhase language={language} onStart={handleStart} />
      )}

      {phase === 'drilling' && problems.length > 0 && (
        <DrillPhaseComponent
          problems={problems}
          state={drillState}
          language={language}
          onAnswer={handleAnswer}
          onSkip={handleSkip}
        />
      )}

      {phase === 'feedback' && currentAnswer && (
        <FeedbackPhase answerRecord={currentAnswer} onNext={handleNext} />
      )}

      {phase === 'results' && (
        <ResultsPhase
          state={drillState}
          onTryAgain={handleTryAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}
