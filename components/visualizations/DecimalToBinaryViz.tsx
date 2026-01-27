'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const DECIMAL = 10;

interface DecimalToBinaryStep {
  decimal: number;
  binary: string;
  remainder: number;
  explanation: string;
}

function computeSteps(): DecimalToBinaryStep[] {
  const steps: DecimalToBinaryStep[] = [];
  const decimal: number = DECIMAL;
  let quotient = decimal;
  let binary = '';

  steps.push({
    decimal,
    binary: '',
    remainder: -1,
    explanation: `Start: Convert ${decimal} to binary`,
  });

  if (decimal === 0) {
    steps.push({
      decimal: 0,
      binary: '0',
      remainder: -1,
      explanation: `Complete: 0 = "0"`,
    });
    return steps;
  }

  while (quotient > 0) {
    const remainder = quotient % 2;
    binary = remainder + binary;
    steps.push({
      decimal: quotient,
      binary,
      remainder,
      explanation: `${quotient} % 2 = ${remainder}, binary = "${binary}"`,
    });
    quotient = Math.floor(quotient / 2);
  }

  steps.push({
    decimal: 0,
    binary,
    remainder: -1,
    explanation: `Complete: ${decimal} = "${binary}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DecimalToBinaryViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { decimal, binary, remainder, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Decimal to Binary Conversion</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Current Decimal */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Decimal</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 font-mono">{decimal}</div>
            {remainder >= 0 && (
              <div className="text-zinc-400 text-sm mt-1">Remainder: {remainder}</div>
            )}
          </div>
        </div>

        {/* Binary Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Binary Result</h3>
          <div className="flex gap-2 flex-wrap">
            {binary.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              binary.split('').map((bit, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {bit}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
