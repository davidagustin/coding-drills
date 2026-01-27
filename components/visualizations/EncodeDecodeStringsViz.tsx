'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRINGS = ['hello', 'world', 'code'];

interface EncodeStep {
  phase: 'encode' | 'decode';
  strings: string[];
  encoded: string;
  decoded: string[];
  explanation: string;
}

function computeSteps(): EncodeStep[] {
  const steps: EncodeStep[] = [];

  // Encode
  const encoded = STRINGS.map((s) => `${s.length}#${s}`).join('');
  steps.push({
    phase: 'encode',
    strings: STRINGS,
    encoded,
    decoded: [],
    explanation: `Encode: length#string format → "${encoded}"`,
  });

  // Decode
  const decoded: string[] = [];
  let i = 0;
  while (i < encoded.length) {
    let len = 0;
    while (encoded[i] !== '#') {
      len = len * 10 + parseInt(encoded[i], 10);
      i++;
    }
    i++;
    const str = encoded.substring(i, i + len);
    decoded.push(str);
    i += len;
    steps.push({
      phase: 'decode',
      strings: STRINGS,
      encoded,
      decoded: [...decoded],
      explanation: `Decode: length=${len}, string="${str}"`,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  encode: '#3b82f6',
  decode: '#22c55e',
  current: '#eab308',
} as const;

export default function EncodeDecodeStringsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Encode/Decode Strings</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">Original:</h3>
          <div className="flex gap-2 flex-wrap">
            {currentStep.strings.map((str, idx) => (
              <span key={idx} className="px-3 py-1 rounded bg-zinc-700 text-white font-mono">
                {str}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">Encoded:</h3>
          <div className="p-3 bg-zinc-800 rounded font-mono text-white break-all">
            {currentStep.encoded}
          </div>
        </div>

        {currentStep.decoded.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">Decoded:</h3>
            <div className="flex gap-2 flex-wrap">
              {currentStep.decoded.map((str, idx) => (
                <span key={idx} className="px-3 py-1 rounded bg-green-500 text-white font-mono">
                  {str}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor={COLORS.encode} />
    </div>
  );
}
