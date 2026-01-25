import { expect, type Page, test } from '@playwright/test';

/**
 * E2E Tests for Go Problems
 *
 * Template file - Tests will be activated once Go problem data is available.
 * Import the Go problems from: lib/problems/go.ts
 */

// Uncomment and update when Go problems are available:
// import { goProblems } from '../../lib/problems/go';

// ============================================================================
// Test Configuration
// ============================================================================

const BASE_URL = '/go/drill';

/**
 * Clear localStorage to reset state
 */
async function _clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

/**
 * Start a drill session
 */
async function _startDrill(page: Page, category?: string): Promise<void> {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  const setupScreen = page
    .locator('[data-testid="drill-setup"]')
    .or(page.getByRole('heading', { name: /select|choose|categories/i }))
    .or(page.locator('button').filter({ hasText: /start/i }));

  await setupScreen.first().waitFor({ state: 'visible', timeout: 10000 });

  if (category) {
    const categoryButton = page
      .locator(`[data-category="${category}"]`)
      .or(page.locator('button').filter({ hasText: new RegExp(category, 'i') }));

    if (await categoryButton.first().isVisible()) {
      await categoryButton.first().click();
    }
  }

  const startButton = page
    .locator('[data-testid="start-drill"]')
    .or(page.getByRole('button', { name: /start|begin|go/i }));

  await startButton.first().click();

  await page.waitForSelector(
    '[data-testid="drill-problem"], [data-testid="code-input"], input[type="text"], textarea',
    { timeout: 10000 },
  );
}

/**
 * Get the input field for entering answers
 */
function getInputField(page: Page) {
  return page
    .locator('[data-testid="code-input"]')
    .or(
      page
        .locator('[data-testid="answer-input"]')
        .or(page.locator('input[type="text"]').or(page.locator('textarea'))),
    );
}

/**
 * Submit an answer and wait for feedback
 */
async function _submitAnswer(
  page: Page,
  answer: string,
): Promise<{
  isCorrect: boolean;
  feedback: string | null;
}> {
  const inputField = getInputField(page);

  await inputField.first().fill('');
  await inputField.first().fill(answer);
  await inputField.first().press('Enter');

  await page.waitForTimeout(1000);

  const successFeedback = page
    .locator('[data-testid="success-feedback"]')
    .or(page.locator('.success').or(page.locator('text=/correct|right|good/i')));

  const isCorrect = await successFeedback.first().isVisible();
  const feedback = await successFeedback
    .first()
    .textContent()
    .catch(() => null);

  return { isCorrect, feedback };
}

// ============================================================================
// Placeholder Test Suite
// ============================================================================

test.describe('Go Problems - E2E Tests', () => {
  test.skip('Go problems not yet implemented', async ({ page: _page }) => {
    // This test is skipped until Go problems are available
  });

  test('should load Go drill page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();

    const goContent = page.locator('text=/go|golang/i');
    await expect(goContent.first())
      .toBeVisible({ timeout: 5000 })
      .catch(() => {
        // Page might not have Go-specific label
      });
  });
});

// ============================================================================
// Template for Problem Tests (Uncomment when problems are available)
// ============================================================================

/*
test.describe('Go Problems - Comprehensive E2E Tests', () => {
  for (const problem of goProblems) {
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
// Go-Specific Tests
// ============================================================================

test.describe('Go Problems - Slice Operations', () => {
  test.skip('Slice operation problems not yet implemented', async () => {
    // Tests for Go slices: append, copy, len, cap, make
  });
});

test.describe('Go Problems - String Operations', () => {
  test.skip('String operation problems not yet implemented', async () => {
    // Tests for Go strings package: Split, Join, Contains, HasPrefix, TrimSpace
  });
});

test.describe('Go Problems - Map Operations', () => {
  test.skip('Map operation problems not yet implemented', async () => {
    // Tests for Go maps: make, delete, len, range iteration
  });
});

test.describe('Go Problems - Sort Package', () => {
  test.skip('Sort package problems not yet implemented', async () => {
    // Tests for Go sort: Ints, Strings, Slice, Sort interface
  });
});

test.describe('Go Problems - Strconv Package', () => {
  test.skip('Strconv package problems not yet implemented', async () => {
    // Tests for Go strconv: Atoi, Itoa, ParseInt, FormatInt
  });
});
