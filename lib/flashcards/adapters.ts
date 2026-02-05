/**
 * Flashcard Adapters
 *
 * Converts the app's 5 question types into the unified Flashcard format.
 * Each adapter normalises front/back content so the Study Mode UI can
 * render any card identically.
 */

import {
  type AlgorithmPatternProblem,
  getPatternCategories,
  getPatternProblems,
} from '@/lib/algorithmPatterns';
import {
  type CheatsheetEntry,
  getCategoriesForCheatsheet,
  getCheatsheetForLanguage,
} from '@/lib/cheatsheets';
import {
  type ComplexityQuestion,
  getComplexityCategories,
  getComplexityQuestionsByCategory,
} from '@/lib/complexityProblems';
import { getQuizQuestions } from '@/lib/frontend-drills/quiz';
import type { FrameworkId, FrontendQuizQuestion } from '@/lib/frontend-drills/types';
import { getCategoriesForLanguage, getMethodsByLanguage } from '@/lib/problems';
import type { LanguageId, Method } from '@/lib/types';
import { isFlashcardInterviewRecommended } from './interview-recommended';
import type { Flashcard, FlashcardSource, GetFlashcardsOptions } from './types';

// ── Individual Adapters ──────────────────────────────────────

/**
 * Strip the method call from example code so the card doesn't give away the answer.
 * e.g. "[3, 1, 2].sort((a, b) => a - b)" → "[3, 1, 2]"
 */
function stripMethodCall(code: string, methodName: string): string {
  const marker = `.${methodName}(`;
  const idx = code.indexOf(marker);
  if (idx !== -1) {
    return code.slice(0, idx);
  }
  return code;
}

function methodToFlashcard(method: Method, language: string): Flashcard {
  const example = method.examples[0];

  // Build code block: show only the input value and the output — never the method name
  let codeBlock: string | undefined;
  if (example) {
    const inputOnly = stripMethodCall(example.code, method.name);
    codeBlock = `// Input\n${inputOnly}\n\n// Output\n${example.output}`;
  }

  return {
    id: `method:${language}:${method.name}`,
    source: 'method',
    front: {
      prompt: 'What method produces this output?',
      code: codeBlock,
      // detail intentionally omitted — the description reveals the answer
      badge: method.category,
    },
    back: {
      answer: method.name,
      explanation: example?.explanation ?? method.description,
      meta: method.syntax,
    },
    difficulty: categoriseDifficulty(method),
    category: method.category,
    interviewRecommended: isFlashcardInterviewRecommended('method', {
      language,
      methodName: method.name,
    }),
  };
}

function complexityToFlashcard(
  q: ComplexityQuestion,
  type: 'time-complexity' | 'space-complexity',
): Flashcard {
  const isTime = type === 'time-complexity';
  const difficulty = inferComplexityDifficulty(isTime ? q.timeComplexity : q.spaceComplexity);
  return {
    id: `${type}:${q.id}`,
    source: type,
    front: {
      prompt: `What is the ${isTime ? 'time' : 'space'} complexity?`,
      code: q.code,
      detail: q.title,
      badge: q.category,
    },
    back: {
      answer: isTime ? q.timeComplexity : q.spaceComplexity,
      explanation: q.explanation,
    },
    difficulty,
    category: q.category,
    interviewRecommended: isFlashcardInterviewRecommended(type, { difficulty }),
  };
}

function patternToFlashcard(p: AlgorithmPatternProblem): Flashcard {
  const exampleText = p.examples
    .map((ex) => `Input: ${ex.input}\nOutput: ${ex.output}`)
    .join('\n\n');

  return {
    id: `pattern:${p.id}`,
    source: 'pattern',
    front: {
      prompt: p.title,
      code:
        p.constraints.length > 0
          ? `${exampleText}\n\nConstraints:\n${p.constraints.map((c) => `- ${c}`).join('\n')}`
          : exampleText,
      detail: p.description,
      badge: p.category,
    },
    back: {
      answer: p.correctPattern,
      explanation:
        [p.hints.pattern, p.hints.bigO, p.hints.advancedLogic].filter(Boolean).join(' ') ||
        undefined,
    },
    difficulty: p.difficulty,
    category: p.category,
    interviewRecommended: isFlashcardInterviewRecommended('pattern', { category: p.category }),
  };
}

function frontendToFlashcard(q: FrontendQuizQuestion): Flashcard {
  return {
    id: `frontend:${q.id}`,
    source: 'frontend',
    front: {
      prompt: q.question,
      code: q.codeSnippet,
      badge: q.category,
    },
    back: {
      answer: q.correctAnswer,
      explanation: q.explanation,
    },
    difficulty: q.difficulty,
    category: q.category,
    interviewRecommended: isFlashcardInterviewRecommended('frontend', { category: q.category }),
  };
}

function cheatsheetToFlashcard(entry: CheatsheetEntry, language: string): Flashcard {
  // Build code block showing the example
  const codeBlock = `// ${entry.syntax}\n${entry.example.code}\n\n// Output:\n${entry.example.output}`;

  // Map priority to difficulty
  const difficultyMap: Record<string, 'easy' | 'medium' | 'hard'> = {
    essential: 'easy',
    common: 'medium',
    useful: 'hard',
  };

  return {
    id: `cheatsheet:${language}:${entry.name}`,
    source: 'cheatsheet',
    front: {
      prompt: `What command/method does this?`,
      code: codeBlock,
      detail: entry.description,
      badge: entry.category,
    },
    back: {
      answer: entry.name,
      explanation: entry.interviewTip ?? entry.gotchas?.join(' ') ?? entry.description,
      meta: `Time: ${entry.timeComplexity}, Space: ${entry.spaceComplexity}`,
    },
    difficulty: difficultyMap[entry.priority] ?? 'medium',
    category: entry.category,
    interviewRecommended: entry.priority === 'essential',
  };
}

// ── Helpers ──────────────────────────────────────────────────

function categoriseDifficulty(method: Method): 'easy' | 'medium' | 'hard' {
  const argCount = method.arguments.length;
  const hasCallback = method.arguments.some(
    (a) => a.type.toLowerCase().includes('function') || a.type.toLowerCase().includes('callback'),
  );
  if (hasCallback && argCount > 2) return 'hard';
  if (hasCallback || argCount > 1) return 'medium';
  return 'easy';
}

function inferComplexityDifficulty(complexity: string): 'easy' | 'medium' | 'hard' {
  const easy = ['O(1)', 'O(n)', 'O(log n)'];
  const medium = ['O(n log n)', 'O(n²)'];
  if (easy.includes(complexity)) return 'easy';
  if (medium.includes(complexity)) return 'medium';
  return 'hard';
}

// ── Public API ───────────────────────────────────────────────

/**
 * Returns flashcards for the given sources and filters.
 * This is the main entry point used by the study pages.
 */
export function getAllFlashcards(options: GetFlashcardsOptions): Flashcard[] {
  const cards: Flashcard[] = [];

  for (const source of options.sources) {
    switch (source) {
      case 'method': {
        const lang = (options.language ?? 'javascript') as LanguageId;
        const methods = getMethodsByLanguage(lang);
        for (const m of methods) {
          cards.push(methodToFlashcard(m, lang));
        }
        break;
      }
      case 'time-complexity':
      case 'space-complexity': {
        const questions = getComplexityQuestionsByCategory([]);
        for (const q of questions) {
          cards.push(complexityToFlashcard(q, source));
        }
        break;
      }
      case 'pattern': {
        const problems = getPatternProblems();
        for (const p of problems) {
          cards.push(patternToFlashcard(p));
        }
        break;
      }
      case 'frontend': {
        const fw = (options.framework ?? 'react') as FrameworkId;
        const questions = getQuizQuestions(fw);
        for (const q of questions) {
          cards.push(frontendToFlashcard(q));
        }
        break;
      }
      case 'cheatsheet': {
        const lang = (options.language ?? 'javascript') as LanguageId;
        const entries = getCheatsheetForLanguage(lang);
        for (const entry of entries) {
          cards.push(cheatsheetToFlashcard(entry, lang));
        }
        break;
      }
    }
  }

  // Apply category filter
  let filtered = cards;
  if (options.categories && options.categories.length > 0) {
    const catSet = new Set(options.categories);
    filtered = filtered.filter((c) => catSet.has(c.category));
  }

  // Apply difficulty filter
  if (options.difficulties && options.difficulties.length > 0) {
    const diffSet = new Set(options.difficulties);
    filtered = filtered.filter((c) => diffSet.has(c.difficulty));
  }

  // Apply interview filter
  if (options.interviewOnly) {
    filtered = filtered.filter((c) => c.interviewRecommended);
  }

  return filtered;
}

/**
 * Returns the set of available categories for a given source.
 */
export function getAvailableCategories(
  source: FlashcardSource,
  context?: { language?: string; framework?: string },
): string[] {
  switch (source) {
    case 'method':
      return getCategoriesForLanguage((context?.language ?? 'javascript') as LanguageId);
    case 'time-complexity':
    case 'space-complexity':
      return getComplexityCategories();
    case 'pattern':
      return getPatternCategories();
    case 'frontend': {
      const fw = (context?.framework ?? 'react') as FrameworkId;
      const questions = getQuizQuestions(fw);
      return [...new Set(questions.map((q) => q.category))].sort();
    }
    case 'cheatsheet':
      return getCategoriesForCheatsheet((context?.language ?? 'javascript') as LanguageId);
  }
}

/**
 * Returns the total number of cards available for a source (before filtering).
 */
export function getSourceCardCount(
  source: FlashcardSource,
  context?: { language?: string; framework?: string },
): number {
  switch (source) {
    case 'method':
      return getMethodsByLanguage((context?.language ?? 'javascript') as LanguageId).length;
    case 'time-complexity':
    case 'space-complexity':
      return getComplexityQuestionsByCategory([]).length;
    case 'pattern':
      return getPatternProblems().length;
    case 'frontend': {
      const fw = (context?.framework ?? 'react') as FrameworkId;
      return getQuizQuestions(fw).length;
    }
    case 'cheatsheet':
      return getCheatsheetForLanguage((context?.language ?? 'javascript') as LanguageId).length;
  }
}

/**
 * Returns the count of interview-recommended cards for the given sources and context.
 */
export function getInterviewRecommendedCount(
  sources: FlashcardSource[],
  context?: { language?: string; framework?: string },
): number {
  const all = getAllFlashcards({ sources, ...context });
  return all.filter((c) => c.interviewRecommended).length;
}
