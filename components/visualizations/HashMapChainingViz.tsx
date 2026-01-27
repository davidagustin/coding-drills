'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CAPACITY = 10;
const OPERATIONS: Array<['put', string, number] | ['get', string] | ['remove', string]> = [
  ['put', 'a', 1],
  ['put', 'b', 2],
  ['get', 'a'],
  ['put', 'a', 99],
  ['get', 'a'],
  ['remove', 'b'],
  ['get', 'b'],
];

interface HashMapChainingStep {
  buckets: Array<Array<[string, number]>>;
  operation: string;
  key: string | null;
  value: number | null;
  hash: number | null;
  result: number | null;
  explanation: string;
}

function hash(key: string): number {
  let h = 0;
  for (const c of String(key)) h += c.charCodeAt(0);
  return h % CAPACITY;
}

function computeSteps(): HashMapChainingStep[] {
  const steps: HashMapChainingStep[] = [];
  const buckets: Array<Array<[string, number]>> = Array.from({ length: CAPACITY }, () => []);

  steps.push({
    buckets: buckets.map((b) => [...b]),
    operation: 'init',
    key: null,
    value: null,
    hash: null,
    result: null,
    explanation: `Initialize: ${CAPACITY} empty buckets`,
  });

  for (const op of OPERATIONS) {
    if (op[0] === 'put') {
      const [, key, value] = op;
      const hashIdx = hash(key);
      steps.push({
        buckets: buckets.map((b) => [...b]),
        operation: 'put',
        key,
        value,
        hash: hashIdx,
        result: null,
        explanation: `put('${key}', ${value}): hash('${key}') = ${hashIdx}`,
      });

      const bucket = buckets[hashIdx];
      const existingIdx = bucket.findIndex((pair) => pair[0] === key);
      if (existingIdx !== -1) {
        bucket[existingIdx][1] = value;
        steps.push({
          buckets: buckets.map((b) => [...b]),
          operation: 'put',
          key,
          value,
          hash: hashIdx,
          result: null,
          explanation: `Update existing key '${key}' in bucket ${hashIdx}`,
        });
      } else {
        bucket.push([key, value]);
        steps.push({
          buckets: buckets.map((b) => [...b]),
          operation: 'put',
          key,
          value,
          hash: hashIdx,
          result: null,
          explanation: `Add new pair ['${key}', ${value}] to bucket ${hashIdx}`,
        });
      }
    } else if (op[0] === 'get') {
      const [, key] = op;
      const hashIdx = hash(key);
      steps.push({
        buckets: buckets.map((b) => [...b]),
        operation: 'get',
        key,
        value: null,
        hash: hashIdx,
        result: null,
        explanation: `get('${key}'): hash('${key}') = ${hashIdx}, searching bucket`,
      });

      const bucket = buckets[hashIdx];
      const pair = bucket.find((p) => p[0] === key);
      const result = pair ? pair[1] : -1;
      steps.push({
        buckets: buckets.map((b) => [...b]),
        operation: 'get',
        key,
        value: null,
        hash: hashIdx,
        result,
        explanation: `get('${key}'): ${result !== -1 ? `Found value ${result}` : 'Not found'}`,
      });
    } else if (op[0] === 'remove') {
      const [, key] = op;
      const hashIdx = hash(key);
      steps.push({
        buckets: buckets.map((b) => [...b]),
        operation: 'remove',
        key,
        value: null,
        hash: hashIdx,
        result: null,
        explanation: `remove('${key}'): hash('${key}') = ${hashIdx}, searching bucket`,
      });

      const bucket = buckets[hashIdx];
      const matchIdx = bucket.findIndex((pair) => pair[0] === key);
      if (matchIdx !== -1) {
        bucket.splice(matchIdx, 1);
        steps.push({
          buckets: buckets.map((b) => [...b]),
          operation: 'remove',
          key,
          value: null,
          hash: hashIdx,
          result: null,
          explanation: `Removed ['${key}', ...] from bucket ${hashIdx}`,
        });
      } else {
        steps.push({
          buckets: buckets.map((b) => [...b]),
          operation: 'remove',
          key,
          value: null,
          hash: hashIdx,
          result: null,
          explanation: `Key '${key}' not found in bucket ${hashIdx}`,
        });
      }
    }
  }

  steps.push({
    buckets: buckets.map((b) => [...b]),
    operation: 'complete',
    key: null,
    value: null,
    hash: null,
    result: null,
    explanation: `Complete: All operations processed`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function HashMapChainingViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { buckets, key, hash: hashIdx, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Hash Map with Separate Chaining</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {hashIdx !== null && <p className="text-cyan-400 text-sm mt-1">Bucket Index: {hashIdx}</p>}
        {result !== null && <p className="text-green-400 font-semibold mt-2">Result: {result}</p>}
      </div>

      <div className="space-y-4">
        {/* Buckets */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Buckets</h3>
          <div className="grid grid-cols-5 gap-2">
            {buckets.map((bucket, idx) => {
              const isCurrentBucket = idx === hashIdx && hashIdx !== null;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border-2 min-h-[80px] ${
                    isCurrentBucket
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-zinc-800 border-zinc-700'
                  }`}
                >
                  <div className="text-xs text-zinc-500 mb-2 font-mono">[{idx}]</div>
                  <div className="space-y-1">
                    {bucket.length === 0 ? (
                      <span className="text-zinc-600 text-xs">empty</span>
                    ) : (
                      bucket.map((pair, pairIdx) => {
                        const isCurrentKey = pair[0] === key && key !== null;
                        return (
                          <div
                            key={pairIdx}
                            className={`text-xs font-mono px-2 py-1 rounded ${
                              isCurrentKey
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-zinc-700 text-zinc-300'
                            }`}
                          >
                            {pair[0]}: {pair[1]}
                          </div>
                        );
                      })
                    )}
                  </div>
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
