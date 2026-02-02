import { describe, expect, it } from 'vitest';
import type { ComplexityCategory } from '../complexityProblems';
import {
  COMPLEXITY_CATEGORY_CONFIG,
  complexityQuestions,
  getComplexityCategories,
  getComplexityCategoryCounts,
  getComplexityQuestionsByCategory,
  STANDARD_COMPLEXITIES,
} from '../complexityProblems';

describe('complexityProblems', () => {
  // ============================================================
  // complexityQuestions data structure validation
  // ============================================================
  describe('complexityQuestions', () => {
    it('should contain at least one question', () => {
      expect(complexityQuestions.length).toBeGreaterThan(0);
    });

    it('should have all required fields on every question', () => {
      for (const q of complexityQuestions) {
        expect(q).toHaveProperty('id');
        expect(q).toHaveProperty('title');
        expect(q).toHaveProperty('category');
        expect(q).toHaveProperty('code');
        expect(q).toHaveProperty('timeComplexity');
        expect(q).toHaveProperty('spaceComplexity');
        expect(q).toHaveProperty('explanation');

        expect(typeof q.id).toBe('string');
        expect(typeof q.title).toBe('string');
        expect(typeof q.category).toBe('string');
        expect(typeof q.code).toBe('string');
        expect(typeof q.timeComplexity).toBe('string');
        expect(typeof q.spaceComplexity).toBe('string');
        expect(typeof q.explanation).toBe('string');

        expect(q.id.length).toBeGreaterThan(0);
        expect(q.title.length).toBeGreaterThan(0);
        expect(q.code.length).toBeGreaterThan(0);
        expect(q.timeComplexity.length).toBeGreaterThan(0);
        expect(q.spaceComplexity.length).toBeGreaterThan(0);
        expect(q.explanation.length).toBeGreaterThan(0);
      }
    });

    it('should have unique ids for all questions', () => {
      const ids = complexityQuestions.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should only contain valid categories', () => {
      const validCategories = Object.keys(COMPLEXITY_CATEGORY_CONFIG);
      for (const q of complexityQuestions) {
        expect(validCategories).toContain(q.category);
      }
    });
  });

  // ============================================================
  // COMPLEXITY_CATEGORY_CONFIG
  // ============================================================
  describe('COMPLEXITY_CATEGORY_CONFIG', () => {
    it('should have name and description for every category', () => {
      const categories: ComplexityCategory[] = [
        'arrays',
        'sorting',
        'searching',
        'trees',
        'graphs',
        'dynamic-programming',
        'hash-tables',
        'strings',
        'recursion',
        'linked-lists',
      ];

      for (const cat of categories) {
        const config = COMPLEXITY_CATEGORY_CONFIG[cat];
        expect(config).toBeDefined();
        expect(typeof config.name).toBe('string');
        expect(config.name.length).toBeGreaterThan(0);
        expect(typeof config.description).toBe('string');
        expect(config.description.length).toBeGreaterThan(0);
      }
    });

    it('should have exactly 10 categories', () => {
      const keys = Object.keys(COMPLEXITY_CATEGORY_CONFIG);
      expect(keys).toHaveLength(10);
    });
  });

  // ============================================================
  // STANDARD_COMPLEXITIES
  // ============================================================
  describe('STANDARD_COMPLEXITIES', () => {
    it('should contain expected complexity values', () => {
      expect(STANDARD_COMPLEXITIES).toContain('O(1)');
      expect(STANDARD_COMPLEXITIES).toContain('O(log n)');
      expect(STANDARD_COMPLEXITIES).toContain('O(n)');
      expect(STANDARD_COMPLEXITIES).toContain('O(n log n)');
      expect(STANDARD_COMPLEXITIES).toContain('O(n²)');
      expect(STANDARD_COMPLEXITIES).toContain('O(n³)');
      expect(STANDARD_COMPLEXITIES).toContain('O(2^n)');
      expect(STANDARD_COMPLEXITIES).toContain('O(n!)');
    });

    it('should contain O(sqrt n)', () => {
      expect(STANDARD_COMPLEXITIES).toContain('O(√n)');
    });

    it('should have at least 9 entries', () => {
      expect(STANDARD_COMPLEXITIES.length).toBeGreaterThanOrEqual(9);
    });
  });

  // ============================================================
  // getComplexityCategories
  // ============================================================
  describe('getComplexityCategories', () => {
    it('should return an array of category strings', () => {
      const categories = getComplexityCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
      for (const cat of categories) {
        expect(typeof cat).toBe('string');
      }
    });

    it('should return unique categories', () => {
      const categories = getComplexityCategories();
      const uniqueCategories = new Set(categories);
      expect(uniqueCategories.size).toBe(categories.length);
    });

    it('should include known categories', () => {
      const categories = getComplexityCategories();
      expect(categories).toContain('arrays');
      expect(categories).toContain('sorting');
      expect(categories).toContain('searching');
    });
  });

  // ============================================================
  // getComplexityCategoryCounts
  // ============================================================
  describe('getComplexityCategoryCounts', () => {
    it('should return counts per category', () => {
      const counts = getComplexityCategoryCounts();
      expect(typeof counts).toBe('object');

      // All counts should be positive numbers
      for (const [category, count] of Object.entries(counts)) {
        expect(typeof category).toBe('string');
        expect(typeof count).toBe('number');
        expect(count).toBeGreaterThan(0);
      }
    });

    it('should have totals matching complexityQuestions length', () => {
      const counts = getComplexityCategoryCounts();
      const total = Object.values(counts).reduce((sum, c) => sum + c, 0);
      expect(total).toBe(complexityQuestions.length);
    });

    it('should have a count for every category present in the data', () => {
      const categories = getComplexityCategories();
      const counts = getComplexityCategoryCounts();
      for (const cat of categories) {
        expect(counts[cat]).toBeDefined();
        expect(counts[cat]).toBeGreaterThan(0);
      }
    });
  });

  // ============================================================
  // getComplexityQuestionsByCategory
  // ============================================================
  describe('getComplexityQuestionsByCategory', () => {
    it('should return all questions when given an empty array', () => {
      const questions = getComplexityQuestionsByCategory([]);
      expect(questions).toHaveLength(complexityQuestions.length);
      expect(questions).toEqual(complexityQuestions);
    });

    it('should filter to specific categories', () => {
      const questions = getComplexityQuestionsByCategory(['arrays']);
      expect(questions.length).toBeGreaterThan(0);
      for (const q of questions) {
        expect(q.category).toBe('arrays');
      }
    });

    it('should support multiple categories', () => {
      const questions = getComplexityQuestionsByCategory(['arrays', 'sorting']);
      expect(questions.length).toBeGreaterThan(0);
      for (const q of questions) {
        expect(['arrays', 'sorting']).toContain(q.category);
      }
      // Should have both categories represented
      const categories = new Set(questions.map((q) => q.category));
      expect(categories.has('arrays')).toBe(true);
      expect(categories.has('sorting')).toBe(true);
    });

    it('should return empty array for non-existing category', () => {
      const questions = getComplexityQuestionsByCategory(['nonexistent-category']);
      expect(questions).toHaveLength(0);
    });

    it('should return count matching getComplexityCategoryCounts for a specific category', () => {
      const counts = getComplexityCategoryCounts();
      const sortingQuestions = getComplexityQuestionsByCategory(['sorting']);
      expect(sortingQuestions).toHaveLength(counts.sorting);
    });
  });
});
