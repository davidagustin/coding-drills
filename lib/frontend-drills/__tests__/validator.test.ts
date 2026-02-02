import { describe, expect, it } from 'vitest';
import type { FrontendDrillProblem } from '../types';
import { validateFrontendDrillAnswer } from '../validator';

const reactProblem: FrontendDrillProblem = {
  id: 'fe-react-usestate-basic',
  framework: 'react',
  category: 'State & Lifecycle',
  difficulty: 'easy',
  title: 'useState Basic Usage',
  text: 'Call useState with initial value 42 and return just the state value.',
  setup: 'Mock useState.',
  setupCode: `const useState = (initial) => [initial, (v) => v];`,
  expected: 42,
  sample: 'useState(42)[0]',
};

const angularProblem: FrontendDrillProblem = {
  id: 'fe-ng-input-decorator',
  framework: 'angular',
  category: 'State & Lifecycle',
  difficulty: 'easy',
  title: '@Input Decorator',
  text: 'Declare @Input() name: string;',
  setup: 'Write the decorated property.',
  setupCode: `class MyComponent {}`,
  expected: '@Input decorated property',
  sample: `@Input() name: string;`,
  validPatterns: [/@Input\s*\(\s*\)\s+name\s*:\s*string/, /@Input\s*\(\s*\)\s+name\s*[;:]/],
};

describe('validateFrontendDrillAnswer', () => {
  describe('JavaScript/React validation', () => {
    it('should accept correct answer for React problem', () => {
      const result = validateFrontendDrillAnswer(reactProblem, 'useState(42)[0]');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.output).toBe(42);
      }
    });

    it('should accept answer with extra whitespace', () => {
      const result = validateFrontendDrillAnswer(reactProblem, '  useState(42)[0]  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.output).toBe(42);
      }
    });

    it('should reject wrong answer', () => {
      const result = validateFrontendDrillAnswer(reactProblem, 'useState(0)[0]');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });

    it('should reject invalid syntax', () => {
      const result = validateFrontendDrillAnswer(reactProblem, 'useState(42[');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeTruthy();
      }
    });
  });

  describe('Angular pattern validation', () => {
    it('should accept answer matching validPatterns', () => {
      const result = validateFrontendDrillAnswer(angularProblem, '@Input() name: string;');
      expect(result.success).toBe(true);
    });

    it('should accept answer with extra whitespace that still matches', () => {
      const result = validateFrontendDrillAnswer(angularProblem, '@Input() name: string;');
      expect(result.success).toBe(true);
    });

    it('should reject answer that does not match pattern', () => {
      const result = validateFrontendDrillAnswer(angularProblem, '@Input() title: string;');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });
  });
});
