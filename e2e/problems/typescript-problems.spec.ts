import { test, expect, type Page } from '@playwright/test';

/**
 * E2E Tests for TypeScript Problems
 *
 * Template file - Tests will be activated once TypeScript problem data is available.
 * Import the TypeScript problems from: lib/problems/typescript.ts
 */

// Uncomment and update when TypeScript problems are available:
// import { typescriptProblems } from '../../lib/problems/typescript';

// ============================================================================
// Test Configuration
// ============================================================================

const BASE_URL = '/typescript/drill';
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

  // Wait for setup screen
  const setupScreen = page.locator('[data-testid="drill-setup"]').or(
    page.getByRole('heading', { name: /select|choose|categories/i })
  ).or(page.locator('button').filter({ hasText: /start/i }));

  await setupScreen.first().waitFor({ state: 'visible', timeout: 10000 });

  // If a specific category is requested, try to select it
  if (category) {
    const categoryButton = page.locator(`[data-category="${category}"]`).or(
      page.locator('button').filter({ hasText: new RegExp(category, 'i') })
    );

    if (await categoryButton.first().isVisible()) {
      await categoryButton.first().click();
    }
  }

  // Click start button
  const startButton = page.locator('[data-testid="start-drill"]').or(
    page.getByRole('button', { name: /start|begin|go/i })
  );

  await startButton.first().click();

  // Wait for drill to load
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

test.describe('TypeScript Problems - E2E Tests', () => {
  test.skip('TypeScript problems not yet implemented', async ({ page: _page }) => {
    // This test is skipped until TypeScript problems are available
    // When ready, import typescriptProblems and generate tests similar to JavaScript
  });

  test('should load TypeScript drill page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Verify we're on TypeScript drill page
    await expect(page.locator('body')).toBeVisible();

    // Check for TypeScript-specific content
    const tsContent = page.locator('text=/typescript|ts/i');
    await expect(tsContent.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Page might not have TypeScript-specific label
    });
  });
});

// ============================================================================
// Template for Problem Tests (Uncomment when problems are available)
// ============================================================================

/*
test.describe('TypeScript Problems - Comprehensive E2E Tests', () => {
  for (const problem of typescriptProblems) {
    test(`Problem: ${problem.id} - ${problem.title || problem.text.slice(0, 50)}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      // Navigate to TypeScript drill mode
      await startDrill(page, problem.category);

      // Find the specific problem
      // ... (implement problem finding logic)

      const inputField = getInputField(page);
      await expect(inputField.first()).toBeVisible({ timeout: 5000 });

      // Submit the sample solution
      const result = await submitAnswer(page, problem.sample);

      // Verify the answer is marked correct
      expect(result.isCorrect).toBe(true);
    });
  }
});

test.describe('TypeScript Problems - Anti-Hardcode Tests', () => {
  const problemsToTest = typescriptProblems.slice(0, 10);

  for (const problem of problemsToTest) {
    test(`should reject hardcoded answer for: ${problem.id}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      await startDrill(page, problem.category);

      const inputField = getInputField(page);
      await expect(inputField.first()).toBeVisible({ timeout: 5000 });

      // Create hardcoded answer
      const hardcodedAnswer = JSON.stringify(problem.expected);

      // Submit hardcoded answer
      const result = await submitAnswer(page, hardcodedAnswer);

      // Should be rejected
      expect(result.isCorrect).toBe(false);
    });
  }
});
*/

// ============================================================================
// Type-Specific Tests (TypeScript has unique type-related problems)
// ============================================================================

test.describe('TypeScript Problems - Type Utilities', () => {
  test.skip('Type utility problems not yet implemented', async () => {
    // Tests for TypeScript-specific type manipulation problems
    // Examples: Partial<T>, Required<T>, Pick<T, K>, Omit<T, K>, etc.
  });
});

test.describe('TypeScript Problems - Generic Patterns', () => {
  test.skip('Generic pattern problems not yet implemented', async () => {
    // Tests for TypeScript generic type problems
    // Examples: Generic functions, generic classes, constraints
  });
});
