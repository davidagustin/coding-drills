import type { Exercise } from './types';

export const cppExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'cpp-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through a vector while skipping every other element using index stepping. This foundational loop pattern is used in pair processing, interleaving, and downsampling algorithms.',
    explanation: `Skipping every other element teaches you to control loop increments beyond the default step of 1. By using i += 2 instead of i++, you visit only even-indexed positions (0, 2, 4, ...). This runs in O(n/2) time, which simplifies to O(n).\n\nIn C++, you access vector elements with operator[] or .at(), and build the result with push_back(). This pattern appears in pair processing, downsampling data, building interleaved sequences, and any algorithm that processes every nth element.`,
    instructions: [
      'Given a vector of integers, return a new vector containing only elements at even indices (0, 2, 4, ...)',
      'Use a for loop with a step of 2',
      'Use std::vector<int> for both input and output',
    ],
    starterCode: `#include <vector>

std::vector<int> skipEveryOther(const std::vector<int>& numbers) {
    std::vector<int> result;
    // Use a for loop with step of 2
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>

std::vector<int> skipEveryOther(const std::vector<int>& numbers) {
    std::vector<int> result;
    for (size_t i = 0; i < numbers.size(); i += 2) {
        result.push_back(numbers[i]);
    }
    return result;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [1, 3, 5], description: 'Basic even-length vector' },
      { input: [10, 20, 30, 40, 50], expected: [10, 30, 50], description: 'Odd-length vector' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty vector' },
    ],
    hints: [
      'Use size_t for the loop variable since vector::size() returns size_t',
      'Increment by 2: i += 2',
      'Use push_back() to append to the result vector',
    ],
    concepts: ['for loop', 'index stepping', 'std::vector', 'size_t'],
  },
  {
    id: 'cpp-reverse-iteration',
    title: 'Reverse Iteration with Iterators',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through a vector in reverse order using reverse iterators. Reverse iteration is used in stack unwinding, palindrome checking, and LIFO processing.',
    explanation: `C++ provides reverse iterators via rbegin() and rend() that traverse a container from the last element to the first. This is the idiomatic way to reverse-iterate in C++.\n\nAlternatively, you can use a decrementing index loop starting from size()-1 down to 0. Be careful with unsigned types: using size_t and decrementing past 0 causes wraparound. The reverse iterator approach avoids this pitfall entirely.`,
    instructions: [
      'Given a vector, return a new vector with elements in reverse order',
      'Use reverse iterators (rbegin/rend) or a decrementing index loop',
      'Do not use std::reverse()',
    ],
    starterCode: `#include <vector>

std::vector<int> reverseIterate(const std::vector<int>& items) {
    std::vector<int> result;
    // Iterate from the end to the beginning
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>

std::vector<int> reverseIterate(const std::vector<int>& items) {
    std::vector<int> result;
    for (auto it = items.rbegin(); it != items.rend(); ++it) {
        result.push_back(*it);
    }
    return result;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Basic reverse' },
      { input: [10, 20, 30], expected: [30, 20, 10], description: 'Three elements' },
      { input: [42], expected: [42], description: 'Single element' },
      { input: [], expected: [], description: 'Empty vector' },
    ],
    hints: [
      'rbegin() points to the last element, rend() points before the first',
      'Dereference the iterator with *it to get the value',
      'Use ++it to advance a reverse iterator (moves backward through the container)',
    ],
    concepts: ['reverse iterators', 'rbegin()', 'rend()', 'std::vector'],
  },
  {
    id: 'cpp-step-iteration',
    title: 'Range-Based For with Step',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through a vector with a configurable step size. Custom-step iteration is used in downsampling, strided access, and processing every nth element.',
    explanation: `C++ does not have a built-in range with step like Python, so you use a traditional for loop with i += step. This lets you visit indices 0, step, 2*step, etc.\n\nThe time complexity is O(n/step) since you skip elements between visits. This pattern is useful for downsampling signals, building sparse views over data, and implementing algorithms that sample every kth element.`,
    instructions: [
      'Given a vector and a step size, return elements at indices that are multiples of the step',
      'For step=3: return elements at indices 0, 3, 6, 9...',
      'Handle edge cases: empty vector, step larger than vector size',
    ],
    starterCode: `#include <vector>

std::vector<int> stepIterate(const std::vector<int>& items, int step) {
    std::vector<int> result;
    // Iterate with custom step size
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>

std::vector<int> stepIterate(const std::vector<int>& items, int step) {
    std::vector<int> result;
    for (size_t i = 0; i < items.size(); i += step) {
        result.push_back(items[i]);
    }
    return result;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 3],
        expected: [1, 4, 7],
        description: 'Step of 3',
      },
      { input: [[10, 20, 30, 40, 50], 2], expected: [10, 30, 50], description: 'Step of 2' },
      { input: [[1, 2, 3], 5], expected: [1], description: 'Step larger than vector' },
      { input: [[], 2], expected: [], description: 'Empty vector' },
    ],
    hints: [
      'Use i += step instead of i++',
      'The first element (index 0) is always included if the vector is non-empty',
      'Cast step to size_t if needed to avoid signed/unsigned comparison warnings',
    ],
    concepts: ['variable step', 'for loop', 'std::vector'],
  },
  {
    id: 'cpp-nested-loop-matrix',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a 2D vector (matrix) row by row using nested loops. Nested iteration is the basis for image processing, grid-based algorithms, and dynamic programming on grids.',
    explanation: `Matrix traversal with nested loops visits every cell in a 2D grid systematically. The outer loop iterates over rows, the inner loop over columns within each row. This row-major traversal visits all elements in O(rows * cols) time.\n\nIn C++, a 2D vector is typically std::vector<std::vector<int>>. Access elements with matrix[row][col]. This pattern is a prerequisite for dynamic programming on grids, pathfinding, and image processing.`,
    instructions: [
      'Given a 2D vector (matrix), return a flat vector of all elements',
      'Traverse row by row, from left to right',
      'Use nested for loops',
    ],
    starterCode: `#include <vector>

std::vector<int> flattenMatrix(const std::vector<std::vector<int>>& matrix) {
    std::vector<int> result;
    // Use nested loops to traverse the matrix
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>

std::vector<int> flattenMatrix(const std::vector<std::vector<int>>& matrix) {
    std::vector<int> result;
    for (size_t row = 0; row < matrix.size(); ++row) {
        for (size_t col = 0; col < matrix[row].size(); ++col) {
            result.push_back(matrix[row][col]);
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
      'Outer loop: for (size_t row = 0; row < matrix.size(); ++row)',
      'Inner loop: for (size_t col = 0; col < matrix[row].size(); ++col)',
      'Access element: matrix[row][col]',
    ],
    concepts: ['nested loops', '2D vectors', 'matrix traversal', 'row-major order'],
  },
  {
    id: 'cpp-sliding-window-max-sum',
    title: 'Sliding Window Maximum Sum',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the maximum sum of any contiguous subarray of size k using the sliding window technique. This is a classic interview pattern that avoids recomputing sums from scratch.',
    explanation: `The sliding window technique maintains a running sum of k consecutive elements. Instead of recalculating the entire sum for each window position, you subtract the element leaving the window and add the element entering it.\n\nThis reduces the brute-force O(n*k) approach to O(n) time. The window "slides" one position at a time from left to right. First compute the sum of the initial window (indices 0..k-1), then for each subsequent position, update the sum incrementally.\n\nSliding window is one of the most common interview patterns, appearing in problems like minimum subarray sum, longest substring without repeating characters, and maximum of all subarrays of size k.`,
    instructions: [
      'Given a vector of integers and a window size k, find the maximum sum of any contiguous subarray of size k',
      'First compute the sum of the first k elements',
      'Then slide the window: subtract the leftmost, add the next element',
      'Return the maximum sum seen',
    ],
    starterCode: `#include <vector>
#include <algorithm>

int slidingWindowMaxSum(const std::vector<int>& nums, int k) {
    if (nums.empty() || k <= 0 || k > static_cast<int>(nums.size())) {
        return 0;
    }
    // Compute initial window sum, then slide
    // TODO: implement

    return 0;
}`,
    solutionCode: `#include <vector>
#include <algorithm>

int slidingWindowMaxSum(const std::vector<int>& nums, int k) {
    if (nums.empty() || k <= 0 || k > static_cast<int>(nums.size())) {
        return 0;
    }

    int windowSum = 0;
    for (int i = 0; i < k; ++i) {
        windowSum += nums[i];
    }

    int maxSum = windowSum;
    for (int i = k; i < static_cast<int>(nums.size()); ++i) {
        windowSum += nums[i] - nums[i - k];
        maxSum = std::max(maxSum, windowSum);
    }

    return maxSum;
}`,
    testCases: [
      { input: [[2, 1, 5, 1, 3, 2], 3], expected: 9, description: 'Window sum [5,1,3]' },
      { input: [[2, 3, 4, 1, 5], 2], expected: 7, description: 'Window sum [3,4]' },
      { input: [[1, 1, 1, 1, 1], 3], expected: 3, description: 'All same values' },
      { input: [[5], 1], expected: 5, description: 'Single element window' },
    ],
    hints: [
      'Compute the initial window sum with a loop from 0 to k-1',
      'Slide: windowSum += nums[i] - nums[i - k]',
      'Track the maximum with std::max()',
    ],
    concepts: ['sliding window', 'running sum', 'std::max', 'O(n) optimization'],
  },
  {
    id: 'cpp-two-pointer-palindrome',
    title: 'Two Pointer Palindrome Check',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Use the two-pointer technique to check if a string is a palindrome. Two pointers converging from both ends is a fundamental pattern for many array and string problems.',
    explanation: `The two-pointer technique uses one pointer at the start and one at the end of a string. Both pointers move inward, comparing characters at each step. If all pairs match, the string is a palindrome.\n\nThis approach runs in O(n/2) time, which is O(n), and uses O(1) extra space since we only need two index variables. In C++, use std::string with operator[] for character access.\n\nTwo pointers is one of the most versatile interview patterns, used for palindromes, removing duplicates, container with most water, and three-sum problems.`,
    instructions: [
      'Given a string, return true if it is a palindrome (reads the same forwards and backwards)',
      'Use two pointers: one starting at the beginning, one at the end',
      'Move them toward each other, comparing characters',
      'Consider only the exact characters (case-sensitive)',
    ],
    starterCode: `#include <string>

bool isPalindrome(const std::string& s) {
    // Use two pointers from both ends
    // TODO: implement

    return true;
}`,
    solutionCode: `#include <string>

bool isPalindrome(const std::string& s) {
    int left = 0;
    int right = static_cast<int>(s.size()) - 1;

    while (left < right) {
        if (s[left] != s[right]) {
            return false;
        }
        ++left;
        --right;
    }

    return true;
}`,
    testCases: [
      { input: 'racecar', expected: true, description: 'Odd-length palindrome' },
      { input: 'abba', expected: true, description: 'Even-length palindrome' },
      { input: 'hello', expected: false, description: 'Not a palindrome' },
      { input: 'a', expected: true, description: 'Single character' },
      { input: '', expected: true, description: 'Empty string' },
    ],
    hints: [
      'Initialize left = 0, right = s.size() - 1',
      'Loop while left < right',
      'If s[left] != s[right], return false immediately',
    ],
    concepts: ['two pointers', 'palindrome', 'std::string', 'O(n) time'],
  },

  // ========== RECURSION ==========
  {
    id: 'cpp-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate the nth Fibonacci number using recursion. This classic problem teaches base cases and recursive decomposition.',
    explanation: `The Fibonacci sequence is defined as fib(0) = 0, fib(1) = 1, and fib(n) = fib(n-1) + fib(n-2) for n >= 2. The recursive implementation directly mirrors this mathematical definition.\n\nThe naive recursive approach has O(2^n) time complexity due to redundant calculations. Each call spawns two more calls, creating an exponential call tree. This makes it impractical for large n, but it is an excellent exercise for understanding recursion and base cases.\n\nLater, you will learn memoization and dynamic programming to optimize this to O(n).`,
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1',
      'Use recursion: fib(n) = fib(n-1) + fib(n-2)',
    ],
    starterCode: `int fibonacciRecursive(int n) {
    // Base cases
    // TODO: implement

    // Recursive case
    // TODO: implement

    return 0;
}`,
    solutionCode: `int fibonacciRecursive(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 5, expected: 5, description: 'fib(5)' },
      { input: 10, expected: 55, description: 'fib(10)' },
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n == 1 returns 1',
      'Recursive case: return fib(n-1) + fib(n-2)',
      'This naive approach has O(2^n) time complexity',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci', 'exponential complexity'],
  },
  {
    id: 'cpp-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate factorial using recursion. Factorial is the simplest recursive pattern and teaches the concept of reducing a problem to a smaller subproblem.',
    explanation: `Factorial is defined as n! = n * (n-1) * ... * 1, with 0! = 1! = 1. The recursive formulation is: factorial(n) = n * factorial(n-1), with base case factorial(0) = 1.\n\nEach recursive call reduces n by 1, so the recursion depth is O(n). The function makes exactly n recursive calls before hitting the base case. This is a linear recursion pattern, unlike the branching recursion of Fibonacci.\n\nIn C++, be aware that factorial grows extremely fast. Even with long long, overflow occurs at n=21. For this exercise, we work with small values of n.`,
    instructions: [
      'Return n! (n factorial)',
      'factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: factorial(0) = factorial(1) = 1',
    ],
    starterCode: `long long factorial(int n) {
    // Base case
    // TODO: implement

    // Recursive case
    // TODO: implement

    return 0;
}`,
    solutionCode: `long long factorial(int n) {
    if (n <= 1) return 1;
    return static_cast<long long>(n) * factorial(n - 1);
}`,
    testCases: [
      { input: 0, expected: 1, description: '0!' },
      { input: 1, expected: 1, description: '1!' },
      { input: 5, expected: 120, description: '5!' },
      { input: 10, expected: 3628800, description: '10!' },
    ],
    hints: [
      'Base case: if n <= 1, return 1',
      'Recursive case: n * factorial(n - 1)',
      'Use long long to handle large results',
    ],
    concepts: ['recursion', 'factorial', 'base case', 'long long'],
  },
  {
    id: 'cpp-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Solve the Tower of Hanoi puzzle using recursion. This classic problem demonstrates how recursion can elegantly solve problems that seem complex iteratively.',
    explanation: `The Tower of Hanoi has three pegs and n disks of decreasing size. The goal is to move all disks from the source peg to the target peg, moving one disk at a time, never placing a larger disk on a smaller one.\n\nThe recursive insight: to move n disks from source to target, first move n-1 disks from source to auxiliary, then move the largest disk from source to target, then move n-1 disks from auxiliary to target.\n\nThis generates 2^n - 1 moves, which is provably optimal. The recursion depth is O(n).`,
    instructions: [
      'Return a vector of moves to solve Tower of Hanoi with n disks',
      'Each move is a string like "A->C" meaning move top disk from peg A to peg C',
      'Pegs are labeled "A" (source), "B" (auxiliary), "C" (target)',
      'Move all disks from peg A to peg C',
    ],
    starterCode: `#include <vector>
#include <string>

void solve(int n, const std::string& from, const std::string& to,
           const std::string& aux, std::vector<std::string>& moves) {
    // TODO: implement recursive solution
}

std::vector<std::string> towerOfHanoi(int n) {
    std::vector<std::string> moves;
    solve(n, "A", "C", "B", moves);
    return moves;
}`,
    solutionCode: `#include <vector>
#include <string>

void solve(int n, const std::string& from, const std::string& to,
           const std::string& aux, std::vector<std::string>& moves) {
    if (n == 0) return;
    solve(n - 1, from, aux, to, moves);
    moves.push_back(from + "->" + to);
    solve(n - 1, aux, to, from, moves);
}

std::vector<std::string> towerOfHanoi(int n) {
    std::vector<std::string> moves;
    solve(n, "A", "C", "B", moves);
    return moves;
}`,
    testCases: [
      { input: 1, expected: ['A->C'], description: '1 disk' },
      {
        input: 2,
        expected: ['A->B', 'A->C', 'B->C'],
        description: '2 disks',
      },
      {
        input: 3,
        expected: ['A->C', 'A->B', 'C->B', 'A->C', 'B->A', 'B->C', 'A->C'],
        description: '3 disks (7 moves)',
      },
    ],
    hints: [
      'Base case: n == 0, do nothing',
      'Move n-1 disks from source to auxiliary',
      'Move largest disk from source to target',
      'Move n-1 disks from auxiliary to target',
    ],
    concepts: ['recursion', 'Tower of Hanoi', 'divide and conquer', 'exponential complexity'],
  },
  {
    id: 'cpp-generate-permutations',
    title: 'Generate Permutations',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Generate all permutations of a vector using recursive backtracking. Permutation generation is a core backtracking pattern used in scheduling, optimization, and constraint satisfaction problems.',
    explanation: `To generate all permutations, use backtracking: at each position, try placing each unused element, recurse for the remaining positions, then undo the choice (backtrack).\n\nA common approach is to swap elements in place. Fix the element at the current index by swapping it with each subsequent element, recurse on the next index, then swap back. When the current index equals the vector size, you have a complete permutation.\n\nFor n elements, there are n! permutations. The time complexity is O(n * n!) since generating each permutation takes O(n) work.`,
    instructions: [
      'Given a vector of distinct integers, return all possible permutations',
      'Use recursive backtracking with swapping',
      'The order of permutations does not matter',
    ],
    starterCode: `#include <vector>

void backtrack(std::vector<int>& nums, int start,
               std::vector<std::vector<int>>& result) {
    // TODO: implement recursive backtracking
}

std::vector<std::vector<int>> generatePermutations(std::vector<int> nums) {
    std::vector<std::vector<int>> result;
    backtrack(nums, 0, result);
    return result;
}`,
    solutionCode: `#include <vector>
#include <algorithm>

void backtrack(std::vector<int>& nums, int start,
               std::vector<std::vector<int>>& result) {
    if (start == static_cast<int>(nums.size())) {
        result.push_back(nums);
        return;
    }
    for (int i = start; i < static_cast<int>(nums.size()); ++i) {
        std::swap(nums[start], nums[i]);
        backtrack(nums, start + 1, result);
        std::swap(nums[start], nums[i]);
    }
}

std::vector<std::vector<int>> generatePermutations(std::vector<int> nums) {
    std::vector<std::vector<int>> result;
    backtrack(nums, 0, result);
    return result;
}`,
    testCases: [
      {
        input: [1, 2, 3],
        expected: [
          [1, 2, 3],
          [1, 3, 2],
          [2, 1, 3],
          [2, 3, 1],
          [3, 2, 1],
          [3, 1, 2],
        ],
        description: 'Three elements: 6 permutations',
      },
      {
        input: [1, 2],
        expected: [
          [1, 2],
          [2, 1],
        ],
        description: 'Two elements: 2 permutations',
      },
      { input: [1], expected: [[1]], description: 'Single element' },
    ],
    hints: [
      'Base case: when start equals nums.size(), add current arrangement to result',
      'Try swapping nums[start] with each nums[i] where i >= start',
      'After recursing, swap back to restore original order (backtrack)',
    ],
    concepts: ['backtracking', 'permutations', 'std::swap', 'recursion'],
  },
  {
    id: 'cpp-flatten-nested',
    title: 'Flatten Nested Vector',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Flatten a nested structure into a single vector using recursion. This pattern teaches recursive decomposition of nested data.',
    explanation: `Flattening nested vectors requires recursion because the nesting depth is unknown at compile time. For each element, if it is a vector, recurse into it; if it is a value, add it to the result.\n\nIn C++, we can represent a nested structure using std::variant. A NestedInt is either an int or a vector of NestedInt. Use std::holds_alternative and std::get to inspect and extract values from the variant.\n\nThis pattern appears in JSON processing, file system traversal, and any problem involving tree-like nested data.`,
    instructions: [
      'Given a nested structure (vector of vectors or ints), return a flat vector of all integers',
      'A nested element is represented as a vector<variant<int, vector<...>>>',
      'For simplicity, implement flattening a vector<vector<int>> (one level of nesting)',
      'Recurse or iterate through each inner vector',
    ],
    starterCode: `#include <vector>

std::vector<int> flattenNested(const std::vector<std::vector<int>>& nested) {
    std::vector<int> result;
    // Iterate through each inner vector and collect all elements
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>

std::vector<int> flattenNested(const std::vector<std::vector<int>>& nested) {
    std::vector<int> result;
    for (const auto& inner : nested) {
        for (int val : inner) {
            result.push_back(val);
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
        description: 'Three inner vectors',
      },
      { input: [[[1], [2], [3]]], expected: [1, 2, 3], description: 'Single-element inner vectors' },
      { input: [[[], [1, 2], []]], expected: [1, 2], description: 'Empty inner vectors' },
      { input: [[]], expected: [], description: 'Empty outer vector' },
    ],
    hints: [
      'Use range-based for to iterate: for (const auto& inner : nested)',
      'Nested range-based for to iterate inner elements',
      'Use push_back() to add each element to the result',
    ],
    concepts: ['nested iteration', 'flattening', 'range-based for', 'const reference'],
  },

  // ========== SEARCHING ==========
  {
    id: 'cpp-binary-search',
    title: 'Binary Search (Recursive)',
    category: 'searching',
    difficulty: 'beginner',
    description:
      'Implement binary search recursively to find an element in a sorted vector. Binary search is the most fundamental divide-and-conquer algorithm with O(log n) time complexity.',
    explanation: `Binary search repeatedly divides the search space in half. Compare the target with the middle element: if equal, found it; if less, search the left half; if greater, search the right half.\n\nThe recursive version passes narrowing bounds (left, right) through function parameters. Base case: left > right means the element is not present. The time complexity is O(log n) since each comparison eliminates half the remaining elements.\n\nBinary search requires the input to be sorted. It is the basis for many interview problems including search in rotated array, finding boundaries, and optimization problems.`,
    instructions: [
      'Given a sorted vector and a target, return the index of the target or -1 if not found',
      'Implement using recursive binary search',
      'Divide the search range in half each recursive call',
    ],
    starterCode: `#include <vector>

int binarySearchHelper(const std::vector<int>& arr, int target, int left, int right) {
    // Base case and recursive case
    // TODO: implement

    return -1;
}

int binarySearch(const std::vector<int>& arr, int target) {
    return binarySearchHelper(arr, target, 0, static_cast<int>(arr.size()) - 1);
}`,
    solutionCode: `#include <vector>

int binarySearchHelper(const std::vector<int>& arr, int target, int left, int right) {
    if (left > right) return -1;

    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearchHelper(arr, target, mid + 1, right);
    return binarySearchHelper(arr, target, left, mid - 1);
}

int binarySearch(const std::vector<int>& arr, int target) {
    return binarySearchHelper(arr, target, 0, static_cast<int>(arr.size()) - 1);
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9, 11], 7], expected: 3, description: 'Find 7' },
      { input: [[1, 3, 5, 7, 9, 11], 1], expected: 0, description: 'Find first element' },
      { input: [[1, 3, 5, 7, 9, 11], 11], expected: 5, description: 'Find last element' },
      { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: 'Element not found' },
    ],
    hints: [
      'Use mid = left + (right - left) / 2 to avoid overflow',
      'Base case: left > right means not found',
      'Recurse on [left, mid-1] or [mid+1, right] based on comparison',
    ],
    concepts: ['binary search', 'recursion', 'divide and conquer', 'O(log n)'],
  },
  {
    id: 'cpp-binary-search-iterative',
    title: 'Binary Search (Iterative)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Implement binary search iteratively using a while loop. The iterative version avoids recursion overhead and is the preferred form in production code.',
    explanation: `The iterative binary search uses a while loop with left and right bounds. Each iteration calculates the midpoint, compares with the target, and narrows the search range. The loop terminates when left > right (not found) or the target is found.\n\nThe iterative version uses O(1) space (no recursion stack) and is slightly faster in practice due to no function call overhead. Use mid = left + (right - left) / 2 instead of (left + right) / 2 to prevent integer overflow.`,
    instructions: [
      'Given a sorted vector and target, return the index of target or -1',
      'Use a while loop instead of recursion',
      'Narrow the search range by adjusting left and right pointers',
    ],
    starterCode: `#include <vector>

int binarySearchIterative(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = static_cast<int>(arr.size()) - 1;

    while (left <= right) {
        // Calculate mid and compare with target
        // TODO: implement
    }

    return -1;
}`,
    solutionCode: `#include <vector>

int binarySearchIterative(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = static_cast<int>(arr.size()) - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) {
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
      { input: [[], 5], expected: -1, description: 'Empty vector' },
    ],
    hints: [
      'mid = left + (right - left) / 2 prevents overflow',
      'If arr[mid] < target, search right half: left = mid + 1',
      'If arr[mid] > target, search left half: right = mid - 1',
    ],
    concepts: ['binary search', 'iterative', 'while loop', 'O(log n)'],
  },
  {
    id: 'cpp-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'advanced',
    description:
      'Search for a target in a sorted array that has been rotated at an unknown pivot. This is a classic interview problem that extends binary search to handle rotation.',
    explanation: `A rotated sorted array like [4,5,6,7,0,1,2] was originally [0,1,2,4,5,6,7] rotated at index 4. The key insight is that at any midpoint, at least one half of the array is sorted.\n\nAt each step: find mid, determine which half is sorted (compare arr[left] with arr[mid]), then check if the target falls within the sorted half. If yes, search that half; otherwise, search the other half.\n\nThis maintains O(log n) time complexity. The tricky part is correctly handling the boundary comparisons to determine which half is sorted and whether the target lies within it.`,
    instructions: [
      'Given a rotated sorted array and a target, return the index of the target or -1',
      'The array was originally sorted in ascending order, then rotated',
      'Achieve O(log n) time complexity using modified binary search',
      'Each element is unique',
    ],
    starterCode: `#include <vector>

int searchRotated(const std::vector<int>& nums, int target) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        // Determine which half is sorted, then narrow search
        // TODO: implement
    }

    return -1;
}`,
    solutionCode: `#include <vector>

int searchRotated(const std::vector<int>& nums, int target) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) return mid;

        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}`,
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4, description: 'Find 0 in rotated array' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1, description: 'Not found' },
      { input: [[6, 7, 1, 2, 3, 4, 5], 6], expected: 0, description: 'Find first element' },
      { input: [[1], 1], expected: 0, description: 'Single element found' },
      { input: [[1], 0], expected: -1, description: 'Single element not found' },
    ],
    hints: [
      'Check which half is sorted: if nums[left] <= nums[mid], left half is sorted',
      'If target is in the sorted half range, search there',
      'Otherwise search the other half',
    ],
    concepts: ['binary search', 'rotated array', 'modified binary search', 'O(log n)'],
  },
  {
    id: 'cpp-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find a peak element in an array using binary search. A peak element is greater than its neighbors. This problem demonstrates how binary search applies beyond simple sorted arrays.',
    explanation: `A peak element is strictly greater than its neighbors. For boundary elements, we only compare with the one existing neighbor. The array is guaranteed to have at least one peak.\n\nThe binary search approach works because if nums[mid] < nums[mid+1], there must be a peak to the right (the values must eventually decrease or hit the boundary). Similarly, if nums[mid] < nums[mid-1], there is a peak to the left.\n\nThis achieves O(log n) time. The key insight is that we are not searching for a specific value but using the gradient direction to guide our search toward any peak.`,
    instructions: [
      'Given a vector where no two adjacent elements are equal, find any peak element',
      'A peak element is strictly greater than its neighbors',
      'Return the index of any peak element',
      'Use binary search for O(log n) time',
    ],
    starterCode: `#include <vector>

int findPeakElement(const std::vector<int>& nums) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left < right) {
        // Use binary search to find a peak
        // TODO: implement
    }

    return left;
}`,
    solutionCode: `#include <vector>

int findPeakElement(const std::vector<int>& nums) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}`,
    testCases: [
      { input: [1, 2, 3, 1], expected: 2, description: 'Peak at index 2' },
      { input: [1, 2, 1, 3, 5, 6, 4], expected: 5, description: 'Peak at index 5 (value 6)' },
      { input: [3, 2, 1], expected: 0, description: 'Peak at first element' },
      { input: [1, 2, 3], expected: 2, description: 'Peak at last element' },
    ],
    hints: [
      'If nums[mid] < nums[mid+1], the peak is to the right',
      'If nums[mid] > nums[mid+1], the peak is at mid or to the left',
      'Use left < right (not <=) as the loop condition',
    ],
    concepts: ['binary search', 'peak finding', 'gradient search', 'O(log n)'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'cpp-stack-operations',
    title: 'Stack Using std::stack',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a bracket validator using std::stack. Stacks follow LIFO (Last In, First Out) order and are essential for parsing, expression evaluation, and backtracking.',
    explanation: `std::stack provides push(), pop(), top(), and empty() operations, all in O(1) time. It is a container adapter that wraps another container (deque by default).\n\nBracket validation is the classic stack problem: push opening brackets, pop when you see a closing bracket and check if it matches. If the stack is empty when you try to pop, or the brackets do not match, the string is invalid. At the end, the stack must be empty for the string to be valid.\n\nThis pattern extends to HTML tag matching, expression parsing, and any problem involving nested matching pairs.`,
    instructions: [
      'Given a string containing brackets ()[]{}',
      'Return true if the brackets are valid (properly opened and closed)',
      'Use std::stack to track opening brackets',
      'Each closing bracket must match the most recent opening bracket',
    ],
    starterCode: `#include <stack>
#include <string>

bool isValidBrackets(const std::string& s) {
    std::stack<char> stk;
    // Process each character
    // TODO: implement

    return stk.empty();
}`,
    solutionCode: `#include <stack>
#include <string>

bool isValidBrackets(const std::string& s) {
    std::stack<char> stk;

    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            stk.push(c);
        } else {
            if (stk.empty()) return false;
            char top = stk.top();
            stk.pop();
            if (c == ')' && top != '(') return false;
            if (c == ']' && top != '[') return false;
            if (c == '}' && top != '{') return false;
        }
    }

    return stk.empty();
}`,
    testCases: [
      { input: '()', expected: true, description: 'Simple parentheses' },
      { input: '()[]{}', expected: true, description: 'Multiple bracket types' },
      { input: '(]', expected: false, description: 'Mismatched brackets' },
      { input: '([)]', expected: false, description: 'Incorrectly nested' },
      { input: '{[]}', expected: true, description: 'Properly nested' },
      { input: '', expected: true, description: 'Empty string' },
    ],
    hints: [
      'Push opening brackets onto the stack',
      'For closing brackets, check if stack is empty first',
      'Pop and compare: the top must be the matching opening bracket',
    ],
    concepts: ['std::stack', 'LIFO', 'bracket matching', 'O(n) time'],
  },
  {
    id: 'cpp-queue-operations',
    title: 'Queue Using std::queue',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a task scheduler simulation using std::queue. Queues follow FIFO (First In, First Out) order and are used in BFS, scheduling, and buffering.',
    explanation: `std::queue provides push(), pop(), front(), back(), and empty() operations. It processes elements in the order they were added (FIFO).\n\nA simple task scheduler processes tasks in order: dequeue a task, "execute" it (add to results), and if it generates follow-up tasks, enqueue them. This models real-world scenarios like print queues, BFS traversal, and event-driven systems.\n\nstd::queue is a container adapter over std::deque by default. All operations are O(1) amortized.`,
    instructions: [
      'Given a vector of initial tasks (integers), process them using a queue',
      'Dequeue each task, add it to the result',
      'Return the order in which tasks were processed',
      'This demonstrates basic FIFO processing',
    ],
    starterCode: `#include <queue>
#include <vector>

std::vector<int> processQueue(const std::vector<int>& tasks) {
    std::queue<int> q;
    std::vector<int> result;

    // Enqueue all tasks, then process them in FIFO order
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <queue>
#include <vector>

std::vector<int> processQueue(const std::vector<int>& tasks) {
    std::queue<int> q;
    std::vector<int> result;

    for (int task : tasks) {
        q.push(task);
    }

    while (!q.empty()) {
        result.push_back(q.front());
        q.pop();
    }

    return result;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5], description: 'FIFO order preserved' },
      { input: [5, 3, 1], expected: [5, 3, 1], description: 'Three tasks' },
      { input: [42], expected: [42], description: 'Single task' },
      { input: [], expected: [], description: 'No tasks' },
    ],
    hints: [
      'Use q.push() to enqueue, q.front() to peek, q.pop() to dequeue',
      'q.pop() does not return a value; read front() before popping',
      'Loop while !q.empty()',
    ],
    concepts: ['std::queue', 'FIFO', 'enqueue', 'dequeue'],
  },
  {
    id: 'cpp-min-stack',
    title: 'Min Stack Implementation',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time. This classic interview problem teaches how to augment a data structure with extra information.',
    explanation: `The trick is to maintain two stacks: the main stack and an auxiliary stack that tracks the minimum value at each level. When pushing, also push onto the min stack if the value is less than or equal to the current minimum. When popping, also pop from the min stack if the popped value equals the current minimum.\n\nThis achieves O(1) for all operations including getMin(). The space overhead is O(n) in the worst case (when elements are pushed in decreasing order).\n\nThis problem teaches the principle of trading space for time and augmenting data structures to support additional queries efficiently.`,
    instructions: [
      'Implement a MinStack class with: push(val), pop(), top(), getMin()',
      'All operations must be O(1) time',
      'Use an auxiliary stack to track minimums',
      'Return the operations results as a vector',
    ],
    starterCode: `#include <stack>
#include <vector>
#include <climits>

class MinStack {
    std::stack<int> mainStack;
    std::stack<int> minStack;

public:
    void push(int val) {
        // TODO: push to main stack and update min stack
    }

    void pop() {
        // TODO: pop from main stack and update min stack
    }

    int top() {
        // TODO: return top element
        return 0;
    }

    int getMin() {
        // TODO: return minimum element in O(1)
        return 0;
    }
};

// Test helper: simulates operations and returns results
std::vector<int> testMinStack(const std::vector<std::vector<int>>& ops) {
    MinStack ms;
    std::vector<int> results;
    for (const auto& op : ops) {
        if (op[0] == 0) { ms.push(op[1]); }       // push
        else if (op[0] == 1) { ms.pop(); }          // pop
        else if (op[0] == 2) { results.push_back(ms.top()); }    // top
        else if (op[0] == 3) { results.push_back(ms.getMin()); } // getMin
    }
    return results;
}`,
    solutionCode: `#include <stack>
#include <vector>
#include <climits>

class MinStack {
    std::stack<int> mainStack;
    std::stack<int> minStack;

public:
    void push(int val) {
        mainStack.push(val);
        if (minStack.empty() || val <= minStack.top()) {
            minStack.push(val);
        }
    }

    void pop() {
        if (mainStack.top() == minStack.top()) {
            minStack.pop();
        }
        mainStack.pop();
    }

    int top() {
        return mainStack.top();
    }

    int getMin() {
        return minStack.top();
    }
};

std::vector<int> testMinStack(const std::vector<std::vector<int>>& ops) {
    MinStack ms;
    std::vector<int> results;
    for (const auto& op : ops) {
        if (op[0] == 0) { ms.push(op[1]); }
        else if (op[0] == 1) { ms.pop(); }
        else if (op[0] == 2) { results.push_back(ms.top()); }
        else if (op[0] == 3) { results.push_back(ms.getMin()); }
    }
    return results;
}`,
    testCases: [
      {
        input: [
          [0, -2],
          [0, 0],
          [0, -3],
          [3, 0],
          [1, 0],
          [2, 0],
          [3, 0],
        ],
        expected: [-3, 0, -2],
        description: 'Push -2,0,-3; getMin; pop; top; getMin',
      },
      {
        input: [
          [0, 1],
          [0, 2],
          [0, 3],
          [3, 0],
          [2, 0],
        ],
        expected: [1, 3],
        description: 'Push ascending: min stays 1',
      },
    ],
    hints: [
      'Maintain a separate min stack that tracks the current minimum',
      'Push onto min stack when new value <= current minimum',
      'Pop from min stack when the popped value equals the min stack top',
    ],
    concepts: ['std::stack', 'min stack', 'O(1) operations', 'auxiliary data structure'],
  },
  {
    id: 'cpp-unordered-map-ops',
    title: 'Unordered Map Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Use std::unordered_map to count character frequencies in a string. Hash maps provide O(1) average-case lookup and insertion.',
    explanation: `std::unordered_map is C++\'s hash map implementation. It stores key-value pairs with O(1) average-case insert, lookup, and delete operations. Access elements with operator[] (creates default if missing) or .at() (throws if missing).\n\nCounting frequencies is the most common hash map pattern: iterate through elements, using each element as a key and incrementing its count. operator[] automatically initializes missing keys to 0 for integer values.\n\nThis pattern appears in anagram detection, duplicate finding, and many interview problems.`,
    instructions: [
      'Given a string, return the frequency count of each character',
      'Use std::unordered_map<char, int> to store counts',
      'operator[] creates a default value (0) for new keys',
      'Return the frequency map',
    ],
    starterCode: `#include <string>
#include <unordered_map>

std::unordered_map<char, int> charFrequency(const std::string& s) {
    std::unordered_map<char, int> freq;
    // Count frequency of each character
    // TODO: implement

    return freq;
}`,
    solutionCode: `#include <string>
#include <unordered_map>

std::unordered_map<char, int> charFrequency(const std::string& s) {
    std::unordered_map<char, int> freq;
    for (char c : s) {
        freq[c]++;
    }
    return freq;
}`,
    testCases: [
      {
        input: 'hello',
        expected: { h: 1, e: 1, l: 2, o: 1 },
        description: 'Character frequency of hello',
      },
      {
        input: 'aabbc',
        expected: { a: 2, b: 2, c: 1 },
        description: 'Repeated characters',
      },
      { input: 'a', expected: { a: 1 }, description: 'Single character' },
    ],
    hints: [
      'operator[] on unordered_map creates a default (0) entry for new keys',
      'freq[c]++ increments the count for character c',
      'Range-based for loop: for (char c : s)',
    ],
    concepts: ['std::unordered_map', 'hash map', 'frequency counting', 'O(1) lookup'],
  },
  {
    id: 'cpp-linked-list-reverse',
    title: 'Reverse a Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Reverse a singly linked list iteratively. This is one of the most commonly asked interview questions and teaches pointer manipulation.',
    explanation: `Reversing a linked list requires redirecting each node\'s next pointer to point to the previous node instead of the next. Use three pointers: prev (initially null), curr (initially head), and next (to temporarily store curr->next).\n\nAt each step: save next = curr->next, reverse the link curr->next = prev, advance prev = curr and curr = next. When curr becomes null, prev is the new head.\n\nThis runs in O(n) time with O(1) space. Understanding this pattern is crucial for many linked list problems.`,
    instructions: [
      'Reverse a singly linked list represented as a vector (for simplicity)',
      'Simulate the pointer reversal algorithm',
      'Return the reversed list as a vector',
      'This teaches the core logic of linked list reversal',
    ],
    starterCode: `#include <vector>

std::vector<int> reverseLinkedList(const std::vector<int>& list) {
    // Simulate linked list reversal using three-pointer technique
    // prev, curr, next pattern
    // TODO: implement

    return {};
}`,
    solutionCode: `#include <vector>

std::vector<int> reverseLinkedList(const std::vector<int>& list) {
    if (list.empty()) return {};

    std::vector<int> result(list.size());
    int n = static_cast<int>(list.size());
    for (int i = 0; i < n; ++i) {
        result[n - 1 - i] = list[i];
    }
    return result;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Five nodes' },
      { input: [1, 2], expected: [2, 1], description: 'Two nodes' },
      { input: [1], expected: [1], description: 'Single node' },
      { input: [], expected: [], description: 'Empty list' },
    ],
    hints: [
      'Use the three-pointer technique: prev, curr, next',
      'At each step: save next, reverse link, advance pointers',
      'When curr is null, prev is the new head',
    ],
    concepts: ['linked list', 'pointer reversal', 'iterative', 'O(n) time O(1) space'],
  },
  {
    id: 'cpp-priority-queue-custom',
    title: 'Priority Queue / Min Heap',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Use std::priority_queue to implement a min-heap that extracts the k smallest elements. Priority queues are essential for scheduling, Dijkstra\'s algorithm, and top-k problems.',
    explanation: `std::priority_queue is a max-heap by default. To create a min-heap, use std::greater<int> as the comparator:\npriority_queue<int, vector<int>, greater<int>>.\n\nThe min-heap supports O(log n) insertion and O(log n) extraction of the minimum element. To find the k smallest elements, push all elements into the min-heap and extract k times.\n\nAlternatively, use a max-heap of size k: push each element, and if the heap exceeds size k, pop the maximum. The remaining k elements are the smallest. This uses O(k) space instead of O(n).`,
    instructions: [
      'Given a vector of integers and k, return the k smallest elements in sorted order',
      'Use std::priority_queue with std::greater<int> for a min-heap',
      'Extract k elements from the min-heap',
    ],
    starterCode: `#include <vector>
#include <queue>
#include <functional>

std::vector<int> kSmallest(const std::vector<int>& nums, int k) {
    // Use a min-heap (priority_queue with greater<int>)
    // TODO: implement

    return {};
}`,
    solutionCode: `#include <vector>
#include <queue>
#include <functional>

std::vector<int> kSmallest(const std::vector<int>& nums, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);
    }

    std::vector<int> result;
    for (int i = 0; i < k && !minHeap.empty(); ++i) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }

    return result;
}`,
    testCases: [
      { input: [[3, 1, 4, 1, 5, 9, 2, 6], 3], expected: [1, 1, 2], description: 'k=3 smallest' },
      { input: [[7, 3, 5, 1], 2], expected: [1, 3], description: 'k=2 smallest' },
      { input: [[10, 20, 30], 1], expected: [10], description: 'k=1 smallest' },
      { input: [[5, 5, 5], 3], expected: [5, 5, 5], description: 'All same values' },
    ],
    hints: [
      'Min-heap: priority_queue<int, vector<int>, greater<int>>',
      'Push all elements, then pop k times',
      'top() gives the minimum, pop() removes it',
    ],
    concepts: [
      'std::priority_queue',
      'min-heap',
      'std::greater',
      'top-k elements',
    ],
  },

  // ========== TRAVERSAL ==========
  {
    id: 'cpp-dfs-tree',
    title: 'DFS Tree Traversal (Pre-order)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement depth-first search to traverse a binary tree in pre-order. DFS is a fundamental graph/tree traversal used in path finding, topological sorting, and expression evaluation.',
    explanation: `DFS pre-order traversal visits nodes in the order: root, left subtree, right subtree. Using recursion, the call stack naturally handles the backtracking.\n\nWe represent the tree as a vector-based structure where each node is a map with "value", "left", and "right" keys. In C++, we can use a struct or simulate with indices.\n\nDFS has O(n) time and O(h) space complexity, where h is the tree height (due to the recursion stack). For a balanced tree, h = O(log n); for a skewed tree, h = O(n).`,
    instructions: [
      'Given a binary tree represented as nested vectors [value, left, right]',
      'Return the values in pre-order (root, left, right)',
      'Use recursive DFS',
      'Null children are represented as empty vectors',
    ],
    starterCode: `#include <vector>
#include <any>

// Tree node: {value, leftIndex, rightIndex} in a flat array
// For simplicity, tree is given as a level-order vector where -1 means null
std::vector<int> dfsPreorder(const std::vector<int>& tree) {
    std::vector<int> result;

    // Recursive helper: index-based traversal of implicit binary tree
    // Left child of index i is at 2*i + 1, right child at 2*i + 2
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>

void dfsHelper(const std::vector<int>& tree, int index, std::vector<int>& result) {
    if (index >= static_cast<int>(tree.size()) || tree[index] == -1) return;
    result.push_back(tree[index]);
    dfsHelper(tree, 2 * index + 1, result);
    dfsHelper(tree, 2 * index + 2, result);
}

std::vector<int> dfsPreorder(const std::vector<int>& tree) {
    std::vector<int> result;
    dfsHelper(tree, 0, result);
    return result;
}`,
    testCases: [
      {
        input: [1, 2, 3, 4, 5, -1, -1],
        expected: [1, 2, 4, 5, 3],
        description: 'Pre-order of balanced tree',
      },
      { input: [1, 2, 3], expected: [1, 2, 3], description: 'Simple three-node tree' },
      { input: [1], expected: [1], description: 'Single node' },
      { input: [], expected: [], description: 'Empty tree' },
    ],
    hints: [
      'Left child index = 2 * i + 1, right child index = 2 * i + 2',
      'Base case: index out of bounds or value is -1 (null)',
      'Pre-order: visit current, then left, then right',
    ],
    concepts: ['DFS', 'pre-order traversal', 'recursion', 'binary tree'],
  },
  {
    id: 'cpp-bfs-tree',
    title: 'BFS Tree Traversal (Level-order)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement breadth-first search to traverse a binary tree level by level. BFS uses a queue and is fundamental for shortest-path problems and level-order processing.',
    explanation: `BFS processes all nodes at the current depth before moving to the next depth. It uses a queue (FIFO) to maintain the traversal order: dequeue a node, process it, then enqueue its children.\n\nFor a binary tree represented as an array, the left child of node at index i is at 2*i+1 and the right child at 2*i+2. BFS naturally produces level-order output.\n\nBFS has O(n) time and O(w) space complexity, where w is the maximum width of the tree (the number of nodes at the widest level).`,
    instructions: [
      'Given a binary tree as a level-order vector (-1 means null), return values in BFS order',
      'Use std::queue for the traversal',
      'Skip null nodes (value -1)',
    ],
    starterCode: `#include <vector>
#include <queue>

std::vector<int> bfsTraversal(const std::vector<int>& tree) {
    if (tree.empty()) return {};

    std::vector<int> result;
    std::queue<int> q;  // queue of indices

    // Start BFS from index 0
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>
#include <queue>

std::vector<int> bfsTraversal(const std::vector<int>& tree) {
    if (tree.empty()) return {};

    std::vector<int> result;
    std::queue<int> q;
    q.push(0);

    while (!q.empty()) {
        int idx = q.front();
        q.pop();

        if (idx >= static_cast<int>(tree.size()) || tree[idx] == -1) continue;

        result.push_back(tree[idx]);

        int left = 2 * idx + 1;
        int right = 2 * idx + 2;
        if (left < static_cast<int>(tree.size())) q.push(left);
        if (right < static_cast<int>(tree.size())) q.push(right);
    }

    return result;
}`,
    testCases: [
      {
        input: [1, 2, 3, 4, 5, -1, -1],
        expected: [1, 2, 3, 4, 5],
        description: 'Level-order traversal',
      },
      { input: [1, 2, 3], expected: [1, 2, 3], description: 'Three-node tree' },
      { input: [1], expected: [1], description: 'Single node' },
      { input: [], expected: [], description: 'Empty tree' },
    ],
    hints: [
      'Enqueue index 0 to start',
      'Dequeue an index, skip if out of bounds or null',
      'Enqueue left (2*i+1) and right (2*i+2) children',
    ],
    concepts: ['BFS', 'level-order traversal', 'std::queue', 'binary tree'],
  },
  {
    id: 'cpp-dfs-inorder',
    title: 'Inorder Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement inorder traversal of a binary tree. Inorder traversal of a BST produces sorted output, making it essential for BST validation and ordered processing.',
    explanation: `Inorder traversal visits nodes in the order: left subtree, root, right subtree. For a binary search tree (BST), this produces values in ascending sorted order.\n\nThe recursive implementation is straightforward: recurse left, visit current node, recurse right. The call stack handles backtracking automatically.\n\nInorder traversal is used for BST validation (check if output is sorted), converting a BST to a sorted array, and finding the kth smallest element in a BST.`,
    instructions: [
      'Given a binary tree as a level-order vector (-1 means null)',
      'Return values in inorder (left, root, right)',
      'Use recursive traversal',
    ],
    starterCode: `#include <vector>

void inorderHelper(const std::vector<int>& tree, int index, std::vector<int>& result) {
    // TODO: implement inorder traversal (left, root, right)
}

std::vector<int> inorderTraversal(const std::vector<int>& tree) {
    std::vector<int> result;
    inorderHelper(tree, 0, result);
    return result;
}`,
    solutionCode: `#include <vector>

void inorderHelper(const std::vector<int>& tree, int index, std::vector<int>& result) {
    if (index >= static_cast<int>(tree.size()) || tree[index] == -1) return;
    inorderHelper(tree, 2 * index + 1, result);
    result.push_back(tree[index]);
    inorderHelper(tree, 2 * index + 2, result);
}

std::vector<int> inorderTraversal(const std::vector<int>& tree) {
    std::vector<int> result;
    inorderHelper(tree, 0, result);
    return result;
}`,
    testCases: [
      {
        input: [4, 2, 6, 1, 3, 5, 7],
        expected: [1, 2, 3, 4, 5, 6, 7],
        description: 'BST produces sorted output',
      },
      { input: [1, 2, 3], expected: [2, 1, 3], description: 'Simple three-node tree' },
      { input: [1], expected: [1], description: 'Single node' },
      { input: [], expected: [], description: 'Empty tree' },
    ],
    hints: [
      'Inorder: left, root, right',
      'Recurse on left child first (2*index+1)',
      'Then push current value, then recurse right (2*index+2)',
    ],
    concepts: ['inorder traversal', 'BST', 'recursion', 'sorted output'],
  },
  {
    id: 'cpp-bfs-traversal',
    title: 'Graph BFS Traversal',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Implement BFS on a graph represented as an adjacency list. Graph BFS finds the shortest path in unweighted graphs and is used in social networks, web crawling, and routing.',
    explanation: `Graph BFS extends tree BFS by adding a visited set to handle cycles. Starting from a source node, enqueue it, mark as visited, then repeatedly dequeue a node, process it, and enqueue all unvisited neighbors.\n\nThe adjacency list representation uses an unordered_map from node to vector of neighbors. The visited set (unordered_set) prevents revisiting nodes and infinite loops in cyclic graphs.\n\nGraph BFS has O(V + E) time and O(V) space complexity, where V is vertices and E is edges. It produces the shortest path in unweighted graphs.`,
    instructions: [
      'Given a graph as an adjacency list and a start node, return BFS traversal order',
      'Use std::queue for BFS and std::unordered_set for visited tracking',
      'Process neighbors in the order they appear in the adjacency list',
    ],
    starterCode: `#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>

std::vector<int> graphBFS(const std::unordered_map<int, std::vector<int>>& graph, int start) {
    std::vector<int> result;
    std::unordered_set<int> visited;
    std::queue<int> q;

    // BFS from start node
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>

std::vector<int> graphBFS(const std::unordered_map<int, std::vector<int>>& graph, int start) {
    std::vector<int> result;
    std::unordered_set<int> visited;
    std::queue<int> q;

    q.push(start);
    visited.insert(start);

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        result.push_back(node);

        auto it = graph.find(node);
        if (it != graph.end()) {
            for (int neighbor : it->second) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
    }

    return result;
}`,
    testCases: [
      {
        input: [
          { 0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2] },
          0,
        ],
        expected: [0, 1, 2, 3],
        description: 'Simple connected graph',
      },
      {
        input: [{ 0: [1], 1: [2], 2: [] }, 0],
        expected: [0, 1, 2],
        description: 'Linear graph',
      },
      {
        input: [{ 0: [] }, 0],
        expected: [0],
        description: 'Single node no edges',
      },
    ],
    hints: [
      'Mark start as visited and enqueue it before the loop',
      'For each dequeued node, iterate its neighbors in the adjacency list',
      'Only enqueue neighbors that have not been visited',
    ],
    concepts: [
      'graph BFS',
      'adjacency list',
      'std::unordered_set',
      'std::queue',
      'O(V+E)',
    ],
  },
  {
    id: 'cpp-level-order-traversal',
    title: 'Level Order Traversal (Grouped)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Return tree values grouped by level. This extends basic BFS by tracking level boundaries, a common interview requirement.',
    explanation: `Grouped level-order traversal returns a vector of vectors, where each inner vector contains the values at that level. The trick is to process all nodes at the current level in one batch.\n\nAt each iteration, record the current queue size (number of nodes at this level). Dequeue exactly that many nodes, collecting their values into a level vector, and enqueue their children. This naturally separates levels.\n\nThis pattern is used in problems like zigzag level order, right side view, and average of levels.`,
    instructions: [
      'Given a binary tree as a level-order vector (-1 means null)',
      'Return values grouped by level: [[level0], [level1], ...]',
      'Use BFS with level size tracking',
    ],
    starterCode: `#include <vector>
#include <queue>

std::vector<std::vector<int>> levelOrder(const std::vector<int>& tree) {
    if (tree.empty()) return {};

    std::vector<std::vector<int>> result;
    std::queue<int> q;  // queue of indices

    // BFS with level tracking
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>
#include <queue>

std::vector<std::vector<int>> levelOrder(const std::vector<int>& tree) {
    if (tree.empty()) return {};

    std::vector<std::vector<int>> result;
    std::queue<int> q;
    q.push(0);

    while (!q.empty()) {
        int levelSize = static_cast<int>(q.size());
        std::vector<int> level;

        for (int i = 0; i < levelSize; ++i) {
            int idx = q.front();
            q.pop();

            if (idx >= static_cast<int>(tree.size()) || tree[idx] == -1) continue;

            level.push_back(tree[idx]);

            int left = 2 * idx + 1;
            int right = 2 * idx + 2;
            if (left < static_cast<int>(tree.size())) q.push(left);
            if (right < static_cast<int>(tree.size())) q.push(right);
        }

        if (!level.empty()) {
            result.push_back(level);
        }
    }

    return result;
}`,
    testCases: [
      {
        input: [3, 9, 20, -1, -1, 15, 7],
        expected: [[3], [9, 20], [15, 7]],
        description: 'Three levels',
      },
      { input: [1, 2, 3, 4, 5, 6, 7], expected: [[1], [2, 3], [4, 5, 6, 7]], description: 'Complete binary tree' },
      { input: [1], expected: [[1]], description: 'Single node' },
    ],
    hints: [
      'At each BFS iteration, record queue size = number of nodes at this level',
      'Process exactly that many nodes, collecting into a level vector',
      'Enqueue children of processed nodes for the next level',
    ],
    concepts: ['level-order traversal', 'BFS', 'level grouping', 'std::queue'],
  },

  // ========== COMBINATORICS ==========
  {
    id: 'cpp-generate-subsets',
    title: 'Generate All Subsets',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all subsets (power set) of a vector using backtracking. Subset generation is a key pattern for combinatorial search and constraint satisfaction.',
    explanation: `For each element, you have two choices: include it or exclude it. This binary decision tree generates all 2^n subsets.\n\nThe backtracking approach builds subsets incrementally: at each position, add the current element to the subset, recurse, then remove it (backtrack) and recurse again without it.\n\nAlternatively, iterate from 0 to 2^n - 1 and use bit manipulation: if bit j is set in number i, include element j in subset i. Both approaches produce all subsets in O(n * 2^n) time.`,
    instructions: [
      'Given a vector of distinct integers, return all possible subsets',
      'Include the empty subset',
      'Use backtracking: for each element, choose to include or exclude it',
    ],
    starterCode: `#include <vector>

void backtrack(const std::vector<int>& nums, int start,
               std::vector<int>& current,
               std::vector<std::vector<int>>& result) {
    // TODO: implement backtracking
}

std::vector<std::vector<int>> generateSubsets(const std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    backtrack(nums, 0, current, result);
    return result;
}`,
    solutionCode: `#include <vector>

void backtrack(const std::vector<int>& nums, int start,
               std::vector<int>& current,
               std::vector<std::vector<int>>& result) {
    result.push_back(current);
    for (int i = start; i < static_cast<int>(nums.size()); ++i) {
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back();
    }
}

std::vector<std::vector<int>> generateSubsets(const std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    backtrack(nums, 0, current, result);
    return result;
}`,
    testCases: [
      {
        input: [1, 2, 3],
        expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        description: 'All 8 subsets of [1,2,3]',
      },
      {
        input: [0],
        expected: [[], [0]],
        description: 'Single element: 2 subsets',
      },
      { input: [], expected: [[]], description: 'Empty input: just empty subset' },
    ],
    hints: [
      'Add current subset to result at every recursive call (not just at leaf)',
      'For each index from start to end, include nums[i], recurse with i+1, then pop_back',
      'The empty subset is captured when backtrack is first called',
    ],
    concepts: ['backtracking', 'subsets', 'power set', 'combinatorics'],
  },
  {
    id: 'cpp-generate-combinations',
    title: 'Generate Combinations',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Generate all combinations of k elements from a set of n elements. This is the classic "n choose k" problem used in lottery calculations, team selection, and feature subset selection.',
    explanation: `Combinations are subsets of a specific size k. Use backtracking: at each step, choose to include the current element or skip it, but only add to results when the combination reaches size k.\n\nThe key optimization is pruning: if the remaining elements are fewer than what is needed to reach size k, stop exploring that branch.\n\nThere are C(n,k) = n! / (k! * (n-k)!) combinations. The time complexity is O(k * C(n,k)) since generating each combination takes O(k) work.`,
    instructions: [
      'Given n and k, return all combinations of k numbers chosen from 1 to n',
      'Use backtracking with pruning',
      'Return combinations in any order',
    ],
    starterCode: `#include <vector>

void backtrack(int n, int k, int start,
               std::vector<int>& current,
               std::vector<std::vector<int>>& result) {
    // TODO: implement backtracking with pruning
}

std::vector<std::vector<int>> generateCombinations(int n, int k) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    backtrack(n, k, 1, current, result);
    return result;
}`,
    solutionCode: `#include <vector>

void backtrack(int n, int k, int start,
               std::vector<int>& current,
               std::vector<std::vector<int>>& result) {
    if (static_cast<int>(current.size()) == k) {
        result.push_back(current);
        return;
    }
    for (int i = start; i <= n; ++i) {
        current.push_back(i);
        backtrack(n, k, i + 1, current, result);
        current.pop_back();
    }
}

std::vector<std::vector<int>> generateCombinations(int n, int k) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    backtrack(n, k, 1, current, result);
    return result;
}`,
    testCases: [
      {
        input: [4, 2],
        expected: [
          [1, 2],
          [1, 3],
          [1, 4],
          [2, 3],
          [2, 4],
          [3, 4],
        ],
        description: 'C(4,2) = 6 combinations',
      },
      {
        input: [3, 3],
        expected: [[1, 2, 3]],
        description: 'C(3,3) = 1 combination',
      },
      {
        input: [3, 1],
        expected: [[1], [2], [3]],
        description: 'C(3,1) = 3 combinations',
      },
    ],
    hints: [
      'Base case: when current.size() == k, add to result',
      'Loop from start to n, include i, recurse with i+1, then pop_back',
      'Pruning: skip if remaining elements < k - current.size()',
    ],
    concepts: ['combinations', 'backtracking', 'pruning', 'n choose k'],
  },
  {
    id: 'cpp-cartesian-product',
    title: 'Cartesian Product',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate the Cartesian product of two vectors. The Cartesian product produces all possible pairs, used in test case generation, join operations, and brute-force search.',
    explanation: `The Cartesian product of sets A and B is the set of all pairs (a, b) where a is from A and b is from B. If |A| = m and |B| = n, the result has m * n pairs.\n\nImplementation is straightforward: use nested loops. The outer loop iterates over A, the inner loop over B. For each combination, create a pair and add it to the result.\n\nCartesian products appear in database joins, exhaustive testing (all input combinations), and as a building block for higher-dimensional combinatorial enumeration.`,
    instructions: [
      'Given two vectors, return their Cartesian product as a vector of pairs',
      'Each pair contains one element from each vector',
      'Use nested loops to generate all combinations',
    ],
    starterCode: `#include <vector>
#include <utility>

std::vector<std::pair<int, int>> cartesianProduct(
    const std::vector<int>& a,
    const std::vector<int>& b) {
    std::vector<std::pair<int, int>> result;
    // Generate all pairs (a_i, b_j)
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>
#include <utility>

std::vector<std::pair<int, int>> cartesianProduct(
    const std::vector<int>& a,
    const std::vector<int>& b) {
    std::vector<std::pair<int, int>> result;
    for (int x : a) {
        for (int y : b) {
            result.emplace_back(x, y);
        }
    }
    return result;
}`,
    testCases: [
      {
        input: [
          [1, 2],
          [3, 4],
        ],
        expected: [
          [1, 3],
          [1, 4],
          [2, 3],
          [2, 4],
        ],
        description: '2x2 Cartesian product',
      },
      {
        input: [
          [1],
          [2, 3, 4],
        ],
        expected: [
          [1, 2],
          [1, 3],
          [1, 4],
        ],
        description: '1x3 Cartesian product',
      },
      { input: [[], [1, 2]], expected: [], description: 'Empty first vector' },
    ],
    hints: [
      'Nested loops: outer over a, inner over b',
      'Use emplace_back(x, y) to create pairs efficiently',
      'Result size = a.size() * b.size()',
    ],
    concepts: ['Cartesian product', 'nested loops', 'std::pair', 'emplace_back'],
  },

  // ========== MEMOIZATION ==========
  {
    id: 'cpp-memoize-fibonacci',
    title: 'Memoized Fibonacci',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Optimize the recursive Fibonacci function using memoization with std::unordered_map. Memoization caches results to avoid redundant computation.',
    explanation: `The naive recursive Fibonacci has O(2^n) time due to overlapping subproblems. Memoization stores previously computed results in a hash map, reducing time to O(n) since each subproblem is solved only once.\n\nUse an std::unordered_map<int, long long> as the cache. Before computing fib(n), check if it is in the cache. If yes, return the cached value. If no, compute it, store in cache, then return.\n\nMemoization is the top-down approach to dynamic programming. It naturally handles only the subproblems that are actually needed, unlike bottom-up DP which fills a table for all subproblems.`,
    instructions: [
      'Implement Fibonacci with memoization using std::unordered_map',
      'Cache computed values to avoid redundant calculations',
      'Same base cases: fib(0) = 0, fib(1) = 1',
    ],
    starterCode: `#include <unordered_map>

long long fibMemo(int n, std::unordered_map<int, long long>& memo) {
    // Check memo, compute if not cached
    // TODO: implement
    return 0;
}

long long memoizedFibonacci(int n) {
    std::unordered_map<int, long long> memo;
    return fibMemo(n, memo);
}`,
    solutionCode: `#include <unordered_map>

long long fibMemo(int n, std::unordered_map<int, long long>& memo) {
    if (n <= 0) return 0;
    if (n == 1) return 1;

    auto it = memo.find(n);
    if (it != memo.end()) return it->second;

    long long result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    memo[n] = result;
    return result;
}

long long memoizedFibonacci(int n) {
    std::unordered_map<int, long long> memo;
    return fibMemo(n, memo);
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 10, expected: 55, description: 'fib(10)' },
      { input: 30, expected: 832040, description: 'fib(30) - fast with memo' },
      { input: 50, expected: 12586269025, description: 'fib(50) - only feasible with memo' },
    ],
    hints: [
      'Use memo.find(n) to check if value is cached',
      'If found, return it->second',
      'If not found, compute, store memo[n] = result, then return',
    ],
    concepts: ['memoization', 'std::unordered_map', 'top-down DP', 'O(n) optimization'],
  },
  {
    id: 'cpp-climbing-stairs',
    title: 'Climbing Stairs (DP)',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Count the number of ways to climb n stairs when you can take 1 or 2 steps at a time. This classic DP problem teaches bottom-up tabulation.',
    explanation: `At each step i, you can arrive from step i-1 (one step) or step i-2 (two steps). So the number of ways to reach step i is: dp[i] = dp[i-1] + dp[i-2].\n\nBase cases: dp[0] = 1 (one way to stay at ground), dp[1] = 1 (one way: single step). This is essentially the Fibonacci sequence shifted by one.\n\nThe bottom-up approach fills a table from 0 to n, achieving O(n) time and O(n) space. You can optimize to O(1) space by keeping only the last two values, since dp[i] only depends on dp[i-1] and dp[i-2].`,
    instructions: [
      'Given n stairs, return the number of distinct ways to reach the top',
      'At each step you can climb 1 or 2 stairs',
      'Use bottom-up dynamic programming',
    ],
    starterCode: `#include <vector>

int climbingStairs(int n) {
    if (n <= 1) return 1;

    // Build dp table bottom-up
    // TODO: implement

    return 0;
}`,
    solutionCode: `#include <vector>

int climbingStairs(int n) {
    if (n <= 1) return 1;

    std::vector<int> dp(n + 1);
    dp[0] = 1;
    dp[1] = 1;

    for (int i = 2; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}`,
    testCases: [
      { input: 1, expected: 1, description: '1 stair: [1]' },
      { input: 2, expected: 2, description: '2 stairs: [1+1, 2]' },
      { input: 3, expected: 3, description: '3 stairs: [1+1+1, 1+2, 2+1]' },
      { input: 5, expected: 8, description: '5 stairs' },
      { input: 10, expected: 89, description: '10 stairs' },
    ],
    hints: [
      'dp[i] = dp[i-1] + dp[i-2]',
      'Base cases: dp[0] = dp[1] = 1',
      'Build the table from 2 to n',
    ],
    concepts: ['dynamic programming', 'bottom-up', 'tabulation', 'Fibonacci pattern'],
  },
  {
    id: 'cpp-coin-change-min',
    title: 'Coin Change (Minimum Coins)',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Find the minimum number of coins needed to make a given amount. This is a classic DP problem that teaches the unbounded knapsack pattern.',
    explanation: `For each amount from 1 to target, compute the minimum coins needed. For each coin denomination, if the coin value does not exceed the current amount, check if using that coin leads to a better solution.\n\nThe recurrence is: dp[amount] = min(dp[amount], dp[amount - coin] + 1) for each coin. Initialize dp[0] = 0 (zero coins for zero amount) and all other dp values to infinity (amount + 1 works as a sentinel).\n\nIf dp[target] remains greater than target, the amount cannot be made. Time complexity is O(amount * coins), space is O(amount).`,
    instructions: [
      'Given coin denominations and a target amount, return the minimum number of coins needed',
      'Return -1 if the amount cannot be made with the given coins',
      'Each coin can be used unlimited times',
      'Use bottom-up DP',
    ],
    starterCode: `#include <vector>
#include <algorithm>

int coinChange(const std::vector<int>& coins, int amount) {
    // dp[i] = minimum coins to make amount i
    // TODO: implement

    return -1;
}`,
    solutionCode: `#include <vector>
#include <algorithm>

int coinChange(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; ++i) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = std::min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}`,
    testCases: [
      { input: [[1, 5, 10, 25], 30], expected: 2, description: '25 + 5 = 30' },
      { input: [[1, 2, 5], 11], expected: 3, description: '5 + 5 + 1 = 11' },
      { input: [[2], 3], expected: -1, description: 'Cannot make 3 with only 2s' },
      { input: [[1], 0], expected: 0, description: 'Zero amount needs zero coins' },
      { input: [[1, 5, 10], 8], expected: 4, description: '5 + 1 + 1 + 1 = 8' },
    ],
    hints: [
      'Initialize dp with amount+1 as infinity sentinel',
      'dp[0] = 0 (base case)',
      'For each amount, try each coin: dp[i] = min(dp[i], dp[i-coin] + 1)',
    ],
    concepts: ['dynamic programming', 'coin change', 'unbounded knapsack', 'std::min'],
  },

  // ========== UTILITIES ==========
  {
    id: 'cpp-chunk-vector',
    title: 'Vector Chunking',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Split a vector into chunks of a given size. Chunking is used in pagination, batch processing, and parallel data distribution.',
    explanation: `Chunking divides a vector into smaller vectors of a specified maximum size. The last chunk may be smaller if the vector size is not evenly divisible.\n\nIterate with a step equal to the chunk size. At each step, create a sub-vector from the current position to min(current + chunkSize, total size). In C++, use the vector constructor that takes iterator ranges, or use std::vector::assign.\n\nThis utility appears in pagination (displaying N items per page), batch API calls, and distributing work across threads.`,
    instructions: [
      'Given a vector and a chunk size, split it into sub-vectors of that size',
      'The last chunk may be smaller than the chunk size',
      'Return a vector of vectors',
    ],
    starterCode: `#include <vector>
#include <algorithm>

std::vector<std::vector<int>> chunkVector(const std::vector<int>& vec, int chunkSize) {
    std::vector<std::vector<int>> result;
    // Split vec into chunks of chunkSize
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>
#include <algorithm>

std::vector<std::vector<int>> chunkVector(const std::vector<int>& vec, int chunkSize) {
    std::vector<std::vector<int>> result;

    for (size_t i = 0; i < vec.size(); i += chunkSize) {
        auto start = vec.begin() + i;
        auto end = vec.begin() + std::min(i + static_cast<size_t>(chunkSize), vec.size());
        result.emplace_back(start, end);
    }

    return result;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], 2],
        expected: [[1, 2], [3, 4], [5]],
        description: 'Uneven chunks',
      },
      {
        input: [[1, 2, 3, 4], 2],
        expected: [
          [1, 2],
          [3, 4],
        ],
        description: 'Even chunks',
      },
      {
        input: [[1, 2, 3], 5],
        expected: [[1, 2, 3]],
        description: 'Chunk size larger than vector',
      },
      { input: [[], 3], expected: [], description: 'Empty vector' },
    ],
    hints: [
      'Use iterator ranges to construct sub-vectors',
      'std::min(i + chunkSize, vec.size()) prevents going out of bounds',
      'emplace_back(start, end) constructs a vector from an iterator range',
    ],
    concepts: ['chunking', 'iterators', 'std::min', 'emplace_back'],
  },
  {
    id: 'cpp-merge-sorted',
    title: 'Merge Two Sorted Vectors',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Merge two sorted vectors into a single sorted vector. This is the merge step of merge sort and a common interview building block.',
    explanation: `Use two pointers, one for each vector. Compare the elements at both pointers, push the smaller one to the result, and advance that pointer. When one vector is exhausted, append the remaining elements of the other.\n\nThis runs in O(n + m) time where n and m are the lengths of the two vectors. The technique is the core operation in merge sort and is also used in merging k sorted lists (with a heap).\n\nC++ also provides std::merge in <algorithm>, but implementing it manually teaches the two-pointer merge pattern.`,
    instructions: [
      'Given two sorted vectors, merge them into a single sorted vector',
      'Use the two-pointer technique',
      'Do not use std::merge or sorting after concatenation',
    ],
    starterCode: `#include <vector>

std::vector<int> mergeSorted(const std::vector<int>& a, const std::vector<int>& b) {
    std::vector<int> result;
    // Two-pointer merge
    // TODO: implement

    return result;
}`,
    solutionCode: `#include <vector>

std::vector<int> mergeSorted(const std::vector<int>& a, const std::vector<int>& b) {
    std::vector<int> result;
    result.reserve(a.size() + b.size());

    size_t i = 0, j = 0;
    while (i < a.size() && j < b.size()) {
        if (a[i] <= b[j]) {
            result.push_back(a[i++]);
        } else {
            result.push_back(b[j++]);
        }
    }

    while (i < a.size()) result.push_back(a[i++]);
    while (j < b.size()) result.push_back(b[j++]);

    return result;
}`,
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
        description: 'Non-overlapping ranges',
      },
      { input: [[], [1, 2, 3]], expected: [1, 2, 3], description: 'One empty vector' },
      { input: [[], []], expected: [], description: 'Both empty' },
    ],
    hints: [
      'Use two indices i and j starting at 0',
      'Compare a[i] and b[j], push the smaller one',
      'After the main loop, append remaining elements from both vectors',
    ],
    concepts: ['two pointers', 'merge', 'sorted arrays', 'O(n+m)'],
  },
  {
    id: 'cpp-group-by-key',
    title: 'Group Elements by Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Group vector elements by a computed key using std::unordered_map. Grouping is used in data aggregation, database GROUP BY, and classification.',
    explanation: `Grouping collects elements that share a common property. Use an unordered_map where the key is the grouping criterion and the value is a vector of elements with that key.\n\nFor this exercise, group integers by their value modulo a given divisor. Iterate through the input, compute the key (num % divisor), and push the element into the corresponding vector in the map.\n\nThis O(n) algorithm is the basis for bucket sort, hash-based aggregation, and any GROUP BY operation.`,
    instructions: [
      'Given a vector of integers and a divisor, group elements by their remainder when divided by the divisor',
      'Return an unordered_map<int, vector<int>> mapping remainder to elements',
      'Preserve insertion order within each group',
    ],
    starterCode: `#include <vector>
#include <unordered_map>

std::unordered_map<int, std::vector<int>> groupByRemainder(
    const std::vector<int>& nums, int divisor) {
    std::unordered_map<int, std::vector<int>> groups;
    // Group elements by num % divisor
    // TODO: implement

    return groups;
}`,
    solutionCode: `#include <vector>
#include <unordered_map>

std::unordered_map<int, std::vector<int>> groupByRemainder(
    const std::vector<int>& nums, int divisor) {
    std::unordered_map<int, std::vector<int>> groups;
    for (int num : nums) {
        groups[num % divisor].push_back(num);
    }
    return groups;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5, 6], 3],
        expected: { 0: [3, 6], 1: [1, 4], 2: [2, 5] },
        description: 'Group by mod 3',
      },
      {
        input: [[10, 20, 30, 15, 25], 10],
        expected: { 0: [10, 20, 30], 5: [15, 25] },
        description: 'Group by mod 10',
      },
      {
        input: [[1, 1, 1], 2],
        expected: { 1: [1, 1, 1] },
        description: 'All same remainder',
      },
    ],
    hints: [
      'groups[key].push_back(num) auto-creates the vector if the key is new',
      'The key is num % divisor',
      'unordered_map provides O(1) average insertion and lookup',
    ],
    concepts: ['std::unordered_map', 'grouping', 'modulo', 'hash map'],
  },
];
