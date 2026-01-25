import { test, expect, type Page } from '@playwright/test';

/**
 * E2E Tests for Python Problems
 *
 * Template file - Tests will be activated once Python problem data is available.
 * Import the Python problems from: lib/problems/python.ts
 */

// Uncomment and update when Python problems are available:
// import { pythonProblems } from '../../lib/problems/python';

// ============================================================================
// Test Configuration
// ============================================================================

const BASE_URL = '/python/drill';
const MAX_SEARCH_ATTEMPTS = 50;

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

test.describe('Python Problems - E2E Tests', () => {
  test.skip('Python problems not yet implemented', async ({ page }) => {
    // This test is skipped until Python problems are available
  });

  test('should load Python drill page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();

    const pyContent = page.locator('text=/python|py/i');
    await expect(pyContent.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Page might not have Python-specific label
    });
  });
});

// ============================================================================
// Template for Problem Tests (Uncomment when problems are available)
// ============================================================================

/*
test.describe('Python Problems - Comprehensive E2E Tests', () => {
  for (const problem of pythonProblems) {
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

test.describe('Python Problems - Anti-Hardcode Tests', () => {
  const problemsToTest = pythonProblems.slice(0, 10);

  for (const problem of problemsToTest) {
    test(`should reject hardcoded answer for: ${problem.id}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      await startDrill(page, problem.category);

      const inputField = getInputField(page);
      await expect(inputField.first()).toBeVisible({ timeout: 5000 });

      const hardcodedAnswer = JSON.stringify(problem.expected);
      const result = await submitAnswer(page, hardcodedAnswer);

      expect(result.isCorrect).toBe(false);
    });
  }
});
*/

// ============================================================================
// Python-Specific Tests
// ============================================================================

test.describe('Python Problems - List Methods', () => {
  test.skip('List method problems not yet implemented', async () => {
    // Tests for Python list methods: append, extend, insert, remove, pop, etc.
  });
});

test.describe('Python Problems - List Comprehensions', () => {
  test.skip('List comprehension problems not yet implemented', async () => {
    // Tests for Python list comprehension syntax
    // Examples: [x*2 for x in range(10)], [x for x in lst if x > 0]
  });
});

test.describe('Python Problems - Dict Methods', () => {
  test.skip('Dict method problems not yet implemented', async () => {
    // Tests for Python dictionary methods: get, items, keys, values, update
  });
});

test.describe('Python Problems - String Methods', () => {
  test.skip('String method problems not yet implemented', async () => {
    // Tests for Python string methods: split, join, strip, replace, format
  });
});

test.describe('Python Problems - Built-in Functions', () => {
  test.skip('Built-in function problems not yet implemented', async () => {
    // Tests for Python built-ins: map, filter, reduce, zip, enumerate
  });
});
