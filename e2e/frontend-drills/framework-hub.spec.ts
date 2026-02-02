import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('Framework Hub Page — native-js', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToFrameworkHub('native-js');
  });

  test('should display framework name and description', async ({ page }) => {
    await waitForAnimations(page);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Native JavaScript');
    await expect(page.getByText(/Master the DOM API/i)).toBeVisible();
  });

  test('should display framework icon', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('JS').first()).toBeVisible();
  });

  test('should show 5 mode cards', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Drill Mode')).toBeVisible();
    await expect(page.getByText('Quiz Mode')).toBeVisible();
    await expect(page.getByText('Frontend Training')).toBeVisible();
    await expect(page.getByText('UI Patterns')).toBeVisible();
    await expect(page.getByText('Cheatsheet')).toBeVisible();
  });

  test('should show correct badges with counts', async ({ page }) => {
    await waitForAnimations(page);
    // At least one badge should show problem/question/pattern counts
    const badges = page.locator(
      'span:has-text("problems"), span:has-text("questions"), span:has-text("patterns"), span:has-text("topics"), span:has-text("exercises")',
    );
    expect(await badges.count()).toBeGreaterThan(0);
  });

  test('should have correct navigation links', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.locator('a[href="/frontend-drills/native-js/drill"]')).toBeVisible();
    await expect(page.locator('a[href="/frontend-drills/native-js/quiz"]')).toBeVisible();
    await expect(page.locator('a[href="/frontend-drills/native-js/training"]')).toBeVisible();
    await expect(page.locator('a[href="/frontend-drills/native-js/ui-patterns"]')).toBeVisible();
    await expect(page.locator('a[href="/frontend-drills/native-js/cheatsheet"]')).toBeVisible();
  });

  test('should navigate to drill mode when clicking Drill Mode card', async ({ page }) => {
    await waitForAnimations(page);
    await page.locator('a[href="/frontend-drills/native-js/drill"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/frontend-drills/native-js/drill');
  });

  test('should navigate to quiz mode when clicking Quiz Mode card', async ({ page }) => {
    await waitForAnimations(page);
    await page.locator('a[href="/frontend-drills/native-js/quiz"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/frontend-drills/native-js/quiz');
  });

  test('should show quick tips section', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText(/Quick Tips/i)).toBeVisible();
    await expect(page.getByText(/Start with Drill Mode/i)).toBeVisible();
  });

  test('should redirect invalid framework to not-found', async ({ page }) => {
    await page.goto('/frontend-drills/invalid-framework');
    await page.waitForLoadState('networkidle');
    // The component redirects to /not-found for invalid frameworks
    await expect(page).toHaveURL(/not-found/);
  });
});

test.describe('Framework Hub — Cross-framework smoke tests', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} hub loads correctly`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToFrameworkHub(fw);
      await waitForAnimations(page);
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(FRAMEWORK_NAMES[fw]);
      // Mode cards should be visible
      await expect(page.getByText('Drill Mode')).toBeVisible();
      await expect(page.getByText('Quiz Mode')).toBeVisible();
    });
  }

  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} hub has correct drill link`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToFrameworkHub(fw);
      await waitForAnimations(page);
      await expect(page.locator(`a[href="/frontend-drills/${fw}/drill"]`)).toBeVisible();
    });
  }
});
