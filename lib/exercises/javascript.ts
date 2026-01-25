import { Exercise } from './types';

export const javascriptExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'js-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description: 'Learn to iterate through an array while skipping every other element using index manipulation.',
    instructions: [
      'Given an array of numbers, return a new array containing only elements at even indices (0, 2, 4, ...)',
      'Use a for loop with a step of 2',
      'Do not use filter or other array methods'
    ],
    starterCode: `function skipEveryOther(arr) {
  const result = [];
  // Use a for loop with step of 2
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function skipEveryOther(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr[i]);
  }
  return result;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [1, 3, 5], description: 'Basic even-length array' },
      { input: [10, 20, 30, 40, 50], expected: [10, 30, 50], description: 'Odd-length array' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty array' }
    ],
    hints: [
      'Initialize i to 0 and increment by 2 each iteration: i += 2',
      'Push arr[i] to the result array in each iteration'
    ],
    concepts: ['for loop', 'index stepping', 'array iteration']
  },
  {
    id: 'js-reverse-iteration',
    title: 'Reverse Array Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description: 'Iterate through an array from the last element to the first.',
    instructions: [
      'Given an array, return a new array with elements in reverse order',
      'Use a for loop iterating backwards',
      'Do not use the reverse() method'
    ],
    starterCode: `function reverseIterate(arr) {
  const result = [];
  // Iterate from the end to the beginning
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function reverseIterate(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Basic reverse' },
      { input: ['a', 'b', 'c'], expected: ['c', 'b', 'a'], description: 'String array' },
      { input: [42], expected: [42], description: 'Single element' },
      { input: [], expected: [], description: 'Empty array' }
    ],
    hints: [
      'Start i at arr.length - 1',
      'Loop while i >= 0',
      'Decrement i each iteration: i--'
    ],
    concepts: ['reverse iteration', 'for loop', 'array indices']
  },
  {
    id: 'js-step-iteration',
    title: 'Custom Step Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description: 'Iterate through an array with a custom step size.',
    instructions: [
      'Given an array and a step size, return elements at indices that are multiples of the step',
      'For step=3: return elements at indices 0, 3, 6, 9...',
      'Handle edge cases like empty arrays and step larger than array length'
    ],
    starterCode: `function stepIterate(arr, step) {
  const result = [];
  // Iterate with custom step size
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function stepIterate(arr, step) {
  const result = [];
  for (let i = 0; i < arr.length; i += step) {
    result.push(arr[i]);
  }
  return result;
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 3], expected: [1, 4, 7], description: 'Step of 3' },
      { input: [[10, 20, 30, 40, 50], 2], expected: [10, 30, 50], description: 'Step of 2' },
      { input: [[1, 2, 3], 5], expected: [1], description: 'Step larger than array' },
      { input: [[], 2], expected: [], description: 'Empty array' }
    ],
    hints: [
      'Use i += step instead of i++',
      'The first element (index 0) is always included'
    ],
    concepts: ['variable step', 'for loop', 'modular iteration']
  },
  {
    id: 'js-nested-loop-matrix',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description: 'Traverse a 2D array (matrix) row by row and collect all elements.',
    instructions: [
      'Given a 2D array (matrix), return a flat array of all elements',
      'Traverse row by row, from left to right',
      'Use nested for loops'
    ],
    starterCode: `function flattenMatrix(matrix) {
  const result = [];
  // Use nested loops to traverse the matrix
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function flattenMatrix(matrix) {
  const result = [];
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      result.push(matrix[row][col]);
    }
  }
  return result;
}`,
    testCases: [
      { input: [[[1, 2], [3, 4], [5, 6]]], expected: [1, 2, 3, 4, 5, 6], description: '3x2 matrix' },
      { input: [[[1, 2, 3], [4, 5, 6]]], expected: [1, 2, 3, 4, 5, 6], description: '2x3 matrix' },
      { input: [[[1]]], expected: [1], description: '1x1 matrix' },
      { input: [[]], expected: [], description: 'Empty matrix' }
    ],
    hints: [
      'Outer loop iterates over rows',
      'Inner loop iterates over columns within each row',
      'Access elements with matrix[row][col]'
    ],
    concepts: ['nested loops', '2D arrays', 'matrix traversal']
  },

  // ========== GENERATION ALGORITHMS ==========
  {
    id: 'js-prime-generation',
    title: 'Generate Prime Numbers',
    category: 'generation',
    difficulty: 'intermediate',
    description: 'Generate all prime numbers between 1 and 100 using the Sieve of Eratosthenes or trial division.',
    instructions: [
      'Return an array of all prime numbers from 2 to 100',
      'A prime number is only divisible by 1 and itself',
      'Use nested loops to check divisibility'
    ],
    starterCode: `function generatePrimes() {
  const primes = [];
  // Generate all primes from 2 to 100
  // YOUR CODE HERE

  return primes;
}`,
    solutionCode: `function generatePrimes() {
  const primes = [];
  for (let num = 2; num <= 100; num++) {
    let isPrime = true;
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
        expected: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],
        description: 'All primes 1-100'
      }
    ],
    hints: [
      'Start checking from 2 (smallest prime)',
      'Only check divisors up to Math.sqrt(num) for efficiency',
      'Use a boolean flag to track if the number is prime'
    ],
    concepts: ['prime numbers', 'nested loops', 'optimization', 'break statement'],
    timeLimit: 120
  },
  {
    id: 'js-fibonacci-iterative',
    title: 'Fibonacci Sequence (Iterative)',
    category: 'generation',
    difficulty: 'beginner',
    description: 'Generate the first N Fibonacci numbers using iteration.',
    instructions: [
      'Return an array of the first n Fibonacci numbers',
      'Fibonacci: each number is the sum of the two preceding ones',
      'Start with [0, 1, 1, 2, 3, 5, 8, ...]'
    ],
    starterCode: `function fibonacciIterative(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const fib = [0, 1];
  // Generate remaining Fibonacci numbers
  // YOUR CODE HERE

  return fib;
}`,
    solutionCode: `function fibonacciIterative(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}`,
    testCases: [
      { input: 10, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], description: 'First 10 Fibonacci' },
      { input: 5, expected: [0, 1, 1, 2, 3], description: 'First 5 Fibonacci' },
      { input: 1, expected: [0], description: 'Single element' },
      { input: 0, expected: [], description: 'Zero elements' }
    ],
    hints: [
      'fib[i] = fib[i-1] + fib[i-2]',
      'Start the loop at index 2 since indices 0 and 1 are already defined'
    ],
    concepts: ['Fibonacci', 'iteration', 'dynamic programming']
  },

  // ========== RECURSION ==========
  {
    id: 'js-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'intermediate',
    description: 'Calculate the nth Fibonacci number using recursion.',
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1',
      'Use recursion: fib(n) = fib(n-1) + fib(n-2)'
    ],
    starterCode: `function fibonacciRecursive(n) {
  // Base cases
  // YOUR CODE HERE

  // Recursive case
  // YOUR CODE HERE
}`,
    solutionCode: `function fibonacciRecursive(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 5, expected: 5, description: 'fib(5)' },
      { input: 10, expected: 55, description: 'fib(10)' }
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n === 1 returns 1',
      'Recursive case: return fib(n-1) + fib(n-2)'
    ],
    concepts: ['recursion', 'base case', 'Fibonacci']
  },
  {
    id: 'js-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description: 'Calculate factorial using recursion.',
    instructions: [
      'Return n! (n factorial)',
      'factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: factorial(0) = factorial(1) = 1'
    ],
    starterCode: `function factorial(n) {
  // Base case
  // YOUR CODE HERE

  // Recursive case
  // YOUR CODE HERE
}`,
    solutionCode: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    testCases: [
      { input: 0, expected: 1, description: '0!' },
      { input: 1, expected: 1, description: '1!' },
      { input: 5, expected: 120, description: '5!' },
      { input: 10, expected: 3628800, description: '10!' }
    ],
    hints: [
      'Base case: if n <= 1, return 1',
      'Recursive case: n * factorial(n - 1)'
    ],
    concepts: ['recursion', 'factorial', 'base case']
  },
  {
    id: 'js-sum-recursive',
    title: 'Sum Array (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description: 'Sum all elements in an array using recursion.',
    instructions: [
      'Return the sum of all numbers in the array',
      'Use recursion, not loops',
      'Consider: sum of array = first element + sum of rest'
    ],
    starterCode: `function sumArray(arr) {
  // Base case
  // YOUR CODE HERE

  // Recursive case
  // YOUR CODE HERE
}`,
    solutionCode: `function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: 15, description: 'Sum 1-5' },
      { input: [10, 20, 30], expected: 60, description: 'Sum of tens' },
      { input: [5], expected: 5, description: 'Single element' },
      { input: [], expected: 0, description: 'Empty array' }
    ],
    hints: [
      'Base case: empty array returns 0',
      'Use arr.slice(1) to get the rest of the array'
    ],
    concepts: ['recursion', 'array slicing', 'base case']
  },

  // ========== TRAVERSAL (DFS/BFS) ==========
  {
    id: 'js-dfs-tree',
    title: 'Depth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement DFS to traverse a binary tree and collect values in pre-order.',
    instructions: [
      'Given a binary tree node, return an array of all values in pre-order (root, left, right)',
      'Use recursion to implement DFS',
      'Each node has value, left, and right properties'
    ],
    starterCode: `// Tree node structure: { value, left, right }
function dfsPreOrder(node) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    // Visit node, then left, then right
    // YOUR CODE HERE
  }

  traverse(node);
  return result;
}`,
    solutionCode: `function dfsPreOrder(node) {
  const result = [];

  function traverse(node) {
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
        input: { value: 1, left: { value: 2, left: null, right: null }, right: { value: 3, left: null, right: null } },
        expected: [1, 2, 3],
        description: 'Simple tree'
      },
      {
        input: { value: 1, left: { value: 2, left: { value: 4, left: null, right: null }, right: null }, right: { value: 3, left: null, right: null } },
        expected: [1, 2, 4, 3],
        description: 'Deeper tree'
      },
      { input: null, expected: [], description: 'Empty tree' }
    ],
    hints: [
      'Pre-order: visit current node first, then recurse left, then right',
      'Check for null nodes before accessing properties',
      'Push node.value to result before recursing'
    ],
    concepts: ['DFS', 'tree traversal', 'pre-order', 'recursion']
  },
  {
    id: 'js-dfs-inorder',
    title: 'DFS In-Order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement DFS in-order traversal (left, root, right) for a binary tree.',
    instructions: [
      'Return values in in-order: left subtree, then root, then right subtree',
      'For a BST, this gives values in sorted order',
      'Use recursion'
    ],
    starterCode: `function dfsInOrder(node) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    // Visit left, then node, then right
    // YOUR CODE HERE
  }

  traverse(node);
  return result;
}`,
    solutionCode: `function dfsInOrder(node) {
  const result = [];

  function traverse(node) {
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
        input: { value: 2, left: { value: 1, left: null, right: null }, right: { value: 3, left: null, right: null } },
        expected: [1, 2, 3],
        description: 'BST in-order gives sorted'
      },
      {
        input: { value: 4, left: { value: 2, left: { value: 1, left: null, right: null }, right: { value: 3, left: null, right: null } }, right: { value: 5, left: null, right: null } },
        expected: [1, 2, 3, 4, 5],
        description: 'Larger BST'
      }
    ],
    hints: [
      'In-order: recurse left, then visit current, then recurse right',
      'Perfect for getting sorted values from a BST'
    ],
    concepts: ['DFS', 'in-order traversal', 'BST', 'recursion']
  },
  {
    id: 'js-bfs-tree',
    title: 'Breadth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement BFS to traverse a binary tree level by level.',
    instructions: [
      'Return an array of values in level-order (top to bottom, left to right)',
      'Use a queue (array with push/shift) to track nodes to visit',
      'BFS processes all nodes at current depth before moving deeper'
    ],
    starterCode: `function bfs(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    // Dequeue, process, and enqueue children
    // YOUR CODE HERE
  }

  return result;
}`,
    solutionCode: `function bfs(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}`,
    testCases: [
      {
        input: { value: 1, left: { value: 2, left: null, right: null }, right: { value: 3, left: null, right: null } },
        expected: [1, 2, 3],
        description: 'Simple tree'
      },
      {
        input: {
          value: 1,
          left: { value: 2, left: { value: 4, left: null, right: null }, right: { value: 5, left: null, right: null } },
          right: { value: 3, left: { value: 6, left: null, right: null }, right: { value: 7, left: null, right: null } }
        },
        expected: [1, 2, 3, 4, 5, 6, 7],
        description: 'Full binary tree'
      }
    ],
    hints: [
      'Use shift() to remove from front of queue (FIFO)',
      'Use push() to add children to back of queue',
      'Check if left/right child exists before adding to queue'
    ],
    concepts: ['BFS', 'queue', 'level-order traversal']
  },

  // ========== SEARCHING ==========
  {
    id: 'js-binary-search',
    title: 'Binary Search',
    category: 'searching',
    difficulty: 'intermediate',
    description: 'Implement binary search to find an element in a sorted array.',
    instructions: [
      'Given a sorted array and target, return the index of target or -1 if not found',
      'Binary search divides the search space in half each iteration',
      'Time complexity: O(log n)'
    ],
    starterCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Calculate mid and compare
    // YOUR CODE HERE
  }

  return -1;
}`,
    solutionCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
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
      { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: 'Not found' }
    ],
    hints: [
      'Calculate mid: Math.floor((left + right) / 2)',
      'If arr[mid] < target, search right half (left = mid + 1)',
      'If arr[mid] > target, search left half (right = mid - 1)'
    ],
    concepts: ['binary search', 'divide and conquer', 'logarithmic complexity']
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'js-linked-list-traverse',
    title: 'Traverse Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description: 'Traverse a linked list and collect all values.',
    instructions: [
      'Given the head of a linked list, return an array of all values',
      'Each node has value and next properties',
      'Traverse until next is null'
    ],
    starterCode: `// Node structure: { value, next }
function traverseLinkedList(head) {
  const result = [];
  // Traverse the linked list
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function traverseLinkedList(head) {
  const result = [];
  let current = head;

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
        description: 'Three nodes'
      },
      {
        input: { value: 42, next: null },
        expected: [42],
        description: 'Single node'
      },
      { input: null, expected: [], description: 'Empty list' }
    ],
    hints: [
      'Use a current pointer starting at head',
      'Loop while current !== null',
      'Move to next node with: current = current.next'
    ],
    concepts: ['linked list', 'pointer traversal', 'iteration']
  },
  {
    id: 'js-stack-operations',
    title: 'Stack Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description: 'Implement basic stack operations using an array.',
    instructions: [
      'Implement push, pop, and peek operations',
      'Stack follows LIFO (Last In, First Out)',
      'Return the final state of the stack after operations'
    ],
    starterCode: `function stackOperations(operations) {
  const stack = [];

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
    solutionCode: `function stackOperations(operations) {
  const stack = [];

  for (const op of operations) {
    if (op.type === 'push') {
      stack.push(op.value);
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
        input: [{ type: 'push', value: 1 }, { type: 'push', value: 2 }, { type: 'push', value: 3 }],
        expected: [1, 2, 3],
        description: 'Push three values'
      },
      {
        input: [{ type: 'push', value: 1 }, { type: 'push', value: 2 }, { type: 'pop' }],
        expected: [1],
        description: 'Push and pop'
      },
      {
        input: [{ type: 'pop' }],
        expected: [],
        description: 'Pop from empty'
      }
    ],
    hints: [
      'Use array.push() for stack push',
      'Use array.pop() for stack pop',
      'Check stack.length > 0 before popping'
    ],
    concepts: ['stack', 'LIFO', 'push', 'pop']
  }
];

export default javascriptExercises;
