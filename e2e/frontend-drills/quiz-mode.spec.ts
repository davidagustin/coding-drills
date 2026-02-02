import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('Frontend Quiz Mode — Setup Phase', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToQuiz('native-js');
  });

  test('should display Quiz Mode heading', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Quiz Mode')).toBeVisible();
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Frontend Drills')).toBeVisible();
  });

  test('should show category selection section', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Categories')).toBeVisible();
  });

  test('should show Number of Questions section', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Number of Questions')).toBeVisible();
  });

  test('should show Difficulty section', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Difficulty').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Easy' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Medium' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hard' })).toBeVisible();
  });

  test('should show Start Quiz button', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByRole('button', { name: /Start Quiz/i })).toBeVisible();
  });

  test('should show Exit link', async ({ page }) => {
    await waitForAnimations(page);
    const exit = page.getByText('Exit');
    await expect(exit).toBeVisible();
  });

  test('should toggle category chips', async ({ page }) => {
    await waitForAnimations(page);
    await page.getByText('Select All').click();
    await expect(page.getByText(/selected/i)).toBeVisible();
    await page.getByText('Clear').click();
  });

  test('should change difficulty filter', async ({ page }) => {
    await waitForAnimations(page);
    await page.getByRole('button', { name: 'Medium' }).click();
    await expect(page.getByRole('button', { name: 'Medium' })).toHaveClass(/bg-blue-500/);
  });
});

test.describe('Frontend Quiz Mode — Playing Phase', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToQuiz('native-js');
    await waitForAnimations(page);
    await utils.startQuiz();
    await waitForAnimations(page);
  });

  test('should transition to quiz playing phase', async ({ page }) => {
    // Should display question counter or progress
    await expect(
      page.getByText(/Question \d+ of \d+/i).or(page.getByText(/\d+ \/ \d+/)),
    ).toBeVisible();
  });

  test('should display a question', async ({ page }) => {
    // Question text should be visible
    const questionArea = page.locator('h2, h3, [class*="question"]').first();
    await expect(questionArea).toBeVisible();
  });

  test('should display answer options', async ({ page }) => {
    // Answer option buttons should be visible (quiz uses clickable option cards)
    const options = page.getByRole('button').filter({ hasNotText: /Exit|Skip|End/i });
    expect(await options.count()).toBeGreaterThanOrEqual(2);
  });

  test('should allow selecting an answer option', async ({ page }) => {
    // Click the first answer option
    const options = page
      .locator('button[class*="rounded"]')
      .filter({ hasNotText: /Exit|Skip|End|Next/i });
    const firstOption = options.first();
    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();
  });

  test('should show feedback after selecting an answer', async ({ page }) => {
    // Find and click an answer option
    const options = page
      .locator('button[class*="rounded"]')
      .filter({ hasNotText: /Exit|Skip|End|Next/i });
    await options.first().waitFor({ state: 'visible' });
    await options.first().click();
    await waitForAnimations(page);
    // Feedback should appear — either "Correct" or "Incorrect" or a Next button
    const feedbackOrNext = page
      .getByText(/Correct|Incorrect/i)
      .or(page.getByRole('button', { name: /Next/i }));
    await expect(feedbackOrNext.first()).toBeVisible({ timeout: 5000 });
  });

  test('should advance to next question after answering', async ({ page }) => {
    // Answer a question
    const options = page
      .locator('button[class*="rounded"]')
      .filter({ hasNotText: /Exit|Skip|End|Next/i });
    await options.first().waitFor({ state: 'visible' });
    await options.first().click();
    await waitForAnimations(page);
    // If there is a "Next" button, click it
    const nextBtn = page.getByRole('button', { name: /Next/i });
    if (await nextBtn.isVisible().catch(() => false)) {
      await nextBtn.click();
      await waitForAnimations(page);
    }
  });

  test('should show score tracker', async ({ page }) => {
    await expect(page.getByText('Score').or(page.getByText('Points'))).toBeVisible();
  });

  test('should show streak counter', async ({ page }) => {
    await expect(page.getByText('Streak')).toBeVisible();
  });
});

test.describe('Frontend Quiz Mode — Results Phase', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToQuiz('native-js');
    await waitForAnimations(page);
    // Start quiz
    await utils.startQuiz();
    await waitForAnimations(page);
    // Click End/Exit to end early and get to results
    const endBtn = page.getByRole('button', { name: /^End$/i }).or(page.getByText('Exit').first());
    await endBtn.click();
    await waitForAnimations(page);
    // If there's a confirmation, click through it
    const confirmEnd = page.getByRole('button', { name: /End Quiz|Confirm|Yes/i });
    if (await confirmEnd.isVisible().catch(() => false)) {
      await confirmEnd.click();
      await waitForAnimations(page);
    }
  });

  test('should display quiz results', async ({ page }) => {
    // Should show some form of results/completion
    const results = page.getByText(/Complete|Results|Score|Accuracy/i);
    await expect(results.first()).toBeVisible({ timeout: 10000 });
  });

  test('should show score summary', async ({ page }) => {
    const scoreIndicator = page.getByText(/Score|Points|Accuracy/i);
    await expect(scoreIndicator.first()).toBeVisible({ timeout: 10000 });
  });

  test('should show retry options', async ({ page }) => {
    // Wait for results to be fully rendered
    await page
      .getByText(/Complete|Results|Score/i)
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
    const retryBtn = page.getByRole('button', { name: /Try Again|New Quiz|Retry|Play Again/i });
    await expect(retryBtn.first()).toBeVisible();
  });

  test('should show back to menu option', async ({ page }) => {
    await page
      .getByText(/Complete|Results|Score/i)
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
    const backBtn = page
      .getByRole('button', { name: /Back to|Menu/i })
      .or(page.getByRole('link', { name: /Back to|Menu/i }));
    await expect(backBtn.first()).toBeVisible();
  });
});

test.describe('Frontend Quiz Mode — Cross-framework smoke', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} quiz setup loads`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToQuiz(fw);
      await waitForAnimations(page);
      await expect(page.getByText('Quiz Mode')).toBeVisible();
      await expect(page.getByRole('button', { name: /Start Quiz/i })).toBeVisible();
    });
  }
});
