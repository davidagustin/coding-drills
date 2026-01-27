import type { Exercise } from './types';

export const typescriptExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'ts-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Learn to iterate through an array while skipping every other element using index manipulation. Stepping by 2 is a foundational loop pattern used in pair processing, interleaving, and sampling algorithms common in data-processing pipelines.',
    instructions: [
      'Given an array of numbers, return a new array containing only elements at even indices (0, 2, 4, ...)',
      'Use a for loop with a step of 2',
      'Do not use filter or other array methods',
    ],
    starterCode: `function skipEveryOther(numbers: number[]): number[] {
  const result: number[] = [];
  // Use a for loop with step of 2
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function skipEveryOther(numbers: number[]): number[] {
  // Step-2 iteration: O(n/2) time, O(n/2) space
  const result: number[] = [];
  // Increment by 2 so only even indices (0, 2, 4, ...) are visited
  for (let index = 0; index < numbers.length; index += 2) {
    result.push(numbers[index]);
  }
  return result;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [1, 3, 5], description: 'Basic even-length array' },
      { input: [10, 20, 30, 40, 50], expected: [10, 30, 50], description: 'Odd-length array' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Initialize i to 0 and increment by 2 each iteration: i += 2',
      'Push numbers[i] to the result array in each iteration',
    ],
    concepts: ['for loop', 'index stepping', 'array iteration'],
  },
  {
    id: 'ts-reverse-iteration',
    title: 'Reverse Array Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array in reverse order, from the last element to the first. This is a fundamental pattern used in many algorithms like palindrome checking, stack unwinding, and processing items in LIFO order.',
    instructions: [
      'Given an array, return a new array with elements in reverse order',
      'Use a for loop iterating backwards',
      'Do not use the reverse() method',
    ],
    starterCode: `function reverseIterate<T>(items: T[]): T[] {
  const result: T[] = [];
  // Iterate from the end to the beginning
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function reverseIterate<T>(items: T[]): T[] {
  // Backward linear scan: O(n) time, O(n) space
  const result: T[] = [];
  // Start from the last index and walk backwards to index 0
  for (let index = items.length - 1; index >= 0; index--) {
    result.push(items[index]);
  }
  return result;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Basic reverse' },
      { input: ['a', 'b', 'c'], expected: ['c', 'b', 'a'], description: 'String array' },
      { input: [42], expected: [42], description: 'Single element' },
      { input: [], expected: [], description: 'Empty array' },
    ],
    hints: ['Start i at items.length - 1', 'Loop while i >= 0', 'Decrement i each iteration: i--'],
    concepts: ['reverse iteration', 'for loop', 'array indices'],
  },
  {
    id: 'ts-step-iteration',
    title: 'Custom Step Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array with a configurable step size, visiting every nth element. Custom-step iteration is used in downsampling signals, building strided views over buffers, and implementing algorithms that skip elements systematically.',
    instructions: [
      'Given an array and a step size, return elements at indices that are multiples of the step',
      'For step=3: return elements at indices 0, 3, 6, 9...',
      'Handle edge cases like empty arrays and step larger than array length',
    ],
    starterCode: `function stepIterate<T>(items: T[], step: number): T[] {
  const result: T[] = [];
  // Iterate with custom step size
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function stepIterate<T>(items: T[], step: number): T[] {
  // Custom-step iteration: O(n/step) time, O(n/step) space
  const result: T[] = [];
  // Advance by step each iteration to sample every step-th element
  for (let index = 0; index < items.length; index += step) {
    result.push(items[index]);
  }
  return result;
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 3], expected: [1, 4, 7], description: 'Step of 3' },
      { input: [[10, 20, 30, 40, 50], 2], expected: [10, 30, 50], description: 'Step of 2' },
      { input: [[1, 2, 3], 5], expected: [1], description: 'Step larger than array' },
      { input: [[], 2], expected: [], description: 'Empty array' },
    ],
    hints: ['Use i += step instead of i++', 'The first element (index 0) is always included'],
    concepts: ['variable step', 'for loop', 'modular iteration'],
  },
  {
    id: 'ts-nested-loop-matrix',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a 2D array (matrix) row by row using nested loops and collect all elements into a flat list. Nested iteration is the basis for image processing, grid-based games, and any algorithm that operates on tabular or matrix data.',
    instructions: [
      'Given a 2D array (matrix), return a flat array of all elements',
      'Traverse row by row, from left to right',
      'Use nested for loops',
    ],
    starterCode: `function flattenMatrix<T>(matrix: T[][]): T[] {
  const result: T[] = [];
  // Use nested loops to traverse the matrix
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function flattenMatrix<T>(matrix: T[][]): T[] {
  // Row-major traversal: O(rows * cols) time, O(rows * cols) space
  const result: T[] = [];
  // Outer loop visits each row sequentially
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    // Inner loop visits each column within the current row
    for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
      result.push(matrix[rowIndex][colIndex]);
    }
  }
  return result;
}`,
    testCases: [
      {
        input: [
          [
            [1, 2],
            [3, 4],
            [5, 6],
          ],
        ],
        expected: [1, 2, 3, 4, 5, 6],
        description: '3x2 matrix',
      },
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
          ],
        ],
        expected: [1, 2, 3, 4, 5, 6],
        description: '2x3 matrix',
      },
      { input: [[[1]]], expected: [1], description: '1x1 matrix' },
      { input: [[]], expected: [], description: 'Empty matrix' },
    ],
    hints: [
      'Outer loop iterates over rows',
      'Inner loop iterates over columns within each row',
      'Access elements with matrix[row][col]',
    ],
    concepts: ['nested loops', '2D arrays', 'matrix traversal'],
  },

  // ========== SEQUENCE GENERATION ==========
  {
    id: 'ts-prime-generation',
    title: 'Generate Prime Numbers',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Generate all prime numbers between 1 and 100 using trial division or the Sieve of Eratosthenes. Prime generation is essential in cryptography, hashing, and number theory problems frequently asked in interviews.',
    instructions: [
      'Return an array of all prime numbers from 2 to 100',
      'A prime number is only divisible by 1 and itself',
      'Use nested loops to check divisibility',
    ],
    starterCode: `function generatePrimes(): number[] {
  const primes: number[] = [];
  // Generate all primes from 2 to 100
  // YOUR CODE HERE

  return primes;
}`,
    solutionCode: `function generatePrimes(): number[] {
  // Trial division: O(n * sqrt(n)) time, O(n) space where n = 100
  const primes: number[] = [];
  for (let candidate = 2; candidate <= 100; candidate++) {
    let isPrime: boolean = true;
    // Only test divisors up to sqrt because any factor > sqrt has a co-factor < sqrt
    for (let divisor = 2; divisor <= Math.sqrt(candidate); divisor++) {
      if (candidate % divisor === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}`,
    testCases: [
      {
        input: null,
        expected: [
          2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,
          89, 97,
        ],
        description: 'All primes 1-100',
      },
    ],
    hints: [
      'Start checking from 2 (smallest prime)',
      'Only check divisors up to Math.sqrt(num) for efficiency',
      'Use a boolean flag to track if the number is prime',
    ],
    concepts: ['prime numbers', 'nested loops', 'optimization', 'break statement'],
    timeLimit: 120,
  },
  {
    id: 'ts-fibonacci-iterative',
    title: 'Fibonacci Sequence (Iterative)',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Generate the first N Fibonacci numbers using an iterative loop that builds the sequence forward. Iterative Fibonacci runs in O(n) time and O(n) space, making it the practical choice over naive recursion for generating large sequences.',
    instructions: [
      'Return an array of the first n Fibonacci numbers',
      'Fibonacci: each number is the sum of the two preceding ones',
      'Start with [0, 1, 1, 2, 3, 5, 8, ...]',
    ],
    starterCode: `function fibonacciIterative(count: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [0];

  const fib: number[] = [0, 1];
  // Generate remaining Fibonacci numbers
  // YOUR CODE HERE

  return fib;
}`,
    solutionCode: `function fibonacciIterative(count: number): number[] {
  // Iterative Fibonacci: O(n) time, O(n) space
  // Handle degenerate cases before entering the loop
  if (count <= 0) return [];
  if (count === 1) return [0];

  const fib: number[] = [0, 1];
  // Build sequence forward; each value is the sum of its two predecessors
  for (let position = 2; position < count; position++) {
    fib.push(fib[position - 1] + fib[position - 2]);
  }
  return fib;
}`,
    testCases: [
      { input: 10, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], description: 'First 10 Fibonacci' },
      { input: 5, expected: [0, 1, 1, 2, 3], description: 'First 5 Fibonacci' },
      { input: 1, expected: [0], description: 'Single element' },
      { input: 0, expected: [], description: 'Zero elements' },
    ],
    hints: [
      'fib[i] = fib[i-1] + fib[i-2]',
      'Start the loop at index 2 since indices 0 and 1 are already defined',
    ],
    concepts: ['Fibonacci', 'iteration', 'dynamic programming'],
  },

  // ========== RECURSION ==========
  {
    id: 'ts-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Calculate the nth Fibonacci number using recursion, where fib(n) = fib(n-1) + fib(n-2). This classic problem illustrates overlapping subproblems and exponential time complexity, motivating memoization and dynamic programming optimizations.',
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1',
      'Use recursion: fib(n) = fib(n-1) + fib(n-2)',
    ],
    starterCode: `function fibonacciRecursive(n: number): number {
  // Base cases
  // YOUR CODE HERE

  // Recursive case
  // YOUR CODE HERE
}`,
    solutionCode: `function fibonacciRecursive(n: number): number {
  // Naive recursion: O(2^n) time, O(n) stack space
  // Base cases anchor the recursion for the two smallest inputs
  if (n <= 0) return 0;
  if (n === 1) return 1;
  // Each call branches into two sub-problems (overlapping)
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 5, expected: 5, description: 'fib(5)' },
      { input: 10, expected: 55, description: 'fib(10)' },
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n === 1 returns 1',
      'Recursive case: return fib(n-1) + fib(n-2)',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci'],
  },
  {
    id: 'ts-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate n! (factorial) using recursion, where each call multiplies n by factorial(n-1). Factorial is a building block for permutation counting, combinatorics, and probability calculations in interview problems.',
    instructions: [
      'Return n! (n factorial)',
      'factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: factorial(0) = factorial(1) = 1',
    ],
    starterCode: `function factorial(n: number): number {
  // Base case
  // YOUR CODE HERE

  // Recursive case
  // YOUR CODE HERE
}`,
    solutionCode: `function factorial(n: number): number {
  // Recursive factorial: O(n) time, O(n) stack space
  // 0! and 1! are both 1 by definition; this terminates recursion
  if (n <= 1) return 1;
  // Multiply current value by the factorial of the previous integer
  return n * factorial(n - 1);
}`,
    testCases: [
      { input: 0, expected: 1, description: '0!' },
      { input: 1, expected: 1, description: '1!' },
      { input: 5, expected: 120, description: '5!' },
      { input: 10, expected: 3628800, description: '10!' },
    ],
    hints: ['Base case: if n <= 1, return 1', 'Recursive case: n * factorial(n - 1)'],
    concepts: ['recursion', 'factorial', 'base case'],
  },
  {
    id: 'ts-sum-recursive',
    title: 'Sum Array (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Sum all elements in an array using recursion by decomposing into first element plus sum of the rest. This exercise teaches the head-tail recursive decomposition pattern used extensively in functional programming and divide-and-conquer algorithms.',
    instructions: [
      'Return the sum of all numbers in the array',
      'Use recursion, not loops',
      'Consider: sum of array = first element + sum of rest',
    ],
    starterCode: `function sumArray(numbers: number[]): number {
  // Base case
  // YOUR CODE HERE

  // Recursive case
  // YOUR CODE HERE
}`,
    solutionCode: `function sumArray(numbers: number[]): number {
  // Recursive decomposition: O(n) time, O(n) stack + slice space
  // Empty array has a sum of zero; this is the base case
  if (numbers.length === 0) return 0;
  // Peel off the first element and recurse on the remainder
  return numbers[0] + sumArray(numbers.slice(1));
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: 15, description: 'Sum 1-5' },
      { input: [10, 20, 30], expected: 60, description: 'Sum of tens' },
      { input: [5], expected: 5, description: 'Single element' },
      { input: [], expected: 0, description: 'Empty array' },
    ],
    hints: [
      'Base case: empty array returns 0',
      'Use numbers.slice(1) to get the rest of the array',
    ],
    concepts: ['recursion', 'array slicing', 'base case'],
  },

  // ========== TRAVERSAL (DFS/BFS) ==========
  {
    id: 'ts-dfs-tree',
    title: 'Depth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement depth-first search (DFS) to traverse a binary tree in pre-order (root, left, right). DFS is one of the two fundamental tree traversal strategies and forms the basis for solving most tree-based interview questions.',
    instructions: [
      'Given a binary tree node, return an array of all values in pre-order (root, left, right)',
      'Use recursion to implement DFS',
      'Each node has value, left, and right properties',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function dfsPreOrder<T>(node: TreeNode<T> | null): T[] {
  const result: T[] = [];

  function traverse(node: TreeNode<T> | null): void {
    if (!node) return;
    // Visit node, then left, then right
    // YOUR CODE HERE
  }

  traverse(node);
  return result;
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function dfsPreOrder<T>(node: TreeNode<T> | null): T[] {
  // DFS pre-order traversal: O(n) time, O(h) stack space where h = tree height
  const result: T[] = [];

  function traverse(currentNode: TreeNode<T> | null): void {
    // Null check acts as the base case for leaf children
    if (!currentNode) return;
    // Pre-order: visit root BEFORE its subtrees
    result.push(currentNode.value);
    traverse(currentNode.left);
    traverse(currentNode.right);
  }

  traverse(node);
  return result;
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: { value: 2, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3],
        description: 'Simple tree',
      },
      {
        input: {
          value: 1,
          left: { value: 2, left: { value: 4, left: null, right: null }, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 4, 3],
        description: 'Deeper tree',
      },
      { input: null, expected: [], description: 'Empty tree' },
    ],
    hints: [
      'Pre-order: visit current node first, then recurse left, then right',
      'Check for null nodes before accessing properties',
      'Push node.value to result before recursing',
    ],
    concepts: ['DFS', 'tree traversal', 'pre-order', 'recursion'],
  },
  {
    id: 'ts-dfs-inorder',
    title: 'DFS In-Order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement DFS in-order traversal (left, root, right) for a binary tree. In-order traversal of a BST yields elements in sorted order, making it essential for BST validation, kth-smallest queries, and range searches.',
    instructions: [
      'Return values in in-order: left subtree, then root, then right subtree',
      'For a BST, this gives values in sorted order',
      'Use recursion',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function dfsInOrder<T>(node: TreeNode<T> | null): T[] {
  const result: T[] = [];

  function traverse(node: TreeNode<T> | null): void {
    if (!node) return;
    // Visit left, then node, then right
    // YOUR CODE HERE
  }

  traverse(node);
  return result;
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function dfsInOrder<T>(node: TreeNode<T> | null): T[] {
  // DFS in-order traversal: O(n) time, O(h) stack space where h = tree height
  const result: T[] = [];

  function traverse(currentNode: TreeNode<T> | null): void {
    if (!currentNode) return;
    // In-order: visit left subtree first, then root, then right subtree
    // For a BST this naturally yields sorted output
    traverse(currentNode.left);
    result.push(currentNode.value);
    traverse(currentNode.right);
  }

  traverse(node);
  return result;
}`,
    testCases: [
      {
        input: {
          value: 2,
          left: { value: 1, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3],
        description: 'BST in-order gives sorted',
      },
      {
        input: {
          value: 4,
          left: {
            value: 2,
            left: { value: 1, left: null, right: null },
            right: { value: 3, left: null, right: null },
          },
          right: { value: 5, left: null, right: null },
        },
        expected: [1, 2, 3, 4, 5],
        description: 'Larger BST',
      },
    ],
    hints: [
      'In-order: recurse left, then visit current, then recurse right',
      'Perfect for getting sorted values from a BST',
    ],
    concepts: ['DFS', 'in-order traversal', 'BST', 'recursion'],
  },
  {
    id: 'ts-bfs-tree',
    title: 'Breadth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement breadth-first search (BFS) to traverse a binary tree level by level using a queue. BFS is critical for shortest-path problems, level-order processing, and finding the minimum depth of a tree.',
    instructions: [
      'Return an array of values in level-order (top to bottom, left to right)',
      'Use a queue (array with push/shift) to track nodes to visit',
      'BFS processes all nodes at current depth before moving deeper',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function bfs<T>(root: TreeNode<T> | null): T[] {
  if (!root) return [];

  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];

  while (queue.length > 0) {
    // Dequeue, process, and enqueue children
    // YOUR CODE HERE
  }

  return result;
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function bfs<T>(root: TreeNode<T> | null): T[] {
  // BFS level-order traversal: O(n) time, O(w) space where w = max tree width
  if (!root) return [];

  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];

  while (queue.length > 0) {
    // Dequeue the front node (FIFO ensures level-by-level processing)
    const currentNode: TreeNode<T> = queue.shift()!;
    result.push(currentNode.value);

    // Enqueue children so they are processed after all nodes at the current level
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }

  return result;
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: { value: 2, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3],
        description: 'Simple tree',
      },
      {
        input: {
          value: 1,
          left: {
            value: 2,
            left: { value: 4, left: null, right: null },
            right: { value: 5, left: null, right: null },
          },
          right: {
            value: 3,
            left: { value: 6, left: null, right: null },
            right: { value: 7, left: null, right: null },
          },
        },
        expected: [1, 2, 3, 4, 5, 6, 7],
        description: 'Full binary tree',
      },
    ],
    hints: [
      'Use shift() to remove from front of queue (FIFO)',
      'Use push() to add children to back of queue',
      'Check if left/right child exists before adding to queue',
    ],
    concepts: ['BFS', 'queue', 'level-order traversal'],
  },

  // ========== SEARCHING ==========
  {
    id: 'ts-binary-search',
    title: 'Binary Search',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Implement binary search to find an element in a sorted array in O(log n) time. Binary search is the most important search algorithm in computer science, used in databases, system libraries, and as a subroutine in countless interview problems.',
    instructions: [
      'Given a sorted array and target, return the index of target or -1 if not found',
      'Binary search divides the search space in half each iteration',
      'Time complexity: O(log n)',
    ],
    starterCode: `function binarySearch(numbers: number[], target: number): number {
  let left: number = 0;
  let right: number = numbers.length - 1;

  while (left <= right) {
    // Calculate mid and compare
    // YOUR CODE HERE
  }

  return -1;
}`,
    solutionCode: `function binarySearch(numbers: number[], target: number): number {
  // Binary search: O(log n) time, O(1) space
  let left: number = 0;
  let right: number = numbers.length - 1;

  while (left <= right) {
    // Use floor to get an integer midpoint; avoids overflow compared to (left + right) / 2 in other languages
    const midIndex: number = Math.floor((left + right) / 2);

    if (numbers[midIndex] === target) {
      return midIndex;
    } else if (numbers[midIndex] < target) {
      // Target is in the upper half; discard lower half
      left = midIndex + 1;
    } else {
      // Target is in the lower half; discard upper half
      right = midIndex - 1;
    }
  }

  // Exhausted search space without finding target
  return -1;
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9, 11], 7], expected: 3, description: 'Find 7' },
      { input: [[1, 3, 5, 7, 9, 11], 1], expected: 0, description: 'Find first element' },
      { input: [[1, 3, 5, 7, 9, 11], 11], expected: 5, description: 'Find last element' },
      { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: 'Not found' },
    ],
    hints: [
      'Calculate mid: Math.floor((left + right) / 2)',
      'If numbers[mid] < target, search right half (left = mid + 1)',
      'If numbers[mid] > target, search left half (right = mid - 1)',
    ],
    concepts: ['binary search', 'divide and conquer', 'logarithmic complexity'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'ts-linked-list-traverse',
    title: 'Traverse Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Traverse a singly linked list from head to tail, collecting all node values. Linked list traversal is the foundation for all linked list operations and teaches pointer-based iteration, a pattern critical in systems programming and interviews.',
    instructions: [
      'Given the head of a linked list, return an array of all values',
      'Each node has value and next properties',
      'Traverse until next is null',
    ],
    starterCode: `interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

function traverseLinkedList<T>(head: ListNode<T> | null): T[] {
  const result: T[] = [];
  // Traverse the linked list
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

function traverseLinkedList<T>(head: ListNode<T> | null): T[] {
  // Linear traversal: O(n) time, O(n) space for collected values
  const result: T[] = [];
  let currentNode: ListNode<T> | null = head;

  // Walk the chain until we hit the null sentinel at the end
  while (currentNode !== null) {
    result.push(currentNode.value);
    // Advance the pointer to the next node in the chain
    currentNode = currentNode.next;
  }

  return result;
}`,
    testCases: [
      {
        input: { value: 1, next: { value: 2, next: { value: 3, next: null } } },
        expected: [1, 2, 3],
        description: 'Three nodes',
      },
      {
        input: { value: 42, next: null },
        expected: [42],
        description: 'Single node',
      },
      { input: null, expected: [], description: 'Empty list' },
    ],
    hints: [
      'Use a current pointer starting at head',
      'Loop while current !== null',
      'Move to next node with: current = current.next',
    ],
    concepts: ['linked list', 'pointer traversal', 'iteration'],
  },
  {
    id: 'ts-stack-operations',
    title: 'Stack Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Implement basic stack operations (push, pop) using an array to simulate LIFO behavior. Stacks are used for function call management, expression parsing, undo systems, and are fundamental to DFS and backtracking algorithms.',
    instructions: [
      'Implement push, pop, and peek operations',
      'Stack follows LIFO (Last In, First Out)',
      'Return the final state of the stack after operations',
    ],
    starterCode: `interface StackOperation {
  type: 'push' | 'pop';
  value?: number;
}

function stackOperations(operations: StackOperation[]): number[] {
  const stack: number[] = [];

  for (const op of operations) {
    if (op.type === 'push') {
      // Push value onto stack
      // YOUR CODE HERE
    } else if (op.type === 'pop') {
      // Pop from stack (if not empty)
      // YOUR CODE HERE
    }
  }

  return stack;
}`,
    solutionCode: `interface StackOperation {
  type: 'push' | 'pop';
  value?: number;
}

function stackOperations(operations: StackOperation[]): number[] {
  // Stack simulation: O(n) time, O(n) space where n = number of operations
  const stack: number[] = [];

  for (const operation of operations) {
    if (operation.type === 'push') {
      // LIFO: new elements go on top (end of array)
      stack.push(operation.value!);
    } else if (operation.type === 'pop') {
      // Guard against underflow on an empty stack
      if (stack.length > 0) {
        stack.pop();
      }
    }
  }

  return stack;
}`,
    testCases: [
      {
        input: [
          { type: 'push', value: 1 },
          { type: 'push', value: 2 },
          { type: 'push', value: 3 },
        ],
        expected: [1, 2, 3],
        description: 'Push three values',
      },
      {
        input: [{ type: 'push', value: 1 }, { type: 'push', value: 2 }, { type: 'pop' }],
        expected: [1],
        description: 'Push and pop',
      },
      {
        input: [{ type: 'pop' }],
        expected: [],
        description: 'Pop from empty',
      },
    ],
    hints: [
      'Use array.push() for stack push',
      'Use array.pop() for stack pop',
      'Check stack.length > 0 before popping',
    ],
    concepts: ['stack', 'LIFO', 'push', 'pop'],
  },

  // ========== COMBINATORICS - Building Blocks ==========
  {
    id: 'ts-generate-range',
    title: 'Generate Range of Numbers',
    category: 'combinatorics',
    difficulty: 'beginner',
    description:
      'Create a reusable function that generates an array of integers from start to end, a fundamental building block in many algorithms. Range generation underpins loop abstractions, test data creation, and functional-style iteration patterns.',
    instructions: [
      'Given a start and end number, return an array of all integers from start to end (inclusive)',
      'Use Array.from() with a length calculation',
      'Handle the case where start > end by returning an empty array',
    ],
    starterCode: `function range(start: number, end: number): number[] {
  // Generate array from start to end inclusive
  // YOUR CODE HERE

}`,
    solutionCode: `function range(start: number, end: number): number[] {
  // Array.from generation: O(n) time, O(n) space where n = end - start + 1
  // Guard against invalid range
  if (start > end) return [];
  // Generate sequential integers by mapping each index to start + offset
  return Array.from({ length: end - start + 1 }, (_, offset) => start + offset);
}`,
    testCases: [
      { input: [1, 5], expected: [1, 2, 3, 4, 5], description: 'Basic range 1-5' },
      { input: [0, 3], expected: [0, 1, 2, 3], description: 'Range starting from 0' },
      { input: [5, 5], expected: [5], description: 'Single number range' },
      { input: [5, 3], expected: [], description: 'Invalid range returns empty' },
    ],
    hints: [
      'Array.from takes an object with length property',
      'The second argument is a map function: (_, index) => value',
      'Calculate length as: end - start + 1',
    ],
    concepts: ['Array.from', 'range generation', 'utility function'],
  },
  {
    id: 'ts-generate-subsets',
    title: 'Generate All Subsets (Power Set)',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all possible subsets (power set) of an array using iterative doubling. The power set has 2^n elements and is a core building block for problems involving subset selection, combinations, knapsack variants, and backtracking.',
    instructions: [
      'Given an array, return all possible subsets (including empty set)',
      'Use reduce to iteratively build subsets',
      'For each element, add it to all existing subsets',
    ],
    starterCode: `function powerSet<T>(items: T[]): T[][] {
  // Generate all subsets using reduce
  // Start with [[]] (containing empty set)
  // YOUR CODE HERE

}`,
    solutionCode: `function powerSet<T>(items: T[]): T[][] {
  // Iterative doubling: O(n * 2^n) time, O(2^n) space for all subsets
  return items.reduce<T[][]>(
    (existingSubsets, currentItem) =>
      // For each new item, duplicate every existing subset and append the item
      existingSubsets.concat(existingSubsets.map(subset => [...subset, currentItem])),
    [[]] // Seed with the empty set so the first iteration creates single-element subsets
  );
}`,
    testCases: [
      {
        input: [[1, 2]],
        expected: [[], [1], [2], [1, 2]],
        description: 'Two elements',
      },
      {
        input: [[1, 2, 3]],
        expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        description: 'Three elements',
      },
      { input: [[]], expected: [[]], description: 'Empty array' },
      { input: [['a']], expected: [[], ['a']], description: 'Single element' },
    ],
    hints: [
      'Start with an array containing just the empty array: [[]]',
      'For each new element, create new subsets by adding it to all existing subsets',
      'Concatenate new subsets with existing ones',
    ],
    concepts: ['power set', 'reduce', 'spread operator', 'combinatorics'],
  },
  {
    id: 'ts-generate-combinations',
    title: 'Generate Combinations (n choose k)',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all combinations of size k from an array using backtracking (n choose k). Combinations are fundamental in scheduling, team formation, feature selection, and optimization problems frequently tested in interviews.',
    instructions: [
      'Given an array and a size k, return all combinations of exactly k elements',
      'Use backtracking: build combinations by choosing to include or skip each element',
      'Combinations are unordered: [1,2] and [2,1] are the same',
    ],
    starterCode: `function combinations<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];

  function backtrack(start: number, current: T[]): void {
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    // YOUR CODE HERE: iterate from start to items.length
    // For each element, add to current, recurse, then remove (backtrack)

  }

  backtrack(0, []);
  return result;
}`,
    solutionCode: `function combinations<T>(items: T[], size: number): T[][] {
  // Backtracking: O(C(n,k) * k) time, O(k) stack space
  const result: T[][] = [];

  function backtrack(startIndex: number, current: T[]): void {
    // Once we have exactly k elements, snapshot the current combination
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    // Only look forward (startIndex) to avoid duplicate unordered sets
    for (let pickIndex = startIndex; pickIndex < items.length; pickIndex++) {
      current.push(items[pickIndex]);
      // Advance past pickIndex so each element is used at most once
      backtrack(pickIndex + 1, current);
      // Undo the choice to explore other branches
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4], 2],
        expected: [
          [1, 2],
          [1, 3],
          [1, 4],
          [2, 3],
          [2, 4],
          [3, 4],
        ],
        description: 'Choose 2 from 4',
      },
      {
        input: [[1, 2, 3], 3],
        expected: [[1, 2, 3]],
        description: 'Choose all',
      },
      { input: [[1, 2, 3], 1], expected: [[1], [2], [3]], description: 'Choose 1' },
    ],
    hints: [
      'Use a start index to avoid duplicates (only look forward)',
      'Push element, recurse with i+1, then pop to backtrack',
      'Base case: when current.length equals size',
    ],
    concepts: ['backtracking', 'combinations', 'n choose k', 'recursion'],
  },
  {
    id: 'ts-generate-permutations',
    title: 'Generate Permutations',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all permutations of an array where order matters using recursive backtracking. Permutations are essential for scheduling, anagram detection, brute-force search, and understanding n! growth in algorithm complexity analysis.',
    instructions: [
      'Given an array, return all possible orderings (permutations)',
      'Build permutations by picking each element and permuting the rest',
      'Order matters: [1,2] and [2,1] are different permutations',
    ],
    starterCode: `function permutations<T>(items: T[]): T[][] {
  const result: T[][] = [];

  function permute(current: T[], remaining: T[]): void {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }
    // YOUR CODE HERE: for each element in remaining,
    // add it to current and recurse with the rest

  }

  permute([], items);
  return result;
}`,
    solutionCode: `function permutations<T>(items: T[]): T[][] {
  // Recursive permutation: O(n! * n) time, O(n!) space for all orderings
  const result: T[][] = [];

  function permute(current: T[], remaining: T[]): void {
    // All elements placed; this ordering is complete
    if (remaining.length === 0) {
      result.push(current);
      return;
    }
    for (let choiceIndex = 0; choiceIndex < remaining.length; choiceIndex++) {
      // Pick each element in turn and recurse with it removed from the pool
      permute(
        [...current, remaining[choiceIndex]],
        [...remaining.slice(0, choiceIndex), ...remaining.slice(choiceIndex + 1)]
      );
    }
  }

  permute([], items);
  return result;
}`,
    testCases: [
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
        description: 'Three elements',
      },
      {
        input: [[1, 2]],
        expected: [
          [1, 2],
          [2, 1],
        ],
        description: 'Two elements',
      },
      { input: [[1]], expected: [[1]], description: 'Single element' },
    ],
    hints: [
      'For each element at index i, create remaining by removing that element',
      'Use slice(0, i) and slice(i + 1) to create the remaining array',
      'Base case: when remaining is empty, add current to results',
    ],
    concepts: ['permutations', 'recursion', 'backtracking', 'slice'],
  },
  {
    id: 'ts-cartesian-product',
    title: 'Cartesian Product of Two Arrays',
    category: 'combinatorics',
    difficulty: 'beginner',
    description:
      'Generate all pairs from two arrays (Cartesian product) using nested iteration. Cartesian products are used for generating test cases, grid coordinates, combining configuration options, and multi-dimensional search spaces.',
    instructions: [
      'Given two arrays, return all possible pairs [a, b] where a is from array1 and b is from array2',
      'Use flatMap for the outer array and map for the inner',
      'Result length should be array1.length * array2.length',
    ],
    starterCode: `function cartesianProduct<A, B>(first: A[], second: B[]): [A, B][] {
  // Use flatMap and map to generate all pairs
  // YOUR CODE HERE

}`,
    solutionCode: `function cartesianProduct<A, B>(first: A[], second: B[]): [A, B][] {
  // Cartesian product: O(m * n) time and space where m, n are array lengths
  // flatMap pairs every element of first with every element of second
  return first.flatMap(firstItem => second.map(secondItem => [firstItem, secondItem] as [A, B]));
}`,
    testCases: [
      {
        input: [
          [1, 2],
          ['a', 'b'],
        ],
        expected: [
          [1, 'a'],
          [1, 'b'],
          [2, 'a'],
          [2, 'b'],
        ],
        description: '2x2 product',
      },
      {
        input: [[1, 2, 3], ['x']],
        expected: [
          [1, 'x'],
          [2, 'x'],
          [3, 'x'],
        ],
        description: '3x1 product',
      },
      { input: [[], [1, 2]], expected: [], description: 'Empty first array' },
    ],
    hints: [
      'flatMap flattens one level: [[a], [b]] becomes [a, b]',
      'For each element in first, map over all elements in second',
      'Each pair is [element from first, element from second]',
    ],
    concepts: ['cartesian product', 'flatMap', 'map', 'pairs'],
  },
  {
    id: 'ts-cartesian-n-arrays',
    title: 'Cartesian Product of N Arrays',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Generate the Cartesian product of any number of arrays, generalizing pair generation to N dimensions. This pattern is used in combinatorial testing, configuration enumeration, and building multi-dimensional search spaces programmatically.',
    instructions: [
      'Given an array of arrays, return all possible combinations taking one element from each',
      'Use reduce to iteratively combine arrays',
      'Start with [[]] and build up tuples',
    ],
    starterCode: `function cartesianProductN<T>(arrays: T[][]): T[][] {
  // Use reduce with flatMap to combine arrays iteratively
  // Start with [[]] as the initial accumulator
  // YOUR CODE HERE

}`,
    solutionCode: `function cartesianProductN<T>(arrays: T[][]): T[][] {
  // N-ary Cartesian product via reduce: O(product of all lengths) time and space
  return arrays.reduce<T[][]>(
    // For each new array, extend every existing combo with every value from that array
    (existingCombos, currentArray) =>
      existingCombos.flatMap(combo => currentArray.map(value => [...combo, value])),
    [[]] // Seed with empty tuple so first iteration creates single-element combos
  );
}`,
    testCases: [
      {
        input: [[[1, 2], ['a', 'b'], ['x']]],
        expected: [
          [1, 'a', 'x'],
          [1, 'b', 'x'],
          [2, 'a', 'x'],
          [2, 'b', 'x'],
        ],
        description: 'Three arrays',
      },
      {
        input: [[[1], [2], [3]]],
        expected: [[1, 2, 3]],
        description: 'Single element arrays',
      },
    ],
    hints: [
      'reduce accumulates the growing combinations',
      'For each new array, extend each existing combination with each new value',
      'Start with [[]] so first iteration creates single-element combos',
    ],
    concepts: ['cartesian product', 'reduce', 'flatMap', 'n-dimensional'],
  },
  {
    id: 'ts-binomial-coefficient',
    title: 'Calculate Binomial Coefficient',
    category: 'combinatorics',
    difficulty: 'beginner',
    description: `Calculate "n choose k" (the binomial coefficient) using dynamic programming or multiplicative formula. Binomial coefficients count combinations without generating them, essential for probability, Pascal's triangle, and combinatorial analysis.`,
    instructions: [
      'Calculate C(n, k) = n! / (k! * (n-k)!)',
      'Use iterative multiplication to avoid overflow',
      'Multiply and divide incrementally',
    ],
    starterCode: `function binomial(n: number, k: number): number {
  // Calculate n choose k iteratively
  // Multiply by (n-i) and divide by (i+1) for i from 0 to k-1
  // YOUR CODE HERE

}`,
    solutionCode: `function binomial(n: number, k: number): number {
  // Iterative multiplicative formula: O(k) time, O(1) space
  // Impossible to choose more items than available
  if (k > n) return 0;
  // Choosing none or all yields exactly one way
  if (k === 0 || k === n) return 1;
  let result: number = 1;
  // Multiply numerator factor (n-i) and divide by denominator factor (i+1) each step
  // to keep intermediate values as small as possible and avoid factorial overflow
  for (let step = 0; step < k; step++) {
    result = (result * (n - step)) / (step + 1);
  }
  return result;
}`,
    testCases: [
      { input: [5, 2], expected: 10, description: '5 choose 2' },
      { input: [10, 3], expected: 120, description: '10 choose 3' },
      { input: [5, 0], expected: 1, description: 'n choose 0' },
      { input: [5, 5], expected: 1, description: 'n choose n' },
      { input: [3, 5], expected: 0, description: 'k > n' },
    ],
    hints: [
      'C(n,k) = C(n,n-k), so you can use the smaller of k and n-k',
      'Multiply by (n-i) before dividing by (i+1) to keep integers',
      'Edge cases: k=0 or k=n returns 1',
    ],
    concepts: ['binomial coefficient', 'combinatorics', 'counting'],
  },

  // ========== MEMOIZATION & CACHING ==========
  {
    id: 'ts-basic-memoize',
    title: 'Basic Memoization',
    category: 'memoization',
    difficulty: 'beginner',
    description:
      'Create a memoization wrapper for single-argument functions that caches results to avoid redundant computation. Memoization is a key optimization technique that transforms exponential algorithms into polynomial ones, widely used in DP and API caching.',
    instructions: [
      'Create a function that wraps another function with caching',
      'Use a Map to store computed results',
      'Return cached result if argument was seen before',
    ],
    starterCode: `function memoize<T, R>(compute: (arg: T) => R): (arg: T) => R {
  const cache: Map<T, R> = new Map();

  return function(arg: T): R {
    // Check cache, compute if needed, store result
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function memoize<T, R>(compute: (arg: T) => R): (arg: T) => R {
  // Closure-based memoization: O(1) amortized lookup, O(n) space for n unique args
  const cache: Map<T, R> = new Map();

  return function(arg: T): R {
    // Return cached result to skip redundant computation
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    // First time seeing this arg; compute, store, and return
    const computedResult: R = compute(arg);
    cache.set(arg, computedResult);
    return computedResult;
  };
}`,
    testCases: [
      {
        input: [(n: number) => n * 2, [5, 5, 5]],
        expected: [10, 10, 10],
        description: 'Returns cached result',
      },
    ],
    hints: [
      'cache.has(arg) checks if the argument was computed before',
      'cache.get(arg) retrieves the cached result',
      'cache.set(arg, result) stores the new result',
    ],
    concepts: ['memoization', 'Map', 'caching', 'higher-order function'],
  },
  {
    id: 'ts-memoize-multi-arg',
    title: 'Memoize with Multiple Arguments',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Memoize functions with multiple arguments by serializing them into a composite cache key. Multi-argument memoization is critical for caching API responses, database queries, and expensive computations with compound inputs in production systems.',
    instructions: [
      'Create a memoization wrapper that handles multiple arguments',
      'Use JSON.stringify to create a cache key from arguments',
      'Store and retrieve results based on the serialized key',
    ],
    starterCode: `function memoizeMulti<T extends unknown[], R>(compute: (...args: T) => R): (...args: T) => R {
  const cache: Map<string, R> = new Map();

  return function(...args: T): R {
    // Create key from args, check cache, compute if needed
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function memoizeMulti<T extends unknown[], R>(compute: (...args: T) => R): (...args: T) => R {
  // Multi-arg memoization via JSON key: O(1) amortized lookup, O(n) space
  const cache: Map<string, R> = new Map();

  return function(...args: T): R {
    // Serialize all arguments into a single string key for Map lookup
    const cacheKey: string = JSON.stringify(args);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }
    // Cache miss: compute, store the result, then return
    const computedResult: R = compute(...args);
    cache.set(cacheKey, computedResult);
    return computedResult;
  };
}`,
    testCases: [
      {
        input: [
          (a: number, b: number) => a + b,
          [
            [1, 2],
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [3, 3, 7],
        description: 'Caches multi-arg results',
      },
    ],
    hints: [
      'JSON.stringify([1, 2]) creates a unique key for these arguments',
      'Use rest parameters (...args) to capture all arguments',
      'Spread args when calling the original function: compute(...args)',
    ],
    concepts: ['memoization', 'JSON.stringify', 'rest parameters', 'caching'],
  },
  {
    id: 'ts-memoize-fibonacci',
    title: 'Memoized Fibonacci',
    category: 'memoization',
    difficulty: 'beginner',
    description:
      'Implement Fibonacci with memoization to achieve O(n) time instead of O(2^n) naive recursion. This exercise demonstrates how memoization eliminates overlapping subproblems, the core insight behind top-down dynamic programming.',
    instructions: [
      'Create a fibonacci function with built-in memoization',
      'Use a Map or object to store computed values',
      'Base cases: fib(0) = 0, fib(1) = 1',
    ],
    starterCode: `function fibonacci(n: number, memo: Map<number, number> = new Map([[0, 0], [1, 1]])): number {
  // Check memo, compute recursively if needed, store result
  // YOUR CODE HERE

}`,
    solutionCode: `function fibonacci(n: number, memo: Map<number, number> = new Map([[0, 0], [1, 1]])): number {
  // Top-down DP with memoization: O(n) time, O(n) space
  // Short-circuit if already computed to avoid exponential re-work
  if (memo.has(n)) {
    return memo.get(n)!;
  }
  // Recurse on both sub-problems; memo ensures each is solved only once
  const computedValue: number = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo.set(n, computedValue);
  return computedValue;
}`,
    testCases: [
      { input: [10], expected: 55, description: 'fib(10)' },
      { input: [20], expected: 6765, description: 'fib(20)' },
      { input: [0], expected: 0, description: 'fib(0)' },
      { input: [1], expected: 1, description: 'fib(1)' },
    ],
    hints: [
      'Initialize memo with base cases: Map([[0, 0], [1, 1]])',
      'Pass memo to recursive calls to share the cache',
      'Without memoization, fib(40) would take forever!',
    ],
    concepts: ['memoization', 'fibonacci', 'recursion', 'dynamic programming'],
  },
  {
    id: 'ts-debounce',
    title: 'Debounce Function',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Create a debounce function that delays execution until after a pause in rapid calls. Debouncing is essential for optimizing search inputs, window resize handlers, and auto-save features to prevent excessive function invocations.',
    instructions: [
      'Create a wrapper that delays function execution',
      'Clear the previous timeout on each call',
      'Only execute after delay milliseconds of no calls',
    ],
    starterCode: `function debounce<T extends unknown[]>(callback: (...args: T) => void, delay: number): (...args: T) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function(...args: T): void {
    // Clear previous timeout, set new one
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function debounce<T extends unknown[]>(callback: (...args: T) => void, delay: number): (...args: T) => void {
  // Debounce: delays execution until calls stop for 'delay' ms
  let timeoutId: ReturnType<typeof setTimeout>;

  return function(...args: T): void {
    // Cancel any pending invocation so only the latest call survives
    clearTimeout(timeoutId);
    // Schedule a fresh invocation after the quiet period
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}`,
    testCases: [
      {
        input: ['Debounce delays until pause'],
        expected: true,
        description: 'Creates debounced function',
      },
    ],
    hints: [
      'clearTimeout cancels the previous scheduled call',
      'setTimeout schedules the function to run after delay',
      'Use arrow function in setTimeout to preserve args',
    ],
    concepts: ['debounce', 'setTimeout', 'clearTimeout', 'rate limiting'],
  },
  {
    id: 'ts-throttle',
    title: 'Throttle Function',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Create a throttle function that limits how often a function can fire during rapid calls. Unlike debounce, throttle ensures regular execution at fixed intervals, making it ideal for scroll handlers, rate limiting, and game loops.',
    instructions: [
      'Create a wrapper that allows at most one call per time period',
      'Track whether we are in a throttle period',
      'Execute immediately, then block until period ends',
    ],
    starterCode: `function throttle<T extends unknown[]>(callback: (...args: T) => void, limit: number): (...args: T) => void {
  let inThrottle: boolean = false;

  return function(...args: T): void {
    // If not in throttle, execute and set throttle
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function throttle<T extends unknown[]>(callback: (...args: T) => void, limit: number): (...args: T) => void {
  // Throttle: ensures at most one execution per 'limit' ms window
  let inThrottle: boolean = false;

  return function(...args: T): void {
    // Only execute if the cooldown period has elapsed
    if (!inThrottle) {
      callback(...args);
      // Block subsequent calls until the limit window expires
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`,
    testCases: [
      {
        input: ['Throttle limits call rate'],
        expected: true,
        description: 'Creates throttled function',
      },
    ],
    hints: [
      'Unlike debounce, throttle executes immediately',
      'Set a flag to block subsequent calls',
      'Use setTimeout to reset the flag after the limit period',
    ],
    concepts: ['throttle', 'rate limiting', 'setTimeout', 'flag pattern'],
  },
  {
    id: 'ts-once-function',
    title: 'Once Function',
    category: 'memoization',
    difficulty: 'beginner',
    description:
      'Create a wrapper that allows a function to be called only once, returning the cached result on subsequent calls. The once pattern is used for one-time initialization, singleton creation, and ensuring idempotent setup in libraries and frameworks.',
    instructions: [
      'Track whether the function has been called',
      'Store the result from the first call',
      'Return the stored result on subsequent calls',
    ],
    starterCode: `function once<T extends unknown[], R>(callback: (...args: T) => R): (...args: T) => R {
  let called: boolean = false;
  let result: R;

  return function(...args: T): R {
    // Only call callback once, return cached result after
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function once<T extends unknown[], R>(callback: (...args: T) => R): (...args: T) => R {
  // Once wrapper: ensures the callback runs at most one time
  let called: boolean = false;
  let cachedResult: R;

  return function(...args: T): R {
    if (!called) {
      // Set flag before invoking to safely handle re-entrant calls
      called = true;
      cachedResult = callback(...args);
    }
    // All subsequent calls return the original result
    return cachedResult;
  };
}`,
    testCases: [
      {
        input: [() => Math.random(), 3],
        expected: 'same value three times',
        description: 'Returns same result',
      },
    ],
    hints: [
      'Use a boolean flag to track if called',
      'Store the result in a closure variable',
      'Set the flag before calling to handle recursive cases',
    ],
    concepts: ['once', 'closure', 'flag pattern', 'caching'],
  },

  // ========== ARRAY UTILITIES ==========
  {
    id: 'ts-chunk-array',
    title: 'Chunk Array',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Split an array into chunks of a specified size, returning an array of arrays. Chunking is used for pagination, batch API calls, parallel processing, and breaking large datasets into manageable pieces for streaming or display.',
    instructions: [
      'Given an array and chunk size, return an array of chunks',
      'Last chunk may be smaller than size',
      'Use Array.from with slice',
    ],
    starterCode: `function chunk<T>(items: T[], size: number): T[][] {
  // Calculate number of chunks, use Array.from with slice
  // YOUR CODE HERE

}`,
    solutionCode: `function chunk<T>(items: T[], size: number): T[][] {
  // Array.from chunking: O(n) time, O(n) space
  return Array.from(
    // Ceiling division gives the total number of chunks (last may be partial)
    { length: Math.ceil(items.length / size) },
    // Each chunk index maps to a slice of 'size' elements starting at chunkIndex * size
    (_, chunkIndex) => items.slice(chunkIndex * size, chunkIndex * size + size)
  );
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5, 6, 7], 3],
        expected: [[1, 2, 3], [4, 5, 6], [7]],
        description: 'Chunk with remainder',
      },
      {
        input: [[1, 2, 3, 4], 2],
        expected: [
          [1, 2],
          [3, 4],
        ],
        description: 'Even chunks',
      },
      { input: [[], 3], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Number of chunks = Math.ceil(items.length / size)',
      'Each chunk starts at index i * size',
      'slice(start, end) extracts from start up to (not including) end',
    ],
    concepts: ['chunk', 'Array.from', 'slice', 'pagination'],
  },
  {
    id: 'ts-partition',
    title: 'Partition Array',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Split an array into two groups based on a predicate function, returning [truthy, falsy] arrays. Partition is a versatile utility for data classification, filtering with remainder, and separating valid from invalid items in data pipelines.',
    instructions: [
      'Given an array and predicate, return two arrays',
      'First array contains elements where predicate is true',
      'Second array contains elements where predicate is false',
    ],
    starterCode: `function partition<T>(items: T[], predicate: (value: T) => boolean): [T[], T[]] {
  // Use reduce with two-array accumulator
  // YOUR CODE HERE

}`,
    solutionCode: `function partition<T>(items: T[], predicate: (value: T) => boolean): [T[], T[]] {
  // Single-pass partition: O(n) time, O(n) space
  return items.reduce<[T[], T[]]>(
    (buckets, value) => {
      // Index 0 = truthy bucket, index 1 = falsy bucket
      buckets[predicate(value) ? 0 : 1].push(value);
      return buckets;
    },
    [[], []] // Initialize both buckets as empty arrays
  );
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5, 6], (n: number) => n % 2 === 0],
        expected: [
          [2, 4, 6],
          [1, 3, 5],
        ],
        description: 'Partition even/odd',
      },
      {
        input: [['a', 'ab', 'abc'], (s: string) => s.length > 1],
        expected: [['ab', 'abc'], ['a']],
        description: 'Partition by length',
      },
    ],
    hints: [
      'Initialize accumulator as [[], []] for truthy and falsy',
      'Use conditional index: predicate(value) ? 0 : 1',
      'Push to the appropriate sub-array',
    ],
    concepts: ['partition', 'reduce', 'predicate', 'grouping'],
  },
  {
    id: 'ts-zip-arrays',
    title: 'Zip Two Arrays',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Combine two arrays into an array of pairs, pairing elements at corresponding indices like a zipper. Zip is a functional programming staple used for combining parallel data streams, creating key-value pairs, and coordinate generation.',
    instructions: [
      'Given two arrays, return array of [a, b] pairs',
      'Use map with index to pair corresponding elements',
      'Result length equals shorter array length',
    ],
    starterCode: `function zip<A, B>(first: A[], second: B[]): [A, B][] {
  // Map over shorter array, pair with corresponding element
  // YOUR CODE HERE

}`,
    solutionCode: `function zip<A, B>(first: A[], second: B[]): [A, B][] {
  // Zip pairing: O(min(m,n)) time and space
  // Use the shorter length so we never access out-of-bounds indices
  const pairCount: number = Math.min(first.length, second.length);
  // Map each index to a tuple of the corresponding elements from both arrays
  return Array.from({ length: pairCount }, (_, index) => [first[index], second[index]] as [A, B]);
}`,
    testCases: [
      {
        input: [
          [1, 2, 3],
          ['a', 'b', 'c'],
        ],
        expected: [
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ],
        description: 'Equal length arrays',
      },
      {
        input: [
          [1, 2],
          ['a', 'b', 'c'],
        ],
        expected: [
          [1, 'a'],
          [2, 'b'],
        ],
        description: 'Different lengths',
      },
    ],
    hints: [
      'Use Math.min to handle different lengths',
      'Pair elements at the same index',
      'Array.from with length object creates array of pairs',
    ],
    concepts: ['zip', 'pairing', 'Array.from', 'index mapping'],
  },
  {
    id: 'ts-unzip-pairs',
    title: 'Unzip Array of Pairs',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Convert an array of pairs back into two separate arrays, the inverse of the zip operation. Unzip is used when deconstructing paired data, splitting coordinate lists, and transforming columnar data back into row-based format.',
    instructions: [
      'Given array of pairs, return two arrays',
      'First array has first elements, second has second elements',
      'Use map to extract each position',
    ],
    starterCode: `function unzip<A, B>(pairs: [A, B][]): [A[], B[]] {
  // Return [array of first elements, array of second elements]
  // YOUR CODE HERE

}`,
    solutionCode: `function unzip<A, B>(pairs: [A, B][]): [A[], B[]] {
  // Dual-pass unzip: O(n) time, O(n) space
  return [
    // Extract all first elements into one array
    pairs.map(pair => pair[0]),
    // Extract all second elements into another array
    pairs.map(pair => pair[1])
  ];
}`,
    testCases: [
      {
        input: [
          [
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
          ],
        ],
        expected: [
          [1, 2, 3],
          ['a', 'b', 'c'],
        ],
        description: 'Basic unzip',
      },
    ],
    hints: [
      'Map over pairs extracting index 0',
      'Map over pairs extracting index 1',
      'Return both arrays in a tuple',
    ],
    concepts: ['unzip', 'map', 'destructuring', 'tuple'],
  },
  {
    id: 'ts-group-by',
    title: 'Group By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Group array elements into a Record/Map by a key function, collecting elements that share the same key. GroupBy is essential for data aggregation, report generation, and is one of the most frequently used utility functions in data processing.',
    instructions: [
      'Given an array and key function, group elements by their key',
      'Return an object where keys map to arrays of matching elements',
      'Use reduce with nullish coalescing assignment',
    ],
    starterCode: `function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  // Use reduce to build groups object
  // YOUR CODE HERE

}`,
    solutionCode: `function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  // Reduce approach: O(n) time, O(n) space
  // Accumulate items into buckets keyed by the result of keyFn
  return items.reduce<Record<string, T[]>>((groupedResult, item) => {
    const groupKey: string = keyFn(item);
    // Initialize the bucket as empty array if this is the first item for this key
    (groupedResult[groupKey] ??= []).push(item);
    return groupedResult;
  }, {});
}`,
    testCases: [
      {
        input: [
          [
            { type: 'a', val: 1 },
            { type: 'b', val: 2 },
            { type: 'a', val: 3 },
          ],
          (item: { type: string }) => item.type,
        ],
        expected: {
          a: [
            { type: 'a', val: 1 },
            { type: 'a', val: 3 },
          ],
          b: [{ type: 'b', val: 2 }],
        },
        description: 'Group by type',
      },
    ],
    hints: [
      'keyFn(item) determines which group the item belongs to',
      'groups[key] ??= [] initializes the array if needed',
      'Push item to its group array',
    ],
    concepts: ['groupBy', 'reduce', 'nullish coalescing', 'aggregation'],
  },
  {
    id: 'ts-frequency-counter',
    title: 'Frequency Counter',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Count occurrences of each element in an array using a hash map. The frequency counter pattern is fundamental to anagram detection, majority element, top-k problems, and is one of the most common patterns in coding interviews.',
    instructions: [
      'Given an array, return an object with counts of each element',
      'Use reduce to build the frequency map',
      'Handle the initial count of 0',
    ],
    starterCode: `function frequencyCount(items: (string | number)[]): Record<string, number> {
  // Use reduce to count occurrences
  // YOUR CODE HERE

}`,
    solutionCode: `function frequencyCount(items: (string | number)[]): Record<string, number> {
  // Hash map counting: O(n) time, O(k) space where k = unique elements
  // Convert each value to string key and tally occurrences
  return items.reduce<Record<string, number>>((frequencyMap, value) => {
    const itemKey: string = String(value);
    // Default to 0 for first occurrence, then increment
    frequencyMap[itemKey] = (frequencyMap[itemKey] || 0) + 1;
    return frequencyMap;
  }, {});
}`,
    testCases: [
      {
        input: [['a', 'b', 'a', 'c', 'b', 'a']],
        expected: { a: 3, b: 2, c: 1 },
        description: 'Count letters',
      },
      {
        input: [[1, 2, 2, 3, 3, 3]],
        expected: { 1: 1, 2: 2, 3: 3 },
        description: 'Count numbers',
      },
    ],
    hints: [
      'counts[key] || 0 handles undefined (first occurrence)',
      'Increment the count by 1 each time',
      'Initial accumulator is empty object {}',
    ],
    concepts: ['frequency counter', 'reduce', 'counting', 'hash map'],
  },
  {
    id: 'ts-sliding-window',
    title: 'Sliding Window Generator',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Generate all contiguous windows of size k from an array as sub-arrays. Sliding windows are used for moving averages, substring problems, and maximum/minimum subarray queries, forming one of the key patterns in interview algorithms.',
    instructions: [
      'Given array and window size k, return all windows',
      'Each window is a subarray of k consecutive elements',
      'Number of windows = array.length - k + 1',
    ],
    starterCode: `function slidingWindows<T>(items: T[], windowSize: number): T[][] {
  // Generate all windows of size windowSize
  // YOUR CODE HERE

}`,
    solutionCode: `function slidingWindows<T>(items: T[], windowSize: number): T[][] {
  // Array.from approach: O(n * k) time, O(n * k) space
  // Generate all contiguous subarrays of length windowSize
  if (windowSize > items.length) return [];
  const totalWindows: number = items.length - windowSize + 1;
  return Array.from(
    { length: totalWindows },
    // Each window starts at startIndex and captures windowSize consecutive elements
    (_, startIndex) => items.slice(startIndex, startIndex + windowSize)
  );
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], 3],
        expected: [
          [1, 2, 3],
          [2, 3, 4],
          [3, 4, 5],
        ],
        description: 'Windows of size 3',
      },
      {
        input: [[1, 2, 3], 2],
        expected: [
          [1, 2],
          [2, 3],
        ],
        description: 'Windows of size 2',
      },
      { input: [[1, 2], 3], expected: [], description: 'Window larger than array' },
    ],
    hints: [
      'Check if windowSize > items.length and return empty if so',
      'Number of windows = items.length - windowSize + 1',
      'Each window starts at index i and ends at i + windowSize',
    ],
    concepts: ['sliding window', 'slice', 'Array.from', 'subarray'],
  },
  {
    id: 'ts-flatten-deep',
    title: 'Flatten to Depth',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Flatten nested arrays to a specified depth, controlling how many levels of nesting to remove. Depth-limited flattening is used in data normalization, tree-to-list conversion, and processing hierarchical API responses.',
    instructions: [
      'Given nested array and depth, flatten to that depth',
      'Depth 1 flattens one level, Infinity flattens completely',
      'Use recursive approach with depth tracking',
    ],
    starterCode: `function flattenDepth(items: unknown[], depth: number = 1): unknown[] {
  // Recursively flatten up to depth levels
  // YOUR CODE HERE

}`,
    solutionCode: `function flattenDepth(items: unknown[], depth: number = 1): unknown[] {
  // Recursive reduce: O(n * d) time, O(n) space where d = depth
  // Base case: no more flattening allowed at this depth
  if (depth < 1) return items;
  return items.reduce<unknown[]>((flattened, element) => {
    if (Array.isArray(element)) {
      // Recurse one level deeper, decrementing remaining depth
      return flattened.concat(flattenDepth(element, depth - 1));
    }
    // Non-array elements are appended directly
    return flattened.concat(element);
  }, []);
}`,
    testCases: [
      {
        input: [[[1, [2, [3, [4]]]], 2]],
        expected: [1, 2, 3, [4]],
        description: 'Flatten depth 2',
      },
      {
        input: [[[1, [2, [3, [4]]]], 1]],
        expected: [1, [2, [3, [4]]]],
        description: 'Flatten depth 1',
      },
    ],
    hints: [
      'Base case: depth < 1 returns array as-is',
      'Check if element is array with Array.isArray',
      'Recurse with depth - 1 for nested arrays',
    ],
    concepts: ['flatten', 'recursion', 'reduce', 'depth control'],
  },
  {
    id: 'ts-rotate-left',
    title: 'Rotate Array Left',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Rotate an array k positions to the left so elements that fall off reappear on the right side. Array rotation is used in circular buffer logic, cipher algorithms, and is a classic interview problem that tests modular arithmetic skills.',
    instructions: [
      'Given array and k, rotate elements k positions left',
      'Handle k larger than array length with modulo',
      'Use slice to split and recombine',
    ],
    starterCode: `function rotateLeft<T>(items: T[], count: number): T[] {
  // Use slice to split at position count, then recombine
  // YOUR CODE HERE

}`,
    solutionCode: `function rotateLeft<T>(items: T[], count: number): T[] {
  // Slice and recombine: O(n) time, O(n) space
  if (items.length === 0) return [];
  // Modulo handles cases where count exceeds array length
  const effectiveShift: number = count % items.length;
  // Split at shift point: elements after shift come first, then elements before
  return [...items.slice(effectiveShift), ...items.slice(0, effectiveShift)];
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], 2], expected: [3, 4, 5, 1, 2], description: 'Rotate left by 2' },
      { input: [[1, 2, 3], 5], expected: [3, 1, 2], description: 'k > length' },
      { input: [[1, 2, 3], 0], expected: [1, 2, 3], description: 'No rotation' },
    ],
    hints: [
      'count % items.length handles count > array length',
      'slice(shift) gets elements from shift to end',
      'slice(0, shift) gets elements before shift',
    ],
    concepts: ['rotate', 'slice', 'modulo', 'spread operator'],
  },
  {
    id: 'ts-interleave',
    title: 'Interleave Arrays',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Interleave elements from two arrays like shuffling cards: a1, b1, a2, b2, and so on. Interleaving is used in merge operations, audio signal processing, round-robin scheduling, and building alternating sequences.',
    instructions: [
      'Given two arrays, interleave their elements',
      'Use flatMap to pair and flatten',
      'Handle arrays of different lengths',
    ],
    starterCode: `function interleave<A, B>(first: A[], second: B[]): (A | B)[] {
  // Interleave elements: a1, b1, a2, b2...
  // YOUR CODE HERE

}`,
    solutionCode: `function interleave<A, B>(first: A[], second: B[]): (A | B)[] {
  // Zipper merge: O(n + m) time, O(n + m) space
  // Iterate up to the longer array's length to capture all elements
  const longerLength: number = Math.max(first.length, second.length);
  const interleavedResult: (A | B)[] = [];
  for (let pairIndex = 0; pairIndex < longerLength; pairIndex++) {
    // Take from first array at this position if available
    if (pairIndex < first.length) interleavedResult.push(first[pairIndex]);
    // Then take from second array at same position if available
    if (pairIndex < second.length) interleavedResult.push(second[pairIndex]);
  }
  return interleavedResult;
}`,
    testCases: [
      {
        input: [
          [1, 2, 3],
          ['a', 'b', 'c'],
        ],
        expected: [1, 'a', 2, 'b', 3, 'c'],
        description: 'Equal length',
      },
      {
        input: [
          [1, 2],
          ['a', 'b', 'c'],
        ],
        expected: [1, 'a', 2, 'b', 'c'],
        description: 'Different lengths',
      },
    ],
    hints: [
      'Use Math.max to determine total iterations',
      'Check if index is within each array before pushing',
      'Push from first array first, then second at each index',
    ],
    concepts: ['interleave', 'loop', 'merge', 'alternating'],
  },

  // ========== SEARCH & SORT UTILITIES ==========
  {
    id: 'ts-binary-search-iterative',
    title: 'Binary Search (Iterative)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Implement iterative binary search to find a target in a sorted array, returning its index or -1. This O(log n) algorithm is the gold standard for searching and is used internally by databases, libraries, and system-level search routines.',
    instructions: [
      'Search for target in sorted array using binary search',
      'Maintain left and right pointers',
      'Narrow search space by half each iteration',
    ],
    starterCode: `function binarySearch(numbers: number[], target: number): number {
  let left: number = 0;
  let right: number = numbers.length - 1;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    // Compare numbers[mid] with target and adjust left/right
    // YOUR CODE HERE

  }

  return -1;
}`,
    solutionCode: `function binarySearch(numbers: number[], target: number): number {
  // Iterative binary search: O(log n) time, O(1) space
  // Maintain a search window that halves each iteration
  let left: number = 0;
  let right: number = numbers.length - 1;

  while (left <= right) {
    const midIndex: number = Math.floor((left + right) / 2);
    if (numbers[midIndex] === target) return midIndex;
    // Discard the half that cannot contain the target
    if (numbers[midIndex] < target) left = midIndex + 1;
    else right = midIndex - 1;
  }

  return -1;
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9], 5], expected: 2, description: 'Found in middle' },
      { input: [[1, 3, 5, 7, 9], 1], expected: 0, description: 'Found at start' },
      { input: [[1, 3, 5, 7, 9], 4], expected: -1, description: 'Not found' },
    ],
    hints: [
      'mid = Math.floor((left + right) / 2) finds middle',
      'If arr[mid] < target, search right half: left = mid + 1',
      'If arr[mid] > target, search left half: right = mid - 1',
    ],
    concepts: ['binary search', 'divide and conquer', 'logarithmic', 'sorted array'],
  },
  {
    id: 'ts-binary-search-insert',
    title: 'Binary Search Insert Position',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the index where a target should be inserted to maintain sorted order using binary search. This "search insert position" pattern is the foundation for bisect operations, sorted set insertions, and efficient range queries.',
    instructions: [
      'Find leftmost position where target could be inserted',
      'Modify binary search to find insertion point',
      'Return left pointer when search completes',
    ],
    starterCode: `function searchInsert(numbers: number[], target: number): number {
  let left: number = 0;
  let right: number = numbers.length;

  while (left < right) {
    const mid: number = Math.floor((left + right) / 2);
    // Adjust bounds to find insertion point
    // YOUR CODE HERE

  }

  return left;
}`,
    solutionCode: `function searchInsert(numbers: number[], target: number): number {
  // Lower-bound binary search: O(log n) time, O(1) space
  // Finds leftmost position where target can be inserted to keep order
  let left: number = 0;
  let right: number = numbers.length;

  while (left < right) {
    const midIndex: number = Math.floor((left + right) / 2);
    // Move left past elements strictly less than target
    if (numbers[midIndex] < target) left = midIndex + 1;
    // Keep right at mid when element >= target (potential insertion point)
    else right = midIndex;
  }

  return left;
}`,
    testCases: [
      { input: [[1, 3, 5, 6], 5], expected: 2, description: 'Existing element' },
      { input: [[1, 3, 5, 6], 2], expected: 1, description: 'Between elements' },
      { input: [[1, 3, 5, 6], 7], expected: 4, description: 'After all' },
      { input: [[1, 3, 5, 6], 0], expected: 0, description: 'Before all' },
    ],
    hints: [
      'Use left < right (not <=) as the condition',
      'right starts at arr.length (not arr.length - 1)',
      'When arr[mid] >= target, set right = mid (not mid - 1)',
    ],
    concepts: ['binary search', 'insertion point', 'lower bound'],
  },
  {
    id: 'ts-merge-sorted',
    title: 'Merge Two Sorted Arrays',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Merge two sorted arrays into a single sorted array using the two-pointer technique. This is the core merge operation in merge sort and is also used for combining sorted database results and merging event streams.',
    instructions: [
      'Given two sorted arrays, merge into one sorted array',
      'Use two pointers, one for each array',
      'Compare elements and take the smaller one',
    ],
    starterCode: `function mergeSorted(numbers1: number[], numbers2: number[]): number[] {
  const result: number[] = [];
  let i: number = 0, j: number = 0;

  while (i < numbers1.length && j < numbers2.length) {
    // Compare and push smaller element
    // YOUR CODE HERE

  }

  // Add remaining elements
  return [...result, ...numbers1.slice(i), ...numbers2.slice(j)];
}`,
    solutionCode: `function mergeSorted(numbers1: number[], numbers2: number[]): number[] {
  // Two-pointer merge: O(n + m) time, O(n + m) space
  // Compare front elements of both arrays, always taking the smaller
  const mergedResult: number[] = [];
  let indexFirst: number = 0, indexSecond: number = 0;

  while (indexFirst < numbers1.length && indexSecond < numbers2.length) {
    // Use <= to maintain stable ordering when elements are equal
    if (numbers1[indexFirst] <= numbers2[indexSecond]) {
      mergedResult.push(numbers1[indexFirst++]);
    } else {
      mergedResult.push(numbers2[indexSecond++]);
    }
  }

  // Append any remaining elements from whichever array is not exhausted
  return [...mergedResult, ...numbers1.slice(indexFirst), ...numbers2.slice(indexSecond)];
}`,
    testCases: [
      {
        input: [
          [1, 3, 5],
          [2, 4, 6],
        ],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Interleaving merge',
      },
      {
        input: [
          [1, 2],
          [3, 4, 5],
        ],
        expected: [1, 2, 3, 4, 5],
        description: 'Non-overlapping',
      },
    ],
    hints: [
      'Compare arr1[i] and arr2[j], push smaller and increment that pointer',
      'Use i++ and j++ in the push to increment after access',
      'Append remaining elements with slice',
    ],
    concepts: ['merge', 'two pointers', 'sorted arrays', 'merge sort'],
  },

  // ========== DATA STRUCTURE HELPERS ==========
  {
    id: 'ts-queue-operations',
    title: 'Queue Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Implement basic queue operations (enqueue and dequeue) to simulate FIFO ordering. Queues are foundational to BFS traversal, task scheduling, message passing systems, and buffered I/O operations in operating systems.',
    instructions: [
      'Process a list of queue operations',
      'enqueue adds to the back (push)',
      'dequeue removes from front (shift)',
    ],
    starterCode: `interface QueueOperation {
  type: 'enqueue' | 'dequeue';
  value?: number;
}

function processQueue(operations: QueueOperation[]): (number | null)[] {
  const queue: number[] = [];
  const results: (number | null)[] = [];

  for (const op of operations) {
    if (op.type === 'enqueue') {
      // Add to back of queue
      // YOUR CODE HERE
    } else if (op.type === 'dequeue') {
      // Remove from front, add to results (or null if empty)
      // YOUR CODE HERE
    }
  }

  return results;
}`,
    solutionCode: `interface QueueOperation {
  type: 'enqueue' | 'dequeue';
  value?: number;
}

function processQueue(operations: QueueOperation[]): (number | null)[] {
  // FIFO queue simulation: O(n) time for n operations, O(n) space
  // Process a sequence of enqueue/dequeue commands and collect dequeue results
  const queueBuffer: number[] = [];
  const dequeueResults: (number | null)[] = [];

  for (const operation of operations) {
    if (operation.type === 'enqueue') {
      // Add to back of queue
      queueBuffer.push(operation.value!);
    } else if (operation.type === 'dequeue') {
      // Remove from front; return null if queue is empty
      dequeueResults.push(queueBuffer.length > 0 ? queueBuffer.shift()! : null);
    }
  }

  return dequeueResults;
}`,
    testCases: [
      {
        input: [
          [
            { type: 'enqueue', value: 1 },
            { type: 'enqueue', value: 2 },
            { type: 'dequeue' },
            { type: 'dequeue' },
          ],
        ],
        expected: [1, 2],
        description: 'FIFO order',
      },
      {
        input: [[{ type: 'dequeue' }]],
        expected: [null],
        description: 'Dequeue from empty',
      },
    ],
    hints: [
      'push() adds to end of array (enqueue)',
      'shift() removes from start of array (dequeue)',
      'Check queue.length before shifting',
    ],
    concepts: ['queue', 'FIFO', 'push', 'shift'],
  },
  {
    id: 'ts-min-heap-insert',
    title: 'Min Heap Insert',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Implement the insert operation for a min heap, bubbling up to maintain the heap property (parent <= children). Min heaps power priority queues used in Dijkstra's algorithm, job scheduling, and finding top-k elements efficiently.",
    instructions: [
      'Insert value into min heap (array representation)',
      'Add to end, then "bubble up" to maintain heap property',
      'Parent of index i is at Math.floor((i-1)/2)',
    ],
    starterCode: `function heapInsert(heap: number[], value: number): number[] {
  heap.push(value);
  let i: number = heap.length - 1;

  // Bubble up while parent is greater
  while (i > 0) {
    const parent: number = Math.floor((i - 1) / 2);
    // YOUR CODE HERE: compare and swap if needed

  }

  return heap;
}`,
    solutionCode: `function heapInsert(heap: number[], value: number): number[] {
  // Bubble-up insertion: O(log n) time, O(1) space
  // Add to end then float upward until heap property is restored
  heap.push(value);
  let currentIndex: number = heap.length - 1;

  while (currentIndex > 0) {
    const parentIndex: number = Math.floor((currentIndex - 1) / 2);
    // Stop bubbling when parent is already smaller (heap property satisfied)
    if (heap[parentIndex] <= heap[currentIndex]) break;
    // Swap child with parent to move smaller value upward
    [heap[parentIndex], heap[currentIndex]] = [heap[currentIndex], heap[parentIndex]];
    currentIndex = parentIndex;
  }

  return heap;
}`,
    testCases: [
      {
        input: [[1, 3, 5], 2],
        expected: [1, 2, 5, 3],
        description: 'Insert into heap',
      },
      { input: [[], 5], expected: [5], description: 'Insert into empty heap' },
    ],
    hints: [
      'Parent index = Math.floor((i - 1) / 2)',
      'Swap with parent if current is smaller (min heap)',
      'Stop when parent is smaller or at root',
    ],
    concepts: ['heap', 'min heap', 'bubble up', 'priority queue'],
  },
  {
    id: 'ts-graph-adjacency',
    title: 'Build Adjacency List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Convert an edge list to an adjacency list representation, the foundation for all graph algorithms. Adjacency lists are the standard way to represent sparse graphs and enable efficient BFS, DFS, and shortest-path computations.',
    instructions: [
      'Given edges as [from, to] pairs, build adjacency list',
      'Handle undirected graphs by adding both directions',
      'Use object with arrays as values',
    ],
    starterCode: `function buildAdjacencyList(edges: [number, number][], directed: boolean = false): Record<number, number[]> {
  const graph: Record<number, number[]> = {};

  for (const [from, to] of edges) {
    // Add edge from -> to
    // If undirected, also add to -> from
    // YOUR CODE HERE

  }

  return graph;
}`,
    solutionCode: `function buildAdjacencyList(edges: [number, number][], directed: boolean = false): Record<number, number[]> {
  // Edge list to adjacency list conversion: O(E) time, O(V + E) space
  // Build a lookup from each node to its list of neighbors
  const adjacencyMap: Record<number, number[]> = {};

  for (const [from, to] of edges) {
    // Ensure the neighbor list exists, then append the destination
    (adjacencyMap[from] ??= []).push(to);
    if (!directed) {
      // For undirected graphs, add the reverse edge as well
      (adjacencyMap[to] ??= []).push(from);
    }
  }

  return adjacencyMap;
}`,
    testCases: [
      {
        input: [
          [
            [0, 1],
            [1, 2],
            [2, 0],
          ],
          false,
        ],
        expected: { 0: [1, 2], 1: [0, 2], 2: [1, 0] },
        description: 'Undirected triangle',
      },
      {
        input: [
          [
            [0, 1],
            [1, 2],
          ],
          true,
        ],
        expected: { 0: [1], 1: [2] },
        description: 'Directed edges',
      },
    ],
    hints: [
      'graph[from] ??= [] initializes array if needed',
      'For undirected, add edge in both directions',
      'Destructure edges as [from, to]',
    ],
    concepts: ['graph', 'adjacency list', 'edge list', 'undirected'],
  },
  {
    id: 'ts-bfs-traversal',
    title: 'BFS Graph Traversal',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Traverse a graph level by level using breadth-first search with a queue and visited set. Graph BFS finds shortest paths in unweighted graphs and is used in social network analysis, web crawling, and puzzle solving.',
    instructions: [
      'Given adjacency list and start node, return BFS traversal order',
      'Use a queue and visited set',
      'Process nodes level by level',
    ],
    starterCode: `function bfs(graph: Record<number, number[]>, start: number): number[] {
  const visited: Set<number> = new Set([start]);
  const queue: number[] = [start];
  const result: number[] = [];

  while (queue.length > 0) {
    const node: number = queue.shift()!;
    // Add node to result, then add unvisited neighbors to queue
    // YOUR CODE HERE

  }

  return result;
}`,
    solutionCode: `function bfs(graph: Record<number, number[]>, start: number): number[] {
  // Breadth-first search: O(V + E) time, O(V) space
  // Explore nodes level by level using a FIFO queue
  const visitedNodes: Set<number> = new Set([start]);
  const processingQueue: number[] = [start];
  const traversalOrder: number[] = [];

  while (processingQueue.length > 0) {
    const currentNode: number = processingQueue.shift()!;
    traversalOrder.push(currentNode);
    for (const neighbor of graph[currentNode] || []) {
      if (!visitedNodes.has(neighbor)) {
        // Mark visited before enqueuing to prevent duplicate enqueues
        visitedNodes.add(neighbor);
        processingQueue.push(neighbor);
      }
    }
  }

  return traversalOrder;
}`,
    testCases: [
      {
        input: [{ 0: [1, 2], 1: [3], 2: [3], 3: [] }, 0],
        expected: [0, 1, 2, 3],
        description: 'Basic BFS',
      },
    ],
    hints: [
      'shift() removes from front of queue (FIFO)',
      'Add to visited BEFORE adding to queue to avoid duplicates',
      'graph[node] || [] handles nodes with no edges',
    ],
    concepts: ['BFS', 'graph traversal', 'queue', 'visited set'],
  },
  {
    id: 'ts-dfs-traversal',
    title: 'DFS Graph Traversal',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Traverse a graph depth-first using recursion, exploring as deep as possible before backtracking. Graph DFS is used for cycle detection, topological sorting, connected components, and solving maze and puzzle problems.',
    instructions: [
      'Given adjacency list and start node, return DFS traversal order',
      'Use recursion with a visited set',
      'Explore each branch fully before backtracking',
    ],
    starterCode: `function dfs(graph: Record<number, number[]>, start: number): number[] {
  const visited: Set<number> = new Set();
  const result: number[] = [];

  function explore(node: number): void {
    if (visited.has(node)) return;
    // Mark visited, add to result, explore neighbors
    // YOUR CODE HERE

  }

  explore(start);
  return result;
}`,
    solutionCode: `function dfs(graph: Record<number, number[]>, start: number): number[] {
  // Recursive depth-first search: O(V + E) time, O(V) space
  // Explore each branch to its deepest node before backtracking
  const visitedNodes: Set<number> = new Set();
  const traversalOrder: number[] = [];

  function explore(currentNode: number): void {
    // Skip already-visited nodes to avoid infinite cycles
    if (visitedNodes.has(currentNode)) return;
    visitedNodes.add(currentNode);
    traversalOrder.push(currentNode);
    for (const neighbor of graph[currentNode] || []) {
      // Recurse into each unvisited neighbor (depth-first)
      explore(neighbor);
    }
  }

  explore(start);
  return traversalOrder;
}`,
    testCases: [
      {
        input: [{ 0: [1, 2], 1: [3], 2: [3], 3: [] }, 0],
        expected: [0, 1, 3, 2],
        description: 'DFS explores depth first',
      },
    ],
    hints: [
      'Check visited first to avoid cycles',
      'Add to visited and result before exploring neighbors',
      'Recursively explore each neighbor',
    ],
    concepts: ['DFS', 'graph traversal', 'recursion', 'backtracking'],
  },
  {
    id: 'ts-trie-insert',
    title: 'Trie Insert',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement the insert operation for a Trie (prefix tree), building character-by-character paths. Tries enable O(L) word lookup and are used in autocomplete, spell checking, IP routing tables, and prefix-based search engines.',
    instructions: [
      'Insert a word into a trie structure',
      'Each node is an object with character keys',
      'Mark end of word with a special key ($)',
    ],
    starterCode: `interface TrieNode {
  [key: string]: TrieNode | boolean;
  $?: boolean;
}

function trieInsert(root: TrieNode, word: string): TrieNode {
  let node: TrieNode = root;

  for (const char of word) {
    // Create node if needed, move to child
    // YOUR CODE HERE

  }

  node.$ = true; // Mark end of word
  return root;
}`,
    solutionCode: `interface TrieNode {
  [key: string]: TrieNode | boolean;
  $?: boolean;
}

function trieInsert(root: TrieNode, word: string): TrieNode {
  // Trie insertion: O(m) time, O(m) space where m = word length
  // Walk down the trie, creating nodes for missing characters
  let currentNode: TrieNode = root;

  for (const char of word) {
    // Lazily create child node if this character path does not exist
    currentNode[char] ??= {};
    currentNode = currentNode[char] as TrieNode;
  }

  // Mark this node as a complete word endpoint
  currentNode.$ = true;
  return root;
}`,
    testCases: [
      {
        input: [{}, 'cat'],
        expected: { c: { a: { t: { $: true } } } },
        description: 'Insert single word',
      },
    ],
    hints: [
      'node[char] ??= {} creates child if not exists',
      'Move node pointer down the tree: node = node[char]',
      'Use $ (or any marker) to indicate end of word',
    ],
    concepts: ['trie', 'prefix tree', 'insert', 'autocomplete'],
  },
  {
    id: 'ts-union-find',
    title: 'Union-Find (Disjoint Set)',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Implement Union-Find (Disjoint Set) with path compression for efficient connected component tracking. Union-Find is used in Kruskal's MST algorithm, network connectivity, image segmentation, and cycle detection in undirected graphs.",
    instructions: [
      'Implement find (with path compression) and union operations',
      'parent[i] = i means i is a root',
      'Path compression: make nodes point directly to root',
    ],
    starterCode: `interface UnionFind {
  find: (x: number) => number;
  union: (x: number, y: number) => void;
  parent: number[];
}

function createUnionFind(size: number): UnionFind {
  const parent: number[] = Array.from({ length: size }, (_, i) => i);

  function find(x: number): number {
    // Find root with path compression
    // YOUR CODE HERE

  }

  function union(x: number, y: number): void {
    // Unite sets containing x and y
    parent[find(x)] = find(y);
  }

  return { find, union, parent };
}`,
    solutionCode: `interface UnionFind {
  find: (x: number) => number;
  union: (x: number, y: number) => void;
  parent: number[];
}

function createUnionFind(size: number): UnionFind {
  // Union-Find with path compression: O(alpha(n)) amortized per op, O(n) space
  // Each element starts as its own set root (self-parenting)
  const parent: number[] = Array.from({ length: size }, (_, i) => i);

  function find(x: number): number {
    if (parent[x] !== x) {
      // Path compression: flatten tree by pointing directly to root
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x: number, y: number): void {
    // Merge two disjoint sets by linking root of x to root of y
    parent[find(x)] = find(y);
  }

  return { find, union, parent };
}`,
    testCases: [
      {
        input: [5],
        expected: 'Creates union-find structure',
        description: 'Initialize with 5 elements',
      },
    ],
    hints: [
      'Path compression: parent[x] = find(parent[x])',
      'If parent[x] === x, then x is the root',
      'Union links root of x to root of y',
    ],
    concepts: ['union-find', 'disjoint set', 'path compression', 'connected components'],
  },

  // ========== ADDITIONAL BUILDING BLOCKS ==========
  {
    id: 'ts-compose-functions',
    title: 'Compose Functions',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Create a function composer that chains functions right-to-left: compose(f, g, h)(x) = f(g(h(x))). Function composition is a cornerstone of functional programming, enabling pipeline construction, middleware chaining, and modular code design.',
    instructions: [
      'Create a compose function that takes multiple functions',
      'Return a function that applies them right-to-left',
      'Use reduceRight to chain the functions',
    ],
    starterCode: `function compose<T>(...transforms: Array<(value: T) => T>): (value: T) => T {
  // Return a function that applies transforms right-to-left
  // YOUR CODE HERE

}`,
    solutionCode: `function compose<T>(...transforms: Array<(value: T) => T>): (value: T) => T {
  // Right-to-left function composition: O(n) per call, O(1) space
  // reduceRight applies the last function first, matching mathematical notation
  return (value: T): T => transforms.reduceRight((accumulated, transform) => transform(accumulated), value);
}`,
    testCases: [
      {
        input: [[(x: number) => x + 1, (x: number) => x * 2, (x: number) => x - 3], 5],
        expected: 5,
        description: 'compose(add1, mul2, sub3)(5) = ((5-3)*2)+1 = 5',
      },
    ],
    hints: [
      'reduceRight applies functions from right to left',
      'Start with x as initial value',
      'Each step applies the next function to accumulated result',
    ],
    concepts: ['compose', 'reduceRight', 'functional programming', 'higher-order'],
  },
  {
    id: 'ts-pipe-functions',
    title: 'Pipe Functions',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Create a pipe function that chains functions left-to-right: pipe(f, g, h)(x) = h(g(f(x))). Pipe is the readable counterpart to compose, widely used in data transformation pipelines, Redux middleware, and RxJS operators.',
    instructions: [
      'Create a pipe function that takes multiple functions',
      'Return a function that applies them left-to-right',
      'Use reduce to chain the functions',
    ],
    starterCode: `function pipe<T>(...transforms: Array<(value: T) => T>): (value: T) => T {
  // Return a function that applies transforms left-to-right
  // YOUR CODE HERE

}`,
    solutionCode: `function pipe<T>(...transforms: Array<(value: T) => T>): (value: T) => T {
  // Left-to-right function pipeline: O(n) per call, O(1) space
  // Data flows through transforms in the order they are written
  return (value: T): T => transforms.reduce((accumulated, transform) => transform(accumulated), value);
}`,
    testCases: [
      {
        input: [[(x: number) => x - 3, (x: number) => x * 2, (x: number) => x + 1], 5],
        expected: 5,
        description: 'pipe(sub3, mul2, add1)(5) = ((5-3)*2)+1 = 5',
      },
    ],
    hints: [
      'reduce applies functions from left to right',
      'More intuitive reading order than compose',
      'Data flows through functions in written order',
    ],
    concepts: ['pipe', 'reduce', 'functional programming', 'data flow'],
  },
  {
    id: 'ts-curry-function',
    title: 'Curry Function',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Convert a multi-argument function into a chain of single-argument functions (currying). Currying enables partial application, function factory patterns, and point-free style programming common in functional JavaScript and library design.',
    instructions: [
      'Curry transforms f(a, b, c) into f(a)(b)(c)',
      'Check if enough arguments have been collected',
      'If not, return a function that collects more',
    ],
    starterCode: `function curry(callback: (...args: any[]) => any): (...args: any[]) => any {
  // Return curried version of callback
  // YOUR CODE HERE

}`,
    solutionCode: `function curry(callback: (...args: any[]) => any): (...args: any[]) => any {
  // Recursive currying: O(1) per partial call, O(n) total for n args
  // Collect arguments until we have enough to invoke the original function
  return function curried(...collectedArgs: any[]): any {
    // When we have enough args, invoke the original callback
    if (collectedArgs.length >= callback.length) {
      return callback(...collectedArgs);
    }
    // Otherwise return a new function that accumulates more arguments
    return (...additionalArgs: any[]) => curried(...collectedArgs, ...additionalArgs);
  };
}`,
    testCases: [
      {
        input: [(a: number, b: number, c: number) => a + b + c],
        expected: 'curried function',
        description: 'Creates curried function',
      },
    ],
    hints: [
      'fn.length gives the number of expected arguments',
      'If enough args, call the function',
      'Otherwise, return a function collecting more args',
    ],
    concepts: ['curry', 'partial application', 'arity', 'closures'],
  },
  {
    id: 'ts-unique-by',
    title: 'Unique By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Remove duplicates from an array based on a key function, keeping the first occurrence of each key. UniqueBy is essential for deduplicating API results, database records, and normalizing datasets where identity is determined by a computed key.',
    instructions: [
      'Given array and key function, return unique elements by key',
      'Keep the first element for each unique key',
      'Use a Set to track seen keys',
    ],
    starterCode: `function uniqueBy<T>(items: T[], keyFn: (item: T) => string | number): T[] {
  // Return array with unique elements by key
  // YOUR CODE HERE

}`,
    solutionCode: `function uniqueBy<T>(items: T[], keyFn: (item: T) => string | number): T[] {
  // Set-based deduplication: O(n) time, O(k) space where k = unique keys
  // Track which keys have been encountered; keep only the first occurrence
  const encounteredKeys: Set<string | number> = new Set();
  return items.filter((item: T) => {
    const derivedKey: string | number = keyFn(item);
    // Skip duplicates that share the same derived key
    if (encounteredKeys.has(derivedKey)) return false;
    encounteredKeys.add(derivedKey);
    return true;
  });
}`,
    testCases: [
      {
        input: [
          [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' },
            { id: 1, name: 'c' },
          ],
          (x: { id: number }) => x.id,
        ],
        expected: [
          { id: 1, name: 'a' },
          { id: 2, name: 'b' },
        ],
        description: 'Unique by id',
      },
    ],
    hints: [
      'Use Set to track seen keys',
      'Filter to keep only first occurrence',
      'Key function extracts the unique identifier',
    ],
    concepts: ['unique', 'Set', 'filter', 'deduplication'],
  },
  {
    id: 'ts-difference',
    title: 'Array Difference',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Find elements in the first array that are not present in the second array (set difference). Array difference is used for computing changeset diffs, filtering exclusion lists, and synchronizing datasets between client and server.',
    instructions: [
      'Return elements from arr1 not present in arr2',
      'Use Set for O(1) lookup',
      'Filter arr1 checking membership in arr2',
    ],
    starterCode: `function difference<T>(items: T[], excludeItems: T[]): T[] {
  // Return elements in items but not in excludeItems
  // YOUR CODE HERE

}`,
    solutionCode: `function difference<T>(items: T[], excludeItems: T[]): T[] {
  // Set difference: O(n + m) time, O(m) space
  // Convert exclusion list to Set for O(1) membership checks
  const exclusionLookup: Set<T> = new Set(excludeItems);
  // Keep only elements not found in the exclusion set
  return items.filter((element: T) => !exclusionLookup.has(element));
}`,
    testCases: [
      {
        input: [
          [1, 2, 3, 4, 5],
          [2, 4],
        ],
        expected: [1, 3, 5],
        description: 'Remove 2 and 4',
      },
    ],
    hints: [
      'Convert arr2 to Set for fast lookup',
      'Filter arr1 keeping items not in Set',
      'Set.has() is O(1)',
    ],
    concepts: ['difference', 'Set', 'filter', 'set operations'],
  },
  {
    id: 'ts-intersection',
    title: 'Array Intersection',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Find elements that exist in both arrays (set intersection). Intersection is used in permission checking, feature flag evaluation, common-friend queries, and any scenario requiring shared-element detection between two collections.',
    instructions: [
      'Return elements present in both arr1 and arr2',
      'Use Set for efficient lookup',
      'Filter arr1 for items also in arr2',
    ],
    starterCode: `function intersection<T>(items: T[], otherItems: T[]): T[] {
  // Return elements in both arrays
  // YOUR CODE HERE

}`,
    solutionCode: `function intersection<T>(items: T[], otherItems: T[]): T[] {
  // Set intersection: O(n + m) time, O(m) space
  // Convert second array to Set for O(1) membership checks
  const membershipLookup: Set<T> = new Set(otherItems);
  // Keep only elements present in both collections
  return items.filter((element: T) => membershipLookup.has(element));
}`,
    testCases: [
      {
        input: [
          [1, 2, 3, 4],
          [3, 4, 5, 6],
        ],
        expected: [3, 4],
        description: 'Common elements',
      },
    ],
    hints: [
      'Convert arr2 to Set',
      'Filter arr1 keeping items in Set',
      'Intersection = items in both',
    ],
    concepts: ['intersection', 'Set', 'filter', 'set operations'],
  },
  {
    id: 'ts-take-while',
    title: 'Take While',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Take elements from the start of an array while a predicate holds true, stopping at the first false. TakeWhile is a lazy evaluation pattern used in stream processing, parsing tokens, and extracting leading runs of matching elements.',
    instructions: [
      'Return elements from start while predicate returns true',
      'Stop as soon as predicate returns false',
      'Use a loop or findIndex with slice',
    ],
    starterCode: `function takeWhile<T>(items: T[], predicate: (value: T) => boolean): T[] {
  // Take elements while predicate is true
  // YOUR CODE HERE

}`,
    solutionCode: `function takeWhile<T>(items: T[], predicate: (value: T) => boolean): T[] {
  // findIndex approach: O(n) time, O(k) space where k = taken elements
  // Locate the first element that fails the predicate
  const firstFailIndex: number = items.findIndex((value: T) => !predicate(value));
  // If no element fails, take everything; otherwise slice up to the failure point
  return firstFailIndex === -1 ? items : items.slice(0, firstFailIndex);
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5, 1], (x: number) => x < 4],
        expected: [1, 2, 3],
        description: 'Take while less than 4',
      },
    ],
    hints: [
      'findIndex finds first element failing predicate',
      'If all pass (idx === -1), return entire array',
      'Otherwise slice up to that index',
    ],
    concepts: ['takeWhile', 'findIndex', 'slice', 'predicate'],
  },
  {
    id: 'ts-drop-while',
    title: 'Drop While',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Drop elements from the start of an array while a predicate holds true, returning the remaining elements. DropWhile is used in parsing, skipping headers or whitespace, and finding the first element that breaks a pattern.',
    instructions: [
      'Skip elements while predicate returns true',
      'Return remaining elements after first false',
      'Use findIndex to find where to start keeping',
    ],
    starterCode: `function dropWhile<T>(items: T[], predicate: (value: T) => boolean): T[] {
  // Drop elements while predicate is true
  // YOUR CODE HERE

}`,
    solutionCode: `function dropWhile<T>(items: T[], predicate: (value: T) => boolean): T[] {
  // findIndex approach: O(n) time, O(k) space where k = remaining elements
  // Locate the first element that fails the predicate
  const firstKeepIndex: number = items.findIndex((value: T) => !predicate(value));
  // If all elements pass, nothing remains; otherwise keep from first failure onward
  return firstKeepIndex === -1 ? [] : items.slice(firstKeepIndex);
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5, 1], (x: number) => x < 4],
        expected: [4, 5, 1],
        description: 'Drop while less than 4',
      },
    ],
    hints: [
      'findIndex finds first element failing predicate',
      'If all pass, return empty array',
      'Slice from that index to end',
    ],
    concepts: ['dropWhile', 'findIndex', 'slice', 'predicate'],
  },
  {
    id: 'ts-sample-array',
    title: 'Random Sample',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Select n random elements from an array without replacement using the Fisher-Yates shuffle approach. Random sampling is used for A/B testing, data science, generating random subsets, and Monte Carlo simulations.',
    instructions: [
      'Return n random elements from the array',
      'Each element should only appear once (no replacement)',
      'Shuffle and take first n, or use Fisher-Yates partial',
    ],
    starterCode: `function sample<T>(items: T[], count: number): T[] {
  // Return count random elements
  // YOUR CODE HERE

}`,
    solutionCode: `function sample<T>(items: T[], count: number): T[] {
  // Partial Fisher-Yates shuffle: O(k) time, O(n) space where k = count
  // Only shuffle the first k positions instead of the entire array
  const shuffleCopy: T[] = [...items];
  const sampled: T[] = [];
  const sampleSize: number = Math.min(count, shuffleCopy.length);
  for (let position = 0; position < sampleSize; position++) {
    // Pick a random index from the unshuffled portion
    const randomIndex: number = Math.floor(Math.random() * (shuffleCopy.length - position)) + position;
    // Swap chosen element into the current position
    [shuffleCopy[position], shuffleCopy[randomIndex]] = [shuffleCopy[randomIndex], shuffleCopy[position]];
    sampled.push(shuffleCopy[position]);
  }
  return sampled;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], 3],
        expected: 'array of 3 elements',
        description: 'Sample 3 from 5',
      },
    ],
    hints: [
      'Partial Fisher-Yates shuffle',
      'Only shuffle first n positions',
      'Swap random element into position i',
    ],
    concepts: ['sample', 'shuffle', 'Fisher-Yates', 'random'],
  },
  {
    id: 'ts-compact',
    title: 'Compact Array',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Remove all falsy values (false, 0, "", null, undefined, NaN) from an array. Compact is a common data-cleaning utility used to sanitize user input, filter incomplete records, and prepare arrays for safe processing.',
    instructions: [
      'Filter out all falsy values from array',
      'Keep only truthy values',
      'Use Boolean as filter predicate',
    ],
    starterCode: `function compact<T>(items: (T | false | 0 | '' | null | undefined)[]): T[] {
  // Remove all falsy values
  // YOUR CODE HERE

}`,
    solutionCode: `function compact<T>(items: (T | false | 0 | '' | null | undefined)[]): T[] {
  // Boolean filter: O(n) time, O(k) space where k = truthy elements
  // Boolean constructor coerces each value; falsy values become false and are excluded
  return items.filter(Boolean) as T[];
}`,
    testCases: [
      {
        input: [[0, 1, false, 2, '', 3, null, undefined, NaN]],
        expected: [1, 2, 3],
        description: 'Remove falsy values',
      },
    ],
    hints: [
      'Boolean(x) returns false for falsy values',
      'Pass Boolean as the filter callback',
      'Simple one-liner!',
    ],
    concepts: ['compact', 'filter', 'Boolean', 'truthy'],
  },
  {
    id: 'ts-count-by',
    title: 'Count By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Count elements grouped by the result of a key function, returning a frequency map. CountBy is like groupBy but returns counts instead of groups, useful for histograms, analytics dashboards, and summarizing categorical data.',
    instructions: [
      'Given array and key function, count elements by key',
      'Return object mapping keys to counts',
      'Similar to frequencyCount but with custom key',
    ],
    starterCode: `function countBy<T>(items: T[], keyFn: (item: T) => string | number): Record<string, number> {
  // Count elements by key
  // YOUR CODE HERE

}`,
    solutionCode: `function countBy<T>(items: T[], keyFn: (item: T) => string | number): Record<string, number> {
  // Key-based frequency counting: O(n) time, O(k) space where k = unique keys
  // Apply keyFn to derive a grouping key, then tally occurrences per key
  return items.reduce((tallies: Record<string, number>, item: T) => {
    const groupKey: string = String(keyFn(item));
    // Default to 0 for first occurrence, then increment
    tallies[groupKey] = (tallies[groupKey] || 0) + 1;
    return tallies;
  }, {});
}`,
    testCases: [
      {
        input: [[6.1, 4.2, 6.3], Math.floor],
        expected: { 4: 1, 6: 2 },
        description: 'Count by floor value',
      },
    ],
    hints: [
      'Apply keyFn to get the grouping key',
      'Increment count for that key',
      'Like frequency counter with custom key extractor',
    ],
    concepts: ['countBy', 'reduce', 'aggregation', 'key function'],
  },
  {
    id: 'ts-sum-by',
    title: 'Sum By Key',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Sum numeric values extracted by a function from array elements. SumBy is a data aggregation utility used in financial calculations, report totals, and reducing complex objects to scalar summaries by a specified field.',
    instructions: [
      'Given array and value function, sum the extracted values',
      'Apply valueFn to each element, sum the results',
      'Use reduce with valueFn',
    ],
    starterCode: `function sumBy<T>(items: T[], valueFn: (item: T) => number): number {
  // Sum values extracted by valueFn
  // YOUR CODE HERE

}`,
    solutionCode: `function sumBy<T>(items: T[], valueFn: (item: T) => number): number {
  // Reduce-based summation: O(n) time, O(1) space
  // Extract a numeric value from each element and accumulate the total
  return items.reduce((runningTotal: number, item: T) => runningTotal + valueFn(item), 0);
}`,
    testCases: [
      {
        input: [[{ n: 4 }, { n: 2 }, { n: 8 }], (o: { n: number }) => o.n],
        expected: 14,
        description: 'Sum n properties',
      },
    ],
    hints: [
      'Apply valueFn to extract numeric value',
      'Reduce to sum all extracted values',
      'Initial value is 0',
    ],
    concepts: ['sumBy', 'reduce', 'aggregation', 'extraction'],
  },
  {
    id: 'ts-max-by',
    title: 'Max By Key',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Find the element with the maximum value for a given key function. MaxBy is used for finding top performers, highest scores, most recent records, and any scenario where you need the best element by a computed metric.',
    instructions: [
      'Given array and key function, find element with max key value',
      'Return the element itself, not the key value',
      'Use reduce to track max',
    ],
    starterCode: `function maxBy<T>(items: T[], keyFn: (item: T) => number): T | undefined {
  // Find element with maximum key value
  // YOUR CODE HERE

}`,
    solutionCode: `function maxBy<T>(items: T[], keyFn: (item: T) => number): T | undefined {
  // Linear scan for maximum: O(n) time, O(1) space
  if (items.length === 0) return undefined;
  // Reduce without initial value starts with first element as the candidate
  return items.reduce((currentMax: T, candidate: T) =>
    // Replace current max only when candidate has a strictly greater key
    keyFn(candidate) > keyFn(currentMax) ? candidate : currentMax
  );
}`,
    testCases: [
      {
        input: [[{ n: 1 }, { n: 3 }, { n: 2 }], (o: { n: number }) => o.n],
        expected: { n: 3 },
        description: 'Max by n property',
      },
    ],
    hints: [
      'Compare keyFn(item) > keyFn(max)',
      'Return the item, not the key value',
      'Reduce without initial value starts with first element',
    ],
    concepts: ['maxBy', 'reduce', 'comparison', 'key function'],
  },
  {
    id: 'ts-trie-search',
    title: 'Trie Search',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement the search operation for a Trie, checking if a complete word exists (not just a prefix). Trie search distinguishes between prefixes and complete words, which is critical for dictionary lookup, spell checking, and word validation.',
    instructions: [
      'Search for a word in the trie',
      'Traverse character by character',
      'Return true only if word ends at a terminal node ($)',
    ],
    starterCode: `interface TrieNode {
  [key: string]: TrieNode | boolean;
  $?: boolean;
}

function trieSearch(root: TrieNode, word: string): boolean {
  let node: TrieNode = root;

  for (const char of word) {
    // Navigate to child, return false if not exists
    // YOUR CODE HERE

  }

  return !!node.$;
}`,
    solutionCode: `interface TrieNode {
  [key: string]: TrieNode | boolean;
  $?: boolean;
}

function trieSearch(root: TrieNode, word: string): boolean {
  // Trie lookup: O(m) time, O(1) space where m = word length
  // Walk down the trie following each character in the word
  let currentNode: TrieNode = root;

  for (const char of word) {
    // If the character path does not exist, the word is not in the trie
    if (!currentNode[char]) return false;
    currentNode = currentNode[char] as TrieNode;
  }

  // A prefix match is not enough; the node must be marked as a word endpoint
  return !!currentNode.$;
}`,
    testCases: [
      {
        input: [{ c: { a: { t: { $: true } } } }, 'cat'],
        expected: true,
        description: 'Word exists',
      },
      {
        input: [{ c: { a: { t: { $: true } } } }, 'ca'],
        expected: false,
        description: 'Prefix only, not complete word',
      },
    ],
    hints: [
      'Check if child exists before traversing',
      'Return false if any character is missing',
      'Only return true if node has $ marker',
    ],
    concepts: ['trie', 'search', 'prefix tree', 'word lookup'],
  },
  {
    id: 'ts-topological-sort',
    title: 'Topological Sort',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Sort nodes in a directed acyclic graph (DAG) so that for every edge u->v, u appears before v. Topological sort is used for dependency resolution in build systems, course scheduling, task ordering, and package managers.',
    instructions: [
      'Given adjacency list of DAG, return topological order',
      "Use Kahn's algorithm with in-degree counting",
      'Start with nodes having in-degree 0',
    ],
    starterCode: `function topologicalSort(graph: Record<string, string[]>): string[] {
  const inDegree: Record<string, number> = {};
  const result: string[] = [];

  // Initialize in-degrees
  for (const node in graph) {
    inDegree[node] ??= 0;
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  // YOUR CODE HERE: BFS from nodes with in-degree 0

  return result;
}`,
    solutionCode: `function topologicalSort(graph: Record<string, string[]>): string[] {
  // Kahn's algorithm (BFS-based): O(V + E) time, O(V) space
  // Process nodes with no incoming edges first, peeling layers of the DAG
  const inDegreeCount: Record<string, number> = {};
  const sortedOrder: string[] = [];

  // Count how many edges point into each node
  for (const node in graph) {
    inDegreeCount[node] ??= 0;
    for (const neighbor of graph[node]) {
      inDegreeCount[neighbor] = (inDegreeCount[neighbor] || 0) + 1;
    }
  }

  // Seed the queue with nodes that have no dependencies (in-degree 0)
  const processingQueue: string[] = Object.keys(inDegreeCount).filter((node: string) => inDegreeCount[node] === 0);

  while (processingQueue.length) {
    const currentNode: string = processingQueue.shift()!;
    sortedOrder.push(currentNode);
    for (const neighbor of graph[currentNode] || []) {
      // Removing this node effectively removes its outgoing edges
      inDegreeCount[neighbor]--;
      // When a neighbor has no more incoming edges, it is ready to process
      if (inDegreeCount[neighbor] === 0) processingQueue.push(neighbor);
    }
  }

  return sortedOrder;
}`,
    testCases: [
      {
        input: [{ a: ['b', 'c'], b: ['d'], c: ['d'], d: [] }],
        expected: ['a', 'b', 'c', 'd'],
        description: 'Simple DAG',
      },
    ],
    hints: [
      'Count in-degrees: how many edges point to each node',
      'Start with nodes having in-degree 0 (no dependencies)',
      'When processing a node, decrement in-degree of its neighbors',
    ],
    concepts: ['topological sort', 'DAG', 'Kahn algorithm', 'dependency order'],
  },

  // ========== ITERATION PATTERNS (Two Pointers, Sliding Window, Prefix, etc.) ==========
  {
    id: 'ts-two-pointer-palindrome',
    title: 'Two-Pointer Palindrome Check',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Check if an array reads the same forwards and backwards using two pointers converging from opposite ends. The two-pointer technique is a space-efficient O(n) approach fundamental to palindrome, two-sum, and container problems.',
    instructions: [
      'Given an array, return true if it is a palindrome (reads the same forwards and backwards)',
      'Use two pointers: one starting at the beginning, one at the end',
      'Move them toward each other, comparing elements at each step',
      'Return false as soon as a mismatch is found',
    ],
    starterCode: `function isPalindrome<T>(items: T[]): boolean {
  // Use two pointers from opposite ends
  // YOUR CODE HERE
}`,
    solutionCode: `function isPalindrome<T>(items: T[]): boolean {
  // Converging two-pointer approach: O(n) time, O(1) space
  // Compare mirror positions from both ends moving inward
  let leftIndex: number = 0;
  let rightIndex: number = items.length - 1;
  while (leftIndex < rightIndex) {
    // Any mismatch means the array is not symmetric
    if (items[leftIndex] !== items[rightIndex]) return false;
    leftIndex++;
    rightIndex--;
  }
  // All mirror pairs matched; the array is a palindrome
  return true;
}`,
    testCases: [
      { input: [[1, 2, 3, 2, 1]], expected: true, description: 'Odd-length palindrome' },
      { input: [[1, 2, 2, 1]], expected: true, description: 'Even-length palindrome' },
      { input: [[1, 2, 3, 4, 5]], expected: false, description: 'Not a palindrome' },
      { input: [[1]], expected: true, description: 'Single element' },
      { input: [[]], expected: true, description: 'Empty array' },
    ],
    hints: [
      'Initialize left = 0 and right = arr.length - 1',
      'Loop while left < right',
      'If arr[left] !== arr[right], it is not a palindrome',
    ],
    concepts: ['two pointers', 'converging pointers', 'palindrome check'],
  },
  {
    id: 'ts-two-pointer-remove-dupes',
    title: 'Remove Duplicates from Sorted Array',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Remove duplicates from a sorted array in-place using two same-direction pointers, returning the new length. This pattern modifies arrays without extra space and is a classic interview problem testing in-place algorithm design.',
    instructions: [
      'Given a sorted array, remove duplicates in-place so each element appears only once',
      'Use a slow pointer to track the write position and a fast pointer to scan ahead',
      'Return the new length (number of unique elements)',
      'The array should be modified in-place with unique elements at the front',
    ],
    starterCode: `function removeDuplicates(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  // Use two same-direction pointers: slow (write) and fast (read)
  // YOUR CODE HERE
}`,
    solutionCode: `function removeDuplicates(numbers: number[]): number {
  // Two same-direction pointers: O(n) time, O(1) space
  // writePos anchors the last unique value; scanner finds the next distinct element
  if (numbers.length === 0) return 0;
  let writePos: number = 0;
  for (let scanner: number = 1; scanner < numbers.length; scanner++) {
    // Only advance write position when a new unique value is found
    if (numbers[scanner] !== numbers[writePos]) {
      writePos++;
      numbers[writePos] = numbers[scanner];
    }
  }
  // writePos is zero-indexed, so unique count is writePos + 1
  return writePos + 1;
}`,
    testCases: [
      { input: [[1, 1, 2]], expected: 2, description: 'Simple duplicates' },
      { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5, description: 'Multiple duplicates' },
      { input: [[1, 2, 3]], expected: 3, description: 'No duplicates' },
      { input: [[1, 1, 1, 1]], expected: 1, description: 'All same' },
      { input: [[5]], expected: 1, description: 'Single element' },
    ],
    hints: [
      'slow starts at 0, fast starts at 1',
      'When arr[fast] !== arr[slow], increment slow and copy arr[fast] to arr[slow]',
      'The answer is slow + 1',
    ],
    concepts: ['two pointers', 'same-direction pointers', 'in-place modification'],
  },
  {
    id: 'ts-sliding-window-max-sum',
    title: 'Maximum Sum of K Consecutive Elements',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the maximum sum of k consecutive elements using a fixed-size sliding window. This O(n) technique avoids recomputing sums from scratch and is the key pattern for moving averages, signal processing, and subarray optimization.',
    instructions: [
      'Given an array of numbers and an integer k, find the maximum sum of any k consecutive elements',
      'Use a sliding window: compute the first window sum, then slide by subtracting the leaving element and adding the entering element',
      'Return the maximum sum found',
    ],
    starterCode: `function maxSumOfK(numbers: number[], windowSize: number): number | null {
  if (numbers.length < windowSize) return null;
  // Compute the first window, then slide
  // YOUR CODE HERE
}`,
    solutionCode: `function maxSumOfK(numbers: number[], windowSize: number): number | null {
  // Fixed-size sliding window: O(n) time, O(1) space
  // Compute first window, then slide by adding/removing one element at a time
  if (numbers.length < windowSize) return null;
  let windowSum: number = 0;
  // Build the initial window of size k
  for (let idx = 0; idx < windowSize; idx++) {
    windowSum += numbers[idx];
  }
  let maxSum: number = windowSum;
  for (let idx = windowSize; idx < numbers.length; idx++) {
    // Slide: add the entering element, subtract the leaving element
    windowSum += numbers[idx] - numbers[idx - windowSize];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
    testCases: [
      { input: [[2, 1, 5, 1, 3, 2], 3], expected: 9, description: 'Window of 3: [5,1,3]=9' },
      { input: [[2, 3, 4, 1, 5], 2], expected: 7, description: 'Window of 2: [3,4]=7' },
      { input: [[1, 1, 1, 1, 1], 3], expected: 3, description: 'Uniform array' },
      { input: [[5], 1], expected: 5, description: 'Single element window' },
      { input: [[-1, -2, -3, -4], 2], expected: -3, description: 'Negative numbers' },
    ],
    hints: [
      'First compute the sum of elements 0 through k-1',
      'Then slide: add arr[i] and subtract arr[i - k]',
      'Track the maximum sum seen during the slide',
    ],
    concepts: ['sliding window', 'fixed window', 'running sum'],
  },
  {
    id: 'ts-sliding-window-min-subarray',
    title: 'Minimum Length Subarray with Sum >= Target',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the shortest contiguous subarray whose sum meets or exceeds a target using a variable-size sliding window. This expand-and-shrink technique is used for minimum window problems, bandwidth allocation, and resource optimization.',
    instructions: [
      'Given an array of positive integers and a target, find the minimal length of a contiguous subarray with sum >= target',
      'Use a variable-size sliding window: expand the right end, and shrink from the left when sum >= target',
      'Return 0 if no such subarray exists',
    ],
    starterCode: `function minSubarrayLen(target: number, numbers: number[]): number {
  // Variable-size sliding window
  // YOUR CODE HERE
}`,
    solutionCode: `function minSubarrayLen(target: number, numbers: number[]): number {
  // Variable-size sliding window: O(n) time, O(1) space
  // Expand right to grow sum, shrink left to find minimal valid window
  let shortestLength: number = Infinity;
  let runningSum: number = 0;
  let left: number = 0;
  for (let right = 0; right < numbers.length; right++) {
    runningSum += numbers[right];
    // Shrink from the left while the window sum meets the target
    while (runningSum >= target) {
      shortestLength = Math.min(shortestLength, right - left + 1);
      runningSum -= numbers[left];
      left++;
    }
  }
  // Infinity means no valid subarray was found
  return shortestLength === Infinity ? 0 : shortestLength;
}`,
    testCases: [
      { input: [7, [2, 3, 1, 2, 4, 3]], expected: 2, description: 'Subarray [4,3] has sum 7' },
      { input: [4, [1, 4, 4]], expected: 1, description: 'Single element meets target' },
      {
        input: [11, [1, 1, 1, 1, 1, 1, 1, 1]],
        expected: 0,
        description: 'No subarray meets target',
      },
      {
        input: [15, [5, 1, 3, 5, 10, 7, 4, 9, 2, 8]],
        expected: 2,
        description: 'Subarray [10,7]=17',
      },
      { input: [3, [1, 1, 1]], expected: 3, description: 'Entire array needed' },
    ],
    hints: [
      'Expand the window by moving right pointer and adding to sum',
      'When sum >= target, try shrinking from the left to find a shorter subarray',
      'Track the minimum length found',
    ],
    concepts: ['sliding window', 'variable window', 'shrink-expand pattern'],
  },
  {
    id: 'ts-prefix-sum',
    title: 'Build Prefix Sum Array',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Build a prefix sum array where prefixSum[i] = sum of elements from index 0 to i. Prefix sums enable O(1) range sum queries after O(n) preprocessing, a technique used in image processing, databases, and competitive programming.',
    instructions: [
      'Given an array of numbers, return a new array where each element is the cumulative sum up to that index',
      'prefixSum[0] = arr[0], prefixSum[1] = arr[0] + arr[1], etc.',
      'This pattern enables O(1) range sum queries',
    ],
    starterCode: `function prefixSum(numbers: number[]): number[] {
  // Build prefix sum array
  // YOUR CODE HERE
}`,
    solutionCode: `function prefixSum(numbers: number[]): number[] {
  // Cumulative sum array: O(n) time, O(n) space
  // Each element stores the sum of all values from index 0 up to that index
  if (numbers.length === 0) return [];
  const cumulativeSums: number[] = [numbers[0]];
  for (let idx = 1; idx < numbers.length; idx++) {
    // Build on the previous cumulative sum to avoid re-summing
    cumulativeSums.push(cumulativeSums[idx - 1] + numbers[idx]);
  }
  return cumulativeSums;
}`,
    testCases: [
      { input: [[1, 2, 3, 4]], expected: [1, 3, 6, 10], description: 'Basic prefix sum' },
      { input: [[5, 5, 5]], expected: [5, 10, 15], description: 'Uniform values' },
      { input: [[10]], expected: [10], description: 'Single element' },
      { input: [[1, -1, 1, -1]], expected: [1, 0, 1, 0], description: 'Alternating signs' },
      { input: [[]], expected: [], description: 'Empty array' },
    ],
    hints: ['Start with prefix[0] = arr[0]', 'Each subsequent element is prefix[i-1] + arr[i]'],
    concepts: ['prefix sum', 'cumulative sum', 'range query preprocessing'],
  },
  {
    id: 'ts-prefix-product',
    title: 'Product of Array Except Self',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Build an array where each element is the product of all other elements without using division. This left-right product technique runs in O(n) time and O(n) space, commonly asked in interviews to test array manipulation skills.',
    instructions: [
      'Given an array of numbers, return a new array where result[i] is the product of all elements except arr[i]',
      'Do NOT use division',
      'Use two passes: build a left-product prefix, then multiply by a right-product suffix',
    ],
    starterCode: `function productExceptSelf(numbers: number[]): number[] {
  // Two-pass: left products then right products
  // YOUR CODE HERE
}`,
    solutionCode: `function productExceptSelf(numbers: number[]): number[] {
  // Two-pass prefix/suffix product: O(n) time, O(1) extra space (output not counted)
  // Avoids division by building left products then multiplying by right products
  const totalElements: number = numbers.length;
  const result: number[] = new Array(totalElements).fill(1);
  // First pass: result[i] = product of all elements to the left of i
  let runningLeftProduct: number = 1;
  for (let idx = 0; idx < totalElements; idx++) {
    result[idx] = runningLeftProduct;
    runningLeftProduct *= numbers[idx];
  }
  // Second pass: multiply each result[i] by the product of all elements to the right
  let runningRightProduct: number = 1;
  for (let idx = totalElements - 1; idx >= 0; idx--) {
    result[idx] *= runningRightProduct;
    runningRightProduct *= numbers[idx];
  }
  return result;
}`,
    testCases: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6], description: 'Basic case' },
      { input: [[2, 3, 5]], expected: [15, 10, 6], description: 'Three elements' },
      { input: [[1, 1, 1, 1]], expected: [1, 1, 1, 1], description: 'All ones' },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0], description: 'Contains zero' },
    ],
    hints: [
      'First pass: result[i] = product of all elements to the left of i',
      'Second pass (right to left): multiply result[i] by the product of all elements to the right of i',
      'Use a running product variable in each pass',
    ],
    concepts: ['prefix product', 'suffix product', 'two-pass technique'],
  },
  {
    id: 'ts-difference-array',
    title: 'Difference Array Range Updates',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Apply multiple range updates to an array efficiently using the difference array technique. Instead of updating each element in a range, mark only boundaries for O(1) per update, then reconstruct in a single O(n) pass.',
    instructions: [
      'Given an array length n (initialized to zeros) and a list of updates [start, end, value], apply all updates and return the final array',
      'Each update adds value to all elements from index start to end (inclusive)',
      'Use a difference array: for each update, add value at start and subtract at end+1, then compute prefix sums',
    ],
    starterCode: `function applyRangeUpdates(size: number, updates: [number, number, number][]): number[] {
  // Use difference array technique
  // YOUR CODE HERE
}`,
    solutionCode: `function applyRangeUpdates(size: number, updates: [number, number, number][]): number[] {
  // Difference array technique: O(n + u) time, O(n) space (u = number of updates)
  // Encodes range additions as two point operations, then reconstructs via prefix sum
  const differenceArray: number[] = new Array(size + 1).fill(0);
  for (const [start, end, value] of updates) {
    // Mark the start of the range increment
    differenceArray[start] += value;
    // Mark the position after the end to cancel the increment
    if (end + 1 <= size) differenceArray[end + 1] -= value;
  }
  // Reconstruct the final array by computing prefix sum of the difference array
  const result: number[] = new Array(size);
  result[0] = differenceArray[0];
  for (let idx = 1; idx < size; idx++) {
    result[idx] = result[idx - 1] + differenceArray[idx];
  }
  return result;
}`,
    testCases: [
      {
        input: [
          5,
          [
            [1, 3, 2],
            [2, 4, 3],
            [0, 2, -1],
          ],
        ],
        expected: [-1, 1, 4, 5, 3],
        description: 'Multiple overlapping updates',
      },
      {
        input: [3, [[0, 2, 5]]],
        expected: [5, 5, 5],
        description: 'Single update covering all',
      },
      {
        input: [
          4,
          [
            [0, 0, 10],
            [3, 3, 20],
          ],
        ],
        expected: [10, 0, 0, 20],
        description: 'Point updates',
      },
      {
        input: [3, []],
        expected: [0, 0, 0],
        description: 'No updates',
      },
    ],
    hints: [
      'Create a difference array of size n+1 initialized to 0',
      'For each update [s, e, v]: diff[s] += v; diff[e+1] -= v',
      'Compute prefix sum of the difference array to get the final result',
    ],
    concepts: ['difference array', 'range update', 'prefix sum'],
  },
  {
    id: 'ts-kadanes-algorithm',
    title: "Kadane's Algorithm: Maximum Subarray Sum",
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      "Find the maximum sum of any contiguous subarray using Kadane's algorithm in O(n) time. Kadane's algorithm is a classic dynamic programming solution that tracks local vs global maximum, frequently asked in coding interviews.",
    instructions: [
      'Given an array of integers (may include negatives), find the contiguous subarray with the largest sum',
      "Use Kadane's algorithm: track the current subarray sum and reset it when it drops below 0",
      'Return the maximum sum found',
    ],
    starterCode: `function maxSubarraySum(numbers: number[]): number {
  // Kadane's algorithm
  // YOUR CODE HERE
}`,
    solutionCode: `function maxSubarraySum(numbers: number[]): number {
  // Kadane's algorithm: O(n) time, O(1) space
  // At each position, decide whether to extend the current subarray or start fresh
  let bestSum: number = numbers[0];
  let currentSum: number = numbers[0];
  for (let idx = 1; idx < numbers.length; idx++) {
    // Start a new subarray at idx if extending would produce a smaller sum
    currentSum = Math.max(numbers[idx], currentSum + numbers[idx]);
    bestSum = Math.max(bestSum, currentSum);
  }
  return bestSum;
}`,
    testCases: [
      {
        input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expected: 6,
        description: 'Classic case: [4,-1,2,1]=6',
      },
      { input: [[1, 2, 3, 4]], expected: 10, description: 'All positive' },
      { input: [[-1, -2, -3]], expected: -1, description: 'All negative' },
      { input: [[5, -9, 6, -2, 3]], expected: 7, description: 'Mixed: [6,-2,3]=7' },
      { input: [[42]], expected: 42, description: 'Single element' },
    ],
    hints: [
      'Initialize both maxSum and currentSum to arr[0]',
      'At each step: currentSum = max(arr[i], currentSum + arr[i])',
      'Update maxSum = max(maxSum, currentSum)',
    ],
    concepts: ['Kadane algorithm', 'maximum subarray', 'dynamic programming'],
  },
  {
    id: 'ts-dutch-national-flag',
    title: 'Dutch National Flag Partition',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Partition an array into three sections (less than, equal to, greater than pivot) in a single O(n) pass. This three-way partition is used in quicksort optimization, color sorting, and any classification into three categories.',
    instructions: [
      'Given an array and a pivot value, rearrange the array so all elements < pivot come first, then elements == pivot, then elements > pivot',
      'Use three pointers: low, mid, and high',
      'Perform this in a single pass through the array',
      'Return the rearranged array',
    ],
    starterCode: `function dutchFlag(numbers: number[], pivot: number): number[] {
  // Three-way partition with low, mid, high pointers
  // YOUR CODE HERE
}`,
    solutionCode: `function dutchFlag(numbers: number[], pivot: number): number[] {
  // Dutch National Flag three-way partition: O(n) time, O(n) space for copy
  // Partitions into [< pivot | == pivot | > pivot] in a single pass
  const result: number[] = [...numbers];
  let lowBoundary: number = 0, scanner: number = 0, highBoundary: number = result.length - 1;
  while (scanner <= highBoundary) {
    if (result[scanner] < pivot) {
      // Element belongs in the "less than" section
      [result[lowBoundary], result[scanner]] = [result[scanner], result[lowBoundary]];
      lowBoundary++;
      scanner++;
    } else if (result[scanner] > pivot) {
      // Element belongs in the "greater than" section; don't advance scanner since swapped element is unexamined
      [result[scanner], result[highBoundary]] = [result[highBoundary], result[scanner]];
      highBoundary--;
    } else {
      // Element equals pivot; already in the correct middle section
      scanner++;
    }
  }
  return result;
}`,
    testCases: [
      {
        input: [[2, 0, 2, 1, 1, 0], 1],
        expected: [0, 0, 1, 1, 2, 2],
        description: 'Three-way partition around 1',
      },
      {
        input: [[3, 1, 2, 3, 1, 2], 2],
        expected: [1, 1, 2, 2, 3, 3],
        description: 'Three-way partition around 2',
      },
      {
        input: [[5, 5, 5], 5],
        expected: [5, 5, 5],
        description: 'All equal to pivot',
      },
      {
        input: [[1], 1],
        expected: [1],
        description: 'Single element',
      },
    ],
    hints: [
      'low tracks the boundary of the < section, high tracks the > section',
      'mid scans the array; if arr[mid] < pivot, swap with low and advance both',
      'If arr[mid] > pivot, swap with high and decrement high (do not advance mid)',
    ],
    concepts: ['three-way partition', 'Dutch national flag', 'single-pass partition'],
  },
  {
    id: 'ts-fast-slow-pointers',
    title: "Floyd's Cycle Detection",
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      "Detect a cycle in a linked list using Floyd's tortoise and hare algorithm with fast and slow pointers. This O(n) time, O(1) space technique is the standard approach for cycle detection, also used for finding duplicates and list midpoints.",
    instructions: [
      'Given an array where arr[i] is the index of the next node (simulating a linked list), detect if there is a cycle',
      'Use two pointers: slow moves 1 step, fast moves 2 steps',
      'A value of -1 means no next node (end of list)',
      'Start both pointers at index 0',
      'Return true if a cycle is detected, false otherwise',
    ],
    starterCode: `function hasCycle(nextIndices: number[]): boolean {
  // Floyd's tortoise and hare
  // YOUR CODE HERE
}`,
    solutionCode: `function hasCycle(nextIndices: number[]): boolean {
  // Floyd's tortoise and hare: O(n) time, O(1) space
  // Slow pointer moves 1 step, fast moves 2; if they meet, a cycle exists
  if (nextIndices.length === 0) return false;
  let tortoise: number = 0;
  let hare: number = 0;
  while (true) {
    // Move tortoise one step
    tortoise = nextIndices[tortoise];
    if (tortoise === -1) return false;
    // Move hare two steps
    hare = nextIndices[hare];
    if (hare === -1) return false;
    hare = nextIndices[hare];
    if (hare === -1) return false;
    // If they meet, there is a cycle
    if (tortoise === hare) return true;
  }
}`,
    testCases: [
      { input: [[1, 2, 0]], expected: true, description: 'Cycle: 0->1->2->0' },
      { input: [[1, 2, -1]], expected: false, description: 'No cycle: 0->1->2->end' },
      { input: [[1, 2, 3, 1]], expected: true, description: 'Cycle: 1->2->3->1' },
      { input: [[-1]], expected: false, description: 'Single node, no cycle' },
      { input: [[0]], expected: true, description: 'Self-loop' },
    ],
    hints: [
      'slow moves one step: slow = nextIndices[slow]',
      'fast moves two steps: apply nextIndices twice',
      'If fast or slow reaches -1, there is no cycle',
      'If slow === fast, a cycle exists',
    ],
    concepts: ['Floyd cycle detection', 'fast-slow pointers', 'tortoise and hare'],
  },
  {
    id: 'ts-merge-in-place',
    title: 'Merge Two Sorted Arrays In-Place',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Merge two sorted arrays where the first has trailing zeros to hold both, working from the end backwards. This in-place merge avoids extra allocation and is a classic interview problem testing pointer manipulation and backward-fill strategy.',
    instructions: [
      'Given arr1 (sorted, with m valid elements followed by zeros to hold arr2) and arr2 (sorted, n elements), merge arr2 into arr1 in-place',
      'Work from the end of both arrays to avoid overwriting',
      'Return the modified arr1',
    ],
    starterCode: `function mergeInPlace(target: number[], targetLen: number, source: number[], sourceLen: number): number[] {
  // Merge from the end
  // YOUR CODE HERE
}`,
    solutionCode: `function mergeInPlace(target: number[], targetLen: number, source: number[], sourceLen: number): number[] {
  // Reverse-direction merge: O(m+n) time, O(1) space
  // Fill from the end to avoid overwriting unprocessed target elements
  let targetPointer: number = targetLen - 1;
  let sourcePointer: number = sourceLen - 1;
  let writePosition: number = targetLen + sourceLen - 1;
  while (targetPointer >= 0 && sourcePointer >= 0) {
    // Place the larger of the two current elements at the write position
    if (target[targetPointer] > source[sourcePointer]) {
      target[writePosition] = target[targetPointer];
      targetPointer--;
    } else {
      target[writePosition] = source[sourcePointer];
      sourcePointer--;
    }
    writePosition--;
  }
  // Copy any remaining source elements (target elements are already in place)
  while (sourcePointer >= 0) {
    target[writePosition] = source[sourcePointer];
    sourcePointer--;
    writePosition--;
  }
  return target;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
        expected: [1, 2, 2, 3, 5, 6],
        description: 'Standard merge',
      },
      {
        input: [[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'arr2 all smaller',
      },
      {
        input: [[1, 0], 1, [2], 1],
        expected: [1, 2],
        description: 'Minimal merge',
      },
      {
        input: [[0], 0, [1], 1],
        expected: [1],
        description: 'arr1 empty',
      },
    ],
    hints: [
      'Start from the end: write pointer at m + n - 1',
      'Compare arr1[p1] and arr2[p2], place the larger at the write position',
      'After p1 is exhausted, copy remaining arr2 elements',
    ],
    concepts: ['merge sorted', 'in-place merge', 'reverse iteration'],
  },
  {
    id: 'ts-zigzag-iteration',
    title: 'Zigzag Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Read a matrix in zigzag order: even-indexed rows left-to-right, odd-indexed rows right-to-left. Zigzag traversal is used in JPEG encoding, matrix serialization, and problems requiring alternating-direction processing of 2D data.',
    instructions: [
      'Given a 2D matrix, return all elements in zigzag order',
      'Row 0: left to right, Row 1: right to left, Row 2: left to right, etc.',
      'Return a flat array of the elements in this order',
    ],
    starterCode: `function zigzagTraversal(matrix: number[][]): number[] {
  const result: number[] = [];
  // Alternate direction per row
  // YOUR CODE HERE
  return result;
}`,
    solutionCode: `function zigzagTraversal(matrix: number[][]): number[] {
  // Zigzag traversal: O(m*n) time, O(m*n) space
  // Even-indexed rows go left-to-right, odd-indexed rows go right-to-left
  const result: number[] = [];
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    if (rowIndex % 2 === 0) {
      // Even row: traverse forward
      for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
        result.push(matrix[rowIndex][colIndex]);
      }
    } else {
      // Odd row: traverse backward to create the zigzag pattern
      for (let colIndex = matrix[rowIndex].length - 1; colIndex >= 0; colIndex--) {
        result.push(matrix[rowIndex][colIndex]);
      }
    }
  }
  return result;
}`,
    testCases: [
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [1, 2, 3, 6, 5, 4, 7, 8, 9],
        description: '3x3 zigzag',
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
          ],
        ],
        expected: [1, 2, 4, 3, 5, 6, 8, 7],
        description: '4x2 zigzag',
      },
      {
        input: [[[1, 2, 3]]],
        expected: [1, 2, 3],
        description: 'Single row',
      },
      {
        input: [[]],
        expected: [],
        description: 'Empty matrix',
      },
    ],
    hints: [
      'Check if the row index is even or odd',
      'Even rows: iterate j from 0 to length-1',
      'Odd rows: iterate j from length-1 down to 0',
    ],
    concepts: ['zigzag traversal', 'matrix iteration', 'alternating direction'],
  },
  {
    id: 'ts-spiral-matrix',
    title: 'Spiral Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'advanced',
    description:
      'Read a matrix in spiral order, going clockwise from the outside inward. Spiral traversal is a popular interview problem that tests boundary management and is used in matrix serialization and image processing algorithms.',
    instructions: [
      'Given an m x n matrix, return all elements in spiral order (clockwise from top-left)',
      'Traverse: top row left-to-right, right column top-to-bottom, bottom row right-to-left, left column bottom-to-top',
      'Shrink the boundaries after each layer and repeat',
    ],
    starterCode: `function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  // Use top, bottom, left, right boundaries
  // YOUR CODE HERE
  return result;
}`,
    solutionCode: `function spiralOrder(matrix: number[][]): number[] {
  // Spiral traversal with boundary shrinking: O(m*n) time, O(m*n) space
  // Walk the perimeter of the current layer, then shrink inward
  const result: number[] = [];
  if (matrix.length === 0) return result;
  let topRow: number = 0, bottomRow: number = matrix.length - 1;
  let leftCol: number = 0, rightCol: number = matrix[0].length - 1;
  while (topRow <= bottomRow && leftCol <= rightCol) {
    // Traverse top row left-to-right
    for (let col = leftCol; col <= rightCol; col++) result.push(matrix[topRow][col]);
    topRow++;
    // Traverse right column top-to-bottom
    for (let row = topRow; row <= bottomRow; row++) result.push(matrix[row][rightCol]);
    rightCol--;
    // Traverse bottom row right-to-left (only if rows remain)
    if (topRow <= bottomRow) {
      for (let col = rightCol; col >= leftCol; col--) result.push(matrix[bottomRow][col]);
      bottomRow--;
    }
    // Traverse left column bottom-to-top (only if columns remain)
    if (leftCol <= rightCol) {
      for (let row = bottomRow; row >= topRow; row--) result.push(matrix[row][leftCol]);
      leftCol++;
    }
  }
  return result;
}`,
    testCases: [
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
        description: '3x3 spiral',
      },
      {
        input: [
          [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
          ],
        ],
        expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
        description: '3x4 spiral',
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [1, 2, 4, 3],
        description: '2x2 spiral',
      },
      {
        input: [[[1]]],
        expected: [1],
        description: '1x1 matrix',
      },
    ],
    hints: [
      'Maintain four boundaries: top, bottom, left, right',
      'After traversing the top row, increment top',
      'Check boundaries before traversing bottom row and left column to avoid double-counting',
    ],
    concepts: ['spiral traversal', 'boundary shrinking', 'matrix traversal'],
  },
  {
    id: 'ts-diagonal-traversal',
    title: 'Diagonal Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a matrix along its diagonals from top-right to bottom-left. Diagonal traversal appears in image processing, JPEG zigzag scanning, and interview problems requiring non-standard matrix access patterns.',
    instructions: [
      'Given an m x n matrix, return elements grouped by diagonals',
      'Each diagonal consists of elements where row + col is the same constant',
      'Return a flat array reading each diagonal from top to bottom (i.e., increasing row within each diagonal)',
    ],
    starterCode: `function diagonalTraversal(matrix: number[][]): number[] {
  // Group elements by (row + col) sum
  // YOUR CODE HERE
}`,
    solutionCode: `function diagonalTraversal(matrix: number[][]): number[] {
  // Anti-diagonal traversal: O(m*n) time, O(m*n) space
  // There are (rows + cols - 1) diagonals; each diagonal has constant (row + col) sum
  if (matrix.length === 0) return [];
  const rowCount: number = matrix.length;
  const colCount: number = matrix[0].length;
  const result: number[] = [];
  for (let diagonalIndex = 0; diagonalIndex < rowCount + colCount - 1; diagonalIndex++) {
    // Determine the starting cell for this diagonal
    const startRow: number = diagonalIndex < colCount ? 0 : diagonalIndex - colCount + 1;
    const startCol: number = diagonalIndex < colCount ? diagonalIndex : colCount - 1;
    let currentRow: number = startRow, currentCol: number = startCol;
    // Walk down-left along the diagonal
    while (currentRow < rowCount && currentCol >= 0) {
      result.push(matrix[currentRow][currentCol]);
      currentRow++;
      currentCol--;
    }
  }
  return result;
}`,
    testCases: [
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [1, 2, 4, 3, 5, 7, 6, 8, 9],
        description: '3x3 diagonal traversal',
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
            [5, 6],
          ],
        ],
        expected: [1, 2, 3, 4, 5, 6],
        description: '3x2 diagonal traversal',
      },
      {
        input: [[[1]]],
        expected: [1],
        description: '1x1 matrix',
      },
    ],
    hints: [
      'There are m + n - 1 diagonals total',
      'For diagonal d, elements satisfy row + col = constant or can be indexed by starting position',
      'Walk each diagonal: increment row and decrement col',
    ],
    concepts: ['diagonal traversal', 'matrix iteration', 'anti-diagonal'],
  },
  {
    id: 'ts-rotate-matrix',
    title: 'Rotate Matrix 90 Degrees Clockwise',
    category: 'iteration-patterns',
    difficulty: 'advanced',
    description:
      'Rotate an N x N matrix 90 degrees clockwise in-place using transpose followed by row reversal. Matrix rotation is asked in interviews to test in-place 2D manipulation, and is used in image rotation and game board transformations.',
    instructions: [
      'Given an NxN matrix, rotate it 90 degrees clockwise in-place',
      'Strategy: first transpose the matrix (swap rows and columns), then reverse each row',
      'Return the modified matrix',
    ],
    starterCode: `function rotateMatrix(matrix: number[][]): number[][] {
  // Step 1: Transpose
  // Step 2: Reverse each row
  // YOUR CODE HERE
}`,
    solutionCode: `function rotateMatrix(matrix: number[][]): number[][] {
  // Transpose + reverse rows = 90-degree clockwise rotation: O(n^2) time, O(1) space
  const matrixSize: number = matrix.length;
  // Step 1: Transpose - swap elements across the main diagonal
  for (let row = 0; row < matrixSize; row++) {
    for (let col = row + 1; col < matrixSize; col++) {
      [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
    }
  }
  // Step 2: Reverse each row to complete the clockwise rotation
  for (let row = 0; row < matrixSize; row++) {
    matrix[row].reverse();
  }
  return matrix;
}`,
    testCases: [
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [
          [7, 4, 1],
          [8, 5, 2],
          [9, 6, 3],
        ],
        description: '3x3 rotation',
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [
          [3, 1],
          [4, 2],
        ],
        description: '2x2 rotation',
      },
      {
        input: [[[1]]],
        expected: [[1]],
        description: '1x1 matrix',
      },
      {
        input: [
          [
            [5, 1, 9, 11],
            [2, 4, 8, 10],
            [13, 3, 6, 7],
            [15, 14, 12, 16],
          ],
        ],
        expected: [
          [15, 13, 2, 5],
          [14, 3, 4, 1],
          [12, 6, 8, 9],
          [16, 7, 10, 11],
        ],
        description: '4x4 rotation',
      },
    ],
    hints: [
      'Transpose: swap matrix[i][j] with matrix[j][i] for j > i',
      'Then reverse each row in-place',
      'These two steps together produce a 90-degree clockwise rotation',
    ],
    concepts: ['matrix rotation', 'transpose', 'in-place transformation'],
  },

  // ========== SEARCHING ==========
  {
    id: 'ts-lower-bound',
    title: 'Lower Bound (Binary Search)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the first index where arr[i] >= target using binary search (lower bound). Lower bound is the foundation for range queries, counting occurrences, and implementing sorted container operations like C++ lower_bound.',
    instructions: [
      'Given a sorted array and a target, find the first index i such that arr[i] >= target',
      'If no such index exists, return the array length',
      'Use binary search with lo/hi pointers',
    ],
    starterCode: `function lowerBound(numbers: number[], target: number): number {
  // Binary search for first index >= target
  // YOUR CODE HERE
}`,
    solutionCode: `function lowerBound(numbers: number[], target: number): number {
  // Binary search (lower bound / bisect-left): O(log n) time, O(1) space
  // Finds the first position where an element >= target could be inserted
  let lo: number = 0, hi: number = numbers.length;
  while (lo < hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] < target) {
      // Target must be in the right half
      lo = mid + 1;
    } else {
      // mid could be the answer; narrow from the right
      hi = mid;
    }
  }
  return lo;
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9], 5], expected: 2, description: 'Target exists' },
      { input: [[1, 3, 5, 7, 9], 4], expected: 2, description: 'Target between elements' },
      { input: [[1, 3, 5, 7, 9], 0], expected: 0, description: 'Target smaller than all' },
      { input: [[1, 3, 5, 7, 9], 10], expected: 5, description: 'Target larger than all' },
      { input: [[2, 2, 2, 2], 2], expected: 0, description: 'All duplicates, first occurrence' },
    ],
    hints: [
      'Initialize lo = 0 and hi = arr.length',
      'If arr[mid] < target, search right half: lo = mid + 1',
      'Otherwise, search left half: hi = mid',
    ],
    concepts: ['binary search', 'lower bound', 'bisect left'],
  },
  {
    id: 'ts-upper-bound',
    title: 'Upper Bound (Binary Search)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the first index where arr[i] > target using binary search (upper bound). Combined with lower bound, upper bound enables counting exact occurrences and defining ranges in sorted data, a staple of competitive programming.',
    instructions: [
      'Given a sorted array and a target, find the first index i such that arr[i] > target',
      'If no such index exists, return the array length',
      'Use binary search with lo/hi pointers',
    ],
    starterCode: `function upperBound(numbers: number[], target: number): number {
  // Binary search for first index > target
  // YOUR CODE HERE
}`,
    solutionCode: `function upperBound(numbers: number[], target: number): number {
  // Binary search (upper bound / bisect-right): O(log n) time, O(1) space
  // Finds the first position where an element > target could be inserted
  let lo: number = 0, hi: number = numbers.length;
  while (lo < hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] <= target) {
      // All elements up to mid are <= target, search right
      lo = mid + 1;
    } else {
      // mid could be the answer; narrow from the right
      hi = mid;
    }
  }
  return lo;
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9], 5], expected: 3, description: 'Target exists' },
      { input: [[1, 3, 5, 7, 9], 4], expected: 2, description: 'Target between elements' },
      { input: [[1, 3, 5, 7, 9], 0], expected: 0, description: 'Target smaller than all' },
      { input: [[1, 3, 5, 7, 9], 10], expected: 5, description: 'Target larger than all' },
      { input: [[2, 2, 2, 2], 2], expected: 4, description: 'All duplicates' },
    ],
    hints: [
      'Similar to lower bound but use <= instead of <',
      'If arr[mid] <= target, search right: lo = mid + 1',
      'Otherwise, search left: hi = mid',
    ],
    concepts: ['binary search', 'upper bound', 'bisect right'],
  },
  {
    id: 'ts-binary-search-sqrt',
    title: 'Integer Square Root via Binary Search',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the integer square root of a number using binary search on the answer space. This "binary search on the answer" paradigm generalizes to many optimization problems where you search for the best value satisfying a condition.',
    instructions: [
      'Given a non-negative integer n, return the largest integer x such that x * x <= n',
      'Use binary search over the range [0, n] to find this value',
      'Do not use Math.sqrt',
    ],
    starterCode: `function intSqrt(value: number): number {
  // Binary search on the answer
  // YOUR CODE HERE
}`,
    solutionCode: `function intSqrt(value: number): number {
  // Binary search on the answer space: O(log n) time, O(1) space
  // Searches for the largest integer whose square does not exceed value
  if (value < 2) return value;
  let lo: number = 1, hi: number = Math.floor(value / 2);
  while (lo <= hi) {
    const mid: number = (lo + hi) >>> 1;
    const square: number = mid * mid;
    if (square === value) return mid;
    if (square < value) {
      // mid might be too small; search higher
      lo = mid + 1;
    } else {
      // mid is too large; search lower
      hi = mid - 1;
    }
  }
  // hi is the largest integer with hi*hi <= value
  return hi;
}`,
    testCases: [
      { input: [16], expected: 4, description: 'Perfect square' },
      { input: [8], expected: 2, description: 'Non-perfect square (2*2=4 <= 8)' },
      { input: [0], expected: 0, description: 'Zero' },
      { input: [1], expected: 1, description: 'One' },
      { input: [100], expected: 10, description: 'Larger perfect square' },
      { input: [26], expected: 5, description: '5*5=25 <= 26' },
    ],
    hints: [
      'Search between lo=1 and hi=n/2 (for n>=2)',
      'If mid*mid === n, return mid',
      'If mid*mid < n, search higher; otherwise search lower',
      'When the loop ends, hi is the answer',
    ],
    concepts: ['binary search on answer', 'integer square root', 'search space reduction'],
  },
  {
    id: 'ts-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'advanced',
    description:
      'Search for a target in a sorted array that has been rotated at an unknown pivot using modified binary search. This problem tests the ability to adapt binary search to non-standard sorted sequences, a common interview challenge.',
    instructions: [
      'Given a rotated sorted array (e.g., [4,5,6,7,0,1,2]) and a target, find the target index or return -1',
      'Use binary search: determine which half is sorted, then decide which half to search',
      'Array has no duplicates',
    ],
    starterCode: `function searchRotated(numbers: number[], target: number): number {
  // Binary search on rotated sorted array
  // YOUR CODE HERE
}`,
    solutionCode: `function searchRotated(numbers: number[], target: number): number {
  // Modified binary search on rotated array: O(log n) time, O(1) space
  // At each step, determine which half is sorted and whether target lies within it
  let lo: number = 0, hi: number = numbers.length - 1;
  while (lo <= hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] === target) return mid;
    if (numbers[lo] <= numbers[mid]) {
      // Left half [lo..mid] is sorted
      if (target >= numbers[lo] && target < numbers[mid]) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else {
      // Right half [mid..hi] is sorted
      if (target > numbers[mid] && target <= numbers[hi]) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }
  return -1;
}`,
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4, description: 'Target in right portion' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 5], expected: 1, description: 'Target in left portion' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1, description: 'Target not found' },
      { input: [[1], 1], expected: 0, description: 'Single element found' },
      { input: [[1], 0], expected: -1, description: 'Single element not found' },
      { input: [[3, 1], 1], expected: 1, description: 'Two elements rotated' },
    ],
    hints: [
      'Check which half (lo..mid or mid..hi) is sorted',
      'If the left half is sorted (arr[lo] <= arr[mid]), check if target falls in that range',
      'Otherwise the right half must be sorted; check that range',
    ],
    concepts: ['binary search', 'rotated array', 'sorted subarray detection'],
  },
  {
    id: 'ts-quick-select',
    title: 'QuickSelect: Kth Smallest Element',
    category: 'searching',
    difficulty: 'advanced',
    description:
      'Find the kth smallest element using QuickSelect, a partition-based algorithm with O(n) average time. QuickSelect is more efficient than sorting for single-element selection and is used in median finding and order-statistics queries.',
    instructions: [
      'Given an unsorted array and k (1-indexed), find the kth smallest element',
      'Use the quickselect algorithm: pick a pivot, partition, then recurse on the relevant side',
      'Average O(n) time complexity',
    ],
    starterCode: `function quickSelect(numbers: number[], count: number): number {
  // Partition-based selection
  // YOUR CODE HERE
}`,
    solutionCode: `function quickSelect(numbers: number[], count: number): number {
  // QuickSelect (Lomuto partition): O(n) average time, O(n) space for copy
  // Repeatedly partition until pivot lands at the target index
  const elements: number[] = [...numbers];
  function partition(lo: number, hi: number): number {
    const pivotValue: number = elements[hi];
    let storeIndex: number = lo;
    for (let scanIndex: number = lo; scanIndex < hi; scanIndex++) {
      if (elements[scanIndex] <= pivotValue) {
        [elements[storeIndex], elements[scanIndex]] = [elements[scanIndex], elements[storeIndex]];
        storeIndex++;
      }
    }
    // Place pivot in its final sorted position
    [elements[storeIndex], elements[hi]] = [elements[hi], elements[storeIndex]];
    return storeIndex;
  }
  let lo: number = 0, hi: number = elements.length - 1;
  const targetIndex: number = count - 1;
  while (lo <= hi) {
    const pivotIndex: number = partition(lo, hi);
    if (pivotIndex === targetIndex) return elements[pivotIndex];
    // Narrow search to the half containing the target index
    if (pivotIndex < targetIndex) lo = pivotIndex + 1;
    else hi = pivotIndex - 1;
  }
  return -1;
}`,
    testCases: [
      { input: [[3, 2, 1, 5, 6, 4], 2], expected: 2, description: '2nd smallest = 2' },
      { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 3, description: '4th smallest = 3' },
      { input: [[7, 10, 4, 3, 20, 15], 1], expected: 3, description: '1st smallest (min)' },
      { input: [[7, 10, 4, 3, 20, 15], 6], expected: 20, description: '6th smallest (max)' },
      { input: [[1], 1], expected: 1, description: 'Single element' },
    ],
    hints: [
      'Partition places the pivot in its correct sorted position',
      'If pivotIndex === k-1, we found the answer',
      'If pivotIndex < k-1, search the right side; otherwise search the left',
    ],
    concepts: ['quickselect', 'partition', 'order statistics', 'selection algorithm'],
  },
  {
    id: 'ts-exponential-search',
    title: 'Exponential Search',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find an element using exponential search: double the range, then binary search within it. Exponential search is optimal for unbounded or very large sorted datasets where the target is near the beginning, combining O(log i) range finding with binary search.',
    instructions: [
      'Given a sorted array and a target, find the target index using exponential search',
      'Start with bound=1 and double it until arr[bound] >= target or bound exceeds array length',
      'Then binary search in the range [bound/2, min(bound, length-1)]',
      'Return -1 if not found',
    ],
    starterCode: `function exponentialSearch(numbers: number[], target: number): number {
  // Find range then binary search
  // YOUR CODE HERE
}`,
    solutionCode: `function exponentialSearch(numbers: number[], target: number): number {
  // Exponential search: O(log n) time, O(1) space
  // Double the search bound to find a range, then binary search within it
  if (numbers.length === 0) return -1;
  if (numbers[0] === target) return 0;
  let searchBound: number = 1;
  // Exponentially grow the bound until we overshoot or find a value >= target
  while (searchBound < numbers.length && numbers[searchBound] < target) {
    searchBound *= 2;
  }
  // Binary search within the narrowed range [bound/2, min(bound, length-1)]
  let lo: number = Math.floor(searchBound / 2);
  let hi: number = Math.min(searchBound, numbers.length - 1);
  while (lo <= hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] === target) return mid;
    if (numbers[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9, 11, 13, 15], 7], expected: 3, description: 'Found in middle' },
      { input: [[1, 3, 5, 7, 9, 11, 13, 15], 1], expected: 0, description: 'Found at start' },
      { input: [[1, 3, 5, 7, 9, 11, 13, 15], 15], expected: 7, description: 'Found at end' },
      { input: [[1, 3, 5, 7, 9, 11, 13, 15], 6], expected: -1, description: 'Not found' },
      { input: [[], 5], expected: -1, description: 'Empty array' },
    ],
    hints: [
      'Double the bound: 1, 2, 4, 8, ... until arr[bound] >= target',
      'Binary search between bound/2 and min(bound, arr.length-1)',
      'Handle the edge case where arr[0] is the target',
    ],
    concepts: ['exponential search', 'range finding', 'binary search'],
  },
  {
    id: 'ts-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find a peak element (strictly greater than its neighbors) using binary search in O(log n) time. Peak finding demonstrates how binary search applies beyond sorted arrays, useful in signal processing and optimization problems.',
    instructions: [
      'A peak element is one that is strictly greater than its neighbors',
      'The array may have multiple peaks; return the index of any one',
      'Assume arr[-1] = arr[n] = -Infinity (edges are smaller than any element)',
      'Use binary search for O(log n) time',
    ],
    starterCode: `function findPeak(numbers: number[]): number {
  // Binary search for a peak
  // YOUR CODE HERE
}`,
    solutionCode: `function findPeak(numbers: number[]): number {
  // Binary search for peak element: O(log n) time, O(1) space
  // Always move toward the higher neighbor, guaranteeing convergence to a peak
  let lo: number = 0, hi: number = numbers.length - 1;
  while (lo < hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] < numbers[mid + 1]) {
      // Right neighbor is higher, so a peak must exist to the right
      lo = mid + 1;
    } else {
      // mid is >= its right neighbor; peak is at mid or to the left
      hi = mid;
    }
  }
  return lo;
}`,
    testCases: [
      { input: [[1, 2, 3, 1]], expected: 2, description: 'Peak at index 2' },
      { input: [[1, 2, 1, 3, 5, 6, 4]], expected: 5, description: 'Peak at index 5 (value 6)' },
      { input: [[5, 4, 3, 2, 1]], expected: 0, description: 'Peak at start (descending)' },
      { input: [[1, 2, 3, 4, 5]], expected: 4, description: 'Peak at end (ascending)' },
      { input: [[1]], expected: 0, description: 'Single element' },
    ],
    hints: [
      'If arr[mid] < arr[mid + 1], the peak is to the right',
      'Otherwise, the peak is at mid or to the left',
      'This converges to a peak because we always move toward a higher neighbor',
    ],
    concepts: ['binary search', 'peak finding', 'search by comparison'],
  },
  {
    id: 'ts-search-2d-matrix',
    title: 'Search a 2D Sorted Matrix',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Search for a target in a matrix where each row and column is sorted, using the staircase algorithm from the top-right corner. This O(m+n) approach eliminates one row or column per comparison, a classic interview problem.',
    instructions: [
      'Given a matrix where rows are sorted left-to-right and columns are sorted top-to-bottom, find if a target exists',
      'Start from the top-right corner: if current > target go left, if current < target go down',
      'Return [row, col] if found, or [-1, -1] if not found',
    ],
    starterCode: `function searchMatrix(matrix: number[][], target: number): [number, number] {
  // Start from top-right corner
  // YOUR CODE HERE
}`,
    solutionCode: `function searchMatrix(matrix: number[][], target: number): [number, number] {
  // Staircase search from top-right corner: O(m+n) time, O(1) space
  // Each comparison eliminates either a row or a column
  if (matrix.length === 0 || matrix[0].length === 0) return [-1, -1];
  let row: number = 0;
  let col: number = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return [row, col];
    if (matrix[row][col] > target) {
      // Current value too large; eliminate this column
      col--;
    } else {
      // Current value too small; eliminate this row
      row++;
    }
  }
  return [-1, -1];
}`,
    testCases: [
      {
        input: [
          [
            [1, 4, 7, 11],
            [2, 5, 8, 12],
            [3, 6, 9, 16],
            [10, 13, 14, 17],
          ],
          5,
        ],
        expected: [1, 1],
        description: 'Target found at [1,1]',
      },
      {
        input: [
          [
            [1, 4, 7, 11],
            [2, 5, 8, 12],
            [3, 6, 9, 16],
            [10, 13, 14, 17],
          ],
          20,
        ],
        expected: [-1, -1],
        description: 'Target not in matrix',
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
          ],
          3,
        ],
        expected: [1, 0],
        description: '2x2 matrix',
      },
      {
        input: [[[1]], 1],
        expected: [0, 0],
        description: '1x1 matrix found',
      },
    ],
    hints: [
      'Start at top-right: row=0, col=last column',
      'If current value > target, move left (col--)',
      'If current value < target, move down (row++)',
    ],
    concepts: ['2D search', 'staircase search', 'sorted matrix'],
  },
  {
    id: 'ts-count-occurrences',
    title: 'Count Occurrences in Sorted Array',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Count how many times a target appears in a sorted array using two binary searches (lower and upper bound). This O(log n) technique is far more efficient than linear scanning and demonstrates the power of combining binary search variants.',
    instructions: [
      'Given a sorted array and a target, return the number of times target appears',
      'Use lower bound (first index >= target) and upper bound (first index > target)',
      'The count is upperBound - lowerBound',
    ],
    starterCode: `function countOccurrences(numbers: number[], target: number): number {
  // Use two binary searches: lower bound and upper bound
  // YOUR CODE HERE
}`,
    solutionCode: `function countOccurrences(numbers: number[], target: number): number {
  // Two binary searches (lower + upper bound): O(log n) time, O(1) space
  // The count of target is the gap between its upper and lower bound positions
  function lowerBound(a: number[], t: number): number {
    let lo: number = 0, hi: number = a.length;
    while (lo < hi) {
      const mid: number = (lo + hi) >>> 1;
      // Strict < drives us to the first occurrence of t
      if (a[mid] < t) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  function upperBound(a: number[], t: number): number {
    let lo: number = 0, hi: number = a.length;
    while (lo < hi) {
      const mid: number = (lo + hi) >>> 1;
      // <= drives us past the last occurrence of t
      if (a[mid] <= t) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  // Difference gives the exact count of target in the sorted array
  return upperBound(numbers, target) - lowerBound(numbers, target);
}`,
    testCases: [
      { input: [[1, 2, 2, 2, 3, 4], 2], expected: 3, description: 'Three occurrences' },
      { input: [[1, 1, 1, 1], 1], expected: 4, description: 'All same' },
      { input: [[1, 2, 3, 4, 5], 6], expected: 0, description: 'Not found' },
      { input: [[1, 2, 3, 4, 5], 3], expected: 1, description: 'Single occurrence' },
      { input: [[], 1], expected: 0, description: 'Empty array' },
    ],
    hints: [
      'Lower bound: first index where arr[i] >= target',
      'Upper bound: first index where arr[i] > target',
      'Count = upper - lower',
    ],
    concepts: ['binary search', 'lower bound', 'upper bound', 'counting'],
  },
  {
    id: 'ts-min-in-rotated',
    title: 'Find Minimum in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the minimum element in a rotated sorted array using binary search in O(log n) time. This problem teaches how to identify which half of a rotated array is sorted, a critical insight for all rotated-array interview problems.',
    instructions: [
      'Given a sorted array rotated at some pivot (e.g., [3,4,5,1,2]), find the minimum element',
      'Use binary search: compare mid with hi to decide which half to search',
      'No duplicates in the array',
    ],
    starterCode: `function findMin(numbers: number[]): number {
  // Binary search for minimum in rotated array
  // YOUR CODE HERE
}`,
    solutionCode: `function findMin(numbers: number[]): number {
  // Binary search for minimum in rotated sorted array: O(log n) time, O(1) space
  // Compare mid with hi to determine which half contains the rotation point
  let lo: number = 0, hi: number = numbers.length - 1;
  while (lo < hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] > numbers[hi]) {
      // Rotation point (minimum) must be in the right half
      lo = mid + 1;
    } else {
      // Minimum is at mid or in the left half
      hi = mid;
    }
  }
  return numbers[lo];
}`,
    testCases: [
      { input: [[3, 4, 5, 1, 2]], expected: 1, description: 'Rotated at index 3' },
      { input: [[4, 5, 6, 7, 0, 1, 2]], expected: 0, description: 'Rotated at index 4' },
      { input: [[1, 2, 3, 4, 5]], expected: 1, description: 'Not rotated' },
      { input: [[2, 1]], expected: 1, description: 'Two elements' },
      { input: [[1]], expected: 1, description: 'Single element' },
    ],
    hints: [
      'If arr[mid] > arr[hi], the minimum is in the right half',
      'Otherwise the minimum is at mid or in the left half',
      'This converges lo and hi to the minimum element',
    ],
    concepts: ['binary search', 'rotated array', 'minimum finding'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'ts-max-heap-insert',
    title: 'Max Heap: Insert and Bubble Up',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Insert a value into a max heap (array-based) and restore the heap property by bubbling up. Max heaps are used for priority queues, heap sort, and efficiently tracking the maximum element in a dynamic collection.',
    instructions: [
      'Given a max heap as an array and a value to insert, add the value and bubble it up to maintain the max-heap property',
      'In a max heap, every parent is >= its children',
      'Parent of index i is at Math.floor((i - 1) / 2)',
      'Return the modified heap array',
    ],
    starterCode: `function heapInsert(heap: number[], value: number): number[] {
  // Push value and bubble up
  // YOUR CODE HERE
}`,
    solutionCode: `function heapInsert(heap: number[], value: number): number[] {
  // Max heap insertion with bubble-up: O(log n) time, O(1) space
  // Add at the end then restore heap property by swapping upward
  heap.push(value);
  let currentIndex: number = heap.length - 1;
  while (currentIndex > 0) {
    const parentIndex: number = Math.floor((currentIndex - 1) / 2);
    if (heap[currentIndex] > heap[parentIndex]) {
      // Child is larger than parent; swap to maintain max-heap invariant
      [heap[currentIndex], heap[parentIndex]] = [heap[parentIndex], heap[currentIndex]];
      currentIndex = parentIndex;
    } else {
      // Heap property is satisfied
      break;
    }
  }
  return heap;
}`,
    testCases: [
      {
        input: [[50, 30, 40, 10, 20], 60],
        expected: [60, 30, 50, 10, 20, 40],
        description: 'Insert new max',
      },
      { input: [[50, 30, 40], 35], expected: [50, 35, 40, 30], description: 'Insert middle value' },
      { input: [[], 10], expected: [10], description: 'Insert into empty heap' },
      { input: [[100], 50], expected: [100, 50], description: 'Insert smaller value' },
    ],
    hints: [
      'Push the value to the end of the array',
      'Compare with parent at Math.floor((i-1)/2)',
      'Swap with parent if current is larger, and move up',
    ],
    concepts: ['max heap', 'bubble up', 'heap insert', 'priority queue'],
  },
  {
    id: 'ts-heap-extract-min',
    title: 'Min Heap: Extract Minimum',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      "Extract the minimum element from a min heap and restore the heap property by sifting down. Extract-min is the core operation that makes heaps useful for Dijkstra's algorithm, job scheduling, and merge-k-sorted-lists problems.",
    instructions: [
      'Given a min heap as an array, extract (remove and return) the minimum element',
      'Move the last element to the root, then sift down to restore the min-heap property',
      'Return an object with { min, heap } where min is the extracted value and heap is the remaining heap',
    ],
    starterCode: `function heapExtractMin(heap: number[]): { min: number | null; heap: number[] } {
  // Extract min and sift down
  // YOUR CODE HERE
}`,
    solutionCode: `function heapExtractMin(heap: number[]): { min: number | null; heap: number[] } {
  // Min heap extract-min with sift-down: O(log n) time, O(1) space
  // Replace root with last element, then sift down to restore heap order
  if (heap.length === 0) return { min: null, heap: [] };
  const min: number = heap[0];
  const lastElement: number | undefined = heap.pop();
  if (heap.length > 0) {
    heap[0] = lastElement as number;
    let currentIndex: number = 0;
    while (true) {
      let smallestIndex: number = currentIndex;
      const leftChild: number = 2 * currentIndex + 1;
      const rightChild: number = 2 * currentIndex + 2;
      // Find the smallest among current node and its children
      if (leftChild < heap.length && heap[leftChild] < heap[smallestIndex]) smallestIndex = leftChild;
      if (rightChild < heap.length && heap[rightChild] < heap[smallestIndex]) smallestIndex = rightChild;
      if (smallestIndex === currentIndex) break;
      // Swap with the smaller child to push the value down
      [heap[currentIndex], heap[smallestIndex]] = [heap[smallestIndex], heap[currentIndex]];
      currentIndex = smallestIndex;
    }
  }
  return { min, heap };
}`,
    testCases: [
      {
        input: [[1, 3, 2, 7, 6, 4, 5]],
        expected: { min: 1, heap: [2, 3, 4, 7, 6, 5] },
        description: 'Extract from full heap',
      },
      {
        input: [[5, 10, 15]],
        expected: { min: 5, heap: [10, 15] },
        description: 'Small heap',
      },
      {
        input: [[42]],
        expected: { min: 42, heap: [] },
        description: 'Single element heap',
      },
      {
        input: [[]],
        expected: { min: null, heap: [] },
        description: 'Empty heap',
      },
    ],
    hints: [
      'Save heap[0] as the min, replace root with the last element',
      'Sift down: compare with left (2i+1) and right (2i+2) children',
      'Swap with the smaller child if it is smaller than the current node',
    ],
    concepts: ['min heap', 'sift down', 'extract min', 'heapify'],
  },
  {
    id: 'ts-lru-cache',
    title: 'LRU Cache with Map',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement a Least Recently Used (LRU) cache using JavaScript Map which preserves insertion order. LRU caches are used in operating systems, CDNs, database query caching, and are one of the most frequently asked design problems.',
    instructions: [
      'Implement an LRU cache with a given capacity',
      'get(key): return the value if it exists (and mark it as recently used), or -1',
      'put(key, value): insert or update the key-value pair; if over capacity, evict the least recently used',
      'Use a Map to leverage insertion-order iteration',
      'Return an object with get and put methods',
    ],
    starterCode: `interface LRUCache {
  get(key: number): number;
  put(key: number, value: number): void;
}

function createLRUCache(capacity: number): LRUCache {
  // Use a Map for O(1) get/put with insertion order
  // YOUR CODE HERE
}`,
    solutionCode: `interface LRUCache {
  get(key: number): number;
  put(key: number, value: number): void;
}

function createLRUCache(capacity: number): LRUCache {
  // LRU cache using Map insertion order: O(1) get/put, O(capacity) space
  // Map preserves insertion order so the first key is the least recently used
  const cache: Map<number, number> = new Map();
  return {
    get(key: number): number {
      if (!cache.has(key)) return -1;
      const value: number = cache.get(key)!;
      // Delete and re-insert to move this key to the most-recent position
      cache.delete(key);
      cache.set(key, value);
      return value;
    },
    put(key: number, value: number): void {
      // Remove first so re-insert places it at the end (most recent)
      if (cache.has(key)) cache.delete(key);
      cache.set(key, value);
      if (cache.size > capacity) {
        // Evict the least recently used entry (first key in Map)
        const oldestKey: number = cache.keys().next().value!;
        cache.delete(oldestKey);
      }
    }
  };
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
        expected: [null, null, 1, null, -1, 3],
        description: 'Standard LRU operations',
      },
      {
        input: [
          1,
          [
            ['put', 1, 10],
            ['put', 2, 20],
            ['get', 1],
            ['get', 2],
          ],
        ],
        expected: [null, null, -1, 20],
        description: 'Capacity 1 evicts immediately',
      },
      {
        input: [
          2,
          [
            ['put', 1, 1],
            ['put', 2, 2],
            ['put', 1, 10],
            ['get', 1],
            ['get', 2],
          ],
        ],
        expected: [null, null, null, 10, 2],
        description: 'Update existing key',
      },
    ],
    hints: [
      'Map preserves insertion order; the first key is the least recently used',
      'On get: delete and re-insert to move to end (most recent)',
      'On put: if over capacity, delete the first key via cache.keys().next().value',
    ],
    concepts: ['LRU cache', 'Map ordering', 'cache eviction'],
  },
  {
    id: 'ts-linked-list-reverse',
    title: 'Reverse a Singly Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      "Reverse a singly linked list by iteratively re-pointing each node's next pointer. List reversal is a fundamental linked list operation tested in nearly every interview, and is used in number addition, palindrome checking, and list manipulation.",
    instructions: [
      'Given the head of a singly linked list (node = {val, next}), reverse it in-place',
      'Use three pointers: prev, current, and next',
      'Return the new head of the reversed list',
      'null represents the end of the list',
    ],
    starterCode: `interface ListNode {
  val: number;
  next: ListNode | null;
}

function reverseLinkedList(head: ListNode | null): ListNode | null {
  // Iterative reversal with prev, current, next
  // YOUR CODE HERE
}`,
    solutionCode: `interface ListNode {
  val: number;
  next: ListNode | null;
}

function reverseLinkedList(head: ListNode | null): ListNode | null {
  // Iterative linked list reversal: O(n) time, O(1) space
  // Reverse each pointer to point backward instead of forward
  let previousNode: ListNode | null = null;
  let currentNode: ListNode | null = head;
  while (currentNode !== null) {
    // Save the next node before we overwrite the link
    const nextNode: ListNode | null = currentNode.next;
    // Reverse the pointer direction
    currentNode.next = previousNode;
    // Advance both pointers one step forward
    previousNode = currentNode;
    currentNode = nextNode;
  }
  // previousNode is now the new head of the reversed list
  return previousNode;
}`,
    testCases: [
      {
        input: [{ val: 1, next: { val: 2, next: { val: 3, next: null } } }],
        expected: { val: 3, next: { val: 2, next: { val: 1, next: null } } },
        description: 'Reverse 1->2->3',
      },
      {
        input: [{ val: 10, next: { val: 20, next: null } }],
        expected: { val: 20, next: { val: 10, next: null } },
        description: 'Reverse 10->20',
      },
      {
        input: [{ val: 42, next: null }],
        expected: { val: 42, next: null },
        description: 'Single node',
      },
      {
        input: [null],
        expected: null,
        description: 'Empty list',
      },
    ],
    hints: [
      'Initialize prev = null, current = head',
      'In each iteration: save next = current.next, point current.next to prev',
      'Move prev to current, current to next',
    ],
    concepts: ['linked list', 'reversal', 'pointer manipulation'],
  },
  {
    id: 'ts-circular-buffer',
    title: 'Circular Buffer',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a fixed-size circular buffer (ring buffer) with enqueue, dequeue, and peek operations. Ring buffers are used in audio processing, network packet buffers, producer-consumer queues, and embedded systems with fixed memory.',
    instructions: [
      'Create a circular buffer with a given capacity',
      'enqueue(val): add to the back; return false if full',
      'dequeue(): remove from the front; return null if empty',
      'peek(): return the front element without removing; return null if empty',
      'Return an object with enqueue, dequeue, peek, and size methods',
    ],
    starterCode: `interface CircularBuffer<T> {
  enqueue(value: T): boolean;
  dequeue(): T | null;
  peek(): T | null;
  size(): number;
}

function createCircularBuffer<T>(capacity: number): CircularBuffer<T> {
  // Fixed-size circular buffer using array
  // YOUR CODE HERE
}`,
    solutionCode: `interface CircularBuffer<T> {
  enqueue(value: T): boolean;
  dequeue(): T | null;
  peek(): T | null;
  size(): number;
}

function createCircularBuffer<T>(capacity: number): CircularBuffer<T> {
  // Ring buffer with modular arithmetic: O(1) per operation, O(capacity) space
  // head/tail wrap around using modulo to reuse array slots
  const buffer: (T | undefined)[] = new Array(capacity);
  let headIndex: number = 0, tailIndex: number = 0, elementCount: number = 0;
  return {
    enqueue(value: T): boolean {
      if (elementCount === capacity) return false;
      buffer[tailIndex] = value;
      // Wrap tail to the beginning when it reaches the end
      tailIndex = (tailIndex + 1) % capacity;
      elementCount++;
      return true;
    },
    dequeue(): T | null {
      if (elementCount === 0) return null;
      const value: T = buffer[headIndex] as T;
      // Advance head, wrapping around if needed
      headIndex = (headIndex + 1) % capacity;
      elementCount--;
      return value;
    },
    peek(): T | null {
      if (elementCount === 0) return null;
      return buffer[headIndex] as T;
    },
    size(): number {
      return elementCount;
    }
  };
}`,
    testCases: [
      {
        input: [
          3,
          [
            ['enqueue', 1],
            ['enqueue', 2],
            ['enqueue', 3],
            ['enqueue', 4],
            ['dequeue'],
            ['peek'],
            ['size'],
          ],
        ],
        expected: [true, true, true, false, 1, 2, 2],
        description: 'Fill, overflow, dequeue',
      },
      {
        input: [2, [['dequeue'], ['peek'], ['enqueue', 10], ['peek'], ['dequeue'], ['size']]],
        expected: [null, null, true, 10, 10, 0],
        description: 'Empty operations then use',
      },
      {
        input: [1, [['enqueue', 5], ['enqueue', 6], ['dequeue'], ['enqueue', 7], ['peek']]],
        expected: [true, false, 5, true, 7],
        description: 'Capacity 1 wrap-around',
      },
    ],
    hints: [
      'Use modular arithmetic: tail = (tail + 1) % capacity',
      'Track count separately to distinguish full from empty',
      'head points to the front, tail points to the next write position',
    ],
    concepts: ['circular buffer', 'ring buffer', 'modular arithmetic', 'fixed-size queue'],
  },
  {
    id: 'ts-monotonic-stack',
    title: 'Next Greater Element (Monotonic Stack)',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Find the next greater element for each array element using a monotonic decreasing stack. The monotonic stack pattern solves next-greater/smaller problems in O(n) and is used in stock span, histogram area, and temperature problems.',
    instructions: [
      'Given an array, for each element find the first element to its right that is greater',
      'If no greater element exists, use -1',
      'Use a stack to process elements efficiently in O(n) time',
      'Return the array of next greater elements',
    ],
    starterCode: `function nextGreaterElement(numbers: number[]): number[] {
  // Use a monotonic stack
  // YOUR CODE HERE
}`,
    solutionCode: `function nextGreaterElement(numbers: number[]): number[] {
  // Monotonic decreasing stack: O(n) time, O(n) space
  // Stack holds indices of elements still waiting for their next greater element
  const result: number[] = new Array(numbers.length).fill(-1);
  const pendingIndices: number[] = [];
  for (let currentIndex: number = 0; currentIndex < numbers.length; currentIndex++) {
    // Pop all indices whose value is smaller than the current element
    while (pendingIndices.length > 0 && numbers[pendingIndices[pendingIndices.length - 1]] < numbers[currentIndex]) {
      const resolvedIndex: number = pendingIndices.pop()!;
      // Current element is the first greater element to the right of resolvedIndex
      result[resolvedIndex] = numbers[currentIndex];
    }
    pendingIndices.push(currentIndex);
  }
  return result;
}`,
    testCases: [
      { input: [[4, 5, 2, 10, 8]], expected: [5, 10, 10, -1, -1], description: 'Mixed values' },
      {
        input: [[2, 7, 3, 5, 4, 6, 8]],
        expected: [7, 8, 5, 6, 6, 8, -1],
        description: 'Multiple next-greaters',
      },
      {
        input: [[5, 4, 3, 2, 1]],
        expected: [-1, -1, -1, -1, -1],
        description: 'Descending (no next greater)',
      },
      { input: [[1, 2, 3, 4, 5]], expected: [2, 3, 4, 5, -1], description: 'Ascending' },
      { input: [[1]], expected: [-1], description: 'Single element' },
    ],
    hints: [
      'Maintain a stack of indices whose next greater element has not been found',
      'When processing arr[i], pop all stack indices where arr[index] < arr[i]',
      'For each popped index, arr[i] is the next greater element',
    ],
    concepts: ['monotonic stack', 'next greater element', 'stack-based iteration'],
  },
  {
    id: 'ts-sliding-window-max',
    title: 'Sliding Window Maximum (Deque)',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Find the maximum value in each sliding window of size k using a monotonic deque. This O(n) technique maintains a decreasing deque of candidates and is used in real-time streaming max/min queries and signal processing.',
    instructions: [
      'Given an array and window size k, return an array of the maximum value in each window position',
      'Use a deque (array of indices) that maintains a decreasing order of values',
      'Remove indices that are out of the current window from the front',
      'Remove indices with smaller values from the back before adding a new one',
    ],
    starterCode: `function slidingWindowMax(numbers: number[], windowSize: number): number[] {
  // Monotonic deque for window maximums
  // YOUR CODE HERE
}`,
    solutionCode: `function slidingWindowMax(numbers: number[], windowSize: number): number[] {
  // Monotonic deque for sliding window maximum: O(n) time, O(k) space
  // Deque front always holds the index of the current window's maximum
  const result: number[] = [];
  const indexDeque: number[] = [];
  for (let currentIndex: number = 0; currentIndex < numbers.length; currentIndex++) {
    // Remove indices that have slid out of the current window
    while (indexDeque.length > 0 && indexDeque[0] < currentIndex - windowSize + 1) {
      indexDeque.shift();
    }
    // Remove indices from the back whose values are smaller than the incoming element
    // because they can never be the maximum while the current element is in the window
    while (indexDeque.length > 0 && numbers[indexDeque[indexDeque.length - 1]] <= numbers[currentIndex]) {
      indexDeque.pop();
    }
    indexDeque.push(currentIndex);
    // Start recording results once the first full window is formed
    if (currentIndex >= windowSize - 1) {
      result.push(numbers[indexDeque[0]]);
    }
  }
  return result;
}`,
    testCases: [
      {
        input: [[1, 3, -1, -3, 5, 3, 6, 7], 3],
        expected: [3, 3, 5, 5, 6, 7],
        description: 'Classic sliding window max',
      },
      {
        input: [[1, 2, 3, 4, 5], 2],
        expected: [2, 3, 4, 5],
        description: 'Ascending with k=2',
      },
      {
        input: [[5, 4, 3, 2, 1], 3],
        expected: [5, 4, 3],
        description: 'Descending with k=3',
      },
      {
        input: [[1], 1],
        expected: [1],
        description: 'Single element, k=1',
      },
    ],
    hints: [
      'The deque stores indices, not values',
      'Front of deque is always the index of the current window maximum',
      'Remove from the front if the index is out of the window',
      'Remove from the back while the value at back index <= new value',
    ],
    concepts: ['monotonic deque', 'sliding window maximum', 'double-ended queue'],
  },
  {
    id: 'ts-min-stack',
    title: 'Min Stack (O(1) getMin)',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a stack that supports push, pop, top, and getMin all in O(1) time by maintaining a parallel minimum tracker. Min stack is a classic data structure interview problem that tests auxiliary storage design.',
    instructions: [
      'Create a stack with push, pop, top, and getMin methods',
      'All operations must run in O(1) time',
      'Use an auxiliary stack to track minimums',
      'Return an object with push, pop, top, and getMin methods',
    ],
    starterCode: `interface MinStack {
  push(value: number): void;
  pop(): number;
  top(): number;
  getMin(): number;
}

function createMinStack(): MinStack {
  // Stack with O(1) getMin using auxiliary stack
  // YOUR CODE HERE
}`,
    solutionCode: `interface MinStack {
  push(value: number): void;
  pop(): number;
  top(): number;
  getMin(): number;
}

function createMinStack(): MinStack {
  // Stack with O(1) getMin using an auxiliary minimum-tracking stack
  // minTracker mirrors the main stack but only records new minimums
  const dataStack: number[] = [];
  const minTracker: number[] = [];
  return {
    push(value: number): void {
      dataStack.push(value);
      // Only push to minTracker when value is a new minimum (or equal)
      if (minTracker.length === 0 || value <= minTracker[minTracker.length - 1]) {
        minTracker.push(value);
      }
    },
    pop(): number {
      const poppedValue: number = dataStack.pop()!;
      // If popped value was the current minimum, remove it from the tracker too
      if (poppedValue === minTracker[minTracker.length - 1]) {
        minTracker.pop();
      }
      return poppedValue;
    },
    top(): number {
      return dataStack[dataStack.length - 1];
    },
    getMin(): number {
      return minTracker[minTracker.length - 1];
    }
  };
}`,
    testCases: [
      {
        input: [
          [['push', -2], ['push', 0], ['push', -3], ['getMin'], ['pop'], ['top'], ['getMin']],
        ],
        expected: [null, null, null, -3, -3, 0, -2],
        description: 'Standard min stack operations',
      },
      {
        input: [[['push', 5], ['push', 3], ['push', 3], ['getMin'], ['pop'], ['getMin']]],
        expected: [null, null, null, 3, 3, 3],
        description: 'Duplicate minimums',
      },
      {
        input: [[['push', 1], ['push', 2], ['push', 3], ['getMin'], ['pop'], ['pop'], ['getMin']]],
        expected: [null, null, null, 1, 3, 2, 1],
        description: 'Min stays at bottom',
      },
    ],
    hints: [
      'Maintain a second stack that only tracks minimum values',
      'Push to minStack when the new value is <= current minimum',
      'Pop from minStack when the popped value equals the current minimum',
    ],
    concepts: ['min stack', 'auxiliary stack', 'O(1) minimum'],
  },
  {
    id: 'ts-two-stack-queue',
    title: 'Queue Using Two Stacks',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a FIFO queue using two LIFO stacks with amortized O(1) operations. This is a classic data structure design problem that demonstrates how combining simple structures can simulate more complex behavior.',
    instructions: [
      'Implement enqueue and dequeue operations using only two stacks (arrays with push/pop)',
      'enqueue(val): add to the queue',
      'dequeue(): remove and return the front element, or null if empty',
      'Use an input stack and an output stack; transfer elements lazily',
      'Return an object with enqueue, dequeue, and peek methods',
    ],
    starterCode: `interface Queue<T> {
  enqueue(value: T): void;
  dequeue(): T | null;
  peek(): T | null;
}

function createQueueFromStacks<T>(): Queue<T> {
  // Two stacks: input and output
  // YOUR CODE HERE
}`,
    solutionCode: `interface Queue<T> {
  enqueue(value: T): void;
  dequeue(): T | null;
  peek(): T | null;
}

function createQueueFromStacks<T>(): Queue<T> {
  // FIFO queue from two LIFO stacks: amortized O(1) per operation
  // Lazy transfer: only move elements when outStack is empty
  const inputStack: T[] = [];
  const outputStack: T[] = [];
  function transferIfNeeded(): void {
    // Only transfer when output is empty, reversing input order to get FIFO
    if (outputStack.length === 0) {
      while (inputStack.length > 0) {
        outputStack.push(inputStack.pop()!);
      }
    }
  }
  return {
    enqueue(value: T): void {
      inputStack.push(value);
    },
    dequeue(): T | null {
      transferIfNeeded();
      return outputStack.length > 0 ? outputStack.pop()! : null;
    },
    peek(): T | null {
      transferIfNeeded();
      return outputStack.length > 0 ? outputStack[outputStack.length - 1] : null;
    }
  };
}`,
    testCases: [
      {
        input: [
          [['enqueue', 1], ['enqueue', 2], ['dequeue'], ['enqueue', 3], ['dequeue'], ['dequeue']],
        ],
        expected: [null, null, 1, null, 2, 3],
        description: 'FIFO order maintained',
      },
      {
        input: [[['dequeue'], ['enqueue', 10], ['peek'], ['dequeue'], ['dequeue']]],
        expected: [null, null, 10, 10, null],
        description: 'Empty dequeue and peek',
      },
      {
        input: [
          [['enqueue', 1], ['enqueue', 2], ['enqueue', 3], ['dequeue'], ['dequeue'], ['dequeue']],
        ],
        expected: [null, null, null, 1, 2, 3],
        description: 'Batch enqueue then dequeue',
      },
    ],
    hints: [
      'enqueue always pushes to inStack',
      'dequeue pops from outStack; if outStack is empty, transfer all from inStack first',
      'Lazy transfer gives amortized O(1) per operation',
    ],
    concepts: ['queue', 'two stacks', 'amortized complexity', 'lazy transfer'],
  },

  // ========== DATA STRUCTURES (continued) ==========
  {
    id: 'ts-disjoint-set-rank',
    title: 'Union-Find with Rank and Path Compression',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Implement Union-Find with both union by rank and path compression for near-constant-time operations. This optimized DSU achieves inverse Ackermann amortized time and is essential for Kruskal's MST, network connectivity, and equivalence classes.",
    instructions: [
      'Implement find(parent, x) with path compression: make every node point directly to root',
      'Implement union(parent, rank, x, y): merge sets by rank, attach smaller tree under larger',
      'Return an object { parent, rank } after performing all union operations on n elements',
    ],
    starterCode: `function disjointSetRank(size: number, unions: [number, number][]): { parent: number[]; rank: number[] } {
  const parent: number[] = Array.from({ length: size }, (_, i) => i);
  const rank: number[] = new Array(size).fill(0);

  function find(x: number): number {
    // Path compression: make x point directly to root
    // YOUR CODE HERE
  }

  function union(x: number, y: number): void {
    const rootX: number = find(x);
    const rootY: number = find(y);
    if (rootX === rootY) return;
    // Union by rank: attach smaller tree under bigger
    // YOUR CODE HERE
  }

  for (const [x, y] of unions) {
    union(x, y);
  }

  // Compress all paths for final state
  for (let i = 0; i < size; i++) find(i);
  return { parent: [...parent], rank: [...rank] };
}`,
    solutionCode: `function disjointSetRank(size: number, unions: [number, number][]): { parent: number[]; rank: number[] } {
  // Union-Find with path compression and union by rank
  // find: O(alpha(n)) amortized, union: O(alpha(n)) amortized
  const parent: number[] = Array.from({ length: size }, (_, i) => i);
  const rank: number[] = new Array(size).fill(0);

  function find(x: number): number {
    if (parent[x] !== x) {
      // Path compression: point directly to root to flatten the tree
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x: number, y: number): void {
    const rootX: number = find(x);
    const rootY: number = find(y);
    if (rootX === rootY) return;
    // Union by rank: attach the shorter tree under the taller one
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      // Equal ranks: arbitrarily pick one as root and increase its rank
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  }

  for (const [x, y] of unions) {
    union(x, y);
  }

  // Final pass: compress all paths so every node points directly to its root
  for (let i = 0; i < size; i++) find(i);
  return { parent: [...parent], rank: [...rank] };
}`,
    testCases: [
      {
        input: [
          5,
          [
            [0, 1],
            [2, 3],
            [1, 3],
          ],
        ],
        expected: { parent: [0, 0, 0, 0, 4], rank: [2, 0, 0, 0, 0] },
        description: 'Merge three pairs into one component',
      },
      {
        input: [
          4,
          [
            [0, 1],
            [2, 3],
          ],
        ],
        expected: { parent: [0, 0, 2, 2], rank: [1, 0, 1, 0] },
        description: 'Two separate components',
      },
      {
        input: [3, []],
        expected: { parent: [0, 1, 2], rank: [0, 0, 0] },
        description: 'No unions, each is its own root',
      },
    ],
    hints: [
      'Path compression: if parent[x] !== x, set parent[x] = find(parent[x])',
      'Union by rank: attach root with smaller rank under root with larger rank',
      'When ranks are equal, pick one as root and increment its rank',
    ],
    concepts: ['union-find', 'path compression', 'union by rank', 'disjoint sets'],
  },
  {
    id: 'ts-weighted-graph',
    title: 'Build Weighted Adjacency List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      "Build a weighted adjacency list from an edge list, the standard representation for weighted graphs. Weighted adjacency lists are required by Dijkstra, Bellman-Ford, Prim's MST, and most shortest-path and network flow algorithms.",
    instructions: [
      'Given edges as [u, v, weight] triples and number of nodes, build an adjacency list',
      'Each node maps to an array of { node, weight } objects',
      'The graph is undirected: add edges in both directions',
    ],
    starterCode: `interface WeightedEdge {
  node: number;
  weight: number;
}

function buildWeightedGraph(size: number, edges: [number, number, number][]): Record<number, WeightedEdge[]> {
  const graph: Record<number, WeightedEdge[]> = {};
  for (let i = 0; i < size; i++) {
    graph[i] = [];
  }

  // Add each edge in both directions with weight
  // YOUR CODE HERE

  return graph;
}`,
    solutionCode: `interface WeightedEdge {
  node: number;
  weight: number;
}

function buildWeightedGraph(size: number, edges: [number, number, number][]): Record<number, WeightedEdge[]> {
  // Build undirected weighted adjacency list: O(V + E) time, O(V + E) space
  const graph: Record<number, WeightedEdge[]> = {};
  // Initialize empty adjacency list for each node
  for (let i = 0; i < size; i++) {
    graph[i] = [];
  }

  // Add each edge in both directions since the graph is undirected
  for (const [u, v, w] of edges) {
    graph[u].push({ node: v, weight: w });
    graph[v].push({ node: u, weight: w });
  }

  return graph;
}`,
    testCases: [
      {
        input: [
          3,
          [
            [0, 1, 5],
            [1, 2, 3],
          ],
        ],
        expected: {
          0: [{ node: 1, weight: 5 }],
          1: [
            { node: 0, weight: 5 },
            { node: 2, weight: 3 },
          ],
          2: [{ node: 1, weight: 3 }],
        },
        description: 'Simple 3-node graph',
      },
      {
        input: [2, [[0, 1, 10]]],
        expected: {
          0: [{ node: 1, weight: 10 }],
          1: [{ node: 0, weight: 10 }],
        },
        description: 'Two nodes, one edge',
      },
      {
        input: [3, []],
        expected: { 0: [], 1: [], 2: [] },
        description: 'No edges',
      },
    ],
    hints: [
      'Destructure each edge as [u, v, w]',
      'Push { node: v, weight: w } to graph[u]',
      'For undirected, also push { node: u, weight: w } to graph[v]',
    ],
    concepts: ['adjacency list', 'weighted graph', 'graph representation'],
  },
  {
    id: 'ts-fenwick-tree-update',
    title: 'Fenwick Tree: Point Update',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement point update for a Binary Indexed Tree (Fenwick Tree) enabling O(log n) prefix sum queries after updates. Fenwick trees are used in competitive programming, range query systems, and counting inversions.',
    instructions: [
      'Given a Fenwick tree array (1-indexed), update index i by adding delta',
      'Traverse upward by adding the lowest set bit: i += i & (-i)',
      'Return the updated tree array',
    ],
    starterCode: `function fenwickUpdate(tree: number[], size: number, i: number, delta: number): number[] {
  // Update Fenwick tree at index i (1-indexed) by adding delta
  // Move to next responsible node: i += i & (-i)
  // YOUR CODE HERE

  return tree;
}`,
    solutionCode: `function fenwickUpdate(tree: number[], size: number, i: number, delta: number): number[] {
  // Fenwick tree point update: O(log n) time
  // Propagates delta to all responsible ancestor nodes
  while (i <= size) {
    tree[i] += delta;
    // Move to next responsible node by adding the lowest set bit
    i += i & (-i);
  }
  return tree;
}`,
    testCases: [
      {
        input: [[0, 0, 0, 0, 0, 0], 5, 1, 3],
        expected: [0, 3, 3, 0, 3, 0],
        description: 'Update index 1 by +3',
      },
      {
        input: [[0, 0, 0, 0, 0, 0], 5, 3, 5],
        expected: [0, 0, 0, 5, 5, 0],
        description: 'Update index 3 by +5',
      },
      {
        input: [[0, 1, 1, 0, 1, 0], 5, 2, 4],
        expected: [0, 1, 5, 0, 5, 0],
        description: 'Update existing tree at index 2',
      },
    ],
    hints: [
      'Fenwick tree is 1-indexed, so index 0 is unused',
      'i & (-i) isolates the lowest set bit of i',
      'Keep adding delta and moving up: i += i & (-i)',
    ],
    concepts: ['Fenwick tree', 'binary indexed tree', 'point update', 'bit manipulation'],
  },
  {
    id: 'ts-fenwick-tree-query',
    title: 'Fenwick Tree: Prefix Sum Query',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement prefix sum query for a Fenwick Tree, computing sum from index 1 to i in O(log n) time. This complements point updates to create a powerful data structure for dynamic cumulative frequency tables and range queries.',
    instructions: [
      'Given a Fenwick tree array (1-indexed), compute the prefix sum from index 1 to i',
      'Traverse downward by removing the lowest set bit: i -= i & (-i)',
      'Accumulate the sum at each step',
    ],
    starterCode: `function fenwickQuery(tree: number[], i: number): number {
  let sum: number = 0;
  // Accumulate sum by removing lowest set bit: i -= i & (-i)
  // YOUR CODE HERE

  return sum;
}`,
    solutionCode: `function fenwickQuery(tree: number[], i: number): number {
  // Fenwick tree prefix sum query: O(log n) time
  // Accumulates partial sums stored at responsible nodes
  let prefixSum: number = 0;
  while (i > 0) {
    prefixSum += tree[i];
    // Move to parent by stripping the lowest set bit
    i -= i & (-i);
  }
  return prefixSum;
}`,
    testCases: [
      {
        input: [[0, 1, 3, 2, 10, 4], 5],
        expected: 14,
        description: 'Prefix sum of all 5 elements',
      },
      {
        input: [[0, 1, 3, 2, 10, 4], 3],
        expected: 4,
        description: 'Prefix sum of first 3 elements',
      },
      {
        input: [[0, 1, 3, 2, 10, 4], 1],
        expected: 1,
        description: 'Prefix sum of first element only',
      },
    ],
    hints: [
      'Start from index i and move toward index 0',
      'At each step, add tree[i] to sum',
      'Remove lowest set bit: i -= i & (-i)',
    ],
    concepts: ['Fenwick tree', 'prefix sum', 'binary indexed tree', 'bit manipulation'],
  },
  {
    id: 'ts-hash-map-chaining',
    title: 'Hash Map with Separate Chaining',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a hash map using separate chaining for collision resolution with put, get, and remove operations. Understanding hash map internals is crucial for interviews and helps explain the O(1) average-case performance of Map and Set.',
    instructions: [
      'Implement put(key, value), get(key), and remove(key) operations',
      'Use a simple hash: sum of char codes mod capacity',
      'Each bucket is an array of [key, value] pairs',
      'Execute the given operations and return results of all get operations',
    ],
    starterCode: `type HashOperation = ['put', string, number] | ['get', string] | ['remove', string];

function hashMapChaining(capacity: number, operations: HashOperation[]): number[] {
  const buckets: [string, number][][] = Array.from({ length: capacity }, () => []);
  const results: number[] = [];

  function hash(key: string): number {
    let h: number = 0;
    for (const c of String(key)) h += c.charCodeAt(0);
    return h % capacity;
  }

  function put(key: string, value: number): void {
    const idx: number = hash(key);
    const bucket: [string, number][] = buckets[idx];
    // Update existing or add new [key, value]
    // YOUR CODE HERE
  }

  function get(key: string): number {
    const idx: number = hash(key);
    const bucket: [string, number][] = buckets[idx];
    // Find and return value, or -1 if not found
    // YOUR CODE HERE
  }

  function remove(key: string): void {
    const idx: number = hash(key);
    const bucket: [string, number][] = buckets[idx];
    // Remove pair with matching key
    // YOUR CODE HERE
  }

  for (const op of operations) {
    if (op[0] === 'put') put(op[1], op[2]);
    else if (op[0] === 'get') results.push(get(op[1]));
    else if (op[0] === 'remove') remove(op[1]);
  }

  return results;
}`,
    solutionCode: `type HashOperation = ['put', string, number] | ['get', string] | ['remove', string];

function hashMapChaining(capacity: number, operations: HashOperation[]): number[] {
  // Hash map with separate chaining: O(1) average, O(n) worst per operation
  const buckets: [string, number][][] = Array.from({ length: capacity }, () => []);
  const results: number[] = [];

  function hash(key: string): number {
    // Simple hash: sum of char codes mod capacity
    let charCodeSum: number = 0;
    for (const c of String(key)) charCodeSum += c.charCodeAt(0);
    return charCodeSum % capacity;
  }

  function put(key: string, value: number): void {
    const bucketIndex: number = hash(key);
    const bucket: [string, number][] = buckets[bucketIndex];
    // Check if key already exists to update in-place
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    // Key not found: append new entry to the chain
    bucket.push([key, value]);
  }

  function get(key: string): number {
    const bucketIndex: number = hash(key);
    const bucket: [string, number][] = buckets[bucketIndex];
    // Linear scan through the chain for matching key
    for (const pair of bucket) {
      if (pair[0] === key) return pair[1];
    }
    return -1;
  }

  function remove(key: string): void {
    const bucketIndex: number = hash(key);
    const bucket: [string, number][] = buckets[bucketIndex];
    const matchIndex: number = bucket.findIndex((pair: [string, number]) => pair[0] === key);
    if (matchIndex !== -1) bucket.splice(matchIndex, 1);
  }

  for (const op of operations) {
    if (op[0] === 'put') put(op[1], op[2]);
    else if (op[0] === 'get') results.push(get(op[1]));
    else if (op[0] === 'remove') remove(op[1]);
  }

  return results;
}`,
    testCases: [
      {
        input: [
          10,
          [
            ['put', 'a', 1],
            ['put', 'b', 2],
            ['get', 'a'],
            ['get', 'b'],
            ['get', 'c'],
          ],
        ],
        expected: [1, 2, -1],
        description: 'Basic put and get',
      },
      {
        input: [
          10,
          [
            ['put', 'a', 1],
            ['put', 'a', 99],
            ['get', 'a'],
          ],
        ],
        expected: [99],
        description: 'Overwrite existing key',
      },
      {
        input: [
          10,
          [
            ['put', 'x', 5],
            ['remove', 'x'],
            ['get', 'x'],
          ],
        ],
        expected: [-1],
        description: 'Remove then get returns -1',
      },
    ],
    hints: [
      'For put: scan bucket for existing key, update if found, else push new pair',
      'For get: scan bucket for key, return value or -1',
      'For remove: find index with findIndex, splice if found',
    ],
    concepts: ['hash map', 'separate chaining', 'collision resolution', 'hash function'],
  },
  {
    id: 'ts-deque',
    title: 'Double-Ended Queue (Deque)',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Implement a double-ended queue (deque) supporting push and pop from both front and back. Deques combine stack and queue capabilities and are used in sliding window algorithms, BFS optimizations, and work-stealing schedulers.',
    instructions: [
      'Process a list of operations: pushFront, pushBack, popFront, popBack',
      'popFront/popBack return the removed value or -1 if empty',
      'Return an array of all pop results',
    ],
    starterCode: `type DequeOperation = ['pushFront', number] | ['pushBack', number] | ['popFront'] | ['popBack'];

function dequeOperations(operations: DequeOperation[]): number[] {
  const deque: number[] = [];
  const results: number[] = [];

  for (const op of operations) {
    if (op[0] === 'pushFront') {
      // Add to front
      // YOUR CODE HERE
    } else if (op[0] === 'pushBack') {
      // Add to back
      // YOUR CODE HERE
    } else if (op[0] === 'popFront') {
      // Remove from front, push result or -1
      // YOUR CODE HERE
    } else if (op[0] === 'popBack') {
      // Remove from back, push result or -1
      // YOUR CODE HERE
    }
  }

  return results;
}`,
    solutionCode: `type DequeOperation = ['pushFront', number] | ['pushBack', number] | ['popFront'] | ['popBack'];

function dequeOperations(operations: DequeOperation[]): number[] {
  // Double-ended queue using array: O(n) pushFront/popFront, O(1) pushBack/popBack
  const deque: number[] = [];
  const popResults: number[] = [];

  for (const op of operations) {
    if (op[0] === 'pushFront') {
      deque.unshift(op[1]);
    } else if (op[0] === 'pushBack') {
      deque.push(op[1]);
    } else if (op[0] === 'popFront') {
      // Return -1 sentinel when deque is empty
      popResults.push(deque.length > 0 ? deque.shift()! : -1);
    } else if (op[0] === 'popBack') {
      popResults.push(deque.length > 0 ? deque.pop()! : -1);
    }
  }

  return popResults;
}`,
    testCases: [
      {
        input: [[['pushBack', 1], ['pushBack', 2], ['pushFront', 0], ['popFront'], ['popBack']]],
        expected: [0, 2],
        description: 'Push both ends, pop both ends',
      },
      {
        input: [[['popFront'], ['popBack']]],
        expected: [-1, -1],
        description: 'Pop from empty deque',
      },
      {
        input: [
          [
            ['pushFront', 3],
            ['pushFront', 2],
            ['pushFront', 1],
            ['popFront'],
            ['popFront'],
            ['popFront'],
          ],
        ],
        expected: [1, 2, 3],
        description: 'All pushFront then popFront gives LIFO order',
      },
    ],
    hints: [
      'unshift adds to the front, shift removes from front',
      'push adds to back, pop removes from back',
      'Check deque.length > 0 before removing',
    ],
    concepts: ['deque', 'double-ended queue', 'unshift', 'shift'],
  },

  // ========== RECURSION ==========
  {
    id: 'ts-fast-power',
    title: 'Fast Power (Binary Exponentiation)',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Compute base^exp using binary exponentiation in O(log n) multiplications instead of O(n). Fast power is a key building block in modular arithmetic, RSA cryptography, matrix exponentiation, and competitive programming.',
    instructions: [
      'If exp is 0, return 1',
      'If exp is even, compute half = fastPower(base, exp/2) and return half * half',
      'If exp is odd, return base * fastPower(base, exp - 1)',
    ],
    starterCode: `function fastPower(base: number, exponent: number): number {
  // Base case
  // YOUR CODE HERE

  // Even exponent: square the half result
  // Odd exponent: multiply by base
  // YOUR CODE HERE
}`,
    solutionCode: `function fastPower(base: number, exponent: number): number {
  // Binary exponentiation: O(log n) time, O(log n) stack space
  // Halves the exponent at each step instead of decrementing by 1
  if (exponent === 0) return 1;
  if (exponent % 2 === 0) {
    // Even exponent: compute half once and square to avoid redundant recursion
    const halfPower: number = fastPower(base, exponent / 2);
    return halfPower * halfPower;
  }
  // Odd exponent: factor out one base to make exponent even
  return base * fastPower(base, exponent - 1);
}`,
    testCases: [
      { input: [2, 10], expected: 1024, description: '2^10 = 1024' },
      { input: [3, 5], expected: 243, description: '3^5 = 243' },
      { input: [5, 0], expected: 1, description: 'Any^0 = 1' },
      { input: [7, 1], expected: 7, description: '7^1 = 7' },
      { input: [2, 20], expected: 1048576, description: '2^20 = 1048576' },
    ],
    hints: [
      'Base case: exp === 0 returns 1',
      'Even case: fastPower(base, exp/2) squared avoids redundant work',
      'Odd case: reduce to even by multiplying out one base',
    ],
    concepts: ['binary exponentiation', 'divide and conquer', 'recursion', 'logarithmic time'],
  },
  {
    id: 'ts-flood-fill',
    title: 'Flood Fill',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Flood fill a 2D grid from a starting position with a new color, like a paint bucket tool. This grid DFS/BFS pattern is used in image editing, game map exploration, connected component labeling, and island-counting problems.',
    instructions: [
      'Given a grid, starting row r, column c, and newColor, fill all connected same-color cells',
      'Connected means up, down, left, right (4-directional)',
      'Return the modified grid',
    ],
    starterCode: `function floodFill(grid: number[][], row: number, col: number, newColor: number): number[][] {
  const origColor: number = grid[row][col];
  if (origColor === newColor) return grid;

  function fill(r: number, c: number): void {
    // Check bounds and matching color, then recurse in 4 directions
    // YOUR CODE HERE
  }

  fill(row, col);
  return grid;
}`,
    solutionCode: `function floodFill(grid: number[][], row: number, col: number, newColor: number): number[][] {
  // Flood fill via DFS: O(rows * cols) time, O(rows * cols) stack space
  const origColor: number = grid[row][col];
  // Early exit: painting same color would cause infinite recursion
  if (origColor === newColor) return grid;

  function fill(r: number, c: number): void {
    // Boundary checks
    if (r < 0 || r >= grid.length) return;
    if (c < 0 || c >= grid[0].length) return;
    // Only fill cells matching the original color
    if (grid[r][c] !== origColor) return;

    // Paint current cell, then recursively fill all 4 neighbors
    grid[r][c] = newColor;
    fill(r + 1, c);
    fill(r - 1, c);
    fill(r, c + 1);
    fill(r, c - 1);
  }

  fill(row, col);
  return grid;
}`,
    testCases: [
      {
        input: [
          [
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 1],
          ],
          1,
          1,
          2,
        ],
        expected: [
          [2, 2, 2],
          [2, 2, 0],
          [2, 0, 1],
        ],
        description: 'Fill connected 1s with 2',
      },
      {
        input: [
          [
            [0, 0, 0],
            [0, 0, 0],
          ],
          0,
          0,
          5,
        ],
        expected: [
          [5, 5, 5],
          [5, 5, 5],
        ],
        description: 'Fill entire grid',
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
          ],
          0,
          0,
          9,
        ],
        expected: [
          [9, 2],
          [3, 4],
        ],
        description: 'Single cell with no matching neighbors',
      },
    ],
    hints: [
      'Save the original color before filling',
      'Check bounds first: row/col must be within grid',
      'Only fill cells that match the original color',
      'Recurse in all 4 directions after setting current cell',
    ],
    concepts: ['flood fill', 'DFS', '2D grid', 'recursion', 'connected components'],
  },
  {
    id: 'ts-generate-parens',
    title: 'Generate Valid Parentheses',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Generate all valid combinations of n pairs of parentheses using constraint-based backtracking. This classic problem teaches pruning invalid branches early and appears in expression generation, Catalan number applications, and compiler design.',
    instructions: [
      'Generate all strings of n pairs of balanced parentheses',
      'Track open and close counts; only add "(" if open < n, ")" if close < open',
      'Base case: when string length equals 2*n, add to result',
    ],
    starterCode: `function generateParens(count: number): string[] {
  const result: string[] = [];

  function generate(current: string, open: number, close: number): void {
    if (current.length === 2 * count) {
      result.push(current);
      return;
    }
    // Add '(' if open < count
    // Add ')' if close < open
    // YOUR CODE HERE
  }

  generate('', 0, 0);
  return result;
}`,
    solutionCode: `function generateParens(count: number): string[] {
  // Backtracking with constraints: generates only valid combinations
  // Time: O(4^n / sqrt(n)) (Catalan number), Space: O(n) recursion depth
  const validCombinations: string[] = [];

  function generate(current: string, open: number, close: number): void {
    if (current.length === 2 * count) {
      validCombinations.push(current);
      return;
    }
    // Can add '(' only if we haven't used all opening parens
    if (open < count) {
      generate(current + '(', open + 1, close);
    }
    // Can add ')' only if it won't create an invalid prefix
    if (close < open) {
      generate(current + ')', open, close + 1);
    }
  }

  generate('', 0, 0);
  return validCombinations;
}`,
    testCases: [
      {
        input: 3,
        expected: ['((()))', '(()())', '(())()', '()(())', '()()()'],
        description: '3 pairs of parentheses',
      },
      {
        input: 2,
        expected: ['(())', '()()'],
        description: '2 pairs',
      },
      {
        input: 1,
        expected: ['()'],
        description: '1 pair',
      },
    ],
    hints: [
      'Track how many open and close parens have been placed',
      'Can add "(" only if open count < n',
      'Can add ")" only if close count < open count (ensures validity)',
    ],
    concepts: ['backtracking', 'parentheses generation', 'constraint recursion', 'string building'],
  },
  {
    id: 'ts-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Solve the Tower of Hanoi for n disks, returning the list of moves as [from, to] pairs. This classic recursion problem demonstrates divide-and-conquer thinking and produces 2^n - 1 moves, illustrating exponential growth.',
    instructions: [
      'Move n disks from source peg to target peg using auxiliary peg',
      'Move n-1 disks from source to auxiliary, move disk n to target, move n-1 from auxiliary to target',
      'Return array of [from, to] moves using peg labels "A", "B", "C"',
    ],
    starterCode: `function towerOfHanoi(count: number, source: string, target: string, auxiliary: string): [string, string][] {
  const moves: [string, string][] = [];

  function solve(disks: number, src: string, tgt: string, aux: string): void {
    if (disks === 0) return;
    // Move n-1 disks to auxiliary, move 1 disk to target, move n-1 to target
    // YOUR CODE HERE
  }

  solve(count, source, target, auxiliary);
  return moves;
}`,
    solutionCode: `function towerOfHanoi(count: number, source: string, target: string, auxiliary: string): [string, string][] {
  // Tower of Hanoi: O(2^n - 1) moves, O(n) recursion depth
  const moves: [string, string][] = [];

  function solve(disks: number, src: string, tgt: string, aux: string): void {
    if (disks === 0) return;
    // Step 1: move n-1 smaller disks out of the way to auxiliary peg
    solve(disks - 1, src, aux, tgt);
    // Step 2: move the largest disk directly to target
    moves.push([src, tgt]);
    // Step 3: move the n-1 disks from auxiliary to target
    solve(disks - 1, aux, tgt, src);
  }

  solve(count, source, target, auxiliary);
  return moves;
}`,
    testCases: [
      {
        input: [2, 'A', 'C', 'B'],
        expected: [
          ['A', 'B'],
          ['A', 'C'],
          ['B', 'C'],
        ],
        description: '2 disks: 3 moves',
      },
      {
        input: [3, 'A', 'C', 'B'],
        expected: [
          ['A', 'C'],
          ['A', 'B'],
          ['C', 'B'],
          ['A', 'C'],
          ['B', 'A'],
          ['B', 'C'],
          ['A', 'C'],
        ],
        description: '3 disks: 7 moves',
      },
      {
        input: [1, 'A', 'C', 'B'],
        expected: [['A', 'C']],
        description: '1 disk: 1 move',
      },
    ],
    hints: [
      'Base case: 0 disks means no moves',
      'Recursive: move n-1 to aux, move largest to target, move n-1 from aux to target',
      'Total moves = 2^n - 1',
    ],
    concepts: ['Tower of Hanoi', 'recursion', 'divide and conquer', 'classic problem'],
  },
  {
    id: 'ts-deep-clone',
    title: 'Deep Clone Object/Array',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Deep clone a nested object or array structure without shared references, handling objects, arrays, and primitives. Deep cloning is a fundamental utility for immutable state management in React/Redux and avoiding mutation bugs.',
    instructions: [
      'If value is null or not an object, return it directly (primitive)',
      'If value is an array, recursively clone each element',
      'If value is an object, recursively clone each property',
    ],
    starterCode: `function deepClone<T>(value: T): T {
  // Handle primitives and null
  // Handle arrays
  // Handle objects
  // YOUR CODE HERE
}`,
    solutionCode: `function deepClone<T>(value: T): T {
  // Recursive deep clone: O(n) time where n = total nested elements
  // Handles primitives, arrays, and plain objects (no circular refs)
  if (value === null || typeof value !== 'object') {
    // Primitives and null are immutable, safe to return directly
    return value;
  }
  if (Array.isArray(value)) {
    // Recursively clone each array element to avoid shared references
    return value.map(item => deepClone(item)) as unknown as T;
  }
  // Plain object: clone each own property recursively
  const clonedObject: Record<string, unknown> = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObject[key] = deepClone((value as Record<string, unknown>)[key]);
    }
  }
  return clonedObject as T;
}`,
    testCases: [
      {
        input: [{ a: 1, b: { c: 2, d: [3, 4] } }],
        expected: { a: 1, b: { c: 2, d: [3, 4] } },
        description: 'Nested object with array',
      },
      {
        input: [[1, [2, [3, [4]]]]],
        expected: [1, [2, [3, [4]]]],
        description: 'Deeply nested array',
      },
      {
        input: [42],
        expected: 42,
        description: 'Primitive value returned as-is',
      },
      {
        input: [null],
        expected: null,
        description: 'Null returned as-is',
      },
    ],
    hints: [
      'Check typeof value !== "object" or value === null for primitives',
      'Use Array.isArray() to differentiate arrays from objects',
      'Recursively clone each property or element',
    ],
    concepts: ['deep clone', 'recursion', 'type checking', 'object traversal'],
  },
  {
    id: 'ts-subset-sum-exists',
    title: 'Subset Sum Exists (Backtracking)',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Check if any subset of an array sums to a target value using backtracking. The subset sum problem is NP-complete and foundational to knapsack, partition, and scheduling problems. Backtracking prunes branches that exceed the target.',
    instructions: [
      'Given an array of positive integers and a target, return true if any subset sums to target',
      'For each element, try including it or excluding it',
      'Use early termination: stop if current sum exceeds target',
    ],
    starterCode: `function subsetSumExists(numbers: number[], target: number): boolean {
  function backtrack(index: number, currentSum: number): boolean {
    if (currentSum === target) return true;
    if (index >= numbers.length || currentSum > target) return false;

    // Include numbers[index] or skip it
    // YOUR CODE HERE
  }

  return backtrack(0, 0);
}`,
    solutionCode: `function subsetSumExists(numbers: number[], target: number): boolean {
  // Backtracking with pruning: O(2^n) worst case, O(n) stack space
  function backtrack(index: number, currentSum: number): boolean {
    if (currentSum === target) return true;
    // Prune: stop exploring if we've exceeded the target or exhausted elements
    if (index >= numbers.length || currentSum > target) return false;

    // Include current element OR skip it (binary choice tree)
    return backtrack(index + 1, currentSum + numbers[index])
        || backtrack(index + 1, currentSum);
  }

  return backtrack(0, 0);
}`,
    testCases: [
      { input: [[3, 34, 4, 12, 5, 2], 9], expected: true, description: 'Subset {4, 5} sums to 9' },
      { input: [[3, 34, 4, 12, 5, 2], 30], expected: false, description: 'No subset sums to 30' },
      { input: [[1, 2, 3], 6], expected: true, description: 'All elements sum to target' },
      { input: [[1, 2, 3], 0], expected: true, description: 'Empty subset sums to 0' },
      { input: [[], 1], expected: false, description: 'Empty array, nonzero target' },
    ],
    hints: [
      'Two choices per element: include (add to sum) or exclude (skip)',
      'Return true if either branch returns true (use ||)',
      'Prune: if currentSum > target, return false early',
    ],
    concepts: ['backtracking', 'subset sum', 'include/exclude pattern', 'pruning'],
  },
  {
    id: 'ts-n-queens-count',
    title: 'N-Queens Count',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Count all valid N-Queens placements on an NxN board where no two queens share a row, column, or diagonal. N-Queens is the quintessential backtracking problem, teaching constraint propagation and systematic search space exploration.',
    instructions: [
      'Place queens row by row; for each row, try each column',
      'Track occupied columns and diagonals using Sets',
      'Diagonals: row-col for one direction, row+col for the other',
    ],
    starterCode: `function nQueensCount(size: number): number {
  let count: number = 0;
  const cols: Set<number> = new Set();
  const diag1: Set<number> = new Set();  // row - col
  const diag2: Set<number> = new Set();  // row + col

  function solve(row: number): void {
    if (row === size) {
      count++;
      return;
    }
    for (let col = 0; col < size; col++) {
      // Check if column and diagonals are free, place queen, recurse, remove
      // YOUR CODE HERE
    }
  }

  solve(0);
  return count;
}`,
    solutionCode: `function nQueensCount(size: number): number {
  // N-Queens backtracking: O(n!) time, O(n) space for tracking sets
  let solutionCount: number = 0;
  const occupiedCols: Set<number> = new Set();
  const occupiedDiag1: Set<number> = new Set();  // row - col identifies one diagonal direction
  const occupiedDiag2: Set<number> = new Set();  // row + col identifies the other diagonal

  function solve(row: number): void {
    if (row === size) {
      solutionCount++;
      return;
    }
    for (let col = 0; col < size; col++) {
      // Skip if column or either diagonal is already attacked
      if (occupiedCols.has(col) || occupiedDiag1.has(row - col) || occupiedDiag2.has(row + col)) continue;
      // Place queen and mark attacked lines
      occupiedCols.add(col);
      occupiedDiag1.add(row - col);
      occupiedDiag2.add(row + col);
      solve(row + 1);
      // Backtrack: remove queen to try next column
      occupiedCols.delete(col);
      occupiedDiag1.delete(row - col);
      occupiedDiag2.delete(row + col);
    }
  }

  solve(0);
  return solutionCount;
}`,
    testCases: [
      { input: 4, expected: 2, description: '4-Queens has 2 solutions' },
      { input: 1, expected: 1, description: '1-Queen has 1 solution' },
      { input: 5, expected: 10, description: '5-Queens has 10 solutions' },
      { input: 8, expected: 92, description: '8-Queens has 92 solutions' },
    ],
    hints: [
      'Two queens share a diagonal if |row1-row2| === |col1-col2|',
      'Use row-col for one diagonal direction, row+col for the other',
      'Backtrack: add to sets before recursing, remove after returning',
    ],
    concepts: ['N-Queens', 'backtracking', 'constraint propagation', 'diagonal tracking'],
  },
  {
    id: 'ts-word-search-grid',
    title: 'Word Search in Grid',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Check if a word exists in a 2D character grid by traversing adjacent cells without reusing any cell. This DFS backtracking problem combines grid traversal with path tracking and is a classic medium-difficulty interview question.',
    instructions: [
      'Search for word starting from every cell in the grid',
      'For each cell, try extending the path in 4 directions',
      'Mark visited cells to prevent reuse, then unmark (backtrack)',
    ],
    starterCode: `function wordSearch(board: string[][], word: string): boolean {
  const rows: number = board.length;
  const cols: number = board[0].length;

  function dfs(r: number, c: number, idx: number): boolean {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[idx]) return false;

    // Mark visited, recurse 4 directions, unmark
    // YOUR CODE HERE
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}`,
    solutionCode: `function wordSearch(board: string[][], word: string): boolean {
  // DFS backtracking on 2D grid: O(m*n*4^L) time where L = word length
  const rows: number = board.length;
  const cols: number = board[0].length;

  function dfs(r: number, c: number, charIndex: number): boolean {
    if (charIndex === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[charIndex]) return false;

    // Mark cell as visited using sentinel to prevent revisiting in this path
    const savedChar: string = board[r][c];
    board[r][c] = '#';
    // Try all 4 adjacent cells for the next character
    const found: boolean = dfs(r + 1, c, charIndex + 1)
              || dfs(r - 1, c, charIndex + 1)
              || dfs(r, c + 1, charIndex + 1)
              || dfs(r, c - 1, charIndex + 1);
    // Restore original character for other search paths
    board[r][c] = savedChar;
    return found;
  }

  // Try starting the word from every cell in the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}`,
    testCases: [
      {
        input: [
          [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          'ABCCED',
        ],
        expected: true,
        description: 'Word found with turns',
      },
      {
        input: [
          [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          'SEE',
        ],
        expected: true,
        description: 'Word found at bottom-right',
      },
      {
        input: [
          [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          'ABCB',
        ],
        expected: false,
        description: 'Word not found (cannot reuse cell)',
      },
    ],
    hints: [
      'Save the cell value, mark as visited with a sentinel like "#"',
      'Try all 4 directions; short-circuit with || if any returns true',
      'Restore the cell value after recursion (backtrack)',
    ],
    concepts: ['word search', 'DFS', 'backtracking', '2D grid', 'visited marking'],
  },
  {
    id: 'ts-flatten-nested-recursive',
    title: 'Flatten Nested Arrays Recursively',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Flatten arbitrarily nested arrays into a single flat array using recursion. This recursive pattern mirrors tree traversal and is used for normalizing hierarchical data, processing ASTs, and implementing Array.prototype.flat.',
    instructions: [
      'Given a nested array like [1, [2, [3, [4]]]], return [1, 2, 3, 4]',
      'If element is an array, recursively flatten it',
      'If element is not an array, push it to the result',
    ],
    starterCode: `type NestedArray = (number | NestedArray)[];

function flattenDeep(items: NestedArray): number[] {
  const result: number[] = [];

  function flatten(elements: NestedArray): void {
    for (const item of elements) {
      // If array, recurse; otherwise push to result
      // YOUR CODE HERE
    }
  }

  flatten(items);
  return result;
}`,
    solutionCode: `type NestedArray = (number | NestedArray)[];

function flattenDeep(items: NestedArray): number[] {
  // Recursive flatten: O(n) time where n = total elements across all nesting levels
  const flatResult: number[] = [];

  function flatten(elements: NestedArray): void {
    for (const item of elements) {
      if (Array.isArray(item)) {
        // Nested array: recurse deeper
        flatten(item);
      } else {
        // Leaf value: collect into flat result
        flatResult.push(item);
      }
    }
  }

  flatten(items);
  return flatResult;
}`,
    testCases: [
      {
        input: [[1, [2, [3, [4]]]]],
        expected: [1, 2, 3, 4],
        description: 'Deeply nested',
      },
      {
        input: [[1, 2, [3, 4], [5, [6]]]],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Mixed nesting levels',
      },
      {
        input: [[[[[1]]]]],
        expected: [1],
        description: 'Single element deeply nested',
      },
      {
        input: [[1, 2, 3]],
        expected: [1, 2, 3],
        description: 'Already flat',
      },
      {
        input: [[]],
        expected: [],
        description: 'Empty array',
      },
    ],
    hints: [
      'Use Array.isArray() to check if an element is an array',
      'If it is an array, recurse into it',
      'If not, push the value to the result',
    ],
    concepts: ['flatten', 'recursion', 'Array.isArray', 'nested structures'],
  },
  {
    id: 'ts-string-perms-dedup',
    title: 'Unique String Permutations',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Generate all unique permutations of a string that may contain duplicate characters by sorting and skip-dedup. Avoiding duplicate permutations is a key backtracking optimization, essential for anagram generation and combinatorial enumeration.',
    instructions: [
      'Sort characters first so duplicates are adjacent',
      'Use a used[] boolean array to track which characters are currently placed',
      'Skip a character if it equals the previous one and the previous was not used in this branch',
    ],
    starterCode: `function uniquePermutations(str: string): string[] {
  const result: string[] = [];
  const chars: string[] = str.split('').sort();
  const used: boolean[] = new Array(chars.length).fill(false);

  function backtrack(current: string): void {
    if (current.length === chars.length) {
      result.push(current);
      return;
    }
    for (let i = 0; i < chars.length; i++) {
      // Skip used chars and duplicates
      // YOUR CODE HERE
    }
  }

  backtrack('');
  return result;
}`,
    solutionCode: `function uniquePermutations(str: string): string[] {
  // Unique permutations via backtracking: O(n! / duplicates) time
  // Sorting + skip rule eliminates duplicate permutations
  const permutations: string[] = [];
  const sortedChars: string[] = str.split('').sort();
  const used: boolean[] = new Array(sortedChars.length).fill(false);

  function backtrack(current: string): void {
    if (current.length === sortedChars.length) {
      permutations.push(current);
      return;
    }
    for (let i = 0; i < sortedChars.length; i++) {
      if (used[i]) continue;
      // Skip duplicate: same char as previous AND previous not used in this branch
      // This ensures only the first occurrence is used at each position
      if (i > 0 && sortedChars[i] === sortedChars[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      backtrack(current + sortedChars[i]);
      used[i] = false;
    }
  }

  backtrack('');
  return permutations;
}`,
    testCases: [
      {
        input: 'aab',
        expected: ['aab', 'aba', 'baa'],
        description: 'String with duplicates',
      },
      {
        input: 'abc',
        expected: ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'],
        description: 'All unique characters',
      },
      {
        input: 'aa',
        expected: ['aa'],
        description: 'All same characters',
      },
    ],
    hints: [
      'Sort first so duplicates are adjacent',
      'Skip if used[i] is true (already in current permutation)',
      'Skip if chars[i] === chars[i-1] and !used[i-1] (dedup trick)',
    ],
    concepts: ['permutations', 'deduplication', 'backtracking', 'sorting trick'],
  },

  // ========== COMBINATORICS ==========
  {
    id: 'ts-combinations-with-rep',
    title: 'Combinations with Repetition',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate combinations where elements can be reused (multiset combinations), like choosing coins from denominations. Combinations with repetition model resource allocation, repeated sampling, and multi-select scenarios in optimization problems.',
    instructions: [
      'Given an array and size k, generate all combinations allowing repeated elements',
      'Use backtracking starting from the current index (not i+1) to allow repeats',
      'Elements should be in non-decreasing order to avoid duplicates',
    ],
    starterCode: `function combinationsWithRep<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];

  function backtrack(start: number, current: T[]): void {
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    // Iterate from start (not start+1) to allow repeats
    // YOUR CODE HERE
  }

  backtrack(0, []);
  return result;
}`,
    solutionCode: `function combinationsWithRep<T>(items: T[], size: number): T[][] {
  // Combinations with repetition (multiset): backtracking approach
  // C(n+k-1, k) total combinations
  const combinations: T[][] = [];

  function backtrack(start: number, current: T[]): void {
    if (current.length === size) {
      combinations.push([...current]);
      return;
    }
    for (let i = start; i < items.length; i++) {
      current.push(items[i]);
      // Recurse with i (not i+1) to allow picking the same element again
      backtrack(i, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return combinations;
}`,
    testCases: [
      {
        input: [[1, 2, 3], 2],
        expected: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 2],
          [2, 3],
          [3, 3],
        ],
        description: 'Choose 2 with repetition from [1,2,3]',
      },
      {
        input: [[1, 2], 3],
        expected: [
          [1, 1, 1],
          [1, 1, 2],
          [1, 2, 2],
          [2, 2, 2],
        ],
        description: 'Choose 3 with repetition from [1,2]',
      },
      {
        input: [[5], 2],
        expected: [[5, 5]],
        description: 'Single element, choose 2',
      },
    ],
    hints: [
      'Key difference from normal combinations: recurse with i (not i+1)',
      'This allows the same element to be picked again',
      'Still start from current index to maintain non-decreasing order',
    ],
    concepts: ['combinations with repetition', 'multiset', 'backtracking'],
  },
  {
    id: 'ts-next-permutation',
    title: 'Next Lexicographic Permutation',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Transform an array to its next lexicographic permutation in-place, wrapping to sorted order if already the largest. This algorithm is used in STL next_permutation, systematic enumeration, and generating permutations without storing all n! results.',
    instructions: [
      'Find the largest index i such that arr[i] < arr[i+1] (the "pivot")',
      'Find the largest index j > i such that arr[j] > arr[i], then swap',
      'Reverse the suffix from i+1 to end',
      'If no pivot exists, reverse the entire array',
    ],
    starterCode: `function nextPermutation(numbers: number[]): number[] {
  const length: number = numbers.length;

  // Step 1: find pivot (rightmost numbers[i] < numbers[i+1])
  // Step 2: find rightmost element > pivot and swap
  // Step 3: reverse suffix after pivot
  // YOUR CODE HERE

  return numbers;
}`,
    solutionCode: `function nextPermutation(numbers: number[]): number[] {
  // Next lexicographic permutation in-place: O(n) time, O(1) space
  const length: number = numbers.length;
  let pivotIndex: number = length - 2;

  // Step 1: find rightmost ascending pair (the "pivot")
  while (pivotIndex >= 0 && numbers[pivotIndex] >= numbers[pivotIndex + 1]) pivotIndex--;

  if (pivotIndex >= 0) {
    // Step 2: find rightmost element larger than pivot and swap
    let swapIndex: number = length - 1;
    while (numbers[swapIndex] <= numbers[pivotIndex]) swapIndex--;
    [numbers[pivotIndex], numbers[swapIndex]] = [numbers[swapIndex], numbers[pivotIndex]];
  }

  // Step 3: reverse the suffix after pivot to get smallest next permutation
  let left: number = pivotIndex + 1, right: number = length - 1;
  while (left < right) {
    [numbers[left], numbers[right]] = [numbers[right], numbers[left]];
    left++;
    right--;
  }

  return numbers;
}`,
    testCases: [
      { input: [[1, 2, 3]], expected: [1, 3, 2], description: '[1,2,3] -> [1,3,2]' },
      { input: [[3, 2, 1]], expected: [1, 2, 3], description: 'Largest perm wraps to smallest' },
      { input: [[1, 1, 5]], expected: [1, 5, 1], description: 'With duplicates' },
      { input: [[1, 3, 2]], expected: [2, 1, 3], description: '[1,3,2] -> [2,1,3]' },
    ],
    hints: [
      'Scan right-to-left for first decrease: arr[i] < arr[i+1]',
      'Scan right-to-left for smallest element larger than arr[i]',
      'After swapping, reverse the suffix to get the smallest next permutation',
    ],
    concepts: ['next permutation', 'lexicographic order', 'in-place algorithm'],
  },
  {
    id: 'ts-permutation-rank',
    title: 'Permutation Rank (1-based)',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Find the 1-based lexicographic rank of a permutation among all permutations of its distinct elements. Ranking uses factoradic decomposition and is useful for encoding permutations as integers, hashing, and compression.',
    instructions: [
      'For each position, count how many smaller elements remain unused (these would form earlier permutations)',
      'Multiply that count by the factorial of remaining positions',
      'Sum all contributions and add 1 for 1-based ranking',
    ],
    starterCode: `function permutationRank(perm: number[]): number {
  const length: number = perm.length;
  let rank: number = 0;

  function factorial(value: number): number {
    let result: number = 1;
    for (let i = 2; i <= value; i++) result *= i;
    return result;
  }

  for (let i = 0; i < length; i++) {
    // Count elements after index i that are smaller than perm[i]
    // Multiply by factorial of remaining positions
    // YOUR CODE HERE
  }

  return rank + 1;
}`,
    solutionCode: `function permutationRank(perm: number[]): number {
  // Factorial number system approach: O(n^2) time, O(1) extra space
  // Each position contributes (count of smaller remaining elements) * (remaining positions)!
  const length: number = perm.length;
  let rank: number = 0;

  function factorial(value: number): number {
    let product: number = 1;
    for (let i = 2; i <= value; i++) product *= i;
    return product;
  }

  for (let i = 0; i < length; i++) {
    // Count elements to the right that are smaller than perm[i]
    let smallerCount: number = 0;
    for (let j = i + 1; j < length; j++) {
      if (perm[j] < perm[i]) smallerCount++;
    }
    // Each smaller element represents factorial(remaining) earlier permutations
    rank += smallerCount * factorial(length - 1 - i);
  }

  // Convert from 0-based to 1-based ranking
  return rank + 1;
}`,
    testCases: [
      { input: [[1, 2, 3]], expected: 1, description: 'First permutation' },
      { input: [[3, 2, 1]], expected: 6, description: 'Last permutation of 3 elements' },
      { input: [[2, 1, 3]], expected: 3, description: 'Third permutation' },
      { input: [[1, 3, 2]], expected: 2, description: 'Second permutation' },
    ],
    hints: [
      'For position i, count elements perm[j] < perm[i] where j > i',
      'Each such element contributes factorial(n-1-i) earlier permutations',
      'Add 1 at the end for 1-based ranking',
    ],
    concepts: ['permutation rank', 'factorial number system', 'lexicographic ordering'],
  },
  {
    id: 'ts-derangements-count',
    title: 'Count Derangements',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Count derangements of n elements: permutations where no element stays in its original position. Derangements use the recurrence D(n) = (n-1)(D(n-1) + D(n-2)) and appear in probability, secret Santa problems, and combinatorics.',
    instructions: [
      'D(0) = 1, D(1) = 0',
      'D(n) = (n - 1) * (D(n - 1) + D(n - 2)) for n >= 2',
      'Use iteration (bottom-up) for efficiency',
    ],
    starterCode: `function derangements(count: number): number {
  if (count === 0) return 1;
  if (count === 1) return 0;

  let prev2: number = 1; // D(0)
  let prev1: number = 0; // D(1)

  // Compute D(2) through D(count) iteratively
  // YOUR CODE HERE

  return prev1;
}`,
    solutionCode: `function derangements(count: number): number {
  // Count derangements using recurrence: D(n) = (n-1) * (D(n-1) + D(n-2))
  // O(n) time, O(1) space (iterative bottom-up)
  if (count === 0) return 1;
  if (count === 1) return 0;

  let twoBack: number = 1;   // D(i-2), starts as D(0)
  let oneBack: number = 0;   // D(i-1), starts as D(1)

  for (let i = 2; i <= count; i++) {
    // Element i can swap with any of (i-1) other elements
    // After swapping, either both are deranged (D(i-2)) or one remains (D(i-1))
    const currentDerangements: number = (i - 1) * (oneBack + twoBack);
    twoBack = oneBack;
    oneBack = currentDerangements;
  }

  return oneBack;
}`,
    testCases: [
      { input: 0, expected: 1, description: 'D(0) = 1 (empty derangement)' },
      { input: 1, expected: 0, description: 'D(1) = 0 (single element)' },
      { input: 2, expected: 1, description: 'D(2) = 1 (swap two)' },
      { input: 3, expected: 2, description: 'D(3) = 2' },
      { input: 5, expected: 44, description: 'D(5) = 44' },
    ],
    hints: [
      'Recurrence: D(n) = (n-1) * (D(n-1) + D(n-2))',
      'Use two variables to track D(i-1) and D(i-2)',
      'Update them in a loop from 2 to n',
    ],
    concepts: ['derangements', 'recurrence relation', 'dynamic programming', 'combinatorics'],
  },
  {
    id: 'ts-pascals-triangle-row',
    title: "Pascal's Triangle Row",
    category: 'combinatorics',
    difficulty: 'beginner',
    description:
      "Generate the nth row (0-indexed) of Pascal's triangle where each element is the sum of the two above it. Pascal's triangle encodes binomial coefficients and is used in probability, polynomial expansion, and combinatorial identities.",
    instructions: [
      'Row 0 = [1], Row 1 = [1, 1], Row 2 = [1, 2, 1], etc.',
      'Build iteratively: each new row[j] = prev[j-1] + prev[j]',
      'First and last elements are always 1',
    ],
    starterCode: `function pascalRow(rowIndex: number): number[] {
  let row: number[] = [1];

  for (let i = 1; i <= rowIndex; i++) {
    const newRow: number[] = [1];
    // Fill middle elements using previous row
    // YOUR CODE HERE

    newRow.push(1);
    row = newRow;
  }

  return row;
}`,
    solutionCode: `function pascalRow(rowIndex: number): number[] {
  // Pascal's triangle row generation: O(n^2) time, O(n) space
  // Each element is a binomial coefficient C(n, k)
  let currentRow: number[] = [1];

  for (let i = 1; i <= rowIndex; i++) {
    const nextRow: number[] = [1];
    // Each middle element is the sum of two adjacent elements in the previous row
    for (let j = 1; j < currentRow.length; j++) {
      nextRow.push(currentRow[j - 1] + currentRow[j]);
    }
    // Last element is always 1
    nextRow.push(1);
    currentRow = nextRow;
  }

  return currentRow;
}`,
    testCases: [
      { input: 0, expected: [1], description: 'Row 0' },
      { input: 1, expected: [1, 1], description: 'Row 1' },
      { input: 4, expected: [1, 4, 6, 4, 1], description: 'Row 4' },
      { input: 6, expected: [1, 6, 15, 20, 15, 6, 1], description: 'Row 6' },
    ],
    hints: [
      'Start with row = [1]',
      'Each new element is sum of two adjacent elements in previous row',
      'First and last elements of every row are 1',
    ],
    concepts: ["Pascal's triangle", 'binomial coefficients', 'iterative construction'],
  },
  {
    id: 'ts-catalan-number',
    title: 'Catalan Number',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Compute the nth Catalan number using dynamic programming. Catalan numbers count balanced parentheses, BST shapes, polygon triangulations, Dyck paths, and many other combinatorial structures appearing in interviews.',
    instructions: [
      'C(0) = 1',
      'C(n) = sum of C(i) * C(n-1-i) for i from 0 to n-1',
      'Or use the formula: C(n) = C(2n, n) / (n+1)',
      'Use iterative DP for efficiency',
    ],
    starterCode: `function catalanNumber(index: number): number {
  const dp: number[] = new Array(index + 1).fill(0);
  dp[0] = 1;

  // Fill dp[1] through dp[index] using the recurrence
  // dp[i] = sum of dp[j] * dp[i-1-j] for j = 0..i-1
  // YOUR CODE HERE

  return dp[index];
}`,
    solutionCode: `function catalanNumber(index: number): number {
  // Catalan number via DP: O(n^2) time, O(n) space
  // C(n) = sum of C(j) * C(n-1-j) for all ways to split into left/right
  const catalanTable: number[] = new Array(index + 1).fill(0);
  catalanTable[0] = 1;

  for (let i = 1; i <= index; i++) {
    for (let leftSize = 0; leftSize < i; leftSize++) {
      // Each split: leftSize elements on left, (i-1-leftSize) on right
      catalanTable[i] += catalanTable[leftSize] * catalanTable[i - 1 - leftSize];
    }
  }

  return catalanTable[index];
}`,
    testCases: [
      { input: 0, expected: 1, description: 'C(0) = 1' },
      { input: 1, expected: 1, description: 'C(1) = 1' },
      { input: 3, expected: 5, description: 'C(3) = 5' },
      { input: 5, expected: 42, description: 'C(5) = 42' },
      { input: 10, expected: 16796, description: 'C(10) = 16796' },
    ],
    hints: [
      'dp[0] = 1 is the base case',
      'For dp[i], sum over all ways to split into left/right subproblems',
      'dp[j] * dp[i-1-j] counts structures with j elements on the left',
    ],
    concepts: ['Catalan numbers', 'dynamic programming', 'combinatorial counting'],
  },
  {
    id: 'ts-power-set-bitmask',
    title: 'Power Set via Bitmask',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate the power set (all subsets) using bitmask iteration where each integer 0 to 2^n-1 encodes a subset. Bitmask enumeration is a compact, iterative alternative to recursion, widely used in competitive programming and constraint solving.',
    instructions: [
      'There are 2^n subsets for an array of length n',
      'For each number from 0 to 2^n - 1, check each bit',
      'If bit j is set, include arr[j] in the current subset',
    ],
    starterCode: `function powerSetBitmask<T>(items: T[]): T[][] {
  const length: number = items.length;
  const total: number = 1 << length; // 2^n
  const result: T[][] = [];

  for (let mask = 0; mask < total; mask++) {
    const subset: T[] = [];
    // Check each bit of mask and include corresponding element
    // YOUR CODE HERE

    result.push(subset);
  }

  return result;
}`,
    solutionCode: `function powerSetBitmask<T>(items: T[]): T[][] {
  // Power set via bitmask enumeration: O(n * 2^n) time, O(2^n) space
  // Each integer 0..2^n-1 encodes one unique subset
  const length: number = items.length;
  const totalSubsets: number = 1 << length;
  const allSubsets: T[][] = [];

  for (let mask = 0; mask < totalSubsets; mask++) {
    const subset: T[] = [];
    for (let bitPosition = 0; bitPosition < length; bitPosition++) {
      // Include items[j] if bit j is set in the current mask
      if (mask & (1 << bitPosition)) {
        subset.push(items[bitPosition]);
      }
    }
    allSubsets.push(subset);
  }

  return allSubsets;
}`,
    testCases: [
      {
        input: [[1, 2, 3]],
        expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        description: 'Power set of [1,2,3]',
      },
      {
        input: [['a', 'b']],
        expected: [[], ['a'], ['b'], ['a', 'b']],
        description: 'Power set of [a,b]',
      },
      {
        input: [[]],
        expected: [[]],
        description: 'Power set of empty array',
      },
    ],
    hints: [
      '1 << n computes 2^n',
      'mask & (1 << j) checks if bit j is set',
      'Each mask from 0 to 2^n-1 uniquely represents one subset',
    ],
    concepts: ['power set', 'bitmask', 'bit manipulation', 'subset enumeration'],
  },
  {
    id: 'ts-gray-code',
    title: 'Gray Code Sequence',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate the n-bit Gray code sequence where consecutive values differ by exactly one bit. Gray codes are used in rotary encoders, error correction, Karnaugh maps, and generating Hamiltonian paths on hypercube graphs.',
    instructions: [
      'For n bits, generate 2^n values',
      'Gray code formula: gray(i) = i ^ (i >> 1)',
      'Return the sequence as an array of integers',
    ],
    starterCode: `function grayCode(bits: number): number[] {
  const result: number[] = [];
  const total: number = 1 << bits; // 2^n

  for (let i = 0; i < total; i++) {
    // Compute Gray code using: i ^ (i >> 1)
    // YOUR CODE HERE
  }

  return result;
}`,
    solutionCode: `function grayCode(bits: number): number[] {
  // Gray code generation: O(2^n) time, O(2^n) space
  // Adjacent values differ by exactly one bit
  const graySequence: number[] = [];
  const totalCodes: number = 1 << bits;

  for (let i = 0; i < totalCodes; i++) {
    // XOR with right-shifted self ensures single-bit difference between neighbors
    graySequence.push(i ^ (i >> 1));
  }

  return graySequence;
}`,
    testCases: [
      { input: 2, expected: [0, 1, 3, 2], description: '2-bit Gray code' },
      { input: 3, expected: [0, 1, 3, 2, 6, 7, 5, 4], description: '3-bit Gray code' },
      { input: 1, expected: [0, 1], description: '1-bit Gray code' },
      { input: 0, expected: [0], description: '0-bit Gray code' },
    ],
    hints: [
      'Gray code for value i is: i XOR (i right-shifted by 1)',
      'In JavaScript: i ^ (i >> 1)',
      'Total values = 2^n = 1 << n',
    ],
    concepts: ['Gray code', 'bit manipulation', 'XOR', 'binary sequences'],
  },
  {
    id: 'ts-josephus',
    title: 'Josephus Problem',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Solve the Josephus problem: n people in a circle, every kth person is eliminated, find the survivor. The O(n) recurrence J(n,k) = (J(n-1,k) + k) % n is a classic example of reducing a circular elimination to a simple formula.',
    instructions: [
      'Use the iterative Josephus formula',
      'J(1) = 0',
      'J(i) = (J(i-1) + k) % i for i from 2 to n',
      'Return the 0-based survivor position',
    ],
    starterCode: `function josephus(count: number, step: number): number {
  let survivor: number = 0; // J(1) = 0

  // Compute J(2), J(3), ..., J(count)
  // YOUR CODE HERE

  return survivor;
}`,
    solutionCode: `function josephus(count: number, step: number): number {
  // Josephus problem iterative formula: O(n) time, O(1) space
  // Builds up from base case J(1)=0 to J(n)
  let survivorPosition: number = 0;

  for (let circleSize = 2; circleSize <= count; circleSize++) {
    // When adding one more person, the survivor shifts by step positions
    survivorPosition = (survivorPosition + step) % circleSize;
  }

  return survivorPosition;
}`,
    testCases: [
      { input: [7, 3], expected: 3, description: '7 people, every 3rd eliminated' },
      { input: [5, 2], expected: 2, description: '5 people, every 2nd eliminated' },
      { input: [1, 5], expected: 0, description: '1 person is always survivor' },
      { input: [6, 1], expected: 5, description: 'Every 1st: last person survives' },
    ],
    hints: [
      'Start with survivor = 0 for the base case of 1 person',
      'Build up: for each additional person, adjust position',
      'Formula: (previous + k) % current_count',
    ],
    concepts: ['Josephus problem', 'modular arithmetic', 'iterative formula', 'circle elimination'],
  },
  {
    id: 'ts-count-inversions',
    title: 'Count Inversions (Merge Sort)',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Count inversions (pairs where i < j but arr[i] > arr[j]) using a modified merge sort in O(n log n). Inversion count measures how far an array is from sorted and is used in ranking similarity, sorting analysis, and competitive programming.',
    instructions: [
      'Modify merge sort to count inversions during the merge step',
      'When right element is smaller, it forms inversions with all remaining left elements',
      'Return the total inversion count',
    ],
    starterCode: `function countInversions(numbers: number[]): number {
  function mergeSort(items: number[]): { sorted: number[]; count: number } {
    if (items.length <= 1) return { sorted: items, count: 0 };

    const mid: number = Math.floor(items.length / 2);
    const left: { sorted: number[]; count: number } = mergeSort(items.slice(0, mid));
    const right: { sorted: number[]; count: number } = mergeSort(items.slice(mid));

    // Merge and count cross-inversions
    // YOUR CODE HERE
  }

  return mergeSort(numbers).count;
}`,
    solutionCode: `function countInversions(numbers: number[]): number {
  // Modified merge sort to count inversions: O(n log n) time, O(n) space
  function mergeSort(items: number[]): { sorted: number[]; count: number } {
    if (items.length <= 1) return { sorted: items, count: 0 };

    const mid: number = Math.floor(items.length / 2);
    const left: { sorted: number[]; count: number } = mergeSort(items.slice(0, mid));
    const right: { sorted: number[]; count: number } = mergeSort(items.slice(mid));

    const merged: number[] = [];
    // Start with inversions from both halves
    let inversionCount: number = left.count + right.count;
    let leftIdx: number = 0, rightIdx: number = 0;

    while (leftIdx < left.sorted.length && rightIdx < right.sorted.length) {
      if (left.sorted[leftIdx] <= right.sorted[rightIdx]) {
        merged.push(left.sorted[leftIdx++]);
      } else {
        merged.push(right.sorted[rightIdx++]);
        // All remaining left elements are greater than right[j], forming inversions
        inversionCount += left.sorted.length - leftIdx;
      }
    }

    while (leftIdx < left.sorted.length) merged.push(left.sorted[leftIdx++]);
    while (rightIdx < right.sorted.length) merged.push(right.sorted[rightIdx++]);

    return { sorted: merged, count: inversionCount };
  }

  return mergeSort(numbers).count;
}`,
    testCases: [
      {
        input: [[2, 4, 1, 3, 5]],
        expected: 2,
        description: 'Two inversions: (2,1) and (4,1) and (4,3)',
      },
      { input: [[1, 2, 3, 4]], expected: 0, description: 'Already sorted, no inversions' },
      { input: [[4, 3, 2, 1]], expected: 6, description: 'Reverse sorted, maximum inversions' },
      { input: [[1, 5, 2, 4, 3]], expected: 3, description: 'Three inversions' },
    ],
    hints: [
      'When right[j] < left[i], all remaining left elements form inversions with right[j]',
      'Add left.sorted.length - i to count when picking from the right',
      'Recursively count inversions in both halves plus cross-inversions in merge',
    ],
    concepts: ['inversions', 'merge sort', 'divide and conquer', 'counting'],
  },

  // ========== TRAVERSAL ==========
  {
    id: 'ts-preorder-iterative',
    title: 'Preorder Traversal (Iterative)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement binary tree preorder traversal (root, left, right) using an explicit stack instead of recursion. Iterative traversal avoids stack overflow on deep trees and demonstrates how to manually manage the call stack.',
    instructions: [
      'Use a stack initialized with the root node',
      'Pop from stack, visit, then push right child first, then left child',
      'Pushing right before left ensures left is processed first (LIFO)',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function preorderIterative(root: TreeNode<number> | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const stack: TreeNode<number>[] = [root];

  while (stack.length > 0) {
    // Pop node, push value, push right then left child
    // YOUR CODE HERE
  }

  return result;
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function preorderIterative(root: TreeNode<number> | null): number[] {
  // Iterative preorder (root-left-right): O(n) time, O(h) space
  if (!root) return [];

  const traversalOrder: number[] = [];
  const nodeStack: TreeNode<number>[] = [root];

  while (nodeStack.length > 0) {
    const currentNode: TreeNode<number> = nodeStack.pop()!;
    traversalOrder.push(currentNode.value);
    // Push right before left so left is processed first (LIFO order)
    if (currentNode.right) nodeStack.push(currentNode.right);
    if (currentNode.left) nodeStack.push(currentNode.left);
  }

  return traversalOrder;
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: {
            value: 2,
            left: { value: 4, left: null, right: null },
            right: { value: 5, left: null, right: null },
          },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 4, 5, 3],
        description: 'Preorder: root-left-right',
      },
      {
        input: { value: 1, left: null, right: { value: 2, left: null, right: null } },
        expected: [1, 2],
        description: 'Right-skewed tree',
      },
      {
        input: null,
        expected: [],
        description: 'Empty tree',
      },
    ],
    hints: [
      'Use an array as a stack with push/pop',
      'Push right child first, then left, so left is popped first',
      'Process (visit) the node immediately after popping',
    ],
    concepts: ['preorder traversal', 'iterative DFS', 'explicit stack'],
  },
  {
    id: 'ts-postorder-iterative',
    title: 'Postorder Traversal (Iterative)',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Implement binary tree postorder traversal (left, right, root) iteratively using a stack. Postorder is the trickiest iterative traversal because the root is visited last, requiring either two stacks or a visited flag.',
    instructions: [
      'Use two stacks or a modified approach: push to stack, process as root-right-left, then reverse',
      'Stack 1: process nodes. Stack 2 (or result reversed): collect in reverse postorder',
      'Alternatively, push to result in root-right-left order and reverse at the end',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function postorderIterative(root: TreeNode<number> | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const stack: TreeNode<number>[] = [root];

  // Build result in root-right-left order, then reverse
  // YOUR CODE HERE

  return result.reverse();
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function postorderIterative(root: TreeNode<number> | null): number[] {
  // Iterative postorder via reverse trick: O(n) time, O(n) space
  // Collect in root-right-left order, then reverse to get left-right-root
  if (!root) return [];

  const reversePostorder: number[] = [];
  const nodeStack: TreeNode<number>[] = [root];

  while (nodeStack.length > 0) {
    const currentNode: TreeNode<number> = nodeStack.pop()!;
    reversePostorder.push(currentNode.value);
    // Push left before right so right is processed first (building reverse postorder)
    if (currentNode.left) nodeStack.push(currentNode.left);
    if (currentNode.right) nodeStack.push(currentNode.right);
  }

  // Reversing root-right-left gives left-right-root (true postorder)
  return reversePostorder.reverse();
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: {
            value: 2,
            left: { value: 4, left: null, right: null },
            right: { value: 5, left: null, right: null },
          },
          right: { value: 3, left: null, right: null },
        },
        expected: [4, 5, 2, 3, 1],
        description: 'Postorder: left-right-root',
      },
      {
        input: { value: 1, left: { value: 2, left: null, right: null }, right: null },
        expected: [2, 1],
        description: 'Left-skewed tree',
      },
      {
        input: null,
        expected: [],
        description: 'Empty tree',
      },
    ],
    hints: [
      'Postorder is reverse of modified preorder (root-right-left)',
      'Push left first, then right (opposite of preorder), collect values, then reverse',
      'This is much simpler than tracking visited state',
    ],
    concepts: ['postorder traversal', 'iterative DFS', 'reverse trick', 'two-stack method'],
  },
  {
    id: 'ts-zigzag-level-order',
    title: 'Zigzag Level Order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Traverse a binary tree level by level, alternating direction each level: left-to-right then right-to-left. Zigzag traversal combines BFS with direction toggling and is a common interview variation of level-order traversal.',
    instructions: [
      'Use BFS with a queue, processing one level at a time',
      'Track direction: even levels go left-to-right, odd levels right-to-left',
      'Reverse the level array for right-to-left levels',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function zigzagLevelOrder(root: TreeNode<number> | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode<number>[] = [root];
  let leftToRight: boolean = true;

  while (queue.length > 0) {
    const levelSize: number = queue.length;
    const level: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      // Dequeue, collect value, enqueue children
      // YOUR CODE HERE
    }

    // Add level in correct direction
    // YOUR CODE HERE

    leftToRight = !leftToRight;
  }

  return result;
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function zigzagLevelOrder(root: TreeNode<number> | null): number[][] {
  // Zigzag BFS: O(n) time, O(n) space
  // Even levels left-to-right, odd levels right-to-left
  if (!root) return [];

  const levels: number[][] = [];
  const bfsQueue: TreeNode<number>[] = [root];
  let leftToRight: boolean = true;

  while (bfsQueue.length > 0) {
    const levelSize: number = bfsQueue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const currentNode: TreeNode<number> = bfsQueue.shift()!;
      currentLevel.push(currentNode.value);
      if (currentNode.left) bfsQueue.push(currentNode.left);
      if (currentNode.right) bfsQueue.push(currentNode.right);
    }

    // Reverse odd levels to achieve zigzag ordering
    levels.push(leftToRight ? currentLevel : currentLevel.reverse());
    leftToRight = !leftToRight;
  }

  return levels;
}`,
    testCases: [
      {
        input: {
          value: 3,
          left: { value: 9, left: null, right: null },
          right: {
            value: 20,
            left: { value: 15, left: null, right: null },
            right: { value: 7, left: null, right: null },
          },
        },
        expected: [[3], [20, 9], [15, 7]],
        description: 'Zigzag: L-R, R-L, L-R',
      },
      {
        input: { value: 1, left: null, right: null },
        expected: [[1]],
        description: 'Single node',
      },
      {
        input: null,
        expected: [],
        description: 'Empty tree',
      },
    ],
    hints: [
      'Process entire level at once using levelSize = queue.length',
      'Toggle leftToRight after each level',
      'Reverse the level array when going right-to-left',
    ],
    concepts: ['zigzag traversal', 'BFS', 'level order', 'alternating direction'],
  },
  {
    id: 'ts-tree-level-widths',
    title: 'Tree Level Widths',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Calculate the number of nodes (width) at each level of a binary tree using BFS. Level width analysis is used for finding the maximum width of a tree, detecting completeness, and visualizing tree shape.',
    instructions: [
      'Use BFS with a queue, processing one level at a time',
      'For each level, record how many nodes are in it',
      'Return an array of widths from top to bottom',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function treeLevelWidths(root: TreeNode<number> | null): number[] {
  if (!root) return [];

  const widths: number[] = [];
  const queue: TreeNode<number>[] = [root];

  while (queue.length > 0) {
    const levelSize: number = queue.length;
    // Record this level's width and enqueue children
    // YOUR CODE HERE
  }

  return widths;
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function treeLevelWidths(root: TreeNode<number> | null): number[] {
  // BFS level-by-level width calculation: O(n) time, O(w) space where w = max width
  if (!root) return [];

  const levelWidths: number[] = [];
  const bfsQueue: TreeNode<number>[] = [root];

  while (bfsQueue.length > 0) {
    const nodesAtThisLevel: number = bfsQueue.length;
    // Queue length before processing gives the width of the current level
    levelWidths.push(nodesAtThisLevel);

    for (let i = 0; i < nodesAtThisLevel; i++) {
      const currentNode: TreeNode<number> = bfsQueue.shift()!;
      if (currentNode.left) bfsQueue.push(currentNode.left);
      if (currentNode.right) bfsQueue.push(currentNode.right);
    }
  }

  return levelWidths;
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: {
            value: 2,
            left: { value: 4, left: null, right: null },
            right: { value: 5, left: null, right: null },
          },
          right: { value: 3, left: null, right: { value: 6, left: null, right: null } },
        },
        expected: [1, 2, 3],
        description: 'Widths: 1, 2, 3',
      },
      {
        input: {
          value: 1,
          left: { value: 2, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2],
        description: 'Widths: 1, 2',
      },
      {
        input: { value: 1, left: null, right: null },
        expected: [1],
        description: 'Single node: width 1',
      },
    ],
    hints: [
      'Before processing each level, queue.length gives the width',
      'Push levelSize to widths array',
      'Process exactly levelSize nodes in the inner loop',
    ],
    concepts: ['tree width', 'BFS', 'level order', 'queue'],
  },
  {
    id: 'ts-lowest-common-ancestor',
    title: 'Lowest Common Ancestor',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Find the lowest common ancestor (LCA) of two nodes in a binary tree using recursive post-order traversal. LCA is fundamental for distance queries, path computation, and is a core building block for advanced tree algorithms.',
    instructions: [
      'If root is null or matches either target, return root',
      'Recursively search left and right subtrees',
      'If both sides return non-null, current node is the LCA',
      'Otherwise, return whichever side is non-null',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function lowestCommonAncestor(root: TreeNode<number> | null, p: number, q: number): TreeNode<number> | null {
  // Base case: null or found one of the targets
  // YOUR CODE HERE

  // Recurse left and right
  // YOUR CODE HERE

  // If both sides found something, this is the LCA
  // YOUR CODE HERE
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function lowestCommonAncestor(root: TreeNode<number> | null, p: number, q: number): TreeNode<number> | null {
  // Recursive LCA: O(n) time, O(h) space where h = tree height
  // Returns the node itself if it matches a target, bubbles results upward
  if (!root || root.value === p || root.value === q) return root;

  const leftResult: TreeNode<number> | null = lowestCommonAncestor(root.left, p, q);
  const rightResult: TreeNode<number> | null = lowestCommonAncestor(root.right, p, q);

  // Both sides found a target: current node is the LCA
  if (leftResult && rightResult) return root;
  // Only one side found something: propagate that result upward
  return leftResult || rightResult;
}`,
    testCases: [
      {
        input: [
          {
            value: 3,
            left: {
              value: 5,
              left: { value: 6, left: null, right: null },
              right: { value: 2, left: null, right: null },
            },
            right: { value: 1, left: null, right: null },
          },
          5,
          1,
        ],
        expected: {
          value: 3,
          left: {
            value: 5,
            left: { value: 6, left: null, right: null },
            right: { value: 2, left: null, right: null },
          },
          right: { value: 1, left: null, right: null },
        },
        description: 'LCA of 5 and 1 is root 3',
      },
      {
        input: [
          {
            value: 3,
            left: {
              value: 5,
              left: { value: 6, left: null, right: null },
              right: { value: 2, left: null, right: null },
            },
            right: { value: 1, left: null, right: null },
          },
          6,
          2,
        ],
        expected: {
          value: 5,
          left: { value: 6, left: null, right: null },
          right: { value: 2, left: null, right: null },
        },
        description: 'LCA of 6 and 2 is node 5',
      },
    ],
    hints: [
      'If root is null or matches a target, return root immediately',
      'Recurse on both subtrees; the answers bubble up',
      'If both left and right return non-null, current node is LCA',
    ],
    concepts: ['lowest common ancestor', 'recursion', 'tree traversal', 'divide and conquer'],
  },
  {
    id: 'ts-tree-diameter',
    title: 'Binary Tree Diameter',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Find the diameter of a binary tree: the longest path between any two nodes measured in edges. The key insight is that the diameter either passes through the root or lies entirely in a subtree, solved with a single DFS pass.',
    instructions: [
      'For each node, the path through it is leftHeight + rightHeight',
      'Track the maximum diameter seen across all nodes',
      'Return height from the recursive function, update diameter as side effect',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function treeDiameter(root: TreeNode<number> | null): number {
  let diameter: number = 0;

  function height(node: TreeNode<number> | null): number {
    if (!node) return 0;
    // Compute left and right heights
    // Update diameter as max of current and leftH + rightH
    // Return height of this subtree
    // YOUR CODE HERE
  }

  height(root);
  return diameter;
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function treeDiameter(root: TreeNode<number> | null): number {
  // Tree diameter via DFS: O(n) time, O(h) space
  // Longest path may not pass through root, so track global max
  let maxDiameter: number = 0;

  function height(node: TreeNode<number> | null): number {
    if (!node) return 0;
    const leftHeight: number = height(node.left);
    const rightHeight: number = height(node.right);
    // Path through this node = left height + right height
    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
    // Return this subtree's height for parent's calculation
    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return maxDiameter;
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: {
            value: 2,
            left: { value: 4, left: null, right: null },
            right: { value: 5, left: null, right: null },
          },
          right: { value: 3, left: null, right: null },
        },
        expected: 3,
        description: 'Diameter 3: path 4->2->1->3 or 5->2->1->3',
      },
      {
        input: { value: 1, left: { value: 2, left: null, right: null }, right: null },
        expected: 1,
        description: 'Diameter 1: single edge',
      },
      {
        input: { value: 1, left: null, right: null },
        expected: 0,
        description: 'Single node: diameter 0',
      },
    ],
    hints: [
      'Diameter at a node = left height + right height',
      'Height of a node = 1 + max(leftH, rightH)',
      'Track global maximum diameter across all nodes',
    ],
    concepts: ['tree diameter', 'height calculation', 'recursion', 'global variable tracking'],
  },
  {
    id: 'ts-serialize-tree',
    title: 'Serialize and Deserialize Binary Tree',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Serialize a binary tree to a string and deserialize it back using preorder traversal with null markers. Tree serialization is used in distributed systems, caching, network transfer of tree structures, and is a popular interview problem.',
    instructions: [
      'Serialize: preorder traversal, use "null" for null nodes, comma-separated',
      'Deserialize: split string by comma, process tokens in preorder',
      'Use an index tracker to consume tokens sequentially',
    ],
    starterCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function serialize(root: TreeNode<number> | null): string {
  const parts: string[] = [];

  function preorder(node: TreeNode<number> | null): void {
    if (!node) {
      parts.push('null');
      return;
    }
    // Push value, recurse left, recurse right
    // YOUR CODE HERE
  }

  preorder(root);
  return parts.join(',');
}

function deserialize(str: string): TreeNode<number> | null {
  const tokens: string[] = str.split(',');
  let index: number = 0;

  function build(): TreeNode<number> | null {
    if (tokens[index] === 'null') {
      index++;
      return null;
    }
    // Create node, recurse left, recurse right
    // YOUR CODE HERE
  }

  return build();
}`,
    solutionCode: `interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

function serialize(root: TreeNode<number> | null): string {
  // Preorder serialization: O(n) time, O(n) space
  // Uses "null" sentinel for missing children to preserve structure
  const serializedParts: string[] = [];

  function preorder(node: TreeNode<number> | null): void {
    if (!node) {
      serializedParts.push('null');
      return;
    }
    // Record value first (preorder), then recurse left and right
    serializedParts.push(String(node.value));
    preorder(node.left);
    preorder(node.right);
  }

  preorder(root);
  return serializedParts.join(',');
}

function deserialize(str: string): TreeNode<number> | null {
  // Reconstruct tree by consuming tokens in the same preorder sequence
  const tokens: string[] = str.split(',');
  let tokenIndex: number = 0;

  function build(): TreeNode<number> | null {
    if (tokens[tokenIndex] === 'null') {
      tokenIndex++;
      return null;
    }
    // Create node from current token, then build left and right subtrees
    const node: TreeNode<number> = { value: Number(tokens[tokenIndex]), left: null, right: null };
    tokenIndex++;
    node.left = build();
    node.right = build();
    return node;
  }

  return build();
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: { value: 2, left: null, right: null },
          right: {
            value: 3,
            left: { value: 4, left: null, right: null },
            right: { value: 5, left: null, right: null },
          },
        },
        expected: '1,2,null,null,3,4,null,null,5,null,null',
        description: 'Serialize tree to string',
      },
      {
        input: null,
        expected: 'null',
        description: 'Serialize null tree',
      },
    ],
    hints: [
      'Preorder: visit node, then left, then right',
      'Use "null" as a sentinel for missing children',
      'Deserialize consumes tokens in the same preorder sequence',
    ],
    concepts: ['tree serialization', 'preorder traversal', 'string encoding', 'recursive parsing'],
  },

  // ========== MEMOIZATION / DYNAMIC PROGRAMMING ==========
  {
    id: 'ts-lcs-length',
    title: 'Longest Common Subsequence Length',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Compute the length of the longest common subsequence (LCS) of two strings using a bottom-up DP table. LCS is foundational to diff algorithms (git diff, file comparison), bioinformatics sequence alignment, and edit distance computation.',
    instructions: [
      'Build a 2D DP table of size (m+1) x (n+1)',
      'If characters match, dp[i][j] = dp[i-1][j-1] + 1',
      'Otherwise dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])',
      'Return dp[m][n]',
    ],
    starterCode: `function lcsLength(a: string, b: string): number {
  const m: number = a.length, n: number = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  // Fill the DP table
  // YOUR CODE HERE

  return dp[m][n];
}`,
    solutionCode: `function lcsLength(a: string, b: string): number {
  // Bottom-up DP approach: O(m*n) time, O(m*n) space
  // Build table where dp[row][col] = LCS length of a[0..row-1] and b[0..col-1]
  const m: number = a.length, n: number = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      if (a[row - 1] === b[col - 1]) {
        // Characters match: extend the LCS found without these characters
        dp[row][col] = dp[row - 1][col - 1] + 1;
      } else {
        // No match: take the best LCS excluding one character from either string
        dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
      }
    }
  }
  return dp[m][n];
}`,
    testCases: [
      {
        input: ['abcde', 'ace'],
        expected: 3,
        description: 'LCS of "abcde" and "ace" is "ace" (length 3)',
      },
      { input: ['abc', 'abc'], expected: 3, description: 'Identical strings' },
      { input: ['abc', 'def'], expected: 0, description: 'No common subsequence' },
      { input: ['abcdef', 'fbdamn'], expected: 2, description: 'LCS is "bd" (length 2)' },
      { input: ['', 'abc'], expected: 0, description: 'Empty first string' },
    ],
    hints: [
      'Initialize a (m+1) x (n+1) grid of zeros',
      'Compare a[i-1] with b[j-1] (1-indexed DP table)',
      'The answer is in the bottom-right cell dp[m][n]',
    ],
    concepts: ['dynamic programming', 'DP table', 'subsequence', 'string comparison'],
  },
  {
    id: 'ts-edit-distance',
    title: 'Edit Distance (Levenshtein)',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Compute the minimum edit distance (Levenshtein distance) between two strings using insertions, deletions, and substitutions. Edit distance powers spell checkers, DNA sequence alignment, fuzzy search, and auto-correct systems.',
    instructions: [
      'Build a (m+1) x (n+1) DP table',
      'Base cases: dp[i][0] = i (delete all), dp[0][j] = j (insert all)',
      'If chars match: dp[i][j] = dp[i-1][j-1]',
      'Otherwise: 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])',
    ],
    starterCode: `function editDistance(a: string, b: string): number {
  const m: number = a.length, n: number = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill the DP table
  // YOUR CODE HERE

  return dp[m][n];
}`,
    solutionCode: `function editDistance(a: string, b: string): number {
  // Levenshtein distance: O(m*n) time, O(m*n) space
  // dp[row][col] = min edits to transform a[0..row-1] into b[0..col-1]
  const m: number = a.length, n: number = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Base cases: transforming to/from empty string costs the string's length
  for (let row = 0; row <= m; row++) dp[row][0] = row;
  for (let col = 0; col <= n; col++) dp[0][col] = col;

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      if (a[row - 1] === b[col - 1]) {
        // Characters match: no edit needed, carry diagonal value
        dp[row][col] = dp[row - 1][col - 1];
      } else {
        // Take cheapest of delete, insert, or replace (each costs 1)
        dp[row][col] = 1 + Math.min(dp[row - 1][col], dp[row][col - 1], dp[row - 1][col - 1]);
      }
    }
  }
  return dp[m][n];
}`,
    testCases: [
      { input: ['kitten', 'sitting'], expected: 3, description: 'kitten -> sitting (3 edits)' },
      { input: ['abc', 'abc'], expected: 0, description: 'Identical strings need 0 edits' },
      { input: ['', 'hello'], expected: 5, description: 'Empty to "hello" needs 5 insertions' },
      { input: ['horse', 'ros'], expected: 3, description: 'horse -> ros (3 edits)' },
      {
        input: ['intention', 'execution'],
        expected: 5,
        description: 'intention -> execution (5 edits)',
      },
    ],
    hints: [
      'Base case: transforming empty string to string of length k costs k operations',
      'Three operations: insert (dp[i][j-1]), delete (dp[i-1][j]), replace (dp[i-1][j-1])',
      'If characters match, no operation needed: carry dp[i-1][j-1]',
    ],
    concepts: ['edit distance', 'Levenshtein', 'dynamic programming', 'string transformation'],
  },
  {
    id: 'ts-coin-change-min',
    title: 'Minimum Coins to Make Amount',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Find the minimum number of coins needed to make a given amount, with unlimited use of each denomination. This unbounded knapsack variant is a classic DP problem testing optimal substructure, used in currency systems and resource allocation.',
    instructions: [
      'Create a DP array of size amount+1 initialized to Infinity',
      'Base case: dp[0] = 0 (zero coins for amount 0)',
      'For each amount, try every coin and take the minimum',
      'Return dp[amount] or -1 if impossible',
    ],
    starterCode: `function coinChangeMin(coins: number[], amount: number): number {
  const dp: number[] = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  // Fill DP table
  // YOUR CODE HERE

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    solutionCode: `function coinChangeMin(coins: number[], amount: number): number {
  // Unbounded knapsack DP: O(amount * coins.length) time, O(amount) space
  // dp[target] = minimum coins needed to reach that target amount
  const dp: number[] = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let targetAmount = 1; targetAmount <= amount; targetAmount++) {
    for (const coin of coins) {
      // Only consider this coin if it fits and yields a better count
      if (coin <= targetAmount && dp[targetAmount - coin] + 1 < dp[targetAmount]) {
        dp[targetAmount] = dp[targetAmount - coin] + 1;
      }
    }
  }
  // Infinity means no combination of coins can reach the amount
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    testCases: [
      { input: [[1, 5, 10, 25], 30], expected: 2, description: '30 cents = 25 + 5 (2 coins)' },
      { input: [[1, 2, 5], 11], expected: 3, description: '11 = 5 + 5 + 1 (3 coins)' },
      { input: [[2], 3], expected: -1, description: 'Impossible to make 3 with only 2-cent coins' },
      { input: [[1], 0], expected: 0, description: 'Amount 0 needs 0 coins' },
      { input: [[1, 3, 4], 6], expected: 2, description: '6 = 3 + 3 (2 coins)' },
    ],
    hints: [
      'dp[i] = minimum coins to make amount i',
      'For each coin, if coin <= i, try dp[i - coin] + 1',
      'Start dp[0] = 0, everything else Infinity',
    ],
    concepts: ['coin change', 'dynamic programming', 'unbounded knapsack', 'optimization'],
  },
  {
    id: 'ts-knapsack-01',
    title: '0/1 Knapsack',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Solve the 0/1 knapsack problem: maximize value within a weight capacity where each item is used at most once. The 0/1 knapsack is the canonical dynamic programming problem, applied to budget allocation, cargo loading, and portfolio optimization.',
    instructions: [
      'Build a DP table of size (n+1) x (capacity+1)',
      'For each item, decide to include or exclude it',
      'If item fits: dp[i][w] = max(exclude, value[i-1] + dp[i-1][w - weight[i-1]])',
      'If not: dp[i][w] = dp[i-1][w]',
    ],
    starterCode: `function knapsack01(weights: number[], values: number[], capacity: number): number {
  const n: number = weights.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  // Fill the DP table
  // YOUR CODE HERE

  return dp[n][capacity];
}`,
    solutionCode: `function knapsack01(weights: number[], values: number[], capacity: number): number {
  // 0/1 Knapsack DP: O(n * capacity) time, O(n * capacity) space
  // dp[itemIdx][cap] = max value using first itemIdx items within cap weight
  const n: number = weights.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let itemIdx = 1; itemIdx <= n; itemIdx++) {
    for (let remainingCap = 0; remainingCap <= capacity; remainingCap++) {
      // Default: exclude current item
      dp[itemIdx][remainingCap] = dp[itemIdx - 1][remainingCap];
      if (weights[itemIdx - 1] <= remainingCap) {
        // Include item only if it yields more value than excluding it
        dp[itemIdx][remainingCap] = Math.max(dp[itemIdx][remainingCap], values[itemIdx - 1] + dp[itemIdx - 1][remainingCap - weights[itemIdx - 1]]);
      }
    }
  }
  return dp[n][capacity];
}`,
    testCases: [
      {
        input: [[2, 3, 4, 5], [3, 4, 5, 6], 5],
        expected: 7,
        description: 'Items (w:2,v:3) + (w:3,v:4) = 7',
      },
      {
        input: [[1, 1, 1], [10, 20, 30], 2],
        expected: 50,
        description: 'Pick two best: 20 + 30 = 50',
      },
      { input: [[10], [100], 5], expected: 0, description: 'Item too heavy, cannot pick any' },
      {
        input: [[1, 2, 3], [6, 10, 12], 5],
        expected: 22,
        description: 'Pick items 2 and 3: 10 + 12 = 22',
      },
    ],
    hints: [
      'Row i represents considering first i items',
      'Column w represents remaining capacity w',
      'For each cell, choose max of including or excluding current item',
    ],
    concepts: ['0/1 knapsack', 'dynamic programming', 'optimization', 'include/exclude'],
  },
  {
    id: 'ts-lis-length',
    title: 'Longest Increasing Subsequence Length',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Find the length of the longest strictly increasing subsequence (LIS) using dynamic programming. LIS appears in patience sorting, envelope nesting, and scheduling problems, and can be optimized to O(n log n) with binary search.',
    instructions: [
      'Create dp array where dp[i] = LIS length ending at index i',
      'Initialize all dp values to 1 (each element is a subsequence of length 1)',
      'For each i, check all j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1)',
      'Return the maximum value in dp',
    ],
    starterCode: `function lisLength(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const dp: number[] = Array(numbers.length).fill(1);
  // Fill DP table
  // YOUR CODE HERE

  return Math.max(...dp);
}`,
    solutionCode: `function lisLength(numbers: number[]): number {
  // O(n^2) DP approach: dp[idx] = length of LIS ending at index idx
  // Compare each element against all prior elements to find extendable subsequences
  if (numbers.length === 0) return 0;
  const dp: number[] = Array(numbers.length).fill(1);
  for (let currentIdx = 1; currentIdx < numbers.length; currentIdx++) {
    for (let prevIdx = 0; prevIdx < currentIdx; prevIdx++) {
      if (numbers[prevIdx] < numbers[currentIdx]) {
        // Extend the subsequence ending at prevIdx since it is strictly smaller
        dp[currentIdx] = Math.max(dp[currentIdx], dp[prevIdx] + 1);
      }
    }
  }
  // The LIS could end at any index, so take the global maximum
  return Math.max(...dp);
}`,
    testCases: [
      {
        input: [[10, 9, 2, 5, 3, 7, 101, 18]],
        expected: 4,
        description: 'LIS is [2,3,7,101] or [2,5,7,101]',
      },
      { input: [[0, 1, 0, 3, 2, 3]], expected: 4, description: 'LIS is [0,1,2,3]' },
      { input: [[7, 7, 7, 7]], expected: 1, description: 'All equal, LIS length 1' },
      { input: [[1, 2, 3, 4, 5]], expected: 5, description: 'Already sorted, entire array' },
      { input: [[5, 4, 3, 2, 1]], expected: 1, description: 'Decreasing, LIS length 1' },
    ],
    hints: [
      'dp[i] stores the length of LIS ending at index i',
      'For each element, look at all previous elements that are smaller',
      'The answer is the maximum across all dp values',
    ],
    concepts: ['LIS', 'dynamic programming', 'subsequence', 'O(n^2) DP'],
  },
  {
    id: 'ts-rod-cutting',
    title: 'Rod Cutting',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Find the maximum revenue from cutting a rod into pieces given prices for each length. Rod cutting is an unbounded knapsack variant that demonstrates optimal substructure and overlapping subproblems in dynamic programming.',
    instructions: [
      'prices[i] is the price for a rod piece of length i+1',
      'Create dp array where dp[i] = max revenue for rod of length i',
      'dp[0] = 0 (no rod, no revenue)',
      'dp[i] = max over all cuts j: prices[j] + dp[i - j - 1]',
    ],
    starterCode: `function rodCutting(prices: number[], length: number): number {
  const dp: number[] = Array(length + 1).fill(0);
  // Fill DP table
  // YOUR CODE HERE

  return dp[length];
}`,
    solutionCode: `function rodCutting(prices: number[], length: number): number {
  // Unbounded cutting DP: O(length^2) time, O(length) space
  // dp[rodLen] = maximum revenue obtainable from a rod of length rodLen
  const dp: number[] = Array(length + 1).fill(0);
  for (let rodLen = 1; rodLen <= length; rodLen++) {
    for (let cutSize = 0; cutSize < rodLen; cutSize++) {
      // Try cutting a piece of length (cutSize+1) and optimally cutting the remainder
      dp[rodLen] = Math.max(dp[rodLen], prices[cutSize] + dp[rodLen - cutSize - 1]);
    }
  }
  return dp[length];
}`,
    testCases: [
      {
        input: [[1, 5, 8, 9, 10, 17, 17, 20], 8],
        expected: 22,
        description: 'Rod of length 8, optimal is 2+6',
      },
      {
        input: [[3, 5, 8, 9, 10, 17, 17, 20], 8],
        expected: 24,
        description: 'Cut into all pieces of length 1: 3*8=24',
      },
      {
        input: [[1, 5, 8, 9], 4],
        expected: 10,
        description: 'Rod of length 4, cut into 2+2 = 5+5 = 10',
      },
      { input: [[10], 1], expected: 10, description: 'Single piece, price 10' },
    ],
    hints: [
      'Try every possible first cut of length j+1',
      'Revenue = price of first piece + best revenue of remainder',
      'prices[j] gives price for piece of length j+1',
    ],
    concepts: ['rod cutting', 'dynamic programming', 'unbounded', 'optimization'],
  },
  {
    id: 'ts-climbing-stairs',
    title: 'Climbing Stairs',
    category: 'memoization',
    difficulty: 'beginner',
    description:
      'Count distinct ways to climb n stairs taking 1 or 2 steps at a time using dynamic programming. This is equivalent to computing Fibonacci numbers and is a gentle introduction to DP state transitions and base cases.',
    instructions: [
      'dp[0] = 1 (one way to stay at ground), dp[1] = 1 (one way to reach step 1)',
      'For each step i >= 2: dp[i] = dp[i-1] + dp[i-2]',
      'Return dp[n]',
    ],
    starterCode: `function climbStairs(count: number): number {
  if (count <= 1) return 1;
  const dp: number[] = Array(count + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  // Fill DP table
  // YOUR CODE HERE

  return dp[count];
}`,
    solutionCode: `function climbStairs(count: number): number {
  // Fibonacci-style DP: O(n) time, O(n) space
  // dp[step] = number of distinct ways to reach that step
  if (count <= 1) return 1;
  const dp: number[] = Array(count + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let step = 2; step <= count; step++) {
    // Each step is reachable from one step below or two steps below
    dp[step] = dp[step - 1] + dp[step - 2];
  }
  return dp[count];
}`,
    testCases: [
      { input: 2, expected: 2, description: '2 stairs: (1+1) or (2)' },
      { input: 3, expected: 3, description: '3 stairs: (1+1+1), (1+2), (2+1)' },
      { input: 5, expected: 8, description: '5 stairs: 8 ways' },
      { input: 1, expected: 1, description: '1 stair: 1 way' },
      { input: 10, expected: 89, description: '10 stairs: 89 ways' },
    ],
    hints: [
      'This is essentially the Fibonacci sequence',
      'To reach step i, you came from step i-1 or step i-2',
      'Add the number of ways to reach each of those',
    ],
    concepts: ['climbing stairs', 'dynamic programming', 'Fibonacci', 'counting paths'],
  },
  {
    id: 'ts-unique-paths-grid',
    title: 'Unique Paths in Grid',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Count unique paths from top-left to bottom-right in an m x n grid, moving only right or down. This grid DP problem teaches 2D state transitions and has applications in robot navigation, lattice path counting, and combinatorics.',
    instructions: [
      'Create an m x n DP table',
      'First row and first column are all 1 (only one way to reach them)',
      'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
      'Return dp[m-1][n-1]',
    ],
    starterCode: `function uniquePaths(rows: number, cols: number): number {
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(1));
  // Fill the DP table starting from (1,1)
  // YOUR CODE HERE

  return dp[rows - 1][cols - 1];
}`,
    solutionCode: `function uniquePaths(rows: number, cols: number): number {
  // Grid path counting DP: O(rows*cols) time, O(rows*cols) space
  // dp[row][col] = number of unique paths from (0,0) to (row,col)
  // First row and column are pre-filled with 1 (only one direction possible)
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(1));
  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      // Each cell is reachable from above or from the left
      dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
    }
  }
  return dp[rows - 1][cols - 1];
}`,
    testCases: [
      { input: [3, 7], expected: 28, description: '3x7 grid has 28 unique paths' },
      { input: [3, 2], expected: 3, description: '3x2 grid has 3 paths' },
      { input: [1, 1], expected: 1, description: '1x1 grid has 1 path (already there)' },
      { input: [2, 2], expected: 2, description: '2x2 grid: right-down or down-right' },
      { input: [4, 4], expected: 20, description: '4x4 grid has 20 paths' },
    ],
    hints: [
      'First row: all 1s (can only move right)',
      'First column: all 1s (can only move down)',
      'Each cell = paths from above + paths from left',
    ],
    concepts: ['grid paths', 'dynamic programming', '2D DP', 'combinatorics'],
  },
  {
    id: 'ts-word-break',
    title: 'Word Break',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Determine if a string can be segmented into space-separated dictionary words using dynamic programming. Word break is a classic string DP problem used in NLP tokenization, search query parsing, and text segmentation systems.',
    instructions: [
      'Create dp array where dp[i] = true if s.substring(0, i) can be segmented',
      'dp[0] = true (empty string is valid)',
      'For each position i, check all positions j < i',
      'If dp[j] is true and s.substring(j, i) is in the dictionary, set dp[i] = true',
    ],
    starterCode: `function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet: Set<string> = new Set(wordDict);
  const dp: boolean[] = Array(s.length + 1).fill(false);
  dp[0] = true;
  // Fill DP table
  // YOUR CODE HERE

  return dp[s.length];
}`,
    solutionCode: `function wordBreak(s: string, wordDict: string[]): boolean {
  // Word segmentation DP: O(n^2) time, O(n) space (with O(1) Set lookups)
  // dp[endPos] = true if s[0..endPos-1] can be segmented into dictionary words
  const wordSet: Set<string> = new Set(wordDict);
  const dp: boolean[] = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let endPos = 1; endPos <= s.length; endPos++) {
    for (let startPos = 0; startPos < endPos; startPos++) {
      // Check if prefix up to startPos is valid AND the remaining substring is a word
      if (dp[startPos] && wordSet.has(s.substring(startPos, endPos))) {
        dp[endPos] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
    testCases: [
      { input: ['leetcode', ['leet', 'code']], expected: true, description: '"leet" + "code"' },
      {
        input: ['applepenapple', ['apple', 'pen']],
        expected: true,
        description: '"apple" + "pen" + "apple"',
      },
      {
        input: ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']],
        expected: false,
        description: 'Cannot fully segment',
      },
      { input: ['abcd', ['a', 'abc', 'b', 'cd']], expected: true, description: '"a" + "b" + "cd"' },
      { input: ['', ['a', 'b']], expected: true, description: 'Empty string is always valid' },
    ],
    hints: [
      'Use a Set for O(1) dictionary lookups',
      'dp[i] means the first i characters can be split into words',
      'For each end position, try all possible last-word starting positions',
    ],
    concepts: ['word break', 'dynamic programming', 'string segmentation', 'Set lookup'],
  },
  {
    id: 'ts-max-product-subarray',
    title: 'Maximum Product Subarray',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      "Find the contiguous subarray with the largest product, tracking both max and min to handle negatives. This twist on Kadane's algorithm requires maintaining two states because a negative times a negative becomes positive.",
    instructions: [
      'Track both currentMax and currentMin (negative * negative = positive)',
      'For each element, compute new max and min from: element, element * prevMax, element * prevMin',
      'Update the global maximum after each step',
    ],
    starterCode: `function maxProductSubarray(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  let maxProduct: number = numbers[0];
  let currentMax: number = numbers[0];
  let currentMin: number = numbers[0];
  // Iterate from index 1
  // YOUR CODE HERE

  return maxProduct;
}`,
    solutionCode: `function maxProductSubarray(numbers: number[]): number {
  // Kadane-variant for products: O(n) time, O(1) space
  // Track both max and min because a negative * negative can become the new max
  if (numbers.length === 0) return 0;
  let globalMaxProduct: number = numbers[0];
  let currentMax: number = numbers[0];
  let currentMin: number = numbers[0];
  for (let idx = 1; idx < numbers.length; idx++) {
    // Three choices: start fresh at current element, extend the running max, or extend the running min
    const productCandidates: number[] = [numbers[idx], numbers[idx] * currentMax, numbers[idx] * currentMin];
    currentMax = Math.max(...productCandidates);
    currentMin = Math.min(...productCandidates);
    // Update global best after considering this element
    globalMaxProduct = Math.max(globalMaxProduct, currentMax);
  }
  return globalMaxProduct;
}`,
    testCases: [
      { input: [[2, 3, -2, 4]], expected: 6, description: 'Subarray [2,3] has product 6' },
      { input: [[-2, 0, -1]], expected: 0, description: 'Best is 0 (single element)' },
      { input: [[-2, 3, -4]], expected: 24, description: 'Entire array: -2 * 3 * -4 = 24' },
      { input: [[1, -2, -3, 4]], expected: 24, description: '(-2)*(-3)*4 = 24' },
      { input: [[-1]], expected: -1, description: 'Single negative element' },
    ],
    hints: [
      'Negative numbers can flip min to max when multiplied',
      'Track both running max and running min products',
      'Consider three candidates at each step: start fresh, extend max, extend min',
    ],
    concepts: ['maximum product', 'dynamic programming', 'tracking min/max', 'subarray'],
  },

  // ========== UTILITIES ==========
  {
    id: 'ts-deep-equals',
    title: 'Deep Equality Check',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Implement deep equality checking that recursively compares nested objects, arrays, and primitives. Deep equals is essential for testing frameworks (Jest, Mocha), state comparison in React, and validating complex data structures.',
    instructions: [
      'Handle primitives: use === for direct comparison',
      'Handle null: null === null is true, null vs object is false',
      'Handle arrays: same length and all elements deeply equal',
      'Handle objects: same keys and all values deeply equal',
    ],
    starterCode: `function deepEquals(a: unknown, b: unknown): boolean {
  // Handle primitives and null
  // YOUR CODE HERE

  // Handle arrays
  // YOUR CODE HERE

  // Handle objects
  // YOUR CODE HERE
}`,
    solutionCode: `function deepEquals(a: unknown, b: unknown): boolean {
  // Recursive structural comparison: handles primitives, null, arrays, and objects
  // O(n) time where n is total number of nested values
  if (a === b) return true;
  // typeof null is 'object', so guard against null before object checks
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  // Prevent comparing an array to a plain object
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysOfA: string[] = Object.keys(a as Record<string, unknown>);
  const keysOfB: string[] = Object.keys(b as Record<string, unknown>);
  // Different key counts means structurally different
  if (keysOfA.length !== keysOfB.length) return false;

  // Recursively compare every value by key
  return keysOfA.every(key => deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]));
}`,
    testCases: [
      {
        input: [
          { a: 1, b: { c: 2 } },
          { a: 1, b: { c: 2 } },
        ],
        expected: true,
        description: 'Nested objects equal',
      },
      { input: [{ a: 1 }, { a: 2 }], expected: false, description: 'Different values' },
      {
        input: [
          [1, [2, 3]],
          [1, [2, 3]],
        ],
        expected: true,
        description: 'Nested arrays equal',
      },
      {
        input: [
          [1, 2],
          [1, 2, 3],
        ],
        expected: false,
        description: 'Different array lengths',
      },
      { input: [null, null], expected: true, description: 'Both null' },
      { input: [1, 1], expected: true, description: 'Same primitives' },
      { input: [{ a: 1 }, { b: 1 }], expected: false, description: 'Different keys' },
    ],
    hints: [
      'Use === for primitive comparison (handles NaN edge case aside)',
      'typeof null is "object", handle it separately',
      'Object.keys gets all own enumerable keys for comparison',
    ],
    concepts: ['deep equality', 'recursion', 'type checking', 'object comparison'],
  },
  {
    id: 'ts-merge-intervals',
    title: 'Merge Overlapping Intervals',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Merge all overlapping intervals in an array by sorting by start time and combining overlaps. Interval merging is used in calendar scheduling, time range consolidation, genomic region analysis, and resource allocation systems.',
    instructions: [
      'Sort intervals by start time',
      'Initialize merged array with the first interval',
      'For each subsequent interval, check if it overlaps with the last merged interval',
      'If overlap: extend the end of the last merged interval; otherwise push new interval',
    ],
    starterCode: `function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [intervals[0]];
  // Merge overlapping intervals
  // YOUR CODE HERE

  return merged;
}`,
    solutionCode: `function mergeIntervals(intervals: number[][]): number[][] {
  // Sort-then-merge greedy approach: O(n log n) time, O(n) space
  // Sorting guarantees overlapping intervals are adjacent
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [intervals[0]];
  for (let idx = 1; idx < intervals.length; idx++) {
    const lastMerged: number[] = merged[merged.length - 1];
    if (intervals[idx][0] <= lastMerged[1]) {
      // Overlap detected: extend the end to cover both intervals
      lastMerged[1] = Math.max(lastMerged[1], intervals[idx][1]);
    } else {
      // No overlap: start a new group
      merged.push(intervals[idx]);
    }
  }
  return merged;
}`,
    testCases: [
      {
        input: [
          [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18],
          ],
        ],
        expected: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
        description: 'Merge [1,3] and [2,6]',
      },
      {
        input: [
          [
            [1, 4],
            [4, 5],
          ],
        ],
        expected: [[1, 5]],
        description: 'Touching intervals merge',
      },
      {
        input: [
          [
            [1, 4],
            [0, 4],
          ],
        ],
        expected: [[0, 4]],
        description: 'Unsorted input',
      },
      { input: [[[1, 2]]], expected: [[1, 2]], description: 'Single interval' },
      {
        input: [
          [
            [1, 4],
            [2, 3],
          ],
        ],
        expected: [[1, 4]],
        description: 'One fully contains other',
      },
    ],
    hints: [
      'Sort by start time first so overlapping intervals are adjacent',
      'Overlap means current start <= last merged end',
      'When merging, take the maximum of both end values',
    ],
    concepts: ['intervals', 'merge', 'sorting', 'greedy'],
  },
  {
    id: 'ts-insert-interval',
    title: 'Insert Interval',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Insert a new interval into a sorted, non-overlapping list and merge if necessary. This problem tests interval manipulation skills and is used in calendar systems, meeting room allocation, and range-based data structures.',
    instructions: [
      'Add intervals that end before newInterval starts (no overlap)',
      'Merge all intervals that overlap with newInterval',
      'Add remaining intervals that start after newInterval ends',
    ],
    starterCode: `function insertInterval(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  let i: number = 0;
  // Add all intervals ending before newInterval starts
  // YOUR CODE HERE

  // Merge overlapping intervals
  // YOUR CODE HERE

  // Add remaining intervals
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function insertInterval(intervals: number[][], newInterval: number[]): number[][] {
  // Three-pass linear scan: O(n) time, O(n) space
  // Phase 1: collect non-overlapping intervals before newInterval
  // Phase 2: merge all overlapping intervals into newInterval
  // Phase 3: collect remaining non-overlapping intervals after
  const result: number[][] = [];
  let idx: number = 0;

  // Phase 1: intervals that end before newInterval starts (no overlap possible)
  while (idx < intervals.length && intervals[idx][1] < newInterval[0]) {
    result.push(intervals[idx]);
    idx++;
  }

  // Phase 2: expand newInterval to absorb all overlapping intervals
  while (idx < intervals.length && intervals[idx][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[idx][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[idx][1]);
    idx++;
  }
  result.push(newInterval);

  // Phase 3: remaining intervals start after newInterval ends
  while (idx < intervals.length) {
    result.push(intervals[idx]);
    idx++;
  }

  return result;
}`,
    testCases: [
      {
        input: [
          [
            [1, 3],
            [6, 9],
          ],
          [2, 5],
        ],
        expected: [
          [1, 5],
          [6, 9],
        ],
        description: 'Merge with first interval',
      },
      {
        input: [
          [
            [1, 2],
            [3, 5],
            [6, 7],
            [8, 10],
            [12, 16],
          ],
          [4, 8],
        ],
        expected: [
          [1, 2],
          [3, 10],
          [12, 16],
        ],
        description: 'Merge across multiple',
      },
      { input: [[], [5, 7]], expected: [[5, 7]], description: 'Insert into empty list' },
      {
        input: [[[1, 5]], [2, 3]],
        expected: [[1, 5]],
        description: 'New interval fully contained',
      },
    ],
    hints: [
      'Three phases: before overlap, during overlap, after overlap',
      'During merge phase, expand newInterval to cover all overlapping intervals',
      'Check overlap: current start <= newInterval end',
    ],
    concepts: ['insert interval', 'merge', 'sorted intervals', 'three-pass'],
  },
  {
    id: 'ts-event-emitter',
    title: 'Simple Event Emitter',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Build a simple event emitter with on (subscribe), off (unsubscribe), and emit (trigger) methods. The observer pattern is the backbone of event-driven architectures in Node.js, browser DOM events, and reactive programming.',
    instructions: [
      'on(event, fn): register a listener for the event',
      'off(event, fn): remove a specific listener',
      'emit(event, ...args): call all listeners for the event with the given arguments',
      'Return an object with on, off, and emit methods',
    ],
    starterCode: `interface EventEmitter {
  on(event: string, callback: (...args: unknown[]) => void): void;
  off(event: string, callback: (...args: unknown[]) => void): void;
  emit(event: string, ...args: unknown[]): void;
}

function createEmitter(): EventEmitter {
  const listeners: Record<string, Array<(...args: unknown[]) => void>> = {};
  // Implement on, off, emit
  // YOUR CODE HERE

  return { on, off, emit };
}`,
    solutionCode: `interface EventEmitter {
  on(event: string, callback: (...args: unknown[]) => void): void;
  off(event: string, callback: (...args: unknown[]) => void): void;
  emit(event: string, ...args: unknown[]): void;
}

function createEmitter(): EventEmitter {
  // Observer pattern: map event names to arrays of listener functions
  const listeners: Record<string, Array<(...args: unknown[]) => void>> = {};

  function on(event: string, callback: (...args: unknown[]) => void): void {
    // Lazily initialize the listener array for new events
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
  }

  function off(event: string, callback: (...args: unknown[]) => void): void {
    if (!listeners[event]) return;
    // Remove by reference identity so only the exact function is unsubscribed
    listeners[event] = listeners[event].filter(registeredFn => registeredFn !== callback);
  }

  function emit(event: string, ...args: unknown[]): void {
    if (!listeners[event]) return;
    // Invoke all registered listeners with the provided arguments
    listeners[event].forEach(registeredCallback => registeredCallback(...args));
  }

  return { on, off, emit };
}`,
    testCases: [
      {
        input: ['basic'],
        expected: [1, 2],
        description: 'Emit calls all listeners and collects results',
      },
      {
        input: ['off'],
        expected: [1],
        description: 'Off removes a listener so it is not called again',
      },
      {
        input: ['no-listeners'],
        expected: [],
        description: 'Emitting event with no listeners does nothing',
      },
    ],
    hints: [
      'Use an object to map event names to arrays of functions',
      'filter out the function reference in off()',
      'Use forEach and spread args when emitting',
    ],
    concepts: ['event emitter', 'pub-sub', 'observer pattern', 'callbacks'],
  },
  {
    id: 'ts-promise-all',
    title: 'Implement Promise.all',
    category: 'utilities',
    difficulty: 'advanced',
    description:
      'Implement Promise.all from scratch: resolve when all promises resolve, or reject on the first rejection. Understanding Promise.all internals is crucial for concurrent async programming, parallel API calls, and batch operations.',
    instructions: [
      'Return a new Promise',
      'Track resolved count and results array',
      'When all promises resolve, resolve with results in order',
      'If any promise rejects, reject immediately',
      'Handle empty array: resolve with []',
    ],
    starterCode: `function promiseAll<T>(promises: Array<Promise<T> | T>): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const results: T[] = new Array(promises.length);
    let resolved: number = 0;
    // Iterate and handle each promise
    // YOUR CODE HERE
  });
}`,
    solutionCode: `function promiseAll<T>(promises: Array<Promise<T> | T>): Promise<T[]> {
  // Parallel promise aggregation: O(n) setup, O(n) space for results
  // Resolves when ALL promises settle successfully; rejects on FIRST failure
  return new Promise<T[]>((resolve, reject) => {
    // Edge case: empty input should resolve immediately rather than hang
    if (promises.length === 0) return resolve([]);
    const orderedResults: T[] = new Array(promises.length);
    let settledCount: number = 0;
    promises.forEach((promiseOrValue, index) => {
      // Wrap in Promise.resolve so non-promise values are handled uniformly
      Promise.resolve(promiseOrValue).then(resolvedValue => {
        // Store by index (not push) to preserve original ordering regardless of resolve timing
        orderedResults[index] = resolvedValue;
        settledCount++;
        // Only resolve the outer promise once every input has settled successfully
        if (settledCount === promises.length) resolve(orderedResults);
      }).catch(reject); // First rejection short-circuits; later rejections are no-ops
    });
  });
}`,
    testCases: [
      {
        input: ['all-resolve'],
        expected: [1, 2, 3],
        description: 'All promises resolve: returns array of results in order',
      },
      {
        input: ['one-rejects'],
        expected: 'error',
        description: 'One rejection causes the whole promise to reject',
      },
      {
        input: ['empty'],
        expected: [],
        description: 'Empty array resolves immediately with []',
      },
    ],
    hints: [
      'Use Promise.resolve(p) to handle non-promise values',
      'Store results by index to preserve order',
      'Increment counter on each resolve, check if all done',
    ],
    concepts: ['Promise.all', 'promise composition', 'async patterns', 'error propagation'],
  },
  {
    id: 'ts-promise-race',
    title: 'Implement Promise.race',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Implement Promise.race from scratch: resolve or reject with whichever promise settles first. Promise.race is used for timeout patterns, fastest-response caching, and competitive fetching from multiple API endpoints.',
    instructions: [
      'Return a new Promise',
      'Iterate over all promises',
      'The first promise to resolve or reject determines the outcome',
      'Handle empty array: the promise never settles (pending forever)',
    ],
    starterCode: `function promiseRace<T>(promises: Array<Promise<T> | T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // Handle each promise
    // YOUR CODE HERE
  });
}`,
    solutionCode: `function promiseRace<T>(promises: Array<Promise<T> | T>): Promise<T> {
  // First-settled-wins pattern: O(n) setup, O(1) additional space
  // The earliest promise to resolve or reject determines the outcome
  return new Promise<T>((resolve, reject) => {
    // Each entry independently races; the first to settle wins
    promises.forEach(promiseOrValue => {
      // Wrap in Promise.resolve so plain (non-promise) values settle immediately
      // Once resolve/reject is called once, subsequent calls are harmless no-ops
      Promise.resolve(promiseOrValue).then(resolve).catch(reject);
    });
    // Note: if promises is empty, this Promise stays pending forever (by spec)
  });
}`,
    testCases: [
      {
        input: ['fastest-wins'],
        expected: 'first',
        description: 'First settled promise determines result',
      },
      {
        input: ['reject-first'],
        expected: 'error',
        description: 'First rejection wins if it settles first',
      },
    ],
    hints: [
      'Each promise calls the same resolve/reject',
      'Once a promise settles, subsequent calls to resolve/reject are ignored',
      'Wrap with Promise.resolve() to handle non-promise values',
    ],
    concepts: ['Promise.race', 'promise composition', 'first-settled', 'async patterns'],
  },
  {
    id: 'ts-deep-freeze',
    title: 'Deep Freeze Object',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Recursively freeze an object so no properties at any depth can be modified. Deep freeze enforces true immutability for configuration objects, constants, and state snapshots, preventing accidental mutations in complex applications.',
    instructions: [
      'Use Object.freeze on the current object',
      'Iterate over all property values',
      'If a value is a non-null object, recursively freeze it',
      'Return the frozen object',
    ],
    starterCode: `function deepFreeze<T extends Record<string, unknown>>(obj: T): Readonly<T> {
  // Freeze current object and recursively freeze nested objects
  // YOUR CODE HERE

}`,
    solutionCode: `function deepFreeze<T extends Record<string, unknown>>(obj: T): Readonly<T> {
  // Recursive immutability: O(n) time where n is total nested properties
  // Object.freeze alone only locks the top level, so we must recurse
  Object.freeze(obj);
  Object.values(obj).forEach((propertyValue: unknown) => {
    // Only recurse into non-null objects that are not already frozen (avoids cycles)
    if (propertyValue !== null && typeof propertyValue === 'object' && !Object.isFrozen(propertyValue)) {
      deepFreeze(propertyValue as Record<string, unknown>);
    }
  });
  return obj;
}`,
    testCases: [
      {
        input: [{ a: 1, b: { c: 2, d: { e: 3 } } }],
        expected: true,
        description: 'All nested levels are frozen',
      },
      {
        input: [{ x: [1, 2, 3] }],
        expected: true,
        description: 'Arrays inside objects are also frozen',
      },
      {
        input: [{ simple: 'value' }],
        expected: true,
        description: 'Shallow object is frozen',
      },
    ],
    hints: [
      'Object.freeze only freezes top-level properties',
      'Check typeof val === "object" && val !== null before recursing',
      'Use Object.isFrozen to avoid re-freezing',
    ],
    concepts: ['deep freeze', 'immutability', 'recursion', 'Object.freeze'],
  },
  {
    id: 'ts-object-pick',
    title: 'Pick Keys from Object',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      "Create a new object containing only the specified keys from a source object. Pick is a utility for data projection, API response shaping, and selecting specific fields from records, commonly used with TypeScript's Pick utility type.",
    instructions: [
      'Given an object and an array of keys, return a new object with only those keys',
      'If a key does not exist on the source, skip it',
      'Do not mutate the original object',
    ],
    starterCode: `function pick<T extends Record<string, unknown>>(obj: T, keys: string[]): Partial<T> {
  // Return new object with only the specified keys
  // YOUR CODE HERE

}`,
    solutionCode: `function pick<T extends Record<string, unknown>>(obj: T, keys: string[]): Partial<T> {
  // Non-mutating key selection: O(k) time where k = keys.length
  // Iterate over desired keys rather than object keys for efficiency
  const result: Partial<T> = {};
  for (const key of keys) {
    // Only include keys that actually exist on the source object
    if (key in obj) {
      (result as Record<string, unknown>)[key] = obj[key];
    }
  }
  return result;
}`,
    testCases: [
      {
        input: [{ a: 1, b: 2, c: 3 }, ['a', 'c']],
        expected: { a: 1, c: 3 },
        description: 'Pick a and c',
      },
      {
        input: [{ x: 10, y: 20 }, ['x', 'z']],
        expected: { x: 10 },
        description: 'Skip missing key z',
      },
      { input: [{ a: 1 }, []], expected: {}, description: 'Empty keys returns empty object' },
      { input: [{}, ['a']], expected: {}, description: 'Empty object returns empty' },
    ],
    hints: [
      'Iterate over the keys array, not the object',
      'Use the "in" operator to check if a key exists',
      'Build a new result object',
    ],
    concepts: ['pick', 'object manipulation', 'key filtering', 'non-mutating'],
  },
  {
    id: 'ts-object-omit',
    title: 'Omit Keys from Object',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Create a new object excluding specified keys from the source. Omit is the complement of pick, used for removing sensitive fields before API responses, stripping internal properties, and data sanitization.',
    instructions: [
      'Given an object and an array of keys to omit, return a new object without those keys',
      'Use a Set for efficient lookup of keys to omit',
      'Do not mutate the original object',
    ],
    starterCode: `function omit<T extends Record<string, unknown>>(obj: T, keys: string[]): Partial<T> {
  // Return new object excluding the specified keys
  // YOUR CODE HERE

}`,
    solutionCode: `function omit<T extends Record<string, unknown>>(obj: T, keys: string[]): Partial<T> {
  // Non-mutating key exclusion: O(n) time with O(k) Set for fast lookups
  const excludedKeys: Set<string> = new Set(keys);
  const result: Partial<T> = {};
  for (const key of Object.keys(obj)) {
    // Include only keys NOT in the exclusion set
    if (!excludedKeys.has(key)) {
      (result as Record<string, unknown>)[key] = obj[key];
    }
  }
  return result;
}`,
    testCases: [
      { input: [{ a: 1, b: 2, c: 3 }, ['b']], expected: { a: 1, c: 3 }, description: 'Omit b' },
      {
        input: [{ x: 10, y: 20, z: 30 }, ['x', 'z']],
        expected: { y: 20 },
        description: 'Omit x and z',
      },
      { input: [{ a: 1 }, ['b']], expected: { a: 1 }, description: 'Omit non-existent key' },
      { input: [{ a: 1, b: 2 }, []], expected: { a: 1, b: 2 }, description: 'Omit nothing' },
    ],
    hints: [
      'Convert omit keys to a Set for O(1) lookups',
      'Iterate over Object.keys(obj)',
      'Include key only if it is NOT in the omit set',
    ],
    concepts: ['omit', 'object manipulation', 'Set', 'key exclusion'],
  },
  {
    id: 'ts-flat-map',
    title: 'Implement flatMap',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Implement flatMap: map each element with a function then flatten the result by one level. FlatMap combines map and flatten into a single pass, used for one-to-many transformations, query expansion, and monadic bind operations.',
    instructions: [
      'Apply the mapping function to each element',
      'The mapping function may return arrays or single values',
      'Flatten the result by one level (concat all results)',
    ],
    starterCode: `function flatMap<T, R>(items: T[], transform: (item: T) => R | R[]): R[] {
  // Map then flatten one level
  // YOUR CODE HERE

}`,
    solutionCode: `function flatMap<T, R>(items: T[], transform: (item: T) => R | R[]): R[] {
  // Map + flatten-one-level: O(n * m) time where m is average mapped output size
  const result: R[] = [];
  for (const item of items) {
    const mappedValue: R | R[] = transform(item);
    if (Array.isArray(mappedValue)) {
      // Flatten one level: spread array elements into the result
      result.push(...mappedValue);
    } else {
      // Single value: push directly without wrapping
      result.push(mappedValue);
    }
  }
  return result;
}`,
    testCases: [
      {
        input: [[1, 2, 3], 'double'],
        expected: [1, 1, 2, 2, 3, 3],
        description: 'Each element duplicated: x => [x, x]',
      },
      {
        input: [['hello world', 'foo bar'], 'split'],
        expected: ['hello', 'world', 'foo', 'bar'],
        description: 'Split strings: s => s.split(" ")',
      },
      {
        input: [[1, 2, 3], 'identity'],
        expected: [1, 2, 3],
        description: 'Identity: x => x (no nesting)',
      },
      { input: [[], 'double'], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Map each element, then check if result is an array',
      'Use spread operator to flatten arrays into result',
      'Non-array results are pushed directly',
    ],
    concepts: ['flatMap', 'map', 'flatten', 'array transformation'],
  },
  {
    id: 'ts-run-length-encode',
    title: 'Run-Length Encoding',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Encode a string using run-length encoding where consecutive identical characters become count + character. RLE is a simple lossless compression used in bitmap images, fax transmission, and as a building block for more complex codecs.',
    instructions: [
      'Iterate through the string tracking current character and its count',
      'When the character changes, append count + character to result',
      'Handle the last group after the loop ends',
      'Example: "aaabbc" becomes "3a2b1c"',
    ],
    starterCode: `function runLengthEncode(str: string): string {
  if (str.length === 0) return '';
  let result: string = '';
  let count: number = 1;
  // Iterate and encode
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function runLengthEncode(str: string): string {
  // Single-pass compression: O(n) time, O(n) space
  // Groups consecutive identical characters as count+character pairs
  if (str.length === 0) return '';
  let encoded: string = '';
  let consecutiveCount: number = 1;
  for (let charIdx = 1; charIdx <= str.length; charIdx++) {
    if (charIdx < str.length && str[charIdx] === str[charIdx - 1]) {
      // Same character as previous: extend the current run
      consecutiveCount++;
    } else {
      // Character changed or end of string: flush the current run
      encoded += consecutiveCount + str[charIdx - 1];
      consecutiveCount = 1;
    }
  }
  return encoded;
}`,
    testCases: [
      { input: ['aaabbc'], expected: '3a2b1c', description: 'Basic encoding' },
      { input: ['aaa'], expected: '3a', description: 'Single character repeated' },
      { input: ['abcd'], expected: '1a1b1c1d', description: 'All unique characters' },
      { input: ['a'], expected: '1a', description: 'Single character' },
      { input: [''], expected: '', description: 'Empty string' },
    ],
    hints: [
      'Compare each character with the previous one',
      'When characters differ, flush the count and character',
      "Don't forget to handle the last group",
    ],
    concepts: ['run-length encoding', 'string processing', 'compression', 'counting'],
  },
  {
    id: 'ts-run-length-decode',
    title: 'Run-Length Decoding',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Decode a run-length encoded string like "3a2b1c" back to "aaabbc". Decoding complements encoding and tests string parsing with numeric prefixes, a pattern used in decompression, protocol parsing, and data deserialization.',
    instructions: [
      'Parse the encoded string for number-character pairs',
      'Extract the count (may be multiple digits) and the character',
      'Repeat each character by its count',
    ],
    starterCode: `function runLengthDecode(encoded: string): string {
  let result: string = '';
  let i: number = 0;
  // Parse and decode
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function runLengthDecode(encoded: string): string {
  // Two-pointer decompression: O(n) time where n is decoded length
  // Parses digit sequences followed by the character to repeat
  let decoded: string = '';
  let position: number = 0;
  while (position < encoded.length) {
    // Accumulate all consecutive digits to handle multi-digit counts
    let digitSequence: string = '';
    while (position < encoded.length && encoded[position] >= '0' && encoded[position] <= '9') {
      digitSequence += encoded[position];
      position++;
    }
    const repeatCount: number = parseInt(digitSequence, 10);
    // The character immediately after the digits is what gets repeated
    decoded += encoded[position].repeat(repeatCount);
    position++;
  }
  return decoded;
}`,
    testCases: [
      { input: ['3a2b1c'], expected: 'aaabbc', description: 'Basic decoding' },
      { input: ['1a1b1c1d'], expected: 'abcd', description: 'All count 1' },
      { input: ['10a'], expected: 'aaaaaaaaaa', description: 'Multi-digit count' },
      { input: ['3a'], expected: 'aaa', description: 'Single group' },
      { input: [''], expected: '', description: 'Empty string' },
    ],
    hints: [
      'Parse digits until you hit a non-digit character',
      'Use parseInt to convert the digit string to a number',
      'Use String.prototype.repeat() to expand the character',
    ],
    concepts: ['run-length decoding', 'string parsing', 'decompression', 'character repeat'],
  },
  {
    id: 'ts-debounce-leading',
    title: 'Debounce with Leading Edge',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Implement a leading-edge debounce that fires immediately on the first call, then ignores subsequent calls within the delay. Leading debounce provides instant feedback while preventing rapid re-firing, ideal for button clicks and form submissions.',
    instructions: [
      'On first call (no active timer), invoke the function immediately',
      'Start a timer for the delay period',
      'Ignore calls while the timer is active',
      'After the timer expires, the next call fires immediately again',
    ],
    starterCode: `function debounceLeading(callback: (...args: unknown[]) => void, delay: number): (...args: unknown[]) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  // Return debounced function
  // YOUR CODE HERE

}`,
    solutionCode: `function debounceLeading(callback: (...args: unknown[]) => void, delay: number): (...args: unknown[]) => void {
  // Leading-edge debounce: O(1) per call, O(1) space (single timer reference)
  // Fires immediately on the first call, then suppresses until the quiet period ends
  // Ideal for preventing double-clicks while keeping instant user feedback
  let cooldownTimer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: unknown[]): void {
    if (!cooldownTimer) {
      // No active cooldown means this is a fresh invocation -- fire immediately
      // Use apply to preserve the caller's "this" context
      callback.apply(this, args);
    }
    // Reset the cooldown on every call so rapid calls keep extending the quiet period
    // Non-null assertion is safe because clearTimeout tolerates undefined/null
    clearTimeout(cooldownTimer!);
    cooldownTimer = setTimeout(() => {
      // Cooldown expired: nullify the timer so the next call fires as a leading edge
      cooldownTimer = null;
    }, delay);
  };
}`,
    testCases: [
      {
        input: ['leading-fires-first'],
        expected: true,
        description: 'First call fires immediately',
      },
      {
        input: ['subsequent-ignored'],
        expected: true,
        description: 'Calls within delay are ignored',
      },
      {
        input: ['resets-after-delay'],
        expected: true,
        description: 'After delay expires, next call fires immediately',
      },
    ],
    hints: [
      'Check if timer is null to decide whether to invoke',
      'Always reset the timer on each call',
      'Set timer to null in the setTimeout callback',
    ],
    concepts: ['debounce', 'leading edge', 'setTimeout', 'closure'],
  },
  {
    id: 'ts-decimal-to-binary',
    title: 'Decimal to Binary Conversion',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Convert a non-negative integer to its binary string representation without using built-in toString(2). This exercise teaches the repeated-division algorithm and deepens understanding of positional number systems and bit representation.',
    instructions: [
      'Handle special case: 0 returns "0"',
      'Repeatedly divide by 2 and collect remainders',
      'Build the binary string from remainders in reverse order',
    ],
    starterCode: `function decimalToBinary(value: number): string {
  if (value === 0) return '0';
  let binary: string = '';
  // Convert using division by 2
  // YOUR CODE HERE

  return binary;
}`,
    solutionCode: `function decimalToBinary(value: number): string {
  // Repeated division by 2: O(log n) time, O(log n) space
  // Each remainder gives one bit, built from least to most significant
  if (value === 0) return '0';
  let binaryDigits: string = '';
  let quotient: number = value;
  while (quotient > 0) {
    // Remainder is the current least-significant bit; prepend to build MSB-first
    binaryDigits = (quotient % 2) + binaryDigits;
    quotient = Math.floor(quotient / 2);
  }
  return binaryDigits;
}`,
    testCases: [
      { input: [10], expected: '1010', description: '10 in binary is 1010' },
      { input: [0], expected: '0', description: '0 in binary is 0' },
      { input: [1], expected: '1', description: '1 in binary is 1' },
      { input: [255], expected: '11111111', description: '255 is 8 ones' },
      { input: [7], expected: '111', description: '7 in binary is 111' },
    ],
    hints: [
      'num % 2 gives the least significant bit',
      'Math.floor(num / 2) removes the least significant bit',
      'Prepend each bit to build the string in correct order',
    ],
    concepts: ['binary conversion', 'modulo', 'integer division', 'number bases'],
  },
  {
    id: 'ts-binary-to-decimal',
    title: 'Binary to Decimal Conversion',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Convert a binary string to its decimal number without using parseInt with radix. This exercise reinforces positional value calculation (each bit contributes 2^position) and is foundational for understanding binary arithmetic.',
    instructions: [
      'Iterate through each character of the binary string',
      'For each bit, multiply running total by 2 and add the bit value',
      'Return the final decimal number',
    ],
    starterCode: `function binaryToDecimal(binary: string): number {
  let decimal: number = 0;
  // Convert binary string to decimal
  // YOUR CODE HERE

  return decimal;
}`,
    solutionCode: `function binaryToDecimal(binary: string): number {
  // Horner's method for positional notation: O(n) time, O(1) space
  // Process left-to-right: shift accumulator left (multiply by 2) then add current bit
  let decimalAccumulator: number = 0;
  for (const bit of binary) {
    decimalAccumulator = decimalAccumulator * 2 + Number(bit);
  }
  return decimalAccumulator;
}`,
    testCases: [
      { input: ['1010'], expected: 10, description: '1010 is 10' },
      { input: ['0'], expected: 0, description: '0 is 0' },
      { input: ['1'], expected: 1, description: '1 is 1' },
      { input: ['11111111'], expected: 255, description: '8 ones is 255' },
      { input: ['111'], expected: 7, description: '111 is 7' },
    ],
    hints: [
      'Process bits from left to right',
      'Multiply accumulator by 2 then add current bit',
      'Convert character to number with Number(bit)',
    ],
    concepts: ['binary conversion', 'positional notation', 'number bases', 'accumulator'],
  },
  {
    id: 'ts-count-bits',
    title: 'Count Set Bits (Brian Kernighan)',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      "Count the number of set bits (1-bits) in a number using Brian Kernighan's algorithm where n & (n-1) clears the lowest set bit. This O(k) technique (k = number of set bits) is used in Hamming weight, error detection, and bit manipulation interviews.",
    instructions: [
      'Initialize a count to 0',
      'While n is not 0, apply n = n & (n - 1) and increment count',
      'Each iteration removes the lowest set bit',
      'Return the count',
    ],
    starterCode: `function countBits(value: number): number {
  let count: number = 0;
  // Use Brian Kernighan's algorithm
  // YOUR CODE HERE

  return count;
}`,
    solutionCode: `function countBits(value: number): number {
  // Brian Kernighan's algorithm: O(k) time where k is the number of set bits
  // Each iteration clears exactly one set bit, so we only loop k times (not 32)
  let setBitCount: number = 0;
  let remaining: number = value;
  while (remaining !== 0) {
    // n & (n-1) clears the lowest set bit in one step
    remaining = remaining & (remaining - 1);
    setBitCount++;
  }
  return setBitCount;
}`,
    testCases: [
      { input: [7], expected: 3, description: '7 = 111 has 3 set bits' },
      { input: [0], expected: 0, description: '0 has no set bits' },
      { input: [1], expected: 1, description: '1 = 1 has 1 set bit' },
      { input: [255], expected: 8, description: '255 = 11111111 has 8 set bits' },
      { input: [10], expected: 2, description: '10 = 1010 has 2 set bits' },
    ],
    hints: [
      'n & (n-1) turns off the rightmost set bit',
      'Count how many times you can do this before n becomes 0',
      'This is more efficient than checking each bit individually',
    ],
    concepts: ['bit manipulation', 'Brian Kernighan', 'set bits', 'bitwise AND'],
  },
  {
    id: 'ts-is-power-of-two',
    title: 'Is Power of Two (Bit Trick)',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Check if a number is a power of 2 using the bit trick n & (n-1) === 0. Powers of 2 have exactly one set bit, making this O(1) check useful for memory alignment, hash table sizing, and binary tree level calculations.',
    instructions: [
      'A power of 2 in binary is 1 followed by zeros: 1, 10, 100, 1000...',
      'n & (n - 1) clears the lowest set bit',
      'If n is a power of 2, n & (n - 1) === 0',
      'Also check that n > 0',
    ],
    starterCode: `function isPowerOfTwo(value: number): boolean {
  // Use bit manipulation to check
  // YOUR CODE HERE

}`,
    solutionCode: `function isPowerOfTwo(value: number): boolean {
  // Bit trick: O(1) time. Powers of 2 have exactly one set bit (e.g., 100...0)
  // n & (n-1) clears that single bit, leaving 0. Also guard against n <= 0.
  return value > 0 && (value & (value - 1)) === 0;
}`,
    testCases: [
      { input: [1], expected: true, description: '2^0 = 1' },
      { input: [2], expected: true, description: '2^1 = 2' },
      { input: [16], expected: true, description: '2^4 = 16' },
      { input: [0], expected: false, description: '0 is not a power of 2' },
      { input: [6], expected: false, description: '6 = 110 is not a power of 2' },
      { input: [1024], expected: true, description: '2^10 = 1024' },
    ],
    hints: [
      'Powers of 2 have exactly one bit set',
      'n & (n - 1) removes the lowest set bit',
      'If only one bit is set, result is 0',
    ],
    concepts: ['power of two', 'bit manipulation', 'bitwise AND', 'single bit check'],
  },
  {
    id: 'ts-toggle-bit',
    title: 'Toggle the Nth Bit',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Toggle (flip) the nth bit of a number using XOR (n ^ (1 << position)). Bit toggling is used in feature flags, bitmap manipulation, cryptographic operations, and encoding state as compact bit vectors.',
    instructions: [
      'Use the XOR operator (^) to flip a specific bit',
      'Create a mask with 1 shifted left by n positions: 1 << n',
      'XOR the number with the mask to toggle that bit',
    ],
    starterCode: `function toggleBit(value: number, position: number): number {
  // Toggle the nth bit using XOR
  // YOUR CODE HERE

}`,
    solutionCode: `function toggleBit(value: number, position: number): number {
  // XOR bit toggle: O(1) time. XOR with a mask flips only the targeted bit.
  // 1 << position creates a mask with a single 1 at the desired position
  return value ^ (1 << position);
}`,
    testCases: [
      { input: [5, 0], expected: 4, description: '5 (101) toggle bit 0 -> 4 (100)' },
      { input: [5, 1], expected: 7, description: '5 (101) toggle bit 1 -> 7 (111)' },
      { input: [0, 3], expected: 8, description: '0 toggle bit 3 -> 8 (1000)' },
      { input: [15, 2], expected: 11, description: '15 (1111) toggle bit 2 -> 11 (1011)' },
      { input: [8, 3], expected: 0, description: '8 (1000) toggle bit 3 -> 0 (0000)' },
    ],
    hints: [
      'XOR with 1 flips a bit: 0^1=1, 1^1=0',
      '1 << n creates a mask with only bit n set',
      'num ^ mask toggles only the bit at position n',
    ],
    concepts: ['bit toggle', 'XOR', 'bit shift', 'bit mask'],
  },
  {
    id: 'ts-matrix-multiply',
    title: 'Matrix Multiplication',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Multiply two matrices A (m x n) and B (n x p) to produce C (m x p) using the dot product of rows and columns. Matrix multiplication is fundamental to linear algebra, graphics transformations, neural networks, and graph algorithms.',
    instructions: [
      'C[i][j] = sum of A[i][k] * B[k][j] for all k',
      'A must have the same number of columns as B has rows',
      'Use three nested loops: row of A, column of B, shared dimension',
    ],
    starterCode: `function matrixMultiply(a: number[][], b: number[][]): number[][] {
  const rows: number = a.length;
  const shared: number = b.length;
  const cols: number = b[0].length;
  const result: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  // Multiply matrices
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function matrixMultiply(a: number[][], b: number[][]): number[][] {
  // Standard matrix multiplication: O(m * n * p) time, O(m * p) space
  // Each result cell is the dot product of a row from A and a column from B
  const rowCount: number = a.length;
  const shared: number = b.length;
  const colCount: number = b[0].length;
  const result: number[][] = Array.from({ length: rowCount }, () => Array(colCount).fill(0));
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      for (let dotIdx = 0; dotIdx < shared; dotIdx++) {
        // Accumulate the dot product of row from A and column from B
        result[row][col] += a[row][dotIdx] * b[dotIdx][col];
      }
    }
  }
  return result;
}`,
    testCases: [
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
        description: '2x2 * 2x2',
      },
      {
        input: [[[1, 2, 3]], [[4], [5], [6]]],
        expected: [[32]],
        description: '1x3 * 3x1 = 1x1',
      },
      {
        input: [
          [
            [1, 0],
            [0, 1],
          ],
          [
            [5, 6],
            [7, 8],
          ],
        ],
        expected: [
          [5, 6],
          [7, 8],
        ],
        description: 'Identity matrix multiplication',
      },
      {
        input: [
          [
            [2, 0],
            [0, 3],
          ],
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [
          [2, 4],
          [9, 12],
        ],
        description: 'Diagonal matrix scaling',
      },
    ],
    hints: [
      'Outer two loops iterate over result positions (i, j)',
      'Inner loop computes the dot product of row i and column j',
      'result[i][j] += a[i][k] * b[k][j]',
    ],
    concepts: ['matrix multiplication', 'nested loops', 'dot product', 'linear algebra'],
  },
  {
    id: 'ts-transpose-matrix',
    title: 'Transpose a Matrix',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Transpose a matrix by swapping rows and columns so element [i][j] moves to [j][i]. Matrix transpose is used in linear algebra, image rotation, data pivoting, and as a step in many matrix algorithms like in-place rotation.',
    instructions: [
      'If input is m x n, output is n x m',
      'result[j][i] = matrix[i][j]',
      'Create the transposed matrix with swapped dimensions',
    ],
    starterCode: `function transpose(matrix: number[][]): number[][] {
  if (matrix.length === 0) return [];
  const rows: number = matrix.length;
  const cols: number = matrix[0].length;
  // Build transposed matrix
  // YOUR CODE HERE

}`,
    solutionCode: `function transpose(matrix: number[][]): number[][] {
  // Matrix transpose: O(rows * cols) time, O(rows * cols) space
  // Swap row and column indices: element at [r][c] moves to [c][r]
  if (matrix.length === 0) return [];
  const rowCount: number = matrix.length;
  const colCount: number = matrix[0].length;
  // Output dimensions are swapped: colCount rows by rowCount columns
  const transposed: number[][] = Array.from({ length: colCount }, () => Array(rowCount).fill(0));
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      transposed[col][row] = matrix[row][col];
    }
  }
  return transposed;
}`,
    testCases: [
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
          ],
        ],
        expected: [
          [1, 4],
          [2, 5],
          [3, 6],
        ],
        description: '2x3 transposed to 3x2',
      },
      {
        input: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [
          [1, 3],
          [2, 4],
        ],
        description: '2x2 transpose',
      },
      {
        input: [[[1, 2, 3]]],
        expected: [[1], [2], [3]],
        description: '1x3 transposed to 3x1',
      },
      {
        input: [[]],
        expected: [],
        description: 'Empty matrix',
      },
    ],
    hints: [
      'The transposed matrix has dimensions cols x rows',
      'Simply assign result[j][i] = matrix[i][j]',
      'Use Array.from to create the new matrix with correct dimensions',
    ],
    concepts: ['transpose', 'matrix', 'row-column swap', '2D arrays'],
  },
  {
    id: 'ts-object-deep-merge',
    title: 'Deep Merge Two Objects',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Deep merge two objects where nested objects are merged recursively rather than overwritten. Deep merge is essential for configuration management, state updates in Redux/Zustand, and combining partial objects from multiple sources.',
    instructions: [
      'If both values are plain objects, merge them recursively',
      'Otherwise, the value from the second object wins',
      'Arrays are NOT merged, they are replaced',
      'Return a new object (do not mutate inputs)',
    ],
    starterCode: `function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...target };
  // Recursively merge source into result
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  // Recursive merge: O(n) time where n is total nested keys across both objects
  // Plain objects merge recursively; arrays and primitives are replaced by source
  const merged: Record<string, unknown> = { ...target };
  for (const key of Object.keys(source)) {
    const targetIsPlainObject: boolean = !!merged[key] && typeof merged[key] === 'object' && !Array.isArray(merged[key]);
    const sourceIsPlainObject: boolean = !!source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]);
    if (targetIsPlainObject && sourceIsPlainObject) {
      // Both sides are plain objects: recurse to merge nested properties
      merged[key] = deepMerge(merged[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
    } else {
      // Source value wins for primitives, arrays, or mismatched types
      merged[key] = source[key];
    }
  }
  return merged;
}`,
    testCases: [
      {
        input: [{ a: 1, b: { c: 2, d: 3 } }, { b: { d: 4, e: 5 } }],
        expected: { a: 1, b: { c: 2, d: 4, e: 5 } },
        description: 'Nested merge preserves c, updates d, adds e',
      },
      {
        input: [{ a: 1 }, { b: 2 }],
        expected: { a: 1, b: 2 },
        description: 'Non-overlapping keys',
      },
      {
        input: [{ a: [1, 2] }, { a: [3, 4] }],
        expected: { a: [3, 4] },
        description: 'Arrays are replaced, not merged',
      },
      {
        input: [{ a: { b: { c: 1 } } }, { a: { b: { d: 2 } } }],
        expected: { a: { b: { c: 1, d: 2 } } },
        description: 'Deeply nested merge',
      },
    ],
    hints: [
      'Check if both values are plain objects (not arrays, not null)',
      'If both are objects, recurse. Otherwise assign source value.',
      'Spread target first, then override with merged/source values',
    ],
    concepts: ['deep merge', 'recursion', 'object manipulation', 'type checking'],
  },
  {
    id: 'ts-retry-async',
    title: 'Retry Async Function',
    category: 'utilities',
    difficulty: 'advanced',
    description:
      'Implement a retry wrapper that retries a failing async function up to n times with a delay between attempts. Retry logic is critical for resilient API clients, network requests, distributed systems, and handling transient failures gracefully.',
    instructions: [
      'Call the async function',
      'If it succeeds, return the result',
      'If it fails and retries remain, wait for delay ms then retry',
      'If all retries exhausted, throw the last error',
    ],
    starterCode: `async function retry<T>(compute: () => Promise<T>, retries: number, delay: number): Promise<T> {
  // Attempt compute up to retries+1 times
  // YOUR CODE HERE

}`,
    solutionCode: `async function retry<T>(compute: () => Promise<T>, retries: number, delay: number): Promise<T> {
  // Retry with delay: O(retries) attempts, each separated by delay ms
  // Total attempts = retries + 1 (initial attempt + retries)
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await compute();
    } catch (err) {
      // On last attempt, propagate the error instead of retrying
      if (attempt === retries) throw err;
      // Wait before the next attempt to avoid hammering the resource
      await new Promise<void>(resolve => setTimeout(resolve, delay));
    }
  }
  // Unreachable, but satisfies TypeScript's return type requirement
  throw new Error('Retries exhausted');
}`,
    testCases: [
      {
        input: ['succeeds-first-try'],
        expected: 'ok',
        description: 'Function succeeds immediately, no retries needed',
      },
      {
        input: ['succeeds-after-2'],
        expected: 'ok',
        description: 'Fails twice then succeeds on third attempt',
      },
      {
        input: ['always-fails'],
        expected: 'error',
        description: 'Exhausts all retries and throws last error',
      },
    ],
    hints: [
      'Use a for loop from 0 to retries (inclusive)',
      'Wrap fn() call in try/catch',
      'Use await new Promise(r => setTimeout(r, delay)) for delay',
    ],
    concepts: ['retry', 'async/await', 'error handling', 'delay', 'resilience'],
  },
  {
    id: 'ts-throttle-leading-trailing',
    title: 'Throttle with Leading and Trailing',
    category: 'utilities',
    difficulty: 'advanced',
    description:
      'Implement throttle that fires on both the leading edge (immediately) and trailing edge (after the interval). This ensures the first call executes instantly and the last call during rapid invocations is never lost, ideal for scroll and resize handlers.',
    instructions: [
      'On the first call, invoke immediately (leading edge)',
      'During the throttle interval, save the most recent arguments',
      'When the interval expires, if there are saved arguments, invoke with them (trailing edge)',
      'Reset and allow the next call to fire as leading again',
    ],
    starterCode: `function throttle(callback: (...args: unknown[]) => void, interval: number): (...args: unknown[]) => void {
  let lastArgs: unknown[] | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  // Return throttled function
  // YOUR CODE HERE

}`,
    solutionCode: `function throttle(callback: (...args: unknown[]) => void, interval: number): (...args: unknown[]) => void {
  // Leading + trailing throttle: fires immediately on first call,
  // then fires once more after interval with the most recent arguments
  let pendingArgs: unknown[] | null = null;
  let activeTimer: ReturnType<typeof setTimeout> | null = null;

  function handleTrailingInvocation(): void {
    if (pendingArgs) {
      // Trailing edge: invoke with the most recently captured arguments
      callback.apply(null, pendingArgs);
      pendingArgs = null;
      // Restart the cooldown to rate-limit subsequent trailing calls
      activeTimer = setTimeout(handleTrailingInvocation, interval);
    } else {
      // No pending call: clear timer so next call fires as leading
      activeTimer = null;
    }
  }

  return function (this: unknown, ...args: unknown[]): void {
    if (!activeTimer) {
      // Leading edge: no active cooldown, invoke immediately
      callback.apply(this, args);
      activeTimer = setTimeout(handleTrailingInvocation, interval);
    } else {
      // During cooldown: save args for trailing invocation
      pendingArgs = args;
    }
  };
}`,
    testCases: [
      {
        input: ['leading-fires'],
        expected: true,
        description: 'First call fires immediately',
      },
      {
        input: ['trailing-fires'],
        expected: true,
        description: 'Last call during interval fires after interval',
      },
      {
        input: ['respects-interval'],
        expected: true,
        description: 'Calls within interval are throttled',
      },
    ],
    hints: [
      'Track whether a timer is active to decide leading invocation',
      'Store the latest args for the trailing call',
      'After interval, check if trailing args exist to invoke',
    ],
    concepts: ['throttle', 'leading edge', 'trailing edge', 'rate limiting', 'closure'],
  },
];
