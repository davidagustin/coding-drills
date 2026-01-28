'use client';

import { useState } from 'react';

interface PatternRecognitionGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PatternRecognitionGuide({ isOpen, onClose }: PatternRecognitionGuideProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            🚀 Ultimate LeetCode Pattern Recognition Guide (2026 Edition)
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          <p className="text-zinc-300">
            This guide provides a systematic 4-step framework to identify the optimal algorithm for
            any coding challenge before you start typing.
          </p>

          {/* Step 1: Constraints */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 1 ? null : 1)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">Step 1:</span> Check The Constraints ⏱️
              </h3>
              <span className="text-zinc-400">{activeStep === 1 ? '−' : '+'}</span>
            </button>
            {activeStep === 1 && (
              <div className="mt-4 space-y-4">
                <p className="text-zinc-300">
                  The size of input <code className="text-blue-400">n</code> is your first hint for
                  the required Time Complexity.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Input Size (n)
                        </th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Viable Complexity
                        </th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Recommended Approaches
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200 font-mono">n ≤ 20</td>
                        <td className="p-3 text-zinc-200 font-mono">O(2ⁿ) or O(n!)</td>
                        <td className="p-3 text-zinc-300">
                          Brute force, backtracking, and recursion. Try all combinations.
                        </td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200 font-mono">10³ to 10⁶</td>
                        <td className="p-3 text-zinc-200 font-mono">O(n) or O(n log n)</td>
                        <td className="p-3 text-zinc-300">
                          Greedy, Two Pointers, Heaps, or Dynamic Programming.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-200 font-mono">n ≥ 10⁷</td>
                        <td className="p-3 text-zinc-200 font-mono">O(log n) or O(1)</td>
                        <td className="p-3 text-zinc-300">
                          Binary search, mathematical formulas, or constant time.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Input Format */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 2 ? null : 2)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">Step 2:</span> Analyze Input Format 📥
              </h3>
              <span className="text-zinc-400">{activeStep === 2 ? '−' : '+'}</span>
            </button>
            {activeStep === 2 && (
              <div className="mt-4 space-y-3 text-zinc-300">
                <p>The data structure provided limits your likely algorithmic choices.</p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>
                    <strong className="text-white">Tree / Binary Tree / BST:</strong> Use DFS for
                    paths and recursive exploration. Use BFS for level-by-level or shortest paths in
                    unweighted trees.
                  </li>
                  <li>
                    <strong className="text-white">Graph (Nodes + Edges):</strong> Use BFS for
                    shortest paths and DFS for connected components. Use Union-Find for &quot;number
                    of groups&quot; and Topological Sort for dependencies.
                  </li>
                  <li>
                    <strong className="text-white">2D Grid / Matrix:</strong> Use DFS/BFS for
                    &quot;islands&quot; and Union-Find for connected regions. Use DP for path
                    problems.
                  </li>
                  <li>
                    <strong className="text-white">Sorted Array:</strong> Use Two Pointers or Binary
                    Search.
                  </li>
                  <li>
                    <strong className="text-white">String:</strong> Use Two Pointers for
                    palindromes. Use Sliding Window for substrings and Stacks for parentheses. Use
                    Tries for word problems.
                  </li>
                  <li>
                    <strong className="text-white">Linked List:</strong> Use Fast & Slow pointers
                    (cycle detection) and dummy node techniques.
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Step 3: Output Format */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 3 ? null : 3)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">Step 3:</span> Analyze Output Format 📤
              </h3>
              <span className="text-zinc-400">{activeStep === 3 ? '−' : '+'}</span>
            </button>
            {activeStep === 3 && (
              <div className="mt-4 space-y-3 text-zinc-300">
                <p>The expected result type narrows down the specific pattern.</p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>
                    <strong className="text-white">List of Lists:</strong> If generating
                    combinations, subsets, or all possible paths,{' '}
                    <strong className="text-yellow-400">Backtracking</strong> is almost always the
                    answer.
                  </li>
                  <li>
                    <strong className="text-white">Single Number:</strong> If finding max/min
                    profit, cost, or &quot;number of ways,&quot; use{' '}
                    <strong className="text-yellow-400">Dynamic Programming</strong> for
                    optimization or <strong className="text-yellow-400">Greedy</strong> for local
                    optimal choices.
                  </li>
                  <li>
                    <strong className="text-white">Modified Array/String:</strong> Use{' '}
                    <strong className="text-yellow-400">Two Pointers</strong> for in-place
                    modifications.
                  </li>
                  <li>
                    <strong className="text-white">Ordered List:</strong> Use{' '}
                    <strong className="text-yellow-400">Sorting</strong>,{' '}
                    <strong className="text-yellow-400">Heaps</strong> to maintain order, or{' '}
                    <strong className="text-yellow-400">Topological Sort</strong> for task ordering.
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Step 4: Keywords */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 4 ? null : 4)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">Step 4:</span> Keyword Pattern Recognition 🔍
              </h3>
              <span className="text-zinc-400">{activeStep === 4 ? '−' : '+'}</span>
            </button>
            {activeStep === 4 && (
              <div className="mt-4 space-y-4">
                <p className="text-zinc-300">
                  Look for these &quot;Tells&quot; in the problem description.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left p-3 text-zinc-300 font-semibold">Keywords</th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Optimal Pattern
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Number of ways,&quot; &quot;Optimal,&quot; &quot;Max/Min
                          profit/cost&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Dynamic Programming</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;K largest,&quot; &quot;Top K elements,&quot; &quot;Median&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Heap / Priority Queue</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Next greater element,&quot; &quot;Next smaller element&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Monotonic Stack</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Substring&quot; with conditions, &quot;Maximum/minimum window&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Sliding Window</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Connected components,&quot; &quot;Number of groups&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Union-Find</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Minimize maximum,&quot; &quot;Search in sorted,&quot; &quot;Kth
                          element&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Binary Search</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Parentheses,&quot; &quot;Undo operations,&quot; &quot;Nested
                          structure&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Stack</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-200">
                          &quot;Palindrome,&quot; &quot;Target sum (sorted),&quot; &quot;Remove
                          duplicates&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Two Pointers</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Advanced Bitwise Logic */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 5 ? null : 5)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-purple-400">Advanced:</span> Bitwise Logic ⚡
              </h3>
              <span className="text-zinc-400">{activeStep === 5 ? '−' : '+'}</span>
            </button>
            {activeStep === 5 && (
              <div className="mt-4 space-y-2 text-zinc-300">
                <p>Recall the Bitwise rules for performance optimization:</p>
                <ul className="space-y-1 list-disc list-inside ml-4 font-mono text-sm">
                  <li>
                    <code className="text-blue-400">x &lt;&lt; n</code>: Multiplies x by 2ⁿ
                  </li>
                  <li>
                    <code className="text-blue-400">x &gt;&gt; n</code>: Divides x by 2ⁿ (integer
                    division)
                  </li>
                  <li>
                    <code className="text-blue-400">!= null</code>: Filters both null and undefined
                    in TypeScript
                  </li>
                  <li>
                    <code className="text-blue-400">~~number</code>: Fast bitwise floor for positive
                    numbers
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="text-center text-zinc-500 text-sm pt-4 border-t border-zinc-800">
            Reference: Bitflip&apos;s Leetcode Pattern Recognition Cheat Sheet (Version 1)
          </div>
        </div>
      </div>
    </div>
  );
}
