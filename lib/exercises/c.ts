import type { Exercise } from './types';

export const cExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'c-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through an array using pointer arithmetic, collecting elements at even indices.',
    instructions: [
      'Given an int array and its size, fill result[] with elements at even indices (0, 2, 4, ...)',
      'Return the number of elements written to result',
      'Use pointer arithmetic or index stepping',
    ],
    starterCode: `#include <stdio.h>

int skip_every_other(const int *arr, int size, int *result) {
    int count = 0;
    // TODO: iterate with step 2, copy to result
    return count;
}`,
    solutionCode: `#include <stdio.h>

int skip_every_other(const int *arr, int size, int *result) {
    int count = 0;
    for (int i = 0; i < size; i += 2) {
        result[count++] = arr[i];
    }
    return count;
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6], 6], expected: [1, 3, 5], description: 'Even-length array' },
      { input: [[10, 20, 30, 40, 50], 5], expected: [10, 30, 50], description: 'Odd-length array' },
      { input: [[1], 1], expected: [1], description: 'Single element' },
      { input: [[], 0], expected: [], description: 'Empty array' },
    ],
    hints: [
      'Use i += 2 in the for loop to skip every other index',
      'Pointer version: for (const int *p = arr; p < arr + size; p += 2)',
    ],
    concepts: ['pointer arithmetic', 'array indexing', 'step iteration'],
  },
  {
    id: 'c-reverse-array-iteration',
    title: 'Reverse Array Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Traverse an array from the last element to the first and collect elements in reverse order.',
    instructions: [
      'Given an int array and its size, fill result[] with elements in reverse order',
      'Return the number of elements written',
      'Use a decrementing loop index',
    ],
    starterCode: `#include <stdio.h>

int reverse_iterate(const int *arr, int size, int *result) {
    int count = 0;
    // TODO: iterate from end to start
    return count;
}`,
    solutionCode: `#include <stdio.h>

int reverse_iterate(const int *arr, int size, int *result) {
    int count = 0;
    for (int i = size - 1; i >= 0; i--) {
        result[count++] = arr[i];
    }
    return count;
}`,
    testCases: [
      { input: [[1, 2, 3, 4], 4], expected: [4, 3, 2, 1], description: 'Basic reverse' },
      { input: [[10], 1], expected: [10], description: 'Single element' },
      { input: [[], 0], expected: [], description: 'Empty array' },
    ],
    hints: ['Start i at size - 1 and decrement to 0', 'Be careful with the loop condition: i >= 0'],
    concepts: ['reverse iteration', 'array traversal', 'loop control'],
  },
  {
    id: 'c-matrix-traversal',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Traverse a 2D matrix stored as a flat array using nested loops with row-major order.',
    instructions: [
      'Given a flat array representing an rows x cols matrix, fill result[] with elements in column-major order',
      'Row-major layout: element at (r, c) is arr[r * cols + c]',
      'Return the total number of elements',
    ],
    starterCode: `#include <stdio.h>

int matrix_col_major(const int *matrix, int rows, int cols, int *result) {
    int count = 0;
    // TODO: traverse column by column
    return count;
}`,
    solutionCode: `#include <stdio.h>

int matrix_col_major(const int *matrix, int rows, int cols, int *result) {
    int count = 0;
    for (int c = 0; c < cols; c++) {
        for (int r = 0; r < rows; r++) {
            result[count++] = matrix[r * cols + c];
        }
    }
    return count;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5, 6], 2, 3],
        expected: [1, 4, 2, 5, 3, 6],
        description: '2x3 matrix column-major',
      },
      {
        input: [[1, 2, 3, 4], 2, 2],
        expected: [1, 3, 2, 4],
        description: '2x2 matrix column-major',
      },
    ],
    hints: [
      'Outer loop iterates columns, inner loop iterates rows',
      'Access element at (r, c) with matrix[r * cols + c]',
    ],
    concepts: ['nested loops', '2D arrays', 'row-major layout', 'column-major traversal'],
  },
  {
    id: 'c-sliding-window-max-sum',
    title: 'Sliding Window Maximum Sum',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the maximum sum of any contiguous subarray of size k using the sliding window technique.',
    instructions: [
      'Given an int array, its size, and window size k, return the maximum sum of any k consecutive elements',
      'Use a sliding window: compute initial sum, then slide by adding/removing one element',
      'Return 0 if size < k',
    ],
    starterCode: `#include <stdio.h>

int sliding_window_max_sum(const int *arr, int size, int k) {
    if (size < k) return 0;
    // TODO: compute initial window sum, then slide
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int sliding_window_max_sum(const int *arr, int size, int k) {
    if (size < k) return 0;

    int window_sum = 0;
    for (int i = 0; i < k; i++) {
        window_sum += arr[i];
    }

    int max_sum = window_sum;
    for (int i = k; i < size; i++) {
        window_sum += arr[i] - arr[i - k];
        if (window_sum > max_sum) {
            max_sum = window_sum;
        }
    }
    return max_sum;
}`,
    testCases: [
      { input: [[2, 1, 5, 1, 3, 2], 6, 3], expected: 9, description: 'Max sum of 3 consecutive' },
      { input: [[2, 3, 4, 1, 5], 5, 2], expected: 7, description: 'Window size 2' },
      { input: [[1, 2, 3], 3, 5], expected: 0, description: 'k > size' },
    ],
    hints: [
      'First compute sum of first k elements',
      'Then slide: add arr[i], subtract arr[i - k]',
      'Track the maximum sum seen',
    ],
    concepts: ['sliding window', 'subarray sum', 'optimization'],
  },
  {
    id: 'c-two-pointer-technique',
    title: 'Two Pointer: Pair with Target Sum',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Use the two-pointer technique on a sorted array to find a pair that sums to a target.',
    instructions: [
      'Given a sorted int array, its size, and a target sum, find two elements that add up to target',
      'Store the indices of the pair in result[0] and result[1]',
      'Return 1 if a pair is found, 0 otherwise',
    ],
    starterCode: `#include <stdio.h>

int two_pointer_pair(const int *arr, int size, int target, int *result) {
    // TODO: use left and right pointers moving inward
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int two_pointer_pair(const int *arr, int size, int target, int *result) {
    int left = 0, right = size - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            result[0] = left;
            result[1] = right;
            return 1;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return 0;
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 6], 5, 6], expected: [1, 3], description: 'Pair (2, 4) sums to 6' },
      { input: [[2, 5, 9, 11], 4, 11], expected: [0, 2], description: 'Pair (2, 9) sums to 11' },
      { input: [[1, 2, 3], 3, 10], expected: null, description: 'No pair found' },
    ],
    hints: [
      'Start with left = 0, right = size - 1',
      'If sum < target, move left pointer right',
      'If sum > target, move right pointer left',
    ],
    concepts: ['two pointers', 'sorted array', 'pair sum'],
  },
  {
    id: 'c-custom-step-iteration',
    title: 'Custom Step Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description: 'Iterate through an array with a custom step size, collecting every nth element.',
    instructions: [
      'Given an int array, its size, and a step value, fill result[] with every step-th element starting from index 0',
      'Return the count of elements collected',
      'Handle edge case where step <= 0 by returning 0',
    ],
    starterCode: `#include <stdio.h>

int custom_step(const int *arr, int size, int step, int *result) {
    int count = 0;
    // TODO: collect every step-th element
    return count;
}`,
    solutionCode: `#include <stdio.h>

int custom_step(const int *arr, int size, int step, int *result) {
    if (step <= 0) return 0;
    int count = 0;
    for (int i = 0; i < size; i += step) {
        result[count++] = arr[i];
    }
    return count;
}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 3], expected: [1, 4, 7], description: 'Step of 3' },
      { input: [[10, 20, 30, 40, 50], 5, 2], expected: [10, 30, 50], description: 'Step of 2' },
      { input: [[1, 2, 3], 3, 0], expected: [], description: 'Step 0 returns empty' },
    ],
    hints: ['Use i += step in the for loop', 'Guard against step <= 0 to avoid infinite loops'],
    concepts: ['custom iteration', 'step size', 'edge cases'],
  },

  // ========== RECURSION ==========
  {
    id: 'c-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description: 'Calculate the nth Fibonacci number using simple recursion.',
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2)',
      'Use direct recursion (no memoization needed here)',
    ],
    starterCode: `int fibonacci(int n) {
    // TODO: base cases and recursive case
    return 0;
}`,
    solutionCode: `int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 5, expected: 5, description: 'fib(5)' },
      { input: 10, expected: 55, description: 'fib(10)' },
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n == 1 returns 1',
      'Recursive: return fibonacci(n-1) + fibonacci(n-2)',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci sequence'],
  },
  {
    id: 'c-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description: 'Compute n! using recursion.',
    instructions: [
      'Return n factorial: n! = n * (n-1) * ... * 1',
      'Base case: 0! = 1! = 1',
      'Use long long to handle larger values',
    ],
    starterCode: `long long factorial(int n) {
    // TODO: base case and recursive case
    return 0;
}`,
    solutionCode: `long long factorial(int n) {
    if (n <= 1) return 1;
    return (long long)n * factorial(n - 1);
}`,
    testCases: [
      { input: 0, expected: 1, description: '0!' },
      { input: 1, expected: 1, description: '1!' },
      { input: 5, expected: 120, description: '5!' },
      { input: 10, expected: 3628800, description: '10!' },
    ],
    hints: [
      'Base case: if n <= 1 return 1',
      'Cast to long long to avoid overflow: (long long)n * factorial(n-1)',
    ],
    concepts: ['recursion', 'factorial', 'integer overflow'],
  },
  {
    id: 'c-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    difficulty: 'intermediate',
    description: 'Solve the Tower of Hanoi problem and record each move.',
    instructions: [
      'Move n disks from source peg to destination peg using an auxiliary peg',
      'Record each move as a pair (from, to) in the moves array',
      'Return the total number of moves',
    ],
    starterCode: `#include <stdio.h>

typedef struct { char from; char to; } Move;

int hanoi(int n, char from, char to, char aux, Move *moves, int idx) {
    // TODO: recursively solve Tower of Hanoi
    return idx;
}`,
    solutionCode: `#include <stdio.h>

typedef struct { char from; char to; } Move;

int hanoi(int n, char from, char to, char aux, Move *moves, int idx) {
    if (n == 0) return idx;
    idx = hanoi(n - 1, from, aux, to, moves, idx);
    moves[idx].from = from;
    moves[idx].to = to;
    idx++;
    idx = hanoi(n - 1, aux, to, from, moves, idx);
    return idx;
}`,
    testCases: [
      {
        input: [1, 'A', 'C', 'B'],
        expected: [{ from: 'A', to: 'C' }],
        description: '1 disk',
      },
      {
        input: [2, 'A', 'C', 'B'],
        expected: [
          { from: 'A', to: 'B' },
          { from: 'A', to: 'C' },
          { from: 'B', to: 'C' },
        ],
        description: '2 disks',
      },
    ],
    hints: [
      'Move n-1 disks from source to auxiliary',
      'Move the nth disk from source to destination',
      'Move n-1 disks from auxiliary to destination',
    ],
    concepts: ['recursion', 'Tower of Hanoi', 'divide and conquer'],
  },
  {
    id: 'c-generate-permutations',
    title: 'Generate Permutations',
    category: 'recursion',
    difficulty: 'advanced',
    description: 'Generate all permutations of an integer array using backtracking.',
    instructions: [
      'Given an array and its size, generate all permutations',
      'Use swapping and backtracking to generate each permutation in place',
      'Store each permutation in the output 2D array and return the count',
    ],
    starterCode: `#include <string.h>

void swap(int *a, int *b) {
    int tmp = *a; *a = *b; *b = tmp;
}

void permute_helper(int *arr, int start, int size,
                    int output[][10], int *count) {
    // TODO: generate permutations via backtracking
}

int generate_permutations(int *arr, int size, int output[][10]) {
    int count = 0;
    permute_helper(arr, 0, size, output, &count);
    return count;
}`,
    solutionCode: `#include <string.h>

void swap(int *a, int *b) {
    int tmp = *a; *a = *b; *b = tmp;
}

void permute_helper(int *arr, int start, int size,
                    int output[][10], int *count) {
    if (start == size) {
        memcpy(output[*count], arr, size * sizeof(int));
        (*count)++;
        return;
    }
    for (int i = start; i < size; i++) {
        swap(&arr[start], &arr[i]);
        permute_helper(arr, start + 1, size, output, count);
        swap(&arr[start], &arr[i]);
    }
}

int generate_permutations(int *arr, int size, int output[][10]) {
    int count = 0;
    permute_helper(arr, 0, size, output, &count);
    return count;
}`,
    testCases: [
      {
        input: [[1, 2, 3], 3],
        expected: 6,
        description: '3 elements produce 6 permutations',
      },
      {
        input: [[1, 2], 2],
        expected: 2,
        description: '2 elements produce 2 permutations',
      },
    ],
    hints: [
      'When start == size, copy current arr to output',
      'Swap arr[start] with arr[i] for each i from start to size-1',
      'After recursion, swap back to restore state (backtrack)',
    ],
    concepts: ['backtracking', 'permutations', 'swapping', 'recursion'],
  },
  {
    id: 'c-recursive-binary-search',
    title: 'Recursive Binary Search',
    category: 'recursion',
    difficulty: 'intermediate',
    description: 'Implement binary search using recursion instead of a while loop.',
    instructions: [
      'Given a sorted array, its bounds (left, right), and a target, return the index or -1',
      'Compute mid, compare, and recurse into the appropriate half',
      'Base case: left > right means not found',
    ],
    starterCode: `int binary_search_recursive(const int *arr, int left, int right, int target) {
    // TODO: base case and recursive search
    return -1;
}`,
    solutionCode: `int binary_search_recursive(const int *arr, int left, int right, int target) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return binary_search_recursive(arr, mid + 1, right, target);
    return binary_search_recursive(arr, left, mid - 1, target);
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9], 0, 4, 5], expected: 2, description: 'Find 5 at index 2' },
      { input: [[1, 3, 5, 7, 9], 0, 4, 1], expected: 0, description: 'Find 1 at index 0' },
      { input: [[1, 3, 5, 7, 9], 0, 4, 4], expected: -1, description: 'Element not found' },
    ],
    hints: [
      'Use mid = left + (right - left) / 2 to avoid overflow',
      'If arr[mid] < target, search right half',
      'If arr[mid] > target, search left half',
    ],
    concepts: ['recursion', 'binary search', 'divide and conquer'],
  },

  // ========== SEARCHING ==========
  {
    id: 'c-binary-search',
    title: 'Binary Search (Iterative)',
    category: 'searching',
    difficulty: 'beginner',
    description: 'Implement iterative binary search to find an element in a sorted array.',
    instructions: [
      'Given a sorted int array, its size, and a target value, return the index of target',
      'Return -1 if the target is not found',
      'Use a while loop with left and right bounds',
    ],
    starterCode: `int binary_search(const int *arr, int size, int target) {
    int left = 0, right = size - 1;
    // TODO: implement binary search loop
    return -1;
}`,
    solutionCode: `int binary_search(const int *arr, int size, int target) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}`,
    testCases: [
      { input: [[1, 3, 5, 7, 9, 11], 6, 7], expected: 3, description: 'Find 7' },
      { input: [[1, 3, 5, 7, 9, 11], 6, 1], expected: 0, description: 'Find first element' },
      { input: [[1, 3, 5, 7, 9, 11], 6, 4], expected: -1, description: 'Not found' },
      { input: [[1, 3, 5, 7, 9, 11], 6, 11], expected: 5, description: 'Find last element' },
    ],
    hints: [
      'Use left + (right - left) / 2 instead of (left + right) / 2 to prevent overflow',
      'Continue while left <= right',
      'Narrow the half based on comparison with arr[mid]',
    ],
    concepts: ['binary search', 'iterative', 'O(log n)'],
  },
  {
    id: 'c-binary-search-iterative',
    title: 'Binary Search Insert Position',
    category: 'searching',
    difficulty: 'intermediate',
    description: 'Find the position where a target should be inserted to keep the array sorted.',
    instructions: [
      'Given a sorted array without duplicates, return the index where target would be inserted',
      'If target exists, return its index',
      'This is equivalent to finding the leftmost position >= target',
    ],
    starterCode: `int search_insert(const int *arr, int size, int target) {
    int left = 0, right = size - 1;
    // TODO: binary search for insertion point
    return 0;
}`,
    solutionCode: `int search_insert(const int *arr, int size, int target) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return left;
}`,
    testCases: [
      { input: [[1, 3, 5, 6], 4, 5], expected: 2, description: 'Target exists' },
      { input: [[1, 3, 5, 6], 4, 2], expected: 1, description: 'Insert between' },
      { input: [[1, 3, 5, 6], 4, 7], expected: 4, description: 'Insert at end' },
      { input: [[1, 3, 5, 6], 4, 0], expected: 0, description: 'Insert at start' },
    ],
    hints: [
      'When the loop ends, left is the correct insertion point',
      'The key insight: after the loop, left > right and left is the answer',
    ],
    concepts: ['binary search', 'insertion point', 'lower bound'],
  },
  {
    id: 'c-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'advanced',
    description: 'Search for a target in a sorted array that has been rotated at an unknown pivot.',
    instructions: [
      'The array was sorted in ascending order then rotated (e.g., [4,5,6,7,0,1,2])',
      'Find the index of target or return -1',
      'Achieve O(log n) time by determining which half is sorted',
    ],
    starterCode: `int search_rotated(const int *arr, int size, int target) {
    int left = 0, right = size - 1;
    // TODO: modified binary search for rotated array
    return -1;
}`,
    solutionCode: `int search_rotated(const int *arr, int size, int target) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid])
                right = mid - 1;
            else
                left = mid + 1;
        } else {
            if (target > arr[mid] && target <= arr[right])
                left = mid + 1;
            else
                right = mid - 1;
        }
    }
    return -1;
}`,
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 7, 0], expected: 4, description: 'Find 0 in rotated array' },
      { input: [[4, 5, 6, 7, 0, 1, 2], 7, 3], expected: -1, description: 'Not found' },
      { input: [[1], 1, 1], expected: 0, description: 'Single element found' },
    ],
    hints: [
      'One half of the array is always sorted',
      'Check if arr[left] <= arr[mid] to determine which half is sorted',
      'Then check if target lies in the sorted half',
    ],
    concepts: ['binary search', 'rotated array', 'modified search'],
  },
  {
    id: 'c-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    difficulty: 'intermediate',
    description: 'Find a peak element in an array where a peak is greater than its neighbors.',
    instructions: [
      'A peak element is strictly greater than its neighbors',
      'Assume arr[-1] = arr[n] = -infinity (boundaries are smaller)',
      'Return the index of any peak element using O(log n) binary search',
    ],
    starterCode: `int find_peak(const int *arr, int size) {
    int left = 0, right = size - 1;
    // TODO: binary search for peak
    return -1;
}`,
    solutionCode: `int find_peak(const int *arr, int size) {
    int left = 0, right = size - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < arr[mid + 1])
            left = mid + 1;
        else
            right = mid;
    }
    return left;
}`,
    testCases: [
      { input: [[1, 2, 3, 1], 4], expected: 2, description: 'Peak at index 2' },
      { input: [[1, 2, 1, 3, 5, 6, 4], 7], expected: 5, description: 'Peak at index 5' },
      { input: [[1], 1], expected: 0, description: 'Single element is peak' },
    ],
    hints: [
      'If arr[mid] < arr[mid+1], peak is to the right',
      'Otherwise peak is at mid or to the left',
      'Use left < right (not <=) since we converge to one element',
    ],
    concepts: ['binary search', 'peak finding', 'O(log n)'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'c-stack-operations',
    title: 'Stack Using Array',
    category: 'data-structures',
    difficulty: 'intermediate',
    description: 'Implement a stack (LIFO) data structure using a fixed-size array.',
    instructions: [
      'Implement push, pop, peek, and is_empty operations',
      'Use a struct with an array and a top index',
      'push returns 0 on success, -1 if full; pop returns the value or -1 if empty',
    ],
    starterCode: `#include <stdio.h>
#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;

void stack_init(Stack *s) {
    s->top = -1;
}

int stack_push(Stack *s, int value) {
    // TODO: push value onto stack
    return -1;
}

int stack_pop(Stack *s) {
    // TODO: pop and return top value
    return -1;
}

int stack_peek(const Stack *s) {
    // TODO: return top value without removing
    return -1;
}

int stack_is_empty(const Stack *s) {
    // TODO: return 1 if empty, 0 otherwise
    return 1;
}`,
    solutionCode: `#include <stdio.h>
#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;

void stack_init(Stack *s) {
    s->top = -1;
}

int stack_push(Stack *s, int value) {
    if (s->top >= MAX_SIZE - 1) return -1;
    s->data[++s->top] = value;
    return 0;
}

int stack_pop(Stack *s) {
    if (s->top < 0) return -1;
    return s->data[s->top--];
}

int stack_peek(const Stack *s) {
    if (s->top < 0) return -1;
    return s->data[s->top];
}

int stack_is_empty(const Stack *s) {
    return s->top < 0 ? 1 : 0;
}`,
    testCases: [
      {
        input: ['push 1', 'push 2', 'push 3', 'pop', 'peek'],
        expected: { pop: 3, peek: 2 },
        description: 'Basic push and pop',
      },
      {
        input: ['pop'],
        expected: { pop: -1 },
        description: 'Pop from empty stack',
      },
    ],
    hints: [
      'top = -1 means the stack is empty',
      'Push: increment top, then store value',
      'Pop: read value at top, then decrement',
    ],
    concepts: ['stack', 'LIFO', 'struct', 'array-based'],
  },
  {
    id: 'c-queue-operations',
    title: 'Queue Using Circular Array',
    category: 'data-structures',
    difficulty: 'intermediate',
    description: 'Implement a queue (FIFO) using a circular array buffer.',
    instructions: [
      'Implement enqueue, dequeue, peek, and is_empty',
      'Use front and rear indices with modular arithmetic for wrap-around',
      'Track the count of elements to distinguish full from empty',
    ],
    starterCode: `#include <stdio.h>
#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int front;
    int rear;
    int count;
} Queue;

void queue_init(Queue *q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

int queue_enqueue(Queue *q, int value) {
    // TODO: add value to rear
    return -1;
}

int queue_dequeue(Queue *q) {
    // TODO: remove and return front value
    return -1;
}

int queue_peek(const Queue *q) {
    // TODO: return front value
    return -1;
}

int queue_is_empty(const Queue *q) {
    return q->count == 0;
}`,
    solutionCode: `#include <stdio.h>
#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int front;
    int rear;
    int count;
} Queue;

void queue_init(Queue *q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

int queue_enqueue(Queue *q, int value) {
    if (q->count >= MAX_SIZE) return -1;
    q->rear = (q->rear + 1) % MAX_SIZE;
    q->data[q->rear] = value;
    q->count++;
    return 0;
}

int queue_dequeue(Queue *q) {
    if (q->count == 0) return -1;
    int value = q->data[q->front];
    q->front = (q->front + 1) % MAX_SIZE;
    q->count--;
    return value;
}

int queue_peek(const Queue *q) {
    if (q->count == 0) return -1;
    return q->data[q->front];
}

int queue_is_empty(const Queue *q) {
    return q->count == 0;
}`,
    testCases: [
      {
        input: ['enqueue 1', 'enqueue 2', 'enqueue 3', 'dequeue', 'peek'],
        expected: { dequeue: 1, peek: 2 },
        description: 'FIFO order',
      },
      {
        input: ['dequeue'],
        expected: { dequeue: -1 },
        description: 'Dequeue from empty queue',
      },
    ],
    hints: [
      'Use modular arithmetic: (index + 1) % MAX_SIZE for wrap-around',
      'Track count separately to know if full or empty',
      'rear advances on enqueue, front advances on dequeue',
    ],
    concepts: ['queue', 'FIFO', 'circular buffer', 'modular arithmetic'],
  },
  {
    id: 'c-min-stack',
    title: 'Min Stack',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Design a stack that supports push, pop, and retrieving the minimum element in O(1) time.',
    instructions: [
      'Implement a stack where get_min() always returns the current minimum in O(1)',
      'Use an auxiliary stack that tracks the minimum at each level',
      'All operations (push, pop, get_min) must be O(1)',
    ],
    starterCode: `#include <stdio.h>
#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int min_data[MAX_SIZE];
    int top;
} MinStack;

void min_stack_init(MinStack *s) {
    s->top = -1;
}

int min_stack_push(MinStack *s, int value) {
    // TODO: push value, update min tracking
    return -1;
}

int min_stack_pop(MinStack *s) {
    // TODO: pop value
    return -1;
}

int min_stack_get_min(const MinStack *s) {
    // TODO: return current minimum
    return -1;
}`,
    solutionCode: `#include <stdio.h>
#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int min_data[MAX_SIZE];
    int top;
} MinStack;

void min_stack_init(MinStack *s) {
    s->top = -1;
}

int min_stack_push(MinStack *s, int value) {
    if (s->top >= MAX_SIZE - 1) return -1;
    s->top++;
    s->data[s->top] = value;
    if (s->top == 0 || value < s->min_data[s->top - 1])
        s->min_data[s->top] = value;
    else
        s->min_data[s->top] = s->min_data[s->top - 1];
    return 0;
}

int min_stack_pop(MinStack *s) {
    if (s->top < 0) return -1;
    return s->data[s->top--];
}

int min_stack_get_min(const MinStack *s) {
    if (s->top < 0) return -1;
    return s->min_data[s->top];
}`,
    testCases: [
      {
        input: ['push 3', 'push 5', 'push 2', 'push 1', 'get_min', 'pop', 'get_min'],
        expected: { min1: 1, min2: 2 },
        description: 'Min updates on push and pop',
      },
      {
        input: ['push 2', 'push 0', 'push 3', 'get_min', 'pop', 'get_min'],
        expected: { min1: 0, min2: 0 },
        description: 'Min stays after non-min pop',
      },
    ],
    hints: [
      'Keep a parallel array min_data[] where min_data[i] is the minimum of data[0..i]',
      'On push, min_data[top] = min(value, min_data[top-1])',
      'On pop, the min is automatically correct because you just decrement top',
    ],
    concepts: ['stack', 'min tracking', 'auxiliary storage', 'O(1) operations'],
  },
  {
    id: 'c-hash-table',
    title: 'Hash Table with Chaining',
    category: 'data-structures',
    difficulty: 'intermediate',
    description: 'Implement a basic hash table using separate chaining for collision resolution.',
    instructions: [
      'Implement insert, search, and delete for integer key-value pairs',
      'Use a simple hash function: key % TABLE_SIZE',
      'Resolve collisions with linked list chaining',
    ],
    starterCode: `#include <stdlib.h>
#include <stdio.h>
#define TABLE_SIZE 16

typedef struct Node {
    int key;
    int value;
    struct Node *next;
} Node;

typedef struct {
    Node *buckets[TABLE_SIZE];
} HashTable;

void ht_init(HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++)
        ht->buckets[i] = NULL;
}

int ht_hash(int key) {
    return abs(key) % TABLE_SIZE;
}

void ht_insert(HashTable *ht, int key, int value) {
    // TODO: insert or update key-value pair
}

int ht_search(HashTable *ht, int key, int *value) {
    // TODO: find key, store in *value, return 1 if found, 0 if not
    return 0;
}

int ht_delete(HashTable *ht, int key) {
    // TODO: remove key, return 1 if found, 0 if not
    return 0;
}`,
    solutionCode: `#include <stdlib.h>
#include <stdio.h>
#define TABLE_SIZE 16

typedef struct Node {
    int key;
    int value;
    struct Node *next;
} Node;

typedef struct {
    Node *buckets[TABLE_SIZE];
} HashTable;

void ht_init(HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++)
        ht->buckets[i] = NULL;
}

int ht_hash(int key) {
    return abs(key) % TABLE_SIZE;
}

void ht_insert(HashTable *ht, int key, int value) {
    int idx = ht_hash(key);
    Node *curr = ht->buckets[idx];
    while (curr) {
        if (curr->key == key) {
            curr->value = value;
            return;
        }
        curr = curr->next;
    }
    Node *node = (Node *)malloc(sizeof(Node));
    node->key = key;
    node->value = value;
    node->next = ht->buckets[idx];
    ht->buckets[idx] = node;
}

int ht_search(HashTable *ht, int key, int *value) {
    int idx = ht_hash(key);
    Node *curr = ht->buckets[idx];
    while (curr) {
        if (curr->key == key) {
            *value = curr->value;
            return 1;
        }
        curr = curr->next;
    }
    return 0;
}

int ht_delete(HashTable *ht, int key) {
    int idx = ht_hash(key);
    Node *curr = ht->buckets[idx];
    Node *prev = NULL;
    while (curr) {
        if (curr->key == key) {
            if (prev)
                prev->next = curr->next;
            else
                ht->buckets[idx] = curr->next;
            free(curr);
            return 1;
        }
        prev = curr;
        curr = curr->next;
    }
    return 0;
}`,
    testCases: [
      {
        input: ['insert(1,10)', 'insert(2,20)', 'search(1)', 'search(3)'],
        expected: { search1: 10, search3: -1 },
        description: 'Insert and search',
      },
      {
        input: ['insert(1,10)', 'delete(1)', 'search(1)'],
        expected: { search1: -1 },
        description: 'Delete then search',
      },
    ],
    hints: [
      'Hash index: abs(key) % TABLE_SIZE',
      'Walk the linked list at buckets[idx] to find or insert',
      'For delete, track the previous node to relink',
    ],
    concepts: ['hash table', 'chaining', 'collision resolution', 'malloc/free'],
  },
  {
    id: 'c-linked-list-reverse',
    title: 'Reverse a Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description: 'Reverse a singly linked list in place by rewiring the next pointers.',
    instructions: [
      'Given the head of a singly linked list, reverse it in place',
      'Return the new head (formerly the tail)',
      'Use three pointers: prev, current, next',
    ],
    starterCode: `#include <stdlib.h>

typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode *reverse_list(ListNode *head) {
    // TODO: reverse the linked list in place
    return NULL;
}`,
    solutionCode: `#include <stdlib.h>

typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode *reverse_list(ListNode *head) {
    ListNode *prev = NULL;
    ListNode *curr = head;
    while (curr) {
        ListNode *next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Reverse 5-node list' },
      { input: [1, 2], expected: [2, 1], description: 'Reverse 2-node list' },
      { input: [1], expected: [1], description: 'Single node' },
      { input: [], expected: [], description: 'Empty list' },
    ],
    hints: [
      'Initialize prev = NULL, curr = head',
      'Save curr->next before overwriting it',
      'After loop, prev is the new head',
    ],
    concepts: ['linked list', 'pointer manipulation', 'in-place reversal'],
  },
  {
    id: 'c-min-heap',
    title: 'Min Heap (Priority Queue)',
    category: 'data-structures',
    difficulty: 'advanced',
    description: 'Implement a min-heap that supports insert and extract-min operations.',
    instructions: [
      'Use an array-based binary heap where parent of i is at (i-1)/2',
      'Left child at 2*i+1, right child at 2*i+2',
      'Implement insert (bubble up) and extract_min (bubble down)',
    ],
    starterCode: `#include <stdio.h>
#define MAX_HEAP 256

typedef struct {
    int data[MAX_HEAP];
    int size;
} MinHeap;

void heap_init(MinHeap *h) { h->size = 0; }

void heap_swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int heap_insert(MinHeap *h, int value) {
    // TODO: insert and bubble up
    return -1;
}

int heap_extract_min(MinHeap *h) {
    // TODO: remove min and bubble down
    return -1;
}`,
    solutionCode: `#include <stdio.h>
#define MAX_HEAP 256

typedef struct {
    int data[MAX_HEAP];
    int size;
} MinHeap;

void heap_init(MinHeap *h) { h->size = 0; }

void heap_swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int heap_insert(MinHeap *h, int value) {
    if (h->size >= MAX_HEAP) return -1;
    h->data[h->size] = value;
    int i = h->size;
    h->size++;
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (h->data[i] < h->data[parent]) {
            heap_swap(&h->data[i], &h->data[parent]);
            i = parent;
        } else {
            break;
        }
    }
    return 0;
}

int heap_extract_min(MinHeap *h) {
    if (h->size == 0) return -1;
    int min_val = h->data[0];
    h->size--;
    h->data[0] = h->data[h->size];
    int i = 0;
    while (1) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int smallest = i;
        if (left < h->size && h->data[left] < h->data[smallest])
            smallest = left;
        if (right < h->size && h->data[right] < h->data[smallest])
            smallest = right;
        if (smallest != i) {
            heap_swap(&h->data[i], &h->data[smallest]);
            i = smallest;
        } else {
            break;
        }
    }
    return min_val;
}`,
    testCases: [
      {
        input: ['insert 5', 'insert 3', 'insert 7', 'insert 1', 'extract_min', 'extract_min'],
        expected: { extract1: 1, extract2: 3 },
        description: 'Extract in sorted order',
      },
      {
        input: ['insert 10', 'insert 20', 'insert 15', 'extract_min'],
        expected: { extract1: 10 },
        description: 'Min is always at root',
      },
    ],
    hints: [
      'Bubble up: compare with parent at (i-1)/2 and swap if smaller',
      'Bubble down: compare with children at 2*i+1 and 2*i+2, swap with smallest',
      'Extract: move last element to root, then bubble down',
    ],
    concepts: ['binary heap', 'priority queue', 'bubble up', 'bubble down'],
  },

  // ========== TRAVERSAL ==========
  {
    id: 'c-dfs-tree',
    title: 'DFS Pre-order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement depth-first pre-order traversal on a binary tree using struct nodes.',
    instructions: [
      'Define a TreeNode struct with int value and left/right children',
      'Visit root first, then left subtree, then right subtree',
      'Store visited values in result[] and return the count',
    ],
    starterCode: `#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

void dfs_preorder(TreeNode *node, int *result, int *count) {
    // TODO: pre-order DFS traversal
}`,
    solutionCode: `#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

void dfs_preorder(TreeNode *node, int *result, int *count) {
    if (node == NULL) return;
    result[(*count)++] = node->value;
    dfs_preorder(node->left, result, count);
    dfs_preorder(node->right, result, count);
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: { value: 2, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3],
        description: 'Simple 3-node tree',
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
      'Check for NULL before accessing node',
      'Pre-order: visit, recurse left, recurse right',
      'Pass count by pointer so it persists across calls',
    ],
    concepts: ['DFS', 'pre-order', 'binary tree', 'struct pointers'],
  },
  {
    id: 'c-bfs-tree',
    title: 'BFS Level-Order Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Traverse a binary tree level by level using a queue implemented with an array.',
    instructions: [
      'Use an array-based queue to perform BFS',
      'Process nodes level by level, left to right',
      'Store visited values in result[] and return the count',
    ],
    starterCode: `#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

int bfs_tree(TreeNode *root, int *result) {
    if (root == NULL) return 0;
    // TODO: use an array as queue for BFS
    int count = 0;
    return count;
}`,
    solutionCode: `#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

int bfs_tree(TreeNode *root, int *result) {
    if (root == NULL) return 0;
    TreeNode *queue[256];
    int front = 0, rear = 0;
    int count = 0;

    queue[rear++] = root;
    while (front < rear) {
        TreeNode *node = queue[front++];
        result[count++] = node->value;
        if (node->left) queue[rear++] = node->left;
        if (node->right) queue[rear++] = node->right;
    }
    return count;
}`,
    testCases: [
      {
        input: {
          value: 1,
          left: { value: 2, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3],
        description: 'Simple 3-node tree',
      },
      {
        input: {
          value: 1,
          left: { value: 2, left: { value: 4, left: null, right: null }, right: null },
          right: { value: 3, left: null, right: { value: 5, left: null, right: null } },
        },
        expected: [1, 2, 3, 4, 5],
        description: 'Unbalanced tree',
      },
    ],
    hints: [
      'Use an array of TreeNode* as the queue',
      'front index for dequeue, rear index for enqueue',
      'Enqueue children only if they are not NULL',
    ],
    concepts: ['BFS', 'level-order', 'queue', 'binary tree'],
  },
  {
    id: 'c-dfs-inorder',
    title: 'Inorder Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement in-order traversal of a binary tree (left, root, right).',
    instructions: [
      'Visit left subtree first, then root, then right subtree',
      'For a BST, in-order traversal produces sorted output',
      'Store values in result[] and return count',
    ],
    starterCode: `#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

void inorder(TreeNode *node, int *result, int *count) {
    // TODO: in-order traversal
}`,
    solutionCode: `#include <stdlib.h>

typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

void inorder(TreeNode *node, int *result, int *count) {
    if (node == NULL) return;
    inorder(node->left, result, count);
    result[(*count)++] = node->value;
    inorder(node->right, result, count);
}`,
    testCases: [
      {
        input: {
          value: 2,
          left: { value: 1, left: null, right: null },
          right: { value: 3, left: null, right: null },
        },
        expected: [1, 2, 3],
        description: 'BST produces sorted output',
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
      'Recurse left, then visit current node, then recurse right',
      'For BST, this gives ascending order',
      'Check NULL before recursing',
    ],
    concepts: ['in-order traversal', 'BST', 'sorted output', 'recursion'],
  },
  {
    id: 'c-graph-adjacency',
    title: 'Graph BFS with Adjacency List',
    category: 'traversal',
    difficulty: 'advanced',
    description: 'Perform BFS on a graph represented as an adjacency list using arrays.',
    instructions: [
      'The graph is given as adj[][] where adj[u] contains neighbors of vertex u',
      'adj_size[u] is the number of neighbors of vertex u',
      'Perform BFS from a start vertex, marking visited nodes, and return visited order',
    ],
    starterCode: `#include <stdlib.h>
#define MAX_V 100

int graph_bfs(int adj[][MAX_V], const int *adj_size, int num_vertices,
              int start, int *result) {
    // TODO: BFS from start vertex
    int count = 0;
    return count;
}`,
    solutionCode: `#include <stdlib.h>
#define MAX_V 100

int graph_bfs(int adj[][MAX_V], const int *adj_size, int num_vertices,
              int start, int *result) {
    int visited[MAX_V] = {0};
    int queue[MAX_V];
    int front = 0, rear = 0;
    int count = 0;

    visited[start] = 1;
    queue[rear++] = start;

    while (front < rear) {
        int v = queue[front++];
        result[count++] = v;
        for (int i = 0; i < adj_size[v]; i++) {
            int neighbor = adj[v][i];
            if (!visited[neighbor]) {
                visited[neighbor] = 1;
                queue[rear++] = neighbor;
            }
        }
    }
    return count;
}`,
    testCases: [
      {
        input: {
          adj: [
            [1, 2],
            [0, 3],
            [0, 3],
            [1, 2],
          ],
          adj_size: [2, 2, 2, 2],
          num_vertices: 4,
          start: 0,
        },
        expected: [0, 1, 2, 3],
        description: '4-vertex graph BFS from 0',
      },
    ],
    hints: [
      'Use a visited[] array initialized to 0',
      'Mark a vertex as visited when enqueuing, not when dequeuing',
      'Process all neighbors of the current vertex',
    ],
    concepts: ['graph', 'BFS', 'adjacency list', 'visited array'],
  },
  {
    id: 'c-level-order-traversal',
    title: 'Level Order with Level Separation',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Perform level-order traversal and return the values grouped by level.',
    instructions: [
      'Traverse the tree level by level',
      'Store values into a 2D result array where result[level] contains nodes at that level',
      'Return the number of levels; level_sizes[i] stores the count for level i',
    ],
    starterCode: `#include <stdlib.h>
#define MAX_NODES 256

typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

int level_order(TreeNode *root, int result[][MAX_NODES], int *level_sizes) {
    if (root == NULL) return 0;
    // TODO: BFS with level separation
    int num_levels = 0;
    return num_levels;
}`,
    solutionCode: `#include <stdlib.h>
#define MAX_NODES 256

typedef struct TreeNode {
    int value;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

int level_order(TreeNode *root, int result[][MAX_NODES], int *level_sizes) {
    if (root == NULL) return 0;
    TreeNode *queue[MAX_NODES];
    int front = 0, rear = 0;
    int num_levels = 0;

    queue[rear++] = root;
    while (front < rear) {
        int level_count = rear - front;
        level_sizes[num_levels] = level_count;
        for (int i = 0; i < level_count; i++) {
            TreeNode *node = queue[front++];
            result[num_levels][i] = node->value;
            if (node->left) queue[rear++] = node->left;
            if (node->right) queue[rear++] = node->right;
        }
        num_levels++;
    }
    return num_levels;
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
    ],
    hints: [
      'At each level, the queue holds exactly the nodes for that level',
      'Capture level_count = rear - front before processing',
      'Process level_count nodes, enqueuing their children',
    ],
    concepts: ['BFS', 'level-order', 'level grouping', 'binary tree'],
  },

  // ========== COMBINATORICS ==========
  {
    id: 'c-generate-subsets',
    title: 'Generate All Subsets',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description: 'Generate all subsets (power set) of an integer array using bit manipulation.',
    instructions: [
      'Given an array of n elements, generate all 2^n subsets',
      'Use bitmask approach: for each number from 0 to 2^n - 1, include element i if bit i is set',
      'Store subsets in output and their sizes in subset_sizes; return total count',
    ],
    starterCode: `#include <stdio.h>

int generate_subsets(const int *arr, int n, int output[][10], int *subset_sizes) {
    int count = 0;
    // TODO: generate subsets using bitmask
    return count;
}`,
    solutionCode: `#include <stdio.h>

int generate_subsets(const int *arr, int n, int output[][10], int *subset_sizes) {
    int total = 1 << n;
    int count = 0;
    for (int mask = 0; mask < total; mask++) {
        int sz = 0;
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                output[count][sz++] = arr[i];
            }
        }
        subset_sizes[count] = sz;
        count++;
    }
    return count;
}`,
    testCases: [
      {
        input: [[1, 2, 3], 3],
        expected: 8,
        description: '3 elements produce 8 subsets',
      },
      {
        input: [[1, 2], 2],
        expected: 4,
        description: '2 elements produce 4 subsets',
      },
    ],
    hints: [
      'Total subsets = 1 << n (which is 2^n)',
      'Check bit i: mask & (1 << i)',
      'Each mask value corresponds to one unique subset',
    ],
    concepts: ['power set', 'bit manipulation', 'subsets', 'bitmask'],
  },
  {
    id: 'c-generate-combinations',
    title: 'Generate Combinations (n choose k)',
    category: 'combinatorics',
    difficulty: 'advanced',
    description:
      'Generate all combinations of k elements from an array of n elements using backtracking.',
    instructions: [
      'Given an array of size n and integer k, generate all C(n, k) combinations',
      'Use backtracking: maintain a current combination buffer and a start index',
      'Store each combination in output and return total count',
    ],
    starterCode: `#include <string.h>

void combine_helper(const int *arr, int n, int k, int start,
                    int *current, int depth,
                    int output[][10], int *count) {
    // TODO: backtracking to generate combinations
}

int generate_combinations(const int *arr, int n, int k, int output[][10]) {
    int current[10];
    int count = 0;
    combine_helper(arr, n, k, 0, current, 0, output, &count);
    return count;
}`,
    solutionCode: `#include <string.h>

void combine_helper(const int *arr, int n, int k, int start,
                    int *current, int depth,
                    int output[][10], int *count) {
    if (depth == k) {
        memcpy(output[*count], current, k * sizeof(int));
        (*count)++;
        return;
    }
    for (int i = start; i < n; i++) {
        current[depth] = arr[i];
        combine_helper(arr, n, k, i + 1, current, depth + 1, output, count);
    }
}

int generate_combinations(const int *arr, int n, int k, int output[][10]) {
    int current[10];
    int count = 0;
    combine_helper(arr, n, k, 0, current, 0, output, &count);
    return count;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4], 4, 2],
        expected: 6,
        description: 'C(4,2) = 6 combinations',
      },
      {
        input: [[1, 2, 3], 3, 3],
        expected: 1,
        description: 'C(3,3) = 1 combination',
      },
    ],
    hints: [
      'When depth == k, a full combination is ready',
      'Start from index "start" to avoid duplicates and maintain order',
      'Pass i + 1 as the new start to only pick later elements',
    ],
    concepts: ['combinations', 'backtracking', 'n choose k', 'recursion'],
  },
  {
    id: 'c-cartesian-product',
    title: 'Cartesian Product of Two Arrays',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description: 'Compute the Cartesian product of two integer arrays.',
    instructions: [
      'Given arrays A (size m) and B (size n), produce all m*n pairs (a, b)',
      'Store pairs in result as [a, b] and return total count',
      'Use nested loops',
    ],
    starterCode: `#include <stdio.h>

int cartesian_product(const int *a, int m, const int *b, int n,
                      int result[][2]) {
    int count = 0;
    // TODO: generate all pairs
    return count;
}`,
    solutionCode: `#include <stdio.h>

int cartesian_product(const int *a, int m, const int *b, int n,
                      int result[][2]) {
    int count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result[count][0] = a[i];
            result[count][1] = b[j];
            count++;
        }
    }
    return count;
}`,
    testCases: [
      {
        input: [[1, 2], 2, [3, 4], 2],
        expected: [
          [1, 3],
          [1, 4],
          [2, 3],
          [2, 4],
        ],
        description: '2x2 Cartesian product',
      },
      {
        input: [[1], 1, [2, 3, 4], 3],
        expected: [
          [1, 2],
          [1, 3],
          [1, 4],
        ],
        description: '1x3 Cartesian product',
      },
    ],
    hints: [
      'Outer loop over array A, inner loop over array B',
      'Total pairs = m * n',
      'Store each pair as result[count] = {a[i], b[j]}',
    ],
    concepts: ['Cartesian product', 'nested loops', 'pair generation'],
  },

  // ========== MEMOIZATION ==========
  {
    id: 'c-memoize-fibonacci',
    title: 'Memoized Fibonacci',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Use an array cache to avoid redundant recursive calls when computing Fibonacci numbers.',
    instructions: [
      'Implement Fibonacci with memoization using a pre-allocated array',
      'Initialize cache entries to -1 (uncalculated)',
      'Before recursing, check if the result is already cached',
    ],
    starterCode: `#include <string.h>

long long fib_memo(int n, long long *cache) {
    // TODO: check cache, compute, store, and return
    return 0;
}

long long fibonacci_memoized(int n) {
    long long cache[100];
    memset(cache, -1, sizeof(cache));
    return fib_memo(n, cache);
}`,
    solutionCode: `#include <string.h>

long long fib_memo(int n, long long *cache) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    if (cache[n] != -1) return cache[n];
    cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache);
    return cache[n];
}

long long fibonacci_memoized(int n) {
    long long cache[100];
    memset(cache, -1, sizeof(cache));
    return fib_memo(n, cache);
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 10, expected: 55, description: 'fib(10)' },
      { input: 40, expected: 102334155, description: 'fib(40) - fast with memo' },
    ],
    hints: [
      'memset(cache, -1, sizeof(cache)) initializes all bytes to 0xFF',
      "For long long, checking cache[n] != -1 works since -1 in two's complement is all 1-bits",
      'Store result before returning: cache[n] = result',
    ],
    concepts: ['memoization', 'dynamic programming', 'caching', 'Fibonacci'],
  },
  {
    id: 'c-climbing-stairs',
    title: 'Climbing Stairs (DP)',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Count the number of distinct ways to climb n stairs, taking 1 or 2 steps at a time.',
    instructions: [
      'Use bottom-up dynamic programming with an array',
      'dp[i] = number of ways to reach step i',
      'dp[0] = 1, dp[1] = 1, dp[i] = dp[i-1] + dp[i-2]',
    ],
    starterCode: `int climbing_stairs(int n) {
    if (n <= 1) return 1;
    int dp[100];
    // TODO: fill dp table bottom-up
    return 0;
}`,
    solutionCode: `int climbing_stairs(int n) {
    if (n <= 1) return 1;
    int dp[100];
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
    testCases: [
      { input: 2, expected: 2, description: '2 stairs: (1+1) or (2)' },
      { input: 3, expected: 3, description: '3 stairs: (1+1+1), (1+2), (2+1)' },
      { input: 5, expected: 8, description: '5 stairs' },
      { input: 10, expected: 89, description: '10 stairs' },
    ],
    hints: [
      'This is essentially the Fibonacci sequence',
      'dp[i] = dp[i-1] (took 1 step) + dp[i-2] (took 2 steps)',
      'Base cases: 1 way for 0 stairs, 1 way for 1 stair',
    ],
    concepts: ['dynamic programming', 'bottom-up', 'Fibonacci variant'],
  },
  {
    id: 'c-coin-change',
    title: 'Coin Change (DP)',
    category: 'memoization',
    difficulty: 'advanced',
    description: 'Find the minimum number of coins needed to make a given amount.',
    instructions: [
      'Given coin denominations and an amount, find the fewest coins to make that amount',
      'Use a DP array where dp[i] = minimum coins for amount i',
      'Return -1 if the amount cannot be made',
    ],
    starterCode: `#include <limits.h>

int coin_change(const int *coins, int num_coins, int amount) {
    int dp[10001];
    // TODO: fill dp table
    return -1;
}`,
    solutionCode: `#include <limits.h>

int coin_change(const int *coins, int num_coins, int amount) {
    int dp[10001];
    for (int i = 0; i <= amount; i++)
        dp[i] = amount + 1;
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < num_coins; j++) {
            if (coins[j] <= i && dp[i - coins[j]] + 1 < dp[i]) {
                dp[i] = dp[i - coins[j]] + 1;
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    testCases: [
      { input: [[1, 5, 10, 25], 4, 30], expected: 2, description: '25 + 5 = 30' },
      { input: [[1, 2, 5], 3, 11], expected: 3, description: '5 + 5 + 1 = 11' },
      { input: [[2], 1, 3], expected: -1, description: 'Cannot make 3 with only 2s' },
      { input: [[1], 1, 0], expected: 0, description: 'Amount 0 needs 0 coins' },
    ],
    hints: [
      'Initialize dp[i] = amount + 1 as a sentinel (impossible large value)',
      'dp[0] = 0 because 0 amount needs 0 coins',
      'For each amount i and each coin, dp[i] = min(dp[i], dp[i - coin] + 1)',
    ],
    concepts: ['dynamic programming', 'coin change', 'optimization', 'bottom-up DP'],
  },

  // ========== UTILITIES ==========
  {
    id: 'c-array-chunking',
    title: 'Array Chunking',
    category: 'utilities',
    difficulty: 'beginner',
    description: 'Split an array into chunks of a specified size.',
    instructions: [
      'Given an array, its size, and chunk_size, split into sub-arrays of chunk_size',
      'The last chunk may have fewer elements',
      'Store chunks in output[][] and chunk sizes in chunk_lens[]; return number of chunks',
    ],
    starterCode: `#include <stdio.h>

int array_chunk(const int *arr, int size, int chunk_size,
                int output[][100], int *chunk_lens) {
    int num_chunks = 0;
    // TODO: split array into chunks
    return num_chunks;
}`,
    solutionCode: `#include <stdio.h>

int array_chunk(const int *arr, int size, int chunk_size,
                int output[][100], int *chunk_lens) {
    int num_chunks = 0;
    for (int i = 0; i < size; i += chunk_size) {
        int len = 0;
        for (int j = i; j < i + chunk_size && j < size; j++) {
            output[num_chunks][len++] = arr[j];
        }
        chunk_lens[num_chunks] = len;
        num_chunks++;
    }
    return num_chunks;
}`,
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], 5, 2],
        expected: [[1, 2], [3, 4], [5]],
        description: 'Chunk size 2 with remainder',
      },
      {
        input: [[1, 2, 3, 4], 4, 2],
        expected: [
          [1, 2],
          [3, 4],
        ],
        description: 'Even split',
      },
      {
        input: [[1, 2, 3], 3, 5],
        expected: [[1, 2, 3]],
        description: 'Chunk bigger than array',
      },
    ],
    hints: [
      'Outer loop steps by chunk_size',
      'Inner loop copies up to chunk_size elements (or remaining)',
      'Use j < i + chunk_size && j < size to handle the last chunk',
    ],
    concepts: ['array splitting', 'chunking', 'nested loops'],
  },
  {
    id: 'c-merge-sorted',
    title: 'Merge Two Sorted Arrays',
    category: 'utilities',
    difficulty: 'intermediate',
    description: 'Merge two sorted integer arrays into a single sorted array.',
    instructions: [
      'Given two sorted arrays and their sizes, merge them into result[]',
      'Use two pointers, one for each array, advancing the smaller element',
      'Return the total number of elements in the merged result',
    ],
    starterCode: `#include <stdio.h>

int merge_sorted(const int *a, int m, const int *b, int n, int *result) {
    int i = 0, j = 0, k = 0;
    // TODO: merge using two pointers
    return k;
}`,
    solutionCode: `#include <stdio.h>

int merge_sorted(const int *a, int m, const int *b, int n, int *result) {
    int i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        if (a[i] <= b[j])
            result[k++] = a[i++];
        else
            result[k++] = b[j++];
    }
    while (i < m) result[k++] = a[i++];
    while (j < n) result[k++] = b[j++];
    return k;
}`,
    testCases: [
      {
        input: [[1, 3, 5], 3, [2, 4, 6], 3],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Interleaved merge',
      },
      {
        input: [[1, 2, 3], 3, [4, 5, 6], 3],
        expected: [1, 2, 3, 4, 5, 6],
        description: 'No interleaving needed',
      },
      {
        input: [[], 0, [1, 2], 2],
        expected: [1, 2],
        description: 'One empty array',
      },
    ],
    hints: [
      'Compare a[i] and b[j], take the smaller one',
      'After one array is exhausted, copy remaining from the other',
      'Use separate while loops for the leftover elements',
    ],
    concepts: ['merge', 'two pointers', 'sorted arrays'],
  },
  {
    id: 'c-string-reverse',
    title: 'Reverse String In Place',
    category: 'utilities',
    difficulty: 'beginner',
    description: 'Reverse a C string in place using pointer swapping.',
    instructions: [
      'Given a null-terminated char array, reverse it in place',
      'Use two pointers (or indices) from both ends swapping towards the center',
      'Do not allocate any additional string',
    ],
    starterCode: `#include <string.h>

void reverse_string(char *str) {
    int len = strlen(str);
    // TODO: swap characters from both ends toward center
}`,
    solutionCode: `#include <string.h>

void reverse_string(char *str) {
    int len = strlen(str);
    int left = 0, right = len - 1;
    while (left < right) {
        char tmp = str[left];
        str[left] = str[right];
        str[right] = tmp;
        left++;
        right--;
    }
}`,
    testCases: [
      { input: 'hello', expected: 'olleh', description: 'Reverse hello' },
      { input: 'abcde', expected: 'edcba', description: 'Reverse odd-length' },
      { input: 'ab', expected: 'ba', description: 'Reverse 2 chars' },
      { input: 'a', expected: 'a', description: 'Single char unchanged' },
      { input: '', expected: '', description: 'Empty string' },
    ],
    hints: [
      'Use left = 0, right = len - 1',
      'Swap str[left] and str[right], then move both inward',
      'Stop when left >= right',
    ],
    concepts: ['string manipulation', 'in-place', 'two pointers', 'swap'],
  },
];
