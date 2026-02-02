import { expect, test } from '@playwright/test';
import { waitForAnimations } from '../fixtures/test-utils';

const FRONTEND_DRILLS_BASE = '/frontend-drills';
const FRAMEWORKS = ['native-js', 'react', 'angular', 'vue'] as const;
const FRAMEWORK_NAMES: Record<(typeof FRAMEWORKS)[number], string> = {
  'native-js': 'Native JavaScript',
  react: 'React',
  angular: 'Angular',
  vue: 'Vue',
};

test.describe('Frontend Drills - Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_DRILLS_BASE);
    await page.waitForLoadState('networkidle');
  });

  test('should load the frontend drills landing page', async ({ page }) => {
    await expect(page).toHaveURL(FRONTEND_DRILLS_BASE);
    const heading = page.getByRole('heading', { name: /Frontend Drills/i, level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should display hero title and description', async ({ page }) => {
    await waitForAnimations(page);
    await expect(
      page.getByText(/Master frontend frameworks with hands-on practice/i),
    ).toBeVisible();
    await expect(
      page.getByText(/Build real-world components, practice framework patterns/i),
    ).toBeVisible();
  });

  test('should display Back to Home link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/');
  });

  test('should display all four framework cards', async ({ page }) => {
    await waitForAnimations(page);
    for (const fw of FRAMEWORKS) {
      const card = page.locator(`a[href="${FRONTEND_DRILLS_BASE}/${fw}"]`);
      await expect(card).toBeVisible();
      await expect(card).toContainText(FRAMEWORK_NAMES[fw].split(' ')[0]);
    }
  });

  test("should display What You'll Practice section", async ({ page }) => {
    await waitForAnimations(page);
    await expect(page.getByRole('heading', { level: 2 })).toContainText(
      /What You'll Practice|Practice/i,
    );
    await expect(page.getByText(/Code Drills/i)).toBeVisible();
    await expect(page.getByText(/Framework Quizzes|Quizzes/i)).toBeVisible();
    await expect(page.getByText(/UI Patterns/i)).toBeVisible();
    await expect(page.getByText(/Cheatsheets/i)).toBeVisible();
  });

  test('should navigate to framework hub when clicking a framework card', async ({ page }) => {
    await waitForAnimations(page);
    await page.getByRole('link', { name: /React/i }).first().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${FRONTEND_DRILLS_BASE}/react`);
    await expect(page.getByRole('heading', { name: 'React', level: 1 })).toBeVisible();
  });
});

test.describe('Frontend Drills - Framework Hub', () => {
  for (const framework of FRAMEWORKS) {
    test(`${framework} hub should load and show framework name and mode cards`, async ({
      page,
    }) => {
      await page.goto(`${FRONTEND_DRILLS_BASE}/${framework}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${FRONTEND_DRILLS_BASE}/${framework}`);

      const name = FRAMEWORK_NAMES[framework];
      await expect(
        page.getByRole('heading', { name: new RegExp(name, 'i'), level: 1 }),
      ).toBeVisible();

      await expect(page.getByRole('link', { name: /Start Drilling/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Start Quiz/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Start Training/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Browse Patterns/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /View Cheatsheet/i })).toBeVisible();
    });
  }

  test('should show layout nav with Drill, Quiz, Training, UI Patterns, Cheatsheet', async ({
    page,
  }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react`);
    await page.waitForLoadState('networkidle');

    const nav = page.locator('nav');
    await expect(nav.getByRole('link', { name: 'Drill' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Quiz' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Training' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'UI Patterns' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Cheatsheet' })).toBeVisible();
  });

  test('should show breadcrumbs: Coding Drills / Frontend / Framework', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('link', { name: /Coding Drills/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Frontend/i })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: /React/i })).toBeVisible();
  });

  test('invalid framework should show not-found or redirect', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/invalid-framework`);
    await page.waitForLoadState('networkidle');
    const url = page.url();
    const body = await page.locator('body').textContent();
    const isNotFound =
      /not-found|404/.test(url) || /not found|page not found|404/i.test(body ?? '');
    expect(isNotFound).toBe(true);
  });
});

test.describe('Frontend Drills - Drill Mode', () => {
  test('React drill setup should show categories and Start Drilling', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/drill`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: /Drill Mode/i, level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Categories', level: 2 })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Number of Questions', level: 2 }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Difficulty', level: 2 })).toBeVisible();

    const startBtn = page.getByRole('button', { name: /Start Drilling/i });
    await expect(startBtn).toBeVisible();
  });

  test('can start a drill and see first question (React)', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/drill`);
    await page.waitForLoadState('networkidle');

    const startBtn = page.getByRole('button', { name: /Start Drilling/i });
    await startBtn.click();
    await page.waitForLoadState('networkidle');

    await expect(page.getByText(/Question 1 of \d+/)).toBeVisible({ timeout: 10000 });
    const editor = page.locator('.monaco-editor').or(page.locator('textarea')).first();
    await expect(editor).toBeVisible({ timeout: 10000 });
  });

  test('can submit correct answer and see feedback (React useState)', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/drill`);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /Start Drilling/i }).click();
    await page.waitForLoadState('networkidle');

    await expect(page.getByText(/Question 1 of/)).toBeVisible({ timeout: 10000 });
    const editor = page.locator('.monaco-editor').or(page.locator('textarea')).first();
    await editor.click();
    await page.keyboard.type('useState(42)[0]');
    await page.getByRole('button', { name: /Submit|Check|Run/i }).click();

    await expect(
      page.getByText(/correct|passed|success|well done/i).or(page.getByText(/Score|Points/i)),
    ).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Frontend Drills - Quiz Mode', () => {
  test('React quiz should show start screen or first question', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/quiz`);
    await page.waitForLoadState('networkidle');

    const startBtn = page.getByRole('button', { name: /Start Quiz|Start|Begin|Go/i });
    const questionHeading = page.getByRole('heading', { level: 2 });
    await expect(startBtn.or(questionHeading)).toBeVisible({ timeout: 15000 });
  });

  test('can start quiz and see question with options', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/quiz`);
    await page.waitForLoadState('networkidle');

    const startBtn = page.getByRole('button', { name: /Start|Begin|Go/i });
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForLoadState('networkidle');
    }

    await expect(page.getByRole('heading', { level: 2 }).or(page.getByText(/\?/))).toBeVisible({
      timeout: 10000,
    });
  });
});

test.describe('Frontend Drills - Training', () => {
  test('React training should list problems', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/training`);
    await page.waitForLoadState('networkidle');

    await expect(
      page
        .getByRole('heading', { name: /Training|Exercises|React/i })
        .or(page.getByText(/Progress|problem|exercise/i)),
    ).toBeVisible({ timeout: 10000 });

    const problemLinks = page
      .locator('a[href*="/training/"]')
      .filter({ hasText: /useState|useEffect|useRef|useMemo|Basic|Usage/i });
    await expect(problemLinks.first()).toBeVisible({ timeout: 8000 });
  });

  test('can open a training problem and see prompt', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/training`);
    await page.waitForLoadState('networkidle');

    const firstProblem = page.locator('a[href*="/training/"]').first();
    await firstProblem.click();
    await page.waitForLoadState('networkidle');

    await expect(
      page.getByText(/useState|useEffect|useRef|Call useState|Return|initial/i),
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Frontend Drills - UI Patterns', () => {
  test('React UI patterns should show list or categories', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/ui-patterns`);
    await page.waitForLoadState('networkidle');

    const hasPatternLink = await page
      .locator('a[href*="/ui-patterns/"]')
      .first()
      .isVisible()
      .catch(() => false);
    const hasHeading = await page
      .getByRole('heading', { level: 2 })
      .first()
      .isVisible()
      .catch(() => false);
    expect(hasPatternLink || hasHeading).toBe(true);
  });

  test('can open a UI pattern and see content', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/ui-patterns`);
    await page.waitForLoadState('networkidle');

    const patternLink = page
      .getByRole('link')
      .filter({ hasText: /button|form|modal|input/i })
      .first();
    if (await patternLink.isVisible()) {
      await patternLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('main')).toBeVisible();
    }
  });
});

test.describe('Frontend Drills - Cheatsheet', () => {
  test('React cheatsheet should load and show sections', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/cheatsheet`);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(`${FRONTEND_DRILLS_BASE}/react/cheatsheet`);
    await expect(
      page.getByRole('heading', { level: 1 }).or(page.getByRole('heading', { level: 2 })),
    ).toBeVisible({
      timeout: 10000,
    });
  });
});

test.describe('Frontend Drills - Navigation', () => {
  test('can navigate from landing to React hub to Drill and back via breadcrumbs', async ({
    page,
  }) => {
    await page.goto(FRONTEND_DRILLS_BASE);
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: /React/i }).first().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${FRONTEND_DRILLS_BASE}/react`);

    await page.getByRole('link', { name: /Start Drilling/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${FRONTEND_DRILLS_BASE}/react/drill`);

    await page.getByRole('link', { name: 'React' }).first().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${FRONTEND_DRILLS_BASE}/react`);
  });

  test('FrameworkSwitcher allows switching framework from drill', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react/drill`);
    await page.waitForLoadState('networkidle');

    const vueLink = page.getByRole('link', { name: /Vue/i }).first();
    if (await vueLink.isVisible()) {
      await vueLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/frontend-drills\/vue\//);
    }
  });
});

test.describe('Frontend Drills - Accessibility', () => {
  test('landing page has h1 and accessible structure', async ({ page }) => {
    await page.goto(FRONTEND_DRILLS_BASE);
    await page.waitForLoadState('networkidle');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Frontend Drills/i);
  });

  test('framework hub has accessible links', async ({ page }) => {
    await page.goto(`${FRONTEND_DRILLS_BASE}/react`);
    await page.waitForLoadState('networkidle');
    const startDrilling = page.getByRole('link', { name: /Start Drilling/i });
    await expect(startDrilling).toBeVisible();
    await expect(startDrilling).toHaveAttribute('href', `${FRONTEND_DRILLS_BASE}/react/drill`);
  });
});
