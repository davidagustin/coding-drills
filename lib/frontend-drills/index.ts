/**
 * Frontend Drills — public API.
 * Re-exports types, config, problem getters, quiz getters, and validation.
 */

// Cheatsheet
export { getCheatsheet, getCheatsheetSectionCount } from './cheatsheet/index';
// Config
export { FRAMEWORK_CONFIG, FRAMEWORK_IDS, type FrameworkConfig, isValidFramework } from './config';
// Problems
export {
  getCategories,
  getCategoryCounts,
  getProblemCount,
  getProblems,
  getTotalProblemCount,
  problemsByFramework,
} from './problems/index';
// Quiz
export {
  getQuizQuestionCount,
  getQuizQuestions,
  getTotalQuizQuestionCount,
  quizQuestionsByFramework,
} from './quiz/index';
// Quiz generator & scoring
export {
  addToFrontendLeaderboard,
  calculateFrontendQuizResults,
  calculateFrontendQuizScore,
  type FrontendLeaderboardEntry,
  type FrontendQuizAnswer,
  type FrontendQuizConfig,
  type FrontendQuizResult,
  type FrontendQuizScoreResult,
  generateFrontendQuiz,
  getFrontendLeaderboard,
  getFrontendLeaderboardPosition,
} from './quizGenerator';
// Types
export type {
  CheatsheetContentBlock,
  CheatsheetData,
  CheatsheetSection,
  CheatsheetSectionId,
  FrameworkId,
  FrontendCategory,
  FrontendDrillProblem,
  FrontendQuizQuestion,
} from './types';
// UI Patterns
export {
  getTotalUIPatternCount,
  getUIPatternById,
  getUIPatternCategories,
  getUIPatternCategoryCounts,
  getUIPatternCount,
  getUIPatterns,
  getUIPatternsByCategory,
  UI_PATTERN_CATEGORIES,
  UI_PATTERN_DIFFICULTY_CONFIG,
  type UIPattern,
  type UIPatternCategory,
  type UIPatternDifficulty,
  uiPatternsByFramework,
} from './ui-patterns/index';
// Validator
export { validateFrontendDrillAnswer } from './validator';
