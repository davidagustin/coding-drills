/**
 * System Design Interview AI Prompts and Utilities
 *
 * This module provides system prompts, conversation starters, and context
 * builders for an AI-powered system design interviewer. It mirrors the
 * structure of the algorithm interview prompts but is tailored to the
 * open-ended, architectural nature of system design questions.
 *
 * PROMPT ENGINEERING NOTES:
 * - Optimized for token efficiency in WebLLM environments
 * - Follows a structured phase-based interview flow
 * - Emphasizes candidate-driven exploration over prescriptive answers
 * - Covers the full system design interview lifecycle
 */

import type { SystemDesignProblem } from './system-design-problems';

// ============================================================
// System Design Interviewer Prompt (Mock Interview Mode)
// ============================================================

/**
 * Compact system prompt for the system design mock interviewer.
 * Guides candidates through requirements, estimation, API design,
 * data modeling, high-level architecture, detailed design, and trade-offs.
 * Optimized for WebLLM token constraints.
 */
export const SD_INTERVIEWER_SYSTEM_PROMPT_COMPACT = `System design interviewer: guide candidate through designing a large-scale system via questions. Never provide a complete design.

RULES:
- No complete architectures or diagrams
- Ask probing questions; push for specifics
- Under 120 words per response
- When candidate is vague, ask "How exactly would that work at scale?"
- Acknowledge good ideas briefly, then probe deeper

FLOW:
1. Requirements — functional and non-functional, scope the problem
2. Estimation — users, QPS, storage, bandwidth (back-of-envelope)
3. API design — key endpoints, parameters, return types
4. Data model — entities, relationships, storage choices
5. High-level architecture — core components, data flow
6. Detailed design — deep-dive into 1-2 critical components
7. Trade-offs — CAP, consistency vs availability, latency vs throughput
8. Bottlenecks — identify and mitigate single points of failure, hot spots

HINT ESCALATION (use progressively):
1. "What questions would you ask the interviewer first?"
2. "Think about the read/write ratio and access patterns..."
3. "How would this behave with 10x or 100x traffic?"
4. "Consider partitioning, caching, or async processing here..."

TONE: supportive, concise, use "we" language ("Let's think about...").`;

// ============================================================
// System Design Guided Breakdown Prompt
// ============================================================

/**
 * Guided breakdown prompt for structured 7-phase system design coaching.
 * Walks the candidate through one phase at a time, letting them attempt
 * each phase before providing feedback.
 * Compact version for WebLLM token efficiency.
 */
export const SD_GUIDED_BREAKDOWN_SYSTEM_PROMPT_COMPACT = `System design coach: teach a 7-phase design framework using the given problem. Walk through ONE phase at a time.

THE 7 PHASES:
1. Requirements — clarify functional & non-functional requirements, define scope
2. Estimation — back-of-envelope: users, QPS, storage, bandwidth
3. API Design — define key endpoints, methods, parameters, responses
4. Data Model — entities, relationships, schema, storage type (SQL/NoSQL)
5. High-Level Design — draw core components and data flow between them
6. Detailed Design — deep-dive into 1-2 critical components or flows
7. Trade-offs — discuss alternatives, CAP theorem, scaling strategies

RULES:
- One phase at a time. Do NOT skip ahead.
- Ask the candidate to attempt each phase before giving feedback.
- Give brief feedback, then introduce the next phase.
- Use the specific problem to make each phase concrete.
- Under 100 words per response.
- Never draw diagrams yourself — have the candidate describe components and flows.
- Be encouraging but push for specifics and numbers.

TONE: supportive, structured, use "we" language.`;

// ============================================================
// Conversation Starters (Mock Interview Mode)
// ============================================================

/**
 * Opening messages for system design mock interview mode.
 * Set a natural, welcoming tone and orient the candidate
 * toward requirements gathering as the first step.
 */
export const SD_CONVERSATION_STARTERS: string[] = [
  "Hi! I'll be your interviewer for this system design session. Take a moment to read through the problem. When you're ready, let's start by scoping the requirements. What clarifying questions would you want to ask before designing anything?",

  'Welcome! We have about 45 minutes to work through this system design problem together. Please read it over carefully. A great first step is figuring out what exactly we need to build. What functional requirements come to mind, and what would you ask to narrow the scope?',

  "Hello! Let's design a system together. Go ahead and read the problem statement. Before jumping into architecture, strong candidates start by gathering requirements. What are the most important questions you would ask the product team?",

  "Thanks for joining! Take your time to read the problem. System design interviews are all about structured thinking, so let's begin where every good design starts: understanding what we are building and for whom. What requirements should we nail down first?",
];

// ============================================================
// Guided Breakdown Starters
// ============================================================

/**
 * Opening messages for guided breakdown mode.
 * Introduce the 7-phase framework and begin with Phase 1.
 */
export const SD_GUIDED_BREAKDOWN_STARTERS: string[] = [
  "Hi! Today we'll practice a structured approach to system design using a 7-phase framework: Requirements, Estimation, API Design, Data Model, High-Level Design, Detailed Design, and Trade-offs. We'll tackle each phase one at a time. Let's start with Phase 1: Requirements. Read the problem and tell me -- what are the key functional requirements? What would users need to be able to do?",

  "Welcome! Instead of freestyling a design, let's build a repeatable process. I'll guide you through 7 phases that work for any system design question. Phase 1 is Requirements. Read the problem carefully, then tell me: what are the core features we must support, and what non-functional requirements matter most?",

  "Hey! Let's develop your system design muscles with a structured 7-phase framework: Requirements, Estimation, API Design, Data Model, High-Level Design, Detailed Design, and Trade-offs. Ready? Phase 1: Read the problem and identify the functional requirements. What does the system need to do at a minimum?",
];

// ============================================================
// Utility Functions
// ============================================================

/**
 * Returns a random conversation starter for system design mock interview mode.
 */
export function getRandomSDConversationStarter(): string {
  const index = Math.floor(Math.random() * SD_CONVERSATION_STARTERS.length);
  return SD_CONVERSATION_STARTERS[index];
}

/**
 * Returns a random guided breakdown starter for system design guided mode.
 */
export function getRandomSDGuidedBreakdownStarter(): string {
  const index = Math.floor(Math.random() * SD_GUIDED_BREAKDOWN_STARTERS.length);
  return SD_GUIDED_BREAKDOWN_STARTERS[index];
}

// ============================================================
// Problem Context Builder
// ============================================================

/**
 * Creates a context string about the current system design problem to include
 * in messages sent to the AI. Provides the AI with necessary problem details
 * while marking internal hints that should not be revealed to the candidate.
 */
export function createSystemDesignProblemContext(problem: SystemDesignProblem): string {
  const functionalReqs = problem.functionalRequirements.map((r) => `- ${r}`).join('\n');

  const nonFunctionalReqs = problem.nonFunctionalRequirements.map((r) => `- ${r}`).join('\n');

  const constraintsText = problem.constraints.map((c) => `- ${c}`).join('\n');

  let context = `## Current Problem: ${problem.title}

**Difficulty**: ${problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}

**Description**:
${problem.description}

**Functional Requirements**:
${functionalReqs}

**Non-Functional Requirements**:
${nonFunctionalReqs}

**Constraints**:
${constraintsText}`;

  // ---- INTERNAL sections: the AI uses these but must not reveal them ----

  if (problem.keyComponents && problem.keyComponents.length > 0) {
    context += `\n\n[INTERNAL - Do not reveal directly: Key components to guide toward are: ${problem.keyComponents.join(', ')}. Let the candidate discover these through discussion.]`;
  }

  if (problem.estimationHints && problem.estimationHints.length > 0) {
    context += `\n\n[INTERNAL - Estimation reference numbers:\n${problem.estimationHints.map((h) => `- ${h}`).join('\n')}\nUse these to validate candidate estimates or nudge them if way off.]`;
  }

  if (problem.topics && problem.topics.length > 0) {
    context += `\n\n[INTERNAL - Key topics to explore: ${problem.topics.join(', ')}. Steer conversation toward these when appropriate.]`;
  }

  return context;
}
