'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [1, 2, 3];

interface NextPermStep {
  nums: number[];
  i: number;
  j: number;
  action: string;
  explanation: string;
}

function computeSteps(): NextPermStep[] {
  const steps: NextPermStep[] = [];
  const nums = [...NUMS];
  
  steps.push({
    nums: [...nums],
    i: -1,
    j: -1,
    action: 'start',
    explanation: `Start: Find next permutation of [${nums.join(', ')}]`,
  });
  
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    steps.push({
      nums: [...nums],
      i,
      j: -1,
      action: 'find',
      explanation: `nums[${i}]=${nums[i]} >= nums[${i + 1}]=${nums[i + 1]} → continue`,
    });
    i--;
  }
  
  if (i >= 0) {
    steps.push({
      nums: [...nums],
      i,
      j: -1,
      action: 'found',
      explanation: `Found pivot at index ${i}: nums[${i}]=${nums[i]}`,
    });
    
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) {
      steps.push({
        nums: [...nums],
        i,
        j,
        action: 'search',
        explanation: `nums[${j}]=${nums[j]} <= nums[${i}]=${nums[i]} → continue`,
      });
      j--;
    }
    
    steps.push({
      nums: [...nums],
      i,
      j,
      action: 'swap',
      explanation: `Swap nums[${i}]=${nums[i]} and nums[${j}]=${nums[j]}`,
    });
    [nums[i], nums[j]] = [nums[j], nums[i]];
    
    steps.push({
      nums: [...nums],
      i,
      j,
      action: 'reverse',
      explanation: `Reverse from index ${i + 1} to end`,
    });
    
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      steps.push({
        nums: [...nums],
        i: left,
        j: right,
        action: 'reverse',
        explanation: `Swap nums[${left}]=${nums[left]} and nums[${right}]=${nums[right]}`,
      });
      left++;
      right--;
    }
  } else {
    steps.push({
      nums: [...nums],
      i: -1,
      j: -1,
      action: 'reverse',
      explanation: 'No pivot found → reverse entire array',
    });
    
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      steps.push({
        nums: [...nums],
        i: left,
        j: right,
        action: 'reverse',
        explanation: `Swap nums[${left}]=${nums[left]} and nums[${right}]=${nums[right]}`,
      });
      left++;
      right--;
    }
  }
  
  steps.push({
    nums: [...nums],
    i: -1,
    j: -1,
    action: 'complete',
    explanation: `Complete: Next permutation [${nums.join(', ')}]`,
  });
  
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  pivot: '#ef4444',
  swapping: '#22c55e',
  default: '#3b82f6',
} as const;

export default function NextPermutationViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { nums, i, j, action, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Next Permutation</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: [{nums.join(', ')}]
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {nums.map((n, idx) => {
            let bgColor: string = COLORS.default;
            if (idx === i && action === 'found') {
              bgColor = COLORS.pivot;
            } else if (idx === i || idx === j) {
              bgColor = action === 'swap' ? COLORS.swapping : COLORS.current;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: (idx === i || idx === j) ? '#fff' : bgColor,
                }}
                animate={{
                  scale: (idx === i || idx === j) ? 1.2 : 1,
                }}
              >
                {n}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
