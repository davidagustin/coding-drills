/**
 * Comprehensive E2E Tests for PostgreSQL Problems
 *
 * This test suite validates each PostgreSQL problem by:
 * 1. Navigating to the problems page
 * 2. Finding/loading the specific problem
 * 3. Submitting the sample solution
 * 4. Verifying the answer is marked correct
 */

import { expect, type Page, test } from '@playwright/test';
import { postgresqlProblems } from '../../lib/problems/postgresql';

const PROBLEMS_BASE_URL = '/postgresql/problems';

async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

function getCodeEditor(page: Page) {
  return page
    .locator('[data-testid="code-editor"], .monaco-editor textarea, textarea, input[type="text"]')
    .first();
}

async function submitCode(
  page: Page,
  code: string,
): Promise<{
  isCorrect: boolean;
  error: string | null;
  output: string | null;
}> {
  const editor = await getCodeEditor(page);
  await editor.waitFor({ state: 'visible', timeout: 5000 });
  await editor.click();
  await editor.fill('');
  await editor.fill(code);
  await editor.press('Enter');
  await page.waitForTimeout(2000);

  const successIndicator = page.locator(
    '[data-testid="success"], .success, .correct, text=/correct|right|passed|success/i',
  );
  const errorIndicator = page.locator(
    '[data-testid="error"], .error, .incorrect, text=/incorrect|wrong|error|failed|must use|expected method|pattern/i',
  );

  const isCorrect = await successIndicator
    .first()
    .isVisible({ timeout: 2000 })
    .catch(() => false);
  const errorText = await errorIndicator
    .first()
    .textContent()
    .catch(() => null);
  const outputElement = page
    .locator('[data-testid="output"], .output, pre code, [data-testid="your-output"]')
    .first();
  const output = await outputElement.textContent().catch(() => null);

  return { isCorrect, error: errorText, output };
}

/**
 * CRITICAL MEMORY: This test suite MUST test EVERY PostgreSQL problem.
 *
 * Current count: 63 problems
 *
 * Requirements:
 * 1. Every problem must have a test case
 * 2. No test.skip() allowed - if a problem can't be accessed, the test MUST fail
 * 3. Every sample solution must be validated
 * 4. Direct navigation to /postgresql/problems/{problemId} must work for all problems
 *
 * This ensures 100% coverage of PostgreSQL problems in e2e tests.
 */
test.describe(`PostgreSQL Problems - Comprehensive E2E Tests (ALL ${postgresqlProblems.length} PROBLEMS - NO SKIPPING)`, () => {
  // CRITICAL: Verify we're testing all problems
  test(`MEMORY: Total PostgreSQL problems to test: ${postgresqlProblems.length}`, () => {
    expect(postgresqlProblems.length).toBe(63);
    expect(postgresqlProblems.length).toBeGreaterThan(0);
  });

  for (const problem of postgresqlProblems) {
    test(`[${problem.id}] ${problem.title}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      // CRITICAL: Direct navigation MUST work
      page.setDefaultTimeout(30000);
      page.setDefaultNavigationTimeout(30000);
      await page.goto(`${PROBLEMS_BASE_URL}/${problem.id}`, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      // Verify we're on the correct problem page
      const problemTitle = page
        .locator('h1, h2')
        .filter({ hasText: new RegExp(problem.title, 'i') });
      const titleVisible = await problemTitle
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);

      if (!titleVisible) {
        const url = page.url();
        const hasProblemId = url.includes(problem.id);
        if (!hasProblemId) {
          throw new Error(
            `FAILED: Cannot access problem ${problem.id} "${problem.title}". URL: ${url}. This problem MUST be testable.`,
          );
        }
      }

      // Wait for code editor - REQUIRED
      const editor = await getCodeEditor(page);
      try {
        await editor.waitFor({ state: 'visible', timeout: 10000 });
      } catch {
        throw new Error(
          `FAILED: Code editor not visible for problem ${problem.id} "${problem.title}". This problem MUST be testable.`,
        );
      }

      // Submit sample solution - MUST work
      const result = await submitCode(page, problem.sample);

      if (!result.isCorrect) {
        throw new Error(
          `FAILED: Problem ${problem.id} "${problem.title}" - Sample solution was REJECTED. ` +
            `Error: ${result.error || 'Unknown error'}. Output: ${result.output || 'None'}. Sample: ${problem.sample}`,
        );
      }

      expect(result.isCorrect).toBe(true);
      expect(result.error).toBeNull();
    });
  }
});
