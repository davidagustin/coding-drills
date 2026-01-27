'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ENCODED = '3a2b1c';

interface RunLengthDecodeStep {
  encoded: string;
  result: string;
  position: number;
  digitSequence: string;
  count: number;
  char: string;
  explanation: string;
}

function computeSteps(): RunLengthDecodeStep[] {
  const steps: RunLengthDecodeStep[] = [];
  let result = '';
  let position = 0;

  steps.push({
    encoded: ENCODED,
    result: '',
    position: 0,
    digitSequence: '',
    count: 0,
    char: '',
    explanation: `Start: Decode "${ENCODED}"`,
  });

  while (position < ENCODED.length) {
    let digitSequence = '';
    while (position < ENCODED.length && ENCODED[position] >= '0' && ENCODED[position] <= '9') {
      digitSequence += ENCODED[position];
      steps.push({
        encoded: ENCODED,
        result,
        position,
        digitSequence,
        count: 0,
        char: '',
        explanation: `Position ${position}: Read digit '${ENCODED[position]}', sequence = "${digitSequence}"`,
      });
      position++;
    }

    const count = parseInt(digitSequence, 10);
    const char = position < ENCODED.length ? ENCODED[position] : '';
    position++;

    steps.push({
      encoded: ENCODED,
      result,
      position,
      digitSequence,
      count,
      char,
      explanation: `Parse: count = ${count}, char = '${char}'`,
    });

    for (let i = 0; i < count; i++) {
      result += char;
      steps.push({
        encoded: ENCODED,
        result,
        position,
        digitSequence,
        count,
        char,
        explanation: `Repeat '${char}' ${i + 1}/${count} times, result = "${result}"`,
      });
    }
  }

  steps.push({
    encoded: ENCODED,
    result,
    position: -1,
    digitSequence: '',
    count: 0,
    char: '',
    explanation: `Complete: Decoded = "${result}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function RunLengthDecodeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { encoded, result, position, digitSequence, count, char, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Run-Length Decoding</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Encoded String */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Encoded String</h3>
          <div className="flex gap-2 flex-wrap">
            {encoded.split('').map((ch, idx) => {
              const isCurrent = idx === position && position !== -1;
              return (
                <div
                  key={idx}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {ch}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Parse */}
        {position !== -1 && (digitSequence || count > 0) && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 mb-2">Current Parse:</p>
            <p className="font-mono text-cyan-400">
              {digitSequence && `Digits: "${digitSequence}"`}
              {count > 0 && `, Count: ${count}, Char: '${char}'`}
            </p>
          </div>
        )}

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Decoded Result</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-lg text-green-400">
            {result || '(empty)'}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
