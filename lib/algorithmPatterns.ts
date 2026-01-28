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
  | 'Interval';

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
    },
    difficulty: 'medium',
    category: 'Array',
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
