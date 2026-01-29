'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PatternRecognitionGuide } from '@/components/PatternRecognitionGuide';
import {
  type AlgorithmPattern,
  type AlgorithmPatternProblem,
  getPatternCategories,
  getPatternProblems,
} from '@/lib/algorithmPatterns';
import type { LanguageId } from '@/lib/types';
import { isValidLanguage } from '../config';

// ============================================================================
// Types
// ============================================================================

type Phase = 'setup' | 'playing' | 'results';

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
  categories: string[];
}

function SetupPhase({ config, onConfigChange, onStart, categories }: SetupPhaseProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Algorithm Pattern Quiz</h1>
        <p className="text-zinc-400">
          Test your ability to recognize algorithm patterns from LeetCode-style problems
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 space-y-6">
        {/* Difficulty */}
        <div>
          <div className="block text-sm font-medium text-zinc-300 mb-2">Difficulty</div>
          <div className="flex gap-2">
            {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => onConfigChange({ ...config, difficulty: diff })}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  config.difficulty === diff
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {diff === 'all' ? 'All' : diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category-select" className="block text-sm font-medium text-zinc-300 mb-2">
            Category
          </label>
          <select
            id="category-select"
            value={config.category}
            onChange={(e) => onConfigChange({ ...config, category: e.target.value })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Question Count */}
        <div>
          <label htmlFor="question-count" className="block text-sm font-medium text-zinc-300 mb-2">
            Number of Questions: {config.questionCount}
          </label>
          <input
            id="question-count"
            type="range"
            min="5"
            max="20"
            value={config.questionCount}
            onChange={(e) =>
              onConfigChange({ ...config, questionCount: parseInt(e.target.value, 10) })
            }
            className="w-full"
          />
        </div>

        {/* Time Per Question */}
        <div>
          <label
            htmlFor="time-per-question"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Time Per Question: {config.timePerQuestion}s
          </label>
          <input
            id="time-per-question"
            type="range"
            min="10"
            max="60"
            step="5"
            value={config.timePerQuestion}
            onChange={(e) =>
              onConfigChange({ ...config, timePerQuestion: parseInt(e.target.value, 10) })
            }
            className="w-full"
          />
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={onStart}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
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
}

function PlayingPhase({
  problem,
  state,
  onSelectPattern,
  onShowGuide,
  timeLeft,
}: PlayingPhaseProps) {
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
            Time: <span className="text-purple-400 font-semibold">{timeLeft}s</span>
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

        {/* Hints (if available) */}
        {problem.hints && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-blue-400">💡 Hints:</h3>
            {problem.hints.bigO && (
              <div className="text-sm text-zinc-300">
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
}

function ResultsPhase({ state, onTryAgain, onBackToMenu }: ResultsPhaseProps) {
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
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function PatternQuizPage() {
  const params = useParams();
  const languageParam = params?.language as string;
  const language: LanguageId = isValidLanguage(languageParam) ? languageParam : 'javascript';

  const categories = getPatternCategories();

  const [config, setConfig] = useState<PatternQuizConfig>({
    difficulty: 'all',
    category: 'all',
    questionCount: 10,
    timePerQuestion: 30,
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

  // Timer effect
  useEffect(() => {
    if (state.phase !== 'playing' || state.showingAnswer) return;

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
  }, [state.phase, state.showingAnswer, handleTimeout]);

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
    window.location.href = `/${language}`;
  }, [language]);

  const currentProblem = state.phase === 'playing' ? state.problems[state.currentIndex] : null;

  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      {state.phase === 'setup' && (
        <SetupPhase
          config={config}
          onConfigChange={setConfig}
          onStart={handleStart}
          categories={categories}
        />
      )}

      {state.phase === 'playing' && currentProblem && (
        <PlayingPhase
          problem={currentProblem}
          state={state}
          onSelectPattern={handleSelectPattern}
          onShowGuide={() => setState((prev) => ({ ...prev, showGuide: true }))}
          timeLeft={timeLeft}
        />
      )}

      {state.phase === 'results' && (
        <ResultsPhase state={state} onTryAgain={handleTryAgain} onBackToMenu={handleBackToMenu} />
      )}

      <PatternRecognitionGuide
        isOpen={state.showGuide}
        onClose={() => setState((prev) => ({ ...prev, showGuide: false }))}
      />
    </div>
  );
}
