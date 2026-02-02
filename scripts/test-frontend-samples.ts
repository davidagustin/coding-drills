/**
 * Test script: validates every frontend drill sample solution through validateJavaScript().
 * Angular problems with validPatterns are skipped (pattern-based validation, not code execution).
 *
 * Usage: npx tsx scripts/test-frontend-samples.ts
 */

import { validateJavaScript } from '../lib/codeValidator';
import { angularProblems } from '../lib/frontend-drills/problems/angular';
import { nativeJsProblems } from '../lib/frontend-drills/problems/native-js';
import { reactProblems } from '../lib/frontend-drills/problems/react';
import { vueProblems } from '../lib/frontend-drills/problems/vue';
import type { FrontendDrillProblem } from '../lib/frontend-drills/types';

interface TestResult {
  id: string;
  framework: string;
  title: string;
  success: boolean;
  error?: string;
  expectedOutput?: unknown;
  actualOutput?: unknown;
}

function testProblem(problem: FrontendDrillProblem): TestResult {
  const result = validateJavaScript(problem.setupCode, problem.sample, problem.expected);
  if (result.success) {
    return { id: problem.id, framework: problem.framework, title: problem.title, success: true };
  }
  return {
    id: problem.id,
    framework: problem.framework,
    title: problem.title,
    success: false,
    error: result.error,
    expectedOutput: problem.expected,
    actualOutput: result.output,
  };
}

// Gather all problems to test (skip Angular with validPatterns)
const allProblems: FrontendDrillProblem[] = [
  ...reactProblems,
  ...vueProblems,
  ...nativeJsProblems,
  ...angularProblems.filter((p) => !p.validPatterns || p.validPatterns.length === 0),
];

console.log(`Testing ${allProblems.length} frontend drill samples...\n`);

const results: TestResult[] = [];
for (const problem of allProblems) {
  results.push(testProblem(problem));
}

const failures = results.filter((r) => !r.success);
const passes = results.filter((r) => r.success);

// Summary by framework
const frameworks = ['react', 'vue', 'native-js', 'angular'] as const;
for (const fw of frameworks) {
  const fwResults = results.filter((r) => r.framework === fw);
  const fwPasses = fwResults.filter((r) => r.success).length;
  const fwTotal = fwResults.length;
  console.log(`  ${fw}: ${fwPasses}/${fwTotal} passed`);
}

console.log(`\nTotal: ${passes.length}/${results.length} passed, ${failures.length} failed\n`);

if (failures.length > 0) {
  console.log('=== FAILURES ===\n');
  for (const f of failures) {
    console.log(`[${f.framework}] ${f.id}: ${f.title}`);
    console.log(`  Error: ${f.error}`);
    if (f.expectedOutput !== undefined) {
      console.log(`  Expected: ${JSON.stringify(f.expectedOutput)}`);
    }
    if (f.actualOutput !== undefined) {
      console.log(`  Actual:   ${JSON.stringify(f.actualOutput)}`);
    }
    console.log('');
  }
  process.exit(1);
} else {
  console.log('ALL SAMPLES PASS!');
  process.exit(0);
}
