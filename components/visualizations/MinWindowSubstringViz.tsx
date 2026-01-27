'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const S = 'ADOBECODEBANC';
const T = 'ABC';

interface MinWindowStep {
  s: string;
  t: string;
  left: number;
  right: number;
  need: Record<string, number>;
  window: Record<string, number>;
  valid: number;
  minLen: number;
  minStart: number;
  explanation: string;
}

function computeSteps(): MinWindowStep[] {
  const steps: MinWindowStep[] = [];
  const need: Record<string, number> = {};
  const window: Record<string, number> = {};
  let valid = 0;
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;

  for (const char of T) {
    need[char] = (need[char] || 0) + 1;
  }

  steps.push({
    s: S,
    t: T,
    left: 0,
    right: 0,
    need: { ...need },
    window: {},
    valid: 0,
    minLen: Infinity,
    minStart: 0,
    explanation: `Start: Find minimum window substring containing "${T}"`,
  });

  for (let right = 0; right < S.length; right++) {
    const char = S[right];

    if (need[char]) {
      window[char] = (window[char] || 0) + 1;
      if (window[char] === need[char]) {
        valid++;
      }
    }

    steps.push({
      s: S,
      t: T,
      left,
      right,
      need: { ...need },
      window: { ...window },
      valid,
      minLen: minLen === Infinity ? Infinity : minLen,
      minStart,
      explanation: `Expand window: add "${char}", valid = ${valid}`,
    });

    while (valid === Object.keys(need).length) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
        steps.push({
          s: S,
          t: T,
          left,
          right,
          need: { ...need },
          window: { ...window },
          valid,
          minLen,
          minStart,
          explanation: `Update min window: length = ${minLen}, start = ${minStart}`,
        });
      }

      const leftChar = S[left];
      if (need[leftChar]) {
        if (window[leftChar] === need[leftChar]) {
          valid--;
        }
        window[leftChar]--;
      }

      steps.push({
        s: S,
        t: T,
        left: left + 1,
        right,
        need: { ...need },
        window: { ...window },
        valid,
        minLen: minLen === Infinity ? Infinity : minLen,
        minStart,
        explanation: `Shrink window: remove "${leftChar}", valid = ${valid}`,
      });

      left++;
    }
  }

  steps.push({
    s: S,
    t: T,
    left: minStart,
    right: minStart + minLen - 1,
    need: { ...need },
    window: { ...window },
    valid,
    minLen,
    minStart,
    explanation: `Complete: Min window = "${S.slice(minStart, minStart + minLen)}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  inWindow: '#22c55e',
  minWindow: '#ef4444',
  default: '#3b82f6',
} as const;

export default function MinWindowSubstringViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { s, left, right, minLen, minStart, explanation } = currentStep;
  const isFinal = step === STEPS.length - 1;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Minimum Window Substring</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {isFinal && minLen !== Infinity && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Min Window: &quot;{s.slice(minStart, minStart + minLen)}&quot;
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">String S</h3>
        <div className="flex gap-1 justify-center flex-wrap">
          {s.split('').map((char, idx) => {
            const isCurrent = right === idx || left === idx;
            const inWindow = idx >= left && idx <= right;
            const inMinWindow = isFinal && idx >= minStart && idx < minStart + minLen;

            let bgColor: string = COLORS.default;
            if (inMinWindow) {
              bgColor = COLORS.minWindow;
            } else if (inWindow) {
              bgColor = COLORS.inWindow;
            } else if (isCurrent) {
              bgColor = COLORS.current;
            }

            return (
              <motion.div
                key={idx}
                className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-sm"
                style={{
                  backgroundColor: bgColor,
                  borderColor: isCurrent || inWindow || inMinWindow ? '#fff' : bgColor,
                }}
                animate={{
                  scale: isCurrent || inMinWindow ? 1.1 : 1,
                }}
              >
                {char}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
