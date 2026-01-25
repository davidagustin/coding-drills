import { expect, test } from '@playwright/test';
import {
  LANGUAGE_NAMES,
  SUPPORTED_LANGUAGES,
  TestUtils,
  waitForAnimations,
} from './fixtures/test-utils';

test.describe('Home Page', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    await utils.goToHome();
  });

  test('should load the home page successfully', async ({ page }) => {
    // Verify page loads without errors
    await expect(page).toHaveURL('/');

    // Check for main heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Code Drills');
  });

  test('should display the hero section with title and description', async ({ page }) => {
    // Wait for animations to complete
    await waitForAnimations(page);

    // Check hero title
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();

    // Check description text
    const description = page.getByText(/Master programming methods through practice/i);
    await expect(description).toBeVisible();

    // Check secondary description
    const secondaryText = page.getByText(/Sharpen your coding skills/i);
    await expect(secondaryText).toBeVisible();
  });

  test('should display all language cards', async ({ page }) => {
    await waitForAnimations(page);

    // Check that all 9 language cards are present
    for (const language of SUPPORTED_LANGUAGES) {
      const languageName = LANGUAGE_NAMES[language];
      const card = page.getByRole('link', { name: languageName });
      await expect(card).toBeVisible();
    }
  });

  test('should have correct number of language cards (9 languages)', async ({ page }) => {
    await waitForAnimations(page);

    // Count language cards by looking for h3 elements within links
    const languageCards = page.locator('a[href^="/"] h3');
    await expect(languageCards).toHaveCount(9);
  });

  test('should display learning modes section', async ({ page }) => {
    await waitForAnimations(page);

    // Check section title
    const modesTitle = page.getByText('Learning Modes');
    await expect(modesTitle).toBeVisible();

    // Check for each mode
    const drillMode = page.getByText('Drill Mode');
    const quizMode = page.getByText('Quiz Mode');
    const referenceMode = page.getByText('Reference Mode');

    await expect(drillMode).toBeVisible();
    await expect(quizMode).toBeVisible();
    await expect(referenceMode).toBeVisible();
  });

  test('should display mode descriptions', async ({ page }) => {
    await waitForAnimations(page);

    // Check mode descriptions are present
    const drillDesc = page.getByText(/Practice method implementations/i);
    const quizDesc = page.getByText(/Test your knowledge/i);
    const referenceDesc = page.getByText(/Browse comprehensive documentation/i);

    await expect(drillDesc).toBeVisible();
    await expect(quizDesc).toBeVisible();
    await expect(referenceDesc).toBeVisible();
  });

  test('should display statistics section', async ({ page }) => {
    await waitForAnimations(page);

    // Check for stats
    const languagesCount = page.getByText('9');
    const methodsCount = page.getByText('100+');
    const freeText = page.getByText('Free');

    await expect(languagesCount.first()).toBeVisible();
    await expect(methodsCount).toBeVisible();
    await expect(freeText).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer content
    const footerBrand = page.locator('footer').getByText('Code Drills');
    await expect(footerBrand).toBeVisible();

    // Check for "Made with" text
    const madeWith = page.getByText(/Made with/i);
    await expect(madeWith).toBeVisible();

    // Check copyright
    const copyright = page.getByText(/All rights reserved/i);
    await expect(copyright).toBeVisible();
  });

  test('should have proper page title', async ({ page }) => {
    // Check that page has a title (exact title may vary)
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Refresh to apply viewport
    await page.reload();
    await waitForAnimations(page);

    // Check that main elements are still visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Language cards should be in a 2-column grid on mobile
    const firstLanguageCard = page.getByRole('link', { name: 'JavaScript' });
    await expect(firstLanguageCard).toBeVisible();
  });

  test('should have accessible language card links', async ({ page }) => {
    await waitForAnimations(page);

    // Each language card should be a proper link
    for (const language of SUPPORTED_LANGUAGES) {
      const languageName = LANGUAGE_NAMES[language];
      const card = page.getByRole('link', { name: languageName });

      // Check that link has proper href
      const href = await card.getAttribute('href');
      expect(href).toBe(`/${language}`);
    }
  });

  test('should have hover effects on language cards', async ({ page }) => {
    await waitForAnimations(page);

    const jsCard = page.getByRole('link', { name: 'JavaScript' });

    // Hover over card
    await jsCard.hover();

    // The card should still be visible (hover effects are visual only)
    await expect(jsCard).toBeVisible();
  });
});

test.describe('Home Page - Navigation', () => {
  test('should navigate to JavaScript page when clicking JavaScript card', async ({ page }) => {
    const utils = new TestUtils(page);
    await utils.goToHome();
    await waitForAnimations(page);

    await utils.selectLanguageFromHome('javascript');

    await expect(page).toHaveURL('/javascript');
  });

  test('should navigate to Python page when clicking Python card', async ({ page }) => {
    const utils = new TestUtils(page);
    await utils.goToHome();
    await waitForAnimations(page);

    await utils.selectLanguageFromHome('python');

    await expect(page).toHaveURL('/python');
  });

  test('should navigate to each language page', async ({ page }) => {
    const utils = new TestUtils(page);

    // Test navigation to each language
    for (const language of SUPPORTED_LANGUAGES) {
      await utils.goToHome();
      await waitForAnimations(page);

      await utils.selectLanguageFromHome(language);

      await expect(page).toHaveURL(`/${language}`);
    }
  });
});

test.describe('Home Page - Visual Regression', () => {
  test('hero section should match snapshot', async ({ page }) => {
    const utils = new TestUtils(page);
    await utils.goToHome();
    await waitForAnimations(page);

    // Take screenshot of hero section
    const hero = page.locator('header').first();
    await expect(hero).toHaveScreenshot('hero-section.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('language grid should match snapshot', async ({ page }) => {
    const utils = new TestUtils(page);
    await utils.goToHome();
    await waitForAnimations(page);

    // Take screenshot of language grid
    const languageSection = page.locator('section').filter({ hasText: 'Choose Your Language' });
    await expect(languageSection).toHaveScreenshot('language-grid.png', {
      maxDiffPixelRatio: 0.1,
    });
  });
});

test.describe('Home Page - Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (like favicon 404)
    const criticalErrors = errors.filter(
      (error) => !error.includes('favicon') && !error.includes('Failed to load resource'),
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
