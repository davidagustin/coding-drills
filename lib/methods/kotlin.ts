import type { Method } from '../types';

export const kotlinMethods: Method[] = [
  // ============================================================
  // List Operations
  // ============================================================
  {
    name: 'listOf',
    category: 'List Operations',
    syntax: 'listOf(vararg elements: T): List<T>',
    description:
      'Creates an immutable list containing the specified elements. The returned list is read-only and does not support add, remove, or other mutating operations.',
    arguments: [
      {
        name: 'elements',
        type: 'vararg T',
        description: 'Elements to include in the list',
      },
    ],
    returns: {
      type: 'List<T>',
      description: 'An immutable list containing the given elements',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5)\nprintln(numbers)',
        output: '[1, 2, 3, 4, 5]',
        explanation: 'Creates a read-only list of integers',
      },
      {
        code: 'val empty = listOf<String>()\nprintln(empty)',
        output: '[]',
        explanation: 'Creates an empty immutable list with explicit type',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['mutableListOf', 'emptyList', 'arrayListOf'],
    sinceVersion: '1.0',
    notes: [
      'The returned list is serializable and its implementation is unspecified',
      'Use mutableListOf() if you need to modify the list after creation',
    ],
  },
  {
    name: 'mutableListOf',
    category: 'List Operations',
    syntax: 'mutableListOf(vararg elements: T): MutableList<T>',
    description:
      'Creates a mutable list containing the specified elements. The returned list supports add, remove, and other mutating operations.',
    arguments: [
      {
        name: 'elements',
        type: 'vararg T',
        description: 'Elements to include in the list',
      },
    ],
    returns: {
      type: 'MutableList<T>',
      description: 'A mutable list containing the given elements',
    },
    examples: [
      {
        code: 'val list = mutableListOf(1, 2, 3)\nlist.add(4)\nprintln(list)',
        output: '[1, 2, 3, 4]',
        explanation: 'Creates a mutable list and adds an element',
      },
      {
        code: 'val list = mutableListOf("a", "b")\nlist.removeAt(0)\nprintln(list)',
        output: '[b]',
        explanation: 'Removes the element at index 0',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['listOf', 'arrayListOf', 'add', 'remove'],
    sinceVersion: '1.0',
    notes: ['Backed by ArrayList implementation'],
  },
  {
    name: 'map',
    category: 'List Operations',
    syntax: 'Iterable<T>.map(transform: (T) -> R): List<R>',
    description:
      'Returns a list containing the results of applying the given transform function to each element in the original collection.',
    arguments: [
      {
        name: 'transform',
        type: '(T) -> R',
        description: 'A function to apply to each element',
      },
    ],
    returns: {
      type: 'List<R>',
      description: 'A new list with transformed elements',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3)\nval doubled = numbers.map { it * 2 }\nprintln(doubled)',
        output: '[2, 4, 6]',
        explanation: 'Doubles each element using the implicit "it" parameter',
      },
      {
        code: 'val names = listOf("alice", "bob")\nval upper = names.map { it.uppercase() }\nprintln(upper)',
        output: '[ALICE, BOB]',
        explanation: 'Converts each string to uppercase',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['flatMap', 'mapNotNull', 'mapIndexed', 'forEach'],
    sinceVersion: '1.0',
    notes: ['Returns a new list; does not modify the original collection'],
  },
  {
    name: 'filter',
    category: 'List Operations',
    syntax: 'Iterable<T>.filter(predicate: (T) -> Boolean): List<T>',
    description: 'Returns a list containing only elements matching the given predicate.',
    arguments: [
      {
        name: 'predicate',
        type: '(T) -> Boolean',
        description: 'A function that returns true for elements to keep',
      },
    ],
    returns: {
      type: 'List<T>',
      description: 'A new list with only elements satisfying the predicate',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5)\nval even = numbers.filter { it % 2 == 0 }\nprintln(even)',
        output: '[2, 4]',
        explanation: 'Filters to keep only even numbers',
      },
      {
        code: 'val words = listOf("hello", "hi", "world")\nval short = words.filter { it.length <= 2 }\nprintln(short)',
        output: '[hi]',
        explanation: 'Filters strings by length',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['filterNot', 'filterNotNull', 'filterIndexed', 'partition'],
    sinceVersion: '1.0',
    notes: ['Use filterNot() for the inverse condition'],
  },
  {
    name: 'reduce',
    category: 'List Operations',
    syntax: 'Iterable<T>.reduce(operation: (acc: T, T) -> T): T',
    description:
      'Accumulates a value starting with the first element and applying the operation from left to right to current accumulator value and each element. Throws an exception if the collection is empty.',
    arguments: [
      {
        name: 'operation',
        type: '(acc: T, T) -> T',
        description:
          'A function that takes the accumulator and current element and returns the new accumulator',
      },
    ],
    returns: {
      type: 'T',
      description: 'The final accumulated value',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4)\nval sum = numbers.reduce { acc, n -> acc + n }\nprintln(sum)',
        output: '10',
        explanation: 'Sums all elements using reduce',
      },
      {
        code: 'val words = listOf("Hello", " ", "World")\nval sentence = words.reduce { acc, s -> acc + s }\nprintln(sentence)',
        output: 'Hello World',
        explanation: 'Concatenates strings',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['fold', 'reduceOrNull', 'reduceIndexed', 'sumOf'],
    sinceVersion: '1.0',
    notes: [
      'Throws UnsupportedOperationException if the collection is empty',
      'Use fold() if you need an initial value or a different return type',
    ],
  },
  {
    name: 'flatMap',
    category: 'List Operations',
    syntax: 'Iterable<T>.flatMap(transform: (T) -> Iterable<R>): List<R>',
    description:
      'Returns a single list of all elements yielded from the results of the transform function being invoked on each element of the original collection.',
    arguments: [
      {
        name: 'transform',
        type: '(T) -> Iterable<R>',
        description: 'A function that returns an iterable for each element',
      },
    ],
    returns: {
      type: 'List<R>',
      description: 'A flattened list of all transformed results',
    },
    examples: [
      {
        code: 'val nested = listOf(listOf(1, 2), listOf(3, 4))\nval flat = nested.flatMap { it }\nprintln(flat)',
        output: '[1, 2, 3, 4]',
        explanation: 'Flattens a list of lists',
      },
      {
        code: 'val words = listOf("hello", "world")\nval chars = words.flatMap { it.toList() }\nprintln(chars)',
        output: '[h, e, l, l, o, w, o, r, l, d]',
        explanation: 'Flattens each string into its characters',
      },
    ],
    timeComplexity: 'O(n * m) where m is average inner size',
    spaceComplexity: 'O(n * m)',
    relatedMethods: ['map', 'flatten', 'flatMapIndexed'],
    sinceVersion: '1.0',
    notes: ['Equivalent to map followed by flatten'],
  },
  {
    name: 'sortedBy',
    category: 'List Operations',
    syntax: 'Iterable<T>.sortedBy(selector: (T) -> R?): List<T>',
    description:
      'Returns a list of all elements sorted according to natural sort order of the value returned by the specified selector function.',
    arguments: [
      {
        name: 'selector',
        type: '(T) -> R?',
        description: 'A function that extracts the comparison key from each element',
      },
    ],
    returns: {
      type: 'List<T>',
      description: 'A new sorted list',
    },
    examples: [
      {
        code: 'val words = listOf("banana", "apple", "cherry")\nval sorted = words.sortedBy { it.length }\nprintln(sorted)',
        output: '[apple, banana, cherry]',
        explanation: 'Sorts strings by their length',
      },
      {
        code: 'data class Person(val name: String, val age: Int)\nval people = listOf(Person("Bob", 30), Person("Alice", 25))\nval sorted = people.sortedBy { it.age }\nprintln(sorted)',
        output: '[Person(name=Alice, age=25), Person(name=Bob, age=30)]',
        explanation: 'Sorts data class instances by a property',
      },
    ],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['sorted', 'sortedByDescending', 'sortedWith'],
    sinceVersion: '1.0',
    notes: [
      'Returns a new list; does not modify the original',
      'Null values are sorted to the end',
    ],
  },

  // ============================================================
  // String Functions
  // ============================================================
  {
    name: 'split',
    category: 'String Functions',
    syntax:
      'String.split(vararg delimiters: String, ignoreCase: Boolean = false, limit: Int = 0): List<String>',
    description:
      'Splits the string into a list of substrings around occurrences of the specified delimiters.',
    arguments: [
      {
        name: 'delimiters',
        type: 'vararg String',
        description: 'One or more delimiter strings',
      },
      {
        name: 'ignoreCase',
        type: 'Boolean',
        description: 'Whether to ignore case when matching delimiters',
        optional: true,
        defaultValue: 'false',
      },
      {
        name: 'limit',
        type: 'Int',
        description: 'Maximum number of substrings to return (0 for no limit)',
        optional: true,
        defaultValue: '0',
      },
    ],
    returns: {
      type: 'List<String>',
      description: 'A list of substrings',
    },
    examples: [
      {
        code: 'val result = "one,two,three".split(",")\nprintln(result)',
        output: '[one, two, three]',
        explanation: 'Splits by comma delimiter',
      },
      {
        code: 'val result = "a.b.c.d".split(".", limit = 2)\nprintln(result)',
        output: '[a, b.c.d]',
        explanation: 'Limits the split to 2 parts',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['joinToString', 'lines', 'chunked'],
    sinceVersion: '1.0',
    notes: ['Unlike Java, Kotlin split takes literal strings by default, not regex'],
  },
  {
    name: 'trim',
    category: 'String Functions',
    syntax: 'String.trim(): String',
    description:
      'Returns a string having leading and trailing whitespace removed. Can also accept a predicate to trim specific characters.',
    arguments: [
      {
        name: 'predicate',
        type: '(Char) -> Boolean',
        description: 'Optional predicate to determine which characters to trim',
        optional: true,
      },
    ],
    returns: {
      type: 'String',
      description: 'The trimmed string',
    },
    examples: [
      {
        code: 'val result = "  hello  ".trim()\nprintln(result)',
        output: 'hello',
        explanation: 'Removes leading and trailing whitespace',
      },
      {
        code: 'val result = "***hello***".trim { it == \'*\' }\nprintln(result)',
        output: 'hello',
        explanation: 'Removes leading and trailing asterisks using a predicate',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['trimStart', 'trimEnd', 'trimIndent'],
    sinceVersion: '1.0',
  },
  {
    name: 'replace',
    category: 'String Functions',
    syntax:
      'String.replace(oldValue: String, newValue: String, ignoreCase: Boolean = false): String',
    description:
      'Returns a new string obtained by replacing all occurrences of the old value with the new value.',
    arguments: [
      {
        name: 'oldValue',
        type: 'String',
        description: 'The substring to find',
      },
      {
        name: 'newValue',
        type: 'String',
        description: 'The replacement string',
      },
      {
        name: 'ignoreCase',
        type: 'Boolean',
        description: 'Whether to ignore case when matching',
        optional: true,
        defaultValue: 'false',
      },
    ],
    returns: {
      type: 'String',
      description: 'A new string with all occurrences replaced',
    },
    examples: [
      {
        code: 'val result = "hello world".replace("world", "Kotlin")\nprintln(result)',
        output: 'hello Kotlin',
        explanation: 'Replaces a substring',
      },
      {
        code: 'val result = "aAbBaA".replace("a", "x", ignoreCase = true)\nprintln(result)',
        output: 'xxbBxx',
        explanation: 'Case-insensitive replacement',
      },
    ],
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['replaceFirst', 'replaceRange', 'replaceBefore', 'replaceAfter'],
    sinceVersion: '1.0',
  },
  {
    name: 'substring',
    category: 'String Functions',
    syntax: 'String.substring(startIndex: Int, endIndex: Int = length): String',
    description:
      'Returns a substring of this string starting at the startIndex and ending right before the endIndex.',
    arguments: [
      {
        name: 'startIndex',
        type: 'Int',
        description: 'The start index (inclusive)',
      },
      {
        name: 'endIndex',
        type: 'Int',
        description: 'The end index (exclusive)',
        optional: true,
      },
    ],
    returns: {
      type: 'String',
      description: 'The extracted substring',
    },
    examples: [
      {
        code: 'val result = "Hello, World!".substring(7, 12)\nprintln(result)',
        output: 'World',
        explanation: 'Extracts characters from index 7 to 11',
      },
      {
        code: 'val result = "Hello, World!".substring(7)\nprintln(result)',
        output: 'World!',
        explanation: 'Extracts from index 7 to the end',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['take', 'drop', 'slice', 'substringBefore', 'substringAfter'],
    sinceVersion: '1.0',
    notes: ['Throws StringIndexOutOfBoundsException if indices are out of range'],
  },
  {
    name: 'lowercase',
    category: 'String Functions',
    syntax: 'String.lowercase(): String',
    description:
      'Returns a copy of this string converted to lowercase using the rules of the default locale.',
    arguments: [],
    returns: {
      type: 'String',
      description: 'The lowercase string',
    },
    examples: [
      {
        code: 'val result = "Hello World".lowercase()\nprintln(result)',
        output: 'hello world',
        explanation: 'Converts the entire string to lowercase',
      },
      {
        code: 'val result = "KOTLIN".lowercase()\nprintln(result)',
        output: 'kotlin',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['uppercase', 'capitalize', 'replaceFirstChar'],
    sinceVersion: '1.5',
    notes: [
      'Replaces the deprecated toLowerCase() function',
      'Use lowercase(Locale) for locale-specific conversions',
    ],
  },

  // ============================================================
  // Map Operations
  // ============================================================
  {
    name: 'mapOf',
    category: 'Map Operations',
    syntax: 'mapOf(vararg pairs: Pair<K, V>): Map<K, V>',
    description:
      'Creates an immutable map from the given key-value pairs. The returned map preserves the entry iteration order.',
    arguments: [
      {
        name: 'pairs',
        type: 'vararg Pair<K, V>',
        description: 'Key-value pairs created with the "to" infix function',
      },
    ],
    returns: {
      type: 'Map<K, V>',
      description: 'An immutable map containing the given pairs',
    },
    examples: [
      {
        code: 'val map = mapOf("a" to 1, "b" to 2, "c" to 3)\nprintln(map)',
        output: '{a=1, b=2, c=3}',
        explanation: 'Creates an immutable map using the "to" infix function',
      },
      {
        code: 'val map = mapOf("name" to "Kotlin", "version" to "1.9")\nprintln(map["name"])',
        output: 'Kotlin',
        explanation: 'Accessing a value by key',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['mutableMapOf', 'hashMapOf', 'linkedMapOf', 'emptyMap'],
    sinceVersion: '1.0',
    notes: ['Use the "to" infix function to create Pair objects: key to value'],
  },
  {
    name: 'mutableMapOf',
    category: 'Map Operations',
    syntax: 'mutableMapOf(vararg pairs: Pair<K, V>): MutableMap<K, V>',
    description:
      'Creates a mutable map from the given key-value pairs. Supports put, remove, and other mutating operations.',
    arguments: [
      {
        name: 'pairs',
        type: 'vararg Pair<K, V>',
        description: 'Initial key-value pairs',
      },
    ],
    returns: {
      type: 'MutableMap<K, V>',
      description: 'A mutable map containing the given pairs',
    },
    examples: [
      {
        code: 'val map = mutableMapOf("a" to 1, "b" to 2)\nmap["c"] = 3\nprintln(map)',
        output: '{a=1, b=2, c=3}',
        explanation: 'Creates a mutable map and adds a new entry',
      },
      {
        code: 'val map = mutableMapOf("x" to 10)\nmap.remove("x")\nprintln(map)',
        output: '{}',
        explanation: 'Removes an entry from the map',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['mapOf', 'hashMapOf', 'put', 'remove'],
    sinceVersion: '1.0',
    notes: ['Backed by LinkedHashMap, preserving insertion order'],
  },
  {
    name: 'getOrDefault',
    category: 'Map Operations',
    syntax: 'Map<K, V>.getOrDefault(key: K, defaultValue: V): V',
    description:
      'Returns the value corresponding to the given key, or the specified default value if the key is not present in the map.',
    arguments: [
      {
        name: 'key',
        type: 'K',
        description: 'The key to look up',
      },
      {
        name: 'defaultValue',
        type: 'V',
        description: 'The value to return if the key is not found',
      },
    ],
    returns: {
      type: 'V',
      description: 'The value for the key, or the default value',
    },
    examples: [
      {
        code: 'val map = mapOf("a" to 1, "b" to 2)\nprintln(map.getOrDefault("c", 0))',
        output: '0',
        explanation: 'Returns the default value when key is not found',
      },
      {
        code: 'val map = mapOf("x" to 100)\nprintln(map.getOrDefault("x", -1))',
        output: '100',
        explanation: 'Returns the actual value when key exists',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['getOrElse', 'getOrPut', 'getValue'],
    sinceVersion: '1.0',
    notes: ['getOrElse accepts a lambda instead of a default value for lazy evaluation'],
  },
  {
    name: 'entries',
    category: 'Map Operations',
    syntax: 'Map<K, V>.entries: Set<Map.Entry<K, V>>',
    description:
      'Returns a read-only set of all key-value pairs in this map. Each entry contains the key and value properties.',
    arguments: [],
    returns: {
      type: 'Set<Map.Entry<K, V>>',
      description: 'A set of all key-value entries in the map',
    },
    examples: [
      {
        code: 'val map = mapOf("a" to 1, "b" to 2)\nfor ((key, value) in map.entries) {\n    println("$key -> $value")\n}',
        output: 'a -> 1\nb -> 2',
        explanation: 'Iterates over map entries using destructuring',
      },
      {
        code: 'val map = mapOf("x" to 10, "y" to 20)\nprintln(map.entries.map { "${it.key}=${it.value}" })',
        output: '[x=10, y=20]',
        explanation: 'Transforms entries into formatted strings',
      },
    ],
    timeComplexity: 'O(1) for access, O(n) for iteration',
    spaceComplexity: 'O(1)',
    relatedMethods: ['keys', 'values', 'forEach'],
    sinceVersion: '1.0',
    notes: ['Kotlin supports destructuring declarations for map entries: (key, value)'],
  },

  // ============================================================
  // Collection Extensions
  // ============================================================
  {
    name: 'any',
    category: 'Collection Extensions',
    syntax: 'Iterable<T>.any(predicate: (T) -> Boolean): Boolean',
    description:
      'Returns true if at least one element matches the given predicate. When called without a predicate, returns true if the collection is not empty.',
    arguments: [
      {
        name: 'predicate',
        type: '(T) -> Boolean',
        description: 'A function to test each element',
        optional: true,
      },
    ],
    returns: {
      type: 'Boolean',
      description: 'true if any element matches the predicate',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5)\nprintln(numbers.any { it > 3 })',
        output: 'true',
        explanation: 'Checks if any element is greater than 3',
      },
      {
        code: 'val empty = emptyList<Int>()\nprintln(empty.any())',
        output: 'false',
        explanation: 'Returns false for an empty collection',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['all', 'none', 'contains', 'find'],
    sinceVersion: '1.0',
    notes: ['Short-circuits: returns true as soon as a matching element is found'],
  },
  {
    name: 'all',
    category: 'Collection Extensions',
    syntax: 'Iterable<T>.all(predicate: (T) -> Boolean): Boolean',
    description:
      'Returns true if all elements match the given predicate. Returns true for an empty collection (vacuous truth).',
    arguments: [
      {
        name: 'predicate',
        type: '(T) -> Boolean',
        description: 'A function to test each element',
      },
    ],
    returns: {
      type: 'Boolean',
      description: 'true if all elements match the predicate',
    },
    examples: [
      {
        code: 'val numbers = listOf(2, 4, 6)\nprintln(numbers.all { it % 2 == 0 })',
        output: 'true',
        explanation: 'Checks if all elements are even',
      },
      {
        code: 'val numbers = listOf(1, 2, 3)\nprintln(numbers.all { it > 0 })',
        output: 'true',
        explanation: 'All elements are positive',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['any', 'none', 'count'],
    sinceVersion: '1.0',
    notes: ['Short-circuits: returns false as soon as a non-matching element is found'],
  },
  {
    name: 'first',
    category: 'Collection Extensions',
    syntax: 'Iterable<T>.first(predicate: ((T) -> Boolean)? = null): T',
    description:
      'Returns the first element matching the given predicate, or the first element of the collection if no predicate is provided. Throws NoSuchElementException if no matching element is found.',
    arguments: [
      {
        name: 'predicate',
        type: '(T) -> Boolean',
        description: 'A function to test elements',
        optional: true,
      },
    ],
    returns: {
      type: 'T',
      description: 'The first matching element',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3)\nprintln(numbers.first())',
        output: '1',
        explanation: 'Returns the first element',
      },
      {
        code: 'val numbers = listOf(1, 2, 3, 4)\nprintln(numbers.first { it > 2 })',
        output: '3',
        explanation: 'Returns the first element greater than 2',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['last', 'firstOrNull', 'find', 'single'],
    sinceVersion: '1.0',
    notes: [
      'Use firstOrNull() to return null instead of throwing an exception',
      'find() is an alias for firstOrNull() with a predicate',
    ],
  },
  {
    name: 'last',
    category: 'Collection Extensions',
    syntax: 'Iterable<T>.last(predicate: ((T) -> Boolean)? = null): T',
    description:
      'Returns the last element matching the given predicate, or the last element of the collection if no predicate is provided. Throws NoSuchElementException if no matching element is found.',
    arguments: [
      {
        name: 'predicate',
        type: '(T) -> Boolean',
        description: 'A function to test elements',
        optional: true,
      },
    ],
    returns: {
      type: 'T',
      description: 'The last matching element',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3)\nprintln(numbers.last())',
        output: '3',
        explanation: 'Returns the last element',
      },
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5)\nprintln(numbers.last { it < 4 })',
        output: '3',
        explanation: 'Returns the last element less than 4',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['first', 'lastOrNull', 'findLast', 'single'],
    sinceVersion: '1.0',
    notes: ['Use lastOrNull() to return null instead of throwing an exception'],
  },
  {
    name: 'find',
    category: 'Collection Extensions',
    syntax: 'Iterable<T>.find(predicate: (T) -> Boolean): T?',
    description:
      'Returns the first element matching the given predicate, or null if no such element was found. This is an alias for firstOrNull().',
    arguments: [
      {
        name: 'predicate',
        type: '(T) -> Boolean',
        description: 'A function to test elements',
      },
    ],
    returns: {
      type: 'T?',
      description: 'The first matching element, or null',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4)\nval found = numbers.find { it > 2 }\nprintln(found)',
        output: '3',
        explanation: 'Finds the first element greater than 2',
      },
      {
        code: 'val numbers = listOf(1, 2, 3)\nval found = numbers.find { it > 10 }\nprintln(found)',
        output: 'null',
        explanation: 'Returns null when no element matches',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['first', 'firstOrNull', 'findLast', 'single'],
    sinceVersion: '1.0',
    notes: ['Equivalent to firstOrNull(predicate)'],
  },
  {
    name: 'zip',
    category: 'Collection Extensions',
    syntax: 'Iterable<T>.zip(other: Iterable<R>): List<Pair<T, R>>',
    description:
      'Returns a list of pairs built from the elements of this collection and the other collection with the same index. The resulting list has the length of the shortest collection.',
    arguments: [
      {
        name: 'other',
        type: 'Iterable<R>',
        description: 'The other collection to zip with',
      },
      {
        name: 'transform',
        type: '(T, R) -> V',
        description: 'Optional transform function applied to each pair of elements',
        optional: true,
      },
    ],
    returns: {
      type: 'List<Pair<T, R>>',
      description: 'A list of paired elements',
    },
    examples: [
      {
        code: 'val names = listOf("Alice", "Bob")\nval ages = listOf(25, 30)\nprintln(names.zip(ages))',
        output: '[(Alice, 25), (Bob, 30)]',
        explanation: 'Pairs elements from two lists',
      },
      {
        code: 'val keys = listOf("a", "b", "c")\nval values = listOf(1, 2, 3)\nval map = keys.zip(values).toMap()\nprintln(map)',
        output: '{a=1, b=2, c=3}',
        explanation: 'Creates a map from two lists using zip and toMap',
      },
    ],
    timeComplexity: 'O(min(n, m))',
    spaceComplexity: 'O(min(n, m))',
    relatedMethods: ['unzip', 'zipWithNext', 'withIndex'],
    sinceVersion: '1.0',
    notes: ['The infix form can also be used: list1 zip list2'],
  },
  {
    name: 'chunked',
    category: 'Collection Extensions',
    syntax: 'Iterable<T>.chunked(size: Int): List<List<T>>',
    description:
      'Splits the collection into a list of lists, each not exceeding the given size. The last list in the result may have fewer elements than the given size.',
    arguments: [
      {
        name: 'size',
        type: 'Int',
        description: 'The number of elements in each chunk',
      },
      {
        name: 'transform',
        type: '(List<T>) -> R',
        description: 'Optional transform function applied to each chunk',
        optional: true,
      },
    ],
    returns: {
      type: 'List<List<T>>',
      description: 'A list of chunks',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5)\nprintln(numbers.chunked(2))',
        output: '[[1, 2], [3, 4], [5]]',
        explanation: 'Splits into chunks of size 2; last chunk may be smaller',
      },
      {
        code: 'val numbers = (1..10).toList()\nval sums = numbers.chunked(3) { it.sum() }\nprintln(sums)',
        output: '[6, 15, 24, 10]',
        explanation: 'Chunks the list and sums each chunk',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['windowed', 'zipWithNext', 'partition'],
    sinceVersion: '1.2',
    notes: ['Throws IllegalArgumentException if size is not positive'],
  },

  // ============================================================
  // Scope Functions
  // ============================================================
  {
    name: 'let',
    category: 'Scope Functions',
    syntax: 'T.let(block: (T) -> R): R',
    description:
      'Calls the specified function block with this value as its argument and returns its result. Commonly used for null-safety checks and transforming values within a chain.',
    arguments: [
      {
        name: 'block',
        type: '(T) -> R',
        description: 'A function that receives the object as an argument (referred to as "it")',
      },
    ],
    returns: {
      type: 'R',
      description: 'The result of the block function',
    },
    examples: [
      {
        code: 'val name: String? = "Kotlin"\nname?.let { println("Name is $it") }',
        output: 'Name is Kotlin',
        explanation: 'Executes the block only if name is not null',
      },
      {
        code: 'val result = "hello".let {\n    println("Original: $it")\n    it.uppercase()\n}\nprintln(result)',
        output: 'Original: hello\nHELLO',
        explanation: 'Transforms a value and returns the result',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['run', 'also', 'apply', 'with'],
    sinceVersion: '1.0',
    notes: [
      'The context object is available as "it" (lambda argument)',
      'Returns the lambda result',
      'Most commonly used with the safe call operator (?.) for null checks',
    ],
  },
  {
    name: 'run',
    category: 'Scope Functions',
    syntax: 'T.run(block: T.() -> R): R',
    description:
      'Calls the specified function block with this value as its receiver and returns its result. Useful for initializing objects and computing results.',
    arguments: [
      {
        name: 'block',
        type: 'T.() -> R',
        description: 'A function with receiver that can access the object as "this"',
      },
    ],
    returns: {
      type: 'R',
      description: 'The result of the block function',
    },
    examples: [
      {
        code: 'val result = "hello world".run {\n    uppercase().split(" ")\n}\nprintln(result)',
        output: '[HELLO, WORLD]',
        explanation: 'Uses "this" implicitly to call methods on the string',
      },
      {
        code: 'val hexColor = 255.run {\n    "Color: #${toString(16).padStart(6, \'0\')}"\n}\nprintln(hexColor)',
        output: 'Color: #0000ff',
        explanation: 'Computes a result using the receiver object',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['let', 'with', 'apply', 'also'],
    sinceVersion: '1.0',
    notes: [
      'The context object is available as "this" (receiver)',
      'Returns the lambda result',
      'Similar to "with" but called as an extension function',
    ],
  },
  {
    name: 'apply',
    category: 'Scope Functions',
    syntax: 'T.apply(block: T.() -> Unit): T',
    description:
      'Calls the specified function block with this value as its receiver and returns this value. Ideal for object configuration and builder-style initialization.',
    arguments: [
      {
        name: 'block',
        type: 'T.() -> Unit',
        description: 'A function with receiver for configuring the object',
      },
    ],
    returns: {
      type: 'T',
      description: 'The context object itself',
    },
    examples: [
      {
        code: 'val list = mutableListOf(1, 2, 3).apply {\n    add(4)\n    add(5)\n    removeAt(0)\n}\nprintln(list)',
        output: '[2, 3, 4, 5]',
        explanation: 'Configures a mutable list and returns it',
      },
      {
        code: 'data class Config(var host: String = "", var port: Int = 0)\nval config = Config().apply {\n    host = "localhost"\n    port = 8080\n}\nprintln(config)',
        output: 'Config(host=localhost, port=8080)',
        explanation: 'Configures a data class using apply',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['also', 'run', 'let', 'with'],
    sinceVersion: '1.0',
    notes: [
      'The context object is available as "this" (receiver)',
      'Returns the context object (not the lambda result)',
      'Best used for object configuration where you return the configured object',
    ],
  },
  {
    name: 'also',
    category: 'Scope Functions',
    syntax: 'T.also(block: (T) -> Unit): T',
    description:
      'Calls the specified function block with this value as its argument and returns this value. Useful for performing additional actions that do not alter the object, such as logging or validation.',
    arguments: [
      {
        name: 'block',
        type: '(T) -> Unit',
        description: 'A function that receives the object as "it"',
      },
    ],
    returns: {
      type: 'T',
      description: 'The context object itself',
    },
    examples: [
      {
        code: 'val numbers = mutableListOf(1, 2, 3)\nnumbers\n    .also { println("Before: $it") }\n    .add(4)\nprintln(numbers)',
        output: 'Before: [1, 2, 3]\n[1, 2, 3, 4]',
        explanation: 'Logs the list state before adding an element',
      },
      {
        code: 'val result = "kotlin".also {\n    println("Processing: $it")\n}.uppercase()\nprintln(result)',
        output: 'Processing: kotlin\nKOTLIN',
        explanation: 'Performs a side effect in the middle of a call chain',
      },
    ],
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['apply', 'let', 'run', 'with'],
    sinceVersion: '1.1',
    notes: [
      'The context object is available as "it" (lambda argument)',
      'Returns the context object (not the lambda result)',
      'Best for side effects like logging, debugging, or validation',
    ],
  },

  // ============================================================
  // Type Conversion
  // ============================================================
  {
    name: 'toInt',
    category: 'Type Conversion',
    syntax: 'String.toInt(radix: Int = 10): Int',
    description:
      'Parses the string as a signed Int number and returns the result. Throws NumberFormatException if the string is not a valid representation of an integer.',
    arguments: [
      {
        name: 'radix',
        type: 'Int',
        description: 'The radix (base) for parsing',
        optional: true,
        defaultValue: '10',
      },
    ],
    returns: {
      type: 'Int',
      description: 'The parsed integer value',
    },
    examples: [
      {
        code: 'val number = "42".toInt()\nprintln(number)',
        output: '42',
        explanation: 'Parses a decimal string to an integer',
      },
      {
        code: 'val hex = "FF".toInt(16)\nprintln(hex)',
        output: '255',
        explanation: 'Parses a hexadecimal string',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    relatedMethods: ['toIntOrNull', 'toLong', 'toDouble', 'toString'],
    sinceVersion: '1.0',
    notes: [
      'Use toIntOrNull() to return null instead of throwing an exception',
      'Throws NumberFormatException for invalid input',
    ],
  },
  {
    name: 'toString',
    category: 'Type Conversion',
    syntax: 'Any?.toString(): String',
    description:
      'Returns a string representation of the object. For nullable types, returns "null" if the object is null. Can be overridden by classes to provide custom string representation.',
    arguments: [
      {
        name: 'radix',
        type: 'Int',
        description: 'For numeric types, the radix for the representation',
        optional: true,
      },
    ],
    returns: {
      type: 'String',
      description: 'The string representation of the object',
    },
    examples: [
      {
        code: 'val number = 42\nprintln(number.toString())',
        output: '42',
        explanation: 'Converts an integer to its string representation',
      },
      {
        code: 'val list = listOf(1, 2, 3)\nprintln(list.toString())',
        output: '[1, 2, 3]',
        explanation: 'Converts a list to its string representation',
      },
      {
        code: 'val hex = 255.toString(16)\nprintln(hex)',
        output: 'ff',
        explanation: 'Converts an integer to its hexadecimal string',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['toInt', 'toDouble', 'toBoolean'],
    sinceVersion: '1.0',
    notes: ['Data classes automatically generate toString() from their properties'],
  },
  {
    name: 'toList',
    category: 'Type Conversion',
    syntax: 'Iterable<T>.toList(): List<T>',
    description:
      'Returns a new read-only list containing all elements of the original collection or iterable. Useful for converting sequences, sets, arrays, or other iterables to a List.',
    arguments: [],
    returns: {
      type: 'List<T>',
      description: 'A new immutable list containing all elements',
    },
    examples: [
      {
        code: 'val set = setOf(3, 1, 2)\nval list = set.toList()\nprintln(list)',
        output: '[3, 1, 2]',
        explanation: 'Converts a set to a list, preserving iteration order',
      },
      {
        code: 'val range = (1..5)\nval list = range.toList()\nprintln(list)',
        output: '[1, 2, 3, 4, 5]',
        explanation: 'Converts a range to a list',
      },
      {
        code: 'val map = mapOf("a" to 1, "b" to 2)\nval pairs = map.toList()\nprintln(pairs)',
        output: '[(a, 1), (b, 2)]',
        explanation: 'Converts a map to a list of pairs',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['toMutableList', 'toSet', 'toMap', 'asList'],
    sinceVersion: '1.0',
    notes: ['Returns a new list; modifications to the original do not affect the returned list'],
  },

  // ============================================================
  // Sequence Operations
  // ============================================================
  {
    name: 'asSequence',
    category: 'Sequence Operations',
    syntax: 'Iterable<T>.asSequence(): Sequence<T>',
    description:
      'Creates a lazy sequence from the collection. Sequence operations are evaluated lazily, meaning intermediate operations do not create new collections but are applied only when the terminal operation is invoked.',
    arguments: [],
    returns: {
      type: 'Sequence<T>',
      description: 'A lazy sequence wrapping the original collection',
    },
    examples: [
      {
        code: 'val result = (1..1000000).asSequence()\n    .filter { it % 2 == 0 }\n    .map { it * it }\n    .take(5)\n    .toList()\nprintln(result)',
        output: '[4, 16, 36, 64, 100]',
        explanation: 'Lazily processes a large range without creating intermediate collections',
      },
      {
        code: 'val result = listOf("a", "b", "c", "d").asSequence()\n    .map { println("map: $it"); it.uppercase() }\n    .first()\nprintln("Result: $result")',
        output: 'map: a\nResult: A',
        explanation: 'Only processes the first element due to lazy evaluation',
      },
    ],
    timeComplexity: 'O(1) for creation',
    spaceComplexity: 'O(1)',
    relatedMethods: ['generateSequence', 'sequenceOf', 'toList'],
    sinceVersion: '1.0',
    notes: [
      'Use sequences for large collections or multiple chained operations to avoid creating intermediate lists',
      'Elements are processed one-by-one through the entire chain (vertical processing)',
      'Must end with a terminal operation (toList, first, count, etc.) to trigger evaluation',
    ],
  },
  {
    name: 'take',
    category: 'Sequence Operations',
    syntax: 'Iterable<T>.take(n: Int): List<T>',
    description:
      'Returns a list containing the first n elements. If the collection has fewer than n elements, returns all elements.',
    arguments: [
      {
        name: 'n',
        type: 'Int',
        description: 'The number of elements to take',
      },
    ],
    returns: {
      type: 'List<T>',
      description: 'A list of the first n elements',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5)\nprintln(numbers.take(3))',
        output: '[1, 2, 3]',
        explanation: 'Takes the first 3 elements',
      },
      {
        code: 'val numbers = listOf(1, 2)\nprintln(numbers.take(10))',
        output: '[1, 2]',
        explanation: 'Returns all elements when n exceeds the collection size',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['takeLast', 'takeWhile', 'drop', 'first'],
    sinceVersion: '1.0',
    notes: ['Throws IllegalArgumentException if n is negative'],
  },
  {
    name: 'drop',
    category: 'Sequence Operations',
    syntax: 'Iterable<T>.drop(n: Int): List<T>',
    description:
      'Returns a list containing all elements except the first n elements. If the collection has fewer than n elements, returns an empty list.',
    arguments: [
      {
        name: 'n',
        type: 'Int',
        description: 'The number of elements to skip',
      },
    ],
    returns: {
      type: 'List<T>',
      description: 'A list without the first n elements',
    },
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5)\nprintln(numbers.drop(2))',
        output: '[3, 4, 5]',
        explanation: 'Drops the first 2 elements',
      },
      {
        code: 'val numbers = listOf(1, 2)\nprintln(numbers.drop(10))',
        output: '[]',
        explanation: 'Returns empty list when n exceeds the collection size',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['dropLast', 'dropWhile', 'take', 'slice'],
    sinceVersion: '1.0',
    notes: ['Throws IllegalArgumentException if n is negative'],
  },
  {
    name: 'groupBy',
    category: 'Collection Extensions',
    syntax: 'Iterable<T>.groupBy(keySelector: (T) -> K): Map<K, List<T>>',
    description:
      'Groups elements of the original collection by the key returned by the given keySelector function applied to each element and returns a map where each group key is associated with a list of corresponding elements.',
    arguments: [
      {
        name: 'keySelector',
        type: '(T) -> K',
        description: 'A function that extracts the grouping key from each element',
      },
      {
        name: 'valueTransform',
        type: '(T) -> V',
        description: 'Optional function to transform each element before grouping',
        optional: true,
      },
    ],
    returns: {
      type: 'Map<K, List<T>>',
      description: 'A map from grouping keys to lists of elements',
    },
    examples: [
      {
        code: 'val words = listOf("apple", "banana", "avocado", "blueberry")\nval grouped = words.groupBy { it.first() }\nprintln(grouped)',
        output: '{a=[apple, avocado], b=[banana, blueberry]}',
        explanation: 'Groups words by their first letter',
      },
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5, 6)\nval grouped = numbers.groupBy { if (it % 2 == 0) "even" else "odd" }\nprintln(grouped)',
        output: '{odd=[1, 3, 5], even=[2, 4, 6]}',
        explanation: 'Groups numbers into even and odd categories',
      },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    relatedMethods: ['groupingBy', 'partition', 'associateBy'],
    sinceVersion: '1.0',
    notes: [
      'The returned map preserves the entry iteration order of keys produced from the original collection',
    ],
  },
];

export default kotlinMethods;
