import { describe, expect, it } from 'vitest';
import {
  checkRequiredPatterns,
  formatOutput,
  validateByPattern,
  validateDrillAnswer,
  validateJavaScript,
  validatePython,
} from '../codeValidator';

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
});
