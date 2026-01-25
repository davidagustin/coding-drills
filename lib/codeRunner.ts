/**
 * Code Execution and Validation Service
 *
 * Provides safe code execution for JavaScript/TypeScript,
 * pattern-based validation for Python and other languages,
 * anti-cheat detection, and helpful error messages.
 */

import type {
  LanguageId,
  Problem,
  ExecutableProblem,
  ExecutionResult,
  ValidationResult,
  AntiCheatFlag,
  ComparisonOptions,
  ErrorHint,
  ErrorType,
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
    documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined',
  },
  {
    pattern: /Cannot read propert(?:y|ies) .+ of (undefined|null)/i,
    hint: 'You are trying to access a property on a value that is $1. Check that your variable has been assigned a value.',
    documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_access_property',
  },
  {
    pattern: /(\w+) is not a function/i,
    hint: '"$1" is not a function. Make sure you are calling a method that exists and is spelled correctly.',
    documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_a_function',
  },
  {
    pattern: /Unexpected token/i,
    hint: 'There is a syntax error in your code. Check for missing brackets, parentheses, or semicolons.',
    documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unexpected_token',
  },
  {
    pattern: /Maximum call stack size exceeded/i,
    hint: 'Your code has infinite recursion. Make sure your recursive function has a proper base case.',
    documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion',
  },
  {
    pattern: /Assignment to constant variable/i,
    hint: 'You are trying to reassign a variable declared with "const". Use "let" if you need to reassign it.',
    documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Invalid_const_assignment',
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

/**
 * Executes JavaScript code safely with timeout protection
 */
export function executeJavaScript(
  setupCode: string,
  userCode: string,
  timeout: number = DEFAULT_TIMEOUT
): ExecutionResult {
  const startTime = performance.now();
  const logs: string[] = [];

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

    // Combine setup and user code
    const fullCode = `
      "use strict";
      ${setupCode}
      ${userCode}
    `;

    // Create function with limited scope
    const fn = new Function('console', fullCode);

    // Execute with timeout using a synchronous approach
    // Note: True async timeout requires Web Workers in browser
    let result: unknown;
    let error: Error | null = null;

    // For browser environments, we use a simple try-catch
    // True timeout protection would require Web Workers
    try {
      result = fn(mockConsole);
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
      return {
        success: false,
        error: error.message,
        errorType: classifyError(error),
        executionTime,
        logs,
      };
    }

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
  timeout: number = DEFAULT_TIMEOUT
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
 */
export function validatePython(
  setupCode: string,
  userCode: string,
  expected: unknown,
  validPatterns: RegExp[]
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

  // Check for required patterns
  let allPatternsMatched = true;
  for (const pattern of validPatterns) {
    if (pattern.test(userCode)) {
      matchedPatterns.push(pattern.source);
    } else {
      allPatternsMatched = false;
    }
  }

  // Check for common Python syntax errors
  const syntaxChecks = checkPythonSyntax(userCode);
  if (syntaxChecks.length > 0) {
    return {
      valid: false,
      feedback: `Syntax issues detected:\n${syntaxChecks.join('\n')}`,
      matchedPatterns,
    };
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
      feedback: 'It looks like you hardcoded the expected output. Please write code that computes the result.',
      matchedPatterns,
    };
  }

  // Determine validity
  const isValid = allPatternsMatched && feedback.length === 0;

  if (isValid) {
    return {
      valid: true,
      feedback: 'Your Python code structure looks correct! Pattern validation passed.',
      matchedPatterns,
    };
  }

  if (!allPatternsMatched) {
    feedback.unshift('Your code does not match the expected patterns. Check that you are using the correct methods and syntax.');
  }

  return {
    valid: false,
    feedback: feedback.join('\n'),
    matchedPatterns,
  };
}

/**
 * Check common Python syntax issues
 */
function checkPythonSyntax(code: string): string[] {
  const issues: string[] = [];

  // Check for mismatched brackets
  const brackets = { '(': ')', '[': ']', '{': '}' };
  const stack: string[] = [];

  for (const char of code) {
    if (char in brackets) {
      stack.push(brackets[char as keyof typeof brackets]);
    } else if (Object.values(brackets).includes(char)) {
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
  problem: Problem | ExecutableProblem
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
 */
function validateJavaScript(
  setupCode: string,
  userCode: string,
  expected: unknown,
  problem: Problem | ExecutableProblem,
  antiCheatFlags: AntiCheatFlag[]
): ValidationResult {
  const startTime = performance.now();

  // Execute the code
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

  // Compare results
  const isEqual = deepEqual(execution.result, expected);

  if (isEqual) {
    return {
      valid: true,
      passed: 1,
      failed: 0,
      total: 1,
      feedback: 'Correct! Your code produces the expected output.',
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
  antiCheatFlags: AntiCheatFlag[]
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
 * Validate other languages by pattern matching
 */
function validateByPattern(
  language: LanguageId,
  setupCode: string,
  userCode: string,
  expected: unknown,
  problem: Problem | ExecutableProblem,
  antiCheatFlags: AntiCheatFlag[]
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

  // Check required patterns
  let patternsMatched = 0;
  for (const pattern of validPatterns) {
    if (pattern.test(userCode)) {
      patternsMatched++;
    }
  }

  const allPatternsMatched = validPatterns.length === 0 || patternsMatched === validPatterns.length;

  // Language-specific syntax checks
  const syntaxIssues = checkLanguageSyntax(language, userCode);
  if (syntaxIssues.length > 0) {
    feedback.push(...syntaxIssues);
  }

  // Check for hardcoded output
  if (isHardcodedOutput(userCode, expected)) {
    return {
      valid: false,
      passed: 0,
      failed: 1,
      total: 1,
      feedback: 'It looks like you hardcoded the expected output. Please write code that computes the result.',
      details: [],
      antiCheatFlags,
      executionTime: performance.now() - startTime,
    };
  }

  const isValid = allPatternsMatched && syntaxIssues.length === 0;

  return {
    valid: isValid,
    passed: isValid ? 1 : 0,
    failed: isValid ? 0 : 1,
    total: 1,
    feedback: isValid
      ? `Your ${language} code structure looks correct! Pattern validation passed.`
      : feedback.length > 0
        ? feedback.join('\n')
        : 'Your code does not match the expected patterns.',
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
 */
function checkLanguageSyntax(language: LanguageId, code: string): string[] {
  const issues: string[] = [];

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
        issues.push('C/C++ does not use the "function" keyword. Define functions with return types.');
      }
      break;

    case 'csharp':
      if (/\bfunction\b/.test(code)) {
        issues.push('C# uses method declarations, not the "function" keyword.');
      }
      break;
  }

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
  problem: Problem | ExecutableProblem
): AntiCheatFlag[] {
  const flags: AntiCheatFlag[] = [];

  // Check for literal output
  if (isHardcodedOutput(userCode, expected)) {
    flags.push({
      type: 'literal_output',
      message: 'Your code appears to contain the hardcoded answer. Please write code that computes the result.',
      severity: 'error',
    });
  }

  // Check if setup variables are used
  const setupVars = extractSetupVariables(problem.setupCode);
  const usesSetup = setupVars.some((v) => userCode.includes(v));
  if (setupVars.length > 0 && !usesSetup) {
    flags.push({
      type: 'no_setup_usage',
      message: 'Your code does not use the provided variables. Make sure to use the setup code variables.',
      severity: 'warning',
    });
  }

  // Check for forbidden patterns (if defined in problem)
  if ('forbiddenPatterns' in problem && problem.forbiddenPatterns) {
    for (const pattern of problem.forbiddenPatterns) {
      if (pattern.test(userCode)) {
        flags.push({
          type: 'forbidden_pattern',
          message: 'Your code contains a forbidden pattern. Please solve the problem using the intended approach.',
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
 */
function isHardcodedOutput(userCode: string, expected: unknown): boolean {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();

  // For arrays
  if (Array.isArray(expected)) {
    const arrayString = JSON.stringify(expected);
    const arrayStringAlt = expected.toString();
    if (
      normalizedCode.includes(arrayString) ||
      normalizedCode.includes(arrayStringAlt.replace(/,/g, ', '))
    ) {
      // Check if it's just a return statement with the literal
      const returnPattern = new RegExp(`return\\s*${escapeRegex(arrayString)}`, 'i');
      if (returnPattern.test(normalizedCode)) {
        return true;
      }
    }
  }

  // For strings
  if (typeof expected === 'string') {
    // Check if the expected string is directly in quotes as the return value
    const quotedString = `"${expected}"`;
    const singleQuoted = `'${expected}'`;
    const returnPattern = new RegExp(`return\\s*(${escapeRegex(quotedString)}|${escapeRegex(singleQuoted)})`, 'i');
    if (returnPattern.test(normalizedCode)) {
      return true;
    }
  }

  // For numbers
  if (typeof expected === 'number') {
    const returnPattern = new RegExp(`return\\s*${expected}\\s*[;]?\\s*$`, 'im');
    // Only flag if the code is very simple (just a return statement)
    if (returnPattern.test(normalizedCode) && normalizedCode.split('\n').length <= 2) {
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
  const jsPatterns = [
    /(?:const|let|var)\s+(\w+)/g,
    /(\w+)\s*=/g,
  ];

  for (const pattern of jsPatterns) {
    let match;
    while ((match = pattern.exec(setupCode)) !== null) {
      if (!variables.includes(match[1]) && !['const', 'let', 'var', 'function'].includes(match[1])) {
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
export function deepEqual(
  a: unknown,
  b: unknown,
  options: ComparisonOptions = {}
): boolean {
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
        deepEqual(item, sortedB[index], { ...options, arrayOrderMatters: true })
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
        options
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
  options: { trim?: boolean; lowercase?: boolean; removeSpaces?: boolean } = {}
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
 */
export function getErrorHint(errorMessage: string): ErrorHint | null {
  for (const hint of ERROR_HINTS) {
    if (hint.pattern.test(errorMessage)) {
      return {
        ...hint,
        hint: errorMessage.replace(hint.pattern, hint.hint),
      };
    }
  }
  return null;
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
      `Expected type "${typeof expected}" but got "${typeof actual}". Check your return statement.`
    );
  }

  // Array suggestions
  if (Array.isArray(expected) && Array.isArray(actual)) {
    if (expected.length !== actual.length) {
      suggestions.push(
        `Expected array of length ${expected.length} but got ${actual.length}.`
      );
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

// ============================================================
// Export for Testing
// ============================================================

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
};
