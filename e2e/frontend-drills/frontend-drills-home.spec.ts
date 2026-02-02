import { expect, test } from '@playwright/test';

/**
 * E2E tests for Frontend Drills landing page (/frontend-drills).
 * Covers hero, framework cards, feature section, and navigation.
 */

const FRONTEND_DRILLS_URL = '/frontend-drills';

test.describe('Frontend Drills - Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_DRILLS_URL);
    await page.waitForLoadState('networkidle');
  });

  test('should load the frontend drills page successfully', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(`${FRONTEND_DRILLS_URL}(/)?$`));
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Frontend Drills');
  });

  test('should display hero section with title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Frontend Drills/i })).toBeVisible();
    await expect(
      page.getByText(/Master frontend frameworks with hands-on practice/i),
    ).toBeVisible();
    await expect(
      page.getByText(/Build real-world components, practice framework patterns/i),
    ).toBeVisible();
  });

  test('should have Back to Home link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Home/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/');
  });

  test('should display all four framework cards', async ({ page }) => {
    const frameworkNames = ['Native JavaScript', 'React', 'Angular', 'Vue'];
    for (const name of frameworkNames) {
      const card = page.getByRole('link', { name: new RegExp(name, 'i') });
      await expect(card).toBeVisible();
    }
  });

  test('should link each framework card to its framework page', async ({ page }) => {
    const frameworks = ['native-js', 'react', 'angular', 'vue'];
    for (const fw of frameworks) {
      const link = page.locator(`a[href="/frontend-drills/${fw}"]`).first();
      await expect(link).toBeVisible();
    }
  });

  test("should display What You'll Practice section", async ({ page }) => {
    await expect(page.getByRole('heading', { name: /What You'll Practice/i })).toBeVisible();
    await expect(page.getByText(/Code Drills/i)).toBeVisible();
    await expect(page.getByText(/Framework Quizzes/i)).toBeVisible();
    await expect(page.getByText(/UI Patterns/i)).toBeVisible();
    await expect(page.getByText(/Cheatsheets/i)).toBeVisible();
  });

  test('should show challenge count on each framework card', async ({ page }) => {
    const cards = page.locator('a[href^="/frontend-drills/"]').filter({ has: page.locator('h3') });
    const count = await cards.count();
    expect(count).toBe(4);
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.getByText(/\d+ challenges?/)).toBeVisible();
    }
  });

  test('should navigate to React framework when clicking React card', async ({ page }) => {
    await page.getByRole('link', { name: /React/i }).first().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/frontend-drills\/react\/?$/);
    await expect(page.getByRole('heading', { name: /React/i })).toBeVisible();
  });
});
