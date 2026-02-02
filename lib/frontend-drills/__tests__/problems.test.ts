import { describe, expect, it } from 'vitest';
import {
  getCategories,
  getCategoryCounts,
  getProblemCount,
  getProblems,
  getTotalProblemCount,
  problemsByFramework,
} from '../problems/index';

describe('frontend-drills problems', () => {
  const frameworks = ['native-js', 'react', 'angular', 'vue'] as const;

  describe('problemsByFramework', () => {
    it('should have an entry for each framework', () => {
      for (const fw of frameworks) {
        expect(problemsByFramework[fw]).toBeDefined();
        expect(Array.isArray(problemsByFramework[fw])).toBe(true);
      }
    });
  });

  describe('getProblems', () => {
    it('should return array of problems for valid framework', () => {
      for (const fw of frameworks) {
        const problems = getProblems(fw);
        expect(Array.isArray(problems)).toBe(true);
        for (const p of problems) {
          expect(p.id).toBeTruthy();
          expect(p.framework).toBe(fw);
          expect(p.category).toBeTruthy();
          expect(p.difficulty).toMatch(/^(easy|medium|hard)$/);
          expect(p.title).toBeTruthy();
          expect(p.text).toBeTruthy();
          expect(p.setupCode).toBeDefined();
          expect(p.expected).toBeDefined();
          expect(p.sample).toBeTruthy();
        }
      }
    });

    it('should return empty array for unknown framework', () => {
      const problems = getProblems('unknown' as 'react');
      expect(problems).toEqual([]);
    });
  });

  describe('getProblemCount', () => {
    it('should match length of getProblems', () => {
      for (const fw of frameworks) {
        expect(getProblemCount(fw)).toBe(getProblems(fw).length);
      }
    });
  });

  describe('getTotalProblemCount', () => {
    it('should equal sum of all framework counts', () => {
      const sum = frameworks.reduce((s, fw) => s + getProblemCount(fw), 0);
      expect(getTotalProblemCount()).toBe(sum);
    });
  });

  describe('getCategories', () => {
    it('should return unique categories for each framework', () => {
      for (const fw of frameworks) {
        const categories = getCategories(fw);
        expect(Array.isArray(categories)).toBe(true);
        const unique = new Set(categories);
        expect(unique.size).toBe(categories.length);
      }
    });

    it('should only include categories that exist in problems', () => {
      for (const fw of frameworks) {
        const problems = getProblems(fw);
        const categories = getCategories(fw);
        const problemCategories = new Set(problems.map((p) => p.category));
        for (const cat of categories) {
          expect(problemCategories.has(cat)).toBe(true);
        }
      }
    });
  });

  describe('getCategoryCounts', () => {
    it('should sum to problem count per framework', () => {
      for (const fw of frameworks) {
        const counts = getCategoryCounts(fw);
        const sum = Object.values(counts).reduce((a, b) => a + b, 0);
        expect(sum).toBe(getProblemCount(fw));
      }
    });
  });
});
