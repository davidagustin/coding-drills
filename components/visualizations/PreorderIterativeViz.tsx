'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// Simple tree: 1 -> 2, 3; 2 -> 4, 5
const TREE = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: {
    value: 3,
    left: null,
    right: null,
  },
};

interface PreorderIterativeStep {
  stack: Array<{ value: number }>;
  result: number[];
  currentNode: number | null;
  explanation: string;
}

function computeSteps(): PreorderIterativeStep[] {
  const steps: PreorderIterativeStep[] = [];
  const result: number[] = [];
  const stack: Array<{ value: number; left: unknown; right: unknown }> = [TREE];

  steps.push({
    stack: stack.map((n) => ({ value: n.value })),
    result: [],
    currentNode: null,
    explanation: `Start: Initialize stack with root node`,
  });

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;
    result.push(node.value);

    steps.push({
      stack: stack.map((n) => ({ value: n.value })),
      result: [...result],
      currentNode: node.value,
      explanation: `Pop node ${node.value}, add to result: [${result.join(', ')}]`,
    });

    if (node.right) {
      stack.push(node.right as { value: number; left: unknown; right: unknown });
      steps.push({
        stack: stack.map((n) => ({ value: n.value })),
        result: [...result],
        currentNode: node.value,
        explanation: `Push right child ${(node.right as { value: number }).value} to stack (will be processed after left)`,
      });
    }

    if (node.left) {
      stack.push(node.left as { value: number; left: unknown; right: unknown });
      steps.push({
        stack: stack.map((n) => ({ value: n.value })),
        result: [...result],
        currentNode: node.value,
        explanation: `Push left child ${(node.left as { value: number }).value} to stack (will be processed next)`,
      });
    }
  }

  steps.push({
    stack: [],
    result: [...result],
    currentNode: null,
    explanation: `Complete: Preorder traversal = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PreorderIterativeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { stack, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Preorder Traversal (Iterative)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Stack */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Stack (top to bottom)</h3>
          {stack.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="space-y-2">
              {stack.map((node, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-800 rounded-lg border-2 border-zinc-700 font-mono text-sm font-semibold text-cyan-400"
                >
                  {node.value}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result (Preorder)</h3>
          {result.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {result.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
