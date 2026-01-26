/**
 * Comprehensive E2E Tests for MySQL Problems
 *
 * This test suite validates each MySQL problem by:
 * 1. Navigating to the problems page
 * 2. Finding/loading the specific problem
 * 3. Submitting the sample solution
 * 4. Verifying the answer is marked correct
 */

import { expect, type Page, test } from '@playwright/test';
import { mysqlProblems } from '../../lib/problems/mysql';

const PROBLEMS_BASE_URL = '/mysql/problems';

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
 * CRITICAL MEMORY: This test suite MUST test EVERY MySQL problem.
 *
 * Current count: 70 problems
 *
 * Requirements:
 * 1. Every problem must have a test case
 * 2. No test.skip() allowed - if a problem can't be accessed, the test MUST fail
 * 3. Every sample solution must be validated
 * 4. Direct navigation to /mysql/problems/{problemId} must work for all problems
 *
 * This ensures 100% coverage of MySQL problems in e2e tests.
 */
test.describe(`MySQL Problems - Comprehensive E2E Tests (ALL ${mysqlProblems.length} PROBLEMS - NO SKIPPING)`, () => {
  // CRITICAL: Verify we're testing all problems
  test(`MEMORY: Total MySQL problems to test: ${mysqlProblems.length}`, () => {
    expect(mysqlProblems.length).toBe(70);
    expect(mysqlProblems.length).toBeGreaterThan(0);
  });

  for (const problem of mysqlProblems) {
    test(`[${problem.id}] ${problem.title}`, async ({ page }) => {
      console.log(`\n[TEST START] MySQL Problem: ${problem.id} - "${problem.title}"`);
      console.log(`  Category: ${problem.category}, Difficulty: ${problem.difficulty}`);
      console.log(`  Sample solution: ${problem.sample}`);

      console.log(`  [STEP 1] Clearing localStorage...`);
      await page.goto('/');
      await clearLocalStorage(page);

      // CRITICAL: Direct navigation MUST work
      page.setDefaultTimeout(30000);
      page.setDefaultNavigationTimeout(30000);
      const problemUrl = `${PROBLEMS_BASE_URL}/${problem.id}`;
      console.log(`  [STEP 2] Navigating to: ${problemUrl}`);
      await page.goto(problemUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      console.log(`  [STEP 2] Navigation complete. Current URL: ${page.url()}`);

      // Verify we're on the correct problem page
      console.log(`  [STEP 3] Verifying problem page...`);
      const problemTitle = page
        .locator('h1, h2')
        .filter({ hasText: new RegExp(problem.title, 'i') });
      const titleVisible = await problemTitle
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);

      if (!titleVisible) {
        console.log(`  [WARNING] Problem title not visible, checking URL...`);
        const url = page.url();
        const hasProblemId = url.includes(problem.id);
        if (!hasProblemId) {
          console.error(`  [ERROR] Cannot verify problem page. URL: ${url}`);
          throw new Error(
            `FAILED: Cannot access problem ${problem.id} "${problem.title}". URL: ${url}. This problem MUST be testable.`,
          );
        }
        console.log(`  [INFO] Problem ID found in URL, continuing...`);
      } else {
        console.log(`  [STEP 3] Problem title verified: "${problem.title}"`);
      }

      // Wait for code editor - REQUIRED
      console.log(`  [STEP 4] Waiting for code editor...`);
      const editor = await getCodeEditor(page);
      try {
        await editor.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`  [STEP 4] Code editor is visible`);
      } catch {
        console.error(`  [ERROR] Code editor not visible after 10s timeout`);
        throw new Error(
          `FAILED: Code editor not visible for problem ${problem.id} "${problem.title}". This problem MUST be testable.`,
        );
      }

      // Submit sample solution - MUST work
      console.log(`  [STEP 5] Submitting sample solution: ${problem.sample}`);
      const result = await submitCode(page, problem.sample);
      console.log(`  [STEP 5] Submission result:`, {
        isCorrect: result.isCorrect,
        error: result.error,
        output: result.output?.substring(0, 100),
      });

      if (!result.isCorrect) {
        console.error(`  [ERROR] Sample solution was REJECTED!`);
        console.error(`    Error: ${result.error || 'Unknown error'}`);
        console.error(`    Output: ${result.output || 'None'}`);
        throw new Error(
          `FAILED: Problem ${problem.id} "${problem.title}" - Sample solution was REJECTED. ` +
            `Error: ${result.error || 'Unknown error'}. Output: ${result.output || 'None'}. Sample: ${problem.sample}`,
        );
      }

      expect(result.isCorrect).toBe(true);
      expect(result.error).toBeNull();
      console.log(`  [TEST PASS] Problem ${problem.id} validated successfully ✓\n`);
    });
  }
});
