'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { QuestionCountSlider } from '@/components/QuestionCountSlider';
import {
  addToFrontendLeaderboard,
  calculateFrontendQuizResults,
  calculateFrontendQuizScore,
  FRAMEWORK_CONFIG,
  type FrameworkId,
  type FrontendCategory,
  type FrontendLeaderboardEntry,
  type FrontendQuizAnswer,
  type FrontendQuizConfig,
  type FrontendQuizQuestion,
  type FrontendQuizResult,
  generateFrontendQuiz,
  getFrontendLeaderboard,
  getFrontendLeaderboardPosition,
  getQuizQuestions,
  isValidFramework,
} from '@/lib/frontend-drills';

// ============================================================================
// Types
// ============================================================================

type Phase = 'setup' | 'playing' | 'results';

interface QuizState {
  phase: Phase;
  config: FrontendQuizConfig;
  questions: FrontendQuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  answers: FrontendQuizAnswer[];
  startTime: number | null;
  endTime: number | null;
  selectedOption: string | null;
  showingAnswer: boolean;
  questionStartTime: number | null;
}

// ============================================================================
// Sound Effects Hook
// ============================================================================

function useSoundEffects(enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      audioContextRef.current = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      if (!enabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    },
    [enabled, getAudioContext],
  );

  const playCorrect = useCallback(() => {
    playTone(523.25, 0.1); // C5
    setTimeout(() => playTone(659.25, 0.1), 100); // E5
    setTimeout(() => playTone(783.99, 0.15), 200); // G5
  }, [playTone]);

  const playIncorrect = useCallback(() => {
    playTone(311.13, 0.15, 'square'); // Eb4
    setTimeout(() => playTone(277.18, 0.2, 'square'), 150); // Db4
  }, [playTone]);

  const playTick = useCallback(() => {
    playTone(440, 0.05, 'square');
  }, [playTone]);

  const playComplete = useCallback(() => {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.2), i * 150);
    });
  }, [playTone]);

  return { playCorrect, playIncorrect, playTick, playComplete };
}

// ============================================================================
// Helper: extract unique categories from quiz questions with counts
// ============================================================================

function getCategoriesWithCounts(framework: FrameworkId): {
  categories: FrontendCategory[];
  counts: Record<string, number>;
} {
  const questions = getQuizQuestions(framework);
  const counts: Record<string, number> = {};
  for (const q of questions) {
    counts[q.category] = (counts[q.category] || 0) + 1;
  }
  const categories = Object.keys(counts) as FrontendCategory[];
  return { categories, counts };
}

// ============================================================================
// Setup Phase Component
// ============================================================================

interface SetupPhaseProps {
  config: FrontendQuizConfig;
  onConfigChange: (config: FrontendQuizConfig) => void;
  onStart: () => void;
  framework: FrameworkId;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

function SetupPhase({
  config,
  onConfigChange,
  onStart,
  framework,
  soundEnabled,
  onSoundToggle,
}: SetupPhaseProps) {
  const frameworkConfig = FRAMEWORK_CONFIG[framework];
  const { categories: availableCategories, counts: categoryCounts } =
    getCategoriesWithCounts(framework);

  const timeOptions = [10, 15, 20, 30, 0] as const; // 0 = unlimited

  // Calculate available questions based on selected categories
  const availableQuestionCount =
    config.categories.length === 0
      ? Object.values(categoryCounts).reduce((a, b) => a + b, 0) // All categories
      : config.categories.reduce((sum, cat) => sum + (categoryCounts[cat] || 0), 0);

  const maxQuestions = Math.max(1, availableQuestionCount);

  const toggleCategory = (category: FrontendCategory) => {
    const newCategories = config.categories.includes(category)
      ? config.categories.filter((c) => c !== category)
      : [...config.categories, category];

    // Calculate new available count
    const newAvailable =
      newCategories.length === 0
        ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
        : newCategories.reduce((sum, cat) => sum + (categoryCounts[cat] || 0), 0);
    const newMax = Math.max(1, newAvailable);

    // Adjust questionCount if it exceeds the new max
    const newQuestionCount = Math.min(config.questionCount, newMax);

    onConfigChange({ ...config, categories: newCategories, questionCount: newQuestionCount });
  };

  const selectAllCategories = () => {
    onConfigChange({ ...config, categories: [...availableCategories] });
  };

  const clearAllCategories = () => {
    onConfigChange({ ...config, categories: [] });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Breadcrumbs and Exit Button */}
        <div className="flex items-center justify-between mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frontend Drills', href: '/frontend-drills' },
              { label: frameworkConfig.name, href: `/frontend-drills/${framework}` },
              { label: 'Quiz' },
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
            Quiz Mode
          </h1>
          <p className="text-zinc-400 text-lg">{frameworkConfig.description}</p>
        </div>

        {/* Category Selection */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Categories
              {config.categories.length > 0 && (
                <span className="text-sm font-normal text-zinc-400 ml-2">
                  ({config.categories.length} selected)
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllCategories}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Select All
              </button>
              <span className="text-zinc-600">|</span>
              <button
                type="button"
                onClick={clearAllCategories}
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  config.categories.includes(category)
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {category}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    config.categories.includes(category)
                      ? 'bg-blue-400/30 text-blue-100'
                      : 'bg-zinc-600 text-zinc-400'
                  }`}
                >
                  {categoryCounts[category] || 0}
                </span>
              </button>
            ))}
          </div>
          {config.categories.length === 0 && (
            <p className="text-zinc-500 text-sm mt-3">
              No categories selected - all categories will be included
            </p>
          )}
        </div>

        {/* Question Count */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Number of Questions</h2>
            <span className="text-sm text-zinc-400">
              {availableQuestionCount} questions available
            </span>
          </div>
          <QuestionCountSlider
            value={Math.min(config.questionCount, maxQuestions)}
            onChange={(value) => onConfigChange({ ...config, questionCount: value })}
            min={1}
            max={maxQuestions}
            showLabel={false}
          />
        </div>

        {/* Time Per Question */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-6 border border-zinc-700/50">
          <h2 className="text-xl font-semibold mb-4">Time Per Question</h2>
          {/* Quick Select Buttons */}
          <div className="flex gap-3 mb-4">
            {timeOptions.map((time) => (
              <button
                type="button"
                key={time}
                onClick={() => onConfigChange({ ...config, timePerQuestion: time })}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                  config.timePerQuestion === time
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {time === 0 ? '\u221E' : `${time}s`}
              </button>
            ))}
          </div>
          {/* Custom Slider */}
          {config.timePerQuestion !== 0 && (
            <div className="pt-2 border-t border-zinc-700/50">
              <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
                <span>Custom time</span>
                <span className="font-mono bg-zinc-700/50 px-2 py-1 rounded">
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
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1">
                <span>5s</span>
                <span>60s</span>
              </div>
            </div>
          )}
          {config.timePerQuestion === 0 && (
            <div className="pt-2 border-t border-zinc-700/50">
              <p className="text-sm text-zinc-400 text-center py-2">
                No time limit - take as long as you need
              </p>
            </div>
          )}
        </div>

        {/* Sound Toggle */}
        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-8 border border-zinc-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Sound Effects</h2>
              <p className="text-zinc-400 text-sm">Audio feedback for answers and timer</p>
            </div>
            <button
              type="button"
              onClick={onSoundToggle}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 cursor-pointer ${
                soundEnabled ? 'bg-blue-500' : 'bg-zinc-600'
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
// Timer Component
// ============================================================================

interface TimerProps {
  timeLeft: number; // in milliseconds
  totalTime: number; // in seconds
  onTick?: () => void;
}

function Timer({ timeLeft, totalTime, onTick }: TimerProps) {
  const isUnlimited = totalTime === 0;
  const timeLeftSeconds = timeLeft / 1000;
  const percentage = isUnlimited ? 100 : (timeLeftSeconds / totalTime) * 100;
  const isLow = !isUnlimited && timeLeftSeconds <= 5;
  const isCritical = !isUnlimited && timeLeftSeconds <= 3;

  // Format time as seconds.hundredths (e.g., "18.42")
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${seconds}.${hundredths.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isLow && onTick) {
      onTick();
    }
  }, [isLow, onTick]);

  return (
    <div className="relative">
      {/* Background circle */}
      <svg className="w-24 h-24 transform -rotate-90" aria-hidden="true">
        <circle
          cx="48"
          cy="48"
          r="42"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-zinc-700"
        />
        <circle
          cx="48"
          cy="48"
          r="42"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 42}`}
          strokeDashoffset={isUnlimited ? 0 : `${2 * Math.PI * 42 * (1 - percentage / 100)}`}
          className={`transition-all duration-100 ${
            isUnlimited
              ? 'text-emerald-500'
              : isCritical
                ? 'text-red-500'
                : isLow
                  ? 'text-orange-500'
                  : 'text-blue-500'
          }`}
          strokeLinecap="round"
        />
      </svg>
      {/* Time text */}
      <div
        className={`absolute inset-0 flex items-center justify-center font-mono font-bold transition-colors ${
          isUnlimited
            ? 'text-emerald-400 text-2xl'
            : isCritical
              ? 'text-red-500 animate-pulse text-lg'
              : isLow
                ? 'text-orange-500 text-lg'
                : 'text-white text-lg'
        }`}
      >
        {isUnlimited ? '\u221E' : formatTime(timeLeft)}
      </div>
    </div>
  );
}

// ============================================================================
// Progress Bar Component
// ============================================================================

interface ProgressBarProps {
  current: number;
  total: number;
}

function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-zinc-400 mb-2">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Score Display Component
// ============================================================================

interface ScoreDisplayProps {
  score: number;
  streak: number;
}

function ScoreDisplay({ score, streak }: ScoreDisplayProps) {
  const multiplier = streak >= 5 ? 3 : streak >= 3 ? 2 : 1;

  return (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{score}</div>
        <div className="text-xs text-zinc-400 uppercase tracking-wider">Score</div>
      </div>
      <div className="text-center">
        <div className={`text-3xl font-bold ${streak > 0 ? 'text-orange-400' : 'text-zinc-500'}`}>
          {streak}
        </div>
        <div className="text-xs text-zinc-400 uppercase tracking-wider">Streak</div>
      </div>
      {multiplier > 1 && (
        <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-sm font-bold animate-pulse">
          {multiplier}x
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Option Card Component
// ============================================================================

interface OptionCardProps {
  option: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isRevealed: boolean;
  onClick: () => void;
  disabled: boolean;
}

function OptionCard({
  option,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
  disabled,
}: OptionCardProps) {
  let cardClasses = `
    relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left
    transform hover:scale-[1.02] active:scale-[0.98]
  `;

  if (isRevealed) {
    if (isCorrect) {
      cardClasses += ' bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/25';
    } else if (isSelected) {
      cardClasses += ' bg-red-500/20 border-red-500 shadow-lg shadow-red-500/25';
    } else {
      cardClasses += ' bg-zinc-800/50 border-zinc-600 opacity-50';
    }
  } else if (isSelected) {
    cardClasses += ' bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/25';
  } else {
    cardClasses += ' bg-zinc-800/50 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-700/50';
  }

  if (disabled && !isRevealed) {
    cardClasses += ' cursor-not-allowed opacity-75';
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cardClasses}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium leading-snug">{option}</span>
        {isRevealed && isCorrect && (
          <svg
            className="w-6 h-6 text-emerald-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {isRevealed && isSelected && !isCorrect && (
          <svg
            className="w-6 h-6 text-red-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

// ============================================================================
// Question Display Component
// ============================================================================

interface QuestionDisplayProps {
  question: FrontendQuizQuestion;
}

function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <div className="bg-zinc-800/50 rounded-2xl p-6 border border-zinc-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-400 text-sm uppercase tracking-wider">{question.category}</h3>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full border ${
            question.difficulty === 'easy'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : question.difficulty === 'medium'
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                : 'bg-red-500/20 text-red-300 border-red-500/30'
          }`}
        >
          {question.difficulty}
        </span>
      </div>

      {/* Question text */}
      <div className="text-lg font-semibold text-white mb-4">{question.question}</div>

      {/* Optional code snippet */}
      {question.codeSnippet && (
        <div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Code</div>
          <pre className="bg-zinc-900 rounded-lg p-4 font-mono text-sm text-blue-300 whitespace-pre-wrap break-words overflow-wrap-anywhere overflow-x-auto max-h-64 overflow-y-auto">
            <code className="block">{question.codeSnippet}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Playing Phase Component
// ============================================================================

interface PlayingPhaseProps {
  state: QuizState;
  onSelectOption: (option: string) => void;
  onTimeout: () => void;
  soundEnabled: boolean;
  framework: FrameworkId;
  onExit: () => void;
}

function PlayingPhase({
  state,
  onSelectOption,
  onTimeout,
  soundEnabled,
  framework,
  onExit,
}: PlayingPhaseProps) {
  const [timeLeft, setTimeLeft] = useState<number>(state.config.timePerQuestion * 1000);
  const { playTick } = useSoundEffects(soundEnabled);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const frameworkConfig = FRAMEWORK_CONFIG[framework];

  const currentQuestion = state.questions[state.currentQuestionIndex];

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentQuestionIndex needed to reset timer on question change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Timer reset is intentional on question change
    setTimeLeft(state.config.timePerQuestion * 1000);
  }, [state.config.timePerQuestion, state.currentQuestionIndex]);

  useEffect(() => {
    // Don't run timer for unlimited time mode
    if (state.config.timePerQuestion === 0) {
      return;
    }

    if (state.showingAnswer) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    // Update every 10ms for smooth millisecond display
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 10) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          onTimeout();
          return 0;
        }
        return prev - 10;
      });
    }, 10);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.showingAnswer, state.config.timePerQuestion, onTimeout]);

  const handleTick = useCallback(() => {
    // Play tick sound in the last 5 seconds (5000ms)
    if (timeLeft <= 5000 && timeLeft > 0) {
      playTick();
    }
  }, [timeLeft, playTick]);

  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleExitClick = () => {
    if (showExitConfirm) {
      onExit();
    } else {
      setShowExitConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowExitConfirm(false), 3000);
    }
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
              {
                label: frameworkConfig.name,
                href: `/frontend-drills/${framework}`,
              },
              { label: 'Quiz', href: `/frontend-drills/${framework}/quiz` },
              {
                label: `Question ${state.currentQuestionIndex + 1} of ${state.questions.length}`,
              },
            ]}
            className="text-sm"
          />
          <button
            type="button"
            onClick={handleExitClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showExitConfirm
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
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
            <span className="text-sm font-medium">{showExitConfirm ? 'Confirm Exit' : 'Exit'}</span>
          </button>
        </div>

        {/* Header with timer and score */}
        <div className="flex items-center justify-between mb-8">
          <ScoreDisplay score={state.score} streak={state.streak} />
          <Timer timeLeft={timeLeft} totalTime={state.config.timePerQuestion} onTick={handleTick} />
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar current={state.currentQuestionIndex} total={state.questions.length} />
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuestionDisplay question={currentQuestion} />
        </div>

        {/* Option Cards - 2x2 grid */}
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => (
            <OptionCard
              key={option}
              option={option}
              isSelected={state.selectedOption === option}
              isCorrect={option === currentQuestion.correctAnswer}
              isRevealed={state.showingAnswer}
              onClick={() => onSelectOption(option)}
              disabled={state.showingAnswer}
            />
          ))}
        </div>

        {/* Feedback after answer */}
        {state.showingAnswer && (
          <div className="mt-6 text-center">
            {state.selectedOption === currentQuestion.correctAnswer ? (
              <div className="text-emerald-400 text-xl font-semibold animate-bounce">
                Correct! +{state.answers[state.answers.length - 1]?.points || 0} points
              </div>
            ) : (
              <div className="text-red-400 text-xl font-semibold">
                {state.selectedOption === null ? "Time's up!" : 'Incorrect!'}
              </div>
            )}
            <p className="text-zinc-400 mt-2 text-sm max-w-xl mx-auto">
              {currentQuestion.explanation}
            </p>
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
  result: FrontendQuizResult;
  config: FrontendQuizConfig;
  onPlayAgain: () => void;
  onChangeSettings: () => void;
  answers: FrontendQuizAnswer[];
  questions: FrontendQuizQuestion[];
  framework: FrameworkId;
}

function ResultsPhase({
  result,
  config,
  onPlayAgain,
  onChangeSettings,
  answers,
  questions,
  framework,
}: ResultsPhaseProps) {
  const frameworkConfig = FRAMEWORK_CONFIG[framework];
  const [playerName, setPlayerName] = useState('');
  const [savedToLeaderboard, setSavedToLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<FrontendLeaderboardEntry[]>([]);
  const [leaderboardPosition, setLeaderboardPosition] = useState<number>(0);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'missed'>('missed');

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- Initial data load */
    setLeaderboard(getFrontendLeaderboard().slice(0, 10));
    setLeaderboardPosition(getFrontendLeaderboardPosition(result.totalScore));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [result.totalScore]);

  const handleSaveScore = () => {
    if (playerName.trim()) {
      addToFrontendLeaderboard({
        playerName: playerName.trim(),
        score: result.totalScore,
        accuracy: result.accuracy,
        framework: config.framework,
        questionCount: config.questionCount,
      });
      setSavedToLeaderboard(true);
      setLeaderboard(getFrontendLeaderboard().slice(0, 10));
    }
  };

  const handleShare = async () => {
    const shareText = `I scored ${result.totalScore} points on the ${frameworkConfig.name} frontend quiz!
Accuracy: ${result.accuracy}%
Streak: ${result.maxStreak}
Try it yourself!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Frontend Drills Quiz Score',
          text: shareText,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      alert('Score copied to clipboard!');
    }
  };

  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return 'S';
    if (accuracy >= 80) return 'A';
    if (accuracy >= 70) return 'B';
    if (accuracy >= 60) return 'C';
    return 'D';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Breadcrumbs and Exit Button */}
        <div className="flex items-center justify-between mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frontend Drills', href: '/frontend-drills' },
              { label: frameworkConfig.name, href: `/frontend-drills/${framework}` },
              { label: 'Quiz', href: `/frontend-drills/${framework}/quiz` },
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

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
            Grade: {getGrade(result.accuracy)}
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-zinc-800/50 rounded-2xl p-8 mb-6 border border-zinc-700/50 text-center">
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            {result.totalScore}
          </div>
          <div className="text-zinc-400 uppercase tracking-wider text-sm">Total Points</div>

          {/* Score Breakdown */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-zinc-700/30 rounded-lg p-3">
              <div className="text-zinc-300">Base Points</div>
              <div className="text-xl font-semibold">{result.basePoints}</div>
            </div>
            <div className="bg-zinc-700/30 rounded-lg p-3">
              <div className="text-zinc-300">Bonus Points</div>
              <div className="text-xl font-semibold text-yellow-400">+{result.bonusPoints}</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
            <div className="text-2xl font-bold text-emerald-400">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Correct</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
            <div className="text-2xl font-bold text-blue-400">{result.accuracy}%</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Accuracy</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
            <div className="text-2xl font-bold text-orange-400">{result.maxStreak}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Max Streak</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
            <div className="text-2xl font-bold text-purple-400">{result.averageTime}s</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Avg Time</div>
          </div>
        </div>

        {/* Time Stats */}
        <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 border border-zinc-700/50">
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-zinc-400">Total Time:</span>
              <span className="ml-2 font-semibold">{result.totalTime}s</span>
            </div>
            <div>
              <span className="text-zinc-400">Fastest:</span>
              <span className="ml-2 font-semibold text-emerald-400">{result.fastestAnswer}s</span>
            </div>
            <div>
              <span className="text-zinc-400">Slowest:</span>
              <span className="ml-2 font-semibold text-orange-400">{result.slowestAnswer}s</span>
            </div>
          </div>
        </div>

        {/* Save to Leaderboard */}
        {!savedToLeaderboard && (
          <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 border border-zinc-700/50">
            <div className="text-sm text-zinc-400 mb-2">Save your score to the leaderboard</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
                className="flex-1 px-4 py-2 bg-zinc-700 rounded-lg border border-zinc-600 focus:border-blue-500 focus:outline-none text-white placeholder-zinc-500"
              />
              <button
                type="button"
                onClick={handleSaveScore}
                disabled={!playerName.trim()}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Leaderboard Position */}
        {savedToLeaderboard && (
          <div className="bg-emerald-500/20 rounded-xl p-4 mb-6 border border-emerald-500/50 text-center">
            <div className="text-emerald-400 font-semibold">Score saved!</div>
            <div className="text-zinc-300">
              You ranked #{leaderboardPosition} on the leaderboard
            </div>
          </div>
        )}

        {/* Mini Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 border border-zinc-700/50">
            <h3 className="text-lg font-semibold mb-3">Top Scores</h3>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    index === 0 ? 'bg-yellow-500/10' : 'bg-zinc-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold ${index === 0 ? 'text-yellow-400' : 'text-zinc-400'}`}
                    >
                      #{index + 1}
                    </span>
                    <span className="font-medium">{entry.playerName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-zinc-400">{entry.accuracy}%</span>
                    <span className="font-bold">{entry.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Review */}
        <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 border border-zinc-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Question Review</h3>
            <div className="flex items-center bg-zinc-700/50 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setReviewFilter('missed')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  reviewFilter === 'missed'
                    ? 'bg-zinc-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Missed ({answers.filter((a) => !a.isCorrect).length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  reviewFilter === 'all'
                    ? 'bg-zinc-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All ({questions.length})
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {questions
              .map((question, index) => ({ question, answer: answers[index], index }))
              .filter(({ answer }) => reviewFilter === 'all' || !answer?.isCorrect)
              .map(({ question, answer, index }) => (
                <div
                  key={question.id}
                  className={`rounded-lg ${
                    answer?.isCorrect ? 'bg-emerald-500/10' : 'bg-red-500/10'
                  }`}
                >
                  {/* Compact row */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-zinc-500 w-5 text-right flex-shrink-0">
                        {index + 1}.
                      </span>
                      {answer?.isCorrect ? (
                        <svg
                          className="w-4 h-4 text-emerald-400 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-red-400 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span className="text-sm truncate">{question.question}</span>
                    </div>
                    <div className="text-sm text-zinc-400 flex-shrink-0 ml-2">
                      {answer?.timeSpent.toFixed(1)}s
                    </div>
                  </div>

                  {/* Expanded details for wrong/timed-out answers */}
                  {!answer?.isCorrect && (
                    <div className="px-3 pb-3 pt-0 border-t border-red-500/10">
                      {/* Code snippet context if present */}
                      {question.codeSnippet && (
                        <div className="mt-2 bg-zinc-900/50 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                          <pre className="text-blue-300 whitespace-pre-wrap">
                            {question.codeSnippet}
                          </pre>
                        </div>
                      )}

                      {/* What you answered vs correct */}
                      <div className="mt-2 flex flex-col gap-1 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-red-400 text-xs w-20 flex-shrink-0 pt-0.5">
                            Your answer:
                          </span>
                          <span className="text-red-300 text-sm">
                            {answer?.selectedOption ?? 'Timed out'}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400 text-xs w-20 flex-shrink-0 pt-0.5">
                            Correct:
                          </span>
                          <span className="text-emerald-300 text-sm">{question.correctAnswer}</span>
                        </div>
                      </div>

                      {/* Explanation */}
                      {question.explanation && (
                        <div className="mt-2 text-sm text-zinc-300 bg-zinc-800/60 rounded-lg p-3 border-l-2 border-blue-500/50">
                          {question.explanation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

            {/* Empty state for missed filter */}
            {reviewFilter === 'missed' && answers.every((a) => a.isCorrect) && (
              <div className="text-center py-6 text-zinc-400">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm">Perfect score! No missed questions.</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onChangeSettings}
            className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Change Settings
          </button>
          <button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-semibold transition-all cursor-pointer"
          >
            Play Again
          </button>
        </div>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="w-full mt-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share Score
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Main Quiz Page Component
// ============================================================================

export default function FrontendQuizPage() {
  const params = useParams();
  const framework = params?.framework as string;

  // Validate framework
  if (!isValidFramework(framework)) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold mb-4">Framework not found</h1>
          <p className="text-zinc-400 mb-6">
            The framework &quot;{framework}&quot; is not available. Please choose a valid framework.
          </p>
          <Link
            href="/frontend-drills"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Back to Frontend Drills
          </Link>
        </div>
      </div>
    );
  }

  const validFramework = framework as FrameworkId;

  return <FrontendQuizPageInner framework={validFramework} />;
}

// ============================================================================
// Inner component (after framework validation)
// ============================================================================

function FrontendQuizPageInner({ framework }: { framework: FrameworkId }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { playCorrect, playIncorrect, playComplete } = useSoundEffects(soundEnabled);

  const [state, setState] = useState<QuizState>({
    phase: 'setup',
    config: {
      framework,
      categories: [],
      questionCount: 10,
      timePerQuestion: 15,
    },
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    answers: [],
    startTime: null,
    endTime: null,
    selectedOption: null,
    showingAnswer: false,
    questionStartTime: null,
  });

  const [quizResult, setQuizResult] = useState<FrontendQuizResult | null>(null);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update config
  const handleConfigChange = (config: FrontendQuizConfig) => {
    setState((prev) => ({ ...prev, config: { ...config, framework } }));
  };

  // Start quiz
  const handleStartQuiz = () => {
    const questions = generateFrontendQuiz(state.config);
    setState((prev) => ({
      ...prev,
      phase: 'playing',
      questions,
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      answers: [],
      startTime: Date.now(),
      endTime: null,
      selectedOption: null,
      showingAnswer: false,
      questionStartTime: Date.now(),
    }));
  };

  // Advance to next question
  const advanceToNextQuestion = useCallback(() => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }

    setState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;

      if (nextIndex >= prev.questions.length) {
        // Quiz complete
        const endTime = Date.now();
        const result = calculateFrontendQuizResults(
          prev.answers,
          prev.maxStreak,
          prev.startTime || endTime,
          endTime,
        );
        setQuizResult(result);
        playComplete();

        return {
          ...prev,
          phase: 'results' as Phase,
          endTime,
        };
      }

      // Next question
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedOption: null,
        showingAnswer: false,
        questionStartTime: Date.now(),
      };
    });
  }, [playComplete]);

  // Handle option selection
  const handleSelectOption = useCallback(
    (option: string) => {
      setState((prev) => {
        if (prev.showingAnswer || prev.selectedOption !== null) return prev;

        const currentQuestion = prev.questions[prev.currentQuestionIndex];
        const isCorrect = option === currentQuestion.correctAnswer;
        const timeSpent = prev.questionStartTime ? (Date.now() - prev.questionStartTime) / 1000 : 0;

        // Calculate score
        const scoreResult = calculateFrontendQuizScore(
          isCorrect,
          timeSpent,
          prev.config.timePerQuestion,
          prev.streak,
        );

        // Play sound (side effect)
        if (isCorrect) {
          playCorrect();
        } else {
          playIncorrect();
        }

        // Create answer record
        const answer: FrontendQuizAnswer = {
          questionId: currentQuestion.id,
          selectedOption: option,
          isCorrect,
          timeSpent,
          points: scoreResult.totalPoints,
        };

        // Update state
        const newStreak = isCorrect ? prev.streak + 1 : 0;
        const newMaxStreak = Math.max(prev.maxStreak, newStreak);

        // Schedule auto-advance (side effect)
        autoAdvanceTimeoutRef.current = setTimeout(() => {
          advanceToNextQuestion();
        }, 2000);

        return {
          ...prev,
          selectedOption: option,
          showingAnswer: true,
          score: prev.score + scoreResult.totalPoints,
          streak: newStreak,
          maxStreak: newMaxStreak,
          answers: [...prev.answers, answer],
        };
      });
    },
    [playCorrect, playIncorrect, advanceToNextQuestion],
  );

  // Handle timeout
  const handleTimeout = useCallback(() => {
    setState((prev) => {
      if (prev.showingAnswer) return prev;

      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const timeSpent = prev.config.timePerQuestion;

      playIncorrect();

      const answer: FrontendQuizAnswer = {
        questionId: currentQuestion.id,
        selectedOption: null,
        isCorrect: false,
        timeSpent,
        points: 0,
      };

      // Schedule auto-advance (side effect)
      autoAdvanceTimeoutRef.current = setTimeout(() => {
        advanceToNextQuestion();
      }, 2500);

      return {
        ...prev,
        selectedOption: null,
        showingAnswer: true,
        streak: 0,
        answers: [...prev.answers, answer],
      };
    });
  }, [playIncorrect, advanceToNextQuestion]);

  // Play again with same settings
  const handlePlayAgain = () => {
    const questions = generateFrontendQuiz(state.config);
    setState((prev) => ({
      ...prev,
      phase: 'playing',
      questions,
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      answers: [],
      startTime: Date.now(),
      endTime: null,
      selectedOption: null,
      showingAnswer: false,
      questionStartTime: Date.now(),
    }));
    setQuizResult(null);
  };

  // Go back to setup
  const handleChangeSettings = () => {
    setState((prev) => ({
      ...prev,
      phase: 'setup',
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      answers: [],
      startTime: null,
      endTime: null,
      selectedOption: null,
      showingAnswer: false,
      questionStartTime: null,
    }));
    setQuizResult(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  // Render based on phase
  switch (state.phase) {
    case 'setup':
      return (
        <SetupPhase
          config={state.config}
          onConfigChange={handleConfigChange}
          onStart={handleStartQuiz}
          framework={framework}
          soundEnabled={soundEnabled}
          onSoundToggle={() => setSoundEnabled(!soundEnabled)}
        />
      );

    case 'playing':
      return (
        <PlayingPhase
          state={state}
          onSelectOption={handleSelectOption}
          onTimeout={handleTimeout}
          soundEnabled={soundEnabled}
          framework={framework}
          onExit={handleChangeSettings}
        />
      );

    case 'results':
      if (!quizResult) return null;
      return (
        <ResultsPhase
          result={quizResult}
          config={state.config}
          onPlayAgain={handlePlayAgain}
          onChangeSettings={handleChangeSettings}
          answers={state.answers}
          questions={state.questions}
          framework={framework}
        />
      );

    default:
      return null;
  }
}
