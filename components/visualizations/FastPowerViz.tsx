'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const BASE = 2;
const EXP = 10;

interface FastPowerStep {
  base: number;
  exp: number;
  result: number | null;
  callStack: Array<{ base: number; exp: number }>;
  explanation: string;
}

function computeSteps(): FastPowerStep[] {
  const steps: FastPowerStep[] = [];
  const callStack: Array<{ base: number; exp: number }> = [];

  function fastPower(base: number, exp: number): number {
    callStack.push({ base, exp });
    steps.push({
      base,
      exp,
      result: null,
      callStack: [...callStack],
      explanation: `fastPower(${base}, ${exp}): ${exp === 0 ? 'Base case, return 1' : exp % 2 === 0 ? 'Even exponent, compute half and square' : 'Odd exponent, factor out one base'}`,
    });

    if (exp === 0) {
      callStack.pop();
      steps.push({
        base,
        exp,
        result: 1,
        callStack: [...callStack],
        explanation: `fastPower(${base}, ${exp}) = 1`,
      });
      return 1;
    }

    let result: number;
    if (exp % 2 === 0) {
      const halfPower = fastPower(base, exp / 2);
      result = halfPower * halfPower;
      callStack.pop();
      steps.push({
        base,
        exp,
        result,
        callStack: [...callStack],
        explanation: `fastPower(${base}, ${exp}) = fastPower(${base}, ${exp / 2})² = ${halfPower}² = ${result}`,
      });
    } else {
      result = base * fastPower(base, exp - 1);
      callStack.pop();
      steps.push({
        base,
        exp,
        result,
        callStack: [...callStack],
        explanation: `fastPower(${base}, ${exp}) = ${base} × fastPower(${base}, ${exp - 1}) = ${base} × ${result / base} = ${result}`,
      });
    }
    return result;
  }

  const finalResult = fastPower(BASE, EXP);
  steps.push({
    base: BASE,
    exp: EXP,
    result: finalResult,
    callStack: [],
    explanation: `Complete: ${BASE}^${EXP} = ${finalResult}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FastPowerViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { base, exp, result, callStack, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Fast Power (Binary Exponentiation)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {result !== null && (
          <p className="text-green-400 font-semibold mt-2">
            Result: {base}^{exp} = {result}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Call Stack */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Call Stack</h3>
          {callStack.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="space-y-2">
              {callStack.map((call, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-800 rounded-lg border-2 border-zinc-700 font-mono text-sm"
                >
                  <span className="text-cyan-400">fastPower</span>
                  <span className="text-white">({call.base}, </span>
                  <span className="text-yellow-400">{call.exp}</span>
                  <span className="text-white">)</span>
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
