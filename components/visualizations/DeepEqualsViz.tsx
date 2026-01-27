'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const A = { a: 1, b: { c: 2 } };
const B = { a: 1, b: { c: 2 } };

interface DeepEqualsStep {
  a: unknown;
  b: unknown;
  path: string[];
  equal: boolean | null;
  explanation: string;
}

function computeSteps(): DeepEqualsStep[] {
  const steps: DeepEqualsStep[] = [];
  const path: string[] = [];

  steps.push({
    a: A,
    b: B,
    path: [],
    equal: null,
    explanation: `Start: Deep equality check between two objects`,
  });

  function deepEquals(a: unknown, b: unknown, currentPath: string[]): boolean {
    path.push(...currentPath);
    steps.push({
      a,
      b,
      path: [...path],
      equal: null,
      explanation: `Comparing: ${currentPath.length === 0 ? 'root' : currentPath.join('.')} (${typeof a === 'object' && a !== null ? (Array.isArray(a) ? 'array' : 'object') : typeof a})`,
    });

    if (a === b) {
      path.pop();
      steps.push({
        a,
        b,
        path: [...path],
        equal: true,
        explanation: `Same reference or primitive equality: ${JSON.stringify(a)} === ${JSON.stringify(b)}`,
      });
      return true;
    }

    if (a === null || b === null) {
      path.pop();
      steps.push({
        a,
        b,
        path: [...path],
        equal: false,
        explanation: `One is null, other is not: ${a === null ? 'a' : 'b'} is null`,
      });
      return false;
    }

    if (typeof a !== 'object' || typeof b !== 'object') {
      path.pop();
      steps.push({
        a,
        b,
        path: [...path],
        equal: false,
        explanation: `Type mismatch: ${typeof a} !== ${typeof b}`,
      });
      return false;
    }

    if (Array.isArray(a) !== Array.isArray(b)) {
      path.pop();
      steps.push({
        a,
        b,
        path: [...path],
        equal: false,
        explanation: `Array vs object mismatch: ${Array.isArray(a) ? 'a is array' : 'b is array'}`,
      });
      return false;
    }

    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);

    if (keysA.length !== keysB.length) {
      path.pop();
      steps.push({
        a,
        b,
        path: [...path],
        equal: false,
        explanation: `Key count mismatch: ${keysA.length} !== ${keysB.length}`,
      });
      return false;
    }

    for (const key of keysA) {
      if (!keysB.includes(key)) {
        path.pop();
        steps.push({
          a,
          b,
          path: [...path],
          equal: false,
          explanation: `Key '${key}' missing in ${keysB.includes(key) ? 'a' : 'b'}`,
        });
        return false;
      }

      const result = deepEquals(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
        [...currentPath, key],
      );
      if (!result) {
        path.pop();
        return false;
      }
    }

    path.pop();
    steps.push({
      a,
      b,
      path: [...path],
      equal: true,
      explanation: `All properties equal at ${currentPath.length === 0 ? 'root' : currentPath.join('.')}`,
    });
    return true;
  }

  const result = deepEquals(A, B, []);
  steps.push({
    a: A,
    b: B,
    path: [],
    equal: result,
    explanation: `Complete: Objects are ${result ? 'equal' : 'not equal'}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DeepEqualsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { a, b, path, equal, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Deep Equality Check</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {equal !== null && (
          <p className={`font-semibold mt-2 ${equal ? 'text-green-400' : 'text-red-400'}`}>
            Result: {equal ? 'EQUAL' : 'NOT EQUAL'}
          </p>
        )}
        {path.length > 0 && (
          <p className="text-cyan-400 text-sm mt-1">Path: {path.join('.') || 'root'}</p>
        )}
      </div>

      <div className="space-y-6">
        {/* Object A */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Object A</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-zinc-300">
            <pre>{JSON.stringify(a, null, 2)}</pre>
          </div>
        </div>

        {/* Object B */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Object B</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-zinc-300">
            <pre>{JSON.stringify(b, null, 2)}</pre>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
