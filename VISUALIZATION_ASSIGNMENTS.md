# Visualization Assignments for 4 Agents

This document outlines the unique visualization tasks assigned to each of the 4 agents working on creating visualizations for all interview-recommended problems.

## ✅ Agent 1 - COMPLETED
**Two Pointers Problems:**
- ✅ `container-most-water` - ContainerMostWaterViz.tsx
- ✅ `three-sum-zero` - ThreeSumViz.tsx
- ✅ `trapping-rain-water` - TrappingRainWaterViz.tsx
- ✅ `move-zeroes` - MoveZeroesViz.tsx
- ✅ `dutch-national-flag` - DutchNationalFlagViz.tsx

**Remaining Tasks:**
- ⏳ Tree Problems (7 visualizations)
  - `validate-bst`
  - `kth-smallest-bst`
  - `lowest-common-ancestor`
  - `serialize-tree`
  - `right-side-view`
  - `tree-diameter`
  - `zigzag-level-order`

---

## 🔄 Agent 2 - IN PROGRESS
**Binary Search Problems (6 visualizations):**
- ⏳ `search-rotated`
- ⏳ `min-in-rotated`
- ⏳ `find-peak`
- ⏳ `binary-search-insert`
- ⏳ `search-2d-matrix`
- ⏳ `count-occurrences`

**Graph Problems (7 visualizations):**
- ⏳ `graph-adjacency`
- ⏳ `number-of-islands`
- ⏳ `course-schedule`
- ⏳ `clone-graph`
- ⏳ `topological-sort`
- ⏳ `word-ladder`
- ⏳ `rotting-oranges`

---

## 🔄 Agent 3 - IN PROGRESS
**Sliding Window Problems (4 visualizations):**
- ⏳ `sliding-window-min-subarray`
- ⏳ `longest-no-repeat`
- ⏳ `min-window-substr`
- ⏳ `sliding-window-max`

**Dynamic Programming Problems (16 visualizations):**
- ⏳ `climbing-stairs`
- ⏳ `house-robber`
- ⏳ `coin-change-min`
- ⏳ `lcs-length`
- ⏳ `lis-length`
- ⏳ `edit-distance`
- ⏳ `word-break`
- ⏳ `decode-ways`
- ⏳ `knapsack-01`
- ⏳ `unique-paths-grid`
- ⏳ `min-path-sum-grid`
- ⏳ `max-product-subarray`
- ⏳ `longest-palindrome-substr`
- ⏳ `target-sum-ways`
- ⏳ `partition-equal-subset`
- ⏳ `jump-game`

---

## 🔄 Agent 4 - IN PROGRESS
**Stack/Queue Problems (4 visualizations):**
- ⏳ `queue-operations`
- ⏳ `min-stack`
- ⏳ `monotonic-stack`
- ⏳ `two-stack-queue`

**Remaining Categories:**
- ⏳ Backtracking (7 problems)
  - `generate-permutations`
  - `generate-combinations`
  - `generate-subsets`
  - `word-search-grid`
  - `generate-parens`
  - `n-queens-count`
  - `subset-sum-exists`
- ⏳ Heap/Priority Queue (5 problems)
  - `min-heap-insert`
  - `heap-extract-min`
  - `max-heap-insert`
  - `priority-queue-custom`
  - `quick-select`
- ⏳ Trie (2 problems)
  - `trie-insert`
  - `trie-search`
- ⏳ Union-Find (2 problems)
  - `union-find`
  - `graph-valid-tree`
- ⏳ Array/String Essentials (9 problems)
  - `product-except-self`
  - `merge-intervals`
  - `group-anagrams`
  - `encode-decode-strings`
  - `longest-consecutive-seq`
  - `insert-interval`
  - `rotate-matrix`
  - `string-compress`
- ⏳ Memoization (4 problems)
  - `basic-memoize`
  - `memoize-fibonacci`
  - `debounce`
  - `throttle`
- ⏳ Sorting & Merging (3 problems)
  - `merge-sorted`
  - `merge-in-place`
  - `count-inversions`
- ⏳ Bit Manipulation (2 problems)
  - `count-bits`
  - `is-power-of-two`
- ⏳ LRU Cache (1 problem)
  - `lru-cache`
- ⏳ Prefix Sum (1 problem)
  - `prefix-sum`

---

## Implementation Guidelines

### File Structure
- Each visualization should be in `components/visualizations/[ProblemName]Viz.tsx`
- Register in `components/visualizations/index.ts` with dynamic import
- Map exercise base ID (without language prefix) to component

### Visualization Pattern
1. Use `useVizAnimation` hook for play/pause/step controls
2. Pre-compute algorithm steps in a `computeSteps()` function
3. Use `VizControls` component for consistent UI
4. Follow existing visualization patterns (see BinarySearchViz.tsx, TwoPointerViz.tsx)
5. Use consistent color schemes and animations
6. Include clear labels, legends, and step descriptions

### Key Files to Reference
- `components/visualizations/useVizAnimation.ts` - Animation hook
- `components/visualizations/VizControls.tsx` - Control UI
- `components/visualizations/BinarySearchViz.tsx` - Example implementation
- `components/visualizations/TwoPointerViz.tsx` - Two pointer example
- `lib/exercises/javascript-extra.ts` - Exercise definitions and test cases

### Notes
- Each agent should work on their assigned problems independently
- Visualizations should be interactive and educational
- Use test cases from exercise definitions as visualization data
- Ensure visualizations work for both JavaScript and TypeScript exercises (base ID mapping)
