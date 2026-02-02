import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('Frontend Drills Landing Page', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToLanding();
  });

  test('should load the landing page with correct heading', async ({ page }) => {
    await expect(page).toHaveURL('/frontend-drills');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Frontend Drills');
  });

  test('should display subtitle and description', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Master frontend frameworks with hands-on practice')).toBeVisible();
    await expect(page.getByText(/Build real-world components/i)).toBeVisible();
  });

  test('should display all 4 framework cards', async ({ page }) => {
    await waitForAnimations(page);
    for (const fw of FRONTEND_FRAMEWORKS) {
      const name = FRAMEWORK_NAMES[fw];
      const card = page.getByRole('link', { name: new RegExp(name) });
      await expect(card).toBeVisible();
    }
  });

  test('should show challenge counts on framework cards', async ({ page }) => {
    await waitForAnimations(page);
    // At least one card should show a "challenges" badge
    const challengeBadges = page.getByText(/\d+ challenges?/);
    await expect(challengeBadges.first()).toBeVisible();
  });

  test('should have correct hrefs on framework cards', async ({ page }) => {
    await waitForAnimations(page);
    for (const fw of FRONTEND_FRAMEWORKS) {
      const link = page.locator(`a[href="/frontend-drills/${fw}"]`);
      await expect(link).toBeVisible();
    }
  });

  test('should display "What You\'ll Practice" section', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText("What You'll Practice")).toBeVisible();
    await expect(page.getByText('Code Drills')).toBeVisible();
    await expect(page.getByText('Framework Quizzes')).toBeVisible();
    await expect(page.getByText('UI Patterns')).toBeVisible();
    await expect(page.getByText('Cheatsheets')).toBeVisible();
  });

  test('should have a "Back to Home" link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/');
  });

  test('should navigate to framework hub when clicking a framework card', async ({ page }) => {
    await waitForAnimations(page);
    await page.locator('a[href="/frontend-drills/native-js"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/frontend-drills/native-js');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await waitForAnimations(page);
    await expect(page.locator('h1')).toBeVisible();
    // Framework cards should still be visible
    await expect(page.locator('a[href="/frontend-drills/native-js"]')).toBeVisible();
  });

  test('should navigate back to home when clicking Back to Home', async ({ page }) => {
    await page.getByRole('link', { name: /Back to Home/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Frontend Drills Landing - Cross-framework smoke', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`should navigate to ${FRAMEWORK_NAMES[fw]} hub`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToLanding();
      await waitForAnimations(page);
      await page.locator(`a[href="/frontend-drills/${fw}"]`).click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`/frontend-drills/${fw}`);
    });
  }
});
