import type { Exercise } from './types';

export const javascriptExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'js-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Learn to iterate through an array while skipping every other element using index manipulation. This pattern of stepping through indices by a custom increment is foundational for sampling, downsampling signals, and processing alternating data in real-world applications.',
    explanation: `This exercise teaches you the most basic form of non-sequential array iteration: stepping through indices by a value other than 1. While most loops use i++, many real problems require skipping elements at regular intervals.\n\nThe key insight is that the for loop increment expression (i += 2) controls which elements you visit. By changing the step size, you control the sampling rate over the array. This is the simplest example of strided access.\n\nIn real-world programming, this pattern appears in downsampling audio or image data, processing every other row in a spreadsheet, and implementing alternating schedules. It also forms the basis for more complex stride patterns used in scientific computing and GPU programming.`,
    instructions: [
      'Given an array of numbers, return a new array containing only elements at even indices (0, 2, 4, ...)',
      'Use a for loop with a step of 2',
      'Do not use filter or other array methods',
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
      { input: [], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Initialize i to 0 and increment by 2 each iteration: i += 2',
      'Push arr[i] to the result array in each iteration',
    ],
    concepts: ['for loop', 'index stepping', 'array iteration'],
  },
  {
    id: 'js-reverse-iteration',
    title: 'Reverse Array Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array from the last element to the first using a decrementing loop. Reverse iteration is essential for in-place algorithms, stack-based processing, and situations where you must modify a collection while traversing it without index corruption.',
    explanation: `This exercise teaches you to traverse an array from the last element to the first using a decrementing loop counter. Reverse iteration is one of the most common loop variations you will encounter.\n\nThe key insight is initializing i to arr.length - 1 and decrementing with i-- while the condition i >= 0 holds. Getting the boundary conditions right (starting at length - 1 and including index 0) is a frequent source of off-by-one errors that this drill helps you internalize.\n\nReverse iteration appears in algorithms that modify arrays in-place (removing elements while iterating), stack-based processing, and building strings from least-significant to most-significant digit. It is also the foundation for in-place array reversal used in rotation algorithms.`,
    instructions: [
      'Given an array, return a new array with elements in reverse order',
      'Use a for loop iterating backwards',
      'Do not use the reverse() method',
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
      { input: [], expected: [], description: 'Empty array' },
    ],
    hints: ['Start i at arr.length - 1', 'Loop while i >= 0', 'Decrement i each iteration: i--'],
    concepts: ['reverse iteration', 'for loop', 'array indices'],
  },
  {
    id: 'js-step-iteration',
    title: 'Custom Step Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array with a custom step size to select elements at regular intervals. Variable-step iteration is used for downsampling data, batch processing, and creating strided views over arrays, a concept that extends to NumPy-style array slicing.',
    explanation: `This exercise generalizes the skip-every-other pattern by parameterizing the step size. Instead of hardcoding i += 2, you use i += step where step is a variable.\n\nThe key insight is that for loops with variable increments let you control which indices you visit. The loop still terminates because the index grows by a positive amount each iteration, and the condition i < arr.length ensures bounds safety.\n\nVariable-step iteration is used in downsampling signals, batch processing where you handle every Nth record, and creating strided views over typed arrays. This concept extends directly to NumPy-style slicing syntax and GPU thread stride patterns.`,
    instructions: [
      'Given an array and a step size, return elements at indices that are multiples of the step',
      'For step=3: return elements at indices 0, 3, 6, 9...',
      'Handle edge cases like empty arrays and step larger than array length',
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
      { input: [[], 2], expected: [], description: 'Empty array' },
    ],
    hints: ['Use i += step instead of i++', 'The first element (index 0) is always included'],
    concepts: ['variable step', 'for loop', 'modular iteration'],
  },
  {
    id: 'js-nested-loop-matrix',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a 2D array (matrix) row by row using nested loops and collect all elements into a flat array. Nested iteration over matrices is fundamental to image processing, game boards, spreadsheets, and nearly every grid-based algorithm in interviews.',
    explanation: `This exercise teaches you to traverse a two-dimensional array using nested for loops, visiting every element row by row. This is the standard way to process grid-based data structures.\n\nThe key insight is that the outer loop iterates over rows and the inner loop iterates over columns within each row. You access each element with matrix[row][col], and the total number of iterations equals the product of rows and columns.\n\nNested loop matrix traversal is fundamental to image processing (iterating over pixels), game boards (checking cells), spreadsheet computations, and nearly every grid-based interview problem including island counting, flood fill, and path finding.`,
    instructions: [
      'Given a 2D array (matrix), return a flat array of all elements',
      'Traverse row by row, from left to right',
      'Use nested for loops',
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
    id: 'js-prime-generation',
    title: 'Generate Prime Numbers',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Generate all prime numbers from 2 to 100 using trial division with a square-root optimization. Prime generation teaches nested-loop control flow and early termination, and primes themselves are central to cryptography, hashing, and number theory interview questions.',
    explanation: `This exercise teaches you to generate prime numbers using trial division with a square-root optimization. It combines nested loops, boolean flags, early termination with break, and mathematical reasoning about divisibility.\n\nThe key insight is that you only need to check divisors up to Math.sqrt(num) because if num has a factor larger than its square root, the corresponding co-factor must be smaller than the square root and would have been found already. This optimization reduces the inner loop from O(n) to O(sqrt(n)).\n\nPrime generation is central to cryptography (RSA key generation), hash table sizing, and number theory problems in interviews. The trial division approach here is the gateway to understanding the Sieve of Eratosthenes and other advanced primality tests.`,
    instructions: [
      'Return an array of all prime numbers from 2 to 100',
      'A prime number is only divisible by 1 and itself',
      'Use nested loops to check divisibility',
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
    id: 'js-fibonacci-iterative',
    title: 'Fibonacci Sequence (Iterative)',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Generate the first N Fibonacci numbers using an iterative approach with O(n) time and O(n) space. The Fibonacci sequence appears in dynamic programming warm-ups and teaches the bottom-up iteration pattern fundamental to DP.',
    explanation: `This exercise teaches you to generate the Fibonacci sequence iteratively by building up from base cases. Each new value depends on the two preceding values, making this a natural introduction to bottom-up computation.\n\nThe key insight is that you maintain an array of computed values and each new entry is simply fib[i-1] + fib[i-2]. This bottom-up approach runs in O(n) time and O(n) space, far more efficient than the naive recursive version.\n\nThe iterative Fibonacci pattern is the simplest example of bottom-up dynamic programming. The same strategy of building solutions from smaller subproblems appears in coin change, longest common subsequence, edit distance, and many other DP problems that appear frequently in interviews.`,
    instructions: [
      'Return an array of the first n Fibonacci numbers',
      'Fibonacci: each number is the sum of the two preceding ones',
      'Start with [0, 1, 1, 2, 3, 5, 8, ...]',
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
    id: 'js-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Calculate the nth Fibonacci number using recursion to understand the call-tree explosion of naive recursive solutions. This O(2^n) approach motivates memoization and dynamic programming, making it a gateway to understanding optimization of overlapping subproblems.',
    explanation: `This exercise teaches you to implement Fibonacci using pure recursion to observe the exponential blowup of overlapping subproblems. Calling fib(n-1) and fib(n-2) creates a binary tree of calls where many values are recomputed.\n\nThe key insight is recognizing that naive recursion on Fibonacci has O(2^n) time complexity because fib(n) calls fib(n-1) and fib(n-2), each of which spawns two more calls, and the same subproblems are solved repeatedly. This is the textbook motivation for memoization.\n\nUnderstanding why this is slow is more important than the code itself. This exercise sets up the transition to memoized Fibonacci and bottom-up DP. The same overlapping-subproblem pattern appears in grid paths, partition problems, and many optimization problems.`,
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1',
      'Use recursion: fib(n) = fib(n-1) + fib(n-2)',
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
      { input: 10, expected: 55, description: 'fib(10)' },
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n === 1 returns 1',
      'Recursive case: return fib(n-1) + fib(n-2)',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci'],
  },
  {
    id: 'js-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate n factorial using a simple recursive function with a base case of n <= 1. Factorial demonstrates the simplest recursive pattern and is a building block for permutations, combinations, and probability calculations used throughout combinatorics and interview problems.',
    explanation: `This exercise teaches you the simplest possible recursive pattern: a function that calls itself with a smaller input until it hits a base case. Factorial is the canonical example because n! = n * (n-1)! with the base case 0! = 1! = 1.\n\nThe key insight is the structure of every recursive function: one or more base cases that return immediately, and a recursive case that reduces the problem size. Each call to factorial(n) pushes a frame onto the call stack, and results unwind as frames return.\n\nFactorial itself is used in computing permutations (n!), combinations (n! / (k!(n-k)!)), and probability calculations. More importantly, this simple recursion pattern is the foundation for understanding tree traversals, divide-and-conquer algorithms, and backtracking.`,
    instructions: [
      'Return n! (n factorial)',
      'factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: factorial(0) = factorial(1) = 1',
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
      { input: 10, expected: 3628800, description: '10!' },
    ],
    hints: ['Base case: if n <= 1, return 1', 'Recursive case: n * factorial(n - 1)'],
    concepts: ['recursion', 'factorial', 'base case'],
  },
  {
    id: 'js-sum-recursive',
    title: 'Sum Array (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Sum all elements in an array using recursion instead of loops to practice the divide-and-process pattern. Recursive array processing teaches you to think in terms of first-element-plus-rest, a foundational pattern for functional programming and tree traversal.',
    explanation: `This exercise teaches you to process an array recursively by splitting it into the first element and the rest. This first-plus-rest decomposition is the fundamental recursive pattern for sequences.\n\nThe key insight is the recurrence: sum(arr) = arr[0] + sum(arr.slice(1)), with the base case being sum([]) = 0. Each recursive call processes one element and passes the remaining subarray forward, reducing the problem size by one each time.\n\nThis pattern of head-plus-tail decomposition is foundational in functional programming languages like Haskell and Lisp. It generalizes to recursive map, filter, and reduce operations and appears in tree traversals where you process a node and then recurse on its children.`,
    instructions: [
      'Return the sum of all numbers in the array',
      'Use recursion, not loops',
      'Consider: sum of array = first element + sum of rest',
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
      { input: [], expected: 0, description: 'Empty array' },
    ],
    hints: ['Base case: empty array returns 0', 'Use arr.slice(1) to get the rest of the array'],
    concepts: ['recursion', 'array slicing', 'base case'],
  },

  // ========== TRAVERSAL (DFS/BFS) ==========
  {
    id: 'js-dfs-tree',
    title: 'Depth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement DFS to traverse a binary tree and collect values in pre-order (root, left, right). Pre-order DFS is used for serializing trees, copying tree structures, and evaluating prefix expressions, making it one of the most common interview traversal patterns.',
    explanation: `This exercise teaches you to traverse a binary tree in pre-order (root, left, right) using depth-first recursion. Pre-order visits the current node before exploring children, producing a top-down traversal.\n\nThe key insight is the three-line pattern: push the current node value, recurse on the left child, recurse on the right child. The null check serves as the base case that terminates recursion at leaf boundaries. This pattern naturally follows the call stack depth-first behavior.\n\nPre-order DFS is used for serializing trees (the root comes first, making reconstruction straightforward), creating copies of tree structures, evaluating prefix expressions, and printing directory structures. It is one of the three fundamental tree traversals tested in interviews.`,
    instructions: [
      'Given a binary tree node, return an array of all values in pre-order (root, left, right)',
      'Use recursion to implement DFS',
      'Each node has value, left, and right properties',
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
    id: 'js-dfs-inorder',
    title: 'DFS In-Order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement DFS in-order traversal (left, root, right) for a binary tree. In-order traversal of a BST produces sorted output, making it essential for validation, range queries, and any problem requiring sorted access to tree data.',
    explanation: `This exercise teaches you in-order tree traversal where you visit the left subtree, then the root, then the right subtree. For a binary search tree, in-order traversal produces values in sorted ascending order.\n\nThe key insight is the order of operations: recurse left first, then process the current node, then recurse right. This ensures that all smaller values (in a BST) are visited before the current node, and all larger values come after.\n\nIn-order traversal is essential for BST validation (checking that values appear in sorted order), extracting the kth smallest element, converting a BST to a sorted array, and range queries. It is the most important traversal for BST-specific problems in interviews.`,
    instructions: [
      'Return values in in-order: left subtree, then root, then right subtree',
      'For a BST, this gives values in sorted order',
      'Use recursion',
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
    id: 'js-bfs-tree',
    title: 'Breadth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement BFS to traverse a binary tree level by level using a queue. Level-order traversal is used for shortest-path problems, level-based aggregation, and serialization of trees, and it forms the basis for graph BFS algorithms.',
    explanation: `This exercise teaches you breadth-first traversal of a binary tree using a queue to process nodes level by level. Unlike DFS which goes deep, BFS explores all nodes at the current depth before moving to the next level.\n\nThe key insight is using a FIFO queue: dequeue a node from the front, process it, then enqueue its children at the back. This ensures that all nodes at depth d are processed before any node at depth d+1. The queue acts as a frontier that expands outward.\n\nBFS level-order traversal is used for finding shortest paths in unweighted graphs, level-based aggregation (like finding the widest level), serialization and deserialization of trees, and connecting nodes at the same level. It forms the basis for graph BFS algorithms.`,
    instructions: [
      'Return an array of values in level-order (top to bottom, left to right)',
      'Use a queue (array with push/shift) to track nodes to visit',
      'BFS processes all nodes at current depth before moving deeper',
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
    id: 'js-binary-search',
    title: 'Binary Search',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Implement binary search to find an element in a sorted array by halving the search space each step. This O(log n) algorithm is one of the most important interview patterns, forming the basis for solving search, optimization, and boundary-finding problems.',
    explanation: `This exercise teaches you the classic binary search algorithm that finds a target value in a sorted array by repeatedly halving the search space. It achieves O(log n) time complexity.\n\nThe key insight is maintaining two pointers (left and right) that define the current search range. By comparing the middle element with the target, you can eliminate half the remaining elements in each iteration. The loop condition left <= right ensures you check every possible position.\n\nBinary search is one of the most important algorithms in computer science. Beyond simple lookups, it extends to finding boundaries (first/last occurrence), solving optimization problems (binary search on the answer), and decision problems. It appears in nearly every algorithm interview.`,
    instructions: [
      'Given a sorted array and target, return the index of target or -1 if not found',
      'Binary search divides the search space in half each iteration',
      'Time complexity: O(log n)',
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
      { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: 'Not found' },
    ],
    hints: [
      'Calculate mid: Math.floor((left + right) / 2)',
      'If arr[mid] < target, search right half (left = mid + 1)',
      'If arr[mid] > target, search left half (right = mid - 1)',
    ],
    concepts: ['binary search', 'divide and conquer', 'logarithmic complexity'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'js-linked-list-traverse',
    title: 'Traverse Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Traverse a linked list from head to tail using a current pointer and collect all node values. Pointer-based traversal is the most fundamental linked list operation and underpins insertions, deletions, cycle detection, and list reversal algorithms.',
    explanation: `This exercise teaches you the fundamental pattern of traversing a linked list using a current pointer that advances node by node from head to tail.\n\nThe key insight is the pointer advancement pattern: initialize current to head, loop while current is not null, process the node, then move forward with current = current.next. Unlike array traversal where you use an index, linked list traversal relies on following references from one node to the next.\n\nLinked list traversal is the building block for all linked list operations: searching for a value, computing length, finding the middle node, detecting cycles, reversing the list, and merging sorted lists. Understanding pointer manipulation here prepares you for more complex linked list interview problems.`,
    instructions: [
      'Given the head of a linked list, return an array of all values',
      'Each node has value and next properties',
      'Traverse until next is null',
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
    id: 'js-stack-operations',
    title: 'Stack Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Implement basic push and pop stack operations using an array to understand LIFO (Last In, First Out) behavior. Stacks are used for undo systems, expression parsing, DFS traversal, and call-stack simulation in countless real-world and interview scenarios.',
    explanation: `This exercise teaches you to implement a stack using an array with push and pop operations, demonstrating LIFO (Last In, First Out) behavior where the most recently added element is the first to be removed.\n\nThe key insight is that JavaScript arrays naturally support stack semantics: push() adds to the end and pop() removes from the end, both in O(1) time. The guard check for empty stack before popping prevents errors and is a pattern you will use in every stack-based algorithm.\n\nStacks are used for undo/redo systems, browser history navigation, expression evaluation and parsing (matching parentheses, postfix notation), DFS traversal (the call stack itself is a stack), and backtracking algorithms. Understanding stack behavior is essential for a large class of interview problems.`,
    instructions: [
      'Implement push, pop, and peek operations',
      'Stack follows LIFO (Last In, First Out)',
      'Return the final state of the stack after operations',
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
    id: 'js-generate-range',
    title: 'Generate Range of Numbers',
    category: 'combinatorics',
    difficulty: 'beginner',
    description:
      'Create a reusable function to generate an array of integers from start to end using Array.from. Range generation is a fundamental building block for iteration, test data creation, and combinatorial algorithms that enumerate index spaces.',
    explanation: `This exercise teaches you to generate an array of consecutive integers from start to end using Array.from with a mapping function. This is a reusable utility that serves as a building block for many algorithms.\n\nThe key insight is using Array.from({ length: end - start + 1 }, (_, i) => start + i). The first argument creates an array-like object with the desired length, and the second argument maps each index to the corresponding value. The +1 in the length ensures the range is inclusive.\n\nRange generation is used for creating test data, iterating a specific number of times without a traditional for loop, generating indices for combinatorial algorithms, and initializing arrays with sequential values. Many utility libraries like Lodash include a range function for exactly this purpose.`,
    instructions: [
      'Given a start and end number, return an array of all integers from start to end (inclusive)',
      'Use Array.from() with a length calculation',
      'Handle the case where start > end by returning an empty array',
    ],
    starterCode: `function range(start, end) {
  // Generate array from start to end inclusive
  // YOUR CODE HERE

}`,
    solutionCode: `function range(start, end) {
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
    id: 'js-generate-subsets',
    title: 'Generate All Subsets (Power Set)',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all possible subsets (the power set) of an array using reduce to iteratively double the subset collection. The power set is a core building block for problems involving subset selection, feature toggling, combinatorial search, and backtracking.',
    explanation: `This exercise teaches you to generate the power set (all possible subsets) of an array using reduce to iteratively double the collection of subsets. For n elements, there are 2^n subsets.\n\nThe key insight is the iterative doubling strategy: start with just the empty set [[]], and for each new element, create copies of all existing subsets with the new element appended, then concatenate them back. Each element doubles the number of subsets because each existing subset either includes or excludes the new element.\n\nPower set generation is the foundation for brute-force combinatorial search, feature selection in machine learning, Boolean function enumeration, and any problem requiring exhaustive examination of all possible selections. It is a prerequisite for understanding backtracking optimization.`,
    instructions: [
      'Given an array, return all possible subsets (including empty set)',
      'Use reduce to iteratively build subsets',
      'For each element, add it to all existing subsets',
    ],
    starterCode: `function powerSet(arr) {
  // Generate all subsets using reduce
  // Start with [[]] (containing empty set)
  // YOUR CODE HERE

}`,
    solutionCode: `function powerSet(arr) {
  return arr.reduce(
    (subsets, val) => subsets.concat(subsets.map(set => [...set, val])),
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
    id: 'js-generate-combinations',
    title: 'Generate Combinations (n choose k)',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all combinations of exactly k elements from an array using backtracking. The n-choose-k pattern is essential for scheduling, team formation, feature selection, and brute-force optimization problems in interviews and competitive programming.',
    explanation: `This exercise teaches you to generate all combinations of exactly k elements from an array using backtracking. Unlike permutations, combinations ignore order so [1,2] and [2,1] are the same.\n\nThe key insight is the backtracking pattern: push an element onto the current combination, recurse to explore further choices, then pop the element to backtrack. Using a start index that only moves forward prevents generating duplicate combinations and ensures you only consider each subset of size k once.\n\nThe n-choose-k pattern appears in scheduling (choosing k workers from n), team formation, feature selection, and brute-force optimization where you try all possible selections. It is one of the most common backtracking patterns in interviews alongside permutations and subset generation.`,
    instructions: [
      'Given an array and a size k, return all combinations of exactly k elements',
      'Use backtracking: build combinations by choosing to include or skip each element',
      'Combinations are unordered: [1,2] and [2,1] are the same',
    ],
    starterCode: `function combinations(arr, k) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    // YOUR CODE HERE: iterate from start to arr.length
    // For each element, add to current, recurse, then remove (backtrack)

  }

  backtrack(0, []);
  return result;
}`,
    solutionCode: `function combinations(arr, k) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
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
      'Base case: when current.length equals k',
    ],
    concepts: ['backtracking', 'combinations', 'n choose k', 'recursion'],
  },
  {
    id: 'js-generate-permutations',
    title: 'Generate Permutations',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all permutations of an array where order matters, using recursive build-and-branch. Permutation generation is essential for scheduling, anagram detection, brute-force search, and any problem where arrangement order determines the outcome.',
    explanation: `This exercise teaches you to generate all orderings of an array where arrangement order matters. For n elements, there are n! permutations.\n\nThe key insight is the recursive build-and-branch approach: for each position, try placing each remaining element there, then recursively permute the rest. Removing the chosen element from the remaining array ensures each element appears exactly once in each permutation. The base case is when no elements remain.\n\nPermutation generation is used for brute-force optimization (trying all orderings to find the best), anagram generation, testing all possible schedules, and solving puzzle problems like the traveling salesman by enumeration. Understanding this pattern is essential for backtracking problems in interviews.`,
    instructions: [
      'Given an array, return all possible orderings (permutations)',
      'Build permutations by picking each element and permuting the rest',
      'Order matters: [1,2] and [2,1] are different permutations',
    ],
    starterCode: `function permutations(arr) {
  const result = [];

  function permute(current, remaining) {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }
    // YOUR CODE HERE: for each element in remaining,
    // add it to current and recurse with the rest

  }

  permute([], arr);
  return result;
}`,
    solutionCode: `function permutations(arr) {
  const result = [];

  function permute(current, remaining) {
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

  permute([], arr);
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
    id: 'js-cartesian-product',
    title: 'Cartesian Product of Two Arrays',
    category: 'combinatorics',
    difficulty: 'beginner',
    description:
      'Generate all pairs from two arrays (Cartesian product) using flatMap and map. This building block is used for generating test cases, grid coordinates, combining configuration options, and is foundational for multi-dimensional combinatorial problems.',
    explanation: `This exercise teaches you to generate all possible pairs from two arrays using flatMap and map, producing the Cartesian product where result length equals the product of input lengths.\n\nThe key insight is the flatMap-map combination: flatMap iterates over the first array and for each element, map creates pairs with every element of the second array. flatMap then flattens the resulting array of arrays into a single array of pairs.\n\nCartesian products are used for generating all possible configurations from independent options (like sizes and colors), creating grid coordinates, generating test case combinations, and forming the basis for joins in database queries. This two-array version is the building block for the N-array generalization.`,
    instructions: [
      'Given two arrays, return all possible pairs [a, b] where a is from array1 and b is from array2',
      'Use flatMap for the outer array and map for the inner',
      'Result length should be array1.length * array2.length',
    ],
    starterCode: `function cartesianProduct(arr1, arr2) {
  // Use flatMap and map to generate all pairs
  // YOUR CODE HERE

}`,
    solutionCode: `function cartesianProduct(arr1, arr2) {
  return arr1.flatMap(a => arr2.map(b => [a, b]));
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
      'For each element in arr1, map over all elements in arr2',
      'Each pair is [element from arr1, element from arr2]',
    ],
    concepts: ['cartesian product', 'flatMap', 'map', 'pairs'],
  },
  {
    id: 'js-cartesian-n-arrays',
    title: 'Cartesian Product of N Arrays',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Generate the Cartesian product of any number of arrays using reduce with flatMap. This generalizes pair generation to N-dimensional combinations, useful for configuration enumeration, constraint satisfaction, and generating exhaustive test inputs.',
    explanation: `This exercise generalizes the Cartesian product to any number of input arrays using reduce with flatMap. Each step extends every existing combination with each value from the next array.\n\nThe key insight is the reduce pattern: start with [[]] (one empty combination) and for each new array, use flatMap to extend every existing combination with every value from that array. This iteratively builds tuples of increasing length, one array at a time.\n\nThe N-array Cartesian product is used for enumerating all possible configurations in constraint satisfaction problems, generating exhaustive test inputs from multiple parameter ranges, and combinatorial optimization. It appears in tools like property-based testing frameworks that explore all input combinations.`,
    instructions: [
      'Given an array of arrays, return all possible combinations taking one element from each',
      'Use reduce to iteratively combine arrays',
      'Start with [[]] and build up tuples',
    ],
    starterCode: `function cartesianProductN(arrays) {
  // Use reduce with flatMap to combine arrays iteratively
  // Start with [[]] as the initial accumulator
  // YOUR CODE HERE

}`,
    solutionCode: `function cartesianProductN(arrays) {
  return arrays.reduce(
    (acc, arr) => acc.flatMap(combo => arr.map(val => [...combo, val])),
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
    id: 'js-binomial-coefficient',
    title: 'Calculate Binomial Coefficient',
    category: 'combinatorics',
    difficulty: 'beginner',
    description:
      'Calculate "n choose k" iteratively to count combinations without generating them. The binomial coefficient appears in probability, Pascal\'s triangle, combinatorial proofs, and is essential for estimating search spaces in algorithm analysis.',
    explanation: `This exercise teaches you to calculate n choose k iteratively without generating actual combinations, using incremental multiplication and division to avoid integer overflow.\n\nThe key insight is the multiplicative formula: C(n,k) can be computed by multiplying (n-0)(n-1)...(n-k+1) and dividing by 1*2*...*k incrementally. By alternating multiplication and division at each step, intermediate values stay manageable and the result is always an integer.\n\nThe binomial coefficient appears throughout probability and statistics, Pascal's triangle construction, counting lattice paths, and estimating the size of search spaces in algorithm analysis. Knowing how to compute it efficiently without overflow is a practical skill for combinatorial problems.`,
    instructions: [
      'Calculate C(n, k) = n! / (k! * (n-k)!)',
      'Use iterative multiplication to avoid overflow',
      'Multiply and divide incrementally',
    ],
    starterCode: `function binomial(n, k) {
  // Calculate n choose k iteratively
  // Multiply by (n-i) and divide by (i+1) for i from 0 to k-1
  // YOUR CODE HERE

}`,
    solutionCode: `function binomial(n, k) {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
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
  {
    id: 'js-truth-table',
    title: 'Generate Truth Table',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all possible true/false combinations for n boolean variables, producing a 2^n row truth table. Truth tables are fundamental to logic, digital circuit design, exhaustive testing, and constraint enumeration.',
    explanation: `This exercise teaches you to generate all 2^n combinations of true and false for n variables, which is equivalent to counting in binary from 0 to 2^n - 1.\n\nThere are multiple approaches:\n1. **Iterative with bit manipulation**: Loop from 0 to 2^n - 1. For each number, extract each bit to determine true/false. Bit j of number i is (i >> j) & 1.\n2. **Recursive backtracking**: At each position, branch into true and false, building combinations depth-first.\n3. **Reduce/Cartesian product**: Start with [[]] and for each variable, extend every existing row with both true and false.\n\nThe bit manipulation approach is the most elegant: the binary representation of integers 0 through 2^n-1 naturally encodes every possible combination of n booleans. This is why truth tables have exactly 2^n rows — each variable doubles the number of combinations.\n\nTruth tables are used in propositional logic, digital circuit design (AND/OR/XOR gates), exhaustive test case generation, SAT solvers, and combinatorial optimization.`,
    instructions: [
      'Given n, generate all 2^n rows of boolean combinations',
      'Each row is an array of n booleans',
      'Return rows in order from [false, false, ...] to [true, true, ...]',
      'Use bit manipulation: loop 0 to 2^n - 1, extract bits',
    ],
    starterCode: `function truthTable(n) {
  // Generate all 2^n combinations of true/false
  // Hint: each integer from 0 to 2^n - 1 encodes one row in binary
  // YOUR CODE HERE

}`,
    solutionCode: `function truthTable(n) {
  const rows = [];
  const total = 1 << n; // 2^n using bit shift
  for (let i = 0; i < total; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      // Extract bit j from i: 0 = false, 1 = true
      row.push(((i >> j) & 1) === 1);
    }
    rows.push(row);
  }
  return rows;
}`,
    testCases: [
      {
        input: [1],
        expected: [[false], [true]],
        description: 'n=1: two rows',
      },
      {
        input: [2],
        expected: [
          [false, false],
          [true, false],
          [false, true],
          [true, true],
        ],
        description: 'n=2: four rows',
      },
      {
        input: [3],
        expected: [
          [false, false, false],
          [true, false, false],
          [false, true, false],
          [true, true, false],
          [false, false, true],
          [true, false, true],
          [false, true, true],
          [true, true, true],
        ],
        description: 'n=3: eight rows',
      },
      {
        input: [0],
        expected: [[]],
        description: 'n=0: one empty row',
      },
    ],
    hints: [
      'There are 2^n total combinations — use 1 << n for the count',
      'Each integer from 0 to 2^n - 1 encodes a unique row in its binary bits',
      'Use (i >> j) & 1 to read bit j of integer i',
      'Bit 0 = rightmost column, bit n-1 = leftmost column',
    ],
    concepts: [
      'truth table',
      'bit manipulation',
      'binary enumeration',
      'boolean combinations',
      '2^n',
    ],
  },

  // ========== MEMOIZATION & CACHING ==========
  {
    id: 'js-basic-memoize',
    title: 'Basic Memoization',
    category: 'memoization',
    difficulty: 'beginner',
    description:
      'Create a memoization wrapper for single-argument functions using a Map cache. Memoization eliminates redundant computation by caching results, and is the foundation for top-down dynamic programming, API response caching, and expensive function optimization.',
    explanation: `This exercise teaches you to create a higher-order function that wraps another function with a cache, returning stored results for previously seen arguments instead of recomputing them.\n\nThe key insight is the closure pattern: the returned function captures a Map in its closure, checks if the argument has been seen (cache.has), returns the cached value if so (cache.get), and otherwise computes, stores, and returns the new result. This is the foundation of top-down dynamic programming.\n\nMemoization is used everywhere in software engineering: React.memo and useMemo for UI performance, selector memoization in Redux, API response caching, and converting exponential recursive algorithms into polynomial ones. Understanding this pattern is essential for optimizing repeated computations.`,
    instructions: [
      'Create a function that wraps another function with caching',
      'Use a Map to store computed results',
      'Return cached result if argument was seen before',
    ],
    starterCode: `function memoize(fn) {
  const cache = new Map();

  return function(arg) {
    // Check cache, compute if needed, store result
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function memoize(fn) {
  const cache = new Map();

  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
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
    id: 'js-memoize-multi-arg',
    title: 'Memoize with Multiple Arguments',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Memoize functions with multiple arguments by serializing them into a JSON cache key. Multi-argument memoization extends caching to real-world functions with complex inputs, teaching key-serialization trade-offs used in React.memo, selector libraries, and API caches.',
    explanation: `This exercise extends basic memoization to handle functions with multiple arguments by serializing the argument list into a string key using JSON.stringify.\n\nThe key insight is that Map keys must uniquely identify argument combinations. JSON.stringify(args) converts the arguments array into a deterministic string representation. While this works well for primitives and simple objects, it has limitations with undefined, functions, and circular references that you should be aware of.\n\nMulti-argument memoization is used in React.memo with custom comparison, selector libraries that depend on multiple inputs, and caching expensive API calls with compound parameters. Understanding key serialization trade-offs is important for building production-quality caching systems.`,
    instructions: [
      'Create a memoization wrapper that handles multiple arguments',
      'Use JSON.stringify to create a cache key from arguments',
      'Store and retrieve results based on the serialized key',
    ],
    starterCode: `function memoizeMulti(fn) {
  const cache = new Map();

  return function(...args) {
    // Create key from args, check cache, compute if needed
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function memoizeMulti(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
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
      'Spread args when calling the original function: fn(...args)',
    ],
    concepts: ['memoization', 'JSON.stringify', 'rest parameters', 'caching'],
  },
  {
    id: 'js-memoize-fibonacci',
    title: 'Memoized Fibonacci',
    category: 'memoization',
    difficulty: 'beginner',
    description:
      'Implement Fibonacci with memoization to achieve O(n) time instead of the naive O(2^n) recursive approach. This classic example demonstrates how memoization transforms exponential recursion into linear computation, the core insight behind top-down dynamic programming.',
    explanation: `This exercise teaches you to transform the exponential O(2^n) recursive Fibonacci into an O(n) solution by adding a memo Map that stores already-computed values.\n\nThe key insight is that passing the same memo Map to all recursive calls creates a shared cache. Before computing fib(n), check if it is already in the memo. If so, return immediately in O(1). This eliminates the redundant computation that causes exponential blowup, because each value from 0 to n is computed exactly once.\n\nThis is the canonical example of top-down dynamic programming (memoization). The same technique applies to any recursive algorithm with overlapping subproblems: grid path counting, coin change, edit distance, and longest common subsequence. Recognizing when to add a memo is one of the most valuable algorithm skills.`,
    instructions: [
      'Create a fibonacci function with built-in memoization',
      'Use a Map or object to store computed values',
      'Base cases: fib(0) = 0, fib(1) = 1',
    ],
    starterCode: `function fibonacci(n, memo = new Map([[0, 0], [1, 1]])) {
  // Check memo, compute recursively if needed, store result
  // YOUR CODE HERE

}`,
    solutionCode: `function fibonacci(n, memo = new Map([[0, 0], [1, 1]])) {
  if (memo.has(n)) {
    return memo.get(n);
  }
  const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
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
    id: 'js-debounce',
    title: 'Debounce Function',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Create a debounce function that delays execution until a pause in calls by resetting a timer on each invocation. Debounce is essential for search input handlers, window resize events, and any UI interaction where you want to wait for the user to stop acting.',
    explanation: `This exercise teaches you to create a debounce wrapper that delays function execution until the caller stops invoking it for a specified duration. Each new call resets the timer.\n\nThe key insight is the combination of clearTimeout and setTimeout: every invocation cancels the previously scheduled call and sets a new one. The function only executes when there is a pause in calls longer than the delay. The closure captures the timeoutId variable to enable this cancellation pattern.\n\nDebounce is essential in frontend development for search-as-you-type (waiting until the user stops typing to fire an API call), window resize handlers, auto-save features, and any event that fires rapidly but where you only care about the final state. It is one of the most commonly asked utility function interview questions.`,
    instructions: [
      'Create a wrapper that delays function execution',
      'Clear the previous timeout on each call',
      'Only execute after delay milliseconds of no calls',
    ],
    starterCode: `function debounce(fn, delay) {
  let timeoutId;

  return function(...args) {
    // Clear previous timeout, set new one
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function debounce(fn, delay) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
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
    id: 'js-throttle',
    title: 'Throttle Function',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Create a throttle function that limits how often a function can fire by enforcing a minimum interval between calls. Unlike debounce, throttle guarantees regular execution during rapid events like scrolling, making it ideal for scroll handlers and rate-limited APIs.',
    explanation: `This exercise teaches you to create a throttle wrapper that ensures a function executes at most once per time period, with the first call executing immediately.\n\nThe key insight is the boolean flag pattern: when not in a throttle period, execute the function immediately and set a flag. Use setTimeout to reset the flag after the limit period expires. During the throttle period, all calls are silently dropped. Unlike debounce, throttle guarantees periodic execution during sustained activity.\n\nThrottle is used for scroll event handlers (updating UI at a fixed rate), rate-limiting API calls, game loop input processing, and progress reporting. Understanding the difference between debounce (fires after quiet period) and throttle (fires at regular intervals) is important for choosing the right tool.`,
    instructions: [
      'Create a wrapper that allows at most one call per time period',
      'Track whether we are in a throttle period',
      'Execute immediately, then block until period ends',
    ],
    starterCode: `function throttle(fn, limit) {
  let inThrottle = false;

  return function(...args) {
    // If not in throttle, execute and set throttle
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function throttle(fn, limit) {
  let inThrottle = false;

  return function(...args) {
    if (!inThrottle) {
      fn(...args);
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
    id: 'js-once-function',
    title: 'Once Function',
    category: 'memoization',
    difficulty: 'beginner',
    description:
      'Create a wrapper that ensures a function is called only once, returning the cached first result on subsequent calls. The once pattern is used for initialization routines, singleton creation, and ensuring expensive setup code runs exactly once in module loading.',
    explanation: `This exercise teaches you to create a wrapper that ensures a function is called exactly once, caching and returning the first result on all subsequent calls.\n\nThe key insight is using a boolean flag and a result variable in a closure. On the first call, set the flag to true, compute the result, and store it. On every subsequent call, skip the computation and return the stored result. This is the simplest possible caching pattern.\n\nThe once pattern is used for lazy initialization of expensive resources (database connections, configuration loading), singleton creation, ensuring one-time setup code in module initialization, and idempotent event handlers. Libraries like Lodash include a once utility, and this pattern appears in many interview questions about closures and higher-order functions.`,
    instructions: [
      'Track whether the function has been called',
      'Store the result from the first call',
      'Return the stored result on subsequent calls',
    ],
    starterCode: `function once(fn) {
  let called = false;
  let result;

  return function(...args) {
    // Only call fn once, return cached result after
    // YOUR CODE HERE

  };
}`,
    solutionCode: `function once(fn) {
  let called = false;
  let result;

  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
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
    id: 'js-chunk-array',
    title: 'Chunk Array',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Split an array into chunks of a specified size using Array.from with slice. Chunking is essential for pagination, batch processing, parallel task distribution, and rendering large datasets in manageable groups for UI performance.',
    explanation: `This exercise teaches you to split an array into groups of a specified size using Array.from with a slice-based mapping function. The last chunk may be smaller than the specified size.\n\nThe key insight is computing the number of chunks with Math.ceil(arr.length / size), then using Array.from to generate each chunk via arr.slice(i * size, i * size + size). The ceiling function ensures the partial last chunk is included.\n\nChunking is used for pagination (displaying n items per page), batch processing (sending API requests in groups), parallel task distribution (dividing work among workers), and rendering large datasets in manageable portions for UI performance. It is a common utility function found in Lodash and similar libraries.`,
    instructions: [
      'Given an array and chunk size, return an array of chunks',
      'Last chunk may be smaller than size',
      'Use Array.from with slice',
    ],
    starterCode: `function chunk(arr, size) {
  // Calculate number of chunks, use Array.from with slice
  // YOUR CODE HERE

}`,
    solutionCode: `function chunk(arr, size) {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size)
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
      'Number of chunks = Math.ceil(arr.length / size)',
      'Each chunk starts at index i * size',
      'slice(start, end) extracts from start up to (not including) end',
    ],
    concepts: ['chunk', 'Array.from', 'slice', 'pagination'],
  },
  {
    id: 'js-partition',
    title: 'Partition Array',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Split an array into two groups based on a predicate function, returning [truthy, falsy] arrays. Partition is a common data-processing primitive used for filtering with retention, A/B grouping, and separating valid from invalid data in ETL pipelines.',
    explanation: `This exercise teaches you to split an array into two groups based on a predicate function: elements that satisfy the condition and elements that do not.\n\nThe key insight is using reduce with a two-element array accumulator [[], []]. For each element, the predicate determines which sub-array receives it: index 0 for truthy, index 1 for falsy. This processes the array in a single pass with O(n) time complexity.\n\nPartition is used for separating valid from invalid input in form processing, splitting data into training and test sets, A/B grouping for experiments, and dividing items into categories in ETL pipelines. Unlike filter which discards non-matching elements, partition preserves both groups.`,
    instructions: [
      'Given an array and predicate, return two arrays',
      'First array contains elements where predicate is true',
      'Second array contains elements where predicate is false',
    ],
    starterCode: `function partition(arr, predicate) {
  // Use reduce with two-array accumulator
  // YOUR CODE HERE

}`,
    solutionCode: `function partition(arr, predicate) {
  return arr.reduce(
    (acc, val) => {
      acc[predicate(val) ? 0 : 1].push(val);
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
      'Use conditional index: predicate(val) ? 0 : 1',
      'Push to the appropriate sub-array',
    ],
    concepts: ['partition', 'reduce', 'predicate', 'grouping'],
  },
  {
    id: 'js-zip-arrays',
    title: 'Zip Two Arrays',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Combine two arrays element-by-element into an array of pairs, like a zipper merging two sides. Zip is used for pairing keys with values, correlating parallel data streams, and constructing objects from separate key and value arrays.',
    explanation: `This exercise teaches you to combine two arrays element-by-element into an array of pairs, similar to how a zipper interleaves two sides. The result length equals the shorter array.\n\nThe key insight is using Math.min to determine the output length and Array.from to generate pairs by indexing into both arrays simultaneously. Each pair [arr1[i], arr2[i]] correlates the elements at the same position.\n\nZip is used for pairing keys with values to create objects, correlating parallel data streams (timestamps with measurements), creating coordinate pairs from separate x and y arrays, and implementing dot products. It is a fundamental operation in functional programming found in Python, Haskell, and utility libraries.`,
    instructions: [
      'Given two arrays, return array of [a, b] pairs',
      'Use map with index to pair corresponding elements',
      'Result length equals shorter array length',
    ],
    starterCode: `function zip(arr1, arr2) {
  // Map over shorter array, pair with corresponding element
  // YOUR CODE HERE

}`,
    solutionCode: `function zip(arr1, arr2) {
  const length = Math.min(arr1.length, arr2.length);
  return Array.from({ length }, (_, i) => [arr1[i], arr2[i]]);
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
    id: 'js-unzip-pairs',
    title: 'Unzip Array of Pairs',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Convert an array of pairs back into two separate arrays, the inverse of the zip operation. Unzip is useful for splitting paired data like coordinates into separate x and y arrays, enabling independent processing of correlated data streams.',
    explanation: `This exercise teaches you the inverse of zip: given an array of pairs, produce two separate arrays containing the first and second elements respectively.\n\nThe key insight is using map twice: once to extract all first elements (p[0]) and once to extract all second elements (p[1]). This cleanly separates the two columns of paired data into independent arrays.\n\nUnzip is used for decomposing coordinate pairs into separate x and y arrays for independent processing, splitting key-value pairs back into separate key and value arrays, separating interleaved data channels, and transposing row-oriented data to column-oriented format. It complements zip to form a round-trip transformation.`,
    instructions: [
      'Given array of pairs, return two arrays',
      'First array has first elements, second has second elements',
      'Use map to extract each position',
    ],
    starterCode: `function unzip(pairs) {
  // Return [array of first elements, array of second elements]
  // YOUR CODE HERE

}`,
    solutionCode: `function unzip(pairs) {
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
    id: 'js-group-by',
    title: 'Group By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Group array elements by a key function into an object mapping keys to arrays of matching elements. GroupBy is essential for data aggregation, report generation, database-style GROUP BY operations, and organizing items by category in dashboards.',
    explanation: `This exercise teaches you to organize array elements into groups based on a key function, producing an object where each key maps to an array of matching elements.\n\nThe key insight is using reduce to build a groups object. For each element, compute its key with keyFn(item), initialize the group array if needed using the nullish coalescing assignment (??=), and push the item into its group. This processes everything in a single O(n) pass.\n\nGroupBy is one of the most essential data transformation operations. It mirrors SQL GROUP BY for data aggregation, powers dashboard category views, organizes API responses by type, and is used in report generation. JavaScript now has Object.groupBy() as a native method, but understanding the reduce implementation helps with custom grouping logic.`,
    instructions: [
      'Given an array and key function, group elements by their key',
      'Return an object where keys map to arrays of matching elements',
      'Use reduce with nullish coalescing assignment',
    ],
    starterCode: `function groupBy(arr, keyFn) {
  // Use reduce to build groups object
  // YOUR CODE HERE

}`,
    solutionCode: `function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
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
    id: 'js-frequency-counter',
    title: 'Frequency Counter',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Count occurrences of each element in an array to build a frequency map using reduce. The frequency counter pattern is one of the most versatile interview techniques, used to detect anagrams, find duplicates, validate permutations, and solve histogram problems.',
    explanation: `This exercise teaches you to count how many times each element appears in an array, building a hash map of element-to-count pairs.\n\nThe key insight is the reduce pattern with an object accumulator: for each element, use counts[val] = (counts[val] || 0) + 1 to handle both first occurrences (where counts[val] is undefined, so || 0 initializes to 0) and subsequent occurrences. This builds a complete frequency table in one pass.\n\nThe frequency counter is one of the most versatile interview patterns. It solves anagram detection (same frequency maps), finding duplicates, validating permutations, computing histogram data, majority element problems, and any question requiring element counting. Mastering this pattern gives you a tool that applies to dozens of common problems.`,
    instructions: [
      'Given an array, return an object with counts of each element',
      'Use reduce to build the frequency map',
      'Handle the initial count of 0',
    ],
    starterCode: `function frequencyCount(arr) {
  // Use reduce to count occurrences
  // YOUR CODE HERE

}`,
    solutionCode: `function frequencyCount(arr) {
  return arr.reduce((counts, val) => {
    counts[val] = (counts[val] || 0) + 1;
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
      'counts[val] || 0 handles undefined (first occurrence)',
      'Increment the count by 1 each time',
      'Initial accumulator is empty object {}',
    ],
    concepts: ['frequency counter', 'reduce', 'counting', 'hash map'],
  },
  {
    id: 'js-sliding-window',
    title: 'Sliding Window Generator',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Generate all contiguous windows (subarrays) of size k from an array. The sliding window pattern is fundamental to substring problems, moving averages, network packet analysis, and any problem that examines a fixed-size view moving across sequential data.',
    explanation: `This exercise teaches you to generate all contiguous subarrays of a fixed size k, producing the windows that the sliding window technique operates on.\n\nThe key insight is that there are exactly arr.length - k + 1 windows of size k. Each window starts at index i and is extracted with arr.slice(i, i + k). Using Array.from with this formula cleanly generates all windows.\n\nThe sliding window pattern is fundamental to substring and subarray problems: finding maximum sum of k elements, minimum window containing all characters, longest substring without repeats, and moving average calculations. This exercise gives you the intuition for what a window is before applying optimization techniques that avoid redundant recomputation.`,
    instructions: [
      'Given array and window size k, return all windows',
      'Each window is a subarray of k consecutive elements',
      'Number of windows = array.length - k + 1',
    ],
    starterCode: `function slidingWindows(arr, k) {
  // Generate all windows of size k
  // YOUR CODE HERE

}`,
    solutionCode: `function slidingWindows(arr, k) {
  if (k > arr.length) return [];
  return Array.from(
    { length: arr.length - k + 1 },
    (_, i) => arr.slice(i, i + k)
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
      'Check if k > arr.length and return empty if so',
      'Number of windows = arr.length - k + 1',
      'Each window starts at index i and ends at i + k',
    ],
    concepts: ['sliding window', 'slice', 'Array.from', 'subarray'],
  },
  {
    id: 'js-flatten-deep',
    title: 'Flatten to Depth',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Flatten nested arrays to a specified depth using recursion with depth tracking. Depth-controlled flattening is useful for normalizing hierarchical data, processing JSON responses with variable nesting, and is the logic behind Array.prototype.flat().',
    explanation: `This exercise teaches you to recursively flatten nested arrays to a specified depth, reproducing the behavior of Array.prototype.flat(depth).\n\nThe key insight is the depth-tracking recursion: if depth reaches 0, return the array unchanged. Otherwise, reduce over elements: if an element is itself an array, recursively flatten it with depth - 1; if it is a value, concatenate it directly. Each level of recursion peels off one layer of nesting.\n\nDepth-controlled flattening is used for normalizing irregularly nested JSON API responses, processing hierarchical data structures to a manageable level, and implementing the native flat() method. Understanding how depth tracking controls recursion depth also applies to tree traversals with depth limits and iterative deepening search.`,
    instructions: [
      'Given nested array and depth, flatten to that depth',
      'Depth 1 flattens one level, Infinity flattens completely',
      'Use recursive approach with depth tracking',
    ],
    starterCode: `function flattenDepth(arr, depth = 1) {
  // Recursively flatten up to depth levels
  // YOUR CODE HERE

}`,
    solutionCode: `function flattenDepth(arr, depth = 1) {
  if (depth < 1) return arr;
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(flattenDepth(val, depth - 1));
    }
    return acc.concat(val);
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
    id: 'js-rotate-left',
    title: 'Rotate Array Left',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Rotate an array k positions to the left so elements that fall off reappear on the right. Array rotation is used in circular buffer logic, Caesar ciphers, image manipulation, and is a common interview problem testing modular arithmetic fluency.',
    explanation: `This exercise teaches you to rotate an array k positions to the left by splitting it at the rotation point and swapping the two halves.\n\nThe key insight is using modulo (k % arr.length) to handle cases where k exceeds the array length, then splitting with slice(shift) and slice(0, shift) to get the two portions, and spreading them into a new array in reversed order. This achieves O(n) time with a clean functional approach.\n\nArray rotation appears in circular buffer implementations, Caesar cipher encryption, image rotation algorithms, and interview problems that test modular arithmetic understanding. The three-reverse algorithm is an alternative in-place approach that achieves the same result with O(1) extra space.`,
    instructions: [
      'Given array and k, rotate elements k positions left',
      'Handle k larger than array length with modulo',
      'Use slice to split and recombine',
    ],
    starterCode: `function rotateLeft(arr, k) {
  // Use slice to split at position k, then recombine
  // YOUR CODE HERE

}`,
    solutionCode: `function rotateLeft(arr, k) {
  if (arr.length === 0) return [];
  const shift = k % arr.length;
  return [...arr.slice(shift), ...arr.slice(0, shift)];
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], 2], expected: [3, 4, 5, 1, 2], description: 'Rotate left by 2' },
      { input: [[1, 2, 3], 5], expected: [3, 1, 2], description: 'k > length' },
      { input: [[1, 2, 3], 0], expected: [1, 2, 3], description: 'No rotation' },
    ],
    hints: [
      'k % arr.length handles k > array length',
      'slice(shift) gets elements from shift to end',
      'slice(0, shift) gets elements before shift',
    ],
    concepts: ['rotate', 'slice', 'modulo', 'spread operator'],
  },
  {
    id: 'js-interleave',
    title: 'Interleave Arrays',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Interleave elements from two arrays like shuffling cards: a1, b1, a2, b2 and so on. Interleaving is used for merging audio channels, round-robin scheduling, creating alternating UI layouts, and riffle shuffle simulations.',
    explanation: `This exercise teaches you to merge two arrays by alternating their elements: take one from array1, then one from array2, repeating until both are exhausted.\n\nThe key insight is iterating up to the length of the longer array and conditionally pushing from each array only if the current index is within bounds. This handles arrays of different lengths gracefully, appending remaining elements from the longer array at the end.\n\nInterleaving is used in audio processing (merging stereo channels), round-robin scheduling (distributing tasks alternately between workers), creating alternating UI layouts, and card shuffling simulations. The pattern of iterating to the max length with bounds checking generalizes to merging any number of streams.`,
    instructions: [
      'Given two arrays, interleave their elements',
      'Use flatMap to pair and flatten',
      'Handle arrays of different lengths',
    ],
    starterCode: `function interleave(arr1, arr2) {
  // Interleave elements: a1, b1, a2, b2...
  // YOUR CODE HERE

}`,
    solutionCode: `function interleave(arr1, arr2) {
  const maxLen = Math.max(arr1.length, arr2.length);
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    if (i < arr1.length) result.push(arr1[i]);
    if (i < arr2.length) result.push(arr2[i]);
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
      'Push from arr1 first, then arr2 at each index',
    ],
    concepts: ['interleave', 'loop', 'merge', 'alternating'],
  },

  // ========== SEARCH & SORT UTILITIES ==========
  {
    id: 'js-binary-search-iterative',
    title: 'Binary Search (Iterative)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Implement iterative binary search to find a target in a sorted array with O(log n) time complexity. Binary search is the foundation of efficient searching and is extended to solve optimization, boundary-finding, and decision problems across nearly every algorithm domain.',
    explanation: `This exercise reinforces the iterative binary search pattern: maintain left and right pointers, compute the midpoint, compare with the target, and eliminate half the search space each iteration.\n\nThe key insight is the three-way comparison at the midpoint: if arr[mid] equals the target, return the index; if arr[mid] is less than the target, the answer must be in the right half (left = mid + 1); otherwise it is in the left half (right = mid - 1). The loop condition left <= right ensures every position is checked.\n\nBinary search is the foundation for dozens of algorithmic patterns: finding the first or last occurrence, searching in rotated arrays, finding the square root, binary search on the answer for optimization problems, and bisecting sorted data. Drilling this implementation until it is automatic is one of the highest-value practice exercises.`,
    instructions: [
      'Search for target in sorted array using binary search',
      'Maintain left and right pointers',
      'Narrow search space by half each iteration',
    ],
    starterCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Compare arr[mid] with target and adjust left/right
    // YOUR CODE HERE

  }

  return -1;
}`,
    solutionCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
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
    id: 'js-binary-search-insert',
    title: 'Binary Search Insert Position',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the insertion index where a target should be placed to maintain sorted order using binary search. This variant is the basis for bisect operations, sorted container insertions, and range queries, commonly tested in interviews as "search insert position."',
    explanation: `This exercise teaches you a variant of binary search that finds where a target should be inserted to maintain sorted order, rather than searching for an exact match.\n\nThe key insight is the subtle differences from standard binary search: right starts at arr.length (not arr.length - 1), the condition is left < right (not left <= right), and when arr[mid] >= target, you set right = mid (not mid - 1). These changes make left converge to the leftmost valid insertion point.\n\nThis insertion point search is the basis for bisect_left in Python, lower_bound in C++, and Arrays.binarySearch in Java. It is used for maintaining sorted containers, implementing rank queries, and solving problems like counting elements less than a threshold. It is a commonly tested binary search variant in interviews.`,
    instructions: [
      'Find leftmost position where target could be inserted',
      'Modify binary search to find insertion point',
      'Return left pointer when search completes',
    ],
    starterCode: `function searchInsert(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // Adjust bounds to find insertion point
    // YOUR CODE HERE

  }

  return left;
}`,
    solutionCode: `function searchInsert(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
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
    id: 'js-merge-sorted',
    title: 'Merge Two Sorted Arrays',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Merge two pre-sorted arrays into one sorted array using the two-pointer technique. This is the core merge operation in merge sort and is widely used for combining sorted streams, database merge joins, and external sorting of large datasets.',
    explanation: `This exercise teaches you to merge two already-sorted arrays into one sorted array using the two-pointer technique. This is the merge step of merge sort.\n\nThe key insight is maintaining two pointers, one for each array. At each step, compare the elements at both pointers and take the smaller one, advancing that pointer. When one array is exhausted, append all remaining elements from the other. This produces a sorted result in O(n + m) time.\n\nMerging sorted arrays is the core operation in merge sort, making this one of the most important subroutines in computer science. It also appears in external sorting of large files, database merge joins, merging sorted streams in real-time systems, and the merge step of merge-based interview problems.`,
    instructions: [
      'Given two sorted arrays, merge into one sorted array',
      'Use two pointers, one for each array',
      'Compare elements and take the smaller one',
    ],
    starterCode: `function mergeSorted(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    // Compare and push smaller element
    // YOUR CODE HERE

  }

  // Add remaining elements
  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
}`,
    solutionCode: `function mergeSorted(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }

  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
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
    id: 'js-queue-operations',
    title: 'Queue Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Implement basic queue operations (enqueue to back, dequeue from front) to understand FIFO ordering. Queues are fundamental to BFS traversal, task scheduling, message passing systems, printer spooling, and event loop processing in JavaScript.',
    explanation: `This exercise teaches you to implement a queue using an array with enqueue (push to back) and dequeue (shift from front) operations, demonstrating FIFO (First In, First Out) behavior.\n\nThe key insight is that push() adds to the end and shift() removes from the front, preserving insertion order. The guard check for empty queue before dequeuing (returning null) prevents errors. Note that array shift() is O(n) in JavaScript; production queues use linked lists or circular buffers for O(1) dequeue.\n\nQueues are fundamental to BFS traversal, task scheduling (job queues, print spooling), message passing systems (message queues), event loop processing in JavaScript, and producer-consumer patterns. Understanding FIFO behavior is essential for any algorithm that processes elements in arrival order.`,
    instructions: [
      'Process a list of queue operations',
      'enqueue adds to the back (push)',
      'dequeue removes from front (shift)',
    ],
    starterCode: `function processQueue(operations) {
  const queue = [];
  const results = [];

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
    solutionCode: `function processQueue(operations) {
  const queue = [];
  const results = [];

  for (const op of operations) {
    if (op.type === 'enqueue') {
      queue.push(op.value);
    } else if (op.type === 'dequeue') {
      results.push(queue.length > 0 ? queue.shift() : null);
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
    id: 'js-min-heap-insert',
    title: 'Min Heap Insert',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Implement insert with bubble-up for a min heap stored as an array, where parent <= children. Min heaps power priority queues used in Dijkstra's algorithm, task scheduling, event simulation, and finding top-K elements efficiently in O(log n) per operation.",
    explanation: `This exercise teaches you to insert into a min heap stored as an array, using the bubble-up operation to maintain the heap property that every parent is less than or equal to its children.\n\nThe key insight is the bubble-up process: add the new element at the end of the array, then repeatedly compare it with its parent at index Math.floor((i-1)/2). If the child is smaller, swap them and continue upward. Stop when the parent is smaller or you reach the root. This maintains the heap invariant in O(log n) time.\n\nMin heaps power priority queues used in Dijkstra's shortest path algorithm, task scheduling by priority, event simulation (processing the earliest event first), finding the top-K elements efficiently, and implementing merge-k-sorted-lists. Heaps are one of the most important data structures for interview preparation.`,
    instructions: [
      'Insert value into min heap (array representation)',
      'Add to end, then "bubble up" to maintain heap property',
      'Parent of index i is at Math.floor((i-1)/2)',
    ],
    starterCode: `function heapInsert(heap, value) {
  heap.push(value);
  let i = heap.length - 1;

  // Bubble up while parent is greater
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    // YOUR CODE HERE: compare and swap if needed

  }

  return heap;
}`,
    solutionCode: `function heapInsert(heap, value) {
  heap.push(value);
  let i = heap.length - 1;

  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
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
    id: 'js-graph-adjacency',
    title: 'Build Adjacency List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Convert an edge list to an adjacency list representation, the standard graph format for BFS, DFS, and shortest-path algorithms. Understanding adjacency lists is essential because nearly every graph algorithm begins with building this representation.',
    explanation: `This exercise teaches you to convert an edge list into an adjacency list representation, the standard format for graph algorithms. For undirected graphs, each edge creates entries in both directions.\n\nThe key insight is initializing each node neighbor array lazily with the nullish coalescing assignment (graph[from] ??= []) and pushing the destination. For undirected graphs, you also add the reverse edge. This builds the complete adjacency structure in O(E) time where E is the number of edges.\n\nAdjacency lists are the starting point for virtually every graph algorithm: BFS, DFS, Dijkstra, topological sort, cycle detection, and connected components. Understanding how to build this representation from raw edge data is a prerequisite for solving graph problems in interviews.`,
    instructions: [
      'Given edges as [from, to] pairs, build adjacency list',
      'Handle undirected graphs by adding both directions',
      'Use object with arrays as values',
    ],
    starterCode: `function buildAdjacencyList(edges, directed = false) {
  const graph = {};

  for (const [from, to] of edges) {
    // Add edge from -> to
    // If undirected, also add to -> from
    // YOUR CODE HERE

  }

  return graph;
}`,
    solutionCode: `function buildAdjacencyList(edges, directed = false) {
  const graph = {};

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
    id: 'js-bfs-traversal',
    title: 'BFS Graph Traversal',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Traverse a graph level by level using BFS with a queue and visited set, returning nodes in BFS order. Graph BFS finds shortest paths in unweighted graphs and is used in social network analysis, web crawling, and puzzle solving.',
    explanation: `This exercise teaches you to traverse a graph using BFS with a queue and visited set, processing nodes in order of their distance from the start node.\n\nThe key insight is the BFS loop: dequeue a node, add it to results, then enqueue all unvisited neighbors (marking them visited immediately to prevent re-enqueuing). The visited set ensures each node is processed exactly once even in graphs with cycles. Adding to visited when enqueuing (not when dequeuing) is critical for correctness.\n\nGraph BFS finds shortest paths in unweighted graphs, detects connected components, computes distances from a source, and solves problems like word ladder and rotten oranges. It is also used in social network analysis (degrees of separation) and web crawling.`,
    instructions: [
      'Given adjacency list and start node, return BFS traversal order',
      'Use a queue and visited set',
      'Process nodes level by level',
    ],
    starterCode: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    // Add node to result, then add unvisited neighbors to queue
    // YOUR CODE HERE

  }

  return result;
}`,
    solutionCode: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
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
    id: 'js-dfs-traversal',
    title: 'DFS Graph Traversal',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Traverse a graph depth-first using recursion, exploring as deep as possible before backtracking. Graph DFS is used for topological sorting, cycle detection, connected component discovery, and maze solving, forming the backbone of many graph algorithms.',
    explanation: `This exercise teaches you to traverse a graph depth-first using recursion, exploring as far as possible along each branch before backtracking.\n\nThe key insight is the recursive DFS pattern: mark the current node as visited, process it, then recursively explore each unvisited neighbor. The visited set prevents infinite loops in cyclic graphs. The recursion naturally uses the call stack to track the exploration path and backtrack when a dead end is reached.\n\nGraph DFS is used for topological sorting (task scheduling), cycle detection, finding connected components and strongly connected components, maze solving, and computing articulation points and bridges. DFS forms the backbone of many advanced graph algorithms and is tested frequently in interviews.`,
    instructions: [
      'Given adjacency list and start node, return DFS traversal order',
      'Use recursion with a visited set',
      'Explore each branch fully before backtracking',
    ],
    starterCode: `function dfs(graph, start) {
  const visited = new Set();
  const result = [];

  function explore(node) {
    if (visited.has(node)) return;
    // Mark visited, add to result, explore neighbors
    // YOUR CODE HERE

  }

  explore(start);
  return result;
}`,
    solutionCode: `function dfs(graph, start) {
  const visited = new Set();
  const result = [];

  function explore(node) {
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
    id: 'js-trie-insert',
    title: 'Trie Insert',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement the insert operation for a Trie (prefix tree) by creating nodes character by character. Tries power autocomplete systems, spell checkers, IP routing tables, and prefix-based search, making them a frequently tested advanced data structure.',
    explanation: `This exercise teaches you to insert a word into a trie (prefix tree) by creating nodes character by character and marking the end of the word with a terminal flag.\n\nThe key insight is the traversal-creation pattern: for each character, check if a child node exists (node[char]), create one if not (node[char] ??= {}), then move the pointer down (node = node[char]). After processing all characters, mark the terminal node with node.$ = true. Each node is a plain object where keys are characters.\n\nTries power autocomplete systems, spell checkers, IP routing tables (longest prefix match), word game solvers, and prefix-based search engines. They provide O(L) lookup time where L is the word length, regardless of how many words are stored. Tries are a frequently tested advanced data structure in interviews.`,
    instructions: [
      'Insert a word into a trie structure',
      'Each node is an object with character keys',
      'Mark end of word with a special key ($)',
    ],
    starterCode: `function trieInsert(root, word) {
  let node = root;

  for (const char of word) {
    // Create node if needed, move to child
    // YOUR CODE HERE

  }

  node.$ = true; // Mark end of word
  return root;
}`,
    solutionCode: `function trieInsert(root, word) {
  let node = root;

  for (const char of word) {
    node[char] ??= {};
    node = node[char];
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
    id: 'js-union-find',
    title: 'Union-Find (Disjoint Set)',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Implement Union-Find with path compression for efficient connected component tracking. Union-Find is used in Kruskal's MST algorithm, network connectivity, image segmentation, and cycle detection, operating in nearly O(1) amortized time per operation.",
    explanation: `This exercise teaches you to implement Union-Find (Disjoint Set) with path compression for near-constant-time connected component tracking.\n\nThe key insight is path compression in the find operation: when finding the root of a node, recursively set each node parent directly to the root (parent[x] = find(parent[x])). This flattens the tree so future lookups are nearly O(1). Union simply links the root of one set to the root of another.\n\nUnion-Find is used in Kruskal minimum spanning tree algorithm, dynamic connectivity queries, image segmentation (connected pixel regions), cycle detection in undirected graphs, and social network grouping. With path compression and union by rank, operations are nearly O(1) amortized, making it one of the most efficient data structures for equivalence class tracking.`,
    instructions: [
      'Implement find (with path compression) and union operations',
      'parent[i] = i means i is a root',
      'Path compression: make nodes point directly to root',
    ],
    starterCode: `function createUnionFind(n) {
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    // Find root with path compression
    // YOUR CODE HERE

  }

  function union(x, y) {
    // Unite sets containing x and y
    parent[find(x)] = find(y);
  }

  return { find, union, parent };
}`,
    solutionCode: `function createUnionFind(n) {
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // Path compression
    }
    return parent[x];
  }

  function union(x, y) {
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
    id: 'js-compose-functions',
    title: 'Compose Functions',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Create a function composer that chains functions right-to-left: compose(f, g, h)(x) = f(g(h(x))). Function composition is a cornerstone of functional programming, used in middleware pipelines, Redux, and building complex transformations from simple functions.',
    explanation: `This exercise teaches you to create a function composer that chains multiple functions right-to-left, so compose(f, g, h)(x) computes f(g(h(x))).\n\nThe key insight is using reduceRight with the input value as the initial accumulator. Each step applies the next function (moving right to left) to the accumulated result. This creates a pipeline where data flows through transformations in reverse order of how they are listed.\n\nFunction composition is a cornerstone of functional programming. It appears in Redux middleware chains, Express.js middleware, functional utilities in Ramda and lodash/fp, and mathematical function composition. Understanding compose prepares you for building complex transformations from simple, testable, single-purpose functions.`,
    instructions: [
      'Create a compose function that takes multiple functions',
      'Return a function that applies them right-to-left',
      'Use reduceRight to chain the functions',
    ],
    starterCode: `function compose(...fns) {
  // Return a function that applies fns right-to-left
  // YOUR CODE HERE

}`,
    solutionCode: `function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
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
    id: 'js-pipe-functions',
    title: 'Pipe Functions',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Create a pipe function that chains functions left-to-right: pipe(f, g, h)(x) = h(g(f(x))). Pipe provides a more intuitive reading order than compose and is used in Unix pipelines, RxJS operators, and functional data transformation chains.',
    explanation: `This exercise teaches you to create a pipe function that chains functions left-to-right, so pipe(f, g, h)(x) computes h(g(f(x))). Pipe is the reverse of compose and matches natural reading order.\n\nThe key insight is using reduce (not reduceRight) with the input value as the initial accumulator. Each step applies the next function in order to the accumulated result, creating a data pipeline that reads top-to-bottom or left-to-right.\n\nPipe provides a more intuitive reading order than compose and is the preferred pattern in many codebases. It appears in Unix shell pipelines, RxJS observable operators, functional transformation chains, and data processing pipelines. Understanding pipe enables you to build readable, declarative data transformation code.`,
    instructions: [
      'Create a pipe function that takes multiple functions',
      'Return a function that applies them left-to-right',
      'Use reduce to chain the functions',
    ],
    starterCode: `function pipe(...fns) {
  // Return a function that applies fns left-to-right
  // YOUR CODE HERE

}`,
    solutionCode: `function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
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
    id: 'js-curry-function',
    title: 'Curry Function',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Create a curry function that converts f(a, b, c) into f(a)(b)(c) using argument accumulation. Currying enables partial application, creates reusable specialized functions, and is a core technique in functional programming and configuration patterns.',
    explanation: `This exercise teaches you to implement currying, which transforms a function f(a, b, c) into a chain of single-argument functions f(a)(b)(c) that can also be called with multiple arguments at once.\n\nThe key insight is comparing the number of arguments received so far against fn.length (the function declared parameter count). If enough arguments have been collected, call the original function. Otherwise, return a new function that collects more arguments and recurses. The spread operator accumulates arguments across calls.\n\nCurrying enables partial application, allowing you to create specialized versions of general functions. It is a core technique in functional programming, used in configuration patterns, event handler factories, and libraries like Ramda. It is also a popular advanced JavaScript interview question testing closures and higher-order functions.`,
    instructions: [
      'Curry transforms f(a, b, c) into f(a)(b)(c)',
      'Check if enough arguments have been collected',
      'If not, return a function that collects more',
    ],
    starterCode: `function curry(fn) {
  // Return curried version of fn
  // YOUR CODE HERE

}`,
    solutionCode: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
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
    id: 'js-unique-by',
    title: 'Unique By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Remove duplicates from an array based on a key function, keeping the first occurrence of each key. Deduplication by key is essential for cleaning API responses, ensuring unique records by ID, and normalizing data before display or storage.',
    explanation: `This exercise teaches you to remove duplicates from an array based on a custom key function, keeping only the first occurrence of each unique key value.\n\nThe key insight is using a Set to track seen keys and filter to keep only elements whose key has not been seen before. For each element, compute its key with keyFn(item), check if the Set already has it, and if not, add the key and keep the element. This runs in O(n) time.\n\nDeduplication by key is essential for cleaning API responses that may contain duplicate records, ensuring unique items by ID in a list, normalizing data before display or storage, and removing duplicates from joined data sets. The key function approach generalizes simple deduplication to work with any comparison criterion.`,
    instructions: [
      'Given array and key function, return unique elements by key',
      'Keep the first element for each unique key',
      'Use a Set to track seen keys',
    ],
    starterCode: `function uniqueBy(arr, keyFn) {
  // Return array with unique elements by key
  // YOUR CODE HERE

}`,
    solutionCode: `function uniqueBy(arr, keyFn) {
  const seen = new Set();
  return arr.filter(item => {
    const key = keyFn(item);
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
    id: 'js-difference',
    title: 'Array Difference',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Find elements in the first array that are not in the second array using a Set for O(n) lookup. Array difference is a fundamental set operation used for computing changes between snapshots, diffing state, and finding missing or removed items.',
    explanation: `This exercise teaches you to find elements in the first array that are not present in the second array, implementing the set difference operation with O(n) efficiency.\n\nThe key insight is converting the second array to a Set for O(1) membership testing, then filtering the first array to keep only elements not in that Set. This achieves O(n + m) total time instead of the O(n * m) that nested loops would require.\n\nArray difference is used for computing changes between state snapshots (what was removed?), finding missing items, implementing access control (allowed minus revoked), and diffing lists in version control. It is one of the three fundamental set operations (along with intersection and union) that appear throughout data processing.`,
    instructions: [
      'Return elements from arr1 not present in arr2',
      'Use Set for O(1) lookup',
      'Filter arr1 checking membership in arr2',
    ],
    starterCode: `function difference(arr1, arr2) {
  // Return elements in arr1 but not in arr2
  // YOUR CODE HERE

}`,
    solutionCode: `function difference(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(x => !set2.has(x));
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
    id: 'js-intersection',
    title: 'Array Intersection',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Find elements that exist in both arrays using a Set for efficient membership testing. Array intersection is used for finding common tags, mutual friends, shared permissions, and any problem requiring identification of overlapping elements between collections.',
    explanation: `This exercise teaches you to find elements that exist in both arrays, implementing the set intersection operation with O(n) efficiency using a Set.\n\nThe key insight is converting one array to a Set for O(1) lookups, then filtering the other array to keep only elements present in the Set. This achieves O(n + m) total time. Choosing which array to convert to a Set (ideally the larger one) can optimize memory usage.\n\nArray intersection is used for finding common tags between items, mutual friends in social networks, shared permissions between roles, and identifying overlapping elements in data analysis. Along with difference and union, intersection is a fundamental set operation that forms the basis of many data processing tasks.`,
    instructions: [
      'Return elements present in both arr1 and arr2',
      'Use Set for efficient lookup',
      'Filter arr1 for items also in arr2',
    ],
    starterCode: `function intersection(arr1, arr2) {
  // Return elements in both arrays
  // YOUR CODE HERE

}`,
    solutionCode: `function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(x => set2.has(x));
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
    id: 'js-take-while',
    title: 'Take While',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Take elements from the start of an array while a predicate holds true, stopping at the first false. TakeWhile is a lazy evaluation pattern from functional programming, useful for processing sorted streams, reading valid prefixes, and early termination.',
    explanation: `This exercise teaches you to collect elements from the start of an array while a predicate holds true, stopping at the first element that fails the condition.\n\nThe key insight is using findIndex to locate the first element where the predicate returns false, then slicing from the beginning up to that index. If all elements satisfy the predicate (findIndex returns -1), return the entire array. This processes the array lazily in concept, though the implementation scans to find the boundary.\n\nTakeWhile is a fundamental operation in functional programming and stream processing. It is used for reading valid prefixes from sorted or ordered data, processing records until a sentinel value, implementing early termination in data pipelines, and extracting leading runs of matching elements. It complements dropWhile which skips the matching prefix.`,
    instructions: [
      'Return elements from start while predicate returns true',
      'Stop as soon as predicate returns false',
      'Use a loop or findIndex with slice',
    ],
    starterCode: `function takeWhile(arr, predicate) {
  // Take elements while predicate is true
  // YOUR CODE HERE

}`,
    solutionCode: `function takeWhile(arr, predicate) {
  const idx = arr.findIndex(x => !predicate(x));
  return idx === -1 ? arr : arr.slice(0, idx);
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
    id: 'js-drop-while',
    title: 'Drop While',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Drop elements from the start of an array while a predicate holds true and return the remaining elements. DropWhile complements takeWhile and is used for skipping headers, ignoring leading whitespace, and finding where interesting data begins.',
    instructions: [
      'Skip elements while predicate returns true',
      'Return remaining elements after first false',
      'Use findIndex to find where to start keeping',
    ],
    starterCode: `function dropWhile(arr, predicate) {
  // Drop elements while predicate is true
  // YOUR CODE HERE

}`,
    solutionCode: `function dropWhile(arr, predicate) {
  const idx = arr.findIndex(x => !predicate(x));
  return idx === -1 ? [] : arr.slice(idx);
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
    id: 'js-sample-array',
    title: 'Random Sample',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Get n random elements from an array without replacement using a partial Fisher-Yates shuffle. Random sampling is used for A/B testing, Monte Carlo simulations, randomized algorithms, and selecting representative subsets from large datasets.',
    instructions: [
      'Return n random elements from the array',
      'Each element should only appear once (no replacement)',
      'Shuffle and take first n, or use Fisher-Yates partial',
    ],
    starterCode: `function sample(arr, n) {
  // Return n random elements
  // YOUR CODE HERE

}`,
    solutionCode: `function sample(arr, n) {
  const copy = [...arr];
  const result = [];
  for (let i = 0; i < Math.min(n, copy.length); i++) {
    const idx = Math.floor(Math.random() * (copy.length - i)) + i;
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
    id: 'js-compact',
    title: 'Compact Array',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Remove all falsy values (false, 0, empty string, null, undefined, NaN) from an array using filter(Boolean). Compact is a data-cleaning primitive used for stripping empty form fields, cleaning parsed data, and preparing arrays for display or computation.',
    instructions: [
      'Filter out all falsy values from array',
      'Keep only truthy values',
      'Use Boolean as filter predicate',
    ],
    starterCode: `function compact(arr) {
  // Remove all falsy values
  // YOUR CODE HERE

}`,
    solutionCode: `function compact(arr) {
  return arr.filter(Boolean);
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
    id: 'js-count-by',
    title: 'Count By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Count elements by the result of a key function, returning an object mapping keys to counts. CountBy extends frequency counting with a custom key extractor, useful for histograms, category tallies, and analytics aggregation pipelines.',
    instructions: [
      'Given array and key function, count elements by key',
      'Return object mapping keys to counts',
      'Similar to frequencyCount but with custom key',
    ],
    starterCode: `function countBy(arr, keyFn) {
  // Count elements by key
  // YOUR CODE HERE

}`,
    solutionCode: `function countBy(arr, keyFn) {
  return arr.reduce((counts, item) => {
    const key = keyFn(item);
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
    id: 'js-sum-by',
    title: 'Sum By Key',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Sum values extracted by a function from array elements using reduce. SumBy is essential for aggregating totals from object arrays, computing revenue from order items, and building dashboard summaries from structured data collections.',
    instructions: [
      'Given array and value function, sum the extracted values',
      'Apply valueFn to each element, sum the results',
      'Use reduce with valueFn',
    ],
    starterCode: `function sumBy(arr, valueFn) {
  // Sum values extracted by valueFn
  // YOUR CODE HERE

}`,
    solutionCode: `function sumBy(arr, valueFn) {
  return arr.reduce((sum, item) => sum + valueFn(item), 0);
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
    id: 'js-max-by',
    title: 'Max By Key',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Find the element with the maximum value for a given key function, returning the element itself. MaxBy is used for finding the highest-scoring player, most expensive item, or latest timestamp in a collection without manual reduce boilerplate.',
    instructions: [
      'Given array and key function, find element with max key value',
      'Return the element itself, not the key value',
      'Use reduce to track max',
    ],
    starterCode: `function maxBy(arr, keyFn) {
  // Find element with maximum key value
  // YOUR CODE HERE

}`,
    solutionCode: `function maxBy(arr, keyFn) {
  if (arr.length === 0) return undefined;
  return arr.reduce((max, item) =>
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
    id: 'js-trie-search',
    title: 'Trie Search',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement search for a Trie to check if a complete word exists by traversing character-by-character and verifying the terminal marker. Trie search is the read operation that powers dictionary lookups, spell-check validation, and word game solvers.',
    instructions: [
      'Search for a word in the trie',
      'Traverse character by character',
      'Return true only if word ends at a terminal node ($)',
    ],
    starterCode: `function trieSearch(root, word) {
  let node = root;

  for (const char of word) {
    // Navigate to child, return false if not exists
    // YOUR CODE HERE

  }

  return !!node.$;
}`,
    solutionCode: `function trieSearch(root, word) {
  let node = root;

  for (const char of word) {
    if (!node[char]) return false;
    node = node[char];
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
    id: 'js-topological-sort',
    title: 'Topological Sort',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Sort nodes in a directed acyclic graph so that every edge u->v has u before v, using Kahn's BFS algorithm. Topological sort is essential for dependency resolution in build systems, course scheduling, task ordering, and package managers.",
    instructions: [
      'Given adjacency list of DAG, return topological order',
      "Use Kahn's algorithm with in-degree counting",
      'Start with nodes having in-degree 0',
    ],
    starterCode: `function topologicalSort(graph) {
  const inDegree = {};
  const result = [];

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
    solutionCode: `function topologicalSort(graph) {
  const inDegree = {};
  const result = [];

  for (const node in graph) {
    inDegree[node] ??= 0;
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  const queue = Object.keys(inDegree).filter(n => inDegree[n] === 0);

  while (queue.length) {
    const node = queue.shift();
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
    id: 'js-two-pointer-palindrome',
    title: 'Two-Pointer Palindrome Check',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Check if an array is a palindrome using two pointers converging from opposite ends in O(n) time. The two-pointer converging pattern is a versatile interview technique also used for two-sum on sorted arrays, container with most water, and string validation.',
    instructions: [
      'Given an array, return true if it is a palindrome (reads the same forwards and backwards)',
      'Use two pointers: one starting at the beginning, one at the end',
      'Move them toward each other, comparing elements at each step',
      'Return false as soon as a mismatch is found',
    ],
    starterCode: `function isPalindrome(arr) {
  // Use two pointers from opposite ends
  // YOUR CODE HERE
}`,
    solutionCode: `function isPalindrome(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    if (arr[left] !== arr[right]) return false;
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
    id: 'js-two-pointer-remove-dupes',
    title: 'Remove Duplicates from Sorted Array',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Remove duplicates from a sorted array in-place using slow/fast same-direction pointers. This technique modifies the array with O(1) extra space and is a classic interview pattern for in-place filtering, compaction, and partitioning problems.',
    instructions: [
      'Given a sorted array, remove duplicates in-place so each element appears only once',
      'Use a slow pointer to track the write position and a fast pointer to scan ahead',
      'Return the new length (number of unique elements)',
      'The array should be modified in-place with unique elements at the front',
    ],
    starterCode: `function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  // Use two same-direction pointers: slow (write) and fast (read)
  // YOUR CODE HERE
}`,
    solutionCode: `function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
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
    id: 'js-sliding-window-max-sum',
    title: 'Maximum Sum of K Consecutive Elements',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the maximum sum of k consecutive elements using a fixed-size sliding window that adds and removes one element per step. This O(n) technique avoids recomputing sums from scratch and is the introductory pattern for all sliding window problems.',
    instructions: [
      'Given an array of numbers and an integer k, find the maximum sum of any k consecutive elements',
      'Use a sliding window: compute the first window sum, then slide by subtracting the leaving element and adding the entering element',
      'Return the maximum sum found',
    ],
    starterCode: `function maxSumOfK(arr, k) {
  if (arr.length < k) return null;
  // Compute the first window, then slide
  // YOUR CODE HERE
}`,
    solutionCode: `function maxSumOfK(arr, k) {
  if (arr.length < k) return null;
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
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
    id: 'js-sliding-window-min-subarray',
    title: 'Minimum Length Subarray with Sum >= Target',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the shortest contiguous subarray with sum >= target using a variable-size sliding window. The expand-and-shrink window pattern runs in O(n) and is used for minimum-length substring problems, bandwidth allocation, and resource optimization.',
    instructions: [
      'Given an array of positive integers and a target, find the minimal length of a contiguous subarray with sum >= target',
      'Use a variable-size sliding window: expand the right end, and shrink from the left when sum >= target',
      'Return 0 if no such subarray exists',
    ],
    starterCode: `function minSubarrayLen(target, arr) {
  // Variable-size sliding window
  // YOUR CODE HERE
}`,
    solutionCode: `function minSubarrayLen(target, arr) {
  let minLen = Infinity;
  let sum = 0;
  let left = 0;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= arr[left];
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
    id: 'js-prefix-sum',
    title: 'Build Prefix Sum Array',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Build a prefix sum array where each element is the cumulative sum up to that index, enabling O(1) range sum queries. Prefix sums are a preprocessing technique used in subarray sum problems, image processing (summed area tables), and competitive programming.',
    instructions: [
      'Given an array of numbers, return a new array where each element is the cumulative sum up to that index',
      'prefixSum[0] = arr[0], prefixSum[1] = arr[0] + arr[1], etc.',
      'This pattern enables O(1) range sum queries',
    ],
    starterCode: `function prefixSum(arr) {
  // Build prefix sum array
  // YOUR CODE HERE
}`,
    solutionCode: `function prefixSum(arr) {
  if (arr.length === 0) return [];
  const prefix = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    prefix.push(prefix[i - 1] + arr[i]);
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
    id: 'js-prefix-product',
    title: 'Product of Array Except Self',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Build an array where each element is the product of all other elements without using division, via left-right prefix products. This two-pass O(n) technique is a popular interview problem that tests understanding of prefix/suffix decomposition.',
    instructions: [
      'Given an array of numbers, return a new array where result[i] is the product of all elements except arr[i]',
      'Do NOT use division',
      'Use two passes: build a left-product prefix, then multiply by a right-product suffix',
    ],
    starterCode: `function productExceptSelf(arr) {
  // Two-pass: left products then right products
  // YOUR CODE HERE
}`,
    solutionCode: `function productExceptSelf(arr) {
  const n = arr.length;
  const result = new Array(n).fill(1);
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= arr[i];
  }
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= arr[i];
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
    id: 'js-difference-array',
    title: 'Difference Array Range Updates',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Apply multiple range updates to an array efficiently using the difference array technique in O(n + q) time. Difference arrays turn range updates into point updates, enabling batch processing of overlapping modifications used in scheduling and resource allocation.',
    instructions: [
      'Given an array length n (initialized to zeros) and a list of updates [start, end, value], apply all updates and return the final array',
      'Each update adds value to all elements from index start to end (inclusive)',
      'Use a difference array: for each update, add value at start and subtract at end+1, then compute prefix sums',
    ],
    starterCode: `function applyRangeUpdates(n, updates) {
  // Use difference array technique
  // YOUR CODE HERE
}`,
    solutionCode: `function applyRangeUpdates(n, updates) {
  const diff = new Array(n + 1).fill(0);
  for (const [start, end, val] of updates) {
    diff[start] += val;
    if (end + 1 <= n) diff[end + 1] -= val;
  }
  const result = new Array(n);
  result[0] = diff[0];
  for (let i = 1; i < n; i++) {
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
    id: 'js-kadanes-algorithm',
    title: "Kadane's Algorithm: Maximum Subarray Sum",
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      "Find the maximum sum of any contiguous subarray using Kadane's O(n) algorithm that resets the running sum when it drops below zero. This is the quintessential dynamic programming interview problem and teaches the key insight of local vs. global optima tracking.",
    instructions: [
      'Given an array of integers (may include negatives), find the contiguous subarray with the largest sum',
      "Use Kadane's algorithm: track the current subarray sum and reset it when it drops below 0",
      'Return the maximum sum found',
    ],
    starterCode: `function maxSubarraySum(arr) {
  // Kadane's algorithm
  // YOUR CODE HERE
}`,
    solutionCode: `function maxSubarraySum(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
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
    id: 'js-dutch-national-flag',
    title: 'Dutch National Flag Partition',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Partition an array into three sections (less than, equal to, greater than pivot) in a single O(n) pass using three pointers. The Dutch National Flag algorithm is the partition step in three-way quicksort and is used to sort arrays with few distinct values efficiently.',
    instructions: [
      'Given an array and a pivot value, rearrange the array so all elements < pivot come first, then elements == pivot, then elements > pivot',
      'Use three pointers: low, mid, and high',
      'Perform this in a single pass through the array',
      'Return the rearranged array',
    ],
    starterCode: `function dutchFlag(arr, pivot) {
  // Three-way partition with low, mid, high pointers
  // YOUR CODE HERE
}`,
    solutionCode: `function dutchFlag(arr, pivot) {
  const result = [...arr];
  let low = 0, mid = 0, high = result.length - 1;
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
    id: 'js-fast-slow-pointers',
    title: "Floyd's Cycle Detection",
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      "Detect a cycle in a linked list using Floyd's tortoise-and-hare algorithm with O(1) space. This fast/slow pointer technique is essential for cycle detection, finding the cycle start, middle of a list, and appears frequently in linked list interview problems.",
    instructions: [
      'Given an array where arr[i] is the index of the next node (simulating a linked list), detect if there is a cycle',
      'Use two pointers: slow moves 1 step, fast moves 2 steps',
      'A value of -1 means no next node (end of list)',
      'Start both pointers at index 0',
      'Return true if a cycle is detected, false otherwise',
    ],
    starterCode: `function hasCycle(nextIndices) {
  // Floyd's tortoise and hare
  // YOUR CODE HERE
}`,
    solutionCode: `function hasCycle(nextIndices) {
  if (nextIndices.length === 0) return false;
  let slow = 0;
  let fast = 0;
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
    id: 'js-merge-in-place',
    title: 'Merge Two Sorted Arrays In-Place',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Merge two sorted arrays in-place by writing from the end to avoid overwriting unprocessed elements. This backward-merge technique uses O(1) extra space and is a classic interview problem that tests understanding of pointer manipulation in constrained memory.',
    instructions: [
      'Given arr1 (sorted, with m valid elements followed by zeros to hold arr2) and arr2 (sorted, n elements), merge arr2 into arr1 in-place',
      'Work from the end of both arrays to avoid overwriting',
      'Return the modified arr1',
    ],
    starterCode: `function mergeInPlace(arr1, m, arr2, n) {
  // Merge from the end
  // YOUR CODE HERE
}`,
    solutionCode: `function mergeInPlace(arr1, m, arr2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let write = m + n - 1;
  while (p1 >= 0 && p2 >= 0) {
    if (arr1[p1] > arr2[p2]) {
      arr1[write] = arr1[p1];
      p1--;
    } else {
      arr1[write] = arr2[p2];
      p2--;
    }
    write--;
  }
  while (p2 >= 0) {
    arr1[write] = arr2[p2];
    p2--;
    write--;
  }
  return arr1;
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
    id: 'js-zigzag-iteration',
    title: 'Zigzag Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Read a matrix in zigzag order: even rows left-to-right, odd rows right-to-left, for a snake-like traversal. Zigzag traversal is used in image scanning (JPEG encoding), printer rasterization, and problems requiring alternating-direction processing.',
    instructions: [
      'Given a 2D matrix, return all elements in zigzag order',
      'Row 0: left to right, Row 1: right to left, Row 2: left to right, etc.',
      'Return a flat array of the elements in this order',
    ],
    starterCode: `function zigzagTraversal(matrix) {
  const result = [];
  // Alternate direction per row
  // YOUR CODE HERE
  return result;
}`,
    solutionCode: `function zigzagTraversal(matrix) {
  const result = [];
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
    id: 'js-spiral-matrix',
    title: 'Spiral Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'advanced',
    description:
      'Read a matrix in spiral order by traversing clockwise from the outside in, shrinking boundaries after each layer. Spiral traversal is a popular interview problem that tests boundary management and is used in matrix-based simulations and display rendering.',
    instructions: [
      'Given an m x n matrix, return all elements in spiral order (clockwise from top-left)',
      'Traverse: top row left-to-right, right column top-to-bottom, bottom row right-to-left, left column bottom-to-top',
      'Shrink the boundaries after each layer and repeat',
    ],
    starterCode: `function spiralOrder(matrix) {
  const result = [];
  // Use top, bottom, left, right boundaries
  // YOUR CODE HERE
  return result;
}`,
    solutionCode: `function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0) return result;
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
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
    id: 'js-diagonal-traversal',
    title: 'Diagonal Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a matrix along its diagonals (top-right to bottom-left), grouping elements where row + col is constant. Diagonal traversal appears in matrix-based interview problems, wavefront algorithms, and anti-diagonal processing in image analysis.',
    instructions: [
      'Given an m x n matrix, return elements grouped by diagonals',
      'Each diagonal consists of elements where row + col is the same constant',
      'Return a flat array reading each diagonal from top to bottom (i.e., increasing row within each diagonal)',
    ],
    starterCode: `function diagonalTraversal(matrix) {
  // Group elements by (row + col) sum
  // YOUR CODE HERE
}`,
    solutionCode: `function diagonalTraversal(matrix) {
  if (matrix.length === 0) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  const result = [];
  for (let d = 0; d < m + n - 1; d++) {
    const startRow = d < n ? 0 : d - n + 1;
    const startCol = d < n ? d : n - 1;
    let r = startRow, c = startCol;
    while (r < m && c >= 0) {
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
    id: 'js-rotate-matrix',
    title: 'Rotate Matrix 90 Degrees Clockwise',
    category: 'iteration-patterns',
    difficulty: 'advanced',
    description:
      'Rotate an NxN matrix 90 degrees clockwise in-place using the transpose-then-reverse-rows technique. Matrix rotation is a classic interview problem that tests in-place transformation skills and is used in image rotation and game board manipulation.',
    instructions: [
      'Given an NxN matrix, rotate it 90 degrees clockwise in-place',
      'Strategy: first transpose the matrix (swap rows and columns), then reverse each row',
      'Return the modified matrix',
    ],
    starterCode: `function rotateMatrix(matrix) {
  // Step 1: Transpose
  // Step 2: Reverse each row
  // YOUR CODE HERE
}`,
    solutionCode: `function rotateMatrix(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // Reverse each row
  for (let i = 0; i < n; i++) {
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
    id: 'js-lower-bound',
    title: 'Lower Bound (Binary Search)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the first index where arr[i] >= target using binary search (lower bound / bisect-left). Lower bound is the most versatile binary search variant, used for range queries, counting elements, finding insertion points, and solving optimization problems.',
    instructions: [
      'Given a sorted array and a target, find the first index i such that arr[i] >= target',
      'If no such index exists, return the array length',
      'Use binary search with lo/hi pointers',
    ],
    starterCode: `function lowerBound(arr, target) {
  // Binary search for first index >= target
  // YOUR CODE HERE
}`,
    solutionCode: `function lowerBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] < target) {
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
    id: 'js-upper-bound',
    title: 'Upper Bound (Binary Search)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the first index where arr[i] > target using binary search (upper bound / bisect-right). Combined with lower bound, upper bound enables counting occurrences, finding ranges, and implementing multiset operations on sorted arrays in O(log n).',
    instructions: [
      'Given a sorted array and a target, find the first index i such that arr[i] > target',
      'If no such index exists, return the array length',
      'Use binary search with lo/hi pointers',
    ],
    starterCode: `function upperBound(arr, target) {
  // Binary search for first index > target
  // YOUR CODE HERE
}`,
    solutionCode: `function upperBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] <= target) {
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
    id: 'js-binary-search-sqrt',
    title: 'Integer Square Root via Binary Search',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the integer square root of a number by binary searching over possible answers. Binary search on the answer space is a powerful meta-technique used for optimization problems where you can verify a candidate solution but cannot compute it directly.',
    instructions: [
      'Given a non-negative integer n, return the largest integer x such that x * x <= n',
      'Use binary search over the range [0, n] to find this value',
      'Do not use Math.sqrt',
    ],
    starterCode: `function intSqrt(n) {
  // Binary search on the answer
  // YOUR CODE HERE
}`,
    solutionCode: `function intSqrt(n) {
  if (n < 2) return n;
  let lo = 1, hi = Math.floor(n / 2);
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (mid * mid === n) return mid;
    if (mid * mid < n) {
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
    id: 'js-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'advanced',
    description:
      'Search for a target in a sorted-then-rotated array using binary search by identifying which half is sorted. This advanced binary search variant is a top interview problem that tests the ability to reason about partially ordered data in O(log n) time.',
    instructions: [
      'Given a rotated sorted array (e.g., [4,5,6,7,0,1,2]) and a target, find the target index or return -1',
      'Use binary search: determine which half is sorted, then decide which half to search',
      'Array has no duplicates',
    ],
    starterCode: `function searchRotated(arr, target) {
  // Binary search on rotated sorted array
  // YOUR CODE HERE
}`,
    solutionCode: `function searchRotated(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] === target) return mid;
    if (arr[lo] <= arr[mid]) {
      if (target >= arr[lo] && target < arr[mid]) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else {
      if (target > arr[mid] && target <= arr[hi]) {
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
    id: 'js-quick-select',
    title: 'QuickSelect: Kth Smallest Element',
    category: 'searching',
    difficulty: 'advanced',
    description:
      'Find the kth smallest element using the QuickSelect partition algorithm with average O(n) time. QuickSelect is the optimal selection algorithm for order statistics, powering median-finding, top-K queries, and percentile calculations without full sorting.',
    instructions: [
      'Given an unsorted array and k (1-indexed), find the kth smallest element',
      'Use the quickselect algorithm: pick a pivot, partition, then recurse on the relevant side',
      'Average O(n) time complexity',
    ],
    starterCode: `function quickSelect(arr, k) {
  // Partition-based selection
  // YOUR CODE HERE
}`,
    solutionCode: `function quickSelect(arr, k) {
  const a = [...arr];
  function partition(lo, hi) {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (a[j] <= pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    return i;
  }
  let lo = 0, hi = a.length - 1;
  const target = k - 1;
  while (lo <= hi) {
    const pivotIndex = partition(lo, hi);
    if (pivotIndex === target) return a[pivotIndex];
    if (pivotIndex < target) lo = pivotIndex + 1;
    else hi = pivotIndex - 1;
  }
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
    id: 'js-exponential-search',
    title: 'Exponential Search',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find an element by doubling a range bound then binary searching within it, combining O(log n) search with unbounded range finding. Exponential search is optimal for unbounded or infinite arrays and teaches the range-narrowing pattern used in interpolation search.',
    instructions: [
      'Given a sorted array and a target, find the target index using exponential search',
      'Start with bound=1 and double it until arr[bound] >= target or bound exceeds array length',
      'Then binary search in the range [bound/2, min(bound, length-1)]',
      'Return -1 if not found',
    ],
    starterCode: `function exponentialSearch(arr, target) {
  // Find range then binary search
  // YOUR CODE HERE
}`,
    solutionCode: `function exponentialSearch(arr, target) {
  if (arr.length === 0) return -1;
  if (arr[0] === target) return 0;
  let bound = 1;
  while (bound < arr.length && arr[bound] < target) {
    bound *= 2;
  }
  let lo = Math.floor(bound / 2);
  let hi = Math.min(bound, arr.length - 1);
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
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
    id: 'js-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find a peak element (greater than neighbors) using binary search in O(log n) by always moving toward the higher neighbor. Peak finding demonstrates that binary search works beyond sorted arrays and is used in optimization, gradient ascent, and bitonic search.',
    instructions: [
      'A peak element is one that is strictly greater than its neighbors',
      'The array may have multiple peaks; return the index of any one',
      'Assume arr[-1] = arr[n] = -Infinity (edges are smaller than any element)',
      'Use binary search for O(log n) time',
    ],
    starterCode: `function findPeak(arr) {
  // Binary search for a peak
  // YOUR CODE HERE
}`,
    solutionCode: `function findPeak(arr) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] < arr[mid + 1]) {
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
    id: 'js-search-2d-matrix',
    title: 'Search a 2D Sorted Matrix',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Search a row-and-column-sorted matrix using the staircase approach from the top-right corner in O(m+n) time. This elimination technique discards a row or column each step and is a classic interview problem for efficient 2D data searching.',
    instructions: [
      'Given a matrix where rows are sorted left-to-right and columns are sorted top-to-bottom, find if a target exists',
      'Start from the top-right corner: if current > target go left, if current < target go down',
      'Return [row, col] if found, or [-1, -1] if not found',
    ],
    starterCode: `function searchMatrix(matrix, target) {
  // Start from top-right corner
  // YOUR CODE HERE
}`,
    solutionCode: `function searchMatrix(matrix, target) {
  if (matrix.length === 0 || matrix[0].length === 0) return [-1, -1];
  let row = 0;
  let col = matrix[0].length - 1;
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
    id: 'js-count-occurrences',
    title: 'Count Occurrences in Sorted Array',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Count how many times a target appears in a sorted array using two binary searches (lower and upper bound). This O(log n) technique combines both bound variants and teaches the powerful pattern of computing range sizes from boundary positions.',
    instructions: [
      'Given a sorted array and a target, return the number of times target appears',
      'Use lower bound (first index >= target) and upper bound (first index > target)',
      'The count is upperBound - lowerBound',
    ],
    starterCode: `function countOccurrences(arr, target) {
  // Use two binary searches: lower bound and upper bound
  // YOUR CODE HERE
}`,
    solutionCode: `function countOccurrences(arr, target) {
  function lowerBound(a, t) {
    let lo = 0, hi = a.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (a[mid] < t) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  function upperBound(a, t) {
    let lo = 0, hi = a.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (a[mid] <= t) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  return upperBound(arr, target) - lowerBound(arr, target);
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
    id: 'js-min-in-rotated',
    title: 'Find Minimum in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the minimum element in a rotated sorted array using binary search by comparing mid with the rightmost element. This O(log n) algorithm identifies the rotation point and extends binary search skills to structural properties beyond simple value comparisons.',
    instructions: [
      'Given a sorted array rotated at some pivot (e.g., [3,4,5,1,2]), find the minimum element',
      'Use binary search: compare mid with hi to decide which half to search',
      'No duplicates in the array',
    ],
    starterCode: `function findMin(arr) {
  // Binary search for minimum in rotated array
  // YOUR CODE HERE
}`,
    solutionCode: `function findMin(arr) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] > arr[hi]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return arr[lo];
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
    id: 'js-max-heap-insert',
    title: 'Max Heap: Insert and Bubble Up',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Insert a value into a max heap and restore the heap property by bubbling up, where every parent >= children. Max heaps power priority queues for scheduling highest-priority tasks, and understanding both min and max heap variants is essential for heap-based interview problems.',
    instructions: [
      'Given a max heap as an array and a value to insert, add the value and bubble it up to maintain the max-heap property',
      'In a max heap, every parent is >= its children',
      'Parent of index i is at Math.floor((i - 1) / 2)',
      'Return the modified heap array',
    ],
    starterCode: `function heapInsert(heap, value) {
  // Push value and bubble up
  // YOUR CODE HERE
}`,
    solutionCode: `function heapInsert(heap, value) {
  heap.push(value);
  let i = heap.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
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
    id: 'js-heap-extract-min',
    title: 'Min Heap: Extract Minimum',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      "Extract the minimum element from a min heap and restore order by sifting the last element down from the root. Extract-min is the critical priority queue operation used in Dijkstra's algorithm, event-driven simulation, and building sorted output from a heap.",
    instructions: [
      'Given a min heap as an array, extract (remove and return) the minimum element',
      'Move the last element to the root, then sift down to restore the min-heap property',
      'Return an object with { min, heap } where min is the extracted value and heap is the remaining heap',
    ],
    starterCode: `function heapExtractMin(heap) {
  // Extract min and sift down
  // YOUR CODE HERE
}`,
    solutionCode: `function heapExtractMin(heap) {
  if (heap.length === 0) return { min: null, heap: [] };
  const min = heap[0];
  const last = heap.pop();
  if (heap.length > 0) {
    heap[0] = last;
    let i = 0;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
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
    id: 'js-lru-cache',
    title: 'LRU Cache with Map',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement a Least Recently Used cache using JavaScript Map which preserves insertion order for O(1) get and put. LRU caches are used in browser caches, database query caches, and operating system page replacement, and are a top-tier interview design question.',
    instructions: [
      'Implement an LRU cache with a given capacity',
      'get(key): return the value if it exists (and mark it as recently used), or -1',
      'put(key, value): insert or update the key-value pair; if over capacity, evict the least recently used',
      'Use a Map to leverage insertion-order iteration',
      'Return an object with get and put methods',
    ],
    starterCode: `function createLRUCache(capacity) {
  // Use a Map for O(1) get/put with insertion order
  // YOUR CODE HERE
}`,
    solutionCode: `function createLRUCache(capacity) {
  const cache = new Map();
  return {
    get(key) {
      if (!cache.has(key)) return -1;
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    },
    put(key, value) {
      if (cache.has(key)) cache.delete(key);
      cache.set(key, value);
      if (cache.size > capacity) {
        const oldest = cache.keys().next().value;
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
    id: 'js-linked-list-reverse',
    title: 'Reverse a Singly Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Reverse a singly linked list in-place by rewiring the next pointers using prev, current, and next variables. List reversal is the most fundamental linked list transformation, tested in nearly every interview, and is a building block for palindrome checks and list partitioning.',
    instructions: [
      'Given the head of a singly linked list (node = {val, next}), reverse it in-place',
      'Use three pointers: prev, current, and next',
      'Return the new head of the reversed list',
      'null represents the end of the list',
    ],
    starterCode: `function reverseLinkedList(head) {
  // Iterative reversal with prev, current, next
  // YOUR CODE HERE
}`,
    solutionCode: `function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
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
    id: 'js-circular-buffer',
    title: 'Circular Buffer',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a fixed-size circular buffer (ring buffer) with enqueue, dequeue, and peek using modular index arithmetic. Ring buffers are used in audio/video streaming, network packet buffers, logging systems, and producer-consumer queues with bounded memory.',
    instructions: [
      'Create a circular buffer with a given capacity',
      'enqueue(val): add to the back; return false if full',
      'dequeue(): remove from the front; return null if empty',
      'peek(): return the front element without removing; return null if empty',
      'Return an object with enqueue, dequeue, peek, and size methods',
    ],
    starterCode: `function createCircularBuffer(capacity) {
  // Fixed-size circular buffer using array
  // YOUR CODE HERE
}`,
    solutionCode: `function createCircularBuffer(capacity) {
  const buffer = new Array(capacity);
  let head = 0, tail = 0, count = 0;
  return {
    enqueue(val) {
      if (count === capacity) return false;
      buffer[tail] = val;
      tail = (tail + 1) % capacity;
      count++;
      return true;
    },
    dequeue() {
      if (count === 0) return null;
      const val = buffer[head];
      head = (head + 1) % capacity;
      count--;
      return val;
    },
    peek() {
      if (count === 0) return null;
      return buffer[head];
    },
    size() {
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
    id: 'js-monotonic-stack',
    title: 'Next Greater Element (Monotonic Stack)',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Find the next greater element for each array element using a monotonic decreasing stack in O(n) time. The monotonic stack pattern solves a family of problems including stock span, largest rectangle in histogram, and temperature wait-time questions.',
    instructions: [
      'Given an array, for each element find the first element to its right that is greater',
      'If no greater element exists, use -1',
      'Use a stack to process elements efficiently in O(n) time',
      'Return the array of next greater elements',
    ],
    starterCode: `function nextGreaterElement(arr) {
  // Use a monotonic stack
  // YOUR CODE HERE
}`,
    solutionCode: `function nextGreaterElement(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
      const idx = stack.pop();
      result[idx] = arr[i];
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
    id: 'js-sliding-window-max',
    title: 'Sliding Window Maximum (Deque)',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Find the maximum in each sliding window of size k using a monotonic deque in O(n) total time. This combines the sliding window and monotonic data structure patterns and is used for real-time maximum tracking, stock analysis, and stream processing.',
    instructions: [
      'Given an array and window size k, return an array of the maximum value in each window position',
      'Use a deque (array of indices) that maintains a decreasing order of values',
      'Remove indices that are out of the current window from the front',
      'Remove indices with smaller values from the back before adding a new one',
    ],
    starterCode: `function slidingWindowMax(arr, k) {
  // Monotonic deque for window maximums
  // YOUR CODE HERE
}`,
    solutionCode: `function slidingWindowMax(arr, k) {
  const result = [];
  const deque = [];
  for (let i = 0; i < arr.length; i++) {
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    while (deque.length > 0 && arr[deque[deque.length - 1]] <= arr[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) {
      result.push(arr[deque[0]]);
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
    id: 'js-min-stack',
    title: 'Min Stack (O(1) getMin)',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a stack supporting push, pop, top, and O(1) getMin using an auxiliary stack to track minimums. The min-stack is a classic interview design problem that teaches the technique of maintaining parallel state to support constant-time aggregate queries.',
    instructions: [
      'Create a stack with push, pop, top, and getMin methods',
      'All operations must run in O(1) time',
      'Use an auxiliary stack to track minimums',
      'Return an object with push, pop, top, and getMin methods',
    ],
    starterCode: `function createMinStack() {
  // Stack with O(1) getMin using auxiliary stack
  // YOUR CODE HERE
}`,
    solutionCode: `function createMinStack() {
  const stack = [];
  const minStack = [];
  return {
    push(val) {
      stack.push(val);
      if (minStack.length === 0 || val <= minStack[minStack.length - 1]) {
        minStack.push(val);
      }
    },
    pop() {
      const val = stack.pop();
      if (val === minStack[minStack.length - 1]) {
        minStack.pop();
      }
      return val;
    },
    top() {
      return stack[stack.length - 1];
    },
    getMin() {
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
    id: 'js-two-stack-queue',
    title: 'Queue Using Two Stacks',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a FIFO queue using two LIFO stacks with amortized O(1) operations via lazy transfer. This classic data structure design problem demonstrates how combining simple structures creates new ones, and teaches amortized analysis thinking.',
    instructions: [
      'Implement enqueue and dequeue operations using only two stacks (arrays with push/pop)',
      'enqueue(val): add to the queue',
      'dequeue(): remove and return the front element, or null if empty',
      'Use an input stack and an output stack; transfer elements lazily',
      'Return an object with enqueue, dequeue, and peek methods',
    ],
    starterCode: `function createQueueFromStacks() {
  // Two stacks: input and output
  // YOUR CODE HERE
}`,
    solutionCode: `function createQueueFromStacks() {
  const inStack = [];
  const outStack = [];
  function transfer() {
    if (outStack.length === 0) {
      while (inStack.length > 0) {
        outStack.push(inStack.pop());
      }
    }
  }
  return {
    enqueue(val) {
      inStack.push(val);
    },
    dequeue() {
      transfer();
      return outStack.length > 0 ? outStack.pop() : null;
    },
    peek() {
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
    id: 'js-disjoint-set-rank',
    title: 'Union-Find with Rank and Path Compression',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Implement Union-Find with both union-by-rank and path compression for near-constant-time operations. This optimized DSU achieves inverse-Ackermann amortized complexity and is essential for Kruskal's MST, connected components, and dynamic graph connectivity.",
    instructions: [
      'Implement find(parent, x) with path compression: make every node point directly to root',
      'Implement union(parent, rank, x, y): merge sets by rank, attach smaller tree under larger',
      'Return an object { parent, rank } after performing all union operations on n elements',
    ],
    starterCode: `function disjointSetRank(n, unions) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);

  function find(x) {
    // Path compression: make x point directly to root
    // YOUR CODE HERE
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX === rootY) return;
    // Union by rank: attach smaller tree under bigger
    // YOUR CODE HERE
  }

  for (const [x, y] of unions) {
    union(x, y);
  }

  // Compress all paths for final state
  for (let i = 0; i < n; i++) find(i);
  return { parent: [...parent], rank: [...rank] };
}`,
    solutionCode: `function disjointSetRank(n, unions) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
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

  for (let i = 0; i < n; i++) find(i);
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
    id: 'js-weighted-graph',
    title: 'Build Weighted Adjacency List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Build a weighted adjacency list from [u, v, weight] edge triples, the standard input format for shortest-path algorithms. Weighted graphs are the foundation for Dijkstra, Bellman-Ford, Floyd-Warshall, and minimum spanning tree algorithms.',
    instructions: [
      'Given edges as [u, v, weight] triples and number of nodes, build an adjacency list',
      'Each node maps to an array of { node, weight } objects',
      'The graph is undirected: add edges in both directions',
    ],
    starterCode: `function buildWeightedGraph(n, edges) {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  // Add each edge in both directions with weight
  // YOUR CODE HERE

  return graph;
}`,
    solutionCode: `function buildWeightedGraph(n, edges) {
  const graph = {};
  for (let i = 0; i < n; i++) {
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
    id: 'js-fenwick-tree-update',
    title: 'Fenwick Tree: Point Update',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement the point update operation for a Binary Indexed Tree (Fenwick Tree) by propagating changes upward via lowest-set-bit arithmetic. Fenwick trees enable O(log n) updates and prefix queries, making them ideal for competitive programming and range query problems.',
    instructions: [
      'Given a Fenwick tree array (1-indexed), update index i by adding delta',
      'Traverse upward by adding the lowest set bit: i += i & (-i)',
      'Return the updated tree array',
    ],
    starterCode: `function fenwickUpdate(tree, n, i, delta) {
  // Update Fenwick tree at index i (1-indexed) by adding delta
  // Move to next responsible node: i += i & (-i)
  // YOUR CODE HERE

  return tree;
}`,
    solutionCode: `function fenwickUpdate(tree, n, i, delta) {
  while (i <= n) {
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
    id: 'js-fenwick-tree-query',
    title: 'Fenwick Tree: Prefix Sum Query',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement prefix sum query for a Fenwick Tree by accumulating values downward via lowest-set-bit removal. Combined with point updates, this gives O(log n) dynamic prefix sums, outperforming naive arrays for problems with interleaved updates and queries.',
    instructions: [
      'Given a Fenwick tree array (1-indexed), compute the prefix sum from index 1 to i',
      'Traverse downward by removing the lowest set bit: i -= i & (-i)',
      'Accumulate the sum at each step',
    ],
    starterCode: `function fenwickQuery(tree, i) {
  let sum = 0;
  // Accumulate sum by removing lowest set bit: i -= i & (-i)
  // YOUR CODE HERE

  return sum;
}`,
    solutionCode: `function fenwickQuery(tree, i) {
  let sum = 0;
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
    id: 'js-hash-map-chaining',
    title: 'Hash Map with Separate Chaining',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a hash map using separate chaining for collision resolution with put, get, and remove operations. Understanding how hash maps work internally is essential for analyzing time complexity, handling collisions, and answering systems design interview questions.',
    instructions: [
      'Implement put(key, value), get(key), and remove(key) operations',
      'Use a simple hash: sum of char codes mod capacity',
      'Each bucket is an array of [key, value] pairs',
      'Execute the given operations and return results of all get operations',
    ],
    starterCode: `function hashMapChaining(capacity, operations) {
  const buckets = Array.from({ length: capacity }, () => []);
  const results = [];

  function hash(key) {
    let h = 0;
    for (const c of String(key)) h += c.charCodeAt(0);
    return h % capacity;
  }

  function put(key, value) {
    const idx = hash(key);
    const bucket = buckets[idx];
    // Update existing or add new [key, value]
    // YOUR CODE HERE
  }

  function get(key) {
    const idx = hash(key);
    const bucket = buckets[idx];
    // Find and return value, or -1 if not found
    // YOUR CODE HERE
  }

  function remove(key) {
    const idx = hash(key);
    const bucket = buckets[idx];
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
    solutionCode: `function hashMapChaining(capacity, operations) {
  const buckets = Array.from({ length: capacity }, () => []);
  const results = [];

  function hash(key) {
    let h = 0;
    for (const c of String(key)) h += c.charCodeAt(0);
    return h % capacity;
  }

  function put(key, value) {
    const idx = hash(key);
    const bucket = buckets[idx];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }

  function get(key) {
    const idx = hash(key);
    const bucket = buckets[idx];
    for (const pair of bucket) {
      if (pair[0] === key) return pair[1];
    }
    return -1;
  }

  function remove(key) {
    const idx = hash(key);
    const bucket = buckets[idx];
    const i = bucket.findIndex(pair => pair[0] === key);
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
    id: 'js-deque',
    title: 'Double-Ended Queue (Deque)',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Implement a double-ended queue (deque) supporting push and pop from both front and back. Deques are used in sliding window maximum algorithms, BFS with 0/1 edge weights, palindrome checking, and work-stealing schedulers in concurrent systems.',
    instructions: [
      'Process a list of operations: pushFront, pushBack, popFront, popBack',
      'popFront/popBack return the removed value or -1 if empty',
      'Return an array of all pop results',
    ],
    starterCode: `function dequeOperations(operations) {
  const deque = [];
  const results = [];

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
    solutionCode: `function dequeOperations(operations) {
  const deque = [];
  const results = [];

  for (const op of operations) {
    if (op[0] === 'pushFront') {
      deque.unshift(op[1]);
    } else if (op[0] === 'pushBack') {
      deque.push(op[1]);
    } else if (op[0] === 'popFront') {
      results.push(deque.length > 0 ? deque.shift() : -1);
    } else if (op[0] === 'popBack') {
      results.push(deque.length > 0 ? deque.pop() : -1);
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
    id: 'js-fast-power',
    title: 'Fast Power (Binary Exponentiation)',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Compute base^exp in O(log n) time using binary exponentiation (repeated squaring). Fast power is a key building block in modular arithmetic, RSA cryptography, competitive programming, and any context requiring efficient large-exponent computation.',
    instructions: [
      'If exp is 0, return 1',
      'If exp is even, compute half = fastPower(base, exp/2) and return half * half',
      'If exp is odd, return base * fastPower(base, exp - 1)',
    ],
    starterCode: `function fastPower(base, exp) {
  // Base case
  // YOUR CODE HERE

  // Even exponent: square the half result
  // Odd exponent: multiply by base
  // YOUR CODE HERE
}`,
    solutionCode: `function fastPower(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) {
    const half = fastPower(base, exp / 2);
    return half * half;
  }
  return base * fastPower(base, exp - 1);
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
    id: 'js-flood-fill',
    title: 'Flood Fill',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Flood fill a 2D grid from a starting position with a new color using recursive DFS in four directions. Flood fill is the paint-bucket algorithm and a core pattern for grid-based DFS, island counting, connected component labeling, and region detection.',
    instructions: [
      'Given a grid, starting row r, column c, and newColor, fill all connected same-color cells',
      'Connected means up, down, left, right (4-directional)',
      'Return the modified grid',
    ],
    starterCode: `function floodFill(grid, r, c, newColor) {
  const origColor = grid[r][c];
  if (origColor === newColor) return grid;

  function fill(row, col) {
    // Check bounds and matching color, then recurse in 4 directions
    // YOUR CODE HERE
  }

  fill(r, c);
  return grid;
}`,
    solutionCode: `function floodFill(grid, r, c, newColor) {
  const origColor = grid[r][c];
  if (origColor === newColor) return grid;

  function fill(row, col) {
    if (row < 0 || row >= grid.length) return;
    if (col < 0 || col >= grid[0].length) return;
    if (grid[row][col] !== origColor) return;

    grid[row][col] = newColor;
    fill(row + 1, col);
    fill(row - 1, col);
    fill(row, col + 1);
    fill(row, col - 1);
  }

  fill(r, c);
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
    id: 'js-generate-parens',
    title: 'Generate Valid Parentheses',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Generate all valid combinations of n pairs of parentheses using constraint-based backtracking. This classic recursion problem teaches how to prune invalid branches early and is directly applicable to expression generation, syntax tree construction, and Catalan number enumeration.',
    instructions: [
      'Generate all strings of n pairs of balanced parentheses',
      'Track open and close counts; only add "(" if open < n, ")" if close < open',
      'Base case: when string length equals 2*n, add to result',
    ],
    starterCode: `function generateParens(n) {
  const result = [];

  function generate(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    // Add '(' if open < n
    // Add ')' if close < open
    // YOUR CODE HERE
  }

  generate('', 0, 0);
  return result;
}`,
    solutionCode: `function generateParens(n) {
  const result = [];

  function generate(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) {
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
    id: 'js-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Solve the Tower of Hanoi for n disks, returning the sequence of moves. This classic recursion problem demonstrates divide-and-conquer thinking, produces 2^n - 1 moves, and teaches how to decompose a complex problem into self-similar subproblems.',
    instructions: [
      'Move n disks from source peg to target peg using auxiliary peg',
      'Move n-1 disks from source to auxiliary, move disk n to target, move n-1 from auxiliary to target',
      'Return array of [from, to] moves using peg labels "A", "B", "C"',
    ],
    starterCode: `function towerOfHanoi(n, source, target, auxiliary) {
  const moves = [];

  function solve(disks, src, tgt, aux) {
    if (disks === 0) return;
    // Move n-1 disks to auxiliary, move 1 disk to target, move n-1 to target
    // YOUR CODE HERE
  }

  solve(n, source, target, auxiliary);
  return moves;
}`,
    solutionCode: `function towerOfHanoi(n, source, target, auxiliary) {
  const moves = [];

  function solve(disks, src, tgt, aux) {
    if (disks === 0) return;
    solve(disks - 1, src, aux, tgt);
    moves.push([src, tgt]);
    solve(disks - 1, aux, tgt, src);
  }

  solve(n, source, target, auxiliary);
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
    id: 'js-deep-clone',
    title: 'Deep Clone Object/Array',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Deep clone a nested object or array structure using recursive type-checking traversal. Deep cloning is a fundamental JavaScript utility for immutable state management in React/Redux, avoiding reference sharing bugs, and safely duplicating complex configuration objects.',
    instructions: [
      'If value is null or not an object, return it directly (primitive)',
      'If value is an array, recursively clone each element',
      'If value is an object, recursively clone each property',
    ],
    starterCode: `function deepClone(value) {
  // Handle primitives and null
  // Handle arrays
  // Handle objects
  // YOUR CODE HERE
}`,
    solutionCode: `function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(item => deepClone(item));
  }
  const result = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
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
    id: 'js-subset-sum-exists',
    title: 'Subset Sum Exists (Backtracking)',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Check if any subset of an array sums to a target value using include/exclude backtracking with pruning. Subset sum is an NP-complete problem that teaches the foundational backtracking pattern used in constraint satisfaction, knapsack variants, and combinatorial search.',
    instructions: [
      'Given an array of positive integers and a target, return true if any subset sums to target',
      'For each element, try including it or excluding it',
      'Use early termination: stop if current sum exceeds target',
    ],
    starterCode: `function subsetSumExists(nums, target) {
  function backtrack(index, currentSum) {
    if (currentSum === target) return true;
    if (index >= nums.length || currentSum > target) return false;

    // Include nums[index] or skip it
    // YOUR CODE HERE
  }

  return backtrack(0, 0);
}`,
    solutionCode: `function subsetSumExists(nums, target) {
  function backtrack(index, currentSum) {
    if (currentSum === target) return true;
    if (index >= nums.length || currentSum > target) return false;

    return backtrack(index + 1, currentSum + nums[index])
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
    id: 'js-n-queens-count',
    title: 'N-Queens Count',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Count valid N-Queens placements on an NxN board using backtracking with column and diagonal constraint tracking via Sets. N-Queens is the canonical backtracking problem that teaches constraint propagation, pruning, and systematic state-space exploration.',
    instructions: [
      'Place queens row by row; for each row, try each column',
      'Track occupied columns and diagonals using Sets',
      'Diagonals: row-col for one direction, row+col for the other',
    ],
    starterCode: `function nQueensCount(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set();  // row - col
  const diag2 = new Set();  // row + col

  function solve(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let col = 0; col < n; col++) {
      // Check if column and diagonals are free, place queen, recurse, remove
      // YOUR CODE HERE
    }
  }

  solve(0);
  return count;
}`,
    solutionCode: `function nQueensCount(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function solve(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let col = 0; col < n; col++) {
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
    id: 'js-word-search-grid',
    title: 'Word Search in Grid',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Search for a word in a 2D character grid by DFS with backtracking, marking cells visited to prevent reuse. Word search combines grid traversal, DFS, and backtracking patterns and is one of the most commonly asked medium-difficulty interview problems.',
    instructions: [
      'Search for word starting from every cell in the grid',
      'For each cell, try extending the path in 4 directions',
      'Mark visited cells to prevent reuse, then unmark (backtrack)',
    ],
    starterCode: `function wordSearch(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c, idx) {
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
    solutionCode: `function wordSearch(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[idx]) return false;

    const temp = board[r][c];
    board[r][c] = '#';
    const found = dfs(r + 1, c, idx + 1)
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
    id: 'js-flatten-nested-recursive',
    title: 'Flatten Nested Arrays Recursively',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Flatten arbitrarily nested arrays into a single flat array using recursive descent. This fundamental recursive pattern for tree-like structures is used for normalizing hierarchical data, processing nested JSON, and is the logic behind deep flatten utilities.',
    instructions: [
      'Given a nested array like [1, [2, [3, [4]]]], return [1, 2, 3, 4]',
      'If element is an array, recursively flatten it',
      'If element is not an array, push it to the result',
    ],
    starterCode: `function flattenDeep(arr) {
  const result = [];

  function flatten(items) {
    for (const item of items) {
      // If array, recurse; otherwise push to result
      // YOUR CODE HERE
    }
  }

  flatten(arr);
  return result;
}`,
    solutionCode: `function flattenDeep(arr) {
  const result = [];

  function flatten(items) {
    for (const item of items) {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        result.push(item);
      }
    }
  }

  flatten(arr);
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
    id: 'js-string-perms-dedup',
    title: 'Unique String Permutations',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Generate all unique permutations of a string with duplicate characters using sort-and-skip deduplication. This backtracking technique avoids generating duplicate results by sorting first and skipping adjacent identical unused characters, a key optimization pattern.',
    instructions: [
      'Sort characters first so duplicates are adjacent',
      'Use a used[] boolean array to track which characters are currently placed',
      'Skip a character if it equals the previous one and the previous was not used in this branch',
    ],
    starterCode: `function uniquePermutations(str) {
  const result = [];
  const chars = str.split('').sort();
  const used = new Array(chars.length).fill(false);

  function backtrack(current) {
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
    solutionCode: `function uniquePermutations(str) {
  const result = [];
  const chars = str.split('').sort();
  const used = new Array(chars.length).fill(false);

  function backtrack(current) {
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
    id: 'js-combinations-with-rep',
    title: 'Combinations with Repetition',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate combinations where elements can be chosen more than once (multiset combinations) using backtracking from the same index. This variant models real-world scenarios like making change with coins, selecting items with replacement, and resource allocation.',
    instructions: [
      'Given an array and size k, generate all combinations allowing repeated elements',
      'Use backtracking starting from the current index (not i+1) to allow repeats',
      'Elements should be in non-decreasing order to avoid duplicates',
    ],
    starterCode: `function combinationsWithRep(arr, k) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    // Iterate from start (not start+1) to allow repeats
    // YOUR CODE HERE
  }

  backtrack(0, []);
  return result;
}`,
    solutionCode: `function combinationsWithRep(arr, k) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
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
    id: 'js-next-permutation',
    title: 'Next Lexicographic Permutation',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Transform an array to its next lexicographic permutation in-place using the find-pivot, swap, and reverse-suffix algorithm. This O(n) algorithm is used for iterating through permutations without storing all of them, essential for memory-constrained combinatorial generation.',
    instructions: [
      'Find the largest index i such that arr[i] < arr[i+1] (the "pivot")',
      'Find the largest index j > i such that arr[j] > arr[i], then swap',
      'Reverse the suffix from i+1 to end',
      'If no pivot exists, reverse the entire array',
    ],
    starterCode: `function nextPermutation(arr) {
  const n = arr.length;

  // Step 1: find pivot (rightmost arr[i] < arr[i+1])
  // Step 2: find rightmost element > pivot and swap
  // Step 3: reverse suffix after pivot
  // YOUR CODE HERE

  return arr;
}`,
    solutionCode: `function nextPermutation(arr) {
  const n = arr.length;
  let i = n - 2;

  while (i >= 0 && arr[i] >= arr[i + 1]) i--;

  if (i >= 0) {
    let j = n - 1;
    while (arr[j] <= arr[i]) j--;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  let left = i + 1, right = n - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr;
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
    id: 'js-permutation-rank',
    title: 'Permutation Rank (1-based)',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Find the 1-based lexicographic rank of a permutation by counting smaller elements and factorial positions. Permutation ranking enables compact encoding of permutations as single integers, used in puzzle state compression and combinatorial number systems.',
    instructions: [
      'For each position, count how many smaller elements remain unused (these would form earlier permutations)',
      'Multiply that count by the factorial of remaining positions',
      'Sum all contributions and add 1 for 1-based ranking',
    ],
    starterCode: `function permutationRank(perm) {
  const n = perm.length;
  let rank = 0;

  function factorial(x) {
    let f = 1;
    for (let i = 2; i <= x; i++) f *= i;
    return f;
  }

  for (let i = 0; i < n; i++) {
    // Count elements after index i that are smaller than perm[i]
    // Multiply by factorial of remaining positions
    // YOUR CODE HERE
  }

  return rank + 1;
}`,
    solutionCode: `function permutationRank(perm) {
  const n = perm.length;
  let rank = 0;

  function factorial(x) {
    let f = 1;
    for (let i = 2; i <= x; i++) f *= i;
    return f;
  }

  for (let i = 0; i < n; i++) {
    let smaller = 0;
    for (let j = i + 1; j < n; j++) {
      if (perm[j] < perm[i]) smaller++;
    }
    rank += smaller * factorial(n - 1 - i);
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
    id: 'js-derangements-count',
    title: 'Count Derangements',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Count derangements (permutations where no element stays in its original position) using the recurrence D(n) = (n-1)(D(n-1) + D(n-2)). Derangements appear in probability, the hat-check problem, and secret Santa algorithms, connecting combinatorics to real-world scenarios.',
    instructions: [
      'D(0) = 1, D(1) = 0',
      'D(n) = (n - 1) * (D(n - 1) + D(n - 2)) for n >= 2',
      'Use iteration (bottom-up) for efficiency',
    ],
    starterCode: `function derangements(n) {
  if (n === 0) return 1;
  if (n === 1) return 0;

  let prev2 = 1; // D(0)
  let prev1 = 0; // D(1)

  // Compute D(2) through D(n) iteratively
  // YOUR CODE HERE

  return prev1;
}`,
    solutionCode: `function derangements(n) {
  if (n === 0) return 1;
  if (n === 1) return 0;

  let prev2 = 1;
  let prev1 = 0;

  for (let i = 2; i <= n; i++) {
    const current = (i - 1) * (prev1 + prev2);
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
    id: 'js-pascals-triangle-row',
    title: "Pascal's Triangle Row",
    category: 'combinatorics',
    difficulty: 'beginner',
    description:
      "Generate the nth row of Pascal's triangle iteratively, where each element is the sum of the two above it. Pascal's triangle encodes binomial coefficients and appears in probability, polynomial expansion, and combinatorial identity proofs.",
    instructions: [
      'Row 0 = [1], Row 1 = [1, 1], Row 2 = [1, 2, 1], etc.',
      'Build iteratively: each new row[j] = prev[j-1] + prev[j]',
      'First and last elements are always 1',
    ],
    starterCode: `function pascalRow(n) {
  let row = [1];

  for (let i = 1; i <= n; i++) {
    const newRow = [1];
    // Fill middle elements using previous row
    // YOUR CODE HERE

    newRow.push(1);
    row = newRow;
  }

  return row;
}`,
    solutionCode: `function pascalRow(n) {
  let row = [1];

  for (let i = 1; i <= n; i++) {
    const newRow = [1];
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
    id: 'js-catalan-number',
    title: 'Catalan Number',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Compute the nth Catalan number using the DP recurrence C(n) = sum of C(i)*C(n-1-i). Catalan numbers count balanced parentheses, BST shapes, polygon triangulations, mountain ranges, and many other combinatorial structures that appear in interviews.',
    instructions: [
      'C(0) = 1',
      'C(n) = sum of C(i) * C(n-1-i) for i from 0 to n-1',
      'Or use the formula: C(n) = C(2n, n) / (n+1)',
      'Use iterative DP for efficiency',
    ],
    starterCode: `function catalanNumber(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  // Fill dp[1] through dp[n] using the recurrence
  // dp[i] = sum of dp[j] * dp[i-1-j] for j = 0..i-1
  // YOUR CODE HERE

  return dp[n];
}`,
    solutionCode: `function catalanNumber(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - 1 - j];
    }
  }

  return dp[n];
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
    id: 'js-power-set-bitmask',
    title: 'Power Set via Bitmask',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all subsets using bitmask iteration where each integer 0 to 2^n-1 encodes a subset. Bitmask enumeration is faster and more cache-friendly than recursion, and the bit-manipulation pattern is widely used in competitive programming and state compression DP.',
    instructions: [
      'There are 2^n subsets for an array of length n',
      'For each number from 0 to 2^n - 1, check each bit',
      'If bit j is set, include arr[j] in the current subset',
    ],
    starterCode: `function powerSetBitmask(arr) {
  const n = arr.length;
  const total = 1 << n; // 2^n
  const result = [];

  for (let mask = 0; mask < total; mask++) {
    const subset = [];
    // Check each bit of mask and include corresponding element
    // YOUR CODE HERE

    result.push(subset);
  }

  return result;
}`,
    solutionCode: `function powerSetBitmask(arr) {
  const n = arr.length;
  const total = 1 << n;
  const result = [];

  for (let mask = 0; mask < total; mask++) {
    const subset = [];
    for (let j = 0; j < n; j++) {
      if (mask & (1 << j)) {
        subset.push(arr[j]);
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
    id: 'js-gray-code',
    title: 'Gray Code Sequence',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate the n-bit Gray code sequence where consecutive values differ by exactly one bit, using i XOR (i >> 1). Gray codes are used in error correction, rotary encoders, Karnaugh maps, and genetic algorithms to minimize hamming distance between neighbors.',
    instructions: [
      'For n bits, generate 2^n values',
      'Gray code formula: gray(i) = i ^ (i >> 1)',
      'Return the sequence as an array of integers',
    ],
    starterCode: `function grayCode(n) {
  const result = [];
  const total = 1 << n; // 2^n

  for (let i = 0; i < total; i++) {
    // Compute Gray code using: i ^ (i >> 1)
    // YOUR CODE HERE
  }

  return result;
}`,
    solutionCode: `function grayCode(n) {
  const result = [];
  const total = 1 << n;

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
    id: 'js-josephus',
    title: 'Josephus Problem',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Solve the Josephus problem using the iterative formula J(i) = (J(i-1) + k) % i to find the survivor position. This circle-elimination problem appears in history, game theory, and competitive programming, demonstrating elegant modular arithmetic recurrences.',
    instructions: [
      'Use the iterative Josephus formula',
      'J(1) = 0',
      'J(i) = (J(i-1) + k) % i for i from 2 to n',
      'Return the 0-based survivor position',
    ],
    starterCode: `function josephus(n, k) {
  let survivor = 0; // J(1) = 0

  // Compute J(2), J(3), ..., J(n)
  // YOUR CODE HERE

  return survivor;
}`,
    solutionCode: `function josephus(n, k) {
  let survivor = 0;

  for (let i = 2; i <= n; i++) {
    survivor = (survivor + k) % i;
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
    id: 'js-count-inversions',
    title: 'Count Inversions (Merge Sort)',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Count array inversions using a modified merge sort that tallies cross-inversions during the merge step in O(n log n). Inversion count measures how far an array is from sorted and is used in ranking correlation, sorting analysis, and recommendation systems.',
    instructions: [
      'Modify merge sort to count inversions during the merge step',
      'When right element is smaller, it forms inversions with all remaining left elements',
      'Return the total inversion count',
    ],
    starterCode: `function countInversions(arr) {
  function mergeSort(a) {
    if (a.length <= 1) return { sorted: a, count: 0 };

    const mid = Math.floor(a.length / 2);
    const left = mergeSort(a.slice(0, mid));
    const right = mergeSort(a.slice(mid));

    // Merge and count cross-inversions
    // YOUR CODE HERE
  }

  return mergeSort(arr).count;
}`,
    solutionCode: `function countInversions(arr) {
  function mergeSort(a) {
    if (a.length <= 1) return { sorted: a, count: 0 };

    const mid = Math.floor(a.length / 2);
    const left = mergeSort(a.slice(0, mid));
    const right = mergeSort(a.slice(mid));

    const merged = [];
    let count = left.count + right.count;
    let i = 0, j = 0;

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

  return mergeSort(arr).count;
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
    id: 'js-preorder-iterative',
    title: 'Preorder Traversal (Iterative)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement binary tree preorder traversal iteratively using an explicit stack instead of recursion. Converting recursive DFS to iterative form teaches stack-based simulation of the call stack, which is essential for deep trees and interview follow-up questions.',
    instructions: [
      'Use a stack initialized with the root node',
      'Pop from stack, visit, then push right child first, then left child',
      'Pushing right before left ensures left is processed first (LIFO)',
    ],
    starterCode: `// Node: { value, left, right }
function preorderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    // Pop node, push value, push right then left child
    // YOUR CODE HERE
  }

  return result;
}`,
    solutionCode: `function preorderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
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
    id: 'js-postorder-iterative',
    title: 'Postorder Traversal (Iterative)',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Implement binary tree postorder traversal iteratively using the reverse-of-modified-preorder trick. Iterative postorder is the trickiest tree traversal, and mastering it demonstrates deep understanding of traversal order and stack manipulation.',
    instructions: [
      'Use two stacks or a modified approach: push to stack, process as root-right-left, then reverse',
      'Stack 1: process nodes. Stack 2 (or result reversed): collect in reverse postorder',
      'Alternatively, push to result in root-right-left order and reverse at the end',
    ],
    starterCode: `// Node: { value, left, right }
function postorderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  // Build result in root-right-left order, then reverse
  // YOUR CODE HERE

  return result.reverse();
}`,
    solutionCode: `function postorderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
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
    id: 'js-zigzag-level-order',
    title: 'Zigzag Level Order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Traverse a binary tree level by level, alternating direction each level (left-to-right then right-to-left). Zigzag level order combines BFS with direction toggling and is a popular interview problem that tests queue-based level processing and list reversal.',
    instructions: [
      'Use BFS with a queue, processing one level at a time',
      'Track direction: even levels go left-to-right, odd levels right-to-left',
      'Reverse the level array for right-to-left levels',
    ],
    starterCode: `// Node: { value, left, right }
function zigzagLevelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

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
    solutionCode: `function zigzagLevelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
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
    id: 'js-tree-level-widths',
    title: 'Tree Level Widths',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Calculate the number of nodes at each level of a binary tree using BFS with level-size tracking. Tree width computation is used for finding the maximum width, level-based aggregation, and understanding tree shape, a common interview and visualization task.',
    instructions: [
      'Use BFS with a queue, processing one level at a time',
      'For each level, record how many nodes are in it',
      'Return an array of widths from top to bottom',
    ],
    starterCode: `// Node: { value, left, right }
function treeLevelWidths(root) {
  if (!root) return [];

  const widths = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    // Record this level's width and enqueue children
    // YOUR CODE HERE
  }

  return widths;
}`,
    solutionCode: `function treeLevelWidths(root) {
  if (!root) return [];

  const widths = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    widths.push(levelSize);

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
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
    id: 'js-lowest-common-ancestor',
    title: 'Lowest Common Ancestor',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Find the Lowest Common Ancestor of two nodes in a binary tree using recursive divide-and-conquer. LCA is essential for computing distances between nodes, finding paths, and is used in phylogenetic analysis, version control (merge bases), and DOM traversal.',
    instructions: [
      'If root is null or matches either target, return root',
      'Recursively search left and right subtrees',
      'If both sides return non-null, current node is the LCA',
      'Otherwise, return whichever side is non-null',
    ],
    starterCode: `// Node: { value, left, right }
function lowestCommonAncestor(root, p, q) {
  // Base case: null or found one of the targets
  // YOUR CODE HERE

  // Recurse left and right
  // YOUR CODE HERE

  // If both sides found something, this is the LCA
  // YOUR CODE HERE
}`,
    solutionCode: `function lowestCommonAncestor(root, p, q) {
  if (!root || root.value === p || root.value === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

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
    id: 'js-tree-diameter',
    title: 'Binary Tree Diameter',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Find the diameter of a binary tree (longest path between any two nodes) using recursive height computation. Tree diameter teaches the pattern of returning one value (height) while tracking another (diameter) via a global variable, a common recursive technique.',
    instructions: [
      'For each node, the path through it is leftHeight + rightHeight',
      'Track the maximum diameter seen across all nodes',
      'Return height from the recursive function, update diameter as side effect',
    ],
    starterCode: `// Node: { value, left, right }
function treeDiameter(root) {
  let diameter = 0;

  function height(node) {
    if (!node) return 0;
    // Compute left and right heights
    // Update diameter as max of current and leftH + rightH
    // Return height of this subtree
    // YOUR CODE HERE
  }

  height(root);
  return diameter;
}`,
    solutionCode: `function treeDiameter(root) {
  let diameter = 0;

  function height(node) {
    if (!node) return 0;
    const leftH = height(node.left);
    const rightH = height(node.right);
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
    id: 'js-serialize-tree',
    title: 'Serialize and Deserialize Binary Tree',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Serialize a binary tree to a string and deserialize it back using preorder traversal with null markers. Tree serialization is essential for persistent storage, network transmission of tree data, and is a frequently asked system design interview question.',
    instructions: [
      'Serialize: preorder traversal, use "null" for null nodes, comma-separated',
      'Deserialize: split string by comma, process tokens in preorder',
      'Use an index tracker to consume tokens sequentially',
    ],
    starterCode: `// Node: { value, left, right }
function serialize(root) {
  const parts = [];

  function preorder(node) {
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

function deserialize(str) {
  const tokens = str.split(',');
  let index = 0;

  function build() {
    if (tokens[index] === 'null') {
      index++;
      return null;
    }
    // Create node, recurse left, recurse right
    // YOUR CODE HERE
  }

  return build();
}`,
    solutionCode: `function serialize(root) {
  const parts = [];

  function preorder(node) {
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

function deserialize(str) {
  const tokens = str.split(',');
  let index = 0;

  function build() {
    if (tokens[index] === 'null') {
      index++;
      return null;
    }
    const node = { value: Number(tokens[index]), left: null, right: null };
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
    id: 'js-lcs-length',
    title: 'Longest Common Subsequence Length',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Compute the longest common subsequence length of two strings using a bottom-up 2D DP table. LCS is the foundation for diff algorithms (git diff, DNA sequence alignment), text comparison, and teaches the standard two-string DP pattern used across many problems.',
    instructions: [
      'Build a 2D DP table of size (m+1) x (n+1)',
      'If characters match, dp[i][j] = dp[i-1][j-1] + 1',
      'Otherwise dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])',
      'Return dp[m][n]',
    ],
    starterCode: `function lcsLength(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  // Fill the DP table
  // YOUR CODE HERE

  return dp[m][n];
}`,
    solutionCode: `function lcsLength(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
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
    id: 'js-edit-distance',
    title: 'Edit Distance (Levenshtein)',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Compute the minimum insertions, deletions, and substitutions to transform one string into another using 2D DP. Edit distance (Levenshtein) is used in spell checkers, DNA alignment, fuzzy search, and is one of the most important string DP problems.',
    instructions: [
      'Build a (m+1) x (n+1) DP table',
      'Base cases: dp[i][0] = i (delete all), dp[0][j] = j (insert all)',
      'If chars match: dp[i][j] = dp[i-1][j-1]',
      'Otherwise: 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])',
    ],
    starterCode: `function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill the DP table
  // YOUR CODE HERE

  return dp[m][n];
}`,
    solutionCode: `function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

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
    id: 'js-coin-change-min',
    title: 'Minimum Coins to Make Amount',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Find the minimum number of coins needed for an amount using DP with unlimited coin denominations. Coin change is the classic unbounded knapsack problem that teaches bottom-up DP optimization, used in currency systems and resource allocation.',
    instructions: [
      'Create a DP array of size amount+1 initialized to Infinity',
      'Base case: dp[0] = 0 (zero coins for amount 0)',
      'For each amount, try every coin and take the minimum',
      'Return dp[amount] or -1 if impossible',
    ],
    starterCode: `function coinChangeMin(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  // Fill DP table
  // YOUR CODE HERE

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    solutionCode: `function coinChangeMin(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
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
    id: 'js-knapsack-01',
    title: '0/1 Knapsack',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Find the maximum value fitting in a knapsack capacity where each item is used at most once, using 2D DP. The 0/1 knapsack is the most important combinatorial optimization problem, applicable to portfolio selection, cargo loading, and budget allocation.',
    instructions: [
      'Build a DP table of size (n+1) x (capacity+1)',
      'For each item, decide to include or exclude it',
      'If item fits: dp[i][w] = max(exclude, value[i-1] + dp[i-1][w - weight[i-1]])',
      'If not: dp[i][w] = dp[i-1][w]',
    ],
    starterCode: `function knapsack01(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  // Fill the DP table
  // YOUR CODE HERE

  return dp[n][capacity];
}`,
    solutionCode: `function knapsack01(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
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
    id: 'js-lis-length',
    title: 'Longest Increasing Subsequence Length',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Find the length of the longest strictly increasing subsequence using O(n^2) DP. LIS appears in patience sorting, box stacking, longest chain problems, and is a fundamental subsequence pattern that can be optimized to O(n log n) with binary search.',
    instructions: [
      'Create dp array where dp[i] = LIS length ending at index i',
      'Initialize all dp values to 1 (each element is a subsequence of length 1)',
      'For each i, check all j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1)',
      'Return the maximum value in dp',
    ],
    starterCode: `function lisLength(nums) {
  if (nums.length === 0) return 0;
  const dp = Array(nums.length).fill(1);
  // Fill DP table
  // YOUR CODE HERE

  return Math.max(...dp);
}`,
    solutionCode: `function lisLength(nums) {
  if (nums.length === 0) return 0;
  const dp = Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
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
    id: 'js-rod-cutting',
    title: 'Rod Cutting',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Find the maximum revenue from cutting a rod into pieces using unbounded DP over all possible first-cut lengths. Rod cutting is a classic DP optimization problem that demonstrates how to enumerate decisions at each step and build optimal solutions bottom-up.',
    instructions: [
      'prices[i] is the price for a rod piece of length i+1',
      'Create dp array where dp[i] = max revenue for rod of length i',
      'dp[0] = 0 (no rod, no revenue)',
      'dp[i] = max over all cuts j: prices[j] + dp[i - j - 1]',
    ],
    starterCode: `function rodCutting(prices, n) {
  const dp = Array(n + 1).fill(0);
  // Fill DP table
  // YOUR CODE HERE

  return dp[n];
}`,
    solutionCode: `function rodCutting(prices, n) {
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] = Math.max(dp[i], prices[j] + dp[i - j - 1]);
    }
  }
  return dp[n];
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
    id: 'js-climbing-stairs',
    title: 'Climbing Stairs',
    category: 'memoization',
    difficulty: 'beginner',
    description:
      'Count distinct ways to climb n stairs taking 1 or 2 steps at a time, which follows the Fibonacci recurrence. Climbing stairs is the simplest DP counting problem and teaches how overlapping subproblems lead to the bottom-up DP pattern used in path counting.',
    instructions: [
      'dp[0] = 1 (one way to stay at ground), dp[1] = 1 (one way to reach step 1)',
      'For each step i >= 2: dp[i] = dp[i-1] + dp[i-2]',
      'Return dp[n]',
    ],
    starterCode: `function climbStairs(n) {
  if (n <= 1) return 1;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  // Fill DP table
  // YOUR CODE HERE

  return dp[n];
}`,
    solutionCode: `function climbStairs(n) {
  if (n <= 1) return 1;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
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
    id: 'js-unique-paths-grid',
    title: 'Unique Paths in Grid',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Count unique paths from top-left to bottom-right in a grid moving only right or down, using 2D DP. Grid paths is a foundational 2D DP problem equivalent to computing binomial coefficients, and extends to obstacles, weighted paths, and robot navigation.',
    instructions: [
      'Create an m x n DP table',
      'First row and first column are all 1 (only one way to reach them)',
      'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
      'Return dp[m-1][n-1]',
    ],
    starterCode: `function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));
  // Fill the DP table starting from (1,1)
  // YOUR CODE HERE

  return dp[m - 1][n - 1];
}`,
    solutionCode: `function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
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
    id: 'js-word-break',
    title: 'Word Break',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Determine if a string can be segmented into dictionary words using DP with Set-based lookup. Word break combines string processing with DP and is a common interview problem that tests the ability to define subproblem boundaries over string positions.',
    instructions: [
      'Create dp array where dp[i] = true if s.substring(0, i) can be segmented',
      'dp[0] = true (empty string is valid)',
      'For each position i, check all positions j < i',
      'If dp[j] is true and s.substring(j, i) is in the dictionary, set dp[i] = true',
    ],
    starterCode: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  // Fill DP table
  // YOUR CODE HERE

  return dp[s.length];
}`,
    solutionCode: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
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
    id: 'js-max-product-subarray',
    title: 'Maximum Product Subarray',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      "Find the contiguous subarray with the largest product by tracking both running max and min (since negatives flip signs). This DP variant extends Kadane's algorithm to multiplication and teaches the insight that minimum values matter when negative numbers are involved.",
    instructions: [
      'Track both currentMax and currentMin (negative * negative = positive)',
      'For each element, compute new max and min from: element, element * prevMax, element * prevMin',
      'Update the global maximum after each step',
    ],
    starterCode: `function maxProductSubarray(nums) {
  if (nums.length === 0) return 0;
  let maxProduct = nums[0];
  let currentMax = nums[0];
  let currentMin = nums[0];
  // Iterate from index 1
  // YOUR CODE HERE

  return maxProduct;
}`,
    solutionCode: `function maxProductSubarray(nums) {
  if (nums.length === 0) return 0;
  let maxProduct = nums[0];
  let currentMax = nums[0];
  let currentMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const candidates = [nums[i], nums[i] * currentMax, nums[i] * currentMin];
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
    id: 'js-deep-equals',
    title: 'Deep Equality Check',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Implement deep equality comparison for nested objects, arrays, and primitives using recursive structural traversal. Deep equals is essential for testing assertions, React shouldComponentUpdate, state comparison, and implementing custom equality logic.',
    instructions: [
      'Handle primitives: use === for direct comparison',
      'Handle null: null === null is true, null vs object is false',
      'Handle arrays: same length and all elements deeply equal',
      'Handle objects: same keys and all values deeply equal',
    ],
    starterCode: `function deepEquals(a, b) {
  // Handle primitives and null
  // YOUR CODE HERE

  // Handle arrays
  // YOUR CODE HERE

  // Handle objects
  // YOUR CODE HERE
}`,
    solutionCode: `function deepEquals(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => deepEquals(a[key], b[key]));
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
    id: 'js-merge-intervals',
    title: 'Merge Overlapping Intervals',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Merge overlapping intervals by sorting by start time and greedily extending overlapping ranges. Interval merging is used in calendar systems, resource scheduling, genomics range merging, and is one of the most commonly asked greedy algorithm interview problems.',
    instructions: [
      'Sort intervals by start time',
      'Initialize merged array with the first interval',
      'For each subsequent interval, check if it overlaps with the last merged interval',
      'If overlap: extend the end of the last merged interval; otherwise push new interval',
    ],
    starterCode: `function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  // Merge overlapping intervals
  // YOUR CODE HERE

  return merged;
}`,
    solutionCode: `function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
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
    id: 'js-insert-interval',
    title: 'Insert Interval',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Insert a new interval into a sorted non-overlapping list and merge any resulting overlaps using a three-phase approach. Insert interval builds on merge intervals and tests the ability to handle before, during, and after overlap phases in a single pass.',
    instructions: [
      'Add intervals that end before newInterval starts (no overlap)',
      'Merge all intervals that overlap with newInterval',
      'Add remaining intervals that start after newInterval ends',
    ],
    starterCode: `function insertInterval(intervals, newInterval) {
  const result = [];
  let i = 0;
  // Add all intervals ending before newInterval starts
  // YOUR CODE HERE

  // Merge overlapping intervals
  // YOUR CODE HERE

  // Add remaining intervals
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function insertInterval(intervals, newInterval) {
  const result = [];
  let i = 0;

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
    id: 'js-event-emitter',
    title: 'Simple Event Emitter',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Build a simple event emitter with on, off, and emit methods implementing the observer/pub-sub pattern. Event emitters are the backbone of Node.js EventEmitter, browser DOM events, React event systems, and any loosely coupled component architecture.',
    instructions: [
      'on(event, fn): register a listener for the event',
      'off(event, fn): remove a specific listener',
      'emit(event, ...args): call all listeners for the event with the given arguments',
      'Return an object with on, off, and emit methods',
    ],
    starterCode: `function createEmitter() {
  const listeners = {};
  // Implement on, off, emit
  // YOUR CODE HERE

  return { on, off, emit };
}`,
    solutionCode: `function createEmitter() {
  const listeners = {};

  function on(event, fn) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(fn);
  }

  function off(event, fn) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(f => f !== fn);
  }

  function emit(event, ...args) {
    if (!listeners[event]) return;
    listeners[event].forEach(fn => fn(...args));
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
    id: 'js-promise-all',
    title: 'Implement Promise.all',
    category: 'utilities',
    difficulty: 'advanced',
    description:
      'Implement Promise.all from scratch: resolve when all promises resolve, reject on the first rejection. Understanding Promise.all internals teaches concurrent promise coordination, error propagation, and is a frequently asked JavaScript interview question.',
    instructions: [
      'Return a new Promise',
      'Track resolved count and results array',
      'When all promises resolve, resolve with results in order',
      'If any promise rejects, reject immediately',
      'Handle empty array: resolve with []',
    ],
    starterCode: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const results = new Array(promises.length);
    let resolved = 0;
    // Iterate and handle each promise
    // YOUR CODE HERE
  });
}`,
    solutionCode: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    const results = new Array(promises.length);
    let resolved = 0;
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
    id: 'js-promise-race',
    title: 'Implement Promise.race',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Implement Promise.race from scratch: settle with the first promise that resolves or rejects. Promise.race teaches timeout patterns, competitive fetching, and first-response-wins strategies used in API fallbacks and performance optimization.',
    instructions: [
      'Return a new Promise',
      'Iterate over all promises',
      'The first promise to resolve or reject determines the outcome',
      'Handle empty array: the promise never settles (pending forever)',
    ],
    starterCode: `function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    // Handle each promise
    // YOUR CODE HERE
  });
}`,
    solutionCode: `function promiseRace(promises) {
  return new Promise((resolve, reject) => {
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
    id: 'js-deep-freeze',
    title: 'Deep Freeze Object',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Recursively freeze an object so that no properties at any depth can be modified using Object.freeze traversal. Deep freeze enforces immutability for configuration objects, prevents accidental mutation in shared state, and teaches recursive object traversal.',
    instructions: [
      'Use Object.freeze on the current object',
      'Iterate over all property values',
      'If a value is a non-null object, recursively freeze it',
      'Return the frozen object',
    ],
    starterCode: `function deepFreeze(obj) {
  // Freeze current object and recursively freeze nested objects
  // YOUR CODE HERE

}`,
    solutionCode: `function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach(val => {
    if (val !== null && typeof val === 'object' && !Object.isFrozen(val)) {
      deepFreeze(val);
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
    id: 'js-object-pick',
    title: 'Pick Keys from Object',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Create a new object containing only specified keys from the source, skipping missing keys. Pick is a common utility in Lodash/Ramda, used for API response shaping, form data extraction, and projecting relevant fields from complex objects.',
    instructions: [
      'Given an object and an array of keys, return a new object with only those keys',
      'If a key does not exist on the source, skip it',
      'Do not mutate the original object',
    ],
    starterCode: `function pick(obj, keys) {
  // Return new object with only the specified keys
  // YOUR CODE HERE

}`,
    solutionCode: `function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
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
    id: 'js-object-omit',
    title: 'Omit Keys from Object',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Create a new object excluding specified keys using a Set for efficient lookup. Omit is the complement of pick, used for removing sensitive fields before logging, stripping internal properties before API responses, and data sanitization.',
    instructions: [
      'Given an object and an array of keys to omit, return a new object without those keys',
      'Use a Set for efficient lookup of keys to omit',
      'Do not mutate the original object',
    ],
    starterCode: `function omit(obj, keys) {
  // Return new object excluding the specified keys
  // YOUR CODE HERE

}`,
    solutionCode: `function omit(obj, keys) {
  const omitSet = new Set(keys);
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!omitSet.has(key)) {
      result[key] = obj[key];
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
    id: 'js-flat-map',
    title: 'Implement flatMap',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Implement flatMap: map each element with a function then flatten the result by one level. FlatMap is a monad-bind operation used in functional programming, stream processing, query building, and is natively available as Array.prototype.flatMap in modern JavaScript.',
    instructions: [
      'Apply the mapping function to each element',
      'The mapping function may return arrays or single values',
      'Flatten the result by one level (concat all results)',
    ],
    starterCode: `function flatMap(arr, fn) {
  // Map then flatten one level
  // YOUR CODE HERE

}`,
    solutionCode: `function flatMap(arr, fn) {
  const result = [];
  for (const item of arr) {
    const mapped = fn(item);
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
    id: 'js-run-length-encode',
    title: 'Run-Length Encoding',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Encode a string using run-length encoding where consecutive identical characters become count + character. RLE is a simple lossless compression algorithm used in BMP images, fax machines, and as a preprocessing step for more complex compression schemes.',
    instructions: [
      'Iterate through the string tracking current character and its count',
      'When the character changes, append count + character to result',
      'Handle the last group after the loop ends',
      'Example: "aaabbc" becomes "3a2b1c"',
    ],
    starterCode: `function runLengthEncode(str) {
  if (str.length === 0) return '';
  let result = '';
  let count = 1;
  // Iterate and encode
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function runLengthEncode(str) {
  if (str.length === 0) return '';
  let result = '';
  let count = 1;
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
    id: 'js-run-length-decode',
    title: 'Run-Length Decoding',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Decode a run-length encoded string like "3a2b1c" back to "aaabbc" by parsing number-character pairs. Decoding is the inverse of encoding and teaches string parsing with multi-digit number extraction, a pattern used in many format parsers and decompressors.',
    instructions: [
      'Parse the encoded string for number-character pairs',
      'Extract the count (may be multiple digits) and the character',
      'Repeat each character by its count',
    ],
    starterCode: `function runLengthDecode(encoded) {
  let result = '';
  let i = 0;
  // Parse and decode
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function runLengthDecode(encoded) {
  let result = '';
  let i = 0;
  while (i < encoded.length) {
    let numStr = '';
    while (i < encoded.length && encoded[i] >= '0' && encoded[i] <= '9') {
      numStr += encoded[i];
      i++;
    }
    const count = parseInt(numStr, 10);
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
    id: 'js-debounce-leading',
    title: 'Debounce with Leading Edge',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Implement leading-edge debounce: fire immediately on first call, then ignore calls during the delay period. Leading debounce provides instant feedback while preventing rapid-fire execution, ideal for button click handlers and preventing double submissions.',
    instructions: [
      'On first call (no active timer), invoke the function immediately',
      'Start a timer for the delay period',
      'Ignore calls while the timer is active',
      'After the timer expires, the next call fires immediately again',
    ],
    starterCode: `function debounceLeading(fn, delay) {
  let timer = null;
  // Return debounced function
  // YOUR CODE HERE

}`,
    solutionCode: `function debounceLeading(fn, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
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
    id: 'js-decimal-to-binary',
    title: 'Decimal to Binary Conversion',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Convert a decimal integer to binary string representation by repeatedly dividing by 2 and collecting remainders. Manual base conversion teaches positional number systems, which underpin all computing, and is a common warm-up for bit manipulation problems.',
    instructions: [
      'Handle special case: 0 returns "0"',
      'Repeatedly divide by 2 and collect remainders',
      'Build the binary string from remainders in reverse order',
    ],
    starterCode: `function decimalToBinary(num) {
  if (num === 0) return '0';
  let binary = '';
  // Convert using division by 2
  // YOUR CODE HERE

  return binary;
}`,
    solutionCode: `function decimalToBinary(num) {
  if (num === 0) return '0';
  let binary = '';
  while (num > 0) {
    binary = (num % 2) + binary;
    num = Math.floor(num / 2);
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
    id: 'js-binary-to-decimal',
    title: 'Binary to Decimal Conversion',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      "Convert a binary string to decimal by processing bits left-to-right with the multiply-and-add accumulator pattern. This teaches the Horner's method for polynomial evaluation and is foundational for understanding how computers represent and parse numbers.",
    instructions: [
      'Iterate through each character of the binary string',
      'For each bit, multiply running total by 2 and add the bit value',
      'Return the final decimal number',
    ],
    starterCode: `function binaryToDecimal(binary) {
  let decimal = 0;
  // Convert binary string to decimal
  // YOUR CODE HERE

  return decimal;
}`,
    solutionCode: `function binaryToDecimal(binary) {
  let decimal = 0;
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
    id: 'js-count-bits',
    title: 'Count Set Bits (Brian Kernighan)',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      "Count the number of set bits (1s) in a number using Brian Kernighan's algorithm where n & (n-1) clears the lowest set bit. This O(k) algorithm (k = number of set bits) is more efficient than checking each bit and teaches fundamental bitwise manipulation.",
    instructions: [
      'Initialize a count to 0',
      'While n is not 0, apply n = n & (n - 1) and increment count',
      'Each iteration removes the lowest set bit',
      'Return the count',
    ],
    starterCode: `function countBits(n) {
  let count = 0;
  // Use Brian Kernighan's algorithm
  // YOUR CODE HERE

  return count;
}`,
    solutionCode: `function countBits(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1);
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
    id: 'js-is-power-of-two',
    title: 'Is Power of Two (Bit Trick)',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Check if a number is a power of 2 using the bit trick n > 0 && (n & (n-1)) === 0. Powers of 2 have exactly one set bit, so clearing it yields zero. This one-liner is used in memory allocation, hash table sizing, and fast modular arithmetic.',
    instructions: [
      'A power of 2 in binary is 1 followed by zeros: 1, 10, 100, 1000...',
      'n & (n - 1) clears the lowest set bit',
      'If n is a power of 2, n & (n - 1) === 0',
      'Also check that n > 0',
    ],
    starterCode: `function isPowerOfTwo(n) {
  // Use bit manipulation to check
  // YOUR CODE HERE

}`,
    solutionCode: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
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
    id: 'js-toggle-bit',
    title: 'Toggle the Nth Bit',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Toggle (flip) the nth bit of a number using XOR with a shifted mask: num ^ (1 << n). Bit toggling is used in feature flags, state machines, graphics rendering, and permission systems where individual bits represent boolean settings.',
    instructions: [
      'Use the XOR operator (^) to flip a specific bit',
      'Create a mask with 1 shifted left by n positions: 1 << n',
      'XOR the number with the mask to toggle that bit',
    ],
    starterCode: `function toggleBit(num, n) {
  // Toggle the nth bit using XOR
  // YOUR CODE HERE

}`,
    solutionCode: `function toggleBit(num, n) {
  return num ^ (1 << n);
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
    id: 'js-matrix-multiply',
    title: 'Matrix Multiplication',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Multiply two matrices A (m x n) and B (n x p) using three nested loops computing dot products for each result cell. Matrix multiplication is fundamental to linear algebra, graphics transformations, neural networks, and graph path counting algorithms.',
    instructions: [
      'C[i][j] = sum of A[i][k] * B[k][j] for all k',
      'A must have the same number of columns as B has rows',
      'Use three nested loops: row of A, column of B, shared dimension',
    ],
    starterCode: `function matrixMultiply(a, b) {
  const m = a.length;
  const n = b.length;
  const p = b[0].length;
  const result = Array.from({ length: m }, () => Array(p).fill(0));
  // Multiply matrices
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function matrixMultiply(a, b) {
  const m = a.length;
  const n = b.length;
  const p = b[0].length;
  const result = Array.from({ length: m }, () => Array(p).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      for (let k = 0; k < n; k++) {
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
    id: 'js-transpose-matrix',
    title: 'Transpose a Matrix',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Transpose a matrix by swapping rows and columns so element [i][j] moves to [j][i]. Matrix transpose is used in linear algebra, image rotation, data reshaping, and is the first step in clockwise rotation and many matrix decomposition algorithms.',
    instructions: [
      'If input is m x n, output is n x m',
      'result[j][i] = matrix[i][j]',
      'Create the transposed matrix with swapped dimensions',
    ],
    starterCode: `function transpose(matrix) {
  if (matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  // Build transposed matrix
  // YOUR CODE HERE

}`,
    solutionCode: `function transpose(matrix) {
  if (matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({ length: cols }, () => Array(rows).fill(0));
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
    id: 'js-object-deep-merge',
    title: 'Deep Merge Two Objects',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Deep merge two objects so nested sub-objects are recursively combined rather than overwritten. Deep merge is essential for configuration systems, theme overrides, state management reducers, and merging partial updates into complex nested structures.',
    instructions: [
      'If both values are plain objects, merge them recursively',
      'Otherwise, the value from the second object wins',
      'Arrays are NOT merged, they are replaced',
      'Return a new object (do not mutate inputs)',
    ],
    starterCode: `function deepMerge(target, source) {
  const result = { ...target };
  // Recursively merge source into result
  // YOUR CODE HERE

  return result;
}`,
    solutionCode: `function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      result[key] && typeof result[key] === 'object' && !Array.isArray(result[key]) &&
      source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key], source[key]);
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
    id: 'js-retry-async',
    title: 'Retry Async Function',
    category: 'utilities',
    difficulty: 'advanced',
    description:
      'Implement a retry wrapper that re-attempts a failing async function up to n times with delay between attempts. Retry logic is essential for resilient API calls, network fault tolerance, distributed systems, and implementing exponential backoff strategies.',
    instructions: [
      'Call the async function',
      'If it succeeds, return the result',
      'If it fails and retries remain, wait for delay ms then retry',
      'If all retries exhausted, throw the last error',
    ],
    starterCode: `async function retry(fn, retries, delay) {
  // Attempt fn up to retries+1 times
  // YOUR CODE HERE

}`,
    solutionCode: `async function retry(fn, retries, delay) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
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
    id: 'js-throttle-leading-trailing',
    title: 'Throttle with Leading and Trailing',
    category: 'utilities',
    difficulty: 'advanced',
    description:
      'Implement throttle that fires on both leading edge (immediately) and trailing edge (after interval with latest args). This full-featured throttle ensures both responsiveness and final-state capture, used in production scroll handlers and real-time input processing.',
    instructions: [
      'On the first call, invoke immediately (leading edge)',
      'During the throttle interval, save the most recent arguments',
      'When the interval expires, if there are saved arguments, invoke with them (trailing edge)',
      'Reset and allow the next call to fire as leading again',
    ],
    starterCode: `function throttle(fn, interval) {
  let lastArgs = null;
  let timer = null;
  // Return throttled function
  // YOUR CODE HERE

}`,
    solutionCode: `function throttle(fn, interval) {
  let lastArgs = null;
  let timer = null;

  function invoke() {
    if (lastArgs) {
      fn.apply(null, lastArgs);
      lastArgs = null;
      timer = setTimeout(invoke, interval);
    } else {
      timer = null;
    }
  }

  return function (...args) {
    if (!timer) {
      fn.apply(this, args);
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

export default javascriptExercises;
