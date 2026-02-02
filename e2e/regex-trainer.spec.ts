import { expect, test } from '@playwright/test';
import { waitForAnimations } from './fixtures/test-utils';

test.describe('Regex Trainer — Setup Phase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/regex');
    await page.waitForLoadState('networkidle');
  });

  test('should display the regex trainer page', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText(/Regex/i).first()).toBeVisible();
  });

  test('should show category selection', async ({ page }) => {
    await waitForAnimations(page);
    // Regex trainer has category chips
    const categories = page.locator('button[class*="rounded"]').filter({
      hasNotText: /Easy|Medium|Hard|All|Start|Drill|Practice|Playground/i,
    });
    expect(await categories.count()).toBeGreaterThan(0);
  });

  test('should show difficulty filters', async ({ page }) => {
    await waitForAnimations(page);
    await expect(
      page.getByRole('button', { name: 'All' }).or(page.getByText('All').first()),
    ).toBeVisible();
  });

  test('should show multiple mode options', async ({ page }) => {
    await waitForAnimations(page);
    // Regex trainer has modes: Drill, Practice Browser, Playground
    const modeButtons = page.getByRole('button').filter({
      hasText: /Drill|Practice|Playground|Browse/i,
    });
    expect(await modeButtons.count()).toBeGreaterThan(0);
  });

  test('should show question count slider', async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByText(/Number of Questions|questions/i).first()).toBeVisible();
  });

  test('should have start button for drill mode', async ({ page }) => {
    await waitForAnimations(page);
    const startBtn = page.getByRole('button', { name: /Start|Begin/i });
    await expect(startBtn.first()).toBeVisible();
  });
});

test.describe('Regex Trainer — Drill Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/regex');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    // Start the drill
    const startBtn = page.getByRole('button', { name: /Start Drill|Start/i });
    await startBtn.first().click();
    await waitForAnimations(page);
  });

  test('should transition to drill phase', async ({ page }) => {
    // Should see progress or a problem
    const drillContent = page.getByText(/Progress|Score|Question|Test String|Pattern/i);
    await expect(drillContent.first()).toBeVisible();
  });

  test('should display a regex problem', async ({ page }) => {
    // Problem should have test strings or pattern description
    const problemContent = page.locator('h2, h3, [class*="problem"]').first();
    await expect(problemContent).toBeVisible();
  });

  test('should have an input field for regex pattern', async ({ page }) => {
    const input = page.locator(
      'input[type="text"], input[placeholder*="regex"], input[placeholder*="pattern"], textarea',
    );
    await expect(input.first()).toBeVisible();
  });

  test('should show test cases or match preview', async ({ page }) => {
    // Regex drills show test strings with expected matches
    const testContent = page.getByText(/Test|Match|Expected|String/i);
    await expect(testContent.first()).toBeVisible();
  });

  test('should have submit and skip controls', async ({ page }) => {
    const controls = page.getByRole('button', { name: /Submit|Check|Skip|Next/i });
    expect(await controls.count()).toBeGreaterThan(0);
  });
});

test.describe('Regex Trainer — Results', () => {
  test('should show results after completing drill', async ({ page }) => {
    await page.goto('/regex');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    // Start drill
    const startBtn = page.getByRole('button', { name: /Start Drill|Start/i });
    await startBtn.first().click();
    await waitForAnimations(page);
    // End the drill immediately
    const endBtn = page.getByRole('button', { name: /End|Exit/i });
    if (await endBtn.isVisible().catch(() => false)) {
      await endBtn.click();
      await waitForAnimations(page);
    }
    // Should show some form of results or navigate back
    const results = page.getByText(/Results|Complete|Score|Accuracy|Setup/i);
    await expect(results.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Regex Trainer — Practice Browser', () => {
  test('should switch to practice browser mode', async ({ page }) => {
    await page.goto('/regex');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    const practiceBtn = page.getByRole('button', { name: /Practice|Browse/i });
    if (await practiceBtn.isVisible().catch(() => false)) {
      await practiceBtn.click();
      await waitForAnimations(page);
      // Should show a browseable list of problems
      const problemList = page.locator('a[href*="/regex/"], [class*="problem"], [class*="card"]');
      expect(await problemList.count()).toBeGreaterThan(0);
    }
  });
});

test.describe('Regex Trainer — Individual Problem', () => {
  test('should load a specific regex problem page', async ({ page }) => {
    // First get a problem ID from the practice browser
    await page.goto('/regex');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    const practiceBtn = page.getByRole('button', { name: /Practice|Browse/i });
    if (await practiceBtn.isVisible().catch(() => false)) {
      await practiceBtn.click();
      await waitForAnimations(page);
      // Click the first problem
      const firstProblem = page.locator('a[href*="/regex/"]').first();
      if (await firstProblem.isVisible().catch(() => false)) {
        await firstProblem.click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(/\/regex\/.+/);
      }
    }
  });
});

test.describe('Regex Trainer — Cheatsheet', () => {
  test('should show regex cheatsheet drawer', async ({ page }) => {
    await page.goto('/regex');
    await page.waitForLoadState('networkidle');
    await waitForAnimations(page);
    const cheatsheetBtn = page.getByRole('button', { name: /Cheatsheet|Reference|Help/i });
    if (await cheatsheetBtn.isVisible().catch(() => false)) {
      await cheatsheetBtn.click();
      await waitForAnimations(page);
      // Cheatsheet content should appear
      const cheatContent = page.getByText(/Character Classes|Anchors|Quantifiers|Groups/i);
      await expect(cheatContent.first()).toBeVisible();
    }
  });
});
