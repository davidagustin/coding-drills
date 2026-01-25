/**
 * Problems index - exports all language-specific problem sets
 */

import type { LanguageId, Problem } from '../types';
import { cProblems } from './c';
import { cppProblems } from './cpp';
import { csharpProblems } from './csharp';
import { goProblems } from './go';
import { javaProblems } from './java';
// Import language-specific problems
import { javascriptProblems } from './javascript';
import { kotlinProblems } from './kotlin';
import { phpProblems } from './php';
import { pythonProblems } from './python';
import { rubyProblems } from './ruby';
import { typescriptProblems } from './typescript';

export { cProblems } from './c';
export { cppProblems } from './cpp';
export { csharpProblems } from './csharp';
export { goProblems } from './go';
export { javaProblems } from './java';
// Export individual problem sets
export { javascriptProblems } from './javascript';
export { kotlinProblems } from './kotlin';
export { phpProblems } from './php';
export { pythonProblems } from './python';
export { rubyProblems } from './ruby';
export { typescriptProblems } from './typescript';

// Combined problems map by language
export const problemsByLanguage: Partial<Record<LanguageId, Problem[]>> = {
  javascript: javascriptProblems,
  typescript: typescriptProblems,
  python: pythonProblems,
  java: javaProblems,
  cpp: cppProblems,
  csharp: csharpProblems,
  ruby: rubyProblems,
  go: goProblems,
  c: cProblems,
  kotlin: kotlinProblems,
  php: phpProblems,
};

// Get problems for a specific language
export const getProblemsForLanguage = (languageId: LanguageId): Problem[] => {
  return problemsByLanguage[languageId] || [];
};

// Get all problems across all languages
export const getAllProblems = (): Problem[] => {
  return Object.values(problemsByLanguage).flat() as Problem[];
};

// Get problems by category for a language
export const getProblemsByCategory = (languageId: LanguageId, category: string): Problem[] => {
  const problems = problemsByLanguage[languageId] || [];
  return problems.filter((p) => p.category === category);
};

// Get problems by difficulty for a language
export const getProblemsByDifficulty = (
  languageId: LanguageId,
  difficulty: 'easy' | 'medium' | 'hard',
): Problem[] => {
  const problems = problemsByLanguage[languageId] || [];
  return problems.filter((p) => p.difficulty === difficulty);
};

// Get unique categories for a language
export const getCategoriesForLanguage = (languageId: LanguageId): string[] => {
  const problems = problemsByLanguage[languageId] || [];
  const categories = new Set(problems.map((p) => p.category));
  return Array.from(categories);
};

// Get problem count by language
export const getProblemCountByLanguage = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const [lang, problems] of Object.entries(problemsByLanguage)) {
    if (problems) {
      counts[lang] = problems.length;
    }
  }
  return counts;
};

// Get a random problem for a language
export const getRandomProblem = (languageId: LanguageId): Problem | null => {
  const problems = problemsByLanguage[languageId] || [];
  if (problems.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * problems.length);
  return problems[randomIndex];
};

// Search problems by tag
export const searchProblemsByTag = (languageId: LanguageId, tag: string): Problem[] => {
  const problems = problemsByLanguage[languageId] || [];
  return problems.filter((p) => p.tags?.includes(tag));
};
