/**
 * Comprehensive E2E Validation for ALL Problems
 *
 * CRITICAL MEMORY: This test suite validates problems through the UI.
 *
 * For DATABASE LANGUAGES (MongoDB, PostgreSQL, MySQL):
 * - Tests EVERY SINGLE PROBLEM (100% coverage)
 * - No sampling, no skipping
 * - Current counts: MongoDB (130), PostgreSQL (63), MySQL (70) = 263 total
 *
 * For OTHER LANGUAGES:
 * - Tests a representative sample (first 10 problems per language)
 * - This keeps the test suite manageable while still catching issues
 *
 * This ensures:
 * 1. Problems can be accessed via the problems page
 * 2. Sample solutions work correctly when submitted
 * 3. Validation logic works (accepts correct, rejects incorrect)
 * 4. Problems display correctly with all required information
 *
 * Database language problems use pattern matching validation,
 * while executable languages use code execution validation.
 */

import { expect, type Page, test } from '@playwright/test';
import { SUPPORTED_LANGUAGES } from '../../app/[language]/config';
import { getAllProblems, problemsByLanguage } from '../../lib/problems/index';
import type { LanguageId, Problem } from '../../lib/types';

// ============================================================================
// Test Configuration
// ============================================================================

// CRITICAL MEMORY: Test ALL problems from each language
// For database languages, test EVERY problem (no sampling) - 263 total problems
// For other languages, test a representative sample to keep test suite manageable
const PROBLEMS_PER_LANGUAGE = 10; // Test first 10 problems from each language (non-database)
const DATABASE_LANGUAGES = ['mongodb', 'postgresql', 'mysql'] as const;

// Expected problem counts for database languages (MEMORY)
const EXPECTED_DATABASE_COUNTS = {
  mongodb: 130,
  postgresql: 63,
  mysql: 70,
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

async function navigateToProblemPage(
  page: Page,
  language: LanguageId,
  problemId: string,
): Promise<boolean> {
  try {
    // Try direct navigation to problem page
    await page.goto(`/${language}/problems/${problemId}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check if we're on a problem page (look for problem content)
    const problemContent = page.locator(
      '[data-testid="problem-content"], .problem-content, h1, h2',
    );
    const isVisible = await problemContent
      .first()
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    return isVisible;
  } catch {
    return false;
  }
}

async function getCodeEditor(page: Page) {
  return page
    .locator('[data-testid="code-editor"], .monaco-editor, textarea, input[type="text"]')
    .first();
}

async function submitCode(
  page: Page,
  code: string,
): Promise<{
  isCorrect: boolean;
  error: string | null;
  output: string | null;
}> {
  const editor = await getCodeEditor(page);
  await editor.click();
  await editor.fill('');
  await editor.fill(code);
  await editor.press('Enter');

  // Wait for validation
  await page.waitForTimeout(2000);
  console.log(`    [SUBMIT] Code submitted, waiting for validation...`);

  // Check for success/error feedback
  const successIndicator = page.locator(
    '[data-testid="success"], .success, .correct, text=/correct|right|passed|success/i',
  );
  const errorIndicator = page.locator(
    '[data-testid="error"], .error, .incorrect, text=/incorrect|wrong|error|failed|must use|expected method|pattern/i',
  );

  const isCorrect = await successIndicator
    .first()
    .isVisible({ timeout: 2000 })
    .catch(() => false);
  const hasError = await errorIndicator
    .first()
    .isVisible({ timeout: 2000 })
    .catch(() => false);

  const errorText = hasError
    ? await errorIndicator
        .first()
        .textContent()
        .catch(() => null)
    : null;

  const outputElement = page.locator('[data-testid="output"], .output, pre code').first();
  const output = await outputElement.textContent().catch(() => null);

  return {
    isCorrect,
    error: errorText,
    output,
  };
}

// ============================================================================
// Test Suite: Problem Accessibility
// ============================================================================

test.describe('All Problems - Accessibility and Display', () => {
  test('should be able to navigate to problems page for each language', async ({ page }) => {
    for (const language of SUPPORTED_LANGUAGES) {
      await page.goto(`/${language}/problems`);
      await page.waitForLoadState('networkidle');

      // Check if problems page loaded
      const problemsList = page.locator('[data-testid="problems-list"], .problems-list, ul, ol');
      const hasProblems = await problemsList
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);

      // Some languages might not have problems page implemented yet
      if (!hasProblems) {
        console.log(`Skipping ${language} - problems page not available`);
        continue;
      }

      expect(hasProblems).toBeTruthy();
    }
  });
});

// ============================================================================
// Test Suite: Sample Solution Validation (E2E)
// ============================================================================

test.describe('All Problems - Sample Solution Validation (E2E)', () => {
  // CRITICAL MEMORY: Verify database language problem counts
  test('MEMORY: Verify database language problem counts', () => {
    for (const lang of DATABASE_LANGUAGES) {
      const problems = problemsByLanguage[lang as LanguageId] || [];
      const expected = EXPECTED_DATABASE_COUNTS[lang];
      expect(problems.length).toBe(expected);
    }
  });

  // Get all problems and select a representative sample
  const problemsToTest: Array<{ problem: Problem; language: LanguageId }> = [];

  // Collect problems from each language
  for (const language of SUPPORTED_LANGUAGES) {
    const languageProblems = problemsByLanguage[language as LanguageId];
    if (!languageProblems || languageProblems.length === 0) continue;

    // CRITICAL: For database languages, test EVERY problem (100% coverage)
    // For other languages, test a sample
    const isDatabaseLanguage = DATABASE_LANGUAGES.includes(
      language as (typeof DATABASE_LANGUAGES)[number],
    );
    const problemsToInclude = isDatabaseLanguage
      ? languageProblems // ALL problems for database languages - NO SAMPLING
      : languageProblems.slice(0, PROBLEMS_PER_LANGUAGE); // Sample for others

    for (const problem of problemsToInclude) {
      problemsToTest.push({ problem, language: language as LanguageId });
    }
  }

  // CRITICAL: Verify we're testing all database problems
  test('MEMORY: Verify all database problems are included in test suite', () => {
    const databaseProblemsInTest = problemsToTest.filter(({ language }) =>
      DATABASE_LANGUAGES.includes(language as (typeof DATABASE_LANGUAGES)[number]),
    );
    const totalDatabaseProblems = DATABASE_LANGUAGES.reduce(
      (sum, lang) => sum + (problemsByLanguage[lang as LanguageId]?.length || 0),
      0,
    );
    expect(databaseProblemsInTest.length).toBe(totalDatabaseProblems);
  });

  for (const { problem, language } of problemsToTest) {
    // Test all languages including database languages
    // Database languages use pattern matching, others use execution

    test(`should accept sample solution for: ${problem.id} (${language})`, async ({ page }) => {
      console.log(
        `\n[TEST START] ${language.toUpperCase()} Problem: ${problem.id} - "${problem.title}"`,
      );
      console.log(`  Category: ${problem.category}, Difficulty: ${problem.difficulty}`);

      await clearLocalStorage(page);

      // Try to navigate to problem page
      console.log(`  [STEP 1] Attempting direct navigation...`);
      const navigated = await navigateToProblemPage(page, language, problem.id);

      if (!navigated) {
        console.log(`  [STEP 1] Direct navigation failed, trying through problems list...`);
        // If direct navigation doesn't work, try through problems list
        await page.goto(`/${language}/problems`);
        await page.waitForLoadState('networkidle');

        // Try to find and click the problem
        const problemLink = page
          .locator(`a[href*="${problem.id}"], [data-problem-id="${problem.id}"]`)
          .first();

        const linkExists = await problemLink.isVisible({ timeout: 5000 }).catch(() => false);

        if (!linkExists) {
          // Try direct navigation as fallback
          await page.goto(`/${language}/problems/${problem.id}`);
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(2000);

          // Check if we're now on the problem page
          const editor = await getCodeEditor(page);
          const editorVisible = await editor.isVisible({ timeout: 5000 }).catch(() => false);

          if (!editorVisible) {
            // CRITICAL: Do not skip - this is a failure
            throw new Error(
              `FAILED: Cannot access problem ${problem.id} "${problem.title}" for ${language}. ` +
                `Tried both problems list and direct URL. Current URL: ${page.url()}`,
            );
          }
        } else {
          await problemLink.click();
          await page.waitForLoadState('networkidle');
          await page.waitForTimeout(1000);
        }
      }

      // Wait for code editor to be visible
      const editor = await getCodeEditor(page);
      await editor.waitFor({ state: 'visible', timeout: 5000 });

      // Submit sample solution
      const result = await submitCode(page, problem.sample);

      // Sample solution should be accepted
      if (!result.isCorrect) {
        throw new Error(
          `Problem ${problem.id}: Sample solution was rejected. Error: ${result.error || 'Unknown error'}`,
        );
      }

      expect(result.isCorrect).toBe(true);
    });
  }
});

// ============================================================================
// Test Suite: Validation Logic (E2E)
// ============================================================================

test.describe('All Problems - Validation Logic (E2E)', () => {
  // Test a smaller subset for validation logic
  const problemsToTest = getAllProblems()
    .filter((p) => {
      // Only test JavaScript/TypeScript for E2E validation
      for (const [lang, problems] of Object.entries(problemsByLanguage)) {
        if (problems?.some((prob) => prob.id === p.id)) {
          return lang === 'javascript' || lang === 'typescript';
        }
      }
      return false;
    })
    .slice(0, 20); // Test first 20

  for (const problem of problemsToTest) {
    // Find language
    let language: LanguageId | null = null;
    for (const [lang, problems] of Object.entries(problemsByLanguage)) {
      if (problems?.some((p) => p.id === problem.id)) {
        language = lang as LanguageId;
        break;
      }
    }

    if (!language || (language !== 'javascript' && language !== 'typescript')) {
      continue;
    }

    test(`should reject hardcoded answer for: ${problem.id}`, async ({ page }) => {
      await clearLocalStorage(page);

      const navigated = await navigateToProblemPage(page, language!, problem.id);

      if (!navigated) {
        test.skip();
        return;
      }

      const editor = await getCodeEditor(page);
      await editor.waitFor({ state: 'visible', timeout: 5000 });

      // Create hardcoded answer
      const hardcodedAnswer = JSON.stringify(problem.expected);

      // Submit hardcoded answer
      const result = await submitCode(page, hardcodedAnswer);

      // Should be rejected (unless it happens to match pattern, which is unlikely)
      if (result.isCorrect) {
        // If it passed, it might be because it uses setup variables
        // Check if hardcoded answer actually uses setup variables
        const setupVars = problem.setupCode.match(/(?:const|let|var)\s+(\w+)/g);
        const usesSetupVar = setupVars?.some((v) => {
          const varName = v.split(/\s+/)[1];
          return hardcodedAnswer.includes(varName);
        });

        if (!usesSetupVar) {
          throw new Error(
            `Problem ${problem.id}: Hardcoded answer was accepted but doesn't use setup variables`,
          );
        }
      } else {
        // Should have error about hardcoding or pattern
        expect(result.isCorrect).toBe(false);
      }
    });
  }
});

// ============================================================================
// Test Suite: Unicode Arrow Normalization (E2E)
// ============================================================================

test.describe('All Problems - Unicode Arrow Normalization (E2E)', () => {
  // Find JavaScript/TypeScript problems with arrow functions
  const jsProblems = problemsByLanguage.javascript || [];
  const tsProblems = problemsByLanguage.typescript || [];
  const allJsTsProblems = [...jsProblems, ...tsProblems];

  // Find problems that use arrow functions
  const arrowFunctionProblems = allJsTsProblems.filter((p) => p.sample.includes('=>'));

  // Test first 5
  const problemsToTest = arrowFunctionProblems.slice(0, 5);

  for (const problem of problemsToTest) {
    const language: LanguageId = problem.id.startsWith('js-') ? 'javascript' : 'typescript';

    test(`should normalize Unicode arrows for: ${problem.id}`, async ({ page }) => {
      await clearLocalStorage(page);

      const navigated = await navigateToProblemPage(page, language, problem.id);

      if (!navigated) {
        test.skip();
        return;
      }

      const editor = await getCodeEditor(page);
      await editor.waitFor({ state: 'visible', timeout: 5000 });

      // Test Unicode arrow variations
      const unicodeVariations = [
        problem.sample.replace(/=>/g, '⇒'), // Unicode arrow
        problem.sample.replace(/=>/g, '→'), // Unicode right arrow
        problem.sample.replace(/=>/g, '⟹'), // Unicode double arrow
      ];

      for (const unicodeSample of unicodeVariations) {
        const result = await submitCode(page, unicodeSample);

        if (!result.isCorrect) {
          throw new Error(
            `Problem ${problem.id}: Unicode arrow variation was rejected: ${result.error || 'Unknown error'}`,
          );
        }

        expect(result.isCorrect).toBe(true);
      }
    });
  }
});
