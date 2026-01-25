import { expect, type Page, test } from '@playwright/test';

/**
 * E2E Tests for C Problems
 *
 * Template file - Tests will be activated once C problem data is available.
 * Import the C problems from: lib/problems/c.ts
 */

// Uncomment and update when C problems are available:
// import { cProblems } from '../../lib/problems/c';

// ============================================================================
// Test Configuration
// ============================================================================

const BASE_URL = '/c/drill';

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

test.describe('C Problems - E2E Tests', () => {
  test.skip('C problems not yet implemented', async ({ page: _page }) => {
    // This test is skipped until C problems are available
  });

  test('should load C drill page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();

    // C content might be harder to identify - just check page loaded
  });
});

// ============================================================================
// Template for Problem Tests (Uncomment when problems are available)
// ============================================================================

/*
test.describe('C Problems - Comprehensive E2E Tests', () => {
  for (const problem of cProblems) {
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
// C-Specific Tests
// ============================================================================

test.describe('C Problems - String Functions', () => {
  test.skip('String function problems not yet implemented', async () => {
    // Tests for C strings: strlen, strcpy, strcat, strcmp, strchr, strstr
  });
});

test.describe('C Problems - Memory Functions', () => {
  test.skip('Memory function problems not yet implemented', async () => {
    // Tests for C memory: malloc, calloc, realloc, free, memcpy, memset
  });
});

test.describe('C Problems - Math Functions', () => {
  test.skip('Math function problems not yet implemented', async () => {
    // Tests for C math: abs, pow, sqrt, floor, ceil, round
  });
});

test.describe('C Problems - Stdlib Functions', () => {
  test.skip('Stdlib function problems not yet implemented', async () => {
    // Tests for C stdlib: atoi, atof, rand, qsort, bsearch
  });
});

test.describe('C Problems - Stdio Functions', () => {
  test.skip('Stdio function problems not yet implemented', async () => {
    // Tests for C stdio: printf, scanf, sprintf, sscanf, fgets
  });
});

test.describe('C Problems - Ctype Functions', () => {
  test.skip('Ctype function problems not yet implemented', async () => {
    // Tests for C ctype: isalpha, isdigit, isspace, toupper, tolower
  });
});

test.describe('C Problems - Array Operations', () => {
  test.skip('Array operation problems not yet implemented', async () => {
    // Tests for C array operations: indexing, iteration, pointer arithmetic
  });
});
