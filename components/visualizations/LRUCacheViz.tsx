'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed LRU cache steps                                      */
/* ------------------------------------------------------------------ */

const CAPACITY = 2;
const OPERATIONS: Array<['put' | 'get', number, number?]> = [
  ['put', 1, 1],
  ['put', 2, 2],
  ['get', 1],
  ['put', 3, 3],
  ['get', 2],
  ['get', 3],
];

interface LRUStep {
  cache: Map<number, number>;
  operation: string;
  result: number | null;
  evicted: number | null;
  action: string;
}

function computeSteps(): LRUStep[] {
  const steps: LRUStep[] = [];
  const cache = new Map<number, number>();

  steps.push({
    cache: new Map(cache),
    operation: 'Initial',
    result: null,
    evicted: null,
    action: `Initialize LRU cache with capacity ${CAPACITY}`,
  });

  for (const [op, key, value] of OPERATIONS) {
    let result: number | null = null;
    let evicted: number | null = null;

    if (op === 'get') {
      if (cache.has(key)) {
        const val = cache.get(key);
        if (val === undefined) continue;
        cache.delete(key);
        cache.set(key, val);
        result = val;
        steps.push({
          cache: new Map(cache),
          operation: `get(${key})`,
          result,
          evicted: null,
          action: `get(${key}) → ${val} (moved to most recent)`,
        });
      } else {
        result = -1;
        steps.push({
          cache: new Map(cache),
          operation: `get(${key})`,
          result,
          evicted: null,
          action: `get(${key}) → -1 (not found)`,
        });
      }
    } else {
      // put operation
      if (cache.has(key)) {
        cache.delete(key);
        steps.push({
          cache: new Map(cache),
          operation: `put(${key}, ${value})`,
          result: null,
          evicted: null,
          action: `put(${key}, ${value}): key exists, update position`,
        });
      }

      if (value !== null && value !== undefined) {
        cache.set(key, value);
      }

      if (cache.size > CAPACITY) {
        const oldest = cache.keys().next().value;
        if (oldest !== undefined) {
          evicted = oldest;
          cache.delete(oldest);
          steps.push({
            cache: new Map(cache),
            operation: `put(${key}, ${value})`,
            result: null,
            evicted,
            action: `put(${key}, ${value}): capacity exceeded, evict ${evicted} (LRU)`,
          });
        }
      } else {
        steps.push({
          cache: new Map(cache),
          operation: `put(${key}, ${value})`,
          result: null,
          evicted: null,
          action: `put(${key}, ${value}): added to cache`,
        });
      }
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
  cache: '#3b82f6',
  mostRecent: '#10b981',
  leastRecent: '#f97316',
  evicted: '#ef4444',
  operation: '#eab308',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LRUCacheViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: LRUStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  const cacheDisplay = useMemo(() => {
    const cacheEntries = current ? Array.from(current.cache.entries()) : [];
    return cacheEntries.map(([key, value], idx) => ({
      key,
      value,
      index: idx,
      isMostRecent: idx === cacheEntries.length - 1,
      isLeastRecent: idx === 0 && cacheEntries.length > 0,
    }));
  }, [current]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">LRU Cache</h2>
        <p className="text-zinc-500 text-sm">Least Recently Used eviction policy</p>
      </div>

      {/* Capacity */}
      <div className="bg-zinc-800 rounded-lg p-3 text-center">
        <span className="text-zinc-400 text-sm">Capacity: </span>
        <span className="text-zinc-200 font-mono font-bold">{CAPACITY}</span>
        <span className="text-zinc-500 mx-2">|</span>
        <span className="text-zinc-400 text-sm">Size: </span>
        <span className="text-zinc-200 font-mono font-bold">{cacheDisplay?.length ?? 0}</span>
      </div>

      {/* Current operation */}
      {current && current.operation !== 'Initial' && (
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs uppercase tracking-wider">Operation</span>
            <div>
              <span
                className="text-lg font-mono font-bold px-3 py-1 rounded"
                style={{ backgroundColor: COLORS.operation, color: 'white' }}
              >
                {current.operation}
              </span>
            </div>
            {current.result !== null && (
              <div>
                <span className="text-zinc-400 text-sm">Result: </span>
                <span
                  className="text-lg font-mono font-bold px-3 py-1 rounded"
                  style={{
                    backgroundColor: current.result === -1 ? COLORS.evicted : COLORS.mostRecent,
                    color: 'white',
                  }}
                >
                  {current.result}
                </span>
              </div>
            )}
            {current.evicted !== null && (
              <div>
                <span className="text-zinc-400 text-sm">Evicted: </span>
                <span
                  className="text-lg font-mono font-bold px-3 py-1 rounded"
                  style={{ backgroundColor: COLORS.evicted, color: 'white' }}
                >
                  {current.evicted}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cache visualization */}
      <div className="space-y-3">
        <div className="text-zinc-400 text-xs uppercase tracking-wider text-center">
          Cache (LRU → MRU)
        </div>
        <div className="flex gap-3 items-center justify-center min-h-[100px]">
          {cacheDisplay && cacheDisplay.length > 0 ? (
            cacheDisplay.map((item, idx) => (
              <div key={item.key} className="relative flex flex-col items-center">
                <div
                  className="w-20 h-20 rounded-lg flex flex-col items-center justify-center font-mono font-bold transition-all"
                  style={{
                    backgroundColor: item.isMostRecent
                      ? COLORS.mostRecent
                      : item.isLeastRecent
                        ? COLORS.leastRecent
                        : COLORS.cache,
                    border:
                      item.isMostRecent || item.isLeastRecent
                        ? '3px solid #ffffff'
                        : '2px solid transparent',
                    boxShadow:
                      item.isMostRecent || item.isLeastRecent
                        ? `0 0 12px ${item.isMostRecent ? COLORS.mostRecent : COLORS.leastRecent}`
                        : 'none',
                  }}
                >
                  <span className="text-white text-xs">{item.key}</span>
                  <span className="text-white text-lg">→</span>
                  <span className="text-white text-xs">{item.value}</span>
                </div>
                <span className="text-xs text-zinc-500 mt-1">
                  {item.isLeastRecent ? 'LRU' : item.isMostRecent ? 'MRU' : ''}
                </span>
                {/* Arrow */}
                {idx < cacheDisplay.length - 1 && (
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                    <span className="text-zinc-500 text-xl">→</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <span className="text-zinc-600 text-sm italic">Cache empty</span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.leastRecent }}
          />
          <span className="text-zinc-400">LRU (Least Recent)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.mostRecent }}
          />
          <span className="text-zinc-400">MRU (Most Recent)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.evicted }}
          />
          <span className="text-zinc-400">Evicted</span>
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
