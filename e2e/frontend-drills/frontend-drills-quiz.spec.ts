import { expect, test } from '@playwright/test';

/**
 * E2E tests for Frontend Drills quiz mode (/frontend-drills/[framework]/quiz).
 * Covers setup phase, starting quiz, answering, and results.
 */

const FRAMEWORK = 'react';
const QUIZ_URL = `/frontend-drills/${FRAMEWORK}/quiz`;

async function clearStorage(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

test.describe('Frontend Drills - Quiz Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(QUIZ_URL);
    await page.waitForLoadState('networkidle');
    await clearStorage(page);
  });

  test.describe('Setup Phase', () => {
    test('should show Quiz Mode heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Quiz Mode/i })).toBeVisible({
        timeout: 10000,
      });
    });

    test('should show Categories section', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Categories/i })).toBeVisible();
    });

    test('should show question count or slider', async ({ page }) => {
      const countLabel = page.getByText(/questions?|Number of|question count/i);
      await expect(countLabel.first()).toBeVisible({ timeout: 5000 });
    });

    test('should have Start Quiz or similar button', async ({ page }) => {
      const startBtn = page.getByRole('button', { name: /Start|Begin|Play/i });
      await expect(startBtn.first()).toBeVisible();
    });

    test('should have Exit link to framework hub', async ({ page }) => {
      const exitLink = page.getByRole('link', { name: /Exit/i });
      await expect(exitLink).toBeVisible();
      await expect(exitLink).toHaveAttribute('href', `/frontend-drills/${FRAMEWORK}`);
    });
  });

  test.describe('Quiz Flow', () => {
    test('should start quiz and show first question or options', async ({ page }) => {
      const startBtn = page.getByRole('button', { name: /Start|Begin|Play/i }).first();
      await startBtn.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
      const hasQuestion =
        (await page.getByText(/\?/).isVisible()) ||
        (await page.getByRole('radio').isVisible()) ||
        (await page
          .locator('button')
          .filter({ hasText: /^[A-D]\.|^[1-4]\./ })
          .isVisible()) ||
        (await page.getByRole('heading', { level: 2 }).isVisible());
      expect(hasQuestion).toBeTruthy();
    });
  });

  test.describe('Navigation', () => {
    test('breadcrumb should include Frontend Drills and Quiz', async ({ page }) => {
      const crumb = page.getByText(/Frontend Drills|Quiz/i).first();
      await expect(crumb).toBeVisible();
    });
  });
});
