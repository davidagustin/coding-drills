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
 *
 * Tests can be synchronous (return boolean) or async (return Promise<boolean>).
 * Async tests are useful for dispatching events, waiting for framework re-renders,
 * then checking DOM state — e.g. clicking a button and verifying the modal opens.
 */
export function buildTestRunnerScript(tests: PatternTestCase[]): string {
  const testDefs = tests
    .map(
      (t, i) =>
        `{ name: ${JSON.stringify(t.name)}, id: ${i}, test: function() { return ${t.test}; } }`,
    )
    .join(',\n    ');

  return `
// Intercept submit-button clicks so form submission works in sandbox="allow-scripts"
// iframes (which block native form submission). Converts btn.click() into a synthetic
// submit event that frameworks (React, Vue, Angular) handle normally.
document.addEventListener('click', function(e) {
  var el = e.target;
  while (el && el !== document) {
    if ((el.type === 'submit' || (el.tagName === 'BUTTON' && !el.type)) && el.form) {
      e.preventDefault();
      e.stopPropagation();
      el.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      return;
    }
    el = el.parentElement;
  }
}, true);
window.__tests = [
    ${testDefs}
];
window.__runTests = async function() {
  var snapshot = document.body.innerHTML;
  var results = [];
  for (var i = 0; i < window.__tests.length; i++) {
    var t = window.__tests[i];
    try {
      var result = t.test();
      if (result && typeof result.then === 'function') {
        result = await result;
      }
      results.push({ name: t.name, id: t.id, pass: !!result });
    } catch (e) {
      results.push({ name: t.name, id: t.id, pass: false, error: e.message });
    }
  }
  document.body.innerHTML = snapshot;
  window.parent.postMessage({ type: 'pattern-test-results', results: results }, '*');
};`;
}
