import type { Exercise } from './types';

export const typescriptExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'ts-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Learn to iterate through an array while skipping every other element using index manipulation.',
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
  const result: number[] = [];
  for (let i = 0; i < numbers.length; i += 2) {
    result.push(numbers[i]);
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
    description: 'Iterate through an array from the last element to the first.',
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
  const result: T[] = [];
  for (let i = items.length - 1; i >= 0; i--) {
    result.push(items[i]);
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
    description: 'Iterate through an array with a custom step size.',
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
  const result: T[] = [];
  for (let i = 0; i < items.length; i += step) {
    result.push(items[i]);
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
    description: 'Traverse a 2D array (matrix) row by row and collect all elements.',
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
  const result: T[] = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      result.push(matrix[row][col]);
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
      'Generate all prime numbers between 1 and 100 using the Sieve of Eratosthenes or trial division.',
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
  const primes: number[] = [];
  for (let num = 2; num <= 100; num++) {
    let isPrime: boolean = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(num);
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
    description: 'Generate the first N Fibonacci numbers using iteration.',
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
  if (count <= 0) return [];
  if (count === 1) return [0];

  const fib: number[] = [0, 1];
  for (let i = 2; i < count; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
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
    description: 'Calculate the nth Fibonacci number using recursion.',
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
  if (n <= 0) return 0;
  if (n === 1) return 1;
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
    description: 'Calculate factorial using recursion.',
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
  if (n <= 1) return 1;
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
    description: 'Sum all elements in an array using recursion.',
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
  if (numbers.length === 0) return 0;
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
    description: 'Implement DFS to traverse a binary tree and collect values in pre-order.',
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
  const result: T[] = [];

  function traverse(node: TreeNode<T> | null): void {
    if (!node) return;
    result.push(node.value);
    traverse(node.left);
    traverse(node.right);
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
    description: 'Implement DFS in-order traversal (left, root, right) for a binary tree.',
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
  const result: T[] = [];

  function traverse(node: TreeNode<T> | null): void {
    if (!node) return;
    traverse(node.left);
    result.push(node.value);
    traverse(node.right);
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
    description: 'Implement BFS to traverse a binary tree level by level.',
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
  if (!root) return [];

  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];

  while (queue.length > 0) {
    const node: TreeNode<T> = queue.shift()!;
    result.push(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
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
    description: 'Implement binary search to find an element in a sorted array.',
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
  let left: number = 0;
  let right: number = numbers.length - 1;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);

    if (numbers[mid] === target) {
      return mid;
    } else if (numbers[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

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
    description: 'Traverse a linked list and collect all values.',
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
  const result: T[] = [];
  let current: ListNode<T> | null = head;

  while (current !== null) {
    result.push(current.value);
    current = current.next;
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
    description: 'Implement basic stack operations using an array.',
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
  const stack: number[] = [];

  for (const op of operations) {
    if (op.type === 'push') {
      stack.push(op.value!);
    } else if (op.type === 'pop') {
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
      'Create a reusable function to generate an array of numbers from start to end. This is a fundamental building block used in many algorithms.',
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
  if (start > end) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
      'Generate all possible subsets of an array. This is a core building block for problems involving subset selection, combinations, and backtracking.',
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
  return items.reduce<T[][]>(
    (subsets, value) => subsets.concat(subsets.map(set => [...set, value])),
    [[]]
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
      'Generate all combinations of size k from an array. This building block is used in scheduling, team formation, and many optimization problems.',
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
  const result: T[][] = [];

  function backtrack(start: number, current: T[]): void {
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < items.length; i++) {
      current.push(items[i]);
      backtrack(i + 1, current);
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
      'Generate all permutations of an array. Permutations are arrangements where order matters - essential for scheduling, anagram checking, and brute-force search.',
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
  const result: T[][] = [];

  function permute(current: T[], remaining: T[]): void {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      permute(
        [...current, remaining[i]],
        [...remaining.slice(0, i), ...remaining.slice(i + 1)]
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
      'Generate all pairs from two arrays (Cartesian product). This building block is used for generating test cases, grid coordinates, and combining options.',
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
  return first.flatMap(a => second.map(b => [a, b] as [A, B]));
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
      'Generate Cartesian product of any number of arrays. This generalizes pair generation to multi-dimensional combinations.',
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
  return arrays.reduce<T[][]>(
    (acc, items) => acc.flatMap(combo => items.map(value => [...combo, value])),
    [[]]
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
    description:
      'Calculate "n choose k" - the number of ways to choose k items from n. This is useful for counting combinations without generating them.',
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
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result: number = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
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
      'Create a memoization wrapper for single-argument functions. Memoization caches results to avoid redundant computation.',
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
  const cache: Map<T, R> = new Map();

  return function(arg: T): R {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result: R = compute(arg);
    cache.set(arg, result);
    return result;
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
      'Memoize functions with multiple arguments by serializing arguments as a cache key.',
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
  const cache: Map<string, R> = new Map();

  return function(...args: T): R {
    const key: string = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result: R = compute(...args);
    cache.set(key, result);
    return result;
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
      'Implement Fibonacci with memoization to achieve O(n) time complexity instead of O(2^n).',
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
  if (memo.has(n)) {
    return memo.get(n)!;
  }
  const result: number = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo.set(n, result);
  return result;
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
      'Create a debounce function that delays execution until after a pause in calls. Essential for search inputs, window resize, etc.',
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
  let timeoutId: ReturnType<typeof setTimeout>;

  return function(...args: T): void {
    clearTimeout(timeoutId);
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
      'Create a throttle function that limits how often a function can be called. Unlike debounce, throttle ensures regular execution during rapid calls.',
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
  let inThrottle: boolean = false;

  return function(...args: T): void {
    if (!inThrottle) {
      callback(...args);
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
      'Create a wrapper that allows a function to be called only once. Subsequent calls return the first result.',
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
  let called: boolean = false;
  let result: R;

  return function(...args: T): R {
    if (!called) {
      called = true;
      result = callback(...args);
    }
    return result;
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
      'Split an array into chunks of specified size. Used for pagination, batch processing, and parallel operations.',
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
  return Array.from(
    { length: Math.ceil(items.length / size) },
    (_, i) => items.slice(i * size, i * size + size)
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
      'Split array into two groups based on a predicate function. Returns [truthy, falsy] arrays.',
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
  return items.reduce<[T[], T[]]>(
    (acc, value) => {
      acc[predicate(value) ? 0 : 1].push(value);
      return acc;
    },
    [[], []]
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
      'Combine two arrays into array of pairs. Like a zipper bringing two sides together.',
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
  const length: number = Math.min(first.length, second.length);
  return Array.from({ length }, (_, i) => [first[i], second[i]] as [A, B]);
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
    description: 'Convert array of pairs back to two separate arrays. The inverse of zip.',
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
  return [
    pairs.map(p => p[0]),
    pairs.map(p => p[1])
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
      'Group array elements by a key function. Essential for data processing and aggregation.',
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
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key: string = keyFn(item);
    (groups[key] ??= []).push(item);
    return groups;
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
      'Count occurrences of each element in an array. A fundamental pattern for many algorithms.',
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
  return items.reduce<Record<string, number>>((counts, value) => {
    const key: string = String(value);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
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
      'Generate all contiguous windows of size k. Used for substring problems, moving averages, and more.',
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
  if (windowSize > items.length) return [];
  return Array.from(
    { length: items.length - windowSize + 1 },
    (_, i) => items.slice(i, i + windowSize)
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
    description: 'Flatten nested arrays to a specified depth. Control how deep to flatten.',
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
  if (depth < 1) return items;
  return items.reduce<unknown[]>((acc, value) => {
    if (Array.isArray(value)) {
      return acc.concat(flattenDepth(value, depth - 1));
    }
    return acc.concat(value);
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
      'Rotate array k positions to the left. Elements that fall off the left reappear on the right.',
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
  if (items.length === 0) return [];
  const shift: number = count % items.length;
  return [...items.slice(shift), ...items.slice(0, shift)];
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
    description: 'Interleave elements from two arrays like shuffling cards: a1, b1, a2, b2, ...',
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
  const maxLen: number = Math.max(first.length, second.length);
  const result: (A | B)[] = [];
  for (let i = 0; i < maxLen; i++) {
    if (i < first.length) result.push(first[i]);
    if (i < second.length) result.push(second[i]);
  }
  return result;
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
      'Implement binary search to find target in sorted array. Returns index or -1. O(log n) time complexity.',
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
  let left: number = 0;
  let right: number = numbers.length - 1;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    if (numbers[mid] === target) return mid;
    if (numbers[mid] < target) left = mid + 1;
    else right = mid - 1;
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
      'Find the index where target should be inserted to maintain sorted order. Used for insertions and range queries.',
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
  let left: number = 0;
  let right: number = numbers.length;

  while (left < right) {
    const mid: number = Math.floor((left + right) / 2);
    if (numbers[mid] < target) left = mid + 1;
    else right = mid;
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
    description: 'Merge two sorted arrays into one sorted array. The core operation in merge sort.',
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
  const result: number[] = [];
  let i: number = 0, j: number = 0;

  while (i < numbers1.length && j < numbers2.length) {
    if (numbers1[i] <= numbers2[j]) {
      result.push(numbers1[i++]);
    } else {
      result.push(numbers2[j++]);
    }
  }

  return [...result, ...numbers1.slice(i), ...numbers2.slice(j)];
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
      'Implement basic queue operations: enqueue (add to back) and dequeue (remove from front). FIFO order.',
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
  const queue: number[] = [];
  const results: (number | null)[] = [];

  for (const op of operations) {
    if (op.type === 'enqueue') {
      queue.push(op.value!);
    } else if (op.type === 'dequeue') {
      results.push(queue.length > 0 ? queue.shift()! : null);
    }
  }

  return results;
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
      'Implement the insert operation for a min heap. The heap property: parent <= children.',
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
  heap.push(value);
  let i: number = heap.length - 1;

  while (i > 0) {
    const parent: number = Math.floor((i - 1) / 2);
    if (heap[parent] <= heap[i]) break;
    [heap[parent], heap[i]] = [heap[i], heap[parent]];
    i = parent;
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
      'Convert an edge list to an adjacency list representation. Foundation for graph algorithms.',
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
  const graph: Record<number, number[]> = {};

  for (const [from, to] of edges) {
    (graph[from] ??= []).push(to);
    if (!directed) {
      (graph[to] ??= []).push(from);
    }
  }

  return graph;
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
      'Traverse a graph level by level using Breadth-First Search. Returns nodes in BFS order.',
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
  const visited: Set<number> = new Set([start]);
  const queue: number[] = [start];
  const result: number[] = [];

  while (queue.length > 0) {
    const node: number = queue.shift()!;
    result.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
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
      'Traverse a graph depth-first using recursion. Explores as deep as possible before backtracking.',
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
  const visited: Set<number> = new Set();
  const result: number[] = [];

  function explore(node: number): void {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);
    for (const neighbor of graph[node] || []) {
      explore(neighbor);
    }
  }

  explore(start);
  return result;
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
      'Implement insert operation for a Trie (prefix tree). Used for autocomplete, spell checking, and prefix matching.',
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
  let node: TrieNode = root;

  for (const char of word) {
    node[char] ??= {};
    node = node[char] as TrieNode;
  }

  node.$ = true;
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
      "Implement Union-Find with path compression. Used for connected components, Kruskal's algorithm, and cycle detection.",
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
  const parent: number[] = Array.from({ length: size }, (_, i) => i);

  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // Path compression
    }
    return parent[x];
  }

  function union(x: number, y: number): void {
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
      'Create a function composer that chains functions right-to-left. compose(f, g, h)(x) = f(g(h(x))).',
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
  return (value: T): T => transforms.reduceRight((acc, transform) => transform(acc), value);
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
      'Create a pipe function that chains functions left-to-right. pipe(f, g, h)(x) = h(g(f(x))).',
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
  return (value: T): T => transforms.reduce((acc, transform) => transform(acc), value);
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
      'Create a curry function that converts a multi-argument function into a chain of single-argument functions.',
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
  return function curried(...args: any[]): any {
    if (args.length >= callback.length) {
      return callback(...args);
    }
    return (...more: any[]) => curried(...args, ...more);
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
      'Remove duplicates from array based on a key function. Keep the first occurrence of each key.',
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
  const seen: Set<string | number> = new Set();
  return items.filter((item: T) => {
    const key: string | number = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
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
    description: 'Find elements in the first array that are not in the second array.',
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
  const excludeSet: Set<T> = new Set(excludeItems);
  return items.filter((value: T) => !excludeSet.has(value));
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
    description: 'Find elements that exist in both arrays.',
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
  const otherSet: Set<T> = new Set(otherItems);
  return items.filter((value: T) => otherSet.has(value));
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
    description: 'Take elements from array while predicate is true. Stop at first false.',
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
  const idx: number = items.findIndex((value: T) => !predicate(value));
  return idx === -1 ? items : items.slice(0, idx);
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
    description: 'Drop elements from start while predicate is true. Return the rest.',
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
  const idx: number = items.findIndex((value: T) => !predicate(value));
  return idx === -1 ? [] : items.slice(idx);
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
    description: 'Get n random elements from an array (without replacement).',
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
  const copy: T[] = [...items];
  const result: T[] = [];
  for (let i = 0; i < Math.min(count, copy.length); i++) {
    const idx: number = Math.floor(Math.random() * (copy.length - i)) + i;
    [copy[i], copy[idx]] = [copy[idx], copy[i]];
    result.push(copy[i]);
  }
  return result;
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
    description: 'Remove all falsy values (false, 0, "", null, undefined, NaN) from array.',
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
    description: 'Count elements by the result of a key function. Like groupBy but returns counts.',
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
  return items.reduce((counts: Record<string, number>, item: T) => {
    const key: string = String(keyFn(item));
    counts[key] = (counts[key] || 0) + 1;
    return counts;
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
    description: 'Sum values extracted by a function from array elements.',
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
  return items.reduce((sum: number, item: T) => sum + valueFn(item), 0);
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
    description: 'Find the element with the maximum value for a given key function.',
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
  if (items.length === 0) return undefined;
  return items.reduce((max: T, item: T) =>
    keyFn(item) > keyFn(max) ? item : max
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
    description: 'Implement search operation for a Trie. Check if a word exists in the trie.',
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
  let node: TrieNode = root;

  for (const char of word) {
    if (!node[char]) return false;
    node = node[char] as TrieNode;
  }

  return !!node.$;
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
      'Sort nodes in a DAG so that for every edge u→v, u comes before v. Used for dependency resolution.',
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
  const inDegree: Record<string, number> = {};
  const result: string[] = [];

  for (const node in graph) {
    inDegree[node] ??= 0;
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  const queue: string[] = Object.keys(inDegree).filter((node: string) => inDegree[node] === 0);

  while (queue.length) {
    const node: string = queue.shift()!;
    result.push(node);
    for (const neighbor of graph[node] || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return result;
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
      'Check if an array reads the same forwards and backwards using two pointers converging from opposite ends.',
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
  let left: number = 0;
  let right: number = items.length - 1;
  while (left < right) {
    if (items[left] !== items[right]) return false;
    left++;
    right--;
  }
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
      'Remove duplicates from a sorted array in-place using two same-direction pointers, and return the new length.',
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
  if (numbers.length === 0) return 0;
  let slow: number = 0;
  for (let fast: number = 1; fast < numbers.length; fast++) {
    if (numbers[fast] !== numbers[slow]) {
      slow++;
      numbers[slow] = numbers[fast];
    }
  }
  return slow + 1;
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
      'Find the maximum sum of k consecutive elements using a fixed-size sliding window.',
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
  if (numbers.length < windowSize) return null;
  let windowSum: number = 0;
  for (let i = 0; i < windowSize; i++) {
    windowSum += numbers[i];
  }
  let maxSum: number = windowSum;
  for (let i = windowSize; i < numbers.length; i++) {
    windowSum += numbers[i] - numbers[i - windowSize];
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
      'Find the length of the smallest contiguous subarray whose sum is greater than or equal to a target, using a variable-size sliding window.',
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
  let minLen: number = Infinity;
  let sum: number = 0;
  let left: number = 0;
  for (let right = 0; right < numbers.length; right++) {
    sum += numbers[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= numbers[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
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
      'Build a prefix sum array where prefixSum[i] equals the sum of all elements from index 0 to i.',
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
  if (numbers.length === 0) return [];
  const prefix: number[] = [numbers[0]];
  for (let i = 1; i < numbers.length; i++) {
    prefix.push(prefix[i - 1] + numbers[i]);
  }
  return prefix;
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
      'Build an array where each element is the product of all other elements, without using division.',
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
  const length: number = numbers.length;
  const result: number[] = new Array(length).fill(1);
  let leftProduct: number = 1;
  for (let i = 0; i < length; i++) {
    result[i] = leftProduct;
    leftProduct *= numbers[i];
  }
  let rightProduct: number = 1;
  for (let i = length - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= numbers[i];
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
      'Apply multiple range updates to an array efficiently using the difference array technique.',
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
  const diff: number[] = new Array(size + 1).fill(0);
  for (const [start, end, value] of updates) {
    diff[start] += value;
    if (end + 1 <= size) diff[end + 1] -= value;
  }
  const result: number[] = new Array(size);
  result[0] = diff[0];
  for (let i = 1; i < size; i++) {
    result[i] = result[i - 1] + diff[i];
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
    description: "Find the maximum sum of any contiguous subarray using Kadane's algorithm.",
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
  let maxSum: number = numbers[0];
  let currentSum: number = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    currentSum = Math.max(numbers[i], currentSum + numbers[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
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
      'Partition an array into three sections (less than pivot, equal to pivot, greater than pivot) in a single pass.',
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
  const result: number[] = [...numbers];
  let low: number = 0, mid: number = 0, high: number = result.length - 1;
  while (mid <= high) {
    if (result[mid] < pivot) {
      [result[low], result[mid]] = [result[mid], result[low]];
      low++;
      mid++;
    } else if (result[mid] > pivot) {
      [result[mid], result[high]] = [result[high], result[mid]];
      high--;
    } else {
      mid++;
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
      "Detect a cycle in a linked list represented as an array of next-indices, using Floyd's tortoise and hare algorithm.",
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
  if (nextIndices.length === 0) return false;
  let slow: number = 0;
  let fast: number = 0;
  while (true) {
    slow = nextIndices[slow];
    if (slow === -1) return false;
    fast = nextIndices[fast];
    if (fast === -1) return false;
    fast = nextIndices[fast];
    if (fast === -1) return false;
    if (slow === fast) return true;
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
      'Merge two sorted arrays where the first array has enough trailing zeros to hold both, working from the end.',
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
  let p1: number = targetLen - 1;
  let p2: number = sourceLen - 1;
  let write: number = targetLen + sourceLen - 1;
  while (p1 >= 0 && p2 >= 0) {
    if (target[p1] > source[p2]) {
      target[write] = target[p1];
      p1--;
    } else {
      target[write] = source[p2];
      p2--;
    }
    write--;
  }
  while (p2 >= 0) {
    target[write] = source[p2];
    p2--;
    write--;
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
    description: 'Read a matrix in zigzag order: even rows left-to-right, odd rows right-to-left.',
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
  const result: number[] = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < matrix[i].length; j++) {
        result.push(matrix[i][j]);
      }
    } else {
      for (let j = matrix[i].length - 1; j >= 0; j--) {
        result.push(matrix[i][j]);
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
    description: 'Read a matrix in spiral order, going clockwise from the outside in.',
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
  const result: number[] = [];
  if (matrix.length === 0) return result;
  let top: number = 0, bottom: number = matrix.length - 1;
  let left: number = 0, right: number = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) result.push(matrix[top][j]);
    top++;
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    if (top <= bottom) {
      for (let j = right; j >= left; j--) result.push(matrix[bottom][j]);
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
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
    description: 'Traverse a matrix along its diagonals, from top-right to bottom-left.',
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
  if (matrix.length === 0) return [];
  const rows: number = matrix.length;
  const cols: number = matrix[0].length;
  const result: number[] = [];
  for (let d = 0; d < rows + cols - 1; d++) {
    const startRow: number = d < cols ? 0 : d - cols + 1;
    const startCol: number = d < cols ? d : cols - 1;
    let r: number = startRow, c: number = startCol;
    while (r < rows && c >= 0) {
      result.push(matrix[r][c]);
      r++;
      c--;
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
    description: 'Rotate an N x N matrix 90 degrees clockwise in-place using transpose + reverse.',
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
  const size: number = matrix.length;
  // Transpose
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // Reverse each row
  for (let i = 0; i < size; i++) {
    matrix[i].reverse();
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
    description: 'Find the first index where arr[i] >= target using binary search (lower bound).',
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
  let lo: number = 0, hi: number = numbers.length;
  while (lo < hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] < target) {
      lo = mid + 1;
    } else {
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
    description: 'Find the first index where arr[i] > target using binary search (upper bound).',
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
  let lo: number = 0, hi: number = numbers.length;
  while (lo < hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] <= target) {
      lo = mid + 1;
    } else {
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
    description: 'Find the integer square root of a number using binary search on the answer.',
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
  if (value < 2) return value;
  let lo: number = 1, hi: number = Math.floor(value / 2);
  while (lo <= hi) {
    const mid: number = (lo + hi) >>> 1;
    if (mid * mid === value) return mid;
    if (mid * mid < value) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
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
      'Search for a target in a sorted array that has been rotated at some pivot, using binary search.',
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
  let lo: number = 0, hi: number = numbers.length - 1;
  while (lo <= hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] === target) return mid;
    if (numbers[lo] <= numbers[mid]) {
      if (target >= numbers[lo] && target < numbers[mid]) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else {
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
      'Find the kth smallest element in an unsorted array using the quickselect (partition-based) algorithm.',
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
  const a: number[] = [...numbers];
  function partition(lo: number, hi: number): number {
    const pivot: number = a[hi];
    let i: number = lo;
    for (let j: number = lo; j < hi; j++) {
      if (a[j] <= pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    return i;
  }
  let lo: number = 0, hi: number = a.length - 1;
  const target: number = count - 1;
  while (lo <= hi) {
    const pivotIndex: number = partition(lo, hi);
    if (pivotIndex === target) return a[pivotIndex];
    if (pivotIndex < target) lo = pivotIndex + 1;
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
      'Find an element using exponential search: first find a range by doubling, then binary search within it.',
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
  if (numbers.length === 0) return -1;
  if (numbers[0] === target) return 0;
  let bound: number = 1;
  while (bound < numbers.length && numbers[bound] < target) {
    bound *= 2;
  }
  let lo: number = Math.floor(bound / 2);
  let hi: number = Math.min(bound, numbers.length - 1);
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
      'Find a peak element (strictly greater than its neighbors) in an array using binary search.',
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
  let lo: number = 0, hi: number = numbers.length - 1;
  while (lo < hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] < numbers[mid + 1]) {
      lo = mid + 1;
    } else {
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
      'Search for a target in a matrix where each row and column is sorted in ascending order.',
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
  if (matrix.length === 0 || matrix[0].length === 0) return [-1, -1];
  let row: number = 0;
  let col: number = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return [row, col];
    if (matrix[row][col] > target) col--;
    else row++;
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
      'Count how many times a target appears in a sorted array using two binary searches.',
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
  function lowerBound(a: number[], t: number): number {
    let lo: number = 0, hi: number = a.length;
    while (lo < hi) {
      const mid: number = (lo + hi) >>> 1;
      if (a[mid] < t) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  function upperBound(a: number[], t: number): number {
    let lo: number = 0, hi: number = a.length;
    while (lo < hi) {
      const mid: number = (lo + hi) >>> 1;
      if (a[mid] <= t) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
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
    description: 'Find the minimum element in a rotated sorted array using binary search.',
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
  let lo: number = 0, hi: number = numbers.length - 1;
  while (lo < hi) {
    const mid: number = (lo + hi) >>> 1;
    if (numbers[mid] > numbers[hi]) {
      lo = mid + 1;
    } else {
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
      'Insert a value into a max heap (array-based) and restore the heap property by bubbling up.',
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
  heap.push(value);
  let i: number = heap.length - 1;
  while (i > 0) {
    const parent: number = Math.floor((i - 1) / 2);
    if (heap[i] > heap[parent]) {
      [heap[i], heap[parent]] = [heap[parent], heap[i]];
      i = parent;
    } else {
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
      'Extract the minimum element from a min heap and restore the heap property by sifting down.',
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
  if (heap.length === 0) return { min: null, heap: [] };
  const min: number = heap[0];
  const last: number | undefined = heap.pop();
  if (heap.length > 0) {
    heap[0] = last as number;
    let i: number = 0;
    while (true) {
      let smallest: number = i;
      const left: number = 2 * i + 1;
      const right: number = 2 * i + 2;
      if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
      if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
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
      'Implement a Least Recently Used cache using JavaScript Map (which preserves insertion order).',
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
  const cache: Map<number, number> = new Map();
  return {
    get(key: number): number {
      if (!cache.has(key)) return -1;
      const value: number = cache.get(key)!;
      cache.delete(key);
      cache.set(key, value);
      return value;
    },
    put(key: number, value: number): void {
      if (cache.has(key)) cache.delete(key);
      cache.set(key, value);
      if (cache.size > capacity) {
        const oldest: number = cache.keys().next().value!;
        cache.delete(oldest);
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
    description: 'Reverse a singly linked list represented as nested {val, next} objects.',
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
  let prev: ListNode | null = null;
  let current: ListNode | null = head;
  while (current !== null) {
    const next: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
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
      'Implement a fixed-size circular buffer (ring buffer) with enqueue, dequeue, and peek operations.',
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
  const buffer: (T | undefined)[] = new Array(capacity);
  let head: number = 0, tail: number = 0, count: number = 0;
  return {
    enqueue(value: T): boolean {
      if (count === capacity) return false;
      buffer[tail] = value;
      tail = (tail + 1) % capacity;
      count++;
      return true;
    },
    dequeue(): T | null {
      if (count === 0) return null;
      const value: T = buffer[head] as T;
      head = (head + 1) % capacity;
      count--;
      return value;
    },
    peek(): T | null {
      if (count === 0) return null;
      return buffer[head] as T;
    },
    size(): number {
      return count;
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
      'Find the next greater element for each element in an array using a monotonic decreasing stack.',
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
  const result: number[] = new Array(numbers.length).fill(-1);
  const stack: number[] = [];
  for (let i: number = 0; i < numbers.length; i++) {
    while (stack.length > 0 && numbers[stack[stack.length - 1]] < numbers[i]) {
      const idx: number = stack.pop()!;
      result[idx] = numbers[i];
    }
    stack.push(i);
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
    description: 'Find the maximum value in each sliding window of size k using a monotonic deque.',
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
  const result: number[] = [];
  const deque: number[] = [];
  for (let i: number = 0; i < numbers.length; i++) {
    while (deque.length > 0 && deque[0] < i - windowSize + 1) {
      deque.shift();
    }
    while (deque.length > 0 && numbers[deque[deque.length - 1]] <= numbers[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= windowSize - 1) {
      result.push(numbers[deque[0]]);
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
      'Implement a stack that supports push, pop, top, and retrieving the minimum element, all in O(1) time.',
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
  const stack: number[] = [];
  const minStack: number[] = [];
  return {
    push(value: number): void {
      stack.push(value);
      if (minStack.length === 0 || value <= minStack[minStack.length - 1]) {
        minStack.push(value);
      }
    },
    pop(): number {
      const value: number = stack.pop()!;
      if (value === minStack[minStack.length - 1]) {
        minStack.pop();
      }
      return value;
    },
    top(): number {
      return stack[stack.length - 1];
    },
    getMin(): number {
      return minStack[minStack.length - 1];
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
    description: 'Implement a FIFO queue using two LIFO stacks.',
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
  const inStack: T[] = [];
  const outStack: T[] = [];
  function transfer(): void {
    if (outStack.length === 0) {
      while (inStack.length > 0) {
        outStack.push(inStack.pop()!);
      }
    }
  }
  return {
    enqueue(value: T): void {
      inStack.push(value);
    },
    dequeue(): T | null {
      transfer();
      return outStack.length > 0 ? outStack.pop()! : null;
    },
    peek(): T | null {
      transfer();
      return outStack.length > 0 ? outStack[outStack.length - 1] : null;
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
      "Implement Union-Find (Disjoint Set Union) with union by rank and path compression. This is a fundamental building block for connected components, Kruskal's MST, and cycle detection.",
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
  const parent: number[] = Array.from({ length: size }, (_, i) => i);
  const rank: number[] = new Array(size).fill(0);

  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x: number, y: number): void {
    const rootX: number = find(x);
    const rootY: number = find(y);
    if (rootX === rootY) return;
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  }

  for (const [x, y] of unions) {
    union(x, y);
  }

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
      'Build a weighted adjacency list from an edge list. This is the standard graph representation used in Dijkstra, Bellman-Ford, and many graph algorithms.',
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
  const graph: Record<number, WeightedEdge[]> = {};
  for (let i = 0; i < size; i++) {
    graph[i] = [];
  }

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
      'Implement the point update operation for a Binary Indexed Tree (Fenwick Tree). This allows efficient prefix sum queries after updates in O(log n).',
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
  while (i <= size) {
    tree[i] += delta;
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
      'Implement the prefix sum query for a Binary Indexed Tree (Fenwick Tree). Computes sum of elements from index 1 to i in O(log n).',
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
  let sum: number = 0;
  while (i > 0) {
    sum += tree[i];
    i -= i & (-i);
  }
  return sum;
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
      'Implement a simple hash map using separate chaining for collision resolution. Supports put, get, and remove operations.',
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
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }

  function get(key: string): number {
    const idx: number = hash(key);
    const bucket: [string, number][] = buckets[idx];
    for (const pair of bucket) {
      if (pair[0] === key) return pair[1];
    }
    return -1;
  }

  function remove(key: string): void {
    const idx: number = hash(key);
    const bucket: [string, number][] = buckets[idx];
    const i: number = bucket.findIndex((pair: [string, number]) => pair[0] === key);
    if (i !== -1) bucket.splice(i, 1);
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
      'Implement a deque (double-ended queue) supporting push and pop from both front and back. Used in sliding window algorithms and BFS optimizations.',
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
  const deque: number[] = [];
  const results: number[] = [];

  for (const op of operations) {
    if (op[0] === 'pushFront') {
      deque.unshift(op[1]);
    } else if (op[0] === 'pushBack') {
      deque.push(op[1]);
    } else if (op[0] === 'popFront') {
      results.push(deque.length > 0 ? deque.shift()! : -1);
    } else if (op[0] === 'popBack') {
      results.push(deque.length > 0 ? deque.pop()! : -1);
    }
  }

  return results;
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
      'Compute base^exp using binary exponentiation in O(log n) time. This is a key building block in modular arithmetic, cryptography, and competitive programming.',
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
  if (exponent === 0) return 1;
  if (exponent % 2 === 0) {
    const half: number = fastPower(base, exponent / 2);
    return half * half;
  }
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
      'Flood fill a 2D grid from a starting position with a new color, like a paint bucket tool. A core pattern for grid-based DFS problems.',
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
  const origColor: number = grid[row][col];
  if (origColor === newColor) return grid;

  function fill(r: number, c: number): void {
    if (r < 0 || r >= grid.length) return;
    if (c < 0 || c >= grid[0].length) return;
    if (grid[r][c] !== origColor) return;

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
      'Generate all valid combinations of n pairs of parentheses. A classic backtracking problem that teaches constraint-based recursion.',
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
  const result: string[] = [];

  function generate(current: string, open: number, close: number): void {
    if (current.length === 2 * count) {
      result.push(current);
      return;
    }
    if (open < count) {
      generate(current + '(', open + 1, close);
    }
    if (close < open) {
      generate(current + ')', open, close + 1);
    }
  }

  generate('', 0, 0);
  return result;
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
      'Return the list of moves to solve the Tower of Hanoi for n disks. Each move is [from, to]. This classic recursion problem demonstrates divide-and-conquer thinking.',
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
  const moves: [string, string][] = [];

  function solve(disks: number, src: string, tgt: string, aux: string): void {
    if (disks === 0) return;
    solve(disks - 1, src, aux, tgt);
    moves.push([src, tgt]);
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
      'Deep clone a nested object or array structure without circular references. A fundamental utility pattern used everywhere in JavaScript.',
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
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(item => deepClone(item)) as unknown as T;
  }
  const result: Record<string, unknown> = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone((value as Record<string, unknown>)[key]);
    }
  }
  return result as T;
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
      'Check if any subset of the array sums to a target value using backtracking. This is the decision version of the subset sum problem.',
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
  function backtrack(index: number, currentSum: number): boolean {
    if (currentSum === target) return true;
    if (index >= numbers.length || currentSum > target) return false;

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
      'Count the number of valid N-Queens placements on an NxN board. Queens cannot share a row, column, or diagonal.',
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
  let count: number = 0;
  const cols: Set<number> = new Set();
  const diag1: Set<number> = new Set();
  const diag2: Set<number> = new Set();

  function solve(row: number): void {
    if (row === size) {
      count++;
      return;
    }
    for (let col = 0; col < size; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      solve(row + 1);
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  solve(0);
  return count;
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
      'Check if a word exists in a 2D grid of characters by traversing adjacent cells (up, down, left, right). Each cell can be used only once per path.',
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
  const rows: number = board.length;
  const cols: number = board[0].length;

  function dfs(r: number, c: number, idx: number): boolean {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[idx]) return false;

    const temp: string = board[r][c];
    board[r][c] = '#';
    const found: boolean = dfs(r + 1, c, idx + 1)
              || dfs(r - 1, c, idx + 1)
              || dfs(r, c + 1, idx + 1)
              || dfs(r, c - 1, idx + 1);
    board[r][c] = temp;
    return found;
  }

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
      'Flatten arbitrarily nested arrays into a single flat array using recursion. A fundamental recursive pattern for tree-like structures.',
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
  const result: number[] = [];

  function flatten(elements: NestedArray): void {
    for (const item of elements) {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        result.push(item);
      }
    }
  }

  flatten(items);
  return result;
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
      'Generate all unique permutations of a string that may contain duplicate characters. Avoids generating duplicate permutations by sorting and skipping.',
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
  const result: string[] = [];
  const chars: string[] = str.split('').sort();
  const used: boolean[] = new Array(chars.length).fill(false);

  function backtrack(current: string): void {
    if (current.length === chars.length) {
      result.push(current);
      return;
    }
    for (let i = 0; i < chars.length; i++) {
      if (used[i]) continue;
      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      backtrack(current + chars[i]);
      used[i] = false;
    }
  }

  backtrack('');
  return result;
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
      'Generate combinations where elements can be chosen more than once (multiset combinations). For example, choose 2 from [1,2,3] allows [1,1], [1,2], etc.',
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
  const result: T[][] = [];

  function backtrack(start: number, current: T[]): void {
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < items.length; i++) {
      current.push(items[i]);
      backtrack(i, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
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
      'Transform an array to its next permutation in lexicographic order, in-place. If already the largest permutation, wrap to the smallest (sorted ascending).',
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
  const length: number = numbers.length;
  let i: number = length - 2;

  while (i >= 0 && numbers[i] >= numbers[i + 1]) i--;

  if (i >= 0) {
    let j: number = length - 1;
    while (numbers[j] <= numbers[i]) j--;
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  let left: number = i + 1, right: number = length - 1;
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
      'Find the 1-based rank of a permutation in lexicographic order among all permutations of its elements. Assumes all elements are distinct.',
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
  const length: number = perm.length;
  let rank: number = 0;

  function factorial(value: number): number {
    let result: number = 1;
    for (let i = 2; i <= value; i++) result *= i;
    return result;
  }

  for (let i = 0; i < length; i++) {
    let smaller: number = 0;
    for (let j = i + 1; j < length; j++) {
      if (perm[j] < perm[i]) smaller++;
    }
    rank += smaller * factorial(length - 1 - i);
  }

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
      'Count the number of derangements of n elements: permutations where no element appears in its original position. Uses the recurrence D(n) = (n-1) * (D(n-1) + D(n-2)).',
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
  if (count === 0) return 1;
  if (count === 1) return 0;

  let prev2: number = 1;
  let prev1: number = 0;

  for (let i = 2; i <= count; i++) {
    const current: number = (i - 1) * (prev1 + prev2);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
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
      "Generate the nth row (0-indexed) of Pascal's triangle. Each element is the sum of the two elements above it.",
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
  let row: number[] = [1];

  for (let i = 1; i <= rowIndex; i++) {
    const newRow: number[] = [1];
    for (let j = 1; j < row.length; j++) {
      newRow.push(row[j - 1] + row[j]);
    }
    newRow.push(1);
    row = newRow;
  }

  return row;
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
      'Compute the nth Catalan number. Catalan numbers count balanced parentheses, BST shapes, polygon triangulations, and many other structures.',
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
  const dp: number[] = new Array(index + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= index; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - 1 - j];
    }
  }

  return dp[index];
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
      'Generate the power set (all subsets) using bitmask iteration instead of recursion. Each integer from 0 to 2^n-1 represents a subset.',
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
  const length: number = items.length;
  const total: number = 1 << length;
  const result: T[][] = [];

  for (let mask = 0; mask < total; mask++) {
    const subset: T[] = [];
    for (let j = 0; j < length; j++) {
      if (mask & (1 << j)) {
        subset.push(items[j]);
      }
    }
    result.push(subset);
  }

  return result;
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
      'Generate the n-bit Gray code sequence. Gray code is a binary numeral system where two successive values differ in only one bit.',
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
  const result: number[] = [];
  const total: number = 1 << bits;

  for (let i = 0; i < total; i++) {
    result.push(i ^ (i >> 1));
  }

  return result;
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
      'Solve the Josephus problem: n people in a circle, every kth person is eliminated. Find the 0-based position of the survivor.',
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
  let survivor: number = 0;

  for (let i = 2; i <= count; i++) {
    survivor = (survivor + step) % i;
  }

  return survivor;
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
      'Count the number of inversions in an array using a modified merge sort. An inversion is a pair (i,j) where i < j but arr[i] > arr[j]. O(n log n).',
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
  function mergeSort(items: number[]): { sorted: number[]; count: number } {
    if (items.length <= 1) return { sorted: items, count: 0 };

    const mid: number = Math.floor(items.length / 2);
    const left: { sorted: number[]; count: number } = mergeSort(items.slice(0, mid));
    const right: { sorted: number[]; count: number } = mergeSort(items.slice(mid));

    const merged: number[] = [];
    let count: number = left.count + right.count;
    let i: number = 0, j: number = 0;

    while (i < left.sorted.length && j < right.sorted.length) {
      if (left.sorted[i] <= right.sorted[j]) {
        merged.push(left.sorted[i++]);
      } else {
        merged.push(right.sorted[j++]);
        count += left.sorted.length - i;
      }
    }

    while (i < left.sorted.length) merged.push(left.sorted[i++]);
    while (j < right.sorted.length) merged.push(right.sorted[j++]);

    return { sorted: merged, count };
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
      'Implement binary tree preorder traversal using an explicit stack instead of recursion. Visit root, then left, then right.',
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
  if (!root) return [];

  const result: number[] = [];
  const stack: TreeNode<number>[] = [root];

  while (stack.length > 0) {
    const node: TreeNode<number> = stack.pop()!;
    result.push(node.value);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
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
      'Implement binary tree postorder traversal using an explicit stack. Visit left, then right, then root. This is the trickiest iterative traversal.',
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
  if (!root) return [];

  const result: number[] = [];
  const stack: TreeNode<number>[] = [root];

  while (stack.length > 0) {
    const node: TreeNode<number> = stack.pop()!;
    result.push(node.value);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return result.reverse();
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
      'Traverse a binary tree level by level, alternating direction: left-to-right, then right-to-left, etc.',
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
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode<number>[] = [root];
  let leftToRight: boolean = true;

  while (queue.length > 0) {
    const levelSize: number = queue.length;
    const level: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node: TreeNode<number> = queue.shift()!;
      level.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(leftToRight ? level : level.reverse());
    leftToRight = !leftToRight;
  }

  return result;
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
      'Calculate the number of nodes (width) at each level of a binary tree. Uses BFS to process one level at a time.',
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
  if (!root) return [];

  const widths: number[] = [];
  const queue: TreeNode<number>[] = [root];

  while (queue.length > 0) {
    const levelSize: number = queue.length;
    widths.push(levelSize);

    for (let i = 0; i < levelSize; i++) {
      const node: TreeNode<number> = queue.shift()!;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return widths;
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
      'Find the Lowest Common Ancestor (LCA) of two node values in a binary tree. The LCA is the deepest node that is an ancestor of both target nodes.',
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
  if (!root || root.value === p || root.value === q) return root;

  const left: TreeNode<number> | null = lowestCommonAncestor(root.left, p, q);
  const right: TreeNode<number> | null = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;
  return left || right;
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
      'Find the diameter of a binary tree: the longest path between any two nodes. The path may or may not pass through the root.',
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
  let diameter: number = 0;

  function height(node: TreeNode<number> | null): number {
    if (!node) return 0;
    const leftH: number = height(node.left);
    const rightH: number = height(node.right);
    diameter = Math.max(diameter, leftH + rightH);
    return 1 + Math.max(leftH, rightH);
  }

  height(root);
  return diameter;
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
      'Serialize a binary tree to a string and deserialize it back to the original tree. Uses preorder traversal with a null marker.',
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
  const parts: string[] = [];

  function preorder(node: TreeNode<number> | null): void {
    if (!node) {
      parts.push('null');
      return;
    }
    parts.push(String(node.value));
    preorder(node.left);
    preorder(node.right);
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
    const node: TreeNode<number> = { value: Number(tokens[index]), left: null, right: null };
    index++;
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
      'Compute the length of the longest common subsequence of two strings using a bottom-up DP table.',
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
  const m: number = a.length, n: number = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
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
      'Compute the minimum number of insertions, deletions, and substitutions to transform one string into another.',
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
  const m: number = a.length, n: number = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
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
      'Find the minimum number of coins needed to make a given amount. Each coin denomination can be used unlimited times.',
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
  const dp: number[] = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }
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
      'Given items with weights and values, find the maximum value that fits in a knapsack of given capacity. Each item can be used at most once.',
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
  const n: number = weights.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w];
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
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
      'Find the length of the longest strictly increasing subsequence in an array using dynamic programming.',
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
  if (numbers.length === 0) return 0;
  const dp: number[] = Array(numbers.length).fill(1);
  for (let i = 1; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) {
      if (numbers[j] < numbers[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
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
      'Given a rod of length n and an array of prices for each length 1..n, find the maximum revenue from cutting the rod into pieces.',
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
  const dp: number[] = Array(length + 1).fill(0);
  for (let i = 1; i <= length; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] = Math.max(dp[i], prices[j] + dp[i - j - 1]);
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
      'Count the number of distinct ways to climb n stairs, taking either 1 or 2 steps at a time.',
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
  if (count <= 1) return 1;
  const dp: number[] = Array(count + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= count; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
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
      'Count the number of unique paths from top-left to bottom-right in an m x n grid, moving only right or down.',
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
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(1));
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
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
      'Determine if a string can be segmented into a space-separated sequence of dictionary words.',
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
  const wordSet: Set<string> = new Set(wordDict);
  const dp: boolean[] = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
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
      'Find the contiguous subarray within an array of integers that has the largest product.',
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
  if (numbers.length === 0) return 0;
  let maxProduct: number = numbers[0];
  let currentMax: number = numbers[0];
  let currentMin: number = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    const candidates: number[] = [numbers[i], numbers[i] * currentMax, numbers[i] * currentMin];
    currentMax = Math.max(...candidates);
    currentMin = Math.min(...candidates);
    maxProduct = Math.max(maxProduct, currentMax);
  }
  return maxProduct;
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
      'Implement a deep equality check that compares nested objects, arrays, and primitive values recursively.',
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
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA: string[] = Object.keys(a as Record<string, unknown>);
  const keysB: string[] = Object.keys(b as Record<string, unknown>);
  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]));
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
      'Given an array of intervals [start, end], merge all overlapping intervals and return the non-overlapping result.',
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
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last: number[] = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
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
      'Insert a new interval into a sorted, non-overlapping list of intervals and merge if necessary.',
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
  const result: number[][] = [];
  let i: number = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
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
      'Build a simple event emitter with on (subscribe), off (unsubscribe), and emit (trigger) methods.',
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
  const listeners: Record<string, Array<(...args: unknown[]) => void>> = {};

  function on(event: string, callback: (...args: unknown[]) => void): void {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
  }

  function off(event: string, callback: (...args: unknown[]) => void): void {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(f => f !== callback);
  }

  function emit(event: string, ...args: unknown[]): void {
    if (!listeners[event]) return;
    listeners[event].forEach(callback => callback(...args));
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
      'Implement Promise.all from scratch. It takes an array of promises and resolves when all resolve, or rejects on the first rejection.',
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
  return new Promise<T[]>((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const results: T[] = new Array(promises.length);
    let resolved: number = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(value => {
        results[i] = value;
        resolved++;
        if (resolved === promises.length) resolve(results);
      }).catch(reject);
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
      'Implement Promise.race from scratch. It resolves or rejects with the first promise that settles.',
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
  return new Promise<T>((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
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
    description: 'Recursively freeze an object so that no properties at any depth can be modified.',
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
  Object.freeze(obj);
  Object.values(obj).forEach((value: unknown) => {
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value as Record<string, unknown>);
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
    description: 'Create a new object containing only the specified keys from the source object.',
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
  const result: Partial<T> = {};
  for (const key of keys) {
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
    description: 'Create a new object with all keys from the source except the specified ones.',
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
  const omitSet: Set<string> = new Set(keys);
  const result: Partial<T> = {};
  for (const key of Object.keys(obj)) {
    if (!omitSet.has(key)) {
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
      'Implement flatMap: map each element using a function, then flatten the result by one level.',
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
  const result: R[] = [];
  for (const item of items) {
    const mapped: R | R[] = transform(item);
    if (Array.isArray(mapped)) {
      result.push(...mapped);
    } else {
      result.push(mapped);
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
      'Encode a string using run-length encoding: consecutive identical characters are replaced by count + character.',
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
  if (str.length === 0) return '';
  let result: string = '';
  let count: number = 1;
  for (let i = 1; i <= str.length; i++) {
    if (i < str.length && str[i] === str[i - 1]) {
      count++;
    } else {
      result += count + str[i - 1];
      count = 1;
    }
  }
  return result;
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
    description: 'Decode a run-length encoded string: "3a2b1c" becomes "aaabbc".',
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
  let result: string = '';
  let i: number = 0;
  while (i < encoded.length) {
    let numStr: string = '';
    while (i < encoded.length && encoded[i] >= '0' && encoded[i] <= '9') {
      numStr += encoded[i];
      i++;
    }
    const count: number = parseInt(numStr, 10);
    result += encoded[i].repeat(count);
    i++;
  }
  return result;
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
      'Implement a leading-edge debounce: fire the function immediately on the first call, then ignore subsequent calls within the delay period.',
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
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: unknown[]): void {
    if (!timer) {
      callback.apply(this, args);
    }
    clearTimeout(timer!);
    timer = setTimeout(() => {
      timer = null;
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
      'Convert a non-negative decimal integer to its binary string representation without using built-in toString(2).',
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
  if (value === 0) return '0';
  let binary: string = '';
  let remaining: number = value;
  while (remaining > 0) {
    binary = (remaining % 2) + binary;
    remaining = Math.floor(remaining / 2);
  }
  return binary;
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
      'Convert a binary string to its decimal number representation without using parseInt with radix.',
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
  let decimal: number = 0;
  for (const bit of binary) {
    decimal = decimal * 2 + Number(bit);
  }
  return decimal;
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
      "Count the number of 1-bits in a number using Brian Kernighan's algorithm: n & (n-1) clears the lowest set bit.",
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
  let count: number = 0;
  let remaining: number = value;
  while (remaining !== 0) {
    remaining = remaining & (remaining - 1);
    count++;
  }
  return count;
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
      'Check if a number is a power of 2 using bit manipulation. A power of 2 has exactly one set bit.',
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
      'Toggle (flip) the nth bit of a number using the XOR operator. Bit positions are 0-indexed from the right.',
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
    description: 'Multiply two matrices A (m x n) and B (n x p) to produce matrix C (m x p).',
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
  const rows: number = a.length;
  const shared: number = b.length;
  const cols: number = b[0].length;
  const result: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < shared; k++) {
        result[i][j] += a[i][k] * b[k][j];
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
      'Transpose a matrix: swap rows and columns so that element at [i][j] moves to [j][i].',
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
  if (matrix.length === 0) return [];
  const rows: number = matrix.length;
  const cols: number = matrix[0].length;
  const result: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
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
      'Deep merge two objects: nested objects are merged recursively rather than overwritten.',
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
  const result: Record<string, unknown> = { ...target };
  for (const key of Object.keys(source)) {
    if (
      result[key] && typeof result[key] === 'object' && !Array.isArray(result[key]) &&
      source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
    } else {
      result[key] = source[key];
    }
  }
  return result;
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
      'Implement a retry wrapper that retries a failing async function up to n times with a delay between attempts.',
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
  for (let i = 0; i <= retries; i++) {
    try {
      return await compute();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise<void>(resolve => setTimeout(resolve, delay));
    }
  }
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
      'Implement throttle that fires on both the leading edge (immediately) and trailing edge (after the interval, with the most recent arguments).',
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
  let lastArgs: unknown[] | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  function invoke(): void {
    if (lastArgs) {
      callback.apply(null, lastArgs);
      lastArgs = null;
      timer = setTimeout(invoke, interval);
    } else {
      timer = null;
    }
  }

  return function (this: unknown, ...args: unknown[]): void {
    if (!timer) {
      callback.apply(this, args);
      timer = setTimeout(invoke, interval);
    } else {
      lastArgs = args;
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
