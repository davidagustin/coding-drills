// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Storybook build output
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"],
  // Global TypeScript rule - ignore underscore-prefixed vars
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      }],
    },
  },
  // E2E test files - relax unused-vars for test utilities
  {
    files: ["e2e/**/*.ts", "e2e/**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_|^(clearLocalStorage|startDrill|submitAnswer|page|expect|hasNav|completedStat|MAX_SEARCH_ATTEMPTS|QUIZ_URL|SUPPORTED_LANGUAGES|progress|scoreBeforeRefresh|initialCount|filteredCount|isCollapsed|scrollY|main|errorVisible)$",
        destructuredArrayIgnorePattern: "^_",
      }],
    },
  },
]);

export default eslintConfig;
