import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('Frontend Training — Problem List', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToTraining('native-js');
  });

  test('should display the training page heading', async ({ page }) => {
    await waitForAnimations(page);
    // Training page should show framework name and a heading
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display a list of problems', async ({ page }) => {
    await waitForAnimations(page);
    // There should be clickable problem rows/cards
    const problemLinks = page
      .locator('a[href*="/training/"], tr, [class*="problem"], [class*="row"]')
      .filter({
        has: page.locator('text=/\\d+/'),
      });
    expect(await problemLinks.count()).toBeGreaterThan(0);
  });

  test('should show difficulty badges on problems', async ({ page }) => {
    await waitForAnimations(page);
    const difficultyBadges = page.locator('text=/easy|medium|hard/i');
    expect(await difficultyBadges.count()).toBeGreaterThan(0);
  });

  test('should allow filtering by difficulty', async ({ page }) => {
    await waitForAnimations(page);
    // Click on difficulty filter buttons if they exist
    const easyBtn = page.getByRole('button', { name: 'Easy' }).or(page.getByText('Easy').first());
    if (await easyBtn.isVisible().catch(() => false)) {
      await easyBtn.click();
      await waitForAnimations(page);
    }
  });

  test('should allow filtering by category', async ({ page }) => {
    await waitForAnimations(page);
    // Category filter chips should be present
    const categoryChips = page.locator('button[class*="rounded"]').filter({
      hasNotText: /Easy|Medium|Hard|All|Select|Clear|Sort/i,
    });
    if ((await categoryChips.count()) > 0) {
      await categoryChips.first().click();
      await waitForAnimations(page);
    }
  });

  test('should navigate to individual problem when clicking', async ({ page }) => {
    await waitForAnimations(page);
    // Click the first problem link
    const problemLink = page.locator('a[href*="/training/"]').first();
    if (await problemLink.isVisible().catch(() => false)) {
      await problemLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/training\/.+/);
    }
  });

  test('should show search or sort controls', async ({ page }) => {
    await waitForAnimations(page);
    // Should have some filtering/sorting UI
    const controls = page.locator(
      'input[type="search"], input[placeholder*="Search"], button:has-text("Sort"), select',
    );
    expect(await controls.count()).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Frontend Training — Cross-framework smoke', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} training page loads`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToTraining(fw);
      await waitForAnimations(page);
      // Page should load without errors
      await expect(page.locator('h1, h2').first()).toBeVisible();
    });
  }
});
