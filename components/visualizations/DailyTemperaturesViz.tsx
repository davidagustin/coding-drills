'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const TEMPERATURES = [73, 74, 75, 71, 69, 72, 76, 73];

interface DailyTempStep {
  temps: number[];
  stack: number[];
  result: number[];
  index: number;
  explanation: string;
}

function computeSteps(): DailyTempStep[] {
  const steps: DailyTempStep[] = [];
  const result = new Array(TEMPERATURES.length).fill(0);
  const stack: number[] = [];

  steps.push({
    temps: [...TEMPERATURES],
    stack: [],
    result: [...result],
    index: -1,
    explanation: `Start: Find days until warmer temperature`,
  });

  for (let i = 0; i < TEMPERATURES.length; i++) {
    steps.push({
      temps: [...TEMPERATURES],
      stack: [...stack],
      result: [...result],
      index: i,
      explanation: `Check day ${i}, temperature = ${TEMPERATURES[i]}`,
    });

    while (stack.length > 0 && TEMPERATURES[stack[stack.length - 1]] < TEMPERATURES[i]) {
      const prevIdx = stack.pop()!;
      result[prevIdx] = i - prevIdx;
      steps.push({
        temps: [...TEMPERATURES],
        stack: [...stack],
        result: [...result],
        index: i,
        explanation: `Day ${prevIdx} (${TEMPERATURES[prevIdx]}°C) → warmer day found at ${i} (${TEMPERATURES[i]}°C), wait ${result[prevIdx]} days`,
      });
    }

    stack.push(i);
    steps.push({
      temps: [...TEMPERATURES],
      stack: [...stack],
      result: [...result],
      index: i,
      explanation: `Push day ${i} to stack`,
    });
  }

  steps.push({
    temps: [...TEMPERATURES],
    stack: [...stack],
    result: [...result],
    index: -1,
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  warmer: '#22c55e',
  waiting: '#3b82f6',
  default: '#6b7280',
} as const;

export default function DailyTemperaturesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { temps, stack, result, index, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Daily Temperatures</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: [{result.join(', ')}]</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Temperatures</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {temps.map((temp, idx) => {
              const isCurrent = index === idx;
              const daysToWait = result[idx];

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = COLORS.current;
              } else if (daysToWait > 0) {
                bgColor = COLORS.warmer;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                  >
                    {temp}°
                  </motion.div>
                  {daysToWait > 0 && <div className="text-xs text-green-400">{daysToWait}d</div>}
                </div>
              );
            })}
          </div>
        </div>

        {stack.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Stack (waiting for warmer)</h3>
            <div className="flex flex-col-reverse gap-2 items-center min-h-[100px] justify-end">
              {stack.map((idx, i) => (
                <motion.div
                  key={i}
                  className="px-4 py-2 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.waiting,
                    borderColor: COLORS.waiting,
                  }}
                >
                  Day {idx}: {temps[idx]}°C
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
