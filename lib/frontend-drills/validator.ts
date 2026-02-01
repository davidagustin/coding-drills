/**
 * Validation wrapper for Frontend Drills.
 *
 * Routes problems through the existing codeValidator infrastructure.
 * - Native JS, React, Vue: Validated as JavaScript via validateProblemAnswer()
 * - Angular: Uses validPatterns (regex) since decorator syntax can't execute as JS
 */

import {
  checkRequiredPatterns,
  type DrillValidationResult,
  validateJavaScript,
} from '../codeValidator';
import type { FrontendDrillProblem } from './types';

/**
 * Validate a frontend drill answer.
 *
 * Maps the FrontendDrillProblem to the existing Problem shape and delegates
 * to the appropriate validator.
 */
export function validateFrontendDrillAnswer(
  problem: FrontendDrillProblem,
  userAnswer: string,
): DrillValidationResult {
  // Angular problems use regex-based validation because decorator
  // syntax can't execute as JavaScript.
  if (
    problem.framework === 'angular' &&
    problem.validPatterns &&
    problem.validPatterns.length > 0
  ) {
    const patternResult = checkRequiredPatterns(
      userAnswer,
      problem.validPatterns,
      problem.setupCode,
    );
    if (patternResult) {
      return patternResult; // Failed pattern check
    }
    // Patterns matched — success
    return { success: true, output: problem.expected };
  }

  // For Native JS, React, and Vue: run as JavaScript.
  // The setupCode provides mock functions (useState, ref, etc.) so the
  // user's code can be evaluated as plain JS.
  return validateJavaScript(problem.setupCode, userAnswer, problem.expected);
}
