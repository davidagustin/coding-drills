import { OpenFeature, InMemoryProvider } from '@openfeature/web-sdk';

/**
 * Feature flag definitions for the app.
 * These control experimental features and gradual rollouts.
 */
export const featureFlags = {
  // Interview mode with AI (WebLLM)
  interviewMode: 'interview-mode-enabled',
  // New quiz UI with animations
  animatedQuiz: 'animated-quiz-ui',
  // Show method hints in quiz
  quizMethodHints: 'quiz-method-hints',
  // Enable dark mode toggle
  darkModeToggle: 'dark-mode-toggle',
  // Show leaderboard
  leaderboard: 'leaderboard-enabled',
  // Enable keyboard shortcuts
  keyboardShortcuts: 'keyboard-shortcuts',
  // AI-powered hints
  aiHints: 'ai-powered-hints',
} as const;

/**
 * Default flag values for development/production.
 * In production, these would be overridden by a feature flag service.
 */
const defaultFlags = {
  [featureFlags.interviewMode]: {
    disabled: false,
    defaultVariant: 'off',
    variants: { on: true, off: false },
  },
  [featureFlags.animatedQuiz]: {
    disabled: false,
    defaultVariant: 'on',
    variants: { on: true, off: false },
  },
  [featureFlags.quizMethodHints]: {
    disabled: false,
    defaultVariant: 'on',
    variants: { on: true, off: false },
  },
  [featureFlags.darkModeToggle]: {
    disabled: false,
    defaultVariant: 'on',
    variants: { on: true, off: false },
  },
  [featureFlags.leaderboard]: {
    disabled: false,
    defaultVariant: 'on',
    variants: { on: true, off: false },
  },
  [featureFlags.keyboardShortcuts]: {
    disabled: false,
    defaultVariant: 'on',
    variants: { on: true, off: false },
  },
  [featureFlags.aiHints]: {
    disabled: false,
    defaultVariant: 'off',
    variants: { on: true, off: false },
  },
};

/**
 * Initialize OpenFeature with an in-memory provider.
 * In production, replace with your preferred provider (LaunchDarkly, Flagsmith, etc.)
 */
export async function initializeFeatureFlags() {
  const provider = new InMemoryProvider(defaultFlags);
  await OpenFeature.setProviderAndWait(provider);
  return OpenFeature.getClient();
}

/**
 * Get the OpenFeature client for evaluating flags.
 */
export function getFeatureFlagClient() {
  return OpenFeature.getClient();
}

/**
 * Check if a feature is enabled.
 */
export async function isFeatureEnabled(flagKey: string): Promise<boolean> {
  const client = getFeatureFlagClient();
  return client.getBooleanValue(flagKey, false);
}
