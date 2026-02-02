/**
 * Interview-recommended flashcard configuration.
 *
 * Determines which flashcards are marked as interview-recommended
 * based on source type and content.
 *
 * - Methods: Curated per-language sets of commonly tested method names
 * - Complexity: ALL marked (complexity analysis is core interview skill)
 * - Patterns: ALL marked (algorithm patterns ARE interview prep)
 * - Frontend: ALL marked (framework knowledge is standard interview fare)
 */

import type { FlashcardSource } from './types';

// JavaScript methods commonly tested in interviews
const JS_INTERVIEW_METHODS = new Set([
  // Array essentials
  'map',
  'filter',
  'reduce',
  'forEach',
  'find',
  'findIndex',
  'some',
  'every',
  'sort',
  'slice',
  'splice',
  'push',
  'pop',
  'shift',
  'unshift',
  'concat',
  'join',
  'includes',
  'indexOf',
  'flat',
  'flatMap',
  'fill',
  'from',
  'isArray',
  'reverse',
  'entries',
  'keys',
  'values',
  // String essentials
  'split',
  'substring',
  'replace',
  'replaceAll',
  'trim',
  'toLowerCase',
  'toUpperCase',
  'charAt',
  'charCodeAt',
  'startsWith',
  'endsWith',
  'repeat',
  'padStart',
  'padEnd',
  'match',
  'search',
  // Object essentials
  'Object.keys',
  'Object.values',
  'Object.entries',
  'Object.assign',
  'Object.freeze',
  'Object.create',
  'hasOwnProperty',
  // JSON
  'JSON.parse',
  'JSON.stringify',
  // Promise
  'Promise.all',
  'Promise.allSettled',
  'Promise.race',
  'Promise.any',
  'then',
  'catch',
  'finally',
  // Map/Set
  'set',
  'get',
  'has',
  'delete',
  'clear',
  'add',
  'size',
]);

// TypeScript methods commonly tested in interviews (superset of JS)
const TS_INTERVIEW_METHODS = new Set([
  ...JS_INTERVIEW_METHODS,
  // TS-specific commonly tested
  'keyof',
  'typeof',
  'as',
  'is',
  'satisfies',
  'Partial',
  'Required',
  'Pick',
  'Omit',
  'Record',
  'Readonly',
  'Extract',
  'Exclude',
  'ReturnType',
  'Parameters',
]);

// Python methods commonly tested in interviews
const PYTHON_INTERVIEW_METHODS = new Set([
  'append',
  'extend',
  'insert',
  'remove',
  'pop',
  'sort',
  'sorted',
  'reverse',
  'reversed',
  'map',
  'filter',
  'reduce',
  'zip',
  'enumerate',
  'range',
  'len',
  'min',
  'max',
  'sum',
  'any',
  'all',
  'join',
  'split',
  'strip',
  'replace',
  'find',
  'count',
  'keys',
  'values',
  'items',
  'get',
  'update',
  'setdefault',
  'add',
  'union',
  'intersection',
  'difference',
  'list',
  'dict',
  'set',
  'tuple',
  'isinstance',
  'issubclass',
  'hasattr',
  'getattr',
  'lambda',
  'comprehension',
]);

const INTERVIEW_METHODS: Record<string, Set<string>> = {
  javascript: JS_INTERVIEW_METHODS,
  typescript: TS_INTERVIEW_METHODS,
  python: PYTHON_INTERVIEW_METHODS,
};

/**
 * Returns true if a method name is interview-recommended for the given language.
 * For languages without curated lists, returns true (conservative — includes all).
 */
export function isMethodInterviewRecommended(language: string, methodName: string): boolean {
  const methodSet = INTERVIEW_METHODS[language];
  if (!methodSet) return true; // No curated list = include all
  // Check exact match and also check if method name ends with the interview method
  // (handles cases like "Array.prototype.map" → check "map")
  const baseName = methodName.split('.').pop() ?? methodName;
  return methodSet.has(methodName) || methodSet.has(baseName);
}

/**
 * Returns true if a flashcard should be marked as interview-recommended.
 * - method: checks against curated per-language method sets
 * - complexity: always true (core interview skill)
 * - pattern: always true (algorithm patterns = interview prep)
 * - frontend: always true (framework knowledge = interview standard)
 */
export function isFlashcardInterviewRecommended(
  source: FlashcardSource,
  context: { language?: string; methodName?: string },
): boolean {
  switch (source) {
    case 'method':
      return isMethodInterviewRecommended(
        context.language ?? 'javascript',
        context.methodName ?? '',
      );
    case 'time-complexity':
    case 'space-complexity':
    case 'pattern':
    case 'frontend':
      return true;
  }
}
