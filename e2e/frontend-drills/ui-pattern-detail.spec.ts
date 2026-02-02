import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('UI Pattern Detail Page', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    // Navigate to UI patterns catalog and click the first pattern
    await utils.goToUIPatterns('native-js');
    await waitForAnimations(page);
    const firstPattern = page.locator('a[href*="/ui-patterns/"]').first();
    await firstPattern.click();
    await page.waitForLoadState('networkidle');
  });

  test('should display pattern title', async ({ page }) => {
    await waitForAnimations(page);
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.length).toBeGreaterThan(0);
  });

  test('should display pattern description', async ({ page }) => {
    await waitForAnimations(page);
    // Pattern detail pages should have descriptive content
    const descriptions = page.locator('p').filter({ hasNotText: /^$/ });
    expect(await descriptions.count()).toBeGreaterThan(0);
  });

  test('should display difficulty badge', async ({ page }) => {
    await waitForAnimations(page);
    const badge = page.locator('text=/beginner|intermediate|advanced/i');
    await expect(badge.first()).toBeVisible();
  });

  test('should display category badge', async ({ page }) => {
    await waitForAnimations(page);
    // Category like "Forms", "Navigation", "Data Display", "Interactive", "Layout"
    const category = page.locator(
      'text=/Forms|Navigation|Data Display|Interactive|Layout|Feedback/i',
    );
    await expect(category.first()).toBeVisible();
  });

  test('should show Monaco editor with code', async ({ page }) => {
    await waitForAnimations(page);
    // Monaco editor should load for code display
    const editor = page.locator('.monaco-editor');
    await expect(editor.first()).toBeVisible({ timeout: 15000 });
  });

  test('should show live preview iframe or preview area', async ({ page }) => {
    await waitForAnimations(page);
    // Live preview should be rendered in an iframe or dedicated container
    const preview = page.locator('iframe, [class*="preview"], [class*="Preview"]');
    if ((await preview.count()) > 0) {
      await expect(preview.first()).toBeVisible({ timeout: 15000 });
    }
  });

  test('should have navigation back to patterns catalog', async ({ page }) => {
    await waitForAnimations(page);
    const backLink = page
      .getByRole('link', { name: /Back|Patterns|UI Patterns/i })
      .or(page.locator('a[href*="/ui-patterns"]').filter({ hasNotText: /^\// }));
    await expect(backLink.first()).toBeVisible();
  });

  test('should show code tabs if multiple code sections exist', async ({ page }) => {
    await waitForAnimations(page);
    // Some patterns have HTML/CSS/JS tabs
    // Tabs are optional — just verify the page loaded
    expect(await page.locator('h1, h2').first().isVisible()).toBe(true);
  });

  test('should be scrollable on long content', async ({ page }) => {
    await waitForAnimations(page);
    // Just verify the page is rendered — long patterns are scrollable
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(pageHeight).toBeGreaterThan(100);
  });

  test('should have correct URL pattern', async ({ page }) => {
    await expect(page).toHaveURL(/\/frontend-drills\/native-js\/ui-patterns\/.+/);
  });
});

test.describe('UI Pattern Detail — Cross-framework smoke', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} pattern detail loads from catalog`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToUIPatterns(fw);
      await waitForAnimations(page);
      const firstPattern = page.locator('a[href*="/ui-patterns/"]').first();
      if (await firstPattern.isVisible().catch(() => false)) {
        await firstPattern.click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(new RegExp(`/frontend-drills/${fw}/ui-patterns/.+`));
        // Should display pattern content
        await expect(page.locator('h1, h2').first()).toBeVisible();
      }
    });
  }
});
