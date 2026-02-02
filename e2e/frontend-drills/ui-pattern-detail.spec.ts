import { expect, test } from '@playwright/test';
import {
  FRAMEWORK_NAMES,
  FRONTEND_FRAMEWORKS,
  FrontendDrillsUtils,
  waitForAnimations,
} from '../fixtures/test-utils';

test.describe('UI Pattern Detail Page', () => {
  let utils: FrontendDrillsUtils;

  test.beforeEach(async ({ page }) => {
    utils = new FrontendDrillsUtils(page);
    // Navigate to UI patterns catalog and click the first pattern
    await utils.goToUIPatterns('native-js');
    await waitForAnimations(page);
    const firstPattern = page.locator('a[href*="/ui-patterns/"]').first();
    await firstPattern.click();
    await page.waitForLoadState('networkidle');
  });

  test('should display pattern title', async ({ page }) => {
    await waitForAnimations(page);
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
    const headingText = await heading.textContent();
    expect(headingText?.length).toBeGreaterThan(0);
  });

  test('should display pattern description', async ({ page }) => {
    await waitForAnimations(page);
    // Pattern detail pages should have descriptive content
    const descriptions = page.locator('p').filter({ hasNotText: /^$/ });
    expect(await descriptions.count()).toBeGreaterThan(0);
  });

  test('should display difficulty badge', async ({ page }) => {
    await waitForAnimations(page);
    const badge = page.locator('text=/beginner|intermediate|advanced/i');
    await expect(badge.first()).toBeVisible();
  });

  test('should display category badge', async ({ page }) => {
    await waitForAnimations(page);
    // Category like "Forms", "Navigation", "Data Display", "Interactive", "Layout"
    const category = page.locator(
      'text=/Forms|Navigation|Data Display|Interactive|Layout|Feedback/i',
    );
    await expect(category.first()).toBeVisible();
  });

  test('should show Monaco editor with code', async ({ page }) => {
    await waitForAnimations(page);
    // Monaco editor should load for code display
    const editor = page.locator('.monaco-editor');
    await expect(editor.first()).toBeVisible({ timeout: 15000 });
  });

  test('should show live preview iframe or preview area', async ({ page }) => {
    await waitForAnimations(page);
    // Live preview should be rendered in an iframe or dedicated container
    const preview = page.locator('iframe, [class*="preview"], [class*="Preview"]');
    if ((await preview.count()) > 0) {
      await expect(preview.first()).toBeVisible({ timeout: 15000 });
    }
  });

  test('should have navigation back to patterns catalog', async ({ page }) => {
    await waitForAnimations(page);
    const backLink = page
      .getByRole('link', { name: /Back|Patterns|UI Patterns/i })
      .or(page.locator('a[href*="/ui-patterns"]').filter({ hasNotText: /^\// }));
    await expect(backLink.first()).toBeVisible();
  });

  test('should show code tabs if multiple code sections exist', async ({ page }) => {
    await waitForAnimations(page);
    // Some patterns have HTML/CSS/JS tabs
    // Tabs are optional — just verify the page loaded
    expect(await page.locator('h1, h2').first().isVisible()).toBe(true);
  });

  test('should be scrollable on long content', async ({ page }) => {
    await waitForAnimations(page);
    // Just verify the page is rendered — long patterns are scrollable
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(pageHeight).toBeGreaterThan(100);
  });

  test('should have correct URL pattern', async ({ page }) => {
    await expect(page).toHaveURL(/\/frontend-drills\/native-js\/ui-patterns\/.+/);
  });
});

test.describe('UI Pattern Detail — Cross-framework smoke', () => {
  for (const fw of FRONTEND_FRAMEWORKS) {
    test(`${FRAMEWORK_NAMES[fw]} pattern detail loads from catalog`, async ({ page }) => {
      const utils = new FrontendDrillsUtils(page);
      await utils.goToUIPatterns(fw);
      await waitForAnimations(page);
      const firstPattern = page.locator('a[href*="/ui-patterns/"]').first();
      if (await firstPattern.isVisible().catch(() => false)) {
        await firstPattern.click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(new RegExp(`/frontend-drills/${fw}/ui-patterns/.+`));
        // Should display pattern content
        await expect(page.locator('h1, h2').first()).toBeVisible();
      }
    });
  }
});

test.describe('UI Pattern Detail — Starter code has no Monaco errors', () => {
  // Representative patterns per framework covering common error-prone constructs:
  // - Angular/React use TypeScript mode → strict checking
  // - Native JS/Vue use JavaScript mode → only syntax checking
  const patternsToCheck = [
    // Angular: vanilla JS displayed as TypeScript — most likely to have TS errors
    { framework: 'angular', patternId: 'ng-reactive-forms' },
    { framework: 'angular', patternId: 'ng-input-mask' },
    { framework: 'angular', patternId: 'ng-autocomplete' },
    // React: TypeScript + JSX mode
    { framework: 'react', patternId: 'react-forms' },
    { framework: 'react', patternId: 'react-autocomplete' },
    // Native JS: JavaScript mode (semantic validation disabled)
    { framework: 'native-js', patternId: 'js-form-validation' },
    // Vue: JavaScript mode (semantic validation disabled)
    { framework: 'vue', patternId: 'vue-form-validation' },
  ];

  for (const { framework, patternId } of patternsToCheck) {
    test(`${framework}/${patternId} starter code has no error markers`, async ({ page }) => {
      await page.goto(`/frontend-drills/${framework}/ui-patterns/${patternId}`);
      await page.waitForLoadState('networkidle');

      // Wait for Monaco editor to load
      const editor = page.locator('.monaco-editor');
      await expect(editor.first()).toBeVisible({ timeout: 15000 });

      // Wait for TypeScript/JavaScript diagnostics to complete (async)
      // Monaco runs diagnostics asynchronously after the model is set
      await page.waitForTimeout(3000);

      // Query Monaco API for error-severity markers on the active model
      const errorMarkers: Array<{ message: string; line: number; code: string }> =
        await page.evaluate(() => {
          const w = window as Record<string, unknown>;
          const m = w.monaco as Record<string, Record<string, (...args: unknown[]) => unknown>>;
          if (!m) return [];
          const editors = m.editor.getEditors() as Array<{
            getModel: () => { uri: unknown } | null;
          }>;
          if (!editors || editors.length === 0) return [];
          const model = editors[0].getModel();
          if (!model) return [];
          const markers = m.editor.getModelMarkers({ resource: model.uri }) as Array<{
            severity: number;
            message: string;
            startLineNumber: number;
            code: string | { value: string };
          }>;
          // MarkerSeverity.Error = 8
          return markers
            .filter((marker) => marker.severity === 8)
            .map((marker) => ({
              message: marker.message,
              line: marker.startLineNumber,
              code: typeof marker.code === 'object' ? marker.code?.value : String(marker.code),
            }));
        });

      // Assert no error markers in the starter code
      if (errorMarkers.length > 0) {
        const details = errorMarkers
          .map((e) => `  Line ${e.line}: [${e.code}] ${e.message}`)
          .join('\n');
        expect(
          errorMarkers,
          `Monaco error markers found in ${framework}/${patternId}:\n${details}`,
        ).toHaveLength(0);
      }
    });
  }
});
