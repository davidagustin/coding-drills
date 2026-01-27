'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed trie insert steps                                    */
/* ------------------------------------------------------------------ */

const WORDS = ['cat', 'car', 'dog'] as const;

interface TrieNode {
  [key: string]: TrieNode | boolean;
}

interface TrieStep {
  word: string;
  charIndex: number;
  currentNode: string;
  action: string;
  trie: TrieNode;
  path: string[];
}

function computeSteps(): TrieStep[] {
  const steps: TrieStep[] = [];
  const trie: TrieNode = {};
  const path: string[] = ['root'];

  // Initial state
  steps.push({
    word: '',
    charIndex: -1,
    currentNode: 'root',
    action: 'Initialize: empty trie',
    trie: JSON.parse(JSON.stringify(trie)),
    path: [...path],
  });

  // Insert each word
  for (const word of WORDS) {
    steps.push({
      word,
      charIndex: -1,
      currentNode: 'root',
      action: `Start inserting "${word}"`,
      trie: JSON.parse(JSON.stringify(trie)),
      path: ['root'],
    });

    let node = trie;
    path.length = 1;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const exists = char in node;

      if (!exists) {
        steps.push({
          word,
          charIndex: i,
          currentNode: path[path.length - 1],
          action: `Create node for '${char}' (doesn't exist)`,
          trie: JSON.parse(JSON.stringify(trie)),
          path: [...path],
        });
        node[char] = {};
      } else {
        steps.push({
          word,
          charIndex: i,
          currentNode: path[path.length - 1],
          action: `Node '${char}' exists, traverse`,
          trie: JSON.parse(JSON.stringify(trie)),
          path: [...path],
        });
      }

      node = node[char] as TrieNode;
      path.push(char);
    }

    // Mark end of word
    steps.push({
      word,
      charIndex: word.length,
      currentNode: path[path.length - 1],
      action: `Mark end of word "${word}" with $`,
      trie: JSON.parse(JSON.stringify(trie)),
      path: [...path],
    });
    node.$ = true;

    steps.push({
      word,
      charIndex: word.length,
      currentNode: path[path.length - 1],
      action: `Completed inserting "${word}"`,
      trie: JSON.parse(JSON.stringify(trie)),
      path: ['root'],
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  root: '#6366f1',
  node: '#3b82f6',
  current: '#10b981',
  endMarker: '#f97316',
  path: '#eab308',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TrieInsertViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: TrieStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  // Render trie structure
  const renderNode = (
    node: TrieNode,
    char: string,
    level: number,
    x: number,
    y: number,
    isInPath: boolean,
  ): React.ReactNode => {
    const isCurrent = current?.path[current.path.length - 1] === char;
    const isEnd = '$' in node;
    const children = Object.keys(node).filter((k) => k !== '$');

    return (
      <g key={`${char}-${level}-${x}-${y}`}>
        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r="20"
          fill={isCurrent ? COLORS.current : isInPath ? COLORS.path : COLORS.node}
          stroke={isCurrent ? '#ffffff' : 'transparent'}
          strokeWidth="2"
          style={{
            filter: isCurrent ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))' : 'none',
          }}
        />

        {/* Character label */}
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          fontFamily="mono"
        >
          {char === 'root' ? 'R' : char}
        </text>

        {/* End marker */}
        {isEnd && <circle cx={x + 12} cy={y - 12} r="6" fill={COLORS.endMarker} />}

        {/* Render children */}
        {children.map((childChar, idx) => {
          const childX = x + (idx - (children.length - 1) / 2) * 80;
          const childY = y + 60;
          const childIsInPath = current?.path.includes(childChar) ?? false;

          return (
            <g key={childChar}>
              {/* Edge */}
              <line
                x1={x}
                y1={y + 20}
                x2={childX}
                y2={childY - 20}
                stroke={childIsInPath ? COLORS.path : '#52525b'}
                strokeWidth="2"
              />
              {/* Edge label */}
              <text
                x={(x + childX) / 2}
                y={(y + childY) / 2 - 5}
                textAnchor="middle"
                fill={childIsInPath ? COLORS.path : '#71717a'}
                fontSize="10"
                fontWeight="bold"
                fontFamily="mono"
              >
                {childChar}
              </text>
              {/* Recursive render */}
              {renderNode(
                node[childChar] as TrieNode,
                childChar,
                level + 1,
                childX,
                childY,
                childIsInPath,
              )}
            </g>
          );
        })}
      </g>
    );
  };

  const trie = current?.trie ?? {};
  const treeWidth = 400;
  const treeHeight = 300;

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Trie Insert</h2>
        <p className="text-zinc-500 text-sm">Prefix tree insertion</p>
      </div>

      {/* Current word */}
      {current?.word && (
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <span className="text-zinc-400 text-sm">Inserting: </span>
          <span className="text-zinc-200 font-mono font-bold text-lg">{current.word}</span>
          {current.charIndex >= 0 && (
            <>
              <span className="text-zinc-500 mx-2">→</span>
              <span className="text-zinc-300 font-mono">
                {current.word.slice(0, current.charIndex + 1)}
                <span className="text-yellow-400">{current.word.slice(current.charIndex + 1)}</span>
              </span>
            </>
          )}
        </div>
      )}

      {/* Trie visualization */}
      <div className="flex justify-center">
        <svg
          width={treeWidth}
          height={treeHeight}
          className="overflow-visible"
          role="img"
          aria-label="Trie tree structure"
        >
          <title>Trie Tree Visualization</title>
          {renderNode(trie, 'root', 0, treeWidth / 2, 50, true)}
        </svg>
      </div>

      {/* Path visualization */}
      {current && current.path.length > 1 && (
        <div className="bg-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-sm">Current path:</span>
            <div className="flex gap-1">
              {current.path.map((char, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded font-mono text-sm font-bold"
                  style={{
                    backgroundColor: idx === current.path.length - 1 ? COLORS.current : COLORS.path,
                    color: 'white',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.current }}
          />
          <span className="text-zinc-400">Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.path }} />
          <span className="text-zinc-400">Path</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: COLORS.endMarker }}
          />
          <span className="text-zinc-400">End of word</span>
        </div>
      </div>

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.node} />
    </div>
  );
}
