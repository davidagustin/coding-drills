'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT = [1, 2, 3, 4, 5, 6];
const PREDICATE = (n: number) => n % 2 === 0; // Even numbers

interface PartitionStep {
  items: number[];
  truthy: number[];
  falsy: number[];
  currentIndex: number;
  currentValue: number;
  explanation: string;
}

function computeSteps(): PartitionStep[] {
  const steps: PartitionStep[] = [];
  const truthy: number[] = [];
  const falsy: number[] = [];

  steps.push({
    items: [...INPUT],
    truthy: [],
    falsy: [],
    currentIndex: -1,
    currentValue: 0,
    explanation: `Start: Partition array [${INPUT.join(', ')}] using predicate (even numbers)`,
  });

  for (let i = 0; i < INPUT.length; i++) {
    const value = INPUT[i];
    const passes = PREDICATE(value);

    steps.push({
      items: [...INPUT],
      truthy: [...truthy],
      falsy: [...falsy],
      currentIndex: i,
      currentValue: value,
      explanation: `Processing index ${i}: value = ${value}, predicate(${value}) = ${passes}`,
    });

    if (passes) {
      truthy.push(value);
      steps.push({
        items: [...INPUT],
        truthy: [...truthy],
        falsy: [...falsy],
        currentIndex: i,
        currentValue: value,
        explanation: `Add ${value} to truthy array: [${truthy.join(', ')}]`,
      });
    } else {
      falsy.push(value);
      steps.push({
        items: [...INPUT],
        truthy: [...truthy],
        falsy: [...falsy],
        currentIndex: i,
        currentValue: value,
        explanation: `Add ${value} to falsy array: [${falsy.join(', ')}]`,
      });
    }
  }

  steps.push({
    items: [...INPUT],
    truthy: [...truthy],
    falsy: [...falsy],
    currentIndex: -1,
    currentValue: 0,
    explanation: `Complete: truthy = [${truthy.join(', ')}], falsy = [${falsy.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PartitionViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { items, truthy, falsy, currentIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Partition Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Input Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Input Array</h3>
          <div className="flex gap-2 flex-wrap">
            {items.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              const passes = PREDICATE(val);
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : passes
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-red-500/20 border-red-500 text-red-400'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Truthy Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Truthy Array (even numbers)</h3>
          {truthy.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {truthy.map((val, idx) => (
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

        {/* Falsy Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Falsy Array (odd numbers)</h3>
          {falsy.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {falsy.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-red-500/20 border-2 border-red-500 rounded-lg font-mono text-sm font-semibold text-red-400"
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
