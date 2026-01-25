import { Problem, Method, LanguageId } from './types';

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
    description: 'Creates a new array with the results of calling a provided function on every element',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Function to execute on each element' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true }
    ],
    returns: { type: 'Array', description: 'A new array with each element being the result of the callback' },
    examples: [
      { code: '[1, 2, 3].map(x => x * 2)', output: '[2, 4, 6]', explanation: 'Doubles each element' },
      { code: '["a", "b"].map(s => s.toUpperCase())', output: '["A", "B"]', explanation: 'Converts to uppercase' }
    ],
    relatedMethods: ['filter', 'reduce', 'forEach']
  },
  {
    name: 'filter',
    category: 'arrays',
    syntax: 'array.filter(callback(element, index, array), thisArg)',
    description: 'Creates a new array with all elements that pass the test implemented by the provided function',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Test function to execute on each element' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true }
    ],
    returns: { type: 'Array', description: 'A new array with elements that pass the test' },
    examples: [
      { code: '[1, 2, 3, 4, 5].filter(x => x > 3)', output: '[4, 5]', explanation: 'Keeps elements greater than 3' },
      { code: '["apple", "banana", "cherry"].filter(s => s.length > 5)', output: '["banana", "cherry"]', explanation: 'Keeps strings longer than 5 chars' }
    ],
    relatedMethods: ['map', 'find', 'some']
  },
  {
    name: 'reduce',
    category: 'arrays',
    syntax: 'array.reduce(callback(accumulator, currentValue, index, array), initialValue)',
    description: 'Executes a reducer function on each element, resulting in a single output value',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Reducer function to execute' },
      { name: 'initialValue', type: 'any', description: 'Initial value for accumulator', optional: true }
    ],
    returns: { type: 'any', description: 'The single value that results from the reduction' },
    examples: [
      { code: '[1, 2, 3, 4].reduce((acc, x) => acc + x, 0)', output: '10', explanation: 'Sums all elements' },
      { code: '[[1, 2], [3, 4]].reduce((acc, x) => acc.concat(x), [])', output: '[1, 2, 3, 4]', explanation: 'Flattens nested arrays' }
    ],
    relatedMethods: ['reduceRight', 'map', 'filter']
  },
  {
    name: 'find',
    category: 'arrays',
    syntax: 'array.find(callback(element, index, array), thisArg)',
    description: 'Returns the first element in the array that satisfies the provided testing function',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Test function to execute on each element' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true }
    ],
    returns: { type: 'any', description: 'The first element that passes the test, or undefined' },
    examples: [
      { code: '[1, 5, 10, 15].find(x => x > 8)', output: '10', explanation: 'Finds first element > 8' },
      { code: '[{id: 1}, {id: 2}].find(obj => obj.id === 2)', output: '{id: 2}', explanation: 'Finds object by property' }
    ],
    relatedMethods: ['findIndex', 'filter', 'some']
  },
  {
    name: 'findIndex',
    category: 'arrays',
    syntax: 'array.findIndex(callback(element, index, array), thisArg)',
    description: 'Returns the index of the first element that satisfies the provided testing function',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Test function to execute on each element' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true }
    ],
    returns: { type: 'number', description: 'The index of the first matching element, or -1' },
    examples: [
      { code: '[1, 5, 10, 15].findIndex(x => x > 8)', output: '2', explanation: 'Returns index of first element > 8' },
      { code: '["a", "b", "c"].findIndex(s => s === "b")', output: '1', explanation: 'Returns index of "b"' }
    ],
    relatedMethods: ['find', 'indexOf', 'includes']
  },
  {
    name: 'some',
    category: 'arrays',
    syntax: 'array.some(callback(element, index, array), thisArg)',
    description: 'Tests whether at least one element in the array passes the test',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Test function to execute' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true }
    ],
    returns: { type: 'boolean', description: 'true if at least one element passes the test' },
    examples: [
      { code: '[1, 2, 3].some(x => x > 2)', output: 'true', explanation: 'Returns true because 3 > 2' },
      { code: '[1, 2, 3].some(x => x > 5)', output: 'false', explanation: 'Returns false, no element > 5' }
    ],
    relatedMethods: ['every', 'find', 'filter']
  },
  {
    name: 'every',
    category: 'arrays',
    syntax: 'array.every(callback(element, index, array), thisArg)',
    description: 'Tests whether all elements in the array pass the test implemented by the provided function',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Test function to execute' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true }
    ],
    returns: { type: 'boolean', description: 'true if all elements pass the test' },
    examples: [
      { code: '[2, 4, 6].every(x => x % 2 === 0)', output: 'true', explanation: 'All elements are even' },
      { code: '[2, 3, 4].every(x => x % 2 === 0)', output: 'false', explanation: '3 is not even' }
    ],
    relatedMethods: ['some', 'filter', 'find']
  },
  {
    name: 'includes',
    category: 'arrays',
    syntax: 'array.includes(searchElement, fromIndex)',
    description: 'Determines whether an array includes a certain value among its entries',
    arguments: [
      { name: 'searchElement', type: 'any', description: 'The value to search for' },
      { name: 'fromIndex', type: 'number', description: 'Index to start search from', optional: true }
    ],
    returns: { type: 'boolean', description: 'true if the value is found' },
    examples: [
      { code: '[1, 2, 3].includes(2)', output: 'true', explanation: 'Array contains 2' },
      { code: '["a", "b", "c"].includes("d")', output: 'false', explanation: 'Array does not contain "d"' }
    ],
    relatedMethods: ['indexOf', 'find', 'some']
  },
  {
    name: 'indexOf',
    category: 'arrays',
    syntax: 'array.indexOf(searchElement, fromIndex)',
    description: 'Returns the first index at which a given element can be found, or -1 if not present',
    arguments: [
      { name: 'searchElement', type: 'any', description: 'Element to locate' },
      { name: 'fromIndex', type: 'number', description: 'Index to start search from', optional: true }
    ],
    returns: { type: 'number', description: 'The first index of the element, or -1' },
    examples: [
      { code: '["a", "b", "c"].indexOf("b")', output: '1', explanation: '"b" is at index 1' },
      { code: '[1, 2, 3, 2].indexOf(2)', output: '1', explanation: 'First occurrence of 2 is at index 1' }
    ],
    relatedMethods: ['lastIndexOf', 'includes', 'findIndex']
  },
  {
    name: 'slice',
    category: 'arrays',
    syntax: 'array.slice(start, end)',
    description: 'Returns a shallow copy of a portion of an array into a new array',
    arguments: [
      { name: 'start', type: 'number', description: 'Start index (inclusive)', optional: true },
      { name: 'end', type: 'number', description: 'End index (exclusive)', optional: true }
    ],
    returns: { type: 'Array', description: 'A new array containing the extracted elements' },
    examples: [
      { code: '[1, 2, 3, 4, 5].slice(1, 4)', output: '[2, 3, 4]', explanation: 'Extracts from index 1 to 3' },
      { code: '[1, 2, 3, 4, 5].slice(-2)', output: '[4, 5]', explanation: 'Extracts last 2 elements' }
    ],
    relatedMethods: ['splice', 'concat', 'substring']
  },
  {
    name: 'splice',
    category: 'arrays',
    syntax: 'array.splice(start, deleteCount, item1, item2, ...)',
    description: 'Changes the contents of an array by removing or replacing elements and/or adding new elements',
    arguments: [
      { name: 'start', type: 'number', description: 'Index to start changing the array' },
      { name: 'deleteCount', type: 'number', description: 'Number of elements to remove', optional: true },
      { name: 'items', type: 'any', description: 'Elements to add', optional: true }
    ],
    returns: { type: 'Array', description: 'An array containing the deleted elements' },
    examples: [
      { code: '[1, 2, 3, 4].splice(1, 2)', output: '[2, 3]', explanation: 'Removes 2 elements starting at index 1' },
      { code: 'const arr = [1, 4]; arr.splice(1, 0, 2, 3); arr', output: '[1, 2, 3, 4]', explanation: 'Inserts elements' }
    ],
    relatedMethods: ['slice', 'push', 'pop']
  },
  {
    name: 'concat',
    category: 'arrays',
    syntax: 'array.concat(value1, value2, ...)',
    description: 'Merges two or more arrays or values into a new array',
    arguments: [
      { name: 'values', type: 'any', description: 'Arrays or values to concatenate' }
    ],
    returns: { type: 'Array', description: 'A new array with all elements combined' },
    examples: [
      { code: '[1, 2].concat([3, 4])', output: '[1, 2, 3, 4]', explanation: 'Concatenates two arrays' },
      { code: '[1].concat(2, [3, 4])', output: '[1, 2, 3, 4]', explanation: 'Concatenates value and array' }
    ],
    relatedMethods: ['push', 'spread operator', 'join']
  },
  {
    name: 'join',
    category: 'arrays',
    syntax: 'array.join(separator)',
    description: 'Joins all elements of an array into a string, separated by the specified separator',
    arguments: [
      { name: 'separator', type: 'string', description: 'String to separate elements', optional: true }
    ],
    returns: { type: 'string', description: 'A string with all array elements joined' },
    examples: [
      { code: '["a", "b", "c"].join("-")', output: '"a-b-c"', explanation: 'Joins with hyphen' },
      { code: '[1, 2, 3].join("")', output: '"123"', explanation: 'Joins without separator' }
    ],
    relatedMethods: ['split', 'toString', 'concat']
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
      { code: '["a", "b", "c"].reverse()', output: '["c", "b", "a"]', explanation: 'Reverses string array' }
    ],
    relatedMethods: ['sort', 'toReversed']
  },
  {
    name: 'sort',
    category: 'arrays',
    syntax: 'array.sort(compareFunction)',
    description: 'Sorts the elements of an array in place and returns the sorted array',
    arguments: [
      { name: 'compareFunction', type: 'Function', description: 'Function that defines the sort order', optional: true }
    ],
    returns: { type: 'Array', description: 'The sorted array (same reference)' },
    examples: [
      { code: '[3, 1, 2].sort()', output: '[1, 2, 3]', explanation: 'Default sort (string conversion)' },
      { code: '[3, 1, 2].sort((a, b) => b - a)', output: '[3, 2, 1]', explanation: 'Descending numeric sort' }
    ],
    relatedMethods: ['reverse', 'toSorted']
  },
  {
    name: 'flat',
    category: 'arrays',
    syntax: 'array.flat(depth)',
    description: 'Creates a new array with all sub-array elements concatenated up to the specified depth',
    arguments: [
      { name: 'depth', type: 'number', description: 'How deep to flatten (default: 1)', optional: true }
    ],
    returns: { type: 'Array', description: 'A new flattened array' },
    examples: [
      { code: '[[1, 2], [3, 4]].flat()', output: '[1, 2, 3, 4]', explanation: 'Flattens one level' },
      { code: '[1, [2, [3, [4]]]].flat(2)', output: '[1, 2, 3, [4]]', explanation: 'Flattens two levels' }
    ],
    relatedMethods: ['flatMap', 'concat', 'reduce']
  },
  {
    name: 'flatMap',
    category: 'arrays',
    syntax: 'array.flatMap(callback(element, index, array), thisArg)',
    description: 'Maps each element using a function, then flattens the result into a new array',
    arguments: [
      { name: 'callback', type: 'Function', description: 'Function to execute on each element' },
      { name: 'thisArg', type: 'any', description: 'Value to use as this', optional: true }
    ],
    returns: { type: 'Array', description: 'A new flattened array' },
    examples: [
      { code: '[1, 2].flatMap(x => [x, x * 2])', output: '[1, 2, 2, 4]', explanation: 'Maps and flattens' },
      { code: '["hello world"].flatMap(s => s.split(" "))', output: '["hello", "world"]', explanation: 'Splits and flattens' }
    ],
    relatedMethods: ['flat', 'map', 'reduce']
  },
  {
    name: 'fill',
    category: 'arrays',
    syntax: 'array.fill(value, start, end)',
    description: 'Fills all the elements of an array with a static value',
    arguments: [
      { name: 'value', type: 'any', description: 'Value to fill the array with' },
      { name: 'start', type: 'number', description: 'Start index', optional: true },
      { name: 'end', type: 'number', description: 'End index', optional: true }
    ],
    returns: { type: 'Array', description: 'The modified array' },
    examples: [
      { code: '[1, 2, 3].fill(0)', output: '[0, 0, 0]', explanation: 'Fills entire array with 0' },
      { code: '[1, 2, 3, 4].fill(0, 1, 3)', output: '[1, 0, 0, 4]', explanation: 'Fills from index 1 to 2' }
    ],
    relatedMethods: ['copyWithin', 'Array.from']
  },
  // String Methods
  {
    name: 'split',
    category: 'strings',
    syntax: 'string.split(separator, limit)',
    description: 'Divides a string into an ordered list of substrings and returns them as an array',
    arguments: [
      { name: 'separator', type: 'string | RegExp', description: 'Pattern to split by' },
      { name: 'limit', type: 'number', description: 'Maximum number of splits', optional: true }
    ],
    returns: { type: 'Array<string>', description: 'An array of strings' },
    examples: [
      { code: '"a-b-c".split("-")', output: '["a", "b", "c"]', explanation: 'Splits by hyphen' },
      { code: '"hello".split("")', output: '["h", "e", "l", "l", "o"]', explanation: 'Splits into characters' }
    ],
    relatedMethods: ['join', 'slice', 'substring']
  },
  {
    name: 'substring',
    category: 'strings',
    syntax: 'string.substring(start, end)',
    description: 'Returns the part of the string between the start and end indexes',
    arguments: [
      { name: 'start', type: 'number', description: 'Index of first character to include' },
      { name: 'end', type: 'number', description: 'Index of first character to exclude', optional: true }
    ],
    returns: { type: 'string', description: 'A new string containing the specified part' },
    examples: [
      { code: '"hello world".substring(0, 5)', output: '"hello"', explanation: 'Extracts first 5 characters' },
      { code: '"hello world".substring(6)', output: '"world"', explanation: 'Extracts from index 6 to end' }
    ],
    relatedMethods: ['slice', 'substr', 'split']
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
      { code: '"HeLLo WoRLd".toLowerCase()', output: '"hello world"', explanation: 'Normalizes case' }
    ],
    relatedMethods: ['toUpperCase', 'toLocaleLowerCase']
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
      { code: '"Hello World".toUpperCase()', output: '"HELLO WORLD"', explanation: 'Converts entire string' }
    ],
    relatedMethods: ['toLowerCase', 'toLocaleUpperCase']
  },
  {
    name: 'trim',
    category: 'strings',
    syntax: 'string.trim()',
    description: 'Removes whitespace from both ends of the string',
    arguments: [],
    returns: { type: 'string', description: 'A new string with whitespace removed from both ends' },
    examples: [
      { code: '"  hello  ".trim()', output: '"hello"', explanation: 'Removes leading and trailing spaces' },
      { code: '"\\n\\thello\\n\\t".trim()', output: '"hello"', explanation: 'Removes all whitespace types' }
    ],
    relatedMethods: ['trimStart', 'trimEnd']
  },
  {
    name: 'replace',
    category: 'strings',
    syntax: 'string.replace(pattern, replacement)',
    description: 'Returns a new string with some or all matches of a pattern replaced',
    arguments: [
      { name: 'pattern', type: 'string | RegExp', description: 'Pattern to search for' },
      { name: 'replacement', type: 'string | Function', description: 'Replacement string or function' }
    ],
    returns: { type: 'string', description: 'A new string with replacements made' },
    examples: [
      { code: '"hello world".replace("world", "there")', output: '"hello there"', explanation: 'Replaces first match' },
      { code: '"aaa".replace(/a/g, "b")', output: '"bbb"', explanation: 'Replaces all matches with regex' }
    ],
    relatedMethods: ['replaceAll', 'match', 'search']
  },
  {
    name: 'replaceAll',
    category: 'strings',
    syntax: 'string.replaceAll(pattern, replacement)',
    description: 'Returns a new string with all matches of a pattern replaced',
    arguments: [
      { name: 'pattern', type: 'string | RegExp', description: 'Pattern to search for' },
      { name: 'replacement', type: 'string | Function', description: 'Replacement string or function' }
    ],
    returns: { type: 'string', description: 'A new string with all replacements made' },
    examples: [
      { code: '"aaa".replaceAll("a", "b")', output: '"bbb"', explanation: 'Replaces all occurrences' },
      { code: '"hello-world-test".replaceAll("-", "_")', output: '"hello_world_test"', explanation: 'Replaces all hyphens' }
    ],
    relatedMethods: ['replace', 'split', 'join']
  },
  {
    name: 'startsWith',
    category: 'strings',
    syntax: 'string.startsWith(searchString, position)',
    description: 'Determines whether a string begins with the characters of a specified string',
    arguments: [
      { name: 'searchString', type: 'string', description: 'Characters to search for' },
      { name: 'position', type: 'number', description: 'Position to start search from', optional: true }
    ],
    returns: { type: 'boolean', description: 'true if string starts with the search string' },
    examples: [
      { code: '"hello world".startsWith("hello")', output: 'true', explanation: 'Starts with "hello"' },
      { code: '"hello world".startsWith("world")', output: 'false', explanation: 'Does not start with "world"' }
    ],
    relatedMethods: ['endsWith', 'includes', 'indexOf']
  },
  {
    name: 'endsWith',
    category: 'strings',
    syntax: 'string.endsWith(searchString, length)',
    description: 'Determines whether a string ends with the characters of a specified string',
    arguments: [
      { name: 'searchString', type: 'string', description: 'Characters to search for' },
      { name: 'length', type: 'number', description: 'Length of string to search within', optional: true }
    ],
    returns: { type: 'boolean', description: 'true if string ends with the search string' },
    examples: [
      { code: '"hello world".endsWith("world")', output: 'true', explanation: 'Ends with "world"' },
      { code: '"hello world".endsWith("hello")', output: 'false', explanation: 'Does not end with "hello"' }
    ],
    relatedMethods: ['startsWith', 'includes', 'lastIndexOf']
  },
  {
    name: 'padStart',
    category: 'strings',
    syntax: 'string.padStart(targetLength, padString)',
    description: 'Pads the current string from the start with another string until the target length is reached',
    arguments: [
      { name: 'targetLength', type: 'number', description: 'Target length of the resulting string' },
      { name: 'padString', type: 'string', description: 'String to pad with', optional: true }
    ],
    returns: { type: 'string', description: 'A new padded string' },
    examples: [
      { code: '"5".padStart(3, "0")', output: '"005"', explanation: 'Pads with zeros' },
      { code: '"abc".padStart(6, "123")', output: '"123abc"', explanation: 'Pads with "123"' }
    ],
    relatedMethods: ['padEnd', 'repeat']
  },
  {
    name: 'padEnd',
    category: 'strings',
    syntax: 'string.padEnd(targetLength, padString)',
    description: 'Pads the current string from the end with another string until the target length is reached',
    arguments: [
      { name: 'targetLength', type: 'number', description: 'Target length of the resulting string' },
      { name: 'padString', type: 'string', description: 'String to pad with', optional: true }
    ],
    returns: { type: 'string', description: 'A new padded string' },
    examples: [
      { code: '"5".padEnd(3, "0")', output: '"500"', explanation: 'Pads with zeros at end' },
      { code: '"abc".padEnd(6, "123")', output: '"abc123"', explanation: 'Pads with "123" at end' }
    ],
    relatedMethods: ['padStart', 'repeat']
  },
  {
    name: 'repeat',
    category: 'strings',
    syntax: 'string.repeat(count)',
    description: 'Returns a new string consisting of the specified number of copies of the string',
    arguments: [
      { name: 'count', type: 'number', description: 'Number of times to repeat' }
    ],
    returns: { type: 'string', description: 'A new repeated string' },
    examples: [
      { code: '"abc".repeat(3)', output: '"abcabcabc"', explanation: 'Repeats 3 times' },
      { code: '"*".repeat(5)', output: '"*****"', explanation: 'Creates 5 asterisks' }
    ],
    relatedMethods: ['padStart', 'padEnd', 'concat']
  },
  {
    name: 'charAt',
    category: 'strings',
    syntax: 'string.charAt(index)',
    description: 'Returns the character at the specified index',
    arguments: [
      { name: 'index', type: 'number', description: 'Index of the character' }
    ],
    returns: { type: 'string', description: 'The character at the index, or empty string' },
    examples: [
      { code: '"hello".charAt(1)', output: '"e"', explanation: 'Returns character at index 1' },
      { code: '"hello".charAt(0)', output: '"h"', explanation: 'Returns first character' }
    ],
    relatedMethods: ['charCodeAt', 'at', 'indexOf']
  },
  // Object Methods
  {
    name: 'Object.keys',
    category: 'objects',
    syntax: 'Object.keys(obj)',
    description: 'Returns an array of a given object\'s own enumerable string-keyed property names',
    arguments: [
      { name: 'obj', type: 'object', description: 'The object to get keys from' }
    ],
    returns: { type: 'Array<string>', description: 'An array of property names' },
    examples: [
      { code: 'Object.keys({a: 1, b: 2})', output: '["a", "b"]', explanation: 'Gets object keys' },
      { code: 'Object.keys([1, 2, 3])', output: '["0", "1", "2"]', explanation: 'Gets array indices as strings' }
    ],
    relatedMethods: ['Object.values', 'Object.entries', 'Object.getOwnPropertyNames']
  },
  {
    name: 'Object.values',
    category: 'objects',
    syntax: 'Object.values(obj)',
    description: 'Returns an array of a given object\'s own enumerable property values',
    arguments: [
      { name: 'obj', type: 'object', description: 'The object to get values from' }
    ],
    returns: { type: 'Array', description: 'An array of property values' },
    examples: [
      { code: 'Object.values({a: 1, b: 2})', output: '[1, 2]', explanation: 'Gets object values' },
      { code: 'Object.values({name: "John", age: 30})', output: '["John", 30]', explanation: 'Gets mixed type values' }
    ],
    relatedMethods: ['Object.keys', 'Object.entries', 'Object.fromEntries']
  },
  {
    name: 'Object.entries',
    category: 'objects',
    syntax: 'Object.entries(obj)',
    description: 'Returns an array of a given object\'s own enumerable string-keyed property [key, value] pairs',
    arguments: [
      { name: 'obj', type: 'object', description: 'The object to get entries from' }
    ],
    returns: { type: 'Array<[string, any]>', description: 'An array of [key, value] pairs' },
    examples: [
      { code: 'Object.entries({a: 1, b: 2})', output: '[["a", 1], ["b", 2]]', explanation: 'Gets key-value pairs' },
      { code: 'Object.entries({x: "hello"})', output: '[["x", "hello"]]', explanation: 'Single entry' }
    ],
    relatedMethods: ['Object.keys', 'Object.values', 'Object.fromEntries']
  },
  {
    name: 'Object.assign',
    category: 'objects',
    syntax: 'Object.assign(target, ...sources)',
    description: 'Copies all enumerable own properties from one or more source objects to a target object',
    arguments: [
      { name: 'target', type: 'object', description: 'The target object to copy to' },
      { name: 'sources', type: 'object', description: 'The source objects to copy from' }
    ],
    returns: { type: 'object', description: 'The modified target object' },
    examples: [
      { code: 'Object.assign({a: 1}, {b: 2})', output: '{a: 1, b: 2}', explanation: 'Merges objects' },
      { code: 'Object.assign({}, {a: 1}, {a: 2})', output: '{a: 2}', explanation: 'Later values override' }
    ],
    relatedMethods: ['spread operator', 'Object.fromEntries']
  },
  {
    name: 'Object.fromEntries',
    category: 'objects',
    syntax: 'Object.fromEntries(iterable)',
    description: 'Transforms a list of key-value pairs into an object',
    arguments: [
      { name: 'iterable', type: 'Iterable', description: 'Iterable of key-value pairs' }
    ],
    returns: { type: 'object', description: 'A new object' },
    examples: [
      { code: 'Object.fromEntries([["a", 1], ["b", 2]])', output: '{a: 1, b: 2}', explanation: 'Creates object from entries' },
      { code: 'Object.fromEntries(new Map([["key", "value"]]))', output: '{key: "value"}', explanation: 'Converts Map to object' }
    ],
    relatedMethods: ['Object.entries', 'Map', 'Object.assign']
  },
  // Number/Math Methods
  {
    name: 'Math.max',
    category: 'math',
    syntax: 'Math.max(value1, value2, ...)',
    description: 'Returns the largest of the given numbers',
    arguments: [
      { name: 'values', type: 'number', description: 'Numbers to compare' }
    ],
    returns: { type: 'number', description: 'The largest number' },
    examples: [
      { code: 'Math.max(1, 5, 3)', output: '5', explanation: 'Returns largest of 1, 5, 3' },
      { code: 'Math.max(...[1, 2, 3])', output: '3', explanation: 'Works with spread array' }
    ],
    relatedMethods: ['Math.min', 'Math.abs']
  },
  {
    name: 'Math.min',
    category: 'math',
    syntax: 'Math.min(value1, value2, ...)',
    description: 'Returns the smallest of the given numbers',
    arguments: [
      { name: 'values', type: 'number', description: 'Numbers to compare' }
    ],
    returns: { type: 'number', description: 'The smallest number' },
    examples: [
      { code: 'Math.min(1, 5, 3)', output: '1', explanation: 'Returns smallest of 1, 5, 3' },
      { code: 'Math.min(...[4, 2, 8])', output: '2', explanation: 'Works with spread array' }
    ],
    relatedMethods: ['Math.max', 'Math.abs']
  },
  {
    name: 'Math.floor',
    category: 'math',
    syntax: 'Math.floor(x)',
    description: 'Returns the largest integer less than or equal to a given number',
    arguments: [
      { name: 'x', type: 'number', description: 'A number' }
    ],
    returns: { type: 'number', description: 'The largest integer <= x' },
    examples: [
      { code: 'Math.floor(4.7)', output: '4', explanation: 'Rounds down to 4' },
      { code: 'Math.floor(-4.1)', output: '-5', explanation: 'Rounds down to -5' }
    ],
    relatedMethods: ['Math.ceil', 'Math.round', 'Math.trunc']
  },
  {
    name: 'Math.ceil',
    category: 'math',
    syntax: 'Math.ceil(x)',
    description: 'Returns the smallest integer greater than or equal to a given number',
    arguments: [
      { name: 'x', type: 'number', description: 'A number' }
    ],
    returns: { type: 'number', description: 'The smallest integer >= x' },
    examples: [
      { code: 'Math.ceil(4.1)', output: '5', explanation: 'Rounds up to 5' },
      { code: 'Math.ceil(-4.7)', output: '-4', explanation: 'Rounds up to -4' }
    ],
    relatedMethods: ['Math.floor', 'Math.round', 'Math.trunc']
  },
  {
    name: 'Math.round',
    category: 'math',
    syntax: 'Math.round(x)',
    description: 'Returns the value of a number rounded to the nearest integer',
    arguments: [
      { name: 'x', type: 'number', description: 'A number' }
    ],
    returns: { type: 'number', description: 'The nearest integer' },
    examples: [
      { code: 'Math.round(4.5)', output: '5', explanation: 'Rounds up at .5' },
      { code: 'Math.round(4.4)', output: '4', explanation: 'Rounds down below .5' }
    ],
    relatedMethods: ['Math.floor', 'Math.ceil', 'Math.trunc']
  },
  {
    name: 'Math.abs',
    category: 'math',
    syntax: 'Math.abs(x)',
    description: 'Returns the absolute value of a number',
    arguments: [
      { name: 'x', type: 'number', description: 'A number' }
    ],
    returns: { type: 'number', description: 'The absolute value of x' },
    examples: [
      { code: 'Math.abs(-5)', output: '5', explanation: 'Returns positive value' },
      { code: 'Math.abs(5)', output: '5', explanation: 'Positive stays positive' }
    ],
    relatedMethods: ['Math.sign', 'Math.max', 'Math.min']
  },
  {
    name: 'Math.pow',
    category: 'math',
    syntax: 'Math.pow(base, exponent)',
    description: 'Returns the base to the exponent power',
    arguments: [
      { name: 'base', type: 'number', description: 'The base number' },
      { name: 'exponent', type: 'number', description: 'The exponent' }
    ],
    returns: { type: 'number', description: 'base raised to the power of exponent' },
    examples: [
      { code: 'Math.pow(2, 3)', output: '8', explanation: '2 to the power of 3' },
      { code: 'Math.pow(4, 0.5)', output: '2', explanation: 'Square root of 4' }
    ],
    relatedMethods: ['Math.sqrt', 'Math.cbrt', '** operator']
  },
  {
    name: 'Math.sqrt',
    category: 'math',
    syntax: 'Math.sqrt(x)',
    description: 'Returns the square root of a number',
    arguments: [
      { name: 'x', type: 'number', description: 'A non-negative number' }
    ],
    returns: { type: 'number', description: 'The square root of x' },
    examples: [
      { code: 'Math.sqrt(16)', output: '4', explanation: 'Square root of 16' },
      { code: 'Math.sqrt(2)', output: '1.4142135623730951', explanation: 'Square root of 2' }
    ],
    relatedMethods: ['Math.pow', 'Math.cbrt']
  },
  {
    name: 'Number.parseInt',
    category: 'numbers',
    syntax: 'Number.parseInt(string, radix)',
    description: 'Parses a string argument and returns an integer of the specified radix',
    arguments: [
      { name: 'string', type: 'string', description: 'The string to parse' },
      { name: 'radix', type: 'number', description: 'Base of the numeral system (2-36)', optional: true }
    ],
    returns: { type: 'number', description: 'An integer, or NaN' },
    examples: [
      { code: 'Number.parseInt("42")', output: '42', explanation: 'Parses integer string' },
      { code: 'Number.parseInt("1010", 2)', output: '10', explanation: 'Parses binary string' }
    ],
    relatedMethods: ['Number.parseFloat', 'Number.isInteger']
  },
  {
    name: 'Number.isNaN',
    category: 'numbers',
    syntax: 'Number.isNaN(value)',
    description: 'Determines whether the passed value is NaN',
    arguments: [
      { name: 'value', type: 'any', description: 'The value to test' }
    ],
    returns: { type: 'boolean', description: 'true if value is NaN' },
    examples: [
      { code: 'Number.isNaN(NaN)', output: 'true', explanation: 'NaN is NaN' },
      { code: 'Number.isNaN("hello")', output: 'false', explanation: 'String is not NaN (different from global isNaN)' }
    ],
    relatedMethods: ['Number.isFinite', 'Number.isInteger']
  },
  {
    name: 'toFixed',
    category: 'numbers',
    syntax: 'number.toFixed(digits)',
    description: 'Formats a number using fixed-point notation',
    arguments: [
      { name: 'digits', type: 'number', description: 'Number of digits after decimal point', optional: true }
    ],
    returns: { type: 'string', description: 'A string representation of the number' },
    examples: [
      { code: '(3.14159).toFixed(2)', output: '"3.14"', explanation: 'Rounds to 2 decimal places' },
      { code: '(5).toFixed(2)', output: '"5.00"', explanation: 'Adds trailing zeros' }
    ],
    relatedMethods: ['toPrecision', 'toExponential']
  }
];

export const pythonMethods: Method[] = [
  // List Methods
  {
    name: 'append',
    category: 'lists',
    syntax: 'list.append(element)',
    description: 'Adds an element to the end of the list',
    arguments: [
      { name: 'element', type: 'any', description: 'The element to add' }
    ],
    returns: { type: 'None', description: 'Modifies list in place' },
    examples: [
      { code: 'lst = [1, 2]; lst.append(3); lst', output: '[1, 2, 3]', explanation: 'Adds 3 to the end' }
    ],
    relatedMethods: ['extend', 'insert']
  },
  {
    name: 'extend',
    category: 'lists',
    syntax: 'list.extend(iterable)',
    description: 'Extends the list by appending elements from the iterable',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Iterable to extend from' }
    ],
    returns: { type: 'None', description: 'Modifies list in place' },
    examples: [
      { code: 'lst = [1, 2]; lst.extend([3, 4]); lst', output: '[1, 2, 3, 4]', explanation: 'Extends with list' }
    ],
    relatedMethods: ['append', '+= operator']
  },
  {
    name: 'list comprehension',
    category: 'lists',
    syntax: '[expression for item in iterable if condition]',
    description: 'Creates a new list by applying an expression to each item',
    arguments: [],
    returns: { type: 'list', description: 'A new list' },
    examples: [
      { code: '[x * 2 for x in [1, 2, 3]]', output: '[2, 4, 6]', explanation: 'Doubles each element' },
      { code: '[x for x in [1, 2, 3, 4] if x > 2]', output: '[3, 4]', explanation: 'Filters elements > 2' }
    ],
    relatedMethods: ['map', 'filter']
  },
  {
    name: 'sorted',
    category: 'lists',
    syntax: 'sorted(iterable, key=None, reverse=False)',
    description: 'Returns a new sorted list from the items in iterable',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Items to sort' },
      { name: 'key', type: 'function', description: 'Key function for sorting', optional: true },
      { name: 'reverse', type: 'bool', description: 'Sort in reverse order', optional: true }
    ],
    returns: { type: 'list', description: 'A new sorted list' },
    examples: [
      { code: 'sorted([3, 1, 2])', output: '[1, 2, 3]', explanation: 'Sorts in ascending order' },
      { code: 'sorted([3, 1, 2], reverse=True)', output: '[3, 2, 1]', explanation: 'Sorts in descending order' }
    ],
    relatedMethods: ['list.sort', 'reversed']
  },
  // String Methods
  {
    name: 'join',
    category: 'strings',
    syntax: 'separator.join(iterable)',
    description: 'Joins elements of an iterable with the separator string',
    arguments: [
      { name: 'iterable', type: 'iterable', description: 'Iterable of strings to join' }
    ],
    returns: { type: 'str', description: 'A new joined string' },
    examples: [
      { code: '"-".join(["a", "b", "c"])', output: '"a-b-c"', explanation: 'Joins with hyphen' },
      { code: '"".join(["h", "i"])', output: '"hi"', explanation: 'Joins without separator' }
    ],
    relatedMethods: ['split', 'str']
  },
  {
    name: 'split',
    category: 'strings',
    syntax: 'string.split(sep=None, maxsplit=-1)',
    description: 'Splits a string into a list of substrings',
    arguments: [
      { name: 'sep', type: 'str', description: 'Separator to split on', optional: true },
      { name: 'maxsplit', type: 'int', description: 'Maximum splits to do', optional: true }
    ],
    returns: { type: 'list', description: 'A list of strings' },
    examples: [
      { code: '"a-b-c".split("-")', output: "['a', 'b', 'c']", explanation: 'Splits by hyphen' },
      { code: '"hello world".split()', output: "['hello', 'world']", explanation: 'Splits by whitespace' }
    ],
    relatedMethods: ['join', 'rsplit', 'splitlines']
  },
  {
    name: 'strip',
    category: 'strings',
    syntax: 'string.strip(chars=None)',
    description: 'Returns a copy of the string with leading and trailing characters removed',
    arguments: [
      { name: 'chars', type: 'str', description: 'Characters to remove', optional: true }
    ],
    returns: { type: 'str', description: 'A new stripped string' },
    examples: [
      { code: '"  hello  ".strip()', output: '"hello"', explanation: 'Removes whitespace' },
      { code: '"xxhelloxx".strip("x")', output: '"hello"', explanation: 'Removes specified chars' }
    ],
    relatedMethods: ['lstrip', 'rstrip']
  }
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
  const categories = new Set(methods.map(m => m.category));
  return Array.from(categories);
}

// Get methods by category
export function getMethodsByCategory(language: LanguageId, category: string): Method[] {
  const methods = getMethodsByLanguage(language);
  return methods.filter(m => m.category === category);
}
