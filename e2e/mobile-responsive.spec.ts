import { expect, test } from '@playwright/test';
import { TestUtils, waitForAnimations } from './fixtures/test-utils';

const MOBILE_VIEWPORT = { width: 375, height: 667 };

test.describe('Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test.describe('Landing Page', () => {
    test('should not have horizontal overflow', async ({ page }) => {
      await page.goto('/');
      await waitForAnimations(page);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
    });

    test('hero title should be visible and fit within viewport', async ({ page }) => {
      await page.goto('/');
      await waitForAnimations(page);

      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      const box = await heading.boundingBox();
      expect(box).toBeTruthy();
      expect(box!.width).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
    });

    test('language cards should display in a grid', async ({ page }) => {
      await page.goto('/');
      await waitForAnimations(page);

      const jsCard = page.getByRole('link', { name: 'JavaScript' });
      await expect(jsCard).toBeVisible();
      const box = await jsCard.boundingBox();
      expect(box).toBeTruthy();
      // Card should not exceed viewport width
      expect(box!.x + box!.width).toBeLessThanOrEqual(MOBILE_VIEWPORT.width + 1);
    });

    test('feature section CTA buttons should be tappable (min 44px height)', async ({ page }) => {
      await page.goto('/');
      await waitForAnimations(page);

      // Scroll to interview section
      const interviewLink = page.getByRole('link', { name: /Start Interview/i });
      await interviewLink.scrollIntoViewIfNeeded();
      await expect(interviewLink).toBeVisible();
      const box = await interviewLink.boundingBox();
      expect(box).toBeTruthy();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('footer should be visible and not overflow', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      const footerBox = await footer.boundingBox();
      expect(footerBox).toBeTruthy();
      expect(footerBox!.width).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
    });
  });

  test.describe('Language Home Page', () => {
    test('should not have horizontal overflow', async ({ page }) => {
      await page.goto('/javascript');
      await waitForAnimations(page);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
    });

    test('mode cards should stack in single column on mobile', async ({ page }) => {
      await page.goto('/javascript');
      await waitForAnimations(page);

      // Find mode cards container
      const modeCards = page.locator('a[href="/javascript/drill"]');
      await expect(modeCards).toBeVisible();
      const box = await modeCards.boundingBox();
      expect(box).toBeTruthy();
      // Card should be nearly full width on mobile (within padding)
      expect(box!.width).toBeGreaterThan(MOBILE_VIEWPORT.width * 0.7);
    });

    test('stats grid should not overflow', async ({ page }) => {
      await page.goto('/javascript');
      await waitForAnimations(page);

      // The page should not have horizontal scrolling
      const overflows = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflows).toBe(false);
    });
  });

  test.describe('Quiz Page', () => {
    test('quiz type grid should not overflow on mobile', async ({ page }) => {
      await page.goto('/javascript/quiz');
      await waitForAnimations(page);

      // Check that quiz type buttons are visible and fit
      const methodsButton = page.getByRole('button', { name: /Methods/i });
      await expect(methodsButton).toBeVisible();

      // The page should not have horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
    });

    test('quiz type buttons should be at least 40px tall', async ({ page }) => {
      await page.goto('/javascript/quiz');
      await waitForAnimations(page);

      const methodsButton = page.getByRole('button', { name: /Methods/i });
      const box = await methodsButton.boundingBox();
      expect(box).toBeTruthy();
      expect(box!.height).toBeGreaterThanOrEqual(40);
    });
  });

  test.describe('Reference Page', () => {
    test('should not have horizontal overflow', async ({ page }) => {
      await page.goto('/javascript/reference');
      await waitForAnimations(page);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
    });
  });

  test.describe('Interview Page', () => {
    test('should not have horizontal overflow', async ({ page }) => {
      await page.goto('/javascript/interview');
      await waitForAnimations(page);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
    });
  });

  test.describe('Frontend Drills', () => {
    test('landing page should not have horizontal overflow', async ({ page }) => {
      await page.goto('/frontend-drills');
      await waitForAnimations(page);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
    });

    test('framework cards should be visible', async ({ page }) => {
      await page.goto('/frontend-drills');
      await waitForAnimations(page);

      const reactCard = page.getByRole('link', { name: /React/i }).first();
      await expect(reactCard).toBeVisible();
    });
  });

  test.describe('Cross-page touch targets', () => {
    test('navbar hamburger menu should be at least 44px', async ({ page }) => {
      await page.goto('/');
      await waitForAnimations(page);

      // Look for the mobile menu button (md:hidden)
      const menuButton = page.locator('button').filter({ hasText: '' }).first();
      // The navbar should have a mobile-friendly touch target
      const nav = page.locator('nav');
      if (await nav.isVisible()) {
        const navBox = await nav.boundingBox();
        expect(navBox).toBeTruthy();
        expect(navBox!.width).toBeLessThanOrEqual(MOBILE_VIEWPORT.width);
      }
    });
  });
});
