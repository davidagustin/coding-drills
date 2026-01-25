import type { Exercise } from './types';

export const pythonExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'py-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Learn to iterate through a list while skipping every other element using slicing or range.',
    instructions: [
      'Given a list of numbers, return a new list containing only elements at even indices',
      'Use range() with a step of 2 OR list slicing',
      'Both approaches are valid in Python',
    ],
    starterCode: `def skip_every_other(arr):
    result = []
    # Use range with step of 2 OR list slicing
    # YOUR CODE HERE

    return result`,
    solutionCode: `def skip_every_other(arr):
    result = []
    for i in range(0, len(arr), 2):
        result.append(arr[i])
    return result`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [1, 3, 5], description: 'Basic even-length list' },
      { input: [10, 20, 30, 40, 50], expected: [10, 30, 50], description: 'Odd-length list' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty list' },
    ],
    hints: [
      'range(0, len(arr), 2) gives indices 0, 2, 4, ...',
      'Alternative: arr[::2] using slice notation',
    ],
    concepts: ['range()', 'list slicing', 'step parameter'],
  },
  {
    id: 'py-enumerate-iteration',
    title: 'Using enumerate()',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description: 'Use enumerate() to access both index and value while iterating.',
    instructions: [
      'Given a list, return a list of tuples (index, value) for each element',
      'Use enumerate() - the Pythonic way to track indices',
      'Do not manually track indices with a counter variable',
    ],
    starterCode: `def indexed_elements(arr):
    result = []
    # Use enumerate() to get index and value
    # YOUR CODE HERE

    return result`,
    solutionCode: `def indexed_elements(arr):
    result = []
    for index, value in enumerate(arr):
        result.append((index, value))
    return result`,
    testCases: [
      {
        input: ['a', 'b', 'c'],
        expected: [
          [0, 'a'],
          [1, 'b'],
          [2, 'c'],
        ],
        description: 'String list',
      },
      {
        input: [10, 20, 30],
        expected: [
          [0, 10],
          [1, 20],
          [2, 30],
        ],
        description: 'Number list',
      },
      { input: [42], expected: [[0, 42]], description: 'Single element' },
    ],
    hints: [
      'enumerate(arr) yields (index, value) pairs',
      'Unpack in the for loop: for index, value in enumerate(arr)',
    ],
    concepts: ['enumerate()', 'tuple unpacking', 'Pythonic iteration'],
  },
  {
    id: 'py-zip-iteration',
    title: 'Parallel Iteration with zip()',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description: 'Use zip() to iterate over multiple lists simultaneously.',
    instructions: [
      'Given two lists, return a list of sums of corresponding elements',
      'Use zip() to pair elements from both lists',
      'If lists have different lengths, zip stops at the shorter one',
    ],
    starterCode: `def pairwise_sum(list1, list2):
    result = []
    # Use zip() to iterate both lists together
    # YOUR CODE HERE

    return result`,
    solutionCode: `def pairwise_sum(list1, list2):
    result = []
    for a, b in zip(list1, list2):
        result.append(a + b)
    return result`,
    testCases: [
      {
        input: [
          [1, 2, 3],
          [10, 20, 30],
        ],
        expected: [11, 22, 33],
        description: 'Equal length lists',
      },
      {
        input: [
          [1, 2],
          [10, 20, 30],
        ],
        expected: [11, 22],
        description: 'Different lengths',
      },
      { input: [[], []], expected: [], description: 'Empty lists' },
    ],
    hints: [
      'zip(list1, list2) pairs corresponding elements',
      'Unpack each pair: for a, b in zip(...)',
    ],
    concepts: ['zip()', 'parallel iteration', 'tuple unpacking'],
  },
  {
    id: 'py-list-comprehension',
    title: 'List Comprehension Patterns',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description: 'Use list comprehensions for concise iteration and transformation.',
    instructions: [
      'Given a list of numbers, return squares of only the even numbers',
      'Use a list comprehension with a condition',
      'Syntax: [expression for item in list if condition]',
    ],
    starterCode: `def even_squares(numbers):
    # Use list comprehension with condition
    # YOUR CODE HERE
    pass`,
    solutionCode: `def even_squares(numbers):
    return [x ** 2 for x in numbers if x % 2 == 0]`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [4, 16, 36], description: 'Mixed list' },
      { input: [2, 4, 6], expected: [4, 16, 36], description: 'All even' },
      { input: [1, 3, 5], expected: [], description: 'All odd' },
      { input: [], expected: [], description: 'Empty list' },
    ],
    hints: ['[expression for x in list if condition]', 'Check even: x % 2 == 0', 'Square: x ** 2'],
    concepts: ['list comprehension', 'filtering', 'transformation'],
  },

  // ========== GENERATION ALGORITHMS ==========
  {
    id: 'py-prime-generation',
    title: 'Generate Prime Numbers',
    category: 'generation',
    difficulty: 'intermediate',
    description: 'Generate all prime numbers between 1 and 100.',
    instructions: [
      'Return a list of all prime numbers from 2 to 100',
      'Use nested loops to check divisibility',
      'Optimize by only checking up to sqrt(n)',
    ],
    starterCode: `def generate_primes():
    primes = []
    # Generate all primes from 2 to 100
    # YOUR CODE HERE

    return primes`,
    solutionCode: `def generate_primes():
    primes = []
    for num in range(2, 101):
        is_prime = True
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)
    return primes`,
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
      'range(2, 101) gives 2 to 100 inclusive',
      'Check divisors up to int(num ** 0.5) + 1',
      'Use break to exit inner loop early',
    ],
    concepts: ['prime numbers', 'nested loops', 'optimization'],
    timeLimit: 120,
  },
  {
    id: 'py-fibonacci-generator',
    title: 'Fibonacci Generator',
    category: 'generation',
    difficulty: 'intermediate',
    description: 'Create a generator function that yields Fibonacci numbers.',
    instructions: [
      'Implement a generator that yields the first n Fibonacci numbers',
      'Use the yield keyword',
      'Generators are memory-efficient for large sequences',
    ],
    starterCode: `def fibonacci_generator(n):
    # Initialize first two Fibonacci numbers
    a, b = 0, 1
    count = 0

    # Yield Fibonacci numbers
    # YOUR CODE HERE`,
    solutionCode: `def fibonacci_generator(n):
    a, b = 0, 1
    count = 0

    while count < n:
        yield a
        a, b = b, a + b
        count += 1`,
    testCases: [
      { input: 10, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], description: 'First 10 Fibonacci' },
      { input: 5, expected: [0, 1, 1, 2, 3], description: 'First 5 Fibonacci' },
      { input: 1, expected: [0], description: 'Single element' },
    ],
    hints: [
      'yield pauses the function and returns a value',
      'Swap with tuple unpacking: a, b = b, a + b',
      'Collect generator output with list()',
    ],
    concepts: ['generators', 'yield', 'Fibonacci', 'lazy evaluation'],
  },

  // ========== RECURSION ==========
  {
    id: 'py-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'intermediate',
    description: 'Calculate the nth Fibonacci number using recursion.',
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1',
      'Use recursion: fib(n) = fib(n-1) + fib(n-2)',
    ],
    starterCode: `def fibonacci_recursive(n):
    # Base cases
    # YOUR CODE HERE

    # Recursive case
    # YOUR CODE HERE`,
    solutionCode: `def fibonacci_recursive(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 5, expected: 5, description: 'fib(5)' },
      { input: 10, expected: 55, description: 'fib(10)' },
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n == 1 returns 1',
      'Recursive case: return fib(n-1) + fib(n-2)',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci'],
  },
  {
    id: 'py-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description: 'Calculate factorial using recursion.',
    instructions: [
      'Return n! (n factorial)',
      'factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: factorial(0) = factorial(1) = 1',
    ],
    starterCode: `def factorial(n):
    # Base case
    # YOUR CODE HERE

    # Recursive case
    # YOUR CODE HERE`,
    solutionCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
    testCases: [
      { input: 0, expected: 1, description: '0!' },
      { input: 1, expected: 1, description: '1!' },
      { input: 5, expected: 120, description: '5!' },
      { input: 10, expected: 3628800, description: '10!' },
    ],
    hints: ['Base case: if n <= 1, return 1', 'Recursive case: n * factorial(n - 1)'],
    concepts: ['recursion', 'factorial', 'base case'],
  },

  // ========== TRAVERSAL ==========
  {
    id: 'py-dfs-tree',
    title: 'Depth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement DFS to traverse a binary tree in pre-order.',
    instructions: [
      'Given a tree node (dict with value, left, right), return values in pre-order',
      'Pre-order: visit root, then left subtree, then right subtree',
      'Use recursion',
    ],
    starterCode: `def dfs_preorder(node):
    result = []

    def traverse(node):
        if node is None:
            return
        # Visit node, then left, then right
        # YOUR CODE HERE

    traverse(node)
    return result`,
    solutionCode: `def dfs_preorder(node):
    result = []

    def traverse(node):
        if node is None:
            return
        result.append(node['value'])
        traverse(node.get('left'))
        traverse(node.get('right'))

    traverse(node)
    return result`,
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
    ],
    hints: [
      'Check if node is None before accessing',
      'Use node.get("left") to safely access children',
      'Append value, then recurse left, then right',
    ],
    concepts: ['DFS', 'tree traversal', 'pre-order', 'recursion'],
  },
  {
    id: 'py-bfs-tree',
    title: 'Breadth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement BFS to traverse a binary tree level by level.',
    instructions: [
      'Return values in level-order (top to bottom, left to right)',
      'Use a collections.deque as a queue for efficiency',
      'BFS processes all nodes at current depth before going deeper',
    ],
    starterCode: `from collections import deque

def bfs(root):
    if root is None:
        return []

    result = []
    queue = deque([root])

    while queue:
        # Dequeue, process, and enqueue children
        # YOUR CODE HERE

    return result`,
    solutionCode: `from collections import deque

def bfs(root):
    if root is None:
        return []

    result = []
    queue = deque([root])

    while queue:
        node = queue.popleft()
        result.append(node['value'])

        if node.get('left'):
            queue.append(node['left'])
        if node.get('right'):
            queue.append(node['right'])

    return result`,
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
    ],
    hints: [
      'Use popleft() for O(1) dequeue from front',
      'Use append() to add children to back',
      'Check if child exists before adding to queue',
    ],
    concepts: ['BFS', 'deque', 'level-order traversal'],
  },

  // ========== SEARCHING ==========
  {
    id: 'py-binary-search',
    title: 'Binary Search',
    category: 'searching',
    difficulty: 'intermediate',
    description: 'Implement binary search to find an element in a sorted list.',
    instructions: [
      'Given a sorted list and target, return the index of target or -1',
      'Binary search halves the search space each iteration',
      'Time complexity: O(log n)',
    ],
    starterCode: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        # Calculate mid and compare
        # YOUR CODE HERE

    return -1`,
    solutionCode: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
    testCases: [
      { input: [[1, 3, 5, 7, 9, 11], 7], expected: 3, description: 'Find 7' },
      { input: [[1, 3, 5, 7, 9, 11], 1], expected: 0, description: 'Find first' },
      { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: 'Not found' },
    ],
    hints: [
      'Integer division: mid = (left + right) // 2',
      'Adjust left or right based on comparison',
      'Loop while left <= right',
    ],
    concepts: ['binary search', 'divide and conquer', 'logarithmic complexity'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'py-dict-iteration',
    title: 'Dictionary Iteration Patterns',
    category: 'data-structures',
    difficulty: 'beginner',
    description: 'Master different ways to iterate over dictionaries.',
    instructions: [
      'Given a dict, return a list of strings "key: value" for each entry',
      'Use .items() to get both key and value',
      'Sort the output by keys for consistent ordering',
    ],
    starterCode: `def format_dict(d):
    result = []
    # Iterate over dictionary items
    # YOUR CODE HERE

    return sorted(result)`,
    solutionCode: `def format_dict(d):
    result = []
    for key, value in d.items():
        result.append(f"{key}: {value}")
    return sorted(result)`,
    testCases: [
      {
        input: { a: 1, b: 2, c: 3 },
        expected: ['a: 1', 'b: 2', 'c: 3'],
        description: 'Basic dict',
      },
      { input: { x: 10 }, expected: ['x: 10'], description: 'Single item' },
      { input: {}, expected: [], description: 'Empty dict' },
    ],
    hints: [
      'd.items() returns (key, value) pairs',
      'Use f-strings: f"{key}: {value}"',
      '.keys() for keys only, .values() for values only',
    ],
    concepts: ['dictionary iteration', 'items()', 'f-strings'],
  },
];

export default pythonExercises;
