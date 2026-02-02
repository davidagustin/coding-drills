import { expect, test } from '@playwright/test';
import { waitForAnimations } from './fixtures/test-utils';

/**
 * Interview page uses WebGPU / WebLLM which is not available in headless CI.
 * These are smoke tests only — verify the page loads and setup UI renders.
 */
test.describe('Interview Page — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');
  });

  test('should load the interview page', async ({ page }) => {
    await waitForAnimations(page);
    // Page should render without crashing
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should display interview type selection', async ({ page }) => {
    await waitForAnimations(page);
    // Should show Algorithm and/or System Design options
    const interviewTypes = page.getByText(/Algorithm|System Design/i);
    await expect(interviewTypes.first()).toBeVisible();
  });

  test('should display difficulty selection', async ({ page }) => {
    await waitForAnimations(page);
    const difficultyOptions = page.getByText(/Easy|Medium|Hard/i);
    await expect(difficultyOptions.first()).toBeVisible();
  });

  test('should display interview mode options', async ({ page }) => {
    await waitForAnimations(page);
    // Should show Solve Problem and/or Guided Breakdown modes
    const modeOptions = page.getByText(/Solve|Guided|Breakdown/i);
    await expect(modeOptions.first()).toBeVisible();
  });

  test('should not have critical console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');
    // Filter out expected errors (WebGPU not available in headless, favicon)
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('Failed to load resource') &&
        !e.includes('WebGPU') &&
        !e.includes('webgpu') &&
        !e.includes('navigator.gpu'),
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
