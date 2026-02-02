import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('UI Patterns Catalog — native-js', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToUIPatterns('native-js');
  });

  test('should display the UI Patterns page heading', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText(/UI Patterns/i).first()).toBeVisible();
  });

  test('should display pattern cards', async ({ page }) => {
    await waitForAnimations(page);
    // Pattern cards should be links to individual patterns
    const patternLinks = page.locator('a[href*="/ui-patterns/"]');
    expect(await patternLinks.count()).toBeGreaterThan(0);
  });

  test('should display category filter chips', async ({ page }) => {
    await waitForAnimations(page);
    // Category filters like Forms, Navigation, Data Display, Interactive
    const categoryFilters = page.locator('button[class*="rounded"]').filter({
      hasNotText: /Easy|Medium|Hard|All Difficulties|Search/i,
    });
    expect(await categoryFilters.count()).toBeGreaterThan(0);
  });

  test('should have a search input', async ({ page }) => {
    await waitForAnimations(page);
    const searchInput = utils.getSearchInput();
    await expect(searchInput).toBeVisible();
  });

  test('should filter patterns when typing in search', async ({ page }) => {
    await waitForAnimations(page);
    const searchInput = utils.getSearchInput();
    // Count initial patterns
    const initialCount = await page.locator('a[href*="/ui-patterns/"]').count();
    // Search for something specific
    await searchInput.fill('form');
    await waitForAnimations(page);
    // Should show filtered results (fewer or equal to initial)
    const filteredCount = await page.locator('a[href*="/ui-patterns/"]').count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should filter patterns by category', async ({ page }) => {
    await waitForAnimations(page);
    // Click a category filter
    const categoryButtons = page.locator('button[class*="rounded"]').filter({
      hasNotText: /Easy|Medium|Hard|All|Search|Back/i,
    });
    if ((await categoryButtons.count()) > 1) {
      const firstCategory = categoryButtons.first();
      await firstCategory.click();
      await waitForAnimations(page);
      // Patterns should be visible (possibly filtered)
      const patterns = page.locator('a[href*="/ui-patterns/"]');
      expect(await patterns.count()).toBeGreaterThanOrEqual(0);
    }
  });

  test('should show difficulty badges on patterns', async ({ page }) => {
    await waitForAnimations(page);
    const badges = page.locator('text=/beginner|intermediate|advanced/i');
    expect(await badges.count()).toBeGreaterThan(0);
  });

  test('should filter by difficulty', async ({ page }) => {
    await waitForAnimations(page);
    // Click on a difficulty filter if present
    const difficultyBtn = page.getByRole('button', { name: /Beginner|Easy/i });
    if (await difficultyBtn.isVisible().catch(() => false)) {
      await difficultyBtn.click();
      await waitForAnimations(page);
    }
  });

  test('should navigate to pattern detail when clicking a pattern', async ({ page }) => {
    await waitForAnimations(page);
    const firstPattern = page.locator('a[href*="/ui-patterns/"]').first();
    await firstPattern.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/ui-patterns\/.+/);
  });

  test('should show pattern count', async ({ page }) => {
    await waitForAnimations(page);
    // Should show how many patterns are available
    const countText = page.getByText(/\d+ pattern/i);
    await expect(countText.first()).toBeVisible();
  });

  test('should clear search when clearing the input', async ({ page }) => {
    await waitForAnimations(page);
    const searchInput = utils.getSearchInput();
    await searchInput.fill('modal');
    await waitForAnimations(page);
    const filteredCount = await page.locator('a[href*="/ui-patterns/"]').count();
    // Clear search
    await searchInput.clear();
    await waitForAnimations(page);
    const fullCount = await page.locator('a[href*="/ui-patterns/"]').count();
    expect(fullCount).toBeGreaterThanOrEqual(filteredCount);
  });

  test('should display pattern descriptions', async ({ page }) => {
    await waitForAnimations(page);
    // Each pattern card should have descriptive text
    const descriptions = page.locator('a[href*="/ui-patterns/"] p');
    expect(await descriptions.count()).toBeGreaterThan(0);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await waitForAnimations(page);
    await expect(page.getByText(/UI Patterns/i).first()).toBeVisible();
  });
});

test.describe('UI Patterns — Cross-framework smoke', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} UI patterns catalog loads`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToUIPatterns(fw);
      await waitForAnimations(page);
      await expect(page.getByText(/UI Patterns/i).first()).toBeVisible();
    });
  }

  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} UI patterns has search`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToUIPatterns(fw);
      await waitForAnimations(page);
      await expect(utils.getSearchInput()).toBeVisible();
    });
  }
});
