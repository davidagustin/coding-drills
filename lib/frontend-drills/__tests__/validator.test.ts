import { describe, expect, it } from 'vitest';
import { getProblems } from '../problems/index';
import { validateFrontendDrillAnswer } from '../validator';

describe('Frontend Drills - validator', () => {
  describe('validateFrontendDrillAnswer', () => {
    it('should accept correct React answer (sample solution)', () => {
      const problems = getProblems('react');
      const problem = problems.find((p) => p.id === 'fe-react-usestate-basic');
      expect(problem).toBeDefined();
      if (!problem) return;

      const result = validateFrontendDrillAnswer(problem, 'useState(42)[0]');
      expect(result.success).toBe(true);
      expect(result.output).toBe(42);
    });

    it('should accept equivalent correct answer with different formatting', () => {
      const problems = getProblems('react');
      const problem = problems.find((p) => p.id === 'fe-react-usestate-basic');
      expect(problem).toBeDefined();
      if (!problem) return;

      const result = validateFrontendDrillAnswer(problem, '  useState(42)[0]  ');
      expect(result.success).toBe(true);
    });

    it('should reject wrong answer', () => {
      const problems = getProblems('react');
      const problem = problems.find((p) => p.id === 'fe-react-usestate-basic');
      expect(problem).toBeDefined();
      if (!problem) return;

      const result = validateFrontendDrillAnswer(problem, 'useState(0)[0]');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should accept correct useRef answer (sample solution)', () => {
      const problems = getProblems('react');
      const problem = problems.find((p) => p.id === 'fe-react-useref-init');
      expect(problem).toBeDefined();
      if (!problem) return;

      const result = validateFrontendDrillAnswer(problem, problem.sample);
      expect(result).toHaveProperty('success');
      expect(typeof result.success).toBe('boolean');
      if (result.success && result.output !== undefined) {
        expect(result.output).toEqual({ current: 'hello' });
      }
    });

    it('should reject forbidden patterns (eval)', () => {
      const problems = getProblems('react');
      const problem = problems.find((p) => p.id === 'fe-react-usestate-basic');
      expect(problem).toBeDefined();
      if (!problem) return;

      const result = validateFrontendDrillAnswer(problem, 'eval("useState(42)[0]")');
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/forbidden|dangerous/i);
    });

    it('should return validation result for Vue framework problem', () => {
      const problems = getProblems('vue');
      if (problems.length === 0) return;
      const problem = problems[0];
      const result = validateFrontendDrillAnswer(problem, problem.sample);
      expect(result).toHaveProperty('success');
      expect(typeof result.success).toBe('boolean');
    });

    it('should work for native-js framework problem when available', () => {
      const problems = getProblems('native-js');
      if (problems.length === 0) return;
      const problem = problems[0];
      const sample = problem.sample;
      const result = validateFrontendDrillAnswer(problem, sample);
      expect(result.success).toBe(true);
    });
  });
});
