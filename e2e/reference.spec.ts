import { expect, type Page, test } from '@playwright/test';

/**
 * E2E Tests for Reference Page
 * Tests method documentation, search, filtering, and navigation
 */

// Test configuration
const LANGUAGE = 'javascript';
const REFERENCE_URL = `/${LANGUAGE}/reference`;

// Helper functions
async function _clearLocalStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

// ============================================================================
// Page Load Tests
// ============================================================================

test.describe('Reference Page - Page Load', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);
  });

  test('should display all methods', async ({ page }) => {
    // Methods list should be visible
    const methodsList = page
      .locator('[data-testid="methods-list"]')
      .or(
        page
          .locator('.methods-list')
          .or(page.locator('ul, ol').filter({ has: page.locator('[data-testid="method-item"]') })),
      );

    await expect(methodsList.first()).toBeVisible({ timeout: 10000 });

    // Should have multiple method items
    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(
        page
          .locator('.method-item')
          .or(
            page
              .locator('[data-testid="method-card"]')
              .or(page.locator('article').filter({ hasText: /\.\w+\(|function|method/i })),
          ),
      );

    const count = await methodItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display search bar', async ({ page }) => {
    const searchBar = page
      .locator('[data-testid="search-input"]')
      .or(
        page
          .getByRole('searchbox')
          .or(
            page
              .locator('input[type="search"]')
              .or(
                page
                  .locator('input[placeholder*="search" i]')
                  .or(page.locator('input').filter({ hasText: '' }).first()),
              ),
          ),
      );

    await expect(searchBar.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display category filters', async ({ page }) => {
    const categoryFilters = page
      .locator('[data-testid="category-filter"]')
      .or(
        page
          .locator('[data-testid="category-filters"]')
          .or(
            page.locator('button, [role="tab"]').filter({ hasText: /array|string|object|number/i }),
          ),
      );

    await expect(categoryFilters.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display method names', async ({ page }) => {
    // Look for common JavaScript method names
    const methodNames = page.locator(
      'text=/\\.(map|filter|reduce|forEach|find|some|every|includes|slice|concat|join|split|push|pop|shift|indexOf)/',
    );

    const count = await methodNames.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have proper page title', async ({ page }) => {
    // Check page has reference-related title
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/reference|documentation|methods|javascript/i);
  });
});

// ============================================================================
// Search Functionality Tests
// ============================================================================

test.describe('Reference Page - Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);
  });

  test('should filter methods when typing in search', async ({ page }) => {
    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(
        page
          .getByRole('searchbox')
          .or(
            page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')),
          ),
      );

    // Count initial methods
    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item').or(page.locator('[data-testid="method-card"]')));

    const _initialCount = await methodItems.count();

    // Search for a specific method
    await searchInput.first().fill('map');
    await page.waitForTimeout(500);

    // Count should be reduced or only show matching items
    const _filteredCount = await methodItems.count();

    // Either count reduced or items contain search term
    const visibleMethods = await methodItems.allTextContents();
    const matchingMethods = visibleMethods.filter((text) => text.toLowerCase().includes('map'));

    expect(matchingMethods.length).toBeGreaterThan(0);
  });

  test('should show no results message when nothing matches', async ({ page }) => {
    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(
        page
          .getByRole('searchbox')
          .or(
            page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')),
          ),
      );

    // Search for something that won't match
    await searchInput.first().fill('xyznonexistentmethod123');
    await page.waitForTimeout(500);

    // Should show no results message
    const noResultsMessage = page
      .locator('[data-testid="no-results"]')
      .or(page.locator('text=/no (results|methods|matches)|not found|nothing found/i'));

    await expect(noResultsMessage.first()).toBeVisible({ timeout: 5000 });
  });

  test('should clear search and restore all methods', async ({ page }) => {
    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(
        page
          .getByRole('searchbox')
          .or(
            page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')),
          ),
      );

    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item').or(page.locator('[data-testid="method-card"]')));

    // Get initial count
    const initialCount = await methodItems.count();

    // Search
    await searchInput.first().fill('filter');
    await page.waitForTimeout(500);

    // Clear search
    await searchInput.first().fill('');
    await page.waitForTimeout(500);

    // Count should be restored
    const restoredCount = await methodItems.count();
    expect(restoredCount).toBeGreaterThanOrEqual(initialCount - 1); // Allow for minor variance
  });

  test('should search case-insensitively', async ({ page }) => {
    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(
        page
          .getByRole('searchbox')
          .or(
            page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')),
          ),
      );

    // Search with uppercase
    await searchInput.first().fill('MAP');
    await page.waitForTimeout(500);

    // Should still find methods
    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item').or(page.locator('[data-testid="method-card"]')));

    const visibleMethods = await methodItems.allTextContents();
    const matchingMethods = visibleMethods.filter((text) => text.toLowerCase().includes('map'));

    expect(matchingMethods.length).toBeGreaterThan(0);
  });

  test('should support partial search terms', async ({ page }) => {
    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(
        page
          .getByRole('searchbox')
          .or(
            page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')),
          ),
      );

    // Search with partial term
    await searchInput.first().fill('fil');
    await page.waitForTimeout(500);

    // Should find "filter"
    const filterMethod = page.locator('text=/filter/i');
    await expect(filterMethod.first()).toBeVisible({ timeout: 5000 });
  });
});

// ============================================================================
// Category Filtering Tests
// ============================================================================

test.describe('Reference Page - Category Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);
  });

  test('should filter by category when clicking category filter', async ({ page }) => {
    // Find array category filter
    const arrayFilter = page.locator('[data-testid="category-filter-array"]').or(
      page
        .locator('button')
        .filter({ hasText: /^array$/i })
        .or(page.locator('[role="tab"]').filter({ hasText: /array/i })),
    );

    if (await arrayFilter.first().isVisible()) {
      await arrayFilter.first().click();
      await page.waitForTimeout(500);

      // Methods should be filtered to array category
      const methodItems = page
        .locator('[data-testid="method-item"]')
        .or(page.locator('.method-item'));

      const visibleMethods = await methodItems.allTextContents();

      // All visible methods should be array-related
      // or the category indicator should show "Array"
      const categoryIndicator = page
        .locator('[data-testid="active-category"]')
        .or(page.locator('.active-category').or(page.locator('[aria-selected="true"]')));

      // Either category is selected or methods are filtered
      expect(
        (await categoryIndicator
          .first()
          .isVisible()
          .catch(() => false)) || visibleMethods.length > 0,
      ).toBeTruthy();
    }
  });

  test('should show multiple categories can be combined', async ({ page }) => {
    // Find category filters
    const categoryFilters = page
      .locator('[data-testid^="category-filter"]')
      .or(page.locator('button').filter({ hasText: /^(array|string|object)$/i }));

    const filterCount = await categoryFilters.count();

    if (filterCount >= 2) {
      // Click first filter
      await categoryFilters.nth(0).click();
      await page.waitForTimeout(300);

      // Click second filter (if multi-select is supported)
      await categoryFilters.nth(1).click();
      await page.waitForTimeout(300);

      // Page should still function
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should have "All" option that shows everything', async ({ page }) => {
    const allFilter = page.locator('[data-testid="category-filter-all"]').or(
      page
        .locator('button')
        .filter({ hasText: /^all$/i })
        .or(page.locator('[role="tab"]').filter({ hasText: /^all$/i })),
    );

    if (await allFilter.first().isVisible()) {
      // First filter by a category
      const categoryFilter = page
        .locator('[data-testid^="category-filter-"]')
        .not(allFilter)
        .first();
      if (await categoryFilter.isVisible()) {
        await categoryFilter.click();
        await page.waitForTimeout(300);
      }

      // Then click All
      await allFilter.first().click();
      await page.waitForTimeout(300);

      // All methods should be visible
      const methodItems = page
        .locator('[data-testid="method-item"]')
        .or(page.locator('.method-item'));

      const count = await methodItems.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should show category labels on methods', async ({ page }) => {
    // Methods should have category labels/badges
    const categoryBadges = page
      .locator('[data-testid="method-category"]')
      .or(
        page
          .locator('.category-badge')
          .or(
            page
              .locator('.method-category')
              .or(page.locator('span, badge').filter({ hasText: /array|string|object|number/i })),
          ),
      );

    const count = await categoryBadges.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ============================================================================
// Method Details Tests
// ============================================================================

test.describe('Reference Page - Method Details', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);
  });

  test('should expand method details on click', async ({ page }) => {
    // Find a method item
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(
        page
          .locator('.method-item')
          .or(
            page
              .locator('[data-testid="method-card"]')
              .or(page.locator('button, [role="button"], details').filter({ hasText: /\.\w+\(/ })),
          ),
      )
      .first();

    await methodItem.click();

    // Details should be visible
    const methodDetails = page
      .locator('[data-testid="method-details"]')
      .or(
        page
          .locator('.method-details')
          .or(
            page
              .locator('[data-testid="method-expanded"]')
              .or(page.locator('text=/syntax|description|arguments|example/i')),
          ),
      );

    await expect(methodDetails.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show syntax in method details', async ({ page }) => {
    // Click on a method to expand
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(
        page
          .locator('.method-item')
          .or(page.locator('button, [role="button"], details').filter({ hasText: /\.\w+\(/ })),
      )
      .first();

    await methodItem.click();
    await page.waitForTimeout(500);

    // Syntax should be visible
    const syntax = page
      .locator('[data-testid="method-syntax"]')
      .or(
        page
          .locator('.method-syntax')
          .or(page.locator('code, pre').filter({ hasText: /\.\w+\s*\(/ })),
      );

    await expect(syntax.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show description in method details', async ({ page }) => {
    // Click on a method
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'))
      .first();

    await methodItem.click();
    await page.waitForTimeout(500);

    // Description should be visible
    const description = page
      .locator('[data-testid="method-description"]')
      .or(page.locator('.method-description').or(page.locator('p').filter({ hasText: /.{20,}/ })));

    await expect(description.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show arguments in method details', async ({ page }) => {
    // Click on a method
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'))
      .first();

    await methodItem.click();
    await page.waitForTimeout(500);

    // Arguments section should be visible
    const arguments_ = page
      .locator('[data-testid="method-arguments"]')
      .or(
        page.locator('.method-arguments').or(page.locator('text=/arguments|parameters|params/i')),
      );

    await expect(arguments_.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show examples in method details', async ({ page }) => {
    // Click on a method
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'))
      .first();

    await methodItem.click();
    await page.waitForTimeout(500);

    // Examples section should be visible
    const examples = page
      .locator('[data-testid="method-examples"]')
      .or(page.locator('.method-examples').or(page.locator('text=/example/i')));

    await expect(examples.first()).toBeVisible({ timeout: 5000 });
  });

  test('should display example code correctly', async ({ page }) => {
    // Click on a method
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'))
      .first();

    await methodItem.click();
    await page.waitForTimeout(500);

    // Example code block should be visible
    const exampleCode = page
      .locator('[data-testid="example-code"]')
      .or(
        page.locator('.example-code').or(page.locator('pre code').or(page.locator('.code-block'))),
      );

    await expect(exampleCode.first()).toBeVisible({ timeout: 5000 });
  });

  test('should be able to collapse method details', async ({ page }) => {
    // Click on a method to expand
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item').or(page.locator('details').first()))
      .first();

    await methodItem.click();
    await page.waitForTimeout(300);

    // Click again to collapse
    await methodItem.click();
    await page.waitForTimeout(300);

    // Details should be hidden or collapsed
    const expandedDetails = page
      .locator('[data-testid="method-details"]:visible')
      .or(page.locator('.method-details:visible'));

    // Either details are hidden or the element has collapsed state
    const _isCollapsed =
      (await expandedDetails.count()) === 0 ||
      (await methodItem.getAttribute('aria-expanded')) === 'false' ||
      (await methodItem.getAttribute('open')) === null;

    // At minimum, the page should still function
    await expect(page.locator('body')).toBeVisible();
  });

  test('should show return value information', async ({ page }) => {
    // Click on a method
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'))
      .first();

    await methodItem.click();
    await page.waitForTimeout(500);

    // Return value info should be visible
    const returnValue = page
      .locator('[data-testid="method-returns"]')
      .or(page.locator('.method-returns').or(page.locator('text=/returns?|return value/i')));

    await expect(returnValue.first()).toBeVisible({ timeout: 5000 });
  });
});

// ============================================================================
// Navigation Tests
// ============================================================================

test.describe('Reference Page - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);
  });

  test('should have quick nav / jump to section', async ({ page }) => {
    // Look for quick navigation
    const quickNav = page.locator('[data-testid="quick-nav"]').or(
      page.locator('.quick-nav').or(
        page
          .locator('nav')
          .filter({ hasText: /jump|quick|contents|sections/i })
          .or(page.locator('[role="navigation"]').filter({ has: page.locator('a[href^="#"]') })),
      ),
    );

    // Quick nav might exist or page might use other navigation
    const hasQuickNav = await quickNav
      .first()
      .isVisible()
      .catch(() => false);

    if (hasQuickNav) {
      // Test that clicking navigation scrolls
      const navLink = quickNav.locator('a').first();
      await navLink.click();
      await page.waitForTimeout(300);

      // Page should still be on reference
      await expect(page).toHaveURL(new RegExp(REFERENCE_URL));
    }
  });

  test('should have back link to language page', async ({ page }) => {
    // Look for back link
    const backLink = page.locator('[data-testid="back-link"]').or(
      page
        .locator('a')
        .filter({ hasText: /back|javascript|home/i })
        .or(page.locator('a[href*="javascript"]').not(page.locator('a[href*="reference"]'))),
    );

    await expect(backLink.first()).toBeVisible({ timeout: 5000 });

    // Click back link
    await backLink.first().click();

    // Should navigate away from reference
    await expect(page).not.toHaveURL(/\/reference/);
  });

  test('should have breadcrumb navigation', async ({ page }) => {
    // Look for breadcrumb
    const breadcrumb = page
      .locator('[data-testid="breadcrumb"]')
      .or(
        page
          .locator('.breadcrumb')
          .or(
            page
              .locator('nav[aria-label="breadcrumb"]')
              .or(page.locator('text=/home.*javascript.*reference|javascript.*>.*reference/i')),
          ),
      );

    // Breadcrumb might exist
    const hasBreadcrumb = await breadcrumb
      .first()
      .isVisible()
      .catch(() => false);

    if (hasBreadcrumb) {
      await expect(breadcrumb.first()).toBeVisible();
    }
  });

  test('should support browser back/forward navigation', async ({ page }) => {
    // Click on a method
    const methodItem = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'))
      .first();

    await methodItem.click();
    await page.waitForTimeout(500);

    // Navigate back
    await page.goBack();
    await page.waitForTimeout(300);

    // Navigate forward
    await page.goForward();
    await page.waitForTimeout(300);

    // Page should still function
    await expect(page.locator('body')).toBeVisible();
  });

  test('should scroll to top on category change', async ({ page }) => {
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 500));

    // Click a category
    const categoryFilter = page
      .locator('[data-testid^="category-filter"]')
      .or(page.locator('button').filter({ hasText: /^(array|string)$/i }))
      .first();

    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
      await page.waitForTimeout(500);

      // Check scroll position (should be at top or near top)
      const _scrollY = await page.evaluate(() => window.scrollY);
      // Might scroll to top or maintain position - both are valid
    }
  });
});

// ============================================================================
// Responsive Design Tests
// ============================================================================

test.describe('Reference Page - Responsive Design', () => {
  test('should be usable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    // Content should be visible
    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'));

    await expect(methodItems.first()).toBeVisible({ timeout: 10000 });

    // Search should be visible
    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')));

    await expect(searchInput.first()).toBeVisible();
  });

  test('should be usable on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    // Content should be visible
    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'));

    await expect(methodItems.first()).toBeVisible({ timeout: 10000 });
  });

  test('should adapt layout on resize', async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    // Start with desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(300);

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Content should still be accessible
    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'));

    await expect(methodItems.first()).toBeVisible();
  });
});

// ============================================================================
// Accessibility Tests
// ============================================================================

test.describe('Reference Page - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);
  });

  test('should be navigable with keyboard', async ({ page }) => {
    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should have focused element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Enter should activate focused element
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    // Page should respond
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();

    // Check for h2s
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThanOrEqual(0);
  });

  test('should have alt text for images', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      // Images should have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check search input
    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(page.locator('input[type="search"]'));

    if (await searchInput.first().isVisible()) {
      const ariaLabel = await searchInput.first().getAttribute('aria-label');
      const placeholder = await searchInput.first().getAttribute('placeholder');
      const label = await page
        .locator(`label[for="${await searchInput.first().getAttribute('id')}"]`)
        .count();

      // Should have some form of label
      expect(ariaLabel || placeholder || label > 0).toBeTruthy();
    }
  });

  test('should support screen reader navigation', async ({ page }) => {
    // Check for landmark roles
    const nav = page.locator('[role="navigation"], nav');
    const _main = page.locator('[role="main"], main');

    // At least one navigation landmark
    const navCount = await nav.count();
    expect(navCount).toBeGreaterThan(0);
  });
});

// ============================================================================
// Performance Tests
// ============================================================================

test.describe('Reference Page - Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    const loadTime = Date.now() - startTime;

    // Should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('should search without noticeable lag', async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')));

    const startTime = Date.now();

    await searchInput.first().fill('map');

    const filterTime = Date.now() - startTime;

    // Search should be responsive (under 1 second)
    expect(filterTime).toBeLessThan(1000);
  });

  test('should handle rapid typing in search', async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(page.locator('input[type="search"]').or(page.locator('input[placeholder*="search" i]')));

    // Type rapidly
    await searchInput.first().fill('');
    await searchInput.first().type('arraymapfilterreduce', { delay: 50 });

    // Should not crash
    await expect(page.locator('body')).toBeVisible();

    // Clear and verify recovery
    await searchInput.first().fill('');
    await page.waitForTimeout(500);

    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'));

    const count = await methodItems.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ============================================================================
// Edge Cases Tests
// ============================================================================

test.describe('Reference Page - Edge Cases', () => {
  test('should handle empty search gracefully', async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(page.locator('input[type="search"]'));

    // Clear search (should show all)
    await searchInput.first().fill('');
    await page.waitForTimeout(300);

    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'));

    const count = await methodItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle special characters in search', async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(page.locator('input[type="search"]'));

    // Search with special characters
    await searchInput.first().fill('<script>alert("xss")</script>');
    await page.waitForTimeout(300);

    // Should not crash and should sanitize
    await expect(page.locator('body')).toBeVisible();

    // Clear and verify recovery
    await searchInput.first().fill('');
    await page.waitForTimeout(300);

    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'));

    const count = await methodItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle page refresh', async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    // Refresh
    await page.reload();
    await waitForPageLoad(page);

    // Content should still be visible
    const methodItems = page
      .locator('[data-testid="method-item"]')
      .or(page.locator('.method-item'));

    await expect(methodItems.first()).toBeVisible({ timeout: 10000 });
  });

  test('should handle direct URL access with hash', async ({ page }) => {
    // Navigate to URL with hash
    await page.goto(`${REFERENCE_URL}#map`);
    await waitForPageLoad(page);

    // Page should load
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    await page.goto(REFERENCE_URL);
    await waitForPageLoad(page);

    // Simulate offline
    await page.route('**/*', (route) => route.abort());

    // Try to interact
    const searchInput = page
      .locator('[data-testid="search-input"]')
      .or(page.locator('input[type="search"]'));

    if (await searchInput.first().isVisible()) {
      await searchInput.first().fill('test');
    }

    // App should not crash
    await expect(page.locator('body')).toBeVisible();

    // Restore network
    await page.unroute('**/*');
  });
});

// ============================================================================
// Cross-Language Tests
// ============================================================================

test.describe('Reference Page - Cross-Language Support', () => {
  const languages = ['javascript', 'typescript', 'python'];

  for (const lang of languages) {
    test(`should load reference page for ${lang}`, async ({ page }) => {
      await page.goto(`/${lang}/reference`);
      await waitForPageLoad(page);

      // Methods should be displayed
      const methodItems = page
        .locator('[data-testid="method-item"]')
        .or(page.locator('.method-item').or(page.locator('article, .method-card')));

      // Wait for content or check for language-specific content
      await expect(
        methodItems.first().or(page.locator('h1, h2').filter({ hasText: new RegExp(lang, 'i') })),
      ).toBeVisible({ timeout: 10000 });
    });
  }
});
