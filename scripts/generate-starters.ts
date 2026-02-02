/**
 * Generates scaffolded starter code from reference demoCode for all UI patterns.
 *
 * For each pattern, takes the full working reference code and:
 * 1. Keeps all state/ref/data declarations
 * 2. Keeps full JSX/template structure with correct class names
 * 3. Replaces function bodies with empty stubs + TODO comments
 * 4. Keeps framework boilerplate (createRoot, mount, etc.)
 *
 * The user only needs to implement business logic inside the empty function bodies.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { angularUIPatterns } from '../lib/frontend-drills/ui-patterns/angular';
import { nativeJsUIPatterns } from '../lib/frontend-drills/ui-patterns/native-js';
import { reactUIPatterns } from '../lib/frontend-drills/ui-patterns/react';
import { angularStarters } from '../lib/frontend-drills/ui-patterns/starters/angular';
import { nativeJsStarters } from '../lib/frontend-drills/ui-patterns/starters/native-js';
import { reactStarters } from '../lib/frontend-drills/ui-patterns/starters/react';
import { vueStarters } from '../lib/frontend-drills/ui-patterns/starters/vue';
import { vueUIPatterns } from '../lib/frontend-drills/ui-patterns/vue';

// ─── Helpers ────────────────────────────────────────────────

/** Convert camelCase function name to a human-readable description */
function nameToDescription(name: string): string {
  // Convert camelCase to words
  const words = name
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Generate a TODO comment for a function based on its name and body */
function generateTodo(name: string, body: string): string {
  // Try to extract intent from body patterns
  const hints: string[] = [];

  if (body.includes('setState') || body.includes('set') || body.includes('.value ='))
    hints.push('update state');
  if (body.includes('filter')) hints.push('filter items');
  if (body.includes('.push(')) hints.push('add item');
  if (body.includes('.splice(') || body.includes('filter')) hints.push('remove item');
  if (body.includes('preventDefault')) hints.push('prevent default');
  if (body.includes('e.key') || body.includes('keyCode')) hints.push('handle keyboard events');
  if (body.includes('fetch(') || body.includes('async')) hints.push('handle async operation');
  if (body.includes('validate') || body.includes('error')) hints.push('validate input');
  if (body.includes('classList')) hints.push('toggle CSS classes');
  if (body.includes('innerHTML') || body.includes('textContent')) hints.push('update DOM content');
  if (body.includes('style.')) hints.push('update styles');
  if (body.includes('setTimeout') || body.includes('setInterval')) hints.push('handle timing');
  if (body.includes('addEventListener')) hints.push('attach event listeners');
  if (body.includes('Math.')) hints.push('calculate values');

  const desc = nameToDescription(name);
  if (hints.length > 0) {
    return `// TODO: ${desc} — ${[...new Set(hints)].slice(0, 3).join(', ')}`;
  }
  return `// TODO: Implement ${name}`;
}

// ─── Core Transformation ────────────────────────────────────

/**
 * Finds function/arrow-function declarations in the code and replaces
 * their bodies with TODO stubs. Keeps everything else intact.
 *
 * Strategy:
 * - React: blank functions at depth 1 (inside main component), keep component shells
 * - Vue: blank functions at depth 2 (inside setup()), keep setup shell
 * - Angular/Native JS: blank functions at depth 0 (top-level)
 */
function blankFunctionBodies(
  code: string,
  framework: 'react' | 'vue' | 'angular' | 'native-js',
): string {
  const lines = code.split('\n');
  const result: string[] = [];

  // Determine the target depth for blanking based on framework
  // React: depth 1 (inside function App() { ... })
  // Vue: depth 2 (inside createApp({ setup() { ... } }))
  // Angular/Native JS: depth 0 (top-level)
  const targetDepth = framework === 'react' ? 1 : framework === 'vue' ? 2 : 0;

  // Track global brace depth
  let globalDepth = 0;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Calculate depth at the START of this line (before processing its braces)
    const depthAtLineStart = globalDepth;

    // ─── Check if this line starts a function we should blank ───

    // Only attempt to blank functions at the right depth
    const shouldAttemptBlank = depthAtLineStart === targetDepth;

    let funcName: string | null = null;
    let isMultiLine = false;
    let isSingleLine = false;
    let isCurried = false;
    let isReactiveWrapper = false;
    let arrowSingleExpr: string | undefined;

    if (shouldAttemptBlank) {
      // Pattern 1: const name = (params) => {  (multi-line arrow)
      const arrowMultiMatch = trimmed.match(
        /^(const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|(\w+))\s*=>\s*\{/,
      );

      // Pattern 2: const name = function(params) {
      const fnExprMatch = trimmed.match(
        /^(const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?function\s*\([^)]*\)\s*\{/,
      );

      // Pattern 3: function name(params) {  or  async function name(params) {
      const fnDeclMatch = trimmed.match(/^(?:async\s+)?function\s+(\w+)\s*\([^)]*\)\s*\{/);

      // Pattern 4: const name = (params) => expression;  (single-line arrow)
      const arrowSingleMatch = trimmed.match(
        /^(const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)|(\w+))\s*=>\s*(?!\{)(.+);$/,
      );

      // Pattern 5: const name = (params) => (params) => {  (curried multi-line arrow)
      const curriedMultiMatch = trimmed.match(
        /^(const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)|\w+)\s*=>\s*(?:\([^)]*\)|\w+)\s*=>\s*\{/,
      );

      // Pattern 6: const name = (params) => (params) => expression;  (curried single-line)
      const curriedSingleMatch = trimmed.match(
        /^(const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)|\w+)\s*=>\s*(?:\([^)]*\)|\w+)\s*=>\s*(?!\{)(.+);$/,
      );

      // Check curried patterns BEFORE non-curried (curried is more specific)
      if (curriedMultiMatch) {
        funcName = curriedMultiMatch[2];
        isMultiLine = true;
        isCurried = true;
      } else if (curriedSingleMatch) {
        funcName = curriedSingleMatch[2];
        isSingleLine = true;
        isCurried = true;
        arrowSingleExpr = curriedSingleMatch[3];
      } else if (arrowMultiMatch) {
        funcName = arrowMultiMatch[2];
        isMultiLine = true;
      } else if (fnExprMatch) {
        funcName = fnExprMatch[2];
        isMultiLine = true;
      } else if (fnDeclMatch) {
        funcName = fnDeclMatch[1];
        isMultiLine = true;
      } else if (arrowSingleMatch) {
        funcName = arrowSingleMatch[2];
        isSingleLine = true;
        arrowSingleExpr = arrowSingleMatch[4];
      }

      // Pattern 7: const name = computed/useMemo(() => { ... }) (reactive wrapper)
      // The inner arrow body contains implementation logic that should be blanked,
      // but the computed/useMemo wrapper itself is kept.
      if (!funcName) {
        const reactiveWrapperMatch = trimmed.match(
          /^(const|let|var)\s+(\w+)\s*=\s*(?:computed|useMemo)\s*\(\s*(?:\([^)]*\)|\w+)\s*=>\s*\{/,
        );
        if (reactiveWrapperMatch) {
          funcName = reactiveWrapperMatch[2];
          isMultiLine = true;
          isReactiveWrapper = true;
        }
      }

      // Pattern 8: obj.prop = function() { or obj.prop = () => {  (property assignment functions)
      if (!funcName) {
        const propFnMatch = trimmed.match(
          /^([\w.]+)\s*=\s*(?:async\s+)?(?:function\s*(?:\w+)?\s*\([^)]*\)|(?:\([^)]*\)|\w+)\s*=>)\s*\{/,
        );
        if (propFnMatch && !/^(const|let|var)\s/.test(trimmed)) {
          // Extract the last segment as function name: window.submitSurvey → submitSurvey
          funcName = propFnMatch[1].split('.').pop() || propFnMatch[1];
          isMultiLine = true;
        }
      }
    }

    // ─── Determine if we should skip this function ───

    const isReactComponent = framework === 'react' && funcName && /^[A-Z]/.test(funcName);
    const isHookOrState =
      funcName &&
      (funcName.startsWith('use') ||
        trimmed.includes('useState(') ||
        trimmed.includes('useRef(') ||
        trimmed.includes('useContext(') ||
        trimmed.includes('useMemo(') ||
        trimmed.includes('useCallback(') ||
        trimmed.includes('useReducer(') ||
        trimmed.includes('ref(') ||
        trimmed.includes('reactive(') ||
        trimmed.includes('computed('));

    const shouldBlank = funcName && !isReactComponent && (!isHookOrState || isReactiveWrapper);

    if (shouldBlank && isMultiLine) {
      // Multi-line function — find the closing brace and replace body
      const indent = line.match(/^(\s*)/)?.[1] || '';

      // Count braces to find the matching close
      let braceDepth = 0;
      let bodyEnd = i;

      for (let j = i; j < lines.length; j++) {
        const l = lines[j];
        for (const ch of l) {
          if (ch === '{') braceDepth++;
          if (ch === '}') braceDepth--;
        }
        if (braceDepth === 0) {
          bodyEnd = j;
          break;
        }
      }

      // Extract body for TODO hint generation
      const bodyContent = lines.slice(i + 1, bodyEnd).join('\n');
      const todo = generateTodo(funcName ?? '', bodyContent);

      // Signature: everything up to and including the first {
      const openBraceIdx = line.indexOf('{');
      const sigLine = openBraceIdx >= 0 ? line.substring(0, openBraceIdx + 1) : line;

      // Closing: extract the suffix after the last }
      const closingLine = lines[bodyEnd];
      const closingTrimmed = closingLine.trim();
      const lastBraceIdx = closingTrimmed.lastIndexOf('}');
      const closingSuffix = closingTrimmed.substring(lastBraceIdx);

      result.push(sigLine);
      result.push(`${indent}  ${todo}`);
      result.push(indent + closingSuffix);

      // Update global depth for the lines we skipped
      // After the function body, depth should be back to what it was before
      // (braces balanced)
      globalDepth = depthAtLineStart;

      // But we still need to count the opening/closing of the function itself
      // Actually, the function's { and } are balanced, so depth stays the same
      // However, if closingSuffix is just `};` the ; doesn't affect depth

      i = bodyEnd + 1;
      continue;
    } else if (shouldBlank && isSingleLine && arrowSingleExpr) {
      // Single-line arrow function — convert to multi-line with TODO
      const todo = generateTodo(funcName ?? '', arrowSingleExpr);
      const indent = line.match(/^(\s*)/)?.[1] || '';

      // For curried functions (a => b => expr), keep the full curried signature
      // by finding the second =>. For regular functions, use the first =>.
      let arrowIdx = trimmed.indexOf('=>');
      if (isCurried) {
        arrowIdx = trimmed.indexOf('=>', arrowIdx + 2);
      }
      const sigPart = trimmed.substring(0, arrowIdx + 2);
      result.push(`${indent + sigPart} {`);
      result.push(`${indent}  ${todo}`);
      result.push(`${indent}};`);

      // Update global depth: no net change (single line)
      // But count braces on the original line to keep depth accurate
      for (const ch of line) {
        if (ch === '{') globalDepth++;
        if (ch === '}') globalDepth--;
      }

      i++;
      continue;
    }

    // ─── Check for implementation expressions that should be blanked ───
    // Variable assignments containing method chains with arrow callbacks
    // (e.g., `const filtered = items.filter(f => ...)`)
    // These aren't function declarations but contain business logic that
    // causes false-positive test passes when left in starter code.
    if (shouldAttemptBlank && !funcName) {
      const varMatch = trimmed.match(/^(const|let|var)\s+(\w+)\s*=/);
      if (varMatch) {
        const varKeyword = varMatch[1];
        const varName = varMatch[2];

        // Skip hooks and reactive primitives (these are setup, not logic)
        const isHookOrReactive =
          /=\s*(use\w+|React\.use\w+|ref|reactive|computed|watch|inject|provide)\s*\(/.test(
            trimmed,
          );

        // Skip destructuring (const { x } = ... or const [ x ] = ...)
        const isDestructuring = /^(const|let|var)\s*[[{]/.test(trimmed);

        if (!isHookOrReactive && !isDestructuring) {
          // Collect full expression (may span multiple lines)
          let fullExpr = trimmed;
          let exprEnd = i;

          if (!trimmed.endsWith(';') && !trimmed.endsWith(',')) {
            let parenDepth = 0;
            let bracketDepth = 0;
            let braceDepthLocal = 0;
            for (let j = i; j < lines.length; j++) {
              const l = lines[j].trim();
              for (const ch of l) {
                if (ch === '(') parenDepth++;
                if (ch === ')') parenDepth--;
                if (ch === '[') bracketDepth++;
                if (ch === ']') bracketDepth--;
                if (ch === '{') braceDepthLocal++;
                if (ch === '}') braceDepthLocal--;
              }
              if (j > i) fullExpr += ' ' + l;
              if (
                parenDepth <= 0 &&
                bracketDepth <= 0 &&
                braceDepthLocal <= 0 &&
                (l.endsWith(';') || l.endsWith(','))
              ) {
                exprEnd = j;
                break;
              }
              if (j === lines.length - 1) exprEnd = j;
            }
          }

          // Regexes matching method chains with arrow callbacks
          const IMPL_METHODS = [
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

          // Expanded implementation detection patterns
          const hasMethodChain = IMPL_METHODS.some((rx) => rx.test(fullExpr));

          // Ternary with non-trivial logic (comparisons, method calls, Math)
          const hasTernaryLogic =
            /\?[^:]+:/.test(fullExpr) &&
            /(?:[<>=!]=|\.test\(|\.includes\(|\.match\(|\.length\s*[<>=!]|Math\.|&&|\|\||\.localeCompare\()/.test(
              fullExpr,
            ) &&
            !/^\s*(const|let|var)\s+\w+\s*=\s*\w+\s*\?\?/.test(fullExpr); // skip nullish coalescing

          // Math.* operations combined with arithmetic
          const hasMathOp =
            /Math\.(floor|ceil|round|max|min|abs|pow|sqrt|sign|trunc)\s*\(/.test(fullExpr) &&
            /[+\-*/%]/.test(fullExpr.replace(/['"][^'"]*['"]/g, '')); // has arithmetic outside strings

          // Chained string methods (2+ methods)
          const hasStringChain =
            /\.\s*(?:replace|split|slice|substring|charAt|trim|padStart|padEnd)\s*\([^)]*\)\s*\.\s*(?:replace|split|join|slice|substring|charAt|trim|padStart|padEnd|toUpperCase|toLowerCase|map|filter)\s*\(/.test(
              fullExpr,
            );

          // Object.keys/values/entries with callbacks
          const hasObjectMethodChain =
            /Object\.\s*(?:keys|values|entries)\s*\([^)]*\)\s*\.\s*(?:map|filter|reduce|forEach|some|every|find)\s*\(/.test(
              fullExpr,
            );

          // toLocaleString/toFixed/Intl formatting
          const hasFormatting =
            /\.\s*(?:toLocaleString|toFixed|toPrecision)\s*\(/.test(fullExpr) &&
            !/^(const|let|var)\s+\w+\s*=\s*['"]/.test(fullExpr); // not simple string assignment

          const isImplementation =
            hasMethodChain ||
            hasTernaryLogic ||
            hasMathOp ||
            hasStringChain ||
            hasObjectMethodChain ||
            hasFormatting;

          if (isImplementation) {
            // Determine safe default based on the dominant pattern
            let defaultVal = '[]';
            if (hasMethodChain) {
              const hasArrayMethod = /\.\s*(filter|map|flatMap|sort)\s*\(/.test(fullExpr);
              if (!hasArrayMethod) {
                if (/\.\s*find\s*\(/.test(fullExpr)) defaultVal = 'null';
                else if (/\.\s*findIndex\s*\(/.test(fullExpr)) defaultVal = '-1';
                else if (/\.\s*(some|every)\s*\(/.test(fullExpr)) defaultVal = 'false';
                else if (/\.\s*reduce\s*\(/.test(fullExpr)) defaultVal = 'null';
              }
            } else if (hasTernaryLogic) {
              defaultVal = 'null';
            } else if (hasMathOp) {
              defaultVal = '0';
            } else if (hasStringChain || hasFormatting) {
              defaultVal = "''";
            } else if (hasObjectMethodChain) {
              if (/\.\s*(map|filter)\s*\(/.test(fullExpr)) defaultVal = '[]';
              else defaultVal = 'null';
            }

            const indent = line.match(/^(\s*)/)?.[1] || '';
            const desc = nameToDescription(varName);
            result.push(`${indent}${varKeyword} ${varName} = ${defaultVal}; // TODO: ${desc}`);

            // Update globalDepth for all skipped lines
            for (let j = i; j <= exprEnd; j++) {
              for (const ch of lines[j]) {
                if (ch === '{') globalDepth++;
                if (ch === '}') globalDepth--;
              }
            }

            i = exprEnd + 1;
            continue;
          }
        }
      }
    }

    // ─── Check for callback-containing statements that should be blanked ───
    // Handles addEventListener, forEach, new Observer, hook calls, etc.
    // Both single-line ({ logic; }) and multi-line callbacks.
    if (shouldAttemptBlank && !funcName) {
      const hasArrowBrace = /=>\s*\{/.test(trimmed);
      const hasFunctionCallback = /[,(]\s*function\s*\w*\s*\([^)]*\)\s*\{/.test(trimmed);

      if (hasArrowBrace || hasFunctionCallback) {
        // Determine what kind of callback this is
        const isEventHandler = /\.addEventListener\s*\(/.test(trimmed);
        const isBareHookCall =
          /^(?:useEffect|useLayoutEffect|onMounted|onUnmounted|onUpdated|watch|watchEffect)\s*\(/.test(
            trimmed,
          );
        const isIteratorCallback = /\.\s*(?:forEach)\s*\(/.test(trimmed);
        const isNewConstructor =
          /new\s+(?:IntersectionObserver|MutationObserver|ResizeObserver|PerformanceObserver)\s*\(/.test(
            trimmed,
          );
        // Catch non-assignment method calls with callbacks at this depth
        // e.g., document.querySelectorAll('.btn').forEach(btn => { ... })
        const isNonAssignmentCallback =
          !/^(const|let|var)\s/.test(trimmed) &&
          !/^(function|class)\s/.test(trimmed) &&
          /\.\w+\s*\([^)]*=>\s*\{/.test(trimmed);

        if (
          isEventHandler ||
          isBareHookCall ||
          isIteratorCallback ||
          isNewConstructor ||
          isNonAssignmentCallback
        ) {
          const indent = line.match(/^(\s*)/)?.[1] || '';

          // Determine label for TODO
          let callbackLabel: string;
          if (isBareHookCall) {
            const hookMatch = trimmed.match(/^(\w+)\s*\(/);
            callbackLabel = hookMatch ? hookMatch[1] : 'effect';
          } else if (isEventHandler) {
            const eventMatch = trimmed.match(/\.addEventListener\s*\(\s*['"](\w+)['"]/);
            callbackLabel = `handle ${eventMatch ? eventMatch[1] : 'event'}`;
          } else if (isIteratorCallback) {
            const iterMatch = trimmed.match(/\.\s*(forEach|map|reduce|filter)\s*\(/);
            callbackLabel = iterMatch ? iterMatch[1] : 'iterate';
          } else if (isNewConstructor) {
            const ctorMatch = trimmed.match(/new\s+(\w+)/);
            callbackLabel = ctorMatch ? ctorMatch[1] : 'constructor callback';
          } else {
            callbackLabel = 'callback';
          }

          // Find the callback body's opening brace
          let callbackBracePos = -1;
          if (hasArrowBrace) {
            const arrowBraceMatch = trimmed.match(/=>\s*\{/);
            if (arrowBraceMatch && arrowBraceMatch.index !== undefined) {
              callbackBracePos = arrowBraceMatch.index + arrowBraceMatch[0].length - 1;
            }
          } else if (hasFunctionCallback) {
            const fnBraceMatch = trimmed.match(/function\s*\w*\s*\([^)]*\)\s*\{/);
            if (fnBraceMatch && fnBraceMatch.index !== undefined) {
              callbackBracePos = fnBraceMatch.index + fnBraceMatch[0].length - 1;
            }
          }
          if (callbackBracePos >= 0) {
            // Check if callback closes on same line (single-line callback)
            let depth = 0;
            let closesOnSameLine = false;
            let closePos = -1;
            for (let c = callbackBracePos; c < trimmed.length; c++) {
              if (trimmed[c] === '{') depth++;
              if (trimmed[c] === '}') {
                depth--;
                if (depth === 0) {
                  closesOnSameLine = true;
                  closePos = c;
                  break;
                }
              }
            }

            if (closesOnSameLine) {
              // ── Single-line callback → split to multi-line and blank ──
              const bodyContent = trimmed.substring(callbackBracePos + 1, closePos).trim();
              const todo = generateTodo(callbackLabel, bodyContent);

              const before = trimmed.substring(0, callbackBracePos + 1);
              const after = trimmed.substring(closePos);

              result.push(`${indent}${before}`);
              result.push(`${indent}  ${todo}`);
              result.push(`${indent}${after}`);

              // Update global depth (balanced on same line)
              for (const ch of line) {
                if (ch === '{') globalDepth++;
                if (ch === '}') globalDepth--;
              }

              i++;
              continue;
            } else {
              // ── Multi-line callback → find close brace and blank body ──
              let braceDepthLocal = 0;
              let bodyEnd = i;
              for (let j = i; j < lines.length; j++) {
                for (const ch of lines[j]) {
                  if (ch === '{') braceDepthLocal++;
                  if (ch === '}') braceDepthLocal--;
                }
                if (braceDepthLocal === 0) {
                  bodyEnd = j;
                  break;
                }
              }

              const bodyContent = lines.slice(i + 1, bodyEnd).join('\n');
              const todo = generateTodo(callbackLabel, bodyContent);

              const openBraceIdx = line.lastIndexOf('{');
              const sigLine = openBraceIdx >= 0 ? line.substring(0, openBraceIdx + 1) : line;

              const closingLine = lines[bodyEnd];
              const closingTrimmed = closingLine.trim();
              const lastBraceIdx = closingTrimmed.lastIndexOf('}');
              const closingSuffix = closingTrimmed.substring(lastBraceIdx);

              result.push(sigLine);
              result.push(`${indent}  ${todo}`);
              result.push(indent + closingSuffix);

              globalDepth = depthAtLineStart;
              i = bodyEnd + 1;
              continue;
            }
          }
        }
      }

      // Also handle single-expression arrow callbacks (no braces):
      // e.g., el.addEventListener('click', () => menu.style.display = 'none');
      const hasSingleExprArrow = /=>\s*[^{]/.test(trimmed) && !/=>\s*\{/.test(trimmed);
      if (hasSingleExprArrow) {
        const isCallbackExpr =
          /\.addEventListener\s*\(/.test(trimmed) || /\.\s*forEach\s*\(/.test(trimmed);
        if (isCallbackExpr && !/^(const|let|var)\s/.test(trimmed)) {
          // Single-expression callback — wrap in braces with TODO
          const indent = line.match(/^(\s*)/)?.[1] || '';

          let callbackLabel: string;
          if (/\.addEventListener\s*\(/.test(trimmed)) {
            const eventMatch = trimmed.match(/\.addEventListener\s*\(\s*['"](\w+)['"]/);
            callbackLabel = `handle ${eventMatch ? eventMatch[1] : 'event'}`;
          } else {
            callbackLabel = 'forEach iteration';
          }

          // Find the => and replace expression with block + TODO
          const arrowMatch = trimmed.match(/=>\s*/);
          if (arrowMatch && arrowMatch.index !== undefined) {
            const exprStart = arrowMatch.index + arrowMatch[0].length;
            const expr = trimmed.substring(exprStart);
            const todo = generateTodo(callbackLabel, expr);
            const before = trimmed.substring(0, exprStart);

            // Find closing paren/semicolon
            result.push(`${indent}${before}{`);
            result.push(`${indent}  ${todo}`);
            result.push(`${indent}});`);

            for (const ch of line) {
              if (ch === '{') globalDepth++;
              if (ch === '}') globalDepth--;
            }

            i++;
            continue;
          }
        }
      }
    }

    // Keep the line as-is and update brace depth
    result.push(line);
    for (const ch of line) {
      if (ch === '{') globalDepth++;
      if (ch === '}') globalDepth--;
    }
    i++;
  }

  return result.join('\n');
}

/**
 * For Vue patterns, also handle computed(() => ...) properties
 * and method definitions inside setup()
 */
function transformVueCode(code: string): string {
  // First pass: blank regular function bodies
  const result = blankFunctionBodies(code, 'vue');

  // Vue computed properties: const x = computed(() => { ... })
  // These need special handling because the outer function is computed()
  // but the inner arrow is what should be blanked
  // For now, the basic blankFunctionBodies handles most cases

  return result;
}

// ─── Main ───────────────────────────────────────────────────

interface PatternData {
  id: string;
  demoCode?: { js: string; html?: string; css?: string };
}

function processFramework(
  frameworkName: string,
  patterns: PatternData[],
  existingStarters: Record<string, string>,
  framework: 'react' | 'vue' | 'angular' | 'native-js',
): Record<string, string> {
  const newStarters: Record<string, string> = {};
  let processed = 0;
  let skipped = 0;

  for (const pattern of patterns) {
    if (!pattern.demoCode?.js) {
      skipped++;
      // Keep existing starter if no demoCode
      if (existingStarters[pattern.id]) {
        newStarters[pattern.id] = existingStarters[pattern.id];
      }
      continue;
    }

    const refCode = pattern.demoCode.js;

    let starter: string;
    if (framework === 'vue') {
      starter = transformVueCode(refCode);
    } else {
      starter = blankFunctionBodies(refCode, framework);
    }

    newStarters[pattern.id] = starter;
    processed++;
  }

  console.log(`${frameworkName}: ${processed} processed, ${skipped} skipped`);
  return newStarters;
}

function escapeForTemplateLiteral(code: string): string {
  // Escape characters that have special meaning inside a JS template literal:
  // 1. Backslashes: \ → \\
  // 2. Backticks:   ` → \`
  // 3. Dollar-brace: ${ → \${
  let result = '';
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (ch === '\\') {
      result += '\\\\';
    } else if (ch === '`') {
      result += '\\`';
    } else if (ch === '$' && code[i + 1] === '{') {
      result += '\\${';
      i++; // skip the {
    } else {
      result += ch;
    }
  }
  return result;
}

function generateStarterFile(varName: string, starters: Record<string, string>): string {
  const lines: string[] = [];
  lines.push('/**');
  lines.push(' * Auto-generated scaffolded starter code.');
  lines.push(
    ' * Each starter provides the full UI structure (JSX/template with correct class names)',
  );
  lines.push(
    ' * and empty function stubs. Users only implement business logic inside the function bodies.',
  );
  lines.push(' *');
  lines.push(' * Generated from reference demoCode — DO NOT manually edit individual entries.');
  lines.push(' * To regenerate, run: npx tsx scripts/generate-starters.ts');
  lines.push(' */');
  lines.push(`export const ${varName}: Record<string, string> = {`);

  const entries = Object.entries(starters);
  for (let idx = 0; idx < entries.length; idx++) {
    const [id, code] = entries[idx];
    const escaped = escapeForTemplateLiteral(code);
    lines.push(`  '${id}': \`${escaped}\`${idx < entries.length - 1 ? ',' : ','}`);
    lines.push('');
  }

  lines.push('};');
  lines.push('');
  return lines.join('\n');
}

// ─── Run ────────────────────────────────────────────────────

const projectRoot = path.resolve(process.cwd());
const startersDir = path.join(projectRoot, 'lib', 'frontend-drills', 'ui-patterns', 'starters');

console.log('Generating scaffolded starters from reference demoCode...\n');

const reactNew = processFramework(
  'React',
  reactUIPatterns as PatternData[],
  reactStarters,
  'react',
);
const vueNew = processFramework('Vue', vueUIPatterns as PatternData[], vueStarters, 'vue');
const angularNew = processFramework(
  'Angular',
  angularUIPatterns as PatternData[],
  angularStarters,
  'angular',
);
const nativeJsNew = processFramework(
  'Native JS',
  nativeJsUIPatterns as PatternData[],
  nativeJsStarters,
  'native-js',
);

// Write output files
fs.writeFileSync(
  path.join(startersDir, 'react.ts'),
  generateStarterFile('reactStarters', reactNew),
);
fs.writeFileSync(path.join(startersDir, 'vue.ts'), generateStarterFile('vueStarters', vueNew));
fs.writeFileSync(
  path.join(startersDir, 'angular.ts'),
  generateStarterFile('angularStarters', angularNew),
);
fs.writeFileSync(
  path.join(startersDir, 'native-js.ts'),
  generateStarterFile('nativeJsStarters', nativeJsNew),
);

console.log('\nDone! Starter files written to:', startersDir);

// Print sample output for verification
console.log('\n─── Sample: react-tag-input ───');
console.log(reactNew['react-tag-input']?.substring(0, 800) || 'NOT FOUND');
console.log('\n─── Sample: vue-form-validation ───');
console.log(vueNew['vue-form-validation']?.substring(0, 800) || 'NOT FOUND');
console.log('\n─── Sample: ng-reactive-forms ───');
console.log(angularNew['ng-reactive-forms']?.substring(0, 800) || 'NOT FOUND');
console.log('\n─── Sample: js-form-validation ───');
console.log(nativeJsNew['js-form-validation']?.substring(0, 800) || 'NOT FOUND');
