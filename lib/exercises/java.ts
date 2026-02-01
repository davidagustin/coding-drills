import type { Exercise } from './types';

export const javaExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'java-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array while skipping every other element using index manipulation. This pattern of stepping through indices by a custom increment is foundational for sampling, downsampling signals, and processing alternating data.',
    explanation: `Stepping through an array at a fixed stride is one of the most fundamental iteration patterns. Instead of visiting every element, you increment the loop counter by 2 (or any step size), effectively sampling every other element.\n\nIn Java, the standard for-loop gives you full control over initialization, condition, and increment. By writing i += 2 instead of i++, you visit only even-indexed elements. The time complexity is O(n/2), which simplifies to O(n).\n\nThis pattern appears in processing alternating rows/columns in a matrix, downsampling signals in audio processing, and interleaving operations.`,
    instructions: [
      'Given an int array, return a new ArrayList containing only elements at even indices (0, 2, 4, ...)',
      'Use a for loop with a step of 2',
      'Do not use streams or other utility methods',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> skipEveryOther(int[] arr) {
        List<Integer> result = new ArrayList<>();
        // Use a for loop with step of 2
        // TODO: Implement this method

        return result;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> skipEveryOther(int[] arr) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < arr.length; i += 2) {
            result.add(arr[i]);
        }
        return result;
    }
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [1, 3, 5], description: 'Basic even-length array' },
      { input: [10, 20, 30, 40, 50], expected: [10, 30, 50], description: 'Odd-length array' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Initialize i to 0 and increment by 2 each iteration: i += 2',
      'Use result.add(arr[i]) to append to the ArrayList',
    ],
    concepts: ['for loop', 'index stepping', 'ArrayList'],
  },
  {
    id: 'java-reverse-iteration',
    title: 'Reverse Array Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array from the last element to the first using a decrementing loop. Reverse iteration is essential for in-place algorithms, stack-based processing, and situations where you must modify a collection while traversing it.',
    explanation: `Reverse iteration teaches you to think about arrays bidirectionally. By starting at the last index (arr.length - 1) and decrementing, you naturally produce a reversed copy without needing a built-in method.\n\nThe boundary condition is the most important detail: initialize i to arr.length - 1, and loop while i >= 0. Off-by-one errors here are common. The time complexity is O(n) and space is O(n) for the output.\n\nReverse traversal is essential when processing elements from the end, removing elements during iteration to avoid index shifting, or implementing in-place reversal algorithms with two pointers.`,
    instructions: [
      'Given an int array, return a new ArrayList with elements in reverse order',
      'Use a for loop iterating backwards',
      'Do not use Collections.reverse() or similar utility methods',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> reverseIterate(int[] arr) {
        List<Integer> result = new ArrayList<>();
        // Iterate from the end to the beginning
        // TODO: Implement this method

        return result;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> reverseIterate(int[] arr) {
        List<Integer> result = new ArrayList<>();
        for (int i = arr.length - 1; i >= 0; i--) {
            result.add(arr[i]);
        }
        return result;
    }
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Basic reverse' },
      { input: [10, 20, 30], expected: [30, 20, 10], description: 'Three elements' },
      { input: [42], expected: [42], description: 'Single element' },
      { input: [], expected: [], description: 'Empty array' },
    ],
    hints: ['Start i at arr.length - 1', 'Loop while i >= 0', 'Decrement i each iteration: i--'],
    concepts: ['reverse iteration', 'for loop', 'array indices'],
  },
  {
    id: 'java-step-iteration',
    title: 'Custom Step Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array with a custom step size to select elements at regular intervals. Variable-step iteration is used for downsampling data, batch processing, and creating strided views over arrays.',
    instructions: [
      'Given an int array and a step size, return elements at indices that are multiples of the step',
      'For step=3: return elements at indices 0, 3, 6, 9...',
      'Handle edge cases like empty arrays and step larger than array length',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> stepIterate(int[] arr, int step) {
        List<Integer> result = new ArrayList<>();
        // Iterate with custom step size
        // TODO: Implement this method

        return result;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> stepIterate(int[] arr, int step) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < arr.length; i += step) {
            result.add(arr[i]);
        }
        return result;
    }
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 3],
        expected: [1, 4, 7],
        description: 'Step of 3',
      },
      {
        input: [[10, 20, 30, 40, 50], 2],
        expected: [10, 30, 50],
        description: 'Step of 2',
      },
      { input: [[1, 2, 3], 5], expected: [1], description: 'Step larger than array' },
      { input: [[], 2], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Use i += step instead of i++',
      'The first element (index 0) is always included if the array is non-empty',
    ],
    concepts: ['variable step', 'for loop', 'modular iteration'],
  },
  {
    id: 'java-nested-loop-matrix',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a 2D array (matrix) row by row using nested loops and collect all elements into a flat list. Nested iteration over matrices is fundamental to image processing, game boards, spreadsheets, and nearly every grid-based algorithm.',
    explanation: `Nested loops for matrix traversal establish the row-major access pattern used throughout computing. The outer loop selects each row, and the inner loop visits each column within that row, producing elements in reading order.\n\nThe time complexity is O(m * n) where m is the number of rows and n is the number of columns. This is optimal since you must visit every element.\n\nRow-major traversal is cache-friendly because Java stores 2D arrays as arrays of row arrays. This pattern forms the basis for image pixel processing, spreadsheet cell iteration, game board updates, and matrix multiplication algorithms.`,
    instructions: [
      'Given a 2D int array (matrix), return a flat ArrayList of all elements',
      'Traverse row by row, from left to right',
      'Use nested for loops',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> flattenMatrix(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        // Use nested loops to traverse the matrix
        // TODO: Implement this method

        return result;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> flattenMatrix(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                result.add(matrix[row][col]);
            }
        }
        return result;
    }
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
      'Outer loop iterates over rows: for (int row = 0; row < matrix.length; row++)',
      'Inner loop iterates over columns: for (int col = 0; col < matrix[row].length; col++)',
      'Access elements with matrix[row][col]',
    ],
    concepts: ['nested loops', '2D arrays', 'matrix traversal'],
  },
  {
    id: 'java-sliding-window-max-sum',
    title: 'Sliding Window Maximum Sum',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the maximum sum of any contiguous subarray of size k using the sliding window technique. This is a classic pattern that reduces brute-force O(n*k) to O(n) by maintaining a running sum.',
    explanation: `The sliding window technique maintains a window of fixed size k that slides across the array. Instead of recalculating the sum from scratch for each position, you subtract the element leaving the window and add the element entering it.\n\nFirst, compute the sum of the first k elements. Then slide the window one position at a time: subtract arr[i - k] (the element that just left) and add arr[i] (the element that just entered). Track the maximum sum seen.\n\nTime complexity is O(n) instead of O(n*k) for the brute-force approach. This pattern extends to problems like minimum subarray sum, longest substring without repeating characters, and many other window-based problems.`,
    instructions: [
      'Given an int array and window size k, find the maximum sum of any contiguous subarray of size k',
      'Use the sliding window technique for O(n) time complexity',
      'First compute the sum of the first window, then slide it across',
    ],
    starterCode: `public class Solution {
    public static int maxSumSubarray(int[] arr, int k) {
        if (arr.length < k) return 0;

        // Calculate sum of first window
        // TODO: Implement this method

        // Slide window and track max
        // TODO: Implement this method

        return 0;
    }
}`,
    solutionCode: `public class Solution {
    public static int maxSumSubarray(int[] arr, int k) {
        if (arr.length < k) return 0;

        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        int maxSum = windowSum;
        for (int i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }

        return maxSum;
    }
}`,
    testCases: [
      { input: [[2, 1, 5, 1, 3, 2], 3], expected: 9, description: 'Max sum window of size 3' },
      { input: [[2, 3, 4, 1, 5], 2], expected: 7, description: 'Max sum window of size 2' },
      { input: [[1, 1, 1, 1, 1], 3], expected: 3, description: 'All same elements' },
      { input: [[5], 1], expected: 5, description: 'Single element window' },
    ],
    hints: [
      'Compute the first window sum with a loop from 0 to k',
      'Slide by subtracting arr[i - k] and adding arr[i]',
      'Use Math.max() to track the maximum sum',
    ],
    concepts: ['sliding window', 'subarray sum', 'optimization'],
  },
  {
    id: 'java-two-pointer-palindrome',
    title: 'Two Pointer Palindrome Check',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Use the two-pointer technique to check if a string is a palindrome. Two pointers converging from both ends is a fundamental pattern for symmetry checks, partitioning, and sorted-array problems.',
    explanation: `The two-pointer technique uses two indices that start at opposite ends of the data and move toward each other. For palindrome checking, compare characters at the left and right pointers; if they ever differ, the string is not a palindrome.\n\nThis achieves O(n/2) comparisons, which is O(n) time and O(1) extra space since you only need two index variables. This is more efficient than reversing the string and comparing.\n\nThe two-pointer pattern generalizes to many problems: finding pairs that sum to a target in a sorted array, partitioning arrays (Dutch national flag), container with most water, and trapping rain water.`,
    instructions: [
      'Given a string, return true if it reads the same forwards and backwards',
      'Use two pointers starting from both ends moving inward',
      'Compare characters at left and right pointers',
    ],
    starterCode: `public class Solution {
    public static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        // Compare characters from both ends
        // TODO: Implement this method

        return true;
    }
}`,
    solutionCode: `public class Solution {
    public static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
}`,
    testCases: [
      { input: 'racecar', expected: true, description: 'Odd-length palindrome' },
      { input: 'abba', expected: true, description: 'Even-length palindrome' },
      { input: 'hello', expected: false, description: 'Not a palindrome' },
      { input: 'a', expected: true, description: 'Single character' },
      { input: '', expected: true, description: 'Empty string' },
    ],
    hints: [
      'Use s.charAt(index) to access characters in Java',
      'Loop while left < right',
      'Return false immediately if characters do not match',
    ],
    concepts: ['two pointers', 'palindrome', 'string manipulation'],
  },

  // ========== RECURSION ==========
  {
    id: 'java-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate the nth Fibonacci number using simple recursion. This classic problem teaches base cases and recursive decomposition.',
    explanation: `The Fibonacci sequence is defined as: fib(0) = 0, fib(1) = 1, and fib(n) = fib(n-1) + fib(n-2) for n > 1. This directly translates to a recursive implementation.\n\nThe base cases handle the first two values. For all other inputs, the function calls itself twice with smaller arguments, eventually reaching the base cases.\n\nNote that this naive recursive approach has O(2^n) time complexity due to repeated calculations. For example, fib(5) calculates fib(3) twice and fib(2) three times. This motivates the memoization exercises later in this collection.`,
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1',
      'Use recursion: fib(n) = fib(n-1) + fib(n-2)',
    ],
    starterCode: `public class Solution {
    public static int fibonacci(int n) {
        // Base cases
        // TODO: Implement base cases

        // Recursive case
        // TODO: Implement recursive case
        return 0;
    }
}`,
    solutionCode: `public class Solution {
    public static int fibonacci(int n) {
        if (n <= 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 5, expected: 5, description: 'fib(5)' },
      { input: 10, expected: 55, description: 'fib(10)' },
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n == 1 returns 1',
      'Recursive case: return fibonacci(n - 1) + fibonacci(n - 2)',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci'],
  },
  {
    id: 'java-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description:
      'Calculate factorial using recursion. Factorial is the quintessential example of a problem with natural recursive structure.',
    instructions: [
      'Return n! (n factorial)',
      'factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: factorial(0) = factorial(1) = 1',
    ],
    starterCode: `public class Solution {
    public static long factorial(int n) {
        // Base case
        // TODO: Implement base case

        // Recursive case
        // TODO: Implement recursive case
        return 0;
    }
}`,
    solutionCode: `public class Solution {
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
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
      'Use long return type to handle larger factorials',
    ],
    concepts: ['recursion', 'factorial', 'base case'],
  },
  {
    id: 'java-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Solve the classic Tower of Hanoi puzzle using recursion. This problem demonstrates how recursion can elegantly solve problems that seem complex iteratively.',
    explanation: `The Tower of Hanoi puzzle involves moving n disks from a source peg to a destination peg using an auxiliary peg, with the constraint that a larger disk can never be placed on top of a smaller disk.\n\nThe recursive insight is: to move n disks from source to destination, first move n-1 disks from source to auxiliary (using destination as temp), then move the largest disk directly to destination, then move n-1 disks from auxiliary to destination (using source as temp).\n\nThis produces 2^n - 1 moves, which is provably optimal. The algorithm teaches divide-and-conquer thinking and demonstrates how a complex problem reduces to smaller instances of itself.`,
    instructions: [
      'Return a list of moves to solve Tower of Hanoi for n disks',
      'Each move is a string like "Move disk 1 from A to C"',
      'Pegs are labeled A (source), B (auxiliary), C (destination)',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> towerOfHanoi(int n) {
        List<String> moves = new ArrayList<>();
        // TODO: Call the recursive helper
        return moves;
    }

    private static void solve(int n, char source, char auxiliary, char destination, List<String> moves) {
        // Base case
        // TODO: Implement base case

        // Recursive steps
        // TODO: Implement recursive steps
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> towerOfHanoi(int n) {
        List<String> moves = new ArrayList<>();
        solve(n, 'A', 'B', 'C', moves);
        return moves;
    }

    private static void solve(int n, char source, char auxiliary, char destination, List<String> moves) {
        if (n == 1) {
            moves.add("Move disk 1 from " + source + " to " + destination);
            return;
        }
        solve(n - 1, source, destination, auxiliary, moves);
        moves.add("Move disk " + n + " from " + source + " to " + destination);
        solve(n - 1, auxiliary, source, destination, moves);
    }
}`,
    testCases: [
      {
        input: 1,
        expected: ['Move disk 1 from A to C'],
        description: 'Single disk',
      },
      {
        input: 2,
        expected: ['Move disk 1 from A to B', 'Move disk 2 from A to C', 'Move disk 1 from B to C'],
        description: 'Two disks',
      },
      {
        input: 3,
        expected: [
          'Move disk 1 from A to C',
          'Move disk 2 from A to B',
          'Move disk 1 from C to B',
          'Move disk 3 from A to C',
          'Move disk 1 from B to A',
          'Move disk 2 from B to C',
          'Move disk 1 from A to C',
        ],
        description: 'Three disks (7 moves)',
      },
    ],
    hints: [
      'Base case: when n == 1, move the disk directly',
      'Recursive step 1: move n-1 disks from source to auxiliary',
      'Recursive step 2: move disk n from source to destination',
      'Recursive step 3: move n-1 disks from auxiliary to destination',
    ],
    concepts: ['recursion', 'divide and conquer', 'Tower of Hanoi'],
  },
  {
    id: 'java-generate-permutations',
    title: 'Generate Permutations',
    category: 'recursion',
    difficulty: 'advanced',
    description:
      'Generate all permutations of an array using recursive backtracking. This is a fundamental algorithmic technique used in combinatorial optimization and exhaustive search.',
    explanation: `Permutation generation using backtracking works by fixing one element at each position and recursing on the remaining elements. At each level of recursion, you swap the current index with every possible element from the remaining portion.\n\nThe base case is when the current index reaches the end of the array, at which point you have a complete permutation. The backtracking step swaps elements back after the recursive call to restore the original state.\n\nFor an array of n elements, there are n! permutations. The time complexity is O(n * n!) since you generate n! permutations and each takes O(n) to copy.`,
    instructions: [
      'Given an int array, return all possible permutations as a List of Lists',
      'Use recursive backtracking with swapping',
      'Each permutation should be a separate list',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> permutations(int[] arr) {
        List<List<Integer>> result = new ArrayList<>();
        // TODO: Call the recursive helper
        return result;
    }

    private static void backtrack(int[] arr, int start, List<List<Integer>> result) {
        // Base case: complete permutation
        // TODO: Implement base case

        // Try each element at position start
        // TODO: Implement recursive backtracking with swap
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> permutations(int[] arr) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(arr, 0, result);
        return result;
    }

    private static void backtrack(int[] arr, int start, List<List<Integer>> result) {
        if (start == arr.length) {
            List<Integer> perm = new ArrayList<>();
            for (int num : arr) {
                perm.add(num);
            }
            result.add(perm);
            return;
        }

        for (int i = start; i < arr.length; i++) {
            swap(arr, start, i);
            backtrack(arr, start + 1, result);
            swap(arr, start, i);
        }
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
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
      {
        input: [1],
        expected: [[1]],
        description: 'Single element',
      },
    ],
    hints: [
      'Swap current index with each remaining element',
      'Recurse with start + 1 after swapping',
      'Swap back (backtrack) after the recursive call',
      'Base case: when start equals arr.length, copy the array to result',
    ],
    concepts: ['backtracking', 'permutations', 'recursion', 'swapping'],
  },
  {
    id: 'java-flatten-nested-list',
    title: 'Flatten Nested List',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Recursively flatten a nested list structure into a single flat list. This pattern appears in JSON processing, tree flattening, and handling hierarchical data.',
    explanation: `Flattening a nested list requires checking each element: if it is a list, recurse into it; if it is a value, add it to the result. This is a natural application of recursion since the structure is itself recursive (lists can contain lists).\n\nIn Java, we model nested lists using List<Object> where each element is either an Integer or another List<Object>. The instanceof operator lets us check the type at runtime.\n\nThe time complexity is O(n) where n is the total number of elements across all levels of nesting. Space complexity is O(d) for the recursion stack where d is the maximum nesting depth.`,
    instructions: [
      'Given a List<Object> where elements are either Integer or List<Object>, flatten it',
      'Use instanceof to check if an element is a List',
      'Recursively flatten nested lists',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    @SuppressWarnings("unchecked")
    public static List<Integer> flatten(List<Object> nested) {
        List<Integer> result = new ArrayList<>();
        // TODO: Iterate through elements and flatten recursively
        return result;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    @SuppressWarnings("unchecked")
    public static List<Integer> flatten(List<Object> nested) {
        List<Integer> result = new ArrayList<>();
        for (Object element : nested) {
            if (element instanceof List) {
                result.addAll(flatten((List<Object>) element));
            } else {
                result.add((Integer) element);
            }
        }
        return result;
    }
}`,
    testCases: [
      {
        input: [1, [2, 3], [4, [5, 6]]],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Mixed nesting levels',
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
      'Use element instanceof List to check if an element is a nested list',
      'Cast to List<Object> before recursing',
      'Use result.addAll() to merge the flattened sublist into the result',
    ],
    concepts: ['recursion', 'instanceof', 'type casting', 'nested structures'],
  },

  // ========== SEARCHING ==========
  {
    id: 'java-binary-search',
    title: 'Binary Search (Recursive)',
    category: 'searching',
    difficulty: 'beginner',
    description:
      'Implement binary search recursively to find an element in a sorted array. Binary search is the most fundamental divide-and-conquer algorithm and a cornerstone of efficient searching.',
    explanation: `Binary search works by repeatedly dividing the search interval in half. Compare the target with the middle element: if they match, return the index. If the target is smaller, search the left half. If larger, search the right half.\n\nThe recursive version passes updated left and right bounds with each call. The base case is when left exceeds right, meaning the element is not present.\n\nTime complexity is O(log n) since each comparison halves the search space. Space complexity is O(log n) for the recursion stack. Binary search requires the input to be sorted.`,
    instructions: [
      'Given a sorted int array and a target, return the index of the target or -1',
      'Implement using recursive binary search',
      'The array is sorted in ascending order',
    ],
    starterCode: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        return search(arr, target, 0, arr.length - 1);
    }

    private static int search(int[] arr, int target, int left, int right) {
        // Base case: element not found
        // TODO: Implement base case

        // Calculate mid and compare
        // TODO: Implement recursive search
        return -1;
    }
}`,
    solutionCode: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        return search(arr, target, 0, arr.length - 1);
    }

    private static int search(int[] arr, int target, int left, int right) {
        if (left > right) return -1;

        int mid = left + (right - left) / 2;

        if (arr[mid] == target) return mid;
        if (arr[mid] < target) return search(arr, target, mid + 1, right);
        return search(arr, target, left, mid - 1);
    }
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9, 11], 7], expected: 3, description: 'Find 7 in sorted array' },
      { input: [[1, 3, 5, 7, 9, 11], 1], expected: 0, description: 'Find first element' },
      { input: [[1, 3, 5, 7, 9, 11], 11], expected: 5, description: 'Find last element' },
      { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: 'Element not found' },
    ],
    hints: [
      'Use left + (right - left) / 2 to avoid integer overflow',
      'Base case: left > right means element is not present',
      'Recurse on left or right half based on comparison',
    ],
    concepts: ['binary search', 'divide and conquer', 'recursion'],
  },
  {
    id: 'java-binary-search-iterative',
    title: 'Binary Search (Iterative)',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Implement binary search iteratively using a while loop. The iterative version avoids recursion overhead and is often preferred in production code.',
    explanation: `The iterative binary search uses a while loop with left and right pointers instead of recursive calls. This eliminates the O(log n) stack space of the recursive version, achieving O(1) extra space.\n\nThe loop continues while left <= right. At each iteration, compute the midpoint, compare with the target, and adjust the bounds accordingly. When the loop exits without finding the target, return -1.\n\nIn Java, use left + (right - left) / 2 instead of (left + right) / 2 to prevent integer overflow when left and right are both large positive values.`,
    instructions: [
      'Given a sorted int array and a target, return the index of the target or -1',
      'Implement using an iterative while loop',
      'Avoid integer overflow in midpoint calculation',
    ],
    starterCode: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            // Calculate mid and compare
            // TODO: Implement iterative binary search
        }

        return -1;
    }
}`,
    solutionCode: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

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
    }
}`,
    testCases: [
      { input: [[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23], expected: 5, description: 'Find 23' },
      { input: [[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2], expected: 0, description: 'Find first' },
      {
        input: [[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91],
        expected: 9,
        description: 'Find last',
      },
      {
        input: [[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50],
        expected: -1,
        description: 'Not found',
      },
    ],
    hints: [
      'Loop while left <= right',
      'Use left + (right - left) / 2 for safe midpoint',
      'Adjust left to mid + 1 or right to mid - 1',
    ],
    concepts: ['binary search', 'iterative', 'two pointers'],
  },
  {
    id: 'java-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'advanced',
    description:
      'Search for a target value in a rotated sorted array using modified binary search. This is a classic interview question that tests your ability to adapt binary search to non-standard conditions.',
    explanation: `A rotated sorted array is a sorted array that has been rotated at some pivot point. For example, [4,5,6,7,0,1,2] is [0,1,2,4,5,6,7] rotated at index 3.\n\nThe key insight is that at least one half of the array (left or right of mid) is always sorted. You can determine which half is sorted by comparing arr[left] with arr[mid]. Then check if the target falls within the sorted half; if so, search there, otherwise search the other half.\n\nThis maintains O(log n) time complexity. The algorithm requires careful handling of edge cases, especially when elements at left, mid, or right are equal to the target.`,
    instructions: [
      'Given a rotated sorted array and a target, return the index of the target or -1',
      'The array was originally sorted in ascending order, then rotated',
      'Achieve O(log n) time complexity using modified binary search',
    ],
    starterCode: `public class Solution {
    public static int searchRotated(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            // Check if mid is target
            // Determine which half is sorted
            // Search the appropriate half
            // TODO: Implement modified binary search
        }

        return -1;
    }
}`,
    solutionCode: `public class Solution {
    public static int searchRotated(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) return mid;

            if (arr[left] <= arr[mid]) {
                if (target >= arr[left] && target < arr[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > arr[mid] && target <= arr[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }

        return -1;
    }
}`,
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4, description: 'Find 0 in rotated array' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 5], expected: 1, description: 'Find 5 in left portion' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1, description: 'Not found' },
      { input: [[1], 1], expected: 0, description: 'Single element found' },
      { input: [[3, 1], 1], expected: 1, description: 'Two elements rotated' },
    ],
    hints: [
      'One half of the array is always sorted',
      'Check if arr[left] <= arr[mid] to determine which half is sorted',
      'If target is within the sorted half, search there; otherwise search the other half',
    ],
    concepts: ['binary search', 'rotated array', 'modified binary search'],
  },
  {
    id: 'java-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    difficulty: 'intermediate',
    description:
      'Find a peak element in an array where the element is greater than its neighbors using binary search. This demonstrates how binary search can apply to unsorted arrays when a monotonicity condition exists.',
    explanation: `A peak element is an element that is strictly greater than its neighbors. For boundary elements, only one neighbor needs to be considered. An array always has at least one peak.\n\nThe binary search approach works because if arr[mid] < arr[mid + 1], there must be a peak to the right (the array must eventually decrease or reach the boundary). Similarly, if arr[mid] < arr[mid - 1], there must be a peak to the left.\n\nThis achieves O(log n) time complexity. The key insight is that we do not need the array to be sorted; we only need the guarantee that following the ascending direction leads to a peak.`,
    instructions: [
      'Return the index of any peak element in the array',
      'A peak element is strictly greater than its neighbors',
      'Use binary search for O(log n) time complexity',
    ],
    starterCode: `public class Solution {
    public static int findPeak(int[] arr) {
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;
            // Compare mid with its right neighbor
            // TODO: Implement peak finding
        }

        return left;
    }
}`,
    solutionCode: `public class Solution {
    public static int findPeak(int[] arr) {
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] < arr[mid + 1]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }
}`,
    testCases: [
      { input: [1, 2, 3, 1], expected: 2, description: 'Peak at index 2' },
      { input: [1, 2, 1, 3, 5, 6, 4], expected: 5, description: 'Peak at index 5' },
      { input: [5, 4, 3, 2, 1], expected: 0, description: 'Peak at start' },
      { input: [1, 2, 3, 4, 5], expected: 4, description: 'Peak at end' },
    ],
    hints: [
      'If arr[mid] < arr[mid + 1], the peak is to the right',
      'Otherwise, the peak is at mid or to the left',
      'Use left < right (not left <= right) as the loop condition',
    ],
    concepts: ['binary search', 'peak finding', 'divide and conquer'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'java-stack-operations',
    title: 'Stack Operations with ArrayDeque',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      "Implement fundamental stack operations using Java's ArrayDeque. The Java documentation recommends ArrayDeque over Stack for LIFO operations due to better performance.",
    explanation: `A stack is a Last-In-First-Out (LIFO) data structure. In Java, ArrayDeque is the preferred implementation over the legacy Stack class because it is not synchronized and has better performance.\n\nThe three core operations are: push (add to top), pop (remove from top), and peek (view top without removing). ArrayDeque provides push(), pop(), and peek() methods directly.\n\nStacks are used for expression evaluation, undo operations, DFS traversal, balancing parentheses, and function call management. Understanding how to use ArrayDeque as a stack is essential for Java interviews.`,
    instructions: [
      'Implement a method that uses an ArrayDeque as a stack to reverse a string',
      'Push each character onto the stack',
      'Pop all characters to build the reversed string',
    ],
    starterCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static String reverseWithStack(String input) {
        Deque<Character> stack = new ArrayDeque<>();

        // Push all characters onto the stack
        // TODO: Push characters

        // Pop all characters to build reversed string
        StringBuilder result = new StringBuilder();
        // TODO: Pop characters and append to result

        return result.toString();
    }
}`,
    solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {
    public static String reverseWithStack(String input) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : input.toCharArray()) {
            stack.push(c);
        }

        StringBuilder result = new StringBuilder();
        while (!stack.isEmpty()) {
            result.append(stack.pop());
        }

        return result.toString();
    }
}`,
    testCases: [
      { input: 'hello', expected: 'olleh', description: 'Reverse hello' },
      { input: 'abcd', expected: 'dcba', description: 'Reverse abcd' },
      { input: 'a', expected: 'a', description: 'Single character' },
      { input: '', expected: '', description: 'Empty string' },
    ],
    hints: [
      'Use stack.push(c) to add to the top',
      'Use stack.pop() to remove from the top',
      'Use stack.isEmpty() to check if the stack is empty',
    ],
    concepts: ['stack', 'ArrayDeque', 'LIFO', 'string reversal'],
  },
  {
    id: 'java-queue-operations',
    title: 'Queue Operations with LinkedList',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      "Implement fundamental queue operations using Java's LinkedList. Queues follow First-In-First-Out (FIFO) ordering and are essential for BFS, task scheduling, and buffering.",
    explanation: `A queue is a First-In-First-Out (FIFO) data structure. In Java, LinkedList implements the Queue interface, providing offer() to enqueue, poll() to dequeue, and peek() to view the front element.\n\nThe key distinction between Queue methods: add/offer (enqueue), remove/poll (dequeue), element/peek (examine). The offer/poll/peek variants return null or false on failure instead of throwing exceptions, making them safer for bounded queues.\n\nQueues are fundamental to BFS, job scheduling, print spooling, and producer-consumer patterns. Understanding the Queue interface is essential for Java development.`,
    instructions: [
      'Implement a method that processes tasks in FIFO order using a Queue',
      'Given an array of task names, enqueue them all, then dequeue and return them in order',
      'This demonstrates FIFO behavior',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Solution {
    public static List<String> processQueue(String[] tasks) {
        Queue<String> queue = new LinkedList<>();
        List<String> processed = new ArrayList<>();

        // Enqueue all tasks
        // TODO: Add tasks to queue

        // Process tasks in FIFO order
        // TODO: Poll tasks and add to processed list

        return processed;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Solution {
    public static List<String> processQueue(String[] tasks) {
        Queue<String> queue = new LinkedList<>();
        List<String> processed = new ArrayList<>();

        for (String task : tasks) {
            queue.offer(task);
        }

        while (!queue.isEmpty()) {
            processed.add(queue.poll());
        }

        return processed;
    }
}`,
    testCases: [
      {
        input: ['task1', 'task2', 'task3'],
        expected: ['task1', 'task2', 'task3'],
        description: 'FIFO order preserved',
      },
      {
        input: ['a'],
        expected: ['a'],
        description: 'Single task',
      },
      {
        input: [],
        expected: [],
        description: 'Empty task list',
      },
    ],
    hints: [
      'Use queue.offer(element) to enqueue',
      'Use queue.poll() to dequeue (returns null if empty)',
      'Use queue.isEmpty() to check if the queue is empty',
    ],
    concepts: ['queue', 'FIFO', 'LinkedList', 'Queue interface'],
  },
  {
    id: 'java-min-stack',
    title: 'Min Stack',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. This is a classic interview problem that teaches auxiliary data structure design.',
    explanation: `The Min Stack maintains a secondary stack that tracks the minimum value at each level. When pushing a value, also push the new minimum onto the min stack. When popping, pop from both stacks.\n\nThe key insight is that each entry in the min stack represents the minimum value in the main stack from the bottom up to that position. This ensures getMin() always returns the current minimum in O(1) time.\n\nAll operations (push, pop, top, getMin) are O(1) time complexity. The space complexity is O(n) for the auxiliary min stack. This pattern of maintaining parallel state is widely applicable in algorithm design.`,
    instructions: [
      'Implement a MinStack class with push, pop, top, and getMin methods',
      'All operations should be O(1) time',
      'Use an auxiliary stack to track minimums',
    ],
    starterCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class MinStack {
    private Deque<Integer> stack;
    private Deque<Integer> minStack;

    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }

    public void push(int val) {
        // TODO: Push to main stack and update min stack
    }

    public void pop() {
        // TODO: Pop from both stacks
    }

    public int top() {
        // TODO: Return top element
        return 0;
    }

    public int getMin() {
        // TODO: Return current minimum
        return 0;
    }
}`,
    solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class MinStack {
    private Deque<Integer> stack;
    private Deque<Integer> minStack;

    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
    testCases: [
      {
        input: {
          operations: ['push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
          values: [-2, 0, -3, null, null, null, null],
        },
        expected: [null, null, null, -3, null, 0, -2],
        description: 'Standard min stack operations',
      },
      {
        input: {
          operations: ['push', 'push', 'getMin', 'pop', 'getMin'],
          values: [1, 2, null, null, null],
        },
        expected: [null, null, 1, null, 1],
        description: 'Min stays same after popping non-min',
      },
    ],
    hints: [
      'Keep a second stack that mirrors the main stack but stores the current minimum',
      'When pushing, compare with the current min and push the smaller value onto minStack',
      'Always push to minStack on every push so both stacks stay the same size',
    ],
    concepts: ['stack', 'min stack', 'auxiliary data structure', 'O(1) operations'],
  },
  {
    id: 'java-hashmap-operations',
    title: 'HashMap Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description:
      'Master fundamental HashMap operations in Java: put, get, containsKey, and iteration. HashMap is the most commonly used data structure in Java for key-value associations.',
    explanation: `HashMap provides O(1) average-case time complexity for put, get, and containsKey operations through hashing. It is the Java equivalent of dictionaries in Python or objects/Maps in JavaScript.\n\nCommon patterns include: counting frequencies with getOrDefault(), grouping elements, and building lookup tables. The entrySet() method provides efficient iteration over all key-value pairs.\n\nHashMap allows one null key and multiple null values. It is not synchronized; use ConcurrentHashMap for thread-safe operations. For ordered iteration, use LinkedHashMap or TreeMap.`,
    instructions: [
      'Given a string array, return a HashMap mapping each word to its frequency',
      'Use getOrDefault() to simplify counting',
      'Return the frequency map',
    ],
    starterCode: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static Map<String, Integer> wordFrequency(String[] words) {
        Map<String, Integer> freq = new HashMap<>();
        // TODO: Count frequency of each word
        return freq;
    }
}`,
    solutionCode: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static Map<String, Integer> wordFrequency(String[] words) {
        Map<String, Integer> freq = new HashMap<>();
        for (String word : words) {
            freq.put(word, freq.getOrDefault(word, 0) + 1);
        }
        return freq;
    }
}`,
    testCases: [
      {
        input: ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'],
        expected: { apple: 3, banana: 2, cherry: 1 },
        description: 'Count word frequencies',
      },
      {
        input: ['hello'],
        expected: { hello: 1 },
        description: 'Single word',
      },
      {
        input: [],
        expected: {},
        description: 'Empty array',
      },
    ],
    hints: [
      'Use freq.getOrDefault(word, 0) to get current count or 0 if not present',
      'Use freq.put(word, count + 1) to update the count',
      'Enhanced for loop: for (String word : words)',
    ],
    concepts: ['HashMap', 'getOrDefault', 'frequency counting'],
  },
  {
    id: 'java-linked-list-reverse',
    title: 'Reverse a Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Reverse a singly linked list in-place by rewiring the next pointers. This is one of the most frequently asked interview questions and tests your pointer manipulation skills.',
    explanation: `Reversing a linked list requires three pointers: previous, current, and next. At each step, save the next node, point current.next back to previous, then advance previous and current forward.\n\nThe algorithm visits each node exactly once, giving O(n) time complexity and O(1) space since it operates in-place. After the loop, previous points to the new head of the reversed list.\n\nThis pattern of iterative pointer manipulation appears in many linked list problems: reversing sublists, detecting cycles, merging lists, and reordering nodes.`,
    instructions: [
      'Reverse a singly linked list in-place',
      'Return the new head of the reversed list',
      'Use iterative approach with three pointers: prev, current, next',
    ],
    starterCode: `public class Solution {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) {
            this.val = val;
            this.next = null;
        }
    }

    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode current = head;

        // Iterate and reverse pointers
        // TODO: Implement reversal logic

        return prev;
    }
}`,
    solutionCode: `public class Solution {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) {
            this.val = val;
            this.next = null;
        }
    }

    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode current = head;

        while (current != null) {
            ListNode next = current.next;
            current.next = prev;
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
        description: 'Reverse 5-element list',
      },
      {
        input: [1, 2],
        expected: [2, 1],
        description: 'Reverse 2-element list',
      },
      {
        input: [1],
        expected: [1],
        description: 'Single element',
      },
    ],
    hints: [
      'Save current.next before overwriting it',
      'Set current.next = prev to reverse the pointer',
      'Advance prev = current, then current = next',
      'After the loop, prev is the new head',
    ],
    concepts: ['linked list', 'pointer manipulation', 'in-place reversal'],
  },
  {
    id: 'java-min-heap-insert',
    title: 'Priority Queue (Min Heap)',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      "Use Java's PriorityQueue to solve the k-th smallest element problem. PriorityQueue implements a min-heap, providing O(log n) insertion and O(1) peek at the minimum element.",
    explanation: `A PriorityQueue in Java is a min-heap by default: the smallest element is always at the front. Elements are ordered according to their natural ordering or a provided Comparator.\n\nThe core operations are: offer() for O(log n) insertion, poll() for O(log n) removal of the minimum, and peek() for O(1) access to the minimum without removal.\n\nFor a max-heap, pass Collections.reverseOrder() as the comparator. PriorityQueues are essential for problems involving k-th smallest/largest elements, merge k sorted lists, Dijkstra's algorithm, and event-driven simulations.`,
    instructions: [
      'Given an int array and k, return the k-th smallest element',
      'Use a PriorityQueue (min-heap)',
      'Add all elements, then poll k times',
    ],
    starterCode: `import java.util.PriorityQueue;

public class Solution {
    public static int kthSmallest(int[] arr, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        // Add all elements to min heap
        // TODO: Add elements

        // Poll k-1 times to get to k-th smallest
        // TODO: Poll elements

        return 0;
    }
}`,
    solutionCode: `import java.util.PriorityQueue;

public class Solution {
    public static int kthSmallest(int[] arr, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : arr) {
            minHeap.offer(num);
        }

        for (int i = 0; i < k - 1; i++) {
            minHeap.poll();
        }

        return minHeap.peek();
    }
}`,
    testCases: [
      { input: [[3, 1, 4, 1, 5, 9, 2, 6], 3], expected: 2, description: '3rd smallest' },
      { input: [[7, 10, 4, 3, 20, 15], 4], expected: 10, description: '4th smallest' },
      { input: [[5], 1], expected: 5, description: 'Single element, k=1' },
      { input: [[1, 2, 3, 4, 5], 1], expected: 1, description: '1st smallest (minimum)' },
    ],
    hints: [
      'PriorityQueue is a min-heap by default in Java',
      'Use offer() to add elements',
      'Poll k-1 times, then peek() for the k-th smallest',
    ],
    concepts: ['PriorityQueue', 'min heap', 'k-th smallest', 'heap operations'],
  },

  // ========== TRAVERSAL ==========
  {
    id: 'java-dfs-tree',
    title: 'DFS Tree Traversal (Pre-order)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement depth-first search to traverse a binary tree in pre-order. Pre-order DFS visits the root before its children and is used for tree copying and serialization.',
    explanation: `Pre-order DFS visits nodes in the order: root, left subtree, right subtree. This is implemented naturally with recursion: process the current node, then recurse on left and right children.\n\nThe time complexity is O(n) since every node is visited exactly once. The space complexity is O(h) for the recursion stack, where h is the height of the tree (O(log n) for balanced trees, O(n) for skewed trees).\n\nPre-order traversal is used for tree serialization (since it preserves the root-first structure), expression tree evaluation (prefix notation), and creating copies of binary trees.`,
    instructions: [
      'Given a tree represented as a Map with "value", "left", and "right" keys, return values in pre-order',
      'Pre-order: visit root, then left subtree, then right subtree',
      'Use recursion',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Solution {
    public static List<Integer> preorderDFS(Map<String, Object> node) {
        List<Integer> result = new ArrayList<>();
        traverse(node, result);
        return result;
    }

    @SuppressWarnings("unchecked")
    private static void traverse(Map<String, Object> node, List<Integer> result) {
        if (node == null) return;

        // Visit node, then left, then right
        // TODO: Implement pre-order traversal
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Solution {
    public static List<Integer> preorderDFS(Map<String, Object> node) {
        List<Integer> result = new ArrayList<>();
        traverse(node, result);
        return result;
    }

    @SuppressWarnings("unchecked")
    private static void traverse(Map<String, Object> node, List<Integer> result) {
        if (node == null) return;

        result.add((Integer) node.get("value"));
        traverse((Map<String, Object>) node.get("left"), result);
        traverse((Map<String, Object>) node.get("right"), result);
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
        expected: [1, 2, 4, 5, 3],
        description: 'Deeper tree',
      },
    ],
    hints: [
      'Check if node is null before accessing properties',
      'Add the current node value first (pre-order)',
      'Then recurse on left, then right',
    ],
    concepts: ['DFS', 'pre-order', 'tree traversal', 'recursion'],
  },
  {
    id: 'java-bfs-tree',
    title: 'BFS Tree Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement breadth-first search to traverse a binary tree level by level using a queue. BFS explores all nodes at the current depth before moving to the next level.',
    explanation: `BFS uses a queue (FIFO) to process nodes level by level. Start by enqueuing the root. Then repeatedly dequeue a node, process it, and enqueue its children. This naturally visits nodes in level order.\n\nThe time complexity is O(n) since every node is visited once. The space complexity is O(w) where w is the maximum width of the tree (the largest number of nodes at any level).\n\nBFS is used for shortest path in unweighted graphs, level-order traversal, finding the minimum depth of a tree, and serialization. In Java, LinkedList implementing Queue is the standard choice.`,
    instructions: [
      'Return values in level-order (top to bottom, left to right)',
      'Use a LinkedList as a Queue',
      'BFS processes all nodes at current depth before going deeper',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {
    @SuppressWarnings("unchecked")
    public static List<Integer> bfs(Map<String, Object> root) {
        if (root == null) return new ArrayList<>();

        List<Integer> result = new ArrayList<>();
        Queue<Map<String, Object>> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            // Dequeue, process, and enqueue children
            // TODO: Implement BFS
        }

        return result;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {
    @SuppressWarnings("unchecked")
    public static List<Integer> bfs(Map<String, Object> root) {
        if (root == null) return new ArrayList<>();

        List<Integer> result = new ArrayList<>();
        Queue<Map<String, Object>> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            Map<String, Object> node = queue.poll();
            result.add((Integer) node.get("value"));

            Map<String, Object> left = (Map<String, Object>) node.get("left");
            Map<String, Object> right = (Map<String, Object>) node.get("right");

            if (left != null) queue.offer(left);
            if (right != null) queue.offer(right);
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
          right: {
            value: 3,
            left: null,
            right: { value: 6, left: null, right: null },
          },
        },
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Level-order traversal',
      },
    ],
    hints: [
      'Use queue.poll() to dequeue from the front',
      'Use queue.offer() to enqueue children',
      'Check for null before adding children to the queue',
    ],
    concepts: ['BFS', 'queue', 'level-order', 'tree traversal'],
  },
  {
    id: 'java-dfs-inorder',
    title: 'In-order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Implement in-order traversal of a binary tree. In-order traversal of a BST produces elements in sorted order, making it essential for BST operations.',
    explanation: `In-order traversal visits nodes in the order: left subtree, root, right subtree. For a binary search tree (BST), this produces elements in ascending sorted order.\n\nThe recursive implementation is straightforward: recurse left, process current node, recurse right. The time complexity is O(n) and space is O(h) for the recursion stack.\n\nIn-order traversal is fundamental for BST validation (check if output is sorted), converting a BST to a sorted array, finding the k-th smallest element in a BST, and building balanced BSTs from sorted data.`,
    instructions: [
      'Traverse a binary tree in in-order: left, root, right',
      'Return the list of values in in-order sequence',
      'Use recursion',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Solution {
    public static List<Integer> inorderTraversal(Map<String, Object> node) {
        List<Integer> result = new ArrayList<>();
        inorder(node, result);
        return result;
    }

    @SuppressWarnings("unchecked")
    private static void inorder(Map<String, Object> node, List<Integer> result) {
        if (node == null) return;

        // Left, Root, Right
        // TODO: Implement in-order traversal
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Solution {
    public static List<Integer> inorderTraversal(Map<String, Object> node) {
        List<Integer> result = new ArrayList<>();
        inorder(node, result);
        return result;
    }

    @SuppressWarnings("unchecked")
    private static void inorder(Map<String, Object> node, List<Integer> result) {
        if (node == null) return;

        inorder((Map<String, Object>) node.get("left"), result);
        result.add((Integer) node.get("value"));
        inorder((Map<String, Object>) node.get("right"), result);
    }
}`,
    testCases: [
      {
        input: {
          value: 2,
          left: { value: 1, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3],
        description: 'BST produces sorted order',
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
        description: 'Larger BST in sorted order',
      },
    ],
    hints: [
      'Recurse left first, then add current node value, then recurse right',
      'For a BST, in-order traversal produces sorted output',
      'Check for null before recursing',
    ],
    concepts: ['in-order traversal', 'BST', 'recursion', 'sorted order'],
  },
  {
    id: 'java-bfs-traversal',
    title: 'Graph BFS Traversal',
    category: 'traversal',
    difficulty: 'advanced',
    description:
      'Implement breadth-first search on a graph represented as an adjacency list. Graph BFS is fundamental for shortest-path problems in unweighted graphs.',
    explanation: `Graph BFS extends tree BFS by adding a visited set to handle cycles. Starting from a source node, explore all neighbors at distance 1, then distance 2, and so on.\n\nThe algorithm uses a queue and a HashSet: enqueue the start node and mark it visited. For each dequeued node, process it and enqueue all unvisited neighbors.\n\nTime complexity is O(V + E) where V is vertices and E is edges. Space complexity is O(V) for the visited set and queue. Graph BFS finds shortest paths in unweighted graphs, detects connected components, and solves problems like word ladders and minimum transformations.`,
    instructions: [
      'Given an adjacency list (Map<String, List<String>>) and a start node, return BFS visit order',
      'Use a Queue and a HashSet for visited tracking',
      'Process neighbors in the order they appear in the adjacency list',
    ],
    starterCode: `import java.util.*;

public class Solution {
    public static List<String> graphBFS(Map<String, List<String>> graph, String start) {
        List<String> visited = new ArrayList<>();
        Set<String> seen = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        // TODO: Initialize BFS from start node

        while (!queue.isEmpty()) {
            // TODO: Process nodes and enqueue unvisited neighbors
        }

        return visited;
    }
}`,
    solutionCode: `import java.util.*;

public class Solution {
    public static List<String> graphBFS(Map<String, List<String>> graph, String start) {
        List<String> visited = new ArrayList<>();
        Set<String> seen = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        queue.offer(start);
        seen.add(start);

        while (!queue.isEmpty()) {
            String node = queue.poll();
            visited.add(node);

            List<String> neighbors = graph.getOrDefault(node, Collections.emptyList());
            for (String neighbor : neighbors) {
                if (!seen.contains(neighbor)) {
                    seen.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }

        return visited;
    }
}`,
    testCases: [
      {
        input: [{ A: ['B', 'C'], B: ['D'], C: ['D'], D: [] }, 'A'],
        expected: ['A', 'B', 'C', 'D'],
        description: 'Simple DAG',
      },
      {
        input: [{ A: ['B'], B: ['C'], C: ['A'] }, 'A'],
        expected: ['A', 'B', 'C'],
        description: 'Graph with cycle',
      },
    ],
    hints: [
      'Mark nodes as visited when enqueuing, not when dequeuing',
      'Use graph.getOrDefault(node, Collections.emptyList()) to handle missing keys',
      'Use a HashSet for O(1) visited checks',
    ],
    concepts: ['graph BFS', 'adjacency list', 'visited set', 'shortest path'],
  },
  {
    id: 'java-level-order-traversal',
    title: 'Level Order Traversal (Grouped)',
    category: 'traversal',
    difficulty: 'intermediate',
    description:
      'Traverse a binary tree level by level, grouping nodes by their level. Unlike simple BFS, this variant returns a list of lists where each inner list contains nodes at the same depth.',
    explanation: `Level-order traversal with grouping extends BFS by processing all nodes at the current level before moving to the next. The key technique is to capture the queue size at the start of each level and process exactly that many nodes.\n\nWithin the while loop, record the current queue size (the number of nodes at this level). Then dequeue exactly that many nodes, adding their values to the current level's list and their children to the queue for the next level.\n\nThis produces a List<List<Integer>> where index i contains all values at depth i. Time complexity is O(n) and space is O(w) where w is the maximum width.`,
    instructions: [
      'Return a List of Lists, where each inner list contains values at the same level',
      'Level 0 contains the root, level 1 contains root children, etc.',
      'Use BFS with level-size tracking',
    ],
    starterCode: `import java.util.*;

public class Solution {
    @SuppressWarnings("unchecked")
    public static List<List<Integer>> levelOrder(Map<String, Object> root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<Map<String, Object>> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            // Process all nodes at this level
            // TODO: Implement level-order grouping
        }

        return result;
    }
}`,
    solutionCode: `import java.util.*;

public class Solution {
    @SuppressWarnings("unchecked")
    public static List<List<Integer>> levelOrder(Map<String, Object> root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<Map<String, Object>> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                Map<String, Object> node = queue.poll();
                currentLevel.add((Integer) node.get("value"));

                Map<String, Object> left = (Map<String, Object>) node.get("left");
                Map<String, Object> right = (Map<String, Object>) node.get("right");

                if (left != null) queue.offer(left);
                if (right != null) queue.offer(right);
            }

            result.add(currentLevel);
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
        description: 'Three levels',
      },
      {
        input: { value: 1, left: null, right: null },
        expected: [[1]],
        description: 'Single node',
      },
    ],
    hints: [
      'Capture queue.size() at the start of each level to know how many nodes to process',
      'Use a for loop to process exactly levelSize nodes per iteration',
      'Add the currentLevel list to result after processing all nodes at that level',
    ],
    concepts: ['level-order', 'BFS', 'grouping by depth', 'queue size tracking'],
  },

  // ========== COMBINATORICS ==========
  {
    id: 'java-generate-subsets',
    title: 'Generate All Subsets',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Generate all possible subsets (the power set) of a given array using backtracking. Subset generation is fundamental to combinatorial algorithms and constraint satisfaction problems.',
    explanation: `The power set of a set with n elements contains 2^n subsets, including the empty set and the set itself. Backtracking generates subsets by making a binary choice at each element: include it or exclude it.\n\nStart with an empty current subset. At each index, add the current element and recurse (include path), then remove it and recurse (exclude path). When the index reaches the array length, add a copy of the current subset to the result.\n\nAlternatively, iterate from the current start index to the end, adding each element and recursing with start = i + 1. This avoids duplicates and generates subsets in lexicographic order. Time complexity is O(n * 2^n) for generating and copying all subsets.`,
    instructions: [
      'Given an int array, return all possible subsets (power set)',
      'Include the empty set and the full set',
      'Use backtracking to generate subsets',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        // TODO: Call backtrack helper
        return result;
    }

    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        // TODO: Add current subset copy and recurse
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current));

        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
}`,
    testCases: [
      {
        input: [1, 2, 3],
        expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        description: 'Subsets of [1,2,3]',
      },
      {
        input: [0],
        expected: [[], [0]],
        description: 'Subsets of single element',
      },
    ],
    hints: [
      'Add a copy of current to result at each call (every state is a valid subset)',
      'Loop from start to nums.length, adding each element',
      'Remove the last element after recursing (backtrack)',
    ],
    concepts: ['backtracking', 'power set', 'subsets', 'combinatorics'],
  },
  {
    id: 'java-generate-combinations',
    title: 'Generate Combinations',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Generate all combinations of k elements from [1..n]. This is a constrained subset generation problem that appears in lottery calculations, committee selection, and feature subset selection.',
    explanation: `Combinations differ from permutations in that order does not matter. C(n, k) = n! / (k! * (n-k)!) gives the count of combinations.\n\nThe backtracking approach is similar to subset generation but with a size constraint: only add the current combination to the result when its size equals k. Start from index 1 and at each step, choose or skip each number.\n\nPruning optimization: if the remaining numbers (n - i + 1) are fewer than what we still need (k - current.size()), we can skip that branch entirely. This significantly reduces the search space for large inputs.`,
    instructions: [
      'Given n and k, generate all combinations of k numbers from 1 to n',
      'Each combination should be in ascending order',
      'Use backtracking with pruning',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        // TODO: Call backtrack helper
        return result;
    }

    private static void backtrack(int n, int k, int start, List<Integer> current, List<List<Integer>> result) {
        // Base case: combination complete
        // TODO: Implement combination generation
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(n, k, 1, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int n, int k, int start, List<Integer> current, List<List<Integer>> result) {
        if (current.size() == k) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = start; i <= n - (k - current.size()) + 1; i++) {
            current.add(i);
            backtrack(n, k, i + 1, current, result);
            current.remove(current.size() - 1);
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
      'Base case: when current.size() == k, add a copy to result',
      'Loop from start to n, adding each number and recursing',
      'Pruning: stop when remaining numbers are insufficient',
    ],
    concepts: ['combinations', 'backtracking', 'pruning', 'C(n,k)'],
  },
  {
    id: 'java-cartesian-product',
    title: 'Cartesian Product',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description:
      'Compute the Cartesian product of two lists, producing all possible pairs. This operation is fundamental in database joins, test case generation, and combinatorial analysis.',
    explanation: `The Cartesian product of two sets A and B is the set of all ordered pairs (a, b) where a is in A and b is in B. If A has m elements and B has n elements, the product has m * n pairs.\n\nThe implementation uses nested loops: for each element in the first list, pair it with every element in the second list. This naturally produces all combinations.\n\nCartesian products are used in SQL cross joins, generating test input combinations, and computing tensor products. For more than two lists, the nested-loop approach can be generalized using recursion or iterative deepening.`,
    instructions: [
      'Given two int arrays, return all possible pairs as a List of int arrays',
      'Each pair contains one element from each array',
      'Use nested loops',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<int[]> cartesianProduct(int[] a, int[] b) {
        List<int[]> result = new ArrayList<>();
        // TODO: Generate all pairs using nested loops
        return result;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<int[]> cartesianProduct(int[] a, int[] b) {
        List<int[]> result = new ArrayList<>();
        for (int elemA : a) {
            for (int elemB : b) {
                result.add(new int[]{elemA, elemB});
            }
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
        description: 'Product of two 2-element arrays',
      },
      {
        input: [[1], [2, 3, 4]],
        expected: [
          [1, 2],
          [1, 3],
          [1, 4],
        ],
        description: 'Single element with three elements',
      },
      {
        input: [[], [1, 2]],
        expected: [],
        description: 'Empty first array produces empty result',
      },
    ],
    hints: [
      'Outer loop iterates over first array, inner loop over second',
      'Create a new int[] pair for each combination',
      'Result size is a.length * b.length',
    ],
    concepts: ['Cartesian product', 'nested loops', 'combinatorics'],
  },

  // ========== MEMOIZATION ==========
  {
    id: 'java-memoize-fibonacci',
    title: 'Memoized Fibonacci',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Optimize the recursive Fibonacci function using memoization with a HashMap. This transforms the exponential O(2^n) solution into a linear O(n) solution.',
    explanation: `Naive recursive Fibonacci recalculates the same values many times. For example, fib(5) calls fib(3) twice and fib(2) three times. Memoization caches results of previously computed calls.\n\nIn Java, use a HashMap<Integer, Long> to store computed values. Before computing fib(n), check if it is already in the map. If so, return the cached value. Otherwise, compute it, store it, and return it.\n\nThis reduces time complexity from O(2^n) to O(n) since each value is computed at most once. Space complexity is O(n) for the cache and recursion stack. This top-down approach (memoization) is equivalent to bottom-up dynamic programming.`,
    instructions: [
      'Implement Fibonacci with memoization using a HashMap',
      'The memo map should be passed as a parameter',
      'Return long to handle larger Fibonacci numbers',
    ],
    starterCode: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static long fibonacci(int n) {
        return fib(n, new HashMap<>());
    }

    private static long fib(int n, Map<Integer, Long> memo) {
        // Check memo first
        // TODO: Implement memoized fibonacci
        return 0;
    }
}`,
    solutionCode: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static long fibonacci(int n) {
        return fib(n, new HashMap<>());
    }

    private static long fib(int n, Map<Integer, Long> memo) {
        if (n <= 0) return 0;
        if (n == 1) return 1;

        if (memo.containsKey(n)) return memo.get(n);

        long result = fib(n - 1, memo) + fib(n - 2, memo);
        memo.put(n, result);
        return result;
    }
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 10, expected: 55, description: 'fib(10)' },
      { input: 30, expected: 832040, description: 'fib(30) - fast with memoization' },
      { input: 50, expected: 12586269025, description: 'fib(50) - only feasible with memoization' },
    ],
    hints: [
      'Check memo.containsKey(n) before computing',
      'Store the result with memo.put(n, result) after computing',
      'Base cases: n <= 0 returns 0, n == 1 returns 1',
    ],
    concepts: ['memoization', 'HashMap', 'Fibonacci', 'dynamic programming'],
  },
  {
    id: 'java-climbing-stairs',
    title: 'Climbing Stairs (Dynamic Programming)',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Count the number of distinct ways to climb n stairs, taking 1 or 2 steps at a time. This classic DP problem is equivalent to the Fibonacci sequence and teaches bottom-up tabulation.',
    explanation: `To reach step n, you can come from step n-1 (1 step) or step n-2 (2 steps). So the number of ways to reach step n is: ways(n) = ways(n-1) + ways(n-2). This is exactly the Fibonacci recurrence.\n\nThe bottom-up approach builds a dp array where dp[i] = number of ways to reach step i. Initialize dp[1] = 1 and dp[2] = 2, then fill forward. This avoids recursion overhead entirely.\n\nSince each state only depends on the two previous states, you can optimize space from O(n) to O(1) by keeping just two variables. Time complexity is O(n) for both approaches.`,
    instructions: [
      'Return the number of distinct ways to climb n stairs',
      'You can take either 1 or 2 steps at a time',
      'Use bottom-up dynamic programming',
    ],
    starterCode: `public class Solution {
    public static int climbStairs(int n) {
        if (n <= 2) return n;

        // Use bottom-up DP
        // TODO: Implement DP solution
        return 0;
    }
}`,
    solutionCode: `public class Solution {
    public static int climbStairs(int n) {
        if (n <= 2) return n;

        int prev2 = 1;
        int prev1 = 2;

        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}`,
    testCases: [
      { input: 1, expected: 1, description: '1 stair: 1 way' },
      { input: 2, expected: 2, description: '2 stairs: 2 ways (1+1, 2)' },
      { input: 3, expected: 3, description: '3 stairs: 3 ways' },
      { input: 5, expected: 8, description: '5 stairs: 8 ways' },
      { input: 10, expected: 89, description: '10 stairs: 89 ways' },
    ],
    hints: [
      'ways(n) = ways(n-1) + ways(n-2), same as Fibonacci',
      'Only two previous values are needed, so use two variables',
      'Handle base cases: n=1 returns 1, n=2 returns 2',
    ],
    concepts: ['dynamic programming', 'tabulation', 'Fibonacci variant', 'space optimization'],
  },
  {
    id: 'java-coin-change-min',
    title: 'Coin Change (Minimum Coins)',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Find the minimum number of coins needed to make a given amount. This is a classic dynamic programming problem that teaches optimal substructure and overlapping subproblems.',
    explanation: `For each amount from 1 to the target, compute the minimum coins needed by trying every coin denomination. If coin value <= current amount, then dp[amount] = min(dp[amount], dp[amount - coin] + 1).\n\nInitialize dp[0] = 0 (zero coins for zero amount) and all other dp values to amount + 1 (representing infinity/impossible). After filling the table, if dp[amount] > amount, return -1 (impossible to make that amount).\n\nTime complexity is O(amount * coins.length) and space is O(amount). This is a classic unbounded knapsack variant. The bottom-up approach avoids recursion stack issues and is generally preferred for this problem.`,
    instructions: [
      'Given coin denominations and an amount, return the fewest coins needed',
      'If the amount cannot be made, return -1',
      'Each coin denomination can be used unlimited times',
    ],
    starterCode: `import java.util.Arrays;

public class Solution {
    public static int coinChange(int[] coins, int amount) {
        // Create dp array
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        // Fill dp table
        // TODO: Implement coin change DP

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    solutionCode: `import java.util.Arrays;

public class Solution {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    testCases: [
      { input: [[1, 5, 10, 25], 30], expected: 2, description: '30 cents with US coins (25+5)' },
      { input: [[1, 2, 5], 11], expected: 3, description: '11 with [1,2,5] -> 5+5+1' },
      { input: [[2], 3], expected: -1, description: 'Impossible: 3 with only 2-cent coins' },
      { input: [[1], 0], expected: 0, description: 'Zero amount needs zero coins' },
    ],
    hints: [
      'Initialize dp array with amount + 1 (represents infinity)',
      'dp[0] = 0 since zero coins are needed for zero amount',
      'For each amount, try each coin and take the minimum',
    ],
    concepts: ['dynamic programming', 'coin change', 'unbounded knapsack', 'optimal substructure'],
  },

  // ========== UTILITIES ==========
  {
    id: 'java-array-chunking',
    title: 'Array Chunking',
    category: 'utilities',
    difficulty: 'beginner',
    description:
      'Split an array into chunks of a specified size. This utility pattern is used for pagination, batch processing, and dividing work into manageable pieces.',
    explanation: `Array chunking divides an array into smaller arrays of at most size n. The last chunk may have fewer elements if the array length is not evenly divisible by the chunk size.\n\nThe approach iterates through the array with steps of chunk size, extracting subarrays using Arrays.copyOfRange(). In Java, this creates a new array containing elements from the specified range.\n\nThis pattern is used for paginating API results, batch database inserts, parallel processing work distribution, and rendering data in grid layouts. Time complexity is O(n) and space is O(n) for the output.`,
    instructions: [
      'Given an int array and chunk size, split the array into chunks',
      'Each chunk should have at most chunkSize elements',
      'The last chunk may be smaller',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<int[]> chunk(int[] arr, int chunkSize) {
        List<int[]> result = new ArrayList<>();
        // TODO: Split array into chunks of chunkSize
        return result;
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<int[]> chunk(int[] arr, int chunkSize) {
        List<int[]> result = new ArrayList<>();
        for (int i = 0; i < arr.length; i += chunkSize) {
            int end = Math.min(i + chunkSize, arr.length);
            result.add(Arrays.copyOfRange(arr, i, end));
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
        description: 'Chunk larger than array',
      },
      {
        input: [[], 3],
        expected: [],
        description: 'Empty array',
      },
    ],
    hints: [
      'Use Arrays.copyOfRange(arr, from, to) to extract subarrays',
      'Use Math.min(i + chunkSize, arr.length) to handle the last chunk',
      'Step through the array by chunkSize increments',
    ],
    concepts: ['array chunking', 'Arrays.copyOfRange', 'pagination'],
  },
  {
    id: 'java-merge-sorted',
    title: 'Merge Sorted Arrays',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Merge two sorted arrays into a single sorted array using the two-pointer merge technique. This is the core operation in merge sort and is frequently asked in interviews.',
    explanation: `The merge operation uses two pointers, one for each input array. At each step, compare the elements at both pointers and append the smaller one to the result, advancing that pointer.\n\nAfter one array is exhausted, append all remaining elements from the other array. This produces a sorted result in O(m + n) time where m and n are the lengths of the input arrays.\n\nThis merge step is the key to merge sort (O(n log n) sorting), external sorting (merging sorted disk files), and the merge step in problems like merge k sorted lists.`,
    instructions: [
      'Given two sorted int arrays, merge them into a single sorted array',
      'Use two pointers for O(m + n) time complexity',
      'Do not re-sort the merged array',
    ],
    starterCode: `public class Solution {
    public static int[] mergeSorted(int[] a, int[] b) {
        int[] result = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;

        // Merge using two pointers
        // TODO: Implement merge logic

        return result;
    }
}`,
    solutionCode: `public class Solution {
    public static int[] mergeSorted(int[] a, int[] b) {
        int[] result = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;

        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) {
                result[k++] = a[i++];
            } else {
                result[k++] = b[j++];
            }
        }

        while (i < a.length) {
            result[k++] = a[i++];
        }

        while (j < b.length) {
            result[k++] = b[j++];
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
        description: 'Non-overlapping ranges',
      },
      {
        input: [[], [1, 2, 3]],
        expected: [1, 2, 3],
        description: 'Empty first array',
      },
      {
        input: [
          [1, 1, 1],
          [1, 1, 1],
        ],
        expected: [1, 1, 1, 1, 1, 1],
        description: 'All same elements',
      },
    ],
    hints: [
      'Compare a[i] and b[j], pick the smaller one',
      'After the main loop, copy remaining elements from both arrays',
      'Use k++ for the result index, i++ and j++ for input indices',
    ],
    concepts: ['merge', 'two pointers', 'sorted arrays', 'merge sort'],
  },
  {
    id: 'java-group-by-key',
    title: 'Group By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Group an array of strings by their first character using a HashMap. This utility pattern is used for categorization, indexing, and organizing data by a common property.',
    explanation: `Grouping by key is a fundamental data transformation. For each element, compute a key (in this case, the first character) and add the element to the list associated with that key in a Map.\n\nIn Java, use computeIfAbsent() to elegantly handle the creation of new lists. This method checks if the key exists; if not, it creates a new ArrayList and associates it with the key, then returns the list for adding the element.\n\nThis pattern is analogous to SQL GROUP BY, Python's itertools.groupby(), and JavaScript's reduce-based grouping. Time complexity is O(n) for n strings, and it is widely used in data processing pipelines.`,
    instructions: [
      'Given a String array, group the strings by their first character',
      'Return a Map<Character, List<String>>',
      'Use computeIfAbsent() for clean code',
    ],
    starterCode: `import java.util.*;

public class Solution {
    public static Map<Character, List<String>> groupByFirstChar(String[] words) {
        Map<Character, List<String>> groups = new HashMap<>();
        // TODO: Group words by their first character
        return groups;
    }
}`,
    solutionCode: `import java.util.*;

public class Solution {
    public static Map<Character, List<String>> groupByFirstChar(String[] words) {
        Map<Character, List<String>> groups = new HashMap<>();
        for (String word : words) {
            if (word != null && !word.isEmpty()) {
                groups.computeIfAbsent(word.charAt(0), k -> new ArrayList<>()).add(word);
            }
        }
        return groups;
    }
}`,
    testCases: [
      {
        input: ['apple', 'banana', 'avocado', 'blueberry', 'cherry'],
        expected: {
          a: ['apple', 'avocado'],
          b: ['banana', 'blueberry'],
          c: ['cherry'],
        },
        description: 'Group fruits by first letter',
      },
      {
        input: ['dog', 'deer', 'duck'],
        expected: { d: ['dog', 'deer', 'duck'] },
        description: 'All same first letter',
      },
      {
        input: [],
        expected: {},
        description: 'Empty array',
      },
    ],
    hints: [
      'Use word.charAt(0) to get the first character',
      'computeIfAbsent(key, k -> new ArrayList<>()) creates the list if missing',
      'Chain .add(word) after computeIfAbsent',
    ],
    concepts: ['HashMap', 'computeIfAbsent', 'grouping', 'data transformation'],
  },
];
