import type { Method } from '../types';

export const luaMethods: Method[] = [
  // ============================================================
  // Table Functions
  // ============================================================
  {
    name: 'table.insert',
    category: 'Table Functions',
    syntax: 'table.insert(list, [pos,] value)',
    description:
      'Inserts element value at position pos in list, shifting up other elements. The default value for pos is the length of the table plus one, so a call table.insert(t, x) inserts x at the end of table t.',
    arguments: [
      { name: 'list', type: 'table', description: 'The table to insert into' },
      {
        name: 'pos',
        type: 'number',
        description: 'Position at which to insert the element',
        optional: true,
        defaultValue: '#list + 1',
      },
      { name: 'value', type: 'any', description: 'The value to insert' },
    ],
    returns: { type: 'nil', description: 'Modifies the table in place, returns nothing' },
    examples: [
      {
        code: 'local t = {1, 2, 3}\ntable.insert(t, 4)\nprint(table.concat(t, ", "))',
        output: '1, 2, 3, 4',
        explanation: 'Inserts 4 at the end of the table',
      },
      {
        code: 'local t = {"a", "c", "d"}\ntable.insert(t, 2, "b")\nprint(table.concat(t, ", "))',
        output: 'a, b, c, d',
        explanation: 'Inserts "b" at position 2, shifting elements right',
      },
    ],
    timeComplexity: 'O(1) for end, O(n) for arbitrary position',
    spaceComplexity: 'O(1)',
    relatedMethods: ['table.remove', 'table.move'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Modifies the table in place',
      'Shifts elements up when inserting at an arbitrary position',
    ],
  },
  {
    name: 'table.remove',
    category: 'Table Functions',
    syntax: 'table.remove(list [, pos])',
    description:
      'Removes from list the element at position pos, returning the value of the removed element. The default value for pos is the length of the table, so table.remove(t) removes the last element.',
    arguments: [
      { name: 'list', type: 'table', description: 'The table to remove from' },
      {
        name: 'pos',
        type: 'number',
        description: 'Position of the element to remove',
        optional: true,
        defaultValue: '#list',
      },
    ],
    returns: { type: 'any', description: 'The value of the removed element' },
    examples: [
      {
        code: 'local t = {10, 20, 30, 40}\nlocal removed = table.remove(t)\nprint(removed, table.concat(t, ", "))',
        output: '40\t10, 20, 30',
        explanation: 'Removes and returns the last element',
      },
      {
        code: 'local t = {"a", "b", "c", "d"}\nlocal removed = table.remove(t, 2)\nprint(removed, table.concat(t, ", "))',
        output: 'b\ta, c, d',
        explanation: 'Removes element at position 2, shifts remaining elements down',
      },
    ],
    timeComplexity: 'O(1) for last, O(n) for arbitrary position',
    spaceComplexity: 'O(1)',
    relatedMethods: ['table.insert', 'table.move'],
    sinceVersion: 'Lua 5.0',
    notes: ['Shifts elements down to close the gap when removing from an arbitrary position'],
  },
  {
    name: 'table.sort',
    category: 'Table Functions',
    syntax: 'table.sort(list [, comp])',
    description:
      'Sorts the elements of list in place, from list[1] to list[#list]. If comp is given, it must be a function that receives two list elements and returns true when the first element must come before the second.',
    arguments: [
      { name: 'list', type: 'table', description: 'The table to sort' },
      {
        name: 'comp',
        type: 'function',
        description: 'A comparison function that takes two elements and returns a boolean',
        optional: true,
      },
    ],
    returns: { type: 'nil', description: 'Sorts the table in place, returns nothing' },
    examples: [
      {
        code: 'local t = {3, 1, 4, 1, 5, 9}\ntable.sort(t)\nprint(table.concat(t, ", "))',
        output: '1, 1, 3, 4, 5, 9',
        explanation: 'Sorts in ascending order by default',
      },
      {
        code: 'local t = {3, 1, 4, 1, 5}\ntable.sort(t, function(a, b) return a > b end)\nprint(table.concat(t, ", "))',
        output: '5, 4, 3, 1, 1',
        explanation: 'Sorts in descending order using a custom comparator',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    relatedMethods: ['table.insert', 'table.remove'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'The sort algorithm is not guaranteed to be stable',
      'The comparator must define a strict weak ordering (comp(a,a) must be false)',
    ],
  },
  {
    name: 'table.concat',
    category: 'Table Functions',
    syntax: 'table.concat(list [, sep [, i [, j]]])',
    description:
      'Given a list where all elements are strings or numbers, returns the string list[i]..sep..list[i+1]...sep..list[j]. The default value for sep is the empty string, for i is 1, and for j is #list.',
    arguments: [
      { name: 'list', type: 'table', description: 'The table whose elements to concatenate' },
      {
        name: 'sep',
        type: 'string',
        description: 'Separator string placed between elements',
        optional: true,
        defaultValue: '""',
      },
      {
        name: 'i',
        type: 'number',
        description: 'Start index',
        optional: true,
        defaultValue: '1',
      },
      {
        name: 'j',
        type: 'number',
        description: 'End index',
        optional: true,
        defaultValue: '#list',
      },
    ],
    returns: { type: 'string', description: 'A string of all elements joined by the separator' },
    examples: [
      {
        code: 'local t = {"Hello", "World"}\nprint(table.concat(t, " "))',
        output: 'Hello World',
        explanation: 'Joins elements with a space separator',
      },
      {
        code: 'local t = {1, 2, 3, 4, 5}\nprint(table.concat(t, "-", 2, 4))',
        output: '2-3-4',
        explanation: 'Joins elements from index 2 to 4 with a dash',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['table.insert', 'string.format'],
    sinceVersion: 'Lua 5.0',
    notes: ['All elements must be strings or numbers, otherwise an error is raised'],
  },
  {
    name: 'table.move',
    category: 'Table Functions',
    syntax: 'table.move(a1, f, e, t [, a2])',
    description:
      'Moves elements from table a1 to table a2 (which can be the same table). Equivalent to: a2[t], a2[t+1], ... = a1[f], a1[f+1], ..., a1[e]. The default for a2 is a1.',
    arguments: [
      { name: 'a1', type: 'table', description: 'Source table' },
      { name: 'f', type: 'number', description: 'Start index in source table' },
      { name: 'e', type: 'number', description: 'End index in source table' },
      { name: 't', type: 'number', description: 'Start index in destination table' },
      {
        name: 'a2',
        type: 'table',
        description: 'Destination table',
        optional: true,
        defaultValue: 'a1',
      },
    ],
    returns: { type: 'table', description: 'The destination table a2' },
    examples: [
      {
        code: 'local t = {1, 2, 3, 4, 5}\ntable.move(t, 3, 5, 1)\nprint(table.concat(t, ", "))',
        output: '3, 4, 5, 4, 5',
        explanation: 'Moves elements at positions 3-5 to start at position 1',
      },
      {
        code: 'local src = {10, 20, 30}\nlocal dst = {}\ntable.move(src, 1, 3, 1, dst)\nprint(table.concat(dst, ", "))',
        output: '10, 20, 30',
        explanation: 'Copies elements from src into dst',
      },
    ],
    timeComplexity: 'O(e - f + 1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['table.insert', 'table.remove'],
    sinceVersion: 'Lua 5.3',
    notes: ['Handles overlapping moves correctly'],
  },
  {
    name: '# (length operator)',
    category: 'Table Functions',
    syntax: '#table',
    description:
      'Returns the length of a table. For a sequence (table with consecutive integer keys starting at 1), it returns the number of elements. The length operator is not a function but a unary operator.',
    arguments: [{ name: 'table', type: 'table', description: 'The table to get the length of' }],
    returns: { type: 'number', description: 'The length of the table (sequence part)' },
    examples: [
      {
        code: 'local t = {10, 20, 30, 40}\nprint(#t)',
        output: '4',
        explanation: 'Returns the number of elements in the sequence',
      },
      {
        code: 'local s = "Hello, Lua!"\nprint(#s)',
        output: '11',
        explanation: 'Also works on strings to return the byte length',
      },
    ],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['table.insert', 'table.remove', 'string.len'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'For tables with holes (non-consecutive keys), the result is undefined',
      'Also works on strings, returning the number of bytes',
    ],
  },

  // ============================================================
  // String Functions
  // ============================================================
  {
    name: 'string.find',
    category: 'String Functions',
    syntax: 'string.find(s, pattern [, init [, plain]])',
    description:
      'Looks for the first match of pattern in the string s. If found, returns the indices of s where the occurrence starts and ends; otherwise returns nil. If the pattern has captures, the captured values are also returned after the two indices.',
    arguments: [
      { name: 's', type: 'string', description: 'The string to search in' },
      { name: 'pattern', type: 'string', description: 'The pattern to search for' },
      {
        name: 'init',
        type: 'number',
        description: 'Starting position for the search',
        optional: true,
        defaultValue: '1',
      },
      {
        name: 'plain',
        type: 'boolean',
        description: 'If true, turns off pattern matching and does a plain find',
        optional: true,
        defaultValue: 'false',
      },
    ],
    returns: {
      type: 'number, number, ...string',
      description: 'Start index, end index, and any capture groups; or nil if not found',
    },
    examples: [
      {
        code: 'print(string.find("Hello Lua", "Lua"))',
        output: '7\t9',
        explanation: 'Finds "Lua" starting at position 7, ending at position 9',
      },
      {
        code: 'print(string.find("2023-12-25", "(%d+)-(%d+)-(%d+)"))',
        output: '1\t10\t2023\t12\t25',
        explanation: 'Returns positions and captured groups',
      },
    ],
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['string.match', 'string.gsub', 'string.gmatch'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Lua patterns are not regular expressions but a simpler pattern matching system',
      'Use the plain flag for literal string searches',
    ],
  },
  {
    name: 'string.gsub',
    category: 'String Functions',
    syntax: 'string.gsub(s, pattern, repl [, n])',
    description:
      'Returns a copy of s in which all (or the first n) occurrences of the pattern have been replaced by a replacement string repl, which can be a string, table, or function. Also returns the total number of matches as a second value.',
    arguments: [
      { name: 's', type: 'string', description: 'The source string' },
      { name: 'pattern', type: 'string', description: 'The pattern to match' },
      {
        name: 'repl',
        type: 'string | table | function',
        description: 'Replacement string, table, or function',
      },
      {
        name: 'n',
        type: 'number',
        description: 'Maximum number of substitutions',
        optional: true,
      },
    ],
    returns: {
      type: 'string, number',
      description: 'The modified string and the number of substitutions made',
    },
    examples: [
      {
        code: 'print(string.gsub("hello world", "(%w+)", "%1-%1"))',
        output: 'hello-hello world-world\t2',
        explanation: 'Duplicates each word with a dash separator',
      },
      {
        code: 'print(string.gsub("hello world", "world", "Lua"))',
        output: 'hello Lua\t1',
        explanation: 'Replaces "world" with "Lua"',
      },
    ],
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['string.find', 'string.match', 'string.sub'],
    sinceVersion: 'Lua 5.0',
    notes: [
      '%1, %2, etc. in the replacement string refer to captured groups',
      'If repl is a table, the first capture is used as the key',
      'If repl is a function, it is called for each match with captures as arguments',
    ],
  },
  {
    name: 'string.sub',
    category: 'String Functions',
    syntax: 'string.sub(s, i [, j])',
    description:
      'Returns the substring of s that starts at i and continues until j. i and j can be negative, counting from the end of the string. The default value for j is -1 (end of string).',
    arguments: [
      { name: 's', type: 'string', description: 'The source string' },
      {
        name: 'i',
        type: 'number',
        description: 'Start position (1-based, negative counts from end)',
      },
      {
        name: 'j',
        type: 'number',
        description: 'End position (inclusive)',
        optional: true,
        defaultValue: '-1',
      },
    ],
    returns: { type: 'string', description: 'The extracted substring' },
    examples: [
      {
        code: 'print(string.sub("Hello, Lua!", 8, 10))',
        output: 'Lua',
        explanation: 'Extracts characters from position 8 to 10',
      },
      {
        code: 'print(string.sub("Hello", -3))',
        output: 'llo',
        explanation: 'Extracts the last 3 characters using a negative index',
      },
    ],
    timeComplexity: 'O(j - i + 1)',
    spaceComplexity: 'O(j - i + 1)',
    relatedMethods: ['string.find', 'string.len'],
    sinceVersion: 'Lua 5.0',
    notes: ['Lua strings are 1-indexed', 'Negative indices count from the end of the string'],
  },
  {
    name: 'string.upper',
    category: 'String Functions',
    syntax: 'string.upper(s)',
    description:
      'Returns a copy of the string s with all lowercase letters changed to uppercase. The definition of what a lowercase letter is depends on the current locale.',
    arguments: [{ name: 's', type: 'string', description: 'The string to convert to uppercase' }],
    returns: { type: 'string', description: 'The uppercase version of the string' },
    examples: [
      {
        code: 'print(string.upper("hello lua"))',
        output: 'HELLO LUA',
        explanation: 'Converts all lowercase characters to uppercase',
      },
      {
        code: 'print(string.upper("Hello World 123"))',
        output: 'HELLO WORLD 123',
        explanation: 'Numbers and special characters remain unchanged',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['string.lower'],
    sinceVersion: 'Lua 5.0',
  },
  {
    name: 'string.lower',
    category: 'String Functions',
    syntax: 'string.lower(s)',
    description:
      'Returns a copy of the string s with all uppercase letters changed to lowercase. The definition of what an uppercase letter is depends on the current locale.',
    arguments: [{ name: 's', type: 'string', description: 'The string to convert to lowercase' }],
    returns: { type: 'string', description: 'The lowercase version of the string' },
    examples: [
      {
        code: 'print(string.lower("HELLO LUA"))',
        output: 'hello lua',
        explanation: 'Converts all uppercase characters to lowercase',
      },
      {
        code: 'print(string.lower("Hello World 123"))',
        output: 'hello world 123',
        explanation: 'Numbers and special characters remain unchanged',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['string.upper'],
    sinceVersion: 'Lua 5.0',
  },
  {
    name: 'string.format',
    category: 'String Functions',
    syntax: 'string.format(formatstring, ...)',
    description:
      'Returns a formatted version of its variable number of arguments following the description given in formatstring. Similar to the C sprintf function. Format directives include %d, %s, %f, %x, %q, and more.',
    arguments: [
      { name: 'formatstring', type: 'string', description: 'The format string with directives' },
      { name: '...', type: 'any', description: 'Values to format into the string' },
    ],
    returns: { type: 'string', description: 'The formatted string' },
    examples: [
      {
        code: 'print(string.format("Name: %s, Age: %d", "Lua", 30))',
        output: 'Name: Lua, Age: 30',
        explanation: '%s formats a string, %d formats an integer',
      },
      {
        code: 'print(string.format("Pi is approximately %.4f", 3.14159265))',
        output: 'Pi is approximately 3.1416',
        explanation: '%.4f formats a float with 4 decimal places',
      },
      {
        code: 'print(string.format("%02x %02x %02x", 255, 128, 0))',
        output: 'ff 80 00',
        explanation: '%02x formats as zero-padded two-digit hexadecimal',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['string.gsub', 'tostring'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Supports %d (integer), %f (float), %s (string), %q (quoted), %x (hex), %o (octal), %e (scientific), %% (literal %)',
    ],
  },

  // ============================================================
  // Math Functions
  // ============================================================
  {
    name: 'math.max',
    category: 'Math Functions',
    syntax: 'math.max(x, ...)',
    description:
      'Returns the argument with the maximum value, according to the Lua operator <. Requires at least one argument.',
    arguments: [
      { name: 'x', type: 'number', description: 'First number' },
      { name: '...', type: 'number', description: 'Additional numbers to compare' },
    ],
    returns: { type: 'number', description: 'The maximum value among the arguments' },
    examples: [
      {
        code: 'print(math.max(1, 5, 3, 9, 2))',
        output: '9',
        explanation: 'Returns the largest value among all arguments',
      },
      {
        code: 'print(math.max(-10, -5, -1))',
        output: '-1',
        explanation: 'Works correctly with negative numbers',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['math.min'],
    sinceVersion: 'Lua 5.0',
  },
  {
    name: 'math.min',
    category: 'Math Functions',
    syntax: 'math.min(x, ...)',
    description:
      'Returns the argument with the minimum value, according to the Lua operator <. Requires at least one argument.',
    arguments: [
      { name: 'x', type: 'number', description: 'First number' },
      { name: '...', type: 'number', description: 'Additional numbers to compare' },
    ],
    returns: { type: 'number', description: 'The minimum value among the arguments' },
    examples: [
      {
        code: 'print(math.min(1, 5, 3, 9, 2))',
        output: '1',
        explanation: 'Returns the smallest value among all arguments',
      },
      {
        code: 'print(math.min(-10, -5, -1))',
        output: '-10',
        explanation: 'Works correctly with negative numbers',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['math.max'],
    sinceVersion: 'Lua 5.0',
  },
  {
    name: 'math.floor',
    category: 'Math Functions',
    syntax: 'math.floor(x)',
    description:
      'Returns the largest integral value less than or equal to x (rounds towards negative infinity).',
    arguments: [{ name: 'x', type: 'number', description: 'The number to floor' }],
    returns: { type: 'number', description: 'The largest integer not greater than x' },
    examples: [
      {
        code: 'print(math.floor(3.7))',
        output: '3',
        explanation: 'Rounds 3.7 down to 3',
      },
      {
        code: 'print(math.floor(-2.3))',
        output: '-3',
        explanation: 'Rounds towards negative infinity, so -2.3 becomes -3',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['math.ceil', 'math.abs'],
    sinceVersion: 'Lua 5.0',
    notes: ['In Lua 5.3+, math.floor returns an integer type'],
  },
  {
    name: 'math.ceil',
    category: 'Math Functions',
    syntax: 'math.ceil(x)',
    description:
      'Returns the smallest integral value greater than or equal to x (rounds towards positive infinity).',
    arguments: [{ name: 'x', type: 'number', description: 'The number to ceil' }],
    returns: { type: 'number', description: 'The smallest integer not less than x' },
    examples: [
      {
        code: 'print(math.ceil(3.2))',
        output: '4',
        explanation: 'Rounds 3.2 up to 4',
      },
      {
        code: 'print(math.ceil(-2.7))',
        output: '-2',
        explanation: 'Rounds towards positive infinity, so -2.7 becomes -2',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['math.floor', 'math.abs'],
    sinceVersion: 'Lua 5.0',
    notes: ['In Lua 5.3+, math.ceil returns an integer type'],
  },
  {
    name: 'math.abs',
    category: 'Math Functions',
    syntax: 'math.abs(x)',
    description: 'Returns the absolute value of x. Works with both integers and floats.',
    arguments: [
      { name: 'x', type: 'number', description: 'The number to get the absolute value of' },
    ],
    returns: { type: 'number', description: 'The absolute value of x' },
    examples: [
      {
        code: 'print(math.abs(-42))',
        output: '42',
        explanation: 'Returns the positive value of a negative number',
      },
      {
        code: 'print(math.abs(3.14))',
        output: '3.14',
        explanation: 'Positive numbers remain unchanged',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['math.max', 'math.min'],
    sinceVersion: 'Lua 5.0',
  },
  {
    name: 'math.random',
    category: 'Math Functions',
    syntax: 'math.random([m [, n]])',
    description:
      'When called without arguments, returns a pseudo-random float in the range [0, 1). When called with one integer m, returns a pseudo-random integer in the range [1, m]. When called with two integers m and n, returns a pseudo-random integer in the range [m, n].',
    arguments: [
      {
        name: 'm',
        type: 'number',
        description: 'Upper bound (when used alone) or lower bound (when used with n)',
        optional: true,
      },
      {
        name: 'n',
        type: 'number',
        description: 'Upper bound when m is the lower bound',
        optional: true,
      },
    ],
    returns: { type: 'number', description: 'A pseudo-random number' },
    examples: [
      {
        code: 'math.randomseed(42)\nprint(math.random())',
        output: '0.37454012',
        explanation: 'Returns a pseudo-random float between 0 and 1',
      },
      {
        code: 'print(math.random(1, 6))',
        output: '3',
        explanation: 'Returns a pseudo-random integer between 1 and 6 (like a dice roll)',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['math.randomseed'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Call math.randomseed with a varying seed (like os.time()) for different sequences',
      'In Lua 5.4, math.random is automatically seeded with a reasonable value',
    ],
  },

  // ============================================================
  // I/O Functions
  // ============================================================
  {
    name: 'print',
    category: 'I/O Functions',
    syntax: 'print(...)',
    description:
      'Receives any number of arguments and prints their values to stdout, using the tostring function to convert each argument to a string. Arguments are separated by tabs and a newline is appended at the end.',
    arguments: [{ name: '...', type: 'any', description: 'Values to print' }],
    returns: { type: 'nil', description: 'Returns nothing' },
    examples: [
      {
        code: 'print("Hello", "World")',
        output: 'Hello\tWorld',
        explanation: 'Multiple arguments are separated by tabs',
      },
      {
        code: 'print(42, true, nil, "text")',
        output: '42\ttrue\tnil\ttext',
        explanation: 'Converts all types to strings using tostring',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['io.write', 'tostring'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Not intended for formatted output; use io.write or string.format instead',
      'Separates values with tabs, not spaces',
    ],
  },
  {
    name: 'io.open',
    category: 'I/O Functions',
    syntax: 'io.open(filename [, mode])',
    description:
      'Opens a file in the mode specified by the string mode. Returns a file handle, or nil plus an error message on failure. Mode strings include "r" (read), "w" (write), "a" (append), with optional "b" for binary mode.',
    arguments: [
      { name: 'filename', type: 'string', description: 'Path to the file to open' },
      {
        name: 'mode',
        type: 'string',
        description: 'File open mode ("r", "w", "a", "r+", "w+", "a+")',
        optional: true,
        defaultValue: '"r"',
      },
    ],
    returns: {
      type: 'file | nil, string',
      description: 'A file handle on success, or nil and an error message on failure',
    },
    examples: [
      {
        code: 'local f = io.open("data.txt", "r")\nif f then\n  local content = f:read("*a")\n  f:close()\n  print(content)\nend',
        output: '(contents of data.txt)',
        explanation: 'Opens a file for reading, reads all content, then closes it',
      },
      {
        code: 'local f = io.open("output.txt", "w")\nif f then\n  f:write("Hello, Lua!\\n")\n  f:close()\nend',
        output: '',
        explanation: 'Opens a file for writing and writes a string to it',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['io.read', 'io.write', 'io.close'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Always check the return value for nil to handle errors',
      'Always close file handles when done to avoid resource leaks',
    ],
  },
  {
    name: 'io.write',
    category: 'I/O Functions',
    syntax: 'io.write(...)',
    description:
      'Writes the value of each of its arguments to the default output file (stdout). Unlike print, io.write does not add tabs between arguments or a newline at the end, and it uses tostring on each argument.',
    arguments: [{ name: '...', type: 'string | number', description: 'Values to write to output' }],
    returns: {
      type: 'file | nil, string',
      description: 'The file handle on success, or nil and error message',
    },
    examples: [
      {
        code: 'io.write("Hello, ")\nio.write("World!\\n")',
        output: 'Hello, World!',
        explanation: 'Writes without automatic separators or newlines',
      },
      {
        code: 'io.write(string.format("Value: %d\\n", 42))',
        output: 'Value: 42',
        explanation: 'Commonly combined with string.format for formatted output',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['print', 'io.open', 'string.format'],
    sinceVersion: 'Lua 5.0',
    notes: ['Preferred over print for formatted output as it gives more control'],
  },

  // ============================================================
  // Type Functions
  // ============================================================
  {
    name: 'type',
    category: 'Type Functions',
    syntax: 'type(v)',
    description:
      'Returns the type of its only argument, coded as a string. The possible results are "nil", "number", "string", "boolean", "table", "function", "thread", and "userdata".',
    arguments: [{ name: 'v', type: 'any', description: 'The value to check the type of' }],
    returns: { type: 'string', description: 'The type name as a string' },
    examples: [
      {
        code: 'print(type(42))\nprint(type("hello"))\nprint(type(true))\nprint(type(nil))\nprint(type({}))\nprint(type(print))',
        output: 'number\nstring\nboolean\nnil\ntable\nfunction',
        explanation: 'Returns the type name for various Lua values',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['tonumber', 'tostring'],
    sinceVersion: 'Lua 5.0',
    notes: ['Always returns a string, even for nil values'],
  },
  {
    name: 'tonumber',
    category: 'Type Functions',
    syntax: 'tonumber(e [, base])',
    description:
      'Tries to convert its argument to a number. If the argument is already a number or a string convertible to a number, it returns that number; otherwise returns nil. An optional base (2 to 36) specifies how to interpret the string.',
    arguments: [
      { name: 'e', type: 'any', description: 'The value to convert to a number' },
      {
        name: 'base',
        type: 'number',
        description: 'The base for conversion (2 to 36)',
        optional: true,
        defaultValue: '10',
      },
    ],
    returns: {
      type: 'number | nil',
      description: 'The converted number, or nil if conversion fails',
    },
    examples: [
      {
        code: 'print(tonumber("42"))',
        output: '42',
        explanation: 'Converts a decimal string to a number',
      },
      {
        code: 'print(tonumber("ff", 16))',
        output: '255',
        explanation: 'Converts a hexadecimal string to a number',
      },
      {
        code: 'print(tonumber("hello"))',
        output: 'nil',
        explanation: 'Returns nil when the string cannot be converted',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['tostring', 'type'],
    sinceVersion: 'Lua 5.0',
    notes: ['Returns nil instead of raising an error on invalid input'],
  },
  {
    name: 'tostring',
    category: 'Type Functions',
    syntax: 'tostring(v)',
    description:
      'Receives a value of any type and converts it to a string in a human-readable format. If the metatable of v has a __tostring field, tostring calls that metamethod with v as argument and uses the result.',
    arguments: [{ name: 'v', type: 'any', description: 'The value to convert to a string' }],
    returns: { type: 'string', description: 'The string representation of the value' },
    examples: [
      {
        code: 'print(tostring(42))',
        output: '42',
        explanation: 'Converts a number to its string representation',
      },
      {
        code: 'print(tostring(true))',
        output: 'true',
        explanation: 'Converts a boolean to "true" or "false"',
      },
      {
        code: 'print(tostring(nil))',
        output: 'nil',
        explanation: 'Converts nil to the string "nil"',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['tonumber', 'string.format', 'type'],
    sinceVersion: 'Lua 5.0',
    notes: ['Tables are converted to "table: 0x..." unless a __tostring metamethod is defined'],
  },
  {
    name: 'pairs',
    category: 'Type Functions',
    syntax: 'pairs(t)',
    description:
      'Returns an iterator function, the table t, and nil, so that the construction "for k, v in pairs(t) do ... end" will iterate over all key-value pairs of table t. The order of traversal is not specified.',
    arguments: [{ name: 't', type: 'table', description: 'The table to iterate over' }],
    returns: {
      type: 'function, table, nil',
      description: 'An iterator function (next), the table, and nil as the initial key',
    },
    examples: [
      {
        code: 'local t = {name = "Lua", version = 5.4, fast = true}\nfor k, v in pairs(t) do\n  print(k, v)\nend',
        output: 'name\tLua\nversion\t5.4\nfast\ttrue',
        explanation: 'Iterates over all key-value pairs including non-integer keys',
      },
    ],
    timeComplexity: 'O(n) for full iteration',
    spaceComplexity: 'O(1)',
    relatedMethods: ['ipairs', 'next'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Iteration order is not guaranteed',
      'Iterates over all keys, including string keys and non-sequential integer keys',
      'Do not modify the table during iteration (except assigning nil to existing keys)',
    ],
  },
  {
    name: 'ipairs',
    category: 'Type Functions',
    syntax: 'ipairs(t)',
    description:
      'Returns an iterator function, the table t, and 0, so that the construction "for i, v in ipairs(t) do ... end" will iterate over the pairs (1, t[1]), (2, t[2]), ..., up to the first absent index.',
    arguments: [{ name: 't', type: 'table', description: 'The table (sequence) to iterate over' }],
    returns: {
      type: 'function, table, number',
      description: 'An iterator function, the table, and the initial index 0',
    },
    examples: [
      {
        code: 'local t = {"a", "b", "c", "d"}\nfor i, v in ipairs(t) do\n  print(i, v)\nend',
        output: '1\ta\n2\tb\n3\tc\n4\td',
        explanation: 'Iterates over the sequential integer-keyed elements in order',
      },
    ],
    timeComplexity: 'O(n) for full iteration',
    spaceComplexity: 'O(1)',
    relatedMethods: ['pairs', '# (length operator)'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Stops at the first nil value in the sequence',
      'Only iterates over integer keys starting from 1',
      'Use pairs() instead to iterate over non-sequential or string keys',
    ],
  },

  // ============================================================
  // Utility Functions
  // ============================================================
  {
    name: 'pcall',
    category: 'Utility Functions',
    syntax: 'pcall(f [, arg1, ...])',
    description:
      'Calls the function f with the given arguments in protected mode. Any error inside f is not propagated; instead, pcall catches the error and returns a status code. Returns true plus all results of the call on success, or false plus the error object on failure.',
    arguments: [
      { name: 'f', type: 'function', description: 'The function to call in protected mode' },
      { name: '...', type: 'any', description: 'Arguments to pass to the function' },
    ],
    returns: {
      type: 'boolean, ...',
      description: 'true plus return values on success, or false plus error message on failure',
    },
    examples: [
      {
        code: 'local ok, result = pcall(tonumber, "42")\nprint(ok, result)',
        output: 'true\t42',
        explanation: 'Successful call returns true and the function result',
      },
      {
        code: 'local ok, err = pcall(function()\n  error("something went wrong")\nend)\nprint(ok, err)',
        output: 'false\tinput:2: something went wrong',
        explanation: 'Failed call returns false and the error message',
      },
    ],
    timeComplexity: 'O(1) overhead plus the called function',
    spaceComplexity: 'O(1)',
    relatedMethods: ['xpcall', 'error'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Essential for error handling in Lua since there is no try/catch syntax',
      'The error object can be any Lua value, not just a string',
    ],
  },
  {
    name: 'xpcall',
    category: 'Utility Functions',
    syntax: 'xpcall(f, msgh [, arg1, ...])',
    description:
      'Similar to pcall, but sets msgh as the message handler. Any error inside f is not propagated; instead, xpcall calls the message handler with the original error object, allowing you to gather additional debug information (such as a traceback).',
    arguments: [
      { name: 'f', type: 'function', description: 'The function to call in protected mode' },
      {
        name: 'msgh',
        type: 'function',
        description: 'The message handler function, called with the error object',
      },
      { name: '...', type: 'any', description: 'Arguments to pass to the function f' },
    ],
    returns: {
      type: 'boolean, ...',
      description:
        'true plus return values on success, or false plus the handler result on failure',
    },
    examples: [
      {
        code: 'local ok, err = xpcall(function()\n  error("oops")\nend, debug.traceback)\nprint(ok)\nprint(err)',
        output: 'false\ninput:2: oops\\nstack traceback:\\n...',
        explanation: 'Uses debug.traceback as the error handler to get a full stack trace',
      },
      {
        code: 'local ok, msg = xpcall(function(x)\n  return x * 2\nend, debug.traceback, 21)\nprint(ok, msg)',
        output: 'true\t42',
        explanation: 'On success, returns true and the function result, handler is not called',
      },
    ],
    timeComplexity: 'O(1) overhead plus the called function',
    spaceComplexity: 'O(1)',
    relatedMethods: ['pcall', 'error', 'debug.traceback'],
    sinceVersion: 'Lua 5.1',
    notes: [
      'The message handler is called before the stack unwinds, so debug.traceback provides useful info',
      'In Lua 5.1, xpcall does not accept additional arguments for f; this was added in Lua 5.2',
    ],
  },
  {
    name: 'select',
    category: 'Utility Functions',
    syntax: 'select(index, ...)',
    description:
      'If index is a number, returns all arguments after argument number index. A negative number indexes from the end. If index is the string "#", returns the total number of extra arguments received.',
    arguments: [
      {
        name: 'index',
        type: 'number | string',
        description: 'The starting index or "#" to get count',
      },
      { name: '...', type: 'any', description: 'The arguments to select from' },
    ],
    returns: { type: 'any', description: 'Selected arguments or count when index is "#"' },
    examples: [
      {
        code: 'print(select(3, "a", "b", "c", "d", "e"))',
        output: 'c\td\te',
        explanation: 'Returns all arguments starting from position 3',
      },
      {
        code: 'print(select("#", "a", "b", "c"))',
        output: '3',
        explanation: 'Returns the total number of extra arguments',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['unpack', 'table.pack'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'Commonly used in variadic functions to process arguments',
      'select("#", ...) is the idiomatic way to count varargs',
    ],
  },
  {
    name: 'unpack',
    category: 'Utility Functions',
    syntax: 'table.unpack(list [, i [, j]])',
    description:
      'Returns the elements from the given list. It is equivalent to: return list[i], list[i+1], ..., list[j]. By default, i is 1 and j is #list. In Lua 5.1, this function is a global called unpack; in 5.2+ it is table.unpack.',
    arguments: [
      { name: 'list', type: 'table', description: 'The table to unpack' },
      {
        name: 'i',
        type: 'number',
        description: 'Start index',
        optional: true,
        defaultValue: '1',
      },
      {
        name: 'j',
        type: 'number',
        description: 'End index',
        optional: true,
        defaultValue: '#list',
      },
    ],
    returns: { type: '...', description: 'The elements of the table as separate return values' },
    examples: [
      {
        code: 'local t = {10, 20, 30}\nprint(table.unpack(t))',
        output: '10\t20\t30',
        explanation: 'Returns all elements of the table as separate values',
      },
      {
        code: 'local function sum(a, b, c) return a + b + c end\nlocal args = {1, 2, 3}\nprint(sum(table.unpack(args)))',
        output: '6',
        explanation: 'Unpacks a table to pass as function arguments',
      },
    ],
    timeComplexity: 'O(j - i + 1)',
    spaceComplexity: 'O(j - i + 1)',
    relatedMethods: ['table.pack', 'select'],
    sinceVersion: 'Lua 5.0',
    notes: [
      'In Lua 5.1 this is a global function called unpack',
      'In Lua 5.2+ it was moved to table.unpack',
      'Commonly used to pass table contents as function arguments',
    ],
  },
];

export default luaMethods;
