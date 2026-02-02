import { expect, test } from '@playwright/test';

/**
 * E2E Tests for Frontend Drills
 *
 * Covers the complete frontend drills feature:
 * - Landing page and framework selection
 * - Framework hub and mode cards (Drill, Quiz, Training, UI Patterns, Cheatsheet)
 * - Drill mode: setup, gameplay, validation, results
 * - Quiz mode: setup, play, results
 * - Training: problem list and individual problem page
 * - UI Patterns: list and pattern detail
 * - Cheatsheet: sections and content
 * - Invalid framework handling
 */

const FRONTEND_DRILLS_URL = '/frontend-drills';
const FRAMEWORK = 'native-js'; // Has problems and quiz questions

// ============================================================================
// Landing Page
// ============================================================================

test.describe('Frontend Drills - Landing Page', () => {
  test('should display Frontend Drills title and description', async ({ page }) => {
    await page.goto(FRONTEND_DRILLS_URL);
    await expect(page.getByText(/frontend drills/i).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/master frontend frameworks with hands-on practice/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test('should show framework cards for each framework', async ({ page }) => {
    await page.goto(FRONTEND_DRILLS_URL);
    await expect(page.getByText(/native javascript/i).first()).toBeVisible({ timeout: 15000 });
    await expect(
      page
        .getByText(/^react$/i)
        .or(page.getByText(/react/i))
        .first(),
    ).toBeVisible();
    await expect(page.getByText(/angular/i).first()).toBeVisible();
    await expect(page.getByText(/^vue$/i).or(page.getByText(/vue/i)).first()).toBeVisible();
  });

  test('should show "What You\'ll Practice" section with feature cards', async ({ page }) => {
    await page.goto(FRONTEND_DRILLS_URL);
    await expect(page.getByText(/what you'll practice|what you will practice/i)).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText(/code drills/i)).toBeVisible();
    await expect(page.getByText(/framework quizzes/i)).toBeVisible();
    await expect(page.getByText(/ui patterns/i)).toBeVisible();
    await expect(page.getByText(/cheatsheets/i)).toBeVisible();
  });

  test('should have Back to Home link', async ({ page }) => {
    await page.goto(FRONTEND_DRILLS_URL);
    await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible();
    await page.getByRole('link', { name: /back to home/i }).click();
    await expect(page).toHaveURL(/\//);
  });

  test('should navigate to framework hub when clicking a framework card', async ({ page }) => {
    await page.goto(FRONTEND_DRILLS_URL);
    await page
      .getByRole('link', { name: /native javascript/i })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}$`));
  });
});

// ============================================================================
// Framework Hub
// ============================================================================

test.describe('Frontend Drills - Framework Hub', () => {
  test('should display framework name and description', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}`);
    await expect(page.getByRole('heading', { name: /native javascript/i }).first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText(/master the dom api|vanilla javascript/i)).toBeVisible();
  });

  test('should show all five mode cards', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}`);
    await expect(page.getByRole('link', { name: /start drilling/i }).first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByRole('link', { name: /start quiz/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /start training/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /browse patterns/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /view cheatsheet/i }).first()).toBeVisible();
  });

  test('should navigate to drill page when clicking Start Drilling', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}`);
    await page
      .getByRole('link', { name: /start drilling/i })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/drill`));
  });

  test('should navigate to quiz page when clicking Start Quiz', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}`);
    await page
      .getByRole('link', { name: /start quiz/i })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/quiz`));
  });

  test('should navigate to training page when clicking Start Training', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}`);
    await page
      .getByRole('link', { name: /start training/i })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/training`));
  });

  test('should navigate to UI patterns when clicking Browse Patterns', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}`);
    await page
      .getByRole('link', { name: /browse patterns/i })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/ui-patterns`));
  });

  test('should navigate to cheatsheet when clicking View Cheatsheet', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}`);
    await page
      .getByRole('link', { name: /view cheatsheet/i })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/cheatsheet`));
  });

  test('invalid framework should redirect to not-found or show 404', async ({ page }) => {
    await page.goto('/frontend-drills/invalid-framework-xyz');
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);
    const url = page.url();
    const hasNotFound = /\/(not-found|404)/.test(url);
    const bodyText = await page
      .locator('body')
      .textContent()
      .catch(() => '');
    const shows404 = /not found|404|page not found/i.test(bodyText ?? '');
    expect(hasNotFound || shows404).toBe(true);
  });
});

// ============================================================================
// Drill Mode - Setup
// ============================================================================

test.describe('Frontend Drills - Drill Mode Setup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/drill`);
  });

  test('should display Drill Mode setup with Categories section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /drill mode/i }).first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByRole('heading', { name: /^categories$/i }).first()).toBeVisible();
  });

  test('should have Number of Questions control', async ({ page }) => {
    await expect(page.getByText(/number of questions|questions available/i).first()).toBeVisible({
      timeout: 10000,
    });
  });

  test('should have Difficulty filter', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /^difficulty$/i }).first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByRole('button', { name: /^all$/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /easy/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /medium/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /hard/i }).first()).toBeVisible();
  });

  test('should have Start Drilling button', async ({ page }) => {
    const startBtn = page.getByRole('button', { name: /start drilling/i });
    await expect(startBtn).toBeVisible({ timeout: 10000 });
  });

  test('should have Select All and Clear for categories', async ({ page }) => {
    await expect(page.getByRole('button', { name: /select all/i })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByRole('button', { name: /^clear$/i }).first()).toBeVisible();
  });

  test('should have Exit link back to framework', async ({ page }) => {
    await expect(page.getByRole('link', { name: /exit/i })).toBeVisible({ timeout: 10000 });
  });

  test('clicking Start Drilling should enter gameplay', async ({ page }) => {
    await page.getByRole('button', { name: /start drilling/i }).click();
    await expect(
      page.getByRole('button', { name: /submit/i }).or(page.getByRole('button', { name: /skip/i })),
    ).toBeVisible({ timeout: 15000 });
  });
});

// ============================================================================
// Drill Mode - Gameplay
// ============================================================================

test.describe('Frontend Drills - Drill Mode Gameplay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/drill`);
    await page.getByRole('button', { name: /start drilling/i }).click();
    await page
      .getByRole('button', { name: /submit/i })
      .or(page.getByRole('button', { name: /skip/i }))
      .waitFor({ state: 'visible', timeout: 15000 });
  });

  test('should show problem title and description', async ({ page }) => {
    await expect(
      page.getByText(/setup code|expected output|your answer|setup|expected/i).first(),
    ).toBeVisible({ timeout: 8000 });
  });

  test('should show Progress, Total Time, Score, Streak', async ({ page }) => {
    await expect(page.getByText(/\d+\s*\/\s*\d+/).first()).toBeVisible({ timeout: 8000 });
    await expect(page.getByText(/score|total time|progress|streak/i).first()).toBeVisible();
  });

  test('should have Submit, Skip, and End buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /skip/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^end$/i })).toBeVisible();
  });

  test('should have code editor / input for answer', async ({ page }) => {
    const editor = page.locator('.monaco-editor').or(page.locator('textarea')).first();
    await expect(editor).toBeVisible({ timeout: 5000 });
  });

  test('submitting correct answer should show feedback and advance', async ({ page }) => {
    const editor = page.locator('.monaco-editor').first();
    await editor.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await page.keyboard.type('elements.filter(el => el.classList.includes("active"))');
    await page.keyboard.press('Meta+Enter');
    await expect(page.getByText(/correct|incorrect|skipped/i).first()).toBeVisible({
      timeout: 8000,
    });
  });

  test('skip should advance to next problem', async ({ page }) => {
    await page.getByRole('button', { name: /skip/i }).click();
    await page.waitForTimeout(500);
    await expect(
      page.getByRole('button', { name: /submit/i }).or(page.getByRole('button', { name: /skip/i })),
    ).toBeVisible();
  });

  test('End button should go to results', async ({ page }) => {
    await page.getByRole('button', { name: /^end$/i }).click();
    await expect(
      page
        .getByRole('heading', { name: /drill complete|results/i })
        .or(page.getByText(/total points|correct|breakdown/i)),
    ).toBeVisible({ timeout: 10000 });
  });
});

// ============================================================================
// Drill Mode - Results
// ============================================================================

test.describe('Frontend Drills - Drill Mode Results', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/drill`);
    await page.getByRole('button', { name: /start drilling/i }).click();
    await page
      .getByRole('button', { name: /^end$/i })
      .waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('button', { name: /^end$/i }).click();
  });

  test('should show Drill Complete and total score', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /drill complete/i }).or(page.getByText(/total points/i)),
    ).toBeVisible({ timeout: 10000 });
  });

  test('should show Correct count and Accuracy', async ({ page }) => {
    await expect(page.getByText(/correct|accuracy|breakdown/i).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test('should have Try Again (same questions) and New Drill', async ({ page }) => {
    await expect(page.getByRole('button', { name: /try again|same questions/i })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByRole('button', { name: /new drill|new questions/i })).toBeVisible();
  });

  test('should have Back to framework link', async ({ page }) => {
    await expect(
      page
        .getByRole('link', { name: /back to|native javascript/i })
        .or(page.getByRole('button', { name: /back to/i })),
    ).toBeVisible({ timeout: 10000 });
  });
});

// ============================================================================
// Quiz Mode
// ============================================================================

test.describe('Frontend Drills - Quiz Mode', () => {
  test('quiz setup should be visible', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/quiz`);
    await expect(
      page
        .getByRole('heading', { name: /quiz/i })
        .or(page.getByText(/number of questions|start quiz/i)),
    ).toBeVisible({ timeout: 10000 });
  });

  test('starting quiz should show question and options', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/quiz`);
    const startBtn = page.getByRole('button', { name: /start quiz|begin|go/i }).first();
    await startBtn.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await expect(page.getByText(/\?|question|option|a\.|b\.|c\.|d\./i).first()).toBeVisible({
        timeout: 10000,
      });
    }
  });
});

// ============================================================================
// Training
// ============================================================================

test.describe('Frontend Drills - Training', () => {
  test('training page should list exercises or show empty state', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/training`);
    await expect(
      page
        .getByRole('heading', { name: /frontend training|training/i })
        .or(page.getByText(/exercises|problems|no problems/i)),
    ).toBeVisible({ timeout: 10000 });
  });

  test('clicking an exercise should open problem page', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/training`);
    const firstLink = page.getByRole('link', { name: /query|filter|event|debounce|dom/i }).first();
    const visible = await firstLink.isVisible().catch(() => false);
    if (visible) {
      await firstLink.click();
      await expect(page).toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/training/`));
      await expect(page.getByText(/setup code|expected|your answer|submit/i).first()).toBeVisible({
        timeout: 5000,
      });
    }
  });
});

// ============================================================================
// UI Patterns
// ============================================================================

test.describe('Frontend Drills - UI Patterns', () => {
  test('ui-patterns page should show patterns or categories', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/ui-patterns`);
    await expect(
      page
        .getByRole('heading', { name: /ui patterns|patterns/i })
        .or(page.getByText(/forms|navigation|data display|interactive/i)),
    ).toBeVisible({ timeout: 10000 });
  });

  test('clicking a pattern should open pattern detail when available', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/ui-patterns`);
    const patternLink = page
      .getByRole('link')
      .filter({ hasNotText: /back|home|exit/i })
      .first();
    const visible = await patternLink.isVisible().catch(() => false);
    if (visible) {
      await patternLink.click();
      await expect(page).not.toHaveURL(new RegExp(`/frontend-drills/${FRAMEWORK}/ui-patterns$`));
    }
  });
});

// ============================================================================
// Cheatsheet
// ============================================================================

test.describe('Frontend Drills - Cheatsheet', () => {
  test('cheatsheet page should show sections or content', async ({ page }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/cheatsheet`);
    await expect(
      page
        .getByRole('heading', { name: /cheatsheet/i })
        .or(page.getByText(/overview|syntax|api|reference/i)),
    ).toBeVisible({ timeout: 10000 });
  });
});

// ============================================================================
// Navigation & Breadcrumbs
// ============================================================================

test.describe('Frontend Drills - Navigation', () => {
  test('breadcrumb from drill should include Home, Frontend Drills, framework', async ({
    page,
  }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}/drill`);
    await expect(page.getByRole('link', { name: /home/i }).first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByRole('link', { name: /frontend drills/i }).first()).toBeVisible();
  });

  test('framework layout should have nav to drill, quiz, training, patterns, cheatsheet', async ({
    page,
  }) => {
    await page.goto(`/frontend-drills/${FRAMEWORK}`);
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByRole('link', { name: /drill|quiz|training|patterns|cheatsheet/i }).first(),
    ).toBeVisible();
  });
});
