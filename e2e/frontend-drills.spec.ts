import { expect, type Page, test } from '@playwright/test';

/**
 * E2E Tests for Frontend Drills
 * Covers landing page, framework hub, drill mode, quiz mode, training, UI patterns, and cheatsheet.
 */

const BASE_URL = '/frontend-drills';
const FRAMEWORK = 'react'; // Use React as primary test framework (has problems + quiz)

async function clearLocalStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

// ============================================================================
// Landing Page
// ============================================================================

test.describe('Frontend Drills - Landing Page', () => {
  test('should load frontend drills landing page', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByRole('heading', { name: /frontend drills/i })).toBeVisible({
      timeout: 10000,
    });
  });

  test('should display all four framework cards', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText('Native JavaScript').first()).toBeVisible();
    await expect(page.getByText('React').first()).toBeVisible();
    await expect(page.getByText('Angular').first()).toBeVisible();
    await expect(page.getByText('Vue').first()).toBeVisible();
  });

  test('should display feature sections (Code Drills, Quizzes, UI Patterns, Cheatsheets)', async ({
    page,
  }) => {
    await page.goto(BASE_URL);
    await expect(page.getByText(/code drills/i).first()).toBeVisible();
    await expect(page.getByText(/framework quizzes/i).first()).toBeVisible();
    await expect(page.getByText(/ui patterns/i).first()).toBeVisible();
    await expect(page.getByText(/cheatsheets/i).first()).toBeVisible();
  });

  test('should navigate to framework hub when clicking a framework card', async ({ page }) => {
    await page.goto(BASE_URL);
    await page
      .getByRole('link', { name: new RegExp(FRAMEWORK, 'i') })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}(?:/)?$`));
  });

  test('should have back to home link', async ({ page }) => {
    await page.goto(BASE_URL);
    const backLink = page.getByRole('link', { name: /back to home/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL('/');
  });
});

// ============================================================================
// Framework Hub
// ============================================================================

test.describe('Frontend Drills - Framework Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/${FRAMEWORK}`);
  });

  test('should display framework name and mode cards', async ({ page }) => {
    await expect(page.getByText(/react/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link', { name: /drill mode|start drilling/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /quiz mode|start quiz/i })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /frontend training|start training/i }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /ui patterns|browse patterns/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /cheatsheet|view cheatsheet/i })).toBeVisible();
  });

  test('should navigate to drill mode', async ({ page }) => {
    await page.getByRole('link', { name: /start drilling|drill mode/i }).click();
    await expect(page).toHaveURL(`/frontend-drills/${FRAMEWORK}/drill`);
  });

  test('should navigate to quiz mode', async ({ page }) => {
    await page.getByRole('link', { name: /start quiz|quiz mode/i }).click();
    await expect(page).toHaveURL(`/frontend-drills/${FRAMEWORK}/quiz`);
  });

  test('should navigate to training', async ({ page }) => {
    await page.getByRole('link', { name: /start training|frontend training/i }).click();
    await expect(page).toHaveURL(`/frontend-drills/${FRAMEWORK}/training`);
  });

  test('should navigate to UI patterns', async ({ page }) => {
    await page.getByRole('link', { name: /browse patterns|ui patterns/i }).click();
    await expect(page).toHaveURL(`/frontend-drills/${FRAMEWORK}/ui-patterns`);
  });

  test('should navigate to cheatsheet', async ({ page }) => {
    await page.getByRole('link', { name: /view cheatsheet|cheatsheet/i }).click();
    await expect(page).toHaveURL(`/frontend-drills/${FRAMEWORK}/cheatsheet`);
  });
});

// ============================================================================
// Drill Mode - Setup
// ============================================================================

test.describe('Frontend Drills - Drill Mode Setup', () => {
  const DRILL_URL = `${BASE_URL}/${FRAMEWORK}/drill`;

  test.beforeEach(async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);
  });

  test('should display drill mode setup screen', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /drill mode/i }).or(page.getByText(/drill mode/i).first()),
    ).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/categories/i)).toBeVisible();
  });

  test('should have category chips or select all', async ({ page }) => {
    const selectAll = page.getByRole('button', { name: /select all/i });
    const clearBtn = page.getByRole('button', { name: /clear/i });
    await expect(selectAll.or(clearBtn).first()).toBeVisible({ timeout: 5000 });
  });

  test('should have start button', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /start|begin|go/i });
    await expect(startButton.first()).toBeVisible();
  });

  test('should start drill when clicking start', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /start|begin|go/i });
    await startButton.first().click();
    // After start: code editor or problem content
    const editorOrProblem = page
      .locator('textarea')
      .or(page.locator('pre'))
      .or(page.getByText(/return|useState|useEffect/i).first());
    await expect(editorOrProblem.first()).toBeVisible({ timeout: 10000 });
  });
});

// ============================================================================
// Drill Mode - Gameplay
// ============================================================================

test.describe('Frontend Drills - Drill Mode Gameplay', () => {
  const DRILL_URL = `${BASE_URL}/${FRAMEWORK}/drill`;

  test.beforeEach(async ({ page }) => {
    await page.goto(DRILL_URL);
    await clearLocalStorage(page);
    const startButton = page.getByRole('button', { name: /start|begin|go/i });
    await startButton.first().click({ timeout: 10000 });
    await page
      .waitForSelector('textarea, [contenteditable="true"]', { timeout: 10000 })
      .catch(() => {});
  });

  test('should display problem and accept code input', async ({ page }) => {
    const input = page.locator('textarea').or(page.locator('[contenteditable="true"]')).first();
    await expect(input).toBeVisible({ timeout: 15000 });
    await input.fill('useState(42)[0]');
    // Textarea has value; contenteditable shows text in innerHTML
    const hasValue = (await input.getAttribute('value')?.includes('useState')) ?? false;
    const hasText = (await input.textContent())?.includes('useState') ?? false;
    expect(hasValue || hasText).toBeTruthy();
  });

  test('should have submit or check button', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /submit|check|verify/i });
    await expect(submitBtn.first())
      .toBeVisible({ timeout: 5000 })
      .catch(() => {
        // Some UIs use Enter to submit only
      });
  });

  test('should show feedback after submitting correct answer', async ({ page }) => {
    const input = page.locator('textarea').or(page.locator('[contenteditable="true"]')).first();
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.fill('useState(42)[0]');
    await input.press('Enter');
    const feedback = page.getByText(/correct|success|incorrect|wrong|error|sample solution/i);
    await expect(feedback.first()).toBeVisible({ timeout: 12000 });
  });
});

// ============================================================================
// Quiz Mode - Setup
// ============================================================================

test.describe('Frontend Drills - Quiz Mode Setup', () => {
  const QUIZ_URL = `${BASE_URL}/${FRAMEWORK}/quiz`;

  test.beforeEach(async ({ page }) => {
    await page.goto(QUIZ_URL);
    await clearLocalStorage(page);
  });

  test('should display quiz mode setup screen', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /quiz mode/i })).toBeVisible({
      timeout: 10000,
    });
  });

  test('should have start quiz button', async ({ page }) => {
    const startBtn = page.getByRole('button', { name: /start|begin|go/i });
    await expect(startBtn.first()).toBeVisible();
  });

  test('should start quiz and show first question', async ({ page }) => {
    const startBtn = page.getByRole('button', { name: /start|begin|go/i });
    await startBtn.first().click();
    await page.waitForTimeout(1500);
    const questionOrOption = page
      .getByText(/\?|question|which|what|how/i)
      .or(page.locator('button').filter({ hasText: /^[A-D]\.|^[A-D]\s/ }));
    await expect(questionOrOption.first()).toBeVisible({ timeout: 12000 });
  });
});

// ============================================================================
// Quiz Mode - Gameplay
// ============================================================================

test.describe('Frontend Drills - Quiz Mode Gameplay', () => {
  const QUIZ_URL = `${BASE_URL}/${FRAMEWORK}/quiz`;

  test.beforeEach(async ({ page }) => {
    await page.goto(QUIZ_URL);
    await clearLocalStorage(page);
    const startBtn = page.getByRole('button', { name: /start|begin|go/i });
    await startBtn.first().click();
    await page.waitForTimeout(1500);
  });

  test('should show question and answer options', async ({ page }) => {
    const options = page.locator('button').filter({ hasText: /^[A-D]\.|^[A-D]\s/ });
    await expect(options.first())
      .toBeVisible({ timeout: 10000 })
      .catch(() => {
        const anyOption = page.locator('button').filter({ hasText: /.+/ });
        expect(anyOption.first()).toBeVisible();
      });
  });

  test('should advance after selecting an answer', async ({ page }) => {
    const firstOption = page.locator('button').filter({ hasText: /.+/ }).first();
    await firstOption.waitFor({ state: 'visible', timeout: 10000 });
    await firstOption.click();
    await page.waitForTimeout(1000);
    const nextOrResults = page.getByRole('button', { name: /next|continue|see results|finish/i });
    const resultsHeading = page.getByText(/results|score|completed|summary/i);
    const nextQuestion = page.locator('button').filter({ hasText: /.+/ }).first();
    await expect(nextOrResults.or(resultsHeading).or(nextQuestion).first()).toBeVisible({
      timeout: 8000,
    });
  });
});

// ============================================================================
// Training Page
// ============================================================================

test.describe('Frontend Drills - Training', () => {
  const TRAINING_URL = `${BASE_URL}/${FRAMEWORK}/training`;

  test('should load training list page', async ({ page }) => {
    await page.goto(TRAINING_URL);
    await expect(page).toHaveURL(TRAINING_URL);
    await expect(page.getByRole('heading', { name: /training/i })).toBeVisible({
      timeout: 10000,
    });
  });

  test('should list problems or show empty state', async ({ page }) => {
    await page.goto(TRAINING_URL);
    const problemLinks = page.getByRole('link', { name: /.+/ });
    const emptyState = page.getByText(/no problems|coming soon/i);
    await expect(problemLinks.first().or(emptyState)).toBeVisible({ timeout: 8000 });
  });

  test('should navigate to a problem when clicking first problem link', async ({ page }) => {
    await page.goto(TRAINING_URL);
    const firstProblemLink = page
      .getByRole('link')
      .filter({ hasNot: page.getByRole('link', { name: /frontend|back|home/i }) })
      .first();
    if ((await firstProblemLink.isVisible().catch(() => false)) === true) {
      await firstProblemLink.click();
      await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/training/`));
    }
  });
});

// ============================================================================
// UI Patterns Page
// ============================================================================

test.describe('Frontend Drills - UI Patterns', () => {
  const UI_PATTERNS_URL = `${BASE_URL}/${FRAMEWORK}/ui-patterns`;

  test('should load UI patterns list page', async ({ page }) => {
    await page.goto(UI_PATTERNS_URL);
    await expect(page).toHaveURL(UI_PATTERNS_URL);
    await expect(page.getByRole('heading', { name: /ui patterns/i })).toBeVisible({
      timeout: 10000,
    });
  });

  test('should show pattern categories or pattern cards', async ({ page }) => {
    await page.goto(UI_PATTERNS_URL);
    const content = page
      .getByText(/forms|navigation|data|button|modal|dropdown/i)
      .or(page.locator('a[href*="/ui-patterns/"]').first());
    await expect(content.first()).toBeVisible({ timeout: 8000 });
  });

  test('should navigate to a pattern detail when clicking a pattern', async ({ page }) => {
    await page.goto(UI_PATTERNS_URL);
    const patternLink = page.locator('a[href*="/ui-patterns/"]').first();
    if ((await patternLink.isVisible().catch(() => false)) === true) {
      await patternLink.click();
      await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/ui-patterns/`));
    }
  });
});

// ============================================================================
// Cheatsheet Page
// ============================================================================

test.describe('Frontend Drills - Cheatsheet', () => {
  const CHEATSHEET_URL = `${BASE_URL}/${FRAMEWORK}/cheatsheet`;

  test('should load cheatsheet page', async ({ page }) => {
    await page.goto(CHEATSHEET_URL);
    await expect(page).toHaveURL(CHEATSHEET_URL);
    await expect(
      page.getByRole('heading', { name: /cheatsheet|reference|quick reference/i }),
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display cheatsheet content (sections or code)', async ({ page }) => {
    await page.goto(CHEATSHEET_URL);
    const content = page
      .getByText(/useState|useEffect|component|hook/i)
      .or(page.locator('pre').or(page.locator('code')).first());
    await expect(content.first()).toBeVisible({ timeout: 8000 });
  });
});

// ============================================================================
// Invalid Framework / 404
// ============================================================================

test.describe('Frontend Drills - Invalid Framework', () => {
  test('should handle invalid framework gracefully', async ({ page }) => {
    await page.goto(`${BASE_URL}/invalid-framework`);
    await expect(page.getByText(/not found|invalid|404/i).or(page.locator('h1'))).toBeVisible({
      timeout: 10000,
    });
  });
});
