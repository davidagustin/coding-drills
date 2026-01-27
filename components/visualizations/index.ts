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

// New visualizations
const MinStackViz = dynamic(() => import('./MinStackViz'), { ssr: false });
const ClimbingStairsViz = dynamic(() => import('./ClimbingStairsViz'), { ssr: false });
const ValidateBSTViz = dynamic(() => import('./ValidateBSTViz'), { ssr: false });
const NumberOfIslandsViz = dynamic(() => import('./NumberOfIslandsViz'), { ssr: false });
const MinInRotatedViz = dynamic(() => import('./MinInRotatedViz'), { ssr: false });
const FindPeakViz = dynamic(() => import('./FindPeakViz'), { ssr: false });
const HouseRobberViz = dynamic(() => import('./HouseRobberViz'), { ssr: false });
const CoinChangeMinViz = dynamic(() => import('./CoinChangeMinViz'), { ssr: false });
const UniquePathsGridViz = dynamic(() => import('./UniquePathsGridViz'), { ssr: false });

// Batch 1: Tree & Binary Search
const KthSmallestBSTViz = dynamic(() => import('./KthSmallestBSTViz'), { ssr: false });
const LowestCommonAncestorViz = dynamic(() => import('./LowestCommonAncestorViz'), { ssr: false });
const RightSideViewViz = dynamic(() => import('./RightSideViewViz'), { ssr: false });
const ZigzagLevelOrderViz = dynamic(() => import('./ZigzagLevelOrderViz'), { ssr: false });
const BinarySearchInsertViz = dynamic(() => import('./BinarySearchInsertViz'), { ssr: false });
const Search2DMatrixViz = dynamic(() => import('./Search2DMatrixViz'), { ssr: false });
const CountOccurrencesViz = dynamic(() => import('./CountOccurrencesViz'), { ssr: false });
const GraphAdjacencyViz = dynamic(() => import('./GraphAdjacencyViz'), { ssr: false });
const CourseScheduleViz = dynamic(() => import('./CourseScheduleViz'), { ssr: false });
const CloneGraphViz = dynamic(() => import('./CloneGraphViz'), { ssr: false });

// Batch 2: DP & Graph
const LCSLengthViz = dynamic(() => import('./LCSLengthViz'), { ssr: false });
const LISLengthViz = dynamic(() => import('./LISLengthViz'), { ssr: false });
const EditDistanceViz = dynamic(() => import('./EditDistanceViz'), { ssr: false });
const MinPathSumGridViz = dynamic(() => import('./MinPathSumGridViz'), { ssr: false });
const WordBreakViz = dynamic(() => import('./WordBreakViz'), { ssr: false });
const DecodeWaysViz = dynamic(() => import('./DecodeWaysViz'), { ssr: false });
const Knapsack01Viz = dynamic(() => import('./Knapsack01Viz'), { ssr: false });
const MaxProductSubarrayViz = dynamic(() => import('./MaxProductSubarrayViz'), { ssr: false });
const LongestPalindromeSubstrViz = dynamic(() => import('./LongestPalindromeSubstrViz'), {
  ssr: false,
});
const TargetSumWaysViz = dynamic(() => import('./TargetSumWaysViz'), { ssr: false });

// Batch 3: Array/String & More DP
const ProductExceptSelfViz = dynamic(() => import('./ProductExceptSelfViz'), { ssr: false });
const MergeIntervalsViz = dynamic(() => import('./MergeIntervalsViz'), { ssr: false });
const JumpGameViz = dynamic(() => import('./JumpGameViz'), { ssr: false });
const PartitionEqualSubsetViz = dynamic(() => import('./PartitionEqualSubsetViz'), { ssr: false });
const MonotonicStackViz = dynamic(() => import('./MonotonicStackViz'), { ssr: false });
const TwoStackQueueViz = dynamic(() => import('./TwoStackQueueViz'), { ssr: false });
const LongestConsecutiveSeqViz = dynamic(() => import('./LongestConsecutiveSeqViz'), {
  ssr: false,
});
const GroupAnagramsViz = dynamic(() => import('./GroupAnagramsViz'), { ssr: false });
const InsertIntervalViz = dynamic(() => import('./InsertIntervalViz'), { ssr: false });
const StringCompressViz = dynamic(() => import('./StringCompressViz'), { ssr: false });

// Batch 4: Backtracking, Heap, Trie, Union-Find
const GenerateParensViz = dynamic(() => import('./GenerateParensViz'), { ssr: false });
const WordSearchGridViz = dynamic(() => import('./WordSearchGridViz'), { ssr: false });
const NQueensCountViz = dynamic(() => import('./NQueensCountViz'), { ssr: false });
const SubsetSumExistsViz = dynamic(() => import('./SubsetSumExistsViz'), { ssr: false });
const MaxHeapInsertViz = dynamic(() => import('./MaxHeapInsertViz'), { ssr: false });
const TrieSearchViz = dynamic(() => import('./TrieSearchViz'), { ssr: false });
const UnionFindViz = dynamic(() => import('./UnionFindViz'), { ssr: false });
const GraphValidTreeViz = dynamic(() => import('./GraphValidTreeViz'), { ssr: false });
const SerializeTreeViz = dynamic(() => import('./SerializeTreeViz'), { ssr: false });
const TreeDiameterViz = dynamic(() => import('./TreeDiameterViz'), { ssr: false });
const PriorityQueueCustomViz = dynamic(() => import('./PriorityQueueCustomViz'), { ssr: false });
const QuickSelectViz = dynamic(() => import('./QuickSelectViz'), { ssr: false });

// Batch 5: Final visualizations
const TopologicalSortViz = dynamic(() => import('./TopologicalSortViz'), { ssr: false });
const WordLadderViz = dynamic(() => import('./WordLadderViz'), { ssr: false });
const RottingOrangesViz = dynamic(() => import('./RottingOrangesViz'), { ssr: false });
const EncodeDecodeStringsViz = dynamic(() => import('./EncodeDecodeStringsViz'), { ssr: false });
const MemoizeFibonacciViz = dynamic(() => import('./MemoizeFibonacciViz'), { ssr: false });
const DebounceViz = dynamic(() => import('./DebounceViz'), { ssr: false });
const ThrottleViz = dynamic(() => import('./ThrottleViz'), { ssr: false });
const CountInversionsViz = dynamic(() => import('./CountInversionsViz'), { ssr: false });

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

  // New visualizations
  'min-stack': MinStackViz,
  'climbing-stairs': ClimbingStairsViz,
  'validate-bst': ValidateBSTViz,
  'number-of-islands': NumberOfIslandsViz,
  'min-in-rotated': MinInRotatedViz,
  'find-peak': FindPeakViz,
  'house-robber': HouseRobberViz,
  'coin-change-min': CoinChangeMinViz,
  'unique-paths-grid': UniquePathsGridViz,

  // Batch 1
  'kth-smallest-bst': KthSmallestBSTViz,
  'lowest-common-ancestor': LowestCommonAncestorViz,
  'right-side-view': RightSideViewViz,
  'zigzag-level-order': ZigzagLevelOrderViz,
  'binary-search-insert': BinarySearchInsertViz,
  'search-2d-matrix': Search2DMatrixViz,
  'count-occurrences': CountOccurrencesViz,
  'graph-adjacency': GraphAdjacencyViz,
  'course-schedule': CourseScheduleViz,
  'clone-graph': CloneGraphViz,

  // Batch 2
  'lcs-length': LCSLengthViz,
  'lis-length': LISLengthViz,
  'edit-distance': EditDistanceViz,
  'min-path-sum-grid': MinPathSumGridViz,
  'word-break': WordBreakViz,
  'decode-ways': DecodeWaysViz,
  'knapsack-01': Knapsack01Viz,
  'max-product-subarray': MaxProductSubarrayViz,
  'longest-palindrome-substr': LongestPalindromeSubstrViz,
  'target-sum-ways': TargetSumWaysViz,

  // Batch 3
  'product-except-self': ProductExceptSelfViz,
  'merge-intervals': MergeIntervalsViz,
  'jump-game': JumpGameViz,
  'partition-equal-subset': PartitionEqualSubsetViz,
  'monotonic-stack': MonotonicStackViz,
  'two-stack-queue': TwoStackQueueViz,
  'longest-consecutive-seq': LongestConsecutiveSeqViz,
  'group-anagrams': GroupAnagramsViz,
  'insert-interval': InsertIntervalViz,
  'string-compress': StringCompressViz,

  // Batch 4
  'generate-parens': GenerateParensViz,
  'word-search-grid': WordSearchGridViz,
  'n-queens-count': NQueensCountViz,
  'subset-sum-exists': SubsetSumExistsViz,
  'max-heap-insert': MaxHeapInsertViz,
  'trie-search': TrieSearchViz,
  'union-find': UnionFindViz,
  'graph-valid-tree': GraphValidTreeViz,
  'serialize-tree': SerializeTreeViz,
  'tree-diameter': TreeDiameterViz,
  'priority-queue-custom': PriorityQueueCustomViz,
  'quick-select': QuickSelectViz,

  // Batch 5
  'topological-sort': TopologicalSortViz,
  'word-ladder': WordLadderViz,
  'rotting-oranges': RottingOrangesViz,
  'encode-decode-strings': EncodeDecodeStringsViz,
  'memoize-fibonacci': MemoizeFibonacciViz,
  debounce: DebounceViz,
  throttle: ThrottleViz,
  'count-inversions': CountInversionsViz,
};

/**
 * Get the visualization component for an exercise ID (with language prefix).
 * Returns null if no visualization is available.
 */
export function getVisualization(exerciseId: string): ComponentType | null {
  const baseId = exerciseId.replace(/^(js|ts)-/, '');
  return VISUALIZATIONS[baseId] || null;
}
