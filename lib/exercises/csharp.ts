import type { Exercise } from './types';

export const csharpExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'cs-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through a List<int> and collect every other element using index stepping. This fundamental loop pattern is used in sampling, pair processing, and interleaving algorithms.',
    explanation: `Skipping every other element teaches you to control loop increments beyond the default step of 1. In C#, you use a standard for loop with i += 2 to visit only even-indexed positions (0, 2, 4, ...).\n\nThis runs in O(n/2) time which simplifies to O(n). The pattern is the building block for pair processing, downsampling data, and any algorithm that needs to process every nth element of a collection.`,
    instructions: [
      'Given a List<int>, return a new List<int> containing only elements at even indices (0, 2, 4, ...)',
      'Use a for loop with a step of 2',
      'Do not use LINQ',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> SkipEveryOther(List<int> numbers)
    {
        var result = new List<int>();
        // Use a for loop with step of 2
        // TODO: Implement this method

        return result;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> SkipEveryOther(List<int> numbers)
    {
        var result = new List<int>();
        for (int i = 0; i < numbers.Count; i += 2)
        {
            result.Add(numbers[i]);
        }
        return result;
    }
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [1, 3, 5], description: 'Basic even-length list' },
      { input: [10, 20, 30, 40, 50], expected: [10, 30, 50], description: 'Odd-length list' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty list' },
    ],
    hints: [
      'Initialize i to 0 and increment by 2 each iteration: i += 2',
      'Use numbers.Count to get the list length',
      'Push with result.Add(numbers[i])',
    ],
    concepts: ['for loop', 'index stepping', 'List<T>'],
  },
  {
    id: 'cs-reverse-iteration',
    title: 'Reverse List Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through a list in reverse order from last to first element. Reverse iteration is used in palindrome checking, stack unwinding, and LIFO processing.',
    explanation: `Reverse iteration traverses a collection from the last index to the first using a decrementing loop counter. In C#, you initialize i to Count - 1 and decrement until reaching 0.\n\nThis visits every element exactly once in reverse for O(n) time. The pattern appears in palindrome checking, undo histories, and any algorithm processing items in last-in-first-out order.`,
    instructions: [
      'Given a List<T>, return a new list with elements in reverse order',
      'Use a for loop iterating backwards',
      'Do not use the Reverse() method or LINQ',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> ReverseIterate(List<int> items)
    {
        var result = new List<int>();
        // Iterate from the end to the beginning
        // TODO: Implement this method

        return result;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> ReverseIterate(List<int> items)
    {
        var result = new List<int>();
        for (int i = items.Count - 1; i >= 0; i--)
        {
            result.Add(items[i]);
        }
        return result;
    }
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Basic reverse' },
      { input: [10, 20, 30], expected: [30, 20, 10], description: 'Three elements' },
      { input: [42], expected: [42], description: 'Single element' },
      { input: [], expected: [], description: 'Empty list' },
    ],
    hints: ['Start i at items.Count - 1', 'Loop while i >= 0', 'Decrement i each iteration: i--'],
    concepts: ['reverse iteration', 'for loop', 'list indices'],
  },
  {
    id: 'cs-matrix-traversal',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a 2D array (matrix) row by row using nested loops and collect all elements into a flat list. Nested iteration is the basis for image processing, grid-based games, and matrix algorithms.',
    explanation: `Matrix traversal with nested loops systematically visits every cell in a two-dimensional grid. The outer loop iterates over rows and the inner loop over columns within each row, visiting all elements in O(rows * cols) time.\n\nIn C# you use GetLength(0) for the row count and GetLength(1) for the column count when working with 2D arrays. This row-major traversal pattern is foundational for dynamic programming on grids, image processing, and spreadsheet calculations.`,
    instructions: [
      'Given a 2D int array (matrix), return a flat List<int> of all elements',
      'Traverse row by row, from left to right',
      'Use nested for loops with GetLength()',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> FlattenMatrix(int[,] matrix)
    {
        var result = new List<int>();
        // Use nested loops to traverse the matrix
        // TODO: Implement this method

        return result;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> FlattenMatrix(int[,] matrix)
    {
        var result = new List<int>();
        for (int row = 0; row < matrix.GetLength(0); row++)
        {
            for (int col = 0; col < matrix.GetLength(1); col++)
            {
                result.Add(matrix[row, col]);
            }
        }
        return result;
    }
}`,
    testCases: [
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
        ],
        expected: [1, 2, 3, 4, 5, 6],
        description: '2x3 matrix',
      },
      {
        input: [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        expected: [1, 2, 3, 4, 5, 6],
        description: '3x2 matrix',
      },
      { input: [[7]], expected: [7], description: '1x1 matrix' },
    ],
    hints: [
      'Use matrix.GetLength(0) for row count',
      'Use matrix.GetLength(1) for column count',
      'Access elements with matrix[row, col]',
    ],
    concepts: ['nested loops', '2D arrays', 'matrix traversal', 'GetLength()'],
  },
  {
    id: 'cs-sliding-window-max-sum',
    title: 'Sliding Window Maximum Sum',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the maximum sum of any contiguous subarray of size k using the sliding window technique. This pattern avoids recomputing sums from scratch and runs in O(n) time.',
    explanation: `The sliding window technique maintains a running sum over a fixed-size window that slides across the array. Instead of recalculating the sum for each window position (O(n*k)), you subtract the element leaving the window and add the element entering it.\n\nThis reduces the time complexity from O(n*k) to O(n). The pattern is used extensively in stream processing, network packet analysis, and interview problems involving contiguous subarrays.`,
    instructions: [
      'Given an array of integers and a window size k, find the maximum sum of any contiguous subarray of size k',
      'Use the sliding window technique: compute the first window sum, then slide by subtracting the leftmost and adding the rightmost',
      'Return 0 if k is larger than the array length',
    ],
    starterCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int SlidingWindowMaxSum(int[] nums, int k)
    {
        if (nums.Length < k) return 0;

        // Calculate sum of first window, then slide
        // TODO: Implement this method

        return 0;
    }
}`,
    solutionCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int SlidingWindowMaxSum(int[] nums, int k)
    {
        if (nums.Length < k) return 0;

        int windowSum = 0;
        for (int i = 0; i < k; i++)
        {
            windowSum += nums[i];
        }

        int maxSum = windowSum;
        for (int i = k; i < nums.Length; i++)
        {
            windowSum += nums[i] - nums[i - k];
            maxSum = Math.Max(maxSum, windowSum);
        }

        return maxSum;
    }
}`,
    testCases: [
      { input: [[2, 1, 5, 1, 3, 2], 3], expected: 9, description: 'Window of 3: [5,1,3]=9' },
      { input: [[2, 3, 4, 1, 5], 2], expected: 7, description: 'Window of 2: [2,3] or [3,4]=7' },
      { input: [[1, 1, 1, 1, 1], 5], expected: 5, description: 'Window equals array' },
      { input: [[5], 2], expected: 0, description: 'Window larger than array' },
    ],
    hints: [
      'First compute the sum of elements 0 to k-1',
      'Then slide: subtract nums[i-k] and add nums[i]',
      'Track the maximum sum seen so far with Math.Max()',
    ],
    concepts: ['sliding window', 'running sum', 'Math.Max', 'O(n) optimization'],
  },
  {
    id: 'cs-two-pointer-palindrome',
    title: 'Two Pointer Palindrome Check',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Use the two-pointer technique to check if a string is a palindrome. Two pointers converging from both ends is a classic O(n) pattern for symmetric comparisons.',
    explanation: `The two-pointer technique places one pointer at the start and another at the end of a sequence, moving them toward each other. For palindrome checking, you compare characters at both pointers and move inward.\n\nIf any pair of characters differs, the string is not a palindrome. If all pairs match until the pointers meet or cross, it is a palindrome. This runs in O(n/2) time, simplified to O(n), with O(1) extra space.`,
    instructions: [
      'Given a string, return true if it is a palindrome (reads the same forwards and backwards)',
      'Use two pointers: one starting from the left, one from the right',
      'Compare characters moving inward; ignore case',
    ],
    starterCode: `public class Solution
{
    public static bool IsPalindrome(string s)
    {
        // Use two pointers from both ends
        // TODO: Implement this method

        return false;
    }
}`,
    solutionCode: `public class Solution
{
    public static bool IsPalindrome(string s)
    {
        s = s.ToLower();
        int left = 0;
        int right = s.Length - 1;

        while (left < right)
        {
            if (s[left] != s[right])
                return false;
            left++;
            right--;
        }

        return true;
    }
}`,
    testCases: [
      { input: 'racecar', expected: true, description: 'Classic palindrome' },
      { input: 'hello', expected: false, description: 'Not a palindrome' },
      { input: 'Madam', expected: true, description: 'Case-insensitive palindrome' },
      { input: 'a', expected: true, description: 'Single character' },
      { input: '', expected: true, description: 'Empty string' },
    ],
    hints: [
      'Initialize left = 0 and right = s.Length - 1',
      'Loop while left < right',
      'Use s.ToLower() for case-insensitive comparison',
    ],
    concepts: ['two pointers', 'palindrome', 'string manipulation', 'ToLower()'],
  },
  {
    id: 'cs-linq-iteration',
    title: 'LINQ-Based Iteration Patterns',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Use LINQ methods (Where, Select, Aggregate) to filter, transform, and reduce collections. LINQ is the idiomatic C# approach to declarative data processing.',
    explanation: `LINQ (Language Integrated Query) provides a functional, declarative way to process collections in C#. Where() filters elements, Select() transforms them, and Aggregate() reduces them to a single value.\n\nUsing LINQ makes code more readable and concise compared to manual loops. Under the hood, LINQ uses deferred execution for most operations, meaning elements are processed lazily. ToList() forces evaluation.`,
    instructions: [
      'Given a List<int>, return the squares of all even numbers using LINQ',
      'Use Where() to filter even numbers',
      'Use Select() to square each number',
      'Return the result as a List<int>',
    ],
    starterCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static List<int> EvenSquares(List<int> numbers)
    {
        // Use LINQ Where() and Select() to filter and transform
        // TODO: Implement this method

        return new List<int>();
    }
}`,
    solutionCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static List<int> EvenSquares(List<int> numbers)
    {
        return numbers
            .Where(n => n % 2 == 0)
            .Select(n => n * n)
            .ToList();
    }
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [4, 16, 36], description: 'Mixed list' },
      { input: [2, 4, 6], expected: [4, 16, 36], description: 'All even' },
      { input: [1, 3, 5], expected: [], description: 'All odd' },
      { input: [], expected: [], description: 'Empty list' },
    ],
    hints: [
      'Where(n => n % 2 == 0) filters even numbers',
      'Select(n => n * n) squares each element',
      'Call .ToList() to materialize the result',
    ],
    concepts: ['LINQ', 'Where()', 'Select()', 'lambda expressions', 'ToList()'],
  },

  // ========== RECURSION ==========
  {
    id: 'cs-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate the nth Fibonacci number using simple recursion. This classic exercise teaches base cases and recursive decomposition.',
    explanation: `The Fibonacci sequence is defined as F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2). A direct recursive implementation mirrors this definition exactly.\n\nWhile elegant, naive recursion has O(2^n) time complexity due to redundant calculations. This exercise focuses on understanding recursion mechanics; the memoization category shows how to optimize it.`,
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'F(0) = 0, F(1) = 1',
      'Use recursion: F(n) = F(n-1) + F(n-2)',
    ],
    starterCode: `public class Solution
{
    public static int Fibonacci(int n)
    {
        // Base cases
        // TODO: Implement base cases

        // Recursive case
        // TODO: Implement recursive case

        return 0;
    }
}`,
    solutionCode: `public class Solution
{
    public static int Fibonacci(int n)
    {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}`,
    testCases: [
      { input: 0, expected: 0, description: 'F(0) = 0' },
      { input: 1, expected: 1, description: 'F(1) = 1' },
      { input: 5, expected: 5, description: 'F(5) = 5' },
      { input: 10, expected: 55, description: 'F(10) = 55' },
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n == 1 returns 1',
      'Recursive case: return Fibonacci(n - 1) + Fibonacci(n - 2)',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci sequence'],
  },
  {
    id: 'cs-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate n! (n factorial) using recursion. Factorial is the simplest demonstration of how recursion reduces a problem to a smaller subproblem.',
    explanation: `Factorial is defined as n! = n * (n-1) * ... * 1, with 0! = 1. The recursive formulation is: factorial(n) = n * factorial(n-1) with base case factorial(0) = 1.\n\nEach recursive call reduces n by 1, and the call stack unwinds by multiplying the results. This runs in O(n) time and O(n) stack space.`,
    instructions: [
      'Return n! (n factorial)',
      'factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: factorial(0) = factorial(1) = 1',
    ],
    starterCode: `public class Solution
{
    public static long Factorial(int n)
    {
        // Base case
        // TODO: Implement base case

        // Recursive case
        // TODO: Implement recursive case

        return 0;
    }
}`,
    solutionCode: `public class Solution
{
    public static long Factorial(int n)
    {
        if (n <= 1) return 1;
        return n * Factorial(n - 1);
    }
}`,
    testCases: [
      { input: 0, expected: 1, description: '0! = 1' },
      { input: 1, expected: 1, description: '1! = 1' },
      { input: 5, expected: 120, description: '5! = 120' },
      { input: 10, expected: 3628800, description: '10! = 3628800' },
    ],
    hints: [
      'Base case: if n <= 1, return 1',
      'Recursive case: return n * Factorial(n - 1)',
      'Use long to handle larger values',
    ],
    concepts: ['recursion', 'factorial', 'base case', 'long type'],
  },
  {
    id: 'cs-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Solve the Tower of Hanoi puzzle using recursion. Move n disks from source peg to target peg using an auxiliary peg, following the constraint that a larger disk cannot be placed on a smaller one.',
    explanation: `The Tower of Hanoi is a classic recursive problem. To move n disks from source to target:\n1. Recursively move n-1 disks from source to auxiliary\n2. Move the largest disk from source to target\n3. Recursively move n-1 disks from auxiliary to target\n\nThis generates 2^n - 1 moves. The beauty of this problem is that the recursive solution is both elegant and optimal.`,
    instructions: [
      'Return a list of moves as tuples (from, to) to solve Tower of Hanoi for n disks',
      'Pegs are labeled "A" (source), "B" (auxiliary), "C" (target)',
      'Move n disks from A to C using B as auxiliary',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<string> TowerOfHanoi(int n)
    {
        var moves = new List<string>();
        // TODO: Implement recursive helper
        // Solve(n, "A", "C", "B", moves);

        return moves;
    }

    private static void Solve(int n, string from, string to, string aux, List<string> moves)
    {
        // TODO: Implement recursive solution
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static List<string> TowerOfHanoi(int n)
    {
        var moves = new List<string>();
        Solve(n, "A", "C", "B", moves);
        return moves;
    }

    private static void Solve(int n, string from, string to, string aux, List<string> moves)
    {
        if (n == 0) return;
        Solve(n - 1, from, aux, to, moves);
        moves.Add(from + "->" + to);
        Solve(n - 1, aux, to, from, moves);
    }
}`,
    testCases: [
      { input: 1, expected: ['A->C'], description: '1 disk' },
      { input: 2, expected: ['A->B', 'A->C', 'B->C'], description: '2 disks' },
      {
        input: 3,
        expected: ['A->C', 'A->B', 'C->B', 'A->C', 'B->A', 'B->C', 'A->C'],
        description: '3 disks (7 moves)',
      },
    ],
    hints: [
      'Base case: n == 0, do nothing',
      'Move n-1 disks from source to auxiliary',
      'Move the nth disk from source to target',
      'Move n-1 disks from auxiliary to target',
    ],
    concepts: ['recursion', 'Tower of Hanoi', 'divide and conquer'],
  },
  {
    id: 'cs-generate-permutations',
    title: 'Generate Permutations',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Generate all permutations of a given array using recursive backtracking. Permutation generation is fundamental to brute-force search, scheduling problems, and combinatorial optimization.',
    explanation: `Generating permutations uses backtracking: for each position, try every unused element, recurse on the remaining positions, then undo the choice (backtrack).\n\nFor n elements there are n! permutations. The algorithm swaps elements to build permutations in-place, then swaps back when backtracking. This is more memory-efficient than creating new arrays at each step.`,
    instructions: [
      'Given an array of distinct integers, return all possible permutations',
      'Use recursive backtracking',
      'Each permutation should be a List<int>',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<List<int>> Permute(int[] nums)
    {
        var result = new List<List<int>>();
        // TODO: Implement recursive backtracking
        // Backtrack(nums, 0, result);

        return result;
    }

    private static void Backtrack(int[] nums, int start, List<List<int>> result)
    {
        // TODO: Implement backtracking logic
    }
}`,
    solutionCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static List<List<int>> Permute(int[] nums)
    {
        var result = new List<List<int>>();
        Backtrack(nums, 0, result);
        return result;
    }

    private static void Backtrack(int[] nums, int start, List<List<int>> result)
    {
        if (start == nums.Length)
        {
            result.Add(nums.ToList());
            return;
        }

        for (int i = start; i < nums.Length; i++)
        {
            (nums[start], nums[i]) = (nums[i], nums[start]);
            Backtrack(nums, start + 1, result);
            (nums[start], nums[i]) = (nums[i], nums[start]);
        }
    }
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
      {
        input: [1],
        expected: [[1]],
        description: 'Single element',
      },
    ],
    hints: [
      'Base case: when start equals array length, add a copy to results',
      'Swap nums[start] with nums[i] for each i from start to end',
      'Recurse with start + 1, then swap back (backtrack)',
      'Use C# tuple swap: (a, b) = (b, a)',
    ],
    concepts: ['backtracking', 'permutations', 'recursion', 'swap', 'ToList()'],
  },
  {
    id: 'cs-flatten-nested-list',
    title: 'Flatten Nested List',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Recursively flatten an arbitrarily nested list structure into a single flat list. This exercise teaches recursive decomposition on nested data structures.',
    explanation: `Flattening a nested list requires checking each element: if it is a list, recurse into it; if it is a value, add it to the result. This is a natural recursive decomposition where the base case handles individual values and the recursive case handles nested lists.\n\nIn C# we can represent nested structures using object (or List<object>). The is keyword helps determine whether an element is a nested list or a terminal value.`,
    instructions: [
      'Given a nested list (represented as List<object> where elements are ints or nested List<object>), flatten it into a single List<int>',
      'Use recursion to handle arbitrary nesting depth',
      'Use the "is" keyword to check element types',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> Flatten(List<object> nested)
    {
        var result = new List<int>();
        // TODO: Iterate elements; if element is List<object>, recurse;
        // if element is int, add to result

        return result;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> Flatten(List<object> nested)
    {
        var result = new List<int>();
        foreach (var item in nested)
        {
            if (item is List<object> subList)
            {
                result.AddRange(Flatten(subList));
            }
            else if (item is int value)
            {
                result.Add(value);
            }
        }
        return result;
    }
}`,
    testCases: [
      {
        input: [1, [2, 3], [4, [5, 6]]],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Mixed nesting',
      },
      {
        input: [
          [1, 2],
          [3, 4],
        ],
        expected: [1, 2, 3, 4],
        description: 'One level of nesting',
      },
      {
        input: [1, 2, 3],
        expected: [1, 2, 3],
        description: 'Already flat',
      },
    ],
    hints: [
      'Use "is List<object> subList" for pattern matching',
      'Use result.AddRange() to add all elements from a recursive call',
      'Check "is int value" for terminal elements',
    ],
    concepts: ['recursion', 'pattern matching', 'is keyword', 'List<object>', 'AddRange()'],
  },

  // ========== SEARCHING ==========
  {
    id: 'cs-binary-search',
    title: 'Binary Search (Recursive)',
    category: 'searching',
    difficulty: 'beginner',
    description:
      'Implement binary search recursively to find an element in a sorted array. Binary search halves the search space each step for O(log n) time complexity.',
    explanation: `Binary search works on sorted arrays by repeatedly comparing the target with the middle element. If the target is smaller, search the left half; if larger, search the right half. Each step eliminates half the remaining elements.\n\nThe recursive version passes updated left/right bounds to each recursive call. The base case is when left > right, meaning the element is not found.`,
    instructions: [
      'Given a sorted int array and a target, return the index of target or -1 if not found',
      'Implement using recursion with left and right bounds',
      'Time complexity: O(log n)',
    ],
    starterCode: `public class Solution
{
    public static int BinarySearch(int[] arr, int target)
    {
        return Search(arr, target, 0, arr.Length - 1);
    }

    private static int Search(int[] arr, int target, int left, int right)
    {
        // Base case: element not found
        // TODO: Implement recursive binary search

        return -1;
    }
}`,
    solutionCode: `public class Solution
{
    public static int BinarySearch(int[] arr, int target)
    {
        return Search(arr, target, 0, arr.Length - 1);
    }

    private static int Search(int[] arr, int target, int left, int right)
    {
        if (left > right) return -1;

        int mid = left + (right - left) / 2;

        if (arr[mid] == target) return mid;
        if (arr[mid] < target) return Search(arr, target, mid + 1, right);
        return Search(arr, target, left, mid - 1);
    }
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9, 11], 7], expected: 3, description: 'Found in middle' },
      { input: [[1, 3, 5, 7, 9, 11], 1], expected: 0, description: 'Found at start' },
      { input: [[1, 3, 5, 7, 9, 11], 11], expected: 5, description: 'Found at end' },
      { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: 'Not found' },
    ],
    hints: [
      'Base case: if left > right, return -1',
      'Calculate mid as left + (right - left) / 2 to avoid overflow',
      'Compare arr[mid] with target to decide which half to search',
    ],
    concepts: ['binary search', 'recursion', 'divide and conquer', 'O(log n)'],
  },
  {
    id: 'cs-binary-search-iterative',
    title: 'Binary Search (Iterative)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Implement binary search iteratively using a while loop. The iterative version avoids recursion overhead and is often preferred in production code.',
    explanation: `The iterative binary search uses a while loop with left and right pointers instead of recursive calls. This avoids call stack overhead and is generally preferred in performance-critical code.\n\nThe logic is identical: compute mid, compare with target, and narrow the search range. The loop continues while left <= right.`,
    instructions: [
      'Given a sorted array and a target, return the index of target or -1 if not found',
      'Use a while loop instead of recursion',
      'Avoid integer overflow when computing mid',
    ],
    starterCode: `public class Solution
{
    public static int BinarySearchIterative(int[] arr, int target)
    {
        int left = 0;
        int right = arr.Length - 1;

        // TODO: Implement iterative binary search with while loop

        return -1;
    }
}`,
    solutionCode: `public class Solution
{
    public static int BinarySearchIterative(int[] arr, int target)
    {
        int left = 0;
        int right = arr.Length - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }

        return -1;
    }
}`,
    testCases: [
      { input: [[2, 4, 6, 8, 10, 12], 8], expected: 3, description: 'Found at index 3' },
      { input: [[2, 4, 6, 8, 10, 12], 2], expected: 0, description: 'Found at start' },
      { input: [[2, 4, 6, 8, 10, 12], 12], expected: 5, description: 'Found at end' },
      { input: [[2, 4, 6, 8, 10, 12], 5], expected: -1, description: 'Not found' },
      { input: [[], 1], expected: -1, description: 'Empty array' },
    ],
    hints: [
      'Use while (left <= right) as the loop condition',
      'Calculate mid = left + (right - left) / 2',
      'Narrow the range by setting left = mid + 1 or right = mid - 1',
    ],
    concepts: ['binary search', 'iterative', 'while loop', 'O(log n)'],
  },
  {
    id: 'cs-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'advanced',
    description:
      'Search for a target in a sorted array that has been rotated at an unknown pivot. This classic interview problem requires a modified binary search.',
    explanation: `A rotated sorted array like [4,5,6,7,0,1,2] was originally [0,1,2,4,5,6,7] and rotated at index 4. In each binary search step, at least one half of the array is still sorted.\n\nThe key insight: determine which half is sorted by comparing arr[left] with arr[mid]. If the left half is sorted and the target falls within it, search left; otherwise search right. This maintains O(log n) time.`,
    instructions: [
      'Given a rotated sorted array (no duplicates) and a target, return its index or -1',
      'Use modified binary search',
      'Determine which half is sorted, then decide where to search',
    ],
    starterCode: `public class Solution
{
    public static int SearchRotated(int[] nums, int target)
    {
        int left = 0;
        int right = nums.Length - 1;

        // TODO: Implement modified binary search for rotated array

        return -1;
    }
}`,
    solutionCode: `public class Solution
{
    public static int SearchRotated(int[] nums, int target)
    {
        int left = 0;
        int right = nums.Length - 1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) return mid;

            if (nums[left] <= nums[mid])
            {
                if (target >= nums[left] && target < nums[mid])
                    right = mid - 1;
                else
                    left = mid + 1;
            }
            else
            {
                if (target > nums[mid] && target <= nums[right])
                    left = mid + 1;
                else
                    right = mid - 1;
            }
        }

        return -1;
    }
}`,
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4, description: 'Target in rotated part' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 5], expected: 1, description: 'Target in sorted part' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1, description: 'Target not found' },
      { input: [[1], 1], expected: 0, description: 'Single element found' },
    ],
    hints: [
      'Check which half is sorted: if nums[left] <= nums[mid], left half is sorted',
      'If target is in the sorted half, narrow to it; otherwise search the other half',
      'Handle the edge case where left == mid',
    ],
    concepts: ['binary search', 'rotated array', 'modified search', 'O(log n)'],
  },
  {
    id: 'cs-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find a peak element in an array where an element is a peak if it is greater than its neighbors. Use binary search for O(log n) time.',
    explanation: `A peak element is strictly greater than its neighbors. The array may have multiple peaks; returning any one is valid. Binary search works because if nums[mid] < nums[mid+1], a peak must exist in the right half (the sequence must eventually decrease or hit the array boundary).\n\nConversely, if nums[mid] < nums[mid-1], a peak exists in the left half. This guarantees O(log n) convergence to a peak.`,
    instructions: [
      'Given an array of integers, find a peak element and return its index',
      'An element is a peak if it is greater than its neighbors',
      'Use binary search approach for O(log n) time',
      'nums[-1] and nums[n] are treated as negative infinity',
    ],
    starterCode: `public class Solution
{
    public static int FindPeakElement(int[] nums)
    {
        int left = 0;
        int right = nums.Length - 1;

        // TODO: Use binary search to find a peak element

        return -1;
    }
}`,
    solutionCode: `public class Solution
{
    public static int FindPeakElement(int[] nums)
    {
        int left = 0;
        int right = nums.Length - 1;

        while (left < right)
        {
            int mid = left + (right - left) / 2;

            if (nums[mid] < nums[mid + 1])
                left = mid + 1;
            else
                right = mid;
        }

        return left;
    }
}`,
    testCases: [
      { input: [1, 2, 3, 1], expected: 2, description: 'Peak at index 2' },
      { input: [1, 2, 1, 3, 5, 6, 4], expected: 5, description: 'Peak at index 5' },
      { input: [1], expected: 0, description: 'Single element is peak' },
      { input: [2, 1], expected: 0, description: 'First element is peak' },
    ],
    hints: [
      'Use while (left < right) not while (left <= right)',
      'If nums[mid] < nums[mid + 1], peak is to the right',
      'Otherwise, peak is at mid or to the left: set right = mid',
    ],
    concepts: ['binary search', 'peak finding', 'O(log n)', 'boundary conditions'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'cs-stack-operations',
    title: 'Stack Operations',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement common stack operations using C# Stack<T> to validate balanced parentheses. Stacks are LIFO data structures essential for parsing, undo systems, and DFS.',
    explanation: `A stack follows Last-In-First-Out (LIFO) ordering. C#'s Stack<T> provides Push(), Pop(), and Peek() methods. Balanced parentheses checking is the classic stack application.\n\nFor each opening bracket, push it onto the stack. For each closing bracket, check that the stack is non-empty and the top matches. At the end, the stack should be empty for balanced input.`,
    instructions: [
      'Given a string containing only (){}[], determine if the brackets are balanced',
      'Use Stack<char> to track opening brackets',
      'Each closing bracket must match the most recent opening bracket',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static bool IsBalanced(string s)
    {
        var stack = new Stack<char>();
        // TODO: Iterate through characters, push opening brackets,
        // check matching for closing brackets

        return false;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static bool IsBalanced(string s)
    {
        var stack = new Stack<char>();
        var pairs = new Dictionary<char, char>
        {
            { ')', '(' },
            { '}', '{' },
            { ']', '[' }
        };

        foreach (char c in s)
        {
            if (c == '(' || c == '{' || c == '[')
            {
                stack.Push(c);
            }
            else if (pairs.ContainsKey(c))
            {
                if (stack.Count == 0 || stack.Pop() != pairs[c])
                    return false;
            }
        }

        return stack.Count == 0;
    }
}`,
    testCases: [
      { input: '({[]})', expected: true, description: 'Nested balanced brackets' },
      { input: '()[]{} ', expected: true, description: 'Sequential balanced brackets' },
      { input: '(]', expected: false, description: 'Mismatched brackets' },
      { input: '([)]', expected: false, description: 'Incorrectly nested' },
      { input: '', expected: true, description: 'Empty string' },
    ],
    hints: [
      'Use a Dictionary to map closing brackets to opening brackets',
      'Push opening brackets onto the stack',
      'For closing brackets, check stack.Count > 0 and stack.Pop() matches',
    ],
    concepts: ['Stack<T>', 'Push()', 'Pop()', 'balanced parentheses', 'LIFO'],
  },
  {
    id: 'cs-queue-operations',
    title: 'Queue Operations',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Use C# Queue<T> to implement a task scheduler that processes tasks in FIFO order. Queues are fundamental to BFS, task scheduling, and buffering.',
    explanation: `A queue follows First-In-First-Out (FIFO) ordering. C#'s Queue<T> provides Enqueue() to add and Dequeue() to remove elements. The queue is ideal for processing items in the order they arrive.\n\nThis exercise simulates a simple round-robin scheduler: process each task for one unit of time, and if it has remaining work, re-enqueue it.`,
    instructions: [
      'Given an array of task durations, simulate round-robin processing',
      'Each round, dequeue a task, decrement its duration by 1',
      'If duration > 0 after decrement, re-enqueue it',
      'Return the order in which tasks complete (by original index)',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> RoundRobin(int[] tasks)
    {
        var completionOrder = new List<int>();
        var queue = new Queue<(int index, int remaining)>();

        // TODO: Enqueue all tasks, then process round-robin

        return completionOrder;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> RoundRobin(int[] tasks)
    {
        var completionOrder = new List<int>();
        var queue = new Queue<(int index, int remaining)>();

        for (int i = 0; i < tasks.Length; i++)
        {
            queue.Enqueue((i, tasks[i]));
        }

        while (queue.Count > 0)
        {
            var (index, remaining) = queue.Dequeue();
            remaining--;

            if (remaining <= 0)
                completionOrder.Add(index);
            else
                queue.Enqueue((index, remaining));
        }

        return completionOrder;
    }
}`,
    testCases: [
      { input: [3, 1, 2], expected: [1, 2, 0], description: 'Task 1 finishes first' },
      { input: [1, 1, 1], expected: [0, 1, 2], description: 'All equal duration' },
      { input: [2, 1], expected: [1, 0], description: 'Two tasks' },
      { input: [1], expected: [0], description: 'Single task' },
    ],
    hints: [
      'Store (index, remaining) tuples in the queue',
      'Use queue.Enqueue() and queue.Dequeue()',
      'Decrement remaining; if 0, add index to completionOrder',
    ],
    concepts: ['Queue<T>', 'Enqueue()', 'Dequeue()', 'FIFO', 'round-robin', 'tuples'],
  },
  {
    id: 'cs-min-stack',
    title: 'Min Stack',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Design a stack that supports Push, Pop, Top, and GetMin in O(1) time. This classic data structure interview question tests your ability to maintain auxiliary state.',
    explanation: `A Min Stack maintains an auxiliary stack that tracks the current minimum at each level. When pushing, also push the new minimum (min of current value and previous minimum). When popping, pop from both stacks.\n\nThis ensures GetMin() always returns the top of the auxiliary stack in O(1) time, regardless of how many elements have been pushed or popped.`,
    instructions: [
      'Implement a MinStack class with Push(int val), Pop(), Top(), and GetMin()',
      'All operations must run in O(1) time',
      'Use an auxiliary stack to track minimums',
    ],
    starterCode: `using System;
using System.Collections.Generic;

public class MinStack
{
    private Stack<int> _stack;
    private Stack<int> _minStack;

    public MinStack()
    {
        _stack = new Stack<int>();
        _minStack = new Stack<int>();
    }

    public void Push(int val)
    {
        // TODO: Push val and update min stack
    }

    public void Pop()
    {
        // TODO: Pop from both stacks
    }

    public int Top()
    {
        // TODO: Return top element
        return 0;
    }

    public int GetMin()
    {
        // TODO: Return current minimum
        return 0;
    }
}`,
    solutionCode: `using System;
using System.Collections.Generic;

public class MinStack
{
    private Stack<int> _stack;
    private Stack<int> _minStack;

    public MinStack()
    {
        _stack = new Stack<int>();
        _minStack = new Stack<int>();
    }

    public void Push(int val)
    {
        _stack.Push(val);
        int currentMin = _minStack.Count == 0 ? val : Math.Min(val, _minStack.Peek());
        _minStack.Push(currentMin);
    }

    public void Pop()
    {
        _stack.Pop();
        _minStack.Pop();
    }

    public int Top()
    {
        return _stack.Peek();
    }

    public int GetMin()
    {
        return _minStack.Peek();
    }
}`,
    testCases: [
      {
        input: { operations: ['push,-2', 'push,0', 'push,-3', 'getMin', 'pop', 'top', 'getMin'] },
        expected: [null, null, null, -3, null, 0, -2],
        description: 'Standard min stack operations',
      },
      {
        input: { operations: ['push,1', 'push,2', 'getMin', 'pop', 'getMin'] },
        expected: [null, null, 1, null, 1],
        description: 'Min stays after popping non-min',
      },
    ],
    hints: [
      'Keep a parallel stack tracking the minimum at each depth',
      'When pushing, push Math.Min(val, currentMin) to the min stack',
      'When popping, pop from both stacks',
      'Peek() returns the top without removing it',
    ],
    concepts: ['Stack<T>', 'auxiliary data structure', 'O(1) operations', 'Math.Min', 'Peek()'],
  },
  {
    id: 'cs-dictionary-operations',
    title: 'Dictionary Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Use Dictionary<TKey, TValue> to count word frequencies in a string. Dictionaries provide O(1) average-case lookup and are the C# equivalent of hash maps.',
    explanation: `Dictionary<TKey, TValue> is C#'s hash map implementation offering O(1) average-case Add, Remove, and lookup. For word frequency counting, iterate through words and increment their count.\n\nUse ContainsKey() to check existence or TryGetValue() for a more efficient single-operation check. The dictionary pattern is fundamental to grouping, counting, caching, and indexing.`,
    instructions: [
      'Given a string of space-separated words, return a Dictionary<string, int> of word counts',
      'Convert to lowercase before counting',
      'Use Dictionary<string, int> to store counts',
    ],
    starterCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public static Dictionary<string, int> WordCount(string text)
    {
        var counts = new Dictionary<string, int>();
        // TODO: Split text into words, count each word

        return counts;
    }
}`,
    solutionCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public static Dictionary<string, int> WordCount(string text)
    {
        var counts = new Dictionary<string, int>();

        if (string.IsNullOrWhiteSpace(text))
            return counts;

        string[] words = text.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);

        foreach (string word in words)
        {
            if (counts.ContainsKey(word))
                counts[word]++;
            else
                counts[word] = 1;
        }

        return counts;
    }
}`,
    testCases: [
      {
        input: 'the cat and the dog',
        expected: { the: 2, cat: 1, and: 1, dog: 1 },
        description: 'Basic word count',
      },
      {
        input: 'hello Hello HELLO',
        expected: { hello: 3 },
        description: 'Case insensitive',
      },
      {
        input: 'one',
        expected: { one: 1 },
        description: 'Single word',
      },
      {
        input: '',
        expected: {},
        description: 'Empty string',
      },
    ],
    hints: [
      'Use text.ToLower().Split() to get lowercase words',
      'Use ContainsKey() to check if word already exists',
      'Increment count or set to 1 for new words',
    ],
    concepts: ['Dictionary<TKey,TValue>', 'ContainsKey()', 'Split()', 'word frequency'],
  },
  {
    id: 'cs-linked-list-reverse',
    title: 'Reverse a Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Reverse a singly linked list by reassigning node pointers. This classic interview question tests pointer manipulation and in-place data structure modification.',
    explanation: `Reversing a linked list involves iterating through nodes and reversing the direction of each Next pointer. You maintain three pointers: previous, current, and next.\n\nAt each step: save next, point current.Next to previous, advance previous to current, advance current to next. This runs in O(n) time with O(1) extra space.`,
    instructions: [
      'Given the head of a singly linked list (node with Value and Next), reverse it in-place',
      'Return the new head (originally the last node)',
      'Use three pointers: prev, current, next',
    ],
    starterCode: `public class ListNode
{
    public int Value;
    public ListNode Next;
    public ListNode(int val) { Value = val; Next = null; }
}

public class Solution
{
    public static ListNode ReverseList(ListNode head)
    {
        // TODO: Reverse the linked list using three pointers
        // prev, current, next

        return null;
    }
}`,
    solutionCode: `public class ListNode
{
    public int Value;
    public ListNode Next;
    public ListNode(int val) { Value = val; Next = null; }
}

public class Solution
{
    public static ListNode ReverseList(ListNode head)
    {
        ListNode prev = null;
        ListNode current = head;

        while (current != null)
        {
            ListNode next = current.Next;
            current.Next = prev;
            prev = current;
            current = next;
        }

        return prev;
    }
}`,
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expected: [5, 4, 3, 2, 1],
        description: 'Reverse five-node list',
      },
      {
        input: [1, 2],
        expected: [2, 1],
        description: 'Reverse two-node list',
      },
      {
        input: [1],
        expected: [1],
        description: 'Single node',
      },
    ],
    hints: [
      'Initialize prev = null and current = head',
      'In each iteration: save next = current.Next',
      'Reverse: current.Next = prev',
      'Advance: prev = current, current = next',
    ],
    concepts: ['linked list', 'pointer manipulation', 'in-place reversal', 'O(1) space'],
  },
  {
    id: 'cs-priority-queue',
    title: 'Priority Queue Operations',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Use C# PriorityQueue<TElement, TPriority> to find the k largest elements in an array. Priority queues are essential for scheduling, Dijkstra's algorithm, and top-k problems.",
    explanation: `C# .NET 6+ provides PriorityQueue<TElement, TPriority> which is a min-heap by default. To find the k largest elements, maintain a min-heap of size k: for each element, if the heap has fewer than k elements, enqueue it; otherwise, if the element is larger than the minimum, dequeue the minimum and enqueue the new element.\n\nAfter processing all elements, the heap contains the k largest. This runs in O(n log k) time, which is better than sorting O(n log n) when k is small.`,
    instructions: [
      'Given an array of integers and k, return the k largest elements in descending order',
      'Use PriorityQueue<int, int> as a min-heap of size k',
      'Final result should be sorted in descending order',
    ],
    starterCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static List<int> KLargest(int[] nums, int k)
    {
        var pq = new PriorityQueue<int, int>();
        // TODO: Use min-heap of size k to find k largest elements

        // TODO: Extract elements and sort descending
        return new List<int>();
    }
}`,
    solutionCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static List<int> KLargest(int[] nums, int k)
    {
        var pq = new PriorityQueue<int, int>();

        foreach (int num in nums)
        {
            pq.Enqueue(num, num);
            if (pq.Count > k)
            {
                pq.Dequeue();
            }
        }

        var result = new List<int>();
        while (pq.Count > 0)
        {
            result.Add(pq.Dequeue());
        }

        result.Sort((a, b) => b.CompareTo(a));
        return result;
    }
}`,
    testCases: [
      { input: [[3, 1, 5, 12, 2, 11], 3], expected: [12, 11, 5], description: 'Top 3 largest' },
      { input: [[7, 10, 4, 3, 20, 15], 2], expected: [20, 15], description: 'Top 2 largest' },
      { input: [[1, 2, 3], 1], expected: [3], description: 'Top 1' },
      { input: [[5, 5, 5], 2], expected: [5, 5], description: 'Duplicate values' },
    ],
    hints: [
      'PriorityQueue<int, int> is a min-heap by default',
      'Enqueue with pq.Enqueue(element, priority)',
      'If pq.Count > k, dequeue the smallest',
      'Sort the result descending at the end',
    ],
    concepts: ['PriorityQueue<T,T>', 'min-heap', 'top-k pattern', 'O(n log k)'],
  },

  // ========== TRAVERSAL ==========
  {
    id: 'cs-dfs-tree',
    title: 'Depth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement DFS to traverse a binary tree in pre-order (root, left, right). DFS is fundamental to tree algorithms including serialization, path finding, and expression evaluation.',
    explanation: `Pre-order DFS visits nodes in the order: root, left subtree, right subtree. This is implemented naturally with recursion: process the current node, then recurse on left and right children.\n\nPre-order traversal produces a sequence that can reconstruct the tree (given the structure). It runs in O(n) time visiting each node exactly once.`,
    instructions: [
      'Given a binary tree node (with Value, Left, Right), return values in pre-order',
      'Pre-order: visit root, then left subtree, then right subtree',
      'Use recursion',
    ],
    starterCode: `using System.Collections.Generic;

public class TreeNode
{
    public int Value;
    public TreeNode Left;
    public TreeNode Right;
    public TreeNode(int val) { Value = val; }
}

public class Solution
{
    public static List<int> PreorderDFS(TreeNode root)
    {
        var result = new List<int>();
        // TODO: Implement recursive DFS helper
        // Traverse(root, result);

        return result;
    }

    private static void Traverse(TreeNode node, List<int> result)
    {
        // TODO: Visit node, then left, then right
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class TreeNode
{
    public int Value;
    public TreeNode Left;
    public TreeNode Right;
    public TreeNode(int val) { Value = val; }
}

public class Solution
{
    public static List<int> PreorderDFS(TreeNode root)
    {
        var result = new List<int>();
        Traverse(root, result);
        return result;
    }

    private static void Traverse(TreeNode node, List<int> result)
    {
        if (node == null) return;
        result.Add(node.Value);
        Traverse(node.Left, result);
        Traverse(node.Right, result);
    }
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
        description: 'Left-heavy tree',
      },
      {
        input: null,
        expected: [],
        description: 'Empty tree',
      },
    ],
    hints: [
      'Base case: if node is null, return immediately',
      'Add node.Value to result first (pre-order)',
      'Then recurse on Left, then Right',
    ],
    concepts: ['DFS', 'pre-order traversal', 'recursion', 'binary tree'],
  },
  {
    id: 'cs-bfs-tree',
    title: 'Breadth-First Search (Tree)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement BFS to traverse a binary tree level by level using a Queue. BFS is essential for shortest-path problems and level-order processing.',
    explanation: `BFS processes nodes level by level using a queue. Start by enqueueing the root. While the queue is not empty, dequeue a node, process it, and enqueue its children.\n\nThis visits nodes in level order (top to bottom, left to right). In C#, use Queue<TreeNode> for efficient FIFO operations. BFS runs in O(n) time.`,
    instructions: [
      'Given a binary tree root, return values in level-order (BFS order)',
      'Use Queue<TreeNode> for the BFS frontier',
      'Process left child before right child',
    ],
    starterCode: `using System.Collections.Generic;

public class TreeNode
{
    public int Value;
    public TreeNode Left;
    public TreeNode Right;
    public TreeNode(int val) { Value = val; }
}

public class Solution
{
    public static List<int> BFS(TreeNode root)
    {
        if (root == null) return new List<int>();

        var result = new List<int>();
        var queue = new Queue<TreeNode>();
        // TODO: Implement BFS with Queue

        return result;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class TreeNode
{
    public int Value;
    public TreeNode Left;
    public TreeNode Right;
    public TreeNode(int val) { Value = val; }
}

public class Solution
{
    public static List<int> BFS(TreeNode root)
    {
        if (root == null) return new List<int>();

        var result = new List<int>();
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            var node = queue.Dequeue();
            result.Add(node.Value);

            if (node.Left != null) queue.Enqueue(node.Left);
            if (node.Right != null) queue.Enqueue(node.Right);
        }

        return result;
    }
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
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3, 4, 5],
        description: 'Multi-level tree',
      },
    ],
    hints: [
      'Start by enqueueing the root',
      'Loop while queue.Count > 0',
      'Dequeue, add value, enqueue non-null children',
    ],
    concepts: ['BFS', 'Queue<T>', 'level-order traversal', 'binary tree'],
  },
  {
    id: 'cs-dfs-inorder',
    title: 'In-Order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement in-order traversal of a binary search tree (BST) to visit nodes in sorted order. In-order traversal of a BST produces elements in ascending order.',
    explanation: `In-order traversal visits: left subtree, root, right subtree. For a BST, this produces values in sorted (ascending) order because all left descendants are smaller and all right descendants are larger.\n\nThis property makes in-order traversal essential for BST validation, finding the kth smallest element, and converting a BST to a sorted array.`,
    instructions: [
      'Given a BST root, return values in in-order (left, root, right)',
      'The result should be in ascending sorted order for a valid BST',
      'Use recursion',
    ],
    starterCode: `using System.Collections.Generic;

public class TreeNode
{
    public int Value;
    public TreeNode Left;
    public TreeNode Right;
    public TreeNode(int val) { Value = val; }
}

public class Solution
{
    public static List<int> InorderTraversal(TreeNode root)
    {
        var result = new List<int>();
        // TODO: Implement recursive in-order traversal

        return result;
    }

    private static void Inorder(TreeNode node, List<int> result)
    {
        // TODO: Left, root, right
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class TreeNode
{
    public int Value;
    public TreeNode Left;
    public TreeNode Right;
    public TreeNode(int val) { Value = val; }
}

public class Solution
{
    public static List<int> InorderTraversal(TreeNode root)
    {
        var result = new List<int>();
        Inorder(root, result);
        return result;
    }

    private static void Inorder(TreeNode node, List<int> result)
    {
        if (node == null) return;
        Inorder(node.Left, result);
        result.Add(node.Value);
        Inorder(node.Right, result);
    }
}`,
    testCases: [
      {
        input: {
          value: 4,
          left: {
            value: 2,
            left: { value: 1, left: null, right: null },
            right: { value: 3, left: null, right: null },
          },
          right: {
            value: 6,
            left: { value: 5, left: null, right: null },
            right: { value: 7, left: null, right: null },
          },
        },
        expected: [1, 2, 3, 4, 5, 6, 7],
        description: 'BST produces sorted order',
      },
      {
        input: { value: 1, left: null, right: { value: 2, left: null, right: null } },
        expected: [1, 2],
        description: 'Right-only tree',
      },
    ],
    hints: [
      'Base case: if node is null, return',
      'Recurse on left child first',
      'Add current node value',
      'Then recurse on right child',
    ],
    concepts: ['in-order traversal', 'BST', 'recursion', 'sorted output'],
  },
  {
    id: 'cs-graph-bfs',
    title: 'Graph BFS (Adjacency List)',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Implement BFS on a graph represented as an adjacency list. Graph BFS finds shortest paths in unweighted graphs and is the basis for many graph algorithms.',
    explanation: `Graph BFS extends tree BFS by adding a visited set to handle cycles. The graph is represented as a Dictionary<int, List<int>> (adjacency list). Starting from a source node, enqueue it, mark it visited, and process neighbors level by level.\n\nBFS on a graph visits all reachable nodes in O(V + E) time, where V is vertices and E is edges. It naturally finds the shortest path in unweighted graphs.`,
    instructions: [
      'Given an adjacency list and a start node, return nodes in BFS order',
      'Use a HashSet<int> to track visited nodes and avoid cycles',
      'Use Queue<int> for the BFS frontier',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> GraphBFS(Dictionary<int, List<int>> graph, int start)
    {
        var result = new List<int>();
        var visited = new HashSet<int>();
        var queue = new Queue<int>();

        // TODO: Implement BFS with visited set to handle cycles

        return result;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> GraphBFS(Dictionary<int, List<int>> graph, int start)
    {
        var result = new List<int>();
        var visited = new HashSet<int>();
        var queue = new Queue<int>();

        visited.Add(start);
        queue.Enqueue(start);

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            result.Add(node);

            if (graph.ContainsKey(node))
            {
                foreach (int neighbor in graph[node])
                {
                    if (!visited.Contains(neighbor))
                    {
                        visited.Add(neighbor);
                        queue.Enqueue(neighbor);
                    }
                }
            }
        }

        return result;
    }
}`,
    testCases: [
      {
        input: [{ 0: [1, 2], 1: [3], 2: [3], 3: [] }, 0],
        expected: [0, 1, 2, 3],
        description: 'Diamond graph from node 0',
      },
      {
        input: [{ 0: [1], 1: [2], 2: [0] }, 0],
        expected: [0, 1, 2],
        description: 'Cyclic graph',
      },
      {
        input: [{ 0: [] }, 0],
        expected: [0],
        description: 'Single node',
      },
    ],
    hints: [
      'Mark start as visited and enqueue it before the loop',
      'Check visited before enqueuing neighbors to prevent cycles',
      'Use graph.ContainsKey() in case a node has no outgoing edges',
    ],
    concepts: ['BFS', 'graph traversal', 'adjacency list', 'HashSet<T>', 'visited set'],
  },
  {
    id: 'cs-level-order-traversal',
    title: 'Level Order Traversal (Grouped)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Return tree values grouped by level. This variation of BFS tracks which nodes belong to each level, useful for tree visualization and level-specific operations.',
    explanation: `Level-order traversal groups nodes by their depth. The key difference from standard BFS is processing all nodes at the current level before moving to the next. You do this by capturing queue.Count at the start of each level and processing exactly that many nodes.\n\nEach group of nodes forms one level of the tree. This is used in tree printing, zigzag traversal, and finding the widest level.`,
    instructions: [
      'Given a binary tree root, return values grouped by level as List<List<int>>',
      'Each inner list contains values at one level',
      'Process left to right within each level',
    ],
    starterCode: `using System.Collections.Generic;

public class TreeNode
{
    public int Value;
    public TreeNode Left;
    public TreeNode Right;
    public TreeNode(int val) { Value = val; }
}

public class Solution
{
    public static List<List<int>> LevelOrder(TreeNode root)
    {
        var result = new List<List<int>>();
        if (root == null) return result;

        var queue = new Queue<TreeNode>();
        // TODO: Process level by level using queue.Count

        return result;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class TreeNode
{
    public int Value;
    public TreeNode Left;
    public TreeNode Right;
    public TreeNode(int val) { Value = val; }
}

public class Solution
{
    public static List<List<int>> LevelOrder(TreeNode root)
    {
        var result = new List<List<int>>();
        if (root == null) return result;

        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            var level = new List<int>();

            for (int i = 0; i < levelSize; i++)
            {
                var node = queue.Dequeue();
                level.Add(node.Value);

                if (node.Left != null) queue.Enqueue(node.Left);
                if (node.Right != null) queue.Enqueue(node.Right);
            }

            result.Add(level);
        }

        return result;
    }
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
      'Capture levelSize = queue.Count at the start of each level',
      'Process exactly levelSize nodes per level',
      'Add the level list to result after processing all nodes at that level',
    ],
    concepts: ['level-order traversal', 'BFS', 'grouped output', 'Queue<T>'],
  },

  // ========== COMBINATORICS ==========
  {
    id: 'cs-generate-subsets',
    title: 'Generate All Subsets',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all subsets (power set) of a given array using backtracking. Subset generation is fundamental to combinatorial search and constraint satisfaction problems.',
    explanation: `The power set of a set with n elements contains 2^n subsets. Using backtracking, at each index you make a binary choice: include or exclude the current element, then recurse on the remaining elements.\n\nAlternatively, you can iterate through existing subsets and create new ones by appending the current element. Both approaches produce all 2^n subsets in O(n * 2^n) time.`,
    instructions: [
      'Given an array of distinct integers, return all possible subsets (the power set)',
      'Use backtracking: for each element, choose to include or exclude it',
      'Include the empty set',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<List<int>> Subsets(int[] nums)
    {
        var result = new List<List<int>>();
        // TODO: Implement backtracking to generate all subsets

        return result;
    }

    private static void Backtrack(int[] nums, int index, List<int> current, List<List<int>> result)
    {
        // TODO: Add current subset to result, then try including each remaining element
    }
}`,
    solutionCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static List<List<int>> Subsets(int[] nums)
    {
        var result = new List<List<int>>();
        Backtrack(nums, 0, new List<int>(), result);
        return result;
    }

    private static void Backtrack(int[] nums, int index, List<int> current, List<List<int>> result)
    {
        result.Add(current.ToList());

        for (int i = index; i < nums.Length; i++)
        {
            current.Add(nums[i]);
            Backtrack(nums, i + 1, current, result);
            current.RemoveAt(current.Count - 1);
        }
    }
}`,
    testCases: [
      {
        input: [1, 2, 3],
        expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        description: 'Three elements: 8 subsets',
      },
      {
        input: [0],
        expected: [[], [0]],
        description: 'Single element',
      },
    ],
    hints: [
      'Add a copy of current to result at each recursive call',
      'Loop from index to end, adding each element and recursing',
      'Remove the last element after recursing (backtrack)',
      'Use current.ToList() to create a copy',
    ],
    concepts: ['backtracking', 'power set', 'subsets', 'combinatorics', 'ToList()'],
  },
  {
    id: 'cs-generate-combinations',
    title: 'Generate Combinations',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Generate all combinations of k elements from a set of n elements. Combinations are selections where order does not matter, used in lottery math, team formation, and feature selection.',
    explanation: `Combinations of n choose k are subsets of exactly size k. Using backtracking, start from each index, add the element, recurse with k-1, then backtrack.\n\nThe key difference from subset generation is the base case: add to results only when the current combination has exactly k elements. Pruning (stopping when remaining elements are fewer than needed) improves efficiency.`,
    instructions: [
      'Given n and k, return all combinations of k numbers from 1 to n',
      'Use backtracking with a size constraint',
      'Combinations are unordered: [1,2] and [2,1] are the same',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<List<int>> Combine(int n, int k)
    {
        var result = new List<List<int>>();
        // TODO: Implement backtracking to generate combinations of size k

        return result;
    }

    private static void Backtrack(int start, int n, int k, List<int> current, List<List<int>> result)
    {
        // TODO: When current.Count == k, add to result
        // Otherwise, try adding each number from start to n
    }
}`,
    solutionCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static List<List<int>> Combine(int n, int k)
    {
        var result = new List<List<int>>();
        Backtrack(1, n, k, new List<int>(), result);
        return result;
    }

    private static void Backtrack(int start, int n, int k, List<int> current, List<List<int>> result)
    {
        if (current.Count == k)
        {
            result.Add(current.ToList());
            return;
        }

        for (int i = start; i <= n; i++)
        {
            current.Add(i);
            Backtrack(i + 1, n, k, current, result);
            current.RemoveAt(current.Count - 1);
        }
    }
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
        description: '4 choose 2 = 6 combinations',
      },
      {
        input: [3, 3],
        expected: [[1, 2, 3]],
        description: '3 choose 3 = 1 combination',
      },
      {
        input: [3, 1],
        expected: [[1], [2], [3]],
        description: '3 choose 1 = 3 combinations',
      },
    ],
    hints: [
      'Base case: when current.Count == k, add a copy to result',
      'Loop from start to n, adding each number',
      'Recurse with i + 1 to avoid duplicates',
      'Backtrack by removing the last element',
    ],
    concepts: ['combinations', 'backtracking', 'n choose k', 'pruning'],
  },
  {
    id: 'cs-cartesian-product',
    title: 'Cartesian Product',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Compute the Cartesian product of multiple lists: all possible combinations taking one element from each list. Used in configuration generation, test case generation, and combinatorial optimization.',
    explanation: `The Cartesian product of sets A x B x C produces all tuples (a, b, c) where a is from A, b from B, and c from C. The total number of results is |A| * |B| * |C|.\n\nThis can be computed iteratively: start with a list containing one empty list, then for each input list, extend every existing combination by appending each element from the current list.`,
    instructions: [
      'Given a list of lists, return their Cartesian product',
      'Each result element is a list containing one element from each input list',
      'Use iterative expansion or recursion',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<List<int>> CartesianProduct(List<List<int>> lists)
    {
        // TODO: Compute Cartesian product iteratively
        // Start with [[]], then extend each partial combination with elements from each list

        return new List<List<int>>();
    }
}`,
    solutionCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static List<List<int>> CartesianProduct(List<List<int>> lists)
    {
        var result = new List<List<int>> { new List<int>() };

        foreach (var list in lists)
        {
            var newResult = new List<List<int>>();
            foreach (var existing in result)
            {
                foreach (var item in list)
                {
                    var combination = existing.ToList();
                    combination.Add(item);
                    newResult.Add(combination);
                }
            }
            result = newResult;
        }

        return result;
    }
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
        description: 'Two lists of two elements',
      },
      {
        input: [[1], [2], [3]],
        expected: [[1, 2, 3]],
        description: 'Three single-element lists',
      },
      {
        input: [[1, 2], [3, 4], [5]],
        expected: [
          [1, 3, 5],
          [1, 4, 5],
          [2, 3, 5],
          [2, 4, 5],
        ],
        description: 'Three lists',
      },
    ],
    hints: [
      'Start with result = [[]] (one empty combination)',
      'For each input list, extend each existing combination with each element',
      'Use ToList() to copy existing combinations before extending',
    ],
    concepts: ['Cartesian product', 'nested iteration', 'combinatorics', 'ToList()'],
  },

  // ========== MEMOIZATION ==========
  {
    id: 'cs-memoize-fibonacci',
    title: 'Memoized Fibonacci',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Optimize recursive Fibonacci using memoization with a Dictionary<int, long>. Memoization caches computed results to avoid redundant calculations, reducing time from O(2^n) to O(n).',
    explanation: `Naive recursive Fibonacci has exponential time complexity because it recomputes the same values many times. Memoization stores results in a dictionary so each value is computed only once.\n\nWith a Dictionary<int, long>, before recursing, check if the result is already cached. If so, return it immediately. Otherwise, compute it, store it, and return. This reduces time complexity from O(2^n) to O(n).`,
    instructions: [
      'Implement Fibonacci with memoization using Dictionary<int, long>',
      'Before computing, check if the value is already in the cache',
      'Store new results in the cache before returning',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static long MemoFibonacci(int n)
    {
        var memo = new Dictionary<int, long>();
        return Fib(n, memo);
    }

    private static long Fib(int n, Dictionary<int, long> memo)
    {
        // TODO: Check cache, compute with recursion, store in cache

        return 0;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static long MemoFibonacci(int n)
    {
        var memo = new Dictionary<int, long>();
        return Fib(n, memo);
    }

    private static long Fib(int n, Dictionary<int, long> memo)
    {
        if (n <= 0) return 0;
        if (n == 1) return 1;

        if (memo.ContainsKey(n)) return memo[n];

        long result = Fib(n - 1, memo) + Fib(n - 2, memo);
        memo[n] = result;
        return result;
    }
}`,
    testCases: [
      { input: 0, expected: 0, description: 'F(0) = 0' },
      { input: 1, expected: 1, description: 'F(1) = 1' },
      { input: 10, expected: 55, description: 'F(10) = 55' },
      { input: 40, expected: 102334155, description: 'F(40) - fast with memoization' },
      { input: 50, expected: 12586269025, description: 'F(50) - impossible without memoization' },
    ],
    hints: [
      'Check memo.ContainsKey(n) before recursing',
      'Store result with memo[n] = result before returning',
      'Use long to handle large Fibonacci values',
    ],
    concepts: ['memoization', 'Dictionary<int,long>', 'caching', 'O(n) optimization'],
  },
  {
    id: 'cs-climbing-stairs',
    title: 'Climbing Stairs (DP)',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Count the number of distinct ways to climb n stairs taking 1 or 2 steps at a time. This classic dynamic programming problem demonstrates overlapping subproblems and optimal substructure.',
    explanation: `To reach step n, you can arrive from step n-1 (taking 1 step) or step n-2 (taking 2 steps). So ways(n) = ways(n-1) + ways(n-2), which is the Fibonacci recurrence.\n\nYou can solve this bottom-up with an array or top-down with memoization. The bottom-up approach builds from base cases: ways(1) = 1, ways(2) = 2, and iterates up to n. This runs in O(n) time and O(1) space if optimized with two variables.`,
    instructions: [
      'Given n stairs, return the number of distinct ways to reach the top',
      'You can take 1 or 2 steps at a time',
      'Use dynamic programming (bottom-up or memoized recursion)',
    ],
    starterCode: `public class Solution
{
    public static int ClimbStairs(int n)
    {
        // TODO: Use DP to count ways to climb n stairs
        // ways(n) = ways(n-1) + ways(n-2)

        return 0;
    }
}`,
    solutionCode: `public class Solution
{
    public static int ClimbStairs(int n)
    {
        if (n <= 1) return 1;

        int prev2 = 1;
        int prev1 = 1;

        for (int i = 2; i <= n; i++)
        {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}`,
    testCases: [
      { input: 1, expected: 1, description: '1 stair: 1 way' },
      { input: 2, expected: 2, description: '2 stairs: [1+1, 2]' },
      { input: 3, expected: 3, description: '3 stairs: [1+1+1, 1+2, 2+1]' },
      { input: 5, expected: 8, description: '5 stairs: 8 ways' },
      { input: 10, expected: 89, description: '10 stairs' },
    ],
    hints: [
      'Base cases: ways(1) = 1, ways(2) = 2',
      'Recurrence: ways(n) = ways(n-1) + ways(n-2)',
      'Optimize space by keeping only the last two values',
    ],
    concepts: ['dynamic programming', 'Fibonacci variant', 'bottom-up DP', 'O(1) space'],
  },
  {
    id: 'cs-coin-change',
    title: 'Coin Change (DP)',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Find the minimum number of coins needed to make a given amount. This classic DP problem demonstrates how to build solutions for larger amounts from smaller subproblems.',
    explanation: `For each amount from 1 to target, the minimum coins needed is: min(dp[amount - coin] + 1) for each coin denomination where coin <= amount. This is a bottom-up DP approach.\n\nInitialize dp[0] = 0 (zero coins for zero amount) and dp[i] = amount + 1 (impossible sentinel) for all other values. After filling the table, dp[amount] gives the answer, or -1 if it remains at the sentinel value.`,
    instructions: [
      'Given coin denominations and a target amount, return the minimum number of coins needed',
      'If the amount cannot be made, return -1',
      'Use bottom-up dynamic programming with a dp array',
    ],
    starterCode: `using System;

public class Solution
{
    public static int CoinChange(int[] coins, int amount)
    {
        // TODO: Create dp array and fill bottom-up
        // dp[i] = minimum coins to make amount i

        return -1;
    }
}`,
    solutionCode: `using System;

public class Solution
{
    public static int CoinChange(int[] coins, int amount)
    {
        int[] dp = new int[amount + 1];
        Array.Fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++)
        {
            foreach (int coin in coins)
            {
                if (coin <= i)
                {
                    dp[i] = Math.Min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    testCases: [
      { input: [[1, 5, 10, 25], 30], expected: 2, description: '25 + 5 = 30' },
      { input: [[1, 2, 5], 11], expected: 3, description: '5 + 5 + 1 = 11' },
      { input: [[2], 3], expected: -1, description: 'Cannot make 3 with only 2s' },
      { input: [[1], 0], expected: 0, description: 'Zero amount needs zero coins' },
      { input: [[1, 2, 5], 5], expected: 1, description: 'Single coin suffices' },
    ],
    hints: [
      'Initialize dp array with amount + 1 (impossible value)',
      'Set dp[0] = 0 as base case',
      'For each amount, try each coin and take the minimum',
      'Check dp[amount] > amount to detect impossible cases',
    ],
    concepts: ['dynamic programming', 'coin change', 'bottom-up DP', 'Array.Fill()', 'Math.Min'],
  },

  // ========== UTILITIES ==========
  {
    id: 'cs-list-chunking',
    title: 'List Chunking',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Split a list into smaller chunks of a specified size. Chunking is a utility pattern used in pagination, batch processing, and parallel task distribution.',
    explanation: `Chunking divides a list into groups of a given size. The last chunk may be smaller if the list length is not evenly divisible. In C# you can use GetRange() or LINQ's Skip/Take.\n\nThe iterative approach advances an index by chunkSize each step, taking a slice of elements from the current position. This runs in O(n) time.`,
    instructions: [
      'Given a List<int> and a chunk size, split the list into chunks',
      'Each chunk should have at most chunkSize elements',
      'The last chunk may be smaller',
    ],
    starterCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public static List<List<int>> ChunkList(List<int> list, int chunkSize)
    {
        var result = new List<List<int>>();
        // TODO: Split list into chunks of chunkSize

        return result;
    }
}`,
    solutionCode: `using System;
using System.Collections.Generic;

public class Solution
{
    public static List<List<int>> ChunkList(List<int> list, int chunkSize)
    {
        var result = new List<List<int>>();

        for (int i = 0; i < list.Count; i += chunkSize)
        {
            int size = Math.Min(chunkSize, list.Count - i);
            result.Add(list.GetRange(i, size));
        }

        return result;
    }
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
        description: 'Chunk size larger than list',
      },
      {
        input: [[], 3],
        expected: [],
        description: 'Empty list',
      },
    ],
    hints: [
      'Use a for loop with step of chunkSize',
      'Use Math.Min(chunkSize, list.Count - i) for the last chunk',
      'list.GetRange(start, count) extracts a sublist',
    ],
    concepts: ['chunking', 'GetRange()', 'Math.Min', 'batch processing'],
  },
  {
    id: 'cs-merge-sorted',
    title: 'Merge Two Sorted Arrays',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Merge two sorted arrays into one sorted array using the two-pointer technique. This is the merge step of merge sort and a fundamental building block in sorting and data processing.',
    explanation: `Merging two sorted arrays uses two pointers, one per array. Compare the elements at both pointers, add the smaller one to the result, and advance that pointer. After one array is exhausted, append the remainder of the other.\n\nThis runs in O(n + m) time where n and m are the array lengths. The merge operation is the key step in merge sort and is used in external sorting and merging multiple data streams.`,
    instructions: [
      'Given two sorted int arrays, merge them into a single sorted array',
      'Use the two-pointer technique',
      'Do not use built-in sort methods',
    ],
    starterCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> MergeSorted(int[] arr1, int[] arr2)
    {
        var result = new List<int>();
        int i = 0, j = 0;

        // TODO: Use two pointers to merge both sorted arrays

        return result;
    }
}`,
    solutionCode: `using System.Collections.Generic;

public class Solution
{
    public static List<int> MergeSorted(int[] arr1, int[] arr2)
    {
        var result = new List<int>();
        int i = 0, j = 0;

        while (i < arr1.Length && j < arr2.Length)
        {
            if (arr1[i] <= arr2[j])
            {
                result.Add(arr1[i]);
                i++;
            }
            else
            {
                result.Add(arr2[j]);
                j++;
            }
        }

        while (i < arr1.Length)
        {
            result.Add(arr1[i]);
            i++;
        }

        while (j < arr2.Length)
        {
            result.Add(arr2[j]);
            j++;
        }

        return result;
    }
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
        description: 'Non-overlapping',
      },
      {
        input: [[], [1, 2, 3]],
        expected: [1, 2, 3],
        description: 'First array empty',
      },
      {
        input: [
          [1, 1, 1],
          [1, 1, 1],
        ],
        expected: [1, 1, 1, 1, 1, 1],
        description: 'All duplicates',
      },
    ],
    hints: [
      'Compare arr1[i] and arr2[j], add the smaller one',
      'Advance the pointer of the array from which you took the element',
      'After the main loop, append remaining elements from whichever array is not exhausted',
    ],
    concepts: ['merge', 'two pointers', 'sorted arrays', 'O(n + m)'],
  },
  {
    id: 'cs-group-by-key',
    title: 'Group By Key (LINQ)',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Use LINQ GroupBy to group elements of a list by a key function. GroupBy is a powerful utility for categorizing, partitioning, and aggregating data.',
    explanation: `LINQ's GroupBy() groups elements that share a common key. The result is an IEnumerable<IGrouping<TKey, TElement>> which you can convert to a Dictionary.\n\nGroupBy is declarative and expressive: you specify the key selector and LINQ handles the grouping logic. This is equivalent to SQL's GROUP BY and is used extensively in data processing, reporting, and analytics.`,
    instructions: [
      'Given a list of strings, group them by their first character',
      'Return a Dictionary<char, List<string>>',
      'Use LINQ GroupBy() with a key selector',
    ],
    starterCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static Dictionary<char, List<string>> GroupByFirstChar(List<string> words)
    {
        // TODO: Use LINQ GroupBy to group words by their first character

        return new Dictionary<char, List<string>>();
    }
}`,
    solutionCode: `using System.Collections.Generic;
using System.Linq;

public class Solution
{
    public static Dictionary<char, List<string>> GroupByFirstChar(List<string> words)
    {
        return words
            .GroupBy(w => w[0])
            .ToDictionary(
                g => g.Key,
                g => g.ToList()
            );
    }
}`,
    testCases: [
      {
        input: ['apple', 'avocado', 'banana', 'blueberry', 'cherry'],
        expected: { a: ['apple', 'avocado'], b: ['banana', 'blueberry'], c: ['cherry'] },
        description: 'Group fruits by first letter',
      },
      {
        input: ['dog', 'duck', 'deer'],
        expected: { d: ['dog', 'duck', 'deer'] },
        description: 'All same first letter',
      },
      {
        input: ['x'],
        expected: { x: ['x'] },
        description: 'Single word',
      },
    ],
    hints: [
      'Use GroupBy(w => w[0]) to group by first character',
      'Use ToDictionary(g => g.Key, g => g.ToList()) to convert to Dictionary',
      'GroupBy returns IGrouping objects with Key and elements',
    ],
    concepts: ['LINQ', 'GroupBy()', 'ToDictionary()', 'lambda expressions', 'IGrouping'],
  },
];
