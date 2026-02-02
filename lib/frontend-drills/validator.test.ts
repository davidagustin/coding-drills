import { describe, expect, it } from 'vitest';
import type { FrontendDrillProblem } from './types';
import { validateFrontendDrillAnswer } from './validator';

describe('frontend-drills/validator', () => {
  const nativeJsQueryClassProblem: FrontendDrillProblem = {
    id: 'fe-js-query-class',
    framework: 'native-js',
    category: 'DOM & Events',
    difficulty: 'easy',
    title: 'Query Elements by Class',
    text: 'Filter the elements array to find all elements with the class "active".',
    setup: 'An array of element objects.',
    setupCode: `const elements = [
  { tagName: "div", id: "a", classList: ["active", "card"] },
  { tagName: "span", id: "b", classList: ["hidden"] },
  { tagName: "div", id: "c", classList: ["active"] },
  { tagName: "p", id: "d", classList: [] }
];`,
    expected: [
      { tagName: 'div', id: 'a', classList: ['active', 'card'] },
      { tagName: 'div', id: 'c', classList: ['active'] },
    ],
    sample: 'elements.filter(el => el.classList.includes("active"))',
    hints: [],
    tags: [],
  };

  describe('validateFrontendDrillAnswer', () => {
    describe('Native JS / React / Vue (JavaScript validation)', () => {
      it('should accept correct answer matching expected output', () => {
        const result = validateFrontendDrillAnswer(
          nativeJsQueryClassProblem,
          'elements.filter(el => el.classList.includes("active"))',
        );
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.output).toEqual(nativeJsQueryClassProblem.expected);
        }
      });

      it('should accept equivalent correct answer with different variable name in arrow', () => {
        const result = validateFrontendDrillAnswer(
          nativeJsQueryClassProblem,
          'elements.filter(x => x.classList.includes("active"))',
        );
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.output).toEqual(nativeJsQueryClassProblem.expected);
        }
      });

      it('should reject wrong answer that produces different output', () => {
        const result = validateFrontendDrillAnswer(
          nativeJsQueryClassProblem,
          'elements.filter(el => el.classList.includes("hidden"))',
        );
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error).toBeDefined();
          expect(typeof result.error).toBe('string');
        }
      });

      it('should reject empty or invalid code', () => {
        const result = validateFrontendDrillAnswer(nativeJsQueryClassProblem, '');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error).toBeDefined();
        }
      });

      it('should reject code that throws', () => {
        const result = validateFrontendDrillAnswer(
          nativeJsQueryClassProblem,
          'elements.filter(el => el.nonexistent())',
        );
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error).toBeDefined();
        }
      });
    });

    describe('Angular (validPatterns / regex validation)', () => {
      const angularDecoratorProblem: FrontendDrillProblem = {
        id: 'fe-ng-component',
        framework: 'angular',
        category: 'Rendering',
        difficulty: 'easy',
        title: 'Component Decorator',
        text: 'Use @Component decorator.',
        setup: 'Angular component.',
        setupCode: '',
        expected: true,
        sample: '@Component({ selector: "app-foo" })',
        validPatterns: [/@Component\s*\(/, /selector\s*:\s*['"]app-/],
      };

      it('should accept answer matching all required patterns', () => {
        const result = validateFrontendDrillAnswer(
          angularDecoratorProblem,
          '@Component({ selector: "app-foo", template: "<p>Hi</p>" })',
        );
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.output).toBe(true);
        }
      });

      it('should reject answer when no required pattern matches', () => {
        const result = validateFrontendDrillAnswer(angularDecoratorProblem, 'export class Foo {}');
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error).toBeDefined();
          expect(result.error).toContain('method or pattern');
        }
      });

      it('should accept answer when at least one pattern matches', () => {
        const result = validateFrontendDrillAnswer(
          angularDecoratorProblem,
          '@Component({ selector: "foo-bar" })',
        );
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.output).toBe(true);
        }
      });
    });
  });
});
