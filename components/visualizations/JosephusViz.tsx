'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const COUNT = 7;
const STEP = 3;

interface JosephusStep {
  circleSize: number;
  step: number;
  survivorPosition: number;
  previousSurvivor: number;
  explanation: string;
}

function computeSteps(): JosephusStep[] {
  const steps: JosephusStep[] = [];
  let survivorPosition = 0;

  steps.push({
    circleSize: 1,
    step: STEP,
    survivorPosition: 0,
    previousSurvivor: 0,
    explanation: `Base case: J(1) = 0 (single person is the survivor)`,
  });

  for (let circleSize = 2; circleSize <= COUNT; circleSize++) {
    const previousSurvivor = survivorPosition;
    survivorPosition = (survivorPosition + STEP) % circleSize;

    steps.push({
      circleSize,
      step: STEP,
      survivorPosition,
      previousSurvivor,
      explanation: `J(${circleSize}) = (J(${circleSize - 1}) + ${STEP}) % ${circleSize} = (${previousSurvivor} + ${STEP}) % ${circleSize} = ${previousSurvivor + STEP} % ${circleSize} = ${survivorPosition}`,
    });
  }

  steps.push({
    circleSize: COUNT,
    step: STEP,
    survivorPosition,
    previousSurvivor: 0,
    explanation: `Complete: With ${COUNT} people and step ${STEP}, survivor is at position ${survivorPosition} (0-indexed)`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function JosephusViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const {
    circleSize,
    step: stepSize,
    survivorPosition,
    previousSurvivor,
    explanation,
  } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Josephus Problem</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Circle Visualization */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            Circle Size: {circleSize}, Step: {stepSize}
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              {Array.from({ length: circleSize }).map((_, idx) => {
                const angle = (2 * Math.PI * idx) / circleSize - Math.PI / 2;
                const x = 128 + 100 * Math.cos(angle);
                const y = 128 + 100 * Math.sin(angle);
                const isSurvivor = idx === survivorPosition;
                return (
                  <div
                    key={idx}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}px`, top: `${y}px` }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-semibold border-2 ${
                        isSurvivor
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {idx}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg border-2 border-zinc-700">
            <div className="text-xs text-zinc-500 mb-1">Previous Survivor</div>
            <div className="text-2xl font-mono font-bold text-yellow-400">{previousSurvivor}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg border-2 border-blue-500">
            <div className="text-xs text-zinc-500 mb-1">Current Survivor</div>
            <div className="text-2xl font-mono font-bold text-blue-400">{survivorPosition}</div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
