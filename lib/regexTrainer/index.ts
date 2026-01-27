export { REGEX_CHEATSHEET } from './cheatsheet';
export { evaluateMatches, evaluateRegex, findMatches, parseUserRegex } from './matcher';
export { regexProblems } from './problems';
export type {
  EvaluationResult,
  MatchRange,
  RegexAnswerRecord,
  RegexCategory,
  RegexCheatsheetEntry,
  RegexProblem,
  RegexTrainerConfig,
  RegexTrainerState,
} from './types';

import { regexProblems } from './problems';
import type { RegexCategory, RegexProblem, RegexTrainerConfig } from './types';

const ALL_CATEGORIES: RegexCategory[] = [
  'Character Classes',
  'Quantifiers',
  'Anchors',
  'Groups & Alternation',
  'Lookaround',
  'Common Patterns',
  'Escaping & Special',
];

export function getRegexCategories(): RegexCategory[] {
  return ALL_CATEGORIES;
}

export function getRegexCategoryCounts(): Record<RegexCategory, number> {
  const counts = {} as Record<RegexCategory, number>;
  for (const cat of ALL_CATEGORIES) {
    counts[cat] = regexProblems.filter((p) => p.category === cat).length;
  }
  return counts;
}

export function getRegexProblemCount(): number {
  return regexProblems.length;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRegexProblemById(id: string): RegexProblem | undefined {
  return regexProblems.find((p) => p.id === id);
}

export function getRegexProblemsByCategory(category: RegexCategory): RegexProblem[] {
  return regexProblems.filter((p) => p.category === category);
}

export function getAdjacentProblems(id: string): {
  prev: RegexProblem | null;
  next: RegexProblem | null;
} {
  const index = regexProblems.findIndex((p) => p.id === id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? regexProblems[index - 1] : null,
    next: index < regexProblems.length - 1 ? regexProblems[index + 1] : null,
  };
}

export function selectRegexProblems(config: RegexTrainerConfig): RegexProblem[] {
  let pool = regexProblems;

  if (config.categories.length > 0) {
    pool = pool.filter((p) => config.categories.includes(p.category));
  }

  if (config.difficulty !== 'mixed') {
    pool = pool.filter((p) => p.difficulty === config.difficulty);
  }

  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, config.questionCount);
}
