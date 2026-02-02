import { expect, test } from '@playwright/test';

/**
 * E2E tests for Frontend Drills cheatsheet (/frontend-drills/[framework]/cheatsheet).
 */

const FRAMEWORKS = ['react', 'vue', 'native-js', 'angular'] as const;

test.describe('Frontend Drills - Cheatsheet', () => {
  for (const framework of FRAMEWORKS) {
    test.describe(`Framework: ${framework}`, () => {
      const CHEATSHEET_URL = `/frontend-drills/${framework}/cheatsheet`;

      test.beforeEach(async ({ page }) => {
        await page.goto(CHEATSHEET_URL);
        await page.waitForLoadState('networkidle');
      });

      test('should load cheatsheet page', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`${CHEATSHEET_URL.replace(/\/$/, '')}(/)?$`));
        await expect(page.locator('h1').first()).toBeVisible();
      });

      test('should display cheatsheet content (sections or code)', async ({ page }) => {
        const hasContent =
          (await page.locator('pre, code').first().isVisible()) ||
          (await page.getByRole('heading', { level: 2 }).isVisible()) ||
          (await page.locator('section, article').first().isVisible()) ||
          (await page.getByText(/useState|ref|v-model|@Input|directive/i).isVisible());
        expect(hasContent).toBeTruthy();
      });

      test('should have navigation back to framework or frontend drills', async ({ page }) => {
        const backLink = page
          .getByRole('link', { name: /Frontend Drills|Back|Exit/i })
          .or(page.locator(`a[href="/frontend-drills/${framework}"]`))
          .first();
        await expect(backLink).toBeVisible();
      });
    });
  }
});
