import type { Exercise } from './types';

export const goExercises: Exercise[] = [
  // ========== ITERATION PATTERNS ==========
  {
    id: 'go-skip-every-other',
    title: 'Skip Every Other Element',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description:
      'Iterate through a slice while skipping every other element using an index-based for loop.',
    instructions: [
      'Given a slice of integers, return a new slice containing only elements at even indices (0, 2, 4, ...)',
      'Use a for loop with a step of 2',
      'Return an empty slice if the input is empty',
    ],
    starterCode: `package main

func SkipEveryOther(arr []int) []int {
	result := []int{}
	// TODO: Use a for loop with step 2 to collect elements at even indices
	return result
}`,
    solutionCode: `package main

func SkipEveryOther(arr []int) []int {
	result := []int{}
	for i := 0; i < len(arr); i += 2 {
		result = append(result, arr[i])
	}
	return result
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5, 6], expected: [1, 3, 5], description: 'Even-length slice' },
      { input: [10, 20, 30, 40, 50], expected: [10, 30, 50], description: 'Odd-length slice' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty slice' },
    ],
    hints: [
      'Use for i := 0; i < len(arr); i += 2 to step by 2',
      'append(result, arr[i]) adds an element to the slice',
    ],
    concepts: ['for loop', 'slice indexing', 'step increment'],
  },
  {
    id: 'go-reverse-slice',
    title: 'Reverse Slice Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description: 'Iterate through a slice in reverse order to build a reversed copy.',
    instructions: [
      'Given a slice of integers, return a new slice with elements in reverse order',
      'Iterate from the last element to the first',
      'Do not modify the original slice',
    ],
    starterCode: `package main

func ReverseSlice(arr []int) []int {
	result := []int{}
	// TODO: Iterate from last index to first and append each element
	return result
}`,
    solutionCode: `package main

func ReverseSlice(arr []int) []int {
	result := []int{}
	for i := len(arr) - 1; i >= 0; i-- {
		result = append(result, arr[i])
	}
	return result
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1], description: 'Basic reversal' },
      { input: [10, 20], expected: [20, 10], description: 'Two elements' },
      { input: [1], expected: [1], description: 'Single element' },
      { input: [], expected: [], description: 'Empty slice' },
    ],
    hints: ['Start from len(arr) - 1 and decrement to 0', 'Use i >= 0 as the loop condition'],
    concepts: ['reverse iteration', 'slice building', 'for loop'],
  },
  {
    id: 'go-matrix-traversal',
    title: 'Matrix Traversal',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description: 'Traverse a 2D matrix using nested for loops and collect all elements row by row.',
    instructions: [
      'Given a 2D slice (matrix), return all elements flattened into a single slice',
      'Use nested for loops with range',
      'Traverse row by row, left to right',
    ],
    starterCode: `package main

func FlattenMatrix(matrix [][]int) []int {
	result := []int{}
	// TODO: Use nested for-range loops to traverse the matrix
	return result
}`,
    solutionCode: `package main

func FlattenMatrix(matrix [][]int) []int {
	result := []int{}
	for _, row := range matrix {
		for _, val := range row {
			result = append(result, val)
		}
	}
	return result
}`,
    testCases: [
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        description: '3x3 matrix',
      },
      {
        input: [
          [1, 2],
          [3, 4],
        ],
        expected: [1, 2, 3, 4],
        description: '2x2 matrix',
      },
      {
        input: [[1]],
        expected: [1],
        description: 'Single element matrix',
      },
      {
        input: [],
        expected: [],
        description: 'Empty matrix',
      },
    ],
    hints: [
      'Use for _, row := range matrix for outer loop',
      'Use for _, val := range row for inner loop',
      'Append each val to result',
    ],
    concepts: ['nested loops', 'range', '2D slices', 'matrix traversal'],
  },
  {
    id: 'go-sliding-window-max-sum',
    title: 'Sliding Window Max Sum',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Find the maximum sum of any contiguous subarray of a given size using the sliding window technique.',
    instructions: [
      'Given a slice of integers and a window size k, find the maximum sum of any contiguous subarray of length k',
      'Use the sliding window approach: compute the first window sum, then slide by adding the next element and removing the first',
      'Return 0 if the slice is shorter than k',
    ],
    starterCode: `package main

func MaxSumSubarray(arr []int, k int) int {
	if len(arr) < k {
		return 0
	}
	// TODO: Compute the sum of the first window
	// TODO: Slide the window and track the maximum sum
	return 0
}`,
    solutionCode: `package main

func MaxSumSubarray(arr []int, k int) int {
	if len(arr) < k {
		return 0
	}

	windowSum := 0
	for i := 0; i < k; i++ {
		windowSum += arr[i]
	}

	maxSum := windowSum
	for i := k; i < len(arr); i++ {
		windowSum += arr[i] - arr[i-k]
		if windowSum > maxSum {
			maxSum = windowSum
		}
	}
	return maxSum
}`,
    testCases: [
      { input: { arr: [2, 1, 5, 1, 3, 2], k: 3 }, expected: 9, description: 'Window of 3' },
      { input: { arr: [2, 3, 4, 1, 5], k: 2 }, expected: 7, description: 'Window of 2' },
      { input: { arr: [1, 2, 3], k: 3 }, expected: 6, description: 'Window equals length' },
      { input: { arr: [1], k: 2 }, expected: 0, description: 'Slice shorter than k' },
    ],
    hints: [
      'First compute the sum of elements 0..k-1',
      'Slide: add arr[i], subtract arr[i-k]',
      'Track the max across all window positions',
    ],
    concepts: ['sliding window', 'subarray sum', 'optimization'],
  },
  {
    id: 'go-two-pointer',
    title: 'Two Pointer Technique',
    category: 'iteration-patterns',
    difficulty: 'intermediate',
    description:
      'Use two pointers to determine if a sorted slice contains two numbers that sum to a target.',
    instructions: [
      'Given a sorted slice of integers and a target sum, return true if any two distinct elements sum to the target',
      'Use two pointers: one at the start, one at the end',
      'Move the left pointer right if the sum is too small, or the right pointer left if the sum is too large',
    ],
    starterCode: `package main

func TwoSumSorted(arr []int, target int) bool {
	// TODO: Use two pointers from both ends
	// Move pointers inward based on current sum vs target
	return false
}`,
    solutionCode: `package main

func TwoSumSorted(arr []int, target int) bool {
	left, right := 0, len(arr)-1
	for left < right {
		sum := arr[left] + arr[right]
		if sum == target {
			return true
		} else if sum < target {
			left++
		} else {
			right--
		}
	}
	return false
}`,
    testCases: [
      { input: { arr: [1, 2, 3, 4, 6], target: 6 }, expected: true, description: '2 + 4 = 6' },
      {
        input: { arr: [2, 5, 9, 11], target: 11 },
        expected: true,
        description: '2 + 9 = 11',
      },
      {
        input: { arr: [1, 2, 3, 4], target: 10 },
        expected: false,
        description: 'No pair sums to 10',
      },
      { input: { arr: [1, 3], target: 4 }, expected: true, description: '1 + 3 = 4' },
    ],
    hints: [
      'Initialize left := 0, right := len(arr)-1',
      'If arr[left]+arr[right] < target, move left++',
      'If arr[left]+arr[right] > target, move right--',
    ],
    concepts: ['two pointers', 'sorted array', 'pair sum'],
  },
  {
    id: 'go-range-iteration',
    title: 'Range-Based Iteration',
    category: 'iteration-patterns',
    difficulty: 'beginner',
    description: 'Use Go range to iterate over a slice and build an index-value pair list.',
    instructions: [
      'Given a slice of strings, return a slice of formatted strings like "0: apple", "1: banana"',
      'Use for i, v := range to get both index and value',
      'Format each entry as "<index>: <value>"',
    ],
    starterCode: `package main

import "fmt"

func IndexedElements(arr []string) []string {
	result := []string{}
	// TODO: Use range to get index and value, format as "index: value"
	return result
}`,
    solutionCode: `package main

import "fmt"

func IndexedElements(arr []string) []string {
	result := []string{}
	for i, v := range arr {
		result = append(result, fmt.Sprintf("%d: %s", i, v))
	}
	return result
}`,
    testCases: [
      {
        input: ['apple', 'banana', 'cherry'],
        expected: ['0: apple', '1: banana', '2: cherry'],
        description: 'Three strings',
      },
      {
        input: ['hello'],
        expected: ['0: hello'],
        description: 'Single string',
      },
      { input: [], expected: [], description: 'Empty slice' },
    ],
    hints: [
      'for i, v := range arr gives index and value',
      'fmt.Sprintf("%d: %s", i, v) formats the string',
    ],
    concepts: ['range', 'fmt.Sprintf', 'string formatting'],
  },

  // ========== RECURSION ==========
  {
    id: 'go-fibonacci-recursive',
    title: 'Fibonacci (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description: 'Calculate the nth Fibonacci number using simple recursion.',
    instructions: [
      'Return the nth Fibonacci number (0-indexed)',
      'fib(0) = 0, fib(1) = 1',
      'Use recursion: fib(n) = fib(n-1) + fib(n-2)',
    ],
    starterCode: `package main

func Fibonacci(n int) int {
	// TODO: Base cases for n <= 0 and n == 1
	// TODO: Recursive case: Fibonacci(n-1) + Fibonacci(n-2)
	return 0
}`,
    solutionCode: `package main

func Fibonacci(n int) int {
	if n <= 0 {
		return 0
	}
	if n == 1 {
		return 1
	}
	return Fibonacci(n-1) + Fibonacci(n-2)
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 5, expected: 5, description: 'fib(5)' },
      { input: 10, expected: 55, description: 'fib(10)' },
    ],
    hints: [
      'Base cases: n <= 0 returns 0, n == 1 returns 1',
      'Recursive step: Fibonacci(n-1) + Fibonacci(n-2)',
    ],
    concepts: ['recursion', 'base case', 'Fibonacci sequence'],
  },
  {
    id: 'go-factorial-recursive',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    difficulty: 'beginner',
    description: 'Calculate the factorial of a number using recursion.',
    instructions: [
      'Return n! (n factorial)',
      'Factorial(5) = 5 * 4 * 3 * 2 * 1 = 120',
      'Base case: Factorial(0) = Factorial(1) = 1',
    ],
    starterCode: `package main

func Factorial(n int) int {
	// TODO: Base case
	// TODO: Recursive case: n * Factorial(n-1)
	return 0
}`,
    solutionCode: `package main

func Factorial(n int) int {
	if n <= 1 {
		return 1
	}
	return n * Factorial(n-1)
}`,
    testCases: [
      { input: 0, expected: 1, description: '0!' },
      { input: 1, expected: 1, description: '1!' },
      { input: 5, expected: 120, description: '5!' },
      { input: 10, expected: 3628800, description: '10!' },
    ],
    hints: ['Base case: if n <= 1 return 1', 'Recursive: n * Factorial(n-1)'],
    concepts: ['recursion', 'factorial', 'base case'],
  },
  {
    id: 'go-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    difficulty: 'intermediate',
    description: 'Solve the Tower of Hanoi problem recursively and return the sequence of moves.',
    instructions: [
      'Move n disks from source peg to destination peg using an auxiliary peg',
      'Return a slice of move descriptions like "Move disk 1 from A to C"',
      'Rules: only move one disk at a time, never place a larger disk on a smaller one',
    ],
    starterCode: `package main

import "fmt"

func TowerOfHanoi(n int, source, dest, aux string) []string {
	moves := []string{}
	// TODO: Base case - move single disk
	// TODO: Recursive case - move n-1 to aux, move nth to dest, move n-1 from aux to dest
	return moves
}`,
    solutionCode: `package main

import "fmt"

func TowerOfHanoi(n int, source, dest, aux string) []string {
	moves := []string{}
	var solve func(n int, src, dst, tmp string)
	solve = func(n int, src, dst, tmp string) {
		if n == 1 {
			moves = append(moves, fmt.Sprintf("Move disk 1 from %s to %s", src, dst))
			return
		}
		solve(n-1, src, tmp, dst)
		moves = append(moves, fmt.Sprintf("Move disk %d from %s to %s", n, src, dst))
		solve(n-1, tmp, dst, src)
	}
	solve(n, source, dest, aux)
	return moves
}`,
    testCases: [
      {
        input: { n: 1, source: 'A', dest: 'C', aux: 'B' },
        expected: ['Move disk 1 from A to C'],
        description: 'Single disk',
      },
      {
        input: { n: 2, source: 'A', dest: 'C', aux: 'B' },
        expected: ['Move disk 1 from A to B', 'Move disk 2 from A to C', 'Move disk 1 from B to C'],
        description: 'Two disks',
      },
      {
        input: { n: 3, source: 'A', dest: 'C', aux: 'B' },
        expected: [
          'Move disk 1 from A to C',
          'Move disk 2 from A to B',
          'Move disk 1 from C to B',
          'Move disk 3 from A to C',
          'Move disk 1 from B to A',
          'Move disk 2 from B to C',
          'Move disk 1 from A to C',
        ],
        description: 'Three disks',
      },
    ],
    hints: [
      'Use a closure (var solve func(...)) for the recursive helper',
      'Base case: n == 1, directly move the disk',
      'Recursive: move n-1 to aux, move disk n to dest, move n-1 from aux to dest',
    ],
    concepts: ['recursion', 'Tower of Hanoi', 'closures', 'divide and conquer'],
  },
  {
    id: 'go-generate-permutations',
    title: 'Generate Permutations',
    category: 'recursion',
    difficulty: 'advanced',
    description: 'Generate all permutations of a slice of integers using recursive backtracking.',
    instructions: [
      'Given a slice of distinct integers, return all possible permutations',
      'Use backtracking: swap elements and recurse',
      'Return the permutations in any order',
    ],
    starterCode: `package main

func Permutations(nums []int) [][]int {
	result := [][]int{}
	// TODO: Implement recursive backtracking to generate all permutations
	// Hint: use a helper that swaps elements at each position
	return result
}`,
    solutionCode: `package main

func Permutations(nums []int) [][]int {
	result := [][]int{}
	var backtrack func(start int)
	backtrack = func(start int) {
		if start == len(nums) {
			perm := make([]int, len(nums))
			copy(perm, nums)
			result = append(result, perm)
			return
		}
		for i := start; i < len(nums); i++ {
			nums[start], nums[i] = nums[i], nums[start]
			backtrack(start + 1)
			nums[start], nums[i] = nums[i], nums[start]
		}
	}
	backtrack(0)
	return result
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
      'Use a closure with start index to track which position to fill',
      'Swap nums[start] with nums[i] for each i from start to end',
      'After recursion, swap back (backtrack)',
      'Use copy() to make a snapshot of the current permutation',
    ],
    concepts: ['backtracking', 'permutations', 'recursion', 'swap'],
  },
  {
    id: 'go-flatten-nested',
    title: 'Flatten Nested Slices',
    category: 'recursion',
    difficulty: 'intermediate',
    description:
      'Recursively flatten a nested structure represented as a slice of integers and sub-slices into a single flat slice.',
    instructions: [
      'Given a nested structure (represented as interface{} containing int or []interface{}), flatten it to []int',
      'Use type assertion and recursion to handle arbitrary nesting depth',
      'Return elements in the order they appear',
    ],
    starterCode: `package main

func Flatten(nested []interface{}) []int {
	result := []int{}
	// TODO: Iterate over nested, type-assert each element
	// If int, append to result; if []interface{}, recurse
	return result
}`,
    solutionCode: `package main

func Flatten(nested []interface{}) []int {
	result := []int{}
	for _, item := range nested {
		switch v := item.(type) {
		case int:
			result = append(result, v)
		case []interface{}:
			result = append(result, Flatten(v)...)
		}
	}
	return result
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
        description: 'One level deep',
      },
      {
        input: [1, 2, 3],
        expected: [1, 2, 3],
        description: 'Already flat',
      },
    ],
    hints: [
      'Use a type switch: switch v := item.(type)',
      'case int: append directly',
      'case []interface{}: recurse and spread with ...',
    ],
    concepts: ['recursion', 'type assertion', 'type switch', 'interface{}', 'variadic append'],
  },

  // ========== SEARCHING ==========
  {
    id: 'go-binary-search',
    title: 'Binary Search (Recursive)',
    category: 'searching',
    difficulty: 'beginner',
    description: 'Implement binary search recursively on a sorted slice.',
    instructions: [
      'Given a sorted slice and a target, return the index of the target or -1 if not found',
      'Use recursion with low and high bounds',
      'Compare the middle element to the target and recurse on the appropriate half',
    ],
    starterCode: `package main

func BinarySearch(arr []int, target int) int {
	// TODO: Call a recursive helper with low=0, high=len(arr)-1
	return -1
}`,
    solutionCode: `package main

func BinarySearch(arr []int, target int) int {
	var search func(low, high int) int
	search = func(low, high int) int {
		if low > high {
			return -1
		}
		mid := low + (high-low)/2
		if arr[mid] == target {
			return mid
		} else if arr[mid] < target {
			return search(mid+1, high)
		}
		return search(low, mid-1)
	}
	return search(0, len(arr)-1)
}`,
    testCases: [
      { input: { arr: [1, 3, 5, 7, 9], target: 5 }, expected: 2, description: 'Found in middle' },
      { input: { arr: [1, 3, 5, 7, 9], target: 1 }, expected: 0, description: 'Found at start' },
      { input: { arr: [1, 3, 5, 7, 9], target: 9 }, expected: 4, description: 'Found at end' },
      { input: { arr: [1, 3, 5, 7, 9], target: 4 }, expected: -1, description: 'Not found' },
      { input: { arr: [], target: 1 }, expected: -1, description: 'Empty slice' },
    ],
    hints: [
      'mid := low + (high-low)/2 avoids overflow',
      'If arr[mid] == target, return mid',
      'If arr[mid] < target, search the right half',
    ],
    concepts: ['binary search', 'recursion', 'divide and conquer'],
  },
  {
    id: 'go-binary-search-iterative',
    title: 'Binary Search (Iterative)',
    category: 'searching',
    difficulty: 'intermediate',
    description: 'Implement binary search iteratively using a while loop.',
    instructions: [
      'Given a sorted slice and a target, return the index using an iterative approach',
      'Use a for loop with low and high pointers',
      'Return -1 if the target is not found',
    ],
    starterCode: `package main

func BinarySearchIterative(arr []int, target int) int {
	low, high := 0, len(arr)-1
	// TODO: Loop while low <= high
	// Compute mid, compare, and adjust low or high
	return -1
}`,
    solutionCode: `package main

func BinarySearchIterative(arr []int, target int) int {
	low, high := 0, len(arr)-1
	for low <= high {
		mid := low + (high-low)/2
		if arr[mid] == target {
			return mid
		} else if arr[mid] < target {
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return -1
}`,
    testCases: [
      { input: { arr: [2, 4, 6, 8, 10], target: 6 }, expected: 2, description: 'Found' },
      { input: { arr: [2, 4, 6, 8, 10], target: 5 }, expected: -1, description: 'Not found' },
      { input: { arr: [1], target: 1 }, expected: 0, description: 'Single element found' },
      { input: { arr: [1], target: 2 }, expected: -1, description: 'Single element not found' },
    ],
    hints: [
      'for low <= high is the Go equivalent of while',
      'Adjust low = mid + 1 or high = mid - 1',
    ],
    concepts: ['binary search', 'iterative', 'for loop'],
  },
  {
    id: 'go-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    difficulty: 'advanced',
    description: 'Search for a target in a sorted array that has been rotated at an unknown pivot.',
    instructions: [
      'A sorted array [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2] after rotation',
      'Find the index of the target value, or -1 if not found',
      'Use modified binary search with O(log n) time complexity',
    ],
    starterCode: `package main

func SearchRotated(nums []int, target int) int {
	// TODO: Modified binary search
	// Determine which half is sorted, then decide which half to search
	return -1
}`,
    solutionCode: `package main

func SearchRotated(nums []int, target int) int {
	low, high := 0, len(nums)-1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] == target {
			return mid
		}
		// Left half is sorted
		if nums[low] <= nums[mid] {
			if target >= nums[low] && target < nums[mid] {
				high = mid - 1
			} else {
				low = mid + 1
			}
		} else {
			// Right half is sorted
			if target > nums[mid] && target <= nums[high] {
				low = mid + 1
			} else {
				high = mid - 1
			}
		}
	}
	return -1
}`,
    testCases: [
      {
        input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
        expected: 4,
        description: 'Target in rotated part',
      },
      { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }, expected: -1, description: 'Not found' },
      { input: { nums: [1], target: 1 }, expected: 0, description: 'Single element found' },
      { input: { nums: [3, 1], target: 1 }, expected: 1, description: 'Two elements rotated' },
    ],
    hints: [
      'One half of the array is always sorted',
      'Check if nums[low] <= nums[mid] to determine which half is sorted',
      'Check if target falls within the sorted half',
    ],
    concepts: ['binary search', 'rotated array', 'modified search'],
  },
  {
    id: 'go-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    difficulty: 'intermediate',
    description: 'Find a peak element in a slice where the element is greater than its neighbors.',
    instructions: [
      'A peak element is strictly greater than its neighbors',
      'Return the index of any peak element',
      'Use binary search for O(log n) time complexity',
      'Assume nums[-1] and nums[len] are negative infinity',
    ],
    starterCode: `package main

func FindPeakElement(nums []int) int {
	// TODO: Use binary search to find a peak
	// If mid element > mid+1, peak is on the left (including mid)
	// Otherwise, peak is on the right
	return 0
}`,
    solutionCode: `package main

func FindPeakElement(nums []int) int {
	low, high := 0, len(nums)-1
	for low < high {
		mid := low + (high-low)/2
		if nums[mid] > nums[mid+1] {
			high = mid
		} else {
			low = mid + 1
		}
	}
	return low
}`,
    testCases: [
      { input: [1, 2, 3, 1], expected: 2, description: 'Peak at index 2' },
      { input: [1, 2, 1, 3, 5, 6, 4], expected: 5, description: 'Peak at index 5' },
      { input: [1], expected: 0, description: 'Single element is peak' },
      { input: [2, 1], expected: 0, description: 'First element is peak' },
    ],
    hints: [
      'Use for low < high (not low <= high)',
      'If nums[mid] > nums[mid+1], the peak is at mid or to its left',
      'Otherwise the peak is to the right of mid',
    ],
    concepts: ['binary search', 'peak finding', 'O(log n)'],
  },

  // ========== DATA STRUCTURES ==========
  {
    id: 'go-stack-operations',
    title: 'Stack Using Slice',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a stack data structure using a Go slice with Push, Pop, Peek, and IsEmpty operations.',
    instructions: [
      'Implement a Stack struct backed by a []int slice',
      'Push adds to the top (end of slice)',
      'Pop removes and returns from the top; return -1 if empty',
      'Peek returns the top element without removing; return -1 if empty',
      'IsEmpty returns true if the stack has no elements',
    ],
    starterCode: `package main

type Stack struct {
	items []int
}

func NewStack() *Stack {
	return &Stack{items: []int{}}
}

func (s *Stack) Push(val int) {
	// TODO: Append val to items
}

func (s *Stack) Pop() int {
	// TODO: Remove and return the last element, or -1 if empty
	return -1
}

func (s *Stack) Peek() int {
	// TODO: Return the last element without removing, or -1 if empty
	return -1
}

func (s *Stack) IsEmpty() bool {
	// TODO: Return true if items is empty
	return true
}`,
    solutionCode: `package main

type Stack struct {
	items []int
}

func NewStack() *Stack {
	return &Stack{items: []int{}}
}

func (s *Stack) Push(val int) {
	s.items = append(s.items, val)
}

func (s *Stack) Pop() int {
	if len(s.items) == 0 {
		return -1
	}
	top := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return top
}

func (s *Stack) Peek() int {
	if len(s.items) == 0 {
		return -1
	}
	return s.items[len(s.items)-1]
}

func (s *Stack) IsEmpty() bool {
	return len(s.items) == 0
}`,
    testCases: [
      {
        input: { operations: ['push 1', 'push 2', 'peek', 'pop', 'pop', 'isEmpty'] },
        expected: [2, 2, 1, true],
        description: 'Push, peek, pop sequence',
      },
      {
        input: { operations: ['isEmpty', 'push 5', 'isEmpty'] },
        expected: [true, false],
        description: 'Empty check before and after push',
      },
      {
        input: { operations: ['pop'] },
        expected: [-1],
        description: 'Pop from empty stack',
      },
    ],
    hints: [
      's.items = append(s.items, val) to push',
      's.items = s.items[:len(s.items)-1] to shrink slice by one',
      'Always check len(s.items) == 0 before accessing',
    ],
    concepts: ['stack', 'LIFO', 'slice operations', 'methods', 'pointer receiver'],
  },
  {
    id: 'go-queue-operations',
    title: 'Queue Using Slice',
    category: 'data-structures',
    difficulty: 'intermediate',
    description:
      'Implement a queue data structure using a Go slice with Enqueue, Dequeue, Front, and IsEmpty operations.',
    instructions: [
      'Implement a Queue struct backed by a []int slice',
      'Enqueue adds to the back (end of slice)',
      'Dequeue removes and returns from the front; return -1 if empty',
      'Front returns the front element without removing; return -1 if empty',
      'IsEmpty returns true if the queue has no elements',
    ],
    starterCode: `package main

type Queue struct {
	items []int
}

func NewQueue() *Queue {
	return &Queue{items: []int{}}
}

func (q *Queue) Enqueue(val int) {
	// TODO: Append val to items
}

func (q *Queue) Dequeue() int {
	// TODO: Remove and return the first element, or -1 if empty
	return -1
}

func (q *Queue) Front() int {
	// TODO: Return the first element without removing, or -1 if empty
	return -1
}

func (q *Queue) IsEmpty() bool {
	// TODO: Return true if items is empty
	return true
}`,
    solutionCode: `package main

type Queue struct {
	items []int
}

func NewQueue() *Queue {
	return &Queue{items: []int{}}
}

func (q *Queue) Enqueue(val int) {
	q.items = append(q.items, val)
}

func (q *Queue) Dequeue() int {
	if len(q.items) == 0 {
		return -1
	}
	front := q.items[0]
	q.items = q.items[1:]
	return front
}

func (q *Queue) Front() int {
	if len(q.items) == 0 {
		return -1
	}
	return q.items[0]
}

func (q *Queue) IsEmpty() bool {
	return len(q.items) == 0
}`,
    testCases: [
      {
        input: { operations: ['enqueue 1', 'enqueue 2', 'front', 'dequeue', 'dequeue', 'isEmpty'] },
        expected: [1, 1, 2, true],
        description: 'Enqueue, front, dequeue sequence',
      },
      {
        input: { operations: ['isEmpty', 'enqueue 10', 'isEmpty'] },
        expected: [true, false],
        description: 'Empty check',
      },
      {
        input: { operations: ['dequeue'] },
        expected: [-1],
        description: 'Dequeue from empty queue',
      },
    ],
    hints: [
      'q.items = append(q.items, val) to enqueue',
      'q.items = q.items[1:] to remove from front',
      'Check len(q.items) == 0 before accessing',
    ],
    concepts: ['queue', 'FIFO', 'slice operations', 'methods'],
  },
  {
    id: 'go-min-stack',
    title: 'Min Stack',
    category: 'data-structures',
    difficulty: 'advanced',
    description:
      'Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    instructions: [
      'Implement MinStack with Push, Pop, Top, and GetMin methods',
      'All operations should be O(1) time complexity',
      'Use an auxiliary stack to track minimums',
      'GetMin returns the smallest element currently in the stack',
    ],
    starterCode: `package main

type MinStack struct {
	stack    []int
	minStack []int
}

func NewMinStack() *MinStack {
	return &MinStack{stack: []int{}, minStack: []int{}}
}

func (ms *MinStack) Push(val int) {
	// TODO: Push to main stack and update minStack
}

func (ms *MinStack) Pop() {
	// TODO: Pop from main stack and update minStack if needed
}

func (ms *MinStack) Top() int {
	// TODO: Return top element
	return 0
}

func (ms *MinStack) GetMin() int {
	// TODO: Return current minimum in O(1)
	return 0
}`,
    solutionCode: `package main

type MinStack struct {
	stack    []int
	minStack []int
}

func NewMinStack() *MinStack {
	return &MinStack{stack: []int{}, minStack: []int{}}
}

func (ms *MinStack) Push(val int) {
	ms.stack = append(ms.stack, val)
	if len(ms.minStack) == 0 || val <= ms.minStack[len(ms.minStack)-1] {
		ms.minStack = append(ms.minStack, val)
	}
}

func (ms *MinStack) Pop() {
	if len(ms.stack) == 0 {
		return
	}
	top := ms.stack[len(ms.stack)-1]
	ms.stack = ms.stack[:len(ms.stack)-1]
	if top == ms.minStack[len(ms.minStack)-1] {
		ms.minStack = ms.minStack[:len(ms.minStack)-1]
	}
}

func (ms *MinStack) Top() int {
	if len(ms.stack) == 0 {
		return 0
	}
	return ms.stack[len(ms.stack)-1]
}

func (ms *MinStack) GetMin() int {
	if len(ms.minStack) == 0 {
		return 0
	}
	return ms.minStack[len(ms.minStack)-1]
}`,
    testCases: [
      {
        input: { operations: ['push -2', 'push 0', 'push -3', 'getMin', 'pop', 'top', 'getMin'] },
        expected: [-3, 0, -2],
        description: 'LeetCode example',
      },
      {
        input: { operations: ['push 1', 'push 2', 'getMin', 'pop', 'getMin'] },
        expected: [1, 1],
        description: 'Min stays after pop',
      },
    ],
    hints: [
      'Keep a separate minStack that tracks the current minimum',
      'Only push to minStack when the new value is <= current min',
      'Pop from minStack when the popped value equals the current min',
    ],
    concepts: ['stack', 'min tracking', 'O(1) operations', 'auxiliary data structure'],
  },
  {
    id: 'go-map-operations',
    title: 'Map Operations',
    category: 'data-structures',
    difficulty: 'beginner',
    description: 'Practice common Go map operations: counting word frequency in a string slice.',
    instructions: [
      'Given a slice of words, return a map[string]int with each word and its frequency',
      'Use a Go map to count occurrences',
      'Initialize the map with make(map[string]int)',
    ],
    starterCode: `package main

func WordFrequency(words []string) map[string]int {
	freq := make(map[string]int)
	// TODO: Iterate over words and count each occurrence
	return freq
}`,
    solutionCode: `package main

func WordFrequency(words []string) map[string]int {
	freq := make(map[string]int)
	for _, word := range words {
		freq[word]++
	}
	return freq
}`,
    testCases: [
      {
        input: ['go', 'is', 'go', 'fun', 'go'],
        expected: { go: 3, is: 1, fun: 1 },
        description: 'Repeated words',
      },
      {
        input: ['a', 'b', 'c'],
        expected: { a: 1, b: 1, c: 1 },
        description: 'All unique',
      },
      {
        input: [],
        expected: {},
        description: 'Empty slice',
      },
    ],
    hints: [
      'freq[word]++ increments the count (zero value for int is 0)',
      'No need to check if key exists before incrementing',
    ],
    concepts: ['map', 'frequency counting', 'range', 'zero value'],
  },
  {
    id: 'go-linked-list-reverse',
    title: 'Reverse a Linked List',
    category: 'data-structures',
    difficulty: 'intermediate',
    description: 'Reverse a singly linked list iteratively.',
    instructions: [
      'Define a ListNode struct with Val int and Next *ListNode',
      'Implement ReverseList that takes a head pointer and returns the new head',
      'Use three pointers: prev, current, and next',
      'Iterate through the list, reversing each link',
    ],
    starterCode: `package main

type ListNode struct {
	Val  int
	Next *ListNode
}

func ReverseList(head *ListNode) *ListNode {
	// TODO: Use prev, current, next pointers to reverse the list
	return nil
}`,
    solutionCode: `package main

type ListNode struct {
	Val  int
	Next *ListNode
}

func ReverseList(head *ListNode) *ListNode {
	var prev *ListNode
	current := head
	for current != nil {
		next := current.Next
		current.Next = prev
		prev = current
		current = next
	}
	return prev
}`,
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        expected: [5, 4, 3, 2, 1],
        description: 'Reverse 5 nodes',
      },
      {
        input: [1, 2],
        expected: [2, 1],
        description: 'Reverse 2 nodes',
      },
      {
        input: [1],
        expected: [1],
        description: 'Single node',
      },
      {
        input: [],
        expected: [],
        description: 'Empty list',
      },
    ],
    hints: [
      'var prev *ListNode initializes to nil',
      'Save current.Next before overwriting it',
      'Move all three pointers forward each iteration',
    ],
    concepts: ['linked list', 'pointer manipulation', 'in-place reversal'],
  },
  {
    id: 'go-heap-operations',
    title: 'Min Heap Implementation',
    category: 'data-structures',
    difficulty: 'advanced',
    description: 'Implement a min heap using a slice with Insert and ExtractMin operations.',
    instructions: [
      'Implement a MinHeap struct backed by a []int slice',
      'Insert adds an element and bubbles it up to maintain the heap property',
      'ExtractMin removes and returns the smallest element, then heapifies down',
      'The parent of index i is at (i-1)/2; children are at 2*i+1 and 2*i+2',
    ],
    starterCode: `package main

type MinHeap struct {
	data []int
}

func NewMinHeap() *MinHeap {
	return &MinHeap{data: []int{}}
}

func (h *MinHeap) Insert(val int) {
	// TODO: Append val and bubble up
}

func (h *MinHeap) ExtractMin() int {
	// TODO: Remove and return the minimum element, heapify down
	return -1
}

func (h *MinHeap) bubbleUp(index int) {
	// TODO: Swap with parent while smaller
}

func (h *MinHeap) heapifyDown(index int) {
	// TODO: Swap with smallest child while larger
}`,
    solutionCode: `package main

type MinHeap struct {
	data []int
}

func NewMinHeap() *MinHeap {
	return &MinHeap{data: []int{}}
}

func (h *MinHeap) Insert(val int) {
	h.data = append(h.data, val)
	h.bubbleUp(len(h.data) - 1)
}

func (h *MinHeap) ExtractMin() int {
	if len(h.data) == 0 {
		return -1
	}
	min := h.data[0]
	last := len(h.data) - 1
	h.data[0] = h.data[last]
	h.data = h.data[:last]
	if len(h.data) > 0 {
		h.heapifyDown(0)
	}
	return min
}

func (h *MinHeap) bubbleUp(index int) {
	for index > 0 {
		parent := (index - 1) / 2
		if h.data[index] < h.data[parent] {
			h.data[index], h.data[parent] = h.data[parent], h.data[index]
			index = parent
		} else {
			break
		}
	}
}

func (h *MinHeap) heapifyDown(index int) {
	size := len(h.data)
	for {
		smallest := index
		left := 2*index + 1
		right := 2*index + 2
		if left < size && h.data[left] < h.data[smallest] {
			smallest = left
		}
		if right < size && h.data[right] < h.data[smallest] {
			smallest = right
		}
		if smallest == index {
			break
		}
		h.data[index], h.data[smallest] = h.data[smallest], h.data[index]
		index = smallest
	}
}`,
    testCases: [
      {
        input: {
          operations: [
            'insert 3',
            'insert 1',
            'insert 2',
            'extractMin',
            'extractMin',
            'extractMin',
          ],
        },
        expected: [1, 2, 3],
        description: 'Insert and extract in order',
      },
      {
        input: { operations: ['insert 5', 'insert 3', 'insert 7', 'insert 1', 'extractMin'] },
        expected: [1],
        description: 'Extract after multiple inserts',
      },
      {
        input: { operations: ['extractMin'] },
        expected: [-1],
        description: 'Extract from empty heap',
      },
    ],
    hints: [
      'Parent index: (i-1)/2, left child: 2*i+1, right child: 2*i+2',
      'Bubble up: swap with parent while current < parent',
      'Heapify down: swap with smallest child while current > child',
    ],
    concepts: ['min heap', 'priority queue', 'bubble up', 'heapify down', 'complete binary tree'],
  },

  // ========== TRAVERSAL ==========
  {
    id: 'go-dfs-tree',
    title: 'DFS Tree Traversal (Pre-Order)',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement depth-first search to traverse a binary tree in pre-order.',
    instructions: [
      'Given a TreeNode with Val, Left, and Right fields, return values in pre-order',
      'Pre-order: visit root, then left subtree, then right subtree',
      'Use recursion',
    ],
    starterCode: `package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func PreorderTraversal(root *TreeNode) []int {
	result := []int{}
	// TODO: Implement recursive pre-order traversal
	return result
}`,
    solutionCode: `package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func PreorderTraversal(root *TreeNode) []int {
	result := []int{}
	var traverse func(node *TreeNode)
	traverse = func(node *TreeNode) {
		if node == nil {
			return
		}
		result = append(result, node.Val)
		traverse(node.Left)
		traverse(node.Right)
	}
	traverse(root)
	return result
}`,
    testCases: [
      {
        input: { val: 1, left: { val: 2, left: { val: 4 }, right: { val: 5 } }, right: { val: 3 } },
        expected: [1, 2, 4, 5, 3],
        description: 'Complete tree pre-order',
      },
      {
        input: { val: 1, right: { val: 2, left: { val: 3 } } },
        expected: [1, 2, 3],
        description: 'Skewed tree',
      },
      {
        input: null,
        expected: [],
        description: 'Empty tree',
      },
    ],
    hints: [
      'Use a closure (var traverse func(*TreeNode)) for the recursive helper',
      'Visit current node first, then left, then right',
      'Check for nil before processing a node',
    ],
    concepts: ['DFS', 'pre-order traversal', 'binary tree', 'recursion'],
  },
  {
    id: 'go-bfs-tree',
    title: 'BFS Tree Traversal (Level Order)',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement breadth-first search to traverse a binary tree level by level.',
    instructions: [
      'Given a TreeNode, return all values in level order (left to right, top to bottom)',
      'Use a queue (slice) to process nodes level by level',
      'Enqueue root first, then dequeue and enqueue children',
    ],
    starterCode: `package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func LevelOrderFlat(root *TreeNode) []int {
	result := []int{}
	if root == nil {
		return result
	}
	// TODO: Use a queue to perform BFS
	return result
}`,
    solutionCode: `package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func LevelOrderFlat(root *TreeNode) []int {
	result := []int{}
	if root == nil {
		return result
	}
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		result = append(result, node.Val)
		if node.Left != nil {
			queue = append(queue, node.Left)
		}
		if node.Right != nil {
			queue = append(queue, node.Right)
		}
	}
	return result
}`,
    testCases: [
      {
        input: {
          val: 3,
          left: { val: 9 },
          right: { val: 20, left: { val: 15 }, right: { val: 7 } },
        },
        expected: [3, 9, 20, 15, 7],
        description: 'Level order traversal',
      },
      {
        input: { val: 1 },
        expected: [1],
        description: 'Single node',
      },
      {
        input: null,
        expected: [],
        description: 'Empty tree',
      },
    ],
    hints: [
      'Use a slice as a queue: dequeue from front with queue[1:]',
      'Enqueue with append(queue, node)',
      'Process left child before right child',
    ],
    concepts: ['BFS', 'level order', 'queue', 'binary tree'],
  },
  {
    id: 'go-dfs-inorder',
    title: 'Inorder Traversal',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Implement inorder traversal of a binary tree (left, root, right).',
    instructions: [
      'Given a TreeNode, return values in inorder sequence',
      'Inorder: visit left subtree, then root, then right subtree',
      'For a BST, inorder traversal returns elements in sorted order',
    ],
    starterCode: `package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func InorderTraversal(root *TreeNode) []int {
	result := []int{}
	// TODO: Implement recursive inorder traversal
	return result
}`,
    solutionCode: `package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func InorderTraversal(root *TreeNode) []int {
	result := []int{}
	var traverse func(node *TreeNode)
	traverse = func(node *TreeNode) {
		if node == nil {
			return
		}
		traverse(node.Left)
		result = append(result, node.Val)
		traverse(node.Right)
	}
	traverse(root)
	return result
}`,
    testCases: [
      {
        input: { val: 1, left: { val: 2, left: { val: 4 }, right: { val: 5 } }, right: { val: 3 } },
        expected: [4, 2, 5, 1, 3],
        description: 'Inorder of complete tree',
      },
      {
        input: { val: 2, left: { val: 1 }, right: { val: 3 } },
        expected: [1, 2, 3],
        description: 'BST inorder gives sorted',
      },
      {
        input: null,
        expected: [],
        description: 'Empty tree',
      },
    ],
    hints: [
      'Recurse left, then append current, then recurse right',
      'For a BST the result will be sorted',
    ],
    concepts: ['inorder traversal', 'binary tree', 'BST property', 'recursion'],
  },
  {
    id: 'go-bfs-traversal',
    title: 'Graph BFS Traversal',
    category: 'traversal',
    difficulty: 'advanced',
    description: 'Implement breadth-first search on a graph represented as an adjacency list.',
    instructions: [
      'Given a graph as map[int][]int (adjacency list) and a start node, return nodes in BFS order',
      'Use a queue and a visited set to avoid revisiting nodes',
      'Process neighbors in the order they appear in the adjacency list',
    ],
    starterCode: `package main

func GraphBFS(graph map[int][]int, start int) []int {
	result := []int{}
	visited := make(map[int]bool)
	// TODO: Use a queue for BFS; mark nodes visited before enqueuing
	return result
}`,
    solutionCode: `package main

func GraphBFS(graph map[int][]int, start int) []int {
	result := []int{}
	visited := make(map[int]bool)
	queue := []int{start}
	visited[start] = true

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		result = append(result, node)

		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, neighbor)
			}
		}
	}
	return result
}`,
    testCases: [
      {
        input: {
          graph: { 0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2] },
          start: 0,
        },
        expected: [0, 1, 2, 3],
        description: 'Simple graph BFS from node 0',
      },
      {
        input: {
          graph: { 1: [2, 3], 2: [1], 3: [1, 4], 4: [3] },
          start: 1,
        },
        expected: [1, 2, 3, 4],
        description: 'Linear-ish graph',
      },
    ],
    hints: [
      'Mark start as visited before entering the loop',
      'Mark neighbors as visited when enqueuing, not when dequeuing',
      'Use map[int]bool as a set for visited tracking',
    ],
    concepts: ['BFS', 'graph traversal', 'adjacency list', 'visited set', 'queue'],
  },
  {
    id: 'go-level-order-traversal',
    title: 'Level Order Traversal (Grouped)',
    category: 'traversal',
    difficulty: 'intermediate',
    description: 'Return tree values grouped by level as a slice of slices.',
    instructions: [
      'Given a TreeNode, return values grouped by level: [[root], [level1...], [level2...]]',
      'Use BFS with level tracking by processing all nodes at the current level before moving to the next',
      'Each inner slice contains all values at that depth',
    ],
    starterCode: `package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func LevelOrder(root *TreeNode) [][]int {
	result := [][]int{}
	if root == nil {
		return result
	}
	// TODO: BFS with level grouping
	return result
}`,
    solutionCode: `package main

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func LevelOrder(root *TreeNode) [][]int {
	result := [][]int{}
	if root == nil {
		return result
	}
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		levelSize := len(queue)
		level := []int{}
		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			level = append(level, node.Val)
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		result = append(result, level)
	}
	return result
}`,
    testCases: [
      {
        input: {
          val: 3,
          left: { val: 9 },
          right: { val: 20, left: { val: 15 }, right: { val: 7 } },
        },
        expected: [[3], [9, 20], [15, 7]],
        description: 'Three levels',
      },
      {
        input: { val: 1 },
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
      'Capture levelSize := len(queue) before inner loop',
      'Process exactly levelSize nodes in the inner loop',
      'After inner loop, append the level slice to result',
    ],
    concepts: ['BFS', 'level order', 'grouped traversal', 'queue'],
  },

  // ========== COMBINATORICS ==========
  {
    id: 'go-generate-subsets',
    title: 'Generate All Subsets',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description: 'Generate all subsets (the power set) of a slice of distinct integers.',
    instructions: [
      'Given a slice of distinct integers, return all possible subsets including the empty set',
      'Use backtracking or iterative bit manipulation',
      'The order of subsets does not matter',
    ],
    starterCode: `package main

func Subsets(nums []int) [][]int {
	result := [][]int{}
	// TODO: Generate all subsets using backtracking
	return result
}`,
    solutionCode: `package main

func Subsets(nums []int) [][]int {
	result := [][]int{}
	var backtrack func(start int, current []int)
	backtrack = func(start int, current []int) {
		subset := make([]int, len(current))
		copy(subset, current)
		result = append(result, subset)
		for i := start; i < len(nums); i++ {
			backtrack(i+1, append(current, nums[i]))
		}
	}
	backtrack(0, []int{})
	return result
}`,
    testCases: [
      {
        input: [1, 2, 3],
        expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        description: 'Three elements',
      },
      {
        input: [0],
        expected: [[], [0]],
        description: 'Single element',
      },
      {
        input: [],
        expected: [[]],
        description: 'Empty set',
      },
    ],
    hints: [
      'At each step, add the current subset to results',
      'For each element from start to end, include it and recurse',
      'Use copy() to snapshot the current slice before appending to results',
    ],
    concepts: ['subsets', 'power set', 'backtracking', 'combinatorics'],
  },
  {
    id: 'go-generate-combinations',
    title: 'Generate Combinations',
    category: 'combinatorics',
    difficulty: 'advanced',
    description: 'Generate all combinations of k elements from numbers 1 to n.',
    instructions: [
      'Given n and k, return all combinations of k numbers chosen from 1 to n',
      'Use backtracking with a start index to avoid duplicates',
      'Each combination should be in ascending order',
    ],
    starterCode: `package main

func Combine(n int, k int) [][]int {
	result := [][]int{}
	// TODO: Backtrack to generate all C(n,k) combinations
	return result
}`,
    solutionCode: `package main

func Combine(n int, k int) [][]int {
	result := [][]int{}
	var backtrack func(start int, current []int)
	backtrack = func(start int, current []int) {
		if len(current) == k {
			combo := make([]int, k)
			copy(combo, current)
			result = append(result, combo)
			return
		}
		for i := start; i <= n; i++ {
			backtrack(i+1, append(current, i))
		}
	}
	backtrack(1, []int{})
	return result
}`,
    testCases: [
      {
        input: { n: 4, k: 2 },
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
        input: { n: 3, k: 3 },
        expected: [[1, 2, 3]],
        description: 'C(3,3) = 1',
      },
      {
        input: { n: 3, k: 1 },
        expected: [[1], [2], [3]],
        description: 'C(3,1) = 3',
      },
    ],
    hints: [
      'When len(current) == k, copy and add to results',
      'Start each recursive call from i+1 to avoid using the same number twice',
      'Iterate from start to n inclusive',
    ],
    concepts: ['combinations', 'backtracking', 'C(n,k)', 'pruning'],
  },
  {
    id: 'go-cartesian-product',
    title: 'Cartesian Product',
    category: 'combinatorics',
    difficulty: 'intermediate',
    description: 'Compute the Cartesian product of two slices of integers.',
    instructions: [
      'Given two slices A and B, return all pairs [a, b] where a is from A and b is from B',
      'Use nested loops',
      'Return pairs in the order: iterate A outer, B inner',
    ],
    starterCode: `package main

func CartesianProduct(a []int, b []int) [][]int {
	result := [][]int{}
	// TODO: Nested loops over a and b to generate all pairs
	return result
}`,
    solutionCode: `package main

func CartesianProduct(a []int, b []int) [][]int {
	result := [][]int{}
	for _, x := range a {
		for _, y := range b {
			result = append(result, []int{x, y})
		}
	}
	return result
}`,
    testCases: [
      {
        input: { a: [1, 2], b: [3, 4] },
        expected: [
          [1, 3],
          [1, 4],
          [2, 3],
          [2, 4],
        ],
        description: '2x2 product',
      },
      {
        input: { a: [1], b: [2, 3, 4] },
        expected: [
          [1, 2],
          [1, 3],
          [1, 4],
        ],
        description: '1x3 product',
      },
      {
        input: { a: [], b: [1, 2] },
        expected: [],
        description: 'Empty first set',
      },
    ],
    hints: ['Outer loop iterates over a, inner loop over b', 'For each pair, append []int{x, y}'],
    concepts: ['Cartesian product', 'nested iteration', 'combinatorics'],
  },

  // ========== MEMOIZATION ==========
  {
    id: 'go-memoize-fibonacci',
    title: 'Memoized Fibonacci',
    category: 'memoization',
    difficulty: 'intermediate',
    description: 'Optimize the recursive Fibonacci function using memoization with a map.',
    instructions: [
      'Implement Fibonacci using recursion with a map cache',
      'Before computing, check if the result is already in the cache',
      'Store computed results in the cache before returning',
      'This reduces time complexity from O(2^n) to O(n)',
    ],
    starterCode: `package main

func FibMemo(n int) int {
	cache := make(map[int]int)
	// TODO: Implement a recursive helper that uses cache
	return 0
}`,
    solutionCode: `package main

func FibMemo(n int) int {
	cache := make(map[int]int)
	var fib func(n int) int
	fib = func(n int) int {
		if n <= 0 {
			return 0
		}
		if n == 1 {
			return 1
		}
		if val, ok := cache[n]; ok {
			return val
		}
		cache[n] = fib(n-1) + fib(n-2)
		return cache[n]
	}
	return fib(n)
}`,
    testCases: [
      { input: 0, expected: 0, description: 'fib(0)' },
      { input: 1, expected: 1, description: 'fib(1)' },
      { input: 10, expected: 55, description: 'fib(10)' },
      { input: 30, expected: 832040, description: 'fib(30) - fast with memo' },
      { input: 40, expected: 102334155, description: 'fib(40) - fast with memo' },
    ],
    hints: [
      'Use if val, ok := cache[n]; ok { return val } to check cache',
      'Store result before returning: cache[n] = result',
      'The map key is n, value is fib(n)',
    ],
    concepts: ['memoization', 'map as cache', 'dynamic programming', 'optimization'],
  },
  {
    id: 'go-climbing-stairs',
    title: 'Climbing Stairs (DP)',
    category: 'memoization',
    difficulty: 'intermediate',
    description:
      'Count the number of distinct ways to climb n stairs, taking 1 or 2 steps at a time.',
    instructions: [
      'You can climb 1 or 2 stairs at a time',
      'Return the number of distinct ways to reach the top of n stairs',
      'Use dynamic programming (bottom-up) or memoization (top-down)',
      'This is equivalent to computing the (n+1)th Fibonacci number',
    ],
    starterCode: `package main

func ClimbStairs(n int) int {
	// TODO: Use DP or memoization
	// dp[i] = dp[i-1] + dp[i-2]
	return 0
}`,
    solutionCode: `package main

func ClimbStairs(n int) int {
	if n <= 1 {
		return 1
	}
	prev, curr := 1, 1
	for i := 2; i <= n; i++ {
		prev, curr = curr, prev+curr
	}
	return curr
}`,
    testCases: [
      { input: 1, expected: 1, description: '1 stair: 1 way' },
      { input: 2, expected: 2, description: '2 stairs: 2 ways' },
      { input: 3, expected: 3, description: '3 stairs: 3 ways' },
      { input: 5, expected: 8, description: '5 stairs: 8 ways' },
      { input: 10, expected: 89, description: '10 stairs: 89 ways' },
    ],
    hints: [
      'Base cases: 1 stair = 1 way, 2 stairs = 2 ways',
      'Recurrence: ways(n) = ways(n-1) + ways(n-2)',
      'Optimize space: only keep last two values',
    ],
    concepts: ['dynamic programming', 'Fibonacci variant', 'space optimization'],
  },
  {
    id: 'go-coin-change',
    title: 'Coin Change (DP)',
    category: 'memoization',
    difficulty: 'advanced',
    description:
      'Find the minimum number of coins needed to make a given amount using dynamic programming.',
    instructions: [
      'Given coin denominations and a target amount, return the fewest coins needed',
      'If the amount cannot be made, return -1',
      'Use bottom-up DP: dp[i] = min coins to make amount i',
      'For each amount, try every coin and take the minimum',
    ],
    starterCode: `package main

func CoinChange(coins []int, amount int) int {
	// TODO: Create dp array of size amount+1
	// Fill dp[0] = 0, rest = amount+1 (or large value)
	// For each amount from 1 to amount, try all coins
	return -1
}`,
    solutionCode: `package main

func CoinChange(coins []int, amount int) int {
	dp := make([]int, amount+1)
	for i := 1; i <= amount; i++ {
		dp[i] = amount + 1
	}
	dp[0] = 0

	for i := 1; i <= amount; i++ {
		for _, coin := range coins {
			if coin <= i && dp[i-coin]+1 < dp[i] {
				dp[i] = dp[i-coin] + 1
			}
		}
	}

	if dp[amount] > amount {
		return -1
	}
	return dp[amount]
}`,
    testCases: [
      { input: { coins: [1, 5, 10, 25], amount: 30 }, expected: 2, description: '25 + 5 = 30' },
      { input: { coins: [2], amount: 3 }, expected: -1, description: 'Impossible' },
      { input: { coins: [1], amount: 0 }, expected: 0, description: 'Zero amount' },
      { input: { coins: [1, 2, 5], amount: 11 }, expected: 3, description: '5 + 5 + 1 = 11' },
    ],
    hints: [
      'Initialize dp with amount+1 (impossible sentinel)',
      'dp[0] = 0 (zero coins for zero amount)',
      'dp[i] = min(dp[i], dp[i-coin]+1) for each valid coin',
      'If dp[amount] > amount, return -1',
    ],
    concepts: ['dynamic programming', 'coin change', 'bottom-up DP', 'optimization'],
  },

  // ========== UTILITIES ==========
  {
    id: 'go-chunk-slice',
    title: 'Slice Chunking',
    category: 'utilities',
    difficulty: 'beginner',
    description: 'Split a slice into chunks of a specified size.',
    instructions: [
      'Given a slice and a chunk size, return a slice of slices where each inner slice has at most chunkSize elements',
      'The last chunk may have fewer elements',
      'Return an empty outer slice if the input is empty',
    ],
    starterCode: `package main

func ChunkSlice(arr []int, size int) [][]int {
	result := [][]int{}
	// TODO: Iterate and slice the array into chunks of the given size
	return result
}`,
    solutionCode: `package main

func ChunkSlice(arr []int, size int) [][]int {
	result := [][]int{}
	for i := 0; i < len(arr); i += size {
		end := i + size
		if end > len(arr) {
			end = len(arr)
		}
		result = append(result, arr[i:end])
	}
	return result
}`,
    testCases: [
      {
        input: { arr: [1, 2, 3, 4, 5], size: 2 },
        expected: [[1, 2], [3, 4], [5]],
        description: 'Uneven chunks',
      },
      {
        input: { arr: [1, 2, 3, 4], size: 2 },
        expected: [
          [1, 2],
          [3, 4],
        ],
        description: 'Even chunks',
      },
      {
        input: { arr: [1, 2, 3], size: 5 },
        expected: [[1, 2, 3]],
        description: 'Chunk larger than slice',
      },
      {
        input: { arr: [], size: 3 },
        expected: [],
        description: 'Empty slice',
      },
    ],
    hints: [
      'Step by size in the for loop: i += size',
      'Compute end = min(i+size, len(arr))',
      'Use arr[i:end] to get the chunk',
    ],
    concepts: ['slice chunking', 'subslice', 'for loop stepping'],
  },
  {
    id: 'go-merge-sorted',
    title: 'Merge Sorted Slices',
    category: 'utilities',
    difficulty: 'intermediate',
    description: 'Merge two sorted slices into a single sorted slice.',
    instructions: [
      'Given two sorted integer slices, merge them into one sorted slice',
      'Use two pointers, one for each slice',
      'Compare the current elements and append the smaller one',
      'After one slice is exhausted, append the remaining elements of the other',
    ],
    starterCode: `package main

func MergeSorted(a []int, b []int) []int {
	result := []int{}
	// TODO: Two-pointer merge
	return result
}`,
    solutionCode: `package main

func MergeSorted(a []int, b []int) []int {
	result := []int{}
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] <= b[j] {
			result = append(result, a[i])
			i++
		} else {
			result = append(result, b[j])
			j++
		}
	}
	result = append(result, a[i:]...)
	result = append(result, b[j:]...)
	return result
}`,
    testCases: [
      {
        input: { a: [1, 3, 5], b: [2, 4, 6] },
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Interleaved merge',
      },
      {
        input: { a: [1, 2, 3], b: [4, 5, 6] },
        expected: [1, 2, 3, 4, 5, 6],
        description: 'Non-overlapping',
      },
      {
        input: { a: [], b: [1, 2, 3] },
        expected: [1, 2, 3],
        description: 'First slice empty',
      },
      {
        input: { a: [1, 2], b: [] },
        expected: [1, 2],
        description: 'Second slice empty',
      },
    ],
    hints: [
      'Use two indices i and j starting at 0',
      'Compare a[i] and b[j], append the smaller',
      'After the loop, append remaining with a[i:]... or b[j:]...',
    ],
    concepts: ['merge', 'sorted arrays', 'two pointers', 'variadic append'],
  },
  {
    id: 'go-group-by',
    title: 'Group By Key',
    category: 'utilities',
    difficulty: 'intermediate',
    description:
      'Group a slice of structs by a key function, returning a map of key to grouped slices.',
    instructions: [
      'Given a slice of strings and a grouping function (e.g., by length), return a map grouping the strings',
      'Implement GroupByLength that groups strings by their length',
      'Use map[int][]string where the key is the string length',
    ],
    starterCode: `package main

func GroupByLength(words []string) map[int][]string {
	groups := make(map[int][]string)
	// TODO: Iterate over words and group by len(word)
	return groups
}`,
    solutionCode: `package main

func GroupByLength(words []string) map[int][]string {
	groups := make(map[int][]string)
	for _, word := range words {
		length := len(word)
		groups[length] = append(groups[length], word)
	}
	return groups
}`,
    testCases: [
      {
        input: ['go', 'is', 'fun', 'and', 'fast', 'safe'],
        expected: { 2: ['go', 'is'], 3: ['fun', 'and'], 4: ['fast', 'safe'] },
        description: 'Group by string length',
      },
      {
        input: ['a', 'bb', 'c', 'dd'],
        expected: { 1: ['a', 'c'], 2: ['bb', 'dd'] },
        description: 'Two groups',
      },
      {
        input: [],
        expected: {},
        description: 'Empty input',
      },
    ],
    hints: [
      'groups[length] = append(groups[length], word) works even if key does not exist yet',
      'append on a nil slice creates a new slice',
    ],
    concepts: ['grouping', 'map of slices', 'append to nil slice'],
  },
];
