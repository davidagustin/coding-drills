/**
 * Frontend Drills — public API.
 * Re-exports types, config, problem getters, quiz getters, and validation.
 */

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
  FrameworkId,
  FrontendCategory,
  FrontendDrillProblem,
  FrontendQuizQuestion,
} from './types';
// Validator
export { validateFrontendDrillAnswer } from './validator';
