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
    explanation: `Stepping through an array at a fixed stride is one of the most fundamental iteration patterns in programming. Instead of visiting every element, you increment the loop counter by 2 (or any step size), effectively sampling every other element.\n\nThe key insight is that index manipulation in the loop header (i += 2 instead of i++) controls which elements you visit. This gives O(n/2) time complexity, which simplifies to O(n), and O(n/2) space for the output array.\n\nThis pattern appears everywhere: processing alternating rows/columns in a matrix, downsampling signals in audio processing, handling even/odd indexed items differently, and interleaving operations.`,
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
    explanation: `Reverse iteration teaches you to think about arrays bidirectionally. By starting at the last index (arr.length - 1) and decrementing, you naturally produce a reversed copy without needing a built-in method.\n\nThe boundary condition is the most important detail: initialize i to arr.length - 1, and loop while i >= 0. Off-by-one errors here are the most common source of bugs in index-based loops. The time complexity is O(n) and space is O(n) for the output.\n\nReverse traversal is essential when you need to process elements from the end (like evaluating postfix expressions), when removing elements during iteration (to avoid index shifting), or when implementing in-place reversal algorithms with two pointers.`,
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
    explanation: `Variable-step iteration generalizes the fixed-increment pattern, letting you select elements at any regular interval. By parameterizing the step size, you create a reusable pattern that works for downsampling, batch selection, and strided access.\n\nThe loop structure is for(let i = 0; i < arr.length; i += step), which naturally handles edge cases: if step exceeds the array length, only the first element is returned. Time complexity is O(n/step) and space is O(n/step) for the output.\n\nThis concept extends directly to NumPy-style array slicing (arr[::step]), database OFFSET/LIMIT pagination, and processing every kth frame in video analysis.`,
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
    explanation: `Nested loops for matrix traversal establish the row-major access pattern used throughout computing. The outer loop selects each row, and the inner loop visits each column within that row, producing elements in reading order.\n\nThe time complexity is O(m * n) where m is the number of rows and n is the number of columns. This is optimal since you must visit every element. Space is O(m * n) for the flattened output.\n\nRow-major traversal is cache-friendly in most languages because arrays are stored in row-major order in memory. This pattern forms the basis for image pixel processing, spreadsheet cell iteration, game board updates, and the inner kernel of matrix multiplication algorithms.`,
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
    explanation: `Prime generation via trial division is one of the oldest algorithms in mathematics, and implementing it teaches nested-loop control flow with early termination. For each candidate number, you test divisibility by all integers from 2 up to its square root.\n\nThe square-root optimization is the key insight: if n has a factor larger than sqrt(n), it must also have a corresponding factor smaller than sqrt(n). This reduces the inner loop from O(n) to O(sqrt(n)) checks per candidate, making the overall algorithm O(n * sqrt(n)).\n\nFor generating primes up to large N, the Sieve of Eratosthenes is preferred at O(n log log n). But trial division is valuable for understanding prime testing, and primes themselves are central to RSA encryption, hash table sizing, and number theory interview problems.`,
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
    explanation: `The Fibonacci sequence is the canonical example of a recurrence relation that can be computed iteratively. Each number is the sum of the two before it, building up from known base cases fib(0)=0 and fib(1)=1.\n\nThe iterative approach runs in O(n) time and O(n) space (for storing the full sequence). This is dramatically better than naive recursion which would be O(2^n) due to recomputing the same subproblems exponentially many times.\n\nThis bottom-up iteration pattern is the foundation of dynamic programming. Once you recognize that a problem has overlapping subproblems and can be built from smaller solutions, you can apply the same iterative table-filling strategy to problems like climbing stairs, coin change, and longest common subsequence.`,
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
    explanation: `Naive recursive Fibonacci is intentionally inefficient, and understanding why is the gateway to dynamic programming. Each call branches into two subcalls, creating an exponential call tree of O(2^n) nodes because fib(k) gets recomputed at every level.\n\nThe recursive structure directly mirrors the mathematical definition: fib(n) = fib(n-1) + fib(n-2), with base cases fib(0) = 0 and fib(1) = 1. This makes the code elegant but impractical for n > 40 or so.\n\nThe real value of this exercise is motivational: once you see the exponential blowup, memoization becomes obvious. Caching results of fib(k) in a hash map collapses the tree to O(n) calls. This insight drives all of dynamic programming and appears in countless interview problems.`,
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
    explanation: `Factorial is the simplest non-trivial recursive function. It has exactly one base case (n <= 1 returns 1) and one recursive step (n * factorial(n-1)), making it the ideal introduction to recursive thinking.\n\nThe call stack grows to depth n, giving O(n) time and O(n) space. Each frame multiplies the returned value by the current n as it unwinds. This linear recursion pattern (single recursive call per frame) is the simplest form, contrasted with tree recursion (like Fibonacci) which branches.\n\nFactorial itself computes n! = n * (n-1) * ... * 1, the number of ways to arrange n distinct items. It appears in permutation counting (n!), combination formulas (n! / (k!(n-k)!)), probability calculations, and Taylor series expansions.`,
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
    explanation: `Recursive array summation teaches the fundamental pattern of decomposing a collection into "first element" plus "rest of collection." The base case is an empty array (sum = 0), and the recursive step is arr[0] + sumArray(arr.slice(1)).\n\nWhile this runs in O(n) calls, each slice creates a new array, making the actual complexity O(n^2) in both time and space due to copying. In practice, you would pass an index parameter instead of slicing to achieve true O(n) performance.\n\nThis head-plus-tail decomposition is the foundational pattern of functional programming languages like Haskell and Lisp. It generalizes to recursive map, filter, reduce, and tree traversals where you process the current element and recurse on the remainder.`,
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
    explanation: `Pre-order DFS visits the current node first, then recursively processes the left and right subtrees. This "visit before descending" order means the root always appears first in the output.\n\nThe recursion naturally uses the call stack, giving O(h) space complexity where h is the tree height (O(log n) for balanced, O(n) for skewed). Time complexity is O(n) since every node is visited exactly once.\n\nPre-order traversal is used for serializing trees (the root-first order allows easy reconstruction), copying tree structures, generating prefix expressions from expression trees, and creating a printable representation of directory structures. It is the most intuitive DFS ordering and typically the first taught.`,
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
    explanation: `In-order traversal visits the left subtree, then the current node, then the right subtree. For a Binary Search Tree, this produces elements in sorted ascending order, which is the key insight that makes in-order traversal so important.\n\nLike all DFS traversals, it runs in O(n) time and O(h) space on the call stack. The sorted output property makes in-order the natural choice for BST validation: if the output is not sorted, the tree violates BST invariants.\n\nBeyond validation, in-order traversal is used for range queries on BSTs (print all elements between a and b), computing the kth smallest element, converting a BST to a sorted doubly-linked list, and building balanced BSTs from sorted data.`,
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
    explanation: `BFS explores a tree level by level using a queue instead of recursion. You dequeue a node, process it, then enqueue its children. This guarantees that all nodes at depth d are visited before any node at depth d+1.\n\nTime complexity is O(n) and space complexity is O(w) where w is the maximum width of the tree (the largest number of nodes at any single level). For a complete binary tree, this is O(n/2) = O(n) at the last level.\n\nBFS is essential when the solution depends on distance from the root: finding the minimum depth, level-order grouping, connecting nodes at the same level, and shortest path in unweighted graphs. The queue-based iterative pattern avoids stack overflow on deep trees.`,
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
    explanation: `Binary search is the most important search algorithm, reducing a sorted array lookup from O(n) to O(log n) by eliminating half the search space each step. Compare the target to the middle element, then search the left or right half.\n\nThe critical details are correct boundary management (lo = 0, hi = arr.length - 1, loop while lo <= hi) and midpoint calculation (using (lo + hi) >>> 1 to avoid integer overflow). Getting these wrong is the source of most binary search bugs.\n\nBinary search extends far beyond simple array lookup. It applies to any monotonic function: searching on the answer space, finding boundaries, minimizing/maximizing with a feasibility check, and is the backbone of database index lookups and git bisect.`,
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
    explanation: `Linked list traversal teaches pointer-following iteration, a fundamentally different pattern from array indexing. You start at the head node and follow .next pointers until reaching null, processing each node along the way.\n\nThe traversal runs in O(n) time and O(1) extra space (or O(n) if collecting values into an array). Unlike arrays, you cannot jump to the ith element; you must walk from the head, making random access O(n).\n\nLinked list traversal is the foundation for all linked list operations: searching, insertion, deletion, reversal, and cycle detection. Understanding pointer manipulation here prepares you for more complex structures like doubly-linked lists, skip lists, and graph adjacency lists.`,
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
    explanation: `Stack operations teach LIFO (Last-In-First-Out) ordering, where push adds to the top and pop removes from the top. This simple interface enables powerful algorithmic patterns that appear throughout computer science.\n\nAll stack operations run in O(1) amortized time using an array (push/pop at the end). The key invariant is that only the most recently added element is accessible, which naturally models nested or reversible operations.\n\nStacks are everywhere: the JavaScript call stack, undo/redo systems, bracket matching, expression evaluation (postfix notation), DFS traversal (explicit stack replaces recursion), browser back-button history, and parsing nested structures like HTML or JSON.`,
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
    explanation: `Range generation creates a sequence of evenly-spaced numbers, similar to Python's range() or lodash's _.range(). The key is computing how many elements to generate: Math.ceil((end - start) / step).\n\nThis utility runs in O(n) time where n is the number of elements generated. It handles edge cases like negative steps for descending ranges and returns an empty array when the step direction contradicts the start-to-end direction.\n\nRange is a foundational utility for functional programming, replacing C-style for loops with declarative iteration. It enables patterns like range(0, n).map(fn), powers test case generation, and is the basis for more complex sequence generators like linspace in numerical computing.`,
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
    explanation: `Subset generation (power set) is the foundation of combinatorial enumeration. For each element, you have a binary choice: include it or exclude it. This creates 2^n total subsets, which you can generate recursively by branching at each element.\n\nThe recursive approach builds subsets depth-first, adding one element at each level. Time complexity is O(2^n) since that is the number of subsets, and each is copied into the result. Space complexity is O(n) for the recursion stack depth.\n\nSubset generation is used in brute-force optimization (try all subsets to find the best), feature selection in machine learning, test case enumeration, and as a subroutine in algorithms that need to examine all possible combinations of a set.`,
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
    explanation: `Combination generation (n choose k) selects k items from n without regard to order, using backtracking with a forward-only start index to avoid duplicates. You build combinations incrementally, pruning when the current combination reaches size k.\n\nThe number of results is C(n,k) = n! / (k!(n-k)!). The backtracking approach explores each possibility by adding element i, recursing with start = i+1, then removing element i. Time complexity is O(C(n,k) * k) accounting for copying each result.\n\nCombinations appear in lottery probability calculations, selecting committee members, choosing features for a model, generating test input pairs, and as the core primitive for many constraint satisfaction problems in interviews.`,
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
    explanation: `Permutation generation produces all possible orderings of a collection, where the arrangement matters. For n elements, there are n! permutations. The recursive approach picks each element as the "first" and permutes the remaining elements.\n\nThe algorithm branches n ways at the first level, n-1 at the second, and so on, naturally producing n! results. Each permutation is built by concatenating the chosen element with the permutation of the rest. Time complexity is O(n! * n) accounting for array operations.\n\nPermutations are central to brute-force search over arrangements: scheduling jobs, finding optimal routes (TSP), generating anagrams, testing all possible configurations, and cryptographic key enumeration. They are also the basis for understanding group theory in mathematics.`,
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
    explanation: `The Cartesian product of two sets pairs every element from the first with every element from the second. Using flatMap for the outer iteration and map for the inner produces all pairs in a concise functional style.\n\nThe result size is |A| * |B|, making both time and space complexity O(|A| * |B|). flatMap is crucial here because map alone would produce nested arrays, while flatMap flattens one level to give a clean array of pairs.\n\nCartesian products generate grid coordinates from row and column ranges, enumerate all test case combinations from parameter lists, create join results in databases (cross join), and form the basis for multi-dimensional combinatorial problems.`,
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
    explanation: `N-ary Cartesian product generalizes pair generation to any number of input arrays using reduce with flatMap. Starting from [[]], each new array extends every existing tuple with every value from the new array.\n\nThe result size is the product of all array lengths. The reduce approach is elegant: the accumulator holds all partial tuples, and each iteration extends them by one dimension. Time and space are O(product of all lengths * number of arrays).\n\nThis pattern is used in configuration enumeration (all combinations of settings), constraint satisfaction solvers, exhaustive test generation from parameter spaces, and SQL-style multi-table cross joins. It demonstrates how reduce can build complex structures incrementally.`,
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
    explanation: `The binomial coefficient C(n,k) counts the number of ways to choose k items from n, computed as n! / (k! * (n-k)!). The iterative multiplication approach avoids computing large factorials by canceling terms incrementally.\n\nThe key optimization is computing C(n,k) = (n * (n-1) * ... * (n-k+1)) / (k * (k-1) * ... * 1), which uses only k multiplications and divisions. This avoids overflow for moderate values and runs in O(k) time with O(1) space.\n\nBinomial coefficients appear as entries in Pascal's triangle, coefficients in polynomial expansion, probability calculations in statistics, and counting paths in grids. They are fundamental to combinatorics and arise in algorithm analysis whenever you need to count selections.`,
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
    explanation: `Memoization wraps a function with a cache so that repeated calls with the same argument return instantly from the cache instead of recomputing. This closure-based pattern is the runtime equivalent of dynamic programming.\n\nThe wrapper function checks a Map or object before calling the original function. If the argument has been seen before, it returns the cached result in O(1). Otherwise, it computes, stores, and returns the value. Space grows with the number of unique inputs cached.\n\nMemoization is used to optimize recursive algorithms (Fibonacci, tree computations), cache expensive API responses, avoid redundant DOM calculations in React (useMemo), and speed up any pure function that is called repeatedly with the same arguments.`,
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
    explanation: `Multi-argument memoization extends basic memoization by serializing all arguments into a single cache key. The simplest approach uses JSON.stringify(args), though custom key functions offer better performance for specific use cases.\n\nThe key challenge is that JavaScript objects and Maps can only use primitive keys efficiently. JSON.stringify converts arguments to a string representation, but this has edge cases with undefined, functions, and circular references. A production implementation might use a nested Map structure or WeakMap for object arguments.\n\nMulti-argument memoization is essential for caching database queries with multiple parameters, memoizing selectors in Redux (reselect), and optimizing any pure function of multiple variables in scientific computing or data processing pipelines.`,
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
    explanation: `Memoized Fibonacci demonstrates the dramatic impact of caching on recursive algorithms. By storing previously computed fib(k) values, each subproblem is solved only once, collapsing the O(2^n) naive recursion to O(n) time.\n\nThe memoization wrapper intercepts each call: if fib(k) is in the cache, return it immediately; otherwise, compute it recursively (which itself benefits from the cache) and store the result. The call tree degenerates from an exponential tree into a linear chain.\n\nThis is the canonical example motivating dynamic programming. The same pattern applies to any recursive function with overlapping subproblems: grid path counting, edit distance, coin change, and tree computations. Recognizing when memoization applies is one of the most valuable algorithmic skills.`,
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
    explanation: `Debounce delays function execution until a specified quiet period elapses after the last call. Each new call resets the timer, so the function only fires when calls stop arriving for the delay duration.\n\nThe implementation uses a closure to hold a timer ID. On each call, clearTimeout cancels any pending execution, and setTimeout schedules a new one. This gives O(1) per call, with the actual function executing at most once per burst of calls.\n\nDebounce is essential for search-as-you-type (wait until the user stops typing), window resize handlers (recalculate layout once resizing stops), auto-save features, and any scenario where you want to respond to the final intent rather than every intermediate action.`,
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
    explanation: `Throttle ensures a function executes at most once per interval, regardless of how often it is called. Unlike debounce which waits for silence, throttle guarantees regular execution during continuous activity.\n\nThe implementation tracks whether a timer is active. The first call within an interval executes immediately and starts a timer. Subsequent calls during the interval are ignored. After the interval, the next call fires immediately again. Time complexity is O(1) per call.\n\nThrottle is ideal for scroll handlers (update position at most every 100ms), mousemove tracking, rate-limiting API calls, game loop input processing, and any event that fires continuously where you want periodic responses rather than eventual response.`,
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
    explanation: `The once wrapper ensures a function executes only on its first invocation, returning the cached result for all subsequent calls. This uses a closure with a boolean flag and a stored result value.\n\nThe pattern is simple but powerful: check the flag before calling, set it before executing (to handle recursive cases), and store the return value. All subsequent calls skip execution and return the cached result in O(1) time.\n\nOnce is used for lazy initialization (compute expensive setup on first use), singleton patterns, database connection establishment, one-time event handlers (like initialization), and ensuring idempotent operations in distributed systems where retries might re-trigger the same function.`,
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
    explanation: `Chunking splits an array into groups of a specified size, with the last chunk potentially smaller. The Array.from approach computes the number of chunks as Math.ceil(length/size) and slices each one.\n\nTime complexity is O(n) since each element is copied into exactly one chunk. The Array.from with a mapping function is a clean declarative pattern: it creates the chunk count and maps each index to a slice.\n\nChunking is used in pagination (show page k of results), batch API calls (send 100 records at a time), parallel processing (distribute work across workers), rendering large lists in virtual scrolling, and splitting data for map-reduce processing.`,
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
    explanation: `Partition splits an array into exactly two groups based on a predicate: elements where the predicate returns true, and elements where it returns false. Using reduce with a [[], []] accumulator is the canonical implementation.\n\nThe reduce processes each element exactly once in O(n) time. The conditional index (predicate(val) ? 0 : 1) elegantly routes each element to the correct sub-array. Space is O(n) for the two output arrays.\n\nPartition is a more informative version of filter because it preserves both the matching and non-matching elements. It is used for separating valid/invalid form data, A/B test group assignment, splitting training/test datasets, and any binary classification of a collection.`,
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
    explanation: `Zip combines two arrays by pairing elements at the same index, like a physical zipper merging two sides tooth by tooth. The result length equals the shorter input array, naturally handling mismatched lengths.\n\nThe Array.from approach creates pairs in O(min(m,n)) time. Using Math.min for the length handles the edge case cleanly, and the index-based pairing is straightforward.\n\nZip is fundamental for correlating parallel data: pairing keys with values to create objects, combining x-coordinates with y-coordinates to create points, merging column data into rows, and iterating over multiple collections simultaneously as in Python's zip().`,
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
    explanation: `Unzip is the inverse of zip: it takes an array of pairs and separates them into two arrays. Two map operations extract the first and second elements respectively.\n\nTime complexity is O(n) with two passes over the data (one for each position). This could be done in a single pass with reduce, but the dual-map approach is clearer and the performance difference is negligible.\n\nUnzip is used for separating coordinate pairs into x and y arrays for charting, extracting keys and values from entries (inverse of Object.entries), splitting CSV column pairs, and decomposing any parallel data structure into its components for independent processing.`,
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
    explanation: `GroupBy collects elements into buckets based on a key function, creating an object where each key maps to an array of elements that produced that key. It is one of the most used data transformation utilities.\n\nThe reduce implementation processes each element once in O(n) time. For each element, the key function determines the bucket, and the element is pushed to the corresponding array. Space is O(n) for the grouped output.\n\nGroupBy is ubiquitous in data processing: grouping transactions by date, users by role, products by category, log entries by severity level, and is the conceptual equivalent of SQL GROUP BY. Libraries like Lodash feature it prominently, and Array.prototype.groupBy is being added to JavaScript natively.`,
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
    explanation: `Frequency counting tallies how many times each element appears, producing a histogram as an object mapping values to counts. This fundamental pattern uses reduce to build the count map in a single pass.\n\nThe algorithm runs in O(n) time with O(k) space where k is the number of unique elements. The pattern (counts[key] = (counts[key] || 0) + 1) is idiomatic JavaScript for incrementing a possibly-undefined counter.\n\nFrequency counting is foundational: it solves anagram detection, finds the mode of a dataset, identifies duplicate elements, enables bucket sort, validates character distributions, and is the first step in many string and array interview problems like "most common element" or "first unique character."`,
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
    explanation: `The sliding window technique maintains a fixed-size view over a sequence, advancing one element at a time. Rather than recomputing the window contents from scratch each step, you efficiently update by removing the outgoing element and adding the incoming one.\n\nCollecting all windows of size k takes O(n) time with O(k) per window for the slice operation. The overall space is O(n * k) for storing all windows, or O(k) if processing each window immediately.\n\nSliding windows power moving averages in time series analysis, substring search algorithms (like Rabin-Karp), network packet inspection, real-time analytics over data streams, and are the conceptual basis for convolutional filters in signal processing and neural networks.`,
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
    explanation: `Deep flattening recursively unwraps nested arrays to a specified depth, collecting all leaf values into a single-level array. The depth parameter controls how many levels of nesting to remove.\n\nThe recursive approach processes each element: if it is an array and depth > 0, recurse with depth-1; otherwise, include it directly. Time complexity is O(n) where n is the total number of elements across all nesting levels. Stack depth equals the maximum nesting.\n\nDeep flattening normalizes hierarchical data structures: collapsing nested DOM query results, processing recursive API responses, flattening multi-level category trees, and preparing deeply structured JSON for tabular display or database insertion.`,
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
    explanation: `Left rotation shifts all elements toward the beginning by k positions, wrapping elements that fall off the left end back to the right. The slice-and-concatenate approach (arr.slice(k).concat(arr.slice(0, k))) achieves this elegantly in O(n).\n\nThe key insight is that rotation splits the array at position k and swaps the two halves. Handling k > arr.length requires modular arithmetic (k % arr.length) to normalize the rotation amount.\n\nArray rotation appears in cyclic buffer implementations, circular queue operations, string rotation problems (checking if one string is a rotation of another), and cryptographic ciphers. The three-reversal algorithm provides an in-place O(n) alternative.`,
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
    explanation: `Interleaving merges two arrays by alternating elements: take one from the first, one from the second, and so on. When arrays differ in length, remaining elements from the longer array are appended.\n\nThe algorithm iterates up to the length of the longer array, pushing from each array if elements remain. Time complexity is O(m + n) where m and n are the array lengths.\n\nInterleaving is used in merge operations, round-robin scheduling, creating alternating visual patterns, combining audio channels, riffle shuffle simulation, and constructing test data that alternates between different types of values.`,
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
    explanation: `Iterative binary search uses a while loop with lo/hi pointers instead of recursion, avoiding stack overhead. The loop halves the search space each iteration by comparing the middle element to the target.\n\nThe critical implementation detail is using >>> 1 for the midpoint calculation to avoid integer overflow (though JavaScript uses floating-point, this is still good practice). Time complexity is O(log n) and space is O(1) since no recursion stack is used.\n\nIterative binary search is preferred in production code because it avoids potential stack overflow on huge datasets and has slightly less overhead. It is the form used in standard library implementations and is the version interviewers expect you to write fluently.`,
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
    explanation: `Binary search for insertion point finds where a target should be placed to keep the array sorted. This is equivalent to the lower bound (bisect_left) operation, returning the first index where arr[i] >= target.\n\nThe key difference from standard binary search is the boundary handling: when the target is not found, lo converges to the correct insertion index rather than returning -1. Time complexity remains O(log n) with O(1) space.\n\nInsertion point search is used in maintaining sorted arrays, implementing sorted containers, computing rank statistics, and is the building block for operations like counting elements in a range or finding the floor/ceiling of a value.`,
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
    explanation: `Merging two sorted arrays uses a two-pointer technique: compare elements at the front of each array, take the smaller one, and advance that pointer. After one array is exhausted, append the remainder of the other.\n\nThis runs in O(m + n) time and O(m + n) space for the merged result. The comparison-based merge maintains stability (equal elements preserve their original order) and is the core subroutine of merge sort.\n\nSorted array merging is fundamental to merge sort (dividing and reconquering), database merge joins, combining sorted search results from multiple sources, k-way merge for external sorting, and maintaining sorted event timelines in simulation systems.`,
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
    explanation: `Queue operations implement FIFO (First-In, First-Out) ordering where enqueue adds to the back and dequeue removes from the front. This is the natural ordering for processing items in arrival sequence.\n\nUsing push for enqueue and shift for dequeue on JavaScript arrays is simple but shift is O(n) due to re-indexing. For production use, a linked-list queue or circular buffer gives O(1) dequeue. Space complexity is O(n) for stored elements.\n\nQueues are fundamental to BFS traversal, task scheduling (print queues, job queues), message passing systems (RabbitMQ, SQS), the JavaScript event loop microtask queue, and any scenario requiring fair, ordered processing of arriving items.`,
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
    explanation: `Converting an edge list to an adjacency list is the standard first step in graph algorithms. Each node maps to an array of its neighbors, enabling O(degree) neighbor iteration instead of O(E) edge scanning.\n\nFor undirected graphs, each edge [u,v] creates entries in both graph[u] and graph[v]. The nullish coalescing assignment (??=) initializes empty arrays on first access. Construction is O(V + E) time and space.\n\nAdjacency lists are the preferred representation for sparse graphs (most real-world graphs). They are the input format for BFS, DFS, Dijkstra, topological sort, and virtually every graph algorithm. Understanding this representation is a prerequisite for graph problem solving.`,
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
    explanation: `Graph BFS explores nodes level by level outward from a starting node, using a queue and a visited set to avoid revisiting nodes. This guarantees that each node is discovered at its minimum distance from the source.\n\nTime complexity is O(V + E) since each vertex is enqueued once and each edge is examined once. Space is O(V) for the visited set and queue. Adding to visited before enqueuing (rather than when dequeuing) is critical to avoid duplicate queue entries.\n\nGraph BFS finds shortest paths in unweighted graphs, computes connected components, solves puzzle states (like sliding puzzles), powers social network friend-of-friend queries, and implements web crawlers that explore pages by link distance.`,
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
    explanation: `Graph DFS explores as deeply as possible along each branch before backtracking, using either recursion or an explicit stack with a visited set. This depth-first exploration naturally discovers all reachable nodes.\n\nTime complexity is O(V + E) and space is O(V) for the visited set plus O(V) for the stack/recursion depth in the worst case. DFS explores a different order than BFS, prioritizing depth over breadth.\n\nDFS is used for cycle detection, topological sorting, finding connected/strongly-connected components, maze solving, and as the foundation for backtracking algorithms. In many graph problems, DFS is simpler to implement than BFS and uses less memory on narrow, deep graphs.`,
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
    explanation: `Trie insertion builds a character-by-character tree structure where each node represents a prefix. Walking from the root to any node spells out the prefix formed by the edge labels along the path.\n\nInserting a word of length L takes O(L) time by creating child nodes for each character as needed and marking the terminal node with a sentinel ($ = true). Space depends on the total character count across all words, with shared prefixes saving space.\n\nTries power autocomplete systems, spell checkers, IP routing tables (longest prefix match), dictionary lookups in word games, and T9 keyboard prediction. The prefix-sharing property makes them far more space-efficient than storing all strings independently when there is significant overlap.`,
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
    explanation: `Function composition chains multiple functions right-to-left so that compose(f, g, h)(x) computes f(g(h(x))). Using reduceRight processes functions from the last to the first, building the computation pipeline.\n\nComposition runs each function once, so time complexity is O(k) where k is the number of functions. The key insight is that reduceRight applies the innermost function first, matching the mathematical notation f . g . h.\n\nComposition is a cornerstone of functional programming, enabling point-free style and reusable transformation pipelines. It is used in Redux middleware chains, Express.js middleware stacking, data transformation pipelines, and anywhere you want to build complex behavior from simple, composable units.`,
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
    explanation: `Pipe is left-to-right function composition: pipe(f, g, h)(x) computes h(g(f(x))). Using reduce processes functions in the order they are listed, which many developers find more readable than right-to-left compose.\n\nLike compose, pipe has O(k) time complexity for k functions. The difference is purely directional: reduce applies functions left-to-right while reduceRight applies them right-to-left. The two are interchangeable by reversing the function list.\n\nPipe is popular in data processing (RxJS pipe operator, Node streams), build tool chains (gulp), command-line piping (conceptually), and is the basis for the proposed pipeline operator (|>) in JavaScript. It makes data flow explicit and sequential.`,
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
    explanation: `Currying transforms a multi-argument function into a chain of single-argument functions, so f(a, b, c) becomes f(a)(b)(c). The curried function collects arguments until enough are provided, then calls the original.\n\nThe recursive implementation returns a new function if fewer arguments than the function's arity have been collected, or calls the original function when all arguments are present. Partial application falls out naturally: curry(f)(a) returns a specialized function awaiting the remaining arguments.\n\nCurrying enables elegant partial application, function composition with fixed parameters, creating specialized validators from generic ones, and point-free programming. It is foundational in functional programming languages and widely used in React for event handler factories.`,
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
    explanation: `UniqueBy removes duplicates based on a key function rather than strict equality, keeping the first occurrence of each key. A Set tracks seen keys and filters out subsequent elements with the same key.\n\nThe algorithm runs in O(n) time with O(k) space for the Set where k is the number of unique keys. Using a Set for seen-key tracking gives O(1) lookup per element.\n\nUniqueBy is essential when deduplicating objects: removing duplicate users by ID, keeping the first product per category, deduplicating search results by URL, and any scenario where identity is determined by a derived key rather than the entire value.`,
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
    explanation: `Array difference returns elements present in the first array but not in the second, using a Set for efficient exclusion lookup. This implements the set-theoretic difference operation A - B.\n\nCreating the Set from the second array takes O(m) time, and filtering the first array takes O(n) time with O(1) per lookup, giving O(n + m) overall. Space is O(m) for the exclusion Set.\n\nDifference is used for finding new items (what was added since last sync), computing changelists, identifying missing elements, filtering blacklisted values, and implementing set operations for data reconciliation between systems.`,
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
    explanation: `Array intersection returns elements present in both arrays using a Set for efficient membership testing. This implements the set-theoretic intersection A AND B.\n\nBuilding the Set from one array and filtering the other gives O(n + m) time. For optimal performance, build the Set from the smaller array to minimize space usage.\n\nIntersection finds common elements between datasets: mutual friends in social networks, common tags between articles, shared features between products, overlapping time ranges, and is used in search engines to combine results from multiple index lookups (conjunctive queries).`,
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
    explanation: `TakeWhile collects elements from the start of an array while a predicate holds true, stopping at the first failure. Using findIndex to locate the first failing element, then slicing up to that point, gives a clean implementation.\n\nThe findIndex scan runs in O(n) worst case, and the slice is O(k) where k is the number of taken elements. If all elements pass, findIndex returns -1 and the entire array is returned.\n\nTakeWhile is a lazy evaluation primitive from functional programming. It is useful for reading the valid prefix of sorted data, processing log entries until a break condition, consuming tokens until a delimiter, and implementing early termination in stream processing.`,
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
    explanation: `DropWhile skips elements from the start while a predicate holds, returning everything from the first failure onward. It is the complement of takeWhile: dropWhile(p) + takeWhile(p) reconstructs the original array.\n\nLike takeWhile, it uses findIndex to locate the transition point, then slices from that index to the end. Time complexity is O(n) for the scan plus O(n-k) for the slice.\n\nDropWhile is used for skipping headers in data files, ignoring leading whitespace or noise, finding where interesting data begins in a sorted stream, and implementing iterator protocols that need to fast-forward past a known prefix.`,
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
    explanation: `Random sampling without replacement selects n distinct elements using a partial Fisher-Yates shuffle. For each position 0 to n-1, a random element from the unprocessed portion is swapped into place.\n\nThe partial shuffle runs in O(n) time (not O(arr.length)), making it efficient even for selecting a few elements from a large array. It uses O(arr.length) space for the copy to avoid mutating the input.\n\nFisher-Yates sampling is used in A/B test user assignment, Monte Carlo simulation, randomized algorithms (QuickSort pivot selection), creating random training/test splits in machine learning, and card dealing in games.`,
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
    explanation: `Compact removes all falsy values from an array using filter(Boolean). JavaScript has six falsy values: false, 0, "" (empty string), null, undefined, and NaN. Boolean as a filter predicate coerces each value and keeps only truthy ones.\n\nThis elegant one-liner runs in O(n) time. The Boolean constructor, when called as a function, performs the same type coercion as an if statement, making it a perfect predicate for filter.\n\nCompact is a data-cleaning utility used for stripping empty form fields before submission, removing null entries from parsed CSV data, cleaning up optional values from API responses, and preparing arrays for display where empty slots should be invisible.`,
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
    explanation: `CountBy groups and counts elements using a custom key function, producing a histogram keyed by the function's return value. It extends basic frequency counting with the flexibility to count by any derived property.\n\nThe reduce implementation runs in O(n) time, applying the key function to each element and incrementing the corresponding count. Space is O(k) for k unique keys.\n\nCountBy powers analytics dashboards: counting users by country, orders by status, errors by type, and any categorical aggregation. It is the counting variant of groupBy and corresponds to SQL's SELECT key, COUNT(*) GROUP BY key pattern.`,
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
    explanation: `SumBy aggregates numeric values extracted from array elements by a function, using reduce to accumulate the total. It abstracts the common pattern of summing a specific property across objects.\n\nThe reduce runs in O(n) time with O(1) space. The value function extracts the numeric field, and the accumulator sums them. Starting with 0 handles empty arrays correctly.\n\nSumBy is used for computing order totals from line items, calculating portfolio value from stock positions, aggregating scores across categories, and any scenario where you need to total a specific numeric property across a collection of objects.`,
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
    explanation: `MaxBy finds the element with the highest value for a given key function, returning the original element rather than just the key value. Reduce without an initial value starts with the first element as the candidate.\n\nThe reduce comparison runs in O(n) time with O(1) space. Calling keyFn twice per comparison (on the current max and the candidate) can be optimized by caching, but for most use cases the simpler code is preferred.\n\nMaxBy is used for finding the top scorer, most expensive product, latest timestamp, highest-priority task, or any "best by criteria" query. It avoids the need to sort the entire array when you only need the single maximum element.`,
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
    explanation: `Trie search traverses a prefix tree character by character to determine if a complete word exists. After navigating to the terminal node, checking the $ marker distinguishes complete words from mere prefixes.\n\nSearch runs in O(L) time where L is the word length, with O(1) per character lookup (assuming a hash-map-like child structure). This is independent of how many words are stored in the trie.\n\nTrie search is the read operation that makes tries practical: it powers dictionary validation in spell checkers, word existence checks in Scrabble/Wordle solvers, exact-match lookup in autocomplete systems, and routing table longest-prefix matching in network routers.`,
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
    explanation: `This exercise teaches you to produce a linear ordering of nodes in a directed acyclic graph (DAG) such that every edge u->v has u appearing before v. It implements Kahn's BFS-based algorithm, one of the two standard approaches to topological sorting.\n\nThe algorithm works in three phases. First, compute the in-degree of every node by counting how many edges point to it. Second, initialize a queue with all nodes that have in-degree 0, meaning they have no dependencies. Third, process the queue by removing a node, adding it to the result, and decrementing the in-degree of all its neighbors. When a neighbor's in-degree reaches 0, it enters the queue. This processes all nodes in O(V + E) time.\n\nTopological sort is essential for dependency resolution in build systems like Make and Webpack, course scheduling where prerequisites must come first, task ordering in project management, package managers resolving installation order, and compilation dependency graphs. If the result contains fewer nodes than the graph, a cycle exists, which can be used for cycle detection in directed graphs.`,
  },

  // ========== ITERATION PATTERNS (Two Pointers, Sliding Window, Prefix, etc.) ==========
  {
    id: 'js-two-pointer-palindrome',
    title: 'Two-Pointer Palindrome Check',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Check if an array is a palindrome using two pointers converging from opposite ends in O(n) time. The two-pointer converging pattern is a versatile interview technique also used for two-sum on sorted arrays, container with most water, and string validation.',
    explanation: `The two-pointer palindrome check converges pointers from both ends of the array, comparing elements as they move inward. If all pairs match, the array reads the same forwards and backwards.\n\nThis runs in O(n/2) = O(n) time with O(1) space, making it optimal for palindrome verification. Early termination on the first mismatch provides best-case O(1) performance.\n\nThe converging two-pointer technique extends far beyond palindromes. It solves two-sum on sorted arrays (move pointers based on sum comparison), container with most water, trapping rain water, and any problem where processing from both ends simultaneously provides useful information.`,
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
    explanation: `Removing duplicates from a sorted array uses slow/fast same-direction pointers. The slow pointer marks the write position while the fast pointer scans ahead, only writing when a new distinct value is found.\n\nThis achieves O(n) time with O(1) extra space by modifying the array in-place. The sorted property guarantees that duplicates are adjacent, so a single forward pass suffices.\n\nThe slow/fast pointer technique is a fundamental in-place modification pattern. It applies to removing specific values, compacting arrays, partitioning by a condition, and the classic "move zeroes to end" problem. It is one of the most commonly tested patterns in coding interviews.`,
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
    explanation: `The fixed-size sliding window finds the maximum sum of k consecutive elements by maintaining a running sum. After computing the initial window, each step adds the entering element and subtracts the leaving element.\n\nThis O(n) approach avoids the naive O(n*k) solution of recomputing each window sum from scratch. The sliding update windowSum += arr[i] - arr[i-k] is the key optimization.\n\nFixed-size sliding windows appear in moving average calculations, maximum/minimum over rolling periods, network throughput monitoring, finding the best k-day stock performance, and as the basis for more complex variable-size window problems.`,
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
    explanation: `The variable-size sliding window finds the shortest subarray with sum >= target by expanding the right end and shrinking the left end when the condition is met. This expand-then-shrink pattern achieves O(n) time.\n\nThe key insight is that the left pointer only moves forward, so despite the nested while loop, each element is added and removed at most once. This amortized analysis proves the O(n) bound. Space is O(1).\n\nVariable-size windows solve minimum-length substring problems, bandwidth allocation windows, smallest range covering elements from multiple lists, and any optimization problem where you need the shortest contiguous segment satisfying a constraint.`,
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
    explanation: `A prefix sum array stores cumulative sums where prefix[i] = sum of arr[0..i]. This O(n) preprocessing enables O(1) range sum queries: sum(i,j) = prefix[j] - prefix[i-1].\n\nBuilding the prefix array is a single pass: each element is the previous prefix plus the current value. The elegance lies in turning any range sum query from O(k) (summing k elements) to O(1) (one subtraction).\n\nPrefix sums are used in subarray sum problems (finding subarrays summing to a target), image processing (summed area tables for fast box filters), competitive programming, equilibrium index problems, and any scenario requiring repeated range sum queries on static data.`,
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
    explanation: `Product Except Self builds an output array where each element is the product of all other elements, without using division. Two passes handle this: a left-to-right pass computes prefix products, and a right-to-left pass multiplies in suffix products.\n\nThe two-pass approach runs in O(n) time and O(n) space (for the output). The no-division constraint avoids issues with zero elements and demonstrates the power of prefix/suffix decomposition.\n\nThis problem is a popular interview question that tests creative thinking beyond the obvious division approach. The prefix/suffix decomposition pattern applies broadly: computing prefix GCDs, suffix maximums, and any operation where you need "aggregate of everything except the current element."`,
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
    explanation: `A difference array enables O(1) range updates: to add a value v to all elements in range [l, r], set diff[l] += v and diff[r+1] -= v. Reconstructing the array requires a prefix sum pass over the difference array.\n\nMultiple range updates cost O(1) each, and the final reconstruction is O(n). This beats the naive O(n) per update when many updates are applied before reading. Total time is O(updates + n).\n\nDifference arrays are used in competitive programming for bulk range updates, booking systems (add capacity over time ranges), genomics (marking regions of interest), and flight capacity problems where many overlapping reservations modify the same availability array.`,
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
    explanation: `This exercise teaches Kadane's algorithm for finding the maximum sum of any contiguous subarray in O(n) time. It is the quintessential introduction to dynamic programming and demonstrates the critical insight of tracking local versus global optima.\n\nThe algorithm maintains two variables: currentSum (the best subarray ending at the current position) and maxSum (the best seen overall). At each element, it decides whether to extend the existing subarray or start a new one using Math.max(arr[i], currentSum + arr[i]). If the running sum drops below the current element alone, it is better to restart. The global maximum is updated after each step. Initializing both to arr[0] correctly handles all-negative arrays by selecting the least negative element.\n\nKadane's algorithm is one of the most frequently asked interview questions and appears in problems involving maximum profit from stock prices, maximum circular subarray sum, maximum product subarray, and 2D maximum sum rectangle (using Kadane's as a subroutine). The local-vs-global optimum tracking pattern it teaches is a fundamental dynamic programming concept that applies to many optimization problems beyond subarray sums.`,
  },
  {
    id: 'js-dutch-national-flag',
    title: 'Dutch National Flag Partition',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Partition an array into three sections (less than, equal to, greater than pivot) in a single O(n) pass using three pointers. The Dutch National Flag algorithm is the partition step in three-way quicksort and is used to sort arrays with few distinct values efficiently.',
    explanation: `The Dutch National Flag algorithm partitions an array into three sections around a pivot value using three pointers: low, mid, and high. Elements less than the pivot go left, equal stay in the middle, and greater go right.\n\nThe algorithm runs in O(n) time with O(1) space, making a single pass. The mid pointer scans forward while low and high converge from the edges. This three-way partition is more efficient than two separate passes.\n\nThis algorithm is used in quicksort optimization (handling duplicates efficiently), color sorting, database query optimization for three-valued predicates, and any classification problem with exactly three categories. It was named by Dijkstra after the three colors of the Dutch flag.`,
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
    explanation: `This exercise teaches Floyd's cycle detection algorithm (tortoise and hare) for detecting cycles in a linked list structure using O(1) space. The exercise simulates a linked list with an array where each value is the index of the next node, with -1 indicating the end.\n\nThe algorithm uses two pointers: slow advances one step at a time and fast advances two steps. If there is no cycle, the fast pointer will reach -1 (end of list) first. If there is a cycle, the fast pointer will eventually lap the slow pointer and they will meet at the same index. This works because in a cycle, the fast pointer closes the gap by one position per step, guaranteeing they meet within at most one full cycle traversal.\n\nFloyd's algorithm is essential for linked list interview problems including finding the start of a cycle (by resetting one pointer to the head after detection), finding the middle of a linked list (when fast reaches the end, slow is at the middle), and detecting cycles in functional value sequences. It is also used in Pollard's rho algorithm for integer factorization and in detecting infinite loops in state machines or iterative computations.`,
  },
  {
    id: 'js-merge-in-place',
    title: 'Merge Two Sorted Arrays In-Place',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Merge two sorted arrays in-place by writing from the end to avoid overwriting unprocessed elements. This backward-merge technique uses O(1) extra space and is a classic interview problem that tests understanding of pointer manipulation in constrained memory.',
    explanation: `In-place merging of two sorted arrays without extra space uses the technique of placing elements from the end of the destination array. Starting from the last positions of both arrays, compare and place the larger element at the back.\n\nThis approach runs in O(m + n) time with O(1) extra space (assuming the first array has enough capacity). Working backwards prevents overwriting unprocessed elements.\n\nIn-place merge is used in merge sort optimization (avoiding auxiliary arrays), combining sorted database results with limited memory, and embedded systems where memory allocation is restricted. Understanding backwards merging is key to efficient in-place algorithms.`,
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
    explanation: `Zigzag (snake) traversal reads a matrix row by row, alternating direction each row: left-to-right for even rows, right-to-left for odd rows. This produces a continuous path that snakes through the grid.\n\nThe algorithm runs in O(m * n) time visiting each element once. A boolean flag or row-index parity determines the direction, and the row is reversed (or iterated backwards) for odd rows.\n\nZigzag traversal is used in image processing (some compression schemes like JPEG use zigzag scanning of DCT coefficients), CNC machine path planning (minimizing direction changes), and printing patterns in matrix-related interview questions.`,
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
    explanation: `Spiral traversal reads a matrix in a clockwise spiral: right across the top, down the right side, left across the bottom, up the left side, then inward. Four boundary variables (top, bottom, left, right) track the shrinking perimeter.\n\nTime complexity is O(m * n) since every element is visited once. The four boundaries are adjusted inward after each direction is completed. Careful boundary checks prevent revisiting or out-of-bounds access.\n\nSpiral order is a classic matrix interview problem that tests careful boundary management. It appears in matrix rotation problems, space-filling curve generation, and as a component of more complex matrix manipulation algorithms.`,
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
    explanation: `Diagonal traversal visits matrix elements along anti-diagonals (top-right to bottom-left). For an m*n matrix, there are m+n-1 diagonals, each defined by a constant sum of row and column indices.\n\nThe algorithm iterates over diagonals 0 to m+n-2, computing the starting position for each diagonal and walking diagonally. Time complexity is O(m * n) with O(1) extra space.\n\nDiagonal traversal appears in image processing (diagonal filters), chess and game board analysis (diagonal threats), JPEG coefficient ordering, and matrix problems requiring non-standard access patterns.`,
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
    explanation: `In-place matrix rotation by 90 degrees clockwise uses a two-step approach: first transpose (swap rows and columns), then reverse each row. This elegantly achieves the rotation without extra space.\n\nBoth steps run in O(n^2) for an n*n matrix, giving O(n^2) total. The transpose swaps matrix[i][j] with matrix[j][i] for j > i (upper triangle), and row reversal is O(n) per row.\n\nMatrix rotation is a classic interview problem that tests in-place transformation skills. It is used in image rotation, game board manipulation (Tetris piece rotation), and computer graphics. Understanding that rotation = transpose + reverse is a powerful geometric insight.`,
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
    explanation: `Lower bound finds the first index where arr[i] >= target using binary search with lo/hi pointers. When arr[mid] < target, search right (lo = mid+1); otherwise search left (hi = mid). The answer is lo when the loop exits.\n\nThis runs in O(log n) time and O(1) space. The boundary at hi = arr.length (not arr.length - 1) allows the result to indicate "target is larger than all elements."\n\nLower bound is the most versatile binary search variant. Combined with upper bound, it counts occurrences, finds ranges, and implements multiset operations. It is the foundation of C++ lower_bound, Python bisect_left, and is the binary search form most commonly needed in interviews.`,
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
    explanation: `Upper bound finds the first index where arr[i] > target (strictly greater), complementing lower bound. The only difference is using <= instead of < in the comparison, which pushes the boundary past equal elements.\n\nLike lower bound, it runs in O(log n) time and O(1) space. The pair of lower and upper bound together defines the range [lower, upper) of elements equal to target.\n\nUpper bound combined with lower bound enables O(log n) range queries on sorted arrays: counting occurrences (upper - lower), checking existence, and finding the last occurrence (upper - 1). This pair is the building block for sorted container operations.`,
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
    explanation: `Integer square root via binary search demonstrates the "binary search on the answer" meta-technique. Instead of searching an array, you search over possible answer values [0, n] for the largest x where x*x <= n.\n\nThe search space halves each iteration, giving O(log n) time and O(1) space. The termination condition returns hi (the right pointer), which is the last value satisfying x*x <= n after the loop converges.\n\nBinary search on the answer is a powerful paradigm that applies whenever you can verify a candidate answer efficiently. It solves optimization problems like minimizing maximum allocation, finding capacity thresholds, and computing roots of monotonic functions.`,
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
    explanation: `Searching a rotated sorted array requires identifying which half is properly sorted and checking if the target falls within that sorted range. At each step, one half is guaranteed to be sorted, enabling binary search decisions.\n\nThe algorithm maintains O(log n) time by eliminating half the search space each iteration. The key insight is comparing arr[lo] with arr[mid]: if arr[lo] <= arr[mid], the left half is sorted; otherwise the right half is sorted.\n\nThis is one of the most frequently asked binary search interview problems. It tests the ability to reason about partially sorted data and make correct binary decisions in non-standard search scenarios. Variations include finding the minimum and handling duplicates.`,
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
    explanation: `QuickSelect finds the kth smallest element in O(n) average time using the partition subroutine from quicksort. After partitioning, the pivot is in its final sorted position; recurse only on the side containing the target index.\n\nAverage time is O(n) because each partition step processes a geometrically shrinking subarray. Worst case is O(n^2) with adversarial pivots, mitigated by random pivot selection or median-of-medians.\n\nQuickSelect is the standard algorithm for order statistics: finding medians, percentiles, and top-K elements without full sorting. It is used in database query optimization, statistical analysis, and is the algorithm behind NumPy's partition function.`,
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
    explanation: `Exponential search finds an element by first doubling a bound (1, 2, 4, 8, ...) until it exceeds the target, then binary searching within the found range. This combines O(log n) search with unbounded range finding.\n\nThe doubling phase takes O(log i) where i is the target's position, and the binary search within [bound/2, bound] takes O(log i) as well. Total time is O(log i), which is optimal when the target is near the beginning of a very large or unbounded array.\n\nExponential search is ideal for unbounded or infinite sorted sequences (like searching in an infinitely scrolling list), and when elements near the beginning are more likely targets. It also teaches the doubling technique used in dynamic array resizing.`,
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
    explanation: `Peak finding uses binary search on a non-sorted array by always moving toward the higher neighbor. If arr[mid] < arr[mid+1], a peak must exist to the right; otherwise it exists at mid or to the left.\n\nThis converges in O(log n) time because each step eliminates half the search space. The correctness relies on the boundary assumption that arr[-1] = arr[n] = -infinity, guaranteeing at least one peak exists.\n\nPeak finding demonstrates that binary search applies beyond sorted data, requiring only a "gradient" property. It is used in finding local optima, bitonic search, and optimization problems where you can determine which direction improves the objective function.`,
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
    explanation: `Searching a row-and-column-sorted matrix from the top-right corner eliminates one row or column per step. If the current value is too large, move left; if too small, move down. This staircase path reaches the target or exhausts the matrix.\n\nTime complexity is O(m + n) since each step moves left or down, and you can make at most m + n such moves. Space is O(1). This is optimal for matrices sorted in both dimensions.\n\nThis elegant elimination technique is a popular interview problem. It applies to searching any structure where one axis is ascending and the other provides a second ordering, and teaches the concept of exploiting multiple sorted dimensions simultaneously.`,
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
    explanation: `Counting occurrences in a sorted array uses two binary searches: lower bound (first index >= target) and upper bound (first index > target). The count is simply upper - lower, running in O(log n).\n\nThis is far more efficient than linear scanning for large arrays. The technique generalizes: any range query on a sorted array can be answered with two binary searches.\n\nThis pattern is used in database range queries, counting elements in a range, implementing multiset size queries, and is a common interview follow-up to basic binary search. It demonstrates the power of combining lower and upper bound as a pair.`,
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
    explanation: `Finding the minimum in a rotated sorted array uses binary search by comparing the mid element with the right boundary. If arr[mid] > arr[hi], the minimum is in the right half; otherwise it is in the left half including mid.\n\nThis runs in O(log n) time and O(1) space. The key insight is that the minimum is the rotation point where the sorted order breaks, and comparing with arr[hi] determines which side the break is on.\n\nThis problem frequently appears as an interview variant of rotated array problems. It teaches boundary analysis in binary search and is a stepping stone to the harder "search in rotated sorted array" problem.`,
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
    explanation: `Max heap insertion mirrors min heap insertion but maintains the opposite invariant: every parent is greater than or equal to its children. The bubble-up swaps with the parent while the inserted value is larger.\n\nLike min heap, insertion is O(log n) time. The only difference is the comparison direction: swap when heap[parent] < heap[i] instead of heap[parent] > heap[i].\n\nMax heaps are used for extracting the largest element efficiently, implementing max-priority queues, finding the kth largest element, heap sort (which uses a max heap to sort in ascending order), and scheduling the highest-priority task first.`,
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
    explanation: `This exercise teaches you to extract the minimum element from a min heap and restore the heap property by sifting the replacement element down from the root. Extract-min is the complement of insert and together they form the complete priority queue interface.\n\nThe algorithm saves the root (the minimum), replaces it with the last element in the array (via pop), then sifts that element down. At each level, it compares the current node with both its left child (2i + 1) and right child (2i + 2), finding the smallest of the three. If a child is smaller, they swap and the process continues from the child's position. When the current node is smaller than both children, the heap property is restored. This takes O(log n) time since the element descends at most through the height of the tree.\n\nExtract-min is the critical operation in Dijkstra's shortest path algorithm (always process the nearest unvisited node), Prim's minimum spanning tree algorithm, event-driven simulations that process the earliest event, Huffman encoding that merges the two lowest-frequency nodes, and heapsort which repeatedly extracts the minimum to build sorted output. Mastering both insert (bubble up) and extract (sift down) gives you the complete toolkit for implementing and understanding heap-based algorithms.`,
  },
  {
    id: 'js-lru-cache',
    title: 'LRU Cache with Map',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement a Least Recently Used cache using JavaScript Map which preserves insertion order for O(1) get and put. LRU caches are used in browser caches, database query caches, and operating system page replacement, and are a top-tier interview design question.',
    explanation: `An LRU Cache evicts the least recently used entry when capacity is reached. JavaScript's Map preserves insertion order, so re-inserting a key (delete then set) moves it to the most-recent position, and the first key is the least recently used.\n\nAll operations (get, put) run in O(1) time using Map's O(1) get/set/delete. The eviction uses Map.keys().next().value to find the oldest entry. Space is O(capacity).\n\nLRU caches are everywhere: browser HTTP caches, database query caches, operating system page replacement, CDN edge caching, and in-memory application caches. Understanding LRU is essential for system design interviews and practical performance optimization.`,
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
    explanation: `Linked list reversal rewires the next pointers in-place using three variables: prev, current, and next. At each step, save current.next, point current.next to prev, then advance both prev and current.\n\nReversal runs in O(n) time with O(1) extra space. The three-pointer technique is the canonical pattern for in-place linked list manipulation. The key is saving the next pointer before overwriting it.\n\nList reversal is the most commonly asked linked list question in interviews. It is a building block for checking if a list is a palindrome (reverse the second half), reversing in groups of k, and any problem requiring backward traversal of a singly-linked list.`,
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
    explanation: `A circular buffer uses a fixed-size array with head and tail pointers that wrap around using modular arithmetic: (index + 1) % capacity. A separate count variable distinguishes full from empty states.\n\nAll operations (enqueue, dequeue, peek) run in O(1) time. The modular wrapping reuses array slots without shifting elements, unlike a standard array queue where dequeue requires O(n) shifting.\n\nCircular buffers are used in audio/video streaming (bounded playback buffers), network packet buffering, logging systems (overwrite oldest entries), and producer-consumer queues in operating systems. They provide predictable memory usage with constant-time operations.`,
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
    explanation: `A monotonic stack maintains elements in decreasing order and efficiently finds the next greater element for each array element. When a new element is larger than the stack top, all smaller stack elements have found their answer.\n\nDespite the nested loop appearance, each element is pushed and popped at most once, giving O(n) total time. Space is O(n) for the stack and result array.\n\nThe monotonic stack pattern solves a family of problems: next greater/smaller element, stock span, largest rectangle in histogram, trapping rain water, and temperature wait-time questions. Recognizing when this pattern applies is a valuable interview skill.`,
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
    explanation: `Sliding window maximum uses a monotonic deque (double-ended queue) that maintains indices in decreasing order of their values. The front always holds the index of the current window maximum.\n\nEach element is added and removed from the deque at most once, giving O(n) total time regardless of window size k. The deque is pruned from the front (expired indices) and the back (smaller values).\n\nThis combines two patterns (sliding window + monotonic data structure) and is considered an advanced technique. It is used for real-time maximum tracking in data streams, stock price analysis, and solving problems like "minimum of maximums over all windows."`,
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
    explanation: `Min Stack supports push, pop, top, and getMin all in O(1) by maintaining an auxiliary stack that tracks the current minimum. When pushing a value <= the current minimum, push it onto the min stack too. When popping that value, pop from the min stack as well.\n\nBoth stacks grow to at most n elements, giving O(n) space. The key insight is that the min stack only needs entries when the minimum changes, so it often remains much smaller than the main stack.\n\nMin stack is a classic design problem that teaches maintaining parallel state for aggregate queries. The same technique extends to max stack, and the concept generalizes to augmented data structures that track additional statistics alongside their primary data.`,
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
    explanation: `A queue built from two stacks achieves amortized O(1) per operation through lazy transfer. Enqueue pushes onto the input stack; dequeue pops from the output stack. When the output stack is empty, all input stack elements are transferred in one batch.\n\nEach element is moved at most twice (once to input, once to output), so n operations take O(n) total time, giving O(1) amortized per operation. This is a classic example of amortized analysis.\n\nThis design problem appears frequently in interviews and teaches that combining simple data structures can create new ones with different properties. It is also how some functional programming languages implement efficient persistent queues.`,
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
    explanation: `This exercise teaches Union-Find (Disjoint Set Union) with both path compression and union by rank, achieving near-constant-time amortized operations. This is the most optimized version of the data structure, with inverse Ackermann O(alpha(n)) complexity per operation.\n\nPath compression flattens the tree during find by making every traversed node point directly to the root. Union by rank keeps trees balanced by attaching the shorter tree under the taller one, only incrementing rank when equal-rank trees merge. Together, these optimizations prevent degenerate linear chains.\n\nThis optimized DSU is essential for Kruskal's minimum spanning tree algorithm, dynamic connectivity queries, image segmentation (labeling connected components), percolation simulation, and equivalence class tracking. It is one of the most elegant and efficient data structures in computer science.`,
  },
  {
    id: 'js-weighted-graph',
    title: 'Build Weighted Adjacency List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Build a weighted adjacency list from [u, v, weight] edge triples, the standard input format for shortest-path algorithms. Weighted graphs are the foundation for Dijkstra, Bellman-Ford, Floyd-Warshall, and minimum spanning tree algorithms.',
    explanation: `Building a weighted adjacency list from [u, v, weight] triples stores {node, weight} objects for each neighbor. For undirected graphs, edges are added in both directions. Pre-initializing all node arrays ensures every node appears in the graph.\n\nConstruction runs in O(V + E) time and space. The weighted format supports shortest-path algorithms that need edge weights, unlike unweighted adjacency lists that store only neighbor IDs.\n\nWeighted adjacency lists are the standard input for Dijkstra's algorithm, Bellman-Ford, Floyd-Warshall, Prim's MST, and A* search. Most real-world graphs are weighted (distances, costs, latencies), making this the most practical graph representation.`,
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
    explanation: `A Fenwick tree (Binary Indexed Tree) supports point updates and prefix sum queries in O(log n) each. Updates propagate upward through the tree by adding the lowest set bit to the index: i += i & (-i).\n\nThe tree uses a 1-indexed array where each position stores a partial sum covering a range determined by its lowest set bit. The update path visits O(log n) positions.\n\nFenwick trees are compact and cache-friendly alternatives to segment trees for problems involving prefix sums with updates. They power range sum queries in competitive programming, frequency counting in sorted streams, and inversion counting algorithms.`,
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
    explanation: `Fenwick tree prefix sum queries accumulate partial sums by walking down through the tree, removing the lowest set bit at each step: i -= i & (-i). This visits O(log n) nodes to compute the prefix sum.\n\nThe query and update operations mirror each other: queries walk down (removing bits) while updates walk up (adding bits). Together they give O(log n) for both operations with only O(n) space.\n\nFenwick tree queries enable dynamic range sum computations where the underlying data changes frequently. Applications include real-time leaderboard ranking, dynamic frequency tables, and any scenario requiring fast cumulative statistics over a mutable array.`,
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
    explanation: `Hash map with chaining stores key-value pairs in buckets (arrays) indexed by hash(key) % capacity. Collisions are handled by appending to the bucket's chain, and lookups scan the chain linearly.\n\nAverage-case get/put/remove operations are O(1) when the load factor is low, degrading to O(n/buckets) as chains grow. A good hash function distributes keys uniformly across buckets.\n\nUnderstanding hash map internals is fundamental: it explains why JavaScript objects and Maps are O(1) average-case, why hash collisions cause performance degradation, and how hash tables power databases, caches, symbol tables in compilers, and virtually every associative data structure.`,
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
    explanation: `A deque (double-ended queue) supports push and pop from both ends: pushFront, pushBack, popFront, and popBack. Using a JavaScript array, unshift/shift handle the front and push/pop handle the back.\n\nWith native arrays, front operations are O(n) due to element shifting, while back operations are O(1). For O(1) all-around, a doubly-linked list or circular buffer implementation is needed.\n\nDeques are used in the sliding window maximum algorithm (monotonic deque), implementing both stacks and queues, BFS with 0-1 edge weights (0-1 BFS), palindrome checking, and work-stealing schedulers in parallel computing.`,
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
    explanation: `Binary exponentiation computes base^exp in O(log exp) time by exploiting the property that x^(2k) = (x^k)^2. For even exponents, square the half-result; for odd, multiply by base and reduce to even.\n\nThe recursion depth is O(log exp), with one multiplication per level. This is exponentially faster than naive repeated multiplication which takes O(exp) time.\n\nFast exponentiation is essential in modular arithmetic (computing a^b mod m for RSA cryptography), matrix exponentiation (computing Fibonacci numbers in O(log n)), competitive programming, and any computation involving large exponents.`,
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
    explanation: `Flood fill colors all connected same-colored cells starting from a given position, using recursive DFS in four directions. It first checks bounds and color match, then recolors the current cell and recurses to all neighbors.\n\nTime complexity is O(m * n) in the worst case (filling the entire grid), with recursion depth also O(m * n). The recoloring itself serves as the visited marker, preventing revisits.\n\nFlood fill is the algorithm behind the paint bucket tool in image editors. It also forms the basis for island counting (how many connected regions), region labeling in image segmentation, solving maze reachability, and implementing go-game territory counting.`,
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
    explanation: `Generating valid parentheses uses constraint-based backtracking: you can add "(" only if fewer than n opens have been placed, and ")" only if fewer closes than opens have been placed. These rules ensure every generated string is balanced.\n\nThe number of valid strings is the nth Catalan number C(n) = (2n)! / ((n+1)!n!). The backtracking tree is pruned by the constraints, exploring only valid paths. Time is O(4^n / sqrt(n)) per the Catalan bound.\n\nThis problem teaches constrained generation and is directly applicable to generating valid expressions, syntax trees, nested structure templates, and Catalan number enumeration. It is one of the most commonly asked medium-difficulty interview problems.`,
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
    explanation: `Tower of Hanoi solves by recursion: move n-1 disks to auxiliary, move the largest disk to target, then move n-1 disks from auxiliary to target. This produces 2^n - 1 moves, which is provably optimal.\n\nEach recursive call reduces the problem size by 1, creating a binary recursion tree of depth n. The move sequence demonstrates how a complex problem decomposes into identical but smaller subproblems.\n\nBeyond being a classic recursion teaching tool, Hanoi appears in backup rotation schemes (Tower of Hanoi backup), understanding recursive algorithm complexity, and as a model for divide-and-conquer problem decomposition. The exponential growth in moves illustrates fundamental computational limits.`,
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
    explanation: `Deep cloning recursively copies nested objects and arrays so the clone shares no references with the original. Type checking at each level determines whether to recurse (objects/arrays), directly return (primitives/null), or map (arrays).\n\nTime complexity is O(n) where n is the total number of values across all nesting levels. The recursion depth equals the maximum nesting depth. Note that this basic implementation does not handle circular references, dates, RegExp, Maps, or Sets.\n\nDeep cloning is essential for immutable state management in React/Redux (preventing accidental mutation of state), creating independent copies of configuration objects, snapshot-based undo systems, and safely passing complex data between modules.`,
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
    explanation: `Subset sum asks whether any combination of array elements adds up to a target. The backtracking approach tries including or excluding each element, pruning branches where the current sum exceeds the target.\n\nThe worst case is O(2^n) since all subsets might be explored. The early termination when currentSum > target (assuming positive integers) significantly prunes the search tree in practice.\n\nSubset sum is NP-complete, making it a foundational problem in computational complexity. It appears in budget allocation, bin packing, cryptographic knapsack systems, and is the basis for the 0/1 knapsack problem. The backtracking pattern here generalizes to all constraint satisfaction problems.`,
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
    explanation: `N-Queens places n non-attacking queens on an n*n board using backtracking with constraint propagation. Three Sets track occupied columns and both diagonal directions, enabling O(1) conflict checking per placement.\n\nThe algorithm places queens row by row, trying each column and pruning immediately when conflicts are detected. For n=8 there are 92 solutions. The time complexity is bounded by n! but pruning makes it much faster in practice.\n\nN-Queens is the canonical backtracking problem that teaches systematic state-space exploration with constraint propagation. The diagonal tracking technique (row-col and row+col) generalizes to any grid-based constraint, and the add-recurse-remove pattern is the template for all backtracking algorithms.`,
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
    explanation: `Word search combines grid DFS with backtracking, starting from every cell and extending in four directions while matching characters. Visited cells are marked with a sentinel to prevent reuse, then restored when backtracking.\n\nWorst case is O(m * n * 4^L) where L is the word length, since each cell can branch four ways for each character. The visited marking and character mismatch pruning make it much faster in practice.\n\nWord search is one of the most commonly asked medium-difficulty interview problems. It combines grid traversal, DFS, and backtracking in a single problem and is representative of the pattern used in puzzle solvers, path finding with constraints, and constraint satisfaction on grids.`,
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
    explanation: `Recursive deep flattening traverses arbitrarily nested arrays, pushing non-array elements to a result array and recursing into array elements. Array.isArray distinguishes the two cases.\n\nTime is O(n) where n is the total number of leaf values across all nesting levels. Stack depth equals the maximum nesting depth. This is simpler than depth-limited flattening since it always recurses fully.\n\nThis pattern is the basis for processing any tree-like structure stored as nested arrays: normalizing JSON API responses with variable nesting, processing recursive file system listings, flattening nested comment threads, and implementing Array.prototype.flat(Infinity).`,
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
    explanation: `Unique permutations of a string with duplicates uses sort-and-skip deduplication. After sorting characters so duplicates are adjacent, the rule "skip character i if it equals character i-1 and i-1 was not used" prevents generating the same permutation twice.\n\nThe sort is O(n log n) and the backtracking explores at most n!/product(ki!) unique permutations where ki are the character frequency counts. Without deduplication, duplicates would cause the same permutation to appear multiple times.\n\nThis deduplication technique applies to any combinatorial generation with repeated elements: generating unique combinations, partitions, and arrangements. It is a critical optimization skill for interview problems involving elements with duplicates.`,
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
    explanation: `Combinations with repetition allow elements to be chosen multiple times, modeled by recursing from the same index (i) instead of the next one (i+1). This produces multiset combinations in non-decreasing order.\n\nThe number of results is C(n+k-1, k) where n is the array size and k is the selection size. The backtracking pattern is identical to standard combinations except for the starting index of the recursive call.\n\nThis variant models real-world scenarios like making change with unlimited coins, selecting ice cream scoops (flavors can repeat), distributing identical resources to buckets, and is the combinatorial foundation for the stars-and-bars counting technique.`,
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
    explanation: `Next lexicographic permutation transforms an array in-place using three steps: find the rightmost ascent (pivot), swap the pivot with the smallest larger element to its right, then reverse the suffix after the pivot position.\n\nThis O(n) algorithm advances to the next permutation without generating all prior ones. If no pivot exists (the array is fully descending), reversing the entire array wraps around to the smallest permutation.\n\nNext permutation enables iterating through all n! permutations in order using O(1) extra space per step. It is used in combinatorial search, test case enumeration, lexicographic ranking, and is the algorithm behind C++ std::next_permutation.`,
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
    explanation: `Permutation ranking computes the 1-based lexicographic position of a permutation by counting, for each position, how many unused smaller elements could have been placed there. Each such element accounts for (remaining positions)! earlier permutations.\n\nThe algorithm runs in O(n^2) time: for each of n positions, it counts smaller elements among the remaining ones. An optimized version using a Fenwick tree achieves O(n log n).\n\nPermutation ranking enables compact encoding of permutations as single integers, useful for puzzle state compression (Rubik's cube solvers), hashing permutation states, implementing the Lehmer code, and bijective mapping between integers and arrangements.`,
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
    explanation: `Derangements are permutations where no element appears in its original position. The recurrence D(n) = (n-1) * (D(n-1) + D(n-2)) counts them efficiently in O(n) time with O(1) space using two rolling variables.\n\nThe recurrence has an elegant interpretation: for element 1, choose any of n-1 positions k. If element k goes to position 1 (swap), the rest is D(n-2). If element k does not go to position 1, it is a derangement of n-1 elements, giving D(n-1).\n\nDerangements appear in the hat-check problem (probability nobody gets their own hat), secret Santa assignment validation, counting fixed-point-free permutations in group theory, and approximating the probability of derangement (approaching 1/e as n grows).`,
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
    explanation: `This exercise teaches you to generate a specific row of Pascal's triangle iteratively, where each element equals the sum of the two elements directly above it. Row n contains the binomial coefficients C(n,0) through C(n,n).\n\nThe key technique builds each row from the previous one: newRow[j] = prevRow[j-1] + prevRow[j], with 1s bookending each row. This avoids computing factorials and runs in O(n^2) total time for row n.\n\nPascal's triangle encodes binomial coefficients used in probability calculations, polynomial expansion via the binomial theorem, combinatorial identity proofs, and generating combinations. It also appears in fractal patterns (Sierpinski triangle via modular arithmetic) and is a classic example of dynamic programming over a triangular grid.`,
  },
  {
    id: 'js-catalan-number',
    title: 'Catalan Number',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Compute the nth Catalan number using the DP recurrence C(n) = sum of C(i)*C(n-1-i). Catalan numbers count balanced parentheses, BST shapes, polygon triangulations, mountain ranges, and many other combinatorial structures that appear in interviews.',
    explanation: `Catalan numbers follow the recurrence C(n) = sum of C(i)*C(n-1-i) for i=0..n-1, with base case C(0) = 1. The DP table fills in O(n^2) time, computing each C(i) from previously computed values.\n\nThe recurrence reflects the structure of Catalan-counted objects: splitting into a left part of size i and a right part of size n-1-i, then multiplying the counts. This is the same decomposition used for BST counting and parenthesization.\n\nCatalan numbers count an astonishing variety of structures: balanced parentheses strings, distinct BSTs with n keys, ways to triangulate a polygon, mountain range profiles, non-crossing partitions, and Dyck paths. They grow as approximately 4^n / (n^(3/2) * sqrt(pi)).`,
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
    explanation: `Bitmask enumeration generates all subsets by iterating integers from 0 to 2^n - 1, where each bit position determines whether the corresponding array element is included. This replaces recursion with simple bit checking.\n\nTime complexity is O(2^n * n) since each of 2^n masks requires checking n bits. The approach is more cache-friendly and has less overhead than recursive subset generation, making it faster in practice for small n.\n\nBitmask enumeration is widely used in competitive programming for state compression DP, exhaustive search over subsets, representing sets as integers for hashing, and implementing game AI that explores all possible move combinations.`,
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
    explanation: `Gray code generates a sequence where consecutive values differ by exactly one bit, using the formula gray(i) = i XOR (i >> 1). This produces a Hamiltonian path through the binary hypercube.\n\nGeneration runs in O(2^n) time with O(1) per value. The XOR formula is a closed-form expression that directly computes each Gray code value without needing the previous one.\n\nGray codes minimize signal errors in physical encoding systems (rotary encoders, analog-to-digital converters) because a single-bit transition cannot produce a large error. They are also used in Karnaugh maps for logic minimization, genetic algorithms, and generating subsets in an order where each differs minimally from the previous.`,
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
    explanation: `The Josephus problem finds the survivor when people in a circle are eliminated every k-th position. The iterative formula J(i) = (J(i-1) + k) % i builds the answer from 1 person up to n, running in O(n) time and O(1) space.\n\nThe modular arithmetic elegantly handles the circular elimination. Starting with J(1) = 0 (the only person at position 0), each step maps the survivor position from a smaller circle to a larger one by shifting by k positions.\n\nThe Josephus problem has historical origins and appears in game theory, competitive programming, and as an example of mathematical induction applied to circular structures. The O(n) iterative solution is far more elegant than simulating the actual elimination process.`,
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
    explanation: `Counting inversions via merge sort tallies "cross-inversions" during the merge step. When an element from the right half is smaller than elements remaining in the left half, it forms inversions with all of them at once.\n\nThe modified merge sort runs in O(n log n) time, matching the sorting bound. Each merge step counts inversions as a free byproduct of the merge comparison. The divide-and-conquer decomposition handles left-inversions, right-inversions, and cross-inversions separately.\n\nInversion count measures how far an array is from sorted (0 inversions = sorted, n(n-1)/2 = reverse sorted). It is used in computing Kendall tau rank correlation, analyzing sorting algorithm performance, recommendation systems, and as a difficulty metric for permutations.`,
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
    explanation: `Iterative preorder uses an explicit stack to simulate the recursive call stack. Pop a node, visit it, then push right child before left child so that left is processed first (LIFO order ensures left pops before right).\n\nTime is O(n) and space is O(h) for the stack, identical to recursive DFS. The explicit stack avoids potential stack overflow on very deep trees and makes the traversal order manipulation more visible.\n\nConverting recursive algorithms to iterative form is a crucial skill for production code and interviews. Interviewers often ask for iterative tree traversals as follow-ups to recursive ones, testing understanding of how recursion maps to stack operations.`,
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
    explanation: `Iterative postorder uses a clever trick: perform a modified preorder (root, right, left) and reverse the result to get (left, right, root). This avoids the complex state tracking that a direct iterative postorder requires.\n\nPush left before right (opposite of preorder) so the stack processes root-right-left. Reversing gives left-right-root, which is postorder. Time is O(n) and space is O(n) for the result array.\n\nIterative postorder is the trickiest of the three traversals because the root must be visited last. The reverse trick is elegant but uses O(n) extra space. A direct approach using a "last visited" pointer exists but is significantly more complex. This is a common advanced interview question.`,
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
    explanation: `Zigzag level order traversal uses BFS with a direction flag that alternates each level. Process nodes normally (left to right) using a queue, but reverse the level array for odd-numbered levels.\n\nTime is O(n) since each node is visited once, and the reversal of each level adds at most O(n) total across all levels. Space is O(w) for the queue where w is the maximum width.\n\nThis problem combines BFS level-by-level processing with direction toggling, testing the ability to adapt standard algorithms. It appears in tree visualization, binary tree printing, and as a variation of level-order traversal in interviews.`,
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
    explanation: `Tree level widths computes the node count at each level using BFS with level-size tracking. Before processing each level, queue.length gives the width, which is recorded before dequeuing and enqueueing children.\n\nTime is O(n) with O(w) space for the queue. The level-size technique (processing exactly queue.length nodes per iteration) is the standard pattern for any BFS problem requiring level-by-level grouping.\n\nLevel width computation finds the maximum width of a tree, enables level-based aggregation (average value per level), detects whether a tree is complete, and is used in tree visualization layout algorithms.`,
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
    explanation: `LCA uses recursive divide-and-conquer: if the current node matches either target, return it. Otherwise, recurse on both subtrees. If both return non-null, the current node is the LCA; otherwise, return whichever side found something.\n\nTime is O(n) in the worst case (visiting all nodes) and O(h) space for the recursion stack. The algorithm works for any binary tree, not just BSTs.\n\nLCA is fundamental for computing distances between tree nodes, finding paths between nodes, and is used in phylogenetic analysis (finding common ancestors of species), version control systems (finding merge bases), and DOM traversal (finding the common container of two elements).`,
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
    explanation: `Tree diameter finds the longest path between any two nodes by computing heights recursively and tracking the maximum leftHeight + rightHeight across all nodes. The height function returns one value while a closure variable tracks the diameter.\n\nTime is O(n) with a single pass. The pattern of "returning one value while tracking another" is a common recursive technique. The diameter may not pass through the root.\n\nTree diameter is used in network analysis (furthest nodes in a network), computing the eccentricity of a graph, tree center finding (for balanced tree construction), and as a component of tree decomposition algorithms.`,
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
    explanation: `Tree serialization converts a binary tree to a string using preorder traversal with "null" markers for missing children. Deserialization reconstructs the tree by consuming tokens in the same preorder sequence.\n\nBoth serialize and deserialize run in O(n) time. The preorder format with null markers uniquely encodes any binary tree shape. The index-based token consumption during deserialization naturally handles the recursive structure.\n\nTree serialization is essential for persistent storage (saving trees to disk or database), network transmission of tree data (API responses), clipboard copy/paste of tree structures, and is a frequently asked system design interview question.`,
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
    explanation: `LCS builds a 2D DP table where dp[i][j] is the LCS length of the first i characters of string a and first j characters of string b. Matching characters extend the diagonal, while mismatches take the maximum of skipping either character.\n\nTime and space are both O(m * n). The table can be optimized to O(min(m,n)) space by keeping only two rows, since each cell depends only on the current and previous row.\n\nLCS is the algorithm behind diff tools (git diff, unified diff), DNA sequence alignment (bioinformatics), spell checking suggestions, file comparison, and is the foundational two-string DP problem. Understanding LCS prepares you for edit distance, shortest common supersequence, and other string DP variants.`,
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
    explanation: `Edit distance (Levenshtein) computes the minimum insertions, deletions, and substitutions to transform one string into another. The 2D DP table has base cases dp[i][0] = i and dp[0][j] = j, representing transforming to/from empty strings.\n\nTime and space are O(m * n). Each cell considers three operations: insert (dp[i][j-1] + 1), delete (dp[i-1][j] + 1), and replace (dp[i-1][j-1] + 1 if characters differ). If characters match, dp[i][j] = dp[i-1][j-1].\n\nEdit distance powers spell checkers, fuzzy search, DNA sequence alignment, plagiarism detection, and auto-correct systems. It is one of the most important string algorithms and a staple of technical interviews.`,
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
    explanation: `Coin change finds the minimum number of coins to make an amount using 1D DP. For each amount i from 1 to target, try every coin denomination: dp[i] = min(dp[i], dp[i-coin] + 1) if coin <= i.\n\nTime is O(amount * coins) and space is O(amount). The unbounded nature (each coin can be used multiple times) is reflected in the inner loop iterating over all coins for each amount.\n\nCoin change is the classic unbounded knapsack problem. It models making change, resource allocation with unlimited supplies, and is the introductory problem for DP optimization. The bounded variant (limited coin counts) requires a different approach.`,
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
    explanation: `The 0/1 knapsack maximizes value within a weight capacity where each item is used at most once. The 2D DP table dp[i][w] represents the best value using the first i items with capacity w, choosing to include or exclude each item.\n\nTime is O(n * capacity) and space is O(n * capacity), optimizable to O(capacity) with a single row processed backwards. This is pseudo-polynomial: polynomial in the numeric value of capacity, not in the input size.\n\nThe 0/1 knapsack is the most important combinatorial optimization problem. It models portfolio selection, cargo loading, budget allocation, feature selection, and any binary decision problem with weight/cost constraints. It is NP-hard in general but solvable efficiently for moderate capacities.`,
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
    explanation: `LIS finds the longest strictly increasing subsequence using DP where dp[i] is the LIS length ending at index i. For each element, check all previous elements and extend the longest compatible subsequence.\n\nThe O(n^2) approach checks all pairs. An O(n log n) optimization uses patience sorting (maintaining tails of increasing subsequences with binary search). The DP approach is more intuitive and sufficient for moderate input sizes.\n\nLIS appears in patience sorting, envelope nesting (Russian doll), box stacking, longest chain problems, and computing the minimum number of non-increasing subsequences to cover an array. It is a fundamental subsequence problem in interviews.`,
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
    explanation: `Rod cutting maximizes revenue by trying all possible first cuts and taking the best. The DP relation dp[i] = max(prices[j] + dp[i-j-1]) for all cut lengths j from 0 to i-1 captures the unbounded nature (remaining rod can be cut again).\n\nTime is O(n^2) for the nested loops and space is O(n) for the DP array. This is structurally similar to unbounded knapsack where "items" are rod pieces of each length.\n\nRod cutting is a classic DP optimization problem that demonstrates bottom-up DP construction. It teaches how to enumerate decisions (where to make the first cut) and combine them with optimal sub-solutions, a pattern that generalizes to many optimization problems.`,
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
    explanation: `Climbing stairs with 1 or 2 steps follows the Fibonacci recurrence: dp[i] = dp[i-1] + dp[i-2]. The number of ways to reach step i is the sum of ways to reach the two steps it can be reached from.\n\nTime is O(n) and space is O(n), optimizable to O(1) by keeping only the last two values. This is the simplest DP counting problem and serves as the gateway to understanding DP.\n\nClimbing stairs generalizes to k-step variants, weighted step costs, and is structurally equivalent to tiling problems (domino tiling), word break counting, and any problem where you count paths in a DAG with fixed step sizes.`,
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
    explanation: `Grid unique paths counts ways to travel from top-left to bottom-right moving only right or down. Each cell dp[i][j] sums the paths from above (dp[i-1][j]) and from the left (dp[i][j-1]).\n\nTime and space are O(m * n). The first row and column are all 1s since there is only one path (straight line) to each. The answer equals C(m+n-2, m-1), the binomial coefficient for choosing when to go down.\n\nGrid paths is the foundational 2D DP problem that extends to obstacles (set blocked cells to 0), minimum cost paths (take min instead of sum), and robot navigation problems. Understanding the grid DP pattern is essential for many interview problems.`,
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
    explanation: `Word break determines if a string can be segmented into dictionary words using 1D DP. dp[i] is true if the first i characters can be fully segmented. For each position i, check all split points j where dp[j] is true and s[j..i] is in the dictionary.\n\nTime is O(n^2 * L) where L is the maximum word length (for substring creation). Using a Set for the dictionary gives O(1) word lookups. Space is O(n) for the DP array.\n\nWord break is a popular interview problem that combines string processing with DP. It is used in NLP tokenization, URL segmentation, and Chinese/Japanese text segmentation where spaces are not present in the input.`,
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
    explanation: `This exercise extends Kadane's algorithm to multiplication by tracking both the running maximum AND minimum products. Negative numbers can flip a minimum product into a maximum when multiplied, so both must be maintained.\n\nAt each position, three candidates compete: the element alone (starting fresh), element times previous max (extending a positive streak), and element times previous min (a negative times a negative). Taking the max and min of these three candidates gives the new running max and min.\n\nMaximum product subarray is a classic DP interview problem (LeetCode 152) that tests understanding of how multiplication interacts with negative numbers. It appears in financial analysis (compound returns), signal processing, and any domain where multiplicative accumulation matters.`,
  },

  // ========== UTILITIES ==========
  {
    id: 'js-deep-equals',
    title: 'Deep Equality Check',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Implement deep equality comparison for nested objects, arrays, and primitives using recursive structural traversal. Deep equals is essential for testing assertions, React shouldComponentUpdate, state comparison, and implementing custom equality logic.',
    explanation: `Deep equality recursively compares nested objects and arrays by structural matching. Primitives use ===, arrays check length and element-wise equality, and objects check key sets and value-wise equality.\n\nTime is O(n) where n is the total number of values across all nesting levels. The type-checking order matters: handle null before typeof "object" since typeof null === "object" in JavaScript.\n\nDeep equality is essential for testing frameworks (Jest's toEqual), React's shouldComponentUpdate optimization, state comparison in Redux, and implementing custom equality logic for complex data structures.`,
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
    explanation: `Merging overlapping intervals sorts by start time, then greedily extends or creates intervals. If the current interval overlaps with the last merged one (current.start <= last.end), extend the end; otherwise start a new interval.\n\nSorting takes O(n log n) and the merge pass is O(n), giving O(n log n) overall. The greedy approach is correct because sorting ensures overlapping intervals are adjacent.\n\nInterval merging is used in calendar scheduling (finding free time), resource allocation, genomics (merging overlapping gene regions), and log entry consolidation. It is one of the most commonly asked greedy algorithm interview problems.`,
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
    explanation: `Insert interval uses a three-phase approach: copy intervals ending before the new one, merge all overlapping intervals with the new one, then copy remaining intervals. This handles the insertion and merging in a single pass.\n\nTime is O(n) for the single pass (no sorting needed since input is already sorted). The merge phase expands the new interval to cover all overlaps by taking min of starts and max of ends.\n\nInsert interval builds on merge intervals and tests the ability to handle boundary conditions precisely. It is used in event scheduling systems, adding appointments to calendars, and dynamic interval management.`,
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
    explanation: `An event emitter implements the observer/publish-subscribe pattern with on (register listener), off (remove listener), and emit (notify all listeners). The internal structure maps event names to arrays of callback functions.\n\nAll operations are straightforward: on pushes to the listener array, off filters it, and emit iterates and calls each listener. Registration and emission are O(k) where k is the number of listeners for that event.\n\nEvent emitters are the backbone of Node.js (EventEmitter class), browser DOM events, React's synthetic event system, Vue's event bus, and any loosely coupled architecture. Understanding this pattern is fundamental to JavaScript programming.`,
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
    explanation: `Promise.all resolves when every input promise resolves, collecting results in order, or rejects immediately on the first rejection. A counter tracks resolved promises, and results are stored by index to maintain order.\n\nThe implementation wraps each value with Promise.resolve() to handle non-promise values. The counter approach is necessary because promises resolve asynchronously and out of order. Space is O(n) for the results array.\n\nPromise.all is fundamental to concurrent JavaScript: loading multiple API endpoints simultaneously, initializing parallel database connections, batch processing, and any scenario where multiple async operations must all complete before proceeding.`,
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
    explanation: `Promise.race settles with the first promise to resolve or reject, ignoring all others. The implementation simply routes each promise's resolution and rejection to the outer promise's resolve/reject callbacks.\n\nThe simplicity works because a Promise can only be settled once; subsequent calls to resolve or reject are silently ignored. Time to settle is O(min settle time) across all promises.\n\nPromise.race implements timeout patterns (race against a setTimeout), competitive fetching (use the fastest mirror), first-response-wins strategies, and is used in Promise.any (ES2021) which resolves with the first fulfillment rather than the first settlement.`,
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
    explanation: `Deep freeze recursively applies Object.freeze to all nested objects and arrays, making the entire structure immutable. Object.isFrozen prevents re-freezing already-frozen objects, which could cause infinite loops with circular references.\n\nTime is O(n) where n is the total number of properties across all nesting levels. Object.freeze is shallow (only freezes own properties), so the recursion is necessary for full immutability.\n\nDeep freeze enforces immutability for configuration objects, prevents accidental mutation in shared state (especially useful in development mode for Redux stores), and enables optimizations in frameworks that use referential equality checking for change detection.`,
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
    explanation: `Pick creates a new object containing only the specified keys from the source, implemented by iterating over the key array and copying values that exist on the source object using the "in" operator.\n\nTime is O(k) where k is the number of keys to pick. The "in" operator checks for key existence without accessing the value, and missing keys are silently skipped.\n\nPick is one of the most commonly used utility functions: shaping API responses to return only requested fields, extracting form data for specific inputs, projecting database query results, and implementing GraphQL-style field selection on the server.`,
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
    explanation: `Omit creates a new object excluding specified keys, using a Set for O(1) exclusion checks. It iterates over all source keys and includes only those not in the exclusion Set.\n\nTime is O(n) where n is the number of source keys, plus O(k) to build the exclusion Set. Space is O(n) for the result and O(k) for the Set.\n\nOmit is the complement of pick and is used for removing sensitive fields before logging (passwords, tokens), stripping internal metadata before API responses, data sanitization, and creating derived objects without specific properties.`,
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
    explanation: `FlatMap applies a mapping function to each element and flattens the result by one level. If the mapper returns an array, its elements are spread into the result; otherwise the value is pushed directly.\n\nTime is O(n * m) where m is the average size of mapped results. FlatMap is equivalent to map followed by flat(1) but avoids creating an intermediate array.\n\nFlatMap is a monadic bind operation fundamental to functional programming. It is used in stream processing (RxJS), query building (generating multiple rows from one input), tokenization (splitting strings into words), and is natively available as Array.prototype.flatMap.`,
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
    explanation: `Run-length encoding compresses consecutive identical characters into count-character pairs. Iterating through the string and flushing a count when the character changes produces the encoded output in O(n) time.\n\nThe algorithm uses O(n) space for the output string in the worst case (all unique characters produce "1a1b1c..."). Best case compression occurs with long runs of identical characters.\n\nRLE is one of the simplest lossless compression algorithms, used in BMP image format, fax transmission, as a preprocessing step for Burrows-Wheeler compression, and as an introductory string processing problem that teaches the running-count pattern.`,
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
    explanation: `Run-length decoding parses number-character pairs from an encoded string, repeating each character by its count. Multi-digit number handling requires accumulating digit characters before encountering the letter.\n\nTime is O(n) where n is the decoded string length (sum of all counts). The parsing loop distinguishes digits from non-digits to extract the count, then uses String.repeat() for expansion.\n\nDecoding is the inverse of encoding and teaches string parsing with state tracking (accumulating digits). The same parse-digits-then-character pattern appears in many format parsers, URL decoders, and protocol message handlers.`,
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
    explanation: `Leading-edge debounce fires immediately on the first call, then ignores subsequent calls during the delay period. Each call resets the timer, and when it expires, the next call becomes a "first call" again.\n\nThe implementation checks if no timer is active (meaning this is a leading-edge call) and invokes immediately. Every call resets the timer. When the timer expires, it is set to null, re-enabling the leading edge.\n\nLeading debounce provides instant feedback while preventing rapid-fire execution. It is ideal for button click handlers (instant response, no double-clicks), form submissions, and any interaction where the user expects immediate feedback but repeated actions should be suppressed.`,
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
    explanation: `Decimal to binary conversion repeatedly divides by 2, collecting remainders in reverse order. Each remainder is the next bit from least significant to most significant, so prepending to the result string produces the correct binary representation.\n\nThe algorithm runs in O(log n) time (the number of bits in n) with O(log n) space for the output string. The process terminates when the quotient reaches zero.\n\nManual base conversion builds understanding of positional number systems fundamental to all computing. It extends to any base (hex, octal), and is the conceptual basis for understanding how computers represent numbers internally.`,
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
    explanation: `This exercise teaches you to convert a binary string to its decimal equivalent using Horner's method: process digits left-to-right, multiplying the accumulator by 2 and adding each bit. This avoids computing individual powers of 2.\n\nThe key insight is that decimal = decimal * 2 + bit is equivalent to evaluating a polynomial at x=2. For "1010": ((1*2 + 0)*2 + 1)*2 + 0 = 10. This runs in O(n) time with O(1) space.\n\nBinary-to-decimal conversion is foundational for understanding how computers parse number representations, implementing custom number format parsers, and working with binary protocols. The Horner's method pattern generalizes to any base conversion.`,
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
    explanation: `This exercise teaches Brian Kernighan's algorithm for counting set bits (popcount): repeatedly clear the lowest set bit with n & (n-1) until n becomes zero, counting iterations. This runs in O(k) where k is the number of set bits, not the bit width.\n\nThe key insight is that n & (n-1) always clears exactly the lowest set bit. For example, 12 (1100) & 11 (1011) = 8 (1000) - the rightmost 1-bit at position 2 is cleared. This is more efficient than checking all 32 or 64 bits.\n\nBit counting appears in Hamming distance calculations, error correction codes, bitmap indexes in databases, population count operations in SIMD instructions, and determining the cardinality of bitset-represented sets. Many CPUs have a dedicated POPCNT instruction for this operation.`,
  },
  {
    id: 'js-is-power-of-two',
    title: 'Is Power of Two (Bit Trick)',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Check if a number is a power of 2 using the bit trick n > 0 && (n & (n-1)) === 0. Powers of 2 have exactly one set bit, so clearing it yields zero. This one-liner is used in memory allocation, hash table sizing, and fast modular arithmetic.',
    explanation: `The power-of-two check uses the bit trick n > 0 && (n & (n-1)) === 0. Powers of 2 have exactly one set bit (1, 10, 100, 1000...), so clearing the lowest set bit with n & (n-1) yields zero if and only if n is a power of 2.\n\nThis runs in O(1) time and O(1) space, making it the optimal check. The n > 0 guard is necessary because 0 & (-1) === 0 but zero is not a power of 2.\n\nPower-of-two checks are used in memory allocators (ensuring alignment), hash table sizing (powers of 2 enable bitwise modulo), buffer sizing, fast modular arithmetic, and as a building block in other bit manipulation algorithms.`,
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
    explanation: `Toggling the nth bit uses XOR with a shifted mask: num ^ (1 << n). XOR with 1 flips a bit (0 becomes 1, 1 becomes 0), while XOR with 0 leaves it unchanged, so the mask isolates the target bit.\n\nThis runs in O(1) time and O(1) space. The three bit operations (AND for clear, OR for set, XOR for toggle) form the complete toolkit for individual bit manipulation.\n\nBit toggling is used in feature flags (toggle features on/off), graphics rendering (XOR drawing for rubber-band selection), permission systems (flip individual permission bits), state machines (toggle between states), and encryption (XOR cipher).`,
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
    explanation: `Matrix multiplication computes C[i][j] as the dot product of row i of A and column j of B, requiring three nested loops. The shared dimension (columns of A = rows of B) determines the inner summation.\n\nTime complexity is O(m * n * p) for multiplying an m*n matrix by an n*p matrix. Space is O(m * p) for the result. Strassen's algorithm achieves O(n^2.807) for square matrices, but the cubic algorithm is simpler and practical for small matrices.\n\nMatrix multiplication is fundamental to linear algebra, computer graphics (transformations), neural network forward passes, graph path counting (A^k gives k-length paths), and scientific computing. Understanding the triple-loop structure is prerequisite for optimization work.`,
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
    explanation: `Matrix transpose swaps rows and columns, moving element [i][j] to [j][i]. For an m*n input, the result is n*m. Creating a new result matrix with swapped dimensions and copying elements is straightforward.\n\nTime is O(m * n) to copy all elements, and space is O(m * n) for the output. In-place transpose is only possible for square matrices (swapping [i][j] with [j][i] for the upper triangle).\n\nTranspose is used as the first step in clockwise rotation, converting row-major to column-major storage, reshaping data frames, and is fundamental to linear algebra operations like computing A^T * A in regression.`,
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
    explanation: `Deep merge recursively combines two objects: when both values for a key are plain objects, merge them recursively; otherwise the source value wins. Arrays are replaced, not merged, to avoid ambiguous semantics.\n\nTime is O(n) where n is the total number of properties across all nesting levels. The type checks (!Array.isArray and typeof === "object") ensure only plain objects trigger recursion.\n\nDeep merge is essential for configuration systems (layered config files), theme customization (override specific nested properties), Redux state reducers (merging partial updates), and building complex objects from defaults and user overrides.`,
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
    explanation: `Retry wraps an async function with fault tolerance, re-attempting on failure up to a specified number of times with a delay between attempts. A for loop with try/catch handles the retry logic cleanly.\n\nTime depends on the wrapped function and retry count. The delay uses await new Promise(r => setTimeout(r, delay)) to pause between attempts without blocking. If all retries fail, the last error is thrown.\n\nRetry logic is essential for resilient API calls, database connection establishment, distributed systems communication, file operations that may fail transiently, and implementing exponential backoff strategies for rate-limited services.`,
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
    explanation: `Full-featured throttle fires on both leading edge (immediately) and trailing edge (after interval expires with the latest arguments). This ensures both instant responsiveness and final-state capture.\n\nThe implementation stores the most recent arguments during the throttle interval. When the timer fires, if there are saved arguments, it invokes with them and restarts the timer. This gives at most 1/interval invocations per second.\n\nLeading+trailing throttle is the production-grade version used in scroll and resize handlers, real-time collaborative editing (send updates at most every 100ms), analytics event batching, and any high-frequency input that needs both immediate feedback and guaranteed final processing.`,
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
