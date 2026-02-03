'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import CodeEditor from '@/components/CodeEditor';
import { QuestionCountSlider } from '@/components/QuestionCountSlider';
import { formatOutput } from '@/lib/codeValidator';
import type { FrameworkId, FrontendCategory, FrontendDrillProblem } from '@/lib/frontend-drills';
import {
  FRAMEWORK_CONFIG,
  getCategories,
  getCategoryCounts,
  getProblems,
  isValidFramework,
  validateFrontendDrillAnswer,
} from '@/lib/frontend-drills';
import type { Difficulty } from '@/lib/types';

// ============================================================================
// Types
// ============================================================================

type DrillPhase = 'setup' | 'drilling' | 'feedback' | 'results';

interface DrillConfig {
  categories: FrontendCategory[];
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
  totalScore: number;
}

interface AnswerRecord {
  problem: FrontendDrillProblem;
  userAnswer: string;
  isCorrect: boolean;
  error?: string;
  userOutput?: unknown;
  skipped: boolean;
  timeTaken: number;
  pointsEarned: number;
}

// ============================================================================
// Scoring System
// ============================================================================

/**
 * Calculate points for an answer based on correctness and speed.
 * - Base points: 100 easy, 150 medium, 200 hard
 * - Speed bonus: Up to 50 extra points for fast answers
 * - Streak bonus: Multiplier for consecutive correct answers
 */
function calculatePoints(
  isCorrect: boolean,
  timeTaken: number,
  streak: number,
  difficulty: Difficulty,
): number {
  if (!isCorrect) return 0;

  const basePoints: Record<Difficulty, number> = {
    easy: 100,
    medium: 150,
    hard: 200,
  };

  const FAST_THRESHOLD = 5000;
  const MEDIUM_THRESHOLD = 15000;
  const MAX_SPEED_BONUS = 50;

  let speedBonus = 0;
  if (timeTaken <= FAST_THRESHOLD) {
    speedBonus = MAX_SPEED_BONUS;
  } else if (timeTaken <= MEDIUM_THRESHOLD) {
    const ratio = 1 - (timeTaken - FAST_THRESHOLD) / (MEDIUM_THRESHOLD - FAST_THRESHOLD);
    speedBonus = Math.round(MAX_SPEED_BONUS * ratio);
  }

  const streakMultiplier = Math.min(1 + streak * 0.1, 2.0);
  return Math.round((basePoints[difficulty] + speedBonus) * streakMultiplier);
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

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function selectProblems(framework: FrameworkId, config: DrillConfig): FrontendDrillProblem[] {
  let problems = getProblems(framework);

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

// ============================================================================
// Components
// ============================================================================

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  count?: number;
}

function Chip({ label, selected, onClick, count }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
        selected
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
          : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            selected ? 'bg-blue-400/30 text-blue-100' : 'bg-zinc-600 text-zinc-400'
          }`}
        >
          {count}
        </span>
      )}
    </button>
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
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
            value === option.value
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
              : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
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
    <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg font-mono text-sm leading-relaxed border border-zinc-700/50 whitespace-pre-wrap break-words overflow-wrap-anywhere">
      <code className="block">{code}</code>
    </pre>
  );
}

// ============================================================================
// Setup Phase
// ============================================================================

interface SetupPhaseProps {
  framework: FrameworkId;
  onStart: (config: DrillConfig) => void;
}

function SetupPhase({ framework, onStart }: SetupPhaseProps) {
  const [selectedCategories, setSelectedCategories] = useState<FrontendCategory[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');

  const fwConfig = FRAMEWORK_CONFIG[framework];
  const categories = getCategories(framework);
  const categoryCounts = getCategoryCounts(framework);

  // Build the pool of problems respecting filters for count
  const availableCount = (() => {
    let problems = getProblems(framework);
    if (selectedCategories.length > 0) {
      problems = problems.filter((p) => selectedCategories.includes(p.category));
    }
    if (difficulty !== 'all') {
      problems = problems.filter((p) => p.difficulty === difficulty);
    }
    return problems.length;
  })();

  // Clamp questionCount when availableCount decreases
  useEffect(() => {
    const maxQuestions = Math.min(50, availableCount || 50);
    if (questionCount > maxQuestions) {
      setTimeout(() => {
        setQuestionCount(maxQuestions);
      }, 0);
    }
  }, [availableCount, questionCount]);

  const toggleCategory = (category: FrontendCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const handleStart = () => {
    onStart({
      categories: selectedCategories,
      questionCount,
      difficulty,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-6 sm:py-12 max-w-2xl">
        {/* Breadcrumbs and Exit Button */}
        <div className="flex items-center justify-between mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frontend Drills', href: '/frontend-drills' },
              { label: fwConfig.name, href: `/frontend-drills/${framework}` },
              { label: 'Drill' },
            ]}
            className="text-sm"
          />
          <Link
            href={`/frontend-drills/${framework}`}
            className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              role="img"
              aria-label="Exit"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-medium">Exit</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Drill Mode
          </h1>
          <p className="text-zinc-400 text-lg">{fwConfig.description}</p>
        </div>

        {/* Category Selection */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Categories
              {selectedCategories.length > 0 && (
                <span className="text-sm font-normal text-zinc-400 ml-2">
                  ({selectedCategories.length} selected)
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategories([...categories])}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Select All
              </button>
              <span className="text-zinc-600">|</span>
              <button
                type="button"
                onClick={() => setSelectedCategories([])}
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
          {categories.length === 0 ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm">
                No problems available for {fwConfig.name} yet. Problems are being added regularly!
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    selected={selectedCategories.includes(category)}
                    onClick={() => toggleCategory(category)}
                    count={categoryCounts[category] || 0}
                  />
                ))}
              </div>
              {selectedCategories.length === 0 && (
                <p className="text-zinc-500 text-sm mt-3">
                  No categories selected - all categories will be included
                </p>
              )}
            </>
          )}
        </div>

        {/* Question Count */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Number of Questions</h2>
            <span className="text-sm text-zinc-400">{availableCount} questions available</span>
          </div>
          <QuestionCountSlider
            value={questionCount}
            onChange={setQuestionCount}
            min={1}
            max={Math.min(50, availableCount || 50)}
            showLabel={false}
          />
        </div>

        {/* Difficulty */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-8 border border-zinc-700/50">
          <h2 className="text-xl font-semibold mb-4">Difficulty</h2>
          <DifficultyFilter value={difficulty} onChange={setDifficulty} />
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={handleStart}
          disabled={availableCount === 0}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-xl cursor-pointer
                     hover:from-blue-600 hover:to-purple-700 transition-all duration-200
                     shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
                     transform hover:scale-[1.02] active:scale-[0.98]
                     disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
        >
          Start Drilling
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Drilling Phase
// ============================================================================

interface DrillPhaseProps {
  problems: FrontendDrillProblem[];
  state: DrillState;
  framework: FrameworkId;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
  onEnd: () => void;
  questionStartTime: number;
  currentAnswer: AnswerRecord | null;
}

function DrillPhaseComponent({
  problems,
  state,
  framework,
  onAnswer,
  onSkip,
  onEnd,
  questionStartTime,
  currentAnswer,
}: DrillPhaseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);
  const currentProblem = problems[state.currentIndex];
  const fwConfig = FRAMEWORK_CONFIG[framework];

  // Total time timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - state.startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [state.startTime]);

  // Per-question stopwatch effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentIndex needed to reset timer on question change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Timer reset is intentional on question change
    setQuestionTime(0);
    const interval = setInterval(() => {
      setQuestionTime(Date.now() - questionStartTime);
    }, 100);
    return () => clearInterval(interval);
  }, [questionStartTime, state.currentIndex]);

  // Scroll to top when question changes or component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = useCallback(() => {
    if (userAnswer.trim()) {
      const answerToSubmit = userAnswer.trim();
      setUserAnswer('');
      onAnswer(answerToSubmit);
    }
  }, [userAnswer, onAnswer]);

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Breadcrumbs and Exit Button */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frontend Drills', href: '/frontend-drills' },
              { label: fwConfig.name, href: `/frontend-drills/${framework}` },
              { label: 'Drill', href: `/frontend-drills/${framework}/drill` },
              { label: `Question ${state.currentIndex + 1} of ${problems.length}` },
            ]}
            className="text-sm"
          />
          <button
            type="button"
            onClick={onEnd}
            className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              role="img"
              aria-label="Exit"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-medium">Exit</span>
          </button>
        </div>

        {/* Snackbar Notification */}
        {currentAnswer && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-lg shadow-2xl border px-6 py-4 min-w-[280px] sm:min-w-[320px] max-w-md animate-in slide-in-from-top-5 fade-in-0 duration-300 ${
              currentAnswer.skipped
                ? 'bg-zinc-800 border-zinc-700'
                : currentAnswer.isCorrect
                  ? 'bg-green-500/20 border-green-500/30 backdrop-blur-sm'
                  : 'bg-red-500/20 border-red-500/30 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`text-2xl font-bold ${
                    currentAnswer.skipped
                      ? 'text-zinc-400'
                      : currentAnswer.isCorrect
                        ? 'text-green-400'
                        : 'text-red-400'
                  }`}
                >
                  {currentAnswer.skipped ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 inline-block"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5,4 15,12 5,20" fill="currentColor" stroke="none" />
                      <line x1="19" y1="5" x2="19" y2="19" />
                    </svg>
                  ) : currentAnswer.isCorrect ? (
                    '✓'
                  ) : (
                    '✗'
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className={`text-lg font-semibold ${
                      currentAnswer.skipped
                        ? 'text-zinc-300'
                        : currentAnswer.isCorrect
                          ? 'text-green-400'
                          : 'text-red-400'
                    }`}
                  >
                    {currentAnswer.skipped
                      ? 'Skipped'
                      : currentAnswer.isCorrect
                        ? 'Correct!'
                        : 'Incorrect'}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm">
                    {currentAnswer.isCorrect && currentAnswer.pointsEarned > 0 && (
                      <span className="text-blue-400 font-medium">
                        +{currentAnswer.pointsEarned} pts
                      </span>
                    )}
                    <span className="text-zinc-500">
                      {(currentAnswer.timeTaken / 1000).toFixed(1)}s
                    </span>
                  </div>
                  {!currentAnswer.skipped && !currentAnswer.isCorrect && currentAnswer.error && (
                    <p className="text-xs text-red-400 mt-1 line-clamp-2">{currentAnswer.error}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {}}
                className="text-zinc-400 hover:text-zinc-300 transition-colors opacity-50"
                aria-label="Dismiss"
                disabled
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Close"
                  role="img"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Header Stats */}
        <div className="flex items-center justify-between bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
          <div className="flex items-center gap-3 sm:gap-6">
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
              <div className="text-xs text-zinc-500">Total Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {state.totalScore.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-500">Score</div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 font-mono">
                {(questionTime / 1000).toFixed(1)}s
              </div>
              <div className="text-xs text-zinc-500">Question</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{state.streak}</div>
              <div className="text-xs text-zinc-500">Streak</div>
            </div>
          </div>
        </div>

        {/* Problem Card */}
        <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 overflow-hidden mt-6">
          {/* Problem Header */}
          <div className="border-b border-zinc-700/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-zinc-100">{currentProblem.title}</h2>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded border ${fwConfig.bgColor} ${fwConfig.color} ${fwConfig.borderColor}`}
                >
                  {fwConfig.shortName}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {currentProblem.category}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded border ${difficultyColors[currentProblem.difficulty]}`}
                >
                  {currentProblem.difficulty}
                </span>
              </div>
            </div>
            <p className="text-zinc-400">{currentProblem.text}</p>
          </div>

          {/* Setup Code */}
          <div className="p-4 border-b border-zinc-700/50">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Setup Code</span>
            <CodeDisplay code={currentProblem.setupCode} />
          </div>

          {/* Expected Output */}
          <div className="p-4 border-b border-zinc-700/50">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Expected Output</span>
            <div className="bg-zinc-800 p-3 rounded-lg font-mono text-sm text-green-400 border border-zinc-700">
              {formatOutput(currentProblem.expected)}
            </div>
          </div>

          {/* Answer Input */}
          <div className="p-4">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Your Answer</span>
            <CodeEditor
              key={`${state.currentIndex}-${currentProblem.id}`}
              code={userAnswer}
              onChange={setUserAnswer}
              language="javascript"
              monacoLanguageOverride={currentProblem.editorLanguage}
              height={120}
              minHeight={120}
              lineNumbers={true}
              autoFocus
              onSubmitShortcut={handleSubmit}
              className="border-zinc-700"
              setupCode={currentProblem.setupCode}
            />
            <p className="text-xs text-zinc-500 mt-2">Press Cmd/Ctrl + Enter to submit</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-4 bg-zinc-800/50 border-t border-zinc-700/50">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="py-3 px-6 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-medium rounded-lg transition-colors cursor-pointer"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={onEnd}
              className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
              title="End drill and view results"
            >
              End
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Feedback Phase
// ============================================================================

interface FeedbackPhaseProps {
  answerRecord: AnswerRecord;
  onNext: () => void;
}

function FeedbackPhase({ answerRecord, onNext }: FeedbackPhaseProps) {
  const { problem, userAnswer, isCorrect, error, userOutput, skipped } = answerRecord;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Result Banner */}
        <div
          className={`rounded-2xl p-6 text-center border ${
            skipped
              ? 'bg-zinc-800 border-zinc-700'
              : isCorrect
                ? 'bg-green-500/20 border-green-500/30'
                : 'bg-red-500/20 border-red-500/30'
          }`}
        >
          <div
            className={`text-4xl mb-2 font-bold ${
              skipped ? 'text-zinc-400' : isCorrect ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {skipped ? 'Skipped' : isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
          {isCorrect && answerRecord.pointsEarned > 0 && (
            <div className="text-xl text-blue-400 font-semibold animate-pulse">
              +{answerRecord.pointsEarned} points
            </div>
          )}
          {!skipped && !isCorrect && error && <p className="text-sm text-red-400">{error}</p>}
          <p className="text-sm text-zinc-500 mt-2">
            Answered in {(answerRecord.timeTaken / 1000).toFixed(1)}s
          </p>
        </div>

        {/* Comparison */}
        <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 overflow-hidden mt-6">
          {/* Your Answer */}
          <div className="p-4 border-b border-zinc-700/50">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Your Answer</span>
            <div className="bg-zinc-800 text-zinc-100 p-4 rounded-lg font-mono text-sm border border-zinc-700">
              {skipped ? <span className="text-zinc-500">(skipped)</span> : userAnswer}
            </div>
          </div>

          {/* Your Output */}
          {!skipped && userOutput !== undefined && (
            <div className="p-4 border-b border-zinc-700/50">
              <span className="block text-sm font-medium text-zinc-300 mb-2">Your Output</span>
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
          <div className="p-4 border-b border-zinc-700/50">
            <span className="block text-sm font-medium text-zinc-300 mb-2">Expected Output</span>
            <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg font-mono text-sm text-green-400">
              {formatOutput(problem.expected)}
            </div>
          </div>

          {/* Sample Solution (shown when incorrect or skipped) */}
          {(!isCorrect || skipped) && (
            <div className="p-4">
              <span className="block text-sm font-medium text-zinc-300 mb-2">Sample Solution</span>
              <CodeDisplay code={problem.sample} />
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-xl
                     hover:from-blue-600 hover:to-purple-700 transition-all duration-200
                     shadow-lg shadow-purple-500/25 cursor-pointer mt-6"
        >
          Next Question
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Results Phase
// ============================================================================

interface ResultsPhaseProps {
  state: DrillState;
  framework: FrameworkId;
  onTryAgain: () => void;
  onTryAgainSameQuestions: () => void;
  onBackToMenu: () => void;
}

function ResultsPhase({
  state,
  framework,
  onTryAgain,
  onTryAgainSameQuestions,
  onBackToMenu,
}: ResultsPhaseProps) {
  const [showMissed, setShowMissed] = useState(false);
  const [capturedTime] = useState(() => Date.now());
  const fwConfig = FRAMEWORK_CONFIG[framework];

  const totalQuestions = state.answers.length;
  const correctAnswers = state.answers.filter((a) => a.isCorrect && !a.skipped).length;
  const skippedAnswers = state.answers.filter((a) => a.skipped).length;
  const incorrectAnswers = totalQuestions - correctAnswers - skippedAnswers;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const totalTime = (state.endTime || capturedTime) - state.startTime;
  const missedQuestions = state.answers.filter((a) => !a.isCorrect || a.skipped);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-6 sm:py-12 max-w-2xl">
        {/* Breadcrumbs and Exit Button */}
        <div className="flex items-center justify-between mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frontend Drills', href: '/frontend-drills' },
              { label: fwConfig.name, href: `/frontend-drills/${framework}` },
              { label: 'Drill', href: `/frontend-drills/${framework}/drill` },
              { label: 'Results' },
            ]}
            className="text-sm"
          />
          <Link
            href={`/frontend-drills/${framework}`}
            className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              role="img"
              aria-label="Exit"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-medium">Exit</span>
          </Link>
        </div>

        {/* Results Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-zinc-100 mb-2">Drill Complete!</h1>
          <p className="text-zinc-400">
            <span className={fwConfig.color}>{fwConfig.name}</span> — Here&apos;s how you did
          </p>
        </div>

        {/* Total Score Highlight */}
        <div className="bg-zinc-800/50 rounded-2xl p-8 text-center border border-zinc-700/50 mb-6">
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {state.totalScore.toLocaleString()}
          </div>
          <div className="text-sm text-zinc-400 mt-1 uppercase tracking-wider">Total Points</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-800/50 rounded-xl p-6 text-center border border-zinc-700/50">
            <div className="text-3xl font-bold text-green-500">
              {correctAnswers} / {totalQuestions}
            </div>
            <div className="text-sm text-zinc-500 mt-1">Correct</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-6 text-center border border-zinc-700/50">
            <div className="text-3xl font-bold text-blue-500">{accuracy}%</div>
            <div className="text-sm text-zinc-500 mt-1">Accuracy</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-6 text-center border border-zinc-700/50">
            <div className="text-3xl font-bold text-zinc-100 font-mono">
              {formatTime(totalTime)}
            </div>
            <div className="text-sm text-zinc-500 mt-1">Time</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-6 text-center border border-zinc-700/50">
            <div className="text-3xl font-bold text-orange-500">{state.maxStreak}</div>
            <div className="text-sm text-zinc-500 mt-1">Max Streak</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700/50 mb-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4">Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-zinc-300">Correct</span>
              </span>
              <span className="font-medium text-zinc-100">{correctAnswers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-zinc-300">Incorrect</span>
              </span>
              <span className="font-medium text-zinc-100">{incorrectAnswers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-500" />
                <span className="text-zinc-300">Skipped</span>
              </span>
              <span className="font-medium text-zinc-100">{skippedAnswers}</span>
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
          <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 overflow-hidden mb-6">
            <button
              type="button"
              onClick={() => setShowMissed(!showMissed)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-700/50 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-zinc-100">
                Review Missed Questions ({missedQuestions.length})
              </span>
              <span className="text-zinc-500">{showMissed ? '-' : '+'}</span>
            </button>
            {showMissed && (
              <div className="border-t border-zinc-700/50">
                {missedQuestions.map((record, index) => (
                  <div key={index} className="p-4 border-b last:border-b-0 border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-zinc-100">{record.problem.title}</h4>
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
                    <p className="text-sm text-zinc-400 mb-3">{record.problem.text}</p>
                    <div className="text-sm">
                      <span className="text-zinc-500 block mb-1">Solution:</span>
                      <code className="block bg-zinc-800 px-2 py-1 rounded text-blue-400 border border-zinc-700 whitespace-pre-wrap break-words">
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
        <div className="flex flex-col gap-4">
          <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">Retry Options</h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onTryAgainSameQuestions}
                className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer flex flex-col items-center gap-1"
              >
                <span>Try Again</span>
                <span className="text-xs font-normal opacity-90">Same Questions</span>
              </button>
              <button
                type="button"
                onClick={onTryAgain}
                className="flex-1 py-4 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors cursor-pointer flex flex-col items-center gap-1"
              >
                <span>New Drill</span>
                <span className="text-xs font-normal opacity-90">New Questions</span>
              </button>
            </div>
            <div className="mt-3 text-xs text-zinc-500 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Practice the exact same questions again</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Generate new questions with the same settings</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onBackToMenu}
            className="w-full py-4 px-6 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 font-semibold rounded-xl transition-colors border border-zinc-700 cursor-pointer"
          >
            Back to {fwConfig.name}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function FrontendDrillPage() {
  const params = useParams();
  const router = useRouter();
  const frameworkParam = params.framework as string;

  // Validate framework parameter
  const framework: FrameworkId = isValidFramework(frameworkParam) ? frameworkParam : 'native-js';

  const [phase, setPhase] = useState<DrillPhase>('setup');
  const [config, setConfig] = useState<DrillConfig | null>(null);
  const [problems, setProblems] = useState<FrontendDrillProblem[]>([]);
  const [drillState, setDrillState] = useState<DrillState>({
    currentIndex: 0,
    answers: [],
    streak: 0,
    maxStreak: 0,
    startTime: 0,
    totalScore: 0,
  });
  const [currentAnswer, setCurrentAnswer] = useState<AnswerRecord | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(0);

  const handleStart = useCallback(
    (newConfig: DrillConfig) => {
      const selectedProblems = selectProblems(framework, newConfig);

      if (selectedProblems.length === 0) {
        alert('No problems available with the selected filters. Please adjust your selection.');
        return;
      }

      setConfig(newConfig);
      setProblems(selectedProblems);
      const now = Date.now();
      setDrillState({
        currentIndex: 0,
        answers: [],
        streak: 0,
        maxStreak: 0,
        startTime: now,
        totalScore: 0,
      });
      setQuestionStartTime(now);
      setPhase('drilling');
    },
    [framework],
  );

  const handleNext = useCallback(() => {
    const nextIndex = drillState.currentIndex + 1;

    setCurrentAnswer(null);

    if (nextIndex >= problems.length) {
      setDrillState((prev) => ({
        ...prev,
        endTime: Date.now(),
      }));
      setPhase('results');
    } else {
      setDrillState((prev) => ({
        ...prev,
        currentIndex: nextIndex,
      }));
      setQuestionStartTime(Date.now());
      setPhase('drilling');
    }
  }, [drillState.currentIndex, problems.length]);

  const handleAnswer = useCallback(
    (userAnswer: string) => {
      const currentProblem = problems[drillState.currentIndex];
      const result = validateFrontendDrillAnswer(currentProblem, userAnswer);
      const timeTaken = Date.now() - questionStartTime;

      const pointsEarned = calculatePoints(
        result.success,
        timeTaken,
        drillState.streak,
        currentProblem.difficulty,
      );

      const answerRecord: AnswerRecord = {
        problem: currentProblem,
        userAnswer,
        isCorrect: result.success,
        error: result.success ? undefined : result.error,
        userOutput: 'output' in result ? result.output : undefined,
        skipped: false,
        timeTaken,
        pointsEarned,
      };

      setCurrentAnswer(answerRecord);

      setDrillState((prev) => {
        const newStreak = result.success ? prev.streak + 1 : 0;
        return {
          ...prev,
          answers: [...prev.answers, answerRecord],
          streak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak),
          totalScore: prev.totalScore + pointsEarned,
        };
      });

      // Instant advance to next question
      handleNext();
    },
    [problems, drillState.currentIndex, drillState.streak, questionStartTime, handleNext],
  );

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
      pointsEarned: 0,
    };

    setCurrentAnswer(answerRecord);

    setDrillState((prev) => ({
      ...prev,
      answers: [...prev.answers, answerRecord],
      streak: 0,
    }));

    // Instant advance to next question
    handleNext();
  }, [problems, drillState.currentIndex, questionStartTime, handleNext]);

  const handleEnd = useCallback(() => {
    if (drillState.currentIndex < problems.length) {
      const currentProblem = problems[drillState.currentIndex];
      const timeTaken = Date.now() - questionStartTime;

      const answerRecord: AnswerRecord = {
        problem: currentProblem,
        userAnswer: '',
        isCorrect: false,
        error: 'Ended early',
        skipped: true,
        timeTaken,
        pointsEarned: 0,
      };

      setDrillState((prev) => ({
        ...prev,
        answers: [...prev.answers, answerRecord],
        endTime: Date.now(),
      }));
    } else {
      setDrillState((prev) => ({
        ...prev,
        endTime: Date.now(),
      }));
    }

    setPhase('results');
  }, [problems, drillState.currentIndex, questionStartTime]);

  const handleTryAgainSameQuestions = useCallback(() => {
    if (problems.length > 0) {
      const now = Date.now();
      setDrillState({
        currentIndex: 0,
        answers: [],
        streak: 0,
        maxStreak: 0,
        startTime: now,
        totalScore: 0,
      });
      setQuestionStartTime(now);
      setCurrentAnswer(null);
      setPhase('drilling');
    }
  }, [problems]);

  const handleTryAgain = useCallback(() => {
    if (config) {
      handleStart(config);
    }
  }, [config, handleStart]);

  const handleBackToMenu = useCallback(() => {
    router.push(`/frontend-drills/${framework}`);
  }, [router, framework]);

  // Scroll to top when drill phase starts
  useEffect(() => {
    if (phase === 'drilling') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [phase]);

  return (
    <>
      {phase === 'setup' && <SetupPhase framework={framework} onStart={handleStart} />}

      {phase === 'drilling' && problems.length > 0 && (
        <DrillPhaseComponent
          problems={problems}
          state={drillState}
          framework={framework}
          onAnswer={handleAnswer}
          onSkip={handleSkip}
          onEnd={handleEnd}
          questionStartTime={questionStartTime}
          currentAnswer={currentAnswer}
        />
      )}

      {phase === 'feedback' && currentAnswer && (
        <FeedbackPhase answerRecord={currentAnswer} onNext={handleNext} />
      )}

      {phase === 'results' && (
        <ResultsPhase
          state={drillState}
          framework={framework}
          onTryAgain={handleTryAgain}
          onTryAgainSameQuestions={handleTryAgainSameQuestions}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </>
  );
}
