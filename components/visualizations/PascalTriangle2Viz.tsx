'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ROW_INDEX = 3;

interface Pascal2Step {
  row: number[];
  index: number;
  explanation: string;
}

function computeSteps(): Pascal2Step[] {
  const steps: Pascal2Step[] = [];
  const row: number[] = [1];

  steps.push({
    row: [...row],
    index: -1,
    explanation: `Start: Generate row ${ROW_INDEX} of Pascal's triangle`,
  });

  for (let i = 1; i <= ROW_INDEX; i++) {
    const newRow: number[] = [1];

    for (let j = 1; j < i; j++) {
      const val = row[j - 1] + (row[j] || 0);
      newRow.push(val);
      steps.push({
        row: [...newRow],
        index: j,
        explanation: `Row ${i}, Col ${j}: ${row[j - 1]} + ${row[j] || 0} = ${val}`,
      });
    }

    newRow.push(1);
    steps.push({
      row: [...newRow],
      index: newRow.length - 1,
      explanation: `Row ${i}: Add edge element 1`,
    });

    row.length = 0;
    row.push(...newRow);
  }

  steps.push({
    row: [...row],
    index: -1,
    explanation: `Complete: Row ${ROW_INDEX} = [${row.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  computed: '#22c55e',
  default: '#3b82f6',
} as const;

export default function PascalTriangle2Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { row, index, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Pascal&apos;s Triangle II (Get Row)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Row {ROW_INDEX}: [{row.join(', ')}]
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Row {ROW_INDEX}</h3>
        <div className="flex gap-2 justify-center">
          {row.map((val, idx) => {
            const isCurrent = index === idx;

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else {
              bgColor = COLORS.computed;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: isCurrent ? '#fff' : bgColor,
                }}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  opacity: 1,
                }}
                initial={{ opacity: 0, scale: 0 }}
              >
                {val}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
