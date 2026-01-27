import type { Exercise } from './types';

export const typescriptExtraExercises: Exercise[] = [
  {
    id: 'ts-trapping-rain-water',
    title: 'Trapping Rain Water',
    category: 'iteration-patterns' as const,
    difficulty: 'advanced' as const,
    description:
      'Compute how much rainwater is trapped between bars of an elevation map. This classic hard interview problem teaches the two-pointer technique for computing bounded areas, widely used in problems requiring simultaneous left-right boundary tracking with O(n) time and O(1) space.',
    explanation: `The trapping rain water problem asks you to compute how much water can be held between bars of an elevation map after rainfall. It is one of the most frequently asked interview problems at top tech companies.\n\nThe key insight is that the water above any bar depends on the minimum of the tallest bar to its left and the tallest bar to its right, minus the bar's own height. The two-pointer approach achieves O(n) time and O(1) space by maintaining running maximums from both ends.\n\nStart with pointers at both ends. Move the pointer with the smaller max inward, accumulating water as you go. This works because the smaller side is always the bottleneck — you don't need to know the other side's exact max, just that it's at least as tall. This pattern of converging pointers with running aggregates shows up in container problems, histogram questions, and any scenario where a value depends on context from both directions.`,
    instructions: [
      'Use a two-pointer approach with left and right pointers',
      'Track the maximum height seen from left and right',
      'Water trapped at position i = min(leftMax, rightMax) - height[i]',
      'Move the pointer with smaller max height',
      'Return the total trapped water',
    ],
    starterCode: `function trap(height: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function trap(height: number[]): number {
  // Two-pointer approach: O(n) time, O(1) space
  // Track max heights from both sides to calculate trapped water
  if (height.length === 0) return 0;

  let leftPointer: number = 0;
  let rightPointer: number = height.length - 1;
  let leftMaxHeight: number = 0;
  let rightMaxHeight: number = 0;
  let totalWaterTrapped: number = 0;

  while (leftPointer < rightPointer) {
    if (height[leftPointer] < height[rightPointer]) {
      // Process left side - water level determined by left max
      if (height[leftPointer] >= leftMaxHeight) {
        leftMaxHeight = height[leftPointer];
      } else {
        totalWaterTrapped += leftMaxHeight - height[leftPointer];
      }
      leftPointer++;
    } else {
      // Process right side - water level determined by right max
      if (height[rightPointer] >= rightMaxHeight) {
        rightMaxHeight = height[rightPointer];
      } else {
        totalWaterTrapped += rightMaxHeight - height[rightPointer];
      }
      rightPointer--;
    }
  }

  return totalWaterTrapped;
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
    id: 'ts-container-most-water',
    title: 'Container With Most Water',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find two vertical lines that form a container holding the most water. This problem demonstrates why the greedy two-pointer convergence strategy works for optimization on pairs: always move the shorter side inward because widening cannot compensate for a shorter boundary.',
    explanation: `You are given an array of heights representing vertical lines on a number line, and you need to find the pair that forms a container holding the most water. This is a staple two-pointer problem that appears in virtually every interview prep resource.\n\nThe core insight is that area equals the minimum of the two heights multiplied by the distance between them. Starting with the widest possible container (pointers at both ends), you greedily move the shorter pointer inward because a shorter boundary can never produce a larger area regardless of width.\n\nThis greedy argument works because the only way to increase the constraining height is to try a taller line. Moving the taller line inward would only decrease the width without any guarantee of increasing the height. The algorithm runs in O(n) time with O(1) space, making it vastly more efficient than the brute-force O(n^2) approach of checking every pair.`,
    instructions: [
      'Use two pointers at the beginning and end of the array',
      'Calculate area = min(height[left], height[right]) * (right - left)',
      'Move the pointer with smaller height inward',
      'Track the maximum area seen',
      'Return the maximum area',
    ],
    starterCode: `function maxArea(height: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxArea(height: number[]): number {
  // Two-pointer approach: O(n) time, O(1) space
  // Converge pointers inward, always moving the shorter line
  let leftPointer: number = 0;
  let rightPointer: number = height.length - 1;
  let maxWaterArea: number = 0;

  while (leftPointer < rightPointer) {
    const containerWidth: number = rightPointer - leftPointer;
    const containerHeight: number = Math.min(height[leftPointer], height[rightPointer]);
    const currentArea: number = containerWidth * containerHeight;
    maxWaterArea = Math.max(maxWaterArea, currentArea);

    // Move the pointer with the shorter line inward
    // Moving the taller line can never increase the area
    if (height[leftPointer] < height[rightPointer]) {
      leftPointer++;
    } else {
      rightPointer--;
    }
  }

  return maxWaterArea;
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
    id: 'ts-product-except-self',
    title: 'Product of Array Except Self',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Build an array where each element is the product of all other elements, without using division. This teaches the prefix-suffix decomposition pattern: compute running products from both ends in two passes, a technique that generalizes to many problems requiring contextual aggregation around each index.',
    explanation: `This problem requires building an output array where each element equals the product of every other element in the input, without using division. It tests your ability to decompose a global operation into composable local computations.\n\nThe prefix-suffix technique solves this elegantly in two passes. In the first pass (left to right), you compute a running product of all elements before each index. In the second pass (right to left), you multiply each position by the running product of all elements after it.\n\nThe result at each index is the product of its prefix and suffix products. This achieves O(n) time and O(1) extra space (beyond the output array). The prefix-suffix decomposition pattern generalizes to many problems where each element needs aggregated context from both sides, such as computing max from left and right, or tracking running statistics in both directions.`,
    instructions: [
      'Create an output array initialized with 1s',
      'First pass: calculate prefix products (product of all elements to the left)',
      'Second pass: calculate suffix products and multiply with prefix',
      'Return the result array',
      'Time complexity should be O(n)',
    ],
    starterCode: `function productExceptSelf(nums: number[]): number[] {
  // YOUR CODE HERE
}`,
    solutionCode: `function productExceptSelf(nums: number[]): number[] {
  // Prefix-suffix product approach: O(n) time, O(1) extra space
  // result[i] = product of all elements left of i * product of all elements right of i
  const totalElements: number = nums.length;
  const result: number[] = new Array(totalElements).fill(1);

  // Left-to-right pass: store prefix products (product of all elements before index i)
  let prefixProduct: number = 1;
  for (let i = 0; i < totalElements; i++) {
    result[i] = prefixProduct;
    prefixProduct *= nums[i];
  }

  // Right-to-left pass: multiply by suffix products (product of all elements after index i)
  let suffixProduct: number = 1;
  for (let i = totalElements - 1; i >= 0; i--) {
    result[i] *= suffixProduct;
    suffixProduct *= nums[i];
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
    id: 'ts-next-greater-element',
    title: 'Next Greater Element',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'For each element, find the next greater element to its right using a monotonic stack. This foundational pattern powers stock span, daily temperatures, and histogram problems. The key insight is processing right-to-left and maintaining a decreasing stack of candidates.',
    explanation: `For each element in an array, you need to find the next element to its right that is strictly greater. This is the foundational monotonic stack problem that unlocks an entire family of related questions like daily temperatures, stock span, and largest rectangle in histogram.\n\nThe key technique is the monotonic decreasing stack: by processing elements from right to left, you maintain a stack of candidates that could be the "next greater" for future elements. When you encounter a new element, you pop all stack entries that are smaller or equal — they can never be the answer for any element to the left.\n\nEach element is pushed and popped at most once, giving O(n) amortized time with O(n) space. The elegance of this approach is that the stack naturally prunes irrelevant candidates. In real-world systems, this pattern appears in event processing where you need to find the next event exceeding a threshold, and in financial applications tracking price breakouts.`,
    instructions: [
      'Use a stack to track indices of elements',
      'Iterate through the array from right to left',
      'Pop elements from stack that are smaller than current',
      'The top of stack is the next greater element',
      'Return the result array',
    ],
    starterCode: `function nextGreaterElement(nums: number[]): number[] {
  // YOUR CODE HERE
}`,
    solutionCode: `function nextGreaterElement(nums: number[]): number[] {
  // Monotonic decreasing stack approach: O(n) time, O(n) space
  // Process right to left, maintaining a stack of candidates for "next greater"
  const totalElements: number = nums.length;
  const result: number[] = new Array(totalElements).fill(-1);
  const candidateStack: number[] = [];

  for (let i = totalElements - 1; i >= 0; i--) {
    // Remove stack elements that are not greater than current element
    while (candidateStack.length > 0 && candidateStack[candidateStack.length - 1] <= nums[i]) {
      candidateStack.pop();
    }

    // Top of stack is the next greater element (if stack is non-empty)
    if (candidateStack.length > 0) {
      result[i] = candidateStack[candidateStack.length - 1];
    }

    // Push current element as a future candidate
    candidateStack.push(nums[i]);
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
    id: 'ts-best-time-buy-sell',
    title: 'Best Time to Buy and Sell Stock',
    category: 'iteration-patterns' as const,
    difficulty: 'beginner' as const,
    description:
      'Find the maximum profit from buying and selling a stock once. This classic interview problem teaches the single-pass minimum-tracking pattern: maintain the lowest price seen so far and compute the best possible profit at each step, an approach used in many optimization problems with ordering constraints.',
    explanation: `You are given daily stock prices and must find the maximum profit from a single buy-sell transaction. This is often the first dynamic programming or greedy problem people encounter, and it builds intuition for tracking running optima.\n\nThe algorithm maintains the lowest price seen so far as you scan left to right. At each price, you compute the profit you would earn by selling at that price (current price minus the running minimum) and update the best profit if it improves.\n\nThis single-pass approach runs in O(n) time and O(1) space. The reason it works is that the optimal buy always precedes the optimal sell, so maintaining a running minimum captures every possible buy point. This minimum-tracking pattern extends to problems like finding the maximum difference in an array with ordering constraints, or tracking best entry points in streaming data.`,
    instructions: [
      'Track the minimum price seen so far',
      'For each price, calculate profit if selling at current price',
      'Update maximum profit if current profit is higher',
      'Return the maximum profit (0 if no profit possible)',
    ],
    starterCode: `function maxProfit(prices: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxProfit(prices: number[]): number {
  // Single-pass greedy approach: O(n) time, O(1) space
  // Track the lowest price seen so far and calculate potential profit at each step
  let lowestPriceSoFar: number = Infinity;
  let bestProfit: number = 0;

  for (let day = 0; day < prices.length; day++) {
    if (prices[day] < lowestPriceSoFar) {
      // Found a new lowest buy price
      lowestPriceSoFar = prices[day];
    } else {
      // Calculate profit if we sell at today's price
      const currentProfit: number = prices[day] - lowestPriceSoFar;
      bestProfit = Math.max(bestProfit, currentProfit);
    }
  }

  return bestProfit;
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
    id: 'ts-stock-buy-sell-multi',
    title: 'Best Time to Buy and Sell Stock II',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Maximize stock profit with unlimited buy-sell transactions. The greedy insight is that capturing every positive day-to-day price difference is mathematically equivalent to finding optimal buy-sell windows. This pattern illustrates how greedy decomposition can simplify seemingly complex multi-transaction optimization.',
    explanation: `This variant allows unlimited buy-sell transactions and asks you to maximize total profit. Unlike the single-transaction version, you can buy and sell repeatedly as long as you don't hold more than one share at a time.\n\nThe greedy insight is surprisingly simple: capture every positive day-to-day price difference. If today's price is higher than yesterday's, you should have been holding (buy yesterday, sell today). Summing all positive consecutive differences is mathematically equivalent to finding optimal buy-sell windows.\n\nThis works because any multi-day profit (buy on day 1, sell on day 5) equals the sum of daily gains within that window. The algorithm runs in O(n) time and O(1) space. This decomposition of complex multi-decision optimization into simple local greedy choices is a powerful technique that appears in scheduling, resource allocation, and any problem where global optimality can be achieved through locally optimal steps.`,
    instructions: [
      'Identify all profitable consecutive day pairs',
      'Add profit whenever next day price is higher',
      'This captures all upward price movements',
      'Return the total profit',
    ],
    starterCode: `function maxProfitMulti(prices: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxProfitMulti(prices: number[]): number {
  // Greedy approach: O(n) time, O(1) space
  // Capture every upward price movement by summing all positive day-to-day differences
  let totalProfit: number = 0;

  for (let day = 1; day < prices.length; day++) {
    const dailyChange: number = prices[day] - prices[day - 1];
    // Add profit whenever today's price is higher than yesterday's
    if (dailyChange > 0) {
      totalProfit += dailyChange;
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
    id: 'ts-jump-game',
    title: 'Jump Game',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Determine if you can reach the last index by jumping through an array of maximum jump lengths. This greedy reachability problem teaches tracking the farthest reachable position in a single pass, a technique used in network connectivity and resource allocation problems.',
    explanation: `Given an array where each element represents the maximum jump length from that position, determine if you can reach the last index starting from the first. This is a reachability problem that introduces the greedy frontier-extension technique.\n\nThe algorithm maintains a single variable: the farthest index reachable so far. As you scan left to right, you update this frontier by taking the maximum of its current value and the current index plus its jump length. If you ever find yourself at an index beyond the frontier, you are stuck.\n\nThis runs in O(n) time and O(1) space. The greedy argument is that if a position is reachable, all positions before it are also reachable (since they were on the path). Therefore, you only need to track the farthest reachable point, not the specific path. This pattern is used in network connectivity analysis, resource coverage problems, and interval scheduling.`,
    instructions: [
      'Track the farthest position reachable',
      'Iterate through the array',
      'At each position, update the farthest reachable index',
      'If current position is beyond farthest reachable, return false',
      'Return true if farthest reaches or exceeds last index',
    ],
    starterCode: `function canJump(nums: number[]): boolean {
  // YOUR CODE HERE
}`,
    solutionCode: `function canJump(nums: number[]): boolean {
  // Greedy reachability approach: O(n) time, O(1) space
  // Track the farthest index reachable from any position visited so far
  let farthestReachable: number = 0;

  for (let position = 0; position < nums.length; position++) {
    // If current position is beyond what we can reach, we are stuck
    if (position > farthestReachable) {
      return false;
    }
    // Update the farthest index we can jump to from here
    farthestReachable = Math.max(farthestReachable, position + nums[position]);
    // Early exit if we can already reach the last index
    if (farthestReachable >= nums.length - 1) {
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
    id: 'ts-jump-game-min',
    title: 'Jump Game II - Minimum Jumps',
    category: 'iteration-patterns' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the minimum number of jumps to reach the last index in an array of jump lengths. This problem introduces BFS-like level processing on arrays: each "level" represents positions reachable with one additional jump, enabling O(n) greedy optimization over naive O(n^2) approaches.',
    explanation: `This harder variant asks for the minimum number of jumps to reach the last index, not just whether it is possible. It introduces BFS-style level processing on an array, where each "level" represents positions reachable with one additional jump.\n\nThe algorithm tracks two boundaries: the end of the current jump level and the farthest position reachable from within the current level. When you reach the end of a level, you must take another jump, moving the boundary to the farthest reachable point.\n\nThis is essentially BFS without an explicit queue — each level processes a contiguous range of indices. The time complexity is O(n) and space is O(1). The BFS-on-array pattern applies to any problem where you need the minimum number of steps to traverse a sequence, such as minimum operations in transformation problems or shortest path in implicit graphs defined by array values.`,
    instructions: [
      'Use BFS-like approach with levels representing number of jumps',
      'Track current jump range and next jump range',
      'When current position exceeds current range, increment jumps',
      'Update farthest reachable position in next range',
      'Return the number of jumps',
    ],
    starterCode: `function minJumps(nums: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function minJumps(nums: number[]): number {
  // BFS-like greedy approach: O(n) time, O(1) space
  // Each "level" represents positions reachable with one more jump
  if (nums.length <= 1) return 0;

  let jumpCount: number = 0;
  let currentLevelEnd: number = 0;   // Boundary of positions reachable with current jump count
  let farthestReachable: number = 0; // Farthest position reachable from current level

  for (let i = 0; i < nums.length - 1; i++) {
    // Expand the farthest reachable position from this index
    farthestReachable = Math.max(farthestReachable, i + nums[i]);

    // When we reach the end of the current level, we must take another jump
    if (i === currentLevelEnd) {
      jumpCount++;
      currentLevelEnd = farthestReachable;

      // Early exit if we can already reach the last index
      if (currentLevelEnd >= nums.length - 1) {
        break;
      }
    }
  }

  return jumpCount;
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
    id: 'ts-gas-station',
    title: 'Gas Station',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the starting gas station to complete a circular route given fuel and cost arrays. This greedy problem relies on a key mathematical insight: if total gas exceeds total cost, a valid start exists, and resetting the start whenever the tank goes negative finds it in one pass.',
    explanation: `You need to find a starting gas station on a circular route where you can complete a full loop given fuel capacities and travel costs at each station. This problem combines circular array reasoning with a greedy reset strategy.\n\nThe first key insight is mathematical: if total gas is at least total cost, a valid starting station must exist. The second insight is that if your running fuel balance goes negative at some station, no station between your current start and that station can work either — so you reset your start to the next station.\n\nThis single-pass algorithm runs in O(n) time and O(1) space. The proof relies on the fact that if a prefix sum goes negative, starting from any point within that prefix would give an even more negative balance at the failure point. This "reset on failure" greedy pattern appears in problems involving circular arrangements, segment selection, and finding optimal starting points in cyclical processes.`,
    instructions: [
      'Check if total gas >= total cost (otherwise impossible)',
      'Track current tank balance',
      'If tank becomes negative, reset start position to next station',
      'The last valid start position is the answer',
      'Return the starting station index or -1',
    ],
    starterCode: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  // Greedy single-pass approach: O(n) time, O(1) space
  // If total gas >= total cost, a valid start exists; find it by resetting when tank empties
  let totalGasAvailable: number = 0;
  let totalCostRequired: number = 0;
  let currentTank: number = 0;
  let startStation: number = 0;

  for (let station = 0; station < gas.length; station++) {
    totalGasAvailable += gas[station];
    totalCostRequired += cost[station];
    currentTank += gas[station] - cost[station];

    // If tank goes negative, we cannot start from startStation (or any station before here)
    if (currentTank < 0) {
      startStation = station + 1;
      currentTank = 0;
    }
  }

  // Circuit is possible only if total gas covers total cost
  return totalGasAvailable >= totalCostRequired ? startStation : -1;
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
    id: 'ts-three-sum-zero',
    title: 'Three Sum',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find all unique triplets in an array that sum to zero using sorting and two pointers. This quintessential interview problem teaches how sorting enables efficient pair-finding with O(n^2) time, and how to skip duplicates systematically to avoid redundant results.',
    explanation: `Find all unique triplets in an array that sum to zero. This is perhaps the most commonly asked medium-difficulty interview question, testing your ability to combine sorting with the two-pointer technique and handle duplicates cleanly.\n\nThe approach sorts the array first, then fixes one element and uses two pointers to find complementary pairs in the remaining sorted portion. After finding a valid triplet, both pointers skip over duplicate values to avoid producing the same triplet again.\n\nThe time complexity is O(n^2) — one loop for the fixed element and a linear scan for the two pointers. Space is O(1) beyond the output. The duplicate-skipping technique is critical: without it, you would need to deduplicate results afterward, which is messier and less efficient. This sort-then-two-pointer pattern extends to k-sum problems, closest-sum variants, and any problem requiring efficient pair searching in sorted data.`,
    instructions: [
      'Sort the array first',
      'For each element, use two pointers to find pairs that sum to negative of that element',
      'Skip duplicate values to avoid duplicate triplets',
      'Return all unique triplets',
    ],
    starterCode: `function threeSum(nums: number[]): number[][] {
  // YOUR CODE HERE
}`,
    solutionCode: `function threeSum(nums: number[]): number[][] {
  // Sort + two-pointer approach: O(n^2) time, O(1) extra space
  // Fix one element, then use two pointers to find pairs summing to its negation
  const triplets: number[][] = [];
  nums.sort((a, b) => a - b);

  for (let fixedIndex = 0; fixedIndex < nums.length - 2; fixedIndex++) {
    // Skip duplicate values for the fixed element
    if (fixedIndex > 0 && nums[fixedIndex] === nums[fixedIndex - 1]) continue;

    let leftPointer: number = fixedIndex + 1;
    let rightPointer: number = nums.length - 1;

    while (leftPointer < rightPointer) {
      const tripletSum: number = nums[fixedIndex] + nums[leftPointer] + nums[rightPointer];

      if (tripletSum === 0) {
        triplets.push([nums[fixedIndex], nums[leftPointer], nums[rightPointer]]);

        // Skip duplicates for left and right pointers
        while (leftPointer < rightPointer && nums[leftPointer] === nums[leftPointer + 1]) leftPointer++;
        while (leftPointer < rightPointer && nums[rightPointer] === nums[rightPointer - 1]) rightPointer--;

        leftPointer++;
        rightPointer--;
      } else if (tripletSum < 0) {
        // Sum too small, move left pointer to increase sum
        leftPointer++;
      } else {
        // Sum too large, move right pointer to decrease sum
        rightPointer--;
      }
    }
  }

  return triplets;
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
    id: 'ts-remove-dupes-sorted-ii',
    title: 'Remove Duplicates from Sorted Array II',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Remove duplicates from a sorted array in-place allowing at most two occurrences of each element. This teaches the read-write pointer pattern for in-place array compaction, where comparing against the element two positions behind the write pointer elegantly enforces the at-most-two constraint.',
    explanation: `Remove duplicates from a sorted array in-place, allowing at most two occurrences of each element. This teaches a general technique for in-place array compaction with frequency constraints that is cleaner than most people expect.\n\nThe elegant solution uses a read pointer and a write pointer. The write pointer starts at position 2 (the first two elements are always kept). For each subsequent element, you compare it against the element two positions before the write pointer. If they differ, the element is valid and gets written.\n\nThis comparison against writePointer - 2 automatically enforces the at-most-two constraint because the written portion is always sorted. The algorithm runs in O(n) time with O(1) space. This "compare against k positions back" technique generalizes to any maximum frequency constraint — just change the offset. It appears in data deduplication, stream processing, and database query result limiting.`,
    instructions: [
      'Use a write pointer to track where to place next valid element',
      'Allow first two occurrences of each element',
      'Check if current element equals element at write-2 position',
      'If different, write current element at write pointer',
      'Return the new length',
    ],
    starterCode: `function removeDuplicates(nums: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function removeDuplicates(nums: number[]): number {
  // Two-pointer in-place approach: O(n) time, O(1) space
  // Allow at most 2 occurrences by comparing with the element two positions back
  if (nums.length <= 2) return nums.length;

  let writePointer: number = 2; // First two elements are always kept

  for (let readPointer = 2; readPointer < nums.length; readPointer++) {
    // Only write if current element differs from the element two positions before write
    // This ensures at most 2 consecutive duplicates in the result
    if (nums[readPointer] !== nums[writePointer - 2]) {
      nums[writePointer] = nums[readPointer];
      writePointer++;
    }
  }

  return writePointer;
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
    id: 'ts-longest-consecutive-seq',
    title: 'Longest Consecutive Sequence',
    category: 'iteration-patterns' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the longest consecutive integer sequence in an unsorted array in O(n) time. The key insight is using a hash set and only starting a count from sequence beginnings (numbers with no predecessor). This avoids redundant traversals and is a common interview question testing hash-based optimization.',
    explanation: `Find the length of the longest consecutive integer sequence in an unsorted array, and do it in O(n) time. This rules out sorting and requires a hash-based approach that cleverly avoids redundant work.\n\nThe technique is to insert all numbers into a Set, then only start counting from sequence beginnings — numbers that have no predecessor (num - 1) in the set. From each starting number, you count forward through consecutive values.\n\nThis achieves O(n) time because each number is visited at most twice: once when checking if it is a start, and once when being counted as part of a sequence. The space is O(n) for the set. The "only start from the beginning" optimization is the key insight — without it, you might re-traverse overlapping sequences. This pattern of using hash sets to eliminate redundant traversals applies broadly in problems requiring linear-time detection of patterns in unsorted data.`,
    instructions: [
      'Add all numbers to a Set for O(1) lookup',
      'For each number, check if it is the start of a sequence (no num-1 in set)',
      'If it is a start, count consecutive numbers',
      'Track the maximum length found',
      'Return the maximum length',
    ],
    starterCode: `function longestConsecutive(nums: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function longestConsecutive(nums: number[]): number {
  // Hash set approach: O(n) time, O(n) space
  // Only start counting from sequence beginnings (numbers with no predecessor in set)
  if (nums.length === 0) return 0;

  const numberSet: Set<number> = new Set(nums);
  let longestStreak: number = 0;

  for (const num of numberSet) {
    // Check if this number is the start of a sequence (no num-1 in set)
    if (!numberSet.has(num - 1)) {
      let currentNumber: number = num;
      let currentStreak: number = 1;

      // Count consecutive numbers forward
      while (numberSet.has(currentNumber + 1)) {
        currentNumber++;
        currentStreak++;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
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
    id: 'ts-move-zeroes',
    title: 'Move Zeroes',
    category: 'iteration-patterns' as const,
    difficulty: 'beginner' as const,
    description:
      'Move all zeros to the end of an array while preserving the relative order of non-zero elements, in-place. This beginner-friendly problem introduces the read-write two-pointer swap technique, a building block for partition-based algorithms like quicksort and the Dutch national flag problem.',
    explanation: `Move all zeros to the end of an array while maintaining the relative order of non-zero elements, doing everything in-place. This is an excellent introductory problem for learning the read-write pointer swap pattern.\n\nThe algorithm uses a write pointer that marks where the next non-zero element should go. A read pointer scans through the array, and whenever it finds a non-zero value, it swaps that value with the position at the write pointer, then advances the write pointer.\n\nAfter the scan completes, all non-zero elements are packed at the front in their original order, and zeros naturally fill the remaining positions. This runs in O(n) time with O(1) space. The same swap-based partitioning technique is the foundation of quicksort's partition step, the Dutch national flag problem, and any in-place array rearrangement where elements need to be segregated by some predicate.`,
    instructions: [
      'Use a write pointer to track where to place next non-zero',
      'Iterate through array with read pointer',
      'When non-zero found, swap with write position',
      'Increment write pointer after each swap',
      'All zeros naturally end up at the end',
    ],
    starterCode: `function moveZeroes(nums: number[]): void {
  // YOUR CODE HERE
}`,
    solutionCode: `function moveZeroes(nums: number[]): void {
  // Two-pointer swap approach: O(n) time, O(1) space
  // Write pointer tracks the next position for a non-zero element
  let writePointer: number = 0;

  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== 0) {
      // Swap non-zero element to the write position, zeros naturally shift right
      [nums[writePointer], nums[readPointer]] = [nums[readPointer], nums[writePointer]];
      writePointer++;
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
    id: 'ts-sort-by-parity',
    title: 'Sort Array By Parity',
    category: 'iteration-patterns' as const,
    difficulty: 'beginner' as const,
    description:
      'Partition an array so all even numbers appear before odd numbers while preserving relative order within each group. This stable partitioning exercise teaches the two-pass filtering approach and is a practical introduction to array rearrangement problems common in sorting and data processing.',
    explanation: `Rearrange an array so all even numbers come before all odd numbers while preserving relative order within each group. This stable partitioning exercise demonstrates a fundamental array rearrangement concept.\n\nThe simplest approach uses two passes: first collect all even numbers in order, then collect all odd numbers in order. This guarantees stability (preserving original relative order within each group) at the cost of O(n) extra space.\n\nAn in-place approach using two pointers is possible but sacrifices stability for O(1) space. The two-pass filter method runs in O(n) time and O(n) space. Stable partitioning appears frequently in data processing pipelines, database query results ordering, and sorting algorithms. Understanding the tradeoff between stability and space is essential for choosing the right approach in production systems.`,
    instructions: [
      'Create result array or use two-pointer in-place approach',
      'Collect all even numbers first in order',
      'Then collect all odd numbers in order',
      'Return the rearranged array',
    ],
    starterCode: `function sortArrayByParity(nums: number[]): number[] {
  // YOUR CODE HERE
}`,
    solutionCode: `function sortArrayByParity(nums: number[]): number[] {
  // Two-pass stable partition: O(n) time, O(n) space
  // Collect evens first, then odds, preserving relative order within each group
  const partitioned: number[] = [];

  // First pass: collect all even numbers in their original order
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      partitioned.push(nums[i]);
    }
  }

  // Second pass: collect all odd numbers in their original order
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 !== 0) {
      partitioned.push(nums[i]);
    }
  }

  return partitioned;
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
    id: 'ts-candy-distribution',
    title: 'Candy Distribution',
    category: 'iteration-patterns' as const,
    difficulty: 'advanced' as const,
    description:
      'Distribute minimum candies to children in a line where higher-rated children get more than their neighbors. This hard greedy problem demonstrates the two-pass constraint satisfaction technique: satisfy left-neighbor constraints in one pass, then right-neighbor in a reverse pass, taking the maximum at each position.',
    explanation: `Distribute the minimum total number of candies to children in a line where each child with a higher rating than a neighbor must receive more candy. This hard greedy problem requires satisfying simultaneous left and right constraints.\n\nThe two-pass strategy handles each constraint independently. The left-to-right pass ensures each child rated higher than the left neighbor gets more candy. The right-to-left pass does the same for the right neighbor, taking the maximum at each position to satisfy both constraints simultaneously.\n\nThis achieves O(n) time and O(n) space. The key insight is that bidirectional constraints can be decomposed into two unidirectional passes, then merged by taking the maximum. This two-pass constraint satisfaction technique appears in problems like trapping rain water, product of array except self, and any scenario where each element is constrained by both its predecessors and successors.`,
    instructions: [
      'Initialize all children with 1 candy',
      'Left to right pass: if rating[i] > rating[i-1], give more candy',
      'Right to left pass: if rating[i] > rating[i+1], ensure more candy',
      'Take maximum of current candies and calculated value',
      'Return sum of all candies',
    ],
    starterCode: `function candy(ratings: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function candy(ratings: number[]): number {
  // Two-pass greedy approach: O(n) time, O(n) space
  // Satisfy left-neighbor constraint first, then right-neighbor constraint
  const childCount: number = ratings.length;
  if (childCount === 0) return 0;

  // Each child gets at least 1 candy
  const candiesPerChild: number[] = new Array(childCount).fill(1);

  // Left-to-right pass: ensure higher-rated child gets more than left neighbor
  for (let i = 1; i < childCount; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candiesPerChild[i] = candiesPerChild[i - 1] + 1;
    }
  }

  // Right-to-left pass: ensure higher-rated child gets more than right neighbor
  for (let i = childCount - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      // Take the max to satisfy both left and right constraints
      candiesPerChild[i] = Math.max(candiesPerChild[i], candiesPerChild[i + 1] + 1);
    }
  }

  return candiesPerChild.reduce((totalCandies, count) => totalCandies + count, 0);
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
    id: 'ts-number-of-islands',
    title: 'Number of Islands',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count the number of islands in a 2D grid of land and water cells using DFS flood-fill. This fundamental graph traversal problem teaches connected component counting on grids, a pattern used in image processing, geographic analysis, and any problem requiring region detection in 2D space.',
    explanation: `Count the number of islands in a 2D grid where '1' represents land and '0' represents water. This is the canonical connected component counting problem on grids, serving as the gateway to an entire family of grid-based graph problems.\n\nThe algorithm scans every cell. When it finds unvisited land, it increments the island count and launches a DFS (or BFS) flood fill to mark all connected land cells as visited. By "sinking" visited land (setting it to '0'), you avoid revisiting cells without needing a separate visited array.\n\nTime complexity is O(rows * cols) since each cell is visited at most twice (once in the scan, once in the DFS). Space is O(rows * cols) in the worst case for the recursion stack. This flood-fill connected component pattern is used in image processing (region detection), geographic analysis (territory mapping), and game development (pathfinding and terrain analysis).`,
    instructions: [
      'Iterate through each cell in the grid',
      'When land ("1") is found, increment island count',
      'Use DFS to mark all connected land cells as visited',
      'Continue until all cells are processed',
      'Return the total island count',
    ],
    starterCode: `function numIslands(grid: string[][]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function numIslands(grid: string[][]): number {
  // DFS flood-fill approach: O(rows * cols) time, O(rows * cols) space (recursion stack)
  // Each unvisited land cell triggers a DFS that marks the entire island as visited
  if (!grid || grid.length === 0) return 0;

  const totalRows: number = grid.length;
  const totalCols: number = grid[0].length;
  let islandCount: number = 0;

  function sinkIsland(row: number, col: number): void {
    // Base case: out of bounds or water/already visited
    if (row < 0 || row >= totalRows || col < 0 || col >= totalCols || grid[row][col] === '0') {
      return;
    }

    // Mark current cell as visited by changing it to water
    grid[row][col] = '0';

    // Explore all four adjacent cells (up, down, left, right)
    sinkIsland(row + 1, col);
    sinkIsland(row - 1, col);
    sinkIsland(row, col + 1);
    sinkIsland(row, col - 1);
  }

  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      if (grid[row][col] === '1') {
        // Found a new island - count it and sink all connected land
        islandCount++;
        sinkIsland(row, col);
      }
    }
  }

  return islandCount;
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
    id: 'ts-clone-graph',
    title: 'Clone Graph',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Create a deep copy of a connected undirected graph by cloning every node and reconstructing all neighbor relationships. This teaches DFS-based graph traversal with visited-node tracking via a hash map, essential for handling circular references during serialization, object cloning, and garbage collection.',
    explanation: `Create a deep copy of an undirected graph where each node has a value and a list of neighbors. The challenge is handling circular references — nodes that point back to already-visited nodes — without entering infinite recursion.\n\nThe solution uses DFS with a hash map that maps each original node to its clone. Before recursing into a node, check if it has already been cloned. If so, return the existing clone. If not, create the clone, register it in the map, then recursively clone all neighbors.\n\nThis runs in O(V + E) time and O(V) space for the map. The map serves double duty: it prevents infinite loops AND ensures structural sharing is preserved (if two nodes share a neighbor, the clone maintains that relationship). This clone-with-visited-map pattern is fundamental to garbage collection algorithms, serialization frameworks, and any system that needs to deep-copy structures with cycles.`,
    instructions: [
      'Use a Map to track original node -> cloned node mapping',
      'Perform DFS starting from the given node',
      'For each node, create a clone if not already created',
      'Recursively clone all neighbors',
      'Return the cloned starting node',
    ],
    starterCode: `interface GraphNode {
  val: number;
  neighbors: GraphNode[];
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  // YOUR CODE HERE
}`,
    solutionCode: `interface GraphNode {
  val: number;
  neighbors: GraphNode[];
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  // DFS deep copy approach: O(V + E) time, O(V) space
  // Use a map to track original-to-clone mapping and handle circular references
  if (!node) return null;

  const originalToClone: Map<GraphNode, GraphNode> = new Map();

  function deepCloneNode(originalNode: GraphNode): GraphNode {
    // If already cloned, return the existing clone (prevents infinite loops)
    if (originalToClone.has(originalNode)) {
      return originalToClone.get(originalNode)!;
    }

    // Create a new clone node (neighbors populated below)
    const clonedNode: GraphNode = { val: originalNode.val, neighbors: [] };
    originalToClone.set(originalNode, clonedNode);

    // Recursively clone each neighbor and add to the clone's neighbor list
    for (const neighbor of originalNode.neighbors) {
      clonedNode.neighbors.push(deepCloneNode(neighbor));
    }

    return clonedNode;
  }

  return deepCloneNode(node);
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
    id: 'ts-course-schedule',
    title: 'Course Schedule',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Determine if all courses can be finished given prerequisite dependencies, detecting circular dependencies. This teaches directed graph cycle detection using DFS with three-state coloring, the foundation of topological sorting used in build systems, task schedulers, and dependency resolution.',
    explanation: `Determine whether all courses can be completed given a set of prerequisite dependencies. This is fundamentally a cycle detection problem on a directed graph — if there is a cycle in the prerequisites, it is impossible to complete all courses.\n\nThe algorithm uses DFS with three-state coloring: unvisited (0), currently visiting (1), and fully visited (2). If during DFS you encounter a node that is currently being visited, you have found a back edge, which means a cycle exists.\n\nTime complexity is O(V + E) where V is the number of courses and E is the number of prerequisites. The three-state approach is more robust than simple visited tracking because it distinguishes between nodes on the current DFS path (where back edges indicate cycles) and nodes already fully explored (which are safe to skip). This cycle detection technique powers build systems (detecting circular dependencies), package managers, task schedulers, and database migration tools.`,
    instructions: [
      'Build adjacency list from prerequisites',
      'Use DFS with three states: unvisited, visiting, visited',
      'Detect cycles: if we revisit a "visiting" node, cycle exists',
      'If cycle found, return false',
      'Return true if all courses can be completed',
    ],
    starterCode: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // YOUR CODE HERE
}`,
    solutionCode: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // DFS cycle detection: O(V + E) time, O(V + E) space
  // Use three-state coloring: unvisited(0), visiting(1), visited(2)
  const adjacencyList: number[][] = Array.from({ length: numCourses }, () => []);

  // Build directed graph: course -> its prerequisites
  for (const [course, prereq] of prerequisites) {
    adjacencyList[course].push(prereq);
  }

  // State: 0 = unvisited, 1 = currently visiting (in recursion stack), 2 = fully processed
  const visitState: number[] = new Array(numCourses).fill(0);

  function hasCycle(course: number): boolean {
    if (visitState[course] === 1) return true;  // Back edge found - cycle detected
    if (visitState[course] === 2) return false;  // Already fully processed - no cycle here

    visitState[course] = 1; // Mark as currently being explored

    for (const prereq of adjacencyList[course]) {
      if (hasCycle(prereq)) return true;
    }

    visitState[course] = 2; // Mark as fully processed
    return false;
  }

  // Check every course for cycles (handles disconnected components)
  for (let courseId = 0; courseId < numCourses; courseId++) {
    if (hasCycle(courseId)) return false;
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
    id: 'ts-surrounded-regions',
    title: 'Surrounded Regions',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Capture all O-regions surrounded by X on a 2D board by flipping them to X, sparing boundary-connected regions. This teaches the reverse-thinking DFS strategy: instead of finding surrounded regions directly, mark safe regions from boundaries first, then flip everything else.',
    explanation: `Capture all 'O' regions on a board that are completely surrounded by 'X', flipping them to 'X'. The trick is that regions touching any edge of the board cannot be captured because they are not fully surrounded.\n\nInstead of checking each 'O' region to see if it is surrounded (which is complex), use the reverse approach: start DFS from every 'O' on the border to mark all border-connected cells as safe. Then everything not marked safe is surrounded and should be flipped.\n\nThis boundary-first DFS runs in O(rows * cols) time and space. The reverse-thinking strategy — marking what to keep instead of what to remove — often simplifies problems where the "remove" condition is harder to verify directly. This pattern appears in image processing (keeping foreground objects connected to edges), game of life variations, and any grid problem where boundary connectivity determines cell fate.`,
    instructions: [
      'Mark all "O"s connected to boundaries as safe (use DFS from border)',
      'Change safe "O"s to a temporary marker (e.g., "S")',
      'Flip all remaining "O"s to "X" (these are surrounded)',
      'Restore temporary markers back to "O"',
      'Modify the board in-place',
    ],
    starterCode: `function solve(board: string[][]): void {
  // YOUR CODE HERE
}`,
    solutionCode: `function solve(board: string[][]): void {
  // Boundary DFS approach: O(rows * cols) time, O(rows * cols) space
  // Step 1: Mark boundary-connected 'O's as safe
  // Step 2: Flip remaining 'O's (surrounded) to 'X'
  // Step 3: Restore safe markers back to 'O'
  if (!board || board.length === 0) return;

  const totalRows: number = board.length;
  const totalCols: number = board[0].length;

  function markSafe(row: number, col: number): void {
    // Base case: out of bounds or not an unvisited 'O'
    if (row < 0 || row >= totalRows || col < 0 || col >= totalCols || board[row][col] !== 'O') {
      return;
    }

    board[row][col] = 'S'; // Temporarily mark as safe (boundary-connected)

    markSafe(row + 1, col);
    markSafe(row - 1, col);
    markSafe(row, col + 1);
    markSafe(row, col - 1);
  }

  // Start DFS from all boundary cells to mark safe 'O' regions
  for (let row = 0; row < totalRows; row++) {
    markSafe(row, 0);            // Left boundary
    markSafe(row, totalCols - 1); // Right boundary
  }
  for (let col = 0; col < totalCols; col++) {
    markSafe(0, col);            // Top boundary
    markSafe(totalRows - 1, col); // Bottom boundary
  }

  // Final pass: flip surrounded 'O's to 'X', restore safe 'S' back to 'O'
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      if (board[row][col] === 'O') {
        board[row][col] = 'X'; // Surrounded - capture it
      } else if (board[row][col] === 'S') {
        board[row][col] = 'O'; // Restore safe cell
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
    id: 'ts-rotting-oranges',
    title: 'Rotting Oranges',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Simulate rotting oranges spreading in a grid and return the time until all are rotten. This is the canonical multi-source BFS problem: all rotten oranges expand simultaneously, and each BFS level equals one time unit. This pattern applies to wildfire simulation, network broadcast, and infection spread modeling.',
    explanation: `Simulate rotting oranges spreading in a 2D grid: each minute, every rotten orange infects its four adjacent fresh oranges. Return the time until all oranges are rotten, or -1 if some remain fresh. This is the canonical multi-source BFS problem.\n\nThe key is that ALL initially rotten oranges are seeds that spread simultaneously, not one at a time. You initialize the BFS queue with every rotten orange at once. Each BFS level represents one minute of spreading. After BFS completes, check if any fresh oranges remain.\n\nThe algorithm runs in O(rows * cols) time and space. Multi-source BFS is more natural than running single-source BFS from each rotten orange, because it correctly models simultaneous propagation. This pattern directly applies to wildfire simulation, network broadcast delay estimation, epidemic modeling, and any scenario where multiple sources propagate outward simultaneously.`,
    instructions: [
      'Use BFS with queue initialized with all rotten oranges',
      'Count total fresh oranges initially',
      'Process level by level (each level = 1 minute)',
      'For each rotten orange, rot adjacent fresh oranges',
      'Return minutes elapsed, or -1 if fresh oranges remain',
    ],
    starterCode: `function orangesRotting(grid: number[][]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function orangesRotting(grid: number[][]): number {
  // Multi-source BFS approach: O(rows * cols) time, O(rows * cols) space
  // All rotten oranges spread simultaneously; each BFS level = 1 minute
  const totalRows: number = grid.length;
  const totalCols: number = grid[0].length;
  const bfsQueue: number[][] = [];
  let freshOrangeCount: number = 0;

  // Seed the BFS queue with all initially rotten oranges
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      if (grid[row][col] === 2) {
        bfsQueue.push([row, col]);
      } else if (grid[row][col] === 1) {
        freshOrangeCount++;
      }
    }
  }

  if (freshOrangeCount === 0) return 0;

  const directions: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let minutesElapsed: number = 0;

  while (bfsQueue.length > 0) {
    const levelSize: number = bfsQueue.length;
    let anyOrangeRotted: boolean = false;

    // Process all oranges that rot during this minute
    for (let i = 0; i < levelSize; i++) {
      const [row, col] = bfsQueue.shift()!;

      for (const [deltaRow, deltaCol] of directions) {
        const neighborRow: number = row + deltaRow;
        const neighborCol: number = col + deltaCol;

        // Rot adjacent fresh oranges
        if (neighborRow >= 0 && neighborRow < totalRows && neighborCol >= 0 && neighborCol < totalCols && grid[neighborRow][neighborCol] === 1) {
          grid[neighborRow][neighborCol] = 2;
          bfsQueue.push([neighborRow, neighborCol]);
          freshOrangeCount--;
          anyOrangeRotted = true;
        }
      }
    }

    if (anyOrangeRotted) minutesElapsed++;
  }

  // If fresh oranges remain, they are unreachable
  return freshOrangeCount === 0 ? minutesElapsed : -1;
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
    id: 'ts-word-ladder',
    title: 'Word Ladder',
    category: 'traversal' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the shortest word transformation sequence changing one letter at a time through a dictionary. This models implicit graph BFS where words are nodes and single-letter changes are edges. It teaches building graphs on-the-fly and is used in spell-checkers, NLP pipelines, and puzzle solvers.',
    explanation: `Find the shortest transformation sequence from a start word to an end word, changing one letter at a time, where each intermediate word must exist in a dictionary. This is an implicit graph shortest-path problem solved with BFS.\n\nEach word is a node, and two words are connected by an edge if they differ by exactly one letter. BFS guarantees finding the shortest path in this unweighted graph. For each word, you generate all possible single-letter variations and check which ones exist in the dictionary.\n\nTime complexity is O(M^2 * N) where M is word length and N is dictionary size — for each word in the queue, you try M positions with 26 letters each, and string operations take O(M). The implicit graph construction (generating neighbors on the fly rather than precomputing all edges) is a common technique in puzzle solvers, spell checkers, and NLP systems where the graph is too large to store explicitly.`,
    instructions: [
      'Return the number of words in the shortest transformation sequence',
      'Each transformed word must exist in the word list',
      'Only one letter can be changed at a time',
      'Return 0 if no transformation sequence exists',
      'Use BFS to find the shortest path',
    ],
    starterCode: `function wordLadder(beginWord: string, endWord: string, wordList: string[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function wordLadder(beginWord: string, endWord: string, wordList: string[]): number {
  // BFS shortest path approach: O(M^2 * N) time where M = word length, N = word list size
  // Each word is a node; edges connect words differing by one letter
  const validWords: Set<string> = new Set(wordList);
  if (!validWords.has(endWord)) return 0;

  const bfsQueue: [string, number][] = [[beginWord, 1]];
  const visitedWords: Set<string> = new Set([beginWord]);

  while (bfsQueue.length > 0) {
    const [currentWord, transformationDepth] = bfsQueue.shift()!;

    if (currentWord === endWord) return transformationDepth;

    // Try changing each character position to every letter a-z
    for (let position = 0; position < currentWord.length; position++) {
      for (let charCode = 97; charCode <= 122; charCode++) {
        const replacementChar: string = String.fromCharCode(charCode);
        const candidateWord: string = currentWord.slice(0, position) + replacementChar + currentWord.slice(position + 1);

        // Only explore valid, unvisited words
        if (validWords.has(candidateWord) && !visitedWords.has(candidateWord)) {
          visitedWords.add(candidateWord);
          bfsQueue.push([candidateWord, transformationDepth + 1]);
        }
      }
    }
  }

  // No transformation sequence found
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
    concepts: ['bfs', 'graph-traversal', 'string-manipulation', 'sets'],
  },
  {
    id: 'ts-shortest-path-grid',
    title: 'Shortest Path in Binary Grid',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the shortest clear path in a binary grid with 8-directional movement using BFS. BFS guarantees shortest path in unweighted grids, making this a core pattern for robot navigation, game pathfinding, and maze solving. The 8-direction variant adds diagonal neighbors to standard grid BFS.',
    explanation: `Find the shortest clear path in a binary grid from top-left to bottom-right, where you can move in all 8 directions (including diagonals). This extends standard grid BFS with diagonal movement.\n\nBFS is the correct algorithm because the grid is unweighted — each step costs 1 regardless of direction. You start from (0,0), explore all 8 neighbors at each step, and the first time you reach (n-1, n-1), you have found the shortest path. A visited set prevents revisiting cells.\n\nThe algorithm runs in O(rows * cols) time and space. The 8-directional variant is important because it models more realistic movement (like king moves in chess). BFS guarantees optimality in unweighted graphs, making it the right choice over DFS or Dijkstra here. This pattern is fundamental to robot path planning, game AI navigation, and geographic routing systems.`,
    instructions: [
      'Return the length of the shortest path, or -1 if no path exists',
      '0 represents a passable cell, 1 represents a blocked cell',
      'You can move in 8 directions (including diagonals)',
      'The path length includes both start and end cells',
      'Use BFS for shortest path',
    ],
    starterCode: `function shortestPathGrid(grid: number[][]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function shortestPathGrid(grid: number[][]): number {
  // BFS shortest path with 8-directional movement: O(rows * cols) time and space
  // BFS guarantees shortest path in an unweighted grid
  if (!grid || grid.length === 0 || grid[0][0] === 1) return -1;

  const rowCount: number = grid.length;
  const colCount: number = grid[0].length;

  if (grid[rowCount - 1][colCount - 1] === 1) return -1;
  if (rowCount === 1 && colCount === 1) return 1;

  // All 8 directions: diagonals + cardinal
  const directions: number[][] = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  const bfsQueue: number[][] = [[0, 0, 1]]; // [row, col, pathLength]
  const visitedCells: Set<string> = new Set(['0,0']);

  while (bfsQueue.length > 0) {
    const [currentRow, currentCol, pathLength] = bfsQueue.shift()!;

    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow: number = currentRow + deltaRow;
      const neighborCol: number = currentCol + deltaCol;
      const cellKey: string = \`\${neighborRow},\${neighborCol}\`;

      // Check if we reached the destination
      if (neighborRow === rowCount - 1 && neighborCol === colCount - 1) return pathLength + 1;

      // Explore valid, unvisited, passable neighbor cells
      if (neighborRow >= 0 && neighborRow < rowCount && neighborCol >= 0 && neighborCol < colCount &&
          grid[neighborRow][neighborCol] === 0 && !visitedCells.has(cellKey)) {
        visitedCells.add(cellKey);
        bfsQueue.push([neighborRow, neighborCol, pathLength + 1]);
      }
    }
  }

  return -1; // No clear path exists
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
    concepts: ['bfs', 'grid-traversal', 'shortest-path', 'graph'],
  },
  {
    id: 'ts-graph-valid-tree',
    title: 'Graph Valid Tree',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Determine if an undirected graph with n nodes and given edges forms a valid tree (connected and acyclic). This teaches the two properties that define a tree: exactly n-1 edges and full connectivity. DFS cycle detection with parent tracking or union-find are the standard approaches for this frequent interview question.',
    explanation: `Determine if an undirected graph with n nodes and given edges forms a valid tree. A tree must satisfy two conditions: it is connected (all nodes reachable) and it has no cycles.\n\nA quick mathematical check comes first: a tree with n nodes must have exactly n-1 edges. If the edge count is wrong, return false immediately. Then use DFS from any node, tracking parent nodes to avoid false cycle detection on undirected edges. If you visit an already-visited node that is not the parent, a cycle exists.\n\nAfter DFS, verify all nodes were reached (connectivity). The algorithm runs in O(V + E) time and space. An alternative approach uses Union-Find, which can detect cycles during edge processing and check connectivity by verifying a single connected component. This tree validation pattern is used in network topology verification, spanning tree algorithms, and data structure validation.`,
    instructions: [
      'A valid tree must be connected (all nodes reachable from any node)',
      'A valid tree must not contain any cycles',
      'A tree with n nodes has exactly n-1 edges',
      'Use DFS or union-find to detect cycles and check connectivity',
      'Edges are given as [node1, node2] pairs',
    ],
    starterCode: `function graphValidTree(n: number, edges: number[][]): boolean {
  // YOUR CODE HERE
}`,
    solutionCode: `function graphValidTree(n: number, edges: number[][]): boolean {
  // DFS cycle detection + connectivity check: O(V + E) time, O(V + E) space
  // A valid tree has exactly n-1 edges, is connected, and has no cycles

  // Quick check: a tree with n nodes must have exactly n-1 edges
  if (edges.length !== n - 1) return false;

  // Build undirected adjacency list
  const adjacencyList: number[][] = Array.from({ length: n }, () => []);
  for (const [nodeA, nodeB] of edges) {
    adjacencyList[nodeA].push(nodeB);
    adjacencyList[nodeB].push(nodeA);
  }

  const visitedNodes: Set<number> = new Set();

  function detectCycle(currentNode: number, parentNode: number): boolean {
    visitedNodes.add(currentNode);

    for (const neighbor of adjacencyList[currentNode]) {
      // Skip the edge back to the parent (undirected graph)
      if (neighbor === parentNode) continue;
      // If neighbor already visited, we found a cycle
      if (visitedNodes.has(neighbor)) return false;
      if (!detectCycle(neighbor, currentNode)) return false;
    }

    return true; // No cycle found in this subtree
  }

  // Check for cycles starting from node 0
  if (!detectCycle(0, -1)) return false;
  // Verify all nodes were reached (graph is connected)
  return visitedNodes.size === n;
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
    concepts: ['graph', 'dfs', 'cycle-detection', 'tree-validation'],
  },
  {
    id: 'ts-right-side-view',
    title: 'Binary Tree Right Side View',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Return the rightmost visible node at each level of a binary tree as seen from the right side. This teaches BFS level-order traversal where you capture the last node per level. The pattern generalizes to left-side view, level averages, and any per-level aggregation on trees.',
    explanation: `Return the values visible from the right side of a binary tree — the rightmost node at each depth level. This is a classic BFS level-order traversal problem with a twist: you only care about the last node in each level.\n\nUse BFS with a queue, processing nodes level by level. At each level, record how many nodes are in the queue (the level size), then process exactly that many nodes. The last node processed in each level is the one visible from the right side.\n\nThe algorithm runs in O(n) time (every node visited once) and O(w) space where w is the maximum width of the tree. An alternative DFS approach visits right subtrees first and adds the first node seen at each new depth. This per-level aggregation pattern extends to computing level averages, level maximums, left-side views, and zigzag level-order traversals — all common interview variations.`,
    instructions: [
      'Imagine standing on the right side of the tree',
      'Return the rightmost node value at each level',
      'Use level-order traversal (BFS)',
      'Return an empty array for null tree',
      'Nodes are represented as {val, left, right}',
    ],
    starterCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function rightSideView(root: TreeNode | null): number[] {
  // YOUR CODE HERE
}`,
    solutionCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function rightSideView(root: TreeNode | null): number[] {
  // BFS level-order traversal: O(n) time, O(n) space
  // Capture the last node at each level (the rightmost visible node)
  if (!root) return [];

  const visibleNodes: number[] = [];
  const levelQueue: TreeNode[] = [root];

  while (levelQueue.length > 0) {
    const nodesInCurrentLevel: number = levelQueue.length;

    for (let i = 0; i < nodesInCurrentLevel; i++) {
      const currentNode = levelQueue.shift()!;

      // The last node processed in this level is visible from the right
      if (i === nodesInCurrentLevel - 1) {
        visibleNodes.push(currentNode.val);
      }

      // Enqueue children left-to-right for next level
      if (currentNode.left) levelQueue.push(currentNode.left);
      if (currentNode.right) levelQueue.push(currentNode.right);
    }
  }

  return visibleNodes;
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
    concepts: ['bfs', 'binary-tree', 'level-order-traversal', 'queue'],
  },
  {
    id: 'ts-validate-bst',
    title: 'Validate Binary Search Tree',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Validate whether a binary tree satisfies BST ordering rules using recursive bounds checking. The key insight is propagating valid (min, max) ranges down the tree: each left child must be less than its ancestor, and each right child must be greater. This is a top interview question for tree recursion mastery.',
    explanation: `Validate whether a binary tree satisfies BST ordering rules: every node in the left subtree must be strictly less than the current node, and every node in the right subtree must be strictly greater. A common mistake is only checking immediate children rather than all descendants.\n\nThe correct approach propagates valid (min, max) bounds down the recursion. The root must be in (-Infinity, Infinity). When going left, the upper bound tightens to the current node's value. When going right, the lower bound tightens to the current node's value.\n\nThis runs in O(n) time and O(h) space where h is tree height. An alternative is inorder traversal — if the tree is a valid BST, inorder traversal produces strictly ascending values. The bounds-propagation technique is more general and teaches the important concept of passing constraints down recursive calls, which is used in constraint propagation, type checking, and program verification.`,
    instructions: [
      'Left subtree nodes must all be less than the parent node',
      'Right subtree nodes must all be greater than the parent node',
      'Both left and right subtrees must also be valid BSTs',
      'Use bounds checking or inorder traversal',
      'Nodes are {val, left, right}, null tree is valid',
    ],
    starterCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function validateBST(root: TreeNode | null): boolean {
  // YOUR CODE HERE
}`,
    solutionCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function validateBST(root: TreeNode | null): boolean {
  // Recursive bounds-checking approach: O(n) time, O(h) space (h = tree height)
  // Each node must fall within valid (min, max) range inherited from ancestors
  function isWithinBounds(node: TreeNode | null, lowerBound: number, upperBound: number): boolean {
    // An empty subtree is always valid
    if (!node) return true;

    // Node value must be strictly within bounds
    if (node.val <= lowerBound || node.val >= upperBound) return false;

    // Left child must be less than current node; right child must be greater
    return isWithinBounds(node.left, lowerBound, node.val) &&
           isWithinBounds(node.right, node.val, upperBound);
  }

  return isWithinBounds(root, -Infinity, Infinity);
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
    concepts: ['binary-search-tree', 'recursion', 'tree-validation', 'bounds-checking'],
  },
  {
    id: 'ts-kth-smallest-bst',
    title: 'Kth Smallest Element in BST',
    category: 'traversal' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the kth smallest element in a BST by leveraging inorder traversal, which visits nodes in ascending sorted order. This teaches how BST structure provides implicit sorting, and how early termination during traversal avoids unnecessary work. Frequently asked in interviews testing tree traversal and BST properties.',
    explanation: `Find the kth smallest element in a binary search tree. This problem exploits the fundamental property of BSTs: inorder traversal (left-root-right) visits nodes in ascending sorted order.\n\nPerform inorder traversal with a counter. Each time you visit a node (the "process" step between left and right recursive calls), increment the counter. When the counter equals k, you have found your answer. Early termination avoids unnecessary traversal of the remaining tree.\n\nTime complexity is O(H + k) where H is tree height — you must descend to the leftmost node and then visit k nodes. Space is O(H) for the recursion stack. This is more efficient than flattening the entire tree into a sorted array. The inorder-traversal-on-BST technique applies to finding the kth largest (reverse inorder), range queries, and converting a BST to a sorted list. It is one of the most frequently tested BST interview questions.`,
    instructions: [
      'Use inorder traversal (left-root-right) which visits nodes in sorted order',
      'k is 1-indexed (1 means the smallest element)',
      'Assume k is always valid (1 <= k <= number of nodes)',
      'Nodes are {val, left, right}',
      'Return the value of the kth smallest element',
    ],
    starterCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function kthSmallestBST(root: TreeNode, k: number): number | null {
  // YOUR CODE HERE
}`,
    solutionCode: `interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function kthSmallestBST(root: TreeNode, k: number): number | null {
  // Inorder traversal approach: O(H + k) time, O(H) space (H = tree height)
  // Inorder traversal of a BST visits nodes in ascending sorted order
  let nodesVisited: number = 0;
  let kthValue: number | null = null;

  function inorderTraversal(node: TreeNode | null): void {
    // Stop early if we already found the kth element
    if (!node || kthValue !== null) return;

    // Visit left subtree first (smaller values)
    inorderTraversal(node.left);

    // Process current node
    nodesVisited++;
    if (nodesVisited === k) {
      kthValue = node.val;
      return;
    }

    // Visit right subtree (larger values)
    inorderTraversal(node.right);
  }

  inorderTraversal(root);
  return kthValue;
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
    concepts: ['binary-search-tree', 'inorder-traversal', 'recursion', 'tree'],
  },
  {
    id: 'ts-alien-dictionary',
    title: 'Alien Dictionary',
    category: 'traversal' as const,
    difficulty: 'advanced' as const,
    description:
      "Derive the character ordering of an alien language from a sorted list of words using topological sort. By comparing adjacent words to extract precedence rules, you build a directed graph and apply Kahn's algorithm. This combines string comparison, graph construction, and topological ordering in one advanced problem.",
    explanation: `Given a sorted list of words from an alien language, derive the character ordering. This advanced problem combines string comparison, directed graph construction, and topological sorting into one cohesive challenge.\n\nFirst, extract ordering rules by comparing adjacent words: the first position where two words differ tells you that one character precedes another. Build a directed graph from these rules. Then apply Kahn's algorithm (BFS-based topological sort) using in-degree tracking to produce a valid character ordering. If the sort cannot include all characters, a cycle exists and the input is invalid.\n\nThe time complexity is O(C) where C is the total number of characters across all words. The combination of string processing, graph building, and topological sorting makes this a challenging but highly instructive problem. Topological sorting is used in build systems, course scheduling, package dependency resolution, and any scenario requiring linearization of partial orderings.`,
    instructions: [
      'Words are sorted lexicographically by the alien language rules',
      'Derive the character order by comparing adjacent words',
      'Use topological sort to find a valid ordering',
      'Return the character order as a string, or empty string if invalid',
      'If multiple valid orders exist, return any one',
    ],
    starterCode: `function alienDictionary(words: string[]): string {
  // YOUR CODE HERE
}`,
    solutionCode: `function alienDictionary(words: string[]): string {
  // Topological sort (Kahn's algorithm): O(C) time where C = total chars across all words
  // Build a directed graph of character precedence, then find a valid ordering

  // Adjacency list: char -> set of chars that come after it
  const precedenceGraph: Map<string, Set<string>> = new Map();
  // Track how many characters must come before each character
  const incomingEdgeCount: Map<string, number> = new Map();

  // Initialize all unique characters with zero in-degree
  for (const word of words) {
    for (const char of word) {
      if (!precedenceGraph.has(char)) {
        precedenceGraph.set(char, new Set());
        incomingEdgeCount.set(char, 0);
      }
    }
  }

  // Compare adjacent words to derive character ordering rules
  for (let i = 0; i < words.length - 1; i++) {
    const currentWord: string = words[i];
    const nextWord: string = words[i + 1];
    const compareLength: number = Math.min(currentWord.length, nextWord.length);

    // Invalid case: longer word appears before its own prefix
    if (currentWord.length > nextWord.length && currentWord.startsWith(nextWord)) {
      return '';
    }

    // Find the first differing character - this gives us an ordering rule
    for (let j = 0; j < compareLength; j++) {
      if (currentWord[j] !== nextWord[j]) {
        if (!precedenceGraph.get(currentWord[j])!.has(nextWord[j])) {
          precedenceGraph.get(currentWord[j])!.add(nextWord[j]);
          incomingEdgeCount.set(nextWord[j], incomingEdgeCount.get(nextWord[j])! + 1);
        }
        break; // Only the first difference matters
      }
    }
  }

  // Kahn's algorithm: start with characters that have no prerequisites
  const processingQueue: string[] = [];
  for (const [char, edgeCount] of incomingEdgeCount) {
    if (edgeCount === 0) processingQueue.push(char);
  }

  let characterOrder: string = '';
  while (processingQueue.length > 0) {
    const currentChar = processingQueue.shift()!;
    characterOrder += currentChar;

    // Reduce in-degree for all characters that follow currentChar
    for (const successor of precedenceGraph.get(currentChar)!) {
      incomingEdgeCount.set(successor, incomingEdgeCount.get(successor)! - 1);
      if (incomingEdgeCount.get(successor) === 0) {
        processingQueue.push(successor);
      }
    }
  }

  // If not all characters are in the result, a cycle exists (invalid ordering)
  return characterOrder.length === incomingEdgeCount.size ? characterOrder : '';
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
    concepts: ['topological-sort', 'graph', 'bfs', 'in-degree', 'string'],
  },
  {
    id: 'ts-ordered-map',
    title: 'Ordered Map',
    category: 'data-structures' as const,
    difficulty: 'advanced' as const,
    description:
      "Implement an ordered map maintaining insertion order with set, get, delete, and keys operations. This exercises understanding of JavaScript's built-in Map which preserves insertion order, a feature critical for LRU caches, ordered configurations, and deterministic iteration in real-world applications.",
    explanation: `Implement an ordered map that maintains insertion order with set, get, delete, and keys operations. This exercise builds understanding of how JavaScript's built-in Map works under the hood — it preserves insertion order, which is not true of plain objects in all cases.\n\nJavaScript's Map is implemented as a hash table with a linked list maintaining insertion order, giving O(1) average time for all operations while preserving iteration order. When a key is updated, its position is not changed. When a key is deleted and re-added, it moves to the end.\n\nThis behavior is critical for implementing LRU caches, ordered configurations, and deterministic serialization. Understanding insertion-order semantics helps you choose between Map and Object in JavaScript, and maps to similar structures like Python's dict (ordered since 3.7) and Java's LinkedHashMap. In interviews, this tests knowledge of language-specific data structure guarantees.`,
    instructions: [
      'Implement an ordered map data structure',
      'Process operations: set(key, value), get(key), delete(key), keys()',
      'Return results of get operations (value or -1 if not found)',
      'Return array of keys in insertion order for keys() operation',
      'Maintain insertion order across all operations',
    ],
    starterCode: `function orderedMapOps(operations: any[][]): (number | string | (string | number)[])[] {
  // YOUR CODE HERE
}`,
    solutionCode: `function orderedMapOps(operations: any[][]): (number | string | (string | number)[])[] {
  // Ordered map using JS Map (maintains insertion order): O(1) per operation
  // JS Map preserves key insertion order, making it ideal for this problem.
  const orderedMap = new Map<string | number, any>();
  const results: (number | string | (string | number)[])[] = [];

  for (const op of operations) {
    const [operationType, key, value] = op;

    if (operationType === 'set') {
      // Map.set preserves original order if key exists, appends if new
      orderedMap.set(key, value);
    } else if (operationType === 'get') {
      // Return the value if found, otherwise -1
      results.push(orderedMap.has(key) ? orderedMap.get(key) : -1);
    } else if (operationType === 'delete') {
      // Removing and re-adding a key moves it to the end
      orderedMap.delete(key);
    } else if (operationType === 'keys') {
      // Spread iterator to get keys in insertion order
      results.push([...orderedMap.keys()]);
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
    id: 'ts-sparse-matrix-multiply',
    title: 'Sparse Matrix Multiplication',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Multiply two sparse matrices efficiently by skipping zero-element computations. In real-world systems like recommendation engines and scientific computing, matrices are often 90%+ zeros. Pre-indexing non-zero entries and skipping zero rows dramatically reduces work compared to naive O(n^3) multiplication.',
    explanation: `Multiply two sparse matrices efficiently by skipping computations involving zero elements. In real-world applications like recommendation engines and scientific simulations, matrices are often 90% or more zeros, making naive O(n^3) multiplication wasteful.\n\nThe optimization pre-indexes non-zero entries in the second matrix by row. During multiplication, when an element in matrix A is zero, the entire inner loop is skipped. When it is non-zero, you only iterate over non-zero entries in the corresponding row of matrix B.\n\nFor truly sparse matrices, this reduces time from O(rows * shared * cols) to O(rows * nonZero * cols) where nonZero is much smaller than shared. The pre-indexing with Maps adds O(shared * cols) preprocessing but pays off during multiplication. Sparse matrix techniques are fundamental in machine learning (feature matrices), graph algorithms (adjacency matrices), and physics simulations (finite element methods).`,
    instructions: [
      'Multiply two matrices represented as 2D arrays',
      'Optimize for sparse matrices (many zeros)',
      'Only process non-zero elements',
      'Return the resulting matrix',
      'Handle edge cases like empty matrices',
    ],
    starterCode: `function sparseMultiply(matA: number[][], matB: number[][]): number[][] {
  // YOUR CODE HERE
}`,
    solutionCode: `function sparseMultiply(matA: number[][], matB: number[][]): number[][] {
  // Sparse matrix multiplication: O(rowsA * nonZero * colsB)
  // Only multiply non-zero entries, skipping costly zero multiplications.
  if (!matA.length || !matB.length || !matB[0].length) {
    return [];
  }

  const rowCountA = matA.length;
  const colCountB = matB[0].length;
  const sharedDim = matB.length; // columns of A = rows of B
  const result: number[][] = Array.from({ length: rowCountA }, () => Array(colCountB).fill(0));

  // Pre-process matB: store only non-zero values per row as Map<column, value>
  const sparseBRows: Map<number, number>[] = Array.from({ length: sharedDim }, () => new Map());
  for (let row = 0; row < sharedDim; row++) {
    for (let col = 0; col < colCountB; col++) {
      if (matB[row][col] !== 0) {
        sparseBRows[row].set(col, matB[row][col]);
      }
    }
  }

  // Multiply: skip zero entries in A, then only iterate non-zero entries in B
  for (let row = 0; row < rowCountA; row++) {
    for (let mid = 0; mid < sharedDim; mid++) {
      if (matA[row][mid] !== 0) {
        const valueA = matA[row][mid];
        // Only visit columns where B has non-zero values in this row
        for (const [col, valueB] of sparseBRows[mid]) {
          result[row][col] += valueA * valueB;
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
    id: 'ts-circular-deque',
    title: 'Design Circular Deque',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Design a circular double-ended queue with fixed capacity supporting front and rear insert, delete, and peek operations. This teaches bounded buffer management used in OS schedulers, browser history, and sliding window algorithms. Understanding deque internals builds intuition for more complex data structure design.',
    explanation: `Design a circular double-ended queue supporting insertions and deletions at both ends with a fixed capacity constraint. This data structure is a building block for sliding window algorithms, task schedulers, and browser history implementations.\n\nThe implementation uses an array with insert-at-front (unshift) and insert-at-back (push) operations, checking capacity before each insertion. Delete operations use shift (front) and pop (back), checking emptiness first. Peek operations return the front or rear element without removal.\n\nIn a production setting, you would use a circular buffer with head and tail pointers for true O(1) operations at both ends, avoiding the O(n) cost of array unshift/shift. This exercise focuses on the interface design and state management aspects. Understanding deque internals helps you implement sliding window maximums, work-stealing schedulers, and palindrome checkers efficiently.`,
    instructions: [
      'Implement a circular deque with given capacity',
      'Process operations: insertFront, insertLast, deleteFront, deleteLast, getFront, getRear',
      'Return results of getFront and getRear operations (-1 if empty)',
      'Return true/false for insert/delete operations based on success',
      'Handle capacity constraints',
    ],
    starterCode: `function circularDequeOps(capacity: number, operations: any[][]): (boolean | number)[] {
  // YOUR CODE HERE
}`,
    solutionCode: `function circularDequeOps(capacity: number, operations: any[][]): (boolean | number)[] {
  // Circular deque using array: O(1) amortized per operation
  // Supports insert/delete at both ends with a fixed capacity constraint.
  const deque: number[] = [];
  const results: (boolean | number)[] = [];

  for (const op of operations) {
    const [operationType, value] = op;

    if (operationType === 'insertFront') {
      // Insert at front only if capacity allows
      if (deque.length < capacity) {
        deque.unshift(value);
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (operationType === 'insertLast') {
      // Insert at back only if capacity allows
      if (deque.length < capacity) {
        deque.push(value);
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (operationType === 'deleteFront') {
      // Remove from front only if deque is non-empty
      if (deque.length > 0) {
        deque.shift();
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (operationType === 'deleteLast') {
      // Remove from back only if deque is non-empty
      if (deque.length > 0) {
        deque.pop();
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (operationType === 'getFront') {
      // Peek at front element, or -1 if empty
      results.push(deque.length > 0 ? deque[0] : -1);
    } else if (operationType === 'getRear') {
      // Peek at rear element, or -1 if empty
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
    id: 'ts-trie-word-count',
    title: 'Trie with Word and Prefix Count',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      'Build a trie (prefix tree) that counts both complete word insertions and prefix occurrences. Each node tracks how many words pass through it and how many end there, enabling efficient autocomplete and prefix frequency queries. Tries power search engines, spell-checkers, and IP routing tables.',
    explanation: `Build a trie (prefix tree) that tracks both complete word counts and prefix passage counts at each node. This enables efficient autocomplete queries and prefix frequency analysis in O(L) time per operation where L is the word length.\n\nEach trie node contains a map of children (one per character), a wordCount (how many times a complete word ends here), and a prefixCount (how many words pass through this node). During insertion, every node along the path gets its prefixCount incremented, and the final node gets its wordCount incremented.\n\nThis structure powers search engine autocomplete, spell-checking systems, IP routing tables (using binary tries), and T9 predictive text. The trie provides O(L) lookup regardless of how many words are stored, making it faster than hash-based approaches when prefix queries are needed. Understanding tries is essential for interviews at companies working on search, NLP, or networking.`,
    instructions: [
      'Build a trie from insert operations',
      'Track how many times each word is inserted',
      'Track how many words have each prefix',
      'Return counts for countWord and countPrefix operations',
      'Handle case-sensitive strings',
    ],
    starterCode: `function trieCountOps(operations: any[][]): number[] {
  // YOUR CODE HERE
}`,
    solutionCode: `function trieCountOps(operations: any[][]): number[] {
  // Trie with word and prefix counting: O(L) per operation where L = word length
  // Each node tracks how many words pass through it (prefix) and end at it (word).
  class TrieNode {
    children: Map<string, TrieNode>;
    wordCount: number;     // How many complete words end at this node
    prefixCount: number;   // How many words pass through this node

    constructor() {
      this.children = new Map();
      this.wordCount = 0;
      this.prefixCount = 0;
    }
  }

  const root = new TrieNode();
  const results: number[] = [];

  for (const op of operations) {
    const [operationType, word] = op;

    if (operationType === 'insert') {
      // Traverse the trie, creating nodes as needed
      let currentNode = root;
      for (const character of word) {
        if (!currentNode.children.has(character)) {
          currentNode.children.set(character, new TrieNode());
        }
        currentNode = currentNode.children.get(character)!;
        // Every node along the path gets its prefix count incremented
        currentNode.prefixCount++;
      }
      // Mark the end of a complete word
      currentNode.wordCount++;
    } else if (operationType === 'countWord') {
      // Walk the trie to find exact word match count
      let currentNode = root;
      for (const character of word) {
        if (!currentNode.children.has(character)) {
          results.push(0);
          break;
        }
        currentNode = currentNode.children.get(character)!;
      }
      if (currentNode !== root || word === '') {
        results.push(currentNode.wordCount);
      }
    } else if (operationType === 'countPrefix') {
      // Walk the trie to find how many words share this prefix
      let currentNode = root;
      for (const character of word) {
        if (!currentNode.children.has(character)) {
          results.push(0);
          break;
        }
        currentNode = currentNode.children.get(character)!;
      }
      if (currentNode !== root || word === '') {
        results.push(currentNode.prefixCount);
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
    id: 'ts-priority-queue-custom',
    title: 'Priority Queue with Custom Comparator',
    category: 'data-structures' as const,
    difficulty: 'intermediate' as const,
    description:
      "Implement a priority queue sorting items by priority number (lower = higher importance) with stable tie-breaking by insertion order. Priority queues underpin Dijkstra's algorithm, task scheduling, and event-driven simulations. This exercise focuses on custom comparator design and stable sort guarantees.",
    explanation: `Sort items by a custom priority number (lower value = higher priority) with stable tie-breaking by insertion order. This exercise focuses on comparator design and stability guarantees rather than heap implementation.\n\nThe approach augments each item with its insertion index, then sorts by priority first and insertion order second. The stable sort ensures that items with equal priority maintain their original relative order, which is essential for fairness in scheduling systems.\n\nTime complexity is O(n log n) for the sort. In production, a binary heap would provide O(log n) per insertion and extraction, but this exercise emphasizes the comparator logic. Priority queues are fundamental to Dijkstra's shortest path algorithm, A* search, OS process scheduling, event-driven simulations, and hospital triage systems. Getting the comparator right — especially tie-breaking — is where most bugs hide in real implementations.`,
    instructions: [
      'Insert all [value, priority] pairs into a priority queue',
      'Extract all elements in priority order',
      'Lower priority number means higher priority',
      'Return array of values in priority order',
      'Handle ties in priority by maintaining insertion order',
    ],
    starterCode: `function priorityQueueSort(items: [string, number][]): string[] {
  // YOUR CODE HERE
}`,
    solutionCode: `function priorityQueueSort(items: [string, number][]): string[] {
  // Stable priority sort: O(n log n) time
  // Lower priority number = higher importance. Ties broken by insertion order.
  const indexedItems = items.map((item, insertionOrder) => ({
    value: item[0],
    priority: item[1],
    insertionOrder
  }));

  // Sort ascending by priority; on tie, preserve original insertion order
  indexedItems.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.insertionOrder - b.insertionOrder;
  });

  // Extract just the values in sorted priority order
  return indexedItems.map(item => item.value);
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
    id: 'ts-integer-partitions',
    title: 'Integer Partitions',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count the number of ways to partition an integer n into sums of positive integers where order does not matter. This classic number theory problem uses unbounded knapsack DP where each candidate part can be reused. Integer partitions appear in combinatorics, symmetric functions, and representation theory.',
    explanation: `Count the number of ways to partition an integer n into sums of positive integers where order does not matter. For example, 4 can be written as 4, 3+1, 2+2, 2+1+1, or 1+1+1+1, giving 5 partitions.\n\nThe DP table dp[sum][maxPart] represents the number of ways to partition sum using parts no larger than maxPart. At each cell, you either exclude maxPart (inheriting from dp[sum][maxPart-1]) or include it (adding dp[sum-maxPart][maxPart], allowing reuse).\n\nThis is structurally identical to the unbounded knapsack problem. Time and space are both O(n^2). Integer partitions are fundamental objects in number theory and combinatorics, appearing in symmetric function theory, representation theory of symmetric groups, and the study of Young diagrams. In practical computing, similar DP patterns arise in coin change problems and resource allocation with reusable units.`,
    instructions: [
      'Count distinct ways to partition n into positive integers',
      'Order does not matter: 3+1 and 1+3 are the same partition',
      'Each integer must be at least 1',
      'Use dynamic programming or recursion with memoization',
      'Handle edge cases like n=0 and n=1',
    ],
    starterCode: `function countPartitions(n: number): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function countPartitions(n: number): number {
  // Dynamic programming for integer partitions: O(n^2) time, O(n^2) space
  // dp[targetSum][maxPart] = number of ways to partition targetSum using parts <= maxPart
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  // Base case: there is exactly one way to partition 0 (the empty partition)
  for (let maxPart = 0; maxPart <= n; maxPart++) {
    dp[0][maxPart] = 1;
  }

  for (let targetSum = 1; targetSum <= n; targetSum++) {
    for (let maxPart = 1; maxPart <= n; maxPart++) {
      // Choice 1: do not include maxPart in the partition
      dp[targetSum][maxPart] = dp[targetSum][maxPart - 1];

      // Choice 2: include maxPart (can reuse it, so subtract but keep same maxPart)
      if (targetSum >= maxPart) {
        dp[targetSum][maxPart] += dp[targetSum - maxPart][maxPart];
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
    id: 'ts-stirling-second',
    title: 'Stirling Numbers of the Second Kind',
    category: 'combinatorics' as const,
    difficulty: 'advanced' as const,
    description:
      'Compute the Stirling number S(n,k) counting ways to partition n distinct elements into exactly k non-empty subsets. The recurrence S(n,k) = k*S(n-1,k) + S(n-1,k-1) captures whether a new element joins an existing subset or forms a new one. These numbers appear in combinatorics, probability, and polynomial algebra.',
    explanation: `Compute S(n,k), the number of ways to partition n distinct elements into exactly k non-empty subsets. These are the Stirling numbers of the second kind, a fundamental sequence in combinatorics with deep connections to polynomial algebra and probability theory.\n\nThe recurrence S(n,k) = k*S(n-1,k) + S(n-1,k-1) captures two cases for the nth element: it either joins one of the existing k subsets (k choices, giving k*S(n-1,k)), or it forms a new singleton subset (giving S(n-1,k-1)). Base cases are S(0,0)=1 and S(n,0)=S(0,k)=0 for positive n,k.\n\nThe DP table fills in O(n*k) time and space. Stirling numbers appear in converting between different polynomial bases (falling factorials and ordinary powers), in the moments of the Poisson distribution, and in counting surjective functions. They also arise in database theory when analyzing the number of ways to assign records to buckets.`,
    instructions: [
      'Calculate S(n,k) using the recurrence relation',
      'S(n,k) = k*S(n-1,k) + S(n-1,k-1)',
      'Base cases: S(0,0)=1, S(n,0)=0 for n>0, S(0,k)=0 for k>0',
      'Use dynamic programming or memoization',
      'Return the count as an integer',
    ],
    starterCode: `function stirlingSecond(n: number, k: number): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function stirlingSecond(n: number, k: number): number {
  // Stirling numbers via DP recurrence: O(n*k) time, O(n*k) space
  // S(n,k) counts ways to partition n elements into exactly k non-empty subsets.
  if (n === 0 && k === 0) return 1;  // Empty set has one trivial partition
  if (n === 0 || k === 0) return 0;  // Cannot partition non-empty set into 0 subsets
  if (k > n) return 0;               // Cannot have more subsets than elements

  // dp[elementCount][subsetCount] = number of valid partitions
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
  dp[0][0] = 1;

  for (let elementCount = 1; elementCount <= n; elementCount++) {
    for (let subsetCount = 1; subsetCount <= Math.min(elementCount, k); subsetCount++) {
      // Two choices for the new element:
      // 1) Add it to one of the existing subsetCount subsets
      // 2) Place it alone in a new subset (requires one fewer subset from previous elements)
      dp[elementCount][subsetCount] = subsetCount * dp[elementCount - 1][subsetCount]
        + dp[elementCount - 1][subsetCount - 1];
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
    id: 'ts-bell-number',
    title: 'Bell Numbers',
    category: 'combinatorics' as const,
    difficulty: 'advanced' as const,
    description:
      'Compute the Bell number B(n) counting all possible ways to partition a set of n elements into non-empty subsets. The Bell triangle method builds on previous rows to compute each value efficiently. Bell numbers arise in set theory, database query optimization, and classification problems.',
    explanation: `Compute the Bell number B(n), which counts all possible ways to partition a set of n elements into non-empty subsets — the sum of all Stirling numbers S(n,k) for k from 0 to n. B(3)=5 because {a,b,c} has five partitions.\n\nThe Bell triangle method builds values row by row. Each row starts with the last element of the previous row, and subsequent elements are computed by adding the element to the left and the element directly above-left. The first element of row n is B(n).\n\nThis runs in O(n^2) time and space. Bell numbers grow very rapidly — B(10) is already 115,975. They appear in set partition enumeration, combinatorial optimization, database query plan counting, and classification problems where you need to know how many ways to group items. The Bell triangle is also related to the Peirce triangle and has connections to exponential generating functions in analytic combinatorics.`,
    instructions: [
      'Calculate B(n) = sum of S(n,k) for k=0 to n',
      'Use Stirling numbers of the second kind',
      'Can also use Bell triangle method',
      'B(0)=1, B(1)=1, B(2)=2, B(3)=5, B(4)=15',
      'Return the total count',
    ],
    starterCode: `function bellNumber(n: number): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function bellNumber(n: number): number {
  // Bell triangle method: O(n^2) time, O(n^2) space
  // B(n) counts total ways to partition a set of n elements into non-empty subsets.
  if (n === 0) return 1;

  // Build the Bell triangle row by row
  // Each row starts with the last element of the previous row
  const triangle: number[][] = [[1]];

  for (let rowIndex = 1; rowIndex <= n; rowIndex++) {
    const previousRow = triangle[rowIndex - 1];
    // First element of new row = last element of previous row
    triangle[rowIndex] = [previousRow[previousRow.length - 1]];
    for (let colIndex = 1; colIndex <= rowIndex; colIndex++) {
      // Each element = element to its left + element above-left
      triangle[rowIndex][colIndex] = triangle[rowIndex][colIndex - 1] + previousRow[colIndex - 1];
    }
  }

  // B(n) is the first element of row n
  return triangle[n][0];
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
    id: 'ts-multinomial-coeff',
    title: 'Multinomial Coefficient',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Compute the multinomial coefficient n!/(k1!*k2!*...km!) which counts ways to divide n items into groups of specified sizes. By decomposing into successive binomial coefficients and interleaving multiplication with division, you avoid factorial overflow. This generalizes combinations and appears in probability and statistical mechanics.',
    explanation: `Compute the multinomial coefficient n!/(k1!*k2!*...km!), which counts the number of ways to divide n items into groups of specified sizes. This generalizes the familiar binomial coefficient "n choose k" to multiple groups.\n\nRather than computing enormous factorials directly (which risks overflow), the algorithm decomposes the multinomial into a product of successive binomial coefficients. For each group, compute C(remaining, groupSize) using interleaved multiplication and division, then subtract the group size from the remaining count.\n\nThis incremental approach maintains numerical stability and runs in O(n) time with O(1) space. Multinomial coefficients appear in probability theory (multinomial distributions), statistical mechanics (counting microstates), and combinatorial optimization. They also arise in polynomial expansion — the multinomial theorem generalizes the binomial theorem to sums of multiple terms.`,
    instructions: [
      'Given n and array of group sizes, compute multinomial coefficient',
      'Formula: n! / (k1! * k2! * ... * km!)',
      'Groups must sum to n',
      'Avoid overflow by computing carefully',
      'Return the result as an integer',
    ],
    starterCode: `function multinomial(n: number, groups: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function multinomial(n: number, groups: number[]): number {
  // Multinomial coefficient via successive binomial coefficients: O(n) time
  // Formula: n! / (k1! * k2! * ... * km!), computed as product of C(remaining, ki).
  const groupSum = groups.reduce((acc, val) => acc + val, 0);
  if (groupSum !== n) return 0; // Groups must sum to n

  // Compute by multiplying successive binomial coefficients C(remaining, groupSize)
  // This avoids computing large factorials directly and reduces overflow risk.
  let coefficient = 1;
  let remainingElements = n;

  for (const groupSize of groups) {
    // Multiply by C(remainingElements, groupSize) using incremental multiply/divide
    for (let i = 0; i < groupSize; i++) {
      coefficient *= (remainingElements - i);
      coefficient /= (i + 1);
    }
    remainingElements -= groupSize;
  }

  return Math.round(coefficient);
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
    id: 'ts-restricted-perms',
    title: 'Restricted Permutations',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count permutations of n elements where certain element-position pairs are forbidden. This backtracking problem with constraint checking teaches pruning invalid branches early. Restricted permutations model real-world scheduling constraints, seating arrangements, and assignment problems where conflicts must be avoided.',
    explanation: `Count permutations of n elements where certain element-position pairs are forbidden. This is a constraint satisfaction problem solved via backtracking with early pruning of invalid placements.\n\nThe algorithm fills positions one by one, trying each unused element. Before placing an element, it checks whether that (element, position) pair is in the forbidden set. If forbidden, the branch is pruned immediately, avoiding exponential wasted work.\n\nWorst-case time is O(n!) but forbidden constraints often prune the tree dramatically. The forbidden set is stored as a HashSet with string keys for O(1) lookup. This problem models real-world scheduling constraints (no teacher in a certain time slot), seating arrangements (enemies cannot sit next to each other), and assignment problems. The derangement problem (no element at its own index) is a special case of restricted permutations, connecting this to classical combinatorics.`,
    instructions: [
      'Given n positions and forbidden pairs [element, position]',
      'Count permutations where element i is not at position j for each forbidden pair',
      'Use backtracking or inclusion-exclusion',
      'Elements are 0-indexed (0 to n-1)',
      'Return count of valid permutations',
    ],
    starterCode: `function countRestrictedPerms(n: number, forbidden: number[][]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function countRestrictedPerms(n: number, forbidden: number[][]): number {
  // Backtracking with constraint checking: O(n!) worst case
  // Build permutations position by position, skipping forbidden placements.
  const forbiddenPlacements = new Set(forbidden.map(([elem, pos]) => \`\${elem},\${pos}\`));

  let validPermCount = 0;
  const elementUsed: boolean[] = new Array(n).fill(false);

  function backtrack(position: number): void {
    // All positions filled: found a valid permutation
    if (position === n) {
      validPermCount++;
      return;
    }

    // Try placing each unused element at the current position
    for (let element = 0; element < n; element++) {
      if (!elementUsed[element] && !forbiddenPlacements.has(\`\${element},\${position}\`)) {
        elementUsed[element] = true;
        backtrack(position + 1);
        elementUsed[element] = false; // Undo choice for next iteration
      }
    }
  }

  backtrack(0);
  return validPermCount;
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
    id: 'ts-lattice-paths-obstacles',
    title: 'Lattice Paths with Obstacles',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count paths from top-left to bottom-right in a grid with obstacles, moving only right or down. This DP problem extends the classic lattice path counting by setting obstacle cells to zero paths. It models robot navigation, network routing with blocked nodes, and combinatorial path counting under constraints.',
    explanation: `Count the number of distinct paths from the top-left to bottom-right corner of a grid, moving only right or down, with some cells blocked by obstacles. This extends the classic lattice path counting problem with a practical constraint.\n\nThe DP table pathCount[r][c] stores the number of ways to reach cell (r,c). For obstacle cells, the count is 0 (no paths go through them). For other cells, the count equals the sum of paths from above and from the left. The first row and column are handled specially since they can only be reached from one direction.\n\nTime and space are both O(rows * cols). Without obstacles, the answer is the binomial coefficient C(m+n-2, m-1), but obstacles break the closed-form solution, making DP necessary. This pattern models robot navigation with blocked zones, network packet routing with failed nodes, and combinatorial path counting in constrained environments. It is a standard interview question testing 2D DP fundamentals.`,
    instructions: [
      'Grid is m x n where 0 is free and 1 is obstacle',
      'Start at (0,0) and reach (m-1, n-1)',
      'Can only move right or down',
      'Cannot pass through obstacles',
      'Use dynamic programming to count paths',
    ],
    starterCode: `function latticePaths(grid: number[][]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function latticePaths(grid: number[][]): number {
  // DP grid path counting with obstacles: O(rows * cols) time and space
  // Each cell accumulates the number of ways to reach it from the top or left.
  if (!grid.length || !grid[0].length) return 0;
  if (grid[0][0] === 1) return 0; // Start cell is blocked

  const rowCount = grid.length;
  const colCount = grid[0].length;
  // pathCount[r][c] = number of distinct paths from (0,0) to (r,c)
  const pathCount: number[][] = Array.from({ length: rowCount }, () => Array(colCount).fill(0));

  pathCount[0][0] = 1; // Starting cell has exactly one way to be reached

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (grid[row][col] === 1) {
        // Obstacle: no paths pass through this cell
        pathCount[row][col] = 0;
      } else if (row === 0 && col === 0) {
        // Origin already initialized
        pathCount[row][col] = 1;
      } else {
        // Sum paths arriving from above and from the left
        const pathsFromAbove = row > 0 ? pathCount[row - 1][col] : 0;
        const pathsFromLeft = col > 0 ? pathCount[row][col - 1] : 0;
        pathCount[row][col] = pathsFromAbove + pathsFromLeft;
      }
    }
  }

  return pathCount[rowCount - 1][colCount - 1];
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
    id: 'ts-subset-sum-count',
    title: 'Subset Sum Count',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count how many subsets of an array sum to exactly a target value using dynamic programming. This is the counting variant of the classic subset sum decision problem. Using a Map-based DP handles negative numbers and arbitrary ranges, a technique applicable to budget allocation and knapsack variants.',
    explanation: `Count how many subsets of an array sum to exactly a target value. This is the counting variant of the classic subset sum problem, a foundational NP-complete problem in theoretical computer science.\n\nThe algorithm uses a Map-based DP where keys are achievable sums and values are the number of subsets that produce each sum. For each new element, you create an updated map by adding the element's value to every existing sum and accumulating the counts.\n\nUsing a Map instead of a fixed array handles negative numbers and arbitrary value ranges gracefully. Time complexity is O(n * uniqueSums) and space is O(uniqueSums). This technique applies to budget allocation (how many ways to spend exactly X), cryptographic analysis (finding collisions), and statistical sampling. The Map-based approach is particularly practical in JavaScript/TypeScript where arrays with negative indices are not natural.`,
    instructions: [
      'Given an array of integers and a target sum',
      'Count how many subsets sum to exactly the target',
      'Empty subset has sum 0',
      'Use dynamic programming',
      'Handle negative numbers if present',
    ],
    starterCode: `function subsetSumCount(nums: number[], target: number): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function subsetSumCount(nums: number[], target: number): number {
  // DP with Map for subset sum counting: O(n * uniqueSums) time
  // Uses a Map to handle negative numbers and arbitrary sum ranges.
  // sumCounts maps each achievable sum to the number of subsets producing it.
  const sumCounts = new Map<number, number>();
  sumCounts.set(0, 1); // Base case: one subset (empty) sums to 0

  for (const currentNum of nums) {
    // Snapshot current sums before adding currentNum to avoid double-counting
    const updatedCounts = new Map(sumCounts);
    for (const [existingSum, subsetCount] of sumCounts) {
      const newSum = existingSum + currentNum;
      // Add the number of subsets that can now reach newSum
      updatedCounts.set(newSum, (updatedCounts.get(newSum) || 0) + subsetCount);
    }
    // Replace old counts with updated counts
    sumCounts.clear();
    for (const [key, val] of updatedCounts) {
      sumCounts.set(key, val);
    }
  }

  return sumCounts.get(target) || 0;
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
    id: 'ts-truth-table-gen',
    title: 'Truth Table Generator',
    category: 'combinatorics' as const,
    difficulty: 'intermediate' as const,
    description:
      'Generate all 2^n combinations of n boolean variables as a truth table using bit manipulation. Each row index maps to a binary number whose bits represent variable assignments. This foundational technique powers SAT solvers, digital circuit testing, and exhaustive boolean formula evaluation.',
    explanation: `Generate all 2^n combinations of n boolean variables arranged as a truth table. Each row represents one possible assignment of true/false to the variables, ordered like binary counting.\n\nThe algorithm treats each row index as a binary number and extracts its bits as boolean values. For row i, bit position j (counting from the most significant bit) determines whether variable j is true or false. The right-shift and bitwise-AND operations efficiently extract each bit.\n\nTime complexity is O(2^n * n) — you produce 2^n rows, each with n values. This bit-manipulation approach is cleaner than recursive generation and directly maps row indices to variable assignments. Truth table generation is fundamental to digital logic design, SAT solver preprocessing, boolean formula evaluation, and unit test generation for functions with boolean inputs. The technique also serves as the basis for brute-force enumeration of all subsets via bitmasks.`,
    instructions: [
      'Given n boolean variables',
      'Generate all 2^n combinations',
      'Each combination is an array of n booleans',
      'Return array of boolean arrays',
      'Order: first variable varies slowest (like binary counting)',
    ],
    starterCode: `function generateTruthTable(n: number): boolean[][] {
  // YOUR CODE HERE
}`,
    solutionCode: `function generateTruthTable(n: number): boolean[][] {
  // Bit manipulation approach: O(2^n * n) time
  // Treat each row index as a binary number; extract bits as boolean values.
  const truthTable: boolean[][] = [];
  const totalRows = Math.pow(2, n);

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const row: boolean[] = [];
    // Extract bits from most significant (leftmost variable) to least significant
    for (let bitPosition = n - 1; bitPosition >= 0; bitPosition--) {
      // Shift right and mask to get the bit at this position
      const bitValue = ((rowIndex >> bitPosition) & 1) === 1;
      row.push(bitValue);
    }
    truthTable.push(row);
  }

  return truthTable;
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
    id: 'ts-house-robber',
    title: 'House Robber',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the maximum amount you can rob from a row of houses without robbing two adjacent ones. This classic DP problem reduces to a simple recurrence: at each house, choose the better of skipping it or taking it plus the best from two houses back. It models any non-adjacent selection optimization.',
    explanation: `Find the maximum amount you can rob from a row of houses where no two adjacent houses can be robbed. This classic problem is the introduction to decision-based dynamic programming for most engineers.\n\nAt each house, you face a binary choice: rob it (gaining its value plus the best result from two houses back) or skip it (keeping the best result from the previous house). The recurrence is dp[i] = max(dp[i-1], dp[i-2] + nums[i]).\n\nSince each state only depends on the previous two values, you can optimize space from O(n) to O(1) by maintaining just two rolling variables. Time is O(n). This non-adjacent selection pattern appears in scheduling (no two consecutive tasks), network packet selection, and any optimization where chosen items must maintain minimum spacing. It is also the simplest example of the "include/exclude" DP paradigm that scales to knapsack and subset problems.`,
    instructions: [
      'Given array of house values',
      'Cannot rob adjacent houses',
      'Find maximum total amount',
      'Use dynamic programming',
      'Handle edge cases like empty array or single house',
    ],
    starterCode: `function houseRobber(nums: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function houseRobber(nums: number[]): number {
  // Dynamic programming: O(n) time, O(1) space
  // At each house, decide to rob it (skip previous) or skip it (keep previous max).
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let maxTwoHousesBack = 0;  // Best loot possible ending 2+ houses ago
  let maxOneHouseBack = 0;    // Best loot possible ending at previous house

  for (const houseLoot of nums) {
    // Either rob this house + best from 2 back, or skip this house
    const bestWithCurrent = Math.max(maxOneHouseBack, maxTwoHousesBack + houseLoot);
    maxTwoHousesBack = maxOneHouseBack;
    maxOneHouseBack = bestWithCurrent;
  }

  return maxOneHouseBack;
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
    id: 'ts-house-robber-circular',
    title: 'House Robber II (Circular)',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Maximize robbery from houses arranged in a circle where the first and last are adjacent. The key insight is splitting into two linear subproblems: one excluding the first house, one excluding the last. This circular-to-linear reduction technique applies to any DP problem with circular constraints.',
    explanation: `Maximize robbery from houses arranged in a circle, where the first and last houses are now adjacent. This adds a circular constraint to the standard house robber problem, requiring a reduction technique to handle it.\n\nThe insight is that in any valid solution, you cannot rob both the first AND last house. Therefore, the answer is the maximum of two linear subproblems: rob houses 0 through n-2 (exclude last), or rob houses 1 through n-1 (exclude first). Run the standard house robber algorithm on each subarray and take the maximum.\n\nThis circular-to-linear reduction runs in O(n) time and O(n) space (for array slicing, or O(1) with index bounds). The technique of breaking circular constraints by case-splitting on boundary elements applies broadly: circular arrangement problems in DP, circular buffer scheduling, and any optimization where wrap-around adjacency creates complications. It is a common interview follow-up to the basic house robber.`,
    instructions: [
      'Houses arranged in a circle',
      'First and last houses are adjacent',
      'Cannot rob both first and last house',
      'Use house robber logic twice: exclude first OR exclude last',
      'Return the maximum of both scenarios',
    ],
    starterCode: `function houseRobberCircular(nums: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function houseRobberCircular(nums: number[]): number {
  // Circular house robber: O(n) time, O(n) space (due to slicing)
  // Since first and last houses are adjacent, we cannot rob both.
  // Split into two linear subproblems and take the best result.
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  // Standard linear house robber (non-circular)
  function robLinear(houses: number[]): number {
    let maxTwoBack = 0;
    let maxOneBack = 0;
    for (const houseLoot of houses) {
      const bestWithCurrent = Math.max(maxOneBack, maxTwoBack + houseLoot);
      maxTwoBack = maxOneBack;
      maxOneBack = bestWithCurrent;
    }
    return maxOneBack;
  }

  // Case 1: include first house, exclude last (houses 0 through n-2)
  const maxExcludingLast = robLinear(nums.slice(0, -1));

  // Case 2: exclude first house, include last (houses 1 through n-1)
  const maxExcludingFirst = robLinear(nums.slice(1));

  return Math.max(maxExcludingLast, maxExcludingFirst);
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
    id: 'ts-decode-ways',
    title: 'Decode Ways',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Count the number of ways to decode a digit string into letters where A=1 through Z=26. At each position, you can decode one or two digits, creating a Fibonacci-like DP recurrence with validity constraints. This teaches handling branching decoding paths and is a common interview DP problem.',
    explanation: `Count the number of ways to decode a string of digits into letters where A=1, B=2, ..., Z=26. At each position, you can decode one digit or two digits (if the two-digit value is between 10 and 26).\n\nThe DP array dp[i] stores the number of ways to decode the first i characters. At each position, add dp[i-1] if the single digit is valid (1-9), and add dp[i-2] if the two-digit number is valid (10-26). This creates a Fibonacci-like recurrence with validity constraints.\n\nTime is O(n) and space is O(n), reducible to O(1) with rolling variables. The tricky cases involve zeros: '0' alone is invalid, '30' is invalid (30 > 26), but '10' and '20' are valid two-digit decodings. This branching decode problem teaches careful case analysis in DP and mirrors real-world encoding systems like UTF-8 where variable-length byte sequences must be parsed unambiguously.`,
    instructions: [
      'Given a string of digits',
      'Decode where 1=A, 2=B, ..., 26=Z',
      'Count total number of different decodings',
      'Invalid codes (like "0" or "27") cannot be decoded',
      'Use dynamic programming',
    ],
    starterCode: `function numDecodings(s: string): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function numDecodings(s: string): number {
  // DP for counting decode combinations: O(n) time, O(n) space
  // At each position, try decoding as a single digit (1-9) or two digits (10-26).
  if (s.length === 0 || s[0] === '0') return 0;

  const strLength = s.length;
  // decodingWays[i] = number of ways to decode the first i characters
  const decodingWays: number[] = new Array(strLength + 1).fill(0);
  decodingWays[0] = 1; // Empty string: one way (base case for DP)
  decodingWays[1] = s[0] !== '0' ? 1 : 0;

  for (let i = 2; i <= strLength; i++) {
    const singleDigit = parseInt(s[i - 1]);
    const twoDigitValue = parseInt(s.substring(i - 2, i));

    // Option 1: decode current character as a single letter (1-9)
    if (singleDigit >= 1 && singleDigit <= 9) {
      decodingWays[i] += decodingWays[i - 1];
    }

    // Option 2: decode current + previous as a two-digit letter (10-26)
    if (twoDigitValue >= 10 && twoDigitValue <= 26) {
      decodingWays[i] += decodingWays[i - 2];
    }
  }

  return decodingWays[strLength];
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
    id: 'ts-longest-palindrome-subseq',
    title: 'Longest Palindromic Subsequence',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the length of the longest palindromic subsequence in a string using interval DP. The 2D table dp[i][j] tracks the longest palindrome in substring s[i..j], extending by 2 when endpoints match. This is a foundational problem for learning interval-based dynamic programming on strings.',
    explanation: `Find the length of the longest palindromic subsequence (not substring — characters need not be contiguous) in a string. This is a fundamental interval DP problem on strings.\n\nThe 2D table dp[i][j] stores the longest palindromic subsequence in the substring s[i..j]. If the endpoints match (s[i] == s[j]), they extend the inner palindrome by 2: dp[i][j] = dp[i+1][j-1] + 2. If they do not match, take the better of excluding either end: dp[i][j] = max(dp[i+1][j], dp[i][j-1]).\n\nTime and space are both O(n^2). Building the table requires processing increasing substring lengths, starting from single characters (length 1, each contributing 1). This interval DP pattern applies to many string problems including optimal parenthesization, matrix chain multiplication, and DNA sequence analysis. An equivalent formulation is computing the LCS of the string with its reverse.`,
    instructions: [
      'Given a string, find longest palindromic subsequence',
      'Subsequence: can skip characters but maintain order',
      'Use dynamic programming',
      'Compare with reverse of string',
      'Return the length',
    ],
    starterCode: `function longestPalindromeSubseq(s: string): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function longestPalindromeSubseq(s: string): number {
  // 2D DP for longest palindromic subsequence: O(n^2) time and space
  // dp[start][end] = length of longest palindromic subsequence in s[start..end]
  const strLength = s.length;
  const dp: number[][] = Array.from({ length: strLength }, () => Array(strLength).fill(0));

  // Base case: every single character is a palindrome of length 1
  for (let i = 0; i < strLength; i++) {
    dp[i][i] = 1;
  }

  // Fill table for increasing substring lengths
  for (let substrLen = 2; substrLen <= strLength; substrLen++) {
    for (let start = 0; start <= strLength - substrLen; start++) {
      const end = start + substrLen - 1;
      if (s[start] === s[end]) {
        // Characters match: they extend the inner palindrome by 2
        dp[start][end] = dp[start + 1][end - 1] + 2;
      } else {
        // Characters don't match: take the best by excluding one end
        dp[start][end] = Math.max(dp[start + 1][end], dp[start][end - 1]);
      }
    }
  }

  return dp[0][strLength - 1];
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
    id: 'ts-min-cost-stairs',
    title: 'Minimum Cost Climbing Stairs',
    category: 'memoization' as const,
    difficulty: 'beginner' as const,
    description:
      'Find the minimum cost to climb stairs where each step has a cost and you can take 1 or 2 steps at a time. This beginner DP problem demonstrates space-optimized bottom-up computation using only two variables instead of a full array, a technique that extends to Fibonacci-style recurrences.',
    explanation: `Find the minimum cost to reach the top of a staircase where each step has a cost and you can climb 1 or 2 steps at a time. This is perhaps the gentlest introduction to dynamic programming, building directly on the Fibonacci sequence.\n\nThe recurrence is: cost to reach step i equals the step's own cost plus the minimum of costs to reach the two preceding steps. Since you can start from step 0 or step 1, both are valid starting points. The top is one step beyond the last index.\n\nUsing just two variables instead of a full array reduces space to O(1) while maintaining O(n) time. This space optimization technique — replacing an array with rolling variables when only the last few values are needed — applies to any DP with bounded lookback. The problem directly models real-world cost optimization in sequential systems like assembly lines, network routing, and pipeline stage selection.`,
    instructions: [
      'Given array of costs for each step',
      'Can start from step 0 or step 1',
      'Can climb 1 or 2 steps at a time',
      'Find minimum cost to reach top (past last step)',
      'Use dynamic programming',
    ],
    starterCode: `function minCostClimbingStairs(cost: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function minCostClimbingStairs(cost: number[]): number {
  // Dynamic programming with space optimization: O(n) time, O(1) space
  // At each step, the minimum cost = step cost + min(cost from 1 back, cost from 2 back).
  const stepCount = cost.length;
  if (stepCount === 0) return 0;
  if (stepCount === 1) return cost[0];

  let costTwoStepsBack = cost[0]; // Min cost to reach step 0
  let costOneStepBack = cost[1];  // Min cost to reach step 1

  for (let step = 2; step < stepCount; step++) {
    // Cost to reach this step = this step's cost + cheaper of the two previous steps
    const costAtCurrentStep = cost[step] + Math.min(costOneStepBack, costTwoStepsBack);
    costTwoStepsBack = costOneStepBack;
    costOneStepBack = costAtCurrentStep;
  }

  // Can step over the top from either of the last two steps
  return Math.min(costOneStepBack, costTwoStepsBack);
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
    id: 'ts-partition-equal-subset',
    title: 'Partition Equal Subset Sum',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Determine if an array can be split into two subsets with equal sum, reducing to a 0/1 knapsack subset sum problem targeting half the total. Iterating backwards through the DP array ensures each element is used at most once. This is a gateway problem to knapsack variants and NP-complete theory.',
    explanation: `Determine if an array can be split into two subsets with equal sum. This reduces to asking whether any subset sums to exactly half the total, making it a 0/1 knapsack problem.\n\nFirst check if the total is even (odd totals make equal partition impossible). Then use a boolean DP array where isAchievable[s] indicates whether some subset sums to s. For each number, iterate the DP array backwards (from target down to the number's value) to ensure each element is used at most once.\n\nTime is O(n * target) and space is O(target) where target is totalSum/2. The backwards iteration is crucial — going forwards would allow the same element to contribute multiple times, turning it into an unbounded knapsack. This problem is a gateway to the NP-complete subset sum family and appears in load balancing (distributing work equally), portfolio partitioning, and compiler optimization (register allocation).`,
    instructions: [
      'Given an array of positive integers',
      'Check if it can be split into two subsets with equal sum',
      'Total sum must be even',
      'Use subset sum DP to find if sum/2 is achievable',
      'Return boolean',
    ],
    starterCode: `function canPartition(nums: number[]): boolean {
  // YOUR CODE HERE
}`,
    solutionCode: `function canPartition(nums: number[]): boolean {
  // 0/1 Knapsack subset sum: O(n * target) time, O(target) space
  // Reduces to: can we find a subset that sums to exactly totalSum / 2?
  const totalSum = nums.reduce((sum, num) => sum + num, 0);

  // If total is odd, equal partition is impossible
  if (totalSum % 2 !== 0) return false;

  const halfSum = totalSum / 2;
  // isAchievable[s] = true if some subset of processed elements sums to s
  const isAchievable: boolean[] = new Array(halfSum + 1).fill(false);
  isAchievable[0] = true; // Empty subset achieves sum 0

  for (const currentNum of nums) {
    // Iterate backwards to avoid using the same element twice (0/1 constraint)
    for (let sum = halfSum; sum >= currentNum; sum--) {
      isAchievable[sum] = isAchievable[sum] || isAchievable[sum - currentNum];
    }
  }

  return isAchievable[halfSum];
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
    id: 'ts-target-sum-ways',
    title: 'Target Sum',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Assign + or - signs to each array element and count the number of ways to reach a target sum. This problem teaches recursive DFS with memoization keyed on (index, runningSum). It models binary decision trees and connects to subset sum via the mathematical equivalence between sign assignment and subset partitioning.',
    explanation: `Assign a + or - sign to each element in an array and count the number of ways to achieve a target sum. Each element must be used exactly once with either sign, creating a binary decision tree.\n\nThe recursive approach with memoization explores both branches (add or subtract) at each index, caching results keyed by (index, runningSum) to avoid recomputing overlapping subproblems. The base case checks if the running sum equals the target after all elements are assigned.\n\nTime complexity is O(n * sumRange) where sumRange is the span of possible sums. A mathematical insight converts this to a subset sum problem: if P is the sum of elements assigned +, then P - (total - P) = target, so P = (total + target) / 2. This models any binary decision process with additive outcomes, appearing in game theory, cryptographic analysis, and combinatorial optimization. The memoization key design is an important skill for DP problems with multiple state dimensions.`,
    instructions: [
      'Given array of non-negative integers and a target',
      'Assign + or - sign to each element',
      'Count ways to reach target sum',
      'Use dynamic programming with memoization',
      'Handle positive and negative sums',
    ],
    starterCode: `function findTargetSumWays(nums: number[], target: number): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function findTargetSumWays(nums: number[], target: number): number {
  // Recursive DFS with memoization: O(n * sumRange) time
  // At each element, branch into +element or -element, caching (index, runningSum).
  const memo = new Map<string, number>();

  function countWays(elementIndex: number, runningSum: number): number {
    // Base case: all elements assigned, check if we hit the target
    if (elementIndex === nums.length) {
      return runningSum === target ? 1 : 0;
    }

    // Check cache to avoid redundant computation
    const cacheKey = \`\${elementIndex},\${runningSum}\`;
    if (memo.has(cacheKey)) {
      return memo.get(cacheKey)!;
    }

    // Branch: assign + or - to the current element
    const waysWithAdd = countWays(elementIndex + 1, runningSum + nums[elementIndex]);
    const waysWithSubtract = countWays(elementIndex + 1, runningSum - nums[elementIndex]);

    const totalWays = waysWithAdd + waysWithSubtract;
    memo.set(cacheKey, totalWays);
    return totalWays;
  }

  return countWays(0, 0);
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
    id: 'ts-min-path-sum-grid',
    title: 'Minimum Path Sum',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the minimum-cost path from top-left to bottom-right in a grid, moving only right or down. Each cell accumulates the minimum of its top and left predecessors, making this a textbook introduction to 2D dynamic programming. This pattern applies to cost optimization in grids, image seam carving, and route planning.',
    explanation: `Find the path from the top-left to bottom-right corner of a grid that minimizes the sum of cell values, moving only right or down. This is a textbook 2D dynamic programming problem.\n\nBuild a cost table where minCost[r][c] stores the minimum sum to reach cell (r,c). The first row can only be reached from the left, the first column only from above. For interior cells, take the minimum of the cell above and the cell to the left, then add the current cell's value.\n\nTime and space are both O(rows * cols). Space can be optimized to O(cols) by processing row by row, since each cell only depends on the current and previous rows. This pattern directly applies to image seam carving (finding minimum-energy seams), robot path planning with terrain costs, and network routing with weighted links. It is one of the most commonly assigned DP problems in university courses and interview prep.`,
    instructions: [
      'Implement a function that finds the minimum path sum in a grid',
      'You can only move right or down at each step',
      'Use dynamic programming or memoization to optimize',
      'Return the minimum sum value',
    ],
    starterCode: `function minPathSum(grid: number[][]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function minPathSum(grid: number[][]): number {
  // Bottom-up DP: O(m*n) time, O(m*n) space
  // Build a cost table where each cell stores the minimum sum to reach it
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0;

  const totalRows = grid.length;
  const totalCols = grid[0].length;

  // minCost[row][col] = minimum path sum to reach cell (row, col)
  const minCost: number[][] = Array.from({ length: totalRows }, () => Array(totalCols).fill(0));

  // Starting cell cost is just its own value
  minCost[0][0] = grid[0][0];

  // First row: can only arrive from the left
  for (let col = 1; col < totalCols; col++) {
    minCost[0][col] = minCost[0][col - 1] + grid[0][col];
  }

  // First column: can only arrive from above
  for (let row = 1; row < totalRows; row++) {
    minCost[row][0] = minCost[row - 1][0] + grid[row][0];
  }

  // Interior cells: choose the cheaper predecessor (above or left)
  for (let row = 1; row < totalRows; row++) {
    for (let col = 1; col < totalCols; col++) {
      const costFromAbove = minCost[row - 1][col];
      const costFromLeft = minCost[row][col - 1];
      minCost[row][col] = Math.min(costFromAbove, costFromLeft) + grid[row][col];
    }
  }

  return minCost[totalRows - 1][totalCols - 1];
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
    id: 'ts-palindrome-min-cuts',
    title: 'Palindrome Partitioning Min Cuts',
    category: 'memoization' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the minimum cuts to partition a string so every piece is a palindrome. This two-phase DP first precomputes a palindrome lookup table, then uses 1D DP for minimum cuts. It teaches how to decompose complex string problems into precomputation and optimization phases for O(n^2) overall complexity.',
    explanation: `Find the minimum number of cuts to partition a string so that every piece is a palindrome. This hard DP problem uses a two-phase approach that teaches how to decompose complex problems into precomputation and optimization.\n\nPhase 1 builds a 2D boolean table isPalindrome[i][j] for all substrings, using the recurrence that s[i..j] is a palindrome if s[i]==s[j] and s[i+1..j-1] is a palindrome. Phase 2 uses 1D DP where minCuts[i] is the minimum cuts for s[0..i], trying every possible last cut position where the suffix is a palindrome.\n\nBoth phases run in O(n^2) time, giving O(n^2) overall with O(n^2) space. The separation into precomputation and optimization is a powerful design pattern — many string DP problems benefit from precomputing substring properties. This problem appears in text processing (breaking text into meaningful chunks), DNA analysis (finding palindromic sequences), and compiler optimization (optimal code splitting).`,
    instructions: [
      'Implement a function that finds minimum cuts for palindrome partitioning',
      'Each partition must be a palindrome',
      'Use dynamic programming to optimize',
      'Return the minimum number of cuts required',
    ],
    starterCode: `function minCutPalindrome(s: string): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function minCutPalindrome(s: string): number {
  // Two-phase DP: O(n^2) time, O(n^2) space
  // Phase 1: Precompute palindrome lookup table
  // Phase 2: Find minimum cuts using 1D DP
  const strLen = s.length;
  if (strLen <= 1) return 0;

  // isPalindrome[start][end] = true if substring s[start..end] is a palindrome
  const isPalindrome: boolean[][] = Array.from({ length: strLen }, () => Array(strLen).fill(false));

  // Base case: every single character is a palindrome
  for (let idx = 0; idx < strLen; idx++) {
    isPalindrome[idx][idx] = true;
  }

  // Check two-character palindromes
  for (let idx = 0; idx < strLen - 1; idx++) {
    if (s[idx] === s[idx + 1]) {
      isPalindrome[idx][idx + 1] = true;
    }
  }

  // Check substrings of length 3 and above
  for (let substringLen = 3; substringLen <= strLen; substringLen++) {
    for (let start = 0; start <= strLen - substringLen; start++) {
      const end = start + substringLen - 1;
      // A substring is palindrome if outer chars match and inner part is palindrome
      if (s[start] === s[end] && isPalindrome[start + 1][end - 1]) {
        isPalindrome[start][end] = true;
      }
    }
  }

  // minCuts[i] = minimum cuts needed for s[0..i]
  const minCuts: number[] = Array(strLen).fill(0);

  for (let endIdx = 0; endIdx < strLen; endIdx++) {
    if (isPalindrome[0][endIdx]) {
      // Entire prefix s[0..endIdx] is palindrome, no cut needed
      minCuts[endIdx] = 0;
    } else {
      // Start with worst case: cut after every character
      minCuts[endIdx] = endIdx;
      for (let splitIdx = 0; splitIdx < endIdx; splitIdx++) {
        // If s[splitIdx+1..endIdx] is palindrome, try cutting after splitIdx
        if (isPalindrome[splitIdx + 1][endIdx]) {
          minCuts[endIdx] = Math.min(minCuts[endIdx], minCuts[splitIdx] + 1);
        }
      }
    }
  }

  return minCuts[strLen - 1];
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
    id: 'ts-egg-drop',
    title: 'Egg Drop Problem',
    category: 'memoization' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the minimum worst-case trials to identify the critical breaking floor given k eggs and n floors. This classic decision-theory DP problem balances information gain against resource expenditure: breaking an egg narrows the range below, surviving narrows above. It teaches minimax optimization via 2D dynamic programming.',
    explanation: `Find the minimum number of trials needed in the worst case to identify the critical breaking floor, given k eggs and n floors. This classic puzzle teaches minimax optimization through dynamic programming.\n\nFor each state (eggs, floors), try dropping from every floor. If the egg breaks, search below with one fewer egg. If it survives, search above with the same eggs. The worst case at each drop is the maximum of these two outcomes, and you want the drop floor that minimizes this worst case.\n\nThe basic DP runs in O(eggs * floors^2) time with O(eggs * floors) space, though binary search optimization can reduce it to O(eggs * floors * log(floors)). The egg drop problem is a beautiful example of decision under uncertainty — you are optimizing against an adversary who picks the worst-case breaking floor. This minimax framework appears in game theory, binary search variants, quality testing protocols, and any scenario requiring optimal information-gathering strategies.`,
    instructions: [
      'Implement a function that solves the egg drop problem',
      'Return minimum number of trials in worst case',
      'Use dynamic programming with memoization',
      'If egg breaks at floor x, test lower floors; if not, test higher floors',
    ],
    starterCode: `function eggDrop(eggs: number, floors: number): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function eggDrop(eggs: number, floors: number): number {
  // Bottom-up DP: O(eggs * floors^2) time, O(eggs * floors) space
  // For each (eggs, floors) state, find the optimal floor to drop from
  // minTrials[eggCount][floorCount] = minimum trials in worst case
  const minTrials: number[][] = Array.from({ length: eggs + 1 }, () => Array(floors + 1).fill(0));

  // Base case: with 1 egg, must search linearly from floor 1 upward
  for (let floorCount = 0; floorCount <= floors; floorCount++) {
    minTrials[1][floorCount] = floorCount;
  }

  // Base case: 0 floors needs 0 trials, 1 floor always needs 1 trial
  for (let eggCount = 0; eggCount <= eggs; eggCount++) {
    minTrials[eggCount][0] = 0;
    minTrials[eggCount][1] = 1;
  }

  // Fill table for 2+ eggs and 2+ floors
  for (let eggCount = 2; eggCount <= eggs; eggCount++) {
    for (let floorCount = 2; floorCount <= floors; floorCount++) {
      minTrials[eggCount][floorCount] = Infinity;

      // Try dropping from each candidate floor
      for (let dropFloor = 1; dropFloor <= floorCount; dropFloor++) {
        // Egg breaks: search below with one fewer egg
        const ifBreaks = minTrials[eggCount - 1][dropFloor - 1];
        // Egg survives: search above with same eggs
        const ifSurvives = minTrials[eggCount][floorCount - dropFloor];
        // Worst case for this drop + 1 for the current trial
        const worstCaseTrials = 1 + Math.max(ifBreaks, ifSurvives);
        minTrials[eggCount][floorCount] = Math.min(minTrials[eggCount][floorCount], worstCaseTrials);
      }
    }
  }

  return minTrials[eggs][floors];
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
    id: 'ts-burst-balloons',
    title: 'Burst Balloons',
    category: 'memoization' as const,
    difficulty: 'advanced' as const,
    description:
      'Burst balloons to maximize coins where bursting balloon i yields nums[left]*nums[i]*nums[right]. The critical insight is thinking about which balloon to burst LAST in each interval rather than first, converting a complex dependency problem into clean interval DP. This is a hallmark advanced DP interview question.',
    explanation: `Burst balloons to maximize coins, where bursting balloon i yields nums[left] * nums[i] * nums[right] and adjacent balloons become neighbors. The critical difficulty is that bursting order changes the adjacency relationships.\n\nThe breakthrough insight is to think about which balloon to burst LAST in each interval rather than first. If balloon k is the last one burst in interval (i,j), then balloons i and j are its neighbors at burst time, and the left and right subproblems are independent. This converts a complex dependency problem into clean interval DP.\n\nPad the array with virtual balloons of value 1 at both ends. Then dp[i][j] = max over k of (dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j]). Time is O(n^3) and space is O(n^2). This "think about the last operation" technique is a hallmark of interval DP and applies to matrix chain multiplication, optimal BST construction, and any problem where operation order creates dependencies.`,
    instructions: [
      'Implement a function to maximize coins from bursting balloons',
      'When bursting balloon i, coins = nums[left] * nums[i] * nums[right]',
      'Add virtual balloons with value 1 at both ends',
      'Use interval DP or memoization',
    ],
    starterCode: `function maxCoinsBurst(nums: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxCoinsBurst(nums: number[]): number {
  // Interval DP: O(n^3) time, O(n^2) space
  // Key insight: think about which balloon to burst LAST in each interval
  if (!nums || nums.length === 0) return 0;

  // Pad with virtual balloons of value 1 at both ends
  const balloonValues = [1, ...nums, 1];
  const totalLen = balloonValues.length;

  // maxCoins[left][right] = max coins from bursting all balloons between left and right (exclusive)
  const maxCoins: number[][] = Array.from({ length: totalLen }, () => Array(totalLen).fill(0));

  // Expand interval size from 2 (smallest with a balloon inside) up to full range
  for (let intervalSize = 2; intervalSize < totalLen; intervalSize++) {
    for (let leftBound = 0; leftBound < totalLen - intervalSize; leftBound++) {
      const rightBound = leftBound + intervalSize;

      // Try making each balloon the LAST one burst in this interval
      for (let lastBurst = leftBound + 1; lastBurst < rightBound; lastBurst++) {
        // Coins from bursting lastBurst when it is the only one left in the interval
        const burstCoins = balloonValues[leftBound] * balloonValues[lastBurst] * balloonValues[rightBound];
        // Total = coins from left subproblem + coins from right subproblem + burst coins
        const totalCoins = burstCoins + maxCoins[leftBound][lastBurst] + maxCoins[lastBurst][rightBound];
        maxCoins[leftBound][rightBound] = Math.max(maxCoins[leftBound][rightBound], totalCoins);
      }
    }
  }

  return maxCoins[0][totalLen - 1];
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
    id: 'ts-matrix-chain-mult',
    title: 'Matrix Chain Multiplication',
    category: 'memoization' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the optimal parenthesization of a matrix chain to minimize total scalar multiplications. This textbook interval DP problem tries every possible split point within each subchain. Matrix chain ordering is foundational in compiler optimization, database query planning, and any problem requiring optimal binary tree construction.',
    explanation: `Find the optimal way to parenthesize a chain of matrix multiplications to minimize the total number of scalar multiplications. The order of multiplication does not affect the result but dramatically affects the cost.\n\nThe interval DP tries every possible split point within each subchain. For matrices i through j, splitting at position k means computing the product of (matrices i..k) and (matrices k+1..j) separately, then multiplying the two results. The cost is the sum of both subproblems plus the cost of the final multiplication.\n\nTime is O(n^3) and space is O(n^2) where n is the number of matrices. This is one of the most famous DP problems in computer science, appearing in every algorithms textbook. The same interval DP structure applies to optimal binary search tree construction, compiler expression optimization, and database join ordering. In practice, compilers use this algorithm to optimize chain operations on large data structures.`,
    instructions: [
      'Implement a function to find minimum scalar multiplications',
      'dims array represents matrix dimensions: matrix i is dims[i-1] × dims[i]',
      'Use dynamic programming on intervals',
      'Return the minimum number of multiplications',
    ],
    starterCode: `function matrixChainOrder(dims: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function matrixChainOrder(dims: number[]): number {
  // Interval DP: O(n^3) time, O(n^2) space
  // Find optimal parenthesization to minimize scalar multiplications
  const matrixCount = dims.length - 1;
  if (matrixCount <= 1) return 0;

  // minOps[i][j] = minimum scalar multiplications to compute product of matrices i through j
  const minOps: number[][] = Array.from({ length: matrixCount }, () => Array(matrixCount).fill(0));

  // Build solutions for increasing chain lengths
  for (let chainLen = 2; chainLen <= matrixCount; chainLen++) {
    for (let startMatrix = 0; startMatrix <= matrixCount - chainLen; startMatrix++) {
      const endMatrix = startMatrix + chainLen - 1;
      minOps[startMatrix][endMatrix] = Infinity;

      // Try every possible split point between startMatrix and endMatrix
      for (let splitAt = startMatrix; splitAt < endMatrix; splitAt++) {
        // Cost = left chain + right chain + cost to multiply the two resulting matrices
        // Resulting matrices have dimensions: dims[startMatrix] x dims[splitAt+1] and dims[splitAt+1] x dims[endMatrix+1]
        const splitCost = minOps[startMatrix][splitAt] + minOps[splitAt + 1][endMatrix] +
                     dims[startMatrix] * dims[splitAt + 1] * dims[endMatrix + 1];
        minOps[startMatrix][endMatrix] = Math.min(minOps[startMatrix][endMatrix], splitCost);
      }
    }
  }

  return minOps[0][matrixCount - 1];
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
    id: 'ts-longest-common-substr',
    title: 'Longest Common Substring',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the longest contiguous substring shared by two strings using 2D DP. Unlike subsequence problems, the match resets to zero on mismatch since characters must be consecutive. This pattern is used in DNA sequence alignment, plagiarism detection, and diff algorithms for file comparison.',
    explanation: `Find the longest contiguous substring shared by two strings. Unlike the longest common subsequence (which allows gaps), the substring must be a consecutive run of characters matching in both strings.\n\nThe 2D DP table matchLength[i][j] stores the length of the common substring ending at s1[i-1] and s2[j-1]. If these characters match, extend the diagonal: matchLength[i][j] = matchLength[i-1][j-1] + 1. On mismatch, reset to 0 since contiguity is broken. Track the global maximum across all cells.\n\nTime and space are O(m*n). The key difference from subsequence DP is the zero-reset on mismatch — this single change makes the problem fundamentally different. Longest common substring is used in plagiarism detection, DNA sequence alignment, file diff algorithms, and approximate string matching. Rolling hash techniques (Rabin-Karp) can solve it more efficiently for very long strings.`,
    instructions: [
      'Implement a function that finds the longest common substring length',
      'The substring must be contiguous in both strings',
      'Use dynamic programming',
      'Return the length of the longest common substring',
    ],
    starterCode: `function longestCommonSubstring(s1: string, s2: string): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function longestCommonSubstring(s1: string, s2: string): number {
  // Bottom-up DP: O(m*n) time, O(m*n) space
  // Track length of matching contiguous characters ending at each position pair
  if (!s1 || !s2) return 0;

  const len1 = s1.length;
  const len2 = s2.length;
  let longestFound = 0;

  // matchLength[i][j] = length of common substring ending at s1[i-1] and s2[j-1]
  // Using 1-indexed to simplify boundary checks (row 0 and col 0 are zero padding)
  const matchLength: number[][] = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        // Characters match: extend the common substring from the diagonal
        matchLength[i][j] = matchLength[i - 1][j - 1] + 1;
        longestFound = Math.max(longestFound, matchLength[i][j]);
      } else {
        // Characters differ: contiguous match is broken, reset to 0
        matchLength[i][j] = 0;
      }
    }
  }

  return longestFound;
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
    id: 'ts-interleaving-string',
    title: 'Interleaving String',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      "Check if s3 is formed by interleaving s1 and s2 while preserving each string's character order. The 2D DP table tracks whether s3[0..i+j-1] can be formed from s1[0..i-1] and s2[0..j-1]. This pattern models merging ordered streams and appears in compiler parsing and protocol interleaving verification.",
    explanation: `Check whether string s3 can be formed by interleaving s1 and s2 while preserving the character order within each source string. Characters from s1 and s2 can alternate freely, but their internal ordering must be maintained.\n\nThe 2D DP table canForm[i][j] indicates whether s3[0..i+j-1] can be formed using s1[0..i-1] and s2[0..j-1]. At each position, the next character in s3 must have come from either s1 or s2: canForm[i][j] is true if (canForm[i-1][j] and s1[i-1] matches) or (canForm[i][j-1] and s2[j-1] matches).\n\nTime and space are O(m*n) where m and n are the lengths of s1 and s2. A quick preliminary check verifies that lengths add up: len(s1) + len(s2) must equal len(s3). This problem models merging ordered streams (like merge sort verification), validating protocol message interleaving, and checking whether a sequence could have been produced by combining two ordered sources. Space can be optimized to O(min(m,n)) using a rolling array.`,
    instructions: [
      'Implement a function to check if s3 is an interleaving of s1 and s2',
      'Character order from s1 and s2 must be preserved',
      'Use dynamic programming',
      'Return true if s3 is valid interleaving, false otherwise',
    ],
    starterCode: `function isInterleave(s1: string, s2: string, s3: string): boolean {
  // YOUR CODE HERE
}`,
    solutionCode: `function isInterleave(s1: string, s2: string, s3: string): boolean {
  // 2D DP: O(m*n) time, O(m*n) space
  // Check whether s3 can be formed by interleaving characters from s1 and s2
  const len1 = s1.length;
  const len2 = s2.length;

  // Quick length check: interleaving must use all characters from both strings
  if (len1 + len2 !== s3.length) return false;

  // canForm[i][j] = true if s3[0..i+j-1] can be formed using s1[0..i-1] and s2[0..j-1]
  const canForm: boolean[][] = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(false));

  // Base case: empty strings interleave to form empty string
  canForm[0][0] = true;

  // First row: using only characters from s2
  for (let j = 1; j <= len2; j++) {
    canForm[0][j] = canForm[0][j - 1] && s2[j - 1] === s3[j - 1];
  }

  // First column: using only characters from s1
  for (let i = 1; i <= len1; i++) {
    canForm[i][0] = canForm[i - 1][0] && s1[i - 1] === s3[i - 1];
  }

  // Fill remaining cells: each position in s3 must come from either s1 or s2
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const targetIdx = i + j - 1;
      // Option 1: last char came from s1
      const usedS1 = canForm[i - 1][j] && s1[i - 1] === s3[targetIdx];
      // Option 2: last char came from s2
      const usedS2 = canForm[i][j - 1] && s2[j - 1] === s3[targetIdx];
      canForm[i][j] = usedS1 || usedS2;
    }
  }

  return canForm[len1][len2];
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
    id: 'ts-max-sum-nonadj',
    title: 'Maximum Sum Non-Adjacent',
    category: 'memoization' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the maximum sum of non-adjacent elements from an array, the generalized form of the house robber problem. The DP recurrence at each index chooses between including the current element plus best-from-two-back, or skipping it. This models resource selection with exclusion zones in scheduling and allocation.',
    explanation: `Find the maximum sum you can obtain from an array by selecting elements such that no two selected elements are adjacent. This is the generalized form of the house robber problem, applicable to any non-adjacent selection optimization.\n\nThe DP builds an array where bestSum[i] represents the maximum sum achievable from elements 0 through i. At each index, you choose the better of skipping the current element (inheriting bestSum[i-1]) or including it (adding nums[i] to bestSum[i-2]).\n\nTime is O(n) and space is O(n), optimizable to O(1) with rolling variables. This problem models resource selection with exclusion zones: choosing non-conflicting tasks from a sequence, selecting non-adjacent cells in a grid row for maximum value, or picking advertising slots with required gaps. It is structurally identical to the house robber but framed as a pure optimization problem, making it a versatile template for many interview variants.`,
    instructions: [
      'Implement a function to find maximum sum with no adjacent elements',
      'Cannot select two adjacent elements',
      'Use dynamic programming',
      'Return the maximum sum possible',
    ],
    starterCode: `function maxSumNonAdjacent(nums: number[]): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function maxSumNonAdjacent(nums: number[]): number {
  // DP (House Robber variant): O(n) time, O(n) space
  // At each index, decide whether to include or skip the current element
  if (!nums || nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const totalElements = nums.length;

  // bestSum[i] = maximum sum achievable using elements from index 0 to i
  const bestSum: number[] = Array(totalElements).fill(0);

  // Base cases
  bestSum[0] = Math.max(0, nums[0]);
  bestSum[1] = Math.max(bestSum[0], nums[1]);

  for (let idx = 2; idx < totalElements; idx++) {
    // Choice 1: skip current element, keep best sum up to previous
    const skipCurrent = bestSum[idx - 1];
    // Choice 2: include current element + best sum up to two positions back
    const includeCurrent = nums[idx] + bestSum[idx - 2];
    bestSum[idx] = Math.max(skipCurrent, includeCurrent);
  }

  return bestSum[totalElements - 1];
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
    id: 'ts-valid-palindrome-alnum',
    title: 'Valid Palindrome',
    category: 'utilities' as const,
    difficulty: 'beginner' as const,
    description:
      'Check if a string is a valid palindrome considering only alphanumeric characters and ignoring case. This beginner string problem teaches character filtering with regex, case normalization, and the two-pointer palindrome check. It is one of the most common easy interview questions for string manipulation fundamentals.',
    explanation: `Check whether a string is a palindrome after removing all non-alphanumeric characters and converting to lowercase. This is one of the most common easy-level interview problems testing fundamental string manipulation.\n\nThe approach first normalizes the string: convert to lowercase and strip everything except letters and digits using a regex. Then use two pointers from the start and end, moving inward and comparing characters. If any pair mismatches, the string is not a palindrome.\n\nTime is O(n) and space is O(n) for the cleaned string. An alternative O(1) space approach skips non-alphanumeric characters during the two-pointer scan without creating a new string. This problem tests familiarity with regex, string normalization, and the two-pointer technique. Despite its simplicity, it catches many candidates on edge cases: empty strings, strings with only special characters, and mixed-case comparisons.`,
    instructions: [
      'Implement a function to check if string is a valid palindrome',
      'Consider only alphanumeric characters',
      'Ignore case (treat uppercase and lowercase as same)',
      'Return true if palindrome, false otherwise',
    ],
    starterCode: `function isValidPalindrome(s: string): boolean {
  // YOUR CODE HERE
}`,
    solutionCode: `function isValidPalindrome(s: string): boolean {
  // Two-pointer approach: O(n) time, O(n) space for cleaned string
  // Strip non-alphanumeric chars, then check if the result reads the same forwards and backwards

  // Remove everything except letters and digits, normalize to lowercase
  const alphanumericOnly = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  let frontIdx = 0;
  let backIdx = alphanumericOnly.length - 1;

  // Walk inward from both ends, comparing characters
  while (frontIdx < backIdx) {
    if (alphanumericOnly[frontIdx] !== alphanumericOnly[backIdx]) {
      return false;
    }
    frontIdx++;
    backIdx--;
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
    id: 'ts-longest-no-repeat',
    title: 'Longest Substring Without Repeating Characters',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the longest substring without repeating characters using the sliding window technique. A hash map tracks the last-seen index of each character, enabling O(n) single-pass processing. This is one of the most frequently asked interview questions and the gateway problem for mastering the sliding window pattern.',
    explanation: `Find the length of the longest substring with all unique characters. This is the gateway problem for mastering the sliding window technique, one of the most versatile patterns in algorithm interviews.\n\nMaintain a window defined by start and end pointers. A hash map tracks the most recent index of each character. As you expand the window rightward, if the new character was already seen within the current window, jump the start pointer past its previous occurrence to eliminate the duplicate.\n\nTime is O(n) since each character is processed at most twice (once entering, once leaving the window). Space is O(min(n, charset size)). The sliding window approach is fundamentally different from brute force (checking all substrings in O(n^3)) because it maintains the invariant that the window always contains unique characters. This pattern extends to problems with at most k distinct characters, minimum window substring, and any problem requiring optimal contiguous subarray/substring with a constraint.`,
    instructions: [
      'Implement a function to find longest substring without repeats',
      'Use sliding window technique',
      'Track characters in current window',
      'Return the maximum length found',
    ],
    starterCode: `function lengthOfLongestSubstring(s: string): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function lengthOfLongestSubstring(s: string): number {
  // Sliding window: O(n) time, O(min(n, charset)) space
  // Expand window right; when a duplicate is found, shrink from left

  // Maps each character to its most recent index in the string
  const lastSeenAt = new Map<string, number>();
  let windowStart = 0;
  let longestLength = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const currentChar = s[windowEnd];

    // If this character was seen at or after windowStart, it is a duplicate in our window
    if (lastSeenAt.has(currentChar) && lastSeenAt.get(currentChar)! >= windowStart) {
      // Move window start past the previous occurrence to remove the duplicate
      windowStart = lastSeenAt.get(currentChar)! + 1;
    }

    // Record this character's latest position
    lastSeenAt.set(currentChar, windowEnd);

    // Update the longest window found so far
    const currentWindowSize = windowEnd - windowStart + 1;
    longestLength = Math.max(longestLength, currentWindowSize);
  }

  return longestLength;
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
    id: 'ts-min-window-substr',
    title: 'Minimum Window Substring',
    category: 'utilities' as const,
    difficulty: 'advanced' as const,
    description:
      'Find the smallest substring window in s containing all characters of t with required frequencies. This hard sliding window problem uses expand-right-then-shrink-left with frequency maps tracking satisfied character requirements. It is the canonical advanced sliding window question testing careful bookkeeping and optimization.',
    explanation: `Find the smallest window in string s that contains all characters from string t with at least their required frequencies. This is the hardest standard sliding window problem and a favorite in top-tier tech interviews.\n\nUse two frequency maps: one for target requirements and one for the current window. Expand the window rightward by adding characters. When all requirements are satisfied, shrink from the left to find the minimum valid window. Track a counter of satisfied unique characters to avoid repeatedly checking all frequencies.\n\nTime is O(|s| + |t|) and space is O(|s| + |t|). The expand-then-shrink strategy is the essence of the sliding window pattern. The satisfaction counter optimization is critical — without it, you would need O(alphabet) checks at each step. This problem models real-world scenarios like finding the shortest DNA sequence containing all required codons, log window analysis, and minimum-span text search in information retrieval systems.`,
    instructions: [
      'Implement a function to find minimum window containing all chars from t',
      'Use sliding window technique',
      'Window must contain all characters with at least their frequency in t',
      'Return the smallest such window, or empty string if none exists',
    ],
    starterCode: `function minWindowSubstring(s: string, t: string): string {
  // YOUR CODE HERE
}`,
    solutionCode: `function minWindowSubstring(s: string, t: string): string {
  // Sliding window: O(|s| + |t|) time, O(|s| + |t|) space
  // Expand right until all required chars are covered, then shrink left to minimize
  if (s.length === 0 || t.length === 0) return '';

  // Build frequency map of characters needed from target string
  const targetFrequency = new Map<string, number>();
  for (const char of t) {
    targetFrequency.set(char, (targetFrequency.get(char) || 0) + 1);
  }

  // Number of unique characters in t that must be fully satisfied
  let uniqueCharsRequired = targetFrequency.size;
  let uniqueCharsSatisfied = 0;
  const windowFrequency = new Map<string, number>();

  let windowStart = 0, windowEnd = 0;
  let smallestLength = Infinity;
  let smallestStart = 0;

  while (windowEnd < s.length) {
    // Expand: add the character at windowEnd to the window
    const addedChar = s[windowEnd];
    windowFrequency.set(addedChar, (windowFrequency.get(addedChar) || 0) + 1);

    // Check if this character's frequency now matches the target requirement
    if (targetFrequency.has(addedChar) && windowFrequency.get(addedChar) === targetFrequency.get(addedChar)) {
      uniqueCharsSatisfied++;
    }

    // Shrink: contract window from left while all requirements are met
    while (windowStart <= windowEnd && uniqueCharsSatisfied === uniqueCharsRequired) {
      const currentLength = windowEnd - windowStart + 1;
      if (currentLength < smallestLength) {
        smallestLength = currentLength;
        smallestStart = windowStart;
      }

      // Remove the leftmost character from the window
      const removedChar = s[windowStart];
      windowFrequency.set(removedChar, windowFrequency.get(removedChar)! - 1);

      // Check if removing this character breaks a requirement
      if (targetFrequency.has(removedChar) && windowFrequency.get(removedChar)! < targetFrequency.get(removedChar)!) {
        uniqueCharsSatisfied--;
      }

      windowStart++;
    }

    windowEnd++;
  }

  return smallestLength === Infinity ? '' : s.substring(smallestStart, smallestStart + smallestLength);
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
    id: 'ts-group-anagrams',
    title: 'Group Anagrams',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Group strings that are anagrams of each other using sorted-character keys for hash map categorization. This frequent interview question tests your ability to design canonical keys for equivalence classes and group data efficiently. The sorted-key approach runs in O(n*k*log(k)) where k is the max string length.',
    explanation: `Group strings that are anagrams of each other — strings containing the same characters in any order. This is a frequent interview question testing hash map design and canonical key construction.\n\nThe algorithm creates a canonical key for each string by sorting its characters alphabetically. All anagrams of the same set of characters produce the same sorted key. A hash map groups strings by their key, and the final result collects all groups.\n\nTime is O(n * k * log(k)) where n is the number of strings and k is the maximum string length (due to sorting each string). An alternative O(n * k) approach uses character frequency counts as keys instead of sorting. This problem teaches the general technique of defining equivalence classes via canonical forms — a concept that appears in database normalization, compiler optimization (common subexpression elimination), and mathematical group theory. Choosing the right canonical key is the critical design decision.`,
    instructions: [
      'Implement a function to group anagrams together',
      'Anagrams are words with same characters in different order',
      'Sort each group alphabetically',
      'Sort groups by their first element',
    ],
    starterCode: `function groupAnagrams(strs: string[]): string[][] {
  // YOUR CODE HERE
}`,
    solutionCode: `function groupAnagrams(strs: string[]): string[][] {
  // Hash map with sorted-key approach: O(n * k*log(k)) time, O(n*k) space
  // where n = number of strings, k = max string length
  // Anagrams share the same sorted character sequence

  // Map from sorted character key to list of original strings
  const anagramGroups = new Map<string, string[]>();

  for (const word of strs) {
    // Sorting characters creates a canonical form: all anagrams produce the same key
    const sortedKey = word.split('').sort().join('');

    if (!anagramGroups.has(sortedKey)) {
      anagramGroups.set(sortedKey, []);
    }
    anagramGroups.get(sortedKey)!.push(word);
  }

  // Collect all groups into an array
  const groupedResult = Array.from(anagramGroups.values());

  // Sort each group alphabetically for consistent output
  groupedResult.forEach(group => group.sort());

  // Sort groups by their first element for deterministic ordering
  groupedResult.sort((a, b) => a[0].localeCompare(b[0]));

  return groupedResult;
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
    id: 'ts-string-compress',
    title: 'String Compression',
    category: 'utilities' as const,
    difficulty: 'beginner' as const,
    description:
      'Compress a string using run-length encoding where consecutive identical characters become char+count. Only return the compressed form if it is actually shorter than the original. This teaches basic RLE compression used in image formats, network protocols, and data storage optimization.',
    explanation: `Implement run-length encoding: replace consecutive identical characters with the character followed by its count. Return the compressed string only if it is shorter than the original, otherwise return the original.\n\nScan the string with a counter for consecutive identical characters. When the character changes (or the string ends), append the character and its count to the result. After building the compressed version, compare its length to the original.\n\nTime is O(n) and space is O(n) for the result string. The conditional return (only compress if shorter) is important because RLE actually lengthens strings with no repeats (e.g., "abc" becomes "a1b1c1"). RLE is used in bitmap image compression (BMP format), fax transmission, and as a preprocessing step in more sophisticated compression algorithms like JPEG. Understanding when compression helps versus hurts is a practical skill for systems engineers.`,
    instructions: [
      'Implement basic string compression using character counts',
      'Format: "aabcccccaaa" becomes "a2b1c5a3"',
      'Only return compressed if it is shorter than original',
      'Otherwise return original string',
    ],
    starterCode: `function compressString(s: string): string {
  // YOUR CODE HERE
}`,
    solutionCode: `function compressString(s: string): string {
  // Run-length encoding: O(n) time, O(n) space
  // Replace consecutive identical characters with char + count
  if (s.length <= 1) return s;

  let compressedResult = '';
  let consecutiveCount = 1;

  for (let charIdx = 1; charIdx <= s.length; charIdx++) {
    if (charIdx < s.length && s[charIdx] === s[charIdx - 1]) {
      // Same character as previous, extend the current run
      consecutiveCount++;
    } else {
      // Run ended: append character and its count
      compressedResult += s[charIdx - 1] + consecutiveCount;
      consecutiveCount = 1;
    }
  }

  // Only return compressed version if it is actually shorter
  return compressedResult.length < s.length ? compressedResult : s;
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
    id: 'ts-encode-decode-strings',
    title: 'Encode and Decode Strings',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Encode an array of strings into a single string and decode it back using length-prefixed format. By prepending each string with its byte length and a delimiter, you handle arbitrary content including the delimiter itself. This serialization pattern is used in network protocols, database storage, and API design.',
    explanation: `Design an encoding scheme that serializes an array of strings into a single string and can decode it back, handling arbitrary string contents including the delimiter character itself. This is a practical serialization problem.\n\nThe length-prefix format prepends each string with its byte length followed by a '#' delimiter. During decoding, you read the length number, skip the '#', and extract exactly that many characters. Because you know the exact length, the '#' character inside a string content causes no ambiguity.\n\nTime is O(n) for both encoding and decoding where n is the total character count. This is the same approach used in real network protocols like HTTP (Content-Length header), binary serialization formats (Protocol Buffers, MessagePack), and database wire protocols. The alternative approach of escaping special characters is more complex and slower. Understanding length-prefixed serialization is essential for building robust distributed systems and APIs.`,
    instructions: [
      'Implement encode and decode functions for array of strings',
      'Use length-prefixed format: length + delimiter + string',
      'Must handle strings containing any characters',
      'For testing: implement encodeDecode(strs) that encodes then decodes',
    ],
    starterCode: `function encodeDecode(strs: string[]): string[] {
  // YOUR CODE HERE
  // Implement encode and decode, then return decoded result
}`,
    solutionCode: `function encodeDecode(strs: string[]): string[] {
  // Length-prefix encoding: O(n) time, O(n) space
  // Format: "length#string" for each string, making it safe for any character content

  // Encode: prepend each string with its length and a '#' delimiter
  function encode(inputStrings: string[]): string {
    let encodedResult = '';
    for (const str of inputStrings) {
      // Length prefix ensures '#' inside the string does not cause ambiguity
      encodedResult += str.length + '#' + str;
    }
    return encodedResult;
  }

  // Decode: parse the length prefix, then extract exactly that many characters
  function decode(encodedStr: string): string[] {
    const decodedStrings: string[] = [];
    let readPosition = 0;

    while (readPosition < encodedStr.length) {
      // Scan forward to find the '#' delimiter separating length from content
      let delimiterPos = readPosition;
      while (encodedStr[delimiterPos] !== '#') {
        delimiterPos++;
      }

      // Parse the length value before the delimiter
      const stringLength = parseInt(encodedStr.substring(readPosition, delimiterPos));

      // Extract exactly stringLength characters after the delimiter
      const contentStart = delimiterPos + 1;
      decodedStrings.push(encodedStr.substring(contentStart, contentStart + stringLength));

      // Advance past the extracted string
      readPosition = contentStart + stringLength;
    }

    return decodedStrings;
  }

  const encodedPayload = encode(strs);
  return decode(encodedPayload);
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
    id: 'ts-roman-to-int',
    title: 'Roman to Integer',
    category: 'utilities' as const,
    difficulty: 'beginner' as const,
    description:
      'Convert a Roman numeral string to an integer, handling subtractive notation like IV=4 and IX=9. The algorithm scans left to right, subtracting when a smaller value precedes a larger one. This simple but tricky problem tests careful conditional logic and is one of the most popular easy interview questions.',
    explanation: `Convert a Roman numeral string like "MCMXCIV" to its integer value (1994). The algorithm must handle subtractive notation where a smaller value before a larger one means subtraction (IV=4, IX=9, XL=40, etc.).\n\nScan left to right comparing each character's value with the next. If the current value is less than the next, subtract it (subtractive case); otherwise add it. This simple rule correctly handles all subtractive cases because they always involve exactly two characters.\n\nTime is O(n) and space is O(1) since the Roman numeral value map is fixed-size. Despite its simplicity, this problem trips up many candidates who try to handle subtractive cases with special two-character matching instead of the elegant comparison rule. Roman numeral conversion appears in document formatting, date representation in traditional contexts, and as an exercise in mapping between numeral systems. It is one of the most popular easy-level interview questions.`,
    instructions: [
      'Implement a function to convert roman numerals to integer',
      'Handle I, V, X, L, C, D, M',
      'Handle subtractive cases: IV, IX, XL, XC, CD, CM',
      'Return the integer value',
    ],
    starterCode: `function romanToInt(s: string): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function romanToInt(s: string): number {
  // Left-to-right scan: O(n) time, O(1) space
  // If a smaller value appears before a larger one, subtract it (e.g., IV = 4)

  // Map each Roman numeral character to its integer value
  const romanValues: { [key: string]: number } = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  let totalValue = 0;

  for (let idx = 0; idx < s.length; idx++) {
    const currentValue = romanValues[s[idx]];
    const nextValue = romanValues[s[idx + 1]];

    // Subtractive notation: when a smaller numeral precedes a larger one (e.g., IV, IX, XL)
    if (nextValue && currentValue < nextValue) {
      totalValue -= currentValue;
    } else {
      totalValue += currentValue;
    }
  }

  return totalValue;
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
    id: 'ts-int-to-roman',
    title: 'Integer to Roman',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Convert an integer (1-3999) to its Roman numeral representation using a greedy value table including subtractive pairs. By processing values from largest to smallest (1000, 900, 500, 400...), you greedily build the Roman string. This teaches greedy decomposition and lookup-table-driven string construction.',
    explanation: `Convert an integer (1-3999) to its Roman numeral representation. The algorithm must produce correct subtractive notation (4 is "IV" not "IIII", 900 is "CM" not "DCCCC").\n\nThe greedy approach uses a lookup table of values in descending order that includes subtractive pairs: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1] with corresponding symbols. Repeatedly subtract the largest applicable value and append its symbol until the number reaches zero.\n\nTime and space are both O(1) because the input is bounded by 3999, so the output length is bounded. The inclusion of subtractive values (900, 400, 90, 40, 9, 4) in the lookup table is the key design choice that makes the greedy approach work without special-case logic. This table-driven greedy pattern appears in currency denomination problems, unit conversion, and any base-conversion algorithm where certain representations require special notation.`,
    instructions: [
      'Implement a function to convert integer to roman numerals',
      'Handle values 1-3999',
      'Use I, V, X, L, C, D, M',
      'Use subtractive notation where appropriate',
    ],
    starterCode: `function intToRoman(num: number): string {
  // YOUR CODE HERE
}`,
    solutionCode: `function intToRoman(num: number): string {
  // Greedy approach: O(1) time (bounded by 3999), O(1) space
  // Process from largest to smallest value, including subtractive pairs

  // Descending value table includes subtractive pairs (900, 400, 90, 40, 9, 4)
  const decimalValues = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romanSymbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let romanResult = '';

  for (let idx = 0; idx < decimalValues.length; idx++) {
    // Greedily use the largest possible symbol repeatedly
    while (num >= decimalValues[idx]) {
      romanResult += romanSymbols[idx];
      num -= decimalValues[idx];
    }
  }

  return romanResult;
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
    id: 'ts-kmp-pattern-match',
    title: 'KMP String Matching',
    category: 'utilities' as const,
    difficulty: 'advanced' as const,
    description:
      'Implement the KMP (Knuth-Morris-Pratt) algorithm to find all pattern occurrences in text in O(n+m) time. The failure function (LPS array) precomputes prefix-suffix overlaps so mismatches skip already-matched characters. KMP is fundamental to text editors, DNA analysis, and any high-performance string search system.',
    explanation: `Implement the Knuth-Morris-Pratt string matching algorithm to find all occurrences of a pattern in a text in O(n+m) time, where n is text length and m is pattern length. This is a significant improvement over the naive O(n*m) approach.\n\nKMP's power comes from the failure function (LPS array), which precomputes for each position in the pattern the length of the longest proper prefix that is also a suffix. When a mismatch occurs during search, instead of restarting from the beginning of the pattern, you jump to the position indicated by the LPS array, skipping characters that are already known to match.\n\nBuilding the LPS array takes O(m) time using a two-pointer technique, and the search phase takes O(n) time since the text pointer never moves backward. KMP is fundamental to text editors (find/replace), DNA sequence analysis, intrusion detection systems, and any application requiring high-performance exact string matching. Understanding the failure function also builds intuition for more advanced automata-based pattern matchers.`,
    instructions: [
      'Implement KMP algorithm for pattern matching',
      'Build failure function (LPS array) for pattern',
      'Search for all occurrences of pattern in text',
      'Return array of starting indices',
    ],
    starterCode: `function kmpSearch(text: string, pattern: string): number[] {
  // YOUR CODE HERE
}`,
    solutionCode: `function kmpSearch(text: string, pattern: string): number[] {
  // KMP algorithm: O(n + m) time, O(m) space where n = text length, m = pattern length
  // Uses a failure function (LPS array) to avoid re-scanning matched characters
  if (pattern.length === 0) return [];

  // Build LPS (Longest Proper Prefix which is also Suffix) array
  // lps[i] = length of the longest prefix of pattern[0..i] that is also a suffix
  function buildFailureFunction(pat: string): number[] {
    const lps: number[] = Array(pat.length).fill(0);
    let prefixLength = 0;
    let position = 1;

    while (position < pat.length) {
      if (pat[position] === pat[prefixLength]) {
        // Extend the current prefix-suffix match
        prefixLength++;
        lps[position] = prefixLength;
        position++;
      } else {
        if (prefixLength !== 0) {
          // Fall back to the previous longest prefix-suffix
          prefixLength = lps[prefixLength - 1];
        } else {
          // No prefix-suffix match at this position
          lps[position] = 0;
          position++;
        }
      }
    }

    return lps;
  }

  const failureFunction = buildFailureFunction(pattern);
  const matchIndices: number[] = [];
  let textIdx = 0;
  let patternIdx = 0;

  while (textIdx < text.length) {
    if (text[textIdx] === pattern[patternIdx]) {
      // Characters match, advance both pointers
      textIdx++;
      patternIdx++;
    }

    if (patternIdx === pattern.length) {
      // Full match found: record start index
      matchIndices.push(textIdx - patternIdx);
      // Use failure function to find next potential overlapping match
      patternIdx = failureFunction[patternIdx - 1];
    } else if (textIdx < text.length && text[textIdx] !== pattern[patternIdx]) {
      // Mismatch: use failure function to skip already-matched prefix
      if (patternIdx !== 0) {
        patternIdx = failureFunction[patternIdx - 1];
      } else {
        textIdx++;
      }
    }
  }

  return matchIndices;
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
    id: 'ts-longest-palindrome-substr',
    title: 'Longest Palindromic Substring',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Find the longest palindromic substring using the expand-around-center technique, checking both odd and even length palindromes at each position. This O(n^2) approach avoids DP table overhead and is intuitive: a palindrome grows outward from its center. A top interview question for string and two-pointer skills.',
    explanation: `Find the longest palindromic substring (contiguous) in a given string. The expand-around-center technique provides an intuitive O(n^2) solution that avoids the memory overhead of a DP table.\n\nFor each index in the string, try expanding outward from that index as the center of an odd-length palindrome, and from the gap between that index and the next as the center of an even-length palindrome. Expand as long as characters on both sides match.\n\nTime is O(n^2) in the worst case (each of 2n-1 centers can expand up to n/2 steps), and space is O(1). Manacher's algorithm achieves O(n) but is rarely expected in interviews. The expand-around-center approach is preferred because it is simple to implement correctly, easy to explain, and space-efficient. This problem tests palindrome understanding, two-pointer technique, and careful handling of odd versus even length cases. It appears in bioinformatics (palindromic DNA sequences are significant in molecular biology) and text analysis.`,
    instructions: [
      'Implement a function to find longest palindromic substring',
      'Use expand-around-center technique',
      'Check both odd and even length palindromes',
      'Return the longest palindrome found',
    ],
    starterCode: `function longestPalindrome(s: string): string {
  // YOUR CODE HERE
}`,
    solutionCode: `function longestPalindrome(s: string): string {
  // Expand-around-center approach: O(n^2) time, O(1) space
  // For each position, try expanding outward for both odd and even length palindromes
  if (s.length < 2) return s;

  function expandFromCenter(leftIdx: number, rightIdx: number): { length: number; startIdx: number } {
    // Expand outward while characters on both sides match
    while (leftIdx >= 0 && rightIdx < s.length && s[leftIdx] === s[rightIdx]) {
      leftIdx--;
      rightIdx++;
    }
    // After loop, leftIdx and rightIdx are one step beyond the palindrome bounds
    return { length: rightIdx - leftIdx - 1, startIdx: leftIdx + 1 };
  }

  let longestLength = 0;
  let longestStart = 0;

  for (let center = 0; center < s.length; center++) {
    // Check odd-length palindromes (single character center, e.g., "aba")
    const oddPalindrome = expandFromCenter(center, center);
    if (oddPalindrome.length > longestLength) {
      longestLength = oddPalindrome.length;
      longestStart = oddPalindrome.startIdx;
    }

    // Check even-length palindromes (gap between characters as center, e.g., "abba")
    const evenPalindrome = expandFromCenter(center, center + 1);
    if (evenPalindrome.length > longestLength) {
      longestLength = evenPalindrome.length;
      longestStart = evenPalindrome.startIdx;
    }
  }

  return s.substring(longestStart, longestStart + longestLength);
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
    id: 'ts-string-to-int',
    title: 'Implement atoi',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      "Implement C's atoi function: parse a string into a 32-bit signed integer handling whitespace, signs, and overflow clamping. This state-machine parsing problem tests sequential processing of edge cases in a defined order. Robust string-to-number conversion is essential in compilers, input validation, and data parsers.",
    explanation: `Implement C's atoi function: parse a string into a 32-bit signed integer, handling leading whitespace, an optional sign, digit extraction, and overflow clamping. This is a state machine problem that tests meticulous edge case handling.\n\nThe algorithm processes the string in strict order: skip whitespace, read optional sign, then read consecutive digits while checking for overflow before each multiplication-and-addition step. Non-digit characters after valid digits terminate parsing. If the result exceeds the 32-bit range, clamp to INT_MAX (2^31-1) or INT_MIN (-2^31).\n\nTime is O(n) and space is O(1). The overflow check is the trickiest part: before computing parsedNumber * 10 + digit, verify that parsedNumber is not already past the threshold where multiplication would overflow. This sequential parsing with state transitions models how real compilers and interpreters tokenize numeric literals. The problem is a favorite at companies building parsers, data pipelines, or input validation systems.`,
    instructions: [
      'Implement string to integer conversion',
      'Skip leading whitespace',
      'Handle optional + or - sign',
      'Clamp result to 32-bit signed integer range [-2^31, 2^31 - 1]',
    ],
    starterCode: `function myAtoi(s: string): number {
  // YOUR CODE HERE
}`,
    solutionCode: `function myAtoi(s: string): number {
  // State machine approach: O(n) time, O(1) space
  // Process: skip whitespace -> read sign -> read digits -> clamp to 32-bit range
  const INT_MAX = 2147483647;  // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  let charIdx = 0;
  const inputLength = s.length;

  // Phase 1: Skip leading whitespace
  while (charIdx < inputLength && s[charIdx] === ' ') {
    charIdx++;
  }

  // Nothing left after whitespace
  if (charIdx === inputLength) return 0;

  // Phase 2: Determine the sign (positive or negative)
  let signMultiplier = 1;
  if (s[charIdx] === '+' || s[charIdx] === '-') {
    signMultiplier = s[charIdx] === '-' ? -1 : 1;
    charIdx++;
  }

  // Phase 3: Read consecutive digits and build the number
  let parsedNumber = 0;
  while (charIdx < inputLength && s[charIdx] >= '0' && s[charIdx] <= '9') {
    const digitValue = s[charIdx].charCodeAt(0) - '0'.charCodeAt(0);

    // Check for overflow BEFORE multiplying by 10 and adding the digit
    // INT_MAX is 2147483647, so if parsedNumber > 214748364, multiplying by 10 will overflow
    // If parsedNumber == 214748364 and digit > 7, adding will overflow
    if (parsedNumber > Math.floor(INT_MAX / 10) ||
        (parsedNumber === Math.floor(INT_MAX / 10) && digitValue > 7)) {
      return signMultiplier === 1 ? INT_MAX : INT_MIN;
    }

    parsedNumber = parsedNumber * 10 + digitValue;
    charIdx++;
  }

  return signMultiplier * parsedNumber;
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
    id: 'ts-zigzag-string',
    title: 'Zigzag Conversion',
    category: 'utilities' as const,
    difficulty: 'intermediate' as const,
    description:
      'Write a string in a zigzag pattern across a given number of rows, then read line by line to produce the output. The algorithm simulates row traversal with a direction toggle at boundaries. This teaches index-to-row mapping with periodic direction changes, useful in encryption and display formatting problems.',
    explanation: `Write a string in a zigzag pattern across a given number of rows and then read the result line by line. For example, "PAYPALISHIRING" with 3 rows produces "PAHNAPLSIIGYIR" after zigzag rearrangement.\n\nThe algorithm simulates the zigzag writing process: maintain an array of string buckets (one per row) and a direction flag. Iterate through characters, appending each to the current row's bucket, then toggling direction when hitting the top or bottom row.\n\nTime is O(n) since each character is processed once, and space is O(n) for the row buckets. The direction-toggle pattern at boundaries is a clean way to handle periodic direction changes without computing modular indices. This simulation approach is often cleaner than the index-formula approach, which computes each character's output position mathematically. The zigzag pattern appears in simple encryption schemes (rail fence cipher), display formatting, and signal processing (triangular wave indexing).`,
    instructions: [
      'Implement zigzag string conversion',
      'Write string in zigzag pattern with numRows rows',
      'Read line by line to create output',
      'If numRows is 1, return original string',
    ],
    starterCode: `function zigzagConvert(s: string, numRows: number): string {
  // YOUR CODE HERE
}`,
    solutionCode: `function zigzagConvert(s: string, numRows: number): string {
  // Row-simulation approach: O(n) time, O(n) space
  // Simulate writing characters in a zigzag pattern, then read rows left to right
  if (numRows === 1 || numRows >= s.length) return s;

  // Create one bucket per row to collect characters
  const zigzagRows: string[][] = Array.from({ length: numRows }, () => []);
  let activeRow = 0;
  let movingDownward = false;

  for (const char of s) {
    // Place the current character in its row
    zigzagRows[activeRow].push(char);

    // Reverse direction when hitting the top or bottom row
    if (activeRow === 0 || activeRow === numRows - 1) {
      movingDownward = !movingDownward;
    }

    // Move to the next row in the current direction
    activeRow += movingDownward ? 1 : -1;
  }

  // Read all rows left to right to produce the zigzag string
  return zigzagRows.map(row => row.join('')).join('');
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
