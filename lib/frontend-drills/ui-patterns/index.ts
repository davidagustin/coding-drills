/**
 * Combined UI patterns index for all frontend frameworks.
 */

import type { FrameworkId } from '../types';
import { angularUIPatterns } from './angular';
import { nativeJsUIPatterns } from './native-js';
import { reactUIPatterns } from './react';
import type { UIPattern, UIPatternCategory } from './types';
import { vueUIPatterns } from './vue';

export const uiPatternsByFramework: Record<FrameworkId, UIPattern[]> = {
  'native-js': nativeJsUIPatterns,
  react: reactUIPatterns,
  angular: angularUIPatterns,
  vue: vueUIPatterns,
};

export function getUIPatterns(framework: FrameworkId): UIPattern[] {
  return uiPatternsByFramework[framework] || [];
}

export function getUIPatternCount(framework: FrameworkId): number {
  return getUIPatterns(framework).length;
}

export function getTotalUIPatternCount(): number {
  return Object.values(uiPatternsByFramework).reduce((sum, ps) => sum + ps.length, 0);
}

export function getUIPatternCategories(framework: FrameworkId): UIPatternCategory[] {
  const cats = new Set(getUIPatterns(framework).map((p) => p.category));
  return Array.from(cats).sort() as UIPatternCategory[];
}

export function getUIPatternsByCategory(
  framework: FrameworkId,
): Record<UIPatternCategory, UIPattern[]> {
  const patterns = getUIPatterns(framework);
  const byCategory: Record<UIPatternCategory, UIPattern[]> = {
    'forms-input': [],
    interactive: [],
    'data-display': [],
    navigation: [],
    advanced: [],
    'ui-components': [],
  };

  for (const pattern of patterns) {
    byCategory[pattern.category].push(pattern);
  }

  return byCategory;
}

export function getUIPatternById(framework: FrameworkId, patternId: string): UIPattern | undefined {
  return getUIPatterns(framework).find((p) => p.id === patternId);
}

export function getUIPatternCategoryCounts(framework: FrameworkId): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of getUIPatterns(framework)) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return counts;
}

// Re-export types
export * from './types';
