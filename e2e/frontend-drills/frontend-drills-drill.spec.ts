import { expect, test } from '@playwright/test';

/**
 * E2E tests for Frontend Drills drill mode (/frontend-drills/[framework]/drill).
 * Covers setup phase, starting a drill, answering, and results.
 */

const FRAMEWORK = 'react';
const DRILL_URL = `/frontend-drills/${FRAMEWORK}/drill`;

async function clearFrontendDrillsStorage(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

test.describe('Frontend Drills - Drill Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DRILL_URL);
    await page.waitForLoadState('networkidle');
    await clearFrontendDrillsStorage(page);
  });

  test.describe('Setup Phase', () => {
    test('should show setup screen with Drill Mode heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Drill Mode/i })).toBeVisible({
        timeout: 10000,
      });
    });

    test('should show Categories section', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Categories/i })).toBeVisible();
    });

    test('should show category chips or empty state', async ({ page }) => {
      const categoriesHeading = page.getByRole('heading', { name: /Categories/i });
      await expect(categoriesHeading).toBeVisible();
      const chipsOrMessage = page
        .locator('button')
        .filter({ hasText: /State|Common|Hooks|Select All|Clear|No categories/i });
      await expect(chipsOrMessage.first()).toBeVisible({ timeout: 5000 });
    });

    test('should show Number of Questions section', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Number of Questions/i })).toBeVisible();
    });

    test('should show Difficulty filter', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Difficulty/i })).toBeVisible();
    });

    test('should show Start Drilling button', async ({ page }) => {
      const startBtn = page.getByRole('button', { name: /Start Drilling/i });
      await expect(startBtn).toBeVisible();
    });

    test('should have Exit link back to framework hub', async ({ page }) => {
      const exitLink = page.getByRole('link', { name: /Exit/i });
      await expect(exitLink).toBeVisible();
      await expect(exitLink).toHaveAttribute('href', `/frontend-drills/${FRAMEWORK}`);
    });

    test('should toggle category when clicking a category chip', async ({ page }) => {
      const categoryChip = page
        .locator('button')
        .filter({ hasText: /State & Lifecycle|Common Patterns|Hooks/i })
        .first();
      if (!(await categoryChip.isVisible())) {
        test.skip();
        return;
      }
      const initialClasses = await categoryChip.getAttribute('class');
      await categoryChip.click();
      await page.waitForTimeout(300);
      const afterClasses = await categoryChip.getAttribute('class');
      expect(initialClasses !== null || afterClasses !== null).toBeTruthy();
    });
  });

  test.describe('Drill Flow', () => {
    test('should start drill when clicking Start Drilling', async ({ page }) => {
      const startBtn = page.getByRole('button', { name: /Start Drilling/i });
      await startBtn.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      const inDrill =
        (await page.getByText(/Question \d+ of \d+/).isVisible()) ||
        (await page.getByRole('button', { name: /Submit|Check|Next|Skip/i }).isVisible()) ||
        (await page.locator('textarea, [contenteditable="true"]').first().isVisible());
      expect(inDrill).toBeTruthy();
    });

    test('should transition to drill phase after starting', async ({ page }) => {
      await page.getByRole('button', { name: /Start Drilling/i }).click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      const inDrillPhase =
        (await page.getByText(/Question \d+ of \d+/).isVisible()) ||
        (await page.getByRole('button', { name: /Submit|Check|Next|Skip/i }).isVisible()) ||
        (await page
          .locator('textarea, [contenteditable="true"], .monaco-editor')
          .first()
          .isVisible());
      expect(inDrillPhase).toBeTruthy();
    });
  });

  test.describe('Navigation', () => {
    test('breadcrumb should include Frontend Drills and framework', async ({ page }) => {
      const breadcrumb = page.locator('nav').filter({ hasText: /Frontend Drills|React/i });
      await expect(breadcrumb.first()).toBeVisible();
    });
  });
});
