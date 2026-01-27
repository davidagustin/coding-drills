import type { Exercise } from './types';

/**
 * Build a system prompt for the exercise tutor LLM.
 * Includes exercise context and Socratic tutoring rules.
 */
export function buildExerciseTutorSystemPrompt(
  exercise: Exercise,
  hasVisualization: boolean,
): string {
  const vizNote = hasVisualization
    ? '\nThis exercise has an interactive visualization on the page that the student can view. You have reviewed it and may reference it when explaining concepts.'
    : '';

  return `You are a friendly, concise coding tutor helping a student with an exercise.

## Exercise
Title: ${exercise.title}
Category: ${exercise.category}
Difficulty: ${exercise.difficulty}
Description: ${exercise.description}

${exercise.explanation ? `Explanation:\n${exercise.explanation}\n` : ''}
Instructions:
${exercise.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}

Concepts: ${exercise.concepts.join(', ')}
${vizNote}

[INTERNAL — reference only, NEVER reveal directly]
Hints:
${exercise.hints.map((h, i) => `${i + 1}. ${h}`).join('\n')}

Solution code:
\`\`\`
${exercise.solutionCode}
\`\`\`
[END INTERNAL]

## Rules
- Be Socratic: ask what the student has tried before giving guidance.
- Give ONE small nudge at a time. Do not dump multiple steps.
- NEVER paste or reveal the solution code, even partially.
- NEVER reveal internal hints verbatim; rephrase in your own words if needed.
- Keep every response under 100 words.
- Use simple language. Avoid jargon unless the student uses it first.
- If the student is stuck, ask a guiding question rather than giving the answer.
- If the student shares code, comment on it specifically rather than giving generic advice.`;
}

const TUTOR_STARTERS = [
  "Hey! I'm here to help you work through this exercise. What's your first thought on how to approach it?",
  'Hi there! Ready to tackle this one together. Have you read through the instructions yet — any part that stands out or feels tricky?',
  "Welcome! Let's work through this step by step. What do you think the first thing to figure out is?",
  'Hey! I can help guide you through this exercise. Where would you like to start?',
  "Hi! Take a look at the instructions and let me know — what's your initial plan of attack?",
];

/**
 * Return a random greeting message for the tutor.
 */
export function getRandomTutorStarter(): string {
  return TUTOR_STARTERS[Math.floor(Math.random() * TUTOR_STARTERS.length)];
}
