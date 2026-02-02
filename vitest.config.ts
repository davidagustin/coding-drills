import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const runStorybookTests = process.env.RUN_STORYBOOK_TESTS === '1';

const storybookProject = {
  extends: true,
  plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: 'chromium' as const }],
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
};

const unitProject = {
  // Regular unit tests (Node.js environment)
  test: {
    name: 'unit',
    include: [
      'lib/**/*.test.ts',
      'lib/**/__tests__/**/*.ts',
      'hooks/**/*.test.{ts,tsx}',
      'hooks/**/__tests__/**/*.{ts,tsx}',
      'components/**/*.test.{ts,tsx}',
      'components/**/__tests__/**/*.{ts,tsx}',
    ],
    environment: 'node',
    globals: true,
  },
};

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// Storybook project is opt-in (RUN_STORYBOOK_TESTS=1) due to browser/addon infra flakiness in CI.
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: runStorybookTests ? [storybookProject, unitProject] : [unitProject],
  },
});
