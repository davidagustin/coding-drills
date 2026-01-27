import type { Exercise } from './types';

export const javascriptExtraExercises: Exercise[] = [
  {
    id: 'js-trapping-rain-water',
    title: 'Trapping Rain Water',
    category: 'iteration-patterns' as const,
    difficulty: 'advanced' as const,
    description:
      'Compute how much rainwater can be trapped between bars of varying heights in an elevation map. This classic interview problem teaches the two-pointer technique where maintaining left-max and right-max boundaries lets you calculate trapped water in O(n) time and O(1) space, avoiding the need for auxiliary arrays.',
    instructions: [
      'Use a two-pointer approach with left and right pointers',
      'Track the maximum height seen from left and right',
      'Water trapped at position i = min(leftMax, rightMax) - height[i]',
      'Move the pointer with smaller max height',
      'Return the total trapped water',
    ],
    starterCode: `function trap(height) {
  // YOUR CODE HERE
}`,
    solutionCode: `function trap(height) {
  if (height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}`,
    testCases: [
      {
        input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
        expected: 6,
        description: 'Standard case with multiple valleys',
      },
      {
        input: [[4, 2, 0, 3, 2, 5]],
        expected: 9,
        description: 'Case with deep valley',
      },
      {
        input: [[1, 2, 3, 4, 5]],
        expected: 0,
        description: 'Ascending heights - no water trapped',
      },
      {
        input: [[5, 4, 3, 2, 1]],
        expected: 0,
        description: 'Descending heights - no water trapped',
      },
      {
        input: [[]],
        expected: 0,
        description: 'Empty array',
      },
    ],
    hints: [
      'Water level at any point is determined by the minimum of maximum heights on both sides',
      'Use two pointers starting from both ends',
      'Always move the pointer with the smaller maximum height',
    ],
    concepts: ['two-pointers', 'greedy', 'array-traversal'],
  },
  {
    id: 'js-container-most-water',
    title: 'Container With Most Water',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find two vertical lines that together with the x-axis form the container holding the most water. This foundational two-pointer problem demonstrates how greedy narrowing from both ends guarantees the optimal area in O(n) time, since moving the shorter line is the only way to potentially increase height.',
    instructions: [
      'Use two pointers at the beginning and end of the array',
      'Calculate area = min(height[left], height[right]) * (right - left)',
      'Move the pointer with smaller height inward',
      'Track the maximum area seen',
      'Return the maximum area',
    ],
    starterCode: `function maxArea(height) {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;
    maxWater = Math.max(maxWater, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}`,
    testCases: [
      {
        input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
        expected: 49,
        description: 'Standard case with varying heights',
      },
      {
        input: [[1, 1]],
        expected: 1,
        description: 'Two lines of same height',
      },
      {
        input: [[4, 3, 2, 1, 4]],
        expected: 16,
        description: 'Maximum area between endpoints',
      },
      {
        input: [[1, 2, 1]],
        expected: 2,
        description: 'Small array',
      },
    ],
    hints: [
      'Area is limited by the shorter line',
      'Moving the shorter line might find a taller one',
      'Moving the taller line will never improve the result',
    ],
    concepts: ['two-pointers', 'greedy', 'optimization'],
  },
  {
    id: 'js-product-except-self',
    title: 'Product of Array Except Self',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Build an array where each element is the product of all other elements, without using division. This teaches the prefix-suffix decomposition pattern: two linear passes build left and right running products that combine for O(n) time and O(1) extra space, a technique also used in range query problems.',
    instructions: [
      'Create an output array initialized with 1s',
      'First pass: calculate prefix products (product of all elements to the left)',
      'Second pass: calculate suffix products and multiply with prefix',
      'Return the result array',
      'Time complexity should be O(n)',
    ],
    starterCode: `function productExceptSelf(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Calculate prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // Calculate suffix products and multiply
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4]],
        expected: [24, 12, 8, 6],
        description: 'Standard case with positive integers',
      },
      {
        input: [[-1, 1, 0, -3, 3]],
        expected: [0, 0, 9, 0, 0],
        description: 'Array containing zero',
      },
      {
        input: [[2, 3]],
        expected: [3, 2],
        description: 'Two elements',
      },
      {
        input: [[1, 1, 1, 1]],
        expected: [1, 1, 1, 1],
        description: 'All ones',
      },
    ],
    hints: [
      'Think about prefix and suffix products separately',
      'You can use the output array to store intermediate results',
      'First pass left to right, second pass right to left',
    ],
    concepts: ['array-traversal', 'prefix-suffix', 'optimization'],
  },
  {
    id: 'js-next-greater-element',
    title: 'Next Greater Element',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'For each element, find the nearest larger value to its right, returning -1 if none exists. This introduces the monotonic stack pattern, which processes elements in reverse and maintains a decreasing stack to answer nearest-greater queries in amortized O(n) time, widely used in stock span and histogram problems.',
    instructions: [
      'Use a stack to track indices of elements',
      'Iterate through the array from right to left',
      'Pop elements from stack that are smaller than current',
      'The top of stack is the next greater element',
      'Return the result array',
    ],
    starterCode: `function nextGreaterElement(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function nextGreaterElement(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];

  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }

    if (stack.length > 0) {
      result[i] = stack[stack.length - 1];
    }

    stack.push(nums[i]);
  }

  return result;
}`,
    testCases: [
      {
        input: [[2, 1, 2, 4, 3]],
        expected: [4, 2, 4, -1, -1],
        description: 'Standard case with mixed values',
      },
      {
        input: [[1, 2, 3, 4, 5]],
        expected: [2, 3, 4, 5, -1],
        description: 'Ascending sequence',
      },
      {
        input: [[5, 4, 3, 2, 1]],
        expected: [-1, -1, -1, -1, -1],
        description: 'Descending sequence',
      },
      {
        input: [[1, 3, 2, 4]],
        expected: [3, 4, 4, -1],
        description: 'Mixed ascending and descending',
      },
    ],
    hints: [
      'Use a monotonic stack approach',
      'Process elements from right to left',
      'Stack maintains potential next greater elements',
    ],
    concepts: ['stack', 'monotonic-stack', 'array-traversal'],
  },
  {
    id: 'js-best-time-buy-sell',
    title: 'Best Time to Buy and Sell Stock',
    category: 'iteration-patterns' as const,
    difficulty: 'beginner' as const,
    description:
      'Find the maximum profit from a single buy-sell transaction on a stock price array. This beginner-friendly greedy problem teaches tracking the running minimum while computing potential profit at each step, achieving O(n) time with a single pass. It is one of the most frequently asked interview questions.',
    instructions: [
      'Track the minimum price seen so far',
      'For each price, calculate profit if selling at current price',
      'Update maximum profit if current profit is higher',
      'Return the maximum profit (0 if no profit possible)',
    ],
    starterCode: `function maxProfit(prices) {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      const profit = prices[i] - minPrice;
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}`,
    testCases: [
      {
        input: [[7, 1, 5, 3, 6, 4]],
        expected: 5,
        description: 'Buy at 1, sell at 6',
      },
      {
        input: [[7, 6, 4, 3, 1]],
        expected: 0,
        description: 'Prices only decrease - no profit',
      },
      {
        input: [[2, 4, 1]],
        expected: 2,
        description: 'Best transaction early in array',
      },
      {
        input: [[1, 2, 3, 4, 5]],
        expected: 4,
        description: 'Prices only increase',
      },
      {
        input: [[3, 3, 3, 3]],
        expected: 0,
        description: 'All prices same',
      },
    ],
    hints: [
      'Keep track of the minimum price seen so far',
      'At each step, calculate profit if selling at current price',
      'Single pass solution is possible',
    ],
    concepts: ['greedy', 'dynamic-programming', 'single-pass'],
  },
  {
    id: 'js-stock-buy-sell-multi',
    title: 'Best Time to Buy and Sell Stock II',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Maximize profit from unlimited buy-sell transactions on a stock price array, with the constraint of selling before buying again. The greedy insight is that capturing every consecutive price increase equals the optimal total profit, reducing the problem to summing positive day-over-day differences in O(n) time.',
    instructions: [
      'Identify all profitable consecutive day pairs',
      'Add profit whenever next day price is higher',
      'This captures all upward price movements',
      'Return the total profit',
    ],
    starterCode: `function maxProfitMulti(prices) {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxProfitMulti(prices) {
  let totalProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      totalProfit += prices[i] - prices[i - 1];
    }
  }

  return totalProfit;
}`,
    testCases: [
      {
        input: [[7, 1, 5, 3, 6, 4]],
        expected: 7,
        description: 'Buy at 1, sell at 5, buy at 3, sell at 6',
      },
      {
        input: [[1, 2, 3, 4, 5]],
        expected: 4,
        description: 'Buy at 1, sell at 5 (or accumulate daily gains)',
      },
      {
        input: [[7, 6, 4, 3, 1]],
        expected: 0,
        description: 'Prices only decrease',
      },
      {
        input: [[2, 1, 2, 0, 1]],
        expected: 2,
        description: 'Multiple small transactions',
      },
    ],
    hints: [
      'You can capture all upward trends by summing positive differences',
      'Every consecutive price increase is a profit opportunity',
      'Greedy approach works here',
    ],
    concepts: ['greedy', 'array-traversal', 'optimization'],
  },
  {
    id: 'js-jump-game',
    title: 'Jump Game',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Determine if you can reach the last index by jumping from index 0, where each value is the maximum jump length. This greedy reachability problem tracks the farthest reachable index in a single pass. It teaches that local decisions about maximum reach compose into a global reachability answer in O(n) time.',
    instructions: [
      'Track the farthest position reachable',
      'Iterate through the array',
      'At each position, update the farthest reachable index',
      'If current position is beyond farthest reachable, return false',
      'Return true if farthest reaches or exceeds last index',
    ],
    starterCode: `function canJump(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function canJump(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) {
      return false;
    }
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }

  return true;
}`,
    testCases: [
      {
        input: [[2, 3, 1, 1, 4]],
        expected: true,
        description: 'Can reach end with multiple paths',
      },
      {
        input: [[3, 2, 1, 0, 4]],
        expected: false,
        description: 'Stuck at index 3 (zero)',
      },
      {
        input: [[0]],
        expected: true,
        description: 'Single element - already at end',
      },
      {
        input: [[2, 0, 0]],
        expected: true,
        description: 'First jump reaches end',
      },
      {
        input: [[1, 1, 1, 1]],
        expected: true,
        description: 'Each step moves forward',
      },
    ],
    hints: [
      'Track the maximum index you can reach',
      'Greedy approach: always try to extend your reach',
      'No need to track actual jumps, just reachability',
    ],
    concepts: ['greedy', 'array-traversal', 'reachability'],
  },
  {
    id: 'js-jump-game-min',
    title: 'Jump Game II - Minimum Jumps',
    category: 'iteration-patterns' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the minimum number of jumps to reach the last index in an array of jump lengths. This extends the jump game using a BFS-like greedy approach that tracks jump boundaries. Each boundary crossing counts as one jump, yielding an O(n) solution that mirrors level-order traversal in an implicit graph.',
    instructions: [
      'Use BFS-like approach with levels representing number of jumps',
      'Track current jump range and next jump range',
      'When current position exceeds current range, increment jumps',
      'Update farthest reachable position in next range',
      'Return the number of jumps',
    ],
    starterCode: `function minJumps(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function minJumps(nums) {
  if (nums.length <= 1) return 0;

  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;

      if (currentEnd >= nums.length - 1) {
        break;
      }
    }
  }

  return jumps;
}`,
    testCases: [
      {
        input: [[2, 3, 1, 1, 4]],
        expected: 2,
        description: 'Jump 1 step from index 0 to 1, then 3 steps to last',
      },
      {
        input: [[2, 3, 0, 1, 4]],
        expected: 2,
        description: 'Multiple paths but minimum is 2',
      },
      {
        input: [[1, 1, 1, 1]],
        expected: 3,
        description: 'Must jump at each step',
      },
      {
        input: [[5, 1, 1, 1, 1]],
        expected: 1,
        description: 'Can reach end in one jump',
      },
      {
        input: [[1]],
        expected: 0,
        description: 'Already at end',
      },
    ],
    hints: [
      'Think of it as BFS where each level is a jump',
      'Track the boundary of current jump level',
      'When you cross the boundary, increment jump count',
    ],
    concepts: ['greedy', 'bfs', 'optimization', 'range-tracking'],
  },
  {
    id: 'js-gas-station',
    title: 'Gas Station',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the starting gas station index that allows completing a circular route, or return -1 if impossible. This greedy problem leverages two key insights: if total gas >= total cost a solution exists, and if the tank goes negative at station i, the valid start must be after i. One pass suffices for O(n) time.',
    instructions: [
      'Check if total gas >= total cost (otherwise impossible)',
      'Track current tank balance',
      'If tank becomes negative, reset start position to next station',
      'The last valid start position is the answer',
      'Return the starting station index or -1',
    ],
    starterCode: `function canCompleteCircuit(gas, cost) {
  // YOUR CODE HERE
}`,
    solutionCode: `function canCompleteCircuit(gas, cost) {
  let totalGas = 0;
  let totalCost = 0;
  let tank = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    tank += gas[i] - cost[i];

    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }

  return totalGas >= totalCost ? start : -1;
}`,
    testCases: [
      {
        input: [
          [1, 2, 3, 4, 5],
          [3, 4, 5, 1, 2],
        ],
        expected: 3,
        description: 'Start at station 3',
      },
      {
        input: [
          [2, 3, 4],
          [3, 4, 3],
        ],
        expected: -1,
        description: 'Impossible to complete circuit',
      },
      {
        input: [
          [5, 1, 2, 3, 4],
          [4, 4, 1, 5, 1],
        ],
        expected: 4,
        description: 'Start at last station',
      },
      {
        input: [
          [3, 3, 4],
          [3, 4, 4],
        ],
        expected: -1,
        description: 'Total gas less than total cost',
      },
    ],
    hints: [
      'If total gas < total cost, circuit is impossible',
      'If you cannot reach station j from i, then no station between i and j can reach j',
      'One pass solution is possible with greedy approach',
    ],
    concepts: ['greedy', 'circular-array', 'optimization'],
  },
  {
    id: 'js-three-sum-zero',
    title: 'Three Sum',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find all unique triplets in an integer array that sum to zero. This classic interview problem combines sorting with the two-pointer technique: fix one element, then sweep inward from both ends to find complementary pairs. Careful duplicate skipping ensures uniqueness in O(n^2) time.',
    instructions: [
      'Sort the array first',
      'For each element, use two pointers to find pairs that sum to negative of that element',
      'Skip duplicate values to avoid duplicate triplets',
      'Return all unique triplets',
    ],
    starterCode: `function threeSum(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}`,
    testCases: [
      {
        input: [[-1, 0, 1, 2, -1, -4]],
        expected: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
        description: 'Standard case with multiple triplets',
      },
      {
        input: [[0, 0, 0]],
        expected: [[0, 0, 0]],
        description: 'All zeros',
      },
      {
        input: [[1, 2, -2, -1]],
        expected: [],
        description: 'No triplets sum to zero',
      },
      {
        input: [[-2, 0, 1, 1, 2]],
        expected: [
          [-2, 0, 2],
          [-2, 1, 1],
        ],
        description: 'Multiple valid triplets',
      },
    ],
    hints: [
      'Sort the array first to enable two-pointer approach',
      'Fix one element and find pairs that complete the triplet',
      'Skip duplicates to avoid duplicate triplets',
    ],
    concepts: ['two-pointers', 'sorting', 'duplicate-handling'],
  },
  {
    id: 'js-remove-dupes-sorted-ii',
    title: 'Remove Duplicates from Sorted Array II',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Remove duplicates from a sorted array in-place so each element appears at most twice, returning the new length. This teaches the read-write pointer pattern: compare the current element against the element two positions back in the write sequence. It generalizes to allowing at most k duplicates.',
    instructions: [
      'Use a write pointer to track where to place next valid element',
      'Allow first two occurrences of each element',
      'Check if current element equals element at write-2 position',
      'If different, write current element at write pointer',
      'Return the new length',
    ],
    starterCode: `function removeDuplicates(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function removeDuplicates(nums) {
  if (nums.length <= 2) return nums.length;

  let write = 2;

  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[write - 2]) {
      nums[write] = nums[i];
      write++;
    }
  }

  return write;
}`,
    testCases: [
      {
        input: [[1, 1, 1, 2, 2, 3]],
        expected: 5,
        description: 'Array becomes [1,1,2,2,3]',
      },
      {
        input: [[0, 0, 1, 1, 1, 1, 2, 3, 3]],
        expected: 7,
        description: 'Array becomes [0,0,1,1,2,3,3]',
      },
      {
        input: [[1, 1, 1, 1]],
        expected: 2,
        description: 'All same elements',
      },
      {
        input: [[1, 2, 3]],
        expected: 3,
        description: 'No duplicates',
      },
    ],
    hints: [
      'Compare current element with element at write-2 position',
      'First two elements are always kept',
      'In-place modification with two pointers',
    ],
    concepts: ['two-pointers', 'in-place', 'array-modification'],
  },
  {
    id: 'js-longest-consecutive-seq',
    title: 'Longest Consecutive Sequence',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the length of the longest consecutive integer sequence in an unsorted array in O(n) time. Using a HashSet for O(1) lookups, you only start counting from sequence beginnings (where num-1 is absent). This avoids sorting and is a key example of set-based sequence detection.',
    instructions: [
      'Add all numbers to a Set for O(1) lookup',
      'For each number, check if it is the start of a sequence (no num-1 in set)',
      'If it is a start, count consecutive numbers',
      'Track the maximum length found',
      'Return the maximum length',
    ],
    starterCode: `function longestConsecutive(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function longestConsecutive(nums) {
  if (nums.length === 0) return 0;

  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // Only start counting if this is the beginning of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}`,
    testCases: [
      {
        input: [[100, 4, 200, 1, 3, 2]],
        expected: 4,
        description: 'Sequence [1, 2, 3, 4]',
      },
      {
        input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]],
        expected: 9,
        description: 'Sequence [0, 1, 2, 3, 4, 5, 6, 7, 8]',
      },
      {
        input: [[9, 1, 4, 7, 3, 2, 8, 5, 6]],
        expected: 9,
        description: 'Sequence [1-9]',
      },
      {
        input: [[1, 2, 0, 1]],
        expected: 3,
        description: 'Sequence [0, 1, 2] with duplicate',
      },
      {
        input: [[]],
        expected: 0,
        description: 'Empty array',
      },
    ],
    hints: [
      'Use a Set for O(1) membership checking',
      'Only start counting from the beginning of a sequence',
      'Check if num-1 exists to identify sequence starts',
    ],
    concepts: ['hash-set', 'sequence-detection', 'optimization'],
  },
  {
    id: 'js-move-zeroes',
    title: 'Move Zeroes',
    category: 'iteration-patterns' as const,
    difficulty: 'beginner' as const,
    description:
      'Move all zeros to the end of an array while preserving the relative order of non-zero elements, modifying in-place. This beginner exercise teaches the read-write two-pointer pattern: the write pointer tracks where the next non-zero should go, achieving O(n) time with O(1) space via swaps.',
    instructions: [
      'Use a write pointer to track where to place next non-zero',
      'Iterate through array with read pointer',
      'When non-zero found, swap with write position',
      'Increment write pointer after each swap',
      'All zeros naturally end up at the end',
    ],
    starterCode: `function moveZeroes(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function moveZeroes(nums) {
  let write = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[write], nums[i]] = [nums[i], nums[write]];
      write++;
    }
  }
}`,
    testCases: [
      {
        input: [[0, 1, 0, 3, 12]],
        expected: [1, 3, 12, 0, 0],
        description: 'Standard case with zeros scattered',
      },
      {
        input: [[0]],
        expected: [0],
        description: 'Single zero',
      },
      {
        input: [[1, 2, 3]],
        expected: [1, 2, 3],
        description: 'No zeros',
      },
      {
        input: [[0, 0, 1]],
        expected: [1, 0, 0],
        description: 'Multiple leading zeros',
      },
    ],
    hints: [
      'Use two pointers: one for reading, one for writing',
      'Swap non-zero elements to the write position',
      'No need to explicitly move zeros',
    ],
    concepts: ['two-pointers', 'in-place', 'array-modification'],
  },
  {
    id: 'js-sort-by-parity',
    title: 'Sort Array By Parity',
    category: 'iteration-patterns' as const,
    difficulty: 'beginner' as const,
    description:
      'Rearrange an array so all even numbers come before all odd numbers, preserving relative order within each group. This stable partitioning exercise teaches filtering and grouping patterns. A two-pass approach collects evens then odds in O(n) time, illustrating how stable partitioning differs from in-place swaps.',
    instructions: [
      'Create result array or use two-pointer in-place approach',
      'Collect all even numbers first in order',
      'Then collect all odd numbers in order',
      'Return the rearranged array',
    ],
    starterCode: `function sortArrayByParity(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function sortArrayByParity(nums) {
  const result = [];

  // First pass: add all even numbers
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      result.push(nums[i]);
    }
  }

  // Second pass: add all odd numbers
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 !== 0) {
      result.push(nums[i]);
    }
  }

  return result;
}`,
    testCases: [
      {
        input: [[3, 1, 2, 4]],
        expected: [2, 4, 3, 1],
        description: 'Mixed even and odd',
      },
      {
        input: [[0]],
        expected: [0],
        description: 'Single even number',
      },
      {
        input: [[1, 3, 5, 7]],
        expected: [1, 3, 5, 7],
        description: 'All odd numbers',
      },
      {
        input: [[2, 4, 6, 8]],
        expected: [2, 4, 6, 8],
        description: 'All even numbers',
      },
      {
        input: [[4, 2, 5, 7]],
        expected: [4, 2, 5, 7],
        description: 'Already sorted by parity',
      },
    ],
    hints: [
      'Two pass approach: first collect evens, then odds',
      'Alternative: use two pointers for in-place sorting',
      'Maintain relative order within each group',
    ],
    concepts: ['array-partitioning', 'stable-sort', 'filtering'],
  },
  {
    id: 'js-candy-distribution',
    title: 'Candy Distribution',
    category: 'iteration-patterns' as const,
    difficulty: 'advanced' as const,
    description:
      'Distribute minimum total candies to children in a line so each gets at least one and higher-rated children get more than their neighbors. This advanced greedy problem uses two passes: left-to-right enforces the left-neighbor constraint, right-to-left enforces the right. Taking the max merges both.',
    instructions: [
      'Initialize all children with 1 candy',
      'Left to right pass: if rating[i] > rating[i-1], give more candy',
      'Right to left pass: if rating[i] > rating[i+1], ensure more candy',
      'Take maximum of current candies and calculated value',
      'Return sum of all candies',
    ],
    starterCode: `function candy(ratings) {
  // YOUR CODE HERE
}`,
    solutionCode: `function candy(ratings) {
  const n = ratings.length;
  if (n === 0) return 0;

  const candies = new Array(n).fill(1);

  // Left to right pass
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Right to left pass
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((sum, c) => sum + c, 0);
}`,
    testCases: [
      {
        input: [[1, 0, 2]],
        expected: 5,
        description: 'Candies: [2, 1, 2]',
      },
      {
        input: [[1, 2, 2]],
        expected: 4,
        description: 'Candies: [1, 2, 1]',
      },
      {
        input: [[1, 3, 2, 2, 1]],
        expected: 7,
        description: 'Candies: [1, 2, 1, 2, 1]',
      },
      {
        input: [[1, 2, 87, 87, 87, 2, 1]],
        expected: 13,
        description: 'Mix of increasing and plateaus',
      },
      {
        input: [[1]],
        expected: 1,
        description: 'Single child',
      },
    ],
    hints: [
      'Two passes: one left-to-right, one right-to-left',
      'Each pass handles one constraint (left or right neighbor)',
      'Take maximum when both constraints apply',
    ],
    concepts: ['greedy', 'two-pass', 'optimization'],
  },
  {
    id: 'js-number-of-islands',
    title: 'Number of Islands',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count the number of islands in a 2D grid of land and water cells, where an island is a connected component of adjacent land. This fundamental graph traversal problem teaches DFS flood-fill: marking visited cells prevents double-counting. It is a gateway to grid-based BFS/DFS problems.',
    instructions: [
      'Iterate through each cell in the grid',
      'When land ("1") is found, increment island count',
      'Use DFS to mark all connected land cells as visited',
      'Continue until all cells are processed',
      'Return the total island count',
    ],
    starterCode: `function numIslands(grid) {
  // YOUR CODE HERE
}`,
    solutionCode: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
      return;
    }

    grid[r][c] = '0'; // Mark as visited

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}`,
    testCases: [
      {
        input: [
          [
            ['1', '1', '1', '1', '0'],
            ['1', '1', '0', '1', '0'],
            ['1', '1', '0', '0', '0'],
            ['0', '0', '0', '0', '0'],
          ],
        ],
        expected: 1,
        description: 'One large connected island',
      },
      {
        input: [
          [
            ['1', '1', '0', '0', '0'],
            ['1', '1', '0', '0', '0'],
            ['0', '0', '1', '0', '0'],
            ['0', '0', '0', '1', '1'],
          ],
        ],
        expected: 3,
        description: 'Three separate islands',
      },
      {
        input: [
          [
            ['0', '0', '0'],
            ['0', '0', '0'],
          ],
        ],
        expected: 0,
        description: 'No islands',
      },
      {
        input: [[['1']]],
        expected: 1,
        description: 'Single cell island',
      },
    ],
    hints: [
      'Use DFS or BFS to explore connected land cells',
      'Mark visited cells to avoid counting them again',
      'Each DFS/BFS call from unvisited land is a new island',
    ],
    concepts: ['dfs', 'graph-traversal', 'connected-components', 'grid'],
  },
  {
    id: 'js-clone-graph',
    title: 'Clone Graph',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Create a deep copy of a connected undirected graph where each node has a value and neighbor list. This teaches graph traversal with a visited map that doubles as an original-to-clone mapping. DFS or BFS both work, and handling circular references via the map prevents infinite loops.',
    instructions: [
      'Use a Map to track original node -> cloned node mapping',
      'Perform DFS starting from the given node',
      'For each node, create a clone if not already created',
      'Recursively clone all neighbors',
      'Return the cloned starting node',
    ],
    starterCode: `function cloneGraph(node) {
  // YOUR CODE HERE
}`,
    solutionCode: `function cloneGraph(node) {
  if (!node) return null;

  const visited = new Map();

  function dfs(node) {
    if (visited.has(node)) {
      return visited.get(node);
    }

    const clone = { val: node.val, neighbors: [] };
    visited.set(node, clone);

    for (const neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}`,
    testCases: [
      {
        input: [{ val: 1, neighbors: [{ val: 2, neighbors: [{ val: 1, neighbors: [] }] }] }],
        expected: { val: 1, neighbors: [{ val: 2, neighbors: [{ val: 1, neighbors: [] }] }] },
        description: 'Two connected nodes',
      },
      {
        input: [{ val: 1, neighbors: [] }],
        expected: { val: 1, neighbors: [] },
        description: 'Single node with no neighbors',
      },
      {
        input: [null],
        expected: null,
        description: 'Empty graph',
      },
    ],
    hints: [
      'Use a hash map to track cloned nodes',
      'DFS or BFS both work for traversal',
      'Handle circular references by checking visited map',
    ],
    concepts: ['dfs', 'graph-traversal', 'deep-copy', 'hash-map'],
  },
  {
    id: 'js-course-schedule',
    title: 'Course Schedule',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Determine if all courses can be finished given prerequisite pairs, which is equivalent to detecting cycles in a directed graph. This teaches topological sort via DFS with three node states (unvisited, visiting, visited). A visiting node encountered again signals a cycle, making completion impossible.',
    instructions: [
      'Build adjacency list from prerequisites',
      'Use DFS with three states: unvisited, visiting, visited',
      'Detect cycles: if we revisit a "visiting" node, cycle exists',
      'If cycle found, return false',
      'Return true if all courses can be completed',
    ],
    starterCode: `function canFinish(numCourses, prerequisites) {
  // YOUR CODE HERE
}`,
    solutionCode: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    graph[course].push(prereq);
  }

  const visited = new Array(numCourses).fill(0); // 0: unvisited, 1: visiting, 2: visited

  function hasCycle(course) {
    if (visited[course] === 1) return true; // Cycle detected
    if (visited[course] === 2) return false; // Already processed

    visited[course] = 1; // Mark as visiting

    for (const prereq of graph[course]) {
      if (hasCycle(prereq)) return true;
    }

    visited[course] = 2; // Mark as visited
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }

  return true;
}`,
    testCases: [
      {
        input: [2, [[1, 0]]],
        expected: true,
        description: 'Can take course 0 then course 1',
      },
      {
        input: [
          2,
          [
            [1, 0],
            [0, 1],
          ],
        ],
        expected: false,
        description: 'Circular dependency',
      },
      {
        input: [
          4,
          [
            [1, 0],
            [2, 0],
            [3, 1],
            [3, 2],
          ],
        ],
        expected: true,
        description: 'Multiple prerequisites, no cycle',
      },
      {
        input: [
          3,
          [
            [0, 1],
            [1, 2],
            [2, 0],
          ],
        ],
        expected: false,
        description: 'Cycle involving three courses',
      },
      {
        input: [1, []],
        expected: true,
        description: 'Single course, no prerequisites',
      },
    ],
    hints: [
      'This is a cycle detection problem in a directed graph',
      'Use DFS with three states to detect cycles',
      'Build adjacency list from prerequisites',
    ],
    concepts: ['dfs', 'cycle-detection', 'directed-graph', 'topological-sort'],
  },
  {
    id: 'js-surrounded-regions',
    title: 'Surrounded Regions',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Capture all regions of O cells surrounded by X cells by flipping them to X, while preserving O cells connected to the boundary. This teaches reverse thinking in grid DFS: instead of finding surrounded regions directly, mark boundary-connected cells as safe, then flip everything else.',
    instructions: [
      'Mark all "O"s connected to boundaries as safe (use DFS from border)',
      'Change safe "O"s to a temporary marker (e.g., "S")',
      'Flip all remaining "O"s to "X" (these are surrounded)',
      'Restore temporary markers back to "O"',
      'Modify the board in-place',
    ],
    starterCode: `function solve(board) {
  // YOUR CODE HERE
}`,
    solutionCode: `function solve(board) {
  if (!board || board.length === 0) return;

  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') {
      return;
    }

    board[r][c] = 'S'; // Mark as safe

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  // Mark boundary-connected 'O's as safe
  for (let r = 0; r < rows; r++) {
    dfs(r, 0);
    dfs(r, cols - 1);
  }

  for (let c = 0; c < cols; c++) {
    dfs(0, c);
    dfs(rows - 1, c);
  }

  // Flip surrounded 'O's to 'X' and restore safe 'O's
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') {
        board[r][c] = 'X';
      } else if (board[r][c] === 'S') {
        board[r][c] = 'O';
      }
    }
  }
}`,
    testCases: [
      {
        input: [
          [
            ['X', 'X', 'X', 'X'],
            ['X', 'O', 'O', 'X'],
            ['X', 'X', 'O', 'X'],
            ['X', 'O', 'X', 'X'],
          ],
        ],
        expected: [
          ['X', 'X', 'X', 'X'],
          ['X', 'X', 'X', 'X'],
          ['X', 'X', 'X', 'X'],
          ['X', 'O', 'X', 'X'],
        ],
        description: 'Capture surrounded regions',
      },
      {
        input: [[['X']]],
        expected: [['X']],
        description: 'Single cell',
      },
      {
        input: [
          [
            ['O', 'O'],
            ['O', 'O'],
          ],
        ],
        expected: [
          ['O', 'O'],
          ['O', 'O'],
        ],
        description: 'All O connected to boundary',
      },
    ],
    hints: [
      'Start DFS from boundary "O"s to mark safe regions',
      'Surrounded regions are those not reachable from boundary',
      'Use a temporary marker to distinguish safe "O"s',
    ],
    concepts: ['dfs', 'grid-traversal', 'boundary-detection', 'in-place'],
  },
  {
    id: 'js-rotting-oranges',
    title: 'Rotting Oranges',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the minimum minutes until all fresh oranges rot, given that rotten oranges spread to adjacent fresh ones each minute. This is a classic multi-source BFS problem: initialize the queue with all rotten oranges and process level by level, where each level represents one minute of elapsed time.',
    instructions: [
      'Use BFS with queue initialized with all rotten oranges',
      'Count total fresh oranges initially',
      'Process level by level (each level = 1 minute)',
      'For each rotten orange, rot adjacent fresh oranges',
      'Return minutes elapsed, or -1 if fresh oranges remain',
    ],
    starterCode: `function orangesRotting(grid) {
  // YOUR CODE HERE
}`,
    solutionCode: `function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let freshCount = 0;

  // Initialize queue with all rotten oranges
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c]);
      } else if (grid[r][c] === 1) {
        freshCount++;
      }
    }
  }

  if (freshCount === 0) return 0;

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let minutes = 0;

  while (queue.length > 0) {
    const size = queue.length;
    let rotted = false;

    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          queue.push([nr, nc]);
          freshCount--;
          rotted = true;
        }
      }
    }

    if (rotted) minutes++;
  }

  return freshCount === 0 ? minutes : -1;
}`,
    testCases: [
      {
        input: [
          [
            [2, 1, 1],
            [1, 1, 0],
            [0, 1, 1],
          ],
        ],
        expected: 4,
        description: 'All oranges rot in 4 minutes',
      },
      {
        input: [
          [
            [2, 1, 1],
            [0, 1, 1],
            [1, 0, 1],
          ],
        ],
        expected: -1,
        description: 'Isolated fresh orange cannot rot',
      },
      {
        input: [[[0, 2]]],
        expected: 0,
        description: 'No fresh oranges',
      },
      {
        input: [
          [
            [2, 2],
            [1, 1],
            [0, 0],
            [2, 1],
          ],
        ],
        expected: 1,
        description: 'Multiple rotten sources',
      },
    ],
    hints: [
      'Multi-source BFS problem',
      'Add all initially rotten oranges to queue',
      'Process layer by layer to track time',
    ],
    concepts: ['bfs', 'multi-source', 'grid-traversal', 'simulation'],
  },
  {
    id: 'js-word-ladder',
    title: 'Word Ladder',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Find the shortest transformation sequence from a begin word to an end word, changing one letter at a time using a dictionary. This models the problem as an unweighted graph where words are nodes connected by single-letter differences. BFS guarantees the shortest path in this implicit graph.',
    instructions: [
      'Return the number of words in the shortest transformation sequence',
      'Each transformed word must exist in the word list',
      'Only one letter can be changed at a time',
      'Return 0 if no transformation sequence exists',
      'Use BFS to find the shortest path',
    ],
    starterCode: `function wordLadder(beginWord, endWord, wordList) {
  // YOUR CODE HERE
}`,
    solutionCode: `function wordLadder(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);

  while (queue.length > 0) {
    const [word, level] = queue.shift();

    if (word === endWord) return level;

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const char = String.fromCharCode(c);
        const newWord = word.slice(0, i) + char + word.slice(i + 1);

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, level + 1]);
        }
      }
    }
  }

  return 0;
}`,
    testCases: [
      {
        input: ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']],
        expected: 5,
        description: 'hit -> hot -> dot -> dog -> cog',
      },
      {
        input: ['hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']],
        expected: 0,
        description: 'endWord not in wordList',
      },
      {
        input: ['a', 'c', ['a', 'b', 'c']],
        expected: 2,
        description: 'a -> c (direct transformation)',
      },
      {
        input: ['hot', 'dog', ['hot', 'dog']],
        expected: 0,
        description: 'no valid path (more than one letter different)',
      },
    ],
    hints: [
      'Use BFS to explore all possible transformations level by level',
      'Keep track of visited words to avoid cycles',
      'Try changing each position in the word to every letter a-z',
      'Check if the new word exists in the word set before adding to queue',
    ],
    concepts: ['BFS', 'Graph Traversal', 'String Manipulation', 'Sets'],
  },
  {
    id: 'js-shortest-path-grid',
    title: 'Shortest Path in Binary Grid',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Find the shortest clear path from top-left to bottom-right in a binary grid, moving in 8 directions. This BFS shortest-path problem demonstrates how level-by-level exploration on a grid with diagonal movement guarantees minimum distance. It is foundational for grid pathfinding in games and robotics.',
    instructions: [
      'Return the length of the shortest path, or -1 if no path exists',
      '0 represents a passable cell, 1 represents a blocked cell',
      'You can move in 8 directions (including diagonals)',
      'The path length includes both start and end cells',
      'Use BFS for shortest path',
    ],
    starterCode: `function shortestPathGrid(grid) {
  // YOUR CODE HERE
}`,
    solutionCode: `function shortestPathGrid(grid) {
  if (!grid || grid.length === 0 || grid[0][0] === 1) return -1;

  const n = grid.length;
  const m = grid[0].length;

  if (grid[n - 1][m - 1] === 1) return -1;
  if (n === 1 && m === 1) return 1;

  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  const queue = [[0, 0, 1]];
  const visited = new Set(['0,0']);

  while (queue.length > 0) {
    const [row, col, dist] = queue.shift();

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const key = \`\${newRow},\${newCol}\`;

      if (newRow === n - 1 && newCol === m - 1) return dist + 1;

      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m &&
          grid[newRow][newCol] === 0 && !visited.has(key)) {
        visited.add(key);
        queue.push([newRow, newCol, dist + 1]);
      }
    }
  }

  return -1;
}`,
    testCases: [
      {
        input: [
          [
            [0, 1],
            [1, 0],
          ],
        ],
        expected: -1,
        description: 'no clear path exists',
      },
      {
        input: [
          [
            [0, 0, 0],
            [1, 1, 0],
            [1, 1, 0],
          ],
        ],
        expected: 4,
        description: 'path exists going around obstacles',
      },
      {
        input: [[[0]]],
        expected: 1,
        description: 'single cell grid',
      },
      {
        input: [
          [
            [0, 0],
            [0, 0],
          ],
        ],
        expected: 2,
        description: 'simple 2x2 grid with diagonal path',
      },
      {
        input: [
          [
            [1, 0],
            [0, 0],
          ],
        ],
        expected: -1,
        description: 'start cell is blocked',
      },
    ],
    hints: [
      'Use BFS to guarantee shortest path',
      'Consider all 8 directions when exploring neighbors',
      'Mark cells as visited to avoid revisiting',
      'Check boundary conditions and blocked cells',
    ],
    concepts: ['BFS', 'Grid Traversal', 'Shortest Path', 'Graph'],
  },
  {
    id: 'js-graph-valid-tree',
    title: 'Graph Valid Tree',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Determine if n nodes and a list of edges form a valid tree, which requires exactly n-1 edges, connectivity, and no cycles. This combines edge counting with DFS cycle detection: track parent to avoid false positives on undirected edges, then verify all nodes are visited for connectivity.',
    instructions: [
      'A valid tree must be connected (all nodes reachable from any node)',
      'A valid tree must not contain any cycles',
      'A tree with n nodes has exactly n-1 edges',
      'Use DFS or union-find to detect cycles and check connectivity',
      'Edges are given as [node1, node2] pairs',
    ],
    starterCode: `function graphValidTree(n, edges) {
  // YOUR CODE HERE
}`,
    solutionCode: `function graphValidTree(n, edges) {
  if (edges.length !== n - 1) return false;

  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);

    for (const neighbor of graph[node]) {
      if (neighbor === parent) continue;
      if (visited.has(neighbor)) return false;
      if (!dfs(neighbor, node)) return false;
    }

    return true;
  }

  if (!dfs(0, -1)) return false;
  return visited.size === n;
}`,
    testCases: [
      {
        input: [
          5,
          [
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 4],
          ],
        ],
        expected: true,
        description: 'valid tree with 5 nodes',
      },
      {
        input: [
          5,
          [
            [0, 1],
            [1, 2],
            [2, 3],
            [1, 3],
            [1, 4],
          ],
        ],
        expected: false,
        description: 'contains a cycle',
      },
      {
        input: [
          4,
          [
            [0, 1],
            [2, 3],
          ],
        ],
        expected: false,
        description: 'not connected (two separate components)',
      },
      {
        input: [1, []],
        expected: true,
        description: 'single node is a valid tree',
      },
      {
        input: [2, [[0, 1]]],
        expected: true,
        description: 'simple two-node tree',
      },
    ],
    hints: [
      'A tree with n nodes must have exactly n-1 edges',
      'Use DFS and track the parent to avoid false cycle detection',
      'After DFS, check if all nodes were visited (connectivity)',
      'Return false if you visit an already-visited node that is not the parent',
    ],
    concepts: ['Graph', 'DFS', 'Cycle Detection', 'Tree Validation'],
  },
  {
    id: 'js-right-side-view',
    title: 'Binary Tree Right Side View',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Return the values visible when looking at a binary tree from the right side, ordered top to bottom. This BFS level-order traversal captures the last node at each level. It demonstrates how tracking level boundaries in a queue enables per-level processing for tree visualization problems.',
    instructions: [
      'Imagine standing on the right side of the tree',
      'Return the rightmost node value at each level',
      'Use level-order traversal (BFS)',
      'Return an empty array for null tree',
      'Nodes are represented as {val, left, right}',
    ],
    starterCode: `function rightSideView(root) {
  // YOUR CODE HERE
}`,
    solutionCode: `function rightSideView(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}`,
    testCases: [
      {
        input: [
          {
            val: 1,
            left: { val: 2, left: null, right: { val: 5, left: null, right: null } },
            right: { val: 3, left: null, right: { val: 4, left: null, right: null } },
          },
        ],
        expected: [1, 3, 4],
        description: 'tree with multiple levels',
      },
      {
        input: [{ val: 1, left: null, right: { val: 3, left: null, right: null } }],
        expected: [1, 3],
        description: 'right-skewed tree',
      },
      {
        input: [null],
        expected: [],
        description: 'null tree',
      },
      {
        input: [{ val: 1, left: { val: 2, left: null, right: null }, right: null }],
        expected: [1, 2],
        description: 'left-skewed tree',
      },
    ],
    hints: [
      'Use BFS to traverse level by level',
      'Track the size of each level',
      'The last node at each level is visible from the right',
      'Process nodes left to right, capturing the last one',
    ],
    concepts: ['BFS', 'Binary Tree', 'Level Order Traversal', 'Queue'],
  },
  {
    id: 'js-validate-bst',
    title: 'Validate Binary Search Tree',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Determine if a binary tree satisfies the binary search tree property where left descendants are less and right descendants are greater. This teaches recursive bounds checking: pass valid (min, max) ranges down the tree. It is a common interview question that tests understanding of BST invariants.',
    instructions: [
      'Left subtree nodes must all be less than the parent node',
      'Right subtree nodes must all be greater than the parent node',
      'Both left and right subtrees must also be valid BSTs',
      'Use bounds checking or inorder traversal',
      'Nodes are {val, left, right}, null tree is valid',
    ],
    starterCode: `function validateBST(root) {
  // YOUR CODE HERE
}`,
    solutionCode: `function validateBST(root) {
  function validate(node, min, max) {
    if (!node) return true;

    if (node.val <= min || node.val >= max) return false;

    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }

  return validate(root, -Infinity, Infinity);
}`,
    testCases: [
      {
        input: [
          {
            val: 2,
            left: { val: 1, left: null, right: null },
            right: { val: 3, left: null, right: null },
          },
        ],
        expected: true,
        description: 'valid BST',
      },
      {
        input: [
          {
            val: 5,
            left: { val: 1, left: null, right: null },
            right: {
              val: 4,
              left: { val: 3, left: null, right: null },
              right: { val: 6, left: null, right: null },
            },
          },
        ],
        expected: false,
        description: 'invalid BST (right child has node less than root)',
      },
      {
        input: [null],
        expected: true,
        description: 'null tree is valid',
      },
      {
        input: [{ val: 1, left: null, right: null }],
        expected: true,
        description: 'single node is valid',
      },
      {
        input: [
          {
            val: 10,
            left: { val: 5, left: null, right: { val: 15, left: null, right: null } },
            right: { val: 20, left: null, right: null },
          },
        ],
        expected: false,
        description: 'invalid BST (left subtree contains value greater than root)',
      },
    ],
    hints: [
      'Use recursion with min and max bounds',
      'Each node must be within the valid range for its position',
      'Left children must be less than parent, right children greater',
      'The bounds propagate down the tree',
    ],
    concepts: ['Binary Search Tree', 'Recursion', 'Tree Validation', 'Bounds Checking'],
  },
  {
    id: 'js-kth-smallest-bst',
    title: 'Kth Smallest Element in BST',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Find the kth smallest element in a binary search tree using the property that inorder traversal visits nodes in ascending order. By counting visited nodes during traversal and stopping at k, you achieve O(H + k) time. This is fundamental to understanding BST ordering guarantees.',
    instructions: [
      'Use inorder traversal (left-root-right) which visits nodes in sorted order',
      'k is 1-indexed (1 means the smallest element)',
      'Assume k is always valid (1 <= k <= number of nodes)',
      'Nodes are {val, left, right}',
      'Return the value of the kth smallest element',
    ],
    starterCode: `function kthSmallestBST(root, k) {
  // YOUR CODE HERE
}`,
    solutionCode: `function kthSmallestBST(root, k) {
  let count = 0;
  let result = null;

  function inorder(node) {
    if (!node || result !== null) return;

    inorder(node.left);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  }

  inorder(root);
  return result;
}`,
    testCases: [
      {
        input: [
          {
            val: 3,
            left: { val: 1, left: null, right: { val: 2, left: null, right: null } },
            right: { val: 4, left: null, right: null },
          },
          1,
        ],
        expected: 1,
        description: 'smallest element',
      },
      {
        input: [
          {
            val: 5,
            left: {
              val: 3,
              left: { val: 2, left: { val: 1, left: null, right: null }, right: null },
              right: { val: 4, left: null, right: null },
            },
            right: { val: 6, left: null, right: null },
          },
          3,
        ],
        expected: 3,
        description: '3rd smallest element',
      },
      {
        input: [{ val: 10, left: null, right: null }, 1],
        expected: 10,
        description: 'single node tree',
      },
      {
        input: [
          {
            val: 2,
            left: { val: 1, left: null, right: null },
            right: { val: 3, left: null, right: null },
          },
          2,
        ],
        expected: 2,
        description: 'middle element',
      },
    ],
    hints: [
      'Inorder traversal of a BST visits nodes in ascending order',
      'Keep a counter and stop when you reach the kth node',
      'You can optimize by stopping the traversal once k is reached',
      'Use a helper function to track state during recursion',
    ],
    concepts: ['Binary Search Tree', 'Inorder Traversal', 'Recursion', 'Tree'],
  },
  {
    id: 'js-alien-dictionary',
    title: 'Alien Dictionary',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      "Derive the character ordering of an alien language from a sorted list of words. This advanced problem combines string comparison with topological sort: comparing adjacent words reveals character precedence edges, and Kahn's BFS algorithm produces a valid ordering or detects cycles indicating invalid input.",
    instructions: [
      'Words are sorted lexicographically by the alien language rules',
      'Derive the character order by comparing adjacent words',
      'Use topological sort to find a valid ordering',
      'Return the character order as a string, or empty string if invalid',
      'If multiple valid orders exist, return any one',
    ],
    starterCode: `function alienDictionary(words) {
  // YOUR CODE HERE
}`,
    solutionCode: `function alienDictionary(words) {
  const graph = new Map();
  const inDegree = new Map();

  // Initialize graph
  for (const word of words) {
    for (const char of word) {
      if (!graph.has(char)) {
        graph.set(char, new Set());
        inDegree.set(char, 0);
      }
    }
  }

  // Build graph
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    const minLen = Math.min(word1.length, word2.length);

    // Check for invalid case: word1 is prefix of word2 but word1 is longer
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return '';
    }

    for (let j = 0; j < minLen; j++) {
      if (word1[j] !== word2[j]) {
        if (!graph.get(word1[j]).has(word2[j])) {
          graph.get(word1[j]).add(word2[j]);
          inDegree.set(word2[j], inDegree.get(word2[j]) + 1);
        }
        break;
      }
    }
  }

  // Topological sort
  const queue = [];
  for (const [char, degree] of inDegree) {
    if (degree === 0) queue.push(char);
  }

  let result = '';
  while (queue.length > 0) {
    const char = queue.shift();
    result += char;

    for (const neighbor of graph.get(char)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result.length === inDegree.size ? result : '';
}`,
    testCases: [
      {
        input: [['wrt', 'wrf', 'er', 'ett', 'rftt']],
        expected: 'wertf',
        description: 'valid alien dictionary',
      },
      {
        input: [['z', 'x']],
        expected: 'zx',
        description: 'simple two character order',
      },
      {
        input: [['z', 'x', 'z']],
        expected: '',
        description: 'invalid order (cycle)',
      },
      {
        input: [['abc', 'ab']],
        expected: '',
        description: 'invalid (longer word before its prefix)',
      },
    ],
    hints: [
      'Compare adjacent words to determine character precedence',
      'Build a directed graph where edge u->v means u comes before v',
      "Use topological sort (Kahn's algorithm) with in-degree counting",
      'Detect cycles by checking if all characters are included in result',
    ],
    concepts: ['Topological Sort', 'Graph', 'BFS', 'In-degree', 'String'],
  },
  {
    id: 'js-max-path-sum-tree',
    title: 'Maximum Path Sum in Binary Tree',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Find the maximum path sum in a binary tree where a path can start and end at any node. This teaches post-order traversal with global state: each node computes its max single-branch gain while updating the global max with the through-node path. Negative gains are clamped to zero.',
    instructions: [
      'A path is a sequence of nodes where each pair of adjacent nodes has a parent-child relationship',
      'The path does not need to go through the root',
      'A path must contain at least one node',
      'Nodes can have negative values',
      'Nodes are {val, left, right}',
    ],
    starterCode: `function maxPathSumTree(root) {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxPathSumTree(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (!node) return 0;

    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    const pathSum = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, pathSum);

    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}`,
    testCases: [
      {
        input: [
          {
            val: 1,
            left: { val: 2, left: null, right: null },
            right: { val: 3, left: null, right: null },
          },
        ],
        expected: 6,
        description: 'simple tree: 2 + 1 + 3 = 6',
      },
      {
        input: [
          {
            val: -10,
            left: { val: 9, left: null, right: null },
            right: {
              val: 20,
              left: { val: 15, left: null, right: null },
              right: { val: 7, left: null, right: null },
            },
          },
        ],
        expected: 42,
        description: 'path: 15 + 20 + 7 = 42',
      },
      {
        input: [{ val: -3, left: null, right: null }],
        expected: -3,
        description: 'single negative node',
      },
      {
        input: [{ val: 2, left: { val: -1, left: null, right: null }, right: null }],
        expected: 2,
        description: 'ignore negative path',
      },
    ],
    hints: [
      'Use post-order traversal (process children before parent)',
      'For each node, calculate the max gain from left and right subtrees',
      'Update global max with current node + left gain + right gain',
      'Return the max single path through current node (not the sum of both branches)',
    ],
    concepts: ['Binary Tree', 'Recursion', 'Post-order Traversal', 'Path Sum'],
  },
  {
    id: 'js-letter-combinations',
    title: 'Letter Combinations of Phone Number',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Generate all possible letter combinations from a phone number digit string using the keypad mapping (2=abc, 3=def, etc.). This classic backtracking problem builds combinations character by character, branching at each digit. It teaches the generate-all-combinations pattern used in search and permutation problems.',
    instructions: [
      'Use phone keypad mapping: 2=abc, 3=def, 4=ghi, 5=jkl, 6=mno, 7=pqrs, 8=tuv, 9=wxyz',
      'Return all combinations in any order',
      'Use backtracking to generate combinations',
      'Return empty array for empty string input',
      'Each digit maps to 3-4 letters',
    ],
    starterCode: `function letterCombinations(digits) {
  // YOUR CODE HERE
}`,
    solutionCode: `function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const mapping = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const result = [];

  function backtrack(index, current) {
    if (index === digits.length) {
      result.push(current);
      return;
    }

    const letters = mapping[digits[index]];
    for (const letter of letters) {
      backtrack(index + 1, current + letter);
    }
  }

  backtrack(0, '');
  return result;
}`,
    testCases: [
      {
        input: ['23'],
        expected: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'],
        description: 'two digits',
      },
      {
        input: [''],
        expected: [],
        description: 'empty string',
      },
      {
        input: ['2'],
        expected: ['a', 'b', 'c'],
        description: 'single digit',
      },
      {
        input: ['79'],
        expected: [
          'pw',
          'px',
          'py',
          'pz',
          'qw',
          'qx',
          'qy',
          'qz',
          'rw',
          'rx',
          'ry',
          'rz',
          'sw',
          'sx',
          'sy',
          'sz',
        ],
        description: 'digits with 4 letters each',
      },
    ],
    hints: [
      'Use backtracking to build combinations character by character',
      'Keep track of current position in the digits string',
      'For each digit, try all possible letters it maps to',
      "Add to result when you've processed all digits",
    ],
    concepts: ['Backtracking', 'Recursion', 'Combinations', 'String'],
  },
  {
    id: 'js-combination-sum',
    title: 'Combination Sum',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Find all unique combinations of candidates that sum to a target, where each number can be reused unlimited times. This backtracking problem uses sorted input and a start index to avoid duplicates while allowing repetition. Pruning branches when the sum exceeds the target keeps it efficient.',
    instructions: [
      'All numbers (including target) are positive integers',
      'Each number can be used multiple times in a combination',
      'Return combinations sorted (each combination sorted, and result sorted)',
      'Use backtracking to explore all possibilities',
      'Avoid duplicate combinations',
    ],
    starterCode: `function combinationSum(candidates, target) {
  // YOUR CODE HERE
}`,
    solutionCode: `function combinationSum(candidates, target) {
  const result = [];
  candidates.sort((a, b) => a - b);

  function backtrack(start, current, sum) {
    if (sum === target) {
      result.push([...current]);
      return;
    }

    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, sum + candidates[i]);
      current.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
}`,
    testCases: [
      {
        input: [[2, 3, 6, 7], 7],
        expected: [[2, 2, 3], [7]],
        description: 'multiple combinations possible',
      },
      {
        input: [[2, 3, 5], 8],
        expected: [
          [2, 2, 2, 2],
          [2, 3, 3],
          [3, 5],
        ],
        description: 'numbers can be reused',
      },
      {
        input: [[2], 1],
        expected: [],
        description: 'no valid combination',
      },
      {
        input: [[1], 2],
        expected: [[1, 1]],
        description: 'single candidate used multiple times',
      },
    ],
    hints: [
      'Sort candidates to help with duplicate avoidance',
      'Use backtracking with start index to allow reusing same number',
      'Prune branches when current sum exceeds target',
      'Pass the same index to recursive call to allow number reuse',
    ],
    concepts: ['Backtracking', 'Recursion', 'Combinations', 'Array'],
  },
  {
    id: 'js-combination-sum-ii',
    title: 'Combination Sum II',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Find all unique combinations that sum to a target where each candidate can be used at most once. This extends Combination Sum I by incrementing the start index at each recursion level and skipping duplicate values at the same level. It teaches the standard duplicate-handling pattern in backtracking.',
    instructions: [
      'Each number in candidates can be used at most once',
      'The solution set must not contain duplicate combinations',
      'Sort the input to handle duplicates',
      'Skip duplicates at the same recursion level',
      'Return combinations in sorted order',
    ],
    starterCode: `function combinationSumII(candidates, target) {
  // YOUR CODE HERE
}`,
    solutionCode: `function combinationSumII(candidates, target) {
  const result = [];
  candidates.sort((a, b) => a - b);

  function backtrack(start, current, sum) {
    if (sum === target) {
      result.push([...current]);
      return;
    }

    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;

      current.push(candidates[i]);
      backtrack(i + 1, current, sum + candidates[i]);
      current.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
}`,
    testCases: [
      {
        input: [[10, 1, 2, 7, 6, 1, 5], 8],
        expected: [
          [1, 1, 6],
          [1, 2, 5],
          [1, 7],
          [2, 6],
        ],
        description: 'multiple combinations with duplicates in input',
      },
      {
        input: [[2, 5, 2, 1, 2], 5],
        expected: [[1, 2, 2], [5]],
        description: 'duplicate numbers in candidates',
      },
      {
        input: [[1], 2],
        expected: [],
        description: 'no valid combination',
      },
      {
        input: [[1, 1, 1], 2],
        expected: [[1, 1]],
        description: 'all duplicates',
      },
    ],
    hints: [
      'Sort candidates first to group duplicates',
      'Skip duplicates at the same recursion level (i > start)',
      'Use i+1 instead of i in recursive call (each number used once)',
      'Track current sum and prune when it exceeds target',
    ],
    concepts: ['Backtracking', 'Recursion', 'Duplicate Handling', 'Array'],
  },
  {
    id: 'js-palindrome-partition',
    title: 'Palindrome Partitioning',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Partition a string so every substring is a palindrome, returning all valid partitionings. This backtracking problem tries every possible cut point, checking if the left portion is a palindrome before recursing on the remainder. It combines palindrome checking with exhaustive partitioning for interview readiness.',
    instructions: [
      'Return all possible ways to partition the string into palindromes',
      'A palindrome reads the same forwards and backwards',
      'Use backtracking to explore all partitions',
      'Check if each substring is a palindrome before adding',
      'Return empty array for empty string input (or [[]] for one empty partition)',
    ],
    starterCode: `function palindromePartition(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function palindromePartition(s) {
  const result = [];

  function isPalindrome(str, left, right) {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function backtrack(start, current) {
    if (start === s.length) {
      result.push([...current]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        current.push(s.substring(start, end + 1));
        backtrack(end + 1, current);
        current.pop();
      }
    }
  }

  backtrack(0, []);
  return result;
}`,
    testCases: [
      {
        input: ['aab'],
        expected: [
          ['a', 'a', 'b'],
          ['aa', 'b'],
        ],
        description: 'multiple partitioning options',
      },
      {
        input: ['a'],
        expected: [['a']],
        description: 'single character',
      },
      {
        input: ['aba'],
        expected: [['a', 'b', 'a'], ['aba']],
        description: 'full string is palindrome',
      },
      {
        input: ['abc'],
        expected: [['a', 'b', 'c']],
        description: 'no palindrome substrings longer than 1',
      },
    ],
    hints: [
      'Use backtracking to try all possible partitions',
      'For each position, try all substrings starting from that position',
      'Check if substring is palindrome before recursing',
      'Use helper function to check palindrome efficiently',
    ],
    concepts: ['Backtracking', 'Recursion', 'Palindrome', 'String Partitioning'],
  },
  {
    id: 'js-restore-ip',
    title: 'Restore IP Addresses',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Generate all valid IPv4 addresses from a string of digits by inserting exactly three dots. This backtracking problem explores segment lengths of 1-3 digits, validating each segment is 0-255 with no leading zeros. It teaches constrained partitioning where the number of parts and value ranges are fixed.',
    instructions: [
      'A valid IPv4 has exactly 4 segments separated by dots',
      'Each segment is a number from 0 to 255',
      'Segments cannot have leading zeros (except "0" itself)',
      'Use backtracking to try all valid segmentations',
      'Input contains only digits',
    ],
    starterCode: `function restoreIP(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function restoreIP(s) {
  const result = [];

  function isValid(segment) {
    if (segment.length === 0 || segment.length > 3) return false;
    if (segment.length > 1 && segment[0] === '0') return false;
    const num = parseInt(segment);
    return num >= 0 && num <= 255;
  }

  function backtrack(start, parts) {
    if (parts.length === 4) {
      if (start === s.length) {
        result.push(parts.join('.'));
      }
      return;
    }

    for (let len = 1; len <= 3; len++) {
      if (start + len > s.length) break;
      const segment = s.substring(start, start + len);
      if (isValid(segment)) {
        backtrack(start + len, [...parts, segment]);
      }
    }
  }

  backtrack(0, []);
  return result;
}`,
    testCases: [
      {
        input: ['25525511135'],
        expected: ['255.255.11.135', '255.255.111.35'],
        description: 'two valid IP addresses',
      },
      {
        input: ['0000'],
        expected: ['0.0.0.0'],
        description: 'all zeros',
      },
      {
        input: ['101023'],
        expected: ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3'],
        description: 'multiple valid combinations',
      },
      {
        input: ['1111'],
        expected: ['1.1.1.1'],
        description: 'simple valid IP',
      },
      {
        input: ['010010'],
        expected: ['0.10.0.10', '0.100.1.0'],
        description: 'contains zeros and leading zero constraints',
      },
    ],
    hints: [
      'Use backtracking with exactly 4 segments',
      'Try segment lengths of 1, 2, and 3 digits',
      'Validate each segment: 0-255, no leading zeros',
      'Add to result only when 4 segments and all digits used',
    ],
    concepts: ['Backtracking', 'Recursion', 'String Manipulation', 'Validation'],
  },
  {
    id: 'js-sudoku-solver',
    title: 'Sudoku Solver',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Fill a 9x9 Sudoku board where empty cells are 0, ensuring each row, column, and 3x3 box contains digits 1-9 without repetition. This is a canonical constraint satisfaction problem solved via backtracking: try each valid digit, recurse, and undo on failure. It teaches systematic exhaustive search.',
    instructions: [
      'Each row must contain digits 1-9 without repetition',
      'Each column must contain digits 1-9 without repetition',
      'Each 3x3 sub-box must contain digits 1-9 without repetition',
      'Use backtracking with constraint checking',
      'Modify the board in-place and return it',
    ],
    starterCode: `function sudokuSolver(board) {
  // YOUR CODE HERE
}`,
    solutionCode: `function sudokuSolver(board) {
  function isValid(board, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  }

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;

              if (solve()) return true;

              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve();
  return board;
}`,
    testCases: [
      {
        input: [
          [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9],
          ],
        ],
        expected: [
          [5, 3, 4, 6, 7, 8, 9, 1, 2],
          [6, 7, 2, 1, 9, 5, 3, 4, 8],
          [1, 9, 8, 3, 4, 2, 5, 6, 7],
          [8, 5, 9, 7, 6, 1, 4, 2, 3],
          [4, 2, 6, 8, 5, 3, 7, 9, 1],
          [7, 1, 3, 9, 2, 4, 8, 5, 6],
          [9, 6, 1, 5, 3, 7, 2, 8, 4],
          [2, 8, 7, 4, 1, 9, 6, 3, 5],
          [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ],
        description: 'valid sudoku puzzle',
      },
      {
        input: [
          [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ],
        ],
        expected: [
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [4, 5, 6, 7, 8, 9, 1, 2, 3],
          [7, 8, 9, 1, 2, 3, 4, 5, 6],
          [2, 1, 4, 3, 6, 5, 8, 9, 7],
          [3, 6, 5, 8, 9, 7, 2, 1, 4],
          [8, 9, 7, 2, 1, 4, 3, 6, 5],
          [5, 3, 1, 6, 4, 2, 9, 7, 8],
          [6, 4, 2, 9, 7, 8, 5, 3, 1],
          [9, 7, 8, 5, 3, 1, 6, 4, 2],
        ],
        description: 'empty board',
      },
    ],
    hints: [
      'Use backtracking to try digits 1-9 for each empty cell',
      'Check row, column, and 3x3 box constraints before placing',
      'Backtrack (reset to 0) if no valid digit works',
      'Return true when all cells are filled',
    ],
    concepts: ['Backtracking', 'Recursion', 'Constraint Satisfaction', '2D Array'],
  },
  {
    id: 'js-subsets-with-dups',
    title: 'Subsets II',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Generate all unique subsets (power set) of an array that may contain duplicates. This backtracking problem sorts the input first, then skips duplicate elements at the same recursion level to prevent duplicate subsets. It teaches the fundamental pattern for handling duplicates in combinatorial generation.',
    instructions: [
      'The array may contain duplicate elements',
      'Return all unique subsets (power set)',
      'Sort the array first to handle duplicates',
      'Skip duplicates at the same recursion level',
      'Include the empty subset',
    ],
    starterCode: `function subsetsWithDups(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function subsetsWithDups(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  function backtrack(start, current) {
    result.push([...current]);

    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;

      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}`,
    testCases: [
      {
        input: [[1, 2, 2]],
        expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
        description: 'array with duplicates',
      },
      {
        input: [[0]],
        expected: [[], [0]],
        description: 'single element',
      },
      {
        input: [[4, 4, 4, 1, 4]],
        expected: [
          [],
          [1],
          [1, 4],
          [1, 4, 4],
          [1, 4, 4, 4],
          [1, 4, 4, 4, 4],
          [4],
          [4, 4],
          [4, 4, 4],
          [4, 4, 4, 4],
        ],
        description: 'multiple duplicates',
      },
    ],
    hints: [
      'Sort the array to group duplicates together',
      'Use backtracking to generate all subsets',
      'Skip duplicates when i > start and nums[i] === nums[i-1]',
      'Add current subset to result at each step',
    ],
    concepts: ['Backtracking', 'Recursion', 'Subsets', 'Duplicate Handling'],
  },
  {
    id: 'js-permutations-with-dups',
    title: 'Permutations II',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Generate all unique permutations of an array that may contain duplicate elements. This teaches the sorted-array-plus-used-array backtracking pattern: skip an element if its identical predecessor was not used, ensuring duplicates are consumed in order. This avoids generating and deduplicating afterward.',
    instructions: [
      'The array may contain duplicate elements',
      'Return all unique permutations',
      'Sort the array first and use a used array to track',
      'Skip duplicates by checking if previous same element is unused',
      'Each permutation should have the same length as input',
    ],
    starterCode: `function permutationsWithDups(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function permutationsWithDups(nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  const used = new Array(nums.length).fill(false);

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      current.push(nums[i]);
      backtrack(current);
      current.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}`,
    testCases: [
      {
        input: [[1, 1, 2]],
        expected: [
          [1, 1, 2],
          [1, 2, 1],
          [2, 1, 1],
        ],
        description: 'array with duplicates',
      },
      {
        input: [[1, 2, 3]],
        expected: [
          [1, 2, 3],
          [1, 3, 2],
          [2, 1, 3],
          [2, 3, 1],
          [3, 1, 2],
          [3, 2, 1],
        ],
        description: 'no duplicates',
      },
      {
        input: [[1]],
        expected: [[1]],
        description: 'single element',
      },
      {
        input: [[2, 2, 2]],
        expected: [[2, 2, 2]],
        description: 'all duplicates',
      },
    ],
    hints: [
      'Sort the array and use a used array to track selected elements',
      'Skip if current element is duplicate and previous duplicate not used',
      'This ensures duplicates are used in order, avoiding duplicate permutations',
      'Mark element as used, recurse, then unmark (backtrack)',
    ],
    concepts: ['Backtracking', 'Recursion', 'Permutations', 'Duplicate Handling'],
  },
  {
    id: 'js-flatten-tree-list',
    title: 'Flatten Binary Tree to Linked List',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Flatten a binary tree into a right-skewed linked list following preorder traversal order, modifying the tree in-place. This uses reverse postorder traversal (right, left, root) with a previous-node pointer, elegantly relinking nodes without extra space. It demonstrates in-place tree transformation techniques.',
    instructions: [
      'Modify the tree in-place to create a right-skewed tree',
      'The flattened tree should follow preorder traversal order',
      'All left children should be null',
      'Nodes are {val, left, right}',
      'Return the modified root',
    ],
    starterCode: `function flattenTreeList(root) {
  // YOUR CODE HERE
}`,
    solutionCode: `function flattenTreeList(root) {
  if (!root) return root;

  let prev = null;

  function flatten(node) {
    if (!node) return;

    flatten(node.right);
    flatten(node.left);

    node.right = prev;
    node.left = null;
    prev = node;
  }

  flatten(root);
  return root;
}`,
    testCases: [
      {
        input: [
          {
            val: 1,
            left: {
              val: 2,
              left: { val: 3, left: null, right: null },
              right: { val: 4, left: null, right: null },
            },
            right: { val: 5, left: null, right: { val: 6, left: null, right: null } },
          },
        ],
        expected: {
          val: 1,
          left: null,
          right: {
            val: 2,
            left: null,
            right: {
              val: 3,
              left: null,
              right: {
                val: 4,
                left: null,
                right: { val: 5, left: null, right: { val: 6, left: null, right: null } },
              },
            },
          },
        },
        description: 'flatten to preorder: 1,2,3,4,5,6',
      },
      {
        input: [null],
        expected: null,
        description: 'null tree',
      },
      {
        input: [{ val: 1, left: null, right: null }],
        expected: { val: 1, left: null, right: null },
        description: 'single node',
      },
    ],
    hints: [
      'Use reverse preorder traversal (right, left, root)',
      'Keep track of previous node visited',
      "Set current node's right to previous, left to null",
      'Process right subtree before left to maintain order',
    ],
    concepts: ['Binary Tree', 'Recursion', 'Preorder Traversal', 'In-place Modification'],
  },
  {
    id: 'js-all-paths-target-sum',
    title: 'Path Sum II',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Find all root-to-leaf paths in a binary tree where node values sum to a target. This DFS backtracking problem maintains a running path and sum, recording complete paths at leaf nodes. It teaches path tracking with backtracking cleanup, a pattern reusable across many tree traversal problems.',
    instructions: [
      'A leaf is a node with no children',
      'Return all paths as arrays of node values',
      'Nodes are {val, left, right}',
      'Use backtracking to explore all paths',
      'Return empty array if no paths found',
    ],
    starterCode: `function allPathsTargetSum(root, targetSum) {
  // YOUR CODE HERE
}`,
    solutionCode: `function allPathsTargetSum(root, targetSum) {
  const result = [];

  function dfs(node, current, sum) {
    if (!node) return;

    current.push(node.val);
    sum += node.val;

    if (!node.left && !node.right && sum === targetSum) {
      result.push([...current]);
    }

    dfs(node.left, current, sum);
    dfs(node.right, current, sum);

    current.pop();
  }

  dfs(root, [], 0);
  return result;
}`,
    testCases: [
      {
        input: [
          {
            val: 5,
            left: {
              val: 4,
              left: {
                val: 11,
                left: { val: 7, left: null, right: null },
                right: { val: 2, left: null, right: null },
              },
              right: null,
            },
            right: {
              val: 8,
              left: { val: 13, left: null, right: null },
              right: {
                val: 4,
                left: { val: 5, left: null, right: null },
                right: { val: 1, left: null, right: null },
              },
            },
          },
          22,
        ],
        expected: [
          [5, 4, 11, 2],
          [5, 8, 4, 5],
        ],
        description: 'two paths sum to 22',
      },
      {
        input: [
          {
            val: 1,
            left: { val: 2, left: null, right: null },
            right: { val: 3, left: null, right: null },
          },
          5,
        ],
        expected: [],
        description: 'no path sums to target',
      },
      {
        input: [{ val: 1, left: null, right: null }, 1],
        expected: [[1]],
        description: 'single node equals target',
      },
      {
        input: [null, 0],
        expected: [],
        description: 'null tree',
      },
    ],
    hints: [
      'Use DFS to explore all root-to-leaf paths',
      'Track current path and running sum',
      'Check if leaf node and sum equals target',
      'Backtrack by removing last element after exploring subtree',
    ],
    concepts: ['Binary Tree', 'Recursion', 'Backtracking', 'Path Sum', 'DFS'],
  },
  {
    id: 'js-max-depth-tree',
    title: 'Maximum Depth of Binary Tree',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Find the maximum depth (number of nodes on the longest root-to-leaf path) of a binary tree. This beginner recursion exercise demonstrates the divide-and-conquer pattern: the depth is 1 plus the max of left and right subtree depths. It is often the first tree problem encountered in interviews.',
    instructions: [
      'Return the maximum depth of the tree',
      'A null tree has depth 0',
      'A single node has depth 1',
      'Nodes are {val, left, right}',
      'Use recursion to calculate depth',
    ],
    starterCode: `function maxDepthTree(root) {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxDepthTree(root) {
  if (!root) return 0;

  const leftDepth = maxDepthTree(root.left);
  const rightDepth = maxDepthTree(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}`,
    testCases: [
      {
        input: [
          {
            val: 3,
            left: { val: 9, left: null, right: null },
            right: {
              val: 20,
              left: { val: 15, left: null, right: null },
              right: { val: 7, left: null, right: null },
            },
          },
        ],
        expected: 3,
        description: 'tree with depth 3',
      },
      {
        input: [{ val: 1, left: null, right: { val: 2, left: null, right: null } }],
        expected: 2,
        description: 'right-skewed tree',
      },
      {
        input: [null],
        expected: 0,
        description: 'null tree',
      },
      {
        input: [{ val: 1, left: null, right: null }],
        expected: 1,
        description: 'single node',
      },
    ],
    hints: [
      'Base case: null node has depth 0',
      'Recursively find depth of left and right subtrees',
      'Return max of left and right depths plus 1 for current node',
      'This is a classic post-order traversal problem',
    ],
    concepts: ['Binary Tree', 'Recursion', 'Tree Depth', 'Post-order Traversal'],
  },
  {
    id: 'js-invert-binary-tree',
    title: 'Invert Binary Tree',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Invert a binary tree by swapping the left and right children of every node recursively. This famous beginner problem teaches tree mutation via preorder traversal: swap children at each node, then recurse. Despite its simplicity, it tests understanding of recursion and tree structure manipulation.',
    instructions: [
      'Swap left and right children for every node',
      'Do this recursively for all nodes',
      'Nodes are {val, left, right}',
      'Return the root of the inverted tree',
      'Null tree returns null',
    ],
    starterCode: `function invertBinaryTree(root) {
  // YOUR CODE HERE
}`,
    solutionCode: `function invertBinaryTree(root) {
  if (!root) return null;

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertBinaryTree(root.left);
  invertBinaryTree(root.right);

  return root;
}`,
    testCases: [
      {
        input: [
          {
            val: 4,
            left: {
              val: 2,
              left: { val: 1, left: null, right: null },
              right: { val: 3, left: null, right: null },
            },
            right: {
              val: 7,
              left: { val: 6, left: null, right: null },
              right: { val: 9, left: null, right: null },
            },
          },
        ],
        expected: {
          val: 4,
          left: {
            val: 7,
            left: { val: 9, left: null, right: null },
            right: { val: 6, left: null, right: null },
          },
          right: {
            val: 2,
            left: { val: 3, left: null, right: null },
            right: { val: 1, left: null, right: null },
          },
        },
        description: 'invert complete tree',
      },
      {
        input: [
          {
            val: 2,
            left: { val: 1, left: null, right: null },
            right: { val: 3, left: null, right: null },
          },
        ],
        expected: {
          val: 2,
          left: { val: 3, left: null, right: null },
          right: { val: 1, left: null, right: null },
        },
        description: 'simple three-node tree',
      },
      {
        input: [null],
        expected: null,
        description: 'null tree',
      },
      {
        input: [{ val: 1, left: null, right: null }],
        expected: { val: 1, left: null, right: null },
        description: 'single node',
      },
    ],
    hints: [
      'Base case: if node is null, return null',
      'Swap the left and right children of current node',
      'Recursively invert the left and right subtrees',
      'Return the root after inversion',
    ],
    concepts: ['Binary Tree', 'Recursion', 'Tree Manipulation', 'Preorder Traversal'],
  },
  {
    id: 'js-koko-eating-bananas',
    title: 'Koko Eating Bananas',
    category: 'searching' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the minimum eating speed for Koko to finish all banana piles within h hours. This teaches binary search on the answer space: the search range is 1 to max pile size, and for each candidate speed, a greedy check determines feasibility. It is a template for many binary-search-on-answer problems.',
    instructions: [
      'Koko can eat at most k bananas per hour',
      "If a pile has fewer than k bananas, she eats all and won't eat more that hour",
      'Find minimum integer k such that she can eat all bananas within h hours',
      'Use binary search on the answer space (1 to max pile size)',
    ],
    starterCode: `function kokoEating(piles, hours) {
  // YOUR CODE HERE
}`,
    solutionCode: `function kokoEating(piles, hours) {
  let left = 1;
  let right = Math.max(...piles);

  function canEatAll(speed) {
    let hoursNeeded = 0;
    for (const pile of piles) {
      hoursNeeded += Math.ceil(pile / speed);
    }
    return hoursNeeded <= hours;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canEatAll(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}`,
    testCases: [
      { input: [[3, 6, 7, 11], 8], expected: 4, description: 'Standard case' },
      {
        input: [[30, 11, 23, 4, 20], 5],
        expected: 30,
        description: 'Must eat fastest pile in 1 hour',
      },
      { input: [[30, 11, 23, 4, 20], 6], expected: 23, description: 'Can eat slower' },
      { input: [[1, 1, 1, 1], 4], expected: 1, description: 'Minimum speed' },
      { input: [[1000000000], 2], expected: 500000000, description: 'Large pile' },
    ],
    hints: [
      'Binary search on the eating speed, not on the array',
      'For each candidate speed, check if Koko can finish in time',
      'Use Math.ceil(pile / speed) to calculate hours per pile',
      'Search range is from 1 to the maximum pile size',
    ],
    concepts: ['binary-search', 'binary-search-on-answer', 'optimization'],
  },
  {
    id: 'js-ship-capacity',
    title: 'Capacity to Ship Packages Within D Days',
    category: 'searching' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the minimum ship capacity to transport all packages within a given number of days, preserving order. This binary-search-on-answer problem searches between max weight and total weight, using a greedy simulation to count days needed per candidate capacity. It directly parallels the Koko bananas pattern.',
    instructions: [
      'Ship packages in the order given',
      'Ship capacity is the maximum weight it can carry per day',
      'Find minimum capacity to ship all packages within days',
      'Use binary search on capacity',
    ],
    starterCode: `function shipWithinDays(weights, days) {
  // YOUR CODE HERE
}`,
    solutionCode: `function shipWithinDays(weights, days) {
  let left = Math.max(...weights);
  let right = weights.reduce((sum, w) => sum + w, 0);

  function canShip(capacity) {
    let daysNeeded = 1;
    let currentLoad = 0;

    for (const weight of weights) {
      if (currentLoad + weight > capacity) {
        daysNeeded++;
        currentLoad = weight;
      } else {
        currentLoad += weight;
      }
    }

    return daysNeeded <= days;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canShip(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5], expected: 15, description: 'Standard case' },
      { input: [[3, 2, 2, 4, 1, 4], 3], expected: 6, description: 'Multiple packages per day' },
      { input: [[1, 2, 3, 1, 1], 4], expected: 3, description: 'Need to combine some packages' },
      { input: [[10], 1], expected: 10, description: 'Single package' },
      { input: [[1, 2, 3, 4, 5], 1], expected: 15, description: 'All in one day' },
    ],
    hints: [
      'Minimum capacity must be at least the heaviest package',
      'Maximum capacity is the sum of all weights (ship everything in 1 day)',
      'For each candidate capacity, simulate the shipping process',
      'Greedy: load as much as possible each day',
    ],
    concepts: ['binary-search', 'binary-search-on-answer', 'greedy', 'simulation'],
  },
  {
    id: 'js-split-array-largest-sum',
    title: 'Split Array Largest Sum',
    category: 'searching' as const,
    difficulty: 'advanced' as const,
    description:
      'Split an array into m contiguous subarrays to minimize the largest subarray sum. This advanced binary-search-on-answer problem searches between the max element and total sum. The greedy feasibility check counts how many subarrays are needed for a given max-sum limit. It has applications in load balancing.',
    instructions: [
      'Split nums into m non-empty continuous subarrays',
      'Minimize the largest sum among the m subarrays',
      'Use binary search on the answer (the largest sum)',
      'For each candidate max sum, check if we can split into m or fewer subarrays',
    ],
    starterCode: `function splitArray(nums, m) {
  // YOUR CODE HERE
}`,
    solutionCode: `function splitArray(nums, m) {
  let left = Math.max(...nums);
  let right = nums.reduce((sum, n) => sum + n, 0);

  function canSplit(maxSum) {
    let subarrays = 1;
    let currentSum = 0;

    for (const num of nums) {
      if (currentSum + num > maxSum) {
        subarrays++;
        currentSum = num;
      } else {
        currentSum += num;
      }
    }

    return subarrays <= m;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canSplit(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}`,
    testCases: [
      { input: [[7, 2, 5, 10, 8], 2], expected: 18, description: 'Split into [7,2,5] and [10,8]' },
      { input: [[1, 2, 3, 4, 5], 2], expected: 9, description: 'Split into [1,2,3,4] and [5]' },
      { input: [[1, 4, 4], 3], expected: 4, description: 'Each element in its own subarray' },
      {
        input: [[10, 5, 13, 4, 8, 4, 5, 11, 14, 9, 16, 10, 20, 8], 8],
        expected: 25,
        description: 'Complex case',
      },
      { input: [[1, 1, 1, 1], 2], expected: 2, description: 'Equal distribution' },
    ],
    hints: [
      'Binary search on the maximum subarray sum',
      'Minimum possible answer is the largest element',
      'Maximum possible answer is the sum of all elements',
      'Greedy check: try to fit as many elements as possible in each subarray',
    ],
    concepts: ['binary-search', 'binary-search-on-answer', 'greedy', 'optimization'],
  },
  {
    id: 'js-first-last-position',
    title: 'Find First and Last Position of Element',
    category: 'searching' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the starting and ending positions of a target value in a sorted array in O(log n) time. This teaches running two binary searches: one biased left to find the first occurrence, one biased right for the last. It is the standard technique for finding ranges in sorted data.',
    instructions: [
      'Given sorted array in ascending order',
      'Find starting and ending position of target',
      'Must run in O(log n) time',
      'Use two binary searches: one for leftmost, one for rightmost',
    ],
    starterCode: `function searchRange(nums, target) {
  // YOUR CODE HERE
}`,
    solutionCode: `function searchRange(nums, target) {
  function findLeft() {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        result = mid;
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  function findRight() {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        result = mid;
        left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  const leftPos = findLeft();
  if (leftPos === -1) return [-1, -1];

  const rightPos = findRight();
  return [leftPos, rightPos];
}`,
    testCases: [
      { input: [[5, 7, 7, 8, 8, 10], 8], expected: [3, 4], description: 'Target appears twice' },
      { input: [[5, 7, 7, 8, 8, 10], 6], expected: [-1, -1], description: 'Target not found' },
      { input: [[1], 1], expected: [0, 0], description: 'Single element' },
      { input: [[2, 2, 2, 2, 2], 2], expected: [0, 4], description: 'All elements are target' },
      { input: [[], 0], expected: [-1, -1], description: 'Empty array' },
    ],
    hints: [
      'Perform two separate binary searches',
      'First search: when finding target, continue searching left',
      'Second search: when finding target, continue searching right',
      'Store the result each time you find the target',
    ],
    concepts: ['binary-search', 'array', 'two-pass'],
  },
  {
    id: 'js-single-element-sorted',
    title: 'Single Element in a Sorted Array',
    category: 'searching' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the single non-duplicate element in a sorted array where every other element appears exactly twice, in O(log n) time. This uses binary search on pair index parity: before the single element pairs align at even-odd indices, and after they shift. Adjusting mid to even indices simplifies the check.',
    instructions: [
      'Array is sorted in ascending order',
      'Every element appears twice except one',
      'Find the single element in O(log n) time',
      'Use binary search based on pair index parity',
    ],
    starterCode: `function singleNonDuplicate(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // Ensure mid is at the first element of a pair
    if (mid % 2 === 1) {
      mid--;
    }

    // If the pair is intact, single element is on the right
    if (nums[mid] === nums[mid + 1]) {
      left = mid + 2;
    } else {
      // Pair is broken, single element is on the left (including mid)
      right = mid;
    }
  }

  return nums[left];
}`,
    testCases: [
      { input: [1, 1, 2, 3, 3, 4, 4, 8, 8], expected: 2, description: 'Single element in middle' },
      { input: [3, 3, 7, 7, 10, 11, 11], expected: 10, description: 'Single element near end' },
      { input: [1], expected: 1, description: 'Single element array' },
      { input: [1, 1, 2], expected: 2, description: 'Single element at end' },
      { input: [1, 2, 2, 3, 3], expected: 1, description: 'Single element at start' },
    ],
    hints: [
      'In a complete paired array, element at even index equals element at odd index+1',
      'When the single element appears, this pattern breaks',
      'Adjust mid to always point to the first element of a potential pair',
      'Check if the pair is intact to decide which half to search',
    ],
    concepts: ['binary-search', 'array', 'math', 'parity'],
  },
  {
    id: 'js-search-rotated-ii',
    title: 'Search in Rotated Sorted Array II',
    category: 'searching' as const,
    difficulty: 'intermediate' as const,
    description:
      'Search for a target in a rotated sorted array that may contain duplicates. This extends the rotated array search by handling the ambiguous case where left, mid, and right values are equal by shrinking both ends. It demonstrates how duplicates can degrade binary search to O(n) in the worst case.',
    instructions: [
      'Array is sorted but rotated at an unknown pivot',
      'Array may contain duplicates',
      'Return true if target exists, false otherwise',
      'Handle duplicates by shrinking bounds when nums[left] === nums[mid] === nums[right]',
    ],
    starterCode: `function searchRotatedII(nums, target) {
  // YOUR CODE HERE
}`,
    solutionCode: `function searchRotatedII(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return true;
    }

    // Handle duplicates
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
      continue;
    }

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
}`,
    testCases: [
      {
        input: [[2, 5, 6, 0, 0, 1, 2], 0],
        expected: true,
        description: 'Target exists with duplicates',
      },
      { input: [[2, 5, 6, 0, 0, 1, 2], 3], expected: false, description: 'Target does not exist' },
      { input: [[1, 0, 1, 1, 1], 0], expected: true, description: 'Many duplicates' },
      {
        input: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 2],
        expected: true,
        description: 'Mostly duplicates',
      },
      { input: [[3, 1], 1], expected: true, description: 'Two elements' },
    ],
    hints: [
      'Similar to Search in Rotated Sorted Array I but handle duplicates',
      'When all three (left, mid, right) are equal, shrink both ends',
      'Determine which half is sorted, then check if target is in that range',
      'Worst case is O(n) when array is all duplicates',
    ],
    concepts: ['binary-search', 'array', 'edge-cases', 'duplicates'],
  },
  {
    id: 'js-median-two-sorted',
    title: 'Median of Two Sorted Arrays',
    category: 'searching' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the median of two sorted arrays in O(log(min(m,n))) time using binary search partition. This hard-level problem partitions the smaller array so that left halves of both arrays contain exactly half the total elements. Correct partition is found when cross-boundary elements satisfy the ordering constraint.',
    instructions: [
      'Two sorted arrays of size m and n',
      'Find the median of the two sorted arrays',
      'Time complexity must be O(log(min(m,n)))',
      'Use binary partition approach to divide arrays into equal halves',
    ],
    starterCode: `function findMedianSorted(nums1, nums2) {
  // YOUR CODE HERE
}`,
    solutionCode: `function findMedianSorted(nums1, nums2) {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const partition1 = Math.floor((left + right) / 2);
    const partition2 = Math.floor((m + n + 1) / 2) - partition1;

    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];

    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // Found the correct partition
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      } else {
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      right = partition1 - 1;
    } else {
      left = partition1 + 1;
    }
  }

  throw new Error('Input arrays are not sorted');
}`,
    testCases: [
      { input: [[1, 3], [2]], expected: 2, description: 'Odd total length' },
      {
        input: [
          [1, 2],
          [3, 4],
        ],
        expected: 2.5,
        description: 'Even total length',
      },
      {
        input: [
          [0, 0],
          [0, 0],
        ],
        expected: 0,
        description: 'All zeros',
      },
      { input: [[], [1]], expected: 1, description: 'One empty array' },
      { input: [[1], [2, 3, 4, 5, 6]], expected: 3.5, description: 'Very different sizes' },
    ],
    hints: [
      'Binary search on the smaller array for efficiency',
      'Partition both arrays so left half has (m+n+1)/2 elements',
      'Check if partition is valid: maxLeft1 <= minRight2 && maxLeft2 <= minRight1',
      'Median is max of left elements (odd) or average of max left and min right (even)',
    ],
    concepts: ['binary-search', 'array', 'partition', 'median'],
  },
  {
    id: 'js-kth-sorted-matrix',
    title: 'Kth Smallest Element in a Sorted Matrix',
    category: 'searching' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the kth smallest element in an n x n matrix where each row and column is sorted. This binary-search-on-value problem searches between the min and max matrix values, counting elements <= mid using the sorted structure. The staircase counting technique achieves O(n) per check.',
    instructions: [
      'Matrix has rows and columns sorted in ascending order',
      'Find the kth smallest element (1-indexed)',
      'Use binary search on value range',
      'Count how many elements are <= mid value',
    ],
    starterCode: `function kthSmallest(matrix, k) {
  // YOUR CODE HERE
}`,
    solutionCode: `function kthSmallest(matrix, k) {
  const n = matrix.length;
  let left = matrix[0][0];
  let right = matrix[n - 1][n - 1];

  function countLessOrEqual(target) {
    let count = 0;
    let col = n - 1;

    for (let row = 0; row < n; row++) {
      while (col >= 0 && matrix[row][col] > target) {
        col--;
      }
      count += col + 1;
    }

    return count;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const count = countLessOrEqual(mid);

    if (count < k) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}`,
    testCases: [
      {
        input: [
          [
            [1, 5, 9],
            [10, 11, 13],
            [12, 13, 15],
          ],
          8,
        ],
        expected: 13,
        description: 'Standard 3x3 matrix',
      },
      { input: [[[-5]], 1], expected: -5, description: 'Single element' },
      {
        input: [
          [
            [1, 2],
            [1, 3],
          ],
          2,
        ],
        expected: 1,
        description: 'With duplicates',
      },
      {
        input: [
          [
            [1, 3, 5],
            [6, 7, 12],
            [11, 14, 14],
          ],
          5,
        ],
        expected: 7,
        description: 'Fifth smallest',
      },
      {
        input: [
          [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
          ],
          10,
        ],
        expected: 10,
        description: '4x4 matrix',
      },
    ],
    hints: [
      'Binary search on the value range, not on indices',
      'For each candidate value, count elements <= that value',
      'Use the sorted property: start from top-right, move left when too large, down when too small',
      'The answer is the smallest value where count >= k',
    ],
    concepts: ['binary-search', 'matrix', 'two-pointers', 'counting'],
  },
  {
    id: 'js-k-closest-elements',
    title: 'Find K Closest Elements',
    category: 'searching' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the k closest integers to a target in a sorted array, returned in ascending order. This uses binary search to locate the optimal starting position of a k-element window. Comparing distances at both ends of the candidate window lets you slide it efficiently in O(log(n-k) + k) time.',
    instructions: [
      'Given sorted array in ascending order',
      'Find k closest elements to target',
      'If tie, prefer the smaller element',
      'Use binary search to find the starting position of the k-element window',
    ],
    starterCode: `function findClosestElements(arr, k, target) {
  // YOUR CODE HERE
}`,
    solutionCode: `function findClosestElements(arr, k, target) {
  let left = 0;
  let right = arr.length - k;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Compare distances from target
    // If arr[mid] is farther from target than arr[mid + k], move right
    if (target - arr[mid] > arr[mid + k] - target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr.slice(left, left + k);
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], 4, 3], expected: [1, 2, 3, 4], description: 'Target in middle' },
      {
        input: [[1, 2, 3, 4, 5], 4, -1],
        expected: [1, 2, 3, 4],
        description: 'Target before array',
      },
      { input: [[1, 2, 3, 4, 5], 4, 6], expected: [2, 3, 4, 5], description: 'Target after array' },
      { input: [[1, 1, 1, 10, 10, 10], 1, 9], expected: [10], description: 'With duplicates' },
      {
        input: [[0, 1, 2, 2, 2, 3, 6, 8, 8, 9], 5, 5],
        expected: [2, 3, 6, 8, 8],
        description: 'Complex case',
      },
    ],
    hints: [
      'Binary search for the left boundary of the k-element window',
      'Search space is from 0 to arr.length - k',
      'Compare distances: target - arr[mid] vs arr[mid + k] - target',
      'If left element is farther, move window right',
    ],
    concepts: ['binary-search', 'sliding-window', 'array'],
  },
  {
    id: 'js-min-speed-on-time',
    title: 'Minimum Speed to Arrive on Time',
    category: 'searching' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the minimum integer travel speed to cover all distances within a time limit, where each leg except the last requires rounding up to the next integer hour. This binary-search-on-answer problem uses Math.ceil for intermediate legs and exact division for the last. It teaches real-number constraint modeling.',
    instructions: [
      'Given array of distances and time limit (hour)',
      'Must travel distances in order',
      'Wait for next integer hour between trips (except last)',
      'Find minimum integer speed, or -1 if impossible',
    ],
    starterCode: `function minSpeedOnTime(distances, hour) {
  // YOUR CODE HERE
}`,
    solutionCode: `function minSpeedOnTime(distances, hour) {
  const n = distances.length;

  // Impossible if hour is too small
  if (hour <= n - 1) {
    return -1;
  }

  let left = 1;
  let right = 10000000; // 10^7
  let result = -1;

  function canArrive(speed) {
    let time = 0;

    for (let i = 0; i < n - 1; i++) {
      time += Math.ceil(distances[i] / speed);
    }

    // Last distance doesn't need to wait for next hour
    time += distances[n - 1] / speed;

    return time <= hour;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canArrive(mid)) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}`,
    testCases: [
      { input: [[1, 3, 2], 6], expected: 1, description: 'Can arrive with speed 1' },
      { input: [[1, 3, 2], 2.7], expected: 3, description: 'Need faster speed' },
      { input: [[1, 3, 2], 1.9], expected: -1, description: 'Impossible to arrive' },
      { input: [[1, 1, 100000], 2.01], expected: 10000000, description: 'Need very high speed' },
      { input: [[5, 3, 4, 6, 2, 2, 7], 10.92], expected: 4, description: 'Multiple distances' },
    ],
    hints: [
      'Binary search on speed from 1 to 10^7',
      'For each speed, calculate total time needed',
      'Use Math.ceil for all trips except the last one',
      'If hour <= n-1, impossible (need at least 1 hour per trip except last)',
    ],
    concepts: ['binary-search', 'binary-search-on-answer', 'math', 'ceiling'],
  },
  {
    id: 'js-segment-tree-sum',
    title: 'Segment Tree Range Sum Query',
    category: 'data-structures' as const,
    difficulty: 'advanced' as const,
    description:
      'Process point updates and range sum queries on an array using a segment tree. This fundamental data structure divides the array into a balanced binary tree of ranges, enabling both operations in O(log n) time. Segment trees are essential for competitive programming and real-time analytics systems.',
    instructions: [
      'Given initial array and operations',
      'Operation ["update", i, val] sets nums[i] = val',
      'Operation ["query", l, r] returns sum of nums[l..r] inclusive',
      'Return array of results for all query operations',
    ],
    starterCode: `function segmentTreeQueries(nums, operations) {
  // YOUR CODE HERE
}`,
    solutionCode: `function segmentTreeQueries(nums, operations) {
  const n = nums.length;
  const tree = new Array(4 * n).fill(0);

  function build(node, start, end) {
    if (start === end) {
      tree[node] = nums[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node + 1;
      const rightChild = 2 * node + 2;

      build(leftChild, start, mid);
      build(rightChild, mid + 1, end);

      tree[node] = tree[leftChild] + tree[rightChild];
    }
  }

  function update(node, start, end, idx, val) {
    if (start === end) {
      tree[node] = val;
      nums[idx] = val;
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node + 1;
      const rightChild = 2 * node + 2;

      if (idx <= mid) {
        update(leftChild, start, mid, idx, val);
      } else {
        update(rightChild, mid + 1, end, idx, val);
      }

      tree[node] = tree[leftChild] + tree[rightChild];
    }
  }

  function query(node, start, end, l, r) {
    if (r < start || end < l) {
      return 0;
    }

    if (l <= start && end <= r) {
      return tree[node];
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    const leftSum = query(leftChild, start, mid, l, r);
    const rightSum = query(rightChild, mid + 1, end, l, r);

    return leftSum + rightSum;
  }

  build(0, 0, n - 1);

  const results = [];

  for (const op of operations) {
    if (op[0] === 'update') {
      update(0, 0, n - 1, op[1], op[2]);
    } else if (op[0] === 'query') {
      results.push(query(0, 0, n - 1, op[1], op[2]));
    }
  }

  return results;
}`,
    testCases: [
      {
        input: [
          [1, 3, 5, 7, 9, 11],
          [
            ['query', 0, 2],
            ['update', 1, 10],
            ['query', 0, 2],
          ],
        ],
        expected: [9, 16],
        description: 'Update then query',
      },
      {
        input: [
          [1, 2, 3, 4, 5],
          [
            ['query', 0, 4],
            ['query', 1, 3],
            ['update', 2, 10],
            ['query', 1, 3],
          ],
        ],
        expected: [15, 9, 16],
        description: 'Multiple operations',
      },
      {
        input: [
          [5],
          [
            ['query', 0, 0],
            ['update', 0, 3],
            ['query', 0, 0],
          ],
        ],
        expected: [5, 3],
        description: 'Single element',
      },
      {
        input: [
          [1, 1, 1, 1, 1],
          [
            ['query', 2, 4],
            ['update', 3, 5],
            ['query', 2, 4],
          ],
        ],
        expected: [3, 7],
        description: 'Uniform array',
      },
      {
        input: [
          [10, 20, 30, 40],
          [
            ['query', 0, 1],
            ['query', 2, 3],
            ['update', 1, 25],
            ['query', 0, 3],
          ],
        ],
        expected: [30, 70, 105],
        description: 'Multiple queries and update',
      },
    ],
    hints: [
      'Build segment tree with size 4*n for safety',
      'Each node stores the sum of its range',
      'Update: traverse to leaf, update it, then propagate changes upward',
      'Query: combine results from left and right children when range overlaps',
    ],
    concepts: ['segment-tree', 'tree', 'range-query', 'recursion'],
  },
  {
    id: 'js-segment-tree-min',
    title: 'Segment Tree Range Min Query',
    category: 'data-structures' as const,
    difficulty: 'advanced' as const,
    description:
      'Process point updates and range minimum queries on an array using a segment tree. This variant stores the minimum instead of the sum at each node, returning Infinity for non-overlapping ranges. It teaches how segment trees generalize to any associative operation like min, max, GCD, or XOR.',
    instructions: [
      'Given initial array and operations',
      'Operation ["update", i, val] sets nums[i] = val',
      'Operation ["query", l, r] returns minimum of nums[l..r] inclusive',
      'Return array of results for all query operations',
    ],
    starterCode: `function segmentTreeMinQueries(nums, operations) {
  // YOUR CODE HERE
}`,
    solutionCode: `function segmentTreeMinQueries(nums, operations) {
  const n = nums.length;
  const tree = new Array(4 * n).fill(Infinity);

  function build(node, start, end) {
    if (start === end) {
      tree[node] = nums[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node + 1;
      const rightChild = 2 * node + 2;

      build(leftChild, start, mid);
      build(rightChild, mid + 1, end);

      tree[node] = Math.min(tree[leftChild], tree[rightChild]);
    }
  }

  function update(node, start, end, idx, val) {
    if (start === end) {
      tree[node] = val;
      nums[idx] = val;
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node + 1;
      const rightChild = 2 * node + 2;

      if (idx <= mid) {
        update(leftChild, start, mid, idx, val);
      } else {
        update(rightChild, mid + 1, end, idx, val);
      }

      tree[node] = Math.min(tree[leftChild], tree[rightChild]);
    }
  }

  function query(node, start, end, l, r) {
    if (r < start || end < l) {
      return Infinity;
    }

    if (l <= start && end <= r) {
      return tree[node];
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    const leftMin = query(leftChild, start, mid, l, r);
    const rightMin = query(rightChild, mid + 1, end, l, r);

    return Math.min(leftMin, rightMin);
  }

  build(0, 0, n - 1);

  const results = [];

  for (const op of operations) {
    if (op[0] === 'update') {
      update(0, 0, n - 1, op[1], op[2]);
    } else if (op[0] === 'query') {
      results.push(query(0, 0, n - 1, op[1], op[2]));
    }
  }

  return results;
}`,
    testCases: [
      {
        input: [
          [5, 3, 7, 2, 9, 1],
          [
            ['query', 0, 2],
            ['update', 1, 10],
            ['query', 0, 2],
          ],
        ],
        expected: [3, 5],
        description: 'Update increases minimum',
      },
      {
        input: [
          [10, 20, 30, 40, 50],
          [
            ['query', 0, 4],
            ['query', 1, 3],
            ['update', 2, 5],
            ['query', 1, 3],
          ],
        ],
        expected: [10, 20, 5],
        description: 'Update decreases minimum',
      },
      {
        input: [
          [100],
          [
            ['query', 0, 0],
            ['update', 0, 50],
            ['query', 0, 0],
          ],
        ],
        expected: [100, 50],
        description: 'Single element',
      },
      {
        input: [
          [8, 3, 5, 2, 6],
          [
            ['query', 1, 3],
            ['update', 2, 1],
            ['query', 1, 3],
          ],
        ],
        expected: [2, 1],
        description: 'Update creates new minimum',
      },
      {
        input: [
          [15, 10, 20, 8],
          [
            ['query', 0, 1],
            ['query', 2, 3],
            ['update', 3, 25],
            ['query', 2, 3],
          ],
        ],
        expected: [10, 8, 20],
        description: 'Multiple queries',
      },
    ],
    hints: [
      'Similar to range sum, but store minimum instead of sum',
      'Each node stores the minimum of its range',
      "Return Infinity when query range doesn't overlap with segment",
      'Update propagates minimum values upward',
    ],
    concepts: ['segment-tree', 'tree', 'range-query', 'recursion', 'minimum'],
  },
  {
    id: 'js-lfu-cache',
    title: 'LFU Cache',
    category: 'data-structures' as const,
    difficulty: 'advanced' as const,
    description:
      'Implement a Least Frequently Used cache that evicts the least-frequently accessed item when at capacity, breaking ties by least recently used. This advanced data structure problem requires tracking frequency counts, per-frequency lists, and the minimum frequency. It appears in system design interviews.',
    instructions: [
      'Given capacity and operations',
      'Operation ["put", key, value] adds/updates key',
      'Operation ["get", key] returns value or -1 if not found',
      'When at capacity, evict least frequently used (break ties by least recently used)',
      'Return array of results for all get operations',
    ],
    starterCode: `function lfuCache(capacity, operations) {
  // YOUR CODE HERE
}`,
    solutionCode: `function lfuCache(capacity, operations) {
  if (capacity === 0) {
    return operations.filter(op => op[0] === 'get').map(() => -1);
  }

  const cache = new Map();
  const frequencies = new Map();
  const keyToFreq = new Map();
  let minFreq = 0;
  let timestamp = 0;

  const results = [];

  for (const op of operations) {
    if (op[0] === 'get') {
      const key = op[1];

      if (!cache.has(key)) {
        results.push(-1);
      } else {
        // Update frequency
        const freq = keyToFreq.get(key);
        const newFreq = freq + 1;

        // Remove from old frequency list
        const freqList = frequencies.get(freq);
        freqList.delete(key);

        if (freqList.size === 0 && freq === minFreq) {
          minFreq = newFreq;
        }

        // Add to new frequency list
        if (!frequencies.has(newFreq)) {
          frequencies.set(newFreq, new Map());
        }
        frequencies.get(newFreq).set(key, timestamp++);

        keyToFreq.set(key, newFreq);
        results.push(cache.get(key));
      }
    } else if (op[0] === 'put') {
      const key = op[1];
      const value = op[2];

      if (cache.has(key)) {
        // Update existing key
        cache.set(key, value);

        const freq = keyToFreq.get(key);
        const newFreq = freq + 1;

        const freqList = frequencies.get(freq);
        freqList.delete(key);

        if (freqList.size === 0 && freq === minFreq) {
          minFreq = newFreq;
        }

        if (!frequencies.has(newFreq)) {
          frequencies.set(newFreq, new Map());
        }
        frequencies.get(newFreq).set(key, timestamp++);

        keyToFreq.set(key, newFreq);
      } else {
        // Add new key
        if (cache.size >= capacity) {
          // Evict LFU (and LRU if tie)
          const minFreqList = frequencies.get(minFreq);
          let lruKey = null;
          let lruTime = Infinity;

          for (const [k, time] of minFreqList) {
            if (time < lruTime) {
              lruTime = time;
              lruKey = k;
            }
          }

          minFreqList.delete(lruKey);
          cache.delete(lruKey);
          keyToFreq.delete(lruKey);
        }

        cache.set(key, value);
        keyToFreq.set(key, 1);

        if (!frequencies.has(1)) {
          frequencies.set(1, new Map());
        }
        frequencies.get(1).set(key, timestamp++);

        minFreq = 1;
      }
    }
  }

  return results;
}`,
    testCases: [
      {
        input: [
          2,
          [
            ['put', 1, 1],
            ['put', 2, 2],
            ['get', 1],
            ['put', 3, 3],
            ['get', 2],
            ['get', 3],
          ],
        ],
        expected: [1, -1, 3],
        description: 'Basic LFU eviction',
      },
      {
        input: [
          2,
          [
            ['put', 1, 1],
            ['put', 2, 2],
            ['get', 1],
            ['get', 1],
            ['get', 2],
            ['put', 3, 3],
            ['get', 2],
            ['get', 3],
            ['get', 1],
          ],
        ],
        expected: [1, 1, 2, 2, 3, 1],
        description: 'Frequency matters',
      },
      {
        input: [
          1,
          [
            ['put', 1, 1],
            ['get', 1],
            ['put', 2, 2],
            ['get', 1],
            ['get', 2],
          ],
        ],
        expected: [1, -1, 2],
        description: 'Capacity 1',
      },
      {
        input: [
          0,
          [
            ['put', 1, 1],
            ['get', 1],
          ],
        ],
        expected: [-1],
        description: 'Capacity 0',
      },
      {
        input: [
          3,
          [
            ['put', 1, 1],
            ['put', 2, 2],
            ['put', 3, 3],
            ['put', 4, 4],
            ['get', 4],
            ['get', 3],
            ['get', 2],
            ['get', 1],
          ],
        ],
        expected: [4, 3, 2, -1],
        description: 'Evict LRU when frequencies tie',
      },
    ],
    hints: [
      'Track frequency for each key',
      'Maintain lists of keys at each frequency level',
      'Track minimum frequency to quickly find eviction candidates',
      'Use timestamps to break LRU ties within same frequency',
    ],
    concepts: ['hash-map', 'lfu-cache', 'frequency', 'eviction-policy'],
  },
  {
    id: 'js-median-stream',
    title: 'Find Median from Data Stream',
    category: 'data-structures' as const,
    difficulty: 'advanced' as const,
    description:
      'Calculate the running median after each number is added from a data stream. This teaches maintaining sorted order with binary search insertion, enabling O(log n) insert and O(1) median access. The optimal approach uses two heaps (max-heap for lower half, min-heap for upper half) for balanced performance.',
    instructions: [
      'Numbers are added one by one from the input array',
      'After each addition, calculate the median',
      'Return array of medians after each number is added',
      'Use two-heap approach (or maintain sorted array)',
    ],
    starterCode: `function runningMedian(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function runningMedian(nums) {
  const result = [];
  const sorted = [];

  function insertSorted(val) {
    let left = 0;
    let right = sorted.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (sorted[mid] < val) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    sorted.splice(left, 0, val);
  }

  function getMedian() {
    const n = sorted.length;
    if (n % 2 === 1) {
      return sorted[Math.floor(n / 2)];
    } else {
      return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    }
  }

  for (const num of nums) {
    insertSorted(num);
    result.push(getMedian());
  }

  return result;
}`,
    testCases: [
      {
        input: [1, 2, 3],
        expected: [1, 1.5, 2],
        description: 'Increasing sequence',
      },
      {
        input: [5, 15, 1, 3],
        expected: [5, 10, 5, 4],
        description: 'Mixed values',
      },
      {
        input: [1],
        expected: [1],
        description: 'Single element',
      },
      {
        input: [10, 20, 30, 40, 50],
        expected: [10, 15, 20, 25, 30],
        description: 'All even counts',
      },
      {
        input: [3, 3, 3, 3],
        expected: [3, 3, 3, 3],
        description: 'All same values',
      },
    ],
    hints: [
      'Maintain elements in sorted order for easy median access',
      'Use binary search to find insertion position',
      'Median is middle element (odd count) or average of two middle (even count)',
      'Alternatively, use two heaps: max heap for lower half, min heap for upper half',
    ],
    concepts: ['median', 'binary-search', 'insertion', 'streaming-data'],
  },
  {
    id: 'js-design-hashset',
    title: 'Design HashSet',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Implement a HashSet from scratch without built-in hash table libraries, supporting add, remove, and contains operations. This teaches hashing fundamentals: a hash function maps keys to buckets, and collision resolution (chaining) handles multiple keys in the same bucket. It builds intuition for hash-based data structures.',
    instructions: [
      'Operation ["add", val] adds value to set',
      'Operation ["remove", val] removes value from set',
      'Operation ["contains", val] checks if value exists',
      'Return array of boolean results for all contains operations',
    ],
    starterCode: `function hashSetOperations(operations) {
  // YOUR CODE HERE
}`,
    solutionCode: `function hashSetOperations(operations) {
  const BUCKETS = 1000;
  const buckets = Array.from({ length: BUCKETS }, () => []);

  function hash(key) {
    return key % BUCKETS;
  }

  const results = [];

  for (const op of operations) {
    const [action, val] = op;
    const idx = hash(val);
    const bucket = buckets[idx];

    if (action === 'add') {
      if (!bucket.includes(val)) {
        bucket.push(val);
      }
    } else if (action === 'remove') {
      const pos = bucket.indexOf(val);
      if (pos !== -1) {
        bucket.splice(pos, 1);
      }
    } else if (action === 'contains') {
      results.push(bucket.includes(val));
    }
  }

  return results;
}`,
    testCases: [
      {
        input: [
          ['add', 1],
          ['add', 2],
          ['contains', 1],
          ['contains', 3],
          ['add', 2],
          ['contains', 2],
          ['remove', 2],
          ['contains', 2],
        ],
        expected: [true, false, true, false],
        description: 'Basic operations',
      },
      {
        input: [
          ['add', 0],
          ['add', 1000],
          ['contains', 0],
          ['contains', 1000],
          ['remove', 0],
          ['contains', 0],
        ],
        expected: [true, true, false],
        description: 'Hash collision handling',
      },
      {
        input: [
          ['contains', 1],
          ['add', 1],
          ['contains', 1],
        ],
        expected: [false, true],
        description: 'Empty initially',
      },
      {
        input: [
          ['add', 5],
          ['remove', 5],
          ['add', 5],
          ['contains', 5],
        ],
        expected: [true],
        description: 'Add after remove',
      },
      {
        input: [
          ['add', 100],
          ['add', 200],
          ['add', 300],
          ['contains', 100],
          ['contains', 200],
          ['contains', 300],
          ['contains', 400],
        ],
        expected: [true, true, true, false],
        description: 'Multiple adds',
      },
    ],
    hints: [
      'Use array of buckets (linked lists or arrays)',
      'Hash function: key % BUCKETS',
      'Each bucket stores values that hash to that index',
      'Handle collisions by searching within bucket',
    ],
    concepts: ['hash-set', 'hashing', 'collision-handling', 'buckets'],
  },
  {
    id: 'js-bst-insert-search',
    title: 'BST Insert and Search',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Build a Binary Search Tree by inserting values then search for given values, returning boolean results. This teaches the core BST operations: insert by comparing and recursing left or right, search by the same comparison. Understanding BST insert/search is foundational for tree-based data structure interviews.',
    instructions: [
      'Insert all values from insertVals into BST',
      'Search for all values from searchVals',
      'Return array of booleans indicating if each search value exists',
      'BST property: left < node < right',
    ],
    starterCode: `function bstInsertSearch(insertVals, searchVals) {
  // YOUR CODE HERE
}`,
    solutionCode: `function bstInsertSearch(insertVals, searchVals) {
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  function insert(root, val) {
    if (root === null) {
      return new TreeNode(val);
    }

    if (val < root.val) {
      root.left = insert(root.left, val);
    } else if (val > root.val) {
      root.right = insert(root.right, val);
    }
    // If val === root.val, don't insert duplicate

    return root;
  }

  function search(root, val) {
    if (root === null) {
      return false;
    }

    if (val === root.val) {
      return true;
    } else if (val < root.val) {
      return search(root.left, val);
    } else {
      return search(root.right, val);
    }
  }

  let root = null;

  for (const val of insertVals) {
    root = insert(root, val);
  }

  const results = [];

  for (const val of searchVals) {
    results.push(search(root, val));
  }

  return results;
}`,
    testCases: [
      {
        input: [
          [5, 3, 7, 1, 9],
          [3, 6, 1, 10],
        ],
        expected: [true, false, true, false],
        description: 'Standard BST',
      },
      {
        input: [
          [10, 5, 15, 3, 7, 13, 18],
          [7, 13, 20, 5],
        ],
        expected: [true, true, false, true],
        description: 'Balanced tree',
      },
      {
        input: [
          [1, 2, 3, 4, 5],
          [3, 5, 6],
        ],
        expected: [true, true, false],
        description: 'Right-skewed tree',
      },
      {
        input: [[50], [50, 25, 75]],
        expected: [true, false, false],
        description: 'Single node',
      },
      {
        input: [
          [20, 10, 30, 10, 30],
          [10, 30, 40],
        ],
        expected: [true, true, false],
        description: 'Duplicate values not inserted',
      },
    ],
    hints: [
      'Use a TreeNode class with val, left, right',
      'Insert: recursively go left if val < node.val, right if val > node.val',
      'Search: compare target with current node and recurse accordingly',
      "Don't insert duplicates (or handle them consistently)",
    ],
    concepts: ['binary-search-tree', 'tree', 'recursion', 'insert', 'search'],
  },
  {
    id: 'js-bst-delete',
    title: 'BST Delete Node',
    category: 'data-structures' as const,
    difficulty: 'advanced' as const,
    description:
      'Build a BST, delete a specific node, then return the inorder traversal of the resulting tree. BST deletion has three cases: leaf removal, single-child promotion, and two-child replacement with the inorder successor. This exercise teaches all three and reinforces understanding of BST structural invariants.',
    instructions: [
      'Insert all values from insertVals into BST',
      'Delete the node with value deleteVal',
      'Return inorder traversal of the tree after deletion',
      'Handle three cases: leaf, one child, two children',
    ],
    starterCode: `function bstDelete(insertVals, deleteVal) {
  // YOUR CODE HERE
}`,
    solutionCode: `function bstDelete(insertVals, deleteVal) {
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  function insert(root, val) {
    if (root === null) {
      return new TreeNode(val);
    }

    if (val < root.val) {
      root.left = insert(root.left, val);
    } else if (val > root.val) {
      root.right = insert(root.right, val);
    }

    return root;
  }

  function findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  function deleteNode(root, val) {
    if (root === null) {
      return null;
    }

    if (val < root.val) {
      root.left = deleteNode(root.left, val);
    } else if (val > root.val) {
      root.right = deleteNode(root.right, val);
    } else {
      // Found the node to delete

      // Case 1: Leaf node or one child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Case 2: Two children
      // Find inorder successor (minimum in right subtree)
      const successor = findMin(root.right);
      root.val = successor.val;
      root.right = deleteNode(root.right, successor.val);
    }

    return root;
  }

  function inorder(root, result = []) {
    if (root === null) {
      return result;
    }

    inorder(root.left, result);
    result.push(root.val);
    inorder(root.right, result);

    return result;
  }

  let root = null;

  for (const val of insertVals) {
    root = insert(root, val);
  }

  root = deleteNode(root, deleteVal);

  return inorder(root);
}`,
    testCases: [
      {
        input: [[5, 3, 6, 2, 4, 7], 3],
        expected: [2, 4, 5, 6, 7],
        description: 'Delete node with two children',
      },
      {
        input: [[5, 3, 6, 2, 4, 7], 7],
        expected: [2, 3, 4, 5, 6],
        description: 'Delete leaf node',
      },
      {
        input: [[5, 3, 6, 2, 4, 7], 5],
        expected: [2, 3, 4, 6, 7],
        description: 'Delete root node',
      },
      {
        input: [[2, 1, 3], 2],
        expected: [1, 3],
        description: 'Delete root with two children',
      },
      {
        input: [[10, 5, 15, 3, 7, 18], 15],
        expected: [3, 5, 7, 10, 18],
        description: 'Delete node with one child',
      },
    ],
    hints: [
      'Three cases: no children (leaf), one child, two children',
      'Leaf: simply remove it',
      'One child: replace node with its child',
      'Two children: find inorder successor (min in right subtree), replace value, delete successor',
    ],
    concepts: ['binary-search-tree', 'tree', 'recursion', 'delete', 'inorder-traversal'],
  },
  {
    id: 'js-doubly-linked-list',
    title: 'Doubly Linked List Operations',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Implement a doubly linked list supporting addFront, addBack, removeFront, removeBack, and toArray operations. This teaches bidirectional pointer manipulation: each node links to both its predecessor and successor. Doubly linked lists enable O(1) removal from both ends, making them ideal for deque and LRU cache implementations.',
    instructions: [
      'Operation ["addFront", val] adds to front',
      'Operation ["addBack", val] adds to back',
      'Operation ["removeFront"] removes from front',
      'Operation ["removeBack"] removes from back',
      'Operation ["toArray"] returns current list as array',
      'Return array of results for all toArray operations',
    ],
    starterCode: `function doublyLinkedListOps(operations) {
  // YOUR CODE HERE
}`,
    solutionCode: `function doublyLinkedListOps(operations) {
  class Node {
    constructor(val) {
      this.val = val;
      this.prev = null;
      this.next = null;
    }
  }

  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }

    addFront(val) {
      const newNode = new Node(val);

      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    }

    addBack(val) {
      const newNode = new Node(val);

      if (this.tail === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }

    removeFront() {
      if (this.head === null) {
        return;
      }

      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    }

    removeBack() {
      if (this.tail === null) {
        return;
      }

      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    }

    toArray() {
      const result = [];
      let current = this.head;

      while (current !== null) {
        result.push(current.val);
        current = current.next;
      }

      return result;
    }
  }

  const list = new DoublyLinkedList();
  const results = [];

  for (const op of operations) {
    const [action, val] = op;

    if (action === 'addFront') {
      list.addFront(val);
    } else if (action === 'addBack') {
      list.addBack(val);
    } else if (action === 'removeFront') {
      list.removeFront();
    } else if (action === 'removeBack') {
      list.removeBack();
    } else if (action === 'toArray') {
      results.push(list.toArray());
    }
  }

  return results;
}`,
    testCases: [
      {
        input: [
          ['addFront', 1],
          ['addBack', 2],
          ['addFront', 3],
          ['toArray'],
          ['removeFront'],
          ['toArray'],
        ],
        expected: [
          [3, 1, 2],
          [1, 2],
        ],
        description: 'Mix of operations',
      },
      {
        input: [
          ['addBack', 1],
          ['addBack', 2],
          ['addBack', 3],
          ['toArray'],
          ['removeBack'],
          ['removeBack'],
          ['toArray'],
        ],
        expected: [[1, 2, 3], [1]],
        description: 'Add and remove from back',
      },
      {
        input: [['addFront', 5], ['toArray'], ['removeFront'], ['toArray']],
        expected: [[5], []],
        description: 'Single element',
      },
      {
        input: [['addFront', 1], ['addFront', 2], ['removeFront'], ['addBack', 3], ['toArray']],
        expected: [[1, 3]],
        description: 'Complex sequence',
      },
      {
        input: [['toArray'], ['addBack', 1], ['toArray'], ['removeFront'], ['toArray']],
        expected: [[], [1], []],
        description: 'Empty list handling',
      },
    ],
    hints: [
      'Each node has val, prev, and next pointers',
      'Maintain head and tail pointers',
      'Update both prev and next pointers when adding/removing',
      'Handle edge cases: empty list, single element',
    ],
    concepts: ['doubly-linked-list', 'linked-list', 'pointers', 'deque'],
  },
  {
    id: 'js-expression-evaluator',
    title: 'Stack-Based Expression Evaluator',
    category: 'data-structures' as const,
    difficulty: 'advanced' as const,
    description:
      'Evaluate mathematical expressions with +, -, *, / and parentheses using two stacks (values and operators). This teaches the shunting-yard approach: operator precedence determines when to evaluate, and parentheses create scope boundaries. Expression evaluation is fundamental to compilers, calculators, and query parsers.',
    instructions: [
      'Expression contains integers, +, -, *, /, and parentheses',
      'Follow standard operator precedence',
      'Handle nested parentheses',
      'Return the numeric result',
    ],
    starterCode: `function evaluateExpression(expr) {
  // YOUR CODE HERE
}`,
    solutionCode: `function evaluateExpression(expr) {
  expr = expr.replace(/s+/g, ''); // Remove whitespace

  function applyOp(a, b, op) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return Math.floor(a / b);
      default: return 0;
    }
  }

  function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
  }

  const values = [];
  const ops = [];

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];

    if (ch >= '0' && ch <= '9') {
      let num = 0;
      while (i < expr.length && expr[i] >= '0' && expr[i] <= '9') {
        num = num * 10 + parseInt(expr[i]);
        i++;
      }
      i--;
      values.push(num);
    } else if (ch === '(') {
      ops.push(ch);
    } else if (ch === ')') {
      while (ops.length > 0 && ops[ops.length - 1] !== '(') {
        const b = values.pop();
        const a = values.pop();
        const op = ops.pop();
        values.push(applyOp(a, b, op));
      }
      ops.pop(); // Remove '('
    } else if (['+', '-', '*', '/'].includes(ch)) {
      while (ops.length > 0 && precedence(ops[ops.length - 1]) >= precedence(ch)) {
        const b = values.pop();
        const a = values.pop();
        const op = ops.pop();
        values.push(applyOp(a, b, op));
      }
      ops.push(ch);
    }
  }

  while (ops.length > 0) {
    const b = values.pop();
    const a = values.pop();
    const op = ops.pop();
    values.push(applyOp(a, b, op));
  }

  return values[0];
}`,
    testCases: [
      { input: '3+5*2', expected: 13, description: 'Operator precedence' },
      { input: '(3+5)*2', expected: 16, description: 'Parentheses change order' },
      { input: '10-2*3', expected: 4, description: 'Subtraction and multiplication' },
      { input: '(1+(4+5+2)-3)+(6+8)', expected: 23, description: 'Nested parentheses' },
      { input: '100/10+5*2', expected: 20, description: 'Division and multiplication' },
    ],
    hints: [
      'Use two stacks: one for values, one for operators',
      'When encountering an operator, check precedence with top of operator stack',
      'Pop and evaluate while stack top has >= precedence',
      'Handle parentheses by pushing ( and evaluating until ) is found',
    ],
    concepts: ['stack', 'expression-evaluation', 'operator-precedence', 'parsing'],
  },
  {
    id: 'js-flatten-multilevel-list',
    title: 'Flatten Multilevel Doubly Linked List',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Flatten a nested array structure depth-first into a single-level array. This recursion exercise processes each element: if it is an array, recurse into it; if it is a value, collect it. It simulates flattening a multilevel linked list and teaches depth-first traversal over recursive data structures.',
    instructions: [
      'Input is a nested array where elements can be numbers or arrays',
      'Flatten it depth-first (process nested arrays immediately)',
      'Return a flat array',
      'This simulates flattening a multilevel doubly linked list',
    ],
    starterCode: `function flattenMultilevel(nested) {
  // YOUR CODE HERE
}`,
    solutionCode: `function flattenMultilevel(nested) {
  const result = [];

  function flatten(arr) {
    for (const item of arr) {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        result.push(item);
      }
    }
  }

  flatten(nested);
  return result;
}`,
    testCases: [
      {
        input: [1, [2, 3, [4, 5]], 6],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Nested arrays',
      },
      {
        input: [1, 2, 3, 4, 5],
        expected: [1, 2, 3, 4, 5],
        description: 'Already flat',
      },
      {
        input: [[[[1]]], 2],
        expected: [1, 2],
        description: 'Deep nesting',
      },
      {
        input: [1, [2, [3, [4, [5]]]]],
        expected: [1, 2, 3, 4, 5],
        description: 'Sequential deep nesting',
      },
      {
        input: [],
        expected: [],
        description: 'Empty array',
      },
    ],
    hints: [
      'Use recursion to handle nested arrays',
      'When encountering an array, recursively flatten it',
      'When encountering a number, add it to result',
      'Process elements in order for depth-first traversal',
    ],
    concepts: ['recursion', 'array', 'flattening', 'depth-first'],
  },
  {
    id: 'js-ordered-map',
    title: 'Ordered Map',
    category: 'data-structures' as const,
    difficulty: 'advanced' as const,
    description:
      "Implement a map that maintains insertion order with set, get, delete, and keys operations. This teaches how JavaScript's built-in Map preserves insertion order, and how deletion followed by re-insertion moves a key to the end. Ordered maps are used in LRU caches and configuration management.",
    instructions: [
      'Implement an ordered map data structure',
      'Process operations: set(key, value), get(key), delete(key), keys()',
      'Return results of get operations (value or -1 if not found)',
      'Return array of keys in insertion order for keys() operation',
      'Maintain insertion order across all operations',
    ],
    starterCode: `function orderedMapOps(operations) {
  // YOUR CODE HERE
}`,
    solutionCode: `function orderedMapOps(operations) {
  const map = new Map();
  const results = [];

  for (const op of operations) {
    const [operation, key, value] = op;

    if (operation === 'set') {
      map.set(key, value);
    } else if (operation === 'get') {
      results.push(map.has(key) ? map.get(key) : -1);
    } else if (operation === 'delete') {
      map.delete(key);
    } else if (operation === 'keys') {
      results.push([...map.keys()]);
    }
  }

  return results;
}`,
    testCases: [
      {
        input: [
          ['set', 'a', 1],
          ['set', 'b', 2],
          ['get', 'a'],
          ['keys'],
          ['delete', 'a'],
          ['keys'],
        ],
        expected: [1, ['a', 'b'], ['b']],
        description: 'Basic operations with insertion order',
      },
      {
        input: [
          ['set', 1, 'one'],
          ['set', 2, 'two'],
          ['get', 1],
          ['set', 1, 'ONE'],
          ['get', 1],
          ['keys'],
        ],
        expected: ['one', 'ONE', [1, 2]],
        description: 'Updating existing key preserves order',
      },
      {
        input: [['get', 'missing'], ['delete', 'missing'], ['keys']],
        expected: [-1, []],
        description: 'Operations on non-existent keys',
      },
      {
        input: [
          ['set', 'x', 10],
          ['set', 'y', 20],
          ['set', 'z', 30],
          ['delete', 'y'],
          ['set', 'y', 25],
          ['keys'],
        ],
        expected: [['x', 'z', 'y']],
        description: 'Re-adding deleted key adds to end',
      },
    ],
    hints: [
      "Use JavaScript's built-in Map which maintains insertion order",
      'Collect results only for get and keys operations',
      'When updating an existing key, Map preserves original insertion order',
      'When re-adding a deleted key, it goes to the end',
    ],
    concepts: ['Map data structure', 'insertion order', 'key-value storage', 'iteration'],
  },
  {
    id: 'js-sparse-matrix-multiply',
    title: 'Sparse Matrix Multiplication',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Multiply two sparse matrices efficiently by skipping zero elements. Standard matrix multiplication is O(m*n*k), but pre-indexing non-zero entries in the second matrix and skipping zeros in the first dramatically reduces work for sparse inputs. This optimization is critical in machine learning and graph algorithms.',
    instructions: [
      'Multiply two matrices represented as 2D arrays',
      'Optimize for sparse matrices (many zeros)',
      'Only process non-zero elements',
      'Return the resulting matrix',
      'Handle edge cases like empty matrices',
    ],
    starterCode: `function sparseMultiply(matA, matB) {
  // YOUR CODE HERE
}`,
    solutionCode: `function sparseMultiply(matA, matB) {
  if (!matA.length || !matB.length || !matB[0].length) {
    return [];
  }

  const m = matA.length;
  const n = matB[0].length;
  const k = matB.length;
  const result = Array.from({ length: m }, () => Array(n).fill(0));

  // Build sparse representation of matB (col -> row -> value)
  const sparseB = Array.from({ length: k }, () => new Map());
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < n; j++) {
      if (matB[i][j] !== 0) {
        sparseB[i].set(j, matB[i][j]);
      }
    }
  }

  // Multiply, skipping zeros in A
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < k; j++) {
      if (matA[i][j] !== 0) {
        for (const [col, val] of sparseB[j]) {
          result[i][col] += matA[i][j] * val;
        }
      }
    }
  }

  return result;
}`,
    testCases: [
      {
        input: [
          [
            [1, 0, 0],
            [0, 0, 3],
          ],
          [
            [7, 0],
            [0, 0],
            [0, 4],
          ],
        ],
        expected: [
          [7, 0],
          [0, 12],
        ],
        description: 'Sparse matrices with mostly zeros',
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
          ],
          [
            [5, 6],
            [7, 8],
          ],
        ],
        expected: [
          [19, 22],
          [43, 50],
        ],
        description: 'Dense matrices',
      },
      {
        input: [
          [
            [0, 0],
            [0, 0],
          ],
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [
          [0, 0],
          [0, 0],
        ],
        description: 'All zeros in first matrix',
      },
      {
        input: [[[1]], [[5]]],
        expected: [[5]],
        description: 'Single element matrices',
      },
    ],
    hints: [
      'Standard matrix multiplication: C[i][j] = sum of A[i][k] * B[k][j]',
      'Skip computation when A[i][k] is zero',
      'Store non-zero elements of B in a map for efficient access',
      'Only iterate over non-zero elements',
    ],
    concepts: ['matrix multiplication', 'sparse data structures', 'optimization', 'nested loops'],
  },
  {
    id: 'js-circular-deque',
    title: 'Design Circular Deque',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Implement a circular double-ended queue with fixed capacity supporting front/rear insert, delete, and peek operations. This teaches capacity-constrained data structure design where each operation must check fullness or emptiness. Circular deques are used in sliding window algorithms and task scheduling systems.',
    instructions: [
      'Implement a circular deque with given capacity',
      'Process operations: insertFront, insertLast, deleteFront, deleteLast, getFront, getRear',
      'Return results of getFront and getRear operations (-1 if empty)',
      'Return true/false for insert/delete operations based on success',
      'Handle capacity constraints',
    ],
    starterCode: `function circularDequeOps(capacity, operations) {
  // YOUR CODE HERE
}`,
    solutionCode: `function circularDequeOps(capacity, operations) {
  const deque = [];
  const results = [];

  for (const op of operations) {
    const [operation, value] = op;

    if (operation === 'insertFront') {
      if (deque.length < capacity) {
        deque.unshift(value);
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (operation === 'insertLast') {
      if (deque.length < capacity) {
        deque.push(value);
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (operation === 'deleteFront') {
      if (deque.length > 0) {
        deque.shift();
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (operation === 'deleteLast') {
      if (deque.length > 0) {
        deque.pop();
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (operation === 'getFront') {
      results.push(deque.length > 0 ? deque[0] : -1);
    } else if (operation === 'getRear') {
      results.push(deque.length > 0 ? deque[deque.length - 1] : -1);
    }
  }

  return results;
}`,
    testCases: [
      {
        input: [
          3,
          [
            ['insertLast', 1],
            ['insertLast', 2],
            ['insertFront', 3],
            ['insertFront', 4],
            ['getRear'],
            ['deleteLast'],
            ['getFront'],
          ],
        ],
        expected: [true, true, true, false, 2, true, 3],
        description: 'Mixed operations with capacity limit',
      },
      {
        input: [
          2,
          [
            ['insertFront', 5],
            ['getFront'],
            ['insertLast', 10],
            ['getRear'],
            ['deleteFront'],
            ['getFront'],
          ],
        ],
        expected: [true, 5, true, 10, true, 10],
        description: 'Basic front and rear operations',
      },
      {
        input: [
          1,
          [['deleteFront'], ['getRear'], ['insertLast', 7], ['insertLast', 8], ['getFront']],
        ],
        expected: [false, -1, true, false, 7],
        description: 'Operations on empty and full deque',
      },
      {
        input: [
          3,
          [
            ['insertLast', 1],
            ['insertLast', 2],
            ['insertLast', 3],
            ['deleteFront'],
            ['insertFront', 4],
            ['getFront'],
            ['getRear'],
          ],
        ],
        expected: [true, true, true, true, true, 4, 3],
        description: 'Circular behavior test',
      },
    ],
    hints: [
      'Use a simple array to implement the deque',
      'Track the current size and compare with capacity',
      'Return appropriate values for get operations when empty',
      'Each operation should return a result',
    ],
    concepts: ['deque', 'circular buffer', 'capacity constraints', 'queue operations'],
  },
  {
    id: 'js-trie-word-count',
    title: 'Trie with Word and Prefix Count',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Implement a trie (prefix tree) that tracks both complete word counts and prefix counts for inserted strings. Each node maintains a prefixCount incremented during insertion traversal and a wordCount incremented at terminal nodes. Tries enable O(L) prefix queries and are used in autocomplete and spell-checking.',
    instructions: [
      'Build a trie from insert operations',
      'Track how many times each word is inserted',
      'Track how many words have each prefix',
      'Return counts for countWord and countPrefix operations',
      'Handle case-sensitive strings',
    ],
    starterCode: `function trieCountOps(operations) {
  // YOUR CODE HERE
}`,
    solutionCode: `function trieCountOps(operations) {
  class TrieNode {
    constructor() {
      this.children = new Map();
      this.wordCount = 0;
      this.prefixCount = 0;
    }
  }

  const root = new TrieNode();
  const results = [];

  for (const op of operations) {
    const [operation, str] = op;

    if (operation === 'insert') {
      let node = root;
      for (const char of str) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char);
        node.prefixCount++;
      }
      node.wordCount++;
    } else if (operation === 'countWord') {
      let node = root;
      for (const char of str) {
        if (!node.children.has(char)) {
          results.push(0);
          break;
        }
        node = node.children.get(char);
      }
      if (node !== root || str === '') {
        results.push(node.wordCount);
      }
    } else if (operation === 'countPrefix') {
      let node = root;
      for (const char of str) {
        if (!node.children.has(char)) {
          results.push(0);
          break;
        }
        node = node.children.get(char);
      }
      if (node !== root || str === '') {
        results.push(node.prefixCount);
      }
    }
  }

  return results;
}`,
    testCases: [
      {
        input: [
          ['insert', 'apple'],
          ['insert', 'apple'],
          ['countWord', 'apple'],
          ['countPrefix', 'app'],
          ['insert', 'app'],
          ['countPrefix', 'app'],
        ],
        expected: [2, 2, 3],
        description: 'Multiple insertions and prefix counting',
      },
      {
        input: [
          ['insert', 'hello'],
          ['insert', 'hell'],
          ['countWord', 'hello'],
          ['countWord', 'hell'],
          ['countPrefix', 'hel'],
        ],
        expected: [1, 1, 2],
        description: 'Words with common prefixes',
      },
      {
        input: [
          ['countWord', 'missing'],
          ['countPrefix', 'xyz'],
        ],
        expected: [0, 0],
        description: 'Queries on non-existent words',
      },
      {
        input: [
          ['insert', 'a'],
          ['insert', 'a'],
          ['insert', 'aa'],
          ['countWord', 'a'],
          ['countPrefix', 'a'],
        ],
        expected: [2, 3],
        description: 'Short strings with repetition',
      },
    ],
    hints: [
      'Each node needs to track both wordCount (ends here) and prefixCount (passes through)',
      'Increment prefixCount for every node along the path',
      'Only increment wordCount at the final node',
      'Handle missing paths by returning 0',
    ],
    concepts: ['trie', 'prefix tree', 'counting', 'string operations'],
  },
  {
    id: 'js-priority-queue-custom',
    title: 'Priority Queue with Custom Comparator',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      "Implement a priority queue that sorts items by numeric priority (lower number = higher priority) and maintains insertion order for ties. This teaches stable priority sorting: items are ordered by priority first, then by insertion index. Priority queues are essential in Dijkstra's algorithm and task schedulers.",
    instructions: [
      'Insert all [value, priority] pairs into a priority queue',
      'Extract all elements in priority order',
      'Lower priority number means higher priority',
      'Return array of values in priority order',
      'Handle ties in priority by maintaining insertion order',
    ],
    starterCode: `function priorityQueueSort(items) {
  // YOUR CODE HERE
}`,
    solutionCode: `function priorityQueueSort(items) {
  // Sort by priority (ascending), then by original index for stability
  const indexed = items.map((item, idx) => ({ value: item[0], priority: item[1], idx }));
  indexed.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.idx - b.idx;
  });

  return indexed.map(item => item.value);
}`,
    testCases: [
      {
        input: [
          [
            ['task1', 3],
            ['task2', 1],
            ['task3', 2],
            ['task4', 1],
          ],
        ],
        expected: ['task2', 'task4', 'task3', 'task1'],
        description: 'Multiple priorities with ties',
      },
      {
        input: [
          [
            ['A', 5],
            ['B', 3],
            ['C', 1],
            ['D', 4],
            ['E', 2],
          ],
        ],
        expected: ['C', 'E', 'B', 'D', 'A'],
        description: 'All different priorities',
      },
      {
        input: [[['X', 1]]],
        expected: ['X'],
        description: 'Single element',
      },
      {
        input: [
          [
            ['first', 2],
            ['second', 2],
            ['third', 2],
          ],
        ],
        expected: ['first', 'second', 'third'],
        description: 'All same priority maintains insertion order',
      },
      {
        input: [
          [
            ['low', 10],
            ['high', 1],
            ['med', 5],
          ],
        ],
        expected: ['high', 'med', 'low'],
        description: 'Simple priority ordering',
      },
    ],
    hints: [
      'Sort the items by priority value',
      'Lower priority number should come first',
      'Maintain insertion order for items with same priority',
      'Extract just the values after sorting',
    ],
    concepts: ['priority queue', 'sorting', 'comparator', 'stable sort'],
  },
  {
    id: 'js-integer-partitions',
    title: 'Integer Partitions',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count the number of ways to write n as a sum of positive integers where order does not matter (e.g., 4 = 3+1 = 2+2 = 2+1+1 = 1+1+1+1). This combinatorics problem uses 2D DP where dp[i][j] counts partitions of i using parts up to j. Integer partitions appear in number theory and combinatorial optimization.',
    instructions: [
      'Count distinct ways to partition n into positive integers',
      'Order does not matter: 3+1 and 1+3 are the same partition',
      'Each integer must be at least 1',
      'Use dynamic programming or recursion with memoization',
      'Handle edge cases like n=0 and n=1',
    ],
    starterCode: `function countPartitions(n) {
  // YOUR CODE HERE
}`,
    solutionCode: `function countPartitions(n) {
  // dp[i][j] = number of partitions of i using integers up to j
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  // Base case: one way to partition 0 (empty partition)
  for (let j = 0; j <= n; j++) {
    dp[0][j] = 1;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      // Don't use j
      dp[i][j] = dp[i][j - 1];

      // Use j (if possible)
      if (i >= j) {
        dp[i][j] += dp[i - j][j];
      }
    }
  }

  return dp[n][n];
}`,
    testCases: [
      {
        input: 4,
        expected: 5,
        description: '4 = 4, 3+1, 2+2, 2+1+1, 1+1+1+1',
      },
      {
        input: 5,
        expected: 7,
        description: '5 has 7 partitions',
      },
      {
        input: 1,
        expected: 1,
        description: '1 = 1',
      },
      {
        input: 6,
        expected: 11,
        description: '6 has 11 partitions',
      },
      {
        input: 10,
        expected: 42,
        description: 'Larger number',
      },
    ],
    hints: [
      'Use DP: dp[n][k] = partitions of n using integers up to k',
      "Either use k in partition or don't use it",
      'If you use k, you have n-k left to partition (still using up to k)',
      'Base case: partition of 0 is 1 (empty)',
    ],
    concepts: ['dynamic programming', 'combinatorics', 'partitions', 'recursion'],
  },
  {
    id: 'js-stirling-second',
    title: 'Stirling Numbers of the Second Kind',
    category: 'combinatorics' as const,
    difficulty: 'advanced' as const,
    description:
      'Compute the Stirling number S(n,k) which counts ways to partition n elements into exactly k non-empty subsets. The recurrence S(n,k) = k*S(n-1,k) + S(n-1,k-1) captures two choices: add the new element to an existing subset (k ways) or create a new singleton. Stirling numbers arise in combinatorics and probability.',
    instructions: [
      'Calculate S(n,k) using the recurrence relation',
      'S(n,k) = k*S(n-1,k) + S(n-1,k-1)',
      'Base cases: S(0,0)=1, S(n,0)=0 for n>0, S(0,k)=0 for k>0',
      'Use dynamic programming or memoization',
      'Return the count as an integer',
    ],
    starterCode: `function stirlingSecond(n, k) {
  // YOUR CODE HERE
}`,
    solutionCode: `function stirlingSecond(n, k) {
  if (n === 0 && k === 0) return 1;
  if (n === 0 || k === 0) return 0;
  if (k > n) return 0;

  const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, k); j++) {
      dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1];
    }
  }

  return dp[n][k];
}`,
    testCases: [
      {
        input: [3, 2],
        expected: 3,
        description: 'S(3,2) = 3: {{1,2},{3}}, {{1,3},{2}}, {{2,3},{1}}',
      },
      {
        input: [4, 2],
        expected: 7,
        description: 'S(4,2) = 7',
      },
      {
        input: [5, 3],
        expected: 25,
        description: 'S(5,3) = 25',
      },
      {
        input: [0, 0],
        expected: 1,
        description: 'Base case S(0,0) = 1',
      },
      {
        input: [5, 0],
        expected: 0,
        description: 'S(n,0) = 0 for n > 0',
      },
    ],
    hints: [
      'Use the recurrence: S(n,k) = k*S(n-1,k) + S(n-1,k-1)',
      'First term: add new element to one of k existing subsets',
      'Second term: create a new subset with the new element',
      'Handle base cases carefully',
    ],
    concepts: ['combinatorics', 'Stirling numbers', 'dynamic programming', 'set partitions'],
  },
  {
    id: 'js-bell-number',
    title: 'Bell Numbers',
    category: 'combinatorics' as const,
    difficulty: 'advanced' as const,
    description:
      'Compute the Bell number B(n), the total number of ways to partition a set of n elements into non-empty subsets. The Bell triangle method builds values row by row, where each row starts with the last value of the previous row. Bell numbers grow rapidly and connect to Stirling numbers via B(n) = sum of S(n,k).',
    instructions: [
      'Calculate B(n) = sum of S(n,k) for k=0 to n',
      'Use Stirling numbers of the second kind',
      'Can also use Bell triangle method',
      'B(0)=1, B(1)=1, B(2)=2, B(3)=5, B(4)=15',
      'Return the total count',
    ],
    starterCode: `function bellNumber(n) {
  // YOUR CODE HERE
}`,
    solutionCode: `function bellNumber(n) {
  if (n === 0) return 1;

  // Use Bell triangle
  const bell = [[1]];

  for (let i = 1; i <= n; i++) {
    bell[i] = [bell[i - 1][bell[i - 1].length - 1]];
    for (let j = 1; j <= i; j++) {
      bell[i][j] = bell[i][j - 1] + bell[i - 1][j - 1];
    }
  }

  return bell[n][0];
}`,
    testCases: [
      {
        input: 0,
        expected: 1,
        description: 'B(0) = 1',
      },
      {
        input: 1,
        expected: 1,
        description: 'B(1) = 1',
      },
      {
        input: 2,
        expected: 2,
        description: 'B(2) = 2: {{1,2}}, {{1},{2}}',
      },
      {
        input: 3,
        expected: 5,
        description: 'B(3) = 5',
      },
      {
        input: 4,
        expected: 15,
        description: 'B(4) = 15',
      },
      {
        input: 5,
        expected: 52,
        description: 'B(5) = 52',
      },
    ],
    hints: [
      'Bell triangle: start with 1, each row starts with last element of previous row',
      'Each element is sum of element to the left and element above-left',
      'First element of row n is B(n)',
      'Alternatively, sum all Stirling numbers S(n,k) for k=0..n',
    ],
    concepts: ['combinatorics', 'Bell numbers', 'Bell triangle', 'set partitions'],
  },
  {
    id: 'js-multinomial-coeff',
    title: 'Multinomial Coefficient',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Compute the multinomial coefficient n!/(k1!*k2!*...*km!) which counts ways to distribute n items into groups of specified sizes. This generalizes the binomial coefficient and is computed as successive binomial products to avoid overflow. Multinomial coefficients appear in probability distributions and combinatorial counting.',
    instructions: [
      'Given n and array of group sizes, compute multinomial coefficient',
      'Formula: n! / (k1! * k2! * ... * km!)',
      'Groups must sum to n',
      'Avoid overflow by computing carefully',
      'Return the result as an integer',
    ],
    starterCode: `function multinomial(n, groups) {
  // YOUR CODE HERE
}`,
    solutionCode: `function multinomial(n, groups) {
  // Verify groups sum to n
  const sum = groups.reduce((acc, val) => acc + val, 0);
  if (sum !== n) return 0;

  // Compute using successive divisions to avoid overflow
  let result = 1;
  let remaining = n;

  for (const k of groups) {
    // Multiply by C(remaining, k)
    for (let i = 0; i < k; i++) {
      result *= (remaining - i);
      result /= (i + 1);
    }
    remaining -= k;
  }

  return Math.round(result);
}`,
    testCases: [
      {
        input: [5, [2, 2, 1]],
        expected: 30,
        description: '5!/(2!*2!*1!) = 30',
      },
      {
        input: [4, [2, 2]],
        expected: 6,
        description: '4!/(2!*2!) = 6',
      },
      {
        input: [6, [3, 2, 1]],
        expected: 60,
        description: '6!/(3!*2!*1!) = 60',
      },
      {
        input: [3, [1, 1, 1]],
        expected: 6,
        description: '3!/(1!*1!*1!) = 6 (all permutations)',
      },
      {
        input: [5, [2, 2]],
        expected: 0,
        description: 'Groups do not sum to n',
      },
    ],
    hints: [
      'Multinomial coefficient generalizes binomial coefficient',
      'Compute as product of binomial coefficients',
      'Divide as you multiply to avoid overflow',
      'Check that groups sum to n',
    ],
    concepts: ['combinatorics', 'multinomial coefficient', 'factorials', 'combinations'],
  },
  {
    id: 'js-restricted-perms',
    title: 'Restricted Permutations',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count valid permutations of n elements where certain element-position pairs are forbidden. This backtracking problem tries placing each unused element at each position, skipping forbidden assignments. It generalizes derangements and teaches constraint-based enumeration, useful in scheduling and assignment problems.',
    instructions: [
      'Given n positions and forbidden pairs [element, position]',
      'Count permutations where element i is not at position j for each forbidden pair',
      'Use backtracking or inclusion-exclusion',
      'Elements are 0-indexed (0 to n-1)',
      'Return count of valid permutations',
    ],
    starterCode: `function countRestrictedPerms(n, forbidden) {
  // YOUR CODE HERE
}`,
    solutionCode: `function countRestrictedPerms(n, forbidden) {
  const forbiddenSet = new Set(forbidden.map(([elem, pos]) => \`\${elem},\${pos}\`));

  let count = 0;
  const used = new Array(n).fill(false);

  function backtrack(pos, perm) {
    if (pos === n) {
      count++;
      return;
    }

    for (let elem = 0; elem < n; elem++) {
      if (!used[elem] && !forbiddenSet.has(\`\${elem},\${pos}\`)) {
        used[elem] = true;
        backtrack(pos + 1, [...perm, elem]);
        used[elem] = false;
      }
    }
  }

  backtrack(0, []);
  return count;
}`,
    testCases: [
      {
        input: [
          3,
          [
            [0, 0],
            [1, 1],
          ],
        ],
        expected: 2,
        description: 'Element 0 cannot be at position 0, element 1 cannot be at position 1',
      },
      {
        input: [3, []],
        expected: 6,
        description: 'No restrictions: 3! = 6',
      },
      {
        input: [
          4,
          [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
          ],
        ],
        expected: 9,
        description: 'No element at its own index (derangement-like)',
      },
      {
        input: [
          2,
          [
            [0, 1],
            [1, 0],
          ],
        ],
        expected: 0,
        description: 'Impossible configuration',
      },
    ],
    hints: [
      'Use backtracking to generate valid permutations',
      'At each position, try placing each unused element',
      'Check forbidden set before placing an element',
      'Count complete valid permutations',
    ],
    concepts: ['backtracking', 'permutations', 'constraints', 'combinatorics'],
  },
  {
    id: 'js-lattice-paths-obstacles',
    title: 'Lattice Paths with Obstacles',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count paths from top-left to bottom-right in a grid with obstacles, moving only right or down. This DP problem sets dp[i][j] = dp[i-1][j] + dp[i][j-1] for free cells and 0 for obstacles. It is a foundational grid DP exercise that extends the classic lattice path counting problem from combinatorics.',
    instructions: [
      'Grid is m x n where 0 is free and 1 is obstacle',
      'Start at (0,0) and reach (m-1, n-1)',
      'Can only move right or down',
      'Cannot pass through obstacles',
      'Use dynamic programming to count paths',
    ],
    starterCode: `function latticePaths(grid) {
  // YOUR CODE HERE
}`,
    solutionCode: `function latticePaths(grid) {
  if (!grid.length || !grid[0].length) return 0;
  if (grid[0][0] === 1) return 0;

  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  dp[0][0] = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        dp[i][j] = 0;
      } else if (i === 0 && j === 0) {
        dp[i][j] = 1;
      } else {
        const fromTop = i > 0 ? dp[i - 1][j] : 0;
        const fromLeft = j > 0 ? dp[i][j - 1] : 0;
        dp[i][j] = fromTop + fromLeft;
      }
    }
  }

  return dp[m - 1][n - 1];
}`,
    testCases: [
      {
        input: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0],
        ],
        expected: 2,
        description: 'Grid with one obstacle in center',
      },
      {
        input: [
          [0, 0],
          [0, 0],
        ],
        expected: 2,
        description: '2x2 grid with no obstacles',
      },
      {
        input: [
          [0, 1],
          [0, 0],
        ],
        expected: 1,
        description: 'Obstacle blocks one path',
      },
      {
        input: [
          [0, 0, 0],
          [0, 0, 0],
        ],
        expected: 3,
        description: '2x3 grid with no obstacles',
      },
      {
        input: [[1]],
        expected: 0,
        description: 'Start is obstacle',
      },
    ],
    hints: [
      'Use DP: dp[i][j] = number of ways to reach (i,j)',
      'dp[i][j] = dp[i-1][j] + dp[i][j-1] if no obstacle',
      'dp[i][j] = 0 if obstacle at (i,j)',
      'Base case: dp[0][0] = 1 if not obstacle',
    ],
    concepts: ['dynamic programming', 'grid paths', 'obstacles', 'combinatorics'],
  },
  {
    id: 'js-subset-sum-count',
    title: 'Subset Sum Count',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count the number of subsets of an array that sum to a target value. This DP problem tracks how many ways each possible sum can be formed, starting from the empty subset with sum 0. Using a map handles negative numbers and large ranges. It is a building block for knapsack and partition problems.',
    instructions: [
      'Given an array of integers and a target sum',
      'Count how many subsets sum to exactly the target',
      'Empty subset has sum 0',
      'Use dynamic programming',
      'Handle negative numbers if present',
    ],
    starterCode: `function subsetSumCount(nums, target) {
  // YOUR CODE HERE
}`,
    solutionCode: `function subsetSumCount(nums, target) {
  const dp = new Map();
  dp.set(0, 1); // One way to make 0: empty subset

  for (const num of nums) {
    const newDp = new Map(dp);
    for (const [sum, count] of dp) {
      const newSum = sum + num;
      newDp.set(newSum, (newDp.get(newSum) || 0) + count);
    }
    dp.clear();
    for (const [key, val] of newDp) {
      dp.set(key, val);
    }
  }

  return dp.get(target) || 0;
}`,
    testCases: [
      {
        input: [[1, 2, 3], 3],
        expected: 2,
        description: 'Subsets: {3} and {1,2}',
      },
      {
        input: [[1, 1, 1, 1], 2],
        expected: 6,
        description: 'Multiple ways with duplicate elements',
      },
      {
        input: [[2, 4, 6], 5],
        expected: 0,
        description: 'No subset sums to target',
      },
      {
        input: [[5], 5],
        expected: 1,
        description: 'Single element matching target',
      },
      {
        input: [[1, 2, 3, 4], 0],
        expected: 1,
        description: 'Empty subset for target 0',
      },
    ],
    hints: [
      'Use DP with map to track count for each possible sum',
      'For each number, update all existing sums',
      'Start with sum 0 having count 1 (empty subset)',
      'Use a map to handle negative numbers and large ranges',
    ],
    concepts: ['dynamic programming', 'subset sum', 'counting', 'memoization'],
  },
  {
    id: 'js-truth-table-gen',
    title: 'Truth Table Generator',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Generate all 2^n combinations of n boolean variables as a truth table using bit manipulation. Each row number in binary maps directly to a combination of true/false values. This exercise teaches the connection between binary counting and exhaustive enumeration, foundational for logic circuits and SAT solvers.',
    instructions: [
      'Given n boolean variables',
      'Generate all 2^n combinations',
      'Each combination is an array of n booleans',
      'Return array of boolean arrays',
      'Order: first variable varies slowest (like binary counting)',
    ],
    starterCode: `function generateTruthTable(n) {
  // YOUR CODE HERE
}`,
    solutionCode: `function generateTruthTable(n) {
  const result = [];
  const totalRows = Math.pow(2, n);

  for (let i = 0; i < totalRows; i++) {
    const row = [];
    for (let j = n - 1; j >= 0; j--) {
      row.push(((i >> j) & 1) === 1);
    }
    result.push(row);
  }

  return result;
}`,
    testCases: [
      {
        input: 2,
        expected: [
          [false, false],
          [false, true],
          [true, false],
          [true, true],
        ],
        description: 'Truth table for 2 variables',
      },
      {
        input: 1,
        expected: [[false], [true]],
        description: 'Truth table for 1 variable',
      },
      {
        input: 3,
        expected: [
          [false, false, false],
          [false, false, true],
          [false, true, false],
          [false, true, true],
          [true, false, false],
          [true, false, true],
          [true, true, false],
          [true, true, true],
        ],
        description: 'Truth table for 3 variables',
      },
      {
        input: 0,
        expected: [[]],
        description: 'Empty truth table',
      },
    ],
    hints: [
      'There are 2^n total rows',
      'Use bit manipulation: row i represents a binary number',
      'Extract each bit as a boolean value',
      'First variable is most significant bit',
    ],
    concepts: ['combinatorics', 'bit manipulation', 'boolean logic', 'generation'],
  },
  {
    id: 'js-house-robber',
    title: 'House Robber',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the maximum amount you can rob from a line of houses without robbing two adjacent ones. This classic DP problem uses the recurrence max(rob current + skip-one, skip current) with two rolling variables for O(1) space. It is one of the most popular introductory dynamic programming interview questions.',
    instructions: [
      'Given array of house values',
      'Cannot rob adjacent houses',
      'Find maximum total amount',
      'Use dynamic programming',
      'Handle edge cases like empty array or single house',
    ],
    starterCode: `function houseRobber(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function houseRobber(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
    testCases: [
      {
        input: [1, 2, 3, 1],
        expected: 4,
        description: 'Rob house 0 and 2: 1 + 3 = 4',
      },
      {
        input: [2, 7, 9, 3, 1],
        expected: 12,
        description: 'Rob houses 0, 2, 4: 2 + 9 + 1 = 12',
      },
      {
        input: [5],
        expected: 5,
        description: 'Single house',
      },
      {
        input: [2, 1, 1, 2],
        expected: 4,
        description: 'Rob houses 0 and 3: 2 + 2 = 4',
      },
      {
        input: [],
        expected: 0,
        description: 'Empty array',
      },
    ],
    hints: [
      'At each house, decide to rob it or skip it',
      'If rob current, add to max from 2 houses ago',
      'If skip current, take max from previous house',
      'Use variables to track last two values (space optimization)',
    ],
    concepts: ['dynamic programming', 'memoization', 'optimization', 'decision problem'],
  },
  {
    id: 'js-house-robber-circular',
    title: 'House Robber II (Circular)',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Maximize robbery from houses arranged in a circle where the first and last are adjacent. This extends House Robber I by running the linear algorithm twice: once excluding the first house and once excluding the last. Taking the maximum of both handles the circular adjacency constraint elegantly.',
    instructions: [
      'Houses arranged in a circle',
      'First and last houses are adjacent',
      'Cannot rob both first and last house',
      'Use house robber logic twice: exclude first OR exclude last',
      'Return the maximum of both scenarios',
    ],
    starterCode: `function houseRobberCircular(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function houseRobberCircular(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  function robLinear(houses) {
    let prev2 = 0;
    let prev1 = 0;
    for (const num of houses) {
      const curr = Math.max(prev1, prev2 + num);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }

  // Case 1: exclude last house (rob 0..n-2)
  const case1 = robLinear(nums.slice(0, -1));

  // Case 2: exclude first house (rob 1..n-1)
  const case2 = robLinear(nums.slice(1));

  return Math.max(case1, case2);
}`,
    testCases: [
      {
        input: [2, 3, 2],
        expected: 3,
        description: 'Cannot rob houses 0 and 2, rob house 1',
      },
      {
        input: [1, 2, 3, 1],
        expected: 4,
        description: 'Rob houses 0 and 2: 1 + 3 = 4',
      },
      {
        input: [1, 2, 3],
        expected: 3,
        description: 'Rob house 2',
      },
      {
        input: [5],
        expected: 5,
        description: 'Single house',
      },
      {
        input: [1, 1],
        expected: 1,
        description: 'Two houses, pick one',
      },
    ],
    hints: [
      'First and last houses are adjacent in circle',
      'Either exclude first house or exclude last house',
      'Run linear house robber on both cases',
      'Take maximum of the two results',
    ],
    concepts: ['dynamic programming', 'circular array', 'case analysis', 'memoization'],
  },
  {
    id: 'js-decode-ways',
    title: 'Decode Ways',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count the number of ways to decode a digit string where A=1, B=2, ..., Z=26. This DP problem is similar to climbing stairs: at each position, check if the single digit (1-9) and two-digit number (10-26) are valid decodings. Leading zeros make the problem trickier and test careful edge case handling.',
    instructions: [
      'Given a string of digits',
      'Decode where 1=A, 2=B, ..., 26=Z',
      'Count total number of different decodings',
      'Invalid codes (like "0" or "27") cannot be decoded',
      'Use dynamic programming',
    ],
    starterCode: `function numDecodings(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function numDecodings(s) {
  if (s.length === 0 || s[0] === '0') return 0;

  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] !== '0' ? 1 : 0;

  for (let i = 2; i <= n; i++) {
    const oneDigit = parseInt(s[i - 1]);
    const twoDigits = parseInt(s.substring(i - 2, i));

    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] += dp[i - 1];
    }

    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[n];
}`,
    testCases: [
      {
        input: '12',
        expected: 2,
        description: 'Can decode as "AB" (1,2) or "L" (12)',
      },
      {
        input: '226',
        expected: 3,
        description: 'Can decode as "BZ", "VF", or "BBF"',
      },
      {
        input: '06',
        expected: 0,
        description: 'Invalid: starts with 0',
      },
      {
        input: '10',
        expected: 1,
        description: 'Only one way: "J" (10)',
      },
      {
        input: '27',
        expected: 1,
        description: 'Only one way: "2,7" since 27 > 26',
      },
    ],
    hints: [
      'DP: dp[i] = ways to decode first i characters',
      "Can decode single digit if it's 1-9",
      'Can decode two digits if they form 10-26',
      'Handle leading zeros carefully',
    ],
    concepts: ['dynamic programming', 'string parsing', 'counting', 'memoization'],
  },
  {
    id: 'js-longest-palindrome-subseq',
    title: 'Longest Palindromic Subsequence',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the length of the longest palindromic subsequence in a string, where characters need not be consecutive. This 2D DP problem uses dp[i][j] for the substring s[i..j]: matching endpoints add 2 to the inner result, otherwise take the max of excluding either end. It is a classic interval DP exercise.',
    instructions: [
      'Given a string, find longest palindromic subsequence',
      'Subsequence: can skip characters but maintain order',
      'Use dynamic programming',
      'Compare with reverse of string',
      'Return the length',
    ],
    starterCode: `function longestPalindromeSubseq(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  // Every single character is a palindrome of length 1
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  // Build up from substrings of length 2
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
}`,
    testCases: [
      {
        input: 'bbbab',
        expected: 4,
        description: 'Longest palindromic subsequence is "bbbb"',
      },
      {
        input: 'cbbd',
        expected: 2,
        description: 'Longest palindromic subsequence is "bb"',
      },
      {
        input: 'a',
        expected: 1,
        description: 'Single character',
      },
      {
        input: 'abcde',
        expected: 1,
        description: 'No palindrome longer than 1',
      },
      {
        input: 'racecar',
        expected: 7,
        description: 'Entire string is palindrome',
      },
    ],
    hints: [
      'Use 2D DP: dp[i][j] = longest palindrome in s[i..j]',
      'If s[i] == s[j], add 2 to dp[i+1][j-1]',
      'Otherwise, take max of excluding either end',
      'Base case: single character has length 1',
    ],
    concepts: ['dynamic programming', 'palindrome', 'subsequence', 'memoization'],
  },
  {
    id: 'js-min-cost-stairs',
    title: 'Minimum Cost Climbing Stairs',
    category: 'memoization' as const,
    difficulty: 'beginner' as const,
    description:
      'Find the minimum cost to climb past the top of a staircase where each step has a cost and you can climb 1 or 2 steps. This beginner DP problem uses the recurrence cost[i] + min(dp[i-1], dp[i-2]) with two rolling variables. It teaches optimal substructure and is a gentle introduction to dynamic programming.',
    instructions: [
      'Given array of costs for each step',
      'Can start from step 0 or step 1',
      'Can climb 1 or 2 steps at a time',
      'Find minimum cost to reach top (past last step)',
      'Use dynamic programming',
    ],
    starterCode: `function minCostClimbingStairs(cost) {
  // YOUR CODE HERE
}`,
    solutionCode: `function minCostClimbingStairs(cost) {
  const n = cost.length;
  if (n === 0) return 0;
  if (n === 1) return cost[0];

  let prev2 = cost[0];
  let prev1 = cost[1];

  for (let i = 2; i < n; i++) {
    const curr = cost[i] + Math.min(prev1, prev2);
    prev2 = prev1;
    prev1 = curr;
  }

  return Math.min(prev1, prev2);
}`,
    testCases: [
      {
        input: [10, 15, 20],
        expected: 15,
        description: 'Start at index 1, pay 15',
      },
      {
        input: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1],
        expected: 6,
        description: 'Skip expensive steps',
      },
      {
        input: [0, 0, 1, 1],
        expected: 1,
        description: 'Minimal costs',
      },
      {
        input: [10, 15],
        expected: 10,
        description: 'Two steps',
      },
    ],
    hints: [
      'DP: minCost[i] = cost[i] + min(minCost[i-1], minCost[i-2])',
      'Can start from step 0 or 1',
      'Top is one step past the last index',
      'Use two variables for space optimization',
    ],
    concepts: ['dynamic programming', 'memoization', 'optimization', 'stairs problem'],
  },
  {
    id: 'js-partition-equal-subset',
    title: 'Partition Equal Subset Sum',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Determine if an array can be split into two subsets with equal sum. This reduces to a subset-sum problem with target = totalSum/2 after checking the sum is even. The boolean DP array marks achievable sums, iterating backwards to prevent reuse. It connects subset sum theory to practical partitioning.',
    instructions: [
      'Given an array of positive integers',
      'Check if it can be split into two subsets with equal sum',
      'Total sum must be even',
      'Use subset sum DP to find if sum/2 is achievable',
      'Return boolean',
    ],
    starterCode: `function canPartition(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function canPartition(nums) {
  const total = nums.reduce((sum, num) => sum + num, 0);

  if (total % 2 !== 0) return false;

  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }

  return dp[target];
}`,
    testCases: [
      {
        input: [1, 5, 11, 5],
        expected: true,
        description: 'Can partition into [1,5,5] and [11]',
      },
      {
        input: [1, 2, 3, 5],
        expected: false,
        description: 'Cannot partition into equal sum',
      },
      {
        input: [2, 2, 2, 2],
        expected: true,
        description: 'Can partition into [2,2] and [2,2]',
      },
      {
        input: [1, 1],
        expected: true,
        description: 'Simple equal partition',
      },
      {
        input: [1, 2, 5],
        expected: false,
        description: 'Odd total sum',
      },
    ],
    hints: [
      'If total sum is odd, cannot partition equally',
      'Problem reduces to subset sum with target = total/2',
      'Use DP: dp[i] = can we make sum i',
      'Iterate backwards to avoid using same element twice',
    ],
    concepts: ['dynamic programming', 'subset sum', 'partition problem', 'memoization'],
  },
  {
    id: 'js-target-sum-ways',
    title: 'Target Sum',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Assign + or - signs to each array element and count how many assignments reach a target sum. This DP/memoization problem explores a binary decision tree, caching results by (index, currentSum). It teaches how exhaustive sign-assignment problems map to subset sum variants with O(n * sumRange) complexity.',
    instructions: [
      'Given array of non-negative integers and a target',
      'Assign + or - sign to each element',
      'Count ways to reach target sum',
      'Use dynamic programming with memoization',
      'Handle positive and negative sums',
    ],
    starterCode: `function findTargetSumWays(nums, target) {
  // YOUR CODE HERE
}`,
    solutionCode: `function findTargetSumWays(nums, target) {
  const memo = new Map();

  function dp(index, currentSum) {
    if (index === nums.length) {
      return currentSum === target ? 1 : 0;
    }

    const key = \`\${index},\${currentSum}\`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    const add = dp(index + 1, currentSum + nums[index]);
    const subtract = dp(index + 1, currentSum - nums[index]);

    const result = add + subtract;
    memo.set(key, result);
    return result;
  }

  return dp(0, 0);
}`,
    testCases: [
      {
        input: [[1, 1, 1, 1, 1], 3],
        expected: 5,
        description: '5 ways to assign signs to reach sum 3',
      },
      {
        input: [[1], 1],
        expected: 1,
        description: 'One element: +1 = 1',
      },
      {
        input: [[1, 0], 1],
        expected: 2,
        description: 'With zero: +1+0 or +1-0',
      },
      {
        input: [[2, 2, 2], 2],
        expected: 3,
        description: 'Multiple ways with same values',
      },
      {
        input: [[1, 2, 3], 0],
        expected: 1,
        description: 'Balance to zero: +1+2-3',
      },
    ],
    hints: [
      'Use recursion with memoization',
      'At each index, try both + and - for current number',
      'Memoize based on (index, currentSum)',
      'Base case: when all numbers processed, check if sum equals target',
    ],
    concepts: ['dynamic programming', 'memoization', 'recursion', 'counting paths'],
  },
  {
    id: 'js-min-path-sum-grid',
    title: 'Minimum Path Sum',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the path from top-left to bottom-right in a grid of non-negative numbers that minimizes the total sum, moving only right or down. This DP problem fills dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). It is a foundational grid DP exercise commonly tested in coding interviews.',
    instructions: [
      'Implement a function that finds the minimum path sum in a grid',
      'You can only move right or down at each step',
      'Use dynamic programming or memoization to optimize',
      'Return the minimum sum value',
    ],
    starterCode: `function minPathSum(grid) {
  // YOUR CODE HERE
}`,
    solutionCode: `function minPathSum(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  dp[0][0] = grid[0][0];

  // Initialize first row
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  // Initialize first column
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // Fill rest of dp table
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
}`,
    testCases: [
      {
        input: [
          [1, 3, 1],
          [1, 5, 1],
          [4, 2, 1],
        ],
        expected: 7,
        description: '3x3 grid: path 1→3→1→1→1 = 7',
      },
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
        ],
        expected: 12,
        description: '2x3 grid: path 1→2→3→6 = 12',
      },
      {
        input: [[1]],
        expected: 1,
        description: 'Single cell grid',
      },
      {
        input: [
          [1, 2],
          [1, 1],
        ],
        expected: 3,
        description: '2x2 grid: path 1→1→1 = 3',
      },
    ],
    hints: [
      'Use dynamic programming with a 2D table',
      'dp[i][j] represents minimum sum to reach cell (i,j)',
      'Base cases: first row and first column can only be reached one way',
      'For other cells: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])',
    ],
    concepts: ['Dynamic Programming', 'Memoization', 'Grid Traversal', '2D Arrays'],
  },
  {
    id: 'js-palindrome-min-cuts',
    title: 'Palindrome Partitioning Min Cuts',
    category: 'memoization' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the minimum number of cuts to partition a string so every piece is a palindrome. This advanced DP problem first precomputes a 2D palindrome lookup table, then uses 1D DP where cuts[i] = min(cuts[j] + 1) for all j where s[j+1..i] is a palindrome. It combines two DP techniques.',
    instructions: [
      'Implement a function that finds minimum cuts for palindrome partitioning',
      'Each partition must be a palindrome',
      'Use dynamic programming to optimize',
      'Return the minimum number of cuts required',
    ],
    starterCode: `function minCutPalindrome(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function minCutPalindrome(s) {
  const n = s.length;
  if (n <= 1) return 0;

  // isPalin[i][j] = true if s[i..j] is palindrome
  const isPalin = Array.from({ length: n }, () => Array(n).fill(false));

  // Every single character is a palindrome
  for (let i = 0; i < n; i++) {
    isPalin[i][i] = true;
  }

  // Check for length 2 palindromes
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      isPalin[i][i + 1] = true;
    }
  }

  // Check for lengths greater than 2
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j] && isPalin[i + 1][j - 1]) {
        isPalin[i][j] = true;
      }
    }
  }

  // cuts[i] = minimum cuts needed for s[0..i]
  const cuts = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (isPalin[0][i]) {
      cuts[i] = 0;
    } else {
      cuts[i] = i; // max cuts
      for (let j = 0; j < i; j++) {
        if (isPalin[j + 1][i]) {
          cuts[i] = Math.min(cuts[i], cuts[j] + 1);
        }
      }
    }
  }

  return cuts[n - 1];
}`,
    testCases: [
      {
        input: 'aab',
        expected: 1,
        description: 'Split into "aa" and "b"',
      },
      {
        input: 'a',
        expected: 0,
        description: 'Already a palindrome',
      },
      {
        input: 'ab',
        expected: 1,
        description: 'Split into "a" and "b"',
      },
      {
        input: 'abcba',
        expected: 0,
        description: 'Entire string is palindrome',
      },
      {
        input: 'abacdc',
        expected: 2,
        description: 'Split into "aba", "c", "d", "c"',
      },
    ],
    hints: [
      'First precompute which substrings are palindromes',
      'Use 2D DP to store palindrome information',
      'Then use 1D DP for minimum cuts: cuts[i] = min cuts for s[0..i]',
      'If s[0..i] is palindrome, cuts[i] = 0',
    ],
    concepts: ['Dynamic Programming', 'Palindrome', 'String Partitioning', 'Optimization'],
  },
  {
    id: 'js-egg-drop',
    title: 'Egg Drop Problem',
    category: 'memoization' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the minimum worst-case trials to determine the critical floor with k eggs and n floors. This classic DP problem uses dp[eggs][floors] where dropping from floor x creates two branches: egg breaks (fewer eggs, lower floors) or survives (same eggs, higher floors). It teaches minimax optimization over decision trees.',
    instructions: [
      'Implement a function that solves the egg drop problem',
      'Return minimum number of trials in worst case',
      'Use dynamic programming with memoization',
      'If egg breaks at floor x, test lower floors; if not, test higher floors',
    ],
    starterCode: `function eggDrop(eggs, floors) {
  // YOUR CODE HERE
}`,
    solutionCode: `function eggDrop(eggs, floors) {
  // dp[i][j] = min trials with i eggs and j floors
  const dp = Array.from({ length: eggs + 1 }, () => Array(floors + 1).fill(0));

  // Base cases:
  // 1 egg: need j trials for j floors (linear search)
  for (let j = 0; j <= floors; j++) {
    dp[1][j] = j;
  }

  // 0 floors = 0 trials, 1 floor = 1 trial
  for (let i = 0; i <= eggs; i++) {
    dp[i][0] = 0;
    dp[i][1] = 1;
  }

  // Fill rest of table
  for (let i = 2; i <= eggs; i++) {
    for (let j = 2; j <= floors; j++) {
      dp[i][j] = Infinity;

      // Try dropping from each floor x
      for (let x = 1; x <= j; x++) {
        // If breaks: dp[i-1][x-1], if not: dp[i][j-x]
        // Take max (worst case), then min over all x
        const trials = 1 + Math.max(dp[i - 1][x - 1], dp[i][j - x]);
        dp[i][j] = Math.min(dp[i][j], trials);
      }
    }
  }

  return dp[eggs][floors];
}`,
    testCases: [
      {
        input: [2, 10],
        expected: 4,
        description: '2 eggs, 10 floors: 4 trials',
      },
      {
        input: [1, 10],
        expected: 10,
        description: '1 egg, 10 floors: must try linearly',
      },
      {
        input: [2, 6],
        expected: 3,
        description: '2 eggs, 6 floors: 3 trials',
      },
      {
        input: [3, 14],
        expected: 4,
        description: '3 eggs, 14 floors: 4 trials',
      },
    ],
    hints: [
      'Use 2D DP: dp[eggs][floors] = minimum trials',
      'Base case: 1 egg requires linear search (j trials for j floors)',
      'For each floor count, try dropping from each floor and take worst case',
      'If egg breaks, you have (eggs-1) and (floor-1) remaining',
    ],
    concepts: ['Dynamic Programming', 'Optimization', 'Worst-Case Analysis', 'Decision Trees'],
  },
  {
    id: 'js-burst-balloons',
    title: 'Burst Balloons',
    category: 'memoization' as const,
    difficulty: 'advanced' as const,
    description:
      'Burst balloons to maximize coins, where bursting balloon i earns nums[left]*nums[i]*nums[right]. The key insight is thinking about which balloon to burst LAST in each interval, enabling interval DP. Adding virtual boundary balloons with value 1 simplifies edge cases. This is a classic interval DP interview problem.',
    instructions: [
      'Implement a function to maximize coins from bursting balloons',
      'When bursting balloon i, coins = nums[left] * nums[i] * nums[right]',
      'Add virtual balloons with value 1 at both ends',
      'Use interval DP or memoization',
    ],
    starterCode: `function maxCoinsBurst(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxCoinsBurst(nums) {
  if (!nums || nums.length === 0) return 0;

  // Add 1s at both ends
  const balloons = [1, ...nums, 1];
  const n = balloons.length;

  // dp[i][j] = max coins from bursting balloons between i and j (exclusive)
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  // len is the length of the interval
  for (let len = 2; len < n; len++) {
    for (let left = 0; left < n - len; left++) {
      const right = left + len;

      // Try bursting each balloon k last in this interval
      for (let k = left + 1; k < right; k++) {
        const coins = balloons[left] * balloons[k] * balloons[right];
        const total = coins + dp[left][k] + dp[k][right];
        dp[left][right] = Math.max(dp[left][right], total);
      }
    }
  }

  return dp[0][n - 1];
}`,
    testCases: [
      {
        input: [3, 1, 5, 8],
        expected: 167,
        description: 'Optimal order gives 167 coins',
      },
      {
        input: [1, 5],
        expected: 10,
        description: 'Burst 1 then 5: 1*1*5 + 1*5*1 = 10',
      },
      {
        input: [3],
        expected: 3,
        description: 'Single balloon: 1*3*1 = 3',
      },
      {
        input: [2, 4, 6],
        expected: 64,
        description: 'Three balloons optimal burst',
      },
    ],
    hints: [
      'Think about which balloon to burst LAST, not first',
      'Add virtual balloons with value 1 at both ends',
      'Use interval DP: dp[i][j] = max coins bursting balloons between i and j',
      'For each interval, try bursting each balloon last',
    ],
    concepts: ['Dynamic Programming', 'Interval DP', 'Optimization', 'Order Independence'],
  },
  {
    id: 'js-matrix-chain-mult',
    title: 'Matrix Chain Multiplication',
    category: 'memoization' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the minimum number of scalar multiplications to compute a chain of matrix products by choosing optimal parenthesization. This interval DP problem tries every split point for each subchain, computing cost as left + right + merge. It is the canonical example of interval dynamic programming in computer science.',
    instructions: [
      'Implement a function to find minimum scalar multiplications',
      'dims array represents matrix dimensions: matrix i is dims[i-1] × dims[i]',
      'Use dynamic programming on intervals',
      'Return the minimum number of multiplications',
    ],
    starterCode: `function matrixChainOrder(dims) {
  // YOUR CODE HERE
}`,
    solutionCode: `function matrixChainOrder(dims) {
  const n = dims.length - 1; // number of matrices
  if (n <= 1) return 0;

  // dp[i][j] = min multiplications to compute matrices i to j
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  // len is chain length
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;

      // Try splitting at each position k
      for (let k = i; k < j; k++) {
        // Cost of multiplying matrices i..k and k+1..j
        // then multiplying the two results
        const cost = dp[i][k] + dp[k + 1][j] +
                     dims[i] * dims[k + 1] * dims[j + 1];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }

  return dp[0][n - 1];
}`,
    testCases: [
      {
        input: [10, 20, 30, 40, 30],
        expected: 30000,
        description: '4 matrices: optimal parenthesization gives 30000',
      },
      {
        input: [10, 20, 30],
        expected: 6000,
        description: '2 matrices: 10×20×30 = 6000',
      },
      {
        input: [1, 2, 3, 4],
        expected: 18,
        description: '3 matrices: optimal is 18',
      },
      {
        input: [5, 10, 3, 12, 5, 50, 6],
        expected: 2010,
        description: '6 matrices: optimal parenthesization',
      },
    ],
    hints: [
      'Use interval DP: dp[i][j] = min cost for matrices i through j',
      'For each interval, try splitting at each position k',
      'Cost = left interval + right interval + cost to multiply results',
      'Multiplying (p×q) and (q×r) matrices costs p*q*r scalar multiplications',
    ],
    concepts: ['Dynamic Programming', 'Interval DP', 'Optimization', 'Matrix Operations'],
  },
  {
    id: 'js-longest-common-substr',
    title: 'Longest Common Substring',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the length of the longest contiguous substring common to two strings. Unlike longest common subsequence, the characters must be consecutive. The 2D DP resets to 0 on mismatch, tracking the maximum value seen. This distinction between substring and subsequence is a common interview discussion point.',
    instructions: [
      'Implement a function that finds the longest common substring length',
      'The substring must be contiguous in both strings',
      'Use dynamic programming',
      'Return the length of the longest common substring',
    ],
    starterCode: `function longestCommonSubstring(s1, s2) {
  // YOUR CODE HERE
}`,
    solutionCode: `function longestCommonSubstring(s1, s2) {
  if (!s1 || !s2) return 0;

  const m = s1.length;
  const n = s2.length;
  let maxLen = 0;

  // dp[i][j] = length of common substring ending at s1[i-1] and s2[j-1]
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        maxLen = Math.max(maxLen, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return maxLen;
}`,
    testCases: [
      {
        input: ['abcde', 'abfce'],
        expected: 2,
        description: 'Common substring "ab" has length 2',
      },
      {
        input: ['', ''],
        expected: 0,
        description: 'Empty strings',
      },
      {
        input: ['abc', 'def'],
        expected: 0,
        description: 'No common substring',
      },
      {
        input: ['GeeksforGeeks', 'GeeksQuiz'],
        expected: 5,
        description: 'Common substring "Geeks" has length 5',
      },
      {
        input: ['abcdxyz', 'xyzabcd'],
        expected: 4,
        description: 'Common substring "abcd" has length 4',
      },
    ],
    hints: [
      'Use 2D DP where dp[i][j] represents common substring ending at i and j',
      'If characters match, dp[i][j] = dp[i-1][j-1] + 1',
      "If they don't match, dp[i][j] = 0 (substring must be contiguous)",
      'Track the maximum value seen in the DP table',
    ],
    concepts: ['Dynamic Programming', 'String Matching', '2D Arrays', 'Longest Common Substring'],
  },
  {
    id: 'js-interleaving-string',
    title: 'Interleaving String',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Check if string s3 is formed by interleaving s1 and s2 while preserving character order from each source. This 2D DP problem uses dp[i][j] to track if the first i+j characters of s3 can be formed from s1[0..i-1] and s2[0..j-1]. It teaches multi-source string matching with order preservation.',
    instructions: [
      'Implement a function to check if s3 is an interleaving of s1 and s2',
      'Character order from s1 and s2 must be preserved',
      'Use dynamic programming',
      'Return true if s3 is valid interleaving, false otherwise',
    ],
    starterCode: `function isInterleave(s1, s2, s3) {
  // YOUR CODE HERE
}`,
    solutionCode: `function isInterleave(s1, s2, s3) {
  const m = s1.length;
  const n = s2.length;

  if (m + n !== s3.length) return false;

  // dp[i][j] = true if s3[0..i+j-1] is interleaving of s1[0..i-1] and s2[0..j-1]
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

  dp[0][0] = true;

  // Fill first row (only using s2)
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
  }

  // Fill first column (only using s1)
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  }

  // Fill rest of table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const k = i + j - 1;
      dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[k]) ||
                 (dp[i][j - 1] && s2[j - 1] === s3[k]);
    }
  }

  return dp[m][n];
}`,
    testCases: [
      {
        input: ['aabcc', 'dbbca', 'aadbbcbcac'],
        expected: true,
        description: 's3 is valid interleaving',
      },
      {
        input: ['aabcc', 'dbbca', 'aadbbbaccc'],
        expected: false,
        description: 's3 is not valid interleaving',
      },
      {
        input: ['', '', ''],
        expected: true,
        description: 'Empty strings interleave to empty',
      },
      {
        input: ['a', 'b', 'ab'],
        expected: true,
        description: 'Simple interleaving',
      },
      {
        input: ['abc', 'def', 'adbecf'],
        expected: true,
        description: 'Alternating interleaving',
      },
    ],
    hints: [
      'Use 2D DP: dp[i][j] represents if first i+j chars of s3 can be formed',
      'Base case: dp[0][0] = true (empty strings)',
      'dp[i][j] is true if we can use s1[i-1] OR s2[j-1] to match s3[i+j-1]',
      'Check length compatibility first: s1.length + s2.length must equal s3.length',
    ],
    concepts: ['Dynamic Programming', 'String Matching', '2D Arrays', 'Path Finding'],
  },
  {
    id: 'js-max-sum-nonadj',
    title: 'Maximum Sum Non-Adjacent',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the maximum sum of non-adjacent elements in an array, a generalization of the house robber problem. The DP recurrence at each position chooses between including the current element plus dp[i-2] or skipping it with dp[i-1]. This O(n) time, O(1) space pattern is fundamental to decision-based DP.',
    instructions: [
      'Implement a function to find maximum sum with no adjacent elements',
      'Cannot select two adjacent elements',
      'Use dynamic programming',
      'Return the maximum sum possible',
    ],
    starterCode: `function maxSumNonAdjacent(nums) {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxSumNonAdjacent(nums) {
  if (!nums || nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const n = nums.length;
  const dp = Array(n).fill(0);

  dp[0] = Math.max(0, nums[0]);
  dp[1] = Math.max(dp[0], nums[1]);

  for (let i = 2; i < n; i++) {
    // Either take current + dp[i-2], or skip current (dp[i-1])
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }

  return dp[n - 1];
}`,
    testCases: [
      {
        input: [5, 1, 3, 8],
        expected: 13,
        description: 'Select 5 and 8: sum = 13',
      },
      {
        input: [3, 2, 7, 10],
        expected: 13,
        description: 'Select 3 and 10: sum = 13',
      },
      {
        input: [5, 5, 10, 100, 10, 5],
        expected: 110,
        description: 'Select 5, 100, 5: sum = 110',
      },
      {
        input: [1],
        expected: 1,
        description: 'Single element',
      },
      {
        input: [2, 1, 4, 9],
        expected: 11,
        description: 'Select 2 and 9: sum = 11',
      },
    ],
    hints: [
      'Use DP: dp[i] = max sum using elements from 0 to i',
      'At each position, you can either take it or skip it',
      'If you take it: dp[i] = nums[i] + dp[i-2]',
      'If you skip it: dp[i] = dp[i-1]',
    ],
    concepts: ['Dynamic Programming', 'Optimization', 'Array Processing', 'Decision Making'],
  },
  {
    id: 'js-valid-palindrome-alnum',
    title: 'Valid Palindrome',
    category: 'utilities' as const,
    difficulty: 'beginner' as const,
    description:
      'Check if a string is a palindrome considering only alphanumeric characters and ignoring case. This beginner string problem teaches two key techniques: filtering input with regex and then using two pointers from both ends to verify symmetry. It is a common first-round screening interview question.',
    instructions: [
      'Implement a function to check if string is a valid palindrome',
      'Consider only alphanumeric characters',
      'Ignore case (treat uppercase and lowercase as same)',
      'Return true if palindrome, false otherwise',
    ],
    starterCode: `function isValidPalindrome(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function isValidPalindrome(s) {
  // Filter to alphanumeric and convert to lowercase
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}`,
    testCases: [
      {
        input: 'A man, a plan, a canal: Panama',
        expected: true,
        description: 'Classic palindrome phrase',
      },
      {
        input: 'race a car',
        expected: false,
        description: 'Not a palindrome',
      },
      {
        input: ' ',
        expected: true,
        description: 'Empty after filtering is palindrome',
      },
      {
        input: '0P',
        expected: false,
        description: 'Different alphanumeric characters',
      },
      {
        input: 'ab_a',
        expected: true,
        description: 'Ignore underscore, "aba" is palindrome',
      },
    ],
    hints: [
      'First clean the string: remove non-alphanumeric and convert to lowercase',
      'Use two pointers from start and end',
      'Compare characters at both pointers',
      'Empty string or single character is a palindrome',
    ],
    concepts: ['String Processing', 'Two Pointers', 'Palindrome', 'Character Filtering'],
  },
  {
    id: 'js-longest-no-repeat',
    title: 'Longest Substring Without Repeating Characters',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the length of the longest substring without repeating characters using a sliding window. This teaches the expanding-contracting window pattern: expand the right boundary, and when a duplicate is found, jump the left boundary past its previous occurrence. A Map tracks last-seen positions for O(n) time.',
    instructions: [
      'Implement a function to find longest substring without repeats',
      'Use sliding window technique',
      'Track characters in current window',
      'Return the maximum length found',
    ],
    starterCode: `function lengthOfLongestSubstring(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If char seen and within current window, move left
    if (seen.has(char) && seen.get(char) >= left) {
      left = seen.get(char) + 1;
    }

    seen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
    testCases: [
      {
        input: 'abcabcbb',
        expected: 3,
        description: 'Substring "abc" has length 3',
      },
      {
        input: 'bbbbb',
        expected: 1,
        description: 'All same character, length 1',
      },
      {
        input: 'pwwkew',
        expected: 3,
        description: 'Substring "wke" has length 3',
      },
      {
        input: '',
        expected: 0,
        description: 'Empty string',
      },
      {
        input: 'abcdef',
        expected: 6,
        description: 'No repeating characters',
      },
    ],
    hints: [
      'Use sliding window with two pointers (left and right)',
      'Use a map to track last seen position of each character',
      'When duplicate found, move left pointer past previous occurrence',
      'Update max length at each step',
    ],
    concepts: ['Sliding Window', 'Hash Map', 'String Processing', 'Two Pointers'],
  },
  {
    id: 'js-min-window-substr',
    title: 'Minimum Window Substring',
    category: 'utilities' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the minimum window in string s containing all characters of string t. This advanced sliding window problem expands right until all required characters are included, then contracts left to minimize. Two frequency maps track required vs. current counts. It is one of the hardest sliding window interview problems.',
    instructions: [
      'Implement a function to find minimum window containing all chars from t',
      'Use sliding window technique',
      'Window must contain all characters with at least their frequency in t',
      'Return the smallest such window, or empty string if none exists',
    ],
    starterCode: `function minWindowSubstring(s, t) {
  // YOUR CODE HERE
}`,
    solutionCode: `function minWindowSubstring(s, t) {
  if (s.length === 0 || t.length === 0) return '';

  const tCount = new Map();
  for (const char of t) {
    tCount.set(char, (tCount.get(char) || 0) + 1);
  }

  let required = tCount.size;
  let formed = 0;
  const windowCounts = new Map();

  let left = 0, right = 0;
  let minLen = Infinity;
  let minLeft = 0;

  while (right < s.length) {
    const char = s[right];
    windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

    if (tCount.has(char) && windowCounts.get(char) === tCount.get(char)) {
      formed++;
    }

    // Contract window
    while (left <= right && formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minLeft = left;
      }

      const leftChar = s[left];
      windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);

      if (tCount.has(leftChar) && windowCounts.get(leftChar) < tCount.get(leftChar)) {
        formed--;
      }

      left++;
    }

    right++;
  }

  return minLen === Infinity ? '' : s.substring(minLeft, minLeft + minLen);
}`,
    testCases: [
      {
        input: ['ADOBECODEBANC', 'ABC'],
        expected: 'BANC',
        description: 'Minimum window containing A, B, C',
      },
      {
        input: ['a', 'a'],
        expected: 'a',
        description: 'Single character match',
      },
      {
        input: ['a', 'aa'],
        expected: '',
        description: 'Not enough characters',
      },
      {
        input: ['ab', 'b'],
        expected: 'b',
        description: 'Single character window',
      },
      {
        input: ['abc', 'cba'],
        expected: 'abc',
        description: 'Entire string is minimum window',
      },
    ],
    hints: [
      'Use sliding window with two pointers',
      'Track character counts in t and current window',
      'Expand right to include all required characters',
      'Contract left while window is valid to minimize',
    ],
    concepts: ['Sliding Window', 'Hash Map', 'String Processing', 'Optimization'],
  },
  {
    id: 'js-group-anagrams',
    title: 'Group Anagrams',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Group strings that are anagrams of each other by using sorted characters as a hash key. This teaches the canonical-form hashing pattern: sorting each word produces an identical key for all anagrams, enabling O(n * k log k) grouping. It is a common interview question testing hash map and string skills.',
    instructions: [
      'Implement a function to group anagrams together',
      'Anagrams are words with same characters in different order',
      'Sort each group alphabetically',
      'Sort groups by their first element',
    ],
    starterCode: `function groupAnagrams(strs) {
  // YOUR CODE HERE
}`,
    solutionCode: `function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // Sort characters to create key
    const key = str.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  // Convert to array and sort each group, then sort groups
  const result = Array.from(map.values());

  // Sort each group alphabetically
  result.forEach(group => group.sort());

  // Sort groups by their first element
  result.sort((a, b) => a[0].localeCompare(b[0]));

  return result;
}`,
    testCases: [
      {
        input: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
        expected: [['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']],
        description: 'Three groups of anagrams',
      },
      {
        input: [''],
        expected: [['']],
        description: 'Single empty string',
      },
      {
        input: ['a'],
        expected: [['a']],
        description: 'Single character',
      },
      {
        input: ['abc', 'bca', 'cab', 'xyz', 'zyx'],
        expected: [
          ['abc', 'bca', 'cab'],
          ['xyz', 'zyx'],
        ],
        description: 'Two groups',
      },
    ],
    hints: [
      'Use sorted characters as a key to identify anagrams',
      'Use a hash map to group strings with same sorted key',
      'Sort each group alphabetically before returning',
      'Sort the groups by their first element',
    ],
    concepts: ['Hash Map', 'String Sorting', 'Grouping', 'Anagrams'],
  },
  {
    id: 'js-string-compress',
    title: 'String Compression',
    category: 'utilities' as const,
    difficulty: 'beginner' as const,
    description:
      'Compress a string by replacing consecutive character runs with the character and count (e.g., "aabcccccaaa" becomes "a2b1c5a3"). If the compressed version is not shorter, return the original. This teaches run-length encoding, a basic compression algorithm used in image formats and data transmission.',
    instructions: [
      'Implement basic string compression using character counts',
      'Format: "aabcccccaaa" becomes "a2b1c5a3"',
      'Only return compressed if it is shorter than original',
      'Otherwise return original string',
    ],
    starterCode: `function compressString(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function compressString(s) {
  if (s.length <= 1) return s;

  let compressed = '';
  let count = 1;

  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
    } else {
      compressed += s[i - 1] + count;
      count = 1;
    }
  }

  return compressed.length < s.length ? compressed : s;
}`,
    testCases: [
      {
        input: 'aabcccccaaa',
        expected: 'a2b1c5a3',
        description: 'String compresses to shorter form',
      },
      {
        input: 'abcdef',
        expected: 'abcdef',
        description: 'Compressed would be longer, return original',
      },
      {
        input: 'aabbcc',
        expected: 'aabbcc',
        description: 'Compressed same length, return original',
      },
      {
        input: 'a',
        expected: 'a',
        description: 'Single character',
      },
      {
        input: 'aaaa',
        expected: 'a4',
        description: 'All same character',
      },
    ],
    hints: [
      'Count consecutive occurrences of each character',
      'Build compressed string as char + count',
      'Compare lengths at the end',
      'Handle single character edge case',
    ],
    concepts: ['String Processing', 'Counting', 'Run-Length Encoding', 'Compression'],
  },
  {
    id: 'js-encode-decode-strings',
    title: 'Encode and Decode Strings',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Design an algorithm to encode an array of strings into a single string and decode it back. Using length-prefixed format (length + delimiter + content) handles strings containing any characters, including the delimiter itself. This serialization technique is used in network protocols and file formats.',
    instructions: [
      'Implement encode and decode functions for array of strings',
      'Use length-prefixed format: length + delimiter + string',
      'Must handle strings containing any characters',
      'For testing: implement encodeDecode(strs) that encodes then decodes',
    ],
    starterCode: `function encodeDecode(strs) {
  // YOUR CODE HERE
  // Implement encode and decode, then return decoded result
}`,
    solutionCode: `function encodeDecode(strs) {
  // Encode
  function encode(strs) {
    let encoded = '';
    for (const str of strs) {
      encoded += str.length + '#' + str;
    }
    return encoded;
  }

  // Decode
  function decode(str) {
    const result = [];
    let i = 0;

    while (i < str.length) {
      // Find the delimiter
      let j = i;
      while (str[j] !== '#') {
        j++;
      }

      // Extract length
      const length = parseInt(str.substring(i, j));

      // Extract string
      const start = j + 1;
      result.push(str.substring(start, start + length));

      // Move to next encoded string
      i = start + length;
    }

    return result;
  }

  const encoded = encode(strs);
  return decode(encoded);
}`,
    testCases: [
      {
        input: ['hello', 'world'],
        expected: ['hello', 'world'],
        description: 'Simple two word encoding',
      },
      {
        input: [''],
        expected: [''],
        description: 'Single empty string',
      },
      {
        input: ['abc', 'def', 'ghi'],
        expected: ['abc', 'def', 'ghi'],
        description: 'Three strings',
      },
      {
        input: ['a#b', 'c#d'],
        expected: ['a#b', 'c#d'],
        description: 'Strings containing delimiter character',
      },
      {
        input: ['', 'a', ''],
        expected: ['', 'a', ''],
        description: 'Mix of empty and non-empty',
      },
    ],
    hints: [
      'Use format: length + delimiter + string for each string',
      'For decode: read length, skip delimiter, read that many characters',
      'Length prefix avoids ambiguity with special characters',
      'Handle empty strings correctly (length 0)',
    ],
    concepts: ['String Encoding', 'Serialization', 'Parsing', 'Data Format'],
  },
  {
    id: 'js-roman-to-int',
    title: 'Roman to Integer',
    category: 'utilities' as const,
    difficulty: 'beginner' as const,
    description:
      'Convert a Roman numeral string to its integer value, handling subtractive notation like IV=4, IX=9, XL=40. The key insight is scanning left to right: if the current symbol is less than the next one, subtract it; otherwise add it. This elegantly handles all subtractive cases in a single O(n) pass.',
    instructions: [
      'Implement a function to convert roman numerals to integer',
      'Handle I, V, X, L, C, D, M',
      'Handle subtractive cases: IV, IX, XL, XC, CD, CM',
      'Return the integer value',
    ],
    starterCode: `function romanToInt(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function romanToInt(s) {
  const values = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const current = values[s[i]];
    const next = values[s[i + 1]];

    // If current is less than next, subtract (subtractive notation)
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  return result;
}`,
    testCases: [
      {
        input: 'III',
        expected: 3,
        description: 'Three ones',
      },
      {
        input: 'IV',
        expected: 4,
        description: 'Subtractive notation: 5 - 1',
      },
      {
        input: 'IX',
        expected: 9,
        description: 'Subtractive notation: 10 - 1',
      },
      {
        input: 'LVIII',
        expected: 58,
        description: 'L=50, V=5, III=3',
      },
      {
        input: 'MCMXCIV',
        expected: 1994,
        description: 'M=1000, CM=900, XC=90, IV=4',
      },
    ],
    hints: [
      'Create a map of roman numerals to values',
      'Iterate through string comparing current and next values',
      'If current < next, subtract current (subtractive case)',
      'Otherwise add current to result',
    ],
    concepts: ['String Processing', 'Roman Numerals', 'Mapping', 'Conditional Logic'],
  },
  {
    id: 'js-int-to-roman',
    title: 'Integer to Roman',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Convert an integer (1-3999) to a Roman numeral string using standard symbols and subtractive notation. The greedy approach processes a value-symbol table from largest to smallest, repeatedly subtracting and appending. Including subtractive pairs (900, 400, 90, 40, 9, 4) in the table handles all special cases.',
    instructions: [
      'Implement a function to convert integer to roman numerals',
      'Handle values 1-3999',
      'Use I, V, X, L, C, D, M',
      'Use subtractive notation where appropriate',
    ],
    starterCode: `function intToRoman(num) {
  // YOUR CODE HERE
}`,
    solutionCode: `function intToRoman(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let result = '';

  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }

  return result;
}`,
    testCases: [
      {
        input: 3,
        expected: 'III',
        description: 'Three ones',
      },
      {
        input: 4,
        expected: 'IV',
        description: 'Subtractive notation',
      },
      {
        input: 9,
        expected: 'IX',
        description: 'Nine using subtractive',
      },
      {
        input: 58,
        expected: 'LVIII',
        description: '50 + 5 + 3',
      },
      {
        input: 1994,
        expected: 'MCMXCIV',
        description: '1000 + 900 + 90 + 4',
      },
    ],
    hints: [
      'Create arrays of values and corresponding symbols (include subtractive pairs)',
      'Process from largest to smallest value',
      'While num >= value, append symbol and subtract value',
      'Include 900, 400, 90, 40, 9, 4 in your values array',
    ],
    concepts: ['Roman Numerals', 'Greedy Algorithm', 'String Building', 'Mapping'],
  },
  {
    id: 'js-kmp-pattern-match',
    title: 'KMP String Matching',
    category: 'utilities' as const,
    difficulty: 'advanced' as const,
    description:
      'Find all occurrences of a pattern in text using the Knuth-Morris-Pratt algorithm, which avoids redundant comparisons by precomputing a failure function (LPS array). KMP achieves O(n+m) time by using prefix-suffix information to skip ahead on mismatches. It is a fundamental string matching algorithm taught in CS curricula.',
    instructions: [
      'Implement KMP algorithm for pattern matching',
      'Build failure function (LPS array) for pattern',
      'Search for all occurrences of pattern in text',
      'Return array of starting indices',
    ],
    starterCode: `function kmpSearch(text, pattern) {
  // YOUR CODE HERE
}`,
    solutionCode: `function kmpSearch(text, pattern) {
  if (pattern.length === 0) return [];

  // Build LPS (Longest Proper Prefix which is also Suffix) array
  function buildLPS(pattern) {
    const lps = Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }

    return lps;
  }

  const lps = buildLPS(pattern);
  const result = [];
  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      result.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && text[i] !== pattern[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return result;
}`,
    testCases: [
      {
        input: ['ababcababa', 'aba'],
        expected: [0, 5, 7],
        description: 'Pattern "aba" occurs at indices 0, 5, 7',
      },
      {
        input: ['aaaa', 'aa'],
        expected: [0, 1, 2],
        description: 'Overlapping matches',
      },
      {
        input: ['hello', 'll'],
        expected: [2],
        description: 'Single match',
      },
      {
        input: ['abcdef', 'xyz'],
        expected: [],
        description: 'No matches',
      },
      {
        input: ['abc', ''],
        expected: [],
        description: 'Empty pattern',
      },
    ],
    hints: [
      'First build the LPS (failure function) array for the pattern',
      'LPS[i] = length of longest proper prefix of pattern[0..i] which is also suffix',
      'Use LPS to skip unnecessary comparisons when mismatch occurs',
      'When match found, record index and continue with LPS to find overlapping matches',
    ],
    concepts: ['KMP Algorithm', 'String Matching', 'Pattern Recognition', 'Prefix Function'],
  },
  {
    id: 'js-longest-palindrome-substr',
    title: 'Longest Palindromic Substring',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the longest palindromic substring using the expand-around-center approach. For each position, expand outward for both odd-length and even-length palindromes while characters match. This achieves O(n^2) time with O(1) space and is more intuitive than the Manacher algorithm for interview settings.',
    instructions: [
      'Implement a function to find longest palindromic substring',
      'Use expand-around-center technique',
      'Check both odd and even length palindromes',
      'Return the longest palindrome found',
    ],
    starterCode: `function longestPalindrome(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function longestPalindrome(s) {
  if (s.length < 2) return s;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // Return length and start position
    return { len: right - left - 1, start: left + 1 };
  }

  let maxLen = 0;
  let maxStart = 0;

  for (let i = 0; i < s.length; i++) {
    // Check odd length palindromes (center is single char)
    const odd = expandAroundCenter(i, i);
    if (odd.len > maxLen) {
      maxLen = odd.len;
      maxStart = odd.start;
    }

    // Check even length palindromes (center is between two chars)
    const even = expandAroundCenter(i, i + 1);
    if (even.len > maxLen) {
      maxLen = even.len;
      maxStart = even.start;
    }
  }

  return s.substring(maxStart, maxStart + maxLen);
}`,
    testCases: [
      {
        input: 'babad',
        expected: 'bab',
        description: 'Either "bab" or "aba" is valid (return first found)',
      },
      {
        input: 'cbbd',
        expected: 'bb',
        description: 'Even length palindrome',
      },
      {
        input: 'a',
        expected: 'a',
        description: 'Single character',
      },
      {
        input: 'ac',
        expected: 'a',
        description: 'No palindrome longer than 1',
      },
      {
        input: 'racecar',
        expected: 'racecar',
        description: 'Entire string is palindrome',
      },
    ],
    hints: [
      'For each position, expand outward while characters match',
      'Check both odd-length (single center) and even-length (double center) palindromes',
      'Track the longest palindrome found',
      'Time complexity: O(n²)',
    ],
    concepts: ['Palindrome', 'String Processing', 'Expand Around Center', 'Two Pointers'],
  },
  {
    id: 'js-string-to-int',
    title: 'Implement atoi',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      "Convert a string to a 32-bit signed integer, replicating C's atoi function. This state-machine problem handles whitespace skipping, optional sign detection, digit parsing, and integer overflow clamping. It teaches defensive parsing and boundary checking, testing attention to edge cases in interview settings.",
    instructions: [
      'Implement string to integer conversion',
      'Skip leading whitespace',
      'Handle optional + or - sign',
      'Clamp result to 32-bit signed integer range [-2^31, 2^31 - 1]',
    ],
    starterCode: `function myAtoi(s) {
  // YOUR CODE HERE
}`,
    solutionCode: `function myAtoi(s) {
  const INT_MAX = 2147483647;  // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  let i = 0;
  const n = s.length;

  // Skip whitespace
  while (i < n && s[i] === ' ') {
    i++;
  }

  if (i === n) return 0;

  // Handle sign
  let sign = 1;
  if (s[i] === '+' || s[i] === '-') {
    sign = s[i] === '-' ? -1 : 1;
    i++;
  }

  // Read digits
  let result = 0;
  while (i < n && s[i] >= '0' && s[i] <= '9') {
    const digit = s[i].charCodeAt(0) - '0'.charCodeAt(0);

    // Check for overflow before adding
    if (result > Math.floor(INT_MAX / 10) ||
        (result === Math.floor(INT_MAX / 10) && digit > 7)) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    i++;
  }

  return sign * result;
}`,
    testCases: [
      {
        input: '42',
        expected: 42,
        description: 'Simple positive number',
      },
      {
        input: '   -42',
        expected: -42,
        description: 'Leading whitespace and negative',
      },
      {
        input: '4193 with words',
        expected: 4193,
        description: 'Stop at non-digit',
      },
      {
        input: '-91283472332',
        expected: -2147483648,
        description: 'Clamp to INT_MIN on underflow',
      },
      {
        input: '21474836460',
        expected: 2147483647,
        description: 'Clamp to INT_MAX on overflow',
      },
    ],
    hints: [
      'First skip whitespace, then check for sign',
      'Build result digit by digit',
      'Check for overflow before multiplying by 10 and adding digit',
      'Clamp to [-2^31, 2^31-1] range',
    ],
    concepts: ['String Parsing', 'Integer Conversion', 'Overflow Handling', 'State Machine'],
  },
  {
    id: 'js-zigzag-string',
    title: 'Zigzag Conversion',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Arrange a string in a zigzag pattern across a given number of rows, then read line by line to produce the output. This simulation problem uses a direction toggle at row boundaries (top and bottom) to distribute characters across row buffers. It teaches index-pattern recognition and modular traversal logic.',
    instructions: [
      'Implement zigzag string conversion',
      'Write string in zigzag pattern with numRows rows',
      'Read line by line to create output',
      'If numRows is 1, return original string',
    ],
    starterCode: `function zigzagConvert(s, numRows) {
  // YOUR CODE HERE
}`,
    solutionCode: `function zigzagConvert(s, numRows) {
  if (numRows === 1 || numRows >= s.length) return s;

  const rows = Array.from({ length: numRows }, () => []);
  let currentRow = 0;
  let goingDown = false;

  for (const char of s) {
    rows[currentRow].push(char);

    // Change direction at top or bottom
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    currentRow += goingDown ? 1 : -1;
  }

  // Concatenate all rows
  return rows.map(row => row.join('')).join('');
}`,
    testCases: [
      {
        input: ['PAYPALISHIRING', 3],
        expected: 'PAHNAPLSIIGYIR',
        description: 'Three rows: P A H N | A P L S I I G | Y I R',
      },
      {
        input: ['PAYPALISHIRING', 4],
        expected: 'PINALSIGYAHRPI',
        description: 'Four rows zigzag',
      },
      {
        input: ['A', 1],
        expected: 'A',
        description: 'Single character',
      },
      {
        input: ['AB', 1],
        expected: 'AB',
        description: 'One row returns original',
      },
      {
        input: ['ABCD', 2],
        expected: 'ACBD',
        description: 'Two rows: A C | B D',
      },
    ],
    hints: [
      'Create an array of strings, one for each row',
      'Traverse the input string, appending to current row',
      'Change direction when reaching top (row 0) or bottom (row numRows-1)',
      'Concatenate all rows to form result',
    ],
    concepts: [
      'String Processing',
      'Pattern Recognition',
      'Array Manipulation',
      'Direction Toggle',
    ],
  },
];
