/**
 * Core Type Definitions
 *
 * This file serves as the single source of truth for all type definitions
 * used across the data layer. Import types from here to avoid duplication.
 *
 * Architecture Decision: Centralized type definitions prevent:
 * - Type fragmentation across modules
 * - Inconsistent interface definitions
 * - Import confusion about which types to use
 */

// ============================================================================
// Language Types
// ============================================================================

export type LanguageId =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'csharp'
  | 'go'
  | 'ruby'
  | 'c'
  | 'php'
  | 'kotlin'
  | 'rust'
  | 'swift'
  | 'scala'
  | 'r'
  | 'perl'
  | 'lua'
  | 'haskell'
  | 'elixir'
  | 'dart'
  | 'clojure';

export interface Language {
  id: LanguageId;
  name: string;
  icon: string;
  color: string;
  secondaryColor: string;
  categories: string[];
  fileExtension: string;
  monacoLanguage: string;
}

// ============================================================================
// Difficulty Types (Unified)
// ============================================================================

/**
 * Standard difficulty levels for problems and drills.
 * Use this for user-facing content difficulty.
 */
export type ProblemDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Skill level for methods and exercises.
 * Use this for learning progression tracking.
 */
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * Legacy alias for backward compatibility.
 * @deprecated Use ProblemDifficulty or SkillLevel instead
 */
export type Difficulty = ProblemDifficulty;

// ============================================================================
// Method Reference Types
// ============================================================================

export interface MethodArgument {
  name: string;
  type: string;
  description: string;
  optional?: boolean;
  defaultValue?: string;
}

export interface MethodReturn {
  type: string;
  description: string;
}

export interface MethodExample {
  code: string;
  output: string;
  explanation?: string;
  title?: string;
}

export interface Method {
  name: string;
  category: string;
  syntax: string;
  description: string;
  arguments: MethodArgument[];
  returns: MethodReturn;
  examples: MethodExample[];
  timeComplexity?: string;
  spaceComplexity?: string;
  relatedMethods?: string[];
  sinceVersion?: string;
  notes?: string[];
  tips?: string[];
  commonMistakes?: string[];
}

// ============================================================================
// Problem Types
// ============================================================================

export interface Problem {
  id: string;
  category: string;
  difficulty: ProblemDifficulty;
  title: string;
  text: string;
  setup: string;
  setupCode: string;
  expected: unknown;
  sample: string;
  hints?: string[];
  validPatterns?: RegExp[];
  tags?: string[];
}

export interface TestCase {
  id: string;
  input: unknown[];
  expected: unknown;
  description?: string;
  isHidden?: boolean;
}

export interface ExecutableProblem extends Problem {
  testCases: TestCase[];
  requiredPatterns?: RegExp[];
  forbiddenPatterns?: RegExp[];
  timeLimit?: number;
  methodName?: string;
  solutionTemplate?: string;
  expectedSolution?: string;
}

// ============================================================================
// Exercise Types
// ============================================================================

export type ExerciseCategory =
  | 'traversal'
  | 'iteration-patterns'
  | 'recursion'
  | 'generation'
  | 'searching'
  | 'data-structures';

export interface ExerciseTestCase {
  input: unknown;
  expected: unknown;
  description: string;
}

export interface Exercise {
  id: string;
  title: string;
  category: ExerciseCategory;
  difficulty: SkillLevel;
  description: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  testCases: ExerciseTestCase[];
  hints: string[];
  concepts: string[];
  timeLimit?: number;
}

// ============================================================================
// Quiz Types
// ============================================================================

export interface QuizQuestion {
  id: string;
  input: string;
  output: string;
  correctMethod: string;
  options: string[];
  difficulty: ProblemDifficulty;
  explanation?: string;
  category?: string;
  methodHint?: string;
}

export interface QuizConfig {
  language: LanguageId;
  categories: string[];
  questionCount: number; // 1-30
  timePerQuestion: number; // 5-60 seconds, supports slider
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
  timeSpent: number;
  points: number;
}

export interface QuizResult {
  totalScore: number;
  basePoints: number;
  bonusPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  averageTime: number;
  fastestAnswer: number;
  slowestAnswer: number;
  maxStreak: number;
  totalTime: number;
}

// ============================================================================
// Execution Types
// ============================================================================

export type ErrorType =
  | 'syntax'
  | 'runtime'
  | 'timeout'
  | 'reference'
  | 'type'
  | 'range'
  | 'assertion'
  | 'unknown';

export interface ExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  errorType?: ErrorType;
  executionTime?: number;
  logs?: string[];
}

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  input: unknown[];
  expected: unknown;
  actual?: unknown;
  error?: string;
  executionTime?: number;
  isHidden?: boolean;
}

export type AntiCheatType =
  | 'literal_output'
  | 'no_method_usage'
  | 'no_setup_usage'
  | 'hardcoded_values'
  | 'forbidden_pattern'
  | 'copy_paste_detected';

export interface AntiCheatFlag {
  type: AntiCheatType;
  message: string;
  severity: 'warning' | 'error';
}

export interface ValidationResult {
  valid: boolean;
  passed: number;
  failed: number;
  total: number;
  feedback: string;
  details: TestCaseResult[];
  antiCheatFlags?: AntiCheatFlag[];
  suggestions?: string[];
  executionTime?: number;
}

// ============================================================================
// User Progress Types (Unified)
// ============================================================================

export interface CategoryProgress {
  category: string;
  attempted: number;
  correct: number;
  lastAttempted?: string;
}

export interface SessionResult {
  id: string;
  date: string;
  duration: number;
  totalProblems: number;
  correctAnswers: number;
  accuracy: number;
  streak: number;
  category?: string;
  difficulty?: ProblemDifficulty;
}

export interface DrillStats {
  totalAttempted: number;
  totalCorrect: number;
  bestStreak: number;
  currentStreak: number;
  categoryStats: Record<string, CategoryProgress>;
  recentSessions: SessionResult[];
}

export interface QuizStats {
  highScore: number;
  totalPlayed: number;
  avgAccuracy: number;
  bestStreak: number;
  totalQuestions: number;
  totalCorrect: number;
}

export interface LanguageProgress {
  drillStats: DrillStats;
  quizStats: QuizStats;
  lastPlayed: string;
}

export interface UserProgress {
  [language: string]: LanguageProgress;
}

// ============================================================================
// User Settings Types
// ============================================================================

export interface UserSettings {
  preferredDifficulty: ProblemDifficulty | 'mixed';
  soundEffects: boolean;
  timerMode: 'up' | 'down' | 'none';
  timerDuration: number;
  theme: 'light' | 'dark' | 'system';
  showHints: boolean;
  autoAdvance: boolean;
  sessionLength: number;
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface TestRunnerConfig {
  maxExecutionTime: number;
  runCount: number;
  randomizeSeed?: number;
  captureConsole?: boolean;
  strictMode?: boolean;
}

export interface ComparisonOptions {
  ignoreCase?: boolean;
  trimStrings?: boolean;
  floatTolerance?: number;
  arrayOrderMatters?: boolean;
  deepEquality?: boolean;
}

export interface ErrorHint {
  pattern: RegExp;
  hint: string;
  documentation?: string;
}

// ============================================================================
// Aggregate Types
// ============================================================================

export interface LanguageProblems {
  languageId: LanguageId;
  problems: Problem[];
}

export interface LanguageMethods {
  languageId: LanguageId;
  methods: Method[];
}

export interface ProblemAttempt {
  odaysssId: string;
  problemId: string;
  code: string;
  isCorrect: boolean;
  timestamp: Date;
  timeSpentMs: number;
}

export interface TestRunResults {
  allPassed: boolean;
  passRate: number;
  totalRuns: number;
  results: ValidationResult[];
  averageExecutionTime: number;
  summary: string;
}

export interface ProblemVariation {
  testCases: TestCase[];
  setupCode: string;
  seed: number;
}
