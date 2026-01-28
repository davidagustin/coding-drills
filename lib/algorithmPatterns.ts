/**
 * Algorithm Pattern Recognition Quiz Data
 * LeetCode-style problems for pattern recognition
 */

export interface AlgorithmPatternProblem {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  correctPattern: AlgorithmPattern;
  patterns: AlgorithmPattern[]; // All options including correct one
  hints: {
    constraints?: string;
    inputFormat?: string;
    outputFormat?: string;
    keywords?: string[];
    bigO?: string; // Big O constraint analysis
    pattern?: string; // Pattern recognition tell
    advancedLogic?: string; // Advanced logic technique if applicable
  };
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export type AlgorithmPattern =
  | 'Dynamic Programming'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Binary Search'
  | 'Backtracking'
  | 'Greedy'
  | 'Heap / Priority Queue'
  | 'Monotonic Stack'
  | 'Union-Find'
  | 'Stack'
  | 'Queue'
  | 'BFS'
  | 'DFS'
  | 'Trie'
  | 'Graph'
  | 'Tree'
  | 'Sorting'
  | 'Hash Map'
  | 'Bit Manipulation'
  | 'Math'
  | 'Brute Force'
  | 'Quickselect'
  | 'String'
  | 'Recursion'
  | 'Linear Search'
  | 'Divide and Conquer'
  | 'Interval'
  | 'Regex'
  | 'Manacher'
  | 'Array'
  | 'Prefix Sum'
  | 'Matrix'
  | 'Newton Method'
  | 'Heap Algorithm'
  | 'Memoization'
  | 'Combinatorics'
  | 'Merge Sort'
  | 'Linked List'
  | 'Bucket Sort'
  | 'Two Heaps'
  | 'Simulation'
  | 'Circular Array'
  | 'Inorder Traversal'
  | 'Topological Sort'
  | 'Multi-source BFS'
  | 'Set'
  | 'Floyd Cycle Detection'
  | 'Dummy Node'
  | 'XOR'
  | 'Brian Kernighan'
  | 'Prefix'
  | 'Fast Power'
  | 'Doubly Linked List'
  | 'Design'
  | 'Dijkstra'
  | 'Eulerian Path'
  | 'Bijection'
  | 'Two Maps';

export const ALGORITHM_PATTERNS: AlgorithmPattern[] = [
  'Dynamic Programming',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Backtracking',
  'Greedy',
  'Heap / Priority Queue',
  'Monotonic Stack',
  'Union-Find',
  'Stack',
  'Queue',
  'BFS',
  'DFS',
  'Trie',
  'Graph',
  'Tree',
  'Sorting',
  'Hash Map',
  'Bit Manipulation',
  'Math',
];

export const PATTERN_PROBLEMS: AlgorithmPatternProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹'],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Two Pointers', 'Brute Force', 'Sorting'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests O(n) or O(n log n)',
      inputFormat: 'Array of integers',
      outputFormat: 'Array of two indices',
      keywords: ['indices', 'two numbers', 'add up'],
      bigO: 'N ≤ 10⁶ → Target: O(N) or O(N log N). Hash Map gives O(N) lookup.',
      pattern: 'Need fast lookup for complement (target - current). Hash Map provides O(1) access.',
    },
    difficulty: 'easy',
    category: 'Array',
  },
  {
    id: 'best-time-to-buy-sell',
    title: 'Best Time to Buy and Sell Stock',
    description:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.',
      },
    ],
    constraints: ['1 ≤ prices.length ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁴'],
    correctPattern: 'Greedy',
    patterns: ['Greedy', 'Dynamic Programming', 'Two Pointers', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 10⁵ requires O(n) solution',
      inputFormat: 'Array of prices',
      outputFormat: 'Single number (max profit)',
      keywords: ['maximize', 'profit', 'optimal'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Greedy approach tracks minimum price seen.',
      pattern:
        'Keywords: "Maximize profit" → Greedy (local optimal choice) or DP. Since single transaction, Greedy works.',
    },
    difficulty: 'easy',
    category: 'Array',
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    description:
      'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
    ],
    constraints: [
      '0 ≤ s.length ≤ 5 * 10⁴',
      's consists of English letters, digits, symbols and spaces.',
    ],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Hash Map', 'Two Pointers', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 5 * 10⁴ suggests O(n) solution',
      inputFormat: 'String',
      outputFormat: 'Single number (length)',
      keywords: ['substring', 'without repeating', 'longest'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Sliding Window maintains valid substring.',
      pattern:
        'Keywords: "Substring", "Longest", "Window" → Sliding Window pattern. Use Hash Map to track character frequencies.',
    },
    difficulty: 'medium',
    category: 'String',
  },
  {
    id: 'container-water',
    title: 'Container With Most Water',
    description:
      'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].',
      },
    ],
    constraints: ['n == height.length', '2 ≤ n ≤ 10⁵', '0 ≤ height[i] ≤ 10⁴'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Greedy', 'Brute Force', 'Dynamic Programming'],
    hints: {
      constraints: 'n ≤ 10⁵ requires O(n) solution',
      inputFormat: 'Array of heights',
      outputFormat: 'Single number (max area)',
      keywords: ['two lines', 'most water', 'maximize'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Two Pointers approach.',
      pattern:
        'Keywords: "Two lines", "Maximize" → Two Pointers. Start from both ends, move pointer with smaller height.',
      advancedLogic:
        'Greedy insight: Always move the shorter pointer since area is limited by height.',
    },
    difficulty: 'medium',
    category: 'Array',
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    description:
      'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1',
      },
    ],
    constraints: ['1 ≤ coins.length ≤ 12', '1 ≤ coins[i] ≤ 2³¹ - 1', '0 ≤ amount ≤ 10⁴'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Greedy', 'Backtracking', 'BFS'],
    hints: {
      constraints: 'amount ≤ 10⁴ suggests DP',
      inputFormat: 'Array of coins, target amount',
      outputFormat: 'Single number (fewest coins)',
      keywords: ['fewest', 'number of ways', 'optimal'],
      bigO: 'N ≤ 5,000 → Target: O(N²). DP with amount as state.',
      pattern:
        'Keywords: "Fewest", "Optimal" → Dynamic Programming. Build up from smaller amounts.',
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'kth-largest',
    title: 'Kth Largest Element in an Array',
    description:
      'Given an integer array nums and an integer k, return the kth largest element in the array.',
    examples: [
      {
        input: 'nums = [3,2,1,5,6,4], k = 2',
        output: '5',
        explanation: 'The 2nd largest element is 5.',
      },
    ],
    constraints: ['1 ≤ k ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Quickselect', 'Sorting', 'Binary Search'],
    hints: {
      constraints: 'n ≤ 10⁵, need O(n log k) or better',
      inputFormat: 'Array, k value',
      outputFormat: 'Single number (kth largest)',
      keywords: ['kth largest', 'top k', 'kth element'],
      bigO: 'N ≤ 10⁶ → Target: O(N log K). Heap maintains K smallest elements.',
      pattern: 'Keywords: "Kth largest", "Top K" → Heap / Priority Queue. Min heap of size K.',
    },
    difficulty: 'medium',
    category: 'Array',
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    description:
      'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The string is valid.',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁴', 's consists of parentheses only "()[]{}".'],
    correctPattern: 'Stack',
    patterns: ['Stack', 'String', 'Hash Map', 'Recursion'],
    hints: {
      constraints: 'n ≤ 10⁴, O(n) solution',
      inputFormat: 'String of parentheses',
      outputFormat: 'Boolean',
      keywords: ['parentheses', 'nested', 'matching'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Stack processes one character at a time.',
      pattern: 'Keywords: "Parentheses", "Nested", "Valid" → Stack. Push opening, pop on closing.',
    },
    difficulty: 'easy',
    category: 'Stack',
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description:
      'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-10⁴ < nums[i], target < 10⁴',
      'All integers in nums are unique',
      'nums is sorted in ascending order',
    ],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Two Pointers', 'Linear Search', 'Hash Map'],
    hints: {
      constraints: 'Sorted array suggests binary search',
      inputFormat: 'Sorted array, target',
      outputFormat: 'Index or -1',
      keywords: ['sorted', 'search', 'target'],
      bigO: 'N ≥ 10⁷ → Target: O(log N). Binary search halves search space.',
      pattern:
        'Keywords: "Search in sorted" → Binary Search. Compare middle element, eliminate half.',
    },
    difficulty: 'easy',
    category: 'Binary Search',
  },
  {
    id: 'max-subarray',
    title: 'Maximum Subarray',
    description:
      'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1] has the largest sum = 6.',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Greedy', 'Divide and Conquer', 'Sliding Window'],
    hints: {
      constraints: 'n ≤ 10⁵ requires efficient solution',
      inputFormat: 'Array of integers',
      outputFormat: 'Single number (max sum)',
      keywords: ['maximum', 'subarray', 'contiguous', 'largest sum'],
      bigO: "N ≤ 10⁶ → Target: O(N). Kadane's algorithm (DP) tracks max ending at each position.",
      pattern:
        'Keywords: "Maximum", "Subarray", "Optimal" → Dynamic Programming. Track max sum ending at each index.',
    },
    difficulty: 'easy',
    category: 'Dynamic Programming',
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    description:
      'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',
      },
    ],
    constraints: [
      '1 ≤ intervals.length ≤ 10⁴',
      'intervals[i].length == 2',
      '0 ≤ starti ≤ endi ≤ 10⁴',
    ],
    correctPattern: 'Sorting',
    patterns: ['Sorting', 'Greedy', 'Two Pointers', 'Interval'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests O(n log n)',
      inputFormat: 'Array of intervals [start, end]',
      outputFormat: 'Array of merged intervals',
      keywords: ['merge', 'overlapping', 'intervals'],
      bigO: 'N ≤ 10⁶ → Target: O(N log N). Sort first, then merge in one pass.',
      pattern:
        'Keywords: "Intervals", "Merge" → Sorting + Greedy. Sort by start, merge overlapping.',
    },
    difficulty: 'medium',
    category: 'Array',
  },
  // Batch 1: More Array & Two Pointers (10 problems)
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    description:
      'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.',
    examples: [
      {
        input: 'nums = [1,1,2]',
        output: '2, nums = [1,2,_]',
        explanation:
          'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 3 * 10⁴',
      '-100 ≤ nums[i] ≤ 100',
      'nums is sorted in non-decreasing order',
    ],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Hash Map', 'Sorting', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 3 * 10⁴, sorted array suggests O(n)',
      inputFormat: 'Sorted array',
      outputFormat: 'Modified array in-place',
      keywords: ['remove duplicates', 'in-place', 'sorted'],
    },
    difficulty: 'easy',
    category: 'Array',
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].',
      },
    ],
    constraints: ['n == height.length', '1 ≤ n ≤ 2 * 10⁴', '0 ≤ height[i] ≤ 10⁵'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Stack', 'Dynamic Programming', 'Monotonic Stack'],
    hints: {
      constraints: 'n ≤ 2 * 10⁴ requires efficient solution',
      inputFormat: 'Array of heights',
      outputFormat: 'Single number (water trapped)',
      keywords: ['trapping', 'water', 'elevation', 'bars'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Two Pointers or Stack approach.',
      pattern:
        'Keywords: "Trapping", "Water" → Two-Pass (prefix/suffix) or Two Pointers. Compute max from left, then from right.',
      advancedLogic:
        'Two-Pass Technique: Calculate max height from left, then from right. Water trapped = min(leftMax, rightMax) - height[i].',
    },
    difficulty: 'hard',
    category: 'Array',
  },
  {
    id: '3sum',
    title: '3Sum',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.',
      },
    ],
    constraints: ['3 ≤ nums.length ≤ 3000', '-10⁵ ≤ nums[i] ≤ 10⁵'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Sorting', 'Hash Map', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 3000 suggests O(n²) solution',
      inputFormat: 'Array of integers',
      outputFormat: 'List of lists (triplets)',
      keywords: ['three numbers', 'sum to zero', 'triplets'],
      bigO: 'N ≤ 5,000 → Target: O(N²). Sort first, then use Two Pointers.',
      pattern:
        'Input-Based Strategy: Array → Sort + Two Pointers. Fix one element, use two pointers for remaining two.',
    },
    difficulty: 'medium',
    category: 'Array',
  },
  {
    id: '4sum',
    title: '4Sum',
    description:
      'Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that nums[a] + nums[b] + nums[c] + nums[d] == target.',
    examples: [
      {
        input: 'nums = [1,0,-1,0,-2,2], target = 0',
        output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 200', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Sorting', 'Hash Map', 'Backtracking'],
    hints: {
      constraints: 'n ≤ 200 allows O(n³) solution',
      inputFormat: 'Array of integers, target',
      outputFormat: 'List of lists (quadruplets)',
      keywords: ['four numbers', 'sum to target', 'quadruplets'],
      bigO: 'N ≤ 500 → Target: O(N³). Sort + nested loops with Two Pointers.',
      pattern:
        'Input-Based Strategy: Array → Sort + Two Pointers. Fix two elements, use two pointers for remaining two.',
    },
    difficulty: 'medium',
    category: 'Array',
  },
  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    description:
      "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
    examples: [
      {
        input: 'nums = [0,1,0,3,12]',
        output: '[1,3,12,0,0]',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-2³¹ ≤ nums[i] ≤ 2³¹ - 1'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Sorting', 'Queue', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 10⁴ requires O(n) solution',
      inputFormat: 'Array of integers',
      outputFormat: 'Modified array in-place',
      keywords: ['move zeroes', 'in-place', 'relative order'],
    },
    difficulty: 'easy',
    category: 'Array',
  },
  {
    id: 'squares-sorted',
    title: 'Squares of a Sorted Array',
    description:
      'Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.',
    examples: [
      {
        input: 'nums = [-4,-1,0,3,10]',
        output: '[0,1,9,16,100]',
        explanation:
          'After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100].',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
      'nums is sorted in non-decreasing order',
    ],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Sorting', 'Math', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 10⁴, sorted array suggests O(n)',
      inputFormat: 'Sorted array',
      outputFormat: 'Sorted array of squares',
      keywords: ['squares', 'sorted', 'non-decreasing'],
    },
    difficulty: 'easy',
    category: 'Array',
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    description:
      'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's[i] is a printable ascii character'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Stack', 'Recursion', 'String'],
    hints: {
      constraints: 'n ≤ 10⁵ requires O(n) solution',
      inputFormat: 'Array of characters',
      outputFormat: 'Reversed array in-place',
      keywords: ['reverse', 'in-place', 'O(1) memory'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Two Pointers swap from both ends.',
      pattern:
        'Input-Based Strategy: Array → Two Pointers. Swap elements from start and end, move inward.',
    },
    difficulty: 'easy',
    category: 'String',
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    description:
      'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 2 * 10⁵', 's consists only of printable ASCII characters'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'String', 'Regex', 'Stack'],
    hints: {
      constraints: 'n ≤ 2 * 10⁵ requires efficient solution',
      inputFormat: 'String',
      outputFormat: 'Boolean',
      keywords: ['palindrome', 'alphanumeric', 'same forward and backward'],
    },
    difficulty: 'easy',
    category: 'String',
  },
  {
    id: 'palindromic-substrings',
    title: 'Palindromic Substrings',
    description: 'Given a string s, return the number of palindromic substrings in it.',
    examples: [
      {
        input: 's = "abc"',
        output: '3',
        explanation: 'Three palindromic strings: "a", "b", "c".',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 1000', 's consists of lowercase English letters'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Dynamic Programming', 'String', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 1000 allows O(n²) solution',
      inputFormat: 'String',
      outputFormat: 'Single number (count)',
      keywords: ['palindromic', 'substrings', 'count'],
      bigO: 'N ≤ 5,000 → Target: O(N²). Expand around centers (odd and even length palindromes).',
      pattern:
        'Input-Based Strategy: String → Two Pointers. Expand around each possible center to count palindromes.',
    },
    difficulty: 'medium',
    category: 'String',
  },
  {
    id: 'longest-palindrome',
    title: 'Longest Palindromic Substring',
    description: 'Given a string s, return the longest palindromic substring in s.',
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 1000', 's consist of only digits and English letters'],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Dynamic Programming', 'String', 'Manacher'],
    hints: {
      constraints: 'n ≤ 1000 allows O(n²) solution',
      inputFormat: 'String',
      outputFormat: 'String (longest palindrome)',
      keywords: ['longest', 'palindromic', 'substring'],
    },
    difficulty: 'medium',
    category: 'String',
  },
  // Batch 2: Sliding Window (10 problems)
  {
    id: 'min-window-substring',
    title: 'Minimum Window Substring',
    description:
      'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.',
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation:
          'The minimum window substring "BANC" includes "A", "B", and "C" from string t.',
      },
    ],
    constraints: [
      'm == s.length',
      'n == t.length',
      '1 ≤ m, n ≤ 10⁵',
      's and t consist of uppercase and lowercase English letters',
    ],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Hash Map', 'Two Pointers', 'String'],
    hints: {
      constraints: 'm, n ≤ 10⁵ requires O(m) solution',
      inputFormat: 'Two strings',
      outputFormat: 'String (minimum window)',
      keywords: ['minimum window', 'substring', 'contains all characters'],
    },
    difficulty: 'hard',
    category: 'String',
  },
  {
    id: 'longest-repeating-char',
    title: 'Longest Repeating Character Replacement',
    description:
      'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English letter. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.',
    examples: [
      {
        input: 's = "ABAB", k = 2',
        output: '4',
        explanation: 'Replace the two "A"s with two "B"s or vice versa.',
      },
    ],
    constraints: [
      '1 ≤ s.length ≤ 10⁵',
      's consists of only uppercase English letters',
      '0 ≤ k ≤ s.length',
    ],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Hash Map', 'Two Pointers', 'Greedy'],
    hints: {
      constraints: 'n ≤ 10⁵ requires efficient solution',
      inputFormat: 'String, integer k',
      outputFormat: 'Single number (length)',
      keywords: ['longest', 'repeating', 'character replacement', 'substring'],
    },
    difficulty: 'medium',
    category: 'String',
  },
  {
    id: 'max-consecutive-ones',
    title: 'Max Consecutive Ones III',
    description:
      "Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.",
    examples: [
      {
        input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2',
        output: '6',
        explanation: '[1,1,1,0,0,1,1,1,1,1,1] Bolded numbers were flipped from 0 to 1.',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', 'nums[i] is either 0 or 1', '0 ≤ k ≤ nums.length'],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Two Pointers', 'Greedy', 'Array'],
    hints: {
      constraints: 'n ≤ 10⁵ requires O(n) solution',
      inputFormat: 'Binary array, integer k',
      outputFormat: 'Single number (max consecutive ones)',
      keywords: ['consecutive', 'flip zeros', 'maximum'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Sliding Window with at most K zeros.',
      pattern:
        'Keywords: "Contiguous", "Window" → Sliding Window. Expand window while zeros ≤ K, shrink when exceeded.',
    },
    difficulty: 'medium',
    category: 'Array',
  },
  {
    id: 'subarray-product',
    title: 'Maximum Product Subarray',
    description:
      'Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.',
    examples: [
      {
        input: 'nums = [2,3,-2,4]',
        output: '6',
        explanation: '[2,3] has the largest product 6.',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 2 * 10⁴',
      '-10 ≤ nums[i] ≤ 10',
      'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Sliding Window', 'Greedy', 'Array'],
    hints: {
      constraints: 'n ≤ 2 * 10⁴ requires efficient solution',
      inputFormat: 'Array of integers',
      outputFormat: 'Single number (max product)',
      keywords: ['maximum', 'product', 'subarray', 'contiguous'],
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'fruit-baskets',
    title: 'Fruit Into Baskets',
    description:
      'You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces. You want to collect as much fruit as possible. However, the owner has some strict rules: you only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold. Return the maximum number of fruits you can collect.',
    examples: [
      {
        input: 'fruits = [1,2,1]',
        output: '3',
        explanation: 'We can collect [1,2,1].',
      },
    ],
    constraints: ['1 ≤ fruits.length ≤ 10⁵', '0 ≤ fruits[i] < fruits.length'],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Hash Map', 'Two Pointers', 'Greedy'],
    hints: {
      constraints: 'n ≤ 10⁵ requires O(n) solution',
      inputFormat: 'Array of fruit types',
      outputFormat: 'Single number (max fruits)',
      keywords: ['two baskets', 'maximum', 'collect fruits', 'subarray'],
    },
    difficulty: 'medium',
    category: 'Array',
  },
  {
    id: 'subarrays-k',
    title: 'Subarray Sum Equals K',
    description:
      'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.',
    examples: [
      {
        input: 'nums = [1,1,1], k = 2',
        output: '2',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 2 * 10⁴', '-1000 ≤ nums[i] ≤ 1000', '-10⁷ ≤ k ≤ 10⁷'],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Prefix Sum', 'Sliding Window', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 2 * 10⁴ requires efficient solution',
      inputFormat: 'Array of integers, integer k',
      outputFormat: 'Single number (count)',
      keywords: ['subarray', 'sum equals k', 'count'],
    },
    difficulty: 'medium',
    category: 'Array',
  },
  {
    id: 'permutation-string',
    title: 'Permutation in String',
    description:
      'Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.',
    examples: [
      {
        input: 's1 = "ab", s2 = "eidbaooo"',
        output: 'true',
        explanation: 's2 contains one permutation of s1 ("ba").',
      },
    ],
    constraints: [
      '1 ≤ s1.length, s2.length ≤ 10⁴',
      's1 and s2 consist of lowercase English letters',
    ],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Hash Map', 'Two Pointers', 'String'],
    hints: {
      constraints: 'n ≤ 10⁴ requires efficient solution',
      inputFormat: 'Two strings',
      outputFormat: 'Boolean',
      keywords: ['permutation', 'contains', 'substring'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Sliding Window with character frequency matching.',
      pattern:
        'Keywords: "Permutation", "Substring", "Window" → Sliding Window. Match character frequencies in fixed-size window.',
    },
    difficulty: 'medium',
    category: 'String',
  },
  {
    id: 'find-anagrams',
    title: 'Find All Anagrams in a String',
    description:
      "Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.",
    examples: [
      {
        input: 's = "cbaebabacd", p = "abc"',
        output: '[0,6]',
        explanation: 'The substring with start index = 0 is "cba", which is an anagram of "abc".',
      },
    ],
    constraints: [
      '1 ≤ s.length, p.length ≤ 3 * 10⁴',
      's and p consist of lowercase English letters',
    ],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Hash Map', 'Two Pointers', 'String'],
    hints: {
      constraints: 'n ≤ 3 * 10⁴ requires efficient solution',
      inputFormat: 'Two strings',
      outputFormat: 'Array of indices',
      keywords: ['anagrams', 'find all', 'indices'],
    },
    difficulty: 'medium',
    category: 'String',
  },
  {
    id: 'longest-substring-k',
    title: 'Longest Substring with At Most K Distinct Characters',
    description:
      'Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.',
    examples: [
      {
        input: 's = "eceba", k = 2',
        output: '3',
        explanation: 'The substring is "ece" with length 3.',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 5 * 10⁴', '0 ≤ k ≤ 50'],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Hash Map', 'Two Pointers', 'String'],
    hints: {
      constraints: 'n ≤ 5 * 10⁴ requires efficient solution',
      inputFormat: 'String, integer k',
      outputFormat: 'Single number (length)',
      keywords: ['longest', 'at most k distinct', 'substring'],
    },
    difficulty: 'medium',
    category: 'String',
  },
  {
    id: 'minimum-size-subarray',
    title: 'Minimum Size Subarray Sum',
    description:
      'Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target.',
    examples: [
      {
        input: 'target = 7, nums = [2,3,1,2,4,3]',
        output: '2',
        explanation: 'The subarray [4,3] has the minimal length under the problem constraint.',
      },
    ],
    constraints: ['1 ≤ target ≤ 10⁹', '1 ≤ nums.length ≤ 10⁵', '1 ≤ nums[i] ≤ 10⁴'],
    correctPattern: 'Sliding Window',
    patterns: ['Sliding Window', 'Two Pointers', 'Prefix Sum', 'Binary Search'],
    hints: {
      constraints: 'n ≤ 10⁵ requires efficient solution',
      inputFormat: 'Array of positive integers, target',
      outputFormat: 'Single number (minimal length)',
      keywords: ['minimum size', 'subarray sum', 'greater than or equal'],
    },
    difficulty: 'medium',
    category: 'Array',
  },
  // Batch 3: Binary Search (10 problems)
  {
    id: 'search-rotated',
    title: 'Search in Rotated Sorted Array',
    description:
      'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 5000',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
      'All values of nums are unique',
      'nums is an ascending array that is possibly rotated',
      '-10⁴ ≤ target ≤ 10⁴',
    ],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Array', 'Divide and Conquer', 'Linear Search'],
    hints: {
      constraints: 'n ≤ 5000, sorted array suggests O(log n)',
      inputFormat: 'Rotated sorted array, target',
      outputFormat: 'Index or -1',
      keywords: ['rotated', 'sorted', 'search', 'target'],
      bigO: 'N ≥ 10⁷ → Target: O(log N). Binary Search with rotation handling.',
      pattern:
        'Keywords: "Search in sorted" → Binary Search. Determine which half is sorted, then search accordingly.',
    },
    difficulty: 'medium',
    category: 'Binary Search',
  },
  {
    id: 'find-min-rotated',
    title: 'Find Minimum in Rotated Sorted Array',
    description:
      'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.',
    examples: [
      {
        input: 'nums = [3,4,5,1,2]',
        output: '1',
        explanation: 'The original array was [1,2,3,4,5] rotated 3 times.',
      },
    ],
    constraints: [
      'n == nums.length',
      '1 ≤ n ≤ 5000',
      '-5000 ≤ nums[i] ≤ 5000',
      'All the integers of nums are unique',
      'nums is sorted and rotated between 1 and n times',
    ],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Array', 'Divide and Conquer', 'Linear Search'],
    hints: {
      constraints: 'n ≤ 5000, sorted array suggests O(log n)',
      inputFormat: 'Rotated sorted array',
      outputFormat: 'Single number (minimum)',
      keywords: ['rotated', 'sorted', 'minimum', 'find'],
    },
    difficulty: 'medium',
    category: 'Binary Search',
  },
  {
    id: 'search-2d-matrix',
    title: 'Search a 2D Matrix',
    description:
      'You are given an m x n integer matrix matrix with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise.',
    examples: [
      {
        input: 'matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 5',
        output: 'true',
      },
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 ≤ m, n ≤ 100',
      '-10⁴ ≤ matrix[i][j], target ≤ 10⁴',
    ],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Matrix', 'Divide and Conquer', 'Linear Search'],
    hints: {
      constraints: 'm, n ≤ 100, sorted matrix suggests O(log(mn))',
      inputFormat: '2D sorted matrix, target',
      outputFormat: 'Boolean',
      keywords: ['2D matrix', 'sorted', 'search', 'target'],
    },
    difficulty: 'medium',
    category: 'Binary Search',
  },
  {
    id: 'koko-bananas',
    title: 'Koko Eating Bananas',
    description:
      'Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Return the minimum integer k such that she can eat all the bananas within h hours.',
    examples: [
      {
        input: 'piles = [3,6,7,11], h = 8',
        output: '4',
      },
    ],
    constraints: ['1 ≤ piles.length ≤ 10⁴', 'piles.length ≤ h ≤ 10⁹', '1 ≤ piles[i] ≤ 10⁹'],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Greedy', 'Math', 'Brute Force'],
    hints: {
      constraints: 'h ≤ 10⁹ suggests binary search on answer',
      inputFormat: 'Array of piles, hours h',
      outputFormat: 'Single number (minimum k)',
      keywords: ['minimum', 'eating speed', 'within h hours'],
      bigO: 'N ≥ 10⁷ → Target: O(log N). Binary Search on Answer (search space: 1 to max(piles)).',
      pattern:
        'Keywords: "Minimize maximum" → Binary Search on Answer. Check if speed K is feasible, adjust search space.',
    },
    difficulty: 'medium',
    category: 'Binary Search',
  },
  {
    id: 'split-array-largest',
    title: 'Split Array Largest Sum',
    description:
      'Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum of the split.',
    examples: [
      {
        input: 'nums = [7,2,5,10,8], k = 2',
        output: '18',
        explanation:
          'It is best to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 1000', '0 ≤ nums[i] ≤ 10⁶', '1 ≤ k ≤ min(50, nums.length)'],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Dynamic Programming', 'Greedy', 'Divide and Conquer'],
    hints: {
      constraints: 'n ≤ 1000, k ≤ 50 suggests binary search on answer',
      inputFormat: 'Array of integers, integer k',
      outputFormat: 'Single number (minimized largest sum)',
      keywords: ['split', 'largest sum', 'minimize'],
    },
    difficulty: 'hard',
    category: 'Binary Search',
  },
  {
    id: 'find-peak',
    title: 'Find Peak Element',
    description:
      'A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: '2',
        explanation: '3 is a peak element and your function should return the index number 2.',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 1000',
      '-2³¹ ≤ nums[i] ≤ 2³¹ - 1',
      'nums[i] != nums[i + 1] for all valid i',
    ],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Array', 'Divide and Conquer', 'Linear Search'],
    hints: {
      constraints: 'n ≤ 1000, but O(log n) possible',
      inputFormat: 'Array of integers',
      outputFormat: 'Index',
      keywords: ['peak element', 'greater than neighbors', 'find'],
    },
    difficulty: 'medium',
    category: 'Binary Search',
  },
  {
    id: 'search-range',
    title: 'Find First and Last Position of Element in Sorted Array',
    description:
      'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1].',
    examples: [
      {
        input: 'nums = [5,7,7,8,8,10], target = 8',
        output: '[3,4]',
      },
    ],
    constraints: [
      '0 ≤ nums.length ≤ 10⁵',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      'nums is a non-decreasing array',
      '-10⁹ ≤ target ≤ 10⁹',
    ],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Array', 'Two Pointers', 'Linear Search'],
    hints: {
      constraints: 'n ≤ 10⁵, sorted array suggests O(log n)',
      inputFormat: 'Sorted array, target',
      outputFormat: 'Array of two indices',
      keywords: ['sorted', 'first and last', 'position', 'target'],
    },
    difficulty: 'medium',
    category: 'Binary Search',
  },
  {
    id: 'capacity-ships',
    title: 'Capacity To Ship Packages Within D Days',
    description:
      'A conveyor belt has packages that must be shipped from one port to another within days days. The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt. We may not load more weight than the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.',
    examples: [
      {
        input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5',
        output: '15',
        explanation: 'A ship capacity of 15 is the minimum to ship all the packages in 5 days.',
      },
    ],
    constraints: ['1 ≤ days ≤ weights.length ≤ 5 * 10⁴', '1 ≤ weights[i] ≤ 500'],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Greedy', 'Array', 'Math'],
    hints: {
      constraints: 'n ≤ 5 * 10⁴ suggests binary search on answer',
      inputFormat: 'Array of weights, days',
      outputFormat: 'Single number (minimum capacity)',
      keywords: ['ship packages', 'within days', 'minimum capacity'],
      bigO: 'N ≥ 10⁷ → Target: O(log N). Binary Search on Answer (search space: max(weights) to sum(weights)).',
      pattern:
        'Keywords: "Minimize maximum" → Binary Search on Answer. Check if capacity C is feasible within D days.',
    },
    difficulty: 'medium',
    category: 'Binary Search',
  },
  {
    id: 'median-sorted',
    title: 'Median of Two Sorted Arrays',
    description:
      'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.',
      },
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 ≤ m ≤ 1000',
      '0 ≤ n ≤ 1000',
      '1 ≤ m + n ≤ 2000',
      '-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶',
    ],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Divide and Conquer', 'Array', 'Math'],
    hints: {
      constraints: 'm + n ≤ 2000, but O(log(m+n)) possible',
      inputFormat: 'Two sorted arrays',
      outputFormat: 'Double (median)',
      keywords: ['median', 'two sorted arrays', 'merged'],
    },
    difficulty: 'hard',
    category: 'Binary Search',
  },
  {
    id: 'sqrt',
    title: 'Sqrt(x)',
    description:
      'Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.',
    examples: [
      {
        input: 'x = 4',
        output: '2',
      },
    ],
    constraints: ['0 ≤ x ≤ 2³¹ - 1'],
    correctPattern: 'Binary Search',
    patterns: ['Binary Search', 'Math', 'Newton Method', 'Brute Force'],
    hints: {
      constraints: 'x ≤ 2³¹ suggests binary search',
      inputFormat: 'Non-negative integer',
      outputFormat: 'Integer (square root)',
      keywords: ['square root', 'rounded down', 'nearest integer'],
    },
    difficulty: 'easy',
    category: 'Math',
  },
  // Batch 4: Backtracking (10 problems)
  {
    id: 'generate-parentheses',
    title: 'Generate Parentheses',
    description:
      'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    examples: [
      {
        input: 'n = 3',
        output: '["((()))","(()())","(())()","()(())","()()()"]',
      },
    ],
    constraints: ['1 ≤ n ≤ 8'],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Recursion', 'Dynamic Programming', 'String'],
    hints: {
      constraints: 'n ≤ 8 allows backtracking',
      inputFormat: 'Integer n',
      outputFormat: 'List of strings',
      keywords: ['generate all', 'combinations', 'well-formed', 'parentheses'],
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  {
    id: 'combinations',
    title: 'Combinations',
    description:
      'Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].',
    examples: [
      {
        input: 'n = 4, k = 2',
        output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]',
      },
    ],
    constraints: ['1 ≤ n ≤ 20', '1 ≤ k ≤ n'],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Recursion', 'Math', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 20 allows backtracking',
      inputFormat: 'Two integers n, k',
      outputFormat: 'List of lists',
      keywords: ['combinations', 'all possible', 'chosen from range'],
      bigO: 'N ≤ 25 → Target: O(2^N). Backtracking generates all combinations.',
      pattern:
        'Output Format: List of Lists → Backtracking. Build combinations recursively, backtrack when size equals K.',
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  {
    id: 'subsets',
    title: 'Subsets',
    description:
      'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.',
    examples: [
      {
        input: 'nums = [1,2,3]',
        output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10',
      '-10 ≤ nums[i] ≤ 10',
      'All the numbers of nums are unique',
    ],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Bit Manipulation', 'Recursion', 'Dynamic Programming'],
    hints: {
      constraints: 'n ≤ 10 allows backtracking or bitmask',
      inputFormat: 'Array of unique integers',
      outputFormat: 'List of lists (power set)',
      keywords: ['subsets', 'power set', 'all possible'],
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  {
    id: 'permutations',
    title: 'Permutations',
    description:
      'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [1,2,3]',
        output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 6', '-10 ≤ nums[i] ≤ 10', 'All integers of nums are unique'],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Recursion', 'Heap Algorithm', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 6 allows backtracking',
      inputFormat: 'Array of distinct integers',
      outputFormat: 'List of lists (permutations)',
      keywords: ['permutations', 'all possible', 'distinct'],
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  {
    id: 'word-search',
    title: 'Word Search',
    description:
      'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.',
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: 'true',
      },
    ],
    constraints: [
      'm == board.length',
      'n = board[i].length',
      '1 ≤ m, n ≤ 6',
      '1 ≤ word.length ≤ 15',
      'board and word consists of only lowercase and uppercase English letters',
    ],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'DFS', 'Matrix', 'Recursion'],
    hints: {
      constraints: 'm, n ≤ 6 allows backtracking',
      inputFormat: '2D grid, string word',
      outputFormat: 'Boolean',
      keywords: ['word search', 'adjacent cells', 'sequentially'],
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  {
    id: 'n-queens',
    title: 'N-Queens',
    description:
      'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle.',
    examples: [
      {
        input: 'n = 4',
        output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
      },
    ],
    constraints: ['1 ≤ n ≤ 9'],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Recursion', 'Bit Manipulation', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 9 allows backtracking',
      inputFormat: 'Integer n',
      outputFormat: 'List of lists (solutions)',
      keywords: ['n-queens', 'no two attack', 'all distinct solutions'],
      bigO: 'N ≤ 12 → Target: O(N!). Backtracking tries all valid queen placements.',
      pattern:
        'Output Format: List of Lists → Backtracking. Place queens row by row, backtrack on conflicts.',
    },
    difficulty: 'hard',
    category: 'Backtracking',
  },
  {
    id: 'sudoku-solver',
    title: 'Sudoku Solver',
    description:
      'Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row. Each of the digits 1-9 must occur exactly once in each column. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.',
    examples: [
      {
        input:
          'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: 'Solved board',
      },
    ],
    constraints: [
      'board.length == 9',
      'board[i].length == 9',
      'board[i][j] is a digit or "."',
      'It is guaranteed that the input board has only one solution',
    ],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Recursion', 'Hash Map', 'Brute Force'],
    hints: {
      constraints: '9x9 board allows backtracking',
      inputFormat: '9x9 grid',
      outputFormat: 'Solved board',
      keywords: ['sudoku', 'solve', 'fill empty cells', 'exactly once'],
    },
    difficulty: 'hard',
    category: 'Backtracking',
  },
  {
    id: 'combination-sum',
    title: 'Combination Sum',
    description:
      'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.',
    examples: [
      {
        input: 'candidates = [2,3,6,7], target = 7',
        output: '[[2,2,3],[7]]',
        explanation:
          '2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.',
      },
    ],
    constraints: [
      '1 ≤ candidates.length ≤ 30',
      '2 ≤ candidates[i] ≤ 40',
      'All elements of candidates are distinct',
      '1 ≤ target ≤ 500',
    ],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Recursion', 'Dynamic Programming', 'Greedy'],
    hints: {
      constraints: 'target ≤ 500 allows backtracking',
      inputFormat: 'Array of distinct integers, target',
      outputFormat: 'List of lists (combinations)',
      keywords: ['combinations', 'sum to target', 'can be used multiple times'],
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  {
    id: 'letter-combinations',
    title: 'Letter Combinations of a Phone Number',
    description:
      'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.',
    examples: [
      {
        input: 'digits = "23"',
        output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
      },
    ],
    constraints: ['0 ≤ digits.length ≤ 4', 'digits[i] is a digit in the range ["2", "9"]'],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Recursion', 'Queue', 'String'],
    hints: {
      constraints: 'length ≤ 4 allows backtracking',
      inputFormat: 'String of digits',
      outputFormat: 'List of strings',
      keywords: ['letter combinations', 'phone number', 'all possible'],
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  {
    id: 'restore-ip',
    title: 'Restore IP Addresses',
    description:
      'A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros. Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s.',
    examples: [
      {
        input: 's = "25525511135"',
        output: '["255.255.11.135","255.255.111.35"]',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 20', 's consists of digits only'],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Recursion', 'String', 'Brute Force'],
    hints: {
      constraints: 'length ≤ 20 allows backtracking',
      inputFormat: 'String of digits',
      outputFormat: 'List of strings (IP addresses)',
      keywords: ['IP addresses', 'four integers', 'inserting dots'],
      bigO: 'N ≤ 25 → Target: O(2^N). Backtracking tries all valid IP segmentations.',
      pattern:
        'Output Format: List of Lists → Backtracking. Build IP segments recursively, validate each segment (0-255, no leading zeros).',
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  // Batch 5: Dynamic Programming (15 problems)
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    description:
      'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps',
      },
    ],
    constraints: ['1 ≤ n ≤ 45'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Math', 'Memoization', 'Recursion'],
    hints: {
      constraints: 'n ≤ 45 suggests DP',
      inputFormat: 'Integer n',
      outputFormat: 'Single number (number of ways)',
      keywords: ['number of ways', 'distinct ways', 'climb stairs'],
    },
    difficulty: 'easy',
    category: 'Dynamic Programming',
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    description:
      'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
    examples: [
      {
        input: 'nums = [2,7,9,3,1]',
        output: '12',
        explanation:
          'Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 100', '0 ≤ nums[i] ≤ 400'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Greedy', 'Array', 'Memoization'],
    hints: {
      constraints: 'n ≤ 100 suggests DP',
      inputFormat: 'Array of money amounts',
      outputFormat: 'Single number (max money)',
      keywords: ['maximum', 'rob', 'adjacent', 'cannot rob'],
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'unique-paths',
    title: 'Unique Paths',
    description:
      'There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.',
    examples: [
      {
        input: 'm = 3, n = 7',
        output: '28',
      },
    ],
    constraints: ['1 ≤ m, n ≤ 100'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Math', 'Combinatorics', 'Memoization'],
    hints: {
      constraints: 'm, n ≤ 100 suggests DP',
      inputFormat: 'Two integers m, n',
      outputFormat: 'Single number (number of paths)',
      keywords: ['unique paths', 'number of ways', 'move down or right'],
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    description:
      'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
    examples: [
      {
        input: 'nums = [10,9,2,5,3,7,101,18]',
        output: '4',
        explanation: 'The longest increasing subsequence is [2,3,7,18], therefore the length is 4.',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 2500', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Binary Search', 'Greedy', 'Array'],
    hints: {
      constraints: 'n ≤ 2500 suggests DP',
      inputFormat: 'Array of integers',
      outputFormat: 'Single number (length)',
      keywords: ['longest', 'increasing', 'subsequence'],
      bigO: 'N ≤ 5,000 → Target: O(N²). DP tracks longest increasing subsequence ending at each index.',
      pattern:
        'Keywords: "Longest", "Optimal" → Dynamic Programming. dp[i] = length of LIS ending at index i.',
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'word-break',
    title: 'Word Break',
    description:
      'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.',
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet","code"]',
        output: 'true',
        explanation: 'Return true because "leetcode" can be segmented as "leet code".',
      },
    ],
    constraints: [
      '1 ≤ s.length ≤ 300',
      '1 ≤ wordDict.length ≤ 1000',
      '1 ≤ wordDict[i].length ≤ 20',
      's and wordDict[i] consist of only lowercase English letters',
      'All the strings of wordDict are unique',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Trie', 'Hash Map', 'Backtracking'],
    hints: {
      constraints: 's.length ≤ 300 suggests DP',
      inputFormat: 'String, dictionary',
      outputFormat: 'Boolean',
      keywords: ['word break', 'segmented', 'dictionary words'],
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'palindrome-partitioning',
    title: 'Palindrome Partitioning',
    description:
      'Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.',
    examples: [
      {
        input: 's = "aab"',
        output: '[["a","a","b"],["aa","b"]]',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 16', 's contains only lowercase English letters'],
    correctPattern: 'Backtracking',
    patterns: ['Backtracking', 'Dynamic Programming', 'String', 'Recursion'],
    hints: {
      constraints: 'length ≤ 16 allows backtracking',
      inputFormat: 'String',
      outputFormat: 'List of lists',
      keywords: ['palindrome partitioning', 'every substring', 'all possible'],
    },
    difficulty: 'medium',
    category: 'Backtracking',
  },
  {
    id: 'edit-distance',
    title: 'Edit Distance',
    description:
      'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.',
    examples: [
      {
        input: 'word1 = "horse", word2 = "ros"',
        output: '3',
        explanation: 'horse -> rorse -> rose -> ros',
      },
    ],
    constraints: [
      '0 ≤ word1.length, word2.length ≤ 500',
      'word1 and word2 consist of lowercase English letters',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'String', 'Memoization', 'Recursion'],
    hints: {
      constraints: 'length ≤ 500 suggests DP',
      inputFormat: 'Two strings',
      outputFormat: 'Single number (minimum operations)',
      keywords: ['minimum', 'operations', 'convert', 'insert/delete/replace'],
    },
    difficulty: 'hard',
    category: 'Dynamic Programming',
  },
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    description:
      'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.',
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: '3',
        explanation: 'The longest common subsequence is "ace" and its length is 3.',
      },
    ],
    constraints: [
      '1 ≤ text1.length, text2.length ≤ 1000',
      'text1 and text2 consist of only lowercase English characters',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'String', 'Memoization', 'Recursion'],
    hints: {
      constraints: 'length ≤ 1000 suggests DP',
      inputFormat: 'Two strings',
      outputFormat: 'Single number (length)',
      keywords: ['longest', 'common', 'subsequence'],
      bigO: 'N ≤ 5,000 → Target: O(N²). DP with 2D state: dp[i][j] = LCS of text1[0..i] and text2[0..j].',
      pattern:
        'Keywords: "Longest", "Common", "Optimal" → Dynamic Programming. Match characters or skip one.',
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'partition-equal-subset',
    title: 'Partition Equal Subset Sum',
    description:
      'Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.',
    examples: [
      {
        input: 'nums = [1,5,11,5]',
        output: 'true',
        explanation: 'The array can be partitioned as [1, 5, 5] and [11].',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 200', '1 ≤ nums[i] ≤ 100'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Backtracking', 'Array', 'Memoization'],
    hints: {
      constraints: 'n ≤ 200 suggests DP',
      inputFormat: 'Array of positive integers',
      outputFormat: 'Boolean',
      keywords: ['partition', 'equal subset sum', 'two subsets'],
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'coin-change-2',
    title: 'Coin Change 2',
    description:
      'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.',
    examples: [
      {
        input: 'amount = 5, coins = [1,2,5]',
        output: '4',
        explanation:
          'There are four ways to make up the amount: 5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1',
      },
    ],
    constraints: [
      '1 ≤ coins.length ≤ 300',
      '1 ≤ coins[i] ≤ 5000',
      'All the values of coins are unique',
      '0 ≤ amount ≤ 5000',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Backtracking', 'Array', 'Memoization'],
    hints: {
      constraints: 'amount ≤ 5000 suggests DP',
      inputFormat: 'Array of coins, amount',
      outputFormat: 'Single number (number of combinations)',
      keywords: ['number of combinations', 'make up amount', 'coins'],
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'burst-balloons',
    title: 'Burst Balloons',
    description:
      'You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. Return the maximum coins you can collect by bursting the balloons wisely.',
    examples: [
      {
        input: 'nums = [3,1,5,8]',
        output: '167',
        explanation:
          'nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> [], coins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167',
      },
    ],
    constraints: ['n == nums.length', '1 ≤ n ≤ 300', '0 ≤ nums[i] ≤ 100'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Divide and Conquer', 'Memoization', 'Recursion'],
    hints: {
      constraints: 'n ≤ 300 suggests DP',
      inputFormat: 'Array of balloon values',
      outputFormat: 'Single number (max coins)',
      keywords: ['maximum', 'burst balloons', 'coins'],
    },
    difficulty: 'hard',
    category: 'Dynamic Programming',
  },
  {
    id: 'regular-expression',
    title: 'Regular Expression Matching',
    description:
      'Given an input string s and a pattern p, implement regular expression matching with support for "." and "*" where "." matches any single character and "*" matches zero or more of the preceding element.',
    examples: [
      {
        input: 's = "aa", p = "a*"',
        output: 'true',
        explanation:
          '"*" means zero or more of the preceding element, "a". Therefore, by repeating "a" once, it becomes "aa".',
      },
    ],
    constraints: [
      '1 ≤ s.length ≤ 20',
      '1 ≤ p.length ≤ 30',
      's contains only lowercase English letters',
      'p contains only lowercase English letters, ".", and "*"',
      'It is guaranteed for each appearance of the character "*", there will be a previous valid character to match',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'String', 'Recursion', 'Memoization'],
    hints: {
      constraints: 's.length ≤ 20 suggests DP',
      inputFormat: 'String s, pattern p',
      outputFormat: 'Boolean',
      keywords: ['regular expression', 'matching', '".*" patterns'],
    },
    difficulty: 'hard',
    category: 'Dynamic Programming',
  },
  {
    id: 'wildcard-matching',
    title: 'Wildcard Matching',
    description:
      'Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for "?" and "*" where "?" matches any single character and "*" matches any sequence of characters (including the empty sequence).',
    examples: [
      {
        input: 's = "aa", p = "*"',
        output: 'true',
        explanation: '"*" matches any sequence.',
      },
    ],
    constraints: [
      '0 ≤ s.length, p.length ≤ 2000',
      's contains only lowercase English letters',
      'p contains only lowercase English letters, "?" or "*"',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'String', 'Greedy', 'Memoization'],
    hints: {
      constraints: 'length ≤ 2000 suggests DP',
      inputFormat: 'String s, pattern p',
      outputFormat: 'Boolean',
      keywords: ['wildcard matching', '"?" and "*"', 'any sequence'],
    },
    difficulty: 'hard',
    category: 'Dynamic Programming',
  },
  {
    id: 'decode-ways',
    title: 'Decode Ways',
    description:
      'A message containing letters from A-Z can be encoded into numbers using the following mapping: "A" -> "1", "B" -> "2", ..., "Z" -> "26". Given a string s containing only digits, return the number of ways to decode it.',
    examples: [
      {
        input: 's = "12"',
        output: '2',
        explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 100', 's contains only digits and may contain leading zero(s)'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'String', 'Memoization', 'Recursion'],
    hints: {
      constraints: 'length ≤ 100 suggests DP',
      inputFormat: 'String of digits',
      outputFormat: 'Single number (number of ways)',
      keywords: ['decode', 'number of ways', 'A-Z mapping'],
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  {
    id: 'min-path-sum',
    title: 'Minimum Path Sum',
    description:
      'Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. You can only move either down or right at any point in time.',
    examples: [
      {
        input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]',
        output: '7',
        explanation: 'Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.',
      },
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 ≤ m, n ≤ 200',
      '0 ≤ grid[i][j] ≤ 100',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Matrix', 'Greedy', 'Memoization'],
    hints: {
      constraints: 'm, n ≤ 200 suggests DP',
      inputFormat: '2D grid',
      outputFormat: 'Single number (minimum sum)',
      keywords: ['minimum', 'path sum', 'top left to bottom right'],
    },
    difficulty: 'medium',
    category: 'Dynamic Programming',
  },
  // Batch 6: Heap & Priority Queue (10 problems)
  {
    id: 'merge-k-sorted',
    title: 'Merge k Sorted Lists',
    description:
      'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
      },
    ],
    constraints: [
      'k == lists.length',
      '0 ≤ k ≤ 10⁴',
      '0 ≤ lists[i].length ≤ 500',
      '-10⁴ ≤ lists[i][j] ≤ 10⁴',
      'lists[i] is sorted in ascending order',
    ],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Divide and Conquer', 'Merge Sort', 'Linked List'],
    hints: {
      constraints: 'k ≤ 10⁴ suggests heap',
      inputFormat: 'Array of sorted linked lists',
      outputFormat: 'Merged sorted linked list',
      keywords: ['merge k sorted', 'linked lists', 'sorted'],
    },
    difficulty: 'hard',
    category: 'Heap',
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    description:
      'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
    examples: [
      {
        input: 'nums = [1,1,1,2,2,3], k = 2',
        output: '[1,2]',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      'k is in the range [1, the number of unique elements in the array]',
      'It is guaranteed that the answer is unique',
    ],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Hash Map', 'Sorting', 'Bucket Sort'],
    hints: {
      constraints: 'n ≤ 10⁵ suggests heap',
      inputFormat: 'Array of integers, integer k',
      outputFormat: 'Array of k elements',
      keywords: ['top k', 'frequent', 'most frequent'],
    },
    difficulty: 'medium',
    category: 'Heap',
  },
  {
    id: 'find-median',
    title: 'Find Median from Data Stream',
    description:
      'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values. Implement the MedianFinder class.',
    examples: [
      {
        input:
          'MedianFinder() -> addNum(1) -> addNum(2) -> findMedian() -> 1.5 -> addNum(3) -> findMedian() -> 2',
        output: 'null, null, null, 1.5, null, 2',
      },
    ],
    constraints: [
      '-10⁵ ≤ num ≤ 10⁵',
      'There will be at least one element in the data structure before calling findMedian',
      'At most 5 * 10⁴ calls will be made to addNum and findMedian',
    ],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Sorting', 'Two Heaps', 'Array'],
    hints: {
      constraints: '5 * 10⁴ calls suggests heap',
      inputFormat: 'Stream of numbers',
      outputFormat: 'Median (double)',
      keywords: ['median', 'data stream', 'middle value'],
    },
    difficulty: 'hard',
    category: 'Heap',
  },
  {
    id: 'k-closest-points',
    title: 'K Closest Points to Origin',
    description:
      'Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).',
    examples: [
      {
        input: 'points = [[1,3],[-2,2]], k = 1',
        output: '[[-2,2]]',
        explanation: 'The distance between (-2, 2) and the origin is sqrt(8).',
      },
    ],
    constraints: ['1 ≤ k ≤ points.length ≤ 10⁴', '-10⁴ < xi, yi < 10⁴'],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Sorting', 'Divide and Conquer', 'Math'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests heap',
      inputFormat: 'Array of points, integer k',
      outputFormat: 'Array of k points',
      keywords: ['k closest', 'points', 'origin', 'distance'],
      bigO: 'N ≤ 10⁶ → Target: O(N log K). Max heap of size K maintains K closest points.',
      pattern:
        'Keywords: "K closest", "Top K" → Heap / Priority Queue. Max heap keeps K smallest distances.',
    },
    difficulty: 'medium',
    category: 'Heap',
  },
  {
    id: 'reorganize-string',
    title: 'Reorganize String',
    description:
      'Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement of s or return "" if not possible.',
    examples: [
      {
        input: 's = "aab"',
        output: '"aba"',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 500', 's consists of lowercase English letters'],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Greedy', 'Hash Map', 'String'],
    hints: {
      constraints: 'n ≤ 500 suggests heap',
      inputFormat: 'String',
      outputFormat: 'String or empty',
      keywords: ['reorganize', 'adjacent not same', 'rearrange'],
    },
    difficulty: 'medium',
    category: 'Heap',
  },
  {
    id: 'task-scheduler',
    title: 'Task Scheduler',
    description:
      "You are given an array of CPU tasks, each represented by letters A to Z, and a cooling time n. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least n intervals due to cooling time. Return the minimum number of intervals required to complete all tasks.",
    examples: [
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 2',
        output: '8',
        explanation: 'A -> B -> idle -> A -> B -> idle -> A -> B',
      },
    ],
    constraints: ['1 ≤ tasks.length ≤ 10⁴', '0 ≤ n ≤ 100', 'tasks[i] is upper-case English letter'],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Greedy', 'Hash Map', 'Math'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests heap',
      inputFormat: 'Array of tasks, cooling time n',
      outputFormat: 'Single number (intervals)',
      keywords: ['task scheduler', 'cooling time', 'minimum intervals'],
    },
    difficulty: 'medium',
    category: 'Heap',
  },
  {
    id: 'furthest-building',
    title: 'Furthest Building You Can Reach',
    description:
      'You are given an integer array heights representing the heights of buildings, some bricks, and some ladders. You start your journey from building 0 and move to the next building by possibly using bricks or ladders. Return the furthest building index (0-indexed) you can reach.',
    examples: [
      {
        input: 'heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1',
        output: '4',
        explanation:
          'Starting at building 0, you can follow these steps: - Go to building 1 without using ladders nor bricks since 4 >= 2. - Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7. - Go to building 3 without using ladders nor bricks since 7 >= 6. - Go to building 4 using your only ladder. You must use ladders because 6 < 9.',
      },
    ],
    constraints: [
      '1 ≤ heights.length ≤ 10⁵',
      '1 ≤ heights[i] ≤ 10⁶',
      '0 ≤ bricks ≤ 10⁹',
      '0 ≤ ladders ≤ heights.length',
    ],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Greedy', 'Binary Search', 'Array'],
    hints: {
      constraints: 'n ≤ 10⁵ suggests heap',
      inputFormat: 'Array of heights, bricks, ladders',
      outputFormat: 'Single number (furthest index)',
      keywords: ['furthest building', 'bricks', 'ladders', 'reach'],
    },
    difficulty: 'medium',
    category: 'Heap',
  },
  {
    id: 'kth-largest-stream',
    title: 'Kth Largest Element in a Stream',
    description:
      'Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
    examples: [
      {
        input: 'KthLargest(3, [4,5,8,2]) -> add(3) -> add(5) -> add(10) -> add(9) -> add(4)',
        output: 'null, 4, 5, 5, 8, 8',
      },
    ],
    constraints: [
      '1 ≤ k ≤ 10⁴',
      '0 ≤ nums.length ≤ 10⁴',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
      '-10⁴ ≤ val ≤ 10⁴',
      'At most 10⁴ calls will be made to add',
    ],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Sorting', 'Array', 'Binary Search'],
    hints: {
      constraints: '10⁴ calls suggests heap',
      inputFormat: 'Stream of numbers',
      outputFormat: 'Kth largest element',
      keywords: ['kth largest', 'stream', 'data stream'],
    },
    difficulty: 'easy',
    category: 'Heap',
  },
  {
    id: 'last-stone-weight',
    title: 'Last Stone Weight',
    description:
      'You are given an array of integers stones where stones[i] is the weight of the ith stone. We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Return the smallest possible weight of the left stone. If there are no stones left, return 0.',
    examples: [
      {
        input: 'stones = [2,7,4,1,8,1]',
        output: '1',
        explanation:
          "We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then we combine 2 and 1 to get 1 so the array converts to [1,1,1] then we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of last stone.",
      },
    ],
    constraints: ['1 ≤ stones.length ≤ 30', '1 ≤ stones[i] ≤ 1000'],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Sorting', 'Simulation', 'Array'],
    hints: {
      constraints: 'n ≤ 30 suggests heap',
      inputFormat: 'Array of stone weights',
      outputFormat: 'Single number (last stone weight)',
      keywords: ['last stone', 'heaviest two', 'smash together'],
    },
    difficulty: 'easy',
    category: 'Heap',
  },
  {
    id: 'minimum-cost-ropes',
    title: 'Minimum Cost to Connect Sticks',
    description:
      'You have some number of sticks with positive integer lengths. These lengths are given as an array sticks, where sticks[i] is the length of the ith stick. You can connect any two sticks of lengths x and y into one stick by paying a cost of x + y. Return the minimum cost to connect all the given sticks into one stick.',
    examples: [
      {
        input: 'sticks = [2,4,3]',
        output: '14',
        explanation:
          'You start with sticks = [2,4,3]. 1. Combine sticks 2 and 3 for a cost of 2 + 3 = 5. Now you have sticks = [5,4]. 2. Combine sticks 5 and 4 for a cost of 5 + 4 = 9. Now you have sticks = [9]. There is only one stick left, so you are done. The total cost is 5 + 9 = 14.',
      },
    ],
    constraints: ['1 ≤ sticks.length ≤ 10⁴', '1 ≤ sticks[i] ≤ 10⁴'],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Greedy', 'Sorting', 'Array'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests heap',
      inputFormat: 'Array of stick lengths',
      outputFormat: 'Single number (minimum cost)',
      keywords: ['minimum cost', 'connect sticks', 'greedy'],
    },
    difficulty: 'medium',
    category: 'Heap',
  },
  // Batch 7: Stack & Monotonic Stack (10 problems)
  {
    id: 'daily-temperatures',
    title: 'Daily Temperatures',
    description:
      'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.',
    examples: [
      {
        input: 'temperatures = [73,74,75,71,69,72,76,73]',
        output: '[1,1,4,2,1,1,0,0]',
      },
    ],
    constraints: ['1 ≤ temperatures.length ≤ 10⁵', '30 ≤ temperatures[i] ≤ 100'],
    correctPattern: 'Monotonic Stack',
    patterns: ['Monotonic Stack', 'Stack', 'Array', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 10⁵ requires efficient solution',
      inputFormat: 'Array of temperatures',
      outputFormat: 'Array of days to wait',
      keywords: ['next greater', 'warmer temperature', 'days to wait'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Monotonic Stack processes each element once.',
      pattern:
        'Keywords: "Next greater element" → Monotonic Stack. Maintain decreasing stack, pop when current > stack top.',
    },
    difficulty: 'medium',
    category: 'Stack',
  },
  {
    id: 'next-greater-element',
    title: 'Next Greater Element I',
    description:
      'The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2. For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.',
    examples: [
      {
        input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]',
        output: '[-1,3,-1]',
        explanation:
          'The next greater element for each value of nums1 is as follows: - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1. - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3. - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.',
      },
    ],
    constraints: [
      '1 ≤ nums1.length ≤ nums2.length ≤ 1000',
      '0 ≤ nums1[i], nums2[i] ≤ 10⁴',
      'All integers in nums1 and nums2 are unique',
      'All the integers of nums1 also appear in nums2',
    ],
    correctPattern: 'Monotonic Stack',
    patterns: ['Monotonic Stack', 'Stack', 'Hash Map', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 1000 suggests stack',
      inputFormat: 'Two arrays',
      outputFormat: 'Array of next greater elements',
      keywords: ['next greater element', 'first greater', 'to the right'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Monotonic Stack finds next greater in one pass.',
      pattern:
        'Keywords: "Next greater element" → Monotonic Stack. Build next greater map for nums2, then lookup for nums1.',
    },
    difficulty: 'easy',
    category: 'Stack',
  },
  {
    id: 'largest-rectangle',
    title: 'Largest Rectangle in Histogram',
    description:
      "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    examples: [
      {
        input: 'heights = [2,1,5,6,2,3]',
        output: '10',
        explanation:
          'The above is a histogram where width of each bar is 1. The largest rectangle is shown in the red area, which has an area = 10 units.',
      },
    ],
    constraints: ['1 ≤ heights.length ≤ 10⁵', '0 ≤ heights[i] ≤ 10⁴'],
    correctPattern: 'Monotonic Stack',
    patterns: ['Monotonic Stack', 'Stack', 'Divide and Conquer', 'Array'],
    hints: {
      constraints: 'n ≤ 10⁵ requires efficient solution',
      inputFormat: 'Array of heights',
      outputFormat: 'Single number (area)',
      keywords: ['largest rectangle', 'histogram', 'area'],
    },
    difficulty: 'hard',
    category: 'Stack',
  },
  {
    id: 'trapping-rain-water-stack',
    title: 'Trapping Rain Water (Stack)',
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
      },
    ],
    constraints: ['n == height.length', '1 ≤ n ≤ 2 * 10⁴', '0 ≤ height[i] ≤ 10⁵'],
    correctPattern: 'Stack',
    patterns: ['Stack', 'Two Pointers', 'Dynamic Programming', 'Monotonic Stack'],
    hints: {
      constraints: 'n ≤ 2 * 10⁴ allows stack solution',
      inputFormat: 'Array of heights',
      outputFormat: 'Single number (water trapped)',
      keywords: ['trapping', 'water', 'elevation', 'bars'],
    },
    difficulty: 'hard',
    category: 'Stack',
  },
  {
    id: 'remove-k-digits',
    title: 'Remove K Digits',
    description:
      'Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.',
    examples: [
      {
        input: 'num = "1432219", k = 3',
        output: '"1219"',
        explanation:
          'Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.',
      },
    ],
    constraints: [
      '1 ≤ k ≤ num.length ≤ 10⁵',
      'num consists of only digits',
      'num does not have any leading zeros except for the zero itself',
    ],
    correctPattern: 'Stack',
    patterns: ['Stack', 'Greedy', 'String', 'Monotonic Stack'],
    hints: {
      constraints: 'n ≤ 10⁵ requires efficient solution',
      inputFormat: 'String num, integer k',
      outputFormat: 'String (smallest number)',
      keywords: ['remove k digits', 'smallest', 'greedy'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Monotonic Stack removes digits greedily.',
      pattern:
        'Keywords: "Minimum operations" → Greedy + Stack. Remove larger digits from left while maintaining order.',
    },
    difficulty: 'medium',
    category: 'Stack',
  },
  {
    id: 'decode-string',
    title: 'Decode String',
    description:
      'Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.',
    examples: [
      {
        input: 's = "3[a]2[bc]"',
        output: '"aaabcbc"',
      },
    ],
    constraints: [
      '1 ≤ s.length ≤ 30',
      's consists of lowercase English letters, digits, and square brackets "[]"',
      's is a valid expression',
      'All the integers in s are in the range [1, 300]',
    ],
    correctPattern: 'Stack',
    patterns: ['Stack', 'Recursion', 'String', 'DFS'],
    hints: {
      constraints: 'length ≤ 30 allows stack',
      inputFormat: 'Encoded string',
      outputFormat: 'Decoded string',
      keywords: ['decode', 'nested brackets', 'repeated'],
    },
    difficulty: 'medium',
    category: 'Stack',
  },
  {
    id: 'basic-calculator',
    title: 'Basic Calculator',
    description:
      'Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.',
    examples: [
      {
        input: 's = "1 + 1"',
        output: '2',
      },
    ],
    constraints: [
      '1 ≤ s.length ≤ 3 * 10⁵',
      's consists of digits, "+", "-", "(", ")", and " "',
      's represents a valid expression',
      '"+", "-" are not used as unary operators',
    ],
    correctPattern: 'Stack',
    patterns: ['Stack', 'String', 'Math', 'Recursion'],
    hints: {
      constraints: 'length ≤ 3 * 10⁵ requires efficient solution',
      inputFormat: 'String expression',
      outputFormat: 'Integer result',
      keywords: ['calculator', 'evaluate', 'parentheses', 'plus/minus'],
    },
    difficulty: 'hard',
    category: 'Stack',
  },
  {
    id: 'asteroid-collision',
    title: 'Asteroid Collision',
    description:
      'We are given an array asteroids of integers representing asteroids in a row. For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed. Find out the state of the asteroids after all collisions.',
    examples: [
      {
        input: 'asteroids = [5,10,-5]',
        output: '[5,10]',
        explanation: 'The 10 and -5 collide resulting in 10. The 5 and 10 never collide.',
      },
    ],
    constraints: ['2 ≤ asteroids.length ≤ 10⁴', '-1000 ≤ asteroids[i] ≤ 1000', 'asteroids[i] != 0'],
    correctPattern: 'Stack',
    patterns: ['Stack', 'Array', 'Simulation', 'Greedy'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests stack',
      inputFormat: 'Array of asteroids',
      outputFormat: 'Array after collisions',
      keywords: ['asteroid collision', 'opposite directions', 'simulation'],
    },
    difficulty: 'medium',
    category: 'Stack',
  },
  {
    id: 'online-stock-span',
    title: 'Online Stock Span',
    description:
      "Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day. The span of the stock's price today is defined as the maximum number of consecutive days (starting from today and going backward) for which the stock price was less than or equal to today's price.",
    examples: [
      {
        input:
          'StockSpanner() -> next(100) -> next(80) -> next(60) -> next(70) -> next(60) -> next(75) -> next(85)',
        output: 'null, 1, 1, 1, 2, 1, 4, 6',
      },
    ],
    constraints: ['1 ≤ price ≤ 10⁵', 'At most 10⁴ calls will be made to next'],
    correctPattern: 'Monotonic Stack',
    patterns: ['Monotonic Stack', 'Stack', 'Array', 'Dynamic Programming'],
    hints: {
      constraints: '10⁴ calls suggests stack',
      inputFormat: 'Stream of prices',
      outputFormat: 'Span (integer)',
      keywords: ['stock span', 'consecutive days', 'less than or equal'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Monotonic Stack tracks decreasing prices.',
      pattern:
        'Keywords: "Consecutive", "Less than or equal" → Monotonic Stack. Store (price, span) pairs, pop smaller prices.',
    },
    difficulty: 'medium',
    category: 'Stack',
  },
  {
    id: 'next-greater-element-2',
    title: 'Next Greater Element II',
    description:
      'Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.',
    examples: [
      {
        input: 'nums = [1,2,1]',
        output: '[2,-1,2]',
        explanation:
          "The first 1's next greater number is 2; The number 2 can't find next greater number; The second 1's next greater number needs to search circularly, which is also 2.",
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
    correctPattern: 'Monotonic Stack',
    patterns: ['Monotonic Stack', 'Stack', 'Array', 'Circular Array'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests stack',
      inputFormat: 'Circular array',
      outputFormat: 'Array of next greater elements',
      keywords: ['next greater', 'circular array', 'wrap around'],
    },
    difficulty: 'medium',
    category: 'Stack',
  },
  // Batch 8: Tree & DFS/BFS (15 problems)
  {
    id: 'max-depth-tree',
    title: 'Maximum Depth of Binary Tree',
    description:
      "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10⁴]',
      '-100 ≤ Node.val ≤ 100',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'BFS', 'Tree', 'Recursion'],
    hints: {
      constraints: 'nodes ≤ 10⁴ allows DFS/BFS',
      inputFormat: 'Binary tree root',
      outputFormat: 'Single number (depth)',
      keywords: ['maximum depth', 'binary tree', 'longest path'],
    },
    difficulty: 'easy',
    category: 'Tree',
  },
  {
    id: 'same-tree',
    title: 'Same Tree',
    description:
      'Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
    examples: [
      {
        input: 'p = [1,2,3], q = [1,2,3]',
        output: 'true',
      },
    ],
    constraints: [
      'The number of nodes in both trees is in the range [0, 100]',
      '-10⁴ ≤ Node.val ≤ 10⁴',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Tree', 'Recursion', 'BFS'],
    hints: {
      constraints: 'nodes ≤ 100 allows DFS',
      inputFormat: 'Two binary tree roots',
      outputFormat: 'Boolean',
      keywords: ['same tree', 'structurally identical', 'same value'],
    },
    difficulty: 'easy',
    category: 'Tree',
  },
  {
    id: 'invert-tree',
    title: 'Invert Binary Tree',
    description: 'Given the root of a binary tree, invert the tree, and return its root.',
    examples: [
      {
        input: 'root = [4,2,7,1,3,6,9]',
        output: '[4,7,2,9,6,3,1]',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100]',
      '-100 ≤ Node.val ≤ 100',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Tree', 'Recursion', 'BFS'],
    hints: {
      constraints: 'nodes ≤ 100 allows DFS',
      inputFormat: 'Binary tree root',
      outputFormat: 'Inverted tree root',
      keywords: ['invert', 'binary tree', 'swap children'],
      bigO: 'N ≤ 10⁶ → Target: O(N). DFS visits each node once.',
      pattern: 'Input-Based Strategy: Tree → DFS. Swap left and right children recursively.',
    },
    difficulty: 'easy',
    category: 'Tree',
  },
  {
    id: 'level-order',
    title: 'Binary Tree Level Order Traversal',
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000]',
      '-1000 ≤ Node.val ≤ 1000',
    ],
    correctPattern: 'BFS',
    patterns: ['BFS', 'Queue', 'Tree', 'DFS'],
    hints: {
      constraints: 'nodes ≤ 2000 allows BFS',
      inputFormat: 'Binary tree root',
      outputFormat: 'List of lists (levels)',
      keywords: ['level order', 'level by level', 'breadth first'],
    },
    difficulty: 'medium',
    category: 'Tree',
  },
  {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    description:
      'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    examples: [
      {
        input: 'root = [2,1,3]',
        output: 'true',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10⁴]',
      '-2³¹ ≤ Node.val ≤ 2³¹ - 1',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Tree', 'Recursion', 'Inorder Traversal'],
    hints: {
      constraints: 'nodes ≤ 10⁴ allows DFS',
      inputFormat: 'Binary tree root',
      outputFormat: 'Boolean',
      keywords: ['validate', 'BST', 'binary search tree', 'valid'],
    },
    difficulty: 'medium',
    category: 'Tree',
  },
  {
    id: 'kth-smallest-bst',
    title: 'Kth Smallest Element in a BST',
    description:
      'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
    examples: [
      {
        input: 'root = [3,1,4,null,2], k = 1',
        output: '1',
      },
    ],
    constraints: ['The number of nodes in the tree is n', '1 ≤ k ≤ n ≤ 10⁴', '0 ≤ Node.val ≤ 10⁴'],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Tree', 'Inorder Traversal', 'Stack'],
    hints: {
      constraints: 'n ≤ 10⁴ allows DFS',
      inputFormat: 'BST root, integer k',
      outputFormat: 'Single number (kth smallest)',
      keywords: ['kth smallest', 'BST', 'inorder'],
    },
    difficulty: 'medium',
    category: 'Tree',
  },
  {
    id: 'lowest-common-ancestor',
    title: 'Lowest Common Ancestor of a Binary Tree',
    description:
      'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.',
    examples: [
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
        output: '3',
        explanation: 'The LCA of nodes 5 and 1 is 3.',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10⁵]',
      '-10⁹ ≤ Node.val ≤ 10⁹',
      'All Node.val are unique',
      'p != q',
      'p and q will exist in the tree',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Tree', 'Recursion', 'Hash Map'],
    hints: {
      constraints: 'nodes ≤ 10⁵ allows DFS',
      inputFormat: 'Binary tree root, two nodes',
      outputFormat: 'Node (LCA)',
      keywords: ['lowest common ancestor', 'LCA', 'two nodes'],
      bigO: 'N ≤ 10⁶ → Target: O(N). DFS finds both nodes and returns their LCA.',
      pattern:
        'Input-Based Strategy: Tree → DFS. Return node if found, null otherwise. LCA is where both subtrees return non-null.',
    },
    difficulty: 'medium',
    category: 'Tree',
  },
  {
    id: 'path-sum',
    title: 'Path Sum',
    description:
      'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
    examples: [
      {
        input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22',
        output: 'true',
        explanation: 'The path is 5 -> 4 -> 11 -> 2.',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000]',
      '-1000 ≤ Node.val ≤ 1000',
      '-1000 ≤ targetSum ≤ 1000',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Tree', 'Recursion', 'Backtracking'],
    hints: {
      constraints: 'nodes ≤ 5000 allows DFS',
      inputFormat: 'Binary tree root, targetSum',
      outputFormat: 'Boolean',
      keywords: ['path sum', 'root to leaf', 'equals target'],
    },
    difficulty: 'easy',
    category: 'Tree',
  },
  {
    id: 'diameter-tree',
    title: 'Diameter of Binary Tree',
    description:
      'Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.',
    examples: [
      {
        input: 'root = [1,2,3,4,5]',
        output: '3',
        explanation: '3 is the length of the path [4,2,1,3] or [5,2,1,3].',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10⁴]',
      '-100 ≤ Node.val ≤ 100',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Tree', 'Recursion', 'Dynamic Programming'],
    hints: {
      constraints: 'nodes ≤ 10⁴ allows DFS',
      inputFormat: 'Binary tree root',
      outputFormat: 'Single number (diameter)',
      keywords: ['diameter', 'longest path', 'between nodes'],
    },
    difficulty: 'easy',
    category: 'Tree',
  },
  {
    id: 'serialize-tree',
    title: 'Serialize and Deserialize Binary Tree',
    description:
      'Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.',
    examples: [
      {
        input: 'root = [1,2,3,null,null,4,5]',
        output: 'Serialized string, then deserialize back to tree',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10⁴]',
      '-1000 ≤ Node.val ≤ 1000',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Tree', 'BFS', 'String'],
    hints: {
      constraints: 'nodes ≤ 10⁴ allows DFS/BFS',
      inputFormat: 'Binary tree root',
      outputFormat: 'String (serialized), then tree (deserialized)',
      keywords: ['serialize', 'deserialize', 'binary tree'],
    },
    difficulty: 'hard',
    category: 'Tree',
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    description:
      'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true',
        explanation:
          'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.',
      },
    ],
    constraints: [
      '1 ≤ numCourses ≤ 2000',
      '0 ≤ prerequisites.length ≤ 5000',
      'prerequisites[i].length == 2',
      '0 ≤ ai, bi < numCourses',
      'All the pairs prerequisites[i] are unique',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Graph', 'Topological Sort', 'BFS'],
    hints: {
      constraints: 'courses ≤ 2000 allows DFS',
      inputFormat: 'Number of courses, prerequisites array',
      outputFormat: 'Boolean',
      keywords: ['course schedule', 'prerequisites', 'cycle detection'],
      bigO: 'N ≤ 5,000 → Target: O(V+E). DFS detects cycles in dependency graph.',
      pattern:
        'Input-Based Strategy: Graph → DFS. Use three-color marking: white (unvisited), gray (visiting), black (visited).',
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'clone-graph',
    title: 'Clone Graph',
    description:
      'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.',
    examples: [
      {
        input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
        output: 'Cloned graph',
      },
    ],
    constraints: [
      'The number of nodes in the graph is in the range [0, 100]',
      '1 ≤ Node.val ≤ 100',
      'Node.val is unique for each node',
      'There are no repeated edges and no self-loops in the graph',
      'The graph is connected and all nodes can be visited starting from the given node',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Graph', 'BFS', 'Hash Map'],
    hints: {
      constraints: 'nodes ≤ 100 allows DFS/BFS',
      inputFormat: 'Graph node',
      outputFormat: 'Cloned graph node',
      keywords: ['clone', 'deep copy', 'graph'],
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    description:
      'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples: [
      {
        input:
          'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1',
      },
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 ≤ m, n ≤ 300',
      'grid[i][j] is "0" or "1"',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'BFS', 'Union-Find', 'Matrix'],
    hints: {
      constraints: 'm, n ≤ 300 allows DFS/BFS',
      inputFormat: '2D grid',
      outputFormat: 'Single number (count)',
      keywords: ['number of islands', 'connected components', 'adjacent'],
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'rotting-oranges',
    title: 'Rotting Oranges',
    description:
      'You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange.',
    examples: [
      {
        input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
        output: '4',
      },
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 ≤ m, n ≤ 10',
      'grid[i][j] is 0, 1, or 2',
    ],
    correctPattern: 'BFS',
    patterns: ['BFS', 'Queue', 'Matrix', 'Multi-source BFS'],
    hints: {
      constraints: 'm, n ≤ 10 allows BFS',
      inputFormat: '2D grid',
      outputFormat: 'Single number (minutes)',
      keywords: ['rotting oranges', 'minimum minutes', '4-directionally adjacent'],
      bigO: 'N ≤ 10⁶ → Target: O(V+E). Multi-source BFS from all rotten oranges.',
      pattern:
        'Input-Based Strategy: 2D Grid → BFS. Start BFS from all rotten oranges simultaneously, track minutes.',
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    description:
      'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter, and every si for 1 <= i <= k is in wordList. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.',
    examples: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '5',
        explanation:
          'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.',
      },
    ],
    constraints: [
      '1 ≤ beginWord.length ≤ 10',
      'endWord.length == beginWord.length',
      '1 ≤ wordList.length ≤ 5000',
      'wordList[i].length == beginWord.length',
      'beginWord, endWord, and wordList[i] consist of lowercase English letters',
      'beginWord != endWord',
      'All the words in wordList are unique',
    ],
    correctPattern: 'BFS',
    patterns: ['BFS', 'Graph', 'Hash Map', 'String'],
    hints: {
      constraints: 'wordList ≤ 5000 allows BFS',
      inputFormat: 'beginWord, endWord, wordList',
      outputFormat: 'Single number (length)',
      keywords: ['word ladder', 'shortest path', 'differs by one letter'],
    },
    difficulty: 'hard',
    category: 'Graph',
  },
  // Batch 9: Trie & Union-Find (10 problems)
  {
    id: 'implement-trie',
    title: 'Implement Trie (Prefix Tree)',
    description:
      'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class.',
    examples: [
      {
        input:
          'Trie() -> insert("apple") -> search("apple") -> true -> search("app") -> false -> startsWith("app") -> true',
        output: 'null, null, true, false, true',
      },
    ],
    constraints: [
      '1 ≤ word.length, prefix.length ≤ 2000',
      'word and prefix consist only of lowercase English letters',
      'At most 3 * 10⁴ calls in total will be made to insert, search, and startsWith',
    ],
    correctPattern: 'Trie',
    patterns: ['Trie', 'Hash Map', 'String', 'Tree'],
    hints: {
      constraints: '3 * 10⁴ calls suggests trie',
      inputFormat: 'String operations',
      outputFormat: 'Boolean results',
      keywords: ['trie', 'prefix tree', 'insert', 'search', 'startsWith'],
    },
    difficulty: 'medium',
    category: 'Trie',
  },
  {
    id: 'word-search-2',
    title: 'Word Search II',
    description:
      'Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.',
    examples: [
      {
        input:
          'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]',
      },
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 ≤ m, n ≤ 12',
      'board[i][j] is a lowercase English letter',
      '1 ≤ words.length ≤ 3 * 10⁴',
      '1 ≤ words[i].length ≤ 10',
      'words[i] consists of lowercase English letters',
      'All the strings of words are unique',
    ],
    correctPattern: 'Trie',
    patterns: ['Trie', 'Backtracking', 'DFS', 'Matrix'],
    hints: {
      constraints: 'm, n ≤ 12, words ≤ 3 * 10⁴ suggests trie',
      inputFormat: '2D board, list of words',
      outputFormat: 'List of found words',
      keywords: ['word search', 'trie', 'all words', 'adjacent cells'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Trie + DFS: build trie, then DFS on board matching trie paths.',
      pattern:
        'Input-Based Strategy: Strings → Trie. Build trie from words, DFS on board following trie paths.',
    },
    difficulty: 'hard',
    category: 'Trie',
  },
  {
    id: 'replace-words',
    title: 'Replace Words',
    description:
      'In English, we have a concept called root, which can be followed by some other word to form another longer word. Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it.',
    examples: [
      {
        input:
          'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"',
        output: '"the cat was rat by the bat"',
      },
    ],
    constraints: [
      '1 ≤ dictionary.length ≤ 1000',
      '1 ≤ dictionary[i].length ≤ 100',
      'dictionary[i] consists of only lowercase letters',
      '1 ≤ sentence.length ≤ 10⁶',
      'sentence consists of only lowercase letters and spaces',
      'The number of words in sentence is in the range [1, 1000]',
      'The length of each word in sentence is in the range [1, 1000]',
    ],
    correctPattern: 'Trie',
    patterns: ['Trie', 'Hash Map', 'String', 'Set'],
    hints: {
      constraints: 'sentence.length ≤ 10⁶ suggests trie',
      inputFormat: 'Dictionary, sentence',
      outputFormat: 'Modified sentence',
      keywords: ['replace words', 'root', 'prefix', 'trie'],
    },
    difficulty: 'medium',
    category: 'Trie',
  },
  {
    id: 'design-add-search',
    title: 'Design Add and Search Words Data Structure',
    description:
      'Design a data structure that supports adding new words and finding if a string matches any previously added string. Implement the WordDictionary class.',
    examples: [
      {
        input:
          'WordDictionary() -> addWord("bad") -> addWord("dad") -> addWord("mad") -> search("pad") -> false -> search("bad") -> true -> search(".ad") -> true',
        output: 'null, null, null, null, false, true, true',
      },
    ],
    constraints: [
      '1 ≤ word.length ≤ 25',
      'word in addWord consists of lowercase English letters',
      'word in search consist of "." or lowercase English letters',
      'There will be at most 2 dots in word for search queries',
      'At most 10⁴ calls will be made to addWord and search',
    ],
    correctPattern: 'Trie',
    patterns: ['Trie', 'Hash Map', 'String', 'DFS'],
    hints: {
      constraints: '10⁴ calls suggests trie',
      inputFormat: 'Word operations',
      outputFormat: 'Boolean results',
      keywords: ['add word', 'search', 'wildcard', 'trie'],
    },
    difficulty: 'medium',
    category: 'Trie',
  },
  {
    id: 'number-of-provinces',
    title: 'Number of Provinces',
    description:
      'There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c. A province is a group of directly or indirectly connected cities and no other cities outside the group. You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise. Return the total number of provinces.',
    examples: [
      {
        input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]',
        output: '2',
      },
    ],
    constraints: [
      '1 ≤ n ≤ 200',
      'n == isConnected.length',
      'n == isConnected[i].length',
      'isConnected[i][j] is 1 or 0',
      'isConnected[i][i] == 1',
      'isConnected[i][j] == isConnected[j][i]',
    ],
    correctPattern: 'Union-Find',
    patterns: ['Union-Find', 'DFS', 'BFS', 'Graph'],
    hints: {
      constraints: 'n ≤ 200 allows union-find',
      inputFormat: 'Adjacency matrix',
      outputFormat: 'Single number (provinces)',
      keywords: ['number of provinces', 'connected components', 'union find'],
      bigO: 'N ≤ 10⁶ → Target: O(α(N)) ≈ O(1). Union-Find groups connected nodes.',
      pattern:
        'Keywords: "Connected", "Number of groups" → Union-Find. Union connected nodes, count distinct roots.',
    },
    difficulty: 'medium',
    category: 'Union-Find',
  },
  {
    id: 'redundant-connection',
    title: 'Redundant Connection',
    description:
      'In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi. Return an edge that can be removed so that the resulting graph is a tree of n nodes.',
    examples: [
      {
        input: 'edges = [[1,2],[1,3],[2,3]]',
        output: '[2,3]',
      },
    ],
    constraints: [
      'n == edges.length',
      '3 ≤ n ≤ 1000',
      'edges[i].length == 2',
      '1 ≤ ai < bi ≤ edges.length',
      'ai != bi',
      'There are no repeated edges',
      'The given graph is connected',
    ],
    correctPattern: 'Union-Find',
    patterns: ['Union-Find', 'DFS', 'Graph', 'Tree'],
    hints: {
      constraints: 'n ≤ 1000 allows union-find',
      inputFormat: 'Array of edges',
      outputFormat: 'Edge to remove',
      keywords: ['redundant connection', 'cycle', 'union find'],
    },
    difficulty: 'medium',
    category: 'Union-Find',
  },
  {
    id: 'accounts-merge',
    title: 'Accounts Merge',
    description:
      'Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account. Now, we want to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts.',
    examples: [
      {
        input:
          'accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]',
        output:
          '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]',
      },
    ],
    constraints: [
      '1 ≤ accounts.length ≤ 1000',
      '2 ≤ accounts[i].length ≤ 10',
      '1 ≤ accounts[i][j].length ≤ 30',
      'accounts[i][0] consists of English letters',
      'accounts[i][j] for j > 0 is a valid email',
    ],
    correctPattern: 'Union-Find',
    patterns: ['Union-Find', 'Hash Map', 'DFS', 'Graph'],
    hints: {
      constraints: 'accounts ≤ 1000 allows union-find',
      inputFormat: 'List of accounts',
      outputFormat: 'Merged accounts',
      keywords: ['accounts merge', 'common email', 'union find'],
    },
    difficulty: 'medium',
    category: 'Union-Find',
  },
  {
    id: 'satisfiability',
    title: 'Satisfiability of Equality Equations',
    description:
      'You are given an array of strings equations that represent relationships between variables where each string equations[i] is of length 4 and takes one of two different forms: "xi==yi" or "xi!=yi". Return true if it is possible to assign integers to variable names so as to satisfy all the given equations, or false otherwise.',
    examples: [
      {
        input: 'equations = ["a==b","b!=a"]',
        output: 'false',
        explanation:
          'If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.',
      },
    ],
    constraints: [
      '1 ≤ equations.length ≤ 500',
      'equations[i].length == 4',
      'equations[i][0] is a lowercase letter',
      'equations[i][1] is either "=" or "!"',
      'equations[i][2] is "="',
      'equations[i][3] is a lowercase letter',
    ],
    correctPattern: 'Union-Find',
    patterns: ['Union-Find', 'Graph', 'DFS', 'Hash Map'],
    hints: {
      constraints: 'equations ≤ 500 allows union-find',
      inputFormat: 'Array of equations',
      outputFormat: 'Boolean',
      keywords: ['satisfiability', 'equality equations', 'union find'],
    },
    difficulty: 'medium',
    category: 'Union-Find',
  },
  {
    id: 'regions-by-slashes',
    title: 'Regions Cut By Slashes',
    description:
      'An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a "/", "\\", or blank space. These characters divide the square into regions. Given the grid grid represented as a string array, return the number of regions.',
    examples: [
      {
        input: 'grid = [" /","/ "]',
        output: '2',
      },
    ],
    constraints: [
      'n == grid.length == grid[i].length',
      '1 ≤ n ≤ 30',
      'grid[i][j] is either "/", "\\", or " "',
    ],
    correctPattern: 'Union-Find',
    patterns: ['Union-Find', 'DFS', 'Graph', 'Matrix'],
    hints: {
      constraints: 'n ≤ 30 allows union-find',
      inputFormat: 'String array grid',
      outputFormat: 'Single number (regions)',
      keywords: ['regions', 'slashes', 'union find'],
    },
    difficulty: 'medium',
    category: 'Union-Find',
  },
  // Batch 10: Linked List (10 problems)
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
      },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000]',
      '-5000 ≤ Node.val ≤ 5000',
    ],
    correctPattern: 'Linked List',
    patterns: ['Linked List', 'Recursion', 'Two Pointers', 'Stack'],
    hints: {
      constraints: 'nodes ≤ 5000 allows iterative or recursive',
      inputFormat: 'Linked list head',
      outputFormat: 'Reversed linked list',
      keywords: ['reverse', 'linked list', 'singly'],
    },
    difficulty: 'easy',
    category: 'Linked List',
  },
  {
    id: 'merge-two-sorted',
    title: 'Merge Two Sorted Lists',
    description:
      'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
      },
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50]',
      '-100 ≤ Node.val ≤ 100',
      'Both list1 and list2 are sorted in non-decreasing order',
    ],
    correctPattern: 'Linked List',
    patterns: ['Linked List', 'Two Pointers', 'Recursion', 'Merge Sort'],
    hints: {
      constraints: 'nodes ≤ 50 allows simple merge',
      inputFormat: 'Two sorted linked lists',
      outputFormat: 'Merged sorted linked list',
      keywords: ['merge', 'two sorted', 'linked lists'],
    },
    difficulty: 'easy',
    category: 'Linked List',
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    description:
      'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.',
    examples: [
      {
        input: 'head = [3,2,0,-4], pos = 1',
        output: 'true',
        explanation:
          'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).',
      },
    ],
    constraints: [
      'The number of the nodes in the list is in the range [0, 10⁴]',
      '-10⁵ ≤ Node.val ≤ 10⁵',
      'pos is -1 or a valid index in the linked-list',
    ],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Hash Map', 'Linked List', 'Floyd Cycle Detection'],
    hints: {
      constraints: 'nodes ≤ 10⁴ suggests Floyd cycle detection',
      inputFormat: 'Linked list head',
      outputFormat: 'Boolean',
      keywords: ['cycle', 'linked list', 'fast and slow'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Floyd Cycle Detection: fast pointer moves 2x, slow moves 1x.',
      pattern:
        'Input-Based Strategy: Linked List → Fast & Slow Pointers. If fast meets slow, cycle exists.',
      advancedLogic:
        'Floyd Cycle Detection: Two pointers at different speeds will meet if cycle exists.',
    },
    difficulty: 'easy',
    category: 'Linked List',
  },
  {
    id: 'remove-nth-node',
    title: 'Remove Nth Node From End of List',
    description:
      'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
    examples: [
      {
        input: 'head = [1,2,3,4,5], n = 2',
        output: '[1,2,3,5]',
      },
    ],
    constraints: [
      'The number of nodes in the list is sz',
      '1 ≤ sz ≤ 30',
      '0 ≤ Node.val ≤ 100',
      '1 ≤ n ≤ sz',
    ],
    correctPattern: 'Two Pointers',
    patterns: ['Two Pointers', 'Linked List', 'Dummy Node', 'Stack'],
    hints: {
      constraints: 'sz ≤ 30 allows two pointers',
      inputFormat: 'Linked list head, integer n',
      outputFormat: 'Modified linked list',
      keywords: ['remove nth', 'from end', 'two pointers'],
    },
    difficulty: 'medium',
    category: 'Linked List',
  },
  {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    description:
      'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.',
      },
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100]',
      '0 ≤ Node.val ≤ 9',
      'It is guaranteed that the list represents a number that does not have leading zeros',
    ],
    correctPattern: 'Linked List',
    patterns: ['Linked List', 'Math', 'Simulation', 'Two Pointers'],
    hints: {
      constraints: 'nodes ≤ 100 allows simulation',
      inputFormat: 'Two linked lists',
      outputFormat: 'Sum as linked list',
      keywords: ['add two numbers', 'reverse order', 'carry'],
    },
    difficulty: 'medium',
    category: 'Linked List',
  },
  {
    id: 'swap-nodes-pairs',
    title: 'Swap Nodes in Pairs',
    description:
      "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).",
    examples: [
      {
        input: 'head = [1,2,3,4]',
        output: '[2,1,4,3]',
      },
    ],
    constraints: ['The number of nodes in the list is in the range [0, 100]', '0 ≤ Node.val ≤ 100'],
    correctPattern: 'Linked List',
    patterns: ['Linked List', 'Recursion', 'Two Pointers', 'Simulation'],
    hints: {
      constraints: 'nodes ≤ 100 allows recursion or iteration',
      inputFormat: 'Linked list head',
      outputFormat: 'Modified linked list',
      keywords: ['swap', 'pairs', 'adjacent nodes'],
    },
    difficulty: 'medium',
    category: 'Linked List',
  },
  {
    id: 'rotate-list',
    title: 'Rotate List',
    description: 'Given the head of a linked list, rotate the list to the right by k places.',
    examples: [
      {
        input: 'head = [1,2,3,4,5], k = 2',
        output: '[4,5,1,2,3]',
      },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 500]',
      '0 ≤ Node.val ≤ 100',
      '0 ≤ k ≤ 2 * 10⁹',
    ],
    correctPattern: 'Linked List',
    patterns: ['Linked List', 'Two Pointers', 'Math', 'Simulation'],
    hints: {
      constraints: 'nodes ≤ 500, k ≤ 2 * 10⁹ suggests modulo',
      inputFormat: 'Linked list head, integer k',
      outputFormat: 'Rotated linked list',
      keywords: ['rotate', 'right by k', 'circular'],
    },
    difficulty: 'medium',
    category: 'Linked List',
  },
  {
    id: 'copy-random-list',
    title: 'Copy List with Random Pointer',
    description:
      'A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.',
    examples: [
      {
        input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
        output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
      },
    ],
    constraints: [
      '0 ≤ n ≤ 1000',
      '-10⁴ ≤ Node.val ≤ 10⁴',
      'Node.random is null or pointing to a node in the linked list',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Linked List', 'Two Pointers', 'Recursion'],
    hints: {
      constraints: 'n ≤ 1000 suggests hash map',
      inputFormat: 'Linked list with random pointers',
      outputFormat: 'Deep copied linked list',
      keywords: ['copy', 'random pointer', 'deep copy'],
    },
    difficulty: 'medium',
    category: 'Linked List',
  },
  {
    id: 'reverse-nodes-k',
    title: 'Reverse Nodes in k-Group',
    description:
      'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.',
    examples: [
      {
        input: 'head = [1,2,3,4,5], k = 2',
        output: '[2,1,4,3,5]',
      },
    ],
    constraints: [
      'The number of nodes in the list is n',
      '1 ≤ k ≤ n ≤ 5000',
      '0 ≤ Node.val ≤ 1000',
    ],
    correctPattern: 'Linked List',
    patterns: ['Linked List', 'Recursion', 'Two Pointers', 'Stack'],
    hints: {
      constraints: 'n ≤ 5000 allows recursion',
      inputFormat: 'Linked list head, integer k',
      outputFormat: 'Modified linked list',
      keywords: ['reverse', 'k-group', 'groups of k'],
    },
    difficulty: 'hard',
    category: 'Linked List',
  },
  {
    id: 'merge-k-lists',
    title: 'Merge k Sorted Lists (Linked List)',
    description:
      'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
      },
    ],
    constraints: [
      'k == lists.length',
      '0 ≤ k ≤ 10⁴',
      '0 ≤ lists[i].length ≤ 500',
      '-10⁴ ≤ lists[i][j] ≤ 10⁴',
      'lists[i] is sorted in ascending order',
    ],
    correctPattern: 'Heap / Priority Queue',
    patterns: ['Heap / Priority Queue', 'Divide and Conquer', 'Linked List', 'Merge Sort'],
    hints: {
      constraints: 'k ≤ 10⁴ suggests heap',
      inputFormat: 'Array of sorted linked lists',
      outputFormat: 'Merged sorted linked list',
      keywords: ['merge k', 'sorted lists', 'heap'],
    },
    difficulty: 'hard',
    category: 'Linked List',
  },
  // Batch 11: Bit Manipulation (10 problems)
  {
    id: 'single-number',
    title: 'Single Number',
    description:
      'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    examples: [
      {
        input: 'nums = [2,2,1]',
        output: '1',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 3 * 10⁴',
      '-3 * 10⁴ ≤ nums[i] ≤ 3 * 10⁴',
      'Each element in the array appears twice except for one element which appears only once',
    ],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Hash Map', 'Math', 'XOR'],
    hints: {
      constraints: 'n ≤ 3 * 10⁴, XOR trick',
      inputFormat: 'Array of integers',
      outputFormat: 'Single number',
      keywords: ['single number', 'appears twice', 'XOR'],
      bigO: 'N ≥ 10⁷ → Target: O(N). XOR all numbers: pairs cancel out (x ^ x = 0).',
      pattern: 'Bitwise Magic: x ^ x = 0. XOR all elements, pairs cancel, single number remains.',
      advancedLogic:
        'Bitwise Magic: XOR property x ^ x = 0 finds the single unique number in pair-heavy array.',
    },
    difficulty: 'easy',
    category: 'Bit Manipulation',
  },
  {
    id: 'number-of-1-bits',
    title: 'Number of 1 Bits',
    description:
      'Write a function that takes the binary representation of an unsigned integer and returns the number of "1" bits it has (also known as the Hamming weight).',
    examples: [
      {
        input: 'n = 00000000000000000000000000001011',
        output: '3',
        explanation:
          'The input binary string 00000000000000000000000000001011 has a total of three "1" bits.',
      },
    ],
    constraints: ['The input must be a binary string of length 32'],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Math', 'String', 'Brian Kernighan'],
    hints: {
      constraints: '32-bit integer suggests bit manipulation',
      inputFormat: 'Unsigned integer',
      outputFormat: 'Single number (count)',
      keywords: ['number of 1 bits', 'Hamming weight', 'bit count'],
    },
    difficulty: 'easy',
    category: 'Bit Manipulation',
  },
  {
    id: 'reverse-bits',
    title: 'Reverse Bits',
    description: 'Reverse bits of a given 32 bits unsigned integer.',
    examples: [
      {
        input: 'n = 00000010100101000001111010011100',
        output: '964176192 (00111001011110000010100101000000)',
      },
    ],
    constraints: ['The input must be a binary string of length 32'],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Math', 'Two Pointers', 'String'],
    hints: {
      constraints: '32-bit integer suggests bit manipulation',
      inputFormat: 'Unsigned integer',
      outputFormat: 'Reversed bits integer',
      keywords: ['reverse bits', '32 bits', 'unsigned'],
    },
    difficulty: 'easy',
    category: 'Bit Manipulation',
  },
  {
    id: 'missing-number',
    title: 'Missing Number',
    description:
      'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    examples: [
      {
        input: 'nums = [3,0,1]',
        output: '2',
        explanation:
          'n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.',
      },
    ],
    constraints: [
      'n == nums.length',
      '1 ≤ n ≤ 10⁴',
      '0 ≤ nums[i] ≤ n',
      'All the numbers of nums are unique',
    ],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Math', 'Hash Map', 'Sorting'],
    hints: {
      constraints: 'n ≤ 10⁴, XOR trick',
      inputFormat: 'Array of distinct numbers',
      outputFormat: 'Single number (missing)',
      keywords: ['missing number', 'range [0, n]', 'XOR'],
    },
    difficulty: 'easy',
    category: 'Bit Manipulation',
  },
  {
    id: 'counting-bits',
    title: 'Counting Bits',
    description:
      "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    examples: [
      {
        input: 'n = 2',
        output: '[0,1,1]',
        explanation: '0 --> 0, 1 --> 1, 2 --> 10',
      },
    ],
    constraints: ['0 ≤ n ≤ 10⁵'],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Bit Manipulation', 'Math', 'Brian Kernighan'],
    hints: {
      constraints: 'n ≤ 10⁵ suggests DP',
      inputFormat: 'Integer n',
      outputFormat: 'Array of counts',
      keywords: ['counting bits', 'number of 1s', 'DP'],
      bigO: 'N ≤ 10⁶ → Target: O(N). DP: ans[i] = ans[i >> 1] + (i & 1).',
      pattern:
        'Keywords: "Counting", "Optimal" → Dynamic Programming. Reuse previous counts: remove last bit, add it back.',
      advancedLogic:
        'DP Pattern: ans[i] = ans[i >> 1] + (i & 1). Right shift removes last bit, AND gets it.',
    },
    difficulty: 'easy',
    category: 'Bit Manipulation',
  },
  {
    id: 'sum-of-two',
    title: 'Sum of Two Integers',
    description:
      'Given two integers a and b, return the sum of the two integers without using the operators + and -.',
    examples: [
      {
        input: 'a = 1, b = 2',
        output: '3',
      },
    ],
    constraints: ['-1000 ≤ a, b ≤ 1000'],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Math', 'Recursion', 'Simulation'],
    hints: {
      constraints: 'Bit manipulation required',
      inputFormat: 'Two integers',
      outputFormat: 'Sum (integer)',
      keywords: ['sum', 'without + and -', 'bit manipulation'],
    },
    difficulty: 'medium',
    category: 'Bit Manipulation',
  },
  {
    id: 'single-number-2',
    title: 'Single Number II',
    description:
      'Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it.',
    examples: [
      {
        input: 'nums = [2,2,3,2]',
        output: '3',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 3 * 10⁴',
      '-2³¹ ≤ nums[i] ≤ 2³¹ - 1',
      'Each element in nums appears exactly three times except for one element which appears once',
    ],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Hash Map', 'Math', 'XOR'],
    hints: {
      constraints: 'n ≤ 3 * 10⁴, bit manipulation trick',
      inputFormat: 'Array of integers',
      outputFormat: 'Single number',
      keywords: ['single number', 'appears three times', 'bit manipulation'],
    },
    difficulty: 'medium',
    category: 'Bit Manipulation',
  },
  {
    id: 'single-number-3',
    title: 'Single Number III',
    description:
      'Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.',
    examples: [
      {
        input: 'nums = [1,2,1,3,2,5]',
        output: '[3,5]',
        explanation: '[5, 3] is also a valid answer.',
      },
    ],
    constraints: [
      '2 ≤ nums.length ≤ 3 * 10⁴',
      '-2³¹ ≤ nums[i] ≤ 2³¹ - 1',
      'Each integer in nums will appear twice, except for two integers which will appear only once',
    ],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Hash Map', 'XOR', 'Math'],
    hints: {
      constraints: 'n ≤ 3 * 10⁴, XOR trick',
      inputFormat: 'Array of integers',
      outputFormat: 'Array of two numbers',
      keywords: ['single number', 'two elements', 'XOR'],
    },
    difficulty: 'medium',
    category: 'Bit Manipulation',
  },
  {
    id: 'maximum-xor',
    title: 'Maximum XOR of Two Numbers in an Array',
    description:
      'Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.',
    examples: [
      {
        input: 'nums = [3,10,5,25,2,8]',
        output: '28',
        explanation: 'The maximum result is 5 XOR 25 = 28.',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 2 * 10⁵', '0 ≤ nums[i] ≤ 2³¹ - 1'],
    correctPattern: 'Trie',
    patterns: ['Trie', 'Bit Manipulation', 'Hash Map', 'Brute Force'],
    hints: {
      constraints: 'n ≤ 2 * 10⁵ suggests trie',
      inputFormat: 'Array of integers',
      outputFormat: 'Single number (max XOR)',
      keywords: ['maximum XOR', 'two numbers', 'trie'],
    },
    difficulty: 'medium',
    category: 'Bit Manipulation',
  },
  {
    id: 'bitwise-and-range',
    title: 'Bitwise AND of Numbers Range',
    description:
      'Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.',
    examples: [
      {
        input: 'left = 5, right = 7',
        output: '4',
      },
    ],
    constraints: ['0 ≤ left ≤ right ≤ 2³¹ - 1'],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Math', 'Brute Force', 'Prefix'],
    hints: {
      constraints: 'range ≤ 2³¹ suggests bit manipulation',
      inputFormat: 'Two integers left, right',
      outputFormat: 'Single number (bitwise AND)',
      keywords: ['bitwise AND', 'range', 'common prefix'],
    },
    difficulty: 'medium',
    category: 'Bit Manipulation',
  },
  // Batch 12: Math & Greedy (10 problems)
  {
    id: 'plus-one',
    title: 'Plus One',
    description:
      'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading zeros. Increment the large integer by one and return the resulting array of digits.',
    examples: [
      {
        input: 'digits = [1,2,3]',
        output: '[1,2,4]',
        explanation:
          'The array represents the integer 123. Incrementing by one gives 123 + 1 = 124. Thus, the result should be [1,2,4].',
      },
    ],
    constraints: [
      '1 ≤ digits.length ≤ 100',
      '0 ≤ digits[i] ≤ 9',
      'digits does not contain any leading zeros',
    ],
    correctPattern: 'Math',
    patterns: ['Math', 'Array', 'Simulation', 'String'],
    hints: {
      constraints: 'length ≤ 100 allows simulation',
      inputFormat: 'Array of digits',
      outputFormat: 'Array of digits',
      keywords: ['plus one', 'increment', 'carry'],
    },
    difficulty: 'easy',
    category: 'Math',
  },
  {
    id: 'pow-x-n',
    title: 'Pow(x, n)',
    description: 'Implement pow(x, n), which calculates x raised to the power n (i.e., xⁿ).',
    examples: [
      {
        input: 'x = 2.00000, n = 10',
        output: '1024.00000',
      },
    ],
    constraints: [
      '-100.0 < x < 100.0',
      '-2³¹ ≤ n ≤ 2³¹-1',
      'n is an integer',
      'Either x is not zero or n > 0',
      '-10⁴ ≤ xⁿ ≤ 10⁴',
    ],
    correctPattern: 'Math',
    patterns: ['Math', 'Recursion', 'Bit Manipulation', 'Fast Power'],
    hints: {
      constraints: 'n ≤ 2³¹ suggests fast power',
      inputFormat: 'Double x, integer n',
      outputFormat: 'Double (xⁿ)',
      keywords: ['power', 'exponentiation', 'fast power'],
      bigO: 'N ≥ 10⁷ → Target: O(log N). Fast Power: xⁿ = (xⁿ/²)² if n even, x * (xⁿ/²)² if n odd.',
      pattern:
        'Math Pattern: Exponentiation → Fast Power. Divide exponent by 2, square result, handle odd exponents.',
      advancedLogic:
        'Fast Power: Use binary representation of exponent. xⁿ = x^(binary bits). O(log N) instead of O(N).',
    },
    difficulty: 'medium',
    category: 'Math',
  },
  {
    id: 'divide-two-integers',
    title: 'Divide Two Integers',
    description:
      'Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator. The integer division should truncate toward zero, which means losing its fractional part.',
    examples: [
      {
        input: 'dividend = 10, divisor = 3',
        output: '3',
        explanation: '10/3 = 3.33333.. which is truncated to 3.',
      },
    ],
    constraints: ['-2³¹ ≤ dividend, divisor ≤ 2³¹ - 1', 'divisor != 0'],
    correctPattern: 'Bit Manipulation',
    patterns: ['Bit Manipulation', 'Math', 'Binary Search', 'Simulation'],
    hints: {
      constraints: 'range ≤ 2³¹ suggests bit manipulation',
      inputFormat: 'Two integers',
      outputFormat: 'Integer (quotient)',
      keywords: ['divide', 'without */%', 'bit manipulation'],
    },
    difficulty: 'medium',
    category: 'Math',
  },
  {
    id: 'fraction-to-decimal',
    title: 'Fraction to Recurring Decimal',
    description:
      'Given two integers representing the numerator and denominator of a fraction, return the fraction in string format. If the fractional part is repeating, enclose the repeating part in parentheses.',
    examples: [
      {
        input: 'numerator = 1, denominator = 2',
        output: '"0.5"',
      },
    ],
    constraints: ['-2³¹ ≤ numerator, denominator ≤ 2³¹ - 1', 'denominator != 0'],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Math', 'String', 'Simulation'],
    hints: {
      constraints: 'range ≤ 2³¹ suggests hash map for repeating',
      inputFormat: 'Two integers',
      outputFormat: 'String (decimal)',
      keywords: ['fraction', 'recurring decimal', 'repeating'],
    },
    difficulty: 'medium',
    category: 'Math',
  },
  {
    id: 'gas-station',
    title: 'Gas Station',
    description:
      "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to (i + 1)th station. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.",
    examples: [
      {
        input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
        output: '3',
        explanation:
          'Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4. Travel to station 4. Your tank = 4 - 1 + 5 = 8. Travel to station 0. Your tank = 8 - 2 + 1 = 7. Travel to station 1. Your tank = 7 - 3 + 2 = 6. Travel to station 2. Your tank = 6 - 4 + 3 = 5. Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3. Therefore, return 3 as the starting index.',
      },
    ],
    constraints: [
      'gas.length == n',
      'cost.length == n',
      '1 ≤ n ≤ 10⁵',
      '0 ≤ gas[i], cost[i] ≤ 10⁴',
    ],
    correctPattern: 'Greedy',
    patterns: ['Greedy', 'Array', 'Simulation', 'Two Pointers'],
    hints: {
      constraints: 'n ≤ 10⁵ suggests greedy',
      inputFormat: 'Two arrays gas, cost',
      outputFormat: 'Index or -1',
      keywords: ['gas station', 'circular route', 'greedy'],
    },
    difficulty: 'medium',
    category: 'Greedy',
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    description:
      "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
    examples: [
      {
        input: 'nums = [2,3,1,1,4]',
        output: 'true',
        explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.',
      },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '0 ≤ nums[i] ≤ 10⁵'],
    correctPattern: 'Greedy',
    patterns: ['Greedy', 'Dynamic Programming', 'Array', 'Backtracking'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests greedy',
      inputFormat: 'Array of jump lengths',
      outputFormat: 'Boolean',
      keywords: ['jump game', 'reach last index', 'greedy'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Greedy tracks farthest reachable index.',
      pattern:
        'Keywords: "Minimum operations", "Intervals" → Greedy. Track max reachable index, return true if reaches end.',
    },
    difficulty: 'medium',
    category: 'Greedy',
  },
  {
    id: 'jump-game-2',
    title: 'Jump Game II',
    description:
      'You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum length of a forward jump from index i. Return the minimum number of jumps to reach nums[n - 1].',
    examples: [
      {
        input: 'nums = [2,3,1,1,4]',
        output: '2',
        explanation:
          'The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.',
      },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '0 ≤ nums[i] ≤ 1000',
      "It's guaranteed that you can reach nums[n - 1]",
    ],
    correctPattern: 'Greedy',
    patterns: ['Greedy', 'Dynamic Programming', 'BFS', 'Array'],
    hints: {
      constraints: 'n ≤ 10⁴ suggests greedy',
      inputFormat: 'Array of jump lengths',
      outputFormat: 'Single number (min jumps)',
      keywords: ['jump game', 'minimum jumps', 'greedy'],
    },
    difficulty: 'medium',
    category: 'Greedy',
  },
  {
    id: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    description:
      'Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    examples: [
      {
        input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]',
        output: '1',
        explanation: '[1,3] can be removed and the rest of the intervals are non-overlapping.',
      },
    ],
    constraints: [
      '1 ≤ intervals.length ≤ 10⁵',
      'intervals[i].length == 2',
      '-5 * 10⁴ ≤ starti < endi ≤ 5 * 10⁴',
    ],
    correctPattern: 'Greedy',
    patterns: ['Greedy', 'Sorting', 'Dynamic Programming', 'Interval'],
    hints: {
      constraints: 'n ≤ 10⁵ suggests greedy',
      inputFormat: 'Array of intervals',
      outputFormat: 'Single number (min to remove)',
      keywords: ['non-overlapping', 'minimum remove', 'greedy'],
    },
    difficulty: 'medium',
    category: 'Greedy',
  },
  {
    id: 'partition-labels',
    title: 'Partition Labels',
    description:
      'You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.',
    examples: [
      {
        input: 's = "ababcbacadefegdehijhklij"',
        output: '[9,7,8]',
        explanation: 'The partition is "ababcbaca", "defegde", "hijhklij".',
      },
    ],
    constraints: ['1 ≤ s.length ≤ 500', 's consists of lowercase English letters'],
    correctPattern: 'Greedy',
    patterns: ['Greedy', 'Hash Map', 'Two Pointers', 'String'],
    hints: {
      constraints: 'length ≤ 500 suggests greedy',
      inputFormat: 'String',
      outputFormat: 'Array of sizes',
      keywords: ['partition', 'labels', 'greedy'],
    },
    difficulty: 'medium',
    category: 'Greedy',
  },
  {
    id: 'can-place-flowers',
    title: 'Can Place Flowers',
    description:
      "You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots. Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.",
    examples: [
      {
        input: 'flowerbed = [1,0,0,0,1], n = 1',
        output: 'true',
      },
    ],
    constraints: [
      '1 ≤ flowerbed.length ≤ 2 * 10⁴',
      'flowerbed[i] is 0 or 1',
      'There are no two adjacent flowers in flowerbed',
      '0 ≤ n ≤ flowerbed.length',
    ],
    correctPattern: 'Greedy',
    patterns: ['Greedy', 'Array', 'Simulation', 'Two Pointers'],
    hints: {
      constraints: 'length ≤ 2 * 10⁴ suggests greedy',
      inputFormat: 'Binary array, integer n',
      outputFormat: 'Boolean',
      keywords: ['place flowers', 'no adjacent', 'greedy'],
      bigO: 'N ≤ 10⁶ → Target: O(N). Greedy places flowers whenever possible.',
      pattern:
        'Keywords: "Minimum operations" → Greedy. Place flower if current and adjacent are empty, count placed.',
    },
    difficulty: 'easy',
    category: 'Greedy',
  },
  // Batch 13: Design & System Design (10 problems)
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class.',
    examples: [
      {
        input: 'LRUCache(2) -> put(1,1) -> put(2,2) -> get(1) -> 1 -> put(3,3) -> get(2) -> -1',
        output: 'null, null, null, 1, null, -1',
      },
    ],
    constraints: [
      '1 ≤ capacity ≤ 3000',
      '0 ≤ key ≤ 10⁴',
      '0 ≤ value ≤ 10⁵',
      'At most 2 * 10⁵ calls will be made to get and put',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Linked List', 'Doubly Linked List', 'Design'],
    hints: {
      constraints: '2 * 10⁵ calls suggests hash map + doubly linked list',
      inputFormat: 'Cache operations',
      outputFormat: 'Cache values',
      keywords: ['LRU cache', 'least recently used', 'design'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-twitter',
    title: 'Design Twitter',
    description:
      "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.",
    examples: [
      {
        input:
          'Twitter() -> postTweet(1, 5) -> getNewsFeed(1) -> [5] -> follow(1, 2) -> postTweet(2, 6) -> getNewsFeed(1) -> [6, 5]',
        output: 'null, null, [5], null, null, [6,5]',
      },
    ],
    constraints: [
      '1 ≤ userId, followerId, followeeId ≤ 500',
      '0 ≤ tweetId ≤ 10⁴',
      'All the tweets have unique IDs',
      'At most 3 * 10⁴ calls will be made to postTweet, getNewsFeed, follow, and unfollow',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Heap / Priority Queue', 'Design', 'Graph'],
    hints: {
      constraints: '3 * 10⁴ calls suggests hash map + heap',
      inputFormat: 'Social media operations',
      outputFormat: 'News feed',
      keywords: ['design twitter', 'news feed', 'follow/unfollow'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-hit-counter',
    title: 'Design Hit Counter',
    description:
      'Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).',
    examples: [
      {
        input:
          'HitCounter() -> hit(1) -> hit(2) -> hit(3) -> getHits(4) -> 3 -> hit(300) -> getHits(300) -> 4 -> getHits(301) -> 3',
        output: 'null, null, null, null, 3, null, 4, 3',
      },
    ],
    constraints: [
      '1 ≤ timestamp ≤ 2 * 10⁹',
      'All the calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing)',
      'At most 300 calls will be made to hit and getHits',
    ],
    correctPattern: 'Queue',
    patterns: ['Queue', 'Hash Map', 'Design', 'Array'],
    hints: {
      constraints: '300 calls suggests queue',
      inputFormat: 'Timestamp operations',
      outputFormat: 'Hit counts',
      keywords: ['hit counter', 'past 5 minutes', 'queue'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-tic-tac-toe',
    title: 'Design Tic-Tac-Toe',
    description:
      'Assume the following rules are for the tic-tac-toe game on an n x n board between two players: A move is guaranteed to be valid and is placed on an empty block. Once a winning condition is reached, no more moves are allowed. A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game. Implement the TicTacToe class.',
    examples: [
      {
        input:
          'TicTacToe(3) -> move(0, 0, 1) -> move(0, 2, 2) -> move(2, 2, 1) -> move(1, 1, 2) -> move(2, 0, 1) -> move(1, 0, 2) -> move(2, 1, 1) -> 1',
        output: 'null, 0, 0, 0, 0, 0, 0, 1',
      },
    ],
    constraints: [
      '2 ≤ n ≤ 100',
      'player is 1 or 2',
      '1 ≤ row, col ≤ n',
      'At most n² calls will be made to move',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Array', 'Design', 'Matrix'],
    hints: {
      constraints: 'n ≤ 100, n² calls suggests hash map',
      inputFormat: 'Move operations',
      outputFormat: 'Winner or 0',
      keywords: ['tic-tac-toe', 'design', 'winning condition'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-snake-game',
    title: 'Design Snake Game',
    description:
      'Design a Snake game that is played on a device with screen size height x width. The snake is initially positioned at the top left corner (0, 0) with length = 1 unit. You are given an array of food positions.',
    examples: [
      {
        input:
          'SnakeGame(3, 2, [[1,2],[0,1]]) -> move("R") -> move("D") -> move("R") -> move("U") -> move("L") -> move("U")',
        output: 'null, 0, 0, 1, 1, 2, -1',
      },
    ],
    constraints: [
      '1 ≤ width, height ≤ 10⁴',
      '1 ≤ food.length ≤ 2000',
      'food[i].length == 2',
      '0 ≤ food[i][0] < height',
      '0 ≤ food[i][1] < width',
      '1 ≤ directions.length ≤ 5000',
      'directions[i] is one of ["U","D","L","R"]',
    ],
    correctPattern: 'Queue',
    patterns: ['Queue', 'Hash Map', 'Design', 'Simulation'],
    hints: {
      constraints: 'directions ≤ 5000 suggests queue',
      inputFormat: 'Game dimensions, food, moves',
      outputFormat: 'Score',
      keywords: ['snake game', 'design', 'queue'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-underground',
    title: 'Design Underground System',
    description:
      'An underground railway system is keeping track of customer travel times between different stations. Implement the UndergroundSystem class.',
    examples: [
      {
        input:
          'UndergroundSystem() -> checkIn(45, "Leyton", 3) -> checkIn(32, "Paradise", 8) -> checkIn(27, "Leyton", 10) -> checkOut(45, "Waterloo", 15) -> checkOut(27, "Waterloo", 20) -> checkOut(32, "Cambridge", 22) -> getAverageTime("Paradise", "Cambridge") -> 14.0',
        output: 'null, null, null, null, null, null, null, 14.0',
      },
    ],
    constraints: [
      '1 ≤ id, t ≤ 10⁶',
      '1 ≤ stationName.length, startStation.length, endStation.length ≤ 10',
      'All strings consist of uppercase and lowercase English letters and digits',
      'There will be at most 2 * 10⁴ calls in total to checkIn, checkOut, and getAverageTime',
      'Answers within 10⁻⁵ of the actual value will be accepted',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Design', 'String', 'Math'],
    hints: {
      constraints: '2 * 10⁴ calls suggests hash map',
      inputFormat: 'Check-in/check-out operations',
      outputFormat: 'Average time',
      keywords: ['underground system', 'design', 'average time'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-browser-history',
    title: 'Design Browser History',
    description:
      'You have a browser of one tab where you start on the homepage and you can visit another url, get back in the history number of steps or move forward in the history number of steps.',
    examples: [
      {
        input:
          'BrowserHistory("leetcode.com") -> visit("google.com") -> visit("facebook.com") -> visit("youtube.com") -> back(1) -> "facebook.com" -> forward(1) -> "youtube.com"',
        output: 'null, null, null, null, "facebook.com", "youtube.com"',
      },
    ],
    constraints: [
      '1 ≤ homepage.length ≤ 20',
      '1 ≤ url.length ≤ 20',
      '1 ≤ steps ≤ 100',
      'At most 5000 calls will be made to visit, back, and forward',
    ],
    correctPattern: 'Stack',
    patterns: ['Stack', 'Array', 'Design', 'Two Pointers'],
    hints: {
      constraints: '5000 calls suggests stack or array',
      inputFormat: 'Browser operations',
      outputFormat: 'Current URL',
      keywords: ['browser history', 'back/forward', 'design'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-phone-directory',
    title: 'Design Phone Directory',
    description:
      'Design a phone directory that initially has maxNumbers empty slots that can store numbers. The directory should store numbers, check if a certain slot is empty or not, and empty a given slot.',
    examples: [
      {
        input:
          'PhoneDirectory(3) -> get() -> 0 -> get() -> 1 -> check(2) -> true -> get() -> 2 -> check(2) -> false',
        output: 'null, 0, 1, true, 2, false',
      },
    ],
    constraints: [
      '1 ≤ maxNumbers ≤ 10⁴',
      'At most 2 * 10⁴ calls will be made to get, check, and release',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Set', 'Design', 'Queue'],
    hints: {
      constraints: '2 * 10⁴ calls suggests hash map',
      inputFormat: 'Directory operations',
      outputFormat: 'Numbers or booleans',
      keywords: ['phone directory', 'design', 'available numbers'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-log-storage',
    title: 'Design Log Storage System',
    description:
      'You are given several logs, where each log is a space-delimited string of words. The first word in each log is an alphanumeric identifier. Implement the LogSystem class.',
    examples: [
      {
        input:
          'LogSystem() -> put(1, "2017:01:01:23:59:59") -> put(2, "2017:01:01:22:59:59") -> retrieve("2017:01:01:23:00:00", "2017:01:01:23:59:59", "Year") -> [1]',
        output: 'null, null, null, [1]',
      },
    ],
    constraints: [
      '1 ≤ id ≤ 500',
      '2000 ≤ Year ≤ 2017',
      '1 ≤ Month ≤ 12',
      '1 ≤ Day ≤ 31',
      '0 ≤ Hour ≤ 23',
      '0 ≤ Minute, Second ≤ 59',
      'At most 500 calls will be made to put and retrieve',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'String', 'Design', 'Sorting'],
    hints: {
      constraints: '500 calls suggests hash map',
      inputFormat: 'Log operations',
      outputFormat: 'List of IDs',
      keywords: ['log storage', 'design', 'retrieve by time'],
    },
    difficulty: 'medium',
    category: 'Design',
  },
  {
    id: 'design-search-autocomplete',
    title: 'Design Search Autocomplete System',
    description:
      'Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character "#").',
    examples: [
      {
        input:
          'AutocompleteSystem(["i love you", "island","ironman", "i love leetcode"], [5,3,2,2]) -> input("i") -> ["i love you", "island", "i love leetcode"]',
        output: 'null, ["i love you", "island", "i love leetcode"]',
      },
    ],
    constraints: [
      '1 ≤ sentences.length ≤ 100',
      '1 ≤ sentences[i].length ≤ 100',
      '1 ≤ times.length ≤ 50',
      '0 ≤ times[i] ≤ 100',
      '1 ≤ c.length ≤ 1',
      'c is a lowercase English letter or "#"',
      'At most 100 calls will be made to input',
    ],
    correctPattern: 'Trie',
    patterns: ['Trie', 'Hash Map', 'Design', 'Heap / Priority Queue'],
    hints: {
      constraints: '100 calls suggests trie',
      inputFormat: 'Sentences, times, character input',
      outputFormat: 'Top 3 suggestions',
      keywords: ['autocomplete', 'trie', 'design'],
    },
    difficulty: 'hard',
    category: 'Design',
  },
  // Batch 14: Advanced Graph & Matrix (10 problems)
  {
    id: 'shortest-path-binary',
    title: 'Shortest Path in Binary Matrix',
    description:
      'Given an n x n binary matrix grid, return the length of the shortest clear path from the top-left corner (0, 0) to the bottom-right corner (n - 1, n - 1). If such a path does not exist, return -1.',
    examples: [
      {
        input: 'grid = [[0,1],[1,0]]',
        output: '2',
      },
    ],
    constraints: ['n == grid.length', 'n == grid[i].length', '1 ≤ n ≤ 100', 'grid[i][j] is 0 or 1'],
    correctPattern: 'BFS',
    patterns: ['BFS', 'Matrix', 'Graph', 'Dijkstra'],
    hints: {
      constraints: 'n ≤ 100 allows BFS',
      inputFormat: 'Binary matrix',
      outputFormat: 'Single number (path length)',
      keywords: ['shortest path', 'binary matrix', 'BFS'],
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'walls-and-gates',
    title: 'Walls and Gates',
    description:
      'You are given an m x n grid rooms initialized with these three possible values: -1 represents a wall or an obstacle, 0 represents a gate, INF represents an empty room. Fill each empty room with the distance to its nearest gate.',
    examples: [
      {
        input:
          'rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]',
        output: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]',
      },
    ],
    constraints: [
      'm == rooms.length',
      'n == rooms[i].length',
      '1 ≤ m, n ≤ 250',
      'rooms[i][j] is -1, 0, or 2³¹ - 1',
    ],
    correctPattern: 'BFS',
    patterns: ['BFS', 'Matrix', 'Graph', 'Multi-source BFS'],
    hints: {
      constraints: 'm, n ≤ 250 allows BFS',
      inputFormat: 'Matrix with gates and walls',
      outputFormat: 'Matrix with distances',
      keywords: ['walls and gates', 'nearest gate', 'BFS'],
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'surrounded-regions',
    title: 'Surrounded Regions',
    description:
      'Given an m x n matrix board containing "X" and "O", capture all regions that are 4-directionally surrounded by "X". A region is captured by flipping all "O"s into "X"s in that surrounded region.',
    examples: [
      {
        input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
        output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
      },
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 ≤ m, n ≤ 200',
      'board[i][j] is "X" or "O"',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'BFS', 'Union-Find', 'Matrix'],
    hints: {
      constraints: 'm, n ≤ 200 allows DFS/BFS',
      inputFormat: 'Matrix with X and O',
      outputFormat: 'Modified matrix',
      keywords: ['surrounded regions', 'capture', 'DFS/BFS'],
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'pacific-atlantic',
    title: 'Pacific Atlantic Water Flow',
    description:
      "There is an m x n rectangular island that borders both the Pacific Ocean and the Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges. Water can only flow in four directions. Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.",
    examples: [
      {
        input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]',
        output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
      },
    ],
    constraints: [
      'm == heights.length',
      'n == heights[i].length',
      '1 ≤ m, n ≤ 200',
      '0 ≤ heights[i][j] ≤ 10⁵',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'BFS', 'Matrix', 'Graph'],
    hints: {
      constraints: 'm, n ≤ 200 allows DFS/BFS',
      inputFormat: 'Matrix of heights',
      outputFormat: 'List of coordinates',
      keywords: ['water flow', 'pacific atlantic', 'DFS'],
      bigO: 'N ≤ 5,000 → Target: O(N²). DFS from Pacific and Atlantic borders, find intersection.',
      pattern:
        'Input-Based Strategy: 2D Grid → DFS. Start DFS from Pacific (top/left) and Atlantic (bottom/right) borders.',
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'word-ladder-2',
    title: 'Word Ladder II',
    description:
      'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words. Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord.',
    examples: [
      {
        input:
          'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]',
      },
    ],
    constraints: [
      '1 ≤ beginWord.length ≤ 5',
      'endWord.length == beginWord.length',
      '1 ≤ wordList.length ≤ 500',
      'wordList[i].length == beginWord.length',
      'beginWord, endWord, and wordList[i] consist of lowercase English letters',
      'beginWord != endWord',
      'All the words in wordList are unique',
    ],
    correctPattern: 'BFS',
    patterns: ['BFS', 'Backtracking', 'Graph', 'Hash Map'],
    hints: {
      constraints: 'wordList ≤ 500 allows BFS + backtracking',
      inputFormat: 'beginWord, endWord, wordList',
      outputFormat: 'List of lists (all shortest paths)',
      keywords: ['word ladder', 'all shortest paths', 'BFS'],
    },
    difficulty: 'hard',
    category: 'Graph',
  },
  {
    id: 'alien-dictionary',
    title: 'Alien Dictionary',
    description:
      "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you. You are given a list of strings words from the alien language's dictionary. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules.",
    examples: [
      {
        input: 'words = ["wrt","wrf","er","ett","rftt"]',
        output: '"wertf"',
      },
    ],
    constraints: [
      '1 ≤ words.length ≤ 100',
      '1 ≤ words[i].length ≤ 100',
      'words[i] consists of only lowercase English letters',
    ],
    correctPattern: 'Topological Sort',
    patterns: ['Topological Sort', 'Graph', 'DFS', 'Hash Map'],
    hints: {
      constraints: 'words ≤ 100 suggests topological sort',
      inputFormat: 'List of words',
      outputFormat: 'String (sorted letters)',
      keywords: ['alien dictionary', 'topological sort', 'dependency'],
    },
    difficulty: 'hard',
    category: 'Graph',
  },
  {
    id: 'course-schedule-2',
    title: 'Course Schedule II',
    description:
      'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return the ordering of courses you should take to finish all courses.',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: '[0,1]',
        explanation:
          'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].',
      },
    ],
    constraints: [
      '1 ≤ numCourses ≤ 2000',
      '0 ≤ prerequisites.length ≤ numCourses * (numCourses - 1)',
      'prerequisites[i].length == 2',
      '0 ≤ ai, bi < numCourses',
      'ai != bi',
      'All the pairs [ai, bi] are distinct',
    ],
    correctPattern: 'Topological Sort',
    patterns: ['Topological Sort', 'DFS', 'BFS', 'Graph'],
    hints: {
      constraints: 'courses ≤ 2000 suggests topological sort',
      inputFormat: 'Number of courses, prerequisites',
      outputFormat: 'Array of course order',
      keywords: ['course schedule', 'topological sort', 'ordering'],
      bigO: "N ≤ 5,000 → Target: O(V+E). Topological Sort: Kahn's algorithm (BFS) or DFS.",
      pattern:
        "Input-Based Strategy: Graph → Topological Sort. Dependencies → use Kahn's algorithm (BFS with in-degree tracking).",
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'network-delay-time',
    title: 'Network Delay Time',
    description:
      'You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal.',
    examples: [
      {
        input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2',
        output: '2',
      },
    ],
    constraints: [
      '1 ≤ k ≤ n ≤ 100',
      '1 ≤ times.length ≤ 6000',
      'times[i].length == 3',
      '1 ≤ ui, vi ≤ n',
      'ui != vi',
      '0 ≤ wi ≤ 100',
      'All the pairs (ui, vi) are unique',
    ],
    correctPattern: 'BFS',
    patterns: ['BFS', 'Dijkstra', 'Graph', 'Heap / Priority Queue'],
    hints: {
      constraints: 'n ≤ 100 suggests Dijkstra or BFS',
      inputFormat: 'Times array, n nodes, source k',
      outputFormat: 'Single number (min time)',
      keywords: ['network delay', 'shortest path', 'Dijkstra'],
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'cheapest-flights',
    title: 'Cheapest Flights Within K Stops',
    description:
      'There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops.',
    examples: [
      {
        input:
          'n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1',
        output: '700',
        explanation:
          'The optimal path with at most 1 stop from city 0 to 3 is marked in red and costs 100 + 600 = 700.',
      },
    ],
    constraints: [
      '1 ≤ n ≤ 100',
      '0 ≤ flights.length ≤ (n * (n - 1) / 2)',
      'flights[i].length == 3',
      '0 ≤ fromi, toi < n',
      'fromi != toi',
      '1 ≤ pricei ≤ 10⁴',
      'There will not be any multiple flights between two cities',
      '0 ≤ src, dst < n',
      'src != dst',
      '0 ≤ k < n',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'BFS', 'Dijkstra', 'Graph'],
    hints: {
      constraints: 'n ≤ 100, k < n suggests DP',
      inputFormat: 'Flights array, src, dst, k',
      outputFormat: 'Single number (cheapest price)',
      keywords: ['cheapest flights', 'at most k stops', 'DP'],
    },
    difficulty: 'medium',
    category: 'Graph',
  },
  {
    id: 'reconstruct-itinerary',
    title: 'Reconstruct Itinerary',
    description:
      'You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.',
    examples: [
      {
        input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
        output: '["JFK","MUC","LHR","SFO","SJC"]',
      },
    ],
    constraints: [
      '1 ≤ tickets.length ≤ 300',
      'tickets[i].length == 2',
      'fromi.length == 3',
      'toi.length == 3',
      'fromi and toi consist of uppercase English letters',
      'fromi != toi',
    ],
    correctPattern: 'DFS',
    patterns: ['DFS', 'Graph', 'Eulerian Path', 'Backtracking'],
    hints: {
      constraints: 'tickets ≤ 300 allows DFS',
      inputFormat: 'Array of tickets',
      outputFormat: 'Array of airports',
      keywords: ['reconstruct itinerary', 'Eulerian path', 'DFS'],
      bigO: 'N ≤ 5,000 → Target: O(E log E). DFS with backtracking, sort edges lexicographically.',
      pattern:
        'Input-Based Strategy: Graph → DFS. Eulerian Path: DFS with backtracking, visit edges in lexicographic order.',
      advancedLogic:
        'Eulerian Path: Start from "JFK", DFS greedily, backtrack if stuck. Reverse result for correct order.',
    },
    difficulty: 'hard',
    category: 'Graph',
  },
  // Batch 15: Advanced String & Matrix (10 problems)
  {
    id: 'multiply-strings',
    title: 'Multiply Strings',
    description:
      'Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.',
    examples: [
      {
        input: 'num1 = "2", num2 = "3"',
        output: '"6"',
      },
    ],
    constraints: [
      '1 ≤ num1.length, num2.length ≤ 200',
      'num1 and num2 consist of digits only',
      'Both num1 and num2 do not contain any leading zero, except the number 0 itself',
    ],
    correctPattern: 'Math',
    patterns: ['Math', 'String', 'Simulation', 'Array'],
    hints: {
      constraints: 'length ≤ 200 allows simulation',
      inputFormat: 'Two strings',
      outputFormat: 'String (product)',
      keywords: ['multiply strings', 'large numbers', 'simulation'],
    },
    difficulty: 'medium',
    category: 'String',
  },
  {
    id: 'simplify-path',
    title: 'Simplify Path',
    description:
      'Given a string path, which is an absolute path (starting with a slash "/") to a file or directory in a Unix-style file system, convert it to the simplified canonical path.',
    examples: [
      {
        input: 'path = "/home/"',
        output: '"/home"',
        explanation: 'Note that there is no trailing slash after the last directory name.',
      },
    ],
    constraints: [
      '1 ≤ path.length ≤ 3000',
      'path consists of English letters, digits, period ".", slash "/" or "_"',
      'path is a valid absolute Unix path',
    ],
    correctPattern: 'Stack',
    patterns: ['Stack', 'String', 'Simulation', 'Array'],
    hints: {
      constraints: 'length ≤ 3000 suggests stack',
      inputFormat: 'Unix path string',
      outputFormat: 'Simplified path string',
      keywords: ['simplify path', 'canonical', 'stack'],
    },
    difficulty: 'medium',
    category: 'String',
  },
  {
    id: 'min-window-subsequence',
    title: 'Minimum Window Subsequence',
    description:
      'Given strings s1 and s2, return the minimum (contiguous) substring part of s1, so that s2 is a subsequence of the part.',
    examples: [
      {
        input: 's1 = "abcdebdde", s2 = "bde"',
        output: '"bcde"',
        explanation:
          '"bcde" is the answer because it occurs before "bdde" which has the same length.',
      },
    ],
    constraints: [
      '1 ≤ s1.length ≤ 2 * 10⁴',
      '1 ≤ s2.length ≤ 100',
      's1 and s2 consist of lowercase English letters',
    ],
    correctPattern: 'Dynamic Programming',
    patterns: ['Dynamic Programming', 'Two Pointers', 'String', 'Sliding Window'],
    hints: {
      constraints: 's1 ≤ 2 * 10⁴, s2 ≤ 100 suggests DP',
      inputFormat: 'Two strings',
      outputFormat: 'String (minimum window)',
      keywords: ['minimum window', 'subsequence', 'DP'],
    },
    difficulty: 'hard',
    category: 'String',
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
    examples: [
      {
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[1,2,3,6,9,8,7,4,5]',
      },
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 ≤ m, n ≤ 10',
      '-100 ≤ matrix[i][j] ≤ 100',
    ],
    correctPattern: 'Matrix',
    patterns: ['Matrix', 'Simulation', 'Array', 'Two Pointers'],
    hints: {
      constraints: 'm, n ≤ 10 allows simulation',
      inputFormat: '2D matrix',
      outputFormat: 'Array in spiral order',
      keywords: ['spiral matrix', 'spiral order', 'simulation'],
      bigO: 'N ≤ 5,000 → Target: O(N²). Simulation: traverse right, down, left, up with boundary tracking.',
      pattern:
        'Input-Based Strategy: Matrix → Simulation. Use four boundaries (top, bottom, left, right), shrink after each direction.',
    },
    difficulty: 'medium',
    category: 'Matrix',
  },
  {
    id: 'rotate-image',
    title: 'Rotate Image',
    description:
      'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).',
    examples: [
      {
        input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
        output: '[[7,4,1],[8,5,2],[9,6,3]]',
      },
    ],
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 ≤ n ≤ 20',
      '-1000 ≤ matrix[i][j] ≤ 1000',
    ],
    correctPattern: 'Matrix',
    patterns: ['Matrix', 'Math', 'Array', 'Simulation'],
    hints: {
      constraints: 'n ≤ 20 allows in-place rotation',
      inputFormat: 'n x n matrix',
      outputFormat: 'Rotated matrix',
      keywords: ['rotate image', '90 degrees', 'clockwise'],
    },
    difficulty: 'medium',
    category: 'Matrix',
  },
  {
    id: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    description:
      "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.",
    examples: [
      {
        input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]',
        output: '[[1,0,1],[0,0,0],[1,0,1]]',
      },
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[0].length',
      '1 ≤ m, n ≤ 200',
      '-2³¹ ≤ matrix[i][j] ≤ 2³¹ - 1',
    ],
    correctPattern: 'Matrix',
    patterns: ['Matrix', 'Hash Map', 'Array', 'Simulation'],
    hints: {
      constraints: 'm, n ≤ 200 allows in-place',
      inputFormat: 'm x n matrix',
      outputFormat: 'Modified matrix',
      keywords: ['set matrix zeroes', 'in place', 'row and column'],
    },
    difficulty: 'medium',
    category: 'Matrix',
  },
  {
    id: 'game-of-life',
    title: 'Game of Life',
    description:
      'According to Wikipedia\'s article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970." The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0).',
    examples: [
      {
        input: 'board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]',
        output: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]',
      },
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 ≤ m, n ≤ 25',
      'board[i][j] is 0 or 1',
    ],
    correctPattern: 'Matrix',
    patterns: ['Matrix', 'Simulation', 'Array', 'Bit Manipulation'],
    hints: {
      constraints: 'm, n ≤ 25 allows simulation',
      inputFormat: 'Binary matrix',
      outputFormat: 'Next generation matrix',
      keywords: ['game of life', 'cellular automaton', 'simulation'],
      bigO: 'N ≤ 5,000 → Target: O(N²). Simulation: count neighbors, apply rules. Use extra state or copy matrix.',
      pattern:
        "Input-Based Strategy: Matrix → Simulation. Count live neighbors (8 directions), apply Conway's rules.",
      advancedLogic:
        'In-Place Marking: Use special values (2 = was dead, now alive; 3 = was alive, now dead) to track transitions.',
    },
    difficulty: 'medium',
    category: 'Matrix',
  },
  {
    id: 'valid-sudoku',
    title: 'Valid Sudoku',
    description:
      'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: Each row must contain the digits 1-9 without repetition. Each column must contain the digits 1-9 without repetition. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.',
    examples: [
      {
        input:
          'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: 'true',
      },
    ],
    constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit 1-9 or "."'],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Matrix', 'Set', 'Array'],
    hints: {
      constraints: '9x9 board suggests hash map',
      inputFormat: '9x9 Sudoku board',
      outputFormat: 'Boolean',
      keywords: ['valid sudoku', 'no repetition', 'hash map'],
      bigO: 'N ≤ 10⁶ → Target: O(N²). Hash Map tracks seen digits in rows, columns, boxes.',
      pattern:
        'Input-Based Strategy: Matrix → Hash Map. Use sets for rows, columns, and 3x3 boxes. Check for duplicates.',
    },
    difficulty: 'medium',
    category: 'Matrix',
  },
  {
    id: 'word-pattern',
    title: 'Word Pattern',
    description:
      'Given a pattern and a string s, find if s follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.',
    examples: [
      {
        input: 'pattern = "abba", s = "dog cat cat dog"',
        output: 'true',
      },
    ],
    constraints: [
      '1 ≤ pattern.length ≤ 300',
      'pattern contains only lower-case English letters',
      '1 ≤ s.length ≤ 3000',
      's contains only lowercase English letters and spaces " "',
      's does not contain any leading or trailing spaces',
      'All the words in s are separated by a single space',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'String', 'Bijection', 'Two Maps'],
    hints: {
      constraints: 'length ≤ 3000 suggests hash map',
      inputFormat: 'Pattern string, string s',
      outputFormat: 'Boolean',
      keywords: ['word pattern', 'bijection', 'hash map'],
    },
    difficulty: 'easy',
    category: 'String',
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    description:
      'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
    ],
    constraints: [
      '1 ≤ strs.length ≤ 10⁴',
      '0 ≤ strs[i].length ≤ 100',
      'strs[i] consists of lowercase English letters',
    ],
    correctPattern: 'Hash Map',
    patterns: ['Hash Map', 'Sorting', 'String', 'Array'],
    hints: {
      constraints: 'strs.length ≤ 10⁴ suggests hash map',
      inputFormat: 'Array of strings',
      outputFormat: 'List of lists (grouped)',
      keywords: ['group anagrams', 'anagrams', 'hash map'],
    },
    difficulty: 'medium',
    category: 'String',
  },
];

/**
 * Get problems filtered by difficulty and category
 */
export function getPatternProblems(
  difficulty?: 'easy' | 'medium' | 'hard' | 'all',
  category?: string,
): AlgorithmPatternProblem[] {
  let filtered = [...PATTERN_PROBLEMS];

  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter((p) => p.difficulty === difficulty);
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  return filtered;
}

/**
 * Get all unique categories
 */
export function getPatternCategories(): string[] {
  const categories = new Set(PATTERN_PROBLEMS.map((p) => p.category));
  return Array.from(categories).sort();
}
