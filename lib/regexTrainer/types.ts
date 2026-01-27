import type { Difficulty } from '@/lib/types';

export interface MatchRange {
  start: number;
  end: number;
  text: string;
}

export type RegexCategory =
  | 'Character Classes'
  | 'Quantifiers'
  | 'Anchors'
  | 'Groups & Alternation'
  | 'Lookaround'
  | 'Common Patterns'
  | 'Escaping & Special';

export interface RegexProblem {
  id: string;
  category: RegexCategory;
  difficulty: Difficulty;
  title: string;
  prompt: string;
  sampleText: string;
  expectedMatches: MatchRange[];
  hints: string[];
  sampleSolutions: string[];
  tags?: string[];
}

export interface RegexTrainerConfig {
  categories: RegexCategory[];
  difficulty: Difficulty | 'mixed';
  questionCount: number;
  mode: 'drill' | 'practice';
}

export interface RegexAnswerRecord {
  problem: RegexProblem;
  userPattern: string;
  isCorrect: boolean;
  actualMatches: MatchRange[];
  timeTaken: number;
  pointsEarned: number;
  skipped: boolean;
}

export interface RegexTrainerState {
  currentIndex: number;
  answers: RegexAnswerRecord[];
  streak: number;
  maxStreak: number;
  startTime: number;
  endTime?: number;
  totalScore: number;
}

export interface RegexCheatsheetEntry {
  pattern: string;
  description: string;
  example?: string;
  category: RegexCategory;
}

export interface EvaluationResult {
  isCorrect: boolean;
  falsePositives: MatchRange[];
  missedMatches: MatchRange[];
  correctMatches: MatchRange[];
  userMatches: MatchRange[];
}
