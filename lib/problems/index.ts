/**
 * Problems index - exports all language-specific problem sets
 */

import type { LanguageId, Problem } from '../types';

// Import language-specific problems (original languages)
import { cProblems } from './c';
// Import new language problems
import { clojureProblems } from './clojure';
import { cppProblems } from './cpp';
import { csharpProblems } from './csharp';
import { dartProblems } from './dart';
import { elixirProblems } from './elixir';
import { goProblems } from './go';
import { haskellProblems } from './haskell';
import { javaProblems } from './java';
import { javascriptProblems } from './javascript';
import { kotlinProblems } from './kotlin';
import { luaProblems } from './lua';
import { mongodbProblems } from './mongodb';
import { mysqlProblems } from './mysql';
import { perlProblems } from './perl';
import { phpProblems } from './php';
import { postgresqlProblems } from './postgresql';
import { pythonProblems } from './python';
import { rProblems } from './r';
import { rubyProblems } from './ruby';
import { rustProblems } from './rust';
import { scalaProblems } from './scala';
import { swiftProblems } from './swift';
import { typescriptProblems } from './typescript';

// Export individual problem sets (original languages)
export { cProblems } from './c';
// Export new language problem sets
export { clojureProblems } from './clojure';
export { cppProblems } from './cpp';
export { csharpProblems } from './csharp';
export { dartProblems } from './dart';
export { elixirProblems } from './elixir';
export { goProblems } from './go';
export { haskellProblems } from './haskell';
export { javaProblems } from './java';
export { javascriptProblems } from './javascript';
export { kotlinProblems } from './kotlin';
export { luaProblems } from './lua';
export { mongodbProblems } from './mongodb';
export { mysqlProblems } from './mysql';
export { perlProblems } from './perl';
export { phpProblems } from './php';
export { postgresqlProblems } from './postgresql';
export { pythonProblems } from './python';
export { rProblems } from './r';
export { rubyProblems } from './ruby';
export { rustProblems } from './rust';
export { scalaProblems } from './scala';
export { swiftProblems } from './swift';
export { typescriptProblems } from './typescript';

// Combined problems map by language
export const problemsByLanguage: Partial<Record<LanguageId, Problem[]>> = {
  // Original languages
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
  // New languages
  rust: rustProblems,
  swift: swiftProblems,
  scala: scalaProblems,
  r: rProblems,
  perl: perlProblems,
  lua: luaProblems,
  haskell: haskellProblems,
  elixir: elixirProblems,
  dart: dartProblems,
  clojure: clojureProblems,
  // Database languages
  mysql: mysqlProblems,
  postgresql: postgresqlProblems,
  mongodb: mongodbProblems,
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

// Get problem counts per category for a language
export const getProblemCountsByCategory = (languageId: LanguageId): Record<string, number> => {
  const problems = problemsByLanguage[languageId] || [];
  const counts: Record<string, number> = {};
  for (const problem of problems) {
    counts[problem.category] = (counts[problem.category] || 0) + 1;
  }
  return counts;
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
