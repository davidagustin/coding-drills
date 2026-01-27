'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const VALUES = [8, 6, 16, 0];

interface IsPowerOfTwoStep {
  value: number;
  binary: string;
  nMinus1: number;
  binaryMinus1: string;
  result: boolean;
  explanation: string;
}

function computeSteps(): IsPowerOfTwoStep[] {
  const steps: IsPowerOfTwoStep[] = [];

  for (const value of VALUES) {
    const binary = value.toString(2);
    const nMinus1 = value - 1;
    const binaryMinus1 = nMinus1.toString(2);
    const result = value > 0 && (value & nMinus1) === 0;

    steps.push({
      value,
      binary,
      nMinus1,
      binaryMinus1,
      result,
      explanation: `Check ${value}: binary = ${binary}, ${value} & ${nMinus1} = ${value & nMinus1} → ${result ? 'power of 2' : 'not power of 2'}`,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function IsPowerOfTwoViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { value, binary, nMinus1, binaryMinus1, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Is Power of Two (Bit Trick)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Value */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Value</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 font-mono">{value}</div>
            <div className="text-zinc-400 text-sm mt-1">Binary: {binary}</div>
          </div>
        </div>

        {/* Bit Operation */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Bit Operation</h3>
          <div className="p-4 bg-zinc-800 rounded-lg space-y-2">
            <div className="text-white font-mono text-sm">
              {value} & ({value} - 1) = {value} & {nMinus1} = {value & nMinus1}
            </div>
            <div className="text-zinc-400 text-xs">
              {binary} & {binaryMinus1} = {(value & nMinus1).toString(2)}
            </div>
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className={`text-2xl font-bold ${result ? 'text-green-400' : 'text-red-400'}`}>
              {result ? 'Power of 2' : 'Not Power of 2'}
            </div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
