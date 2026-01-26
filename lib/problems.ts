import type { LanguageId, Method } from './types';

/**
 * Sample problems data for the quiz system
 * These are used to generate quiz questions
 */

export const javascriptMethods: Method[] = [
  // Array Methods
  {
    name: 'map',
    category: 'arrays',
    syntax: 'array.map(callback(element, index, array), thisArg)',
    description:
      'Creates a new array with the results of calling a provided function on every element',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Function to execute on each element' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true },
    ],
    returns: {
      type: 'Array',
      description: 'A new array with each element being the result of the callback',
    },
    examples: [
      {
        code: '[1, 2, 3].map(x => x * 2)',
        output: '[2, 4, 6]',
        explanation: 'Doubles each element',
      },
      {
        code: '["a", "b"].map(s => s.toUpperCase())',
        output: '["A", "B"]',
        explanation: 'Converts to uppercase',
      },
    ],
    relatedMethods: ['filter', 'reduce', 'forEach'],
  },
  {
    name: 'filter',
    category: 'arrays',
    syntax: 'array.filter(callback(element, index, array), thisArg)',
    description:
      'Creates a new array with all elements that pass the test implemented by the provided function',
    arguments: [
      {
        name: 'callback',
        type: 'Function',
        description: 'Test function to execute on each element',
      },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true },
    ],
    returns: { type: 'Array', description: 'A new array with elements that pass the test' },
    examples: [
      {
        code: '[1, 2, 3, 4, 5].filter(x => x > 3)',
        output: '[4, 5]',
        explanation: 'Keeps elements greater than 3',
      },
      {
        code: '["apple", "banana", "cherry"].filter(s => s.length > 5)',
        output: '["banana", "cherry"]',
        explanation: 'Keeps strings longer than 5 chars',
      },
    ],
    relatedMethods: ['map', 'find', 'some'],
  },
  {
    name: 'reduce',
    category: 'arrays',
    syntax: 'array.reduce(callback(accumulator, currentValue, index, array), initialValue)',
    description: 'Executes a reducer function on each element, resulting in a single output value',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Reducer function to execute' },
      {
        name: 'initialValue',
        type: 'any',
        description: 'Initial value for accumulator',
        optional: true,
      },
    ],
    returns: { type: 'any', description: 'The single value that results from the reduction' },
    examples: [
      {
        code: '[1, 2, 3, 4].reduce((acc, x) => acc + x, 0)',
        output: '10',
        explanation: 'Sums all elements',
      },
      {
        code: '[[1, 2], [3, 4]].reduce((acc, x) => acc.concat(x), [])',
        output: '[1, 2, 3, 4]',
        explanation: 'Flattens nested arrays',
      },
    ],
    relatedMethods: ['reduceRight', 'map', 'filter'],
  },
  {
    name: 'find',
    category: 'arrays',
    syntax: 'array.find(callback(element, index, array), thisArg)',
    description:
      'Returns the first element in the array that satisfies the provided testing function',
    arguments: [
      {
        name: 'callback',
        type: 'Function',
        description: 'Test function to execute on each element',
      },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true },
    ],
    returns: { type: 'any', description: 'The first element that passes the test, or undefined' },
    examples: [
      {
        code: '[1, 5, 10, 15].find(x => x > 8)',
        output: '10',
        explanation: 'Finds first element > 8',
      },
      {
        code: '[{id: 1}, {id: 2}].find(obj => obj.id === 2)',
        output: '{id: 2}',
        explanation: 'Finds object by property',
      },
    ],
    relatedMethods: ['findIndex', 'filter', 'some'],
  },
  {
    name: 'findIndex',
    category: 'arrays',
    syntax: 'array.findIndex(callback(element, index, array), thisArg)',
    description:
      'Returns the index of the first element that satisfies the provided testing function',
    arguments: [
      {
        name: 'callback',
        type: 'Function',
        description: 'Test function to execute on each element',
      },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true },
    ],
    returns: { type: 'number', description: 'The index of the first matching element, or -1' },
    examples: [
      {
        code: '[1, 5, 10, 15].findIndex(x => x > 8)',
        output: '2',
        explanation: 'Returns index of first element > 8',
      },
      {
        code: '["a", "b", "c"].findIndex(s => s === "b")',
        output: '1',
        explanation: 'Returns index of "b"',
      },
    ],
    relatedMethods: ['find', 'indexOf', 'includes'],
  },
  {
    name: 'some',
    category: 'arrays',
    syntax: 'array.some(callback(element, index, array), thisArg)',
    description: 'Tests whether at least one element in the array passes the test',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Test function to execute' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true },
    ],
    returns: { type: 'boolean', description: 'true if at least one element passes the test' },
    examples: [
      {
        code: '[1, 2, 3].some(x => x > 2)',
        output: 'true',
        explanation: 'Returns true because 3 > 2',
      },
      {
        code: '[1, 2, 3].some(x => x > 5)',
        output: 'false',
        explanation: 'Returns false, no element > 5',
      },
    ],
    relatedMethods: ['every', 'find', 'filter'],
  },
  {
    name: 'every',
    category: 'arrays',
    syntax: 'array.every(callback(element, index, array), thisArg)',
    description:
      'Tests whether all elements in the array pass the test implemented by the provided function',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Test function to execute' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true },
    ],
    returns: { type: 'boolean', description: 'true if all elements pass the test' },
    examples: [
      {
        code: '[2, 4, 6].every(x => x % 2 === 0)',
        output: 'true',
        explanation: 'All elements are even',
      },
      { code: '[2, 3, 4].every(x => x % 2 === 0)', output: 'false', explanation: '3 is not even' },
    ],
    relatedMethods: ['some', 'filter', 'find'],
  },
  {
    name: 'includes',
    category: 'arrays',
    syntax: 'array.includes(searchElement, fromIndex)',
    description: 'Determines whether an array includes a certain value among its entries',
    arguments: [
      { name: 'searchElement', type: 'any', description: 'The value to search for' },
      {
        name: 'fromIndex',
        type: 'number',
        description: 'Index to start search from',
        optional: true,
      },
    ],
    returns: { type: 'boolean', description: 'true if the value is found' },
    examples: [
      { code: '[1, 2, 3].includes(2)', output: 'true', explanation: 'Array contains 2' },
      {
        code: '["a", "b", "c"].includes("d")',
        output: 'false',
        explanation: 'Array does not contain "d"',
      },
    ],
    relatedMethods: ['indexOf', 'find', 'some'],
  },
  {
    name: 'indexOf',
    category: 'arrays',
    syntax: 'array.indexOf(searchElement, fromIndex)',
    description:
      'Returns the first index at which a given element can be found, or -1 if not present',
    arguments: [
      { name: 'searchElement', type: 'any', description: 'Element to locate' },
      {
        name: 'fromIndex',
        type: 'number',
        description: 'Index to start search from',
        optional: true,
      },
    ],
    returns: { type: 'number', description: 'The first index of the element, or -1' },
    examples: [
      { code: '["a", "b", "c"].indexOf("b")', output: '1', explanation: '"b" is at index 1' },
      {
        code: '[1, 2, 3, 2].indexOf(2)',
        output: '1',
        explanation: 'First occurrence of 2 is at index 1',
      },
    ],
    relatedMethods: ['lastIndexOf', 'includes', 'findIndex'],
  },
  {
    name: 'slice',
    category: 'arrays',
    syntax: 'array.slice(start, end)',
    description: 'Returns a shallow copy of a portion of an array into a new array',
    arguments: [
      { name: 'start', type: 'number', description: 'Start index (inclusive)', optional: true },
      { name: 'end', type: 'number', description: 'End index (exclusive)', optional: true },
    ],
    returns: { type: 'Array', description: 'A new array containing the extracted elements' },
    examples: [
      {
        code: '[1, 2, 3, 4, 5].slice(1, 4)',
        output: '[2, 3, 4]',
        explanation: 'Extracts from index 1 to 3',
      },
      {
        code: '[1, 2, 3, 4, 5].slice(-2)',
        output: '[4, 5]',
        explanation: 'Extracts last 2 elements',
      },
    ],
    relatedMethods: ['splice', 'concat', 'substring'],
  },
  {
    name: 'splice',
    category: 'arrays',
    syntax: 'array.splice(start, deleteCount, item1, item2, ...)',
    description:
      'Changes the contents of an array by removing or replacing elements and/or adding new elements',
    arguments: [
      { name: 'start', type: 'number', description: 'Index to start changing the array' },
      {
        name: 'deleteCount',
        type: 'number',
        description: 'Number of elements to remove',
        optional: true,
      },
      { name: 'items', type: 'any', description: 'Elements to add', optional: true },
    ],
    returns: { type: 'Array', description: 'An array containing the deleted elements' },
    examples: [
      {
        code: '[1, 2, 3, 4].splice(1, 2)',
        output: '[2, 3]',
        explanation: 'Removes 2 elements starting at index 1',
      },
      {
        code: 'const arr = [1, 4]; arr.splice(1, 0, 2, 3); arr',
        output: '[1, 2, 3, 4]',
        explanation: 'Inserts elements',
      },
    ],
    relatedMethods: ['slice', 'push', 'pop'],
  },
  {
    name: 'concat',
    category: 'arrays',
    syntax: 'array.concat(value1, value2, ...)',
    description: 'Merges two or more arrays or values into a new array',
    arguments: [{ name: 'values', type: 'any', description: 'Arrays or values to concatenate' }],
    returns: { type: 'Array', description: 'A new array with all elements combined' },
    examples: [
      {
        code: '[1, 2].concat([3, 4])',
        output: '[1, 2, 3, 4]',
        explanation: 'Concatenates two arrays',
      },
      {
        code: '[1].concat(2, [3, 4])',
        output: '[1, 2, 3, 4]',
        explanation: 'Concatenates value and array',
      },
    ],
    relatedMethods: ['push', 'spread operator', 'join'],
  },
  {
    name: 'join',
    category: 'arrays',
    syntax: 'array.join(separator)',
    description:
      'Joins all elements of an array into a string, separated by the specified separator',
    arguments: [
      {
        name: 'separator',
        type: 'string',
        description: 'String to separate elements',
        optional: true,
      },
    ],
    returns: { type: 'string', description: 'A string with all array elements joined' },
    examples: [
      { code: '["a", "b", "c"].join("-")', output: '"a-b-c"', explanation: 'Joins with hyphen' },
      { code: '[1, 2, 3].join("")', output: '"123"', explanation: 'Joins without separator' },
    ],
    relatedMethods: ['split', 'toString', 'concat'],
  },
  {
    name: 'reverse',
    category: 'arrays',
    syntax: 'array.reverse()',
    description: 'Reverses an array in place and returns the reversed array',
    arguments: [],
    returns: { type: 'Array', description: 'The reversed array (same reference)' },
    examples: [
      { code: '[1, 2, 3].reverse()', output: '[3, 2, 1]', explanation: 'Reverses the array' },
      {
        code: '["a", "b", "c"].reverse()',
        output: '["c", "b", "a"]',
        explanation: 'Reverses string array',
      },
    ],
    relatedMethods: ['sort', 'toReversed'],
  },
  {
    name: 'sort',
    category: 'arrays',
    syntax: 'array.sort(compareFunction)',
    description: 'Sorts the elements of an array in place and returns the sorted array',
    arguments: [
      {
        name: 'compareFunction',
        type: 'Function',
        description: 'Function that defines the sort order',
        optional: true,
      },
    ],
    returns: { type: 'Array', description: 'The sorted array (same reference)' },
    examples: [
      {
        code: '[3, 1, 2].sort()',
        output: '[1, 2, 3]',
        explanation: 'Default sort (string conversion)',
      },
      {
        code: '[3, 1, 2].sort((a, b) => b - a)',
        output: '[3, 2, 1]',
        explanation: 'Descending numeric sort',
      },
    ],
    relatedMethods: ['reverse', 'toSorted'],
  },
  {
    name: 'flat',
    category: 'arrays',
    syntax: 'array.flat(depth)',
    description:
      'Creates a new array with all sub-array elements concatenated up to the specified depth',
    arguments: [
      {
        name: 'depth',
        type: 'number',
        description: 'How deep to flatten (default: 1)',
        optional: true,
      },
    ],
    returns: { type: 'Array', description: 'A new flattened array' },
    examples: [
      {
        code: '[[1, 2], [3, 4]].flat()',
        output: '[1, 2, 3, 4]',
        explanation: 'Flattens one level',
      },
      {
        code: '[1, [2, [3, [4]]]].flat(2)',
        output: '[1, 2, 3, [4]]',
        explanation: 'Flattens two levels',
      },
    ],
    relatedMethods: ['flatMap', 'concat', 'reduce'],
  },
  {
    name: 'flatMap',
    category: 'arrays',
    syntax: 'array.flatMap(callback(element, index, array), thisArg)',
    description: 'Maps each element using a function, then flattens the result into a new array',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Function to execute on each element' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true },
    ],
    returns: { type: 'Array', description: 'A new flattened array' },
    examples: [
      {
        code: '[1, 2].flatMap(x => [x, x * 2])',
        output: '[1, 2, 2, 4]',
        explanation: 'Maps and flattens',
      },
      {
        code: '["hello world"].flatMap(s => s.split(" "))',
        output: '["hello", "world"]',
        explanation: 'Splits and flattens',
      },
    ],
    relatedMethods: ['flat', 'map', 'reduce'],
  },
  {
    name: 'fill',
    category: 'arrays',
    syntax: 'array.fill(value, start, end)',
    description: 'Fills all the elements of an array with a static value',
    arguments: [
      { name: 'value', type: 'any', description: 'Value to fill the array with' },
      { name: 'start', type: 'number', description: 'Start index', optional: true },
      { name: 'end', type: 'number', description: 'End index', optional: true },
    ],
    returns: { type: 'Array', description: 'The modified array' },
    examples: [
      { code: '[1, 2, 3].fill(0)', output: '[0, 0, 0]', explanation: 'Fills entire array with 0' },
      {
        code: '[1, 2, 3, 4].fill(0, 1, 3)',
        output: '[1, 0, 0, 4]',
        explanation: 'Fills from index 1 to 2',
      },
    ],
    relatedMethods: ['copyWithin', 'Array.from'],
  },
  // String Methods
  {
    name: 'split',
    category: 'strings',
    syntax: 'string.split(separator, limit)',
    description: 'Divides a string into an ordered list of substrings and returns them as an array',
    arguments: [
      { name: 'separator', type: 'string | RegExp', description: 'Pattern to split by' },
      { name: 'limit', type: 'number', description: 'Maximum number of splits', optional: true },
    ],
    returns: { type: 'Array<string>', description: 'An array of strings' },
    examples: [
      { code: '"a-b-c".split("-")', output: '["a", "b", "c"]', explanation: 'Splits by hyphen' },
      {
        code: '"hello".split("")',
        output: '["h", "e", "l", "l", "o"]',
        explanation: 'Splits into characters',
      },
    ],
    relatedMethods: ['join', 'slice', 'substring'],
  },
  {
    name: 'substring',
    category: 'strings',
    syntax: 'string.substring(start, end)',
    description: 'Returns the part of the string between the start and end indexes',
    arguments: [
      { name: 'start', type: 'number', description: 'Index of first character to include' },
      {
        name: 'end',
        type: 'number',
        description: 'Index of first character to exclude',
        optional: true,
      },
    ],
    returns: { type: 'string', description: 'A new string containing the specified part' },
    examples: [
      {
        code: '"hello world".substring(0, 5)',
        output: '"hello"',
        explanation: 'Extracts first 5 characters',
      },
      {
        code: '"hello world".substring(6)',
        output: '"world"',
        explanation: 'Extracts from index 6 to end',
      },
    ],
    relatedMethods: ['slice', 'substr', 'split'],
  },
  {
    name: 'toLowerCase',
    category: 'strings',
    syntax: 'string.toLowerCase()',
    description: 'Returns the string converted to lowercase',
    arguments: [],
    returns: { type: 'string', description: 'A new string in lowercase' },
    examples: [
      { code: '"HELLO".toLowerCase()', output: '"hello"', explanation: 'Converts to lowercase' },
      {
        code: '"HeLLo WoRLd".toLowerCase()',
        output: '"hello world"',
        explanation: 'Normalizes case',
      },
    ],
    relatedMethods: ['toUpperCase', 'toLocaleLowerCase'],
  },
  {
    name: 'toUpperCase',
    category: 'strings',
    syntax: 'string.toUpperCase()',
    description: 'Returns the string converted to uppercase',
    arguments: [],
    returns: { type: 'string', description: 'A new string in uppercase' },
    examples: [
      { code: '"hello".toUpperCase()', output: '"HELLO"', explanation: 'Converts to uppercase' },
      {
        code: '"Hello World".toUpperCase()',
        output: '"HELLO WORLD"',
        explanation: 'Converts entire string',
      },
    ],
    relatedMethods: ['toLowerCase', 'toLocaleUpperCase'],
  },
  {
    name: 'trim',
    category: 'strings',
    syntax: 'string.trim()',
    description: 'Removes whitespace from both ends of the string',
    arguments: [],
    returns: { type: 'string', description: 'A new string with whitespace removed from both ends' },
    examples: [
      {
        code: '"  hello  ".trim()',
        output: '"hello"',
        explanation: 'Removes leading and trailing spaces',
      },
      {
        code: '"\\n\\thello\\n\\t".trim()',
        output: '"hello"',
        explanation: 'Removes all whitespace types',
      },
    ],
    relatedMethods: ['trimStart', 'trimEnd'],
  },
  {
    name: 'replace',
    category: 'strings',
    syntax: 'string.replace(pattern, replacement)',
    description: 'Returns a new string with some or all matches of a pattern replaced',
    arguments: [
      { name: 'pattern', type: 'string | RegExp', description: 'Pattern to search for' },
      {
        name: 'replacement',
        type: 'string | Function',
        description: 'Replacement string or function',
      },
    ],
    returns: { type: 'string', description: 'A new string with replacements made' },
    examples: [
      {
        code: '"hello world".replace("world", "there")',
        output: '"hello there"',
        explanation: 'Replaces first match',
      },
      {
        code: '"aaa".replace(/a/g, "b")',
        output: '"bbb"',
        explanation: 'Replaces all matches with regex',
      },
    ],
    relatedMethods: ['replaceAll', 'match', 'search'],
  },
  {
    name: 'replaceAll',
    category: 'strings',
    syntax: 'string.replaceAll(pattern, replacement)',
    description: 'Returns a new string with all matches of a pattern replaced',
    arguments: [
      { name: 'pattern', type: 'string | RegExp', description: 'Pattern to search for' },
      {
        name: 'replacement',
        type: 'string | Function',
        description: 'Replacement string or function',
      },
    ],
    returns: { type: 'string', description: 'A new string with all replacements made' },
    examples: [
      {
        code: '"aaa".replaceAll("a", "b")',
        output: '"bbb"',
        explanation: 'Replaces all occurrences',
      },
      {
        code: '"hello-world-test".replaceAll("-", "_")',
        output: '"hello_world_test"',
        explanation: 'Replaces all hyphens',
      },
    ],
    relatedMethods: ['replace', 'split', 'join'],
  },
  {
    name: 'startsWith',
    category: 'strings',
    syntax: 'string.startsWith(searchString, position)',
    description: 'Determines whether a string begins with the characters of a specified string',
    arguments: [
      { name: 'searchString', type: 'string', description: 'Characters to search for' },
      {
        name: 'position',
        type: 'number',
        description: 'Position to start search from',
        optional: true,
      },
    ],
    returns: { type: 'boolean', description: 'true if string starts with the search string' },
    examples: [
      {
        code: '"hello world".startsWith("hello")',
        output: 'true',
        explanation: 'Starts with "hello"',
      },
      {
        code: '"hello world".startsWith("world")',
        output: 'false',
        explanation: 'Does not start with "world"',
      },
    ],
    relatedMethods: ['endsWith', 'includes', 'indexOf'],
  },
  {
    name: 'endsWith',
    category: 'strings',
    syntax: 'string.endsWith(searchString, length)',
    description: 'Determines whether a string ends with the characters of a specified string',
    arguments: [
      { name: 'searchString', type: 'string', description: 'Characters to search for' },
      {
        name: 'length',
        type: 'number',
        description: 'Length of string to search within',
        optional: true,
      },
    ],
    returns: { type: 'boolean', description: 'true if string ends with the search string' },
    examples: [
      { code: '"hello world".endsWith("world")', output: 'true', explanation: 'Ends with "world"' },
      {
        code: '"hello world".endsWith("hello")',
        output: 'false',
        explanation: 'Does not end with "hello"',
      },
    ],
    relatedMethods: ['startsWith', 'includes', 'lastIndexOf'],
  },
  {
    name: 'padStart',
    category: 'strings',
    syntax: 'string.padStart(targetLength, padString)',
    description:
      'Pads the current string from the start with another string until the target length is reached',
    arguments: [
      {
        name: 'targetLength',
        type: 'number',
        description: 'Target length of the resulting string',
      },
      { name: 'padString', type: 'string', description: 'String to pad with', optional: true },
    ],
    returns: { type: 'string', description: 'A new padded string' },
    examples: [
      { code: '"5".padStart(3, "0")', output: '"005"', explanation: 'Pads with zeros' },
      { code: '"abc".padStart(6, "123")', output: '"123abc"', explanation: 'Pads with "123"' },
    ],
    relatedMethods: ['padEnd', 'repeat'],
  },
  {
    name: 'padEnd',
    category: 'strings',
    syntax: 'string.padEnd(targetLength, padString)',
    description:
      'Pads the current string from the end with another string until the target length is reached',
    arguments: [
      {
        name: 'targetLength',
        type: 'number',
        description: 'Target length of the resulting string',
      },
      { name: 'padString', type: 'string', description: 'String to pad with', optional: true },
    ],
    returns: { type: 'string', description: 'A new padded string' },
    examples: [
      { code: '"5".padEnd(3, "0")', output: '"500"', explanation: 'Pads with zeros at end' },
      { code: '"abc".padEnd(6, "123")', output: '"abc123"', explanation: 'Pads with "123" at end' },
    ],
    relatedMethods: ['padStart', 'repeat'],
  },
  {
    name: 'repeat',
    category: 'strings',
    syntax: 'string.repeat(count)',
    description: 'Returns a new string consisting of the specified number of copies of the string',
    arguments: [{ name: 'count', type: 'number', description: 'Number of times to repeat' }],
    returns: { type: 'string', description: 'A new repeated string' },
    examples: [
      { code: '"abc".repeat(3)', output: '"abcabcabc"', explanation: 'Repeats 3 times' },
      { code: '"*".repeat(5)', output: '"*****"', explanation: 'Creates 5 asterisks' },
    ],
    relatedMethods: ['padStart', 'padEnd', 'concat'],
  },
  {
    name: 'charAt',
    category: 'strings',
    syntax: 'string.charAt(index)',
    description: 'Returns the character at the specified index',
    arguments: [{ name: 'index', type: 'number', description: 'Index of the character' }],
    returns: { type: 'string', description: 'The character at the index, or empty string' },
    examples: [
      { code: '"hello".charAt(1)', output: '"e"', explanation: 'Returns character at index 1' },
      { code: '"hello".charAt(0)', output: '"h"', explanation: 'Returns first character' },
    ],
    relatedMethods: ['charCodeAt', 'at', 'indexOf'],
  },
  // Object Methods
  {
    name: 'Object.keys',
    category: 'objects',
    syntax: 'Object.keys(obj)',
    description: "Returns an array of a given object's own enumerable string-keyed property names",
    arguments: [{ name: 'obj', type: 'object', description: 'The object to get keys from' }],
    returns: { type: 'Array<string>', description: 'An array of property names' },
    examples: [
      { code: 'Object.keys({a: 1, b: 2})', output: '["a", "b"]', explanation: 'Gets object keys' },
      {
        code: 'Object.keys([1, 2, 3])',
        output: '["0", "1", "2"]',
        explanation: 'Gets array indices as strings',
      },
    ],
    relatedMethods: ['Object.values', 'Object.entries', 'Object.getOwnPropertyNames'],
  },
  {
    name: 'Object.values',
    category: 'objects',
    syntax: 'Object.values(obj)',
    description: "Returns an array of a given object's own enumerable property values",
    arguments: [{ name: 'obj', type: 'object', description: 'The object to get values from' }],
    returns: { type: 'Array', description: 'An array of property values' },
    examples: [
      { code: 'Object.values({a: 1, b: 2})', output: '[1, 2]', explanation: 'Gets object values' },
      {
        code: 'Object.values({name: "John", age: 30})',
        output: '["John", 30]',
        explanation: 'Gets mixed type values',
      },
    ],
    relatedMethods: ['Object.keys', 'Object.entries', 'Object.fromEntries'],
  },
  {
    name: 'Object.entries',
    category: 'objects',
    syntax: 'Object.entries(obj)',
    description:
      "Returns an array of a given object's own enumerable string-keyed property [key, value] pairs",
    arguments: [{ name: 'obj', type: 'object', description: 'The object to get entries from' }],
    returns: { type: 'Array<[string, any]>', description: 'An array of [key, value] pairs' },
    examples: [
      {
        code: 'Object.entries({a: 1, b: 2})',
        output: '[["a", 1], ["b", 2]]',
        explanation: 'Gets key-value pairs',
      },
      {
        code: 'Object.entries({x: "hello"})',
        output: '[["x", "hello"]]',
        explanation: 'Single entry',
      },
    ],
    relatedMethods: ['Object.keys', 'Object.values', 'Object.fromEntries'],
  },
  {
    name: 'Object.assign',
    category: 'objects',
    syntax: 'Object.assign(target, ...sources)',
    description:
      'Copies all enumerable own properties from one or more source objects to a target object',
    arguments: [
      { name: 'target', type: 'object', description: 'The target object to copy to' },
      { name: 'sources', type: 'object', description: 'The source objects to copy from' },
    ],
    returns: { type: 'object', description: 'The modified target object' },
    examples: [
      {
        code: 'Object.assign({a: 1}, {b: 2})',
        output: '{a: 1, b: 2}',
        explanation: 'Merges objects',
      },
      {
        code: 'Object.assign({}, {a: 1}, {a: 2})',
        output: '{a: 2}',
        explanation: 'Later values override',
      },
    ],
    relatedMethods: ['spread operator', 'Object.fromEntries'],
  },
  {
    name: 'Object.fromEntries',
    category: 'objects',
    syntax: 'Object.fromEntries(iterable)',
    description: 'Transforms a list of key-value pairs into an object',
    arguments: [{ name: 'iterable', type: 'Iterable', description: 'Iterable of key-value pairs' }],
    returns: { type: 'object', description: 'A new object' },
    examples: [
      {
        code: 'Object.fromEntries([["a", 1], ["b", 2]])',
        output: '{a: 1, b: 2}',
        explanation: 'Creates object from entries',
      },
      {
        code: 'Object.fromEntries(new Map([["key", "value"]]))',
        output: '{key: "value"}',
        explanation: 'Converts Map to object',
      },
    ],
    relatedMethods: ['Object.entries', 'Map', 'Object.assign'],
  },
  // Number/Math Methods
  {
    name: 'Math.max',
    category: 'math',
    syntax: 'Math.max(value1, value2, ...)',
    description: 'Returns the largest of the given numbers',
    arguments: [{ name: 'values', type: 'number', description: 'Numbers to compare' }],
    returns: { type: 'number', description: 'The largest number' },
    examples: [
      { code: 'Math.max(1, 5, 3)', output: '5', explanation: 'Returns largest of 1, 5, 3' },
      { code: 'Math.max(...[1, 2, 3])', output: '3', explanation: 'Works with spread array' },
    ],
    relatedMethods: ['Math.min', 'Math.abs'],
  },
  {
    name: 'Math.min',
    category: 'math',
    syntax: 'Math.min(value1, value2, ...)',
    description: 'Returns the smallest of the given numbers',
    arguments: [{ name: 'values', type: 'number', description: 'Numbers to compare' }],
    returns: { type: 'number', description: 'The smallest number' },
    examples: [
      { code: 'Math.min(1, 5, 3)', output: '1', explanation: 'Returns smallest of 1, 5, 3' },
      { code: 'Math.min(...[4, 2, 8])', output: '2', explanation: 'Works with spread array' },
    ],
    relatedMethods: ['Math.max', 'Math.abs'],
  },
  {
    name: 'Math.floor',
    category: 'math',
    syntax: 'Math.floor(x)',
    description: 'Returns the largest integer less than or equal to a given number',
    arguments: [{ name: 'x', type: 'number', description: 'A number' }],
    returns: { type: 'number', description: 'The largest integer <= x' },
    examples: [
      { code: 'Math.floor(4.7)', output: '4', explanation: 'Rounds down to 4' },
      { code: 'Math.floor(-4.1)', output: '-5', explanation: 'Rounds down to -5' },
    ],
    relatedMethods: ['Math.ceil', 'Math.round', 'Math.trunc'],
  },
  {
    name: 'Math.ceil',
    category: 'math',
    syntax: 'Math.ceil(x)',
    description: 'Returns the smallest integer greater than or equal to a given number',
    arguments: [{ name: 'x', type: 'number', description: 'A number' }],
    returns: { type: 'number', description: 'The smallest integer >= x' },
    examples: [
      { code: 'Math.ceil(4.1)', output: '5', explanation: 'Rounds up to 5' },
      { code: 'Math.ceil(-4.7)', output: '-4', explanation: 'Rounds up to -4' },
    ],
    relatedMethods: ['Math.floor', 'Math.round', 'Math.trunc'],
  },
  {
    name: 'Math.round',
    category: 'math',
    syntax: 'Math.round(x)',
    description: 'Returns the value of a number rounded to the nearest integer',
    arguments: [{ name: 'x', type: 'number', description: 'A number' }],
    returns: { type: 'number', description: 'The nearest integer' },
    examples: [
      { code: 'Math.round(4.5)', output: '5', explanation: 'Rounds up at .5' },
      { code: 'Math.round(4.4)', output: '4', explanation: 'Rounds down below .5' },
    ],
    relatedMethods: ['Math.floor', 'Math.ceil', 'Math.trunc'],
  },
  {
    name: 'Math.abs',
    category: 'math',
    syntax: 'Math.abs(x)',
    description: 'Returns the absolute value of a number',
    arguments: [{ name: 'x', type: 'number', description: 'A number' }],
    returns: { type: 'number', description: 'The absolute value of x' },
    examples: [
      { code: 'Math.abs(-5)', output: '5', explanation: 'Returns positive value' },
      { code: 'Math.abs(5)', output: '5', explanation: 'Positive stays positive' },
    ],
    relatedMethods: ['Math.sign', 'Math.max', 'Math.min'],
  },
  {
    name: 'Math.pow',
    category: 'math',
    syntax: 'Math.pow(base, exponent)',
    description: 'Returns the base to the exponent power',
    arguments: [
      { name: 'base', type: 'number', description: 'The base number' },
      { name: 'exponent', type: 'number', description: 'The exponent' },
    ],
    returns: { type: 'number', description: 'base raised to the power of exponent' },
    examples: [
      { code: 'Math.pow(2, 3)', output: '8', explanation: '2 to the power of 3' },
      { code: 'Math.pow(4, 0.5)', output: '2', explanation: 'Square root of 4' },
    ],
    relatedMethods: ['Math.sqrt', 'Math.cbrt', '** operator'],
  },
  {
    name: 'Math.sqrt',
    category: 'math',
    syntax: 'Math.sqrt(x)',
    description: 'Returns the square root of a number',
    arguments: [{ name: 'x', type: 'number', description: 'A non-negative number' }],
    returns: { type: 'number', description: 'The square root of x' },
    examples: [
      { code: 'Math.sqrt(16)', output: '4', explanation: 'Square root of 16' },
      { code: 'Math.sqrt(2)', output: '1.4142135623730951', explanation: 'Square root of 2' },
    ],
    relatedMethods: ['Math.pow', 'Math.cbrt'],
  },
  {
    name: 'Number.parseInt',
    category: 'numbers',
    syntax: 'Number.parseInt(string, radix)',
    description: 'Parses a string argument and returns an integer of the specified radix',
    arguments: [
      { name: 'string', type: 'string', description: 'The string to parse' },
      {
        name: 'radix',
        type: 'number',
        description: 'Base of the numeral system (2-36)',
        optional: true,
      },
    ],
    returns: { type: 'number', description: 'An integer, or NaN' },
    examples: [
      { code: 'Number.parseInt("42")', output: '42', explanation: 'Parses integer string' },
      { code: 'Number.parseInt("1010", 2)', output: '10', explanation: 'Parses binary string' },
    ],
    relatedMethods: ['Number.parseFloat', 'Number.isInteger'],
  },
  {
    name: 'Number.isNaN',
    category: 'numbers',
    syntax: 'Number.isNaN(value)',
    description: 'Determines whether the passed value is NaN',
    arguments: [{ name: 'value', type: 'any', description: 'The value to test' }],
    returns: { type: 'boolean', description: 'true if value is NaN' },
    examples: [
      { code: 'Number.isNaN(NaN)', output: 'true', explanation: 'NaN is NaN' },
      {
        code: 'Number.isNaN("hello")',
        output: 'false',
        explanation: 'String is not NaN (different from global isNaN)',
      },
    ],
    relatedMethods: ['Number.isFinite', 'Number.isInteger'],
  },
  {
    name: 'toFixed',
    category: 'numbers',
    syntax: 'number.toFixed(digits)',
    description: 'Formats a number using fixed-point notation',
    arguments: [
      {
        name: 'digits',
        type: 'number',
        description: 'Number of digits after decimal point',
        optional: true,
      },
    ],
    returns: { type: 'string', description: 'A string representation of the number' },
    examples: [
      { code: '(3.14159).toFixed(2)', output: '"3.14"', explanation: 'Rounds to 2 decimal places' },
      { code: '(5).toFixed(2)', output: '"5.00"', explanation: 'Adds trailing zeros' },
    ],
    relatedMethods: ['toPrecision', 'toExponential'],
  },
];

export const pythonMethods: Method[] = [
  // ==================== LIST METHODS ====================
  {
    name: 'append',
    category: 'lists',
    syntax: 'list.append(element)',
    description:
      'Adds an element to the end of the list. Commonly used in Django views to build response data incrementally.',
    arguments: [{ name: 'element', type: 'any', description: 'The element to add' }],
    returns: { type: 'None', description: 'Modifies list in place' },
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'lst = [1, 2]; lst.append(3); lst',
        output: '[1, 2, 3]',
        explanation: 'Adds 3 to the end',
      },
      {
        code: 'errors = []; errors.append("Invalid email"); errors',
        output: "['Invalid email']",
        explanation: 'Building validation errors list - common Django pattern',
      },
    ],
    relatedMethods: ['extend', 'insert'],
    notes: ['Modifies the list in-place, returns None', 'Use for single element additions'],
  },
  {
    name: 'extend',
    category: 'lists',
    syntax: 'list.extend(iterable)',
    description:
      'Extends the list by appending elements from the iterable. Useful for merging querysets or aggregating API responses.',
    arguments: [{ name: 'iterable', type: 'iterable', description: 'Iterable to extend from' }],
    returns: { type: 'None', description: 'Modifies list in place' },
    timeComplexity: 'O(k) where k is length of iterable',
    spaceComplexity: 'O(k)',
    examples: [
      {
        code: 'lst = [1, 2]; lst.extend([3, 4]); lst',
        output: '[1, 2, 3, 4]',
        explanation: 'Extends with list',
      },
      {
        code: 'all_users = list(active_users); all_users.extend(inactive_users)',
        output: 'Combined list of users',
        explanation: 'Merging Django querysets into a single list',
      },
    ],
    relatedMethods: ['append', '+= operator', 'itertools.chain'],
    notes: ['More efficient than += for large lists', 'Accepts any iterable including generators'],
  },
  {
    name: 'insert',
    category: 'lists',
    syntax: 'list.insert(index, element)',
    description:
      'Inserts an element at a specified position. Use sparingly as it has O(n) complexity.',
    arguments: [
      { name: 'index', type: 'int', description: 'Position to insert at' },
      { name: 'element', type: 'any', description: 'Element to insert' },
    ],
    returns: { type: 'None', description: 'Modifies list in place' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'lst = [1, 3]; lst.insert(1, 2); lst',
        output: '[1, 2, 3]',
        explanation: 'Inserts 2 at index 1',
      },
      {
        code: 'middleware = ["auth", "logging"]; middleware.insert(0, "cors"); middleware',
        output: "['cors', 'auth', 'logging']",
        explanation: 'Adding middleware at beginning - Django middleware ordering',
      },
    ],
    relatedMethods: ['append', 'extend'],
    notes: ['Shifts all elements after index', 'Consider deque for frequent front insertions'],
  },
  {
    name: 'pop',
    category: 'lists',
    syntax: 'list.pop(index=-1)',
    description:
      'Removes and returns the element at the specified position. Default is the last element.',
    arguments: [
      {
        name: 'index',
        type: 'int',
        description: 'Position to remove from',
        optional: true,
        defaultValue: '-1',
      },
    ],
    returns: { type: 'any', description: 'The removed element' },
    timeComplexity: 'O(1) for last element, O(n) otherwise',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'lst = [1, 2, 3]; lst.pop()',
        output: '3',
        explanation: 'Removes and returns last element',
      },
      {
        code: 'task_queue = ["task1", "task2"]; current = task_queue.pop(0); current',
        output: "'task1'",
        explanation: 'Processing tasks FIFO - consider collections.deque for this',
      },
    ],
    relatedMethods: ['remove', 'del', 'deque.popleft'],
    notes: [
      'Raises IndexError if list is empty or index out of range',
      'Use deque for O(1) popleft operations',
    ],
  },
  {
    name: 'remove',
    category: 'lists',
    syntax: 'list.remove(element)',
    description: 'Removes the first occurrence of a value. Raises ValueError if not found.',
    arguments: [{ name: 'element', type: 'any', description: 'Element to remove' }],
    returns: { type: 'None', description: 'Modifies list in place' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'lst = [1, 2, 2, 3]; lst.remove(2); lst',
        output: '[1, 2, 3]',
        explanation: 'Removes first occurrence of 2',
      },
      {
        code: 'permissions = ["read", "write", "admin"]; permissions.remove("admin"); permissions',
        output: "['read', 'write']",
        explanation: 'Revoking a permission - Django permission handling',
      },
    ],
    relatedMethods: ['pop', 'del', 'discard'],
    notes: ['Only removes first occurrence', 'Consider set.discard() for no-error removal'],
  },
  {
    name: 'index',
    category: 'lists',
    syntax: 'list.index(element, start=0, end=len(list))',
    description: 'Returns the index of the first occurrence of a value.',
    arguments: [
      { name: 'element', type: 'any', description: 'Element to find' },
      { name: 'start', type: 'int', description: 'Start index for search', optional: true },
      { name: 'end', type: 'int', description: 'End index for search', optional: true },
    ],
    returns: { type: 'int', description: 'Index of the element' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '["a", "b", "c"].index("b")', output: '1', explanation: 'Returns index of "b"' },
      {
        code: 'stages = ["draft", "review", "published"]; stages.index("review")',
        output: '1',
        explanation: 'Finding workflow stage position',
      },
    ],
    relatedMethods: ['find', 'in operator'],
    notes: ['Raises ValueError if element not found', 'Use "in" operator to check existence first'],
  },
  {
    name: 'count',
    category: 'lists',
    syntax: 'list.count(element)',
    description: 'Returns the number of occurrences of a value in the list.',
    arguments: [{ name: 'element', type: 'any', description: 'Element to count' }],
    returns: { type: 'int', description: 'Number of occurrences' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '[1, 2, 2, 3, 2].count(2)', output: '3', explanation: 'Counts occurrences of 2' },
      {
        code: 'responses = ["success", "error", "success"]; responses.count("error")',
        output: '1',
        explanation: 'Counting API error responses',
      },
    ],
    relatedMethods: ['collections.Counter', 'len'],
    notes: ['Use Counter for counting multiple elements efficiently'],
  },
  {
    name: 'sort',
    category: 'lists',
    syntax: 'list.sort(key=None, reverse=False)',
    description:
      'Sorts the list in place. For Django querysets, prefer order_by() for database-level sorting.',
    arguments: [
      {
        name: 'key',
        type: 'function',
        description: 'Function to extract comparison key',
        optional: true,
      },
      { name: 'reverse', type: 'bool', description: 'Sort in descending order', optional: true },
    ],
    returns: { type: 'None', description: 'Modifies list in place' },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'lst = [3, 1, 2]; lst.sort(); lst',
        output: '[1, 2, 3]',
        explanation: 'Sorts in ascending order',
      },
      {
        code: 'users = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]; users.sort(key=lambda u: u["age"]); users',
        output: '[{"name": "Bob", ...}, {"name": "Alice", ...}]',
        explanation: 'Sorting users by age - common API response sorting',
      },
    ],
    relatedMethods: ['sorted', 'reverse'],
    notes: [
      'Modifies list in-place',
      'Use sorted() to return a new list',
      'Timsort algorithm - stable sort',
    ],
  },
  {
    name: 'reverse',
    category: 'lists',
    syntax: 'list.reverse()',
    description: 'Reverses the list in place.',
    arguments: [],
    returns: { type: 'None', description: 'Modifies list in place' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'lst = [1, 2, 3]; lst.reverse(); lst',
        output: '[3, 2, 1]',
        explanation: 'Reverses the list',
      },
      {
        code: 'history = ["event1", "event2", "event3"]; history.reverse(); history',
        output: "['event3', 'event2', 'event1']",
        explanation: 'Showing most recent events first',
      },
    ],
    relatedMethods: ['reversed', 'sort'],
    notes: ['Modifies list in-place', 'Use reversed() for an iterator without modifying'],
  },
  {
    name: 'copy',
    category: 'lists',
    syntax: 'list.copy()',
    description: 'Returns a shallow copy of the list. For deep copies, use copy.deepcopy().',
    arguments: [],
    returns: { type: 'list', description: 'A shallow copy of the list' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'original = [1, 2, 3]; copied = original.copy(); copied',
        output: '[1, 2, 3]',
        explanation: 'Creates a shallow copy',
      },
      {
        code: 'config = {"debug": True}; settings = [config]; new_settings = settings.copy()',
        output: 'Shallow copy - nested objects share references',
        explanation: 'Be careful with mutable nested objects',
      },
    ],
    relatedMethods: ['copy.deepcopy', 'slice [:]'],
    notes: ['Shallow copy only - nested mutable objects share references', 'Equivalent to list[:]'],
  },
  {
    name: 'clear',
    category: 'lists',
    syntax: 'list.clear()',
    description: 'Removes all elements from the list.',
    arguments: [],
    returns: { type: 'None', description: 'Modifies list in place' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'lst = [1, 2, 3]; lst.clear(); lst', output: '[]', explanation: 'Empties the list' },
      {
        code: 'cache = ["item1", "item2"]; cache.clear()',
        output: '[]',
        explanation: 'Clearing a cache - Django cache invalidation pattern',
      },
    ],
    relatedMethods: ['del list[:]', 'list = []'],
    notes: ['Modifies in place - all references to the list see the change'],
  },
  {
    name: 'list comprehension',
    category: 'lists',
    syntax: '[expression for item in iterable if condition]',
    description:
      'Creates a new list by applying an expression to each item. Pythonic and often more readable than map/filter.',
    arguments: [],
    returns: { type: 'list', description: 'A new list' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: '[x * 2 for x in [1, 2, 3]]',
        output: '[2, 4, 6]',
        explanation: 'Doubles each element',
      },
      {
        code: '[x for x in [1, 2, 3, 4] if x > 2]',
        output: '[3, 4]',
        explanation: 'Filters elements > 2',
      },
      {
        code: '[user.email for user in User.objects.filter(is_active=True)]',
        output: "['user1@example.com', ...]",
        explanation: 'Extracting emails from Django queryset',
      },
      {
        code: '[{"id": p.id, "name": p.name} for p in products]',
        output: '[{"id": 1, "name": "Widget"}, ...]',
        explanation: 'Building API response data from queryset',
      },
    ],
    relatedMethods: ['map', 'filter', 'generator expression'],
    notes: [
      'More Pythonic than map/filter with lambda',
      'Use generator expression (parentheses) for memory efficiency',
    ],
  },
  {
    name: 'sorted',
    category: 'lists',
    syntax: 'sorted(iterable, key=None, reverse=False)',
    description:
      'Returns a new sorted list from the items in iterable. Does not modify the original.',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Items to sort' },
      { name: 'key', type: 'function', description: 'Key function for sorting', optional: true },
      { name: 'reverse', type: 'bool', description: 'Sort in reverse order', optional: true },
    ],
    returns: { type: 'list', description: 'A new sorted list' },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: 'sorted([3, 1, 2])', output: '[1, 2, 3]', explanation: 'Sorts in ascending order' },
      {
        code: 'sorted([3, 1, 2], reverse=True)',
        output: '[3, 2, 1]',
        explanation: 'Sorts in descending order',
      },
      {
        code: 'sorted(users, key=lambda u: u.created_at, reverse=True)',
        output: 'Users sorted by creation date (newest first)',
        explanation: 'Sorting Django model instances by field',
      },
      {
        code: 'sorted(data, key=itemgetter("price"))',
        output: 'Data sorted by price',
        explanation: 'Using operator.itemgetter for cleaner sorting',
      },
    ],
    relatedMethods: ['list.sort', 'reversed', 'operator.itemgetter'],
    notes: [
      'Returns new list, does not modify original',
      'Stable sort - equal elements maintain relative order',
    ],
  },
  {
    name: 'enumerate',
    category: 'lists',
    syntax: 'enumerate(iterable, start=0)',
    description:
      'Returns an enumerate object yielding pairs of (index, element). Essential for loops needing indices.',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Sequence to enumerate' },
      {
        name: 'start',
        type: 'int',
        description: 'Starting index value',
        optional: true,
        defaultValue: '0',
      },
    ],
    returns: { type: 'enumerate', description: 'Iterator of (index, element) tuples' },
    timeComplexity: 'O(1) to create, O(n) to iterate',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'list(enumerate(["a", "b", "c"]))',
        output: '[(0, "a"), (1, "b"), (2, "c")]',
        explanation: 'Index-value pairs',
      },
      {
        code: 'for i, item in enumerate(items, start=1): print(f"{i}. {item}")',
        output: '1. first\n2. second',
        explanation: 'Human-readable numbering starting at 1',
      },
      {
        code: '[{"rank": i, "name": p.name} for i, p in enumerate(top_products, 1)]',
        output: '[{"rank": 1, "name": "Widget"}, ...]',
        explanation: 'Building ranked API response',
      },
    ],
    relatedMethods: ['zip', 'range'],
    notes: [
      'Avoid range(len(list)) pattern - use enumerate instead',
      'Memory efficient - yields values on demand',
    ],
  },
  {
    name: 'zip',
    category: 'lists',
    syntax: 'zip(*iterables)',
    description: 'Aggregates elements from multiple iterables. Stops at the shortest iterable.',
    arguments: [
      { name: 'iterables', type: 'iterable', description: 'Two or more iterables to zip' },
    ],
    returns: { type: 'zip', description: 'Iterator of tuples' },
    timeComplexity: 'O(1) to create, O(n) to iterate',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'list(zip([1, 2], ["a", "b"]))',
        output: '[(1, "a"), (2, "b")]',
        explanation: 'Pairs elements from two lists',
      },
      {
        code: 'dict(zip(keys, values))',
        output: '{"key1": "value1", "key2": "value2"}',
        explanation: 'Creating dict from parallel lists - common data transformation',
      },
      {
        code: 'for field, value in zip(form.fields, request.POST.values()): ...',
        output: 'Process form data pairs',
        explanation: 'Parallel iteration pattern in form processing',
      },
    ],
    relatedMethods: ['itertools.zip_longest', 'enumerate', 'dict'],
    notes: ['Stops at shortest iterable', 'Use zip_longest to fill missing values'],
  },
  {
    name: 'map',
    category: 'lists',
    syntax: 'map(function, iterable, ...)',
    description: 'Applies a function to all items in an iterable. Returns an iterator.',
    arguments: [
      { name: 'function', type: 'callable', description: 'Function to apply to each element' },
      { name: 'iterable', type: 'iterable', description: 'Iterable to map over' },
    ],
    returns: { type: 'map', description: 'Iterator of mapped values' },
    timeComplexity: 'O(1) to create, O(n) to iterate',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'list(map(str.upper, ["a", "b", "c"]))',
        output: "['A', 'B', 'C']",
        explanation: 'Converts all strings to uppercase',
      },
      {
        code: 'list(map(int, ["1", "2", "3"]))',
        output: '[1, 2, 3]',
        explanation: 'Converts strings to integers',
      },
      {
        code: 'list(map(lambda u: u.email, users))',
        output: "['user1@example.com', ...]",
        explanation: 'Extracting attribute - prefer list comprehension for readability',
      },
    ],
    relatedMethods: ['filter', 'list comprehension', 'functools.reduce'],
    notes: [
      'Returns iterator - wrap in list() if needed',
      'List comprehension often more readable in Python',
    ],
  },
  {
    name: 'filter',
    category: 'lists',
    syntax: 'filter(function, iterable)',
    description: 'Constructs an iterator from elements for which function returns True.',
    arguments: [
      {
        name: 'function',
        type: 'callable | None',
        description: 'Test function (None filters falsy values)',
      },
      { name: 'iterable', type: 'iterable', description: 'Iterable to filter' },
    ],
    returns: { type: 'filter', description: 'Iterator of filtered values' },
    timeComplexity: 'O(1) to create, O(n) to iterate',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'list(filter(lambda x: x > 0, [-1, 0, 1, 2]))',
        output: '[1, 2]',
        explanation: 'Keeps positive numbers',
      },
      {
        code: 'list(filter(None, ["", "hello", None, "world"]))',
        output: "['hello', 'world']",
        explanation: 'Filters out falsy values',
      },
      {
        code: 'list(filter(lambda u: u.is_active, users))',
        output: 'Active users only',
        explanation: 'Filtering model instances - prefer queryset filter()',
      },
    ],
    relatedMethods: ['map', 'list comprehension', 'itertools.filterfalse'],
    notes: [
      'Returns iterator',
      'For Django, prefer queryset.filter() for database-level filtering',
    ],
  },
  {
    name: 'any',
    category: 'lists',
    syntax: 'any(iterable)',
    description:
      'Returns True if any element in the iterable is truthy. Short-circuits on first True.',
    arguments: [{ name: 'iterable', type: 'iterable', description: 'Iterable to check' }],
    returns: { type: 'bool', description: 'True if any element is truthy' },
    timeComplexity: 'O(n) worst case, short-circuits',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'any([False, False, True])', output: 'True', explanation: 'At least one True' },
      {
        code: 'any(user.is_admin for user in users)',
        output: 'True if any admin exists',
        explanation: 'Check if any user is admin - Django permission checking',
      },
      {
        code: 'any(error in response for error in critical_errors)',
        output: 'True if critical error found',
        explanation: 'Error detection in API responses',
      },
    ],
    relatedMethods: ['all', 'filter'],
    notes: ['Short-circuits - stops at first truthy value', 'Empty iterable returns False'],
  },
  {
    name: 'all',
    category: 'lists',
    syntax: 'all(iterable)',
    description:
      'Returns True if all elements in the iterable are truthy. Short-circuits on first False.',
    arguments: [{ name: 'iterable', type: 'iterable', description: 'Iterable to check' }],
    returns: { type: 'bool', description: 'True if all elements are truthy' },
    timeComplexity: 'O(n) worst case, short-circuits',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'all([True, True, True])', output: 'True', explanation: 'All elements are True' },
      {
        code: 'all(field.is_valid() for field in form.fields)',
        output: 'True if form is valid',
        explanation: 'Form validation - Django form pattern',
      },
      {
        code: 'all(hasattr(obj, attr) for attr in required_attrs)',
        output: 'True if all attributes exist',
        explanation: 'Duck typing validation',
      },
    ],
    relatedMethods: ['any', 'filter'],
    notes: ['Short-circuits - stops at first falsy value', 'Empty iterable returns True'],
  },
  {
    name: 'len',
    category: 'lists',
    syntax: 'len(sequence)',
    description: 'Returns the number of items in a sequence or collection.',
    arguments: [{ name: 'sequence', type: 'sequence', description: 'Sequence to measure' }],
    returns: { type: 'int', description: 'Number of items' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'len([1, 2, 3])', output: '3', explanation: 'Length of list' },
      { code: 'len("hello")', output: '5', explanation: 'Length of string' },
      {
        code: 'len(User.objects.filter(is_active=True))',
        output: 'Count of active users',
        explanation: 'Django queryset count - prefer .count() for efficiency',
      },
    ],
    relatedMethods: ['count', 'size'],
    notes: [
      'For Django querysets, prefer .count() for database-level counting',
      'O(1) for built-in types',
    ],
  },
  {
    name: 'max',
    category: 'lists',
    syntax: 'max(iterable, key=None, default=None)',
    description: 'Returns the largest item in an iterable or the largest of two or more arguments.',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Iterable to search' },
      { name: 'key', type: 'function', description: 'Key function for comparison', optional: true },
      { name: 'default', type: 'any', description: 'Default value if empty', optional: true },
    ],
    returns: { type: 'any', description: 'Maximum value' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'max([1, 5, 3])', output: '5', explanation: 'Maximum value in list' },
      {
        code: 'max(users, key=lambda u: u.score)',
        output: 'User with highest score',
        explanation: 'Finding top performer',
      },
      {
        code: 'max(orders, key=attrgetter("total"), default=None)',
        output: 'Highest value order or None',
        explanation: 'Safe max with default for empty querysets',
      },
    ],
    relatedMethods: ['min', 'sorted'],
    notes: [
      'Raises ValueError on empty iterable without default',
      'Use default parameter for safety',
    ],
  },
  {
    name: 'min',
    category: 'lists',
    syntax: 'min(iterable, key=None, default=None)',
    description:
      'Returns the smallest item in an iterable or the smallest of two or more arguments.',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Iterable to search' },
      { name: 'key', type: 'function', description: 'Key function for comparison', optional: true },
      { name: 'default', type: 'any', description: 'Default value if empty', optional: true },
    ],
    returns: { type: 'any', description: 'Minimum value' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'min([1, 5, 3])', output: '1', explanation: 'Minimum value in list' },
      {
        code: 'min(products, key=lambda p: p.price)',
        output: 'Cheapest product',
        explanation: 'Finding lowest price item',
      },
      {
        code: 'min(dates, default=datetime.now())',
        output: 'Earliest date or now',
        explanation: 'Safe min with default',
      },
    ],
    relatedMethods: ['max', 'sorted'],
    notes: [
      'Raises ValueError on empty iterable without default',
      'Use default parameter for safety',
    ],
  },
  {
    name: 'sum',
    category: 'lists',
    syntax: 'sum(iterable, start=0)',
    description: 'Sums the items of an iterable. For string concatenation, use str.join() instead.',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Numbers to sum' },
      {
        name: 'start',
        type: 'number',
        description: 'Starting value',
        optional: true,
        defaultValue: '0',
      },
    ],
    returns: { type: 'number', description: 'Total sum' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'sum([1, 2, 3])', output: '6', explanation: 'Sum of list' },
      {
        code: 'sum(order.total for order in orders)',
        output: 'Total revenue',
        explanation: 'Aggregating order totals - prefer Django aggregate()',
      },
      {
        code: 'sum(item.quantity for item in cart.items)',
        output: 'Total items in cart',
        explanation: 'Cart total calculation',
      },
    ],
    relatedMethods: ['functools.reduce', 'math.fsum'],
    notes: [
      'For Django, prefer .aggregate(Sum()) for database-level aggregation',
      'Use math.fsum() for floating point precision',
    ],
  },

  // ==================== STRING METHODS ====================
  {
    name: 'join',
    category: 'strings',
    syntax: 'separator.join(iterable)',
    description:
      'Joins elements of an iterable with the separator string. Efficient for string concatenation.',
    arguments: [{ name: 'iterable', type: 'iterable', description: 'Iterable of strings to join' }],
    returns: { type: 'str', description: 'A new joined string' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: '"-".join(["a", "b", "c"])', output: '"a-b-c"', explanation: 'Joins with hyphen' },
      { code: '"".join(["h", "i"])', output: '"hi"', explanation: 'Joins without separator' },
      {
        code: '", ".join(str(id) for id in user_ids)',
        output: '"1, 2, 3"',
        explanation: 'Building comma-separated IDs for SQL IN clause',
      },
      {
        code: '"/".join(["api", "v1", "users"])',
        output: '"api/v1/users"',
        explanation: 'Building URL path segments',
      },
    ],
    relatedMethods: ['split', 'str'],
    notes: ['More efficient than += for string concatenation', 'All elements must be strings'],
  },
  {
    name: 'split',
    category: 'strings',
    syntax: 'string.split(sep=None, maxsplit=-1)',
    description: 'Splits a string into a list of substrings. Without sep, splits on whitespace.',
    arguments: [
      { name: 'sep', type: 'str', description: 'Separator to split on', optional: true },
      { name: 'maxsplit', type: 'int', description: 'Maximum splits to do', optional: true },
    ],
    returns: { type: 'list', description: 'A list of strings' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: '"a-b-c".split("-")', output: "['a', 'b', 'c']", explanation: 'Splits by hyphen' },
      {
        code: '"hello world".split()',
        output: "['hello', 'world']",
        explanation: 'Splits by whitespace',
      },
      {
        code: '"user@domain.com".split("@")',
        output: "['user', 'domain.com']",
        explanation: 'Parsing email address',
      },
      {
        code: '"Bearer token123".split(" ", 1)',
        output: "['Bearer', 'token123']",
        explanation: 'Parsing Authorization header with maxsplit',
      },
    ],
    relatedMethods: ['join', 'rsplit', 'splitlines', 'partition'],
    notes: [
      'None sep splits on any whitespace and removes empty strings',
      'Use rsplit() to split from the right',
    ],
  },
  {
    name: 'strip',
    category: 'strings',
    syntax: 'string.strip(chars=None)',
    description: 'Returns a copy of the string with leading and trailing characters removed.',
    arguments: [
      { name: 'chars', type: 'str', description: 'Characters to remove', optional: true },
    ],
    returns: { type: 'str', description: 'A new stripped string' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: '"  hello  ".strip()', output: '"hello"', explanation: 'Removes whitespace' },
      { code: '"xxhelloxx".strip("x")', output: '"hello"', explanation: 'Removes specified chars' },
      {
        code: 'request.GET.get("email", "").strip()',
        output: 'Cleaned email input',
        explanation: 'Sanitizing form input - Django best practice',
      },
      {
        code: 'api_key.strip()',
        output: 'Clean API key',
        explanation: 'Cleaning API keys from config files',
      },
    ],
    relatedMethods: ['lstrip', 'rstrip', 'replace'],
    notes: [
      'Always strip user input for security',
      'chars parameter removes any character in the set',
    ],
  },
  {
    name: 'lower',
    category: 'strings',
    syntax: 'string.lower()',
    description: 'Returns a copy of the string converted to lowercase.',
    arguments: [],
    returns: { type: 'str', description: 'Lowercase string' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: '"HELLO".lower()', output: '"hello"', explanation: 'Converts to lowercase' },
      {
        code: 'email.lower()',
        output: 'Normalized email',
        explanation: 'Case-insensitive email comparison - Django user model pattern',
      },
      {
        code: 'search_query.lower()',
        output: 'Normalized search term',
        explanation: 'Case-insensitive search preparation',
      },
    ],
    relatedMethods: ['upper', 'casefold', 'capitalize', 'title'],
    notes: [
      'Use casefold() for aggressive case-folding (international text)',
      'Strings are immutable - returns new string',
    ],
  },
  {
    name: 'upper',
    category: 'strings',
    syntax: 'string.upper()',
    description: 'Returns a copy of the string converted to uppercase.',
    arguments: [],
    returns: { type: 'str', description: 'Uppercase string' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: '"hello".upper()', output: '"HELLO"', explanation: 'Converts to uppercase' },
      { code: 'status_code.upper()', output: '"SUCCESS"', explanation: 'Normalizing status codes' },
      { code: 'http_method.upper()', output: '"GET"', explanation: 'HTTP method normalization' },
    ],
    relatedMethods: ['lower', 'casefold', 'capitalize', 'title'],
    notes: ['Strings are immutable - returns new string'],
  },
  {
    name: 'replace',
    category: 'strings',
    syntax: 'string.replace(old, new, count=-1)',
    description: 'Returns a copy of the string with all occurrences of old replaced by new.',
    arguments: [
      { name: 'old', type: 'str', description: 'Substring to replace' },
      { name: 'new', type: 'str', description: 'Replacement string' },
      { name: 'count', type: 'int', description: 'Maximum replacements', optional: true },
    ],
    returns: { type: 'str', description: 'New string with replacements' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: '"hello world".replace("world", "Python")',
        output: '"hello Python"',
        explanation: 'Simple replacement',
      },
      {
        code: 'template.replace("{{name}}", user.name)',
        output: 'Rendered template',
        explanation: 'Simple template rendering - for complex cases use Django templates',
      },
      {
        code: 'slug.replace(" ", "-").lower()',
        output: 'url-friendly-slug',
        explanation: 'Creating URL slugs',
      },
    ],
    relatedMethods: ['re.sub', 'translate', 'format'],
    notes: ['For complex patterns use re.sub()', 'Use Django slugify() for proper slug generation'],
  },
  {
    name: 'startswith',
    category: 'strings',
    syntax: 'string.startswith(prefix, start=0, end=len(string))',
    description: 'Returns True if string starts with the prefix.',
    arguments: [
      {
        name: 'prefix',
        type: 'str | tuple',
        description: 'Prefix to check (can be tuple of prefixes)',
      },
      { name: 'start', type: 'int', description: 'Start index', optional: true },
      { name: 'end', type: 'int', description: 'End index', optional: true },
    ],
    returns: { type: 'bool', description: 'True if string starts with prefix' },
    timeComplexity: 'O(k) where k is prefix length',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '"hello".startswith("he")', output: 'True', explanation: 'Starts with "he"' },
      {
        code: 'url.startswith(("http://", "https://"))',
        output: 'True for valid URLs',
        explanation: 'Validating URL protocols with tuple',
      },
      {
        code: 'path.startswith("/api/")',
        output: 'True for API routes',
        explanation: 'Django URL routing check',
      },
    ],
    relatedMethods: ['endswith', 'find', 'index'],
    notes: ['Can accept tuple of prefixes to check multiple', 'More readable than slicing'],
  },
  {
    name: 'endswith',
    category: 'strings',
    syntax: 'string.endswith(suffix, start=0, end=len(string))',
    description: 'Returns True if string ends with the suffix.',
    arguments: [
      {
        name: 'suffix',
        type: 'str | tuple',
        description: 'Suffix to check (can be tuple of suffixes)',
      },
      { name: 'start', type: 'int', description: 'Start index', optional: true },
      { name: 'end', type: 'int', description: 'End index', optional: true },
    ],
    returns: { type: 'bool', description: 'True if string ends with suffix' },
    timeComplexity: 'O(k) where k is suffix length',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '"hello.py".endswith(".py")', output: 'True', explanation: 'Python file check' },
      {
        code: 'filename.endswith((".jpg", ".png", ".gif"))',
        output: 'True for image files',
        explanation: 'File type validation with tuple',
      },
      {
        code: 'email.endswith("@company.com")',
        output: 'True for company emails',
        explanation: 'Email domain validation',
      },
    ],
    relatedMethods: ['startswith', 'find', 'rfind'],
    notes: [
      'Can accept tuple of suffixes to check multiple',
      'Useful for file extension validation',
    ],
  },
  {
    name: 'find',
    category: 'strings',
    syntax: 'string.find(sub, start=0, end=len(string))',
    description: 'Returns the lowest index where substring is found, or -1 if not found.',
    arguments: [
      { name: 'sub', type: 'str', description: 'Substring to find' },
      { name: 'start', type: 'int', description: 'Start index', optional: true },
      { name: 'end', type: 'int', description: 'End index', optional: true },
    ],
    returns: { type: 'int', description: 'Index of substring or -1' },
    timeComplexity: 'O(n*m)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '"hello world".find("world")', output: '6', explanation: 'Index of "world"' },
      { code: '"hello".find("x")', output: '-1', explanation: 'Not found returns -1' },
      {
        code: 'content_type.find("json")',
        output: 'Index if JSON content type',
        explanation: 'Checking Content-Type header',
      },
    ],
    relatedMethods: ['index', 'rfind', 'in operator'],
    notes: [
      'Use "in" operator for existence check',
      'index() raises ValueError instead of returning -1',
    ],
  },
  {
    name: 'format',
    category: 'strings',
    syntax: 'string.format(*args, **kwargs)',
    description: 'Performs string formatting with positional and keyword arguments.',
    arguments: [
      { name: 'args', type: 'any', description: 'Positional arguments' },
      { name: 'kwargs', type: 'any', description: 'Keyword arguments' },
    ],
    returns: { type: 'str', description: 'Formatted string' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: '"Hello, {}!".format("World")',
        output: '"Hello, World!"',
        explanation: 'Positional formatting',
      },
      {
        code: '"Hello, {name}!".format(name="Alice")',
        output: '"Hello, Alice!"',
        explanation: 'Keyword formatting',
      },
      {
        code: '"/api/users/{user_id}/".format(user_id=123)',
        output: '"/api/users/123/"',
        explanation: 'URL building pattern',
      },
      { code: '"{:.2f}".format(3.14159)', output: '"3.14"', explanation: 'Number formatting' },
    ],
    relatedMethods: ['f-strings', '% operator', 'str.format_map'],
    notes: [
      'Prefer f-strings (f"...") for readability in Python 3.6+',
      'Use format for dynamic format strings',
    ],
  },
  {
    name: 'f-string',
    category: 'strings',
    syntax: 'f"string {expression}"',
    description:
      'Formatted string literals for embedding expressions inside strings. Python 3.6+ feature.',
    arguments: [],
    returns: { type: 'str', description: 'Formatted string' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'name = "World"; f"Hello, {name}!"',
        output: '"Hello, World!"',
        explanation: 'Variable interpolation',
      },
      {
        code: 'f"User {user.id}: {user.name}"',
        output: '"User 1: Alice"',
        explanation: 'Attribute access in f-string',
      },
      {
        code: 'f"Total: ${amount:.2f}"',
        output: '"Total: $19.99"',
        explanation: 'Formatting numbers in f-string',
      },
      {
        code: 'f"{datetime.now():%Y-%m-%d}"',
        output: '"2024-01-15"',
        explanation: 'Date formatting in f-string',
      },
    ],
    relatedMethods: ['format', '% operator'],
    notes: [
      'Most Pythonic string formatting method',
      'Expressions evaluated at runtime',
      'Use = for debugging: f"{var=}"',
    ],
    sinceVersion: '3.6',
  },
  {
    name: 'isdigit',
    category: 'strings',
    syntax: 'string.isdigit()',
    description: 'Returns True if all characters in the string are digits.',
    arguments: [],
    returns: { type: 'bool', description: 'True if all characters are digits' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '"12345".isdigit()', output: 'True', explanation: 'All digits' },
      { code: '"12.34".isdigit()', output: 'False', explanation: 'Contains decimal point' },
      {
        code: 'user_id.isdigit()',
        output: 'True for numeric IDs',
        explanation: 'Validating numeric URL parameters',
      },
    ],
    relatedMethods: ['isnumeric', 'isdecimal', 'isalpha', 'isalnum'],
    notes: [
      'Does not handle negative numbers or decimals',
      'Use try/except int() for robust validation',
    ],
  },
  {
    name: 'isalpha',
    category: 'strings',
    syntax: 'string.isalpha()',
    description: 'Returns True if all characters in the string are alphabetic.',
    arguments: [],
    returns: { type: 'bool', description: 'True if all characters are alphabetic' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '"Hello".isalpha()', output: 'True', explanation: 'All letters' },
      { code: '"Hello World".isalpha()', output: 'False', explanation: 'Contains space' },
      {
        code: 'username.isalpha()',
        output: 'True for letter-only usernames',
        explanation: 'Simple username validation',
      },
    ],
    relatedMethods: ['isdigit', 'isalnum', 'isspace'],
    notes: ['Includes unicode letters', 'Does not include spaces or punctuation'],
  },
  {
    name: 'isalnum',
    category: 'strings',
    syntax: 'string.isalnum()',
    description: 'Returns True if all characters in the string are alphanumeric.',
    arguments: [],
    returns: { type: 'bool', description: 'True if all characters are alphanumeric' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '"Hello123".isalnum()', output: 'True', explanation: 'Letters and digits' },
      { code: '"Hello 123".isalnum()', output: 'False', explanation: 'Contains space' },
      {
        code: 'token.isalnum()',
        output: 'Validates alphanumeric tokens',
        explanation: 'API token validation',
      },
    ],
    relatedMethods: ['isalpha', 'isdigit', 'isidentifier'],
    notes: ['Useful for validating slugs and identifiers', 'Does not include underscores'],
  },
  {
    name: 'encode',
    category: 'strings',
    syntax: 'string.encode(encoding="utf-8", errors="strict")',
    description: 'Encodes the string to bytes using the specified encoding.',
    arguments: [
      {
        name: 'encoding',
        type: 'str',
        description: 'Encoding to use',
        optional: true,
        defaultValue: '"utf-8"',
      },
      { name: 'errors', type: 'str', description: 'Error handling scheme', optional: true },
    ],
    returns: { type: 'bytes', description: 'Encoded bytes object' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: '"hello".encode()', output: "b'hello'", explanation: 'UTF-8 encoding (default)' },
      { code: '"hello".encode("utf-8")', output: "b'hello'", explanation: 'Explicit UTF-8' },
      {
        code: 'password.encode() # For hashing',
        output: "b'secret'",
        explanation: 'Encoding for Django password hashing',
      },
      {
        code: 'json_data.encode("utf-8") # For HTTP response',
        output: 'Bytes for response body',
        explanation: 'Preparing data for HTTP response',
      },
    ],
    relatedMethods: ['bytes.decode', 'codecs'],
    notes: [
      'Essential for hashing, cryptography, and binary protocols',
      'UTF-8 is the web standard encoding',
    ],
  },
  {
    name: 'zfill',
    category: 'strings',
    syntax: 'string.zfill(width)',
    description: 'Pads a numeric string with zeros on the left to fill a specified width.',
    arguments: [{ name: 'width', type: 'int', description: 'Minimum string width' }],
    returns: { type: 'str', description: 'Zero-padded string' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: '"42".zfill(5)', output: '"00042"', explanation: 'Pads to width 5' },
      {
        code: 'str(order_number).zfill(8)',
        output: '"00000123"',
        explanation: 'Formatting order numbers',
      },
      {
        code: 'str(hour).zfill(2) + ":" + str(minute).zfill(2)',
        output: '"09:05"',
        explanation: 'Time formatting',
      },
    ],
    relatedMethods: ['rjust', 'ljust', 'center'],
    notes: ['Handles negative numbers correctly', 'Useful for fixed-width identifiers'],
  },

  // ==================== DICTIONARY METHODS ====================
  {
    name: 'get',
    category: 'dicts',
    syntax: 'dict.get(key, default=None)',
    description:
      'Returns the value for key if it exists, otherwise returns default. Essential for safe dictionary access.',
    arguments: [
      { name: 'key', type: 'any', description: 'Key to look up' },
      {
        name: 'default',
        type: 'any',
        description: 'Default value if key not found',
        optional: true,
      },
    ],
    returns: { type: 'any', description: 'Value or default' },
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '{"a": 1}.get("a")', output: '1', explanation: 'Key exists' },
      { code: '{"a": 1}.get("b", 0)', output: '0', explanation: 'Key missing, returns default' },
      {
        code: 'request.GET.get("page", "1")',
        output: 'Page number or "1"',
        explanation: 'Django request parameter with default',
      },
      {
        code: 'user_data.get("preferences", {})',
        output: 'Preferences or empty dict',
        explanation: 'Safe nested access pattern',
      },
    ],
    relatedMethods: ['setdefault', 'pop', '__getitem__'],
    notes: [
      'Never raises KeyError',
      'Essential for processing user input safely',
      'Most common dict method in Django',
    ],
  },
  {
    name: 'setdefault',
    category: 'dicts',
    syntax: 'dict.setdefault(key, default=None)',
    description:
      'Returns value for key if it exists; otherwise, inserts key with default value and returns default.',
    arguments: [
      { name: 'key', type: 'any', description: 'Key to look up' },
      { name: 'default', type: 'any', description: 'Default value to set', optional: true },
    ],
    returns: { type: 'any', description: 'Existing or default value' },
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'd = {}; d.setdefault("key", [])',
        output: '[]',
        explanation: 'Sets and returns default',
      },
      {
        code: 'cache.setdefault(user_id, {"visits": 0})',
        output: 'Existing or new user data',
        explanation: 'Cache initialization pattern',
      },
      {
        code: 'groups.setdefault(category, []).append(item)',
        output: 'Group-by pattern',
        explanation: 'Building grouped data structure',
      },
    ],
    relatedMethods: ['get', 'update', 'collections.defaultdict'],
    notes: ['Atomic get-or-set operation', 'Consider defaultdict for common patterns'],
  },
  {
    name: 'keys',
    category: 'dicts',
    syntax: 'dict.keys()',
    description: 'Returns a view object of all keys in the dictionary.',
    arguments: [],
    returns: { type: 'dict_keys', description: 'View of keys' },
    timeComplexity: 'O(1) to create view',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: '{"a": 1, "b": 2}.keys()',
        output: "dict_keys(['a', 'b'])",
        explanation: 'View of keys',
      },
      {
        code: 'list(config.keys())',
        output: "['DEBUG', 'DATABASE_URL', ...]",
        explanation: 'List of configuration keys',
      },
      {
        code: '"email" in request.POST.keys()',
        output: 'True if email submitted',
        explanation: 'Checking form field presence',
      },
    ],
    relatedMethods: ['values', 'items'],
    notes: ['Returns view, not list - reflects changes to dict', 'Supports set operations'],
  },
  {
    name: 'values',
    category: 'dicts',
    syntax: 'dict.values()',
    description: 'Returns a view object of all values in the dictionary.',
    arguments: [],
    returns: { type: 'dict_values', description: 'View of values' },
    timeComplexity: 'O(1) to create view',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: '{"a": 1, "b": 2}.values()',
        output: 'dict_values([1, 2])',
        explanation: 'View of values',
      },
      {
        code: 'sum(cart.values())',
        output: 'Total quantity',
        explanation: 'Sum of cart quantities',
      },
      {
        code: 'any(v is None for v in data.values())',
        output: 'True if any None value',
        explanation: 'Checking for missing data',
      },
    ],
    relatedMethods: ['keys', 'items'],
    notes: ['Returns view, not list', 'Use list() to get actual list'],
  },
  {
    name: 'items',
    category: 'dicts',
    syntax: 'dict.items()',
    description: 'Returns a view object of all (key, value) pairs in the dictionary.',
    arguments: [],
    returns: { type: 'dict_items', description: 'View of (key, value) tuples' },
    timeComplexity: 'O(1) to create view',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: '{"a": 1, "b": 2}.items()',
        output: "dict_items([('a', 1), ('b', 2)])",
        explanation: 'View of items',
      },
      {
        code: 'for key, value in config.items(): ...',
        output: 'Iterate over key-value pairs',
        explanation: 'Pythonic dict iteration',
      },
      {
        code: '{k: v for k, v in data.items() if v is not None}',
        output: 'Dict without None values',
        explanation: 'Filtering dict by values',
      },
    ],
    relatedMethods: ['keys', 'values'],
    notes: ['Most common for iteration', 'Supports set operations'],
  },
  {
    name: 'update',
    category: 'dicts',
    syntax: 'dict.update(other)',
    description: 'Updates dictionary with key-value pairs from another dict or iterable.',
    arguments: [
      { name: 'other', type: 'dict | iterable', description: 'Source of key-value pairs' },
    ],
    returns: { type: 'None', description: 'Modifies dict in place' },
    timeComplexity: 'O(n) where n is size of other',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'd = {"a": 1}; d.update({"b": 2}); d',
        output: '{"a": 1, "b": 2}',
        explanation: 'Merge dicts',
      },
      {
        code: 'context.update(extra_context)',
        output: 'Merged template context',
        explanation: 'Django template context merging',
      },
      {
        code: 'defaults.update(user_settings)',
        output: 'User settings override defaults',
        explanation: 'Settings override pattern',
      },
    ],
    relatedMethods: ['|= operator', 'setdefault'],
    notes: ['Later values override earlier ones', 'Use |= operator in Python 3.9+'],
  },
  {
    name: 'pop',
    category: 'dicts',
    syntax: 'dict.pop(key, default)',
    description:
      'Removes and returns value for key. Raises KeyError if key not found and no default provided.',
    arguments: [
      { name: 'key', type: 'any', description: 'Key to remove' },
      { name: 'default', type: 'any', description: 'Default if key not found', optional: true },
    ],
    returns: { type: 'any', description: 'Removed value or default' },
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'd = {"a": 1}; d.pop("a")', output: '1', explanation: 'Removes and returns value' },
      {
        code: 'session.pop("user_id", None)',
        output: 'User ID or None',
        explanation: 'Removing session data safely',
      },
      {
        code: 'data.pop("password")  # Remove before logging',
        output: 'Sanitize sensitive data',
        explanation: 'Removing sensitive fields before serialization',
      },
    ],
    relatedMethods: ['get', 'del', 'popitem'],
    notes: ['Use default to avoid KeyError', 'Essential for data sanitization'],
  },
  {
    name: 'dict comprehension',
    category: 'dicts',
    syntax: '{key_expr: value_expr for item in iterable if condition}',
    description: 'Creates a new dictionary by applying expressions to each item.',
    arguments: [],
    returns: { type: 'dict', description: 'A new dictionary' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: '{x: x**2 for x in range(4)}',
        output: '{0: 0, 1: 1, 2: 4, 3: 9}',
        explanation: 'Square mapping',
      },
      {
        code: '{k: v for k, v in data.items() if v}',
        output: 'Dict with truthy values only',
        explanation: 'Filtering dict',
      },
      {
        code: '{user.id: user.name for user in users}',
        output: '{1: "Alice", 2: "Bob"}',
        explanation: 'Building ID-to-name mapping from queryset',
      },
      {
        code: '{field: getattr(obj, field) for field in fields}',
        output: 'Serialized object',
        explanation: 'Manual serialization pattern',
      },
    ],
    relatedMethods: ['list comprehension', 'dict()'],
    notes: [
      'Pythonic way to transform and filter dicts',
      'More readable than dict() with generator',
    ],
  },
  {
    name: 'fromkeys',
    category: 'dicts',
    syntax: 'dict.fromkeys(keys, value=None)',
    description: 'Creates a new dictionary with keys from iterable and values set to value.',
    arguments: [
      { name: 'keys', type: 'iterable', description: 'Keys for new dict' },
      { name: 'value', type: 'any', description: 'Value for all keys', optional: true },
    ],
    returns: { type: 'dict', description: 'New dictionary' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'dict.fromkeys(["a", "b"], 0)',
        output: '{"a": 0, "b": 0}',
        explanation: 'Initialize with same value',
      },
      {
        code: 'dict.fromkeys(required_fields, "")',
        output: 'Empty form data template',
        explanation: 'Creating form defaults',
      },
      {
        code: 'seen = dict.fromkeys(items)',
        output: 'Preserve order, dedupe',
        explanation: 'Ordered deduplication (Python 3.7+)',
      },
    ],
    relatedMethods: ['dict comprehension', 'defaultdict'],
    notes: [
      'All values share same reference - careful with mutable values',
      'Use comprehension for distinct mutable values',
    ],
  },

  // ==================== SET METHODS ====================
  {
    name: 'add',
    category: 'sets',
    syntax: 'set.add(element)',
    description: 'Adds an element to the set.',
    arguments: [{ name: 'element', type: 'hashable', description: 'Element to add' }],
    returns: { type: 'None', description: 'Modifies set in place' },
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 's = {1, 2}; s.add(3); s', output: '{1, 2, 3}', explanation: 'Adds element' },
      {
        code: 'visited_pages.add(page_id)',
        output: 'Track unique page visits',
        explanation: 'Tracking unique items',
      },
      {
        code: 'tags.add(tag.lower())',
        output: 'Building normalized tag set',
        explanation: 'Deduplicating tags',
      },
    ],
    relatedMethods: ['update', 'discard', 'remove'],
    notes: ['No effect if element already exists', 'Element must be hashable'],
  },
  {
    name: 'remove',
    category: 'sets',
    syntax: 'set.remove(element)',
    description: 'Removes an element from the set. Raises KeyError if not found.',
    arguments: [{ name: 'element', type: 'hashable', description: 'Element to remove' }],
    returns: { type: 'None', description: 'Modifies set in place' },
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 's = {1, 2, 3}; s.remove(2); s', output: '{1, 3}', explanation: 'Removes element' },
      {
        code: 'active_sessions.remove(session_id)',
        output: 'Remove known session',
        explanation: 'Session management',
      },
    ],
    relatedMethods: ['discard', 'pop', 'clear'],
    notes: ['Raises KeyError if element not found', 'Use discard() for no-error removal'],
  },
  {
    name: 'discard',
    category: 'sets',
    syntax: 'set.discard(element)',
    description: 'Removes an element from the set if present. No error if not found.',
    arguments: [{ name: 'element', type: 'hashable', description: 'Element to discard' }],
    returns: { type: 'None', description: 'Modifies set in place' },
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 's = {1, 2, 3}; s.discard(5); s',
        output: '{1, 2, 3}',
        explanation: 'No error if not found',
      },
      {
        code: 'permissions.discard("admin")',
        output: 'Remove permission if exists',
        explanation: 'Safe permission removal',
      },
    ],
    relatedMethods: ['remove', 'pop'],
    notes: ['Safe removal - never raises KeyError', 'Prefer over remove() when uncertain'],
  },
  {
    name: 'union',
    category: 'sets',
    syntax: 'set.union(*others) or set1 | set2',
    description: 'Returns a new set with elements from the set and all others.',
    arguments: [{ name: 'others', type: 'iterable', description: 'Sets to union with' }],
    returns: { type: 'set', description: 'New set with all elements' },
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    examples: [
      { code: '{1, 2}.union({2, 3})', output: '{1, 2, 3}', explanation: 'Union of sets' },
      { code: '{1, 2} | {2, 3}', output: '{1, 2, 3}', explanation: 'Operator syntax' },
      {
        code: 'all_permissions = user_perms | group_perms | role_perms',
        output: 'Combined permissions',
        explanation: 'Merging permission sets',
      },
    ],
    relatedMethods: ['intersection', 'difference', 'symmetric_difference'],
    notes: ['| operator more concise', 'Can union multiple sets at once'],
  },
  {
    name: 'intersection',
    category: 'sets',
    syntax: 'set.intersection(*others) or set1 & set2',
    description: 'Returns a new set with elements common to the set and all others.',
    arguments: [{ name: 'others', type: 'iterable', description: 'Sets to intersect with' }],
    returns: { type: 'set', description: 'New set with common elements' },
    timeComplexity: 'O(min(n, m))',
    spaceComplexity: 'O(min(n, m))',
    examples: [
      {
        code: '{1, 2, 3}.intersection({2, 3, 4})',
        output: '{2, 3}',
        explanation: 'Common elements',
      },
      { code: '{1, 2, 3} & {2, 3, 4}', output: '{2, 3}', explanation: 'Operator syntax' },
      {
        code: 'allowed_fields = requested_fields & valid_fields',
        output: 'Filter to valid fields only',
        explanation: 'API field validation',
      },
    ],
    relatedMethods: ['union', 'difference'],
    notes: ['Use for finding common items', 'Efficient permission checking'],
  },
  {
    name: 'difference',
    category: 'sets',
    syntax: 'set.difference(*others) or set1 - set2',
    description: 'Returns a new set with elements in the set but not in others.',
    arguments: [{ name: 'others', type: 'iterable', description: 'Sets to subtract' }],
    returns: { type: 'set', description: 'New set with remaining elements' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: '{1, 2, 3}.difference({2, 3})', output: '{1}', explanation: 'Elements not in other' },
      { code: '{1, 2, 3} - {2, 3}', output: '{1}', explanation: 'Operator syntax' },
      {
        code: 'missing_fields = required_fields - provided_fields',
        output: 'Find missing required fields',
        explanation: 'Form validation pattern',
      },
    ],
    relatedMethods: ['union', 'intersection', 'symmetric_difference'],
    notes: ['Useful for finding missing items', 'Common in validation logic'],
  },
  {
    name: 'issubset',
    category: 'sets',
    syntax: 'set.issubset(other) or set1 <= set2',
    description: 'Returns True if all elements of the set are in other.',
    arguments: [{ name: 'other', type: 'iterable', description: 'Set to compare against' }],
    returns: { type: 'bool', description: 'True if subset' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: '{1, 2}.issubset({1, 2, 3})', output: 'True', explanation: 'Is subset' },
      {
        code: 'user_perms <= required_perms',
        output: 'False - missing permissions',
        explanation: 'Permission subset check',
      },
      {
        code: 'requested_fields.issubset(allowed_fields)',
        output: 'Validate field access',
        explanation: 'API field access control',
      },
    ],
    relatedMethods: ['issuperset', 'intersection'],
    notes: ['Use for permission checking', '<= includes equal sets, < is strict subset'],
  },

  // ==================== FILE OPERATIONS ====================
  {
    name: 'open',
    category: 'files',
    syntax: 'open(file, mode="r", encoding=None)',
    description:
      'Opens a file and returns a file object. Always use with context manager (with statement).',
    arguments: [
      { name: 'file', type: 'str | Path', description: 'Path to file' },
      {
        name: 'mode',
        type: 'str',
        description: 'File mode (r/w/a/b/+)',
        optional: true,
        defaultValue: '"r"',
      },
      { name: 'encoding', type: 'str', description: 'Text encoding', optional: true },
    ],
    returns: { type: 'file', description: 'File object' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'with open("file.txt", "r") as f: content = f.read()',
        output: 'File contents',
        explanation: 'Read file with context manager',
      },
      {
        code: 'with open("data.json", "w", encoding="utf-8") as f: json.dump(data, f)',
        output: 'Write JSON file',
        explanation: 'Django settings/fixture writing',
      },
      {
        code: 'with open(log_path, "a") as f: f.write(log_entry)',
        output: 'Append to log',
        explanation: 'Log file appending',
      },
    ],
    relatedMethods: ['pathlib.Path.open', 'io.StringIO'],
    notes: [
      'Always use with statement for automatic cleanup',
      'Specify encoding="utf-8" for text files',
      'Use Django FileField for user uploads',
    ],
  },
  {
    name: 'read',
    category: 'files',
    syntax: 'file.read(size=-1)',
    description: 'Reads and returns up to size characters from the file.',
    arguments: [
      { name: 'size', type: 'int', description: 'Max characters to read', optional: true },
    ],
    returns: { type: 'str', description: 'File contents' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'with open("file.txt") as f: content = f.read()',
        output: 'Entire file contents',
        explanation: 'Read entire file',
      },
      {
        code: 'chunk = f.read(1024)',
        output: 'First 1024 chars',
        explanation: 'Read in chunks for large files',
      },
    ],
    relatedMethods: ['readline', 'readlines', 'iter'],
    notes: ['Loads entire file into memory', 'For large files, iterate line by line instead'],
  },
  {
    name: 'readline',
    category: 'files',
    syntax: 'file.readline(size=-1)',
    description: 'Reads and returns one line from the file.',
    arguments: [
      { name: 'size', type: 'int', description: 'Max characters to read', optional: true },
    ],
    returns: { type: 'str', description: 'One line from file' },
    timeComplexity: 'O(n) for line length',
    spaceComplexity: 'O(n) for line length',
    examples: [
      {
        code: 'line = f.readline()',
        output: 'First line with newline',
        explanation: 'Read single line',
      },
      {
        code: 'header = f.readline().strip()',
        output: 'First line without newline',
        explanation: 'Read CSV header',
      },
    ],
    relatedMethods: ['read', 'readlines', 'iter'],
    notes: ['Includes newline character', 'Returns empty string at EOF'],
  },
  {
    name: 'write',
    category: 'files',
    syntax: 'file.write(string)',
    description: 'Writes string to the file and returns number of characters written.',
    arguments: [{ name: 'string', type: 'str', description: 'String to write' }],
    returns: { type: 'int', description: 'Number of characters written' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'f.write("Hello\\n")', output: '6', explanation: 'Write line to file' },
      {
        code: 'f.write(json.dumps(data))',
        output: 'Write JSON string',
        explanation: 'Writing serialized data',
      },
    ],
    relatedMethods: ['writelines', 'print'],
    notes: ['Does not add newline automatically', 'Use print(text, file=f) for automatic newlines'],
  },

  // ==================== JSON OPERATIONS ====================
  {
    name: 'json.dumps',
    category: 'json',
    syntax: 'json.dumps(obj, indent=None, default=None)',
    description: 'Serializes object to a JSON formatted string. Essential for API responses.',
    arguments: [
      { name: 'obj', type: 'any', description: 'Object to serialize' },
      { name: 'indent', type: 'int', description: 'Indentation level', optional: true },
      {
        name: 'default',
        type: 'function',
        description: 'Function for non-serializable objects',
        optional: true,
      },
    ],
    returns: { type: 'str', description: 'JSON string' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'json.dumps({"name": "Alice"})',
        output: '\'{"name": "Alice"}\'',
        explanation: 'Simple dict to JSON',
      },
      {
        code: 'json.dumps(data, indent=2)',
        output: 'Pretty-printed JSON',
        explanation: 'Formatted for readability',
      },
      {
        code: 'json.dumps(data, default=str)',
        output: 'Serialize with str fallback',
        explanation: 'Handle datetime and other non-serializable types',
      },
    ],
    relatedMethods: ['json.loads', 'json.dump', 'DjangoJSONEncoder'],
    notes: [
      'Use DjangoJSONEncoder for datetime, Decimal, UUID support',
      'In Django views, prefer JsonResponse',
    ],
  },
  {
    name: 'json.loads',
    category: 'json',
    syntax: 'json.loads(string)',
    description: 'Deserializes a JSON string to a Python object.',
    arguments: [{ name: 'string', type: 'str', description: 'JSON string to parse' }],
    returns: { type: 'any', description: 'Python object' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'json.loads(\'{"name": "Alice"}\')',
        output: '{"name": "Alice"}',
        explanation: 'JSON to dict',
      },
      {
        code: 'data = json.loads(request.body)',
        output: 'Parse request body',
        explanation: 'Django API endpoint pattern',
      },
      {
        code: 'config = json.loads(Path("config.json").read_text())',
        output: 'Load config file',
        explanation: 'Loading JSON configuration',
      },
    ],
    relatedMethods: ['json.dumps', 'json.load'],
    notes: ['Raises JSONDecodeError on invalid JSON', 'Always validate/sanitize parsed data'],
  },

  // ==================== DATETIME OPERATIONS ====================
  {
    name: 'datetime.now',
    category: 'datetime',
    syntax: 'datetime.now(tz=None)',
    description: 'Returns the current local date and time. Use timezone.now() in Django.',
    arguments: [{ name: 'tz', type: 'timezone', description: 'Timezone info', optional: true }],
    returns: { type: 'datetime', description: 'Current datetime' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'datetime.now()',
        output: 'datetime.datetime(2024, 1, 15, 10, 30, 0)',
        explanation: 'Current local time',
      },
      {
        code: 'datetime.now(timezone.utc)',
        output: 'Current UTC time',
        explanation: 'Timezone-aware datetime',
      },
      {
        code: 'from django.utils import timezone; timezone.now()',
        output: 'Django timezone-aware now',
        explanation: 'Django best practice for current time',
      },
    ],
    relatedMethods: ['datetime.utcnow', 'django.utils.timezone.now', 'datetime.today'],
    notes: [
      'In Django, always use timezone.now() for timezone awareness',
      'Store dates in UTC, display in user timezone',
    ],
  },
  {
    name: 'datetime.strftime',
    category: 'datetime',
    syntax: 'datetime.strftime(format)',
    description: 'Formats datetime as string according to format codes.',
    arguments: [
      { name: 'format', type: 'str', description: 'Format string with codes like %Y, %m, %d' },
    ],
    returns: { type: 'str', description: 'Formatted datetime string' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'datetime.now().strftime("%Y-%m-%d")',
        output: '"2024-01-15"',
        explanation: 'ISO date format',
      },
      {
        code: 'dt.strftime("%B %d, %Y")',
        output: '"January 15, 2024"',
        explanation: 'Human readable date',
      },
      {
        code: 'dt.strftime("%Y-%m-%dT%H:%M:%SZ")',
        output: '"2024-01-15T10:30:00Z"',
        explanation: 'ISO 8601 format for APIs',
      },
    ],
    relatedMethods: ['strptime', 'isoformat'],
    notes: [
      'Use isoformat() for ISO 8601 standard',
      'Common codes: %Y year, %m month, %d day, %H hour, %M minute, %S second',
    ],
  },
  {
    name: 'datetime.strptime',
    category: 'datetime',
    syntax: 'datetime.strptime(date_string, format)',
    description: 'Parses a string into a datetime object according to format.',
    arguments: [
      { name: 'date_string', type: 'str', description: 'String to parse' },
      { name: 'format', type: 'str', description: 'Format string matching input' },
    ],
    returns: { type: 'datetime', description: 'Parsed datetime' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'datetime.strptime("2024-01-15", "%Y-%m-%d")',
        output: 'datetime(2024, 1, 15)',
        explanation: 'Parse ISO date',
      },
      {
        code: 'datetime.strptime("15/01/2024", "%d/%m/%Y")',
        output: 'datetime(2024, 1, 15)',
        explanation: 'Parse European date format',
      },
      {
        code: 'datetime.strptime(request.POST["date"], "%Y-%m-%d")',
        output: 'Parse form date input',
        explanation: 'Form date handling',
      },
    ],
    relatedMethods: ['strftime', 'fromisoformat'],
    notes: [
      'Raises ValueError if format does not match',
      'Use dateutil.parser for flexible parsing',
    ],
  },
  {
    name: 'timedelta',
    category: 'datetime',
    syntax: 'timedelta(days=0, hours=0, minutes=0, seconds=0)',
    description: 'Represents a duration, the difference between two dates or times.',
    arguments: [
      { name: 'days', type: 'int', description: 'Number of days', optional: true },
      { name: 'hours', type: 'int', description: 'Number of hours', optional: true },
      { name: 'minutes', type: 'int', description: 'Number of minutes', optional: true },
      { name: 'seconds', type: 'int', description: 'Number of seconds', optional: true },
    ],
    returns: { type: 'timedelta', description: 'Duration object' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'datetime.now() + timedelta(days=7)',
        output: 'Date one week from now',
        explanation: 'Date arithmetic',
      },
      {
        code: 'timedelta(hours=24)',
        output: 'One day duration',
        explanation: 'Token expiration period',
      },
      {
        code: 'expires_at = timezone.now() + timedelta(hours=1)',
        output: 'Session expiration',
        explanation: 'Django session/token expiration',
      },
    ],
    relatedMethods: ['datetime', 'relativedelta'],
    notes: [
      'Use dateutil.relativedelta for month/year arithmetic',
      'timedelta only handles days and smaller units',
    ],
  },

  // ==================== EXCEPTION HANDLING ====================
  {
    name: 'try-except',
    category: 'exceptions',
    syntax: 'try: ... except ExceptionType as e: ...',
    description: 'Catches and handles exceptions. Essential for robust web applications.',
    arguments: [],
    returns: { type: 'None', description: 'N/A' },
    examples: [
      {
        code: 'try:\n    result = int(value)\nexcept ValueError:\n    result = 0',
        output: 'Safe integer conversion',
        explanation: 'Handle conversion errors',
      },
      {
        code: 'try:\n    user = User.objects.get(pk=pk)\nexcept User.DoesNotExist:\n    return HttpResponse(status=404)',
        output: '404 response',
        explanation: 'Django model lookup with 404',
      },
      {
        code: 'try:\n    data = json.loads(body)\nexcept json.JSONDecodeError:\n    return JsonResponse({"error": "Invalid JSON"}, status=400)',
        output: 'API error handling',
        explanation: 'JSON parsing in API views',
      },
    ],
    relatedMethods: ['raise', 'finally', 'else clause'],
    notes: [
      'Catch specific exceptions, not bare except',
      'Use get_object_or_404() shortcut in Django',
      'Log exceptions for debugging',
    ],
  },
  {
    name: 'raise',
    category: 'exceptions',
    syntax: 'raise ExceptionType(message)',
    description: 'Raises an exception. Use for validation and error signaling.',
    arguments: [{ name: 'exception', type: 'Exception', description: 'Exception to raise' }],
    returns: { type: 'NoReturn', description: 'Never returns' },
    examples: [
      {
        code: 'raise ValueError("Invalid input")',
        output: 'Raises ValueError',
        explanation: 'Raise with message',
      },
      {
        code: 'if not user.is_authenticated:\n    raise PermissionDenied("Login required")',
        output: 'Django permission error',
        explanation: 'Django permission checking',
      },
      {
        code: 'raise Http404("Page not found")',
        output: 'Django 404',
        explanation: 'Django 404 response',
      },
    ],
    relatedMethods: ['try-except', 'assert'],
    notes: [
      'Use built-in exceptions when appropriate',
      'Create custom exceptions for domain-specific errors',
    ],
  },

  // ==================== COLLECTIONS MODULE ====================
  {
    name: 'defaultdict',
    category: 'collections',
    syntax: 'defaultdict(default_factory)',
    description: 'Dict subclass that calls a factory function to supply missing values.',
    arguments: [
      {
        name: 'default_factory',
        type: 'callable',
        description: 'Function to create default values',
      },
    ],
    returns: { type: 'defaultdict', description: 'Dictionary with default values' },
    timeComplexity: 'O(1) for access',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'd = defaultdict(list); d["key"].append(1)',
        output: '{"key": [1]}',
        explanation: 'Auto-create lists',
      },
      {
        code: 'counts = defaultdict(int); counts["a"] += 1',
        output: '{"a": 1}',
        explanation: 'Counting pattern',
      },
      {
        code: 'groups = defaultdict(list)\nfor item in items:\n    groups[item.category].append(item)',
        output: 'Group items by category',
        explanation: 'Grouping pattern - like Django annotate',
      },
    ],
    relatedMethods: ['dict.setdefault', 'Counter'],
    notes: [
      'Cleaner than setdefault() for complex defaults',
      'from collections import defaultdict',
    ],
  },
  {
    name: 'Counter',
    category: 'collections',
    syntax: 'Counter(iterable)',
    description: 'Dict subclass for counting hashable objects.',
    arguments: [{ name: 'iterable', type: 'iterable', description: 'Items to count' }],
    returns: { type: 'Counter', description: 'Counter object' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) unique items',
    examples: [
      {
        code: 'Counter(["a", "b", "a", "c", "a"])',
        output: "Counter({'a': 3, 'b': 1, 'c': 1})",
        explanation: 'Count occurrences',
      },
      {
        code: 'Counter(word.lower() for word in text.split())',
        output: 'Word frequency',
        explanation: 'Word frequency analysis',
      },
      {
        code: 'Counter(log.level for log in logs).most_common(3)',
        output: 'Top 3 log levels',
        explanation: 'Log analysis',
      },
    ],
    relatedMethods: ['most_common', 'defaultdict'],
    notes: [
      'most_common(n) returns n most frequent',
      'Supports arithmetic operations between Counters',
    ],
  },
  {
    name: 'OrderedDict',
    category: 'collections',
    syntax: 'OrderedDict(items)',
    description:
      'Dict that remembers insertion order. Note: regular dict maintains order in Python 3.7+.',
    arguments: [
      { name: 'items', type: 'iterable', description: 'Key-value pairs', optional: true },
    ],
    returns: { type: 'OrderedDict', description: 'Ordered dictionary' },
    timeComplexity: 'O(1) for access',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'OrderedDict([("a", 1), ("b", 2)])',
        output: "OrderedDict([('a', 1), ('b', 2)])",
        explanation: 'Ordered dict',
      },
      { code: 'od.move_to_end("a")', output: 'Move key to end', explanation: 'LRU cache pattern' },
      { code: 'od.popitem(last=False)', output: 'Remove oldest item', explanation: 'FIFO removal' },
    ],
    relatedMethods: ['dict', 'move_to_end', 'popitem'],
    notes: [
      'Regular dict preserves order in Python 3.7+',
      'OrderedDict has move_to_end() and popitem(last=False)',
    ],
  },
  {
    name: 'namedtuple',
    category: 'collections',
    syntax: 'namedtuple(typename, field_names)',
    description: 'Factory function for creating tuple subclasses with named fields.',
    arguments: [
      { name: 'typename', type: 'str', description: 'Name of the new class' },
      { name: 'field_names', type: 'iterable | str', description: 'Field names' },
    ],
    returns: { type: 'type', description: 'New namedtuple class' },
    timeComplexity: 'O(1) for access',
    spaceComplexity: 'O(n) fields',
    examples: [
      {
        code: 'Point = namedtuple("Point", ["x", "y"])\np = Point(1, 2)\np.x',
        output: '1',
        explanation: 'Access by name',
      },
      {
        code: 'User = namedtuple("User", "id name email")\nuser = User(1, "Alice", "alice@example.com")',
        output: 'Lightweight data class',
        explanation: 'Data transfer object pattern',
      },
      {
        code: 'APIResponse = namedtuple("APIResponse", ["data", "status", "headers"])',
        output: 'Structured API response',
        explanation: 'Type-safe response handling',
      },
    ],
    relatedMethods: ['dataclass', 'typing.NamedTuple'],
    notes: [
      'Immutable - good for data integrity',
      'Consider dataclasses for mutable data with defaults',
    ],
  },
  {
    name: 'deque',
    category: 'collections',
    syntax: 'deque(iterable, maxlen=None)',
    description: 'Double-ended queue with O(1) append/pop on both ends.',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Initial items', optional: true },
      {
        name: 'maxlen',
        type: 'int',
        description: 'Maximum size (auto-evict oldest)',
        optional: true,
      },
    ],
    returns: { type: 'deque', description: 'Deque object' },
    timeComplexity: 'O(1) for append/pop on both ends',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'd = deque([1, 2, 3]); d.appendleft(0); list(d)',
        output: '[0, 1, 2, 3]',
        explanation: 'O(1) left append',
      },
      { code: 'd.popleft()', output: '0', explanation: 'O(1) left pop' },
      {
        code: 'recent = deque(maxlen=100)\nrecent.append(event)  # Auto-evicts oldest',
        output: 'Bounded history',
        explanation: 'Recent activity buffer',
      },
    ],
    relatedMethods: ['list', 'appendleft', 'popleft', 'rotate'],
    notes: ['Use for queues - O(1) popleft vs O(n) for list', 'maxlen creates bounded buffer'],
  },

  // ==================== ITERTOOLS MODULE ====================
  {
    name: 'itertools.chain',
    category: 'itertools',
    syntax: 'itertools.chain(*iterables)',
    description: 'Chains multiple iterables into a single iterator.',
    arguments: [{ name: 'iterables', type: 'iterable', description: 'Iterables to chain' }],
    returns: { type: 'iterator', description: 'Chained iterator' },
    timeComplexity: 'O(1) to create, O(n) to iterate',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'list(chain([1, 2], [3, 4]))', output: '[1, 2, 3, 4]', explanation: 'Chain lists' },
      {
        code: 'list(chain.from_iterable([[1, 2], [3, 4]]))',
        output: '[1, 2, 3, 4]',
        explanation: 'Flatten nested iterables',
      },
      {
        code: 'all_items = chain(queryset1, queryset2, queryset3)',
        output: 'Combine querysets lazily',
        explanation: 'Memory-efficient queryset combination',
      },
    ],
    relatedMethods: ['chain.from_iterable', 'list.extend'],
    notes: [
      'Memory efficient - yields items lazily',
      'Use chain.from_iterable for nested iterables',
    ],
  },
  {
    name: 'itertools.groupby',
    category: 'itertools',
    syntax: 'itertools.groupby(iterable, key=None)',
    description: 'Groups consecutive elements with the same key. Data must be sorted by key first.',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Items to group' },
      { name: 'key', type: 'function', description: 'Key function', optional: true },
    ],
    returns: { type: 'iterator', description: 'Iterator of (key, group) pairs' },
    timeComplexity: 'O(1) per group',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'for k, g in groupby("AAABBC"): print(k, list(g))',
        output: 'A [A,A,A], B [B,B], C [C]',
        explanation: 'Group consecutive',
      },
      {
        code: 'sorted_items = sorted(items, key=lambda x: x.category)\nfor cat, group in groupby(sorted_items, key=lambda x: x.category): ...',
        output: 'Group items by category',
        explanation: 'Category grouping - similar to Django annotate',
      },
    ],
    relatedMethods: ['sorted', 'defaultdict'],
    notes: ['Input MUST be sorted by key', 'For Django, consider values().annotate() instead'],
  },
  {
    name: 'itertools.islice',
    category: 'itertools',
    syntax: 'itertools.islice(iterable, stop) or islice(iterable, start, stop, step)',
    description: 'Returns an iterator that returns selected elements from the iterable.',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Source iterable' },
      { name: 'start', type: 'int', description: 'Start index', optional: true },
      { name: 'stop', type: 'int', description: 'Stop index' },
      { name: 'step', type: 'int', description: 'Step value', optional: true },
    ],
    returns: { type: 'iterator', description: 'Sliced iterator' },
    timeComplexity: 'O(start + n) where n is items returned',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'list(islice(range(10), 3))', output: '[0, 1, 2]', explanation: 'First 3 items' },
      { code: 'list(islice(range(10), 2, 5))', output: '[2, 3, 4]', explanation: 'Items 2-4' },
      {
        code: 'list(islice(infinite_generator(), 100))',
        output: 'First 100 items',
        explanation: 'Limit infinite iterator',
      },
    ],
    relatedMethods: ['slice', 'list slicing'],
    notes: ['Works with any iterator, not just sequences', 'Memory efficient for large iterables'],
  },

  // ==================== FUNCTOOLS MODULE ====================
  {
    name: 'functools.lru_cache',
    category: 'functools',
    syntax: '@lru_cache(maxsize=128)',
    description: 'Decorator that caches function results. Essential for expensive computations.',
    arguments: [
      {
        name: 'maxsize',
        type: 'int | None',
        description: 'Maximum cache size',
        optional: true,
        defaultValue: '128',
      },
    ],
    returns: { type: 'function', description: 'Cached function' },
    timeComplexity: 'O(1) for cached calls',
    spaceComplexity: 'O(maxsize)',
    examples: [
      {
        code: '@lru_cache(maxsize=None)\ndef fibonacci(n): ...',
        output: 'Cached fibonacci',
        explanation: 'Memoization',
      },
      {
        code: '@lru_cache(maxsize=100)\ndef get_user_permissions(user_id): ...',
        output: 'Cached permissions',
        explanation: 'Cache expensive database lookups',
      },
      {
        code: '@lru_cache(maxsize=1000)\ndef expensive_computation(data_hash): ...',
        output: 'Cached computation',
        explanation: 'Cache heavy processing',
      },
    ],
    relatedMethods: ['cache', 'cached_property'],
    notes: [
      'Arguments must be hashable',
      'Use maxsize=None for unlimited cache',
      'In Django, consider django.core.cache for distributed caching',
    ],
  },
  {
    name: 'functools.partial',
    category: 'functools',
    syntax: 'partial(func, *args, **kwargs)',
    description: 'Returns a new function with some arguments pre-filled.',
    arguments: [
      { name: 'func', type: 'callable', description: 'Function to wrap' },
      { name: 'args', type: 'any', description: 'Arguments to pre-fill' },
      { name: 'kwargs', type: 'any', description: 'Keyword arguments to pre-fill' },
    ],
    returns: { type: 'partial', description: 'New function with pre-filled arguments' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'add_ten = partial(add, 10); add_ten(5)',
        output: '15',
        explanation: 'Pre-fill first argument',
      },
      {
        code: 'json_encoder = partial(json.dumps, indent=2, ensure_ascii=False)',
        output: 'Configured JSON encoder',
        explanation: 'Pre-configure function',
      },
      {
        code: 'logger = partial(log_event, level="INFO", source="api")',
        output: 'Pre-configured logger',
        explanation: 'Logging with defaults',
      },
    ],
    relatedMethods: ['lambda', 'functools.partialmethod'],
    notes: [
      'Cleaner than lambda for simple partial application',
      'Preserves function signature for introspection',
    ],
  },
  {
    name: 'functools.reduce',
    category: 'functools',
    syntax: 'reduce(function, iterable, initializer=None)',
    description: 'Applies function cumulatively to items, reducing to a single value.',
    arguments: [
      { name: 'function', type: 'callable', description: 'Two-argument function' },
      { name: 'iterable', type: 'iterable', description: 'Items to reduce' },
      { name: 'initializer', type: 'any', description: 'Starting value', optional: true },
    ],
    returns: { type: 'any', description: 'Reduced value' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'reduce(lambda a, b: a + b, [1, 2, 3, 4])',
        output: '10',
        explanation: 'Sum using reduce',
      },
      {
        code: 'reduce(operator.mul, [1, 2, 3, 4])',
        output: '24',
        explanation: 'Product using reduce',
      },
      {
        code: 'reduce(lambda acc, x: acc | x, permission_sets, set())',
        output: 'Union of permission sets',
        explanation: 'Merge multiple sets',
      },
    ],
    relatedMethods: ['sum', 'itertools.accumulate'],
    notes: [
      'Prefer sum(), min(), max() for common cases',
      'Use accumulate() to see intermediate results',
    ],
  },

  // ==================== PATHLIB MODULE ====================
  {
    name: 'Path',
    category: 'pathlib',
    syntax: 'Path(path_string)',
    description: 'Object-oriented filesystem paths. Preferred over os.path in modern Python.',
    arguments: [{ name: 'path_string', type: 'str', description: 'Path string' }],
    returns: { type: 'Path', description: 'Path object' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'Path("/home/user/file.txt")',
        output: 'PosixPath object',
        explanation: 'Create path object',
      },
      {
        code: 'Path(__file__).parent / "config.json"',
        output: 'Path relative to script',
        explanation: 'Django settings pattern',
      },
      {
        code: 'BASE_DIR = Path(__file__).resolve().parent.parent',
        output: 'Django BASE_DIR',
        explanation: 'Standard Django settings pattern',
      },
    ],
    relatedMethods: ['os.path', 'Path.exists', 'Path.mkdir'],
    notes: ['Use / operator for path joining', 'Preferred over os.path.join in modern Python'],
  },
  {
    name: 'Path.exists',
    category: 'pathlib',
    syntax: 'path.exists()',
    description: 'Returns True if the path points to an existing file or directory.',
    arguments: [],
    returns: { type: 'bool', description: 'True if path exists' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'Path("/etc/passwd").exists()', output: 'True', explanation: 'Check file exists' },
      {
        code: 'if config_path.exists(): load_config(config_path)',
        output: 'Conditional load',
        explanation: 'Safe file loading pattern',
      },
    ],
    relatedMethods: ['is_file', 'is_dir'],
    notes: ['Follows symlinks', 'Use is_file() or is_dir() for type-specific checks'],
  },
  {
    name: 'Path.read_text',
    category: 'pathlib',
    syntax: 'path.read_text(encoding=None)',
    description: 'Returns the file contents as a string.',
    arguments: [{ name: 'encoding', type: 'str', description: 'Text encoding', optional: true }],
    returns: { type: 'str', description: 'File contents' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      {
        code: 'Path("config.json").read_text()',
        output: 'File contents as string',
        explanation: 'Read file',
      },
      {
        code: 'config = json.loads(Path("config.json").read_text())',
        output: 'Load JSON config',
        explanation: 'One-liner config loading',
      },
    ],
    relatedMethods: ['read_bytes', 'write_text', 'open'],
    notes: ['Simpler than open/read/close pattern', 'Automatically handles file closing'],
  },
  {
    name: 'Path.glob',
    category: 'pathlib',
    syntax: 'path.glob(pattern)',
    description: 'Yields all matching paths based on a glob pattern.',
    arguments: [{ name: 'pattern', type: 'str', description: 'Glob pattern (e.g., "*.py")' }],
    returns: { type: 'generator', description: 'Generator of Path objects' },
    timeComplexity: 'O(n) files in directory',
    spaceComplexity: 'O(1) - generator',
    examples: [
      {
        code: 'list(Path(".").glob("*.py"))',
        output: 'All Python files',
        explanation: 'Find Python files',
      },
      {
        code: 'list(Path(".").glob("**/*.py"))',
        output: 'Recursive Python files',
        explanation: 'Recursive search',
      },
      {
        code: 'for migration in Path("migrations").glob("*.py"): ...',
        output: 'Process migrations',
        explanation: 'Django migration processing',
      },
    ],
    relatedMethods: ['rglob', 'iterdir'],
    notes: [
      'Use ** for recursive matching',
      'rglob(pattern) is shorthand for glob("**/" + pattern)',
    ],
  },

  // ==================== TYPING MODULE ====================
  {
    name: 'type hints',
    category: 'typing',
    syntax: 'def func(arg: Type) -> ReturnType:',
    description:
      'Type annotations for functions and variables. Essential for maintainable Django code.',
    arguments: [],
    returns: { type: 'N/A', description: 'Type hints do not affect runtime' },
    examples: [
      {
        code: 'def greet(name: str) -> str:\n    return f"Hello, {name}"',
        output: 'Type annotated function',
        explanation: 'Basic type hints',
      },
      {
        code: 'def get_user(user_id: int) -> User | None:',
        output: 'Union type with None',
        explanation: 'Optional return type (Python 3.10+)',
      },
      {
        code: 'def process_items(items: list[dict[str, Any]]) -> list[int]:',
        output: 'Generic types',
        explanation: 'Complex type annotations',
      },
      {
        code: 'class UserService:\n    def __init__(self, repo: UserRepository) -> None:',
        output: 'Dependency injection',
        explanation: 'Django service pattern with types',
      },
    ],
    relatedMethods: ['Optional', 'Union', 'List', 'Dict'],
    notes: [
      'Use mypy for static type checking',
      'Types are not enforced at runtime',
      'Essential for large Django projects',
    ],
    sinceVersion: '3.5',
  },
  {
    name: 'Optional',
    category: 'typing',
    syntax: 'Optional[Type] or Type | None',
    description: 'Indicates a value that could be the specified type or None.',
    arguments: [{ name: 'Type', type: 'type', description: 'The non-None type' }],
    returns: { type: 'type alias', description: 'Type that allows None' },
    examples: [
      {
        code: 'def find_user(email: str) -> Optional[User]:',
        output: 'Returns User or None',
        explanation: 'Optional return type',
      },
      {
        code: 'def process(data: str | None = None) -> None:',
        output: 'Optional parameter',
        explanation: 'Python 3.10+ syntax',
      },
      {
        code: 'user: User | None = User.objects.filter(email=email).first()',
        output: 'Optional queryset result',
        explanation: 'Django first() returns None if not found',
      },
    ],
    relatedMethods: ['Union', 'type hints'],
    notes: ['Optional[X] is equivalent to Union[X, None]', 'Python 3.10+ allows X | None syntax'],
  },

  // ==================== WEB/DJANGO PATTERNS ====================
  {
    name: 'getattr',
    category: 'builtins',
    syntax: 'getattr(object, name, default)',
    description:
      'Returns the value of a named attribute. Essential for dynamic attribute access in Django.',
    arguments: [
      { name: 'object', type: 'any', description: 'Object to get attribute from' },
      { name: 'name', type: 'str', description: 'Attribute name' },
      {
        name: 'default',
        type: 'any',
        description: 'Default if attribute not found',
        optional: true,
      },
    ],
    returns: { type: 'any', description: 'Attribute value or default' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'getattr(user, "email", "")',
        output: 'User email or empty string',
        explanation: 'Safe attribute access',
      },
      {
        code: 'fields = ["name", "email"]\n{f: getattr(obj, f) for f in fields}',
        output: 'Dynamic serialization',
        explanation: 'Building dict from fields list',
      },
      {
        code: 'method = getattr(self, f"handle_{action}", self.handle_default)',
        output: 'Dynamic method dispatch',
        explanation: 'Strategy pattern - Django view dispatch',
      },
    ],
    relatedMethods: ['setattr', 'hasattr', 'delattr'],
    notes: ['Core to Django model serialization', 'Use for dynamic attribute access patterns'],
  },
  {
    name: 'hasattr',
    category: 'builtins',
    syntax: 'hasattr(object, name)',
    description: 'Returns True if the object has the named attribute.',
    arguments: [
      { name: 'object', type: 'any', description: 'Object to check' },
      { name: 'name', type: 'str', description: 'Attribute name' },
    ],
    returns: { type: 'bool', description: 'True if attribute exists' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'hasattr(user, "profile")',
        output: 'True if user has profile',
        explanation: 'Check attribute existence',
      },
      {
        code: 'if hasattr(request, "user") and request.user.is_authenticated:',
        output: 'Safe auth check',
        explanation: 'Django request checking',
      },
      {
        code: 'duck_typing = hasattr(obj, "read") and hasattr(obj, "write")',
        output: 'Duck typing check',
        explanation: 'File-like object detection',
      },
    ],
    relatedMethods: ['getattr', 'setattr'],
    notes: [
      'Duck typing pattern - check capabilities, not types',
      'May call __getattr__ which could have side effects',
    ],
  },
  {
    name: 'setattr',
    category: 'builtins',
    syntax: 'setattr(object, name, value)',
    description: 'Sets the value of a named attribute on an object.',
    arguments: [
      { name: 'object', type: 'any', description: 'Object to modify' },
      { name: 'name', type: 'str', description: 'Attribute name' },
      { name: 'value', type: 'any', description: 'Value to set' },
    ],
    returns: { type: 'None', description: 'Modifies object in place' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'setattr(user, "email", new_email)',
        output: 'Set user email',
        explanation: 'Dynamic attribute setting',
      },
      {
        code: 'for field, value in data.items():\n    setattr(instance, field, value)',
        output: 'Bulk update from dict',
        explanation: 'Django model update pattern',
      },
      {
        code: 'setattr(settings, "DEBUG", False)',
        output: 'Modify settings',
        explanation: 'Runtime settings modification (testing)',
      },
    ],
    relatedMethods: ['getattr', 'hasattr'],
    notes: [
      'Use for dynamic attribute assignment',
      'Common in Django model serialization/deserialization',
    ],
  },
  {
    name: 'isinstance',
    category: 'builtins',
    syntax: 'isinstance(object, classinfo)',
    description: 'Returns True if object is an instance of classinfo.',
    arguments: [
      { name: 'object', type: 'any', description: 'Object to check' },
      { name: 'classinfo', type: 'type | tuple', description: 'Class or tuple of classes' },
    ],
    returns: { type: 'bool', description: 'True if instance matches' },
    timeComplexity: 'O(n) where n is inheritance depth',
    spaceComplexity: 'O(1)',
    examples: [
      { code: 'isinstance("hello", str)', output: 'True', explanation: 'Type check' },
      {
        code: 'isinstance(data, (list, tuple))',
        output: 'True for list or tuple',
        explanation: 'Multiple type check',
      },
      {
        code: 'if isinstance(error, ValidationError):\n    return JsonResponse({"errors": error.messages}, status=400)',
        output: 'Error type handling',
        explanation: 'Django exception handling',
      },
    ],
    relatedMethods: ['type', 'issubclass'],
    notes: ['Prefer duck typing when possible', 'Use for exception handling and input validation'],
  },
  {
    name: 'repr',
    category: 'builtins',
    syntax: 'repr(object)',
    description:
      'Returns a string representation that could recreate the object. Essential for debugging.',
    arguments: [{ name: 'object', type: 'any', description: 'Object to represent' }],
    returns: { type: 'str', description: 'String representation' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: 'repr("hello")', output: '"\'hello\'"', explanation: 'String repr with quotes' },
      {
        code: 'repr(datetime.now())',
        output: "'datetime.datetime(2024, 1, 15, ...)'",
        explanation: 'Datetime repr',
      },
      {
        code: 'def __repr__(self):\n    return f"User(id={self.id}, email={self.email!r})"',
        output: 'Custom __repr__',
        explanation: 'Django model __repr__ pattern',
      },
    ],
    relatedMethods: ['str', '__repr__'],
    notes: [
      'Use !r in f-strings for repr: f"{var!r}"',
      'Implement __repr__ for custom classes for better debugging',
    ],
  },
  {
    name: 'vars',
    category: 'builtins',
    syntax: 'vars(object)',
    description: 'Returns the __dict__ attribute of an object.',
    arguments: [{ name: 'object', type: 'any', description: 'Object to inspect', optional: true }],
    returns: { type: 'dict', description: "Object's namespace dictionary" },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    examples: [
      {
        code: 'vars(user)',
        output: "{'id': 1, 'name': 'Alice', ...}",
        explanation: 'Object attributes as dict',
      },
      {
        code: '{k: v for k, v in vars(obj).items() if not k.startswith("_")}',
        output: 'Public attributes only',
        explanation: 'Filter private attributes',
      },
      {
        code: 'json.dumps({k: v for k, v in vars(model).items() if not k.startswith("_")})',
        output: 'Simple serialization',
        explanation: 'Quick model serialization (careful with relations)',
      },
    ],
    relatedMethods: ['dir', '__dict__', 'getattr'],
    notes: ['Does not include inherited attributes', 'Use model_to_dict() for Django models'],
  },
  {
    name: 'dir',
    category: 'builtins',
    syntax: 'dir(object)',
    description: 'Returns a list of valid attributes for the object.',
    arguments: [{ name: 'object', type: 'any', description: 'Object to inspect', optional: true }],
    returns: { type: 'list', description: 'List of attribute names' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    examples: [
      { code: 'dir([])', output: "['append', 'clear', 'copy', ...]", explanation: 'List methods' },
      {
        code: '[m for m in dir(obj) if not m.startswith("_")]',
        output: 'Public methods/attributes',
        explanation: 'Filter dunder methods',
      },
      {
        code: '[m for m in dir(User) if not m.startswith("_")]',
        output: 'Model fields and methods',
        explanation: 'Exploring Django model',
      },
    ],
    relatedMethods: ['vars', 'help', 'inspect'],
    notes: ['Includes inherited attributes', 'Useful for interactive exploration'],
  },
];

// Get methods by language
export function getMethodsByLanguage(language: LanguageId): Method[] {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return javascriptMethods;
    case 'python':
      return pythonMethods;
    default:
      return javascriptMethods;
  }
}

// Get categories for a language
export function getCategoriesForLanguage(language: LanguageId): string[] {
  const methods = getMethodsByLanguage(language);
  const categories = new Set(methods.map((m) => m.category));
  return Array.from(categories);
}

// Get method counts per category
export function getCategoryCountsForLanguage(language: LanguageId): Record<string, number> {
  const methods = getMethodsByLanguage(language);
  const counts: Record<string, number> = {};
  for (const method of methods) {
    counts[method.category] = (counts[method.category] || 0) + 1;
  }
  return counts;
}

// Get methods by category
export function getMethodsByCategory(language: LanguageId, category: string): Method[] {
  const methods = getMethodsByLanguage(language);
  return methods.filter((m) => m.category === category);
}
