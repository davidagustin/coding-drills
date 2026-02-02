import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('Frontend Drill Mode — Setup Phase', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToDrill('native-js');
  });

  test('should display Drill Mode heading', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Drill Mode')).toBeVisible();
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Frontend Drills')).toBeVisible();
    await expect(page.getByText('Native JavaScript')).toBeVisible();
  });

  test('should show categories section', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Categories')).toBeVisible();
  });

  test('should show Select All and Clear category controls', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Select All')).toBeVisible();
    await expect(page.getByText('Clear')).toBeVisible();
  });

  test('should show Number of Questions section with slider', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Number of Questions')).toBeVisible();
    await expect(page.getByText(/questions available/i)).toBeVisible();
  });

  test('should show Difficulty section with 4 options', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText('Difficulty').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Easy' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Medium' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hard' })).toBeVisible();
  });

  test('should show Start Drilling button', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByRole('button', { name: /Start Drilling/i })).toBeVisible();
  });

  test('should show Exit link back to framework hub', async ({ page }) => {
    await waitForAnimations(page);
    const exitLink = page.getByText('Exit');
    await expect(exitLink).toBeVisible();
  });

  test('should toggle category selection', async ({ page }) => {
    await waitForAnimations(page);
    // Click "Select All" to select all categories
    await page.getByText('Select All').click();
    // The selected count should appear
    await expect(page.getByText(/selected/i)).toBeVisible();
    // Click "Clear" to deselect all
    await page.getByText('Clear').click();
    await expect(page.getByText(/No categories selected/i)).toBeVisible();
  });

  test('should filter difficulty when clicking difficulty buttons', async ({ page }) => {
    await waitForAnimations(page);
    await page.getByRole('button', { name: 'Easy' }).click();
    // The Easy button should now be highlighted (blue)
    await expect(page.getByRole('button', { name: 'Easy' })).toHaveClass(/bg-blue-500/);
  });
});

test.describe('Frontend Drill Mode — Drilling Phase', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToDrill('native-js');
    await waitForAnimations(page);
    // Start the drill with defaults
    await utils.startDrill();
    await waitForAnimations(page);
  });

  test('should transition to drilling phase', async ({ page }) => {
    // Should see progress indicator
    await expect(page.getByText('Progress')).toBeVisible();
    await expect(page.getByText('Score')).toBeVisible();
    await expect(page.getByText('Streak')).toBeVisible();
  });

  test('should display current problem title', async ({ page }) => {
    // Problem card should have a title
    const problemTitle = page.locator('h2').first();
    await expect(problemTitle).toBeVisible();
  });

  test('should show setup code section', async ({ page }) => {
    await expect(page.getByText('Setup Code')).toBeVisible();
  });

  test('should show expected output section', async ({ page }) => {
    await expect(page.getByText('Expected Output')).toBeVisible();
  });

  test('should show Your Answer section with editor', async ({ page }) => {
    await expect(page.getByText('Your Answer')).toBeVisible();
    // Monaco editor or code editor should be present
    const editor = page.locator('.monaco-editor');
    await expect(editor).toBeVisible({ timeout: 15000 });
  });

  test('should show Submit, Skip, and End buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^End$/i })).toBeVisible();
  });

  test('should skip to next question when clicking Skip', async ({ page }) => {
    // Note the initial progress
    const progressBefore = await page
      .locator('text=Progress')
      .locator('..')
      .locator('div')
      .first()
      .textContent();
    await utils.skipQuestion();
    await waitForAnimations(page);
    // Progress should have advanced (or be in results if only 1 question)
    const isResults = await page
      .getByText(/Complete!/i)
      .isVisible()
      .catch(() => false);
    if (!isResults) {
      const progressAfter = await page
        .locator('text=Progress')
        .locator('..')
        .locator('div')
        .first()
        .textContent();
      expect(progressAfter).not.toBe(progressBefore);
    }
  });

  test('should end drill and show results when clicking End', async ({ page }) => {
    await utils.endDrill();
    await waitForAnimations(page);
    await expect(page.getByText(/Drill Complete!/i)).toBeVisible();
  });

  test('should show difficulty and category badges on problem', async ({ page }) => {
    // Problems should display difficulty badge
    const difficultyBadge = page.locator(
      'span:has-text("easy"), span:has-text("medium"), span:has-text("hard")',
    );
    await expect(difficultyBadge.first()).toBeVisible();
  });
});

test.describe('Frontend Drill Mode — Results Phase', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    await utils.goToDrill('native-js');
    await waitForAnimations(page);
    // Start the drill and immediately skip through all questions to get to results
    await utils.startDrill();
    await waitForAnimations(page);
    // End the drill immediately
    await utils.endDrill();
    await waitForAnimations(page);
  });

  test('should display Drill Complete heading', async ({ page }) => {
    await expect(page.getByText('Drill Complete!')).toBeVisible();
  });

  test('should show Total Points', async ({ page }) => {
    await expect(page.getByText('Total Points')).toBeVisible();
  });

  test('should show stats grid with Correct, Accuracy, Time, Max Streak', async ({ page }) => {
    await expect(page.getByText('Correct')).toBeVisible();
    await expect(page.getByText('Accuracy')).toBeVisible();
    await expect(page.getByText('Time')).toBeVisible();
    await expect(page.getByText('Max Streak')).toBeVisible();
  });

  test('should show Breakdown section', async ({ page }) => {
    await expect(page.getByText('Breakdown')).toBeVisible();
  });

  test('should show retry options', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Try Again/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /New Drill/i })).toBeVisible();
  });

  test('should show Back to framework button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Back to/i })).toBeVisible();
  });

  test('should restart drill with same questions when clicking Try Again', async ({ page }) => {
    await page.getByRole('button', { name: /Try Again/i }).click();
    await waitForAnimations(page);
    // Should be back in drilling phase
    await expect(page.getByText('Progress')).toBeVisible();
  });
});

test.describe('Frontend Drill Mode — Cross-framework smoke', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} drill setup loads`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToDrill(fw);
      await waitForAnimations(page);
      await expect(page.getByText('Drill Mode')).toBeVisible();
      await expect(page.getByRole('button', { name: /Start Drilling/i })).toBeVisible();
    });
  }
});
