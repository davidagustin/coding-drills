'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMBERS = [3, 34, 4, 12, 5, 2];
const TARGET = 9;

interface SubsetSumExistsStep {
  numbers: number[];
  target: number;
  index: number;
  currentSum: number;
  subset: number[];
  callStack: Array<{ index: number; sum: number }>;
  result: boolean | null;
  explanation: string;
}

function computeSteps(): SubsetSumExistsStep[] {
  const steps: SubsetSumExistsStep[] = [];
  const callStack: Array<{ index: number; sum: number }> = [];

  steps.push({
    numbers: NUMBERS,
    target: TARGET,
    index: 0,
    currentSum: 0,
    subset: [],
    callStack: [],
    result: null,
    explanation: `Start: Check if any subset of [${NUMBERS.join(', ')}] sums to ${TARGET}`,
  });

  function backtrack(index: number, currentSum: number, subset: number[]): boolean {
    callStack.push({ index, sum: currentSum });
    steps.push({
      numbers: NUMBERS,
      target: TARGET,
      index,
      currentSum,
      subset: [...subset],
      callStack: [...callStack],
      result: null,
      explanation: `backtrack(${index}, ${currentSum}): ${currentSum === TARGET ? 'Found! Sum equals target' : currentSum > TARGET ? 'Pruned: sum exceeds target' : index >= NUMBERS.length ? 'Pruned: no more elements' : 'Try including or excluding element'}`,
    });

    if (currentSum === TARGET) {
      callStack.pop();
      steps.push({
        numbers: NUMBERS,
        target: TARGET,
        index,
        currentSum,
        subset: [...subset],
        callStack: [...callStack],
        result: true,
        explanation: `Found! Subset [${subset.join(', ')}] sums to ${TARGET}`,
      });
      return true;
    }

    if (index >= NUMBERS.length || currentSum > TARGET) {
      callStack.pop();
      steps.push({
        numbers: NUMBERS,
        target: TARGET,
        index,
        currentSum,
        subset: [...subset],
        callStack: [...callStack],
        result: false,
        explanation: `Pruned: ${currentSum > TARGET ? 'Sum exceeds target' : 'No more elements'}`,
      });
      return false;
    }

    // Try including current element
    const includeResult = backtrack(index + 1, currentSum + NUMBERS[index], [
      ...subset,
      NUMBERS[index],
    ]);
    callStack.pop();

    if (includeResult) {
      return true;
    }

    // Try excluding current element
    const excludeResult = backtrack(index + 1, currentSum, subset);
    callStack.pop();

    return excludeResult;
  }

  const result = backtrack(0, 0, []);

  steps.push({
    numbers: NUMBERS,
    target: TARGET,
    index: -1,
    currentSum: 0,
    subset: [],
    callStack: [],
    result,
    explanation: `Complete: ${result ? 'Subset sum exists' : 'No subset sums to target'}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function SubsetSumExistsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { numbers, target, index, currentSum, subset, callStack, result, explanation } =
    currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Subset Sum Exists (Backtracking)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {result !== null && (
          <p className={`font-semibold mt-2 ${result ? 'text-green-400' : 'text-red-400'}`}>
            Result: {result ? 'TRUE' : 'FALSE'}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Numbers Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Numbers</h3>
          <div className="flex gap-2 flex-wrap">
            {numbers.map((num, idx) => {
              const isCurrent = idx === index && index !== -1;
              const isInSubset = subset.includes(num) && idx <= index;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : isInSubset
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{num}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Subset */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            Current Subset (Sum: {currentSum} / Target: {target})
          </h3>
          {subset.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {subset.map((num, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  {num}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call Stack */}
        {callStack.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Call Stack</h3>
            <div className="space-y-2">
              {callStack.map((call, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-800 rounded-lg border-2 border-zinc-700 font-mono text-sm"
                >
                  <span className="text-cyan-400">backtrack</span>
                  <span className="text-white">
                    (index={call.index}, sum={call.sum})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
