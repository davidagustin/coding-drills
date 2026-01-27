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

// Batch 6: Additional Tree & String algorithms
const InvertTreeViz = dynamic(() => import('./InvertTreeViz'), { ssr: false });
const SameTreeViz = dynamic(() => import('./SameTreeViz'), { ssr: false });
const MaxDepthTreeViz = dynamic(() => import('./MaxDepthTreeViz'), { ssr: false });
const PathSumViz = dynamic(() => import('./PathSumViz'), { ssr: false });
const SymmetricTreeViz = dynamic(() => import('./SymmetricTreeViz'), { ssr: false });
const BalancedTreeViz = dynamic(() => import('./BalancedTreeViz'), { ssr: false });
const ValidParenthesesViz = dynamic(() => import('./ValidParenthesesViz'), { ssr: false });
const LongestCommonPrefixViz = dynamic(() => import('./LongestCommonPrefixViz'), { ssr: false });
const ValidAnagramViz = dynamic(() => import('./ValidAnagramViz'), { ssr: false });
const SingleNumberViz = dynamic(() => import('./SingleNumberViz'), { ssr: false });
const PowerOfTwoViz = dynamic(() => import('./PowerOfTwoViz'), { ssr: false });
const CountBitsViz = dynamic(() => import('./CountBitsViz'), { ssr: false });
const MissingNumberViz = dynamic(() => import('./MissingNumberViz'), { ssr: false });
const MergeSortViz = dynamic(() => import('./MergeSortViz'), { ssr: false });
const QuickSortViz = dynamic(() => import('./QuickSortViz'), { ssr: false });
const HeapSortViz = dynamic(() => import('./HeapSortViz'), { ssr: false });
const BubbleSortViz = dynamic(() => import('./BubbleSortViz'), { ssr: false });
const InsertionSortViz = dynamic(() => import('./InsertionSortViz'), { ssr: false });
const SelectionSortViz = dynamic(() => import('./SelectionSortViz'), { ssr: false });
const IsomorphicStringsViz = dynamic(() => import('./IsomorphicStringsViz'), { ssr: false });
const ReverseWordsViz = dynamic(() => import('./ReverseWordsViz'), { ssr: false });
const AddStringsViz = dynamic(() => import('./AddStringsViz'), { ssr: false });
const MultiplyStringsViz = dynamic(() => import('./MultiplyStringsViz'), { ssr: false });
const LevelOrderViz = dynamic(() => import('./LevelOrderViz'), { ssr: false });
const PreorderTraversalViz = dynamic(() => import('./PreorderTraversalViz'), { ssr: false });
const PostorderTraversalViz = dynamic(() => import('./PostorderTraversalViz'), { ssr: false });
const FlattenTreeViz = dynamic(() => import('./FlattenTreeViz'), { ssr: false });
const PathSum2Viz = dynamic(() => import('./PathSum2Viz'), { ssr: false });
const CombinationSumViz = dynamic(() => import('./CombinationSumViz'), { ssr: false });
const CombinationSum2Viz = dynamic(() => import('./CombinationSum2Viz'), { ssr: false });
const Permutations2Viz = dynamic(() => import('./Permutations2Viz'), { ssr: false });
const Subsets2Viz = dynamic(() => import('./Subsets2Viz'), { ssr: false });
const SudokuSolverViz = dynamic(() => import('./SudokuSolverViz'), { ssr: false });
const NextPermutationViz = dynamic(() => import('./NextPermutationViz'), { ssr: false });
const RotateArrayViz = dynamic(() => import('./RotateArrayViz'), { ssr: false });
const FindDuplicatesViz = dynamic(() => import('./FindDuplicatesViz'), { ssr: false });
const FirstMissingPositiveViz = dynamic(() => import('./FirstMissingPositiveViz'), { ssr: false });
const PowViz = dynamic(() => import('./PowViz'), { ssr: false });
const SqrtViz = dynamic(() => import('./SqrtViz'), { ssr: false });
const SetMatrixZeroesViz = dynamic(() => import('./SetMatrixZeroesViz'), { ssr: false });
const RotateImageViz = dynamic(() => import('./RotateImageViz'), { ssr: false });
const GameOfLifeViz = dynamic(() => import('./GameOfLifeViz'), { ssr: false });
const ValidSudokuViz = dynamic(() => import('./ValidSudokuViz'), { ssr: false });
const GCDViz = dynamic(() => import('./GCDViz'), { ssr: false });
const FactorialViz = dynamic(() => import('./FactorialViz'), { ssr: false });
const FibonacciViz = dynamic(() => import('./FibonacciViz'), { ssr: false });
const PascalTriangleViz = dynamic(() => import('./PascalTriangleViz'), { ssr: false });
const PascalTriangle2Viz = dynamic(() => import('./PascalTriangle2Viz'), { ssr: false });
const SearchRangeViz = dynamic(() => import('./SearchRangeViz'), { ssr: false });
const FindFirstLastViz = dynamic(() => import('./FindFirstLastViz'), { ssr: false });
const SearchInsertViz = dynamic(() => import('./SearchInsertViz'), { ssr: false });
const FindMinRotatedViz = dynamic(() => import('./FindMinRotatedViz'), { ssr: false });
const SearchRotated2Viz = dynamic(() => import('./SearchRotated2Viz'), { ssr: false });
const MedianSortedArraysViz = dynamic(() => import('./MedianSortedArraysViz'), { ssr: false });
const RemoveDuplicatesViz = dynamic(() => import('./RemoveDuplicatesViz'), { ssr: false });
const RemoveElementViz = dynamic(() => import('./RemoveElementViz'), { ssr: false });
const PlusOneViz = dynamic(() => import('./PlusOneViz'), { ssr: false });
const AddBinaryViz = dynamic(() => import('./AddBinaryViz'), { ssr: false });
const LengthOfLastWordViz = dynamic(() => import('./LengthOfLastWordViz'), { ssr: false });
const SimplifyPathViz = dynamic(() => import('./SimplifyPathViz'), { ssr: false });
const BasicCalculatorViz = dynamic(() => import('./BasicCalculatorViz'), { ssr: false });
const EvaluateReversePolishViz = dynamic(() => import('./EvaluateReversePolishViz'), {
  ssr: false,
});
const DailyTemperaturesViz = dynamic(() => import('./DailyTemperaturesViz'), { ssr: false });
const LargestRectangleViz = dynamic(() => import('./LargestRectangleViz'), { ssr: false });
const MaximalRectangleViz = dynamic(() => import('./MaximalRectangleViz'), { ssr: false });
const TrapRainWaterViz = dynamic(() => import('./TrapRainWaterViz'), { ssr: false });
const DijkstraViz = dynamic(() => import('./DijkstraViz'), { ssr: false });
const BellmanFordViz = dynamic(() => import('./BellmanFordViz'), { ssr: false });
const KruskalMSTViz = dynamic(() => import('./KruskalMSTViz'), { ssr: false });
const PrimMSTViz = dynamic(() => import('./PrimMSTViz'), { ssr: false });

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

  // Batch 6: Additional Tree & String algorithms
  'invert-tree': InvertTreeViz,
  'same-tree': SameTreeViz,
  'max-depth-tree': MaxDepthTreeViz,
  'path-sum': PathSumViz,
  'symmetric-tree': SymmetricTreeViz,
  'balanced-tree': BalancedTreeViz,
  'valid-parentheses': ValidParenthesesViz,
  'longest-common-prefix': LongestCommonPrefixViz,
  'valid-anagram': ValidAnagramViz,
  'single-number': SingleNumberViz,
  'power-of-two': PowerOfTwoViz,
  'count-bits': CountBitsViz,
  'missing-number': MissingNumberViz,
  'merge-sort': MergeSortViz,
  'quick-sort': QuickSortViz,
  'heap-sort': HeapSortViz,
  'bubble-sort': BubbleSortViz,
  'insertion-sort': InsertionSortViz,
  'selection-sort': SelectionSortViz,
  'isomorphic-strings': IsomorphicStringsViz,
  'reverse-words': ReverseWordsViz,
  'add-strings': AddStringsViz,
  'multiply-strings': MultiplyStringsViz,
  'level-order': LevelOrderViz,
  'preorder-traversal': PreorderTraversalViz,
  'postorder-traversal': PostorderTraversalViz,
  'flatten-tree': FlattenTreeViz,
  'path-sum-ii': PathSum2Viz,
  'combination-sum': CombinationSumViz,
  'combination-sum-ii': CombinationSum2Viz,
  'permutations-ii': Permutations2Viz,
  'subsets-ii': Subsets2Viz,
  'sudoku-solver': SudokuSolverViz,
  'next-permutation': NextPermutationViz,
  'rotate-array': RotateArrayViz,
  'find-duplicates': FindDuplicatesViz,
  'first-missing-positive': FirstMissingPositiveViz,
  pow: PowViz,
  sqrt: SqrtViz,
  'set-matrix-zeroes': SetMatrixZeroesViz,
  'rotate-image': RotateImageViz,
  'game-of-life': GameOfLifeViz,
  'valid-sudoku': ValidSudokuViz,
  gcd: GCDViz,
  factorial: FactorialViz,
  fibonacci: FibonacciViz,
  'pascal-triangle': PascalTriangleViz,
  'pascal-triangle-ii': PascalTriangle2Viz,
  'search-range': SearchRangeViz,
  'find-first-last': FindFirstLastViz,
  'search-insert': SearchInsertViz,
  'find-min-rotated': FindMinRotatedViz,
  'search-rotated-ii': SearchRotated2Viz,
  'median-sorted-arrays': MedianSortedArraysViz,
  'remove-duplicates': RemoveDuplicatesViz,
  'remove-element': RemoveElementViz,
  'plus-one': PlusOneViz,
  'add-binary': AddBinaryViz,
  'length-of-last-word': LengthOfLastWordViz,
  'simplify-path': SimplifyPathViz,
  'basic-calculator': BasicCalculatorViz,
  'evaluate-reverse-polish': EvaluateReversePolishViz,
  'daily-temperatures': DailyTemperaturesViz,
  'largest-rectangle': LargestRectangleViz,
  'maximal-rectangle': MaximalRectangleViz,
  'trap-rain-water': TrapRainWaterViz,
  dijkstra: DijkstraViz,
  'bellman-ford': BellmanFordViz,
  'kruskal-mst': KruskalMSTViz,
  'prim-mst': PrimMSTViz,
};

/**
 * Get the visualization component for an exercise ID (with language prefix).
 * Returns null if no visualization is available.
 */
export function getVisualization(exerciseId: string): ComponentType | null {
  const baseId = exerciseId.replace(/^(js|ts)-/, '');
  return VISUALIZATIONS[baseId] || null;
}
