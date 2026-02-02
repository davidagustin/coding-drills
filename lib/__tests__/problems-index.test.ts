/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest';
import {
  getAllProblems,
  getCategoriesForLanguage,
  getProblemCountByLanguage,
  getProblemCountsByCategory,
  getProblemsByCategory,
  getProblemsByDifficulty,
  getProblemsForLanguage,
  getRandomProblem,
  problemsByLanguage,
  searchProblemsByTag,
} from '../problems/index';

describe('problemsByLanguage', () => {
  it('should have expected languages', () => {
    const keys = Object.keys(problemsByLanguage);
    expect(keys).toContain('javascript');
    expect(keys).toContain('typescript');
    expect(keys).toContain('python');
    expect(keys).toContain('java');
    expect(keys).toContain('cpp');
    expect(keys).toContain('go');
    expect(keys).toContain('ruby');
    expect(keys).toContain('c');
    expect(keys).toContain('postgresql');
    expect(keys).toContain('mysql');
    expect(keys).toContain('mongodb');
    expect(keys).toContain('rust');
    expect(keys).toContain('swift');
    expect(keys).toContain('kotlin');
  });

  it('should have arrays of problems for each language', () => {
    for (const [_lang, problems] of Object.entries(problemsByLanguage)) {
      expect(Array.isArray(problems)).toBe(true);
      if (problems && problems.length > 0) {
        expect(problems[0]).toHaveProperty('id');
        expect(problems[0]).toHaveProperty('category');
        expect(problems[0]).toHaveProperty('difficulty');
        expect(problems[0]).toHaveProperty('title');
      }
    }
  });
});

describe('getProblemsForLanguage', () => {
  it('should return an array of problems for javascript', () => {
    const problems = getProblemsForLanguage('javascript');
    expect(Array.isArray(problems)).toBe(true);
    expect(problems.length).toBeGreaterThan(0);
    expect(problems[0]).toHaveProperty('id');
    expect(problems[0]).toHaveProperty('category');
  });

  it('should return an array of problems for python', () => {
    const problems = getProblemsForLanguage('python');
    expect(Array.isArray(problems)).toBe(true);
    expect(problems.length).toBeGreaterThan(0);
  });

  it('should return an empty array for nonexistent language', () => {
    const problems = getProblemsForLanguage('nonexistent' as any);
    expect(Array.isArray(problems)).toBe(true);
    expect(problems.length).toBe(0);
  });
});

describe('getAllProblems', () => {
  it('should return all problems across all languages', () => {
    const allProblems = getAllProblems();
    expect(Array.isArray(allProblems)).toBe(true);
    expect(allProblems.length).toBeGreaterThan(0);

    // Should be more than any single language
    const jsProblems = getProblemsForLanguage('javascript');
    expect(allProblems.length).toBeGreaterThan(jsProblems.length);
  });

  it('should include problems from multiple languages', () => {
    const allProblems = getAllProblems();
    const ids = allProblems.map((p) => p.id);
    // JS problems start with js-, python with py-
    const hasJs = ids.some((id) => id.startsWith('js-'));
    const hasPy = ids.some((id) => id.startsWith('py-'));
    expect(hasJs).toBe(true);
    expect(hasPy).toBe(true);
  });
});

describe('getProblemsByCategory', () => {
  it('should return filtered problems for a valid category', () => {
    // First get categories to find a valid one
    const categories = getCategoriesForLanguage('javascript');
    expect(categories.length).toBeGreaterThan(0);

    const filtered = getProblemsByCategory('javascript', categories[0]);
    expect(Array.isArray(filtered)).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach((p) => {
      expect(p.category).toBe(categories[0]);
    });
  });

  it('should return empty array for nonexistent category', () => {
    const filtered = getProblemsByCategory('javascript', 'nonexistent');
    expect(Array.isArray(filtered)).toBe(true);
    expect(filtered.length).toBe(0);
  });

  it('should return empty array for nonexistent language', () => {
    const filtered = getProblemsByCategory('nonexistent' as any, 'Array');
    expect(Array.isArray(filtered)).toBe(true);
    expect(filtered.length).toBe(0);
  });
});

describe('getProblemsByDifficulty', () => {
  it('should return easy problems for javascript', () => {
    const easy = getProblemsByDifficulty('javascript', 'easy');
    expect(Array.isArray(easy)).toBe(true);
    expect(easy.length).toBeGreaterThan(0);
    easy.forEach((p) => {
      expect(p.difficulty).toBe('easy');
    });
  });

  it('should return medium problems for javascript', () => {
    const medium = getProblemsByDifficulty('javascript', 'medium');
    expect(Array.isArray(medium)).toBe(true);
    medium.forEach((p) => {
      expect(p.difficulty).toBe('medium');
    });
  });

  it('should return empty array for nonexistent language', () => {
    const problems = getProblemsByDifficulty('nonexistent' as any, 'easy');
    expect(problems.length).toBe(0);
  });
});

describe('getCategoriesForLanguage', () => {
  it('should return unique categories for javascript', () => {
    const categories = getCategoriesForLanguage('javascript');
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);

    // Verify uniqueness
    const unique = new Set(categories);
    expect(unique.size).toBe(categories.length);
  });

  it('should return empty array for nonexistent language', () => {
    const categories = getCategoriesForLanguage('nonexistent' as any);
    expect(categories.length).toBe(0);
  });
});

describe('getProblemCountsByCategory', () => {
  it('should return counts for javascript categories', () => {
    const counts = getProblemCountsByCategory('javascript');
    expect(typeof counts).toBe('object');

    const keys = Object.keys(counts);
    expect(keys.length).toBeGreaterThan(0);

    // Every count should be a positive number
    for (const count of Object.values(counts)) {
      expect(count).toBeGreaterThan(0);
    }
  });

  it('should return empty object for nonexistent language', () => {
    const counts = getProblemCountsByCategory('nonexistent' as any);
    expect(Object.keys(counts).length).toBe(0);
  });

  it('should have counts that match actual problem counts', () => {
    const counts = getProblemCountsByCategory('javascript');
    const categories = getCategoriesForLanguage('javascript');

    for (const category of categories) {
      const problems = getProblemsByCategory('javascript', category);
      expect(counts[category]).toBe(problems.length);
    }
  });
});

describe('getProblemCountByLanguage', () => {
  it('should return counts for all languages', () => {
    const counts = getProblemCountByLanguage();
    expect(typeof counts).toBe('object');

    expect(counts['javascript']).toBeGreaterThan(0);
    expect(counts['python']).toBeGreaterThan(0);
    expect(counts['typescript']).toBeGreaterThan(0);
  });

  it('should match actual problem lengths', () => {
    const counts = getProblemCountByLanguage();
    const jsProblems = getProblemsForLanguage('javascript');
    expect(counts['javascript']).toBe(jsProblems.length);
  });
});

describe('getRandomProblem', () => {
  it('should return a problem for javascript', () => {
    const problem = getRandomProblem('javascript');
    expect(problem).not.toBeNull();
    expect(problem).toHaveProperty('id');
    expect(problem).toHaveProperty('category');
    expect(problem).toHaveProperty('difficulty');
  });

  it('should return null for nonexistent language', () => {
    const problem = getRandomProblem('nonexistent' as any);
    expect(problem).toBeNull();
  });

  it('should return a problem that belongs to the language', () => {
    const problem = getRandomProblem('javascript');
    expect(problem).not.toBeNull();
    const allJsProblems = getProblemsForLanguage('javascript');
    const ids = allJsProblems.map((p) => p.id);
    expect(ids).toContain(problem!.id);
  });
});

describe('searchProblemsByTag', () => {
  it('should return problems matching a tag for javascript', () => {
    // Find a tag that exists
    const allProblems = getProblemsForLanguage('javascript');
    const problemWithTags = allProblems.find((p) => p.tags && p.tags.length > 0);

    if (problemWithTags && problemWithTags.tags) {
      const tag = problemWithTags.tags[0];
      const results = searchProblemsByTag('javascript', tag);
      expect(results.length).toBeGreaterThan(0);
      results.forEach((p) => {
        expect(p.tags).toContain(tag);
      });
    }
  });

  it('should return empty array for nonexistent tag', () => {
    const results = searchProblemsByTag('javascript', 'definitely-not-a-real-tag-xyz');
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });

  it('should return empty array for nonexistent language', () => {
    const results = searchProblemsByTag('nonexistent' as any, 'some-tag');
    expect(results.length).toBe(0);
  });
});
