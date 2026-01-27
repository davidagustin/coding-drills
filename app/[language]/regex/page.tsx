'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  evaluateRegex,
  getRegexCategories,
  getRegexCategoryCounts,
  type MatchRange,
  REGEX_CHEATSHEET,
  type RegexAnswerRecord,
  type RegexCategory,
  type RegexCheatsheetEntry,
  type RegexProblem,
  type RegexTrainerState,
  selectRegexProblems,
} from '@/lib/regexTrainer';
import { saveRegexProgress } from '@/lib/storage';
import type { Difficulty } from '@/lib/types';
import { isValidLanguage, LANGUAGE_CONFIG, type SupportedLanguage } from '../config';

// ============================================================================
// Types
// ============================================================================

type Phase = 'setup' | 'drill' | 'practice' | 'playground' | 'results';

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
// Utility Functions
// ============================================================================

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function calculatePoints(
  isCorrect: boolean,
  timeTakenSeconds: number,
  streak: number,
  difficulty: Difficulty,
): number {
  if (!isCorrect) return 0;

  const basePoints: Record<Difficulty, number> = {
    easy: 100,
    medium: 150,
    hard: 200,
  };

  const MAX_SPEED_BONUS = 50;
  const SPEED_THRESHOLD = 30;

  let speedBonus = 0;
  if (timeTakenSeconds < SPEED_THRESHOLD) {
    speedBonus = Math.round(MAX_SPEED_BONUS * (1 - timeTakenSeconds / SPEED_THRESHOLD));
  }

  const streakMultiplier = Math.min(1.0 + streak * 0.1, 2.0);
  return Math.round((basePoints[difficulty] + speedBonus) * streakMultiplier);
}

// ============================================================================
// Sub-Components
// ============================================================================

// --- HighlightedText ---

interface HighlightedTextProps {
  text: string;
  userMatches: MatchRange[];
  expectedMatches: MatchRange[];
  showMissed: boolean;
}

type CharHighlight = 'correct' | 'false-positive' | 'missed' | 'normal';

function HighlightedText({ text, userMatches, expectedMatches, showMissed }: HighlightedTextProps) {
  const charMap = useMemo(() => {
    const map: CharHighlight[] = new Array(text.length).fill('normal');

    const userSet = new Set<number>();
    for (const m of userMatches) {
      for (let i = m.start; i < m.end; i++) {
        userSet.add(i);
      }
    }

    const expectedSet = new Set<number>();
    for (const m of expectedMatches) {
      for (let i = m.start; i < m.end; i++) {
        expectedSet.add(i);
      }
    }

    for (let i = 0; i < text.length; i++) {
      const inUser = userSet.has(i);
      const inExpected = expectedSet.has(i);

      if (inUser && inExpected) {
        map[i] = 'correct';
      } else if (inUser && !inExpected) {
        map[i] = 'false-positive';
      } else if (!inUser && inExpected) {
        map[i] = 'missed';
      }
    }

    return map;
  }, [text, userMatches, expectedMatches]);

  // Merge consecutive characters with the same highlight into single spans
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

// --- RegexInput ---

interface RegexInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  error: string | null;
  isCorrect: boolean;
  disabled?: boolean;
}

function RegexInput({ value, onChange, onSubmit, error, isCorrect, disabled }: RegexInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div>
      <div
        className={`flex items-center bg-zinc-900 rounded-lg border transition-all duration-200 ${
          isCorrect
            ? 'border-green-500 ring-2 ring-green-500/50'
            : error
              ? 'border-red-500 ring-2 ring-red-500/50'
              : 'border-zinc-700 focus-within:border-zinc-500'
        }`}
      >
        <span className="text-zinc-500 font-mono text-lg pl-4 select-none">/</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="type your regex..."
          className="flex-1 bg-transparent text-zinc-100 font-mono text-sm px-2 py-3 focus:outline-none placeholder-zinc-600 disabled:opacity-50"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="text-zinc-500 font-mono text-lg select-none">/</span>
        <span className="text-green-400 font-mono text-sm pr-4 pl-1 select-none">g</span>
      </div>
      {error && <p className="mt-1.5 text-xs text-zinc-500">{error}</p>}
    </div>
  );
}

// --- HintsDrawer ---

interface HintsDrawerProps {
  hints: string[];
  cheatsheet: RegexCheatsheetEntry[];
  mode: 'drill' | 'practice' | 'playground';
  revealedHintCount: number;
  onRevealHint: () => void;
}

function HintsDrawer({
  hints,
  cheatsheet,
  mode,
  revealedHintCount,
  onRevealHint,
}: HintsDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Group cheatsheet entries by category
  const grouped = useMemo(() => {
    const map = new Map<string, RegexCheatsheetEntry[]>();
    for (const entry of cheatsheet) {
      const cat = entry.category || 'General';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)?.push(entry);
    }
    return map;
  }, [cheatsheet]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Toggle button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-2 bg-zinc-800 border border-zinc-700 border-b-0 rounded-t-xl text-sm text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all duration-200 cursor-pointer flex items-center gap-2"
        >
          <span>Hints & Cheatsheet</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Panel */}
      <div
        className={`bg-zinc-900 border-t border-zinc-700 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[50vh]' : 'max-h-0'
        }`}
      >
        <div className="p-6 overflow-y-auto max-h-[48vh] space-y-6">
          {/* Problem Hints (drill/practice only) */}
          {(mode === 'drill' || mode === 'practice') && hints.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-3 uppercase tracking-wider">
                Problem Hints
              </h3>
              <div className="space-y-2">
                {hints.slice(0, revealedHintCount).map((hint, i) => (
                  <div
                    key={i}
                    className="bg-zinc-800 rounded-lg p-3 text-sm text-zinc-300 border border-zinc-700"
                  >
                    <span className="text-yellow-400 font-medium mr-2">Hint {i + 1}:</span>
                    {hint}
                  </div>
                ))}
                {revealedHintCount < hints.length && (
                  <button
                    type="button"
                    onClick={onRevealHint}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    Show next hint ({revealedHintCount}/{hints.length})
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Regex Cheatsheet */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 mb-3 uppercase tracking-wider">
              Regex Cheatsheet
            </h3>
            <div className="space-y-4">
              {Array.from(grouped.entries()).map(([category, entries]) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

// --- DifficultyBadge ---

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

// --- Chip ---

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
        selected ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            selected ? 'bg-blue-400/30 text-blue-100' : 'bg-zinc-700 text-zinc-400'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// --- DifficultyFilter ---

interface DifficultyFilterProps {
  value: Difficulty | 'mixed';
  onChange: (value: Difficulty | 'mixed') => void;
}

function DifficultyFilter({ value, onChange }: DifficultyFilterProps) {
  const options: { value: Difficulty | 'mixed'; label: string; color: string }[] = [
    { value: 'mixed', label: 'Mixed', color: 'bg-zinc-500' },
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

// --- QuestionCountSlider (inline, simple) ---

interface SliderProps {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  label: string;
}

function CountSlider({ value, onChange, min, max, label }: SliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <span className="text-sm font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div className="flex justify-between text-xs text-zinc-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// ============================================================================
// Phase Components
// ============================================================================

// --- SetupPhase ---

interface SetupPhaseProps {
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  onStartDrill: (cats: RegexCategory[], diff: Difficulty | 'mixed', count: number) => void;
  onStartPractice: (cats: RegexCategory[], diff: Difficulty | 'mixed', count: number) => void;
  onStartPlayground: () => void;
}

function SetupPhase({ config, onStartDrill, onStartPractice, onStartPlayground }: SetupPhaseProps) {
  const allCategories = useMemo(() => getRegexCategories(), []);
  const categoryCounts = useMemo(() => getRegexCategoryCounts(), []);

  const [selectedCategories, setSelectedCategories] = useState<RegexCategory[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty | 'mixed'>('mixed');
  const [questionCount, setQuestionCount] = useState(10);

  const toggleCategory = (cat: RegexCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Regex Trainer</h1>
        <p className="text-zinc-400">Master regular expressions through interactive challenges</p>
      </div>

      {/* Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Drill Mode Card */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4 flex flex-col">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`w-6 h-6 ${config.color}`}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">Drill Mode</h2>
              <p className="text-xs text-zinc-400">Timed, scored</p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 flex-1">
            Timed challenges with scoring. Test your regex skills under pressure.
          </p>
          <button
            type="button"
            onClick={() => onStartDrill(selectedCategories, difficulty, questionCount)}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            Start Drill
          </button>
        </div>

        {/* Practice Mode Card */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4 flex flex-col">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`w-6 h-6 ${config.color}`}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">Practice Mode</h2>
              <p className="text-xs text-zinc-400">Untimed</p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 flex-1">
            Study at your own pace with hints and explanations.
          </p>
          <button
            type="button"
            onClick={() => onStartPractice(selectedCategories, difficulty, questionCount)}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            Start Practice
          </button>
        </div>

        {/* Playground Card */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4 flex flex-col">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`w-6 h-6 ${config.color}`}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">Playground</h2>
              <p className="text-xs text-zinc-400">Free-form</p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 flex-1">
            Free-form regex sandbox. Type any text and regex to experiment.
          </p>
          <button
            type="button"
            onClick={onStartPlayground}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            Open Playground
          </button>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-800 space-y-6">
        <h3 className="text-lg font-semibold text-zinc-100">Drill & Practice Settings</h3>

        {/* Categories */}
        <div>
          <span className="block text-sm font-medium text-zinc-300 mb-3">
            Categories {selectedCategories.length > 0 && `(${selectedCategories.length} selected)`}
          </span>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                selected={selectedCategories.includes(cat)}
                onClick={() => toggleCategory(cat)}
                count={categoryCounts[cat] || 0}
              />
            ))}
          </div>
          {selectedCategories.length === 0 && (
            <p className="text-xs text-zinc-500 mt-2">
              No categories selected - all categories will be included
            </p>
          )}
        </div>

        {/* Difficulty */}
        <div>
          <span className="block text-sm font-medium text-zinc-300 mb-3">Difficulty</span>
          <DifficultyFilter value={difficulty} onChange={setDifficulty} />
        </div>

        {/* Question Count */}
        <CountSlider
          value={questionCount}
          onChange={setQuestionCount}
          min={5}
          max={20}
          label="Number of Questions"
        />
      </div>
    </div>
  );
}

// --- DrillPhase ---

interface DrillPhaseProps {
  problems: RegexProblem[];
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  language: string;
  onComplete: (state: RegexTrainerState) => void;
}

function DrillPhase({ problems, onComplete }: DrillPhaseProps) {
  const [trainerState, setTrainerState] = useState<RegexTrainerState>(() => ({
    currentIndex: 0,
    answers: [],
    totalScore: 0,
    streak: 0,
    maxStreak: 0,
    startTime: Date.now(),
  }));

  const [pattern, setPattern] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(() => Date.now());
  const [revealedHintCount, setRevealedHintCount] = useState(0);

  const debouncedPattern = useDebounce(pattern, 150);

  const currentProblem = problems[trainerState.currentIndex];

  // Refs for stable access in auto-advance effect (avoids infinite loops)
  const currentProblemRef = useRef(currentProblem);
  const patternRef = useRef(pattern);
  const userMatchesRef = useRef<MatchRange[]>([]);
  const trainerStateRef = useRef(trainerState);
  const questionStartTimeRef = useRef(questionStartTime);
  const problemsLengthRef = useRef(problems.length);
  const onCompleteRef = useRef(onComplete);

  // Sync refs after render (refs must not be set during render per React compiler rules)
  useEffect(() => {
    currentProblemRef.current = currentProblem;
    patternRef.current = pattern;
    trainerStateRef.current = trainerState;
    questionStartTimeRef.current = questionStartTime;
    problemsLengthRef.current = problems.length;
    onCompleteRef.current = onComplete;
  });

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - trainerState.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [trainerState.startTime]);

  // Live evaluation
  const evalResult = useMemo(() => {
    if (!debouncedPattern || !currentProblem) return null;
    try {
      return evaluateRegex(
        debouncedPattern,
        currentProblem.sampleText,
        currentProblem.expectedMatches,
      );
    } catch {
      return null;
    }
  }, [debouncedPattern, currentProblem]);

  const userMatches: MatchRange[] = useMemo(() => evalResult?.userMatches ?? [], [evalResult]);
  const evalData = evalResult?.evaluation ?? null;
  const isCorrect = evalData?.isCorrect ?? false;
  const regexError = evalResult?.parsed?.error ?? null;

  // Keep userMatches ref in sync
  useEffect(() => {
    userMatchesRef.current = userMatches;
  });

  // Auto-advance on correct
  useEffect(() => {
    if (!isCorrect || !currentProblemRef.current) return;

    const timer = setTimeout(() => {
      const problem = currentProblemRef.current;
      const state = trainerStateRef.current;
      if (!problem) return;

      const timeTaken = (Date.now() - questionStartTimeRef.current) / 1000;
      const points = calculatePoints(true, timeTaken, state.streak, problem.difficulty);

      const record: RegexAnswerRecord = {
        problem,
        userPattern: patternRef.current,
        isCorrect: true,
        actualMatches: userMatchesRef.current,
        skipped: false,
        timeTaken,
        pointsEarned: points,
      };

      const newStreak = state.streak + 1;
      const newState: RegexTrainerState = {
        ...state,
        answers: [...state.answers, record],
        totalScore: state.totalScore + points,
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
        currentIndex: state.currentIndex + 1,
      };

      if (newState.currentIndex >= problemsLengthRef.current) {
        newState.endTime = Date.now();
        onCompleteRef.current(newState);
      } else {
        setTrainerState(newState);
        setPattern('');
        setQuestionStartTime(Date.now());
        setRevealedHintCount(0);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [isCorrect]);

  const handleSkip = useCallback(() => {
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    const record: RegexAnswerRecord = {
      problem: currentProblem,
      userPattern: pattern,
      isCorrect: false,
      actualMatches: userMatches,
      skipped: true,
      timeTaken,
      pointsEarned: 0,
    };

    const newState: RegexTrainerState = {
      ...trainerState,
      answers: [...trainerState.answers, record],
      streak: 0,
      currentIndex: trainerState.currentIndex + 1,
    };

    if (newState.currentIndex >= problems.length) {
      newState.endTime = Date.now();
      onComplete(newState);
    } else {
      setTrainerState(newState);
      setPattern('');
      setQuestionStartTime(Date.now());
      setRevealedHintCount(0);
    }
  }, [
    currentProblem,
    pattern,
    userMatches,
    questionStartTime,
    trainerState,
    problems.length,
    onComplete,
  ]);

  if (!currentProblem) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-800">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100">
              {trainerState.currentIndex + 1} / {problems.length}
            </div>
            <div className="text-xs text-zinc-500">Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 font-mono">
              {formatTime(elapsedSeconds)}
            </div>
            <div className="text-xs text-zinc-500">Timer</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {trainerState.totalScore.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-500">Score</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500">
            {trainerState.streak > 0 && '\uD83D\uDD25 '}
            {trainerState.streak}
          </div>
          <div className="text-xs text-zinc-500">Streak</div>
        </div>
      </div>

      {/* Problem Card */}
      <div
        className={`bg-zinc-900 rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ${
          isCorrect ? 'border-green-500 ring-2 ring-green-500/30' : 'border-zinc-800'
        }`}
      >
        {/* Problem Header */}
        <div className="border-b border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-zinc-100">{currentProblem.prompt}</h2>
            <DifficultyBadge difficulty={currentProblem.difficulty} />
          </div>
          {currentProblem.prompt && (
            <p className="text-sm text-zinc-400">{currentProblem.prompt}</p>
          )}
        </div>

        {/* Sample Text + Highlighting */}
        <div className="p-4 border-b border-zinc-800">
          <span className="block text-sm font-medium text-zinc-300 mb-2">Sample Text</span>
          <HighlightedText
            text={currentProblem.sampleText}
            userMatches={userMatches}
            expectedMatches={currentProblem.expectedMatches}
            showMissed={false}
          />
        </div>

        {/* Match Count */}
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            <span className="font-mono text-zinc-200">{userMatches.length}</span>
            {' / '}
            <span className="font-mono text-zinc-200">{currentProblem.expectedMatches.length}</span>
            {' matches found'}
          </span>
          {isCorrect && (
            <span className="text-sm text-green-400 font-medium">All matches correct!</span>
          )}
        </div>

        {/* Regex Input */}
        <div className="p-4">
          <RegexInput
            value={pattern}
            onChange={setPattern}
            error={regexError}
            isCorrect={isCorrect}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 bg-zinc-800/50 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleSkip}
            className="py-2.5 px-6 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Hints Drawer */}
      <HintsDrawer
        hints={currentProblem.hints || []}
        cheatsheet={REGEX_CHEATSHEET}
        mode="drill"
        revealedHintCount={revealedHintCount}
        onRevealHint={() => setRevealedHintCount((c) => c + 1)}
      />
    </div>
  );
}

// --- PracticePhase ---

interface PracticePhaseProps {
  problems: RegexProblem[];
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  language: string;
  onComplete: (state: RegexTrainerState) => void;
}

function PracticePhase({ problems, onComplete }: PracticePhaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pattern, setPattern] = useState('');
  const [answers, setAnswers] = useState<RegexAnswerRecord[]>([]);

  const debouncedPattern = useDebounce(pattern, 150);

  const currentProblem = problems[currentIndex];

  // Live evaluation
  const evalResult = useMemo(() => {
    if (!debouncedPattern || !currentProblem) return null;
    try {
      return evaluateRegex(
        debouncedPattern,
        currentProblem.sampleText,
        currentProblem.expectedMatches,
      );
    } catch {
      return null;
    }
  }, [debouncedPattern, currentProblem]);

  const userMatches: MatchRange[] = evalResult?.userMatches ?? [];
  const isCorrect = evalResult?.evaluation?.isCorrect ?? false;
  const regexError = evalResult?.parsed?.error ?? null;

  const handleShowSolution = () => {
    if (currentProblem.sampleSolutions && currentProblem.sampleSolutions.length > 0) {
      setPattern(currentProblem.sampleSolutions[0]);
    }
  };

  const handleNext = () => {
    const record: RegexAnswerRecord = {
      problem: currentProblem,
      userPattern: pattern,
      isCorrect,
      actualMatches: userMatches,
      skipped: false,
      timeTaken: 0,
      pointsEarned: 0,
    };
    const newAnswers = [...answers, record];
    setAnswers(newAnswers);

    if (currentIndex + 1 >= problems.length) {
      const finalState: RegexTrainerState = {
        currentIndex: problems.length,
        answers: newAnswers,
        totalScore: 0,
        streak: 0,
        maxStreak: 0,
        startTime: 0,
        endTime: Date.now(),
      };
      onComplete(finalState);
    } else {
      setCurrentIndex(currentIndex + 1);
      setPattern('');
    }
  };

  const handleFinish = () => {
    const finalState: RegexTrainerState = {
      currentIndex: currentIndex + 1,
      answers,
      totalScore: 0,
      streak: 0,
      maxStreak: 0,
      startTime: 0,
      endTime: Date.now(),
    };
    onComplete(finalState);
  };

  if (!currentProblem) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-800">
        <div className="text-center">
          <div className="text-2xl font-bold text-zinc-100">
            {currentIndex + 1} / {problems.length}
          </div>
          <div className="text-xs text-zinc-500">Progress</div>
        </div>
        <button
          type="button"
          onClick={handleFinish}
          className="py-2 px-4 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-medium rounded-lg transition-colors cursor-pointer text-sm"
        >
          Finish
        </button>
      </div>

      {/* Problem Card */}
      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        {/* Problem Header */}
        <div className="border-b border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-zinc-100">{currentProblem.prompt}</h2>
            <DifficultyBadge difficulty={currentProblem.difficulty} />
          </div>
          {currentProblem.prompt && (
            <p className="text-sm text-zinc-400">{currentProblem.prompt}</p>
          )}
        </div>

        {/* Sample Text + Highlighting */}
        <div className="p-4 border-b border-zinc-800">
          <span className="block text-sm font-medium text-zinc-300 mb-2">Sample Text</span>
          <HighlightedText
            text={currentProblem.sampleText}
            userMatches={userMatches}
            expectedMatches={currentProblem.expectedMatches}
            showMissed={true}
          />
        </div>

        {/* Match Count */}
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            <span className="font-mono text-zinc-200">{userMatches.length}</span>
            {' / '}
            <span className="font-mono text-zinc-200">{currentProblem.expectedMatches.length}</span>
            {' matches found'}
          </span>
          {isCorrect && (
            <span className="text-sm text-green-400 font-medium">All matches correct!</span>
          )}
        </div>

        {/* Regex Input */}
        <div className="p-4">
          <RegexInput
            value={pattern}
            onChange={setPattern}
            error={regexError}
            isCorrect={isCorrect}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 bg-zinc-800/50 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleShowSolution}
            className="py-2.5 px-6 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-600/30 font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            Show Solution
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer text-sm"
          >
            {currentIndex + 1 >= problems.length ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>

      {/* Hints Drawer */}
      <HintsDrawer
        hints={currentProblem.hints || []}
        cheatsheet={REGEX_CHEATSHEET}
        mode="practice"
        revealedHintCount={currentProblem.hints?.length ?? 0}
        onRevealHint={() => {}}
      />
    </div>
  );
}

// --- PlaygroundPhase ---

interface PlaygroundPhaseProps {
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  onBack: () => void;
}

function PlaygroundPhase({ onBack }: PlaygroundPhaseProps) {
  const [sampleText, setSampleText] = useState(
    'Hello, my email is john@example.com and my phone is (555) 123-4567.\nVisit https://www.example.com or http://test.org/page?id=42 for more info.\nThe quick brown fox jumps over the lazy dog. The price is $19.99.\nIP: 192.168.1.1 -- Date: 2024-01-15 -- Time: 14:30:00',
  );
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });

  const debouncedPattern = useDebounce(pattern, 150);

  const flagString = useMemo(() => {
    let f = '';
    if (flags.g) f += 'g';
    if (flags.i) f += 'i';
    if (flags.m) f += 'm';
    if (flags.s) f += 's';
    return f;
  }, [flags]);

  const { matches, error } = useMemo(() => {
    if (!debouncedPattern) return { matches: [] as MatchRange[], error: null };
    try {
      const regex = new RegExp(debouncedPattern, flagString);
      const matchRanges: MatchRange[] = [];
      let m: RegExpExecArray | null;

      if (flags.g) {
        m = regex.exec(sampleText);
        while (m !== null) {
          if (m[0].length === 0) {
            regex.lastIndex++;
            m = regex.exec(sampleText);
            continue;
          }
          matchRanges.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
          if (matchRanges.length > 500) break;
          m = regex.exec(sampleText);
        }
      } else {
        m = regex.exec(sampleText);
        if (m && m[0].length > 0) {
          matchRanges.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
        }
      }

      return { matches: matchRanges, error: null };
    } catch (e) {
      return {
        matches: [] as MatchRange[],
        error: e instanceof Error ? e.message : 'Invalid regex',
      };
    }
  }, [debouncedPattern, sampleText, flagString, flags.g]);

  const matchedStrings = useMemo(() => {
    return matches.slice(0, 20).map((m) => sampleText.slice(m.start, m.end));
  }, [matches, sampleText]);

  const toggleFlag = (flag: 'i' | 'm' | 's') => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Regex Playground</h1>
          <p className="text-sm text-zinc-400">Experiment with regular expressions freely</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors cursor-pointer text-sm border border-zinc-700"
        >
          Back to Setup
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Sample Text */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800">
              <span className="text-sm font-medium text-zinc-300">Sample Text</span>
            </div>
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full bg-transparent text-zinc-200 font-mono text-sm p-4 focus:outline-none resize-y min-h-[120px] placeholder-zinc-600"
              placeholder="Type or paste your sample text here..."
              rows={5}
            />
          </div>

          {/* Regex Input + Flags */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div
                  className={`flex items-center bg-zinc-800 rounded-lg border transition-all duration-200 ${
                    error
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
                  <span className="text-green-400 font-mono text-sm pr-4 pl-1 select-none">
                    {flagString}
                  </span>
                </div>
                {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
              </div>
            </div>

            {/* Flag Toggles */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 mr-1">Flags:</span>
              <button
                type="button"
                disabled
                className="px-2.5 py-1 text-xs font-mono rounded bg-green-600/20 text-green-400 border border-green-600/30 cursor-not-allowed"
              >
                g
              </button>
              {(['i', 'm', 's'] as const).map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => toggleFlag(f)}
                  className={`px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer ${
                    flags[f]
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:text-zinc-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Highlighted Text */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">Matches</span>
              <span className="text-sm text-zinc-400">
                <span className="font-mono text-zinc-200">{matches.length}</span> match
                {matches.length !== 1 ? 'es' : ''} found
              </span>
            </div>
            <div className="p-4">
              <HighlightedText
                text={sampleText}
                userMatches={matches}
                expectedMatches={[]}
                showMissed={false}
              />
            </div>
          </div>

          {/* Matched Strings List */}
          {matchedStrings.length > 0 && (
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800">
                <span className="text-sm font-medium text-zinc-300">
                  Matched Strings ({Math.min(matchedStrings.length, 20)}
                  {matches.length > 20 ? ` of ${matches.length}` : ''})
                </span>
              </div>
              <div className="p-4 space-y-1 max-h-48 overflow-y-auto">
                {matchedStrings.map((str, i) => (
                  <div
                    key={i}
                    className="font-mono text-sm text-green-400 bg-zinc-800 px-3 py-1.5 rounded"
                  >
                    &quot;{str}&quot;
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cheatsheet Sidebar */}
        <div className="space-y-4">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800">
              <span className="text-sm font-semibold text-zinc-200">Regex Cheatsheet</span>
            </div>
            <div className="p-3 max-h-[70vh] overflow-y-auto space-y-3">
              {(() => {
                const grouped = new Map<string, RegexCheatsheetEntry[]>();
                for (const entry of REGEX_CHEATSHEET) {
                  const cat = entry.category || 'General';
                  if (!grouped.has(cat)) grouped.set(cat, []);
                  grouped.get(cat)?.push(entry);
                }
                return Array.from(grouped.entries()).map(([category, entries]) => (
                  <div key={category}>
                    <h4 className="text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                      {category}
                    </h4>
                    {entries.map((entry, i) => (
                      <div
                        key={i}
                        className="flex items-baseline gap-2 py-1 px-1.5 rounded hover:bg-zinc-800/50"
                      >
                        <code className="text-green-400 font-mono text-xs whitespace-nowrap flex-shrink-0">
                          {entry.pattern}
                        </code>
                        <span className="text-zinc-500 text-xs">{entry.description}</span>
                      </div>
                    ))}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ResultsPhase ---

interface ResultsPhaseProps {
  state: RegexTrainerState;
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  onTryAgain: () => void;
  onChangeSettings: () => void;
  onBack: () => void;
  languageName: string;
}

function ResultsPhase({
  state,
  config,
  onTryAgain,
  onChangeSettings,
  onBack,
  languageName,
}: ResultsPhaseProps) {
  const [showMissed, setShowMissed] = useState(false);

  const totalQuestions = state.answers.length;
  const correctAnswers = state.answers.filter((a) => a.isCorrect && !a.skipped).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const avgTimeSeconds =
    totalQuestions > 0
      ? (state.answers.reduce((sum, a) => sum + a.timeTaken, 0) / totalQuestions).toFixed(1)
      : '0';

  const missedQuestions = state.answers.filter((a) => !a.isCorrect || a.skipped);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Drill Complete!</h1>
        <p className="text-zinc-400">Here is how you did</p>
      </div>

      {/* Score Highlight */}
      <div className={`rounded-xl p-8 text-center border ${config.borderColor} ${config.bgColor}`}>
        <div
          className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400`}
        >
          {state.totalScore.toLocaleString()}
        </div>
        <div className="text-sm text-zinc-400 mt-1 uppercase tracking-wider">Total Points</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-green-500">
            {correctAnswers} / {totalQuestions}
          </div>
          <div className="text-sm text-zinc-500 mt-1">Correct</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-blue-500">{accuracy}%</div>
          <div className="text-sm text-zinc-500 mt-1">Accuracy</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-zinc-100 font-mono">{avgTimeSeconds}s</div>
          <div className="text-sm text-zinc-500 mt-1">Avg Time</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 text-center shadow-sm border border-zinc-800">
          <div className="text-3xl font-bold text-orange-500">{state.maxStreak}</div>
          <div className="text-sm text-zinc-500 mt-1">Max Streak</div>
        </div>
      </div>

      {/* Missed Questions Review */}
      {missedQuestions.length > 0 && (
        <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowMissed(!showMissed)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <span className="font-semibold text-zinc-100">
              Review Missed Questions ({missedQuestions.length})
            </span>
            <span className="text-zinc-500">{showMissed ? '-' : '+'}</span>
          </button>
          {showMissed && (
            <div className="border-t border-zinc-800">
              {missedQuestions.map((record, index) => (
                <div key={index} className="p-4 border-b last:border-b-0 border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-zinc-100">{record.problem.prompt}</h4>
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
                  <p className="text-sm text-zinc-400 mb-3">{record.problem.prompt}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-zinc-500">Your pattern: </span>
                      <code className="bg-zinc-800 px-2 py-0.5 rounded text-red-400 font-mono border border-zinc-700">
                        {record.userPattern || '(empty)'}
                      </code>
                    </div>
                    {record.problem.sampleSolutions &&
                      record.problem.sampleSolutions.length > 0 && (
                        <div>
                          <span className="text-zinc-500">Sample solution: </span>
                          <code className="bg-zinc-800 px-2 py-0.5 rounded text-green-400 font-mono border border-zinc-700">
                            {record.problem.sampleSolutions[0]}
                          </code>
                        </div>
                      )}
                    <div>
                      <span className="text-zinc-500">Expected matches: </span>
                      <span className="text-zinc-300">
                        {record.problem.expectedMatches?.length ?? 0}
                      </span>
                    </div>
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
          type="button"
          onClick={onTryAgain}
          className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={onChangeSettings}
          className="flex-1 py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-xl transition-colors border border-zinc-700 cursor-pointer"
        >
          Change Settings
        </button>
      </div>
      <button
        type="button"
        onClick={onBack}
        className="w-full py-3 px-6 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-medium rounded-xl transition-colors border border-zinc-800 cursor-pointer text-sm"
      >
        Back to {languageName}
      </button>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function RegexPage() {
  const params = useParams();
  const router = useRouter();
  const languageParam = params.language as string;

  // ALL hooks must be called before any early returns (React rules of hooks)
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedProblems, setSelectedProblems] = useState<RegexProblem[]>([]);
  const [trainerResult, setTrainerResult] = useState<RegexTrainerState | null>(null);
  const [drillConfig, setDrillConfig] = useState<{
    categories: RegexCategory[];
    difficulty: Difficulty | 'mixed';
    count: number;
  } | null>(null);

  const validLanguage = isValidLanguage(languageParam);
  const language: SupportedLanguage = validLanguage
    ? languageParam
    : ('javascript' as SupportedLanguage);
  const config = LANGUAGE_CONFIG[language];

  const handleStartDrill = useCallback(
    (cats: RegexCategory[], diff: Difficulty | 'mixed', count: number) => {
      const problems = selectRegexProblems({
        categories: cats,
        difficulty: diff,
        questionCount: count,
        mode: 'drill',
      });
      if (problems.length === 0) {
        alert(
          'No regex problems available with the selected filters. Please adjust your selection.',
        );
        return;
      }
      setSelectedProblems(problems);
      setDrillConfig({ categories: cats, difficulty: diff, count });
      setPhase('drill');
    },
    [],
  );

  const handleStartPractice = useCallback(
    (cats: RegexCategory[], diff: Difficulty | 'mixed', count: number) => {
      const problems = selectRegexProblems({
        categories: cats,
        difficulty: diff,
        questionCount: count,
        mode: 'drill',
      });
      if (problems.length === 0) {
        alert(
          'No regex problems available with the selected filters. Please adjust your selection.',
        );
        return;
      }
      setSelectedProblems(problems);
      setDrillConfig({ categories: cats, difficulty: diff, count });
      setPhase('practice');
    },
    [],
  );

  const handleStartPlayground = useCallback(() => {
    setPhase('playground');
  }, []);

  const handleDrillComplete = useCallback(
    (state: RegexTrainerState) => {
      setTrainerResult(state);
      setPhase('results');

      // Save progress
      const correctAnswers = state.answers.filter((a) => a.isCorrect && !a.skipped).length;
      saveRegexProgress(language, {
        score: state.totalScore,
        totalQuestions: state.answers.length,
        correctAnswers,
        bestStreak: state.maxStreak,
      });
    },
    [language],
  );

  const handlePracticeComplete = useCallback((_state: RegexTrainerState) => {
    // Return to setup after practice
    setPhase('setup');
  }, []);

  const handleTryAgain = useCallback(() => {
    if (drillConfig) {
      const problems = selectRegexProblems({
        categories: drillConfig.categories,
        difficulty: drillConfig.difficulty,
        questionCount: drillConfig.count,
        mode: 'drill',
      });
      setSelectedProblems(problems);
      setPhase('drill');
    }
  }, [drillConfig]);

  const handleChangeSettings = useCallback(() => {
    setPhase('setup');
  }, []);

  const handleBackToLanguage = useCallback(() => {
    router.push(`/${language}`);
  }, [router, language]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: phase triggers scroll-to-top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [phase]);

  // Validate language parameter (after all hooks)
  if (!validLanguage) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-100 mb-4">Invalid Language</h1>
          <p className="text-zinc-400 mb-6">The specified language is not supported.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8 px-4">
      {/* Breadcrumbs */}
      <div className="max-w-3xl mx-auto mb-6">
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            Home
          </Link>
          <span className="text-zinc-600">/</span>
          <Link
            href={`/${language}`}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {config.name}
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">Regex Trainer</span>
        </nav>
      </div>

      {/* Phase Rendering */}
      {phase === 'setup' && (
        <SetupPhase
          config={config}
          onStartDrill={handleStartDrill}
          onStartPractice={handleStartPractice}
          onStartPlayground={handleStartPlayground}
        />
      )}

      {phase === 'drill' && selectedProblems.length > 0 && (
        <DrillPhase
          problems={selectedProblems}
          config={config}
          language={language}
          onComplete={handleDrillComplete}
        />
      )}

      {phase === 'practice' && selectedProblems.length > 0 && (
        <PracticePhase
          problems={selectedProblems}
          config={config}
          language={language}
          onComplete={handlePracticeComplete}
        />
      )}

      {phase === 'playground' && <PlaygroundPhase config={config} onBack={handleChangeSettings} />}

      {phase === 'results' && trainerResult && (
        <ResultsPhase
          state={trainerResult}
          config={config}
          onTryAgain={handleTryAgain}
          onChangeSettings={handleChangeSettings}
          onBack={handleBackToLanguage}
          languageName={config.name}
        />
      )}
    </div>
  );
}
