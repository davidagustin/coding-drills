import { describe, expect, it } from 'vitest';
import {
  getCategories,
  getCategoryCounts,
  getProblemCount,
  getProblems,
  getTotalProblemCount,
  problemsByFramework,
} from '../problems/index';
import type { FrameworkId } from '../types';

const FRAMEWORKS: FrameworkId[] = ['native-js', 'react', 'angular', 'vue'];

describe('frontend-drills problems', () => {
  describe('getProblems', () => {
    it('returns an array for each framework', () => {
      for (const fw of FRAMEWORKS) {
        const problems = getProblems(fw);
        expect(Array.isArray(problems)).toBe(true);
      }
    });

    it('each problem has required fields', () => {
      for (const fw of FRAMEWORKS) {
        const problems = getProblems(fw);
        for (const p of problems) {
          expect(p.id).toBeTruthy();
          expect(p.framework).toBe(fw);
          expect(p.category).toBeTruthy();
          expect(['easy', 'medium', 'hard']).toContain(p.difficulty);
          expect(p.title).toBeTruthy();
          expect(p.text).toBeTruthy();
          expect(p.setup).toBeTruthy();
          expect(p.setupCode).toBeDefined();
          expect(p.sample).toBeTruthy();
        }
      }
    });

    it('problem ids are unique per framework', () => {
      for (const fw of FRAMEWORKS) {
        const problems = getProblems(fw);
        const ids = problems.map((p) => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      }
    });
  });

  describe('getProblemCount', () => {
    it('returns count equal to getProblems(framework).length', () => {
      for (const fw of FRAMEWORKS) {
        expect(getProblemCount(fw)).toBe(getProblems(fw).length);
      }
    });

    it('returns non-negative number', () => {
      for (const fw of FRAMEWORKS) {
        expect(getProblemCount(fw)).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('getTotalProblemCount', () => {
    it('equals sum of all framework problem counts', () => {
      const sum = FRAMEWORKS.reduce((acc, fw) => acc + getProblemCount(fw), 0);
      expect(getTotalProblemCount()).toBe(sum);
    });
  });

  describe('getCategories', () => {
    it('returns array of category strings', () => {
      for (const fw of FRAMEWORKS) {
        const categories = getCategories(fw);
        expect(Array.isArray(categories)).toBe(true);
        for (const c of categories) {
          expect(typeof c).toBe('string');
          expect(c.length).toBeGreaterThan(0);
        }
      }
    });

    it('categories are unique', () => {
      for (const fw of FRAMEWORKS) {
        const categories = getCategories(fw);
        expect(new Set(categories).size).toBe(categories.length);
      }
    });

    it('categories match problem categories', () => {
      for (const fw of FRAMEWORKS) {
        const problems = getProblems(fw);
        const categories = getCategories(fw);
        const problemCategories = new Set(problems.map((p) => p.category));
        for (const c of categories) {
          expect(problemCategories.has(c)).toBe(true);
        }
      }
    });
  });

  describe('getCategoryCounts', () => {
    it('sum of counts equals problem count', () => {
      for (const fw of FRAMEWORKS) {
        const counts = getCategoryCounts(fw);
        const sum = Object.values(counts).reduce((a, b) => a + b, 0);
        expect(sum).toBe(getProblemCount(fw));
      }
    });

    it('each category in getCategories has a count', () => {
      for (const fw of FRAMEWORKS) {
        const categories = getCategories(fw);
        const counts = getCategoryCounts(fw);
        for (const c of categories) {
          expect(counts[c]).toBeDefined();
          expect(counts[c]).toBeGreaterThanOrEqual(1);
        }
      }
    });
  });

  describe('problemsByFramework', () => {
    it('matches getProblems for each framework', () => {
      for (const fw of FRAMEWORKS) {
        expect(problemsByFramework[fw]).toEqual(getProblems(fw));
      }
    });
  });
});
