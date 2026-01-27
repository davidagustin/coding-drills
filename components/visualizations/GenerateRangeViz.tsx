'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const START = 1;
const END = 5;

interface RangeStep {
  start: number;
  end: number;
  result: number[];
  i: number;
  explanation: string;
}

function computeSteps(): RangeStep[] {
  const steps: RangeStep[] = [];
  const result: number[] = [];

  steps.push({
    start: START,
    end: END,
    result: [],
    i: -1,
    explanation: `Start: Generate range from ${START} to ${END} (inclusive)`,
  });

  if (START <= END) {
    for (let i = START; i <= END; i++) {
      result.push(i);
      steps.push({
        start: START,
        end: END,
        result: [...result],
        i,
        explanation: `Add ${i} to range`,
      });
    }
  }

  steps.push({
    start: START,
    end: END,
    result: [...result],
    i: -1,
    explanation: `Complete: Range = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function GenerateRangeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { start, end, result, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Generate Range of Numbers</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-zinc-400 text-xs mt-1">
          Start: {start}, End: {end}
        </p>
      </div>

      <div className="space-y-6">
        {/* Range Indicator */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Range</h3>
          <div className="flex gap-2 items-center">
            <div className="px-4 py-2 rounded-lg bg-blue-500/20 border-2 border-blue-500 text-blue-400 font-mono">
              {start}
            </div>
            <span className="text-zinc-500">→</span>
            <div className="px-4 py-2 rounded-lg bg-purple-500/20 border-2 border-purple-500 text-purple-400 font-mono">
              {end}
            </div>
          </div>
        </div>

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
          <div className="flex gap-2 flex-wrap">
            {result.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              result.map((val, idx) => {
                const isCurrent = val === i;
                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: isCurrent ? 1.1 : 1, opacity: 1 }}
                    className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono text-lg font-semibold ${
                      isCurrent
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                        : 'bg-green-500/20 border-green-500 text-green-400'
                    }`}
                  >
                    {val}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
