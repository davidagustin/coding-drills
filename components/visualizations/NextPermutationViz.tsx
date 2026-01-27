'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT = [1, 2, 3];

interface NextPermutationStep {
  array: number[];
  pivotIndex: number;
  swapIndex: number;
  left: number;
  right: number;
  phase: 'find-pivot' | 'find-swap' | 'swap' | 'reverse' | 'complete';
  explanation: string;
}

function computeSteps(): NextPermutationStep[] {
  const steps: NextPermutationStep[] = [];
  const array = [...INPUT];
  const length = array.length;

  steps.push({
    array: [...array],
    pivotIndex: -1,
    swapIndex: -1,
    left: -1,
    right: -1,
    phase: 'find-pivot',
    explanation: `Start: Find next lexicographic permutation of [${array.join(', ')}]`,
  });

  // Step 1: Find pivot
  let pivotIndex = length - 2;
  while (pivotIndex >= 0 && array[pivotIndex] >= array[pivotIndex + 1]) {
    steps.push({
      array: [...array],
      pivotIndex,
      swapIndex: -1,
      left: -1,
      right: -1,
      phase: 'find-pivot',
      explanation: `Checking index ${pivotIndex}: ${array[pivotIndex]} >= ${array[pivotIndex + 1]}, continue left`,
    });
    pivotIndex--;
  }

  if (pivotIndex >= 0) {
    steps.push({
      array: [...array],
      pivotIndex,
      swapIndex: -1,
      left: -1,
      right: -1,
      phase: 'find-pivot',
      explanation: `Found pivot at index ${pivotIndex}: ${array[pivotIndex]} < ${array[pivotIndex + 1]}`,
    });

    // Step 2: Find swap index
    let swapIndex = length - 1;
    while (swapIndex > pivotIndex && array[swapIndex] <= array[pivotIndex]) {
      steps.push({
        array: [...array],
        pivotIndex,
        swapIndex,
        left: -1,
        right: -1,
        phase: 'find-swap',
        explanation: `Finding swap: index ${swapIndex} has ${array[swapIndex]} <= ${array[pivotIndex]}, continue left`,
      });
      swapIndex--;
    }

    steps.push({
      array: [...array],
      pivotIndex,
      swapIndex,
      left: -1,
      right: -1,
      phase: 'swap',
      explanation: `Found swap index ${swapIndex}: ${array[swapIndex]} > ${array[pivotIndex]}, swapping`,
    });

    // Step 3: Swap
    [array[pivotIndex], array[swapIndex]] = [array[swapIndex], array[pivotIndex]];
    steps.push({
      array: [...array],
      pivotIndex,
      swapIndex,
      left: -1,
      right: -1,
      phase: 'swap',
      explanation: `Swapped: array[${pivotIndex}] = ${array[pivotIndex]}, array[${swapIndex}] = ${array[swapIndex]}`,
    });

    // Step 4: Reverse suffix
    let left = pivotIndex + 1;
    let right = length - 1;
    while (left < right) {
      steps.push({
        array: [...array],
        pivotIndex,
        swapIndex: -1,
        left,
        right,
        phase: 'reverse',
        explanation: `Reversing suffix: swapping array[${left}] = ${array[left]} with array[${right}] = ${array[right]}`,
      });
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
  } else {
    steps.push({
      array: [...array],
      pivotIndex: -1,
      swapIndex: -1,
      left: -1,
      right: -1,
      phase: 'reverse',
      explanation: `No pivot found (already largest), reversing entire array`,
    });
    let left = 0;
    let right = length - 1;
    while (left < right) {
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
  }

  steps.push({
    array: [...array],
    pivotIndex: -1,
    swapIndex: -1,
    left: -1,
    right: -1,
    phase: 'complete',
    explanation: `Complete: Next permutation = [${array.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function NextPermutationViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { array, pivotIndex, swapIndex, left, right, phase, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Next Lexicographic Permutation</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-cyan-400 text-sm mt-1">Phase: {phase}</p>
      </div>

      <div className="space-y-6">
        {/* Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Array</h3>
          <div className="flex gap-2 flex-wrap">
            {array.map((val, idx) => {
              const isPivot = idx === pivotIndex && pivotIndex !== -1;
              const isSwap = idx === swapIndex && swapIndex !== -1;
              const isReverse = (idx === left || idx === right) && left !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isPivot
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : isSwap
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : isReverse
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{val}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
