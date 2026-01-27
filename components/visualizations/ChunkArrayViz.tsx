'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5, 6, 7];
const SIZE = 3;

interface ChunkStep {
  arr: number[];
  chunks: number[][];
  chunkIndex: number;
  explanation: string;
}

function computeSteps(): ChunkStep[] {
  const steps: ChunkStep[] = [];
  const chunks: number[][] = [];
  const chunkCount = Math.ceil(ARRAY.length / SIZE);

  steps.push({
    arr: [...ARRAY],
    chunks: [],
    chunkIndex: -1,
    explanation: `Start: Chunk array [${ARRAY.join(', ')}] into size ${SIZE}`,
  });

  for (let i = 0; i < chunkCount; i++) {
    const chunk = ARRAY.slice(i * SIZE, i * SIZE + SIZE);
    chunks.push(chunk);
    steps.push({
      arr: [...ARRAY],
      chunks: chunks.map((c) => [...c]),
      chunkIndex: i,
      explanation: `Chunk ${i}: [${chunk.join(', ')}]`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    chunks: chunks.map((c) => [...c]),
    chunkIndex: -1,
    explanation: `Complete: ${chunks.length} chunks created`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function ChunkArrayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, chunks, chunkIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Chunk Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Original Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const currentChunkStart = chunkIndex >= 0 ? chunkIndex * SIZE : -1;
              const isInCurrentChunk = idx >= currentChunkStart && idx < currentChunkStart + SIZE;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isInCurrentChunk ? 1.1 : 1,
                  }}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isInCurrentChunk
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Chunks */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Chunks</h3>
          <div className="space-y-2">
            {chunks.length === 0 ? (
              <div className="text-zinc-500 text-sm">No chunks yet</div>
            ) : (
              chunks.map((chunk, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 p-2 rounded-lg border-2 ${
                    idx === chunkIndex
                      ? 'bg-cyan-500/10 border-cyan-500'
                      : 'bg-zinc-800/50 border-zinc-700'
                  }`}
                >
                  <span className="text-xs text-zinc-500 mr-2">Chunk {idx}:</span>
                  {chunk.map((val, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500 flex items-center justify-center font-mono text-sm font-semibold text-green-400"
                    >
                      {val}
                    </div>
                  ))}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
