/**
 * Interview Module
 *
 * Exports all interview-related utilities, prompts, and types for
 * the AI-powered technical interviewer system.
 */

export {
  type AlgorithmPattern,
  // Types
  type AlgorithmProblem,
  buildInterviewSystemMessage,
  // Conversation starters
  CONVERSATION_STARTERS,
  type ConversationMessage,
  // Problem context builder
  createProblemContext,
  getFollowUpQuestion,
  getGuidingQuestions,
  getHintForPattern,
  getNextHintLevel,
  // Utility functions
  getRandomConversationStarter,
  // Hint progressions
  HINT_PROGRESSIONS,
  // Main system prompt
  INTERVIEWER_SYSTEM_PROMPT,
  identifyPatternsFromTags,
  // Pattern recognition guide
  PATTERN_RECOGNITION_GUIDE,
  type ProblemExample,
} from './prompts';

// System Design Interview
export {
  getSystemDesignProblemCount,
  type SystemDesignProblem,
  systemDesignProblems,
} from './system-design-problems';

export {
  createSystemDesignProblemContext,
  getRandomSDConversationStarter,
  getRandomSDGuidedBreakdownStarter,
  SD_CONVERSATION_STARTERS,
  SD_GUIDED_BREAKDOWN_STARTERS,
  SD_GUIDED_BREAKDOWN_SYSTEM_PROMPT_COMPACT,
  SD_INTERVIEWER_SYSTEM_PROMPT_COMPACT,
} from './system-design-prompts';
