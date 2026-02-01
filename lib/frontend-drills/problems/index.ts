/**
 * Combined problem index for all frontend frameworks.
 */

import type { FrameworkId, FrontendCategory, FrontendDrillProblem } from '../types';
import { angularProblems } from './angular';
import { nativeJsProblems } from './native-js';
import { reactProblems } from './react';
import { vueProblems } from './vue';

export const problemsByFramework: Record<FrameworkId, FrontendDrillProblem[]> = {
  'native-js': nativeJsProblems,
  react: reactProblems,
  angular: angularProblems,
  vue: vueProblems,
};

export function getProblems(framework: FrameworkId): FrontendDrillProblem[] {
  return problemsByFramework[framework] || [];
}

export function getProblemCount(framework: FrameworkId): number {
  return getProblems(framework).length;
}

export function getTotalProblemCount(): number {
  return Object.values(problemsByFramework).reduce((sum, ps) => sum + ps.length, 0);
}

export function getCategories(framework: FrameworkId): FrontendCategory[] {
  const cats = new Set(getProblems(framework).map((p) => p.category));
  return Array.from(cats).sort() as FrontendCategory[];
}

export function getCategoryCounts(framework: FrameworkId): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of getProblems(framework)) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return counts;
}
