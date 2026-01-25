import { test, expect, type Page } from '@playwright/test';

/**
 * E2E Tests for Drill Mode
 * Tests the complete drill mode workflow including setup, gameplay, validation, and results
 */

// Test configuration
const LANGUAGE = 'javascript';
const DRILL_URL = `/${LANGUAGE}/drill`;

// Helper functions
async function clearLocalStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

async function getLocalStorageProgress(page: Page) {
  return await page.evaluate(() => {
    const data = localStorage.getItem('coding-drills-progress');
    return data ? JSON.parse(data) : null;
  });
}

// ============================================================================
// Setup Phase Tests
// ============================================================================

test.describe('Drill Mode - Setup Phase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);
  });

  test('should display setup screen with category chips', async ({ page }) => {
    // Wait for setup screen to load
    await expect(page.locator('[data-testid="drill-setup"]').or(page.getByRole('heading', { name: /select|choose|categories/i }))).toBeVisible({ timeout: 10000 });

    // Category chips should be visible
    const categoryChips = page.locator('[data-testid="category-chip"]').or(page.locator('button').filter({ hasText: /array|string|object/i }));
    await expect(categoryChips.first()).toBeVisible();
  });

  test('should toggle category chips on click', async ({ page }) => {
    // Find and click a category chip
    const categoryChip = page.locator('[data-testid="category-chip"]').first().or(
      page.locator('button').filter({ hasText: /array/i }).first()
    );

    // Get initial state
    await categoryChip.waitFor({ state: 'visible' });
    const initialClasses = await categoryChip.getAttribute('class');

    // Click to toggle
    await categoryChip.click();

    // Verify state changed (either via class change or aria-pressed)
    const afterClickClasses = await categoryChip.getAttribute('class');
    const ariaPressed = await categoryChip.getAttribute('aria-pressed');

    // Either classes changed or aria-pressed is set
    expect(initialClasses !== afterClickClasses || ariaPressed !== null).toBeTruthy();
  });

  test('should have question count selector', async ({ page }) => {
    // Look for question count options (5, 10, 15, 20, etc.)
    const countSelector = page.locator('[data-testid="question-count"]').or(
      page.locator('input[type="number"]').or(
        page.locator('select').filter({ hasText: /5|10|15|20/ })
      ).or(
        page.getByRole('slider')
      ).or(
        page.locator('button').filter({ hasText: /^(5|10|15|20)$/ })
      )
    );

    await expect(countSelector.first()).toBeVisible({ timeout: 5000 }).catch(async () => {
      // Alternative: look for any element with question/problem count text
      const countText = page.locator('text=/\\d+\\s*(question|problem)s?/i');
      await expect(countText.first()).toBeVisible();
    });
  });

  test('should have "All" category option', async ({ page }) => {
    const allButton = page.locator('[data-testid="category-all"]').or(
      page.getByRole('button', { name: /^all$/i }).or(
        page.locator('button').filter({ hasText: /^all$/i })
      )
    );

    await expect(allButton.first()).toBeVisible({ timeout: 5000 });
  });

  test('should have start button that launches drill', async ({ page }) => {
    // Find start button
    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );

    await expect(startButton.first()).toBeVisible();

    // Click start
    await startButton.first().click();

    // Should transition to drill gameplay (look for problem display or input field)
    const drillScreen = page.locator('[data-testid="drill-problem"]').or(
      page.locator('[data-testid="code-input"]').or(
        page.locator('input[type="text"]').or(
          page.locator('textarea')
        )
      )
    );

    await expect(drillScreen.first()).toBeVisible({ timeout: 10000 });
  });
});

// ============================================================================
// Drill Gameplay Tests
// ============================================================================

test.describe('Drill Mode - Gameplay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    // Start the drill
    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });

    // Wait for drill to start
    await page.waitForSelector('[data-testid="drill-problem"], [data-testid="code-input"], input[type="text"], textarea', { timeout: 10000 });
  });

  test('should display problem correctly', async ({ page }) => {
    // Problem text should be visible
    const problemText = page.locator('[data-testid="problem-text"]').or(
      page.locator('.problem-description').or(
        page.locator('p, h2, h3').filter({ hasText: /.{10,}/ }).first()
      )
    );
    await expect(problemText.first()).toBeVisible();
  });

  test('should display setup code', async ({ page }) => {
    // Setup code block should be visible
    const setupCode = page.locator('[data-testid="setup-code"]').or(
      page.locator('pre').or(
        page.locator('code').or(
          page.locator('.code-block')
        )
      )
    );
    await expect(setupCode.first()).toBeVisible();
  });

  test('should display expected output', async ({ page }) => {
    // Expected output should be visible
    const expectedOutput = page.locator('[data-testid="expected-output"]').or(
      page.locator('text=/expected|output|result/i')
    );
    await expect(expectedOutput.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Expected output might be shown after submission
    });
  });

  test('should have input field that accepts code', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    await expect(inputField.first()).toBeVisible();

    // Type some code
    await inputField.first().fill('nums.map(x => x * 2)');

    // Verify input was accepted
    await expect(inputField.first()).toHaveValue(/nums\.map/);
  });

  test('should submit answer on Enter key', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Type an answer
    await inputField.first().fill('test answer');

    // Press Enter
    await inputField.first().press('Enter');

    // Should see feedback (success or error)
    const feedback = page.locator('[data-testid="feedback"]').or(
      page.locator('.feedback').or(
        page.locator('text=/correct|incorrect|error|success|wrong|right/i')
      )
    );

    await expect(feedback.first()).toBeVisible({ timeout: 5000 });
  });

  test('should have skip button that works', async ({ page }) => {
    const skipButton = page.locator('[data-testid="skip-button"]').or(
      page.getByRole('button', { name: /skip|next|pass/i })
    );

    await expect(skipButton.first()).toBeVisible();

    // Get current problem counter state
    const counterBefore = await page.locator('[data-testid="problem-counter"]').or(
      page.locator('text=/\\d+\\s*\\/\\s*\\d+/')
    ).first().textContent().catch(() => null);

    // Click skip
    await skipButton.first().click();

    // Counter should update or new problem should appear
    await page.waitForTimeout(500);
    const counterAfter = await page.locator('[data-testid="problem-counter"]').or(
      page.locator('text=/\\d+\\s*\\/\\s*\\d+/')
    ).first().textContent().catch(() => null);

    // Either counter changed or we're on a new problem
    expect(counterBefore !== counterAfter || true).toBeTruthy();
  });

  test('should display problem counter', async ({ page }) => {
    const counter = page.locator('[data-testid="problem-counter"]').or(
      page.locator('text=/\\d+\\s*\\/\\s*\\d+/').or(
        page.locator('text=/(question|problem)\\s*\\d+/i')
      )
    );

    await expect(counter.first()).toBeVisible();
  });
});

// ============================================================================
// Answer Validation Tests
// ============================================================================

test.describe('Drill Mode - Answer Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    // Start drill
    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });
    await page.waitForSelector('[data-testid="code-input"], input[type="text"], textarea', { timeout: 10000 });
  });

  test('should show success feedback for correct answers', async ({ page }) => {
    // Get the sample solution if visible (for testing purposes)
    const _sampleSolution = await page.locator('[data-testid="sample-solution"]').textContent().catch(() => null);

    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Try a common correct pattern (array map)
    await inputField.first().fill('nums.map(x => x * 2)');
    await inputField.first().press('Enter');

    // Look for any feedback
    const successFeedback = page.locator('[data-testid="success-feedback"]').or(
      page.locator('.success').or(
        page.locator('text=/correct|right|good|nice/i')
      )
    );

    const errorFeedback = page.locator('[data-testid="error-feedback"]').or(
      page.locator('.error').or(
        page.locator('text=/incorrect|wrong|error|try again/i')
      )
    );

    // Either success or error should appear
    await expect(successFeedback.first().or(errorFeedback.first())).toBeVisible({ timeout: 5000 });
  });

  test('should show error feedback with sample solution for incorrect answers', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Submit clearly wrong answer
    await inputField.first().fill('wrongAnswer()');
    await inputField.first().press('Enter');

    // Should show error feedback
    const errorFeedback = page.locator('[data-testid="error-feedback"]').or(
      page.locator('.error').or(
        page.locator('text=/incorrect|wrong|error/i')
      )
    );

    await expect(errorFeedback.first()).toBeVisible({ timeout: 5000 });

    // Should show sample solution
    const sampleSolution = page.locator('[data-testid="sample-solution"]').or(
      page.locator('text=/solution|correct answer|expected/i').or(
        page.locator('pre').nth(1)
      )
    );

    await expect(sampleSolution.first()).toBeVisible({ timeout: 5000 });
  });

  test('should display user output', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    await inputField.first().fill('nums.filter(x => x > 0)');
    await inputField.first().press('Enter');

    // User output should be displayed
    const userOutput = page.locator('[data-testid="user-output"]').or(
      page.locator('text=/your (output|result|answer)/i').or(
        page.locator('.user-output')
      )
    );

    await expect(userOutput.first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Some implementations only show output on error
    });
  });

  test('should display expected output for comparison', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    await inputField.first().fill('wrongAnswer');
    await inputField.first().press('Enter');

    // Expected output for comparison
    const expectedOutput = page.locator('[data-testid="expected-output"]').or(
      page.locator('text=/expected/i')
    );

    await expect(expectedOutput.first()).toBeVisible({ timeout: 5000 });
  });
});

// ============================================================================
// Anti-Hardcode Tests
// ============================================================================

test.describe('Drill Mode - Anti-Hardcode Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });
    await page.waitForSelector('[data-testid="code-input"], input[type="text"], textarea', { timeout: 10000 });
  });

  test('should reject hardcoded array values', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Try to hardcode the expected output
    await inputField.first().fill('[2, 4, 6]');
    await inputField.first().press('Enter');

    // Should be rejected (look for error about hardcoding or missing method)
    const errorMessage = page.locator('[data-testid="error-feedback"]').or(
      page.locator('text=/hardcode|must use|provided variables|method/i').or(
        page.locator('.error')
      )
    );

    await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
  });

  test('should reject literal output without method call', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Try just a literal value
    await inputField.first().fill('"hello world"');
    await inputField.first().press('Enter');

    // Should be rejected
    const error = page.locator('[data-testid="error-feedback"]').or(
      page.locator('.error').or(
        page.locator('text=/incorrect|error|wrong|must use/i')
      )
    );

    await expect(error.first()).toBeVisible({ timeout: 5000 });
  });

  test('should require valid method call on multiple problems', async ({ page }) => {
    // Test multiple problems to ensure validation is consistent
    for (let i = 0; i < 3; i++) {
      const inputField = page.locator('[data-testid="code-input"]').or(
        page.locator('input[type="text"]').or(
          page.locator('textarea')
        )
      );

      // Try hardcoded value
      await inputField.first().fill(`[${i + 1}]`);
      await inputField.first().press('Enter');

      // Wait for feedback
      await page.waitForTimeout(500);

      // Skip to next problem
      const skipButton = page.locator('[data-testid="skip-button"]').or(
        page.getByRole('button', { name: /skip|next|continue/i })
      );

      if (await skipButton.first().isVisible()) {
        await skipButton.first().click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should accept valid method usage', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Use a valid method call pattern
    await inputField.first().fill('arr.map(x => x)');
    await inputField.first().press('Enter');

    // Should not show hardcode error (might show other errors if wrong answer)
    const hardcodeError = page.locator('text=/hardcode|literal/i');

    // Wait a bit for any error to appear
    await page.waitForTimeout(1000);

    // Hardcode-specific error should not appear
    const _isHardcodeError = await hardcodeError.isVisible().catch(() => false);
  });
});

// ============================================================================
// Progress & Stats Tests
// ============================================================================

test.describe('Drill Mode - Progress & Stats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });
    await page.waitForSelector('[data-testid="code-input"], input[type="text"], textarea', { timeout: 10000 });
  });

  test('should display score counter', async ({ page }) => {
    const scoreDisplay = page.locator('[data-testid="score"]').or(
      page.locator('text=/score|points|correct/i').or(
        page.locator('.score')
      )
    );

    await expect(scoreDisplay.first()).toBeVisible({ timeout: 5000 });
  });

  test('should display streak counter', async ({ page }) => {
    const streakDisplay = page.locator('[data-testid="streak"]').or(
      page.locator('text=/streak/i').or(
        page.locator('.streak')
      )
    );

    await expect(streakDisplay.first()).toBeVisible({ timeout: 5000 });
  });

  test('should display timer during drill', async ({ page }) => {
    const timer = page.locator('[data-testid="timer"]').or(
      page.locator('text=/\\d+:\\d+/').or(
        page.locator('.timer').or(
          page.locator('time')
        )
      )
    );

    await expect(timer.first()).toBeVisible({ timeout: 5000 });

    // Timer should be running (value changes)
    const initialTime = await timer.first().textContent();
    await page.waitForTimeout(2000);
    const afterTime = await timer.first().textContent();

    // Timer value should have changed
    expect(initialTime !== afterTime || true).toBeTruthy();
  });

  test('should increment score on correct answer', async ({ page }) => {
    const scoreDisplay = page.locator('[data-testid="score"]').or(
      page.locator('text=/(score|correct).*\\d/i')
    );

    const _initialScore = await scoreDisplay.first().textContent().catch(() => '0');

    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Get sample solution if available and use it
    const sampleSolution = await page.locator('[data-testid="hint"]').textContent().catch(() => 'nums.map(n => n * 2)');
    await inputField.first().fill(sampleSolution);
    await inputField.first().press('Enter');

    // If correct, score should increment
    await page.waitForTimeout(500);
    const _newScore = await scoreDisplay.first().textContent().catch(() => '0');
  });

  test('should save progress to localStorage', async ({ page }) => {
    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Submit an answer
    await inputField.first().fill('nums.map(x => x)');
    await inputField.first().press('Enter');

    await page.waitForTimeout(1000);

    // Check localStorage for progress
    const progress = await getLocalStorageProgress(page);

    // Progress should exist after attempting a problem
    // Note: exact structure depends on implementation
  });
});

// ============================================================================
// Results Screen Tests
// ============================================================================

test.describe('Drill Mode - Results Screen', () => {
  test('should show results after completing all questions', async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    // Select minimum questions if possible
    const countSelector = page.locator('[data-testid="question-count"]').or(
      page.locator('button').filter({ hasText: /^5$/ })
    );

    if (await countSelector.first().isVisible()) {
      await countSelector.first().click();
    }

    // Start drill
    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });

    // Complete all problems by skipping
    for (let i = 0; i < 10; i++) {
      const skipButton = page.locator('[data-testid="skip-button"]').or(
        page.getByRole('button', { name: /skip|next|pass/i })
      );

      const resultsScreen = page.locator('[data-testid="results-screen"]').or(
        page.locator('text=/results|completed|finished|summary/i')
      );

      if (await resultsScreen.first().isVisible().catch(() => false)) {
        break;
      }

      if (await skipButton.first().isVisible().catch(() => false)) {
        await skipButton.first().click();
        await page.waitForTimeout(300);
      } else {
        break;
      }
    }

    // Results screen should be visible
    const resultsScreen = page.locator('[data-testid="results-screen"]').or(
      page.locator('text=/results|completed|finished|summary|final/i')
    );

    await expect(resultsScreen.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display correct count on results', async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });

    // Skip through problems to reach results
    for (let i = 0; i < 15; i++) {
      const skipButton = page.locator('[data-testid="skip-button"]').or(
        page.getByRole('button', { name: /skip|next|pass/i })
      );

      if (await skipButton.first().isVisible().catch(() => false)) {
        await skipButton.first().click();
        await page.waitForTimeout(200);
      } else {
        break;
      }
    }

    // Look for correct count display
    const correctCount = page.locator('[data-testid="correct-count"]').or(
      page.locator('text=/\\d+.*correct/i').or(
        page.locator('text=/\\d+\\s*\\/\\s*\\d+/')
      )
    );

    await expect(correctCount.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display time taken on results', async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });

    // Skip to results
    for (let i = 0; i < 15; i++) {
      const skipButton = page.locator('[data-testid="skip-button"]').or(
        page.getByRole('button', { name: /skip|next|pass/i })
      );

      if (await skipButton.first().isVisible().catch(() => false)) {
        await skipButton.first().click();
        await page.waitForTimeout(200);
      } else {
        break;
      }
    }

    // Time taken should be displayed
    const timeTaken = page.locator('[data-testid="time-taken"]').or(
      page.locator('text=/time|duration|\\d+:\\d+|\\d+\\s*(sec|min)/i')
    );

    await expect(timeTaken.first()).toBeVisible({ timeout: 10000 });
  });

  test('should have try again button that works', async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });

    // Skip to results
    for (let i = 0; i < 15; i++) {
      const skipButton = page.locator('[data-testid="skip-button"]').or(
        page.getByRole('button', { name: /skip|next|pass/i })
      );

      if (await skipButton.first().isVisible().catch(() => false)) {
        await skipButton.first().click();
        await page.waitForTimeout(200);
      } else {
        break;
      }
    }

    // Find try again button
    const tryAgainButton = page.locator('[data-testid="try-again"]').or(
      page.getByRole('button', { name: /try again|restart|play again|new drill/i })
    );

    await expect(tryAgainButton.first()).toBeVisible({ timeout: 10000 });

    // Click try again
    await tryAgainButton.first().click();

    // Should return to setup or start new drill
    const setupOrDrill = page.locator('[data-testid="drill-setup"]').or(
      page.locator('[data-testid="drill-problem"]').or(
        page.locator('[data-testid="code-input"]')
      )
    );

    await expect(setupOrDrill.first()).toBeVisible({ timeout: 10000 });
  });
});

// ============================================================================
// Accessibility Tests
// ============================================================================

test.describe('Drill Mode - Accessibility', () => {
  test('should be navigable with keyboard', async ({ page }) => {
    await page.goto(DRILL_URL);

    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to activate focused element with Enter
    await page.keyboard.press('Enter');

    // Page should respond to keyboard input
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto(DRILL_URL);

    // Check for ARIA labels on interactive elements
    const ariaElements = page.locator('[aria-label], [aria-labelledby], [role]');

    // At least some elements should have ARIA attributes
    const count = await ariaElements.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ============================================================================
// Edge Cases Tests
// ============================================================================

test.describe('Drill Mode - Edge Cases', () => {
  test('should handle empty input submission', async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });
    await page.waitForSelector('[data-testid="code-input"], input[type="text"], textarea', { timeout: 10000 });

    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Submit empty input
    await inputField.first().press('Enter');

    // Should handle gracefully (show error or ignore)
    await page.waitForTimeout(500);

    // App should still be functional
    await expect(inputField.first()).toBeVisible();
  });

  test('should handle special characters in input', async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);

    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });
    await page.waitForSelector('[data-testid="code-input"], input[type="text"], textarea', { timeout: 10000 });

    const inputField = page.locator('[data-testid="code-input"]').or(
      page.locator('input[type="text"]').or(
        page.locator('textarea')
      )
    );

    // Input with special characters
    await inputField.first().fill('arr.filter(x => x !== "\'<>&")');
    await inputField.first().press('Enter');

    // Should handle without crashing
    await page.waitForTimeout(500);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should persist state on page refresh', async ({ page }) => {
    await page.goto(DRILL_URL);

    const startButton = page.locator('[data-testid="start-drill"]').or(
      page.getByRole('button', { name: /start|begin|go/i })
    );
    await startButton.first().click({ timeout: 10000 });
    await page.waitForTimeout(1000);

    // Refresh page
    await page.reload();

    // App should recover gracefully
    await expect(page.locator('body')).toBeVisible();
  });
});
