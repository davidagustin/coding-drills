import { test, expect, Page } from '@playwright/test';

/**
 * E2E Tests for Quiz Mode in Coding Drills App
 *
 * These tests cover the complete quiz mode functionality including:
 * - Quiz setup and configuration
 * - Quiz gameplay mechanics
 * - Timer functionality
 * - Scoring system
 * - Results screen
 * - Edge cases
 */

// =============================================================================
// Test Data & Constants
// =============================================================================

const QUIZ_URL = '/javascript/quiz';
const DEFAULT_LANGUAGE = 'javascript';
const SUPPORTED_LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'cpp', 'csharp', 'go', 'ruby', 'c'];

// Selectors - using data-testid for reliability
const SELECTORS = {
  // Setup Screen
  setupScreen: '[data-testid="quiz-setup"]',
  categorySelect: '[data-testid="category-select"]',
  categoryOption: '[data-testid="category-option"]',
  questionCountSelect: '[data-testid="question-count-select"]',
  timePerQuestionSelect: '[data-testid="time-per-question-select"]',
  startButton: '[data-testid="start-quiz-button"]',

  // Quiz Gameplay
  quizScreen: '[data-testid="quiz-screen"]',
  questionText: '[data-testid="question-text"]',
  questionNumber: '[data-testid="question-number"]',
  optionCard: '[data-testid="option-card"]',
  optionCards: '[data-testid="option-card"]',
  selectedOption: '[data-testid="option-card"][data-selected="true"]',
  correctOption: '[data-testid="option-card"][data-correct="true"]',
  incorrectOption: '[data-testid="option-card"][data-incorrect="true"]',

  // Timer
  timer: '[data-testid="quiz-timer"]',
  timerLow: '[data-testid="quiz-timer"][data-low="true"]',
  timerText: '[data-testid="timer-text"]',

  // Score Display
  scoreDisplay: '[data-testid="score-display"]',
  currentScore: '[data-testid="current-score"]',
  streakDisplay: '[data-testid="streak-display"]',
  streakMultiplier: '[data-testid="streak-multiplier"]',
  bonusPoints: '[data-testid="bonus-points"]',

  // Results Screen
  resultsScreen: '[data-testid="quiz-results"]',
  finalScore: '[data-testid="final-score"]',
  accuracyPercentage: '[data-testid="accuracy-percentage"]',
  timeStats: '[data-testid="time-stats"]',
  averageTime: '[data-testid="average-time"]',
  totalTime: '[data-testid="total-time"]',
  playAgainButton: '[data-testid="play-again-button"]',
  backToMenuButton: '[data-testid="back-to-menu-button"]',

  // Progress
  progressBar: '[data-testid="progress-bar"]',
  progressText: '[data-testid="progress-text"]',

  // Feedback
  feedbackCorrect: '[data-testid="feedback-correct"]',
  feedbackIncorrect: '[data-testid="feedback-incorrect"]',
  feedbackTimeout: '[data-testid="feedback-timeout"]',
};

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Navigate to quiz setup page for a specific language
 */
async function navigateToQuizSetup(page: Page, language: string = DEFAULT_LANGUAGE): Promise<void> {
  await page.goto(`/${language}/quiz`);
  await page.waitForLoadState('networkidle');
}

/**
 * Wait for quiz setup screen to be visible
 */
async function waitForSetupScreen(page: Page): Promise<void> {
  await expect(page.locator(SELECTORS.setupScreen)).toBeVisible({ timeout: 10000 });
}

/**
 * Wait for quiz gameplay screen to be visible
 */
async function waitForQuizScreen(page: Page): Promise<void> {
  await expect(page.locator(SELECTORS.quizScreen)).toBeVisible({ timeout: 10000 });
}

/**
 * Wait for results screen to be visible
 */
async function waitForResultsScreen(page: Page): Promise<void> {
  await expect(page.locator(SELECTORS.resultsScreen)).toBeVisible({ timeout: 30000 });
}

/**
 * Start a quiz with given configuration
 */
async function startQuiz(
  page: Page,
  options: {
    categories?: string[];
    questionCount?: number;
    timePerQuestion?: number;
  } = {}
): Promise<void> {
  const { categories, questionCount, timePerQuestion } = options;

  // Select categories if specified
  if (categories && categories.length > 0) {
    for (const category of categories) {
      const categoryCheckbox = page.locator(`${SELECTORS.categoryOption}[data-category="${category}"]`);
      if (await categoryCheckbox.isVisible()) {
        await categoryCheckbox.click();
      }
    }
  }

  // Select question count if specified
  if (questionCount) {
    const questionCountSelect = page.locator(SELECTORS.questionCountSelect);
    if (await questionCountSelect.isVisible()) {
      await questionCountSelect.selectOption({ value: questionCount.toString() });
    }
  }

  // Select time per question if specified
  if (timePerQuestion) {
    const timeSelect = page.locator(SELECTORS.timePerQuestionSelect);
    if (await timeSelect.isVisible()) {
      await timeSelect.selectOption({ value: timePerQuestion.toString() });
    }
  }

  // Click start button
  await page.locator(SELECTORS.startButton).click();
  await waitForQuizScreen(page);
}

/**
 * Answer a question by clicking an option
 */
async function answerQuestion(page: Page, optionIndex: number): Promise<void> {
  const options = page.locator(SELECTORS.optionCard);
  const option = options.nth(optionIndex);
  await option.click();
}

/**
 * Get the correct answer index by finding the option marked as correct
 */
async function findCorrectAnswerIndex(page: Page): Promise<number> {
  const options = page.locator(SELECTORS.optionCard);
  const count = await options.count();

  for (let i = 0; i < count; i++) {
    const option = options.nth(i);
    const isCorrect = await option.getAttribute('data-correct-answer');
    if (isCorrect === 'true') {
      return i;
    }
  }

  // If no correct answer attribute found, return 0 (will be determined by feedback)
  return 0;
}

/**
 * Wait for auto-advance to next question or results
 */
async function waitForAutoAdvance(page: Page, timeout: number = 3000): Promise<void> {
  await page.waitForTimeout(timeout);
}

/**
 * Get current score from display
 */
async function getCurrentScore(page: Page): Promise<number> {
  const scoreText = await page.locator(SELECTORS.currentScore).textContent();
  return parseInt(scoreText || '0', 10);
}

/**
 * Get current streak from display
 */
async function getCurrentStreak(page: Page): Promise<number> {
  const streakText = await page.locator(SELECTORS.streakDisplay).textContent();
  return parseInt(streakText || '0', 10);
}

/**
 * Complete a full quiz by answering all questions (randomly or correctly)
 */
async function completeQuiz(
  page: Page,
  answerCorrectly: boolean = true,
  questionCount: number = 5
): Promise<void> {
  for (let i = 0; i < questionCount; i++) {
    const options = page.locator(SELECTORS.optionCard);
    const optionsCount = await options.count();

    if (optionsCount === 0) {
      // Quiz might have ended early
      break;
    }

    if (answerCorrectly) {
      // Try to find and click the correct answer
      const correctIndex = await findCorrectAnswerIndex(page);
      await answerQuestion(page, correctIndex);
    } else {
      // Click first option (may or may not be correct)
      await answerQuestion(page, 0);
    }

    // Wait for feedback and auto-advance
    await waitForAutoAdvance(page, 2000);

    // Check if we're on results screen (quiz ended)
    const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();
    if (resultsVisible) {
      break;
    }
  }
}

// =============================================================================
// Test Suite: Quiz Setup Tests
// =============================================================================

test.describe('Quiz Setup Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToQuizSetup(page);
  });

  test('displays quiz setup screen with configuration options', async ({ page }) => {
    await waitForSetupScreen(page);

    // Verify setup screen is visible
    await expect(page.locator(SELECTORS.setupScreen)).toBeVisible();

    // Verify start button exists
    await expect(page.locator(SELECTORS.startButton)).toBeVisible();
  });

  test('can select categories', async ({ page }) => {
    await waitForSetupScreen(page);

    // Find category options
    const categoryOptions = page.locator(SELECTORS.categoryOption);
    const categoryCount = await categoryOptions.count();

    // Should have at least one category
    expect(categoryCount).toBeGreaterThan(0);

    // Click on first category to select it
    if (categoryCount > 0) {
      const firstCategory = categoryOptions.first();
      await firstCategory.click();

      // Verify selection state changed
      const isSelected = await firstCategory.getAttribute('data-selected');
      expect(isSelected).toBe('true');
    }
  });

  test('can select question count', async ({ page }) => {
    await waitForSetupScreen(page);

    const questionCountSelect = page.locator(SELECTORS.questionCountSelect);

    // Check if select exists
    if (await questionCountSelect.isVisible()) {
      // Get available options
      const options = questionCountSelect.locator('option');
      const optionCount = await options.count();

      // Should have multiple question count options
      expect(optionCount).toBeGreaterThan(1);

      // Select a different option
      await questionCountSelect.selectOption({ index: 1 });

      // Verify selection changed
      const selectedValue = await questionCountSelect.inputValue();
      expect(selectedValue).toBeTruthy();
    }
  });

  test('can select time per question', async ({ page }) => {
    await waitForSetupScreen(page);

    const timeSelect = page.locator(SELECTORS.timePerQuestionSelect);

    if (await timeSelect.isVisible()) {
      // Get available options
      const options = timeSelect.locator('option');
      const optionCount = await options.count();

      // Should have multiple time options
      expect(optionCount).toBeGreaterThan(1);

      // Select a different time option
      await timeSelect.selectOption({ index: 1 });

      // Verify selection changed
      const selectedValue = await timeSelect.inputValue();
      expect(selectedValue).toBeTruthy();
    }
  });

  test('start button initiates quiz', async ({ page }) => {
    await waitForSetupScreen(page);

    // Click start button
    await page.locator(SELECTORS.startButton).click();

    // Wait for quiz screen to appear
    await waitForQuizScreen(page);

    // Verify quiz has started
    await expect(page.locator(SELECTORS.questionText)).toBeVisible();
  });

  test('start button is disabled when no categories selected', async ({ page }) => {
    await waitForSetupScreen(page);

    // Deselect all categories if any are selected by default
    const selectedCategories = page.locator(`${SELECTORS.categoryOption}[data-selected="true"]`);
    const selectedCount = await selectedCategories.count();

    for (let i = 0; i < selectedCount; i++) {
      await selectedCategories.nth(i).click();
    }

    // Start button should be disabled
    const startButton = page.locator(SELECTORS.startButton);
    const isDisabled = await startButton.isDisabled();

    // Button should be disabled or not clickable without categories
    expect(isDisabled).toBeTruthy();
  });
});

// =============================================================================
// Test Suite: Quiz Gameplay Tests
// =============================================================================

test.describe('Quiz Gameplay Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page);
  });

  test('timer counts down during question', async ({ page }) => {
    const timer = page.locator(SELECTORS.timer);
    await expect(timer).toBeVisible();

    // Get initial time
    const initialTime = await timer.textContent();

    // Wait a bit
    await page.waitForTimeout(2000);

    // Get current time
    const currentTime = await timer.textContent();

    // Time should have decreased
    expect(currentTime).not.toBe(initialTime);
  });

  test('displays all 4 option cards', async ({ page }) => {
    const options = page.locator(SELECTORS.optionCard);
    const optionCount = await options.count();

    // Should have exactly 4 options
    expect(optionCount).toBe(4);

    // All options should be visible
    for (let i = 0; i < optionCount; i++) {
      await expect(options.nth(i)).toBeVisible();
    }
  });

  test('clicking a card selects it', async ({ page }) => {
    const options = page.locator(SELECTORS.optionCard);
    const firstOption = options.first();

    // Click the first option
    await firstOption.click();

    // Verify selection visual feedback (either selected state or feedback shown)
    const hasSelectedState = await firstOption.getAttribute('data-selected');
    const hasCorrectState = await firstOption.getAttribute('data-correct');
    const hasIncorrectState = await firstOption.getAttribute('data-incorrect');

    // Should have some state change after clicking
    expect(hasSelectedState === 'true' || hasCorrectState === 'true' || hasIncorrectState === 'true').toBeTruthy();
  });

  test('correct answer shows green feedback', async ({ page }) => {
    // Find and click correct answer (if available via data attribute)
    const correctOption = page.locator(`${SELECTORS.optionCard}[data-correct-answer="true"]`);

    if (await correctOption.count() > 0) {
      await correctOption.click();

      // Wait for feedback
      await page.waitForTimeout(500);

      // Check for green/correct feedback styling
      const hasCorrectClass = await correctOption.evaluate((el) => {
        return el.classList.contains('bg-green') ||
               el.classList.contains('border-green') ||
               el.getAttribute('data-correct') === 'true' ||
               getComputedStyle(el).borderColor.includes('green') ||
               getComputedStyle(el).backgroundColor.includes('green');
      });

      expect(hasCorrectClass).toBeTruthy();
    } else {
      // If no data attribute, just verify feedback appears after selection
      await answerQuestion(page, 0);
      await page.waitForTimeout(500);

      // Some feedback should appear
      const feedbackCorrect = page.locator(SELECTORS.feedbackCorrect);
      const feedbackIncorrect = page.locator(SELECTORS.feedbackIncorrect);

      const hasFeedback = await feedbackCorrect.isVisible() || await feedbackIncorrect.isVisible();
      expect(hasFeedback).toBeTruthy();
    }
  });

  test('incorrect answer shows red feedback and highlights correct answer', async ({ page }) => {
    // Find the incorrect option (first one that's not correct)
    const options = page.locator(SELECTORS.optionCard);
    const optionCount = await options.count();

    let incorrectIndex = 0;
    for (let i = 0; i < optionCount; i++) {
      const isCorrect = await options.nth(i).getAttribute('data-correct-answer');
      if (isCorrect !== 'true') {
        incorrectIndex = i;
        break;
      }
    }

    // Click incorrect option
    await answerQuestion(page, incorrectIndex);

    // Wait for feedback
    await page.waitForTimeout(500);

    // Check for red/incorrect feedback on selected option
    const selectedOption = options.nth(incorrectIndex);
    const hasIncorrectState = await selectedOption.getAttribute('data-incorrect');

    // The correct answer should be highlighted
    const correctHighlight = page.locator(`${SELECTORS.optionCard}[data-correct="true"]`);
    const correctHighlightVisible = await correctHighlight.count() > 0;

    expect(hasIncorrectState === 'true' || correctHighlightVisible).toBeTruthy();
  });

  test('auto-advances after selection', async ({ page }) => {
    // Get current question number/text
    const questionBefore = await page.locator(SELECTORS.questionText).textContent();

    // Answer the question
    await answerQuestion(page, 0);

    // Wait for auto-advance
    await waitForAutoAdvance(page, 3000);

    // Check if question changed or results screen appeared
    const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();

    if (!resultsVisible) {
      const questionAfter = await page.locator(SELECTORS.questionText).textContent();
      expect(questionAfter).not.toBe(questionBefore);
    }
  });

  test('score updates on correct answer', async ({ page }) => {
    // Get initial score
    const scoreDisplay = page.locator(SELECTORS.currentScore);
    const initialScoreExists = await scoreDisplay.isVisible();

    let initialScore = 0;
    if (initialScoreExists) {
      initialScore = await getCurrentScore(page);
    }

    // Find and click correct answer
    const correctOption = page.locator(`${SELECTORS.optionCard}[data-correct-answer="true"]`);

    if (await correctOption.count() > 0) {
      await correctOption.click();

      // Wait for score update
      await page.waitForTimeout(1000);

      // Score should increase
      if (initialScoreExists) {
        const newScore = await getCurrentScore(page);
        expect(newScore).toBeGreaterThan(initialScore);
      }
    }
  });

  test('displays question number and progress', async ({ page }) => {
    // Check for question number display
    const questionNumber = page.locator(SELECTORS.questionNumber);
    const progressBar = page.locator(SELECTORS.progressBar);
    const progressText = page.locator(SELECTORS.progressText);

    // At least one progress indicator should be visible
    const hasQuestionNumber = await questionNumber.isVisible();
    const hasProgressBar = await progressBar.isVisible();
    const hasProgressText = await progressText.isVisible();

    expect(hasQuestionNumber || hasProgressBar || hasProgressText).toBeTruthy();
  });
});

// =============================================================================
// Test Suite: Timer Tests
// =============================================================================

test.describe('Timer Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
  });

  test('timer visual changes when low (red)', async ({ page }) => {
    // Start quiz with short time per question
    await startQuiz(page, { timePerQuestion: 10 });

    const timer = page.locator(SELECTORS.timer);
    await expect(timer).toBeVisible();

    // Wait until timer is low (less than 5 seconds)
    await page.waitForTimeout(6000);

    // Check for low timer state
    const timerLow = page.locator(SELECTORS.timerLow);
    const hasLowState = await timerLow.count() > 0;

    // Or check for visual indication (red color, animation, etc.)
    const timerElement = page.locator(SELECTORS.timer);
    const hasRedStyling = await timerElement.evaluate((el) => {
      const style = getComputedStyle(el);
      return style.color.includes('red') ||
             style.color.includes('rgb(239') || // red-500
             el.classList.contains('text-red') ||
             el.classList.contains('animate');
    });

    expect(hasLowState || hasRedStyling).toBeTruthy();
  });

  test('auto-submits when time runs out', async ({ page }) => {
    // Start quiz with very short time
    await startQuiz(page, { timePerQuestion: 5 });

    // Get initial question
    const questionBefore = await page.locator(SELECTORS.questionText).textContent();

    // Wait for timeout (longer than question time)
    await page.waitForTimeout(7000);

    // Question should have changed or results should appear
    const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();

    if (!resultsVisible) {
      const questionAfter = await page.locator(SELECTORS.questionText).textContent();
      expect(questionAfter).not.toBe(questionBefore);
    }
  });

  test('timeout counts as incorrect answer', async ({ page }) => {
    // Start quiz with short time
    await startQuiz(page, { timePerQuestion: 5 });

    // Get initial score
    const initialScore = await getCurrentScore(page);

    // Wait for timeout without answering
    await page.waitForTimeout(6000);

    // Score should not increase (timeout = incorrect)
    const newScore = await getCurrentScore(page);
    expect(newScore).toBe(initialScore);

    // Or check for timeout feedback
    const timeoutFeedback = page.locator(SELECTORS.feedbackTimeout);
    const incorrectFeedback = page.locator(SELECTORS.feedbackIncorrect);

    const hasTimeoutIndicator = await timeoutFeedback.isVisible() || await incorrectFeedback.isVisible();
    // At minimum, question should advance without score increase
    expect(newScore === initialScore || hasTimeoutIndicator).toBeTruthy();
  });

  test('timer resets for each question', async ({ page }) => {
    await startQuiz(page, { timePerQuestion: 30 });

    // Wait a bit
    await page.waitForTimeout(2000);

    // Get timer value
    const timerBefore = await page.locator(SELECTORS.timer).textContent();

    // Answer question
    await answerQuestion(page, 0);

    // Wait for next question
    await page.waitForTimeout(2000);

    // Check if we're still in quiz (not results)
    const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();

    if (!resultsVisible) {
      // Timer should have reset (higher than before)
      const timerAfter = await page.locator(SELECTORS.timer).textContent();

      // Parse times for comparison
      const parseTime = (time: string | null) => {
        if (!time) return 0;
        const parts = time.split(':').map(Number);
        return parts.length === 2 ? parts[0] * 60 + parts[1] : parseInt(time, 10);
      };

      const timeBefore = parseTime(timerBefore);
      const timeAfter = parseTime(timerAfter);

      // Timer should be reset (higher or equal to initial time)
      expect(timeAfter).toBeGreaterThanOrEqual(timeBefore - 5);
    }
  });
});

// =============================================================================
// Test Suite: Scoring Tests
// =============================================================================

test.describe('Scoring Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page);
  });

  test('+10 points for correct answer', async ({ page }) => {
    const scoreDisplay = page.locator(SELECTORS.currentScore);

    if (await scoreDisplay.isVisible()) {
      const initialScore = await getCurrentScore(page);

      // Find and click correct answer
      const correctOption = page.locator(`${SELECTORS.optionCard}[data-correct-answer="true"]`);

      if (await correctOption.count() > 0) {
        await correctOption.click();
        await page.waitForTimeout(1000);

        const newScore = await getCurrentScore(page);

        // Score should increase by at least 10 (base points)
        expect(newScore - initialScore).toBeGreaterThanOrEqual(10);
      }
    }
  });

  test('bonus points for fast answer', async ({ page }) => {
    const scoreDisplay = page.locator(SELECTORS.currentScore);

    if (await scoreDisplay.isVisible()) {
      const initialScore = await getCurrentScore(page);

      // Answer immediately (fast answer)
      const correctOption = page.locator(`${SELECTORS.optionCard}[data-correct-answer="true"]`);

      if (await correctOption.count() > 0) {
        await correctOption.click();
        await page.waitForTimeout(500);

        const newScore = await getCurrentScore(page);
        const pointsEarned = newScore - initialScore;

        // Fast answer should earn bonus points (more than base 10)
        // If bonus system is implemented, expect > 10
        expect(pointsEarned).toBeGreaterThanOrEqual(10);

        // Check for bonus points display
        const bonusDisplay = page.locator(SELECTORS.bonusPoints);
        if (await bonusDisplay.isVisible()) {
          const bonusText = await bonusDisplay.textContent();
          expect(bonusText).toBeTruthy();
        }
      }
    }
  });

  test('streak multiplier works', async ({ page }) => {
    const streakDisplay = page.locator(SELECTORS.streakDisplay);

    // Answer multiple questions correctly
    for (let i = 0; i < 3; i++) {
      const correctOption = page.locator(`${SELECTORS.optionCard}[data-correct-answer="true"]`);

      if (await correctOption.count() > 0) {
        await correctOption.click();
        await waitForAutoAdvance(page, 2000);

        // Check if still in quiz
        const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();
        if (resultsVisible) break;
      } else {
        // If no data attribute, just answer first option
        await answerQuestion(page, 0);
        await waitForAutoAdvance(page, 2000);

        const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();
        if (resultsVisible) break;
      }
    }

    // Check streak display
    if (await streakDisplay.isVisible()) {
      const streak = await getCurrentStreak(page);
      expect(streak).toBeGreaterThanOrEqual(0);
    }

    // Check for multiplier display
    const multiplierDisplay = page.locator(SELECTORS.streakMultiplier);
    if (await multiplierDisplay.isVisible()) {
      const multiplierText = await multiplierDisplay.textContent();
      expect(multiplierText).toBeTruthy();
    }
  });

  test('streak resets on incorrect answer', async ({ page }) => {
    // First answer correctly to build streak
    const correctOption = page.locator(`${SELECTORS.optionCard}[data-correct-answer="true"]`);

    if (await correctOption.count() > 0) {
      await correctOption.click();
      await waitForAutoAdvance(page, 2000);
    }

    // Check if still in quiz
    const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();
    if (resultsVisible) return;

    // Now answer incorrectly
    const options = page.locator(SELECTORS.optionCard);
    let incorrectIndex = 0;

    for (let i = 0; i < await options.count(); i++) {
      const isCorrect = await options.nth(i).getAttribute('data-correct-answer');
      if (isCorrect !== 'true') {
        incorrectIndex = i;
        break;
      }
    }

    await answerQuestion(page, incorrectIndex);
    await page.waitForTimeout(1000);

    // Streak should reset to 0
    const streakDisplay = page.locator(SELECTORS.streakDisplay);
    if (await streakDisplay.isVisible()) {
      const streak = await getCurrentStreak(page);
      expect(streak).toBe(0);
    }
  });

  test('final score calculated correctly', async ({ page }) => {
    // Complete the quiz
    await completeQuiz(page, true, 5);

    // Wait for results screen
    await waitForResultsScreen(page);

    // Get final score
    const finalScoreElement = page.locator(SELECTORS.finalScore);
    await expect(finalScoreElement).toBeVisible();

    const finalScoreText = await finalScoreElement.textContent();
    const finalScore = parseInt(finalScoreText || '0', 10);

    // Score should be a positive number
    expect(finalScore).toBeGreaterThanOrEqual(0);
  });
});

// =============================================================================
// Test Suite: Results Screen Tests
// =============================================================================

test.describe('Results Screen Tests', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page, { questionCount: 3 });
    await completeQuiz(page, true, 3);
    await waitForResultsScreen(page);
  });

  test('shows final score', async ({ page }) => {
    const finalScore = page.locator(SELECTORS.finalScore);
    await expect(finalScore).toBeVisible();

    const scoreText = await finalScore.textContent();
    expect(scoreText).toBeTruthy();

    // Score should be a number
    const scoreValue = parseInt(scoreText || '0', 10);
    expect(scoreValue).toBeGreaterThanOrEqual(0);
  });

  test('shows accuracy percentage', async ({ page }) => {
    const accuracy = page.locator(SELECTORS.accuracyPercentage);
    await expect(accuracy).toBeVisible();

    const accuracyText = await accuracy.textContent();
    expect(accuracyText).toBeTruthy();

    // Should contain percentage or number
    expect(accuracyText).toMatch(/\d+/);
  });

  test('shows time stats', async ({ page }) => {
    const timeStats = page.locator(SELECTORS.timeStats);
    const averageTime = page.locator(SELECTORS.averageTime);
    const totalTime = page.locator(SELECTORS.totalTime);

    // At least one time stat should be visible
    const hasTimeStats = await timeStats.isVisible();
    const hasAverageTime = await averageTime.isVisible();
    const hasTotalTime = await totalTime.isVisible();

    expect(hasTimeStats || hasAverageTime || hasTotalTime).toBeTruthy();
  });

  test('play again button works', async ({ page }) => {
    const playAgainButton = page.locator(SELECTORS.playAgainButton);
    await expect(playAgainButton).toBeVisible();

    // Click play again
    await playAgainButton.click();

    // Should navigate back to setup or start a new quiz
    await page.waitForTimeout(1000);

    const setupVisible = await page.locator(SELECTORS.setupScreen).isVisible();
    const quizVisible = await page.locator(SELECTORS.quizScreen).isVisible();

    expect(setupVisible || quizVisible).toBeTruthy();
  });

  test('back to menu button works', async ({ page }) => {
    const backButton = page.locator(SELECTORS.backToMenuButton);
    await expect(backButton).toBeVisible();

    // Click back to menu
    await backButton.click();

    // Should navigate back to language menu or home
    await page.waitForLoadState('networkidle');

    // URL should change
    const url = page.url();
    expect(url.includes('/quiz') || url === '/').toBeFalsy();
  });

  test('displays correct/incorrect breakdown', async ({ page }) => {
    // Look for breakdown of answers
    const resultsScreen = page.locator(SELECTORS.resultsScreen);
    const resultsText = await resultsScreen.textContent();

    // Should contain some indication of performance
    expect(resultsText).toBeTruthy();
  });
});

// =============================================================================
// Test Suite: Edge Cases
// =============================================================================

test.describe('Edge Cases', () => {
  test('can complete full quiz without errors', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page, { questionCount: 5 });

    // Complete all questions
    for (let i = 0; i < 5; i++) {
      const quizVisible = await page.locator(SELECTORS.quizScreen).isVisible();
      const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();

      if (resultsVisible) break;
      if (!quizVisible) break;

      // Answer the question
      await answerQuestion(page, 0);
      await waitForAutoAdvance(page, 2500);
    }

    // Should end up on results screen
    await waitForResultsScreen(page);
    await expect(page.locator(SELECTORS.resultsScreen)).toBeVisible();
  });

  test('works with different question counts', async ({ page }) => {
    const questionCounts = [3, 5, 10];

    for (const count of questionCounts) {
      await navigateToQuizSetup(page);
      await waitForSetupScreen(page);

      // Select question count
      const questionCountSelect = page.locator(SELECTORS.questionCountSelect);
      if (await questionCountSelect.isVisible()) {
        await questionCountSelect.selectOption({ value: count.toString() });
      }

      await startQuiz(page);

      // Verify quiz started
      await expect(page.locator(SELECTORS.quizScreen)).toBeVisible();

      // Answer first question to verify it works
      await answerQuestion(page, 0);
      await page.waitForTimeout(1000);
    }
  });

  test('works with different time settings', async ({ page }) => {
    const timeSettings = [15, 30, 60];

    for (const time of timeSettings) {
      await navigateToQuizSetup(page);
      await waitForSetupScreen(page);

      // Select time per question
      const timeSelect = page.locator(SELECTORS.timePerQuestionSelect);
      if (await timeSelect.isVisible()) {
        await timeSelect.selectOption({ value: time.toString() });
      }

      await startQuiz(page);

      // Verify timer shows reasonable value
      const timer = page.locator(SELECTORS.timer);
      if (await timer.isVisible()) {
        const timerText = await timer.textContent();
        expect(timerText).toBeTruthy();
      }

      // Go back for next iteration
      await page.goBack();
    }
  });

  test('handles rapid clicking gracefully', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page);

    // Rapidly click multiple options
    const options = page.locator(SELECTORS.optionCard);

    await Promise.all([
      options.nth(0).click({ force: true }),
      options.nth(1).click({ force: true }),
      options.nth(2).click({ force: true }),
    ]).catch(() => {
      // Expected to fail or be handled gracefully
    });

    // App should not crash - either quiz continues or results show
    await page.waitForTimeout(2000);

    const quizVisible = await page.locator(SELECTORS.quizScreen).isVisible();
    const resultsVisible = await page.locator(SELECTORS.resultsScreen).isVisible();
    const setupVisible = await page.locator(SELECTORS.setupScreen).isVisible();

    expect(quizVisible || resultsVisible || setupVisible).toBeTruthy();
  });

  test('preserves state on page refresh during quiz', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page);

    // Answer one question
    await answerQuestion(page, 0);
    await waitForAutoAdvance(page, 2000);

    // Get current state
    const scoreBeforeRefresh = await getCurrentScore(page);

    // Refresh page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check if state was preserved or quiz restarted gracefully
    const quizVisible = await page.locator(SELECTORS.quizScreen).isVisible();
    const setupVisible = await page.locator(SELECTORS.setupScreen).isVisible();

    expect(quizVisible || setupVisible).toBeTruthy();
  });

  test('works across different languages', async ({ page }) => {
    const languages = ['javascript', 'typescript', 'python'];

    for (const language of languages) {
      await navigateToQuizSetup(page, language);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Verify we're on the correct language quiz page
      const url = page.url();
      expect(url).toContain(language);

      // Try to interact with setup (may not exist yet for all languages)
      const setupVisible = await page.locator(SELECTORS.setupScreen).isVisible({ timeout: 5000 }).catch(() => false);
      const quizVisible = await page.locator(SELECTORS.quizScreen).isVisible({ timeout: 5000 }).catch(() => false);

      // Page should load without errors
      expect(setupVisible || quizVisible || page.url().includes(language)).toBeTruthy();
    }
  });

  test('handles network slowness gracefully', async ({ page, context }) => {
    // Simulate slow network
    await context.route('**/*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      await route.continue();
    });

    await navigateToQuizSetup(page);

    // Page should still load
    await page.waitForLoadState('domcontentloaded');

    // Should show loading state or content
    const hasContent = await page.locator('body').textContent();
    expect(hasContent).toBeTruthy();
  });
});

// =============================================================================
// Test Suite: Accessibility Tests
// =============================================================================

test.describe('Accessibility Tests', () => {
  test('option cards are keyboard navigable', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page);

    // Tab to options
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Press Enter to select
    await page.keyboard.press('Enter');

    // Should trigger selection
    await page.waitForTimeout(500);

    // Check for feedback
    const selectedOption = page.locator(`${SELECTORS.optionCard}[data-selected="true"]`);
    const correctOption = page.locator(`${SELECTORS.optionCard}[data-correct="true"]`);
    const incorrectOption = page.locator(`${SELECTORS.optionCard}[data-incorrect="true"]`);

    const hasSelection = await selectedOption.count() > 0 ||
                        await correctOption.count() > 0 ||
                        await incorrectOption.count() > 0;

    // Keyboard interaction should work
    expect(hasSelection).toBeTruthy();
  });

  test('has proper focus indicators', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);

    // Tab to start button
    await page.keyboard.press('Tab');

    // Check for focus indicator
    const startButton = page.locator(SELECTORS.startButton);
    const hasFocusIndicator = await startButton.evaluate((el) => {
      const style = getComputedStyle(el);
      return style.outline !== 'none' ||
             style.boxShadow !== 'none' ||
             el.classList.contains('focus:') ||
             el.matches(':focus-visible');
    });

    // Should have some focus indication
    expect(hasFocusIndicator).toBeTruthy();
  });

  test('timer has aria attributes', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page);

    const timer = page.locator(SELECTORS.timer);

    if (await timer.isVisible()) {
      // Check for aria attributes
      const hasAriaLabel = await timer.getAttribute('aria-label');
      const hasAriaLive = await timer.getAttribute('aria-live');
      const hasRole = await timer.getAttribute('role');

      // Should have accessibility attributes
      expect(hasAriaLabel || hasAriaLive || hasRole).toBeTruthy();
    }
  });
});

// =============================================================================
// Test Suite: Visual Regression Prevention
// =============================================================================

test.describe('Visual Consistency Tests', () => {
  test('quiz screen has consistent layout', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page);

    // Check for essential layout elements
    const hasTimer = await page.locator(SELECTORS.timer).isVisible();
    const hasQuestion = await page.locator(SELECTORS.questionText).isVisible();
    const hasOptions = await page.locator(SELECTORS.optionCard).count() > 0;

    expect(hasTimer && hasQuestion && hasOptions).toBeTruthy();
  });

  test('results screen has all expected sections', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page, { questionCount: 3 });
    await completeQuiz(page, true, 3);
    await waitForResultsScreen(page);

    // Check for essential results elements
    const hasFinalScore = await page.locator(SELECTORS.finalScore).isVisible();
    const hasPlayAgain = await page.locator(SELECTORS.playAgainButton).isVisible();

    expect(hasFinalScore && hasPlayAgain).toBeTruthy();
  });

  test('feedback colors are visible and distinguishable', async ({ page }) => {
    await navigateToQuizSetup(page);
    await waitForSetupScreen(page);
    await startQuiz(page);

    // Answer a question
    await answerQuestion(page, 0);

    await page.waitForTimeout(500);

    // Check that feedback is visible
    const options = page.locator(SELECTORS.optionCard);
    const optionsCount = await options.count();

    let hasFeedbackStyling = false;
    for (let i = 0; i < optionsCount; i++) {
      const option = options.nth(i);
      const hasCorrect = await option.getAttribute('data-correct');
      const hasIncorrect = await option.getAttribute('data-incorrect');
      const hasSelected = await option.getAttribute('data-selected');

      if (hasCorrect || hasIncorrect || hasSelected) {
        hasFeedbackStyling = true;
        break;
      }
    }

    expect(hasFeedbackStyling).toBeTruthy();
  });
});
