/**
 * Type definitions for the Frontend Drills feature.
 * Covers 4 frameworks: Native JS, React, Angular, Vue.
 */

import type { Difficulty } from '../types';

export type FrameworkId = 'native-js' | 'react' | 'angular' | 'vue';

export type FrontendCategory =
  | 'DOM & Events'
  | 'State & Lifecycle'
  | 'Common Patterns'
  | 'Rendering'
  | 'Data Fetching'
  | 'Forms & Validation';

/**
 * Drill problem — compatible with the existing Problem shape so we can
 * reuse validateProblemAnswer() from codeValidator.ts.
 */
export interface FrontendDrillProblem {
  id: string;
  framework: FrameworkId;
  category: FrontendCategory;
  difficulty: Difficulty;
  title: string;
  /** Prompt text shown to the user. */
  text: string;
  /** Human-readable description of the setup code. */
  setup: string;
  /** Code that runs before the user's answer (provides variables, mocks, etc.). */
  setupCode: string;
  /** Expected output value for validation. */
  expected: unknown;
  /** Sample solution shown after attempt. */
  sample: string;
  hints?: string[];
  /** Regex patterns for pattern-based validation (Angular decorator syntax, etc.). */
  validPatterns?: RegExp[];
  /** Override the editor language (e.g. 'html' for Angular template problems). */
  editorLanguage?: string;
  tags?: string[];
}

/**
 * Quiz question — simpler multiple-choice format.
 */
export interface FrontendQuizQuestion {
  id: string;
  framework: FrameworkId;
  category: FrontendCategory;
  difficulty: Difficulty;
  question: string;
  /** Optional code snippet shown alongside the question. */
  codeSnippet?: string;
  /** Four answer options. */
  options: string[];
  /** The correct answer (must be one of the options). */
  correctAnswer: string;
  /** Explanation shown after answering. */
  explanation: string;
}
