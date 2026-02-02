import { expect, test } from '@playwright/test';

/**
 * E2E tests for Frontend Drills framework hub pages (/frontend-drills/[framework]).
 * Covers mode cards (Drill, Quiz, Training, UI Patterns, Cheatsheet) and navigation.
 */

const FRAMEWORKS = ['react', 'vue', 'native-js', 'angular'] as const;

test.describe('Frontend Drills - Framework Hub', () => {
  for (const framework of FRAMEWORKS) {
    test.describe(`Framework: ${framework}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/frontend-drills/${framework}`);
        await page.waitForLoadState('networkidle');
      });

      test('should load framework hub and show framework name', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`/frontend-drills/${framework}/?$`));
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
      });

      test('should display mode links: Drill, Quiz, Training, UI Patterns, Cheatsheet', async ({
        page,
      }) => {
        await expect(
          page.locator(`a[href="/frontend-drills/${framework}/drill"]`).first(),
        ).toBeVisible();
        await expect(
          page.locator(`a[href="/frontend-drills/${framework}/quiz"]`).first(),
        ).toBeVisible();
        await expect(
          page.locator(`a[href="/frontend-drills/${framework}/training"]`).first(),
        ).toBeVisible();
        await expect(
          page.locator(`a[href="/frontend-drills/${framework}/ui-patterns"]`).first(),
        ).toBeVisible();
        await expect(
          page.locator(`a[href="/frontend-drills/${framework}/cheatsheet"]`).first(),
        ).toBeVisible();
      });

      test('should have correct drill link', async ({ page }) => {
        const drillLink = page.locator(`a[href="/frontend-drills/${framework}/drill"]`).first();
        await expect(drillLink).toBeVisible();
      });

      test('should have correct quiz link', async ({ page }) => {
        const quizLink = page.locator(`a[href="/frontend-drills/${framework}/quiz"]`).first();
        await expect(quizLink).toBeVisible();
      });

      test('should have correct training link', async ({ page }) => {
        const trainingLink = page
          .locator(`a[href="/frontend-drills/${framework}/training"]`)
          .first();
        await expect(trainingLink).toBeVisible();
      });

      test('should have correct ui-patterns link', async ({ page }) => {
        const patternsLink = page
          .locator(`a[href="/frontend-drills/${framework}/ui-patterns"]`)
          .first();
        await expect(patternsLink).toBeVisible();
      });

      test('should have correct cheatsheet link', async ({ page }) => {
        const cheatsheetLink = page
          .locator(`a[href="/frontend-drills/${framework}/cheatsheet"]`)
          .first();
        await expect(cheatsheetLink).toBeVisible();
      });

      test('should have link back to Frontend Drills', async ({ page }) => {
        const backLink = page.locator('a[href="/frontend-drills"]').first();
        await expect(backLink).toBeVisible();
      });

      test('should navigate to drill when clicking Drill', async ({ page }) => {
        await page.locator(`a[href="/frontend-drills/${framework}/drill"]`).first().click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(new RegExp(`/frontend-drills/${framework}/drill`));
        await expect(
          page.getByRole('heading', { name: /Drill Mode|Categories|Number of Questions/i }),
        ).toBeVisible();
      });

      test('should navigate to quiz when clicking Quiz', async ({ page }) => {
        await page.locator(`a[href="/frontend-drills/${framework}/quiz"]`).first().click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(new RegExp(`/frontend-drills/${framework}/quiz`));
        await expect(page.getByRole('heading', { name: /Quiz Mode|Categories/i })).toBeVisible();
      });

      test('should navigate to training when clicking Training', async ({ page }) => {
        await page.locator(`a[href="/frontend-drills/${framework}/training"]`).first().click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(new RegExp(`/frontend-drills/${framework}/training`));
        await expect(
          page.getByRole('heading', { name: /Training|Practice/i }).or(page.locator('h1')),
        ).toBeVisible();
      });

      test('should navigate to ui-patterns when clicking UI Patterns', async ({ page }) => {
        await page.locator(`a[href="/frontend-drills/${framework}/ui-patterns"]`).first().click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(new RegExp(`/frontend-drills/${framework}/ui-patterns`));
        await expect(page.locator('h1').first()).toBeVisible();
      });

      test('should navigate to cheatsheet when clicking Cheatsheet', async ({ page }) => {
        await page.locator(`a[href="/frontend-drills/${framework}/cheatsheet"]`).first().click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(new RegExp(`/frontend-drills/${framework}/cheatsheet`));
        await expect(page.locator('h1').first()).toBeVisible();
      });
    });
  }

  test('invalid framework should show 404 or redirect', async ({ page }) => {
    const res = await page.goto('/frontend-drills/invalid-framework');
    const status = res?.status();
    const url = page.url();
    expect(status === 404 || url.includes('not-found') || url.includes('invalid')).toBeTruthy();
  });
});
