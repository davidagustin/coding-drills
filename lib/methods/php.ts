import type { Method } from '../types';

/**
 * PHP Methods Reference
 * Comprehensive coverage of PHP 8.2+ features, Laravel patterns, and modern PHP practices
 */

export const phpMethods: Method[] = [
  // ============================================================
  // Array Functions
  // ============================================================
  {
    name: 'array_map',
    category: 'Array Functions',
    syntax: 'array_map(?callable $callback, array $array, array ...$arrays): array',
    description:
      'Applies a callback function to each element of the arrays. Returns a new array with transformed values.',
    arguments: [
      {
        name: 'callback',
        type: 'callable|null',
        description: 'Callback function to apply to each element',
      },
      { name: 'array', type: 'array', description: 'The array to map over' },
      {
        name: 'arrays',
        type: 'array',
        description: 'Additional arrays to pass to the callback',
        optional: true,
      },
    ],
    returns: { type: 'array', description: 'Array containing transformed elements' },
    examples: [
      {
        code: 'array_map(fn($n) => $n * 2, [1, 2, 3])',
        output: '[2, 4, 6]',
        explanation: 'Double each element using arrow function',
      },
      {
        code: 'array_map(strtoupper(...), ["a", "b", "c"])',
        output: '["A", "B", "C"]',
        explanation: 'First-class callable syntax (PHP 8.1+)',
      },
      {
        code: 'array_map(null, [1, 2], ["a", "b"])',
        output: '[[1, "a"], [2, "b"]]',
        explanation: 'Zip arrays together',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_filter', 'array_reduce', 'array_walk'],
    sinceVersion: 'PHP 4.0.6',
    notes: [
      'Use arrow functions (fn) for cleaner syntax in PHP 7.4+',
      'First-class callable syntax available in PHP 8.1+',
    ],
  },
  {
    name: 'array_filter',
    category: 'Array Functions',
    syntax: 'array_filter(array $array, ?callable $callback = null, int $mode = 0): array',
    description: 'Filters elements of an array using a callback function. Preserves original keys.',
    arguments: [
      { name: 'array', type: 'array', description: 'The array to filter' },
      {
        name: 'callback',
        type: 'callable|null',
        description: 'Callback function to test each element',
        optional: true,
      },
      {
        name: 'mode',
        type: 'int',
        description: 'ARRAY_FILTER_USE_KEY or ARRAY_FILTER_USE_BOTH',
        optional: true,
      },
    ],
    returns: { type: 'array', description: 'Filtered array with preserved keys' },
    examples: [
      {
        code: 'array_filter([1, 0, 2, null, 3])',
        output: '[0 => 1, 2 => 2, 4 => 3]',
        explanation: 'Remove falsy values',
      },
      {
        code: 'array_filter([1, 2, 3, 4], fn($n) => $n % 2 === 0)',
        output: '[1 => 2, 3 => 4]',
        explanation: 'Keep even numbers',
      },
      {
        code: 'array_values(array_filter([1, 2, 3], fn($n) => $n > 1))',
        output: '[2, 3]',
        explanation: 'Reset keys with array_values',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_map', 'array_reduce', 'array_values'],
    sinceVersion: 'PHP 4.0.6',
    notes: [
      'Keys are preserved - use array_values() to reindex',
      'Without callback, removes falsy values (0, "", null, false)',
    ],
  },
  {
    name: 'array_reduce',
    category: 'Array Functions',
    syntax: 'array_reduce(array $array, callable $callback, mixed $initial = null): mixed',
    description: 'Iteratively reduces the array to a single value using a callback function.',
    arguments: [
      { name: 'array', type: 'array', description: 'The array to reduce' },
      { name: 'callback', type: 'callable', description: 'Callback: fn($carry, $item) => mixed' },
      {
        name: 'initial',
        type: 'mixed',
        description: 'Initial value for the accumulator',
        optional: true,
      },
    ],
    returns: { type: 'mixed', description: 'The accumulated result' },
    examples: [
      {
        code: 'array_reduce([1, 2, 3, 4], fn($sum, $n) => $sum + $n, 0)',
        output: '10',
        explanation: 'Sum all numbers',
      },
      {
        code: 'array_reduce(["a", "b", "c"], fn($str, $c) => $str . $c, "")',
        output: '"abc"',
        explanation: 'Concatenate strings',
      },
      {
        code: 'array_reduce([[1, 2], [3, 4]], fn($a, $b) => [...$a, ...$b], [])',
        output: '[1, 2, 3, 4]',
        explanation: 'Flatten array with spread operator',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['array_map', 'array_filter', 'array_sum'],
    sinceVersion: 'PHP 4.0.5',
    notes: [
      'Always provide an initial value to avoid null issues',
      'Useful for building up complex data structures',
    ],
  },
  {
    name: 'array_merge',
    category: 'Array Functions',
    syntax: 'array_merge(array ...$arrays): array',
    description:
      'Merges one or more arrays. Numeric keys are renumbered, string keys are overwritten.',
    arguments: [{ name: 'arrays', type: 'array', description: 'Arrays to merge' }],
    returns: { type: 'array', description: 'Merged array' },
    examples: [
      {
        code: 'array_merge([1, 2], [3, 4])',
        output: '[1, 2, 3, 4]',
        explanation: 'Merge indexed arrays',
      },
      {
        code: 'array_merge(["a" => 1], ["a" => 2, "b" => 3])',
        output: '["a" => 2, "b" => 3]',
        explanation: 'Later values override',
      },
      {
        code: '[...[1, 2], ...[3, 4]]',
        output: '[1, 2, 3, 4]',
        explanation: 'Spread operator alternative (PHP 7.4+)',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_merge_recursive', 'array_replace', 'spread operator'],
    sinceVersion: 'PHP 4',
    notes: [
      'Use spread operator [...$a, ...$b] for cleaner syntax',
      'For preserving numeric keys, use + operator instead',
    ],
  },
  {
    name: 'array_keys',
    category: 'Array Functions',
    syntax: 'array_keys(array $array, mixed $filter_value = null, bool $strict = false): array',
    description: 'Returns all the keys or a subset of keys from an array.',
    arguments: [
      { name: 'array', type: 'array', description: 'The array' },
      {
        name: 'filter_value',
        type: 'mixed',
        description: 'Only return keys for this value',
        optional: true,
      },
      { name: 'strict', type: 'bool', description: 'Use strict comparison', optional: true },
    ],
    returns: { type: 'array', description: 'Array of keys' },
    examples: [
      {
        code: 'array_keys(["a" => 1, "b" => 2])',
        output: '["a", "b"]',
        explanation: 'Get all keys',
      },
      {
        code: 'array_keys([0 => "a", 1 => "b", 2 => "a"], "a")',
        output: '[0, 2]',
        explanation: 'Get keys for value "a"',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_values', 'array_key_exists', 'array_flip'],
    sinceVersion: 'PHP 4',
  },
  {
    name: 'array_values',
    category: 'Array Functions',
    syntax: 'array_values(array $array): array',
    description: 'Returns all values from an array with numeric keys starting from 0.',
    arguments: [{ name: 'array', type: 'array', description: 'The array' }],
    returns: { type: 'array', description: 'Indexed array of values' },
    examples: [
      {
        code: 'array_values(["a" => 1, "b" => 2])',
        output: '[1, 2]',
        explanation: 'Extract values only',
      },
      {
        code: 'array_values(array_filter([1, 0, 2, 0, 3]))',
        output: '[1, 2, 3]',
        explanation: 'Reindex after filter',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_keys', 'array_flip', 'array_filter'],
    sinceVersion: 'PHP 4',
    notes: ['Commonly used after array_filter to reset numeric keys'],
  },
  {
    name: 'array_unique',
    category: 'Array Functions',
    syntax: 'array_unique(array $array, int $flags = SORT_STRING): array',
    description: 'Removes duplicate values from an array. First occurrence of each value is kept.',
    arguments: [
      { name: 'array', type: 'array', description: 'The array' },
      {
        name: 'flags',
        type: 'int',
        description: 'Comparison type: SORT_STRING, SORT_NUMERIC, SORT_REGULAR',
        optional: true,
      },
    ],
    returns: { type: 'array', description: 'Array with unique values' },
    examples: [
      {
        code: 'array_unique([1, 2, 2, 3, 3, 3])',
        output: '[0 => 1, 1 => 2, 3 => 3]',
        explanation: 'Remove duplicates',
      },
      {
        code: 'array_values(array_unique(["a", "b", "a", "c"]))',
        output: '["a", "b", "c"]',
        explanation: 'Unique with reset keys',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_count_values', 'array_flip'],
    sinceVersion: 'PHP 4.0.1',
  },
  {
    name: 'array_column',
    category: 'Array Functions',
    syntax:
      'array_column(array $array, int|string|null $column_key, int|string|null $index_key = null): array',
    description: 'Returns the values from a single column of an input array of arrays or objects.',
    arguments: [
      { name: 'array', type: 'array', description: 'Multi-dimensional array or array of objects' },
      {
        name: 'column_key',
        type: 'int|string|null',
        description: 'Column to retrieve, null for entire rows',
      },
      {
        name: 'index_key',
        type: 'int|string|null',
        description: 'Column to use as index',
        optional: true,
      },
    ],
    returns: { type: 'array', description: 'Array of column values' },
    examples: [
      {
        code: 'array_column($users, "name")',
        output: '["Alice", "Bob", "Charlie"]',
        explanation: 'Extract names from users array',
      },
      {
        code: 'array_column($users, "name", "id")',
        output: '[1 => "Alice", 2 => "Bob"]',
        explanation: 'Index by id',
      },
      {
        code: 'array_column($users, null, "id")',
        output: '[1 => ["id" => 1, ...], ...]',
        explanation: 'Index entire rows by id',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_map', 'array_keys', 'array_values'],
    sinceVersion: 'PHP 5.5.0',
    notes: [
      'Works with objects that implement __get() or have public properties',
      'Great for extracting data from database results',
    ],
  },
  {
    name: 'array_combine',
    category: 'Array Functions',
    syntax: 'array_combine(array $keys, array $values): array',
    description: 'Creates an array by using one array for keys and another for its values.',
    arguments: [
      { name: 'keys', type: 'array', description: 'Array of keys' },
      { name: 'values', type: 'array', description: 'Array of values' },
    ],
    returns: { type: 'array', description: 'Combined associative array' },
    examples: [
      {
        code: 'array_combine(["a", "b", "c"], [1, 2, 3])',
        output: '["a" => 1, "b" => 2, "c" => 3]',
        explanation: 'Create associative array',
      },
      {
        code: 'array_combine(range(1, 3), ["one", "two", "three"])',
        output: '[1 => "one", 2 => "two", 3 => "three"]',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_keys', 'array_values', 'array_flip'],
    sinceVersion: 'PHP 5',
    notes: ['Both arrays must have the same number of elements'],
  },
  {
    name: 'array_slice',
    category: 'Array Functions',
    syntax:
      'array_slice(array $array, int $offset, ?int $length = null, bool $preserve_keys = false): array',
    description: 'Extracts a slice of the array.',
    arguments: [
      { name: 'array', type: 'array', description: 'The array' },
      { name: 'offset', type: 'int', description: 'Starting position (negative counts from end)' },
      {
        name: 'length',
        type: 'int|null',
        description: 'Number of elements to extract',
        optional: true,
      },
      {
        name: 'preserve_keys',
        type: 'bool',
        description: 'Whether to preserve keys',
        optional: true,
      },
    ],
    returns: { type: 'array', description: 'Slice of the array' },
    examples: [
      {
        code: 'array_slice([1, 2, 3, 4, 5], 2)',
        output: '[3, 4, 5]',
        explanation: 'From index 2 to end',
      },
      {
        code: 'array_slice([1, 2, 3, 4, 5], 1, 3)',
        output: '[2, 3, 4]',
        explanation: 'Extract 3 elements from index 1',
      },
      {
        code: 'array_slice([1, 2, 3, 4, 5], -2)',
        output: '[4, 5]',
        explanation: 'Last 2 elements',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_splice', 'array_chunk', 'array_shift'],
    sinceVersion: 'PHP 4',
  },
  {
    name: 'in_array',
    category: 'Array Functions',
    syntax: 'in_array(mixed $needle, array $haystack, bool $strict = false): bool',
    description: 'Checks if a value exists in an array.',
    arguments: [
      { name: 'needle', type: 'mixed', description: 'Value to search for' },
      { name: 'haystack', type: 'array', description: 'Array to search in' },
      { name: 'strict', type: 'bool', description: 'Use strict type comparison', optional: true },
    ],
    returns: { type: 'bool', description: 'True if found, false otherwise' },
    examples: [
      { code: 'in_array(2, [1, 2, 3])', output: 'true' },
      {
        code: 'in_array("2", [1, 2, 3], strict: true)',
        output: 'false',
        explanation: 'Strict comparison (PHP 8 named argument)',
      },
      { code: 'in_array("apple", ["apple", "banana"])', output: 'true' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['array_search', 'array_key_exists', 'isset'],
    sinceVersion: 'PHP 4',
    notes: [
      'Always use strict: true for type-safe comparison',
      'For frequent lookups, use array_flip + isset for O(1)',
    ],
  },
  {
    name: 'array_search',
    category: 'Array Functions',
    syntax: 'array_search(mixed $needle, array $haystack, bool $strict = false): int|string|false',
    description: 'Searches for a value and returns the corresponding key if found.',
    arguments: [
      { name: 'needle', type: 'mixed', description: 'Value to search for' },
      { name: 'haystack', type: 'array', description: 'Array to search in' },
      { name: 'strict', type: 'bool', description: 'Use strict comparison', optional: true },
    ],
    returns: { type: 'int|string|false', description: 'Key of found element or false' },
    examples: [
      { code: 'array_search("b", ["a", "b", "c"])', output: '1' },
      { code: 'array_search("x", ["a" => 1, "b" => 2, "c" => 3])', output: 'false' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['in_array', 'array_keys', 'array_flip'],
    sinceVersion: 'PHP 4.0.5',
    notes: ['Use strict comparison to avoid type coercion issues'],
  },
  {
    name: 'usort',
    category: 'Array Functions',
    syntax: 'usort(array &$array, callable $callback): true',
    description: 'Sorts an array by values using a user-defined comparison function.',
    arguments: [
      { name: 'array', type: 'array', description: 'Array to sort (modified in place)' },
      {
        name: 'callback',
        type: 'callable',
        description: 'Comparison function: fn($a, $b) => int (-1, 0, 1)',
      },
    ],
    returns: { type: 'true', description: 'Always returns true (PHP 8+)' },
    examples: [
      {
        code: 'usort($arr, fn($a, $b) => $a <=> $b)',
        output: 'Sorted ascending',
        explanation: 'Spaceship operator',
      },
      { code: 'usort($arr, fn($a, $b) => $b <=> $a)', output: 'Sorted descending' },
      {
        code: 'usort($users, fn($a, $b) => $a["name"] <=> $b["name"])',
        output: 'Sort by name',
        explanation: 'Sort array of arrays',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    relatedMethods: ['uasort', 'uksort', 'sort', 'array_multisort'],
    sinceVersion: 'PHP 4',
    notes: [
      'Use spaceship operator <=> for cleaner comparisons',
      'uasort preserves keys, uksort sorts by keys',
    ],
  },
  {
    name: 'array_chunk',
    category: 'Array Functions',
    syntax: 'array_chunk(array $array, int $length, bool $preserve_keys = false): array',
    description: 'Splits an array into chunks of specified size.',
    arguments: [
      { name: 'array', type: 'array', description: 'The array to split' },
      { name: 'length', type: 'int', description: 'Size of each chunk' },
      {
        name: 'preserve_keys',
        type: 'bool',
        description: 'Whether to preserve keys',
        optional: true,
      },
    ],
    returns: { type: 'array', description: 'Array of chunks' },
    examples: [
      {
        code: 'array_chunk([1, 2, 3, 4, 5], 2)',
        output: '[[1, 2], [3, 4], [5]]',
        explanation: 'Split into pairs',
      },
      { code: 'array_chunk(range(1, 10), 3)', output: '[[1,2,3], [4,5,6], [7,8,9], [10]]' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['array_slice', 'array_splice'],
    sinceVersion: 'PHP 4.2.0',
    notes: ['Useful for batch processing or pagination'],
  },

  // ============================================================
  // String Functions
  // ============================================================
  {
    name: 'str_contains',
    category: 'String Functions',
    syntax: 'str_contains(string $haystack, string $needle): bool',
    description: 'Checks if a string contains a given substring. Case-sensitive.',
    arguments: [
      { name: 'haystack', type: 'string', description: 'String to search in' },
      { name: 'needle', type: 'string', description: 'Substring to search for' },
    ],
    returns: { type: 'bool', description: 'True if needle is found' },
    examples: [
      { code: 'str_contains("Hello World", "World")', output: 'true' },
      {
        code: 'str_contains("Hello World", "world")',
        output: 'false',
        explanation: 'Case-sensitive',
      },
      {
        code: 'str_contains("Laravel", "")',
        output: 'true',
        explanation: 'Empty needle always true',
      },
    ],
    timeComplexity: 'O(n*m)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['str_starts_with', 'str_ends_with', 'strpos'],
    sinceVersion: 'PHP 8.0',
    notes: ['Much cleaner than strpos !== false', 'Empty needle returns true'],
  },
  {
    name: 'str_starts_with',
    category: 'String Functions',
    syntax: 'str_starts_with(string $haystack, string $needle): bool',
    description: 'Checks if a string starts with a given substring.',
    arguments: [
      { name: 'haystack', type: 'string', description: 'String to check' },
      { name: 'needle', type: 'string', description: 'Prefix to check for' },
    ],
    returns: { type: 'bool', description: 'True if haystack starts with needle' },
    examples: [
      { code: 'str_starts_with("Hello World", "Hello")', output: 'true' },
      {
        code: 'str_starts_with("/api/users", "/api")',
        output: 'true',
        explanation: 'Check URL prefix',
      },
    ],
    timeComplexity: 'O(m)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['str_ends_with', 'str_contains', 'substr'],
    sinceVersion: 'PHP 8.0',
  },
  {
    name: 'str_ends_with',
    category: 'String Functions',
    syntax: 'str_ends_with(string $haystack, string $needle): bool',
    description: 'Checks if a string ends with a given substring.',
    arguments: [
      { name: 'haystack', type: 'string', description: 'String to check' },
      { name: 'needle', type: 'string', description: 'Suffix to check for' },
    ],
    returns: { type: 'bool', description: 'True if haystack ends with needle' },
    examples: [
      {
        code: 'str_ends_with("photo.jpg", ".jpg")',
        output: 'true',
        explanation: 'Check file extension',
      },
      { code: 'str_ends_with("Hello World", "World")', output: 'true' },
    ],
    timeComplexity: 'O(m)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['str_starts_with', 'str_contains', 'substr'],
    sinceVersion: 'PHP 8.0',
  },
  {
    name: 'explode',
    category: 'String Functions',
    syntax: 'explode(string $separator, string $string, int $limit = PHP_INT_MAX): array',
    description: 'Splits a string by a separator and returns an array of parts.',
    arguments: [
      { name: 'separator', type: 'string', description: 'Delimiter string' },
      { name: 'string', type: 'string', description: 'String to split' },
      { name: 'limit', type: 'int', description: 'Maximum number of elements', optional: true },
    ],
    returns: { type: 'array', description: 'Array of substrings' },
    examples: [
      { code: 'explode(",", "a,b,c")', output: '["a", "b", "c"]' },
      {
        code: 'explode(" ", "Hello World", 2)',
        output: '["Hello", "World"]',
        explanation: 'Limit to 2 parts',
      },
      {
        code: '[$first, $rest] = explode(",", "a,b,c", 2)',
        output: '$first = "a", $rest = "b,c"',
        explanation: 'Destructuring',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['implode', 'str_split', 'preg_split'],
    sinceVersion: 'PHP 4',
  },
  {
    name: 'implode',
    category: 'String Functions',
    syntax: 'implode(string $separator, array $array): string',
    description: 'Joins array elements into a string with a separator.',
    arguments: [
      { name: 'separator', type: 'string', description: 'Glue string between elements' },
      { name: 'array', type: 'array', description: 'Array of strings to join' },
    ],
    returns: { type: 'string', description: 'Concatenated string' },
    examples: [
      { code: 'implode(", ", ["a", "b", "c"])', output: '"a, b, c"' },
      {
        code: 'implode("", ["H", "e", "l", "l", "o"])',
        output: '"Hello"',
        explanation: 'No separator',
      },
      {
        code: 'implode(" AND ", ["active = 1", "role = admin"])',
        output: '"active = 1 AND role = admin"',
        explanation: 'Build SQL',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['explode', 'join'],
    sinceVersion: 'PHP 4',
    notes: ['join() is an alias for implode()'],
  },
  {
    name: 'trim',
    category: 'String Functions',
    syntax: 'trim(string $string, string $characters = " \\n\\r\\t\\v\\x00"): string',
    description: 'Strips whitespace (or other characters) from the beginning and end of a string.',
    arguments: [
      { name: 'string', type: 'string', description: 'String to trim' },
      { name: 'characters', type: 'string', description: 'Characters to strip', optional: true },
    ],
    returns: { type: 'string', description: 'Trimmed string' },
    examples: [
      { code: 'trim("  Hello World  ")', output: '"Hello World"' },
      { code: 'trim("xxxHelloxxx", "x")', output: '"Hello"', explanation: 'Custom characters' },
      { code: 'trim("/path/to/file/", "/")', output: '"path/to/file"' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['ltrim', 'rtrim', 'str_replace'],
    sinceVersion: 'PHP 4',
  },
  {
    name: 'sprintf',
    category: 'String Functions',
    syntax: 'sprintf(string $format, mixed ...$values): string',
    description: 'Returns a formatted string using printf-style format specifiers.',
    arguments: [
      { name: 'format', type: 'string', description: 'Format string with placeholders' },
      { name: 'values', type: 'mixed', description: 'Values to insert' },
    ],
    returns: { type: 'string', description: 'Formatted string' },
    examples: [
      { code: 'sprintf("Hello, %s!", "World")', output: '"Hello, World!"' },
      { code: 'sprintf("%d items at $%.2f", 5, 19.99)', output: '"5 items at $19.99"' },
      { code: 'sprintf("%04d", 42)', output: '"0042"', explanation: 'Zero-padded' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['printf', 'vsprintf', 'number_format'],
    sinceVersion: 'PHP 4',
    notes: ['%s = string, %d = integer, %f = float, %% = literal %'],
  },
  {
    name: 'str_replace',
    category: 'String Functions',
    syntax:
      'str_replace(array|string $search, array|string $replace, array|string $subject, int &$count = null): array|string',
    description: 'Replaces all occurrences of search string with replacement string.',
    arguments: [
      { name: 'search', type: 'array|string', description: 'Value(s) to search for' },
      { name: 'replace', type: 'array|string', description: 'Replacement value(s)' },
      { name: 'subject', type: 'array|string', description: 'String or array to search in' },
      { name: 'count', type: 'int', description: 'Number of replacements made', optional: true },
    ],
    returns: { type: 'array|string', description: 'String or array with replacements' },
    examples: [
      { code: 'str_replace("world", "PHP", "Hello world")', output: '"Hello PHP"' },
      {
        code: 'str_replace(["a", "e"], ["4", "3"], "hacker")',
        output: '"h4ck3r"',
        explanation: 'Multiple replacements',
      },
      {
        code: 'str_replace(" ", "-", "hello world")',
        output: '"hello-world"',
        explanation: 'Slugify',
      },
    ],
    timeComplexity: 'O(n*m)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['str_ireplace', 'preg_replace', 'substr_replace'],
    sinceVersion: 'PHP 4',
  },
  {
    name: 'substr',
    category: 'String Functions',
    syntax: 'substr(string $string, int $offset, ?int $length = null): string',
    description: 'Returns part of a string.',
    arguments: [
      { name: 'string', type: 'string', description: 'Input string' },
      { name: 'offset', type: 'int', description: 'Starting position (negative counts from end)' },
      { name: 'length', type: 'int|null', description: 'Length of substring', optional: true },
    ],
    returns: { type: 'string', description: 'Extracted substring' },
    examples: [
      { code: 'substr("Hello World", 0, 5)', output: '"Hello"' },
      { code: 'substr("Hello World", -5)', output: '"World"', explanation: 'Last 5 characters' },
      {
        code: 'substr("Hello World", 6)',
        output: '"World"',
        explanation: 'From position 6 to end',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['mb_substr', 'str_split', 'substr_replace'],
    sinceVersion: 'PHP 4',
    notes: ['Use mb_substr for multibyte strings (UTF-8)'],
  },
  {
    name: 'preg_match',
    category: 'String Functions',
    syntax:
      'preg_match(string $pattern, string $subject, array &$matches = null, int $flags = 0, int $offset = 0): int|false',
    description: 'Performs a regular expression match.',
    arguments: [
      { name: 'pattern', type: 'string', description: 'Regular expression pattern' },
      { name: 'subject', type: 'string', description: 'String to search' },
      { name: 'matches', type: 'array', description: 'Array of matches', optional: true },
      { name: 'flags', type: 'int', description: 'PREG_OFFSET_CAPTURE, etc.', optional: true },
      { name: 'offset', type: 'int', description: 'Start position', optional: true },
    ],
    returns: { type: 'int|false', description: '1 if matched, 0 if not, false on error' },
    examples: [
      {
        code: 'preg_match("/\\d+/", "Price: 99", $m)',
        output: '$m = ["99"]',
        explanation: 'Extract number',
      },
      { code: 'preg_match("/^[a-z]+$/i", "Hello")', output: '1', explanation: 'Validate format' },
      {
        code: 'preg_match("/(?<year>\\d{4})-(?<month>\\d{2})/", "2024-01", $m)',
        output: '$m["year"] = "2024"',
        explanation: 'Named groups',
      },
    ],
    timeComplexity: 'O(n*m)',
    spaceComplexity: 'O(m)',
    relatedMethods: ['preg_match_all', 'preg_replace', 'preg_split'],
    sinceVersion: 'PHP 4',
    notes: ['Use named capture groups (?<name>...) for clarity'],
  },

  // ============================================================
  // Collection Methods (Laravel-style)
  // ============================================================
  {
    name: 'collect',
    category: 'Collection Methods',
    syntax: 'collect(mixed $value = []): Collection',
    description:
      'Creates a new Laravel Collection instance. Provides fluent, convenient wrapper for working with arrays.',
    arguments: [{ name: 'value', type: 'mixed', description: 'Array or iterable to wrap' }],
    returns: { type: 'Collection', description: 'Collection instance' },
    examples: [
      { code: 'collect([1, 2, 3])->map(fn($n) => $n * 2)->all()', output: '[2, 4, 6]' },
      { code: 'collect($users)->pluck("name")->toArray()', output: '["Alice", "Bob"]' },
      { code: 'collect([1, 2, 3])->sum()', output: '6' },
    ],
    relatedMethods: ['Collection::make', 'Collection::times', 'Collection::range'],
    notes: ['Laravel helper function', 'Enables method chaining on arrays'],
  },
  {
    name: 'Collection::map',
    category: 'Collection Methods',
    syntax: '$collection->map(callable $callback): Collection',
    description: 'Iterates through the collection and passes each value to the given callback.',
    arguments: [
      {
        name: 'callback',
        type: 'callable',
        description: 'Transformation function: fn($value, $key) => mixed',
      },
    ],
    returns: { type: 'Collection', description: 'New collection with transformed values' },
    examples: [
      { code: 'collect([1, 2, 3])->map(fn($n) => $n * 2)', output: 'Collection([2, 4, 6])' },
      { code: 'collect($users)->map(fn($u) => $u->name)', output: 'Collection(["Alice", "Bob"])' },
      {
        code: 'collect([1, 2])->map(fn($v, $k) => "$k: $v")',
        output: 'Collection(["0: 1", "1: 2"])',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['mapWithKeys', 'mapInto', 'transform', 'each'],
    notes: ['Returns new Collection, does not modify original'],
  },
  {
    name: 'Collection::filter',
    category: 'Collection Methods',
    syntax: '$collection->filter(?callable $callback = null): Collection',
    description:
      'Filters the collection using the given callback, keeping only items that pass the truth test.',
    arguments: [
      {
        name: 'callback',
        type: 'callable|null',
        description: 'Filter function: fn($value, $key) => bool',
        optional: true,
      },
    ],
    returns: { type: 'Collection', description: 'Filtered collection' },
    examples: [
      { code: 'collect([1, 2, 3, 4])->filter(fn($n) => $n > 2)', output: 'Collection([3, 4])' },
      {
        code: 'collect([1, null, 2, false, 3])->filter()',
        output: 'Collection([1, 2, 3])',
        explanation: 'Remove falsy',
      },
      { code: 'collect($users)->filter(fn($u) => $u->active)', output: 'Active users only' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['reject', 'where', 'whereNotNull', 'partition'],
    notes: ['Without callback, removes falsy values'],
  },
  {
    name: 'Collection::reduce',
    category: 'Collection Methods',
    syntax: '$collection->reduce(callable $callback, mixed $initial = null): mixed',
    description: 'Reduces the collection to a single value by iteratively combining elements.',
    arguments: [
      { name: 'callback', type: 'callable', description: 'Reducer: fn($carry, $item) => mixed' },
      { name: 'initial', type: 'mixed', description: 'Initial accumulator value', optional: true },
    ],
    returns: { type: 'mixed', description: 'Reduced value' },
    examples: [
      { code: 'collect([1, 2, 3])->reduce(fn($sum, $n) => $sum + $n, 0)', output: '6' },
      {
        code: 'collect($items)->reduce(fn($total, $i) => $total + $i->price, 0)',
        output: 'Total price',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['sum', 'avg', 'count', 'pipe'],
  },
  {
    name: 'Collection::pluck',
    category: 'Collection Methods',
    syntax: '$collection->pluck(string|array $value, ?string $key = null): Collection',
    description: 'Retrieves all of the values for a given key from the collection.',
    arguments: [
      { name: 'value', type: 'string|array', description: 'Key to pluck (supports dot notation)' },
      { name: 'key', type: 'string|null', description: 'Key to use as index', optional: true },
    ],
    returns: { type: 'Collection', description: 'Collection of plucked values' },
    examples: [
      { code: 'collect($users)->pluck("name")', output: 'Collection(["Alice", "Bob"])' },
      {
        code: 'collect($users)->pluck("name", "id")',
        output: 'Collection([1 => "Alice", 2 => "Bob"])',
      },
      { code: 'collect($posts)->pluck("author.name")', output: 'Nested pluck with dot notation' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['value', 'keys', 'values', 'map'],
    notes: ['Supports dot notation for nested values'],
  },
  {
    name: 'Collection::where',
    category: 'Collection Methods',
    syntax:
      '$collection->where(string $key, mixed $operator = null, mixed $value = null): Collection',
    description: 'Filters the collection by a given key/value pair.',
    arguments: [
      { name: 'key', type: 'string', description: 'Key to check' },
      {
        name: 'operator',
        type: 'mixed',
        description: 'Comparison operator or value',
        optional: true,
      },
      { name: 'value', type: 'mixed', description: 'Value to compare', optional: true },
    ],
    returns: { type: 'Collection', description: 'Filtered collection' },
    examples: [
      { code: 'collect($users)->where("active", true)', output: 'Active users' },
      { code: 'collect($products)->where("price", ">", 100)', output: 'Products over $100' },
      { code: 'collect($users)->where("role", "admin")', output: 'Admin users' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['whereIn', 'whereNotIn', 'whereBetween', 'filter', 'firstWhere'],
    notes: ['Supports operators: =, !=, <, >, <=, >=, <>, ===, !=='],
  },
  {
    name: 'Collection::groupBy',
    category: 'Collection Methods',
    syntax:
      '$collection->groupBy(string|callable $groupBy, bool $preserveKeys = false): Collection',
    description: 'Groups the collection items by a given key or callback.',
    arguments: [
      { name: 'groupBy', type: 'string|callable', description: 'Key or callback for grouping' },
      {
        name: 'preserveKeys',
        type: 'bool',
        description: 'Whether to preserve keys',
        optional: true,
      },
    ],
    returns: { type: 'Collection', description: 'Grouped collection' },
    examples: [
      {
        code: 'collect($users)->groupBy("role")',
        output: 'Collection(["admin" => [...], "user" => [...]])',
      },
      {
        code: 'collect($orders)->groupBy(fn($o) => $o->created_at->format("Y-m"))',
        output: 'Group by month',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['keyBy', 'partition', 'mapToGroups'],
  },
  {
    name: 'Collection::sortBy',
    category: 'Collection Methods',
    syntax:
      '$collection->sortBy(string|callable $callback, int $options = SORT_REGULAR, bool $descending = false): Collection',
    description: 'Sorts the collection by the given key or callback.',
    arguments: [
      { name: 'callback', type: 'string|callable', description: 'Key or sort function' },
      { name: 'options', type: 'int', description: 'Sort flags', optional: true },
      { name: 'descending', type: 'bool', description: 'Sort direction', optional: true },
    ],
    returns: { type: 'Collection', description: 'Sorted collection' },
    examples: [
      { code: 'collect($users)->sortBy("name")', output: 'Sorted by name A-Z' },
      { code: 'collect($products)->sortByDesc("price")', output: 'Sorted by price high-low' },
      { code: 'collect($users)->sortBy(fn($u) => $u->lastName)', output: 'Sort by computed value' },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['sortByDesc', 'sort', 'sortKeys', 'reverse'],
  },
  {
    name: 'Collection::first',
    category: 'Collection Methods',
    syntax: '$collection->first(?callable $callback = null, mixed $default = null): mixed',
    description: 'Returns the first element in the collection that passes a given truth test.',
    arguments: [
      {
        name: 'callback',
        type: 'callable|null',
        description: 'Truth test callback',
        optional: true,
      },
      { name: 'default', type: 'mixed', description: 'Default value if not found', optional: true },
    ],
    returns: { type: 'mixed', description: 'First matching element or default' },
    examples: [
      { code: 'collect([1, 2, 3])->first()', output: '1' },
      { code: 'collect([1, 2, 3])->first(fn($n) => $n > 1)', output: '2' },
      { code: 'collect([])->first(default: "none")', output: '"none"' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['firstWhere', 'last', 'firstOrFail', 'sole'],
  },
  {
    name: 'Collection::chunk',
    category: 'Collection Methods',
    syntax: '$collection->chunk(int $size): Collection',
    description: 'Breaks the collection into multiple smaller collections of a given size.',
    arguments: [{ name: 'size', type: 'int', description: 'Size of each chunk' }],
    returns: { type: 'Collection', description: 'Collection of chunks' },
    examples: [
      { code: 'collect([1, 2, 3, 4, 5])->chunk(2)', output: 'Collection([[1, 2], [3, 4], [5]])' },
      {
        code: 'collect($items)->chunk(100)->each(fn($c) => process($c))',
        output: 'Batch processing',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['split', 'splitIn', 'forPage'],
    notes: ['Useful for batch processing large datasets'],
  },
  {
    name: 'Collection::flatMap',
    category: 'Collection Methods',
    syntax: '$collection->flatMap(callable $callback): Collection',
    description: 'Maps a function over items and flattens the result by one level.',
    arguments: [
      {
        name: 'callback',
        type: 'callable',
        description: 'Function that returns an array or collection',
      },
    ],
    returns: { type: 'Collection', description: 'Flattened collection' },
    examples: [
      {
        code: 'collect([[1, 2], [3, 4]])->flatMap(fn($a) => $a)',
        output: 'Collection([1, 2, 3, 4])',
      },
      { code: 'collect($users)->flatMap(fn($u) => $u->roles)', output: 'All roles flattened' },
    ],
    timeComplexity: 'O(n*m)',
    spaceComplexity: 'O(n*m)',
    relatedMethods: ['map', 'flatten', 'collapse'],
  },
  {
    name: 'Collection::unique',
    category: 'Collection Methods',
    syntax:
      '$collection->unique(string|callable|null $key = null, bool $strict = false): Collection',
    description: 'Returns all unique items in the collection.',
    arguments: [
      {
        name: 'key',
        type: 'string|callable|null',
        description: 'Key or callback for uniqueness',
        optional: true,
      },
      { name: 'strict', type: 'bool', description: 'Use strict comparison', optional: true },
    ],
    returns: { type: 'Collection', description: 'Collection with unique items' },
    examples: [
      { code: 'collect([1, 1, 2, 2, 3])->unique()', output: 'Collection([1, 2, 3])' },
      { code: 'collect($users)->unique("email")', output: 'Unique by email' },
      { code: 'collect($users)->unique(fn($u) => $u->department)', output: 'One per department' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['uniqueStrict', 'duplicates'],
  },
  {
    name: 'Collection::pipe',
    category: 'Collection Methods',
    syntax: '$collection->pipe(callable $callback): mixed',
    description: 'Passes the collection to the given callback and returns the result.',
    arguments: [
      { name: 'callback', type: 'callable', description: 'Callback that receives the collection' },
    ],
    returns: { type: 'mixed', description: 'Result of the callback' },
    examples: [
      { code: 'collect([1, 2, 3])->pipe(fn($c) => $c->sum())', output: '6' },
      {
        code: 'collect($data)->filter()->pipe(fn($c) => new Report($c))',
        output: 'Transform to object',
      },
    ],
    relatedMethods: ['pipeInto', 'pipeThrough', 'tap'],
    notes: ['Useful for breaking out of method chaining'],
  },

  // ============================================================
  // Eloquent ORM
  // ============================================================
  {
    name: 'Model::find',
    category: 'Eloquent ORM',
    syntax: 'Model::find(mixed $id, array $columns = ["*"]): Model|Collection|null',
    description: 'Finds a model by its primary key.',
    arguments: [
      { name: 'id', type: 'mixed', description: 'Primary key value(s)' },
      { name: 'columns', type: 'array', description: 'Columns to retrieve', optional: true },
    ],
    returns: { type: 'Model|Collection|null', description: 'Model instance, Collection, or null' },
    examples: [
      { code: 'User::find(1)', output: 'User model or null' },
      { code: 'User::find([1, 2, 3])', output: 'Collection of Users' },
      { code: 'User::find(1, ["id", "name"])', output: 'User with specific columns' },
    ],
    relatedMethods: ['findOrFail', 'findOr', 'findMany', 'first'],
    notes: ['Returns null if not found', 'Use findOrFail to throw exception'],
  },
  {
    name: 'Model::where',
    category: 'Eloquent ORM',
    syntax:
      'Model::where(string|array|Closure $column, mixed $operator = null, mixed $value = null): Builder',
    description: 'Adds a where clause to the query.',
    arguments: [
      {
        name: 'column',
        type: 'string|array|Closure',
        description: 'Column name, array of conditions, or closure',
      },
      {
        name: 'operator',
        type: 'mixed',
        description: 'Comparison operator or value',
        optional: true,
      },
      { name: 'value', type: 'mixed', description: 'Value to compare', optional: true },
    ],
    returns: { type: 'Builder', description: 'Query builder instance' },
    examples: [
      { code: 'User::where("active", true)->get()', output: 'Active users' },
      { code: 'User::where("age", ">", 18)->get()', output: 'Adult users' },
      { code: 'User::where(["active" => true, "role" => "admin"])->get()', output: 'Array syntax' },
      {
        code: 'User::where(fn($q) => $q->where("a", 1)->orWhere("b", 2))->get()',
        output: 'Closure for grouping',
      },
    ],
    relatedMethods: ['orWhere', 'whereIn', 'whereBetween', 'whereNull', 'whereHas'],
    notes: ['Returns Builder - call get(), first(), or other terminal methods'],
  },
  {
    name: 'Model::with',
    category: 'Eloquent ORM',
    syntax: 'Model::with(string|array $relations): Builder',
    description: 'Eager loads relationships to prevent N+1 query problems.',
    arguments: [
      { name: 'relations', type: 'string|array', description: 'Relationship names to eager load' },
    ],
    returns: { type: 'Builder', description: 'Query builder instance' },
    examples: [
      { code: 'Post::with("author")->get()', output: 'Posts with authors (2 queries)' },
      { code: 'Post::with(["author", "comments"])->get()', output: 'Multiple relations' },
      {
        code: 'Post::with(["comments" => fn($q) => $q->latest()])->get()',
        output: 'Constrained eager loading',
      },
      { code: 'Post::with("author.profile")->get()', output: 'Nested relations' },
    ],
    relatedMethods: ['load', 'withCount', 'without', 'loadMissing'],
    notes: ['Essential for preventing N+1 queries', 'Use withCount for counting related models'],
  },
  {
    name: 'Model::create',
    category: 'Eloquent ORM',
    syntax: 'Model::create(array $attributes): Model',
    description: 'Creates a new model and persists it to the database.',
    arguments: [{ name: 'attributes', type: 'array', description: 'Model attributes' }],
    returns: { type: 'Model', description: 'Created model instance' },
    examples: [
      {
        code: 'User::create(["name" => "John", "email" => "john@example.com"])',
        output: 'New User model',
      },
      {
        code: '$post->comments()->create(["body" => "Great post!"])',
        output: 'Create related model',
      },
    ],
    relatedMethods: ['firstOrCreate', 'updateOrCreate', 'make', 'insert'],
    notes: ['Requires $fillable or $guarded to be set on model', 'Fires creating/created events'],
  },
  {
    name: 'Model::updateOrCreate',
    category: 'Eloquent ORM',
    syntax: 'Model::updateOrCreate(array $attributes, array $values = []): Model',
    description: 'Finds a record matching attributes or creates a new one, then updates it.',
    arguments: [
      { name: 'attributes', type: 'array', description: 'Attributes to match' },
      {
        name: 'values',
        type: 'array',
        description: 'Values to update/create with',
        optional: true,
      },
    ],
    returns: { type: 'Model', description: 'Updated or created model' },
    examples: [
      {
        code: 'User::updateOrCreate(["email" => "john@example.com"], ["name" => "John Doe"])',
        output: 'Upsert operation',
      },
      {
        code: 'Setting::updateOrCreate(["key" => "theme"], ["value" => "dark"])',
        output: 'Update or create setting',
      },
    ],
    relatedMethods: ['firstOrCreate', 'firstOrNew', 'upsert'],
    notes: [
      'Atomic operation - great for upserts',
      'First array = lookup, second array = data to set',
    ],
  },
  {
    name: 'Model::belongsTo',
    category: 'Eloquent ORM',
    syntax:
      '$this->belongsTo(string $related, ?string $foreignKey = null, ?string $ownerKey = null): BelongsTo',
    description: 'Defines an inverse one-to-many relationship.',
    arguments: [
      { name: 'related', type: 'string', description: 'Related model class' },
      {
        name: 'foreignKey',
        type: 'string|null',
        description: 'Foreign key on this model',
        optional: true,
      },
      {
        name: 'ownerKey',
        type: 'string|null',
        description: 'Primary key on related model',
        optional: true,
      },
    ],
    returns: { type: 'BelongsTo', description: 'Relationship instance' },
    examples: [
      {
        code: 'public function user(): BelongsTo { return $this->belongsTo(User::class); }',
        output: 'Post belongs to User',
      },
      { code: '$this->belongsTo(User::class, "author_id")', output: 'Custom foreign key' },
    ],
    relatedMethods: ['hasOne', 'hasMany', 'belongsToMany'],
    notes: ['Place in model - the "child" side of the relationship'],
  },
  {
    name: 'Model::hasMany',
    category: 'Eloquent ORM',
    syntax:
      '$this->hasMany(string $related, ?string $foreignKey = null, ?string $localKey = null): HasMany',
    description: 'Defines a one-to-many relationship.',
    arguments: [
      { name: 'related', type: 'string', description: 'Related model class' },
      {
        name: 'foreignKey',
        type: 'string|null',
        description: 'Foreign key on related model',
        optional: true,
      },
      {
        name: 'localKey',
        type: 'string|null',
        description: 'Local key on this model',
        optional: true,
      },
    ],
    returns: { type: 'HasMany', description: 'Relationship instance' },
    examples: [
      {
        code: 'public function posts(): HasMany { return $this->hasMany(Post::class); }',
        output: 'User has many Posts',
      },
      {
        code: '$user->posts()->where("published", true)->get()',
        output: 'Query through relationship',
      },
      {
        code: '$user->posts()->create(["title" => "New Post"])',
        output: 'Create through relationship',
      },
    ],
    relatedMethods: ['hasOne', 'belongsTo', 'hasManyThrough'],
    notes: ['The "parent" side of a one-to-many relationship'],
  },
  {
    name: 'Model::scope',
    category: 'Eloquent ORM',
    syntax: 'public function scopeName(Builder $query, ...args): Builder',
    description: 'Defines a local query scope for reusable query constraints.',
    arguments: [
      { name: 'query', type: 'Builder', description: 'Query builder instance' },
      { name: 'args', type: 'mixed', description: 'Additional arguments', optional: true },
    ],
    returns: { type: 'Builder', description: 'Modified query builder' },
    examples: [
      {
        code: 'public function scopeActive($query) { return $query->where("active", true); }',
        output: 'Define scope',
      },
      { code: 'User::active()->get()', output: 'Use scope' },
      {
        code: 'public function scopeOfType($query, $type) { return $query->where("type", $type); }',
        output: 'Scope with parameter',
      },
      { code: 'Post::active()->ofType("article")->get()', output: 'Chain scopes' },
    ],
    relatedMethods: ['withGlobalScope', 'withoutGlobalScope'],
    notes: [
      'Prefix method with "scope" - called without prefix',
      'Great for encapsulating common queries',
    ],
  },

  // ============================================================
  // Laravel Helpers
  // ============================================================
  {
    name: 'Str::of',
    category: 'Laravel Helpers',
    syntax: 'Str::of(string $string): Stringable',
    description: 'Creates a fluent string instance for chaining string operations.',
    arguments: [{ name: 'string', type: 'string', description: 'Input string' }],
    returns: { type: 'Stringable', description: 'Fluent string instance' },
    examples: [
      { code: 'Str::of("hello world")->title()->toString()', output: '"Hello World"' },
      { code: 'Str::of("  Laravel  ")->trim()->upper()->toString()', output: '"LARAVEL"' },
      { code: 'Str::of("hello-world")->camel()->toString()', output: '"helloWorld"' },
      { code: 'Str::of("foo bar")->slug()->toString()', output: '"foo-bar"' },
    ],
    relatedMethods: ['str', 'Str::slug', 'Str::camel', 'Str::studly'],
    notes: ['Enables fluent method chaining', 'Use str() helper as shorthand'],
  },
  {
    name: 'Str::slug',
    category: 'Laravel Helpers',
    syntax: 'Str::slug(string $title, string $separator = "-", ?string $language = "en"): string',
    description: 'Generates a URL-friendly "slug" from the given string.',
    arguments: [
      { name: 'title', type: 'string', description: 'String to slugify' },
      { name: 'separator', type: 'string', description: 'Word separator', optional: true },
      {
        name: 'language',
        type: 'string|null',
        description: 'Language for transliteration',
        optional: true,
      },
    ],
    returns: { type: 'string', description: 'URL-friendly slug' },
    examples: [
      { code: 'Str::slug("Hello World")', output: '"hello-world"' },
      { code: 'Str::slug("Laravel 10 Features!", "_")', output: '"laravel_10_features"' },
      { code: 'Str::slug("Cafe")', output: '"cafe"', explanation: 'Handles accents' },
    ],
    relatedMethods: ['Str::of', 'Str::headline', 'Str::kebab'],
    notes: ['Perfect for generating URL slugs from titles'],
  },
  {
    name: 'Arr::get',
    category: 'Laravel Helpers',
    syntax: 'Arr::get(array $array, string|int|null $key, mixed $default = null): mixed',
    description: 'Gets a value from a nested array using dot notation.',
    arguments: [
      { name: 'array', type: 'array', description: 'Input array' },
      { name: 'key', type: 'string|int|null', description: 'Key with dot notation support' },
      { name: 'default', type: 'mixed', description: 'Default value if not found', optional: true },
    ],
    returns: { type: 'mixed', description: 'Value at key or default' },
    examples: [
      { code: 'Arr::get($config, "database.default")', output: 'Nested value' },
      { code: 'Arr::get($data, "user.name", "Guest")', output: 'With default' },
      { code: 'Arr::get($arr, "items.0.name")', output: 'Array index access' },
    ],
    relatedMethods: ['Arr::set', 'Arr::has', 'Arr::forget', 'data_get'],
    notes: ['Dot notation supports deep nesting', 'Use data_get for object support'],
  },
  {
    name: 'Arr::only',
    category: 'Laravel Helpers',
    syntax: 'Arr::only(array $array, array|string $keys): array',
    description: 'Returns only the specified key-value pairs from the array.',
    arguments: [
      { name: 'array', type: 'array', description: 'Input array' },
      { name: 'keys', type: 'array|string', description: 'Keys to keep' },
    ],
    returns: { type: 'array', description: 'Array with only specified keys' },
    examples: [
      {
        code: 'Arr::only($user, ["name", "email"])',
        output: '["name" => "John", "email" => "john@example.com"]',
      },
      { code: 'Arr::only($request->all(), ["title", "body"])', output: 'Filter request data' },
    ],
    relatedMethods: ['Arr::except', 'Arr::pluck', 'Arr::pull'],
    notes: ['Great for filtering sensitive data', 'Often used with request data'],
  },
  {
    name: 'Arr::except',
    category: 'Laravel Helpers',
    syntax: 'Arr::except(array $array, array|string $keys): array',
    description: 'Returns all key-value pairs except the specified keys.',
    arguments: [
      { name: 'array', type: 'array', description: 'Input array' },
      { name: 'keys', type: 'array|string', description: 'Keys to exclude' },
    ],
    returns: { type: 'array', description: 'Array without specified keys' },
    examples: [
      {
        code: 'Arr::except($user, ["password", "remember_token"])',
        output: 'Exclude sensitive fields',
      },
      { code: 'Arr::except($data, "_token")', output: 'Remove CSRF token' },
    ],
    relatedMethods: ['Arr::only', 'Arr::forget'],
  },
  {
    name: 'optional',
    category: 'Laravel Helpers',
    syntax: 'optional(mixed $value, ?callable $callback = null): mixed',
    description: 'Allows you to access properties or call methods on an object that might be null.',
    arguments: [
      { name: 'value', type: 'mixed', description: 'Value that might be null' },
      {
        name: 'callback',
        type: 'callable|null',
        description: 'Callback to execute if not null',
        optional: true,
      },
    ],
    returns: { type: 'mixed', description: 'Property value, method result, or null' },
    examples: [
      { code: 'optional($user)->name', output: 'Name or null (no error)' },
      { code: 'optional($user)->getFullName()', output: 'Method call or null' },
      { code: 'optional($user, fn($u) => $u->name)', output: 'With callback' },
    ],
    relatedMethods: ['rescue', 'throw_if', 'throw_unless'],
    notes: [
      'Prevents "call to member function on null" errors',
      'Use nullsafe operator ?-> in PHP 8+',
    ],
  },
  {
    name: 'tap',
    category: 'Laravel Helpers',
    syntax: 'tap(mixed $value, ?callable $callback = null): mixed',
    description: 'Calls the given callback with the value then returns the value.',
    arguments: [
      { name: 'value', type: 'mixed', description: 'Value to pass and return' },
      {
        name: 'callback',
        type: 'callable|null',
        description: 'Callback to execute',
        optional: true,
      },
    ],
    returns: { type: 'mixed', description: 'The original value' },
    examples: [
      { code: 'tap($user)->update(["last_login" => now()])', output: 'Returns $user after update' },
      { code: 'tap(new User, fn($u) => $u->name = "John")', output: 'Configure and return' },
      {
        code: 'return tap($user, fn($u) => Log::info("User: ".$u->id))',
        output: 'Side effect then return',
      },
    ],
    relatedMethods: ['value', 'with', 'transform'],
    notes: ['Great for adding side effects in a fluent chain'],
  },
  {
    name: 'now',
    category: 'Laravel Helpers',
    syntax: 'now(?string $tz = null): Carbon',
    description: 'Creates a new Carbon instance for the current time.',
    arguments: [{ name: 'tz', type: 'string|null', description: 'Timezone', optional: true }],
    returns: { type: 'Carbon', description: 'Carbon instance' },
    examples: [
      { code: 'now()', output: '2024-01-15 10:30:00' },
      { code: 'now()->addDays(7)', output: 'One week from now' },
      { code: 'now()->startOfMonth()', output: 'First day of month' },
      { code: 'now("America/New_York")', output: 'Current time in NY' },
    ],
    relatedMethods: ['today', 'Carbon::parse', 'Carbon::create'],
  },

  // ============================================================
  // Date & Time (Carbon)
  // ============================================================
  {
    name: 'Carbon::parse',
    category: 'Date & Time',
    syntax:
      'Carbon::parse(string|DateTimeInterface $time = null, DateTimeZone|string $tz = null): Carbon',
    description: 'Parses a string or DateTime into a Carbon instance.',
    arguments: [
      { name: 'time', type: 'string|DateTimeInterface', description: 'Date/time string or object' },
      { name: 'tz', type: 'DateTimeZone|string', description: 'Timezone', optional: true },
    ],
    returns: { type: 'Carbon', description: 'Carbon instance' },
    examples: [
      { code: 'Carbon::parse("2024-01-15")', output: 'Carbon instance' },
      { code: 'Carbon::parse("next monday")', output: 'Relative date' },
      { code: 'Carbon::parse("2024-01-15")->format("F j, Y")', output: '"January 15, 2024"' },
    ],
    relatedMethods: ['Carbon::create', 'Carbon::createFromFormat', 'now'],
  },
  {
    name: 'Carbon::diffForHumans',
    category: 'Date & Time',
    syntax: '$carbon->diffForHumans(?Carbon $other = null, bool $absolute = false): string',
    description: 'Gets the difference in a human-readable format.',
    arguments: [
      {
        name: 'other',
        type: 'Carbon|null',
        description: 'Date to compare against',
        optional: true,
      },
      { name: 'absolute', type: 'bool', description: 'Remove ago/from now', optional: true },
    ],
    returns: { type: 'string', description: 'Human-readable difference' },
    examples: [
      { code: 'now()->subHours(2)->diffForHumans()', output: '"2 hours ago"' },
      { code: 'now()->addDays(3)->diffForHumans()', output: '"3 days from now"' },
      { code: '$post->created_at->diffForHumans()', output: '"5 minutes ago"' },
    ],
    relatedMethods: ['diff', 'diffInDays', 'diffInHours'],
    notes: ['Great for displaying "time ago" in UIs'],
  },
  {
    name: 'Carbon::format',
    category: 'Date & Time',
    syntax: '$carbon->format(string $format): string',
    description: 'Formats the date using PHP date format characters.',
    arguments: [{ name: 'format', type: 'string', description: 'Format string (PHP date format)' }],
    returns: { type: 'string', description: 'Formatted date string' },
    examples: [
      { code: 'now()->format("Y-m-d")', output: '"2024-01-15"' },
      { code: 'now()->format("F j, Y g:i A")', output: '"January 15, 2024 10:30 AM"' },
      { code: 'now()->format("l")', output: '"Monday"' },
    ],
    relatedMethods: ['toDateString', 'toDateTimeString', 'toIso8601String'],
  },

  // ============================================================
  // Type Functions (PHP 8+)
  // ============================================================
  {
    name: 'gettype',
    category: 'Type Functions',
    syntax: 'gettype(mixed $value): string',
    description: 'Returns the type of a variable as a string.',
    arguments: [{ name: 'value', type: 'mixed', description: 'Value to check' }],
    returns: { type: 'string', description: 'Type name' },
    examples: [
      { code: 'gettype(42)', output: '"integer"' },
      { code: 'gettype([1, 2, 3])', output: '"array"' },
      { code: 'gettype(new stdClass())', output: '"object"' },
    ],
    relatedMethods: ['get_debug_type', 'is_array', 'is_string'],
    notes: ['Use get_debug_type() for more detailed type info in PHP 8+'],
  },
  {
    name: 'get_debug_type',
    category: 'Type Functions',
    syntax: 'get_debug_type(mixed $value): string',
    description: 'Returns the resolved name of the type of a variable (PHP 8+).',
    arguments: [{ name: 'value', type: 'mixed', description: 'Value to check' }],
    returns: { type: 'string', description: 'Type name including class names' },
    examples: [
      { code: 'get_debug_type(42)', output: '"int"' },
      {
        code: 'get_debug_type(new User())',
        output: '"App\\Models\\User"',
        explanation: 'Full class name',
      },
      { code: 'get_debug_type(null)', output: '"null"' },
    ],
    relatedMethods: ['gettype', 'get_class', 'instanceof'],
    sinceVersion: 'PHP 8.0',
    notes: ['Preferred over gettype() in PHP 8+', 'Returns actual class names for objects'],
  },
  {
    name: 'instanceof',
    category: 'Type Functions',
    syntax: '$object instanceof ClassName',
    description: 'Checks if an object is an instance of a class or implements an interface.',
    arguments: [
      { name: 'object', type: 'object', description: 'Object to check' },
      { name: 'ClassName', type: 'string', description: 'Class or interface name' },
    ],
    returns: { type: 'bool', description: 'True if object is instance of class' },
    examples: [
      { code: '$user instanceof User', output: 'true' },
      { code: '$model instanceof Model', output: 'true', explanation: 'Parent class' },
      { code: '$service instanceof Cacheable', output: 'true', explanation: 'Interface check' },
    ],
    relatedMethods: ['is_a', 'get_class', 'get_parent_class'],
    notes: ['Checks inheritance chain and interfaces', 'Preferred over is_a()'],
  },

  // ============================================================
  // JSON Functions
  // ============================================================
  {
    name: 'json_encode',
    category: 'JSON Functions',
    syntax: 'json_encode(mixed $value, int $flags = 0, int $depth = 512): string|false',
    description: 'Encodes a value as a JSON string.',
    arguments: [
      { name: 'value', type: 'mixed', description: 'Value to encode' },
      { name: 'flags', type: 'int', description: 'JSON encoding options', optional: true },
      { name: 'depth', type: 'int', description: 'Maximum nesting depth', optional: true },
    ],
    returns: { type: 'string|false', description: 'JSON string or false on error' },
    examples: [
      {
        code: 'json_encode(["name" => "John", "age" => 30])',
        output: '\'{"name":"John","age":30}\'',
      },
      { code: 'json_encode($data, JSON_PRETTY_PRINT)', output: 'Formatted JSON' },
      { code: 'json_encode($arr, JSON_THROW_ON_ERROR)', output: 'Throws on error (PHP 7.3+)' },
    ],
    relatedMethods: ['json_decode', 'json_last_error', 'json_last_error_msg'],
    notes: [
      'Use JSON_THROW_ON_ERROR flag in PHP 7.3+',
      'Common flags: JSON_PRETTY_PRINT, JSON_UNESCAPED_SLASHES',
    ],
  },
  {
    name: 'json_decode',
    category: 'JSON Functions',
    syntax:
      'json_decode(string $json, ?bool $associative = null, int $depth = 512, int $flags = 0): mixed',
    description: 'Decodes a JSON string into a PHP value.',
    arguments: [
      { name: 'json', type: 'string', description: 'JSON string to decode' },
      {
        name: 'associative',
        type: 'bool|null',
        description: 'Return arrays instead of objects',
        optional: true,
      },
      { name: 'depth', type: 'int', description: 'Maximum nesting depth', optional: true },
      { name: 'flags', type: 'int', description: 'JSON decoding options', optional: true },
    ],
    returns: { type: 'mixed', description: 'Decoded value' },
    examples: [
      {
        code: 'json_decode(\'{"name":"John"}\', true)',
        output: '["name" => "John"]',
        explanation: 'As associative array',
      },
      { code: 'json_decode(\'{"name":"John"}\')', output: 'stdClass object' },
      {
        code: 'json_decode($json, true, 512, JSON_THROW_ON_ERROR)',
        output: 'Throws on invalid JSON',
      },
    ],
    relatedMethods: ['json_encode', 'json_last_error'],
    notes: ['Second parameter true returns arrays, false/null returns objects'],
  },

  // ============================================================
  // File Functions
  // ============================================================
  {
    name: 'file_get_contents',
    category: 'File Functions',
    syntax:
      'file_get_contents(string $filename, bool $use_include_path = false, ?resource $context = null, int $offset = 0, ?int $length = null): string|false',
    description: 'Reads entire file into a string.',
    arguments: [
      { name: 'filename', type: 'string', description: 'Path to file or URL' },
      {
        name: 'use_include_path',
        type: 'bool',
        description: 'Search include_path',
        optional: true,
      },
      { name: 'context', type: 'resource|null', description: 'Stream context', optional: true },
      { name: 'offset', type: 'int', description: 'Starting offset', optional: true },
      { name: 'length', type: 'int|null', description: 'Maximum length to read', optional: true },
    ],
    returns: { type: 'string|false', description: 'File contents or false on failure' },
    examples: [
      { code: 'file_get_contents("/path/to/file.txt")', output: 'File contents' },
      { code: 'file_get_contents("https://api.example.com/data")', output: 'HTTP response body' },
      { code: 'json_decode(file_get_contents("config.json"), true)', output: 'Read JSON file' },
    ],
    relatedMethods: ['file_put_contents', 'fopen', 'fread'],
    notes: [
      'Can read URLs as well as local files',
      'Use for small files - loads entire file into memory',
    ],
  },
  {
    name: 'file_put_contents',
    category: 'File Functions',
    syntax:
      'file_put_contents(string $filename, mixed $data, int $flags = 0, ?resource $context = null): int|false',
    description: 'Writes data to a file.',
    arguments: [
      { name: 'filename', type: 'string', description: 'Path to file' },
      { name: 'data', type: 'mixed', description: 'Data to write' },
      { name: 'flags', type: 'int', description: 'FILE_APPEND, LOCK_EX, etc.', optional: true },
      { name: 'context', type: 'resource|null', description: 'Stream context', optional: true },
    ],
    returns: { type: 'int|false', description: 'Number of bytes written or false' },
    examples: [
      { code: 'file_put_contents("log.txt", "Hello World")', output: 'Write to file' },
      {
        code: 'file_put_contents("log.txt", "New line\\n", FILE_APPEND)',
        output: 'Append to file',
      },
      { code: 'file_put_contents("data.json", json_encode($data))', output: 'Write JSON' },
    ],
    relatedMethods: ['file_get_contents', 'fwrite', 'fopen'],
    notes: ['Creates file if it does not exist', 'FILE_APPEND adds to end instead of overwriting'],
  },

  // ============================================================
  // Math Functions
  // ============================================================
  {
    name: 'round',
    category: 'Math Functions',
    syntax: 'round(int|float $num, int $precision = 0, int $mode = PHP_ROUND_HALF_UP): float',
    description: 'Rounds a float to specified precision.',
    arguments: [
      { name: 'num', type: 'int|float', description: 'Number to round' },
      { name: 'precision', type: 'int', description: 'Decimal places', optional: true },
      { name: 'mode', type: 'int', description: 'Rounding mode', optional: true },
    ],
    returns: { type: 'float', description: 'Rounded number' },
    examples: [
      { code: 'round(3.4)', output: '3' },
      { code: 'round(3.14159, 2)', output: '3.14' },
      { code: 'round(2.5, 0, PHP_ROUND_HALF_DOWN)', output: '2' },
    ],
    relatedMethods: ['floor', 'ceil', 'number_format'],
  },
  {
    name: 'number_format',
    category: 'Math Functions',
    syntax:
      'number_format(float $num, int $decimals = 0, ?string $decimal_separator = ".", ?string $thousands_separator = ","): string',
    description: 'Formats a number with grouped thousands and decimal places.',
    arguments: [
      { name: 'num', type: 'float', description: 'Number to format' },
      { name: 'decimals', type: 'int', description: 'Decimal places', optional: true },
      {
        name: 'decimal_separator',
        type: 'string',
        description: 'Decimal point character',
        optional: true,
      },
      {
        name: 'thousands_separator',
        type: 'string',
        description: 'Thousands separator',
        optional: true,
      },
    ],
    returns: { type: 'string', description: 'Formatted number' },
    examples: [
      { code: 'number_format(1234567.891, 2)', output: '"1,234,567.89"' },
      {
        code: 'number_format(1234.5, 2, ",", " ")',
        output: '"1 234,50"',
        explanation: 'European format',
      },
    ],
    relatedMethods: ['round', 'sprintf', 'money_format'],
  },
  {
    name: 'max',
    category: 'Math Functions',
    syntax: 'max(mixed $value, mixed ...$values): mixed',
    description: 'Returns the highest value from arguments or array.',
    arguments: [
      { name: 'value', type: 'mixed', description: 'First value or array' },
      { name: 'values', type: 'mixed', description: 'Additional values', optional: true },
    ],
    returns: { type: 'mixed', description: 'Highest value' },
    examples: [
      { code: 'max(1, 5, 3)', output: '5' },
      { code: 'max([1, 5, 3])', output: '5', explanation: 'With array' },
      { code: 'max(0, $value)', output: 'Ensure non-negative' },
    ],
    relatedMethods: ['min', 'array_max'],
  },
  {
    name: 'min',
    category: 'Math Functions',
    syntax: 'min(mixed $value, mixed ...$values): mixed',
    description: 'Returns the lowest value from arguments or array.',
    arguments: [
      { name: 'value', type: 'mixed', description: 'First value or array' },
      { name: 'values', type: 'mixed', description: 'Additional values', optional: true },
    ],
    returns: { type: 'mixed', description: 'Lowest value' },
    examples: [
      { code: 'min(1, 5, 3)', output: '1' },
      { code: 'min([1, 5, 3])', output: '1' },
      { code: 'min($value, 100)', output: 'Cap at maximum 100' },
    ],
    relatedMethods: ['max', 'array_min'],
  },
];
