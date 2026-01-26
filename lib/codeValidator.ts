/**
 * Code validation logic for multi-language coding drills
 * Wraps the existing codeRunner for drill-specific validation
 */

import { deepEqual, executeJavaScript } from './codeRunner';
import type { Difficulty, LanguageId, Problem } from './types';

// ============================================================================
// Types for Drill Mode
// ============================================================================

export type DrillValidationResult =
  | { success: true; output: unknown }
  | { success: false; error: string; output?: unknown };

export interface DrillProblem extends Problem {
  // Extended problem with drill-specific fields
  language: LanguageId;
}

// Re-export types for convenience
export type { LanguageId, Problem, Difficulty };

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Normalizes Unicode arrow characters to ASCII arrows
 * Handles cases where users type ⇒ (Unicode) instead of => (ASCII)
 */
function normalizeArrows(code: string): string {
  return code
    .replace(/⇒/g, '=>') // Unicode arrow to ASCII
    .replace(/→/g, '=>') // Unicode right arrow to ASCII
    .replace(/⟹/g, '=>'); // Unicode double arrow to ASCII
}

// ============================================================================
// JavaScript/TypeScript Validation
// ============================================================================

/**
 * Validates JavaScript/TypeScript code by executing it
 */
export function validateJavaScript(
  setupCode: string,
  userAnswer: string,
  expectedOutput: unknown,
): DrillValidationResult {
  try {
    // Normalize Unicode arrow characters to ASCII before validation
    const normalizedAnswer = normalizeArrows(userAnswer);

    // Security: Basic check for dangerous operations
    const dangerousPatterns = [
      /\beval\s*\(/,
      /\bFunction\s*\(/,
      /\bimport\s*\(/,
      /\brequire\s*\(/,
      /\bprocess\b/,
      /\bglobal\b/,
      /\bwindow\b/,
      /\bdocument\b/,
      /\bfetch\s*\(/,
      /\bXMLHttpRequest\b/,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(normalizedAnswer)) {
        return {
          success: false,
          error:
            'Your answer contains forbidden patterns. Please use only basic JavaScript operations.',
        };
      }
    }

    // Construct the code that returns the user's expression result
    // This ensures the code is compiled and executed, not just parsed
    const fullCode = `return (${normalizedAnswer});`;

    // Use the existing executeJavaScript from codeRunner
    // This will compile and execute the code
    const result = executeJavaScript(setupCode, fullCode);

    if (!result.success) {
      // Provide more helpful error messages
      let errorMessage = result.error || 'Execution failed';

      // Check if it's a syntax error
      if (errorMessage.includes('Syntax') || errorMessage.includes('Unexpected')) {
        errorMessage = `Syntax error: ${errorMessage}. Please check your code for typos, missing brackets, or incorrect syntax.`;
      } else if (errorMessage.includes('is not defined')) {
        errorMessage = `${errorMessage}. Make sure you're using the variables provided in the setup code.`;
      } else if (errorMessage.includes('is not a function')) {
        errorMessage = `${errorMessage}. Check that you're calling the correct method name.`;
      }

      return {
        success: false,
        error: errorMessage,
        output: result.logs && result.logs.length > 0 ? result.logs.join('\n') : undefined,
      };
    }

    // Compare results using deepEqual from codeRunner
    if (deepEqual(result.result, expectedOutput)) {
      return { success: true, output: result.result };
    } else {
      return {
        success: false,
        error: 'Output does not match expected result',
        output: result.result,
      };
    }
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    return { success: false, error };
  }
}

// ============================================================================
// Pattern-based Validation (for non-executable languages)
// ============================================================================

/**
 * Checks if the answer uses the required patterns (prevents hardcoding)
 */
export function checkRequiredPatterns(
  userAnswer: string,
  requiredPatterns: RegExp[] | undefined,
  setupCode: string,
): DrillValidationResult | null {
  // Extract variable names from setup code
  const varMatches = setupCode.match(/(?:const|let|var)\s+(\w+)/g);
  const setupVars = varMatches?.map((m) => m.split(/\s+/)[1]) || [];

  // Check that user is using at least one setup variable
  const usesSetupVar = setupVars.some((varName) => {
    const regex = new RegExp(`\\b${varName}\\b`);
    return regex.test(userAnswer);
  });

  if (setupVars.length > 0 && !usesSetupVar) {
    return {
      success: false,
      error: 'Your answer must use the provided variables.',
    };
  }

  // Normalize Unicode arrow characters to ASCII before pattern matching
  const normalizedAnswer = normalizeArrows(userAnswer);

  // Normalize code for spacing variations (same as in codeRunner.ts)
  // This handles spacing variations like {age: 30} vs { age: 30 }
  const normalizeForPatterns = (code: string): string[] => {
    const versions: string[] = [code];
    // Minimal spacing version
    const minimal = code
      .replace(/\{\s+/g, '{')
      .replace(/\s+\}/g, '}')
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*\(\s*/g, '(')
      .replace(/\s*\)\s*/g, ')')
      .replace(/\s*\[\s*/g, '[')
      .replace(/\s*\]\s*/g, ']')
      .replace(/\$\s+/g, '$')
      .replace(/\s+/g, ' ')
      .trim();
    if (minimal !== code) versions.push(minimal);
    return versions;
  };

  const codeVersions = normalizeForPatterns(normalizedAnswer);

  // Check required patterns if provided
  // At least ONE pattern must match (not all of them)
  if (requiredPatterns && requiredPatterns.length > 0) {
    const atLeastOneMatches = requiredPatterns.some((pattern) =>
      codeVersions.some((version) => pattern.test(version)),
    );

    if (!atLeastOneMatches) {
      return {
        success: false,
        error: 'Your answer must use the expected method or pattern.',
      };
    }
  }

  return null;
}

/**
 * Validates Python code using pattern matching
 */
export function validatePython(
  _setupCode: string,
  userAnswer: string,
  expectedOutput: unknown,
  sampleSolution: string,
): DrillValidationResult {
  // Normalize whitespace for comparison
  const normalizedAnswer = userAnswer.trim().replace(/\s+/g, ' ');
  const normalizedSolution = sampleSolution.trim().replace(/\s+/g, ' ');

  if (normalizedAnswer === normalizedSolution) {
    return { success: true, output: expectedOutput };
  }

  // Try flexible regex matching
  const flexiblePattern = new RegExp(
    sampleSolution
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\s+/g, '\\s*')
      .replace(/\\\(/g, '\\s*\\(\\s*')
      .replace(/\\\)/g, '\\s*\\)\\s*'),
  );

  if (flexiblePattern.test(userAnswer)) {
    return { success: true, output: expectedOutput };
  }

  return {
    success: false,
    error: 'Output does not match expected result',
    output: userAnswer,
  };
}

/**
 * Validates code for non-executable languages using pattern matching
 */
export function validateByPattern(
  userAnswer: string,
  expectedOutput: unknown,
  sampleSolution: string,
): DrillValidationResult {
  const normalizedAnswer = userAnswer.trim();
  const normalizedSolution = sampleSolution.trim();

  if (normalizedAnswer === normalizedSolution) {
    return { success: true, output: expectedOutput };
  }

  // Try flexible matching (ignore extra whitespace)
  const flexibleAnswer = normalizedAnswer.replace(/\s+/g, ' ');
  const flexibleSolution = normalizedSolution.replace(/\s+/g, ' ');

  if (flexibleAnswer === flexibleSolution) {
    return { success: true, output: expectedOutput };
  }

  return {
    success: false,
    error: 'Output does not match expected result',
    output: userAnswer,
  };
}

// ============================================================================
// Main Validation Function
// ============================================================================

/**
 * Validates a drill answer based on language
 */
export function validateDrillAnswer(
  language: LanguageId,
  setupCode: string,
  userAnswer: string,
  expectedOutput: unknown,
  sampleSolution: string,
  validPatterns?: RegExp[],
): DrillValidationResult {
  // First check required patterns
  const patternCheck = checkRequiredPatterns(userAnswer, validPatterns, setupCode);
  if (patternCheck) {
    return patternCheck;
  }

  // Check for hardcoded answers (simple check)
  const expectedStr = JSON.stringify(expectedOutput);
  if (userAnswer.trim() === expectedStr || userAnswer.trim() === String(expectedOutput)) {
    // If the answer is just the literal expected value, reject it
    const setupVars = setupCode.match(/(?:const|let|var)\s+(\w+)/g);
    const usesSetupVar = setupVars?.some((v) => {
      const varName = v.split(/\s+/)[1];
      return userAnswer.includes(varName);
    });

    if (!usesSetupVar) {
      return {
        success: false,
        error:
          'Your answer appears to be hardcoded. Please write code that computes the result using the provided variables.',
      };
    }
  }

  // Route to language-specific validators
  switch (language) {
    case 'javascript':
    case 'typescript':
      return validateJavaScript(setupCode, userAnswer, expectedOutput);

    case 'python':
      return validatePython(setupCode, userAnswer, expectedOutput, sampleSolution);

    case 'java':
    case 'cpp':
    case 'csharp':
    case 'go':
    case 'ruby':
    case 'c':
    case 'php':
    case 'kotlin':
    case 'rust':
    case 'swift':
    case 'scala':
    case 'r':
    case 'perl':
    case 'lua':
    case 'haskell':
    case 'elixir':
    case 'dart':
    case 'clojure':
    // Database languages - use pattern matching since they can't be executed in browser
    case 'postgresql':
    case 'mysql':
    case 'mongodb':
      return validateByPattern(userAnswer, expectedOutput, sampleSolution);

    default:
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
  }
}

/**
 * Validates a Problem from the existing types
 */
export function validateProblemAnswer(
  problem: Problem,
  userAnswer: string,
  language: LanguageId,
): DrillValidationResult {
  return validateDrillAnswer(
    language,
    problem.setupCode,
    userAnswer,
    problem.expected,
    problem.sample,
    problem.validPatterns,
  );
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format output for display
 */
export function formatOutput(output: unknown): string {
  if (output === undefined) return 'undefined';
  if (output === null) return 'null';
  if (typeof output === 'string') return `"${output}"`;
  if (typeof output === 'object') {
    try {
      return JSON.stringify(output, null, 2);
    } catch {
      return String(output);
    }
  }
  return String(output);
}
