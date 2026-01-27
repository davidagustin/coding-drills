'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const BINARY = '1010';

interface BinaryToDecimalStep {
  binary: string;
  decimal: number;
  i: number;
  explanation: string;
}

function computeSteps(): BinaryToDecimalStep[] {
  const steps: BinaryToDecimalStep[] = [];
  let decimal = 0;

  steps.push({
    binary: BINARY,
    decimal: 0,
    i: -1,
    explanation: `Start: Convert binary "${BINARY}" to decimal`,
  });

  for (let i = 0; i < BINARY.length; i++) {
    const bit = Number(BINARY[i]);
    decimal = decimal * 2 + bit;
    steps.push({
      binary: BINARY,
      decimal,
      i,
      explanation: `Bit ${i}: ${decimal / 2} * 2 + ${bit} = ${decimal}`,
    });
  }

  steps.push({
    binary: BINARY,
    decimal,
    i: -1,
    explanation: `Complete: "${BINARY}" = ${decimal}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function BinaryToDecimalViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { binary, decimal, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Binary to Decimal Conversion</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Binary String */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Binary String</h3>
          <div className="flex gap-2 flex-wrap">
            {binary.split('').map((bit, idx) => {
              const isCurrent = idx === i;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isCurrent
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {bit}
                </div>
              );
            })}
          </div>
        </div>

        {/* Decimal Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Decimal Result</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-2xl font-bold text-green-400 font-mono">{decimal}</div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
