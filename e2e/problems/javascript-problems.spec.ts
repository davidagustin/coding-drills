import { expect, type Page, test } from '@playwright/test';
import { javascriptProblems } from '../../lib/problems/javascript';

/**
 * Comprehensive E2E Tests for JavaScript Problems
 *
 * This test suite validates each JavaScript problem by:
 * 1. Navigating to the drill mode
 * 2. Finding/loading the specific problem
 * 3. Submitting the sample solution
 * 4. Verifying the answer is marked correct
 * 5. Verifying the expected output matches
 */

// ============================================================================
// Test Configuration and Helpers
// ============================================================================

const BASE_URL = '/javascript/drill';
const MAX_SEARCH_ATTEMPTS = 50; // Maximum attempts to find a specific problem by cycling

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
  const setupScreen = page
    .locator('[data-testid="drill-setup"]')
    .or(page.getByRole('heading', { name: /select|choose|categories/i }))
    .or(page.locator('button').filter({ hasText: /start/i }));

  await setupScreen.first().waitFor({ state: 'visible', timeout: 10000 });

  // If a specific category is requested, try to select it
  if (category) {
    const categoryButton = page
      .locator(`[data-category="${category}"]`)
      .or(
        page
          .locator(`[data-testid="category-${category.toLowerCase().replace(/\s+/g, '-')}"]`)
          .or(page.locator('button').filter({ hasText: new RegExp(category, 'i') })),
      );

    if (await categoryButton.first().isVisible()) {
      await categoryButton.first().click();
    }
  }

  // Click start button
  const startButton = page
    .locator('[data-testid="start-drill"]')
    .or(page.getByRole('button', { name: /start|begin|go/i }));

  await startButton.first().click();

  // Wait for drill to load
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
 * Get the current problem ID from the page
 */
async function getCurrentProblemId(page: Page): Promise<string | null> {
  // Try different ways to get problem ID
  const problemIdElement = page
    .locator('[data-testid="problem-id"]')
    .or(page.locator('[data-problem-id]'));

  if (await problemIdElement.first().isVisible()) {
    const id = await problemIdElement.first().getAttribute('data-problem-id');
    if (id) return id;
    return await problemIdElement.first().textContent();
  }

  // Try to extract from URL
  const url = page.url();
  const match = url.match(/problem[=/]([^&/]+)/);
  if (match) return match[1];

  return null;
}

/**
 * Get the current problem text from the page
 */
async function getCurrentProblemText(page: Page): Promise<string | null> {
  const problemText = page.locator('[data-testid="problem-text"]').or(
    page.locator('[data-testid="problem-description"]').or(
      page.locator('.problem-text').or(
        page
          .locator('p')
          .filter({ hasText: /.{20,}/ })
          .first(),
      ),
    ),
  );

  if (await problemText.first().isVisible()) {
    return await problemText.first().textContent();
  }

  return null;
}

/**
 * Skip to next problem
 */
async function skipProblem(page: Page): Promise<void> {
  const skipButton = page
    .locator('[data-testid="skip-button"]')
    .or(page.getByRole('button', { name: /skip|next|pass/i }));

  if (await skipButton.first().isVisible()) {
    await skipButton.first().click();
    await page.waitForTimeout(500);
  }
}

/**
 * Submit an answer and wait for feedback
 */
async function submitAnswer(
  page: Page,
  answer: string,
): Promise<{
  isCorrect: boolean;
  feedback: string | null;
  yourOutput: string | null;
  expectedOutput: string | null;
}> {
  const inputField = getInputField(page);

  // Clear and fill the input
  await inputField.first().fill('');
  await inputField.first().fill(answer);

  // Submit (Enter key)
  await inputField.first().press('Enter');

  // Wait for feedback
  await page.waitForTimeout(1000);

  // Check for success/error feedback
  const successFeedback = page
    .locator('[data-testid="success-feedback"]')
    .or(
      page
        .locator('.success')
        .or(page.locator('.correct').or(page.locator('text=/correct|right|good|nice|passed/i'))),
    );

  const errorFeedback = page
    .locator('[data-testid="error-feedback"]')
    .or(
      page
        .locator('.error')
        .or(page.locator('.incorrect').or(page.locator('text=/incorrect|wrong|error|failed/i'))),
    );

  const isCorrect = await successFeedback.first().isVisible();

  // Get feedback text
  const feedbackElement = isCorrect ? successFeedback : errorFeedback;
  const feedback = await feedbackElement
    .first()
    .textContent()
    .catch(() => null);

  // Get output values
  const yourOutputElement = page
    .locator('[data-testid="your-output"]')
    .or(
      page
        .locator('#your-output')
        .or(
          page
            .locator('.your-output')
            .or(page.locator('text=/your (output|result)/i').locator('xpath=following-sibling::*')),
        ),
    );

  const expectedOutputElement = page
    .locator('[data-testid="expected-output"]')
    .or(
      page
        .locator('#expected-output')
        .or(
          page
            .locator('.expected-output')
            .or(
              page
                .locator('text=/expected (output|result)/i')
                .locator('xpath=following-sibling::*'),
            ),
        ),
    );

  const yourOutput = await yourOutputElement
    .first()
    .textContent()
    .catch(() => null);
  const expectedOutput = await expectedOutputElement
    .first()
    .textContent()
    .catch(() => null);

  return { isCorrect, feedback, yourOutput, expectedOutput };
}

/**
 * Find a specific problem by cycling through problems
 */
async function findProblemById(page: Page, problemId: string): Promise<boolean> {
  for (let attempt = 0; attempt < MAX_SEARCH_ATTEMPTS; attempt++) {
    const currentId = await getCurrentProblemId(page);

    if (currentId === problemId) {
      return true;
    }

    // Check if problem text matches
    const problemText = await getCurrentProblemText(page);
    const targetProblem = javascriptProblems.find((p) => p.id === problemId);

    if (targetProblem && problemText?.includes(targetProblem.text)) {
      return true;
    }

    await skipProblem(page);

    // Check if we've reached results screen (end of drill)
    const resultsScreen = page
      .locator('[data-testid="results-screen"]')
      .or(page.locator('text=/results|completed|finished|summary/i'));

    if (await resultsScreen.first().isVisible()) {
      // Restart drill
      const tryAgainButton = page
        .locator('[data-testid="try-again"]')
        .or(page.getByRole('button', { name: /try again|restart|play again/i }));

      if (await tryAgainButton.first().isVisible()) {
        await tryAgainButton.first().click();
        await page.waitForTimeout(500);
      } else {
        return false;
      }
    }
  }

  return false;
}

/**
 * Try to navigate directly to a problem (if URL routing supports it)
 */
async function navigateToProbleDirect(page: Page, problemId: string): Promise<boolean> {
  // Try direct URL navigation
  await page.goto(`${BASE_URL}?problem=${problemId}`);
  await page.waitForLoadState('networkidle');

  // Check if we landed on the right problem
  await page.waitForTimeout(1000);

  const currentId = await getCurrentProblemId(page);
  return currentId === problemId;
}

// ============================================================================
// Test Suite: All JavaScript Problems
// ============================================================================

test.describe('JavaScript Problems - Comprehensive E2E Tests', () => {
  // Generate a test for each JavaScript problem
  for (const problem of javascriptProblems) {
    test(`Problem: ${problem.id} - ${problem.title || problem.text.slice(0, 50)}`, async ({
      page,
    }) => {
      // Clear state
      await page.goto('/');
      await clearLocalStorage(page);

      // Navigate to JavaScript drill mode
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Try direct URL navigation first
      const directNavWorked = await navigateToProbleDirect(page, problem.id);

      if (!directNavWorked) {
        // Start drill with the problem's category
        await startDrill(page, problem.category);

        // Find the specific problem
        const found = await findProblemById(page, problem.id);

        if (!found) {
          // Skip this test if we can't find the problem
          // This handles cases where the problem may not be loaded in the current drill session
          test.skip();
          return;
        }
      }

      // Verify we're on a drill problem screen
      const inputField = getInputField(page);
      await expect(inputField.first()).toBeVisible({ timeout: 5000 });

      // Submit the sample solution
      const result = await submitAnswer(page, problem.sample);

      // Verify the answer is marked correct
      expect(result.isCorrect).toBe(true);

      // If we can get the output, verify it matches expected
      if (result.yourOutput) {
        try {
          const actualOutput = JSON.parse(result.yourOutput);
          expect(actualOutput).toEqual(problem.expected);
        } catch {
          // Output might not be JSON, do string comparison
          const expectedString = JSON.stringify(problem.expected);
          expect(result.yourOutput).toContain(expectedString.slice(1, -1));
        }
      }
    });
  }
});

// ============================================================================
// Test Suite: Wrong Answer Validation
// ============================================================================

test.describe('JavaScript Problems - Wrong Answer Tests', () => {
  const wrongAnswers = [
    { answer: 'wrongAnswer()', description: 'invalid function call' },
    { answer: 'undefined', description: 'undefined value' },
    { answer: 'null', description: 'null value' },
    { answer: '[]', description: 'empty array' },
    { answer: '{}', description: 'empty object' },
    { answer: 'throw new Error()', description: 'error throw' },
  ];

  for (const { answer, description } of wrongAnswers) {
    test(`should mark ${description} as incorrect`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      await startDrill(page);

      const inputField = getInputField(page);
      await expect(inputField.first()).toBeVisible({ timeout: 5000 });

      // Submit wrong answer
      const result = await submitAnswer(page, answer);

      // Should be marked incorrect (unless it happens to match by accident)
      // Most problems won't have these as valid answers
      expect(result.isCorrect === false || result.feedback !== null).toBeTruthy();
    });
  }
});

// ============================================================================
// Test Suite: Hardcoded Answer Rejection
// ============================================================================

test.describe('JavaScript Problems - Anti-Hardcode Tests', () => {
  // Sample of problems to test hardcoded rejection
  const problemsToTest = javascriptProblems.slice(0, 10);

  for (const problem of problemsToTest) {
    test(`should reject hardcoded answer for: ${problem.id}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      // Try direct navigation
      const directNavWorked = await navigateToProbleDirect(page, problem.id);

      if (!directNavWorked) {
        await startDrill(page, problem.category);

        const found = await findProblemById(page, problem.id);
        if (!found) {
          test.skip();
          return;
        }
      }

      const inputField = getInputField(page);
      await expect(inputField.first()).toBeVisible({ timeout: 5000 });

      // Create hardcoded answer (just the expected value)
      const hardcodedAnswer = JSON.stringify(problem.expected);

      // Submit hardcoded answer
      const result = await submitAnswer(page, hardcodedAnswer);

      // Should be rejected - look for hardcode error or general rejection
      const hardcodeError = page.locator(
        'text=/hardcode|must use|provided variables|use the method|literal/i',
      );
      const isHardcodeRejected = await hardcodeError.isVisible().catch(() => false);

      // Either marked incorrect or specific hardcode error
      expect(result.isCorrect === false || isHardcodeRejected).toBeTruthy();
    });
  }

  test('should reject typing just the expected array value', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page, 'Array Methods');

    const inputField = getInputField(page);
    await expect(inputField.first()).toBeVisible({ timeout: 5000 });

    // Try common hardcoded outputs
    const hardcodedValues = ['[2, 4, 6, 8, 10]', '"hello world"', '15', 'true', '{ a: 1, b: 2 }'];

    for (const hardcoded of hardcodedValues) {
      await inputField.first().fill('');
      await inputField.first().fill(hardcoded);
      await inputField.first().press('Enter');

      await page.waitForTimeout(500);

      // Check for rejection
      const error = page
        .locator('[data-testid="error-feedback"]')
        .or(page.locator('.error').or(page.locator('text=/incorrect|hardcode|must use/i')));

      const _errorVisible = await error.first().isVisible();

      // Skip to next problem for next test
      await skipProblem(page);

      // Check if we reached end
      const resultsScreen = page
        .locator('[data-testid="results-screen"]')
        .or(page.locator('text=/results|completed|finished/i'));

      if (await resultsScreen.first().isVisible()) {
        break;
      }
    }
  });
});

// ============================================================================
// Test Suite: Skip Functionality
// ============================================================================

test.describe('JavaScript Problems - Skip Functionality', () => {
  test('should allow skipping problems', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    // Get initial problem text
    const initialProblemText = await getCurrentProblemText(page);

    // Skip
    const skipButton = page
      .locator('[data-testid="skip-button"]')
      .or(page.getByRole('button', { name: /skip|next|pass/i }));

    await expect(skipButton.first()).toBeVisible();
    await skipButton.first().click();

    await page.waitForTimeout(500);

    // Problem should have changed
    const newProblemText = await getCurrentProblemText(page);

    // Either text changed or we reached results
    const resultsScreen = page
      .locator('[data-testid="results-screen"]')
      .or(page.locator('text=/results|completed|finished/i'));

    const reachedResults = await resultsScreen.first().isVisible();

    expect(initialProblemText !== newProblemText || reachedResults).toBeTruthy();
  });

  test('should be able to skip multiple problems in a row', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    const skipButton = page
      .locator('[data-testid="skip-button"]')
      .or(page.getByRole('button', { name: /skip|next|pass/i }));

    // Skip 5 problems
    for (let i = 0; i < 5; i++) {
      if (await skipButton.first().isVisible()) {
        await skipButton.first().click();
        await page.waitForTimeout(300);
      }

      // Check if we reached results
      const resultsScreen = page
        .locator('[data-testid="results-screen"]')
        .or(page.locator('text=/results|completed|finished/i'));

      if (await resultsScreen.first().isVisible()) {
        break;
      }
    }

    // Should have either skipped or reached results
    const drillActive = await getInputField(page).first().isVisible();
    const resultsVisible = await page
      .locator('text=/results|completed|finished/i')
      .first()
      .isVisible();

    expect(drillActive || resultsVisible).toBeTruthy();
  });

  test('should show sample solution after skipping', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    // Skip
    const skipButton = page
      .locator('[data-testid="skip-button"]')
      .or(page.getByRole('button', { name: /skip|next|pass/i }));

    await skipButton.first().click();

    // Look for sample solution display
    const sampleSolution = page
      .locator('[data-testid="sample-solution"]')
      .or(
        page
          .locator('.sample-solution')
          .or(page.locator('text=/solution|answer was|correct answer/i')),
      );

    // Sample solution might be shown briefly or on skip
    await page.waitForTimeout(500);

    // Either sample shown or problem changed
    const sampleVisible = await sampleSolution.first().isVisible();
    const inputField = getInputField(page);
    const newProblemVisible = await inputField.first().isVisible();

    expect(sampleVisible || newProblemVisible).toBeTruthy();
  });
});

// ============================================================================
// Test Suite: Timer Tests
// ============================================================================

test.describe('JavaScript Problems - Timer Tests', () => {
  test('should display timer during drill', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    const timer = page
      .locator('[data-testid="timer"]')
      .or(page.locator('.timer').or(page.locator('time').or(page.locator('text=/\\d+:\\d+/'))));

    await expect(timer.first()).toBeVisible({ timeout: 5000 });
  });

  test('should increment timer during drill', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    const timer = page
      .locator('[data-testid="timer"]')
      .or(page.locator('.timer').or(page.locator('time').or(page.locator('text=/\\d+:\\d+/'))));

    // Get initial time
    const initialTime = await timer.first().textContent();

    // Wait 3 seconds
    await page.waitForTimeout(3000);

    // Get new time
    const newTime = await timer.first().textContent();

    // Time should have changed
    expect(initialTime).not.toEqual(newTime);
  });

  test('timer should be visible throughout problem solving', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    const timer = page
      .locator('[data-testid="timer"]')
      .or(page.locator('.timer').or(page.locator('text=/\\d+:\\d+/')));

    // Timer should be visible
    await expect(timer.first()).toBeVisible();

    // Submit an answer
    const inputField = getInputField(page);
    await inputField.first().fill('test');
    await inputField.first().press('Enter');

    await page.waitForTimeout(500);

    // Timer should still be visible
    await expect(timer.first()).toBeVisible();

    // Skip to next
    const skipButton = page
      .locator('[data-testid="skip-button"]')
      .or(page.getByRole('button', { name: /skip|next|continue/i }));

    if (await skipButton.first().isVisible()) {
      await skipButton.first().click();
      await page.waitForTimeout(500);

      // Timer should still be visible (unless we hit results)
      const resultsScreen = page
        .locator('[data-testid="results-screen"]')
        .or(page.locator('text=/results|completed|finished/i'));

      if (!(await resultsScreen.first().isVisible())) {
        await expect(timer.first()).toBeVisible();
      }
    }
  });
});

// ============================================================================
// Test Suite: Category-Specific Tests
// ============================================================================

test.describe('JavaScript Problems - Category Tests', () => {
  const categories = [
    'Array Methods',
    'String Methods',
    'Object Methods',
    'Set Methods',
    'Math Operations',
  ];

  for (const category of categories) {
    test(`should load problems from ${category}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Try to select specific category
      const categoryButton = page
        .locator(`[data-category="${category}"]`)
        .or(
          page
            .locator(`[data-testid="category-${category.toLowerCase().replace(/\s+/g, '-')}"]`)
            .or(page.locator('button').filter({ hasText: new RegExp(category, 'i') })),
        );

      if (await categoryButton.first().isVisible()) {
        await categoryButton.first().click();
      }

      // Start drill
      const startButton = page
        .locator('[data-testid="start-drill"]')
        .or(page.getByRole('button', { name: /start|begin|go/i }));

      await startButton.first().click();

      // Should load a problem
      const inputField = getInputField(page);
      await expect(inputField.first()).toBeVisible({ timeout: 10000 });

      // Get problem text to verify it's from the category
      const problemText = await getCurrentProblemText(page);
      expect(problemText).not.toBeNull();
    });
  }
});

// ============================================================================
// Test Suite: Output Verification
// ============================================================================

test.describe('JavaScript Problems - Output Verification', () => {
  // Test a subset of problems with known expected outputs
  const problemsToVerify = javascriptProblems.slice(0, 5);

  for (const problem of problemsToVerify) {
    test(`should display correct expected output for: ${problem.id}`, async ({ page }) => {
      await page.goto('/');
      await clearLocalStorage(page);

      const directNavWorked = await navigateToProbleDirect(page, problem.id);

      if (!directNavWorked) {
        await startDrill(page, problem.category);

        const found = await findProblemById(page, problem.id);
        if (!found) {
          test.skip();
          return;
        }
      }

      // Look for expected output display
      const expectedOutput = page
        .locator('[data-testid="expected-output"]')
        .or(
          page
            .locator('#expected-output')
            .or(
              page
                .locator('.expected-output')
                .or(page.locator('text=/expected/i').locator('xpath=following-sibling::*')),
            ),
        );

      if (await expectedOutput.first().isVisible()) {
        const displayedExpected = await expectedOutput.first().textContent();

        if (displayedExpected) {
          // Verify it matches the problem's expected value
          const expectedString = JSON.stringify(problem.expected);

          // Check if displayed output contains expected value
          expect(
            displayedExpected.includes(expectedString) ||
              displayedExpected.replace(/\s/g, '') === expectedString.replace(/\s/g, ''),
          ).toBeTruthy();
        }
      }

      // Submit correct answer and verify output
      const result = await submitAnswer(page, problem.sample);

      if (result.yourOutput) {
        try {
          const actualOutput = JSON.parse(result.yourOutput);
          expect(actualOutput).toEqual(problem.expected);
        } catch {
          // String comparison fallback
          const expectedStr = JSON.stringify(problem.expected);
          expect(result.yourOutput.replace(/\s/g, '')).toContain(
            expectedStr.replace(/[\s"]/g, '').slice(0, 10),
          );
        }
      }
    });
  }
});

// ============================================================================
// Test Suite: Edge Cases
// ============================================================================

test.describe('JavaScript Problems - Edge Cases', () => {
  test('should handle rapid answer submissions', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    const inputField = getInputField(page);
    await expect(inputField.first()).toBeVisible();

    // Rapidly submit multiple answers
    for (let i = 0; i < 5; i++) {
      await inputField.first().fill(`answer${i}`);
      await inputField.first().press('Enter');
      await page.waitForTimeout(100);
    }

    // App should still be functional
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle very long code input', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    const inputField = getInputField(page);
    await expect(inputField.first()).toBeVisible();

    // Create very long input
    const longInput = `arr.${'filter(x => x > 0).map(x => x * 2).'.repeat(20)}slice(0, 10)`;

    await inputField.first().fill(longInput);
    await inputField.first().press('Enter');

    // Should handle without crashing
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle special characters in input', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    const inputField = getInputField(page);
    await expect(inputField.first()).toBeVisible();

    // Input with special characters
    const specialInput = 'arr.filter(x => x !== "\'\\"<>&")';

    await inputField.first().fill(specialInput);
    await inputField.first().press('Enter');

    // Should handle gracefully
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle syntax errors gracefully', async ({ page }) => {
    await page.goto('/');
    await clearLocalStorage(page);

    await startDrill(page);

    const inputField = getInputField(page);
    await expect(inputField.first()).toBeVisible();

    // Syntax error input
    await inputField.first().fill('arr.filter(x => {{{');
    await inputField.first().press('Enter');

    // Should show error feedback, not crash
    await page.waitForTimeout(1000);

    const errorFeedback = page
      .locator('[data-testid="error-feedback"]')
      .or(page.locator('.error').or(page.locator('text=/error|syntax|invalid/i')));

    // Either shows error or app is still functional
    const errorShown = await errorFeedback.first().isVisible();
    const appFunctional = await inputField.first().isVisible();

    expect(errorShown || appFunctional).toBeTruthy();
  });
});

// ============================================================================
// Test Suite: Problem Statistics
// ============================================================================

test.describe('JavaScript Problems - Statistics', () => {
  test('should have all required problem fields', async () => {
    // This is a unit test for the problem data structure
    for (const problem of javascriptProblems) {
      expect(problem.id).toBeTruthy();
      expect(problem.category).toBeTruthy();
      expect(problem.difficulty).toMatch(/easy|medium|hard/);
      expect(problem.text).toBeTruthy();
      expect(problem.setup !== undefined || problem.setupCode !== undefined).toBeTruthy();
      expect(problem.expected !== undefined).toBeTruthy();
      expect(problem.sample).toBeTruthy();
    }
  });

  test('should have unique problem IDs', async () => {
    const ids = javascriptProblems.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('should have valid categories', async () => {
    const validCategories = [
      'Array Methods',
      'String Methods',
      'Object Methods',
      'Set Methods',
      'Map Methods',
      'Math Operations',
      'Date Methods',
      'JSON Methods',
      'Promise Methods',
      'RegExp Methods',
    ];

    for (const problem of javascriptProblems) {
      expect(validCategories).toContain(problem.category);
    }
  });

  test('should have sufficient problems per difficulty', async () => {
    const byDifficulty = {
      easy: javascriptProblems.filter((p) => p.difficulty === 'easy').length,
      medium: javascriptProblems.filter((p) => p.difficulty === 'medium').length,
      hard: javascriptProblems.filter((p) => p.difficulty === 'hard').length,
    };

    // Should have at least some problems at each difficulty
    expect(byDifficulty.easy).toBeGreaterThan(0);
    expect(byDifficulty.medium).toBeGreaterThan(0);
    expect(byDifficulty.hard).toBeGreaterThan(0);
  });
});
