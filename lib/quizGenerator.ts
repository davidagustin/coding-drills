import { QuizQuestion, LanguageId, Method, Difficulty } from './types';
import { getMethodsByLanguage, getMethodsByCategory } from './problems';

export interface QuizConfig {
  language: LanguageId;
  categories: string[];
  questionCount: 5 | 10 | 15;
  timePerQuestion: 10 | 15 | 20 | 30;
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
 * Gets a random element from an array
 */
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Extracts the data structure from a method call
 * e.g., "Object.keys({a: 1, b: 2})" -> "{a: 1, b: 2}"
 * e.g., "[1, 2, 3].map(x => x * 2)" -> "[1, 2, 3]"
 * e.g., '"hello world".split(" ")' -> '"hello world"'
 */
function extractDataStructure(code: string): { dataInput: string; methodHint: string } {
  // Handle Object.method(data) patterns
  const objectMethodMatch = code.match(/^Object\.(\w+)\((.+)\)$/);
  if (objectMethodMatch) {
    return {
      dataInput: objectMethodMatch[2].trim(),
      methodHint: 'Object method'
    };
  }

  // Handle Math.method(args) patterns
  const mathMethodMatch = code.match(/^Math\.(\w+)\((.+)\)$/);
  if (mathMethodMatch) {
    return {
      dataInput: mathMethodMatch[2].trim(),
      methodHint: 'Math method'
    };
  }

  // Handle Number.method(args) patterns
  const numberMethodMatch = code.match(/^Number\.(\w+)\((.+)\)$/);
  if (numberMethodMatch) {
    return {
      dataInput: numberMethodMatch[2].trim(),
      methodHint: 'Number method'
    };
  }

  // Handle array.method() patterns - extract the array
  const arrayMethodMatch = code.match(/^(\[.+?\])\.(\w+)\(.*\)$/);
  if (arrayMethodMatch) {
    return {
      dataInput: arrayMethodMatch[1],
      methodHint: 'Array method'
    };
  }

  // Handle string.method() patterns - extract the string
  const stringMethodMatch = code.match(/^(".+?"|'.+?')\.(\w+)\(.*\)$/);
  if (stringMethodMatch) {
    return {
      dataInput: stringMethodMatch[1],
      methodHint: 'String method'
    };
  }

  // Handle (number).method() patterns
  const numberInstanceMatch = code.match(/^\((.+?)\)\.(\w+)\(.*\)$/);
  if (numberInstanceMatch) {
    return {
      dataInput: numberInstanceMatch[1],
      methodHint: 'Number method'
    };
  }

  // Handle spread operator patterns like Math.max(...[1, 2, 3])
  const spreadMatch = code.match(/^(Math|Object|Number)\.(\w+)\(\.\.\.(\[.+?\])\)$/);
  if (spreadMatch) {
    return {
      dataInput: spreadMatch[3],
      methodHint: `${spreadMatch[1]} method`
    };
  }

  // Fallback: try to extract anything in parentheses or brackets
  const parenMatch = code.match(/\(([^)]+)\)/);
  if (parenMatch) {
    return {
      dataInput: parenMatch[1].trim(),
      methodHint: 'Method call'
    };
  }

  // Last resort: return a generic hint (but this shouldn't happen often)
  return {
    dataInput: '[data]',
    methodHint: 'Apply a method'
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
  const hasCallback = method.arguments.some(arg =>
    arg.type.toLowerCase().includes('function') ||
    arg.type.toLowerCase().includes('callback')
  );

  if (hasCallback && argCount > 2) return 'hard';
  if (hasCallback || argCount > 1) return 'medium';
  return 'easy';
}

/**
 * Generates wrong options for a quiz question
 * Prioritizes related methods and methods from the same category
 */
function generateWrongOptions(
  correctMethod: Method,
  allMethods: Method[],
  count: number = 3
): string[] {
  const wrongOptions: string[] = [];
  const usedMethods = new Set<string>([correctMethod.name]);

  // First, try to add related methods (they make good distractors)
  if (correctMethod.relatedMethods) {
    for (const related of correctMethod.relatedMethods) {
      if (wrongOptions.length >= count) break;
      const relatedMethod = allMethods.find(m => m.name === related);
      if (relatedMethod && !usedMethods.has(relatedMethod.name)) {
        wrongOptions.push(relatedMethod.name);
        usedMethods.add(relatedMethod.name);
      }
    }
  }

  // Then add methods from the same category
  const sameCategoryMethods = allMethods.filter(
    m => m.category === correctMethod.category && !usedMethods.has(m.name)
  );

  for (const method of shuffleArray(sameCategoryMethods)) {
    if (wrongOptions.length >= count) break;
    wrongOptions.push(method.name);
    usedMethods.add(method.name);
  }

  // Fill remaining with random methods from other categories
  const otherMethods = allMethods.filter(m => !usedMethods.has(m.name));
  for (const method of shuffleArray(otherMethods)) {
    if (wrongOptions.length >= count) break;
    wrongOptions.push(method.name);
    usedMethods.add(method.name);
  }

  return wrongOptions.slice(0, count);
}

/**
 * Creates a quiz question from a method
 */
function createQuestionFromMethod(
  method: Method,
  allMethods: Method[],
  questionIndex: number
): QuizQuestion {
  // Pick a random example from the method
  const example = getRandomElement(method.examples);

  // Generate wrong options
  const wrongOptions = generateWrongOptions(method, allMethods, 3);

  // Create all options and shuffle
  const allOptions = shuffleArray([method.name, ...wrongOptions]);

  // Find the index of the correct answer after shuffling
  const correctIndex = allOptions.indexOf(method.name);

  // Extract just the data structure from the code example
  // This prevents revealing the answer in the input display
  const { dataInput, methodHint } = extractDataStructure(example.code);

  return {
    id: `q-${questionIndex}-${Date.now()}`,
    input: dataInput,
    output: example.output,
    correctMethod: method.name,
    options: allOptions,
    difficulty: getDifficultyForMethod(method),
    explanation: example.explanation || method.description,
    category: method.category,
    methodHint: methodHint
  };
}

/**
 * Generates a complete quiz based on the configuration
 */
export function generateQuiz(config: QuizConfig): QuizQuestion[] {
  const allMethods = getMethodsByLanguage(config.language);

  // Filter methods by selected categories
  let eligibleMethods: Method[];
  if (config.categories.length === 0) {
    eligibleMethods = allMethods;
  } else {
    eligibleMethods = allMethods.filter(m =>
      config.categories.includes(m.category)
    );
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
    createQuestionFromMethod(method, allMethods, index)
  );

  return questions;
}

/**
 * Gets a hint for a question (method description)
 */
export function getHintForQuestion(question: QuizQuestion, language: LanguageId): string {
  const methods = getMethodsByLanguage(language);
  const method = methods.find(m => m.name === question.correctMethod);
  return method?.description || 'No hint available';
}

/**
 * Gets the full method information for the results screen
 */
export function getMethodInfo(methodName: string, language: LanguageId): Method | undefined {
  const methods = getMethodsByLanguage(language);
  return methods.find(m => m.name === methodName);
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
  currentStreak: number
): ScoreResult {
  if (!isCorrect) {
    return {
      basePoints: 0,
      bonusPoints: 0,
      totalPoints: 0,
      wasCorrect: false,
      wasFast: false
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
    wasFast
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
  endTime: number
): QuizResult {
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const totalQuestions = answers.length;
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const totalScore = answers.reduce((sum, a) => sum + a.points, 0);

  const times = answers.map(a => a.timeSpent);
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
    totalTime: Math.round((endTime - startTime) / 1000)
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
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToLeaderboard(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry {
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `lb-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString()
  };

  if (typeof window === 'undefined') return newEntry;

  try {
    const leaderboard = getLeaderboard();
    leaderboard.push(newEntry);

    // Sort by score (descending) and keep top entries
    leaderboard.sort((a, b) => b.score - a.score);
    const trimmed = leaderboard.slice(0, MAX_LEADERBOARD_ENTRIES);

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));

    return newEntry;
  } catch {
    return newEntry;
  }
}

export function getLeaderboardPosition(score: number): number {
  const leaderboard = getLeaderboard();
  const position = leaderboard.filter(entry => entry.score > score).length + 1;
  return position;
}

export function clearLeaderboard(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LEADERBOARD_KEY);
}
