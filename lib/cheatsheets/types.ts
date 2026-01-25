/**
 * Cheatsheet Type Definitions
 *
 * Interview-focused, condensed method references for quick lookup.
 */

export type CheatsheetCategory =
  | 'arrays'
  | 'strings'
  | 'objects'
  | 'sets'
  | 'maps'
  | 'math'
  | 'sorting'
  | 'searching'
  | 'iteration'
  | 'functional'
  | 'type-conversion'
  | 'date-time'
  | 'regex'
  | 'io'
  | 'collections'
  | 'concurrency'
  | 'memory'
  | 'error-handling';

export type CheatsheetPriority = 'essential' | 'common' | 'useful';

export interface CheatsheetExample {
  code: string;
  output: string;
}

export interface CheatsheetEntry {
  /** Method or function name */
  name: string;
  /** Category for filtering */
  category: CheatsheetCategory;
  /** Syntax signature */
  syntax: string;
  /** Brief one-line description */
  description: string;
  /** Code example with output */
  example: CheatsheetExample;
  /** Big-O time complexity */
  timeComplexity: string;
  /** Big-O space complexity */
  spaceComplexity: string;
  /** Common pitfalls to avoid */
  gotchas?: string[];
  /** Tips for coding interviews */
  interviewTip?: string;
  /** How important for interviews */
  priority: CheatsheetPriority;
}
