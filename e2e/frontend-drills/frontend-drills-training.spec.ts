import { expect, test } from '@playwright/test';

/**
 * E2E tests for Frontend Drills training pages:
 * - List: /frontend-drills/[framework]/training
 * - Problem: /frontend-drills/[framework]/training/[problemId]
 */

const FRAMEWORK = 'react';
const TRAINING_LIST_URL = `/frontend-drills/${FRAMEWORK}/training`;

test.describe('Frontend Drills - Training List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TRAINING_LIST_URL);
    await page.waitForLoadState('networkidle');
  });

  test('should load training list page', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/training`));
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should display list of problems or empty state', async ({ page }) => {
    const hasTableOrList =
      (await page.getByRole('table').isVisible()) ||
      (await page.locator('a[href*="/training/"]').first().isVisible()) ||
      (await page.getByText(/No problems|Practice|Training/i).isVisible());
    expect(hasTableOrList).toBeTruthy();
  });

  test('should have link back to framework hub', async ({ page }) => {
    const backLink = page.locator(`a[href="/frontend-drills/${FRAMEWORK}"]`).first();
    await expect(backLink).toBeVisible();
  });

  test('should navigate to a problem when clicking a problem link', async ({ page }) => {
    const problemLink = page.locator('a[href*="/training/"]').first();
    if (!(await problemLink.isVisible())) {
      test.skip();
      return;
    }
    const _href = await problemLink.getAttribute('href');
    await problemLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/training/[^/]+`));
    const hasEditorOrInstructions =
      (await page.locator('textarea, [contenteditable="true"]').first().isVisible()) ||
      (await page.getByRole('heading', { level: 2 }).isVisible()) ||
      (await page.getByText(/useState|useEffect|Return|Write/i).isVisible());
    expect(hasEditorOrInstructions).toBeTruthy();
  });
});

test.describe('Frontend Drills - Training Problem Page', () => {
  test('should load a specific problem page', async ({ page }) => {
    await page.goto(TRAINING_LIST_URL);
    await page.waitForLoadState('networkidle');
    const firstProblemLink = page.locator('a[href*="/training/"]').first();
    if (!(await firstProblemLink.isVisible())) {
      test.skip();
      return;
    }
    const href = await firstProblemLink.getAttribute('href');
    if (!href) {
      test.skip();
      return;
    }
    await page.goto(href.startsWith('http') ? href : `http://localhost:3000${href}`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/training/`));
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});
