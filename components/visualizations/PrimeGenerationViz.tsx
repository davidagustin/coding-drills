'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MAX = 20;

interface PrimeStep {
  candidate: number;
  primes: number[];
  checking: number[];
  explanation: string;
}

function computeSteps(): PrimeStep[] {
  const steps: PrimeStep[] = [];
  const primes: number[] = [];

  steps.push({
    candidate: 0,
    primes: [],
    checking: [],
    explanation: `Start: Generate primes from 2 to ${MAX}`,
  });

  for (let candidate = 2; candidate <= MAX; candidate++) {
    let isPrime = true;
    const divisors: number[] = [];

    for (let divisor = 2; divisor <= Math.sqrt(candidate); divisor++) {
      divisors.push(divisor);
      if (candidate % divisor === 0) {
        isPrime = false;
        steps.push({
          candidate,
          primes: [...primes],
          checking: [...divisors],
          explanation: `${candidate} % ${divisor} === 0 → not prime`,
        });
        break;
      }
      steps.push({
        candidate,
        primes: [...primes],
        checking: [...divisors],
        explanation: `Checking ${candidate} % ${divisor} !== 0 → continue`,
      });
    }

    if (isPrime) {
      primes.push(candidate);
      steps.push({
        candidate,
        primes: [...primes],
        checking: [],
        explanation: `${candidate} is prime → add to list`,
      });
    }
  }

  steps.push({
    candidate: 0,
    primes: [...primes],
    checking: [],
    explanation: `Complete: Found ${primes.length} primes`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PrimeGenerationViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { candidate, primes, checking, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Generate Prime Numbers</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Current Candidate */}
        {candidate > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Checking Candidate</h3>
            <div className="flex gap-2 items-center">
              <div className="px-6 py-4 rounded-lg bg-yellow-500/20 border-2 border-yellow-500">
                <span className="text-yellow-400 font-mono text-2xl font-bold">{candidate}</span>
              </div>
              {checking.length > 0 && (
                <>
                  <span className="text-zinc-500">checking divisors:</span>
                  {checking.map((d) => (
                    <div
                      key={d}
                      className="px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500 text-blue-400 font-mono"
                    >
                      {d}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* Primes Found */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Primes Found</h3>
          <div className="flex gap-2 flex-wrap">
            {primes.length === 0 ? (
              <div className="text-zinc-500 text-sm">None yet</div>
            ) : (
              primes.map((p) => (
                <div
                  key={p}
                  className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {p}
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
