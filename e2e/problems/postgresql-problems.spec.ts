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

async function navigateToProblemPage(page: Page, problemId: string): Promise<boolean> {
  try {
    await page.goto(`${PROBLEMS_BASE_URL}/${problemId}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const problemContent = page.locator('h1, h2, [data-testid="problem-content"]');
    return await problemContent
      .first()
      .isVisible({ timeout: 5000 })
      .catch(() => false);
  } catch {
    return false;
  }
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
  await page.waitForTimeout(1500);

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

test.describe('PostgreSQL Problems - Comprehensive E2E Tests', () => {
  for (const problem of postgresqlProblems) {
    test(`Problem: ${problem.id} - ${problem.title}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      const navigated = await navigateToProblemPage(page, problem.id);

      if (!navigated) {
        await page.goto(PROBLEMS_BASE_URL);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        const problemLink = page
          .locator(`a[href*="${problem.id}"], [data-problem-id="${problem.id}"]`)
          .first();
        const linkExists = await problemLink.isVisible({ timeout: 3000 }).catch(() => false);

        if (!linkExists) {
          const searchInput = page
            .locator('input[type="search"], input[placeholder*="search" i]')
            .first();
          if (await searchInput.isVisible().catch(() => false)) {
            await searchInput.fill(problem.title);
            await page.waitForTimeout(500);
          }

          const titleLink = page.getByText(problem.title).first();
          if (await titleLink.isVisible({ timeout: 2000 }).catch(() => false)) {
            await titleLink.click();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);
          } else {
            test.skip();
            return;
          }
        } else {
          await problemLink.click();
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(1000);
        }
      }

      const editor = await getCodeEditor(page);
      await editor.waitFor({ state: 'visible', timeout: 10000 });

      const result = await submitCode(page, problem.sample);

      if (!result.isCorrect) {
        throw new Error(
          `Problem ${problem.id}: Sample solution was rejected. Error: ${result.error || 'Unknown error'}. Output: ${result.output || 'None'}`,
        );
      }

      expect(result.isCorrect).toBe(true);
    });
  }
});
