'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [1, 1, 2];

interface Permutation2Step {
  nums: number[];
  current: number[];
  used: boolean[];
  permutations: number[][];
  explanation: string;
}

function computeSteps(): Permutation2Step[] {
  const steps: Permutation2Step[] = [];
  const permutations: number[][] = [];
  const used = new Array(NUMS.length).fill(false);
  const sorted = [...NUMS].sort((a, b) => a - b);
  
  function backtrack(current: number[]): void {
    if (current.length === sorted.length) {
      permutations.push([...current]);
      steps.push({
        nums: [...sorted],
        current: [...current],
        used: [...used],
        permutations: permutations.map(p => [...p]),
        explanation: `Found permutation [${current.join(', ')}]`,
      });
      return;
    }
    
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) {
        steps.push({
          nums: [...sorted],
          current: [...current],
          used: [...used],
          permutations: permutations.map(p => [...p]),
          explanation: `Skip index ${i} (already used)`,
        });
        continue;
      }
      
      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) {
        steps.push({
          nums: [...sorted],
          current: [...current],
          used: [...used],
          permutations: permutations.map(p => [...p]),
          explanation: `Skip duplicate ${sorted[i]} (previous not used)`,
        });
        continue;
      }
      
      used[i] = true;
      current.push(sorted[i]);
      steps.push({
        nums: [...sorted],
        current: [...current],
        used: [...used],
        permutations: permutations.map(p => [...p]),
        explanation: `Add ${sorted[i]} at index ${i}`,
      });
      
      backtrack(current);
      
      current.pop();
      used[i] = false;
      steps.push({
        nums: [...sorted],
        current: [...current],
        used: [...used],
        permutations: permutations.map(p => [...p]),
        explanation: `Remove ${sorted[i]}, backtrack`,
      });
    }
  }
  
  steps.push({
    nums: [...sorted],
    current: [],
    used: [...used],
    permutations: [],
    explanation: `Start: Find all unique permutations of [${sorted.join(', ')}]`,
  });
  
  backtrack([]);
  
  steps.push({
    nums: [...sorted],
    current: [],
    used: [...used],
    permutations: permutations.map(p => [...p]),
    explanation: `Complete: Found ${permutations.length} unique permutation(s)`,
  });
  
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  selected: '#22c55e',
  used: '#6b7280',
  default: '#3b82f6',
} as const;

export default function Permutations2Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { nums, current, used, permutations, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Permutations II (Unique)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Found {permutations.length} unique permutation(s)
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Numbers</h3>
          <div className="flex gap-2 justify-center">
            {nums.map((n, i) => {
              const isUsed = used[i];
              
              let bgColor: string = COLORS.default;
              if (isUsed) bgColor = COLORS.used;

              return (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: bgColor,
                  }}
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Current Permutation</h3>
          <div className="flex gap-2 justify-center">
            {current.length === 0 ? (
              <p className="text-zinc-500">Empty</p>
            ) : (
              current.map((n, i) => (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.selected,
                    borderColor: COLORS.selected,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {n}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {permutations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Found Permutations</h3>
            <div className="grid grid-cols-3 gap-2">
              {permutations.map((perm, i) => (
                <div key={i} className="flex gap-1 items-center justify-center">
                  {perm.map((n, j) => (
                    <motion.div
                      key={j}
                      className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-xs"
                      style={{
                        backgroundColor: COLORS.selected,
                        borderColor: COLORS.selected,
                      }}
                    >
                      {n}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
