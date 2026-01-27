'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NESTED = [[1, [2, [3, [4]]]], 2];
const DEPTH = 2;

interface FlattenStep {
  nested: unknown[];
  result: unknown[];
  depth: number;
  explanation: string;
}

function flattenDepth(items: unknown[], depth: number): unknown[] {
  if (depth < 1) return items;
  return items.reduce<unknown[]>((flattened, element) => {
    if (Array.isArray(element)) {
      return flattened.concat(flattenDepth(element, depth - 1));
    }
    return flattened.concat(element);
  }, []);
}

function computeSteps(): FlattenStep[] {
  const steps: FlattenStep[] = [];
  const depth = DEPTH;

  steps.push({
    nested: JSON.parse(JSON.stringify(NESTED)),
    result: [],
    depth,
    explanation: `Start: Flatten nested array to depth ${depth}`,
  });

  const result = flattenDepth(NESTED, DEPTH);

  steps.push({
    nested: JSON.parse(JSON.stringify(NESTED)),
    result: [...result] as number[],
    depth,
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FlattenDeepViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { nested, result, depth, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Flatten to Depth</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-zinc-400 text-xs mt-1">Depth: {depth}</p>
      </div>

      <div className="space-y-6">
        {/* Nested Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Nested Array</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <pre className="text-zinc-300 font-mono text-sm">{JSON.stringify(nested, null, 2)}</pre>
          </div>
        </div>

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
          <div className="flex gap-2 flex-wrap">
            {result.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              result.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {String(val)}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
