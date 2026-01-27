'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5];
const COUNT = 3;

interface SampleStep {
  arr: number[];
  shuffled: number[];
  sampled: number[];
  position: number;
  randomIndex: number;
  explanation: string;
}

function computeSteps(): SampleStep[] {
  const steps: SampleStep[] = [];
  const shuffled = [...ARRAY];
  const sampled: number[] = [];
  const sampleSize = Math.min(COUNT, shuffled.length);

  steps.push({
    arr: [...ARRAY],
    shuffled: [...shuffled],
    sampled: [],
    position: -1,
    randomIndex: -1,
    explanation: `Start: Sample ${COUNT} random elements from array`,
  });

  // Simulate Fisher-Yates partial shuffle
  for (let position = 0; position < sampleSize; position++) {
    const randomIndex = position + Math.floor(Math.random() * (shuffled.length - position));
    steps.push({
      arr: [...ARRAY],
      shuffled: [...shuffled],
      sampled: [...sampled],
      position,
      randomIndex,
      explanation: `Position ${position}: Pick random index ${randomIndex} from unshuffled portion`,
    });

    [shuffled[position], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[position]];
    sampled.push(shuffled[position]);
    steps.push({
      arr: [...ARRAY],
      shuffled: [...shuffled],
      sampled: [...sampled],
      position,
      randomIndex,
      explanation: `Swap and add: sampled[${sampled.length - 1}] = ${shuffled[position]}`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    shuffled: [...shuffled],
    sampled: [...sampled],
    position: -1,
    randomIndex: -1,
    explanation: `Complete: Sampled ${sampled.length} elements`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function SampleArrayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, shuffled, sampled, position, randomIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Random Sample</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Original Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => (
              <div
                key={idx}
                className="w-16 h-16 rounded-lg bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center font-mono text-lg font-semibold text-zinc-300"
              >
                {val}
              </div>
            ))}
          </div>
        </div>

        {/* Shuffled Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Shuffled Array</h3>
          <div className="flex gap-2 flex-wrap">
            {shuffled.map((val, idx) => {
              const isPosition = idx === position;
              const isRandom = idx === randomIndex;
              const isSampled = idx < sampled.length;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isSampled
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : isPosition
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                        : isRandom
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sampled Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Sampled Array</h3>
          <div className="flex gap-2 flex-wrap">
            {sampled.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              sampled.map((val, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {val}
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
