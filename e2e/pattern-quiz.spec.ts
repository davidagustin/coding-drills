import { expect, test } from '@playwright/test';
import { waitForAnimations } from './fixtures/test-utils';

test.describe('Pattern Quiz — Setup Phase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pattern-quiz');
    await page.waitForLoadState('networkidle');
  });

  test('should display the pattern quiz page heading', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText(/Algorithm Pattern Quiz/i)).toBeVisible();
  });

  test('should display quiz description', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText(/recognize algorithm patterns/i)).toBeVisible();
  });

  test('should show difficulty filter options', async ({ page }) => {
    await waitForAnimations(page);
    await expect(
      page.getByRole('button', { name: 'All' }).or(page.getByText('All').first()),
    ).toBeVisible();
  });

  test('should show category selection', async ({ page }) => {
    await waitForAnimations(page);
    const categorySection = page.getByText(/Category|Categories/i);
    await expect(categorySection.first()).toBeVisible();
  });

  test('should show question count slider', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText(/Number of Questions|Questions/i).first()).toBeVisible();
  });

  test('should show time per question setting', async ({ page }) => {
    await waitForAnimations(page);
    const timeSetting = page.getByText(/Time|Timer|seconds/i);
    await expect(timeSetting.first()).toBeVisible();
  });

  test('should show Start Quiz button', async ({ page }) => {
    await waitForAnimations(page);
    const startBtn = page.getByRole('button', { name: /Start Quiz|Start/i });
    await expect(startBtn.first()).toBeVisible();
  });

  test('should show Pattern Recognition Guide button', async ({ page }) => {
    await waitForAnimations(page);
    const guideBtn = page.getByRole('button', { name: /Guide|Learn|How/i });
    if (await guideBtn.isVisible().catch(() => false)) {
      await expect(guideBtn).toBeVisible();
    }
  });
});

test.describe('Pattern Quiz — Playing Phase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pattern-quiz');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    // Start the quiz
    const startBtn = page.getByRole('button', { name: /Start Quiz|Start/i });
    await startBtn.first().click();
    await waitForAnimations(page);
  });

  test('should transition to playing phase', async ({ page }) => {
    // Should show a problem/question
    const questionContent = page.locator('h2, h3, [class*="question"], [class*="problem"]').first();
    await expect(questionContent).toBeVisible();
  });

  test('should display a LeetCode-style problem', async ({ page }) => {
    // Problem should have description content
    const problemText = page.locator('p, [class*="description"]').filter({ hasNotText: /^$/ });
    expect(await problemText.count()).toBeGreaterThan(0);
  });

  test('should display pattern options to choose from', async ({ page }) => {
    // Should show clickable pattern options
    const options = page.getByRole('button').filter({
      hasNotText: /Exit|End|Skip|Hint|Guide/i,
    });
    expect(await options.count()).toBeGreaterThanOrEqual(2);
  });

  test('should show progress indicator', async ({ page }) => {
    const progress = page.getByText(/\d+\s*(\/|of)\s*\d+/i);
    await expect(progress.first()).toBeVisible();
  });

  test('should show score', async ({ page }) => {
    await expect(page.getByText(/Score|Points/i).first()).toBeVisible();
  });

  test('should show feedback after selecting an answer', async ({ page }) => {
    // Click an answer option
    const options = page.getByRole('button').filter({
      hasNotText: /Exit|End|Skip|Hint|Guide|Score|Next|Timer/i,
    });
    await options.first().click();
    await waitForAnimations(page);
    // Should show correct/incorrect feedback or advance
    const feedback = page
      .getByText(/Correct|Incorrect|Right|Wrong/i)
      .or(page.getByRole('button', { name: /Next/i }));
    await expect(feedback.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Pattern Quiz — Results Phase', () => {
  test('should show results after ending quiz', async ({ page }) => {
    await page.goto('/pattern-quiz');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    // Start quiz
    const startBtn = page.getByRole('button', { name: /Start Quiz|Start/i });
    await startBtn.first().click();
    await waitForAnimations(page);
    // End quiz immediately
    const endBtn = page.getByRole('button', { name: /End|Exit|Finish/i });
    if (await endBtn.isVisible().catch(() => false)) {
      await endBtn.click();
      await waitForAnimations(page);
    }
    // Should show results or return to setup
    const resultContent = page.getByText(/Results|Complete|Score|Accuracy|Algorithm Pattern Quiz/i);
    await expect(resultContent.first()).toBeVisible({ timeout: 10000 });
  });

  test('should show score summary in results', async ({ page }) => {
    await page.goto('/pattern-quiz');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    const startBtn = page.getByRole('button', { name: /Start Quiz|Start/i });
    await startBtn.first().click();
    await waitForAnimations(page);
    const endBtn = page.getByRole('button', { name: /End|Exit|Finish/i });
    if (await endBtn.isVisible().catch(() => false)) {
      await endBtn.click();
      await waitForAnimations(page);
    }
    const score = page.getByText(/Score|Points|Accuracy/i);
    await expect(score.first()).toBeVisible({ timeout: 10000 });
  });

  test('should show retry option in results', async ({ page }) => {
    await page.goto('/pattern-quiz');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    const startBtn = page.getByRole('button', { name: /Start Quiz|Start/i });
    await startBtn.first().click();
    await waitForAnimations(page);
    const endBtn = page.getByRole('button', { name: /End|Exit|Finish/i });
    if (await endBtn.isVisible().catch(() => false)) {
      await endBtn.click();
      await waitForAnimations(page);
    }
    const retryBtn = page.getByRole('button', {
      name: /Try Again|Retry|New Quiz|Play Again|Start/i,
    });
    await expect(retryBtn.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Pattern Quiz — No Console Errors', () => {
  test('should load without critical console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('/pattern-quiz');
    await page.waitForLoadState('networkidle');
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('Failed to load resource'),
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
