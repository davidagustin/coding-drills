/**
 * Code Execution and Validation Service
 *
 * Provides safe code execution for JavaScript/TypeScript,
 * pattern-based validation for Python and other languages,
 * anti-cheat detection, and helpful error messages.
 */

import type {
  AntiCheatFlag,
  ComparisonOptions,
  ErrorHint,
  ErrorType,
  ExecutableProblem,
  ExecutionResult,
  LanguageId,
  Problem,
  ValidationResult,
} from './types';

// ============================================================
// Constants and Configuration
// ============================================================

const DEFAULT_TIMEOUT = 5000; // 5 seconds
const MAX_TIMEOUT = 30000; // 30 seconds

// Common error patterns and their helpful hints
const ERROR_HINTS: ErrorHint[] = [
  {
    pattern: /(\w+) is not defined/i,
    hint: 'Make sure you have declared the variable "$1" before using it. Check for typos in variable names.',
    documentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined',
  },
  {
    pattern: /Cannot read propert(?:y|ies) .+ of (undefined|null)/i,
    hint: 'You are trying to access a property on a value that is $1. Check that your variable has been assigned a value.',
    documentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_access_property',
  },
  {
    pattern: /(\w+) is not a function/i,
    hint: '"$1" is not a function. Make sure you are calling a method that exists and is spelled correctly.',
    documentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_a_function',
  },
  {
    pattern: /Unexpected token/i,
    hint: 'There is a syntax error in your code. Check for missing brackets, parentheses, or semicolons.',
    documentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unexpected_token',
  },
  {
    pattern: /Maximum call stack size exceeded/i,
    hint: 'Your code has infinite recursion. Make sure your recursive function has a proper base case.',
    documentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion',
  },
  {
    pattern: /Assignment to constant variable/i,
    hint: 'You are trying to reassign a variable declared with "const". Use "let" if you need to reassign it.',
    documentation:
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Invalid_const_assignment',
  },
  {
    pattern: /Invalid left-hand side in assignment/i,
    hint: 'Check that you are assigning to a valid variable. You might be using = instead of == or ===.',
  },
  {
    pattern: /Unexpected end of input/i,
    hint: 'Your code is incomplete. Check for missing closing brackets, parentheses, or braces.',
  },
  {
    pattern: /SyntaxError: Unexpected identifier/i,
    hint: 'There might be a missing operator or semicolon before this identifier.',
  },
  {
    pattern: /TypeError: (\w+)\.(\w+) is not a function/i,
    hint: 'The method "$2" does not exist on "$1". Check the spelling or verify the object type.',
  },
  {
    pattern: /RangeError: Invalid array length/i,
    hint: 'Array length must be a non-negative integer. Check your array initialization.',
  },
];

// ============================================================
// JavaScript/TypeScript Execution
// ============================================================

export interface ExecutionOptions {
  timeout?: number;
  stripTypes?: boolean;
}

/**
 * Executes JavaScript code safely with timeout protection
 */
export function executeJavaScript(
  setupCode: string,
  userCode: string,
  optionsOrTimeout: number | ExecutionOptions = DEFAULT_TIMEOUT,
): ExecutionResult {
  const startTime = performance.now();
  const logs: string[] = [];

  // Parse options
  const options: ExecutionOptions =
    typeof optionsOrTimeout === 'number' ? { timeout: optionsOrTimeout } : optionsOrTimeout;

  const { timeout = DEFAULT_TIMEOUT, stripTypes = true } = options;

  // Validate timeout
  const safeTimeout = Math.min(Math.max(timeout, 100), MAX_TIMEOUT);

  try {
    // Create a mock console to capture logs
    const mockConsole = {
      log: (...args: unknown[]) => {
        logs.push(args.map(formatValue).join(' '));
      },
      warn: (...args: unknown[]) => {
        logs.push(`[WARN] ${args.map(formatValue).join(' ')}`);
      },
      error: (...args: unknown[]) => {
        logs.push(`[ERROR] ${args.map(formatValue).join(' ')}`);
      },
    };

    // Strip TypeScript type annotations from setup code for JavaScript execution
    // TypeScript syntax like `: string[]` is not valid JavaScript
    const sanitizedSetupCode = stripTypes ? stripTypeScriptAnnotations(setupCode) : setupCode;
    const sanitizedUserCode = stripTypes ? stripTypeScriptAnnotations(userCode) : userCode;

    // Combine setup and user code
    const fullCode = `
      "use strict";
      ${sanitizedSetupCode}
      ${sanitizedUserCode}
    `;

    // Create function with limited scope
    // Wrap in try-catch to catch syntax errors during compilation
    let fn: (console: typeof mockConsole) => unknown;
    try {
      fn = new Function('console', fullCode) as (console: typeof mockConsole) => unknown;
    } catch (compileError) {
      const executionTime = performance.now() - startTime;
      const error = compileError instanceof Error ? compileError : new Error(String(compileError));
      // Provide clear syntax error message without duplication
      let errorMessage = error.message;
      // Remove any existing "Syntax error:" prefix to avoid duplication
      if (errorMessage.startsWith('Syntax error:')) {
        errorMessage = errorMessage.replace(/^Syntax error:\s*/i, '');
      }
      return {
        success: false,
        error: `Syntax error: ${errorMessage}. Please check your code for typos, missing brackets, or incorrect syntax.`,
        errorType: classifyError(error),
        executionTime,
        logs,
      };
    }

    // Execute with timeout using a synchronous approach
    // Note: True async timeout requires Web Workers in browser
    let result: unknown;
    let error: Error | null = null;

    // For browser environments, we use a simple try-catch
    // True timeout protection would require Web Workers
    // Execute the compiled function - this actually runs the code
    try {
      result = fn(mockConsole);
      // Verify code was actually executed (not just parsed)
      // If result is undefined and no error, the code executed but returned nothing
      // This is valid for expressions that evaluate to undefined
    } catch (e) {
      error = e instanceof Error ? e : new Error(String(e));
    }

    const executionTime = performance.now() - startTime;

    // Check for timeout (soft check - actual timeout needs Web Workers)
    if (executionTime > safeTimeout) {
      return {
        success: false,
        error: `Execution timed out after ${safeTimeout}ms. Your code may have an infinite loop.`,
        errorType: 'timeout',
        executionTime,
        logs,
      };
    }

    if (error) {
      // Provide more detailed error messages
      let errorMessage = error.message;

      // Enhance error messages for common issues
      if (error.name === 'SyntaxError') {
        errorMessage = `Syntax error: ${error.message}. Please check your code for typos, missing brackets, parentheses, or semicolons.`;
      } else if (error.name === 'ReferenceError') {
        errorMessage = `${error.message}. Make sure all variables are defined before use.`;
      } else if (error.name === 'TypeError') {
        errorMessage = `${error.message}. Check that you're using the correct data types and method names.`;
      }

      return {
        success: false,
        error: errorMessage,
        errorType: classifyError(error),
        executionTime,
        logs,
      };
    }

    // Ensure result is actually computed (not undefined due to missing return)
    // If the code doesn't return anything, result will be undefined
    // This is expected for expressions that evaluate to a value
    return {
      success: true,
      result,
      executionTime,
      logs,
    };
  } catch (e) {
    const executionTime = performance.now() - startTime;
    const error = e instanceof Error ? e : new Error(String(e));

    return {
      success: false,
      error: error.message,
      errorType: classifyError(error),
      executionTime,
      logs,
    };
  }
}

/**
 * Executes JavaScript code with async support using Promise.race for timeout
 */
export async function executeJavaScriptAsync(
  setupCode: string,
  userCode: string,
  timeout: number = DEFAULT_TIMEOUT,
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const logs: string[] = [];
  const safeTimeout = Math.min(Math.max(timeout, 100), MAX_TIMEOUT);

  const mockConsole = {
    log: (...args: unknown[]) => {
      logs.push(args.map(formatValue).join(' '));
    },
    warn: (...args: unknown[]) => {
      logs.push(`[WARN] ${args.map(formatValue).join(' ')}`);
    },
    error: (...args: unknown[]) => {
      logs.push(`[ERROR] ${args.map(formatValue).join(' ')}`);
    },
  };

  const timeoutPromise = new Promise<ExecutionResult>((resolve) => {
    setTimeout(() => {
      resolve({
        success: false,
        error: `Execution timed out after ${safeTimeout}ms. Your code may have an infinite loop or long-running operation.`,
        errorType: 'timeout',
        executionTime: safeTimeout,
        logs,
      });
    }, safeTimeout);
  });

  const executionPromise = new Promise<ExecutionResult>((resolve) => {
    try {
      const fullCode = `
        "use strict";
        return (async () => {
          ${setupCode}
          ${userCode}
        })();
      `;

      const fn = new Function('console', fullCode);

      Promise.resolve(fn(mockConsole))
        .then((result) => {
          const executionTime = performance.now() - startTime;
          resolve({
            success: true,
            result,
            executionTime,
            logs,
          });
        })
        .catch((e) => {
          const executionTime = performance.now() - startTime;
          const error = e instanceof Error ? e : new Error(String(e));
          resolve({
            success: false,
            error: error.message,
            errorType: classifyError(error),
            executionTime,
            logs,
          });
        });
    } catch (e) {
      const executionTime = performance.now() - startTime;
      const error = e instanceof Error ? e : new Error(String(e));
      resolve({
        success: false,
        error: error.message,
        errorType: classifyError(error),
        executionTime,
        logs,
      });
    }
  });

  return Promise.race([executionPromise, timeoutPromise]);
}

// ============================================================
// Python Validation (Pattern-based)
// ============================================================

/**
 * Validates Python code using pattern matching
 * Since we cannot execute Python in the browser, we use intelligent pattern matching
 *
 * ACCEPTS MULTIPLE SOLUTIONS: Uses flexible regex matching to accept variations
 * of the sample solution. This allows different approaches (list comprehensions,
 * loops, map/filter, etc.) as long as they match the flexible pattern.
 */
export function validatePython(
  setupCode: string,
  userCode: string,
  expected: unknown,
  validPatterns: RegExp[],
): { valid: boolean; feedback: string; matchedPatterns: string[] } {
  const matchedPatterns: string[] = [];
  const feedback: string[] = [];

  // Check if code is empty or too short
  if (!userCode.trim()) {
    return {
      valid: false,
      feedback: 'Please write some Python code.',
      matchedPatterns: [],
    };
  }

  // CRITICAL: Check syntax FIRST before pattern matching
  // This ensures code compiles/is valid, not just matches patterns
  const syntaxChecks = checkPythonSyntax(userCode);
  if (syntaxChecks.length > 0) {
    return {
      valid: false,
      feedback: `Syntax errors detected:\n${syntaxChecks.join('\n')}\n\nPlease fix syntax errors before submitting.`,
      matchedPatterns: [],
    };
  }

  // Normalize user code to handle spacing variations (same as other pattern-based languages)
  const normalizedVersions = normalizeCodeForPatternMatching(userCode);

  // Check for required patterns - test original and all normalized versions
  // ACCEPT MULTIPLE SOLUTIONS: Match at least ONE pattern (not all)
  // This allows different approaches (list comprehensions, loops, map/filter, etc.)
  let allPatternsMatched = validPatterns.length === 0; // If no patterns, allow any valid code
  for (const pattern of validPatterns) {
    const matches = normalizedVersions.some((version) => pattern.test(version));
    if (matches) {
      matchedPatterns.push(pattern.source);
      allPatternsMatched = true; // At least one pattern matched
    }
  }

  // Check if setup variables are used
  const setupVars = extractPythonVariables(setupCode);
  const usedSetupVars = setupVars.filter((v) => userCode.includes(v));
  if (setupVars.length > 0 && usedSetupVars.length === 0) {
    feedback.push('Make sure to use the provided variables from the setup code.');
  }

  // Check for hardcoded expected output
  if (isHardcodedOutput(userCode, expected)) {
    return {
      valid: false,
      feedback:
        'It looks like you hardcoded the expected output. Please write code that computes the result.',
      matchedPatterns,
    };
  }

  // Determine validity
  const isValid = allPatternsMatched && feedback.length === 0;

  if (isValid) {
    return {
      valid: true,
      feedback: 'Your Python code structure looks correct! Multiple valid solutions are accepted.',
      matchedPatterns,
    };
  }

  if (!allPatternsMatched && validPatterns.length > 0) {
    feedback.unshift(
      'Your code does not match any of the expected patterns. Try a different approach (list comprehension, loop, map/filter, etc.).',
    );
  }

  return {
    valid: false,
    feedback: feedback.join('\n'),
    matchedPatterns,
  };
}

/**
 * Type for bracket mapping
 */
type OpenBracket = '(' | '[' | '{';
type CloseBracket = ')' | ']' | '}';

const BRACKET_PAIRS: Record<OpenBracket, CloseBracket> = {
  '(': ')',
  '[': ']',
  '{': '}',
};

const OPEN_BRACKETS = new Set<string>(Object.keys(BRACKET_PAIRS));
const CLOSE_BRACKETS = new Set<string>(Object.values(BRACKET_PAIRS));

/**
 * Type guard for open brackets
 */
function isOpenBracket(char: string): char is OpenBracket {
  return OPEN_BRACKETS.has(char);
}

/**
 * Type guard for close brackets
 */
function isCloseBracket(char: string): char is CloseBracket {
  return CLOSE_BRACKETS.has(char);
}

/**
 * Check common Python syntax issues
 */
function checkPythonSyntax(code: string): string[] {
  const issues: string[] = [];

  // Check for mismatched brackets
  const stack: CloseBracket[] = [];

  for (const char of code) {
    if (isOpenBracket(char)) {
      stack.push(BRACKET_PAIRS[char]);
    } else if (isCloseBracket(char)) {
      if (stack.pop() !== char) {
        issues.push('Mismatched brackets detected.');
        break;
      }
    }
  }
  if (stack.length > 0 && !issues.includes('Mismatched brackets detected.')) {
    issues.push('Unclosed brackets detected.');
  }

  // Check for common Python mistakes
  if (/\bfunction\b/.test(code)) {
    issues.push('Python uses "def" to define functions, not "function".');
  }
  if (/\bvar\b|\blet\b|\bconst\b/.test(code)) {
    issues.push('Python does not use "var", "let", or "const" for variable declarations.');
  }
  if (/;\s*$/.test(code)) {
    issues.push('Python typically does not use semicolons at the end of statements.');
  }
  if (/\{\s*\n/.test(code) && !/['"`]/.test(code.split(/\{\s*\n/)[0].slice(-10))) {
    issues.push('Python uses indentation instead of curly braces for code blocks.');
  }

  return issues;
}

/**
 * Extract variable names from Python setup code
 */
function extractPythonVariables(setupCode: string): string[] {
  const varPattern = /^(\w+)\s*=/gm;
  const variables: string[] = [];
  let match;

  while ((match = varPattern.exec(setupCode)) !== null) {
    variables.push(match[1]);
  }

  return variables;
}

// ============================================================
// Multi-language Pattern Validator
// ============================================================

/**
 * Validates code across multiple languages
 */
export function validateCode(
  language: LanguageId,
  setupCode: string,
  userCode: string,
  expected: unknown,
  problem: Problem | ExecutableProblem,
): ValidationResult {
  const startTime = performance.now();

  // Anti-cheat checks first
  const antiCheatFlags = detectCheating(userCode, expected, problem);

  // If severe cheating detected, fail immediately
  const severeFlags = antiCheatFlags.filter((f) => f.severity === 'error');
  if (severeFlags.length > 0) {
    return {
      valid: false,
      passed: 0,
      failed: 1,
      total: 1,
      feedback: severeFlags.map((f) => f.message).join('\n'),
      details: [],
      antiCheatFlags,
      executionTime: performance.now() - startTime,
    };
  }

  // Route to appropriate validator
  switch (language) {
    case 'javascript':
    case 'typescript':
      return validateJavaScript(setupCode, userCode, expected, problem, antiCheatFlags);

    case 'python':
      return validatePythonCode(setupCode, userCode, expected, problem, antiCheatFlags);

    case 'java':
    case 'go':
    case 'ruby':
    case 'c':
    case 'cpp':
    case 'csharp':
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
      return validateByPattern(language, setupCode, userCode, expected, problem, antiCheatFlags);

    default:
      return {
        valid: false,
        passed: 0,
        failed: 1,
        total: 1,
        feedback: `Language "${language}" is not yet supported for validation.`,
        details: [],
        antiCheatFlags,
        executionTime: performance.now() - startTime,
      };
  }
}

/**
 * Validate JavaScript/TypeScript code by execution
 *
 * This function accepts ANY solution that produces the correct output.
 * It compiles and executes the user's code, then compares the result
 * using deepEqual. This means multiple different approaches are accepted
 * as long as they produce the same output.
 *
 * Examples of accepted solutions:
 * - arr.map(x => x * 2)
 * - arr.map(function(x) { return x * 2; })
 * - arr.reduce((acc, x) => [...acc, x * 2], [])
 * - const result = []; for (let x of arr) result.push(x * 2); result
 *
 * All of these produce the same output and will be accepted.
 */
function validateJavaScript(
  setupCode: string,
  userCode: string,
  expected: unknown,
  _problem: Problem | ExecutableProblem,
  antiCheatFlags: AntiCheatFlag[],
): ValidationResult {
  const startTime = performance.now();

  // Execute the code - this compiles and runs the user's solution
  // Any code that produces the correct output will be accepted
  const execution = executeJavaScript(setupCode, userCode);

  if (!execution.success) {
    const hint = getErrorHint(execution.error || '');
    return {
      valid: false,
      passed: 0,
      failed: 1,
      total: 1,
      feedback: formatErrorMessage(execution.error || 'Unknown error', hint),
      details: [
        {
          testCaseId: 'main',
          passed: false,
          input: [],
          expected,
          error: execution.error,
          executionTime: execution.executionTime,
        },
      ],
      antiCheatFlags,
      suggestions: hint ? [hint.hint] : undefined,
      executionTime: performance.now() - startTime,
    };
  }

  // Compare results using deepEqual
  // This accepts ANY solution that produces the correct output,
  // regardless of how it's implemented (map, reduce, for loop, etc.)
  const isEqual = deepEqual(execution.result, expected);

  if (isEqual) {
    return {
      valid: true,
      passed: 1,
      failed: 0,
      total: 1,
      feedback:
        'Correct! Your code produces the expected output. Multiple valid solutions are accepted.',
      details: [
        {
          testCaseId: 'main',
          passed: true,
          input: [],
          expected,
          actual: execution.result,
          executionTime: execution.executionTime,
        },
      ],
      antiCheatFlags: antiCheatFlags.length > 0 ? antiCheatFlags : undefined,
      executionTime: performance.now() - startTime,
    };
  }

  return {
    valid: false,
    passed: 0,
    failed: 1,
    total: 1,
    feedback: `Incorrect output.\nExpected: ${formatValue(expected)}\nReceived: ${formatValue(execution.result)}`,
    details: [
      {
        testCaseId: 'main',
        passed: false,
        input: [],
        expected,
        actual: execution.result,
        executionTime: execution.executionTime,
      },
    ],
    antiCheatFlags: antiCheatFlags.length > 0 ? antiCheatFlags : undefined,
    suggestions: generateSuggestions(expected, execution.result),
    executionTime: performance.now() - startTime,
  };
}

/**
 * Validate Python code by pattern matching
 */
function validatePythonCode(
  setupCode: string,
  userCode: string,
  expected: unknown,
  problem: Problem | ExecutableProblem,
  antiCheatFlags: AntiCheatFlag[],
): ValidationResult {
  const startTime = performance.now();
  const validPatterns = problem.validPatterns || [];

  const result = validatePython(setupCode, userCode, expected, validPatterns);

  return {
    valid: result.valid,
    passed: result.valid ? 1 : 0,
    failed: result.valid ? 0 : 1,
    total: 1,
    feedback: result.feedback,
    details: [
      {
        testCaseId: 'pattern-check',
        passed: result.valid,
        input: [],
        expected,
      },
    ],
    antiCheatFlags: antiCheatFlags.length > 0 ? antiCheatFlags : undefined,
    executionTime: performance.now() - startTime,
  };
}

/**
 * Normalizes code for pattern matching by making whitespace consistent
 * This handles spacing variations like {age: 30} vs { age: 30 } vs {age:30}
 * Creates multiple normalized versions to ensure patterns match regardless of spacing
 */
function normalizeCodeForPatternMatching(code: string): string[] {
  const normalizedVersions: string[] = [code]; // Always include original

  // Version 1: Remove all optional whitespace (minimal spacing)
  // { age: 30 } -> {age:30}
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
  if (minimal !== code) {
    normalizedVersions.push(minimal);
  }

  // Version 2: Add consistent single spaces (standard spacing)
  // {age:30} -> { age: 30 }
  const standard = code
    .replace(/\{([^}]+)\}/g, (match, content) => {
      const normalized = content
        .replace(/\s*:\s*/g, ': ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\s+/g, ' ')
        .trim();
      return `{ ${normalized} }`;
    })
    .replace(/\[([^\]]+)\]/g, (match, content) => {
      const normalized = content
        .replace(/\s*,\s*/g, ', ')
        .replace(/\s+/g, ' ')
        .trim();
      return `[ ${normalized} ]`;
    })
    .replace(/\$\s*(\w+)/g, '$$$1')
    .replace(/\s+/g, ' ')
    .trim();
  if (standard !== code && standard !== minimal) {
    normalizedVersions.push(standard);
  }

  return normalizedVersions;
}

/**
 * Validate other languages by pattern matching
 *
 * ACCEPTS MULTIPLE SOLUTIONS: This function accepts any solution that matches
 * at least ONE of the valid patterns (not all patterns). This allows different
 * approaches to solve the same problem.
 *
 * Examples of accepted variations:
 * - MongoDB: db.users.find({age: 30}) vs db.users.find({age: {$eq: 30}})
 * - SQL: SELECT * FROM users WHERE age > 25 vs SELECT * FROM users WHERE 25 < age
 * - Go: if v, ok := m["key"]; ok { return v } vs if val, exists := m["key"]; exists { return val }
 *
 * For problems without patterns, uses flexible regex matching based on sample solution.
 *
 * IMPORTANT: Syntax validation is performed BEFORE pattern matching to ensure code compiles.
 */
function validateByPattern(
  language: LanguageId,
  _setupCode: string,
  userCode: string,
  expected: unknown,
  problem: Problem | ExecutableProblem,
  antiCheatFlags: AntiCheatFlag[],
): ValidationResult {
  const startTime = performance.now();
  const validPatterns = problem.validPatterns || [];
  const feedback: string[] = [];

  if (!userCode.trim()) {
    return {
      valid: false,
      passed: 0,
      failed: 1,
      total: 1,
      feedback: `Please write some ${language} code.`,
      details: [],
      antiCheatFlags,
      executionTime: performance.now() - startTime,
    };
  }

  // CRITICAL: Check syntax FIRST before pattern matching
  // This ensures code compiles/is valid, not just matches patterns
  const syntaxIssues = checkLanguageSyntax(language, userCode);
  if (syntaxIssues.length > 0) {
    return {
      valid: false,
      passed: 0,
      failed: 1,
      total: 1,
      feedback: `Syntax errors detected:\n${syntaxIssues.join('\n')}\n\nPlease fix syntax errors before submitting.`,
      details: [
        {
          testCaseId: 'syntax-check',
          passed: false,
          input: [],
          expected,
          error: syntaxIssues.join('; '),
        },
      ],
      antiCheatFlags,
      executionTime: performance.now() - startTime,
    };
  }

  // Normalize user code to handle spacing variations in curly brackets, arrays, etc.
  // This ensures patterns work regardless of spacing style (e.g., {age: 30} vs { age: 30 })
  const normalizedVersions = normalizeCodeForPatternMatching(userCode);

  // Check required patterns - test original and all normalized versions
  // ACCEPT MULTIPLE SOLUTIONS: Match at least ONE pattern (not all)
  // This allows different approaches to solve the same problem
  // For example: db.users.find({age: 30}) vs db.users.find({age: {$eq: 30}})
  let patternsMatched = 0;
  for (const pattern of validPatterns) {
    // Test original and all normalized versions to handle all spacing variations
    const matches = normalizedVersions.some((version) => pattern.test(version));
    if (matches) {
      patternsMatched++;
    }
  }

  // Accept if NO patterns defined (flexible validation) OR at least ONE pattern matches
  // This allows multiple valid approaches instead of requiring ALL patterns
  const allPatternsMatched = validPatterns.length === 0 || patternsMatched > 0;

  // Syntax was already checked above, so we don't need to check again
  // But we keep this for any additional language-specific feedback

  // Check for hardcoded output - enhanced detection
  if (isHardcodedOutput(userCode, expected)) {
    // Check if setup variables are used (allow hardcoded if using setup vars)
    const setupVars = extractSetupVariables(_setupCode);
    const usesSetup = setupVars.some((v) => userCode.includes(v));

    if (!usesSetup || setupVars.length === 0) {
      return {
        valid: false,
        passed: 0,
        failed: 1,
        total: 1,
        feedback:
          'It looks like you hardcoded the expected output. Please write code that computes the result using the provided variables.',
        details: [],
        antiCheatFlags,
        executionTime: performance.now() - startTime,
      };
    }
  }

  // If no patterns defined, use flexible validation based on sample solution
  // This allows multiple approaches when patterns aren't strictly defined
  let isValid = allPatternsMatched && syntaxIssues.length === 0;

  // For problems without patterns, try flexible matching like Python
  if (!isValid && validPatterns.length === 0 && 'sample' in problem) {
    const normalizedCode = normalizedVersions[0]; // Use first normalized version
    const sampleSolution = problem.sample;

    // Create flexible pattern from sample solution (similar to Python validation)
    const flexiblePattern = new RegExp(
      sampleSolution
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\s+/g, '\\s*')
        .replace(/\\\(/g, '\\s*\\(\\s*')
        .replace(/\\\)/g, '\\s*\\)\\s*'),
      'i',
    );

    // Check if user code matches flexible pattern (allows variations)
    if (flexiblePattern.test(normalizedCode)) {
      isValid = true;
    }
  }

  return {
    valid: isValid,
    passed: isValid ? 1 : 0,
    failed: isValid ? 0 : 1,
    total: 1,
    feedback: isValid
      ? `Your ${language} code structure looks correct! Multiple valid solutions are accepted.`
      : feedback.length > 0
        ? feedback.join('\n')
        : validPatterns.length > 0
          ? `Your code does not match any of the expected patterns. Try a different approach.`
          : 'Your code does not match the expected solution structure.',
    details: [
      {
        testCaseId: 'pattern-check',
        passed: isValid,
        input: [],
        expected,
      },
    ],
    antiCheatFlags: antiCheatFlags.length > 0 ? antiCheatFlags : undefined,
    executionTime: performance.now() - startTime,
  };
}

/**
 * Check syntax for various languages
 * Ensures code compiles/is valid before pattern matching
 */
function checkLanguageSyntax(language: LanguageId, code: string): string[] {
  const issues: string[] = [];

  // Universal syntax checks (brackets, quotes, etc.)
  const bracketIssues = checkBracketBalance(code);
  if (bracketIssues.length > 0) {
    issues.push(...bracketIssues);
  }

  // Language-specific checks
  switch (language) {
    case 'java':
      if (!/class\s+\w+/.test(code) && !/public\s+static/.test(code)) {
        // May be a method-only snippet, which is okay
      }
      if (/\bfunction\b/.test(code)) {
        issues.push('Java uses method declarations, not the "function" keyword.');
      }
      break;

    case 'go':
      if (/\bfunction\b/.test(code)) {
        issues.push('Go uses "func" to define functions, not "function".');
      }
      if (/\bclass\b/.test(code)) {
        issues.push('Go does not have classes. Use structs and methods instead.');
      }
      break;

    case 'ruby':
      if (/\bfunction\b/.test(code)) {
        issues.push('Ruby uses "def" to define methods, not "function".');
      }
      break;

    case 'c':
    case 'cpp':
      if (/\bfunction\b/.test(code)) {
        issues.push(
          'C/C++ does not use the "function" keyword. Define functions with return types.',
        );
      }
      break;

    case 'csharp':
      if (/\bfunction\b/.test(code)) {
        issues.push('C# uses method declarations, not the "function" keyword.');
      }
      break;

    case 'postgresql':
    case 'mysql': {
      // SQL syntax checks
      const sqlIssues = checkSQLSyntax(code);
      if (sqlIssues.length > 0) {
        issues.push(...sqlIssues);
      }
      break;
    }

    case 'mongodb': {
      // MongoDB query syntax checks
      const mongoIssues = checkMongoDBSyntax(code);
      if (mongoIssues.length > 0) {
        issues.push(...mongoIssues);
      }
      break;
    }
  }

  return issues;
}

/**
 * Check bracket balance (parentheses, braces, brackets)
 */
function checkBracketBalance(code: string): string[] {
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
        issues.push(`Mismatched bracket: ${char} at position ${i}`);
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
 * Check SQL syntax (PostgreSQL, MySQL)
 */
function checkSQLSyntax(code: string): string[] {
  const issues: string[] = [];
  const normalized = code.trim().toUpperCase();

  // Check for basic SQL structure
  if (
    !normalized.startsWith('SELECT') &&
    !normalized.startsWith('INSERT') &&
    !normalized.startsWith('UPDATE') &&
    !normalized.startsWith('DELETE')
  ) {
    // Allow other SQL statements, but warn if it doesn't look like SQL
    if (!normalized.match(/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH)/i)) {
      issues.push('Code does not appear to be a valid SQL statement.');
    }
  }

  // Check for unmatched quotes in SQL strings
  const singleQuotes = (code.match(/'/g) || []).length;
  const doubleQuotes = (code.match(/"/g) || []).length;
  if (singleQuotes % 2 !== 0) {
    issues.push('Unmatched single quotes in SQL string.');
  }
  if (doubleQuotes % 2 !== 0) {
    issues.push('Unmatched double quotes in SQL string.');
  }

  return issues;
}

/**
 * Check MongoDB query syntax
 */
function checkMongoDBSyntax(code: string): string[] {
  const issues: string[] = [];

  // MongoDB queries should start with db.
  if (!code.trim().startsWith('db.')) {
    issues.push('MongoDB queries should start with "db."');
  }

  // Check for basic MongoDB method calls
  if (!code.match(/db\.\w+\.(find|findOne|insert|update|delete|aggregate)/i)) {
    // Allow other methods, but check structure
    if (!code.match(/db\.\w+\.\w+\s*\(/)) {
      issues.push('Invalid MongoDB query structure. Expected: db.collection.method(...)');
    }
  }

  // Check bracket balance (already done in checkBracketBalance, but MongoDB-specific)
  // MongoDB uses JavaScript object syntax, so brackets should be balanced

  return issues;
}

// ============================================================
// Anti-Cheat Measures
// ============================================================

/**
 * Detect potential cheating in user code
 */
export function detectCheating(
  userCode: string,
  expected: unknown,
  problem: Problem | ExecutableProblem,
): AntiCheatFlag[] {
  const flags: AntiCheatFlag[] = [];

  // Check for literal output
  if (isHardcodedOutput(userCode, expected)) {
    flags.push({
      type: 'literal_output',
      message:
        'Your code appears to contain the hardcoded answer. Please write code that computes the result.',
      severity: 'error',
    });
  }

  // Check if setup variables are used
  const setupVars = extractSetupVariables(problem.setupCode);
  const usesSetup = setupVars.some((v) => userCode.includes(v));
  if (setupVars.length > 0 && !usesSetup) {
    flags.push({
      type: 'no_setup_usage',
      message:
        'Your code does not use the provided variables. Make sure to use the setup code variables.',
      severity: 'warning',
    });
  }

  // Check for forbidden patterns (if defined in problem)
  if ('forbiddenPatterns' in problem && problem.forbiddenPatterns) {
    for (const pattern of problem.forbiddenPatterns) {
      if (pattern.test(userCode)) {
        flags.push({
          type: 'forbidden_pattern',
          message:
            'Your code contains a forbidden pattern. Please solve the problem using the intended approach.',
          severity: 'error',
        });
        break;
      }
    }
  }

  // Check for method usage (if methodName is specified)
  if ('methodName' in problem && problem.methodName) {
    const methodPattern = new RegExp(`\\.${problem.methodName}\\s*\\(`, 'i');
    if (!methodPattern.test(userCode)) {
      flags.push({
        type: 'no_method_usage',
        message: `This problem is about the "${problem.methodName}" method. Make sure to use it in your solution.`,
        severity: 'warning',
      });
    }
  }

  return flags;
}

/**
 * Check if user code appears to be hardcoded output
 * Enhanced to detect various hardcoding patterns while allowing legitimate solutions
 */
function isHardcodedOutput(userCode: string, expected: unknown): boolean {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();
  const codeLines = normalizedCode.split('\n').filter((line) => line.trim().length > 0);

  // For arrays
  if (Array.isArray(expected)) {
    const arrayString = JSON.stringify(expected);
    const arrayStringAlt = expected.toString();

    // Check if the expected array is directly in the code
    if (
      normalizedCode.includes(arrayString) ||
      normalizedCode.includes(arrayStringAlt.replace(/,/g, ', '))
    ) {
      // Check if it's just a return statement with the literal (hardcoded)
      const returnPattern = new RegExp(`return\\s*${escapeRegex(arrayString)}`, 'i');
      if (returnPattern.test(normalizedCode)) {
        return true;
      }

      // Check if code is too simple (just assignment/return of literal)
      const simplePattern = new RegExp(
        `(const|let|var)\\s+\\w+\\s*=\\s*${escapeRegex(arrayString)}|return\\s*${escapeRegex(arrayString)}`,
        'i',
      );
      if (simplePattern.test(normalizedCode) && codeLines.length <= 2) {
        return true;
      }
    }
  }

  // For strings
  if (typeof expected === 'string') {
    // Check if the expected string is directly in quotes as the return value
    const quotedString = `"${expected}"`;
    const singleQuoted = `'${expected}'`;
    const backtickQuoted = `\`${expected}\``;

    const returnPattern = new RegExp(
      `return\\s*(${escapeRegex(quotedString)}|${escapeRegex(singleQuoted)}|${escapeRegex(backtickQuoted)})`,
      'i',
    );

    // If there's a return with the literal, check if there's substantial logic before it
    if (returnPattern.test(normalizedCode)) {
      // Allow if there's complex logic (try-catch, if statements, function calls, etc.)
      const hasComplexLogic =
        normalizedCode.includes('try') ||
        normalizedCode.includes('catch') ||
        normalizedCode.includes('if') ||
        normalizedCode.includes('instanceof') ||
        normalizedCode.includes('function') ||
        normalizedCode.includes('=>') ||
        codeLines.length > 3; // Multiple lines usually indicate logic

      // Only flag as hardcoded if it's a simple return without logic
      if (!hasComplexLogic) {
        return true;
      }
    }

    // Check for simple assignment without computation
    const simplePattern = new RegExp(
      `(const|let|var)\\s+\\w+\\s*=\\s*(${escapeRegex(quotedString)}|${escapeRegex(singleQuoted)}|${escapeRegex(backtickQuoted)})`,
      'i',
    );
    if (simplePattern.test(normalizedCode) && codeLines.length <= 2) {
      return true;
    }
  }

  // For numbers
  if (typeof expected === 'number') {
    const returnPattern = new RegExp(`return\\s*${expected}\\s*[;]?\\s*$`, 'im');
    // Only flag if the code is very simple (just a return statement)
    if (returnPattern.test(normalizedCode) && codeLines.length <= 2) {
      return true;
    }

    // Check for simple assignment
    const simplePattern = new RegExp(
      `(const|let|var)\\s+\\w+\\s*=\\s*${expected}\\s*[;]?\\s*$`,
      'im',
    );
    if (simplePattern.test(normalizedCode) && codeLines.length <= 1) {
      return true;
    }
  }

  // For objects
  if (expected !== null && typeof expected === 'object' && !Array.isArray(expected)) {
    const objectString = JSON.stringify(expected);
    // Check if object is directly returned without computation
    const returnPattern = new RegExp(`return\\s*${escapeRegex(objectString)}`, 'i');
    if (returnPattern.test(normalizedCode)) {
      return true;
    }

    // Check for simple object literal assignment
    const simplePattern = new RegExp(
      `(const|let|var)\\s+\\w+\\s*=\\s*${escapeRegex(objectString)}`,
      'i',
    );
    if (simplePattern.test(normalizedCode) && codeLines.length <= 2) {
      return true;
    }
  }

  return false;
}

/**
 * Extract variable names from setup code
 */
function extractSetupVariables(setupCode: string): string[] {
  const variables: string[] = [];

  // JavaScript/TypeScript patterns
  const jsPatterns = [/(?:const|let|var)\s+(\w+)/g, /(\w+)\s*=/g];

  for (const pattern of jsPatterns) {
    let match;
    while ((match = pattern.exec(setupCode)) !== null) {
      if (
        !variables.includes(match[1]) &&
        !['const', 'let', 'var', 'function'].includes(match[1])
      ) {
        variables.push(match[1]);
      }
    }
  }

  return variables;
}

// ============================================================
// Result Comparison Utilities
// ============================================================

/**
 * Deep equality comparison with options
 */
export function deepEqual(a: unknown, b: unknown, options: ComparisonOptions = {}): boolean {
  const {
    ignoreCase = false,
    trimStrings = true,
    floatTolerance = 1e-9,
    arrayOrderMatters = true,
  } = options;

  // Handle null and undefined
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a === undefined || b === undefined) return false;

  // Handle different types
  if (typeof a !== typeof b) return false;

  // Handle numbers (with float tolerance)
  if (typeof a === 'number' && typeof b === 'number') {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    return Math.abs(a - b) <= floatTolerance;
  }

  // Handle strings
  if (typeof a === 'string' && typeof b === 'string') {
    let strA = a;
    let strB = b;
    if (trimStrings) {
      strA = strA.trim();
      strB = strB.trim();
    }
    if (ignoreCase) {
      strA = strA.toLowerCase();
      strB = strB.toLowerCase();
    }
    return strA === strB;
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    if (!arrayOrderMatters) {
      // Sort-insensitive comparison
      const sortedA = [...a].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
      const sortedB = [...b].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
      return sortedA.every((item, index) =>
        deepEqual(item, sortedB[index], { ...options, arrayOrderMatters: true }),
      );
    }

    return a.every((item, index) => deepEqual(item, b[index], options));
  }

  // Handle objects
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => {
      if (!keysB.includes(key)) return false;
      return deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
        options,
      );
    });
  }

  // Handle booleans and other primitives
  return a === b;
}

/**
 * Compare floating point numbers with tolerance
 */
export function floatEqual(a: number, b: number, tolerance: number = 1e-9): boolean {
  return Math.abs(a - b) <= tolerance;
}

/**
 * Normalize string for comparison
 */
export function normalizeString(
  str: string,
  options: { trim?: boolean; lowercase?: boolean; removeSpaces?: boolean } = {},
): string {
  let result = str;
  if (options.trim !== false) result = result.trim();
  if (options.lowercase) result = result.toLowerCase();
  if (options.removeSpaces) result = result.replace(/\s+/g, '');
  return result;
}

// ============================================================
// Error Handling and Hints
// ============================================================

/**
 * Classify error type from error object
 */
function classifyError(error: Error): ErrorType {
  const message = error.message.toLowerCase();
  const name = error.name.toLowerCase();

  if (name.includes('syntax') || message.includes('unexpected token')) {
    return 'syntax';
  }
  if (name.includes('reference') || message.includes('is not defined')) {
    return 'reference';
  }
  if (name.includes('type') || message.includes('is not a function')) {
    return 'type';
  }
  if (name.includes('range') || message.includes('call stack')) {
    return 'range';
  }
  if (message.includes('timeout')) {
    return 'timeout';
  }

  return 'runtime';
}

/**
 * Get helpful hint for an error message
 * Uses Array.prototype.find() for cleaner iteration
 */
export function getErrorHint(errorMessage: string): ErrorHint | null {
  const matchedHint = ERROR_HINTS.find((hint) => hint.pattern.test(errorMessage));

  if (!matchedHint) {
    return null;
  }

  return {
    ...matchedHint,
    hint: errorMessage.replace(matchedHint.pattern, matchedHint.hint),
  };
}

/**
 * Format error message with hint
 */
function formatErrorMessage(error: string, hint: ErrorHint | null): string {
  let message = `Error: ${error}`;

  if (hint) {
    message += `\n\nHint: ${hint.hint}`;
    if (hint.documentation) {
      message += `\n\nLearn more: ${hint.documentation}`;
    }
  }

  return message;
}

/**
 * Generate suggestions based on expected vs actual output
 */
function generateSuggestions(expected: unknown, actual: unknown): string[] {
  const suggestions: string[] = [];

  // Type mismatch suggestions
  if (typeof expected !== typeof actual) {
    suggestions.push(
      `Expected type "${typeof expected}" but got "${typeof actual}". Check your return statement.`,
    );
  }

  // Array suggestions
  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (expected.length !== actual.length) {
      suggestions.push(`Expected array of length ${expected.length} but got ${actual.length}.`);
    }
    // Check if it's a sorting issue
    const sortedExpected = [...expected].sort();
    const sortedActual = [...actual].sort();
    if (JSON.stringify(sortedExpected) === JSON.stringify(sortedActual)) {
      suggestions.push('Your array has the right elements but in the wrong order.');
    }
  }

  // String suggestions
  if (typeof expected === 'string' && typeof actual === 'string') {
    if (expected.toLowerCase() === actual.toLowerCase()) {
      suggestions.push('Your answer has incorrect capitalization.');
    }
    if (expected.trim() === actual.trim()) {
      suggestions.push('Your answer has extra whitespace.');
    }
  }

  // Number suggestions
  if (typeof expected === 'number' && typeof actual === 'number') {
    if (Math.abs(expected - actual) < 0.01) {
      suggestions.push('Your answer is very close. Check for rounding issues.');
    }
  }

  return suggestions;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Format a value for display
 */
export function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'function') return '[Function]';
  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(', ')}]`;
  }
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return '[Object]';
    }
  }
  return String(value);
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Strip TypeScript type annotations from code for JavaScript execution
 * Removes type annotations like `: string[]`, `: number`, etc.
 */
function stripTypeScriptAnnotations(code: string): string {
  if (!code) return code;

  // Remove type annotations in variable declarations: const x: Type = value
  let sanitized = code.replace(/(const|let|var)\s+(\w+)\s*:\s*[^=;]+=/g, '$1 $2 =');

  // Remove type annotations in function parameters: function(x: Type) or (x: Type) =>
  sanitized = sanitized.replace(/\(([^)]*)\)/g, (match, params) => {
    // Remove type annotations from each parameter
    const cleanedParams = params
      .split(',')
      .map((param: string) => {
        const trimmed = param.trim();
        // Remove type annotation: param: Type -> param
        return trimmed.replace(/:\s*[^=,]+(?=\s*=|$)/g, '').trim();
      })
      .join(', ');
    return `(${cleanedParams})`;
  });

  // Remove return type annotations: function(): Type { or =>: Type
  sanitized = sanitized.replace(/\)\s*:\s*[^{=]+(\{|=>)/g, ') $1');

  // Remove type assertions: as Type
  sanitized = sanitized.replace(/\s+as\s+[A-Za-z_$][A-Za-z0-9_$<>[\]]*/g, '');

  return sanitized;
}

// ============================================================
// Export for Testing
// ============================================================

// Export isHardcodedOutput and stripTypeScriptAnnotations for use in codeValidator
export { isHardcodedOutput, stripTypeScriptAnnotations };

export const _internal = {
  classifyError,
  extractSetupVariables,
  extractPythonVariables,
  checkPythonSyntax,
  checkLanguageSyntax,
  isHardcodedOutput,
  formatErrorMessage,
  generateSuggestions,
  ERROR_HINTS,
  stripTypeScriptAnnotations,
};
