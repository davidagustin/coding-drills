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
            🏆 The Ultimate LeetCode Master Framework (2026)
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
            The &quot;final boss&quot; of LeetCode cheatsheets. This master framework integrates
            Pattern Recognition, Big O Constraint Mapping, Advanced Logic Tells, Bitwise Magic, and
            Data Structure Superpowers into one comprehensive guide.
          </p>

          {/* Step 1: Big O Constraint Filter */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 1 ? null : 1)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">1.</span> The &quot;Big O&quot; Constraint Filter ⏱️
              </h3>
              <span className="text-zinc-400">{activeStep === 1 ? '−' : '+'}</span>
            </button>
            {activeStep === 1 && (
              <div className="mt-4 space-y-4">
                <p className="text-zinc-300">
                  Before coding, check <code className="text-blue-400">N</code> to determine your
                  target complexity.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Input Size (N)
                        </th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Target Complexity
                        </th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Likely Patterns
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200 font-mono">N ≤ 12</td>
                        <td className="p-3 text-zinc-200 font-mono">O(N!)</td>
                        <td className="p-3 text-zinc-300">Permutations, Traveling Salesman</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200 font-mono">N ≤ 25</td>
                        <td className="p-3 text-zinc-200 font-mono">O(2^N)</td>
                        <td className="p-3 text-zinc-300">Subsets, Backtracking, Bitmask DP</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200 font-mono">N ≤ 500</td>
                        <td className="p-3 text-zinc-200 font-mono">O(N³)</td>
                        <td className="p-3 text-zinc-300">Floyd-Warshall, Triple Nested Loops</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200 font-mono">N ≤ 5,000</td>
                        <td className="p-3 text-zinc-200 font-mono">O(N²)</td>
                        <td className="p-3 text-zinc-300">Dynamic Programming, Nested Loops</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200 font-mono">N ≤ 10⁶</td>
                        <td className="p-3 text-zinc-200 font-mono">O(N log N) or O(N)</td>
                        <td className="p-3 text-zinc-300">
                          Sorting, Heaps, Sliding Window, Two Pointers
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-200 font-mono">N ≥ 10⁷</td>
                        <td className="p-3 text-zinc-200 font-mono">O(log N) or O(1)</td>
                        <td className="p-3 text-zinc-300">
                          Binary Search on Answer, Math, Bitwise
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Input-Based Strategy */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 2 ? null : 2)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">2.</span> Input-Based Strategy 📥
              </h3>
              <span className="text-zinc-400">{activeStep === 2 ? '−' : '+'}</span>
            </button>
            {activeStep === 2 && (
              <div className="mt-4 space-y-3 text-zinc-300">
                <p>The data structure dictates the toolset.</p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>
                    <strong className="text-white">Tree / BST:</strong> DFS (paths/depth) vs. BFS
                    (levels/shortest path).
                  </li>
                  <li>
                    <strong className="text-white">Graph:</strong> BFS (shortest path), DFS
                    (connectivity), Union-Find (groups), Topological Sort (dependencies).
                  </li>
                  <li>
                    <strong className="text-white">2D Grid:</strong> DFS/BFS (islands), DP
                    (path-finding), or 4/8-directional movement.
                  </li>
                  <li>
                    <strong className="text-white">Linked List:</strong> Fast & Slow pointers
                    (cycles/midpoint), Dummy Nodes (edge cases).
                  </li>
                  <li>
                    <strong className="text-white">Strings:</strong> Sliding Window (substrings),
                    Tries (prefixes), Stacks (nesting).
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Step 3: Keyword Pattern Recognition */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 3 ? null : 3)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">3.</span> Keyword Pattern Recognition 🔍
              </h3>
              <span className="text-zinc-400">{activeStep === 3 ? '−' : '+'}</span>
            </button>
            {activeStep === 3 && (
              <div className="mt-4 space-y-4">
                <p className="text-zinc-300">
                  The &quot;Tells&quot; hidden in the problem description.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left p-3 text-zinc-300 font-semibold">Keywords</th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Optimal Pattern
                        </th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">Complexity</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Number of ways,&quot; &quot;Optimal,&quot; &quot;Max/Min sum&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Dynamic Programming</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N) to O(N²)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Next greater/smaller element&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Monotonic Stack</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;K largest,&quot; &quot;Top K,&quot; &quot;Median&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Heap / Priority Queue</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N log K)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Contiguous,&quot; &quot;Longest substring,&quot; &quot;Window&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Sliding Window</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Connected,&quot; &quot;Number of groups,&quot; &quot;Islands&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Union-Find</td>
                        <td className="p-3 text-zinc-400 font-mono">O(α(N)) ≈ O(1)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Minimize maximum,&quot; &quot;Search in sorted&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Binary Search</td>
                        <td className="p-3 text-zinc-400 font-mono">O(log N)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">
                          &quot;Undo,&quot; &quot;Nested,&quot; &quot;Parentheses,&quot;
                          &quot;Valid&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Stack</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-200">
                          &quot;Minimum operations,&quot; &quot;Intervals&quot;
                        </td>
                        <td className="p-3 text-yellow-400 font-semibold">Greedy</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Advanced Logic Superpowers */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 4 ? null : 4)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">4.</span> Advanced Logic Superpowers ⚡
              </h3>
              <span className="text-zinc-400">{activeStep === 4 ? '−' : '+'}</span>
            </button>
            {activeStep === 4 && (
              <div className="mt-4 space-y-4 text-zinc-300">
                <div className="space-y-3">
                  <div>
                    <strong className="text-yellow-400">
                      A. The &quot;Two-Pass&quot; (Prefix/Suffix)
                    </strong>
                    <p className="text-sm mt-1">
                      <strong>Tell:</strong> &quot;Product of array except self&quot; or
                      &quot;Trapping rain water.&quot;
                    </p>
                    <p className="text-sm">
                      <strong>Logic:</strong> Compute a property from the left, then from the right,
                      and combine them.
                    </p>
                  </div>
                  <div>
                    <strong className="text-yellow-400">B. In-Place Array Marking</strong>
                    <p className="text-sm mt-1">
                      <strong>Tell:</strong> Array size N with elements 1..N, O(1) space constraint.
                    </p>
                    <p className="text-sm">
                      <strong>Logic:</strong> Use nums[Math.abs(nums[i])-1] *= -1 to
                      &quot;mark&quot; seen indices.
                    </p>
                  </div>
                  <div>
                    <strong className="text-yellow-400">C. Monotonic Deque</strong>
                    <p className="text-sm mt-1">
                      <strong>Tell:</strong> &quot;Maximum value in every sliding window of size
                      K.&quot;
                    </p>
                    <p className="text-sm">
                      <strong>Logic:</strong> Maintain a deque of indices where values are strictly
                      decreasing.
                    </p>
                  </div>
                  <div>
                    <strong className="text-yellow-400">D. Bitwise Magic (O(1) Tricks)</strong>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1 font-mono text-sm">
                      <li>
                        <code className="text-blue-400">x &lt;&lt; 1 / x &gt;&gt; 1</code>: Fast
                        multiply/divide by 2
                      </li>
                      <li>
                        <code className="text-blue-400">x ^ y &lt; 0</code>: Check if signs are
                        opposite
                      </li>
                      <li>
                        <code className="text-blue-400">x & (x - 1) == 0</code>: Check if x is a
                        power of 2
                      </li>
                      <li>
                        <code className="text-blue-400">x ^ x = 0</code>: Find the single unique
                        number in a pair-heavy array
                      </li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-yellow-400">E. The LRU Combo</strong>
                    <p className="text-sm mt-1">
                      <strong>Tell:</strong> O(1) access + O(1) order maintenance.
                    </p>
                    <p className="text-sm">
                      <strong>Logic:</strong> HashMap for lookup + Doubly Linked List for ordering.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 5: Summary Cheat Sheet */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep === 5 ? null : 5)}
              className="w-full text-left flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="text-blue-400">5.</span> Summary Cheat Sheet Table 📋
              </h3>
              <span className="text-zinc-400">{activeStep === 5 ? '−' : '+'}</span>
            </button>
            {activeStep === 5 && (
              <div className="mt-4 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left p-3 text-zinc-300 font-semibold">Scenario</th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">
                          Data Structure
                        </th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">Time</th>
                        <th className="text-left p-3 text-zinc-300 font-semibold">Space</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">Searching in Sorted</td>
                        <td className="p-3 text-yellow-400 font-semibold">Binary Search</td>
                        <td className="p-3 text-zinc-400 font-mono">O(log N)</td>
                        <td className="p-3 text-zinc-400 font-mono">O(1)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">Dependency / Prereqs</td>
                        <td className="p-3 text-yellow-400 font-semibold">Topological Sort</td>
                        <td className="p-3 text-zinc-400 font-mono">O(V+E)</td>
                        <td className="p-3 text-zinc-400 font-mono">O(V+E)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">All Combinations</td>
                        <td className="p-3 text-yellow-400 font-semibold">Backtracking</td>
                        <td className="p-3 text-zinc-400 font-mono">O(2^N)</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">Shortest Path (Unweighted)</td>
                        <td className="p-3 text-yellow-400 font-semibold">BFS</td>
                        <td className="p-3 text-zinc-400 font-mono">O(V+E)</td>
                        <td className="p-3 text-zinc-400 font-mono">O(V)</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="p-3 text-zinc-200">Next Greater Element</td>
                        <td className="p-3 text-yellow-400 font-semibold">Monotonic Stack</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N)</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-zinc-200">Kth Largest Element</td>
                        <td className="p-3 text-yellow-400 font-semibold">Quickselect</td>
                        <td className="p-3 text-zinc-400 font-mono">O(N) avg</td>
                        <td className="p-3 text-zinc-400 font-mono">O(1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
