// Algorithm Problems Data File
// Comprehensive collection of 150+ algorithm problems organized by pattern

export interface AlgorithmProblem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  patterns: string[];
  category: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints: string[];
  optimalPattern: string;
  optimalTimeComplexity: string;
  optimalSpaceComplexity: string;
}

export const algorithmProblems: AlgorithmProblem[] = [
  // ==================== TWO POINTERS (12 problems) ====================
  {
    id: 'tp-001',
    title: 'Pair Sum Target',
    difficulty: 'easy',
    patterns: ['two-pointers', 'hash-table'],
    category: 'Arrays',
    description: 'Given a sorted array of integers and a target value, find two numbers that add up to the target. Return the indices of these two numbers.',
    examples: [
      { input: 'nums = [1, 2, 4, 6, 8, 9], target = 10', output: '[1, 4]', explanation: 'nums[1] + nums[4] = 2 + 8 = 10' },
      { input: 'nums = [2, 3, 5, 8], target = 10', output: '[0, 3]', explanation: '2 + 8 = 10' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Array is sorted in ascending order', 'Exactly one solution exists'],
    hints: ['Use two pointers at the start and end', 'Move pointers based on current sum vs target'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-002',
    title: 'Three Number Sum',
    difficulty: 'medium',
    patterns: ['two-pointers', 'sorting'],
    category: 'Arrays',
    description: 'Find all unique triplets in an array that sum to zero. The solution set must not contain duplicate triplets.',
    examples: [
      { input: 'nums = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]', explanation: 'Two unique triplets sum to zero' },
      { input: 'nums = [0, 0, 0]', output: '[[0, 0, 0]]', explanation: 'Only one triplet possible' }
    ],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    hints: ['Sort the array first', 'Fix one element and use two pointers for the remaining two', 'Skip duplicates to avoid duplicate triplets'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n^2)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-003',
    title: 'Water Container',
    difficulty: 'medium',
    patterns: ['two-pointers', 'greedy'],
    category: 'Arrays',
    description: 'Given an array of heights representing vertical lines, find two lines that together with the x-axis form a container that holds the most water.',
    examples: [
      { input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', output: '49', explanation: 'Lines at index 1 and 8 form container with area 7 * 7 = 49' },
      { input: 'height = [1, 1]', output: '1', explanation: 'Only option is 1 * 1 = 1' }
    ],
    constraints: ['2 <= height.length <= 10^5', '0 <= height[i] <= 10^4'],
    hints: ['Start with widest container', 'Move the pointer pointing to shorter line', 'Track maximum area seen'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-004',
    title: 'Rainwater Trap',
    difficulty: 'hard',
    patterns: ['two-pointers', 'dynamic-programming', 'monotonic-stack'],
    category: 'Arrays',
    description: 'Given an elevation map where the width of each bar is 1, compute how much water can be trapped after raining.',
    examples: [
      { input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]', output: '6', explanation: 'Water fills the valleys between bars' },
      { input: 'height = [4, 2, 0, 3, 2, 5]', output: '9', explanation: 'Large valley in the middle traps water' }
    ],
    constraints: ['1 <= height.length <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    hints: ['Water at position i depends on min(maxLeft, maxRight) - height[i]', 'Two pointers can track max from each side', 'Process from the side with smaller max'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-005',
    title: 'Remove Duplicates In-Place',
    difficulty: 'easy',
    patterns: ['two-pointers'],
    category: 'Arrays',
    description: 'Remove duplicates from a sorted array in-place. Return the new length. Elements beyond the new length do not matter.',
    examples: [
      { input: 'nums = [1, 1, 2]', output: '2, nums = [1, 2, _]', explanation: 'Two unique elements remain' },
      { input: 'nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]', output: '5, nums = [0, 1, 2, 3, 4, ...]', explanation: 'Five unique elements' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100', 'Array is sorted in non-decreasing order'],
    hints: ['Use slow and fast pointers', 'Slow pointer marks position for next unique element', 'Fast pointer scans for new unique values'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-006',
    title: 'Sorted Squares',
    difficulty: 'easy',
    patterns: ['two-pointers'],
    category: 'Arrays',
    description: 'Given a sorted array of integers, return an array of the squares of each number, also sorted in non-decreasing order.',
    examples: [
      { input: 'nums = [-4, -1, 0, 3, 10]', output: '[0, 1, 9, 16, 100]', explanation: 'Squares sorted in ascending order' },
      { input: 'nums = [-7, -3, 2, 3, 11]', output: '[4, 9, 9, 49, 121]', explanation: 'Handle negative numbers properly' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'Array is sorted in non-decreasing order'],
    hints: ['Largest squares come from either end', 'Use two pointers at both ends', 'Fill result array from the end'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'tp-007',
    title: 'Four Number Sum',
    difficulty: 'medium',
    patterns: ['two-pointers', 'hash-table'],
    category: 'Arrays',
    description: 'Find all unique quadruplets in an array that sum to a target value. Avoid duplicate quadruplets.',
    examples: [
      { input: 'nums = [1, 0, -1, 0, -2, 2], target = 0', output: '[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]', explanation: 'Three unique quadruplets sum to 0' },
      { input: 'nums = [2, 2, 2, 2, 2], target = 8', output: '[[2, 2, 2, 2]]', explanation: 'Only one quadruplet possible' }
    ],
    constraints: ['1 <= nums.length <= 200', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    hints: ['Sort array first', 'Fix two elements, use two pointers for remaining two', 'Skip duplicates at each level'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n^3)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-008',
    title: 'Valid Palindrome',
    difficulty: 'easy',
    patterns: ['two-pointers', 'string'],
    category: 'Strings',
    description: 'Determine if a string is a palindrome, considering only alphanumeric characters and ignoring case.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: 'Ignoring non-alphanumeric: "amanaplanacanalpanama" is palindrome' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome' }
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 'String contains printable ASCII characters'],
    hints: ['Use two pointers from both ends', 'Skip non-alphanumeric characters', 'Compare characters case-insensitively'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-009',
    title: 'Closest Three Sum',
    difficulty: 'medium',
    patterns: ['two-pointers', 'sorting'],
    category: 'Arrays',
    description: 'Find three integers whose sum is closest to a target. Return the sum of the three integers.',
    examples: [
      { input: 'nums = [-1, 2, 1, -4], target = 1', output: '2', explanation: 'Closest sum is -1 + 2 + 1 = 2' },
      { input: 'nums = [0, 0, 0], target = 1', output: '0', explanation: 'Only option is 0 + 0 + 0 = 0' }
    ],
    constraints: ['3 <= nums.length <= 500', '-1000 <= nums[i] <= 1000', '-10^4 <= target <= 10^4'],
    hints: ['Sort the array', 'Track closest sum found so far', 'Use two pointers after fixing first element'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n^2)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-010',
    title: 'Move Zeros',
    difficulty: 'easy',
    patterns: ['two-pointers'],
    category: 'Arrays',
    description: 'Move all zeros to the end of an array while maintaining the relative order of non-zero elements. Do this in-place.',
    examples: [
      { input: 'nums = [0, 1, 0, 3, 12]', output: '[1, 3, 12, 0, 0]', explanation: 'Non-zero elements maintain order' },
      { input: 'nums = [0]', output: '[0]', explanation: 'Single zero stays in place' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    hints: ['Use slow pointer for next non-zero position', 'Fast pointer finds non-zero elements', 'Swap elements when fast finds non-zero'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'tp-011',
    title: 'Partition Array by Pivot',
    difficulty: 'medium',
    patterns: ['two-pointers'],
    category: 'Arrays',
    description: 'Partition an array around a pivot value. Elements less than pivot come first, then elements equal to pivot, then elements greater.',
    examples: [
      { input: 'nums = [9, 12, 5, 10, 14, 3, 10], pivot = 10', output: '[9, 5, 3, 10, 10, 12, 14]', explanation: 'Partitioned around 10' },
      { input: 'nums = [-3, 4, 3, 2], pivot = 2', output: '[-3, 2, 4, 3]', explanation: 'One element less, one equal, two greater' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^6 <= nums[i] <= 10^6', 'pivot exists in nums'],
    hints: ['Count elements in each partition first', 'Use three pointers for each section', 'Place elements in correct positions'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'tp-012',
    title: 'Reverse String In-Place',
    difficulty: 'easy',
    patterns: ['two-pointers'],
    category: 'Strings',
    description: 'Reverse a string in-place using O(1) extra memory. The input is given as an array of characters.',
    examples: [
      { input: 's = ["h", "e", "l", "l", "o"]', output: '["o", "l", "l", "e", "h"]', explanation: 'Characters reversed in place' },
      { input: 's = ["H", "a", "n", "n", "a", "h"]', output: '["h", "a", "n", "n", "a", "H"]', explanation: 'Palindrome name reversed' }
    ],
    constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ASCII character'],
    hints: ['Use two pointers at start and end', 'Swap characters and move pointers toward center', 'Stop when pointers meet or cross'],
    optimalPattern: 'two-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },

  // ==================== SLIDING WINDOW (10 problems) ====================
  {
    id: 'sw-001',
    title: 'Longest Unique Substring',
    difficulty: 'medium',
    patterns: ['sliding-window', 'hash-table'],
    category: 'Strings',
    description: 'Find the length of the longest substring without any repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: '"abc" is the longest unique substring' },
      { input: 's = "bbbbb"', output: '1', explanation: '"b" is the only unique character' },
      { input: 's = "pwwkew"', output: '3', explanation: '"wke" is the longest, "pwke" is subsequence not substring' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
    hints: ['Use a sliding window with a hash set', 'Shrink window when duplicate found', 'Track maximum length seen'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(min(m, n))'
  },
  {
    id: 'sw-002',
    title: 'Maximum Sum Subarray of Size K',
    difficulty: 'easy',
    patterns: ['sliding-window'],
    category: 'Arrays',
    description: 'Find the maximum sum of any contiguous subarray of size k.',
    examples: [
      { input: 'nums = [2, 1, 5, 1, 3, 2], k = 3', output: '9', explanation: 'Subarray [5, 1, 3] has max sum 9' },
      { input: 'nums = [2, 3, 4, 1, 5], k = 2', output: '7', explanation: 'Subarray [3, 4] has max sum 7' }
    ],
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    hints: ['Calculate sum of first k elements', 'Slide window: add new element, remove old', 'Track maximum sum'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'sw-003',
    title: 'Minimum Window Containing Substring',
    difficulty: 'hard',
    patterns: ['sliding-window', 'hash-table'],
    category: 'Strings',
    description: 'Find the minimum window in string s that contains all characters of string t (including duplicates).',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'Minimum window containing A, B, C' },
      { input: 's = "a", t = "a"', output: '"a"', explanation: 'Exact match' },
      { input: 's = "a", t = "aa"', output: '""', explanation: 'Not enough characters' }
    ],
    constraints: ['1 <= s.length, t.length <= 10^5', 's and t consist of uppercase and lowercase English letters'],
    hints: ['Use frequency map for target characters', 'Expand window until valid, then contract', 'Track minimum valid window'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(m + n)',
    optimalSpaceComplexity: 'O(m + n)'
  },
  {
    id: 'sw-004',
    title: 'Longest Substring with K Distinct',
    difficulty: 'medium',
    patterns: ['sliding-window', 'hash-table'],
    category: 'Strings',
    description: 'Find the length of the longest substring with at most k distinct characters.',
    examples: [
      { input: 's = "eceba", k = 2', output: '3', explanation: '"ece" has 2 distinct characters' },
      { input: 's = "aa", k = 1', output: '2', explanation: '"aa" has 1 distinct character' }
    ],
    constraints: ['1 <= s.length <= 5 * 10^4', '0 <= k <= 50'],
    hints: ['Use hash map to track character frequencies', 'Shrink window when distinct count exceeds k', 'Update max length for valid windows'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(k)'
  },
  {
    id: 'sw-005',
    title: 'Permutation in String',
    difficulty: 'medium',
    patterns: ['sliding-window', 'hash-table'],
    category: 'Strings',
    description: 'Check if any permutation of s1 exists as a substring in s2.',
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: '"ba" is a permutation of "ab"' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false', explanation: 'No permutation found' }
    ],
    constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters'],
    hints: ['Use fixed-size sliding window of length s1', 'Compare character frequencies', 'Use array for frequency counting'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'sw-006',
    title: 'Fruit Basket Collection',
    difficulty: 'medium',
    patterns: ['sliding-window', 'hash-table'],
    category: 'Arrays',
    description: 'You have two baskets. Each basket can hold only one type of fruit. Find the maximum number of fruits you can collect from a row of trees.',
    examples: [
      { input: 'fruits = [1, 2, 1]', output: '3', explanation: 'Collect all fruits using both baskets' },
      { input: 'fruits = [0, 1, 2, 2]', output: '3', explanation: 'Collect [1, 2, 2] for 3 fruits' },
      { input: 'fruits = [1, 2, 3, 2, 2]', output: '4', explanation: 'Collect [2, 3, 2, 2] for 4 fruits' }
    ],
    constraints: ['1 <= fruits.length <= 10^5', '0 <= fruits[i] < fruits.length'],
    hints: ['This is longest substring with at most 2 distinct', 'Use sliding window with hash map', 'Shrink when more than 2 types'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'sw-007',
    title: 'Subarray Product Less Than K',
    difficulty: 'medium',
    patterns: ['sliding-window'],
    category: 'Arrays',
    description: 'Count the number of contiguous subarrays where the product of all elements is strictly less than k.',
    examples: [
      { input: 'nums = [10, 5, 2, 6], k = 100', output: '8', explanation: 'Valid subarrays: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]' },
      { input: 'nums = [1, 2, 3], k = 0', output: '0', explanation: 'No subarray has product < 0' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '1 <= nums[i] <= 1000', '0 <= k <= 10^6'],
    hints: ['Use sliding window with product tracking', 'Each valid window ending at i contributes (i - left + 1) subarrays', 'Shrink window when product >= k'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'sw-008',
    title: 'Maximum Consecutive Ones After Flip',
    difficulty: 'medium',
    patterns: ['sliding-window'],
    category: 'Arrays',
    description: 'Given a binary array, find the maximum number of consecutive 1s if you can flip at most k zeros.',
    examples: [
      { input: 'nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k = 2', output: '6', explanation: 'Flip zeros at indices 5 and 10' },
      { input: 'nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k = 3', output: '10', explanation: 'Flip optimally' }
    ],
    constraints: ['1 <= nums.length <= 10^5', 'nums[i] is 0 or 1', '0 <= k <= nums.length'],
    hints: ['Sliding window tracking zero count', 'Expand right, shrink left when zeros > k', 'Track maximum window size'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'sw-009',
    title: 'Find All Anagrams',
    difficulty: 'medium',
    patterns: ['sliding-window', 'hash-table'],
    category: 'Strings',
    description: 'Find all start indices of anagrams of pattern p in string s.',
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: '[0, 6]', explanation: '"cba" at index 0, "bac" at index 6' },
      { input: 's = "abab", p = "ab"', output: '[0, 1, 2]', explanation: 'Overlapping anagrams' }
    ],
    constraints: ['1 <= s.length, p.length <= 3 * 10^4', 's and p consist of lowercase English letters'],
    hints: ['Use fixed-size sliding window', 'Compare character counts efficiently', 'Track matching character count'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'sw-010',
    title: 'Sliding Window Maximum',
    difficulty: 'hard',
    patterns: ['sliding-window', 'monotonic-deque'],
    category: 'Arrays',
    description: 'Return the maximum value in each sliding window of size k as it moves from left to right.',
    examples: [
      { input: 'nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3', output: '[3, 3, 5, 5, 6, 7]', explanation: 'Max in each window of size 3' },
      { input: 'nums = [1], k = 1', output: '[1]', explanation: 'Single element window' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
    hints: ['Use monotonic decreasing deque', 'Front of deque is always max in window', 'Remove elements outside window and smaller than current'],
    optimalPattern: 'sliding-window',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(k)'
  },

  // ==================== BINARY SEARCH (12 problems) ====================
  {
    id: 'bs-001',
    title: 'Classic Binary Search',
    difficulty: 'easy',
    patterns: ['binary-search'],
    category: 'Arrays',
    description: 'Search for a target value in a sorted array. Return its index or -1 if not found.',
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4', explanation: '9 is at index 4' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1', explanation: '2 is not in array' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique', 'nums is sorted in ascending order'],
    hints: ['Compare middle element with target', 'Narrow search space by half each time', 'Be careful with integer overflow in mid calculation'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-002',
    title: 'Search in Rotated Array',
    difficulty: 'medium',
    patterns: ['binary-search'],
    category: 'Arrays',
    description: 'Search for a target in a sorted array that has been rotated at an unknown pivot. All values are unique.',
    examples: [
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0', output: '4', explanation: '0 is at index 4' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3', output: '-1', explanation: '3 not found' }
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values are unique', 'nums was sorted then rotated'],
    hints: ['One half is always sorted', 'Determine which half is sorted', 'Check if target is in sorted half'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-003',
    title: 'Find First and Last Position',
    difficulty: 'medium',
    patterns: ['binary-search'],
    category: 'Arrays',
    description: 'Find the starting and ending position of a target value in a sorted array. Return [-1, -1] if not found.',
    examples: [
      { input: 'nums = [5, 7, 7, 8, 8, 10], target = 8', output: '[3, 4]', explanation: '8 appears at indices 3 and 4' },
      { input: 'nums = [5, 7, 7, 8, 8, 10], target = 6', output: '[-1, -1]', explanation: '6 not found' }
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'nums is sorted in non-decreasing order'],
    hints: ['Use two binary searches', 'First search finds leftmost occurrence', 'Second search finds rightmost occurrence'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-004',
    title: 'Search Insert Position',
    difficulty: 'easy',
    patterns: ['binary-search'],
    category: 'Arrays',
    description: 'Find the index where a target should be inserted in a sorted array. If target exists, return its index.',
    examples: [
      { input: 'nums = [1, 3, 5, 6], target = 5', output: '2', explanation: '5 found at index 2' },
      { input: 'nums = [1, 3, 5, 6], target = 2', output: '1', explanation: '2 should be inserted at index 1' },
      { input: 'nums = [1, 3, 5, 6], target = 7', output: '4', explanation: '7 should be inserted at end' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums contains distinct values sorted in ascending order'],
    hints: ['Standard binary search with modification', 'Return left pointer when target not found', 'Left pointer will be at correct insert position'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-005',
    title: 'Find Peak Element',
    difficulty: 'medium',
    patterns: ['binary-search'],
    category: 'Arrays',
    description: 'Find a peak element (greater than its neighbors) in an array. Return any peak index. Array boundaries are -infinity.',
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: '2', explanation: '3 is a peak element' },
      { input: 'nums = [1, 2, 1, 3, 5, 6, 4]', output: '5 (or 1)', explanation: 'Either 6 or 2 is valid' }
    ],
    constraints: ['1 <= nums.length <= 1000', '-2^31 <= nums[i] <= 2^31 - 1', 'nums[i] != nums[i + 1] for all valid i'],
    hints: ['Binary search on the slope', 'If mid > mid+1, peak is on left (including mid)', 'If mid < mid+1, peak is on right'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-006',
    title: 'Minimum in Rotated Sorted Array',
    difficulty: 'medium',
    patterns: ['binary-search'],
    category: 'Arrays',
    description: 'Find the minimum element in a sorted array that has been rotated at an unknown pivot.',
    examples: [
      { input: 'nums = [3, 4, 5, 1, 2]', output: '1', explanation: 'Minimum is 1' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2]', output: '0', explanation: 'Array rotated at index 4' }
    ],
    constraints: ['1 <= nums.length <= 5000', '-5000 <= nums[i] <= 5000', 'All integers are unique', 'nums was sorted then rotated'],
    hints: ['Compare mid with rightmost element', 'If mid > right, minimum is in right half', 'If mid <= right, minimum is in left half (including mid)'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-007',
    title: 'Search 2D Matrix',
    difficulty: 'medium',
    patterns: ['binary-search'],
    category: 'Matrix',
    description: 'Search for a value in an m x n matrix where each row is sorted and the first integer of each row is greater than the last integer of the previous row.',
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true', explanation: '3 exists in matrix' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false', explanation: '13 not found' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 100', '-10^4 <= matrix[i][j], target <= 10^4'],
    hints: ['Treat matrix as 1D sorted array', 'Convert 1D index to 2D: row = idx/cols, col = idx%cols', 'Single binary search works'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log(m*n))',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-008',
    title: 'Koko Eating Bananas',
    difficulty: 'medium',
    patterns: ['binary-search'],
    category: 'Arrays',
    description: 'Koko has piles of bananas and h hours. Find the minimum eating speed k (bananas per hour) to finish all bananas within h hours.',
    examples: [
      { input: 'piles = [3, 6, 7, 11], h = 8', output: '4', explanation: 'At speed 4: 1+2+2+3 = 8 hours' },
      { input: 'piles = [30, 11, 23, 4, 20], h = 5', output: '30', explanation: 'Must eat largest pile in one hour' }
    ],
    constraints: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9', '1 <= piles[i] <= 10^9'],
    hints: ['Binary search on eating speed', 'Range is [1, max(piles)]', 'For each speed, calculate total hours needed'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(n * log(max))',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-009',
    title: 'Square Root',
    difficulty: 'easy',
    patterns: ['binary-search'],
    category: 'Math',
    description: 'Compute the integer square root of a non-negative integer. Truncate the decimal part.',
    examples: [
      { input: 'x = 4', output: '2', explanation: 'sqrt(4) = 2' },
      { input: 'x = 8', output: '2', explanation: 'sqrt(8) = 2.828..., truncated to 2' }
    ],
    constraints: ['0 <= x <= 2^31 - 1'],
    hints: ['Binary search in range [0, x]', 'Find largest n where n*n <= x', 'Be careful with integer overflow'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-010',
    title: 'Capacity to Ship Packages',
    difficulty: 'medium',
    patterns: ['binary-search', 'greedy'],
    category: 'Arrays',
    description: 'Find the minimum ship capacity needed to ship all packages within d days, maintaining order.',
    examples: [
      { input: 'weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days = 5', output: '15', explanation: 'Ship with capacity 15 in 5 days' },
      { input: 'weights = [3, 2, 2, 4, 1, 4], days = 3', output: '6', explanation: 'Minimum capacity of 6' }
    ],
    constraints: ['1 <= days <= weights.length <= 5 * 10^4', '1 <= weights[i] <= 500'],
    hints: ['Binary search on capacity', 'Range is [max(weights), sum(weights)]', 'Greedy check if capacity works within days'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(n * log(sum))',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-011',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    patterns: ['binary-search'],
    category: 'Arrays',
    description: 'Find the median of two sorted arrays. The overall runtime should be O(log(m+n)).',
    examples: [
      { input: 'nums1 = [1, 3], nums2 = [2]', output: '2.0', explanation: 'Merged: [1,2,3], median = 2' },
      { input: 'nums1 = [1, 2], nums2 = [3, 4]', output: '2.5', explanation: 'Merged: [1,2,3,4], median = (2+3)/2 = 2.5' }
    ],
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m, n <= 1000', '1 <= m + n <= 2000'],
    hints: ['Binary search on smaller array', 'Partition both arrays at correct positions', 'Ensure all left elements <= all right elements'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(log(min(m, n)))',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'bs-012',
    title: 'Split Array Largest Sum',
    difficulty: 'hard',
    patterns: ['binary-search', 'dynamic-programming'],
    category: 'Arrays',
    description: 'Split an array into k non-empty subarrays to minimize the largest sum among subarrays.',
    examples: [
      { input: 'nums = [7, 2, 5, 10, 8], k = 2', output: '18', explanation: 'Split into [7,2,5] and [10,8], max sum is 18' },
      { input: 'nums = [1, 2, 3, 4, 5], k = 2', output: '9', explanation: 'Split into [1,2,3,4] and [5], max sum is 10, but [1,2,3] and [4,5] gives 9' }
    ],
    constraints: ['1 <= nums.length <= 1000', '0 <= nums[i] <= 10^6', '1 <= k <= min(50, nums.length)'],
    hints: ['Binary search on the answer (max subarray sum)', 'Range is [max(nums), sum(nums)]', 'Greedy check if can split into <= k parts'],
    optimalPattern: 'binary-search',
    optimalTimeComplexity: 'O(n * log(sum))',
    optimalSpaceComplexity: 'O(1)'
  },

  // ==================== PREFIX SUM (8 problems) ====================
  {
    id: 'ps-001',
    title: 'Range Sum Query',
    difficulty: 'easy',
    patterns: ['prefix-sum'],
    category: 'Arrays',
    description: 'Given an array, handle multiple queries to find the sum of elements between indices i and j (inclusive).',
    examples: [
      { input: 'nums = [-2, 0, 3, -5, 2, -1], sumRange(0, 2)', output: '1', explanation: '-2 + 0 + 3 = 1' },
      { input: 'nums = [-2, 0, 3, -5, 2, -1], sumRange(2, 5)', output: '-1', explanation: '3 + (-5) + 2 + (-1) = -1' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-10^5 <= nums[i] <= 10^5', '0 <= i <= j < nums.length', 'At most 10^4 queries'],
    hints: ['Precompute prefix sums', 'sum(i, j) = prefix[j+1] - prefix[i]', 'O(1) per query after O(n) preprocessing'],
    optimalPattern: 'prefix-sum',
    optimalTimeComplexity: 'O(1) per query',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'ps-002',
    title: 'Subarray Sum Equals K',
    difficulty: 'medium',
    patterns: ['prefix-sum', 'hash-table'],
    category: 'Arrays',
    description: 'Count the number of contiguous subarrays whose sum equals k.',
    examples: [
      { input: 'nums = [1, 1, 1], k = 2', output: '2', explanation: '[1,1] appears twice' },
      { input: 'nums = [1, 2, 3], k = 3', output: '2', explanation: '[1,2] and [3]' }
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    hints: ['Use prefix sum with hash map', 'If prefix[j] - prefix[i] = k, subarray (i,j] sums to k', 'Count how many times (current_sum - k) appeared before'],
    optimalPattern: 'prefix-sum',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'ps-003',
    title: 'Contiguous Array',
    difficulty: 'medium',
    patterns: ['prefix-sum', 'hash-table'],
    category: 'Arrays',
    description: 'Find the maximum length of a contiguous subarray with equal number of 0s and 1s.',
    examples: [
      { input: 'nums = [0, 1]', output: '2', explanation: '[0, 1] has equal 0s and 1s' },
      { input: 'nums = [0, 1, 0]', output: '2', explanation: '[0, 1] or [1, 0]' }
    ],
    constraints: ['1 <= nums.length <= 10^5', 'nums[i] is 0 or 1'],
    hints: ['Transform 0 to -1', 'Problem becomes finding longest subarray with sum 0', 'Use prefix sum and hash map to store first occurrence'],
    optimalPattern: 'prefix-sum',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'ps-004',
    title: 'Product of Array Except Self',
    difficulty: 'medium',
    patterns: ['prefix-sum'],
    category: 'Arrays',
    description: 'For each index, compute the product of all elements except the one at that index without using division.',
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]', explanation: 'Products: 2*3*4, 1*3*4, 1*2*4, 1*2*3' },
      { input: 'nums = [-1, 1, 0, -3, 3]', output: '[0, 0, 9, 0, 0]', explanation: 'Zeros make most products zero' }
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'Product of any prefix/suffix fits in 32-bit integer'],
    hints: ['Compute prefix products from left', 'Compute suffix products from right', 'Result[i] = prefix[i-1] * suffix[i+1]'],
    optimalPattern: 'prefix-sum',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'ps-005',
    title: 'Subarray Sums Divisible by K',
    difficulty: 'medium',
    patterns: ['prefix-sum', 'hash-table'],
    category: 'Arrays',
    description: 'Return the number of subarrays whose sum is divisible by k.',
    examples: [
      { input: 'nums = [4, 5, 0, -2, -3, 1], k = 5', output: '7', explanation: '7 subarrays with sum divisible by 5' },
      { input: 'nums = [5], k = 9', output: '0', explanation: 'No subarray sum divisible by 9' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-10^4 <= nums[i] <= 10^4', '2 <= k <= 10^4'],
    hints: ['If two prefix sums have same remainder mod k, subarray between them is divisible by k', 'Use hash map to count remainders', 'Handle negative remainders properly'],
    optimalPattern: 'prefix-sum',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(k)'
  },
  {
    id: 'ps-006',
    title: '2D Range Sum Query',
    difficulty: 'medium',
    patterns: ['prefix-sum'],
    category: 'Matrix',
    description: 'Handle multiple queries to calculate the sum of elements in a rectangular region of a 2D matrix.',
    examples: [
      { input: 'matrix = [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], sumRegion(2,1,4,3)', output: '8', explanation: 'Sum of marked region' },
      { input: 'matrix = [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], sumRegion(1,1,2,2)', output: '11', explanation: '6+3+2+0 = 11' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200', 'At most 10^4 queries'],
    hints: ['Compute 2D prefix sum matrix', 'prefix[i][j] = sum of rectangle from (0,0) to (i-1,j-1)', 'Use inclusion-exclusion for query'],
    optimalPattern: 'prefix-sum',
    optimalTimeComplexity: 'O(1) per query',
    optimalSpaceComplexity: 'O(m*n)'
  },
  {
    id: 'ps-007',
    title: 'Pivot Index',
    difficulty: 'easy',
    patterns: ['prefix-sum'],
    category: 'Arrays',
    description: 'Find the pivot index where the sum of elements to the left equals the sum of elements to the right.',
    examples: [
      { input: 'nums = [1, 7, 3, 6, 5, 6]', output: '3', explanation: 'Left sum: 1+7+3=11, Right sum: 5+6=11' },
      { input: 'nums = [1, 2, 3]', output: '-1', explanation: 'No pivot index exists' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '-1000 <= nums[i] <= 1000'],
    hints: ['Compute total sum first', 'Track left sum while iterating', 'Right sum = total - leftSum - nums[i]'],
    optimalPattern: 'prefix-sum',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'ps-008',
    title: 'Maximum Size Subarray Sum Equals K',
    difficulty: 'medium',
    patterns: ['prefix-sum', 'hash-table'],
    category: 'Arrays',
    description: 'Find the maximum length of a subarray that sums to k.',
    examples: [
      { input: 'nums = [1, -1, 5, -2, 3], k = 3', output: '4', explanation: '[1, -1, 5, -2] sums to 3' },
      { input: 'nums = [-2, -1, 2, 1], k = 1', output: '2', explanation: '[-1, 2] sums to 1' }
    ],
    constraints: ['1 <= nums.length <= 2 * 10^5', '-10^4 <= nums[i] <= 10^4', '-10^9 <= k <= 10^9'],
    hints: ['Use prefix sum with hash map', 'Store first occurrence of each prefix sum', 'For max length, earlier occurrence is better'],
    optimalPattern: 'prefix-sum',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },

  // ==================== FAST & SLOW POINTERS (8 problems) ====================
  {
    id: 'fsp-001',
    title: 'Cycle Detection in Linked List',
    difficulty: 'easy',
    patterns: ['fast-slow-pointers'],
    category: 'Linked Lists',
    description: 'Determine if a linked list contains a cycle.',
    examples: [
      { input: 'head = [3, 2, 0, -4], pos = 1', output: 'true', explanation: 'Tail connects to node at index 1' },
      { input: 'head = [1, 2], pos = 0', output: 'true', explanation: 'Tail connects to head' },
      { input: 'head = [1], pos = -1', output: 'false', explanation: 'No cycle' }
    ],
    constraints: ['Number of nodes is in range [0, 10^4]', '-10^5 <= Node.val <= 10^5', 'pos is -1 or valid index'],
    hints: ['Use slow and fast pointers', 'Slow moves 1 step, fast moves 2 steps', 'If they meet, there is a cycle'],
    optimalPattern: 'fast-slow-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'fsp-002',
    title: 'Find Cycle Start',
    difficulty: 'medium',
    patterns: ['fast-slow-pointers'],
    category: 'Linked Lists',
    description: 'Return the node where a cycle begins in a linked list, or null if there is no cycle.',
    examples: [
      { input: 'head = [3, 2, 0, -4], pos = 1', output: 'Node with value 2', explanation: 'Cycle starts at index 1' },
      { input: 'head = [1, 2], pos = 0', output: 'Node with value 1', explanation: 'Cycle starts at head' }
    ],
    constraints: ['Number of nodes is in range [0, 10^4]', '-10^5 <= Node.val <= 10^5'],
    hints: ['First detect if cycle exists', 'When pointers meet, move one to head', 'Move both one step until they meet again'],
    optimalPattern: 'fast-slow-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'fsp-003',
    title: 'Find Middle of Linked List',
    difficulty: 'easy',
    patterns: ['fast-slow-pointers'],
    category: 'Linked Lists',
    description: 'Return the middle node of a linked list. If two middle nodes, return the second one.',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: 'Node with value 3', explanation: 'Middle of 5 nodes' },
      { input: 'head = [1, 2, 3, 4, 5, 6]', output: 'Node with value 4', explanation: 'Second of two middles' }
    ],
    constraints: ['Number of nodes is in range [1, 100]', '1 <= Node.val <= 100'],
    hints: ['Slow pointer moves 1 step', 'Fast pointer moves 2 steps', 'When fast reaches end, slow is at middle'],
    optimalPattern: 'fast-slow-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'fsp-004',
    title: 'Happy Number',
    difficulty: 'easy',
    patterns: ['fast-slow-pointers', 'hash-table'],
    category: 'Math',
    description: 'Determine if a number is happy. A happy number eventually reaches 1 when repeatedly replaced by the sum of squares of its digits.',
    examples: [
      { input: 'n = 19', output: 'true', explanation: '1^2 + 9^2 = 82 -> 8^2 + 2^2 = 68 -> ... -> 1' },
      { input: 'n = 2', output: 'false', explanation: 'Enters a cycle, never reaches 1' }
    ],
    constraints: ['1 <= n <= 2^31 - 1'],
    hints: ['If not happy, it will cycle', 'Use cycle detection with fast/slow pointers', 'Fast computes two steps, slow computes one'],
    optimalPattern: 'fast-slow-pointers',
    optimalTimeComplexity: 'O(log n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'fsp-005',
    title: 'Palindrome Linked List',
    difficulty: 'easy',
    patterns: ['fast-slow-pointers'],
    category: 'Linked Lists',
    description: 'Check if a singly linked list is a palindrome using O(1) extra space.',
    examples: [
      { input: 'head = [1, 2, 2, 1]', output: 'true', explanation: 'Reads same forwards and backwards' },
      { input: 'head = [1, 2]', output: 'false', explanation: 'Not a palindrome' }
    ],
    constraints: ['Number of nodes is in range [1, 10^5]', '0 <= Node.val <= 9'],
    hints: ['Find middle using fast/slow pointers', 'Reverse second half', 'Compare first half with reversed second half'],
    optimalPattern: 'fast-slow-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'fsp-006',
    title: 'Reorder Linked List',
    difficulty: 'medium',
    patterns: ['fast-slow-pointers'],
    category: 'Linked Lists',
    description: 'Reorder list from L0->L1->...->Ln to L0->Ln->L1->Ln-1->L2->Ln-2->...',
    examples: [
      { input: 'head = [1, 2, 3, 4]', output: '[1, 4, 2, 3]', explanation: 'Alternating from ends' },
      { input: 'head = [1, 2, 3, 4, 5]', output: '[1, 5, 2, 4, 3]', explanation: 'Middle element stays' }
    ],
    constraints: ['Number of nodes is in range [1, 5 * 10^4]', '1 <= Node.val <= 1000'],
    hints: ['Find middle of list', 'Reverse second half', 'Merge two halves alternately'],
    optimalPattern: 'fast-slow-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'fsp-007',
    title: 'Find Duplicate Number',
    difficulty: 'medium',
    patterns: ['fast-slow-pointers', 'binary-search'],
    category: 'Arrays',
    description: 'Find the duplicate number in an array of n+1 integers where each integer is in [1, n]. Only one duplicate exists but may repeat multiple times.',
    examples: [
      { input: 'nums = [1, 3, 4, 2, 2]', output: '2', explanation: '2 is the duplicate' },
      { input: 'nums = [3, 1, 3, 4, 2]', output: '3', explanation: '3 is the duplicate' }
    ],
    constraints: ['1 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n', 'Only one duplicate number'],
    hints: ['Treat array as linked list where nums[i] points to index nums[i]', 'Use cycle detection', 'Duplicate number is where cycle begins'],
    optimalPattern: 'fast-slow-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },
  {
    id: 'fsp-008',
    title: 'Remove Nth Node From End',
    difficulty: 'medium',
    patterns: ['fast-slow-pointers'],
    category: 'Linked Lists',
    description: 'Remove the nth node from the end of a linked list and return the head.',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5], n = 2', output: '[1, 2, 3, 5]', explanation: 'Remove node 4' },
      { input: 'head = [1], n = 1', output: '[]', explanation: 'Remove only node' }
    ],
    constraints: ['Number of nodes is sz', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    hints: ['Move fast pointer n steps ahead', 'Move both until fast reaches end', 'Slow is at the node before target'],
    optimalPattern: 'fast-slow-pointers',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(1)'
  },

  // ==================== BFS (10 problems) ====================
  {
    id: 'bfs-001',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    patterns: ['bfs'],
    category: 'Trees',
    description: 'Return the level order traversal of a binary tree (nodes grouped by level from left to right).',
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '[[3], [9, 20], [15, 7]]', explanation: 'Three levels in the tree' },
      { input: 'root = [1]', output: '[[1]]', explanation: 'Single node tree' }
    ],
    constraints: ['Number of nodes is in range [0, 2000]', '-1000 <= Node.val <= 1000'],
    hints: ['Use queue for BFS', 'Process one level at a time', 'Track level size before processing'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'bfs-002',
    title: 'Shortest Path in Binary Matrix',
    difficulty: 'medium',
    patterns: ['bfs'],
    category: 'Matrix',
    description: 'Find the shortest clear path from top-left to bottom-right in a binary matrix. Can move in 8 directions. 0 is clear, 1 is blocked.',
    examples: [
      { input: 'grid = [[0,1],[1,0]]', output: '2', explanation: 'Path: (0,0) -> (1,1)' },
      { input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', output: '4', explanation: 'Zigzag path' }
    ],
    constraints: ['n == grid.length == grid[i].length', '1 <= n <= 100', 'grid[i][j] is 0 or 1'],
    hints: ['BFS from top-left corner', 'Explore all 8 directions', 'Track visited cells to avoid cycles'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(n^2)',
    optimalSpaceComplexity: 'O(n^2)'
  },
  {
    id: 'bfs-003',
    title: 'Rotting Oranges',
    difficulty: 'medium',
    patterns: ['bfs'],
    category: 'Matrix',
    description: 'In a grid with fresh (1) and rotten (2) oranges, rotten oranges spread to adjacent fresh ones each minute. Return minutes until no fresh oranges remain, or -1 if impossible.',
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4', explanation: '4 minutes for all to rot' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1', explanation: 'Bottom-left orange unreachable' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2'],
    hints: ['Multi-source BFS from all rotten oranges', 'Process level by level (each level is one minute)', 'Check if any fresh oranges remain'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(m*n)',
    optimalSpaceComplexity: 'O(m*n)'
  },
  {
    id: 'bfs-004',
    title: 'Word Ladder',
    difficulty: 'hard',
    patterns: ['bfs', 'hash-table'],
    category: 'Graphs',
    description: 'Transform one word to another changing one letter at a time. Each intermediate word must be in the word list. Return the shortest transformation sequence length.',
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: 'hit -> hot -> dot -> dog -> cog' },
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: '0', explanation: 'endWord not in list' }
    ],
    constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'All words have same length'],
    hints: ['BFS to find shortest path', 'Precompute word patterns for quick lookup', 'Use wildcard patterns like h*t'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(m^2 * n)',
    optimalSpaceComplexity: 'O(m^2 * n)'
  },
  {
    id: 'bfs-005',
    title: 'Minimum Depth of Binary Tree',
    difficulty: 'easy',
    patterns: ['bfs', 'dfs'],
    category: 'Trees',
    description: 'Find the minimum depth of a binary tree (shortest path from root to any leaf).',
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '2', explanation: 'Path to node 9' },
      { input: 'root = [2, null, 3, null, 4, null, 5, null, 6]', output: '5', explanation: 'Skewed tree' }
    ],
    constraints: ['Number of nodes is in range [0, 10^5]', '-1000 <= Node.val <= 1000'],
    hints: ['BFS finds minimum depth faster than DFS', 'Stop at first leaf node encountered', 'A leaf has no children'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'bfs-006',
    title: 'Number of Islands',
    difficulty: 'medium',
    patterns: ['bfs', 'dfs', 'union-find'],
    category: 'Matrix',
    description: 'Count the number of islands in a 2D grid where "1" is land and "0" is water. Islands are connected horizontally or vertically.',
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', explanation: 'One connected island' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3', explanation: 'Three separate islands' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1"'],
    hints: ['Iterate through grid finding land cells', 'BFS/DFS to mark entire island as visited', 'Count number of times you start a new search'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(m*n)',
    optimalSpaceComplexity: 'O(min(m,n))'
  },
  {
    id: 'bfs-007',
    title: 'Open the Lock',
    difficulty: 'medium',
    patterns: ['bfs'],
    category: 'Graphs',
    description: 'Find minimum turns to open a 4-wheel lock from "0000" to target, avoiding deadends. Each turn rotates one wheel by one slot.',
    examples: [
      { input: 'deadends = ["0201","0101","0102","1212","2002"], target = "0202"', output: '6', explanation: 'Optimal path avoids deadends' },
      { input: 'deadends = ["8888"], target = "0009"', output: '1', explanation: 'Simple one-step solution' }
    ],
    constraints: ['1 <= deadends.length <= 500', 'deadends[i].length == 4', 'target.length == 4', 'target is not in deadends'],
    hints: ['BFS from "0000"', 'Each state has 8 neighbors (4 wheels x 2 directions)', 'Use set for deadends and visited'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(10^4)',
    optimalSpaceComplexity: 'O(10^4)'
  },
  {
    id: 'bfs-008',
    title: 'Walls and Gates',
    difficulty: 'medium',
    patterns: ['bfs'],
    category: 'Matrix',
    description: 'In a grid with walls (-1), gates (0), and empty rooms (INF), fill each empty room with distance to its nearest gate.',
    examples: [
      { input: 'rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]', output: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]', explanation: 'Distances filled from gates' }
    ],
    constraints: ['m == rooms.length', 'n == rooms[i].length', '1 <= m, n <= 250', 'rooms[i][j] is -1, 0, or 2^31 - 1'],
    hints: ['Multi-source BFS starting from all gates', 'Process level by level', 'Update distances as you go'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(m*n)',
    optimalSpaceComplexity: 'O(m*n)'
  },
  {
    id: 'bfs-009',
    title: 'Clone Graph',
    difficulty: 'medium',
    patterns: ['bfs', 'dfs', 'hash-table'],
    category: 'Graphs',
    description: 'Return a deep copy of an undirected connected graph. Each node has a value and a list of neighbors.',
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'Copy of the graph structure' },
      { input: 'adjList = [[]]', output: '[[]]', explanation: 'Single node with no neighbors' }
    ],
    constraints: ['Number of nodes is in range [0, 100]', '1 <= Node.val <= 100', 'Node.val is unique for each node', 'No repeated edges or self-loops'],
    hints: ['Use hash map to track original->clone mapping', 'BFS/DFS to traverse and clone', 'Clone node when first visited'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(n + e)',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'bfs-010',
    title: 'All Nodes Distance K',
    difficulty: 'medium',
    patterns: ['bfs', 'dfs'],
    category: 'Trees',
    description: 'Return all nodes that are distance k from a target node in a binary tree.',
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2', output: '[7, 4, 1]', explanation: 'Nodes at distance 2 from node 5' },
      { input: 'root = [1], target = 1, k = 3', output: '[]', explanation: 'No nodes at distance 3' }
    ],
    constraints: ['Number of nodes is in range [1, 500]', '0 <= Node.val <= 500', 'All values are unique', 'target is in the tree'],
    hints: ['Build parent pointers or adjacency list', 'BFS from target node', 'Stop when distance equals k'],
    optimalPattern: 'bfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },

  // ==================== DFS (12 problems) ====================
  {
    id: 'dfs-001',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'easy',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Find the maximum depth of a binary tree (longest path from root to any leaf).',
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '3', explanation: 'Longest path has 3 nodes' },
      { input: 'root = [1, null, 2]', output: '2', explanation: 'Path 1 -> 2' }
    ],
    constraints: ['Number of nodes is in range [0, 10^4]', '-100 <= Node.val <= 100'],
    hints: ['Recursively compute depth of subtrees', 'Depth = 1 + max(leftDepth, rightDepth)', 'Base case: null node has depth 0'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-002',
    title: 'Path Sum',
    difficulty: 'easy',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Determine if a binary tree has a root-to-leaf path with nodes summing to a target value.',
    examples: [
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true', explanation: '5 + 4 + 11 + 2 = 22' },
      { input: 'root = [1,2,3], targetSum = 5', output: 'false', explanation: 'No path sums to 5' }
    ],
    constraints: ['Number of nodes is in range [0, 5000]', '-1000 <= Node.val <= 1000', '-1000 <= targetSum <= 1000'],
    hints: ['DFS from root tracking current sum', 'At leaf, check if sum equals target', 'Subtract node value as you recurse'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-003',
    title: 'Validate Binary Search Tree',
    difficulty: 'medium',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Determine if a binary tree is a valid BST (left subtree values < node < right subtree values).',
    examples: [
      { input: 'root = [2, 1, 3]', output: 'true', explanation: 'Valid BST' },
      { input: 'root = [5, 1, 4, null, null, 3, 6]', output: 'false', explanation: 'Node 4 is in wrong position' }
    ],
    constraints: ['Number of nodes is in range [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    hints: ['Track valid range for each node', 'Range narrows as you go down', 'Inorder traversal should be sorted'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-004',
    title: 'Lowest Common Ancestor',
    difficulty: 'medium',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Find the lowest common ancestor of two nodes in a binary tree. A node can be ancestor of itself.',
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3', explanation: 'LCA of 5 and 1 is 3' },
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5', explanation: '5 is ancestor of 4' }
    ],
    constraints: ['Number of nodes is in range [2, 10^5]', '-10^9 <= Node.val <= 10^9', 'All values are unique', 'p and q exist in tree'],
    hints: ['If current node is p or q, return it', 'Recursively search left and right', 'If both sides return non-null, current node is LCA'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-005',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'hard',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Find the maximum path sum in a binary tree. Path can start and end at any nodes.',
    examples: [
      { input: 'root = [1, 2, 3]', output: '6', explanation: 'Path 2 -> 1 -> 3' },
      { input: 'root = [-10, 9, 20, null, null, 15, 7]', output: '42', explanation: 'Path 15 -> 20 -> 7' }
    ],
    constraints: ['Number of nodes is in range [1, 3 * 10^4]', '-1000 <= Node.val <= 1000'],
    hints: ['At each node, calculate max path through it', 'Return max single-arm path to parent', 'Track global maximum separately'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-006',
    title: 'Diameter of Binary Tree',
    difficulty: 'easy',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Find the diameter of a binary tree (length of longest path between any two nodes, measured by edges).',
    examples: [
      { input: 'root = [1, 2, 3, 4, 5]', output: '3', explanation: 'Path 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3' },
      { input: 'root = [1, 2]', output: '1', explanation: 'Path 2 -> 1' }
    ],
    constraints: ['Number of nodes is in range [1, 10^4]', '-100 <= Node.val <= 100'],
    hints: ['Diameter through a node = left height + right height', 'Track maximum diameter globally', 'Return height from each recursion'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-007',
    title: 'Invert Binary Tree',
    difficulty: 'easy',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Invert a binary tree (swap left and right children for all nodes).',
    examples: [
      { input: 'root = [4, 2, 7, 1, 3, 6, 9]', output: '[4, 7, 2, 9, 6, 3, 1]', explanation: 'Mirror image of tree' },
      { input: 'root = [2, 1, 3]', output: '[2, 3, 1]', explanation: 'Swap children of root' }
    ],
    constraints: ['Number of nodes is in range [0, 100]', '-100 <= Node.val <= 100'],
    hints: ['Recursively invert left and right subtrees', 'Swap children after recursive calls', 'Base case: null node'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-008',
    title: 'Same Tree',
    difficulty: 'easy',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Check if two binary trees are structurally identical with the same node values.',
    examples: [
      { input: 'p = [1, 2, 3], q = [1, 2, 3]', output: 'true', explanation: 'Identical trees' },
      { input: 'p = [1, 2], q = [1, null, 2]', output: 'false', explanation: 'Different structure' }
    ],
    constraints: ['Number of nodes is in range [0, 100]', '-10^4 <= Node.val <= 10^4'],
    hints: ['Compare nodes recursively', 'Check value equality and structure', 'Both null means equal at that position'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-009',
    title: 'Construct Tree from Preorder and Inorder',
    difficulty: 'medium',
    patterns: ['dfs', 'hash-table'],
    category: 'Trees',
    description: 'Build a binary tree given its preorder and inorder traversal arrays.',
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]', explanation: 'Reconstructed tree' },
      { input: 'preorder = [-1], inorder = [-1]', output: '[-1]', explanation: 'Single node' }
    ],
    constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', 'All values are unique'],
    hints: ['First element of preorder is root', 'Find root in inorder to split left/right subtrees', 'Use hash map for O(1) index lookup'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },
  {
    id: 'dfs-010',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 'medium',
    patterns: ['dfs'],
    category: 'Trees',
    description: 'Flatten a binary tree to a linked list in-place. The linked list should use right pointers in preorder traversal order.',
    examples: [
      { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]', explanation: 'Flattened to right pointers' },
      { input: 'root = []', output: '[]', explanation: 'Empty tree' }
    ],
    constraints: ['Number of nodes is in range [0, 2000]', '-100 <= Node.val <= 100'],
    hints: ['Process in reverse preorder (right, left, root)', 'Track previous node globally', 'Point current right to previous'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(h)'
  },
  {
    id: 'dfs-011',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium',
    patterns: ['dfs', 'bfs'],
    category: 'Matrix',
    description: 'Find all cells where water can flow to both Pacific (top/left edges) and Atlantic (bottom/right edges) oceans.',
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]', explanation: 'Cells flowing to both oceans' }
    ],
    constraints: ['m == heights.length', 'n == heights[i].length', '1 <= m, n <= 200', '0 <= heights[i][j] <= 10^5'],
    hints: ['DFS from ocean edges inward', 'Track cells reachable from each ocean', 'Return intersection of both sets'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(m*n)',
    optimalSpaceComplexity: 'O(m*n)'
  },
  {
    id: 'dfs-012',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'hard',
    patterns: ['dfs', 'bfs'],
    category: 'Trees',
    description: 'Design an algorithm to serialize a binary tree to a string and deserialize back to the tree.',
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]', explanation: 'Serialize then deserialize' },
      { input: 'root = []', output: '[]', explanation: 'Empty tree' }
    ],
    constraints: ['Number of nodes is in range [0, 10^4]', '-1000 <= Node.val <= 1000'],
    hints: ['Use preorder traversal with null markers', 'Separate values with delimiter', 'Deserialize recursively using queue'],
    optimalPattern: 'dfs',
    optimalTimeComplexity: 'O(n)',
    optimalSpaceComplexity: 'O(n)'
  },
];
