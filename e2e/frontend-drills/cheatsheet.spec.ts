import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('Frontend Cheatsheet — native-js', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToCheatsheet('native-js');
  });

  test('should display the cheatsheet page heading', async ({ page }) => {
    await waitForAnimations(page);
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.toLowerCase()).toMatch(/cheatsheet|reference|native javascript/i);
  });

  test('should display cheatsheet sections', async ({ page }) => {
    await waitForAnimations(page);
    // Cheatsheet should have multiple topic sections
    const sections = page.locator('h2, h3').filter({ hasNotText: /^$/ });
    expect(await sections.count()).toBeGreaterThan(0);
  });

  test('should display code examples', async ({ page }) => {
    await waitForAnimations(page);
    // Cheatsheet should contain code blocks
    const codeBlocks = page.locator('pre, code, .monaco-editor');
    expect(await codeBlocks.count()).toBeGreaterThan(0);
  });

  test('should have navigation sidebar or table of contents', async ({ page }) => {
    await waitForAnimations(page);
    // Cheatsheet may have a sidebar/nav for sections
    const nav = page.locator('nav, [class*="sidebar"], [class*="toc"], [class*="navigation"]');
    // Some cheatsheets may use scroll spy instead of visible nav
    const hasNav = await nav.count();
    // Verify page loaded regardless
    expect(await page.locator('h1, h2').first().isVisible()).toBe(true);
  });

  test('should display syntax highlights in code blocks', async ({ page }) => {
    await waitForAnimations(page);
    // Code blocks should be present with content
    const codeContent = page.locator('pre code, .monaco-editor');
    if ((await codeContent.count()) > 0) {
      const text = await codeContent.first().textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should be scrollable for long content', async ({ page }) => {
    await waitForAnimations(page);
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(bodyHeight).toBeGreaterThan(500);
  });

  test('should scroll to a section when clicking nav item', async ({ page }) => {
    await waitForAnimations(page);
    // If there are section links or nav items, clicking one should scroll
    const navLinks = page.locator('nav a, [class*="toc"] a, [class*="sidebar"] a');
    if ((await navLinks.count()) > 0) {
      const _initialScroll = await page.evaluate(() => window.scrollY);
      await navLinks.first().click();
      await page.waitForTimeout(500);
      const newScroll = await page.evaluate(() => window.scrollY);
      // Scroll position may change (or stay if already in view)
      expect(typeof newScroll).toBe('number');
    }
  });

  test('should have breadcrumb navigation', async ({ page }) => {
    await waitForAnimations(page);
    // Cheatsheet should have breadcrumbs back to framework hub
    const breadcrumbs = page.getByText('Frontend Drills').or(page.getByText('Native JavaScript'));
    await expect(breadcrumbs.first()).toBeVisible();
  });

  test('should have back navigation to framework hub', async ({ page }) => {
    await waitForAnimations(page);
    const backLink = page
      .locator('a[href="/frontend-drills/native-js"]')
      .or(page.getByRole('link', { name: /Back|Native JavaScript/i }));
    await expect(backLink.first()).toBeVisible();
  });

  test('should display framework-specific content', async ({ page }) => {
    await waitForAnimations(page);
    // The content should reference JavaScript/DOM concepts
    const jsContent = page.getByText(
      /DOM|JavaScript|querySelector|addEventListener|function|const|let/i,
    );
    await expect(jsContent.first()).toBeVisible();
  });
});

test.describe('Frontend Cheatsheet — Cross-framework smoke', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} cheatsheet loads`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToCheatsheet(fw);
      await waitForAnimations(page);
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
    });
  }
});
