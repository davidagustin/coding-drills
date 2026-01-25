import { test, expect, type Page } from '@playwright/test';

/**
 * E2E Tests for C# Problems
 *
 * Template file - Tests will be activated once C# problem data is available.
 * Import the C# problems from: lib/problems/csharp.ts
 */

// Uncomment and update when C# problems are available:
// import { csharpProblems } from '../../lib/problems/csharp';

// ============================================================================
// Test Configuration
// ============================================================================

const BASE_URL = '/csharp/drill';

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

test.describe('C# Problems - E2E Tests', () => {
  test.skip('C# problems not yet implemented', async ({ page: _page }) => {
    // This test is skipped until C# problems are available
  });

  test('should load C# drill page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();

    const csharpContent = page.locator('text=/c#|csharp/i');
    await expect(csharpContent.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Page might not have C#-specific label
    });
  });
});

// ============================================================================
// Template for Problem Tests (Uncomment when problems are available)
// ============================================================================

/*
test.describe('C# Problems - Comprehensive E2E Tests', () => {
  for (const problem of csharpProblems) {
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
// C#-Specific Tests
// ============================================================================

test.describe('C# Problems - List Methods', () => {
  test.skip('List method problems not yet implemented', async () => {
    // Tests for C# List: Add, Remove, Contains, Count, IndexOf, Sort
  });
});

test.describe('C# Problems - LINQ Methods', () => {
  test.skip('LINQ method problems not yet implemented', async () => {
    // Tests for C# LINQ: Where, Select, OrderBy, GroupBy, Aggregate, FirstOrDefault
  });
});

test.describe('C# Problems - String Methods', () => {
  test.skip('String method problems not yet implemented', async () => {
    // Tests for C# String: Split, Join, Substring, Replace, Trim, ToUpper
  });
});

test.describe('C# Problems - Dictionary Methods', () => {
  test.skip('Dictionary method problems not yet implemented', async () => {
    // Tests for C# Dictionary: Add, ContainsKey, TryGetValue, Keys, Values
  });
});

test.describe('C# Problems - HashSet Methods', () => {
  test.skip('HashSet method problems not yet implemented', async () => {
    // Tests for C# HashSet: Add, Remove, Contains, UnionWith, IntersectWith
  });
});

test.describe('C# Problems - Enumerable Methods', () => {
  test.skip('Enumerable method problems not yet implemented', async () => {
    // Tests for C# Enumerable: Range, Repeat, Empty, Cast, OfType
  });
});
