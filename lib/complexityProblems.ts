// Time & Space Complexity Quiz Questions
// Used by the quiz system to test algorithm complexity analysis skills

export type ComplexityCategory =
  | 'arrays'
  | 'sorting'
  | 'searching'
  | 'trees'
  | 'graphs'
  | 'dynamic-programming'
  | 'hash-tables'
  | 'strings'
  | 'recursion'
  | 'linked-lists';

export interface ComplexityQuestion {
  id: string;
  title: string;
  category: ComplexityCategory;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  // Optional custom distractors for non-standard complexities
  timeDistractors?: string[];
  spaceDistractors?: string[];
}

export const COMPLEXITY_CATEGORY_CONFIG: Record<
  ComplexityCategory,
  { name: string; description: string }
> = {
  arrays: { name: 'Arrays', description: 'Array manipulation and traversal patterns' },
  sorting: { name: 'Sorting', description: 'Comparison and non-comparison sorting algorithms' },
  searching: { name: 'Searching', description: 'Search algorithms and binary search variants' },
  trees: { name: 'Trees', description: 'Binary trees, BSTs, and tree traversals' },
  graphs: { name: 'Graphs', description: 'Graph traversal and shortest path algorithms' },
  'dynamic-programming': {
    name: 'Dynamic Programming',
    description: 'Memoization and tabulation patterns',
  },
  'hash-tables': { name: 'Hash Tables', description: 'Hash-based data structure operations' },
  strings: { name: 'Strings', description: 'String manipulation and pattern matching' },
  recursion: { name: 'Recursion', description: 'Recursive algorithms and backtracking' },
  'linked-lists': { name: 'Linked Lists', description: 'Singly and doubly linked list operations' },
};

// Standard complexity pool for auto-generating options
export const STANDARD_COMPLEXITIES = [
  'O(1)',
  'O(log n)',
  'O(√n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(n³)',
  'O(2^n)',
  'O(n!)',
];

export const complexityQuestions: ComplexityQuestion[] = [
  // ========== ARRAYS ==========
  {
    id: 'cx-find-max',
    title: 'Find Maximum Element',
    category: 'arrays',
    code: `function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'A single pass through the array comparing each element. One loop over n elements gives O(n) time. Only one variable (max) is used, so O(1) space.',
  },
  {
    id: 'cx-two-sum-brute',
    title: 'Two Sum (Brute Force)',
    category: 'arrays',
    code: `function twoSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return [i, j];
    }
  }
  return [];
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    explanation:
      'Two nested loops each iterating up to n elements. The inner loop runs n-1, n-2, ... times, totaling n(n-1)/2 = O(n²). Only index variables are used, so O(1) space.',
  },
  {
    id: 'cx-two-sum-hash',
    title: 'Two Sum (Hash Map)',
    category: 'arrays',
    code: `function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(arr[i], i);
  }
  return [];
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Single pass through the array with O(1) hash map lookups. Time is O(n). The hash map stores up to n elements, so space is O(n).',
  },
  {
    id: 'cx-reverse-array',
    title: 'Reverse Array In Place',
    category: 'arrays',
    code: `function reverse(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Two pointers meet in the middle, performing n/2 swaps. That is O(n) time. Swapping is done in place with only two pointer variables, giving O(1) space.',
  },
  {
    id: 'cx-remove-dupes-sorted',
    title: 'Remove Duplicates from Sorted Array',
    category: 'arrays',
    code: `function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let writeIdx = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arr[writeIdx] = arr[i];
      writeIdx++;
    }
  }
  return writeIdx;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'A single pass through the sorted array using two pointers. Each element is visited once, so O(n) time. Modification is done in place with one extra variable, so O(1) space.',
  },
  {
    id: 'cx-kadane',
    title: "Kadane's Algorithm (Max Subarray)",
    category: 'arrays',
    code: `function maxSubarraySum(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      "Kadane's algorithm scans the array once, maintaining a running sum. Each element is processed exactly once, so O(n) time. Only two variables track the state, so O(1) space.",
  },
  {
    id: 'cx-merge-sorted-arrays',
    title: 'Merge Two Sorted Arrays',
    category: 'arrays',
    code: `function merge(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);
  return result;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Each element from both arrays is visited exactly once and pushed to the result. With n total elements across both arrays, time is O(n). The result array holds all n elements, so space is O(n).',
  },

  // ========== SORTING ==========
  {
    id: 'cx-bubble-sort',
    title: 'Bubble Sort',
    category: 'sorting',
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    explanation:
      'Two nested loops: the outer runs n times, the inner runs up to n-1 times. Total comparisons are n(n-1)/2 = O(n²). Swaps are done in place, so O(1) space.',
  },
  {
    id: 'cx-selection-sort',
    title: 'Selection Sort',
    category: 'sorting',
    code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    explanation:
      'For each position, scans the remaining array to find the minimum. The inner loop runs n-1, n-2, ... times, totaling O(n²). Only index variables are used, so O(1) space.',
  },
  {
    id: 'cx-insertion-sort',
    title: 'Insertion Sort',
    category: 'sorting',
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    explanation:
      'In the worst case (reverse-sorted input), each element shifts all previous elements. This gives n(n-1)/2 = O(n²) comparisons. Sorting is done in place with O(1) extra space.',
  },
  {
    id: 'cx-merge-sort',
    title: 'Merge Sort',
    category: 'sorting',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    explanation:
      'The array is split in half log n times (recursion depth). At each level, all n elements are merged. This gives O(n log n) time. The merge step requires O(n) auxiliary space for temporary arrays.',
  },
  {
    id: 'cx-quick-sort',
    title: 'Quick Sort (Average Case)',
    category: 'sorting',
    code: `function quickSort(arr, lo, hi) {
  if (lo < hi) {
    const pivot = partition(arr, lo, hi);
    quickSort(arr, lo, pivot - 1);
    quickSort(arr, pivot + 1, hi);
  }
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    explanation:
      'On average, the pivot divides the array roughly in half, giving log n levels of recursion. Each level does O(n) work partitioning. Time is O(n log n). The recursion stack uses O(log n) space on average.',
  },
  {
    id: 'cx-heap-sort',
    title: 'Heap Sort',
    category: 'sorting',
    code: `function heapSort(arr) {
  // Build max heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--)
    heapify(arr, arr.length, i);
  // Extract elements one by one
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Building the heap takes O(n). Then n extract-max operations each take O(log n) to re-heapify. Total time is O(n log n). Heap sort operates in place, so O(1) auxiliary space.',
  },
  {
    id: 'cx-counting-sort',
    title: 'Counting Sort',
    category: 'sorting',
    code: `function countingSort(arr, maxVal) {
  const count = new Array(maxVal + 1).fill(0);
  for (const x of arr) count[x]++;
  let idx = 0;
  for (let i = 0; i <= maxVal; i++) {
    while (count[i] > 0) {
      arr[idx++] = i;
      count[i]--;
    }
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Counting sort counts occurrences in one pass O(n), then rebuilds the array. When the range of values k is O(n), total time is O(n). The count array uses O(k) = O(n) space.',
  },

  // ========== SEARCHING ==========
  {
    id: 'cx-binary-search',
    title: 'Binary Search (Iterative)',
    category: 'searching',
    code: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Each iteration halves the search space. After log₂(n) iterations, only one element remains. Time is O(log n). Only a few variables are used, so O(1) space.',
  },
  {
    id: 'cx-binary-search-recursive',
    title: 'Binary Search (Recursive)',
    category: 'searching',
    code: `function binarySearch(arr, target, lo, hi) {
  if (lo > hi) return -1;
  const mid = Math.floor((lo + hi) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target)
    return binarySearch(arr, target, mid + 1, hi);
  return binarySearch(arr, target, lo, mid - 1);
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    explanation:
      'Same halving logic as iterative binary search: O(log n) time. However, each recursive call adds a frame to the call stack. The maximum recursion depth is log n, so space is O(log n).',
  },
  {
    id: 'cx-linear-search',
    title: 'Linear Search',
    category: 'searching',
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'In the worst case, every element is checked before finding the target (or not finding it). One loop over n elements gives O(n) time. Only an index variable is used, so O(1) space.',
  },
  {
    id: 'cx-search-rotated',
    title: 'Search in Rotated Sorted Array',
    category: 'searching',
    code: `function search(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[lo] <= arr[mid]) {
      if (target >= arr[lo] && target < arr[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (target > arr[mid] && target <= arr[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Modified binary search that determines which half is sorted and adjusts accordingly. The search space still halves each iteration, giving O(log n) time and O(1) space.',
  },
  {
    id: 'cx-find-peak',
    title: 'Find Peak Element',
    category: 'searching',
    code: `function findPeak(arr) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Binary search variant: compare mid with mid+1 to determine which half contains a peak. The search space halves each step, giving O(log n) time and O(1) space.',
  },
  {
    id: 'cx-search-2d-matrix',
    title: 'Search Sorted 2D Matrix',
    category: 'searching',
    code: `function searchMatrix(matrix, target) {
  let row = 0, col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] > target) col--;
    else row++;
  }
  return false;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Starting from the top-right corner, each step eliminates a row or column. For an n×n matrix, at most 2n steps are needed. Time is O(n) where n is the matrix dimension. Only pointer variables used, so O(1) space.',
  },
  {
    id: 'cx-first-last-position',
    title: 'Find First and Last Position',
    category: 'searching',
    code: `function searchRange(arr, target) {
  function findBound(isFirst) {
    let lo = 0, hi = arr.length - 1, result = -1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (arr[mid] === target) {
        result = mid;
        if (isFirst) hi = mid - 1;
        else lo = mid + 1;
      } else if (arr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    return result;
  }
  return [findBound(true), findBound(false)];
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Two binary searches: one to find the first occurrence, one for the last. Each is O(log n), so total time is O(log n). Only constant extra variables are used, so O(1) space.',
  },

  // ========== TREES ==========
  {
    id: 'cx-bst-search',
    title: 'BST Search (Iterative)',
    category: 'trees',
    code: `function bstSearch(root, target) {
  let node = root;
  while (node !== null) {
    if (target === node.val) return node;
    if (target < node.val) node = node.left;
    else node = node.right;
  }
  return null;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'In a balanced BST, each comparison eliminates half the remaining nodes. The height of a balanced BST is log n, giving O(log n) time. Iterative approach uses O(1) space.',
  },
  {
    id: 'cx-bst-insert',
    title: 'BST Insert (Iterative)',
    category: 'trees',
    code: `function bstInsert(root, val) {
  const node = { val, left: null, right: null };
  if (!root) return node;
  let curr = root;
  while (true) {
    if (val < curr.val) {
      if (!curr.left) { curr.left = node; return root; }
      curr = curr.left;
    } else {
      if (!curr.right) { curr.right = node; return root; }
      curr = curr.right;
    }
  }
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Traverses down the balanced BST to find the insertion point. Height is log n, so O(log n) time. Iterative approach uses only constant extra space, so O(1).',
  },
  {
    id: 'cx-inorder-recursive',
    title: 'Inorder Traversal (Recursive)',
    category: 'trees',
    code: `function inorder(root, result = []) {
  if (root === null) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Every node is visited exactly once, so time is O(n). The recursion stack can be as deep as n (skewed tree), and the result array stores n values, so space is O(n).',
  },
  {
    id: 'cx-level-order-bfs',
    title: 'Level Order Traversal (BFS)',
    category: 'trees',
    code: `function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length > 0) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Each node is enqueued and dequeued once, so time is O(n). The queue holds up to n/2 nodes (the widest level of a complete binary tree), and the result stores all n values. Space is O(n).',
  },
  {
    id: 'cx-tree-max-depth',
    title: 'Maximum Depth of Binary Tree',
    category: 'trees',
    code: `function maxDepth(root) {
  if (root === null) return 0;
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return Math.max(left, right) + 1;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Every node is visited once to compute its subtree depth. Time is O(n). The recursion stack depth equals the tree height, which is O(n) in the worst case (skewed tree).',
  },
  {
    id: 'cx-validate-bst',
    title: 'Validate BST',
    category: 'trees',
    code: `function isValidBST(node, min = -Infinity, max = Infinity) {
  if (node === null) return true;
  if (node.val <= min || node.val >= max) return false;
  return isValidBST(node.left, min, node.val) &&
         isValidBST(node.right, node.val, max);
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Each node is checked once against its valid range. Time is O(n). The recursion stack depth is the tree height, which is O(n) in the worst case. Space is O(n).',
  },
  {
    id: 'cx-lca',
    title: 'Lowest Common Ancestor',
    category: 'trees',
    code: `function lca(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lca(root.left, p, q);
  const right = lca(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'In the worst case, all nodes are visited. Time is O(n). The recursion stack depth equals the tree height, up to O(n) for a skewed tree.',
  },

  // ========== GRAPHS ==========
  {
    id: 'cx-bfs-graph',
    title: 'Breadth-First Search (Graph)',
    category: 'graphs',
    code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited;
}`,
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)',
    timeDistractors: ['O(V)', 'O(V²)', 'O(E log V)'],
    spaceDistractors: ['O(1)', 'O(E)', 'O(V+E)'],
    explanation:
      'Each vertex is enqueued once O(V) and each edge is examined once O(E). Total time is O(V+E). The visited set and queue store up to V vertices, so space is O(V).',
  },
  {
    id: 'cx-dfs-graph',
    title: 'Depth-First Search (Recursive)',
    category: 'graphs',
    code: `function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
  return visited;
}`,
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)',
    timeDistractors: ['O(V)', 'O(V²)', 'O(E log V)'],
    spaceDistractors: ['O(1)', 'O(E)', 'O(V+E)'],
    explanation:
      'Each vertex is visited once O(V) and each edge is traversed once O(E). Total time is O(V+E). The recursion stack and visited set each hold up to V entries, so space is O(V).',
  },
  {
    id: 'cx-detect-cycle',
    title: 'Detect Cycle (Undirected Graph)',
    category: 'graphs',
    code: `function hasCycle(graph, node, visited, parent) {
  visited.add(node);
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      if (hasCycle(graph, neighbor, visited, node)) return true;
    } else if (neighbor !== parent) {
      return true;
    }
  }
  return false;
}`,
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)',
    timeDistractors: ['O(V)', 'O(V²)', 'O(E log V)'],
    spaceDistractors: ['O(1)', 'O(E)', 'O(V+E)'],
    explanation:
      'DFS-based cycle detection visits each vertex and edge once. Time is O(V+E). The visited set and recursion stack each hold up to V entries, so space is O(V).',
  },
  {
    id: 'cx-topological-sort',
    title: "Topological Sort (Kahn's Algorithm)",
    category: 'graphs',
    code: `function topSort(graph, inDegree) {
  const queue = [];
  for (let v = 0; v < graph.length; v++) {
    if (inDegree[v] === 0) queue.push(v);
  }
  const order = [];
  while (queue.length > 0) {
    const v = queue.shift();
    order.push(v);
    for (const u of graph[v]) {
      inDegree[u]--;
      if (inDegree[u] === 0) queue.push(u);
    }
  }
  return order;
}`,
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)',
    timeDistractors: ['O(V)', 'O(V²)', 'O(V log V)'],
    spaceDistractors: ['O(1)', 'O(E)', 'O(V+E)'],
    explanation:
      'Each vertex is processed once and each edge is examined once. Time is O(V+E). The queue and result array each hold up to V vertices, so space is O(V).',
  },
  {
    id: 'cx-dijkstra',
    title: "Dijkstra's Shortest Path",
    category: 'graphs',
    code: `function dijkstra(graph, start) {
  const dist = new Array(graph.length).fill(Infinity);
  dist[start] = 0;
  const pq = new MinHeap(); // priority queue
  pq.push([0, start]);
  while (!pq.isEmpty()) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue;
    for (const [v, w] of graph[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`,
    timeComplexity: 'O((V+E) log V)',
    spaceComplexity: 'O(V)',
    timeDistractors: ['O(V+E)', 'O(V²)', 'O(V log V)'],
    spaceDistractors: ['O(1)', 'O(E)', 'O(V+E)'],
    explanation:
      'Each vertex is extracted from the priority queue O(V log V), and each edge relaxation involves a heap operation O(E log V). Total time is O((V+E) log V). The distance array and heap store up to V entries.',
  },
  {
    id: 'cx-floyd-warshall',
    title: 'Floyd-Warshall All-Pairs Shortest Path',
    category: 'graphs',
    code: `function floydWarshall(dist) {
  const n = dist.length;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
}`,
    timeComplexity: 'O(n³)',
    spaceComplexity: 'O(n²)',
    explanation:
      'Three nested loops each running n times give O(n³) time. The distance matrix is n×n, so space is O(n²). This computes shortest paths between all pairs of vertices.',
  },

  // ========== DYNAMIC PROGRAMMING ==========
  {
    id: 'cx-fib-memo',
    title: 'Fibonacci (Memoized)',
    category: 'dynamic-programming',
    code: `function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Each value from 0 to n is computed exactly once and cached. Time is O(n). The memo object stores n entries and the recursion stack reaches depth n, so space is O(n).',
  },
  {
    id: 'cx-fib-bottom-up',
    title: 'Fibonacci (Bottom-Up, O(1) Space)',
    category: 'dynamic-programming',
    code: `function fib(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'A single loop from 2 to n computes each Fibonacci number once. Time is O(n). Only two variables track the previous values, so space is O(1).',
  },
  {
    id: 'cx-climbing-stairs',
    title: 'Climbing Stairs',
    category: 'dynamic-programming',
    code: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Iterates from 3 to n, computing each step count from the previous two. Time is O(n). Only two rolling variables are used, so space is O(1).',
  },
  {
    id: 'cx-lcs',
    title: 'Longest Common Subsequence',
    category: 'dynamic-programming',
    code: `function lcs(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 },
    () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n²)',
    explanation:
      'Two nested loops iterate over both strings of length n (assuming similar lengths). Filling the m×n DP table takes O(mn) = O(n²) time. The table itself uses O(n²) space.',
  },
  {
    id: 'cx-knapsack',
    title: '0/1 Knapsack',
    category: 'dynamic-programming',
    code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 },
    () => new Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w];
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w],
          dp[i-1][w - weights[i-1]] + values[i-1]);
      }
    }
  }
  return dp[n][capacity];
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n²)',
    explanation:
      'Two nested loops: n items × W capacity values. Time is O(nW). When W is proportional to n, this becomes O(n²). The DP table is n×W, giving O(n²) space.',
  },
  {
    id: 'cx-coin-change',
    title: 'Coin Change',
    category: 'dynamic-programming',
    code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'For each coin, iterate through all amounts up to the target. With c coins and amount n, time is O(c×n). When c is constant, this simplifies to O(n). The DP array has n+1 entries, so space is O(n).',
  },
  {
    id: 'cx-edit-distance',
    title: 'Edit Distance (Levenshtein)',
    category: 'dynamic-programming',
    code: `function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 },
    () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1];
      else dp[i][j] = 1 + Math.min(
        dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    }
  }
  return dp[m][n];
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n²)',
    explanation:
      'Fills an m×n DP table where each cell depends on three neighbors. With strings of similar length, time is O(n²). The table uses O(n²) space.',
  },

  // ========== HASH TABLES ==========
  {
    id: 'cx-hash-lookup',
    title: 'Hash Table Lookup',
    category: 'hash-tables',
    code: `function lookup(hashMap, key) {
  return hashMap.get(key);
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    explanation:
      'Hash table lookups compute a hash and access the bucket directly. Average case is O(1) time. No additional space is allocated, so O(1) space.',
  },
  {
    id: 'cx-frequency-count',
    title: 'Frequency Counter',
    category: 'hash-tables',
    code: `function countFrequency(arr) {
  const freq = {};
  for (const item of arr) {
    freq[item] = (freq[item] || 0) + 1;
  }
  return freq;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'One pass through the array, with O(1) hash map operations per element. Time is O(n). The frequency map stores up to n unique entries, so space is O(n).',
  },
  {
    id: 'cx-find-duplicates',
    title: 'Find All Duplicates',
    category: 'hash-tables',
    code: `function findDuplicates(arr) {
  const seen = new Set();
  const dupes = [];
  for (const x of arr) {
    if (seen.has(x)) dupes.push(x);
    else seen.add(x);
  }
  return dupes;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Single pass with O(1) set operations per element. Time is O(n). The set stores up to n elements, so space is O(n).',
  },
  {
    id: 'cx-group-anagrams',
    title: 'Group Anagrams',
    category: 'hash-tables',
    code: `function groupAnagrams(words) {
  const map = {};
  for (const word of words) {
    const key = word.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(word);
  }
  return Object.values(map);
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    explanation:
      'For each of n words, sorting takes O(k log k) where k is word length. With n words of length k, total time is O(n·k log k). When k is bounded, this simplifies to O(n log n). The map stores all words, so space is O(n).',
  },
  {
    id: 'cx-intersection-arrays',
    title: 'Intersection of Two Arrays',
    category: 'hash-tables',
    code: `function intersection(a, b) {
  const setA = new Set(a);
  const result = [];
  for (const x of b) {
    if (setA.has(x)) {
      result.push(x);
      setA.delete(x);
    }
  }
  return result;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Building the set from array a is O(n). Iterating through array b with O(1) lookups is O(m). Total is O(n+m) = O(n). The set stores up to n elements, so space is O(n).',
  },
  {
    id: 'cx-isomorphic-strings',
    title: 'Check Isomorphic Strings',
    category: 'hash-tables',
    code: `function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const mapST = {}, mapTS = {};
  for (let i = 0; i < s.length; i++) {
    if (mapST[s[i]] && mapST[s[i]] !== t[i]) return false;
    if (mapTS[t[i]] && mapTS[t[i]] !== s[i]) return false;
    mapST[s[i]] = t[i];
    mapTS[t[i]] = s[i];
  }
  return true;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'A single pass through both strings of length n. Time is O(n). The maps store at most 26 character mappings (fixed alphabet), which is O(1) space.',
  },

  // ========== STRINGS ==========
  {
    id: 'cx-palindrome-check',
    title: 'Palindrome Check',
    category: 'strings',
    code: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Two pointers compare characters from both ends, meeting in the middle. At most n/2 comparisons, so O(n) time. Only two pointer variables are used, so O(1) space.',
  },
  {
    id: 'cx-anagram-sort',
    title: 'Anagram Check (Sorting)',
    category: 'strings',
    code: `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  return a.split('').sort().join('') ===
         b.split('').sort().join('');
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Sorting both strings takes O(n log n) each. Comparison is O(n). Total time is O(n log n). Creating sorted copies requires O(n) space.',
  },
  {
    id: 'cx-anagram-count',
    title: 'Anagram Check (Counting)',
    category: 'strings',
    code: `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < a.length; i++) {
    count[a.charCodeAt(i) - 97]++;
    count[b.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Single pass through both strings counting character frequencies. Time is O(n). The count array has a fixed size of 26 (alphabet), so space is O(1).',
  },
  {
    id: 'cx-reverse-string',
    title: 'Reverse a String',
    category: 'strings',
    code: `function reverse(s) {
  let result = '';
  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i];
  }
  return result;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Iterates through all n characters once. Time is O(n). Building a new string of length n requires O(n) space. Note: in some languages, string concatenation in a loop can be O(n²), but we analyze the iteration count.',
  },
  {
    id: 'cx-longest-substring',
    title: 'Longest Substring Without Repeating',
    category: 'strings',
    code: `function lengthOfLongest(s) {
  const seen = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Sliding window with two pointers. Each character is added and removed from the set at most once. Time is O(n). The set stores at most n characters (all unique), so space is O(n).',
  },
  {
    id: 'cx-all-substrings',
    title: 'Generate All Substrings',
    category: 'strings',
    code: `function allSubstrings(s) {
  const result = [];
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      result.push(s.substring(i, j));
    }
  }
  return result;
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n²)',
    explanation:
      'Two nested loops generate all n(n+1)/2 substrings. Time is O(n²). Storing all substrings requires O(n²) space (ignoring the actual string lengths).',
  },
  {
    id: 'cx-naive-pattern-match',
    title: 'Naive String Pattern Matching',
    category: 'strings',
    code: `function search(text, pattern) {
  const n = text.length, m = pattern.length;
  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) j++;
    if (j === m) return i;
  }
  return -1;
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    explanation:
      'For each of n-m+1 positions, compare up to m characters. Worst case is O(n·m). When m is proportional to n, this becomes O(n²). Only index variables are used, so O(1) space.',
  },

  // ========== RECURSION ==========
  {
    id: 'cx-factorial',
    title: 'Factorial (Recursive)',
    category: 'recursion',
    code: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Makes n recursive calls, each doing O(1) work. Time is O(n). The recursion stack reaches depth n, so space is O(n).',
  },
  {
    id: 'cx-fib-naive',
    title: 'Fibonacci (Naive Recursive)',
    category: 'recursion',
    code: `function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Each call branches into two sub-calls, creating an exponential call tree. Time is O(2^n). The maximum recursion depth is n (following the fib(n-1) chain), so space is O(n).',
  },
  {
    id: 'cx-fast-power',
    title: 'Fast Exponentiation',
    category: 'recursion',
    code: `function power(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) {
    const half = power(base, exp / 2);
    return half * half;
  }
  return base * power(base, exp - 1);
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    explanation:
      'The exponent is halved at each step (for even exponents). This gives O(log n) recursive calls. Each call does O(1) work. The recursion stack depth is O(log n), so space is O(log n).',
  },
  {
    id: 'cx-generate-subsets',
    title: 'Generate All Subsets',
    category: 'recursion',
    code: `function subsets(arr, idx = 0, current = []) {
  if (idx === arr.length) return [current.slice()];
  // Exclude current element
  const result = subsets(arr, idx + 1, current);
  // Include current element
  current.push(arr[idx]);
  result.push(...subsets(arr, idx + 1, current));
  current.pop();
  return result;
}`,
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Each element has two choices: include or exclude. This creates 2^n subsets. Generating all of them takes O(2^n) time. The recursion depth is n, so stack space is O(n), though output space is O(n·2^n).',
  },
  {
    id: 'cx-generate-permutations',
    title: 'Generate All Permutations',
    category: 'recursion',
    code: `function permutations(arr, start = 0) {
  if (start === arr.length - 1) return [[...arr]];
  const result = [];
  for (let i = start; i < arr.length; i++) {
    [arr[start], arr[i]] = [arr[i], arr[start]];
    result.push(...permutations(arr, start + 1));
    [arr[start], arr[i]] = [arr[i], arr[start]];
  }
  return result;
}`,
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n)',
    explanation:
      'There are n! permutations of n elements. The algorithm generates all of them. Time is O(n·n!) accounting for copying each permutation. Recursion depth is n, so stack space is O(n).',
  },
  {
    id: 'cx-tower-of-hanoi',
    title: 'Tower of Hanoi',
    category: 'recursion',
    code: `function hanoi(n, from, to, aux) {
  if (n === 0) return;
  hanoi(n - 1, from, aux, to);
  console.log(from + ' -> ' + to);
  hanoi(n - 1, aux, to, from);
}`,
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    explanation:
      'The recurrence T(n) = 2T(n-1) + 1 solves to T(n) = 2^n - 1 moves. Time is O(2^n). The recursion stack depth is n, so space is O(n).',
  },

  // ========== LINKED LISTS ==========
  {
    id: 'cx-traverse-ll',
    title: 'Traverse Linked List',
    category: 'linked-lists',
    code: `function traverse(head) {
  const values = [];
  let curr = head;
  while (curr !== null) {
    values.push(curr.val);
    curr = curr.next;
  }
  return values;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation:
      'Visits each of n nodes exactly once. Time is O(n). The values array stores n elements, so space is O(n). If only traversing without storing, space would be O(1).',
  },
  {
    id: 'cx-reverse-ll',
    title: 'Reverse Linked List',
    category: 'linked-lists',
    code: `function reverse(head) {
  let prev = null, curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Visits each node once, reversing pointers in place. Time is O(n). Only three pointer variables are used (prev, curr, next), so space is O(1).',
  },
  {
    id: 'cx-detect-cycle-ll',
    title: "Detect Cycle (Floyd's Algorithm)",
    category: 'linked-lists',
    code: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      "Floyd's tortoise and hare algorithm. The fast pointer moves twice as fast as slow. If there's a cycle, they meet within O(n) steps. Only two pointers are used, so O(1) space.",
  },
  {
    id: 'cx-merge-sorted-ll',
    title: 'Merge Two Sorted Linked Lists',
    category: 'linked-lists',
    code: `function mergeLists(l1, l2) {
  const dummy = { next: null };
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Each node from both lists is visited once, so time is O(n+m) = O(n). Nodes are re-linked in place — only one dummy node and a tail pointer are created, so O(1) space.',
  },
  {
    id: 'cx-find-middle-ll',
    title: 'Find Middle of Linked List',
    category: 'linked-lists',
    code: `function findMiddle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'The fast pointer moves twice as fast as slow. When fast reaches the end, slow is at the middle. One pass through the list gives O(n) time. Only two pointers are used, so O(1) space.',
  },
  {
    id: 'cx-remove-nth-end',
    title: 'Remove Nth Node From End',
    category: 'linked-lists',
    code: `function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let fast = dummy, slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Two pointers separated by n nodes. When the fast pointer reaches the end, the slow pointer is at the node before the target. One pass through the list gives O(n) time. Only constant extra space is used.',
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getComplexityCategories(): ComplexityCategory[] {
  const categories = new Set(complexityQuestions.map((q) => q.category));
  return Array.from(categories) as ComplexityCategory[];
}

export function getComplexityCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const q of complexityQuestions) {
    counts[q.category] = (counts[q.category] || 0) + 1;
  }
  return counts;
}

export function getComplexityQuestionsByCategory(categories: string[]): ComplexityQuestion[] {
  if (categories.length === 0) return complexityQuestions;
  return complexityQuestions.filter((q) => categories.includes(q.category));
}
