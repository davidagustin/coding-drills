'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const BITS = 3;

interface GrayCodeStep {
  bits: number;
  i: number;
  grayValue: number;
  binary: string;
  grayBinary: string;
  result: number[];
  explanation: string;
}

function computeSteps(): GrayCodeStep[] {
  const steps: GrayCodeStep[] = [];
  const result: number[] = [];
  const total = 1 << BITS;

  steps.push({
    bits: BITS,
    i: -1,
    grayValue: 0,
    binary: '',
    grayBinary: '',
    result: [],
    explanation: `Start: Generate ${BITS}-bit Gray code sequence (${total} values)`,
  });

  for (let i = 0; i < total; i++) {
    const grayValue = i ^ (i >> 1);
    const binary = i.toString(2).padStart(BITS, '0');
    const grayBinary = grayValue.toString(2).padStart(BITS, '0');

    steps.push({
      bits: BITS,
      i,
      grayValue,
      binary,
      grayBinary,
      result: [...result],
      explanation: `i = ${i} (binary: ${binary}): gray(${i}) = ${i} ^ (${i} >> 1) = ${i} ^ ${i >> 1} = ${grayValue} (binary: ${grayBinary})`,
    });

    result.push(grayValue);
  }

  steps.push({
    bits: BITS,
    i: -1,
    grayValue: 0,
    binary: '',
    grayBinary: '',
    result: [...result],
    explanation: `Complete: Gray code sequence = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function GrayCodeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { i, grayValue, binary, grayBinary, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Gray Code Sequence</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Current Calculation */}
        {i !== -1 && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">i (binary)</p>
                <p className="font-mono text-cyan-400">{binary}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">gray(i) (binary)</p>
                <p className="font-mono text-green-400">{grayBinary}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">i (decimal)</p>
                <p className="font-mono text-cyan-400">{i}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">gray(i) (decimal)</p>
                <p className="font-mono text-green-400">{grayValue}</p>
              </div>
            </div>
          </div>
        )}

        {/* Result Sequence */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            Gray Code Sequence ({result.length} values)
          </h3>
          {result.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {result.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg font-mono text-sm font-semibold text-cyan-400"
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
