import { describe, expect, it } from 'vitest';
import {
  getCategoriesForLanguage,
  getCategoryCountsForLanguage,
  getMethodsByCategory,
  getMethodsByLanguage,
} from '../problems';

describe('problems - exported functions', () => {
  // ============================================================
  // getMethodsByLanguage
  // ============================================================
  describe('getMethodsByLanguage', () => {
    it('should return methods array for javascript', () => {
      const methods = getMethodsByLanguage('javascript');
      expect(Array.isArray(methods)).toBe(true);
      expect(methods.length).toBeGreaterThan(0);
    });

    it('should return the same methods for typescript as javascript', () => {
      const jsMethods = getMethodsByLanguage('javascript');
      const tsMethods = getMethodsByLanguage('typescript');
      expect(tsMethods).toBe(jsMethods); // same reference
    });

    it('should return methods array for python', () => {
      const methods = getMethodsByLanguage('python');
      expect(Array.isArray(methods)).toBe(true);
      expect(methods.length).toBeGreaterThan(0);
    });

    it('should return javascript methods for unknown language (default case)', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const methods = getMethodsByLanguage('nonexistent' as any);
      const jsMethods = getMethodsByLanguage('javascript');
      expect(methods).toBe(jsMethods);
    });

    it('should have valid structure for every method', () => {
      const methods = getMethodsByLanguage('javascript');
      for (const m of methods) {
        expect(typeof m.name).toBe('string');
        expect(m.name.length).toBeGreaterThan(0);
        expect(typeof m.category).toBe('string');
        expect(typeof m.syntax).toBe('string');
        expect(typeof m.description).toBe('string');
        expect(Array.isArray(m.arguments)).toBe(true);
        expect(m.returns).toBeDefined();
        expect(Array.isArray(m.examples)).toBe(true);
        expect(m.examples.length).toBeGreaterThan(0);
      }
    });

    it('should have python methods with different content from javascript', () => {
      const jsMethods = getMethodsByLanguage('javascript');
      const pyMethods = getMethodsByLanguage('python');
      // They should be different arrays
      expect(jsMethods).not.toBe(pyMethods);
      // Python should have python-specific methods like 'append'
      const pyNames = pyMethods.map((m) => m.name);
      expect(pyNames).toContain('append');
    });
  });

  // ============================================================
  // getCategoriesForLanguage
  // ============================================================
  describe('getCategoriesForLanguage', () => {
    it('should return unique categories for javascript', () => {
      const categories = getCategoriesForLanguage('javascript');
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);

      // All entries should be strings
      for (const cat of categories) {
        expect(typeof cat).toBe('string');
        expect(cat.length).toBeGreaterThan(0);
      }

      // Should be unique
      const uniqueCategories = new Set(categories);
      expect(uniqueCategories.size).toBe(categories.length);
    });

    it('should include arrays category for javascript', () => {
      const categories = getCategoriesForLanguage('javascript');
      expect(categories).toContain('arrays');
    });

    it('should return categories for python', () => {
      const categories = getCategoriesForLanguage('python');
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should include lists category for python', () => {
      const categories = getCategoriesForLanguage('python');
      expect(categories).toContain('lists');
    });
  });

  // ============================================================
  // getCategoryCountsForLanguage
  // ============================================================
  describe('getCategoryCountsForLanguage', () => {
    it('should return counts per category for javascript', () => {
      const counts = getCategoryCountsForLanguage('javascript');
      expect(typeof counts).toBe('object');

      // All values should be positive numbers
      for (const [key, value] of Object.entries(counts)) {
        expect(typeof key).toBe('string');
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThan(0);
      }
    });

    it('should have total matching methods length for javascript', () => {
      const methods = getMethodsByLanguage('javascript');
      const counts = getCategoryCountsForLanguage('javascript');
      const total = Object.values(counts).reduce((sum, c) => sum + c, 0);
      expect(total).toBe(methods.length);
    });

    it('should have a key for every category from getCategoriesForLanguage', () => {
      const categories = getCategoriesForLanguage('javascript');
      const counts = getCategoryCountsForLanguage('javascript');
      for (const cat of categories) {
        expect(counts[cat]).toBeDefined();
        expect(counts[cat]).toBeGreaterThan(0);
      }
    });

    it('should return counts for python', () => {
      const counts = getCategoryCountsForLanguage('python');
      expect(typeof counts).toBe('object');
      const total = Object.values(counts).reduce((sum, c) => sum + c, 0);
      const methods = getMethodsByLanguage('python');
      expect(total).toBe(methods.length);
    });
  });

  // ============================================================
  // getMethodsByCategory
  // ============================================================
  describe('getMethodsByCategory', () => {
    it('should return only methods in the specified category for javascript', () => {
      const arrayMethods = getMethodsByCategory('javascript', 'arrays');
      expect(Array.isArray(arrayMethods)).toBe(true);
      expect(arrayMethods.length).toBeGreaterThan(0);
      for (const m of arrayMethods) {
        expect(m.category).toBe('arrays');
      }
    });

    it('should return matching count from getCategoryCountsForLanguage', () => {
      const counts = getCategoryCountsForLanguage('javascript');
      const categories = getCategoriesForLanguage('javascript');
      for (const cat of categories) {
        const methods = getMethodsByCategory('javascript', cat);
        expect(methods).toHaveLength(counts[cat]);
      }
    });

    it('should return empty array for non-existent category', () => {
      const methods = getMethodsByCategory('javascript', 'nonexistent_category_xyz');
      expect(methods).toEqual([]);
    });

    it('should return python list methods', () => {
      const methods = getMethodsByCategory('python', 'lists');
      expect(methods.length).toBeGreaterThan(0);
      for (const m of methods) {
        expect(m.category).toBe('lists');
      }
    });

    it('should return a subset of getMethodsByLanguage', () => {
      const allMethods = getMethodsByLanguage('javascript');
      const arrayMethods = getMethodsByCategory('javascript', 'arrays');
      // Every method returned by getMethodsByCategory should be in getMethodsByLanguage
      for (const m of arrayMethods) {
        expect(allMethods).toContain(m);
      }
    });
  });
});
