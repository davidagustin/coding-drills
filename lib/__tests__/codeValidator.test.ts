import { describe, expect, it } from 'vitest';
import {
  checkRequiredPatterns,
  formatOutput,
  validateByPattern,
  validateDrillAnswer,
  validateJavaScript,
  validateProblemAnswer,
  validatePython,
} from '../codeValidator';
import type { Problem } from '../types';

// ============================================================================
// validateJavaScript Tests
// ============================================================================

describe('validateJavaScript', () => {
  describe('successful validation', () => {
    it('should validate correct array method expressions', () => {
      const setupCode = 'const arr = [1, 2, 3, 4, 5];';
      const userAnswer = 'arr.map(x => x * 2)';
      const expected = [2, 4, 6, 8, 10];

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toEqual(expected);
    });

    it('should validate simple arithmetic expressions', () => {
      const setupCode = 'const a = 5; const b = 3;';
      const userAnswer = 'a + b';
      const expected = 8;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toBe(8);
    });

    it('should validate string operations', () => {
      const setupCode = 'const str = "hello world";';
      const userAnswer = 'str.toUpperCase()';
      const expected = 'HELLO WORLD';

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toBe(expected);
    });

    it('should validate object property access', () => {
      const setupCode = 'const obj = { name: "test", value: 42 };';
      const userAnswer = 'obj.value';
      const expected = 42;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toBe(42);
    });

    it('should validate nested array operations', () => {
      const setupCode = 'const arr = [1, 2, 3, 4, 5];';
      const userAnswer = 'arr.filter(x => x > 2).map(x => x * 2)';
      const expected = [6, 8, 10];

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toEqual(expected);
    });

    it('should validate boolean expressions', () => {
      const setupCode = 'const arr = [1, 2, 3];';
      const userAnswer = 'arr.includes(2)';
      const expected = true;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toBe(true);
    });
  });

  describe('incorrect output handling', () => {
    it('should fail when output does not match expected', () => {
      const setupCode = 'const arr = [1, 2, 3];';
      const userAnswer = 'arr.map(x => x * 2)';
      const expected = [1, 2, 3]; // Wrong expected value

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('does not match');
      expect(result.output).toEqual([2, 4, 6]);
    });

    it('should fail with syntax error for invalid code', () => {
      const setupCode = 'const arr = [1, 2, 3];';
      const userAnswer = 'arr.map(x =>'; // Incomplete expression
      const expected = [2, 4, 6];

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('security patterns', () => {
    it('should reject eval usage', () => {
      const setupCode = 'const x = 5;';
      const userAnswer = 'eval("x + 1")';
      const expected = 6;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject Function constructor', () => {
      const setupCode = 'const x = 5;';
      const userAnswer = 'new Function("return 5")()';
      const expected = 5;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject fetch calls', () => {
      const setupCode = '';
      const userAnswer = 'fetch("http://example.com")';
      const expected = null;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject process access', () => {
      const setupCode = '';
      const userAnswer = 'process.env';
      const expected = {};

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject window access', () => {
      const setupCode = '';
      const userAnswer = 'window.location';
      const expected = null;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject document access', () => {
      const setupCode = '';
      const userAnswer = 'document.body';
      const expected = null;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject require calls', () => {
      const setupCode = '';
      const userAnswer = 'require("fs")';
      const expected = null;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject dynamic import', () => {
      const setupCode = '';
      const userAnswer = 'import("fs")';
      const expected = null;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject global access', () => {
      const setupCode = '';
      const userAnswer = 'global.x';
      const expected = null;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });

    it('should reject XMLHttpRequest', () => {
      const setupCode = '';
      const userAnswer = 'new XMLHttpRequest()';
      const expected = null;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toContain('forbidden patterns');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined result', () => {
      const setupCode = 'const arr = [];';
      const userAnswer = 'arr[10]';
      const expected = undefined;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toBeUndefined();
    });

    it('should handle null result', () => {
      const setupCode = 'const obj = { a: null };';
      const userAnswer = 'obj.a';
      const expected = null;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toBeNull();
    });

    it('should handle empty array', () => {
      const setupCode = 'const arr = [1, 2, 3];';
      const userAnswer = 'arr.filter(x => x > 10)';
      const expected: number[] = [];

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toEqual([]);
    });

    it('should handle deep object comparison', () => {
      const setupCode = 'const obj = { a: 1, b: 2 };';
      const userAnswer = 'Object.entries(obj)';
      const expected = [
        ['a', 1],
        ['b', 2],
      ];

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
    });

    it('should handle return statement in user answer', () => {
      const setupCode = 'const arr = [1, 2, 3];';
      const userAnswer = 'return arr.length';
      const expected = 3;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toBe(3);
    });

    it('should handle answer ending with semicolon', () => {
      const setupCode = 'const arr = [1, 2, 3];';
      const userAnswer = 'arr.length;';
      const expected = 3;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(true);
      expect(result.output).toBe(3);
    });

    it('should handle runtime error with "is not defined" message', () => {
      const setupCode = 'const arr = [1, 2, 3];';
      const userAnswer = 'nonexistentVar.length';
      const expected = 3;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle runtime error with "is not a function" message', () => {
      const setupCode = 'const x = 5;';
      const userAnswer = 'x.notAFunction()';
      const expected = 5;

      const result = validateJavaScript(setupCode, userAnswer, expected);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});

// ============================================================================
// checkRequiredPatterns Tests
// ============================================================================

describe('checkRequiredPatterns', () => {
  it('should pass when using required patterns', () => {
    const userAnswer = 'arr.map(x => x * 2)';
    const patterns = [/\.map\(/];
    const setupCode = 'const arr = [1, 2, 3];';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).toBeNull(); // null means passed
  });

  it('should fail when missing required patterns', () => {
    const userAnswer = 'arr.filter(x => x > 1)';
    const patterns = [/\.map\(/];
    const setupCode = 'const arr = [1, 2, 3];';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).not.toBeNull();
    expect(result?.success).toBe(false);
    expect(result?.error).toContain('must use the expected method');
  });

  it('should fail when not using setup variables', () => {
    const userAnswer = '[1, 2, 3].map(x => x * 2)';
    const patterns = undefined;
    const setupCode = 'const arr = [1, 2, 3];';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).not.toBeNull();
    expect(result?.success).toBe(false);
    expect(result?.error).toContain('must use the provided variables');
  });

  it('should pass when using setup variables', () => {
    const userAnswer = 'arr.length';
    const patterns = undefined;
    const setupCode = 'const arr = [1, 2, 3];';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).toBeNull();
  });

  it('should pass for empty setup code', () => {
    const userAnswer = '[1, 2, 3].length';
    const patterns = undefined;
    const setupCode = '';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).toBeNull();
  });

  it('should detect syntax errors with mismatched brackets', () => {
    const userAnswer = 'arr.map(x => x * 2';
    const patterns = [/\.map\(/];
    const setupCode = 'const arr = [1, 2, 3];';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).not.toBeNull();
    expect(result?.success).toBe(false);
    expect(result?.error).toContain('Syntax errors');
  });

  it('should detect mismatched closing bracket', () => {
    const userAnswer = 'arr.map(x => x * 2))';
    const patterns = undefined;
    const setupCode = 'const arr = [1, 2, 3];';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).not.toBeNull();
    expect(result?.success).toBe(false);
    expect(result?.error).toContain('Syntax errors');
  });

  it('should pass with no patterns provided', () => {
    const userAnswer = 'arr.length';
    const patterns: RegExp[] = [];
    const setupCode = 'const arr = [1, 2, 3];';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).toBeNull();
  });

  it('should pass when at least one pattern matches', () => {
    const userAnswer = 'arr.filter(x => x > 2)';
    const patterns = [/\.map\(/, /\.filter\(/];
    const setupCode = 'const arr = [1, 2, 3];';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).toBeNull();
  });

  it('should handle let and var variable declarations in setup', () => {
    const userAnswer = 'myVar + 1';
    const patterns = undefined;
    const setupCode = 'let myVar = 5;';

    const result = checkRequiredPatterns(userAnswer, patterns, setupCode);

    expect(result).toBeNull();
  });
});

// ============================================================================
// validatePython Tests
// ============================================================================

describe('validatePython', () => {
  it('should validate exact match', () => {
    const setupCode = 'numbers = [1, 2, 3]';
    const userAnswer = 'len(numbers)';
    const expected = 3;
    const sampleSolution = 'len(numbers)';

    const result = validatePython(setupCode, userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });

  it('should validate with whitespace differences', () => {
    const setupCode = 'numbers = [1, 2, 3]';
    const userAnswer = 'len( numbers )';
    const expected = 3;
    const sampleSolution = 'len(numbers)';

    const result = validatePython(setupCode, userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });

  it('should fail for different solutions', () => {
    const setupCode = 'numbers = [1, 2, 3]';
    const userAnswer = 'sum(numbers)';
    const expected = 3;
    const sampleSolution = 'len(numbers)';

    const result = validatePython(setupCode, userAnswer, expected, sampleSolution);

    expect(result.success).toBe(false);
  });

  it('should handle method chaining', () => {
    const setupCode = 'text = "hello"';
    const userAnswer = 'text.upper()';
    const expected = 'HELLO';
    const sampleSolution = 'text.upper()';

    const result = validatePython(setupCode, userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });

  it('should detect hardcoded output when not using setup variables', () => {
    const setupCode = 'numbers = [1, 2, 3]';
    // isHardcodedOutput detects return statements with literal array values
    const userAnswer = 'return [1,2,3]';
    const expected = [1, 2, 3];
    const sampleSolution = 'numbers';

    const result = validatePython(setupCode, userAnswer, expected, sampleSolution);

    expect(result.success).toBe(false);
    expect(result.error).toContain('hardcoded');
  });

  it('should allow hardcoded-looking output when using setup variables', () => {
    // If user uses setup vars, hardcoded check passes even if code looks suspicious
    const setupCode = 'numbers = [1, 2, 3]';
    const userAnswer = 'numbers and 3';
    const expected = 3;
    const sampleSolution = 'len(numbers)';

    // This won't match the sample solution, so should fail on pattern matching
    const result = validatePython(setupCode, userAnswer, expected, sampleSolution);
    // The hardcoded check passes (uses 'numbers'), but the pattern check fails
    expect(result.success).toBe(false);
  });

  it('should normalize whitespace for comparison', () => {
    const setupCode = 'text = "hello"';
    const userAnswer = '  text.upper()  ';
    const expected = 'HELLO';
    const sampleSolution = 'text.upper()';

    const result = validatePython(setupCode, userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });

  it('should fail when answer does not match any pattern', () => {
    const setupCode = 'numbers = [1, 2, 3]';
    const userAnswer = 'completely_different(numbers)';
    const expected = 3;
    const sampleSolution = 'len(numbers)';

    const result = validatePython(setupCode, userAnswer, expected, sampleSolution);

    expect(result.success).toBe(false);
    expect(result.error).toContain('does not match');
    expect(result.output).toBe('completely_different(numbers)');
  });
});

// ============================================================================
// validateByPattern Tests
// ============================================================================

describe('validateByPattern', () => {
  it('should validate exact match', () => {
    const userAnswer = 'console.log("hello")';
    const expected = 'hello';
    const sampleSolution = 'console.log("hello")';

    const result = validateByPattern(userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });

  it('should validate with extra whitespace', () => {
    const userAnswer = 'console.log( "hello" )';
    const expected = 'hello';
    const sampleSolution = 'console.log("hello")';

    const result = validateByPattern(userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });

  it('should fail for different code', () => {
    const userAnswer = 'console.error("hello")';
    const expected = 'hello';
    const sampleSolution = 'console.log("hello")';

    const result = validateByPattern(userAnswer, expected, sampleSolution);

    expect(result.success).toBe(false);
  });

  it('should validate flexible whitespace match', () => {
    const userAnswer = 'arr.size()';
    const expected = 3;
    const sampleSolution = 'arr.size()';

    const result = validateByPattern(userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });

  it('should validate case-insensitive regex match', () => {
    // The regex has 'i' flag, so case insensitive
    const userAnswer = 'SELECT * FROM users';
    const expected = 'result';
    const sampleSolution = 'SELECT * FROM users';

    const result = validateByPattern(userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });

  it('should return error without output for non-matching', () => {
    const userAnswer = 'something completely different';
    const expected = 'result';
    const sampleSolution = 'arr.size()';

    const result = validateByPattern(userAnswer, expected, sampleSolution);

    expect(result.success).toBe(false);
    expect(result.error).toContain('does not match');
    // validateByPattern doesn't set output for failures
    expect(result.output).toBeUndefined();
  });

  it('should match flexible whitespace normalization', () => {
    const userAnswer = '  arr.size()  ';
    const expected = 3;
    const sampleSolution = 'arr.size()';

    const result = validateByPattern(userAnswer, expected, sampleSolution);

    expect(result.success).toBe(true);
  });
});

// ============================================================================
// validateDrillAnswer Tests
// ============================================================================

describe('validateDrillAnswer', () => {
  describe('JavaScript validation', () => {
    it('should validate correct JavaScript answer', () => {
      const result = validateDrillAnswer(
        'javascript',
        'const arr = [1, 2, 3];',
        'arr.length',
        3,
        'arr.length',
      );

      expect(result.success).toBe(true);
    });

    it('should reject hardcoded answers', () => {
      const result = validateDrillAnswer(
        'javascript',
        'const arr = [1, 2, 3];',
        '3',
        3,
        'arr.length',
      );

      expect(result.success).toBe(false);
      // The error may be about hardcoded values or not using setup variables
      expect(result.error).toBeDefined();
      expect(
        result.error?.includes('hardcoded') ||
          result.error?.includes('must use the provided variables'),
      ).toBe(true);
    });
  });

  describe('TypeScript validation', () => {
    it('should validate TypeScript the same as JavaScript', () => {
      // setupCode is developer-authored JS (no TS annotations);
      // the user's answer may have TS which gets stripped automatically
      const result = validateDrillAnswer(
        'typescript',
        'const arr = [1, 2, 3];',
        'arr.length',
        3,
        'arr.length',
      );

      expect(result.success).toBe(true);
    });

    it('should strip TypeScript annotations from the user answer', () => {
      const result = validateDrillAnswer(
        'typescript',
        'const arr = [1, 2, 3];',
        'arr.length as number',
        3,
        'arr.length',
      );

      expect(result.success).toBe(true);
    });
  });

  describe('Python validation', () => {
    it('should validate Python answers', () => {
      const result = validateDrillAnswer(
        'python',
        'numbers = [1, 2, 3]',
        'len(numbers)',
        3,
        'len(numbers)',
      );

      expect(result.success).toBe(true);
    });
  });

  describe('database language validation', () => {
    it('should validate postgresql with patterns', () => {
      const result = validateDrillAnswer(
        'postgresql',
        '',
        'SELECT * FROM users WHERE active = true',
        'result',
        'SELECT * FROM users WHERE active = true',
        [/SELECT\s+\*\s+FROM\s+users/i],
      );

      expect(result.success).toBe(true);
    });

    it('should validate mysql with patterns', () => {
      const result = validateDrillAnswer(
        'mysql',
        '',
        'SELECT COUNT(*) FROM orders',
        'result',
        'SELECT COUNT(*) FROM orders',
        [/SELECT\s+COUNT/i],
      );

      expect(result.success).toBe(true);
    });

    it('should validate mongodb with patterns', () => {
      const result = validateDrillAnswer(
        'mongodb',
        '',
        'db.users.find()',
        'result',
        'db.users.find()',
        [/db\.users\.find/],
      );

      expect(result.success).toBe(true);
    });

    it('should fall back to pattern matching for database language without validPatterns', () => {
      const result = validateDrillAnswer(
        'postgresql',
        '',
        'SELECT * FROM users',
        'result',
        'SELECT * FROM users',
      );

      expect(result.success).toBe(true);
    });
  });

  describe('other languages', () => {
    it('should validate Java by pattern', () => {
      const result = validateDrillAnswer(
        'java',
        'int[] arr = {1, 2, 3};',
        'arr.length',
        3,
        'arr.length',
      );

      expect(result.success).toBe(true);
    });

    it('should validate C++ by pattern', () => {
      const result = validateDrillAnswer(
        'cpp',
        'vector<int> arr = {1, 2, 3};',
        'arr.size()',
        3,
        'arr.size()',
      );

      expect(result.success).toBe(true);
    });

    it('should validate Go by pattern', () => {
      const result = validateDrillAnswer('go', 'arr := []int{1, 2, 3}', 'len(arr)', 3, 'len(arr)');

      expect(result.success).toBe(true);
    });

    it('should validate Ruby by pattern', () => {
      const result = validateDrillAnswer('ruby', 'arr = [1, 2, 3]', 'arr.length', 3, 'arr.length');

      expect(result.success).toBe(true);
    });

    it('should validate Rust by pattern', () => {
      const result = validateDrillAnswer(
        'rust',
        'let arr = vec![1, 2, 3];',
        'arr.len()',
        3,
        'arr.len()',
      );

      expect(result.success).toBe(true);
    });

    it('should validate C by pattern', () => {
      const result = validateDrillAnswer(
        'c',
        'int arr[] = {1, 2, 3};',
        'sizeof(arr)',
        'result',
        'sizeof(arr)',
      );

      expect(result.success).toBe(true);
    });
  });

  describe('unsupported languages', () => {
    it('should return error for unsupported language', () => {
      // Use a truly unsupported language (not in the switch statement)
      const result = validateDrillAnswer(
        'fortran' as unknown as Parameters<typeof validateDrillAnswer>[0],
        '',
        'answer',
        null,
        'answer',
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Unsupported language');
    });
  });

  describe('pattern validation', () => {
    it('should check required patterns before execution', () => {
      const result = validateDrillAnswer(
        'javascript',
        'const arr = [1, 2, 3];',
        '[2, 4, 6]', // Hardcoded without using arr
        [2, 4, 6],
        'arr.map(x => x * 2)',
        [/\.map\(/],
      );

      expect(result.success).toBe(false);
    });
  });

  describe('hardcoded detection', () => {
    it('should detect return literal pattern', () => {
      const result = validateDrillAnswer(
        'javascript',
        'const arr = [1, 2, 3];',
        'return 3',
        3,
        'arr.length',
      );

      expect(result.success).toBe(false);
      // checkRequiredPatterns catches this first as "must use the provided variables"
      // since 'return 3' doesn't reference 'arr'
      expect(
        result.error?.includes('hardcoded') ||
          result.error?.includes('must use the provided variables'),
      ).toBe(true);
    });

    it('should allow answer that uses setup variables even with literal-like value', () => {
      const result = validateDrillAnswer(
        'javascript',
        'const arr = [1, 2, 3];',
        'arr.length',
        3,
        'arr.length',
      );

      expect(result.success).toBe(true);
    });
  });
});

// ============================================================================
// validateProblemAnswer Tests
// ============================================================================

describe('validateProblemAnswer', () => {
  it('should delegate to validateDrillAnswer for JavaScript', () => {
    const problem: Problem = {
      id: 'test-1',
      category: 'Array Methods',
      difficulty: 'easy',
      title: 'Test Problem',
      text: 'Test text',
      setup: 'const arr = [1, 2, 3];',
      setupCode: 'const arr = [1, 2, 3];',
      expected: 3,
      sample: 'arr.length',
      validPatterns: [/\.length/],
    };

    const result = validateProblemAnswer(problem, 'arr.length', 'javascript');

    expect(result.success).toBe(true);
  });

  it('should delegate to validateDrillAnswer for Python', () => {
    const problem: Problem = {
      id: 'test-2',
      category: 'Built-in',
      difficulty: 'easy',
      title: 'Test Problem',
      text: 'Test text',
      setup: 'numbers = [1, 2, 3]',
      setupCode: 'numbers = [1, 2, 3]',
      expected: 3,
      sample: 'len(numbers)',
    };

    const result = validateProblemAnswer(problem, 'len(numbers)', 'python');

    expect(result.success).toBe(true);
  });

  it('should pass through validPatterns from the problem', () => {
    const problem: Problem = {
      id: 'test-3',
      category: 'Array Methods',
      difficulty: 'easy',
      title: 'Test Problem',
      text: 'Use filter',
      setup: 'const arr = [1, 2, 3, 4, 5];',
      setupCode: 'const arr = [1, 2, 3, 4, 5];',
      expected: [2, 4],
      sample: 'arr.filter(x => x % 2 === 0)',
      validPatterns: [/\.filter\(/],
    };

    const result = validateProblemAnswer(problem, 'arr.filter(x => x % 2 === 0)', 'javascript');

    expect(result.success).toBe(true);
  });

  it('should handle problem without validPatterns', () => {
    const problem: Problem = {
      id: 'test-4',
      category: 'Array Methods',
      difficulty: 'easy',
      title: 'Test Problem',
      text: 'Get length',
      setup: 'const arr = [1, 2, 3];',
      setupCode: 'const arr = [1, 2, 3];',
      expected: 3,
      sample: 'arr.length',
    };

    const result = validateProblemAnswer(problem, 'arr.length', 'javascript');

    expect(result.success).toBe(true);
  });
});

// ============================================================================
// formatOutput Tests
// ============================================================================

describe('formatOutput', () => {
  it('should format undefined', () => {
    expect(formatOutput(undefined)).toBe('undefined');
  });

  it('should format null', () => {
    expect(formatOutput(null)).toBe('null');
  });

  it('should format string with quotes', () => {
    expect(formatOutput('hello')).toBe('"hello"');
  });

  it('should format number', () => {
    expect(formatOutput(42)).toBe('42');
  });

  it('should format boolean', () => {
    expect(formatOutput(true)).toBe('true');
    expect(formatOutput(false)).toBe('false');
  });

  it('should format array as JSON', () => {
    const output = formatOutput([1, 2, 3]);
    expect(output).toContain('1');
    expect(output).toContain('2');
    expect(output).toContain('3');
  });

  it('should format object as pretty JSON', () => {
    const output = formatOutput({ a: 1, b: 2 });
    expect(output).toContain('"a"');
    expect(output).toContain('1');
  });

  it('should handle nested objects', () => {
    const output = formatOutput({ a: { b: { c: 1 } } });
    expect(output).toContain('"c"');
    expect(output).toContain('1');
  });

  it('should handle circular references gracefully', () => {
    const obj: Record<string, unknown> = { a: 1 };
    obj.self = obj;

    // Should not throw - falls back to String(output)
    const output = formatOutput(obj);
    expect(typeof output).toBe('string');
  });

  it('should format zero', () => {
    expect(formatOutput(0)).toBe('0');
  });

  it('should format empty string', () => {
    expect(formatOutput('')).toBe('""');
  });

  it('should format empty array', () => {
    const output = formatOutput([]);
    expect(output).toBe('[]');
  });

  it('should format empty object', () => {
    const output = formatOutput({});
    expect(output).toBe('{}');
  });
});
