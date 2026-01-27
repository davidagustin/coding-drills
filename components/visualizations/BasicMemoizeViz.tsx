'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed memoization steps                                    */
/* ------------------------------------------------------------------ */

const CALLS = [5, 5, 3, 5, 3, 7] as const;
// Example function: double
const fn = (n: number) => n * 2;

interface MemoStep {
  arg: number;
  cache: Map<number, number>;
  result: number | null;
  action: string;
  isCacheHit: boolean;
}

function computeSteps(): MemoStep[] {
  const steps: MemoStep[] = [];
  const cache = new Map<number, number>();

  steps.push({
    arg: 0,
    cache: new Map(cache),
    result: null,
    action: 'Initialize: empty cache',
    isCacheHit: false,
  });

  for (const arg of CALLS) {
    if (cache.has(arg)) {
      const cachedResult = cache.get(arg)!;
      steps.push({
        arg,
        cache: new Map(cache),
        result: cachedResult,
        action: `fn(${arg}): Cache HIT → return ${cachedResult} (O(1))`,
        isCacheHit: true,
      });
    } else {
      steps.push({
        arg,
        cache: new Map(cache),
        result: null,
        action: `fn(${arg}): Cache MISS → compute fn(${arg})`,
        isCacheHit: false,
      });

      const result = fn(arg);
      cache.set(arg, result);

      steps.push({
        arg,
        cache: new Map(cache),
        result,
        action: `fn(${arg}): Computed ${arg} * 2 = ${result}, store in cache`,
        isCacheHit: false,
      });

      steps.push({
        arg,
        cache: new Map(cache),
        result,
        action: `fn(${arg}): Return ${result}`,
        isCacheHit: false,
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  cacheHit: '#10b981',
  cacheMiss: '#f97316',
  computing: '#3b82f6',
  cache: '#eab308',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BasicMemoizeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: MemoStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  const cacheDisplay = useMemo(() => {
    const cacheEntries = current ? Array.from(current.cache.entries()) : [];
    return cacheEntries.map(([key, value]) => ({
      key,
      value,
      isCurrent: current?.arg === key && current.result !== null,
    }));
  }, [current]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Basic Memoization</h2>
        <p className="text-zinc-500 text-sm">Cache function results to avoid recomputation</p>
      </div>

      {/* Function call */}
      {current && current.arg > 0 && (
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs uppercase tracking-wider">Function Call</span>
            <div>
              <span className="text-zinc-300 font-mono text-lg">fn({current.arg})</span>
            </div>
            {current.result !== null && (
              <div>
                <span className="text-zinc-500">→</span>
                <span
                  className="text-xl font-mono font-bold px-3 py-1 rounded ml-2"
                  style={{
                    backgroundColor: current.isCacheHit ? COLORS.cacheHit : COLORS.computing,
                    color: 'white',
                  }}
                >
                  {current.result}
                </span>
                {current.isCacheHit && <span className="text-zinc-400 text-xs ml-2">(cached)</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cache visualization */}
      <div className="space-y-3">
        <div className="text-zinc-400 text-xs uppercase tracking-wider text-center">
          Cache (Map)
        </div>
        <div className="bg-zinc-800 rounded-lg p-4 min-h-[120px]">
          {cacheDisplay.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {cacheDisplay.map((item) => (
                <div
                  key={item.key}
                  className="flex flex-col items-center p-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: item.isCurrent
                      ? `${current?.isCacheHit ? COLORS.cacheHit : COLORS.computing}40`
                      : `${COLORS.cache}20`,
                    border: item.isCurrent
                      ? `2px solid ${current?.isCacheHit ? COLORS.cacheHit : COLORS.computing}`
                      : `1px solid ${COLORS.cache}60`,
                    boxShadow: item.isCurrent
                      ? `0 0 12px ${current?.isCacheHit ? COLORS.cacheHit : COLORS.computing}40`
                      : 'none',
                  }}
                >
                  <span className="text-zinc-400 text-xs mb-1">key</span>
                  <span className="text-white font-mono font-bold text-lg">{item.key}</span>
                  <span className="text-zinc-500 text-xs my-1">→</span>
                  <span className="text-zinc-400 text-xs mb-1">value</span>
                  <span className="text-white font-mono font-bold text-lg">{item.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-zinc-600 text-sm italic">Cache empty</span>
            </div>
          )}
        </div>
      </div>

      {/* Call sequence */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="text-zinc-400 text-xs uppercase tracking-wider mb-2">Call Sequence</div>
        <div className="flex gap-2 flex-wrap">
          {CALLS.map((arg, idx) => {
            const callStep = STEPS.findIndex((s) => s.arg === arg && s.result !== null);
            const isProcessed = step > 0 && callStep !== -1 && callStep < step;
            const isCurrent = current?.arg === arg && current.result !== null;

            return (
              <div
                key={idx}
                className="px-3 py-1 rounded font-mono text-sm font-bold transition-all"
                style={{
                  backgroundColor: isCurrent
                    ? current.isCacheHit
                      ? COLORS.cacheHit
                      : COLORS.computing
                    : isProcessed
                      ? COLORS.cache
                      : '#52525b',
                  color: 'white',
                  opacity: isProcessed || isCurrent ? 1 : 0.5,
                }}
              >
                fn({arg})
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.cacheHit }}
          />
          <span className="text-zinc-400">Cache Hit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.computing }}
          />
          <span className="text-zinc-400">Computing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.cache }} />
          <span className="text-zinc-400">Cached</span>
        </div>
      </div>

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.cache} />
    </div>
  );
}
