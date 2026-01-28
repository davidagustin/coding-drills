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
  | 'Set';

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
