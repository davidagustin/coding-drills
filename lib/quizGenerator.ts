import {
  type ComplexityQuestion,
  getComplexityQuestionsByCategory,
  STANDARD_COMPLEXITIES,
} from './complexityProblems';
import { getMethodsByLanguage } from './problems';
import type { Difficulty, LanguageId, Method, QuizQuestion } from './types';

export type QuizType = 'methods' | 'time-complexity' | 'space-complexity' | 'pattern-recognition';

export interface QuizConfig {
  language: LanguageId;
  categories: string[];
  questionCount: number;
  timePerQuestion: number; // 5-60 seconds, supports slider
  quizType: QuizType;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets a random element from a non-empty array
 * @throws Error if array is empty
 */
function getRandomElement<T>(array: readonly T[]): T {
  if (array.length === 0) {
    throw new Error('Cannot get random element from empty array');
  }
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Extracts the data structure and method arguments from a method call
 * e.g., "Object.keys({a: 1, b: 2})" -> dataInput: "{a: 1, b: 2}", methodArgs: undefined
 * e.g., "[1, 2, 3].map(x => x * 2)" -> dataInput: "[1, 2, 3]", methodArgs: "x => x * 2"
 * e.g., "[1, 5, 10, 15].indexOf(10)" -> dataInput: "[1, 5, 10, 15]", methodArgs: "10"
 * e.g., '"hello world".split(" ")' -> dataInput: '"hello world"', methodArgs: '" "'
 */
function extractDataStructure(code: string): {
  dataInput: string;
  methodHint: string;
  methodArgs?: string;
} {
  // Handle Object.method(data) patterns
  const objectMethodMatch = code.match(/^Object\.(\w+)\((.+)\)$/);
  if (objectMethodMatch) {
    return {
      dataInput: objectMethodMatch[2].trim(),
      methodHint: 'Object method',
    };
  }

  // Handle Math.method(args) patterns
  const mathMethodMatch = code.match(/^Math\.(\w+)\((.+)\)$/);
  if (mathMethodMatch) {
    return {
      dataInput: mathMethodMatch[2].trim(),
      methodHint: 'Math method',
    };
  }

  // Handle Number.method(args) patterns
  const numberMethodMatch = code.match(/^Number\.(\w+)\((.+)\)$/);
  if (numberMethodMatch) {
    return {
      dataInput: numberMethodMatch[2].trim(),
      methodHint: 'Number method',
    };
  }

  // Handle array.method(args) patterns - extract both array and arguments
  const arrayMethodMatch = code.match(/^(\[.+?\])\.(\w+)\((.*)\)$/);
  if (arrayMethodMatch) {
    const args = arrayMethodMatch[3].trim();
    return {
      dataInput: arrayMethodMatch[1],
      methodHint: 'Array method',
      methodArgs: args || undefined,
    };
  }

  // Handle string.method(args) patterns - extract both string and arguments
  const stringMethodMatch = code.match(/^(".+?"|'.+?')\.(\w+)\((.*)\)$/);
  if (stringMethodMatch) {
    const args = stringMethodMatch[3].trim();
    return {
      dataInput: stringMethodMatch[1],
      methodHint: 'String method',
      methodArgs: args || undefined,
    };
  }

  // Handle (number).method(args) patterns
  const numberInstanceMatch = code.match(/^\((.+?)\)\.(\w+)\((.*)\)$/);
  if (numberInstanceMatch) {
    const args = numberInstanceMatch[3].trim();
    return {
      dataInput: numberInstanceMatch[1],
      methodHint: 'Number method',
      methodArgs: args || undefined,
    };
  }

  // Handle spread operator patterns like Math.max(...[1, 2, 3])
  const spreadMatch = code.match(/^(Math|Object|Number)\.(\w+)\(\.\.\.(\[.+?\])\)$/);
  if (spreadMatch) {
    return {
      dataInput: spreadMatch[3],
      methodHint: `${spreadMatch[1]} method`,
      methodArgs: `...${spreadMatch[3]}`,
    };
  }

  // Fallback: try to extract anything in parentheses or brackets
  const parenMatch = code.match(/\(([^)]+)\)/);
  if (parenMatch) {
    return {
      dataInput: parenMatch[1].trim(),
      methodHint: 'Method call',
    };
  }

  // Last resort: return a generic hint (but this shouldn't happen often)
  return {
    dataInput: '[data]',
    methodHint: 'Apply a method',
  };
}

/**
 * Gets random elements from an array (without duplicates)
 */
function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Determines difficulty based on method characteristics
 */
function getDifficultyForMethod(method: Method): Difficulty {
  const argCount = method.arguments.length;
  const hasCallback = method.arguments.some(
    (arg) =>
      arg.type.toLowerCase().includes('function') || arg.type.toLowerCase().includes('callback'),
  );

  if (hasCallback && argCount > 2) return 'hard';
  if (hasCallback || argCount > 1) return 'medium';
  return 'easy';
}

/**
 * Normalizes output strings for comparison
 * Handles formatting differences like spacing, quotes, etc.
 */
function normalizeOutputForComparison(output: string): string {
  return output
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .replace(/'/g, '"') // Normalize single quotes to double quotes
    .replace(/\s*:\s*/g, ':') // Remove spaces around colons
    .replace(/\s*,\s*/g, ',') // Remove spaces around commas
    .replace(/\s*\[\s*/g, '[') // Remove spaces around brackets
    .replace(/\s*\]\s*/g, ']')
    .replace(/\s*\{\s*/g, '{')
    .replace(/\s*\}\s*/g, '}')
    .trim()
    .toLowerCase(); // Case-insensitive comparison
}

/**
 * Checks if a method can produce the same output for the same input
 * This ensures quiz questions have only one correct answer
 */
function canMethodProduceOutput(
  method: Method,
  inputData: string,
  expectedOutput: string,
): boolean {
  // Check all examples of this method
  for (const example of method.examples) {
    // Extract input data from the example code
    const exampleInput = extractDataStructure(example.code).dataInput;

    // Normalize both inputs and outputs for comparison
    const normalizedExampleInput = normalizeOutputForComparison(exampleInput);
    const normalizedInputData = normalizeOutputForComparison(inputData);
    const normalizedExampleOutput = normalizeOutputForComparison(example.output);
    const normalizedExpectedOutput = normalizeOutputForComparison(expectedOutput);

    // Check if input matches (exact or normalized) and output matches
    const inputMatches =
      exampleInput === inputData || normalizedExampleInput === normalizedInputData;

    const outputMatches =
      example.output === expectedOutput || normalizedExampleOutput === normalizedExpectedOutput;

    if (inputMatches && outputMatches) {
      return true;
    }
  }
  return false;
}

/**
 * Generates wrong options for a quiz question
 * Prioritizes related methods and methods from the same category
 * Excludes methods that could produce the same output for the same input
 */
function generateWrongOptions(
  correctMethod: Method,
  allMethods: Method[],
  count: number = 3,
  inputData?: string,
  expectedOutput?: string,
): string[] {
  const wrongOptions: string[] = [];
  const usedMethods = new Set<string>([correctMethod.name]);

  // Filter out methods that could produce the same output
  const safeMethods = allMethods.filter((method) => {
    if (usedMethods.has(method.name)) return false;

    // If we have input and output, check if this method could produce the same result
    if (inputData && expectedOutput) {
      if (canMethodProduceOutput(method, inputData, expectedOutput)) {
        return false; // Exclude this method - it could be a correct answer
      }
    }

    return true;
  });

  // First, try to add related methods (they make good distractors)
  if (correctMethod.relatedMethods) {
    for (const related of correctMethod.relatedMethods) {
      if (wrongOptions.length >= count) break;
      const relatedMethod = safeMethods.find((m) => m.name === related);
      if (relatedMethod && !usedMethods.has(relatedMethod.name)) {
        wrongOptions.push(relatedMethod.name);
        usedMethods.add(relatedMethod.name);
      }
    }
  }

  // Then add methods from the same category
  const sameCategoryMethods = safeMethods.filter(
    (m) => m.category === correctMethod.category && !usedMethods.has(m.name),
  );

  for (const method of shuffleArray(sameCategoryMethods)) {
    if (wrongOptions.length >= count) break;
    wrongOptions.push(method.name);
    usedMethods.add(method.name);
  }

  // Fill remaining with random methods from other categories
  const otherMethods = safeMethods.filter((m) => !usedMethods.has(m.name));
  for (const method of shuffleArray(otherMethods)) {
    if (wrongOptions.length >= count) break;
    wrongOptions.push(method.name);
    usedMethods.add(method.name);
  }

  return wrongOptions.slice(0, count);
}

/**
 * Creates a quiz question from a method
 * Ensures only one correct answer by filtering out methods that produce the same output
 */
function createQuestionFromMethod(
  method: Method,
  allMethods: Method[],
  questionIndex: number,
): QuizQuestion {
  // Pick a random example from the method
  const example = getRandomElement(method.examples);

  // Extract the data structure and method arguments from the code example
  // This prevents revealing the answer in the input display while showing relevant context
  const { dataInput, methodHint, methodArgs } = extractDataStructure(example.code);

  // Generate wrong options, excluding methods that could produce the same output
  const wrongOptions = generateWrongOptions(method, allMethods, 3, dataInput, example.output);

  // Validate that no other method can produce the same output
  // Double-check all methods to ensure uniqueness
  const conflictingMethods = allMethods.filter((m) => {
    if (m.name === method.name) return false;
    return canMethodProduceOutput(m, dataInput, example.output);
  });

  if (conflictingMethods.length > 0) {
    // If conflicts found, try a different example
    const otherExamples = method.examples.filter((e) => e !== example);
    if (otherExamples.length > 0) {
      // Recursively try with a different example
      const alternativeExample = getRandomElement(otherExamples);
      const altDataInput = extractDataStructure(alternativeExample.code).dataInput;
      const altWrongOptions = generateWrongOptions(
        method,
        allMethods,
        3,
        altDataInput,
        alternativeExample.output,
      );

      // Check if this alternative has conflicts
      const altConflicts = allMethods.filter((m) => {
        if (m.name === method.name) return false;
        return canMethodProduceOutput(m, altDataInput, alternativeExample.output);
      });

      if (altConflicts.length === 0) {
        // Use the alternative example
        const allOptions = shuffleArray([method.name, ...altWrongOptions]);
        return {
          id: `q-${questionIndex}-${Date.now()}`,
          input: altDataInput,
          output: alternativeExample.output,
          correctMethod: method.name,
          options: allOptions,
          difficulty: getDifficultyForMethod(method),
          explanation: alternativeExample.explanation || method.description,
          category: method.category,
          methodHint: extractDataStructure(alternativeExample.code).methodHint,
          methodArgs: extractDataStructure(alternativeExample.code).methodArgs,
        };
      }
    }

    // If all examples have conflicts, still proceed but log a warning
    console.warn(
      `Quiz question for ${method.name} may have multiple correct answers. Conflicting methods: ${conflictingMethods.map((m) => m.name).join(', ')}`,
    );
  }

  // Create all options and shuffle
  const allOptions = shuffleArray([method.name, ...wrongOptions]);

  return {
    id: `q-${questionIndex}-${Date.now()}`,
    input: dataInput,
    output: example.output,
    correctMethod: method.name,
    options: allOptions,
    difficulty: getDifficultyForMethod(method),
    explanation: example.explanation || method.description,
    category: method.category,
    methodHint: methodHint,
    methodArgs: methodArgs,
  };
}

/**
 * Generates a complete quiz based on the configuration.
 * Dispatches to the appropriate generator based on quiz type.
 */
export function generateQuiz(config: QuizConfig): QuizQuestion[] {
  if (config.quizType === 'time-complexity' || config.quizType === 'space-complexity') {
    return generateComplexityQuiz(config);
  }
  return generateMethodQuiz(config);
}

/**
 * Generates a method-identification quiz (original quiz type)
 */
function generateMethodQuiz(config: QuizConfig): QuizQuestion[] {
  const allMethods = getMethodsByLanguage(config.language);

  // Filter methods by selected categories
  let eligibleMethods: Method[];
  if (config.categories.length === 0) {
    eligibleMethods = allMethods;
  } else {
    eligibleMethods = allMethods.filter((m) => config.categories.includes(m.category));
  }

  // If we don't have enough methods, use all methods
  if (eligibleMethods.length < 4) {
    eligibleMethods = allMethods;
  }

  // Select random methods for questions (allow repeats if necessary)
  let selectedMethods: Method[];
  if (eligibleMethods.length >= config.questionCount) {
    selectedMethods = getRandomElements(eligibleMethods, config.questionCount);
  } else {
    // Repeat methods if we don't have enough
    selectedMethods = [];
    while (selectedMethods.length < config.questionCount) {
      const remaining = config.questionCount - selectedMethods.length;
      const batch = getRandomElements(eligibleMethods, Math.min(remaining, eligibleMethods.length));
      selectedMethods = [...selectedMethods, ...batch];
    }
  }

  // Generate questions
  const questions: QuizQuestion[] = selectedMethods.map((method, index) =>
    createQuestionFromMethod(method, allMethods, index),
  );

  return questions;
}

/**
 * Generates complexity option choices (1 correct + 3 wrong)
 */
function generateComplexityOptions(correct: string, distractors?: string[]): string[] {
  if (distractors && distractors.length >= 3) {
    return shuffleArray([correct, ...distractors.slice(0, 3)]);
  }

  // Use standard pool, removing the correct answer
  const pool = STANDARD_COMPLEXITIES.filter((c) => c !== correct);
  const wrong = shuffleArray(pool).slice(0, 3);
  return shuffleArray([correct, ...wrong]);
}

/**
 * Generates a time or space complexity quiz
 */
function generateComplexityQuiz(config: QuizConfig): QuizQuestion[] {
  const isTime = config.quizType === 'time-complexity';
  const eligible = getComplexityQuestionsByCategory(config.categories);

  // Select random questions
  let selected: ComplexityQuestion[];
  if (eligible.length >= config.questionCount) {
    selected = getRandomElements(eligible, config.questionCount);
  } else {
    selected = [];
    while (selected.length < config.questionCount) {
      const remaining = config.questionCount - selected.length;
      const batch = getRandomElements(eligible, Math.min(remaining, eligible.length));
      selected = [...selected, ...batch];
    }
  }

  return selected.map((q, index) => {
    const correct = isTime ? q.timeComplexity : q.spaceComplexity;
    const distractors = isTime ? q.timeDistractors : q.spaceDistractors;
    const options = generateComplexityOptions(correct, distractors);

    return {
      id: `${q.id}-${index}`,
      input: q.code,
      output: q.title,
      correctMethod: correct,
      options,
      difficulty: 'medium' as Difficulty,
      explanation: q.explanation,
      category: q.category,
      methodHint: isTime ? 'Time Complexity' : 'Space Complexity',
    };
  });
}

/**
 * Gets a hint for a question (method description)
 */
export function getHintForQuestion(question: QuizQuestion, language: LanguageId): string {
  const methods = getMethodsByLanguage(language);
  const method = methods.find((m) => m.name === question.correctMethod);
  return method?.description || 'No hint available';
}

/**
 * Gets the full method information for the results screen
 */
export function getMethodInfo(methodName: string, language: LanguageId): Method | undefined {
  const methods = getMethodsByLanguage(language);
  return methods.find((m) => m.name === methodName);
}

/**
 * Calculate score for a question
 */
export interface ScoreResult {
  basePoints: number;
  bonusPoints: number;
  totalPoints: number;
  wasCorrect: boolean;
  wasFast: boolean;
}

export function calculateScore(
  isCorrect: boolean,
  timeSpent: number,
  timeLimit: number,
  currentStreak: number,
): ScoreResult {
  if (!isCorrect) {
    return {
      basePoints: 0,
      bonusPoints: 0,
      totalPoints: 0,
      wasCorrect: false,
      wasFast: false,
    };
  }

  const basePoints = 10;
  const halfTime = timeLimit / 2;
  const wasFast = timeSpent <= halfTime;
  const fastBonus = wasFast ? 5 : 0;

  // Streak multiplier: 2x after 3, 3x after 5
  let streakMultiplier = 1;
  if (currentStreak >= 5) {
    streakMultiplier = 3;
  } else if (currentStreak >= 3) {
    streakMultiplier = 2;
  }

  const bonusPoints = fastBonus;
  const totalPoints = (basePoints + bonusPoints) * streakMultiplier;

  return {
    basePoints: basePoints * streakMultiplier,
    bonusPoints: bonusPoints * streakMultiplier,
    totalPoints,
    wasCorrect: true,
    wasFast,
  };
}

/**
 * Calculate final quiz results
 */
export interface QuizResult {
  totalScore: number;
  basePoints: number;
  bonusPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  averageTime: number;
  fastestAnswer: number;
  slowestAnswer: number;
  maxStreak: number;
  totalTime: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
  timeSpent: number;
  points: number;
}

export function calculateQuizResults(
  answers: QuizAnswer[],
  maxStreak: number,
  startTime: number,
  endTime: number,
): QuizResult {
  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const totalQuestions = answers.length;
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const totalScore = answers.reduce((sum, a) => sum + a.points, 0);

  const times = answers.map((a) => a.timeSpent);
  const averageTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  const fastestAnswer = times.length > 0 ? Math.min(...times) : 0;
  const slowestAnswer = times.length > 0 ? Math.max(...times) : 0;

  // Rough estimate: base points are 10 per correct answer
  const basePoints = correctAnswers * 10;
  const bonusPoints = totalScore - basePoints;

  return {
    totalScore,
    basePoints,
    bonusPoints: Math.max(0, bonusPoints),
    correctAnswers,
    totalQuestions,
    accuracy: Math.round(accuracy * 10) / 10,
    averageTime: Math.round(averageTime * 10) / 10,
    fastestAnswer: Math.round(fastestAnswer * 10) / 10,
    slowestAnswer: Math.round(slowestAnswer * 10) / 10,
    maxStreak,
    totalTime: Math.round((endTime - startTime) / 1000),
  };
}

/**
 * Leaderboard management
 */
export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  accuracy: number;
  language: LanguageId;
  questionCount: number;
  date: string;
}

const LEADERBOARD_KEY = 'coding-drills-leaderboard';
const MAX_LEADERBOARD_ENTRIES = 100;

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    // Use nullish coalescing for cleaner fallback
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToLeaderboard(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry {
  const newEntry: LeaderboardEntry = {
    ...entry,
    // Use substring instead of deprecated substr (ES2023+ best practice)
    id: `lb-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    date: new Date().toISOString(),
  };

  if (typeof window === 'undefined') return newEntry;

  try {
    const leaderboard = getLeaderboard();
    leaderboard.push(newEntry);

    // Use toSorted() for immutable sorting (ES2023) - creates new array
    const trimmed = leaderboard
      .toSorted((a, b) => b.score - a.score)
      .slice(0, MAX_LEADERBOARD_ENTRIES);

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));

    return newEntry;
  } catch {
    return newEntry;
  }
}

export function getLeaderboardPosition(score: number): number {
  const leaderboard = getLeaderboard();
  const position = leaderboard.filter((entry) => entry.score > score).length + 1;
  return position;
}

export function clearLeaderboard(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LEADERBOARD_KEY);
}
