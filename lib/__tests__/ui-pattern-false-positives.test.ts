/**
 * False positive detection for UI pattern starter code.
 *
 * When the generate-starters.ts script creates skeleton code from reference
 * implementations, it blanks function bodies but can miss "implementation
 * expressions" — variable assignments containing method chains with callbacks
 * (e.g. `const filtered = items.filter(f => ...)`). These leaked expressions
 * cause behavioral tests to pass before the user writes any code.
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

/** Check whether a starter string looks like an actual skeleton. */
function isSkeleton(code: string): boolean {
  return /\/\/\s*(TODO|Step\s+\d|Your\s+code|Your\s+answer|Implement)/i.test(code);
}

/**
 * Detect implementation expressions leaked into starter code.
 *
 * Only checks lines that are:
 * 1. Variable assignments (`const/let/var NAME = ...`)
 * 2. NOT function declarations (those are handled by blankFunctionBodies)
 * 3. NOT hook/state calls (useState, useRef, computed, ref, etc.)
 * 4. NOT simple destructuring from modules
 * 5. Contain method chains with arrow callbacks (.filter(f =>, .map(x =>, etc.)
 *
 * Returns array of { line, lineNumber, content } for each leak found.
 */
function findImplementationLeaks(starterCode: string): { lineNumber: number; content: string }[] {
  const lines = starterCode.split('\n');
  const leaks: { lineNumber: number; content: string }[] = [];

  // Track brace depth to skip JSX/template regions
  let insideReturn = false;

  // Track brace depth for skipped blocks (computed bodies, event handlers, etc.)
  // When a skipped line opens a block, skip all lines until the block closes.
  let skipBraceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

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

    // Only check const/let/var assignments
    if (!/^(const|let|var)\s+\w+\s*=/.test(trimmed)) continue;

    // Skip lines that are function declarations (already blanked or intentionally kept)
    // Arrow function declarations: `const fn = (params) => {` or `const fn = param => {`
    if (/^(const|let|var)\s+\w+\s*=\s*(?:\([^)]*\)|\w+)\s*=>\s*\{/.test(trimmed)) continue;
    // Function expressions: `const fn = function(`
    if (/^(const|let|var)\s+\w+\s*=\s*function\s*\(/.test(trimmed)) continue;

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

    // Skip TODO/blanked lines
    if (/\/\/\s*TODO/i.test(trimmed)) continue;

    // Check for implementation method chains with callbacks
    const hasImplMethodChain = IMPL_METHOD_CHAIN.some((rx) => rx.test(trimmed));

    // Also check multi-line: if this line doesn't end with ; and continues
    // to the next line(s), join them and check — but stop at statement boundaries
    if (!hasImplMethodChain && !trimmed.endsWith(';')) {
      const contLines = [trimmed];
      for (let k = i + 1; k < Math.min(i + 5, lines.length); k++) {
        contLines.push(lines[k].trim());
        if (lines[k].trim().endsWith(';')) break;
      }
      const joined = contLines.join(' ');
      if (IMPL_METHOD_CHAIN.some((rx) => rx.test(joined))) {
        leaks.push({ lineNumber: i + 1, content: trimmed });
        continue;
      }
    }

    if (hasImplMethodChain) {
      leaks.push({ lineNumber: i + 1, content: trimmed });
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
          const leaks = findImplementationLeaks(starter);

          if (leaks.length > 0) {
            const details = leaks.map((l) => `  line ${l.lineNumber}: ${l.content}`).join('\n');
            expect.soft(leaks.length, `Implementation leaked in ${patternId}:\n${details}`).toBe(0);
          }
        });
      }
    });
  }
});
