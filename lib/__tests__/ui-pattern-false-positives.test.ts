/**
 * False positive detection for UI pattern starter code.
 *
 * When the generate-starters.ts script creates skeleton code from reference
 * implementations, it blanks function bodies but can miss "implementation
 * expressions" — variable assignments containing method chains with callbacks
 * (e.g. `const filtered = items.filter(f => ...)`), ternary logic, Math
 * operations, chained string methods, Object.keys/values/entries chains,
 * unblanked function bodies, and inline callbacks with implementation.
 * These leaked expressions cause behavioral tests to pass before the user
 * writes any code.
 *
 * This test iterates every UI pattern across all 4 frameworks and flags
 * starters that contain implementation logic which should have been blanked.
 */
import { describe, expect, it } from 'vitest';
import { angularStarters } from '../frontend-drills/ui-patterns/starters/angular';
import { nativeJsStarters } from '../frontend-drills/ui-patterns/starters/native-js';
import { reactStarters } from '../frontend-drills/ui-patterns/starters/react';
import { vueStarters } from '../frontend-drills/ui-patterns/starters/vue';
import { angularTests } from '../frontend-drills/ui-patterns/tests/angular';
import type { PatternTestCase } from '../frontend-drills/ui-patterns/tests/index';
import { nativeJsTests } from '../frontend-drills/ui-patterns/tests/native-js';
import { reactTests } from '../frontend-drills/ui-patterns/tests/react';
import { vueTests } from '../frontend-drills/ui-patterns/tests/vue';

// ─── Implementation patterns that should be blanked in starters ───

/** Regexes matching array/collection method chains with arrow callbacks. */
const IMPL_METHOD_CHAIN = [
  /\.\s*filter\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*map\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*reduce\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*find\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*findIndex\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*some\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*every\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*sort\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*flatMap\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
  /\.\s*forEach\s*\(\s*(?:\w+|\([^)]*\))\s*=>/,
];

/** Ternary expressions with comparison logic (not simple fallbacks). */
const IMPL_TERNARY =
  /\?[^:]*(?:[<>=!]=|\.test\(|\.includes\(|\.match\(|\.length\s*[<>=!]|Math\.|&&|\|\|).*:/;

/** Math.* operations (excluding Math.random alone). */
const IMPL_MATH = /Math\.(floor|ceil|round|max|min|abs|pow|sqrt|sign|trunc)\s*\(/;

/** Chained string/array methods (2+ calls). */
const IMPL_STRING_CHAIN =
  /\.\s*(?:replace|split|slice|substring|charAt|trim|padStart|padEnd)\s*\([^)]*\)\s*\.\s*(?:replace|split|join|slice|substring|charAt|trim|padStart|padEnd|toUpperCase|toLowerCase|map|filter)\s*\(/;

/** Object.keys/values/entries with callbacks. */
const IMPL_OBJECT_CHAIN =
  /Object\.\s*(?:keys|values|entries)\s*\([^)]*\)\s*\.\s*(?:map|filter|reduce|forEach|some|every|find)\s*\(/;

/** Check whether a starter string looks like an actual skeleton. */
function isSkeleton(code: string): boolean {
  return /\/\/\s*(TODO|Step\s+\d|Your\s+code|Your\s+answer|Implement)/i.test(code);
}

/**
 * Detect implementation expressions leaked into starter code.
 *
 * Checks for:
 * 1. Variable assignments with method chains + arrow callbacks
 * 2. Ternary expressions with comparison logic
 * 3. Math.* operations combined with arithmetic
 * 4. Chained string/array methods (2+ calls)
 * 5. Object.keys/values/entries with callbacks
 * 6. Unblanked function/arrow bodies (no TODO comment)
 * 7. Single-line and multi-line callbacks with implementation
 *
 * Skips:
 * - Lines inside JSX return blocks
 * - Hook/reactive declarations
 * - Destructuring
 * - Lines containing TODO comments
 * - Simple fallbacks (x || 'default', x ?? fallback)
 * - React component functions (uppercase names) and depth-0 utilities (which contain JSX, not implementation)
 *
 * Returns array of { lineNumber, content, category } for each leak found.
 */
function findImplementationLeaks(
  starterCode: string,
  frameworkName?: string,
): { lineNumber: number; content: string; category: string }[] {
  const lines = starterCode.split('\n');
  const leaks: { lineNumber: number; content: string; category: string }[] = [];

  // Track brace depth to skip JSX/template regions
  let insideReturn = false;

  // Track brace depth for skipped blocks (computed bodies, event handlers, etc.)
  // When a skipped line opens a block, skip all lines until the block closes.
  let skipBraceDepth = 0;

  // Track overall brace depth to detect if we're inside the main component/function
  let overallBraceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track overall brace depth
    for (const ch of line) {
      if (ch === '{') overallBraceDepth++;
      if (ch === '}') overallBraceDepth--;
    }

    // If inside a skipped block, track braces and skip until balanced
    if (skipBraceDepth > 0) {
      for (const ch of line) {
        if (ch === '{') skipBraceDepth++;
        if (ch === '}') skipBraceDepth--;
      }
      continue;
    }

    // Detect return statement (JSX starts here — skip)
    if (/^\s*return\s*[({]/.test(line) || /^\s*return\s*$/.test(line)) {
      insideReturn = true;
    }

    // Skip lines inside JSX return block
    if (insideReturn) continue;

    // Skip TODO/blanked lines (applies to all checks)
    if (/\/\/\s*TODO/i.test(trimmed)) continue;

    // ── Variable assignment checks ──
    const isVarAssignment = /^(const|let|var)\s+\w+\s*=/.test(trimmed);

    if (isVarAssignment) {
      // Skip lines that are function declarations — handled by unblanked-function-body check below
      const isFuncDecl =
        /^(const|let|var)\s+\w+\s*=\s*(?:\([^)]*\)|\w+)\s*=>\s*\{/.test(trimmed) ||
        /^(const|let|var)\s+\w+\s*=\s*function\s*\(/.test(trimmed);

      // Skip hook/state calls — also skip their block bodies if they open one
      if (/=\s*use\w+\s*\(/.test(trimmed) || /=\s*React\.use\w+\s*\(/.test(trimmed)) {
        for (const ch of line) {
          if (ch === '{') skipBraceDepth++;
          if (ch === '}') skipBraceDepth--;
        }
        continue;
      }
      if (/=\s*(?:ref|reactive|computed|watch)\s*\(/.test(trimmed)) {
        for (const ch of line) {
          if (ch === '{') skipBraceDepth++;
          if (ch === '}') skipBraceDepth--;
        }
        continue;
      }

      // Skip destructuring from modules: const { ... } = React  or  const [...] = useState(...)
      if (/^(const|let|var)\s*[[{]/.test(trimmed)) continue;

      // ── Check for unblanked function/arrow bodies ──
      if (isFuncDecl) {
        // Skip depth-0 functions (utilities before the main component) — these should have bodies
        // For React, also skip component functions (uppercase names) — they contain JSX, not implementation
        const fnNameMatch = trimmed.match(/^(?:const|let|var)\s+(\w+)/);
        const fnName = fnNameMatch?.[1];
        const isReactComponent = frameworkName === 'React' && fnName && /^[A-Z]/.test(fnName);
        const isDepth0 = overallBraceDepth === 1; // Opening brace already counted above, so depth 1 = top-level

        if (isDepth0 || isReactComponent) {
          continue; // Depth-0 utility or React component — skip this check
        }

        // Find matching close brace
        let depth = 0;
        let bodyEnd = i;
        for (let j = i; j < lines.length; j++) {
          for (const ch of lines[j]) {
            if (ch === '{') depth++;
            if (ch === '}') {
              depth--;
              if (depth === 0) {
                bodyEnd = j;
                break;
              }
            }
          }
          if (depth === 0) break;
        }

        // Check body for TODO
        const bodyLines = lines.slice(i + 1, bodyEnd);
        const bodyText = bodyLines.join('\n');
        const hasTodo = /\/\/\s*TODO/i.test(bodyText);
        const nonEmptyBodyLines = bodyLines.filter((l) => l.trim().length > 0);

        if (!hasTodo && nonEmptyBodyLines.length > 1) {
          leaks.push({ lineNumber: i + 1, content: trimmed, category: 'unblanked-function-body' });
        }
        continue;
      }

      // ── Method chain with arrow callback (existing check) ──
      const hasImplMethodChain = IMPL_METHOD_CHAIN.some((rx) => rx.test(trimmed));

      if (hasImplMethodChain) {
        leaks.push({ lineNumber: i + 1, content: trimmed, category: 'method-chain' });
        continue;
      }

      // ── Ternary expressions with comparison logic ──
      // Skip simple fallbacks like `x || 'default'` and `x ?? fallback`
      const afterEquals = trimmed.replace(/^(const|let|var)\s+\w+\s*=\s*/, '');
      const isSimpleFallback =
        /^\w+(?:\.\w+)*\s*(?:\|\||&&|\?\?)\s*['"`\w]/.test(afterEquals) &&
        !/\?[^:]*:/.test(afterEquals);
      if (!isSimpleFallback && IMPL_TERNARY.test(trimmed)) {
        leaks.push({ lineNumber: i + 1, content: trimmed, category: 'ternary-logic' });
        continue;
      }

      // ── Math.* operations combined with arithmetic ──
      if (IMPL_MATH.test(trimmed)) {
        // Only flag if combined with arithmetic operators (/, *, -, +) or nested expressions
        const hasMathWithArithmetic =
          /Math\.\w+\s*\([^)]*[/*\-+][^)]*\)/.test(trimmed) ||
          /[/*\-+]\s*Math\./.test(trimmed) ||
          /Math\.\w+\s*\([^)]*\)\s*[/*\-+]/.test(trimmed);
        if (hasMathWithArithmetic) {
          leaks.push({ lineNumber: i + 1, content: trimmed, category: 'math-operation' });
          continue;
        }
      }

      // ── Chained string methods (2+ calls) ──
      if (IMPL_STRING_CHAIN.test(trimmed)) {
        leaks.push({ lineNumber: i + 1, content: trimmed, category: 'string-chain' });
        continue;
      }

      // ── Object.keys/values/entries with callbacks ──
      if (IMPL_OBJECT_CHAIN.test(trimmed)) {
        leaks.push({ lineNumber: i + 1, content: trimmed, category: 'object-chain' });
        continue;
      }

      // ── Multi-line continuation check for method chains (existing) ──
      if (!trimmed.endsWith(';')) {
        const contLines = [trimmed];
        for (let k = i + 1; k < Math.min(i + 5, lines.length); k++) {
          contLines.push(lines[k].trim());
          if (lines[k].trim().endsWith(';')) break;
        }
        const joined = contLines.join(' ');
        if (IMPL_METHOD_CHAIN.some((rx) => rx.test(joined))) {
          leaks.push({ lineNumber: i + 1, content: trimmed, category: 'method-chain' });
          continue;
        }
      }

      continue;
    }

    // ── Non-variable-assignment checks ──

    // Skip function/class declarations (handled separately)
    if (/^(function|class)\s/.test(trimmed)) {
      // Check for unblanked function body (standalone function declarations)
      const funcMatch = trimmed.match(/^function\s+(\w+)\s*\([^)]*\)\s*\{/);
      if (funcMatch) {
        // Skip depth-0 functions (utilities before the main component) — these should have bodies
        // For React, also skip component functions (uppercase names) — they contain JSX, not implementation
        const fnName = funcMatch[1];
        const isReactComponent = frameworkName === 'React' && /^[A-Z]/.test(fnName);
        const isDepth0 = overallBraceDepth === 1; // Opening brace already counted above, so depth 1 = top-level

        if (isDepth0 || isReactComponent) {
          continue; // Depth-0 utility or React component — skip this check
        }

        let depth = 0;
        let bodyEnd = i;
        for (let j = i; j < lines.length; j++) {
          for (const ch of lines[j]) {
            if (ch === '{') depth++;
            if (ch === '}') {
              depth--;
              if (depth === 0) {
                bodyEnd = j;
                break;
              }
            }
          }
          if (depth === 0) break;
        }

        const bodyLines = lines.slice(i + 1, bodyEnd);
        const bodyText = bodyLines.join('\n');
        const hasTodo = /\/\/\s*TODO/i.test(bodyText);
        const nonEmptyBodyLines = bodyLines.filter((l) => l.trim().length > 0);

        if (!hasTodo && nonEmptyBodyLines.length > 1) {
          leaks.push({ lineNumber: i + 1, content: trimmed, category: 'unblanked-function-body' });
        }
      }
      continue;
    }

    // ── Single-line callback detection ──
    // something.addEventListener('event', () => { logic; });
    // items.forEach(item => { logic; });
    const hasSingleLineCallback = /=>\s*\{[^}]+\}/.test(trimmed);
    const isCallbackStatement =
      /\.addEventListener\s*\(/.test(trimmed) ||
      /\.\s*(?:forEach|map|reduce|filter)\s*\(/.test(trimmed) ||
      /new\s+(?:IntersectionObserver|MutationObserver|ResizeObserver)\s*\(/.test(trimmed);

    if (hasSingleLineCallback && isCallbackStatement) {
      // Extract the callback body and check if it has implementation
      const bodyMatch = trimmed.match(/=>\s*\{([^}]+)\}/);
      if (bodyMatch) {
        const callbackBody = bodyMatch[1].trim();
        // Skip if it's just a TODO
        if (!/\/\/\s*TODO/i.test(callbackBody) && callbackBody.length > 5) {
          leaks.push({ lineNumber: i + 1, content: trimmed, category: 'single-line-callback' });
          continue;
        }
      }
    }

    // ── Multi-line callback without TODO (not on variable assignment) ──
    if (/=>\s*\{$/.test(trimmed) && isCallbackStatement) {
      let depth = 0;
      let bodyEnd = i;
      for (let j = i; j < lines.length; j++) {
        for (const ch of lines[j]) {
          if (ch === '{') depth++;
          if (ch === '}') {
            depth--;
            if (depth === 0) {
              bodyEnd = j;
              break;
            }
          }
        }
        if (depth === 0) break;
      }
      const bodyText = lines.slice(i + 1, bodyEnd).join('\n');
      if (!/\/\/\s*TODO/i.test(bodyText) && bodyText.trim().length > 5) {
        leaks.push({ lineNumber: i + 1, content: trimmed, category: 'multi-line-callback' });
      }
    }
  }

  return leaks;
}

// ─── Test data ───

interface FrameworkTestData {
  name: string;
  starters: Record<string, string>;
  tests: Record<string, PatternTestCase[]>;
}

const frameworks: FrameworkTestData[] = [
  { name: 'React', starters: reactStarters, tests: reactTests },
  { name: 'Vue', starters: vueStarters, tests: vueTests },
  { name: 'Angular', starters: angularStarters, tests: angularTests },
  { name: 'Native JS', starters: nativeJsStarters, tests: nativeJsTests },
];

// ─── Tests ───

describe('UI Pattern starter code — false positive detection', () => {
  for (const fw of frameworks) {
    describe(fw.name, () => {
      const patternIds = Object.keys(fw.starters);

      it(`should have starters for all patterns with tests`, () => {
        const testPatternIds = Object.keys(fw.tests);
        const missingStarters = testPatternIds.filter((id) => !fw.starters[id]);
        // Not a hard failure — some patterns may not have starters yet
        if (missingStarters.length > 0) {
          console.warn(
            `${fw.name}: ${missingStarters.length} patterns with tests but no starter: ${missingStarters.slice(0, 5).join(', ')}...`,
          );
        }
      });

      for (const patternId of patternIds) {
        const starter = fw.starters[patternId];
        const tests = fw.tests[patternId];

        // Only check patterns that have both a starter AND behavioral tests
        if (!starter || !tests || tests.length === 0) continue;

        // Only check starters that pass the isSkeleton gate (others are ignored by the page)
        if (!isSkeleton(starter)) continue;

        it(`${patternId} — starter should not contain implementation expressions`, () => {
          const leaks = findImplementationLeaks(starter, fw.name);

          if (leaks.length > 0) {
            const details = leaks
              .map((l) => `  [${l.category}] line ${l.lineNumber}: ${l.content}`)
              .join('\n');
            expect.soft(leaks.length, `Implementation leaked in ${patternId}:\n${details}`).toBe(0);
          }
        });
      }
    });
  }
});
