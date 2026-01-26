import type { Locator, Page } from '@playwright/test';

/**
 * Supported programming languages in the application
 */
export const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'ruby',
  'c',
] as const;

export type LanguageSlug = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Language display names mapping
 */
export const LANGUAGE_NAMES: Record<LanguageSlug, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  csharp: 'C#',
  go: 'Go',
  ruby: 'Ruby',
  c: 'C',
};

/**
 * Learning modes available in the application
 */
export const LEARNING_MODES = ['drill', 'quiz', 'reference'] as const;
export type LearningMode = (typeof LEARNING_MODES)[number];

/**
 * Test utility class for common operations
 */
export class TestUtils {
  constructor(private page: Page) {}

  /**
   * Navigate to the home page
   */
  async goToHome(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to a specific language page
   */
  async goToLanguage(language: LanguageSlug): Promise<void> {
    await this.page.goto(`/${language}`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to drill mode for a specific language
   */
  async goToDrillMode(language: LanguageSlug): Promise<void> {
    await this.page.goto(`/${language}/drill`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to quiz mode for a specific language
   */
  async goToQuizMode(language: LanguageSlug): Promise<void> {
    await this.page.goto(`/${language}/quiz`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to reference page for a specific language
   */
  async goToReference(language: LanguageSlug): Promise<void> {
    await this.page.goto(`/${language}/reference`);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on a language card from the home page
   */
  async selectLanguageFromHome(language: LanguageSlug): Promise<void> {
    const languageName = LANGUAGE_NAMES[language];
    await this.page.getByRole('link', { name: languageName }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get all language cards on the home page
   */
  async getLanguageCards(): Promise<Locator> {
    return this.page.locator('a[href^="/"]').filter({
      has: this.page.locator('h3'),
    });
  }

  /**
   * Get the count of visible language cards
   */
  async getLanguageCardCount(): Promise<number> {
    const cards = await this.getLanguageCards();
    return cards.count();
  }

  /**
   * Check if a specific language card is visible
   */
  async isLanguageCardVisible(language: LanguageSlug): Promise<boolean> {
    const languageName = LANGUAGE_NAMES[language];
    const card = this.page.getByRole('link', { name: languageName });
    return card.isVisible();
  }

  /**
   * Get the page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Get the main heading text
   */
  async getMainHeading(): Promise<string | null> {
    const heading = this.page.locator('h1').first();
    return heading.textContent();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if element with text exists
   */
  async hasText(text: string): Promise<boolean> {
    const locator = this.page.getByText(text);
    return locator.isVisible();
  }

  /**
   * Take a screenshot with a descriptive name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
  }
}

/**
 * Drill mode specific utilities
 */
export class DrillModeUtils {
  constructor(private page: Page) {}

  /**
   * Get the current problem title
   */
  async getProblemTitle(): Promise<string | null> {
    const title = this.page.locator('[data-testid="problem-title"]').first();
    if (await title.isVisible()) {
      return title.textContent();
    }
    // Fallback to any heading that might contain the problem
    const heading = this.page.locator('h2, h3').first();
    return heading.textContent();
  }

  /**
   * Get the problem description
   */
  async getProblemDescription(): Promise<string | null> {
    const description = this.page.locator('[data-testid="problem-description"]').first();
    if (await description.isVisible()) {
      return description.textContent();
    }
    return null;
  }

  /**
   * Get the code editor element
   */
  getCodeEditor(): Locator {
    return this.page.locator('[data-testid="code-editor"], .monaco-editor, textarea[name="code"]');
  }

  /**
   * Type code into the editor
   */
  async typeCode(code: string): Promise<void> {
    const editor = this.getCodeEditor();
    await editor.click();
    await this.page.keyboard.type(code);
  }

  /**
   * Clear and type new code
   */
  async setCode(code: string): Promise<void> {
    const editor = this.getCodeEditor();
    await editor.click();
    await this.page.keyboard.press('Meta+A');
    await this.page.keyboard.press('Backspace');
    await this.page.keyboard.type(code);
  }

  /**
   * Submit the current answer
   */
  async submitAnswer(): Promise<void> {
    const submitButton = this.page.getByRole('button', {
      name: /submit|run|check|verify/i,
    });
    await submitButton.click();
  }

  /**
   * Check if the result is correct
   */
  async isResultCorrect(): Promise<boolean> {
    const successIndicator = this.page.locator(
      '[data-testid="result-success"], .success, .correct',
    );
    return successIndicator.isVisible();
  }

  /**
   * Check if the result is incorrect
   */
  async isResultIncorrect(): Promise<boolean> {
    const errorIndicator = this.page.locator('[data-testid="result-error"], .error, .incorrect');
    return errorIndicator.isVisible();
  }

  /**
   * Get the result message
   */
  async getResultMessage(): Promise<string | null> {
    const result = this.page.locator('[data-testid="result-message"], .result-message');
    if (await result.isVisible()) {
      return result.textContent();
    }
    return null;
  }

  /**
   * Move to the next problem
   */
  async nextProblem(): Promise<void> {
    const nextButton = this.page.getByRole('button', { name: /next|skip/i });
    if (await nextButton.isVisible()) {
      await nextButton.click();
    }
  }

  /**
   * Get hint if available
   */
  async getHint(): Promise<string | null> {
    const hintButton = this.page.getByRole('button', { name: /hint/i });
    if (await hintButton.isVisible()) {
      await hintButton.click();
      const hint = this.page.locator('[data-testid="hint"], .hint');
      if (await hint.isVisible()) {
        return hint.textContent();
      }
    }
    return null;
  }
}

/**
 * Quiz mode specific utilities
 */
export class QuizModeUtils {
  constructor(private page: Page) {}

  /**
   * Get the current question text
   */
  async getQuestionText(): Promise<string | null> {
    const question = this.page.locator('[data-testid="quiz-question"], .quiz-question');
    if (await question.isVisible()) {
      return question.textContent();
    }
    return null;
  }

  /**
   * Get all answer options
   */
  async getAnswerOptions(): Promise<Locator> {
    return this.page.locator(
      '[data-testid="answer-option"], .answer-option, [role="radio"], button:has-text("")',
    );
  }

  /**
   * Select an answer by index (0-based)
   */
  async selectAnswerByIndex(index: number): Promise<void> {
    const options = await this.getAnswerOptions();
    const option = options.nth(index);
    await option.click();
  }

  /**
   * Select an answer by text content
   */
  async selectAnswerByText(text: string): Promise<void> {
    const option = this.page.locator(
      `[data-testid="answer-option"]:has-text("${text}"), .answer-option:has-text("${text}")`,
    );
    await option.click();
  }

  /**
   * Submit the quiz answer
   */
  async submitAnswer(): Promise<void> {
    const submitButton = this.page.getByRole('button', {
      name: /submit|confirm|check/i,
    });
    if (await submitButton.isVisible()) {
      await submitButton.click();
    }
  }

  /**
   * Check if answer feedback is shown
   */
  async isFeedbackShown(): Promise<boolean> {
    const feedback = this.page.locator('[data-testid="quiz-feedback"], .quiz-feedback');
    return feedback.isVisible();
  }

  /**
   * Get the current score
   */
  async getCurrentScore(): Promise<string | null> {
    const score = this.page.locator('[data-testid="quiz-score"], .quiz-score');
    if (await score.isVisible()) {
      return score.textContent();
    }
    return null;
  }

  /**
   * Move to next question
   */
  async nextQuestion(): Promise<void> {
    const nextButton = this.page.getByRole('button', { name: /next|continue/i });
    if (await nextButton.isVisible()) {
      await nextButton.click();
    }
  }

  /**
   * Get progress indicator text
   */
  async getProgress(): Promise<string | null> {
    const progress = this.page.locator('[data-testid="quiz-progress"], .quiz-progress');
    if (await progress.isVisible()) {
      return progress.textContent();
    }
    return null;
  }
}

/**
 * Reference page specific utilities
 */
export class ReferenceUtils {
  constructor(private page: Page) {}

  /**
   * Get all method categories
   */
  async getCategories(): Promise<Locator> {
    return this.page.locator('[data-testid="method-category"], .method-category');
  }

  /**
   * Get all methods listed
   */
  async getMethods(): Promise<Locator> {
    return this.page.locator('[data-testid="method-item"], .method-item');
  }

  /**
   * Search for a method
   */
  async searchMethod(query: string): Promise<void> {
    const searchInput = this.page.getByPlaceholder(/search/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill(query);
    }
  }

  /**
   * Click on a method to view details
   */
  async viewMethodDetails(methodName: string): Promise<void> {
    const method = this.page.locator(
      `[data-testid="method-item"]:has-text("${methodName}"), .method-item:has-text("${methodName}")`,
    );
    await method.click();
  }

  /**
   * Get method syntax
   */
  async getMethodSyntax(): Promise<string | null> {
    const syntax = this.page.locator('[data-testid="method-syntax"], .method-syntax');
    if (await syntax.isVisible()) {
      return syntax.textContent();
    }
    return null;
  }

  /**
   * Get method examples
   */
  async getMethodExamples(): Promise<Locator> {
    return this.page.locator('[data-testid="method-example"], .method-example, pre code');
  }

  /**
   * Filter by category
   */
  async filterByCategory(category: string): Promise<void> {
    const categoryFilter = this.page.locator(
      `[data-testid="category-filter"]:has-text("${category}"), button:has-text("${category}")`,
    );
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
    }
  }
}

/**
 * Extract problem data from the current drill page
 */
export async function extractProblemData(page: Page): Promise<{
  title: string | null;
  description: string | null;
  setup: string | null;
  expected: string | null;
}> {
  return {
    title: await page
      .locator('[data-testid="problem-title"]')
      .textContent()
      .catch(() => null),
    description: await page
      .locator('[data-testid="problem-description"]')
      .textContent()
      .catch(() => null),
    setup: await page
      .locator('[data-testid="problem-setup"]')
      .textContent()
      .catch(() => null),
    expected: await page
      .locator('[data-testid="problem-expected"]')
      .textContent()
      .catch(() => null),
  };
}

/**
 * Verify page is accessible (basic accessibility checks)
 */
export async function verifyBasicAccessibility(page: Page): Promise<void> {
  // Check for main landmark
  const main = page.locator('main');
  const hasMain = (await main.count()) > 0;

  // Check for heading hierarchy
  const h1 = page.locator('h1');
  const hasH1 = (await h1.count()) > 0;

  // Check for skip links or navigation
  const nav = page.locator('nav, [role="navigation"]');
  const _hasNav = (await nav.count()) >= 0; // Navigation is optional

  // These are soft checks - log warnings but don't fail
  if (!hasMain) {
    console.warn('Accessibility warning: No <main> landmark found');
  }
  if (!hasH1) {
    console.warn('Accessibility warning: No <h1> found on page');
  }
}

/**
 * Wait for animations to complete
 */
export async function waitForAnimations(page: Page): Promise<void> {
  // Wait for any CSS animations to settle
  await page.waitForTimeout(500);
  await page.waitForLoadState('networkidle');
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(locator: Locator): Promise<boolean> {
  const box = await locator.boundingBox();
  if (!box) return false;

  const viewportSize = await locator.page().viewportSize();
  if (!viewportSize) return false;

  return (
    box.x >= 0 &&
    box.y >= 0 &&
    box.x + box.width <= viewportSize.width &&
    box.y + box.height <= viewportSize.height
  );
}

/**
 * Problem validation test utilities
 */
export interface ProblemTestVariation {
  code: string;
  description: string;
  shouldPass: boolean;
  expectedError?: string | RegExp;
}

/**
 * Test a problem with multiple code variations
 */
export async function testProblemVariations(
  page: Page,
  inputField: Locator,
  variations: ProblemTestVariation[],
): Promise<void> {
  for (const variation of variations) {
    // Clear and fill input
    await inputField.fill('');
    await inputField.fill(variation.code);
    await inputField.press('Enter');

    // Wait for validation
    await page.waitForTimeout(1000);

    // Check result
    const successIndicator = page.locator(
      '[data-testid="result-success"], .success, .correct, text=/correct|right|good|nice|passed/i',
    );
    const errorIndicator = page.locator(
      '[data-testid="result-error"], .error, .incorrect, text=/incorrect|wrong|error|failed|must use|expected method|pattern/i',
    );

    const isCorrect = await successIndicator
      .first()
      .isVisible()
      .catch(() => false);
    const hasError = await errorIndicator
      .first()
      .isVisible()
      .catch(() => false);

    if (variation.shouldPass) {
      expect(isCorrect).toBe(true);
    } else {
      expect(isCorrect === false || hasError).toBeTruthy();

      // If specific error expected, check for it
      if (variation.expectedError) {
        const errorText = await errorIndicator
          .first()
          .textContent()
          .catch(() => '');
        if (typeof variation.expectedError === 'string') {
          expect(errorText?.toLowerCase()).toContain(variation.expectedError.toLowerCase());
        } else {
          expect(errorText).toMatch(variation.expectedError);
        }
      }
    }
  }
}

/**
 * Generate Unicode arrow variations for testing
 */
export function generateUnicodeArrowVariations(baseCode: string): string[] {
  const variations: string[] = [];

  // Replace => with Unicode variations
  variations.push(baseCode.replace(/=>/g, '⇒')); // Unicode arrow
  variations.push(baseCode.replace(/=>/g, '→')); // Unicode right arrow
  variations.push(baseCode.replace(/=>/g, '⟹')); // Unicode double arrow

  // Also test with different whitespace patterns
  variations.push(baseCode.replace(/=>/g, '⇒').replace(/\s+/g, ' '));
  variations.push(baseCode.replace(/=>/g, '→').replace(/\s+/g, ' '));

  return variations;
}

/**
 * Generate syntax variations for arrow functions
 */
export function generateArrowFunctionVariations(baseCode: string): string[] {
  const variations: string[] = [baseCode];

  // Extract the core logic (e.g., "n => n % 2 === 0")
  const arrowMatch = baseCode.match(/(\w+)\.filter\(([^)]+)\)/);
  if (!arrowMatch) return variations;

  const arrayVar = arrowMatch[1];
  const arrowBody = arrowMatch[2];

  // Different arrow function syntaxes
  variations.push(`${arrayVar}.filter(${arrowBody})`); // Original
  variations.push(
    `${arrayVar}.filter((${arrowBody.split('=>')[0].trim()}) => ${arrowBody.split('=>')[1]})`,
  ); // With parentheses
  variations.push(
    `${arrayVar}.filter(function(${arrowBody.split('=>')[0].trim()}) { return ${arrowBody.split('=>')[1].trim()}; })`,
  ); // Function expression

  return variations;
}
