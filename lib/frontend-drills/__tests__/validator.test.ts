import { describe, expect, it } from 'vitest';
import type { FrontendDrillProblem } from '../types';
import { validateFrontendDrillAnswer } from '../validator';

const reactUseStateProblem: FrontendDrillProblem = {
  id: 'fe-react-usestate-basic',
  framework: 'react',
  category: 'State & Lifecycle',
  difficulty: 'easy',
  title: 'useState Basic Usage',
  text: 'Call useState with initial value 42 and return just the state value.',
  setup: 'A mock useState function.',
  setupCode: `const useState = (initial) => [initial, (v) => v];`,
  expected: 42,
  sample: 'useState(42)[0]',
  hints: ['useState returns an array'],
  tags: ['hooks', 'useState'],
};

// Angular problem with no setup variables so checkRequiredPatterns only checks regex
const angularComponentProblem: FrontendDrillProblem = {
  id: 'fe-ng-component-decorator',
  framework: 'angular',
  category: 'Rendering',
  difficulty: 'easy',
  title: 'Component Decorator',
  text: 'Write an Angular @Component decorator with selector "app-hello".',
  setup: 'Write the full @Component({...}) decorator call.',
  setupCode: ``,
  expected: '@Component decorator with selector and template',
  sample: `@Component({ selector: 'app-hello', template: '<h1>Hello</h1>' })`,
  validPatterns: [
    /@Component\s*\(\s*\{[^}]*selector\s*:\s*['"]app-hello['"][^}]*template\s*:/,
    /@Component\s*\(\s*\{[^}]*template\s*:[^}]*selector\s*:\s*['"]app-hello['"]/,
  ],
  hints: ['Use @Component({...})'],
  tags: ['decorator', 'component'],
};

describe('validateFrontendDrillAnswer', () => {
  describe('React / Native JS / Vue (JavaScript validation)', () => {
    it('accepts correct answer for useState problem', () => {
      const result = validateFrontendDrillAnswer(reactUseStateProblem, 'useState(42)[0]');
      expect(result).toEqual({ success: true, output: 42 });
    });

    it('accepts equivalent correct answer with extra semicolon', () => {
      const result = validateFrontendDrillAnswer(reactUseStateProblem, 'useState(42)[0];');
      expect(result).toEqual({ success: true, output: 42 });
    });

    it('rejects wrong answer (wrong value)', () => {
      const result = validateFrontendDrillAnswer(reactUseStateProblem, 'useState(0)[0]');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeTruthy();
      }
    });

    it('rejects wrong answer (wrong type)', () => {
      const result = validateFrontendDrillAnswer(reactUseStateProblem, 'useState("wrong")[0]');
      expect(result.success).toBe(false);
    });
  });

  describe('Angular (pattern validation)', () => {
    it('accepts valid @Component with selector and template', () => {
      const answer = `@Component({
  selector: 'app-hello',
  template: '<h1>Hello World</h1>'
})`;
      const result = validateFrontendDrillAnswer(angularComponentProblem, answer);
      expect(result).toEqual({ success: true, output: angularComponentProblem.expected });
    });

    it('accepts template before selector', () => {
      const answer = `@Component({
  template: '<h1>Hello</h1>',
  selector: 'app-hello'
})`;
      const result = validateFrontendDrillAnswer(angularComponentProblem, answer);
      expect(result).toEqual({ success: true, output: angularComponentProblem.expected });
    });

    it('rejects answer without selector', () => {
      const result = validateFrontendDrillAnswer(
        angularComponentProblem,
        `@Component({ template: '<h1>Hi</h1>' })`,
      );
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeTruthy();
      }
    });

    it('rejects answer with wrong selector', () => {
      const result = validateFrontendDrillAnswer(
        angularComponentProblem,
        `@Component({ selector: 'app-other', template: '<h1>Hi</h1>' })`,
      );
      expect(result.success).toBe(false);
    });
  });
});
