import type { Problem } from '../types';

/**
 * Java Coding Drills Problems
 *
 * Comprehensive collection of Java problems covering:
 * - ArrayList/List Methods (20 problems)
 * - Stream API (25 problems)
 * - String Methods (17 problems)
 * - Array Operations (8 problems)
 *
 * Note: Examples are compatible with Java 8+, with hints for modern Java features
 * (Java 11+ strip(), Java 16+ toList(), etc.) where applicable.
 */

export const javaProblems: Problem[] = [
  // ============================================================
  // ArrayList/List Methods (12+ problems)
  // ============================================================

  {
    id: 'java-list-001',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Add Element to List',
    text: 'Add the number 10 to the end of the list',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3));',
    expected: [1, 2, 3, 10],
    sample: 'nums.add(10); // nums is now [1, 2, 3, 10]',
    hints: ['Use the add() method to append an element', 'add() appends to the end of the list'],
    validPatterns: [/\.add\(\s*10\s*\)/],
    tags: ['ArrayList', 'add', 'basics'],
  },

  {
    id: 'java-list-002',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Add Element at Index',
    text: 'Insert the number 99 at index 1 (second position)',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3));',
    expected: [1, 99, 2, 3],
    sample: 'nums.add(1, 99); // nums is now [1, 99, 2, 3]',
    hints: [
      'Use add(index, element) to insert at a specific position',
      'Index 1 means the second position',
    ],
    validPatterns: [/\.add\(\s*1\s*,\s*99\s*\)/],
    tags: ['ArrayList', 'add', 'index'],
  },

  {
    id: 'java-list-003',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Add All Elements',
    text: 'Add all elements from newNums to nums',
    setup:
      'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2));\nList<Integer> newNums = Arrays.asList(3, 4, 5);',
    setupCode:
      'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2));\nList<Integer> newNums = Arrays.asList(3, 4, 5);',
    expected: [1, 2, 3, 4, 5],
    sample: 'nums.addAll(newNums); // nums is now [1, 2, 3, 4, 5]',
    hints: [
      'Use addAll() to add all elements from another collection',
      'addAll() appends to the end by default',
    ],
    validPatterns: [/\.addAll\(\s*newNums\s*\)/],
    tags: ['ArrayList', 'addAll', 'collections'],
  },

  {
    id: 'java-list-004',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Get Element by Index',
    text: 'Get the element at index 2 from the list',
    setup: 'List<String> fruits = Arrays.asList("apple", "banana", "cherry", "date");',
    setupCode: 'List<String> fruits = Arrays.asList("apple", "banana", "cherry", "date");',
    expected: 'cherry',
    sample: 'fruits.get(2) // returns "cherry"',
    hints: ['Use get(index) to retrieve an element', 'Indices start at 0'],
    validPatterns: [/\.get\(\s*2\s*\)/],
    tags: ['ArrayList', 'get', 'access'],
  },

  {
    id: 'java-list-005',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Set Element at Index',
    text: 'Replace the element at index 1 with "orange"',
    setup: 'List<String> fruits = new ArrayList<>(Arrays.asList("apple", "banana", "cherry"));',
    setupCode: 'List<String> fruits = new ArrayList<>(Arrays.asList("apple", "banana", "cherry"));',
    expected: ['apple', 'orange', 'cherry'],
    sample: 'fruits.set(1, "orange"); // fruits is now ["apple", "orange", "cherry"]',
    hints: [
      'Use set(index, element) to replace an element',
      'set() returns the old element that was replaced',
    ],
    validPatterns: [/\.set\(\s*1\s*,\s*"orange"\s*\)/],
    tags: ['ArrayList', 'set', 'update'],
  },

  {
    id: 'java-list-006',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Remove by Index',
    text: 'Remove the element at index 0 from the list',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(10, 20, 30, 40));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(10, 20, 30, 40));',
    expected: [20, 30, 40],
    sample: 'nums.remove(0); // nums is now [20, 30, 40]',
    hints: [
      'Use remove(index) to remove by position',
      'For List<Integer>, remove(int) removes by index',
      'To remove by value, use remove(Integer.valueOf(10)) to force Object removal',
    ],
    validPatterns: [/\.remove\(\s*0\s*\)/],
    tags: ['ArrayList', 'remove', 'index'],
  },

  {
    id: 'java-list-007',
    category: 'ArrayList Methods',
    difficulty: 'medium',
    title: 'Remove by Object',
    text: 'Remove the string "banana" from the list',
    setup: 'List<String> fruits = new ArrayList<>(Arrays.asList("apple", "banana", "cherry"));',
    setupCode: 'List<String> fruits = new ArrayList<>(Arrays.asList("apple", "banana", "cherry"));',
    expected: ['apple', 'cherry'],
    sample: 'fruits.remove("banana"); // fruits is now ["apple", "cherry"]',
    hints: [
      'Use remove(Object) to remove by value',
      'Returns true if element was found and removed',
    ],
    validPatterns: [/\.remove\(\s*"banana"\s*\)/],
    tags: ['ArrayList', 'remove', 'object'],
  },

  {
    id: 'java-list-008',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Clear All Elements',
    text: 'Remove all elements from the list',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    expected: [],
    sample: 'nums.clear(); // nums is now []',
    hints: ['Use clear() to remove all elements', 'The list becomes empty after clear()'],
    validPatterns: [/\.clear\(\)/],
    tags: ['ArrayList', 'clear', 'basics'],
  },

  {
    id: 'java-list-009',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Get List Size',
    text: 'Get the number of elements in the list',
    setup: 'List<String> colors = Arrays.asList("red", "green", "blue", "yellow");',
    setupCode: 'List<String> colors = Arrays.asList("red", "green", "blue", "yellow");',
    expected: 4,
    sample: 'colors.size() // returns 4',
    hints: ['Use size() to get the number of elements', 'size() returns an int'],
    validPatterns: [/\.size\(\)/],
    tags: ['ArrayList', 'size', 'basics'],
  },

  {
    id: 'java-list-010',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Check if List is Empty',
    text: 'Check if the list is empty',
    setup: 'List<Integer> nums = new ArrayList<>();',
    setupCode: 'List<Integer> nums = new ArrayList<>();',
    expected: true,
    sample: 'nums.isEmpty() // returns true',
    hints: ['Use isEmpty() to check if a list has no elements', 'isEmpty() returns a boolean'],
    validPatterns: [/\.isEmpty\(\)/],
    tags: ['ArrayList', 'isEmpty', 'validation'],
  },

  {
    id: 'java-list-011',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Check if Contains Element',
    text: 'Check if the list contains the number 3',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: true,
    sample: 'nums.contains(3) // returns true',
    hints: ['Use contains() to check for element presence', 'Uses equals() for comparison'],
    validPatterns: [/\.contains\(\s*3\s*\)/],
    tags: ['ArrayList', 'contains', 'search'],
  },

  {
    id: 'java-list-012',
    category: 'ArrayList Methods',
    difficulty: 'easy',
    title: 'Find Index of Element',
    text: 'Find the index of "cherry" in the list',
    setup: 'List<String> fruits = Arrays.asList("apple", "banana", "cherry", "date");',
    setupCode: 'List<String> fruits = Arrays.asList("apple", "banana", "cherry", "date");',
    expected: 2,
    sample: 'fruits.indexOf("cherry") // returns 2',
    hints: ['Use indexOf() to find the first occurrence', 'Returns -1 if not found'],
    validPatterns: [/\.indexOf\(\s*"cherry"\s*\)/],
    tags: ['ArrayList', 'indexOf', 'search'],
  },

  {
    id: 'java-list-013',
    category: 'Collections Utility',
    difficulty: 'medium',
    title: 'Sort List Ascending',
    text: 'Sort the list in ascending order',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));',
    expected: [1, 2, 5, 8, 9],
    sample: 'Collections.sort(nums); // nums is now [1, 2, 5, 8, 9]',
    hints: ['Use Collections.sort() to sort in natural order', 'Modifies the list in place'],
    validPatterns: [/Collections\.sort\(\s*nums\s*\)/],
    tags: ['Collections', 'sort', 'ordering'],
  },

  {
    id: 'java-list-014',
    category: 'Collections Utility',
    difficulty: 'medium',
    title: 'Reverse List',
    text: 'Reverse the order of elements in the list',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    expected: [5, 4, 3, 2, 1],
    sample: 'Collections.reverse(nums); // nums is now [5, 4, 3, 2, 1]',
    hints: ['Use Collections.reverse() to reverse order', 'Modifies the list in place'],
    validPatterns: [/Collections\.reverse\(\s*nums\s*\)/],
    tags: ['Collections', 'reverse', 'ordering'],
  },

  {
    id: 'java-list-015',
    category: 'ArrayList Methods',
    difficulty: 'medium',
    title: 'Get Sublist',
    text: 'Get a sublist from index 1 to 4 (exclusive)',
    setup: 'List<Integer> nums = Arrays.asList(10, 20, 30, 40, 50, 60);',
    setupCode: 'List<Integer> nums = Arrays.asList(10, 20, 30, 40, 50, 60);',
    expected: [20, 30, 40],
    sample: 'nums.subList(1, 4) // returns [20, 30, 40]',
    hints: ['Use subList(fromIndex, toIndex)', 'toIndex is exclusive'],
    validPatterns: [/\.subList\(\s*1\s*,\s*4\s*\)/],
    tags: ['ArrayList', 'subList', 'slicing'],
  },

  // ============================================================
  // Stream API (15+ problems)
  // ============================================================

  {
    id: 'java-stream-001',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Filter Even Numbers',
    text: 'Filter to keep only even numbers using streams',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    expected: [2, 4, 6],
    sample: 'nums.stream().filter(n -> n % 2 == 0).collect(Collectors.toList())',
    hints: [
      'Use stream(), filter(), and collect()',
      'Lambda: n -> n % 2 == 0 checks for even numbers',
      'Java 16+: Use .toList() instead of .collect(Collectors.toList())',
    ],
    validPatterns: [/\.stream\(\)/, /\.filter\(/, /\.collect\(|\.toList\(\)/],
    tags: ['Stream', 'filter', 'lambda'],
  },

  {
    id: 'java-stream-002',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Filter Strings by Length',
    text: 'Filter to keep only strings with length greater than 4',
    setup: 'List<String> words = Arrays.asList("cat", "elephant", "dog", "giraffe", "bee");',
    setupCode: 'List<String> words = Arrays.asList("cat", "elephant", "dog", "giraffe", "bee");',
    expected: ['elephant', 'giraffe'],
    sample: 'words.stream().filter(w -> w.length() > 4).collect(Collectors.toList())',
    hints: ['Use filter() with a length check', 'String.length() returns the character count'],
    validPatterns: [/\.stream\(\)/, /\.filter\(/, /\.length\(\)/],
    tags: ['Stream', 'filter', 'String'],
  },

  {
    id: 'java-stream-003',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Map to Uppercase',
    text: 'Transform all strings to uppercase using streams',
    setup: 'List<String> words = Arrays.asList("hello", "world", "java");',
    setupCode: 'List<String> words = Arrays.asList("hello", "world", "java");',
    expected: ['HELLO', 'WORLD', 'JAVA'],
    sample: 'words.stream().map(String::toUpperCase).collect(Collectors.toList())',
    hints: ['Use map() to transform elements', 'String::toUpperCase is a method reference'],
    validPatterns: [/\.stream\(\)/, /\.map\(/, /toUpperCase/],
    tags: ['Stream', 'map', 'transformation'],
  },

  {
    id: 'java-stream-004',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Map to String Lengths',
    text: 'Get the length of each string using streams',
    setup: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    expected: [5, 6, 6],
    sample: 'words.stream().map(String::length).collect(Collectors.toList())',
    hints: ['Use map() with String::length', 'Returns a List<Integer>'],
    validPatterns: [/\.stream\(\)/, /\.map\(/, /length/],
    tags: ['Stream', 'map', 'transformation'],
  },

  {
    id: 'java-stream-005',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Square Numbers',
    text: 'Square each number using streams',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: [1, 4, 9, 16, 25],
    sample: 'nums.stream().map(n -> n * n).collect(Collectors.toList())',
    hints: ['Use map() with a lambda that squares', 'n -> n * n squares the value'],
    validPatterns: [/\.stream\(\)/, /\.map\(/, /\*\s*n|\*\s*\w/],
    tags: ['Stream', 'map', 'math'],
  },

  {
    id: 'java-stream-006',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Sum with Reduce',
    text: 'Calculate the sum of all numbers using reduce',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: 15,
    sample: 'nums.stream().reduce(0, Integer::sum)',
    hints: [
      'Use reduce(identity, accumulator)',
      '0 is the identity, Integer::sum is the accumulator',
    ],
    validPatterns: [/\.stream\(\)/, /\.reduce\(/],
    tags: ['Stream', 'reduce', 'aggregation'],
  },

  {
    id: 'java-stream-007',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Find Maximum with Reduce',
    text: 'Find the maximum value using reduce',
    setup: 'List<Integer> nums = Arrays.asList(3, 7, 2, 9, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(3, 7, 2, 9, 5);',
    expected: 9,
    sample:
      'nums.stream().reduce(Integer::max).orElse(null) // or: nums.stream().reduce(Integer.MIN_VALUE, Integer::max)',
    hints: [
      'Use reduce() with Integer::max',
      'Prefer reduce(BinaryOperator) returning Optional over reduce with identity for max/min',
      'Alternative: use max(Comparator) which is more readable',
    ],
    validPatterns: [/\.stream\(\)/, /\.reduce\(|\.max\(/],
    tags: ['Stream', 'reduce', 'max', 'Optional'],
  },

  {
    id: 'java-stream-008',
    category: 'Stream API',
    difficulty: 'easy',
    title: 'Sort Stream',
    text: 'Sort the numbers in ascending order using streams',
    setup: 'List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);',
    expected: [1, 2, 5, 8, 9],
    sample: 'nums.stream().sorted().collect(Collectors.toList())',
    hints: ['Use sorted() for natural ordering', 'No comparator needed for natural order'],
    validPatterns: [/\.stream\(\)/, /\.sorted\(\)/, /\.collect\(/],
    tags: ['Stream', 'sorted', 'ordering'],
  },

  {
    id: 'java-stream-009',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Sort Descending',
    text: 'Sort the numbers in descending order using streams',
    setup: 'List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);',
    expected: [9, 8, 5, 2, 1],
    sample: 'nums.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList())',
    hints: ['Use sorted() with Comparator.reverseOrder()', 'Or use Collections.reverseOrder()'],
    validPatterns: [/\.stream\(\)/, /\.sorted\(/, /reverseOrder|reversed/],
    tags: ['Stream', 'sorted', 'Comparator'],
  },

  {
    id: 'java-stream-010',
    category: 'Stream API',
    difficulty: 'easy',
    title: 'Get Distinct Elements',
    text: 'Remove duplicate elements using streams',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 2, 3, 3, 3, 4);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 2, 3, 3, 3, 4);',
    expected: [1, 2, 3, 4],
    sample: 'nums.stream().distinct().collect(Collectors.toList())',
    hints: ['Use distinct() to remove duplicates', 'Uses equals() for comparison'],
    validPatterns: [/\.stream\(\)/, /\.distinct\(\)/, /\.collect\(/],
    tags: ['Stream', 'distinct', 'deduplication'],
  },

  {
    id: 'java-stream-011',
    category: 'Stream API',
    difficulty: 'easy',
    title: 'Count Elements',
    text: 'Count the number of elements using streams',
    setup: 'List<String> words = Arrays.asList("a", "b", "c", "d", "e");',
    setupCode: 'List<String> words = Arrays.asList("a", "b", "c", "d", "e");',
    expected: 5,
    sample: 'words.stream().count()',
    hints: ['Use count() to get the number of elements', 'Returns a long'],
    validPatterns: [/\.stream\(\)/, /\.count\(\)/],
    tags: ['Stream', 'count', 'aggregation'],
  },

  {
    id: 'java-stream-012',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Count Filtered Elements',
    text: 'Count how many numbers are greater than 3',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    expected: 3,
    sample: 'nums.stream().filter(n -> n > 3).count()',
    hints: ['Combine filter() and count()', 'Filter first, then count'],
    validPatterns: [/\.stream\(\)/, /\.filter\(/, /\.count\(\)/],
    tags: ['Stream', 'filter', 'count'],
  },

  {
    id: 'java-stream-013',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Any Match',
    text: 'Check if any number is greater than 10',
    setup: 'List<Integer> nums = Arrays.asList(5, 8, 12, 3, 7);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 8, 12, 3, 7);',
    expected: true,
    sample: 'nums.stream().anyMatch(n -> n > 10)',
    hints: ['Use anyMatch() with a predicate', 'Returns true if at least one matches'],
    validPatterns: [/\.stream\(\)/, /\.anyMatch\(/],
    tags: ['Stream', 'anyMatch', 'predicate'],
  },

  {
    id: 'java-stream-014',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'All Match',
    text: 'Check if all numbers are positive',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: true,
    sample: 'nums.stream().allMatch(n -> n > 0)',
    hints: ['Use allMatch() with a predicate', 'Returns true only if ALL elements match'],
    validPatterns: [/\.stream\(\)/, /\.allMatch\(/],
    tags: ['Stream', 'allMatch', 'predicate'],
  },

  {
    id: 'java-stream-015',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'None Match',
    text: 'Check if no number is negative',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: true,
    sample: 'nums.stream().noneMatch(n -> n < 0)',
    hints: ['Use noneMatch() with a predicate', 'Returns true if NO element matches'],
    validPatterns: [/\.stream\(\)/, /\.noneMatch\(/],
    tags: ['Stream', 'noneMatch', 'predicate'],
  },

  {
    id: 'java-stream-016',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Find First',
    text: 'Find the first even number in the list',
    setup: 'List<Integer> nums = Arrays.asList(1, 3, 4, 5, 6);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 3, 4, 5, 6);',
    expected: 4,
    sample: 'nums.stream().filter(n -> n % 2 == 0).findFirst().orElse(null)',
    hints: [
      'Use filter() then findFirst()',
      'findFirst() returns an Optional<T>',
      'Use orElse(default) or orElseThrow() to unwrap the Optional',
      'findAny() is similar but may return any matching element (useful for parallel streams)',
    ],
    validPatterns: [/\.stream\(\)/, /\.filter\(/, /\.findFirst\(\)/],
    tags: ['Stream', 'findFirst', 'Optional'],
  },

  {
    id: 'java-stream-017',
    category: 'Stream API',
    difficulty: 'easy',
    title: 'For Each',
    text: 'Print each element using forEach (returns void, side effect)',
    setup: 'List<String> words = Arrays.asList("hello", "world");',
    setupCode: 'List<String> words = Arrays.asList("hello", "world");',
    expected: null,
    sample: 'words.stream().forEach(System.out::println) // or: words.forEach(System.out::println)',
    hints: [
      'Use forEach() for side effects like printing',
      'System.out::println is a method reference',
      'forEach returns void - it is a terminal operation',
      'Note: List has forEach() directly, stream() is optional here',
    ],
    validPatterns: [/\.forEach\(/],
    tags: ['Stream', 'forEach', 'terminal', 'side-effect'],
  },

  {
    id: 'java-stream-018',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'FlatMap Nested Lists',
    text: 'Flatten a list of lists into a single list',
    setup:
      'List<List<Integer>> nested = Arrays.asList(\n  Arrays.asList(1, 2),\n  Arrays.asList(3, 4),\n  Arrays.asList(5, 6)\n);',
    setupCode:
      'List<List<Integer>> nested = Arrays.asList(\n  Arrays.asList(1, 2),\n  Arrays.asList(3, 4),\n  Arrays.asList(5, 6)\n);',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'nested.stream().flatMap(List::stream).collect(Collectors.toList())',
    hints: [
      'Use flatMap() to flatten nested structures',
      'flatMap transforms each element to a stream, then flattens all streams into one',
      'List::stream is a method reference equivalent to list -> list.stream()',
      'Common use: flatten nested collections, or map to multiple values per input',
    ],
    validPatterns: [/\.stream\(\)/, /\.flatMap\(/, /\.collect\(|\.toList\(\)/],
    tags: ['Stream', 'flatMap', 'nested', 'advanced'],
  },

  {
    id: 'java-stream-019',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'MapToInt and Sum',
    text: 'Calculate the sum of string lengths using mapToInt',
    setup: 'List<String> words = Arrays.asList("hello", "world", "java");',
    setupCode: 'List<String> words = Arrays.asList("hello", "world", "java");',
    expected: 14,
    sample: 'words.stream().mapToInt(String::length).sum()',
    hints: ['Use mapToInt() for primitive int stream', 'IntStream has sum() method'],
    validPatterns: [/\.stream\(\)/, /\.mapToInt\(/, /\.sum\(\)/],
    tags: ['Stream', 'mapToInt', 'IntStream'],
  },

  {
    id: 'java-stream-020',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Filter and Map Chain',
    text: 'Get the squares of even numbers only',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    expected: [4, 16, 36],
    sample: 'nums.stream().filter(n -> n % 2 == 0).map(n -> n * n).collect(Collectors.toList())',
    hints: ['Chain filter() then map()', 'Filter first to select even, then square'],
    validPatterns: [/\.stream\(\)/, /\.filter\(/, /\.map\(/, /\.collect\(/],
    tags: ['Stream', 'filter', 'map', 'chaining'],
  },

  // ============================================================
  // String Methods (10+ problems)
  // ============================================================

  {
    id: 'java-string-001',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String Length',
    text: 'Get the length of the string',
    setup: 'String str = "Hello World";',
    setupCode: 'String str = "Hello World";',
    expected: 11,
    sample: 'str.length() // returns 11',
    hints: ['Use length() method', 'Includes spaces in the count'],
    validPatterns: [/\.length\(\)/],
    tags: ['String', 'length', 'basics'],
  },

  {
    id: 'java-string-002',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Character at Index',
    text: 'Get the character at index 4',
    setup: 'String str = "Hello World";',
    setupCode: 'String str = "Hello World";',
    expected: 'o',
    sample: "str.charAt(4) // returns 'o'",
    hints: ['Use charAt(index)', 'Indices start at 0'],
    validPatterns: [/\.charAt\(\s*4\s*\)/],
    tags: ['String', 'charAt', 'access'],
  },

  {
    id: 'java-string-003',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Substring Extraction',
    text: 'Extract substring from index 0 to 5 (exclusive)',
    setup: 'String str = "Hello World";',
    setupCode: 'String str = "Hello World";',
    expected: 'Hello',
    sample: 'str.substring(0, 5) // returns "Hello"',
    hints: ['Use substring(beginIndex, endIndex)', 'endIndex is exclusive'],
    validPatterns: [/\.substring\(\s*0\s*,\s*5\s*\)/],
    tags: ['String', 'substring', 'extraction'],
  },

  {
    id: 'java-string-004',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Find Index of Substring',
    text: 'Find the index of "World" in the string',
    setup: 'String str = "Hello World";',
    setupCode: 'String str = "Hello World";',
    expected: 6,
    sample: 'str.indexOf("World") // returns 6',
    hints: ['Use indexOf(substring)', 'Returns -1 if not found'],
    validPatterns: [/\.indexOf\(\s*"World"\s*\)/],
    tags: ['String', 'indexOf', 'search'],
  },

  {
    id: 'java-string-005',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Last Index Of',
    text: 'Find the last index of the character "o"',
    setup: 'String str = "Hello World";',
    setupCode: 'String str = "Hello World";',
    expected: 7,
    sample: 'str.lastIndexOf("o") // returns 7',
    hints: ['Use lastIndexOf()', 'Returns the index of the last occurrence'],
    validPatterns: [/\.lastIndexOf\(\s*"o"\s*\)/],
    tags: ['String', 'lastIndexOf', 'search'],
  },

  {
    id: 'java-string-006',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Split String',
    text: 'Split the string by comma into an array',
    setup: 'String str = "apple,banana,cherry";',
    setupCode: 'String str = "apple,banana,cherry";',
    expected: ['apple', 'banana', 'cherry'],
    sample: 'str.split(",") // returns ["apple", "banana", "cherry"]',
    hints: ['Use split(regex)', 'Returns a String array'],
    validPatterns: [/\.split\(\s*","\s*\)/],
    tags: ['String', 'split', 'parsing'],
  },

  {
    id: 'java-string-007',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Join Strings',
    text: 'Join the array elements with " - " separator',
    setup: 'String[] words = {"apple", "banana", "cherry"};',
    setupCode: 'String[] words = {"apple", "banana", "cherry"};',
    expected: 'apple - banana - cherry',
    sample: 'String.join(" - ", words) // returns "apple - banana - cherry"',
    hints: ['Use String.join(delimiter, elements)', 'First argument is the delimiter'],
    validPatterns: [/String\.join\(/],
    tags: ['String', 'join', 'concatenation'],
  },

  {
    id: 'java-string-008',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Convert to Lowercase',
    text: 'Convert the string to lowercase',
    setup: 'String str = "HELLO WORLD";',
    setupCode: 'String str = "HELLO WORLD";',
    expected: 'hello world',
    sample: 'str.toLowerCase() // returns "hello world"',
    hints: ['Use toLowerCase()', 'Returns a new string'],
    validPatterns: [/\.toLowerCase\(\)/],
    tags: ['String', 'toLowerCase', 'case'],
  },

  {
    id: 'java-string-009',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Convert to Uppercase',
    text: 'Convert the string to uppercase',
    setup: 'String str = "hello world";',
    setupCode: 'String str = "hello world";',
    expected: 'HELLO WORLD',
    sample: 'str.toUpperCase() // returns "HELLO WORLD"',
    hints: ['Use toUpperCase()', 'Returns a new string'],
    validPatterns: [/\.toUpperCase\(\)/],
    tags: ['String', 'toUpperCase', 'case'],
  },

  {
    id: 'java-string-010',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Trim Whitespace',
    text: 'Remove leading and trailing whitespace',
    setup: 'String str = "   Hello World   ";',
    setupCode: 'String str = "   Hello World   ";',
    expected: 'Hello World',
    sample: 'str.trim() // returns "Hello World"',
    hints: [
      'Use trim() to remove leading and trailing whitespace',
      'Java 11+: Use strip() which handles Unicode whitespace better',
      'stripLeading() and stripTrailing() remove whitespace from one side only',
    ],
    validPatterns: [/\.trim\(\)|\.strip\(\)/],
    tags: ['String', 'trim', 'whitespace'],
  },

  {
    id: 'java-string-011',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Replace Characters',
    text: 'Replace all spaces with underscores',
    setup: 'String str = "Hello World Java";',
    setupCode: 'String str = "Hello World Java";',
    expected: 'Hello_World_Java',
    sample: 'str.replace(" ", "_") // returns "Hello_World_Java"',
    hints: ['Use replace(oldChar, newChar)', 'Replaces all occurrences'],
    validPatterns: [/\.replace\(\s*" "\s*,\s*"_"\s*\)/],
    tags: ['String', 'replace', 'substitution'],
  },

  {
    id: 'java-string-012',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Replace All with Regex',
    text: 'Remove all digits from the string using regex',
    setup: 'String str = "abc123def456";',
    setupCode: 'String str = "abc123def456";',
    expected: 'abcdef',
    sample: 'str.replaceAll("\\\\d", "") // returns "abcdef"',
    hints: [
      'Use replaceAll(regex, replacement)',
      'In Java, write "\\\\d" to match any digit (the double backslash escapes to \\d in the regex)',
    ],
    validPatterns: [/\.replaceAll\(/],
    tags: ['String', 'replaceAll', 'regex'],
  },

  {
    id: 'java-string-013',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Check Starts With',
    text: 'Check if the string starts with "Hello"',
    setup: 'String str = "Hello World";',
    setupCode: 'String str = "Hello World";',
    expected: true,
    sample: 'str.startsWith("Hello") // returns true',
    hints: ['Use startsWith(prefix)', 'Case sensitive'],
    validPatterns: [/\.startsWith\(\s*"Hello"\s*\)/],
    tags: ['String', 'startsWith', 'validation'],
  },

  {
    id: 'java-string-014',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Check Ends With',
    text: 'Check if the string ends with "World"',
    setup: 'String str = "Hello World";',
    setupCode: 'String str = "Hello World";',
    expected: true,
    sample: 'str.endsWith("World") // returns true',
    hints: ['Use endsWith(suffix)', 'Case sensitive'],
    validPatterns: [/\.endsWith\(\s*"World"\s*\)/],
    tags: ['String', 'endsWith', 'validation'],
  },

  {
    id: 'java-string-015',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Check Contains Substring',
    text: 'Check if the string contains "World"',
    setup: 'String str = "Hello World";',
    setupCode: 'String str = "Hello World";',
    expected: true,
    sample: 'str.contains("World") // returns true',
    hints: ['Use contains(sequence)', 'Case sensitive'],
    validPatterns: [/\.contains\(\s*"World"\s*\)/],
    tags: ['String', 'contains', 'search'],
  },

  {
    id: 'java-string-016',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String Equality',
    text: 'Check if two strings are equal',
    setup: 'String str1 = "hello";\nString str2 = "hello";',
    setupCode: 'String str1 = "hello";\nString str2 = "hello";',
    expected: true,
    sample: 'str1.equals(str2) // returns true',
    hints: [
      'Use equals() for content comparison',
      'NEVER use == for string content comparison (== checks reference equality)',
      'Objects.equals(str1, str2) is null-safe alternative',
    ],
    validPatterns: [/\.equals\(|Objects\.equals\(/],
    tags: ['String', 'equals', 'comparison', 'best-practice'],
  },

  {
    id: 'java-string-017',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String Equality Ignore Case',
    text: 'Check if two strings are equal ignoring case',
    setup: 'String str1 = "Hello";\nString str2 = "hello";',
    setupCode: 'String str1 = "Hello";\nString str2 = "hello";',
    expected: true,
    sample: 'str1.equalsIgnoreCase(str2) // returns true',
    hints: ['Use equalsIgnoreCase()', 'Ignores uppercase/lowercase differences'],
    validPatterns: [/\.equalsIgnoreCase\(/],
    tags: ['String', 'equalsIgnoreCase', 'comparison'],
  },

  // ============================================================
  // Array Operations (5+ problems)
  // ============================================================

  {
    id: 'java-array-001',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Array Length',
    text: 'Get the length of the array',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: 5,
    sample: 'nums.length // returns 5',
    hints: ['Use .length property (no parentheses)', 'Arrays use length, not length()'],
    validPatterns: [/\.length(?!\()/],
    tags: ['Array', 'length', 'basics'],
  },

  {
    id: 'java-array-002',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Sort Array',
    text: 'Sort the array in ascending order',
    setup: 'int[] nums = {5, 2, 8, 1, 9};',
    setupCode: 'int[] nums = {5, 2, 8, 1, 9};',
    expected: [1, 2, 5, 8, 9],
    sample: 'Arrays.sort(nums); // nums is now {1, 2, 5, 8, 9}',
    hints: ['Use Arrays.sort()', 'Sorts in place'],
    validPatterns: [/Arrays\.sort\(\s*nums\s*\)/],
    tags: ['Arrays', 'sort', 'ordering'],
  },

  {
    id: 'java-array-003',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Array to List',
    text: 'Convert the array to a List',
    setup: 'String[] arr = {"apple", "banana", "cherry"};',
    setupCode: 'String[] arr = {"apple", "banana", "cherry"};',
    expected: ['apple', 'banana', 'cherry'],
    sample: 'Arrays.asList(arr) // returns List containing "apple", "banana", "cherry"',
    hints: ['Use Arrays.asList()', 'Returns a fixed-size list'],
    validPatterns: [/Arrays\.asList\(\s*arr\s*\)/],
    tags: ['Arrays', 'asList', 'conversion'],
  },

  {
    id: 'java-array-004',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Array to Stream and Sum',
    text: 'Convert the array to a Stream and calculate the sum',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: 15,
    sample: 'Arrays.stream(nums).sum() // returns 15',
    hints: [
      'Use Arrays.stream() to create an IntStream',
      'IntStream has sum(), average(), min(), max() methods',
      'For primitive arrays, Arrays.stream() returns primitive streams (IntStream, LongStream, DoubleStream)',
    ],
    validPatterns: [/Arrays\.stream\(\s*nums\s*\)/],
    tags: ['Arrays', 'stream', 'IntStream', 'conversion'],
  },

  {
    id: 'java-array-005',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Binary Search',
    text: 'Find the index of 5 in the sorted array using binary search',
    setup: 'int[] nums = {1, 2, 3, 4, 5, 6, 7};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5, 6, 7};',
    expected: 4,
    sample: 'Arrays.binarySearch(nums, 5) // returns 4',
    hints: ['Use Arrays.binarySearch()', 'Array must be sorted first'],
    validPatterns: [/Arrays\.binarySearch\(\s*nums\s*,\s*5\s*\)/],
    tags: ['Arrays', 'binarySearch', 'search'],
  },

  {
    id: 'java-array-006',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Fill Array',
    text: 'Fill the entire array with the value 0',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: [0, 0, 0, 0, 0],
    sample: 'Arrays.fill(nums, 0); // nums is now {0, 0, 0, 0, 0}',
    hints: ['Use Arrays.fill()', 'Fills all elements with the value'],
    validPatterns: [/Arrays\.fill\(\s*nums\s*,\s*0\s*\)/],
    tags: ['Arrays', 'fill', 'initialization'],
  },

  {
    id: 'java-array-007',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Copy Array',
    text: 'Create a copy of the first 3 elements',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: [1, 2, 3],
    sample: 'Arrays.copyOf(nums, 3) // returns {1, 2, 3}',
    hints: ['Use Arrays.copyOf()', 'Second argument is the new length'],
    validPatterns: [/Arrays\.copyOf\(\s*nums\s*,\s*3\s*\)/],
    tags: ['Arrays', 'copyOf', 'copy'],
  },

  {
    id: 'java-array-008',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Array Equality',
    text: 'Check if two arrays have the same elements',
    setup: 'int[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 3};',
    setupCode: 'int[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 3};',
    expected: true,
    sample: 'Arrays.equals(arr1, arr2) // returns true',
    hints: ['Use Arrays.equals()', 'Compares element by element'],
    validPatterns: [/Arrays\.equals\(/],
    tags: ['Arrays', 'equals', 'comparison'],
  },

  // ============================================================
  // Additional Stream API Problems
  // ============================================================

  {
    id: 'java-stream-021',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Group By with Collectors',
    text: 'Group strings by their length',
    setup: 'List<String> words = Arrays.asList("cat", "dog", "elephant", "rat", "giraffe");',
    setupCode: 'List<String> words = Arrays.asList("cat", "dog", "elephant", "rat", "giraffe");',
    expected: { 3: ['cat', 'dog', 'rat'], 7: ['giraffe'], 8: ['elephant'] },
    sample: 'words.stream().collect(Collectors.groupingBy(String::length))',
    hints: [
      'Use Collectors.groupingBy(classifier)',
      'Returns Map<K, List<T>> where K is the classifier result',
      'String::length is a method reference returning the string length',
    ],
    validPatterns: [/\.stream\(\)/, /\.collect\(/, /groupingBy/],
    tags: ['Stream', 'Collectors', 'groupingBy', 'Map'],
  },

  {
    id: 'java-stream-022',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Join Strings with Collectors',
    text: 'Join all strings with comma separator',
    setup: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    expected: 'apple,banana,cherry',
    sample: 'words.stream().collect(Collectors.joining(","))',
    hints: ['Use Collectors.joining()', 'Pass the delimiter as argument'],
    validPatterns: [/\.stream\(\)/, /\.collect\(/, /joining/],
    tags: ['Stream', 'Collectors', 'joining'],
  },

  {
    id: 'java-stream-023',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Average with IntStream',
    text: 'Calculate the average of numbers',
    setup: 'List<Integer> nums = Arrays.asList(10, 20, 30, 40, 50);',
    setupCode: 'List<Integer> nums = Arrays.asList(10, 20, 30, 40, 50);',
    expected: 30.0,
    sample: 'nums.stream().mapToInt(Integer::intValue).average().orElse(0)',
    hints: ['Use mapToInt() then average()', 'average() returns OptionalDouble'],
    validPatterns: [/\.stream\(\)/, /\.mapToInt\(/, /\.average\(\)/],
    tags: ['Stream', 'IntStream', 'average'],
  },

  {
    id: 'java-stream-024',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Limit Stream Results',
    text: 'Get only the first 3 elements from the stream',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7);',
    expected: [1, 2, 3],
    sample: 'nums.stream().limit(3).collect(Collectors.toList())',
    hints: [
      'Use limit(n) to restrict the stream size',
      'limit() is a short-circuiting intermediate operation',
    ],
    validPatterns: [/\.stream\(\)/, /\.limit\(\s*3\s*\)/, /\.collect\(/],
    tags: ['Stream', 'limit', 'truncation'],
  },

  {
    id: 'java-stream-025',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Skip Elements',
    text: 'Skip the first 2 elements and get the rest',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: [3, 4, 5],
    sample: 'nums.stream().skip(2).collect(Collectors.toList())',
    hints: ['Use skip(n) to skip elements', 'skip() is a stateful intermediate operation'],
    validPatterns: [/\.stream\(\)/, /\.skip\(\s*2\s*\)/, /\.collect\(/],
    tags: ['Stream', 'skip', 'pagination'],
  },

  // ============================================================
  // Additional ArrayList Problems
  // ============================================================

  {
    id: 'java-list-016',
    category: 'ArrayList Methods',
    difficulty: 'medium',
    title: 'Last Index Of Element',
    text: 'Find the last index of the number 2 in the list',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 2, 4, 2, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 2, 4, 2, 5);',
    expected: 5,
    sample: 'nums.lastIndexOf(2) // returns 5',
    hints: ['Use lastIndexOf()', 'Returns the index of the last occurrence'],
    validPatterns: [/\.lastIndexOf\(\s*2\s*\)/],
    tags: ['ArrayList', 'lastIndexOf', 'search'],
  },

  {
    id: 'java-list-017',
    category: 'Collections Utility',
    difficulty: 'medium',
    title: 'Find Maximum',
    text: 'Find the maximum element in the list',
    setup: 'List<Integer> nums = Arrays.asList(3, 7, 2, 9, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(3, 7, 2, 9, 5);',
    expected: 9,
    sample: 'Collections.max(nums) // returns 9',
    hints: ['Use Collections.max()', 'Works with Comparable elements'],
    validPatterns: [/Collections\.max\(\s*nums\s*\)/],
    tags: ['Collections', 'max', 'aggregation'],
  },

  {
    id: 'java-list-018',
    category: 'Collections Utility',
    difficulty: 'medium',
    title: 'Find Minimum',
    text: 'Find the minimum element in the list',
    setup: 'List<Integer> nums = Arrays.asList(3, 7, 2, 9, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(3, 7, 2, 9, 5);',
    expected: 2,
    sample: 'Collections.min(nums) // returns 2',
    hints: ['Use Collections.min()', 'Works with Comparable elements'],
    validPatterns: [/Collections\.min\(\s*nums\s*\)/],
    tags: ['Collections', 'min', 'aggregation'],
  },

  {
    id: 'java-list-019',
    category: 'Collections Utility',
    difficulty: 'medium',
    title: 'Shuffle List',
    text: 'Randomly shuffle the elements in the list (use Collections.shuffle)',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    expected: null,
    sample: 'Collections.shuffle(nums); // nums is now in random order',
    hints: [
      'Use Collections.shuffle(list)',
      'Modifies the list in place using a default Random source',
      'For reproducible shuffles, use Collections.shuffle(list, random) with a seeded Random',
    ],
    validPatterns: [/Collections\.shuffle\(\s*nums/],
    tags: ['Collections', 'shuffle', 'random', 'in-place'],
  },

  {
    id: 'java-list-020',
    category: 'Collections Utility',
    difficulty: 'medium',
    title: 'Frequency Count',
    text: 'Count how many times the number 3 appears in the list',
    setup: 'List<Integer> nums = Arrays.asList(1, 3, 2, 3, 4, 3, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 3, 2, 3, 4, 3, 5);',
    expected: 3,
    sample: 'Collections.frequency(nums, 3) // returns 3',
    hints: ['Use Collections.frequency()', 'Counts occurrences of specified element'],
    validPatterns: [/Collections\.frequency\(\s*nums\s*,\s*3\s*\)/],
    tags: ['Collections', 'frequency', 'counting'],
  },

  // ============================================================
  // Stream API - Advanced Operations (5 problems)
  // ============================================================

  {
    id: 'java-stream-026',
    category: 'Stream API',
    difficulty: 'easy',
    title: 'Filter with Multiple Conditions',
    text: 'Filter numbers that are both positive and even',
    setup: 'List<Integer> nums = Arrays.asList(-2, -1, 0, 1, 2, 3, 4, 5, 6);',
    setupCode: 'List<Integer> nums = Arrays.asList(-2, -1, 0, 1, 2, 3, 4, 5, 6);',
    expected: [2, 4, 6],
    sample: 'nums.stream().filter(n -> n > 0 && n % 2 == 0).collect(Collectors.toList())',
    hints: [
      'Use filter() with a compound predicate',
      'Combine conditions with && (and) operator',
      'n > 0 checks positive, n % 2 == 0 checks even',
    ],
    validPatterns: [/\.stream\(\)/, /\.filter\(/, /&&/],
    tags: ['Stream', 'filter', 'predicate', 'lambda'],
  },

  {
    id: 'java-stream-027',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'FlatMap Characters from Strings',
    text: 'Extract all unique characters from all words as a sorted list',
    setup: 'List<String> words = Arrays.asList("hello", "world");',
    setupCode: 'List<String> words = Arrays.asList("hello", "world");',
    expected: ['d', 'e', 'h', 'l', 'o', 'r', 'w'],
    sample:
      'words.stream().flatMap(w -> w.chars().mapToObj(c -> String.valueOf((char) c))).distinct().sorted().collect(Collectors.toList())',
    hints: [
      'Use flatMap to convert each string to a stream of characters',
      'String.chars() returns an IntStream of character codes',
      'Use mapToObj to convert int to Character or String',
      'Apply distinct() to remove duplicates, sorted() for ordering',
    ],
    validPatterns: [/\.stream\(\)/, /\.flatMap\(/, /\.distinct\(\)/, /\.sorted\(\)/],
    tags: ['Stream', 'flatMap', 'distinct', 'sorted', 'advanced'],
  },

  {
    id: 'java-stream-028',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collect to Map',
    text: 'Create a Map where key is the string and value is its length',
    setup: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    expected: { apple: 5, banana: 6, cherry: 6 },
    sample: 'words.stream().collect(Collectors.toMap(Function.identity(), String::length))',
    hints: [
      'Use Collectors.toMap(keyMapper, valueMapper)',
      'Function.identity() returns the element itself as the key',
      'String::length extracts the value',
      'For duplicate keys, add a merge function as third argument',
    ],
    validPatterns: [/\.stream\(\)/, /\.collect\(/, /toMap/],
    tags: ['Stream', 'Collectors', 'toMap', 'Function'],
  },

  {
    id: 'java-stream-029',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'GroupingBy with Downstream Collector',
    text: 'Group by string length and count elements in each group',
    setup: 'List<String> words = Arrays.asList("cat", "dog", "elephant", "rat", "giraffe", "ant");',
    setupCode:
      'List<String> words = Arrays.asList("cat", "dog", "elephant", "rat", "giraffe", "ant");',
    expected: { 3: 4, 7: 1, 8: 1 },
    sample: 'words.stream().collect(Collectors.groupingBy(String::length, Collectors.counting()))',
    hints: [
      'Use groupingBy with a downstream collector',
      'Collectors.counting() counts elements in each group',
      'Returns Map<Integer, Long> where Integer is length, Long is count',
    ],
    validPatterns: [/\.stream\(\)/, /\.collect\(/, /groupingBy/, /counting/],
    tags: ['Stream', 'Collectors', 'groupingBy', 'counting', 'advanced'],
  },

  {
    id: 'java-stream-030',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Reduce with Concatenation',
    text: 'Concatenate all strings into one using reduce',
    setup: 'List<String> words = Arrays.asList("Hello", " ", "World", "!");',
    setupCode: 'List<String> words = Arrays.asList("Hello", " ", "World", "!");',
    expected: 'Hello World!',
    sample: 'words.stream().reduce("", String::concat)',
    hints: [
      'Use reduce(identity, accumulator)',
      'Empty string "" is the identity for concatenation',
      'String::concat is a method reference for string concatenation',
      'Alternative: use Collectors.joining() for better performance',
    ],
    validPatterns: [/\.stream\(\)/, /\.reduce\(/],
    tags: ['Stream', 'reduce', 'String', 'concatenation'],
  },

  // ============================================================
  // Optional Methods (5 problems)
  // ============================================================

  {
    id: 'java-optional-001',
    category: 'Optional Methods',
    difficulty: 'easy',
    title: 'Create Optional with Value',
    text: 'Create an Optional containing the string "hello"',
    setup: '// Create an Optional<String> containing "hello"',
    setupCode: '// Create an Optional<String> containing "hello"',
    expected: 'hello',
    sample: 'Optional.of("hello") // Optional containing "hello"',
    hints: [
      'Use Optional.of(value) for non-null values',
      'Optional.of() throws NullPointerException if value is null',
      'Use Optional.ofNullable() if value might be null',
    ],
    validPatterns: [/Optional\.of\(\s*"hello"\s*\)/],
    tags: ['Optional', 'of', 'creation'],
  },

  {
    id: 'java-optional-002',
    category: 'Optional Methods',
    difficulty: 'easy',
    title: 'Create Optional from Nullable',
    text: 'Create an Optional that safely handles a potentially null value',
    setup: 'String value = null;',
    setupCode: 'String value = null;',
    expected: 'Optional.empty',
    sample: 'Optional.ofNullable(value) // Optional.empty if null',
    hints: [
      'Use Optional.ofNullable() for potentially null values',
      'Returns Optional.empty() if the value is null',
      'Safer than Optional.of() for uncertain values',
    ],
    validPatterns: [/Optional\.ofNullable\(\s*value\s*\)/],
    tags: ['Optional', 'ofNullable', 'null-safety'],
  },

  {
    id: 'java-optional-003',
    category: 'Optional Methods',
    difficulty: 'easy',
    title: 'Get Value or Default',
    text: 'Get the value from Optional or return "default" if empty',
    setup: 'Optional<String> opt = Optional.empty();',
    setupCode: 'Optional<String> opt = Optional.empty();',
    expected: 'default',
    sample: 'opt.orElse("default") // returns "default"',
    hints: [
      'Use orElse(defaultValue) to provide a fallback',
      'The default value is always evaluated',
      'Use orElseGet(() -> ...) for lazy evaluation of default',
    ],
    validPatterns: [/\.orElse\(\s*"default"\s*\)/],
    tags: ['Optional', 'orElse', 'default'],
  },

  {
    id: 'java-optional-004',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Get Value with Lazy Default',
    text: 'Get the value or compute a default lazily using orElseGet',
    setup: 'Optional<String> opt = Optional.empty();',
    setupCode: 'Optional<String> opt = Optional.empty();',
    expected: 'computed',
    sample: 'opt.orElseGet(() -> "computed") // returns "computed"',
    hints: [
      'Use orElseGet(Supplier) for lazy evaluation',
      'The supplier is only called if Optional is empty',
      'More efficient than orElse() when default is expensive to compute',
    ],
    validPatterns: [/\.orElseGet\(/],
    tags: ['Optional', 'orElseGet', 'Supplier', 'lazy'],
  },

  {
    id: 'java-optional-005',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Map Optional Value',
    text: 'Transform the Optional value to uppercase if present',
    setup: 'Optional<String> opt = Optional.of("hello");',
    setupCode: 'Optional<String> opt = Optional.of("hello");',
    expected: 'HELLO',
    sample: 'opt.map(String::toUpperCase).orElse("") // returns "HELLO"',
    hints: [
      'Use map() to transform the value inside Optional',
      'map() returns Optional.empty() if original is empty',
      'Chain with orElse() to extract the final value',
    ],
    validPatterns: [/\.map\(/, /toUpperCase/],
    tags: ['Optional', 'map', 'transformation'],
  },

  {
    id: 'java-optional-006',
    category: 'Optional Methods',
    difficulty: 'hard',
    title: 'FlatMap Nested Optional',
    text: 'Extract nested Optional value using flatMap',
    setup:
      'Optional<String> inner = Optional.of("nested");\nOptional<Optional<String>> outer = Optional.of(inner);',
    setupCode:
      'Optional<String> inner = Optional.of("nested");\nOptional<Optional<String>> outer = Optional.of(inner);',
    expected: 'nested',
    sample: 'outer.flatMap(Function.identity()).orElse("") // returns "nested"',
    hints: [
      'Use flatMap() to flatten nested Optionals',
      'flatMap expects a function returning Optional<T>',
      'Function.identity() returns the inner Optional as-is',
      'Avoids Optional<Optional<T>> nesting',
    ],
    validPatterns: [/\.flatMap\(/],
    tags: ['Optional', 'flatMap', 'nested', 'advanced'],
  },

  // ============================================================
  // String Methods - Modern Java (5 problems)
  // ============================================================

  {
    id: 'java-string-018',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Format String',
    text: 'Format a string with name "John" and age 25',
    setup: 'String name = "John";\nint age = 25;',
    setupCode: 'String name = "John";\nint age = 25;',
    expected: 'Name: John, Age: 25',
    sample: 'String.format("Name: %s, Age: %d", name, age)',
    hints: [
      'Use String.format(pattern, args...)',
      '%s is placeholder for strings, %d for integers',
      'Other formats: %f (float), %b (boolean), %n (newline)',
    ],
    validPatterns: [/String\.format\(/],
    tags: ['String', 'format', 'placeholder'],
  },

  {
    id: 'java-string-019',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Join with Delimiter',
    text: 'Join the list elements with " | " delimiter',
    setup: 'List<String> items = Arrays.asList("one", "two", "three");',
    setupCode: 'List<String> items = Arrays.asList("one", "two", "three");',
    expected: 'one | two | three',
    sample: 'String.join(" | ", items)',
    hints: [
      'Use String.join(delimiter, elements)',
      'Works with arrays and Iterable collections',
      'First argument is the delimiter string',
    ],
    validPatterns: [/String\.join\(\s*"\s*\|\s*"\s*,\s*items\s*\)/],
    tags: ['String', 'join', 'delimiter'],
  },

  {
    id: 'java-string-020',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Repeat String',
    text: 'Repeat the string "ab" three times (Java 11+)',
    setup: 'String str = "ab";',
    setupCode: 'String str = "ab";',
    expected: 'ababab',
    sample: 'str.repeat(3) // returns "ababab"',
    hints: [
      'Use repeat(count) method (Java 11+)',
      'Returns a new string with the original repeated count times',
      'repeat(0) returns empty string',
    ],
    validPatterns: [/\.repeat\(\s*3\s*\)/],
    tags: ['String', 'repeat', 'Java11'],
  },

  {
    id: 'java-string-021',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Strip Whitespace',
    text: 'Remove leading and trailing whitespace including Unicode (Java 11+)',
    setup: 'String str = "\\u2000  Hello World  \\u2000";',
    setupCode: 'String str = "\\u2000  Hello World  \\u2000";',
    expected: 'Hello World',
    sample: 'str.strip() // returns "Hello World"',
    hints: [
      'Use strip() instead of trim() (Java 11+)',
      'strip() handles Unicode whitespace characters',
      'stripLeading() and stripTrailing() for one side only',
    ],
    validPatterns: [/\.strip\(\)/],
    tags: ['String', 'strip', 'whitespace', 'Java11'],
  },

  {
    id: 'java-string-022',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Indent String Lines',
    text: 'Add 4 spaces of indentation to each line (Java 12+)',
    setup: 'String str = "line1\\nline2\\nline3";',
    setupCode: 'String str = "line1\\nline2\\nline3";',
    expected: '    line1\n    line2\n    line3\n',
    sample: 'str.indent(4) // adds 4 spaces to each line',
    hints: [
      'Use indent(n) method (Java 12+)',
      'Positive n adds spaces, negative n removes spaces',
      'Also normalizes line endings and adds trailing newline',
    ],
    validPatterns: [/\.indent\(\s*4\s*\)/],
    tags: ['String', 'indent', 'formatting', 'Java12'],
  },

  // ============================================================
  // Collection Methods (5 problems)
  // ============================================================

  {
    id: 'java-collection-001',
    category: 'Collection Methods',
    difficulty: 'easy',
    title: 'Remove If Condition',
    text: 'Remove all even numbers from the list using removeIf',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));',
    expected: [1, 3, 5],
    sample: 'nums.removeIf(n -> n % 2 == 0); // removes even numbers',
    hints: [
      'Use removeIf(Predicate) to remove elements matching condition',
      'Modifies the list in place',
      'Returns true if any elements were removed',
    ],
    validPatterns: [/\.removeIf\(/],
    tags: ['Collection', 'removeIf', 'Predicate', 'in-place'],
  },

  {
    id: 'java-collection-002',
    category: 'Collection Methods',
    difficulty: 'medium',
    title: 'Replace All Elements',
    text: 'Double every element in the list using replaceAll',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    expected: [2, 4, 6, 8, 10],
    sample: 'nums.replaceAll(n -> n * 2); // doubles each element',
    hints: [
      'Use replaceAll(UnaryOperator) to transform all elements',
      'Modifies the list in place',
      'UnaryOperator takes and returns the same type',
    ],
    validPatterns: [/\.replaceAll\(/],
    tags: ['List', 'replaceAll', 'UnaryOperator', 'transformation'],
  },

  {
    id: 'java-collection-003',
    category: 'Collection Methods',
    difficulty: 'medium',
    title: 'Compute Value in Map',
    text: 'Update the value for key "count" by incrementing it, or set to 1 if absent',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("count", 5);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("count", 5);',
    expected: 6,
    sample: 'map.compute("count", (k, v) -> v == null ? 1 : v + 1) // returns 6',
    hints: [
      'Use compute(key, BiFunction) to update values',
      'BiFunction receives key and current value (may be null)',
      'Return null from function to remove the key',
    ],
    validPatterns: [/\.compute\(/],
    tags: ['Map', 'compute', 'BiFunction', 'update'],
  },

  {
    id: 'java-collection-004',
    category: 'Collection Methods',
    difficulty: 'hard',
    title: 'Merge Map Values',
    text: 'Merge value 10 into key "total", adding to existing value if present',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("total", 5);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("total", 5);',
    expected: 15,
    sample: 'map.merge("total", 10, Integer::sum) // returns 15',
    hints: [
      'Use merge(key, value, BiFunction) to combine values',
      'If key exists, applies BiFunction to old and new values',
      'If key absent, inserts the new value directly',
      'Integer::sum adds the two values',
    ],
    validPatterns: [/\.merge\(/],
    tags: ['Map', 'merge', 'BiFunction', 'aggregation'],
  },

  {
    id: 'java-collection-005',
    category: 'Collection Methods',
    difficulty: 'easy',
    title: 'Remove If from Map',
    text: 'Remove all entries where value is less than 10',
    setup:
      'Map<String, Integer> map = new HashMap<>();\nmap.put("a", 5);\nmap.put("b", 15);\nmap.put("c", 3);',
    setupCode:
      'Map<String, Integer> map = new HashMap<>();\nmap.put("a", 5);\nmap.put("b", 15);\nmap.put("c", 3);',
    expected: { b: 15 },
    sample: 'map.entrySet().removeIf(e -> e.getValue() < 10);',
    hints: [
      'Use entrySet().removeIf() to remove map entries conditionally',
      'Entry provides getKey() and getValue() methods',
      'Alternatively use map.values().removeIf() for value-only conditions',
    ],
    validPatterns: [/\.removeIf\(/],
    tags: ['Map', 'removeIf', 'entrySet', 'filtering'],
  },

  // ============================================================
  // Map Methods (5 problems)
  // ============================================================

  {
    id: 'java-map-001',
    category: 'Map Methods',
    difficulty: 'easy',
    title: 'Get with Default Value',
    text: 'Get value for key "missing" or return 0 if not found',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("present", 42);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("present", 42);',
    expected: 0,
    sample: 'map.getOrDefault("missing", 0) // returns 0',
    hints: [
      'Use getOrDefault(key, defaultValue)',
      'Returns default if key is not found or value is null',
      'Cleaner than checking containsKey() first',
    ],
    validPatterns: [/\.getOrDefault\(\s*"missing"\s*,\s*0\s*\)/],
    tags: ['Map', 'getOrDefault', 'default'],
  },

  {
    id: 'java-map-002',
    category: 'Map Methods',
    difficulty: 'easy',
    title: 'Put If Absent',
    text: 'Add key "new" with value 100 only if key does not exist',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("existing", 50);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("existing", 50);',
    expected: 100,
    sample: 'map.putIfAbsent("new", 100) // adds and returns null (no previous value)',
    hints: [
      'Use putIfAbsent(key, value) to avoid overwriting',
      'Returns previous value (null if key was absent)',
      'Does not update if key already exists',
    ],
    validPatterns: [/\.putIfAbsent\(\s*"new"\s*,\s*100\s*\)/],
    tags: ['Map', 'putIfAbsent', 'conditional'],
  },

  {
    id: 'java-map-003',
    category: 'Map Methods',
    difficulty: 'medium',
    title: 'Compute If Absent',
    text: 'Get or create a new ArrayList for key "items" if absent',
    setup: 'Map<String, List<String>> map = new HashMap<>();',
    setupCode: 'Map<String, List<String>> map = new HashMap<>();',
    expected: [],
    sample: 'map.computeIfAbsent("items", k -> new ArrayList<>())',
    hints: [
      'Use computeIfAbsent(key, Function) for lazy initialization',
      'Function is only called if key is absent',
      'Returns the existing or newly computed value',
      'Perfect for Map<K, Collection<V>> patterns',
    ],
    validPatterns: [/\.computeIfAbsent\(/],
    tags: ['Map', 'computeIfAbsent', 'lazy', 'initialization'],
  },

  {
    id: 'java-map-004',
    category: 'Map Methods',
    difficulty: 'medium',
    title: 'Compute If Present',
    text: 'Update value for key "score" by adding 10, only if key exists',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("score", 50);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("score", 50);',
    expected: 60,
    sample: 'map.computeIfPresent("score", (k, v) -> v + 10) // returns 60',
    hints: [
      'Use computeIfPresent(key, BiFunction) to update existing values',
      'BiFunction receives key and current value',
      'Does nothing if key is absent',
      'Return null to remove the entry',
    ],
    validPatterns: [/\.computeIfPresent\(/],
    tags: ['Map', 'computeIfPresent', 'BiFunction', 'update'],
  },

  {
    id: 'java-map-005',
    category: 'Map Methods',
    difficulty: 'hard',
    title: 'Iterate Map with forEach',
    text: 'Print all key-value pairs using forEach (returns void)',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("a", 1);\nmap.put("b", 2);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("a", 1);\nmap.put("b", 2);',
    expected: null,
    sample: 'map.forEach((k, v) -> System.out.println(k + "=" + v)); // prints each entry',
    hints: [
      'Use forEach(BiConsumer) to iterate over map entries',
      'BiConsumer receives key and value as parameters',
      'Cleaner than iterating over entrySet()',
      'Returns void - use for side effects only',
    ],
    validPatterns: [/\.forEach\(/],
    tags: ['Map', 'forEach', 'BiConsumer', 'iteration'],
  },

  // ============================================================
  // Array Operations - Advanced (25 problems)
  // ============================================================

  // --- EASY (8 problems) ---

  {
    id: 'java-arr-001',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Sort Array Range',
    text: 'Sort only elements from index 1 to 4 (exclusive) of the array',
    setup: 'int[] nums = {5, 3, 1, 4, 2, 9, 7};',
    setupCode: 'int[] nums = {5, 3, 1, 4, 2, 9, 7};',
    expected: [5, 1, 3, 4, 2, 9, 7],
    sample: 'Arrays.sort(nums, 1, 4); // sorts indices 1-3 only',
    hints: [
      'Use Arrays.sort(array, fromIndex, toIndex)',
      'fromIndex is inclusive, toIndex is exclusive',
      'Only the specified range is sorted',
    ],
    validPatterns: [/Arrays\.sort\(\s*nums\s*,\s*1\s*,\s*4\s*\)/],
    tags: ['Arrays', 'sort', 'range', 'partial'],
  },

  {
    id: 'java-arr-002',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Fill Array Range',
    text: 'Fill elements from index 2 to 5 (exclusive) with the value 7',
    setup: 'int[] nums = {1, 2, 3, 4, 5, 6, 7};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5, 6, 7};',
    expected: [1, 2, 7, 7, 7, 6, 7],
    sample: 'Arrays.fill(nums, 2, 5, 7); // fills indices 2-4 with 7',
    hints: [
      'Use Arrays.fill(array, fromIndex, toIndex, value)',
      'fromIndex is inclusive, toIndex is exclusive',
      'Only the specified range is filled',
    ],
    validPatterns: [/Arrays\.fill\(\s*nums\s*,\s*2\s*,\s*5\s*,\s*7\s*\)/],
    tags: ['Arrays', 'fill', 'range', 'initialization'],
  },

  {
    id: 'java-arr-003',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Copy Array Range',
    text: 'Copy elements from index 2 to 5 (exclusive) into a new array',
    setup: 'int[] nums = {10, 20, 30, 40, 50, 60};',
    setupCode: 'int[] nums = {10, 20, 30, 40, 50, 60};',
    expected: [30, 40, 50],
    sample: 'Arrays.copyOfRange(nums, 2, 5) // returns {30, 40, 50}',
    hints: [
      'Use Arrays.copyOfRange(array, from, to)',
      'Creates a new array with the specified range',
      'from is inclusive, to is exclusive',
    ],
    validPatterns: [/Arrays\.copyOfRange\(\s*nums\s*,\s*2\s*,\s*5\s*\)/],
    tags: ['Arrays', 'copyOfRange', 'slicing', 'copy'],
  },

  {
    id: 'java-arr-004',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Array to String',
    text: 'Convert the array to a readable string representation',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: '[1, 2, 3, 4, 5]',
    sample: 'Arrays.toString(nums) // returns "[1, 2, 3, 4, 5]"',
    hints: [
      'Use Arrays.toString() for readable output',
      'Much better than array.toString() which shows memory address',
      'Works for all primitive and object arrays',
    ],
    validPatterns: [/Arrays\.toString\(\s*nums\s*\)/],
    tags: ['Arrays', 'toString', 'debugging', 'display'],
  },

  {
    id: 'java-arr-005',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Compare Arrays for Equality',
    text: 'Check if two integer arrays contain the same elements',
    setup: 'int[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 3};',
    setupCode: 'int[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 3};',
    expected: true,
    sample: 'Arrays.equals(arr1, arr2) // returns true',
    hints: [
      'Use Arrays.equals() for array comparison',
      'Never use == which compares references',
      'Compares element by element in order',
    ],
    validPatterns: [/Arrays\.equals\(\s*arr1\s*,\s*arr2\s*\)/],
    tags: ['Arrays', 'equals', 'comparison', 'equality'],
  },

  {
    id: 'java-arr-006',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Create List from Array',
    text: 'Convert the string array to a List (fixed-size)',
    setup: 'String[] arr = {"red", "green", "blue"};',
    setupCode: 'String[] arr = {"red", "green", "blue"};',
    expected: ['red', 'green', 'blue'],
    sample: 'Arrays.asList(arr) // returns fixed-size List',
    hints: [
      'Use Arrays.asList() to wrap array as List',
      'The returned list is fixed-size (cannot add/remove)',
      'Changes to array reflect in list and vice versa',
      'For mutable list: new ArrayList<>(Arrays.asList(arr))',
    ],
    validPatterns: [/Arrays\.asList\(\s*arr\s*\)/],
    tags: ['Arrays', 'asList', 'List', 'conversion'],
  },

  {
    id: 'java-arr-007',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'Create Mutable List from Array',
    text: 'Convert the array to a mutable ArrayList',
    setup: 'Integer[] arr = {1, 2, 3, 4, 5};',
    setupCode: 'Integer[] arr = {1, 2, 3, 4, 5};',
    expected: [1, 2, 3, 4, 5],
    sample: 'new ArrayList<>(Arrays.asList(arr)) // mutable list',
    hints: [
      'Wrap Arrays.asList() in new ArrayList<>()',
      'The result is a mutable list that can be modified',
      'Java 9+: List.of(arr) creates immutable list',
    ],
    validPatterns: [/new\s+ArrayList<.*>\(\s*Arrays\.asList\(\s*arr\s*\)\s*\)/],
    tags: ['Arrays', 'ArrayList', 'conversion', 'mutable'],
  },

  {
    id: 'java-arr-008',
    category: 'Arrays Utility',
    difficulty: 'easy',
    title: 'System Array Copy',
    text: 'Copy 3 elements from src starting at index 1 to dest starting at index 2',
    setup: 'int[] src = {10, 20, 30, 40, 50};\nint[] dest = {0, 0, 0, 0, 0, 0};',
    setupCode: 'int[] src = {10, 20, 30, 40, 50};\nint[] dest = {0, 0, 0, 0, 0, 0};',
    expected: [0, 0, 20, 30, 40, 0],
    sample: 'System.arraycopy(src, 1, dest, 2, 3); // copies 3 elements',
    hints: [
      'Use System.arraycopy(src, srcPos, dest, destPos, length)',
      'Fastest way to copy array portions',
      'Can copy within same array (use caution with overlapping)',
    ],
    validPatterns: [/System\.arraycopy\(\s*src\s*,\s*1\s*,\s*dest\s*,\s*2\s*,\s*3\s*\)/],
    tags: ['System', 'arraycopy', 'copy', 'performance'],
  },

  // --- MEDIUM (12 problems) ---

  {
    id: 'java-arr-009',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Binary Search Range',
    text: 'Search for value 5 in sorted array range from index 2 to 7 (exclusive)',
    setup: 'int[] nums = {1, 2, 3, 4, 5, 6, 7, 8, 9};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5, 6, 7, 8, 9};',
    expected: 4,
    sample: 'Arrays.binarySearch(nums, 2, 7, 5) // returns 4',
    hints: [
      'Use Arrays.binarySearch(array, fromIndex, toIndex, key)',
      'Array must be sorted in the search range',
      'Returns negative value if not found: -(insertion point) - 1',
    ],
    validPatterns: [/Arrays\.binarySearch\(\s*nums\s*,\s*2\s*,\s*7\s*,\s*5\s*\)/],
    tags: ['Arrays', 'binarySearch', 'range', 'search'],
  },

  {
    id: 'java-arr-010',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Sort with Custom Comparator',
    text: 'Sort the string array by length in ascending order',
    setup: 'String[] words = {"elephant", "cat", "giraffe", "dog"};',
    setupCode: 'String[] words = {"elephant", "cat", "giraffe", "dog"};',
    expected: ['cat', 'dog', 'elephant', 'giraffe'],
    sample: 'Arrays.sort(words, Comparator.comparingInt(String::length))',
    hints: [
      'Use Arrays.sort(array, Comparator)',
      'Comparator.comparingInt() extracts int key for comparison',
      'String::length provides the length of each string',
    ],
    validPatterns: [/Arrays\.sort\(/, /Comparator/, /length/],
    tags: ['Arrays', 'sort', 'Comparator', 'custom'],
  },

  {
    id: 'java-arr-011',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Sort Descending Order',
    text: 'Sort the Integer array in descending order',
    setup: 'Integer[] nums = {3, 1, 4, 1, 5, 9, 2, 6};',
    setupCode: 'Integer[] nums = {3, 1, 4, 1, 5, 9, 2, 6};',
    expected: [9, 6, 5, 4, 3, 2, 1, 1],
    sample: 'Arrays.sort(nums, Collections.reverseOrder())',
    hints: [
      'Use Arrays.sort(array, Comparator)',
      'Collections.reverseOrder() provides descending order',
      'Only works with object arrays, not primitives',
    ],
    validPatterns: [/Arrays\.sort\(\s*nums\s*,\s*Collections\.reverseOrder\(\)\s*\)/],
    tags: ['Arrays', 'sort', 'descending', 'Comparator'],
  },

  {
    id: 'java-arr-012',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Parallel Sort Array',
    text: 'Sort the large array using parallel sorting for better performance',
    setup: 'int[] nums = {9, 3, 7, 1, 5, 8, 2, 4, 6};',
    setupCode: 'int[] nums = {9, 3, 7, 1, 5, 8, 2, 4, 6};',
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    sample: 'Arrays.parallelSort(nums); // uses parallel processing',
    hints: [
      'Use Arrays.parallelSort() for large arrays',
      'Uses ForkJoinPool for parallel processing',
      'Beneficial for arrays larger than 8192 elements',
      'Same result as sort(), but potentially faster',
    ],
    validPatterns: [/Arrays\.parallelSort\(\s*nums\s*\)/],
    tags: ['Arrays', 'parallelSort', 'parallel', 'performance'],
  },

  {
    id: 'java-arr-013',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Set All Array Elements',
    text: 'Set each element to its index squared using setAll',
    setup: 'int[] nums = new int[5];',
    setupCode: 'int[] nums = new int[5];',
    expected: [0, 1, 4, 9, 16],
    sample: 'Arrays.setAll(nums, i -> i * i); // sets each element to index squared',
    hints: [
      'Use Arrays.setAll(array, IntUnaryOperator)',
      'The function receives the index as parameter',
      'Sets each element based on its index',
    ],
    validPatterns: [/Arrays\.setAll\(\s*nums\s*,/],
    tags: ['Arrays', 'setAll', 'functional', 'initialization'],
  },

  {
    id: 'java-arr-014',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Parallel Set All Elements',
    text: 'Set each element to index * 10 using parallel processing',
    setup: 'int[] nums = new int[5];',
    setupCode: 'int[] nums = new int[5];',
    expected: [0, 10, 20, 30, 40],
    sample: 'Arrays.parallelSetAll(nums, i -> i * 10);',
    hints: [
      'Use Arrays.parallelSetAll() for large arrays',
      'Function receives index, returns value to set',
      'Parallel execution for better performance on large arrays',
    ],
    validPatterns: [/Arrays\.parallelSetAll\(\s*nums\s*,/],
    tags: ['Arrays', 'parallelSetAll', 'parallel', 'initialization'],
  },

  {
    id: 'java-arr-015',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Array Stream Filter and Collect',
    text: 'Filter even numbers from array and collect to new array',
    setup: 'int[] nums = {1, 2, 3, 4, 5, 6, 7, 8};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5, 6, 7, 8};',
    expected: [2, 4, 6, 8],
    sample: 'Arrays.stream(nums).filter(n -> n % 2 == 0).toArray()',
    hints: [
      'Use Arrays.stream() to create IntStream from int[]',
      'Use filter() with predicate for even numbers',
      'Use toArray() to collect back to int[]',
    ],
    validPatterns: [/Arrays\.stream\(/, /\.filter\(/, /\.toArray\(\)/],
    tags: ['Arrays', 'stream', 'filter', 'IntStream'],
  },

  {
    id: 'java-arr-016',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Array Stream Map Operation',
    text: 'Double each element in the array using streams',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: [2, 4, 6, 8, 10],
    sample: 'Arrays.stream(nums).map(n -> n * 2).toArray()',
    hints: [
      'Use Arrays.stream() then map() for transformation',
      'map() on IntStream takes IntUnaryOperator',
      'toArray() collects results back to int[]',
    ],
    validPatterns: [/Arrays\.stream\(/, /\.map\(/, /\.toArray\(\)/],
    tags: ['Arrays', 'stream', 'map', 'transformation'],
  },

  {
    id: 'java-arr-017',
    category: 'Multidimensional Arrays',
    difficulty: 'medium',
    title: 'Create 2D Array',
    text: 'Create and initialize a 3x3 matrix with row*10 + col values',
    setup: '// Create a 3x3 int matrix',
    setupCode: '// Create a 3x3 int matrix',
    expected: [
      [0, 1, 2],
      [10, 11, 12],
      [20, 21, 22],
    ],
    sample:
      'int[][] matrix = new int[3][3];\nfor (int i = 0; i < 3; i++)\n  for (int j = 0; j < 3; j++)\n    matrix[i][j] = i * 10 + j;',
    hints: [
      'Use new int[rows][cols] to create 2D array',
      'Access elements with matrix[row][col]',
      'Nested loops to initialize all elements',
    ],
    validPatterns: [/new\s+int\[\s*3\s*\]\[\s*3\s*\]/],
    tags: ['Arrays', '2D', 'matrix', 'initialization'],
  },

  {
    id: 'java-arr-018',
    category: 'Multidimensional Arrays',
    difficulty: 'medium',
    title: 'Deep Equals for 2D Arrays',
    text: 'Compare two 2D arrays for deep equality',
    setup: 'int[][] arr1 = {{1, 2}, {3, 4}};\nint[][] arr2 = {{1, 2}, {3, 4}};',
    setupCode: 'int[][] arr1 = {{1, 2}, {3, 4}};\nint[][] arr2 = {{1, 2}, {3, 4}};',
    expected: true,
    sample: 'Arrays.deepEquals(arr1, arr2) // returns true',
    hints: [
      'Use Arrays.deepEquals() for nested arrays',
      'Arrays.equals() only works for 1D arrays',
      'deepEquals() recursively compares all elements',
    ],
    validPatterns: [/Arrays\.deepEquals\(\s*arr1\s*,\s*arr2\s*\)/],
    tags: ['Arrays', 'deepEquals', '2D', 'comparison'],
  },

  {
    id: 'java-arr-019',
    category: 'Multidimensional Arrays',
    difficulty: 'medium',
    title: 'Deep To String for 2D Arrays',
    text: 'Convert the 2D array to a readable string representation',
    setup: 'int[][] matrix = {{1, 2, 3}, {4, 5, 6}};',
    setupCode: 'int[][] matrix = {{1, 2, 3}, {4, 5, 6}};',
    expected: '[[1, 2, 3], [4, 5, 6]]',
    sample: 'Arrays.deepToString(matrix) // returns "[[1, 2, 3], [4, 5, 6]]"',
    hints: [
      'Use Arrays.deepToString() for nested arrays',
      'Arrays.toString() would show memory addresses for inner arrays',
      'Works with any level of nesting',
    ],
    validPatterns: [/Arrays\.deepToString\(\s*matrix\s*\)/],
    tags: ['Arrays', 'deepToString', '2D', 'debugging'],
  },

  {
    id: 'java-arr-020',
    category: 'Arrays Utility',
    difficulty: 'medium',
    title: 'Varargs Array Creation',
    text: 'Create a method that accepts variable number of integers and returns their sum',
    setup: '// Call: sum(1, 2, 3, 4, 5)',
    setupCode: '// Call: sum(1, 2, 3, 4, 5)',
    expected: 15,
    sample:
      'public int sum(int... nums) {\n  return Arrays.stream(nums).sum();\n}\n// sum(1, 2, 3, 4, 5) returns 15',
    hints: [
      'Use int... for varargs parameter',
      'Varargs is treated as an array inside the method',
      'Can pass individual values or an array',
      'Varargs must be the last parameter',
    ],
    validPatterns: [/int\s*\.\.\./],
    tags: ['Arrays', 'varargs', 'method', 'flexible'],
  },

  // --- HARD (5 problems) ---

  {
    id: 'java-arr-021',
    category: 'Arrays Utility',
    difficulty: 'hard',
    title: 'Parallel Prefix Cumulative Sum',
    text: 'Compute cumulative sums using parallel prefix operation',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: [1, 3, 6, 10, 15],
    sample: 'Arrays.parallelPrefix(nums, Integer::sum); // cumulative sum',
    hints: [
      'Use Arrays.parallelPrefix(array, BinaryOperator)',
      'Each element becomes operation of itself with all previous elements',
      'Integer::sum computes running sum',
      'Modifies array in place',
    ],
    validPatterns: [/Arrays\.parallelPrefix\(\s*nums\s*,\s*Integer::sum\s*\)/],
    tags: ['Arrays', 'parallelPrefix', 'cumulative', 'parallel'],
  },

  {
    id: 'java-arr-022',
    category: 'Arrays Utility',
    difficulty: 'hard',
    title: 'Parallel Prefix Product',
    text: 'Compute cumulative products using parallel prefix operation',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: [1, 2, 6, 24, 120],
    sample: 'Arrays.parallelPrefix(nums, (a, b) -> a * b); // cumulative product',
    hints: [
      'Use Arrays.parallelPrefix(array, BinaryOperator)',
      'Lambda (a, b) -> a * b multiplies consecutive elements',
      'Result is running product (factorial-like)',
      'First element remains unchanged',
    ],
    validPatterns: [/Arrays\.parallelPrefix\(\s*nums\s*,/],
    tags: ['Arrays', 'parallelPrefix', 'product', 'parallel'],
  },

  {
    id: 'java-arr-023',
    category: 'Multidimensional Arrays',
    difficulty: 'hard',
    title: 'Jagged Array Creation',
    text: 'Create a jagged (ragged) array where row i has i+1 elements',
    setup: '// Create jagged array with rows of length 1, 2, 3',
    setupCode: '// Create jagged array with rows of length 1, 2, 3',
    expected: [[0], [0, 0], [0, 0, 0]],
    sample:
      'int[][] jagged = new int[3][];\nfor (int i = 0; i < 3; i++) {\n  jagged[i] = new int[i + 1];\n}',
    hints: [
      'First create outer array with row count only',
      'Then create each inner array with desired length',
      'Rows can have different lengths (jagged)',
      'Access with jagged[row][col] where col < row length',
    ],
    validPatterns: [/new\s+int\[\s*3\s*\]\[\s*\]/],
    tags: ['Arrays', 'jagged', '2D', 'dynamic'],
  },

  {
    id: 'java-arr-024',
    category: 'Arrays Utility',
    difficulty: 'hard',
    title: 'Array Mismatch Index',
    text: 'Find the index of first mismatch between two arrays (Java 9+)',
    setup: 'int[] arr1 = {1, 2, 3, 4, 5};\nint[] arr2 = {1, 2, 9, 4, 5};',
    setupCode: 'int[] arr1 = {1, 2, 3, 4, 5};\nint[] arr2 = {1, 2, 9, 4, 5};',
    expected: 2,
    sample: 'Arrays.mismatch(arr1, arr2) // returns 2 (first difference at index 2)',
    hints: [
      'Use Arrays.mismatch(a, b) to find first difference (Java 9+)',
      'Returns index of first mismatch',
      'Returns -1 if arrays are equal',
      'Returns smaller array length if one is prefix of other',
    ],
    validPatterns: [/Arrays\.mismatch\(\s*arr1\s*,\s*arr2\s*\)/],
    tags: ['Arrays', 'mismatch', 'comparison', 'Java9'],
  },

  {
    id: 'java-arr-025',
    category: 'Arrays Utility',
    difficulty: 'hard',
    title: 'Array Compare Lexicographically',
    text: 'Compare two arrays lexicographically (Java 9+)',
    setup: 'int[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 4};',
    setupCode: 'int[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 4};',
    expected: -1,
    sample: 'Arrays.compare(arr1, arr2) // returns negative (arr1 < arr2)',
    hints: [
      'Use Arrays.compare(a, b) for lexicographic comparison (Java 9+)',
      'Returns negative if a < b, zero if equal, positive if a > b',
      'Compares element by element like string comparison',
      'Shorter array is less than longer if it is a prefix',
    ],
    validPatterns: [/Arrays\.compare\(\s*arr1\s*,\s*arr2\s*\)/],
    tags: ['Arrays', 'compare', 'lexicographic', 'Java9'],
  },

  // ============================================================
  // String Operations - Advanced (25 problems)
  // ============================================================

  // --- EASY (8 problems) ---

  {
    id: 'java-str-001',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Substring from Index',
    text: 'Extract the substring starting from index 7 to the end',
    setup: 'String str = "Hello, World!";',
    setupCode: 'String str = "Hello, World!";',
    expected: 'World!',
    sample: 'str.substring(7) // returns "World!"',
    hints: [
      'Use substring(beginIndex) to extract from a position to the end',
      'The character at beginIndex is included',
      'For substring(7), characters at indices 7, 8, 9... are returned',
    ],
    validPatterns: [/\.substring\(\s*7\s*\)/],
    tags: ['String', 'substring', 'extraction'],
  },

  {
    id: 'java-str-002',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Index of Character from Position',
    text: 'Find the index of "o" starting search from index 5',
    setup: 'String str = "Hello, World!";',
    setupCode: 'String str = "Hello, World!";',
    expected: 8,
    sample: 'str.indexOf("o", 5) // returns 8',
    hints: [
      'Use indexOf(str, fromIndex) to search starting from a position',
      'The first "o" is at index 4, but searching from 5 finds the one at 8',
      'Returns -1 if not found after fromIndex',
    ],
    validPatterns: [/\.indexOf\(\s*"o"\s*,\s*5\s*\)/],
    tags: ['String', 'indexOf', 'search', 'fromIndex'],
  },

  {
    id: 'java-str-003',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Last Index of Character',
    text: 'Find the last occurrence of "l" in the string',
    setup: 'String str = "Hello, World!";',
    setupCode: 'String str = "Hello, World!";',
    expected: 10,
    sample: 'str.lastIndexOf("l") // returns 10',
    hints: [
      'Use lastIndexOf() to find the last occurrence',
      'Searches from the end of the string backwards',
      'Returns -1 if not found',
    ],
    validPatterns: [/\.lastIndexOf\(\s*"l"\s*\)/],
    tags: ['String', 'lastIndexOf', 'search'],
  },

  {
    id: 'java-str-004',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Replace First Occurrence',
    text: 'Replace only the first occurrence of "a" with "X"',
    setup: 'String str = "banana";',
    setupCode: 'String str = "banana";',
    expected: 'bXnana',
    sample: 'str.replaceFirst("a", "X") // returns "bXnana"',
    hints: [
      'Use replaceFirst(regex, replacement) to replace only the first match',
      'Unlike replace(), replaceFirst() uses regex patterns',
      'For literal replacement, escape special regex characters',
    ],
    validPatterns: [/\.replaceFirst\(\s*"a"\s*,\s*"X"\s*\)/],
    tags: ['String', 'replaceFirst', 'regex', 'substitution'],
  },

  {
    id: 'java-str-005',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Check if String is Blank',
    text: 'Check if the string contains only whitespace (Java 11+)',
    setup: 'String str = "   \\t\\n  ";',
    setupCode: 'String str = "   \\t\\n  ";',
    expected: true,
    sample: 'str.isBlank() // returns true',
    hints: [
      'Use isBlank() to check for whitespace-only strings (Java 11+)',
      'Returns true for empty string or strings with only whitespace',
      'Different from isEmpty() which only checks for zero length',
    ],
    validPatterns: [/\.isBlank\(\)/],
    tags: ['String', 'isBlank', 'validation', 'Java11'],
  },

  {
    id: 'java-str-006',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Character is Letter',
    text: 'Check if the character at index 0 is a letter',
    setup: 'String str = "Hello123";',
    setupCode: 'String str = "Hello123";',
    expected: true,
    sample: 'Character.isLetter(str.charAt(0)) // returns true',
    hints: [
      'Use Character.isLetter(char) to check for letters',
      'Works with Unicode letters, not just ASCII',
      'Other methods: isDigit(), isWhitespace(), isUpperCase(), isLowerCase()',
    ],
    validPatterns: [/Character\.isLetter\(/],
    tags: ['Character', 'isLetter', 'validation'],
  },

  {
    id: 'java-str-007',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'Character to Uppercase',
    text: 'Convert the character "a" to uppercase',
    setup: "char ch = 'a';",
    setupCode: "char ch = 'a';",
    expected: 'A',
    sample: "Character.toUpperCase(ch) // returns 'A'",
    hints: [
      'Use Character.toUpperCase(char) for single character conversion',
      'Returns the same character if already uppercase or not a letter',
      'For strings, use String.toUpperCase()',
    ],
    validPatterns: [/Character\.toUpperCase\(/],
    tags: ['Character', 'toUpperCase', 'case'],
  },

  {
    id: 'java-str-008',
    category: 'String Operations',
    difficulty: 'easy',
    title: 'StringBuilder Append',
    text: 'Create a StringBuilder and append "Hello" and " World"',
    setup: 'StringBuilder sb = new StringBuilder();',
    setupCode: 'StringBuilder sb = new StringBuilder();',
    expected: 'Hello World',
    sample: 'sb.append("Hello").append(" World").toString() // returns "Hello World"',
    hints: [
      'Use StringBuilder.append() for efficient string concatenation',
      'append() returns the StringBuilder for method chaining',
      'Call toString() to get the final String',
    ],
    validPatterns: [/\.append\(.*\)\.append\(/],
    tags: ['StringBuilder', 'append', 'concatenation'],
  },

  // --- MEDIUM (12 problems) ---

  {
    id: 'java-str-009',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'StringBuilder Insert',
    text: 'Insert "Java " at index 0 of the existing content',
    setup: 'StringBuilder sb = new StringBuilder("Programming");',
    setupCode: 'StringBuilder sb = new StringBuilder("Programming");',
    expected: 'Java Programming',
    sample: 'sb.insert(0, "Java ").toString() // returns "Java Programming"',
    hints: [
      'Use insert(offset, str) to insert at a specific position',
      'Existing content shifts to the right',
      'Can insert various types: String, char, int, etc.',
    ],
    validPatterns: [/\.insert\(\s*0\s*,\s*"Java\s*"\s*\)/],
    tags: ['StringBuilder', 'insert', 'manipulation'],
  },

  {
    id: 'java-str-010',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'StringBuilder Delete',
    text: 'Delete characters from index 5 to 11 (exclusive)',
    setup: 'StringBuilder sb = new StringBuilder("Hello World!");',
    setupCode: 'StringBuilder sb = new StringBuilder("Hello World!");',
    expected: 'Hello!',
    sample: 'sb.delete(5, 11).toString() // returns "Hello!"',
    hints: [
      'Use delete(start, end) to remove a range of characters',
      'start is inclusive, end is exclusive',
      'deleteCharAt(index) removes a single character',
    ],
    validPatterns: [/\.delete\(\s*5\s*,\s*11\s*\)/],
    tags: ['StringBuilder', 'delete', 'manipulation'],
  },

  {
    id: 'java-str-011',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'StringBuilder Reverse',
    text: 'Reverse the content of the StringBuilder',
    setup: 'StringBuilder sb = new StringBuilder("Hello");',
    setupCode: 'StringBuilder sb = new StringBuilder("Hello");',
    expected: 'olleH',
    sample: 'sb.reverse().toString() // returns "olleH"',
    hints: [
      'Use reverse() to reverse the character sequence',
      'Modifies the StringBuilder in place',
      'Common interview question: reverse a string efficiently',
    ],
    validPatterns: [/\.reverse\(\)/],
    tags: ['StringBuilder', 'reverse', 'manipulation'],
  },

  {
    id: 'java-str-012',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'String Format with Padding',
    text: 'Format the number 42 with leading zeros to make it 5 digits',
    setup: 'int num = 42;',
    setupCode: 'int num = 42;',
    expected: '00042',
    sample: 'String.format("%05d", num) // returns "00042"',
    hints: [
      'Use %0Nd format specifier for zero-padding',
      '0 means pad with zeros, 5 is the total width, d is for decimal integer',
      'Without 0, it pads with spaces: "%5d" gives "   42"',
    ],
    validPatterns: [/String\.format\(\s*"%05d"/],
    tags: ['String', 'format', 'padding', 'number'],
  },

  {
    id: 'java-str-013',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Formatted Method',
    text: 'Use the formatted instance method to create a greeting (Java 15+)',
    setup: 'String template = "Hello, %s! You are %d years old.";',
    setupCode: 'String template = "Hello, %s! You are %d years old.";',
    expected: 'Hello, Alice! You are 30 years old.',
    sample: 'template.formatted("Alice", 30) // returns formatted string',
    hints: [
      'Use formatted() instance method (Java 15+)',
      'Equivalent to String.format(this, args)',
      'More readable when template is already a variable',
    ],
    validPatterns: [/\.formatted\(/],
    tags: ['String', 'formatted', 'Java15', 'template'],
  },

  {
    id: 'java-str-014',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'StringJoiner Basic',
    text: 'Join strings with comma delimiter using StringJoiner',
    setup: 'StringJoiner sj = new StringJoiner(", ");',
    setupCode: 'StringJoiner sj = new StringJoiner(", ");',
    expected: 'apple, banana, cherry',
    sample: 'sj.add("apple").add("banana").add("cherry").toString()',
    hints: [
      'StringJoiner provides more control than String.join()',
      'Constructor takes delimiter, optional prefix and suffix',
      'Use add() to append elements',
    ],
    validPatterns: [/StringJoiner/, /\.add\(/],
    tags: ['StringJoiner', 'join', 'delimiter'],
  },

  {
    id: 'java-str-015',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'StringJoiner with Prefix and Suffix',
    text: 'Create a JSON-like array string [a, b, c] using StringJoiner',
    setup: 'StringJoiner sj = new StringJoiner(", ", "[", "]");',
    setupCode: 'StringJoiner sj = new StringJoiner(", ", "[", "]");',
    expected: '[a, b, c]',
    sample: 'sj.add("a").add("b").add("c").toString() // returns "[a, b, c]"',
    hints: [
      'StringJoiner constructor: (delimiter, prefix, suffix)',
      'Prefix and suffix are added automatically',
      'Great for building structured output like JSON arrays',
    ],
    validPatterns: [/StringJoiner\([^)]+,\s*"\["\s*,\s*"\]"\s*\)/],
    tags: ['StringJoiner', 'prefix', 'suffix', 'formatting'],
  },

  {
    id: 'java-str-016',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Pattern Matcher Find',
    text: 'Check if the string contains any digits using regex',
    setup: 'String str = "Hello123World";\nimport java.util.regex.*;',
    setupCode: 'String str = "Hello123World";\nimport java.util.regex.*;',
    expected: true,
    sample: 'Pattern.compile("\\\\d").matcher(str).find() // returns true',
    hints: [
      'Use Pattern.compile() to create a regex pattern',
      'Use matcher(input) to create a Matcher for the input',
      'find() returns true if any subsequence matches the pattern',
    ],
    validPatterns: [/Pattern\.compile\(/, /\.matcher\(/, /\.find\(\)/],
    tags: ['Pattern', 'Matcher', 'regex', 'find'],
  },

  {
    id: 'java-str-017',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Pattern Matcher Matches',
    text: 'Check if the entire string is a valid email format',
    setup: 'String email = "test@example.com";\nimport java.util.regex.*;',
    setupCode: 'String email = "test@example.com";\nimport java.util.regex.*;',
    expected: true,
    sample: 'Pattern.compile("^[\\\\w.-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,}$").matcher(email).matches()',
    hints: [
      'Use matches() to check if ENTIRE string matches the pattern',
      'Different from find() which looks for any matching subsequence',
      'Anchors ^ and $ are implicit with matches()',
    ],
    validPatterns: [/Pattern\.compile\(/, /\.matcher\(/, /\.matches\(\)/],
    tags: ['Pattern', 'Matcher', 'regex', 'matches', 'validation'],
  },

  {
    id: 'java-str-018',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Extract Groups with Matcher',
    text: 'Extract the domain from an email address using regex groups',
    setup: 'String email = "user@example.com";\nPattern p = Pattern.compile("@(.+)$");',
    setupCode: 'String email = "user@example.com";\nPattern p = Pattern.compile("@(.+)$");',
    expected: 'example.com',
    sample: 'Matcher m = p.matcher(email); m.find(); m.group(1) // returns "example.com"',
    hints: [
      'Use parentheses in regex to define capture groups',
      'group(0) is entire match, group(1) is first capture group',
      'Call find() or matches() before accessing groups',
    ],
    validPatterns: [/\.group\(\s*1\s*\)/],
    tags: ['Pattern', 'Matcher', 'regex', 'groups', 'extraction'],
  },

  {
    id: 'java-str-019',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Locale-Aware Uppercase',
    text: 'Convert string to uppercase using Turkish locale',
    setup: 'String str = "istanbul";\nimport java.util.Locale;',
    setupCode: 'String str = "istanbul";\nimport java.util.Locale;',
    expected: 'ISTANBUL',
    sample: 'str.toUpperCase(new Locale("tr", "TR")) // returns "ISTANBUL" with dotted I',
    hints: [
      'Use toUpperCase(Locale) for locale-aware conversion',
      'Turkish has special rules: i -> I with dot, I -> i without dot',
      'Always specify locale for user-facing text transformations',
    ],
    validPatterns: [/\.toUpperCase\(\s*.*Locale/],
    tags: ['String', 'toUpperCase', 'Locale', 'i18n'],
  },

  {
    id: 'java-str-020',
    category: 'String Operations',
    difficulty: 'medium',
    title: 'Compare Strings with Locale',
    text: 'Compare two strings using German locale collation',
    setup:
      'String s1 = "Acker";\nString s2 = "Adam";\nimport java.text.Collator;\nimport java.util.Locale;',
    setupCode:
      'String s1 = "Acker";\nString s2 = "Adam";\nimport java.text.Collator;\nimport java.util.Locale;',
    expected: -1,
    sample: 'Collator.getInstance(Locale.GERMAN).compare(s1, s2) // negative if s1 < s2',
    hints: [
      'Use Collator for locale-aware string comparison',
      'Different locales have different sorting rules',
      'Returns negative, zero, or positive like compareTo()',
    ],
    validPatterns: [/Collator\.getInstance\(/, /\.compare\(/],
    tags: ['Collator', 'Locale', 'comparison', 'i18n'],
  },

  // --- HARD (5 problems) ---

  {
    id: 'java-str-021',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Text Block with Formatting',
    text: 'Create a text block for HTML and format with variables (Java 15+)',
    setup: 'String title = "Welcome";\nString body = "Hello, World!";',
    setupCode: 'String title = "Welcome";\nString body = "Hello, World!";',
    expected:
      '<html>\n  <head><title>Welcome</title></head>\n  <body>Hello, World!</body>\n</html>',
    sample: `"""
<html>
  <head><title>%s</title></head>
  <body>%s</body>
</html>
""".formatted(title, body)`,
    hints: [
      'Text blocks use triple quotes """ and preserve formatting',
      'Incidental indentation is removed based on closing """',
      'Combine with formatted() for variable substitution',
      'Great for multi-line strings: SQL, HTML, JSON',
    ],
    validPatterns: [/"""/, /\.formatted\(/],
    tags: ['String', 'textBlock', 'Java15', 'formatted', 'multiline'],
  },

  {
    id: 'java-str-022',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Pattern Replace with Function',
    text: 'Replace all words with their uppercase versions using Matcher.replaceAll with Function',
    setup:
      'String str = "hello world java";\nimport java.util.regex.*;\nimport java.util.function.Function;',
    setupCode:
      'String str = "hello world java";\nimport java.util.regex.*;\nimport java.util.function.Function;',
    expected: 'HELLO WORLD JAVA',
    sample: 'Pattern.compile("\\\\w+").matcher(str).replaceAll(m -> m.group().toUpperCase())',
    hints: [
      'Matcher.replaceAll(Function<MatchResult, String>) provides dynamic replacement (Java 9+)',
      'Function receives MatchResult with access to matched text and groups',
      'More powerful than static replacement strings',
    ],
    validPatterns: [/\.replaceAll\(\s*\w+\s*->/],
    tags: ['Pattern', 'Matcher', 'replaceAll', 'Function', 'Java9'],
  },

  {
    id: 'java-str-023',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Split with Regex Groups',
    text: 'Split string keeping delimiters using regex lookahead',
    setup: 'String str = "one1two2three3four";',
    setupCode: 'String str = "one1two2three3four";',
    expected: ['one', '1', 'two', '2', 'three', '3', 'four'],
    sample: 'str.split("(?<=\\\\d)|(?=\\\\d)") // splits around digits, keeping them',
    hints: [
      'Use lookahead (?=X) and lookbehind (?<=X) for zero-width splits',
      '(?<=\\d) matches position after digit, (?=\\d) before digit',
      'This technique keeps the delimiter as separate elements',
    ],
    validPatterns: [/\.split\(\s*".*\(\?[<>=]/],
    tags: ['String', 'split', 'regex', 'lookahead', 'lookbehind', 'advanced'],
  },

  {
    id: 'java-str-024',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'StringBuffer Thread-Safe Operations',
    text: 'Use StringBuffer for thread-safe string building in concurrent context',
    setup: 'StringBuffer sb = new StringBuffer();\n// Simulate concurrent access',
    setupCode: 'StringBuffer sb = new StringBuffer();\n// Simulate concurrent access',
    expected: 'ABC',
    sample: `synchronized(sb) {
  sb.append("A").append("B").append("C");
}
sb.toString() // returns "ABC"`,
    hints: [
      'StringBuffer is thread-safe (synchronized), StringBuilder is not',
      'For single-threaded code, prefer StringBuilder (faster)',
      'StringBuffer methods are synchronized individually',
      'For atomic compound operations, use external synchronization',
    ],
    validPatterns: [/StringBuffer/, /\.append\(/],
    tags: ['StringBuffer', 'thread-safe', 'concurrent', 'synchronization'],
  },

  {
    id: 'java-str-025',
    category: 'String Operations',
    difficulty: 'hard',
    title: 'Transform String Lines',
    text: 'Process each line of a multi-line string and add line numbers (Java 11+)',
    setup: 'String text = "first\\nsecond\\nthird";',
    setupCode: 'String text = "first\\nsecond\\nthird";',
    expected: '1: first\n2: second\n3: third',
    sample: `import java.util.concurrent.atomic.AtomicInteger;
AtomicInteger counter = new AtomicInteger(0);
text.lines()
    .map(line -> counter.incrementAndGet() + ": " + line)
    .collect(Collectors.joining("\\n"))`,
    hints: [
      'Use lines() to get a Stream<String> of lines (Java 11+)',
      'lines() handles different line separators (\\n, \\r\\n, \\r)',
      'Combine with Stream operations for powerful text processing',
      'Use AtomicInteger or IntStream for line numbering',
    ],
    validPatterns: [/\.lines\(\)/, /\.map\(/, /\.collect\(/],
    tags: ['String', 'lines', 'Stream', 'Java11', 'text-processing'],
  },

  // ============================================================
  // Java Collections Framework (25 problems)
  // ============================================================

  // --- List Operations (subList, replaceAll, sort with Comparator) ---

  {
    id: 'java-coll-001',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'SubList Clear to Remove Range',
    text: 'Remove elements from index 1 to 3 (exclusive) using subList',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50));',
    expected: [10, 40, 50],
    sample: 'nums.subList(1, 3).clear(); // nums is now [10, 40, 50]',
    hints: [
      'subList() returns a view backed by the original list',
      'Modifications to subList affect the original list',
      'clear() on subList removes those elements from the original',
    ],
    validPatterns: [/\.subList\(\s*1\s*,\s*3\s*\)\.clear\(\)/],
    tags: ['List', 'subList', 'clear', 'range-removal'],
  },

  {
    id: 'java-coll-002',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'Sort List with Custom Comparator',
    text: 'Sort strings by length in ascending order',
    setup:
      'List<String> words = new ArrayList<>(Arrays.asList("elephant", "cat", "dog", "giraffe"));',
    setupCode:
      'List<String> words = new ArrayList<>(Arrays.asList("elephant", "cat", "dog", "giraffe"));',
    expected: ['cat', 'dog', 'giraffe', 'elephant'],
    sample: 'words.sort(Comparator.comparingInt(String::length));',
    hints: [
      'Use List.sort(Comparator) for in-place sorting',
      'Comparator.comparingInt() creates a comparator from an int-valued function',
      'String::length extracts the length for comparison',
    ],
    validPatterns: [/\.sort\(/, /Comparator\.comparingInt|comparing/],
    tags: ['List', 'sort', 'Comparator', 'comparingInt'],
  },

  {
    id: 'java-coll-003',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'Sort Descending with Comparator',
    text: 'Sort integers in descending order using List.sort()',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6));',
    expected: [9, 6, 5, 4, 3, 2, 1, 1],
    sample: 'nums.sort(Comparator.reverseOrder());',
    hints: [
      'Comparator.reverseOrder() returns a comparator for reverse natural order',
      'Alternatively use Collections.sort(list, Collections.reverseOrder())',
      'Or use Comparator.comparing(Function.identity()).reversed()',
    ],
    validPatterns: [/\.sort\(/, /reverseOrder|reversed/],
    tags: ['List', 'sort', 'Comparator', 'descending'],
  },

  {
    id: 'java-coll-004',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'ReplaceAll with UnaryOperator',
    text: 'Convert all strings to uppercase in place',
    setup: 'List<String> words = new ArrayList<>(Arrays.asList("hello", "world", "java"));',
    setupCode: 'List<String> words = new ArrayList<>(Arrays.asList("hello", "world", "java"));',
    expected: ['HELLO', 'WORLD', 'JAVA'],
    sample: 'words.replaceAll(String::toUpperCase);',
    hints: [
      'replaceAll(UnaryOperator) transforms each element in place',
      'String::toUpperCase is a method reference for transformation',
      'More efficient than stream().map().collect() for in-place updates',
    ],
    validPatterns: [/\.replaceAll\(/, /toUpperCase/],
    tags: ['List', 'replaceAll', 'UnaryOperator', 'transformation'],
  },

  {
    id: 'java-coll-005',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'Sort with Multiple Criteria',
    text: 'Sort by string length, then alphabetically for same length',
    setup:
      'List<String> words = new ArrayList<>(Arrays.asList("cat", "dog", "ant", "bear", "ape"));',
    setupCode:
      'List<String> words = new ArrayList<>(Arrays.asList("cat", "dog", "ant", "bear", "ape"));',
    expected: ['ant', 'ape', 'cat', 'dog', 'bear'],
    sample:
      'words.sort(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));',
    hints: [
      'Use thenComparing() to chain multiple sort criteria',
      'First sorts by length, then by natural order for ties',
      'thenComparing() only applies when previous comparison is equal',
    ],
    validPatterns: [/\.sort\(/, /comparingInt|comparing/, /thenComparing/],
    tags: ['List', 'sort', 'Comparator', 'thenComparing', 'multi-criteria'],
  },

  // --- Set Operations (TreeSet, LinkedHashSet) ---

  {
    id: 'java-coll-006',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'TreeSet Natural Ordering',
    text: 'Create a TreeSet from the list to get sorted unique elements',
    setup: 'List<Integer> nums = Arrays.asList(5, 2, 8, 2, 1, 8, 3);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 2, 8, 2, 1, 8, 3);',
    expected: [1, 2, 3, 5, 8],
    sample: 'new TreeSet<>(nums) // returns TreeSet [1, 2, 3, 5, 8]',
    hints: [
      'TreeSet maintains elements in sorted order',
      'Duplicates are automatically removed',
      'Uses natural ordering (Comparable) by default',
    ],
    validPatterns: [/new\s+TreeSet\s*<.*>\s*\(\s*nums\s*\)/],
    tags: ['TreeSet', 'sorted', 'unique', 'NavigableSet'],
  },

  {
    id: 'java-coll-007',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'LinkedHashSet Insertion Order',
    text: 'Create a LinkedHashSet to maintain insertion order while removing duplicates',
    setup: 'List<String> items = Arrays.asList("b", "a", "c", "a", "b", "d");',
    setupCode: 'List<String> items = Arrays.asList("b", "a", "c", "a", "b", "d");',
    expected: ['b', 'a', 'c', 'd'],
    sample: 'new LinkedHashSet<>(items) // returns LinkedHashSet [b, a, c, d]',
    hints: [
      'LinkedHashSet maintains insertion order',
      'Duplicates are removed (first occurrence kept)',
      'Good for deduplication while preserving order',
    ],
    validPatterns: [/new\s+LinkedHashSet\s*<.*>\s*\(\s*items\s*\)/],
    tags: ['LinkedHashSet', 'insertion-order', 'unique'],
  },

  {
    id: 'java-coll-008',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'TreeSet Floor and Ceiling',
    text: 'Find the greatest element less than or equal to 5, and smallest greater than or equal to 5',
    setup: 'TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 3, 6, 8, 10));',
    setupCode: 'TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 3, 6, 8, 10));',
    expected: { floor: 3, ceiling: 6 },
    sample: 'set.floor(5) // returns 3\nset.ceiling(5) // returns 6',
    hints: [
      'floor(e) returns greatest element <= e, or null',
      'ceiling(e) returns smallest element >= e, or null',
      'TreeSet implements NavigableSet with these navigation methods',
    ],
    validPatterns: [/\.floor\(\s*5\s*\)|\.ceiling\(\s*5\s*\)/],
    tags: ['TreeSet', 'NavigableSet', 'floor', 'ceiling'],
  },

  {
    id: 'java-coll-009',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'TreeSet SubSet Range',
    text: 'Get a view of elements from 3 (inclusive) to 8 (exclusive)',
    setup: 'TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));',
    setupCode:
      'TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));',
    expected: [3, 4, 5, 6, 7],
    sample: 'set.subSet(3, 8) // returns SortedSet [3, 4, 5, 6, 7]',
    hints: [
      'subSet(from, to) returns a view with from inclusive, to exclusive',
      'Use subSet(from, fromInclusive, to, toInclusive) for full control',
      'Changes to the subset reflect in the original set',
    ],
    validPatterns: [/\.subSet\(\s*3\s*,\s*8\s*\)/],
    tags: ['TreeSet', 'NavigableSet', 'subSet', 'range-view'],
  },

  {
    id: 'java-coll-010',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'TreeSet HeadSet and TailSet',
    text: 'Get elements less than 5 (headSet) and elements >= 5 (tailSet)',
    setup: 'TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8));',
    setupCode: 'TreeSet<Integer> set = new TreeSet<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8));',
    expected: { head: [1, 2, 3, 4], tail: [5, 6, 7, 8] },
    sample: 'set.headSet(5) // [1, 2, 3, 4]\nset.tailSet(5) // [5, 6, 7, 8]',
    hints: [
      'headSet(e) returns elements strictly less than e',
      'tailSet(e) returns elements >= e',
      'Use headSet(e, inclusive) for control over boundary',
    ],
    validPatterns: [/\.headSet\(\s*5\s*\)|\.tailSet\(\s*5\s*\)/],
    tags: ['TreeSet', 'NavigableSet', 'headSet', 'tailSet'],
  },

  // --- Map Operations (TreeMap, LinkedHashMap, NavigableMap) ---

  {
    id: 'java-coll-011',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'TreeMap Sorted Keys',
    text: 'Create a TreeMap to maintain keys in sorted order',
    setup:
      'Map<String, Integer> data = new HashMap<>();\ndata.put("cherry", 3);\ndata.put("apple", 1);\ndata.put("banana", 2);',
    setupCode:
      'Map<String, Integer> data = new HashMap<>();\ndata.put("cherry", 3);\ndata.put("apple", 1);\ndata.put("banana", 2);',
    expected: { apple: 1, banana: 2, cherry: 3 },
    sample: 'new TreeMap<>(data) // TreeMap with sorted keys',
    hints: [
      'TreeMap maintains keys in sorted (natural) order',
      'Implements NavigableMap for navigation operations',
      'Keys must be Comparable or provide a Comparator',
    ],
    validPatterns: [/new\s+TreeMap\s*<.*>\s*\(\s*data\s*\)/],
    tags: ['TreeMap', 'sorted', 'NavigableMap'],
  },

  {
    id: 'java-coll-012',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'TreeMap First and Last Key',
    text: 'Get the first (smallest) and last (largest) keys from the TreeMap',
    setup:
      'TreeMap<Integer, String> map = new TreeMap<>();\nmap.put(5, "five");\nmap.put(2, "two");\nmap.put(8, "eight");\nmap.put(1, "one");',
    setupCode:
      'TreeMap<Integer, String> map = new TreeMap<>();\nmap.put(5, "five");\nmap.put(2, "two");\nmap.put(8, "eight");\nmap.put(1, "one");',
    expected: { first: 1, last: 8 },
    sample: 'map.firstKey() // returns 1\nmap.lastKey() // returns 8',
    hints: [
      'firstKey() returns the smallest key',
      'lastKey() returns the largest key',
      'Throws NoSuchElementException if map is empty',
    ],
    validPatterns: [/\.firstKey\(\)|\.lastKey\(\)/],
    tags: ['TreeMap', 'NavigableMap', 'firstKey', 'lastKey'],
  },

  {
    id: 'java-coll-013',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'TreeMap FloorEntry and CeilingEntry',
    text: 'Find the entry with greatest key <= 6 and smallest key >= 6',
    setup:
      'TreeMap<Integer, String> map = new TreeMap<>();\nmap.put(2, "two");\nmap.put(4, "four");\nmap.put(8, "eight");\nmap.put(10, "ten");',
    setupCode:
      'TreeMap<Integer, String> map = new TreeMap<>();\nmap.put(2, "two");\nmap.put(4, "four");\nmap.put(8, "eight");\nmap.put(10, "ten");',
    expected: { floorKey: 4, ceilingKey: 8 },
    sample: 'map.floorEntry(6).getKey() // returns 4\nmap.ceilingEntry(6).getKey() // returns 8',
    hints: [
      'floorEntry(k) returns entry with greatest key <= k',
      'ceilingEntry(k) returns entry with smallest key >= k',
      'Also available: floorKey(), ceilingKey() for keys only',
    ],
    validPatterns: [
      /\.floorEntry\(\s*6\s*\)|\.ceilingEntry\(\s*6\s*\)|\.floorKey\(\s*6\s*\)|\.ceilingKey\(\s*6\s*\)/,
    ],
    tags: ['TreeMap', 'NavigableMap', 'floorEntry', 'ceilingEntry'],
  },

  {
    id: 'java-coll-014',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'LinkedHashMap Access Order',
    text: 'Create a LinkedHashMap with access-order (LRU cache behavior)',
    setup: '// Create access-ordered LinkedHashMap with initial capacity 16, load factor 0.75',
    setupCode: '// Create access-ordered LinkedHashMap with initial capacity 16, load factor 0.75',
    expected: 'access-ordered map',
    sample: 'new LinkedHashMap<>(16, 0.75f, true) // true enables access-order',
    hints: [
      'Third constructor parameter enables access-order when true',
      'Access-order: most recently accessed entries move to end',
      'Useful for implementing LRU caches',
      'Default (false) maintains insertion order',
    ],
    validPatterns: [/new\s+LinkedHashMap\s*<.*>\s*\([^)]*,\s*true\s*\)/],
    tags: ['LinkedHashMap', 'access-order', 'LRU', 'cache'],
  },

  {
    id: 'java-coll-015',
    category: 'Collections Framework',
    difficulty: 'hard',
    title: 'TreeMap SubMap Range View',
    text: 'Get a view of entries with keys from 5 to 15 (inclusive)',
    setup:
      'TreeMap<Integer, String> map = new TreeMap<>();\nfor (int i = 1; i <= 20; i++) map.put(i, "v" + i);',
    setupCode:
      'TreeMap<Integer, String> map = new TreeMap<>();\nfor (int i = 1; i <= 20; i++) map.put(i, "v" + i);',
    expected: 'submap with keys 5-15',
    sample: 'map.subMap(5, true, 15, true) // NavigableMap with keys 5-15 inclusive',
    hints: [
      'subMap(fromKey, fromInclusive, toKey, toInclusive) for full control',
      'Returns a NavigableMap view backed by original',
      'Changes reflect in both directions',
    ],
    validPatterns: [/\.subMap\(\s*5\s*,\s*true\s*,\s*15\s*,\s*true\s*\)/],
    tags: ['TreeMap', 'NavigableMap', 'subMap', 'range-view'],
  },

  // --- Queue and Deque Operations ---

  {
    id: 'java-coll-016',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'PriorityQueue Min Heap',
    text: 'Create a PriorityQueue and poll elements to get them in sorted order',
    setup: 'PriorityQueue<Integer> pq = new PriorityQueue<>(Arrays.asList(5, 2, 8, 1, 9));',
    setupCode: 'PriorityQueue<Integer> pq = new PriorityQueue<>(Arrays.asList(5, 2, 8, 1, 9));',
    expected: 1,
    sample: 'pq.poll() // returns 1 (smallest element)',
    hints: [
      'PriorityQueue is a min-heap by default',
      'poll() removes and returns the smallest element',
      'peek() returns smallest without removing',
      'Use Comparator.reverseOrder() for max-heap',
    ],
    validPatterns: [/\.poll\(\)|\.peek\(\)/],
    tags: ['PriorityQueue', 'min-heap', 'poll', 'peek'],
  },

  {
    id: 'java-coll-017',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'PriorityQueue Max Heap',
    text: 'Create a max-heap PriorityQueue that returns largest element first',
    setup: 'List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);',
    expected: 9,
    sample:
      'PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());\nmaxHeap.addAll(nums);\nmaxHeap.poll() // returns 9',
    hints: [
      'Pass Comparator.reverseOrder() to constructor for max-heap',
      'Or use Collections.reverseOrder()',
      'poll() now returns the largest element',
    ],
    validPatterns: [
      /new\s+PriorityQueue\s*<.*>\s*\(\s*Comparator\.reverseOrder\(\)\s*\)|new\s+PriorityQueue\s*<.*>\s*\(\s*Collections\.reverseOrder\(\)\s*\)/,
    ],
    tags: ['PriorityQueue', 'max-heap', 'Comparator', 'reverseOrder'],
  },

  {
    id: 'java-coll-018',
    category: 'Collections Framework',
    difficulty: 'easy',
    title: 'ArrayDeque as Stack',
    text: 'Use ArrayDeque as a stack: push 1, 2, 3 and pop to get 3',
    setup: 'Deque<Integer> stack = new ArrayDeque<>();',
    setupCode: 'Deque<Integer> stack = new ArrayDeque<>();',
    expected: 3,
    sample: 'stack.push(1);\nstack.push(2);\nstack.push(3);\nstack.pop() // returns 3',
    hints: [
      'ArrayDeque is preferred over Stack for stack operations',
      'push() adds to front, pop() removes from front (LIFO)',
      'peek() returns front element without removing',
    ],
    validPatterns: [/\.push\(|\.pop\(\)/],
    tags: ['ArrayDeque', 'Deque', 'stack', 'LIFO'],
  },

  {
    id: 'java-coll-019',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'ArrayDeque as Queue',
    text: 'Use ArrayDeque as a queue: offer 1, 2, 3 and poll to get 1',
    setup: 'Deque<Integer> queue = new ArrayDeque<>();',
    setupCode: 'Deque<Integer> queue = new ArrayDeque<>();',
    expected: 1,
    sample: 'queue.offer(1);\nqueue.offer(2);\nqueue.offer(3);\nqueue.poll() // returns 1',
    hints: [
      'offer() adds to end, poll() removes from front (FIFO)',
      'ArrayDeque is more efficient than LinkedList for queue operations',
      'offerFirst/offerLast and pollFirst/pollLast for explicit control',
    ],
    validPatterns: [/\.offer\(|\.poll\(\)/],
    tags: ['ArrayDeque', 'Deque', 'queue', 'FIFO'],
  },

  {
    id: 'java-coll-020',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'Deque PeekFirst and PeekLast',
    text: 'Peek at both ends of the deque without removing',
    setup: 'Deque<String> deque = new ArrayDeque<>(Arrays.asList("first", "middle", "last"));',
    setupCode: 'Deque<String> deque = new ArrayDeque<>(Arrays.asList("first", "middle", "last"));',
    expected: { first: 'first', last: 'last' },
    sample: 'deque.peekFirst() // returns "first"\ndeque.peekLast() // returns "last"',
    hints: [
      'peekFirst() returns head element without removing',
      'peekLast() returns tail element without removing',
      'Returns null if deque is empty (vs getFirst/getLast which throw)',
    ],
    validPatterns: [/\.peekFirst\(\)|\.peekLast\(\)/],
    tags: ['ArrayDeque', 'Deque', 'peekFirst', 'peekLast'],
  },

  // --- Collections Utility Methods ---

  {
    id: 'java-coll-021',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'Collections BinarySearch',
    text: 'Find the index of 30 in a sorted list using binary search',
    setup: 'List<Integer> sorted = Arrays.asList(10, 20, 30, 40, 50);',
    setupCode: 'List<Integer> sorted = Arrays.asList(10, 20, 30, 40, 50);',
    expected: 2,
    sample: 'Collections.binarySearch(sorted, 30) // returns 2',
    hints: [
      'List MUST be sorted before binary search',
      'Returns index if found, or (-(insertion point) - 1) if not found',
      'O(log n) complexity for RandomAccess lists',
    ],
    validPatterns: [/Collections\.binarySearch\(\s*sorted\s*,\s*30\s*\)/],
    tags: ['Collections', 'binarySearch', 'sorted', 'search'],
  },

  {
    id: 'java-coll-022',
    category: 'Collections Framework',
    difficulty: 'medium',
    title: 'Collections Disjoint Check',
    text: 'Check if two collections have no elements in common',
    setup:
      'List<Integer> list1 = Arrays.asList(1, 2, 3);\nList<Integer> list2 = Arrays.asList(4, 5, 6);',
    setupCode:
      'List<Integer> list1 = Arrays.asList(1, 2, 3);\nList<Integer> list2 = Arrays.asList(4, 5, 6);',
    expected: true,
    sample: 'Collections.disjoint(list1, list2) // returns true',
    hints: [
      'disjoint() returns true if collections have no common elements',
      'Returns false if any element exists in both collections',
      'Useful for checking set intersection without creating new set',
    ],
    validPatterns: [/Collections\.disjoint\(\s*list1\s*,\s*list2\s*\)/],
    tags: ['Collections', 'disjoint', 'intersection', 'check'],
  },

  {
    id: 'java-coll-023',
    category: 'Collections Framework',
    difficulty: 'hard',
    title: 'Collections Rotate',
    text: 'Rotate list elements by 2 positions to the right',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    expected: [4, 5, 1, 2, 3],
    sample: 'Collections.rotate(nums, 2); // nums is now [4, 5, 1, 2, 3]',
    hints: [
      'rotate(list, distance) rotates elements by distance positions',
      'Positive distance rotates right (toward end)',
      'Negative distance rotates left (toward beginning)',
      'Elements that fall off one end appear at the other',
    ],
    validPatterns: [/Collections\.rotate\(\s*nums\s*,\s*2\s*\)/],
    tags: ['Collections', 'rotate', 'circular', 'manipulation'],
  },

  // --- Concurrent Collections ---

  {
    id: 'java-coll-024',
    category: 'Collections Framework',
    difficulty: 'hard',
    title: 'ConcurrentHashMap Atomic Update',
    text: 'Atomically increment a counter value in ConcurrentHashMap',
    setup:
      'ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.put("counter", 10);',
    setupCode:
      'ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();\nmap.put("counter", 10);',
    expected: 11,
    sample: 'map.compute("counter", (k, v) -> v + 1) // atomically returns 11',
    hints: [
      'ConcurrentHashMap.compute() is atomic and thread-safe',
      'BiFunction receives key and current value',
      'Also available: computeIfAbsent, computeIfPresent, merge',
      'Preferred over get-then-put which has race conditions',
    ],
    validPatterns: [/\.compute\(\s*"counter"/],
    tags: ['ConcurrentHashMap', 'concurrent', 'atomic', 'thread-safe'],
  },

  // --- Immutable Collections (List.of, Set.of, Map.of) ---

  {
    id: 'java-coll-025',
    category: 'Collections Framework',
    difficulty: 'hard',
    title: 'Immutable List with List.of',
    text: 'Create an immutable list containing 1, 2, 3 (Java 9+)',
    setup: '// Create an immutable List<Integer>',
    setupCode: '// Create an immutable List<Integer>',
    expected: [1, 2, 3],
    sample: 'List.of(1, 2, 3) // returns immutable [1, 2, 3]',
    hints: [
      'List.of() creates an immutable list (Java 9+)',
      'Cannot add, remove, or modify elements',
      'Does not allow null elements',
      'Use new ArrayList<>(List.of(...)) if mutability needed',
    ],
    validPatterns: [/List\.of\(\s*1\s*,\s*2\s*,\s*3\s*\)/],
    tags: ['List', 'immutable', 'List.of', 'Java9'],
  },

  // ============================================================
  // Advanced Stream API - Complex Pipelines (25 problems)
  // Focusing on: Collectors, flatMap, primitives, parallel, takeWhile/dropWhile, custom collectors
  // ============================================================

  // --- EASY (8 problems) ---

  {
    id: 'java-stream-031',
    category: 'Stream API - Advanced',
    difficulty: 'easy',
    title: 'IntStream Range',
    text: 'Generate numbers from 1 to 5 (inclusive) using IntStream',
    setup: '// Use IntStream to generate a range of integers',
    setupCode: '// Use IntStream to generate a range of integers',
    expected: [1, 2, 3, 4, 5],
    sample: 'IntStream.rangeClosed(1, 5).boxed().collect(Collectors.toList())',
    hints: [
      'Use IntStream.rangeClosed(start, endInclusive) for inclusive range',
      'IntStream.range(start, end) excludes the end value',
      'Use boxed() to convert IntStream to Stream<Integer>',
    ],
    validPatterns: [/IntStream\.rangeClosed\(/, /\.boxed\(\)/],
    tags: ['Stream', 'IntStream', 'range', 'generation'],
  },

  {
    id: 'java-stream-032',
    category: 'Stream API - Advanced',
    difficulty: 'easy',
    title: 'DoubleStream Average',
    text: 'Calculate the average of the double array',
    setup: 'double[] values = {1.5, 2.5, 3.5, 4.5};',
    setupCode: 'double[] values = {1.5, 2.5, 3.5, 4.5};',
    expected: 3.0,
    sample: 'Arrays.stream(values).average().orElse(0)',
    hints: [
      'Arrays.stream() on double[] returns DoubleStream',
      'DoubleStream has average() returning OptionalDouble',
      'Use orElse(default) to handle empty streams',
    ],
    validPatterns: [/Arrays\.stream\(/, /\.average\(\)/],
    tags: ['Stream', 'DoubleStream', 'average', 'primitives'],
  },

  {
    id: 'java-stream-033',
    category: 'Stream API - Advanced',
    difficulty: 'easy',
    title: 'LongStream Sum',
    text: 'Calculate the sum of the long array',
    setup: 'long[] values = {100L, 200L, 300L, 400L};',
    setupCode: 'long[] values = {100L, 200L, 300L, 400L};',
    expected: 1000,
    sample: 'Arrays.stream(values).sum()',
    hints: [
      'Arrays.stream() on long[] returns LongStream',
      'LongStream has sum() method returning long',
      'More efficient than boxing to Stream<Long>',
    ],
    validPatterns: [/Arrays\.stream\(/, /\.sum\(\)/],
    tags: ['Stream', 'LongStream', 'sum', 'primitives'],
  },

  {
    id: 'java-stream-034',
    category: 'Stream API - Advanced',
    difficulty: 'easy',
    title: 'Stream Concatenation',
    text: 'Concatenate two streams into one',
    setup:
      'List<Integer> list1 = Arrays.asList(1, 2, 3);\nList<Integer> list2 = Arrays.asList(4, 5, 6);',
    setupCode:
      'List<Integer> list1 = Arrays.asList(1, 2, 3);\nList<Integer> list2 = Arrays.asList(4, 5, 6);',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'Stream.concat(list1.stream(), list2.stream()).collect(Collectors.toList())',
    hints: [
      'Use Stream.concat(stream1, stream2) to combine two streams',
      'Creates a lazily concatenated stream',
      'For more than two streams, use Stream.of(s1, s2, s3).flatMap(s -> s)',
    ],
    validPatterns: [/Stream\.concat\(/],
    tags: ['Stream', 'concat', 'combination'],
  },

  {
    id: 'java-stream-035',
    category: 'Stream API - Advanced',
    difficulty: 'easy',
    title: 'Collectors.toSet',
    text: 'Collect stream results into a Set to remove duplicates',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 2, 3, 3, 3, 4);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 2, 3, 3, 3, 4);',
    expected: [1, 2, 3, 4],
    sample: 'nums.stream().collect(Collectors.toSet())',
    hints: [
      'Use Collectors.toSet() to collect into a Set',
      'Set automatically removes duplicates',
      'Order is not guaranteed; use toCollection(LinkedHashSet::new) for ordered set',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.toSet\(\)/],
    tags: ['Stream', 'Collectors', 'toSet', 'deduplication'],
  },

  {
    id: 'java-stream-036',
    category: 'Stream API - Advanced',
    difficulty: 'easy',
    title: 'IntStream Min',
    text: 'Find the minimum value from an int array using IntStream',
    setup: 'int[] nums = {5, 2, 8, 1, 9};',
    setupCode: 'int[] nums = {5, 2, 8, 1, 9};',
    expected: 1,
    sample: 'Arrays.stream(nums).min().orElse(0)',
    hints: [
      'IntStream has min() method returning OptionalInt',
      'Use orElse() or orElseThrow() to handle empty case',
      'Also available: max(), sum(), average(), count()',
    ],
    validPatterns: [/Arrays\.stream\(/, /\.min\(\)/],
    tags: ['Stream', 'IntStream', 'min', 'statistics'],
  },

  {
    id: 'java-stream-037',
    category: 'Stream API - Advanced',
    difficulty: 'easy',
    title: 'Peek for Debugging',
    text: 'Use peek to print elements while filtering (returns the filtered list)',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: [2, 4],
    sample:
      'nums.stream().filter(n -> n % 2 == 0).peek(System.out::println).collect(Collectors.toList())',
    hints: [
      'peek() is for debugging - performs action without modifying stream',
      'peek() is an intermediate operation, needs a terminal operation',
      'Avoid using peek() for side effects in production code',
    ],
    validPatterns: [/\.stream\(\)/, /\.peek\(/, /\.collect\(/],
    tags: ['Stream', 'peek', 'debugging'],
  },

  {
    id: 'java-stream-038',
    category: 'Stream API - Advanced',
    difficulty: 'easy',
    title: 'Stream.of Creation',
    text: 'Create a stream from individual elements',
    setup: '// Create a stream from individual values',
    setupCode: '// Create a stream from individual values',
    expected: ['a', 'b', 'c'],
    sample: 'Stream.of("a", "b", "c").collect(Collectors.toList())',
    hints: [
      'Stream.of(elements...) creates a stream from varargs',
      'Useful for creating streams from literal values',
      'For arrays, prefer Arrays.stream(array)',
    ],
    validPatterns: [/Stream\.of\(/],
    tags: ['Stream', 'creation', 'of'],
  },

  // --- MEDIUM (12 problems) ---

  {
    id: 'java-stream-039',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'Collectors.toMap Basic',
    text: 'Convert list of strings to a map with string as key and length as value',
    setup: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    expected: { apple: 5, banana: 6, cherry: 6 },
    sample: 'words.stream().collect(Collectors.toMap(s -> s, String::length))',
    hints: [
      'Collectors.toMap(keyMapper, valueMapper) creates a Map',
      's -> s means use the element itself as key (Function.identity() also works)',
      'Throws IllegalStateException if duplicate keys exist',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.toMap\(/],
    tags: ['Stream', 'Collectors', 'toMap', 'transformation'],
  },

  {
    id: 'java-stream-040',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'Collectors.partitioningBy',
    text: 'Partition numbers into even and odd groups',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    expected: { true: [2, 4, 6], false: [1, 3, 5] },
    sample: 'nums.stream().collect(Collectors.partitioningBy(n -> n % 2 == 0))',
    hints: [
      'partitioningBy splits into exactly two groups based on predicate',
      'Returns Map<Boolean, List<T>>',
      'true key contains elements matching predicate, false contains the rest',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.partitioningBy\(/],
    tags: ['Stream', 'Collectors', 'partitioningBy', 'grouping'],
  },

  {
    id: 'java-stream-041',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'FlatMap with Strings',
    text: 'Split each string into characters and flatten into a single list',
    setup: 'List<String> words = Arrays.asList("Hi", "Bye");',
    setupCode: 'List<String> words = Arrays.asList("Hi", "Bye");',
    expected: ['H', 'i', 'B', 'y', 'e'],
    sample:
      'words.stream().flatMap(s -> s.chars().mapToObj(c -> String.valueOf((char)c))).collect(Collectors.toList())',
    hints: [
      'String.chars() returns IntStream of character codes',
      'Use mapToObj to convert int to Character or String',
      'flatMap flattens all character streams into one',
    ],
    validPatterns: [/\.stream\(\)/, /\.flatMap\(/, /\.chars\(\)/],
    tags: ['Stream', 'flatMap', 'String', 'characters'],
  },

  {
    id: 'java-stream-042',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'TakeWhile (Java 9+)',
    text: 'Take elements while they are less than 5',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 1, 2);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 1, 2);',
    expected: [1, 2, 3, 4],
    sample: 'nums.stream().takeWhile(n -> n < 5).collect(Collectors.toList())',
    hints: [
      'takeWhile takes elements while predicate is true',
      'Stops at first element that fails the predicate',
      'Java 9+ feature - different from filter which checks all elements',
    ],
    validPatterns: [/\.stream\(\)/, /\.takeWhile\(/],
    tags: ['Stream', 'takeWhile', 'Java9', 'shortCircuit'],
  },

  {
    id: 'java-stream-043',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'DropWhile (Java 9+)',
    text: 'Drop elements while they are less than 5, keep the rest',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 1, 2);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 1, 2);',
    expected: [5, 6, 7, 1, 2],
    sample: 'nums.stream().dropWhile(n -> n < 5).collect(Collectors.toList())',
    hints: [
      'dropWhile drops elements while predicate is true',
      'Keeps all elements after first element that fails predicate',
      'Java 9+ feature - note that later elements (1, 2) are kept',
    ],
    validPatterns: [/\.stream\(\)/, /\.dropWhile\(/],
    tags: ['Stream', 'dropWhile', 'Java9', 'shortCircuit'],
  },

  {
    id: 'java-stream-044',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'Collectors.joining with Prefix/Suffix',
    text: 'Join strings with comma delimiter, wrapped in square brackets',
    setup: 'List<String> items = Arrays.asList("apple", "banana", "cherry");',
    setupCode: 'List<String> items = Arrays.asList("apple", "banana", "cherry");',
    expected: '[apple, banana, cherry]',
    sample: 'items.stream().collect(Collectors.joining(", ", "[", "]"))',
    hints: [
      'Collectors.joining(delimiter, prefix, suffix) adds wrapping',
      'First arg is delimiter, second is prefix, third is suffix',
      'Useful for building formatted output like JSON arrays',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.joining\(/],
    tags: ['Stream', 'Collectors', 'joining', 'formatting'],
  },

  {
    id: 'java-stream-045',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'Grouping with Downstream Counting',
    text: 'Group strings by length and count elements in each group',
    setup: 'List<String> words = Arrays.asList("cat", "dog", "elephant", "rat", "giraffe", "ant");',
    setupCode:
      'List<String> words = Arrays.asList("cat", "dog", "elephant", "rat", "giraffe", "ant");',
    expected: { 3: 4, 7: 1, 8: 1 },
    sample: 'words.stream().collect(Collectors.groupingBy(String::length, Collectors.counting()))',
    hints: [
      'groupingBy accepts a downstream collector as second argument',
      'Collectors.counting() counts elements in each group',
      'Returns Map<K, Long> when using counting()',
    ],
    validPatterns: [/\.stream\(\)/, /groupingBy\(/, /counting\(\)/],
    tags: ['Stream', 'Collectors', 'groupingBy', 'counting'],
  },

  {
    id: 'java-stream-046',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'IntStream Iterate with Limit',
    text: 'Generate the first 5 squares using IntStream.iterate',
    setup: '// Generate squares: 1, 4, 9, 16, 25',
    setupCode: '// Generate squares: 1, 4, 9, 16, 25',
    expected: [1, 4, 9, 16, 25],
    sample:
      'IntStream.iterate(1, n -> n + 1).limit(5).map(n -> n * n).boxed().collect(Collectors.toList())',
    hints: [
      'IntStream.iterate(seed, unaryOperator) generates infinite stream',
      'Must use limit() to make it finite',
      'map() on IntStream returns IntStream, use boxed() for List<Integer>',
    ],
    validPatterns: [/IntStream\.iterate\(/, /\.limit\(/, /\.map\(/],
    tags: ['Stream', 'IntStream', 'iterate', 'generation'],
  },

  {
    id: 'java-stream-047',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'FlatMapToInt',
    text: 'Flatten nested integer lists and calculate sum',
    setup:
      'List<List<Integer>> nested = Arrays.asList(\n  Arrays.asList(1, 2),\n  Arrays.asList(3, 4),\n  Arrays.asList(5)\n);',
    setupCode:
      'List<List<Integer>> nested = Arrays.asList(\n  Arrays.asList(1, 2),\n  Arrays.asList(3, 4),\n  Arrays.asList(5)\n);',
    expected: 15,
    sample: 'nested.stream().flatMapToInt(list -> list.stream().mapToInt(Integer::intValue)).sum()',
    hints: [
      'flatMapToInt flattens to IntStream directly',
      'More efficient than flatMap when working with primitives',
      'Avoids boxing/unboxing overhead',
    ],
    validPatterns: [/\.stream\(\)/, /\.flatMapToInt\(/, /\.sum\(\)/],
    tags: ['Stream', 'flatMapToInt', 'primitives', 'performance'],
  },

  {
    id: 'java-stream-048',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'Collectors.toMap with Merge Function',
    text: 'Create a map counting word occurrences (handle duplicates)',
    setup:
      'List<String> words = Arrays.asList("apple", "banana", "apple", "cherry", "banana", "apple");',
    setupCode:
      'List<String> words = Arrays.asList("apple", "banana", "apple", "cherry", "banana", "apple");',
    expected: { apple: 3, banana: 2, cherry: 1 },
    sample: 'words.stream().collect(Collectors.toMap(w -> w, w -> 1, Integer::sum))',
    hints: [
      'toMap with 3 args: keyMapper, valueMapper, mergeFunction',
      'mergeFunction handles duplicate keys',
      'Integer::sum adds values when keys collide',
    ],
    validPatterns: [
      /\.stream\(\)/,
      /Collectors\.toMap\(/,
      /Integer::sum|\(\s*a\s*,\s*b\s*\)\s*->\s*a\s*\+\s*b/,
    ],
    tags: ['Stream', 'Collectors', 'toMap', 'merge', 'frequency'],
  },

  {
    id: 'java-stream-049',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'Parallel Stream Sum',
    text: 'Process elements in parallel and sum them',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
    expected: 55,
    sample: 'nums.parallelStream().reduce(0, Integer::sum)',
    hints: [
      'parallelStream() creates a parallel stream for concurrent processing',
      'Use for CPU-intensive operations on large datasets',
      'Ensure operations are stateless and associative for correct results',
    ],
    validPatterns: [/\.parallelStream\(\)/, /\.reduce\(/],
    tags: ['Stream', 'parallel', 'performance', 'concurrency'],
  },

  {
    id: 'java-stream-050',
    category: 'Stream API - Advanced',
    difficulty: 'medium',
    title: 'Grouping with Mapping',
    text: 'Group by first letter and collect only the word lengths',
    setup: 'List<String> words = Arrays.asList("apple", "ant", "banana", "bear", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "ant", "banana", "bear", "cherry");',
    expected: { a: [5, 3], b: [6, 4], c: [6] },
    sample:
      'words.stream().collect(Collectors.groupingBy(s -> s.charAt(0), Collectors.mapping(String::length, Collectors.toList())))',
    hints: [
      'Use Collectors.mapping() as downstream collector',
      'mapping(mapper, downstream) transforms before collecting',
      'Useful for extracting specific fields when grouping',
    ],
    validPatterns: [/\.stream\(\)/, /groupingBy\(/, /mapping\(/],
    tags: ['Stream', 'Collectors', 'groupingBy', 'mapping'],
  },

  // --- HARD (5 problems) ---

  {
    id: 'java-stream-051',
    category: 'Stream API - Advanced',
    difficulty: 'hard',
    title: 'SummarizingInt Statistics',
    text: 'Get all statistics (count, sum, min, avg, max) for ages',
    setup: 'List<Integer> ages = Arrays.asList(25, 30, 35, 40, 45);',
    setupCode: 'List<Integer> ages = Arrays.asList(25, 30, 35, 40, 45);',
    expected: { count: 5, sum: 175, min: 25, average: 35.0, max: 45 },
    sample:
      'ages.stream().collect(Collectors.summarizingInt(Integer::intValue)) // returns IntSummaryStatistics',
    hints: [
      'Collectors.summarizingInt returns IntSummaryStatistics',
      'Contains getCount(), getSum(), getMin(), getAverage(), getMax()',
      'Also available: summarizingLong, summarizingDouble',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.summarizingInt\(/],
    tags: ['Stream', 'Collectors', 'summarizing', 'statistics', 'advanced'],
  },

  {
    id: 'java-stream-052',
    category: 'Stream API - Advanced',
    difficulty: 'hard',
    title: 'Teeing Collector (Java 12+)',
    text: 'Calculate both sum and count in a single stream operation',
    setup: 'List<Integer> nums = Arrays.asList(10, 20, 30, 40);',
    setupCode: 'List<Integer> nums = Arrays.asList(10, 20, 30, 40);',
    expected: { sum: 100, count: 4 },
    sample:
      'nums.stream().collect(Collectors.teeing(\n  Collectors.summingInt(Integer::intValue),\n  Collectors.counting(),\n  (sum, count) -> Map.of("sum", sum, "count", count)\n))',
    hints: [
      'Collectors.teeing combines two collectors and merges results',
      'Takes two collectors and a BiFunction merger',
      'Java 12+ feature - processes stream once for multiple results',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.teeing\(/],
    tags: ['Stream', 'Collectors', 'teeing', 'Java12', 'advanced'],
  },

  {
    id: 'java-stream-053',
    category: 'Stream API - Advanced',
    difficulty: 'hard',
    title: 'Complex Pipeline - Top N Longest',
    text: 'Find the top 3 longest words that start with a vowel, sorted by length descending',
    setup:
      'List<String> words = Arrays.asList("elephant", "ant", "umbrella", "igloo", "orange", "apple", "ice", "ear");',
    setupCode:
      'List<String> words = Arrays.asList("elephant", "ant", "umbrella", "igloo", "orange", "apple", "ice", "ear");',
    expected: ['elephant', 'umbrella', 'orange'],
    sample:
      'words.stream()\n  .filter(w -> "aeiouAEIOU".indexOf(w.charAt(0)) >= 0)\n  .sorted(Comparator.comparingInt(String::length).reversed())\n  .limit(3)\n  .collect(Collectors.toList())',
    hints: [
      'Chain filter, sorted, limit in the right order',
      'Comparator.comparingInt().reversed() for descending order',
      'Check first character against vowels using indexOf or matches',
    ],
    validPatterns: [/\.stream\(\)/, /\.filter\(/, /\.sorted\(/, /\.limit\(/, /reversed\(\)/],
    tags: ['Stream', 'pipeline', 'filter', 'sort', 'advanced'],
  },

  {
    id: 'java-stream-054',
    category: 'Stream API - Advanced',
    difficulty: 'hard',
    title: 'Nested GroupingBy',
    text: 'Group employees by department, then by salary range (high >50k, low <=50k)',
    setup:
      'record Employee(String name, String dept, int salary) {}\nList<Employee> employees = Arrays.asList(\n  new Employee("Alice", "IT", 60000),\n  new Employee("Bob", "IT", 45000),\n  new Employee("Carol", "HR", 55000),\n  new Employee("Dave", "HR", 40000)\n);',
    setupCode:
      'record Employee(String name, String dept, int salary) {}\nList<Employee> employees = Arrays.asList(\n  new Employee("Alice", "IT", 60000),\n  new Employee("Bob", "IT", 45000),\n  new Employee("Carol", "HR", 55000),\n  new Employee("Dave", "HR", 40000)\n);',
    expected: {
      IT: { high: ['Alice'], low: ['Bob'] },
      HR: { high: ['Carol'], low: ['Dave'] },
    },
    sample:
      'employees.stream().collect(\n  Collectors.groupingBy(Employee::dept,\n    Collectors.groupingBy(e -> e.salary() > 50000 ? "high" : "low",\n      Collectors.mapping(Employee::name, Collectors.toList())\n    )\n  )\n)',
    hints: [
      'Nest groupingBy collectors for multi-level grouping',
      'Use ternary operator for salary classification',
      'Add mapping collector to extract just names',
    ],
    validPatterns: [/\.stream\(\)/, /groupingBy\([\s\S]*groupingBy\(/, /mapping\(/],
    tags: ['Stream', 'Collectors', 'groupingBy', 'nested', 'advanced'],
  },

  {
    id: 'java-stream-055',
    category: 'Stream API - Advanced',
    difficulty: 'hard',
    title: 'Find Second Largest',
    text: 'Find the second largest number in the list',
    setup: 'List<Integer> nums = Arrays.asList(5, 2, 9, 1, 7, 3, 8);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 2, 9, 1, 7, 3, 8);',
    expected: 8,
    sample:
      'nums.stream()\n  .sorted(Comparator.reverseOrder())\n  .skip(1)\n  .findFirst()\n  .orElse(null)',
    hints: [
      'Sort in descending order using Comparator.reverseOrder()',
      'skip(1) skips the largest element',
      'findFirst() gets the second largest',
      'Alternative: use distinct() first if duplicates should be ignored',
    ],
    validPatterns: [/\.stream\(\)/, /\.sorted\(/, /\.skip\(1\)/, /\.findFirst\(\)/],
    tags: ['Stream', 'Collector', 'sort', 'skip', 'algorithm'],
  },

  // ============================================================
  // NEW PROBLEMS - Stream API Advanced (Collectors, Parallel Streams)
  // ============================================================

  {
    id: 'java-stream-300',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collect to TreeSet',
    text: 'Collect the numbers into a sorted TreeSet',
    setup: 'List<Integer> nums = Arrays.asList(5, 2, 8, 2, 1, 8, 3);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 2, 8, 2, 1, 8, 3);',
    expected: [1, 2, 3, 5, 8],
    sample: 'nums.stream().collect(Collectors.toCollection(TreeSet::new))',
    hints: [
      'Use Collectors.toCollection() with a supplier',
      'TreeSet::new creates a new TreeSet',
      'TreeSet automatically sorts and removes duplicates',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.toCollection/, /TreeSet/],
    tags: ['Stream', 'Collectors', 'TreeSet', 'sorted'],
  },

  {
    id: 'java-stream-301',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collect to LinkedHashSet',
    text: 'Collect unique elements preserving insertion order',
    setup: 'List<String> items = Arrays.asList("b", "a", "c", "a", "b", "d");',
    setupCode: 'List<String> items = Arrays.asList("b", "a", "c", "a", "b", "d");',
    expected: ['b', 'a', 'c', 'd'],
    sample: 'items.stream().collect(Collectors.toCollection(LinkedHashSet::new))',
    hints: [
      'LinkedHashSet maintains insertion order',
      'Use Collectors.toCollection() with supplier',
      'Duplicates are removed while preserving first occurrence order',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.toCollection/, /LinkedHashSet/],
    tags: ['Stream', 'Collectors', 'LinkedHashSet', 'order'],
  },

  {
    id: 'java-stream-302',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Parallel Stream Sum',
    text: 'Calculate the sum using parallel stream for better performance',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
    expected: 55,
    sample: 'nums.parallelStream().mapToInt(Integer::intValue).sum()',
    hints: [
      'Use parallelStream() instead of stream()',
      'mapToInt() converts to IntStream for efficient sum',
      'Parallel streams use ForkJoinPool for processing',
    ],
    validPatterns: [/\.parallelStream\(\)/, /\.sum\(\)/],
    tags: ['Stream', 'parallel', 'performance', 'sum'],
  },

  {
    id: 'java-stream-303',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Parallel Stream with Custom Pool',
    text: 'Process elements using a custom ForkJoinPool with 4 threads',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: [2, 4, 6, 8, 10],
    sample:
      'ForkJoinPool pool = new ForkJoinPool(4);\npool.submit(() -> nums.parallelStream().map(n -> n * 2).collect(Collectors.toList())).get()',
    hints: [
      'Create ForkJoinPool with desired parallelism',
      'Submit parallel stream operation as task',
      'Use get() to retrieve result from Future',
    ],
    validPatterns: [/ForkJoinPool/, /parallelStream/],
    tags: ['Stream', 'parallel', 'ForkJoinPool', 'concurrency'],
  },

  {
    id: 'java-stream-304',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collectors.joining with Delimiter',
    text: 'Join strings with comma and space separator',
    setup: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    expected: 'apple, banana, cherry',
    sample: 'words.stream().collect(Collectors.joining(", "))',
    hints: [
      'Collectors.joining() concatenates strings',
      'Pass delimiter as argument',
      'Works only with Stream<String>',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.joining/],
    tags: ['Stream', 'Collectors', 'joining', 'String'],
  },

  {
    id: 'java-stream-305',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collectors.joining with Prefix and Suffix',
    text: 'Join strings with comma delimiter, wrapped in brackets',
    setup: 'List<String> items = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "c");',
    expected: '[a, b, c]',
    sample: 'items.stream().collect(Collectors.joining(", ", "[", "]"))',
    hints: [
      'joining(delimiter, prefix, suffix) adds wrapper',
      'Prefix appears before first element',
      'Suffix appears after last element',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.joining\(/],
    tags: ['Stream', 'Collectors', 'joining', 'formatting'],
  },

  {
    id: 'java-stream-306',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collectors.averagingInt',
    text: 'Calculate the average of all numbers',
    setup: 'List<Integer> nums = Arrays.asList(10, 20, 30, 40, 50);',
    setupCode: 'List<Integer> nums = Arrays.asList(10, 20, 30, 40, 50);',
    expected: 30.0,
    sample: 'nums.stream().collect(Collectors.averagingInt(Integer::intValue))',
    hints: [
      'Collectors.averagingInt() calculates average',
      'Returns Double, not int',
      'Also available: averagingLong, averagingDouble',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.averagingInt/],
    tags: ['Stream', 'Collectors', 'average', 'statistics'],
  },

  {
    id: 'java-stream-307',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.summarizingInt',
    text: 'Get complete statistics (count, sum, min, max, average) for numbers',
    setup: 'List<Integer> nums = Arrays.asList(5, 10, 15, 20, 25);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 10, 15, 20, 25);',
    expected: { count: 5, sum: 75, min: 5, max: 25, average: 15.0 },
    sample:
      'IntSummaryStatistics stats = nums.stream().collect(Collectors.summarizingInt(Integer::intValue));\n// stats.getCount(), stats.getSum(), stats.getMin(), stats.getMax(), stats.getAverage()',
    hints: [
      'summarizingInt returns IntSummaryStatistics',
      'Contains count, sum, min, max, and average',
      'Single pass through data for all statistics',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.summarizingInt/],
    tags: ['Stream', 'Collectors', 'statistics', 'IntSummaryStatistics'],
  },

  {
    id: 'java-stream-308',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collectors.counting',
    text: 'Count the number of elements using Collectors',
    setup: 'List<String> items = Arrays.asList("a", "b", "c", "d", "e");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "c", "d", "e");',
    expected: 5,
    sample: 'items.stream().collect(Collectors.counting())',
    hints: [
      'Collectors.counting() returns element count',
      'Returns Long, not int',
      'Useful as downstream collector in groupingBy',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.counting\(\)/],
    tags: ['Stream', 'Collectors', 'counting'],
  },

  {
    id: 'java-stream-309',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.collectingAndThen',
    text: 'Collect to list and then convert to unmodifiable list',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3);',
    expected: [1, 2, 3],
    sample:
      'nums.stream().collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList))',
    hints: [
      'collectingAndThen applies finisher to result',
      'First argument is the collector',
      'Second argument is the finishing function',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.collectingAndThen/],
    tags: ['Stream', 'Collectors', 'collectingAndThen', 'immutable'],
  },

  {
    id: 'java-stream-310',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.reducing',
    text: 'Find the longest string using Collectors.reducing',
    setup: 'List<String> words = Arrays.asList("cat", "elephant", "dog", "giraffe");',
    setupCode: 'List<String> words = Arrays.asList("cat", "elephant", "dog", "giraffe");',
    expected: 'elephant',
    sample:
      'words.stream().collect(Collectors.reducing((a, b) -> a.length() >= b.length() ? a : b)).orElse("")',
    hints: [
      'Collectors.reducing performs reduction',
      'Returns Optional when no identity provided',
      'Compare by length to find longest',
    ],
    validPatterns: [/\.stream\(\)/, /Collectors\.reducing/],
    tags: ['Stream', 'Collectors', 'reducing', 'Optional'],
  },

  // ============================================================
  // Optional Methods
  // ============================================================

  {
    id: 'java-opt-300',
    category: 'Optional Methods',
    difficulty: 'easy',
    title: 'Optional.of',
    text: 'Create an Optional containing the value "Hello"',
    setup: '// Create Optional with non-null value',
    setupCode: '// Create Optional with non-null value',
    expected: 'Hello',
    sample: 'Optional.of("Hello").get()',
    hints: [
      'Optional.of() creates Optional with value',
      'Throws NullPointerException if value is null',
      'Use ofNullable() if value might be null',
    ],
    validPatterns: [/Optional\.of\(/],
    tags: ['Optional', 'of', 'creation'],
  },

  {
    id: 'java-opt-301',
    category: 'Optional Methods',
    difficulty: 'easy',
    title: 'Optional.ofNullable',
    text: 'Create an Optional that safely handles null',
    setup: 'String value = null;',
    setupCode: 'String value = null;',
    expected: true,
    sample: 'Optional.ofNullable(value).isEmpty()',
    hints: [
      'ofNullable() handles null safely',
      'Returns empty Optional if value is null',
      'isEmpty() checks if Optional has no value',
    ],
    validPatterns: [/Optional\.ofNullable\(/],
    tags: ['Optional', 'ofNullable', 'null-safe'],
  },

  {
    id: 'java-opt-302',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional.map',
    text: 'Transform the Optional value to uppercase',
    setup: 'Optional<String> opt = Optional.of("hello");',
    setupCode: 'Optional<String> opt = Optional.of("hello");',
    expected: 'HELLO',
    sample: 'opt.map(String::toUpperCase).orElse("")',
    hints: [
      'map() transforms the value if present',
      'Returns empty Optional if original is empty',
      'Chain with orElse() to get final value',
    ],
    validPatterns: [/\.map\(/, /toUpperCase/],
    tags: ['Optional', 'map', 'transformation'],
  },

  {
    id: 'java-opt-303',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional.flatMap',
    text: 'Chain Optional operations without nesting',
    setup:
      'Optional<String> opt = Optional.of("hello");\nFunction<String, Optional<Integer>> getLength = s -> Optional.of(s.length());',
    setupCode:
      'Optional<String> opt = Optional.of("hello");\njava.util.function.Function<String, Optional<Integer>> getLength = s -> Optional.of(s.length());',
    expected: 5,
    sample: 'opt.flatMap(getLength).orElse(0)',
    hints: [
      'flatMap() flattens nested Optionals',
      'Use when mapping function returns Optional',
      'Prevents Optional<Optional<T>> nesting',
    ],
    validPatterns: [/\.flatMap\(/],
    tags: ['Optional', 'flatMap', 'chaining'],
  },

  {
    id: 'java-opt-304',
    category: 'Optional Methods',
    difficulty: 'easy',
    title: 'Optional.orElse',
    text: 'Get the value or return a default',
    setup: 'Optional<String> opt = Optional.empty();',
    setupCode: 'Optional<String> opt = Optional.empty();',
    expected: 'default',
    sample: 'opt.orElse("default")',
    hints: [
      'orElse() provides fallback value',
      'Default is always evaluated',
      'Use orElseGet() for lazy evaluation',
    ],
    validPatterns: [/\.orElse\(/],
    tags: ['Optional', 'orElse', 'default'],
  },

  {
    id: 'java-opt-305',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional.orElseGet',
    text: 'Get the value or compute a default lazily',
    setup: 'Optional<String> opt = Optional.empty();',
    setupCode: 'Optional<String> opt = Optional.empty();',
    expected: 'computed',
    sample: 'opt.orElseGet(() -> "computed")',
    hints: [
      'orElseGet() uses Supplier for lazy evaluation',
      'Supplier is only called if Optional is empty',
      'Better performance when default is expensive to compute',
    ],
    validPatterns: [/\.orElseGet\(/],
    tags: ['Optional', 'orElseGet', 'lazy'],
  },

  {
    id: 'java-opt-306',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional.orElseThrow',
    text: 'Get the value or throw IllegalStateException',
    setup: 'Optional<String> opt = Optional.of("value");',
    setupCode: 'Optional<String> opt = Optional.of("value");',
    expected: 'value',
    sample: 'opt.orElseThrow(() -> new IllegalStateException("No value"))',
    hints: [
      'orElseThrow() throws if empty',
      'Supplier provides the exception',
      'Java 10+: orElseThrow() without args throws NoSuchElementException',
    ],
    validPatterns: [/\.orElseThrow\(/],
    tags: ['Optional', 'orElseThrow', 'exception'],
  },

  {
    id: 'java-opt-307',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional.ifPresent',
    text: 'Print the value only if present',
    setup: 'Optional<String> opt = Optional.of("Hello");',
    setupCode: 'Optional<String> opt = Optional.of("Hello");',
    expected: 'Hello',
    sample: 'opt.ifPresent(System.out::println)',
    hints: [
      'ifPresent() executes Consumer if value exists',
      'Does nothing if Optional is empty',
      'Method reference System.out::println prints value',
    ],
    validPatterns: [/\.ifPresent\(/],
    tags: ['Optional', 'ifPresent', 'Consumer'],
  },

  {
    id: 'java-opt-308',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional.ifPresentOrElse',
    text: 'Print value if present, otherwise print "empty" (Java 9+)',
    setup: 'Optional<String> opt = Optional.empty();',
    setupCode: 'Optional<String> opt = Optional.empty();',
    expected: 'empty',
    sample: 'opt.ifPresentOrElse(System.out::println, () -> System.out.println("empty"))',
    hints: [
      'ifPresentOrElse() handles both cases (Java 9+)',
      'First arg: Consumer for present value',
      'Second arg: Runnable for empty case',
    ],
    validPatterns: [/\.ifPresentOrElse\(/],
    tags: ['Optional', 'ifPresentOrElse', 'Java9'],
  },

  {
    id: 'java-opt-309',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional.filter',
    text: 'Keep the Optional value only if it starts with "A"',
    setup: 'Optional<String> opt = Optional.of("Apple");',
    setupCode: 'Optional<String> opt = Optional.of("Apple");',
    expected: 'Apple',
    sample: 'opt.filter(s -> s.startsWith("A")).orElse("none")',
    hints: [
      'filter() applies predicate to value',
      'Returns empty if predicate is false',
      'Returns same Optional if predicate is true',
    ],
    validPatterns: [/\.filter\(/],
    tags: ['Optional', 'filter', 'predicate'],
  },

  {
    id: 'java-opt-310',
    category: 'Optional Methods',
    difficulty: 'hard',
    title: 'Optional.or (Java 9+)',
    text: 'Return alternative Optional if empty',
    setup: 'Optional<String> opt = Optional.empty();',
    setupCode: 'Optional<String> opt = Optional.empty();',
    expected: 'alternative',
    sample: 'opt.or(() -> Optional.of("alternative")).orElse("")',
    hints: [
      'or() provides alternative Optional (Java 9+)',
      'Supplier returns replacement Optional',
      'Only called if original is empty',
    ],
    validPatterns: [/\.or\(/],
    tags: ['Optional', 'or', 'Java9', 'fallback'],
  },

  {
    id: 'java-opt-311',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional.stream (Java 9+)',
    text: 'Convert Optional to Stream for pipeline processing',
    setup: 'Optional<String> opt = Optional.of("hello");',
    setupCode: 'Optional<String> opt = Optional.of("hello");',
    expected: ['hello'],
    sample: 'opt.stream().collect(Collectors.toList())',
    hints: [
      'stream() converts to Stream (Java 9+)',
      'Returns Stream with 0 or 1 element',
      'Useful in flatMap with Stream<Optional<T>>',
    ],
    validPatterns: [/\.stream\(\)/],
    tags: ['Optional', 'stream', 'Java9'],
  },

  // ============================================================
  // Functional Interfaces
  // ============================================================

  {
    id: 'java-func-300',
    category: 'Functional Interfaces',
    difficulty: 'easy',
    title: 'Predicate Test',
    text: 'Create a Predicate to test if number is positive',
    setup: 'int num = 5;',
    setupCode: 'int num = 5;',
    expected: true,
    sample: 'Predicate<Integer> isPositive = n -> n > 0;\nisPositive.test(num)',
    hints: [
      'Predicate<T> has test(T) method returning boolean',
      'Use lambda: n -> n > 0',
      'test() evaluates the predicate',
    ],
    validPatterns: [/Predicate/, /\.test\(/],
    tags: ['Predicate', 'functional', 'test'],
  },

  {
    id: 'java-func-301',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'Predicate.and',
    text: 'Combine predicates: number is positive AND even',
    setup:
      'Predicate<Integer> isPositive = n -> n > 0;\nPredicate<Integer> isEven = n -> n % 2 == 0;',
    setupCode:
      'java.util.function.Predicate<Integer> isPositive = n -> n > 0;\njava.util.function.Predicate<Integer> isEven = n -> n % 2 == 0;',
    expected: true,
    sample: 'isPositive.and(isEven).test(4)',
    hints: [
      'and() combines predicates with logical AND',
      'Both predicates must return true',
      'Returns new Predicate',
    ],
    validPatterns: [/\.and\(/],
    tags: ['Predicate', 'and', 'composition'],
  },

  {
    id: 'java-func-302',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'Predicate.or',
    text: 'Combine predicates: number is negative OR zero',
    setup: 'Predicate<Integer> isNegative = n -> n < 0;\nPredicate<Integer> isZero = n -> n == 0;',
    setupCode:
      'java.util.function.Predicate<Integer> isNegative = n -> n < 0;\njava.util.function.Predicate<Integer> isZero = n -> n == 0;',
    expected: true,
    sample: 'isNegative.or(isZero).test(0)',
    hints: [
      'or() combines predicates with logical OR',
      'Either predicate returning true is sufficient',
      'Returns new Predicate',
    ],
    validPatterns: [/\.or\(/],
    tags: ['Predicate', 'or', 'composition'],
  },

  {
    id: 'java-func-303',
    category: 'Functional Interfaces',
    difficulty: 'easy',
    title: 'Predicate.negate',
    text: 'Negate a predicate: number is NOT positive',
    setup: 'Predicate<Integer> isPositive = n -> n > 0;',
    setupCode: 'java.util.function.Predicate<Integer> isPositive = n -> n > 0;',
    expected: true,
    sample: 'isPositive.negate().test(-5)',
    hints: [
      'negate() inverts the predicate result',
      'true becomes false and vice versa',
      'Returns new Predicate',
    ],
    validPatterns: [/\.negate\(\)/],
    tags: ['Predicate', 'negate', 'inversion'],
  },

  {
    id: 'java-func-304',
    category: 'Functional Interfaces',
    difficulty: 'easy',
    title: 'Function Apply',
    text: 'Create a Function to get string length',
    setup: 'String str = "Hello";',
    setupCode: 'String str = "Hello";',
    expected: 5,
    sample: 'Function<String, Integer> getLength = String::length;\ngetLength.apply(str)',
    hints: [
      'Function<T, R> transforms T to R',
      'apply() executes the function',
      'Method reference String::length is concise',
    ],
    validPatterns: [/Function/, /\.apply\(/],
    tags: ['Function', 'apply', 'transformation'],
  },

  {
    id: 'java-func-305',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'Function.andThen',
    text: 'Chain functions: get length then double it',
    setup:
      'Function<String, Integer> getLength = String::length;\nFunction<Integer, Integer> doubleIt = n -> n * 2;',
    setupCode:
      'java.util.function.Function<String, Integer> getLength = String::length;\njava.util.function.Function<Integer, Integer> doubleIt = n -> n * 2;',
    expected: 10,
    sample: 'getLength.andThen(doubleIt).apply("Hello")',
    hints: [
      'andThen() chains functions in order',
      'First function output becomes second input',
      'Returns composed Function',
    ],
    validPatterns: [/\.andThen\(/],
    tags: ['Function', 'andThen', 'composition'],
  },

  {
    id: 'java-func-306',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'Function.compose',
    text: 'Compose functions: trim then get length',
    setup:
      'Function<String, String> trim = String::trim;\nFunction<String, Integer> getLength = String::length;',
    setupCode:
      'java.util.function.Function<String, String> trim = String::trim;\njava.util.function.Function<String, Integer> getLength = String::length;',
    expected: 5,
    sample: 'getLength.compose(trim).apply("  Hello  ")',
    hints: [
      'compose() applies argument function first',
      'Opposite order of andThen()',
      'trim runs before getLength',
    ],
    validPatterns: [/\.compose\(/],
    tags: ['Function', 'compose', 'composition'],
  },

  {
    id: 'java-func-307',
    category: 'Functional Interfaces',
    difficulty: 'easy',
    title: 'Consumer Accept',
    text: 'Create a Consumer to print a value',
    setup: 'String message = "Hello World";',
    setupCode: 'String message = "Hello World";',
    expected: 'Hello World',
    sample: 'Consumer<String> printer = System.out::println;\nprinter.accept(message)',
    hints: [
      'Consumer<T> performs action on T, returns nothing',
      'accept() executes the consumer',
      'Commonly used for side effects like printing',
    ],
    validPatterns: [/Consumer/, /\.accept\(/],
    tags: ['Consumer', 'accept', 'side-effect'],
  },

  {
    id: 'java-func-308',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'Consumer.andThen',
    text: 'Chain consumers: print then print uppercase',
    setup:
      'Consumer<String> print = System.out::println;\nConsumer<String> printUpper = s -> System.out.println(s.toUpperCase());',
    setupCode:
      'java.util.function.Consumer<String> print = System.out::println;\njava.util.function.Consumer<String> printUpper = s -> System.out.println(s.toUpperCase());',
    expected: 'hello\nHELLO',
    sample: 'print.andThen(printUpper).accept("hello")',
    hints: [
      'andThen() chains consumers sequentially',
      'Both consumers receive the same input',
      'Useful for multiple side effects',
    ],
    validPatterns: [/\.andThen\(/],
    tags: ['Consumer', 'andThen', 'chaining'],
  },

  {
    id: 'java-func-309',
    category: 'Functional Interfaces',
    difficulty: 'easy',
    title: 'Supplier Get',
    text: 'Create a Supplier that returns current timestamp',
    setup: '// Get current time in milliseconds',
    setupCode: '// Get current time in milliseconds',
    expected: true,
    sample:
      'Supplier<Long> timestampSupplier = System::currentTimeMillis;\nlong time = timestampSupplier.get();\ntime > 0',
    hints: [
      'Supplier<T> provides values, takes no input',
      'get() retrieves the supplied value',
      'Useful for lazy initialization',
    ],
    validPatterns: [/Supplier/, /\.get\(\)/],
    tags: ['Supplier', 'get', 'lazy'],
  },

  {
    id: 'java-func-310',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'BiFunction Apply',
    text: 'Create a BiFunction to concatenate two strings',
    setup: 'String a = "Hello";\nString b = "World";',
    setupCode: 'String a = "Hello";\nString b = "World";',
    expected: 'HelloWorld',
    sample: 'BiFunction<String, String, String> concat = (s1, s2) -> s1 + s2;\nconcat.apply(a, b)',
    hints: [
      'BiFunction<T, U, R> takes two inputs, returns R',
      'apply() takes both arguments',
      'Useful for combining two values',
    ],
    validPatterns: [/BiFunction/, /\.apply\(/],
    tags: ['BiFunction', 'apply', 'two-args'],
  },

  {
    id: 'java-func-311',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'BiPredicate Test',
    text: 'Create a BiPredicate to test if first string contains second',
    setup: 'String text = "Hello World";\nString search = "World";',
    setupCode: 'String text = "Hello World";\nString search = "World";',
    expected: true,
    sample: 'BiPredicate<String, String> contains = String::contains;\ncontains.test(text, search)',
    hints: [
      'BiPredicate<T, U> tests two inputs',
      'test() returns boolean',
      'Method reference for contains works here',
    ],
    validPatterns: [/BiPredicate/, /\.test\(/],
    tags: ['BiPredicate', 'test', 'two-args'],
  },

  {
    id: 'java-func-312',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'UnaryOperator',
    text: 'Create a UnaryOperator to increment a number',
    setup: 'int num = 5;',
    setupCode: 'int num = 5;',
    expected: 6,
    sample: 'UnaryOperator<Integer> increment = n -> n + 1;\nincrement.apply(num)',
    hints: [
      'UnaryOperator<T> is Function<T, T>',
      'Input and output have same type',
      'apply() executes the operation',
    ],
    validPatterns: [/UnaryOperator/, /\.apply\(/],
    tags: ['UnaryOperator', 'apply', 'same-type'],
  },

  {
    id: 'java-func-313',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'BinaryOperator',
    text: 'Create a BinaryOperator to find maximum of two numbers',
    setup: 'int a = 10;\nint b = 20;',
    setupCode: 'int a = 10;\nint b = 20;',
    expected: 20,
    sample: 'BinaryOperator<Integer> max = Integer::max;\nmax.apply(a, b)',
    hints: [
      'BinaryOperator<T> is BiFunction<T, T, T>',
      'All types are the same',
      'Integer::max is a convenient method reference',
    ],
    validPatterns: [/BinaryOperator/, /\.apply\(/],
    tags: ['BinaryOperator', 'apply', 'reduction'],
  },

  // ============================================================
  // Lambda Expressions & Method References
  // ============================================================

  {
    id: 'java-lambda-300',
    category: 'Lambda Expressions',
    difficulty: 'easy',
    title: 'Basic Lambda Syntax',
    text: 'Create a lambda to add two integers',
    setup: '// Define addition operation',
    setupCode: '// Define addition operation',
    expected: 15,
    sample: 'BinaryOperator<Integer> add = (a, b) -> a + b;\nadd.apply(10, 5)',
    hints: [
      'Lambda syntax: (params) -> expression',
      'Types can be inferred',
      'Single expression needs no return keyword',
    ],
    validPatterns: [/\([^)]*\)\s*->/],
    tags: ['lambda', 'syntax', 'basics'],
  },

  {
    id: 'java-lambda-301',
    category: 'Lambda Expressions',
    difficulty: 'easy',
    title: 'Lambda with Block Body',
    text: 'Create a lambda with multiple statements',
    setup: '// Process and return modified string',
    setupCode: '// Process and return modified string',
    expected: 'HELLO!',
    sample:
      'Function<String, String> process = s -> {\n  String upper = s.toUpperCase();\n  return upper + "!";\n};\nprocess.apply("hello")',
    hints: [
      'Use braces {} for multiple statements',
      'Explicit return needed with braces',
      'Can declare local variables inside',
    ],
    validPatterns: [/->\s*\{/],
    tags: ['lambda', 'block', 'statements'],
  },

  {
    id: 'java-lambda-302',
    category: 'Lambda Expressions',
    difficulty: 'easy',
    title: 'Static Method Reference',
    text: 'Use method reference for Integer.parseInt',
    setup: 'List<String> numbers = Arrays.asList("1", "2", "3");',
    setupCode: 'List<String> numbers = Arrays.asList("1", "2", "3");',
    expected: [1, 2, 3],
    sample: 'numbers.stream().map(Integer::parseInt).collect(Collectors.toList())',
    hints: [
      'ClassName::staticMethod syntax',
      'Equivalent to s -> Integer.parseInt(s)',
      'Cleaner than explicit lambda',
    ],
    validPatterns: [/Integer::parseInt/],
    tags: ['lambda', 'method-reference', 'static'],
  },

  {
    id: 'java-lambda-303',
    category: 'Lambda Expressions',
    difficulty: 'easy',
    title: 'Instance Method Reference on Object',
    text: 'Use method reference to print each element',
    setup: 'List<String> items = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "c");',
    expected: 'a\nb\nc',
    sample: 'items.forEach(System.out::println)',
    hints: [
      'object::instanceMethod syntax',
      'System.out is the object',
      'println is the instance method',
    ],
    validPatterns: [/System\.out::println/],
    tags: ['lambda', 'method-reference', 'instance'],
  },

  {
    id: 'java-lambda-304',
    category: 'Lambda Expressions',
    difficulty: 'medium',
    title: 'Instance Method Reference on Type',
    text: 'Use method reference for String length',
    setup: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    expected: [5, 6, 6],
    sample: 'words.stream().map(String::length).collect(Collectors.toList())',
    hints: [
      'ClassName::instanceMethod syntax',
      'Called on each stream element',
      'Equivalent to s -> s.length()',
    ],
    validPatterns: [/String::length/],
    tags: ['lambda', 'method-reference', 'type'],
  },

  {
    id: 'java-lambda-305',
    category: 'Lambda Expressions',
    difficulty: 'medium',
    title: 'Constructor Reference',
    text: 'Use constructor reference to create ArrayList',
    setup: 'Supplier<List<String>> listFactory;',
    setupCode: 'java.util.function.Supplier<List<String>> listFactory;',
    expected: [],
    sample: 'Supplier<List<String>> listFactory = ArrayList::new;\nlistFactory.get()',
    hints: [
      'ClassName::new syntax for constructors',
      'Creates new instance each time',
      'Works with Supplier for no-arg constructor',
    ],
    validPatterns: [/ArrayList::new/],
    tags: ['lambda', 'constructor-reference', 'factory'],
  },

  {
    id: 'java-lambda-306',
    category: 'Lambda Expressions',
    difficulty: 'medium',
    title: 'Constructor Reference with Argument',
    text: 'Use constructor reference to create strings from char arrays',
    setup: 'Function<char[], String> stringFactory;',
    setupCode: 'java.util.function.Function<char[], String> stringFactory;',
    expected: 'hello',
    sample:
      "Function<char[], String> stringFactory = String::new;\nstringFactory.apply(new char[]{'h','e','l','l','o'})",
    hints: [
      'Constructor reference matches Function signature',
      'Compiler infers which constructor to use',
      'Based on functional interface parameter types',
    ],
    validPatterns: [/String::new/],
    tags: ['lambda', 'constructor-reference', 'Function'],
  },

  {
    id: 'java-lambda-307',
    category: 'Lambda Expressions',
    difficulty: 'hard',
    title: 'Array Constructor Reference',
    text: 'Use array constructor reference in toArray',
    setup: 'List<String> list = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> list = Arrays.asList("a", "b", "c");',
    expected: ['a', 'b', 'c'],
    sample: 'list.stream().toArray(String[]::new)',
    hints: [
      'Type[]::new creates array constructor reference',
      'Used with toArray() to specify array type',
      'Equivalent to size -> new String[size]',
    ],
    validPatterns: [/String\[\]::new/],
    tags: ['lambda', 'array', 'constructor-reference'],
  },

  {
    id: 'java-lambda-308',
    category: 'Lambda Expressions',
    difficulty: 'medium',
    title: 'Effectively Final Variables',
    text: 'Use external variable in lambda (must be effectively final)',
    setup: 'String prefix = "Item: ";',
    setupCode: 'String prefix = "Item: ";',
    expected: ['Item: a', 'Item: b', 'Item: c'],
    sample:
      'List<String> items = Arrays.asList("a", "b", "c");\nitems.stream().map(s -> prefix + s).collect(Collectors.toList())',
    hints: [
      'Lambdas can capture local variables',
      'Variables must be effectively final',
      'Cannot be reassigned after initialization',
    ],
    validPatterns: [/->\s*prefix\s*\+/],
    tags: ['lambda', 'closure', 'effectively-final'],
  },

  {
    id: 'java-lambda-309',
    category: 'Lambda Expressions',
    difficulty: 'hard',
    title: 'Comparator with Method Reference',
    text: 'Sort strings by length using method reference',
    setup: 'List<String> words = new ArrayList<>(Arrays.asList("elephant", "cat", "dog"));',
    setupCode: 'List<String> words = new ArrayList<>(Arrays.asList("elephant", "cat", "dog"));',
    expected: ['cat', 'dog', 'elephant'],
    sample: 'words.sort(Comparator.comparingInt(String::length));\nwords',
    hints: [
      'Comparator.comparingInt extracts int key',
      'String::length provides the key',
      'Sorts by extracted key in natural order',
    ],
    validPatterns: [/Comparator\.comparingInt/, /String::length/],
    tags: ['lambda', 'Comparator', 'method-reference'],
  },

  // ============================================================
  // Record Classes (Java 14+)
  // ============================================================

  {
    id: 'java-record-300',
    category: 'Record Classes',
    difficulty: 'easy',
    title: 'Basic Record Declaration',
    text: 'Create a simple record for a Point with x and y coordinates',
    setup: '// Define a Point record',
    setupCode: '// Define a Point record',
    expected: { x: 10, y: 20 },
    sample:
      'record Point(int x, int y) {}\nPoint p = new Point(10, 20);\n// p.x() returns 10, p.y() returns 20',
    hints: [
      'Records are immutable data carriers (Java 14+)',
      'Automatic constructor, getters, equals, hashCode, toString',
      'Accessor methods named after components: x(), y()',
    ],
    validPatterns: [/record\s+Point\s*\(/],
    tags: ['record', 'Java14', 'immutable'],
  },

  {
    id: 'java-record-301',
    category: 'Record Classes',
    difficulty: 'medium',
    title: 'Record with Compact Constructor',
    text: 'Create a record with validation in compact constructor',
    setup: '// Define a Person record with age validation',
    setupCode: '// Define a Person record with age validation',
    expected: true,
    sample:
      'record Person(String name, int age) {\n  public Person {\n    if (age < 0) throw new IllegalArgumentException("Age cannot be negative");\n  }\n}\nnew Person("Alice", 25).age() >= 0',
    hints: [
      'Compact constructor has no parameter list',
      'Parameters are implicitly available',
      'Used for validation and normalization',
    ],
    validPatterns: [/record\s+\w+/, /public\s+\w+\s*\{/],
    tags: ['record', 'compact-constructor', 'validation'],
  },

  {
    id: 'java-record-302',
    category: 'Record Classes',
    difficulty: 'medium',
    title: 'Record with Custom Constructor',
    text: 'Create a record with additional custom constructor',
    setup: '// Define Rectangle record with width/height and area constructor',
    setupCode: '// Define Rectangle record with width/height and area constructor',
    expected: 50,
    sample:
      'record Rectangle(int width, int height) {\n  public Rectangle(int side) {\n    this(side, side); // creates square\n  }\n}\nnew Rectangle(5, 10).width() * new Rectangle(5, 10).height()',
    hints: [
      'Custom constructors must delegate to canonical',
      'Use this() to call canonical constructor',
      'Canonical constructor is the one with all components',
    ],
    validPatterns: [/record\s+\w+/, /this\s*\(/],
    tags: ['record', 'constructor', 'overloading'],
  },

  {
    id: 'java-record-303',
    category: 'Record Classes',
    difficulty: 'medium',
    title: 'Record with Instance Method',
    text: 'Add a method to calculate distance from origin',
    setup: '// Point record with distance method',
    setupCode: '// Point record with distance method',
    expected: 5.0,
    sample:
      'record Point(double x, double y) {\n  public double distanceFromOrigin() {\n    return Math.sqrt(x * x + y * y);\n  }\n}\nnew Point(3.0, 4.0).distanceFromOrigin()',
    hints: [
      'Records can have instance methods',
      'Methods can access component values',
      'Cannot have instance fields (only components)',
    ],
    validPatterns: [/record\s+\w+/, /public\s+\w+\s+\w+\s*\(\)/],
    tags: ['record', 'method', 'calculation'],
  },

  {
    id: 'java-record-304',
    category: 'Record Classes',
    difficulty: 'medium',
    title: 'Record with Static Method',
    text: 'Add a static factory method to create record from string',
    setup: '// Point record with factory method',
    setupCode: '// Point record with factory method',
    expected: { x: 10, y: 20 },
    sample:
      'record Point(int x, int y) {\n  public static Point fromString(String s) {\n    String[] parts = s.split(",");\n    return new Point(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]));\n  }\n}\nPoint.fromString("10,20")',
    hints: [
      'Records can have static methods',
      'Factory methods provide alternative creation',
      'Can include parsing logic',
    ],
    validPatterns: [/record\s+\w+/, /public\s+static/],
    tags: ['record', 'static', 'factory'],
  },

  {
    id: 'java-record-305',
    category: 'Record Classes',
    difficulty: 'hard',
    title: 'Record Implementing Interface',
    text: 'Create a record that implements Comparable',
    setup: '// Person record implementing Comparable',
    setupCode: '// Person record implementing Comparable',
    expected: -1,
    sample:
      'record Person(String name, int age) implements Comparable<Person> {\n  @Override\n  public int compareTo(Person other) {\n    return Integer.compare(this.age, other.age);\n  }\n}\nnew Person("Alice", 25).compareTo(new Person("Bob", 30))',
    hints: [
      'Records can implement interfaces',
      'Cannot extend classes (implicitly extend Record)',
      'Useful for Comparable, Serializable, etc.',
    ],
    validPatterns: [/record\s+\w+.*implements/],
    tags: ['record', 'interface', 'Comparable'],
  },

  {
    id: 'java-record-306',
    category: 'Record Classes',
    difficulty: 'easy',
    title: 'Record toString',
    text: 'Get the automatic toString representation',
    setup: 'record Book(String title, String author) {}',
    setupCode: 'record Book(String title, String author) {}',
    expected: 'Book[title=Java Guide, author=John Doe]',
    sample: 'new Book("Java Guide", "John Doe").toString()',
    hints: [
      'Records have automatic toString()',
      'Format: RecordName[component=value, ...]',
      'Can override for custom format',
    ],
    validPatterns: [/\.toString\(\)/],
    tags: ['record', 'toString', 'automatic'],
  },

  {
    id: 'java-record-307',
    category: 'Record Classes',
    difficulty: 'medium',
    title: 'Record equals and hashCode',
    text: 'Verify automatic equals based on all components',
    setup: 'record Point(int x, int y) {}',
    setupCode: 'record Point(int x, int y) {}',
    expected: true,
    sample:
      'Point p1 = new Point(10, 20);\nPoint p2 = new Point(10, 20);\np1.equals(p2) && p1.hashCode() == p2.hashCode()',
    hints: [
      'Records have automatic equals() and hashCode()',
      'Based on all components',
      'Two records equal if all components equal',
    ],
    validPatterns: [/\.equals\(/, /\.hashCode\(\)/],
    tags: ['record', 'equals', 'hashCode'],
  },

  {
    id: 'java-record-308',
    category: 'Record Classes',
    difficulty: 'hard',
    title: 'Nested Record',
    text: 'Create a record containing another record',
    setup: '// Address and Person records',
    setupCode: '// Address and Person records',
    expected: 'New York',
    sample:
      'record Address(String city, String street) {}\nrecord Person(String name, Address address) {}\nnew Person("Alice", new Address("New York", "5th Ave")).address().city()',
    hints: [
      'Records can contain other records',
      'Access nested via chained accessors',
      'Entire structure is immutable',
    ],
    validPatterns: [/record\s+\w+.*record\s+\w+/],
    tags: ['record', 'nested', 'composition'],
  },

  {
    id: 'java-record-309',
    category: 'Record Classes',
    difficulty: 'hard',
    title: 'Generic Record',
    text: 'Create a generic Pair record',
    setup: '// Generic Pair record',
    setupCode: '// Generic Pair record',
    expected: 'hello',
    sample:
      'record Pair<T, U>(T first, U second) {}\nPair<String, Integer> pair = new Pair<>("hello", 42);\npair.first()',
    hints: [
      'Records can be generic',
      'Type parameters in angle brackets',
      'Components use type parameters',
    ],
    validPatterns: [/record\s+\w+<\w+/],
    tags: ['record', 'generics', 'Pair'],
  },

  // ============================================================
  // Sealed Classes (Java 17+)
  // ============================================================

  {
    id: 'java-sealed-300',
    category: 'Sealed Classes',
    difficulty: 'medium',
    title: 'Basic Sealed Class',
    text: 'Create a sealed Shape class with permitted subclasses',
    setup: '// Define sealed Shape hierarchy',
    setupCode: '// Define sealed Shape hierarchy',
    expected: true,
    sample:
      'sealed abstract class Shape permits Circle, Rectangle {}\nfinal class Circle extends Shape {}\nfinal class Rectangle extends Shape {}\nnew Circle() instanceof Shape',
    hints: [
      'sealed keyword restricts inheritance (Java 17+)',
      'permits clause lists allowed subclasses',
      'Subclasses must be final, sealed, or non-sealed',
    ],
    validPatterns: [/sealed\s+(abstract\s+)?class/, /permits/],
    tags: ['sealed', 'Java17', 'inheritance'],
  },

  {
    id: 'java-sealed-301',
    category: 'Sealed Classes',
    difficulty: 'medium',
    title: 'Sealed Interface',
    text: 'Create a sealed interface with implementations',
    setup: '// Define sealed Vehicle interface',
    setupCode: '// Define sealed Vehicle interface',
    expected: true,
    sample:
      'sealed interface Vehicle permits Car, Bike {}\nfinal class Car implements Vehicle {}\nfinal class Bike implements Vehicle {}\nnew Car() instanceof Vehicle',
    hints: [
      'Interfaces can also be sealed',
      'Implementing classes listed in permits',
      'Useful for exhaustive type checking',
    ],
    validPatterns: [/sealed\s+interface/, /permits/],
    tags: ['sealed', 'interface', 'Java17'],
  },

  {
    id: 'java-sealed-302',
    category: 'Sealed Classes',
    difficulty: 'hard',
    title: 'Non-sealed Subclass',
    text: 'Create a non-sealed subclass allowing further extension',
    setup: '// Sealed hierarchy with non-sealed extension point',
    setupCode: '// Sealed hierarchy with non-sealed extension point',
    expected: true,
    sample:
      'sealed class Animal permits Dog, Cat {}\nnon-sealed class Dog extends Animal {}\nfinal class Cat extends Animal {}\nclass Labrador extends Dog {} // allowed because Dog is non-sealed\nnew Labrador() instanceof Animal',
    hints: [
      'non-sealed reopens class for extension',
      'Breaks the sealed hierarchy at that point',
      'Useful for plugin/extension architectures',
    ],
    validPatterns: [/sealed\s+class/, /non-sealed\s+class/],
    tags: ['sealed', 'non-sealed', 'extension'],
  },

  {
    id: 'java-sealed-303',
    category: 'Sealed Classes',
    difficulty: 'hard',
    title: 'Sealed with Records',
    text: 'Use records as permitted subtypes of sealed interface',
    setup: '// Sealed interface with record implementations',
    setupCode: '// Sealed interface with record implementations',
    expected: 78.54,
    sample:
      'sealed interface Shape permits Circle, Rectangle {}\nrecord Circle(double radius) implements Shape {}\nrecord Rectangle(double width, double height) implements Shape {}\ndouble area = switch(new Circle(5.0)) {\n  case Circle c -> Math.PI * c.radius() * c.radius();\n  case Rectangle r -> r.width() * r.height();\n};\nMath.round(area * 100.0) / 100.0',
    hints: [
      'Records are implicitly final',
      'Perfect for sealed type hierarchies',
      'Enables exhaustive pattern matching',
    ],
    validPatterns: [/sealed\s+interface/, /record\s+\w+.*implements/],
    tags: ['sealed', 'record', 'pattern-matching'],
  },

  // ============================================================
  // Pattern Matching
  // ============================================================

  {
    id: 'java-pattern-300',
    category: 'Pattern Matching',
    difficulty: 'easy',
    title: 'Pattern Matching instanceof',
    text: 'Use pattern matching to check and cast in one step',
    setup: 'Object obj = "Hello World";',
    setupCode: 'Object obj = "Hello World";',
    expected: 11,
    sample: 'if (obj instanceof String s) {\n  return s.length();\n}\nreturn 0;',
    hints: [
      'Pattern variable s is bound if instanceof succeeds',
      'No explicit cast needed (Java 16+)',
      's is in scope in the true branch',
    ],
    validPatterns: [/instanceof\s+\w+\s+\w+/],
    tags: ['pattern-matching', 'instanceof', 'Java16'],
  },

  {
    id: 'java-pattern-301',
    category: 'Pattern Matching',
    difficulty: 'medium',
    title: 'Pattern Matching with Negation',
    text: 'Use pattern matching with negated condition',
    setup: 'Object obj = 42;',
    setupCode: 'Object obj = 42;',
    expected: 'not a string',
    sample: 'if (!(obj instanceof String s)) {\n  return "not a string";\n}\nreturn s;',
    hints: [
      'Pattern variable available after negated check',
      'Variable in scope when condition is false',
      'Useful for early returns',
    ],
    validPatterns: [/!\s*\(\s*\w+\s+instanceof/],
    tags: ['pattern-matching', 'negation', 'Java16'],
  },

  {
    id: 'java-pattern-302',
    category: 'Pattern Matching',
    difficulty: 'medium',
    title: 'Switch Expression Basics',
    text: 'Use switch expression to return day type',
    setup: 'String day = "SATURDAY";',
    setupCode: 'String day = "SATURDAY";',
    expected: 'weekend',
    sample:
      'String type = switch (day) {\n  case "SATURDAY", "SUNDAY" -> "weekend";\n  default -> "weekday";\n};\ntype',
    hints: [
      'Switch expressions return values (Java 14+)',
      'Arrow syntax -> for concise cases',
      'Multiple labels per case allowed',
    ],
    validPatterns: [/switch\s*\([^)]+\)\s*\{/, /->/],
    tags: ['switch', 'expression', 'Java14'],
  },

  {
    id: 'java-pattern-303',
    category: 'Pattern Matching',
    difficulty: 'medium',
    title: 'Switch Expression with yield',
    text: 'Use yield for complex switch case blocks',
    setup: 'int value = 2;',
    setupCode: 'int value = 2;',
    expected: 'two',
    sample:
      'String result = switch (value) {\n  case 1 -> "one";\n  case 2 -> {\n    String s = "tw";\n    yield s + "o";\n  }\n  default -> "other";\n};\nresult',
    hints: [
      'yield returns value from block case',
      'Required for multi-statement cases',
      'Similar to return but for switch expressions',
    ],
    validPatterns: [/switch\s*\(/, /yield\s+/],
    tags: ['switch', 'yield', 'Java14'],
  },

  {
    id: 'java-pattern-304',
    category: 'Pattern Matching',
    difficulty: 'hard',
    title: 'Switch with Type Patterns',
    text: 'Use switch with type patterns for polymorphic behavior',
    setup: 'Object obj = "Hello";',
    setupCode: 'Object obj = "Hello";',
    expected: 5,
    sample:
      'int result = switch (obj) {\n  case Integer i -> i * 2;\n  case String s -> s.length();\n  case null -> 0;\n  default -> -1;\n};\nresult',
    hints: [
      'Type patterns in switch (Java 21+)',
      'Binds variable of matched type',
      'null case must be explicit',
    ],
    validPatterns: [/switch\s*\(/, /case\s+\w+\s+\w+\s*->/],
    tags: ['switch', 'type-pattern', 'Java21'],
  },

  {
    id: 'java-pattern-305',
    category: 'Pattern Matching',
    difficulty: 'hard',
    title: 'Guarded Patterns',
    text: 'Use guarded pattern with when clause',
    setup: 'Object obj = "Hello World";',
    setupCode: 'Object obj = "Hello World";',
    expected: 'long string',
    sample:
      'String result = switch (obj) {\n  case String s when s.length() > 5 -> "long string";\n  case String s -> "short string";\n  default -> "not a string";\n};\nresult',
    hints: [
      'when clause adds guard condition (Java 21+)',
      'Pattern matches only if guard is true',
      'Order matters - more specific first',
    ],
    validPatterns: [/case\s+\w+\s+\w+\s+when/],
    tags: ['switch', 'guarded-pattern', 'Java21'],
  },

  {
    id: 'java-pattern-306',
    category: 'Pattern Matching',
    difficulty: 'hard',
    title: 'Record Patterns',
    text: 'Deconstruct record in pattern matching',
    setup: 'record Point(int x, int y) {}\nObject obj = new Point(3, 4);',
    setupCode: 'record Point(int x, int y) {}\nObject obj = new Point(3, 4);',
    expected: 5.0,
    sample:
      'double dist = switch (obj) {\n  case Point(int x, int y) -> Math.sqrt(x*x + y*y);\n  default -> 0.0;\n};\ndist',
    hints: [
      'Record patterns deconstruct records (Java 21+)',
      'Binds component variables',
      'Works in instanceof and switch',
    ],
    validPatterns: [/case\s+\w+\s*\([^)]+\)/],
    tags: ['record', 'pattern', 'deconstruction', 'Java21'],
  },

  // ============================================================
  // Text Blocks (Java 15+)
  // ============================================================

  {
    id: 'java-textblock-300',
    category: 'Text Blocks',
    difficulty: 'easy',
    title: 'Basic Text Block',
    text: 'Create a multi-line string using text block',
    setup: '// Create multi-line JSON string',
    setupCode: '// Create multi-line JSON string',
    expected: '{\n  "name": "John"\n}',
    sample: 'String json = """\n    {\n      "name": "John"\n    }\n    """;\njson.strip()',
    hints: [
      'Text blocks use triple quotes """ (Java 15+)',
      'Content starts on line after opening quotes',
      'Closing quotes determine indentation baseline',
    ],
    validPatterns: [/"""/],
    tags: ['text-block', 'multiline', 'Java15'],
  },

  {
    id: 'java-textblock-301',
    category: 'Text Blocks',
    difficulty: 'medium',
    title: 'Text Block with Interpolation',
    text: 'Use formatted() with text block for string interpolation',
    setup: 'String name = "Alice";\nint age = 30;',
    setupCode: 'String name = "Alice";\nint age = 30;',
    expected: 'Name: Alice\nAge: 30',
    sample:
      'String result = """\n    Name: %s\n    Age: %d\n    """.formatted(name, age);\nresult.strip()',
    hints: [
      'formatted() works like String.format()',
      'Use %s, %d placeholders',
      'Clean alternative to concatenation',
    ],
    validPatterns: [/"""/, /\.formatted\(/],
    tags: ['text-block', 'formatted', 'interpolation'],
  },

  {
    id: 'java-textblock-302',
    category: 'Text Blocks',
    difficulty: 'medium',
    title: 'Text Block Escape Sequences',
    text: 'Use escape sequences in text blocks',
    setup: '// Text block with special characters',
    setupCode: '// Text block with special characters',
    expected: 'Line1\nLine2\\nStill Line2',
    sample: 'String text = """\n    Line1\n    Line2\\\\nStill Line2\n    """;\ntext.strip()',
    hints: [
      'Standard escapes work: \\n, \\t, \\\\',
      '\\n in text block is literal newline',
      'Use \\\\ for literal backslash',
    ],
    validPatterns: [/"""/],
    tags: ['text-block', 'escape', 'Java15'],
  },

  {
    id: 'java-textblock-303',
    category: 'Text Blocks',
    difficulty: 'medium',
    title: 'Text Block Line Continuation',
    text: 'Use backslash to prevent line break',
    setup: '// Single logical line across multiple source lines',
    setupCode: '// Single logical line across multiple source lines',
    expected: 'This is a single line',
    sample: 'String text = """\n    This is \\\n    a single line\n    """;\ntext.strip()',
    hints: [
      'Backslash at end of line continues it',
      'No newline inserted at that point',
      'Useful for long lines in source',
    ],
    validPatterns: [/"""/],
    tags: ['text-block', 'continuation', 'Java15'],
  },

  {
    id: 'java-textblock-304',
    category: 'Text Blocks',
    difficulty: 'easy',
    title: 'Text Block for SQL',
    text: 'Write SQL query using text block',
    setup: '// Multi-line SQL query',
    setupCode: '// Multi-line SQL query',
    expected: 'SELECT * FROM users WHERE active = true',
    sample:
      'String sql = """\n    SELECT * FROM users\n    WHERE active = true\n    """;\nsql.strip().replace("\\n", " ")',
    hints: [
      'Text blocks ideal for SQL queries',
      'Preserves formatting in source',
      'Easier to read than concatenation',
    ],
    validPatterns: [/"""/],
    tags: ['text-block', 'SQL', 'Java15'],
  },

  // ============================================================
  // var Keyword (Java 10+)
  // ============================================================

  {
    id: 'java-var-300',
    category: 'var Keyword',
    difficulty: 'easy',
    title: 'Basic var Declaration',
    text: 'Use var to declare a local variable',
    setup: '// Declare string using var',
    setupCode: '// Declare string using var',
    expected: 'Hello',
    sample: 'var message = "Hello";\nmessage',
    hints: [
      'var infers type from initializer (Java 10+)',
      'Only for local variables with initializers',
      'Type is fixed at compile time',
    ],
    validPatterns: [/var\s+\w+\s*=/],
    tags: ['var', 'type-inference', 'Java10'],
  },

  {
    id: 'java-var-301',
    category: 'var Keyword',
    difficulty: 'easy',
    title: 'var with Collections',
    text: 'Use var with ArrayList declaration',
    setup: '// Declare ArrayList using var',
    setupCode: '// Declare ArrayList using var',
    expected: 3,
    sample:
      'var list = new ArrayList<String>();\nlist.add("a");\nlist.add("b");\nlist.add("c");\nlist.size()',
    hints: [
      'var infers ArrayList<String> type',
      'Avoids repeating type on both sides',
      'Diamond operator still needed',
    ],
    validPatterns: [/var\s+\w+\s*=\s*new/],
    tags: ['var', 'collections', 'Java10'],
  },

  {
    id: 'java-var-302',
    category: 'var Keyword',
    difficulty: 'medium',
    title: 'var in for-each Loop',
    text: 'Use var in enhanced for loop',
    setup: 'List<String> items = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "c");',
    expected: 'ABC',
    sample:
      'StringBuilder sb = new StringBuilder();\nfor (var item : items) {\n  sb.append(item.toUpperCase());\n}\nsb.toString()',
    hints: [
      'var works in for-each loops',
      'Type inferred from collection element type',
      'Cleaner than explicit type',
    ],
    validPatterns: [/for\s*\(\s*var\s+\w+\s*:/],
    tags: ['var', 'for-each', 'Java10'],
  },

  {
    id: 'java-var-303',
    category: 'var Keyword',
    difficulty: 'medium',
    title: 'var with try-with-resources',
    text: 'Use var in try-with-resources statement',
    setup: '// Read file using var',
    setupCode: '// Read file using var',
    expected: true,
    sample:
      'try (var reader = new BufferedReader(new StringReader("test"))) {\n  return reader.readLine() != null;\n}',
    hints: [
      'var works in try-with-resources',
      'Type inferred from resource',
      'Resource still implements AutoCloseable',
    ],
    validPatterns: [/try\s*\(\s*var\s+\w+/],
    tags: ['var', 'try-with-resources', 'Java10'],
  },

  {
    id: 'java-var-304',
    category: 'var Keyword',
    difficulty: 'medium',
    title: 'var with Lambda (Java 11+)',
    text: 'Use var in lambda parameters for annotations',
    setup: 'List<String> items = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "c");',
    expected: ['A', 'B', 'C'],
    sample: 'items.stream().map((var s) -> s.toUpperCase()).collect(Collectors.toList())',
    hints: [
      'var allowed in lambda params (Java 11+)',
      'Enables adding annotations to parameters',
      'All params must use var or none',
    ],
    validPatterns: [/\(\s*var\s+\w+\s*\)\s*->/],
    tags: ['var', 'lambda', 'Java11'],
  },

  // ============================================================
  // String Methods (Java 11-21)
  // ============================================================

  {
    id: 'java-strmethod-300',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String.isBlank (Java 11)',
    text: 'Check if string contains only whitespace',
    setup: 'String str = "   \\t\\n   ";',
    setupCode: 'String str = "   \\t\\n   ";',
    expected: true,
    sample: 'str.isBlank()',
    hints: [
      'isBlank() returns true for whitespace-only (Java 11)',
      'Different from isEmpty() which checks length',
      'Handles tabs, newlines, spaces',
    ],
    validPatterns: [/\.isBlank\(\)/],
    tags: ['String', 'isBlank', 'Java11'],
  },

  {
    id: 'java-strmethod-301',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String.strip (Java 11)',
    text: 'Remove leading and trailing whitespace (Unicode-aware)',
    setup: 'String str = "  Hello World  ";',
    setupCode: 'String str = "  Hello World  ";',
    expected: 'Hello World',
    sample: 'str.strip()',
    hints: [
      'strip() is Unicode-aware (Java 11)',
      'Removes all Unicode whitespace',
      'Preferred over trim() for modern code',
    ],
    validPatterns: [/\.strip\(\)/],
    tags: ['String', 'strip', 'Java11'],
  },

  {
    id: 'java-strmethod-302',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String.stripLeading/stripTrailing',
    text: 'Remove only leading whitespace',
    setup: 'String str = "  Hello  ";',
    setupCode: 'String str = "  Hello  ";',
    expected: 'Hello  ',
    sample: 'str.stripLeading()',
    hints: [
      'stripLeading() removes prefix whitespace',
      'stripTrailing() removes suffix whitespace',
      'Both are Unicode-aware (Java 11)',
    ],
    validPatterns: [/\.stripLeading\(\)|\.stripTrailing\(\)/],
    tags: ['String', 'stripLeading', 'Java11'],
  },

  {
    id: 'java-strmethod-303',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'String.lines (Java 11)',
    text: 'Split string into stream of lines',
    setup: 'String text = "line1\\nline2\\nline3";',
    setupCode: 'String text = "line1\\nline2\\nline3";',
    expected: ['line1', 'line2', 'line3'],
    sample: 'text.lines().collect(Collectors.toList())',
    hints: [
      'lines() returns Stream<String> (Java 11)',
      'Splits on \\n, \\r, or \\r\\n',
      'Lazy evaluation for large strings',
    ],
    validPatterns: [/\.lines\(\)/],
    tags: ['String', 'lines', 'Stream', 'Java11'],
  },

  {
    id: 'java-strmethod-304',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String.repeat (Java 11)',
    text: 'Repeat a string multiple times',
    setup: 'String str = "ab";',
    setupCode: 'String str = "ab";',
    expected: 'ababab',
    sample: 'str.repeat(3)',
    hints: [
      'repeat(n) creates n copies (Java 11)',
      'repeat(0) returns empty string',
      'Useful for padding and patterns',
    ],
    validPatterns: [/\.repeat\(\d+\)/],
    tags: ['String', 'repeat', 'Java11'],
  },

  {
    id: 'java-strmethod-305',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'String.indent (Java 12)',
    text: 'Add indentation to each line',
    setup: 'String text = "line1\\nline2";',
    setupCode: 'String text = "line1\\nline2";',
    expected: '  line1\n  line2\n',
    sample: 'text.indent(2)',
    hints: [
      'indent(n) adds n spaces to each line (Java 12)',
      'Negative n removes spaces',
      'Normalizes line endings and adds trailing newline',
    ],
    validPatterns: [/\.indent\(\d+\)/],
    tags: ['String', 'indent', 'Java12'],
  },

  {
    id: 'java-strmethod-306',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'String.transform (Java 12)',
    text: 'Apply function to string',
    setup: 'String str = "hello";',
    setupCode: 'String str = "hello";',
    expected: 5,
    sample: 'str.transform(String::length)',
    hints: [
      'transform() applies function to string (Java 12)',
      'Returns result of the function',
      'Enables fluent method chaining',
    ],
    validPatterns: [/\.transform\(/],
    tags: ['String', 'transform', 'Java12'],
  },

  {
    id: 'java-strmethod-307',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'String.translateEscapes (Java 15)',
    text: 'Process escape sequences in string',
    setup: 'String str = "Hello\\\\nWorld";',
    setupCode: 'String str = "Hello\\\\nWorld";',
    expected: 'Hello\nWorld',
    sample: 'str.translateEscapes()',
    hints: [
      'translateEscapes() interprets escape sequences (Java 15)',
      'Converts \\n to newline, \\t to tab, etc.',
      'Useful when reading escaped strings from files',
    ],
    validPatterns: [/\.translateEscapes\(\)/],
    tags: ['String', 'translateEscapes', 'Java15'],
  },

  {
    id: 'java-strmethod-308',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'String.formatted (Java 15)',
    text: 'Format string with arguments',
    setup: 'String template = "Hello, %s! You have %d messages.";',
    setupCode: 'String template = "Hello, %s! You have %d messages.";',
    expected: 'Hello, Alice! You have 5 messages.',
    sample: 'template.formatted("Alice", 5)',
    hints: [
      'formatted() is instance method version of format() (Java 15)',
      'Uses same format specifiers: %s, %d, %f, etc.',
      'Enables method chaining',
    ],
    validPatterns: [/\.formatted\(/],
    tags: ['String', 'formatted', 'Java15'],
  },

  {
    id: 'java-strmethod-309',
    category: 'String Methods',
    difficulty: 'hard',
    title: 'String.stripIndent (Java 15)',
    text: 'Remove incidental indentation from text block result',
    setup: 'String text = "    line1\\n    line2\\n    line3";',
    setupCode: 'String text = "    line1\\n    line2\\n    line3";',
    expected: 'line1\nline2\nline3',
    sample: 'text.stripIndent()',
    hints: [
      'stripIndent() removes common leading whitespace (Java 15)',
      'Finds minimum indentation and removes it from all lines',
      'Used internally by text blocks',
    ],
    validPatterns: [/\.stripIndent\(\)/],
    tags: ['String', 'stripIndent', 'Java15'],
  },

  // ============================================================
  // Collection Framework Advanced
  // ============================================================

  {
    id: 'java-coll-300',
    category: 'Collection Framework',
    difficulty: 'easy',
    title: 'List.of Immutable List',
    text: 'Create an immutable list using List.of',
    setup: '// Create immutable list',
    setupCode: '// Create immutable list',
    expected: ['a', 'b', 'c'],
    sample: 'List.of("a", "b", "c")',
    hints: [
      'List.of() creates immutable list (Java 9+)',
      'Cannot add, remove, or modify elements',
      'Null elements not allowed',
    ],
    validPatterns: [/List\.of\(/],
    tags: ['List', 'immutable', 'Java9'],
  },

  {
    id: 'java-coll-301',
    category: 'Collection Framework',
    difficulty: 'easy',
    title: 'Set.of Immutable Set',
    text: 'Create an immutable set',
    setup: '// Create immutable set',
    setupCode: '// Create immutable set',
    expected: true,
    sample: 'Set.of(1, 2, 3).contains(2)',
    hints: [
      'Set.of() creates immutable set (Java 9+)',
      'No duplicates allowed in arguments',
      'Order not guaranteed',
    ],
    validPatterns: [/Set\.of\(/],
    tags: ['Set', 'immutable', 'Java9'],
  },

  {
    id: 'java-coll-302',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Map.of Immutable Map',
    text: 'Create an immutable map with key-value pairs',
    setup: '// Create immutable map',
    setupCode: '// Create immutable map',
    expected: 'value1',
    sample: 'Map.of("key1", "value1", "key2", "value2").get("key1")',
    hints: [
      'Map.of() creates immutable map (Java 9+)',
      'Alternating keys and values',
      'Up to 10 pairs, use Map.ofEntries for more',
    ],
    validPatterns: [/Map\.of\(/],
    tags: ['Map', 'immutable', 'Java9'],
  },

  {
    id: 'java-coll-303',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Map.ofEntries',
    text: 'Create immutable map using entry objects',
    setup: '// Create map with many entries',
    setupCode: '// Create map with many entries',
    expected: 'two',
    sample:
      'Map.ofEntries(\n  Map.entry(1, "one"),\n  Map.entry(2, "two"),\n  Map.entry(3, "three")\n).get(2)',
    hints: [
      'Map.ofEntries() for more than 10 entries',
      'Use Map.entry(k, v) to create entries',
      'Cleaner syntax for large maps',
    ],
    validPatterns: [/Map\.ofEntries\(/, /Map\.entry\(/],
    tags: ['Map', 'ofEntries', 'Java9'],
  },

  {
    id: 'java-coll-304',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'List.copyOf',
    text: 'Create immutable copy of existing list',
    setup: 'List<String> original = new ArrayList<>(Arrays.asList("a", "b", "c"));',
    setupCode: 'List<String> original = new ArrayList<>(Arrays.asList("a", "b", "c"));',
    expected: ['a', 'b', 'c'],
    sample: 'List.copyOf(original)',
    hints: [
      'List.copyOf() creates immutable copy (Java 10+)',
      'Changes to original dont affect copy',
      'Also available: Set.copyOf(), Map.copyOf()',
    ],
    validPatterns: [/List\.copyOf\(/],
    tags: ['List', 'copyOf', 'immutable', 'Java10'],
  },

  {
    id: 'java-coll-305',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Map.getOrDefault',
    text: 'Get value with default if key not present',
    setup: 'Map<String, Integer> map = Map.of("a", 1, "b", 2);',
    setupCode: 'Map<String, Integer> map = Map.of("a", 1, "b", 2);',
    expected: 0,
    sample: 'map.getOrDefault("c", 0)',
    hints: [
      'getOrDefault returns default for missing keys',
      'Avoids null checks',
      'Default is returned, not inserted',
    ],
    validPatterns: [/\.getOrDefault\(/],
    tags: ['Map', 'getOrDefault', 'Java8'],
  },

  {
    id: 'java-coll-306',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Map.computeIfAbsent',
    text: 'Compute and store value if key is absent',
    setup: 'Map<String, List<Integer>> map = new HashMap<>();',
    setupCode: 'Map<String, List<Integer>> map = new HashMap<>();',
    expected: [1],
    sample: 'map.computeIfAbsent("key", k -> new ArrayList<>()).add(1);\nmap.get("key")',
    hints: [
      'computeIfAbsent creates value if missing',
      'Function only called if key absent',
      'Returns existing or newly computed value',
    ],
    validPatterns: [/\.computeIfAbsent\(/],
    tags: ['Map', 'computeIfAbsent', 'Java8'],
  },

  {
    id: 'java-coll-307',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Map.computeIfPresent',
    text: 'Update value only if key exists',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("count", 5);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("count", 5);',
    expected: 10,
    sample: 'map.computeIfPresent("count", (k, v) -> v * 2);\nmap.get("count")',
    hints: [
      'computeIfPresent updates existing values',
      'Function receives key and current value',
      'Returns null to remove the entry',
    ],
    validPatterns: [/\.computeIfPresent\(/],
    tags: ['Map', 'computeIfPresent', 'Java8'],
  },

  {
    id: 'java-coll-308',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Map.merge',
    text: 'Merge value with existing or insert if absent',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("count", 5);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("count", 5);',
    expected: 8,
    sample: 'map.merge("count", 3, Integer::sum);\nmap.get("count")',
    hints: [
      'merge combines with existing value',
      'If key absent, uses provided value directly',
      'BiFunction combines old and new values',
    ],
    validPatterns: [/\.merge\(/],
    tags: ['Map', 'merge', 'Java8'],
  },

  {
    id: 'java-coll-309',
    category: 'Collection Framework',
    difficulty: 'hard',
    title: 'Map.forEach',
    text: 'Iterate over map entries',
    setup: 'Map<String, Integer> map = Map.of("a", 1, "b", 2, "c", 3);',
    setupCode: 'Map<String, Integer> map = Map.of("a", 1, "b", 2, "c", 3);',
    expected: 6,
    sample:
      'AtomicInteger sum = new AtomicInteger();\nmap.forEach((k, v) -> sum.addAndGet(v));\nsum.get()',
    hints: [
      'forEach with BiConsumer for maps',
      'Receives key and value directly',
      'Cleaner than iterating entrySet',
    ],
    validPatterns: [/\.forEach\(\s*\([^,]+,[^)]+\)\s*->/],
    tags: ['Map', 'forEach', 'iteration'],
  },

  {
    id: 'java-coll-310',
    category: 'Collection Framework',
    difficulty: 'hard',
    title: 'Map.replaceAll',
    text: 'Transform all values in map',
    setup: 'Map<String, Integer> map = new HashMap<>();\nmap.put("a", 1);\nmap.put("b", 2);',
    setupCode: 'Map<String, Integer> map = new HashMap<>();\nmap.put("a", 1);\nmap.put("b", 2);',
    expected: { a: 10, b: 20 },
    sample: 'map.replaceAll((k, v) -> v * 10);\nmap',
    hints: [
      'replaceAll transforms all values in place',
      'BiFunction receives key and value',
      'Returns new value for each entry',
    ],
    validPatterns: [/\.replaceAll\(/],
    tags: ['Map', 'replaceAll', 'transformation'],
  },

  // ============================================================
  // File I/O (NIO.2 - Java 7+)
  // ============================================================

  {
    id: 'java-file-300',
    category: 'File I/O',
    difficulty: 'easy',
    title: 'Path.of Creation',
    text: 'Create a Path object for a file',
    setup: '// Create path to file',
    setupCode: '// Create path to file',
    expected: true,
    sample: 'Path path = Path.of("data", "file.txt");\npath.toString().contains("file.txt")',
    hints: [
      'Path.of() creates Path from segments (Java 11+)',
      'Also: Paths.get() for earlier versions',
      'Platform-independent path creation',
    ],
    validPatterns: [/Path\.of\(|Paths\.get\(/],
    tags: ['Path', 'NIO', 'Java11'],
  },

  {
    id: 'java-file-301',
    category: 'File I/O',
    difficulty: 'easy',
    title: 'Files.exists',
    text: 'Check if a path exists',
    setup: 'Path path = Path.of(".");',
    setupCode: 'Path path = Path.of(".");',
    expected: true,
    sample: 'Files.exists(path)',
    hints: [
      'Files.exists() checks path existence',
      'Works for files and directories',
      'Returns false for non-existent paths',
    ],
    validPatterns: [/Files\.exists\(/],
    tags: ['Files', 'exists', 'NIO'],
  },

  {
    id: 'java-file-302',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.readString (Java 11)',
    text: 'Read entire file content as string',
    setup:
      'Path path = Files.createTempFile("test", ".txt");\nFiles.writeString(path, "Hello World");',
    setupCode:
      'Path path = Files.createTempFile("test", ".txt");\nFiles.writeString(path, "Hello World");',
    expected: 'Hello World',
    sample: 'Files.readString(path)',
    hints: [
      'Files.readString() reads entire file (Java 11+)',
      'Uses UTF-8 by default',
      'Throws IOException if file not found',
    ],
    validPatterns: [/Files\.readString\(/],
    tags: ['Files', 'readString', 'Java11'],
  },

  {
    id: 'java-file-303',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.writeString (Java 11)',
    text: 'Write string to file',
    setup: 'Path path = Files.createTempFile("test", ".txt");',
    setupCode: 'Path path = Files.createTempFile("test", ".txt");',
    expected: true,
    sample: 'Files.writeString(path, "Hello");\nFiles.readString(path).equals("Hello")',
    hints: [
      'Files.writeString() writes string to file (Java 11+)',
      'Creates file if not exists',
      'Can specify OpenOptions for append, etc.',
    ],
    validPatterns: [/Files\.writeString\(/],
    tags: ['Files', 'writeString', 'Java11'],
  },

  {
    id: 'java-file-304',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.readAllLines',
    text: 'Read file as list of lines',
    setup:
      'Path path = Files.createTempFile("test", ".txt");\nFiles.writeString(path, "line1\\nline2\\nline3");',
    setupCode:
      'Path path = Files.createTempFile("test", ".txt");\nFiles.writeString(path, "line1\\nline2\\nline3");',
    expected: ['line1', 'line2', 'line3'],
    sample: 'Files.readAllLines(path)',
    hints: [
      'readAllLines() returns List<String>',
      'Each line is a list element',
      'Uses UTF-8 by default',
    ],
    validPatterns: [/Files\.readAllLines\(/],
    tags: ['Files', 'readAllLines', 'NIO'],
  },

  {
    id: 'java-file-305',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.lines Stream',
    text: 'Read file lines as lazy stream',
    setup:
      'Path path = Files.createTempFile("test", ".txt");\nFiles.writeString(path, "a\\nb\\nc");',
    setupCode:
      'Path path = Files.createTempFile("test", ".txt");\nFiles.writeString(path, "a\\nb\\nc");',
    expected: 3,
    sample: 'try (Stream<String> lines = Files.lines(path)) {\n  return lines.count();\n}',
    hints: [
      'Files.lines() returns lazy Stream',
      'Must be closed (use try-with-resources)',
      'Better for large files than readAllLines',
    ],
    validPatterns: [/Files\.lines\(/],
    tags: ['Files', 'lines', 'Stream', 'NIO'],
  },

  {
    id: 'java-file-306',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.list Directory Contents',
    text: 'List files in a directory',
    setup: 'Path dir = Files.createTempDirectory("test");',
    setupCode: 'Path dir = Files.createTempDirectory("test");',
    expected: true,
    sample: 'try (Stream<Path> files = Files.list(dir)) {\n  return files.count() >= 0;\n}',
    hints: [
      'Files.list() returns stream of directory contents',
      'Non-recursive (only immediate children)',
      'Must be closed (returns Stream)',
    ],
    validPatterns: [/Files\.list\(/],
    tags: ['Files', 'list', 'directory', 'NIO'],
  },

  {
    id: 'java-file-307',
    category: 'File I/O',
    difficulty: 'hard',
    title: 'Files.walk Directory Tree',
    text: 'Recursively walk directory tree',
    setup: 'Path dir = Files.createTempDirectory("test");',
    setupCode: 'Path dir = Files.createTempDirectory("test");',
    expected: true,
    sample: 'try (Stream<Path> paths = Files.walk(dir)) {\n  return paths.count() >= 1;\n}',
    hints: [
      'Files.walk() recursively traverses directories',
      'Depth-first traversal',
      'Optional maxDepth parameter',
    ],
    validPatterns: [/Files\.walk\(/],
    tags: ['Files', 'walk', 'recursive', 'NIO'],
  },

  {
    id: 'java-file-308',
    category: 'File I/O',
    difficulty: 'hard',
    title: 'Files.find with Matcher',
    text: 'Find files matching criteria',
    setup: 'Path dir = Files.createTempDirectory("test");',
    setupCode: 'Path dir = Files.createTempDirectory("test");',
    expected: true,
    sample:
      'try (Stream<Path> found = Files.find(dir, 10,\n    (path, attrs) -> attrs.isRegularFile())) {\n  return found.count() >= 0;\n}',
    hints: [
      'Files.find() searches with BiPredicate',
      'Receives Path and BasicFileAttributes',
      'More efficient than walk + filter',
    ],
    validPatterns: [/Files\.find\(/],
    tags: ['Files', 'find', 'search', 'NIO'],
  },

  {
    id: 'java-file-309',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.copy',
    text: 'Copy file to new location',
    setup:
      'Path source = Files.createTempFile("source", ".txt");\nFiles.writeString(source, "content");\nPath target = Path.of(source.getParent().toString(), "target.txt");',
    setupCode:
      'Path source = Files.createTempFile("source", ".txt");\nFiles.writeString(source, "content");\nPath target = Path.of(source.getParent().toString(), "target.txt");',
    expected: true,
    sample: 'Files.copy(source, target);\nFiles.exists(target)',
    hints: [
      'Files.copy() copies file content',
      'Use REPLACE_EXISTING to overwrite',
      'Can copy to OutputStream',
    ],
    validPatterns: [/Files\.copy\(/],
    tags: ['Files', 'copy', 'NIO'],
  },

  {
    id: 'java-file-310',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.move',
    text: 'Move or rename file',
    setup:
      'Path source = Files.createTempFile("source", ".txt");\nPath target = Path.of(source.getParent().toString(), "renamed.txt");',
    setupCode:
      'Path source = Files.createTempFile("source", ".txt");\nPath target = Path.of(source.getParent().toString(), "renamed.txt");',
    expected: true,
    sample: 'Files.move(source, target);\n!Files.exists(source) && Files.exists(target)',
    hints: [
      'Files.move() moves or renames',
      'Atomic if on same filesystem',
      'Use REPLACE_EXISTING if target exists',
    ],
    validPatterns: [/Files\.move\(/],
    tags: ['Files', 'move', 'rename', 'NIO'],
  },

  {
    id: 'java-file-311',
    category: 'File I/O',
    difficulty: 'easy',
    title: 'Path.getFileName',
    text: 'Get file name from path',
    setup: 'Path path = Path.of("/home/user/document.txt");',
    setupCode: 'Path path = Path.of("/home/user/document.txt");',
    expected: 'document.txt',
    sample: 'path.getFileName().toString()',
    hints: [
      'getFileName() returns last path element',
      'Returns Path, convert to String as needed',
      'Returns null for root paths',
    ],
    validPatterns: [/\.getFileName\(\)/],
    tags: ['Path', 'getFileName', 'NIO'],
  },

  {
    id: 'java-file-312',
    category: 'File I/O',
    difficulty: 'easy',
    title: 'Path.getParent',
    text: 'Get parent directory path',
    setup: 'Path path = Path.of("/home/user/document.txt");',
    setupCode: 'Path path = Path.of("/home/user/document.txt");',
    expected: '/home/user',
    sample: 'path.getParent().toString()',
    hints: [
      'getParent() returns parent path',
      'Returns null if no parent',
      'Useful for directory navigation',
    ],
    validPatterns: [/\.getParent\(\)/],
    tags: ['Path', 'getParent', 'NIO'],
  },

  {
    id: 'java-file-313',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Path.resolve',
    text: 'Resolve child path against parent',
    setup: 'Path parent = Path.of("/home/user");',
    setupCode: 'Path parent = Path.of("/home/user");',
    expected: '/home/user/documents/file.txt',
    sample: 'parent.resolve("documents/file.txt").toString()',
    hints: [
      'resolve() combines paths',
      'If argument is absolute, returns argument',
      'Common for building paths',
    ],
    validPatterns: [/\.resolve\(/],
    tags: ['Path', 'resolve', 'NIO'],
  },

  {
    id: 'java-file-314',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Path.relativize',
    text: 'Get relative path between two paths',
    setup: 'Path base = Path.of("/home/user");\nPath target = Path.of("/home/user/docs/file.txt");',
    setupCode:
      'Path base = Path.of("/home/user");\nPath target = Path.of("/home/user/docs/file.txt");',
    expected: 'docs/file.txt',
    sample: 'base.relativize(target).toString()',
    hints: [
      'relativize() computes relative path',
      'Both paths must be same type (absolute or relative)',
      'Opposite of resolve()',
    ],
    validPatterns: [/\.relativize\(/],
    tags: ['Path', 'relativize', 'NIO'],
  },

  // ============================================================
  // Date/Time API (Java 8+)
  // ============================================================

  {
    id: 'java-datetime-300',
    category: 'Date/Time API',
    difficulty: 'easy',
    title: 'LocalDate.now',
    text: 'Get current date',
    setup: "// Get today's date",
    setupCode: "// Get today's date",
    expected: true,
    sample: 'LocalDate today = LocalDate.now();\ntoday.getYear() >= 2024',
    hints: [
      'LocalDate.now() returns current date',
      'No time or timezone information',
      'Immutable and thread-safe',
    ],
    validPatterns: [/LocalDate\.now\(\)/],
    tags: ['LocalDate', 'now', 'Java8'],
  },

  {
    id: 'java-datetime-301',
    category: 'Date/Time API',
    difficulty: 'easy',
    title: 'LocalDate.of',
    text: 'Create specific date',
    setup: '// Create date for January 15, 2024',
    setupCode: '// Create date for January 15, 2024',
    expected: '2024-01-15',
    sample: 'LocalDate.of(2024, 1, 15).toString()',
    hints: [
      'LocalDate.of(year, month, day) creates date',
      'Month can be int (1-12) or Month enum',
      'Throws exception for invalid dates',
    ],
    validPatterns: [/LocalDate\.of\(/],
    tags: ['LocalDate', 'of', 'creation'],
  },

  {
    id: 'java-datetime-302',
    category: 'Date/Time API',
    difficulty: 'easy',
    title: 'LocalDate.parse',
    text: 'Parse date from string',
    setup: 'String dateStr = "2024-06-15";',
    setupCode: 'String dateStr = "2024-06-15";',
    expected: 15,
    sample: 'LocalDate.parse(dateStr).getDayOfMonth()',
    hints: [
      'parse() uses ISO format by default (yyyy-MM-dd)',
      'Use DateTimeFormatter for other formats',
      'Throws DateTimeParseException on invalid input',
    ],
    validPatterns: [/LocalDate\.parse\(/],
    tags: ['LocalDate', 'parse', 'conversion'],
  },

  {
    id: 'java-datetime-303',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'LocalDate.plusDays',
    text: 'Add days to a date',
    setup: 'LocalDate date = LocalDate.of(2024, 1, 28);',
    setupCode: 'LocalDate date = LocalDate.of(2024, 1, 28);',
    expected: '2024-02-02',
    sample: 'date.plusDays(5).toString()',
    hints: [
      'plusDays() returns new date',
      'Original date unchanged (immutable)',
      'Handles month/year rollover',
    ],
    validPatterns: [/\.plusDays\(/],
    tags: ['LocalDate', 'plusDays', 'arithmetic'],
  },

  {
    id: 'java-datetime-304',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'LocalDate.minusMonths',
    text: 'Subtract months from date',
    setup: 'LocalDate date = LocalDate.of(2024, 3, 15);',
    setupCode: 'LocalDate date = LocalDate.of(2024, 3, 15);',
    expected: '2024-01-15',
    sample: 'date.minusMonths(2).toString()',
    hints: [
      'minusMonths() subtracts months',
      'Also: minusDays, minusYears, minusWeeks',
      'Day adjusted if result month has fewer days',
    ],
    validPatterns: [/\.minusMonths\(/],
    tags: ['LocalDate', 'minusMonths', 'arithmetic'],
  },

  {
    id: 'java-datetime-305',
    category: 'Date/Time API',
    difficulty: 'easy',
    title: 'LocalDateTime.now',
    text: 'Get current date and time',
    setup: '// Get current date-time',
    setupCode: '// Get current date-time',
    expected: true,
    sample: 'LocalDateTime now = LocalDateTime.now();\nnow.getHour() >= 0 && now.getHour() <= 23',
    hints: [
      'LocalDateTime includes date and time',
      'No timezone information',
      'Combines LocalDate and LocalTime',
    ],
    validPatterns: [/LocalDateTime\.now\(\)/],
    tags: ['LocalDateTime', 'now', 'Java8'],
  },

  {
    id: 'java-datetime-306',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'LocalDateTime.of',
    text: 'Create specific date-time',
    setup: '// Create date-time for Jan 15, 2024 at 10:30',
    setupCode: '// Create date-time for Jan 15, 2024 at 10:30',
    expected: '2024-01-15T10:30',
    sample: 'LocalDateTime.of(2024, 1, 15, 10, 30).toString()',
    hints: [
      'LocalDateTime.of() creates date-time',
      'Multiple overloads for different precision',
      'Can also use LocalDate.atTime()',
    ],
    validPatterns: [/LocalDateTime\.of\(/],
    tags: ['LocalDateTime', 'of', 'creation'],
  },

  {
    id: 'java-datetime-307',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'Duration.between',
    text: 'Calculate duration between two times',
    setup: 'LocalTime start = LocalTime.of(9, 0);\nLocalTime end = LocalTime.of(17, 30);',
    setupCode: 'LocalTime start = LocalTime.of(9, 0);\nLocalTime end = LocalTime.of(17, 30);',
    expected: 510,
    sample: 'Duration.between(start, end).toMinutes()',
    hints: [
      'Duration measures time-based amount',
      'Works with Temporal objects',
      'Convert to hours, minutes, seconds, etc.',
    ],
    validPatterns: [/Duration\.between\(/],
    tags: ['Duration', 'between', 'calculation'],
  },

  {
    id: 'java-datetime-308',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'Period.between',
    text: 'Calculate period between two dates',
    setup:
      'LocalDate start = LocalDate.of(2024, 1, 1);\nLocalDate end = LocalDate.of(2024, 3, 15);',
    setupCode:
      'LocalDate start = LocalDate.of(2024, 1, 1);\nLocalDate end = LocalDate.of(2024, 3, 15);',
    expected: 2,
    sample: 'Period.between(start, end).getMonths()',
    hints: [
      'Period measures date-based amount',
      'In years, months, days',
      'Use for calendar arithmetic',
    ],
    validPatterns: [/Period\.between\(/],
    tags: ['Period', 'between', 'calculation'],
  },

  {
    id: 'java-datetime-309',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'Duration.ofHours',
    text: 'Create duration of specific hours',
    setup: '// Create 8-hour duration',
    setupCode: '// Create 8-hour duration',
    expected: 480,
    sample: 'Duration.ofHours(8).toMinutes()',
    hints: [
      'Duration.of* factory methods',
      'ofHours, ofMinutes, ofSeconds, ofDays',
      'Immutable value object',
    ],
    validPatterns: [/Duration\.ofHours\(/],
    tags: ['Duration', 'ofHours', 'creation'],
  },

  {
    id: 'java-datetime-310',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'Period.ofMonths',
    text: 'Create period of specific months',
    setup: '// Create 3-month period',
    setupCode: '// Create 3-month period',
    expected: '2024-04-01',
    sample: 'LocalDate.of(2024, 1, 1).plus(Period.ofMonths(3)).toString()',
    hints: [
      'Period.of* factory methods',
      'ofMonths, ofYears, ofDays, ofWeeks',
      'Add to date with plus()',
    ],
    validPatterns: [/Period\.ofMonths\(/],
    tags: ['Period', 'ofMonths', 'creation'],
  },

  {
    id: 'java-datetime-311',
    category: 'Date/Time API',
    difficulty: 'hard',
    title: 'DateTimeFormatter.ofPattern',
    text: 'Format date with custom pattern',
    setup: 'LocalDate date = LocalDate.of(2024, 6, 15);',
    setupCode: 'LocalDate date = LocalDate.of(2024, 6, 15);',
    expected: '15/06/2024',
    sample: 'date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))',
    hints: [
      'ofPattern() creates custom formatter',
      'Common patterns: dd, MM, yyyy, HH, mm, ss',
      'Case-sensitive: MM=month, mm=minute',
    ],
    validPatterns: [/DateTimeFormatter\.ofPattern\(/],
    tags: ['DateTimeFormatter', 'pattern', 'format'],
  },

  {
    id: 'java-datetime-312',
    category: 'Date/Time API',
    difficulty: 'hard',
    title: 'ChronoUnit.between',
    text: 'Calculate days between dates using ChronoUnit',
    setup:
      'LocalDate start = LocalDate.of(2024, 1, 1);\nLocalDate end = LocalDate.of(2024, 12, 31);',
    setupCode:
      'LocalDate start = LocalDate.of(2024, 1, 1);\nLocalDate end = LocalDate.of(2024, 12, 31);',
    expected: 365,
    sample: 'ChronoUnit.DAYS.between(start, end)',
    hints: [
      'ChronoUnit provides unit-specific calculations',
      'DAYS, MONTHS, YEARS, HOURS, etc.',
      'Returns long value',
    ],
    validPatterns: [/ChronoUnit\.\w+\.between\(/],
    tags: ['ChronoUnit', 'between', 'calculation'],
  },

  {
    id: 'java-datetime-313',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'Temporal Adjusters',
    text: 'Get first day of next month',
    setup: 'LocalDate date = LocalDate.of(2024, 6, 15);',
    setupCode: 'LocalDate date = LocalDate.of(2024, 6, 15);',
    expected: '2024-07-01',
    sample: 'date.with(TemporalAdjusters.firstDayOfNextMonth()).toString()',
    hints: [
      'TemporalAdjusters provides common adjustments',
      'firstDayOfMonth, lastDayOfMonth, nextSunday, etc.',
      'Use with() method on temporal',
    ],
    validPatterns: [/TemporalAdjusters\.\w+/],
    tags: ['TemporalAdjusters', 'adjustment', 'Java8'],
  },

  {
    id: 'java-datetime-314',
    category: 'Date/Time API',
    difficulty: 'hard',
    title: 'ZonedDateTime',
    text: 'Create date-time with timezone',
    setup: '// Create date-time in specific timezone',
    setupCode: '// Create date-time in specific timezone',
    expected: true,
    sample:
      'ZonedDateTime zdt = ZonedDateTime.of(2024, 6, 15, 10, 30, 0, 0, ZoneId.of("America/New_York"));\nzdt.getZone().toString().equals("America/New_York")',
    hints: [
      'ZonedDateTime includes timezone',
      'ZoneId represents timezone',
      'Handles DST automatically',
    ],
    validPatterns: [/ZonedDateTime\.of\(/, /ZoneId\.of\(/],
    tags: ['ZonedDateTime', 'timezone', 'Java8'],
  },

  // ============================================================
  // Concurrency (CompletableFuture, ExecutorService)
  // ============================================================

  {
    id: 'java-concur-300',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'CompletableFuture.supplyAsync',
    text: 'Run computation asynchronously',
    setup: '// Async computation returning value',
    setupCode: '// Async computation returning value',
    expected: 'HELLO',
    sample:
      'CompletableFuture.supplyAsync(() -> "hello")\n  .thenApply(String::toUpperCase)\n  .join()',
    hints: [
      'supplyAsync() runs Supplier asynchronously',
      'Uses ForkJoinPool by default',
      'join() waits for result',
    ],
    validPatterns: [/CompletableFuture\.supplyAsync\(/],
    tags: ['CompletableFuture', 'async', 'Java8'],
  },

  {
    id: 'java-concur-301',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'CompletableFuture.runAsync',
    text: 'Run action asynchronously without result',
    setup: 'AtomicBoolean completed = new AtomicBoolean(false);',
    setupCode:
      'java.util.concurrent.atomic.AtomicBoolean completed = new java.util.concurrent.atomic.AtomicBoolean(false);',
    expected: true,
    sample: 'CompletableFuture.runAsync(() -> completed.set(true)).join();\ncompleted.get()',
    hints: [
      'runAsync() runs Runnable asynchronously',
      'No return value (returns Void)',
      'For side-effect only operations',
    ],
    validPatterns: [/CompletableFuture\.runAsync\(/],
    tags: ['CompletableFuture', 'runAsync', 'Java8'],
  },

  {
    id: 'java-concur-302',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'CompletableFuture.thenApply',
    text: 'Transform async result',
    setup: '// Chain transformation on async result',
    setupCode: '// Chain transformation on async result',
    expected: 10,
    sample: 'CompletableFuture.supplyAsync(() -> 5)\n  .thenApply(n -> n * 2)\n  .join()',
    hints: [
      'thenApply() transforms result when ready',
      'Like map() for futures',
      'Runs in same thread as previous stage',
    ],
    validPatterns: [/\.thenApply\(/],
    tags: ['CompletableFuture', 'thenApply', 'transformation'],
  },

  {
    id: 'java-concur-303',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CompletableFuture.thenCompose',
    text: 'Chain dependent async operations',
    setup: '// Chain futures that depend on each other',
    setupCode: '// Chain futures that depend on each other',
    expected: 'HELLO',
    sample:
      'CompletableFuture.supplyAsync(() -> "hello")\n  .thenCompose(s -> CompletableFuture.supplyAsync(() -> s.toUpperCase()))\n  .join()',
    hints: [
      'thenCompose() for dependent futures',
      'Like flatMap() for futures',
      'Avoids nested CompletableFuture',
    ],
    validPatterns: [/\.thenCompose\(/],
    tags: ['CompletableFuture', 'thenCompose', 'chaining'],
  },

  {
    id: 'java-concur-304',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CompletableFuture.thenCombine',
    text: 'Combine results of two independent futures',
    setup: '// Combine two async results',
    setupCode: '// Combine two async results',
    expected: 'HelloWorld',
    sample:
      'CompletableFuture.supplyAsync(() -> "Hello")\n  .thenCombine(\n    CompletableFuture.supplyAsync(() -> "World"),\n    (a, b) -> a + b\n  ).join()',
    hints: [
      'thenCombine() merges two futures',
      'Both run independently in parallel',
      'BiFunction combines results',
    ],
    validPatterns: [/\.thenCombine\(/],
    tags: ['CompletableFuture', 'thenCombine', 'parallel'],
  },

  {
    id: 'java-concur-305',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CompletableFuture.allOf',
    text: 'Wait for all futures to complete',
    setup: '// Wait for multiple futures',
    setupCode: '// Wait for multiple futures',
    expected: true,
    sample:
      'CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "a");\nCompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "b");\nCompletableFuture.allOf(f1, f2).join();\nf1.isDone() && f2.isDone()',
    hints: [
      'allOf() creates future completing when all complete',
      'Returns CompletableFuture<Void>',
      'Get individual results from original futures',
    ],
    validPatterns: [/CompletableFuture\.allOf\(/],
    tags: ['CompletableFuture', 'allOf', 'parallel'],
  },

  {
    id: 'java-concur-306',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CompletableFuture.anyOf',
    text: 'Get first completed future result',
    setup: '// First to complete wins',
    setupCode: '// First to complete wins',
    expected: true,
    sample:
      'CompletableFuture<Object> first = CompletableFuture.anyOf(\n  CompletableFuture.supplyAsync(() -> "fast"),\n  CompletableFuture.supplyAsync(() -> "slow")\n);\nfirst.join() != null',
    hints: [
      'anyOf() returns first completed result',
      'Returns CompletableFuture<Object>',
      'Useful for racing operations',
    ],
    validPatterns: [/CompletableFuture\.anyOf\(/],
    tags: ['CompletableFuture', 'anyOf', 'racing'],
  },

  {
    id: 'java-concur-307',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'CompletableFuture.exceptionally',
    text: 'Handle async exception',
    setup: '// Handle exception in async chain',
    setupCode: '// Handle exception in async chain',
    expected: 'error handled',
    sample:
      'CompletableFuture.supplyAsync(() -> { throw new RuntimeException("error"); })\n  .exceptionally(ex -> "error handled")\n  .join()',
    hints: [
      'exceptionally() handles errors',
      'Receives Throwable, returns fallback',
      'Like catch block for futures',
    ],
    validPatterns: [/\.exceptionally\(/],
    tags: ['CompletableFuture', 'exceptionally', 'error-handling'],
  },

  {
    id: 'java-concur-308',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CompletableFuture.handle',
    text: 'Handle both result and exception',
    setup: '// Handle success or failure',
    setupCode: '// Handle success or failure',
    expected: 'success: 5',
    sample:
      'CompletableFuture.supplyAsync(() -> 5)\n  .handle((result, ex) -> ex != null ? "error" : "success: " + result)\n  .join()',
    hints: [
      'handle() receives result and exception',
      'One will be null',
      'Must return value for both cases',
    ],
    validPatterns: [/\.handle\(/],
    tags: ['CompletableFuture', 'handle', 'error-handling'],
  },

  {
    id: 'java-concur-309',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'ExecutorService.submit',
    text: 'Submit task to executor',
    setup: 'ExecutorService executor = Executors.newFixedThreadPool(2);',
    setupCode:
      'java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newFixedThreadPool(2);',
    expected: 'done',
    sample:
      'Future<String> future = executor.submit(() -> "done");\nString result = future.get();\nexecutor.shutdown();\nresult',
    hints: [
      'submit() returns Future for result',
      'get() blocks until complete',
      'Always shutdown executor when done',
    ],
    validPatterns: [/executor\.submit\(/],
    tags: ['ExecutorService', 'submit', 'Future'],
  },

  {
    id: 'java-concur-310',
    category: 'Concurrency',
    difficulty: 'easy',
    title: 'AtomicInteger.incrementAndGet',
    text: 'Thread-safe increment operation',
    setup: 'AtomicInteger counter = new AtomicInteger(0);',
    setupCode:
      'java.util.concurrent.atomic.AtomicInteger counter = new java.util.concurrent.atomic.AtomicInteger(0);',
    expected: 1,
    sample: 'counter.incrementAndGet()',
    hints: [
      'AtomicInteger provides thread-safe operations',
      'incrementAndGet() returns new value',
      'No synchronization needed',
    ],
    validPatterns: [/\.incrementAndGet\(\)/],
    tags: ['AtomicInteger', 'thread-safe', 'atomic'],
  },

  {
    id: 'java-concur-311',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'AtomicInteger.compareAndSet',
    text: 'Atomic compare-and-swap operation',
    setup: 'AtomicInteger value = new AtomicInteger(5);',
    setupCode:
      'java.util.concurrent.atomic.AtomicInteger value = new java.util.concurrent.atomic.AtomicInteger(5);',
    expected: true,
    sample: 'value.compareAndSet(5, 10)',
    hints: [
      'compareAndSet(expect, update) is atomic',
      'Updates only if current value equals expected',
      'Returns true if successful',
    ],
    validPatterns: [/\.compareAndSet\(/],
    tags: ['AtomicInteger', 'CAS', 'atomic'],
  },

  {
    id: 'java-concur-312',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'AtomicReference',
    text: 'Thread-safe reference update',
    setup: 'AtomicReference<String> ref = new AtomicReference<>("initial");',
    setupCode:
      'java.util.concurrent.atomic.AtomicReference<String> ref = new java.util.concurrent.atomic.AtomicReference<>("initial");',
    expected: 'updated',
    sample: 'ref.set("updated");\nref.get()',
    hints: [
      'AtomicReference for thread-safe object references',
      'get() and set() are atomic',
      'Also has compareAndSet()',
    ],
    validPatterns: [/AtomicReference/, /\.get\(\)|\.set\(/],
    tags: ['AtomicReference', 'thread-safe', 'atomic'],
  },

  {
    id: 'java-concur-313',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CountDownLatch',
    text: 'Wait for multiple threads to complete',
    setup: 'CountDownLatch latch = new CountDownLatch(2);',
    setupCode:
      'java.util.concurrent.CountDownLatch latch = new java.util.concurrent.CountDownLatch(2);',
    expected: 0,
    sample: 'latch.countDown();\nlatch.countDown();\nlatch.getCount()',
    hints: [
      'CountDownLatch waits for count to reach 0',
      'countDown() decrements count',
      'await() blocks until count is 0',
    ],
    validPatterns: [/CountDownLatch/, /\.countDown\(\)/],
    tags: ['CountDownLatch', 'synchronization', 'coordination'],
  },

  // ============================================================
  // Regular Expressions
  // ============================================================

  {
    id: 'java-regex-300',
    category: 'Regular Expressions',
    difficulty: 'easy',
    title: 'Pattern.matches',
    text: 'Check if entire string matches pattern',
    setup: 'String email = "user@example.com";',
    setupCode: 'String email = "user@example.com";',
    expected: true,
    sample: 'Pattern.matches("\\\\w+@\\\\w+\\\\.\\\\w+", email)',
    hints: [
      'Pattern.matches() tests entire string',
      'Must match from start to end',
      'Escape backslashes in Java strings',
    ],
    validPatterns: [/Pattern\.matches\(/],
    tags: ['Pattern', 'matches', 'regex'],
  },

  {
    id: 'java-regex-301',
    category: 'Regular Expressions',
    difficulty: 'easy',
    title: 'String.matches',
    text: 'Check if string matches regex',
    setup: 'String phone = "123-456-7890";',
    setupCode: 'String phone = "123-456-7890";',
    expected: true,
    sample: 'phone.matches("\\\\d{3}-\\\\d{3}-\\\\d{4}")',
    hints: [
      'String.matches() uses regex',
      'Matches entire string',
      '\\d matches digit, {n} repeats n times',
    ],
    validPatterns: [/\.matches\(/],
    tags: ['String', 'matches', 'regex'],
  },

  {
    id: 'java-regex-302',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Pattern.compile and Matcher',
    text: 'Find all matches in string',
    setup: 'String text = "cat bat rat";',
    setupCode: 'String text = "cat bat rat";',
    expected: 3,
    sample:
      'Pattern pattern = Pattern.compile("\\\\w+at");\nMatcher matcher = pattern.matcher(text);\nint count = 0;\nwhile (matcher.find()) count++;\ncount',
    hints: [
      'Pattern.compile() creates reusable pattern',
      'Matcher.find() finds next match',
      'Reuse Pattern for performance',
    ],
    validPatterns: [/Pattern\.compile\(/, /\.matcher\(/, /\.find\(\)/],
    tags: ['Pattern', 'Matcher', 'find', 'regex'],
  },

  {
    id: 'java-regex-303',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Matcher.group',
    text: 'Extract matched text',
    setup: 'String text = "Order #12345 confirmed";',
    setupCode: 'String text = "Order #12345 confirmed";',
    expected: '12345',
    sample:
      'Pattern pattern = Pattern.compile("#(\\\\d+)");\nMatcher matcher = pattern.matcher(text);\nmatcher.find();\nmatcher.group(1)',
    hints: [
      'Parentheses create capture groups',
      'group(0) is entire match',
      'group(1) is first capture group',
    ],
    validPatterns: [/\.group\(/],
    tags: ['Matcher', 'group', 'capture', 'regex'],
  },

  {
    id: 'java-regex-304',
    category: 'Regular Expressions',
    difficulty: 'hard',
    title: 'Named Capture Groups',
    text: 'Use named groups for clarity',
    setup: 'String date = "2024-06-15";',
    setupCode: 'String date = "2024-06-15";',
    expected: '06',
    sample:
      'Pattern pattern = Pattern.compile("(?<year>\\\\d{4})-(?<month>\\\\d{2})-(?<day>\\\\d{2})");\nMatcher matcher = pattern.matcher(date);\nmatcher.find();\nmatcher.group("month")',
    hints: [
      'Named groups: (?<name>pattern)',
      'Access with group("name")',
      'More readable than numbered groups',
    ],
    validPatterns: [/\(\?<\w+>/, /\.group\("\w+"\)/],
    tags: ['Pattern', 'named-group', 'regex'],
  },

  {
    id: 'java-regex-305',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Matcher.replaceAll',
    text: 'Replace all matches with substitution',
    setup: 'String text = "The cat sat on the mat";',
    setupCode: 'String text = "The cat sat on the mat";',
    expected: 'The dog sat on the dog',
    sample: 'text.replaceAll("\\\\b[cm]at\\\\b", "dog")',
    hints: [
      'replaceAll() replaces all matches',
      '\\b is word boundary',
      'Character class [cm] matches c or m',
    ],
    validPatterns: [/\.replaceAll\(/],
    tags: ['String', 'replaceAll', 'regex'],
  },

  {
    id: 'java-regex-306',
    category: 'Regular Expressions',
    difficulty: 'hard',
    title: 'Matcher.replaceAll with Function (Java 9)',
    text: 'Replace matches using function',
    setup: 'String text = "hello world";',
    setupCode: 'String text = "hello world";',
    expected: 'HELLO WORLD',
    sample: 'Pattern.compile("\\\\w+").matcher(text)\n  .replaceAll(m -> m.group().toUpperCase())',
    hints: [
      'replaceAll(Function) available Java 9+',
      'Function receives MatchResult',
      'Return replacement string',
    ],
    validPatterns: [/\.replaceAll\(\s*\w+\s*->/],
    tags: ['Matcher', 'replaceAll', 'Function', 'Java9'],
  },

  {
    id: 'java-regex-307',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Pattern.splitAsStream',
    text: 'Split string into stream',
    setup: 'String csv = "a,b,c,d,e";',
    setupCode: 'String csv = "a,b,c,d,e";',
    expected: ['a', 'b', 'c', 'd', 'e'],
    sample: 'Pattern.compile(",").splitAsStream(csv).collect(Collectors.toList())',
    hints: [
      'splitAsStream() returns Stream',
      'Lazy evaluation',
      'Better for processing split results',
    ],
    validPatterns: [/\.splitAsStream\(/],
    tags: ['Pattern', 'splitAsStream', 'Stream', 'regex'],
  },

  {
    id: 'java-regex-308',
    category: 'Regular Expressions',
    difficulty: 'hard',
    title: 'Matcher.results (Java 9)',
    text: 'Get stream of all match results',
    setup: 'String text = "cat bat rat mat";',
    setupCode: 'String text = "cat bat rat mat";',
    expected: ['cat', 'bat', 'rat', 'mat'],
    sample:
      'Pattern.compile("\\\\w+at").matcher(text)\n  .results()\n  .map(MatchResult::group)\n  .collect(Collectors.toList())',
    hints: [
      'results() returns Stream<MatchResult> (Java 9+)',
      'Stream of all matches',
      'More functional than while/find loop',
    ],
    validPatterns: [/\.results\(\)/],
    tags: ['Matcher', 'results', 'Stream', 'Java9'],
  },

  // ============================================================
  // Virtual Threads (Java 21)
  // ============================================================

  {
    id: 'java-virtual-300',
    category: 'Virtual Threads',
    difficulty: 'easy',
    title: 'Thread.startVirtualThread',
    text: 'Start a virtual thread',
    setup: 'AtomicBoolean completed = new AtomicBoolean(false);',
    setupCode:
      'java.util.concurrent.atomic.AtomicBoolean completed = new java.util.concurrent.atomic.AtomicBoolean(false);',
    expected: true,
    sample: 'Thread.startVirtualThread(() -> completed.set(true)).join();\ncompleted.get()',
    hints: [
      'startVirtualThread() creates and starts virtual thread (Java 21)',
      'Lightweight, millions can run concurrently',
      'Ideal for IO-bound tasks',
    ],
    validPatterns: [/Thread\.startVirtualThread\(/],
    tags: ['VirtualThread', 'Java21', 'concurrency'],
  },

  {
    id: 'java-virtual-301',
    category: 'Virtual Threads',
    difficulty: 'medium',
    title: 'Thread.ofVirtual',
    text: 'Create virtual thread with builder',
    setup: '// Create named virtual thread',
    setupCode: '// Create named virtual thread',
    expected: true,
    sample:
      'Thread vt = Thread.ofVirtual()\n  .name("my-virtual-thread")\n  .start(() -> {});\nvt.isVirtual()',
    hints: [
      'Thread.ofVirtual() returns builder',
      'Configure name, daemon status, etc.',
      'start() or unstarted() to create thread',
    ],
    validPatterns: [/Thread\.ofVirtual\(\)/],
    tags: ['VirtualThread', 'builder', 'Java21'],
  },

  {
    id: 'java-virtual-302',
    category: 'Virtual Threads',
    difficulty: 'medium',
    title: 'Virtual Thread Executor',
    text: 'Create executor using virtual threads',
    setup: '// Execute task on virtual thread',
    setupCode: '// Execute task on virtual thread',
    expected: 'done',
    sample:
      'try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n  Future<String> future = executor.submit(() -> "done");\n  return future.get();\n}',
    hints: [
      'newVirtualThreadPerTaskExecutor() creates virtual thread executor (Java 21)',
      'Each task gets new virtual thread',
      'Automatic resource management with try-with-resources',
    ],
    validPatterns: [/Executors\.newVirtualThreadPerTaskExecutor\(\)/],
    tags: ['VirtualThread', 'Executor', 'Java21'],
  },

  {
    id: 'java-virtual-303',
    category: 'Virtual Threads',
    difficulty: 'hard',
    title: 'Massive Concurrency with Virtual Threads',
    text: 'Run thousands of concurrent tasks',
    setup: 'AtomicInteger counter = new AtomicInteger(0);',
    setupCode:
      'java.util.concurrent.atomic.AtomicInteger counter = new java.util.concurrent.atomic.AtomicInteger(0);',
    expected: 1000,
    sample:
      'try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n  for (int i = 0; i < 1000; i++) {\n    executor.submit(() -> counter.incrementAndGet());\n  }\n}\ncounter.get()',
    hints: [
      'Virtual threads enable massive concurrency',
      'Thousands of threads without resource exhaustion',
      'Ideal for high-throughput servers',
    ],
    validPatterns: [/newVirtualThreadPerTaskExecutor/],
    tags: ['VirtualThread', 'scalability', 'Java21'],
  },

  {
    id: 'java-virtual-304',
    category: 'Virtual Threads',
    difficulty: 'medium',
    title: 'Check if Virtual Thread',
    text: 'Determine if current thread is virtual',
    setup: '// Check thread type',
    setupCode: '// Check thread type',
    expected: false,
    sample: 'Thread.currentThread().isVirtual()',
    hints: [
      'isVirtual() returns true for virtual threads',
      'Main thread is platform thread',
      'Useful for debugging and logging',
    ],
    validPatterns: [/\.isVirtual\(\)/],
    tags: ['VirtualThread', 'isVirtual', 'Java21'],
  },

  // ============================================================
  // More Stream API - Advanced Collectors
  // ============================================================

  {
    id: 'java-stream-321',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collectors.partitioningBy',
    text: 'Partition numbers into even and odd',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);',
    expected: { true: [2, 4, 6], false: [1, 3, 5] },
    sample: 'nums.stream().collect(Collectors.partitioningBy(n -> n % 2 == 0))',
    hints: [
      'partitioningBy divides into two groups',
      'Returns Map<Boolean, List<T>>',
      'true key for matching, false for non-matching',
    ],
    validPatterns: [/Collectors\.partitioningBy\(/],
    tags: ['Stream', 'Collectors', 'partitioning'],
  },

  {
    id: 'java-stream-322',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.groupingBy with Counting',
    text: 'Count occurrences of each word length',
    setup: 'List<String> words = Arrays.asList("a", "bb", "ccc", "dd", "e");',
    setupCode: 'List<String> words = Arrays.asList("a", "bb", "ccc", "dd", "e");',
    expected: { 1: 2, 2: 2, 3: 1 },
    sample: 'words.stream().collect(Collectors.groupingBy(String::length, Collectors.counting()))',
    hints: [
      'groupingBy with downstream collector',
      'Collectors.counting() counts per group',
      'Returns Map<K, Long>',
    ],
    validPatterns: [/Collectors\.groupingBy\(/, /Collectors\.counting\(\)/],
    tags: ['Stream', 'Collectors', 'groupingBy', 'counting'],
  },

  {
    id: 'java-stream-323',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'IntStream.range',
    text: 'Generate range of integers',
    setup: '// Generate 1 to 5',
    setupCode: '// Generate 1 to 5',
    expected: [1, 2, 3, 4, 5],
    sample: 'IntStream.rangeClosed(1, 5).boxed().collect(Collectors.toList())',
    hints: [
      'rangeClosed includes end value',
      'range excludes end value',
      'boxed() converts to Stream<Integer>',
    ],
    validPatterns: [/IntStream\.range/],
    tags: ['IntStream', 'range', 'generation'],
  },

  {
    id: 'java-stream-324',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Stream.iterate',
    text: 'Generate sequence using iterate',
    setup: '// Generate powers of 2',
    setupCode: '// Generate powers of 2',
    expected: [1, 2, 4, 8, 16],
    sample: 'Stream.iterate(1, n -> n * 2).limit(5).collect(Collectors.toList())',
    hints: [
      'iterate(seed, function) generates sequence',
      'Each element derived from previous',
      'Use limit() to bound infinite stream',
    ],
    validPatterns: [/Stream\.iterate\(/],
    tags: ['Stream', 'iterate', 'generation'],
  },

  {
    id: 'java-stream-325',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Stream.generate',
    text: 'Generate stream from supplier',
    setup: 'Random random = new Random(42);',
    setupCode: 'Random random = new Random(42);',
    expected: 5,
    sample: 'Stream.generate(() -> random.nextInt(100)).limit(5).count()',
    hints: [
      'generate(Supplier) creates infinite stream',
      'Each element from supplier call',
      'Must limit or short-circuit',
    ],
    validPatterns: [/Stream\.generate\(/],
    tags: ['Stream', 'generate', 'Supplier'],
  },

  {
    id: 'java-stream-326',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Stream.takeWhile (Java 9)',
    text: 'Take elements while condition is true',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 1, 2);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 1, 2);',
    expected: [1, 2, 3],
    sample: 'nums.stream().takeWhile(n -> n < 4).collect(Collectors.toList())',
    hints: [
      'takeWhile stops at first non-match (Java 9)',
      'Different from filter (stops early)',
      'Order-dependent operation',
    ],
    validPatterns: [/\.takeWhile\(/],
    tags: ['Stream', 'takeWhile', 'Java9'],
  },

  {
    id: 'java-stream-327',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Stream.dropWhile (Java 9)',
    text: 'Drop elements while condition is true',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 1, 2);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 1, 2);',
    expected: [4, 5, 1, 2],
    sample: 'nums.stream().dropWhile(n -> n < 4).collect(Collectors.toList())',
    hints: [
      'dropWhile skips until first non-match (Java 9)',
      'Then includes all remaining elements',
      'Complements takeWhile',
    ],
    validPatterns: [/\.dropWhile\(/],
    tags: ['Stream', 'dropWhile', 'Java9'],
  },

  {
    id: 'java-stream-328',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Stream.ofNullable (Java 9)',
    text: 'Create stream from nullable value',
    setup: 'String value = null;',
    setupCode: 'String value = null;',
    expected: 0,
    sample: 'Stream.ofNullable(value).count()',
    hints: [
      'ofNullable returns empty stream for null (Java 9)',
      'Single-element stream otherwise',
      'Useful in flatMap',
    ],
    validPatterns: [/Stream\.ofNullable\(/],
    tags: ['Stream', 'ofNullable', 'null-safe', 'Java9'],
  },

  {
    id: 'java-stream-329',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.toUnmodifiableList (Java 10)',
    text: 'Collect to immutable list',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3);',
    expected: [1, 2, 3],
    sample: 'nums.stream().collect(Collectors.toUnmodifiableList())',
    hints: [
      'toUnmodifiableList() creates immutable list (Java 10)',
      'Null elements not allowed',
      'Also: toUnmodifiableSet, toUnmodifiableMap',
    ],
    validPatterns: [/Collectors\.toUnmodifiableList\(\)/],
    tags: ['Stream', 'Collectors', 'immutable', 'Java10'],
  },

  {
    id: 'java-stream-330',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Stream.toList (Java 16)',
    text: 'Collect to unmodifiable list directly',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3);',
    expected: [1, 2, 3],
    sample: 'nums.stream().filter(n -> n > 0).toList()',
    hints: [
      'toList() is terminal operation (Java 16)',
      'Returns unmodifiable list',
      'Shorter than collect(Collectors.toList())',
    ],
    validPatterns: [/\.toList\(\)/],
    tags: ['Stream', 'toList', 'Java16'],
  },

  {
    id: 'java-stream-331',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Stream.concat',
    text: 'Concatenate two streams',
    setup: 'List<Integer> list1 = Arrays.asList(1, 2);\nList<Integer> list2 = Arrays.asList(3, 4);',
    setupCode:
      'List<Integer> list1 = Arrays.asList(1, 2);\nList<Integer> list2 = Arrays.asList(3, 4);',
    expected: [1, 2, 3, 4],
    sample: 'Stream.concat(list1.stream(), list2.stream()).collect(Collectors.toList())',
    hints: [
      'Stream.concat() joins two streams',
      'Lazy concatenation',
      'For more streams, use flatMap',
    ],
    validPatterns: [/Stream\.concat\(/],
    tags: ['Stream', 'concat', 'joining'],
  },

  {
    id: 'java-stream-332',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'FlatMap with Optional',
    text: 'Flatten stream of Optionals',
    setup:
      'List<Optional<String>> optionals = Arrays.asList(Optional.of("a"), Optional.empty(), Optional.of("b"));',
    setupCode:
      'List<Optional<String>> optionals = Arrays.asList(Optional.of("a"), Optional.empty(), Optional.of("b"));',
    expected: ['a', 'b'],
    sample: 'optionals.stream().flatMap(Optional::stream).collect(Collectors.toList())',
    hints: [
      'Optional.stream() returns 0 or 1 element stream',
      'flatMap flattens the streams',
      'Empty Optionals contribute nothing',
    ],
    validPatterns: [/\.flatMap\(/, /Optional::stream/],
    tags: ['Stream', 'flatMap', 'Optional'],
  },

  {
    id: 'java-stream-333',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Peek for Debugging',
    text: 'Use peek to observe stream elements',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3);',
    expected: [2, 4, 6],
    sample:
      'nums.stream()\n  .peek(n -> System.out.println("Before: " + n))\n  .map(n -> n * 2)\n  .peek(n -> System.out.println("After: " + n))\n  .collect(Collectors.toList())',
    hints: [
      'peek() performs action without modifying',
      'Useful for debugging stream pipelines',
      'Executes as elements pass through',
    ],
    validPatterns: [/\.peek\(/],
    tags: ['Stream', 'peek', 'debugging'],
  },

  {
    id: 'java-stream-334',
    category: 'Stream API',
    difficulty: 'easy',
    title: 'FindFirst',
    text: 'Find first element matching condition',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: 4,
    sample: 'nums.stream().filter(n -> n > 3).findFirst().orElse(-1)',
    hints: [
      'findFirst() returns Optional',
      'Short-circuits on first match',
      'Use findAny() for parallel streams',
    ],
    validPatterns: [/\.findFirst\(\)/],
    tags: ['Stream', 'findFirst', 'Optional'],
  },

  {
    id: 'java-stream-335',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collectors.mapping',
    text: 'Transform elements in downstream collector',
    setup: 'List<String> words = Arrays.asList("apple", "apricot", "banana", "blueberry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "apricot", "banana", "blueberry");',
    expected: { a: [5, 7], b: [6, 9] },
    sample:
      'words.stream().collect(\n  Collectors.groupingBy(\n    s -> s.charAt(0),\n    Collectors.mapping(String::length, Collectors.toList())\n  )\n)',
    hints: [
      'mapping() transforms before collecting',
      'Use as downstream collector',
      'Maps to different type before aggregation',
    ],
    validPatterns: [/Collectors\.mapping\(/],
    tags: ['Stream', 'Collectors', 'mapping'],
  },

  {
    id: 'java-stream-336',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.filtering (Java 9)',
    text: 'Filter within grouping operation',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
    expected: { even: [6, 8, 10], odd: [7, 9] },
    sample:
      'nums.stream().collect(\n  Collectors.groupingBy(\n    n -> n % 2 == 0 ? "even" : "odd",\n    Collectors.filtering(n -> n > 5, Collectors.toList())\n  )\n)',
    hints: [
      'filtering() filters downstream (Java 9+)',
      'Different from filter() before grouping',
      'Preserves empty groups',
    ],
    validPatterns: [/Collectors\.filtering\(/],
    tags: ['Stream', 'Collectors', 'filtering', 'Java9'],
  },

  {
    id: 'java-stream-337',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.flatMapping (Java 9)',
    text: 'FlatMap within collector',
    setup:
      'record Order(List<String> items) {}\nList<Order> orders = Arrays.asList(\n  new Order(Arrays.asList("A", "B")),\n  new Order(Arrays.asList("C", "D"))\n);',
    setupCode:
      'record Order(List<String> items) {}\nList<Order> orders = Arrays.asList(\n  new Order(Arrays.asList("A", "B")),\n  new Order(Arrays.asList("C", "D"))\n);',
    expected: ['A', 'B', 'C', 'D'],
    sample:
      'orders.stream().collect(\n  Collectors.flatMapping(o -> o.items().stream(), Collectors.toList())\n)',
    hints: [
      'flatMapping() flattens in collector (Java 9+)',
      'Useful in groupingBy downstream',
      'Maps to stream and flattens',
    ],
    validPatterns: [/Collectors\.flatMapping\(/],
    tags: ['Stream', 'Collectors', 'flatMapping', 'Java9'],
  },

  // ============================================================
  // More Optional Methods
  // ============================================================

  {
    id: 'java-opt-312',
    category: 'Optional Methods',
    difficulty: 'easy',
    title: 'Optional.isEmpty (Java 11)',
    text: 'Check if Optional has no value',
    setup: 'Optional<String> opt = Optional.empty();',
    setupCode: 'Optional<String> opt = Optional.empty();',
    expected: true,
    sample: 'opt.isEmpty()',
    hints: [
      'isEmpty() is opposite of isPresent() (Java 11)',
      'More readable for checking absence',
      'Returns true for empty Optional',
    ],
    validPatterns: [/\.isEmpty\(\)/],
    tags: ['Optional', 'isEmpty', 'Java11'],
  },

  {
    id: 'java-opt-313',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Chain Optional Operations',
    text: 'Chain map and filter on Optional',
    setup: 'Optional<String> opt = Optional.of("  Hello  ");',
    setupCode: 'Optional<String> opt = Optional.of("  Hello  ");',
    expected: 'HELLO',
    sample:
      'opt.map(String::trim)\n  .filter(s -> !s.isEmpty())\n  .map(String::toUpperCase)\n  .orElse("")',
    hints: [
      'Chain multiple operations on Optional',
      'Each returns new Optional',
      'Empty at any step propagates',
    ],
    validPatterns: [/\.map\(/, /\.filter\(/],
    tags: ['Optional', 'chaining', 'functional'],
  },

  // ============================================================
  // More Functional Interfaces
  // ============================================================

  {
    id: 'java-func-314',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'IntPredicate',
    text: 'Use primitive predicate for efficiency',
    setup: 'int[] nums = {1, 2, 3, 4, 5, 6};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5, 6};',
    expected: 3,
    sample: 'IntPredicate isEven = n -> n % 2 == 0;\nArrays.stream(nums).filter(isEven).count()',
    hints: [
      'IntPredicate avoids boxing',
      'test(int) method for primitives',
      'Also: LongPredicate, DoublePredicate',
    ],
    validPatterns: [/IntPredicate/],
    tags: ['IntPredicate', 'primitive', 'performance'],
  },

  {
    id: 'java-func-315',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'IntFunction',
    text: 'Use primitive function for efficiency',
    setup: 'int[] nums = {1, 2, 3};',
    setupCode: 'int[] nums = {1, 2, 3};',
    expected: ['1', '2', '3'],
    sample:
      'IntFunction<String> intToStr = String::valueOf;\nArrays.stream(nums).mapToObj(intToStr).collect(Collectors.toList())',
    hints: [
      'IntFunction<R> takes int, returns R',
      'Avoids boxing the int',
      'Also: LongFunction, DoubleFunction',
    ],
    validPatterns: [/IntFunction/],
    tags: ['IntFunction', 'primitive', 'conversion'],
  },

  {
    id: 'java-func-316',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'ToIntFunction',
    text: 'Extract int from object',
    setup: 'List<String> words = Arrays.asList("a", "bb", "ccc");',
    setupCode: 'List<String> words = Arrays.asList("a", "bb", "ccc");',
    expected: 6,
    sample: 'ToIntFunction<String> length = String::length;\nwords.stream().mapToInt(length).sum()',
    hints: [
      'ToIntFunction<T> extracts int from T',
      'applyAsInt() returns primitive int',
      'Used with mapToInt for IntStream',
    ],
    validPatterns: [/ToIntFunction/],
    tags: ['ToIntFunction', 'extraction', 'primitive'],
  },

  {
    id: 'java-func-317',
    category: 'Functional Interfaces',
    difficulty: 'hard',
    title: 'BiConsumer',
    text: 'Consume two arguments',
    setup: 'Map<String, Integer> map = new HashMap<>();',
    setupCode: 'Map<String, Integer> map = new HashMap<>();',
    expected: { a: 1, b: 2 },
    sample:
      'BiConsumer<String, Integer> addEntry = map::put;\naddEntry.accept("a", 1);\naddEntry.accept("b", 2);\nmap',
    hints: [
      'BiConsumer<T, U> consumes two values',
      'No return value',
      'accept(T, U) performs action',
    ],
    validPatterns: [/BiConsumer/, /\.accept\(/],
    tags: ['BiConsumer', 'two-args', 'side-effect'],
  },

  {
    id: 'java-func-318',
    category: 'Functional Interfaces',
    difficulty: 'hard',
    title: 'ObjIntConsumer',
    text: 'Consume object and primitive int',
    setup: 'List<String> result = new ArrayList<>();',
    setupCode: 'List<String> result = new ArrayList<>();',
    expected: ['Item 0', 'Item 1', 'Item 2'],
    sample:
      'ObjIntConsumer<List<String>> addIndexed = (list, i) -> list.add("Item " + i);\nfor (int i = 0; i < 3; i++) addIndexed.accept(result, i);\nresult',
    hints: [
      'ObjIntConsumer<T> takes T and int',
      'Avoids boxing the int',
      'Also: ObjLongConsumer, ObjDoubleConsumer',
    ],
    validPatterns: [/ObjIntConsumer/],
    tags: ['ObjIntConsumer', 'primitive', 'specialized'],
  },

  // ============================================================
  // More Record Classes
  // ============================================================

  {
    id: 'java-record-310',
    category: 'Record Classes',
    difficulty: 'medium',
    title: 'Record with Static Factory',
    text: 'Create records using static factory methods',
    setup: '// Point with factory methods',
    setupCode: '// Point with factory methods',
    expected: true,
    sample:
      'record Point(double x, double y) {\n  static Point origin() { return new Point(0, 0); }\n  static Point of(double x, double y) { return new Point(x, y); }\n}\nPoint.origin().x() == 0',
    hints: [
      'Static factory methods provide named creation',
      'Can have multiple factories',
      'Origin pattern common for coordinates',
    ],
    validPatterns: [/record\s+\w+/, /static\s+\w+\s+\w+\s*\(/],
    tags: ['record', 'factory', 'static'],
  },

  {
    id: 'java-record-311',
    category: 'Record Classes',
    difficulty: 'hard',
    title: 'Record with Derived Component',
    text: 'Calculate derived value from record components',
    setup: '// Rectangle with area method',
    setupCode: '// Rectangle with area method',
    expected: 50,
    sample:
      'record Rectangle(int width, int height) {\n  int area() { return width * height; }\n}\nnew Rectangle(5, 10).area()',
    hints: [
      'Derived values computed from components',
      'Not stored, calculated on access',
      'Common for computed properties',
    ],
    validPatterns: [/record\s+\w+/, /\w+\s+\w+\s*\(\s*\)\s*\{/],
    tags: ['record', 'derived', 'calculation'],
  },

  {
    id: 'java-record-312',
    category: 'Record Classes',
    difficulty: 'medium',
    title: 'Record as Map Key',
    text: 'Use record as HashMap key',
    setup: 'record Point(int x, int y) {}\nMap<Point, String> labels = new HashMap<>();',
    setupCode: 'record Point(int x, int y) {}\nMap<Point, String> labels = new HashMap<>();',
    expected: 'origin',
    sample: 'labels.put(new Point(0, 0), "origin");\nlabels.get(new Point(0, 0))',
    hints: [
      'Records have automatic equals and hashCode',
      'Safe to use as Map keys',
      'Two records with same values are equal',
    ],
    validPatterns: [/record\s+\w+/, /\.put\(/, /\.get\(/],
    tags: ['record', 'Map', 'equals', 'hashCode'],
  },

  // ============================================================
  // More Sealed Classes
  // ============================================================

  {
    id: 'java-sealed-304',
    category: 'Sealed Classes',
    difficulty: 'hard',
    title: 'Exhaustive Switch with Sealed',
    text: 'Pattern match on sealed type hierarchy',
    setup:
      'sealed interface Expr permits Num, Add {}\nrecord Num(int value) implements Expr {}\nrecord Add(Expr left, Expr right) implements Expr {}',
    setupCode:
      'sealed interface Expr permits Num, Add {}\nrecord Num(int value) implements Expr {}\nrecord Add(Expr left, Expr right) implements Expr {}',
    expected: 3,
    sample:
      'Expr expr = new Add(new Num(1), new Num(2));\nint eval(Expr e) {\n  return switch (e) {\n    case Num n -> n.value();\n    case Add a -> eval(a.left()) + eval(a.right());\n  };\n}\neval(expr)',
    hints: [
      'Sealed types enable exhaustive switch',
      'No default case needed',
      'Compiler verifies all cases covered',
    ],
    validPatterns: [/sealed\s+interface/, /switch\s*\(/],
    tags: ['sealed', 'switch', 'exhaustive', 'Java21'],
  },

  {
    id: 'java-sealed-305',
    category: 'Sealed Classes',
    difficulty: 'medium',
    title: 'Sealed Class with Abstract Method',
    text: 'Define abstract method in sealed class',
    setup: '// Shape with abstract area method',
    setupCode: '// Shape with abstract area method',
    expected: true,
    sample:
      'sealed abstract class Shape permits Circle, Square {\n  abstract double area();\n}\nfinal class Circle extends Shape {\n  private double radius;\n  Circle(double r) { this.radius = r; }\n  double area() { return Math.PI * radius * radius; }\n}\nfinal class Square extends Shape {\n  private double side;\n  Square(double s) { this.side = s; }\n  double area() { return side * side; }\n}\nnew Circle(1).area() > 3',
    hints: [
      'Sealed abstract class can have abstract methods',
      'Each subclass must implement',
      'Combines inheritance with restricted hierarchy',
    ],
    validPatterns: [/sealed\s+abstract\s+class/, /abstract\s+\w+\s+\w+\s*\(/],
    tags: ['sealed', 'abstract', 'polymorphism'],
  },

  // ============================================================
  // More Pattern Matching
  // ============================================================

  {
    id: 'java-pattern-307',
    category: 'Pattern Matching',
    difficulty: 'hard',
    title: 'Nested Record Patterns',
    text: 'Deconstruct nested records',
    setup:
      'record Point(int x, int y) {}\nrecord Line(Point start, Point end) {}\nObject obj = new Line(new Point(0, 0), new Point(10, 10));',
    setupCode:
      'record Point(int x, int y) {}\nrecord Line(Point start, Point end) {}\nObject obj = new Line(new Point(0, 0), new Point(10, 10));',
    expected: 20,
    sample:
      'int sum = switch (obj) {\n  case Line(Point(int x1, int y1), Point(int x2, int y2)) -> x1 + y1 + x2 + y2;\n  default -> 0;\n};\nsum',
    hints: [
      'Nested patterns deconstruct deeply (Java 21)',
      'Extract values from nested records',
      'Very powerful for complex data',
    ],
    validPatterns: [/case\s+\w+\s*\([^)]+\([^)]+\)/],
    tags: ['pattern', 'nested', 'record', 'Java21'],
  },

  {
    id: 'java-pattern-308',
    category: 'Pattern Matching',
    difficulty: 'medium',
    title: 'Pattern in if Statement',
    text: 'Use pattern matching in if condition',
    setup: 'Object obj = "Hello";',
    setupCode: 'Object obj = "Hello";',
    expected: 'String of length 5',
    sample:
      'String result;\nif (obj instanceof String s && s.length() > 3) {\n  result = "String of length " + s.length();\n} else {\n  result = "Not a long string";\n}\nresult',
    hints: [
      'Pattern variable usable in same condition',
      'Short-circuit with &&',
      's only in scope if instanceof succeeds',
    ],
    validPatterns: [/instanceof\s+\w+\s+\w+\s*&&/],
    tags: ['pattern', 'instanceof', 'condition'],
  },

  {
    id: 'java-pattern-309',
    category: 'Pattern Matching',
    difficulty: 'hard',
    title: 'Switch Expression with Multiple Patterns',
    text: 'Handle multiple types in switch',
    setup: 'Object[] values = {42, "hello", 3.14, true};',
    setupCode: 'Object[] values = {42, "hello", 3.14, true};',
    expected: ['int: 42', 'string: hello', 'double: 3.14', 'other'],
    sample:
      'Arrays.stream(values).map(v -> switch (v) {\n  case Integer i -> "int: " + i;\n  case String s -> "string: " + s;\n  case Double d -> "double: " + d;\n  default -> "other";\n}).collect(Collectors.toList())',
    hints: [
      'Switch handles multiple types',
      'Order matters for overlapping types',
      'default catches unmatched types',
    ],
    validPatterns: [/switch\s*\(\w+\)\s*\{/, /case\s+\w+\s+\w+\s*->/],
    tags: ['switch', 'pattern', 'polymorphism', 'Java21'],
  },

  // ============================================================
  // More Text Blocks
  // ============================================================

  {
    id: 'java-textblock-305',
    category: 'Text Blocks',
    difficulty: 'medium',
    title: 'Text Block for HTML',
    text: 'Create HTML template using text block',
    setup: 'String title = "Welcome";',
    setupCode: 'String title = "Welcome";',
    expected: true,
    sample:
      'String html = """\n    <html>\n      <body>\n        <h1>%s</h1>\n      </body>\n    </html>\n    """.formatted(title);\nhtml.contains("<h1>Welcome</h1>")',
    hints: [
      'Text blocks perfect for HTML templates',
      'Combine with formatted() for dynamic content',
      'Preserves structure while allowing substitution',
    ],
    validPatterns: [/"""/, /\.formatted\(/],
    tags: ['text-block', 'HTML', 'template'],
  },

  {
    id: 'java-textblock-306',
    category: 'Text Blocks',
    difficulty: 'medium',
    title: 'Text Block Indentation Control',
    text: 'Control indentation with closing quotes',
    setup: '// Closing quotes position controls indentation',
    setupCode: '// Closing quotes position controls indentation',
    expected: '  line1\n  line2',
    sample: 'String text = """\n      line1\n      line2\n    """;\ntext',
    hints: [
      'Closing quotes position is baseline',
      'Characters before baseline become indent',
      'Move closing quotes to control output indent',
    ],
    validPatterns: [/"""/],
    tags: ['text-block', 'indentation', 'Java15'],
  },

  // ============================================================
  // More var Keyword
  // ============================================================

  {
    id: 'java-var-305',
    category: 'var Keyword',
    difficulty: 'medium',
    title: 'var with Anonymous Class',
    text: 'Use var with anonymous class extending object',
    setup: '// Anonymous class with additional method',
    setupCode: '// Anonymous class with additional method',
    expected: 'Hello',
    sample: 'var obj = new Object() {\n  String message() { return "Hello"; }\n};\nobj.message()',
    hints: [
      'var captures anonymous class type',
      'Can access methods not in Object',
      'Only way to call extra methods',
    ],
    validPatterns: [/var\s+\w+\s*=\s*new\s+Object\s*\(\)/],
    tags: ['var', 'anonymous', 'Java10'],
  },

  {
    id: 'java-var-306',
    category: 'var Keyword',
    difficulty: 'easy',
    title: 'var with Streams',
    text: 'Use var to hold stream result',
    setup: 'List<String> items = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "c");',
    expected: 3,
    sample: 'var stream = items.stream();\nvar count = stream.count();\ncount',
    hints: [
      'var infers Stream<String> and long',
      'Reduces verbosity with generics',
      'Type still known at compile time',
    ],
    validPatterns: [/var\s+\w+\s*=.*\.stream\(\)/],
    tags: ['var', 'Stream', 'Java10'],
  },

  // ============================================================
  // More String Methods
  // ============================================================

  {
    id: 'java-strmethod-310',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String.chars Stream',
    text: 'Get stream of character codes',
    setup: 'String str = "abc";',
    setupCode: 'String str = "abc";',
    expected: [97, 98, 99],
    sample: 'str.chars().boxed().collect(Collectors.toList())',
    hints: [
      'chars() returns IntStream of code points',
      'Each element is character code',
      'boxed() converts to Stream<Integer>',
    ],
    validPatterns: [/\.chars\(\)/],
    tags: ['String', 'chars', 'IntStream'],
  },

  {
    id: 'java-strmethod-311',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'String.codePoints',
    text: 'Get stream of Unicode code points',
    setup: 'String str = "Hello";',
    setupCode: 'String str = "Hello";',
    expected: 5,
    sample: 'str.codePoints().count()',
    hints: [
      'codePoints() handles Unicode properly',
      'Better than chars() for emojis/symbols',
      'Returns IntStream',
    ],
    validPatterns: [/\.codePoints\(\)/],
    tags: ['String', 'codePoints', 'Unicode'],
  },

  {
    id: 'java-strmethod-312',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'String.toCharArray',
    text: 'Convert string to char array',
    setup: 'String str = "hello";',
    setupCode: 'String str = "hello";',
    expected: ['h', 'e', 'l', 'l', 'o'],
    sample: 'char[] chars = str.toCharArray();\nArrays.toString(chars)',
    hints: [
      'toCharArray() creates new array',
      'Modifications do not affect string',
      'Useful for character manipulation',
    ],
    validPatterns: [/\.toCharArray\(\)/],
    tags: ['String', 'toCharArray', 'conversion'],
  },

  {
    id: 'java-strmethod-313',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'String.join',
    text: 'Join strings with delimiter',
    setup: 'List<String> parts = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> parts = Arrays.asList("a", "b", "c");',
    expected: 'a-b-c',
    sample: 'String.join("-", parts)',
    hints: [
      'String.join() concatenates with delimiter',
      'Works with Iterable or varargs',
      'Static method on String class',
    ],
    validPatterns: [/String\.join\(/],
    tags: ['String', 'join', 'concatenation'],
  },

  {
    id: 'java-strmethod-314',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'String.format',
    text: 'Format string with placeholders',
    setup: 'String name = "Alice";\nint score = 95;',
    setupCode: 'String name = "Alice";\nint score = 95;',
    expected: 'Alice scored 95 points',
    sample: 'String.format("%s scored %d points", name, score)',
    hints: [
      '%s for strings, %d for integers',
      '%f for floats, %n for newline',
      'Also: %.2f for 2 decimal places',
    ],
    validPatterns: [/String\.format\(/],
    tags: ['String', 'format', 'printf'],
  },

  // ============================================================
  // More Collection Framework
  // ============================================================

  {
    id: 'java-coll-311',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'LinkedHashMap Ordered Map',
    text: 'Create map that maintains insertion order',
    setup: 'Map<String, Integer> map = new LinkedHashMap<>();',
    setupCode: 'Map<String, Integer> map = new LinkedHashMap<>();',
    expected: ['c', 'a', 'b'],
    sample: 'map.put("c", 3);\nmap.put("a", 1);\nmap.put("b", 2);\nnew ArrayList<>(map.keySet())',
    hints: [
      'LinkedHashMap maintains insertion order',
      'Iteration order is predictable',
      'Slightly slower than HashMap',
    ],
    validPatterns: [/LinkedHashMap/],
    tags: ['LinkedHashMap', 'ordered', 'Map'],
  },

  {
    id: 'java-coll-312',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'TreeMap Sorted Map',
    text: 'Create map sorted by keys',
    setup: 'Map<String, Integer> map = new TreeMap<>();',
    setupCode: 'Map<String, Integer> map = new TreeMap<>();',
    expected: ['a', 'b', 'c'],
    sample: 'map.put("c", 3);\nmap.put("a", 1);\nmap.put("b", 2);\nnew ArrayList<>(map.keySet())',
    hints: ['TreeMap sorts by keys', 'Natural ordering or Comparator', 'O(log n) operations'],
    validPatterns: [/TreeMap/],
    tags: ['TreeMap', 'sorted', 'Map'],
  },

  {
    id: 'java-coll-313',
    category: 'Collection Framework',
    difficulty: 'hard',
    title: 'NavigableMap Operations',
    text: 'Use NavigableMap methods for range queries',
    setup:
      'NavigableMap<Integer, String> map = new TreeMap<>();\nmap.put(1, "a"); map.put(3, "c"); map.put(5, "e"); map.put(7, "g");',
    setupCode:
      'NavigableMap<Integer, String> map = new TreeMap<>();\nmap.put(1, "a"); map.put(3, "c"); map.put(5, "e"); map.put(7, "g");',
    expected: 'c',
    sample: 'map.floorEntry(4).getValue()',
    hints: [
      'floorEntry finds largest key <= given',
      'ceilingEntry finds smallest key >= given',
      'subMap for range views',
    ],
    validPatterns: [/\.floorEntry\(|\.ceilingEntry\(/],
    tags: ['NavigableMap', 'TreeMap', 'range'],
  },

  {
    id: 'java-coll-314',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'ArrayDeque as Stack',
    text: 'Use ArrayDeque as a stack',
    setup: 'Deque<String> stack = new ArrayDeque<>();',
    setupCode: 'Deque<String> stack = new ArrayDeque<>();',
    expected: 'c',
    sample: 'stack.push("a");\nstack.push("b");\nstack.push("c");\nstack.pop()',
    hints: [
      'ArrayDeque faster than Stack class',
      'push() adds to front',
      'pop() removes from front (LIFO)',
    ],
    validPatterns: [/ArrayDeque/, /\.push\(/, /\.pop\(\)/],
    tags: ['ArrayDeque', 'Stack', 'Deque'],
  },

  {
    id: 'java-coll-315',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'ArrayDeque as Queue',
    text: 'Use ArrayDeque as a queue',
    setup: 'Deque<String> queue = new ArrayDeque<>();',
    setupCode: 'Deque<String> queue = new ArrayDeque<>();',
    expected: 'a',
    sample: 'queue.offer("a");\nqueue.offer("b");\nqueue.offer("c");\nqueue.poll()',
    hints: [
      'ArrayDeque also works as queue',
      'offer() adds to end',
      'poll() removes from front (FIFO)',
    ],
    validPatterns: [/ArrayDeque/, /\.offer\(/, /\.poll\(\)/],
    tags: ['ArrayDeque', 'Queue', 'Deque'],
  },

  {
    id: 'java-coll-316',
    category: 'Collection Framework',
    difficulty: 'hard',
    title: 'PriorityQueue',
    text: 'Use PriorityQueue for ordered processing',
    setup: 'PriorityQueue<Integer> pq = new PriorityQueue<>();',
    setupCode: 'PriorityQueue<Integer> pq = new PriorityQueue<>();',
    expected: 1,
    sample: 'pq.offer(5);\npq.offer(1);\npq.offer(3);\npq.poll()',
    hints: [
      'PriorityQueue orders by priority',
      'poll() returns smallest (natural order)',
      'Use Comparator for custom order',
    ],
    validPatterns: [/PriorityQueue/, /\.poll\(\)/],
    tags: ['PriorityQueue', 'heap', 'ordering'],
  },

  {
    id: 'java-coll-317',
    category: 'Collection Framework',
    difficulty: 'hard',
    title: 'Max PriorityQueue',
    text: 'Create max heap with PriorityQueue',
    setup: 'PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());',
    setupCode: 'PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());',
    expected: 5,
    sample: 'maxHeap.offer(1);\nmaxHeap.offer(5);\nmaxHeap.offer(3);\nmaxHeap.poll()',
    hints: [
      'reverseOrder() for max heap behavior',
      'poll() now returns largest',
      'Useful for top-K problems',
    ],
    validPatterns: [/PriorityQueue.*reverseOrder/],
    tags: ['PriorityQueue', 'heap', 'max'],
  },

  {
    id: 'java-coll-318',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'EnumSet',
    text: 'Create efficient set of enum values',
    setup: 'enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }',
    setupCode: 'enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }',
    expected: true,
    sample: 'EnumSet<Day> weekend = EnumSet.of(Day.SAT, Day.SUN);\nweekend.contains(Day.SAT)',
    hints: [
      'EnumSet is optimized for enums',
      'Bit vector implementation',
      'Much faster than HashSet for enums',
    ],
    validPatterns: [/EnumSet\.of\(/],
    tags: ['EnumSet', 'enum', 'Set'],
  },

  {
    id: 'java-coll-319',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'EnumMap',
    text: 'Create efficient map with enum keys',
    setup: 'enum Color { RED, GREEN, BLUE }',
    setupCode: 'enum Color { RED, GREEN, BLUE }',
    expected: '#FF0000',
    sample:
      'EnumMap<Color, String> colors = new EnumMap<>(Color.class);\ncolors.put(Color.RED, "#FF0000");\ncolors.get(Color.RED)',
    hints: [
      'EnumMap is optimized for enum keys',
      'Array-based implementation',
      'Faster than HashMap for enum keys',
    ],
    validPatterns: [/EnumMap/],
    tags: ['EnumMap', 'enum', 'Map'],
  },

  {
    id: 'java-coll-320',
    category: 'Collection Framework',
    difficulty: 'hard',
    title: 'ConcurrentHashMap',
    text: 'Use thread-safe map',
    setup: 'ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();',
    setupCode: 'ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();',
    expected: 1,
    sample: 'map.put("count", 0);\nmap.compute("count", (k, v) -> v + 1);\nmap.get("count")',
    hints: [
      'ConcurrentHashMap is thread-safe',
      'No external synchronization needed',
      'compute() is atomic',
    ],
    validPatterns: [/ConcurrentHashMap/, /\.compute\(/],
    tags: ['ConcurrentHashMap', 'concurrent', 'thread-safe'],
  },

  // ============================================================
  // More Date/Time API
  // ============================================================

  {
    id: 'java-datetime-315',
    category: 'Date/Time API',
    difficulty: 'easy',
    title: 'LocalTime.now',
    text: 'Get current time',
    setup: '// Get current time',
    setupCode: '// Get current time',
    expected: true,
    sample: 'LocalTime now = LocalTime.now();\nnow.getMinute() >= 0',
    hints: [
      'LocalTime represents time without date',
      'Hour, minute, second, nanosecond',
      'No timezone information',
    ],
    validPatterns: [/LocalTime\.now\(\)/],
    tags: ['LocalTime', 'now', 'Java8'],
  },

  {
    id: 'java-datetime-316',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'Instant.now',
    text: 'Get current instant (timestamp)',
    setup: '// Get current instant',
    setupCode: '// Get current instant',
    expected: true,
    sample: 'Instant instant = Instant.now();\ninstant.toEpochMilli() > 0',
    hints: ['Instant represents point in time', 'UTC based, no timezone', 'Useful for timestamps'],
    validPatterns: [/Instant\.now\(\)/],
    tags: ['Instant', 'timestamp', 'Java8'],
  },

  {
    id: 'java-datetime-317',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'Convert Instant to LocalDateTime',
    text: 'Convert Instant to LocalDateTime with timezone',
    setup: 'Instant instant = Instant.parse("2024-06-15T10:30:00Z");',
    setupCode: 'Instant instant = Instant.parse("2024-06-15T10:30:00Z");',
    expected: true,
    sample:
      'LocalDateTime ldt = LocalDateTime.ofInstant(instant, ZoneId.of("UTC"));\nldt.getHour() == 10',
    hints: [
      'Instant needs timezone for LocalDateTime',
      'ofInstant() converts with ZoneId',
      'Time adjusts for timezone',
    ],
    validPatterns: [/LocalDateTime\.ofInstant\(/],
    tags: ['Instant', 'LocalDateTime', 'conversion'],
  },

  {
    id: 'java-datetime-318',
    category: 'Date/Time API',
    difficulty: 'hard',
    title: 'Date Comparison',
    text: 'Compare two dates',
    setup:
      'LocalDate date1 = LocalDate.of(2024, 1, 15);\nLocalDate date2 = LocalDate.of(2024, 6, 15);',
    setupCode:
      'LocalDate date1 = LocalDate.of(2024, 1, 15);\nLocalDate date2 = LocalDate.of(2024, 6, 15);',
    expected: true,
    sample: 'date1.isBefore(date2) && date2.isAfter(date1)',
    hints: [
      'isBefore() and isAfter() for comparison',
      'Also: isEqual() for equality',
      'compareTo() returns int',
    ],
    validPatterns: [/\.isBefore\(|\.isAfter\(/],
    tags: ['LocalDate', 'comparison', 'Java8'],
  },

  {
    id: 'java-datetime-319',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'DayOfWeek',
    text: 'Get day of week from date',
    setup: 'LocalDate date = LocalDate.of(2024, 1, 1);',
    setupCode: 'LocalDate date = LocalDate.of(2024, 1, 1);',
    expected: 'MONDAY',
    sample: 'date.getDayOfWeek().toString()',
    hints: [
      'getDayOfWeek() returns DayOfWeek enum',
      'Values: MONDAY through SUNDAY',
      'getValue() returns 1-7',
    ],
    validPatterns: [/\.getDayOfWeek\(\)/],
    tags: ['LocalDate', 'DayOfWeek', 'enum'],
  },

  {
    id: 'java-datetime-320',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'Month Operations',
    text: 'Get month information from date',
    setup: 'LocalDate date = LocalDate.of(2024, 2, 15);',
    setupCode: 'LocalDate date = LocalDate.of(2024, 2, 15);',
    expected: 29,
    sample: 'date.getMonth().length(date.isLeapYear())',
    hints: [
      'getMonth() returns Month enum',
      'length(leapYear) returns days in month',
      'isLeapYear() checks for leap year',
    ],
    validPatterns: [/\.getMonth\(\)/, /\.length\(/],
    tags: ['LocalDate', 'Month', 'leap-year'],
  },

  // ============================================================
  // More Concurrency
  // ============================================================

  {
    id: 'java-concur-314',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'Semaphore',
    text: 'Limit concurrent access with semaphore',
    setup: 'Semaphore semaphore = new Semaphore(2);',
    setupCode: 'java.util.concurrent.Semaphore semaphore = new java.util.concurrent.Semaphore(2);',
    expected: 0,
    sample: 'semaphore.acquire();\nsemaphore.acquire();\nsemaphore.availablePermits()',
    hints: [
      'Semaphore limits concurrent access',
      'acquire() gets permit, blocks if none',
      'release() returns permit',
    ],
    validPatterns: [/Semaphore/, /\.acquire\(\)/],
    tags: ['Semaphore', 'concurrency', 'limiting'],
  },

  {
    id: 'java-concur-315',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CyclicBarrier',
    text: 'Synchronize threads at barrier point',
    setup: 'CyclicBarrier barrier = new CyclicBarrier(3);',
    setupCode:
      'java.util.concurrent.CyclicBarrier barrier = new java.util.concurrent.CyclicBarrier(3);',
    expected: 3,
    sample: 'barrier.getParties()',
    hints: [
      'CyclicBarrier waits for N threads',
      'await() blocks until all arrive',
      'Can be reused (cyclic)',
    ],
    validPatterns: [/CyclicBarrier/],
    tags: ['CyclicBarrier', 'synchronization', 'barrier'],
  },

  {
    id: 'java-concur-316',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'ReentrantLock',
    text: 'Use explicit lock for synchronization',
    setup: 'ReentrantLock lock = new ReentrantLock();',
    setupCode:
      'java.util.concurrent.locks.ReentrantLock lock = new java.util.concurrent.locks.ReentrantLock();',
    expected: true,
    sample:
      'lock.lock();\ntry {\n  return lock.isHeldByCurrentThread();\n} finally {\n  lock.unlock();\n}',
    hints: [
      'ReentrantLock is explicit lock',
      'Must unlock in finally block',
      'More flexible than synchronized',
    ],
    validPatterns: [/ReentrantLock/, /\.lock\(\)/, /\.unlock\(\)/],
    tags: ['ReentrantLock', 'lock', 'synchronization'],
  },

  {
    id: 'java-concur-317',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'ReadWriteLock',
    text: 'Use read-write lock for better concurrency',
    setup: 'ReadWriteLock rwLock = new ReentrantReadWriteLock();',
    setupCode:
      'java.util.concurrent.locks.ReadWriteLock rwLock = new java.util.concurrent.locks.ReentrantReadWriteLock();',
    expected: true,
    sample:
      'rwLock.readLock().lock();\ntry {\n  return true;\n} finally {\n  rwLock.readLock().unlock();\n}',
    hints: [
      'Multiple readers, single writer',
      'readLock() for read access',
      'writeLock() for write access',
    ],
    validPatterns: [/ReadWriteLock/, /\.readLock\(\)|\.writeLock\(\)/],
    tags: ['ReadWriteLock', 'concurrency', 'lock'],
  },

  {
    id: 'java-concur-318',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'AtomicLong',
    text: 'Thread-safe long operations',
    setup: 'AtomicLong counter = new AtomicLong(0);',
    setupCode:
      'java.util.concurrent.atomic.AtomicLong counter = new java.util.concurrent.atomic.AtomicLong(0);',
    expected: 100,
    sample: 'counter.addAndGet(100)',
    hints: [
      'AtomicLong for thread-safe long',
      'addAndGet() adds and returns new value',
      'getAndAdd() returns old value then adds',
    ],
    validPatterns: [/AtomicLong/, /\.addAndGet\(/],
    tags: ['AtomicLong', 'atomic', 'thread-safe'],
  },

  {
    id: 'java-concur-319',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'LongAdder for High Contention',
    text: 'Use LongAdder for better scalability',
    setup: 'LongAdder adder = new LongAdder();',
    setupCode:
      'java.util.concurrent.atomic.LongAdder adder = new java.util.concurrent.atomic.LongAdder();',
    expected: 10,
    sample: 'for (int i = 0; i < 10; i++) adder.increment();\nadder.sum()',
    hints: [
      'LongAdder scales better than AtomicLong',
      'Uses striped cells internally',
      'sum() reads current total',
    ],
    validPatterns: [/LongAdder/, /\.increment\(\)|\.sum\(\)/],
    tags: ['LongAdder', 'atomic', 'scalability'],
  },

  // ============================================================
  // More Regular Expressions
  // ============================================================

  {
    id: 'java-regex-309',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Lookahead Assertion',
    text: 'Use positive lookahead in pattern',
    setup: 'String text = "abc123def456";',
    setupCode: 'String text = "abc123def456";',
    expected: ['abc', 'def'],
    sample:
      'Pattern.compile("\\\\w+(?=\\\\d)").matcher(text)\n  .results().map(m -> m.group()).collect(Collectors.toList())',
    hints: [
      '(?=pattern) is positive lookahead',
      'Matches if pattern follows',
      'Does not consume the lookahead',
    ],
    validPatterns: [/\(\?=/],
    tags: ['Pattern', 'lookahead', 'regex'],
  },

  {
    id: 'java-regex-310',
    category: 'Regular Expressions',
    difficulty: 'hard',
    title: 'Lookbehind Assertion',
    text: 'Use positive lookbehind in pattern',
    setup: 'String text = "$100 and $200";',
    setupCode: 'String text = "$100 and $200";',
    expected: ['100', '200'],
    sample:
      'Pattern.compile("(?<=\\\\$)\\\\d+").matcher(text)\n  .results().map(m -> m.group()).collect(Collectors.toList())',
    hints: [
      '(?<=pattern) is positive lookbehind',
      'Matches if pattern precedes',
      'Lookbehind must be fixed width',
    ],
    validPatterns: [/\(\?<=/],
    tags: ['Pattern', 'lookbehind', 'regex'],
  },

  {
    id: 'java-regex-311',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Non-Capturing Group',
    text: 'Use non-capturing group for structure',
    setup: 'String text = "color colour";',
    setupCode: 'String text = "color colour";',
    expected: 2,
    sample: 'Pattern.compile("colou?r").matcher(text).results().count()',
    hints: [
      '(?:pattern) is non-capturing group',
      'Groups pattern without capturing',
      'Does not create backreference',
    ],
    validPatterns: [/colou\?r/],
    tags: ['Pattern', 'non-capturing', 'regex'],
  },

  {
    id: 'java-regex-312',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Case Insensitive Match',
    text: 'Match with case insensitivity',
    setup: 'String text = "Hello HELLO hello";',
    setupCode: 'String text = "Hello HELLO hello";',
    expected: 3,
    sample: 'Pattern.compile("hello", Pattern.CASE_INSENSITIVE).matcher(text).results().count()',
    hints: [
      'CASE_INSENSITIVE flag ignores case',
      'Also: (?i) inline flag',
      'Affects entire pattern',
    ],
    validPatterns: [/Pattern\.CASE_INSENSITIVE|\(\?i\)/],
    tags: ['Pattern', 'case-insensitive', 'flags'],
  },

  {
    id: 'java-regex-313',
    category: 'Regular Expressions',
    difficulty: 'hard',
    title: 'Multiline Mode',
    text: 'Match at line boundaries with multiline mode',
    setup: 'String text = "line1\\nline2\\nline3";',
    setupCode: 'String text = "line1\\nline2\\nline3";',
    expected: 3,
    sample: 'Pattern.compile("^line\\\\d", Pattern.MULTILINE).matcher(text).results().count()',
    hints: [
      'MULTILINE makes ^ and $ match line boundaries',
      'Without it, ^ only matches start of string',
      'Also: (?m) inline flag',
    ],
    validPatterns: [/Pattern\.MULTILINE|\(\?m\)/],
    tags: ['Pattern', 'multiline', 'flags'],
  },

  // ============================================================
  // Additional Stream API Problems
  // ============================================================

  {
    id: 'java-stream-338',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'MapToInt for Sum',
    text: 'Calculate total string lengths using mapToInt',
    setup: 'List<String> words = Arrays.asList("hello", "world", "java");',
    setupCode: 'List<String> words = Arrays.asList("hello", "world", "java");',
    expected: 14,
    sample: 'words.stream().mapToInt(String::length).sum()',
    hints: [
      'mapToInt converts to IntStream',
      'IntStream has sum() method',
      'Avoids boxing overhead',
    ],
    validPatterns: [/\.mapToInt\(/, /\.sum\(\)/],
    tags: ['Stream', 'mapToInt', 'IntStream'],
  },

  {
    id: 'java-stream-339',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'IntStream Statistics',
    text: 'Get all statistics from IntStream',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: 3.0,
    sample: 'Arrays.stream(nums).summaryStatistics().getAverage()',
    hints: [
      'summaryStatistics() provides all stats',
      'count, sum, min, max, average',
      'Single pass through data',
    ],
    validPatterns: [/\.summaryStatistics\(\)/],
    tags: ['IntStream', 'statistics', 'aggregation'],
  },

  {
    id: 'java-stream-340',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Custom Collector',
    text: 'Create custom collector to join with separator',
    setup: 'List<String> words = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> words = Arrays.asList("a", "b", "c");',
    expected: 'a|b|c',
    sample:
      'words.stream().collect(Collector.of(\n  StringBuilder::new,\n  (sb, s) -> { if (sb.length() > 0) sb.append("|"); sb.append(s); },\n  (sb1, sb2) -> { if (sb1.length() > 0 && sb2.length() > 0) sb1.append("|"); return sb1.append(sb2); },\n  StringBuilder::toString\n))',
    hints: [
      'Collector.of() creates custom collector',
      'Supplier, accumulator, combiner, finisher',
      'Combiner for parallel streams',
    ],
    validPatterns: [/Collector\.of\(/],
    tags: ['Stream', 'Collector', 'custom'],
  },

  {
    id: 'java-stream-341',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'DoubleStream Average',
    text: 'Calculate average of doubles',
    setup: 'double[] prices = {10.5, 20.3, 15.7, 8.9};',
    setupCode: 'double[] prices = {10.5, 20.3, 15.7, 8.9};',
    expected: 13.85,
    sample: 'Arrays.stream(prices).average().orElse(0)',
    hints: [
      'DoubleStream for double primitives',
      'average() returns OptionalDouble',
      'orElse() provides default',
    ],
    validPatterns: [/Arrays\.stream\(/, /\.average\(\)/],
    tags: ['DoubleStream', 'average', 'primitive'],
  },

  {
    id: 'java-stream-342',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.toMap with Merge',
    text: 'Handle duplicate keys when collecting to map',
    setup: 'List<String> words = Arrays.asList("apple", "ant", "banana", "bee");',
    setupCode: 'List<String> words = Arrays.asList("apple", "ant", "banana", "bee");',
    expected: { a: 2, b: 2 },
    sample:
      'words.stream().collect(Collectors.toMap(\n  s -> s.charAt(0),\n  s -> 1,\n  Integer::sum\n))',
    hints: ['Third arg is merge function', 'Called when keys collide', 'Integer::sum adds values'],
    validPatterns: [/Collectors\.toMap\([^)]+,[^)]+,[^)]+\)/],
    tags: ['Stream', 'Collectors', 'toMap', 'merge'],
  },

  {
    id: 'java-stream-343',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Boxed Primitive Stream',
    text: 'Convert IntStream to Stream<Integer>',
    setup: 'int[] nums = {1, 2, 3, 4, 5};',
    setupCode: 'int[] nums = {1, 2, 3, 4, 5};',
    expected: [1, 2, 3, 4, 5],
    sample: 'Arrays.stream(nums).boxed().collect(Collectors.toList())',
    hints: [
      'boxed() converts primitives to objects',
      'IntStream to Stream<Integer>',
      'Required for some collectors',
    ],
    validPatterns: [/\.boxed\(\)/],
    tags: ['IntStream', 'boxed', 'conversion'],
  },

  {
    id: 'java-stream-344',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Distinct by Property',
    text: 'Get distinct elements by a property',
    setup:
      'record Person(String name, int age) {}\nList<Person> people = Arrays.asList(\n  new Person("Alice", 30),\n  new Person("Bob", 30),\n  new Person("Charlie", 25)\n);',
    setupCode:
      'record Person(String name, int age) {}\nList<Person> people = Arrays.asList(\n  new Person("Alice", 30),\n  new Person("Bob", 30),\n  new Person("Charlie", 25)\n);',
    expected: 2,
    sample:
      'people.stream()\n  .collect(Collectors.toMap(Person::age, p -> p, (p1, p2) -> p1))\n  .values().size()',
    hints: [
      'Use toMap with merge to keep first',
      'Key is the property for distinctness',
      'Values are the distinct objects',
    ],
    validPatterns: [/Collectors\.toMap\(/],
    tags: ['Stream', 'distinct', 'property'],
  },

  {
    id: 'java-stream-345',
    category: 'Stream API',
    difficulty: 'easy',
    title: 'Stream.empty',
    text: 'Create an empty stream',
    setup: '// Create empty stream',
    setupCode: '// Create empty stream',
    expected: 0,
    sample: 'Stream.empty().count()',
    hints: [
      'Stream.empty() creates zero-element stream',
      'Useful for edge cases and defaults',
      'Type inferred from context',
    ],
    validPatterns: [/Stream\.empty\(\)/],
    tags: ['Stream', 'empty', 'creation'],
  },

  {
    id: 'java-stream-346',
    category: 'Stream API',
    difficulty: 'easy',
    title: 'Stream.of Single Element',
    text: 'Create stream from single value',
    setup: 'String value = "hello";',
    setupCode: 'String value = "hello";',
    expected: ['hello'],
    sample: 'Stream.of(value).collect(Collectors.toList())',
    hints: [
      'Stream.of() creates from values',
      'Can be single or multiple elements',
      'Alternative: Stream.ofNullable() for nullable',
    ],
    validPatterns: [/Stream\.of\(/],
    tags: ['Stream', 'of', 'creation'],
  },

  {
    id: 'java-stream-347',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Parallel Stream Ordering',
    text: 'Maintain order in parallel stream',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: [2, 4, 6, 8, 10],
    sample:
      'nums.parallelStream()\n  .map(n -> n * 2)\n  .forEachOrdered(System.out::println);\nnums.parallelStream().map(n -> n * 2).collect(Collectors.toList())',
    hints: [
      'forEachOrdered() preserves order',
      'collect() with toList() preserves order',
      'forEach() may be out of order',
    ],
    validPatterns: [/\.parallelStream\(\)/, /\.forEachOrdered\(/],
    tags: ['Stream', 'parallel', 'ordering'],
  },

  {
    id: 'java-stream-348',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Limit and Skip',
    text: 'Get elements 3-5 from stream (pagination)',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
    expected: [3, 4, 5],
    sample: 'nums.stream().skip(2).limit(3).collect(Collectors.toList())',
    hints: [
      'skip(n) skips first n elements',
      'limit(n) takes at most n elements',
      'Useful for pagination',
    ],
    validPatterns: [/\.skip\(/, /\.limit\(/],
    tags: ['Stream', 'skip', 'limit', 'pagination'],
  },

  {
    id: 'java-stream-349',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Grouping by Multiple Keys',
    text: 'Group by first letter then by length',
    setup: 'List<String> words = Arrays.asList("apple", "ant", "banana", "bat", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "ant", "banana", "bat", "cherry");',
    expected: true,
    sample:
      'Map<Character, Map<Integer, List<String>>> grouped = words.stream()\n  .collect(Collectors.groupingBy(\n    s -> s.charAt(0),\n    Collectors.groupingBy(String::length)\n  ));\ngrouped.get(\'a\').get(3).contains("ant")',
    hints: [
      'Nested groupingBy for hierarchical grouping',
      'Inner collector processes each group',
      'Creates Map<K1, Map<K2, V>>',
    ],
    validPatterns: [/groupingBy\([^)]+groupingBy/],
    tags: ['Stream', 'Collectors', 'groupingBy', 'nested'],
  },

  {
    id: 'java-stream-350',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Reduce with Identity',
    text: 'Multiply all numbers using reduce',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: 120,
    sample: 'nums.stream().reduce(1, (a, b) -> a * b)',
    hints: [
      'reduce(identity, accumulator) with initial value',
      'Identity is 1 for multiplication',
      'Returns T directly (not Optional)',
    ],
    validPatterns: [/\.reduce\(\s*1\s*,/],
    tags: ['Stream', 'reduce', 'multiplication'],
  },

  // ============================================================
  // Additional Collection Problems
  // ============================================================

  {
    id: 'java-coll-321',
    category: 'Collection Framework',
    difficulty: 'easy',
    title: 'Collections.singletonList',
    text: 'Create immutable single-element list',
    setup: '// Create list with one element',
    setupCode: '// Create list with one element',
    expected: ['only'],
    sample: 'Collections.singletonList("only")',
    hints: [
      'singletonList creates immutable list',
      'Contains exactly one element',
      'Throws on modification attempts',
    ],
    validPatterns: [/Collections\.singletonList\(/],
    tags: ['Collections', 'singleton', 'immutable'],
  },

  {
    id: 'java-coll-322',
    category: 'Collection Framework',
    difficulty: 'easy',
    title: 'Collections.emptyList',
    text: 'Get immutable empty list',
    setup: '// Get empty list',
    setupCode: '// Get empty list',
    expected: [],
    sample: 'Collections.emptyList()',
    hints: [
      'emptyList() returns shared empty list',
      'Immutable, cannot add elements',
      'Also: emptySet(), emptyMap()',
    ],
    validPatterns: [/Collections\.emptyList\(\)/],
    tags: ['Collections', 'empty', 'immutable'],
  },

  {
    id: 'java-coll-323',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Collections.nCopies',
    text: 'Create list with n copies of value',
    setup: '// Create list with 5 copies of "x"',
    setupCode: '// Create list with 5 copies of "x"',
    expected: ['x', 'x', 'x', 'x', 'x'],
    sample: 'Collections.nCopies(5, "x")',
    hints: [
      'nCopies creates immutable list',
      'All elements are same reference',
      'Useful for initialization',
    ],
    validPatterns: [/Collections\.nCopies\(/],
    tags: ['Collections', 'nCopies', 'initialization'],
  },

  {
    id: 'java-coll-324',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Collections.shuffle',
    text: 'Randomly shuffle list elements',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    expected: 5,
    sample: 'Collections.shuffle(nums);\nnums.size()',
    hints: [
      'shuffle() randomizes element order',
      'Modifies list in place',
      'Can pass Random for reproducibility',
    ],
    validPatterns: [/Collections\.shuffle\(/],
    tags: ['Collections', 'shuffle', 'random'],
  },

  {
    id: 'java-coll-325',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Collections.frequency',
    text: 'Count occurrences of element',
    setup: 'List<String> items = Arrays.asList("a", "b", "a", "c", "a");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "a", "c", "a");',
    expected: 3,
    sample: 'Collections.frequency(items, "a")',
    hints: [
      'frequency() counts equal elements',
      'Uses equals() for comparison',
      'Returns int count',
    ],
    validPatterns: [/Collections\.frequency\(/],
    tags: ['Collections', 'frequency', 'counting'],
  },

  {
    id: 'java-coll-326',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Collections.disjoint',
    text: 'Check if collections have no common elements',
    setup:
      'List<Integer> list1 = Arrays.asList(1, 2, 3);\nList<Integer> list2 = Arrays.asList(4, 5, 6);',
    setupCode:
      'List<Integer> list1 = Arrays.asList(1, 2, 3);\nList<Integer> list2 = Arrays.asList(4, 5, 6);',
    expected: true,
    sample: 'Collections.disjoint(list1, list2)',
    hints: [
      'disjoint() checks for no overlap',
      'Returns true if no common elements',
      'Efficient for Set parameters',
    ],
    validPatterns: [/Collections\.disjoint\(/],
    tags: ['Collections', 'disjoint', 'comparison'],
  },

  {
    id: 'java-coll-327',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Collections.min and max',
    text: 'Find minimum and maximum elements',
    setup: 'List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);',
    setupCode: 'List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9);',
    expected: 1,
    sample: 'Collections.min(nums)',
    hints: [
      'min() finds smallest element',
      'max() finds largest element',
      'Uses natural ordering or Comparator',
    ],
    validPatterns: [/Collections\.min\(|Collections\.max\(/],
    tags: ['Collections', 'min', 'max'],
  },

  {
    id: 'java-coll-328',
    category: 'Collection Framework',
    difficulty: 'hard',
    title: 'Collections.binarySearch',
    text: 'Binary search in sorted list',
    setup: 'List<Integer> nums = Arrays.asList(1, 3, 5, 7, 9, 11, 13);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 3, 5, 7, 9, 11, 13);',
    expected: 3,
    sample: 'Collections.binarySearch(nums, 7)',
    hints: [
      'binarySearch requires sorted list',
      'Returns index if found',
      'Returns -(insertion point)-1 if not found',
    ],
    validPatterns: [/Collections\.binarySearch\(/],
    tags: ['Collections', 'binarySearch', 'search'],
  },

  {
    id: 'java-coll-329',
    category: 'Collection Framework',
    difficulty: 'medium',
    title: 'Collections.rotate',
    text: 'Rotate list elements by distance',
    setup: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    setupCode: 'List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));',
    expected: [4, 5, 1, 2, 3],
    sample: 'Collections.rotate(nums, 2);\nnums',
    hints: [
      'rotate() shifts elements by distance',
      'Positive distance: towards end',
      'Elements wrap around',
    ],
    validPatterns: [/Collections\.rotate\(/],
    tags: ['Collections', 'rotate', 'manipulation'],
  },

  {
    id: 'java-coll-330',
    category: 'Collection Framework',
    difficulty: 'hard',
    title: 'Collections.synchronizedList',
    text: 'Create thread-safe list wrapper',
    setup: 'List<String> list = new ArrayList<>();',
    setupCode: 'List<String> list = new ArrayList<>();',
    expected: true,
    sample:
      'List<String> syncList = Collections.synchronizedList(list);\nsyncList.add("item");\nsyncList.contains("item")',
    hints: [
      'synchronizedList wraps for thread safety',
      'All operations are synchronized',
      'Iterator still needs external sync',
    ],
    validPatterns: [/Collections\.synchronizedList\(/],
    tags: ['Collections', 'synchronized', 'thread-safe'],
  },

  // ============================================================
  // Additional Optional Problems
  // ============================================================

  {
    id: 'java-opt-314',
    category: 'Optional Methods',
    difficulty: 'easy',
    title: 'Optional.isPresent',
    text: 'Check if Optional has value',
    setup: 'Optional<String> opt = Optional.of("value");',
    setupCode: 'Optional<String> opt = Optional.of("value");',
    expected: true,
    sample: 'opt.isPresent()',
    hints: [
      'isPresent() returns true if value exists',
      'Opposite of isEmpty()',
      'Prefer ifPresent() for actions',
    ],
    validPatterns: [/\.isPresent\(\)/],
    tags: ['Optional', 'isPresent', 'check'],
  },

  {
    id: 'java-opt-315',
    category: 'Optional Methods',
    difficulty: 'medium',
    title: 'Optional with Default Computation',
    text: 'Combine orElse with computation',
    setup: 'Optional<Integer> opt = Optional.empty();',
    setupCode: 'Optional<Integer> opt = Optional.empty();',
    expected: 42,
    sample: 'opt.orElseGet(() -> 6 * 7)',
    hints: [
      'orElseGet with lambda for computation',
      'Only computed if Optional empty',
      'Lazy evaluation benefit',
    ],
    validPatterns: [/\.orElseGet\(/],
    tags: ['Optional', 'orElseGet', 'lazy'],
  },

  {
    id: 'java-opt-316',
    category: 'Optional Methods',
    difficulty: 'hard',
    title: 'Optional Null Handling Pattern',
    text: 'Safely chain nullable calls',
    setup:
      'class Company { Department dept; }\nclass Department { Employee manager; }\nclass Employee { String name; }\nCompany company = null;',
    setupCode:
      'class Company { Department dept; }\nclass Department { Employee manager; }\nclass Employee { String name; }\nCompany company = null;',
    expected: 'unknown',
    sample:
      'Optional.ofNullable(company)\n  .map(c -> c.dept)\n  .map(d -> d.manager)\n  .map(e -> e.name)\n  .orElse("unknown")',
    hints: [
      'Chain map() calls safely',
      'Any null becomes empty Optional',
      'Final orElse provides default',
    ],
    validPatterns: [/Optional\.ofNullable\(/, /\.map\([^)]+\)\.map\(/],
    tags: ['Optional', 'null-safe', 'chaining'],
  },

  // ============================================================
  // Additional Functional Interface Problems
  // ============================================================

  {
    id: 'java-func-319',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'Predicate.isEqual',
    text: 'Create predicate for equality check',
    setup: 'List<String> items = Arrays.asList("a", "b", "c", "b", "d");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "c", "b", "d");',
    expected: 2,
    sample: 'items.stream().filter(Predicate.isEqual("b")).count()',
    hints: [
      'Predicate.isEqual creates equality predicate',
      'Null-safe comparison',
      'Static factory method',
    ],
    validPatterns: [/Predicate\.isEqual\(/],
    tags: ['Predicate', 'isEqual', 'factory'],
  },

  {
    id: 'java-func-320',
    category: 'Functional Interfaces',
    difficulty: 'hard',
    title: 'Predicate.not (Java 11)',
    text: 'Negate predicate with static method',
    setup: 'List<String> items = Arrays.asList("", "a", "", "b", "c");',
    setupCode: 'List<String> items = Arrays.asList("", "a", "", "b", "c");',
    expected: 3,
    sample: 'items.stream().filter(Predicate.not(String::isEmpty)).count()',
    hints: [
      'Predicate.not() negates predicate (Java 11)',
      'More readable than .negate()',
      'Works with method references',
    ],
    validPatterns: [/Predicate\.not\(/],
    tags: ['Predicate', 'not', 'Java11'],
  },

  {
    id: 'java-func-321',
    category: 'Functional Interfaces',
    difficulty: 'medium',
    title: 'Function.identity',
    text: 'Use identity function',
    setup: 'List<String> items = Arrays.asList("a", "b", "c");',
    setupCode: 'List<String> items = Arrays.asList("a", "b", "c");',
    expected: { a: 'a', b: 'b', c: 'c' },
    sample: 'items.stream().collect(Collectors.toMap(Function.identity(), Function.identity()))',
    hints: [
      'Function.identity() returns input unchanged',
      'Useful in collectors',
      'Cleaner than s -> s',
    ],
    validPatterns: [/Function\.identity\(\)/],
    tags: ['Function', 'identity', 'utility'],
  },

  // ============================================================
  // Additional Lambda/Method Reference Problems
  // ============================================================

  {
    id: 'java-lambda-310',
    category: 'Lambda Expressions',
    difficulty: 'medium',
    title: 'Two-arg Method Reference',
    text: 'Use method reference with BiFunction',
    setup: 'BiFunction<String, String, String> concat;',
    setupCode: 'java.util.function.BiFunction<String, String, String> concat;',
    expected: 'HelloWorld',
    sample:
      'BiFunction<String, String, String> concat = String::concat;\nconcat.apply("Hello", "World")',
    hints: [
      'Instance method as BiFunction',
      'First arg becomes receiver',
      'Second arg becomes method parameter',
    ],
    validPatterns: [/String::concat/],
    tags: ['lambda', 'method-reference', 'BiFunction'],
  },

  {
    id: 'java-lambda-311',
    category: 'Lambda Expressions',
    difficulty: 'hard',
    title: 'Method Reference vs Lambda',
    text: 'Choose between method reference and lambda',
    setup: 'List<String> words = Arrays.asList("  hello  ", "  world  ");',
    setupCode: 'List<String> words = Arrays.asList("  hello  ", "  world  ");',
    expected: ['HELLO', 'WORLD'],
    sample:
      'words.stream()\n  .map(String::trim)\n  .map(String::toUpperCase)\n  .collect(Collectors.toList())',
    hints: [
      'Method references are cleaner for simple cases',
      'Use lambda for complex logic',
      'Chain multiple method references',
    ],
    validPatterns: [/String::trim/, /String::toUpperCase/],
    tags: ['lambda', 'method-reference', 'style'],
  },

  // ============================================================
  // Additional Record Problems
  // ============================================================

  {
    id: 'java-record-313',
    category: 'Record Classes',
    difficulty: 'medium',
    title: 'Record in Stream',
    text: 'Use records effectively with streams',
    setup:
      'record Person(String name, int age) {}\nList<Person> people = Arrays.asList(\n  new Person("Alice", 30),\n  new Person("Bob", 25),\n  new Person("Charlie", 35)\n);',
    setupCode:
      'record Person(String name, int age) {}\nList<Person> people = Arrays.asList(\n  new Person("Alice", 30),\n  new Person("Bob", 25),\n  new Person("Charlie", 35)\n);',
    expected: ['Alice', 'Bob', 'Charlie'],
    sample:
      'people.stream()\n  .sorted(Comparator.comparingInt(Person::age))\n  .map(Person::name)\n  .collect(Collectors.toList())',
    hints: [
      'Record accessors work as method references',
      'Person::age extracts age',
      'Clean integration with streams',
    ],
    validPatterns: [/Person::age|Person::name/],
    tags: ['record', 'Stream', 'method-reference'],
  },

  {
    id: 'java-record-314',
    category: 'Record Classes',
    difficulty: 'hard',
    title: 'Record with Builder Pattern',
    text: 'Combine record with builder for complex construction',
    setup: '// Config record with many fields',
    setupCode: '// Config record with many fields',
    expected: true,
    sample:
      'record Config(String host, int port, boolean ssl) {\n  static class Builder {\n    private String host = "localhost";\n    private int port = 8080;\n    private boolean ssl = false;\n    Builder host(String h) { this.host = h; return this; }\n    Builder port(int p) { this.port = p; return this; }\n    Builder ssl(boolean s) { this.ssl = s; return this; }\n    Config build() { return new Config(host, port, ssl); }\n  }\n}\nnew Config.Builder().host("example.com").port(443).ssl(true).build().ssl()',
    hints: [
      'Records can have nested Builder class',
      'Builder provides named parameters',
      'Immutable record from mutable builder',
    ],
    validPatterns: [/record\s+\w+/, /static\s+class\s+Builder/],
    tags: ['record', 'builder', 'pattern'],
  },

  // ============================================================
  // Additional Pattern Matching Problems
  // ============================================================

  {
    id: 'java-pattern-310',
    category: 'Pattern Matching',
    difficulty: 'medium',
    title: 'Switch with Enum',
    text: 'Use switch expression with enum',
    setup: 'enum Status { PENDING, APPROVED, REJECTED }',
    setupCode: 'enum Status { PENDING, APPROVED, REJECTED }',
    expected: 'Waiting',
    sample:
      'Status status = Status.PENDING;\nString message = switch (status) {\n  case PENDING -> "Waiting";\n  case APPROVED -> "Done";\n  case REJECTED -> "Failed";\n};\nmessage',
    hints: [
      'Switch expressions work great with enums',
      'All cases must be covered',
      'No default needed if exhaustive',
    ],
    validPatterns: [/switch\s*\(\w+\)\s*\{/, /case\s+\w+\s*->/],
    tags: ['switch', 'enum', 'expression'],
  },

  {
    id: 'java-pattern-311',
    category: 'Pattern Matching',
    difficulty: 'hard',
    title: 'Switch with Null Case',
    text: 'Handle null explicitly in switch',
    setup: 'String value = null;',
    setupCode: 'String value = null;',
    expected: 'null value',
    sample:
      'String result = switch (value) {\n  case null -> "null value";\n  case String s when s.isEmpty() -> "empty";\n  case String s -> "has: " + s;\n};\nresult',
    hints: [
      'null case is explicit (Java 21)',
      'Prevents NullPointerException',
      'Must come before other cases',
    ],
    validPatterns: [/case\s+null\s*->/],
    tags: ['switch', 'null', 'Java21'],
  },

  // ============================================================
  // Additional File I/O Problems
  // ============================================================

  {
    id: 'java-file-315',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.createDirectories',
    text: 'Create directory including parents',
    setup: 'Path dir = Path.of(System.getProperty("java.io.tmpdir"), "a", "b", "c");',
    setupCode: 'Path dir = Path.of(System.getProperty("java.io.tmpdir"), "a", "b", "c");',
    expected: true,
    sample: 'Files.createDirectories(dir);\nFiles.exists(dir)',
    hints: [
      'createDirectories creates all missing parents',
      'No error if already exists',
      'Unlike createDirectory which requires parent',
    ],
    validPatterns: [/Files\.createDirectories\(/],
    tags: ['Files', 'createDirectories', 'NIO'],
  },

  {
    id: 'java-file-316',
    category: 'File I/O',
    difficulty: 'medium',
    title: 'Files.delete vs deleteIfExists',
    text: 'Safely delete file that may not exist',
    setup: 'Path path = Path.of(System.getProperty("java.io.tmpdir"), "nonexistent.txt");',
    setupCode: 'Path path = Path.of(System.getProperty("java.io.tmpdir"), "nonexistent.txt");',
    expected: false,
    sample: 'Files.deleteIfExists(path)',
    hints: [
      'deleteIfExists returns false if not found',
      'delete throws NoSuchFileException',
      'Useful when uncertain about existence',
    ],
    validPatterns: [/Files\.deleteIfExists\(/],
    tags: ['Files', 'delete', 'NIO'],
  },

  {
    id: 'java-file-317',
    category: 'File I/O',
    difficulty: 'hard',
    title: 'Files.getLastModifiedTime',
    text: 'Get file modification time',
    setup: 'Path path = Files.createTempFile("test", ".txt");',
    setupCode: 'Path path = Files.createTempFile("test", ".txt");',
    expected: true,
    sample:
      'FileTime time = Files.getLastModifiedTime(path);\ntime.toInstant().isBefore(Instant.now().plusSeconds(1))',
    hints: [
      'Returns FileTime object',
      'Convert to Instant for comparison',
      'Can also setLastModifiedTime',
    ],
    validPatterns: [/Files\.getLastModifiedTime\(/],
    tags: ['Files', 'FileTime', 'attributes'],
  },

  {
    id: 'java-file-318',
    category: 'File I/O',
    difficulty: 'hard',
    title: 'Files.readAttributes',
    text: 'Read multiple file attributes at once',
    setup: 'Path path = Files.createTempFile("test", ".txt");',
    setupCode: 'Path path = Files.createTempFile("test", ".txt");',
    expected: true,
    sample:
      'BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);\nattrs.isRegularFile()',
    hints: [
      'readAttributes gets multiple attributes efficiently',
      'BasicFileAttributes for common attributes',
      'Single system call for multiple values',
    ],
    validPatterns: [/Files\.readAttributes\(/],
    tags: ['Files', 'attributes', 'BasicFileAttributes'],
  },

  // ============================================================
  // Additional Date/Time Problems
  // ============================================================

  {
    id: 'java-datetime-321',
    category: 'Date/Time API',
    difficulty: 'easy',
    title: 'Year and YearMonth',
    text: 'Work with year-based dates',
    setup: 'YearMonth yearMonth = YearMonth.of(2024, 2);',
    setupCode: 'YearMonth yearMonth = YearMonth.of(2024, 2);',
    expected: 29,
    sample: 'yearMonth.lengthOfMonth()',
    hints: [
      'YearMonth for year-month combinations',
      'Knows days in month including leap year',
      'Also: Year, MonthDay classes',
    ],
    validPatterns: [/YearMonth\.of\(/, /\.lengthOfMonth\(\)/],
    tags: ['YearMonth', 'leap-year', 'Java8'],
  },

  {
    id: 'java-datetime-322',
    category: 'Date/Time API',
    difficulty: 'medium',
    title: 'OffsetDateTime',
    text: 'Create date-time with offset',
    setup: '// Create date-time with UTC+5:30 offset',
    setupCode: '// Create date-time with UTC+5:30 offset',
    expected: '+05:30',
    sample:
      'OffsetDateTime odt = OffsetDateTime.of(2024, 6, 15, 10, 30, 0, 0, ZoneOffset.of("+05:30"));\nodt.getOffset().toString()',
    hints: [
      'OffsetDateTime has fixed offset',
      'No DST handling like ZonedDateTime',
      'Good for serialization',
    ],
    validPatterns: [/OffsetDateTime\.of\(/, /ZoneOffset\.of\(/],
    tags: ['OffsetDateTime', 'offset', 'Java8'],
  },

  {
    id: 'java-datetime-323',
    category: 'Date/Time API',
    difficulty: 'hard',
    title: 'Custom DateTimeFormatter',
    text: 'Parse date with custom format',
    setup: 'String dateStr = "15-Jun-2024 10:30 AM";',
    setupCode: 'String dateStr = "15-Jun-2024 10:30 AM";',
    expected: 15,
    sample:
      'DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy hh:mm a", Locale.ENGLISH);\nLocalDateTime dt = LocalDateTime.parse(dateStr, formatter);\ndt.getDayOfMonth()',
    hints: [
      'ofPattern with custom format string',
      'Locale important for month names',
      'a for AM/PM, h for 12-hour',
    ],
    validPatterns: [/DateTimeFormatter\.ofPattern\(/],
    tags: ['DateTimeFormatter', 'parse', 'custom'],
  },

  // ============================================================
  // Additional Concurrency Problems
  // ============================================================

  {
    id: 'java-concur-320',
    category: 'Concurrency',
    difficulty: 'medium',
    title: 'ScheduledExecutorService',
    text: 'Schedule task for delayed execution',
    setup: 'ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);',
    setupCode:
      'java.util.concurrent.ScheduledExecutorService scheduler = java.util.concurrent.Executors.newScheduledThreadPool(1);',
    expected: true,
    sample:
      'ScheduledFuture<?> future = scheduler.schedule(() -> {}, 1, TimeUnit.SECONDS);\nboolean cancelled = future.cancel(false);\nscheduler.shutdown();\ntrue',
    hints: [
      'schedule() for one-time delayed execution',
      'scheduleAtFixedRate for periodic execution',
      'Always shutdown scheduler',
    ],
    validPatterns: [/scheduler\.schedule\(/],
    tags: ['ScheduledExecutorService', 'scheduling', 'concurrency'],
  },

  {
    id: 'java-concur-321',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CompletableFuture Timeout',
    text: 'Add timeout to async operation',
    setup: '// Async operation with timeout',
    setupCode: '// Async operation with timeout',
    expected: 'timeout',
    sample:
      'CompletableFuture.supplyAsync(() -> {\n  try { Thread.sleep(2000); } catch (InterruptedException e) {}\n  return "result";\n}).completeOnTimeout("timeout", 100, TimeUnit.MILLISECONDS).join()',
    hints: [
      'completeOnTimeout completes with default (Java 9)',
      'orTimeout throws on timeout',
      'Prevents indefinite waiting',
    ],
    validPatterns: [/\.completeOnTimeout\(|\.orTimeout\(/],
    tags: ['CompletableFuture', 'timeout', 'Java9'],
  },

  {
    id: 'java-concur-322',
    category: 'Concurrency',
    difficulty: 'hard',
    title: 'CompletableFuture Copy',
    text: 'Create independent copy of future',
    setup: 'CompletableFuture<String> original = CompletableFuture.completedFuture("value");',
    setupCode: 'CompletableFuture<String> original = CompletableFuture.completedFuture("value");',
    expected: 'value',
    sample: 'CompletableFuture<String> copy = original.copy();\ncopy.join()',
    hints: [
      'copy() creates independent future (Java 9)',
      'Copy cannot be completed externally',
      'Completes when original completes',
    ],
    validPatterns: [/\.copy\(\)/],
    tags: ['CompletableFuture', 'copy', 'Java9'],
  },

  // ============================================================
  // Additional Regex Problems
  // ============================================================

  {
    id: 'java-regex-314',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Word Boundaries',
    text: 'Match whole words only',
    setup: 'String text = "cat catalog catfish";',
    setupCode: 'String text = "cat catalog catfish";',
    expected: 1,
    sample: 'Pattern.compile("\\\\bcat\\\\b").matcher(text).results().count()',
    hints: [
      '\\b matches word boundary',
      'Matches between word and non-word',
      'Prevents partial matches',
    ],
    validPatterns: [/\\\\b/],
    tags: ['Pattern', 'boundary', 'regex'],
  },

  {
    id: 'java-regex-315',
    category: 'Regular Expressions',
    difficulty: 'hard',
    title: 'Backreference',
    text: 'Match repeated pattern with backreference',
    setup: 'String text = "the the quick brown fox fox";',
    setupCode: 'String text = "the the quick brown fox fox";',
    expected: 2,
    sample: 'Pattern.compile("\\\\b(\\\\w+)\\\\s+\\\\1\\\\b").matcher(text).results().count()',
    hints: [
      '\\1 refers to first captured group',
      'Matches repeated words',
      'Useful for duplicate detection',
    ],
    validPatterns: [/\\\\1/],
    tags: ['Pattern', 'backreference', 'regex'],
  },

  {
    id: 'java-regex-316',
    category: 'Regular Expressions',
    difficulty: 'medium',
    title: 'Reluctant Quantifier',
    text: 'Use non-greedy matching',
    setup: 'String html = "<b>bold</b> and <b>more</b>";',
    setupCode: 'String html = "<b>bold</b> and <b>more</b>";',
    expected: 2,
    sample: 'Pattern.compile("<b>.*?</b>").matcher(html).results().count()',
    hints: [
      '*? is reluctant (non-greedy)',
      'Matches minimum possible',
      'Greedy * would match to last </b>',
    ],
    validPatterns: [/\.\*\?/],
    tags: ['Pattern', 'reluctant', 'quantifier'],
  },

  // ============================================================
  // Additional Virtual Thread Problems
  // ============================================================

  {
    id: 'java-virtual-305',
    category: 'Virtual Threads',
    difficulty: 'hard',
    title: 'Structured Concurrency Preview',
    text: 'Use structured concurrency for related tasks',
    setup: '// Structured task scope (preview)',
    setupCode: '// Structured task scope (preview)',
    expected: true,
    sample:
      '// Note: Requires --enable-preview\n// try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {\n//   var task1 = scope.fork(() -> "result1");\n//   var task2 = scope.fork(() -> "result2");\n//   scope.join();\n//   scope.throwIfFailed();\n//   return task1.get() != null && task2.get() != null;\n// }\ntrue',
    hints: [
      'StructuredTaskScope manages related tasks (Preview)',
      'ShutdownOnFailure cancels on any failure',
      'ShutdownOnSuccess returns on first success',
    ],
    validPatterns: [/StructuredTaskScope/],
    tags: ['VirtualThread', 'structured', 'preview', 'Java21'],
  },

  {
    id: 'java-virtual-306',
    category: 'Virtual Threads',
    difficulty: 'medium',
    title: 'Thread.sleep with Virtual Threads',
    text: 'Use sleep in virtual threads',
    setup: 'AtomicInteger counter = new AtomicInteger(0);',
    setupCode:
      'java.util.concurrent.atomic.AtomicInteger counter = new java.util.concurrent.atomic.AtomicInteger(0);',
    expected: true,
    sample:
      'Thread.startVirtualThread(() -> {\n  try { Thread.sleep(10); } catch (InterruptedException e) {}\n  counter.incrementAndGet();\n}).join();\ncounter.get() == 1',
    hints: [
      'Thread.sleep in virtual thread unmounts',
      'Does not block carrier thread',
      'Efficient for many sleeping tasks',
    ],
    validPatterns: [/Thread\.sleep\(/, /startVirtualThread/],
    tags: ['VirtualThread', 'sleep', 'Java21'],
  },

  // ============================================================
  // More Stream Problems
  // ============================================================

  {
    id: 'java-stream-351',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'FlatMapToInt',
    text: 'Flatten and convert to IntStream',
    setup:
      'List<List<Integer>> nested = Arrays.asList(\n  Arrays.asList(1, 2),\n  Arrays.asList(3, 4)\n);',
    setupCode:
      'List<List<Integer>> nested = Arrays.asList(\n  Arrays.asList(1, 2),\n  Arrays.asList(3, 4)\n);',
    expected: 10,
    sample: 'nested.stream().flatMapToInt(list -> list.stream().mapToInt(Integer::intValue)).sum()',
    hints: [
      'flatMapToInt flattens to IntStream',
      'Avoids boxing in result',
      'More efficient than flatMap + mapToInt',
    ],
    validPatterns: [/\.flatMapToInt\(/],
    tags: ['Stream', 'flatMapToInt', 'IntStream'],
  },

  {
    id: 'java-stream-352',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.maxBy',
    text: 'Find maximum using collector',
    setup: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    setupCode: 'List<String> words = Arrays.asList("apple", "banana", "cherry");',
    expected: 'cherry',
    sample: 'words.stream().collect(Collectors.maxBy(Comparator.naturalOrder())).orElse("")',
    hints: [
      'maxBy returns Optional of max',
      'Useful as downstream collector',
      'Also: minBy for minimum',
    ],
    validPatterns: [/Collectors\.maxBy\(/],
    tags: ['Stream', 'Collectors', 'maxBy'],
  },

  {
    id: 'java-stream-353',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Collectors.reducing',
    text: 'Use reducing collector with identity',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: 15,
    sample: 'nums.stream().collect(Collectors.reducing(0, Integer::sum))',
    hints: [
      'reducing with identity returns T not Optional',
      'First arg is identity element',
      'Useful in groupingBy downstream',
    ],
    validPatterns: [/Collectors\.reducing\(\s*0\s*,/],
    tags: ['Stream', 'Collectors', 'reducing'],
  },

  {
    id: 'java-stream-354',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'IntStream Sum',
    text: 'Sum integers efficiently',
    setup: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    setupCode: 'List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);',
    expected: 15,
    sample: 'nums.stream().mapToInt(Integer::intValue).sum()',
    hints: [
      'mapToInt converts to IntStream',
      'IntStream.sum() is specialized',
      'More efficient than reduce',
    ],
    validPatterns: [/\.mapToInt\(/, /\.sum\(\)/],
    tags: ['IntStream', 'sum', 'primitive'],
  },

  {
    id: 'java-stream-355',
    category: 'Stream API',
    difficulty: 'hard',
    title: 'Grouping with Max',
    text: 'Group and find max in each group',
    setup:
      'record Person(String dept, int salary) {}\nList<Person> people = Arrays.asList(\n  new Person("IT", 50000),\n  new Person("IT", 60000),\n  new Person("HR", 45000),\n  new Person("HR", 55000)\n);',
    setupCode:
      'record Person(String dept, int salary) {}\nList<Person> people = Arrays.asList(\n  new Person("IT", 50000),\n  new Person("IT", 60000),\n  new Person("HR", 45000),\n  new Person("HR", 55000)\n);',
    expected: { IT: 60000, HR: 55000 },
    sample:
      'people.stream().collect(\n  Collectors.groupingBy(\n    Person::dept,\n    Collectors.collectingAndThen(\n      Collectors.maxBy(Comparator.comparingInt(Person::salary)),\n      opt -> opt.map(Person::salary).orElse(0)\n    )\n  )\n)',
    hints: [
      'Combine groupingBy with maxBy',
      'collectingAndThen transforms result',
      'Extract value from Optional<Person>',
    ],
    validPatterns: [/groupingBy.*maxBy/],
    tags: ['Stream', 'Collectors', 'groupingBy', 'maxBy'],
  },

  {
    id: 'java-stream-356',
    category: 'Stream API',
    difficulty: 'medium',
    title: 'Collectors.toMap with TreeMap',
    text: 'Collect to sorted map',
    setup: 'List<String> words = Arrays.asList("cat", "apple", "dog");',
    setupCode: 'List<String> words = Arrays.asList("cat", "apple", "dog");',
    expected: ['apple', 'cat', 'dog'],
    sample:
      'Map<String, Integer> map = words.stream().collect(\n  Collectors.toMap(\n    Function.identity(),\n    String::length,\n    (a, b) -> a,\n    TreeMap::new\n  )\n);\nnew ArrayList<>(map.keySet())',
    hints: [
      'Fourth arg is map factory',
      'TreeMap for sorted keys',
      'LinkedHashMap for insertion order',
    ],
    validPatterns: [/Collectors\.toMap\([^)]+TreeMap::new/],
    tags: ['Stream', 'Collectors', 'toMap', 'TreeMap'],
  },
];

export default javaProblems;
