import type { EvaluationResult, MatchRange } from './types';

const MAX_MATCHES = 1000;
const SLASH_PATTERN_REGEX = /^\/(.+)\/([gimsuy]*)$/;

/**
 * Parses a user-supplied regex string into a RegExp object.
 *
 * Accepts two formats:
 *   - Slash-delimited: `/pattern/flags` (the 'g' flag is ensured automatically)
 *   - Bare pattern: treated as `new RegExp(pattern, 'g')`
 *
 * Returns `{ regex: null, error: null }` when the input is empty,
 * or `{ regex: null, error: <message> }` when the pattern is invalid.
 */
export function parseUserRegex(pattern: string): {
  regex: RegExp | null;
  error: string | null;
} {
  if (pattern === '') {
    return { regex: null, error: null };
  }

  try {
    const slashMatch = pattern.match(SLASH_PATTERN_REGEX);

    if (slashMatch) {
      const [, body, flags] = slashMatch;
      const normalizedFlags = flags.includes('g') ? flags : `${flags}g`;
      return { regex: new RegExp(body, normalizedFlags), error: null };
    }

    return { regex: new RegExp(pattern, 'g'), error: null };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return { regex: null, error: message };
  }
}

/**
 * Executes a global regex against `text` and collects every match range.
 *
 * Safety: the loop is capped at {@link MAX_MATCHES} iterations to protect
 * against catastrophic backtracking or patterns that produce an excessive
 * number of zero-length matches.
 */
export function findMatches(regex: RegExp, text: string): MatchRange[] {
  const matches: MatchRange[] = [];

  // Ensure we start from the beginning of the string
  regex.lastIndex = 0;

  let result = regex.exec(text);

  while (result !== null && matches.length < MAX_MATCHES) {
    matches.push({
      start: result.index,
      end: result.index + result[0].length,
      text: result[0],
    });

    // Guard against zero-length matches causing an infinite loop.
    // When the matched string is empty, exec() would keep returning the
    // same index forever, so we manually advance past the current position.
    if (result[0].length === 0) {
      regex.lastIndex = result.index + 1;
    }

    result = regex.exec(text);
  }

  return matches;
}

/**
 * Compares the user's match ranges against expected ranges.
 *
 * A user match is "correct" when an expected match shares the same
 * `start` and `end` values. Matches are compared structurally, not
 * referentially.
 */
export function evaluateMatches(
  userMatches: MatchRange[],
  expectedMatches: MatchRange[],
): EvaluationResult {
  const correctMatches: MatchRange[] = [];
  const falsePositives: MatchRange[] = [];

  for (const userMatch of userMatches) {
    const isExpected = expectedMatches.some(
      (expected) => expected.start === userMatch.start && expected.end === userMatch.end,
    );

    if (isExpected) {
      correctMatches.push(userMatch);
    } else {
      falsePositives.push(userMatch);
    }
  }

  const missedMatches = expectedMatches.filter(
    (expected) =>
      !userMatches.some(
        (userMatch) => userMatch.start === expected.start && userMatch.end === expected.end,
      ),
  );

  return {
    isCorrect: falsePositives.length === 0 && missedMatches.length === 0,
    falsePositives,
    missedMatches,
    correctMatches,
    userMatches,
  };
}

/**
 * Full evaluation pipeline: parse the pattern, find matches in the sample
 * text, and compare against the expected set.
 *
 * When the pattern cannot be parsed (or is empty), `evaluation` is `null`
 * and `userMatches` is an empty array.
 */
export function evaluateRegex(
  pattern: string,
  text: string,
  expectedMatches: MatchRange[],
): {
  parsed: { regex: RegExp | null; error: string | null };
  evaluation: EvaluationResult | null;
  userMatches: MatchRange[];
} {
  const parsed = parseUserRegex(pattern);

  if (parsed.regex === null) {
    return { parsed, evaluation: null, userMatches: [] };
  }

  const userMatches = findMatches(parsed.regex, text);
  const evaluation = evaluateMatches(userMatches, expectedMatches);

  return { parsed, evaluation, userMatches };
}
