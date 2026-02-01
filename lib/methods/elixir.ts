import type { Method } from '../types';

export const elixirMethods: Method[] = [
  // Enum Module
  {
    name: 'Enum.map',
    category: 'Enum Module',
    syntax: 'Enum.map(enumerable, fun)',
    description:
      'Returns a list where each element is the result of invoking fun on each corresponding element of the enumerable.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure (list, map, range, etc.)' },
      { name: 'fun', type: 'function', description: 'A function applied to each element' },
    ],
    returns: { type: 'list', description: 'A new list with the transformed elements' },
    examples: [
      {
        code: 'Enum.map([1, 2, 3], fn x -> x * 2 end)',
        output: '[2, 4, 6]',
        explanation: 'Doubles each element in the list',
      },
      {
        code: 'Enum.map([1, 2, 3], &(&1 * 2))',
        output: '[2, 4, 6]',
        explanation: 'Using the capture operator shorthand',
      },
      {
        code: '[1, 2, 3] |> Enum.map(&(&1 + 10))',
        output: '[11, 12, 13]',
        explanation: 'Using the pipe operator to pass the list into Enum.map',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Enum.each', 'Enum.flat_map', 'Stream.map'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Works with any enumerable, including ranges and maps', 'Eagerly evaluates the entire enumerable'],
  },
  {
    name: 'Enum.filter',
    category: 'Enum Module',
    syntax: 'Enum.filter(enumerable, fun)',
    description:
      'Filters the enumerable, returning only those elements for which fun returns a truthy value.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'fun', type: 'function', description: 'A function that returns a boolean-like value' },
    ],
    returns: { type: 'list', description: 'A filtered list of elements' },
    examples: [
      {
        code: 'Enum.filter([1, 2, 3, 4, 5], fn x -> rem(x, 2) == 0 end)',
        output: '[2, 4]',
        explanation: 'Keeps only even numbers',
      },
      {
        code: '[1, 2, 3, 4, 5] |> Enum.filter(&(&1 > 3))',
        output: '[4, 5]',
        explanation: 'Filters elements greater than 3 using pipe operator',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Enum.reject', 'Enum.find', 'Stream.filter'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'Enum.reduce',
    category: 'Enum Module',
    syntax: 'Enum.reduce(enumerable, acc, fun)',
    description:
      'Invokes fun for each element in the enumerable with the accumulator. The initial value of the accumulator is acc. The function must return the updated accumulator.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'acc', type: 'any', description: 'The initial accumulator value' },
      { name: 'fun', type: 'function', description: 'A function receiving element and accumulator, returns new accumulator' },
    ],
    returns: { type: 'any', description: 'The final accumulator value' },
    examples: [
      {
        code: 'Enum.reduce([1, 2, 3], 0, fn x, acc -> x + acc end)',
        output: '6',
        explanation: 'Sums all elements starting from 0',
      },
      {
        code: '[1, 2, 3, 4] |> Enum.reduce(%{}, fn x, acc -> Map.put(acc, x, x * x) end)',
        output: '%{1 => 1, 2 => 4, 3 => 9, 4 => 16}',
        explanation: 'Builds a map of numbers to their squares',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Enum.map', 'Enum.scan', 'Enum.sum'],
    sinceVersion: 'Elixir 1.0',
    notes: ['If no accumulator is given, the first element of the enumerable is used'],
  },
  {
    name: 'Enum.sort',
    category: 'Enum Module',
    syntax: 'Enum.sort(enumerable, sorter \\\\ :asc)',
    description:
      'Sorts the enumerable according to Erlang term ordering or a given sorter function.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'sorter', type: 'function or :asc or :desc', description: 'Sorting direction or comparison function', optional: true, defaultValue: ':asc' },
    ],
    returns: { type: 'list', description: 'A sorted list' },
    examples: [
      {
        code: 'Enum.sort([3, 1, 2])',
        output: '[1, 2, 3]',
        explanation: 'Default ascending sort',
      },
      {
        code: 'Enum.sort([3, 1, 2], :desc)',
        output: '[3, 2, 1]',
        explanation: 'Descending sort using atom shorthand',
      },
      {
        code: 'Enum.sort(["banana", "apple", "cherry"], &(String.length(&1) <= String.length(&2)))',
        output: '["apple", "banana", "cherry"]',
        explanation: 'Sort by string length using a custom comparator',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Enum.sort_by', 'Enum.min', 'Enum.max'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Uses merge sort, which is stable'],
  },
  {
    name: 'Enum.find',
    category: 'Enum Module',
    syntax: 'Enum.find(enumerable, default \\\\ nil, fun)',
    description:
      'Returns the first element for which fun returns a truthy value. If no such element is found, returns default.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'default', type: 'any', description: 'Default value if not found', optional: true, defaultValue: 'nil' },
      { name: 'fun', type: 'function', description: 'A function that returns a boolean-like value' },
    ],
    returns: { type: 'any', description: 'The first matching element or default' },
    examples: [
      {
        code: 'Enum.find([2, 3, 4], fn x -> rem(x, 2) == 1 end)',
        output: '3',
        explanation: 'Finds the first odd number',
      },
      {
        code: 'Enum.find([2, 4, 6], :not_found, fn x -> rem(x, 2) == 1 end)',
        output: ':not_found',
        explanation: 'Returns the default when no element matches',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Enum.find_index', 'Enum.find_value', 'Enum.filter'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'Enum.any?',
    category: 'Enum Module',
    syntax: 'Enum.any?(enumerable, fun)',
    description:
      'Returns true if fun returns a truthy value for at least one element in the enumerable.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'fun', type: 'function', description: 'A function that returns a boolean-like value' },
    ],
    returns: { type: 'boolean', description: 'true if any element matches, false otherwise' },
    examples: [
      {
        code: 'Enum.any?([1, 2, 3], fn x -> x > 2 end)',
        output: 'true',
      },
      {
        code: 'Enum.any?([1, 2, 3], &(&1 > 5))',
        output: 'false',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Enum.all?', 'Enum.find', 'Enum.member?'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Short-circuits as soon as a truthy value is found'],
  },
  {
    name: 'Enum.chunk_every',
    category: 'Enum Module',
    syntax: 'Enum.chunk_every(enumerable, count, step \\\\ count, leftover \\\\ [])',
    description:
      'Splits the enumerable into chunks of the given count. An optional step and leftover can control overlap and padding.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'count', type: 'pos_integer', description: 'Size of each chunk' },
      { name: 'step', type: 'pos_integer', description: 'Step between chunk starts', optional: true, defaultValue: 'count' },
      { name: 'leftover', type: 'list or :discard', description: 'How to handle remaining elements', optional: true, defaultValue: '[]' },
    ],
    returns: { type: 'list of lists', description: 'A list of chunks' },
    examples: [
      {
        code: 'Enum.chunk_every([1, 2, 3, 4, 5], 2)',
        output: '[[1, 2], [3, 4], [5]]',
        explanation: 'Splits into pairs; the last chunk may be smaller',
      },
      {
        code: 'Enum.chunk_every([1, 2, 3, 4, 5, 6], 2, 2, :discard)',
        output: '[[1, 2], [3, 4], [5, 6]]',
        explanation: 'Discards incomplete final chunk',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Enum.chunk_by', 'Enum.split', 'Stream.chunk_every'],
    sinceVersion: 'Elixir 1.5',
  },

  // String Module
  {
    name: 'String.split',
    category: 'String Module',
    syntax: 'String.split(string, pattern, options \\\\ [])',
    description:
      'Divides a string into parts based on a pattern. The pattern can be a string, a list of strings, a regular expression, or a compiled pattern.',
    arguments: [
      { name: 'string', type: 'String.t()', description: 'The string to split' },
      { name: 'pattern', type: 'String.t() | Regex.t()', description: 'The delimiter pattern' },
      { name: 'options', type: 'keyword list', description: 'Options such as trim: true or parts: n', optional: true },
    ],
    returns: { type: 'list of strings', description: 'A list of substrings' },
    examples: [
      {
        code: 'String.split("hello world", " ")',
        output: '["hello", "world"]',
      },
      {
        code: 'String.split("a,b,,c", ",", trim: true)',
        output: '["a", "b", "c"]',
        explanation: 'Trims empty strings from the result',
      },
      {
        code: '"one:two:three" |> String.split(":", parts: 2)',
        output: '["one", "two:three"]',
        explanation: 'Limits split to 2 parts using pipe operator',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['String.trim', 'String.replace', 'Enum.join'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'String.trim',
    category: 'String Module',
    syntax: 'String.trim(string)',
    description: 'Returns a string where all leading and trailing Unicode whitespace has been removed.',
    arguments: [
      { name: 'string', type: 'String.t()', description: 'The string to trim' },
    ],
    returns: { type: 'String.t()', description: 'The trimmed string' },
    examples: [
      {
        code: 'String.trim("  hello  ")',
        output: '"hello"',
      },
      {
        code: 'String.trim("\\n  elixir\\t\\n")',
        output: '"elixir"',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['String.trim_leading', 'String.trim_trailing', 'String.replace'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'String.replace',
    category: 'String Module',
    syntax: 'String.replace(subject, pattern, replacement, options \\\\ [])',
    description:
      'Returns a new string where all matches of pattern in subject are replaced with replacement.',
    arguments: [
      { name: 'subject', type: 'String.t()', description: 'The original string' },
      { name: 'pattern', type: 'String.t() | Regex.t()', description: 'The pattern to match' },
      { name: 'replacement', type: 'String.t() | function', description: 'The replacement string or function' },
      { name: 'options', type: 'keyword list', description: 'Options such as global: false', optional: true },
    ],
    returns: { type: 'String.t()', description: 'The modified string' },
    examples: [
      {
        code: 'String.replace("hello world", "world", "elixir")',
        output: '"hello elixir"',
      },
      {
        code: 'String.replace("aabba", "a", "z", global: false)',
        output: '"zabba"',
        explanation: 'Only replaces the first occurrence when global: false',
      },
      {
        code: '"foo bar baz" |> String.replace(~r/[aeiou]/, "*")',
        output: '"f** b*r b*z"',
        explanation: 'Replaces vowels with asterisk using regex and pipe operator',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['String.split', 'String.trim', 'Regex.replace'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'String.upcase',
    category: 'String Module',
    syntax: 'String.upcase(string, mode \\\\ :default)',
    description: 'Converts all characters in the given string to uppercase according to Unicode rules.',
    arguments: [
      { name: 'string', type: 'String.t()', description: 'The string to convert' },
      { name: 'mode', type: ':default | :ascii | :greek | :turkic', description: 'The mode for case conversion', optional: true, defaultValue: ':default' },
    ],
    returns: { type: 'String.t()', description: 'The uppercased string' },
    examples: [
      {
        code: 'String.upcase("hello")',
        output: '"HELLO"',
      },
      {
        code: '"elixir" |> String.upcase()',
        output: '"ELIXIR"',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['String.downcase', 'String.capitalize'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'String.contains?',
    category: 'String Module',
    syntax: 'String.contains?(string, contents)',
    description: 'Checks if string contains any of the given contents.',
    arguments: [
      { name: 'string', type: 'String.t()', description: 'The string to search in' },
      { name: 'contents', type: 'String.t() | list', description: 'A string or list of strings to search for' },
    ],
    returns: { type: 'boolean', description: 'true if string contains the contents' },
    examples: [
      {
        code: 'String.contains?("elixir of life", "of")',
        output: 'true',
      },
      {
        code: 'String.contains?("elixir", ["ph", "ex", "li"])',
        output: 'true',
        explanation: 'Returns true if any of the strings in the list is contained',
      },
      {
        code: 'String.contains?("elixir", "xyz")',
        output: 'false',
      },
    ],
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['String.starts_with?', 'String.ends_with?', 'String.match?'],
    sinceVersion: 'Elixir 1.0',
  },

  // List Functions
  {
    name: 'List.first',
    category: 'List Functions',
    syntax: 'List.first(list, default \\\\ nil)',
    description: 'Returns the first element in the list, or default if the list is empty.',
    arguments: [
      { name: 'list', type: 'list', description: 'The list to get the first element from' },
      { name: 'default', type: 'any', description: 'Default value if list is empty', optional: true, defaultValue: 'nil' },
    ],
    returns: { type: 'any', description: 'The first element or default' },
    examples: [
      {
        code: 'List.first([1, 2, 3])',
        output: '1',
      },
      {
        code: 'List.first([], :empty)',
        output: ':empty',
        explanation: 'Returns default value for empty list',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['List.last', 'hd', 'Enum.at'],
    sinceVersion: 'Elixir 1.12',
  },
  {
    name: 'List.last',
    category: 'List Functions',
    syntax: 'List.last(list, default \\\\ nil)',
    description: 'Returns the last element in the list, or default if the list is empty.',
    arguments: [
      { name: 'list', type: 'list', description: 'The list to get the last element from' },
      { name: 'default', type: 'any', description: 'Default value if list is empty', optional: true, defaultValue: 'nil' },
    ],
    returns: { type: 'any', description: 'The last element or default' },
    examples: [
      {
        code: 'List.last([1, 2, 3])',
        output: '3',
      },
      {
        code: 'List.last([])',
        output: 'nil',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['List.first', 'Enum.at'],
    sinceVersion: 'Elixir 1.12',
    notes: ['Traverses the entire list since Elixir lists are singly linked'],
  },
  {
    name: 'List.flatten',
    category: 'List Functions',
    syntax: 'List.flatten(list)',
    description: 'Flattens the given list of nested lists.',
    arguments: [
      { name: 'list', type: 'list', description: 'A list potentially containing nested lists' },
    ],
    returns: { type: 'list', description: 'A flat list' },
    examples: [
      {
        code: 'List.flatten([1, [2], [[3, 4], 5]])',
        output: '[1, 2, 3, 4, 5]',
      },
      {
        code: 'List.flatten([[:a, :b], [:c]])',
        output: '[:a, :b, :c]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Enum.flat_map', 'List.wrap'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: '++ (list concatenation)',
    category: 'List Functions',
    syntax: 'list1 ++ list2',
    description:
      'Concatenates two lists. This is a Kernel operator that creates a new list by appending list2 to list1.',
    arguments: [
      { name: 'list1', type: 'list', description: 'The first list' },
      { name: 'list2', type: 'list', description: 'The second list' },
    ],
    returns: { type: 'list', description: 'A new concatenated list' },
    examples: [
      {
        code: '[1, 2, 3] ++ [4, 5, 6]',
        output: '[1, 2, 3, 4, 5, 6]',
      },
      {
        code: '[:a] ++ [:b, :c]',
        output: '[:a, :b, :c]',
      },
    ],
    timeComplexity: 'O(n) where n is the length of the left list',
    spaceComplexity: 'O(n)',
    relatedMethods: ['List.flatten', 'Enum.concat', '--'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Performance depends on the length of the left operand', 'The right list is shared, not copied'],
  },

  // Map Module
  {
    name: 'Map.get',
    category: 'Map Module',
    syntax: 'Map.get(map, key, default \\\\ nil)',
    description: 'Gets the value for a specific key in the map. Returns default if key is not present.',
    arguments: [
      { name: 'map', type: 'map', description: 'The map to look up' },
      { name: 'key', type: 'any', description: 'The key to look up' },
      { name: 'default', type: 'any', description: 'Default value if key not found', optional: true, defaultValue: 'nil' },
    ],
    returns: { type: 'any', description: 'The value for the key or default' },
    examples: [
      {
        code: 'Map.get(%{name: "José", age: 30}, :name)',
        output: '"José"',
      },
      {
        code: 'Map.get(%{a: 1}, :b, "default")',
        output: '"default"',
        explanation: 'Returns default when key is not found',
      },
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Map.fetch', 'Map.get_lazy', 'Map.has_key?'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'Map.put',
    category: 'Map Module',
    syntax: 'Map.put(map, key, value)',
    description: 'Puts the given value under key in the map. If the key already exists, it is overwritten.',
    arguments: [
      { name: 'map', type: 'map', description: 'The map to update' },
      { name: 'key', type: 'any', description: 'The key to set' },
      { name: 'value', type: 'any', description: 'The value to associate with the key' },
    ],
    returns: { type: 'map', description: 'A new map with the key-value pair added or updated' },
    examples: [
      {
        code: 'Map.put(%{a: 1}, :b, 2)',
        output: '%{a: 1, b: 2}',
      },
      {
        code: '%{a: 1, b: 2} |> Map.put(:a, 99)',
        output: '%{a: 99, b: 2}',
        explanation: 'Overwrites existing value using pipe operator',
      },
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Map.put_new', 'Map.update', 'Map.merge'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Maps are immutable; a new map is returned'],
  },
  {
    name: 'Map.delete',
    category: 'Map Module',
    syntax: 'Map.delete(map, key)',
    description: 'Deletes the entry for a specific key from the map. If the key does not exist, returns the map unchanged.',
    arguments: [
      { name: 'map', type: 'map', description: 'The map to delete from' },
      { name: 'key', type: 'any', description: 'The key to delete' },
    ],
    returns: { type: 'map', description: 'A new map without the key' },
    examples: [
      {
        code: 'Map.delete(%{a: 1, b: 2}, :b)',
        output: '%{a: 1}',
      },
      {
        code: 'Map.delete(%{a: 1}, :c)',
        output: '%{a: 1}',
        explanation: 'Returns the map unchanged when key does not exist',
      },
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Map.drop', 'Map.pop', 'Map.put'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'Map.merge',
    category: 'Map Module',
    syntax: 'Map.merge(map1, map2)',
    description:
      'Merges two maps into one. If keys exist in both maps, the values from map2 take precedence.',
    arguments: [
      { name: 'map1', type: 'map', description: 'The first map' },
      { name: 'map2', type: 'map', description: 'The second map (takes precedence on conflicts)' },
    ],
    returns: { type: 'map', description: 'A merged map' },
    examples: [
      {
        code: 'Map.merge(%{a: 1, b: 2}, %{b: 3, c: 4})',
        output: '%{a: 1, b: 3, c: 4}',
        explanation: 'Key :b is overwritten by the second map value',
      },
      {
        code: 'Map.merge(%{a: 1}, %{b: 2})',
        output: '%{a: 1, b: 2}',
      },
    ],
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    relatedMethods: ['Map.merge/3', 'Map.put', 'Map.update'],
    sinceVersion: 'Elixir 1.0',
    notes: ['A 3-arity version accepts a conflict resolution function'],
  },

  // Kernel Functions
  {
    name: 'IO.puts',
    category: 'Kernel Functions',
    syntax: 'IO.puts(device \\\\ :stdio, item)',
    description: 'Writes the given item to the device, followed by a newline. Returns :ok.',
    arguments: [
      { name: 'device', type: 'IO.device()', description: 'The IO device to write to', optional: true, defaultValue: ':stdio' },
      { name: 'item', type: 'chardata | String.t()', description: 'The content to print' },
    ],
    returns: { type: ':ok', description: 'Always returns :ok' },
    examples: [
      {
        code: 'IO.puts("Hello, Elixir!")',
        output: 'Hello, Elixir!\n:ok',
      },
      {
        code: 'IO.puts(:stderr, "Error occurred")',
        output: 'Error occurred\n:ok',
        explanation: 'Writes to standard error',
      },
    ],
    relatedMethods: ['IO.write', 'IO.inspect', 'IO.gets'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'IO.inspect',
    category: 'Kernel Functions',
    syntax: 'IO.inspect(item, opts \\\\ [])',
    description:
      'Inspects and writes the given item to the device, then returns the item itself. Extremely useful for debugging because it can be inserted into pipelines without breaking them.',
    arguments: [
      { name: 'item', type: 'any', description: 'The value to inspect' },
      { name: 'opts', type: 'keyword list', description: 'Options such as label, pretty, limit', optional: true },
    ],
    returns: { type: 'any', description: 'Returns the item unchanged (pass-through)' },
    examples: [
      {
        code: '[1, 2, 3] |> IO.inspect(label: "before") |> Enum.map(&(&1 * 2))',
        output: 'before: [1, 2, 3]\n[2, 4, 6]',
        explanation: 'Inspects the value mid-pipeline without breaking the chain',
      },
      {
        code: 'IO.inspect(%{a: 1, b: 2}, pretty: true)',
        output: '%{a: 1, b: 2}',
      },
    ],
    relatedMethods: ['IO.puts', 'Kernel.inspect', 'dbg'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Returns the item, so it can be inserted anywhere in a pipeline for debugging'],
  },
  {
    name: 'elem',
    category: 'Kernel Functions',
    syntax: 'elem(tuple, index)',
    description: 'Accesses the element at the zero-based index in the given tuple.',
    arguments: [
      { name: 'tuple', type: 'tuple', description: 'The tuple to access' },
      { name: 'index', type: 'non_neg_integer', description: 'Zero-based index' },
    ],
    returns: { type: 'any', description: 'The element at the given index' },
    examples: [
      {
        code: 'elem({:ok, "hello"}, 1)',
        output: '"hello"',
      },
      {
        code: '{:error, :not_found, 404} |> elem(2)',
        output: '404',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['put_elem', 'tuple_size'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Raises ArgumentError if index is out of range'],
  },

  // Stream Module
  {
    name: 'Stream.map',
    category: 'Stream Module',
    syntax: 'Stream.map(enum, fun)',
    description:
      'Creates a stream that will apply the given function on each element when enumerated. Unlike Enum.map, this is lazy and does not evaluate until consumed.',
    arguments: [
      { name: 'enum', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'fun', type: 'function', description: 'A function to apply to each element' },
    ],
    returns: { type: 'Stream.t()', description: 'A lazy stream' },
    examples: [
      {
        code: '1..1_000_000 |> Stream.map(&(&1 * 2)) |> Enum.take(5)',
        output: '[2, 4, 6, 8, 10]',
        explanation: 'Lazily doubles elements; only computes what Enum.take needs',
      },
      {
        code: 'stream = Stream.map([1, 2, 3], fn x -> x + 10 end)\nEnum.to_list(stream)',
        output: '[11, 12, 13]',
        explanation: 'Stream is not evaluated until Enum.to_list is called',
      },
    ],
    timeComplexity: 'O(1) to create, O(n) to consume',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Enum.map', 'Stream.filter', 'Stream.flat_map'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Streams are lazy; they compose transformations without executing until consumed by an Enum function'],
  },
  {
    name: 'Stream.filter',
    category: 'Stream Module',
    syntax: 'Stream.filter(enum, fun)',
    description:
      'Creates a stream that filters elements according to the given function on enumeration. Lazy counterpart of Enum.filter.',
    arguments: [
      { name: 'enum', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'fun', type: 'function', description: 'A function that returns a boolean-like value' },
    ],
    returns: { type: 'Stream.t()', description: 'A lazy stream' },
    examples: [
      {
        code: '1..100 |> Stream.filter(&(rem(&1, 2) == 0)) |> Enum.take(5)',
        output: '[2, 4, 6, 8, 10]',
        explanation: 'Lazily filters even numbers; only processes elements until 5 are found',
      },
    ],
    timeComplexity: 'O(1) to create, O(n) to consume',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Enum.filter', 'Stream.map', 'Stream.reject'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'Stream.cycle',
    category: 'Stream Module',
    syntax: 'Stream.cycle(enumerable)',
    description:
      'Creates a stream that cycles the given enumerable infinitely.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure to cycle' },
    ],
    returns: { type: 'Stream.t()', description: 'An infinite lazy stream' },
    examples: [
      {
        code: 'Stream.cycle([1, 2, 3]) |> Enum.take(7)',
        output: '[1, 2, 3, 1, 2, 3, 1]',
        explanation: 'Cycles through the list infinitely; Enum.take limits the output',
      },
      {
        code: 'Stream.cycle([:red, :green, :blue]) |> Enum.take(5)',
        output: '[:red, :green, :blue, :red, :green]',
      },
    ],
    timeComplexity: 'O(1) to create',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Stream.repeatedly', 'Stream.iterate', 'Enum.take'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Must be consumed with a limiting function like Enum.take to avoid infinite loops'],
  },

  // Pattern Matching
  {
    name: 'case',
    category: 'Pattern Matching',
    syntax: 'case expression do\n  pattern1 -> result1\n  pattern2 -> result2\nend',
    description:
      'Matches the given expression against multiple patterns and executes the corresponding block for the first match. Supports guard clauses with when.',
    arguments: [
      { name: 'expression', type: 'any', description: 'The value to match against' },
      { name: 'clauses', type: 'pattern -> expression', description: 'One or more pattern-matching clauses' },
    ],
    returns: { type: 'any', description: 'The result of the matched clause' },
    examples: [
      {
        code: 'case {1, 2, 3} do\n  {1, x, 3} -> "matched: #{x}"\n  _ -> "no match"\nend',
        output: '"matched: 2"',
        explanation: 'Destructures the tuple and binds x to 2',
      },
      {
        code: 'case Enum.fetch([10, 20], 0) do\n  {:ok, value} -> "Found: #{value}"\n  :error -> "Not found"\nend',
        output: '"Found: 10"',
        explanation: 'Pattern matches on tagged tuples, a common Elixir idiom',
      },
    ],
    relatedMethods: ['cond', 'with', 'if'],
    sinceVersion: 'Elixir 1.0',
    notes: [
      'Raises CaseClauseError if no pattern matches and there is no catch-all _ clause',
      'Guard clauses can be added with when after the pattern',
    ],
  },
  {
    name: 'cond',
    category: 'Pattern Matching',
    syntax: 'cond do\n  condition1 -> result1\n  condition2 -> result2\n  true -> default\nend',
    description:
      'Evaluates a series of conditions and executes the block for the first condition that evaluates to a truthy value. Similar to else-if chains in other languages.',
    arguments: [
      { name: 'clauses', type: 'condition -> expression', description: 'One or more condition clauses' },
    ],
    returns: { type: 'any', description: 'The result of the first truthy clause' },
    examples: [
      {
        code: 'x = 15\ncond do\n  x < 10 -> "small"\n  x < 20 -> "medium"\n  true -> "large"\nend',
        output: '"medium"',
        explanation: 'Evaluates conditions top-to-bottom; first truthy one wins',
      },
    ],
    relatedMethods: ['case', 'if', 'with'],
    sinceVersion: 'Elixir 1.0',
    notes: ['A true -> clause at the end acts as a catch-all default', 'Raises CondClauseError if no condition is truthy'],
  },
  {
    name: 'with',
    category: 'Pattern Matching',
    syntax: 'with pattern1 <- expr1,\n     pattern2 <- expr2 do\n  result\nelse\n  error_pattern -> error_handling\nend',
    description:
      'Chains pattern matches together. If all patterns match, the do block is executed. If any pattern fails to match, the chain stops and the non-matching value is returned (or handled by the else block).',
    arguments: [
      { name: 'clauses', type: 'pattern <- expression', description: 'A sequence of pattern match clauses' },
      { name: 'do_block', type: 'expression', description: 'The expression to execute when all patterns match' },
      { name: 'else_block', type: 'pattern -> expression', description: 'Optional error handling clauses', optional: true },
    ],
    returns: { type: 'any', description: 'The result of the do block, or the non-matching value / else clause result' },
    examples: [
      {
        code: 'with {:ok, user} <- fetch_user(id),\n     {:ok, email} <- fetch_email(user) do\n  send_welcome(email)\nelse\n  {:error, reason} -> {:error, reason}\nend',
        output: ':ok',
        explanation: 'Chains multiple operations that may fail, handling errors in the else block',
      },
      {
        code: 'opts = %{width: 10, height: 15}\nwith {:ok, width} <- Map.fetch(opts, :width),\n     {:ok, height} <- Map.fetch(opts, :height) do\n  width * height\nend',
        output: '150',
        explanation: 'Extracts multiple values from a map using pattern matching',
      },
    ],
    relatedMethods: ['case', 'cond', 'Kernel.match?'],
    sinceVersion: 'Elixir 1.2',
    notes: [
      'Ideal for chaining operations that return {:ok, value} or {:error, reason}',
      'The else block is optional; without it, a non-matching value is returned as-is',
    ],
  },

  // Additional Enum methods
  {
    name: 'Enum.group_by',
    category: 'Enum Module',
    syntax: 'Enum.group_by(enumerable, key_fun, value_fun \\\\ fn x -> x end)',
    description:
      'Splits the enumerable into groups based on key_fun. Returns a map where each key is the grouping value and each value is a list of elements in that group.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'key_fun', type: 'function', description: 'A function that determines the group key' },
      { name: 'value_fun', type: 'function', description: 'A function to transform group values', optional: true },
    ],
    returns: { type: 'map', description: 'A map of grouped elements' },
    examples: [
      {
        code: 'Enum.group_by(["ant", "buffalo", "cat", "dingo"], &String.length/1)',
        output: '%{3 => ["ant", "cat"], 7 => ["buffalo"], 5 => ["dingo"]}',
        explanation: 'Groups words by their length',
      },
      {
        code: 'Enum.group_by([1, 2, 3, 4, 5], &(rem(&1, 2) == 0))',
        output: '%{false => [1, 3, 5], true => [2, 4]}',
        explanation: 'Groups numbers by even/odd',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Enum.chunk_by', 'Enum.frequencies_by', 'Enum.split_with'],
    sinceVersion: 'Elixir 1.0',
  },
  {
    name: 'Enum.flat_map',
    category: 'Enum Module',
    syntax: 'Enum.flat_map(enumerable, fun)',
    description: 'Maps the given fun over the enumerable and flattens the result by one level.',
    arguments: [
      { name: 'enumerable', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'fun', type: 'function', description: 'A function that returns a list for each element' },
    ],
    returns: { type: 'list', description: 'A flattened list of results' },
    examples: [
      {
        code: 'Enum.flat_map([:a, :b, :c], fn x -> [x, x] end)',
        output: '[:a, :a, :b, :b, :c, :c]',
        explanation: 'Duplicates each element, then flattens',
      },
      {
        code: '[[1, 2], [3, 4]] |> Enum.flat_map(&(&1))',
        output: '[1, 2, 3, 4]',
        explanation: 'Flattens a list of lists using identity function',
      },
    ],
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(n * m)',
    relatedMethods: ['Enum.map', 'List.flatten', 'Stream.flat_map'],
    sinceVersion: 'Elixir 1.0',
  },

  // Additional Map methods
  {
    name: 'Map.keys',
    category: 'Map Module',
    syntax: 'Map.keys(map)',
    description: 'Returns all keys from the map.',
    arguments: [
      { name: 'map', type: 'map', description: 'The map to extract keys from' },
    ],
    returns: { type: 'list', description: 'A list of all keys' },
    examples: [
      {
        code: 'Map.keys(%{a: 1, b: 2, c: 3})',
        output: '[:a, :b, :c]',
      },
      {
        code: 'Map.keys(%{})',
        output: '[]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['Map.values', 'Map.has_key?', 'Map.to_list'],
    sinceVersion: 'Elixir 1.0',
  },

  // Additional Kernel function
  {
    name: 'is_nil',
    category: 'Kernel Functions',
    syntax: 'is_nil(term)',
    description: 'Returns true if term is nil, false otherwise. This is a guard-safe function.',
    arguments: [
      { name: 'term', type: 'any', description: 'The value to check' },
    ],
    returns: { type: 'boolean', description: 'true if the value is nil' },
    examples: [
      {
        code: 'is_nil(nil)',
        output: 'true',
      },
      {
        code: 'is_nil(42)',
        output: 'false',
      },
      {
        code: 'is_nil(false)',
        output: 'false',
        explanation: 'false is not nil in Elixir',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['is_atom', 'is_binary', 'is_integer', 'is_map'],
    sinceVersion: 'Elixir 1.0',
    notes: ['Can be used in guard clauses'],
  },

  // Additional Stream method
  {
    name: 'Stream.take',
    category: 'Stream Module',
    syntax: 'Stream.take(enum, count)',
    description: 'Lazily takes the first count elements from the enumerable and stops enumeration.',
    arguments: [
      { name: 'enum', type: 'Enumerable', description: 'Any enumerable data structure' },
      { name: 'count', type: 'integer', description: 'The number of elements to take' },
    ],
    returns: { type: 'Stream.t()', description: 'A lazy stream limited to count elements' },
    examples: [
      {
        code: 'Stream.iterate(0, &(&1 + 1)) |> Stream.take(5) |> Enum.to_list()',
        output: '[0, 1, 2, 3, 4]',
        explanation: 'Takes 5 elements from an infinite stream of natural numbers',
      },
      {
        code: '1..1_000_000 |> Stream.filter(&(rem(&1, 3) == 0)) |> Stream.take(4) |> Enum.to_list()',
        output: '[3, 6, 9, 12]',
        explanation: 'Lazily filters multiples of 3, taking only the first 4',
      },
    ],
    timeComplexity: 'O(1) to create',
    spaceComplexity: 'O(1)',
    relatedMethods: ['Enum.take', 'Stream.drop', 'Stream.take_while'],
    sinceVersion: 'Elixir 1.0',
  },
];

export default elixirMethods;
