/**
 * Visualization registry - maps exercise base IDs (without language prefix)
 * to their React visualization components.
 *
 * Usage in exercise page:
 *   const baseId = exerciseId.replace(/^(js|ts)-/, '');
 *   const VizComponent = VISUALIZATIONS[baseId];
 *   if (VizComponent) { <VizComponent /> }
 */
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Lazy-load each visualization to avoid bloating the bundle
const BinarySearchViz = dynamic(() => import('./BinarySearchViz'), { ssr: false });
const BFSTreeViz = dynamic(() => import('./BFSTreeViz'), { ssr: false });
const DFSTreeViz = dynamic(() => import('./DFSTreeViz'), { ssr: false });
const SlidingWindowViz = dynamic(() => import('./SlidingWindowViz'), { ssr: false });
const SpiralMatrixViz = dynamic(() => import('./SpiralMatrixViz'), { ssr: false });
const StackViz = dynamic(() => import('./StackViz'), { ssr: false });
const TwoPointerViz = dynamic(() => import('./TwoPointerViz'), { ssr: false });
const LinkedListViz = dynamic(() => import('./LinkedListViz'), { ssr: false });

// Agent 1: Two Pointers & Sliding Window & Binary Search & Stack/Queue
const MoveZeroesViz = dynamic(() => import('./MoveZeroesViz'), { ssr: false });
const ThreeSumZeroViz = dynamic(() => import('./ThreeSumZeroViz'), { ssr: false });
const ThreeSumViz = dynamic(() => import('./ThreeSumViz'), { ssr: false });
const ContainerMostWaterViz = dynamic(() => import('./ContainerMostWaterViz'), { ssr: false });
const TrappingRainWaterViz = dynamic(() => import('./TrappingRainWaterViz'), { ssr: false });
const DutchNationalFlagViz = dynamic(() => import('./DutchNationalFlagViz'), { ssr: false });
const SlidingWindowMinSubarrayViz = dynamic(() => import('./SlidingWindowMinSubarrayViz'), {
  ssr: false,
});
const SlidingWindowMaxViz = dynamic(() => import('./SlidingWindowMaxViz'), { ssr: false });
const LongestNoRepeatViz = dynamic(() => import('./LongestNoRepeatViz'), { ssr: false });
const MinWindowSubstrViz = dynamic(() => import('./MinWindowSubstrViz'), { ssr: false });
const SearchRotatedViz = dynamic(() => import('./SearchRotatedViz'), { ssr: false });

// Building blocks
const QueueViz = dynamic(() => import('./QueueViz'), { ssr: false });
const MergeSortedViz = dynamic(() => import('./MergeSortedViz'), { ssr: false });
const MinHeapInsertViz = dynamic(() => import('./MinHeapInsertViz'), { ssr: false });
const PrefixSumViz = dynamic(() => import('./PrefixSumViz'), { ssr: false });
const TrieInsertViz = dynamic(() => import('./TrieInsertViz'), { ssr: false });
const GeneratePermutationsViz = dynamic(() => import('./GeneratePermutationsViz'), { ssr: false });
const GenerateCombinationsViz = dynamic(() => import('./GenerateCombinationsViz'), { ssr: false });
const HeapExtractMinViz = dynamic(() => import('./HeapExtractMinViz'), { ssr: false });
const LRUCacheViz = dynamic(() => import('./LRUCacheViz'), { ssr: false });
const BasicMemoizeViz = dynamic(() => import('./BasicMemoizeViz'), { ssr: false });
const GenerateSubsetsViz = dynamic(() => import('./GenerateSubsetsViz'), { ssr: false });
const MergeInPlaceViz = dynamic(() => import('./MergeInPlaceViz'), { ssr: false });
const RotateMatrixViz = dynamic(() => import('./RotateMatrixViz'), { ssr: false });

// Map exercise base ID (without js-/ts- prefix) to visualization component
export const VISUALIZATIONS: Record<string, ComponentType> = {
  'binary-search': BinarySearchViz,
  'binary-search-iterative': BinarySearchViz,
  'bfs-tree': BFSTreeViz,
  'bfs-traversal': BFSTreeViz,
  'dfs-tree': DFSTreeViz,
  'dfs-traversal': DFSTreeViz,
  'dfs-inorder': DFSTreeViz,
  'sliding-window': SlidingWindowViz,
  'sliding-window-max-sum': SlidingWindowViz,
  'spiral-matrix': SpiralMatrixViz,
  'stack-operations': StackViz,
  'two-pointer-palindrome': TwoPointerViz,
  'two-pointer-remove-dupes': TwoPointerViz,
  'linked-list-traverse': LinkedListViz,
  'linked-list-reverse': LinkedListViz,

  // Agent 1: Two Pointers
  'move-zeroes': MoveZeroesViz,
  'three-sum-zero': ThreeSumZeroViz,
  'three-sum': ThreeSumViz,
  'container-most-water': ContainerMostWaterViz,
  'trapping-rain-water': TrappingRainWaterViz,
  'dutch-national-flag': DutchNationalFlagViz,
  // Agent 1: Sliding Window
  'sliding-window-min-subarray': SlidingWindowMinSubarrayViz,
  'sliding-window-max': SlidingWindowMaxViz,
  'longest-no-repeat': LongestNoRepeatViz,
  'min-window-substr': MinWindowSubstrViz,
  // Agent 1: Binary Search
  'search-rotated': SearchRotatedViz,

  // Building blocks
  'queue-operations': QueueViz,
  'merge-sorted': MergeSortedViz,
  'min-heap-insert': MinHeapInsertViz,
  'prefix-sum': PrefixSumViz,
  'trie-insert': TrieInsertViz,
  'generate-permutations': GeneratePermutationsViz,
  'generate-combinations': GenerateCombinationsViz,
  'generate-subsets': GenerateSubsetsViz,
  'heap-extract-min': HeapExtractMinViz,
  'lru-cache': LRUCacheViz,
  'basic-memoize': BasicMemoizeViz,
  'merge-in-place': MergeInPlaceViz,
  'rotate-matrix': RotateMatrixViz,
};

/**
 * Get the visualization component for an exercise ID (with language prefix).
 * Returns null if no visualization is available.
 */
export function getVisualization(exerciseId: string): ComponentType | null {
  const baseId = exerciseId.replace(/^(js|ts)-/, '');
  return VISUALIZATIONS[baseId] || null;
}
