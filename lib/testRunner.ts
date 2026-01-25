/**
 * Test Runner Service
 *
 * Runs multiple test cases against user code, generates problem variations,
 * aggregates results, and provides comprehensive testing capabilities.
 */

import {
  deepEqual,
  detectCheating,
  executeJavaScript,
  executeJavaScriptAsync,
  formatValue,
} from './codeRunner';
import type {
  ExecutableProblem,
  LanguageId,
  ProblemVariation,
  TestCase,
  TestCaseResult,
  TestRunnerConfig,
  TestRunResults,
  ValidationResult,
} from './types';

// ============================================================
// Default Configuration
// ============================================================

const DEFAULT_CONFIG: TestRunnerConfig = {
  maxExecutionTime: 5000,
  runCount: 1,
  captureConsole: true,
  strictMode: true,
};

// ============================================================
// Test Runner Core
// ============================================================

/**
 * Run a single test case
 */
export function runTestCase(
  language: LanguageId,
  setupCode: string,
  userCode: string,
  testCase: TestCase,
  timeout: number = 5000,
): TestCaseResult {
  const startTime = performance.now();

  // Build code that applies the test case inputs
  const testSetup = buildTestSetup(setupCode, testCase);

  // Execute based on language
  if (language === 'javascript' || language === 'typescript') {
    const result = executeJavaScript(testSetup, userCode, timeout);
    const executionTime = performance.now() - startTime;

    if (!result.success) {
      return {
        testCaseId: testCase.id,
        passed: false,
        input: testCase.input,
        expected: testCase.expected,
        error: result.error,
        executionTime,
        isHidden: testCase.isHidden,
      };
    }

    const passed = deepEqual(result.result, testCase.expected);

    return {
      testCaseId: testCase.id,
      passed,
      input: testCase.input,
      expected: testCase.expected,
      actual: result.result,
      executionTime,
      isHidden: testCase.isHidden,
    };
  }

  // For non-executable languages, just return a placeholder
  return {
    testCaseId: testCase.id,
    passed: false,
    input: testCase.input,
    expected: testCase.expected,
    error: `Language "${language}" requires pattern-based validation`,
    isHidden: testCase.isHidden,
    executionTime: performance.now() - startTime,
  };
}

/**
 * Run a single test case asynchronously (supports async user code)
 */
export async function runTestCaseAsync(
  language: LanguageId,
  setupCode: string,
  userCode: string,
  testCase: TestCase,
  timeout: number = 5000,
): Promise<TestCaseResult> {
  const startTime = performance.now();
  const testSetup = buildTestSetup(setupCode, testCase);

  if (language === 'javascript' || language === 'typescript') {
    const result = await executeJavaScriptAsync(testSetup, userCode, timeout);
    const executionTime = performance.now() - startTime;

    if (!result.success) {
      return {
        testCaseId: testCase.id,
        passed: false,
        input: testCase.input,
        expected: testCase.expected,
        error: result.error,
        executionTime,
        isHidden: testCase.isHidden,
      };
    }

    const passed = deepEqual(result.result, testCase.expected);

    return {
      testCaseId: testCase.id,
      passed,
      input: testCase.input,
      expected: testCase.expected,
      actual: result.result,
      executionTime,
      isHidden: testCase.isHidden,
    };
  }

  return {
    testCaseId: testCase.id,
    passed: false,
    input: testCase.input,
    expected: testCase.expected,
    error: `Language "${language}" requires pattern-based validation`,
    executionTime: performance.now() - startTime,
    isHidden: testCase.isHidden,
  };
}

/**
 * Run all test cases for a problem
 */
export function runAllTestCases(
  language: LanguageId,
  setupCode: string,
  userCode: string,
  testCases: TestCase[],
  config: Partial<TestRunnerConfig> = {},
): ValidationResult {
  const startTime = performance.now();
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const results: TestCaseResult[] = [];

  for (const testCase of testCases) {
    const result = runTestCase(
      language,
      setupCode,
      userCode,
      testCase,
      mergedConfig.maxExecutionTime,
    );
    results.push(result);
  }

  const passed = results.filter((r) => r.passed).length;
  const failed = results.length - passed;
  const allPassed = failed === 0;

  // Generate feedback
  let feedback: string;
  if (allPassed) {
    feedback = `All ${passed} test cases passed!`;
  } else {
    const failedCases = results.filter((r) => !r.passed);
    feedback = `${passed}/${results.length} test cases passed.\n\n`;
    feedback += 'Failed cases:\n';
    for (const fc of failedCases.slice(0, 3)) {
      feedback += `- Input: ${formatValue(fc.input)}\n`;
      feedback += `  Expected: ${formatValue(fc.expected)}\n`;
      feedback += `  Got: ${fc.error ? `Error: ${fc.error}` : formatValue(fc.actual)}\n\n`;
    }
    if (failedCases.length > 3) {
      feedback += `... and ${failedCases.length - 3} more failed cases.`;
    }
  }

  return {
    valid: allPassed,
    passed,
    failed,
    total: results.length,
    feedback,
    details: results,
    executionTime: performance.now() - startTime,
  };
}

/**
 * Run all test cases asynchronously
 */
export async function runAllTestCasesAsync(
  language: LanguageId,
  setupCode: string,
  userCode: string,
  testCases: TestCase[],
  config: Partial<TestRunnerConfig> = {},
): Promise<ValidationResult> {
  const startTime = performance.now();
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const resultPromises = testCases.map((testCase) =>
    runTestCaseAsync(language, setupCode, userCode, testCase, mergedConfig.maxExecutionTime),
  );

  const results = await Promise.all(resultPromises);

  const passed = results.filter((r) => r.passed).length;
  const failed = results.length - passed;
  const allPassed = failed === 0;

  let feedback: string;
  if (allPassed) {
    feedback = `All ${passed} test cases passed!`;
  } else {
    const failedCases = results.filter((r) => !r.passed);
    feedback = `${passed}/${results.length} test cases passed.\n\n`;
    feedback += 'Failed cases:\n';
    for (const fc of failedCases.slice(0, 3)) {
      feedback += `- Input: ${formatValue(fc.input)}\n`;
      feedback += `  Expected: ${formatValue(fc.expected)}\n`;
      feedback += `  Got: ${fc.error ? `Error: ${fc.error}` : formatValue(fc.actual)}\n\n`;
    }
    if (failedCases.length > 3) {
      feedback += `... and ${failedCases.length - 3} more failed cases.`;
    }
  }

  return {
    valid: allPassed,
    passed,
    failed,
    total: results.length,
    feedback,
    details: results,
    executionTime: performance.now() - startTime,
  };
}

// ============================================================
// Problem Variation Generation
// ============================================================

/**
 * Seeded random number generator for reproducible tests
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  /**
   * Pick a random element from an array using Array.at() for cleaner access
   * @throws Error if array is empty
   */
  pick<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Cannot pick from empty array');
    }
    const index = Math.floor(this.next() * array.length);
    // Use Array.at() for potential negative index support and clarity
    const element = array.at(index);
    // TypeScript narrowing - at() can return undefined for out-of-bounds
    if (element === undefined) {
      throw new Error('Unexpected undefined element');
    }
    return element;
  }
}

/**
 * Generate variations of a problem for randomized testing
 */
export function generateProblemVariation(
  problem: ExecutableProblem,
  seed?: number,
): ProblemVariation {
  const actualSeed = seed ?? Date.now();
  const rng = new SeededRandom(actualSeed);

  // Analyze the original test cases to understand the pattern
  const originalCases = problem.testCases;
  const variationCases: TestCase[] = [];

  for (let i = 0; i < originalCases.length; i++) {
    const original = originalCases[i];
    const varied = generateVariedTestCase(original, rng, i);
    variationCases.push(varied);
  }

  // Update setup code with new values if needed
  const variedSetupCode = generateVariedSetupCode(problem.setupCode, rng);

  return {
    testCases: variationCases,
    setupCode: variedSetupCode,
    seed: actualSeed,
  };
}

/**
 * Generate a varied version of a test case
 */
function generateVariedTestCase(original: TestCase, rng: SeededRandom, index: number): TestCase {
  const variedInput: unknown[] = original.input.map((input) => varyValue(input, rng));

  return {
    id: `${original.id}-varied-${index}`,
    input: variedInput,
    expected: original.expected, // Expected will need to be recalculated by actual execution
    description: original.description ? `${original.description} (varied)` : undefined,
    isHidden: original.isHidden,
  };
}

/**
 * Vary a value while keeping its type and general characteristics
 */
function varyValue(value: unknown, rng: SeededRandom): unknown {
  if (typeof value === 'number') {
    // Vary numbers within a reasonable range
    if (Number.isInteger(value)) {
      const delta = rng.nextInt(-10, 10);
      return value + delta;
    } else {
      const delta = rng.nextFloat(-1, 1);
      return Math.round((value + delta) * 100) / 100;
    }
  }

  if (typeof value === 'string') {
    // For strings, we keep them as-is or make minor modifications
    // This is tricky because the expected output depends on the input
    return value;
  }

  if (Array.isArray(value)) {
    // For arrays, vary each element
    if (value.length === 0) return [];

    // Check if it's a numeric array
    if (typeof value[0] === 'number') {
      return value.map((v) => varyValue(v, rng));
    }

    // Shuffle array elements
    return rng.shuffle(value);
  }

  if (typeof value === 'object' && value !== null) {
    // For objects, vary numeric values
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = varyValue(val, rng);
    }
    return result;
  }

  return value;
}

/**
 * Generate varied setup code
 */
function generateVariedSetupCode(setupCode: string, rng: SeededRandom): string {
  // Replace numeric literals with variations
  return setupCode.replace(/\b(\d+)\b/g, (match) => {
    const num = parseInt(match, 10);
    // Only vary reasonable-sized numbers
    if (num > 0 && num < 1000) {
      const delta = rng.nextInt(-5, 5);
      return String(Math.max(1, num + delta));
    }
    return match;
  });
}

// ============================================================
// Multiple Run Testing (Anti-Cheat)
// ============================================================

/**
 * Run tests multiple times with different values to detect hardcoding
 */
export async function runMultipleRounds(
  language: LanguageId,
  problem: ExecutableProblem,
  userCode: string,
  config: Partial<TestRunnerConfig> = {},
): Promise<TestRunResults> {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const runCount = mergedConfig.runCount;
  const results: ValidationResult[] = [];
  let totalTime = 0;

  // Run with original test cases first
  const originalResult = await runAllTestCasesAsync(
    language,
    problem.setupCode,
    userCode,
    problem.testCases,
    mergedConfig,
  );
  results.push(originalResult);
  totalTime += originalResult.executionTime || 0;

  // Run additional rounds with variations
  for (let i = 1; i < runCount; i++) {
    const variation = generateProblemVariation(problem, Date.now() + i);

    // For JS/TS, we need to execute to get expected values for varied inputs
    // This is a simplified version - in production you'd want proper expected value calculation
    const variedResult = await runAllTestCasesAsync(
      language,
      variation.setupCode,
      userCode,
      variation.testCases,
      mergedConfig,
    );
    results.push(variedResult);
    totalTime += variedResult.executionTime || 0;
  }

  // Aggregate results
  const allPassed = results.every((r) => r.valid);
  const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
  const totalTests = results.reduce((sum, r) => sum + r.total, 0);
  const passRate = totalTests > 0 ? totalPassed / totalTests : 0;

  // Generate summary
  let summary: string;
  if (allPassed) {
    summary = `All ${runCount} test rounds passed with ${totalPassed} total test cases.`;
  } else {
    const failedRounds = results.filter((r) => !r.valid).length;
    summary = `${runCount - failedRounds}/${runCount} test rounds passed. `;
    summary += `Overall: ${totalPassed}/${totalTests} test cases passed (${Math.round(passRate * 100)}%).`;
  }

  return {
    allPassed,
    passRate,
    totalRuns: runCount,
    results,
    averageExecutionTime: totalTime / runCount,
    summary,
  };
}

// ============================================================
// Comprehensive Problem Validation
// ============================================================

/**
 * Comprehensive validation including anti-cheat and multiple test cases
 */
export async function validateProblemSolution(
  language: LanguageId,
  problem: ExecutableProblem,
  userCode: string,
  config: Partial<TestRunnerConfig> = {},
): Promise<ValidationResult> {
  const startTime = performance.now();
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Anti-cheat checks
  const antiCheatFlags = detectCheating(userCode, problem.expected, problem);

  // If severe cheating detected, fail immediately
  const severeFlags = antiCheatFlags.filter((f) => f.severity === 'error');
  if (severeFlags.length > 0) {
    return {
      valid: false,
      passed: 0,
      failed: problem.testCases.length,
      total: problem.testCases.length,
      feedback: `Validation failed:\n${severeFlags.map((f) => `- ${f.message}`).join('\n')}`,
      details: [],
      antiCheatFlags,
      executionTime: performance.now() - startTime,
    };
  }

  // Run test cases
  const testResult = await runAllTestCasesAsync(
    language,
    problem.setupCode,
    userCode,
    problem.testCases,
    mergedConfig,
  );

  // Add anti-cheat flags if any warnings exist
  if (antiCheatFlags.length > 0) {
    testResult.antiCheatFlags = antiCheatFlags;

    // Append warnings to feedback
    const warnings = antiCheatFlags.filter((f) => f.severity === 'warning');
    if (warnings.length > 0) {
      testResult.feedback += `\n\nWarnings:\n${warnings.map((f) => `- ${f.message}`).join('\n')}`;
    }
  }

  testResult.executionTime = performance.now() - startTime;

  return testResult;
}

// ============================================================
// Test Suite Builder
// ============================================================

/**
 * Builder pattern for creating test suites
 */
export class TestSuiteBuilder {
  private testCases: TestCase[] = [];
  private counter = 0;

  /**
   * Add a simple input/output test case
   */
  add(input: unknown[], expected: unknown, description?: string): this {
    this.testCases.push({
      id: `test-${++this.counter}`,
      input,
      expected,
      description,
    });
    return this;
  }

  /**
   * Add a hidden test case (for anti-cheat)
   */
  addHidden(input: unknown[], expected: unknown): this {
    this.testCases.push({
      id: `hidden-${++this.counter}`,
      input,
      expected,
      isHidden: true,
    });
    return this;
  }

  /**
   * Add multiple test cases from an array
   */
  addMany(cases: Array<{ input: unknown[]; expected: unknown; description?: string }>): this {
    for (const c of cases) {
      this.add(c.input, c.expected, c.description);
    }
    return this;
  }

  /**
   * Add edge cases automatically
   */
  addEdgeCases(type: 'array' | 'string' | 'number', methodFn?: (input: unknown) => unknown): this {
    switch (type) {
      case 'array':
        this.add([[]], methodFn ? methodFn([]) : [], 'Empty array');
        this.add([[1]], methodFn ? methodFn([1]) : [1], 'Single element');
        break;
      case 'string':
        this.add([''], methodFn ? methodFn('') : '', 'Empty string');
        this.add([' '], methodFn ? methodFn(' ') : ' ', 'Whitespace');
        break;
      case 'number':
        this.add([0], methodFn ? methodFn(0) : 0, 'Zero');
        this.add([-1], methodFn ? methodFn(-1) : -1, 'Negative');
        break;
    }
    return this;
  }

  /**
   * Build the final test cases array
   */
  build(): TestCase[] {
    return [...this.testCases];
  }

  /**
   * Reset the builder
   */
  reset(): this {
    this.testCases = [];
    this.counter = 0;
    return this;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Build test setup code that injects test case inputs
 */
function buildTestSetup(setupCode: string, testCase: TestCase): string {
  // If there are inputs, we need to inject them into the setup
  if (testCase.input.length === 0) {
    return setupCode;
  }

  // Create input variables
  const inputDeclarations = testCase.input
    .map((input, i) => `const __input${i} = ${JSON.stringify(input)};`)
    .join('\n');

  return `${inputDeclarations}\n${setupCode}`;
}

/**
 * Calculate statistics for test results
 * Uses modern array methods for cleaner aggregation
 */
export function calculateTestStats(results: ValidationResult[]): {
  totalTests: number;
  totalPassed: number;
  totalFailed: number;
  passRate: number;
  averageTime: number;
  minTime: number;
  maxTime: number;
} {
  // Use object destructuring in reduce for cleaner accumulator updates
  const { totalTests, totalPassed, totalFailed } = results.reduce(
    (acc, r) => ({
      totalTests: acc.totalTests + r.total,
      totalPassed: acc.totalPassed + r.passed,
      totalFailed: acc.totalFailed + r.failed,
    }),
    { totalTests: 0, totalPassed: 0, totalFailed: 0 },
  );

  // Filter and map execution times using nullish coalescing
  const times = results.map((r) => r.executionTime ?? 0).filter((t) => t > 0);

  // Calculate time stats with early returns for empty arrays
  const averageTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;

  // Use spread with fallback for empty arrays
  const minTime = times.length > 0 ? Math.min(...times) : 0;
  const maxTime = times.length > 0 ? Math.max(...times) : 0;

  return {
    totalTests,
    totalPassed,
    totalFailed,
    passRate: totalTests > 0 ? totalPassed / totalTests : 0,
    averageTime,
    minTime,
    maxTime,
  };
}

/**
 * Format test results for display
 */
export function formatTestResults(result: ValidationResult): string {
  const lines: string[] = [];

  // Header
  if (result.valid) {
    lines.push('=== All Tests Passed ===');
  } else {
    lines.push(`=== ${result.passed}/${result.total} Tests Passed ===`);
  }

  lines.push('');

  // Details
  for (const detail of result.details) {
    const status = detail.passed ? '[PASS]' : '[FAIL]';
    lines.push(`${status} Test ${detail.testCaseId}`);

    if (!detail.isHidden) {
      lines.push(`  Input: ${formatValue(detail.input)}`);
      lines.push(`  Expected: ${formatValue(detail.expected)}`);

      if (!detail.passed) {
        if (detail.error) {
          lines.push(`  Error: ${detail.error}`);
        } else {
          lines.push(`  Actual: ${formatValue(detail.actual)}`);
        }
      }
    }

    if (detail.executionTime) {
      lines.push(`  Time: ${detail.executionTime.toFixed(2)}ms`);
    }

    lines.push('');
  }

  // Anti-cheat warnings
  if (result.antiCheatFlags && result.antiCheatFlags.length > 0) {
    lines.push('--- Warnings ---');
    for (const flag of result.antiCheatFlags) {
      lines.push(`[${flag.severity.toUpperCase()}] ${flag.message}`);
    }
    lines.push('');
  }

  // Suggestions
  if (result.suggestions && result.suggestions.length > 0) {
    lines.push('--- Suggestions ---');
    for (const suggestion of result.suggestions) {
      lines.push(`- ${suggestion}`);
    }
    lines.push('');
  }

  // Total time
  if (result.executionTime) {
    lines.push(`Total execution time: ${result.executionTime.toFixed(2)}ms`);
  }

  return lines.join('\n');
}

// ============================================================
// Exports for External Use
// ============================================================

export { SeededRandom };

export const _internal = {
  buildTestSetup,
  generateVariedTestCase,
  varyValue,
  generateVariedSetupCode,
};
