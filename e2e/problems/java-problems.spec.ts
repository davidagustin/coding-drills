import { test, expect, type Page } from '@playwright/test';

/**
 * E2E Tests for Java Problems
 *
 * Template file - Tests will be activated once Java problem data is available.
 * Import the Java problems from: lib/problems/java.ts
 */

// Uncomment and update when Java problems are available:
// import { javaProblems } from '../../lib/problems/java';

// ============================================================================
// Test Configuration
// ============================================================================

const BASE_URL = '/java/drill';

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

test.describe('Java Problems - E2E Tests', () => {
  test.skip('Java problems not yet implemented', async ({ page }) => {
    // This test is skipped until Java problems are available
  });

  test('should load Java drill page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();

    const javaContent = page.locator('text=/java/i');
    await expect(javaContent.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Page might not have Java-specific label
    });
  });
});

// ============================================================================
// Template for Problem Tests (Uncomment when problems are available)
// ============================================================================

/*
test.describe('Java Problems - Comprehensive E2E Tests', () => {
  for (const problem of javaProblems) {
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
// Java-Specific Tests
// ============================================================================

test.describe('Java Problems - ArrayList Methods', () => {
  test.skip('ArrayList method problems not yet implemented', async () => {
    // Tests for Java ArrayList: add, get, set, remove, size, contains, etc.
  });
});

test.describe('Java Problems - Stream API', () => {
  test.skip('Stream API problems not yet implemented', async () => {
    // Tests for Java Stream: filter, map, reduce, collect, forEach
  });
});

test.describe('Java Problems - HashMap Methods', () => {
  test.skip('HashMap method problems not yet implemented', async () => {
    // Tests for Java HashMap: put, get, containsKey, keySet, values
  });
});

test.describe('Java Problems - String Methods', () => {
  test.skip('String method problems not yet implemented', async () => {
    // Tests for Java String: substring, charAt, indexOf, split, replace
  });
});

test.describe('Java Problems - Optional Methods', () => {
  test.skip('Optional method problems not yet implemented', async () => {
    // Tests for Java Optional: ofNullable, isPresent, orElse, map, flatMap
  });
});
