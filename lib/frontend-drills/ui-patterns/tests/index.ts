/**
 * Test cases for UI pattern exercises.
 * Each pattern gets an array of tests that verify the user's implementation
 * by checking DOM state, element existence, and behavior in the sandbox iframe.
 */

import type { FrameworkId } from '../../types';
import { angularTests } from './angular';
import { nativeJsTests } from './native-js';
import { reactTests } from './react';
import { vueTests } from './vue';

export interface PatternTestCase {
  /** Short description shown to the user */
  name: string;
  /** JavaScript code that returns a boolean (true = pass). Runs inside the sandbox iframe. */
  test: string;
}

const testsByFramework: Record<FrameworkId, Record<string, PatternTestCase[]>> = {
  react: reactTests,
  vue: vueTests,
  angular: angularTests,
  'native-js': nativeJsTests,
};

export function getPatternTests(
  framework: FrameworkId,
  patternId: string,
): PatternTestCase[] | undefined {
  return testsByFramework[framework]?.[patternId];
}

/**
 * Generates the JavaScript test runner code to inject into the sandbox iframe.
 * The runner defines window.__runTests() which executes all tests and posts
 * results back to the parent page via postMessage.
 */
export function buildTestRunnerScript(tests: PatternTestCase[]): string {
  const testDefs = tests
    .map(
      (t, i) =>
        `{ name: ${JSON.stringify(t.name)}, id: ${i}, test: function() { return ${t.test}; } }`,
    )
    .join(',\n    ');

  return `
window.__tests = [
    ${testDefs}
];
window.__runTests = function() {
  var results = window.__tests.map(function(t) {
    try {
      return { name: t.name, id: t.id, pass: !!t.test() };
    } catch (e) {
      return { name: t.name, id: t.id, pass: false, error: e.message };
    }
  });
  window.parent.postMessage({ type: 'pattern-test-results', results: results }, '*');
};`;
}
