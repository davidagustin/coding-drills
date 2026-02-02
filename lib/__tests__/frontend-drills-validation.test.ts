/**
 * Frontend Drills Validation Tests
 *
 * Validates that EVERY frontend drill problem's sample solution passes
 * through validateFrontendDrillAnswer. This ensures users who copy a
 * sample solution will always see "correct".
 */

import { describe, expect, it } from 'vitest';
import { problemsByFramework } from '../frontend-drills/problems/index';
import type { FrameworkId, FrontendDrillProblem } from '../frontend-drills/types';
import { validateFrontendDrillAnswer } from '../frontend-drills/validator';

const frameworks = Object.keys(problemsByFramework) as FrameworkId[];

for (const framework of frameworks) {
  const problems: FrontendDrillProblem[] = problemsByFramework[framework];

  describe(`${framework} (${problems.length} problems)`, () => {
    for (const problem of problems) {
      it(`${problem.id} — ${problem.title}`, () => {
        const result = validateFrontendDrillAnswer(problem, problem.sample);

        if (!result.success) {
          const sampleExcerpt = problem.sample.substring(0, 200);
          const expectedExcerpt =
            JSON.stringify(problem.expected)?.substring(0, 200) ?? 'undefined';
          throw new Error(
            `FAIL ${problem.id}\n` +
              `  Error: ${result.error}\n` +
              `  Output: ${JSON.stringify(result.output)?.substring(0, 200) ?? 'undefined'}\n` +
              `  Expected: ${expectedExcerpt}\n` +
              `  Sample: ${sampleExcerpt}`,
          );
        }

        expect(result.success).toBe(true);
      });
    }
  });
}
