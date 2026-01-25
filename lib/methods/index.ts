/**
 * Methods index - exports all language-specific method references
 */

import type { LanguageId, Method } from '../types';
import { cMethods } from './c';
import { cppMethods } from './cpp';
import { csharpMethods } from './csharp';
import { goMethods } from './go';
import { javaMethods } from './java';
// Import language-specific methods
import { javascriptMethods } from './javascript';
import { phpMethods } from './php';
import { pythonMethods } from './python';
import { rubyMethods } from './ruby';
import { typescriptMethods } from './typescript';

export { cMethods } from './c';
export { cppMethods } from './cpp';
export { csharpMethods } from './csharp';
export { goMethods } from './go';
export { javaMethods } from './java';
// Export individual method sets
export { javascriptMethods } from './javascript';
export { phpMethods } from './php';
export { pythonMethods } from './python';
export { rubyMethods } from './ruby';
// Export types
export * from './types';
export { typescriptMethods } from './typescript';

// Combined methods map by language
export const methodsByLanguage: Partial<Record<LanguageId, Method[]>> = {
  javascript: javascriptMethods,
  python: pythonMethods,
  typescript: typescriptMethods,
  java: javaMethods,
  cpp: cppMethods,
  csharp: csharpMethods,
  go: goMethods,
  ruby: rubyMethods,
  c: cMethods,
  php: phpMethods,
};

// Get methods for a specific language
export const getMethodsForLanguage = (languageId: LanguageId): Method[] => {
  return methodsByLanguage[languageId] || [];
};

// Get all methods across all languages
export const getAllMethods = (): Method[] => {
  return Object.values(methodsByLanguage).flat() as Method[];
};

// Get methods by category for a language
export const getMethodsByCategory = (languageId: LanguageId, category: string): Method[] => {
  const methods = methodsByLanguage[languageId] || [];
  return methods.filter((m) => m.category === category);
};

// Get unique categories for a language
export const getCategoriesForLanguage = (languageId: LanguageId): string[] => {
  const methods = methodsByLanguage[languageId] || [];
  const categories = new Set(methods.map((m) => m.category));
  return Array.from(categories);
};

// Get method count by language
export const getMethodCountByLanguage = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const [lang, methods] of Object.entries(methodsByLanguage)) {
    if (methods) {
      counts[lang] = methods.length;
    }
  }
  return counts;
};

// Search methods by name
export const searchMethodsByName = (languageId: LanguageId, query: string): Method[] => {
  const methods = methodsByLanguage[languageId] || [];
  const lowerQuery = query.toLowerCase();
  return methods.filter((m) => m.name.toLowerCase().includes(lowerQuery));
};

// Get method by name
export const getMethodByName = (languageId: LanguageId, name: string): Method | undefined => {
  const methods = methodsByLanguage[languageId] || [];
  return methods.find((m) => m.name === name);
};
