/**
 * Elixir coding drill problems
 * Covers Enum, String, List, Map, and Pipe Operator
 */

import type { Problem } from '../types';

export const elixirProblems: Problem[] = [
  // ============================================================
  // Enum Module - Easy
  // ============================================================

  // Enum.filter
  {
    id: 'elixir-enum-filter-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Filter Even Numbers',
    text: 'Use `Enum.filter/2` to keep only even numbers from the list.',
    setup: 'numbers = [1, 2, 3, 4, 5, 6]',
    setupCode: 'numbers = [1, 2, 3, 4, 5, 6]',
    expected: [2, 4, 6],
    sample: 'Enum.filter(numbers, fn x -> rem(x, 2) == 0 end)',
    hints: [
      'Enum.filter takes a list and a function',
      'Use rem(x, 2) == 0 to check for even numbers',
      'You can also use the capture operator &',
    ],
    validPatterns: [/Enum\.filter\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.filter/],
    tags: ['enum', 'filter', 'even'],
  },
  {
    id: 'elixir-enum-filter-002',
    category: 'Enum Module',
    difficulty: 'medium',
    title: 'Filter Positive Numbers',
    text: 'Use `Enum.filter/2` to keep only positive numbers from the list.',
    setup: 'numbers = [-3, -1, 0, 2, 5, -4]',
    setupCode: 'numbers = [-3, -1, 0, 2, 5, -4]',
    expected: [2, 5],
    sample: 'Enum.filter(numbers, fn x -> x > 0 end)',
    hints: ['Enum.filter keeps elements where the function returns true', 'Check if x > 0'],
    validPatterns: [/Enum\.filter\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.filter/],
    tags: ['enum', 'filter', 'positive'],
  },

  // Enum.map
  {
    id: 'elixir-enum-map-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Double Each Number',
    text: 'Use `Enum.map/2` to double each number in the list.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: [2, 4, 6, 8, 10],
    sample: 'Enum.map(numbers, fn x -> x * 2 end)',
    hints: [
      'Enum.map transforms each element',
      'Use fn x -> x * 2 end to double',
      'Can also use &(&1 * 2) capture syntax',
    ],
    validPatterns: [/Enum\.map\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.map/],
    tags: ['enum', 'map', 'transform'],
  },
  {
    id: 'elixir-enum-map-002',
    category: 'Enum Module',
    difficulty: 'medium',
    title: 'Square Each Number',
    text: 'Use `Enum.map/2` to square each number in the list.',
    setup: 'numbers = [1, 2, 3, 4]',
    setupCode: 'numbers = [1, 2, 3, 4]',
    expected: [1, 4, 9, 16],
    sample: 'Enum.map(numbers, fn x -> x * x end)',
    hints: [
      'Multiply x by itself to square it',
      'Can use :math.pow/2 but multiplication is simpler',
    ],
    validPatterns: [/Enum\.map\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.map/],
    tags: ['enum', 'map', 'square'],
  },

  // Enum.reduce
  {
    id: 'elixir-enum-reduce-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Sum All Numbers',
    text: 'Use `Enum.reduce/3` to calculate the sum of all numbers.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: 15,
    sample: 'Enum.reduce(numbers, 0, fn x, acc -> x + acc end)',
    hints: [
      'Enum.reduce takes list, initial value, and accumulator function',
      'Start with 0 as the initial accumulator',
      'You can also use Enum.sum/1',
    ],
    validPatterns: [
      /Enum\.reduce\s*\(\s*numbers/,
      /Enum\.sum\s*\(\s*numbers\s*\)/,
      /numbers\s*\|>\s*Enum\.reduce/,
      /numbers\s*\|>\s*Enum\.sum/,
    ],
    tags: ['enum', 'reduce', 'sum'],
  },

  // Enum.sort
  {
    id: 'elixir-enum-sort-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Sort Numbers Ascending',
    text: 'Use `Enum.sort/1` to sort the numbers in ascending order.',
    setup: 'numbers = [5, 2, 8, 1, 9]',
    setupCode: 'numbers = [5, 2, 8, 1, 9]',
    expected: [1, 2, 5, 8, 9],
    sample: 'Enum.sort(numbers)',
    hints: ['Enum.sort/1 sorts in ascending order by default'],
    validPatterns: [/Enum\.sort\s*\(\s*numbers\s*\)/, /numbers\s*\|>\s*Enum\.sort/],
    tags: ['enum', 'sort', 'ascending'],
  },

  // Enum.reverse
  {
    id: 'elixir-enum-reverse-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Reverse a List',
    text: 'Use `Enum.reverse/1` to reverse the order of elements.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: [5, 4, 3, 2, 1],
    sample: 'Enum.reverse(numbers)',
    hints: ['Enum.reverse/1 returns elements in reverse order'],
    validPatterns: [/Enum\.reverse\s*\(\s*numbers\s*\)/, /numbers\s*\|>\s*Enum\.reverse/],
    tags: ['enum', 'reverse'],
  },

  // Enum.find
  {
    id: 'elixir-enum-find-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Find First Even Number',
    text: 'Use `Enum.find/2` to find the first even number in the list.',
    setup: 'numbers = [1, 3, 4, 6, 7]',
    setupCode: 'numbers = [1, 3, 4, 6, 7]',
    expected: 4,
    sample: 'Enum.find(numbers, fn x -> rem(x, 2) == 0 end)',
    hints: [
      'Enum.find returns the first element matching the condition',
      'Returns nil if no match found',
    ],
    validPatterns: [/Enum\.find\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.find/],
    tags: ['enum', 'find', 'first'],
  },

  // Enum.any?
  {
    id: 'elixir-enum-any-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Check if Any Greater Than 10',
    text: 'Use `Enum.any?/2` to check if any number is greater than 10.',
    setup: 'numbers = [5, 8, 12, 3]',
    setupCode: 'numbers = [5, 8, 12, 3]',
    expected: true,
    sample: 'Enum.any?(numbers, fn x -> x > 10 end)',
    hints: ['Enum.any? returns true if at least one element satisfies the condition'],
    validPatterns: [/Enum\.any\?\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.any\?/],
    tags: ['enum', 'any?', 'predicate'],
  },

  // Enum.all?
  {
    id: 'elixir-enum-all-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Check if All Positive',
    text: 'Use `Enum.all?/2` to check if all numbers are positive.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: true,
    sample: 'Enum.all?(numbers, fn x -> x > 0 end)',
    hints: ['Enum.all? returns true only if all elements satisfy the condition'],
    validPatterns: [/Enum\.all\?\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.all\?/],
    tags: ['enum', 'all?', 'predicate'],
  },

  // Enum.count
  {
    id: 'elixir-enum-count-001',
    category: 'Enum Module',
    difficulty: 'easy',
    title: 'Count Even Numbers',
    text: 'Use `Enum.count/2` to count how many numbers are even.',
    setup: 'numbers = [1, 2, 3, 4, 5, 6]',
    setupCode: 'numbers = [1, 2, 3, 4, 5, 6]',
    expected: 3,
    sample: 'Enum.count(numbers, fn x -> rem(x, 2) == 0 end)',
    hints: [
      'Enum.count/2 counts elements matching the condition',
      'Enum.count/1 just counts total elements',
    ],
    validPatterns: [/Enum\.count\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.count/],
    tags: ['enum', 'count'],
  },

  // ============================================================
  // String Module - Easy
  // ============================================================

  // String.length
  {
    id: 'elixir-string-length-001',
    category: 'String Module',
    difficulty: 'easy',
    title: 'Get String Length',
    text: 'Use `String.length/1` to get the number of graphemes in the string.',
    setup: 'text = "hello"',
    setupCode: 'text = "hello"',
    expected: 5,
    sample: 'String.length(text)',
    hints: ['String.length counts Unicode graphemes, not bytes'],
    validPatterns: [/String\.length\s*\(\s*text\s*\)/, /text\s*\|>\s*String\.length/],
    tags: ['string', 'length'],
  },

  // String.upcase
  {
    id: 'elixir-string-upcase-001',
    category: 'String Module',
    difficulty: 'easy',
    title: 'Convert to Uppercase',
    text: 'Use `String.upcase/1` to convert the string to uppercase.',
    setup: 'text = "hello world"',
    setupCode: 'text = "hello world"',
    expected: 'HELLO WORLD',
    sample: 'String.upcase(text)',
    hints: ['String.upcase converts all characters to uppercase'],
    validPatterns: [/String\.upcase\s*\(\s*text\s*\)/, /text\s*\|>\s*String\.upcase/],
    tags: ['string', 'upcase', 'uppercase'],
  },

  // String.downcase
  {
    id: 'elixir-string-downcase-001',
    category: 'String Module',
    difficulty: 'easy',
    title: 'Convert to Lowercase',
    text: 'Use `String.downcase/1` to convert the string to lowercase.',
    setup: 'text = "HELLO WORLD"',
    setupCode: 'text = "HELLO WORLD"',
    expected: 'hello world',
    sample: 'String.downcase(text)',
    hints: ['String.downcase converts all characters to lowercase'],
    validPatterns: [/String\.downcase\s*\(\s*text\s*\)/, /text\s*\|>\s*String\.downcase/],
    tags: ['string', 'downcase', 'lowercase'],
  },

  // String.split
  {
    id: 'elixir-string-split-001',
    category: 'String Module',
    difficulty: 'easy',
    title: 'Split String by Space',
    text: 'Use `String.split/2` to split the string into words.',
    setup: 'text = "hello world elixir"',
    setupCode: 'text = "hello world elixir"',
    expected: ['hello', 'world', 'elixir'],
    sample: 'String.split(text, " ")',
    hints: [
      'String.split divides a string by a delimiter',
      'String.split/1 splits on whitespace by default',
    ],
    validPatterns: [/String\.split\s*\(\s*text/, /text\s*\|>\s*String\.split/],
    tags: ['string', 'split'],
  },

  // String.contains?
  {
    id: 'elixir-string-contains-001',
    category: 'String Module',
    difficulty: 'medium',
    title: 'Check if String Contains Substring',
    text: 'Use `String.contains?/2` to check if the string contains "world".',
    setup: 'text = "hello world"',
    setupCode: 'text = "hello world"',
    expected: true,
    sample: 'String.contains?(text, "world")',
    hints: ['String.contains? returns true if substring is found'],
    validPatterns: [/String\.contains\?\s*\(\s*text/, /text\s*\|>\s*String\.contains\?/],
    tags: ['string', 'contains?', 'substring'],
  },

  // String.replace
  {
    id: 'elixir-string-replace-001',
    category: 'String Module',
    difficulty: 'medium',
    title: 'Replace Substring',
    text: 'Use `String.replace/3` to replace "world" with "elixir".',
    setup: 'text = "hello world"',
    setupCode: 'text = "hello world"',
    expected: 'hello elixir',
    sample: 'String.replace(text, "world", "elixir")',
    hints: ['String.replace takes the string, pattern to find, and replacement'],
    validPatterns: [/String\.replace\s*\(\s*text/, /text\s*\|>\s*String\.replace/],
    tags: ['string', 'replace'],
  },

  // String.trim
  {
    id: 'elixir-string-trim-001',
    category: 'String Module',
    difficulty: 'easy',
    title: 'Trim Whitespace',
    text: 'Use `String.trim/1` to remove leading and trailing whitespace.',
    setup: 'text = "  hello world  "',
    setupCode: 'text = "  hello world  "',
    expected: 'hello world',
    sample: 'String.trim(text)',
    hints: ['String.trim removes whitespace from both ends'],
    validPatterns: [/String\.trim\s*\(\s*text\s*\)/, /text\s*\|>\s*String\.trim/],
    tags: ['string', 'trim', 'whitespace'],
  },

  // ============================================================
  // List Operations - Easy
  // ============================================================

  // hd (head)
  {
    id: 'elixir-list-hd-001',
    category: 'List Operations',
    difficulty: 'easy',
    title: 'Get First Element with hd',
    text: 'Use `hd/1` to get the first element (head) of the list.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: 1,
    sample: 'hd(numbers)',
    hints: ['hd returns the head (first element) of a list', 'Raises an error on empty list'],
    validPatterns: [/hd\s*\(\s*numbers\s*\)/, /List\.first\s*\(\s*numbers\s*\)/],
    tags: ['list', 'hd', 'head', 'first'],
  },

  // tl (tail)
  {
    id: 'elixir-list-tl-001',
    category: 'List Operations',
    difficulty: 'easy',
    title: 'Get Tail of List',
    text: 'Use `tl/1` to get all elements except the first one.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: [2, 3, 4, 5],
    sample: 'tl(numbers)',
    hints: ['tl returns the tail (everything except the head)', 'Raises an error on empty list'],
    validPatterns: [/tl\s*\(\s*numbers\s*\)/],
    tags: ['list', 'tl', 'tail'],
  },

  // ++ (concatenation)
  {
    id: 'elixir-list-concat-001',
    category: 'List Operations',
    difficulty: 'easy',
    title: 'Concatenate Two Lists',
    text: 'Use the `++` operator to concatenate the two lists.',
    setup: 'list1 = [1, 2, 3]\nlist2 = [4, 5, 6]',
    setupCode: 'list1 = [1, 2, 3]\nlist2 = [4, 5, 6]',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'list1 ++ list2',
    hints: ['++ appends the second list to the first', 'Also available as Kernel.++/2'],
    validPatterns: [/list1\s*\+\+\s*list2/],
    tags: ['list', '++', 'concat'],
  },

  // -- (subtraction)
  {
    id: 'elixir-list-subtract-001',
    category: 'List Operations',
    difficulty: 'medium',
    title: 'Remove Elements from List',
    text: 'Use the `--` operator to remove elements of the second list from the first.',
    setup: 'list1 = [1, 2, 3, 4, 5]\nlist2 = [2, 4]',
    setupCode: 'list1 = [1, 2, 3, 4, 5]\nlist2 = [2, 4]',
    expected: [1, 3, 5],
    sample: 'list1 -- list2',
    hints: [
      '-- removes elements from the left list that appear in the right list',
      'Only removes one occurrence per element',
    ],
    validPatterns: [/list1\s*--\s*list2/],
    tags: ['list', '--', 'subtract'],
  },

  // length
  {
    id: 'elixir-list-length-001',
    category: 'List Operations',
    difficulty: 'easy',
    title: 'Get List Length',
    text: 'Use `length/1` to get the number of elements in the list.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: 5,
    sample: 'length(numbers)',
    hints: ['length/1 counts the number of elements', 'This is O(n) operation for lists'],
    validPatterns: [/length\s*\(\s*numbers\s*\)/, /Enum\.count\s*\(\s*numbers\s*\)/],
    tags: ['list', 'length', 'count'],
  },

  // ============================================================
  // Map Operations - Easy
  // ============================================================

  // Map.get
  {
    id: 'elixir-map-get-001',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Get Value from Map',
    text: 'Use `Map.get/2` to get the value associated with the :name key.',
    setup: 'person = %{name: "Alice", age: 30}',
    setupCode: 'person = %{name: "Alice", age: 30}',
    expected: 'Alice',
    sample: 'Map.get(person, :name)',
    hints: [
      'Map.get returns the value for a key',
      'Returns nil if key not found (or use Map.get/3 for default)',
    ],
    validPatterns: [/Map\.get\s*\(\s*person,\s*:name\s*\)/, /person\[:name\]/, /person\.name/],
    tags: ['map', 'get', 'access'],
  },

  // Map.put
  {
    id: 'elixir-map-put-001',
    category: 'Map Operations',
    difficulty: 'easy',
    title: 'Add Key to Map',
    text: 'Use `Map.put/3` to add a :city key with value "NYC" to the map.',
    setup: 'person = %{name: "Alice", age: 30}',
    setupCode: 'person = %{name: "Alice", age: 30}',
    expected: { name: 'Alice', age: 30, city: 'NYC' },
    sample: 'Map.put(person, :city, "NYC")',
    hints: ['Map.put adds or updates a key-value pair', 'Returns a new map (immutability)'],
    validPatterns: [/Map\.put\s*\(\s*person,\s*:city,\s*"NYC"\s*\)/],
    tags: ['map', 'put', 'add'],
  },

  // Map.delete
  {
    id: 'elixir-map-delete-001',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Delete Key from Map',
    text: 'Use `Map.delete/2` to remove the :age key from the map.',
    setup: 'person = %{name: "Alice", age: 30, city: "NYC"}',
    setupCode: 'person = %{name: "Alice", age: 30, city: "NYC"}',
    expected: { name: 'Alice', city: 'NYC' },
    sample: 'Map.delete(person, :age)',
    hints: ['Map.delete removes a key from the map', 'Returns a new map without that key'],
    validPatterns: [/Map\.delete\s*\(\s*person,\s*:age\s*\)/],
    tags: ['map', 'delete', 'remove'],
  },

  // Map.keys
  {
    id: 'elixir-map-keys-001',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Get All Keys from Map',
    text: 'Use `Map.keys/1` to get all keys from the map.',
    setup: 'person = %{name: "Alice", age: 30}',
    setupCode: 'person = %{name: "Alice", age: 30}',
    expected: [':age', ':name'],
    sample: 'Map.keys(person)',
    hints: ['Map.keys returns a list of all keys', 'Order is not guaranteed'],
    validPatterns: [/Map\.keys\s*\(\s*person\s*\)/, /person\s*\|>\s*Map\.keys/],
    tags: ['map', 'keys'],
  },

  // Map.values
  {
    id: 'elixir-map-values-001',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Get All Values from Map',
    text: 'Use `Map.values/1` to get all values from the map.',
    setup: 'person = %{name: "Alice", age: 30}',
    setupCode: 'person = %{name: "Alice", age: 30}',
    expected: [30, 'Alice'],
    sample: 'Map.values(person)',
    hints: ['Map.values returns a list of all values', 'Order corresponds to Map.keys order'],
    validPatterns: [/Map\.values\s*\(\s*person\s*\)/, /person\s*\|>\s*Map\.values/],
    tags: ['map', 'values'],
  },

  // Map.merge
  {
    id: 'elixir-map-merge-001',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Merge Two Maps',
    text: 'Use `Map.merge/2` to combine the two maps.',
    setup: 'map1 = %{a: 1, b: 2}\nmap2 = %{b: 3, c: 4}',
    setupCode: 'map1 = %{a: 1, b: 2}\nmap2 = %{b: 3, c: 4}',
    expected: { a: 1, b: 3, c: 4 },
    sample: 'Map.merge(map1, map2)',
    hints: ['Map.merge combines two maps', 'Values from second map override first on conflicts'],
    validPatterns: [/Map\.merge\s*\(\s*map1,\s*map2\s*\)/],
    tags: ['map', 'merge', 'combine'],
  },

  // ============================================================
  // Enum Module - Medium
  // ============================================================

  // Enum.reduce - complex
  {
    id: 'elixir-enum-reduce-002',
    category: 'Enum Module',
    difficulty: 'medium',
    title: 'Product of Numbers',
    text: 'Use `Enum.reduce/3` to calculate the product of all numbers.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: 120,
    sample: 'Enum.reduce(numbers, 1, fn x, acc -> x * acc end)',
    hints: [
      'Start with 1 as initial accumulator for multiplication',
      'Multiply each element with the accumulator',
    ],
    validPatterns: [
      /Enum\.reduce\s*\(\s*numbers,\s*1/,
      /Enum\.product\s*\(\s*numbers\s*\)/,
      /numbers\s*\|>\s*Enum\.reduce\s*\(\s*1/,
      /numbers\s*\|>\s*Enum\.product/,
    ],
    tags: ['enum', 'reduce', 'product'],
  },
  // Enum.sort - custom
  {
    id: 'elixir-enum-sort-002',
    category: 'Enum Module',
    difficulty: 'medium',
    title: 'Sort Numbers Descending',
    text: 'Use `Enum.sort/2` to sort numbers in descending order.',
    setup: 'numbers = [3, 1, 4, 1, 5, 9]',
    setupCode: 'numbers = [3, 1, 4, 1, 5, 9]',
    expected: [9, 5, 4, 3, 1, 1],
    sample: 'Enum.sort(numbers, :desc)',
    hints: ['Use :desc as the second argument', 'Or use a custom comparison function'],
    validPatterns: [
      /Enum\.sort\s*\(\s*numbers,\s*:desc\s*\)/,
      /Enum\.sort\s*\(\s*numbers,\s*&\s*\(\s*&1\s*>=\s*&2\s*\)\s*\)/,
      /Enum\.sort\s*\(\s*numbers,\s*fn.*>/,
      /numbers\s*\|>\s*Enum\.sort\s*\(\s*:desc\s*\)/,
    ],
    tags: ['enum', 'sort', 'descending'],
  },
  // Enum.group_by
  {
    id: 'elixir-enum-group-001',
    category: 'Enum Module',
    difficulty: 'medium',
    title: 'Group Numbers by Parity',
    text: 'Use `Enum.group_by/2` to group numbers by even/odd.',
    setup: 'numbers = [1, 2, 3, 4, 5, 6]',
    setupCode: 'numbers = [1, 2, 3, 4, 5, 6]',
    expected: { even: [2, 4, 6], odd: [1, 3, 5] },
    sample: 'Enum.group_by(numbers, fn x -> if rem(x, 2) == 0, do: :even, else: :odd end)',
    hints: [
      'Enum.group_by groups elements by function result',
      'Returns a map with groups as keys',
    ],
    validPatterns: [/Enum\.group_by\s*\(\s*numbers/, /numbers\s*\|>\s*Enum\.group_by/],
    tags: ['enum', 'group_by', 'categorize'],
  },

  // Enum.zip
  {
    id: 'elixir-enum-zip-001',
    category: 'Enum Module',
    difficulty: 'medium',
    title: 'Zip Two Lists',
    text: 'Use `Enum.zip/2` to combine two lists into pairs.',
    setup: 'names = ["Alice", "Bob", "Carol"]\nages = [30, 25, 35]',
    setupCode: 'names = ["Alice", "Bob", "Carol"]\nages = [30, 25, 35]',
    expected: [
      ['Alice', 30],
      ['Bob', 25],
      ['Carol', 35],
    ],
    sample: 'Enum.zip(names, ages)',
    hints: ['Enum.zip pairs elements from two lists', 'Stops at the shorter list'],
    validPatterns: [/Enum\.zip\s*\(\s*names,\s*ages\s*\)/],
    tags: ['enum', 'zip', 'combine'],
  },

  // ============================================================
  // String Module - Medium
  // ============================================================

  // String.split - complex
  {
    id: 'elixir-string-split-002',
    category: 'String Module',
    difficulty: 'medium',
    title: 'Split by Multiple Delimiters',
    text: 'Use `String.split/2` with a regex to split on commas or semicolons.',
    setup: 'text = "a,b;c,d;e"',
    setupCode: 'text = "a,b;c,d;e"',
    expected: ['a', 'b', 'c', 'd', 'e'],
    sample: 'String.split(text, ~r/[,;]/)',
    hints: ['Use a regex pattern with character class', '~r/[,;]/ matches comma or semicolon'],
    validPatterns: [/String\.split\s*\(\s*text,\s*~r/, /text\s*\|>\s*String\.split\s*\(\s*~r/],
    tags: ['string', 'split', 'regex'],
  },

  // String.replace - regex
  {
    id: 'elixir-string-replace-002',
    category: 'String Module',
    difficulty: 'medium',
    title: 'Replace All Digits',
    text: 'Use `String.replace/3` with regex to replace all digits with "X".',
    setup: 'text = "phone: 123-456-7890"',
    setupCode: 'text = "phone: 123-456-7890"',
    expected: 'phone: XXX-XXX-XXXX',
    sample: 'String.replace(text, ~r/\\d/, "X")',
    hints: ['Use ~r/\\d/ to match digits', 'replace/3 replaces all occurrences by default'],
    validPatterns: [/String\.replace\s*\(\s*text,\s*~r/, /text\s*\|>\s*String\.replace\s*\(\s*~r/],
    tags: ['string', 'replace', 'regex'],
  },

  // String.slice
  {
    id: 'elixir-string-slice-001',
    category: 'String Module',
    difficulty: 'medium',
    title: 'Extract Substring',
    text: 'Use `String.slice/3` to extract characters from index 0 to 4.',
    setup: 'text = "hello world"',
    setupCode: 'text = "hello world"',
    expected: 'hello',
    sample: 'String.slice(text, 0, 5)',
    hints: ['String.slice takes start index and length', 'Can also use range syntax'],
    validPatterns: [
      /String\.slice\s*\(\s*text,\s*0,\s*5\s*\)/,
      /String\.slice\s*\(\s*text,\s*0\.\.4\s*\)/,
      /text\s*\|>\s*String\.slice/,
    ],
    tags: ['string', 'slice', 'substring'],
  },

  // ============================================================
  // List Operations - Medium
  // ============================================================

  // List.flatten
  {
    id: 'elixir-list-flatten-001',
    category: 'List Operations',
    difficulty: 'medium',
    title: 'Flatten Nested List',
    text: 'Use `List.flatten/1` to flatten a nested list.',
    setup: 'nested = [[1, 2], [3, [4, 5]], [6]]',
    setupCode: 'nested = [[1, 2], [3, [4, 5]], [6]]',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'List.flatten(nested)',
    hints: ['List.flatten removes all nesting', 'Works with arbitrary depth'],
    validPatterns: [/List\.flatten\s*\(\s*nested\s*\)/, /nested\s*\|>\s*List\.flatten/],
    tags: ['list', 'flatten', 'nested'],
  },

  // ============================================================
  // Map Operations - Medium
  // ============================================================

  // Map.update
  {
    id: 'elixir-map-update-001',
    category: 'Map Operations',
    difficulty: 'medium',
    title: 'Update Map Value',
    text: 'Use `Map.update!/3` to increment the :count value by 1.',
    setup: 'data = %{name: "counter", count: 5}',
    setupCode: 'data = %{name: "counter", count: 5}',
    expected: { name: 'counter', count: 6 },
    sample: 'Map.update!(data, :count, &(&1 + 1))',
    hints: ['Map.update! takes a function to transform the value', 'Raises if key does not exist'],
    validPatterns: [/Map\.update!\s*\(\s*data,\s*:count/, /Map\.update\s*\(\s*data,\s*:count/],
    tags: ['map', 'update', 'transform'],
  },

  // ============================================================
  // Pipe Operator - Medium
  // ============================================================

  {
    id: 'elixir-pipe-001',
    category: 'Pipe Operator',
    difficulty: 'medium',
    title: 'Chain Operations with Pipe',
    text: 'Use the pipe operator to filter evens, double them, and sum.',
    setup: 'numbers = [1, 2, 3, 4, 5, 6]',
    setupCode: 'numbers = [1, 2, 3, 4, 5, 6]',
    expected: 24,
    sample: 'numbers |> Enum.filter(&(rem(&1, 2) == 0)) |> Enum.map(&(&1 * 2)) |> Enum.sum()',
    hints: [
      'Use |> to chain function calls',
      'Each result becomes first argument of next function',
    ],
    validPatterns: [/numbers\s*\|>\s*Enum\.filter.*\|>\s*Enum\.map.*\|>\s*Enum\.sum/],
    tags: ['pipe', 'chain', 'functional'],
  },
  {
    id: 'elixir-pipe-002',
    category: 'Pipe Operator',
    difficulty: 'medium',
    title: 'String Transformation Pipeline',
    text: 'Use pipes to trim, downcase, and split the string.',
    setup: 'text = "  HELLO WORLD  "',
    setupCode: 'text = "  HELLO WORLD  "',
    expected: ['hello', 'world'],
    sample: 'text |> String.trim() |> String.downcase() |> String.split()',
    hints: ['Chain String functions with |>', 'Each function transforms and passes result'],
    validPatterns: [/text\s*\|>\s*String\.trim.*\|>\s*String\.downcase.*\|>\s*String\.split/],
    tags: ['pipe', 'string', 'transform'],
  },
  // ============================================================
  // Enum Module - Hard
  // ============================================================

  // Enum.reduce - building data structures
  {
    id: 'elixir-enum-reduce-004',
    category: 'Enum Module',
    difficulty: 'hard',
    title: 'Build Frequency Map',
    text: 'Use `Enum.reduce/3` to count occurrences of each element.',
    setup: 'items = [:a, :b, :a, :c, :b, :a]',
    setupCode: 'items = [:a, :b, :a, :c, :b, :a]',
    expected: { a: 3, b: 2, c: 1 },
    sample: 'Enum.reduce(items, %{}, fn x, acc -> Map.update(acc, x, 1, &(&1 + 1)) end)',
    hints: [
      'Start with empty map as accumulator',
      'Use Map.update to increment count',
      'Or use Enum.frequencies/1',
    ],
    validPatterns: [
      /Enum\.reduce\s*\(\s*items,\s*%\{\}/,
      /Enum\.frequencies\s*\(\s*items\s*\)/,
      /items\s*\|>\s*Enum\.frequencies/,
    ],
    tags: ['enum', 'reduce', 'frequency'],
  },
  {
    id: 'elixir-enum-reduce-005',
    category: 'Enum Module',
    difficulty: 'hard',
    title: 'Partition List with Reduce',
    text: 'Use `Enum.reduce/3` to partition numbers into evens and odds.',
    setup: 'numbers = [1, 2, 3, 4, 5, 6]',
    setupCode: 'numbers = [1, 2, 3, 4, 5, 6]',
    expected: { evens: [6, 4, 2], odds: [5, 3, 1] },
    sample:
      'Enum.reduce(numbers, %{evens: [], odds: []}, fn x, acc -> if rem(x, 2) == 0, do: Map.update!(acc, :evens, &[x | &1]), else: Map.update!(acc, :odds, &[x | &1]) end)',
    hints: [
      'Use map with :evens and :odds keys',
      'Prepend to lists for efficiency',
      'Can also use Enum.split_with/2',
    ],
    validPatterns: [/Enum\.reduce\s*\(\s*numbers,\s*%\{/, /Enum\.split_with\s*\(\s*numbers/],
    tags: ['enum', 'reduce', 'partition'],
  },

  // Complex transformations
  {
    id: 'elixir-enum-complex-001',
    category: 'Enum Module',
    difficulty: 'hard',
    title: 'Index and Transform',
    text: 'Use `Enum.with_index/2` and `Enum.map/2` to create indexed tuples with doubled values.',
    setup: 'numbers = [10, 20, 30]',
    setupCode: 'numbers = [10, 20, 30]',
    expected: [
      [0, 20],
      [1, 40],
      [2, 60],
    ],
    sample: 'numbers |> Enum.with_index() |> Enum.map(fn {val, idx} -> {idx, val * 2} end)',
    hints: ['with_index adds index to each element', 'Pattern match in the map function'],
    validPatterns: [/Enum\.with_index.*Enum\.map/, /numbers\s*\|>.*with_index.*\|>.*map/],
    tags: ['enum', 'with_index', 'transform'],
  },

  // ============================================================
  // String Module - Hard
  // ============================================================

  {
    id: 'elixir-string-complex-001',
    category: 'String Module',
    difficulty: 'hard',
    title: 'Title Case Words',
    text: 'Use String functions and Enum to convert to title case (capitalize each word).',
    setup: 'text = "hello world elixir"',
    setupCode: 'text = "hello world elixir"',
    expected: 'Hello World Elixir',
    sample: 'text |> String.split() |> Enum.map(&String.capitalize/1) |> Enum.join(" ")',
    hints: ['Split into words, capitalize each, join back', 'Use String.capitalize for each word'],
    validPatterns: [
      /String\.split.*Enum\.map.*String\.capitalize.*Enum\.join/,
      /text\s*\|>.*split.*\|>.*capitalize.*\|>.*join/,
    ],
    tags: ['string', 'capitalize', 'title_case'],
  },
  {
    id: 'elixir-string-complex-002',
    category: 'String Module',
    difficulty: 'hard',
    title: 'Count Vowels',
    text: 'Count the number of vowels in the string.',
    setup: 'text = "hello world"',
    setupCode: 'text = "hello world"',
    expected: 3,
    sample: 'text |> String.graphemes() |> Enum.count(&(&1 in ~w(a e i o u)))',
    hints: ['Convert to graphemes, then count matches', 'Use a list of vowels to check membership'],
    validPatterns: [
      /String\.graphemes.*Enum\.count/,
      /String\.replace.*String\.length/,
      /text\s*\|>.*graphemes.*\|>.*count/,
    ],
    tags: ['string', 'count', 'vowels'],
  },

  // ============================================================
  // List Operations - Hard
  // ============================================================

  {
    id: 'elixir-list-complex-001',
    category: 'List Operations',
    difficulty: 'hard',
    title: 'Zip with Index Using Recursion Pattern',
    text: 'Create pairs of [element, index] for each element without using Enum.with_index.',
    setup: 'letters = ["a", "b", "c"]',
    setupCode: 'letters = ["a", "b", "c"]',
    expected: [
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ],
    sample: 'Enum.zip(letters, 0..length(letters)-1) |> Enum.map(&Tuple.to_list/1)',
    hints: ['Zip with a range of indices', 'Or use Enum.with_index and convert'],
    validPatterns: [
      /Enum\.zip\s*\(\s*letters/,
      /Enum\.with_index.*Enum\.map/,
      /letters\s*\|>.*with_index/,
    ],
    tags: ['list', 'zip', 'index'],
  },

  // ============================================================
  // Map Operations - Hard
  // ============================================================

  {
    id: 'elixir-map-complex-001',
    category: 'Map Operations',
    difficulty: 'hard',
    title: 'Transform Map Keys and Values',
    text: 'Create a new map with uppercased string keys and doubled numeric values.',
    setup: 'data = %{"a" => 1, "b" => 2, "c" => 3}',
    setupCode: 'data = %{"a" => 1, "b" => 2, "c" => 3}',
    expected: { A: 2, B: 4, C: 6 },
    sample: 'Map.new(data, fn {k, v} -> {String.upcase(k), v * 2} end)',
    hints: [
      'Map.new/2 creates map from enumerable with transform',
      'Transform both key and value in the function',
    ],
    validPatterns: [/Map\.new\s*\(\s*data/, /Enum\.map.*\|>\s*Map\.new/, /data\s*\|>\s*Map\.new/],
    tags: ['map', 'transform', 'new'],
  },
  {
    id: 'elixir-map-complex-002',
    category: 'Map Operations',
    difficulty: 'hard',
    title: 'Invert Map Keys and Values',
    text: 'Create a new map where keys become values and values become keys.',
    setup: 'data = %{a: 1, b: 2, c: 3}',
    setupCode: 'data = %{a: 1, b: 2, c: 3}',
    expected: { 1: ':a', 2: ':b', 3: ':c' },
    sample: 'Map.new(data, fn {k, v} -> {v, k} end)',
    hints: [
      'Use Map.new with a function that swaps key and value',
      'Be aware this fails if values are not unique',
    ],
    validPatterns: [
      /Map\.new\s*\(\s*data.*fn\s*\{k,\s*v\}\s*->\s*\{v,\s*k\}/,
      /data\s*\|>\s*Map\.new.*\{v,\s*k\}/,
    ],
    tags: ['map', 'invert', 'transform'],
  },

  // ============================================================
  // Pipe Operator - Hard
  // ============================================================

  {
    id: 'elixir-pipe-004',
    category: 'Pipe Operator',
    difficulty: 'hard',
    title: 'Complex Data Pipeline',
    text: 'Filter users over 18, extract emails, downcase them, and sort.',
    setup:
      'users = [%{name: "Bob", age: 25, email: "BOB@MAIL.COM"}, %{name: "Alice", age: 17, email: "ALICE@MAIL.COM"}, %{name: "Carol", age: 30, email: "CAROL@MAIL.COM"}]',
    setupCode:
      'users = [%{name: "Bob", age: 25, email: "BOB@MAIL.COM"}, %{name: "Alice", age: 17, email: "ALICE@MAIL.COM"}, %{name: "Carol", age: 30, email: "CAROL@MAIL.COM"}]',
    expected: ['bob@mail.com', 'carol@mail.com'],
    sample:
      'users |> Enum.filter(&(&1.age >= 18)) |> Enum.map(& &1.email) |> Enum.map(&String.downcase/1) |> Enum.sort()',
    hints: ['Chain filter, map, map, sort', 'Each step transforms the data'],
    validPatterns: [/users\s*\|>\s*Enum\.filter.*\|>.*\|>.*\|>/],
    tags: ['pipe', 'filter', 'transform', 'complex'],
  },
  {
    id: 'elixir-pipe-005',
    category: 'Pipe Operator',
    difficulty: 'hard',
    title: 'Word Frequency Counter',
    text: 'Split text into words, downcase, and count frequency of each word.',
    setup: 'text = "the cat and the dog and the bird"',
    setupCode: 'text = "the cat and the dog and the bird"',
    expected: { the: 3, and: 2, cat: 1, dog: 1, bird: 1 },
    sample: 'text |> String.downcase() |> String.split() |> Enum.frequencies()',
    hints: [
      'Split into words, then use Enum.frequencies',
      'Downcase first for consistent counting',
    ],
    validPatterns: [/text\s*\|>\s*String\.downcase.*\|>\s*String\.split.*\|>\s*Enum\.frequencies/],
    tags: ['pipe', 'frequency', 'word_count'],
  },

  // ============================================================
  // STREAM MODULE - Lazy Evaluation Basics (Easy)
  // ============================================================

  {
    id: 'elixir-stream-001',
    category: 'Stream Module',
    difficulty: 'easy',
    title: 'Create Lazy Map',
    text: 'Use `Stream.map/2` to create a lazy transformation that doubles numbers, then evaluate with `Enum.to_list/1`.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: [2, 4, 6, 8, 10],
    sample: 'numbers |> Stream.map(&(&1 * 2)) |> Enum.to_list()',
    hints: [
      'Stream.map returns a lazy Stream, not a list',
      'Use Enum.to_list to force evaluation',
      'No computation happens until enumerated',
    ],
    validPatterns: [/Stream\.map\s*\(/, /Enum\.to_list\s*\(/],
    tags: ['stream', 'lazy', 'map'],
  },
  {
    id: 'elixir-stream-002',
    category: 'Stream Module',
    difficulty: 'easy',
    title: 'Lazy Filter',
    text: 'Use `Stream.filter/2` to lazily filter numbers greater than 5, then take the first 3 with `Enum.take/2`.',
    setup: 'numbers = [2, 8, 3, 9, 1, 7, 4, 6]',
    setupCode: 'numbers = [2, 8, 3, 9, 1, 7, 4, 6]',
    expected: [8, 9, 7],
    sample: 'numbers |> Stream.filter(&(&1 > 5)) |> Enum.take(3)',
    hints: [
      'Stream.filter returns a lazy enumerable',
      'Enum.take forces evaluation of only needed elements',
      'This is more efficient than Enum.filter |> Enum.take',
    ],
    validPatterns: [/Stream\.filter\s*\(/, /Enum\.take\s*\(/],
    tags: ['stream', 'filter', 'lazy', 'take'],
  },
  {
    id: 'elixir-stream-003',
    category: 'Stream Module',
    difficulty: 'easy',
    title: 'Chain Lazy Operations',
    text: 'Chain `Stream.map/2` and `Stream.filter/2` to square numbers, then keep only those greater than 10.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: [16, 25],
    sample: 'numbers |> Stream.map(&(&1 * &1)) |> Stream.filter(&(&1 > 10)) |> Enum.to_list()',
    hints: [
      'Stream operations can be chained',
      'Each Stream function returns a new Stream',
      'Single pass through data when finally evaluated',
    ],
    validPatterns: [/Stream\.map\s*\(/, /Stream\.filter\s*\(/, /Enum\.to_list\s*\(/],
    tags: ['stream', 'chain', 'lazy', 'pipeline'],
  },
  {
    id: 'elixir-stream-004',
    category: 'Stream Module',
    difficulty: 'easy',
    title: 'Flat Map Stream',
    text: 'Use `Stream.flat_map/2` to duplicate each number (e.g., [1,2,3] becomes [1,1,2,2,3,3]).',
    setup: 'numbers = [1, 2, 3]',
    setupCode: 'numbers = [1, 2, 3]',
    expected: [1, 1, 2, 2, 3, 3],
    sample: 'numbers |> Stream.flat_map(&[&1, &1]) |> Enum.to_list()',
    hints: [
      'flat_map maps and flattens in one step',
      'Each element becomes a list [x, x]',
      'Results are flattened into single stream',
    ],
    validPatterns: [/Stream\.flat_map\s*\(/, /Enum\.to_list/],
    tags: ['stream', 'flat_map', 'transformation'],
  },
  {
    id: 'elixir-stream-005',
    category: 'Stream Module',
    difficulty: 'easy',
    title: 'Stream with Index',
    text: 'Use `Stream.with_index/2` starting from 1 to add indices to elements.',
    setup: 'letters = ["a", "b", "c"]',
    setupCode: 'letters = ["a", "b", "c"]',
    expected: [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ],
    sample: 'letters |> Stream.with_index(1) |> Enum.to_list()',
    hints: [
      'Stream.with_index(offset) adds indices starting at offset',
      'Returns stream of {element, index} tuples',
      'Default offset is 0',
    ],
    validPatterns: [/Stream\.with_index\s*\(\s*1\s*\)/, /Enum\.to_list/],
    tags: ['stream', 'with_index', 'enumeration'],
  },
  {
    id: 'elixir-stream-006',
    category: 'Stream Module',
    difficulty: 'easy',
    title: 'Take While Stream',
    text: 'Use `Stream.take_while/2` to take elements while they are less than 5.',
    setup: 'numbers = [1, 2, 3, 4, 5, 6, 1, 2]',
    setupCode: 'numbers = [1, 2, 3, 4, 5, 6, 1, 2]',
    expected: [1, 2, 3, 4],
    sample: 'numbers |> Stream.take_while(&(&1 < 5)) |> Enum.to_list()',
    hints: [
      'take_while stops at first failing condition',
      'Does not resume even if later elements match',
      'Different from filter which checks all elements',
    ],
    validPatterns: [/Stream\.take_while\s*\(/, /<\s*5/],
    tags: ['stream', 'take_while', 'conditional'],
  },
  {
    id: 'elixir-stream-007',
    category: 'Stream Module',
    difficulty: 'easy',
    title: 'Drop While Stream',
    text: 'Use `Stream.drop_while/2` to skip elements while they are less than 5.',
    setup: 'numbers = [1, 3, 5, 7, 2, 9]',
    setupCode: 'numbers = [1, 3, 5, 7, 2, 9]',
    expected: [5, 7, 2, 9],
    sample: 'numbers |> Stream.drop_while(&(&1 < 5)) |> Enum.to_list()',
    hints: [
      'drop_while skips while condition is true',
      'Once condition false, takes all remaining',
      'Note: 2 is included because dropping stopped at 5',
    ],
    validPatterns: [/Stream\.drop_while\s*\(/, /<\s*5/],
    tags: ['stream', 'drop_while', 'filter'],
  },
  {
    id: 'elixir-stream-008',
    category: 'Stream Module',
    difficulty: 'easy',
    title: 'Concat Streams',
    text: 'Use `Stream.concat/2` to lazily join two lists together.',
    setup: 'list1 = [1, 2, 3]\nlist2 = [4, 5, 6]',
    setupCode: 'list1 = [1, 2, 3]\nlist2 = [4, 5, 6]',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'Stream.concat(list1, list2) |> Enum.to_list()',
    hints: [
      'Stream.concat joins enumerables lazily',
      'Second enumerable not touched until first exhausted',
      'Useful for processing multiple sources',
    ],
    validPatterns: [/Stream\.concat\s*\(/, /Enum\.to_list/],
    tags: ['stream', 'concat', 'join'],
  },

  // ============================================================
  // STREAM.ITERATE - Infinite Sequences (Medium)
  // ============================================================

  {
    id: 'elixir-stream-009',
    category: 'Stream.iterate',
    difficulty: 'medium',
    title: 'Generate Counting Sequence',
    text: 'Use `Stream.iterate/2` to create an infinite counting sequence starting from 1, then take the first 5 numbers.',
    setup: '# No setup needed',
    setupCode: '',
    expected: [1, 2, 3, 4, 5],
    sample: 'Stream.iterate(1, &(&1 + 1)) |> Enum.take(5)',
    hints: [
      'Stream.iterate(start, next_fn) creates infinite sequence',
      'First argument is starting value',
      'Second argument generates next value from current',
    ],
    validPatterns: [/Stream\.iterate\s*\(\s*1/, /Enum\.take\s*\(/],
    tags: ['stream', 'iterate', 'infinite', 'counting'],
  },
  {
    id: 'elixir-stream-010',
    category: 'Stream.iterate',
    difficulty: 'medium',
    title: 'Powers of Two',
    text: 'Use `Stream.iterate/2` to generate powers of 2 (1, 2, 4, 8, ...), take the first 6 values.',
    setup: '# No setup needed',
    setupCode: '',
    expected: [1, 2, 4, 8, 16, 32],
    sample: 'Stream.iterate(1, &(&1 * 2)) |> Enum.take(6)',
    hints: [
      'Start with 1 (which is 2^0)',
      'Each step multiplies by 2',
      'This creates an infinite stream of powers',
    ],
    validPatterns: [/Stream\.iterate\s*\(\s*1/, /\*\s*2/],
    tags: ['stream', 'iterate', 'math', 'powers'],
  },
  {
    id: 'elixir-stream-011',
    category: 'Stream.iterate',
    difficulty: 'medium',
    title: 'Fibonacci with Iterate',
    text: 'Use `Stream.iterate/2` with a tuple to generate Fibonacci numbers. Extract the first 8 values.',
    setup: '# No setup needed',
    setupCode: '',
    expected: [0, 1, 1, 2, 3, 5, 8, 13],
    sample:
      'Stream.iterate({0, 1}, fn {a, b} -> {b, a + b} end) |> Stream.map(&elem(&1, 0)) |> Enum.take(8)',
    hints: [
      'Use tuple {a, b} to track two consecutive numbers',
      'Next tuple is {b, a + b}',
      'Extract first element of each tuple for result',
    ],
    validPatterns: [/Stream\.iterate\s*\(\s*\{0\s*,\s*1\}/, /elem\s*\(/],
    tags: ['stream', 'iterate', 'fibonacci', 'math'],
  },
  // ============================================================
  // STREAM.CYCLE - Repeating Sequences (Medium)
  // ============================================================

  {
    id: 'elixir-stream-012',
    category: 'Stream.cycle',
    difficulty: 'medium',
    title: 'Repeat Pattern',
    text: 'Use `Stream.cycle/1` to infinitely repeat [1, 2, 3] and take the first 9 elements.',
    setup: 'pattern = [1, 2, 3]',
    setupCode: 'pattern = [1, 2, 3]',
    expected: [1, 2, 3, 1, 2, 3, 1, 2, 3],
    sample: 'Stream.cycle(pattern) |> Enum.take(9)',
    hints: [
      'Stream.cycle creates infinite repetition',
      'Works with any enumerable',
      'Must use take or similar to avoid infinite loop',
    ],
    validPatterns: [/Stream\.cycle\s*\(/, /Enum\.take\s*\(/],
    tags: ['stream', 'cycle', 'infinite', 'repeat'],
  },
  {
    id: 'elixir-stream-014',
    category: 'Stream.cycle',
    difficulty: 'medium',
    title: 'Round Robin Assignment',
    text: 'Use `Stream.cycle/1` with `Enum.zip/2` to assign 6 tasks to 3 workers in round-robin fashion.',
    setup:
      'tasks = [:task1, :task2, :task3, :task4, :task5, :task6]\nworkers = [:alice, :bob, :charlie]',
    setupCode:
      'tasks = [:task1, :task2, :task3, :task4, :task5, :task6]\nworkers = [:alice, :bob, :charlie]',
    expected: [
      [':task1', ':alice'],
      [':task2', ':bob'],
      [':task3', ':charlie'],
      [':task4', ':alice'],
      [':task5', ':bob'],
      [':task6', ':charlie'],
    ],
    sample: 'Enum.zip(tasks, Stream.cycle(workers))',
    hints: [
      'Cycle workers infinitely',
      'Zip with finite task list to bound result',
      'zip stops when shorter enumerable ends',
    ],
    validPatterns: [/Stream\.cycle\s*\(/, /Enum\.zip\s*\(/],
    tags: ['stream', 'cycle', 'zip', 'assignment'],
  },
  {
    id: 'elixir-stream-015',
    category: 'Stream.cycle',
    difficulty: 'medium',
    title: 'Alternating Boolean Pattern',
    text: 'Create an alternating true/false pattern for 10 elements using `Stream.cycle/1`.',
    setup: '# No setup needed',
    setupCode: '',
    expected: [true, false, true, false, true, false, true, false, true, false],
    sample: 'Stream.cycle([true, false]) |> Enum.take(10)',
    hints: [
      'Cycle over [true, false]',
      'Take exactly 10 elements',
      'Useful for alternating operations',
    ],
    validPatterns: [/Stream\.cycle\s*\(\s*\[true\s*,\s*false\]/, /Enum\.take\s*\(/],
    tags: ['stream', 'cycle', 'boolean', 'alternating'],
  },

  // ============================================================
  // STREAM.UNFOLD - Custom Generation (Medium)
  // ============================================================

  {
    id: 'elixir-stream-016',
    category: 'Stream.unfold',
    difficulty: 'medium',
    title: 'Range with Unfold',
    text: 'Use `Stream.unfold/2` to generate numbers from 1 to 5 (inclusive).',
    setup: '# No setup needed',
    setupCode: '',
    expected: [1, 2, 3, 4, 5],
    sample: 'Stream.unfold(1, fn n -> if n <= 5, do: {n, n + 1}, else: nil end) |> Enum.to_list()',
    hints: [
      'unfold returns {emit_value, next_state} or nil to stop',
      'First element of tuple is emitted',
      'Second element becomes next state',
    ],
    validPatterns: [/Stream\.unfold\s*\(/, /nil/],
    tags: ['stream', 'unfold', 'generation', 'range'],
  },
  {
    id: 'elixir-stream-017',
    category: 'Stream.unfold',
    difficulty: 'medium',
    title: 'Factorial Sequence',
    text: 'Use `Stream.unfold/2` to generate factorials: 1!, 2!, 3!, 4!, 5! (values: 1, 2, 6, 24, 120).',
    setup: '# No setup needed',
    setupCode: '',
    expected: [1, 2, 6, 24, 120],
    sample:
      'Stream.unfold({1, 1}, fn {n, fact} -> {fact, {n + 1, fact * (n + 1)}} end) |> Enum.take(5)',
    hints: [
      'Track both n and current factorial in state',
      'State is {n, n!}',
      'Next state is {n+1, (n+1)!}',
    ],
    validPatterns: [/Stream\.unfold\s*\(/, /fact\s*\*/],
    tags: ['stream', 'unfold', 'factorial', 'math'],
  },
  {
    id: 'elixir-stream-018',
    category: 'Stream.unfold',
    difficulty: 'medium',
    title: 'Triangular Numbers',
    text: 'Use `Stream.unfold/2` to generate the first 6 triangular numbers (1, 3, 6, 10, 15, 21).',
    setup: '# No setup needed',
    setupCode: '',
    expected: [1, 3, 6, 10, 15, 21],
    sample: 'Stream.unfold({1, 1}, fn {n, sum} -> {sum, {n + 1, sum + n + 1}} end) |> Enum.take(6)',
    hints: [
      'nth triangular = 1+2+...+n = n(n+1)/2',
      'Track both n and running sum in state',
      'Each step: emit sum, then add next n',
    ],
    validPatterns: [/Stream\.unfold\s*\(/, /sum\s*\+/],
    tags: ['stream', 'unfold', 'triangular', 'math'],
  },

  // ============================================================
  // CHUNK AND WINDOW OPERATIONS (Medium)
  // ============================================================

  {
    id: 'elixir-stream-019',
    category: 'Stream Chunk Operations',
    difficulty: 'medium',
    title: 'Chunk Every N',
    text: 'Use `Stream.chunk_every/2` to split a list into chunks of 2 elements.',
    setup: 'numbers = [1, 2, 3, 4, 5, 6]',
    setupCode: 'numbers = [1, 2, 3, 4, 5, 6]',
    expected: [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    sample: 'numbers |> Stream.chunk_every(2) |> Enum.to_list()',
    hints: [
      'Stream.chunk_every(n) creates chunks of size n',
      'Last chunk may be smaller if not evenly divisible',
      'Returns stream of lists',
    ],
    validPatterns: [/Stream\.chunk_every\s*\(\s*2\s*\)/, /Enum\.to_list/],
    tags: ['stream', 'chunk', 'partition', 'batch'],
  },
  {
    id: 'elixir-stream-020',
    category: 'Stream Chunk Operations',
    difficulty: 'medium',
    title: 'Sliding Window',
    text: 'Create sliding windows of size 3 with step 1 (overlapping windows) using `Stream.chunk_every/4`.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ],
    sample: 'numbers |> Stream.chunk_every(3, 1, :discard) |> Enum.to_list()',
    hints: [
      'chunk_every(count, step, leftover)',
      'step=1 means sliding by one element',
      ':discard drops incomplete final chunks',
    ],
    validPatterns: [/Stream\.chunk_every\s*\(\s*3\s*,\s*1/, /:discard/],
    tags: ['stream', 'chunk', 'window', 'sliding'],
  },
  {
    id: 'elixir-stream-021',
    category: 'Stream Chunk Operations',
    difficulty: 'medium',
    title: 'Chunk by Condition',
    text: 'Use `Stream.chunk_by/2` to group consecutive positive and negative numbers separately.',
    setup: 'numbers = [1, 2, -3, -4, 5, 6, -7]',
    setupCode: 'numbers = [1, 2, -3, -4, 5, 6, -7]',
    expected: [[1, 2], [-3, -4], [5, 6], [-7]],
    sample: 'numbers |> Stream.chunk_by(&(&1 >= 0)) |> Enum.to_list()',
    hints: [
      'chunk_by groups consecutive elements with same function result',
      'Creates new chunk when function result changes',
      'Different from chunk_every which uses fixed size',
    ],
    validPatterns: [/Stream\.chunk_by\s*\(/, />= 0|> 0|< 0/],
    tags: ['stream', 'chunk_by', 'grouping', 'partition'],
  },

  // ============================================================
  // COMBINING STREAM AND ENUM (Medium)
  // ============================================================

  {
    id: 'elixir-stream-022',
    category: 'Stream and Enum',
    difficulty: 'medium',
    title: 'Efficient Large List Processing',
    text: 'Process a range of 1 to 1000: square each number, keep only those divisible by 100, take first 5. Use Stream for efficiency.',
    setup: 'numbers = 1..1000',
    setupCode: 'numbers = 1..1000',
    expected: [100, 400, 900, 1600, 2500],
    sample:
      'numbers |> Stream.map(&(&1 * &1)) |> Stream.filter(&(rem(&1, 100) == 0)) |> Enum.take(5)',
    hints: [
      'Use Stream.map and Stream.filter for lazy evaluation',
      'Enum.take forces evaluation of only needed elements',
      'Much more efficient than processing all 1000 elements',
    ],
    validPatterns: [/Stream\.map/, /Stream\.filter/, /Enum\.take/],
    tags: ['stream', 'enum', 'efficiency', 'pipeline', 'lazy'],
  },
  {
    id: 'elixir-stream-023',
    category: 'Stream and Enum',
    difficulty: 'medium',
    title: 'Stream Scan Operation',
    text: 'Use `Stream.scan/2` to compute cumulative products (running product).',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: [1, 2, 6, 24, 120],
    sample: 'numbers |> Stream.scan(&(&1 * &2)) |> Enum.to_list()',
    hints: [
      'Stream.scan is like reduce but emits intermediate values',
      'Each output is accumulator after processing that element',
      'First element is passed through unchanged',
    ],
    validPatterns: [/Stream\.scan\s*\(/, /\*\s*&2|&2\s*\*/],
    tags: ['stream', 'scan', 'cumulative', 'product'],
  },
  {
    id: 'elixir-stream-024',
    category: 'Stream and Enum',
    difficulty: 'medium',
    title: 'Zip Multiple Streams',
    text: 'Use `Stream.zip/1` to combine three lists into tuples.',
    setup:
      'names = ["Alice", "Bob", "Charlie"]\nages = [25, 30, 35]\ncities = ["NYC", "LA", "Chicago"]',
    setupCode:
      'names = ["Alice", "Bob", "Charlie"]\nages = [25, 30, 35]\ncities = ["NYC", "LA", "Chicago"]',
    expected: [
      ['Alice', 25, 'NYC'],
      ['Bob', 30, 'LA'],
      ['Charlie', 35, 'Chicago'],
    ],
    sample: 'Stream.zip([names, ages, cities]) |> Enum.to_list()',
    hints: [
      'Stream.zip/1 accepts list of enumerables',
      'Returns tuples (or lists in Elixir 1.12+)',
      'Stops at shortest enumerable',
    ],
    validPatterns: [/Stream\.zip\s*\(\s*\[/, /Enum\.to_list/],
    tags: ['stream', 'zip', 'multiple', 'combine'],
  },

  // ============================================================
  // STREAM.TRANSFORM - Advanced Transformation (Hard)
  // ============================================================

  {
    id: 'elixir-stream-025',
    category: 'Stream.transform',
    difficulty: 'hard',
    title: 'Running Sum Transform',
    text: 'Use `Stream.transform/3` to compute running (cumulative) sums.',
    setup: 'numbers = [1, 2, 3, 4, 5]',
    setupCode: 'numbers = [1, 2, 3, 4, 5]',
    expected: [1, 3, 6, 10, 15],
    sample:
      'numbers |> Stream.transform(0, fn x, acc -> {[acc + x], acc + x} end) |> Enum.to_list()',
    hints: [
      'transform(enumerable, acc, reducer)',
      'reducer returns {emit_list, new_acc}',
      'Accumulator tracks running sum',
    ],
    validPatterns: [/Stream\.transform\s*\(/, /acc\s*\+\s*x|x\s*\+\s*acc/],
    tags: ['stream', 'transform', 'accumulator', 'running-sum'],
  },
  {
    id: 'elixir-stream-026',
    category: 'Stream.transform',
    difficulty: 'hard',
    title: 'Deduplicate Adjacent',
    text: 'Use `Stream.transform/3` to remove adjacent duplicates from a list.',
    setup: 'numbers = [1, 1, 2, 2, 2, 3, 1, 1]',
    setupCode: 'numbers = [1, 1, 2, 2, 2, 3, 1, 1]',
    expected: [1, 2, 3, 1],
    sample:
      'numbers |> Stream.transform(nil, fn x, prev -> if x == prev, do: {[], x}, else: {[x], x} end) |> Enum.to_list()',
    hints: [
      'Track previous element in accumulator',
      'Emit empty list when duplicate',
      'Emit [x] when different from previous',
    ],
    validPatterns: [/Stream\.transform\s*\(/, /==\s*prev|prev\s*==/],
    tags: ['stream', 'transform', 'dedupe', 'adjacent'],
  },
  {
    id: 'elixir-stream-027',
    category: 'Stream.transform',
    difficulty: 'hard',
    title: 'Take Until Sum Exceeds',
    text: 'Use `Stream.transform/3` to take elements until sum exceeds 10, then halt.',
    setup: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
    setupCode: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
    expected: [1, 2, 3, 4],
    sample:
      'numbers |> Stream.transform(0, fn x, acc -> if acc + x > 10, do: {:halt, acc}, else: {[x], acc + x} end) |> Enum.to_list()',
    hints: [
      'Track running sum in accumulator',
      'Return {:halt, state} to stop stream',
      'Sum of 1+2+3+4=10, adding 5 would exceed',
    ],
    validPatterns: [/Stream\.transform\s*\(/, /:halt/],
    tags: ['stream', 'transform', 'halt', 'conditional'],
  },

  // ============================================================
  // STREAM.RESOURCE - Resource Cleanup (Hard)
  // ============================================================

  {
    id: 'elixir-stream-028',
    category: 'Stream.resource',
    difficulty: 'hard',
    title: 'Simulated Counter Resource',
    text: 'Use `Stream.resource/3` to create a counter that emits numbers 1-5. The resource should initialize, emit values, and clean up.',
    setup: '# Stream.resource(start_fn, next_fn, cleanup_fn)',
    setupCode: '',
    expected: [1, 2, 3, 4, 5],
    sample:
      'Stream.resource(fn -> 1 end, fn n -> if n <= 5, do: {[n], n + 1}, else: {:halt, n} end, fn _ -> :ok end) |> Enum.to_list()',
    hints: [
      'Stream.resource(start_fn, next_fn, cleanup_fn)',
      'next_fn returns {[values], next_state} or {:halt, state}',
      'cleanup_fn called when stream ends',
    ],
    validPatterns: [/Stream\.resource\s*\(/, /:halt/, /fn\s*_\s*->/],
    tags: ['stream', 'resource', 'cleanup', 'lifecycle'],
  },
  {
    id: 'elixir-stream-029',
    category: 'Stream.resource',
    difficulty: 'hard',
    title: 'Bounded Queue Stream',
    text: 'Create a `Stream.resource/3` that emits items from a simulated queue until empty.',
    setup: 'initial_queue = [10, 20, 30, 40]',
    setupCode: 'initial_queue = [10, 20, 30, 40]',
    expected: [10, 20, 30, 40],
    sample:
      'Stream.resource(fn -> initial_queue end, fn [] -> {:halt, []}; [h | t] -> {[h], t} end, fn _ -> :ok end) |> Enum.to_list()',
    hints: [
      'Use list as queue state',
      'Pop from head, return tail as next state',
      'Halt when queue is empty',
    ],
    validPatterns: [/Stream\.resource\s*\(/, /\[h\s*\|\s*t\]|hd\(|tl\(/, /:halt/],
    tags: ['stream', 'resource', 'queue', 'dequeue'],
  },

  // ============================================================
  // FILE STREAMING PATTERNS (Medium)
  // ============================================================

  {
    id: 'elixir-stream-030',
    category: 'File Streaming',
    difficulty: 'medium',
    title: 'Stream File Lines',
    text: 'Demonstrate how to stream lines from a file: filter non-empty lines and take first 3. (Simulated with list)',
    setup: 'lines = ["hello", "", "world", "", "elixir", "streams"]',
    setupCode: 'lines = ["hello", "", "world", "", "elixir", "streams"]',
    expected: ['hello', 'world', 'elixir'],
    sample: 'lines |> Stream.filter(&(&1 != "")) |> Enum.take(3)',
    hints: [
      'In real use: File.stream!(path)',
      'Stream.filter removes empty lines lazily',
      'Only reads as many lines as needed',
    ],
    validPatterns: [/Stream\.filter\s*\(/, /Enum\.take\s*\(\s*3\s*\)/],
    tags: ['stream', 'file', 'filter', 'lines'],
  },
  {
    id: 'elixir-stream-031',
    category: 'File Streaming',
    difficulty: 'medium',
    title: 'Line Processing Pipeline',
    text: 'Process lines: trim whitespace, convert to uppercase, filter lines starting with "A".',
    setup: 'lines = ["  apple  ", "  banana  ", "  avocado  ", "  cherry  "]',
    setupCode: 'lines = ["  apple  ", "  banana  ", "  avocado  ", "  cherry  "]',
    expected: ['APPLE', 'AVOCADO'],
    sample:
      'lines |> Stream.map(&String.trim/1) |> Stream.map(&String.upcase/1) |> Stream.filter(&String.starts_with?(&1, "A")) |> Enum.to_list()',
    hints: [
      'Chain multiple Stream operations',
      'String.trim removes whitespace',
      'String.upcase converts to uppercase',
    ],
    validPatterns: [/Stream\.map/, /String\.trim/, /String\.upcase/, /String\.starts_with\?/],
    tags: ['stream', 'string', 'pipeline', 'file'],
  },

  // ============================================================
  // ADVANCED STREAM PATTERNS (Hard)
  // ============================================================

  {
    id: 'elixir-stream-032',
    category: 'Stream Advanced',
    difficulty: 'hard',
    title: 'Moving Average',
    text: 'Calculate 3-element moving average for the list using sliding windows. Return averages as floats.',
    setup: 'values = [10, 20, 30, 40, 50]',
    setupCode: 'values = [10, 20, 30, 40, 50]',
    expected: [20.0, 30.0, 40.0],
    sample:
      'values |> Stream.chunk_every(3, 1, :discard) |> Enum.map(fn chunk -> Enum.sum(chunk) / length(chunk) end)',
    hints: [
      'Create sliding windows of size 3',
      'Calculate average for each window',
      'Use Stream.chunk_every with step=1',
    ],
    validPatterns: [/Stream\.chunk_every\s*\(\s*3\s*,\s*1/, /Enum\.sum/, /length/],
    tags: ['stream', 'chunk', 'moving-average', 'statistics'],
  },
  {
    id: 'elixir-stream-033',
    category: 'Stream Advanced',
    difficulty: 'hard',
    title: 'Interleave Streams',
    text: 'Interleave two lists [1,3,5] and [2,4,6] to get [1,2,3,4,5,6] using Stream operations.',
    setup: 'odds = [1, 3, 5]\nevens = [2, 4, 6]',
    setupCode: 'odds = [1, 3, 5]\nevens = [2, 4, 6]',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'Stream.zip(odds, evens) |> Stream.flat_map(fn {a, b} -> [a, b] end) |> Enum.to_list()',
    hints: [
      'Zip pairs corresponding elements',
      'flat_map to expand each pair',
      'Results in interleaved sequence',
    ],
    validPatterns: [/Stream\.zip\s*\(/, /Stream\.flat_map\s*\(/],
    tags: ['stream', 'zip', 'interleave', 'flat_map'],
  },
  {
    id: 'elixir-stream-034',
    category: 'Stream Advanced',
    difficulty: 'hard',
    title: 'Collatz Sequence',
    text: 'Use `Stream.iterate/2` to generate the Collatz sequence starting from 13 until reaching 1. If even: n/2, if odd: 3n+1.',
    setup: '# Collatz conjecture: sequence always reaches 1',
    setupCode: '',
    expected: [13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
    sample:
      'Stream.iterate(13, fn n -> if rem(n, 2) == 0, do: div(n, 2), else: n * 3 + 1 end) |> Enum.take_while(&(&1 != 1)) |> then(&(&1 ++ [1]))',
    hints: [
      'Collatz: n/2 if even, 3n+1 if odd',
      'Use Enum.take_while to stop at 1',
      'Remember to include 1 in final result',
    ],
    validPatterns: [/Stream\.iterate/, /rem\s*\(.*,\s*2\s*\)/, /div\s*\(/],
    tags: ['stream', 'iterate', 'collatz', 'math'],
  },
  {
    id: 'elixir-stream-035',
    category: 'Stream Advanced',
    difficulty: 'hard',
    title: 'Prime Number Generator',
    text: 'Generate the first 5 prime numbers using Stream operations.',
    setup:
      'is_prime = fn n -> n > 1 and Enum.all?(2..max(2, trunc(:math.sqrt(n))), &(rem(n, &1) != 0 or &1 == n)) end',
    setupCode:
      'is_prime = fn n -> n > 1 and Enum.all?(2..max(2, trunc(:math.sqrt(n))), &(rem(n, &1) != 0 or &1 == n)) end',
    expected: [2, 3, 5, 7, 11],
    sample: 'Stream.iterate(2, &(&1 + 1)) |> Stream.filter(is_prime) |> Enum.take(5)',
    hints: [
      'Generate infinite sequence starting at 2',
      'Filter using primality test',
      'Take only first 5 primes',
    ],
    validPatterns: [
      /Stream\.iterate/,
      /Stream\.filter.*is_prime|is_prime.*Stream\.filter/,
      /Enum\.take/,
    ],
    tags: ['stream', 'iterate', 'filter', 'prime', 'math'],
  },

  // ========================================
  // BEGINNER FUNDAMENTALS
  // ========================================

  // -- Recursion (3 problems) --
  {
    id: 'ex-beginner-recursion-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Recursive Sum',
    text: 'Use the recursive sum_to function to calculate the sum of numbers from 1 to n.',
    setup:
      'defmodule Math do\n  def sum_to(0), do: 0\n  def sum_to(n), do: n + sum_to(n - 1)\nend\nn = 5',
    setupCode:
      'defmodule Math do\n  def sum_to(0), do: 0\n  def sum_to(n), do: n + sum_to(n - 1)\nend\nn = 5',
    expected: 15,
    sample: 'Math.sum_to(n)',
    hints: [
      'Base case: sum_to(0) returns 0',
      'Recursive case: n + sum_to(n-1)',
      'Call the function with n',
    ],
    validPatterns: [/Math\.sum_to\s*\(\s*n\s*\)/, /sum_to\s*\(\s*5\s*\)/],
    tags: ['recursion', 'beginner', 'sum'],
  },
  {
    id: 'ex-beginner-recursion-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Recursive Factorial',
    text: 'Use the recursive factorial function to calculate 5 factorial.',
    setup:
      'defmodule Math do\n  def factorial(0), do: 1\n  def factorial(n), do: n * factorial(n - 1)\nend\nnum = 5',
    setupCode:
      'defmodule Math do\n  def factorial(0), do: 1\n  def factorial(n), do: n * factorial(n - 1)\nend\nnum = 5',
    expected: 120,
    sample: 'Math.factorial(num)',
    hints: [
      'Base case: factorial(0) returns 1',
      'Recursive case: n * factorial(n-1)',
      'Pattern matching on function head',
    ],
    validPatterns: [/Math\.factorial\s*\(\s*num\s*\)/, /factorial\s*\(\s*5\s*\)/],
    tags: ['recursion', 'beginner', 'factorial'],
  },
  {
    id: 'ex-beginner-recursion-003',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Recursive Length',
    text: 'Use the recursive my_length function to find the length of the list.',
    setup:
      'defmodule MyList do\n  def my_length([]), do: 0\n  def my_length([_head | tail]), do: 1 + my_length(tail)\nend\nwords = ["hello", "world", "elixir"]',
    setupCode:
      'defmodule MyList do\n  def my_length([]), do: 0\n  def my_length([_head | tail]), do: 1 + my_length(tail)\nend\nwords = ["hello", "world", "elixir"]',
    expected: 3,
    sample: 'MyList.my_length(words)',
    hints: [
      'Base case: empty list returns 0',
      'Pattern match [_head | tail] for non-empty list',
      'Recursive case: 1 + length of tail',
    ],
    validPatterns: [/MyList\.my_length\s*\(\s*words\s*\)/, /my_length\s*\(/],
    tags: ['recursion', 'beginner', 'length', 'list'],
  },

  // -- Pattern Matching (3 problems) --
  {
    id: 'ex-beginner-pattern-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Pattern Match Head',
    text: 'Use pattern matching to extract the first element of the list.',
    setup: '[first | _rest] = [10, 20, 30]',
    setupCode: 'numbers = [10, 20, 30]',
    expected: 10,
    sample: '[first | _rest] = numbers; first',
    hints: [
      'Pattern [head | tail] destructures lists',
      'Use underscore prefix for unused variables',
      'head binds to first element',
    ],
    validPatterns: [/\[\s*\w+\s*\|\s*_?\w*\s*\]\s*=/, /hd\s*\(\s*numbers\s*\)/],
    tags: ['pattern-matching', 'beginner', 'head', 'list'],
  },
  {
    id: 'ex-beginner-pattern-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Pattern Match Tuple',
    text: 'Use pattern matching to extract the second element from the tuple.',
    setup: 'pair = {"hello", 42}',
    setupCode: 'pair = {"hello", 42}',
    expected: 42,
    sample: '{_first, second} = pair; second',
    hints: [
      'Tuples use curly braces {}',
      'Pattern {a, b} matches 2-element tuple',
      'Use _first to ignore first element',
    ],
    validPatterns: [/\{\s*_?\w+\s*,\s*\w+\s*\}\s*=/, /elem\s*\(\s*pair\s*,\s*1\s*\)/],
    tags: ['pattern-matching', 'beginner', 'tuple'],
  },
  {
    id: 'ex-beginner-pattern-003',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Pattern Match in Case',
    text: 'Use case with pattern matching to describe the boolean value.',
    setup: 'value = true',
    setupCode: 'value = true',
    expected: 'yes',
    sample: 'case value do\n  true -> "yes"\n  false -> "no"\nend',
    hints: [
      'case expression matches patterns',
      'Each clause has pattern -> result',
      'Patterns are checked top to bottom',
    ],
    validPatterns: [/case\s+value\s+do/, /true\s*->\s*"yes"/],
    tags: ['pattern-matching', 'beginner', 'case', 'boolean'],
  },

  // -- Lists (2 problems) --
  {
    id: 'ex-beginner-list-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Concatenate Lists',
    text: 'Use the ++ operator to concatenate the two lists.',
    setup: 'list1 = [1, 2, 3]\nlist2 = [4, 5, 6]',
    setupCode: 'list1 = [1, 2, 3]\nlist2 = [4, 5, 6]',
    expected: [1, 2, 3, 4, 5, 6],
    sample: 'list1 ++ list2',
    hints: ['++ concatenates two lists', 'Left list comes first', 'Returns a new list'],
    validPatterns: [/list1\s*\+\+\s*list2/, /Enum\.concat\s*\(\s*list1\s*,\s*list2\s*\)/],
    tags: ['list', 'beginner', 'concatenation'],
  },
  {
    id: 'ex-beginner-list-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Cons Operator',
    text: 'Use the | (cons) operator to prepend 0 to the list.',
    setup: 'numbers = [1, 2, 3]',
    setupCode: 'numbers = [1, 2, 3]',
    expected: [0, 1, 2, 3],
    sample: '[0 | numbers]',
    hints: ['| prepends element to a list', 'Syntax is [element | list]', 'Creates a new list'],
    validPatterns: [/\[\s*0\s*\|\s*numbers\s*\]/],
    tags: ['list', 'beginner', 'cons'],
  },

  // -- Maps (2 problems) --
  {
    id: 'ex-beginner-map-001',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Create Map',
    text: 'Access the value associated with the :name key in the map.',
    setup: 'person = %{name: "Alice", age: 30}',
    setupCode: 'person = %{name: "Alice", age: 30}',
    expected: 'Alice',
    sample: 'person.name',
    hints: [
      'Use dot notation for atom keys',
      'Or use Map.get(map, :key)',
      'Or pattern match %{name: name} = person',
    ],
    validPatterns: [
      /person\.name/,
      /Map\.get\s*\(\s*person\s*,\s*:name\s*\)/,
      /person\s*\[\s*:name\s*\]/,
    ],
    tags: ['map', 'beginner', 'access'],
  },
  {
    id: 'ex-beginner-map-002',
    category: 'Beginner Fundamentals',
    difficulty: 'easy',
    title: 'Update Map',
    text: 'Update the :age value in the map to 31.',
    setup: 'person = %{name: "Alice", age: 30}',
    setupCode: 'person = %{name: "Alice", age: 30}',
    expected: { name: 'Alice', age: 31 },
    sample: '%{person | age: 31}',
    hints: [
      'Use %{map | key: value} syntax',
      'Or use Map.put(map, :key, value)',
      'Creates a new map (immutable)',
    ],
    validPatterns: [
      /%\{\s*person\s*\|\s*age:\s*31\s*\}/,
      /Map\.put\s*\(\s*person\s*,\s*:age\s*,\s*31\s*\)/,
    ],
    tags: ['map', 'beginner', 'update'],
  },
];

export default elixirProblems;
