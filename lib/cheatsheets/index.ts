/**
 * Cheatsheets Index
 *
 * Exports all language-specific cheatsheet data and helper functions.
 */

import type { LanguageId } from '../types';
import type { CheatsheetCategory, CheatsheetEntry, CheatsheetPriority } from './types';

// Re-export types
export * from './types';

import { cCheatsheet } from './c';
import { clojureCheatsheet } from './clojure';
import { cppCheatsheet } from './cpp';
import { csharpCheatsheet } from './csharp';
import { dartCheatsheet } from './dart';
import { elixirCheatsheet } from './elixir';
import { goCheatsheet } from './go';
import { haskellCheatsheet } from './haskell';
import { javaCheatsheet } from './java';
// Language cheatsheet imports (will be populated as files are created)
import { javascriptCheatsheet } from './javascript';
import { kotlinCheatsheet } from './kotlin';
import { luaCheatsheet } from './lua';
import { perlCheatsheet } from './perl';
import { phpCheatsheet } from './php';
import { pythonCheatsheet } from './python';
import { rCheatsheet } from './r';
import { rubyCheatsheet } from './ruby';
import { rustCheatsheet } from './rust';
import { scalaCheatsheet } from './scala';
import { swiftCheatsheet } from './swift';
import { typescriptCheatsheet } from './typescript';

// Combined cheatsheets map by language
export const cheatsheetsByLanguage: Record<LanguageId, CheatsheetEntry[]> = {
  javascript: javascriptCheatsheet,
  typescript: typescriptCheatsheet,
  python: pythonCheatsheet,
  java: javaCheatsheet,
  cpp: cppCheatsheet,
  csharp: csharpCheatsheet,
  go: goCheatsheet,
  ruby: rubyCheatsheet,
  c: cCheatsheet,
  php: phpCheatsheet,
  kotlin: kotlinCheatsheet,
  rust: rustCheatsheet,
  swift: swiftCheatsheet,
  scala: scalaCheatsheet,
  r: rCheatsheet,
  perl: perlCheatsheet,
  lua: luaCheatsheet,
  haskell: haskellCheatsheet,
  elixir: elixirCheatsheet,
  dart: dartCheatsheet,
  clojure: clojureCheatsheet,
};

/**
 * Get cheatsheet entries for a specific language
 */
export function getCheatsheetForLanguage(languageId: LanguageId): CheatsheetEntry[] {
  return cheatsheetsByLanguage[languageId] || [];
}

/**
 * Get unique categories for a language's cheatsheet
 */
export function getCategoriesForCheatsheet(languageId: LanguageId): CheatsheetCategory[] {
  const entries = cheatsheetsByLanguage[languageId] || [];
  const categories = new Set(entries.map((e) => e.category));
  return Array.from(categories).sort();
}

/**
 * Filter cheatsheet by category
 */
export function filterByCategory(
  entries: CheatsheetEntry[],
  category: CheatsheetCategory | 'all',
): CheatsheetEntry[] {
  if (category === 'all') return entries;
  return entries.filter((e) => e.category === category);
}

/**
 * Filter cheatsheet by priority
 */
export function filterByPriority(
  entries: CheatsheetEntry[],
  priority: CheatsheetPriority | 'all',
): CheatsheetEntry[] {
  if (priority === 'all') return entries;
  return entries.filter((e) => e.priority === priority);
}

/**
 * Search cheatsheet entries by name or description
 */
export function searchCheatsheet(entries: CheatsheetEntry[], query: string): CheatsheetEntry[] {
  const lowerQuery = query.toLowerCase();
  return entries.filter(
    (e) =>
      e.name.toLowerCase().includes(lowerQuery) ||
      e.description.toLowerCase().includes(lowerQuery) ||
      e.syntax.toLowerCase().includes(lowerQuery),
  );
}

/**
 * Sort entries by priority (essential first, then common, then useful)
 */
export function sortByPriority(entries: CheatsheetEntry[]): CheatsheetEntry[] {
  const priorityOrder: Record<CheatsheetPriority, number> = {
    essential: 0,
    common: 1,
    useful: 2,
  };
  return [...entries].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

/**
 * Group entries by category
 */
export function groupByCategory(
  entries: CheatsheetEntry[],
): Record<CheatsheetCategory, CheatsheetEntry[]> {
  const grouped: Partial<Record<CheatsheetCategory, CheatsheetEntry[]>> = {};
  for (const entry of entries) {
    const category = entry.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    const categoryEntries = grouped[category];
    if (categoryEntries) {
      categoryEntries.push(entry);
    }
  }
  return grouped as Record<CheatsheetCategory, CheatsheetEntry[]>;
}

/**
 * Get entry count by language
 */
export function getCheatsheetCountByLanguage(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [lang, entries] of Object.entries(cheatsheetsByLanguage)) {
    counts[lang] = entries.length;
  }
  return counts;
}
