/**
 * Dart Coding Drills Problems
 *
 * Comprehensive collection of Dart problems covering:
 * - List Methods (10 problems)
 * - String Methods (10 problems)
 * - Map Methods (10 problems)
 * - Set Operations (10 problems)
 * - Null Safety (10 problems)
 *
 * Difficulty distribution: 20 easy, 20 medium, 10 hard
 */

import type { Problem } from '../types';

export const dartProblems: Problem[] = [
  // ============================================================
  // List Methods
  // ============================================================

  {
    id: 'dart-list-001',
    category: 'List Methods',
    difficulty: 'easy',
    title: 'Filter Even Numbers',
    text: 'Use `where` to filter and keep only even numbers from the list.',
    setup: 'var numbers = [1, 2, 3, 4, 5, 6, 7, 8];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5, 6, 7, 8];',
    expected: [2, 4, 6, 8],
    sample: 'numbers.where((n) => n % 2 == 0).toList()',
    hints: [
      'where() returns an Iterable, not a List',
      'Use toList() to convert the result back to a List',
    ],
    validPatterns: [/\.where\s*\(/],
    tags: ['where', 'filter', 'lists'],
  },

  {
    id: 'dart-list-002',
    category: 'List Methods',
    difficulty: 'easy',
    title: 'Transform to Squares',
    text: 'Use `map` to transform each number to its square.',
    setup: 'var numbers = [1, 2, 3, 4, 5];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5];',
    expected: [1, 4, 9, 16, 25],
    sample: 'numbers.map((n) => n * n).toList()',
    hints: [
      'map() transforms each element',
      'Returns an Iterable - use toList() to get a List',
    ],
    validPatterns: [/\.map\s*\(/],
    tags: ['map', 'transform', 'lists'],
  },

  {
    id: 'dart-list-003',
    category: 'List Methods',
    difficulty: 'medium',
    title: 'Calculate Sum with Fold',
    text: 'Use `fold` to calculate the sum of all numbers starting from 0.',
    setup: 'var numbers = [1, 2, 3, 4, 5];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5];',
    expected: 15,
    sample: 'numbers.fold(0, (sum, n) => sum + n)',
    hints: [
      'fold takes an initial value and a combine function',
      'The combine function receives accumulator and current element',
    ],
    validPatterns: [/\.fold\s*\(\s*0/],
    tags: ['fold', 'reduce', 'accumulator'],
  },

  {
    id: 'dart-list-004',
    category: 'List Methods',
    difficulty: 'easy',
    title: 'Sort Numbers Ascending',
    text: 'Use `sort` to sort the list in ascending order.',
    setup: 'var numbers = [5, 2, 8, 1, 9, 3];',
    setupCode: 'var numbers = [5, 2, 8, 1, 9, 3];',
    expected: [1, 2, 3, 5, 8, 9],
    sample: 'numbers.sort(); // modifies in place',
    hints: [
      'sort() modifies the list in place',
      'For a sorted copy, use [...numbers]..sort()',
    ],
    validPatterns: [/\.sort\s*\(/],
    tags: ['sort', 'order', 'lists'],
  },

  {
    id: 'dart-list-005',
    category: 'List Methods',
    difficulty: 'easy',
    title: 'Reverse a List',
    text: 'Get a reversed view of the list using `reversed`.',
    setup: 'var numbers = [1, 2, 3, 4, 5];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5];',
    expected: [5, 4, 3, 2, 1],
    sample: 'numbers.reversed.toList()',
    hints: [
      'reversed returns an Iterable, not a List',
      'Use toList() to convert to a List',
    ],
    validPatterns: [/\.reversed/],
    tags: ['reversed', 'order', 'lists'],
  },

  {
    id: 'dart-list-006',
    category: 'List Methods',
    difficulty: 'easy',
    title: 'Check if List Contains Element',
    text: 'Check if the list contains the number 5 using `contains`.',
    setup: 'var numbers = [1, 2, 3, 4, 5, 6, 7];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5, 6, 7];',
    expected: true,
    sample: 'numbers.contains(5)',
    hints: ['contains() returns a bool', 'Uses == for comparison'],
    validPatterns: [/\.contains\s*\(\s*5\s*\)/],
    tags: ['contains', 'search', 'lists'],
  },

  {
    id: 'dart-list-007',
    category: 'List Methods',
    difficulty: 'easy',
    title: 'Get First Element',
    text: 'Get the first element of the list using the `first` property.',
    setup: 'var fruits = ["apple", "banana", "cherry"];',
    setupCode: 'var fruits = ["apple", "banana", "cherry"];',
    expected: 'apple',
    sample: 'fruits.first',
    hints: [
      'first is a property, not a method',
      'Throws StateError if list is empty',
    ],
    validPatterns: [/\.first(?!\()/],
    tags: ['first', 'access', 'lists'],
  },

  {
    id: 'dart-list-008',
    category: 'List Methods',
    difficulty: 'easy',
    title: 'Get Last Element',
    text: 'Get the last element of the list using the `last` property.',
    setup: 'var fruits = ["apple", "banana", "cherry"];',
    setupCode: 'var fruits = ["apple", "banana", "cherry"];',
    expected: 'cherry',
    sample: 'fruits.last',
    hints: [
      'last is a property, not a method',
      'Throws StateError if list is empty',
    ],
    validPatterns: [/\.last(?!\()/],
    tags: ['last', 'access', 'lists'],
  },

  {
    id: 'dart-list-009',
    category: 'List Methods',
    difficulty: 'medium',
    title: 'Take First N Elements',
    text: 'Take the first 3 elements from the list using `take`.',
    setup: 'var numbers = [1, 2, 3, 4, 5, 6, 7];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5, 6, 7];',
    expected: [1, 2, 3],
    sample: 'numbers.take(3).toList()',
    hints: [
      'take() returns an Iterable',
      'If count exceeds length, returns all elements',
    ],
    validPatterns: [/\.take\s*\(\s*3\s*\)/],
    tags: ['take', 'slice', 'lists'],
  },

  {
    id: 'dart-list-010',
    category: 'List Methods',
    difficulty: 'medium',
    title: 'Skip First N Elements',
    text: 'Skip the first 2 elements and get the rest using `skip`.',
    setup: 'var numbers = [1, 2, 3, 4, 5];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5];',
    expected: [3, 4, 5],
    sample: 'numbers.skip(2).toList()',
    hints: [
      'skip() returns an Iterable',
      'If count exceeds length, returns empty Iterable',
    ],
    validPatterns: [/\.skip\s*\(\s*2\s*\)/],
    tags: ['skip', 'slice', 'lists'],
  },

  // ============================================================
  // String Methods
  // ============================================================

  {
    id: 'dart-string-001',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Get String Length',
    text: 'Get the length of the string using the `length` property.',
    setup: 'var text = "Hello, Dart!";',
    setupCode: 'var text = "Hello, Dart!";',
    expected: 12,
    sample: 'text.length',
    hints: ['length is a property, not a method', 'Includes all characters including spaces'],
    validPatterns: [/\.length(?!\()/],
    tags: ['length', 'property', 'strings'],
  },

  {
    id: 'dart-string-002',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Convert to Lowercase',
    text: 'Convert the string to lowercase using `toLowerCase`.',
    setup: 'var text = "HELLO WORLD";',
    setupCode: 'var text = "HELLO WORLD";',
    expected: 'hello world',
    sample: 'text.toLowerCase()',
    hints: ['toLowerCase() returns a new string', 'Original string is unchanged'],
    validPatterns: [/\.toLowerCase\s*\(\s*\)/],
    tags: ['toLowerCase', 'case', 'strings'],
  },

  {
    id: 'dart-string-003',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Convert to Uppercase',
    text: 'Convert the string to uppercase using `toUpperCase`.',
    setup: 'var text = "hello world";',
    setupCode: 'var text = "hello world";',
    expected: 'HELLO WORLD',
    sample: 'text.toUpperCase()',
    hints: ['toUpperCase() returns a new string', 'Original string is unchanged'],
    validPatterns: [/\.toUpperCase\s*\(\s*\)/],
    tags: ['toUpperCase', 'case', 'strings'],
  },

  {
    id: 'dart-string-004',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Split String by Delimiter',
    text: 'Split the string by comma using `split`.',
    setup: 'var csv = "apple,banana,cherry";',
    setupCode: 'var csv = "apple,banana,cherry";',
    expected: ['apple', 'banana', 'cherry'],
    sample: 'csv.split(",")',
    hints: ['split() returns a List<String>', 'Can split by any pattern'],
    validPatterns: [/\.split\s*\(\s*['"],['"]?\s*\)/],
    tags: ['split', 'parse', 'strings'],
  },

  {
    id: 'dart-string-005',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Check if String Contains Substring',
    text: 'Check if the string contains the word "Dart" using `contains`.',
    setup: 'var text = "I love Dart programming";',
    setupCode: 'var text = "I love Dart programming";',
    expected: true,
    sample: 'text.contains("Dart")',
    hints: ['contains() is case-sensitive', 'Can also use a RegExp pattern'],
    validPatterns: [/\.contains\s*\(\s*["']Dart["']\s*\)/],
    tags: ['contains', 'search', 'strings'],
  },

  {
    id: 'dart-string-006',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Replace All Occurrences',
    text: 'Replace all spaces with underscores using `replaceAll`.',
    setup: 'var text = "hello world dart";',
    setupCode: 'var text = "hello world dart";',
    expected: 'hello_world_dart',
    sample: 'text.replaceAll(" ", "_")',
    hints: ['replaceAll() replaces all occurrences', 'Can use RegExp for pattern matching'],
    validPatterns: [/\.replaceAll\s*\(/],
    tags: ['replaceAll', 'replace', 'strings'],
  },

  {
    id: 'dart-string-007',
    category: 'String Methods',
    difficulty: 'easy',
    title: 'Trim Whitespace',
    text: 'Remove leading and trailing whitespace using `trim`.',
    setup: 'var text = "   hello world   ";',
    setupCode: 'var text = "   hello world   ";',
    expected: 'hello world',
    sample: 'text.trim()',
    hints: ['trim() removes leading and trailing whitespace', 'Use trimLeft() or trimRight() for one side'],
    validPatterns: [/\.trim\s*\(\s*\)/],
    tags: ['trim', 'whitespace', 'strings'],
  },

  {
    id: 'dart-string-008',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Check if Starts With',
    text: 'Check if the string starts with "Hello" using `startsWith`.',
    setup: 'var text = "Hello, World!";',
    setupCode: 'var text = "Hello, World!";',
    expected: true,
    sample: 'text.startsWith("Hello")',
    hints: ['startsWith() is case-sensitive', 'Can specify a starting index as second argument'],
    validPatterns: [/\.startsWith\s*\(\s*["']Hello["']\s*\)/],
    tags: ['startsWith', 'prefix', 'strings'],
  },

  {
    id: 'dart-string-009',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Check if Ends With',
    text: 'Check if the string ends with ".dart" using `endsWith`.',
    setup: 'var filename = "main.dart";',
    setupCode: 'var filename = "main.dart";',
    expected: true,
    sample: 'filename.endsWith(".dart")',
    hints: ['endsWith() is case-sensitive', 'Useful for checking file extensions'],
    validPatterns: [/\.endsWith\s*\(\s*["']\.dart["']\s*\)/],
    tags: ['endsWith', 'suffix', 'strings'],
  },

  {
    id: 'dart-string-010',
    category: 'String Methods',
    difficulty: 'hard',
    title: 'Split and Transform',
    text: 'Split the string by spaces and convert each word to uppercase.',
    setup: 'var text = "hello dart world";',
    setupCode: 'var text = "hello dart world";',
    expected: ['HELLO', 'DART', 'WORLD'],
    sample: 'text.split(" ").map((w) => w.toUpperCase()).toList()',
    hints: ['Chain split() with map()', 'Remember to call toList() at the end'],
    validPatterns: [/\.split\s*\(.*\)\.map\s*\(/],
    tags: ['split', 'map', 'transform', 'strings'],
  },

  // ============================================================
  // Map Methods
  // ============================================================

  {
    id: 'dart-map-001',
    category: 'Map Methods',
    difficulty: 'easy',
    title: 'Check if Key Exists',
    text: 'Check if the map contains the key "name" using `containsKey`.',
    setup: 'var person = {"name": "Alice", "age": 30};',
    setupCode: 'var person = {"name": "Alice", "age": 30};',
    expected: true,
    sample: 'person.containsKey("name")',
    hints: ['containsKey() returns a bool', 'Does not check for null values'],
    validPatterns: [/\.containsKey\s*\(\s*["']name["']\s*\)/],
    tags: ['containsKey', 'search', 'maps'],
  },

  {
    id: 'dart-map-002',
    category: 'Map Methods',
    difficulty: 'easy',
    title: 'Check if Value Exists',
    text: 'Check if the map contains the value "Alice" using `containsValue`.',
    setup: 'var person = {"name": "Alice", "age": 30};',
    setupCode: 'var person = {"name": "Alice", "age": 30};',
    expected: true,
    sample: 'person.containsValue("Alice")',
    hints: ['containsValue() returns a bool', 'Uses == for comparison'],
    validPatterns: [/\.containsValue\s*\(\s*["']Alice["']\s*\)/],
    tags: ['containsValue', 'search', 'maps'],
  },

  {
    id: 'dart-map-003',
    category: 'Map Methods',
    difficulty: 'medium',
    title: 'Put If Absent',
    text: 'Add key "city" with value "NYC" only if it does not exist using `putIfAbsent`.',
    setup: 'var person = {"name": "Alice"};',
    setupCode: 'var person = {"name": "Alice"};',
    expected: { name: 'Alice', city: 'NYC' },
    sample: 'person.putIfAbsent("city", () => "NYC")',
    hints: [
      'putIfAbsent takes a key and a function that returns the value',
      'The function is only called if key is absent',
    ],
    validPatterns: [/\.putIfAbsent\s*\(\s*["']city["']/],
    tags: ['putIfAbsent', 'add', 'maps'],
  },

  {
    id: 'dart-map-004',
    category: 'Map Methods',
    difficulty: 'easy',
    title: 'Remove Entry by Key',
    text: 'Remove the entry with key "age" using `remove`.',
    setup: 'var person = {"name": "Alice", "age": 30, "city": "NYC"};',
    setupCode: 'var person = {"name": "Alice", "age": 30, "city": "NYC"};',
    expected: { name: 'Alice', city: 'NYC' },
    sample: 'person.remove("age"); // returns the removed value',
    hints: ['remove() returns the removed value or null', 'Modifies the map in place'],
    validPatterns: [/\.remove\s*\(\s*["']age["']\s*\)/],
    tags: ['remove', 'delete', 'maps'],
  },

  {
    id: 'dart-map-005',
    category: 'Map Methods',
    difficulty: 'easy',
    title: 'Get All Keys',
    text: 'Get all keys from the map using the `keys` property.',
    setup: 'var scores = {"Alice": 90, "Bob": 85, "Charlie": 92};',
    setupCode: 'var scores = {"Alice": 90, "Bob": 85, "Charlie": 92};',
    expected: ['Alice', 'Bob', 'Charlie'],
    sample: 'scores.keys.toList()',
    hints: ['keys returns an Iterable', 'Use toList() to convert to a List'],
    validPatterns: [/\.keys/],
    tags: ['keys', 'iterate', 'maps'],
  },

  {
    id: 'dart-map-006',
    category: 'Map Methods',
    difficulty: 'easy',
    title: 'Get All Values',
    text: 'Get all values from the map using the `values` property.',
    setup: 'var scores = {"Alice": 90, "Bob": 85, "Charlie": 92};',
    setupCode: 'var scores = {"Alice": 90, "Bob": 85, "Charlie": 92};',
    expected: [90, 85, 92],
    sample: 'scores.values.toList()',
    hints: ['values returns an Iterable', 'Use toList() to convert to a List'],
    validPatterns: [/\.values/],
    tags: ['values', 'iterate', 'maps'],
  },

  {
    id: 'dart-map-007',
    category: 'Map Methods',
    difficulty: 'medium',
    title: 'Update Value',
    text: 'Update the score for "Alice" to 95 using `update`.',
    setup: 'var scores = {"Alice": 90, "Bob": 85};',
    setupCode: 'var scores = {"Alice": 90, "Bob": 85};',
    expected: { Alice: 95, Bob: 85 },
    sample: 'scores.update("Alice", (value) => 95)',
    hints: [
      'update() takes a key and an update function',
      'Can provide ifAbsent for missing keys',
    ],
    validPatterns: [/\.update\s*\(\s*["']Alice["']/],
    tags: ['update', 'modify', 'maps'],
  },

  {
    id: 'dart-map-008',
    category: 'Map Methods',
    difficulty: 'medium',
    title: 'Map Entries',
    text: 'Get all entries as a list of MapEntry objects.',
    setup: 'var data = {"a": 1, "b": 2};',
    setupCode: 'var data = {"a": 1, "b": 2};',
    expected: [
      ['a', 1],
      ['b', 2],
    ],
    sample: 'data.entries.map((e) => [e.key, e.value]).toList()',
    hints: [
      'entries returns Iterable<MapEntry>',
      'Each MapEntry has key and value properties',
    ],
    validPatterns: [/\.entries/],
    tags: ['entries', 'iterate', 'maps'],
  },

  {
    id: 'dart-map-009',
    category: 'Map Methods',
    difficulty: 'hard',
    title: 'Transform Map Values',
    text: 'Double all values in the map using `map`.',
    setup: 'var scores = {"Alice": 10, "Bob": 20, "Charlie": 30};',
    setupCode: 'var scores = {"Alice": 10, "Bob": 20, "Charlie": 30};',
    expected: { Alice: 20, Bob: 40, Charlie: 60 },
    sample: 'scores.map((key, value) => MapEntry(key, value * 2))',
    hints: [
      'map() on Map takes a function with key and value parameters',
      'Return a MapEntry for each transformation',
    ],
    validPatterns: [/\.map\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)/],
    tags: ['map', 'transform', 'maps'],
  },

  {
    id: 'dart-map-010',
    category: 'Map Methods',
    difficulty: 'hard',
    title: 'Filter Map by Value',
    text: 'Keep only entries where the value is greater than 50.',
    setup: 'var scores = {"Alice": 45, "Bob": 78, "Charlie": 92, "Diana": 30};',
    setupCode: 'var scores = {"Alice": 45, "Bob": 78, "Charlie": 92, "Diana": 30};',
    expected: { Bob: 78, Charlie: 92 },
    sample: 'Map.fromEntries(scores.entries.where((e) => e.value > 50))',
    hints: [
      'Filter entries using where()',
      'Convert back to Map using Map.fromEntries()',
    ],
    validPatterns: [/\.entries\.where\s*\(/],
    tags: ['filter', 'where', 'maps'],
  },

  // ============================================================
  // Set Operations
  // ============================================================

  {
    id: 'dart-set-001',
    category: 'Set Operations',
    difficulty: 'easy',
    title: 'Add Element to Set',
    text: 'Add the number 4 to the set using `add`.',
    setup: 'var numbers = {1, 2, 3};',
    setupCode: 'var numbers = {1, 2, 3};',
    expected: [1, 2, 3, 4],
    sample: 'numbers.add(4); // returns true if added',
    hints: ['add() returns true if element was added', 'Duplicate elements are ignored'],
    validPatterns: [/\.add\s*\(\s*4\s*\)/],
    tags: ['add', 'insert', 'sets'],
  },

  {
    id: 'dart-set-002',
    category: 'Set Operations',
    difficulty: 'easy',
    title: 'Remove Element from Set',
    text: 'Remove the number 2 from the set using `remove`.',
    setup: 'var numbers = {1, 2, 3, 4};',
    setupCode: 'var numbers = {1, 2, 3, 4};',
    expected: [1, 3, 4],
    sample: 'numbers.remove(2); // returns true if removed',
    hints: ['remove() returns true if element was removed', 'Returns false if element not found'],
    validPatterns: [/\.remove\s*\(\s*2\s*\)/],
    tags: ['remove', 'delete', 'sets'],
  },

  {
    id: 'dart-set-003',
    category: 'Set Operations',
    difficulty: 'easy',
    title: 'Check if Set Contains Element',
    text: 'Check if the set contains the number 3 using `contains`.',
    setup: 'var numbers = {1, 2, 3, 4, 5};',
    setupCode: 'var numbers = {1, 2, 3, 4, 5};',
    expected: true,
    sample: 'numbers.contains(3)',
    hints: ['contains() returns a bool', 'Set lookup is O(1) on average'],
    validPatterns: [/\.contains\s*\(\s*3\s*\)/],
    tags: ['contains', 'search', 'sets'],
  },

  {
    id: 'dart-set-004',
    category: 'Set Operations',
    difficulty: 'medium',
    title: 'Union of Two Sets',
    text: 'Get the union of two sets using `union`.',
    setup: 'var set1 = {1, 2, 3};\nvar set2 = {3, 4, 5};',
    setupCode: 'var set1 = {1, 2, 3};\nvar set2 = {3, 4, 5};',
    expected: [1, 2, 3, 4, 5],
    sample: 'set1.union(set2)',
    hints: ['union() returns a new Set', 'Contains all elements from both sets'],
    validPatterns: [/\.union\s*\(\s*set2\s*\)/],
    tags: ['union', 'combine', 'sets'],
  },

  {
    id: 'dart-set-005',
    category: 'Set Operations',
    difficulty: 'medium',
    title: 'Intersection of Two Sets',
    text: 'Get the intersection of two sets using `intersection`.',
    setup: 'var set1 = {1, 2, 3, 4};\nvar set2 = {3, 4, 5, 6};',
    setupCode: 'var set1 = {1, 2, 3, 4};\nvar set2 = {3, 4, 5, 6};',
    expected: [3, 4],
    sample: 'set1.intersection(set2)',
    hints: ['intersection() returns a new Set', 'Contains only elements present in both sets'],
    validPatterns: [/\.intersection\s*\(\s*set2\s*\)/],
    tags: ['intersection', 'common', 'sets'],
  },

  {
    id: 'dart-set-006',
    category: 'Set Operations',
    difficulty: 'medium',
    title: 'Difference of Two Sets',
    text: 'Get elements in set1 that are not in set2 using `difference`.',
    setup: 'var set1 = {1, 2, 3, 4};\nvar set2 = {3, 4, 5, 6};',
    setupCode: 'var set1 = {1, 2, 3, 4};\nvar set2 = {3, 4, 5, 6};',
    expected: [1, 2],
    sample: 'set1.difference(set2)',
    hints: ['difference() returns a new Set', 'Order matters: set1.difference(set2) != set2.difference(set1)'],
    validPatterns: [/\.difference\s*\(\s*set2\s*\)/],
    tags: ['difference', 'subtract', 'sets'],
  },

  {
    id: 'dart-set-007',
    category: 'Set Operations',
    difficulty: 'easy',
    title: 'Add Multiple Elements',
    text: 'Add elements 5, 6, 7 to the set using `addAll`.',
    setup: 'var numbers = {1, 2, 3, 4};',
    setupCode: 'var numbers = {1, 2, 3, 4};',
    expected: [1, 2, 3, 4, 5, 6, 7],
    sample: 'numbers.addAll([5, 6, 7])',
    hints: ['addAll() accepts any Iterable', 'Duplicates are automatically ignored'],
    validPatterns: [/\.addAll\s*\(/],
    tags: ['addAll', 'insert', 'sets'],
  },

  {
    id: 'dart-set-008',
    category: 'Set Operations',
    difficulty: 'medium',
    title: 'Convert List to Set',
    text: 'Remove duplicates from the list by converting to a Set.',
    setup: 'var numbers = [1, 2, 2, 3, 3, 3, 4];',
    setupCode: 'var numbers = [1, 2, 2, 3, 3, 3, 4];',
    expected: [1, 2, 3, 4],
    sample: 'numbers.toSet().toList()',
    hints: ['toSet() removes duplicates', 'Order may not be preserved in all cases'],
    validPatterns: [/\.toSet\s*\(\s*\)/],
    tags: ['toSet', 'deduplicate', 'sets'],
  },

  {
    id: 'dart-set-009',
    category: 'Set Operations',
    difficulty: 'hard',
    title: 'Symmetric Difference',
    text: 'Get elements that are in either set but not in both.',
    setup: 'var set1 = {1, 2, 3};\nvar set2 = {2, 3, 4};',
    setupCode: 'var set1 = {1, 2, 3};\nvar set2 = {2, 3, 4};',
    expected: [1, 4],
    sample: 'set1.difference(set2).union(set2.difference(set1))',
    hints: [
      'Symmetric difference = (A - B) union (B - A)',
      'Elements in A or B but not both',
    ],
    validPatterns: [/\.difference\s*\(.*\)\.union\s*\(/],
    tags: ['difference', 'union', 'symmetric', 'sets'],
  },

  {
    id: 'dart-set-010',
    category: 'Set Operations',
    difficulty: 'hard',
    title: 'Filter Set Elements',
    text: 'Keep only even numbers in the set using `where`.',
    setup: 'var numbers = {1, 2, 3, 4, 5, 6, 7, 8};',
    setupCode: 'var numbers = {1, 2, 3, 4, 5, 6, 7, 8};',
    expected: [2, 4, 6, 8],
    sample: 'numbers.where((n) => n % 2 == 0).toSet()',
    hints: ['where() works on Sets too', 'Returns an Iterable, use toSet() to keep as Set'],
    validPatterns: [/\.where\s*\(.*%\s*2\s*==\s*0.*\)/],
    tags: ['where', 'filter', 'sets'],
  },

  // ============================================================
  // Null Safety
  // ============================================================

  {
    id: 'dart-null-001',
    category: 'Null Safety',
    difficulty: 'easy',
    title: 'Nullable Type Declaration',
    text: 'Declare a nullable String variable that can hold null.',
    setup: '// Declare a nullable String',
    setupCode: '// Declare a nullable String',
    expected: null,
    sample: 'String? name = null;',
    hints: ['Use ? after the type to make it nullable', 'Without ?, the variable cannot be null'],
    validPatterns: [/String\?\s+\w+\s*=\s*null/],
    tags: ['nullable', 'declaration', 'null-safety'],
  },

  {
    id: 'dart-null-002',
    category: 'Null Safety',
    difficulty: 'easy',
    title: 'Null-Aware Access',
    text: 'Safely get the length of a nullable string using `?.`.',
    setup: 'String? name = "Alice";',
    setupCode: 'String? name = "Alice";',
    expected: 5,
    sample: 'name?.length',
    hints: ['?. returns null if the object is null', 'Otherwise returns the property value'],
    validPatterns: [/\?\.\s*length/],
    tags: ['?.', 'safe-access', 'null-safety'],
  },

  {
    id: 'dart-null-003',
    category: 'Null Safety',
    difficulty: 'easy',
    title: 'Default Value with ??',
    text: 'Get the value or a default of "Unknown" using `??`.',
    setup: 'String? name = null;',
    setupCode: 'String? name = null;',
    expected: 'Unknown',
    sample: 'name ?? "Unknown"',
    hints: ['?? returns the right side if left is null', 'Short-circuits: right side only evaluated if needed'],
    validPatterns: [/\?\?\s*["']Unknown["']/],
    tags: ['??', 'default', 'null-safety'],
  },

  {
    id: 'dart-null-004',
    category: 'Null Safety',
    difficulty: 'medium',
    title: 'Null-Aware Assignment',
    text: 'Assign a value only if the variable is null using `??=`.',
    setup: 'String? name = null;',
    setupCode: 'String? name = null;',
    expected: 'Default',
    sample: 'name ??= "Default"; // name is now "Default"',
    hints: ['??= assigns only if variable is null', 'Does nothing if already has a value'],
    validPatterns: [/\?\?=\s*["']Default["']/],
    tags: ['??=', 'assign', 'null-safety'],
  },

  {
    id: 'dart-null-005',
    category: 'Null Safety',
    difficulty: 'medium',
    title: 'Chain Null-Aware Access',
    text: 'Safely access nested property using chained `?.`.',
    setup: 'Map<String, dynamic>? user = {"profile": {"name": "Alice"}};',
    setupCode: 'Map<String, dynamic>? user = {"profile": {"name": "Alice"}};',
    expected: 'Alice',
    sample: 'user?["profile"]?["name"]',
    hints: [
      'Chain ?. for nested access',
      'Any null in the chain returns null',
    ],
    validPatterns: [/\?\[.*\]\?\[/],
    tags: ['?.', 'chain', 'nested', 'null-safety'],
  },

  {
    id: 'dart-null-006',
    category: 'Null Safety',
    difficulty: 'medium',
    title: 'Null-Aware Method Call',
    text: 'Call toUpperCase only if the string is not null.',
    setup: 'String? text = "hello";',
    setupCode: 'String? text = "hello";',
    expected: 'HELLO',
    sample: 'text?.toUpperCase()',
    hints: ['?. works with method calls too', 'Returns null if object is null'],
    validPatterns: [/\?\.toUpperCase\s*\(\s*\)/],
    tags: ['?.', 'method', 'null-safety'],
  },

  {
    id: 'dart-null-007',
    category: 'Null Safety',
    difficulty: 'hard',
    title: 'Combine Null Operators',
    text: 'Get uppercase of string or "N/A" if null.',
    setup: 'String? text = null;',
    setupCode: 'String? text = null;',
    expected: 'N/A',
    sample: 'text?.toUpperCase() ?? "N/A"',
    hints: [
      'Combine ?. with ?? for safe access with default',
      'First check null, then provide default',
    ],
    validPatterns: [/\?\.toUpperCase\s*\(\s*\)\s*\?\?/],
    tags: ['?.', '??', 'combine', 'null-safety'],
  },

  {
    id: 'dart-null-008',
    category: 'Null Safety',
    difficulty: 'medium',
    title: 'Non-Null Assertion',
    text: 'Assert the value is not null and get its length using `!`.',
    setup: 'String? name = "Alice";',
    setupCode: 'String? name = "Alice";',
    expected: 5,
    sample: 'name!.length',
    hints: [
      '! asserts the value is not null',
      'Throws if value is actually null - use carefully',
    ],
    validPatterns: [/!\s*\.length/],
    tags: ['!', 'assertion', 'null-safety'],
  },

  {
    id: 'dart-null-009',
    category: 'Null Safety',
    difficulty: 'hard',
    title: 'Late Initialization',
    text: 'Declare a late-initialized non-nullable variable.',
    setup: '// Declare a late variable',
    setupCode: '// Declare a late variable',
    expected: 'late String name;',
    sample: 'late String name; // initialized later',
    hints: [
      'late allows non-nullable without immediate initialization',
      'Must be assigned before first read',
    ],
    validPatterns: [/late\s+String\s+\w+/],
    tags: ['late', 'initialization', 'null-safety'],
  },

  {
    id: 'dart-null-010',
    category: 'Null Safety',
    difficulty: 'hard',
    title: 'Null-Aware Spread',
    text: 'Spread a nullable list only if it is not null.',
    setup: 'List<int>? moreNumbers = [4, 5, 6];\nvar numbers = [1, 2, 3];',
    setupCode: 'List<int>? moreNumbers = [4, 5, 6];\nvar numbers = [1, 2, 3];',
    expected: [1, 2, 3, 4, 5, 6],
    sample: '[...numbers, ...?moreNumbers]',
    hints: [
      '...? is the null-aware spread operator',
      'Spreads nothing if the list is null',
    ],
    validPatterns: [/\.\.\.\?/],
    tags: ['...?', 'spread', 'null-safety'],
  },

  // ============================================================
  // Additional List Methods (Hard)
  // ============================================================

  {
    id: 'dart-list-011',
    category: 'List Methods',
    difficulty: 'hard',
    title: 'Fold to Product',
    text: 'Calculate the product of all numbers using `fold`.',
    setup: 'var numbers = [1, 2, 3, 4, 5];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5];',
    expected: 120,
    sample: 'numbers.fold(1, (product, n) => product * n)',
    hints: [
      'Start with 1 for multiplication (identity)',
      'fold is more flexible than reduce for this case',
    ],
    validPatterns: [/\.fold\s*\(\s*1/],
    tags: ['fold', 'product', 'reduce'],
  },

  {
    id: 'dart-list-012',
    category: 'List Methods',
    difficulty: 'hard',
    title: 'Sort with Custom Comparator',
    text: 'Sort strings by length in descending order.',
    setup: 'var words = ["cat", "elephant", "dog", "butterfly"];',
    setupCode: 'var words = ["cat", "elephant", "dog", "butterfly"];',
    expected: ['butterfly', 'elephant', 'cat', 'dog'],
    sample: 'words..sort((a, b) => b.length.compareTo(a.length))',
    hints: [
      'sort() accepts a compare function',
      'Reverse comparison order for descending',
    ],
    validPatterns: [/\.sort\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)/],
    tags: ['sort', 'comparator', 'custom'],
  },

  {
    id: 'dart-list-013',
    category: 'List Methods',
    difficulty: 'medium',
    title: 'Expand Nested Lists',
    text: 'Flatten a list of lists using `expand`.',
    setup: 'var nested = [[1, 2], [3, 4], [5, 6]];',
    setupCode: 'var nested = [[1, 2], [3, 4], [5, 6]];',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'nested.expand((list) => list).toList()',
    hints: [
      'expand() flattens one level of nesting',
      'Similar to flatMap in other languages',
    ],
    validPatterns: [/\.expand\s*\(/],
    tags: ['expand', 'flatten', 'lists'],
  },

  {
    id: 'dart-list-014',
    category: 'List Methods',
    difficulty: 'medium',
    title: 'Find First Match',
    text: 'Find the first number greater than 5 using `firstWhere`.',
    setup: 'var numbers = [1, 3, 5, 7, 9, 11];',
    setupCode: 'var numbers = [1, 3, 5, 7, 9, 11];',
    expected: 7,
    sample: 'numbers.firstWhere((n) => n > 5)',
    hints: [
      'firstWhere throws if no match found',
      'Use orElse parameter for a default value',
    ],
    validPatterns: [/\.firstWhere\s*\(/],
    tags: ['firstWhere', 'find', 'search'],
  },

  {
    id: 'dart-list-015',
    category: 'List Methods',
    difficulty: 'medium',
    title: 'Check Any Match',
    text: 'Check if any number is negative using `any`.',
    setup: 'var numbers = [1, -2, 3, 4, 5];',
    setupCode: 'var numbers = [1, -2, 3, 4, 5];',
    expected: true,
    sample: 'numbers.any((n) => n < 0)',
    hints: ['any() returns true if at least one matches', 'Short-circuits on first match'],
    validPatterns: [/\.any\s*\(/],
    tags: ['any', 'predicate', 'check'],
  },

  {
    id: 'dart-list-016',
    category: 'List Methods',
    difficulty: 'medium',
    title: 'Check All Match',
    text: 'Check if all numbers are positive using `every`.',
    setup: 'var numbers = [1, 2, 3, 4, 5];',
    setupCode: 'var numbers = [1, 2, 3, 4, 5];',
    expected: true,
    sample: 'numbers.every((n) => n > 0)',
    hints: ['every() returns true if all elements match', 'Returns true for empty list'],
    validPatterns: [/\.every\s*\(/],
    tags: ['every', 'predicate', 'check'],
  },

  // ============================================================
  // Additional String Methods (Hard)
  // ============================================================

  {
    id: 'dart-string-011',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Pad String Left',
    text: 'Pad the number string to width 5 with leading zeros.',
    setup: 'var number = "42";',
    setupCode: 'var number = "42";',
    expected: '00042',
    sample: 'number.padLeft(5, "0")',
    hints: ['padLeft adds padding to the left', 'Second argument is the padding character'],
    validPatterns: [/\.padLeft\s*\(\s*5\s*,\s*["']0["']\s*\)/],
    tags: ['padLeft', 'format', 'strings'],
  },

  {
    id: 'dart-string-012',
    category: 'String Methods',
    difficulty: 'medium',
    title: 'Get Substring',
    text: 'Extract "World" from the string using `substring`.',
    setup: 'var text = "Hello, World!";',
    setupCode: 'var text = "Hello, World!";',
    expected: 'World',
    sample: 'text.substring(7, 12)',
    hints: ['substring(start, end) - end is exclusive', 'Indices are 0-based'],
    validPatterns: [/\.substring\s*\(\s*7\s*,\s*12\s*\)/],
    tags: ['substring', 'extract', 'strings'],
  },

  {
    id: 'dart-string-013',
    category: 'String Methods',
    difficulty: 'hard',
    title: 'Replace with Regex',
    text: 'Remove all digits from the string.',
    setup: 'var text = "abc123def456";',
    setupCode: 'var text = "abc123def456";',
    expected: 'abcdef',
    sample: 'text.replaceAll(RegExp(r"\\d"), "")',
    hints: ['Use RegExp for pattern matching', 'r"" is a raw string for regex'],
    validPatterns: [/\.replaceAll\s*\(\s*RegExp\s*\(/],
    tags: ['replaceAll', 'regex', 'strings'],
  },

  {
    id: 'dart-string-014',
    category: 'String Methods',
    difficulty: 'hard',
    title: 'Split by Regex',
    text: 'Split the string by one or more spaces.',
    setup: 'var text = "hello   world  dart";',
    setupCode: 'var text = "hello   world  dart";',
    expected: ['hello', 'world', 'dart'],
    sample: 'text.split(RegExp(r"\\s+"))',
    hints: ['Use RegExp for pattern-based splitting', '\\s+ matches one or more whitespace'],
    validPatterns: [/\.split\s*\(\s*RegExp\s*\(/],
    tags: ['split', 'regex', 'strings'],
  },

  // ============================================================
  // Advanced Dart - Iterable Methods
  // ============================================================

  {
    id: 'dart-adv-001',
    category: 'Iterable Methods',
    difficulty: 'easy',
    title: 'Expand Nested Lists',
    text: 'Use the `expand()` method to flatten a list of lists into a single list.',
    setup: 'final nested = [[1, 2], [3, 4], [5, 6]];',
    setupCode: 'final nested = [[1, 2], [3, 4], [5, 6]];',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'nested.expand((list) => list).toList() // returns [1, 2, 3, 4, 5, 6]',
    hints: [
      'expand() transforms each element into zero or more elements',
      'The function should return an Iterable for each element',
      'Call toList() to convert the Iterable result to a List',
    ],
    validPatterns: [
      /\.expand\s*\(\s*\([^)]*\)\s*=>\s*[^)]+\)\s*\.toList\s*\(\s*\)/,
      /\.expand\s*\([^)]+\)\s*\.toList\s*\(\s*\)/,
    ],
    tags: ['expand', 'iterable', 'flatten', 'nested'],
  },

  {
    id: 'dart-adv-002',
    category: 'Iterable Methods',
    difficulty: 'easy',
    title: 'Filter by Type with whereType',
    text: 'Use `whereType<int>()` to extract only integers from a mixed-type list.',
    setup: 'final mixed = [1, "hello", 2, true, 3, "world", 4];',
    setupCode: 'final mixed = [1, "hello", 2, true, 3, "world", 4];',
    expected: [1, 2, 3, 4],
    sample: 'mixed.whereType<int>().toList() // returns [1, 2, 3, 4]',
    hints: [
      'whereType<T>() filters elements by their runtime type',
      'It only keeps elements that are instances of T',
      'More type-safe than using where() with is checks',
    ],
    validPatterns: [
      /\.whereType\s*<\s*int\s*>\s*\(\s*\)\s*\.toList\s*\(\s*\)/,
      /whereType<int>\(\)/,
    ],
    tags: ['whereType', 'type-filtering', 'iterable', 'generics'],
  },

  {
    id: 'dart-adv-003',
    category: 'Iterable Methods',
    difficulty: 'easy',
    title: 'Cast List to Specific Type',
    text: 'Use `cast<num>()` to cast a List<int> to List<num>.',
    setup: 'final integers = <int>[1, 2, 3, 4, 5];',
    setupCode: 'final integers = <int>[1, 2, 3, 4, 5];',
    expected: [1, 2, 3, 4, 5],
    sample: 'integers.cast<num>().toList() // returns List<num>',
    hints: [
      'cast<T>() creates a view with the new type',
      'Useful when you need a supertype list',
      'Throws if elements cannot be cast at runtime',
    ],
    validPatterns: [/\.cast\s*<\s*num\s*>\s*\(\s*\)/, /cast<num>\(\)/],
    tags: ['cast', 'type-casting', 'iterable', 'generics'],
  },

  // ============================================================
  // Advanced Dart - Cascade Notation
  // ============================================================

  {
    id: 'dart-adv-004',
    category: 'Cascade Notation',
    difficulty: 'easy',
    title: 'Basic Cascade Operations',
    text: 'Use cascade notation (..) to add multiple elements to a list in a single expression.',
    setup: 'final numbers = <int>[];',
    setupCode: 'final numbers = <int>[];',
    expected: [1, 2, 3],
    sample: 'numbers..add(1)..add(2)..add(3) // numbers is now [1, 2, 3]',
    hints: [
      'Cascade notation (..) returns the target object, not the method result',
      'Allows chaining multiple operations on the same object',
      'Each .. calls a method and returns the original object',
    ],
    validPatterns: [
      /\.\.\s*add\s*\(\s*1\s*\)\s*\.\.\s*add\s*\(\s*2\s*\)\s*\.\.\s*add\s*\(\s*3\s*\)/,
      /\.\.add\(1\)\.\.add\(2\)\.\.add\(3\)/,
    ],
    tags: ['cascade', 'notation', 'chaining', 'fluent'],
  },

  {
    id: 'dart-adv-005',
    category: 'Cascade Notation',
    difficulty: 'medium',
    title: 'Cascade with Object Configuration',
    text: 'Use cascade notation to configure a StringBuffer and return its string value.',
    setup: 'final buffer = StringBuffer();',
    setupCode: 'final buffer = StringBuffer();',
    expected: 'Hello, World!',
    sample:
      '(buffer..write("Hello")..write(", ")..write("World!")).toString()',
    hints: [
      'Cascade returns the object, not method return values',
      'Chain multiple write() calls with cascades',
      'Call toString() at the end to get the result',
    ],
    validPatterns: [
      /buffer\s*\.\.\s*write.*\.\.\s*write.*\.toString\s*\(\s*\)/,
      /\.\.write\(["']Hello["']\)/,
    ],
    tags: ['cascade', 'StringBuffer', 'configuration', 'builder'],
  },

  {
    id: 'dart-adv-006',
    category: 'Cascade Notation',
    difficulty: 'medium',
    title: 'Null-aware Cascade',
    text: 'Use null-aware cascade (?..) to safely configure a nullable list.',
    setup: 'List<int>? numbers = [];',
    setupCode: 'List<int>? numbers = [];',
    expected: [1, 2, 3],
    sample: 'numbers?..add(1)..add(2)..add(3) // safe if numbers is null',
    hints: [
      'Null-aware cascade (?..) only executes if object is not null',
      'The first cascade uses ?.. subsequent ones use ..',
      'If object is null, the entire chain is skipped',
    ],
    validPatterns: [/\?\.\.\s*add/, /\?\.\./],
    tags: ['cascade', 'null-aware', 'null-safety', 'chaining'],
  },

  // ============================================================
  // Advanced Dart - Spread Operator
  // ============================================================

  {
    id: 'dart-adv-007',
    category: 'Spread Operator',
    difficulty: 'easy',
    title: 'Combine Lists with Spread',
    text: 'Use the spread operator (...) to combine two lists into one.',
    setup: 'final first = [1, 2, 3];\nfinal second = [4, 5, 6];',
    setupCode: 'final first = [1, 2, 3];\nfinal second = [4, 5, 6];',
    expected: [1, 2, 3, 4, 5, 6],
    sample: '[...first, ...second] // returns [1, 2, 3, 4, 5, 6]',
    hints: [
      'The spread operator (...) unpacks elements from a collection',
      'Can combine multiple collections in a single list literal',
      'Works with List, Set, and other iterables',
    ],
    validPatterns: [
      /\[\s*\.\.\.first\s*,\s*\.\.\.second\s*\]/,
      /\[\s*\.\.\.first,\s*\.\.\.second\s*\]/,
    ],
    tags: ['spread', 'operator', 'combine', 'collections'],
  },

  {
    id: 'dart-adv-008',
    category: 'Spread Operator',
    difficulty: 'medium',
    title: 'Null-aware Spread Operator',
    text: 'Use the null-aware spread operator (...?) to safely combine lists where one might be null.',
    setup: 'final listA = [1, 2, 3];\nList<int>? listB = null;',
    setupCode: 'final listA = [1, 2, 3];\nList<int>? listB = null;',
    expected: [1, 2, 3],
    sample: '[...listA, ...?listB] // returns [1, 2, 3]',
    hints: [
      'The null-aware spread (...?) skips null collections',
      'Prevents null errors when spreading nullable lists',
      'The ? comes after the three dots',
    ],
    validPatterns: [
      /\[\s*\.\.\.listA\s*,\s*\.\.\.\?\s*listB\s*\]/,
      /\.\.\.\?listB/,
    ],
    tags: ['spread', 'null-aware', 'nullable', 'safe'],
  },

  {
    id: 'dart-adv-009',
    category: 'Spread Operator',
    difficulty: 'medium',
    title: 'Spread in Map Literal',
    text: 'Use spread to merge two maps into one.',
    setup: 'final defaults = {"theme": "light", "fontSize": 14};\nfinal overrides = {"theme": "dark"};',
    setupCode:
      'final defaults = {"theme": "light", "fontSize": 14};\nfinal overrides = {"theme": "dark"};',
    expected: { theme: 'dark', fontSize: 14 },
    sample: '{...defaults, ...overrides} // returns {"theme": "dark", "fontSize": 14}',
    hints: [
      'Spread works with Map literals too',
      'Later entries override earlier ones for duplicate keys',
      'Useful for merging configuration objects',
    ],
    validPatterns: [/\{\s*\.\.\.defaults\s*,\s*\.\.\.overrides\s*\}/, /\.\.\.defaults.*\.\.\.overrides/],
    tags: ['spread', 'map', 'merge', 'configuration'],
  },

  // ============================================================
  // Advanced Dart - Collection if/for
  // ============================================================

  {
    id: 'dart-adv-010',
    category: 'Collection if/for',
    difficulty: 'easy',
    title: 'Collection if Expression',
    text: 'Use collection if to conditionally include an element in a list.',
    setup: 'final includeZero = true;',
    setupCode: 'final includeZero = true;',
    expected: [0, 1, 2, 3],
    sample: '[if (includeZero) 0, 1, 2, 3] // returns [0, 1, 2, 3]',
    hints: [
      'Collection if uses if keyword inside collection literals',
      'No parentheses around the entire expression needed',
      'The element is only included if the condition is true',
    ],
    validPatterns: [
      /\[\s*if\s*\(\s*includeZero\s*\)\s*0\s*,\s*1\s*,\s*2\s*,\s*3\s*\]/,
      /if\s*\(includeZero\)\s*0/,
    ],
    tags: ['collection-if', 'conditional', 'literal'],
  },

  {
    id: 'dart-adv-011',
    category: 'Collection if/for',
    difficulty: 'medium',
    title: 'Collection for Expression',
    text: 'Use collection for to create a list of squared numbers from 1 to 5.',
    setup: '// Generate squares of 1 to 5',
    setupCode: '// Generate squares of 1 to 5',
    expected: [1, 4, 9, 16, 25],
    sample: '[for (var i = 1; i <= 5; i++) i * i] // returns [1, 4, 9, 16, 25]',
    hints: [
      'Collection for allows for loops inside literals',
      'The loop variable is available for the element expression',
      'More concise than List.generate() for simple cases',
    ],
    validPatterns: [
      /\[\s*for\s*\([^)]+\)\s*[^]]+\*\s*[^]]+\]/,
      /for\s*\(.*i\s*\*\s*i/,
    ],
    tags: ['collection-for', 'loop', 'generation', 'squares'],
  },

  {
    id: 'dart-adv-012',
    category: 'Collection if/for',
    difficulty: 'medium',
    title: 'Nested Collection for',
    text: 'Use nested collection for to create a multiplication table pairs.',
    setup: '// Generate pairs for 2x2 multiplication table',
    setupCode: '// Generate pairs for 2x2 multiplication table',
    expected: [
      [1, 1, 1],
      [1, 2, 2],
      [2, 1, 2],
      [2, 2, 4],
    ],
    sample:
      '[for (var i = 1; i <= 2; i++) for (var j = 1; j <= 2; j++) [i, j, i * j]]',
    hints: [
      'Multiple for expressions can be nested',
      'Inner loop iterates completely for each outer iteration',
      'Results are flattened into a single list',
    ],
    validPatterns: [/for\s*\([^)]+\)\s*for\s*\([^)]+\)/, /for.*for.*\[.*\*.*\]/],
    tags: ['collection-for', 'nested', 'multiplication', 'pairs'],
  },

  {
    id: 'dart-adv-013',
    category: 'Collection if/for',
    difficulty: 'hard',
    title: 'Collection if-else',
    text: 'Use collection if-else to transform elements conditionally.',
    setup: 'final numbers = [1, 2, 3, 4, 5];',
    setupCode: 'final numbers = [1, 2, 3, 4, 5];',
    expected: ['odd', 'even', 'odd', 'even', 'odd'],
    sample:
      '[for (var n in numbers) if (n % 2 == 0) "even" else "odd"]',
    hints: [
      'Collection if can have an else clause',
      'Combine with for to transform each element',
      'Each element produces exactly one result',
    ],
    validPatterns: [/for.*if.*else/, /if\s*\([^)]+%\s*2[^)]+\).*"even".*else.*"odd"/],
    tags: ['collection-if', 'collection-for', 'conditional', 'transform'],
  },

  // ============================================================
  // Advanced Dart - Map Transformations
  // ============================================================

  {
    id: 'dart-adv-014',
    category: 'Map Transformations',
    difficulty: 'easy',
    title: 'Map entries() Iteration',
    text: 'Use entries to iterate over both keys and values, returning a list of formatted strings.',
    setup: 'final scores = {"Alice": 95, "Bob": 87, "Charlie": 92};',
    setupCode: 'final scores = {"Alice": 95, "Bob": 87, "Charlie": 92};',
    expected: ['Alice: 95', 'Bob: 87', 'Charlie: 92'],
    sample: 'scores.entries.map((e) => "${e.key}: ${e.value}").toList()',
    hints: [
      'entries returns an Iterable of MapEntry objects',
      'Each MapEntry has key and value properties',
      'Use string interpolation to format the output',
    ],
    validPatterns: [
      /\.entries\.map\s*\([^)]+\)\s*\.toList\s*\(\s*\)/,
      /entries\.map/,
    ],
    tags: ['map', 'entries', 'iteration', 'transformation'],
  },

  {
    id: 'dart-adv-015',
    category: 'Map Transformations',
    difficulty: 'medium',
    title: 'Map with map() Method',
    text: 'Transform a Map by doubling all values using the map() method.',
    setup: 'final prices = {"apple": 1.0, "banana": 0.5, "orange": 0.75};',
    setupCode: 'final prices = {"apple": 1.0, "banana": 0.5, "orange": 0.75};',
    expected: { apple: 2.0, banana: 1.0, orange: 1.5 },
    sample: 'prices.map((key, value) => MapEntry(key, value * 2))',
    hints: [
      'Map.map() transforms each key-value pair',
      'Must return a MapEntry for each entry',
      'Can transform both keys and values',
    ],
    validPatterns: [
      /\.map\s*\(\s*\([^,]+,\s*[^)]+\)\s*=>\s*MapEntry\s*\([^,]+,\s*[^*]+\*\s*2\s*\)\s*\)/,
      /MapEntry\([^,]+,.*\*\s*2\)/,
    ],
    tags: ['map', 'transformation', 'MapEntry', 'values'],
  },

  {
    id: 'dart-adv-016',
    category: 'Map Transformations',
    difficulty: 'hard',
    title: 'Invert Map Keys and Values',
    text: 'Swap keys and values in a map where values are unique.',
    setup: 'final original = {"a": 1, "b": 2, "c": 3};',
    setupCode: 'final original = {"a": 1, "b": 2, "c": 3};',
    expected: { 1: 'a', 2: 'b', 3: 'c' },
    sample: 'original.map((key, value) => MapEntry(value, key))',
    hints: [
      'Use map() to swap key and value positions',
      'MapEntry constructor takes (key, value)',
      'Works only when values are unique',
    ],
    validPatterns: [/MapEntry\s*\(\s*value\s*,\s*key\s*\)/, /map.*MapEntry\(value, key\)/],
    tags: ['map', 'invert', 'swap', 'transformation'],
  },

  // ============================================================
  // Advanced Dart - Set Operations
  // ============================================================

  {
    id: 'dart-adv-017',
    category: 'Set Operations',
    difficulty: 'easy',
    title: 'Set Union Operation',
    text: 'Find the union of two sets using the union() method.',
    setup: 'final setA = {1, 2, 3};\nfinal setB = {3, 4, 5};',
    setupCode: 'final setA = {1, 2, 3};\nfinal setB = {3, 4, 5};',
    expected: [1, 2, 3, 4, 5],
    sample: 'setA.union(setB) // returns {1, 2, 3, 4, 5}',
    hints: [
      'union() combines all elements from both sets',
      'Duplicates are automatically removed',
      'Returns a new Set without modifying originals',
    ],
    validPatterns: [/setA\.union\s*\(\s*setB\s*\)/, /\.union\([^)]+\)/],
    tags: ['set', 'union', 'combine', 'unique'],
  },

  {
    id: 'dart-adv-018',
    category: 'Set Operations',
    difficulty: 'medium',
    title: 'Set Intersection',
    text: 'Find elements common to both sets using intersection().',
    setup: 'final setA = {1, 2, 3, 4, 5};\nfinal setB = {4, 5, 6, 7, 8};',
    setupCode: 'final setA = {1, 2, 3, 4, 5};\nfinal setB = {4, 5, 6, 7, 8};',
    expected: [4, 5],
    sample: 'setA.intersection(setB) // returns {4, 5}',
    hints: [
      'intersection() returns elements present in both sets',
      'Returns a new Set without modifying originals',
      'Order may not be preserved',
    ],
    validPatterns: [/setA\.intersection\s*\(\s*setB\s*\)/, /\.intersection\(/],
    tags: ['set', 'intersection', 'common', 'elements'],
  },

  {
    id: 'dart-adv-019',
    category: 'Set Operations',
    difficulty: 'medium',
    title: 'Set Difference',
    text: 'Find elements in setA that are not in setB using difference().',
    setup: 'final setA = {1, 2, 3, 4, 5};\nfinal setB = {4, 5, 6, 7, 8};',
    setupCode: 'final setA = {1, 2, 3, 4, 5};\nfinal setB = {4, 5, 6, 7, 8};',
    expected: [1, 2, 3],
    sample: 'setA.difference(setB) // returns {1, 2, 3}',
    hints: [
      'difference() returns elements in the first set but not the second',
      'Order matters: A.difference(B) != B.difference(A)',
      'Returns a new Set',
    ],
    validPatterns: [/setA\.difference\s*\(\s*setB\s*\)/, /\.difference\(/],
    tags: ['set', 'difference', 'subtract', 'exclusive'],
  },

  // ============================================================
  // Advanced Dart - Collection Extensions
  // ============================================================

  {
    id: 'dart-adv-020',
    category: 'Collection Extensions',
    difficulty: 'easy',
    title: 'firstWhere with orElse',
    text: 'Find the first even number in the list, or return -1 if none exists.',
    setup: 'final numbers = [1, 3, 5, 7, 9];',
    setupCode: 'final numbers = [1, 3, 5, 7, 9];',
    expected: -1,
    sample: 'numbers.firstWhere((n) => n.isEven, orElse: () => -1) // returns -1',
    hints: [
      'firstWhere() finds the first element matching a condition',
      'The orElse parameter provides a fallback value',
      'Without orElse, throws StateError if no match found',
    ],
    validPatterns: [
      /\.firstWhere\s*\([^,]+,\s*orElse\s*:\s*\(\s*\)\s*=>\s*-1\s*\)/,
      /firstWhere.*orElse/,
    ],
    tags: ['firstWhere', 'orElse', 'search', 'fallback'],
  },

  {
    id: 'dart-adv-021',
    category: 'Collection Extensions',
    difficulty: 'medium',
    title: 'fold() for Accumulation',
    text: 'Use fold() to calculate the product of all numbers in the list.',
    setup: 'final numbers = [2, 3, 4, 5];',
    setupCode: 'final numbers = [2, 3, 4, 5];',
    expected: 120,
    sample: 'numbers.fold(1, (product, n) => product * n) // returns 120',
    hints: [
      'fold() accumulates values with an initial value',
      'First parameter is the initial accumulator value',
      'Use 1 as initial value for multiplication',
    ],
    validPatterns: [
      /\.fold\s*\(\s*1\s*,\s*\([^,]+,\s*[^)]+\)\s*=>\s*[^*]+\*\s*[^)]+\)/,
      /fold\(1,.*\*.*\)/,
    ],
    tags: ['fold', 'accumulation', 'product', 'reduce'],
  },

  {
    id: 'dart-adv-022',
    category: 'Collection Extensions',
    difficulty: 'medium',
    title: 'take and skip Combination',
    text: 'Get elements from index 2 to 4 (inclusive) using skip() and take().',
    setup: 'final numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];',
    setupCode: 'final numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];',
    expected: [2, 3, 4],
    sample: 'numbers.skip(2).take(3).toList() // returns [2, 3, 4]',
    hints: [
      'skip(n) skips the first n elements',
      'take(n) takes the first n elements from remaining',
      'Combining them creates a slice operation',
    ],
    validPatterns: [/\.skip\s*\(\s*2\s*\)\s*\.take\s*\(\s*3\s*\)/, /skip\(2\)\.take\(3\)/],
    tags: ['skip', 'take', 'slice', 'iterable'],
  },

  // ============================================================
  // Advanced Dart - Async Operations
  // ============================================================

  {
    id: 'dart-adv-023',
    category: 'Async Operations',
    difficulty: 'medium',
    title: 'Future.wait for Parallel Execution',
    text: 'Use Future.wait() to execute multiple futures in parallel and get all results.',
    setup:
      'Future<int> fetchA() async => 1;\nFuture<int> fetchB() async => 2;\nFuture<int> fetchC() async => 3;',
    setupCode:
      'Future<int> fetchA() async => 1;\nFuture<int> fetchB() async => 2;\nFuture<int> fetchC() async => 3;',
    expected: [1, 2, 3],
    sample: 'await Future.wait([fetchA(), fetchB(), fetchC()]) // returns [1, 2, 3]',
    hints: [
      'Future.wait() runs multiple futures concurrently',
      'Returns a Future<List> with results in order',
      'All futures must complete for the result',
    ],
    validPatterns: [/Future\.wait\s*\(\s*\[.*\]\s*\)/, /await\s+Future\.wait/],
    tags: ['future', 'wait', 'parallel', 'async'],
  },

  {
    id: 'dart-adv-024',
    category: 'Async Operations',
    difficulty: 'medium',
    title: 'Stream.fromIterable',
    text: 'Create a Stream from a list and collect values greater than 2.',
    setup: 'final numbers = [1, 2, 3, 4, 5];',
    setupCode: 'final numbers = [1, 2, 3, 4, 5];',
    expected: [3, 4, 5],
    sample: 'await Stream.fromIterable(numbers).where((n) => n > 2).toList()',
    hints: [
      'Stream.fromIterable() creates a stream from any iterable',
      'Stream has similar methods to Iterable (where, map, etc.)',
      'Use toList() to collect stream values into a list',
    ],
    validPatterns: [
      /Stream\.fromIterable\s*\([^)]+\)\s*\.where\s*\([^)]+\)\s*\.toList\s*\(\s*\)/,
      /Stream\.fromIterable.*where.*>\s*2/,
    ],
    tags: ['stream', 'fromIterable', 'filter', 'async'],
  },

  {
    id: 'dart-adv-025',
    category: 'Async Operations',
    difficulty: 'hard',
    title: 'Stream Transformation Pipeline',
    text: 'Create a stream pipeline that filters even numbers, squares them, and takes the first 3.',
    setup: 'final numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    setupCode: 'final numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
    expected: [4, 16, 36],
    sample:
      'await Stream.fromIterable(numbers)\n  .where((n) => n % 2 == 0)\n  .map((n) => n * n)\n  .take(3)\n  .toList() // returns [4, 16, 36]',
    hints: [
      'Chain multiple stream transformations',
      'where() filters, map() transforms',
      'take() limits the number of results',
      'Order of operations matters for the result',
    ],
    validPatterns: [
      /Stream\.fromIterable.*\.where.*\.map.*\.take.*\.toList/,
      /\.where\(.*%\s*2\s*==\s*0.*\)\.map\(.*\*.*\)/,
    ],
    tags: ['stream', 'pipeline', 'transformation', 'async', 'chain'],
  },

  {
    id: 'dart-adv-026',
    category: 'Async Operations',
    difficulty: 'hard',
    title: 'Stream with asyncMap',
    text: 'Use asyncMap to perform async transformations on stream elements.',
    setup:
      'Future<String> fetchName(int id) async => "User$id";\nfinal ids = [1, 2, 3];',
    setupCode:
      'Future<String> fetchName(int id) async => "User$id";\nfinal ids = [1, 2, 3];',
    expected: ['User1', 'User2', 'User3'],
    sample: 'await Stream.fromIterable(ids).asyncMap(fetchName).toList()',
    hints: [
      'asyncMap() applies an async function to each element',
      'Each element waits for its future to complete',
      'Results are emitted in order',
      'More controlled than Future.wait for sequential processing',
    ],
    validPatterns: [
      /Stream\.fromIterable\s*\([^)]+\)\s*\.asyncMap\s*\([^)]+\)/,
      /\.asyncMap\s*\(\s*fetchName\s*\)/,
    ],
    tags: ['stream', 'asyncMap', 'async', 'transformation', 'sequential'],
  },

  {
    id: 'dart-adv-027',
    category: 'Async Operations',
    difficulty: 'hard',
    title: 'Future.delayed with Computation',
    text: 'Create a delayed future that returns a computed value after 100ms.',
    setup: '// Create a delayed computation',
    setupCode: '// Create a delayed computation',
    expected: 42,
    sample:
      'await Future.delayed(Duration(milliseconds: 100), () => 42)',
    hints: [
      'Future.delayed takes a Duration and an optional computation',
      'The computation runs after the delay',
      'Without computation, returns Future<void>',
    ],
    validPatterns: [
      /Future\.delayed\s*\(\s*Duration\s*\([^)]+\)\s*,\s*\(\s*\)\s*=>\s*42\s*\)/,
      /Future\.delayed.*Duration.*42/,
    ],
    tags: ['future', 'delayed', 'computation', 'async', 'timer'],
  },

  // ============================================================
  // Advanced Dart - Complex Operations
  // ============================================================

  {
    id: 'dart-adv-028',
    category: 'Iterable Methods',
    difficulty: 'medium',
    title: 'Expand with Transformation',
    text: 'Use expand() to duplicate each number, creating a pair of [n, n*2] for each element.',
    setup: 'final numbers = [1, 2, 3];',
    setupCode: 'final numbers = [1, 2, 3];',
    expected: [1, 2, 2, 4, 3, 6],
    sample: 'numbers.expand((n) => [n, n * 2]).toList() // returns [1, 2, 2, 4, 3, 6]',
    hints: [
      'expand() can return multiple elements for each input',
      'Return a list with the original and transformed values',
      'The resulting iterable is flattened automatically',
    ],
    validPatterns: [
      /\.expand\s*\(\s*\([^)]*\)\s*=>\s*\[[^,]+,\s*[^\]]+\*\s*2\s*\]\s*\)/,
      /expand.*\[.*\*\s*2\]/,
    ],
    tags: ['expand', 'transformation', 'duplicate', 'flatten'],
  },

  {
    id: 'dart-adv-029',
    category: 'Collection Extensions',
    difficulty: 'hard',
    title: 'groupBy Using fold',
    text: 'Group a list of words by their first letter using fold().',
    setup: 'final words = ["apple", "banana", "apricot", "blueberry", "cherry"];',
    setupCode:
      'final words = ["apple", "banana", "apricot", "blueberry", "cherry"];',
    expected: { a: ['apple', 'apricot'], b: ['banana', 'blueberry'], c: ['cherry'] },
    sample:
      'words.fold<Map<String, List<String>>>({}, (map, word) {\n  (map[word[0]] ??= []).add(word);\n  return map;\n})',
    hints: [
      'Use fold with an empty Map as initial value',
      'Access first character with word[0]',
      'Use ??= to initialize list if key does not exist',
    ],
    validPatterns: [/\.fold.*Map.*word\[0\]/, /fold.*\?\?=\s*\[\]/],
    tags: ['fold', 'groupBy', 'map', 'categorize'],
  },

  {
    id: 'dart-adv-030',
    category: 'Map Transformations',
    difficulty: 'hard',
    title: 'Complex Map Transformation',
    text: 'Transform a nested map structure, filtering and restructuring data.',
    setup:
      'final data = {\n  "users": [\n    {"name": "Alice", "age": 30, "active": true},\n    {"name": "Bob", "age": 25, "active": false},\n    {"name": "Charlie", "age": 35, "active": true}\n  ]\n};',
    setupCode:
      'final data = {\n  "users": [\n    {"name": "Alice", "age": 30, "active": true},\n    {"name": "Bob", "age": 25, "active": false},\n    {"name": "Charlie", "age": 35, "active": true}\n  ]\n};',
    expected: ['Alice (30)', 'Charlie (35)'],
    sample:
      '(data["users"] as List)\n  .where((u) => u["active"] == true)\n  .map((u) => "${u["name"]} (${u["age"]})") \n  .toList()',
    hints: [
      'Cast the nested list to access list methods',
      'Use where() to filter by the active field',
      'Use map() with string interpolation for formatting',
      'Chain operations for clean data transformation',
    ],
    validPatterns: [
      /data\["users"\].*\.where.*active.*\.map.*name.*age/,
      /where.*\["active"\].*==.*true.*\.map/,
    ],
    tags: ['map', 'nested', 'filter', 'transformation', 'complex'],
  },

  {
    id: 'dart-adv-031',
    category: 'Iterable Methods',
    difficulty: 'hard',
    title: 'Combine expand, whereType, and Map',
    text: 'Flatten a nested structure, filter by type, transform, and collect using multiple Dart features.',
    setup: 'final nested = [[1, "a", 2], [3, "b"], [4, 5, "c", 6]];',
    setupCode: 'final nested = [[1, "a", 2], [3, "b"], [4, 5, "c", 6]];',
    expected: [2, 4, 6, 8, 10, 12],
    sample:
      'nested\n  .expand((list) => list)\n  .whereType<int>()\n  .map((n) => n * 2)\n  .toList()',
    hints: [
      'expand() flattens the nested lists',
      'whereType<int>() filters to only integers',
      'map() transforms each value',
      'Chain all operations together for a clean pipeline',
    ],
    validPatterns: [
      /\.expand\s*\([^)]+\)\s*\.whereType\s*<\s*int\s*>\s*\(\s*\)\s*\.map\s*\([^)]+\)\s*\.toList\s*\(\s*\)/,
      /expand.*whereType<int>.*map.*\*\s*2/,
    ],
    tags: ['expand', 'whereType', 'map', 'pipeline', 'chain', 'complex'],
  },
];

export default dartProblems;
