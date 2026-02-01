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

// ─── Cheatsheet Types ─────────────────────────────────────────

export type CheatsheetSectionId =
  | 'overview'
  | 'core-concepts'
  | 'key-apis'
  | 'common-patterns'
  | 'code-examples'
  | 'ecosystem';

/** Plain text paragraph. */
export interface CheatsheetTextBlock {
  type: 'text';
  content: string;
}

/** Static syntax-highlighted code block (rendered with <pre><code>). */
export interface CheatsheetCodeBlock {
  type: 'code';
  language: string;
  code: string;
  title?: string;
}

/** Interactive Monaco editor example with local state + reset. */
export interface CheatsheetInteractiveCodeBlock {
  type: 'interactive-code';
  language: string;
  defaultCode: string;
  title: string;
  description?: string;
}

/** Bulleted or numbered list. */
export interface CheatsheetListBlock {
  type: 'list';
  style: 'bullet' | 'numbered';
  items: string[];
}

/** Simple table with header row + data rows. */
export interface CheatsheetTableBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
}

/** Highlighted tip callout. */
export interface CheatsheetTipBlock {
  type: 'tip';
  content: string;
}

/** Warning callout. */
export interface CheatsheetWarningBlock {
  type: 'warning';
  content: string;
}

/** Sub-heading within a section. */
export interface CheatsheetSubheadingBlock {
  type: 'subheading';
  text: string;
}

/** Discriminated union of all content block types. */
export type CheatsheetContentBlock =
  | CheatsheetTextBlock
  | CheatsheetCodeBlock
  | CheatsheetInteractiveCodeBlock
  | CheatsheetListBlock
  | CheatsheetTableBlock
  | CheatsheetTipBlock
  | CheatsheetWarningBlock
  | CheatsheetSubheadingBlock;

/** A single section within a cheatsheet. */
export interface CheatsheetSection {
  id: CheatsheetSectionId;
  title: string;
  icon: string;
  description: string;
  content: CheatsheetContentBlock[];
}

/** Top-level cheatsheet data for one framework. */
export interface CheatsheetData {
  framework: FrameworkId;
  title: string;
  lastUpdated: string;
  sections: CheatsheetSection[];
}
