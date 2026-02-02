/**
 * Code validation logic for multi-language coding drills
 * Wraps the existing codeRunner for drill-specific validation
 */

import {
  deepEqual,
  executeJavaScript,
  isHardcodedOutput,
  stripTypeScriptAnnotations,
} from './codeRunner';
import type { Difficulty, LanguageId, Problem } from './types';

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

    // Strip TypeScript type annotations before execution
    // TypeScript syntax is not valid JavaScript, so we need to remove type annotations
    const sanitizedAnswer = stripTypeScriptAnnotations(normalizedAnswer);
    // Don't strip types from setupCode — it's developer-authored JavaScript
    // that should never contain TypeScript annotations. The stripper's return-type
    // regex can corrupt ternary operators after function calls (e.g.
    // `init() : init` looks like `) : ReturnType`), so skipping is safest.
    const sanitizedSetupCode = setupCode;

    // Construct the code that returns the user's expression result
    // This ensures the code is compiled and executed, not just parsed
    // Handle both expressions and statements properly
    const trimmedAnswer = sanitizedAnswer.trim();
    let fullCode: string;

    // If the answer is already a return statement, use it as-is
    if (trimmedAnswer.startsWith('return ')) {
      fullCode = trimmedAnswer;
    } else {
      // Check if code contains TOP-LEVEL statements (const, let, var, etc.)
      // Statement keywords inside nested { } blocks (e.g. inside IIFEs or
      // arrow function bodies) should NOT cause the code to be treated as
      // multi-statement. We track brace depth to distinguish top-level from nested.
      const statementPattern =
        /^(const |let |var |function |class |if |for |while |switch |try |do |throw )/;

      const hasTopLevelStatements = (() => {
        // Quick check: if the very first line is a statement, it's multi-statement
        if (statementPattern.test(trimmedAnswer)) return true;

        // Walk lines tracking brace/bracket depth to find top-level statements
        let depth = 0;
        const lines = trimmedAnswer.split('\n');
        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line) continue;

          // At depth 0, a statement keyword means real top-level statement
          if (depth === 0 && statementPattern.test(line)) return true;

          // Track brace depth (handles { } nesting in arrow functions, IIFEs, etc.)
          for (const ch of line) {
            if (ch === '{' || ch === '(' || ch === '[') depth++;
            else if (ch === '}' || ch === ')' || ch === ']') depth--;
          }
        }
        return false;
      })();

      const hasStatements = hasTopLevelStatements;

      if (hasStatements) {
        // Multi-statement code: execute all lines, return value of last expression
        const lines = trimmedAnswer
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l.length > 0 && !l.startsWith('//'));
        const lastLine = lines[lines.length - 1];
        const precedingLines = lines.slice(0, -1).join('\n');

        // If last line is a variable declaration, return the variable
        const constMatch = lastLine.match(/^(?:const|let|var)\s+(\w+)\s*=/);
        if (constMatch) {
          fullCode = `${precedingLines}\n${lastLine}\nreturn ${constMatch[1]};`;
        } else if (statementPattern.test(lastLine)) {
          // Last line is also a statement (function def, if, etc.) — run everything, return undefined
          fullCode = trimmedAnswer;
        } else if (lastLine.endsWith(';')) {
          fullCode = `${precedingLines}\nreturn (${lastLine.slice(0, -1)});`;
        } else {
          fullCode = `${precedingLines}\nreturn (${lastLine});`;
        }
      } else {
        // Pure expression — always wrap in parens so object literals are not
        // parsed as blocks (e.g. `{ a: 1 }` without parens is a block + label)
        if (trimmedAnswer.endsWith(';')) {
          fullCode = `return (${trimmedAnswer.slice(0, -1)});`;
        } else {
          fullCode = `return (${trimmedAnswer});`;
        }
      }
    }

    // Use the existing executeJavaScript from codeRunner
    // This will compile and execute the code
    // Note: executeJavaScript will also strip TypeScript annotations, but we do it here too for safety
    const result = executeJavaScript(sanitizedSetupCode, fullCode, {
      stripTypes: false, // Type annotations already stripped above
    });

    if (!result.success) {
      // Provide more helpful error messages
      let errorMessage = result.error || 'Execution failed';

      // Check if it's a syntax error
      // Avoid duplicating "Syntax error:" prefix if already present
      if (errorMessage.includes('Syntax') || errorMessage.includes('Unexpected')) {
        if (!errorMessage.startsWith('Syntax error:')) {
          errorMessage = `Syntax error: ${errorMessage}. Please check your code for typos, missing brackets, or incorrect syntax.`;
        } else {
          // Already has "Syntax error:" prefix, just ensure it has helpful message
          if (!errorMessage.includes('Please check')) {
            errorMessage = `${errorMessage} Please check your code for typos, missing brackets, or incorrect syntax.`;
          }
        }
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
    // This accepts ANY solution that produces the correct output
    // Multiple different approaches are accepted (map, reduce, for loops, etc.)
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
 * Also performs basic syntax validation to ensure code compiles
 */
export function checkRequiredPatterns(
  userAnswer: string,
  requiredPatterns: RegExp[] | undefined,
  setupCode: string,
): DrillValidationResult | null {
  // CRITICAL: Check basic syntax first (bracket balance, quotes, etc.)
  // This ensures code compiles/is valid before pattern matching
  const bracketIssues = checkBasicSyntax(userAnswer);
  if (bracketIssues.length > 0) {
    return {
      success: false,
      error: `Syntax errors detected: ${bracketIssues.join('; ')}. Please fix syntax errors before submitting.`,
    };
  }

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
 * Check basic syntax (brackets, quotes) - universal for all languages
 */
function checkBasicSyntax(code: string): string[] {
  const issues: string[] = [];
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    // Skip strings and comments
    if (char === '"' || char === "'" || char === '`') {
      const quote = char;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\') i++; // Skip escaped characters
        i++;
      }
      continue;
    }
    if (char === '/' && code[i + 1] === '/') {
      // Skip single-line comment
      while (i < code.length && code[i] !== '\n') i++;
      continue;
    }
    if (char === '/' && code[i + 1] === '*') {
      // Skip multi-line comment
      i += 2;
      while (i < code.length - 1 && !(code[i] === '*' && code[i + 1] === '/')) i++;
      i++;
      continue;
    }

    if (char in pairs) {
      stack.push(pairs[char]);
    } else if (char === ')' || char === ']' || char === '}') {
      if (stack.length === 0 || stack.pop() !== char) {
        issues.push(`Mismatched bracket: ${char}`);
        return issues; // Return early on mismatch
      }
    }
  }

  if (stack.length > 0) {
    issues.push(`Unclosed brackets: ${stack.join(', ')}`);
  }

  return issues;
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
  // Check for hardcoded output first
  if (isHardcodedOutput(userAnswer, expectedOutput)) {
    // Extract setup variables
    const setupVars = _setupCode.match(/^(\w+)\s*=/gm)?.map((m) => m.split(/\s*=/)[0]) || [];
    const usesSetupVar = setupVars.some((v) => userAnswer.includes(v));

    if (!usesSetupVar && setupVars.length > 0) {
      return {
        success: false,
        error:
          'Your answer appears to be hardcoded. Please write code that computes the result using the provided variables.',
      };
    }
  }

  // Normalize whitespace for comparison
  const normalizedAnswer = userAnswer.trim().replace(/\s+/g, ' ');
  const normalizedSolution = sampleSolution.trim().replace(/\s+/g, ' ');

  if (normalizedAnswer === normalizedSolution) {
    return { success: true, output: expectedOutput };
  }

  // Try flexible regex matching to accept multiple valid solutions
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
 * ACCEPTS MULTIPLE SOLUTIONS: Uses flexible pattern matching to allow variations
 * This enables different approaches to solve the same problem
 *
 * IMPORTANT: This function assumes syntax validation has already been performed
 * by checkRequiredPatterns or the calling function. Syntax errors should be caught
 * before pattern matching.
 */
export function validateByPattern(
  userAnswer: string,
  expectedOutput: unknown,
  sampleSolution: string,
): DrillValidationResult {
  const normalizedAnswer = userAnswer.trim();
  const normalizedSolution = sampleSolution.trim();

  // Exact match
  if (normalizedAnswer === normalizedSolution) {
    return { success: true, output: expectedOutput };
  }

  // Try flexible matching (ignore extra whitespace)
  const flexibleAnswer = normalizedAnswer.replace(/\s+/g, ' ');
  const flexibleSolution = normalizedSolution.replace(/\s+/g, ' ');

  if (flexibleAnswer === flexibleSolution) {
    return { success: true, output: expectedOutput };
  }

  // Try flexible regex matching (allows variations in syntax)
  // This accepts multiple valid approaches, not just the exact sample
  const flexiblePattern = new RegExp(
    sampleSolution
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\s+/g, '\\s*')
      .replace(/\\\(/g, '\\s*\\(\\s*')
      .replace(/\\\)/g, '\\s*\\)\\s*'),
    'i',
  );

  if (flexiblePattern.test(normalizedAnswer)) {
    return { success: true, output: expectedOutput };
  }

  return {
    success: false,
    error: 'Output does not match expected result. Try a different approach.',
    // Don't return user's code as output for database languages - we can't execute queries
    // output: undefined means the UI won't show "Your Output" section
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

  // For database languages: if validPatterns were provided and matched (patternCheck is null),
  // return success immediately with expected output
  const isDatabaseLanguage =
    language === 'postgresql' || language === 'mysql' || language === 'mongodb';
  if (isDatabaseLanguage && validPatterns && validPatterns.length > 0) {
    // Patterns matched (patternCheck is null), return success
    return { success: true, output: expectedOutput };
  }

  // Enhanced hardcoded answer detection
  const expectedStr = JSON.stringify(expectedOutput);
  const normalizedAnswer = userAnswer.trim();

  // Check if answer is just the literal expected value
  if (normalizedAnswer === expectedStr || normalizedAnswer === String(expectedOutput)) {
    // Extract setup variables from setup code
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

  // Additional check: look for return statements with literal expected values
  // This catches cases like: return [1, 2, 3] when expected is [1, 2, 3]
  const patternParts = [escapeRegex(String(expectedOutput))];
  if (expectedStr) {
    patternParts.push(escapeRegex(expectedStr));
  }

  const returnLiteralPattern = new RegExp(`return\\s*(${patternParts.join('|')})`, 'i');
  if (returnLiteralPattern.test(normalizedAnswer)) {
    // Allow if setup variables are used in the code
    const setupVars = setupCode.match(/(?:const|let|var)\s+(\w+)/g);
    const usesSetupVar = setupVars?.some((v) => {
      const varName = v.split(/\s+/)[1];
      return userAnswer.includes(varName);
    });

    if (!usesSetupVar && setupVars && setupVars.length > 0) {
      return {
        success: false,
        error:
          'Your answer appears to return a hardcoded value. Please write code that computes the result using the provided variables.',
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
      // Fall back to sample solution matching if no validPatterns or patterns didn't match
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
 *
 * ACCEPTS MULTIPLE SOLUTIONS across all languages:
 * - JavaScript/TypeScript: Executes code and compares output using deepEqual
 *   (accepts ANY solution that produces correct output: map, reduce, for loops, etc.)
 * - Python: Uses flexible regex pattern matching (accepts variations of sample)
 * - Pattern-based languages: Matches at least ONE valid pattern (not all)
 *   (allows different approaches: different operators, syntax variations, etc.)
 * - Database languages: Matches at least ONE valid pattern OR flexible sample matching
 *   (accepts different query styles: different operators, syntax variations, etc.)
 *
 * This ensures users can solve problems using their preferred approach.
 */
export function validateProblemAnswer(
  problem: Problem,
  userAnswer: string,
  language: LanguageId,
): DrillValidationResult {
  // For JavaScript/TypeScript: Code is executed and any solution producing correct output is accepted
  // For other languages: Pattern matching allows multiple valid approaches
  // Anti-hardcoding checks ensure users don't just return literal values

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
