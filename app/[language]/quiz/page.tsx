'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import {
  generateQuiz,
  calculateScore,
  calculateQuizResults,
  addToLeaderboard,
  getLeaderboardPosition,
  getLeaderboard,
  getMethodInfo,
  type QuizConfig,
  type QuizAnswer,
  type QuizResult,
  type ScoreResult,
  type LeaderboardEntry
} from '@/lib/quizGenerator';
import { getCategoriesForLanguage } from '@/lib/problems';
import type { QuizQuestion, LanguageId } from '@/lib/types';

// ============================================================================
// Types
// ============================================================================

type Phase = 'setup' | 'playing' | 'results';

interface QuizState {
  phase: Phase;
  config: QuizConfig;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  answers: QuizAnswer[];
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
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
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
  }, [enabled, getAudioContext]);

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
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.2), i * 150);
    });
  }, [playTone]);

  return { playCorrect, playIncorrect, playTick, playComplete };
}

// ============================================================================
// Setup Phase Component
// ============================================================================

interface SetupPhaseProps {
  config: QuizConfig;
  onConfigChange: (config: QuizConfig) => void;
  onStart: () => void;
  availableCategories: string[];
}

function SetupPhase({ config, onConfigChange, onStart, availableCategories }: SetupPhaseProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const questionCountOptions = [5, 10, 15] as const;
  const timeOptions = [10, 15, 20, 30] as const;

  const toggleCategory = (category: string) => {
    const newCategories = config.categories.includes(category)
      ? config.categories.filter(c => c !== category)
      : [...config.categories, category];
    onConfigChange({ ...config, categories: newCategories });
  };

  const selectAllCategories = () => {
    onConfigChange({ ...config, categories: [...availableCategories] });
  };

  const clearAllCategories = () => {
    onConfigChange({ ...config, categories: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Quiz Mode
          </h1>
          <p className="text-slate-400 text-lg">
            Test your knowledge of {config.language} methods
          </p>
        </div>

        {/* Category Selection */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <div className="flex gap-2">
              <button
                onClick={selectAllCategories}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Select All
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={clearAllCategories}
                className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                  config.categories.includes(category)
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {config.categories.length === 0 && (
            <p className="text-slate-500 text-sm mt-3">
              No categories selected - all categories will be included
            </p>
          )}
        </div>

        {/* Question Count */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold mb-4">Number of Questions</h2>
          <div className="flex gap-3">
            {questionCountOptions.map(count => (
              <button
                key={count}
                onClick={() => onConfigChange({ ...config, questionCount: count })}
                className={`flex-1 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  config.questionCount === count
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Time Per Question */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold mb-4">Time Per Question</h2>
          <div className="flex gap-3">
            {timeOptions.map(time => (
              <button
                key={time}
                onClick={() => onConfigChange({ ...config, timePerQuestion: time })}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  config.timePerQuestion === time
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {time}s
              </button>
            ))}
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Sound Effects</h2>
              <p className="text-slate-400 text-sm">Audio feedback for answers and timer</p>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
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
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-xl
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
  timeLeft: number;
  totalTime: number;
  onTick?: () => void;
}

function Timer({ timeLeft, totalTime, onTick }: TimerProps) {
  const percentage = (timeLeft / totalTime) * 100;
  const isLow = timeLeft <= 5;
  const isCritical = timeLeft <= 3;

  useEffect(() => {
    if (isLow && onTick) {
      onTick();
    }
  }, [timeLeft, isLow, onTick]);

  return (
    <div className="relative">
      {/* Background circle */}
      <svg className="w-20 h-20 transform -rotate-90">
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-slate-700"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 36}`}
          strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
          className={`transition-all duration-200 ${
            isCritical ? 'text-red-500' : isLow ? 'text-orange-500' : 'text-blue-500'
          }`}
          strokeLinecap="round"
        />
      </svg>
      {/* Time text */}
      <div
        className={`absolute inset-0 flex items-center justify-center font-bold text-2xl transition-colors ${
          isCritical ? 'text-red-500 animate-pulse' : isLow ? 'text-orange-500' : 'text-white'
        }`}
      >
        {timeLeft}
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
  const percentage = ((current) / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-slate-400 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
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
        <div className="text-xs text-slate-400 uppercase tracking-wider">Score</div>
      </div>
      <div className="text-center">
        <div className={`text-3xl font-bold ${streak > 0 ? 'text-orange-400' : 'text-slate-500'}`}>
          {streak}
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">Streak</div>
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
// Method Card Component
// ============================================================================

interface MethodCardProps {
  method: string;
  description?: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isRevealed: boolean;
  onClick: () => void;
  disabled: boolean;
  language: LanguageId;
}

function MethodCard({
  method,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
  disabled,
  language
}: MethodCardProps) {
  const methodInfo = getMethodInfo(method, language);
  const [isHovered, setIsHovered] = useState(false);

  let cardClasses = `
    relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
    transform hover:scale-[1.02] active:scale-[0.98]
  `;

  if (isRevealed) {
    if (isCorrect) {
      cardClasses += ' bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/25';
    } else if (isSelected) {
      cardClasses += ' bg-red-500/20 border-red-500 shadow-lg shadow-red-500/25';
    } else {
      cardClasses += ' bg-slate-800/50 border-slate-600 opacity-50';
    }
  } else if (isSelected) {
    cardClasses += ' bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/25';
  } else {
    cardClasses += ' bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-700/50';
  }

  if (disabled && !isRevealed) {
    cardClasses += ' cursor-not-allowed opacity-75';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cardClasses}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono font-semibold text-lg">{method}</span>
        {isRevealed && isCorrect && (
          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {isRevealed && isSelected && !isCorrect && (
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      {/* Tooltip on hover */}
      {isHovered && !isRevealed && methodInfo && (
        <div className="absolute left-0 right-0 -bottom-2 transform translate-y-full z-10 p-3 bg-slate-900 rounded-lg border border-slate-600 shadow-xl text-sm text-slate-300 text-left">
          {methodInfo.description.length > 100
            ? methodInfo.description.slice(0, 100) + '...'
            : methodInfo.description}
        </div>
      )}
    </button>
  );
}

// ============================================================================
// Question Display Component
// ============================================================================

interface QuestionDisplayProps {
  question: QuizQuestion;
}

function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-400 text-sm uppercase tracking-wider">
          Which method produces this output?
        </h3>
        {/* Method type hint */}
        {question.methodHint && (
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
            {question.methodHint}
          </span>
        )}
      </div>

      {/* Code snippet */}
      <div className="mb-4">
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Input</div>
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto font-mono text-sm text-blue-300">
          <code>{question.input}</code>
        </pre>
      </div>

      {/* Output */}
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Output</div>
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto font-mono text-sm text-emerald-300">
          <code>{question.output}</code>
        </pre>
      </div>
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
}

function PlayingPhase({ state, onSelectOption, onTimeout, soundEnabled }: PlayingPhaseProps) {
  const [timeLeft, setTimeLeft] = useState<number>(state.config.timePerQuestion);
  const { playTick } = useSoundEffects(soundEnabled);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = state.questions[state.currentQuestionIndex];

  useEffect(() => {
    // Reset timer when question changes
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Timer sync is intentional
    setTimeLeft(state.config.timePerQuestion);
  }, [state.currentQuestionIndex, state.config.timePerQuestion]);

  useEffect(() => {
    if (state.showingAnswer) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.currentQuestionIndex, state.showingAnswer, onTimeout]);

  const handleTick = useCallback(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      playTick();
    }
  }, [timeLeft, playTick]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header with timer and score */}
        <div className="flex items-center justify-between mb-8">
          <ScoreDisplay score={state.score} streak={state.streak} />
          <Timer
            timeLeft={timeLeft}
            totalTime={state.config.timePerQuestion}
            onTick={handleTick}
          />
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar current={state.currentQuestionIndex} total={state.questions.length} />
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuestionDisplay question={currentQuestion} />
        </div>

        {/* Method Cards */}
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map(option => (
            <MethodCard
              key={option}
              method={option}
              isSelected={state.selectedOption === option}
              isCorrect={option === currentQuestion.correctMethod}
              isRevealed={state.showingAnswer}
              onClick={() => onSelectOption(option)}
              disabled={state.showingAnswer}
              language={state.config.language}
            />
          ))}
        </div>

        {/* Feedback after answer */}
        {state.showingAnswer && (
          <div className="mt-6 text-center">
            {state.selectedOption === currentQuestion.correctMethod ? (
              <div className="text-emerald-400 text-xl font-semibold animate-bounce">
                Correct! +{state.answers[state.answers.length - 1]?.points || 0} points
              </div>
            ) : (
              <div className="text-red-400 text-xl font-semibold">
                {state.selectedOption === null ? 'Time\'s up!' : 'Incorrect!'} The answer was{' '}
                <span className="text-emerald-400 font-mono">{currentQuestion.correctMethod}</span>
              </div>
            )}
            <p className="text-slate-400 mt-2 text-sm">
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
  result: QuizResult;
  config: QuizConfig;
  onPlayAgain: () => void;
  onChangeSettings: () => void;
  answers: QuizAnswer[];
  questions: QuizQuestion[];
}

function ResultsPhase({ result, config, onPlayAgain, onChangeSettings, answers, questions }: ResultsPhaseProps) {
  const [playerName, setPlayerName] = useState('');
  const [savedToLeaderboard, setSavedToLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardPosition, setLeaderboardPosition] = useState<number>(0);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- Initial data load */
    setLeaderboard(getLeaderboard().slice(0, 10));
    setLeaderboardPosition(getLeaderboardPosition(result.totalScore));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [result.totalScore]);

  const handleSaveScore = () => {
    if (playerName.trim()) {
      addToLeaderboard({
        playerName: playerName.trim(),
        score: result.totalScore,
        accuracy: result.accuracy,
        language: config.language,
        questionCount: config.questionCount
      });
      setSavedToLeaderboard(true);
      setLeaderboard(getLeaderboard().slice(0, 10));
    }
  };

  const handleShare = async () => {
    const shareText = `I scored ${result.totalScore} points on the ${config.language} coding quiz!
Accuracy: ${result.accuracy}%
Streak: ${result.maxStreak}
Try it yourself!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Coding Drills Quiz Score',
          text: shareText
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

  const getGradeEmoji = (accuracy: number) => {
    if (accuracy >= 90) return 'S';
    if (accuracy >= 80) return 'A';
    if (accuracy >= 70) return 'B';
    if (accuracy >= 60) return 'C';
    return 'D';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
            Grade: {getGradeEmoji(result.accuracy)}
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-slate-800/50 rounded-2xl p-8 mb-6 border border-slate-700/50 text-center">
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            {result.totalScore}
          </div>
          <div className="text-slate-400 uppercase tracking-wider text-sm">Total Points</div>

          {/* Score Breakdown */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-slate-300">Base Points</div>
              <div className="text-xl font-semibold">{result.basePoints}</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-slate-300">Bonus Points</div>
              <div className="text-xl font-semibold text-yellow-400">+{result.bonusPoints}</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <div className="text-2xl font-bold text-emerald-400">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Correct</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <div className="text-2xl font-bold text-blue-400">{result.accuracy}%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Accuracy</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <div className="text-2xl font-bold text-orange-400">{result.maxStreak}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Max Streak</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <div className="text-2xl font-bold text-purple-400">{result.averageTime}s</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Avg Time</div>
          </div>
        </div>

        {/* Time Stats */}
        <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-slate-400">Total Time:</span>
              <span className="ml-2 font-semibold">{result.totalTime}s</span>
            </div>
            <div>
              <span className="text-slate-400">Fastest:</span>
              <span className="ml-2 font-semibold text-emerald-400">{result.fastestAnswer}s</span>
            </div>
            <div>
              <span className="text-slate-400">Slowest:</span>
              <span className="ml-2 font-semibold text-orange-400">{result.slowestAnswer}s</span>
            </div>
          </div>
        </div>

        {/* Save to Leaderboard */}
        {!savedToLeaderboard && (
          <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-2">Save your score to the leaderboard</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
                className="flex-1 px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-white placeholder-slate-500"
              />
              <button
                onClick={handleSaveScore}
                disabled={!playerName.trim()}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
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
            <div className="text-slate-300">You ranked #{leaderboardPosition} on the leaderboard</div>
          </div>
        )}

        {/* Mini Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold mb-3">Top Scores</h3>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    index === 0 ? 'bg-yellow-500/10' : 'bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${index === 0 ? 'text-yellow-400' : 'text-slate-400'}`}>
                      #{index + 1}
                    </span>
                    <span className="font-medium">{entry.playerName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-400">{entry.accuracy}%</span>
                    <span className="font-bold">{entry.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Review */}
        <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold mb-3">Question Review</h3>
          <div className="space-y-2">
            {questions.map((question, index) => {
              const answer = answers[index];
              return (
                <div
                  key={question.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    answer?.isCorrect ? 'bg-emerald-500/10' : 'bg-red-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {answer?.isCorrect ? (
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className="font-mono text-sm">{question.correctMethod}</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    {answer?.timeSpent.toFixed(1)}s
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onChangeSettings}
            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors"
          >
            Change Settings
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-semibold transition-all"
          >
            Play Again
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full mt-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
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

export default function QuizPage() {
  const params = useParams();
  const language = (params?.language as LanguageId) || 'javascript';

  const availableCategories = getCategoriesForLanguage(language);

  const [soundEnabled] = useState(true);
  const { playCorrect, playIncorrect, playComplete } = useSoundEffects(soundEnabled);

  const [state, setState] = useState<QuizState>({
    phase: 'setup',
    config: {
      language,
      categories: [],
      questionCount: 10,
      timePerQuestion: 15
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
    questionStartTime: null
  });

  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update config
  const handleConfigChange = (config: QuizConfig) => {
    setState(prev => ({ ...prev, config: { ...config, language } }));
  };

  // Start quiz
  const handleStartQuiz = () => {
    const questions = generateQuiz(state.config);
    setState(prev => ({
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
      questionStartTime: Date.now()
    }));
  };

  // Advance to next question - defined first as it's used by handlers below
  const advanceToNextQuestion = useCallback(() => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }

    setState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;

      if (nextIndex >= prev.questions.length) {
        // Quiz complete
        const endTime = Date.now();
        const result = calculateQuizResults(
          prev.answers,
          prev.maxStreak,
          prev.startTime || endTime,
          endTime
        );
        setQuizResult(result);
        playComplete();

        return {
          ...prev,
          phase: 'results' as Phase,
          endTime
        };
      }

      // Next question
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedOption: null,
        showingAnswer: false,
        questionStartTime: Date.now()
      };
    });
  }, [playComplete]);

  // Handle option selection - using functional setState to avoid stale closure issues
  const handleSelectOption = useCallback((option: string) => {
    setState(prev => {
      if (prev.showingAnswer || prev.selectedOption !== null) return prev;

      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const isCorrect = option === currentQuestion.correctMethod;
      const timeSpent = prev.questionStartTime
        ? (Date.now() - prev.questionStartTime) / 1000
        : 0;

      // Calculate score
      const scoreResult: ScoreResult = calculateScore(
        isCorrect,
        timeSpent,
        prev.config.timePerQuestion,
        prev.streak
      );

      // Play sound (side effect)
      if (isCorrect) {
        playCorrect();
      } else {
        playIncorrect();
      }

      // Create answer record
      const answer: QuizAnswer = {
        questionId: currentQuestion.id,
        selectedOption: option,
        isCorrect,
        timeSpent,
        points: scoreResult.totalPoints
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
        answers: [...prev.answers, answer]
      };
    });
  }, [playCorrect, playIncorrect, advanceToNextQuestion]);

  // Handle timeout - using functional setState to avoid stale closure issues
  const handleTimeout = useCallback(() => {
    setState(prev => {
      if (prev.showingAnswer) return prev;

      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const timeSpent = prev.config.timePerQuestion;

      playIncorrect();

      const answer: QuizAnswer = {
        questionId: currentQuestion.id,
        selectedOption: null,
        isCorrect: false,
        timeSpent,
        points: 0
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
        answers: [...prev.answers, answer]
      };
    });
  }, [playIncorrect, advanceToNextQuestion]);

  // Play again with same settings
  const handlePlayAgain = () => {
    const questions = generateQuiz(state.config);
    setState(prev => ({
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
      questionStartTime: Date.now()
    }));
    setQuizResult(null);
  };

  // Go back to setup
  const handleChangeSettings = () => {
    setState(prev => ({
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
      questionStartTime: null
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
          availableCategories={availableCategories}
        />
      );

    case 'playing':
      return (
        <PlayingPhase
          state={state}
          onSelectOption={handleSelectOption}
          onTimeout={handleTimeout}
          soundEnabled={soundEnabled}
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
        />
      );

    default:
      return null;
  }
}
