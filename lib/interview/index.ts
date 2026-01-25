/**
 * Interview Module
 *
 * Exports all interview-related utilities, prompts, and types for
 * the AI-powered technical interviewer system.
 */

export {
  // Types
  type AlgorithmProblem,
  type ProblemExample,
  type AlgorithmPattern,
  type ConversationMessage,
  // Main system prompt
  INTERVIEWER_SYSTEM_PROMPT,
  // Problem context builder
  createProblemContext,
  // Pattern recognition guide
  PATTERN_RECOGNITION_GUIDE,
  // Conversation starters
  CONVERSATION_STARTERS,
  // Hint progressions
  HINT_PROGRESSIONS,
  // Utility functions
  getRandomConversationStarter,
  getHintForPattern,
  getNextHintLevel,
  getGuidingQuestions,
  identifyPatternsFromTags,
  buildInterviewSystemMessage,
  getFollowUpQuestion,
} from './prompts';
