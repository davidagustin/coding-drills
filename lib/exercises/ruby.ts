import type { Exercise } from './types';

export const rubyExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'rb-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Learn to iterate through an array while skipping every other element using each_with_index or step. This pattern is foundational for sampling, downsampling, and processing alternating data.',
    explanation: `In Ruby, each_with_index gives you both the element and its index during iteration, letting you selectively process elements based on their position. Alternatively, you can use (0...arr.length).step(2) to generate only even indices directly.\n\nThe step method on Range is idiomatic Ruby and produces cleaner code than manually checking indices. Both approaches yield O(n) time and O(n/2) space for the output.\n\nThis pattern appears in data sampling, processing alternating rows/columns, and interleaving operations.`,
    instructions: [
      'Given an array of numbers, return a new array containing only elements at even indices (0, 2, 4, ...)',
      'Use each_with_index with a conditional, or use step on a range',
      'Both approaches are idiomatic Ruby',
    ],
    starterCode: `def skip_every_other(arr)
  result = []
  # Use each_with_index or step to select even-indexed elements
  # TODO: implement

  result
end`,
    solutionCode: `def skip_every_other(arr)
  result = []
  arr.each_with_index do |elem, i|
    result << elem if i.even?
  end
  result
end`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [1, 3, 5], description: 'Basic even-length array' },
      { input: [10, 20, 30, 40, 50], expected: [10, 30, 50], description: 'Odd-length array' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty array' },
    ],
    hints: [
      'each_with_index yields both the element and index to the block',
      'Use i.even? to check if the index is even',
      'Alternative: (0...arr.length).step(2).map { |i| arr[i] }',
    ],
    concepts: ['each_with_index', 'step', 'blocks', 'even?'],
  },
  {
    id: 'rb-reverse-iteration',
    title: 'Reverse Array Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array from the last element to the first using reverse_each. Reverse iteration is essential for in-place algorithms, stack-based processing, and processing collections from the end.',
    explanation: `Ruby provides reverse_each as a built-in method on Array that iterates from the last element to the first without creating a reversed copy of the array. This is more memory-efficient than calling reverse.each.\n\nThe reverse_each method yields each element in reverse order. Time complexity is O(n) and space is O(n) for the output array (but the iteration itself uses O(1) extra space).\n\nReverse traversal is essential when processing elements from the end, such as evaluating postfix expressions, removing elements during iteration, or implementing undo-style operations.`,
    instructions: [
      'Given an array, return a new array with elements in reverse order',
      'Use reverse_each to iterate backwards',
      'Do not use the reverse method directly on the input',
    ],
    starterCode: `def reverse_iterate(arr)
  result = []
  # Use reverse_each to iterate from end to beginning
  # TODO: implement

  result
end`,
    solutionCode: `def reverse_iterate(arr)
  result = []
  arr.reverse_each do |elem|
    result << elem
  end
  result
end`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Basic reverse' },
      { input: ['a', 'b', 'c'], expected: ['c', 'b', 'a'], description: 'String array' },
      { input: [42], expected: [42], description: 'Single element' },
      { input: [], expected: [], description: 'Empty array' },
    ],
    hints: [
      'reverse_each iterates from the last element to the first',
      'Use the << operator to append to the result array',
      'reverse_each does not create a new reversed array internally',
    ],
    concepts: ['reverse_each', 'blocks', 'array iteration'],
  },
  {
    id: 'rb-step-iteration',
    title: 'Custom Step Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array with a custom step size using Range#step. Variable-step iteration is used for downsampling data, batch processing, and creating strided views over arrays.',
    explanation: `Ruby ranges support the step method, which lets you iterate with any increment. The expression (0...arr.length).step(n) generates indices 0, n, 2n, etc., giving you elements at regular intervals.\n\nThis is cleaner than a C-style for loop with a custom increment. The step method works on any numeric range and is also available via Numeric#step.\n\nTime complexity is O(arr.length / step) and space is O(arr.length / step) for the output.`,
    instructions: [
      'Given an array and a step size, return elements at indices that are multiples of the step',
      'For step=3: return elements at indices 0, 3, 6, 9...',
      'Use Range#step to generate the indices',
    ],
    starterCode: `def step_iterate(arr, step)
  result = []
  # Use (0...arr.length).step(step) to iterate
  # TODO: implement

  result
end`,
    solutionCode: `def step_iterate(arr, step)
  result = []
  (0...arr.length).step(step) do |i|
    result << arr[i]
  end
  result
end`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 3], expected: [1, 4, 7], description: 'Step of 3' },
      { input: [[10, 20, 30, 40, 50], 2], expected: [10, 30, 50], description: 'Step of 2' },
      { input: [[1, 2, 3], 5], expected: [1], description: 'Step larger than array' },
      { input: [[], 2], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Use (0...arr.length).step(step) to generate indices',
      'The ... range excludes the end value',
      'The first element (index 0) is always included if array is non-empty',
    ],
    concepts: ['Range#step', 'blocks', 'modular iteration'],
  },
  {
    id: 'rb-nested-loop-matrix',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a 2D array (matrix) row by row using nested iteration and collect all elements into a flat array. This is fundamental to image processing, game boards, and grid-based algorithms.',
    explanation: `Nested iteration over a matrix visits every element in row-major order. In Ruby, you can use nested each blocks or each_with_index for index access.\n\nThe outer loop selects each row, and the inner loop visits each column within that row. Time complexity is O(m * n) where m is rows and n is columns. This is optimal since every element must be visited.\n\nRuby also provides Array#flatten for this exact purpose, but understanding the manual nested-loop pattern is crucial for more complex matrix operations like spiral traversal, diagonal iteration, or applying transformations.`,
    instructions: [
      'Given a 2D array (matrix), return a flat array of all elements',
      'Traverse row by row, from left to right',
      'Use nested each blocks',
    ],
    starterCode: `def flatten_matrix(matrix)
  result = []
  # Use nested each blocks to traverse the matrix
  # TODO: implement

  result
end`,
    solutionCode: `def flatten_matrix(matrix)
  result = []
  matrix.each do |row|
    row.each do |elem|
      result << elem
    end
  end
  result
end`,
    testCases: [
      {
        input: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: [1, 2, 3, 4],
        description: '2x2 matrix',
      },
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        description: '3x3 matrix',
      },
      { input: [[[1]]], expected: [1], description: '1x1 matrix' },
      { input: [[]], expected: [], description: 'Empty matrix' },
    ],
    hints: [
      'Outer each iterates over rows',
      'Inner each iterates over elements in each row',
      'Use << to append each element to result',
    ],
    concepts: ['nested iteration', 'each', 'matrix', '2D arrays'],
  },
  {
    id: 'rb-sliding-window-max-sum',
    title: 'Sliding Window Maximum Sum',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the maximum sum of any contiguous subarray of size k using the sliding window technique. This O(n) pattern avoids recalculating the entire window sum from scratch each time.',
    explanation: `The sliding window technique maintains a running sum as the window slides across the array. When the window moves one position right, you add the new element entering the window and subtract the element leaving it.\n\nFirst compute the sum of the initial window (first k elements). Then slide: add arr[i], subtract arr[i - k], and update the maximum. This gives O(n) time and O(1) extra space.\n\nThis pattern is widely used for moving averages, finding maximum/minimum in a window, and many subarray problems.`,
    instructions: [
      'Given an array and window size k, find the maximum sum of any contiguous subarray of size k',
      'Use the sliding window technique for O(n) time complexity',
      'Return the maximum sum found',
    ],
    starterCode: `def max_sum_subarray(arr, k)
  return 0 if arr.length < k

  # Calculate initial window sum
  # TODO: implement

  # Slide the window and track maximum
  # TODO: implement
end`,
    solutionCode: `def max_sum_subarray(arr, k)
  return 0 if arr.length < k

  window_sum = arr[0...k].sum
  max_sum = window_sum

  (k...arr.length).each do |i|
    window_sum += arr[i] - arr[i - k]
    max_sum = window_sum if window_sum > max_sum
  end

  max_sum
end`,
    testCases: [
      { input: [[1, 4, 2, 10, 2, 3, 1, 0, 20], 4], expected: 24, description: 'Window of 4' },
      { input: [[2, 1, 5, 1, 3, 2], 3], expected: 9, description: 'Window of 3' },
      { input: [[5, 5, 5, 5], 2], expected: 10, description: 'All equal elements' },
      { input: [[1, 2, 3], 3], expected: 6, description: 'Window equals array length' },
    ],
    hints: [
      'Calculate the sum of the first k elements as the initial window',
      'Slide by adding the new element and subtracting the element that left',
      'Track the maximum sum seen so far',
    ],
    concepts: ['sliding window', 'running sum', 'O(n) optimization'],
  },
  {
    id: 'rb-two-pointer-palindrome',
    title: 'Two Pointer Palindrome Check',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Use the two-pointer technique to check if a string is a palindrome. Two pointers moving inward from both ends is a classic O(n) pattern for symmetric comparisons.',
    explanation: `The two-pointer technique uses one pointer starting at the beginning and another at the end, moving them toward each other. For palindrome checking, compare characters at both pointers and move inward.\n\nIf at any point the characters differ, the string is not a palindrome. If the pointers meet or cross without finding a mismatch, it is a palindrome.\n\nThis approach uses O(n) time and O(1) extra space, making it optimal for in-place comparisons. The pattern extends to problems like two-sum on sorted arrays, container with most water, and removing duplicates.`,
    instructions: [
      'Given a string, determine if it is a palindrome using two pointers',
      'Use a left pointer starting at 0 and a right pointer starting at the end',
      'Compare characters and move pointers inward',
    ],
    starterCode: `def palindrome?(str)
  left = 0
  right = str.length - 1

  # Compare characters from both ends moving inward
  # TODO: implement
end`,
    solutionCode: `def palindrome?(str)
  left = 0
  right = str.length - 1

  while left < right
    return false if str[left] != str[right]
    left += 1
    right -= 1
  end

  true
end`,
    testCases: [
      { input: 'racecar', expected: true, description: 'Odd-length palindrome' },
      { input: 'abba', expected: true, description: 'Even-length palindrome' },
      { input: 'hello', expected: false, description: 'Not a palindrome' },
      { input: 'a', expected: true, description: 'Single character' },
      { input: '', expected: true, description: 'Empty string' },
    ],
    hints: [
      'Initialize left = 0 and right = str.length - 1',
      'Loop while left < right',
      'Return false immediately if characters differ',
    ],
    concepts: ['two pointers', 'palindrome', 'string comparison'],
  },

  // ========== RECURSION ==========
  {
    id: 'rb-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate the nth Fibonacci number using recursion. This classic problem illustrates the recursive call pattern and the importance of base cases.',
    explanation: `The Fibonacci sequence is defined by fib(0) = 0, fib(1) = 1, and fib(n) = fib(n-1) + fib(n-2) for n > 1. This maps naturally to a recursive implementation.\n\nEach call branches into two sub-calls, creating a binary tree of calls. The naive recursive approach has O(2^n) time complexity due to redundant calculations, which makes it impractical for large n without memoization.\n\nThe key learning is recognizing overlapping subproblems: fib(5) calls fib(3) and fib(4), but fib(4) also calls fib(3). This redundancy motivates dynamic programming and memoization.`,
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1',
      'Use recursion: fib(n) = fib(n-1) + fib(n-2)',
    ],
    starterCode: `def fibonacci(n)
  # Base cases
  # TODO: implement

  # Recursive case
  # TODO: implement
end`,
    solutionCode: `def fibonacci(n)
  return 0 if n <= 0
  return 1 if n == 1

  fibonacci(n - 1) + fibonacci(n - 2)
end`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 5, expected: 5, description: 'fib(5)' },
      { input: 10, expected: 55, description: 'fib(10)' },
    ],
    hints: [
      'Base cases: return 0 for n <= 0, return 1 for n == 1',
      'Recursive case: fibonacci(n - 1) + fibonacci(n - 2)',
      'Use guard clauses with return for base cases',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci', 'guard clause'],
  },
  {
    id: 'rb-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate factorial using recursion. Factorial is a classic example of a function that naturally decomposes into a smaller version of itself.',
    explanation: `Factorial is defined as n! = n * (n-1) * ... * 2 * 1, with the base case 0! = 1! = 1. This naturally maps to the recursive relation: factorial(n) = n * factorial(n - 1).\n\nEach recursive call reduces the problem size by 1, creating a linear chain of calls. The time complexity is O(n) and the space complexity is O(n) due to the call stack.\n\nIn Ruby, you can also express this with the inject method: (1..n).inject(:*), but the recursive version teaches the fundamental pattern of breaking a problem into base case + recursive case.`,
    instructions: [
      'Return n! (n factorial)',
      'factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: factorial(0) = factorial(1) = 1',
    ],
    starterCode: `def factorial(n)
  # Base case
  # TODO: implement

  # Recursive case
  # TODO: implement
end`,
    solutionCode: `def factorial(n)
  return 1 if n <= 1

  n * factorial(n - 1)
end`,
    testCases: [
      { input: 0, expected: 1, description: '0!' },
      { input: 1, expected: 1, description: '1!' },
      { input: 5, expected: 120, description: '5!' },
      { input: 10, expected: 3628800, description: '10!' },
    ],
    hints: [
      'Base case: return 1 if n <= 1',
      'Recursive case: n * factorial(n - 1)',
      'Use a guard clause for the base case',
    ],
    concepts: ['recursion', 'factorial', 'base case', 'guard clause'],
  },
  {
    id: 'rb-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Solve the Tower of Hanoi puzzle recursively. Move n disks from the source peg to the target peg using an auxiliary peg, following the rules that only one disk can be moved at a time and no larger disk may be placed on a smaller one.',
    explanation: `The Tower of Hanoi is a classic recursive problem. To move n disks from source to target:\n1. Move n-1 disks from source to auxiliary (using target as helper)\n2. Move the nth (largest) disk from source to target\n3. Move n-1 disks from auxiliary to target (using source as helper)\n\nThe base case is moving a single disk directly. The recursive structure naturally handles the constraint that larger disks cannot be placed on smaller ones.\n\nThe total number of moves is 2^n - 1, making the time complexity O(2^n). This problem beautifully illustrates how complex tasks decompose into simpler recursive sub-tasks.`,
    instructions: [
      'Return an array of moves to solve Tower of Hanoi with n disks',
      'Each move is an array [from, to] representing moving a disk from one peg to another',
      'Pegs are labeled "A" (source), "B" (auxiliary), "C" (target)',
    ],
    starterCode: `def tower_of_hanoi(n, source = "A", target = "C", auxiliary = "B")
  moves = []

  def solve(n, source, target, auxiliary, moves)
    # Base case: move single disk
    # TODO: implement

    # Recursive case: move n-1 to auxiliary, move nth to target, move n-1 to target
    # TODO: implement
  end

  solve(n, source, target, auxiliary, moves)
  moves
end`,
    solutionCode: `def tower_of_hanoi(n, source = "A", target = "C", auxiliary = "B")
  moves = []

  def solve(n, source, target, auxiliary, moves)
    if n == 1
      moves << [source, target]
      return
    end

    solve(n - 1, source, auxiliary, target, moves)
    moves << [source, target]
    solve(n - 1, auxiliary, target, source, moves)
  end

  solve(n, source, target, auxiliary, moves)
  moves
end`,
    testCases: [
      {
        input: 1,
        expected: [['A', 'C']],
        description: '1 disk',
      },
      {
        input: 2,
        expected: [
          ['A', 'B'],
          ['A', 'C'],
          ['B', 'C'],
        ],
        description: '2 disks',
      },
      {
        input: 3,
        expected: [
          ['A', 'C'],
          ['A', 'B'],
          ['C', 'B'],
          ['A', 'C'],
          ['B', 'A'],
          ['B', 'C'],
          ['A', 'C'],
        ],
        description: '3 disks',
      },
    ],
    hints: [
      'Base case: when n == 1, just move the disk directly',
      'Recursive step: move n-1 disks to auxiliary, move disk n to target, move n-1 disks from auxiliary to target',
      'The number of moves is 2^n - 1',
    ],
    concepts: ['recursion', 'divide and conquer', 'Tower of Hanoi'],
  },
  {
    id: 'rb-flatten-nested-array',
    title: 'Flatten Nested Array',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Recursively flatten an arbitrarily nested array into a single-level array. This teaches recursive processing of mixed-type collections.',
    explanation: `Flattening a nested array requires checking each element: if it is an array, recursively flatten it; otherwise, add it to the result. This is a natural recursive pattern where the depth of nesting determines the recursion depth.\n\nRuby provides Array#flatten built-in, but implementing it manually teaches you to handle heterogeneous collections recursively. The is_a?(Array) check determines the branching logic.\n\nTime complexity is O(n) where n is the total number of elements across all nesting levels. Space complexity is O(d) for the call stack where d is the maximum nesting depth, plus O(n) for the output.`,
    instructions: [
      'Given a nested array, return a flat array with all elements at the top level',
      'Handle arbitrary nesting depth',
      'Do not use the built-in flatten method',
    ],
    starterCode: `def my_flatten(arr)
  result = []
  # Iterate through arr: if element is an Array, recurse; otherwise, add to result
  # TODO: implement

  result
end`,
    solutionCode: `def my_flatten(arr)
  result = []
  arr.each do |elem|
    if elem.is_a?(Array)
      result.concat(my_flatten(elem))
    else
      result << elem
    end
  end
  result
end`,
    testCases: [
      { input: [[1, [2, [3, 4]], 5]], expected: [1, 2, 3, 4, 5], description: 'Nested arrays' },
      { input: [[1, 2, 3]], expected: [1, 2, 3], description: 'Already flat' },
      {
        input: [[[1], [[2]], [[[3]]]]],
        expected: [1, 2, 3],
        description: 'Deeply nested',
      },
      { input: [[]], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Use is_a?(Array) to check if an element is an array',
      'Use concat to merge the recursively flattened sub-array',
      'Base behavior: non-array elements are appended directly',
    ],
    concepts: ['recursion', 'is_a?', 'flatten', 'concat'],
  },
  {
    id: 'rb-generate-permutations',
    title: 'Generate Permutations',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Generate all permutations of an array using recursive backtracking. Permutations are fundamental to combinatorial search, optimization, and constraint satisfaction problems.',
    explanation: `Generating permutations uses a backtracking approach: for each position, try every unused element, recurse to fill the remaining positions, then undo the choice (backtrack) to try the next option.\n\nThe algorithm maintains a current permutation and a set of used indices. At each step, iterate over all elements; if unused, add it to the current permutation, mark it used, recurse, then unmark and remove it.\n\nThere are n! permutations of n elements, so the time complexity is O(n * n!), which is optimal since you must generate all of them. This pattern is the basis for solving problems like N-Queens, Sudoku, and other constraint satisfaction problems.`,
    instructions: [
      'Given an array, return all possible permutations',
      'Use recursive backtracking',
      'Return an array of arrays, each being one permutation',
    ],
    starterCode: `def permutations(arr)
  result = []

  backtrack = lambda do |current, used|
    # Base case: permutation is complete
    # TODO: implement

    # Try each unused element
    # TODO: implement
  end

  backtrack.call([], Array.new(arr.length, false))
  result
end`,
    solutionCode: `def permutations(arr)
  result = []

  backtrack = lambda do |current, used|
    if current.length == arr.length
      result << current.dup
      return
    end

    arr.each_with_index do |elem, i|
      next if used[i]

      used[i] = true
      current << elem
      backtrack.call(current, used)
      current.pop
      used[i] = false
    end
  end

  backtrack.call([], Array.new(arr.length, false))
  result
end`,
    testCases: [
      {
        input: [1, 2, 3],
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
        input: [1, 2],
        expected: [
          [1, 2],
          [2, 1],
        ],
        description: 'Two elements',
      },
      { input: [1], expected: [[1]], description: 'Single element' },
    ],
    hints: [
      'Base case: when current.length == arr.length, save a copy of current',
      'Use a used array to track which elements are already in the permutation',
      'After recursing, undo the choice: pop from current and mark unused',
      'Use lambda with backtrack.call() instead of nested def for proper closure',
    ],
    concepts: ['backtracking', 'permutations', 'recursion', 'lambda', 'dup'],
  },

  // ========== SEARCHING ==========
  {
    id: 'rb-binary-search',
    title: 'Binary Search',
    category: 'searching',
    difficulty: 'beginner',
    description:
      'Implement binary search to find an element in a sorted array. Binary search halves the search space each iteration, achieving O(log n) time complexity.',
    explanation: `Binary search works on sorted arrays by repeatedly comparing the target to the middle element. If the target is less, search the left half; if greater, search the right half; if equal, return the index.\n\nThe key invariant is that the target, if present, always lies within [left, right]. Each comparison eliminates half the remaining elements, giving O(log n) time complexity and O(1) space.\n\nBinary search is one of the most important algorithms in computer science, used in database indexing, searching sorted files, and as a subroutine in many complex algorithms.`,
    instructions: [
      'Given a sorted array and target, return the index of target or -1 if not found',
      'Use iterative binary search with left and right pointers',
      'Time complexity should be O(log n)',
    ],
    starterCode: `def binary_search(arr, target)
  left = 0
  right = arr.length - 1

  while left <= right
    # Calculate mid and compare with target
    # TODO: implement
  end

  -1
end`,
    solutionCode: `def binary_search(arr, target)
  left = 0
  right = arr.length - 1

  while left <= right
    mid = (left + right) / 2

    if arr[mid] == target
      return mid
    elsif arr[mid] < target
      left = mid + 1
    else
      right = mid - 1
    end
  end

  -1
end`,
    testCases: [
      { input: [[1, 3, 5, 7, 9, 11], 7], expected: 3, description: 'Find 7' },
      { input: [[1, 3, 5, 7, 9, 11], 1], expected: 0, description: 'Find first element' },
      { input: [[1, 3, 5, 7, 9, 11], 11], expected: 5, description: 'Find last element' },
      { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: 'Not found' },
    ],
    hints: [
      'Calculate mid as (left + right) / 2 (integer division in Ruby)',
      'If arr[mid] < target, search right: left = mid + 1',
      'If arr[mid] > target, search left: right = mid - 1',
    ],
    concepts: ['binary search', 'divide and conquer', 'O(log n)'],
  },
  {
    id: 'rb-binary-search-iterative',
    title: 'Binary Search (First Occurrence)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find the first occurrence of a target in a sorted array that may contain duplicates. This variation of binary search requires careful handling of the boundary when the target is found.',
    explanation: `When duplicates exist, a standard binary search might find any occurrence. To find the first occurrence, when you find the target, do not return immediately. Instead, record the position and continue searching the left half.\n\nThe key modification: when arr[mid] == target, set result = mid and then search left (right = mid - 1) to see if there is an earlier occurrence. This still maintains O(log n) time.\n\nThis pattern is used in lower_bound/upper_bound searches, finding insertion points, and counting occurrences in sorted arrays.`,
    instructions: [
      'Given a sorted array with possible duplicates and a target, return the index of the first occurrence',
      'Return -1 if the target is not found',
      'When the target is found, continue searching left for an earlier occurrence',
    ],
    starterCode: `def first_occurrence(arr, target)
  left = 0
  right = arr.length - 1
  result = -1

  while left <= right
    # Find mid, update result when found, keep searching left
    # TODO: implement
  end

  result
end`,
    solutionCode: `def first_occurrence(arr, target)
  left = 0
  right = arr.length - 1
  result = -1

  while left <= right
    mid = (left + right) / 2

    if arr[mid] == target
      result = mid
      right = mid - 1
    elsif arr[mid] < target
      left = mid + 1
    else
      right = mid - 1
    end
  end

  result
end`,
    testCases: [
      { input: [[1, 2, 2, 2, 3, 4], 2], expected: 1, description: 'First of multiple 2s' },
      { input: [[1, 1, 1, 1, 1], 1], expected: 0, description: 'All same elements' },
      { input: [[1, 3, 5, 7, 9], 5], expected: 2, description: 'No duplicates' },
      { input: [[1, 3, 5, 7, 9], 4], expected: -1, description: 'Not found' },
    ],
    hints: [
      'When arr[mid] == target, save the index but keep searching left',
      'Set right = mid - 1 to continue searching for an earlier occurrence',
      'The result variable stores the best (leftmost) index found so far',
    ],
    concepts: ['binary search', 'first occurrence', 'lower bound'],
  },
  {
    id: 'rb-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'advanced',
    description:
      'Search for a target in a sorted array that has been rotated at some pivot. This combines binary search with rotation analysis and is a classic interview problem.',
    explanation: `A rotated sorted array like [4,5,6,7,0,1,2] has two sorted halves. At each binary search step, determine which half is sorted by comparing arr[left] with arr[mid].\n\nIf the left half is sorted (arr[left] <= arr[mid]), check if the target falls within [arr[left], arr[mid]]. If so, search left; otherwise, search right. Apply symmetric logic when the right half is sorted.\n\nThis maintains O(log n) time by always eliminating half the search space. The key insight is that at least one half of the array around mid is always sorted.`,
    instructions: [
      'Given a rotated sorted array and target, return its index or -1',
      'The array was sorted in ascending order then rotated at some pivot',
      'Achieve O(log n) time complexity',
    ],
    starterCode: `def search_rotated(arr, target)
  left = 0
  right = arr.length - 1

  while left <= right
    mid = (left + right) / 2
    # Determine which half is sorted and narrow the search
    # TODO: implement
  end

  -1
end`,
    solutionCode: `def search_rotated(arr, target)
  left = 0
  right = arr.length - 1

  while left <= right
    mid = (left + right) / 2

    return mid if arr[mid] == target

    if arr[left] <= arr[mid]
      if target >= arr[left] && target < arr[mid]
        right = mid - 1
      else
        left = mid + 1
      end
    else
      if target > arr[mid] && target <= arr[right]
        left = mid + 1
      else
        right = mid - 1
      end
    end
  end

  -1
end`,
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4, description: 'Find 0 in rotated array' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 4], expected: 0, description: 'Find first element' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1, description: 'Not found' },
      { input: [[1], 1], expected: 0, description: 'Single element found' },
    ],
    hints: [
      'Check if arr[left] <= arr[mid] to determine if the left half is sorted',
      'If the target is within the sorted half range, search there',
      'Otherwise, search the other half',
    ],
    concepts: ['binary search', 'rotated array', 'sorted halves'],
  },
  {
    id: 'rb-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find a peak element in an array where a peak is greater than its neighbors. Use binary search to achieve O(log n) time complexity.',
    explanation: `A peak element is one that is greater than both its neighbors. The first and last elements only need to be greater than their single neighbor.\n\nBinary search works here because if arr[mid] < arr[mid + 1], a peak must exist in the right half (the values are increasing toward the right). Conversely, if arr[mid] < arr[mid - 1], a peak exists in the left half.\n\nThis guarantees O(log n) time because we eliminate half the array each step. The proof relies on the fact that if you walk uphill, you must eventually reach a peak (or the array boundary).`,
    instructions: [
      'Find the index of any peak element in the array',
      'A peak element is strictly greater than its neighbors',
      'Use binary search for O(log n) time complexity',
    ],
    starterCode: `def find_peak(arr)
  return 0 if arr.length <= 1

  left = 0
  right = arr.length - 1

  while left < right
    mid = (left + right) / 2
    # Compare mid with its neighbor to decide direction
    # TODO: implement
  end

  left
end`,
    solutionCode: `def find_peak(arr)
  return 0 if arr.length <= 1

  left = 0
  right = arr.length - 1

  while left < right
    mid = (left + right) / 2

    if arr[mid] < arr[mid + 1]
      left = mid + 1
    else
      right = mid
    end
  end

  left
end`,
    testCases: [
      { input: [1, 3, 20, 4, 1, 0], expected: 2, description: 'Peak in middle' },
      { input: [1, 2, 3, 4, 5], expected: 4, description: 'Peak at end' },
      { input: [5, 4, 3, 2, 1], expected: 0, description: 'Peak at start' },
      { input: [1, 3, 2], expected: 1, description: 'Simple peak' },
    ],
    hints: [
      'If arr[mid] < arr[mid + 1], the peak is to the right',
      'Otherwise, the peak is at mid or to the left',
      'Use left < right (not left <= right) to converge on the peak',
    ],
    concepts: ['binary search', 'peak finding', 'O(log n)'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'rb-hash-operations',
    title: 'Hash Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Master Ruby Hash operations for counting occurrences. Hashes are the go-to data structure for frequency counting, lookups, and grouping.',
    explanation: `Ruby Hashes provide O(1) average-time lookups, insertions, and deletions. For frequency counting, the idiomatic pattern is to use Hash.new(0) which sets a default value of 0 for missing keys.\n\nWith a default value, you can simply do hash[key] += 1 without checking if the key exists first. This eliminates the need for conditional initialization.\n\nHashes in Ruby are ordered by insertion order (since Ruby 1.9), which makes them useful for maintaining insertion-order while providing fast lookups.`,
    instructions: [
      'Given an array, return a hash where keys are elements and values are their counts',
      'Use Hash.new(0) for default values',
      'Return the frequency hash',
    ],
    starterCode: `def frequency_count(arr)
  counts = Hash.new(0)
  # Count occurrences of each element
  # TODO: implement

  counts
end`,
    solutionCode: `def frequency_count(arr)
  counts = Hash.new(0)
  arr.each do |elem|
    counts[elem] += 1
  end
  counts
end`,
    testCases: [
      {
        input: ['a', 'b', 'a', 'c', 'b', 'a'],
        expected: { a: 3, b: 2, c: 1 },
        description: 'String frequency',
      },
      {
        input: [1, 1, 2, 3, 3, 3],
        expected: { 1: 2, 2: 1, 3: 3 },
        description: 'Number frequency',
      },
      { input: ['x'], expected: { x: 1 }, description: 'Single element' },
      { input: [], expected: {}, description: 'Empty array' },
    ],
    hints: [
      'Hash.new(0) sets default value to 0 for missing keys',
      'counts[elem] += 1 works without checking key existence',
      'Alternatively: arr.tally returns the same result in one call',
    ],
    concepts: ['Hash', 'Hash.new', 'frequency counting', 'tally'],
  },
  {
    id: 'rb-stack-operations',
    title: 'Stack Operations',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a stack using Ruby Array with push, pop, peek, and empty? operations. Stacks follow the Last-In-First-Out (LIFO) principle.',
    explanation: `A stack is a LIFO (Last-In, First-Out) data structure. Ruby arrays naturally support stack operations: push adds to the end, pop removes from the end, and last peeks at the top.\n\nStacks are used for expression evaluation, backtracking, undo systems, and matching brackets. The key operations all run in O(1) amortized time.\n\nImplementing a stack class teaches encapsulation and provides a clean interface that restricts array access to only stack-appropriate operations.`,
    instructions: [
      'Implement a Stack class using an Array internally',
      'Implement push(val), pop, peek, empty?, and size methods',
      'Demonstrate the stack by processing a sequence of operations',
    ],
    starterCode: `class Stack
  def initialize
    @data = []
  end

  def push(val)
    # TODO: implement
  end

  def pop
    # TODO: implement
  end

  def peek
    # TODO: implement
  end

  def empty?
    # TODO: implement
  end

  def size
    # TODO: implement
  end
end`,
    solutionCode: `class Stack
  def initialize
    @data = []
  end

  def push(val)
    @data.push(val)
  end

  def pop
    @data.pop
  end

  def peek
    @data.last
  end

  def empty?
    @data.empty?
  end

  def size
    @data.length
  end
end`,
    testCases: [
      {
        input: { operations: ['push 1', 'push 2', 'push 3', 'pop', 'peek'] },
        expected: { pop: 3, peek: 2, size: 2 },
        description: 'Push three, pop one, peek',
      },
      {
        input: { operations: ['push 10', 'push 20', 'pop', 'pop', 'empty?'] },
        expected: { empty: true, size: 0 },
        description: 'Push and pop all, check empty',
      },
    ],
    hints: [
      'Use @data.push(val) for push',
      'Use @data.pop for pop (returns the removed element)',
      'Use @data.last for peek (returns without removing)',
    ],
    concepts: ['stack', 'LIFO', 'push', 'pop', 'class'],
  },
  {
    id: 'rb-queue-operations',
    title: 'Queue Operations',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a queue using Ruby Array with enqueue, dequeue, front, and empty? operations. Queues follow the First-In-First-Out (FIFO) principle.',
    explanation: `A queue is a FIFO (First-In, First-Out) data structure. In Ruby, you can use push to add to the back and shift to remove from the front.\n\nNote: Array#shift is O(n) because it moves all remaining elements. For performance-critical code, use a doubly-linked list or the thread-safe Queue from the standard library. For learning purposes, the array-based implementation is clear and simple.\n\nQueues are essential for BFS traversal, task scheduling, buffering, and producer-consumer patterns.`,
    instructions: [
      'Implement a Queue class using an Array internally',
      'Implement enqueue(val), dequeue, front, empty?, and size methods',
      'enqueue adds to the back, dequeue removes from the front',
    ],
    starterCode: `class Queue
  def initialize
    @data = []
  end

  def enqueue(val)
    # TODO: implement
  end

  def dequeue
    # TODO: implement
  end

  def front
    # TODO: implement
  end

  def empty?
    # TODO: implement
  end

  def size
    # TODO: implement
  end
end`,
    solutionCode: `class Queue
  def initialize
    @data = []
  end

  def enqueue(val)
    @data.push(val)
  end

  def dequeue
    @data.shift
  end

  def front
    @data.first
  end

  def empty?
    @data.empty?
  end

  def size
    @data.length
  end
end`,
    testCases: [
      {
        input: { operations: ['enqueue 1', 'enqueue 2', 'enqueue 3', 'dequeue', 'front'] },
        expected: { dequeue: 1, front: 2, size: 2 },
        description: 'Enqueue three, dequeue one, check front',
      },
      {
        input: { operations: ['enqueue 10', 'dequeue', 'empty?'] },
        expected: { dequeue: 10, empty: true },
        description: 'Enqueue and dequeue, check empty',
      },
    ],
    hints: [
      'Use @data.push(val) to add to the back',
      'Use @data.shift to remove from the front',
      'Use @data.first to peek at the front element',
    ],
    concepts: ['queue', 'FIFO', 'enqueue', 'dequeue', 'shift'],
  },
  {
    id: 'rb-min-stack',
    title: 'Min Stack',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time. This requires maintaining auxiliary state alongside the main stack.',
    explanation: `A Min Stack maintains a second stack that tracks the minimum value at each level. When pushing, if the new value is less than or equal to the current minimum, push it onto the min stack too. When popping, if the popped value equals the current minimum, pop from the min stack as well.\n\nThis ensures that get_min always returns the top of the min stack in O(1) time. All operations (push, pop, top, get_min) run in O(1) time.\n\nAn alternative approach is to push pairs [value, current_min] onto the stack, which is slightly simpler but uses more space per element.`,
    instructions: [
      'Implement a MinStack class with push, pop, top, and get_min methods',
      'All operations must be O(1) time complexity',
      'Use an auxiliary stack to track minimums',
    ],
    starterCode: `class MinStack
  def initialize
    @stack = []
    @min_stack = []
  end

  def push(val)
    # Push to main stack and update min_stack if needed
    # TODO: implement
  end

  def pop
    # Pop from main stack and update min_stack if needed
    # TODO: implement
  end

  def top
    # TODO: implement
  end

  def get_min
    # TODO: implement
  end
end`,
    solutionCode: `class MinStack
  def initialize
    @stack = []
    @min_stack = []
  end

  def push(val)
    @stack.push(val)
    if @min_stack.empty? || val <= @min_stack.last
      @min_stack.push(val)
    end
  end

  def pop
    val = @stack.pop
    @min_stack.pop if val == @min_stack.last
    val
  end

  def top
    @stack.last
  end

  def get_min
    @min_stack.last
  end
end`,
    testCases: [
      {
        input: { operations: ['push -2', 'push 0', 'push -3', 'get_min', 'pop', 'top', 'get_min'] },
        expected: { min1: -3, pop: -3, top: 0, min2: -2 },
        description: 'Standard min stack operations',
      },
      {
        input: { operations: ['push 1', 'push 1', 'pop', 'get_min'] },
        expected: { min: 1 },
        description: 'Duplicate minimums',
      },
    ],
    hints: [
      'Maintain a second stack that only tracks minimum values',
      'Push to min_stack when the new value is <= current minimum',
      'Pop from min_stack when the popped value equals the current minimum',
    ],
    concepts: ['stack', 'min stack', 'auxiliary data structure', 'O(1) minimum'],
  },
  {
    id: 'rb-linked-list-reverse',
    title: 'Reverse a Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Reverse a singly linked list in-place. This classic problem tests understanding of pointer manipulation and is one of the most common interview questions.',
    explanation: `Reversing a linked list requires changing the next pointer of each node to point to the previous node instead. Use three pointers: prev (initially nil), current (initially head), and next_node (temporary).\n\nAt each step: save current.next, point current.next to prev, advance prev to current, and advance current to next_node. When current becomes nil, prev is the new head.\n\nThis runs in O(n) time and O(1) space. The technique of maintaining prev/current/next pointers is used in many linked list algorithms including reversing sublists and detecting cycles.`,
    instructions: [
      'Reverse a singly linked list represented as nested hashes',
      'Each node is a hash with :value and :next keys',
      'Return the new head of the reversed list',
    ],
    starterCode: `def reverse_list(head)
  prev = nil
  current = head

  # Iterate through the list, reversing pointers
  # TODO: implement

  prev
end`,
    solutionCode: `def reverse_list(head)
  prev = nil
  current = head

  while current
    next_node = current[:next]
    current[:next] = prev
    prev = current
    current = next_node
  end

  prev
end`,
    testCases: [
      {
        input: {
          value: 1,
          next: { value: 2, next: { value: 3, next: { value: 4, next: null } } },
        },
        expected: {
          value: 4,
          next: { value: 3, next: { value: 2, next: { value: 1, next: null } } },
        },
        description: 'Reverse 1->2->3->4',
      },
      {
        input: { value: 1, next: null },
        expected: { value: 1, next: null },
        description: 'Single node',
      },
      {
        input: null,
        expected: null,
        description: 'Empty list',
      },
    ],
    hints: [
      'Use three variables: prev, current, and next_node',
      'Save current[:next] before changing it',
      'After the loop, prev is the new head',
    ],
    concepts: ['linked list', 'pointer manipulation', 'in-place reversal'],
  },
  {
    id: 'rb-min-heap-insert',
    title: 'Min Heap / Priority Queue',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Implement a min heap with insert and extract_min operations. Heaps are the backbone of priority queues, used in Dijkstra's algorithm, job scheduling, and median finding.",
    explanation: `A min heap is a complete binary tree where each parent is less than or equal to its children. It is stored as an array where for index i, the left child is at 2i+1 and the right child is at 2i+2, with the parent at (i-1)/2.\n\nInsert: add the element at the end and "bubble up" by swapping with the parent while it is smaller. Extract min: remove the root (minimum), move the last element to the root, and "sift down" by swapping with the smaller child while it is larger.\n\nBoth operations are O(log n) where n is the heap size. Building a heap from n elements can be done in O(n) using the sift-down approach.`,
    instructions: [
      'Implement a MinHeap class with insert and extract_min methods',
      'Use an array to store the heap',
      'Implement bubble_up and sift_down helper methods',
    ],
    starterCode: `class MinHeap
  def initialize
    @data = []
  end

  def insert(val)
    # Add to end and bubble up
    # TODO: implement
  end

  def extract_min
    # Remove root, replace with last, sift down
    # TODO: implement
  end

  def size
    @data.length
  end

  def peek
    @data.first
  end

  private

  def bubble_up(index)
    # TODO: implement
  end

  def sift_down(index)
    # TODO: implement
  end
end`,
    solutionCode: `class MinHeap
  def initialize
    @data = []
  end

  def insert(val)
    @data << val
    bubble_up(@data.length - 1)
  end

  def extract_min
    return nil if @data.empty?

    min = @data[0]
    last = @data.pop

    unless @data.empty?
      @data[0] = last
      sift_down(0)
    end

    min
  end

  def size
    @data.length
  end

  def peek
    @data.first
  end

  private

  def bubble_up(index)
    while index > 0
      parent = (index - 1) / 2
      break if @data[parent] <= @data[index]

      @data[parent], @data[index] = @data[index], @data[parent]
      index = parent
    end
  end

  def sift_down(index)
    while true
      smallest = index
      left = 2 * index + 1
      right = 2 * index + 2

      smallest = left if left < @data.length && @data[left] < @data[smallest]
      smallest = right if right < @data.length && @data[right] < @data[smallest]

      break if smallest == index

      @data[index], @data[smallest] = @data[smallest], @data[index]
      index = smallest
    end
  end
end`,
    testCases: [
      {
        input: {
          operations: [
            'insert 5',
            'insert 3',
            'insert 7',
            'insert 1',
            'extract_min',
            'extract_min',
          ],
        },
        expected: { extract1: 1, extract2: 3 },
        description: 'Insert and extract minimums',
      },
      {
        input: { operations: ['insert 10', 'insert 20', 'insert 5', 'peek'] },
        expected: { peek: 5 },
        description: 'Peek at minimum',
      },
    ],
    hints: [
      'Parent of index i is at (i - 1) / 2',
      'Left child is at 2*i + 1, right child at 2*i + 2',
      'Bubble up: swap with parent while smaller; sift down: swap with smaller child while larger',
    ],
    concepts: ['heap', 'priority queue', 'bubble up', 'sift down', 'complete binary tree'],
  },

  // ========== TRAVERSAL ==========
  {
    id: 'rb-dfs-tree',
    title: 'Depth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement DFS to traverse a binary tree in pre-order. DFS explores as deep as possible along each branch before backtracking.',
    explanation: `Pre-order DFS visits the current node first, then recursively visits the left subtree, then the right subtree. This produces a root-left-right ordering.\n\nThe recursive implementation naturally uses the call stack, giving O(h) space where h is the tree height. Time complexity is O(n) since every node is visited exactly once.\n\nPre-order traversal is used for creating a copy of the tree, serializing tree structure, and prefix expression evaluation. The three DFS orderings (pre-order, in-order, post-order) differ only in when the current node is processed relative to its children.`,
    instructions: [
      'Given a tree node (hash with :value, :left, :right), return values in pre-order',
      'Pre-order: visit root, then left subtree, then right subtree',
      'Use recursion',
    ],
    starterCode: `def dfs_preorder(node)
  result = []

  traverse = ->(node) do
    return if node.nil?
    # Visit node, then left, then right
    # TODO: implement
  end

  traverse.call(node)
  result
end`,
    solutionCode: `def dfs_preorder(node)
  result = []

  traverse = ->(node) do
    return if node.nil?
    result << node[:value]
    traverse.call(node[:left])
    traverse.call(node[:right])
  end

  traverse.call(node)
  result
end`,
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
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 4, 5, 3],
        description: 'Deeper tree',
      },
    ],
    hints: [
      'Check if node is nil before accessing its properties',
      'Use lambdas (->) for inner recursive functions in Ruby',
      'Append value, then recurse left, then recurse right',
    ],
    concepts: ['DFS', 'pre-order traversal', 'recursion', 'lambda'],
  },
  {
    id: 'rb-bfs-tree',
    title: 'Breadth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement BFS to traverse a binary tree level by level. BFS processes all nodes at the current depth before moving to the next level.',
    explanation: `BFS uses a queue to process nodes level by level. Start with the root in the queue. While the queue is not empty, dequeue a node, process it, and enqueue its children.\n\nThis produces a level-order traversal: all nodes at depth 0, then depth 1, then depth 2, etc. Time complexity is O(n) and space is O(w) where w is the maximum width of the tree.\n\nBFS is used for shortest path in unweighted graphs, level-order traversal, and finding the minimum depth of a tree. In Ruby, you can use an Array as a queue with push and shift.`,
    instructions: [
      'Return values in level-order (top to bottom, left to right)',
      'Use an array as a queue with push and shift',
      'BFS processes all nodes at current depth before going deeper',
    ],
    starterCode: `def bfs(root)
  return [] if root.nil?

  result = []
  queue = [root]

  while !queue.empty?
    # Dequeue, process, and enqueue children
    # TODO: implement
  end

  result
end`,
    solutionCode: `def bfs(root)
  return [] if root.nil?

  result = []
  queue = [root]

  while !queue.empty?
    node = queue.shift
    result << node[:value]

    queue.push(node[:left]) if node[:left]
    queue.push(node[:right]) if node[:right]
  end

  result
end`,
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
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3, 4, 5],
        description: 'Deeper tree',
      },
    ],
    hints: [
      'Use queue.shift to dequeue from the front',
      'Use queue.push to enqueue children at the back',
      'Check if child exists before enqueuing',
    ],
    concepts: ['BFS', 'queue', 'level-order traversal'],
  },
  {
    id: 'rb-dfs-inorder',
    title: 'Inorder Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement in-order traversal of a binary search tree. In-order traversal visits nodes in sorted order for BSTs.',
    explanation: `In-order traversal visits the left subtree first, then the current node, then the right subtree. For a binary search tree, this produces values in ascending sorted order.\n\nThe recursive pattern is: recurse left, process current, recurse right. This is the most common traversal for BSTs because it naturally produces sorted output.\n\nTime complexity is O(n) and space is O(h) for the call stack where h is the tree height. In-order traversal is used for BST validation, finding the kth smallest element, and converting BSTs to sorted arrays.`,
    instructions: [
      'Given a binary tree node, return values in in-order (left, root, right)',
      'For a BST, this produces sorted output',
      'Use recursion',
    ],
    starterCode: `def inorder(node)
  result = []

  traverse = ->(node) do
    return if node.nil?
    # Traverse left, visit node, traverse right
    # TODO: implement
  end

  traverse.call(node)
  result
end`,
    solutionCode: `def inorder(node)
  result = []

  traverse = ->(node) do
    return if node.nil?
    traverse.call(node[:left])
    result << node[:value]
    traverse.call(node[:right])
  end

  traverse.call(node)
  result
end`,
    testCases: [
      {
        input: {
          value: 2,
          left: { value: 1, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3],
        description: 'Simple BST',
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
      'In-order means: left, then current, then right',
      'For a BST, this gives sorted order',
      'The recursive structure mirrors the traversal order',
    ],
    concepts: ['in-order traversal', 'BST', 'recursion', 'sorted output'],
  },
  {
    id: 'rb-graph-bfs',
    title: 'Graph BFS Traversal',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Implement BFS on an adjacency list graph. Graph BFS finds shortest paths in unweighted graphs and is used for level-order exploration of graph structures.',
    explanation: `Graph BFS is similar to tree BFS but requires a visited set to avoid infinite loops from cycles. Start from a source node, use a queue, and mark nodes as visited when they are enqueued (not when dequeued) to prevent duplicate processing.\n\nThe adjacency list representation uses a hash where each key maps to an array of neighbor keys. This is the standard graph representation for sparse graphs.\n\nTime complexity is O(V + E) where V is vertices and E is edges. BFS is used for shortest path in unweighted graphs, connected components, and bipartite checking.`,
    instructions: [
      'Given an adjacency list (hash) and start node, return nodes in BFS order',
      'Use a visited set to avoid revisiting nodes',
      'Return an array of node values in the order they are visited',
    ],
    starterCode: `def graph_bfs(graph, start)
  return [] unless graph.key?(start)

  visited = Set.new
  result = []
  queue = [start]

  # BFS with visited tracking
  # TODO: implement

  result
end`,
    solutionCode: `def graph_bfs(graph, start)
  return [] unless graph.key?(start)

  require 'set'
  visited = Set.new([start])
  result = []
  queue = [start]

  while !queue.empty?
    node = queue.shift
    result << node

    (graph[node] || []).each do |neighbor|
      unless visited.include?(neighbor)
        visited.add(neighbor)
        queue.push(neighbor)
      end
    end
  end

  result
end`,
    testCases: [
      {
        input: [{ A: ['B', 'C'], B: ['A', 'D'], C: ['A', 'D'], D: ['B', 'C'] }, 'A'],
        expected: ['A', 'B', 'C', 'D'],
        description: 'Simple graph from A',
      },
      {
        input: [{ 1: [2, 3], 2: [1], 3: [1, 4], 4: [3] }, 1],
        expected: [1, 2, 3, 4],
        description: 'Numeric node graph',
      },
    ],
    hints: [
      'Mark nodes as visited when enqueuing, not when dequeuing',
      'Use a Set for O(1) visited lookups',
      'Use (graph[node] || []) to handle nodes with no neighbors',
    ],
    concepts: ['BFS', 'graph traversal', 'adjacency list', 'visited set'],
  },
  {
    id: 'rb-level-order-traversal',
    title: 'Level Order Traversal (Grouped)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Return tree values grouped by level. Unlike flat BFS, this produces an array of arrays where each inner array contains values at that depth level.',
    explanation: `Level-order traversal grouped by level is a common interview question. The key is processing the queue in batches: at each level, record the current queue size, then dequeue exactly that many nodes. Their children form the next level.\n\nThis produces [[level0_values], [level1_values], ...]. Time complexity is O(n) and space is O(w) where w is the maximum width.\n\nThis pattern is used for zigzag level order, right-side view of a tree, and finding the maximum value at each level.`,
    instructions: [
      'Given a binary tree root, return values grouped by level',
      'Return an array of arrays, each containing values at that depth',
      'Use BFS with level-size tracking',
    ],
    starterCode: `def level_order(root)
  return [] if root.nil?

  result = []
  queue = [root]

  while !queue.empty?
    level_size = queue.length
    level_values = []
    # Process all nodes at current level
    # TODO: implement

    result << level_values
  end

  result
end`,
    solutionCode: `def level_order(root)
  return [] if root.nil?

  result = []
  queue = [root]

  while !queue.empty?
    level_size = queue.length
    level_values = []

    level_size.times do
      node = queue.shift
      level_values << node[:value]
      queue.push(node[:left]) if node[:left]
      queue.push(node[:right]) if node[:right]
    end

    result << level_values
  end

  result
end`,
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
        expected: [[3], [9, 20], [15, 7]],
        description: 'Three-level tree',
      },
      {
        input: { value: 1, left: null, right: null },
        expected: [[1]],
        description: 'Single node',
      },
    ],
    hints: [
      'Record queue.length at the start of each level',
      'Use times to process exactly that many nodes',
      'Each batch of children forms the next level',
    ],
    concepts: ['level-order traversal', 'BFS', 'grouped output', 'times'],
  },

  // ========== COMBINATORICS ==========
  {
    id: 'rb-generate-subsets',
    title: 'Generate All Subsets',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all subsets (power set) of an array. Understanding subset generation is fundamental to combinatorial search and many backtracking algorithms.',
    explanation: `The power set of an array with n elements has 2^n subsets. The iterative approach builds subsets by iterating through elements: for each existing subset, create a new subset that includes the current element.\n\nStart with [[]] (the empty set). For each element, duplicate all existing subsets and add the element to each copy. After processing all elements, you have all 2^n subsets.\n\nAlternatively, use backtracking: at each position, choose to include or exclude the element. Both approaches have O(n * 2^n) time complexity.`,
    instructions: [
      'Given an array, return all possible subsets (the power set)',
      'Include the empty set',
      'Use iterative subset building or backtracking',
    ],
    starterCode: `def subsets(arr)
  result = [[]]

  # For each element, add it to all existing subsets
  # TODO: implement

  result
end`,
    solutionCode: `def subsets(arr)
  result = [[]]

  arr.each do |elem|
    result += result.map { |subset| subset + [elem] }
  end

  result
end`,
    testCases: [
      {
        input: [1, 2, 3],
        expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        description: 'Three elements',
      },
      {
        input: [1, 2],
        expected: [[], [1], [2], [1, 2]],
        description: 'Two elements',
      },
      { input: [], expected: [[]], description: 'Empty array' },
    ],
    hints: [
      'Start with result = [[]] (empty subset)',
      'For each element, create new subsets by adding it to all existing subsets',
      'Use map to create new subsets and += to add them',
    ],
    concepts: ['power set', 'subsets', 'combinatorics', 'map'],
  },
  {
    id: 'rb-generate-combinations',
    title: 'Generate Combinations',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Generate all combinations of k elements from an array. Combinations are selections where order does not matter, unlike permutations.',
    explanation: `Generating C(n, k) combinations uses backtracking. At each step, choose the next element from the remaining candidates (starting after the last chosen element to avoid duplicates) and recurse with k-1.\n\nThe key difference from permutations: always start the next choice after the current element index, ensuring each combination is generated exactly once in sorted order.\n\nThere are C(n, k) = n! / (k! * (n-k)!) combinations. This pattern is used in feature selection, lottery calculations, and generating test cases.`,
    instructions: [
      'Given an array and k, return all combinations of k elements',
      'Order within a combination does not matter',
      'Use backtracking, starting from the index after the last chosen element',
    ],
    starterCode: `def combinations(arr, k)
  result = []

  def backtrack(arr, k, start, current, result)
    # Base case: combination is complete
    # TODO: implement

    # Try each remaining element
    # TODO: implement
  end

  backtrack(arr, k, 0, [], result)
  result
end`,
    solutionCode: `def combinations(arr, k)
  result = []

  def backtrack(arr, k, start, current, result)
    if current.length == k
      result << current.dup
      return
    end

    (start...arr.length).each do |i|
      current << arr[i]
      backtrack(arr, k, i + 1, current, result)
      current.pop
    end
  end

  backtrack(arr, k, 0, [], result)
  result
end`,
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
      {
        input: [[1, 2, 3], 1],
        expected: [[1], [2], [3]],
        description: 'Choose 1',
      },
    ],
    hints: [
      'Start each recursive call from index i + 1 (not 0) to avoid duplicates',
      'Base case: current.length == k means combination is complete',
      'Remember to dup the current array before adding to result',
    ],
    concepts: ['combinations', 'backtracking', 'C(n,k)', 'dup'],
  },
  {
    id: 'rb-cartesian-product',
    title: 'Cartesian Product',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Compute the Cartesian product of two arrays. The Cartesian product is the set of all ordered pairs where the first element comes from the first array and the second from the second array.',
    explanation: `The Cartesian product of arrays A and B is all pairs [a, b] where a is in A and b is in B. This is computed with nested iteration: for each element in A, pair it with every element in B.\n\nThe result has |A| * |B| pairs. Time and space complexity are both O(|A| * |B|).\n\nRuby provides Array#product as a built-in, but implementing it manually shows the nested iteration pattern. Cartesian products are used in database joins, generating test inputs, and combinatorial enumeration.`,
    instructions: [
      'Given two arrays, return their Cartesian product as an array of pairs',
      'Each pair is [element_from_first, element_from_second]',
      'Use nested iteration',
    ],
    starterCode: `def cartesian_product(arr1, arr2)
  result = []
  # Nested iteration: for each element in arr1, pair with each in arr2
  # TODO: implement

  result
end`,
    solutionCode: `def cartesian_product(arr1, arr2)
  result = []
  arr1.each do |a|
    arr2.each do |b|
      result << [a, b]
    end
  end
  result
end`,
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
        description: 'Numbers x strings',
      },
      {
        input: [[1], [3, 4]],
        expected: [
          [1, 3],
          [1, 4],
        ],
        description: 'Single element x two',
      },
      { input: [[], [1, 2]], expected: [], description: 'Empty first array' },
    ],
    hints: [
      'Use nested each blocks: outer iterates arr1, inner iterates arr2',
      'Create a pair [a, b] for each combination',
      'Alternative: arr1.product(arr2) is the built-in Ruby method',
    ],
    concepts: ['Cartesian product', 'nested iteration', 'product'],
  },

  // ========== MEMOIZATION ==========
  {
    id: 'rb-memoize-fibonacci',
    title: 'Memoized Fibonacci',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Optimize the recursive Fibonacci function using a hash for memoization. This transforms the O(2^n) naive recursion into O(n) by caching previously computed values.',
    explanation: `The naive recursive Fibonacci has O(2^n) time because it recalculates the same values many times. By storing computed results in a hash, each Fibonacci number is calculated only once.\n\nThe memoization pattern: before computing, check if the result is already in the cache. If so, return it. If not, compute it, store it in the cache, and return it.\n\nWith memoization, time complexity drops to O(n) and space is O(n) for the cache. This is a top-down dynamic programming approach, equivalent in result to the bottom-up iterative approach.`,
    instructions: [
      'Implement Fibonacci with memoization using a hash',
      'Check the memo hash before computing',
      'Store computed values in the hash for future lookups',
    ],
    starterCode: `def fib_memo(n, memo = {})
  # Check memo first
  # TODO: implement

  # Base cases
  # TODO: implement

  # Compute, store in memo, and return
  # TODO: implement
end`,
    solutionCode: `def fib_memo(n, memo = {})
  return memo[n] if memo.key?(n)
  return 0 if n <= 0
  return 1 if n == 1

  memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
  memo[n]
end`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 10, expected: 55, description: 'fib(10)' },
      { input: 30, expected: 832040, description: 'fib(30) - fast with memoization' },
      { input: 40, expected: 102334155, description: 'fib(40) - infeasible without memoization' },
    ],
    hints: [
      'Check memo.key?(n) before computing',
      'Store the result: memo[n] = computed_value',
      'Pass the memo hash through recursive calls',
    ],
    concepts: ['memoization', 'hash cache', 'top-down DP', 'key?'],
  },
  {
    id: 'rb-climbing-stairs',
    title: 'Climbing Stairs (DP)',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Count the number of distinct ways to climb n stairs, taking either 1 or 2 steps at a time. This classic dynamic programming problem has the same recurrence as Fibonacci.',
    explanation: `To reach step n, you either came from step n-1 (took 1 step) or step n-2 (took 2 steps). So ways(n) = ways(n-1) + ways(n-2), with base cases ways(1) = 1 and ways(2) = 2.\n\nThis is exactly the Fibonacci recurrence shifted by one. You can solve it with memoization (top-down DP) or iteration (bottom-up DP).\n\nThe bottom-up approach uses O(1) space by only keeping the last two values. This problem teaches recognizing Fibonacci-like patterns in seemingly different problems.`,
    instructions: [
      'Return the number of distinct ways to climb n stairs',
      'You can take 1 or 2 steps at a time',
      'Use dynamic programming (memoization or iteration)',
    ],
    starterCode: `def climb_stairs(n)
  return n if n <= 2

  # Use bottom-up DP or memoization
  # TODO: implement
end`,
    solutionCode: `def climb_stairs(n)
  return n if n <= 2

  prev2 = 1
  prev1 = 2

  (3..n).each do
    current = prev1 + prev2
    prev2 = prev1
    prev1 = current
  end

  prev1
end`,
    testCases: [
      { input: 1, expected: 1, description: '1 stair' },
      { input: 2, expected: 2, description: '2 stairs' },
      { input: 3, expected: 3, description: '3 stairs' },
      { input: 5, expected: 8, description: '5 stairs' },
      { input: 10, expected: 89, description: '10 stairs' },
    ],
    hints: [
      'ways(n) = ways(n-1) + ways(n-2)',
      'Base cases: ways(1) = 1, ways(2) = 2',
      'You only need the last two values, so O(1) space is possible',
    ],
    concepts: ['dynamic programming', 'Fibonacci pattern', 'bottom-up DP', 'O(1) space'],
  },
  {
    id: 'rb-coin-change-min',
    title: 'Coin Change (Minimum Coins)',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Find the minimum number of coins needed to make a given amount. This is a classic dynamic programming problem that demonstrates optimal substructure.',
    explanation: `For each amount from 1 to the target, the minimum coins needed is 1 + the minimum of dp[amount - coin] for each valid coin. Build the dp array bottom-up.\n\nInitialize dp[0] = 0 (zero coins for zero amount) and all other entries to infinity (or amount + 1 as a safe upper bound). For each amount, try every coin denomination.\n\nTime complexity is O(amount * coins.length) and space is O(amount). This problem demonstrates the DP pattern of building solutions to larger problems from solutions to smaller subproblems.`,
    instructions: [
      'Given coin denominations and a target amount, return the minimum number of coins needed',
      'Return -1 if the amount cannot be made with the given coins',
      'Use bottom-up dynamic programming',
    ],
    starterCode: `def coin_change(coins, amount)
  return 0 if amount == 0

  # Initialize DP array
  dp = Array.new(amount + 1, amount + 1)
  dp[0] = 0

  # Fill DP table
  # TODO: implement

  dp[amount] > amount ? -1 : dp[amount]
end`,
    solutionCode: `def coin_change(coins, amount)
  return 0 if amount == 0

  dp = Array.new(amount + 1, amount + 1)
  dp[0] = 0

  (1..amount).each do |i|
    coins.each do |coin|
      if coin <= i
        dp[i] = [dp[i], dp[i - coin] + 1].min
      end
    end
  end

  dp[amount] > amount ? -1 : dp[amount]
end`,
    testCases: [
      { input: [[1, 5, 10, 25], 30], expected: 2, description: '30 cents (25 + 5)' },
      { input: [[1, 5, 10, 25], 11], expected: 2, description: '11 cents (10 + 1)' },
      { input: [[2], 3], expected: -1, description: 'Impossible amount' },
      { input: [[1], 0], expected: 0, description: 'Zero amount' },
      { input: [[1, 2, 5], 11], expected: 3, description: '11 (5 + 5 + 1)' },
    ],
    hints: [
      'Initialize dp with amount + 1 as a safe "infinity" value',
      'For each amount i, try each coin: dp[i] = min(dp[i], dp[i - coin] + 1)',
      'If dp[amount] > amount after filling, return -1',
    ],
    concepts: ['dynamic programming', 'coin change', 'optimal substructure', 'bottom-up DP'],
  },

  // ========== UTILITIES ==========
  {
    id: 'rb-array-chunking',
    title: 'Array Chunking with each_slice',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      "Split an array into chunks of a given size using Ruby's each_slice method. This is a common utility for pagination, batch processing, and display formatting.",
    explanation: `Ruby's Enumerable#each_slice divides a collection into consecutive slices of a given size. The last slice may be shorter if the array length is not evenly divisible.\n\nCalling arr.each_slice(n).to_a produces an array of arrays, each containing up to n elements. This is a single method call in Ruby, showcasing the language's rich Enumerable module.\n\nManually implementing chunking teaches the underlying logic: iterate with a step, slice from the current position, and collect the slices.`,
    instructions: [
      'Given an array and chunk size, split the array into chunks',
      'The last chunk may be smaller than the chunk size',
      'Implement manually without using each_slice',
    ],
    starterCode: `def chunk_array(arr, size)
  result = []
  # Split arr into chunks of the given size
  # TODO: implement

  result
end`,
    solutionCode: `def chunk_array(arr, size)
  result = []
  (0...arr.length).step(size) do |i|
    result << arr[i, size]
  end
  result
end`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], 2],
        expected: [[1, 2], [3, 4], [5]],
        description: 'Uneven chunks',
      },
      {
        input: [[1, 2, 3, 4, 5, 6], 3],
        expected: [
          [1, 2, 3],
          [4, 5, 6],
        ],
        description: 'Even chunks',
      },
      {
        input: [[1, 2, 3], 5],
        expected: [[1, 2, 3]],
        description: 'Chunk larger than array',
      },
      { input: [[], 2], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Use (0...arr.length).step(size) to get start indices',
      'arr[i, size] extracts up to size elements starting at index i',
      'Alternative: arr.each_slice(size).to_a does this in one call',
    ],
    concepts: ['each_slice', 'step', 'array slicing', 'chunking'],
  },
  {
    id: 'rb-merge-sorted',
    title: 'Merge Sorted Arrays',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Merge two sorted arrays into a single sorted array in O(n + m) time. This is a fundamental subroutine used in merge sort and external sorting.',
    explanation: `The merge algorithm uses two pointers, one for each array. Compare the elements at both pointers; append the smaller one to the result and advance that pointer. When one array is exhausted, append all remaining elements from the other.\n\nThis runs in O(n + m) time and O(n + m) space where n and m are the array lengths. It is the merge step of merge sort and is also used for merging sorted files, combining sorted database results, and k-way merging.\n\nThe key insight is that because both arrays are sorted, you always know which element comes next by comparing just the current elements.`,
    instructions: [
      'Given two sorted arrays, merge them into a single sorted array',
      'Use the two-pointer merge technique for O(n + m) time',
      'Do not use sort; maintain the sorted order through comparison',
    ],
    starterCode: `def merge_sorted(arr1, arr2)
  result = []
  i = 0
  j = 0

  # Merge using two pointers
  # TODO: implement

  result
end`,
    solutionCode: `def merge_sorted(arr1, arr2)
  result = []
  i = 0
  j = 0

  while i < arr1.length && j < arr2.length
    if arr1[i] <= arr2[j]
      result << arr1[i]
      i += 1
    else
      result << arr2[j]
      j += 1
    end
  end

  result.concat(arr1[i..]) if i < arr1.length
  result.concat(arr2[j..]) if j < arr2.length

  result
end`,
    testCases: [
      {
        input: [
          [1, 3, 5],
          [2, 4, 6],
        ],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Interleaved merge',
      },
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
        ],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Non-overlapping',
      },
      { input: [[], [1, 2, 3]], expected: [1, 2, 3], description: 'One empty' },
      { input: [[], []], expected: [], description: 'Both empty' },
    ],
    hints: [
      'Compare arr1[i] and arr2[j]; append the smaller one',
      'Advance the pointer of the array from which you took the element',
      'After the loop, append remaining elements with concat',
    ],
    concepts: ['merge', 'two pointers', 'sorted arrays', 'concat'],
  },
  {
    id: 'rb-group-by-key',
    title: 'Group By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      "Group an array of hashes by a specified key using Ruby's group_by method. This is a common operation for categorizing data, building indexes, and creating lookup tables.",
    explanation: `Ruby's Enumerable#group_by takes a block and returns a hash where keys are the block's return values and values are arrays of elements that produced that key.\n\nFor example, people.group_by { |p| p[:city] } groups people by their city. The result is a hash mapping each city to an array of people in that city.\n\nImplementing group_by manually teaches the reduce/inject pattern: iterate through elements, building a hash where each key maps to an accumulating array. Use Hash.new { |h, k| h[k] = [] } for auto-initializing array values.`,
    instructions: [
      'Given an array of hashes and a key, group the hashes by that key',
      'Return a hash mapping each unique value to an array of matching hashes',
      'Implement manually without using the built-in group_by',
    ],
    starterCode: `def group_by_key(arr, key)
  groups = Hash.new { |h, k| h[k] = [] }
  # Group elements by the specified key
  # TODO: implement

  groups
end`,
    solutionCode: `def group_by_key(arr, key)
  groups = Hash.new { |h, k| h[k] = [] }
  arr.each do |item|
    groups[item[key]] << item
  end
  groups
end`,
    testCases: [
      {
        input: [
          [
            { name: 'Alice', city: 'NYC' },
            { name: 'Bob', city: 'LA' },
            { name: 'Carol', city: 'NYC' },
          ],
          'city',
        ],
        expected: {
          NYC: [
            { name: 'Alice', city: 'NYC' },
            { name: 'Carol', city: 'NYC' },
          ],
          LA: [{ name: 'Bob', city: 'LA' }],
        },
        description: 'Group by city',
      },
      {
        input: [
          [
            { type: 'fruit', name: 'apple' },
            { type: 'veggie', name: 'carrot' },
            { type: 'fruit', name: 'banana' },
          ],
          'type',
        ],
        expected: {
          fruit: [
            { type: 'fruit', name: 'apple' },
            { type: 'fruit', name: 'banana' },
          ],
          veggie: [{ type: 'veggie', name: 'carrot' }],
        },
        description: 'Group by type',
      },
    ],
    hints: [
      'Hash.new { |h, k| h[k] = [] } auto-creates empty arrays for new keys',
      'Access the grouping value with item[key]',
      'Alternative: arr.group_by { |item| item[key] } is the built-in way',
    ],
    concepts: ['group_by', 'Hash.new with block', 'categorization', 'inject'],
  },
];

export default rubyExercises;
