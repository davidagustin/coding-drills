'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const VALUE = 5;
const POSITION = 1;

interface ToggleBitStep {
  value: number;
  position: number;
  mask: number;
  result: number;
  explanation: string;
}

function computeSteps(): ToggleBitStep[] {
  const steps: ToggleBitStep[] = [];
  const mask = 1 << POSITION;

  steps.push({
    value: VALUE,
    position: POSITION,
    mask: 0,
    result: VALUE,
    explanation: `Start: Toggle bit ${POSITION} of ${VALUE} (binary: ${VALUE.toString(2)})`,
  });

  steps.push({
    value: VALUE,
    position: POSITION,
    mask,
    result: VALUE,
    explanation: `Create mask: 1 << ${POSITION} = ${mask} (binary: ${mask.toString(2)})`,
  });

  const result = VALUE ^ mask;
  steps.push({
    value: VALUE,
    position: POSITION,
    mask,
    result,
    explanation: `Toggle: ${VALUE} ^ ${mask} = ${result} (binary: ${result.toString(2)})`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function ToggleBitViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { value, position, mask, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Toggle the Nth Bit</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Values */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Value</div>
            <div className="text-2xl font-bold text-blue-400 font-mono">{value}</div>
            <div className="text-zinc-400 text-xs mt-1">{value.toString(2)}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Position</div>
            <div className="text-2xl font-bold text-purple-400 font-mono">{position}</div>
          </div>
        </div>

        {/* Mask */}
        {mask > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Mask</h3>
            <div className="p-4 bg-zinc-800 rounded-lg">
              <div className="text-white font-mono text-sm">
                1 &lt;&lt; {position} = {mask}
              </div>
              <div className="text-zinc-400 text-xs mt-1">Binary: {mask.toString(2)}</div>
            </div>
          </div>
        )}

        {/* Result */}
        {result !== value && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Result</h3>
            <div className="p-4 bg-zinc-800 rounded-lg">
              <div className="text-2xl font-bold text-green-400 font-mono">{result}</div>
              <div className="text-zinc-400 text-xs mt-1">Binary: {result.toString(2)}</div>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
