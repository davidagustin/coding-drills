/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest';
import {
  _internal,
  deepEqual,
  detectCheating,
  executeJavaScript,
  executeJavaScriptAsync,
  floatEqual,
  formatValue,
  getErrorHint,
  isHardcodedOutput,
  normalizeString,
  stripTypeScriptAnnotations,
  validateCode,
  validatePython,
} from './codeRunner';
import type { ExecutableProblem, Problem } from './types';

// ============================================================
// Shared mock problem objects
// ============================================================

const mockProblem: Problem = {
  id: 'test-1',
  title: 'Test Problem',
  text: 'Test question text',
  question: 'Test question',
  setup: 'Setup',
  setupCode: 'const arr = [1, 2, 3];',
  sample: 'arr.map(x => x * 2)',
  expected: [2, 4, 6],
  difficulty: 'easy' as const,
  category: 'arrays',
  tags: ['arrays'],
};

const mockProblemWithMethod: ExecutableProblem = {
  ...mockProblem,
  methodName: 'map',
  testCases: [{ id: 'tc1', input: [], expected: [2, 4, 6] }],
};

const mockProblemWithForbidden: ExecutableProblem = {
  ...mockProblem,
  forbiddenPatterns: [/eval\s*\(/],
  testCases: [{ id: 'tc1', input: [], expected: [2, 4, 6] }],
};

// ============================================================
// 1. executeJavaScript
// ============================================================

describe('executeJavaScript', () => {
  it('should execute basic JavaScript and return result', () => {
    const result = executeJavaScript('', 'return 1 + 1;');
    expect(result.success).toBe(true);
    expect(result.result).toBe(2);
    expect(result.executionTime).toBeGreaterThanOrEqual(0);
  });

  it('should accept options as a number (timeout)', () => {
    const result = executeJavaScript('', 'return 42;', 3000);
    expect(result.success).toBe(true);
    expect(result.result).toBe(42);
  });

  it('should accept options as an object', () => {
    const result = executeJavaScript('', 'return 99;', { timeout: 5000, stripTypes: true });
    expect(result.success).toBe(true);
    expect(result.result).toBe(99);
  });

  it('should capture console.log output', () => {
    const result = executeJavaScript('', 'console.log("hello"); return 1;');
    expect(result.success).toBe(true);
    expect(result.logs).toContain('"hello"');
  });

  it('should capture console.warn output', () => {
    const result = executeJavaScript('', 'console.warn("warning msg"); return 1;');
    expect(result.success).toBe(true);
    expect(result.logs).toEqual(expect.arrayContaining([expect.stringContaining('[WARN]')]));
    expect(result.logs?.[0]).toContain('warning msg');
  });

  it('should capture console.error output', () => {
    const result = executeJavaScript('', 'console.error("error msg"); return 1;');
    expect(result.success).toBe(true);
    expect(result.logs).toEqual(expect.arrayContaining([expect.stringContaining('[ERROR]')]));
    expect(result.logs?.[0]).toContain('error msg');
  });

  it('should handle compile/syntax error (new Function fails)', () => {
    const result = executeJavaScript('', 'return {{{');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Syntax error');
    expect(result.error).toContain('Please check your code');
    expect(result.errorType).toBe('syntax');
  });

  it('should not duplicate "Syntax error:" prefix if already present', () => {
    // The code triggers a compile error whose message does NOT start with "Syntax error:"
    const result = executeJavaScript('', 'if (');
    expect(result.success).toBe(false);
    // Verify only one "Syntax error:" prefix
    const occurrences = (result.error?.match(/Syntax error:/g) || []).length;
    expect(occurrences).toBe(1);
  });

  it('should handle runtime SyntaxError name', () => {
    // Code that compiles but creates a SyntaxError at runtime via eval-like behavior
    const result = executeJavaScript('', 'throw new SyntaxError("bad syntax");');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Syntax error');
    expect(result.errorType).toBe('syntax');
  });

  it('should handle runtime ReferenceError', () => {
    const result = executeJavaScript('', 'return undeclaredVariable;');
    expect(result.success).toBe(false);
    expect(result.error).toContain('is not defined');
    expect(result.error).toContain('Make sure all variables are defined');
    expect(result.errorType).toBe('reference');
  });

  it('should handle runtime TypeError', () => {
    const result = executeJavaScript('', 'var x = null; return x.foo();');
    expect(result.success).toBe(false);
    expect(result.error).toContain("Check that you're using the correct data types");
    expect(result.errorType).toBe('type');
  });

  it('should handle non-Error thrown (string thrown)', () => {
    const result = executeJavaScript('', 'throw "string error";');
    expect(result.success).toBe(false);
    expect(result.error).toBe('string error');
  });

  it('should handle non-Error thrown in compile path (branch coverage)', () => {
    // We cannot easily trigger this from user code, but we can verify the runtime path
    // The compile path wraps non-Error objects with new Error(String(compileError))
    // This is tested indirectly through the string error case above
    const result = executeJavaScript('', 'throw 12345;');
    expect(result.success).toBe(false);
    expect(result.error).toBe('12345');
  });

  it('should detect timeout when executionTime exceeds safeTimeout', () => {
    // Use a very low timeout so even fast code is "too slow"
    // safeTimeout = Math.min(Math.max(timeout, 100), 30000) => 100ms
    const result = executeJavaScript(
      '',
      'var s = Date.now(); while(Date.now() - s < 200) {} return 1;',
      100,
    );
    // The soft timeout check fires if executionTime > safeTimeout
    expect(result.success).toBe(false);
    expect(result.error).toContain('timed out');
    expect(result.errorType).toBe('timeout');
  });

  it('should run setup code and make variables available', () => {
    const result = executeJavaScript('const x = 10;', 'return x * 2;');
    expect(result.success).toBe(true);
    expect(result.result).toBe(20);
  });

  it('should return undefined result for code that does not return', () => {
    const result = executeJavaScript('', 'var x = 1;');
    expect(result.success).toBe(true);
    expect(result.result).toBeUndefined();
  });

  it('should strip TypeScript annotations by default', () => {
    const result = executeJavaScript('', 'const x: number = 42; return x;');
    expect(result.success).toBe(true);
    expect(result.result).toBe(42);
  });

  it('should NOT strip types if stripTypes is false', () => {
    const result = executeJavaScript('', 'const x: number = 42; return x;', {
      stripTypes: false,
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain('Syntax error');
  });

  it('should clamp timeout between 100 and 30000', () => {
    // Very low timeout gets clamped to 100
    const result1 = executeJavaScript('', 'return 1;', 1);
    expect(result1.success).toBe(true);

    // Very high timeout gets clamped to 30000
    const result2 = executeJavaScript('', 'return 2;', 999999);
    expect(result2.success).toBe(true);
  });
});

// ============================================================
// 2. executeJavaScriptAsync
// ============================================================

describe('executeJavaScriptAsync', () => {
  it('should execute async code successfully', async () => {
    const result = await executeJavaScriptAsync('', 'return await Promise.resolve(42);');
    expect(result.success).toBe(true);
    expect(result.result).toBe(42);
  });

  it('should handle async error (rejected promise)', async () => {
    const result = await executeJavaScriptAsync('', 'throw new Error("async failure");');
    expect(result.success).toBe(false);
    expect(result.error).toBe('async failure');
  });

  it('should handle compilation error in async mode', async () => {
    const result = await executeJavaScriptAsync('', 'return {{{');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should handle promise rejection with non-Error value', async () => {
    const result = await executeJavaScriptAsync('', 'await Promise.reject("string rejection");');
    expect(result.success).toBe(false);
    expect(result.error).toBe('string rejection');
  });

  it('should capture console logs in async mode', async () => {
    const result = await executeJavaScriptAsync('', 'console.log("async log"); return 1;');
    expect(result.success).toBe(true);
    expect(result.logs).toContain('"async log"');
  });

  it('should capture console.warn in async mode', async () => {
    const result = await executeJavaScriptAsync('', 'console.warn("async warn"); return 1;');
    expect(result.success).toBe(true);
    expect(result.logs?.[0]).toContain('[WARN]');
  });

  it('should capture console.error in async mode', async () => {
    const result = await executeJavaScriptAsync('', 'console.error("async error"); return 1;');
    expect(result.success).toBe(true);
    expect(result.logs?.[0]).toContain('[ERROR]');
  });

  it('should timeout for long-running async code', async () => {
    const result = await executeJavaScriptAsync(
      '',
      'await new Promise(resolve => setTimeout(resolve, 5000)); return 1;',
      200,
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain('timed out');
    expect(result.errorType).toBe('timeout');
  }, 10000);
});

// ============================================================
// 3. validatePython
// ============================================================

describe('validatePython', () => {
  it('should reject empty code', () => {
    const result = validatePython('', '', 1, []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('Please write some Python code');
    expect(result.matchedPatterns).toEqual([]);
  });

  it('should accept valid code with matching patterns', () => {
    const result = validatePython(
      'x = [1, 2, 3]',
      'result = [i * 2 for i in x]',
      [2, 4, 6],
      [/for\s+\w+\s+in/],
    );
    expect(result.valid).toBe(true);
    expect(result.matchedPatterns.length).toBeGreaterThan(0);
  });

  it('should detect "function" keyword as Python syntax error', () => {
    const result = validatePython('', 'function add(a, b):\n  return a + b', 3, []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('def');
  });

  it('should detect var/let/const as Python syntax error', () => {
    const result = validatePython('', 'var x = 1', 1, []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('var');
  });

  it('should detect let keyword', () => {
    const result = validatePython('', 'let x = 1', 1, []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('Syntax errors');
  });

  it('should detect const keyword', () => {
    const result = validatePython('', 'const x = 1', 1, []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('Syntax errors');
  });

  it('should detect semicolons at end of statements', () => {
    const result = validatePython('', 'x = 1;', 1, []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('semicolons');
  });

  it('should detect curly braces as code blocks', () => {
    const result = validatePython('', 'if True {\n  pass\n}', true, []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('indentation');
  });

  it('should detect hardcoded output', () => {
    const result = validatePython('nums = [1,2,3]', 'return [2,4,6]', [2, 4, 6], []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('hardcoded');
  });

  it('should warn when setup variables are not used', () => {
    const result = validatePython('nums = [1,2,3]', 'y = [2, 4, 6]', [2, 4, 6], [/y\s*=\s*\[/]);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('provided variables');
  });

  it('should allow any valid code when no patterns are specified', () => {
    const result = validatePython('x = 5', 'y = x + 1', 6, []);
    expect(result.valid).toBe(true);
    expect(result.feedback).toContain('correct');
  });

  it('should reject code when no pattern matches', () => {
    const result = validatePython('x = 5', 'y = x + 1', 6, [/map\(/, /filter\(/]);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('does not match');
  });

  it('should match normalized versions of code', () => {
    // Code with extra spaces that should match via normalization
    const result = validatePython(
      'data = [1, 2, 3]',
      'result = [ i * 2  for  i  in  data ]',
      [2, 4, 6],
      [/for\s+\w+\s+in\s+data/],
    );
    expect(result.valid).toBe(true);
  });

  it('should detect mismatched brackets', () => {
    const result = validatePython('', 'x = [1, 2, 3', [1, 2, 3], []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('Syntax errors');
  });

  it('should detect unclosed brackets', () => {
    const result = validatePython('', 'x = (1 + 2', 3, []);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('Syntax errors');
  });
});

// ============================================================
// 4. validateCode
// ============================================================

describe('validateCode', () => {
  describe('JavaScript/TypeScript routing', () => {
    it('should route javascript to JS validator and return correct result', () => {
      const result = validateCode(
        'javascript',
        'const arr = [1, 2, 3];',
        'return arr.map(x => x * 2);',
        [2, 4, 6],
        mockProblem,
      );
      expect(result.valid).toBe(true);
      expect(result.passed).toBe(1);
    });

    it('should route typescript to JS validator', () => {
      const result = validateCode(
        'typescript',
        'const arr = [1, 2, 3];',
        'return arr.map(x => x * 2);',
        [2, 4, 6],
        mockProblem,
      );
      expect(result.valid).toBe(true);
    });

    it('should handle JS execution error', () => {
      const result = validateCode('javascript', '', 'return undefinedVar;', 1, mockProblem);
      expect(result.valid).toBe(false);
      expect(result.feedback).toContain('Error');
    });

    it('should return incorrect output when result does not match', () => {
      const result = validateCode('javascript', '', 'return 99;', 42, {
        ...mockProblem,
        setupCode: '',
        expected: 42,
      });
      expect(result.valid).toBe(false);
      expect(result.feedback).toContain('Incorrect output');
    });
  });

  describe('Python routing', () => {
    it('should route python to Python validator', () => {
      const result = validateCode(
        'python',
        'x = [1, 2, 3]',
        'result = [i * 2 for i in x]',
        [2, 4, 6],
        { ...mockProblem, validPatterns: [/for\s+\w+\s+in/] },
      );
      expect(result.valid).toBe(true);
    });
  });

  describe('Pattern-based languages', () => {
    const patternLanguages = [
      'java',
      'go',
      'ruby',
      'c',
      'cpp',
      'csharp',
      'php',
      'kotlin',
      'rust',
      'swift',
      'scala',
      'r',
      'perl',
      'lua',
      'haskell',
      'elixir',
      'dart',
      'clojure',
    ] as const;

    for (const lang of patternLanguages) {
      it(`should route ${lang} to pattern validator`, () => {
        const problem: Problem = {
          ...mockProblem,
          setupCode: '',
          sample: 'x = 1',
          validPatterns: [/x\s*=\s*1/],
        };
        const result = validateCode(lang, '', 'x = 1', 1, problem);
        expect(result).toHaveProperty('valid');
        expect(result.total).toBe(1);
      });
    }
  });

  describe('Database languages', () => {
    it('should route postgresql to pattern validator', () => {
      const problem: Problem = {
        ...mockProblem,
        setupCode: '',
        sample: 'SELECT * FROM users WHERE age > 25',
        validPatterns: [/SELECT\s+\*\s+FROM\s+users/i],
      };
      const result = validateCode(
        'postgresql',
        '',
        'SELECT * FROM users WHERE age > 25',
        undefined,
        problem,
      );
      expect(result.valid).toBe(true);
    });

    it('should route mysql to pattern validator', () => {
      const problem: Problem = {
        ...mockProblem,
        setupCode: '',
        sample: 'SELECT name FROM users',
        validPatterns: [/SELECT\s+name\s+FROM\s+users/i],
      };
      const result = validateCode('mysql', '', 'SELECT name FROM users', undefined, problem);
      expect(result.valid).toBe(true);
    });

    it('should route mongodb to pattern validator', () => {
      const problem: Problem = {
        ...mockProblem,
        setupCode: '',
        sample: 'db.users.find({age: 30})',
        validPatterns: [/db\.users\.find/i],
      };
      const result = validateCode('mongodb', '', 'db.users.find({age: 30})', undefined, problem);
      expect(result.valid).toBe(true);
    });
  });

  describe('Unsupported language', () => {
    it('should return error for unsupported language', () => {
      const result = validateCode('brainfuck' as any, '', 'code', 1, mockProblem);
      expect(result.valid).toBe(false);
      expect(result.feedback).toContain('not yet supported');
    });
  });

  describe('Anti-cheat severe flags blocking', () => {
    it('should block code with hardcoded output (severe anti-cheat)', () => {
      const problem: ExecutableProblem = {
        ...mockProblem,
        setupCode: 'const arr = [1, 2, 3];',
        expected: [2, 4, 6],
        testCases: [{ id: 'tc1', input: [], expected: [2, 4, 6] }],
      };
      const result = validateCode(
        'javascript',
        'const arr = [1, 2, 3];',
        'return [2,4,6]',
        [2, 4, 6],
        problem,
      );
      expect(result.valid).toBe(false);
      expect(result.antiCheatFlags).toBeDefined();
      expect(result.antiCheatFlags?.some((f) => f.severity === 'error')).toBe(true);
    });

    it('should block code with forbidden patterns', () => {
      const result = validateCode(
        'javascript',
        'const arr = [1, 2, 3];',
        'eval("arr.map(x => x * 2)")',
        [2, 4, 6],
        mockProblemWithForbidden,
      );
      expect(result.valid).toBe(false);
      expect(result.antiCheatFlags?.some((f) => f.type === 'forbidden_pattern')).toBe(true);
    });
  });
});

// ============================================================
// 5. detectCheating
// ============================================================

describe('detectCheating', () => {
  it('should detect hardcoded output', () => {
    const flags = detectCheating('return [2,4,6]', [2, 4, 6], mockProblem);
    expect(flags.some((f) => f.type === 'literal_output')).toBe(true);
    expect(flags.some((f) => f.severity === 'error')).toBe(true);
  });

  it('should detect no setup usage', () => {
    const flags = detectCheating('const y = 1; return y * 2;', 2, mockProblem);
    expect(flags.some((f) => f.type === 'no_setup_usage')).toBe(true);
    expect(flags.some((f) => f.severity === 'warning')).toBe(true);
  });

  it('should not flag no_setup_usage when setup variables are used', () => {
    const flags = detectCheating('return arr.map(x => x * 2);', [2, 4, 6], mockProblem);
    const setupFlags = flags.filter((f) => f.type === 'no_setup_usage');
    expect(setupFlags.length).toBe(0);
  });

  it('should detect forbidden patterns', () => {
    const flags = detectCheating('eval("bad")', [2, 4, 6], mockProblemWithForbidden);
    expect(flags.some((f) => f.type === 'forbidden_pattern')).toBe(true);
    expect(flags.some((f) => f.severity === 'error')).toBe(true);
  });

  it('should not flag forbidden when pattern does not match', () => {
    const flags = detectCheating('arr.map(x => x * 2)', [2, 4, 6], mockProblemWithForbidden);
    expect(flags.filter((f) => f.type === 'forbidden_pattern').length).toBe(0);
  });

  it('should detect no method usage', () => {
    const flags = detectCheating(
      'const result = []; for (let i = 0; i < arr.length; i++) result.push(arr[i] * 2); return result;',
      [2, 4, 6],
      mockProblemWithMethod,
    );
    expect(flags.some((f) => f.type === 'no_method_usage')).toBe(true);
  });

  it('should not flag method usage when method is used', () => {
    const flags = detectCheating('arr.map(x => x * 2)', [2, 4, 6], mockProblemWithMethod);
    expect(flags.filter((f) => f.type === 'no_method_usage').length).toBe(0);
  });

  it('should return empty flags for clean code with problem that has no extra constraints', () => {
    const simpleProblem: Problem = {
      ...mockProblem,
      setupCode: '',
    };
    const flags = detectCheating('const x = 1 + 2; return x;', 3, simpleProblem);
    // no setup vars, so no no_setup_usage flag
    // no hardcoded output (has logic)
    // no forbidden patterns
    // no methodName
    expect(flags.filter((f) => f.type === 'no_setup_usage').length).toBe(0);
  });
});

// ============================================================
// 6. deepEqual
// ============================================================

describe('deepEqual', () => {
  it('should return true for same reference', () => {
    const obj = { a: 1 };
    expect(deepEqual(obj, obj)).toBe(true);
  });

  it('should return true for identical primitives', () => {
    expect(deepEqual(42, 42)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  it('should handle null vs undefined', () => {
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(undefined, null)).toBe(false);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for null vs value', () => {
    expect(deepEqual(null, 1)).toBe(false);
    expect(deepEqual(1, null)).toBe(false);
  });

  it('should return false for undefined vs value', () => {
    expect(deepEqual(undefined, 1)).toBe(false);
    expect(deepEqual(1, undefined)).toBe(false);
  });

  it('should return false for different types', () => {
    expect(deepEqual(1, '1')).toBe(false);
    expect(deepEqual(true, 1)).toBe(false);
    expect(deepEqual('hello', 42)).toBe(false);
  });

  it('should treat empty array and empty object as equal (both have 0 keys)', () => {
    // This is the actual deepEqual behavior: [] and {} both have no enumerable keys
    expect(deepEqual([], {})).toBe(true);
    // Arrays with numeric keys behave like objects in deepEqual
    expect(deepEqual([1], { '0': 1 })).toBe(true);
    // But different key counts differ
    expect(deepEqual([1, 2], { '0': 1 })).toBe(false);
  });

  it('should handle NaN equality', () => {
    expect(deepEqual(NaN, NaN)).toBe(true);
    expect(deepEqual(NaN, 0)).toBe(false);
  });

  it('should use float tolerance for numbers', () => {
    expect(deepEqual(0.1 + 0.2, 0.3)).toBe(true); // within default 1e-9
    expect(deepEqual(1.0, 1.0000000001)).toBe(true);
    expect(deepEqual(1.0, 1.1, { floatTolerance: 0.01 })).toBe(false);
    expect(deepEqual(1.0, 1.005, { floatTolerance: 0.01 })).toBe(true);
  });

  it('should handle strings with ignoreCase', () => {
    expect(deepEqual('Hello', 'hello', { ignoreCase: true })).toBe(true);
    expect(deepEqual('Hello', 'hello', { ignoreCase: false })).toBe(false);
  });

  it('should handle strings with trimStrings (default true)', () => {
    expect(deepEqual('  hello  ', 'hello')).toBe(true);
    expect(deepEqual('  hello  ', 'hello', { trimStrings: false })).toBe(false);
  });

  it('should compare arrays element by element', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it('should return false for arrays with different lengths', () => {
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
  });

  it('should handle arrayOrderMatters=false', () => {
    expect(deepEqual([3, 1, 2], [1, 2, 3], { arrayOrderMatters: false })).toBe(true);
    expect(deepEqual([1, 2], [3, 4], { arrayOrderMatters: false })).toBe(false);
  });

  it('should compare objects by keys', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
  });

  it('should return false for objects with different keys', () => {
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('should handle nested objects', () => {
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false);
  });

  it('should compare booleans', () => {
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(false, false)).toBe(true);
  });
});

// ============================================================
// 7. floatEqual
// ============================================================

describe('floatEqual', () => {
  it('should return true for equal floats within default tolerance', () => {
    expect(floatEqual(1.0, 1.0)).toBe(true);
    expect(floatEqual(0.1 + 0.2, 0.3)).toBe(true);
  });

  it('should return false for floats outside default tolerance', () => {
    expect(floatEqual(1.0, 2.0)).toBe(false);
  });

  it('should use custom tolerance', () => {
    expect(floatEqual(1.0, 1.05, 0.1)).toBe(true);
    expect(floatEqual(1.0, 1.2, 0.1)).toBe(false);
  });
});

// ============================================================
// 8. normalizeString
// ============================================================

describe('normalizeString', () => {
  it('should trim by default', () => {
    expect(normalizeString('  hello  ')).toBe('hello');
  });

  it('should not trim if trim is false', () => {
    expect(normalizeString('  hello  ', { trim: false })).toBe('  hello  ');
  });

  it('should lowercase when option is set', () => {
    expect(normalizeString('HELLO', { lowercase: true })).toBe('hello');
  });

  it('should remove spaces when option is set', () => {
    expect(normalizeString('h e l l o', { removeSpaces: true })).toBe('hello');
  });

  it('should combine options', () => {
    expect(normalizeString('  H E L L O  ', { lowercase: true, removeSpaces: true })).toBe('hello');
  });
});

// ============================================================
// 9. formatValue
// ============================================================

describe('formatValue', () => {
  it('should format undefined', () => {
    expect(formatValue(undefined)).toBe('undefined');
  });

  it('should format null', () => {
    expect(formatValue(null)).toBe('null');
  });

  it('should format string with quotes', () => {
    expect(formatValue('hello')).toBe('"hello"');
  });

  it('should format function as [Function]', () => {
    expect(formatValue(() => {})).toBe('[Function]');
  });

  it('should format array recursively', () => {
    expect(formatValue([1, 'a', null])).toBe('[1, "a", null]');
  });

  it('should format nested arrays', () => {
    expect(formatValue([[1, 2], [3]])).toBe('[[1, 2], [3]]');
  });

  it('should format object as JSON', () => {
    const result = formatValue({ a: 1 });
    expect(result).toContain('"a"');
    expect(result).toContain('1');
  });

  it('should format circular object as [Object]', () => {
    const obj: any = {};
    obj.self = obj;
    expect(formatValue(obj)).toBe('[Object]');
  });

  it('should format number', () => {
    expect(formatValue(42)).toBe('42');
  });

  it('should format boolean', () => {
    expect(formatValue(true)).toBe('true');
    expect(formatValue(false)).toBe('false');
  });

  it('should format empty array', () => {
    expect(formatValue([])).toBe('[]');
  });
});

// ============================================================
// 10. getErrorHint
// ============================================================

describe('getErrorHint', () => {
  it('should match "is not defined" error', () => {
    const hint = getErrorHint('foo is not defined');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('declared');
  });

  it('should match "Cannot read property of undefined"', () => {
    const hint = getErrorHint('Cannot read property "x" of undefined');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('undefined');
  });

  it('should match "Cannot read properties of null"', () => {
    const hint = getErrorHint('Cannot read properties "x" of null');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('null');
  });

  it('should match "is not a function"', () => {
    const hint = getErrorHint('foo is not a function');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('not a function');
  });

  it('should match "Unexpected token"', () => {
    const hint = getErrorHint('Unexpected token ;');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('syntax error');
  });

  it('should match "Maximum call stack size exceeded"', () => {
    const hint = getErrorHint('Maximum call stack size exceeded');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('recursion');
  });

  it('should match "Assignment to constant variable"', () => {
    const hint = getErrorHint('Assignment to constant variable');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('const');
  });

  it('should match "Invalid left-hand side in assignment"', () => {
    const hint = getErrorHint('Invalid left-hand side in assignment');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('assigning');
  });

  it('should match "Unexpected end of input"', () => {
    const hint = getErrorHint('Unexpected end of input');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('incomplete');
  });

  it('should match "SyntaxError: Unexpected identifier"', () => {
    const hint = getErrorHint('SyntaxError: Unexpected identifier');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('missing operator');
  });

  it('should match "TypeError: obj.method is not a function"', () => {
    const hint = getErrorHint('TypeError: myObj.doStuff is not a function');
    expect(hint).not.toBeNull();
    // The more specific pattern should match
    expect(hint?.hint).toBeDefined();
  });

  it('should match "RangeError: Invalid array length"', () => {
    const hint = getErrorHint('RangeError: Invalid array length');
    expect(hint).not.toBeNull();
    expect(hint?.hint).toContain('Array length');
  });

  it('should return null for unrecognized error', () => {
    const hint = getErrorHint('something completely unknown xyz123');
    expect(hint).toBeNull();
  });
});

// ============================================================
// 11. stripTypeScriptAnnotations
// ============================================================

describe('stripTypeScriptAnnotations', () => {
  it('should return empty string for empty input', () => {
    expect(stripTypeScriptAnnotations('')).toBe('');
  });

  it('should strip variable type annotations', () => {
    const code = 'const x: number = 42;';
    const result = stripTypeScriptAnnotations(code);
    expect(result).toContain('const x =');
    expect(result).toContain('42');
    expect(result).not.toContain(': number');
  });

  it('should strip string array type annotation', () => {
    const code = 'const arr: string[] = ["a", "b"];';
    const result = stripTypeScriptAnnotations(code);
    expect(result).toContain('const arr =');
    expect(result).not.toContain(': string[]');
  });

  it('should strip function parameter types', () => {
    const code = '(x: number, y: string) => x + y';
    const result = stripTypeScriptAnnotations(code);
    expect(result).not.toContain(': number');
    expect(result).not.toContain(': string');
    expect(result).toContain('(x, y)');
  });

  it('should strip return type annotations', () => {
    const code = 'function foo(): number {';
    const result = stripTypeScriptAnnotations(code);
    expect(result).not.toContain(': number');
    expect(result).toContain(') {');
  });

  it('should strip type assertions (as Type)', () => {
    const code = 'const x = value as string';
    const result = stripTypeScriptAnnotations(code);
    expect(result).not.toContain('as string');
  });

  it('should strip complex type assertions', () => {
    const code = 'const x = value as Record<string, number>';
    const result = stripTypeScriptAnnotations(code);
    expect(result).not.toContain('as Record');
  });

  it('should handle let and var declarations', () => {
    const codeL = 'let x: boolean = true;';
    const resultL = stripTypeScriptAnnotations(codeL);
    expect(resultL).toContain('let x =');

    const codeV = 'var y: string = "hello";';
    const resultV = stripTypeScriptAnnotations(codeV);
    expect(resultV).toContain('var y =');
  });

  it('should preserve code without TypeScript annotations', () => {
    const code = 'const x = 42; return x * 2;';
    expect(stripTypeScriptAnnotations(code)).toBe(code);
  });
});

// ============================================================
// 12. isHardcodedOutput
// ============================================================

describe('isHardcodedOutput', () => {
  it('should detect hardcoded array in return statement', () => {
    expect(isHardcodedOutput('return [2,4,6]', [2, 4, 6])).toBe(true);
  });

  it('should detect hardcoded array as simple assignment', () => {
    expect(isHardcodedOutput('const x = [2,4,6]', [2, 4, 6])).toBe(true);
  });

  it('should not flag array with complex logic', () => {
    expect(
      isHardcodedOutput('const result = arr.map(x => x * 2);\nreturn result;', [2, 4, 6]),
    ).toBe(false);
  });

  it('should detect hardcoded string in return', () => {
    expect(isHardcodedOutput('return "hello world"', 'hello world')).toBe(true);
  });

  it('should detect single-quoted string hardcode', () => {
    expect(isHardcodedOutput("return 'hello world'", 'hello world')).toBe(true);
  });

  it('should not flag string return with complex logic', () => {
    const code = 'if (x) {\n  return "hello world"\n}\nreturn "fallback"';
    expect(isHardcodedOutput(code, 'hello world')).toBe(false);
  });

  it('should detect hardcoded number in simple return', () => {
    expect(isHardcodedOutput('return 42', 42)).toBe(true);
  });

  it('should not flag number in multiline logic', () => {
    expect(
      isHardcodedOutput('const x = arr.reduce((a, b) => a + b, 0);\nreturn x;\n// comment', 42),
    ).toBe(false);
  });

  it('should detect hardcoded object in return', () => {
    const expected = { name: 'test', value: 1 };
    const code = `return ${JSON.stringify(expected)}`;
    expect(isHardcodedOutput(code, expected)).toBe(true);
  });

  it('should detect simple object assignment', () => {
    const expected = { a: 1 };
    const code = `const x = ${JSON.stringify(expected)}`;
    expect(isHardcodedOutput(code, expected)).toBe(true);
  });

  it('should detect simple string assignment as hardcoded', () => {
    expect(isHardcodedOutput('const msg = "hello"', 'hello')).toBe(true);
  });

  it('should detect simple single-quoted string assignment as hardcoded', () => {
    expect(isHardcodedOutput("const msg = 'hello'", 'hello')).toBe(true);
  });

  it('should detect simple number assignment as hardcoded', () => {
    expect(isHardcodedOutput('const x = 42', 42)).toBe(true);
  });

  it('should return false when code computes result', () => {
    expect(isHardcodedOutput('return arr.filter(x => x > 0).length', 3)).toBe(false);
  });

  it('should return false for non-matching types', () => {
    expect(isHardcodedOutput('return 42', 'not a number')).toBe(false);
  });

  it('should return false for null expected', () => {
    expect(isHardcodedOutput('return null', null)).toBe(false);
  });

  it('should return false for boolean expected', () => {
    expect(isHardcodedOutput('return true', true)).toBe(false);
  });
});

// ============================================================
// 13. _internal exports
// ============================================================

describe('_internal', () => {
  describe('classifyError', () => {
    it('should classify SyntaxError', () => {
      const err = new SyntaxError('Unexpected token');
      expect(_internal.classifyError(err)).toBe('syntax');
    });

    it('should classify error with "unexpected token" in message', () => {
      const err = new Error('unexpected token somewhere');
      expect(_internal.classifyError(err)).toBe('syntax');
    });

    it('should classify ReferenceError', () => {
      const err = new ReferenceError('foo is not defined');
      expect(_internal.classifyError(err)).toBe('reference');
    });

    it('should classify error with "is not defined" in message', () => {
      const err = new Error('something is not defined');
      expect(_internal.classifyError(err)).toBe('reference');
    });

    it('should classify TypeError', () => {
      const err = new TypeError('foo is not a function');
      expect(_internal.classifyError(err)).toBe('type');
    });

    it('should classify error with "is not a function" in message', () => {
      const err = new Error('x is not a function');
      expect(_internal.classifyError(err)).toBe('type');
    });

    it('should classify RangeError', () => {
      const err = new RangeError('Invalid array length');
      expect(_internal.classifyError(err)).toBe('range');
    });

    it('should classify error with "call stack" in message', () => {
      const err = new Error('Maximum call stack size exceeded');
      expect(_internal.classifyError(err)).toBe('range');
    });

    it('should classify timeout error', () => {
      const err = new Error('Operation timeout');
      expect(_internal.classifyError(err)).toBe('timeout');
    });

    it('should default to runtime for unknown errors', () => {
      const err = new Error('something went wrong');
      expect(_internal.classifyError(err)).toBe('runtime');
    });
  });

  describe('extractSetupVariables', () => {
    it('should extract const/let/var declared variables', () => {
      const vars = _internal.extractSetupVariables('const arr = [1, 2, 3]; let x = 10;');
      expect(vars).toContain('arr');
      expect(vars).toContain('x');
    });

    it('should extract assignment variables', () => {
      const vars = _internal.extractSetupVariables('nums = [1, 2]; total = 0;');
      expect(vars).toContain('nums');
      expect(vars).toContain('total');
    });

    it('should exclude keywords (const, let, var, function)', () => {
      const vars = _internal.extractSetupVariables('const x = 1;');
      expect(vars).not.toContain('const');
      expect(vars).not.toContain('let');
      expect(vars).not.toContain('var');
      expect(vars).not.toContain('function');
    });

    it('should not duplicate variables', () => {
      const vars = _internal.extractSetupVariables('const x = 1; x = 2;');
      const xCount = vars.filter((v) => v === 'x').length;
      expect(xCount).toBe(1);
    });

    it('should return empty for empty setup code', () => {
      expect(_internal.extractSetupVariables('')).toEqual([]);
    });
  });

  describe('extractPythonVariables', () => {
    it('should extract Python variable assignments', () => {
      const vars = _internal.extractPythonVariables('nums = [1, 2, 3]\nx = 10');
      expect(vars).toContain('nums');
      expect(vars).toContain('x');
    });

    it('should return empty for no assignments', () => {
      expect(_internal.extractPythonVariables('print("hello")')).toEqual([]);
    });

    it('should handle multiline assignments', () => {
      const vars = _internal.extractPythonVariables('a = 1\nb = 2\nc = 3');
      expect(vars).toEqual(['a', 'b', 'c']);
    });
  });

  describe('checkPythonSyntax', () => {
    it('should return empty for valid Python code', () => {
      expect(_internal.checkPythonSyntax('x = [i for i in range(10)]')).toEqual([]);
    });

    it('should detect "function" keyword', () => {
      const issues = _internal.checkPythonSyntax('function foo():');
      expect(issues.some((i) => i.includes('def'))).toBe(true);
    });

    it('should detect var/let/const', () => {
      expect(_internal.checkPythonSyntax('var x = 1').some((i) => i.includes('var'))).toBe(true);
      expect(_internal.checkPythonSyntax('let x = 1').some((i) => i.includes('let'))).toBe(true);
      expect(_internal.checkPythonSyntax('const x = 1').some((i) => i.includes('const'))).toBe(
        true,
      );
    });

    it('should detect semicolons at end of statements', () => {
      const issues = _internal.checkPythonSyntax('x = 1;');
      expect(issues.some((i) => i.includes('semicolons'))).toBe(true);
    });

    it('should detect curly braces for code blocks', () => {
      const issues = _internal.checkPythonSyntax('if True {\n  pass\n}');
      expect(issues.some((i) => i.includes('indentation'))).toBe(true);
    });

    it('should detect mismatched brackets', () => {
      const issues = _internal.checkPythonSyntax('x = [1, 2, 3)');
      expect(issues.some((i) => i.includes('Mismatched'))).toBe(true);
    });

    it('should detect unclosed brackets', () => {
      const issues = _internal.checkPythonSyntax('x = [1, 2, 3');
      expect(issues.some((i) => i.includes('Unclosed'))).toBe(true);
    });
  });

  describe('checkLanguageSyntax', () => {
    it('should detect function keyword in Java', () => {
      const issues = _internal.checkLanguageSyntax('java', 'function foo() {}');
      expect(issues.some((i) => i.includes('function'))).toBe(true);
    });

    it('should not flag valid Java code', () => {
      const issues = _internal.checkLanguageSyntax(
        'java',
        'public static void main(String[] args) {}',
      );
      expect(issues.filter((i) => i.includes('"function"')).length).toBe(0);
    });

    it('should detect function keyword in Go', () => {
      const issues = _internal.checkLanguageSyntax('go', 'function main() {}');
      expect(issues.some((i) => i.includes('func'))).toBe(true);
    });

    it('should detect class keyword in Go', () => {
      const issues = _internal.checkLanguageSyntax('go', 'class MyStruct {}');
      expect(issues.some((i) => i.includes('structs'))).toBe(true);
    });

    it('should detect function keyword in Ruby', () => {
      const issues = _internal.checkLanguageSyntax('ruby', 'function my_method');
      expect(issues.some((i) => i.includes('def'))).toBe(true);
    });

    it('should detect function keyword in C', () => {
      const issues = _internal.checkLanguageSyntax('c', 'function add(int a, int b) {}');
      expect(issues.some((i) => i.includes('function'))).toBe(true);
    });

    it('should detect function keyword in C++', () => {
      const issues = _internal.checkLanguageSyntax('cpp', 'function compute() {}');
      expect(issues.some((i) => i.includes('function'))).toBe(true);
    });

    it('should detect function keyword in C#', () => {
      const issues = _internal.checkLanguageSyntax('csharp', 'function Main() {}');
      expect(issues.some((i) => i.includes('function'))).toBe(true);
    });

    it('should detect invalid SQL start for postgresql', () => {
      const issues = _internal.checkLanguageSyntax('postgresql', 'INVALID QUERY');
      expect(issues.some((i) => i.includes('valid SQL'))).toBe(true);
    });

    it('should accept valid SELECT for postgresql', () => {
      const issues = _internal.checkLanguageSyntax('postgresql', 'SELECT * FROM users');
      // Should not flag SQL structure issue
      expect(issues.filter((i) => i.includes('valid SQL')).length).toBe(0);
    });

    it('should detect unmatched single quotes in SQL', () => {
      const issues = _internal.checkLanguageSyntax(
        'mysql',
        "SELECT * FROM users WHERE name = 'test",
      );
      expect(issues.some((i) => i.includes('Unmatched single quotes'))).toBe(true);
    });

    it('should detect unmatched double quotes in SQL', () => {
      const issues = _internal.checkLanguageSyntax('postgresql', 'SELECT * FROM "users');
      expect(issues.some((i) => i.includes('Unmatched double quotes'))).toBe(true);
    });

    it('should detect missing db. in MongoDB', () => {
      const issues = _internal.checkLanguageSyntax('mongodb', 'users.find({})');
      expect(issues.some((i) => i.includes('db.'))).toBe(true);
    });

    it('should detect invalid MongoDB structure', () => {
      const issues = _internal.checkLanguageSyntax('mongodb', 'db.users');
      expect(issues.some((i) => i.includes('Invalid MongoDB'))).toBe(true);
    });

    it('should accept valid MongoDB query', () => {
      const issues = _internal.checkLanguageSyntax('mongodb', 'db.users.find({age: 30})');
      expect(issues.length).toBe(0);
    });

    it('should detect bracket balance issues', () => {
      const issues = _internal.checkLanguageSyntax(
        'java',
        'public static void main(String[] args { }',
      );
      expect(issues.some((i) => i.includes('bracket') || i.includes('Unclosed'))).toBe(true);
    });

    it('should return empty for valid code in languages without specific checks', () => {
      const issues = _internal.checkLanguageSyntax('rust', 'fn main() { println!("hello"); }');
      expect(issues.length).toBe(0);
    });

    it('should handle SQL statements starting with WITH, CREATE, ALTER, DROP', () => {
      expect(
        _internal
          .checkLanguageSyntax('postgresql', 'WITH cte AS (SELECT 1) SELECT * FROM cte')
          .filter((i) => i.includes('valid SQL')).length,
      ).toBe(0);
      expect(
        _internal
          .checkLanguageSyntax('mysql', 'CREATE TABLE users (id INT)')
          .filter((i) => i.includes('valid SQL')).length,
      ).toBe(0);
    });

    it('should handle INSERT, UPDATE, DELETE SQL statements', () => {
      expect(
        _internal
          .checkLanguageSyntax('postgresql', "INSERT INTO users VALUES (1, 'test')")
          .filter((i) => i.includes('valid SQL')).length,
      ).toBe(0);
      expect(
        _internal
          .checkLanguageSyntax('mysql', 'UPDATE users SET name = "test"')
          .filter((i) => i.includes('valid SQL')).length,
      ).toBe(0);
      expect(
        _internal
          .checkLanguageSyntax('mysql', 'DELETE FROM users WHERE id = 1')
          .filter((i) => i.includes('valid SQL')).length,
      ).toBe(0);
    });
  });

  describe('formatErrorMessage', () => {
    it('should format error without hint', () => {
      const result = _internal.formatErrorMessage('Something failed', null);
      expect(result).toBe('Error: Something failed');
    });

    it('should format error with hint', () => {
      const result = _internal.formatErrorMessage('foo is not defined', {
        pattern: /is not defined/,
        hint: 'Declare the variable first',
      });
      expect(result).toContain('Error: foo is not defined');
      expect(result).toContain('Hint: Declare the variable first');
    });

    it('should include documentation link when present', () => {
      const result = _internal.formatErrorMessage('foo is not defined', {
        pattern: /is not defined/,
        hint: 'Declare it',
        documentation: 'https://example.com/docs',
      });
      expect(result).toContain('Learn more: https://example.com/docs');
    });
  });

  describe('generateSuggestions', () => {
    it('should suggest type mismatch', () => {
      const suggestions = _internal.generateSuggestions(42, 'forty-two');
      expect(suggestions.some((s) => s.includes('type'))).toBe(true);
    });

    it('should suggest array length mismatch', () => {
      const suggestions = _internal.generateSuggestions([1, 2, 3], [1, 2]);
      expect(suggestions.some((s) => s.includes('length'))).toBe(true);
    });

    it('should detect array sorting issue', () => {
      const suggestions = _internal.generateSuggestions([1, 2, 3], [3, 1, 2]);
      expect(suggestions.some((s) => s.includes('wrong order'))).toBe(true);
    });

    it('should detect string case mismatch', () => {
      const suggestions = _internal.generateSuggestions('Hello', 'hello');
      expect(suggestions.some((s) => s.includes('capitalization'))).toBe(true);
    });

    it('should detect string whitespace issue', () => {
      const suggestions = _internal.generateSuggestions('hello', ' hello ');
      expect(suggestions.some((s) => s.includes('whitespace'))).toBe(true);
    });

    it('should detect close number match', () => {
      const suggestions = _internal.generateSuggestions(3.14, Math.PI);
      expect(suggestions.some((s) => s.includes('rounding') || s.includes('close'))).toBe(true);
    });

    it('should return empty suggestions for completely different values', () => {
      const suggestions = _internal.generateSuggestions([1, 2, 3], { a: 1 });
      // Only type mismatch (object vs object won't trigger since both are "object")
      // Actually, array vs object: typeof [] is "object" and typeof {} is "object"
      // So no type mismatch; and not both arrays; not both strings; not both numbers
      expect(suggestions).toEqual([]);
    });
  });
});

// ============================================================
// validateByPattern (tested through validateCode)
// ============================================================

describe('validateByPattern (via validateCode)', () => {
  it('should reject empty user code', () => {
    const result = validateCode('java', '', '', 1, {
      ...mockProblem,
      setupCode: '',
      validPatterns: [],
    });
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('Please write some java code');
  });

  it('should reject code with syntax issues', () => {
    const result = validateCode('java', '', 'function badCode( {}', 1, {
      ...mockProblem,
      setupCode: '',
      validPatterns: [/badCode/],
    });
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('Syntax errors');
  });

  it('should match valid patterns with normalization', () => {
    const problem: Problem = {
      ...mockProblem,
      setupCode: '',
      sample: 'db.users.find({age: 30})',
      validPatterns: [/db\.users\.find\(\{age:\s*30\}\)/],
    };
    // Provide code with different spacing
    const result = validateCode('mongodb', '', 'db.users.find({ age: 30 })', undefined, problem);
    expect(result.valid).toBe(true);
  });

  it('should detect hardcoded output with no setup vars', () => {
    const problem: Problem = {
      ...mockProblem,
      setupCode: '',
      sample: 'some code',
      validPatterns: [/return/],
    };
    const result = validateCode('go', '', 'return [2,4,6]', [2, 4, 6], problem);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('hardcoded');
  });

  it('should allow hardcoded-looking output when setup vars are used', () => {
    const problem: Problem = {
      ...mockProblem,
      setupCode: 'const arr = [1, 2, 3];',
      sample: 'arr.map(x => x)',
      validPatterns: [/arr/],
    };
    // Code uses setup variable "arr" even though it contains a literal
    const result = validateCode(
      'ruby',
      'const arr = [1, 2, 3];',
      'arr.map { |x| x * 2 }',
      [2, 4, 6],
      problem,
    );
    expect(result.valid).toBe(true);
  });

  it('should use flexible matching when no patterns are defined (sample-based)', () => {
    const problem: Problem = {
      ...mockProblem,
      setupCode: '',
      sample: 'println("hello")',
      validPatterns: undefined,
    };
    const result = validateCode('kotlin', '', 'println("hello")', 'hello', problem);
    expect(result.valid).toBe(true);
  });

  it('should accept any valid code when no patterns are defined', () => {
    // With no patterns, any syntactically valid code passes
    const problem: Problem = {
      ...mockProblem,
      setupCode: '',
      sample: 'println("hello")',
      validPatterns: undefined,
    };
    const result = validateCode('kotlin', '', 'System.out.println("world")', 'hello', problem);
    expect(result.valid).toBe(true);
    expect(result.feedback).toContain('correct');
  });

  it('should accept at least ONE pattern match (not all)', () => {
    const problem: Problem = {
      ...mockProblem,
      setupCode: '',
      sample: 'example',
      validPatterns: [/pattern_that_will_not_match/, /println/],
    };
    const result = validateCode('scala', '', 'println("hello")', 'hello', problem);
    expect(result.valid).toBe(true);
  });

  it('should reject when no patterns match', () => {
    const problem: Problem = {
      ...mockProblem,
      setupCode: '',
      sample: 'example',
      validPatterns: [/nope/, /nada/],
    };
    const result = validateCode('haskell', '', 'putStrLn "hello"', 'hello', problem);
    expect(result.valid).toBe(false);
    expect(result.feedback).toContain('does not match');
  });
});

// ============================================================
// Edge cases and integration
// ============================================================

describe('Edge cases', () => {
  it('executeJavaScript with setup code and user code combined', () => {
    const result = executeJavaScript(
      'const data = [1, 2, 3]; const multiplier = 10;',
      'return data.map(x => x * multiplier);',
    );
    expect(result.success).toBe(true);
    expect(result.result).toEqual([10, 20, 30]);
  });

  it('deepEqual with nested arrays and objects', () => {
    expect(deepEqual([{ a: [1, 2] }, { b: [3, 4] }], [{ a: [1, 2] }, { b: [3, 4] }])).toBe(true);
    expect(deepEqual([{ a: [1, 2] }, { b: [3, 4] }], [{ a: [1, 2] }, { b: [3, 5] }])).toBe(false);
  });

  it('validateCode for JavaScript with suggestions on incorrect output', () => {
    const result = validateCode('javascript', 'const arr = [3, 1, 2];', 'return arr;', [1, 2, 3], {
      ...mockProblem,
      setupCode: 'const arr = [3, 1, 2];',
      expected: [1, 2, 3],
    });
    expect(result.valid).toBe(false);
    // Should have suggestion about array order
    expect(result.suggestions).toBeDefined();
    expect(result.suggestions?.some((s) => s.includes('order'))).toBe(true);
  });

  it('validateCode for JavaScript with correct output includes antiCheatFlags when present', () => {
    // Code that produces correct result but does not use the method
    const result = validateCode(
      'javascript',
      'const arr = [1, 2, 3];',
      'const result = []; for (const x of arr) result.push(x * 2); return result;',
      [2, 4, 6],
      mockProblemWithMethod,
    );
    expect(result.valid).toBe(true);
    // Has warning-level anti-cheat flags but not severe enough to block
    expect(result.antiCheatFlags).toBeDefined();
  });

  it('deepEqual with arrayOrderMatters=false on nested arrays', () => {
    expect(deepEqual([3, 1, 2], [1, 2, 3], { arrayOrderMatters: false })).toBe(true);
  });

  it('checkBracketBalance handles strings and comments', () => {
    // Brackets inside strings should be ignored
    const issues = _internal.checkLanguageSyntax('java', 'String s = "({[}])"; // valid');
    expect(issues.filter((i) => i.includes('bracket') || i.includes('Mismatched')).length).toBe(0);
  });

  it('checkBracketBalance handles single-line comments', () => {
    const issues = _internal.checkLanguageSyntax('java', 'int x = 1; // this { is a comment');
    expect(issues.filter((i) => i.includes('Unclosed')).length).toBe(0);
  });

  it('checkBracketBalance handles multi-line comments', () => {
    const issues = _internal.checkLanguageSyntax('java', 'int x = 1; /* this { is } a comment */');
    expect(issues.filter((i) => i.includes('bracket')).length).toBe(0);
  });

  it('checkBracketBalance handles backtick strings', () => {
    const issues = _internal.checkLanguageSyntax('java', 'String s = `{hello}`');
    expect(issues.filter((i) => i.includes('Mismatched')).length).toBe(0);
  });

  it('checkBracketBalance detects unclosed brackets', () => {
    const issues = _internal.checkLanguageSyntax('java', 'void main() {');
    expect(issues.some((i) => i.includes('Unclosed'))).toBe(true);
  });

  it('checkBracketBalance detects mismatched close bracket', () => {
    const issues = _internal.checkLanguageSyntax('java', 'void main(]');
    expect(issues.some((i) => i.includes('Mismatched bracket'))).toBe(true);
  });

  it('checkBracketBalance handles extra close bracket with empty stack', () => {
    const issues = _internal.checkLanguageSyntax('java', ')');
    expect(issues.some((i) => i.includes('Mismatched bracket'))).toBe(true);
  });

  it('checkBracketBalance handles escaped characters inside strings', () => {
    // String with escaped quotes should not confuse bracket balance
    const issues = _internal.checkLanguageSyntax(
      'java',
      'String s = "he said \\"hi\\""; int x = 1;',
    );
    expect(
      issues.filter(
        (i) => i.includes('bracket') || i.includes('Mismatched') || i.includes('Unclosed'),
      ).length,
    ).toBe(0);
  });

  it('checkBracketBalance handles escaped backslash before close quote', () => {
    const issues = _internal.checkLanguageSyntax('java', "String s = 'it\\'s'; int x = (1);");
    expect(issues.filter((i) => i.includes('Mismatched')).length).toBe(0);
  });
});
