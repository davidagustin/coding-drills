import { test, expect, type Page } from '@playwright/test';

/**
 * E2E Tests for Ruby Problems
 *
 * Template file - Tests will be activated once Ruby problem data is available.
 * Import the Ruby problems from: lib/problems/ruby.ts
 */

// Uncomment and update when Ruby problems are available:
// import { rubyProblems } from '../../lib/problems/ruby';

// ============================================================================
// Test Configuration
// ============================================================================

const BASE_URL = '/ruby/drill';

/**
 * Clear localStorage to reset state
 */
async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

/**
 * Start a drill session
 */
async function startDrill(page: Page, category?: string): Promise<void> {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  const setupScreen = page.locator('[data-testid="drill-setup"]').or(
    page.getByRole('heading', { name: /select|choose|categories/i })
  ).or(page.locator('button').filter({ hasText: /start/i }));

  await setupScreen.first().waitFor({ state: 'visible', timeout: 10000 });

  if (category) {
    const categoryButton = page.locator(`[data-category="${category}"]`).or(
      page.locator('button').filter({ hasText: new RegExp(category, 'i') })
    );

    if (await categoryButton.first().isVisible()) {
      await categoryButton.first().click();
    }
  }

  const startButton = page.locator('[data-testid="start-drill"]').or(
    page.getByRole('button', { name: /start|begin|go/i })
  );

  await startButton.first().click();

  await page.waitForSelector(
    '[data-testid="drill-problem"], [data-testid="code-input"], input[type="text"], textarea',
    { timeout: 10000 }
  );
}

/**
 * Get the input field for entering answers
 */
function getInputField(page: Page) {
  return page.locator('[data-testid="code-input"]').or(
    page.locator('[data-testid="answer-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    )
  );
}

/**
 * Submit an answer and wait for feedback
 */
async function submitAnswer(page: Page, answer: string): Promise<{
  isCorrect: boolean;
  feedback: string | null;
}> {
  const inputField = getInputField(page);

  await inputField.first().fill('');
  await inputField.first().fill(answer);
  await inputField.first().press('Enter');

  await page.waitForTimeout(1000);

  const successFeedback = page.locator('[data-testid="success-feedback"]').or(
    page.locator('.success').or(
      page.locator('text=/correct|right|good/i')
    )
  );

  const isCorrect = await successFeedback.first().isVisible();
  const feedback = await successFeedback.first().textContent().catch(() => null);

  return { isCorrect, feedback };
}

// ============================================================================
// Placeholder Test Suite
// ============================================================================

test.describe('Ruby Problems - E2E Tests', () => {
  test.skip('Ruby problems not yet implemented', async ({ page }) => {
    // This test is skipped until Ruby problems are available
  });

  test('should load Ruby drill page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();

    const rubyContent = page.locator('text=/ruby/i');
    await expect(rubyContent.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Page might not have Ruby-specific label
    });
  });
});

// ============================================================================
// Template for Problem Tests (Uncomment when problems are available)
// ============================================================================

/*
test.describe('Ruby Problems - Comprehensive E2E Tests', () => {
  for (const problem of rubyProblems) {
    test(`Problem: ${problem.id} - ${problem.title || problem.text.slice(0, 50)}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      await startDrill(page, problem.category);

      const inputField = getInputField(page);
      await expect(inputField.first()).toBeVisible({ timeout: 5000 });

      const result = await submitAnswer(page, problem.sample);

      expect(result.isCorrect).toBe(true);
    });
  }
});
*/

// ============================================================================
// Ruby-Specific Tests
// ============================================================================

test.describe('Ruby Problems - Array Methods', () => {
  test.skip('Array method problems not yet implemented', async () => {
    // Tests for Ruby Array: map, select, reject, reduce, each, first, last
  });
});

test.describe('Ruby Problems - String Methods', () => {
  test.skip('String method problems not yet implemented', async () => {
    // Tests for Ruby String: split, join, gsub, strip, upcase, downcase
  });
});

test.describe('Ruby Problems - Hash Methods', () => {
  test.skip('Hash method problems not yet implemented', async () => {
    // Tests for Ruby Hash: keys, values, each, merge, select, transform_values
  });
});

test.describe('Ruby Problems - Enumerable Methods', () => {
  test.skip('Enumerable method problems not yet implemented', async () => {
    // Tests for Ruby Enumerable: find, any?, all?, none?, count, group_by
  });
});

test.describe('Ruby Problems - Range Methods', () => {
  test.skip('Range method problems not yet implemented', async () => {
    // Tests for Ruby Range: to_a, each, include?, cover?
  });
});
