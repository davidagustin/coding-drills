/**
 * Core type definitions for the multi-language coding drills application
 */

export type LanguageId =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'csharp'
  | 'go'
  | 'ruby'
  | 'c';

export type Difficulty = 'easy' | 'medium' | 'hard';

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

export interface Problem {
  id: string;
  category: string;
  difficulty: Difficulty;
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

export interface Argument {
  name: string;
  type: string;
  description: string;
  optional?: boolean;
  defaultValue?: string;
}

export interface ReturnType {
  type: string;
  description: string;
}

export interface Example {
  code: string;
  output: string;
  explanation?: string;
}

export interface Method {
  name: string;
  category: string;
  syntax: string;
  description: string;
  arguments: Argument[];
  returns: ReturnType;
  examples: Example[];
  timeComplexity?: string;
  spaceComplexity?: string;
  relatedMethods?: string[];
  sinceVersion?: string;
  notes?: string[];
}

export interface QuizQuestion {
  id: string;
  input: string;
  output: string;
  correctMethod: string;
  options: string[];
  difficulty: Difficulty;
  explanation?: string;
  category?: string;
  methodHint?: string;  // Hint about the method type (e.g., "Array method", "Object method")
}

export interface UserProgress {
  odaysssId: string;
  completedProblems: string[];
  scores: Record<string, number>;
  streakDays: number;
  lastActive: Date;
  preferredLanguages: LanguageId[];
}

export interface ProblemAttempt {
  odaysssId: string;
  problemId: string;
  code: string;
  isCorrect: boolean;
  timestamp: Date;
  timeSpentMs: number;
}

export interface LanguageProblems {
  languageId: LanguageId;
  problems: Problem[];
}

export interface LanguageMethods {
  languageId: LanguageId;
  methods: Method[];
}

export interface CategoryStats {
  category: string;
  total: number;
  completed: number;
  accuracy: number;
}

export interface DifficultyDistribution {
  easy: number;
  medium: number;
  hard: number;
}

// ============================================================
// Code Execution and Validation Types
// ============================================================

// Test case definition for validation
export interface TestCase {
  id: string;
  input: unknown[];
  expected: unknown;
  description?: string;
  isHidden?: boolean; // Hidden test cases for anti-cheat
}

// Extended Problem interface for code execution
export interface ExecutableProblem extends Problem {
  testCases: TestCase[];
  requiredPatterns?: RegExp[];
  forbiddenPatterns?: RegExp[];
  timeLimit?: number;
  methodName?: string;
  solutionTemplate?: string;
  expectedSolution?: string;
}

// Execution result from running code
export interface ExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  errorType?: ErrorType;
  executionTime?: number;
  logs?: string[];
}

// Types of errors that can occur
export type ErrorType =
  | 'syntax'
  | 'runtime'
  | 'timeout'
  | 'reference'
  | 'type'
  | 'range'
  | 'assertion'
  | 'unknown';

// Validation result for code checking
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

// Result for individual test case
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

// Anti-cheat detection flags
export interface AntiCheatFlag {
  type: AntiCheatType;
  message: string;
  severity: 'warning' | 'error';
}

export type AntiCheatType =
  | 'literal_output'
  | 'no_method_usage'
  | 'no_setup_usage'
  | 'hardcoded_values'
  | 'forbidden_pattern'
  | 'copy_paste_detected';

// Configuration for code comparison
export interface ComparisonOptions {
  ignoreCase?: boolean;
  trimStrings?: boolean;
  floatTolerance?: number;
  arrayOrderMatters?: boolean;
  deepEquality?: boolean;
}

// Error hint mapping
export interface ErrorHint {
  pattern: RegExp;
  hint: string;
  documentation?: string;
}

// Test runner configuration
export interface TestRunnerConfig {
  maxExecutionTime: number;
  runCount: number;
  randomizeSeed?: number;
  captureConsole?: boolean;
  strictMode?: boolean;
}

// Aggregated test run results
export interface TestRunResults {
  allPassed: boolean;
  passRate: number;
  totalRuns: number;
  results: ValidationResult[];
  averageExecutionTime: number;
  summary: string;
}

// Problem variation for randomized testing
export interface ProblemVariation {
  testCases: TestCase[];
  setupCode: string;
  seed: number;
}
