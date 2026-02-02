import { describe, expect, it } from 'vitest';

import {
  cProblems,
  getCCategories,
  getCProblemById,
  getCProblemsByCategory,
  getCProblemsByDifficulty,
  getCProblemsByTag,
} from '../../problems/c';
import {
  getTypescriptCategories,
  getTypescriptProblemById,
  getTypescriptProblemsByCategory,
  getTypescriptProblemsByDifficulty,
  getTypescriptProblemsByTag,
  typescriptProblems,
} from '../../problems/typescript';

// ============================================================================
// C Language Helper Functions
// ============================================================================

describe('C language helpers', () => {
  describe('cProblems array', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(cProblems)).toBe(true);
      expect(cProblems.length).toBeGreaterThan(0);
    });

    it('should contain problems with required fields', () => {
      const first = cProblems[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('category');
      expect(first).toHaveProperty('difficulty');
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('text');
    });
  });

  describe('getCProblemById', () => {
    it('should return a problem for a valid id', () => {
      const problem = getCProblemById('c-strlen');
      expect(problem).toBeDefined();
      expect(problem?.id).toBe('c-strlen');
      expect(problem?.title).toMatch(/strlen/i);
    });

    it('should return the correct problem object', () => {
      const problem = getCProblemById('c-strcpy');
      expect(problem).toBeDefined();
      expect(problem?.id).toBe('c-strcpy');
      expect(problem?.category).toBe('String Functions');
    });

    it('should return undefined for a non-existent id', () => {
      const problem = getCProblemById('non-existent-id');
      expect(problem).toBeUndefined();
    });

    it('should return undefined for an empty string', () => {
      const problem = getCProblemById('');
      expect(problem).toBeUndefined();
    });

    it('should not match partial ids', () => {
      const problem = getCProblemById('c-str');
      expect(problem).toBeUndefined();
    });
  });

  describe('getCProblemsByCategory', () => {
    it('should return problems for a valid category', () => {
      const problems = getCProblemsByCategory('String Functions');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.category).toBe('String Functions');
      });
    });

    it('should return problems for another valid category', () => {
      const problems = getCProblemsByCategory('Memory Functions');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.category).toBe('Memory Functions');
      });
    });

    it('should return an empty array for a non-existent category', () => {
      const problems = getCProblemsByCategory('Nonexistent Category');
      expect(problems).toEqual([]);
    });

    it('should return an empty array for an empty string', () => {
      const problems = getCProblemsByCategory('');
      expect(problems).toEqual([]);
    });

    it('should be case-sensitive', () => {
      const problems = getCProblemsByCategory('string functions');
      expect(problems).toEqual([]);
    });
  });

  describe('getCProblemsByDifficulty', () => {
    it('should return easy problems', () => {
      const problems = getCProblemsByDifficulty('easy');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.difficulty).toBe('easy');
      });
    });

    it('should return medium problems', () => {
      const problems = getCProblemsByDifficulty('medium');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.difficulty).toBe('medium');
      });
    });

    it('should return hard problems', () => {
      const problems = getCProblemsByDifficulty('hard');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.difficulty).toBe('hard');
      });
    });

    it('should return an empty array for an invalid difficulty', () => {
      // Cast to bypass type checking for the edge case test
      const problems = getCProblemsByDifficulty('impossible' as 'easy');
      expect(problems).toEqual([]);
    });

    it('should return all problems when summing all difficulties', () => {
      const easy = getCProblemsByDifficulty('easy');
      const medium = getCProblemsByDifficulty('medium');
      const hard = getCProblemsByDifficulty('hard');
      expect(easy.length + medium.length + hard.length).toBe(cProblems.length);
    });
  });

  describe('getCProblemsByTag', () => {
    it('should return problems matching a valid tag', () => {
      const problems = getCProblemsByTag('strlen');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.tags).toContain('strlen');
      });
    });

    it('should return problems for the string.h tag', () => {
      const problems = getCProblemsByTag('string.h');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.tags).toContain('string.h');
      });
    });

    it('should return an empty array for a non-existent tag', () => {
      const problems = getCProblemsByTag('nonexistent-tag-xyz');
      expect(problems).toEqual([]);
    });

    it('should return an empty array for an empty string tag', () => {
      const problems = getCProblemsByTag('');
      expect(problems).toEqual([]);
    });
  });

  describe('getCCategories', () => {
    it('should return a non-empty array of strings', () => {
      const categories = getCCategories();
      expect(categories.length).toBeGreaterThan(0);
      categories.forEach((c) => {
        expect(typeof c).toBe('string');
      });
    });

    it('should contain known categories', () => {
      const categories = getCCategories();
      expect(categories).toContain('String Functions');
      expect(categories).toContain('Memory Functions');
    });

    it('should contain only unique values', () => {
      const categories = getCCategories();
      const uniqueCategories = [...new Set(categories)];
      expect(categories.length).toBe(uniqueCategories.length);
    });

    it('should match the categories present in the problems array', () => {
      const categories = getCCategories();
      const categoriesFromProblems = [...new Set(cProblems.map((p) => p.category))];
      expect(categories.sort()).toEqual(categoriesFromProblems.sort());
    });
  });
});

// ============================================================================
// TypeScript Language Helper Functions
// ============================================================================

describe('TypeScript language helpers', () => {
  describe('typescriptProblems array', () => {
    it('should be a non-empty array', () => {
      expect(Array.isArray(typescriptProblems)).toBe(true);
      expect(typescriptProblems.length).toBeGreaterThan(0);
    });

    it('should contain problems with required fields', () => {
      const first = typescriptProblems[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('category');
      expect(first).toHaveProperty('difficulty');
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('text');
    });
  });

  describe('getTypescriptProblemById', () => {
    it('should return a problem for a valid id', () => {
      const problem = getTypescriptProblemById('ts-filter-type-guard-nullish');
      expect(problem).toBeDefined();
      expect(problem?.id).toBe('ts-filter-type-guard-nullish');
    });

    it('should return the correct problem object', () => {
      const problem = getTypescriptProblemById('ts-filter-type-guard-numbers');
      expect(problem).toBeDefined();
      expect(problem?.id).toBe('ts-filter-type-guard-numbers');
      expect(problem?.category).toBe('Type-Safe Array Methods');
    });

    it('should return undefined for a non-existent id', () => {
      const problem = getTypescriptProblemById('non-existent-id');
      expect(problem).toBeUndefined();
    });

    it('should return undefined for an empty string', () => {
      const problem = getTypescriptProblemById('');
      expect(problem).toBeUndefined();
    });

    it('should not match partial ids', () => {
      const problem = getTypescriptProblemById('ts-filter');
      expect(problem).toBeUndefined();
    });
  });

  describe('getTypescriptProblemsByCategory', () => {
    it('should return problems for a valid category', () => {
      const problems = getTypescriptProblemsByCategory('Type-Safe Array Methods');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.category).toBe('Type-Safe Array Methods');
      });
    });

    it('should return problems for another valid category', () => {
      const problems = getTypescriptProblemsByCategory('Utility Types');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.category).toBe('Utility Types');
      });
    });

    it('should return an empty array for a non-existent category', () => {
      const problems = getTypescriptProblemsByCategory('Nonexistent Category');
      expect(problems).toEqual([]);
    });

    it('should return an empty array for an empty string', () => {
      const problems = getTypescriptProblemsByCategory('');
      expect(problems).toEqual([]);
    });

    it('should be case-sensitive', () => {
      const problems = getTypescriptProblemsByCategory('utility types');
      expect(problems).toEqual([]);
    });
  });

  describe('getTypescriptProblemsByDifficulty', () => {
    it('should return easy problems', () => {
      const problems = getTypescriptProblemsByDifficulty('easy');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.difficulty).toBe('easy');
      });
    });

    it('should return medium problems', () => {
      const problems = getTypescriptProblemsByDifficulty('medium');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.difficulty).toBe('medium');
      });
    });

    it('should return hard problems', () => {
      const problems = getTypescriptProblemsByDifficulty('hard');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.difficulty).toBe('hard');
      });
    });

    it('should return an empty array for an invalid difficulty', () => {
      const problems = getTypescriptProblemsByDifficulty('impossible' as 'easy');
      expect(problems).toEqual([]);
    });

    it('should return all problems when summing all difficulties', () => {
      const easy = getTypescriptProblemsByDifficulty('easy');
      const medium = getTypescriptProblemsByDifficulty('medium');
      const hard = getTypescriptProblemsByDifficulty('hard');
      expect(easy.length + medium.length + hard.length).toBe(typescriptProblems.length);
    });
  });

  describe('getTypescriptProblemsByTag', () => {
    it('should return problems matching a valid tag', () => {
      const problems = getTypescriptProblemsByTag('filter');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.tags).toContain('filter');
      });
    });

    it('should return problems for the type-guard tag', () => {
      const problems = getTypescriptProblemsByTag('type-guard');
      expect(problems.length).toBeGreaterThan(0);
      problems.forEach((p) => {
        expect(p.tags).toContain('type-guard');
      });
    });

    it('should return an empty array for a non-existent tag', () => {
      const problems = getTypescriptProblemsByTag('nonexistent-tag-xyz');
      expect(problems).toEqual([]);
    });

    it('should return an empty array for an empty string tag', () => {
      const problems = getTypescriptProblemsByTag('');
      expect(problems).toEqual([]);
    });
  });

  describe('getTypescriptCategories', () => {
    it('should return a non-empty array of strings', () => {
      const categories = getTypescriptCategories();
      expect(categories.length).toBeGreaterThan(0);
      categories.forEach((c) => {
        expect(typeof c).toBe('string');
      });
    });

    it('should contain known categories', () => {
      const categories = getTypescriptCategories();
      expect(categories).toContain('Type-Safe Array Methods');
      expect(categories).toContain('Utility Types');
    });

    it('should contain only unique values', () => {
      const categories = getTypescriptCategories();
      const uniqueCategories = [...new Set(categories)];
      expect(categories.length).toBe(uniqueCategories.length);
    });

    it('should match the categories present in the problems array', () => {
      const categories = getTypescriptCategories();
      const categoriesFromProblems = [...new Set(typescriptProblems.map((p) => p.category))];
      expect(categories.sort()).toEqual(categoriesFromProblems.sort());
    });
  });
});
