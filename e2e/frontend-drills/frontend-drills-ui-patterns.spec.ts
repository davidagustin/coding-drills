import { expect, test } from '@playwright/test';

/**
 * E2E tests for Frontend Drills UI Patterns:
 * - List: /frontend-drills/[framework]/ui-patterns
 * - Pattern detail: /frontend-drills/[framework]/ui-patterns/[patternId]
 */

const FRAMEWORK = 'react';
const UI_PATTERNS_LIST_URL = `/frontend-drills/${FRAMEWORK}/ui-patterns`;

test.describe('Frontend Drills - UI Patterns List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(UI_PATTERNS_LIST_URL);
    await page.waitForLoadState('networkidle');
  });

  test('should load UI patterns list page', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/ui-patterns`));
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should display patterns or categories', async ({ page }) => {
    const hasContent =
      (await page.locator('a[href*="/ui-patterns/"]').first().isVisible()) ||
      (await page.getByText(/Forms|Navigation|Data|Pattern/i).isVisible()) ||
      (await page.getByRole('heading', { level: 2 }).isVisible());
    expect(hasContent).toBeTruthy();
  });

  test('should have link back to Frontend Drills or framework', async ({ page }) => {
    const backLink = page
      .locator(`a[href="/frontend-drills"], a[href*="/frontend-drills/${FRAMEWORK}"]`)
      .first();
    await expect(backLink).toBeVisible();
  });

  test('should navigate to pattern detail when clicking a pattern', async ({ page }) => {
    const patternLink = page.locator('a[href*="/ui-patterns/"]').first();
    if (!(await patternLink.isVisible())) {
      test.skip();
      return;
    }
    await patternLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/ui-patterns/[^/]+`));
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});

test.describe('Frontend Drills - UI Pattern Detail', () => {
  test('should load pattern detail when visiting direct URL', async ({ page }) => {
    await page.goto(UI_PATTERNS_LIST_URL);
    await page.waitForLoadState('networkidle');
    const firstLink = page.locator('a[href*="/ui-patterns/"]').first();
    if (!(await firstLink.isVisible())) {
      test.skip();
      return;
    }
    const href = await firstLink.getAttribute('href');
    if (!href) {
      test.skip();
      return;
    }
    await page.goto(href.startsWith('http') ? href : `http://localhost:3000${href}`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/ui-patterns/`));
    await expect(page.locator('main, [role="main"], h1').first()).toBeVisible();
  });
});
